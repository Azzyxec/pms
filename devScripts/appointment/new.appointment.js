$(document).ready(function(){

    $(function(){
        console.log('new appointment js loaded');
         $("#book-appointment-before-submit-warning-error").hide();
        $("#book-appointment-before-submit-success").hide();
        $("#book-appointment-before-submit-other-error").hide();
       
    }());

    $("#book-Appointment-Form-submit-button").on("click", function(){
        console.log("form submited");
        $('#book-Appointment-Form').submit();
    });
$('#book-Appointment-Form').validator().on('submit', function (e) {
  if (e.isDefaultPrevented()) {
   $("#book-appointment-before-submit-warning-error").show();
  } else {
    
     function getBookAppointmentFormDetails(){
                var name = $("#book-appointment-patientsName-form-input").val();
                var date = $("#book-appointment-date-form-input").val();
                var time =  $("#book-appointment-patientsTime-form-input").val();
                var contact = $("#book-appointment-contact-form-input").val();
                var description = $("#book-appointment-description-form-input").val();
             var bookAppointmentFormData = {patientsName:name,bookAppointmentDate:date,bookAppointmentTime:time,contact:contact,description:description};
         return bookAppointmentFormData;
        };
    $("#book-appointment-section-form-submit-btn").click(function(){
     
        console.log("yay book appointment submition started");
      
        
      
            var bookAppointmentFormJsonData = JSON.stringify(getBookAppointmentFormDetails());
           
           
        
            $.ajax({
                url:"index.php/saveBookPatientEntry",
                type:"post",
                dataType:"json",
                data:{data:bookAppointmentFormJsonData},
                cache:false,
                success:function(response){
                    console.log(response);
                    
                    
                },
                
                
            });
        
    });
  }
})


    

});
