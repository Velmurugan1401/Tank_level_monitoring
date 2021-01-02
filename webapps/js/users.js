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
$('#expand').click(function(){
    var elem = document.documentElement;
    if($(this).hasClass('fa fa-expand')){
       
        $(this).removeClass('fa fa-expand');
        
        $(this).addClass('fa fa-window-close');
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
          } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
          } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
          }
        // $('#password').attr('type','text');
          
      }else{
       
        $(this).removeClass('fa fa-window-close');
        
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

function refreshuser()
{
    loadUsersList();
}


//User insert API

function loadUser() {

    var firstname = $("#firstname").val();
    var lastName = $("#lastname").val();
    var primaryPhone = $("#mobile").val();
    var email = $("#emailid").val();
    var role = $("#role").val();




    //Validate
    if (firstname === "") {

        showToast("info", "info","First Name is Required");


    //     alert("First  Name is Required!");

    } else if (lastName === "") {
        showToast("info", "info","Last Name is Required");

    //     alert("Last name is Required!");

    }
    else if (primaryPhone === "") {

        showToast("info", "info","Mobile Number is Required");
    //     alert("Mobile number  is Required!");

    }
    else if (email === "") {
        showToast("info", "info","Email id is Required");
    //     alert("Email id is Required!");

    }

      else {

        //Build Input Objects
        var inputObj =
        {
            firstname: firstname,
            lastName: lastName,
            primaryPhone: primaryPhone,
            email: email,
            locale: locale

        };

    }
    console.log("inputObj", inputObj);

    //Call API
    if (flag == false) {
        $.ajax({
            url: BASE_PATH + "/user/upsert",
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
                window.locale.reload();
            }
        });

    } else if (flag == true) {
        var fname = $("#name1").val();
        var lname = $("#name2").val();
        var mno = $("#mobile").val();
        var eid = $("#emaill").val();
        var locale = $("#loc").val();


        var updateData = {
            firstname: fname,
            lastName: lname,
            primaryPhone: mno,
            email: eid,
            locale: locale
        };
        console.log("id", key)
        console.log("update", updateData);
        $.ajax({

            url: BASE_PATH + "/user/upsert",
            data: JSON.stringify({updateData}),
            contentType: "application/json",
            type: 'POST',
            success: function (result) {
                // //Success -> Show Alert & Refresh the page 
                $("#name1,#name2,#mobile,#emaill,#loc").val('');
                $("#myModal").css('display', 'none');
                $(".modal-backdrop").remove();

                successMsg("Update Completed Successfully!");

                // loadUsersList();
                window.locale.reload();
            },
            error: function (e) {

                //Error -> Show Error Alert & Reset the form
                errorMsg("Update Failed!");
                window.locale.reload();
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
            sTitle: 'First Name',
            sWidth: '20%',
            orderable: false,
            mRender: function (data, type, row) {
                return data;
            }
        },
        {
            mData: 'lastName',
            sTitle: 'Last Name',
            sWidth: '20%',
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
            mData: 'address',
            sWidth: '20%',
            sTitle: 'locale',
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
        "sAjaxSource": BASE_PATH + '/usersearch/list',
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

                queryParams.query['bool']['should'].push({ "wildcard": { "locale": "*" + searchText + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "locale": "*" + searchText.toLowerCase() + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "locale": "*" + searchText.toUpperCase() + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "locale": "*" + capitalizeFLetter(searchText) + "*" } })
                queryParams.query['bool']["minimum_should_match"] = 1;
                queryParams.query['bool']['should'].push({
                    "match_phrase": {
                        "locale.keyword": "*" + searchText + "*"
                    }
                })
                queryParams.query['bool']['should'].push({
                    "match_phrase_prefix": {
                        "locale.keyword": {
                            "query": "*" + searchText + "*"
                        }
                    }
                });
            }
               
            oSettings.jqXHR = $.ajax({
                "dataType": 'json',
                "contentType": 'application/json',
                "type": "GET",
                "url": sSource,

                "data": JSON.stringify({
                    "query": queryParams
                }),
                success: function (data) {

                    var resultData = data.result;
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
            $("#name1").val(user1.firstname);
            $("#name2").val(user1.lastName);
            $("#mobile").val(user1.primaryPhone);
            $("#loc").val(user1.locale);
            $("#emaill").val(user1.email);

        }
    }

}
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
 
