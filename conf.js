module.exports = {
    "web": {

      

        "port": 8201,

        "host": "0.0.0.0",
        "basepath": "/tankmonitoring"
    },
    "settings": {
        "appApiUrl" : "http://localhost:8201/tankmonitoring",
        "url": "http://localhost:8201/tankmonitoring",
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

