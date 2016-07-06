$(document).ready(function(){

  $(function(){

    //http://momentjs.com/ good help for date formatting and stuff


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
        this.getLocationUrl = links.getLocationUrl;
        //this.scheduleListingUrl =   links.listScheduleUrl;
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

        //var mStartTime = moment(startTimeVal, "hh:mm A");
        //var mStartDate = moment({hours:0, minutes: 0});
        //mStartDate.minutes(scheduleItem.startTime);
        //console.log('start time: ' + startTimeVal + ' in minutes ' + mStartTime.duration());

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
        //console.log('duration ' + daysDuration);

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
          }else{
            console.log('something is not right');
          }

          //on success redirect
          // window.location.href = controller.scheduleListingUrl;
          /*
          if(response.data.status == "-1"){
          console.log('could not add or update');
        }else if(response.data.status == "1"){
        console.log('schedules entry is added');
      }else if(response.data.status == "2"){
      console.log('schedules entry is updated');
    }*/

  });



}
};

var stepOneView = {

    init: function(){
      this.panel = $('#schedule-step-one');
      this.selectLocations = $('#sel-work-locations');
      this.fromDateControl = $('#from-date');
      this.toDateControl = $('#to-date');
      this.fromTimeControl = $('#from-time');
      this.toTimeControl = $('#to-time');
      this.fromDateControl.datetimepicker({
        inline: false,
        format:'DD-MM-YYYY'
      });
      this.toDateControl.datetimepicker({
        inline: false,
        format:'DD-MM-YYYY'
      });

      this.fromTimeControl.val("09:00:AM");
      this.fromTimeControl.datetimepicker({
        inline: false,
        format:'LT'
      });

      this.toTimeControl.val("12:00:PM");
      this.toTimeControl.datetimepicker({
        inline: false,
        format:'LT'
      });



      //http://bootstrap-datepicker.readthedocs.io/en/latest/

      this.checkAllWeekDays = $('#chk-all-weekdays');
      this.chkMon = $('#chk-mon');
      this.chkTue = $('#chk-tue');
      this.chkWed = $('#chk-wed');
      this.chkThu = $('#chk-thu');
      this.chkFri = $('#chk-fri');
      this.chkSat = $('#chk-sat');
      this.chkSun = $('#chk-sun');

      //setting all check boxes as checked
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


  },
  makeTimePickersRow: function(idVal, fromInput, toInput){

    var tr =  $('<tr/>',{class: 'collapse collapse-style',
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

    /*
    <tr  class="collapse collapse-style"  id="collapseExample1">
    <td colspan="7" >
    <form class="form-inline">

    <div class="form-group">
    <div id="datetimepicker5">
    <label class="font-18">From</label></div>
    </div>
    <div class="form-group">
    <label  class="col-sm-2 control-label">To</label>
    <input type="text" class="form-control"  id="datetimepicker6">
    </div>

    </form>

    </td>
    </tr>
    */

  },
  render: function() {
    /*
    $('#datetimepicker5').datetimepicker({
      inline: false,
      format:'LT'
    });

    $('#datetimepicker6').datetimepicker({
      inline: false,
      format:'LT'
    });
    */
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

    //when first day is not monday, setting the first row
    var startDay = mfromDate.format('ddd');

    if(startDay != 'Mon'){

      var blocksToAdd = mfromDate.day() - 1;

      var calanderStartDate = moment(mfromDate).subtract(blocksToAdd, 'days');

      var tr = $('<tr/>',{class: 'text-center'});

      for(var i = 0; i < blocksToAdd ; i++){

        var span =  $('<span/>',{class: 'pull-right font-16 calendar-date', text:calanderStartDate.format('Do')});
        var span1 =  $('<span/>',{class: 'label font-16 label-info', text:'No Schedule'});

        var td = $('<td/>').append(span)
        .append($('<br><br>'))
        .append(span1);

        tr.append(td);

        calanderStartDate.add(1, 'd');

      }

      var remainingCoukmnCount = 7 - blocksToAdd;

      for(var i = 0; i < remainingCoukmnCount ; i++){

        var scheduleItem = schedule.scheduleList[indexCounter];

        var date = moment(scheduleItem.date, "DD-MM-YYYY");

        var span =  $('<span/>',{class: 'pull-right font-16 calendar-date', text:date.format('Do')});

        var td = $('<td/>').append(span)
        .append($('<br><br>'));

        var isActive = scheduleItem.active;
        if(isActive == 1){
          var time = scheduleItem.startTime + ' - ' + scheduleItem.endTime;
          var span1 =  $('<span/>',{class: 'schedule-timing-span font-10', text:time});

          span1.on('click', (function(passedOn){
            
            return function(){
              console.log('span click');
       
             
              //$('#collapseExample1').collapse('toggle');

              //adding timepicker dynamically
              var fromInput = $('<input/>',{type: "text", class: 'form-control', value:passedOn.item.startTime});
              var toInput = $('<input/>',{type: "text", class: 'form-control', value:passedOn.item.endTime});
              var id = 'collapsed-time-pickers';
              var tr = $('#collapsed-time-pickers');
              tr.remove();  //remove the previously added time pickers
              var timePickerTableRow = createScheduleView.makeTimePickersRow(id, fromInput, toInput);
              timePickerTableRow.insertAfter(passedOn.tableRow);
              timePickerTableRow.collapse('toggle');

              fromInput.datetimepicker({
                inline:true,
                format:'LT'
              });

              fromInput.on('dp.change', (function(passesOn){
                return function(){
                  console.log(' value' + passesOn.self.val());
                  passesOn.scheduleObj.startTime = passesOn.self.val();
                  var mStartTime = moment(passesOn.self.val(), "hh:mm A");
                  passesOn.scheduleObj.startTimeMinutes = mStartTime.hours()*60 + mStartTime.minutes();
                  //update label text
                  passesOn.label.text(passesOn.scheduleObj.startTime + ' - ' + passesOn.scheduleObj.endTime);

                }
              })({self:fromInput, scheduleObj: passedOn.item, label: passedOn.timeLabel}));


              toInput.datetimepicker({
                inline:true,
                format:'LT'
              });

              toInput.on('dp.change', (function(passesOn){
                return function(){
                  console.log(' value' + passesOn.self.val());
                  passesOn.scheduleObj.endTime = passesOn.self.val();
                  var mEndTime = moment(passesOn.self.val(), "hh:mm A");
                  passesOn.scheduleObj.endTimeMinutes = mEndTime.hours()*60 + mEndTime.minutes();
                  //update label text
                  passesOn.label.text(passesOn.scheduleObj.startTime + ' - ' + passesOn.scheduleObj.endTime);
                }
              })({self:toInput, scheduleObj: passedOn.item, label: passedOn.timeLabel}));

            }

          })({tableRow: tr, item: scheduleItem, timeLabel: span1}));

          td.append(span1);

        } else{
          var span1 =  $('<span/>',{class: 'label font-16 label-info', text:'No Schedule'});
          td.append(span1);
        }

        tr.append(td);

        mfromDate.add(1, 'd');
        ++indexCounter;

      }

      this.tableBody.append(tr);
      /*
      <td>
      <span class="pull-right font-16 calendar-date">4</span>
      <br> <br>
      <span class="label font-16 label-info"  data-toggle="collapse" href="#collapseExample1">No Schedule</span>
      </td>

      <span class="label font-16 label-danger" data-toggle="collapse" href="#collapseExample1">14:04:Am To 14:04:Am</span>
      */

    }
    //done setting  the first row


    //addin the rest of the dates
    var daysCount = schedule.scheduleList.length;
    var loopCount = Math.ceil(daysCount / 7);

    //console.log('loopcpunt' + loopCount);
    for(var i = 0; i < loopCount ; i++){

      var tr = $('<tr/>',{class: 'text-center'});

      for(var j = 0; j < 7 && indexCounter < daysCount; j++){

        var date = moment(schedule.scheduleList[indexCounter].date, "DD-MM-YYYY");
        var span =  $('<span/>',{class: 'pull-right font-16 calendar-date', text:date.format('Do')});
        var td = $('<td/>').append(span)
        .append($('<br><br>'));

        var isActive = schedule.scheduleList[indexCounter].active;
        if(isActive == 1){
          var time = scheduleItem.startTime + ' to ' + scheduleItem.endTime;
          var span1 =  $('<span/>',{class: 'label font-16 apptLabel label-danger', text:time});

          span1.on('click', (function(passedOn){
            return function(){
              console.log('span click');
                $('td').removeClass('selectCell');
                 $('calendar-date').removeClass('calendar-date-white');
                 $(this).parent().addClass('selectCell');
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

        tr.append(td);

        ++indexCounter;
      } //days of week loop

      //tr.append(td);
      this.tableBody.append(tr);

    }//week loop ends


    /*
    <td id="table-data-template" height="100">
    <span class="pull-right font-16 calendar-date">2</span>
    <br><br>
    <span class="label font-16 label-danger" data-toggle="collapse" href="#collapseExample1">14:04:Am To 14:04:Am</span>
    </td>
    */
  }
}

controller.init();

}());

});
