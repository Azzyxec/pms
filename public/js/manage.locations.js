//helper function to get the url query parameters
var utility = {
  getURLParam: function(name){
    var url = window.location.href;

    name = name.replace(/[\[\]]/g, "\\$&");

    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    var results = regex.exec(url);

    if (!results) return null;
    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, " "));
  },
  getTimeMinutesArray:  function(){
    
  }
}

$(document).ready(function(){

    //defining the helper functions in global

    $(function(){

      console.log('Doctor Dashboard js loaded');

          //top level controller
      var controller = {
        init: function(){
          //wiring the navigation
          this.logoutUrl = "index.php/logout";
          this.doctorProfile = "index.php/doctorProfile";
          this.dashboardHomeUrl = "index.php/doctorDashboard";
          this.newAppointmentUrl = "index.php/bookAppointment";
          this.patientsEntryUrl = "index.php/patientsEntry";
          this.patientsListingUrl = "index.php/patientsListing";
          this.closeAppointmentUrl = "index.php/closeAppointment";
          this.doctorsAppointmentsListUrl = "index.php/listAppointment";

          this.newScheduleUrl = "index.php/newSchedule";
          this.listScheduleUrl = "index.php/scheduleList";
          this.addStaffUrl = "index.php/staffEntry";
          this.patientsHistoryUrl = "index.php/patientHistory";

          this.createProgramForPatientUrl = "index.php/createMedicalProgram";
          this.programmeListingsUrl = "index.php/programmeList";

          this.ManageLocationsUrl = "index.php/workLocationManagement";

          //do somethng about doctors info and registration

          //The url from the browser  can be compared to set the active navigation
          navView.init();

        }
      };

      var navView = {
        init: function(){

          //wiring the navigation clicks


          $("#pms-brand-btn-link").click(function(e){
              e.preventDefault();
              console.log('PMS brand click');

          });



          $("#btn-programme-section-link").click(function(e){
                  e.preventDefault();

          });

            $("#create-program-for-patient-section").click(function(e){
                    e.preventDefault();
            console.log('create program for patient');
            window.location.href = controller.createProgramForPatientUrl;
            });

            $("#btn-manage-locations").click(function(e){
                    e.preventDefault();
            console.log('manage locations');
            window.location.href = controller.ManageLocationsUrl;
            });



            $("#btn-list-program-section").click(function(e){
              e.preventDefault();
              window.location.href = controller.programmeListingsUrl;
            });



            $("#patients-entry-create-section-link-Btn").click(function(e){
              e.preventDefault();
              console.log('patients Entryclick');
              window.location.href = controller.patientsEntryUrl;
            });

          $("#patients-entry-list-section-link-Btn").click(function(e){
            e.preventDefault();
            console.log('patients listing click');
            window.location.href = controller.patientsListingUrl;
          });

          $("#user-Profile-Btn-Link").click(function(e){
              e.preventDefault();
              console.log('user profile click');
              window.location.href = controller.doctorProfile;

          });

          $("#doctor-dash-logout-btn").click(function(e){
            e.preventDefault();
            console.log('logout click');
            window.location.href = controller.logoutUrl;
          });

          $("#dashboard-Section-Btn").click(function(e){
              e.preventDefault();
              window.location.href = controller.dashboardHomeUrl;
              console.log('dashboard click');
          });

          $("#book-Appointments-Section-Btn").click(function(e){
              e.preventDefault();
              window.location.href = controller.newAppointmentUrl;
          });

          $("#close-Book-Appointment-Section-Link-Btn").click(function(e){
                e.preventDefault();
                window.location.href = controller.closeAppointmentUrl;
          });

          $("#view-Appointment-Section-Link-Btn").click(function(e){
                e.preventDefault();
                window.location.href = controller.doctorsAppointmentsListUrl;
          });


          $("#manage-Doctors-Schedule-Section-Link-Btn").click(function(e){
              e.preventDefault();
              console.log('schedule click');
          });

          $("#manage-schedule-create-section-link-Btn").click(function(e){
              e.preventDefault();
              console.log('new schedule click');
              window.location.href = controller.newScheduleUrl;
          });

          $("#manage-schedule-list-section-link-Btn").click(function(e){
              e.preventDefault();
              console.log('schedule list click');
              window.location.href = controller.listScheduleUrl;
          });


           $("#add-Staff-Section-Link-Btn").click(function(e){
               e.preventDefault();
               window.location.href = controller.addStaffUrl;
           });

           $("#btn-staff-listing").click(function(e){
                   e.preventDefault();

           });

           $("#patients-History-Section-Link-Btn").click(function(e){
               e.preventDefault();
               window.location.href = controller.patientsHistoryUrl;
           });

        },
        render: function(){
          //highlight the right navigation
        }
      }

    controller.init();

  }());

});

