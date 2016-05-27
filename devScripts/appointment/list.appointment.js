$(document).ready(function(){

    $(function(){
        console.log('lsit appointment js loaded');




        $("#btn-new-appointment").click(function(e){
           e.preventDefault();
           window.location.href = links.newAppointmentUrl;
       });
    }());

});
