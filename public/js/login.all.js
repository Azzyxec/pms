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

  $(function(){
    console.log('login component');

    var controller = {
      init: function(){
        loginView.init();
      },
      authenticateUrl: links.authenticateUrl,
      successRedirectUrl: links.successRedirectUrl,
      registerDoctorUrl: links.registerDoctorUrl,
      forgotPaswordUrl: links.forgotPasswordUrl,
      adminUrl: links.adminUrl,
      authenticate: function(pLoginId, pPassword){
        $.post( controller.authenticateUrl , { loginId:  pLoginId, password:  pPassword })
        .done(function( response ) {
          console.log('response ' + JSON.stringify(response));

          if(response.data.type == "-1"){
            console.log('invalid username or password');
            loginView.alertCredentialsInvalid.removeClass('hidden');
          }else if(response.data.type == "A"){
            console.log('authenticated as admin');
            window.location.href = controller.adminUrl;
          }else if(response.data.type == "D"){
            console.log('authenticated as doctor');
            window.location.href = controller.successRedirectUrl;
          }else if(response.data.type == "S"){
            console.log('staff authenticated');
          }

        });
      }
    };

    var loginView = {
      init: function(){
        console.log('view init');

        this.loginId =  $('#login-id');
        this.password =  $('#login-password');

        this.alertLoginIdNeeded = $('#alert-user-id-needed');
        this.alertPassNeeded = $('#alert-password-needed');
        this.alertCredentialsInvalid = $('#alert-creds-invalid');

        var controls = {loginId: this.loginId, password: this.password};


        //wiring events
        $('#login-submit').on('click', function(){
            //console.log('handler exec : ' + cat.Id);
            console.log('click submit' + controls.loginId.val());
            console.log('url: ' + controller.authenticateUrl);

            loginView.hideAllAlerts();

            //validations
            var lloginId = loginView.loginId.val();
            var lpassword = loginView.password.val();

            if(!lloginId || !lloginId.trim()){
              console.log('pass');
              loginView.alertLoginIdNeeded.removeClass('hidden');
              return;
            }else if(!lpassword || !lpassword.trim()){
              console.log('confirm pass');
              loginView.alertPassNeeded.removeClass('hidden');
              return;
            }

            controller.authenticate(lloginId, lpassword);

        });

        $('#btn-register-doctor').attr('href', controller.registerDoctorUrl);
        $('#btn-forgot-password').attr('href', controller.forgotPaswordUrl);

      },
      hideAllAlerts: function(){
        this.alertLoginIdNeeded.addClass('hidden');
        this.alertPassNeeded.addClass('hidden');
        this.alertCredentialsInvalid.addClass('hidden');
      }
    };
    controller.init();

  }());

});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpbmtzLmpzIiwibG9naW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibG9naW4uYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGxpbmtzID0ge1xyXG5cclxuICAvL2xvZ2luIGpzIHVybHNcclxuICAgYXV0aGVudGljYXRlVXJsIDogXCJpbmRleC5waHAvYXV0aGVudGljYXRlL2F1dGhlbml0Y2F0ZVVzZXJcIixcclxuICAgc3VjY2Vzc1JlZGlyZWN0VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL1wiLFxyXG4gICByZWdpc3RlckRvY3RvclVybCA6IFwiaW5kZXgucGhwL2RvY3Rvci9kb2N0b3JJbmZvXCIsXHJcbiAgIGFkbWluVXJsOlwiaW5kZXgucGhwL2FkbWluRGFzaGJvYXJkL2FkbWluXCIsXHJcblxyXG4gICAvL3Bhc3N3b3JkIHJlc2V0XHJcbiAgIHBhc3N3b3JkUmVzdFJlcXVlc3RVcmw6IFwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9yZXNldFBhc3N3b3JkUmVxdWVzdFwiLFxyXG4gICBsb2dpblVybDogXCJpbmRleC5waHAvYXV0aGVudGljYXRlL2xvZ2luXCIsXHJcbiAgIHBhc3N3b3JkUmVzZXRVcmw6IFwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9wYXNzd29yZFJlc2V0XCIsXHJcbiAgIGZvcmdvdFBhc3N3b3JkVXJsOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvZm9yZ290UGFzc3dvcmRcIixcclxuXHJcbiAgIC8vYWRtaW4gcmVsYXRlZFxyXG4gICBkb2N0b3JMaXN0aW5nVXJsOiBcImluZGV4LnBocC9hZG1pbkRhc2hib2FyZC9kb2N0b3JMaXN0aW5nXCIsXHJcblxyXG4gICBsb2dvdXRVcmwgOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvbG9nb3V0XCIsXHJcblxyXG4gICAvL2RvY3RvciBkYXNoYm9hcmQgbGlua3NcclxuICAgZG9jdG9yUHJvZmlsZSA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9kb2N0b3JQcm9maWxlXCIsXHJcbiAgIGRhc2hib2FyZEhvbWVVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvXCIsXHJcbiAgIG5ld0FwcG9pbnRtZW50VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2Jvb2tBcHBvaW50bWVudFwiLFxyXG4gICBwYXRpZW50c0VudHJ5VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3BhdGllbnRzRW50cnlcIixcclxuICAgcGF0aWVudHNMaXN0aW5nVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3BhdGllbnRzTGlzdGluZ1wiLFxyXG4gICBjbG9zZUFwcG9pbnRtZW50VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2Nsb3NlQXBwb2ludG1lbnRcIixcclxuICAgZG9jdG9yc0FwcG9pbnRtZW50c0xpc3RVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvbGlzdEFwcG9pbnRtZW50XCIsXHJcbiAgIG5ld1NjaGVkdWxlVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL25ld1NjaGVkdWxlXCIsXHJcbiAgIGxpc3RTY2hlZHVsZVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9zY2hlZHVsZUxpc3RcIixcclxuICAgZ2V0U2NoZWR1bGVDYWxlbmRhclVybDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL1NjaGVkdWxlQ2FsZW5kZXJWaWV3XCIsXHJcbiAgIGFkZFN0YWZmVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3N0YWZmRW50cnlcIixcclxuICAgZG9jdG9yc1N0YWZmTGlzdGluZ1VyIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3N0YWZmTGlzdGluZ1wiLFxyXG4gICBwYXRpZW50c0hpc3RvcnlVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvcGF0aWVudEhpc3RvcnlcIixcclxuICAgY3JlYXRlUHJvZ3JhbUZvclBhdGllbnRVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvY3JlYXRlTWVkaWNhbFByb2dyYW1cIixcclxuICAgcHJvZ3JhbW1lTGlzdGluZ3NVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvcHJvZ3JhbW1lTGlzdFwiLFxyXG4gICBNYW5hZ2VMb2NhdGlvbnNVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvd29ya0xvY2F0aW9uTWFuYWdlbWVudFwiLFxyXG4gICBnZXRBbmFseXRpY3NVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvQW5hbHl0aWNzUmVwb3J0XCIsXHJcbiAgIGdldENhbGVuZGVyVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2NhbGVuZGFyVGVtcGxhdGVcIixcclxuICAgYWNjb3VudGluZ1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9hY2NvdW50aW5nXCIsXHJcbiAgIG1lZGljaW5lU2VhcmNoVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL21lZGljaW5lU2VhcmNoXCIsXHJcblxyXG5cclxuICAgLy9zY2hlZHVsZVxyXG4gICBnZXRMb2NhdGlvblVybDogXCJpbmRleC5waHAvbG9jYXRpb25zL2dldERvY3RvckxvY2F0aW9uc1wiLFxyXG4gICBjcmVhdGVVcGRhdGVTY2hlZHVsZVVybDogXCJpbmRleC5waHAvc2NoZWR1bGUvY3JlYXRlVXBkYXRlU2NoZWR1bGVcIixcclxuICAgZ2V0U2VjaGR1bGVDYWxlbmRhckRldGFpbHNVcmw6IFwiaW5kZXgucGhwL3NjaGVkdWxlL2dldENhbGFuZGVyRGV0YWlsc1wiLFxyXG5cclxuICAgLy9wcm9ncmFtbWVcclxuICAgcHJvZ3JhbW1lTGlzdFVybDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0TWVkaWNhdGlvblByb2dyYW1tZUxpc3RcIixcclxuICAgcHJvZ3JhbW1lRWRpdFVybDpcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvY3JlYXRlTWVkaWNhbFByb2dyYW1cIixcclxuICAgY3JlYXRlTW9kaWZ5UHJvZ3JhbW1lVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9jcmVhdGVNb2RpZnlQcm9ncmFtbWVcIixcclxuICAgZ2V0UHJvZ3JhbW1lVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRQcm9ncmFtbWVzXCIsXHJcblxyXG5cclxuICAgLy9wYXRpZW50XHJcbiAgIHBhdGllbnREZXRhaWxQZXJzaXN0VXJsOlwiaW5kZXgucGhwL3BhdGllbnQvYWRkVXBkYXRlUGF0aWVudFwiLFxyXG4gICBwYXRpZW50c0RldGFpbHNVcmw6XCJpbmRleC5waHAvcGF0aWVudC9nZXRQYXRpZW50RGV0YWlsc1wiLFxyXG4gICBsb2dpbkNoZWNrVXJsOlwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9pc0xvZ2dlZEluXCIsXHJcbiAgIGdldFByb2dyYW1tZUxpc3Q6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldE1lZGljYXRpb25Qcm9ncmFtbWVMaXN0XCIsXHJcbiAgIHByb2dyYW1tZUxpc3REZXRhaWxzVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRQcm9ncmFtbWVMaXN0RGV0YWlsc1wiLFxyXG4gICBwYXRpZW50c1Byb2dyYW1tZXNVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldFBhdGllbnRQcm9ncmFtbWVzXCIsXHJcbiAgIHBhdGllbnRMaXN0aW5nVXJsOlwiaW5kZXgucGhwL3BhdGllbnQvZ2V0UGF0aWVudExpc3RcIixcclxuXHJcbiAgIHNhdmVVcGRhdGVMb2NhdGlvbnM6XCJpbmRleC5waHAvbG9jYXRpb25zL2FkZFVwZGF0ZUxvY2F0aW9uXCIsXHJcbiAgIGxvY2F0aW9uTGlzdFVybDpcImluZGV4LnBocC9sb2NhdGlvbnMvZ2V0RG9jdG9yTG9jYXRpb25zXCIsXHJcbiAgIGRlbGl2ZXJ5TWV0aG9kc1VybDpcImluZGV4LnBocC9wYXRpZW50L2dldERlbGl2ZXJ5TWV0aG9kc1wiLFxyXG5cclxuXHJcbiAgIC8vcmVnaXN0YXJ0aW9uXHJcbiAgIGRvY3RvclVybDpcImluZGV4LnBocC9kb2N0b3Ivc2F2ZVVwZGF0ZURvY3RvclwiLFxyXG4gICBkb2N0b3JEZXRhaWxzVXJsOlwiaW5kZXgucGhwL2RvY3Rvci9nZXREb2N0b3JEZXRhaWxzXCIsXHJcbiAgIGxvZ2luQ2hlY2tVcmw6XCJpbmRleC5waHAvYXV0aGVudGljYXRlL2lzTG9nZ2VkSW5cIixcclxuICAgZG9jdG9yRGFzaFVybDpcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvXCIsXHJcbiAgIGxvZ291dFVybDpcImluZGV4LnBocC9hdXRoZW50aWNhdGUvbG9nb3V0XCIsXHJcblxyXG4gICBjcmVhdGVNb2RpZnlTdGFmZlVybDpcImluZGV4LnBocC9zdGFmZi9jcmVhdGVNb2RpZnlTdGFmZlwiLFxyXG4gICBnZXRTdGFmZkRldGFpbHNVcmw6IFwiaW5kZXgucGhwL3N0YWZmL2dldFN0YWZmRGV0YWlsc1wiLFxyXG4gICBzdGFmZkxpc3RpbmdVcmw6IFwiaW5kZXgucGhwL3N0YWZmL2dldERvY3RvcnNTdGFmZkxpc3RcIlxyXG5cclxufVxyXG4iLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG5cclxuICAkKGZ1bmN0aW9uKCl7XHJcbiAgICBjb25zb2xlLmxvZygnbG9naW4gY29tcG9uZW50Jyk7XHJcblxyXG4gICAgdmFyIGNvbnRyb2xsZXIgPSB7XHJcbiAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbG9naW5WaWV3LmluaXQoKTtcclxuICAgICAgfSxcclxuICAgICAgYXV0aGVudGljYXRlVXJsOiBsaW5rcy5hdXRoZW50aWNhdGVVcmwsXHJcbiAgICAgIHN1Y2Nlc3NSZWRpcmVjdFVybDogbGlua3Muc3VjY2Vzc1JlZGlyZWN0VXJsLFxyXG4gICAgICByZWdpc3RlckRvY3RvclVybDogbGlua3MucmVnaXN0ZXJEb2N0b3JVcmwsXHJcbiAgICAgIGZvcmdvdFBhc3dvcmRVcmw6IGxpbmtzLmZvcmdvdFBhc3N3b3JkVXJsLFxyXG4gICAgICBhZG1pblVybDogbGlua3MuYWRtaW5VcmwsXHJcbiAgICAgIGF1dGhlbnRpY2F0ZTogZnVuY3Rpb24ocExvZ2luSWQsIHBQYXNzd29yZCl7XHJcbiAgICAgICAgJC5wb3N0KCBjb250cm9sbGVyLmF1dGhlbnRpY2F0ZVVybCAsIHsgbG9naW5JZDogIHBMb2dpbklkLCBwYXNzd29yZDogIHBQYXNzd29yZCB9KVxyXG4gICAgICAgIC5kb25lKGZ1bmN0aW9uKCByZXNwb25zZSApIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXNwb25zZSAnICsgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcclxuXHJcbiAgICAgICAgICBpZihyZXNwb25zZS5kYXRhLnR5cGUgPT0gXCItMVwiKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2ludmFsaWQgdXNlcm5hbWUgb3IgcGFzc3dvcmQnKTtcclxuICAgICAgICAgICAgbG9naW5WaWV3LmFsZXJ0Q3JlZGVudGlhbHNJbnZhbGlkLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgIH1lbHNlIGlmKHJlc3BvbnNlLmRhdGEudHlwZSA9PSBcIkFcIil7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhdXRoZW50aWNhdGVkIGFzIGFkbWluJyk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5hZG1pblVybDtcclxuICAgICAgICAgIH1lbHNlIGlmKHJlc3BvbnNlLmRhdGEudHlwZSA9PSBcIkRcIil7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhdXRoZW50aWNhdGVkIGFzIGRvY3RvcicpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuc3VjY2Vzc1JlZGlyZWN0VXJsO1xyXG4gICAgICAgICAgfWVsc2UgaWYocmVzcG9uc2UuZGF0YS50eXBlID09IFwiU1wiKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3N0YWZmIGF1dGhlbnRpY2F0ZWQnKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdmFyIGxvZ2luVmlldyA9IHtcclxuICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICBjb25zb2xlLmxvZygndmlldyBpbml0Jyk7XHJcblxyXG4gICAgICAgIHRoaXMubG9naW5JZCA9ICAkKCcjbG9naW4taWQnKTtcclxuICAgICAgICB0aGlzLnBhc3N3b3JkID0gICQoJyNsb2dpbi1wYXNzd29yZCcpO1xyXG5cclxuICAgICAgICB0aGlzLmFsZXJ0TG9naW5JZE5lZWRlZCA9ICQoJyNhbGVydC11c2VyLWlkLW5lZWRlZCcpO1xyXG4gICAgICAgIHRoaXMuYWxlcnRQYXNzTmVlZGVkID0gJCgnI2FsZXJ0LXBhc3N3b3JkLW5lZWRlZCcpO1xyXG4gICAgICAgIHRoaXMuYWxlcnRDcmVkZW50aWFsc0ludmFsaWQgPSAkKCcjYWxlcnQtY3JlZHMtaW52YWxpZCcpO1xyXG5cclxuICAgICAgICB2YXIgY29udHJvbHMgPSB7bG9naW5JZDogdGhpcy5sb2dpbklkLCBwYXNzd29yZDogdGhpcy5wYXNzd29yZH07XHJcblxyXG5cclxuICAgICAgICAvL3dpcmluZyBldmVudHNcclxuICAgICAgICAkKCcjbG9naW4tc3VibWl0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnaGFuZGxlciBleGVjIDogJyArIGNhdC5JZCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjbGljayBzdWJtaXQnICsgY29udHJvbHMubG9naW5JZC52YWwoKSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd1cmw6ICcgKyBjb250cm9sbGVyLmF1dGhlbnRpY2F0ZVVybCk7XHJcblxyXG4gICAgICAgICAgICBsb2dpblZpZXcuaGlkZUFsbEFsZXJ0cygpO1xyXG5cclxuICAgICAgICAgICAgLy92YWxpZGF0aW9uc1xyXG4gICAgICAgICAgICB2YXIgbGxvZ2luSWQgPSBsb2dpblZpZXcubG9naW5JZC52YWwoKTtcclxuICAgICAgICAgICAgdmFyIGxwYXNzd29yZCA9IGxvZ2luVmlldy5wYXNzd29yZC52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKCFsbG9naW5JZCB8fCAhbGxvZ2luSWQudHJpbSgpKXtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygncGFzcycpO1xyXG4gICAgICAgICAgICAgIGxvZ2luVmlldy5hbGVydExvZ2luSWROZWVkZWQucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfWVsc2UgaWYoIWxwYXNzd29yZCB8fCAhbHBhc3N3b3JkLnRyaW0oKSl7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvbmZpcm0gcGFzcycpO1xyXG4gICAgICAgICAgICAgIGxvZ2luVmlldy5hbGVydFBhc3NOZWVkZWQucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29udHJvbGxlci5hdXRoZW50aWNhdGUobGxvZ2luSWQsIGxwYXNzd29yZCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcjYnRuLXJlZ2lzdGVyLWRvY3RvcicpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLnJlZ2lzdGVyRG9jdG9yVXJsKTtcclxuICAgICAgICAkKCcjYnRuLWZvcmdvdC1wYXNzd29yZCcpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmZvcmdvdFBhc3dvcmRVcmwpO1xyXG5cclxuICAgICAgfSxcclxuICAgICAgaGlkZUFsbEFsZXJ0czogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmFsZXJ0TG9naW5JZE5lZWRlZC5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgdGhpcy5hbGVydFBhc3NOZWVkZWQuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgIHRoaXMuYWxlcnRDcmVkZW50aWFsc0ludmFsaWQuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgY29udHJvbGxlci5pbml0KCk7XHJcblxyXG4gIH0oKSk7XHJcblxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
