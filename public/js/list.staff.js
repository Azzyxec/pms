var links = {

  //login js urls
   authenticateUrl : "index.php/authenticate/authenitcateUser",
   successRedirectUrl : "index.php/doctorDashboard/",
   registerDoctorUrl : "index.php/doctor/doctorInfo",
   adminUrl:"index.php/adminDashboard/admin",

   //admin related
   doctorListingUrl: "index.php/adminDashboard/doctorListing",

   logoutUrl : "index.php/authenticate/logout",

   //doctor dashboard links 
   doctorProfile : "index.php/doctorDashboard/doctorProfile",
   dashboardHomeUrl : "index.php/doctorDashboard/",
   newAppointmentUrl : "index.php/doctorDashboard/bookAppointment",
   patientsEntryUrl : "index.php/doctorDashboard/patientsEntry",
   patientsListingUrl : "index.php/doctorDashboard/patientsListing",
   closeAppointmentUrl : "index.php/doctorDashboard/closeAppointment",
   doctorsAppointmentsListUrl : "index.php/doctorDashboard/listAppointment",
   newScheduleUrl : "index.php/doctorDashboard/newSchedule",
   listScheduleUrl : "index.php/doctorDashboard/scheduleList",
   getScheduleCalendarUrl: "index.php/doctorDashboard/ScheduleCalenderView",
   addStaffUrl : "index.php/doctorDashboard/staffEntry",
   doctorsStaffListingUr : "index.php/doctorDashboard/staffListing",
   patientsHistoryUrl : "index.php/doctorDashboard/patientHistory",
   createProgramForPatientUrl : "index.php/doctorDashboard/createMedicalProgram",
   programmeListingsUrl : "index.php/doctorDashboard/programmeList",
   ManageLocationsUrl : "index.php/doctorDashboard/workLocationManagement",
   getAnalyticsUrl : "index.php/doctorDashboard/AnalyticsReport",
   getCalenderUrl : "index.php/doctorDashboard/calendarTemplate",
   accountingUrl : "index.php/doctorDashboard/accounting",
   medicineSearchUrl : "index.php/doctorDashboard/medicineSearch",


   //schedule
   getLocationUrl: "index.php/locations/getDoctorLocations",
   createUpdateScheduleUrl: "index.php/schedule/createUpdateSchedule",

   //programme
   programmeListUrl:"index.php/programme/getMedicationProgrammeList",
   programmeEditUrl:"index.php/doctorDashboard/createMedicalProgram",
   createModifyProgrammeUrl:"index.php/programme/createModifyProgramme",
   getProgrammeUrl:"index.php/programme/getProgrammes",


   //patient
   patientDetailPersistUrl:"index.php/patient/addUpdatePatient",
   patientsDetailsUrl:"index.php/patient/getPatientDetails",
   loginCheckUrl:"index.php/authenticate/isLoggedIn",
   getProgrammeList:"index.php/programme/getMedicationProgrammeList",
   programmeListDetailsUrl:"index.php/programme/getProgrammeListDetails",
   patientsProgrammesUrl:"index.php/programme/getPatientProgrammes",
   patientListingUrl:"index.php/patient/getPatientList",

   saveUpdateLocations:"index.php/locations/addUpdateLocation",
   locationListUrl:"index.php/locations/getDoctorLocations",
   deliveryMethodsUrl:"index.php/patient/getDeliveryMethods",


   //registartion
   doctorUrl:"index.php/doctor/saveUpdateDoctor",
   doctorDetailsUrl:"index.php/doctor/getDoctorDetails",
   loginCheckUrl:"index.php/authenticate/isLoggedIn",
   doctorDashUrl:"index.php/doctorDashboard/",
   logoutUrl:"index.php/authenticate/logout",

   createModifyStaffUrl:"index.php/staff/createModifyStaff",
   getStaffDetailsUrl: "index.php/staff/getStaffDetails",
   staffListingUrl: "index.php/staff/getDoctorsStaffList"

}

