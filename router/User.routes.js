import {
    Router
} from "express"
import {
    User
} from '../model/User.model.js'

import {
    Father
} from '../model/Father.model.js'
const router = Router();

// Ruta para verificar el funcionamiento de la api-rest
router.get('/', function (req, res) {

    res.json({
        error: false,
        status: 200,
        mensage_global: "Todo bien"
    });
});

// Ruta para mostrar todos los usuarios en la base de datos
router.get('/users', async function (req, res) {
    let users = await User.findAll();
    res.json({
        error: false,
        status: 200,
        mensage_global: "All ok",
        users
    });
});

// Ruta para loguear a los usuarios
router.post('/login', async function (req, res) {

    let {username, password} = req.body;

    try {
        let user = await User.findOne({
            where: {
                username,
                password
            }
        });
        if(user == null){
            res.json({
                error: false,
                status: 200,
                mensage_global: "Usuario no encontrado",            
                user
            })
        }else{
            res.json({
                error: false,
                status: 200,
                mensage_global: "Usuario encontrado",            
                user
            });
        }
    } catch (error) {
        res.json({
            error: true,
            status: 500,
            mensage_global: "Error en el servidor",
            error,
        });
    }
});

// Ruta para agregar nuevos usuarios en la base de datos
router.post('/addUser', async function (req, res) {

    let {username, password, lastname, phone} = req.body;

    try {
        let user = await User.create({         
            username,
            password,
            lastname,
            phone, 
        });
    
        res.json({
            error: false,
            status: 200,
            mensage_global: "Usuario agregado",
            user
        });
    } catch (error) {
        res.json({
            error: true,
            status: 500,
            mensage_global: "Error en el servidor",
            user
        });
    }
});

// Ruta para actualizar usuarios en la base de datos
router.put('/updateUser', async function (req, res) {
    let {Id, username, password, lastname, phone} = req.body;

    try {
        let user = await User.findByPk(Id);
        user.username = username;
        user.password = password;
        user.lastname = lastname;
        user.phone = phone;
        user = await user.save();
        res.json({
            error: false,
            status: 200,
            mensage_global: "Usuario actualizado"
        });
    } catch (error) {
        res.json({
            error: false,
            status: 200,
            mensage_global: "Error en el servidor",
            error
        });
    }



});

// Ruta para eliminar usuarios en la base de datos
router.delete('/deletUser/:Id', async function (req, res) {
    let {Id} = req.params;

    try {
        await User.destroy(
            {
                where:{
                    Id,
                }
            }
        )    
        res.json({
            error: false,
            status: 200,
            mensage_global: "Usuario eliminado"
        });  
    } catch (error) {
        res.json({
            error: false,
            status: 200,
            mensage_global: "Error en el servidor",
            error
        });  
    }
});

router.get('/user/:IdUser/father', async function (req, res){

    let IdUser = req.params.IdUser;
    
    try {
        let fathers = await Father.findAll({
            where:{
                IdUser : IdUser,
            }
        });
        res.json({
            error: false,
            status: 200,
            mensage_global: "Padres encontrados",
            fathers
        });    
    } catch (error) {
        res.json({
            error: true,
            status: 500,
            mensage_global: "Error en el servidor"
        });
    }


});

export default router;