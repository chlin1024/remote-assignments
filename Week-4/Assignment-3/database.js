//import mysql from 'mysql2';
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'assignment'
}).promise()

module.exports = pool;

async function getAssignment(){
    const result = await pool.query("SELECT * FROM assignment");
    const rows = result[0];
    return rows;
}

//aysnc function checkEmail(){
    
//}

