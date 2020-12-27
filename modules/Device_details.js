var Common = require("./common")
var Table = require("./tables")

var Device = function (app){
    this.app = app;
    this.common = new Common(app);
    this.table = new Table(app);
}
module.exports = Device;

Device.prototype.performAction = function (req,res){

    const self = this;

    if(req.params.action === 'insert'){
        self.common.commonAdd(self.table.DEVICE_TABLE,req,res);
    }
    else if(req.params.action === 'update'){
        self.common.commonUpdate(self.table.DEVICE_TABLE,req,res);
    }
    else if(req.params.action === 'delete'){
        self.common.commonDelete(self.table.DEVICE_TABLE,req,res);
    }
    else if(req.params.action === 'list'){
        console.log("now",req.body)
        self.common.commonDevice(req,res);
    }
    else{
        res.status(401).json({status:false,message:'Invalid Access'})
    }
}
