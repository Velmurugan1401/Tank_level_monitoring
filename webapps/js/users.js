var UserTable = null;
var Users_list = [];
var deleteuserid="";
var key;
var count;
var flag = false;

var usercount;
// var startDate = moment().subtract(6, 'days').startOf('day');
// var endDate = moment().endOf('day');
$(document).ready(function () {
    loadUsersList();     
});
 
function refreshuser()
{
    loadUsersList();
}


$('#expand').click(function(){
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
    }
});
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

//User insert API

function loadrecordUser() {
  
    $("#firstname,#lastname,#mobile,#emailid,#role").val('');

    var firstname = $("#firstname").val();
    var lastName = $("#lastname").val();
    var primaryPhone = $("#mobile").val();
    var email = $("#emailid").val();
    var password=$("#Password").val();
    var roles = $("#role").val();

    //  //Validate
    //  if (firstname === "") {
    //     $(".validate").css('display','block');
    //     return;


    // //     alert("First  Name is Required!");

    // } else if (lastName === "") {
    //     $(".validate").css('display','block');
    //     return;
    // //     alert("Last name is Required!");

    // }
    // else if (primaryPhone === "") {
    //     $(".validate").css('display','block');
    //     return;
    // //     alert("Mobile number  is Required!");

    // }
    // else if (email === "") {
    //     $(".validate").css('display','block');
    //     return;
    // //     alert("Email id is Required!");

    // }
    // else if(password==="")
    // {
    //     $(".validate").css('display','block');
    // return;
    // }

    //   else {
        //Build Input Objects
        var input =
        {
            fname : firstname,
            lname : lastName,
            mnumber : primaryPhone,
            email : email,
            password : password,
            roles: roles,
            created_ts: new Date().getTime()


        };
    // }

    console.log("insert", input);

    //Call API
    if (flag == false) {
        $.ajax({
            url: BASE_PATH + "/user/insert",
            "dataType": 'json',
            "contentType": 'application/json',
            "type": "POST",

            data: JSON.stringify(input),
            success: function (result) {
                console.log(result);

               
                // $("#myModal").css('display','none');
                // $(".modal-backdrop").remove();

                //Success -> Show Alert & Refresh the page
                successMsg("User Added Successfully!");
                loadUsersList();
                // window.location.reload();

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
            fname: fname,
            lname: lname,
            mnumber: mno,
            email: eid,
            roles: roles
        };
        console.log("id", key)
        console.log("update", updateData);
        $.ajax({

            url: BASE_PATH + "/user/update",
            "dataType": 'json',
            "contentType": 'application/json',
            "type": "POST",
            data: JSON.stringify({_id:key,updateData}),
            success: function (result) {
                // //Success -> Show Alert & Refresh the page 
             $("#firstname,#lastname,#mobile,#emailid,#role").val('');
                $("#myModal").css('display','none');
                $(".modal-backdrop").remove();

                successMsg("Update Completed Successfully!");

                loadUsersList();
                        //  window.location.reload();

            },
            error: function (e) {

                //Error -> Show Error Alert & Reset the form
                errorMsg("Update Failed!");
            //  window.location.reload();

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
            mData: 'fname',
            sTitle: 'Full Name',
            sWidth: '20%',
            // orderable: false,
            mRender: function (data, type, row) {
                console.log("row",row )

                // return data;
                return data;
            }
        },
        {
            mData: 'lname',
            sTitle: 'Last Name',
            sWidth: '10%',
            orderable: true,
            mRender: function (data, type, row) {
                return  data ? data :'-';
            }
        },

        {
            mData: 'mnumber',
            sWidth: '20%',
            sTitle: 'Mobile No',
            orderable: false,
            mRender: function (data, type, row) {
                return  data ? data :'-';
            }
        },
        {
            mData: 'email',
            sWidth: '20%',
            sTitle: 'Email Id',
            orderable: false,
            mRender: function (data, type, row) {
                return  data ? data :'-';
            }
        },
        {
            mData: 'roles',
            sWidth: '20%',
            sTitle: 'roles',
            orderable: false,
            mRender: function (data, type, row) {
                return  data ? data :'-';
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
              
                var actionsHtml = '<button class="btn btn-default"  data-target="#userDeletemodal" data-toggle="modal" onclick="assignuserrecordid(\'' + row._id + '\',\'' + row.email + '\')"><i class="fa fa-trash"></i></button>' + '<button class="btn btn-default"  data-toggle="modal" data-target="#myModal" onclick="editUser(\'' + row._id +'\')"><i class="fa fa-pencil edit"></i>';
                return actionsHtml;
            }
        }
    ];

    var queryParams = {
        query: {
            "bool": {
                "must": []
                 /*,
                "filter":{"range":{"created_ts":{
                            "gte":new Date(startDate.toISOString()).getTime(),
                            "lte":new Date(endDate.toISOString()).getTime()
                        }}}*/
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
            [5, 'desc'],
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
                queryParams.query['bool']['should'].push({ "wildcard": { "fname": "*" + searchText + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "fname": "*" + searchText.toLowerCase() + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "fname": "*" + searchText.toUpperCase() + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "fname": "*" + capitalizeFLetter(searchText) + "*" } })
                queryParams.query['bool']["minimum_should_match"] = 1;
                queryParams.query['bool']['should'].push({
                    "match_phrase": {
                        "fname.keyword": "*" + searchText + "*"
                    }
                })
                queryParams.query['bool']['should'].push({
                    "match_phrase_prefix": {
                        "fname.keyword": {
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
                    "query": queryParams
                }),
                success: function (data) {

                    var resultData = data.result.data;
                    console.log("user ist",resultData.data);

                     Users_list = resultData.data;
                    // usercount = resultData?.data
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
            // $("div.toolbar").append("<button>Datepick</button>");
            $("div.toolbar").html('<button type="button" class="btn button1" data-toggle="modal" data-target="#myModal"> <i class="fa fa-user-plus p-1" style="color:white";"aria-hidden="true"></i>Add New User</button>');
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
            console.log(Users_list);
            console.log(user1);
            $("#firstname").val(user1.fname);
            $("#lastname").val(user1.lname);
            $("#mobile").val(user1.mnumber);
            $("#role").val(user1.roles);
            $("#emailid").val(user1.email);

        }
    }

}
var email;

function assignuserrecordid(rowid,rowemail){  
    console.log("id",rowid);   
   recordid=rowid;
    console.log("email",rowemail);
    email=rowemail;
  
}

function userrecorddelete()  {
   console.log("userrecorddelete recordid ",recordid)
   console.log("userrecorddelete email ",email)
//    console.log(email)

//    var email=Users_list.email
    $.ajax({
        url: BASE_PATH +'/user/delete',
        data: JSON.stringify({_id:recordid,email:email}),
        contentType: "application/json",
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
