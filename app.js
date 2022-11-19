const { json } = require('express');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { engine } = require('express-handlebars');
const userRoutes = require('./user_module/route');
const petRoutes = require('./pet_module/route');
const tributeRoutes = require('./tribute_module/route');
const { getConnection, mongoose } = require('./db/db');

// Initialize Express
const app = express();
const port = 3000;

// View engine setup
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');

const members = []

// middleware is a function that gets executed on every request
// and what are we doing? we are sending the content of the public folder
app.use(express.static(path.join(__dirname, './client/public/')));
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// userRoutes(app);
// petRoutes(app);
// tributeRoutes(app);

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
    console.log('accessing route /, METHOD = GET')
    res.sendFile(path.join(__dirname,'/client/index.html'))
});

app.get('/login', (req, res) => {
    console.log('accessing route /login, METHOD = GET')
    res.sendFile(path.join(__dirname, '/client/login.html'))
})

app.get('/signup', (req, res) => {
    console.log('accessing route /signup, METHOD = GET')
    res.sendFile(path.join(__dirname, '/client/signup.html'))
})

app.post('/signup', (req, res) => {
    console.log('we got a new member')
    console.log(req.body)
    members.push(req.body)
    res.json({
        message: "Member created successfully"
    })
})

app.get('/members', (req, res) => {
    res.json(members)
})

app.get('*', (req, res) => {
    console.log('invalid route, METHOD = GET')
    res.sendFile(path.join(__dirname, '/client/404.html'))
})

app.post('*', (req, res) => {
    res.json({
        "error": "invalid route"
    })
})

const startServer = async () => {
    await getConnection()

    // Setup default mongoose connection
    const db = mongoose.connection;
    // Bind connection to error event (to get notification of connection error).
    db.on("error", console.error.bind(console, "MongoDB connection error:"));

    app.listen(port, async() => {
        console.log(`Server listening on port ${port}`);
    })
}

startServer();
