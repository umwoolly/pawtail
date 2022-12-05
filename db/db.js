// the reason why the file is named db.js instead of mongoose.js is so that we can scale it
// when necessary, e.g., if we switched out database from mongoose to mysql or postgres, then all
// that needs to change is the content of this file, everywhere else that depends on this file
// can be left as is, nothing is broken by keeping the filename atomic

// everything and anything related to connecting to database is kept here in this file
const mongoose = require("mongoose"); // import the mongoose module
const Schema = mongoose.Schema;

let connection = undefined; //connection
// const localMongoDB = "mongodb://127.0.0.1/pawtail-database";

require("dotenv").config();

/**
 * This function looks for an existing data base connection
 * If one is found, returns existing, otherwise creates a new connection and returns
 * @return
 */
const getConnection = async () => {
  if (connection) {
    console.log("Returning existing MongoDB connection");
  } else {
    console.log("Creating new connection to MongoDB");
    connection = await mongoose.connect(
      process.env.MONGODB_URI /* || localMongoDB*/,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  }
  return connection;
};

module.exports = {
  mongoose,
  Schema,
  getConnection,
};
