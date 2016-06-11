$(document).ready(function(){
    
     $(".responsive-calendar").responsiveCalendar({
          time: '2013-05'
     });  
    
    $(function () {
  $('[data-tooltip="tooltip"]').tooltip({'placement':'top'});
      
        
});
       $(function () {
  $('[data-toggle="popover"]').popover({'trigger':'focus','placement':'left'})
  
       });
     $(function () {
                $('#datetimepicker1').datetimepicker({
                 format: 'DD/MM/YYYY'
                    
                });
            $('#datetimepicker24').datetimepicker({
              format: 'DD/MM/YYYY'
                     
                });
           $('#datetimepicker23').datetimepicker({
              format: 'hh:mm a'
                     
                });
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
        ailment:"back ache",
        CancelappointentStatus: false,
        bookNewappointmentStatus: false
    },
             {
        id:0,
        name:"Danny",
        time:"15:00",
        ailment:"asthama",
        CancelappointentStatus: false,
        bookNewappointmentStatus: false
    },
             {
        id:0,
        name:"d",
        time:"d",
        ailment:"d",
        CancelappointentStatus: false,
        bookNewappointmentStatus: true
    },
       
    
    ],
    location:"margao"
    
} 

var controller = {
    
    
    init:function(){
        Timelineview.init();

    },

    getPatientArrayCount: function(){
        
        var PatientArray  = this.getPatient();
        var count = PatientArray.length;
        return count;
    },
    
    
    getPatient: function(){
        return TimelineModel.patient;
    },
    
    
    createTimeline:function(obj){
     var patientCount = this.getPatientArrayCount();
     
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
        
        
        var patientCount = controller.getPatientArrayCount();
        console.log(patientCount);
        var patientArray = controller.getPatient();
        for(i=0;i<patientCount;i++){
            console.log(patientArray[i].name);
        }
        
    }
    
}


controller.init();

    }());

});
