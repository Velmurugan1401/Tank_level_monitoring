var resultData;
// event trigger
$(() => {
    $.ajax({
        "dataType": 'json',
        "contentType": 'application/json',
        "type": "POST",
        url: BASE_PATH + '/eventtrigger/list',
        success: function (data) {
            var resultData = data.result.data;
            console.log(resultData)
            $("#totalevent").html(data.result.total)


        }
    })
})
// user list

$(() => {
    $.ajax({
        "dataType": 'json',
        "contentType": 'application/json',
        "type": "POST",
        url: BASE_PATH + '/user/list',
        success: function (data) {
            $("#totaluser").html(data.result.total)
            var resultData = data.result.data;
         
        }
    })
})
$(() => {
    $.ajax({
        "dataType": 'json',
        "contentType": 'application/json',
        "type": "get",
        url: BASE_PATH + '/device/list',
        success: function (data) {
            var resultData = data.result.data;
            $("#totaldevice").html(data.result.total)
            
        }
    })
})
$(() => {
    $.ajax({
        "dataType": 'json',
        "contentType": 'application/json',
        "type": "POST",
        url: BASE_PATH + '/tank/list',
        success: function (data) {
            var resultData = data.result.data;
            $("#totaltank").html(data.result.total)

        }
    })
})
// BAR CHART--------------------------------------------

// PIE CHART--------------------------------------------
$(() => {
    var event;

    var queryParams = {

        aggs: {
            "lowalert": {
                "filter": {
                    "term": {
                        "tank_level": "LOW"
                    }
                }

            },
            "highalert": {
                "filter": {
                    "term": {
                        "tank_level": "HIGH"
                    }
                }

            }
        }


    }
    $.ajax({
        "dataType": 'json',
        "contentType": 'application/json',
        "type": "POST",
        "url": BASE_PATH + '/eventtrigger/list',
        "data": JSON.stringify({
            "query": queryParams
        }),

        success: function (data) {
            var totalalert = data.result.total
            var highalert = data.result.aggregations.highalert.doc_count
            var lowalert = data.result.aggregations.lowalert.doc_count
            var chart = echarts.init(document.getElementById("local"));
            var pie = [{
                    value: totalalert,
                    name: 'All Level'
                },
                {
                    value: highalert,
                    name: 'High Level'
                },
                {
                    value: lowalert,
                    name: 'Low Level'
                },

            ]
            option = {
                title: {
                    // text: 'Tank Events',
                    // subtext: 'Alert Counts',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['All Level', 'High Level', 'Low Level']
                },
                series: [{
                    name: 'Alert Counts',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: pie,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            };

            chart.setOption(option);

        }
    })
})

