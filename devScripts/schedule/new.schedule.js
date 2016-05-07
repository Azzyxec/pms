$(document).ready(function(){

    $(function(){

        //http://momentjs.com/ good help for date formatting and stuff


        var schedulemodel = {
          scheduleId: 0,
          startDate: "",
          endDate: "",
          scheduleDaysCount: 0,
          locationCount: 2,
          locationList:[
                        {name:"Margao", id:1, schedule:[]},
                        {name:"Vasco", id:2, schedule:[]}
          ]
        };

        var controller = {
          init: function(){
            this.createUpdateScheduleUrl = "index.php/createUpdateSchedule";
            this.scheduleListingUrl = "index.php/scheduleListing";
            stepOneView.init();
            createScheduleView.init();

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


        var stepOneView= {

          init: function(){
            this.panel = $('#schedule-step-one');
            this.fromDateControl = $('#from-date');
            this.toDateControl = $('#to-date');

            //TODO testing code to be removed
            this.fromDateControl.val('2016-05-03');
            this.toDateControl.val('2016-05-07');

            $('#btn-schedule-next').on('click', (function(self){
              return function(){
                console.log('schedule next click');

                self.panel.hide();
                createScheduleView.render();
              };
            })(this));

          }
        };

        var createScheduleView = {
          init: function(){
            this.panel = $('#schedule-step-two');
            this.tableHeaderRow = $('#table-header-row-schedule-calander');
            this.tableBody = document.getElementById('table-body-schedule-calander'); // $('#table-body-schedule-calander');
            //this.scheduleCreateButton = $('#btn-schedule-create');


            $('#btn-schedule-create').on('click', (function(self){
              return function(){
                console.log('schedule create click');

                controller.saveUpdateModelRedirect();

              };
            })(this));


            this.panel.hide();
          },
          render: function() {
            this.panel.show();

            //setting table headers
            this.tableHeaderRow.empty();
            this.tableHeaderRow.append('<td>Locations</td>');
            this.tableHeaderRow.append('<td>Timings</td>');

            controller.generateScheduleModel();
            var scheduleModel = controller.getSchedule();

            for(var i = 0; i < scheduleModel.scheduleDaysCount; i++){

              this.tableHeaderRow.append('<td>' + scheduleModel.locationList[0].schedule[i].momentDate  + '</td>');
              console.log(JSON.stringify( scheduleModel.locationList[0].schedule[i]));
            }
            //done setting table headers

            //setting table data

            //this.tableBody.empty();

            for(var i in  schedulemodel.locationList){

              var tr = document.createElement('tr');

              var td = document.createElement('td');
              td.innerHTML =  schedulemodel.locationList[i].name;
              tr.appendChild(td);

              td = document.createElement('td');
              td.innerHTML =  "Start and end times";
              tr.appendChild(td);

              /*
              column template
              <td>
                <div class="form-group col-md-3">
                  <label class="control-label">Start Time</label>
                  <input type="time" class="form-control col-md-3" name="name" value="">
                  <label class="control-label">End Time</label>
                  <input type="time" class="form-control col-md-3" name="name" value="">
                </div>
              </td>

              */

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


          }
        }

        controller.init();

    }());

});
