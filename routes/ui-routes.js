var Utils = require("../modules/utils");
var Common = require("../modules/common");
var Tables = require("../modules/tables");

var UIRoutes = function (app, router) {

    this.app = app;
    this.router = router;
    this.conf = app.conf;

    this.utils = new Utils(app);
    this.common = new Common(app);
    this.table = new Tables(app);

    this.init();

};
module.exports = UIRoutes;


UIRoutes.prototype.init = function () {

    const self = this;

    var sessionCheck = function (req, res, next) {

        if(req.session['sessionObj']){
            next();
        }else{
            res.redirect(self.app.conf.web.basepath + "/login");
        }
    };

    self.router.get('/', function (req, res) {
        res.redirect(self.app.conf.web.basepath + '/login');
    });

    self.router.get('/login',function (req, res) {

        var sessionObj = req.session ? req.session['sessionObj']:"";

        if (sessionObj) {
            res.redirect(self.app.conf.web.basepath + '/main');
        } else {
            res.render('login.html', {
                layout: false,
                config: self.app.conf.settings,
                basePath: self.app.conf.web.basepath
            });
        }
    });


    //After Login pages

    self.router.get('/main',sessionCheck,function (req, res) {
       
        res.render('home/dashboard.html', {
            layout: '',
            sessionObj: req.session['sessionObj'],
            config: self.app.conf,
            basePath: self.app.conf.web.basepath
           
        });
    });

    self.router.get('/home',sessionCheck,function (req, res) {

        res.render('home/dashboard.html', {
            layout: false,
            sessionObj: req.session['sessionObj'],
            config: self.app.conf,
            basePath: self.app.conf.web.basepath
        });
    });
    self.router.get('/tankstatus',sessionCheck,function (req, res) {

        res.render('home/tankstatus.html', {
            layout: false,
            sessionObj: req.session['sessionObj'],
            config: self.app.conf,
            basePath: self.app.conf.web.basepath
        });
    });
    self.router.get('/dashboard',sessionCheck,function (req, res) {

        res.render('home/dashboard.html', {
            layout: false,
            sessionObj: req.session['sessionObj'],
            config: self.app.conf,
            basePath: self.app.conf.web.basepath
        });
    });
    self.router.get('/tanks',sessionCheck,function (req, res) {

        res.render('home/managetanks.html', {
            layout: false,
            sessionObj: req.session['sessionObj'],
            config: self.app.conf,
            basePath: self.app.conf.web.basepath
        });
    });
    self.router.get('/devices',sessionCheck,function (req, res) {

        res.render('home/managedevices.html', {
            layout: false,
            sessionObj: req.session['sessionObj'],
            config: self.app.conf,
            basePath: self.app.conf.web.basepath
        });
    });
    self.router.get('/users',sessionCheck,function (req, res) {

        res.render('home/users.html', {
            layout: false,
            sessionObj: req.session['sessionObj'],
            config: self.app.conf,
            basePath: self.app.conf.web.basepath
        });
    });
    self.router.get('/rawmessages',sessionCheck,function (req, res) {

        res.render('home/rawmessages.html', {
            layout: false,
            sessionObj: req.session['sessionObj'],
            config: self.app.conf,
            basePath: self.app.conf.web.basepath
        });
    });

    self.router.get('/snapshot',sessionCheck,function (req, res) {

        res.render('home/snapshot.html', {
            layout: false,
            sessionObj: req.session['sessionObj'],
            config: self.app.conf,
            basePath: self.app.conf.web.basepath
        });
    });
    self.router.get('/profile',sessionCheck,function (req, res) {

        res.render('home/profile.html', {
            layout: false,
            sessionObj: req.session['sessionObj'],
            config: self.app.conf,
            basePath: self.app.conf.web.basepath
        });
    });

    self.app.use(self.app.conf.web.basepath, self.router);
};
