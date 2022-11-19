const {mongoose, Schema} = require('../db/db');

const TributeSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["message", "poem", "quote"],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    pet_id: {
        type: Schema.Types.ObjectId,
        ref: "Pet"
    },
    posted: {
        type: Date,
        default: Date.now
    }
});

const TributeModel = mongoose.model('Tribute', TributeSchema);

module.exports = TributeModel;