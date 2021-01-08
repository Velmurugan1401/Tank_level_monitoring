// const e = require("express");

var TankStatusTable = null;
var TankStatus_list = [];
var deleteDeviceId=null;
// var startDate = moment().subtract(6, 'days').startOf('day');
// var endDate = moment().endOf('day');
 var EventTable=null;
var Event_list=[];
$(document).ready(function(){
    loadEventList();
});
function loadEventList()
{
 if(EventTable)
 {
    EventTable.destroy();
    $('#example').html("");
 }
 var fields=[
    {
        mData: 'device_id',
        sTitle: 'Device Id',
        sWidth: '20%',
        orderable: false,
        mRender: function (data, type, row) {  
            console.log(row);        
            return  data ? data :'-';
        }
    },
    {
        mData: 'tank_level',
        sTitle: 'Status',
        sWidth: '20%',
        orderable: false,
        mRender: function (data, type, row) {          
                
            return  data ? data :'-';
        }
    }
  
]
    var queryParams = {
        query:{
            "bool": {
                "must": { "match": {
                    "device_id": devid
                }}
            }
        },
        sort: [{
            "created_ts": {
                "order": "asc"
            }
        }]
    };

    Event_list = [];
   
    var tableOption = {
        fixedHeader: false,
        responsive:true,
        paging: true,
        searching: true,
        aaSorting: [
            [0, 'desc'],
        ],
        "ordering": true,
        iDisplayLength: 10,
        lengthMenu: [
            [10, 50, 100],
            [10, 50, 100]
        ],
        aoColumns: fields,
        "bProcessing": true,
        "language": {
            "emptyTable": "No data found!",
            "processing": '<i class="fa fa-spinner fa-spin" style="color:#333"></i> Processing'

        },
        "bServerSide": true,
        "sAjaxSource": BASE_PATH + '/eventtrigger/list',
        "fnServerData": function (sSource, aoData, fnCallback, oSettings) {


            queryParams.query['bool']['must'] = [{ "match": {
                "device_id": devid
            }}];
            queryParams.query['bool']['should'] = [];
            delete queryParams.query['bool']["minimum_should_match"];

            var keyName = fields[oSettings.aaSorting[0][0]]

            var sortingJson = {};
            sortingJson[keyName['mData']] = {
                "order": oSettings.aaSorting[0][1]
            };
            queryParams.sort = [sortingJson];

            queryParams['size'] = oSettings._iDisplayLength;
            queryParams['from'] = oSettings._iDisplayStart;

            // queryParams.query['bool']['must'].push({ "match": { "acc_id":SESSION_OBJ.orgs[0]  } });

            var searchText = oSettings.oPreviousSearch.sSearch.trim();

            if (searchText) {
                queryParams.query['bool']['should'].push({ "wildcard": { "tank_level": "*" + searchText + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "tank_level": "*" + searchText.toLowerCase() + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "tank_level": "*" + searchText.toUpperCase() + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "tank_level": "*" + capitalizeFLetter(searchText) + "*" } })
                queryParams.query['bool']["minimum_should_match"] = 1;
                queryParams.query['bool']['should'].push({
                    "match_phrase": {
                        "tank_level.keyword": "*" + searchText + "*"
                    }
                })
                queryParams.query['bool']['should'].push({
                    "match_phrase_prefix": {
                        "tank_level.keyword": {
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

                "data": JSON.stringify({
                    "query": queryParams
                }),
                success: function (data) {
                    var resultData = data.result.data;            
                     resultData['draw'] = oSettings.iDraw;
                    fnCallback(resultData);
                }
            });
        },               
        initComplete: function () {        
        }
    };
    EventTable = $("#example").DataTable(tableOption);
}
$(document).ready(function(){
    loadTankStatusList();
   
    $('input[name="tankactive"]').on('click', function () {
        var n = $('input[name="tankactive"]:checked').val();
       
        $("#tankFilter").html('');
        $("#tankFilter").append(n);
        })
    
});

$('#tankStatusExpand').click(function(){
    var elem = document.documentElement;
    if($("#expandview").hasClass('fa fa-expand')){
       
        $("#expandview").removeClass('fa fa-expand');
        
        $("#expandview").addClass('fa fa-compress');
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
          } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
          } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
          }
       
          
      }else{
       
        $("#expandview").removeClass('fa fa-compress');
        
        $("#expandview").addClass('fa fa-expand');  
        if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
          }
        
       
      }
});

