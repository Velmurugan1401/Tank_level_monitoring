// var EventTable=null;
// var Event_list=[];
// $(document).ready(function(){
//     loadEventList();
// });
// function loadEventList()
// {
//  if(EventTable)
//  {
//     EventTable.destroy();
//     $('#example').html("");
//  }
//  var fields=[
//     {
//         mData: '',
//         sTitle: 'Reported Time',
//         sWidth: '20%',
//         orderable: false,
//         mRender: function (data, type, row) {  
//             console.log(row);        
//              return data;
//         }
//     },
//     {
//         mData: '',
//         sTitle: 'Current level',
//         sWidth: '20%',
//         orderable: false,
//         mRender: function (data, type, row) {          
                
//             return data;
//         }
//     },
//     {
//         mData: '',
//         sTitle: 'Alerts',
//         sWidth: '20%',
//         orderable: false,
//         mRender: function (data, type, row) {         
//                 return data;
//         }
//     }]
//     var queryParams = {
//         query: {
//             "bool": {
//                 "must": []
//             }
//         },
//         sort: [{
//             "created_ts": {
//                 "order": "asc"
//             }
//         }]
//     };

//     Event_list = [];
   
//     var tableOption = {
//         fixedHeader: false,
//         responsive:true,
//         paging: true,
//         searching: true,
//         aaSorting: [
//             [0, 'desc'],
//         ],
//         "ordering": true,
//         iDisplayLength: 10,
//         lengthMenu: [
//             [10, 50, 100],
//             [10, 50, 100]
//         ],
//         aoColumns: fields,
//         "bProcessing": true,
//         "language": {
//             "emptyTable": "No data found!",
//             "processing": '<i class="fa fa-spinner fa-spin" style="color:#333"></i> Processing'

//         },
//         "bServerSide": true,
//         "sAjaxSource": BASE_PATH + '/eventtrigger/list',
//         "fnServerData": function (sSource, aoData, fnCallback, oSettings) {


//             queryParams.query['bool']['must'] = [];
//             queryParams.query['bool']['should'] = [];
//             delete queryParams.query['bool']["minimum_should_match"];

//             var keyName = fields[oSettings.aaSorting[0][0]]

//             var sortingJson = {};
//             sortingJson[keyName['mData']] = {
//                 "order": oSettings.aaSorting[0][1]
//             };
//             queryParams.sort = [sortingJson];

//             queryParams['size'] = oSettings._iDisplayLength;
//             queryParams['from'] = oSettings._iDisplayStart;

//             // queryParams.query['bool']['must'].push({ "match": { "acc_id":SESSION_OBJ.orgs[0]  } });

//             var searchText = oSettings.oPreviousSearch.sSearch.trim();

//             if (searchText) {
//                 queryParams.query['bool']['should'].push({ "wildcard": { "firstname": "*" + searchText + "*" } });
//                 queryParams.query['bool']['should'].push({ "wildcard": { "firstname": "*" + searchText.toLowerCase() + "*" } });
//                 queryParams.query['bool']['should'].push({ "wildcard": { "firstname": "*" + searchText.toUpperCase() + "*" } });
//                 queryParams.query['bool']['should'].push({ "wildcard": { "firstname": "*" + capitalizeFLetter(searchText) + "*" } })
//                 queryParams.query['bool']["minimum_should_match"] = 1;
//                 queryParams.query['bool']['should'].push({
//                     "match_phrase": {
//                         "firstname.keyword": "*" + searchText + "*"
//                     }
//                 })
//                 queryParams.query['bool']['should'].push({
//                     "match_phrase_prefix": {
//                         "firstname.keyword": {
//                             "query": "*" + searchText + "*"
//                         }
//                     }
//                 });
 
//             }
               
//             oSettings.jqXHR = $.ajax({
//                 "dataType": 'json',
//                 "contentType": 'application/json',
//                 "type": "POST",
//                 "url": sSource,

//                 "data": JSON.stringify({
//                     "query": queryParams
//                 }),
//                 success: function (data) {

//                     var resultData = data.result.data;            
//                      resultData['draw'] = oSettings.iDraw;
//                     fnCallback(resultData);
//                 }
//             });
//         },       

        
//         initComplete: function () {          
         
//         }
//     };

//     EventTable = $("#example").DataTable(tableOption);

// }



// $(document).ready(function(){
//     setInterval(level,3000);
// });
// function level()
// {
//         $.ajax({
//             "dataType": 'json',
//             "contentType": 'application/json',
//             "type": "POST",
//             url: BASE_PATH + '/tank/list',
//             success: function (data) {                
//                 var resultData = data.result.data.data;               
//                 console.log('meeee');
//                 for(i=0;i<=resultData.length;i++){
//                     if(row==resultData[i].device_id)
//                     {
//                        dank=resultData[i];                   
//                         break;
//                     }
//                 }          
    
//             }
//         })
  
//     }
