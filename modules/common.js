var Boodskap =require("./boodskap")
var Utils = require("./utils")
var Table = require("./tables")

var Common = function (app) {

    this.app = app;
    this.logger = app.logger;
    this.utils = new Utils(app);
    this.table = new Table(app);

};
module.exports = Common;


Common.prototype.commonSearch = function (tablename, req, res) {

    const self = this;

    const boodskap = new Boodskap(self.app, req['session']['sessionObj'].token);

    boodskap.elasticSearch(tablename, req.body.query, function (status, result) {
     

        if (status) {
            res.json({
                status: true,
                result: result
            });
        } else {
            res.json({
                status: false,
                message: result
            });

        }
    });

};
// device=========================================================
Common.prototype.commonDevice = function (req, res) {

    const self = this;

    const boodskap = new Boodskap(self.app, req.token);

    boodskap.deviceSearch(function (status, result) {

        if (status) {
            res.json({
                status: true,
                result: result
            });
        } else {
            res.json({
                status: false,
                message: result
            });

        }
    });

};
// RAW common=====================
Common.prototype.RAWMsg = function (req, res) {

    const self = this;

    const boodskap = new Boodskap(self.app, req.token);

    boodskap.RawMsgSearch(function (status, result) {

        if (status) {
            res.json({
                status: true,
                result: result
            });
        } else {
            res.json({
                status: false,
                message: result
            });

        }
    });

};


Common.prototype.commonUpdate = function (tablename, req, res) {

    const self = this;

    const boodskap = new Boodskap(self.app, req['session']['sessionObj'].token);

    boodskap.elasticUpdate(tablename, req.body._id, req.body.updateData, function (status, result) {
        // console.log(req.body.updateData)


        if (status) {
            res.json({
                status: true,
                result: result
            });
        } else {
            res.json({
                status: false,
                message: result
            });

        }
    });
};
Common.prototype.commonpush = function (tablename, req, res) {

    const self = this;

    const boodskap = new Boodskap(self.app, req['session']['sessionObj'].token);


    boodskap.elasticpush(tablename, req.body.did, req.body.dmdl, req.body.fwver, req.body, function (status, result) {
        console.log(status)

        if (status) {
            res.json({
                status: true,
                result: result
            });
        } else {
            res.json({
                status: false,
                message: result
            });

        }
    });
};

Common.prototype.commonActions = function (tablename, action, req, res) {

    const self = this;

    var sObj = {}
    sObj['data'] = req.body
    sObj['action'] = action
    sObj['table'] = tablename

    var boodskap = new Boodskap(self.app, req['session']['sessionObj'].token);
    boodskap.executeNamedRule(self.table.COMMON_CRUD_OPERATIONS_RULE, sObj, function (status, result) {
        if (status) {
            res.json({
                status: status,
                result: result
            });
        } else {
            res.json({
                status: status,
                result: result
            });
        }

    })

};


Common.prototype.testAction = function (req, res) {

    const self = this;
    var fields = req.body.fields;
    fields['ip_addr'] = self.utils.getCallerIP(req);
    var sObj = {}
    sObj['deviceid'] = req.body.deviceid;
    sObj['commands'] = req.body.commands;
    sObj['fields'] = fields;

    var boodskap = new Boodskap(self.app, req['session']['sessionObj'].token);
    boodskap.executeNamedRule(self.table.TEST_RULE, sObj, function (status, result) {
        if (status) {
            res.json({
                status: status,
                result: result
            });
        } else {

            res.json({
                status: status,
                result: result
            });
        }

    })

};

Common.prototype.commonAdd = function (tablename, req, res) {


    const self = this;

    const boodskap = new Boodskap(self.app, req['session']['sessionObj'].token);
  
    boodskap.elasticInsert(tablename,req.body, function (status, result) {
        console.log("insert",req.body);
        if (status) {
            res.json({
                status: true,
                result: result
            });
        } else {
            res.json({
                status: false,
                message: result
            });

        }
    });
};

Common.prototype.commonDelete = function (tablename, req, res) {

    const self = this;

    const boodskap = new Boodskap(self.app, req['session']['sessionObj'].token);

    boodskap.elasticDelete(tablename, req.body._id, function (status, result) {

        if (status) {
            res.json({
                status: true,
                result: result
            });
        } else {
            res.json({
                status: false,
                message: result
            });
        }
    });

};


Common.prototype.commonUser = function (req, res) {


    const self = this;

    const boodskap = new Boodskap(self.app, req['session']['sessionObj'].token);
  
    boodskap.Userlogin(req.body, function (status, result) {
        console.log("insert",req.body);
        if (status) {
            res.json({
                status: true,
                result: result
            });
        } else {
            res.json({
                status: false,
                message: result
            });

        }
    });
};

// user delete========

Common.prototype.commonUserDelete = function (req, res) {

    const self = this;

    const boodskap = new Boodskap(self.app, req['session']['sessionObj'].token);

    boodskap.UserDelete(req.body.email, function (status, result) {

        if (status) {
            res.json({
                status: true,
                result: result
            });
        } else {
            res.json({
                status: false,
                message: result
            });
        }
    });

};


Common.prototype.commonUserlist = function (req,res) {

    const self = this;

    const boodskap = new Boodskap(self.app, req['session']['sessionObj'].token);

    boodskap.Userlist( function (status, result) {
     

        if (status) {
            res.json({
                status: true,
                result: result
            });
        } else {
            res.json({
                status: false,
                message: result
            });

        }
    });

};