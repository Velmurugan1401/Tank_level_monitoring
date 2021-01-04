var TankStatusTable = null;
var TankStatus_list = [];
var deleteDeviceId=null;
// var startDate = moment().subtract(6, 'days').startOf('day');
// var endDate = moment().endOf('day');


$(document).ready(function(){
    loadTankStatusList();

   $('.dropdown-menu a').on('click', function(){    
        $('.dropdown-toggle').html($(this).html());    
    })
    
});






//Student List API
function loadTankStatusList() {

    if (TankStatusTable) {
        TankStatusTable.destroy();
        $("#StatusTable").html("");
    }

    var fields = [
        {
            mData: 'tank_name',
            sTitle: 'Tank Name',
            sWidth: '20%',
            orderable: false,
            mRender: function (data, type, row) {
                return '<div class="row">' + '<img src="/images/tank-1.png"style="height:30px;"width:30px">' + '&nbsp;' + '&nbsp;' + '<b>' + row.tank_name +'</b>' + '&nbsp;' + '&nbsp;' + '<h6>' + '&nbsp;' + '&nbsp;' + row.location + '&nbsp;' + '</h6>' + '</div>';

            }
        },
        // {
        //     mData: 'location',
        //     sTitle: 'Location',
        //     sWidth: '20%',
        //     orderable: false,
        //     mRender: function (data, type, row) {
        //         return data ? data : '-';
        //     }
        // },

        {
            mData: 'capacity',
            sWidth: '20%',
            sTitle: 'Tank Capacity',
            orderable: false,
            mRender: function (data, type, row) {
                return data ? data : '-';
            }
        },
        {
          mData: 'tank_level',
          sWidth: '20%',
          sTitle: 'Tank Level',
          orderable: false,
          mRender: function (data, type, row) {
            
              return data ? data : '-';
          }
      },
      {
        mData: 'status',
        sWidth: '20%',
        sTitle: 'Status',
        orderable: false,
        mRender: function (data, type, row) {
            return data ? data : '-';
        }
    },
      {
        mData: 'device_id',
        sWidth: '20%',
        sTitle: ' Device Id ',
        orderable: false,
        mRender: function (data, type, row) {
            return data ? data : '-';
        }
    },
        {
            mData: 'reported_ts',
            sTitle: 'Reported Time',
            "className": 'sortingtable',
            mRender: function (data, type, row) {
                return moment(data).format(DATE_TIME_FORMAT);
            }
        },
        
        {
            sTitle: 'Actions',
            orderable: false,
            mRender: function (data, type, row) {
                // console.log(row);
              var actionsHtml = '<button class="btn btn-default" data-target=""  data-toggle="modal"style="margin-right:5px;" onclick=""><i class="fa fa-link" aria-hidden="true"></i></button>'
                          +'<button class="btn btn-default"  onclick="loadMainPage(\'/snapshot\');status(\''+row.device_id+'\')" href="#/snapshot"  style="margin-right:5px;" ><i class="fa fa-eye" aria-hidden="true"></i></button>'
                          +'<button class="btn btn-default" data-target="#statusDeletemodal" data-toggle="modal" onclick="assignDeleteDeviceId(\'' + row._id + '\')"><i class="fa fa-trash icon" ></i></button>';
                          return actionsHtml;
            }
        }
    ];

    var queryParams = {
        query: {
            "bool": {
                "must": []
            }
        },
        sort: [{ "created_ts": { "order": "asc" } },{ "tank_name": { "order": "asc" } }]
    };

    TankStatus_list = [];

    var tableOption = {
        fixedHeader: false,
        responsive: false,
        paging: true,
        searching: true,
        aaSorting: [[3, 'desc'],[0,'desc']],
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
        "sAjaxSource": BASE_PATH+'/tankstatus/list',
        "fnServerData": function (sSource, aoData, fnCallback, oSettings) {


            queryParams.query['bool']['must'] = [ ];
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
                queryParams.query['bool']['should'].push({ "wildcard": { "tank_name": "*" + searchText + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "tank_name": "*" + searchText.toLowerCase() + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "tank_name": "*" + searchText.toUpperCase() + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "tank_name": "*" + capitalizeFLetter(searchText) + "*" } })
                queryParams.query['bool']["minimum_should_match"] = 1;
                queryParams.query['bool']['should'].push({
                    "match_phrase": {
                        "tank_name.keyword": "*" + searchText + "*"
                    }
                })
                queryParams.query['bool']['should'].push({
                    "match_phrase_prefix": {
                        "tank_name.keyword": {
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
                "data": JSON.stringify({"query":queryParams}),
                success: function (data) {

                    var resultData = data.result.data;

                    TankStatus_list = resultData.data;

                    $("#total").html(data.result.total)

                    resultData['draw'] = oSettings.iDraw;
                    fnCallback(resultData);
                }
            });
        },
        "initComplete": function (settings, json) {
        }
    };

    TankStatusTable = $("#StatusTable").DataTable(tableOption);
}

// delete=====


function profilelogout(event) {
      $("#profileCard").css('display','block');
      event.preventDefault();
    }

function assignDeleteDeviceId(row){
    // console.log(row);
    deleteDeviceId = row
}

    function statusDeleteTank()  {
        alert(deleteDeviceId)
        // console.log(deleteDeviceId);
        $.ajax({
    
            url: BASE_PATH + "/tankstatus/delete",
            data: JSON.stringify({ _id: deleteDeviceId }),
            contentType: "application/json",
            type: 'POST',
            success: function (result) {
                $(".modal-backdrop").remove();
    
                //Success -> Show Alert & Refresh the page
                successMsg("Tank Deleted Successfully!");
                loadTankStatusList();
            },
            error: function (e) {
                //Error -> Show Error Alert & Reset the form
                errorMsg("Tank Delete Failed!");
                window.location.reload();
            }
        });
    }
    var dank;
    var devid;
    var tankstat;
function status(row){
    devid=row
    
    $(() => {
        $.ajax({
            "dataType": 'json',
            "contentType": 'application/json',
            "type": "POST",
            url: BASE_PATH + '/tank/list',
            success: function (data) {
                var resultData = data.result.data.data;
                // console.log("its me",resultData)

                for(i=0;i<=resultData.length;i++){
                    if(row==resultData[i].device_id)
                    {
                       dank=resultData[i];
                      
                      
                       break;
                    }
                }
                $("#tankname").append("<h5>name</h5><p>"+dank.tank_name+"</p>")   
                $("#tankname").append("<h5>type</h5><p>"+dank.tank_type+"</p>")   
                $("#tankname").append("<h5>capacity</h5><p>"+dank.capacity+"</p>")  
                $("#Location").append("<h5>location</h5><p>"+dank.location+"</p>") 
                $("#Location").append("<h5>max_level</h5><p>"+dank.max_level+"</p>")  
                $("#Location").append("<h5>min_level</h5><p>"+dank.min_level+"</p>")   
                
                   
    
            }
        })
    })
     for(i=0;i<=TankStatus_list.length;i++)
                 {
                     if(row==TankStatus_list[i].device_id){
                        tankstat=TankStatus_list[i];
                             break   
                     }
                 } 
                

               

}

$("#status").append("<h5>Tank Level</h5><p>"+tankstat.tank_level+"</p>")   
$("#status1").append("<h5>type</h5><p>"+tankstat.status+"</p>")   
$("#status2").append("<h5>Reported_ts</h5><p>"+ moment(tankstat.created_ts).format(DATE_TIME_FORMAT)+"</p>")  

$(() => {
    var flist;
    console.log("start")
    var queryParams={
        query:{
            "bool": {
                "must": { "match": {
                    domainKey: "CDZMKBHJUM"
                }}
            }
        },
        "size":109,
      
        "from":0
        
    }
    
    $.ajax({
        "dataType": 'json',
        "contentType": 'application/json',
        "type": "POST",
        "url": BASE_PATH+'/devicedetail/listdev',
        "data":JSON.stringify({data:queryParams}),
        success: function (data) {
            var resultData = data.result.data.data;
           
            console.log("dara",resultData)
            for(i=0;i<=resultData.length;i++){
                if(devid==resultData[i].id)
                {
                    flist=resultData[i];
                  
                  
                   break;
                }
            }
            $("#device").append("<h5>Tank Level</h5><p>"+flist.id+"</p>")   
$("#device").append("<h5>LINKED TIME</h5><p>"+moment(flist.registeredStamp).format(DATE_TIME_FORMAT)+"</p>")  
$("#device2").append("<h5>model </h5><p>"+flist.modelId+"</p>")   
$("#device2").append("<h5>version</h5><p>"+flist.version+"</p>")   
            


        }
    })
})   