function loadTankStatusList() {

    if (TankStatusTable) {
        TankStatusTable.destroy();
        $("#StatusTable").html("");
    }

    var fields = [
        {
            mData: 'tank_name',
            sTitle: 'Tank Name',
            sWidth: '15%',
            orderable: false,
            // "className": 'sortingtable',
            mRender: function (data, type, row) {
                if(!((row.tank_name) && (row.location))){
                   return data ? data : '-';
                }
                else if((row.tank_name == "null") || (row.tank_name == "undefined")){
                    return '<div class="row">' + '<b>' + '-' +'</b>' 
                    + '</div>'+'<br>' 
                    + '<h6>' + '<i class="fa fa-map-marker" aria-hidden="true" style="color:red;"></i>'+'&nbsp;' + '&nbsp;' + row.location + '&nbsp;' + '</h6>';
                  
                }
                else if((row.location == "null") || (row.location == "undefined")){
                    return '<div class="row">' + '<img src="/images/tank-1.png"style="height:30px;"width:30px">' + '&nbsp;' + '&nbsp;' + '<b>' + row.tank_name +'</b>' 
                 + '</div>'+'<br>' 
                 + '<h6>' + '-' +'</h6>';
               
                }
                else{
                return '<div class="row">' + '<img src="/images/tank-1.png"style="height:30px;"width:30px">' + '&nbsp;' + '&nbsp;' + '<b>' + row.tank_name +'</b>' 
                 + '</div>'+'<br>' 
                 + '<h6>' + '<i class="fa fa-map-marker" aria-hidden="true" style="color:red;"></i>'+'&nbsp;' + '&nbsp;' + row.location + '&nbsp;' + '</h6>';
               
                }
            }
        },
       {
            mData: 'tank_type',
            sWidth: '10%',
            sTitle: 'Tank Type',
            orderable: false,
            mRender: function (data, type, row) {
                // console.log(row);
                return data ? data : '-';
                
            }
        },
        {
          mData: 'tank_level',
          sWidth: '20%',
          sTitle: 'Tank Level',
          orderable: false,
          "className": 'sortingtable',
          mRender: function (data, type, row) {
            var cal=(row.tank_level/row.capacity)*100;
            //  alert(cal);


             if((cal > 75) && (cal <= 100)){
                return '<div class="row">' 
                + '<div class="col-md-8">'
                +'<div style="font-size:16px;font-weight:normal;">' + '<b>'+ row.tank_level + '</b>'+'&nbsp;' +'litres '+'</div>'
                +'<div style="font-size:12px;">'+ 'Total Capacity' + '&nbsp;'+ row.capacity + '&nbsp;'+'<br>' +'litres '+'</div>'
                +'</div>'
                + '<div class="col-md-4">'
                +'<div style="width:50px;height:50px;background-color:lightyellow;border:1px solid gray;border-bottom:35px solid #38A7FA;border-radius:3px;">' + '</div>'
                +'<div style="font-size:12px;font-weight:normal;">'+ '<b>' + Math.round(cal) + ' % Full' + '</b>' +'</div>'
                +'</div>'
                +'</div>';
             }
             else if((cal > 50) && (cal <= 75)){
                return '<div class="row">' 
                + '<div class="col-md-8">'
                +'<div style="font-size:16px;font-weight:normal;">' + '<b>'+row.tank_level+ '</b>' + '&nbsp;' +'litres '+'</div>'
                +'<div style="font-size:12px;">'+ 'Total Capacity' + '&nbsp;'+ row.capacity + '&nbsp;'+'<br>' +'litres '+'</div>'
                +'</div>'
                + '<div class="col-md-4">'
                +'<div style="width:50px;height:50px;background-color:lightyellow;border:1px solid gray;border-radius:3px;border-bottom:23px solid #38A7FA;">'+ '</div>'
                +'<div style="font-size:12px;font-weight:normal;">'+ '<b>' +  Math.round(cal) + ' % Full' + '</b>' +'</div>'
                +'</div>'
                +'</div>';
             }
             else if((cal > 25) && (cal <= 50)){
                return '<div class="row">' 
                + '<div class="col-md-8">'
                +'<div style="font-size:16px;font-weight:normal;">' + '<b>'+row.tank_level+ '</b>' + '&nbsp;' +'litres '+'</div>'
                +'<div style="font-size:12px;">'+ 'Total Capacity' + '&nbsp;'+ row.capacity + '&nbsp;'+'<br>' +'litres '+'</div>'
                +'</div>'
                + '<div class="col-md-4">'
                +'<div style="width:50px;height:50px;background-color:lightyellow;border:1px solid gray;border-radius:3px;border-bottom:15px solid #38A7FA;">' +'</div>'
                +'<div style="font-size:12px;font-weight:normal;">'+ '<b>' +  Math.round(cal) + ' % Full' + '</b>' +'</div>'
                +'</div>'
                +'</div>';
             }
             else if((cal > 1) && (cal <= 25)){
                return '<div class="row">' 
                + '<div class="col-md-8">'
                +'<div style="font-size:16px;font-weight:normal;">' +'<b>'+ row.tank_level + '</b>'+ '&nbsp;' +'litres '+'</div>'
                +'<div style="font-size:12px;">'+ 'Total Capacity' + '&nbsp;'+ row.capacity + '&nbsp;'+'<br>' +'litres '+'</div>'
                +'</div>'
                + '<div class="col-md-4">'
                +'<div style="width:50px;height:50px;background-color:lightyellow;border:1px solid gray;border-radius:3px;border-bottom:10px solid #38A7FA;">' +'</div>'
                +'<div style="font-size:12px;font-weight:normal;">'+ '<b>' +  Math.round(cal) + ' % Full' + '</b>' +'</div>'
                +'</div>'
                +'</div>';
             }
             else{
                return '<div class="row">' 
                + '<div class="col-md-8">'
                +'<div style="font-size:16px;font-weight:normal;">' + '<b>'+row.tank_level+ '</b>' + '&nbsp;' +'litres '+'</div>'
                +'<div style="font-size:12px;">'+ 'Total Capacity' + '&nbsp;'+ row.capacity + '&nbsp;'+'<br>' +'litres '+'</div>'
                +'</div>'
                + '<div class="col-md-4">'
                +'<div style="width:50px;height:50px;background-color:lightyellow;border:1px solid gray;border-radius:3px;">' +'</div>'
                +'<div style="font-size:12px;font-weight:normal;">'+'<b>' + Math.round(cal) + ' % ' + '</b>'+'</div>'
                +'</div>'
                +'</div>';
             }
        
          }
      },
   
      {
        mData: 'device_id',
        sWidth: '15%',
        sTitle: ' Device Id ',
        orderable: false,
        mRender: function (data, type, row) {
            return data ? data : '-';
        }
    },
        {
            sWidth: '13%',
            mData: 'reported_ts',
            sTitle: 'Reported Time',
            "className": 'sortingtable',
            mRender: function (data, type, row) {
                return moment(data).format(DATE_TIME_FORMAT);
            }
        },
        
        {
            sWidth: '10%',
            sTitle: 'Actions',
            orderable: false,
            mRender: function (data, type, row) {
              var actionsHtml = '<button class="btn btn-default"  onclick="loadMainPage(\'/snapshot\');status(\''+row.device_id+'\');level(\''+row.device_id+'\')" href="#/snapshot" title="Goto Snapshot" style="margin-right:5px;background-color:#299AE1;color:white;" ><i class="fa fa-eye" aria-hidden="true"></i></button>'
                          +'<button class="btn btn-default" data-target="#statusDeletemodal" data-toggle="modal" onclick="assignDeleteDeviceId(\'' + row._id + '\')" title="Delete Tank" style="background-color:#299AE1;color:white;"><i class="fa fa-trash icon" ></i></button>';
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
        sort: [{ "created_ts": { "order": "asc" } }]
    };

    TankStatus_list = [];

    var tableOption = {
        fixedHeader: false,
        responsive: true,
        paging: true,
        searching: true,
        aaSorting: [[4, 'desc']],
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

            // queryParams.sort=[{"created_ts":{"order":"desc"}}];

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
                "data": JSON.stringify({ "query":queryParams }),
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

    function tankStatusRef(){
        loadTankStatusList();
    }

function assignDeleteDeviceId(row,row1){

    console.log(row);
    console.log(row1);
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


    //  snapshot
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
                $("#tankname").append("<h5>Name</h5><p>"+dank.tank_name+"</p>")   
                $("#tankname").append("<h5>Type</h5><p>"+dank.tank_type+"</p>")   
                $("#tankname").append("<h5>Capacity</h5><p>"+dank.capacity+"</p>")  
                $("#Location").append("<h5>Location</h5><p>"+dank.location+"</p>") 
                $("#Location").append("<h5>Max Level</h5><p>"+dank.max_level+"</p>")  
                $("#Location").append("<h5>Min Level</h5><p>"+dank.min_level+"</p>")                  
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


// $("#status1").append("<h5>Status</h5><p>"+tankstat.status+"</p>")   
// $("#status2").append("<h5>Reported_ts</h5><p>"+ moment(tankstat.created_ts).format(DATE_TIME_FORMAT)+"</p>")  

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
            $("#device").append("<h5>Device Name</h5><p>"+flist.id+"</p>")   
            $("#device").append("<h5>Linked Time</h5><p>"+moment(flist.registeredStamp).format(DATE_TIME_FORMAT)+"</p>")  
           $("#device2").append("<h5>Model</h5><p>"+flist.modelId+"</p>")   
           $("#device2").append("<h5>Version</h5><p>"+flist.version+"</p>")       
        }
    })
})   
$('#onbut').on('click', function(e){
    $('.off').removeClass('off').addClass('on');
    e.preventDefault();
});
$('#offbut').on('click', function(e){
    $('.on').removeClass('on').addClass('off');
    e.preventDefault();
});

 setInterval(level,3000);
 
