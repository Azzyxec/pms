$(document).ready(function(){

  $(function(){
    console.log('doctor dash js');

    var model = {
      appointmentList:[],
      appointmentDate: moment().format('DD-MM-YYYY'),
      DefaultlocationId: 0,
      appointmenListViewModel:{
        patientList:[],
        locationList:[],
        totalAppointmenCount:0,
        completedAppointmentCount:0,
        cancelledAppointmentCount:0,
        rescheduledAppointmentCount:0
      }
    }


    function controller(){
      //initlize any url
      this.getLocationUrl =  links.getLocationUrl;
      this.getAppointmentForTheDayUrl = links.getAppointmentForTheDayUrl;
      this.getPatientsForAutoFillUrl = links.getPatientsForAutoFillUrl;
    };

    controller.prototype.getPatientList = function () {
      return model.appointmenListViewModel.patientList;
    };

    controller.prototype.getAppointmentList = function () {
      return model.appointmentList;
    };

    controller.prototype.getLocationList = function () {
      return model.appointmenListViewModel.locationList;
    };

    controller.prototype.getAppointmentListInfo = function () {
      return model.appointmenListViewModel;
    };

    controller.prototype.setSelectedLocationId = function (locId) {
      model.DefaultlocationId = locId;
    };

    controller.prototype.getSelectedLocId = function () {
      return model.DefaultlocationId;
    };

    controller.prototype.getSelectedeDate = function () {
      return model.appointmentDate;
    };

    controller.prototype.setSelectedDate = function (pdate) {
      model.appointmentDate = pdate;
    };

    controller.prototype.init = function () {
      todayAppointmentListView.init();
      this.getLocations();
      this.getPatients();
      this.getappointmentListForDate(model.appointmentDate, model.DefaultlocationId);
    };

    controller.prototype.getPatients = function () {
      $.get( this.getPatientsForAutoFillUrl , {})
      .done(function( response ) {
        console.log("patients: " + JSON.stringify(response));
        if(response.status == 1){
          model.appointmenListViewModel.patientList = response.data;
        }
      });
    };

    controller.prototype.getLocations = function () {
      $.get( this.getLocationUrl , {})
      .done(function( response ) {
        console.log("locations: " + JSON.stringify(response));
        model.appointmenListViewModel.locationList = response.data;
        todayAppointmentListView.render();

      });
    };

    controller.prototype.getappointmentListForDate = function (pdate, locId) {

      $.get( this.getAppointmentForTheDayUrl , {date:   pdate, locId: locId})
      .done(function( response ) {
        console.log("today Appointment: " + JSON.stringify(response));
        model.appointmentList = response.data;
          todayAppointmentListView.render();
      });

    };

    var todayAppointmentListView = {
      init:function(){
        this.dateInput = $('#appointment-list-date1');
        this.locationSelect = $('#appointment-list-locations-sel');
        this.goButton = $('#appointment-list-go-btn');

        this.listHeadertText = $('#appointment-list-header');

        this.totalAppointmentCount = $('#total-appointment-count');
        this.cancelledAppointmentCount = $('#cancelled-appointment-count');
        this.completedAppointmentCount = $('#completed-appointment-count');
        this.rescheduledAppointmentCount = $('#rescheduled-appointment-count');

        //appointment list contianer
        this.appointmentListContainer = $('#appointment-list-container');



        //templates
        this.bookNewppointmentTemplate = $('#book-new-appointment-template');
        this.bookedAppointmentTemplate = $('#booked-appointment-template');
        this.cancelledAppointmentTemplate = $('#cancelled-appointment-template');
        this.closedAppointmentTemplate = $('#closed-appointment-template');

        this.newAppointmentModal = $('#book-appointment-modal');



        this.dateInput.datetimepicker({
          inline: true,
          format: 'DD-MM-YYYY'
        });


        this.goButton.click(function(){
          var date = todayAppointmentListView.dateInput.val();

          var selectedOption = todayAppointmentListView.locationSelect.find(":selected");

          var selectedValue = selectedOption.attr('value');
          var name = selectedOption.text();
          if(selectedValue){
              todayAppointmentListView.listHeadertText.text('Location ' + name);
              cont.setSelectedDate(date);
              cont.setSelectedLocationId(selectedValue);
              cont.getappointmentListForDate(date, selectedValue);
          }

        });

      },
      render: function(){
        console.log('rendering appointment list');

        this.dateInput.val(cont.getSelectedeDate());

        todayAppointmentListView.listHeadertText.text('Location');

        //appointment statictics

        var stats = cont.getAppointmentListInfo();

        this.totalAppointmentCount.text(stats.totalAppointmenCount);
        this.cancelledAppointmentCount.text(stats.cancelledAppointmentCount);
        this.completedAppointmentCount.text(stats.completedAppointmentCount);
        this.rescheduledAppointmentCount.text(stats.rescheduledAppointmentCount);


        this.locationSelect.empty();

          this.locationSelect.append($('<option/>', {
            value: 0,
            text: ' All '
          }));

        var locationList = cont.getLocationList();

        for(var i = 0; i< locationList.length; i++ ){
          var option = $('<option/>', {
            value: locationList[i].id,
            text: locationList[i].name
          });
            this.locationSelect.append(option);
        }

          this.locationSelect.val(cont.getSelectedLocId());

        //render appointment locationList
        this.appointmentListContainer.empty();
        var appointmentList = cont.getAppointmentList();

        if(appointmentList){

          this.totalAppointmentCount.text(appointmentList.length);

          for(var i = 0; i < appointmentList.length; i++){

            var item = appointmentList[i];
            var mStartTime = moment({hours: item.startMins/60 , minutes: item.startMins%60});
            var mEndTime = moment({hours: item.endMins/60 , minutes: item.endMins%60});

            if(item.type == 'f'){
              console.log('add free time');
              var template = this.bookNewppointmentTemplate.clone();

              template.find('.time').text(mStartTime.format("hh:mm"));
              template.find('.aa').text(mStartTime.format(" A"));

              template.find('.time-period').text('from ' + mStartTime.format("hh:mm A") + ' to ' + mEndTime.format("hh:mm A"));

                template.find('.new-appintment-div').click((function(startTime){
                  return function(){
                  console.log('new appoinment click');
                    var initValues = {
                      locationList: cont.getLocationList(),
                      locationId: cont.getSelectedLocId(),
                      appointmetDate: cont.getSelectedeDate(),
                      appointmentTime: startTime,
                      patientList: cont.getPatientList()

                    }

                    var appController = makeAppointmentController();
                    appController.init(initValues);
                    appController.setCompleteEventHandler(function(data){
                      console.log('got this' + JSON.stringify(data));
                      if(data.status == 1){
                        console.log('appointmetn added success fully');
                        todayAppointmentListView.newAppointmentModal.modal('hide');
                        //update the location list with new values
                        cont.getappointmentListForDate(cont.getSelectedeDate(),  cont.getSelectedLocId());
                      }else if(data.status == 2){
                        console.log('schedule not added or timimgs dont match');

                      }else if(data.status == 3){
                        console.log('timimng clash with existign appointment');
                      }

                    });
                    todayAppointmentListView.newAppointmentModal.modal();
                  }
                })(mStartTime.format("hh:mm A")));


            }else if(item.type == 'a'){

              if(item.state == 0){
                var template = this.bookedAppointmentTemplate.clone();

                var popoverSettings = {
                  placement:'left',
                  container: 'body',
                  trigger: 'focus',
                  html: true,
                  content:this.getAppointmentPopoverContent(item.contact, item.description)
                };

                template.find('.booked-appointment-popover').popover(popoverSettings);

              }else if(item.state == 1){
                //closed
                var template = this.closedAppointmentTemplate.clone();

              }else  if(item.state == 2){
                var template = this.cancelledAppointmentTemplate.clone();
                //cancelled
              }


              template.find('.time').text(mStartTime.format("hh:mm"));
              template.find('.aa').text(mStartTime.format(" A"));

              template.find('.patient-name').text(item.name);

            }

            this.appointmentListContainer.append(template);

          }

        }

      },
      getAppointmentPopoverContent: function(contact, description){

        var content = '<dl class="dl-horizontal"><dt>Contact&nbsp;:&nbsp;</dt><dd>' +
                        contact +
                      '</dd></dl><dl class="dl-horizontal"><dt>Ailment&nbsp;:&nbsp;</dt><dd>' +
                      description +
                      '</dd></dl>';

        return content;
      }
    }

    var cont = new controller();
    cont.init();

  }());



  $(function () {
    $('[data-tooltip="tooltip"]').tooltip({'placement':'top'});


  });
  $(function () {
    $('[data-toggle="popover"]').popover({'trigger':'focus','placement':'left'})

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
