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
$(() => {
    var queryParams={
        
        
        aggs: {
 
            "sports":{
              "terms" : { "field" : "deviceid" },
              "aggs": {
                "avg_scoring":{
                  "sum": {"field":"tank_level"}
                }
              }
            },
            "tanks":{
                 "terms" : { "field" : "device_id" },
                 "aggs": {
                "avg_scoring":{
                  "sum": {"field":"tank_level"}
                }
              }
            }
          }
         }
         
    $.ajax({
        "dataType": 'json',
        "contentType": 'application/json',
        "type": "POST",
        "url": BASE_PATH + '/tankhistory/list',
        "data": JSON.stringify({
            "query": queryParams
        }),
        success: function (data) {
            var resultData = data.result.data;
            var location=data.result.aggregations.sports.buckets;
            console.log("me",data.result.aggregations.sports.buckets[0].avg_scoring.value)
            var sevendays = data.result.aggregations.sports.buckets
           
console.log(sevendays)
            var myChart = echarts.init(document.getElementById('bar1'));
var data = [location[0].avg_scoring.value, location[1].avg_scoring.value, location[2].avg_scoring.value,location[3].avg_scoring.value,location[4].avg_scoring.value,location[6].avg_scoring.value,location[7].avg_scoring.value,location[8].avg_scoring.value,location[9].avg_scoring.value],
 nameareas=['POONDI', 'CHOLAVARAM', 'REDHILLS', 'CHEMBARAMBAKKAM', 'MYLAPORE', 'VEERANAM', 'NESAPAKKAM','KODAMBAKKAM A',]
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
        axisLabel: {
                        interval: 0,
                        rotate:30
                   },
            data: nameareas,

        axisTick: {
            alignWithLabel: true
        }
    }],
    yAxis: [{
        type: 'value'
    }],
    series: [{
        name: "liters",
        type: 'bar',
        barWidth: '60%',

        data: data
    }]
};
myChart.setOption(option);

          

        }
    })
})



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


