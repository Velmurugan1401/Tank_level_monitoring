$(document).ready(function() {
  $(function() {
    var start = moment().subtract(6, 'days').startOf('day');
    var end = moment().endOf('day');
  
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
  
  
  $('#reportrange').on('apply.daterangepicker', function(ev, picker) {
   var start = picker.startDate;
   var end = picker.endDate;
  
  
  $.fn.dataTable.ext.search.push(
    function(settings, data, dataIndex) {
      var min = start;
      var max = end;
      var startDate = new Date(data[1]);
      
      if (min == null && max == null) {
        return true;
      }
      if (min == null && startDate <= max) {
        return true;
      }
      if (max == null && startDate >= min) {
        return true;
      }
      if (startDate <= max && startDate >= min) {
        return true;
      }
      return false;
    }
  );
  table.draw();
  $.fn.dataTable.ext.search.pop();
  });
  
  
  
  
  var dataSet =[
      [ "Tank 1", "USA", "21635", "325","ID 1", "device name 1","24/12/2020" ],
      [ "Tank 2", "Africa", "21635", "325","ID 2", "device name 2","24/12/2020"]
  
  ];
  $(document).ready(function() {
  $('#myTable').DataTable( {
  data: dataSet,
  columns: [
    { title: "Tank Name" },
    { title: "Tank Location" },
    { title: "Tank Capacity" },
    { title: "Tank Level" },
    { title: "Device Id" },
    { title: "Device Name" },
    { title: "Last Reported Time" }
   
  ]
  } );
  });
  
  });