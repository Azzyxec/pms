$(document).ready(function(){

  $(function(){

  var scheduleModel = {
    startDate: "",
    endDate: "",
    scheduleDaysCount: 0,
    workLocations: [],
    selectedLocation:{id:0, name:""},
    scheduleList:[]
  };

  var controller = {
    init: function(){
    this.createUpdateScheduleUrl = links.createUpdateScheduleUrl;
    this.getLocationUrl = links.getActiveLocations;
    this.getScheduleCalendarUrl = links.getScheduleCalendarUrl;

    stepOneView.init();
    createScheduleView.init();

    //getting work locations for the doctor
    $.get( controller.getLocationUrl , {})
    .done(function( response ) {
      //console.log('response ' + JSON.stringify(response));
      scheduleModel.workLocations = response.data;
      stepOneView.render();
    });

    },
    resetScheduleList: function(){
      scheduleModel.scheduleList = [];
    },
    updateSelectedLocation: function(id, name){
    scheduleModel.selectedLocation.id = id;
    scheduleModel.selectedLocation.name = name;

    console.log(JSON.stringify(scheduleModel.selectedLocation));
    },
    getLocationModel: function(){
    return scheduleModel.selectedLocation;
    },
    getLocationList:function(){
    return scheduleModel.workLocations;
    },
    generateModel: function(){
    var fromDateStr = stepOneView.fromDateControl.val(); //2016-05-19
    var toDateStr = stepOneView.toDateControl.val(); //2016-05-19

    var startTimeVal = stepOneView.fromTimeControl.val();
    var endTimeVal =  stepOneView.toTimeControl.val();

    //date validations, cannot put previoous dates
    //cannot dates in revrese order
    //cannot make schedule for more than 60 days

    var mfromDate = moment(fromDateStr, "DD-MM-YYYY");
    var mtoDate = moment(toDateStr, "DD-MM-YYYY");

    //setting the models start and end date
    scheduleModel.startDate = mfromDate.format('DD-MM-YYYY');
    scheduleModel.endDate = mtoDate.format('DD-MM-YYYY');

    //console.log('date range from ' +  mfromDate.format('DD-MM-YYYY') + ' to ' + mtoDate.format('DD-MM-YYYY'));

    //getting the difference is dates in terms of dates
    var daysDuration =  moment.duration(mtoDate.diff(mfromDate)).asDays();
    console.log('duration ' + daysDuration);

    scheduleModel.scheduleDaysCount = daysDuration;

    //console.log('duration :' + daysDuration);

    var weekArray = [];
    if(stepOneView.chkMon.prop('checked')){
      weekArray.push('Mon');
    }

    if(stepOneView.chkTue.prop('checked')){
      weekArray.push('Tue');
    }

    if(stepOneView.chkWed.prop('checked')){
      weekArray.push('Wed');
    }

    if(stepOneView.chkThu.prop('checked')){
      weekArray.push('Thu');
    }

    if(stepOneView.chkFri.prop('checked')){
      weekArray.push('Fri');
    }

    if(stepOneView.chkSat.prop('checked')){
      weekArray.push('Sat');
    }

    if(stepOneView.chkSun.prop('checked')){
      weekArray.push('Sun');
    }

    console.log('week array ' + weekArray);

    var mStartTime = moment(startTimeVal, "hh:mm A");
    var mEndTime = moment(endTimeVal, "hh:mm A");

    //adding initital dates, if start day is not monday
    var startDay = mfromDate.format('ddd');

    if(startDay != 'Mon'){

      var blocksToAdd = mfromDate.day() - 1;

      var calanderStartDate = moment(mfromDate).subtract(blocksToAdd, 'days');

      for(var i = 0; i < blocksToAdd ; i++){

        var schedule = {
        date: calanderStartDate.format('DD-MM-YYYY'),
        startTime:startTimeVal,
        endTime: endTimeVal,
        startTimeMinutes: mStartTime.hours()*60 + mStartTime.minutes(),
        endTimeMinutes: mEndTime.hours()*60 + mEndTime.minutes(),
        isBlocked: 0,
        active: 0
        };

        scheduleModel.scheduleList.push(schedule);

        calanderStartDate.add(1, 'd');

      }

    }
    //EOC adding calander start days


    for(var j = 0; j <= daysDuration; j++){

      var schedule = {
      date: mfromDate.format('DD-MM-YYYY'),
      startTime:startTimeVal,
      endTime: endTimeVal,
      startTimeMinutes: mStartTime.hours()*60 + mStartTime.minutes(),
      endTimeMinutes: mEndTime.hours()*60 + mEndTime.minutes(),
      isBlocked: 0,
      active: 0
      };
      scheduleModel.scheduleList.push(schedule);

      var weekDay = mfromDate.format('ddd');

      if(weekArray.indexOf(weekDay)  >= 0 ){
      schedule.active = 1;
      }

      mfromDate.add(1, 'days')

    }; //date loop


    },
    getSchedule: function() {
    return scheduleModel;
    },
    saveUpdateModelRedirect: function(){


    // remove schedues which are not active

    var activeSchedulesArray = [];
    for(var i = 0; i < scheduleModel.scheduleList.length; i++){

      if(scheduleModel.scheduleList[i].active == 1){
        activeSchedulesArray.push(scheduleModel.scheduleList[i]);
      }
    }

    scheduleModel.scheduleDaysCount = activeSchedulesArray.length;
    scheduleModel.scheduleList = activeSchedulesArray;


    //console.log(JSON.stringify(scheduleModel.scheduleList));



    $.post( controller.createUpdateScheduleUrl , scheduleModel)
    .done(function( response ) {
      console.log('response ' + JSON.stringify(response));



      if(response.status == 1){
      window.location.href = controller.getScheduleCalendarUrl;
      }else if(response.status == -2){
        utility.getAlerts("There is a clash with an existing schedule, please try creating a schedule with different dates or timmings","alert-warning","",".container-fluid");
    }

  });

}
};

var stepOneView = {

  init: function(){
    utility.removeAlerts();
    this.panel = $('#schedule-step-one');
    this.selectLocations = $('#sel-work-locations');
    this.fromDateControl = $('#from-date');
    this.toDateControl = $('#to-date');
    this.fromTimeControl = $('#from-time');
    this.toTimeControl = $('#to-time');
    this.cancelButton = $('#btn-cancel');

    this.cancelButton.on('click', function(){
      window.location = links.getScheduleCalendarUrl;
    });










    this.fromDateControl.datetimepicker({
    inline: false,
    format:'DD-MM-YYYY',
    minDate: moment().subtract(1,'d')
    });

    this.toDateControl.datetimepicker({
    inline: false,
    format:'DD-MM-YYYY',
    minDate: moment().subtract(1,'d')

    });
    this.fromDateControl.on('dp.show dp.change',function(){

        selectedDate = stepOneView.fromDateControl.val();
        momentSeletDate = moment(selectedDate,'DD-MM-YYYY').add(60,'d');

        stepOneView.toDateControl.data("DateTimePicker").maxDate(momentSeletDate.format('DD-MM-YYYY'));
        console.log(momentSeletDate.format('DD-MM-YYYY'));
    });

    this.fromTimeControl.datetimepicker({
    inline: false,
    format:'LT'
    });
    this.fromTimeControl.val("09:00:AM");


    this.toTimeControl.datetimepicker({
    inline: false,
    format:'LT'
    });
    this.toTimeControl.val("12:00:PM");

    this.checkAllWeekDays = $('#chk-all-weekdays');
    this.chkMon = $('#chk-mon');
    this.chkTue = $('#chk-tue');
    this.chkWed = $('#chk-wed');
    this.chkThu = $('#chk-thu');
    this.chkFri = $('#chk-fri');
    this.chkSat = $('#chk-sat');
    this.chkSun = $('#chk-sun');

    //setting all check boxes as checked
    this.checkAllWeekDays.prop('checked', true);
    this.chkMon.prop('checked', true);
    this.chkTue.prop('checked', true);
    this.chkWed.prop('checked', true);
    this.chkThu.prop('checked', true);
    this.chkFri.prop('checked', true);
    this.chkSat.prop('checked', true);
    this.chkSun.prop('checked', true);

    //TODO testing code to be removed
    var currDate = moment();
    this.fromDateControl.val(currDate.format('DD-MM-YYYY'));
    currDate.add(15, 'days')
    this.toDateControl.val(currDate.format('DD-MM-YYYY'));

    $('#btn-schedule-next').on('click', (function(self){
    return function(){
      console.log('schedule next nclick');

      //updating location text in the second step
      var locationId = self.selectLocations.find(":selected").attr('value');
      var locationName = self.selectLocations.find(":selected").text();
      controller.updateSelectedLocation(locationId, locationName);

      controller.generateModel();
      self.panel.hide();
      createScheduleView.panel.show();
      createScheduleView.render();

    };
    })(this));

    this.checkAllWeekDays.change(function(){
    //console.log(this.checked);
    if(this.checked){
      stepOneView.chkMon.prop('checked', true);
      stepOneView.chkTue.prop('checked', true);
      stepOneView.chkWed.prop('checked', true);
      stepOneView.chkThu.prop('checked', true);
      stepOneView.chkFri.prop('checked', true);
      stepOneView.chkSat.prop('checked', true);
      stepOneView.chkSun.prop('checked', true);
    }else{
      stepOneView.chkMon.prop('checked', false);
      stepOneView.chkTue.prop('checked', false);
      stepOneView.chkWed.prop('checked', false);
      stepOneView.chkThu.prop('checked', false);
      stepOneView.chkFri.prop('checked', false);
      stepOneView.chkSat.prop('checked', false);
      stepOneView.chkSun.prop('checked', false);

    }
    });

  },
  render: function(){

    var locations = controller.getLocationList();

    for(var i = 0; i < locations.length; i++){
    var option = $('<option/>',{
      value: locations[i].id,
      text: locations[i].name
    }
    );
    this.selectLocations.append(option);

  }

  }
};

var createScheduleView = {
  init: function(){
  this.panel = $('#schedule-step-two');
  this.locationName = $('#calendar-location-name');
  this.dateHeader = $('#calander-date');

  this.tableBody = $('#table-body-schedule-calander');

  this.tableDataTemplate = $('#table-data-template');
  this.appointmentLabel = $(".apptLabel");

  //alerts
  this.overlappingDatesAlert = $('#alert-overlapping-schedule');

  this.appointmentLabel.on('click',function(){
    console.log("clicked");
    $(this).parent().addClass('red');

  });

  $('#btn-schedule-create').on('click', (function(self){
    return function(){
    console.log('schedule create click');
    controller.saveUpdateModelRedirect();
    };
  })(this));

  this.backButton = $('#btn-back');

  this.backButton.on('click', function(){
    utility.removeAlerts();
    console.log("back btn init");
    stepOneView.panel.show();
    createScheduleView.panel.hide();
    controller.resetScheduleList();
  });

  },
  makeTimePickersRow: function(idVal, fromInput, toInput){

  var tr =  $('<tr/>',{class: 'collapse collapse-time-picker collapse-style',
  id: idVal});

  var td = $('<td/>',{colspan: "7"});
  tr.append(td);

  var form = $('<form/>',{class: "form-inline"});
  td.append(form);



  var fromLabel = $('<label/>',{class: " control-label", text: 'From',style:"margin: 0px 10px"});
  form.append(fromLabel);
  div = $('<div/>',{class: "input-group date"});
  form.append(div);
  div.append(fromInput);

  var  toLabel= $('<label/>',{class: " control-label", text: 'To',style:"margin: 0px 10px"});
  form.append(toLabel);
  var div = $('<div/>',{class: "input-group date"});
  form.append(div);
  div.append(toInput);

  return tr;


  },
  render: function() {

    this.tableBody.empty();

  //hide alerts
  this.overlappingDatesAlert.addClass('hidden');

  this.panel.removeClass('hidden');

  var schedule = controller.getSchedule();
  console.log('render calendar' + JSON.stringify(schedule.scheduleList));

  //setting the location text
  var location = schedule.selectedLocation;
  this.locationName.text(location.name);

  var mfromDate = moment(schedule.startDate, "DD-MM-YYYY");
  var mtoDate = moment(schedule.endDate, "DD-MM-YYYY");

  this.dateHeader.text(mfromDate.format('Do MMM YYYY') + ' to '  + mtoDate.format('Do MMM YYYY'));

  var indexCounter = 0;

  //addin the rest of the dates
  var daysCount = schedule.scheduleList.length;
  var loopCount = Math.ceil(daysCount / 7);

  //console.log('loopcpunt' + loopCount);
  for(var i = 0; i < loopCount ; i++){

    var tr = $('<tr/>',{class: 'text-center '});

    for(var j = 0; j < 7 && indexCounter < daysCount; j++){

   var scheduleItem = schedule.scheduleList[indexCounter];

    var date = moment(scheduleItem.date, "DD-MM-YYYY");
    var span =  $('<span/>',{class: 'pull-right font-16 calendar-date', text:date.format('Do')});
    var td = $('<td/>').append(span)
    .append($('<br><br>'));

    var isActive = scheduleItem.active;
    if(isActive == 1){

      var time = scheduleItem.startTime + ' to ' + scheduleItem.endTime;
      var span1 =  $('<span/>',{class: 'label font-16 apptLabel label-danger', text:time});



















      span1.on('click', (function(passedOn){


      return function(){

        $('td').removeClass('selectCell');
        $(this).parent().addClass('selectCell');
        $(this).parent().css('border-bottom','1px solid #a9ceef');



        console.log('span click');




        $('.calendar-date').removeClass('calendar-date-white');

        $(this).parent().find('.calendar-date').addClass("calendar-date-white");
        //$('#collapseExample1').collapse('toggle');

        //adding timepicker dynamically
        var fromInput = $('<input/>',{type: "text", class: ' form-control', value:passedOn.item.startTime});
        var toInput = $('<input/>',{type: "text", class: 'form-control ', value:passedOn.item.endTime});
        var id = 'collapsed-time-pickers';

        var tr = $('#collapsed-time-pickers');
        tr.remove();  //remove the previously added time pickers
        var timePickerTableRow = createScheduleView.makeTimePickersRow(id, fromInput, toInput);
        timePickerTableRow.insertAfter(passedOn.tableRow);
        timePickerTableRow.collapse('toggle');




        fromInput.datetimepicker({
        inline: false,
        format:'LT'
        });

        fromInput.on('dp.change', (function(passesOn){
        return function(){

          passesOn.scheduleObj.startTime = passesOn.self.val();
          var mStartTime = moment(passesOn.self.val(), "hh:mm A");
          passesOn.scheduleObj.startTimeMinutes = mStartTime.hours()*60 + mStartTime.minutes();
          //update label text
          passesOn.label.text(passesOn.scheduleObj.startTime + ' to ' + passesOn.scheduleObj.endTime);

          console.log(' value' + JSON.stringify(passesOn.scheduleObj));

        }
        })({self:fromInput, scheduleObj: passedOn.item, label: passedOn.timeLabel}));


        toInput.datetimepicker({
        inline: false,
        format:'LT'
        });

        toInput.on('dp.change', (function(passesOn){
        return function(){
          console.log(' value' + passesOn.self.val());
          passesOn.scheduleObj.endTime = passesOn.self.val();
          var mEndTime = moment(passesOn.self.val(), "hh:mm A");
          passesOn.scheduleObj.endTimeMinutes = mEndTime.hours()*60 + mEndTime.minutes();
          //update label text
          passesOn.label.text(passesOn.scheduleObj.startTime + ' to ' + passesOn.scheduleObj.endTime);
        }
        })({self:toInput, scheduleObj: passedOn.item, label: passedOn.timeLabel}));


      }

      })({tableRow: tr, item: scheduleItem, timeLabel: span1}));

      td.append(span1);
    } else{
      var span1 =  $('<span/>',{class: 'label font-16 label-info', text:'No Schedule'});
      td.append(span1);
    }


      td.on('mouseover',(function(self){
          return function(){
          console.log("mouse over");

          console.log('mouse over color');
          if(self.hasClass('selectCell')){
          self.removeClass('hovercollapse');

          }else{
          self.addClass('hovercollapse');
          }


          }
        })(td));


        td.on('mouseout',(function(self){
            return function(){
            console.log("mouse over");

            console.log('mouse over color');
            if(self.hasClass('selectCell')){
            self.removeClass('hovercollapse');

            }else{
            self.removeClass('hovercollapse');
            }


            }
          })(td));

    tr.append(td);

    ++indexCounter;
    } //days of week loop

    //tr.append(td);
    this.tableBody.append(tr);

  }//week loop ends

  }
}

controller.init();

}());

});
