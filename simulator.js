const express=require("express")
const request=require("request")
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.json());
var API_URL="https://dev.boodskap.io/api";
var DOMAIN_KEY="CDZMKBHJUM";
var API_KEY="UoHQ46ZNmTZu";
var MID="102";
var fwver="1.0";
var dmd="2.1";
var did="DEV_120";
var obj={
    name:"ram",
    location:"chennai"
}

const arr=[{
 "device_id":3477,
 "name":"vel",
 "location":"chennai"   
}   , {
    "device_id":3454,
    "name":"velmurugan",
    "location":"chennai"   
   } ,{
    "device_id":3455,
    "name":"velvel",
    "location":"chennai"   
   }];
   
app.get("/",(req,res)=>{
    res.send("now start")
    var url=`${API_URL}/push/json/${DOMAIN_KEY}/${API_KEY}/${did}/${dmd}/${fwver}/${MID}`;
    request.post({
      uri:url,  
        Headers:{"content-type":"application/json"},
        body:JSON.stringify(obj)
    },function(err,res,body){
        console.log("thappu thambi"+err);
        console.log("code"+body);

    })
}
)
app.listen(8000);