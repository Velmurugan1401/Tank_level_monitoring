var UserTable = null;
var Users_list = [];
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

    var firstname = $("#firstname").val();
    var lastName = $("#lastname").val();
    var primaryPhone = $("#mobile").val();
    var email = $("#emailid").val();
    var roles = $("#role").val();




    //Validate
    if (firstname === "") {

    //     alert("First  Name is Required!");

    } else if (lastName === "") {

    //     alert("Last name is Required!");

    }
    else if (primaryPhone === "") {

    //     alert("Mobile number  is Required!");

    }
    else if (email === "") {

    //     alert("Email id is Required!");

    }

      else {

        //Build Input Objects
        var inputObj =
        {
            firstName: firstname,
            lastName: lastName,
            primaryPhone: primaryPhone,
            email: email,
            roles: [roles]

        };

    }
    console.log("inputObj", inputObj);

    //Call API
    if (flag == false) {
        $.ajax({
            url: BASE_PATH + "/user/userinsert",
            "dataType": 'json',
            "contentType": 'application/json',
            "type": "POST",

            data: JSON.stringify(inputObj),
            success: function (result) {
                console.log(result);
                // $("#name1,#name2,#mobile,#emaill,#loc").val('');
                // $("#myModal").css('display','none');
                // $(".modal-backdrop").remove();

                //Success -> Show Alert & Refresh the page
                successMsg("User Added Successfully!");
                // loadUsersList();
                window.location.reload();

            },
            error: function (e) {

                //Error -> Show Error Alert & Reset the form
                errorMsg(" User not created!");
                // window.location.reload();
                loadUsersList();

            }
        });

    } else if (flag == true) {
        var fname = $("#firstname").val();
        var lname = $("#lastname").val();
        var mno = $("#mobile").val();
        var eid = $("#emailid").val();
        var roles = $("#role").val();


        var updateData = {
            firstName: fname,
            lastName: lname,
            primaryPhone: mno,
            email: eid,
            roles: [roles]
        };
        console.log("id", key)
        console.log("update", updateData);
        $.ajax({

            url: BASE_PATH + "/user/userinsert",
            "dataType": 'json',
            "contentType": 'application/json',
            "type": "POST",
            data: JSON.stringify(updateData),
            success: function (result) {
                // //Success -> Show Alert & Refresh the page 
                // $("#name1,#name2,#mobile,#emaill,#loc").val('');
                // $("#myModal").css('display', 'none');
                // $(".modal-backdrop").remove();

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

    var fields = [
        {
            mData: 'firstName',
            sTitle: 'Full Name',
            sWidth: '20%',
            orderable: false,
            mRender: function (data, type, row) {
                return row.firstName+" "+row.lastName;
            }
        },
        {
            mData: 'lastName',
            sTitle: 'Last Name',
            sWidth: '10%',
            orderable: false,
            mRender: function (data, type, row) {
                return data;
            }
        },

        {
            mData: 'primaryPhone',
            sWidth: '20%',
            sTitle: 'Mobile No',
            orderable: false,
            mRender: function (data, type, row) {
                return data;
            }
        },
        {
            mData: 'email',
            sWidth: '20%',
            sTitle: 'Email Id',
            orderable: false,
            mRender: function (data, type, row) {
                return data;
            }
        },
        {
            mData: 'roles',
            sWidth: '20%',
            sTitle: 'roles',
            orderable: false,
            mRender: function (data, type, row) {
                return data;
            }
        },

        {
            mData: 'created_ts',
            sTitle: 'Created Time',
            sWidth: '20%',
            "className": 'sortingtable',
            mRender: function (data, type, row) {
                return moment(data).format(DATE_TIME_FORMAT);
            }
        },
        {
            sTitle: 'Actions',
            orderable: false,
            mRender: function (data, type, row) {
                var actionsHtml = '<button class="btn btn-default"  onclick="deleteUser(\'' + row.email+ '\')"><i class="fa fa-trash"></i></button>' + '<button class="btn btn-default"  data-toggle="modal" data-target="#myModal" onclick="editUser(\'' + row._id + '\')"><i class="fa fa-pencil edit"></i>';
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
        responsive:true,
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


            queryParams.query['bool']['must'] = [ {
                "match": {
                    "domainKey": "CDZMKBHJUM"
                }
            }];
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
                queryParams.query['bool']['should'].push({ "wildcard": { "firstname": "*" + searchText + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "firstname": "*" + searchText.toLowerCase() + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "firstname": "*" + searchText.toUpperCase() + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "firstname": "*" + capitalizeFLetter(searchText) + "*" } })
                queryParams.query['bool']["minimum_should_match"] = 1;
                queryParams.query['bool']['should'].push({
                    "match_phrase": {
                        "firstname.keyword": "*" + searchText + "*"
                    }
                })
                queryParams.query['bool']['should'].push({
                    "match_phrase_prefix": {
                        "firstname.keyword": {
                            "query": "*" + searchText + "*"
                        }
                    }
                });

                queryParams.query['bool']['should'].push({ "wildcard": { "roles": "*" + searchText + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "roles": "*" + searchText.toLowerCase() + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "roles": "*" + searchText.toUpperCase() + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "roles": "*" + capitalizeFLetter(searchText) + "*" } })
                queryParams.query['bool']["minimum_should_match"] = 1;
                queryParams.query['bool']['should'].push({
                    "match_phrase": {
                        "roles.keyword": "*" + searchText + "*"
                    }
                })
                queryParams.query['bool']['should'].push({
                    "match_phrase_prefix": {
                        "roles.keyword": {
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
                    "data": queryParams
                }),
                success: function (data) {

                    var resultData = data.result.data;
                    console.log(resultData);

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
            $("#firstname").val(user1.firstName);
            $("#lastname").val(user1.lastName);
            $("#mobile").val(user1.primaryPhone);
            $("#role").val(user1.roles);
            $("#emailid").val(user1.email);

        }
    }

}

// var user1;
// function editUser(row) {
// console.log(row);
    
// }
//delete user details
function deleteUser(row) {
    
    $.ajax({
        url: BASE_PATH + '/user/delete',
        data: {email:row},
        type: 'POST',
        success: function () {
            successMsg('deleted successfully');
            loadUsersList();
        },
        error: function () {
            // console.log(e);
            errorMsg("deletion failed");
            // window.locale.reload();
        }
    });
}
 
