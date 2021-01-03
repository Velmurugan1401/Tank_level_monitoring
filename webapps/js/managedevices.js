var DeviceTable = null;
var device_list=[];
var device_list2;
var list=[];
// var startDate = moment().subtract(6, 'days').startOf('day');
// var endDate = moment().endOf('day');

$(document).ready(function(){
    loadDeviceList();
})
$('#ex').click(function(){
    var elem = document.documentElement;
    if($(this).hasClass('fa fa-expand')){
       
        $(this).removeClass('fa fa-expand');
        
        $(this).addClass('fa fa-compress');
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
          } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
          } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
          }
        // $('#password').attr('type','text');
          
      }else{
       
        $(this).removeClass('fa fa-compress');
        
        $(this).addClass('fa fa-expand');  
        if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
          }
        
        // $('#password').attr('type','password');
      }
});


function loadDeviceList() {

    if (DeviceTable) {
        DeviceTable.destroy();
        $("#device_details").html("");
    }

    var fields = [
        
        {
            mData: 'id',
            sTitle: 'Device Name',
            sWidth: '20%',
            orderable: false,
            mRender: function (data, type, row) {
                return data;
               
            }
           
        },
        {
            mData: 'modelId',
            sTitle: 'Device Model',
            sWidth: '20%',
            orderable: false,
            mRender: function (data, type, row) {
                return data;
            }
        },

        {
            mData: 'version',
            sWidth: '20%',
            sTitle: 'Device Version',
            orderable: false,
            mRender: function (data, type, row) {
                return data;
            }
        },
       
        {
            mData: 'registeredStamp',
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
        "sAjaxSource": BASE_PATH+'/devicedetail/listdev',
        "fnServerData": function (sSource, aoData, fnCallback, oSettings) {
         



            queryParams.query['bool']['must'] = [{
                "match": {
                    "domainKey": "CDZMKBHJUM"
                }
            }];
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
                queryParams.query['bool']['should'].push({ "wildcard": { "id": "*" + searchText + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "id": "*" + searchText.toLowerCase() + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "id": "*" + searchText.toUpperCase() + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "id": "*" + capitalizeFLetter(searchText) + "*" } })
                queryParams.query['bool']["minimum_should_match"] = 1;
                queryParams.query['bool']['should'].push({
                    "match_phrase": {
                        "id.keyword": "*" + searchText + "*"
                    }
                })
                queryParams.query['bool']['should'].push({
                    "match_phrase_prefix": {
                        "id.keyword": {
                            "query": "*" + searchText + "*"
                        }
                    }
                });
            }

            oSettings.jqXHR = $.ajax({
                "dataType": 'json',
                "contentType": 'application/json',
                "type": "POST",
                "url": sSource,
                "data":JSON.stringify({"data":queryParams}),
                success: function (data) {

                    console.log(data);
                    list=data;
                   
                    var resultData = data.result.data;
                   
                    device_list2 = resultData.data;
                    console.log("new",device_list2)
                      
                    
                   
                  

                    $(".totalCount").html(data.result.total)

                    resultData['draw'] = oSettings.iDraw;
                    fnCallback(resultData);
                }
            });
        },
      
    };

    DeviceTable = $("#device_details").DataTable(tableOption);
  
}

for(i=0;i<=device_list2.length;i++){
    console.log("res",device_list2[i].id)
   
    $('#listdevice').append('<option>'+device_list2[i].id+`</option>`)

}
 


