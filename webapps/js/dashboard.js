var resultData;



$(() => {
    $.ajax({
        "dataType": 'json',
        "contentType": 'application/json',
        "type": "POST",
        url: BASE_PATH + '/user/list',
        success: function (data) {
            var resultData = data.result.data;
            $("#totaluser").html(data.result.total)






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
$(() => {
    var stertdate=moment().valueOf(new Date())
    var start30date=moment().subtract(30, 'days').valueOf(new Date())
    var yesterday=moment().subtract(1, 'days').valueOf(new Date())
    var last7days=moment().subtract(7, 'days').valueOf(new Date())

    var queryParams={
    
        "sort" : [
            { "deviceid" : {"order" : "asc"}}],    
            aggs : {
            "last30days" : {
                    "range" : {
                        "field" : "receivedstamp",
                        "ranges" : [
                            { "from" : start30date, "to" : stertdate }
                        ]
                    },
                    "aggs" : {
                        "result" : { "terms" : { "field" : "deviceid" },
                             "aggs": {
               "avg_scoring":{
                 "avg": {"field":"tank_level"}
               }
             }
                        }
                    
                        
                    }
                },
                    "last7days" : {
                    "range" : {
                        "field" : "receivedstamp",
                        "ranges" : [
                            { "from" : last7days, 
                            "to" : stertdate }
                        ]
                    },
                    "aggs" : {
                        "result" : { "terms" : { "field" : "deviceid" },
                             "aggs": {
               "avg_scoring":{
                 "avg": {"field":"tank_level"}
               }
             }
                        }
                    
                        
                    }
                },
                 "yesterday" : {
                    "range" : {
                        "field" : "receivedstamp",
                        "ranges" : [
                            { "from" : yesterday, 
                            "to" : stertdate }
                        ]
                    },
                    "aggs" : {
                        "result" : { "terms" : { "field" : "deviceid" },
                             "aggs": {
               "avg_scoring":{
                 "avg": {"field":"tank_level"}
               }
             }
                        }
                    
                        
                    }
                }
                
            }       
        
    }
   

    $.ajax({
        "dataType": 'json',
                "contentType": 'application/json',
                "type": "POST",
                "url": BASE_PATH+'/tankhistory/list',
                "data":JSON.stringify({"query":queryParams}),
        url: BASE_PATH + '/tankhistory/list',

        success: function (data) {

            var sevendays = data.result.aggregations.last7days.buckets[0]
            var fulldata=sevendays.result.buckets
            var onemonth= data.result.aggregations.last30days.buckets[0]
            var lastonemonth=onemonth.result.buckets
            var yes=data.result.aggregations.yesterday.buckets[0]
            var yesterday=yes.result.buckets
            var myChart = echarts.init(document.getElementById('graph'));
            var value=[{
                product: 'Avadi',
                'Yesterday':0,
                'Last 7 Days': fulldata[0].avg_scoring.value,
                'Last 30 days': lastonemonth[3].avg_scoring.value
            },
            {
                product: 'Porur',
                'Yesterday':0,
                'Last 7 Days': fulldata[1].avg_scoring.value,
                'Last 30 days': lastonemonth[4].avg_scoring.value
            },
            {
                product: 'Egmore',
                'Yesterday':0,
                'Last 7 Days': fulldata[2].avg_scoring.value,
                'Last 30 days': lastonemonth[5].avg_scoring.value
            },
            {
                product: 'Puzhal',
                'Yesterday':0,
                'Last 7 Days': fulldata[3].avg_scoring.value,
                'Last 30 days': lastonemonth[0].avg_scoring.value
            },
            {
                product: 'Manali',
                'Yesterday':0,
                'Last 7 Days': fulldata[4].avg_scoring.value,
                'Last 30 days': lastonemonth[1].avg_scoring.value
            },
            {
                product: 'T.nagar',
                'Yesterday':0,
                'Last 7 Days': fulldata[5].avg_scoring.value,
                'Last 30 days': lastonemonth[2].avg_scoring.value
            },
            {
                product: 'Otteri',
                'Yesterday':0,
                'Last 7 Days': fulldata[6].avg_scoring.value,
                'Last 30 days': lastonemonth[6].avg_scoring.value
            }
        ]
option = {
    legend: {},
    tooltip: {},
    dataset: {
        dimensions: ['product', 'Yesterday', 'Last 7 Days', 'Last 30 days'],
        source: value
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [{
            type: 'bar'
        },
        {
            type: 'bar'
        },
        {
            type: 'bar'
        }

    ]
};
myChart.setOption(option);


           

        }
    })
})
// PIE CHART--------------------------------------------
$(() => {
    var event;
   
    var queryParams={
        
            aggs: {
              "lowalert": {
                "filter": { "term": { "tank_level": "LOW" } }
               
              },
               "highalert": {
                "filter": { "term": { "tank_level": "HIGH" } }
               
              }
            }
          

    }
    $.ajax({
        "dataType": 'json',
                "contentType": 'application/json',
                "type": "POST",
                "url": BASE_PATH+'/eventtrigger/list',
                "data":JSON.stringify({"query":queryParams}),
      
        success: function (data) {
            var totalalert=data.result.total
            var highalert=data.result.aggregations.highalert.doc_count
            var lowalert=data.result.aggregations.lowalert.doc_count
            var chart = echarts.init(document.getElementById("local"));
          var  pie=[{
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
var myChart = echarts.init(document.getElementById('main'));
var data=[200,500,700]
option = {
    color: ['#3398DB'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
        
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        data: ['Avadi', 'Porur', 'Egmore', 'Puzhal', 'Manali', 'T.nagar', 'Otteri'],
        axisTick: {
            alignWithLabel: true
        }
    }],
    yAxis: [{
        type: 'value'
    }],
    series: [{
        name: 'Consumption Level',
        type: 'bar',
        barWidth: '60%',

        data: data
    }]
};
myChart.setOption(option);


