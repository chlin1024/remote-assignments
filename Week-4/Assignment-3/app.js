const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql2');
const pool = require('./database.js');
const pug = require('pug');

app.use(express.static('public'));
app.set('view engine', 'pug');
//app.set('views', './views');


app.get('/', (req, res) =>{
    res.send('Hello World!This is Week-4!')
});
app.get('/home', (req, res) =>{
    res.render('home');
})

app.post('/sign-up', (req, res) =>{
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        res.render('home',{error: 'Wrong! try again.'});
        return;
    }

    pool.query('SELECT * FROM user WHERE email = ?', [email], (err, results) =>{
        if (err) {
            console.log(err);
            res.send('Wrong');
            return;
        }
        if (result.length === 0 ){
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

app.post('/sign-in', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        res.send('Wrong');
        return;
    }

    const query = 'SELECT * FROM user WHERE email = ? AND password = ?';
    pool.query(query, [email, password], (err, result) =>{
        if (err) {
            res.send('wrong');
            return;
        }

        if (result.length === 1) {
            res.redirect('/member_page');
        } else {
            res.send('Wrong email or password.');
        }
    });   
});

app.listen(port,() =>{
    console.log(`Hello, My Server! Listening on port ${port}.`)
});