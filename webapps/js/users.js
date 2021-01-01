var UserTable = null;
var Users_list = [];
var usercount;
var key;
var count;
var flag = false;
var usercount;
// var startDate = moment().subtract(6, 'days').startOf('day');
// var endDate = moment().endOf('day');
$(document).ready(function () {


    loadUsersList();
});

//User insert API

function loadUser() {

    var first_name = $("#name1").val();
    var last_name = $("#name2").val();
    var mobile_no = $("#mobile").val();
    var email_id = $("#emaill").val();
    var location = $("#loc").val();




    //Validate
    if (first_name === "") {

        alert("First  Name is Required!");

    } else if (last_name === "") {

        alert("Last name is Required!");

    } else if (mobile_no === "") {

        alert("Mobile number  is Required!");

    } else if (email_id === "") {

        alert("Email id is Required!");

    } else if (location === "") {

        alert("Location is Required!");

    } else {

        //Build Input Objects
        var inputObj = {
            first_name: first_name,
            last_name: last_name,
            mobile_no: mobile_no,
            email_id: email_id,
            location: location

        };

    }
    console.log("inputObj", inputObj);

    //Call API
    if (flag == false) {
        $.ajax({
            url: BASE_PATH + "/user/insert",
            data: JSON.stringify(inputObj),
            contentType: "application/json",
            type: 'POST',
            success: function (result) {
                console.log(result);
                // $("#name1,#name2,#mobile,#emaill,#loc").val('');
                // $("#myModal").css('display','none');
                // $(".modal-backdrop").remove();

                //Success -> Show Alert & Refresh the page
                successMsg("User Added Successfully!");
                loadUsersList();
            },
            error: function (e) {

                //Error -> Show Error Alert & Reset the form
                errorMsg(" User not created!");
                window.location.reload();
            }
        });

    } else if (flag == true) {
        var fname = $("#name1").val();
        var lname = $("#name2").val();
        var mno = $("#mobile").val();
        var eid = $("#emaill").val();
        var location = $("#loc").val();


        var updateData = {
            first_name: fname,
            last_name: lname,
            mobile_no: mno,
            email_id: eid,
            location: location
        };
        console.log("id", key)
        console.log("update", updateData);
        $.ajax({

            url: BASE_PATH + "/user/update",
            data: JSON.stringify({
                _id: key,
                updateData
            }),
            contentType: "application/json",
            type: 'POST',
            success: function (result) {
                // //Success -> Show Alert & Refresh the page 
                $("#name1,#name2,#mobile,#emaill,#loc").val('');
                $("#myModal").css('display', 'none');
                $(".modal-backdrop").remove();

                successMsg("Update Completed Successfully!");

                // loadUsersList();
                window.location.reload();
            },
            error: function (e) {

                //Error -> Show Error Alert & Reset the form
                errorMsg("Update Failed!");
                window.location.reload();
            }
        });
        flag = false;
    }

}


