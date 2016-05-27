$(document).ready(function(){

    $(function(){
        console.log('Doctor Dashboard home js loaded');


        $("#view-patients-dashboard-section-btn").click(function(e){
           e.preventDefault();
           window.location.href = links.patientsListingUrl;
       });

       $("#view-sales-dash-btn").click(function(e){
          e.preventDefault();
          window.location.href = links.getAnalyticsUrl;
      });




    }());

});
