const {mongoose, Schema} = require('../db/db');

const dogBreeds = require('dog-breeds');
const breedArray = dogBreeds.all;

const countryList = require('country-list');
const countryArray = countryList.getNames();

// FUTURE ENHANCEMENT: expand PetSchema beyond dog, to cater as well to cat, bird, etc. 
// FUTURE ENHANCEMENT: expand PetSchema to be location specific instead of just country, to include street, city, state, zip, etc. or longitude, latitude. 

const PetSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true
    },
    breed: {
        type: String,
        enum: breedArray,
        required: true
    },
    bio: {
        type: String,
        trim: true,
        required: true
    },
    country: {
        type: String,
        enum: countryArray,
        required: true
    },
    candles_lit: Number,
    created: {
        type: Date,
        default: Date.now
    }
});

const PetModel = mongoose.model('Pet', PetSchema);

module.exports = PetModel;