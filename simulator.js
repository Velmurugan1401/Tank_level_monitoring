const express = require("express")
const request = require('request');
const cron = require('node-cron');
const app = express();

let API_URL = "https://dev.boodskap.io/api";
let DOMAIN_KEY = "CDZMKBHJUM";
let API_KEY = "UoHQ46ZNmTZu";
let mid = 1000;
let fwver = "3";
let dmdl = "2";
let did = "";

// define object filed

let obj = {

    "tank_level": " ",
    "unit": "gallon",
    "power_status": "Active"
}

// cron.schedule for every 3 minits

cron.schedule('*/3 * * * * *', function () {
    // send continiously in 10 device values 

    for (var i = 1; i <= 10; i++) {
        did = "SAMPLE_DEV_10" + i;
        obj.tank_level = Math.floor(Math.random() * (5000 - 80) + 80);
        console.log(obj, did);

        //  ruquest post used to push msg to msg table
        let url = `${API_URL}/push/json/${DOMAIN_KEY}/${API_KEY}/${did}/${dmdl}/${fwver}/${mid}`;
        request.post({
            uri: url,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)

            // display the response 
        }, function (err, res, body) {
            let json = JSON.parse(body);
        })
    }

}, )

// app listen in 8000 port
app.listen(8000);