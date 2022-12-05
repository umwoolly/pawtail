/* ----------------------------- IMPORTING LIBRARIES ----------------------------------------*/

// *** 4 lines required for running a server
const express = require("express"); // *** importing express js code to be able to use its libraries
const path = require("path"); // path is a built in library, provides functions that can work with file system
const bodyParser = require("body-parser"); // it parses the body of HTTP request (i.e.,texts) and converts it to a JS object that we can use
const { engine } = require("express-handlebars"); // bring in handlebars function: engine
const cookieParser = require("cookie-parser");
const userService = require("./user_module/service");
const userRoutes = require("./user_module/route"); // each module follows the MVCS (Model View Controller Service) software architecture design pattern
const petRoutes = require("./pet_module/route");
const tributeRoutes = require("./tribute_module/route");
const { getConnection, mongoose } = require("./db/db"); // our database driver

// Initialize Express
const app = express(); // *** the app is an express object that contains/to access all of the express logics
const port = 3000; // *** hard coded number of the port that we want express to listen on

// View engine setup
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs"); // tell express we want to use the handlebars as our view/templating engine
app.set("views", "./views");

/* ---------------------------- DEFINING MIDDLEWARE ---------------------------------------*/

// middleware is a function that gets executed on every request that comes to express
// and what are we doing? we are sending the content of the public folder
app.use(express.static(path.join(__dirname, "./client/public/"))); // for every request that comes in, include these static files in the response
// parse application/json
app.use(bodyParser.json()); // we tell body-parser that we want to use it as a middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// userRoutes(app);
// petRoutes(app);
// tributeRoutes(app);

// we can build our own middleware, should always put in a call to next() at the end of it.
// this is being called whenever a request comes in no matter what routes the request is for
// Therefore, don't ever send a response inside the middleware.
app.use((req, res, next) => {
  console.log("a request came in, we are in the middleware");
  console.log(req.path);
  console.log(req.method);
  // you should never do this, don't ever send a response inside the middleware because once the response
  // is executed (once we sent a response, it's ending the connection), it will never go to the next()
  //res.send()
  next();
});

/* ------------------------------ DEFINING ROUTES -------------------------------------------*/
// ORDER OF ROUTES MATTER, IT WILL EXECUTE FROM TOP OF THE LIST TO THE BOTTOM SEQUENTIALLY

// Create GET request
app.get("/", (req, res) => {
  console.log("accessing route /, METHOD = GET");
  // __dirname is equivalent to the result of pwd (print working directory), it is a nodejs built in variable representing the current directory where code resides/is run
  res.sendFile(path.join(__dirname, "/client/index.html")); // responding to a request by sending a file
});

app.get("/login", (req, res) => {
  console.log("accessing route /login, METHOD = GET");
  res.sendFile(path.join(__dirname, "/client/login.html"));
});

app.get("/signup", (req, res) => {
  console.log("accessing route /signup, METHOD = GET");
  res.sendFile(path.join(__dirname, "/client/signup.html"));
});

app.post("/signup", async (req, res) => {
  console.log(req.body); // read the data
  try {
    await userService.storeUser(req.body);
    // res.status sets the status of the response -- see mdn HTTP response status codes for all codes agreed upon by the internet committee
    // json will send json data as the response body
    res.status(200).json({
      message: "Member created successfully",
    });
  } catch (err) {
    res.status(400).json({
      error: err, // <--- this is not good, you shouldn't send mongoose error directly to your client
      message: "Unable to create member",
    });
    // remember to always do a return after a res.json
    return;
  }
});

app.get("/user", (req, res) => {
  res.render("profile", {
    name: "Lily",
    email: "lily@eternal.com",
    gender: "female",
  });
});

// "payload" is what browser sends to the server
// "response" is what server sent back and what browser gets in return.

app.get("*", (req, res) => {
  console.log("invalid route, METHOD = GET");
  res.sendFile(path.join(__dirname, "/client/404.html"));
});

app.post("*", (req, res) => {
  res.json({
    error: "invalid route",
  });
});

/* -------------------------------- CONNECTING TO DB ----------------------------------------*/
/* ------------------ STARTING SERVER TO LISTEN TO SPECIFIED PORT ---------------------------*/

const startServer = async () => {
  await getConnection();

  // Setup default mongoose connection
  const db = mongoose.connection;
  // Bind connection to error event (to get notification of connection error).
  db.on("error", console.error.bind(console, "MongoDB connection error:"));

  // *** telling express to start listening on the given port (i.e., first parameter),
  // when it starts listening, it will execute the second parameter (i.e., run the next callback)
  app.listen(port, async () => {
    console.log(`Server listening on port ${port}`);
  });
};

startServer();

/* ----------------------------------  EXPOSING APP  ----------------------------------------*/
// exporting app so vercel can access it
module.exports = app;
