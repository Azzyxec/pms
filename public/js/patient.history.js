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
   getScheduleCalendarUrl: "index.php/schedule/ScheduleCalenderView",

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
        console.log('patient History js loaded');
    }());

});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpbmtzLmpzIiwiZG9jdG9yRGFzaGJvYXJkLmpzIiwicGF0aWVudC5oaXN0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJwYXRpZW50Lmhpc3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgbGlua3MgPSB7XHJcblxyXG4gIC8vbG9naW4ganMgdXJsc1xyXG4gICBhdXRoZW50aWNhdGVVcmwgOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvYXV0aGVuaXRjYXRlVXNlclwiLFxyXG4gICBzdWNjZXNzUmVkaXJlY3RVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvXCIsXHJcbiAgIHJlZ2lzdGVyRG9jdG9yVXJsIDogXCJpbmRleC5waHAvZG9jdG9yL2RvY3RvckluZm9cIixcclxuICAgYWRtaW5Vcmw6XCJpbmRleC5waHAvYWRtaW5EYXNoYm9hcmQvYWRtaW5cIixcclxuXHJcbiAgIC8vYWRtaW4gcmVsYXRlZFxyXG4gICBkb2N0b3JMaXN0aW5nVXJsOiBcImluZGV4LnBocC9hZG1pbkRhc2hib2FyZC9kb2N0b3JMaXN0aW5nXCIsXHJcblxyXG4gICBsb2dvdXRVcmwgOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvbG9nb3V0XCIsXHJcblxyXG4gICAvL2RvY3RvciBkYXNoYm9hcmQgbGlua3NcclxuICAgZG9jdG9yUHJvZmlsZSA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9kb2N0b3JQcm9maWxlXCIsXHJcbiAgIGRhc2hib2FyZEhvbWVVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvXCIsXHJcbiAgIG5ld0FwcG9pbnRtZW50VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2Jvb2tBcHBvaW50bWVudFwiLFxyXG4gICBwYXRpZW50c0VudHJ5VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3BhdGllbnRzRW50cnlcIixcclxuICAgcGF0aWVudHNMaXN0aW5nVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3BhdGllbnRzTGlzdGluZ1wiLFxyXG4gICBjbG9zZUFwcG9pbnRtZW50VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2Nsb3NlQXBwb2ludG1lbnRcIixcclxuICAgZG9jdG9yc0FwcG9pbnRtZW50c0xpc3RVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvbGlzdEFwcG9pbnRtZW50XCIsXHJcbiAgIG5ld1NjaGVkdWxlVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL25ld1NjaGVkdWxlXCIsXHJcbiAgIGxpc3RTY2hlZHVsZVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9zY2hlZHVsZUxpc3RcIixcclxuICAgYWRkU3RhZmZVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvc3RhZmZFbnRyeVwiLFxyXG4gICBkb2N0b3JzU3RhZmZMaXN0aW5nVXIgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvc3RhZmZMaXN0aW5nXCIsXHJcbiAgIHBhdGllbnRzSGlzdG9yeVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wYXRpZW50SGlzdG9yeVwiLFxyXG4gICBjcmVhdGVQcm9ncmFtRm9yUGF0aWVudFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jcmVhdGVNZWRpY2FsUHJvZ3JhbVwiLFxyXG4gICBwcm9ncmFtbWVMaXN0aW5nc1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wcm9ncmFtbWVMaXN0XCIsXHJcbiAgIE1hbmFnZUxvY2F0aW9uc1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC93b3JrTG9jYXRpb25NYW5hZ2VtZW50XCIsXHJcbiAgIGdldEFuYWx5dGljc1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9BbmFseXRpY3NSZXBvcnRcIixcclxuICAgZ2V0Q2FsZW5kZXJVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvY2FsZW5kYXJUZW1wbGF0ZVwiLFxyXG4gICBhY2NvdW50aW5nVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2FjY291bnRpbmdcIixcclxuICAgbWVkaWNpbmVTZWFyY2hVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvbWVkaWNpbmVTZWFyY2hcIixcclxuXHJcblxyXG4gICAvL3NjaGVkdWxlXHJcbiAgIGdldExvY2F0aW9uVXJsOiBcImluZGV4LnBocC9sb2NhdGlvbnMvZ2V0RG9jdG9yTG9jYXRpb25zXCIsXHJcbiAgIGNyZWF0ZVVwZGF0ZVNjaGVkdWxlVXJsOiBcImluZGV4LnBocC9zY2hlZHVsZS9jcmVhdGVVcGRhdGVTY2hlZHVsZVwiLFxyXG4gICBnZXRTY2hlZHVsZUNhbGVuZGFyVXJsOiBcImluZGV4LnBocC9zY2hlZHVsZS9TY2hlZHVsZUNhbGVuZGVyVmlld1wiLFxyXG5cclxuICAgLy9wcm9ncmFtbWVcclxuICAgcHJvZ3JhbW1lTGlzdFVybDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0TWVkaWNhdGlvblByb2dyYW1tZUxpc3RcIixcclxuICAgcHJvZ3JhbW1lRWRpdFVybDpcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvY3JlYXRlTWVkaWNhbFByb2dyYW1cIixcclxuICAgY3JlYXRlTW9kaWZ5UHJvZ3JhbW1lVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9jcmVhdGVNb2RpZnlQcm9ncmFtbWVcIixcclxuICAgZ2V0UHJvZ3JhbW1lVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRQcm9ncmFtbWVzXCIsXHJcblxyXG5cclxuICAgLy9wYXRpZW50XHJcbiAgIHBhdGllbnREZXRhaWxQZXJzaXN0VXJsOlwiaW5kZXgucGhwL3BhdGllbnQvYWRkVXBkYXRlUGF0aWVudFwiLFxyXG4gICBwYXRpZW50c0RldGFpbHNVcmw6XCJpbmRleC5waHAvcGF0aWVudC9nZXRQYXRpZW50RGV0YWlsc1wiLFxyXG4gICBsb2dpbkNoZWNrVXJsOlwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9pc0xvZ2dlZEluXCIsXHJcbiAgIGdldFByb2dyYW1tZUxpc3Q6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldE1lZGljYXRpb25Qcm9ncmFtbWVMaXN0XCIsXHJcbiAgIHByb2dyYW1tZUxpc3REZXRhaWxzVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRQcm9ncmFtbWVMaXN0RGV0YWlsc1wiLFxyXG4gICBwYXRpZW50c1Byb2dyYW1tZXNVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldFBhdGllbnRQcm9ncmFtbWVzXCIsXHJcbiAgIHBhdGllbnRMaXN0aW5nVXJsOlwiaW5kZXgucGhwL3BhdGllbnQvZ2V0UGF0aWVudExpc3RcIixcclxuXHJcbiAgIHNhdmVVcGRhdGVMb2NhdGlvbnM6XCJpbmRleC5waHAvbG9jYXRpb25zL2FkZFVwZGF0ZUxvY2F0aW9uXCIsXHJcbiAgIGxvY2F0aW9uTGlzdFVybDpcImluZGV4LnBocC9sb2NhdGlvbnMvZ2V0RG9jdG9yTG9jYXRpb25zXCIsXHJcbiAgIGRlbGl2ZXJ5TWV0aG9kc1VybDpcImluZGV4LnBocC9wYXRpZW50L2dldERlbGl2ZXJ5TWV0aG9kc1wiLFxyXG5cclxuXHJcbiAgIC8vcmVnaXN0YXJ0aW9uXHJcbiAgIGRvY3RvclVybDpcImluZGV4LnBocC9kb2N0b3Ivc2F2ZVVwZGF0ZURvY3RvclwiLFxyXG4gICBkb2N0b3JEZXRhaWxzVXJsOlwiaW5kZXgucGhwL2RvY3Rvci9nZXREb2N0b3JEZXRhaWxzXCIsXHJcbiAgIGxvZ2luQ2hlY2tVcmw6XCJpbmRleC5waHAvYXV0aGVudGljYXRlL2lzTG9nZ2VkSW5cIixcclxuICAgZG9jdG9yRGFzaFVybDpcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvXCIsXHJcbiAgIGxvZ291dFVybDpcImluZGV4LnBocC9hdXRoZW50aWNhdGUvbG9nb3V0XCIsXHJcblxyXG4gICBjcmVhdGVNb2RpZnlTdGFmZlVybDpcImluZGV4LnBocC9zdGFmZi9jcmVhdGVNb2RpZnlTdGFmZlwiLFxyXG4gICBnZXRTdGFmZkRldGFpbHNVcmw6IFwiaW5kZXgucGhwL3N0YWZmL2dldFN0YWZmRGV0YWlsc1wiLFxyXG4gICBzdGFmZkxpc3RpbmdVcmw6IFwiaW5kZXgucGhwL3N0YWZmL2dldERvY3RvcnNTdGFmZkxpc3RcIlxyXG5cclxufVxyXG4iLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG5cclxuICAgIC8vZGVmaW5pbmcgdGhlIGhlbHBlciBmdW5jdGlvbnMgaW4gZ2xvYmFsXHJcblxyXG4gICAgJChmdW5jdGlvbigpe1xyXG5cclxuICAgICAgY29uc29sZS5sb2coJ0RvY3RvciBEYXNoYm9hcmQganMgbG9hZGVkJyk7XHJcblxyXG4gICAgICAgICAgLy90b3AgbGV2ZWwgY29udHJvbGxlclxyXG4gICAgICB2YXIgY29udHJvbGxlciA9IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgLy93aXJpbmcgdGhlIG5hdmlnYXRpb25cclxuICAgICAgICAgIHRoaXMubG9nb3V0VXJsID0gbGlua3MubG9nb3V0VXJsO1xyXG4gICAgICAgICAgdGhpcy5kb2N0b3JQcm9maWxlID0gbGlua3MuZG9jdG9yUHJvZmlsZTtcclxuICAgICAgICAgIHRoaXMuZGFzaGJvYXJkSG9tZVVybCA9IGxpbmtzLmRhc2hib2FyZEhvbWVVcmw7XHJcbiAgICAgICAgICB0aGlzLm5ld0FwcG9pbnRtZW50VXJsID0gbGlua3MubmV3QXBwb2ludG1lbnRVcmw7XHJcbiAgICAgICAgICB0aGlzLnBhdGllbnRzRW50cnlVcmwgPSBsaW5rcy5wYXRpZW50c0VudHJ5VXJsO1xyXG4gICAgICAgICAgdGhpcy5wYXRpZW50c0xpc3RpbmdVcmwgPSBsaW5rcy5wYXRpZW50c0xpc3RpbmdVcmw7XHJcbiAgICAgICAgICB0aGlzLmNsb3NlQXBwb2ludG1lbnRVcmwgPSBsaW5rcy5jbG9zZUFwcG9pbnRtZW50VXJsO1xyXG4gICAgICAgICAgdGhpcy5kb2N0b3JzQXBwb2ludG1lbnRzTGlzdFVybCA9IGxpbmtzLmRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsO1xyXG5cclxuICAgICAgICAgIHRoaXMubmV3U2NoZWR1bGVVcmwgPSBsaW5rcy5uZXdTY2hlZHVsZVVybDtcclxuICAgICAgICAgIHRoaXMubGlzdFNjaGVkdWxlVXJsID0gdGhpcy5saXN0U2NoZWR1bGVVcmw7XHJcbiAgICAgICAgICB0aGlzLlNjaGVkdWxlQ2FsZW5kYXJVcmwgPSBsaW5rcy5nZXRTY2hlZHVsZUNhbGVuZGFyVXJsO1xyXG4gICAgICAgICAgdGhpcy5hZGRTdGFmZlVybCA9IGxpbmtzLmFkZFN0YWZmVXJsO1xyXG4gICAgICAgICAgdGhpcy5kb2N0b3JzU3RhZmZMaXN0aW5nVXIgPSBsaW5rcy5kb2N0b3JzU3RhZmZMaXN0aW5nVXI7XHJcblxyXG4gICAgICAgICAgdGhpcy5wYXRpZW50c0hpc3RvcnlVcmwgPSBsaW5rcy5wYXRpZW50c0hpc3RvcnlVcmw7XHJcblxyXG4gICAgICAgICAgdGhpcy5jcmVhdGVQcm9ncmFtRm9yUGF0aWVudFVybCA9IGxpbmtzLmNyZWF0ZVByb2dyYW1Gb3JQYXRpZW50VXJsIDtcclxuICAgICAgICAgIHRoaXMucHJvZ3JhbW1lTGlzdGluZ3NVcmwgPSBsaW5rcy5wcm9ncmFtbWVMaXN0aW5nc1VybDtcclxuXHJcbiAgICAgICAgICB0aGlzLk1hbmFnZUxvY2F0aW9uc1VybCA9IGxpbmtzLk1hbmFnZUxvY2F0aW9uc1VybDtcclxuICAgICAgICAgIHRoaXMuQ2FsZW5kYXJUZW1wbGF0ZVVybCA9IGxpbmtzLmdldENhbGVuZGVyVXJsO1xyXG5cclxuICAgICAgICAgIHRoaXMuYW5hbHl0aWNzUmVwb3J0VXJsID0gbGlua3MuZ2V0QW5hbHl0aWNzVXJsO1xyXG4gICAgICAgICAgdGhpcy5hY2NvdW50aW5nVXJsID0gbGlua3MuYWNjb3VudGluZ1VybDtcclxuICAgICAgICAgIHRoaXMubWVkaWNpbmVTZWFyY2hVcmwgPSBsaW5rcy5tZWRpY2luZVNlYXJjaFVybDtcclxuICAgICAgICAgIC8vZG8gc29tZXRobmcgYWJvdXQgZG9jdG9ycyBpbmZvIGFuZCByZWdpc3RyYXRpb25cclxuXHJcbiAgICAgICAgICAvL1RoZSB1cmwgZnJvbSB0aGUgYnJvd3NlciAgY2FuIGJlIGNvbXBhcmVkIHRvIHNldCB0aGUgYWN0aXZlIG5hdmlnYXRpb25cclxuICAgICAgICAgIG5hdlZpZXcuaW5pdCgpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICB2YXIgbmF2VmlldyA9IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgIC8vd2lyaW5nIHRoZSBuYXZpZ2F0aW9uIGNsaWNrc1xyXG5cclxuXHJcbiAgICAgICAgICAkKFwiI3Btcy1icmFuZC1idG4tbGlua1wiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1BNUyBicmFuZCBjbGljaycpO1xyXG5cclxuICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgJChcIiNidG4tcHJvZ3JhbW1lLXNlY3Rpb24tbGlua1wiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJChcIiNjcmVhdGUtcHJvZ3JhbS1mb3ItcGF0aWVudC1zZWN0aW9uXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NyZWF0ZSBwcm9ncmFtIGZvciBwYXRpZW50Jyk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5jcmVhdGVQcm9ncmFtRm9yUGF0aWVudFVybDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKFwiI2J0bi1tYW5hZ2UtbG9jYXRpb25zXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ21hbmFnZSBsb2NhdGlvbnMnKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLk1hbmFnZUxvY2F0aW9uc1VybDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoXCIjYnRuLWxpc3QtcHJvZ3JhbS1zZWN0aW9uXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIucHJvZ3JhbW1lTGlzdGluZ3NVcmw7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKFwiI3BhdGllbnRzLWVudHJ5LWNyZWF0ZS1zZWN0aW9uLWxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygncGF0aWVudHMgRW50cnljbGljaycpO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5wYXRpZW50c0VudHJ5VXJsO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI3BhdGllbnRzLWVudHJ5LWxpc3Qtc2VjdGlvbi1saW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncGF0aWVudHMgbGlzdGluZyBjbGljaycpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIucGF0aWVudHNMaXN0aW5nVXJsO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiN1c2VyLVByb2ZpbGUtQnRuLUxpbmtcIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd1c2VyIHByb2ZpbGUgY2xpY2snKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuZG9jdG9yUHJvZmlsZTtcclxuXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI2RvY3Rvci1kYXNoLWxvZ291dC1idG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvZ291dCBjbGljaycpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIubG9nb3V0VXJsO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiNkYXNoYm9hcmQtU2VjdGlvbi1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5kYXNoYm9hcmRIb21lVXJsO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkYXNoYm9hcmQgY2xpY2snKTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICQoXCIjYm9vay1BcHBvaW50bWVudHMtU2VjdGlvbi1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5uZXdBcHBvaW50bWVudFVybDtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICQoXCIjY2xvc2UtQm9vay1BcHBvaW50bWVudC1TZWN0aW9uLUxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmNsb3NlQXBwb2ludG1lbnRVcmw7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI3ZpZXctQXBwb2ludG1lbnQtU2VjdGlvbi1MaW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5kb2N0b3JzQXBwb2ludG1lbnRzTGlzdFVybDtcclxuICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAkKFwiI21hbmFnZS1Eb2N0b3JzLVNjaGVkdWxlLVNlY3Rpb24tTGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzY2hlZHVsZSBjbGljaycpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiNtYW5hZ2Utc2NoZWR1bGUtY3JlYXRlLXNlY3Rpb24tbGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCduZXcgc2NoZWR1bGUgY2xpY2snKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIubmV3U2NoZWR1bGVVcmw7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI21hbmFnZS1zY2hlZHVsZS1saXN0LXNlY3Rpb24tbGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzY2hlZHVsZSBsaXN0IGNsaWNrJyk7XHJcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmxpc3RTY2hlZHVsZVVybDtcclxuICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgJChcIiNhZGQtU3RhZmYtU2VjdGlvbi1MaW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuYWRkU3RhZmZVcmw7XHJcbiAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICQoXCIjYnRuLXN0YWZmLWxpc3RpbmdcIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuZG9jdG9yc1N0YWZmTGlzdGluZ1VyO1xyXG4gICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJChcIiNjYWxlbmRhci1UZW1wbGF0ZS1CdG4tTGlua1wiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5DYWxlbmRhclRlbXBsYXRlVXJsO1xyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImhlbGxvIGhpZFwiKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICQoXCIjcGF0aWVudHMtSGlzdG9yeS1TZWN0aW9uLUxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5wYXRpZW50c0hpc3RvcnlVcmw7XHJcbiAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgJChcIiNtYW5hZ2Utc2NoZWR1bGUtbGlzdC1zZWN0aW9uLWxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5TY2hlZHVsZUNhbGVuZGFyVXJsO1xyXG4gICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICQoXCIjYXBwb2ludG1lbnQtc2VjdGlvbi1saW5rLWJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkKFwiI3BhdGllbnRzLUVudHJ5LVNlY3Rpb24tTGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAkKFwiI3N0YWZmLW1hbmFnbWVudC1zZWN0aW9uLWxpbmstYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAkKFwiI290aGVyLXNldHRpbmdzLXNlY3Rpb24tbGluay1idG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICQoXCIjY2FsZW5kYXItdGVtcGxhdGUtc2VjdGlvbi1saW5rLWJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgJChcIiNhbmFseXRpY3Mtc2lkZS1uYXZpZ2F0aW9uLWxpbmstYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5hbmFseXRpY3NSZXBvcnRVcmw7XHJcbiAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICQoXCIjYWNjb3VudGluZy1zaWRlLW5hdmlnYXRpb24tbGluay1idG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmFjY291bnRpbmdVcmw7XHJcbiAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICQoXCIjbWVkaWNpbmUtc2lkZS1uYXZpZ2F0aW9uLWxpbmstYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5tZWRpY2luZVNlYXJjaFVybDtcclxuICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAvL2hpZ2hsaWdodCB0aGUgcmlnaHQgbmF2aWdhdGlvblxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgIGNvbnRyb2xsZXIuaW5pdCgpO1xyXG5cclxuICB9KCkpO1xyXG5cclxufSk7XHJcbiIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgJChmdW5jdGlvbigpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdwYXRpZW50IEhpc3RvcnkganMgbG9hZGVkJyk7XHJcbiAgICB9KCkpO1xyXG5cclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
