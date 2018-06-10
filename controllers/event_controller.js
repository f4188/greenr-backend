var mailController = require('./mail_controller')
var User = require("../models/users_model.js")

var Event = require('../models/event_model');

exports.createEvent = function(req, res) {
    var event = new Event(); // creating a new video object

    // initialising the objects params got from the request body
    event.name = req.body.name;
    event.description = req.body.description;
    event.imageUrl = req.body.imageUrl;
    event.points = req.body.points;
    event.category = req.body.category;
    event.date = req.body.date;
    event.username = req.body.username;
    event.companyId = req.body.companyId;

    // saving video on to the db
    event.save(function(error) {
        if (error) {
            return res.json({ success : false, status : error }); // every json response will have these 2 fields
        }
        User.find({companyId:event.companyId}, (err, users) => {
            users.forEach(user => {
                mailController.sendMailToUser(user,event)
            })
            res.json({ success : true, status : event }); // sending video data for response as of now
        })
    });     
    
}

// Function to get User details when username is passed
exports.getEvent = function(req,res) {
  Event.findOne({ _id :req.params.eventId} , function(err, event) {
    if (err) return dbError(res, err)
    res.json(event)
  })
}

exports.listEvents = (req,res) => {
  Event.find({companyId : req.params.companyId}, (err, events) => {
      if (err) return dbError(res, err)
      res.json(events);
  })
}

