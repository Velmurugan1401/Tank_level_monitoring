$("#test").click(function(e){
    e.preventDefault();

    var Tanklevel = $("#one").val();
    var department = $("#two").val();
    var location = $("#three").val();

    //Validate
    if(Tanklevel === ""){

        alert("Student Name is Required!");

    }else if(department === ""){

        alert("Department is Required!");

    }else if(location === ""){

        alert("Location is Required!");

    }else{

        //Build Input Objects
        var inputObj = {
            tank_level : Tanklevel,
            location : location,
            department : department,
            created_ts : new Date().getTime()
        };

        //Call API
        $.ajax({
            url: BASE_PATH+"/tank/insert",
            data: JSON.stringify(inputObj),
            contentType: "application/json",
            type: 'POST',
            success: function (result) {

                //Success -> Show Alert & Refresh the page
                successMsg("Registration Completed Successfully!");
                loadStudentList();
            },
            error: function (e) {

                //Error -> Show Error Alert & Reset the form
                errorMsg("Registration Failed!");
                window.location.reload();
            }
        });
    }
});
