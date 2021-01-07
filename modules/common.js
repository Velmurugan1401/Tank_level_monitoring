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
Common.prototype.commonSearchdev = function ( req, res) {

    const self = this;

    const boodskap = new Boodskap(self.app, req['session']['sessionObj'].token);

    boodskap.devSearch( req.body.data,function (status, result) {


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
Common.prototype.MsgSearch = function (tablename, req, res) {

    const self = this;

    const boodskap = new Boodskap(self.app, req['session']['sessionObj'].token);

    boodskap.MSGSearch(tablename, req.body.query, function (status, result) {


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


Common.prototype.commonUserUpdate = function (tablename, req, res) {

    console.log("update",req.body)
    const self = this;

    const boodskap = new Boodskap(self.app, req['session']['sessionObj'].token);

    boodskap.elasticUpdate(tablename, req.body._id, req.body.updateData, function (status, result) {


        if (status) {
            var obj ={
                "email" : req.body.updateData.email,
                "firstName" : req.body.updateData.fname,
               "lastName" : req.body.updateData.lname,
               "primaryPhone" : req.body.updateData.mnumber,
               "password": req.body.updateData.password,
               "roles": [
                req.body.updateData.roles
              ],
            }
            console.log("obj",obj)
            boodskap.PlatformUserCreate(obj, function (status, result) {
      
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
        // console.log(status)

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

    boodskap.elasticInsert(tablename, req.body, function (status, result) {
        
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




Common.prototype.commonUpdate = function (tablename, req, res) {

    const self = this;

    const boodskap = new Boodskap(self.app, req['session']['sessionObj'].token);

    boodskap.elasticUpdate(tablename, req.body._id, req.body.updateData, function (status, result) {



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



Common.prototype.commonUserAdd = function (tablename, req, res) {

//   console.log("common",req.body);
    const self = this;

    const boodskap = new Boodskap(self.app, req['session']['sessionObj'].token);

    boodskap.elasticInsert(tablename, req.body, function (status, result) {
        
        if (status) {

            var obj={
                "email": req.body.email,
                "password": req.body.password,
                "firstName": req.body.fname,
                "lastName": req.body.lname,
                "primaryPhone": req.body.mnumber,
               
                "roles": [
                  req.body.roles
                ],
                
              }
           
            boodskap.PlatformUserCreate(obj, function (status, result) {
      
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
        } else {
            res.json({
                status: false,
                message: result
            });

        }
    });
};

Common.prototype.commonUserDelete = function (tablename, req, res) {

    console.log("del",req.body)

    const self = this;

    const boodskap = new Boodskap(self.app, req['session']['sessionObj'].token);

    boodskap.elasticDelete(tablename, req.body._id, function (status, result) {

        if (status) {

          
            
            boodskap.PlatformUserDelete( req.body.email,function (status, result) {

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
        
        } else {
            res.json({
                status: false,
                message: result
            });
        }
    });

};


// Common.prototype.commonUser = function (req, res) {

//     const self = this;

//     const boodskap = new Boodskap(self.app, req['session']['sessionObj'].token);
  
//     boodskap.PlatformUserCreate(req.body, function (status, result) {
      
//         if (status) {
//             res.json({
//                 status: true,
//                 result: result
//             });
//         } else {
//             res.json({
//                 status: false,
//                 message: result
//             });

//         }
//     });
// };

// // user delete========

// Common.prototype.commonUserDelete = function (req, res) {

//     const self = this;

//     const boodskap = new Boodskap(self.app, req['session']['sessionObj'].token);

//     boodskap.PlatformUserDelete(req.body.email_id, function (status, result) {

//         if (status) {
//             res.json({
//                 status: true,
//                 result: result
//             });
//         } else {
//             res.json({
//                 status: false,
//                 message: result
//             });
//         }
//     });

// };


// Common.prototype.commonUserlist = function (req,res) {

//     const self = this;

//     const boodskap = new Boodskap(self.app, req['session']['sessionObj'].token);

//     boodskap.Userlist( req.body.data,function (status, result) {
     

//         if (status) {
//             res.json({
//                 status: true,
//                 result: result
//             });
//         } else {
//             res.json({
//                 status: false,
//                 message: result
//             });

//         }
//     });

// };