$( "#sel" ).click(function() {


    
    var query;
    if($("#sel").val()=="Last30days")
    { 
        var stertdate = moment().valueOf(new Date())
        var start30date = moment().subtract(30, 'days').valueOf(new Date())
        queryParams={
            "sort" : [
                { "deviceid" : {"order" : "desc"}}],
            aggs: {
                "last30days": {
                    "range": {
                        "field": "receivedstamp",
                        "ranges": [{
                            "from": start30date,
                            "to": stertdate
                        }]
                    },
                    "aggs": {
                        "result": {
                            "terms": {
                                "field": "deviceid"
                            },
                            "aggs": {
                                "avg_scoring": {
                                    "sum": {
                                        "field": "tank_level"
                                    }
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
        "url": BASE_PATH + '/tankhistory/list',
        "data": JSON.stringify({
            "query": queryParams
        }),
        // url: BASE_PATH + '/tankhistory/list',

        success: function (data) {
            console.log(data)
             var onemonth=data.result.aggregations.last30days.buckets[0].result.buckets
            var myCharts = echarts.init(document.getElementById('bar2'));
            var lastonemonth=[onemonth[0].avg_scoring.value,onemonth[1].avg_scoring.value,onemonth[2].avg_scoring.value,onemonth[3].avg_scoring.value,onemonth[4].avg_scoring.value,onemonth[6].avg_scoring.value,onemonth[7].avg_scoring.value,onemonth[8].avg_scoring.value,onemonth[9].avg_scoring.value]
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
                xAxis: [
                    {
                        type: 'category',
                         axisLabel: {
                        interval: 0,
                        rotate:30
                    },
                        // data: ['POONDI', 'CHOLAVARAM', 'REDHILLS', 'CHEMBARAMBAKKAM', 'MYLAPORE', 'VEERANAM', 'NESAPAKKAM','KODAMBAKKAM A','KODAMBAKKAM B','KOYAMBEDU','AVADI','PORUR','VELACHERY','EGMORE','GUINDY','LITTLE MOUNT','KILPAUK','SAIDAPET','VADAPALANI','THIRUMANGALAM'],
                        data: ['POONDI', 'CHOLAVARAM', 'REDHILLS', 'CHEMBARAMBAKKAM', 'MYLAPORE', 'VEERANAM', 'NESAPAKKAM','KODAMBAKKAM A'],             

                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'Liter',
                        type: 'bar',
                        barWidth: '60%',
                        data:lastonemonth
                    }
                ]
            };
            myCharts.setOption(option);
            
            console.log(data)
        }
      });
    }else if($("#sel").val()=="Last7days"){
 
        var stertdate = moment().valueOf(new Date())
        var start30date = moment().subtract(7, 'days').valueOf(new Date())
        queryParams={
            "sort" : [
                { "deviceid" : {"order" : "desc"}}],
            aggs: {
                "last30days": {
                    "range": {
                        "field": "receivedstamp",
                        "ranges": [{
                            "from": start30date,
                            "to": stertdate
                        }]
                    },
                    "aggs": {
                        "result": {
                            "terms": {
                                "field": "deviceid"
                            },
                            "aggs": {
                                "avg_scoring": {
                                    "sum": {
                                        "field": "tank_level"
                                    }
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
        "url": BASE_PATH + '/tankhistory/list',
        "data": JSON.stringify({
            "query": queryParams
        }),
        // url: BASE_PATH + '/tankhistory/list',

        success: function (data) {
            console.log(data)
             var onemonth=data.result.aggregations.last30days.buckets[0].result.buckets
            var myCharts = echarts.init(document.getElementById('bar2'));
            var lastonemonth=[onemonth[0].avg_scoring.value,onemonth[1].avg_scoring.value,onemonth[2].avg_scoring.value,onemonth[3].avg_scoring.value,onemonth[4].avg_scoring.value,onemonth[6].avg_scoring.value,onemonth[7].avg_scoring.value,onemonth[8].avg_scoring.value,onemonth[9].avg_scoring.value]
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
                xAxis: [
                    {
                        type: 'category',
                         axisLabel: {
                        interval: 0,
                        rotate:30
                    },
                    data: ['POONDI', 'CHOLAVARAM', 'REDHILLS', 'CHEMBARAMBAKKAM', 'MYLAPORE', 'VEERANAM', 'NESAPAKKAM','KODAMBAKKAM A'],               
                       
                    // data: ['POONDI', 'CHOLAVARAM', 'REDHILLS', 'CHEMBARAMBAKKAM', 'MYLAPORE', 'VEERANAM', 'NESAPAKKAM','KODAMBAKKAM A','KODAMBAKKAM B','KOYAMBEDU','AVADI','PORUR','VELACHERY','EGMORE','GUINDY','LITTLE MOUNT','KILPAUK','SAIDAPET','VADAPALANI','THIRUMANGALAM'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'Liter',
                        type: 'bar',
                        barWidth: '60%',
                        data:lastonemonth
                    }
                ]
            };
            myCharts.setOption(option);
            
           
        }
      });

    }else if($("#sel").val()=="Yesterday"){
        
        var stertdate = moment().valueOf(new Date())
        var start30date = moment().subtract(1, 'days').valueOf(new Date())
        queryParams={
            "sort" : [
                { "deviceid" : {"order" : "desc"}}],
            aggs: {
                "last30days": {
                    "range": {
                        "field": "receivedstamp",
                        "ranges": [{
                            "from": start30date,
                            "to": stertdate
                        }]
                    },
                    "aggs": {
                        "result": {
                            "terms": {
                                "field": "deviceid"
                            },
                            "aggs": {
                                "avg_scoring": {
                                    "sum": {
                                        "field": "tank_level"
                                    }
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
        "url": BASE_PATH + '/tankhistory/list',
        "data": JSON.stringify({
            "query": queryParams
        }),
        // url: BASE_PATH + '/tankhistory/list',

        success: function (data) {
            console.log(data)
             var onemonth=data.result.aggregations.last30days.buckets[0].result.buckets
            var myCharts = echarts.init(document.getElementById('bar2'));
            var lastonemonth=[onemonth[0].avg_scoring.value,onemonth[1].avg_scoring.value,onemonth[2].avg_scoring.value,onemonth[3].avg_scoring.value,onemonth[4].avg_scoring.value,onemonth[6].avg_scoring.value,onemonth[7].avg_scoring.value,onemonth[8].avg_scoring.value,onemonth[9].avg_scoring.value]
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
                xAxis: [
                    {
                        type: 'category',
                         axisLabel: {
                        interval: 0,
                        rotate:30
                    },
                        data: ['POONDI', 'CHOLAVARAM', 'REDHILLS', 'CHEMBARAMBAKKAM', 'MYLAPORE', 'VEERANAM', 'NESAPAKKAM','KODAMBAKKAM A'],               axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'Liter',
                        type: 'bar',
                        barWidth: '60%',
                        data:lastonemonth
                    }
                ]
            };
            myCharts.setOption(option);
            
           
        }
      });

    }else if($("#sel").val()=="Current"){
        var stertdate = moment().valueOf(new Date())
        var start30date = moment().subtract(0, 'days').valueOf(new Date())
        queryParams={
            "sort" : [
                { "deviceid" : {"order" : "desc"}}],
            aggs: {
                "last30days": {
                    "range": {
                        "field": "receivedstamp",
                        "ranges": [{
                            "from": start30date,
                            "to": stertdate
                        }]
                    },
                    "aggs": {
                        "result": {
                            "terms": {
                                "field": "deviceid"
                            },
                            "aggs": {
                                "avg_scoring": {
                                    "sum": {
                                        "field": "tank_level"
                                    }
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
        "url": BASE_PATH + '/tankhistory/list',
        "data": JSON.stringify({
            "query": queryParams
        }),
        // url: BASE_PATH + '/tankhistory/list',

        success: function (data) {
            console.log(data)
             var onemonth=data.result.aggregations.last30days.buckets[0].result.buckets
            var myCharts = echarts.init(document.getElementById('bar2'));
            var lastonemonth=[onemonth[0].avg_scoring.value,onemonth[1].avg_scoring.value,onemonth[2].avg_scoring.value,onemonth[3].avg_scoring.value,onemonth[4].avg_scoring.value,onemonth[6].avg_scoring.value,onemonth[7].avg_scoring.value,onemonth[8].avg_scoring.value,onemonth[9].avg_scoring.value]
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
                xAxis: [
                    {
                        type: 'category',
                         axisLabel: {
                        interval: 0,
                        rotate:30
                    },
                        data: ['POONDI', 'CHOLAVARAM', 'REDHILLS', 'CHEMBARAMBAKKAM', 'MYLAPORE', 'VEERANAM', 'NESAPAKKAM','KODAMBAKKAM A',],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'Liter',
                        type: 'bar',
                        barWidth: '60%',
                        data:lastonemonth
                    }
                ]
            };
            myCharts.setOption(option);
            
           
        }
      });


    }

  



   
  });