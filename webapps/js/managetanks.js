var TankMasterTable = null;
var tank_list = [];
var tankcount;
var key;
var device_list = [];
var Updateflag = false;
var id = [];
var device_id;
var totalcount;
var tankDeleteId=null;
var startDate = moment().subtract(6, 'days').startOf('day');
var endDate = moment().endOf('day');
$(document).ready(function () {
    loadTankList();
  });

$('#full').click(function(){
    var elem = document.documentElement;
    if($('#expandview').hasClass('fa fa-expand')){
       
        $('#expandview').removeClass('fa fa-expand');
        
        $('#expandview').addClass('fa fa-compress');
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
          } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
          } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
          }
        // $('#password').attr('type','text');
          
      }else{
       
        $('#expandview').removeClass('fa fa-compress');
        
        $('#expandview').addClass('fa fa-expand');  
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

function addtank(){
    $("#tank_name,#tank_type,#location,#device_id,#capacity,#min_level,#max_level").val('');
    
 }
 function refreshtank(){
    loadTankList();
 }
//tank Registration API
function tankDetails() {
    

    var tank_name = $("#tank_name").val();
    var tank_type = $("#tank_type").val();
    var location = $("#location").val();
    // var device_id = $("#device_id").val();
    var capacity = $("#capacity").val();
    var min_level = $("#min_level").val();
    var max_level = $("#max_level").val();

    //Validate
    if (tank_name === "") {
      
  
    $(".validate").css('display','block');
    return;

    } else if (tank_type === "") {

        ($(".validate").css('display','block'));
    return;


    } else if (location === "") {

        ($(".validate").css('display','block'));
        return
    

    }
    else if (capacity === "") {

        ($(".validate").css('display','block'));
        return
    

    }
    else if (min_level === "") {

        ($(".validate").css('display','block'));
    return


    }
    else if (max_level === "") {
        ($(".validate").css('display','block'));
        return
    

    }
    else if (device_id === "") {

        

    }

    else {

        //Build Input Objects
        var inputObj = {
            tank_name: tank_name,
            tank_type: tank_type,
            location: location,
            // device_id: device_id,
            capacity: capacity,
            min_level: min_level,
            max_level: max_level,
            created_ts: new Date().getTime()
        };
        
        console.log("inputObj", inputObj);
        //Call API
        if(Updateflag == false)
        {
        $.ajax({
            url: BASE_PATH+"/tank/insert",
            data: JSON.stringify(inputObj),
            contentType: "application/json",
            type: 'POST',
            success: function (result) {
                console.log("how",result);
                $("#exampleModal").css('display','none')
                $(".modal-backdrop").remove();
                // alert("hai");
                //Success -> Show Alert & Refresh the page
                
                successMsg("Tank Insert Successfully!");
                loadTankList();
                
                
            },
            error: function (e) {

                //Error -> Show Error Alert & Reset the form
                errorMsg("Tank Insert Failed!");
                window.location.reload();
            }
            
        });
       
    }

    else if (Updateflag == true) {
        var tank_name = $("#tank_name").val();
        var tank_type = $("#tank_type").val();
        var location = $("#location").val();
        // var device_id = $("#device_id").val();
        var capacity = $("#capacity").val();
        var min_level = $("#min_level").val();
        var max_level = $("#max_level").val();

        var updateData = {
            tank_name: tank_name,
            tank_type: tank_type,
            location: location,
            device_id: device_id,
            capacity: capacity,
            min_level: min_level,
            max_level: max_level,
            
        };
        $.ajax({

            url: BASE_PATH+"/tank/update",
            data: JSON.stringify({_id:key,updateData}),
           
            contentType: "application/json",
            type: 'POST',
            success: function (result) {
    // alert("hai");
    $("#tank_name,#tank_type,#location,#device_id,#capacity,#min_level,#max_level").val('');
    $("#exampleModal").css('display','none')
    $(".modal-backdrop").remove();
                //Success -> Show Alert & Refresh the page
                successMsg("Update Completed Successfully!");
                loadTankList();
            },
            error: function (e) {
    
                //Error -> Show Error Alert & Reset the form
                errorMsg("Update Failed!");
                window.location.reload();
            }
        });
    } Updateflag = false;
    }

}
$(function() {

    var start = moment().subtract(29, 'days');
    var end = moment();

    function cb(start, end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
           'Today': [moment(), moment()],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, cb);

    cb(start, end);

});
//tank List API
function loadTankList() {

    if (TankMasterTable) {
        TankMasterTable.destroy();
        $("#tank_table").html("");
    }

    var fields = [
        {
            mData: 'tank_name',
            sTitle: 'Tank Name',
            sWidth: '20%',
            orderable: false,
            // "className": 'sortingtable',
            mRender: function (data, type, row) {
                // return row.tank_name+""+row.location;
                return '<div class="row">' + '<img src="/images/tank-1.png"style="height:30px;"width:30px">' + '&nbsp;' + '&nbsp;' + '<b>' + row.tank_name +'</b>' + '</div>'+' <br>' + '<h6>' + '<i class="fa fa-map-marker" aria-hidden="true" style="color:red"></i>' + '&nbsp;' + row.location + '&nbsp;' + '</h6>';
            }
        },
        {
            mData: 'tank_type',
            sTitle: 'Tank Type',
            sWidth: '20%',
            orderable: false,
            mRender: function (data, type, row) {
                return  data ? data :'-';
            }
        },
        {
            mData: 'min_level',
            sTitle: 'Min level',
            sWidth: '20%',
            orderable: false,
            mRender: function (data, type, row) {
                return  data ? data :'-';
            }
        },
        {
            mData: 'max_level',
            sTitle: 'Max level',
            sWidth: '20%',
            orderable: false,
            mRender: function (data, type, row) {
                return  data ? data :'-';
            }
        },
        {
            mData: 'location',
            sTitle: 'Location',
            sWidth: '20%',
            orderable: true,
            mRender: function (data, type, row) {
                return  data ? data :'-';
            }
        },
        {
            mData: 'device_id',
            sTitle: 'Device Id',
            sWidth: '20%',
            orderable: true,
            mRender: function (data, type, row) {
                return  data ? data :'-';
            }
        },
        {
            mData: 'capacity',
            sWidth: '20%',
            sTitle: 'capacity',
            orderable: true,
            mRender: function (data, type, row) {
                return '<div class="row">' + '<b>' + row.capacity + '</b>' + '&nbsp;' + 'Liters' +'<span style="margin-right:50px">' + 'min -' + row.min_level +'&nbsp;'+'Liters'+'&nbsp;' + '&nbsp;' + '<h6>' +'max -' + '&nbsp;' + row.max_level + '&nbsp;'+'Liters'+'&nbsp;' + '</h6>' + '</div>';
            }
        },
        {
            mData: 'status',
            sWidth: '20%',
            sTitle: 'Linked Devices',
            orderable: false,
            mRender: function (data, type, row) {
                // console.log(row.device_id);
                if (row.device_id) {

                    return '<button type="button" id="link" class="btn tank-atag link1" title="Unlink" data-toggle="modal" data-target="#myModal1" onclick="linkdevice(\'' + row._id + '\')"><i class="fa fa-unlink" aria-hidden="true"></i></button>';

                } else {

                    return '<button type="button" id="link" class="btn tank-atag1 link1" title="Link" data-toggle="modal" data-target="#myModal" onclick="linkdevice(\'' + row._id + '\')"><i class="fa fa-link" aria-hidden="true"></i></button>';

                }
            },
        },
        {
            mData: 'created_ts',
            sTitle: 'Created Time', 
            "className": 'sortingtable',    
            mRender: function (data, type, row) {
                return moment(data).format(DATE_TIME_FORMAT);
            }
        },
        {
            sTitle: 'Actions',
            mRender: function (data, type, row) {
                var actionsHtml = '<button class="btn btn-default" data-toggle="modal" data-target="#deletemodal" onclick="adminDeleteTank(\'' + row._id + '\')" ><i class="fa fa-trash icon"></i></button>' + " " + '<button class="btn btn-default" data-toggle="modal" data-target="#exampleModal" onclick="editTank(\'' + row["_id"] + '\')"><i class="fa fa-edit"></i></button>';
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

    tank_list = [];

    var tableOption = {
        fixedHeader: false,
        responsive: true,
        paging: true,
        searching: true,
        aaSorting: [[8, 'desc']],
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
        "sAjaxSource": BASE_PATH + '/tank/list',
        "fnServerData": function (sSource, aoData, fnCallback, oSettings) {


            queryParams.query['bool']['must'] = [];
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
                queryParams.query['bool']['should'].push({ "wildcard": { "location": "*" + searchText + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "location": "*" + searchText.toLowerCase() + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "location": "*" + searchText.toUpperCase() + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "location": "*" + capitalizeFLetter(searchText) + "*" } })
                queryParams.query['bool']["minimum_should_match"] = 1;
                queryParams.query['bool']['should'].push({
                    "match_phrase": {
                        "location.keyword": "*" + searchText + "*"
                    }
                })
                queryParams.query['bool']['should'].push({
                    "match_phrase_prefix": {
                        "location.keyword": {
                            "query": "*" + searchText + "*"
                        }
                    }
                });      

            }
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
            queryParams.query['bool']['should'].push({ "wildcard": { "device_id": "*" + searchText + "*" } });
            queryParams.query['bool']['should'].push({ "wildcard": { "device_id": "*" + searchText.toLowerCase() + "*" } });
            queryParams.query['bool']['should'].push({ "wildcard": { "device_id": "*" + searchText.toUpperCase() + "*" } });
            queryParams.query['bool']['should'].push({ "wildcard": { "device_id": "*" + capitalizeFLetter(searchText) + "*" } })
            queryParams.query['bool']["minimum_should_match"] = 1;
            queryParams.query['bool']['should'].push({
                "match_phrase": {
                    "device_id.keyword": "*" + searchText + "*"
                }
            })
            queryParams.query['bool']['should'].push({
                "match_phrase_prefix": {
                    "device_id.keyword": {
                        "query": "*" + searchText + "*"
                    }
                }
            });
            oSettings.jqXHR = $.ajax({
                "dataType": 'json',
                "contentType": 'application/json',
                "type": "POST",
                "url": sSource,
                "data": JSON.stringify({ "query": queryParams }),
                success: function (data) {
                   

                     var resultData = data.result.data;

                    tank_list = resultData.data;
                    console.log("new",tank_list.length)
                //   console.log("now",tank_list[0].tank_name);
                    $("#manageTankTotalCount").html(data.result.total)

                    resultData['draw'] = oSettings.iDraw;
                    fnCallback(resultData);
                }
            });
        },

        dom: 'l<"toolbar">frtip',
        initComplete: function () {
            $("div.toolbar").html('<button type="button" class="btn button1 addtank" onclick=addtank() data-toggle="modal" data-target="#exampleModal"> <i class="fa fa-plus-square icons" style="color:white";"aria-hidden="true"></i>Add Tank</button>');
        }


    };

    TankMasterTable = $("#tank_table").DataTable(tableOption);
}
var tank1;
var _id
var Updateflag = false;

function editTank(id) {

    key = id;
    
    console.log(key);
    Updateflag = true;

    for (i = 0; i < tank_list.length; i++) {
        if (tank_list[i]._id == id) {
            tank1 = tank_list[i];
            $("#tank_name").val(tank1.tank_name);
            $("#tank_type").val(tank1.tank_type);
            $("#location").val(tank1.location);
            $("#capacity").val(tank1.capacity);
            $("#min_level").val(tank1.min_level);
            $("#max_level").val(tank1.max_level);
            device_id=tank1.device_id;
          
        }
    }
   

}
function adminDeleteTank(tankId){
    tankDeleteId=tankId;
    console.log(tankDeleteId);
}
function deleteTank() {
    console.log(tankDeleteId);
    $.ajax({

        url: BASE_PATH + "/tank/delete",
        data: JSON.stringify({ _id: tankDeleteId }),
        contentType: "application/json",
        type: 'POST',
        success: function (result) {
            $(".modal-backdrop").remove();
           
            //Success -> Show Alert & Refresh the page
            successMsg("Tank Deleted Successfully!");
            loadTankList();
        },
        error: function (e) {

            //Error -> Show Error Alert & Reset the form
            errorMsg("Tank Delete Failed!");
            window.location.reload();
        }
    });
}
// $(() => {
//     $.ajax({

//         url: BASE_PATH + "/devicedetail/listdev",
       
//         contentType: "application/json",
//         type: "POST",
//         async: true,
//         success: function (data) {
//             var resultData = data.result.data.data;
//             device_list = resultData;
//             console.log("hai", device_list, tank_list);
//             $("#devicelist").html("");
        
//                resultData.forEach((element) => {
//                   let tr = `<option value=` + element.id + `>` +  element.id + `</option>`;
//                   $("#devicelist").append(tr);
//                });
//         },
       
//     });
// });


//link

var info = [];
var flag1 = false;
// link
function linkdevice(tankid) {

    tank_list.forEach(element => {
        if (element._id == tankid) {
            info = [element];
        }
    });
    tankdata = tankid;

    var dlistid = $("#listdevice").val();
    tank_list.forEach((ele) => {
        if (dlistid == ele.id) {


        }
    })
}

function clicklinkdevice() {
    var dlistid = $("#listdevice").val();
    for (i = 0; i <= tank_list.length - 1; i++) {
        if (tank_list[i].device_id == dlistid && tank_list[i].device_id != "") {
           
                //Success -> Show Alert & Refresh the page
                warningMsg("Device Already linked!");
            
            console.log("already linked");
            flag1 = true;
            break;
        } else {
            flag1 = false;
        }

    }
    console.log(flag1);

    
    if (flag1 == false) {
        console.log("info", key);
        var updateData = {
            tank_name: info[0].tank_name,
            tank_type: info[0].tank_type,
            location: info[0].location,
            capacity: info[0].capacity,
            min_level: info[0].min_level,
            device_id: dlistid,
            max_level: info[0].max_level,
            updated_ts: new Date().getTime(),
            created_ts: info[0].created_ts
        };
        $.ajax({
            url: BASE_PATH + "/tank/update",
            data: JSON.stringify({ _id: tankdata, updateData }),
            contentType: "application/json",
            type: "POST",
            success: function(result) {
                //Success -> Show Alert & Refresh the page
                successMsg("Device linked Successfully!");
                loadTankList();
            },
            error: function(e) {
                //Error -> Show Error Alert & Reset the form
                errorMsg("Device linked Failed!");
                //window.location.reload();
            },
        });

    }
}

//unlink

function clicklinkdevice1() {
    
        var updateData = {
            tank_name: info[0].tank_name,
            tank_type: info[0].tank_type,
            location: info[0].location,
            capacity: info[0].capacity,
            min_level: info[0].min_level,
            max_level: info[0].max_level,
            updated_ts: new Date().getTime(),
            created_ts: info[0].created_ts
        };
        $.ajax({
            url: BASE_PATH + "/tank/update",
            data: JSON.stringify({ _id: tankdata, updateData }),
            contentType: "application/json",
            type: "POST",
            success: function(result) {
                //Success -> Show Alert & Refresh the page
                successMsg("Device Unlinked Successfully!");
                loadTankList();
            },
            error: function(e) {
                //Error -> Show Error Alert & Reset the form
                errorMsg("Device Unlinked Failed!");
                //window.location.reload();
            },
        });

    }

    $(() => {
        var queryParams={
            "query": {
                "bool": {
                    "must": [{
                        "match": {
                            "domainKey": "CDZMKBHJUM"
                        }
                    }]
                }
            },
            "from": 0,
            "size": 50
        }
        var dev;
        $.ajax({
      
            url: BASE_PATH + "/devicedetail/listdev",
            contentType: "application/json",
            type: "POST",
            "data":JSON.stringify({"data":queryParams}),
            // async: true,
            success: function(data) {
                var resultData = data.result.data.data;
                device_list = resultData;
                console.log("hello", device_list);
                $("#listdevice").html("");
    
                resultData.forEach((et) => {
                    for(i=0;i<=tank_list.length-1;i++){
                        console.log("noe",tank_list[i].device_id);
                        if(et.id==tank_list[i].device_id){
                         dev="";
                         break;
                        }

                        else{
                           dev=et.id;
                        }
                    }
                    if(dev==""){


                    }
                    else{
                        let tr = `<option value=` + dev+ `>` + dev + `</option>`;
                        $("#listdevice").append(tr);
                    }
                    
                   
                });
            },
        });
    });
    
  