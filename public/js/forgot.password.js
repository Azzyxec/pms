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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpbmtzLmpzIiwiZm9yZ290LnBhc3N3b3JkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJmb3Jnb3QucGFzc3dvcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgbGlua3MgPSB7XHJcblxyXG4gIC8vbG9naW4ganMgdXJsc1xyXG4gICBhdXRoZW50aWNhdGVVcmwgOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvYXV0aGVuaXRjYXRlVXNlclwiLFxyXG4gICBzdWNjZXNzUmVkaXJlY3RVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvXCIsXHJcbiAgIHJlZ2lzdGVyRG9jdG9yVXJsIDogXCJpbmRleC5waHAvZG9jdG9yL2RvY3RvckluZm9cIixcclxuICAgYWRtaW5Vcmw6XCJpbmRleC5waHAvYWRtaW5EYXNoYm9hcmQvYWRtaW5cIixcclxuXHJcbiAgIC8vcGFzc3dvcmQgcmVzZXRcclxuICAgcGFzc3dvcmRSZXN0UmVxdWVzdFVybDogXCJpbmRleC5waHAvYXV0aGVudGljYXRlL3Jlc2V0UGFzc3dvcmRSZXF1ZXN0XCIsXHJcbiAgIGxvZ2luVXJsOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvbG9naW5cIixcclxuICAgcGFzc3dvcmRSZXNldFVybDogXCJpbmRleC5waHAvYXV0aGVudGljYXRlL3Bhc3N3b3JkUmVzZXRcIixcclxuICAgZm9yZ290UGFzc3dvcmRVcmw6IFwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9mb3Jnb3RQYXNzd29yZFwiLFxyXG5cclxuICAgLy9hZG1pbiByZWxhdGVkXHJcbiAgIGRvY3Rvckxpc3RpbmdVcmw6IFwiaW5kZXgucGhwL2FkbWluRGFzaGJvYXJkL2RvY3Rvckxpc3RpbmdcIixcclxuXHJcbiAgIGxvZ291dFVybCA6IFwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9sb2dvdXRcIixcclxuXHJcbiAgIC8vZG9jdG9yIGRhc2hib2FyZCBsaW5rc1xyXG4gICBkb2N0b3JQcm9maWxlIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2RvY3RvclByb2ZpbGVcIixcclxuICAgZGFzaGJvYXJkSG9tZVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9cIixcclxuICAgbmV3QXBwb2ludG1lbnRVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvYm9va0FwcG9pbnRtZW50XCIsXHJcbiAgIHBhdGllbnRzRW50cnlVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvcGF0aWVudHNFbnRyeVwiLFxyXG4gICBwYXRpZW50c0xpc3RpbmdVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvcGF0aWVudHNMaXN0aW5nXCIsXHJcbiAgIGNsb3NlQXBwb2ludG1lbnRVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvY2xvc2VBcHBvaW50bWVudFwiLFxyXG4gICBkb2N0b3JzQXBwb2ludG1lbnRzTGlzdFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9saXN0QXBwb2ludG1lbnRcIixcclxuICAgbmV3U2NoZWR1bGVVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvbmV3U2NoZWR1bGVcIixcclxuICAgbGlzdFNjaGVkdWxlVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3NjaGVkdWxlTGlzdFwiLFxyXG4gICBnZXRTY2hlZHVsZUNhbGVuZGFyVXJsOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvU2NoZWR1bGVDYWxlbmRlclZpZXdcIixcclxuICAgYWRkU3RhZmZVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvc3RhZmZFbnRyeVwiLFxyXG4gICBkb2N0b3JzU3RhZmZMaXN0aW5nVXIgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvc3RhZmZMaXN0aW5nXCIsXHJcbiAgIHBhdGllbnRzSGlzdG9yeVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wYXRpZW50SGlzdG9yeVwiLFxyXG4gICBjcmVhdGVQcm9ncmFtRm9yUGF0aWVudFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jcmVhdGVNZWRpY2FsUHJvZ3JhbVwiLFxyXG4gICBwcm9ncmFtbWVMaXN0aW5nc1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wcm9ncmFtbWVMaXN0XCIsXHJcbiAgIE1hbmFnZUxvY2F0aW9uc1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC93b3JrTG9jYXRpb25NYW5hZ2VtZW50XCIsXHJcbiAgIGdldEFuYWx5dGljc1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9BbmFseXRpY3NSZXBvcnRcIixcclxuICAgZ2V0Q2FsZW5kZXJVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvY2FsZW5kYXJUZW1wbGF0ZVwiLFxyXG4gICBhY2NvdW50aW5nVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2FjY291bnRpbmdcIixcclxuICAgbWVkaWNpbmVTZWFyY2hVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvbWVkaWNpbmVTZWFyY2hcIixcclxuXHJcblxyXG4gICAvL3NjaGVkdWxlXHJcbiAgIGdldExvY2F0aW9uVXJsOiBcImluZGV4LnBocC9sb2NhdGlvbnMvZ2V0RG9jdG9yTG9jYXRpb25zXCIsXHJcbiAgIGNyZWF0ZVVwZGF0ZVNjaGVkdWxlVXJsOiBcImluZGV4LnBocC9zY2hlZHVsZS9jcmVhdGVVcGRhdGVTY2hlZHVsZVwiLFxyXG4gICBnZXRTZWNoZHVsZUNhbGVuZGFyRGV0YWlsc1VybDogXCJpbmRleC5waHAvc2NoZWR1bGUvZ2V0Q2FsYW5kZXJEZXRhaWxzXCIsXHJcblxyXG4gICAvL3Byb2dyYW1tZVxyXG4gICBkb2N0b3JzUHJvZ3JhbXNVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldERvY3RvcnNDaGVja3VwUHJvZ3JhbXNcIixcclxuICAgcHJvZ3JhbW1lRWRpdFVybDpcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvY3JlYXRlTWVkaWNhbFByb2dyYW1cIixcclxuICAgY3JlYXRlTW9kaWZ5UHJvZ3JhbW1lVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9jcmVhdGVNb2RpZnlQcm9ncmFtbWVcIixcclxuICAgZ2V0UHJvZ3JhbW1lVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRQcm9ncmFtbWVzXCIsXHJcblxyXG5cclxuICAgLy9wYXRpZW50XHJcbiAgIHBhdGllbnREZXRhaWxQZXJzaXN0VXJsOlwiaW5kZXgucGhwL3BhdGllbnQvYWRkVXBkYXRlUGF0aWVudFwiLFxyXG4gICBwYXRpZW50c0RldGFpbHNVcmw6XCJpbmRleC5waHAvcGF0aWVudC9nZXRQYXRpZW50RGV0YWlsc1wiLFxyXG4gICBsb2dpbkNoZWNrVXJsOlwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9pc0xvZ2dlZEluXCIsXHJcbiAgIGdldFByb2dyYW1tZUxpc3Q6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldE1lZGljYXRpb25Qcm9ncmFtbWVMaXN0XCIsXHJcbiAgIHByb2dyYW1tZUxpc3REZXRhaWxzVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRQcm9ncmFtbWVMaXN0RGV0YWlsc1wiLFxyXG4gICAvL3BhdGllbnRzUHJvZ3JhbW1lc1VybDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0UGF0aWVudFByb2dyYW1tZXNcIixcclxuICAgcGF0aWVudExpc3RpbmdVcmw6XCJpbmRleC5waHAvcGF0aWVudC9nZXRQYXRpZW50TGlzdFwiLFxyXG5cclxuICAgYm9va0FwcG9pbnRtZW50VXJsOiBcImluZGV4LnBocC9hcHBvaW50bWVudC9ib29rQXBwb2ludG1lbnRcIixcclxuXHJcbiAgIHNhdmVVcGRhdGVMb2NhdGlvbnM6XCJpbmRleC5waHAvbG9jYXRpb25zL2FkZFVwZGF0ZUxvY2F0aW9uXCIsXHJcbiAgIGxvY2F0aW9uTGlzdFVybDpcImluZGV4LnBocC9sb2NhdGlvbnMvZ2V0RG9jdG9yTG9jYXRpb25zXCIsXHJcbiAgIGRlbGl2ZXJ5TWV0aG9kc1VybDpcImluZGV4LnBocC9wYXRpZW50L2dldERlbGl2ZXJ5TWV0aG9kc1wiLFxyXG5cclxuXHJcbiAgIC8vcmVnaXN0YXJ0aW9uXHJcbiAgIGRvY3RvclVybDpcImluZGV4LnBocC9kb2N0b3Ivc2F2ZVVwZGF0ZURvY3RvclwiLFxyXG4gICBkb2N0b3JEZXRhaWxzVXJsOlwiaW5kZXgucGhwL2RvY3Rvci9nZXREb2N0b3JEZXRhaWxzXCIsXHJcbiAgIGxvZ2luQ2hlY2tVcmw6XCJpbmRleC5waHAvYXV0aGVudGljYXRlL2lzTG9nZ2VkSW5cIixcclxuICAgZG9jdG9yRGFzaFVybDpcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvXCIsXHJcbiAgIGxvZ291dFVybDpcImluZGV4LnBocC9hdXRoZW50aWNhdGUvbG9nb3V0XCIsXHJcblxyXG4gICBjcmVhdGVNb2RpZnlTdGFmZlVybDpcImluZGV4LnBocC9zdGFmZi9jcmVhdGVNb2RpZnlTdGFmZlwiLFxyXG4gICBnZXRTdGFmZkRldGFpbHNVcmw6IFwiaW5kZXgucGhwL3N0YWZmL2dldFN0YWZmRGV0YWlsc1wiLFxyXG4gICBzdGFmZkxpc3RpbmdVcmw6IFwiaW5kZXgucGhwL3N0YWZmL2dldERvY3RvcnNTdGFmZkxpc3RcIlxyXG5cclxufVxyXG4iLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG5cclxuICAkKGZ1bmN0aW9uKCl7XHJcbiAgICBjb25zb2xlLmxvZygnZm9yZ290IHBhc3N3b3JkIGpzIGxvYWRlZCcpO1xyXG4gIH0oKSk7XHJcblxyXG4gIHZhciBjb250cm9sbGVyID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgdGhpcy5sb2dpblVybCA9IGxpbmtzLmxvZ2luVXJsO1xyXG4gICAgICB0aGlzLnBhc3N3b3JkUmVzdFJlcXVlc3RVcmwgPSBsaW5rcy5wYXNzd29yZFJlc3RSZXF1ZXN0VXJsO1xyXG4gICAgICB2aWV3LmluaXQoKTtcclxuICAgIH0sXHJcbiAgICByZXNldFBhc3N3b3JkRm9yOiBmdW5jdGlvbih1c2VySWQpe1xyXG5cclxuICAgICAgJC5wb3N0KCBjb250cm9sbGVyLnBhc3N3b3JkUmVzdFJlcXVlc3RVcmwgLCB7IGxvZ2luSWQ6IHVzZXJJZH0pXHJcbiAgICAgIC5kb25lKGZ1bmN0aW9uKCByZXNwb25zZSApIHtcclxuICAgICAgICBjb25zb2xlLmxvZygncmVzcG9zZSAnICsgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcclxuICAgICAgICB2aWV3LmhpZGVBbGxBbGVydHMoKTtcclxuXHJcbiAgICAgICAgaWYocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT0gMCl7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygncGFzc3dvcmQgcmVzZXQgbGluayBoYXMgYmVlbiBzZW50IHRvIHlvdScpO1xyXG4gICAgICAgICAgdmlldy5hbGVydFN1Y2Nlc3MucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgdmlldy5lbWFpbExhYmVsLnRleHQocmVzcG9uc2UuZGF0YS5lbWFpbCk7XHJcbiAgICAgICAgICB2aWV3LmNsZWFyVGV4dCgpO1xyXG4gICAgICAgIH1lbHNlIGlmKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09IDIpe1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ3RoaXMgdXNlciBpcyBpbmFjdGl2ZScpO1xyXG4gICAgICAgICAgdmlldy5hbGVydENhbnRSZXN0LnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcblxyXG4gIHZhciB2aWV3ID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgdGhpcy50eHRMb2dpbklkID0gJCgnI3R4dC1sb2dpbi1pZCcpO1xyXG4gICAgICB0aGlzLmJ0blJlc2V0UGFzc3dvcmQgPSAkKCcjYnRuLXJlc2V0LXBhc3N3b3JkJyk7XHJcbiAgICAgIHRoaXMubGlua0xvZ2luID0gJCgnI2xpbmstbG9naW4nKTtcclxuXHJcblxyXG5cclxuICAgICAgdGhpcy5hbGVydFZhbGlkYXRpb24gPSAkKCcjYWxlcnQtZXJyb3InKTtcclxuICAgICAgdGhpcy5hbGVydFN1Y2Nlc3MgPSAkKCcjYWxlcnQtc3VjY2VzcycpO1xyXG4gICAgICB0aGlzLmFsZXJ0Q2FudFJlc3QgPSAkKCcjYWxlcnQtd2FybmluZycpO1xyXG4gICAgICB0aGlzLmFsZXJ0SW5mbyA9ICQoJyNhbGVydC1pbmZvJyk7XHJcblxyXG4gICAgICB0aGlzLmVtYWlsTGFiZWwgPSAkKCcjbGJsLWVtYWlsJyk7XHJcblxyXG4gICAgICB0aGlzLmxpbmtMb2dpbi5hdHRyKCdocmVmJywgY29udHJvbGxlci5sb2dpblVybCk7XHJcblxyXG4gICAgICB0aGlzLmJ0blJlc2V0UGFzc3dvcmQuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICB2aWV3LmhpZGVBbGxBbGVydHMoKTtcclxuXHJcbiAgICAgICAgdmFyIGxvZ2luSWQgPSB2aWV3LnR4dExvZ2luSWQudmFsKCk7XHJcbiAgICAgICAgaWYobG9naW5JZCB8fCBsb2dpbklkLnRyaW0oKSl7XHJcbiAgICAgICAgICBjb250cm9sbGVyLnJlc2V0UGFzc3dvcmRGb3IobG9naW5JZCk7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ3BsZWFzZSBlbnRlciBhIHVzZXIgaWQnKTtcclxuICAgICAgICAgIHZpZXcuYWxlcnRWYWxpZGF0aW9uLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcbiAgICBjbGVhclRleHQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgIHRoaXMudHh0TG9naW5JZC52YWwoJycpO1xyXG4gICAgfSxcclxuICAgIGhpZGVBbGxBbGVydHM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgIHRoaXMuYWxlcnRWYWxpZGF0aW9uLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgdGhpcy5hbGVydFN1Y2Nlc3MuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICB0aGlzLmFsZXJ0Q2FudFJlc3QuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICB0aGlzLmFsZXJ0SW5mby5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29udHJvbGxlci5pbml0KCk7XHJcblxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
