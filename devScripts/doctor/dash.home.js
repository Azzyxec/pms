$(document).ready(function(){

  $(function(){
    console.log('doctor dash js');

    var model = {
      appointmentList:[],
      appointmentDate: moment().format('DD-MM-YYYY'),
      DefaultlocationId: 0,
      userInfo:{},
      appointmenListViewModel:{
        patientList:[],
        locationList:[]
      }
    }

    function controller(){
      //initlize any url
      this.getLocationUrl =  links.getLocationUrl;
      this.getAppointmentForTheDayUrl = links.getAppointmentForTheDayUrl;
      this.getPatientsForAutoFillUrl = links.getPatientsForAutoFillUrl;
      this.getPatientsHistoryUrl = links.patientsHistoryUrl;
      this.getUserInfoUrl = links.loginCheckUrl;
      this.patientsLoaded = false;
      this.locationsLoaded = false;
      this.appointmentsLoaded = false;
    };

    controller.prototype.getPatientList = function () {
      return model.appointmenListViewModel.patientList;
    };

    controller.prototype.getAppointmentList = function () {
      return model.appointmentList;
    };


    controller.prototype.getUserInfoModel = function () {
      return model.userInfo;
    };

    controller.prototype.GetAppointmentForLocation = function (locId) {
      return _.filter(model.appointmentList, function(item){

      if(locId == 0){
        return true;
      }else if( +item.locId == locId ){
        return true;
      }

    });
  };

  controller.prototype.combineFreeSlots = function (list) {
    //updating the time of the freetime slot
    // and putting the extra freetime slots in remove item list
    var returnList = [];
    var preItem = {};
    var add = true;
    for(var i = 0; i < list.length; i++){
      var appointment = list[i];

      if(appointment.type == "f" && preItem.type == "f" &&
         +appointment.scheduleId == +preItem.scheduleId){
        appointment.startMins = preItem.startMins;
        add = false;
      }else{
        add = true;
      }

      if(add){
        returnList.push(appointment);
      }

      preItem = appointment;
    }

   return returnList;

  };

  controller.prototype.getSortedAppointmentList = function (locationId) {

    console.log('sorting with location Id' + locationId);

    //if locatoin id is 0 then all appointments are returneed and sorted

    var lappointmentList =  _.filter(model.appointmentList, function(item){
        if(locationId == 0 || +item.locId == locationId){
          return true;
        }
      });

      return _.orderBy(lappointmentList, ['state'], ['asc']);

  };


  controller.prototype.getCancelledList = function () {

    return _.filter(model.appointmentList, function(item){
      if((+item.state == 2 && item.type === 'a')
        && (+cont.getSelectedLocId()  == 0 || +item.locId == cont.getSelectedLocId() ) ){
        return true;
      }
    });
  };

  controller.prototype.getFreeTimeSlotsList = function () {

    console.log('free appontment list ' + cont.getSelectedLocId());

    var freeSlots =  _.filter(model.appointmentList, function(item){

      if((+item.state == 0 && item.type === 'f')
            && (+cont.getSelectedLocId()  == 0 || +item.locId == cont.getSelectedLocId() ) ){
        return true;
      }
    });

    if(freeSlots.length > 0){
      return this.combineFreeSlots(freeSlots);
    }else {
      return freeSlots;
    }


  };

  controller.prototype.getActiveAppointmentsList = function () {

    console.log('loc id' + cont.getSelectedLocId());

    return _.filter(model.appointmentList, function(item){
      if( (+item.state == 0 && item.type === 'a')
          && (+cont.getSelectedLocId()  == 0 || +item.locId == cont.getSelectedLocId() ) ){
        return true;
      }
    });
  };

  controller.prototype.getClosedAppointmentsList = function () {

    return _.filter(model.appointmentList, function(item){
      if( (+item.state == 1 && item.type === 'a')
           && (+cont.getSelectedLocId()  == 0 || +item.locId == cont.getSelectedLocId() ) ){
        return true;
      }
    });
  };

  controller.prototype.getLocationList = function () {
    return model.appointmenListViewModel.locationList;
  };

  controller.prototype.getAppointmentListInfo = function () {

    var stats = _.countBy(model.appointmentList, function(item){
      if((+item.state == 0 && item.type === 'a')
          && (+cont.getSelectedLocId()  == 0 || +item.locId == cont.getSelectedLocId() ) ){
        return "active";
      }else if((+item.state == 1 && item.type === 'a')
          && (+cont.getSelectedLocId()  == 0 || +item.locId == cont.getSelectedLocId() ) ){
        return "completed";
      }else if((+item.state == 2 && item.type === 'a')
          && (+cont.getSelectedLocId()  == 0 || +item.locId == cont.getSelectedLocId() ) ){
        return "cancelled";
      }
    });

    /*
    var completedCount = _.countBy(model.appointmentList, function(item){
      if((+item.state == 1 && item.type === 'a')
          && (+cont.getSelectedLocId()  == 0 || +item.locId == cont.getSelectedLocId() ) ){
        return "count";
      }
    }).count;

    var cancelledCount = _.countBy(model.appointmentList, function(item){
      if((+item.state == 2 && item.type === 'a')
          && (+cont.getSelectedLocId()  == 0 || +item.locId == cont.getSelectedLocId() ) ){
        return "count";
      }
    }).count;
    */

    console.log('array filer rsult' + JSON.stringify(stats));

    var infoObj = {
      totalAppointmenCount: stats.active?stats.active:0,
      completedAppointmentCount:stats.completed?stats.completed:0,
      cancelledAppointmentCount:stats.cancelled?stats.cancelled:0
    };

    return infoObj;
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
    this.getUserInfo();
    this.getLocations();
    this.getPatients();
    //this.getappointmentListForDate(model.appointmentDate, model.DefaultlocationId);

  };

  controller.prototype.removeOverLay = function () {

 //$(".overlay").removeClass('hidden');
    console.log('patients loaded ' + this.patientsLoaded +
                'locations loaded ' + this.locationsLoaded +
                'appointments loaded ' + this.appointmentsLoaded
               );

    if(this.patientsLoaded  == true &&
        this.locationsLoaded  == true &&
        this.appointmentsLoaded == true){
         console.log(' removing overlay ');
         todayAppointmentListView.overlay.addClass('hidden');
        //   $(".overlay").addClass('hidden');
    }

  };

controller.prototype.getUserInfo = function () {
  $.post( this.getUserInfoUrl , {})
  .done(function( response ) {
    console.log("user info: " + JSON.stringify(response));
    model.userInfo = response.data;

    //get the appointment list for the user, i.e. doctor or staff for a location
    model.DefaultlocationId = model.userInfo.locationId == -1?0:model.userInfo.locationId;
    todayAppointmentListView.customizeViewForUser();
    cont.getappointmentListForDate(model.appointmentDate, model.DefaultlocationId);

  });

};

  controller.prototype.getPatients = function () {

    $.get( this.getPatientsForAutoFillUrl , {})
    .done(function( response ) {
      console.log('got patients');
      //console.log("patients: " + JSON.stringify(response));
      if(response.status == 1){
        model.appointmenListViewModel.patientList = response.data;
        cont.patientsLoaded = true;
        cont.removeOverLay();
      }
    });

  };

  controller.prototype.getLocations = function () {
    $.get( this.getLocationUrl , {})
    .done(function( response ) {
      console.log("locations: " + JSON.stringify(response));
      model.appointmenListViewModel.locationList = response.data;
      todayAppointmentListView.render();
      cont.locationsLoaded = true;
      cont.removeOverLay();
    });
  };

  controller.prototype.getappointmentListForDate = function (pdate, locId) {
    console.log('called with' +  pdate + ' ' + locId);
    $.get( this.getAppointmentForTheDayUrl , {date:   pdate, locId: locId})
    .done(function( response ) {
      console.log("today Appointment: " + JSON.stringify(response));
      model.appointmentList = response.data;
      var appointmentList = cont.getSortedAppointmentList(locId);

      var freeSlots = _.countBy(model.appointmentList, function(item){
        if(item.type === 'f'){
          return "count";
        }
      }).count;

      if(freeSlots > 1){
        appointmentList = cont.combineFreeSlots(appointmentList);
      }


      todayAppointmentListView.renderAppointmentist(appointmentList);
      cont.appointmentsLoaded = true;
      cont.removeOverLay();
    });

  };


  var todayAppointmentListView = {
    init:function(){
      this.overlay = $('#dash-overlay');

      this.dateInput = $('#appointment-list-date1');
      this.locationSelect = $('#appointment-list-locations-sel');
      this.locationSelect.hide();
      this.appointmentFilterBtn = $(".all-appointments-filter-button");
        
        this.appointmentFilterBtn.on('click',function(){
            console.log("toggle active");
             $(".all-appointments-filter-button").removeClass("active");
            $(this).addClass("active");
        });

      //Selected location change event wiring
      this.locationSelect.on('change', function(){


        var selectedOption = todayAppointmentListView.locationSelect.find(":selected");
        var selectedValue = selectedOption.attr('value');
        var name = selectedOption.text();

        console.log('select locId '  +  selectedValue);

        if(selectedValue){
          todayAppointmentListView.listHeadertText.text('Location ' + name);
          cont.setSelectedLocationId(selectedValue);
          //var ldate = cont.getSelectedeDate();
          var appointments = cont.getSortedAppointmentList(selectedValue);

          var freeSlots = _.countBy(appointments, function(item){
            if(item.type === 'f'){
              return "count";
            }
          }).count;

          if(freeSlots > 1){
              appointments = cont.combineFreeSlots(appointments);
          }


          todayAppointmentListView.renderAppointmentist(appointments);
          //cont.getappointmentListForDate(ldate, selectedValue);
        }

        //model.DefaultlocationId
      })




      //this.goButton = $('#appointment-list-go-btn');

      this.listHeadertText = $('#appointment-list-header');

      this.totalAppointmentCount = $('#total-appointment-count');
      this.cancelledAppointmentCount = $('#cancelled-appointment-count');
      this.completedAppointmentCount = $('#completed-appointment-count');
      this.rescheduledAppointmentCount = $('#rescheduled-appointment-count');

      //appointment list contianer
      this.appointmentListContainer = $('#appointment-list-container');

      //filer buttons
      this.closeAppointmentFilerButton = $('#cancelled-appointment-filter-button');

      this.closeAppointmentFilerButton.on('click', function(){
        var list = cont.getCancelledList();
        console.log(JSON.stringify(list));
          todayAppointmentListView.renderAppointmentist(list);
      })

      this.allAppointmentFilerButton = $('#all-appointments-filter-button');

      this.allAppointmentFilerButton.on('click', function(){
        var locId = cont.getSelectedLocId();
        var list = cont.getSortedAppointmentList(locId);
        //console.log(JSON.stringify(list));


      var freeSlots = _.countBy(list, function(item){
        if(item.type === 'f'){
          return "count";
        }
      }).count;

      if(freeSlots > 1){
          list = cont.combineFreeSlots(list);
      }

          todayAppointmentListView.renderAppointmentist(list);
      })


      this.freeTimeSlotsFilterButton = $('#free-slots-filter-button');

      this.freeTimeSlotsFilterButton.on('click', function(){
        var list = cont.getFreeTimeSlotsList();
        console.log(JSON.stringify(list));
          todayAppointmentListView.renderAppointmentist(list);
      })


      this.activeAppointmentsFilterButton = $('#active-appointments-filter-button');

      this.activeAppointmentsFilterButton.on('click', function(){
        var list = cont.getActiveAppointmentsList();
        console.log(JSON.stringify(list));
          todayAppointmentListView.renderAppointmentist(list);
      })

      this.closedAppointmentsFilterButton = $('#closed-appointment-filter-button');

      this.closedAppointmentsFilterButton.on('click', function(){
        console.log('closed appointment filter');
        var list = cont.getClosedAppointmentsList();
        console.log(JSON.stringify(list));
          todayAppointmentListView.renderAppointmentist(list);
      })


      //templates
      this.freeTimeSlotTemplate = $('#book-new-appointment-template');
      this.bookedAppointmentTemplate = $('#booked-appointment-template');
      this.cancelledAppointmentTemplate = $('#cancelled-appointment-template');
      this.closedAppointmentTemplate = $('#closed-appointment-template');
      this.noResultsFoundTemplate = $('#no-result-found-template');


      //modals

      this.newAppointmentModal = $('#book-appointment-modal');
      this.cancelAppointmentModal = $('#cancel-appointment-modal-window');
      this.closeAppointmentModal = $('#close-appointment-modal-window');

      this.dateInput.datetimepicker({
        inline:true,
        format: 'DD-MM-YYYY'
      });

      this.dateInput.on('dp.change', function(){
        var date = todayAppointmentListView.dateInput.val();
        cont.setSelectedDate(date);
        var locId = cont.getSelectedLocId();
        cont.getappointmentListForDate(date, locId);
      });

      /*
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

  });*/

},
render: function(){
  console.log('rendering appointment list');

  this.dateInput.val(cont.getSelectedeDate());

  todayAppointmentListView.listHeadertText.text('Location');

  //appointment statictics
  //this.rescheduledAppointmentCount.text(stats.rescheduledAppointmentCount);


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

},
customizeViewForUser: function(){
  var userInfo = cont.getUserInfoModel();


 if(userInfo && userInfo.type == 'D'){
   //show the location selector drop down
    this.locationSelect.show();

  }else if(userInfo && userInfo.type == 'S'){
    //keep the location dropdown hidden

  /*
   var location =  _.find(model.appointmentList, function(item){

     if( +item.locId == userInfo.locationId ){
       return true;
     }
   };
   */


  }


},
renderAppointmentist: function(appointmentList){

  //updating status, for total appointments, closed and cancelled appointments
  var stats = cont.getAppointmentListInfo();

  this.totalAppointmentCount.text(stats.totalAppointmenCount);
  this.cancelledAppointmentCount.text(stats.cancelledAppointmentCount);
  this.completedAppointmentCount.text(stats.completedAppointmentCount);

  if(_.size(appointmentList) == 0){
    console.log('appointemtn list with no entries');
    //adding the result found template
    this.appointmentListContainer.empty();
    var template = this.noResultsFoundTemplate.clone();
    this.appointmentListContainer.append(template);
  }else{

    console.log('render appointet list with entires');
    //update appointment status


    this.appointmentListContainer.empty();

    //this.totalAppointmentCount.text(appointmentList.length);

    for(var i = 0; i < appointmentList.length; i++){

      var item = appointmentList[i];
      var mStartTime = moment({hours: item.startMins/60 , minutes: item.startMins%60});
      var mEndTime = moment({hours: item.endMins/60 , minutes: item.endMins%60});

      if(item.type == 'f'){
        console.log('add free time');
        var template = this.freeTimeSlotTemplate.clone();
        this.initilizeFreeTimeSlotTemplate(template, item );
      }else if(item.type == 'a'){

        if(item.state == 0){
          var template = this.bookedAppointmentTemplate.clone();
          this.intilizeBookedAppointmentTemplate(template, item );

        }else if(item.state == 1){
          //closed
          var template = this.closedAppointmentTemplate.clone();
          this.intilizeClosedAppointmentTemplate(template, item );

        }else  if(item.state == 2){
          var template = this.cancelledAppointmentTemplate.clone();
          this.intilizeCancelledAppointmentTemplate(template, item );
          //cancelled
        }

      }

      this.appointmentListContainer.append(template);

    }

  }
},
intilizeCancelledAppointmentTemplate: function(template, appointmentItem){
  if(template && appointmentItem){
    var mStartTime = moment({hours: appointmentItem.startMins/60 , minutes: appointmentItem.startMins%60});
    var mEndTime = moment({hours: appointmentItem.endMins/60 , minutes: appointmentItem.endMins%60});

    template.find('.time').text(mStartTime.format("hh:mm"));
    template.find('.aa').text(mStartTime.format(" A"));

    template.find('.patient-name').text(appointmentItem.name);


    //setting info popover
    var popoverSettings = {
      placement:'left',
      container: 'body',
      trigger: 'focus',
      html: true,
      content: this.getCancelClosePopoverContent(appointmentItem.contact, appointmentItem.description, appointmentItem.remarks)
    };

    template.find('.btn-cancel-remarks').popover(popoverSettings);

  }
},
intilizeClosedAppointmentTemplate: function(template, appointmentItem){
  if(template && appointmentItem){
    var mStartTime = moment({hours: appointmentItem.startMins/60 , minutes: appointmentItem.startMins%60});
    var mEndTime = moment({hours: appointmentItem.endMins/60 , minutes: appointmentItem.endMins%60});

    template.find('.time').text(mStartTime.format("hh:mm"));
    template.find('.aa').text(mStartTime.format(" A"));

    template.find('.patient-name').text(appointmentItem.name);

    //setting info popover
    var popoverSettings = {
      placement:'left',
      container: 'body',
      trigger: 'focus',
      html: true,
      content: this.getCancelClosePopoverContent(appointmentItem.contact, appointmentItem.description, appointmentItem.remarks)
    };

    template.find('.btn-close-appointment-remarks').popover(popoverSettings);

  }
},
intilizeBookedAppointmentTemplate: function(template, appointmentItem){
  if(template && appointmentItem){
    var mStartTime = moment({hours: appointmentItem.startMins/60 , minutes: appointmentItem.startMins%60});
    var mEndTime = moment({hours: appointmentItem.endMins/60 , minutes: appointmentItem.endMins%60});



    template.find('.time').text(mStartTime.format("hh:mm"));
    template.find('.aa').text(mStartTime.format(" A"));

    template.find('.patient-name').text(appointmentItem.name);
    template.find('.patient_history_btn').on('click',(function(){
      return function(){
        console.log(cont.getPatientsHistoryUrl);
        window.open(cont.getPatientsHistoryUrl+'?id='+appointmentItem.patientId,'_blank');
        console.log(appointmentItem.patientId);
      }


    })(appointmentItem));


    var popoverSettings = {
      placement:'left',
      container: 'body',
      trigger: 'focus',
      html: true,
      content:this.getAppointmentPopoverContent(appointmentItem.contact, appointmentItem.description)
    };

    template.find('.booked-appointment-popover').popover(popoverSettings);

    //close appointment button
    var closeAppointmentButton = template.find('.close-appointment-template-button');

    closeAppointmentButton.on('click', (function(appointment){
      return function(){
        console.log('close appointment click');
        var closeAppointmentController = getCloseAppointmentController();

        var initObj = {
          appointmentId: appointment.id,
          closingTime: appointment.endMins,
          patientsName: appointment.name,
        };

        closeAppointmentController.setCloseAppointmentCallback(function(response){
          console.log('call back in dash home, response' + JSON.stringify(response) );
          //refresh appointment
          console.log('selected date ' + cont.getSelectedeDate() + ' loc Id ' + cont.getSelectedLocId());
          cont.getappointmentListForDate(cont.getSelectedeDate(),  cont.getSelectedLocId());

          todayAppointmentListView.closeAppointmentModal.modal('hide');

        });
        closeAppointmentController.init(initObj);

        todayAppointmentListView.closeAppointmentModal.modal();

        todayAppointmentListView.closeAppointmentModal.on('hidden.bs.modal', function(){
          console.log('close appointment modal close');
          closeAppointmentController.resetForm();
        });

      }
    })(appointmentItem));

    //cancel appointment button
    var cancelAppointmentButton = template.find('.cancel-appointment-template-btn');

    cancelAppointmentButton.on('click', (function(appointment){
      return function(){
        console.log('click on ' + JSON.stringify(appointment));
        var cancelAppointmentController = getCancelAppointmentController();
        cancelAppointmentController.setCancelCallback(function(response){
          //on operation completion
          console.log('cancel callback ' + JSON.stringify(response));
          if(response.status == 1){
            todayAppointmentListView.cancelAppointmentModal.modal('hide');
            cont.getappointmentListForDate(cont.getSelectedeDate(),  cont.getSelectedLocId());
          }
        });
        cancelAppointmentController.init(appointment);

        todayAppointmentListView.cancelAppointmentModal.modal();

      }
    })(appointmentItem));

  }
},
initilizeFreeTimeSlotTemplate: function(template, appointmentItem){

  if(template && appointmentItem){

    var mStartTime = moment({hours: appointmentItem.startMins/60 , minutes: appointmentItem.startMins%60});
    var mEndTime = moment({hours: appointmentItem.endMins/60 , minutes: appointmentItem.endMins%60});

    template.find('.patient-name').text(appointmentItem.name);

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
            //optimization check if a new patient was added
            // and append his details
            var patient = appController.getPatientModel();
            console.log('patints Id ' + JSON.stringify(patient))
            if(patient.id == 0){
              console.log('reload the patients list when a new patients list');
              cont.getPatients();
            }
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

  }

},
getAppointmentPopoverContent: function(contact, description){

  var content = '<dl class="dl-horizontal"><dt>Contact&nbsp;:&nbsp;</dt><dd>' +
  contact +
  '</dd></dl><dl class="dl-horizontal"><dt>Description&nbsp;:&nbsp;</dt><dd>' +
  description +
  '</dd></dl>';

  return content;
},
getCancelClosePopoverContent: function(contact, description, remarks){
  return '<dl class="dl-horizontal">' +
    '<dt>Contact&nbsp;:&nbsp;</dt>' +
    '<dd>' + contact + '</dd>' +
  '</dl>' +
  '<dl class="dl-horizontal">' +
    '<dt>Description&nbsp;:&nbsp;</dt>' +
    '<dd>' + description + '</dd>' +
  '</dl>' +
  '<dl class="dl-horizontal">' +
    '<dt>Remarks&nbsp;:&nbsp;</dt>' +
  '  <dd>'+ remarks +'</dd>' +
  '</dl>'
}
}

var cont = new controller();
cont.init();

}());



$(function () {
//  $('body').$('[data-tooltip="tooltip"]').tooltip({'placement':'top'});
  $('body').tooltip({
      placement:'top',
      selector: '[data-tooltip="tooltip"]'
  });

});
$(function () {
  $('body').popover({
    trigger:'focus',
    placement:'left',
    selector: '[data-toggle="popover"]'
  });

  //$('[data-toggle="popover"]').popover({'trigger':'focus','placement':'left'})

});


});
