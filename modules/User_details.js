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
        self.common.commonAdd(self.table.USER_TABLE,req,res);
      
    }
    else if(req.params.action === 'update'){
        self.common.commonUpdate(self.table.USER_TABLE,req,res);
    }
    else if(req.params.action === 'delete'){
        self.common.commonUserDelete(req,res);
    }
    else if(req.params.action === 'list'){
        self.common.commonUserlist(req,res);
    }
    else if(req.params.action === 'userinsert'){
        self.common.commonUser(req,res);

    }
    else{
        res.status(401).json({status:false,message:'Invalid Access'})
    }
}
