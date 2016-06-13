$(document).ready(function(){
    
    
    
    
     //initilizing the source typeahead
        $('#quickbook-patient-search').typeahead({
     
        source: ['akhil','joseph','Agnelo','Ruban','Ronald','Sonia']
        });
    
   $(function () {
       
        $('#fileupload').fileupload({
      
        dataType: 'json',
        done: function (e, data) {
            $.each(data.result.files, function (index, file) {
                $('<p/>').text(file.name).appendTo('#files');
            });
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#fileupload-progress-bar').css(
                'width',
                progress + '%'
            );
        }
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
       
   });
       
  
    
    
    
    var engine = new Bloodhound({
  local: [{value: 'red'}, {value: 'blue'}, {value: 'green'} , {value: 'yellow'}, {value: 'violet'}, {value: 'brown'}, {value: 'purple'}, {value: 'black'}, {value: 'white'}],
  datumTokenizer: function(d) {
    return Bloodhound.tokenizers.whitespace(d.value);
  },
  queryTokenizer: Bloodhound.tokenizers.whitespace
});

engine.initialize();
    
    
    $('#tokenfield').tokenfield({
 typeahead: [null, { source: engine.ttAdapter() }]
});
    
    
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
 
  
    activePatients : [{
        id:0,
        name:"joseph",
        time:"14:00",
        ailment:"back ache"
        
    },
                      {
        id:0,
        name:"Fernandes",
        time:"15:00",
        ailment:"Sore throat"
        
    }
    
    ],
    closedPatients :[{
          id:0,
        name:"Clive",
        time:"13:00",
        ailment:"back ache",
        remarks:''
    },
                     {
          id:0,
        name:"Brad",
        time:"14:00",
        ailment:"back ache",
        remarks:''
    }
        
        
    ],
    
    
    canceledPatients :[{
          id:0,
        name:"Rogue",
        time:"13:00",
        ailment:"back ache",
        remarks:''
    },
    
    {
          id:0,
        name:"Warren",
        time:"13:00",
        ailment:"back ache",
        remarks:''
    }
    ],
    
    bookAppointments :[{time:'15:00'},{time:'14:00'}
    ],
       
    timeLineArray : [{
        type:'ActivePatients',
        id:0,
        name:"Rogue",
        time:"13:00",
        ailment:"back ache",
        remarks:''
    }, 
                     { type:'closedPatients',
        id:0,
        name:"Brad",
        time:"14:00",
        ailment:"back ache",
        remarks:''
    }
        
    ],
    
    location:"Panjim"
    
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
    
    getTimelineLoction : function(){
        return TimelineModel.location;
    },
    getActivePatient: function(){
        return TimelineModel.activePatients;
    },
     getCancelledPatient: function(){
        return TimelineModel.canceledPatients;
    },
     getClosedPatient: function(){
        return TimelineModel.closedPatients;
    },
    getbookAppointments: function(){
        return TimelineModel.bookAppointments;
    },
    
    createTimelineObjArray:function(){
        var TimelineObjArray = [];
        TimelineObjArray.push(controller.getActivePatient());
        TimelineObjArray.push(controller.getCancelledPatient());
        TimelineObjArray.push(controller.getClosedPatient());
        TimelineObjArray.push(controller.getbookAppointments());
        return TimelineObjArray;
    },
    
    getTimeArrayObj : function(){
    return TimelineModal.timeLineArray();
}
    
    
}
        
var Timelineview = {
    init:function(){
        this.time_line_container = $(".timeline_item");
        this.timeline_time = $(".timeline-time");
        this.timeline_child_items = $(".timeline_child_item");
        this.timeline_child_item_description = $(".timeline_lg_description");
        this.timeline_item_name = $('#timeline_item_name');
        this.timeline_btn_patientHistory = $('#timeline_btn_patient_history');
        this.timeline_btn_reschedule = $('#timeline_btn_re_schedule');
        this.timline_btn_cancel = $('#timeline_btn_cancel');
        this.timeline_book_new_panel = $('#timeline_book_new_panel');
        this.timline_cancel_panel = $('#timeline_cancel_panel');
        this.time_line_h3 = $(".timeline-h3");
        
      
        this.render();
    },
    
    render:function(){
        
    this.time_line_h3.text(controller.getTimelineLoction() +' Today');
       
       
        
    }
    
}


controller.init();

    }());

});
