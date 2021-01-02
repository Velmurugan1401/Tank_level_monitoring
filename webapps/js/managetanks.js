var TankMasterTable = null;
var tank_list = [];
var tankcount;
var id = [];
var totalcount;
var tankDeleteId=null;
var startDate = moment().subtract(6, 'days').startOf('day');
var endDate = moment().endOf('day');
$(document).ready(function () {
    loadTankList();

});
$('#expandview').click(function(){
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
    var device_id = $("#device_id").val();
    var capacity = $("#capacity").val();
    var min_level = $("#min_level").val();
    var max_level = $("#max_level").val();

    //Validate
    if (tank_name === "") {
        showToast("info", "info","Tank Name is Required");
    // ("Tank Name is Required!");

    } else if (tank_type === "") {

        showToast("info", "info","Tank Type is Required");

    } else if (location === "") {

        showToast("info", "info","Location is Required");

    }
    else if (capacity === "") {

        showToast("info", "info","Capacity is Required");

    }
    else if (min_level === "") {

        showToast("info", "info","Min Level is Required");

    }
    else if (max_level === "") {

        showToast("info", "info","Max Level is Required");

    }
    else if (device_id === "") {

        

    }

    else {

        //Build Input Objects
        var inputObj = {
            tank_name: tank_name,
            tank_type: tank_type,
            location: location,
            device_id: device_id,
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
                // $("#exampleModal").css('display','none')
                // $(".modal-backdrop").remove();
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
        var device_id = $("#device_id").val();
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
            max_level: max_level
        };
        $.ajax({

            url: BASE_PATH+"/tank/update_id="+_id,
            data: JSON.stringify(inputObj),
           
            contentType: "application/json",
            type: 'POST',
            success: function (result) {
    // alert("hai");
    $("#tank_name,#tank_type,#location,#device_id,#capacity,min_level,max_level").val('');
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
    } flag = false;
    }

}
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
            mRender: function (data, type, row) {
                // return row.tank_name+""+row.location;
                return '<div class="row">' + '<img src="/images/tank-1.png"style="height:30px;"width:30px">' + '&nbsp;' + '&nbsp;' + '<b>' + row.tank_name +'</b>' + '&nbsp;' + '&nbsp;' + '<h6>' + '&nbsp;' + '&nbsp;' + row.location + '&nbsp;' + '</h6>' + '</div>';
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
                return data;
            }
        },
        {
            mData: 'max_level',
            sTitle: 'Max level',
            sWidth: '20%',
            orderable: false,
            mRender: function (data, type, row) {
                return data;
            }
        },
        {
            mData: 'location',
            sTitle: 'Location',
            sWidth: '20%',
            orderable: false,
            mRender: function (data, type, row) {
                return  data ? data :'-';
            }
        },

        {
            mData: 'capacity',
            sWidth: '20%',
            sTitle: 'capacity',
            orderable: false,
            mRender: function (data, type, row) {
                return '<div class="row">' + '<b>' + row.capacity + '</b>' + '&nbsp;' + 'Gallon' +'<span style="margin-right:50px">' + 'min -' + row.min_level + '&nbsp;' + '&nbsp;' + '<h6>' +'max -' + '&nbsp;' + row.max_level + '&nbsp;' + '</h6>' + '</div>';
            }
        },
        {
            mData: 'status',
            sWidth: '20%',
            sTitle: 'Linked Devices',
            orderable: false,
            mRender: function (data, type, row) {
                return '<a href="" class="link" data-toggle="modal" data-target="#myModal"><i class="fa fa-eye" aria-hidden="true" style="padding-right:10px;"></i>Link</a>';
            }
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
            orderable: false,
           
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
                    $(".totalCount").html(data.result.total)

                    resultData['draw'] = oSettings.iDraw;
                    fnCallback(resultData);
                }
            });
        },
        dom: 'l<"toolbar">frtip',
        initComplete: function () {
            $("div.toolbar").html('<input class="pick" data-date-format="mm/dd/yyyy" type="date" id="datePickerrr"><button type="button" class="btn button1" onclick=addtank() data-toggle="modal" data-target="#exampleModal"> <i class="fa fa-plus-square icons" style="color:white";"aria-hidden="true"></i>Add Tanks</button>');
        }


    };

    TankMasterTable = $("#tank_table").DataTable(tableOption);
}
var tank1 = null;
var _id
var Updateflag = false;

function editTank(id) {


    flag = id;
    console.log(flag);
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
            
            console.log(tank1);
            _id = id
        }
    }
    console.log(id);

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
async function deviceLink(){
    
    if(device_id=""){
        device_id=id;
        console.log("new",id)
     await function editTank(id) {

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
                    $("#device_id").val(tank1.device_id);
                    console.log(tank1);
                    _id = id
                }
            }
            console.log(id);
        
        }
    }
        
    
else{
    successMsg("Already Linked");
}
}