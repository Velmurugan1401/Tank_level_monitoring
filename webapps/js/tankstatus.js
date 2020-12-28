var TankStatusTable = null;
var TankStatus_list = [];
var startDate = moment().subtract(6, 'days').startOf('day');
var endDate = moment().endOf('day');
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
        
        // {
        //     sTitle: 'Actions',
        //     orderable: false,
        //     mRender: function (data, type, row) {
        //         var actionsHtml = '<button class="btn btn-default" onclick="deleteStudent()"><i class="fa fa-trash"></i></button>';
        //         return actionsHtml;
        //     }
        // }
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

$(function() {
    var start = moment().subtract(29, 'days');
    var end = moment();
    
    function cb(start, end) {
      $('#datePickerrr').html(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
    }

    $('#datePickerrr').daterangepicker({
      startDate: start,
      endDate: end,
      ranges: {
        'Clear': [], //clear doesn't work
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 days': [moment().subtract(6, 'days'), moment()],
        'Last 30 days': [moment().subtract(29, 'days'), moment()],
        'This month': [moment().startOf('month'), moment().endOf('month')],
        'Last month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      },
      locale: {
          //format: 'Y-m-d',
          //format: "DD-MM-YYYY",
          minDate: moment(),
          cancelLabel: 'Clear',
          applyLabel: 'Apply',
                        
          
      }
    }, cb);

    cb(start, end);

  });
 
  $('#datePickerrr').on('cancel.daterangepicker', function(ev, picker) {
    $('#datePickerrr').val('');
    table.draw();
    });

  $('#datePickerrr').on('apply.daterangepicker', function(ev, picker) {
   var start = picker.startDate;
   var end = picker.endDate;


  $.fn.dataTable.ext.search.push(
    function(settings, data, dataIndex) {
      var min = start;
      var max = end;
      //var startDate = new Date(data[10]).format('YYYYMMDD hhmm');

      var date1 = (data[10]).split('/') 
      var newDate = date1[1] + '/' +date1[0] +'/' +date1[2];  
      var startDate = new Date(newDate);
      //alert(startDate);

       
      if (min == null && max == null) { return true; }
      if (min == null && startDate <= max) { return true; }
      if (max == null && startDate >= min) { return true; }
      if (startDate <= max && startDate >= min) { return true; }
      return false;
    }
  );
  table.draw();
  $.fn.dataTable.ext.search.pop();
    });
