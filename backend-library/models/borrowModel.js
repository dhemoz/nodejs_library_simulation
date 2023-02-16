import {Sequelize} from 'sequelize';
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Borrow = db.define('borrow_data', {
    member_code: DataTypes.STRING,
    book_code: DataTypes.STRING,
},{
    freezeTablename: true
});

export default Borrow;