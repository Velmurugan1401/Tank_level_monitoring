module.exports = {
    "web": {
        "port": 4001,
        "host": "0.0.0.0",
        "basepath": "/tankmonitoring"
    },
    "settings": {
        "appApiUrl" : "http://localhost:4001/tankmonitoring",
        "url": "http://localhost:4001/tankmonitoring",
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

