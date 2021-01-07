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
j = [90, 100, 80, 100, 90, 90, 90, 90, 100, 90,100,90,90,90,90];
// define object filed

let obj = [{

        "capacity": 1000,
        "tank_level": " ",
        "unit": "liter",
        "power_status": "Active"
    }, {

        "capacity": 2000,
        "tank_level": " ",
        "unit": "liter",
        "power_status": "Active"
    }, {

        "capacity": 3000,
        "tank_level": " ",
        "unit": "liter",
        "power_status": "Active"
    }, {

        "capacity": 4000,
        "tank_level": " ",
        "unit": "liter",
        "power_status": "Active"
    }, {

        "capacity": 5000,
        "tank_level": " ",
        "unit": "liter",
        "power_status": "Active"
    }, {

        "capacity": 6000,
        "tank_level": " ",
        "unit": "liter",
        "power_status": "Active"
    }, {

        "capacity": 7000,
        "tank_level": " ",
        "unit": "liter",
        "power_status": "Active"
    },
    {

        "capacity": 8000,
        "tank_level": " ",
        "unit": "liter",
        "power_status": "Active"
    }, {

        "capacity": 9000,
        "tank_level": " ",
        "unit": "liter",
        "power_status": "Active"
    }, {

        "capacity": 10000,
        "tank_level": " ",
        "unit": "liter",
        "power_status": "Active"
    },
    {

        "capacity": 11000,
        "tank_level": " ",
        "unit": "liter",
        "power_status": "Active"
    },
    {

        "capacity": 12000,
        "tank_level": " ",
        "unit": "liter",
        "power_status": "Active"
    },
    {

        "capacity": 13000,
        "tank_level": " ",
        "unit": "liter",
        "power_status": "Active"
    },
    {

        "capacity": 14000,
        "tank_level": " ",
        "unit": "liter",
        "power_status": "Active"
    },
    {

        "capacity": 15000,
        "tank_level": " ",
        "unit": "liter",
        "power_status": "Active"
    }
]

// cron.schedule for every 3 minits
cron.schedule('*/3 * * * * *', function () {
    // send continiously in 10 device values 

    for (i = 0; i <= obj.length-1; i++) {
        j[i] = j[i] + 510;
        obj[i].tank_level = j[i];
        //    condition chacking tank level 
        if (obj[i].capacity <= obj[i].tank_level) {
            j[i] = 90;
        }
        var did = "SAMP_DEV_10" + i;
        console.log(did, obj[i])

        //  ruquest post used to push msg to msg table
        let url = `${API_URL}/push/json/${DOMAIN_KEY}/${API_KEY}/${did}/${dmdl}/${fwver}/${mid}`;
        request.post({
            uri: url,

            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify(obj[i])

            // display the response 
        }, function (err, res, body) {

            let json = JSON.parse(body);
            // console.log(json);

        })
    }


}, )

// app listen in 8000 port
app.listen(8000);