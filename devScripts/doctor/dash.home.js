$(document).ready(function(){
    
    $(function () {
  $('[data-toggle="tooltip"]').tooltip()
});
       $(function () {
  $('[data-toggle="popover"]').popover()
});

    
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
         
        
        
        
 
var TimelineModel = {
 
    patient:[{
        id:0,
        name:"joseph",
        time:"14:00",
        ailment:"back ache"        
    },
             {
        id:0,
        name:"Danny",
        time:"15:00",
        ailment:"asthama"        
    },
    
    ] 
   
  
    
} 

var controller = {
    
    
    init:function(){
        Timelineview.init();

    },

    getPatientArrayCount: function(){
        
        var PatientArray  = this.getPatient;
        var count = PatientArray.length();
        return count;
    },
    
    
    getPatient:{
        return TimelineModel.patient;
    }
    
}
        
var Timelineview = {
    init:function(){
        var time_line_container = $(".timeline_item");
        var timeline_time = $(".timeline-time");
        var timeline_child_items = $(".timeline_child_item");
        var timeline_child_item_description = $(".timeline_lg_description");
        var timeline_item_name = $('#timeline_item_name');
        var timeline_btn_patientHistory = $('#timeline_btn_patient_history');
        var timeline_btn_reschedule = $('#timeline_btn_re_schedule');
        var timline_btn_cancel = $('#timeline_btn_cancel');
        var timeline_book_new_panel = $('#timeline_book_new_panel');
        var timline_cancel_panel = $('#timeline_cancel_panel');
        
      
        this.render();
    },
    
    render:function(){

    }
    
}




    }());

});
