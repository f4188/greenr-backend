var mongoose = require('mongoose');

// temporary schema to store the meta-data of videos uploaded by a specific user
var companySchema = new mongoose.Schema({
    name : { type : String, required: true, unique: true },
    logo : { type : String },
    website : { type : String },
    username : { type : String, require : true }
});

module.exports = mongoose.model('Company', companySchema);
