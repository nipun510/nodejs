const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var personSchema = new Schema(
    {
        firstname : {
            type: String,
            required: true
        },
        lastname : {
            type: String
        },
        address : {
            type: String,
        },
        description : {
            type: String
        }
    }
)

var person = mongoose.model('person', personSchema);
module.exports = person;