import {
    Router
} from "express"
import {
    Father
} from '../model/Father.model.js'

import {
    Son
} from '../model/Son.model.js'
const router = Router();


// Peticion para ver si la ruta funciona
router.get('/', function (req, res) {

    res.json({
        error: false,
        status: 200,
        mensage_global: "Todo bien"
    });
});

// Listar todos los papas
router.get('/fathers', async function (req, res) {
    try {
        let father = await Father.findAll();
        res.json({
            error: false,
            status: 200,
            mensage_global: "Todo bien",
            father,
        });
    } catch (error) {
        res.json({
            error: false,
            status: 200,
            mensage_global: "Todo bien",
            error,
        });
    }
});

router.post('/addFather', async function (req, res) {

    let {
        IdUser,
        name,
        lastname_father,
        lastname_mother,
        age
    } = req.body;

    try {
        let father = await Father.create({
            IdUser,
            name,
            lastname_father,
            lastname_mother,
            age
        });

        res.json({
            error: false,
            status: 200,
            mensage_global: "Padre agregado",
            father
        });
    } catch (error) {
        res.json({
            error: true,
            status: 500,
            mensage_global: "Error en el servidor",
            error
        });
    }
});

router.put('/updateFather', async function (req, res) {

let {
    Id,    
    name,
    lastname_father,
    lastname_mother,
    age
} = req.body;

console.log(lastname_father)

    try {
        let father = await Father.findByPk(Id);
        father.name = name;
        father.age = age;
        father.lastname_father = lastname_father;
        father.lastname_mother = lastname_mother;        
        father = await father.save();
        console
        res.json({
            error: false,
            status: 200,
            mensage_global: "Padre actualizado"
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



router.delete('/deleteFather/:Id', async function (req, res) {
    let {Id} = req.params;

    try {
        await Father.destroy(
            {
                where:{
                    Id,
                }
            }
        )    
        res.json({
            error: false,
            status: 200,
            mensage_global: "Padre eliminado"
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

router.get('/father/:IdFather/son', async function (req, res){

    let IdFather = req.params.IdFather;
    
    try {
        let son = await Son.findAll({
            where:{
                IdFather : IdFather,
            }
        });
        res.json({
            error: false,
            status: 200,
            mensage_global: "Hijos encontrados",
            son
        });    
    } catch (error) {
        console.log(error)
        res.json({
            error: true,
            status: 500,
            mensage_global: "Error en el servidor"
        });
    }


});

export default router;