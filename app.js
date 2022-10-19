// Add Express
const { json } = require('express');
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');

// Initialize Express
const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const members = []

// middleware is a function that gets executed on every request
// and what are we doing? we are sending the content of the public folder
app.use(express.static(path.join(__dirname, './client/public/')));

// this is being called whenever a request comes in no matter what routes the request is for
app.use((req, res, next) => {
    console.log('a request came in, we are in the middleware')
    console.log(req.path)
    console.log(req.method)
    // you should never do this, don't ever send a response inside the middleware because once the response is executed, it will never go to the next()
    //res.send()
    next()
})

// Create GET request
app.get('/', (req, res)=>{
    console.log('accessing route /, METHOD = GET');
    res.sendFile(path.join(__dirname,'/client/index.html'));
});

app.get('/login', (req, res) => {
    console.log('accessing route /login, METHOD = GET');
    res.sendFile(path.join(__dirname, '/client/login.html'));
})

app.get('/signup', (req, res) => {
    console.log('accessing route /signup, METHOD = GET');
    res.sendFile(path.join(__dirname, '/client/signup.html'));
})

app.post('/signup', (req, res) => {
    console.log('we got a new member')
    console.log(req.body)
    members.push(req.body)
    res.json({
        message: "Member created successfully"
    })
})

app.post('*', (req, res) => {
    res.json({
        "error": "invalid route"
    })
})

app.get('/members', (req, res) => {
    res.json(members)
})

// Initialize server
app.listen(port, ()=>{
    console.log('Listening on port: ' + port);
});

// Export app (Express API) so vercel can access it
module.exports = app;