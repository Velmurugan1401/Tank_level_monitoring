var charttwo = echarts.init(document.getElementById("main"));
option = {
 xAxis: {
   type: 'category',
   data: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JULY']
 },
 yAxis: {
   type: 'value'
 },
 series: [{
   data: [820, 932, 901, 934, 1290, 1330, 1320],
   type: 'line',
   smooth: true
 }]
};

charttwo.setOption(option);
var chart = echarts.init(document.getElementById("local"));

chart.setOption(option);