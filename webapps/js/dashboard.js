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

$(()=>{
    $(function() {

        var start = moment().subtract(29, 'days');
        var end = moment();
        
        function cb(start, end) {
            $('#reportrang span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        }
        
        $('#reportrang').daterangepicker({
            startDate: start,
            endDate: end,
            ranges: {
              //  'Today': [moment(), moment()],
               'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
               'Last 7 Days': [moment().subtract(6, 'days'), moment()],
               'Last 30 Days': [moment().subtract(29, 'days'), moment()]
               
            }
        }, cb);
        
        cb(start, end);
        
        });

    var query={
        
            "aggs" : {
            "last30days" : {
                    "range" : {
                        "field" : "receivedstamp",
                        "ranges" : [
                            { "from" : "1608826599604", "to" : "1609660800000" }
                        ]
                    },
                    "aggs" : {
                        "result" : { "terms" : { "field" : "deviceid" },
                             "aggs": {
               "avg_scoring":{
                 "sum": {"field":"tank_level"}
               }
             }
                        },
                         "result2" : { "terms" : { "field" : "device_id" },
                             "aggs": {
               "avg_":{
                 "sum": {"field":"tank_level"}
               }
             }
                        }
                        
                        
                    }
                    
                        
               
            },
                    "last7days" : {
                    "range" : {
                        "field" : "receivedstamp",
                        "ranges" : [
                            { "from" : "1609142400000", "to" : "1609660800000" }
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
                 "lastonedays" : {
                    "range" : {
                        "field" : "receivedstamp",
                        "ranges" : [
                            { "from" : "1609142400000", "to" : "1609660800000" }
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
                
            },
            "sort":[{"deviceid":{"order" : "asc"}}]
            
            
        
    }
    $.ajax({
        "dataType": 'json',
        "contentType": 'application/json',
        "type": "POST",
        "url": BASE_PATH + '/msg/list',
        "data": JSON.stringify({
            "query": queryParams
            
        }),

        success: function (data) {
            var resultData = data.result.data;


        }
    });
    var myCharts = echarts.init(document.getElementById('bar2'));
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
            data: ['POONDI', 'CHOLAVARAM', 'REDHILLS', 'CHEMBARAMBAKKAM', 'MYLAPORE', 'VEERANAM', 'NESAPAKKAM','KODAMBAKKAM A','KODAMBAKKAM B','KOYAMBEDU','AVADI','PORUR','VELACHERY','EGMORE','GUINDY','LITTLE MOUNT','KILPAUK','SAIDAPET','VADAPALANI','THIRUMANGALAM'],
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
            name: 'Consumption Level',
            type: 'bar',
            barWidth: '60%',
            data: backend
        }
    ]
};
myCharts.setOption(option);





})
// $(document).ready(function(){
//     $('#reportrang').daterangepicker({ onSelect: function(dateText, inst) { alert("Working"); } });
// });


    
$(document).ready(function(){
    $("#reportrang").trigger('click'); 
});
  

  var ms;
  var ms2;
    
    $( function() { 
    
      
    
    var start = moment().subtract(29, 'days');
    var end = moment();
    
    function cb(start, end) {
        ms = Date.parse(start);
        ms2 = Date.parse(end);
       
    }
    
    $('#reportrang').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
          //  'Today': [moment(), moment()],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()]
           
        }
    }, cb);
    
    cb(start, end);
    
    
    console.log(ms)
    console.log(ms2)
    
    
    
    });
