
            // var fields = [
            //     {
            //         mData: 'sname',
            //         sTitle: 'Device Id',
            //         sWidth: '20%',
            //         orderable: false,
            //         mRender: function (data, type, row) {
            //             return data;
            //         }
            //     },
            //     {
            //         mData: 'sname',
            //         sTitle: 'Device Model',
            //         sWidth: '20%',
            //         orderable: false,
            //         mRender: function (data, type, row) {
            //             return data;
            //         }
            //     },
            //     {
            //         mData: 'sname',
            //         sTitle: 'Version',
            //         sWidth: '20%',
            //         orderable: false,
            //         mRender: function (data, type, row) {
            //             return data;
            //         }
            //     },
            //     {
            //         mData: 'location',
            //         sTitle: 'Channel',
            //         sWidth: '20%',
            //         orderable: false,
            //         mRender: function (data, type, row) {
            //             return data;
            //         }
            //     },
        
            //     {
            //         mData: 'department',
            //         sWidth: '20%',
            //         sTitle: 'Status',
            //         orderable: false,
            //         mRender: function (data, type, row) {
            //             return data;
            //         }
            //     },
            //     {
            //         mData: 'created_ts',
            //         sTitle: 'Last Reported Time',
            //         "className": 'sortingtable',
            //         mRender: function (data, type, row) {
            //             return moment(data).format(DATE_TIME_FORMAT);
            //         }
            //     },
            //     {
            //         mData: 'created_ts',
            //         sTitle: 'Created Time',
            //         "className": 'sortingtable',
            //         mRender: function (data, type, row) {
            //             return moment(data).format(DATE_TIME_FORMAT);
            //         }
            //     },
            //     {
            //         sTitle: 'Action',
            //         orderable: false,
            //         mRender: function (data, type, row) {
            //             var actionsHtml = '<button class="btn btn-default" onclick="deleteStudent(\'' + row._id + '\')"><i class="fa fa-trash"></i></button> <button class="btn btn-default" onclick="editStudent(\'' + row._id + '\')"><i class="fa fa-pencil" aria-hidden="true"></i></button>';
            //             return actionsHtml;
                        
            //         }
            //     }
// ];
            var fields = [
                ["aa","bb","cc","dd","aa","bb","cc","dd"],
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
            
        ],
        dom:'1<"toolbar">frtip',
        initComplete : function(){
            $("div.toolbar").html('<button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-plus-square" style="color: black;"aria-hidden="true"></i>Add Devices</button><button type="button" class="btn btn-secondary" data-toggle="modal"><i class="fa fa-refresh" style="color: black;" aria-hidden="true"></i></button>');
        }
    } );
} );



