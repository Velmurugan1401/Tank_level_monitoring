var Common = require("./common")
var Table = require("./tables")

var Users = function (app){
    this.app = app;
    this.common = new Common(app);
    this.table = new Table(app);
}
module.exports = Users;

Users.prototype.performAction = function (req,res){

    const self = this;

    if(req.params.action === 'insert'){
        self.common.commonUserAdd(self.table.USER_TABLE,req,res);
    }
    else if(req.params.action === 'update'){
        self.common.commonUserUpdate(self.table.USER_TABLE,req,res);
    }
    else if(req.params.action === 'delete'){
        self.common.commonUserDelete(self.table.USER_TABLE,req,res);
    }
    else if(req.params.action === 'list'){
        self.common.commonSearch(self.table.USER_TABLE,req,res);
    }
    else{
        res.status(401).json({status:false,message:'Invalid Access'})
    }
}
