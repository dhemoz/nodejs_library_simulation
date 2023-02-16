import {Sequelize} from 'sequelize';
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Member = db.define('member', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
},{
    freezeTablename: true
});

export default Member;