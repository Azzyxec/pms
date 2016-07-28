$(document).ready(function(){

  $(function(){

    console.log('deactivate js');

    //all properties except scheduleList are view model properties
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
        this.getLocationUrl = links.getActiveLocations;
        this.getSechduleforDeactivation = links.getSechduleforDeactivation;
        this.deactivateScheduleDays = links.deactivateScheduleDays;
        this.getScheduleCalendarUrl = links.getScheduleCalendarUrl;


        stepOneView.init();
        deactivateScheduleView.init();

        //getting work locations for the doctor
        $.get( controller.getLocationUrl , {})
        .done(function( response ) {
          console.log('location response ' + JSON.stringify(response));
          scheduleModel.workLocations = response.data;
          stepOneView.render();
        });


        //Dates will be in dd mm yyyy format
        var fromDateStr = stepOneView.fromDateControl.val();
        var toDateStr = stepOneView.toDateControl.val();

        //setting the models start and end date
        scheduleModel.startDate = fromDateStr;
        scheduleModel.endDate = toDateStr;

      },
      resetScheduleList: function(){
        scheduleModel.scheduleList = [];
      },
      updateSelectedLocation: function(id, name){
        scheduleModel.selectedLocation.id = id;
        scheduleModel.selectedLocation.name = name;

        //console.log(JSON.stringify(scheduleModel.selectedLocation));
      },
      getLocationModel: function(){
        return scheduleModel.selectedLocation;
      },
      getLocationList:function(){
        return scheduleModel.workLocations;
      },
      getSchedulesFromServer: function(){



        var data = {
          locationId: scheduleModel.selectedLocation.id,
          startDate:scheduleModel.startDate,
          endDate:scheduleModel.endDate
        };

        console.log('get req ' + JSON.stringify(data));

        $.get(this.getSechduleforDeactivation , data)
        .done(function( response ) {

          console.log('locs ' + JSON.stringify(response));
          controller.generateModel(response.data.scheduleList);

        });

      },
      generateModel: function(scheduleDaysList){

        if(scheduleDaysList && scheduleDaysList.length > 0){

          for( var i = 0; i < scheduleDaysList.length; i++){

            var scheduleDay = scheduleDaysList[i];

            //scheduleDay.startTime = utility.getTimeFromMinutes(scheduleDay.startTimeMinutes);
            //scheduleDay.endTime = utility.getTimeFromMinutes(scheduleDay.endTimeMinutes);

            scheduleModel.scheduleList.push(scheduleDaysList[i]);
          }
          
        }else{
          console.log('no schedules');
          // when no results have been found
          scheduleModel.scheduleList = [];
        }

        console.log('schedule list' + JSON.stringify(scheduleModel.scheduleList));

        //move to step two
        stepOneView.panel.hide();
        deactivateScheduleView.visible(true);
        deactivateScheduleView.render();

      },
      getSchedule: function() {
        return scheduleModel;
      },
      deactivateScheduleDay: function(){
        var list = [];

        console.log('before list ' + JSON.stringify(scheduleModel.scheduleList));

        for(var i = 0; i <scheduleModel.scheduleList.length; i++ ){
          var scheduleObj = scheduleModel.scheduleList[i];
          for(var j = 0; j < scheduleObj.timings.length; j++){
            var item = scheduleObj.timings[j];
            if(item.deactivate == true){
              list.push({scheduleDayId:item.scheduleDayId});
            }
          }
        }

        //scheduleModel.scheduleList = list;

        console.log('posting ' + JSON.stringify(list));

        if(list.length > 0){

          var data = {
            locationId: scheduleModel.selectedLocation.id,
            scheduleDayIdList: list,
            scheduleCount: list.length
          };

          $.post( this.deactivateScheduleDays , data)
          .done(function( response ) {
            console.log('response ' + JSON.stringify(response));

            if(response.status == 1){
              window.location.href = controller.getScheduleCalendarUrl;
            }else if(response.status == 2){
              utility.getAlerts("Some schedules were not deactivated as there were some active appointments","alert-warning","",".container-fluid");
            }

          });

        }else{
          utility.getAlerts("Either no schedules were selected or there are no schedules that can be deactivated","alert-warning","",".container-fluid");
        }

      }
    };

    var stepOneView = {

      init: function(){
        utility.removeAlerts();
        this.panel = $('#schedule-step-one');
        this.selectLocations = $('#sel-work-locations');
        this.fromDateControl = $('#from-date');
        this.toDateControl = $('#to-date');
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

            var fromDateStr = stepOneView.fromDateControl.val();
            var toDateStr = stepOneView.toDateControl.val();

            console.log('from ui start ' + fromDateStr + ' end date ' + toDateStr);

            //setting the models start and end date
            scheduleModel.startDate = fromDateStr;
            scheduleModel.endDate = toDateStr;

            controller.updateSelectedLocation(locationId, locationName);
            controller.getSchedulesFromServer();

          };
        })(this));

      }, // init function
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

    } // render function
  };  //stepOneView object

  var deactivateScheduleView = {
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

      $('#btn-deactivate-schedule').on('click', (function(self){
        return function(){
          console.log('schedule deactivate click' + scheduleModel.scheduleList.length);


          controller.deactivateScheduleDay();


          //controller.saveUpdateModelRedirect();
        };
      })(this));

      this.backButton = $('#btn-back');

      this.backButton.on('click', function(){
        utility.removeAlerts();
        console.log("back btn init");
        stepOneView.panel.show();
        deactivateScheduleView.visible(false);
        controller.resetScheduleList();
      });

      this.visible(false);

    }, //init function
    visible: function(visible){
      if(visible){
        this.panel.removeClass('hidden');
      }else{
        this.panel.addClass('hidden');
      }
    },
    render: function() {

      var schedule = controller.getSchedule();

      var location = schedule.selectedLocation;
      this.locationName.text(location.name);

      var mfromDate = moment(schedule.startDate, "DD-MM-YYYY");
      var mtoDate = moment(schedule.endDate, "DD-MM-YYYY");

      this.dateHeader.text(mfromDate.format('Do MMM YYYY') + ' to '  + mtoDate.format('Do MMM YYYY'));

      var indexCounter = 0;

      this.tableBody.empty();

      //rendering the schedueles
      var daysCount = schedule.scheduleList.length;

      if(daysCount > 0){
        utility.getAlerts("Note: deactivation checkboxes are disabled when there are active appointments, please cancel or reschedule appointments on that day to deactivate the schedule.","alert-warning","",".container-fluid");
      }

      var loopCount = Math.ceil(daysCount / 7);

      for(var i = 0; i < loopCount ; i++){

        var tr = $('<tr/>',{class: 'text-center '});

        for(var j = 0; j < 7 && indexCounter < daysCount; j++){

          var scheduleItem = schedule.scheduleList[indexCounter];

          var date = moment(scheduleItem.date, "DD-MM-YYYY");
          var span =  $('<span/>',{class: 'pull-right font-16 calendar-date', text:date.format('Do MMM YYYY')});

          var td = $('<td/>').append(span)
          .append($('<br><br>'));

          for(var k = 0; k < scheduleItem.timings.length; k++){

            var lschedule = scheduleItem.timings[k];

            var time = utility.getTimeFromMinutes(lschedule.startTimeMinutes)
            + ' to '
            + utility.getTimeFromMinutes(lschedule.startTimeMinutes);

            var span1 =  $('<span class= "label font-16 label-custom"  >'+time+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span/>');
            var checkbox = $('<input/>',{type:'checkbox'
            ,style:'position: absolute; margin-left: -10px;  margin-top: 0px;'
            ,checked: true
          });
          span1.append(checkbox);

          td.append(span1);

          //activationg or deactivation check boxes
          if(lschedule.activeAppointments == 0){
            //there are not active appointments, allow to deactivate
            lschedule.deactivate = true;

            checkbox.on('change', (function(litem){

              return function(){
                if(this.checked){
                  //console.log('checked');
                  litem.deactivate = true;
                }else{
                  //console.log('un checked');
                  litem.deactivate = false;
                }

                console.log('checked ' + JSON.stringify(litem));

              }

            })(lschedule));

          }else{
            //there are active appointments, so disable the checkbox
            lschedule.deactivate = false;
            checkbox.prop('disabled', true);
          }

        }


        tr.append(td);

        ++indexCounter;

      }//inner days of week loop

      this.tableBody.append(tr);

    }//outer week loop ends

  } // render function
} //deactivateScheduleView object

controller.init();

}());

});
