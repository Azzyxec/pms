$(document).ready(function(){

  $(function(){
    console.log('doctor dash js');

    var model = {
      appointmentList:[],
      appointmentDate: moment().format('DD-MM-YYYY'),
      DefaultlocationId: 0,
      currentFilter: 0,//0 - all, 1 - book, 2 - active,  3 -  cancelled, 4 - closed
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

    controller.prototype.getCurrentFilter = function () {
      return model.currentFilter;
    };

    controller.prototype.setCurrentFilter = function (filterId) {
      model.currentFilter = filterId;
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

  controller.prototype.getSortedAppointmentList = function (locationId) {

    //console.log('sorting with location Id' + locationId);

    var intermediateList = [];
    var cancelledList = [];

    for(var i = 0; i < model.appointmentList.length; i++){
      var item = model.appointmentList[i];

      if(locationId == 0 || locationId == item.locId ){
        //filter with respect to location when locationId != 0

       if(item.state != 2){
          intermediateList.push(item);
        }else if(item.state == 2){
          cancelledList.push(item);
        }

      }

    }//loop ends


    //consolidate free time slots
    var removeList = [];
    var prevItem = {};
    for(var i = 0; i < intermediateList.length; i++){
      var item = intermediateList[i];

      if(item.type == 'f' && prevItem.type == "f" &&
        prevItem.endMins == item.startMins &&
         +item.scheduleId == +prevItem.scheduleId){
        item.startMins = prevItem.startMins;
        removeList.push(prevItem);
      }

      prevItem = item;
    }

    //adding the items that we dont want to remove
    var returnList = _.difference(intermediateList, removeList)
                      .concat(cancelledList);

    return returnList;

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

      return freeSlots;

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

       /* AX BOC location change
      controller.prototype.assignColorCodesTolocationList = function(){

        for(var i = 0; i < model.appointmenListViewModel.locationList.length; i++){
          if(i < backGroundColorList.length){
            model.appointmenListViewModel.locationList[i].colour = backGroundColorList[i];
          }else{
            model.appointmenListViewModel.locationList[i].colour =  backGroundColorList[0];
          }

        }

      };

      controller.prototype.getLocationColour = function(id){
        for(var i = 0; i < model.appointmenListViewModel.locationList.length; i++){
          if(model.locationList[i].id == id){
            return model.appointmenListViewModel.locationList[i].colour;
          }
        }
      };

       AX EOC location change */

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

    //modal controllers
    this.closeAppointmentController = getCloseAppointmentController();
    this.closeAppointmentController.init();

    this.bookingController = makeAppointmentController();

  };

  controller.prototype.removeOverLay = function () {

  /*
    console.log('patients loaded ' + this.patientsLoaded +
                'locations loaded ' + this.locationsLoaded +
                'appointments loaded ' + this.appointmentsLoaded
               );
*/
    if(this.patientsLoaded  == true &&
        this.locationsLoaded  == true &&
        this.appointmentsLoaded == true){
         //console.log(' removing overlay ');
         todayAppointmentListView.overlay.addClass('hidden');
    }

  };

controller.prototype.getUserInfo = function () {
  $.post( this.getUserInfoUrl , {})
  .done(function( response ) {
    //  console.log("user info: " + JSON.stringify(response));
    model.userInfo = response.data;

    //get the appointment list for the user, i.e. doctor or staff for a location
    model.DefaultlocationId = model.userInfo.locationId == -1?0:model.userInfo.locationId;
    cont.getappointmentListForDate(model.appointmentDate);

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
      //console.log("locations: " + JSON.stringify(response));
      model.appointmenListViewModel.locationList = response.data;
      todayAppointmentListView.render();
      cont.locationsLoaded = true;
      cont.removeOverLay();
    });
  };

  controller.prototype.getappointmentListForDate = function (pdate) {
    //console.log('called with' +  pdate);
    $.get( this.getAppointmentForTheDayUrl , {date:   pdate, locId: 0})
    .done(function( response ) {
      //console.log("today Appointment: " + JSON.stringify(response));
      model.appointmentList = response.data;

      var appointmentList = cont.getSortedAppointmentList(0);
      model.appointmentList = appointmentList;

      var locId = cont.getSelectedLocId();

      if(locId != 0){
        appointmentList = cont.getSortedAppointmentList(locId);
      }

      var filterId = cont.getCurrentFilter();

      if(filterId == 1){
        appointmentList = cont.getFreeTimeSlotsList();
      }else if(filterId == 2){
        appointmentList = cont.getActiveAppointmentsList();
      }else if(filterId == 3){
        appointmentList = cont.getCancelledList();
      }else if(filterId == 4){
        appointmentList = cont.getClosedAppointmentsList();
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
      this.locationNavContainer = $('#loc-navs');

      this.appointmentFilterButtons = $(".all-appointments-filter-button");

     this.appointmentFilterButtons.on('click',function(){
          console.log("toggle active");
          $(this).siblings().removeClass("active");
          $(this).addClass("active");
      });

      //Selected location change event wiring
      /*
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
          todayAppointmentListView.renderAppointmentist(appointments);

        }

      })
      */

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
        cont.setCurrentFilter(3);
          todayAppointmentListView.renderAppointmentist(list);
      })

      this.allAppointmentFilerButton = $('#all-appointments-filter-button');

      this.allAppointmentFilerButton.on('click', function(){
        var locId = cont.getSelectedLocId();
        var list = cont.getSortedAppointmentList(locId);
        //console.log(JSON.stringify(list));
        cont.setCurrentFilter(0);
      todayAppointmentListView.renderAppointmentist(list);
      })

      this.freeTimeSlotsFilterButton = $('#free-slots-filter-button');

      this.freeTimeSlotsFilterButton.on('click', function(){
        var list = cont.getFreeTimeSlotsList();
        console.log(JSON.stringify(list));
        cont.setCurrentFilter(1);
          todayAppointmentListView.renderAppointmentist(list);
      })

      this.activeAppointmentsFilterButton = $('#active-appointments-filter-button');

      this.activeAppointmentsFilterButton.on('click', function(){
        var list = cont.getActiveAppointmentsList();
        console.log(JSON.stringify(list));
        cont.setCurrentFilter(2);
          todayAppointmentListView.renderAppointmentist(list);
      })

      this.closedAppointmentsFilterButton = $('#closed-appointment-filter-button');

      this.closedAppointmentsFilterButton.on('click', function(){
        console.log('closed appointment filter');
        var list = cont.getClosedAppointmentsList();
        console.log(JSON.stringify(list));
        cont.setCurrentFilter(4);
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
        cont.getappointmentListForDate(date);

      });

},
render: function(){

  this.dateInput.val(cont.getSelectedeDate());

  var userInfo = cont.getUserInfoModel();


  if(userInfo && userInfo.type == 'D'){

    this.locationNavContainer.empty();

    var locationList = cont.getLocationList();

    if(locationList.length > 0){
        cont.setSelectedLocationId(locationList[0].id);
    }

    for(var i = 0; i< locationList.length; i++ ){
      //<li role="presentation" id="all-appointments-filter-button"  class="all-appointments-filter-button active "><a >Margaon</a></li>
      var locationButton = $('<li/>', {
        role:'presentation',
        class: 'all-appointments-filter-button',
      });

      var defaultLocId = cont.getSelectedLocId();

      if(defaultLocId == locationList[i].id){
        locationButton.addClass('active');
      }

      locationButton.on('click', (function(locId, self){
        return function(){
        //filter locations for this id
        console.log('filter locations for ' + locId);
        self.siblings().removeClass('active');
        self.addClass('active');

        cont.setSelectedLocationId(locId);

          var filterId = cont.getCurrentFilter();

          var appointmentList = [];

          if(filterId == 1){
            appointmentList = cont.getFreeTimeSlotsList();
          }else if(filterId == 2){
            appointmentList = cont.getActiveAppointmentsList();
          }else if(filterId == 3){
            appointmentList = cont.getCancelledList();
          }else if(filterId == 4){
            appointmentList = cont.getClosedAppointmentsList();
          }else{
            appointments = cont.getSortedAppointmentList(locId);
          }

        todayAppointmentListView.renderAppointmentist(appointments);

        }
      })(locationList[i].id, locationButton));

      locationButton.append($('<a>' + locationList[i].name + '</a>'));

      this.locationNavContainer.append(locationButton);
    }
  }


  //modal and its controller initilizations
  cont.closeAppointmentController.setCloseAppointmentCallback(function(response){
    console.log('call back in dash home, response' + JSON.stringify(response) );
    //refresh appointment
    console.log('selected date ' + cont.getSelectedeDate() + ' loc Id ' + cont.getSelectedLocId());

    cont.getappointmentListForDate(cont.getSelectedeDate());
    todayAppointmentListView.closeAppointmentModal.modal('hide');

  });

  todayAppointmentListView.closeAppointmentModal.on('hidden.bs.modal', function(){
    console.log('close appointment modal close');
    cont.closeAppointmentController.cleanup();

      $('.pms-alerts').remove();
  });

  todayAppointmentListView.newAppointmentModal.on('hidden.bs.modal', function(){
    console.log('book appointment modal close');
    cont.bookingController.cleanup();

      $('.pms-alerts').remove();
  });

  /*
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
  */

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
    //var template = this.noResultsFoundTemplate.clone();
    this.appointmentListContainer.append(this.noResultsFoundTemplate);
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

    //patient history button
    template.find('.patient_history_btn').on('click',(function(){
      return function(){
        console.log(cont.getPatientsHistoryUrl);
        window.open(cont.getPatientsHistoryUrl+'?id='+appointmentItem.patientId,'_blank');
        console.log(appointmentItem.patientId);
      }


    })(appointmentItem));

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


    template.find('.patient_history_btn').on('click',(function(){
      return function(){
        console.log(cont.getPatientsHistoryUrl);
        window.open(cont.getPatientsHistoryUrl+'?id='+appointmentItem.patientId,'_blank');
        console.log(appointmentItem.patientId);
      }


    })(appointmentItem));

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

        var initObj = {
          appointmentId: appointment.id,
          closingTime: appointment.endMins,
          patientsName: appointment.name,
        };

        //intilize the model
        cont.closeAppointmentController.setCloseInfo(initObj);

        //show the modal
        todayAppointmentListView.closeAppointmentModal.modal();

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
            cont.getappointmentListForDate(cont.getSelectedeDate());
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

        var luserInfo = cont.getUserInfoModel();
        console.log('userInfo ' + JSON.stringify(luserInfo));

        var initValues = {
          locationList: cont.getLocationList(),
          locationId: cont.getSelectedLocId(),
          appointmetDate: cont.getSelectedeDate(),
          appointmentTime: startTime,
          patientList: cont.getPatientList(),
          userInfo: luserInfo
        }

        //var appController = makeAppointmentController();
        cont.bookingController.init(initValues);

        cont.bookingController.setCompleteEventHandler(function(data){
          console.log('got this' + JSON.stringify(data));
          if(data.status == 1){
            console.log('appointmetn added success fully');
            todayAppointmentListView.newAppointmentModal.modal('hide');
            //optimization check if a new patient was added
            // and append his details
            cont.bookingController.init(initValues);
            var patient = cont.bookingController.getPatientModel();
            console.log('patints Id ' + JSON.stringify(patient))
            if(patient.id == 0){
              console.log('reload the patients list when a new patients list');
              cont.getPatients();
            }
            //update the location list with new values
            cont.getappointmentListForDate(cont.getSelectedeDate());
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


$('body').tooltip({
    placement:'top',
    selector: '[data-tooltip="tooltip"]',
    container: 'body'
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
