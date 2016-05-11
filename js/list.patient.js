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
          this.createProgramForPatientUrl = "index.php/createProgramForPatient";
          this.newScheduleUrl = "index.php/newSchedule";
          this.listScheduleUrl = "index.php/scheduleList";
          this.addStaffUrl = "index.php/staffEntry";
          this.patientsHistoryUrl = "index.php/patientHistory";

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

            $("#create-program-for-patient-section").click(function(e){
                    e.preventDefault();
            console.log('create program for patient');
            window.location.href = controller.createProgramForPatientUrl;
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
        console.log('patient listings js loaded');

        var listModel = {};

        var controller = {
          init: function(){
            this.patientListingUrl = "index.php/getPatientList";
            this.editPatientRedirect = "index.php/patientsEntry";

            listView.init();

            //getting the programme list for the doctor
            $.get( controller.patientListingUrl , {})
            .done(function( response ) {
              //console.log("patients list: " + JSON.stringify(response));
              listModel = response.data;
              listView.render();
            });

          },
          getListModel: function(){
            return listModel;
          },
          patientEditRedirect: function(patientId){
              window.location.href = controller.editPatientRedirect + '?id=' +  patientId;
          }
        };


        var listView = {
          init: function(){
            this.tablebody = $('#patient-list-table-body');


          },
          render:  function(){

            var patientsList = controller.getListModel();
            //console.log('model in view' + JSON.stringify (patientsList));

            for(var i = 0; i < patientsList.length; i++){
              //console.log('looping ' +  JSON.stringify (patientsList[i]));

              var tr = $('<tr/>');

              var td = $('<td/>');
              td.text(patientsList[i].name);
              tr.append(td);

              var td = $('<td/>');
              td.text(patientsList[i].dateOfBirth);
              tr.append(td);

              var td = $('<td/>');
              td.text(patientsList[i].bloodGroup);
              tr.append(td);

              var td = $('<td/>');
              td.text(patientsList[i].gender);
              tr.append(td);

              var td = $('<td/>');
              td.text(patientsList[i].contact);
              tr.append(td);

              var td = $('<a/>',{
                text: 'Edit'
              });
              td.click((function( id){
                //e.preventDefault();
                return function(){
                  //console.log(id);
                  controller.patientEditRedirect(id);
                }
              })(patientsList[i].id));
              tr.append(td);


              this.tablebody.append(tr);
            }

          }
        };


        controller.init();

    }());

});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvY3RvckRhc2hib2FyZC5qcyIsImxpc3QucGF0aWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibGlzdC5wYXRpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9oZWxwZXIgZnVuY3Rpb24gdG8gZ2V0IHRoZSB1cmwgcXVlcnkgcGFyYW1ldGVyc1xyXG52YXIgdXRpbGl0eSA9IHtcclxuICBnZXRVUkxQYXJhbTogZnVuY3Rpb24obmFtZSl7XHJcbiAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcblxyXG4gICAgbmFtZSA9IG5hbWUucmVwbGFjZSgvW1xcW1xcXV0vZywgXCJcXFxcJCZcIik7XHJcblxyXG4gICAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cChcIls/Jl1cIiArIG5hbWUgKyBcIig9KFteJiNdKil8JnwjfCQpXCIpO1xyXG4gICAgdmFyIHJlc3VsdHMgPSByZWdleC5leGVjKHVybCk7XHJcblxyXG4gICAgaWYgKCFyZXN1bHRzKSByZXR1cm4gbnVsbDtcclxuICAgIGlmICghcmVzdWx0c1syXSkgcmV0dXJuICcnO1xyXG5cclxuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocmVzdWx0c1syXS5yZXBsYWNlKC9cXCsvZywgXCIgXCIpKTtcclxuICB9XHJcbn1cclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgLy9kZWZpbmluZyB0aGUgaGVscGVyIGZ1bmN0aW9ucyBpbiBnbG9iYWxcclxuXHJcbiAgICAkKGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZygnRG9jdG9yIERhc2hib2FyZCBqcyBsb2FkZWQnKTtcclxuXHJcbiAgICAgICAgICAvL3RvcCBsZXZlbCBjb250cm9sbGVyXHJcbiAgICAgIHZhciBjb250cm9sbGVyID0ge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAvL3dpcmluZyB0aGUgbmF2aWdhdGlvblxyXG4gICAgICAgICAgdGhpcy5sb2dvdXRVcmwgPSBcImluZGV4LnBocC9sb2dvdXRcIjtcclxuICAgICAgICAgIHRoaXMuZG9jdG9yUHJvZmlsZSA9IFwiaW5kZXgucGhwL2RvY3RvclByb2ZpbGVcIjtcclxuICAgICAgICAgIHRoaXMuZGFzaGJvYXJkSG9tZVVybCA9IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZFwiO1xyXG4gICAgICAgICAgdGhpcy5uZXdBcHBvaW50bWVudFVybCA9IFwiaW5kZXgucGhwL2Jvb2tBcHBvaW50bWVudFwiO1xyXG4gICAgICAgICAgdGhpcy5wYXRpZW50c0VudHJ5VXJsID0gXCJpbmRleC5waHAvcGF0aWVudHNFbnRyeVwiO1xyXG4gICAgICAgICAgdGhpcy5wYXRpZW50c0xpc3RpbmdVcmwgPSBcImluZGV4LnBocC9wYXRpZW50c0xpc3RpbmdcIjtcclxuICAgICAgICAgIHRoaXMuY2xvc2VBcHBvaW50bWVudFVybCA9IFwiaW5kZXgucGhwL2Nsb3NlQXBwb2ludG1lbnRcIjtcclxuICAgICAgICAgIHRoaXMuZG9jdG9yc0FwcG9pbnRtZW50c0xpc3RVcmwgPSBcImluZGV4LnBocC9saXN0QXBwb2ludG1lbnRcIjtcclxuICAgICAgICAgIHRoaXMuY3JlYXRlUHJvZ3JhbUZvclBhdGllbnRVcmwgPSBcImluZGV4LnBocC9jcmVhdGVQcm9ncmFtRm9yUGF0aWVudFwiO1xyXG4gICAgICAgICAgdGhpcy5uZXdTY2hlZHVsZVVybCA9IFwiaW5kZXgucGhwL25ld1NjaGVkdWxlXCI7XHJcbiAgICAgICAgICB0aGlzLmxpc3RTY2hlZHVsZVVybCA9IFwiaW5kZXgucGhwL3NjaGVkdWxlTGlzdFwiO1xyXG4gICAgICAgICAgdGhpcy5hZGRTdGFmZlVybCA9IFwiaW5kZXgucGhwL3N0YWZmRW50cnlcIjtcclxuICAgICAgICAgIHRoaXMucGF0aWVudHNIaXN0b3J5VXJsID0gXCJpbmRleC5waHAvcGF0aWVudEhpc3RvcnlcIjtcclxuXHJcbiAgICAgICAgICAvL2RvIHNvbWV0aG5nIGFib3V0IGRvY3RvcnMgaW5mbyBhbmQgcmVnaXN0cmF0aW9uXHJcblxyXG4gICAgICAgICAgLy9UaGUgdXJsIGZyb20gdGhlIGJyb3dzZXIgIGNhbiBiZSBjb21wYXJlZCB0byBzZXQgdGhlIGFjdGl2ZSBuYXZpZ2F0aW9uXHJcbiAgICAgICAgICBuYXZWaWV3LmluaXQoKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgdmFyIG5hdlZpZXcgPSB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAvL3dpcmluZyB0aGUgbmF2aWdhdGlvbiBjbGlja3NcclxuXHJcblxyXG4gICAgICAgICAgJChcIiNwbXMtYnJhbmQtYnRuLWxpbmtcIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQTVMgYnJhbmQgY2xpY2snKTtcclxuXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQoXCIjY3JlYXRlLXByb2dyYW0tZm9yLXBhdGllbnQtc2VjdGlvblwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjcmVhdGUgcHJvZ3JhbSBmb3IgcGF0aWVudCcpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuY3JlYXRlUHJvZ3JhbUZvclBhdGllbnRVcmw7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJChcIiNwYXRpZW50cy1lbnRyeS1jcmVhdGUtc2VjdGlvbi1saW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3BhdGllbnRzIEVudHJ5Y2xpY2snKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIucGF0aWVudHNFbnRyeVVybDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiNwYXRpZW50cy1lbnRyeS1saXN0LXNlY3Rpb24tbGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3BhdGllbnRzIGxpc3RpbmcgY2xpY2snKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLnBhdGllbnRzTGlzdGluZ1VybDtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICQoXCIjdXNlci1Qcm9maWxlLUJ0bi1MaW5rXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygndXNlciBwcm9maWxlIGNsaWNrJyk7XHJcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmRvY3RvclByb2ZpbGU7XHJcblxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiNkb2N0b3ItZGFzaC1sb2dvdXQtYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsb2dvdXQgY2xpY2snKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmxvZ291dFVybDtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICQoXCIjZGFzaGJvYXJkLVNlY3Rpb24tQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuZGFzaGJvYXJkSG9tZVVybDtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGFzaGJvYXJkIGNsaWNrJyk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI2Jvb2stQXBwb2ludG1lbnRzLVNlY3Rpb24tQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIubmV3QXBwb2ludG1lbnRVcmw7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI2Nsb3NlLUJvb2stQXBwb2ludG1lbnQtU2VjdGlvbi1MaW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5jbG9zZUFwcG9pbnRtZW50VXJsO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiN2aWV3LUFwcG9pbnRtZW50LVNlY3Rpb24tTGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuZG9jdG9yc0FwcG9pbnRtZW50c0xpc3RVcmw7XHJcbiAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgJChcIiNtYW5hZ2UtRG9jdG9ycy1TY2hlZHVsZS1TZWN0aW9uLUxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2NoZWR1bGUgY2xpY2snKTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICQoXCIjbWFuYWdlLXNjaGVkdWxlLWNyZWF0ZS1zZWN0aW9uLWxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbmV3IHNjaGVkdWxlIGNsaWNrJyk7XHJcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLm5ld1NjaGVkdWxlVXJsO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiNtYW5hZ2Utc2NoZWR1bGUtbGlzdC1zZWN0aW9uLWxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2NoZWR1bGUgbGlzdCBjbGljaycpO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5saXN0U2NoZWR1bGVVcmw7XHJcbiAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICQoXCIjYWRkLVN0YWZmLVNlY3Rpb24tTGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmFkZFN0YWZmVXJsO1xyXG4gICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAkKFwiI3BhdGllbnRzLUhpc3RvcnktU2VjdGlvbi1MaW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIucGF0aWVudHNIaXN0b3J5VXJsO1xyXG4gICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKXtcclxuICAgICAgICAgIC8vaGlnaGxpZ2h0IHRoZSByaWdodCBuYXZpZ2F0aW9uXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgY29udHJvbGxlci5pbml0KCk7XHJcblxyXG4gIH0oKSk7XHJcblxyXG59KTtcclxuIiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuXHJcbiAgICAkKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3BhdGllbnQgbGlzdGluZ3MganMgbG9hZGVkJyk7XHJcblxyXG4gICAgICAgIHZhciBsaXN0TW9kZWwgPSB7fTtcclxuXHJcbiAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSB7XHJcbiAgICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLnBhdGllbnRMaXN0aW5nVXJsID0gXCJpbmRleC5waHAvZ2V0UGF0aWVudExpc3RcIjtcclxuICAgICAgICAgICAgdGhpcy5lZGl0UGF0aWVudFJlZGlyZWN0ID0gXCJpbmRleC5waHAvcGF0aWVudHNFbnRyeVwiO1xyXG5cclxuICAgICAgICAgICAgbGlzdFZpZXcuaW5pdCgpO1xyXG5cclxuICAgICAgICAgICAgLy9nZXR0aW5nIHRoZSBwcm9ncmFtbWUgbGlzdCBmb3IgdGhlIGRvY3RvclxyXG4gICAgICAgICAgICAkLmdldCggY29udHJvbGxlci5wYXRpZW50TGlzdGluZ1VybCAsIHt9KVxyXG4gICAgICAgICAgICAuZG9uZShmdW5jdGlvbiggcmVzcG9uc2UgKSB7XHJcbiAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInBhdGllbnRzIGxpc3Q6IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcclxuICAgICAgICAgICAgICBsaXN0TW9kZWwgPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgICAgIGxpc3RWaWV3LnJlbmRlcigpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZ2V0TGlzdE1vZGVsOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdE1vZGVsO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHBhdGllbnRFZGl0UmVkaXJlY3Q6IGZ1bmN0aW9uKHBhdGllbnRJZCl7XHJcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmVkaXRQYXRpZW50UmVkaXJlY3QgKyAnP2lkPScgKyAgcGF0aWVudElkO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICB2YXIgbGlzdFZpZXcgPSB7XHJcbiAgICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLnRhYmxlYm9keSA9ICQoJyNwYXRpZW50LWxpc3QtdGFibGUtYm9keScpO1xyXG5cclxuXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcmVuZGVyOiAgZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgIHZhciBwYXRpZW50c0xpc3QgPSBjb250cm9sbGVyLmdldExpc3RNb2RlbCgpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdtb2RlbCBpbiB2aWV3JyArIEpTT04uc3RyaW5naWZ5IChwYXRpZW50c0xpc3QpKTtcclxuXHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBwYXRpZW50c0xpc3QubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2xvb3BpbmcgJyArICBKU09OLnN0cmluZ2lmeSAocGF0aWVudHNMaXN0W2ldKSk7XHJcblxyXG4gICAgICAgICAgICAgIHZhciB0ciA9ICQoJzx0ci8+Jyk7XHJcblxyXG4gICAgICAgICAgICAgIHZhciB0ZCA9ICQoJzx0ZC8+Jyk7XHJcbiAgICAgICAgICAgICAgdGQudGV4dChwYXRpZW50c0xpc3RbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgdHIuYXBwZW5kKHRkKTtcclxuXHJcbiAgICAgICAgICAgICAgdmFyIHRkID0gJCgnPHRkLz4nKTtcclxuICAgICAgICAgICAgICB0ZC50ZXh0KHBhdGllbnRzTGlzdFtpXS5kYXRlT2ZCaXJ0aCk7XHJcbiAgICAgICAgICAgICAgdHIuYXBwZW5kKHRkKTtcclxuXHJcbiAgICAgICAgICAgICAgdmFyIHRkID0gJCgnPHRkLz4nKTtcclxuICAgICAgICAgICAgICB0ZC50ZXh0KHBhdGllbnRzTGlzdFtpXS5ibG9vZEdyb3VwKTtcclxuICAgICAgICAgICAgICB0ci5hcHBlbmQodGQpO1xyXG5cclxuICAgICAgICAgICAgICB2YXIgdGQgPSAkKCc8dGQvPicpO1xyXG4gICAgICAgICAgICAgIHRkLnRleHQocGF0aWVudHNMaXN0W2ldLmdlbmRlcik7XHJcbiAgICAgICAgICAgICAgdHIuYXBwZW5kKHRkKTtcclxuXHJcbiAgICAgICAgICAgICAgdmFyIHRkID0gJCgnPHRkLz4nKTtcclxuICAgICAgICAgICAgICB0ZC50ZXh0KHBhdGllbnRzTGlzdFtpXS5jb250YWN0KTtcclxuICAgICAgICAgICAgICB0ci5hcHBlbmQodGQpO1xyXG5cclxuICAgICAgICAgICAgICB2YXIgdGQgPSAkKCc8YS8+Jyx7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAnRWRpdCdcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB0ZC5jbGljaygoZnVuY3Rpb24oIGlkKXtcclxuICAgICAgICAgICAgICAgIC8vZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coaWQpO1xyXG4gICAgICAgICAgICAgICAgICBjb250cm9sbGVyLnBhdGllbnRFZGl0UmVkaXJlY3QoaWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pKHBhdGllbnRzTGlzdFtpXS5pZCkpO1xyXG4gICAgICAgICAgICAgIHRyLmFwcGVuZCh0ZCk7XHJcblxyXG5cclxuICAgICAgICAgICAgICB0aGlzLnRhYmxlYm9keS5hcHBlbmQodHIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICBjb250cm9sbGVyLmluaXQoKTtcclxuXHJcbiAgICB9KCkpO1xyXG5cclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
