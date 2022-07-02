import {DataTypes} from "sequelize";
import sequelize from "../model/DataBase.model.js"
import {Son} from './Son.model.js'



export const Father = sequelize.define('father', {
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

Father.hasMany(Son,{
    foreignKey:"IdFather",
    sourceKey:"Id"
});


Son.belongsTo(Father,{
    foreignKey:"IdFather",
    targetId:"Id"
});