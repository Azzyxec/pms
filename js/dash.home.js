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
        console.log('Doctor Dashboard home js loaded');
    }());

});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvY3RvckRhc2hib2FyZC5qcyIsImRhc2guaG9tZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZGFzaC5ob21lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9oZWxwZXIgZnVuY3Rpb24gdG8gZ2V0IHRoZSB1cmwgcXVlcnkgcGFyYW1ldGVyc1xyXG52YXIgdXRpbGl0eSA9IHtcclxuICBnZXRVUkxQYXJhbTogZnVuY3Rpb24obmFtZSl7XHJcbiAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcblxyXG4gICAgbmFtZSA9IG5hbWUucmVwbGFjZSgvW1xcW1xcXV0vZywgXCJcXFxcJCZcIik7XHJcblxyXG4gICAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cChcIls/Jl1cIiArIG5hbWUgKyBcIig9KFteJiNdKil8JnwjfCQpXCIpO1xyXG4gICAgdmFyIHJlc3VsdHMgPSByZWdleC5leGVjKHVybCk7XHJcblxyXG4gICAgaWYgKCFyZXN1bHRzKSByZXR1cm4gbnVsbDtcclxuICAgIGlmICghcmVzdWx0c1syXSkgcmV0dXJuICcnO1xyXG5cclxuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocmVzdWx0c1syXS5yZXBsYWNlKC9cXCsvZywgXCIgXCIpKTtcclxuICB9XHJcbn1cclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgLy9kZWZpbmluZyB0aGUgaGVscGVyIGZ1bmN0aW9ucyBpbiBnbG9iYWxcclxuXHJcbiAgICAkKGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZygnRG9jdG9yIERhc2hib2FyZCBqcyBsb2FkZWQnKTtcclxuXHJcbiAgICAgICAgICAvL3RvcCBsZXZlbCBjb250cm9sbGVyXHJcbiAgICAgIHZhciBjb250cm9sbGVyID0ge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAvL3dpcmluZyB0aGUgbmF2aWdhdGlvblxyXG4gICAgICAgICAgdGhpcy5sb2dvdXRVcmwgPSBcImluZGV4LnBocC9sb2dvdXRcIjtcclxuICAgICAgICAgIHRoaXMuZG9jdG9yUHJvZmlsZSA9IFwiaW5kZXgucGhwL2RvY3RvclByb2ZpbGVcIjtcclxuICAgICAgICAgIHRoaXMuZGFzaGJvYXJkSG9tZVVybCA9IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZFwiO1xyXG4gICAgICAgICAgdGhpcy5uZXdBcHBvaW50bWVudFVybCA9IFwiaW5kZXgucGhwL2Jvb2tBcHBvaW50bWVudFwiO1xyXG4gICAgICAgICAgdGhpcy5wYXRpZW50c0VudHJ5VXJsID0gXCJpbmRleC5waHAvcGF0aWVudHNFbnRyeVwiO1xyXG4gICAgICAgICAgdGhpcy5wYXRpZW50c0xpc3RpbmdVcmwgPSBcImluZGV4LnBocC9wYXRpZW50c0xpc3RpbmdcIjtcclxuICAgICAgICAgIHRoaXMuY2xvc2VBcHBvaW50bWVudFVybCA9IFwiaW5kZXgucGhwL2Nsb3NlQXBwb2ludG1lbnRcIjtcclxuICAgICAgICAgIHRoaXMuZG9jdG9yc0FwcG9pbnRtZW50c0xpc3RVcmwgPSBcImluZGV4LnBocC9saXN0QXBwb2ludG1lbnRcIjtcclxuXHJcbiAgICAgICAgICB0aGlzLm5ld1NjaGVkdWxlVXJsID0gXCJpbmRleC5waHAvbmV3U2NoZWR1bGVcIjtcclxuICAgICAgICAgIHRoaXMubGlzdFNjaGVkdWxlVXJsID0gXCJpbmRleC5waHAvc2NoZWR1bGVMaXN0XCI7XHJcbiAgICAgICAgICB0aGlzLmFkZFN0YWZmVXJsID0gXCJpbmRleC5waHAvc3RhZmZFbnRyeVwiO1xyXG4gICAgICAgICAgdGhpcy5wYXRpZW50c0hpc3RvcnlVcmwgPSBcImluZGV4LnBocC9wYXRpZW50SGlzdG9yeVwiO1xyXG5cclxuICAgICAgICAgIHRoaXMuY3JlYXRlUHJvZ3JhbUZvclBhdGllbnRVcmwgPSBcImluZGV4LnBocC9jcmVhdGVNZWRpY2FsUHJvZ3JhbVwiO1xyXG4gICAgICAgICAgdGhpcy5wcm9ncmFtbWVMaXN0aW5nc1VybCA9IFwiaW5kZXgucGhwL3Byb2dyYW1tZUxpc3RcIjtcclxuXHJcbiAgICAgICAgICB0aGlzLk1hbmFnZUxvY2F0aW9uc1VybCA9IFwiaW5kZXgucGhwL3dvcmtMb2NhdGlvbk1hbmFnZW1lbnRcIjtcclxuXHJcbiAgICAgICAgICAvL2RvIHNvbWV0aG5nIGFib3V0IGRvY3RvcnMgaW5mbyBhbmQgcmVnaXN0cmF0aW9uXHJcblxyXG4gICAgICAgICAgLy9UaGUgdXJsIGZyb20gdGhlIGJyb3dzZXIgIGNhbiBiZSBjb21wYXJlZCB0byBzZXQgdGhlIGFjdGl2ZSBuYXZpZ2F0aW9uXHJcbiAgICAgICAgICBuYXZWaWV3LmluaXQoKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgdmFyIG5hdlZpZXcgPSB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAvL3dpcmluZyB0aGUgbmF2aWdhdGlvbiBjbGlja3NcclxuXHJcblxyXG4gICAgICAgICAgJChcIiNwbXMtYnJhbmQtYnRuLWxpbmtcIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQTVMgYnJhbmQgY2xpY2snKTtcclxuXHJcbiAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICQoXCIjYnRuLXByb2dyYW1tZS1zZWN0aW9uLWxpbmtcIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQoXCIjY3JlYXRlLXByb2dyYW0tZm9yLXBhdGllbnQtc2VjdGlvblwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjcmVhdGUgcHJvZ3JhbSBmb3IgcGF0aWVudCcpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuY3JlYXRlUHJvZ3JhbUZvclBhdGllbnRVcmw7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJChcIiNidG4tbWFuYWdlLWxvY2F0aW9uc1wiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtYW5hZ2UgbG9jYXRpb25zJyk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5NYW5hZ2VMb2NhdGlvbnNVcmw7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKFwiI2J0bi1saXN0LXByb2dyYW0tc2VjdGlvblwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLnByb2dyYW1tZUxpc3RpbmdzVXJsO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJChcIiNwYXRpZW50cy1lbnRyeS1jcmVhdGUtc2VjdGlvbi1saW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3BhdGllbnRzIEVudHJ5Y2xpY2snKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIucGF0aWVudHNFbnRyeVVybDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiNwYXRpZW50cy1lbnRyeS1saXN0LXNlY3Rpb24tbGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3BhdGllbnRzIGxpc3RpbmcgY2xpY2snKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLnBhdGllbnRzTGlzdGluZ1VybDtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICQoXCIjdXNlci1Qcm9maWxlLUJ0bi1MaW5rXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygndXNlciBwcm9maWxlIGNsaWNrJyk7XHJcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmRvY3RvclByb2ZpbGU7XHJcblxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiNkb2N0b3ItZGFzaC1sb2dvdXQtYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsb2dvdXQgY2xpY2snKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmxvZ291dFVybDtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICQoXCIjZGFzaGJvYXJkLVNlY3Rpb24tQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuZGFzaGJvYXJkSG9tZVVybDtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGFzaGJvYXJkIGNsaWNrJyk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI2Jvb2stQXBwb2ludG1lbnRzLVNlY3Rpb24tQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIubmV3QXBwb2ludG1lbnRVcmw7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI2Nsb3NlLUJvb2stQXBwb2ludG1lbnQtU2VjdGlvbi1MaW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5jbG9zZUFwcG9pbnRtZW50VXJsO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiN2aWV3LUFwcG9pbnRtZW50LVNlY3Rpb24tTGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuZG9jdG9yc0FwcG9pbnRtZW50c0xpc3RVcmw7XHJcbiAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgJChcIiNtYW5hZ2UtRG9jdG9ycy1TY2hlZHVsZS1TZWN0aW9uLUxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2NoZWR1bGUgY2xpY2snKTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICQoXCIjbWFuYWdlLXNjaGVkdWxlLWNyZWF0ZS1zZWN0aW9uLWxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbmV3IHNjaGVkdWxlIGNsaWNrJyk7XHJcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLm5ld1NjaGVkdWxlVXJsO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiNtYW5hZ2Utc2NoZWR1bGUtbGlzdC1zZWN0aW9uLWxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2NoZWR1bGUgbGlzdCBjbGljaycpO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5saXN0U2NoZWR1bGVVcmw7XHJcbiAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICQoXCIjYWRkLVN0YWZmLVNlY3Rpb24tTGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmFkZFN0YWZmVXJsO1xyXG4gICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAkKFwiI2J0bi1zdGFmZi1saXN0aW5nXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgJChcIiNwYXRpZW50cy1IaXN0b3J5LVNlY3Rpb24tTGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLnBhdGllbnRzSGlzdG9yeVVybDtcclxuICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAvL2hpZ2hsaWdodCB0aGUgcmlnaHQgbmF2aWdhdGlvblxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgIGNvbnRyb2xsZXIuaW5pdCgpO1xyXG5cclxuICB9KCkpO1xyXG5cclxufSk7XHJcbiIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgJChmdW5jdGlvbigpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdEb2N0b3IgRGFzaGJvYXJkIGhvbWUganMgbG9hZGVkJyk7XHJcbiAgICB9KCkpO1xyXG5cclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