$(document).ready(function(){

    //defining the helper functions in global

    $(function(){

      console.log('Doctor Dashboard js loaded');

          //top level controller
      var controller = {
        init: function(){
          //wiring the navigation
          this.logoutUrl = links.logoutUrl;
          this.doctorProfile = links.doctorProfile;
          this.dashboardHomeUrl = links.dashboardHomeUrl;
          this.newAppointmentUrl = links.newAppointmentUrl;
          this.patientsEntryUrl = links.patientsEntryUrl;
          this.patientsListingUrl = links.patientsListingUrl;
          this.closeAppointmentUrl = links.closeAppointmentUrl;
          this.doctorsAppointmentsListUrl = links.doctorsAppointmentsListUrl;

          this.newScheduleUrl = links.newScheduleUrl;
          this.listScheduleUrl = this.listScheduleUrl;
          this.ScheduleCalendarUrl = links.getScheduleCalendarUrl;
          this.addStaffUrl = links.addStaffUrl;
          this.doctorsStaffListingUr = links.doctorsStaffListingUr;

          this.patientsHistoryUrl = links.patientsHistoryUrl;

          this.createProgramForPatientUrl = links.createProgramForPatientUrl ;
          this.programmeListingsUrl = links.programmeListingsUrl;

          this.ManageLocationsUrl = links.ManageLocationsUrl;
          this.CalendarTemplateUrl = links.getCalenderUrl;

          this.analyticsReportUrl = links.getAnalyticsUrl;
          this.accountingUrl = links.accountingUrl;
          this.medicineSearchUrl = links.medicineSearchUrl;
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
          })


        //$("#manage-Doctors-Schedule-Section-Link-Btn").attr('href', controller.listScheduleUrl);


          $("#manage-Doctors-Schedule-Section-Link-Btn").click(function(e){
              e.preventDefault();
              console.log('schedule manage click');
              window.location.href = controller.ScheduleCalendarUrl;
         });

          $("#manage-schedule-create-section-link-Btn").click(function(e){
              e.preventDefault();
              console.log('new schedule click');
              window.location.href = controller.newScheduleUrl;
          });

        //  $("#manage-schedule-list-section-link-Btn").click(function(e){
              //e.preventDefault();
              //console.log('schedule list click');
            //  window.location.href = controller.listScheduleUrl;
          //});


           $("#add-Staff-Section-Link-Btn").click(function(e){
               e.preventDefault();
               window.location.href = controller.addStaffUrl;
           });

           $("#btn-staff-listing").click(function(e){
                e.preventDefault();
                window.location.href = controller.doctorsStaffListingUr;
           });

            $("#calendar-Template-Btn-Link").click(function(e){
                e.preventDefault();
                window.location.href = controller.CalendarTemplateUrl;
               console.log("hello hid");
            });

           $("#patients-History-Section-Link-Btn").click(function(e){
               e.preventDefault();
               window.location.href = controller.patientsHistoryUrl;
           });


            $("#manage-schedule-list-section-link-Btn").click(function(e){
               e.preventDefault();
               window.location.href = controller.ScheduleCalendarUrl;
           });

             $("#appointment-section-link-btn").click(function(e){
               e.preventDefault();
               window.location.href = controller.doctorsAppointmentsListUrl;
           });
            $("#patients-Entry-Section-Link-Btn").click(function(e){
               e.preventDefault();
           });

             $("#staff-managment-section-link-btn").click(function(e){
               e.preventDefault();
           });
             $("#other-settings-section-link-btn").click(function(e){
               e.preventDefault();
           });
             $("#calendar-template-section-link-btn").click(function(e){
               e.preventDefault();
           });


           $("#analytics-side-navigation-link-btn").click(function(e){
               e.preventDefault();
               window.location.href = controller.analyticsReportUrl;
           });

           $("#accounting-side-navigation-link-btn").click(function(e){
               e.preventDefault();
               window.location.href = controller.accountingUrl;
           });

           $("#medicine-side-navigation-link-btn").click(function(e){
               e.preventDefault();
               window.location.href = controller.medicineSearchUrl;
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
        console.log('staff listings js loaded');

        var listModel = {};

        var controller = {
          init: function(){
            this.staffListingUrl = links.staffListingUrl;
            this.addStaffUrl = links.addStaffUrl;

            listView.init();

            //getting the programme list for the doctor
            $.get( controller.staffListingUrl , {})
            .done(function( response ) {
              console.log("doctors list: " + JSON.stringify(response));
              listModel = response.data;
              listView.render();
            });

          },
          getListModel: function(){
            return listModel;
          }
        };


        var listView = {
          init: function(){
            this.tablebody = $('#staff-list-table-body');


          },
          render:  function(){

            var staffList = controller.getListModel();
            //console.log('model in view' + JSON.stringify (staffList));

            for(var i = 0; i < staffList.length; i++){
              //console.log('looping ' +  JSON.stringify (staffList[i]));

              var tr = $('<tr/>');

              var td = $('<td/>');
              td.text(staffList[i].firstName);
              tr.append(td);

              var td = $('<td/>');
              td.text(staffList[i].contact1);
              tr.append(td);

              var td = $('<td/>');
              td.text(staffList[i].email);
              tr.append(td);

              var td = $('<td/>');
              td.text(staffList[i].locationName);
              tr.append(td);

              var td = $('<td/>');
              td.text(staffList[i].createdDate);
              tr.append(td);

              var td = $('<td/>');
              td.text( staffList[i].isActive == 1 ? 'Active' : 'In Active');
              tr.append(td);


              var td = $('<a/>',{
                text: 'Edit',
                href: controller.addStaffUrl + '?id=' +  staffList[i].id
              });
              tr.append(td);

              this.tablebody.append(tr);
            }

          }
        };


        controller.init();

    }());

});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpbmtzLmpzIiwiZG9jdG9yRGFzaGJvYXJkLmpzIiwibGlzdC5zdGFmZi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25PQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Imxpc3Quc3RhZmYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgbGlua3MgPSB7XHJcblxyXG4gIC8vbG9naW4ganMgdXJsc1xyXG4gICBhdXRoZW50aWNhdGVVcmwgOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvYXV0aGVuaXRjYXRlVXNlclwiLFxyXG4gICBzdWNjZXNzUmVkaXJlY3RVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvXCIsXHJcbiAgIHJlZ2lzdGVyRG9jdG9yVXJsIDogXCJpbmRleC5waHAvZG9jdG9yL2RvY3RvckluZm9cIixcclxuICAgYWRtaW5Vcmw6XCJpbmRleC5waHAvYWRtaW5EYXNoYm9hcmQvYWRtaW5cIixcclxuXHJcbiAgIC8vYWRtaW4gcmVsYXRlZFxyXG4gICBkb2N0b3JMaXN0aW5nVXJsOiBcImluZGV4LnBocC9hZG1pbkRhc2hib2FyZC9kb2N0b3JMaXN0aW5nXCIsXHJcblxyXG4gICBsb2dvdXRVcmwgOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvbG9nb3V0XCIsXHJcblxyXG4gICAvL2RvY3RvciBkYXNoYm9hcmQgbGlua3MgXHJcbiAgIGRvY3RvclByb2ZpbGUgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvZG9jdG9yUHJvZmlsZVwiLFxyXG4gICBkYXNoYm9hcmRIb21lVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL1wiLFxyXG4gICBuZXdBcHBvaW50bWVudFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9ib29rQXBwb2ludG1lbnRcIixcclxuICAgcGF0aWVudHNFbnRyeVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wYXRpZW50c0VudHJ5XCIsXHJcbiAgIHBhdGllbnRzTGlzdGluZ1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wYXRpZW50c0xpc3RpbmdcIixcclxuICAgY2xvc2VBcHBvaW50bWVudFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jbG9zZUFwcG9pbnRtZW50XCIsXHJcbiAgIGRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2xpc3RBcHBvaW50bWVudFwiLFxyXG4gICBuZXdTY2hlZHVsZVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9uZXdTY2hlZHVsZVwiLFxyXG4gICBsaXN0U2NoZWR1bGVVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvc2NoZWR1bGVMaXN0XCIsXHJcbiAgIGdldFNjaGVkdWxlQ2FsZW5kYXJVcmw6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9TY2hlZHVsZUNhbGVuZGVyVmlld1wiLFxyXG4gICBhZGRTdGFmZlVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9zdGFmZkVudHJ5XCIsXHJcbiAgIGRvY3RvcnNTdGFmZkxpc3RpbmdVciA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9zdGFmZkxpc3RpbmdcIixcclxuICAgcGF0aWVudHNIaXN0b3J5VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3BhdGllbnRIaXN0b3J5XCIsXHJcbiAgIGNyZWF0ZVByb2dyYW1Gb3JQYXRpZW50VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2NyZWF0ZU1lZGljYWxQcm9ncmFtXCIsXHJcbiAgIHByb2dyYW1tZUxpc3RpbmdzVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3Byb2dyYW1tZUxpc3RcIixcclxuICAgTWFuYWdlTG9jYXRpb25zVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3dvcmtMb2NhdGlvbk1hbmFnZW1lbnRcIixcclxuICAgZ2V0QW5hbHl0aWNzVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL0FuYWx5dGljc1JlcG9ydFwiLFxyXG4gICBnZXRDYWxlbmRlclVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jYWxlbmRhclRlbXBsYXRlXCIsXHJcbiAgIGFjY291bnRpbmdVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvYWNjb3VudGluZ1wiLFxyXG4gICBtZWRpY2luZVNlYXJjaFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9tZWRpY2luZVNlYXJjaFwiLFxyXG5cclxuXHJcbiAgIC8vc2NoZWR1bGVcclxuICAgZ2V0TG9jYXRpb25Vcmw6IFwiaW5kZXgucGhwL2xvY2F0aW9ucy9nZXREb2N0b3JMb2NhdGlvbnNcIixcclxuICAgY3JlYXRlVXBkYXRlU2NoZWR1bGVVcmw6IFwiaW5kZXgucGhwL3NjaGVkdWxlL2NyZWF0ZVVwZGF0ZVNjaGVkdWxlXCIsXHJcblxyXG4gICAvL3Byb2dyYW1tZVxyXG4gICBwcm9ncmFtbWVMaXN0VXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRNZWRpY2F0aW9uUHJvZ3JhbW1lTGlzdFwiLFxyXG4gICBwcm9ncmFtbWVFZGl0VXJsOlwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jcmVhdGVNZWRpY2FsUHJvZ3JhbVwiLFxyXG4gICBjcmVhdGVNb2RpZnlQcm9ncmFtbWVVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2NyZWF0ZU1vZGlmeVByb2dyYW1tZVwiLFxyXG4gICBnZXRQcm9ncmFtbWVVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldFByb2dyYW1tZXNcIixcclxuXHJcblxyXG4gICAvL3BhdGllbnRcclxuICAgcGF0aWVudERldGFpbFBlcnNpc3RVcmw6XCJpbmRleC5waHAvcGF0aWVudC9hZGRVcGRhdGVQYXRpZW50XCIsXHJcbiAgIHBhdGllbnRzRGV0YWlsc1VybDpcImluZGV4LnBocC9wYXRpZW50L2dldFBhdGllbnREZXRhaWxzXCIsXHJcbiAgIGxvZ2luQ2hlY2tVcmw6XCJpbmRleC5waHAvYXV0aGVudGljYXRlL2lzTG9nZ2VkSW5cIixcclxuICAgZ2V0UHJvZ3JhbW1lTGlzdDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0TWVkaWNhdGlvblByb2dyYW1tZUxpc3RcIixcclxuICAgcHJvZ3JhbW1lTGlzdERldGFpbHNVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldFByb2dyYW1tZUxpc3REZXRhaWxzXCIsXHJcbiAgIHBhdGllbnRzUHJvZ3JhbW1lc1VybDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0UGF0aWVudFByb2dyYW1tZXNcIixcclxuICAgcGF0aWVudExpc3RpbmdVcmw6XCJpbmRleC5waHAvcGF0aWVudC9nZXRQYXRpZW50TGlzdFwiLFxyXG5cclxuICAgc2F2ZVVwZGF0ZUxvY2F0aW9uczpcImluZGV4LnBocC9sb2NhdGlvbnMvYWRkVXBkYXRlTG9jYXRpb25cIixcclxuICAgbG9jYXRpb25MaXN0VXJsOlwiaW5kZXgucGhwL2xvY2F0aW9ucy9nZXREb2N0b3JMb2NhdGlvbnNcIixcclxuICAgZGVsaXZlcnlNZXRob2RzVXJsOlwiaW5kZXgucGhwL3BhdGllbnQvZ2V0RGVsaXZlcnlNZXRob2RzXCIsXHJcblxyXG5cclxuICAgLy9yZWdpc3RhcnRpb25cclxuICAgZG9jdG9yVXJsOlwiaW5kZXgucGhwL2RvY3Rvci9zYXZlVXBkYXRlRG9jdG9yXCIsXHJcbiAgIGRvY3RvckRldGFpbHNVcmw6XCJpbmRleC5waHAvZG9jdG9yL2dldERvY3RvckRldGFpbHNcIixcclxuICAgbG9naW5DaGVja1VybDpcImluZGV4LnBocC9hdXRoZW50aWNhdGUvaXNMb2dnZWRJblwiLFxyXG4gICBkb2N0b3JEYXNoVXJsOlwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9cIixcclxuICAgbG9nb3V0VXJsOlwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9sb2dvdXRcIixcclxuXHJcbiAgIGNyZWF0ZU1vZGlmeVN0YWZmVXJsOlwiaW5kZXgucGhwL3N0YWZmL2NyZWF0ZU1vZGlmeVN0YWZmXCIsXHJcbiAgIGdldFN0YWZmRGV0YWlsc1VybDogXCJpbmRleC5waHAvc3RhZmYvZ2V0U3RhZmZEZXRhaWxzXCIsXHJcbiAgIHN0YWZmTGlzdGluZ1VybDogXCJpbmRleC5waHAvc3RhZmYvZ2V0RG9jdG9yc1N0YWZmTGlzdFwiXHJcblxyXG59XHJcbiIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgLy9kZWZpbmluZyB0aGUgaGVscGVyIGZ1bmN0aW9ucyBpbiBnbG9iYWxcclxuXHJcbiAgICAkKGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZygnRG9jdG9yIERhc2hib2FyZCBqcyBsb2FkZWQnKTtcclxuXHJcbiAgICAgICAgICAvL3RvcCBsZXZlbCBjb250cm9sbGVyXHJcbiAgICAgIHZhciBjb250cm9sbGVyID0ge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAvL3dpcmluZyB0aGUgbmF2aWdhdGlvblxyXG4gICAgICAgICAgdGhpcy5sb2dvdXRVcmwgPSBsaW5rcy5sb2dvdXRVcmw7XHJcbiAgICAgICAgICB0aGlzLmRvY3RvclByb2ZpbGUgPSBsaW5rcy5kb2N0b3JQcm9maWxlO1xyXG4gICAgICAgICAgdGhpcy5kYXNoYm9hcmRIb21lVXJsID0gbGlua3MuZGFzaGJvYXJkSG9tZVVybDtcclxuICAgICAgICAgIHRoaXMubmV3QXBwb2ludG1lbnRVcmwgPSBsaW5rcy5uZXdBcHBvaW50bWVudFVybDtcclxuICAgICAgICAgIHRoaXMucGF0aWVudHNFbnRyeVVybCA9IGxpbmtzLnBhdGllbnRzRW50cnlVcmw7XHJcbiAgICAgICAgICB0aGlzLnBhdGllbnRzTGlzdGluZ1VybCA9IGxpbmtzLnBhdGllbnRzTGlzdGluZ1VybDtcclxuICAgICAgICAgIHRoaXMuY2xvc2VBcHBvaW50bWVudFVybCA9IGxpbmtzLmNsb3NlQXBwb2ludG1lbnRVcmw7XHJcbiAgICAgICAgICB0aGlzLmRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsID0gbGlua3MuZG9jdG9yc0FwcG9pbnRtZW50c0xpc3RVcmw7XHJcblxyXG4gICAgICAgICAgdGhpcy5uZXdTY2hlZHVsZVVybCA9IGxpbmtzLm5ld1NjaGVkdWxlVXJsO1xyXG4gICAgICAgICAgdGhpcy5saXN0U2NoZWR1bGVVcmwgPSB0aGlzLmxpc3RTY2hlZHVsZVVybDtcclxuICAgICAgICAgIHRoaXMuU2NoZWR1bGVDYWxlbmRhclVybCA9IGxpbmtzLmdldFNjaGVkdWxlQ2FsZW5kYXJVcmw7XHJcbiAgICAgICAgICB0aGlzLmFkZFN0YWZmVXJsID0gbGlua3MuYWRkU3RhZmZVcmw7XHJcbiAgICAgICAgICB0aGlzLmRvY3RvcnNTdGFmZkxpc3RpbmdVciA9IGxpbmtzLmRvY3RvcnNTdGFmZkxpc3RpbmdVcjtcclxuXHJcbiAgICAgICAgICB0aGlzLnBhdGllbnRzSGlzdG9yeVVybCA9IGxpbmtzLnBhdGllbnRzSGlzdG9yeVVybDtcclxuXHJcbiAgICAgICAgICB0aGlzLmNyZWF0ZVByb2dyYW1Gb3JQYXRpZW50VXJsID0gbGlua3MuY3JlYXRlUHJvZ3JhbUZvclBhdGllbnRVcmwgO1xyXG4gICAgICAgICAgdGhpcy5wcm9ncmFtbWVMaXN0aW5nc1VybCA9IGxpbmtzLnByb2dyYW1tZUxpc3RpbmdzVXJsO1xyXG5cclxuICAgICAgICAgIHRoaXMuTWFuYWdlTG9jYXRpb25zVXJsID0gbGlua3MuTWFuYWdlTG9jYXRpb25zVXJsO1xyXG4gICAgICAgICAgdGhpcy5DYWxlbmRhclRlbXBsYXRlVXJsID0gbGlua3MuZ2V0Q2FsZW5kZXJVcmw7XHJcblxyXG4gICAgICAgICAgdGhpcy5hbmFseXRpY3NSZXBvcnRVcmwgPSBsaW5rcy5nZXRBbmFseXRpY3NVcmw7XHJcbiAgICAgICAgICB0aGlzLmFjY291bnRpbmdVcmwgPSBsaW5rcy5hY2NvdW50aW5nVXJsO1xyXG4gICAgICAgICAgdGhpcy5tZWRpY2luZVNlYXJjaFVybCA9IGxpbmtzLm1lZGljaW5lU2VhcmNoVXJsO1xyXG4gICAgICAgICAgLy9kbyBzb21ldGhuZyBhYm91dCBkb2N0b3JzIGluZm8gYW5kIHJlZ2lzdHJhdGlvblxyXG5cclxuICAgICAgICAgIC8vVGhlIHVybCBmcm9tIHRoZSBicm93c2VyICBjYW4gYmUgY29tcGFyZWQgdG8gc2V0IHRoZSBhY3RpdmUgbmF2aWdhdGlvblxyXG4gICAgICAgICAgbmF2Vmlldy5pbml0KCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIHZhciBuYXZWaWV3ID0ge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgLy93aXJpbmcgdGhlIG5hdmlnYXRpb24gY2xpY2tzXHJcblxyXG5cclxuICAgICAgICAgICQoXCIjcG1zLWJyYW5kLWJ0bi1saW5rXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUE1TIGJyYW5kIGNsaWNrJyk7XHJcblxyXG4gICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAkKFwiI2J0bi1wcm9ncmFtbWUtc2VjdGlvbi1saW5rXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKFwiI2NyZWF0ZS1wcm9ncmFtLWZvci1wYXRpZW50LXNlY3Rpb25cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY3JlYXRlIHByb2dyYW0gZm9yIHBhdGllbnQnKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmNyZWF0ZVByb2dyYW1Gb3JQYXRpZW50VXJsO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQoXCIjYnRuLW1hbmFnZS1sb2NhdGlvbnNcIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbWFuYWdlIGxvY2F0aW9ucycpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuTWFuYWdlTG9jYXRpb25zVXJsO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJChcIiNidG4tbGlzdC1wcm9ncmFtLXNlY3Rpb25cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5wcm9ncmFtbWVMaXN0aW5nc1VybDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoXCIjcGF0aWVudHMtZW50cnktY3JlYXRlLXNlY3Rpb24tbGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwYXRpZW50cyBFbnRyeWNsaWNrJyk7XHJcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLnBhdGllbnRzRW50cnlVcmw7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICQoXCIjcGF0aWVudHMtZW50cnktbGlzdC1zZWN0aW9uLWxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwYXRpZW50cyBsaXN0aW5nIGNsaWNrJyk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5wYXRpZW50c0xpc3RpbmdVcmw7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI3VzZXItUHJvZmlsZS1CdG4tTGlua1wiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3VzZXIgcHJvZmlsZSBjbGljaycpO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5kb2N0b3JQcm9maWxlO1xyXG5cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICQoXCIjZG9jdG9yLWRhc2gtbG9nb3V0LWJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbG9nb3V0IGNsaWNrJyk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5sb2dvdXRVcmw7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI2Rhc2hib2FyZC1TZWN0aW9uLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmRhc2hib2FyZEhvbWVVcmw7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Rhc2hib2FyZCBjbGljaycpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiNib29rLUFwcG9pbnRtZW50cy1TZWN0aW9uLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLm5ld0FwcG9pbnRtZW50VXJsO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiNjbG9zZS1Cb29rLUFwcG9pbnRtZW50LVNlY3Rpb24tTGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuY2xvc2VBcHBvaW50bWVudFVybDtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICQoXCIjdmlldy1BcHBvaW50bWVudC1TZWN0aW9uLUxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsO1xyXG4gICAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgIC8vJChcIiNtYW5hZ2UtRG9jdG9ycy1TY2hlZHVsZS1TZWN0aW9uLUxpbmstQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmxpc3RTY2hlZHVsZVVybCk7XHJcblxyXG5cclxuICAgICAgICAgICQoXCIjbWFuYWdlLURvY3RvcnMtU2NoZWR1bGUtU2VjdGlvbi1MaW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NjaGVkdWxlIG1hbmFnZSBjbGljaycpO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5TY2hlZHVsZUNhbGVuZGFyVXJsO1xyXG4gICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI21hbmFnZS1zY2hlZHVsZS1jcmVhdGUtc2VjdGlvbi1saW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ25ldyBzY2hlZHVsZSBjbGljaycpO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5uZXdTY2hlZHVsZVVybDtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyAgJChcIiNtYW5hZ2Utc2NoZWR1bGUtbGlzdC1zZWN0aW9uLWxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgIC8vZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3NjaGVkdWxlIGxpc3QgY2xpY2snKTtcclxuICAgICAgICAgICAgLy8gIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5saXN0U2NoZWR1bGVVcmw7XHJcbiAgICAgICAgICAvL30pO1xyXG5cclxuXHJcbiAgICAgICAgICAgJChcIiNhZGQtU3RhZmYtU2VjdGlvbi1MaW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuYWRkU3RhZmZVcmw7XHJcbiAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICQoXCIjYnRuLXN0YWZmLWxpc3RpbmdcIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuZG9jdG9yc1N0YWZmTGlzdGluZ1VyO1xyXG4gICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJChcIiNjYWxlbmRhci1UZW1wbGF0ZS1CdG4tTGlua1wiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5DYWxlbmRhclRlbXBsYXRlVXJsO1xyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImhlbGxvIGhpZFwiKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICQoXCIjcGF0aWVudHMtSGlzdG9yeS1TZWN0aW9uLUxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5wYXRpZW50c0hpc3RvcnlVcmw7XHJcbiAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgJChcIiNtYW5hZ2Utc2NoZWR1bGUtbGlzdC1zZWN0aW9uLWxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5TY2hlZHVsZUNhbGVuZGFyVXJsO1xyXG4gICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICQoXCIjYXBwb2ludG1lbnQtc2VjdGlvbi1saW5rLWJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuZG9jdG9yc0FwcG9pbnRtZW50c0xpc3RVcmw7XHJcbiAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICQoXCIjcGF0aWVudHMtRW50cnktU2VjdGlvbi1MaW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICQoXCIjc3RhZmYtbWFuYWdtZW50LXNlY3Rpb24tbGluay1idG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICQoXCIjb3RoZXItc2V0dGluZ3Mtc2VjdGlvbi1saW5rLWJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgJChcIiNjYWxlbmRhci10ZW1wbGF0ZS1zZWN0aW9uLWxpbmstYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAkKFwiI2FuYWx5dGljcy1zaWRlLW5hdmlnYXRpb24tbGluay1idG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmFuYWx5dGljc1JlcG9ydFVybDtcclxuICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgJChcIiNhY2NvdW50aW5nLXNpZGUtbmF2aWdhdGlvbi1saW5rLWJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuYWNjb3VudGluZ1VybDtcclxuICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgJChcIiNtZWRpY2luZS1zaWRlLW5hdmlnYXRpb24tbGluay1idG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLm1lZGljaW5lU2VhcmNoVXJsO1xyXG4gICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKXtcclxuICAgICAgICAgIC8vaGlnaGxpZ2h0IHRoZSByaWdodCBuYXZpZ2F0aW9uXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgY29udHJvbGxlci5pbml0KCk7XHJcblxyXG4gIH0oKSk7XHJcblxyXG59KTtcclxuIiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuXHJcbiAgICAkKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3N0YWZmIGxpc3RpbmdzIGpzIGxvYWRlZCcpO1xyXG5cclxuICAgICAgICB2YXIgbGlzdE1vZGVsID0ge307XHJcblxyXG4gICAgICAgIHZhciBjb250cm9sbGVyID0ge1xyXG4gICAgICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5zdGFmZkxpc3RpbmdVcmwgPSBsaW5rcy5zdGFmZkxpc3RpbmdVcmw7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkU3RhZmZVcmwgPSBsaW5rcy5hZGRTdGFmZlVybDtcclxuXHJcbiAgICAgICAgICAgIGxpc3RWaWV3LmluaXQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vZ2V0dGluZyB0aGUgcHJvZ3JhbW1lIGxpc3QgZm9yIHRoZSBkb2N0b3JcclxuICAgICAgICAgICAgJC5nZXQoIGNvbnRyb2xsZXIuc3RhZmZMaXN0aW5nVXJsICwge30pXHJcbiAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uKCByZXNwb25zZSApIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImRvY3RvcnMgbGlzdDogXCIgKyBKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xyXG4gICAgICAgICAgICAgIGxpc3RNb2RlbCA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICAgICAgbGlzdFZpZXcucmVuZGVyKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBnZXRMaXN0TW9kZWw6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0TW9kZWw7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIHZhciBsaXN0VmlldyA9IHtcclxuICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMudGFibGVib2R5ID0gJCgnI3N0YWZmLWxpc3QtdGFibGUtYm9keScpO1xyXG5cclxuXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcmVuZGVyOiAgZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgIHZhciBzdGFmZkxpc3QgPSBjb250cm9sbGVyLmdldExpc3RNb2RlbCgpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdtb2RlbCBpbiB2aWV3JyArIEpTT04uc3RyaW5naWZ5IChzdGFmZkxpc3QpKTtcclxuXHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzdGFmZkxpc3QubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2xvb3BpbmcgJyArICBKU09OLnN0cmluZ2lmeSAoc3RhZmZMaXN0W2ldKSk7XHJcblxyXG4gICAgICAgICAgICAgIHZhciB0ciA9ICQoJzx0ci8+Jyk7XHJcblxyXG4gICAgICAgICAgICAgIHZhciB0ZCA9ICQoJzx0ZC8+Jyk7XHJcbiAgICAgICAgICAgICAgdGQudGV4dChzdGFmZkxpc3RbaV0uZmlyc3ROYW1lKTtcclxuICAgICAgICAgICAgICB0ci5hcHBlbmQodGQpO1xyXG5cclxuICAgICAgICAgICAgICB2YXIgdGQgPSAkKCc8dGQvPicpO1xyXG4gICAgICAgICAgICAgIHRkLnRleHQoc3RhZmZMaXN0W2ldLmNvbnRhY3QxKTtcclxuICAgICAgICAgICAgICB0ci5hcHBlbmQodGQpO1xyXG5cclxuICAgICAgICAgICAgICB2YXIgdGQgPSAkKCc8dGQvPicpO1xyXG4gICAgICAgICAgICAgIHRkLnRleHQoc3RhZmZMaXN0W2ldLmVtYWlsKTtcclxuICAgICAgICAgICAgICB0ci5hcHBlbmQodGQpO1xyXG5cclxuICAgICAgICAgICAgICB2YXIgdGQgPSAkKCc8dGQvPicpO1xyXG4gICAgICAgICAgICAgIHRkLnRleHQoc3RhZmZMaXN0W2ldLmxvY2F0aW9uTmFtZSk7XHJcbiAgICAgICAgICAgICAgdHIuYXBwZW5kKHRkKTtcclxuXHJcbiAgICAgICAgICAgICAgdmFyIHRkID0gJCgnPHRkLz4nKTtcclxuICAgICAgICAgICAgICB0ZC50ZXh0KHN0YWZmTGlzdFtpXS5jcmVhdGVkRGF0ZSk7XHJcbiAgICAgICAgICAgICAgdHIuYXBwZW5kKHRkKTtcclxuXHJcbiAgICAgICAgICAgICAgdmFyIHRkID0gJCgnPHRkLz4nKTtcclxuICAgICAgICAgICAgICB0ZC50ZXh0KCBzdGFmZkxpc3RbaV0uaXNBY3RpdmUgPT0gMSA/ICdBY3RpdmUnIDogJ0luIEFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgIHRyLmFwcGVuZCh0ZCk7XHJcblxyXG5cclxuICAgICAgICAgICAgICB2YXIgdGQgPSAkKCc8YS8+Jyx7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAnRWRpdCcsXHJcbiAgICAgICAgICAgICAgICBocmVmOiBjb250cm9sbGVyLmFkZFN0YWZmVXJsICsgJz9pZD0nICsgIHN0YWZmTGlzdFtpXS5pZFxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIHRyLmFwcGVuZCh0ZCk7XHJcblxyXG4gICAgICAgICAgICAgIHRoaXMudGFibGVib2R5LmFwcGVuZCh0cik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIGNvbnRyb2xsZXIuaW5pdCgpO1xyXG5cclxuICAgIH0oKSk7XHJcblxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
