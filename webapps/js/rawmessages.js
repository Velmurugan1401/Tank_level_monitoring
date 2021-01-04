// var dataSet = [
    //     [ "SAMPLE_DEV_100", "Raw Message 1", "12/24/2020 04:21:46 pm"],
    //     [ "SAMPLE_DEV_101", "Raw Message 2", "12/24/2020 08:16:40 pm"]
    
    // ];
    
    // $(document).ready(function() {
    
    //     $('#rawMsgTable').DataTable( {
    //         data: dataSet,
    //         columns: [
    //             { title: "Device Name" },
    //             { title: "Messages" },
    //             { title: "Reported Time" }
              
    //         ]
    //     } );
    // } );
    var DeviceTable = null;
    var device_list=[];
    var device_list2;
    var list=[];
    // var startDate = moment().subtract(6, 'days').startOf('day');
    // var endDate = moment().endOf('day');
    
    $(document).ready(function(){
        loadDeviceList();
    })
    
    
    
    function loadDeviceList() {
    
        if (DeviceTable) {
            DeviceTable.destroy();
            $("#rawMsgTable").html("");
        }
    
        var fields = [
            
            {
                mData: 'tank_level',
                sTitle: 'Device Name',
                sWidth: '20%',
                orderable: false,
                mRender: function (data, type, row) {
                    return data;
                   
                }
               
            },
            {
                mData: 'deviceid',
                sTitle: 'Device Model',
                sWidth: '20%',
                orderable: false,
                mRender: function (data, type, row) {
                    return data;
                }
            },
    
            {
                mData: 'channel',
                sWidth: '20%',
                sTitle: 'Device Version',
                orderable: false,
                mRender: function (data, type, row) {
                    return data;
                }
            },
           
            {
                mData: 'receivedstamp',
                sTitle: 'Reported Time',
                "className": 'sortingtable',
                mRender: function (data, type, row) {
                    return moment(data).format(DATE_TIME_FORMAT);
                }
            },
            // {
            //     sTitle: 'Actions',
            //     orderable: false,
            //     mRender: function (data, type, row) {
            //         var actionsHtml = '<button class="btn btn-default" onclick="deleteDevice(\'' + row.id + '\')"><i class="fa fa-trash"></i></button>'+" "+'<button class="btn btn-default" onclick="editDevice(\'' + row._id + '\')"><i class="fa fa-edit"></i></button>';
            //         return actionsHtml;
            //     }
            // }
           
        ];
        
    
        var queryParams = {
           
            query: {
                "bool": {
                    "must": []
                }
            },
            sort: [{ "created_ts": { "order": "asc" } }]
            
        };
    
        device_list = [];
    
        var tableOption = {
            fixedHeader: false,
            responsive: true,
            paging: true,
            searching: true,
            aaSorting: [[3, 'desc']],
            "ordering": true,
            iDisplayLength: 10,
            lengthMenu: [[10, 50, 100], [10, 50, 100]],
            aoColumns: fields,
            "bProcessing": true,
            "language": {
                "emptyTable": "No data found!",
                "processing": '<i class="fa fa-spinner fa-spin" style="color:#333"></i> Processing'
    
            },
            "bServerSide": true,
            "sAjaxSource": BASE_PATH+'/tankhistory/list',
            "fnServerData": function (sSource, aoData, fnCallback, oSettings) {
             
             
    
                // queryParams.query['range'] =  {
                //     "receivedstamp": {
                        
                //       "gte": 1609141209325,
                //       "lte": 1608826599604
                     
                //     }
                //   };
    
                var startTime = moment().valueOf();
                var last30Days =  moment().subtract(30,'d').valueOf();
                queryParams.query['bool']['must'] =  {
                    range:{
                        "receivedstamp": {
                            "from": last30Days,
                            "to": startTime
                           
                          }
                    }
                   
                  };
                queryParams.query['bool']['should'] = [];
                delete queryParams.query['bool']["minimum_should_match"];
    
                var keyName = fields[oSettings.aaSorting[0][0]]
    
                var sortingJson = {};
                sortingJson[keyName['mData']] = { "order": oSettings.aaSorting[0][1] };
                queryParams.sort = [sortingJson];
    
                queryParams['size'] = oSettings._iDisplayLength;
                queryParams['from'] = oSettings._iDisplayStart;
    
                // queryParams.query['bool']['must'].push({ "match": { "acc_id":SESSION_OBJ.orgs[0]  } });
    
                var searchText = oSettings.oPreviousSearch.sSearch.trim();
    
                if (searchText) {
                    queryParams.query['bool']['should'].push({ "wildcard": { "deviceid": "*" + searchText + "*" } });
                    queryParams.query['bool']['should'].push({ "wildcard": { "deviceid": "*" + searchText.toLowerCase() + "*" } });
                    queryParams.query['bool']['should'].push({ "wildcard": { "deviceid": "*" + searchText.toUpperCase() + "*" } });
                    queryParams.query['bool']['should'].push({ "wildcard": { "deviceid": "*" + capitalizeFLetter(searchText) + "*" } })
                    queryParams.query['bool']["minimum_should_match"] = 1;
                    queryParams.query['bool']['should'].push({
                        "match_phrase": {
                            "deviceid.keyword": "*" + searchText + "*"
                        }
                    })
                    queryParams.query['bool']['should'].push({
                        "match_phrase_prefix": {
                            "deviceid.keyword": {
                                "query": "*" + searchText + "*"
                            }
                        }
                    });
                }
    
                oSettings.jqXHR = $.ajax({
                    "dataType": 'json',
                    "contentType": 'application/json',
                    "type": "post",
                    "url": sSource,
                    "data":JSON.stringify({"query":queryParams}),
                    success: function (data) {
    
                         
                        console.log(data)
                       
                        var resultData = data.result.data;
                        var vel=data.result.data.data
                        console.log("size",vel.length);
                           
                           
                            
                          
                    $(".totalCount").html(data.result.data.total)
    
                        resultData['draw'] = oSettings.iDraw;
                        fnCallback(resultData);
                    }
                });
            },
          
        };
    
        DeviceTable = $("#rawMsgTable").DataTable(tableOption);
      
    };

    // DeviceTable = $("#rawMsgTable").DataTable(tableOption);
  


function rawMsgRef(){
    loadDeviceList();
}

// for(i=0;i<=device_list2.length;i++){
//     console.log("res",device_list2[i].id)
   
//     $('#listdevice').append('<option>'+device_list2[i].id+`</option>`)

// }
 




