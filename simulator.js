const express = require("express")
const request = require('request');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
let API_URL = "https://dev.boodskap.io/api";
let DOMAIN_KEY = "CDZMKBHJUM";
let API_KEY = "UoHQ46ZNmTZu";
let mid = 1000;
let fwver = "3";
let dmdl = "2";
let did = "";



let obj = {

    "tank_level": " ",
    "unit": "gallon",
 "power_status": "Active"
}



app.get("/", (req, res) => {
    res.send("now start")
    setInterval(function () {
        for (var i = 1; i <= 10; i++) {
            let did = "SAMPLE_DEV_10" + i;
            obj.tank_level = Math.floor(Math.random() * (5000 - 80) + 80);
            console.log(obj, did);

            
            let url = `${API_URL}/push/json/${DOMAIN_KEY}/${API_KEY}/${did}/${dmdl}/${fwver}/${mid}`;
            request.post({
                uri: url,

                headers: {
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify(obj)


            }, function (err, res, body) {

                let json = JSON.parse(body);
                console.log(json);

            })
        }

    }, 60000)





})
app.listen(8000);