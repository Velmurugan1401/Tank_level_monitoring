var DeviceTable = null;
var device_list = [];
// var startDate = moment().subtract(6, 'days').startOf('day');
// var endDate = moment().endOf('day');

$(document).ready(function(){
    loadDeviceList();
})


function loadDeviceList() {

    if (DeviceTable) {
        DeviceTable.destroy();
        $("#device_details").html("");
    }

    var fields = [
        {
            mData: 'device_id',
            sTitle: 'Device Name',
            sWidth: '20%',
            orderable: false,
            mRender: function (data, type, row) {
                return data;
            }
        },
        {
            mData: 'device_model',
            sTitle: 'Device Model',
            sWidth: '20%',
            orderable: false,
            mRender: function (data, type, row) {
                return data;
            }
        },

        {
            mData: 'device_version',
            sWidth: '20%',
            sTitle: 'Device Version',
            orderable: false,
            mRender: function (data, type, row) {
                return data;
            }
        },
        {
            mData: 'power_status',
            sWidth: '20%',
            sTitle: 'Power Status',
            orderable: false,
            mRender: function (data, type, row) {
                return data;
            }
        },
        {
            mData: 'tank_level',
            sWidth: '20%',
            sTitle: 'Tank Level',
            orderable: false,
            mRender: function (data, type, row) {
                return data;
            }
        },
        {
            mData: 'unit',
            sWidth: '20%',
            sTitle: 'Unit',
            orderable: false,
            mRender: function (data, type, row) {
                return data;
            }
        },
       
       
    ];

    var queryParams = {
        query: {
            "bool": {
                "must": []
            }
        },
        sort: [{ "created_ts": { "order": "asc" } }]
    };

    device_list = [];

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
        "sAjaxSource": BASE_PATH+'/device/list',
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
            }

            oSettings.jqXHR = $.ajax({
                "dataType": 'json',
                "contentType": 'application/json',
                "type": "GET",
                "url": sSource,
                "data": JSON.stringify({"query":queryParams}),
                success: function (data) {

                    console.log(data);

                    var resultData = data.result.data;

                    device_list = resultData.data;

                    $(".totalCount").html(data.result.total)

                    resultData['draw'] = oSettings.iDraw;
                    fnCallback(resultData);
                }
            });
        },
        "initComplete": function (settings, json) {
        }
    };

    DeviceTable = $("#device_details").DataTable(tableOption);
}

// $(document).ready(function() {
//     $('#manage-device').DataTable( {
//         data: fields,
//         columns: [
//             { title: "Device Id" },
//             { title: "Device Model" },
//             { title: "Version" },
//             { title: "Channel" },
//             { title: "Status" },
//             { title: "Last Reported Time" },
//             { title: "Created Time" },
//             { title: "Action" },
            
//         ]
//     } );
// } );
