const express = require('express');
const app = express();
const port = 3000;
const pug = require('pug');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'sef97jil',
    database: 'assignment'
})
//const mysql = require('mysql2');
//const pool = require('./database.js');
//const { pool, getUserData } = require('./database');

app.use(express.static('public'));
app.set('view engine', 'pug');
//app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: false }));//urlencode parser
app.use(bodyParser.json());

app.get('/', (req, res) =>{
    res.send('Hello World!This is Week-4!')
});
app.get('/home_page', (req, res) =>{
    res.render('home_page');
})
app.get('/member', (req, res) =>{
    res.render('member');
})

app.post('/sign-in', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    //console.dir(email);
    //console.dir(password);
    if (!email || !password) {
        res.render('home_page',{error: 'Wrong: email/password empty! try again.'});
        return;
    }
    const query = 'SELECT * FROM user WHERE email = ? AND password = ?';
    pool.query(
        query,[email, password],
        function(err, result) {
            console.log(result);
            if (result.length === 1) {
                res.render('member');
                return;
            } else {
                res.render('home_page',{error: 'Wrong: try again.'});
                return;
            }
            if (err) {
                res.render('home',{error: 'Wrong! try again.'});
                return;
            }
        }
    );
});

app.post('/sign-up', async (req, res) =>{
    const email = req.body['signup-email'];
    const password = req.body['signup-password'];
    //console.dir(email);
    //console.dir(password);

    if (!email || !password) {
        res.render('home_page',{error: 'Wrong: email/password empty! try again.'});
        return;
    }
    const query = 'SELECT * FROM user WHERE email = ?';
    pool.query(
        query,[email],
        function(err, result) {
            console.log(result);
            if (result.length === 1) {
                res.render('home_page',{error: 'You are existing member. Please sign-in'});
                return;
            } else if (result.length === 0) {
                const insertQuery = 'INSERT INTO user (email, password) VALUES (?, ?)';
                pool.query(insertQuery, [email, password],
                    function(err, result){
                        if (err) {
                            res.render('home_page',{error: 'Wrong! try again.'});
                            return; 
                        } else {
                            res.render('member');
                        }
                    })
            } else {
                res.render('home',{error: 'Wrong! try again.'});
                return;
            }
        }
    );
});

app.listen(port,() =>{
    console.log(`Hello, My Server! Listening on port ${port}.`)
});