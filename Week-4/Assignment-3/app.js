const express = require('express');
const app = express();
const port = 3000;
const pug = require('pug');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const mysql = require('mysql2');
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})
const promisePool = pool.promise();// set pool with promise

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));//urlencode parser

app.get('/', (req, res) =>{
  res.send('Hello World!This is Week-4!')
});
app.get('/home_page', (req, res) =>{
  res.render('home_page');
})
app.get('/member', (req, res) =>{
  res.render('member');
})

app.post('/sign-in', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    res.render('home_page',{error: 'Wrong: email/password empty! try again.'});
    return;
    }
  const query = 'SELECT * FROM user WHERE email = ? AND password = ?';
  promisePool.query(query, [email, password]) // use promise chain
  .then((result) => {
    if (result[0].length === 1) {
      res.render('member');
      return;
    } else {
      res.render('home_page', {error: 'Wrong: try again.'});
      return;
    }
  }) 
  .catch((error) => {
    res.render('home_page', {error: 'Wrong: try again.'});
    return;
  })
});

app.post('/sign-up', (req, res) =>{
  const email = req.body['signup-email'];
  const password = req.body['signup-password'];
  if (!email || !password) {
    res.render('home_page',{error: 'Wrong: email/password empty! try again.'});
    return;
    }
  const query = 'SELECT * FROM user WHERE email = ?';
  promisePool.query(query, [email]) // use promise chain
  .then((result) =>{
    if (result[0].length === 0) {
      const insertQuery = 'INSERT INTO user (email, password) VALUES (?, ?)';
      promisePool.query(insertQuery, [email, password])
      .then((result) => res.render('member'))
      .catch((err) =>{
        res.render('home_page',{error: 'Wrong! try again.'});
        return; 
      })
    } else if (result[0].length === 1) {
      res.render('home_page',{error: 'You are existing member. Please sign-in'});
      return;
    }
  })
  .catch((error) => {
    res.render('home_page',{error: 'You are existing member. Please sign-in'});
      return;
  })
});

app.listen(port,() =>{
    console.log(`Hello, My Server! Listening on port ${port}.`)
});