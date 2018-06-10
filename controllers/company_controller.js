var Company = require('../models/company_model');
//users_controller.js
var User = require("../models/users_model.js")
var Token = require("../models/token_model.js")

var Utils = require("../utils/utility.js")
bcrypt = require('bcrypt');

const saltRounds = 10;

exports.createCompany = function(req, res) {
    var company = new Company(); // creating a new video object
    // initialising the objects params got from the request body
    console.log(req)
    company.name = req.body.companyName;
    company.logo = req.body.companyLogo;
    company.website = req.body.companyWebsite;
    company.username = req.body.username;

    // saving video on to the db
    company.save(function(error) {
      console.log(company._id)
        if (error) {
            return res.json({ success : false, status : error }); // every json response will have these 2 fields
        }
        createUser(req, res, company._id);
    });
}

createUser = function(req, res, companyId) {

    // var EmailV, phoneV, field, value
  	console.log("lai le")

    // // check if email is sent or phone number is sent
    // if (req.body.email) {
    //   emailV = req.body.email
    //   field = "email"
    //   value = emailV
    // }
    // else
    //   emailV = ""
    //
    // if (req.body.phone) {
    //   phoneV = req.body.phone
    //   field = "phone"
    //   value = phoneV
    // }
    // else
    //   phoneV = ""

    var user = new User({
    username: req.body.username,
    // email:  emailV,
    // phone: phoneV,
    password: req.body.password,
    companyId,
    accountType: req.body.accountType,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    });

    Utils.isUnique("username", req.body.username, function (err, result) {
      if (err) return Utils.db_error(res);

      if(!result) {

      user.save(function(err) {

      if (err) {
      var duplicateKey = 11000
      if (err.code == duplicateKey){
        return Utils.send(res, "error", "user already exists")
      }

      return Utils.db_error(res,err)
      }
      else
      Utils.send(res,"success", "user created successfully")

      });

      }
      else {
        Utils.send(res,"error", "email/phone already exists")
      }

  })

}

// Function to get User details when username is passed
exports.getCompany = function(req,res) {

  Company.findOne({username:req.params.username} , function(err, company) {
    if (err) return dbError(res, err)
    res.json(company)
  })
}

exports.listCompanies = (req,res) => {
  Company.find({}, (err, companies) => {
      if (err) return dbError(res, err)
      res.json(companies);
  })
}
