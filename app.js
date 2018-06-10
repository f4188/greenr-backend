//index.js
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    router = express.Router(),
    passport = require('passport'),
    authController = require('./controllers/auth_controller'),
    clientController = require('./controllers/client_controller'),
    oauthController = require('./controllers/oauth_controller'),
    userController = require('./controllers/users_controller'),
    companyController = require('./controllers/company_controller'),
    eventController = require('./controllers/event_controller'),
    ip = require('ip');

var port = 8086;

mongoose.connect('mongodb://localhost:27017/nodeAuth');

//configure app
{
  app.set('views', __dirname + '/views')
  app.set('view_options', {layout : false})

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))
  // parse application/json
  app.use(bodyParser.json())

  // the way to provide static contents
  //app.use("/assets", express.static(__dirname + '/assets'))

  app.use(function(req, res, next) { //allow cross origin requests
        res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
    });

  // all the API's would be pre-fixed with /api/0.1 where 0.1 is its version number
  app.use('/api/0.1', router);

  // initialising the authentication middleware
  app.use(passport.initialize());
}

//app.<REQUEST_METHOD>(<REQUEST_URI>, <CONTROLLER_METHOD>)
// Signup and login requests
router.post('/users/create', userController.createUser)
router.post('/company/create', companyController.createCompany)
router.post('/event/create', eventController.createEvent)


//endpoint to get user details
router.get('/users/:username', userController.getUser);
router.get('/companies/:username', companyController.getCompany);
router.get('/companies', companyController.listCompanies);


app.listen(port);

console.log("Base Server started at "  + port);
