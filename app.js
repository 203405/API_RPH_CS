import express from 'express';
import userRouter from "./router/User.routes.js"
import fatherRouter from "./router/Father.routes.js"
import sonRouter from "./router/Son.routes.js"
//import {api} from "./config/api.config.js"
import sequelize from "./model/DataBase.model.js"
import "./model/User.model.js"
import "./model/Father.model.js"
import "./model/Son.model.js"
import { api } from './config/database.config.js';
import cors from 'cors';

const app = express();
const PORT = api.port;

//app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
//ROUTERS
app.use('/api/user', userRouter)
app.use('/api/father', fatherRouter)
app.use('/api/son', sonRouter)

//Ejecucion del servidor
app.listen(PORT, async () => {
    console.log("Servidor corriendo en el puerto", PORT)
    
    sequelize.authenticate().then(()=>{    
        console.log("Conexcion exitosa con la base de datos");
    }).catch((err) => {
        console.log("Error en conexcion a la base de datos");
        console.log(err)
    });
    
    await sequelize.sync({alter:true,force:false});
});