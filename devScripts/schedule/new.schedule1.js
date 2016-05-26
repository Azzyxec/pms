$(document).ready(function(){

    $(function(){

        //http://momentjs.com/ good help for date formatting and stuff


        var schedulemodel = {
          startDate: "",
          endDate: "",
          scheduleDaysCount: 0,
          workLocations: [],
          selectedLocation:{id:0, name:""},
          schedule:null
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
               console.log('response ' + JSON.stringify(response));
               schedulemodel.workLocations = response.data;
               stepOneView.render();
             });

          },
          updateSelectedLocation: function(id, name){
            scheduleModel.selectedLocation.id = id;
            scheduleModel.selectedLocation.name = name;
          },
          getLocationList:function(){
            return schedulemodel.workLocations;
          },
          generateModel: function(){
            var fromDateStr = stepOneView.fromDateControl.val(); //2016-05-19
            var toDateStr = stepOneView.toDateControl.val(); //2016-05-19

            var mfromDate = moment(fromDateStr, "YYYY-MM-DD");

            var mtoDate = moment(toDateStr, "YYYY-MM-DD");


            console.log('date range from ' +  mfromDate.format('DD-MM-YYYY') + ' to ' + mtoDate.format('DD-MM-YYYY'));


            //getting the difference is dates in terms of dates
            var daysDuration =  moment.duration(mtoDate.diff(mfromDate)).asDays();

            console.log('duration :' + daysDuration);

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

            var startCloneDate =  moment(mfromDate);

            for(var j = 1; j < daysDuration; j++){

                  var mdate = moment( startCloneDate.add(1, 'days'));

                  var weekDay = mdate.format('ddd');

                  if(weekArray.indexOf(weekDay)  >= 0 ){
                    console.log('contains week ' + mdate.format('ddd DD MMM YYYY'));
                  }


            }; //date loop

            console.log();

          },
          generateScheduleModel: function(){

            var fromDateStr = stepOneView.fromDateControl.val(); //2016-05-19
            var toDateStr = stepOneView.toDateControl.val(); //2016-05-19

            var mfromDate = moment(fromDateStr, "YYYY-MM-DD");

            var mtoDate = moment(toDateStr, "YYYY-MM-DD");

            schedulemodel.startDate = mfromDate.format('MM-DD-YYYY');
            schedulemodel.endDate = mtoDate.format('MM-DD-YYYY');

            //getting the difference is dates in terms of dates
            var daysDuration =  moment.duration(mtoDate.diff(mfromDate)).asDays();

            console.log('duration :' + daysDuration);

            schedulemodel.scheduleDaysCount = daysDuration;

            for(var i in  schedulemodel.locationList){

                console.log(schedulemodel.locationList[i].name);

                var startCloneDate =  moment(mfromDate);

                //pushing the start date
                var schdl = {date: startCloneDate.format('DD-MM-YYYY'),
                             momentDate: startCloneDate.format('Do MMM YY'), //moment(startCloneDate)
                             timeSlots:{startTime: 0, endTime: 0}
                            };
                schedulemodel.locationList[i].schedule.push(schdl);

                //initilizig rest of the objects
                for(var j = 1; j < daysDuration; j++){

                  console.log('date loop');

                  var mdate = moment( startCloneDate.add(1, 'days'));

                  var scheduleObj = {date: startCloneDate.format('DD-MM-YYYY'),
                                 momentDate: startCloneDate.format('Do MMM YY'), //moment(startCloneDate)
                                 timeSlots:{ startTime:0, endTime:0}
                                };

                  schedulemodel.locationList[i].schedule.push(scheduleObj);
            }; //date loop

          }; //location loop

          //  stepOneView.fromDateControl.val();
        },
        getSchedule: function() {
          return schedulemodel;
        },
        saveUpdateModelRedirect: function(){

          $.post( controller.createUpdateScheduleUrl , schedulemodel)
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

            //http://bootstrap-datepicker.readthedocs.io/en/latest/

            this.checkAllWeekDays = $('#chk-all-weekdays');
            this.chkMon = $('#chk-mon');
            this.chkTue = $('#chk-tue');
            this.chkWed = $('#chk-wed');
            this.chkThu = $('#chk-thu');
            this.chkFri = $('#chk-fri');
            this.chkSat = $('#chk-sat');
            this.chkSun = $('#chk-sun');

            //TODO testing code to be removed
            var currDate = moment();
            this.fromDateControl.val(currDate.format('YYYY-MM-DD'));
            currDate.add(5, 'days')
            this.toDateControl.val(currDate.format('YYYY-MM-DD'));

            $('#btn-schedule-next').on('click', (function(self){
              return function(){
                console.log('schedule next nclick');

                this.selectLocations.find(":selected").attr('value');
                //controller.updateSelectedLocation();
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


            this.tableHeaderRow = $('#table-header-row-schedule-calander');
            this.tableBody = document.getElementById('table-body-schedule-calander'); // $('#table-body-schedule-calander');
            //this.scheduleCreateButton = $('#btn-schedule-create');


            $('#btn-schedule-create').on('click', (function(self){
              return function(){
                console.log('schedule create click');

                controller.saveUpdateModelRedirect();

              };
            })(this));


          },
          render: function() {
            this.panel.removeClass('hidden');

            //setting table headers
            this.tableHeaderRow.empty();
            this.tableHeaderRow.append('<td>Locations</td>');
            this.tableHeaderRow.append('<td>Timings</td>');
            var scheduleModel = controller.getSchedule();


            /*
            for(var i = 0; i < scheduleModel.scheduleDaysCount; i++){

              this.tableHeaderRow.append('<td>' + scheduleModel.locationList[0].schedule[i].momentDate  + '</td>');
              console.log(JSON.stringify( scheduleModel.locationList[0].schedule[i]));
            }
            */
            //done setting table headers

            //setting table data

            //this.tableBody.empty();
            /*
            for(var i in  schedulemodel.locationList){

              var tr = document.createElement('tr');

              var td = document.createElement('td');
              td.innerHTML =  schedulemodel.locationList[i].name;
              tr.appendChild(td);

              td = document.createElement('td');
              td.innerHTML =  "Start and end times";
              tr.appendChild(td);


              console.log('schedule: ' + JSON.stringify(schedulemodel.locationList[i].schedule));

              for(j in schedulemodel.locationList[i].schedule){


                var td = document.createElement('td');

                var fromTime = document.createElement('input');
                fromTime.setAttribute('type', 'time');
                fromTime.setAttribute('class', 'form-control col-md-12');
                var minutes  = schedulemodel.locationList[i].schedule[j].timeSlots.startTime;
                minutes = parseInt(minutes, 10);

                var hr = Math.floor( minutes/60 );
                var mins = minutes  - 60*hr;
                var dat = moment({hours:hr,  minute:mins });
                console.log('hours ' + hr + ' mins ' + mins);
                fromTime.setAttribute('value', dat.format('HH:mm'));
                console.log(dat.format('HH:mm'));


                fromTime.addEventListener('change', (function(schedule){
                  return function(){

                    self = this;
                    var time = self.value;
                    var duration = moment.duration(time);

                    schedule.timeSlots.startTime = duration.asMinutes();
                    console.log("change: " + JSON.stringify(schedule));


                  }
                })(schedulemodel.locationList[i].schedule[j]));


                var toTimet = document.createElement('input');
                toTimet.setAttribute('type', 'time');
                toTimet.setAttribute('class', 'form-control col-md-12');

                minutes = schedulemodel.locationList[i].schedule[j].timeSlots.endTime;
                minutes = parseInt(minutes, 10);

                var hr = Math.floor( minutes/60 );
                var mins = minutes  - 60*hr;
                var dat = moment({hours:hr,  minute:mins });
                console.log('hours ' + hr + ' mins ' + mins);
                toTimet.setAttribute('value', dat.format('HH:mm'));
                console.log(dat.format('HH:mm'));

                //console.log('value format ' + moment.utc(duration.asSeconds()).format("HH:mm"));

                toTimet.addEventListener('change', (function(schedule){
                  return function(){

                    self = this;
                    self = this;
                    var time = self.value;
                    var duration = moment.duration(time);
                    schedule.timeSlots.endTime = duration.asMinutes();
                    console.log("change: " + JSON.stringify(schedule));

                  }
                })(schedulemodel.locationList[i].schedule[j]));

                td.appendChild(fromTime);
                td.appendChild(toTimet);
                tr.appendChild(td);
              }

              this.tableBody.appendChild(tr)

            };// location  loop

            */

          }
        }

        controller.init();

    }());

});
