import path from 'path';
import dotenv from 'dotenv';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//console.log(process.env.NODE_ENV+".env");

const option = dotenv.config({
    path: path.resolve(__dirname, `../environments/.env.option`)
})

const data = dotenv.config({
    path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`)
})

//console.log(process.env.USERS);


export const database = {
    username: process.env.USERS,
    host: process.env.HOST,
    database:  process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
}

export const api = {
    port : process.env.PORT
}