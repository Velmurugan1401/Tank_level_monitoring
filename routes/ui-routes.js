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

    self.router.get('/main',function (req, res) {

        res.render('home/tankStatus.html', {
            layout: '',
            sessionObj: req.session['sessionObj'],
            config: self.app.conf,
            basePath: self.app.conf.web.basepath
        });
    });

    self.router.get('/home',function (req, res) {

        res.render('home/tankstatus.html', {
            layout: false,
            sessionObj: req.session['sessionObj'],
            config: self.app.conf,
            basePath: self.app.conf.web.basepath
        });
    });
    self.router.get('/tankStatus',function (req, res) {

        res.render('home/tankstatus.html', {
            layout: false,
            sessionObj: req.session['sessionObj'],
            config: self.app.conf,
            basePath: self.app.conf.web.basepath
        });
    });
    self.router.get('/dashboard',function (req, res) {

        res.render('home/dashboard.html', {
            layout: false,
            sessionObj: req.session['sessionObj'],
            config: self.app.conf,
            basePath: self.app.conf.web.basepath
        });
    });
    self.router.get('/tanks',function (req, res) {

        res.render('home/managetanks.html', {
            layout: false,
            sessionObj: req.session['sessionObj'],
            config: self.app.conf,
            basePath: self.app.conf.web.basepath
        });
    });
    self.router.get('/devices',function (req, res) {

        res.render('home/managedevices.html', {
            layout: false,
            sessionObj: req.session['sessionObj'],
            config: self.app.conf,
            basePath: self.app.conf.web.basepath
        });
    });
    self.router.get('/users',function (req, res) {

        res.render('home/users.html', {
            layout: false,
            sessionObj: req.session['sessionObj'],
            config: self.app.conf,
            basePath: self.app.conf.web.basepath
        });
    });
    self.router.get('/rawmessages',function (req, res) {

        res.render('home/rawmessages.html', {
            layout: false,
            sessionObj: req.session['sessionObj'],
            config: self.app.conf,
            basePath: self.app.conf.web.basepath
        });
    });



   
    self.app.use(self.app.conf.web.basepath, self.router);
};
