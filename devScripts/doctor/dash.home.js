$(document).ready(function(){
    
     $(".responsive-calendar").responsiveCalendar({
          time: '2013-05',
          events: {
           
            "2013-05-03":{}, 
            "2013-06-12": {}}
        });

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
         
        
        
        
 
var DashScheduleModel = {
    
    
    
} 

var controller = {
    
    
}
        
var view = {
    
}




    }());

});
