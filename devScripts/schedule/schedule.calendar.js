$(document).ready(function(){

  $(function(){
    console.log('calander js loaded');


    var model = {
      locationList:[],
      calendarList: [],
      startDate:'',
      endDate:''
    };

    var backGroundColorList = [
      '#337ab7', //blue
      '#F44336', //red
      '#4CAF50', //green
      '#FB8C00', //orange
      '#37474F', //gray
      '#37474F', //gray
      '#37474F', //gray
      '#37474F' //gray
    ]; 

    var controller = {
      init: function(){
        this.getSechduleCalendarDetailsUrl = links.getSechduleCalendarDetailsUrl;

        calendarView.init();

        var mTodaysDate = moment();
        var day = mTodaysDate.day();
        mTodaysDate.subtract(day); //go to the first of the month

        //month
        var lstartDate = mTodaysDate.format('DD-MM-YYYY');
        mTodaysDate.add(1, 'M');
        var lendDate = mTodaysDate.format('DD-MM-YYYY');
        this.getDetailsFromServer(lstartDate, lendDate);

      },
      getLocationList: function(){
        return  model.locationList;
      },
      getStartDate: function(){
        return model.startDate;
      },
      searchSchedule: function(scheduleList, date){
        console.log('length' + scheduleList.length);
        for(var i = 0; i < scheduleList.length; i++){
          if(scheduleList[i].date == date){
            return scheduleList[i];
          }
        }
        return null;
      },
      assignColorCodesTolocationList(){

        for(var i = 0; i < model.locationList.length; i++){
          if(i < backGroundColorList.length){
            model.locationList[i].colour = backGroundColorList[i];
          }else{
            model.locationList[i].colour =  backGroundColorList[0];
          }

        }

      },
      getLocationColour: function(id){
        for(var i = 0; i < model.locationList.length; i++){
          if(model.locationList[i].id == id){
            return model.locationList[i].colour;
          }
        }
      },
      findElementInconstructedArray: function(parray, pdate){
        //console.log('length' + parray.length);
        for(var i = 0; i < parray.length; i++){
          //console.log('date ' + parray[i].date + ' ' + pdate);
          if(parray[i].date == pdate){
            return parray[i];
          }
        }
        return null;
      },
      constructScheduleListForRendering:function(){


        var mfromDate = moment(model.startDate, "DD-MM-YYYY");
        var mtoDate = moment(model.endDate, "DD-MM-YYYY");
        //console.log('date range from ' + model.startDate + ' to ' + model.endDate);
        //console.log('date range from ' + mfromDate + ' to ' + mtoDate);

        //Initilize the schedule array with items for all the days of the month
        //plus with extra days needed to fill the calendar from monday
        var constructedScheduleListModel = [];

        //finding the no of days that need to be filled, to start from monday
        var startDay = mfromDate.format('ddd');

        if(startDay != 'Mon'){

          var blocksToAdd = 0; //no of days needed to start from monday

          if(startDay == "Tue"){
            blocksToAdd = 1;
          }else if(startDay == "Wed"){
            blocksToAdd = 2;
          }else if(startDay == "Thu"){
            blocksToAdd = 3;
          }else if(startDay == "Fri"){
            blocksToAdd = 4;
          }else if(startDay == "Sat"){
            blocksToAdd = 5;
          }else if(startDay == "Sun"){
            blocksToAdd = 6;
          }

          //find the start date for monday
          var calanderStartDate = moment(mfromDate).subtract(blocksToAdd, 'days');

          //console.log('cal start date ' + calanderStartDate.format('DD-MM-YYYY'));
          //add inactve items
          for(var i = 0; i < blocksToAdd ; i++){

            var schedule = {
              isActive: false,
              date: calanderStartDate.format('DD-MM-YYYY'),
              list:[]
            };
            constructedScheduleListModel.push(schedule);
            //constructedScheduleListModel.push(calanderStartDate.format('DD-MM-YYYY'));
            calanderStartDate.add(1, 'd');
          }
        }

        //adding items for the duration of the time period
        var daysDuration =  moment.duration(mtoDate.diff(mfromDate)).asDays();

        for(var scheduleCounter = 0; scheduleCounter <= daysDuration; scheduleCounter++){

          var schedule = {
            isActive: false,
            date: mfromDate.format('DD-MM-YYYY'),
            list:[]
          };
          constructedScheduleListModel.push(schedule);
          mfromDate.add(1, 'd');
        }

        //console.log('constructed Model ' + JSON.stringify(constructedScheduleListModel));

        //looping through the schedules for each location
        if(model.calendarList){
        for(var locCounter = 0; locCounter < model.calendarList.length; locCounter++){

          var lscheduleList = model.calendarList[locCounter].scheduleList;
          var locId = model.calendarList[locCounter].locationId;

          //console.log('schedu ' + JSON.stringify(scheduleList));

          for(var scheduleCounter = 0; scheduleCounter < lscheduleList.length; scheduleCounter++){

            //console.log('schedu ' + JSON.stringify(scheduleList[scheduleCounter]));

            //get the item from the constructed array
            var item = this.findElementInconstructedArray(constructedScheduleListModel, lscheduleList[scheduleCounter].date);
            if(item){
              item.isActive = true;

              var schedule = {
                locationId: locId,
                timings: lscheduleList[scheduleCounter].timings
              }
              item.list.push(schedule);

            }

          }//inner loop for schedule items in locations


        }//outer loop for locations
      }

        //console.log('constructed Model after' + JSON.stringify(constructedScheduleListModel));

        return constructedScheduleListModel;
      },
      getDetailsFromServer: function(pstartDate, pendDate){
        $.get(this.getSechduleCalendarDetailsUrl , {startDate:pstartDate, endDate:pendDate})
        .done(function( response ) {
          console.log('locs ' + JSON.stringify(response));
          model = response.data;
          controller.assignColorCodesTolocationList();
          calendarView.render();
        });
      }
    };


    var calendarView = {
      init: function(){
        this.newScheduleButton = $("#btn-new-schedule");
        this.txtMonthHeader = $('#txt-month-header');
        this.locationListTop = $('#location-list-top');
        this.calendarTableBody = $('#calendar-body');

        this.btnPreviousSchedule = $('#btn-previous-schedule');
        this.btnNextSchedule = $('#btn-next-schedule');

        this.newScheduleButton.click(function(e){
          e.preventDefault();
          window.location.href = links.newScheduleUrl;
        });

        this.btnPreviousSchedule.click(function(e){
          e.preventDefault();

          var strDate = controller.getStartDate();
          mStartDate = moment(strDate, "DD-MM-YYYY");
          mStartDate.subtract(1, 'M');

          var day = mStartDate.day();
          mStartDate.subtract(day); //go to the first of the month

          var newStartDate =mStartDate.format('DD-MM-YYYY');
          mStartDate.add(1, 'M');
          var newEndDate = mStartDate.format('DD-MM-YYYY');

          console.log('start ' + newStartDate + ' end ' + newEndDate);
          controller.getDetailsFromServer(newStartDate, newEndDate);

        });

        this.btnNextSchedule.click(function(e){
          e.preventDefault();
          var strDate = controller.getStartDate();
          mStartDate = moment(strDate, "DD-MM-YYYY");
          mStartDate.add(1, 'M');

          var day = mStartDate.day();
          mStartDate.subtract(day); //go to the first of the month

          var newStartDate =mStartDate.format('DD-MM-YYYY');
          mStartDate.add(1, 'M');
          var newEndDate = mStartDate.format('DD-MM-YYYY');

          console.log('start ' + newStartDate + ' end ' + newEndDate);
          controller.getDetailsFromServer(newStartDate, newEndDate);
        })

      },
      render: function(){

        var strDate = controller.getStartDate();
        mStartDate = moment(strDate, "DD-MM-YYYY");
        this.txtMonthHeader.text(mStartDate.format('MMM YY'));


        //adding the locaiton list on top
        var locationList = controller.getLocationList();
        this.locationListTop.empty();

        //<li><label class="label  label-primary">&nbsp;&nbsp;</label><span class="invisible">.....</span><label>Margao </label></li>
        for(var i = 0; i < locationList.length; i++){
          //console.log(locationList[i].name);
          //label label-primary location-label
          var label = $('<label/>', {
            class: ' location-label label-primary ',
            css: {
              "background-color" : backGroundColorList[i]
            },
          }); 

          var span = $('<span/>', {
            class: 'invisible',
            text:'...'
          });
            
             var span23 = $('<span/>', {
            class: 'invisible',
            text:'...'
          });

          var label1 = $('<label/>', {
            text:locationList[i].name
          });

          var li = $('<li/>');
          li.append(label);
          label.append(span23);
         
          li.append(span);
          li.append(label1);
          this.locationListTop.append(li);
        }

        //end of adding the location list on top

        //adding the entries to the calendar

        var scheduleList = controller.constructScheduleListForRendering();
        console.log('rendering ' +JSON.stringify(scheduleList));

        var indexCounter = 0;
        var daysCount = scheduleList.length;
        var loopCount = Math.ceil(daysCount / 7);  //divide by seven days of week

        this.calendarTableBody.empty();
        for(var i = 0; i < loopCount ; i++){

          var tr = $('<tr/>',{class: 'text-center'});

          for(var j = 0; j < 7 && indexCounter < daysCount; j++){

            var scheduleItem = scheduleList[indexCounter];

            var date = moment(scheduleItem.date, "DD-MM-YYYY");
            var span =  $('<span/>',{class: 'pull-right font-16 calendar-date', text:date.format('Do')});
            var td = $('<td/>').append(span)
            .append($('<br><br>'));

            if(scheduleItem.isActive){

              var list = scheduleItem.list;

              for(var listCounter = 0; listCounter < list.length; listCounter++){

                //console.log(JSON.stringify(list[listCounter].timings));

                var timimgList = list[listCounter].timings;

                //one more loop to add the timings
                for(var timingCounter = 0; timingCounter < timimgList.length; timingCounter++){
                  //get the start and end minutes

                  var spanLocation =  $('<span/>',{class: 'location-label-2 label label-info',
                    css: { 
                      "background-color" : controller.getLocationColour(list[listCounter].locationId)
                    }
                  });


                var startTimeMinutes = timimgList[timingCounter].startTimeMinutes;
                var mstartTime = moment({ hour:0, minutes:0 });
                mstartTime.add(startTimeMinutes, 'minutes');
                var endTimeMinutes = timimgList[timingCounter].endTimeMinutes;
                var mendTime = moment({ hour:0, minutes:0 });
                mendTime.add(endTimeMinutes, 'minutes');

                //console.log(JSON.stringify(timimgList[timingCounter]));

                var time = mstartTime.format('hh:mm a') + ' - ' + mendTime.format('hh:mm a');
                var span1 =  $('<span/>',{class: 'label font-16 label-custom'});
                span1.text(time);
               
               // td.append(spanLocation);
                td.append(span1);

                spanLocation.appendTo(span1);
              }


            }

            tr.append(td);

          }else{

            var span1 =  $('<span/>',{class: 'label font-16 label-info', text:'No Schedule'});
            td.append(span1);
            tr.append(td);

          }
          +
          ++indexCounter;

        }  //inner loop

        this.calendarTableBody.append(tr);

      }//outer loop

      //adding the entries in the top row
      //var tr = $('<tr/>');
      //this.calendarBody.append(tr);

    }
  }

  controller.init();

  /*
  $(document).on("click", ".calendar-time-Btn", function (ev) {

  $(".calendar-time-Btn").parent().parent().css("background-color","white");
  $(this).parent().parent().css("background-color","#e6ecf4");
  */

}());

});
