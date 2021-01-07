module.exports = {
    "web": {
        "port": 8201,

        "host": "0.0.0.0",
        "basepath": "/tankmonitor"
    },
    "settings": {
        "appApiUrl" : "http://localhost:8201/tankmonitor",
        "url": "http://localhost:8201/tankmonitor",
        "boodskap": {
            "apiUrl": "https://dev.boodskap.io/api",
            "domainKey": "CDZMKBHJUM",
            "apiKey": "UoHQ46ZNmTZu",
            "mqtt": {
                "hostName": 'dev.boodskap.io',
                "portNo": 443,
                "ssl": true
            }
        }
    }
}