function level()
{
  
    var conti;
    var lvl;
    var cap;
    var cal;
    var conti;
        $.ajax({
            "dataType": 'json',
            "contentType": 'application/json',
            "type": "POST",
            url: BASE_PATH + '/tankstatus/list',
            success: function (data) {                
                var resultData = data.result.data.data;                  
                // console.log('row',devid);
                for(i=0;i<=resultData.length-1;i++){
                    if(devid==resultData[i].device_id)
                    {     
                        conti=resultData[i].tank_level;
                        repo=resultData[i].reported_ts;
                        // console.log(resultData);            
                        lvl=resultData[i].tank_level;
                        cap=resultData[i].capacity;  
                        console.log(conti)                          
                        cal=((lvl/cap)*100);  
                        // console.log(Math.round(cal)); 
                        $('.water').height((cal/2)+'%'); 
                        let flowheight = cal/2;
                        $('.flow').height((140 - flowheight)+'px').show();
                        $("#status").html("<h5>Tank Level</h5><p>"+conti+"</p>")  
                        $("#status2").html("<h5>Reported Time</h5><p>"+ moment(repo).format(DATE_TIME_FORMAT)+"</p>")                                            
                        break;
                    }
                }          
    
            }
            
        })     
    }
    $(() => {
        var flist;
        console.log("start")
        var queryParams={
            query:{
                "bool": {
                    "must": { "term": {
                        "device_id": devid
                    }}
                }
            },
            "sort":[
                {"reported_ts ":{"order":"desc"}}
            ]
            
        }
        $.ajax({
            "dataType": 'json',
            "contentType": 'application/json',
            "type": "POST",
            "url": BASE_PATH+'/eventtrigger/list',
            "data":JSON.stringify({data:queryParams}),
            success: function (data) {
                var resultData = data.result.data.data;           
                console.log("dara",resultData)
                for(i=0;i<1;i++){
                    if(resultData.tank_level=="High")
                    {
                        $("#status1").append("<h5>Status</h5><p>OFF</p>")        
                      
                      
                    }
                    else if(resultData.tank_level=="Low")
                    {
                        $("#status1").append("<h5>Status</h5><p>ON</p>") 
                    }
                    else{
                        $("#status1").append("<h5>Status</h5><p>Normal</p>")
                    }
                }
               
                
    
    
            }
        })
    })
    