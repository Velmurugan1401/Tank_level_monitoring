var Utils = require("../modules/utils");
var Boodskap = require("../modules/boodskap");
var Commons = require("../modules/common");
var Tables = require("../modules/tables");
var Student = require("../modules/student");
const Tank = require("../modules/Tank_details");
const Tankstatus = require("../modules/Tank_status");
const EventTrigger = require("../modules/event_trigger");
const Tankhistory = require("../modules/Tank_history");
const Device = require("../modules/Device_details");
const Users = require("../modules/User_details");
const MSG = require("../modules/msg")



var APIRoutes = function (app, router) {

    this.app = app;
    this.router = router;
    this.conf = app.conf;

    this.utils = new Utils(app);
    this.common = new Commons(app);
    this.table = new Tables(app);
    this.student = new Student(app);
    this.tank=new Tank(app);
    this.Tank_status=new Tankstatus(app);
    this.event_trigger=new EventTrigger(app);
    this.Tank_history=new Tankhistory(app);
    this.Device_details=new Device(app);
    this.details=new Users(app);
    this.msg=new MSG(app)     
    this.init();

};
module.exports = APIRoutes;



APIRoutes.prototype.init = function () {

    const self = this;

    var sessionCheck = function (req, res, next) {


        var sessionObj = req.session['sessionObj'];

        if (sessionObj && sessionObj.token) {


            next();

        } else {
            res.status(401).json({
                status: false,
                message: 'Unauthorized Access'
            })
        }
    };

    //Authentication, Activation & Reset Password

    self.router.post('/login', function (req, res) {
        var boodskap = new Boodskap(self.app)
        boodskap.login(req, res);


    });

    self.router.post('/logout',sessionCheck, function (req, res) {
        var sessionObj = req.session['sessionObj'];
        var boodskap = new Boodskap(self.app, sessionObj.token)
        boodskap.logout(req, function (status) {
            res.json({
                status: true
            });
        });
    });
    self.router.post('/student/:action', sessionCheck, function (req, res) {
        self.student.performAction(req, res);
    });
    self.router.post('/tank/:action', sessionCheck, function (req, res) {


        self.tank.performAction(req, res);
    });
    self.router.post('/tankstatus/:action', sessionCheck, function (req, res) {
        self.Tank_status.performAction(req, res);
    });
    // MASSAGE TABLE HISTORYS LIST

    
    self.router.get('/tankhistory/:action', sessionCheck, function (req, res) {
        self.Tank_history.performAction(req, res);
    });
    self.router.post('/eventtrigger/:action', sessionCheck, function (req, res) {
        self.event_trigger.performAction(req, res);
    });
    self.router.get('/device/:action', sessionCheck, function (req, res) {
        self.Device_details.performAction(req, res);
    });
    self.router.post('/devicedetail/:action', sessionCheck, function (req, res) {
        self.Device_details.performAction(req, res);
    });
    self.router.post('/user/:action', sessionCheck, function (req, res) {
      
        self.details.performAction(req, res);
    });
    self.router.get('/usersearch/:action', sessionCheck, function (req, res) {
        console.log("users",req.body)
        self.details.performAction(req, res);
    });


    self.router.post('/msg/:action', sessionCheck, function (req, res) {

        self.msg.performAction(req, res);
    });


    self.app.use(self.app.conf.web.basepath, self.router);

};
