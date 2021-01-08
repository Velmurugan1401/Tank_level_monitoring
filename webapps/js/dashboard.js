// const { DayInstance } = require("twilio/lib/rest/bulkexports/v1/export/day");

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
    var queryParams={
        
            "query": {
                "bool": {
                    "must": [{
                        "match": {
                            "domainKey": "CDZMKBHJUM"
                        }
                    }]
                }
            },
            "from": 0,
            "size": 10
        
    }
    $.ajax({
        "dataType": 'json',
                "contentType": 'application/json',
                "type": "POST",
                url: BASE_PATH + '/devicedetail/listdev',  
                "data":JSON.stringify({"data":queryParams}),
        
        success: function (data) {
            var resultData = data.result.data;
            $("#totaldevice").html(data.result.total)
            
        }
    })
})
var tanklistfull;
$(() => {
    $.ajax({
        "dataType": 'json',
        "contentType": 'application/json',
        "type": "POST",
        url: BASE_PATH + '/tank/list',
        success: function (data) {
            var resultData = data.result.data;
            tanklistfull=resultData;
            console.log("tank list",tanklistfull)
            $("#totaltank").html(data.result.total)

        }
    })
})
// BAR CHART--------------------------------------------
$(() => {
    var ones = moment().startOf('day').subtract(2,"day").valueOf();        
    var onee=moment().endOf('day').subtract(2,"day").valueOf()
    var twos = moment().startOf('day').subtract(2,"day").valueOf();        
    var twoe=moment().endOf('day').subtract(2,"day").valueOf()
    var threes = moment().startOf('day').subtract(3,"day").valueOf();        
    var three=moment().endOf('day').subtract(3,"day").valueOf()
    var foures = moment().startOf('day').subtract(13,"day").valueOf();        
    var fouree=moment().endOf('day').subtract(13,"day").valueOf()
    var fives = moment().startOf('day').subtract(11,"day").valueOf();        
    var fivee=moment().endOf('day').subtract(11,"day").valueOf()
    var sixs = moment().startOf('day').subtract(12,"day").valueOf();        
    var sixe=moment().endOf('day').subtract(12,"day").valueOf()
    var sevens = moment().startOf('day').subtract(10,"day").valueOf();        
    var sevense=moment().endOf('day').subtract(10,"day").valueOf()
    var queryParams={
        
            "aggs" : {
            "one" : {
                    "range" : {
                        "field" : "receivedstamp",
                        "ranges" : [
                            { "from" : ones, "to" : onee }
                        ]
                    },
                    "aggs" : {
                        "result" : { "terms" : { "field" : "deviceid" }
              
                        },
                        "avg_scoring":{
                 "sum": {"field":"tank_level"}
               }
                    
                        
                    }
                },
                 "two" : {
                    "range" : {
                        "field" : "receivedstamp",
                        "ranges" : [
                            { "from" : twos, "to" : twoe }
                        ]
                    },
                    "aggs" : {
                        "result" : { "terms" : { "field" : "deviceid" }
              
                        },
                        "avg_scoring":{
                 "sum": {"field":"tank_level"}
               }
                    
                        
                    }
                },
                 "three" : {
                    "range" : {
                        "field" : "receivedstamp",
                        "ranges" : [
                            { "from" : threes, "to" :three }
                        ]
                    },
                    "aggs" : {
                        "result" : { "terms" : { "field" : "deviceid" }
              
                        },
                        "avg_scoring":{
                 "sum": {"field":"tank_level"}
               }
                    
                        
                    }
                },
                 "foure" : {
                    "range" : {
                        "field" : "receivedstamp",
                        "ranges" : [
                            { "from" : foures, "to" : fouree }
                        ]
                    },
                    "aggs" : {
                        "result" : { "terms" : { "field" : "deviceid" }
              
                        },
                        "avg_scoring":{
                 "sum": {"field":"tank_level"}
               }
                    
                        
                    }
                },
                 "five" : {
                    "range" : {
                        "field" : "receivedstamp",
                        "ranges" : [
                            { "from" : fives, "to" : fivee }
                        ]
                    },
                    "aggs" : {
                        "result" : { "terms" : { "field" : "deviceid" }
              
                        },
                        "avg_scoring":{
                 "sum": {"field":"tank_level"}
               }
                    
                        
                    }
                },
                 "six" : {
                    "range" : {
                        "field" : "receivedstamp",
                        "ranges" : [
                            { "from" : sixs, "to" : sixe }
                        ]
                    },
                    "aggs" : {
                        "result" : { "terms" : { "field" : "deviceid" }
              
                        },
                        "avg_scoring":{
                 "sum": {"field":"tank_level"}
               }
                    
                        
                    }
                },
                 "seven" : {
                    "range" : {
                        "field" : "receivedstamp",
                        "ranges" : [
                            { "from" : sevens, "to" : sevense}
                        ]
                    },
                    "aggs" : {
                        "result" : { "terms" : { "field" : "deviceid" }
              
                        },
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
            var one=data.result.aggregations.one.buckets[0].avg_scoring.value;
            var two=data.result.aggregations.two.buckets[0].avg_scoring.value;
            var three=data.result.aggregations.three.buckets[0].avg_scoring.value;
            var foure=data.result.aggregations.foure.buckets[0].avg_scoring.value;
           
            var five=data.result.aggregations.five.buckets[0].avg_scoring.value;
            var six=data.result.aggregations.six.buckets[0].avg_scoring.value;
            var seven=data.result.aggregations.seven.buckets[0].avg_scoring.value;

         var dayvise=[one,two,three,foure,five,six,seven]
           

            var myChart = echarts.init(document.getElementById('bar1'));
            option = {
                color: ['#8EC9EB'],
                legend: {
                    data:['Last 7 Days Consumption Level']
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: "Consumption : Liters"
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                yAxis: {
                    type: 'category',
                    axisLine: {onZero: false},
                    axisLabel: {
                        formatter: '{value}'
                    },
                    boundaryGap: true,
                    data: ['day 1', 'day 2', 'day 3', 'day 4', 'day 5', 'day 5', 'day 6', 'day 7']
                },
                graphic: [
                    {
                        type: 'image',
                        id: 'logo',
                        right: 20,
                        top: 20,
                        z: -10,
                        bounding: 'raw',
                        origin: [75, 75],
                        style: {
                            image: 'http://echarts.baidu.com/images/favicon.png',
                            width: 150,
                            height: 150,
                            opacity: 0.5
                        }
                    },
                    {
                        type: 'group',
                        rotation: Math.PI / 4,
                        bounding: 'raw',
                        right: 110,
                        bottom: 110,
                        z: 100,
                        children: [
                            // {
                            //     type: 'rect',
                            //     left: 'center',
                            //     top: 'center',
                            //     z: 100,
                            //     shape: {
                            //         width: 400,
                            //         height: 50
                            //     },
                            //     style: {
                            //         fill: 'rgba(0,0,0,0.3)'
                            //     }
                            // },
                            // {
                            //     type: 'text',
                            //     left: 'center',
                            //     top: 'center',
                            //     z: 100,
                            //     style: {
                            //         fill: '#fff',
                            //         text: 'ECHARTS BAR CHART',
                            //         font: 'bold 26px Microsoft YaHei'
                            //     }
                            // }
                        ]
                    },
                    {
                        type: 'group',
                        left: '10%',
                        top: 'center',
                       
                          
                        
                    }
                ],
                series: [
                    {
                        name: '高度(km)与气温(°C)变化关系',
                        type: 'bar',
                        smooth: true,
                        barCategoryGap: 25,
                        lineStyle: {
                            width: 3,
                            shadowColor: 'rgba(0,0,0,0.4)',
                            shadowBlur: 10,
                            shadowOffsetY: 10
                        },
                        data:dayvise
                    }
                ]
            };
            
            // var rotation = 0;
            // setInterval(function () {
            //     myChart.setOption({
            //         graphic: {
            //             id: 'logo',
            //             rotation: (rotation += Math.PI / 360) % (Math.PI * 2)
            //         }
            //     });
            // }, 30);
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
            var pie = [
                {
                    value: highalert,
                    name: 'High Alert'+" "+highalert
                },
                {
                    value: lowalert,
                    name: 'Low Alert'+" "+lowalert
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
                   
                    data: [ 'High Level', 'Low Level']
                },
                series: [{
                    name: 'Alert Counts',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    label: {
                        position: 'inner'
                    },
                    labelLine: {
                        show: false
                    },
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



$(()=>{




})
  $(function() {
    var dateof= $("#reportrange").val()
     console.log(dateof)
   var start = moment().subtract(29, 'days');
   var end = moment();
   
   function cb(start, end) {
       $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    var startof=Date.parse(start)
    var endof=Date.parse(end)
    queryParams={
        "sort" : [
            { "deviceid" : {"order" : "desc"}}],
        aggs: {
            "last30days": {
                "range": {
                    "field": "receivedstamp",
                    "ranges": [{
                        "from": startof,
                        "to": endof
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
        //  console.log(onemonth)
        
        // console.log("moment chech",datete,start)
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
   var Today;
   $('#reportrange').daterangepicker({
       startDate: start,
       endDate: end,
       ranges: {
          'Today': [moment(), moment()],
          'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'Last 7 Days': [moment().subtract(6, 'days'), moment()],
          'Last 30 Days': [moment().subtract(29, 'days'), moment()],
         
          
       }
       
   }, cb);
   cb(start, end);
   console.log("startDate",end)
   
   
   });
