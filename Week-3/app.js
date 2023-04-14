const express = require('express');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');

app.get('/', (req, res) => {
    res.send('Hello, My server!');
});
// Assignment 2
app.get('/data', (req, res) => {
    let data = req.query.number;
    if (!data) {
      res.send('Lack of Paraments');
    } else if (isNaN(data)) {
      res.send('Wrong Paraments');
    } else {
      let n = Number(data);
      let sum = ((1 + n) * n ) / 2;
      res.send(`${sum}`);
    } 
});
// Assignment 3
app.use(express.static('public'));

// Assignment 4
app.use(cookieParser());

app.get('/myName', (req, res) => {
  const name = req.cookies.name;
  if (name) {
    res.send(`${name}`);
  } else {
    res.send(`<form action="/trackName" method="get">
    <label for="name">Enter your name:</label>
    <input type="text" id="name" name="name">
    <button type="submit">Submit</button>
  </form>`);
  }
})

app.get('/trackName', (req, res) => {
  const name = req.query.name;
  res.cookie('name', name);
  res.redirect('/myName');
})

// Listening to client request
app.listen(3000, () => {
    console.log(`The application is runnning on Localhost:${port}`);
    console.log(`Listening to request on${port}`);
});