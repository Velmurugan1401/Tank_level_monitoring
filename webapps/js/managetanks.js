// var StudentTable = null;
// var student_list = [];

// $(document).ready(function(){
//     loadStudentList();
// });
// function loadStudentList() {

//     if (StudentTable) {
//         StudentTable.destroy();
//         $("#example").html("");
//     }
//  var fields = [
//         {
//             mData: 'tankname',
//             sTitle: 'Tank Name',
//             sWidth: '20%',
//             orderable: false,
//             mRender: function (data, type, row) {
//                 return dww;
//             }
//         },
//         // {
//         //     mData: 'location',
//         //     sTitle: 'Location',
//         //     sWidth: '20%',
//         //     orderable: false,
//         //     mRender: function (data, type, row) {
//         //         return data;
//         //     }
//         // },

//         {
//             mData: 'tanktype',
//             sWidth: '20%',
//             sTitle: 'Tank Type',
//             orderable: false,
//             mRender: function (data, type, row) {
//                 return large;
//             }
//         },
//         {
//             mData: 'capacity',
//             sWidth: '20%',
//             sTitle: 'Capacity',
//             orderable: false,
//             mRender: function (data, type, row) {
//                 return 1112;
//             }
//         },
//         {
//             mData: 'linked_devices',
//             sTitle: 'Linked Devices',
//             "className": 'sortingtable',
//             orderable: false,
//             mRender: function (data, type, row) {
//                 return fff;
//             }
//         },
//         {
//             mData: 'created_ts',
//             sTitle: 'Created Time',
//             "className": 'sortingtable',
//             mRender: function (data, type, row) {
//                 return moment(data).format(DATE_TIME_FORMAT);
//             }
//         },
//         {
//             mData: 'updated_ts',
//             sTitle: 'Updated Time',
//             "className": 'sortingtable',
//             mRender: function (data, type, row) {
//                 return moment(data).format(DATE_TIME_FORMAT);
//             }
//         },
//         {
//             sTitle: 'Actions',
//             orderable: false,
//             mRender: function (data, type, row) {
//                 var actionsHtml = '<button class="btn btn-default" onclick="deleteStudent(\'' + row._id + '\')"><i class="fa fa-trash"></i></button> <button class="btn btn-default" onclick="editStudent(\'' + row._id + '\')"><i class="fa fa-pencil" aria-hidden="true"></i></button>';
//                 return actionsHtml;
                
//             }
//         }
    
//     ];

// var queryParams = {
//     query: {
//         "bool": {
//             "must": []
//         }
//     },
//     sort: [{ "created_ts": { "order": "asc" } }]
// };

// student_list = [];

// var tableOption = {
//     fixedHeader: false,
//     responsive: false,
//     paging: true,
//     searching: true,
//     aaSorting: [[3, 'desc']],
//     "ordering": true,
//     iDisplayLength: 10,
//     lengthMenu: [[10, 50, 100], [10, 50, 100]],
//     aoColumns: fields,
//     "bProcessing": true,
//     "language": {
//         "emptyTable": "No data found!",
//         "processing": '<i class="fa fa-spinner fa-spin" style="color:#333"></i> Processing'

//     },
//     "bServerSide": true,
//     "sAjaxSource": BASE_PATH+'/student/list',
//     "fnServerData": function (sSource, aoData, fnCallback, oSettings) {


//         queryParams.query['bool']['must'] = [];
//         queryParams.query['bool']['should'] = [];
//         delete queryParams.query['bool']["minimum_should_match"];

//         var keyName = fields[oSettings.aaSorting[0][0]]

//         var sortingJson = {};
//         sortingJson[keyName['mData']] = { "order": oSettings.aaSorting[0][1] };
//         queryParams.sort = [sortingJson];

//         queryParams['size'] = oSettings._iDisplayLength;
//         queryParams['from'] = oSettings._iDisplayStart;

//         // queryParams.query['bool']['must'].push({ "match": { "acc_id":SESSION_OBJ.orgs[0]  } });

//         var searchText = oSettings.oPreviousSearch.sSearch.trim();

//         if (searchText) {
//             queryParams.query['bool']['should'].push({ "wildcard": { "sname": "*" + searchText + "*" } });
//             queryParams.query['bool']['should'].push({ "wildcard": { "sname": "*" + searchText.toLowerCase() + "*" } });
//             queryParams.query['bool']['should'].push({ "wildcard": { "sname": "*" + searchText.toUpperCase() + "*" } });
//             queryParams.query['bool']['should'].push({ "wildcard": { "sname": "*" + capitalizeFLetter(searchText) + "*" } })
//             queryParams.query['bool']["minimum_should_match"] = 1;
//             queryParams.query['bool']['should'].push({
//                 "match_phrase": {
//                     "sname.keyword": "*" + searchText + "*"
//                 }
//             })
//             queryParams.query['bool']['should'].push({
//                 "match_phrase_prefix": {
//                     "sname.keyword": {
//                         "query": "*" + searchText + "*"
//                     }
//                 }
//             });
//         }

//         oSettings.jqXHR = $.ajax({
//             "dataType": 'json',
//             "contentType": 'application/json',
//             "type": "POST",
//             "url": sSource,
//             "data": JSON.stringify({"query":queryParams}),
//             success: function (data) {

//                 var resultData = data.result.data;

//                 student_list = resultData.data;

//                 $(".totalCount").html(data.result.total)

//                 resultData['draw'] = oSettings.iDraw;
//                 fnCallback(resultData);
//             }
//         });
//     },
//     "initComplete": function (settings, json) {
//     }
// };

// StudentTable = $("#example").DataTable(tableOption);
// }

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
        });
    
        dom:'l<"toolbar">frtip'
        initcomplete:function(){
            $("div.toolbar").html('<button type="button" class="btn button1" data-toggle="modal" data-target="#exampleModal"> Add Tanks</button>');
        }

   

