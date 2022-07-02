import {DataTypes} from "sequelize";
import sequelize from "../model/DataBase.model.js"
import {Father} from "../model/Father.model.js";

export const Son = sequelize.define('son', {
    Id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type: DataTypes.STRING,
    },

    lastname_father:{
        type: DataTypes.STRING,
    },
    lastname_mother:{
        type: DataTypes.STRING,
    },  
    age:{
        type: DataTypes.INTEGER,
    },
},{
    timestamps:false
});



