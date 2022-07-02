import {
    Router
} from "express"
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
router.get('/sons', async function (req, res) {
    try {
        let son = await Son.findAll();
        res.json({
            error: false,
            status: 200,
            mensage_global: "Todo bien",
            sons: son,
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

router.post('/addSon', async function (req, res) {
    console.log("Agragando hijo");
    let {
        IdFather,
        name,
        lastname_father,
        lastname_mother,
        age
    } = req.body;
    console.log(        
        IdFather,
        name,
        lastname_father,
        lastname_mother,
        age);
    try {
        let son = await Son.create({
            IdFather,
            name,
            lastname_father,
            lastname_mother,
            age
        });

        res.json({
            error: false,
            status: 200,
            mensage_global: "Hijo agregado",
            son
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

router.put('/updateSon', async function (req, res) {

    let {
        Id,
        name,
        lastname_father,
        lastname_mother,
        age
    } = req.body;


    try {
        let son = await Son.findByPk(Id);
        console.log("Actualizando usuario");
        console.log(son)
        son.name = name;
        son.age = age;
        son.lastname_father = lastname_father;
        son.lastname_mother = lastname_mother;
        //son.IdFather = IdFather;
        son = await son.save();
        res.json({
            error: false,
            status: 200,
            mensage_global: "Hijo actualizado"
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



router.delete('/deletSon/:Id', async function (req, res) {
    let {
        Id
    } = req.params;

    try {
        await Son.destroy({
            where: {
                Id,
            }
        })
        res.json({
            error: false,
            status: 200,
            mensage_global: "Hijo eliminado"
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

export default router;