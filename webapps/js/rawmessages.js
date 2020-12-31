var dataSet = [
    [ "SAMPLE_DEV_100", "Raw Message 1", "12/24/2020 04:21:46 pm"],
    [ "SAMPLE_DEV_101", "Raw Message 2", "12/24/2020 08:16:40 pm"]

];

$(document).ready(function() {

    $('#rawMsgTable').DataTable( {
        data: dataSet,
        columns: [
            { title: "Device Name" },
            { title: "Messages" },
            { title: "Reported Time" }
          
        ]
    } );
} );