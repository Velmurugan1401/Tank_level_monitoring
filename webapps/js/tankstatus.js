var TankStatusTable = null;
var TankStatus_list = [];
// var startDate = moment().subtract(6, 'days').startOf('day');
// var endDate = moment().endOf('day');

// $('.dropdown-menu a').on('click', function(){  
//    $('.dropdown-toggle').html($(this).html());    
// })

$(document).ready(function(){
    loadTankStatusList();
    
});

//Student Registration API
// function studentRegistration(){

//     var sname = $("#sname").val();
//     var department = $("#department").val();
//     var location = $("#location").val();

//     //Validate
//     if(sname === ""){

//         alert("Student Name is Required!");

//     }else if(department === ""){

//         alert("Department is Required!");

//     }else if(location === ""){

//         alert("Location is Required!");

//     }else{

//         //Build Input Objects
//         var inputObj = {
//             sname : sname,
//             location : location,
//             department : department,
//             created_ts : new Date().getTime()
//         };

//         //Call API
//         $.ajax({
//             url: BASE_PATH+"/student/insert",
//             data: JSON.stringify(inputObj),
//             contentType: "application/json",
//             type: 'POST',
//             success: function (result) {

//                 //Success -> Show Alert & Refresh the page
//                 successMsg("Registration Completed Successfully!");
//                 loadTankDeviceList();
//             },
//             error: function (e) {

//                 //Error -> Show Error Alert & Reset the form
//                 errorMsg("Registration Failed!");
//                 window.location.reload();
//             }
//         });
//     }
// }

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
            sTitle: 'Tank Capacity',
            orderable: false,
            mRender: function (data, type, row) {
                return data;
            }
        },
        {
          mData: 'tank_level ',
          sWidth: '20%',
          sTitle: 'Tank Level',
          orderable: false,
          mRender: function (data, type, row) {
              return data;
          }
      },
      {
        mData: 'device_id',
        sWidth: '20%',
        sTitle: ' Device Id ',
        orderable: false,
        mRender: function (data, type, row) {
            return data;
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
                var actionsHtml = '<div class="dropdown"><button type="button" class="btn btn-primary dropdown-toggle"  style="background-color:rgba(28,63,170);border:unset;" data-toggle="dropdown">Actions</button>'
                +' <div class="dropdown-menu">'
                +'  <a class="dropdown-item" href="#">Link / Unlink Device</a>'
                +'  <a class="dropdown-item" href="#">Single Tank Snapshot</a>'
                +'  <a class="dropdown-item" href="#">Delete</a>'
                +' </div>'
                +'</div>';
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
        "sAjaxSource": BASE_PATH+'/tankstatus/list',
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
                "data": JSON.stringify({"query":queryParams}),
                success: function (data) {

                    var resultData = data.result.data;

                    TankStatus_list = resultData.data;

                    $(".totalCount").html(data.result.total)

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



    

    function profilelogout() {
      $("#profileCard").css('display','block');
    }
   
  //   function logout(){
  //     alert("logout");
  //    Cookies.remove('myweb_cookie')
  //    document.location=BASE_PATH+'/login';
  //  }