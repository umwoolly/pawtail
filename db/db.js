const mongoose = require('mongoose');   // import the mongoose module
const Schema = mongoose.Schema;

let connection = undefined;
// const localMongoDB = "mongodb://127.0.0.1/pawtail-database";

require('dotenv').config();

const getConnection = async () => {
    if (connection) {
        console.log('Returning existing MongoDB connection');
    } else {
        console.log('Creating new connection to MongoDB');
        connection = await mongoose.connect(process.env.MONGODB_URI/* || localMongoDB*/, {useNewUrlParser: true, useUnifiedTopology: true});
    }
    return connection;
};

module.exports = {    
    mongoose,
    Schema,
    getConnection
};