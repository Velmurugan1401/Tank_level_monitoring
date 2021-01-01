var myChart = echarts.init(document.getElementById('main'));
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

        data: [10, 52, 200, 334, 390, 330, 220]
    }]
};
myChart.setOption(option);
var chart = echarts.init(document.getElementById("local"));
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
        data: [{
                value: 88,
                name: 'All Level'
            },
            {
                value: 150,
                name: 'High Level'
            },
            {
                value: 22,
                name: 'Low Level'
            },

        ],
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

var myChart = echarts.init(document.getElementById('graph'));
option = {
    legend: {},
    tooltip: {},
    dataset: {
        dimensions: ['product', 'Yesterday', 'Last 7 Days', 'Last 30 days'],
        source: [{
                product: 'Avadi',
                'Yesterday': 43.3,
                'Last 7 Days': 85.8,
                'Last 30 days': 93.7
            },
            {
                product: 'Porur',
                'Yesterday': 83.1,
                'Last 7 Days': 73.4,
                'Last 30 days': 55.1
            },
            {
                product: 'Egmore',
                'Yesterday': 86.4,
                'Last 7 Days': 65.2,
                'Last 30 days': 82.5
            },
            {
                product: 'Puzhal',
                'Yesterday': 72.4,
                'Last 7 Days': 53.9,
                'Last 30 days': 39.1
            },
            {
                product: 'Manali',
                'Yesterday': 72.4,
                'Last 7 Days': 53.9,
                'Last 30 days': 39.1
            },
            {
                product: 'T.nagar',
                'Yesterday': 72.4,
                'Last 7 Days': 53.9,
                'Last 30 days': 39.1
            },
            {
                product: 'Otteri',
                'Yesterday': 72.4,
                'Last 7 Days': 53.9,
                'Last 30 days': 39.1
            }
        ]
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