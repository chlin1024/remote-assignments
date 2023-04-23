const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql2');
//const pool = require('./database.js');
const pug = require('pug');
const { pool, getUserData } = require('./database');
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.set('view engine', 'pug');
//app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) =>{
    res.send('Hello World!This is Week-4!')
});
app.get('/home_page', (req, res) =>{
    res.render('home_page');
})

app.get('/users', async (req, res) => {
    const users = await getUserData();
    res.json(users);
});

app.post('/sign-in', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    //const users = await getUserData();
    if (!email || !password) {
        res.render('home_page',{error: 'Wrong! try again.'});
        return;
    }

    const query = 'SELECT * FROM user WHERE email = ? AND password = ?';
    pool.query(query, [email, password], (err, result) =>{
        if (err) {
            res.render('home',{error: 'Wrong! try again.'});
            return;
        } else if (result.length === 1) {
            res.redirect('/member_page');
            console.log(1);
        } else {
            res.render('home',{error: 'Wrong! try again.'});
        }
    });
});


app.post('/sign-up', async (req, res) =>{
    const email = req.body.email;
    const password = req.body.password;
    const users = await getUserData();

    if (!email || !password) {
        res.render('home_page',{error: 'Wrong! try again.'});
        return;
    }
    
    pool.query('SELECT * FROM user WHERE email = ?', [email], (err, results) =>{
        if (err) {
            console.log(err);
            res.render('home',{error: 'Wrong! try again.'});
            return;
        }
        if (result.length === 0 ) {
            const insertQuery = 'INSERT INTO user (email, password) VALUES (?, ?)';
            pool.query(insertQuery, [email, password], (err) =>{
                if (err){
                    res.send('wrong');
                    return;
                } 
                res.redirect('/member_page');
            });
        } else {
            res.send('Email already exists');
        }
    });
});



app.listen(port,() =>{
    console.log(`Hello, My Server! Listening on port ${port}.`)
});