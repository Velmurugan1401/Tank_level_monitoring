
var fileds=[
    [ "DWF", "large", "12220", "ggg", "2011/04/25", "2020/09/08","delete" ],
    [ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750","kkk" ],
    [ "Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000","sss" ],
    [ "DWF", "large", "12220", "ggg", "2011/04/25", "2020/09/08","delete" ],
    [ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750","kkk" ],
    [ "Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000","sss" ],

    
];

    $(document).ready(function() {
        $('#example').DataTable( {
             
            data: fileds,
            columns: [
                { title: "Tank Name" },
                { title: "Tank Type" },
                { title: "Capacity" },
                { title: "Linked Devices" },
                { title: "Created Time" },
                { title: "Updated Time" },
                { title: "Action" }
            ],
            dom:'l<"toolbar">frtip',
            initComplete :  function() {
           $("div.toolbar").html('<button type="button" class="btn button1" data-toggle="modal" data-target="#exampleModal"> <i class="fa fa-plus-square" style="color:white";"aria-hidden="true"></i>Add Tanks</button>');
       },
      
       });
    });
    $('#example').on( 'click', 'tbody td:not(:first-child)', function (e) {
        editor.inline( this );
         } );
    
       

   

