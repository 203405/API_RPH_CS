import {DataTypes} from "sequelize";
import sequelize from "../model/DataBase.model.js";
import {Father} from "../model/Father.model.js";

export const User = sequelize.define('user', {
    Id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    username:{
        type: DataTypes.STRING,
    },
    password:{
        type: DataTypes.STRING,
    },
    lastname:{
        type: DataTypes.STRING,
    },
    phone:{
        type: DataTypes.STRING,
    }    
},{
    timestamps:false
});

User.hasMany(Father,{
    foreignKey:"IdUser",
    sourceKey:"Id"
});


Father.belongsTo(User,{
    foreignKey:"IdUser",
    targetId:"Id"
});