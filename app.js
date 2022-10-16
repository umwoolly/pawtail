// Add Express
const express = require('express');
const { Module } = require('module');
const path = require('path');

// Initialize Express
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, './client/public/')));

// Create GET request
app.get('/', (req, res)=>{
    console.log('accessing route /, METHOD = GET');
    res.sendFile(path.join(__dirname,'/client/index.html'));
});

app.get('/login.html', (req, res) => {
    console.log('accessing route /login, METHOD = GET');
    res.sendFile(path.join(__dirname, '/client/login.html'));
})

// Initialize server
app.listen(port, ()=>{
    console.log('Listening on port: ' + port);
});

// Export app (Express API) so vercel can access it
module.exports = app;