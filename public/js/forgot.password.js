var links = {

  //login js urls
   authenticateUrl : "index.php/authenticate/authenitcateUser",
   successRedirectUrl : "index.php/doctorDashboard/",
   registerDoctorUrl : "index.php/doctor/doctorInfo",
   adminUrl:"index.php/adminDashboard/admin",

   //password reset
   passwordRestRequestUrl: "index.php/authenticate/resetPasswordRequest",
   loginUrl: "index.php/authenticate/login",
   passwordResetUrl: "index.php/authenticate/passwordReset",
   forgotPasswordUrl: "index.php/authenticate/forgotPassword",

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
   getSechduleCalendarDetailsUrl: "index.php/schedule/getCalanderDetails",

   //programme
   doctorsProgramsUrl:"index.php/programme/getDoctorsCheckupPrograms",
   programmeEditUrl:"index.php/doctorDashboard/createMedicalProgram",
   createModifyProgrammeUrl:"index.php/programme/createModifyProgramme",
   getProgrammeUrl:"index.php/programme/getProgrammes",


   //patient
   patientDetailPersistUrl:"index.php/patient/addUpdatePatient",
   patientsDetailsUrl:"index.php/patient/getPatientDetails",
   loginCheckUrl:"index.php/authenticate/isLoggedIn",
   getProgrammeList:"index.php/programme/getMedicationProgrammeList",
   programmeListDetailsUrl:"index.php/programme/getProgrammeListDetails",
   //patientsProgrammesUrl:"index.php/programme/getPatientProgrammes",
   patientListingUrl:"index.php/patient/getPatientList",

   bookAppointmentUrl: "index.php/appointment/bookAppointment",
   getAppointmentForTheDayUrl: "index.php/appointment/getAppointmentsForTheDay",

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

  $(function(){
    console.log('forgot password js loaded');
  }());

  var controller = {
    init: function(){
      this.loginUrl = links.loginUrl;
      this.passwordRestRequestUrl = links.passwordRestRequestUrl;
      view.init();
    },
    resetPasswordFor: function(userId){

      $.post( controller.passwordRestRequestUrl , { loginId: userId})
      .done(function( response ) {
        console.log('respose ' + JSON.stringify(response));
        view.hideAllAlerts();

        if(response.data.status == 0){
          console.log('password reset link has been sent to you');
          view.alertSuccess.removeClass('hidden');
          view.emailLabel.text(response.data.email);
          view.clearText();
        }else if(response.data.status == 2){
          console.log('this user is inactive');
          view.alertCantRest.removeClass('hidden');
        }

      });

    }
  };


  var view = {
    init: function(){
      this.txtLoginId = $('#txt-login-id');
      this.btnResetPassword = $('#btn-reset-password');
      this.linkLogin = $('#link-login');



      this.alertValidation = $('#alert-error');
      this.alertSuccess = $('#alert-success');
      this.alertCantRest = $('#alert-warning');
      this.alertInfo = $('#alert-info');

      this.emailLabel = $('#lbl-email');

      this.linkLogin.attr('href', controller.loginUrl);

      this.btnResetPassword.click(function(){
        view.hideAllAlerts();

        var loginId = view.txtLoginId.val();
        if(loginId || loginId.trim()){
          controller.resetPasswordFor(loginId);
        }else {
          console.log('please enter a user id');
          view.alertValidation.removeClass('hidden');
        }
      });

    },
    clearText: function(){
      this.txtLoginId.val('');
    },
    hideAllAlerts: function(){
      this.alertValidation.addClass('hidden');
      this.alertSuccess.addClass('hidden');
      this.alertCantRest.addClass('hidden');
      this.alertInfo.addClass('hidden');
    }
  };

  controller.init();

});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpbmtzLmpzIiwiZm9yZ290LnBhc3N3b3JkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImZvcmdvdC5wYXNzd29yZC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBsaW5rcyA9IHtcclxuXHJcbiAgLy9sb2dpbiBqcyB1cmxzXHJcbiAgIGF1dGhlbnRpY2F0ZVVybCA6IFwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9hdXRoZW5pdGNhdGVVc2VyXCIsXHJcbiAgIHN1Y2Nlc3NSZWRpcmVjdFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9cIixcclxuICAgcmVnaXN0ZXJEb2N0b3JVcmwgOiBcImluZGV4LnBocC9kb2N0b3IvZG9jdG9ySW5mb1wiLFxyXG4gICBhZG1pblVybDpcImluZGV4LnBocC9hZG1pbkRhc2hib2FyZC9hZG1pblwiLFxyXG5cclxuICAgLy9wYXNzd29yZCByZXNldFxyXG4gICBwYXNzd29yZFJlc3RSZXF1ZXN0VXJsOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvcmVzZXRQYXNzd29yZFJlcXVlc3RcIixcclxuICAgbG9naW5Vcmw6IFwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9sb2dpblwiLFxyXG4gICBwYXNzd29yZFJlc2V0VXJsOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvcGFzc3dvcmRSZXNldFwiLFxyXG4gICBmb3Jnb3RQYXNzd29yZFVybDogXCJpbmRleC5waHAvYXV0aGVudGljYXRlL2ZvcmdvdFBhc3N3b3JkXCIsXHJcblxyXG4gICAvL2FkbWluIHJlbGF0ZWRcclxuICAgZG9jdG9yTGlzdGluZ1VybDogXCJpbmRleC5waHAvYWRtaW5EYXNoYm9hcmQvZG9jdG9yTGlzdGluZ1wiLFxyXG5cclxuICAgbG9nb3V0VXJsIDogXCJpbmRleC5waHAvYXV0aGVudGljYXRlL2xvZ291dFwiLFxyXG5cclxuICAgLy9kb2N0b3IgZGFzaGJvYXJkIGxpbmtzXHJcbiAgIGRvY3RvclByb2ZpbGUgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvZG9jdG9yUHJvZmlsZVwiLFxyXG4gICBkYXNoYm9hcmRIb21lVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL1wiLFxyXG4gICBuZXdBcHBvaW50bWVudFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9ib29rQXBwb2ludG1lbnRcIixcclxuICAgcGF0aWVudHNFbnRyeVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wYXRpZW50c0VudHJ5XCIsXHJcbiAgIHBhdGllbnRzTGlzdGluZ1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wYXRpZW50c0xpc3RpbmdcIixcclxuICAgY2xvc2VBcHBvaW50bWVudFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jbG9zZUFwcG9pbnRtZW50XCIsXHJcbiAgIGRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2xpc3RBcHBvaW50bWVudFwiLFxyXG4gICBuZXdTY2hlZHVsZVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9uZXdTY2hlZHVsZVwiLFxyXG4gICBsaXN0U2NoZWR1bGVVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvc2NoZWR1bGVMaXN0XCIsXHJcbiAgIGdldFNjaGVkdWxlQ2FsZW5kYXJVcmw6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9TY2hlZHVsZUNhbGVuZGVyVmlld1wiLFxyXG4gICBhZGRTdGFmZlVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9zdGFmZkVudHJ5XCIsXHJcbiAgIGRvY3RvcnNTdGFmZkxpc3RpbmdVciA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9zdGFmZkxpc3RpbmdcIixcclxuICAgcGF0aWVudHNIaXN0b3J5VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3BhdGllbnRIaXN0b3J5XCIsXHJcbiAgIGNyZWF0ZVByb2dyYW1Gb3JQYXRpZW50VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2NyZWF0ZU1lZGljYWxQcm9ncmFtXCIsXHJcbiAgIHByb2dyYW1tZUxpc3RpbmdzVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3Byb2dyYW1tZUxpc3RcIixcclxuICAgTWFuYWdlTG9jYXRpb25zVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3dvcmtMb2NhdGlvbk1hbmFnZW1lbnRcIixcclxuICAgZ2V0QW5hbHl0aWNzVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL0FuYWx5dGljc1JlcG9ydFwiLFxyXG4gICBnZXRDYWxlbmRlclVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jYWxlbmRhclRlbXBsYXRlXCIsXHJcbiAgIGFjY291bnRpbmdVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvYWNjb3VudGluZ1wiLFxyXG4gICBtZWRpY2luZVNlYXJjaFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9tZWRpY2luZVNlYXJjaFwiLFxyXG5cclxuXHJcbiAgIC8vc2NoZWR1bGVcclxuICAgZ2V0TG9jYXRpb25Vcmw6IFwiaW5kZXgucGhwL2xvY2F0aW9ucy9nZXREb2N0b3JMb2NhdGlvbnNcIixcclxuICAgY3JlYXRlVXBkYXRlU2NoZWR1bGVVcmw6IFwiaW5kZXgucGhwL3NjaGVkdWxlL2NyZWF0ZVVwZGF0ZVNjaGVkdWxlXCIsXHJcbiAgIGdldFNlY2hkdWxlQ2FsZW5kYXJEZXRhaWxzVXJsOiBcImluZGV4LnBocC9zY2hlZHVsZS9nZXRDYWxhbmRlckRldGFpbHNcIixcclxuXHJcbiAgIC8vcHJvZ3JhbW1lXHJcbiAgIGRvY3RvcnNQcm9ncmFtc1VybDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0RG9jdG9yc0NoZWNrdXBQcm9ncmFtc1wiLFxyXG4gICBwcm9ncmFtbWVFZGl0VXJsOlwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jcmVhdGVNZWRpY2FsUHJvZ3JhbVwiLFxyXG4gICBjcmVhdGVNb2RpZnlQcm9ncmFtbWVVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2NyZWF0ZU1vZGlmeVByb2dyYW1tZVwiLFxyXG4gICBnZXRQcm9ncmFtbWVVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldFByb2dyYW1tZXNcIixcclxuXHJcblxyXG4gICAvL3BhdGllbnRcclxuICAgcGF0aWVudERldGFpbFBlcnNpc3RVcmw6XCJpbmRleC5waHAvcGF0aWVudC9hZGRVcGRhdGVQYXRpZW50XCIsXHJcbiAgIHBhdGllbnRzRGV0YWlsc1VybDpcImluZGV4LnBocC9wYXRpZW50L2dldFBhdGllbnREZXRhaWxzXCIsXHJcbiAgIGxvZ2luQ2hlY2tVcmw6XCJpbmRleC5waHAvYXV0aGVudGljYXRlL2lzTG9nZ2VkSW5cIixcclxuICAgZ2V0UHJvZ3JhbW1lTGlzdDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0TWVkaWNhdGlvblByb2dyYW1tZUxpc3RcIixcclxuICAgcHJvZ3JhbW1lTGlzdERldGFpbHNVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldFByb2dyYW1tZUxpc3REZXRhaWxzXCIsXHJcbiAgIC8vcGF0aWVudHNQcm9ncmFtbWVzVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRQYXRpZW50UHJvZ3JhbW1lc1wiLFxyXG4gICBwYXRpZW50TGlzdGluZ1VybDpcImluZGV4LnBocC9wYXRpZW50L2dldFBhdGllbnRMaXN0XCIsXHJcblxyXG4gICBib29rQXBwb2ludG1lbnRVcmw6IFwiaW5kZXgucGhwL2FwcG9pbnRtZW50L2Jvb2tBcHBvaW50bWVudFwiLFxyXG4gICBnZXRBcHBvaW50bWVudEZvclRoZURheVVybDogXCJpbmRleC5waHAvYXBwb2ludG1lbnQvZ2V0QXBwb2ludG1lbnRzRm9yVGhlRGF5XCIsXHJcblxyXG4gICBzYXZlVXBkYXRlTG9jYXRpb25zOlwiaW5kZXgucGhwL2xvY2F0aW9ucy9hZGRVcGRhdGVMb2NhdGlvblwiLFxyXG4gICBsb2NhdGlvbkxpc3RVcmw6XCJpbmRleC5waHAvbG9jYXRpb25zL2dldERvY3RvckxvY2F0aW9uc1wiLFxyXG4gICBkZWxpdmVyeU1ldGhvZHNVcmw6XCJpbmRleC5waHAvcGF0aWVudC9nZXREZWxpdmVyeU1ldGhvZHNcIixcclxuXHJcblxyXG4gICAvL3JlZ2lzdGFydGlvblxyXG4gICBkb2N0b3JVcmw6XCJpbmRleC5waHAvZG9jdG9yL3NhdmVVcGRhdGVEb2N0b3JcIixcclxuICAgZG9jdG9yRGV0YWlsc1VybDpcImluZGV4LnBocC9kb2N0b3IvZ2V0RG9jdG9yRGV0YWlsc1wiLFxyXG4gICBsb2dpbkNoZWNrVXJsOlwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9pc0xvZ2dlZEluXCIsXHJcbiAgIGRvY3RvckRhc2hVcmw6XCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL1wiLFxyXG4gICBsb2dvdXRVcmw6XCJpbmRleC5waHAvYXV0aGVudGljYXRlL2xvZ291dFwiLFxyXG5cclxuICAgY3JlYXRlTW9kaWZ5U3RhZmZVcmw6XCJpbmRleC5waHAvc3RhZmYvY3JlYXRlTW9kaWZ5U3RhZmZcIixcclxuICAgZ2V0U3RhZmZEZXRhaWxzVXJsOiBcImluZGV4LnBocC9zdGFmZi9nZXRTdGFmZkRldGFpbHNcIixcclxuICAgc3RhZmZMaXN0aW5nVXJsOiBcImluZGV4LnBocC9zdGFmZi9nZXREb2N0b3JzU3RhZmZMaXN0XCJcclxuXHJcbn1cclxuIiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuXHJcbiAgJChmdW5jdGlvbigpe1xyXG4gICAgY29uc29sZS5sb2coJ2ZvcmdvdCBwYXNzd29yZCBqcyBsb2FkZWQnKTtcclxuICB9KCkpO1xyXG5cclxuICB2YXIgY29udHJvbGxlciA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgIHRoaXMubG9naW5VcmwgPSBsaW5rcy5sb2dpblVybDtcclxuICAgICAgdGhpcy5wYXNzd29yZFJlc3RSZXF1ZXN0VXJsID0gbGlua3MucGFzc3dvcmRSZXN0UmVxdWVzdFVybDtcclxuICAgICAgdmlldy5pbml0KCk7XHJcbiAgICB9LFxyXG4gICAgcmVzZXRQYXNzd29yZEZvcjogZnVuY3Rpb24odXNlcklkKXtcclxuXHJcbiAgICAgICQucG9zdCggY29udHJvbGxlci5wYXNzd29yZFJlc3RSZXF1ZXN0VXJsICwgeyBsb2dpbklkOiB1c2VySWR9KVxyXG4gICAgICAuZG9uZShmdW5jdGlvbiggcmVzcG9uc2UgKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3Jlc3Bvc2UgJyArIEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSk7XHJcbiAgICAgICAgdmlldy5oaWRlQWxsQWxlcnRzKCk7XHJcblxyXG4gICAgICAgIGlmKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09IDApe1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ3Bhc3N3b3JkIHJlc2V0IGxpbmsgaGFzIGJlZW4gc2VudCB0byB5b3UnKTtcclxuICAgICAgICAgIHZpZXcuYWxlcnRTdWNjZXNzLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgIHZpZXcuZW1haWxMYWJlbC50ZXh0KHJlc3BvbnNlLmRhdGEuZW1haWwpO1xyXG4gICAgICAgICAgdmlldy5jbGVhclRleHQoKTtcclxuICAgICAgICB9ZWxzZSBpZihyZXNwb25zZS5kYXRhLnN0YXR1cyA9PSAyKXtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGlzIHVzZXIgaXMgaW5hY3RpdmUnKTtcclxuICAgICAgICAgIHZpZXcuYWxlcnRDYW50UmVzdC5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG4gIH07XHJcblxyXG5cclxuICB2YXIgdmlldyA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgIHRoaXMudHh0TG9naW5JZCA9ICQoJyN0eHQtbG9naW4taWQnKTtcclxuICAgICAgdGhpcy5idG5SZXNldFBhc3N3b3JkID0gJCgnI2J0bi1yZXNldC1wYXNzd29yZCcpO1xyXG4gICAgICB0aGlzLmxpbmtMb2dpbiA9ICQoJyNsaW5rLWxvZ2luJyk7XHJcblxyXG5cclxuXHJcbiAgICAgIHRoaXMuYWxlcnRWYWxpZGF0aW9uID0gJCgnI2FsZXJ0LWVycm9yJyk7XHJcbiAgICAgIHRoaXMuYWxlcnRTdWNjZXNzID0gJCgnI2FsZXJ0LXN1Y2Nlc3MnKTtcclxuICAgICAgdGhpcy5hbGVydENhbnRSZXN0ID0gJCgnI2FsZXJ0LXdhcm5pbmcnKTtcclxuICAgICAgdGhpcy5hbGVydEluZm8gPSAkKCcjYWxlcnQtaW5mbycpO1xyXG5cclxuICAgICAgdGhpcy5lbWFpbExhYmVsID0gJCgnI2xibC1lbWFpbCcpO1xyXG5cclxuICAgICAgdGhpcy5saW5rTG9naW4uYXR0cignaHJlZicsIGNvbnRyb2xsZXIubG9naW5VcmwpO1xyXG5cclxuICAgICAgdGhpcy5idG5SZXNldFBhc3N3b3JkLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmlldy5oaWRlQWxsQWxlcnRzKCk7XHJcblxyXG4gICAgICAgIHZhciBsb2dpbklkID0gdmlldy50eHRMb2dpbklkLnZhbCgpO1xyXG4gICAgICAgIGlmKGxvZ2luSWQgfHwgbG9naW5JZC50cmltKCkpe1xyXG4gICAgICAgICAgY29udHJvbGxlci5yZXNldFBhc3N3b3JkRm9yKGxvZ2luSWQpO1xyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdwbGVhc2UgZW50ZXIgYSB1c2VyIGlkJyk7XHJcbiAgICAgICAgICB2aWV3LmFsZXJ0VmFsaWRhdGlvbi5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG4gICAgY2xlYXJUZXh0OiBmdW5jdGlvbigpe1xyXG4gICAgICB0aGlzLnR4dExvZ2luSWQudmFsKCcnKTtcclxuICAgIH0sXHJcbiAgICBoaWRlQWxsQWxlcnRzOiBmdW5jdGlvbigpe1xyXG4gICAgICB0aGlzLmFsZXJ0VmFsaWRhdGlvbi5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgIHRoaXMuYWxlcnRTdWNjZXNzLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgdGhpcy5hbGVydENhbnRSZXN0LmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgdGhpcy5hbGVydEluZm8uYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnRyb2xsZXIuaW5pdCgpO1xyXG5cclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
