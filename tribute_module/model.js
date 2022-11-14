const {mongoose, Schema} = require('../db/db');

const TributeSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    content: String,
    pet_id: {
        type: Schema.Types.ObjectId,
        ref: "Pet"
    },
    date: Date
});

const TributeModel = mongoose.model('Tribute', TributeSchema);

module.exports = TributeModel;