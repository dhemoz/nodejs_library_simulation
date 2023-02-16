import {Sequelize} from "sequelize";

const db = new Sequelize('db_task_perpustakaan','root','',{
    host:'localhost',
    dialect:'mysql'
})

export default db;