const {mongoose, Schema} = require('../db/db');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Email required"]
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
    joined: {
        type: Date,
        default: Date.now
    }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;