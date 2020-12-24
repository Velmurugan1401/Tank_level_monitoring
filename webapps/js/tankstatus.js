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
} );