//User List API
function loadUsersList() {

    if (UserTable) {
        UserTable.destroy();

        $("#myTable").html("");

    }

    var fields = [{
            mData: 'first_name',
            sTitle: 'First Name',
            sWidth: '20%',
            orderable: false,
            mRender: function (data, type, row) {
                return data;
            }
        },
        {
            mData: 'last_name',
            sTitle: 'Last Name',
            sWidth: '20%',
            orderable: false,
            mRender: function (data, type, row) {
                return data;
            }
        },

        {
            mData: 'mobile_no',
            sWidth: '20%',
            sTitle: 'Mobile No',
            orderable: false,
            mRender: function (data, type, row) {
                return data;
            }
        },
        {
            mData: 'email_id',
            sWidth: '20%',
            sTitle: 'Email Id',
            orderable: false,
            mRender: function (data, type, row) {
                return data;
            }
        },
        {
            mData: 'location',
            sWidth: '20%',
            sTitle: 'Location',
            orderable: false,
            mRender: function (data, type, row) {
                return data;
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
                var actionsHtml = '<button class="btn btn-default"  onclick="deleteUser(\'' + row._id + '\')"><i class="fa fa-trash"></i></button>' + '<button class="btn btn-default"  data-toggle="modal" data-target="#myModal" onclick="editUser(\'' + row._id + '\')"><i class="fa fa-pencil edit"></i>';
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
        sort: [{
            "created_ts": {
                "order": "asc"
            }
        }]
    };

    Users_list = [];

    var tableOption = {
        fixedHeader: false,
        responsive: false,
        paging: true,
        searching: true,
        aaSorting: [
            [3, 'desc']
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
        "sAjaxSource": BASE_PATH + '/user/list',
        "fnServerData": function (sSource, aoData, fnCallback, oSettings) {


            queryParams.query['bool']['must'] = [];
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
                queryParams.query['bool']['should'].push({
                    "wildcard": {
                        "first_name": "*" + searchText + "*"
                    }
                });
                queryParams.query['bool']['should'].push({
                    "wildcard": {
                        "first_name": "*" + searchText.toLowerCase() + "*"
                    }
                });
                queryParams.query['bool']['should'].push({
                    "wildcard": {
                        "first_name": "*" + searchText.toUpperCase() + "*"
                    }
                });
                queryParams.query['bool']['should'].push({
                    "wildcard": {
                        "first_name": "*" + capitalizeFLetter(searchText) + "*"
                    }
                })
                queryParams.query['bool']["minimum_should_match"] = 1;
                queryParams.query['bool']['should'].push({
                    "match_phrase": {
                        "first_name.keyword": "*" + searchText + "*"
                    }
                })
                queryParams.query['bool']['should'].push({
                    "match_phrase_prefix": {
                        "first_name.keyword": {
                            "query": "*" + searchText + "*"
                        }
                    }
                });

                queryParams.query['bool']['should'].push({
                    "wildcard": {
                        "location": "*" + searchText + "*"
                    }
                });
                queryParams.query['bool']['should'].push({
                    "wildcard": {
                        "location": "*" + searchText.toLowerCase() + "*"
                    }
                });
                queryParams.query['bool']['should'].push({
                    "wildcard": {
                        "location": "*" + searchText.toUpperCase() + "*"
                    }
                });
                queryParams.query['bool']['should'].push({
                    "wildcard": {
                        "location": "*" + capitalizeFLetter(searchText) + "*"
                    }
                })
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

                "data": JSON.stringify({
                    "query": queryParams
                }),
                success: function (data) {

                    var resultData = data.result.data;

                    Users_list = resultData.data;
                    usercount = resultData.data
                    $(".totalCount").html(data.result.total)


                    resultData['draw'] = oSettings.iDraw;
                    fnCallback(resultData);
                }
            });
        },
        // dom: 'l<"toolbar">frtip',
        // initComplete: function (settings, json) {
        //     $("div.toolbar").html('<button type="button" class="btn button1" data-toggle="modal" data-target="#myModal"> <i class="fa fa-user-plus p-1" style="color:white";"aria-hidden="true"></i>Add New User</button><i class="fa fa-refresh fa-lg p-2" aria-hidden="true"></i>');
        // },

        dom: 'l<"toolbar">frtip',
        initComplete: function () {
            $("div.toolbar").html('<input class="pick" data-date-format="mm/dd/yyyy" id="datePickerrr" type="date"> <button type="button" class="btn button1" data-toggle="modal" data-target="#myModal"> <i class="fa fa-user-plus p-1" style="color:white";"aria-hidden="true"></i>Add New User</button><i class="fa fa-refresh fa-lg p-2" aria-hidden="true"></i>');
            // $("div.toolbar").html('<button type="button" class="btn button1" data-toggle="modal" data-target="#myModal"> <i class="fa fa-user-plus p-1" style="color:white";"aria-hidden="true"></i>Add New User</button><i class="fa fa-refresh fa-lg p-2" aria-hidden="true"></i>');   

        }
    };

    UserTable = $("#myTable").DataTable(tableOption);

}


//update details 

var user1;
var _id

function editUser(id) {
    key = id;
    flag = true;
    console.log(flag);
    console.log(key);

    for (i = 0; i < Users_list.length; i++) {
        if (Users_list[i]._id == id) {
            user1 = Users_list[i];
            console.log(Users_list[i]);
            console.log(user1);
            $("#name1").val(user1.first_name);
            $("#name2").val(user1.last_name);
            $("#mobile").val(user1.mobile_no);
            $("#loc").val(user1.location);
            $("#emaill").val(user1.email_id);

        }
    }

}
//delete user details
function deleteUser(row) {
    console.log(row);
    $.ajax({
        url: BASE_PATH + '/user/delete',
        data: {
            _id: row
        },
        type: 'POST',
        success: function () {
            successMsg('deleted successfully');
            loadUsersList();
        },
        error: function () {
            // console.log(e);
            errorMsg("deletion failed");
            // window.location.reload();
        }
    });
}
// $("#totaluser").append(`<p>`+ usercount.length+`</p>`);
$("#total").append(`<span>` + count.length + `</span>`);
