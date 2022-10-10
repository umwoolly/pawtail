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
    console.log('accessing route /, METHOD = GET')
    res.sendFile(path.join(__dirname,'/client/index.html'))
});

// Initialize server
app.listen(port, ()=>{
    console.log('Listening on port: ' + port)
});

// Export the Express API
module.exports = app;