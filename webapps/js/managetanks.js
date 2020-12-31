var TankMasterTable = null;
var tank_list = [];
var tankcount;
var totalcount;
var key;

var Updateflag = false;
var startDate = moment().subtract(6, 'days').startOf('day');
var endDate = moment().endOf('day');
$(document).ready(function () {
    loadTankList();

});
function addtank(){
    $("#tank_name,#tank_type,#location,#device_id,#capacity").val('');
 }
//  function refreshtank(){
//     loadTankList();
//  }
//tank Registration API
function tankDetails() {

    var tank_name = $("#tank_name").val();
    var tank_type = $("#tank_type").val();
    var location = $("#location").val();
    var device_id = $("#device_id").val();
    var capacity = $("#capacity").val();
    //Validate
    if (tank_name === "") {

        alert("Tank Name is Required!");

    } else if (tank_type === "") {

        alert("Tankname is Required!");

    } else if (location === "") {

        alert("Location is Required!");

    }
    else if (capacity === "") {

        alert("capacity is Required!");

    }
    else if (device_id === "") {

        alert("Device is Required!");

    }

    else {

        //Build Input Objects
        var inputObj = {
            tank_name: tank_name,
            tank_type: tank_type,
            location: location,
            device_id: device_id,
            capacity: capacity,
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
        var device_id = $("#device_id").val();
        var capacity = $("#capacity").val();
        
        var updateData = {
            tank_name: tank_name,
            tank_type: tank_type,
            location: location,
            device_id: device_id,
            capacity: capacity
        };
        $.ajax({

            url: BASE_PATH+"/tank/update",
            data: JSON.stringify({_id:key,updateData}),
           
            contentType: "application/json",
            type: 'POST',
            success: function (result) {
    // alert("hai");
    $("#tank_name,#tank_type,#location,#device_id,#capacity").val('');
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
                return row.tank_name;
            }
        },
        {
            mData: 'tank_type',
            sTitle: 'Tank Type',
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
                return data;
            }
        },

        {
            mData: 'capacity',
            sWidth: '20%',
            sTitle: 'capacity',
            orderable: false,
            mRender: function (data, type, row) {
                return data;
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
                var actionsHtml = '<button class="btn btn-default" data-target="#deletemodal" data-toggle="modal" onclick="deleteTank(\'' + row["_id"] + '\')"><i class="fa fa-trash icon"  ></i></button>' + " " + '<button class="btn btn-default" data-toggle="modal" data-target="#exampleModal" onclick="editTank(\'' + row["_id"] + '\')"><i class="fa fa-edit"></i></button>';
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
        responsive: false,
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
                    tankcount= resultData.data;
                    totalcount= resultData.data;
                    $("#totalCount").html(data.result.total)

                    resultData['draw'] = oSettings.iDraw;
                    fnCallback(resultData);
                }
            });
        },
        dom: 'l<"toolbar">frtip',
        initComplete: function () {
            $("div.toolbar").html('<input class="pick" data-date-format="mm/dd/yyyy" id="datePickerrr" type="date"><button type="button" class="btn button1" onclick=addtank() data-toggle="modal" data-target="#exampleModal"> <i class="fa fa-plus-square icons" style="color:white";"aria-hidden="true"></i>Add Tanks</button>');
        }


    };

    TankMasterTable = $("#tank_table").DataTable(tableOption);
}
var tank1;
var _id
// var Updateflag = false;

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
            console.log(tank1);
            _id = id
        }
    }
    console.log(id);

}
function deleteTank(row) {
    $.ajax({

        url: BASE_PATH + "/tank/delete",
        data: JSON.stringify({ _id: row }),
        contentType: "application/json",
        type: 'POST',
        success: function (result) {
           

            //Success -> Show Alert & Refresh the page
            successMsg("Delete Completed Successfully!");
            loadTankList();
        },
        error: function (e) {

            //Error -> Show Error Alert & Reset the form
            errorMsg("Delete Failed!");
            window.location.reload();
        }
    });
}
$("#totaltank").append(`<p>`+ tankcount.length+`</p>`);
$("#total").append(`<span>`+ totalcount.length+`</span>`);
