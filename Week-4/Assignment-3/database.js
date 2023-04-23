//import mysql from 'mysql2';
//const mysql = require('mysql2');


/*const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'sef97jil',
    database: 'assignment'
}).promis



const re = pool.query("SELECT * FROM user");
console.log(re);

module.exports = pool;
async function getAssignment(){
    const result = await pool.query("SELECT * FROM user");
    const rows = result[0];
    return rows;
}
*/
/*async function getUserData() {
    const pool = mysql.createPool({
      host: '127.0.0.1',
      user: 'root',
      password: 'sef97jil',
      database: 'assignment'
    }).promise()
  
    const [rows] = await pool.query("SELECT * FROM user");
    return rows ;

    async function getUser(id) {
        const [rows] = await pool.query(`
        SELECT * FROM user
        WHERE email = ${id}
        `)
        console.log(rows);
    }
}

async function logUsers() {
        const users = await getUserData();
        console.log(users);
}
  
  logUsers();
  getUser(1);
*/
// database.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'sef97jil',
  database: 'assignment'
});

async function getUserData() {
  const [rows] = await pool.query("SELECT * FROM user");
  console.log(rows);
  return rows;
}

module.exports = {
  pool: pool,
  getUserData: getUserData
};

