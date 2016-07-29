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
        '#0000FF', //blue
        '#FF0000', //red
        '#808080', //green
        '#FF4500', //orangered
        '#708090', //slategray
        '#C71585', //MEDIUMVIOLETRED
        '#FFFF00', //YELLOW
        '#FF00FF', //MAGENTA
        '#F4A460', //SANDYBROWN
        '#00FF7F', //SPRINGGREEN
        '#00FFFF', //aqua
        '#8B4513', //SADDLEBROWN
        '#663399', //REBECCAPURPLE
        '#808000', //olive
        '#FF6347', //tomato
        '#000000', //black
        '#F0F8FF', //AliceBlue
       	'#FAEBD7', //	 AntiqueWhite
       	'#7FFFD4', //	Aquamarine
       	'#F0FFFF', //	Azure
       	'#F5F5DC', //Beige
       	'#FFE4C4', //Bisque
       	'#FFEBCD', //BlanchedAlmond
       	'#8A2BE2', //BlueViolet
       	'#A52A2A', //	Brown
       	'#DEB887', //BurlyWood
       	'#5F9EA0', //CadetBlue
       	'#7FFF00', //	Chartreuse
       	'#D2691E', //	Chocolate
       	'#FF7F50', //Coral
       	'#6495ED', //	CornflowerBlue
       	'#FFF8DC', //	Cornsilk
       	'#DC143C', //	Crimson
       	'#00FFFF', //Cyan
       	'#00008B', //DarkBlue
       	'#008B8B', //	DarkCyan
       	'#B8860B', //DarkGoldenRod
       	'#A9A9A9', //	DarkGray
       	'#006400', //	DarkGreen
       	'#BDB76B', //DarkKhaki
       	'#8B008B', //DarkMagenta
       	'#556B2F', //DarkOliveGreen
       	'#FF8C00', //DarkOrange
       	'#9932CC', //DarkOrchid
       	'#8B0000', //DarkRed
       	'#E9967A', //	DarkSalmon
       	'#8FBC8F', //DarkSeaGreen
       	'#483D8B', //DarkSlateBlue
       	'#2F4F4F', //DarkSlateGrey
       	'#00CED1', //DarkTurquoise
       	'#9400D3', //DarkViolet
       	'#FF1493', //	DeepPink
       	'#00BFFF', //DeepSkyBlue
       	'#696969', //	DimGray
       	'#696969', //DimGrey
       	'#1E90FF', //DodgerBlue
       	'#B22222', //FireBrick
       	'#FFFAF0', //FloralWhite
       	'#228B22', //	ForestGreen
       	'#FF00FF', //Fuchsia
       	'#DCDCDC', //Gainsboro
       	'#F8F8FF', //	GhostWhite
       	'#FFD700', //	Gold
       	'#DAA520', //GoldenRod
       	'#808080', //	Gray
       	'#ADFF2F', //	GreenYellow
       	'#F0FFF0', //	HoneyDew
       	'#FF69B4', //	HotPink
        '#CD5C5C', //IndianRed
        '#4B0082', //	Indigo
       	'#FFFFF0', //Ivory
       	'#F0E68C', //Khaki
       	'#E6E6FA', //	Lavender
       	'#FFF0F5', //LavenderBlush
       	'#7CFC00', //	LawnGreen
       	'#FFFACD', //	 LemonChiffon
       	'#ADD8E6', //LightBlue
       	'#F08080', //	LightCoral
       	'#E0FFFF', //	LightCyan
       	'#FAFAD2', //	LightGoldenRodYellow
       	'#D3D3D3', //	LightGray
       	'#D3D3D3', //LightGrey
       	'#90EE90', //LightGreen
       	'#FFB6C1', //LightPink
       	'#FFA07A', //LightSalmon
       	'#20B2AA', //LightSeaGreen
       	'#87CEFA', //LightSkyBlue
       	'#778899', //	LightSlateGray
       	'#B0C4DE', //LightSteelBlue
       	'#FFFFE0', //LightYellow
       	'#00FF00', //Lime
       	'#32CD32', //	LimeGreen
       	'#FAF0E6', //	Linen
       	'#800000', //	Maroon
       	'#66CDAA', // MediumAquaMarine
       	'#0000CD', //MediumBlue
       	'#BA55D3', //	MediumOrchid
       	'#9370DB', //	MediumPurple
       	'#3CB371', //	MediumSeaGreen
       	'#7B68EE', //	MediumSlateBlue
       	'#00FA9A', //	MediumSpringGreen
       	'#48D1CC', //	MediumTurquoise
       	'#191970', //	 MidnightBlue
       	'#F5FFFA', //	 	MintCream
       	'#FFE4E1', //MistyRose
       	'#FFE4B5', //	Moccasin
       	'#FFDEAD', // NavajoWhite
       	'#000080', //	 Navy
       	'#FDF5E6', //	 	OldLace
       	'#6B8E23', //	 OliveDrab
       	'#FFA500', //	 Orange
       	'#DA70D6', // Orchid
       	'#EEE8AA', // PaleGoldenRod
       	'#98FB98', // PaleGreen
       	'#AFEEEE', //	 PaleTurquoise
       	'#DB7093', // PaleVioletRed
       	'#FFEFD5', //	 	PapayaWhip
       	'#FFDAB9', //	PeachPuff
       	'#CD853F', //	Peru
       	'#FFC0CB', //	Pink
       	'#DDA0DD', // Plum
       	'#B0E0E6', // PowderBlue
       	'#800080', //	Purple
       	'#BC8F8F', // RosyBrown
       	'#4169E1', //	 RoyalBlue
       	'#FA8072', //	Salmon
       	'#2E8B57', //	 		SeaGreen
       	'#FFF5EE', //	 		SeaShell
       	'#A0522D', //	 		Sienna
       	'#C0C0C0', // 	Silver
       	'#87CEEB', //	 		SkyBlue
       	'#6A5ACD', //	 	SlateBlue
       	'#708090', //	 SlateGrey
       	'#FFFAFA', //	Snow
       	'#4682B4', //SteelBlue
       	'#D2B48C', //	 Tan
       	'#008080', //	 Teal
       	'#D8BFD8', //	 Thistle
       	'#40E0D0', //	 		Turquoise
       	'#EE82EE', //	 		Violet
       	'#F5DEB3', //	 		Wheat
       	'#FFFFFF', //	 		White
       	'#F5F5F5', //	 			WhiteSmoke
       	'#9ACD32' //YellowGreen
    ];

    var controller = {
      init: function(){
        this.getSechduleCalendarDetailsUrl = links.getSechduleCalendarDetailsUrl;

        calendarView.init();

        var mTodaysDate = moment();


        var mstartDate = moment({ years:mTodaysDate.get('year'), months:mTodaysDate.get('month')})
        var mendDate = moment(mstartDate).endOf('month');

        //month
        var lstartDate = mstartDate.format('DD-MM-YYYY');
        var lendDate = mendDate.format('DD-MM-YYYY');

        //updating model
        model.startDate = lstartDate;
        model.endDate = lendDate;

        console.log('start date ' + lstartDate + ' end date ' + lendDate);

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

          if(response.status == 1 && model.locationList.length > 0){

            controller.assignColorCodesTolocationList();

            calendarView.render();

          }else if(response.status == 1 && model.locationList.length == 0){
            calendarView.calanderContainer.addClass('hidden');
            calendarView.newScheduleButton.prop('disabled', true);
            calendarView.deactivateScheduleButton.prop('disabled', true);
            utility.getAlerts('could not find locations, please create work locations or active existing ones', 'alert-warning', '', '.container-fluid');
          }else{
            utility.getAlerts('something is not right', 'alert-warning', '', '.container-fluid');
            console.log('something is not right');
          }




        });
      }
    };


    var calendarView = {
      init: function(){
        this.calanderContainer = $('#calander-container');
        this.newScheduleButton = $("#btn-new-schedule");
        this.deactivateScheduleButton = $("#btn-deactivate-schedule");
        this.txtMonthHeader = $('#txt-month-header');
        this.locationListTop = $('#location-list-top');
        this.calendarTableBody = $('#calendar-body');

        this.btnPreviousSchedule = $('#btn-previous-schedule');
        this.btnNextSchedule = $('#btn-next-schedule');

        this.newScheduleButton.click(function(e){
          e.preventDefault();
          window.location.href = links.newScheduleUrl;
        });

        this.deactivateScheduleButton.click(function(e){
          e.preventDefault();
          window.location.href = links.deactivateScheduleUrl;
        });

        this.btnPreviousSchedule.click(function(e){
          e.preventDefault();

          var strDate = controller.getStartDate();
          mdate = moment(strDate, "DD-MM-YYYY");

          console.log('start date ' + mdate.format('DD-MM-YYYY'));

          var mstartDate = moment({ years:mdate.get('year'), months: +mdate.get('month') - 1});

          var lstartDate = mstartDate.format('DD-MM-YYYY');

          var mendDate = mstartDate.endOf('month');
          var lendDate = mendDate.format('DD-MM-YYYY');

          //updating model
          model.startDate = lstartDate;
          model.endDate = lendDate;

          controller.getDetailsFromServer(lstartDate, lendDate);

        });

        this.btnNextSchedule.click(function(e){
          e.preventDefault();
          var strDate = controller.getStartDate();
          mdate = moment(strDate, "DD-MM-YYYY");

          console.log('start date ' + mdate.format('DD-MM-YYYY'));

          var mstartDate = moment({ years:mdate.get('year'), months: +mdate.get('month') + 1});

          var lstartDate = mstartDate.format('DD-MM-YYYY');

          var mendDate = mstartDate.endOf('month');
          var lendDate = mendDate.format('DD-MM-YYYY');

          //updating model
          model.startDate = lstartDate;
          model.endDate = lendDate;


          console.log('start ' + lstartDate + ' end ' + lendDate);
          controller.getDetailsFromServer(lstartDate, lendDate);
        })

      },
      render: function(){

        var strDate = controller.getStartDate();
        mStartDate = moment(strDate, "DD-MM-YYYY");
        this.txtMonthHeader.text(mStartDate.format('MMM YY'));


        //adding the locaiton list on top
        var locationList = controller.getLocationList();

        this.calanderContainer.removeClass('hidden');
        this.newScheduleButton.prop('disabled', false);
        this.deactivateScheduleButton.prop('disabled', false);

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