$(document).ready(function(){

    $(function(){
        console.log('Manage Locations  js loaded');

        var model = {
                      loc:{id:0, name:""},
                      list:[]
                    };

        var controller = {
          init: function(){
            this.saveUpdateLocations = "index.php/addUpdateLocation";
            this.locationListUrl = "index.php/getDoctorLocations";

            LocationView.init();
            locationListView.init();
            this.updateLocationFromServer();
          },
          persistLocationModel: function(){

            console.log('persist' + JSON.stringify(model.loc));

            $.post(controller.saveUpdateLocations , model.loc)
             .done(function( response ) {
               console.log('save response ' + JSON.stringify(response));
               controller.updateLocationFromServer();
             });

          },
          getLocationList: function(){
            return model.list;
          },
          getLocationModel: function(){
            return model.loc;
          },
          updateLocationFromServer: function(){
            $.get(controller.locationListUrl , {})
             .done(function( response ) {
               console.log('save response ' + JSON.stringify(response));
               model.list = response.data;
               locationListView.render();
             });
          },
          updateModel: function(id, name){
            model.loc.id = id;
            model.loc.name = name;
            LocationView.render();
          }
        };


        var LocationView = {
          init: function(){
            this.locationName = $('#txt-location-name');

            $('#btn-add-location').click(function(){
              console.log('save click');

              var locName = LocationView.locationName.val();

              var locationModel = controller.getLocationModel();
              locationModel.name =  locName;

              console.log(JSON.stringify(model.loc));
              LocationView.locationName.val('');
              controller.persistLocationModel();

            });

          },
          render: function(){
            var locationModel = controller.getLocationModel();
            this.locationName.val(locationModel.name);
          }
        };

        var locationListView = {
          init: function(){
            this.tableBody = $('#location-list-table-body');

          },
          render:function(){

            var locations = controller.getLocationList();

            this.tableBody.empty();

            console.log('render' + JSON.stringify(locations));

            for(var i = 0; i < locations.length; i++){
              //console.log('looping ' +  JSON.stringify (patientsList[i]));

              var tr = $('<tr/>');

              var td = $('<td/>');
              td.text(locations[i].name);
              tr.append(td);

              var td = $('<a/>',{
                text: 'Edit',
              });

              td.click((function(location){
                return function(){
                  console.log('edit click ' + JSON.stringify(location));
                  controller.updateModel(location.id, location.name);
                }
              })(locations[i]));

              tr.append(td);


              this.tableBody.append(tr);
            }

          }
        };


        controller.init();

    }());

});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvY3RvckRhc2hib2FyZC5qcyIsIm1hbmFnZS5sb2NhdGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFuYWdlLmxvY2F0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vaGVscGVyIGZ1bmN0aW9uIHRvIGdldCB0aGUgdXJsIHF1ZXJ5IHBhcmFtZXRlcnNcclxudmFyIHV0aWxpdHkgPSB7XHJcbiAgZ2V0VVJMUGFyYW06IGZ1bmN0aW9uKG5hbWUpe1xyXG4gICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xyXG5cclxuICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoL1tcXFtcXF1dL2csIFwiXFxcXCQmXCIpO1xyXG5cclxuICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAoXCJbPyZdXCIgKyBuYW1lICsgXCIoPShbXiYjXSopfCZ8I3wkKVwiKTtcclxuICAgIHZhciByZXN1bHRzID0gcmVnZXguZXhlYyh1cmwpO1xyXG5cclxuICAgIGlmICghcmVzdWx0cykgcmV0dXJuIG51bGw7XHJcbiAgICBpZiAoIXJlc3VsdHNbMl0pIHJldHVybiAnJztcclxuXHJcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHJlc3VsdHNbMl0ucmVwbGFjZSgvXFwrL2csIFwiIFwiKSk7XHJcbiAgfSxcclxuICBnZXRUaW1lTWludXRlc0FycmF5OiAgZnVuY3Rpb24oKXtcclxuICAgIFxyXG4gIH1cclxufVxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuXHJcbiAgICAvL2RlZmluaW5nIHRoZSBoZWxwZXIgZnVuY3Rpb25zIGluIGdsb2JhbFxyXG5cclxuICAgICQoZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKCdEb2N0b3IgRGFzaGJvYXJkIGpzIGxvYWRlZCcpO1xyXG5cclxuICAgICAgICAgIC8vdG9wIGxldmVsIGNvbnRyb2xsZXJcclxuICAgICAgdmFyIGNvbnRyb2xsZXIgPSB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgIC8vd2lyaW5nIHRoZSBuYXZpZ2F0aW9uXHJcbiAgICAgICAgICB0aGlzLmxvZ291dFVybCA9IFwiaW5kZXgucGhwL2xvZ291dFwiO1xyXG4gICAgICAgICAgdGhpcy5kb2N0b3JQcm9maWxlID0gXCJpbmRleC5waHAvZG9jdG9yUHJvZmlsZVwiO1xyXG4gICAgICAgICAgdGhpcy5kYXNoYm9hcmRIb21lVXJsID0gXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkXCI7XHJcbiAgICAgICAgICB0aGlzLm5ld0FwcG9pbnRtZW50VXJsID0gXCJpbmRleC5waHAvYm9va0FwcG9pbnRtZW50XCI7XHJcbiAgICAgICAgICB0aGlzLnBhdGllbnRzRW50cnlVcmwgPSBcImluZGV4LnBocC9wYXRpZW50c0VudHJ5XCI7XHJcbiAgICAgICAgICB0aGlzLnBhdGllbnRzTGlzdGluZ1VybCA9IFwiaW5kZXgucGhwL3BhdGllbnRzTGlzdGluZ1wiO1xyXG4gICAgICAgICAgdGhpcy5jbG9zZUFwcG9pbnRtZW50VXJsID0gXCJpbmRleC5waHAvY2xvc2VBcHBvaW50bWVudFwiO1xyXG4gICAgICAgICAgdGhpcy5kb2N0b3JzQXBwb2ludG1lbnRzTGlzdFVybCA9IFwiaW5kZXgucGhwL2xpc3RBcHBvaW50bWVudFwiO1xyXG5cclxuICAgICAgICAgIHRoaXMubmV3U2NoZWR1bGVVcmwgPSBcImluZGV4LnBocC9uZXdTY2hlZHVsZVwiO1xyXG4gICAgICAgICAgdGhpcy5saXN0U2NoZWR1bGVVcmwgPSBcImluZGV4LnBocC9zY2hlZHVsZUxpc3RcIjtcclxuICAgICAgICAgIHRoaXMuYWRkU3RhZmZVcmwgPSBcImluZGV4LnBocC9zdGFmZkVudHJ5XCI7XHJcbiAgICAgICAgICB0aGlzLnBhdGllbnRzSGlzdG9yeVVybCA9IFwiaW5kZXgucGhwL3BhdGllbnRIaXN0b3J5XCI7XHJcblxyXG4gICAgICAgICAgdGhpcy5jcmVhdGVQcm9ncmFtRm9yUGF0aWVudFVybCA9IFwiaW5kZXgucGhwL2NyZWF0ZU1lZGljYWxQcm9ncmFtXCI7XHJcbiAgICAgICAgICB0aGlzLnByb2dyYW1tZUxpc3RpbmdzVXJsID0gXCJpbmRleC5waHAvcHJvZ3JhbW1lTGlzdFwiO1xyXG5cclxuICAgICAgICAgIHRoaXMuTWFuYWdlTG9jYXRpb25zVXJsID0gXCJpbmRleC5waHAvd29ya0xvY2F0aW9uTWFuYWdlbWVudFwiO1xyXG5cclxuICAgICAgICAgIC8vZG8gc29tZXRobmcgYWJvdXQgZG9jdG9ycyBpbmZvIGFuZCByZWdpc3RyYXRpb25cclxuXHJcbiAgICAgICAgICAvL1RoZSB1cmwgZnJvbSB0aGUgYnJvd3NlciAgY2FuIGJlIGNvbXBhcmVkIHRvIHNldCB0aGUgYWN0aXZlIG5hdmlnYXRpb25cclxuICAgICAgICAgIG5hdlZpZXcuaW5pdCgpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICB2YXIgbmF2VmlldyA9IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgIC8vd2lyaW5nIHRoZSBuYXZpZ2F0aW9uIGNsaWNrc1xyXG5cclxuXHJcbiAgICAgICAgICAkKFwiI3Btcy1icmFuZC1idG4tbGlua1wiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1BNUyBicmFuZCBjbGljaycpO1xyXG5cclxuICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgJChcIiNidG4tcHJvZ3JhbW1lLXNlY3Rpb24tbGlua1wiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJChcIiNjcmVhdGUtcHJvZ3JhbS1mb3ItcGF0aWVudC1zZWN0aW9uXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NyZWF0ZSBwcm9ncmFtIGZvciBwYXRpZW50Jyk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5jcmVhdGVQcm9ncmFtRm9yUGF0aWVudFVybDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKFwiI2J0bi1tYW5hZ2UtbG9jYXRpb25zXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ21hbmFnZSBsb2NhdGlvbnMnKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLk1hbmFnZUxvY2F0aW9uc1VybDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoXCIjYnRuLWxpc3QtcHJvZ3JhbS1zZWN0aW9uXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIucHJvZ3JhbW1lTGlzdGluZ3NVcmw7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKFwiI3BhdGllbnRzLWVudHJ5LWNyZWF0ZS1zZWN0aW9uLWxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygncGF0aWVudHMgRW50cnljbGljaycpO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5wYXRpZW50c0VudHJ5VXJsO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI3BhdGllbnRzLWVudHJ5LWxpc3Qtc2VjdGlvbi1saW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncGF0aWVudHMgbGlzdGluZyBjbGljaycpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIucGF0aWVudHNMaXN0aW5nVXJsO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiN1c2VyLVByb2ZpbGUtQnRuLUxpbmtcIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd1c2VyIHByb2ZpbGUgY2xpY2snKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuZG9jdG9yUHJvZmlsZTtcclxuXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI2RvY3Rvci1kYXNoLWxvZ291dC1idG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvZ291dCBjbGljaycpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIubG9nb3V0VXJsO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiNkYXNoYm9hcmQtU2VjdGlvbi1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5kYXNoYm9hcmRIb21lVXJsO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkYXNoYm9hcmQgY2xpY2snKTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICQoXCIjYm9vay1BcHBvaW50bWVudHMtU2VjdGlvbi1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5uZXdBcHBvaW50bWVudFVybDtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICQoXCIjY2xvc2UtQm9vay1BcHBvaW50bWVudC1TZWN0aW9uLUxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmNsb3NlQXBwb2ludG1lbnRVcmw7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI3ZpZXctQXBwb2ludG1lbnQtU2VjdGlvbi1MaW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5kb2N0b3JzQXBwb2ludG1lbnRzTGlzdFVybDtcclxuICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAkKFwiI21hbmFnZS1Eb2N0b3JzLVNjaGVkdWxlLVNlY3Rpb24tTGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzY2hlZHVsZSBjbGljaycpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiNtYW5hZ2Utc2NoZWR1bGUtY3JlYXRlLXNlY3Rpb24tbGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCduZXcgc2NoZWR1bGUgY2xpY2snKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIubmV3U2NoZWR1bGVVcmw7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI21hbmFnZS1zY2hlZHVsZS1saXN0LXNlY3Rpb24tbGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzY2hlZHVsZSBsaXN0IGNsaWNrJyk7XHJcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmxpc3RTY2hlZHVsZVVybDtcclxuICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgJChcIiNhZGQtU3RhZmYtU2VjdGlvbi1MaW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuYWRkU3RhZmZVcmw7XHJcbiAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICQoXCIjYnRuLXN0YWZmLWxpc3RpbmdcIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAkKFwiI3BhdGllbnRzLUhpc3RvcnktU2VjdGlvbi1MaW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIucGF0aWVudHNIaXN0b3J5VXJsO1xyXG4gICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKXtcclxuICAgICAgICAgIC8vaGlnaGxpZ2h0IHRoZSByaWdodCBuYXZpZ2F0aW9uXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgY29udHJvbGxlci5pbml0KCk7XHJcblxyXG4gIH0oKSk7XHJcblxyXG59KTtcclxuIiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuXHJcbiAgICAkKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ01hbmFnZSBMb2NhdGlvbnMgIGpzIGxvYWRlZCcpO1xyXG5cclxuICAgICAgICB2YXIgbW9kZWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBsb2M6e2lkOjAsIG5hbWU6XCJcIn0sXHJcbiAgICAgICAgICAgICAgICAgICAgICBsaXN0OltdXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSB7XHJcbiAgICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVVcGRhdGVMb2NhdGlvbnMgPSBcImluZGV4LnBocC9hZGRVcGRhdGVMb2NhdGlvblwiO1xyXG4gICAgICAgICAgICB0aGlzLmxvY2F0aW9uTGlzdFVybCA9IFwiaW5kZXgucGhwL2dldERvY3RvckxvY2F0aW9uc1wiO1xyXG5cclxuICAgICAgICAgICAgTG9jYXRpb25WaWV3LmluaXQoKTtcclxuICAgICAgICAgICAgbG9jYXRpb25MaXN0Vmlldy5pbml0KCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTG9jYXRpb25Gcm9tU2VydmVyKCk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcGVyc2lzdExvY2F0aW9uTW9kZWw6IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncGVyc2lzdCcgKyBKU09OLnN0cmluZ2lmeShtb2RlbC5sb2MpKTtcclxuXHJcbiAgICAgICAgICAgICQucG9zdChjb250cm9sbGVyLnNhdmVVcGRhdGVMb2NhdGlvbnMgLCBtb2RlbC5sb2MpXHJcbiAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiggcmVzcG9uc2UgKSB7XHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzYXZlIHJlc3BvbnNlICcgKyBKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xyXG4gICAgICAgICAgICAgICBjb250cm9sbGVyLnVwZGF0ZUxvY2F0aW9uRnJvbVNlcnZlcigpO1xyXG4gICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGdldExvY2F0aW9uTGlzdDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIG1vZGVsLmxpc3Q7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZ2V0TG9jYXRpb25Nb2RlbDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIG1vZGVsLmxvYztcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB1cGRhdGVMb2NhdGlvbkZyb21TZXJ2ZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQuZ2V0KGNvbnRyb2xsZXIubG9jYXRpb25MaXN0VXJsICwge30pXHJcbiAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiggcmVzcG9uc2UgKSB7XHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzYXZlIHJlc3BvbnNlICcgKyBKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xyXG4gICAgICAgICAgICAgICBtb2RlbC5saXN0ID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgICAgbG9jYXRpb25MaXN0Vmlldy5yZW5kZXIoKTtcclxuICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHVwZGF0ZU1vZGVsOiBmdW5jdGlvbihpZCwgbmFtZSl7XHJcbiAgICAgICAgICAgIG1vZGVsLmxvYy5pZCA9IGlkO1xyXG4gICAgICAgICAgICBtb2RlbC5sb2MubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgICAgIExvY2F0aW9uVmlldy5yZW5kZXIoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgdmFyIExvY2F0aW9uVmlldyA9IHtcclxuICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMubG9jYXRpb25OYW1lID0gJCgnI3R4dC1sb2NhdGlvbi1uYW1lJyk7XHJcblxyXG4gICAgICAgICAgICAkKCcjYnRuLWFkZC1sb2NhdGlvbicpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NhdmUgY2xpY2snKTtcclxuXHJcbiAgICAgICAgICAgICAgdmFyIGxvY05hbWUgPSBMb2NhdGlvblZpZXcubG9jYXRpb25OYW1lLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICB2YXIgbG9jYXRpb25Nb2RlbCA9IGNvbnRyb2xsZXIuZ2V0TG9jYXRpb25Nb2RlbCgpO1xyXG4gICAgICAgICAgICAgIGxvY2F0aW9uTW9kZWwubmFtZSA9ICBsb2NOYW1lO1xyXG5cclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShtb2RlbC5sb2MpKTtcclxuICAgICAgICAgICAgICBMb2NhdGlvblZpZXcubG9jYXRpb25OYW1lLnZhbCgnJyk7XHJcbiAgICAgICAgICAgICAgY29udHJvbGxlci5wZXJzaXN0TG9jYXRpb25Nb2RlbCgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyIGxvY2F0aW9uTW9kZWwgPSBjb250cm9sbGVyLmdldExvY2F0aW9uTW9kZWwoKTtcclxuICAgICAgICAgICAgdGhpcy5sb2NhdGlvbk5hbWUudmFsKGxvY2F0aW9uTW9kZWwubmFtZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIGxvY2F0aW9uTGlzdFZpZXcgPSB7XHJcbiAgICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLnRhYmxlQm9keSA9ICQoJyNsb2NhdGlvbi1saXN0LXRhYmxlLWJvZHknKTtcclxuXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcmVuZGVyOmZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgICB2YXIgbG9jYXRpb25zID0gY29udHJvbGxlci5nZXRMb2NhdGlvbkxpc3QoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudGFibGVCb2R5LmVtcHR5KCk7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncmVuZGVyJyArIEpTT04uc3RyaW5naWZ5KGxvY2F0aW9ucykpO1xyXG5cclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGxvY2F0aW9ucy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnbG9vcGluZyAnICsgIEpTT04uc3RyaW5naWZ5IChwYXRpZW50c0xpc3RbaV0pKTtcclxuXHJcbiAgICAgICAgICAgICAgdmFyIHRyID0gJCgnPHRyLz4nKTtcclxuXHJcbiAgICAgICAgICAgICAgdmFyIHRkID0gJCgnPHRkLz4nKTtcclxuICAgICAgICAgICAgICB0ZC50ZXh0KGxvY2F0aW9uc1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgICB0ci5hcHBlbmQodGQpO1xyXG5cclxuICAgICAgICAgICAgICB2YXIgdGQgPSAkKCc8YS8+Jyx7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAnRWRpdCcsXHJcbiAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgIHRkLmNsaWNrKChmdW5jdGlvbihsb2NhdGlvbil7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2VkaXQgY2xpY2sgJyArIEpTT04uc3RyaW5naWZ5KGxvY2F0aW9uKSk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIudXBkYXRlTW9kZWwobG9jYXRpb24uaWQsIGxvY2F0aW9uLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pKGxvY2F0aW9uc1tpXSkpO1xyXG5cclxuICAgICAgICAgICAgICB0ci5hcHBlbmQodGQpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgdGhpcy50YWJsZUJvZHkuYXBwZW5kKHRyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgY29udHJvbGxlci5pbml0KCk7XHJcblxyXG4gICAgfSgpKTtcclxuXHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
