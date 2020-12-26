

//  var fields = [
//         {
//             mData: 'tankname',
//             Title: 'Tank Name',
//             sWidth: '20%',
//             orderable: false,
//             mRender: function (data, type, row) {
//                 return dww;
//             }
//         },
//         // {
//         //     mData: 'location',
//         //     Title: 'Location',
//         //     sWidth: '20%',
//         //     orderable: false,
//         //     mRender: function (data, type, row) {
//         //         return data;
//         //     }
//         // },

//         {
//             mData: 'tanktype',
//             sWidth: '20%',
//             Title: 'Tank Type',
//             orderable: false,
//             mRender: function (data, type, row) {
//                 return large;
//             }
//         },
//         {
//             mData: 'capacity',
//             sWidth: '20%',
//             Title: 'Capacity',
//             orderable: false,
//             mRender: function (data, type, row) {
//                 return 1112;
//             }
//         },
//         {
//             mData: 'linked_devices',
//             Title: 'Linked Devices',
//             "className": 'sortingtable',
//             orderable: false,
//             mRender: function (data, type, row) {
//                 return fff;
//             }
//         },
//         {
//             mData: 'created_ts',
//             Title: 'Created Time',
//             "className": 'sortingtable',
//             mRender: function (data, type, row) {
//                 return moment(data).format(DATE_TIME_FORMAT);
//             }
//         },
//         {
//             mData: 'updated_ts',
//             Title: 'Updated Time',
//             "className": 'sortingtable',
//             mRender: function (data, type, row) {
//                 return moment(data).format(DATE_TIME_FORMAT);
//             }
//         },
//         {
//             Title: 'Actions',
//             orderable: false,
//             mRender: function (data, type, row) {
//                 var actionsHtml = '<button class="btn btn-default" onclick="deleteStudent(\'' + row._id + '\')"><i class="fa fa-trash"></i></button> <button class="btn btn-default" onclick="editStudent(\'' + row._id + '\')"><i class="fa fa-pencil" aria-hidden="true"></i></button>';
//                 return actionsHtml;
                
//             }
//         }
    
//     ];
var fileds=[
    [ "DWF", "large", "12220", "ggg", "2011/04/25", "2020/09/08","delete" ],
    [ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750","kkk" ],
    [ "Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000","sss" ],
    [ "DWF", "large", "12220", "ggg", "2011/04/25", "2020/09/08","delete" ],
    [ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750","kkk" ],
    [ "Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000","sss" ],

    
];

    $(document).ready(function() {
        $('#example').DataTable( {
            data: fileds,
            columns: [
                { title: "Tank Name" },
                { title: "Tank Type" },
                { title: "Capacity" },
                { title: "Linked Devices" },
                { title: "Created Time" },
                { title: "Updated Time" },
                { title: "Action" }
            ]
        } );
    } );
