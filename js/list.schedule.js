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
        console.log('list schedule js loaded');

        var model = {};

        var controller = {
          init: function(){
            this.getListUrl = "index.php/getScheduleList";
            this.editScheduleRedirect = "index.php/scheduleEntry";

            listView.init();

            $.get( this.getListUrl , {})
             .done(function( response ) {
               //console.log('response ' + JSON.stringify(response));
               model = response.data;
               listView.render();
             });

          },
          getModel: function(){
            return model;
          }
        };


        var listView = {
          init: function() {
            this.tableBody = $('#schedule-list-table-body');


          },
          render: function() {
            var listModel = controller.getModel();

            //console.log('response ' + JSON.stringify(listModel));
            //this.tableBody.empty();
            for(var key in listModel){
              //console.log(JSON.stringify(listModel[key].startDate));

                var tr = $('<tr/>');

                var td = $('<td/>');
                td.text(listModel[key].startDate);
                tr.append(td);

                td = $('<td/>');
                td.text(listModel[key].endDate);
                tr.append(td);

                td = $('<td/>');
                td.text(listModel[key].createdDate);
                tr.append(td);


                var td = $('<a/>',{
                  text: 'Edit',
                  href: controller.editScheduleRedirect + '?scheduleId=' +  listModel[key].id
                });
                tr.append(td);

                this.tableBody.append(tr)
            }

          }
        };

        controller.init();

    }());

});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvY3RvckRhc2hib2FyZC5qcyIsImxpc3Quc2NoZWR1bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibGlzdC5zY2hlZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vaGVscGVyIGZ1bmN0aW9uIHRvIGdldCB0aGUgdXJsIHF1ZXJ5IHBhcmFtZXRlcnNcclxudmFyIHV0aWxpdHkgPSB7XHJcbiAgZ2V0VVJMUGFyYW06IGZ1bmN0aW9uKG5hbWUpe1xyXG4gICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xyXG5cclxuICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoL1tcXFtcXF1dL2csIFwiXFxcXCQmXCIpO1xyXG5cclxuICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAoXCJbPyZdXCIgKyBuYW1lICsgXCIoPShbXiYjXSopfCZ8I3wkKVwiKTtcclxuICAgIHZhciByZXN1bHRzID0gcmVnZXguZXhlYyh1cmwpO1xyXG5cclxuICAgIGlmICghcmVzdWx0cykgcmV0dXJuIG51bGw7XHJcbiAgICBpZiAoIXJlc3VsdHNbMl0pIHJldHVybiAnJztcclxuXHJcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHJlc3VsdHNbMl0ucmVwbGFjZSgvXFwrL2csIFwiIFwiKSk7XHJcbiAgfVxyXG59XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG5cclxuICAgIC8vZGVmaW5pbmcgdGhlIGhlbHBlciBmdW5jdGlvbnMgaW4gZ2xvYmFsXHJcblxyXG4gICAgJChmdW5jdGlvbigpe1xyXG5cclxuICAgICAgY29uc29sZS5sb2coJ0RvY3RvciBEYXNoYm9hcmQganMgbG9hZGVkJyk7XHJcblxyXG4gICAgICAgICAgLy90b3AgbGV2ZWwgY29udHJvbGxlclxyXG4gICAgICB2YXIgY29udHJvbGxlciA9IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgLy93aXJpbmcgdGhlIG5hdmlnYXRpb25cclxuICAgICAgICAgIHRoaXMubG9nb3V0VXJsID0gXCJpbmRleC5waHAvbG9nb3V0XCI7XHJcbiAgICAgICAgICB0aGlzLmRvY3RvclByb2ZpbGUgPSBcImluZGV4LnBocC9kb2N0b3JQcm9maWxlXCI7XHJcbiAgICAgICAgICB0aGlzLmRhc2hib2FyZEhvbWVVcmwgPSBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmRcIjtcclxuICAgICAgICAgIHRoaXMubmV3QXBwb2ludG1lbnRVcmwgPSBcImluZGV4LnBocC9ib29rQXBwb2ludG1lbnRcIjtcclxuICAgICAgICAgIHRoaXMucGF0aWVudHNFbnRyeVVybCA9IFwiaW5kZXgucGhwL3BhdGllbnRzRW50cnlcIjtcclxuICAgICAgICAgIHRoaXMucGF0aWVudHNMaXN0aW5nVXJsID0gXCJpbmRleC5waHAvcGF0aWVudHNMaXN0aW5nXCI7XHJcbiAgICAgICAgICB0aGlzLmNsb3NlQXBwb2ludG1lbnRVcmwgPSBcImluZGV4LnBocC9jbG9zZUFwcG9pbnRtZW50XCI7XHJcbiAgICAgICAgICB0aGlzLmRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsID0gXCJpbmRleC5waHAvbGlzdEFwcG9pbnRtZW50XCI7XHJcblxyXG4gICAgICAgICAgdGhpcy5uZXdTY2hlZHVsZVVybCA9IFwiaW5kZXgucGhwL25ld1NjaGVkdWxlXCI7XHJcbiAgICAgICAgICB0aGlzLmxpc3RTY2hlZHVsZVVybCA9IFwiaW5kZXgucGhwL3NjaGVkdWxlTGlzdFwiO1xyXG4gICAgICAgICAgdGhpcy5hZGRTdGFmZlVybCA9IFwiaW5kZXgucGhwL3N0YWZmRW50cnlcIjtcclxuICAgICAgICAgIHRoaXMucGF0aWVudHNIaXN0b3J5VXJsID0gXCJpbmRleC5waHAvcGF0aWVudEhpc3RvcnlcIjtcclxuXHJcbiAgICAgICAgICB0aGlzLmNyZWF0ZVByb2dyYW1Gb3JQYXRpZW50VXJsID0gXCJpbmRleC5waHAvY3JlYXRlTWVkaWNhbFByb2dyYW1cIjtcclxuICAgICAgICAgIHRoaXMucHJvZ3JhbW1lTGlzdGluZ3NVcmwgPSBcImluZGV4LnBocC9wcm9ncmFtbWVMaXN0XCI7XHJcblxyXG4gICAgICAgICAgdGhpcy5NYW5hZ2VMb2NhdGlvbnNVcmwgPSBcImluZGV4LnBocC93b3JrTG9jYXRpb25NYW5hZ2VtZW50XCI7XHJcblxyXG4gICAgICAgICAgLy9kbyBzb21ldGhuZyBhYm91dCBkb2N0b3JzIGluZm8gYW5kIHJlZ2lzdHJhdGlvblxyXG5cclxuICAgICAgICAgIC8vVGhlIHVybCBmcm9tIHRoZSBicm93c2VyICBjYW4gYmUgY29tcGFyZWQgdG8gc2V0IHRoZSBhY3RpdmUgbmF2aWdhdGlvblxyXG4gICAgICAgICAgbmF2Vmlldy5pbml0KCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIHZhciBuYXZWaWV3ID0ge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgLy93aXJpbmcgdGhlIG5hdmlnYXRpb24gY2xpY2tzXHJcblxyXG5cclxuICAgICAgICAgICQoXCIjcG1zLWJyYW5kLWJ0bi1saW5rXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUE1TIGJyYW5kIGNsaWNrJyk7XHJcblxyXG4gICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAkKFwiI2J0bi1wcm9ncmFtbWUtc2VjdGlvbi1saW5rXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKFwiI2NyZWF0ZS1wcm9ncmFtLWZvci1wYXRpZW50LXNlY3Rpb25cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY3JlYXRlIHByb2dyYW0gZm9yIHBhdGllbnQnKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmNyZWF0ZVByb2dyYW1Gb3JQYXRpZW50VXJsO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQoXCIjYnRuLW1hbmFnZS1sb2NhdGlvbnNcIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbWFuYWdlIGxvY2F0aW9ucycpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuTWFuYWdlTG9jYXRpb25zVXJsO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJChcIiNidG4tbGlzdC1wcm9ncmFtLXNlY3Rpb25cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5wcm9ncmFtbWVMaXN0aW5nc1VybDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoXCIjcGF0aWVudHMtZW50cnktY3JlYXRlLXNlY3Rpb24tbGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwYXRpZW50cyBFbnRyeWNsaWNrJyk7XHJcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLnBhdGllbnRzRW50cnlVcmw7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICQoXCIjcGF0aWVudHMtZW50cnktbGlzdC1zZWN0aW9uLWxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwYXRpZW50cyBsaXN0aW5nIGNsaWNrJyk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5wYXRpZW50c0xpc3RpbmdVcmw7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI3VzZXItUHJvZmlsZS1CdG4tTGlua1wiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3VzZXIgcHJvZmlsZSBjbGljaycpO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5kb2N0b3JQcm9maWxlO1xyXG5cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICQoXCIjZG9jdG9yLWRhc2gtbG9nb3V0LWJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbG9nb3V0IGNsaWNrJyk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5sb2dvdXRVcmw7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI2Rhc2hib2FyZC1TZWN0aW9uLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmRhc2hib2FyZEhvbWVVcmw7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Rhc2hib2FyZCBjbGljaycpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiNib29rLUFwcG9pbnRtZW50cy1TZWN0aW9uLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLm5ld0FwcG9pbnRtZW50VXJsO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiNjbG9zZS1Cb29rLUFwcG9pbnRtZW50LVNlY3Rpb24tTGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuY2xvc2VBcHBvaW50bWVudFVybDtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICQoXCIjdmlldy1BcHBvaW50bWVudC1TZWN0aW9uLUxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICQoXCIjbWFuYWdlLURvY3RvcnMtU2NoZWR1bGUtU2VjdGlvbi1MaW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NjaGVkdWxlIGNsaWNrJyk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI21hbmFnZS1zY2hlZHVsZS1jcmVhdGUtc2VjdGlvbi1saW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ25ldyBzY2hlZHVsZSBjbGljaycpO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5uZXdTY2hlZHVsZVVybDtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICQoXCIjbWFuYWdlLXNjaGVkdWxlLWxpc3Qtc2VjdGlvbi1saW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NjaGVkdWxlIGxpc3QgY2xpY2snKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIubGlzdFNjaGVkdWxlVXJsO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAkKFwiI2FkZC1TdGFmZi1TZWN0aW9uLUxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5hZGRTdGFmZlVybDtcclxuICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgJChcIiNidG4tc3RhZmYtbGlzdGluZ1wiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICQoXCIjcGF0aWVudHMtSGlzdG9yeS1TZWN0aW9uLUxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5wYXRpZW50c0hpc3RvcnlVcmw7XHJcbiAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgLy9oaWdobGlnaHQgdGhlIHJpZ2h0IG5hdmlnYXRpb25cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICBjb250cm9sbGVyLmluaXQoKTtcclxuXHJcbiAgfSgpKTtcclxuXHJcbn0pO1xyXG4iLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG5cclxuICAgICQoZnVuY3Rpb24oKXtcclxuICAgICAgICBjb25zb2xlLmxvZygnbGlzdCBzY2hlZHVsZSBqcyBsb2FkZWQnKTtcclxuXHJcbiAgICAgICAgdmFyIG1vZGVsID0ge307XHJcblxyXG4gICAgICAgIHZhciBjb250cm9sbGVyID0ge1xyXG4gICAgICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5nZXRMaXN0VXJsID0gXCJpbmRleC5waHAvZ2V0U2NoZWR1bGVMaXN0XCI7XHJcbiAgICAgICAgICAgIHRoaXMuZWRpdFNjaGVkdWxlUmVkaXJlY3QgPSBcImluZGV4LnBocC9zY2hlZHVsZUVudHJ5XCI7XHJcblxyXG4gICAgICAgICAgICBsaXN0Vmlldy5pbml0KCk7XHJcblxyXG4gICAgICAgICAgICAkLmdldCggdGhpcy5nZXRMaXN0VXJsICwge30pXHJcbiAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiggcmVzcG9uc2UgKSB7XHJcbiAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3Jlc3BvbnNlICcgKyBKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xyXG4gICAgICAgICAgICAgICBtb2RlbCA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICAgICAgIGxpc3RWaWV3LnJlbmRlcigpO1xyXG4gICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGdldE1vZGVsOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICByZXR1cm4gbW9kZWw7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIHZhciBsaXN0VmlldyA9IHtcclxuICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLnRhYmxlQm9keSA9ICQoJyNzY2hlZHVsZS1saXN0LXRhYmxlLWJvZHknKTtcclxuXHJcblxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBsaXN0TW9kZWwgPSBjb250cm9sbGVyLmdldE1vZGVsKCk7XHJcblxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdyZXNwb25zZSAnICsgSlNPTi5zdHJpbmdpZnkobGlzdE1vZGVsKSk7XHJcbiAgICAgICAgICAgIC8vdGhpcy50YWJsZUJvZHkuZW1wdHkoKTtcclxuICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gbGlzdE1vZGVsKXtcclxuICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGxpc3RNb2RlbFtrZXldLnN0YXJ0RGF0ZSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB0ciA9ICQoJzx0ci8+Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRkID0gJCgnPHRkLz4nKTtcclxuICAgICAgICAgICAgICAgIHRkLnRleHQobGlzdE1vZGVsW2tleV0uc3RhcnREYXRlKTtcclxuICAgICAgICAgICAgICAgIHRyLmFwcGVuZCh0ZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGQgPSAkKCc8dGQvPicpO1xyXG4gICAgICAgICAgICAgICAgdGQudGV4dChsaXN0TW9kZWxba2V5XS5lbmREYXRlKTtcclxuICAgICAgICAgICAgICAgIHRyLmFwcGVuZCh0ZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGQgPSAkKCc8dGQvPicpO1xyXG4gICAgICAgICAgICAgICAgdGQudGV4dChsaXN0TW9kZWxba2V5XS5jcmVhdGVkRGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB0ci5hcHBlbmQodGQpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdGQgPSAkKCc8YS8+Jyx7XHJcbiAgICAgICAgICAgICAgICAgIHRleHQ6ICdFZGl0JyxcclxuICAgICAgICAgICAgICAgICAgaHJlZjogY29udHJvbGxlci5lZGl0U2NoZWR1bGVSZWRpcmVjdCArICc/c2NoZWR1bGVJZD0nICsgIGxpc3RNb2RlbFtrZXldLmlkXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRyLmFwcGVuZCh0ZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy50YWJsZUJvZHkuYXBwZW5kKHRyKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnRyb2xsZXIuaW5pdCgpO1xyXG5cclxuICAgIH0oKSk7XHJcblxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
