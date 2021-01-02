var Common = require("./common")
var Table = require("./tables")

var Msg = function (app){
    this.app = app;
    this.common = new Common(app);
    this.table = new Table(app);
}
module.exports = Msg;

Msg.prototype.performAction = function (req,res){

    const self = this;

    if(req.params.action === 'insert'){
        
        self.common.commonpush(self.table.MSG_TABLE,req,res);
    }
    else if(req.params.action === 'update'){
        self.common.commonUpdate(self.table.MSG_TABLE,req,res);
    }
    else if(req.params.action === 'delete'){
        self.common.commonDelete(self.table.MSG_TABLE,req,res);
    }
    else if(req.params.action === 'list'){
        self.common.commonSearch(self.table.MSG_TABLE,req,res);
    }
    else{
        res.status(401).json({status:false,message:'Invalid Access'})
    }
}