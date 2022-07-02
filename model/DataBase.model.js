import {
    Sequelize
} from "sequelize"
import {
    database
} from "../config/database.config.js"

import path from 'path';
import dotenv from 'dotenv';
import {
    fileURLToPath
} from 'url';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);
//console.log(process.env.NODE_ENV+".env");

const option = dotenv.config({
    path: path.resolve(__dirname, `../environments/.env.option`)
})

const data = dotenv.config({
    path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`)
})

console.log(process.env.NODE_ENV);
let sequelize;


switch (process.env.NODE_ENV) {
    case "development":
        sequelize = new Sequelize(
            database.database,
            database.username,
            database.password, {
                host: database.host,
                dialect: "postgres"
            }
        );
        break;
    case "test":
        console.log("PASS",database.password);
        sequelize = new Sequelize(
            database.database,
            database.username,
            database.password, {
                dialectOptions: {
                    ssl: {
                        require: true,
                        rejectUnauthorized: false
                    }
                },
                host: database.host,
                dialect: "postgres"
            }
        );        
        break;
    default:

}

/*


*/




export default sequelize;