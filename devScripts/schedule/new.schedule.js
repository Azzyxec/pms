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
            this.scheduleListingUrl =   links.listScheduleUrl;
            this.getLocationUrl = links.getLocationUrl;
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

            //date validations, cannot put previoous dates
            //cannot dates in revrese order
            //cannot make schedule for more than 60 days

            var mfromDate = moment(fromDateStr, "YYYY-MM-DD");
            var mtoDate = moment(toDateStr, "YYYY-MM-DD");

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

            for(var j = 0; j <= daysDuration; j++){

              var schedule = {
                date: mfromDate.format('DD-MM-YYYY'),
                startTime:startTimeVal,
                endTime: endTimeVal,
                active: false
              };
              scheduleModel.scheduleList.push(schedule);

              var weekDay = mfromDate.format('ddd');

              if(weekArray.indexOf(weekDay)  >= 0 ){
                    schedule.active = true;
                }

                mfromDate.add(1, 'days')

            }; //date loop

          },
        getSchedule: function() {
          return scheduleModel;
        },
        saveUpdateModelRedirect: function(){

          $.post( controller.createUpdateScheduleUrl , scheduleModel)
           .done(function( response ) {
             console.log('response ' + JSON.stringify(response));

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

            this.fromTimeControl.datetimepicker({
              inline: false,
              format:'LT'
            });

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

            this.chkMon.prop('checked', true);
            this.chkTue.prop('checked', true);
            this.chkWed.prop('checked', true);
            this.chkThu.prop('checked', true);
            this.chkFri.prop('checked', true);
            this.chkSat.prop('checked', true);
            this.chkSun.prop('checked', true);

            //TODO testing code to be removed
            var currDate = moment();
            this.fromDateControl.val(currDate.format('YYYY-MM-DD'));
            currDate.add(15, 'days')
            this.toDateControl.val(currDate.format('YYYY-MM-DD'));

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

            $('#btn-schedule-create').on('click', (function(self){
              return function(){
                console.log('schedule create click');
                controller.saveUpdateModelRedirect();
              };
            })(this));


          },
          render: function() {
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
                if(isActive){
                  var time = scheduleItem.startTime + ' to ' + scheduleItem.endTime;
                  var span1 =  $('<span/>',{class: 'label font-16 label-danger', text:time, href:'#collapseExample1'});
                  span1.attr('data-toggle', 'collapse');
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
               if(isActive){
                 var time = scheduleItem.startTime + ' to ' + scheduleItem.endTime;
                 var span1 =  $('<span/>',{class: 'label font-16 label-danger', text:time, href:'#collapseExample1'});
                 span1.attr('data-toggle', 'collapse');
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
