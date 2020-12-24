
            var fields = [["aa","bb","cc","dd","aa","bb","cc","dd"],
            ["aa","bb","cc","dd","aa","bb","cc","dd"],
            ["aa","bb","cc","dd","aa","bb","cc","dd"],
            ["aa","bb","cc","dd","aa","bb","cc","dd"]
    

];
$(document).ready(function() {
    $('#manage-device').DataTable( {
        data: fields,
        columns: [
            { title: "Device Id" },
            { title: "Device Model" },
            { title: "Version" },
            { title: "Channel" },
            { title: "Status" },
            { title: "Last Reported Time" },
            { title: "Created Time" },
            { title: "Action" },
            
        ]
    } );
} );