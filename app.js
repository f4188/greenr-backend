//index.js
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    authRouter = express.Router(),
    openRouter = express.Router(),
    passport = require('passport'),
    authController = require('./controllers/auth_controller'),
    clientController = require('./controllers/client_controller'),
    oauthController = require('./controllers/oauth_controller'),
    userController = require('./controllers/users_controller'),
    companyController = require('./controllers/company_controller'),
    eventController = require('./controllers/event_controller'),
    mailController = require('./controllers/mail_controller'),
    ip = require('ip');

var port = 8086;

mongoose.Promise = global.Promise
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
        console.log(req)
        next();
    });

    // initialising the authentication middleware
    app.use(passport.initialize());

  // all the API's would be pre-fixed with /api/0.1 where 0.1 is its version number
  //app.use('/api/0.1', authController.isAuthenticated)
  authRouter.use(authController.isAuthenticated)
  app.use('/api/0.1', authRouter);
  //app.use('/api/0.1', openRouter)

}

app.post('/login', userController.loginUser)
app.post('/signup', userController.createUser)

//app.<REQUEST_METHOD>(<REQUEST_URI>, <CONTROLLER_METHOD>)
authRouter.post('/users/create', userController.createUser)
authRouter.post('/company/create', companyController.createCompany)
authRouter.post('/event/create', eventController.createEvent)

//router.post('/mail', mailController.sendMailToUser)

//endpoint to get user details
authRouter.get('/users/:username', userController.getUser);
authRouter.get('/users', userController.getAllUsers)

//router.get('/users', userController.)
authRouter.get('/companies/:username', companyController.getCompany);
authRouter.get('/companies', companyController.listCompanies);

authRouter.get('/events/:eventId', eventController.getEvent);
authRouter.get('/listevents/:companyId', eventController.listEvents);

//app.get('/hello', function(req, res) { res.send("hello") } )

app.listen(port);

console.log("Base Server started at "  + port);
