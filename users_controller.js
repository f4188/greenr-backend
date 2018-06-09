//users_controller.js
var User = require("../models/users_model.js")
var Token = require("../models/token_model.js")

var Utils = require("../utils/utility.js")
bcrypt = require('bcrypt');



const saltRounds = 10;


exports.createUser = function(req, res) {

    // var EmailV, phoneV, field, value
  	console.log("lai le")

    // check if email is sent or phone number is sent
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
    company: req.body.company,
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


exports.loginUser = function(req, res) {

  var query

    if(req.body.email)
    query = {'email':req.body.email}
    else if (req.body.phone)
    query = {'phone':req.body.phone}
    else if (req.body.username)
    query = {'username':req.body.username}

    if(!query)
      return Utils.send(res,"error", "required fields are empty")

    User.findOne(query, function(err, user) {
      if(err) return res.send(err);
        if(user == null) {
          Utils.send(res,"error", "invalid username/email/phone")

        }
        else {
          auth(user)
        }
    });

    function auth( user ) {
      user.verifyPassword(req.body.password,function(err, isMatched) {
        if(err) return res.send(err)
        if (!isMatched) {
        Utils.send(res,"error","invalid password")
        }
        else {
          res.json({"username":user.username, "status":"success"})
        }
      });
    }


}

// Function to get User details when username is passed
exports.getUser = function(req,res) {
  User.findOne({username:req.params.username} , function(err, user) {
    if (err) return dbError(res, err)
    // removing password field from user object
    if(user)
    {
     user.password=undefined
    }
    res.json(user)
  })
}
