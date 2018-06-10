var mongoose = require('mongoose');

// temporary schema to store the meta-data of videos uploaded by a specific user
var eventSchema = new mongoose.Schema({
    name : { type : String, required: true, unique: true },
    description : { type : String },
    image : { type : String },
    points : { type : String},
    category: { type : String },
    date: { type : String, default : Date.now() },
    username: { type : String }
});

module.exports = mongoose.model('Event', eventSchema);
