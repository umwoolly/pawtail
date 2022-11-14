const {mongoose, Schema} = require('../db/db');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true
    },
    password:{
        type: String,
        required: true
    },
    avatar: String,
    admin: Boolean,
    date: Date
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;