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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpbmtzLmpzIiwibG9naW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImxvZ2luLmFsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBsaW5rcyA9IHtcclxuXHJcbiAgLy9sb2dpbiBqcyB1cmxzXHJcbiAgIGF1dGhlbnRpY2F0ZVVybCA6IFwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9hdXRoZW5pdGNhdGVVc2VyXCIsXHJcbiAgIHN1Y2Nlc3NSZWRpcmVjdFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9cIixcclxuICAgcmVnaXN0ZXJEb2N0b3JVcmwgOiBcImluZGV4LnBocC9kb2N0b3IvZG9jdG9ySW5mb1wiLFxyXG4gICBhZG1pblVybDpcImluZGV4LnBocC9hZG1pbkRhc2hib2FyZC9hZG1pblwiLFxyXG5cclxuICAgLy9wYXNzd29yZCByZXNldFxyXG4gICBwYXNzd29yZFJlc3RSZXF1ZXN0VXJsOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvcmVzZXRQYXNzd29yZFJlcXVlc3RcIixcclxuICAgbG9naW5Vcmw6IFwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9sb2dpblwiLFxyXG4gICBwYXNzd29yZFJlc2V0VXJsOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvcGFzc3dvcmRSZXNldFwiLFxyXG4gICBmb3Jnb3RQYXNzd29yZFVybDogXCJpbmRleC5waHAvYXV0aGVudGljYXRlL2ZvcmdvdFBhc3N3b3JkXCIsXHJcblxyXG4gICAvL2FkbWluIHJlbGF0ZWRcclxuICAgZG9jdG9yTGlzdGluZ1VybDogXCJpbmRleC5waHAvYWRtaW5EYXNoYm9hcmQvZG9jdG9yTGlzdGluZ1wiLFxyXG5cclxuICAgbG9nb3V0VXJsIDogXCJpbmRleC5waHAvYXV0aGVudGljYXRlL2xvZ291dFwiLFxyXG5cclxuICAgLy9kb2N0b3IgZGFzaGJvYXJkIGxpbmtzXHJcbiAgIGRvY3RvclByb2ZpbGUgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvZG9jdG9yUHJvZmlsZVwiLFxyXG4gICBkYXNoYm9hcmRIb21lVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL1wiLFxyXG4gICBuZXdBcHBvaW50bWVudFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9ib29rQXBwb2ludG1lbnRcIixcclxuICAgcGF0aWVudHNFbnRyeVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wYXRpZW50c0VudHJ5XCIsXHJcbiAgIHBhdGllbnRzTGlzdGluZ1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wYXRpZW50c0xpc3RpbmdcIixcclxuICAgY2xvc2VBcHBvaW50bWVudFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jbG9zZUFwcG9pbnRtZW50XCIsXHJcbiAgIGRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2xpc3RBcHBvaW50bWVudFwiLFxyXG4gICBuZXdTY2hlZHVsZVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9uZXdTY2hlZHVsZVwiLFxyXG4gICBsaXN0U2NoZWR1bGVVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvc2NoZWR1bGVMaXN0XCIsXHJcbiAgIGdldFNjaGVkdWxlQ2FsZW5kYXJVcmw6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9TY2hlZHVsZUNhbGVuZGVyVmlld1wiLFxyXG4gICBhZGRTdGFmZlVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9zdGFmZkVudHJ5XCIsXHJcbiAgIGRvY3RvcnNTdGFmZkxpc3RpbmdVciA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9zdGFmZkxpc3RpbmdcIixcclxuICAgcGF0aWVudHNIaXN0b3J5VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3BhdGllbnRIaXN0b3J5XCIsXHJcbiAgIGNyZWF0ZVByb2dyYW1Gb3JQYXRpZW50VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2NyZWF0ZU1lZGljYWxQcm9ncmFtXCIsXHJcbiAgIHByb2dyYW1tZUxpc3RpbmdzVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3Byb2dyYW1tZUxpc3RcIixcclxuICAgTWFuYWdlTG9jYXRpb25zVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3dvcmtMb2NhdGlvbk1hbmFnZW1lbnRcIixcclxuICAgZ2V0QW5hbHl0aWNzVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL0FuYWx5dGljc1JlcG9ydFwiLFxyXG4gICBnZXRDYWxlbmRlclVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jYWxlbmRhclRlbXBsYXRlXCIsXHJcbiAgIGFjY291bnRpbmdVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvYWNjb3VudGluZ1wiLFxyXG4gICBtZWRpY2luZVNlYXJjaFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9tZWRpY2luZVNlYXJjaFwiLFxyXG5cclxuXHJcbiAgIC8vc2NoZWR1bGVcclxuICAgZ2V0TG9jYXRpb25Vcmw6IFwiaW5kZXgucGhwL2xvY2F0aW9ucy9nZXREb2N0b3JMb2NhdGlvbnNcIixcclxuICAgY3JlYXRlVXBkYXRlU2NoZWR1bGVVcmw6IFwiaW5kZXgucGhwL3NjaGVkdWxlL2NyZWF0ZVVwZGF0ZVNjaGVkdWxlXCIsXHJcbiAgIGdldFNlY2hkdWxlQ2FsZW5kYXJEZXRhaWxzVXJsOiBcImluZGV4LnBocC9zY2hlZHVsZS9nZXRDYWxhbmRlckRldGFpbHNcIixcclxuXHJcbiAgIC8vcHJvZ3JhbW1lXHJcbiAgIGRvY3RvcnNQcm9ncmFtc1VybDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0RG9jdG9yc0NoZWNrdXBQcm9ncmFtc1wiLFxyXG4gICBwcm9ncmFtbWVFZGl0VXJsOlwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jcmVhdGVNZWRpY2FsUHJvZ3JhbVwiLFxyXG4gICBjcmVhdGVNb2RpZnlQcm9ncmFtbWVVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2NyZWF0ZU1vZGlmeVByb2dyYW1tZVwiLFxyXG4gICBnZXRQcm9ncmFtbWVVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldFByb2dyYW1tZXNcIixcclxuXHJcblxyXG4gICAvL3BhdGllbnRcclxuICAgcGF0aWVudERldGFpbFBlcnNpc3RVcmw6XCJpbmRleC5waHAvcGF0aWVudC9hZGRVcGRhdGVQYXRpZW50XCIsXHJcbiAgIHBhdGllbnRzRGV0YWlsc1VybDpcImluZGV4LnBocC9wYXRpZW50L2dldFBhdGllbnREZXRhaWxzXCIsXHJcbiAgIGxvZ2luQ2hlY2tVcmw6XCJpbmRleC5waHAvYXV0aGVudGljYXRlL2lzTG9nZ2VkSW5cIixcclxuICAgZ2V0UHJvZ3JhbW1lTGlzdDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0TWVkaWNhdGlvblByb2dyYW1tZUxpc3RcIixcclxuICAgcHJvZ3JhbW1lTGlzdERldGFpbHNVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldFByb2dyYW1tZUxpc3REZXRhaWxzXCIsXHJcbiAgIC8vcGF0aWVudHNQcm9ncmFtbWVzVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRQYXRpZW50UHJvZ3JhbW1lc1wiLFxyXG4gICBwYXRpZW50TGlzdGluZ1VybDpcImluZGV4LnBocC9wYXRpZW50L2dldFBhdGllbnRMaXN0XCIsXHJcblxyXG4gICBib29rQXBwb2ludG1lbnRVcmw6IFwiaW5kZXgucGhwL2FwcG9pbnRtZW50L2Jvb2tBcHBvaW50bWVudFwiLFxyXG5cclxuICAgc2F2ZVVwZGF0ZUxvY2F0aW9uczpcImluZGV4LnBocC9sb2NhdGlvbnMvYWRkVXBkYXRlTG9jYXRpb25cIixcclxuICAgbG9jYXRpb25MaXN0VXJsOlwiaW5kZXgucGhwL2xvY2F0aW9ucy9nZXREb2N0b3JMb2NhdGlvbnNcIixcclxuICAgZGVsaXZlcnlNZXRob2RzVXJsOlwiaW5kZXgucGhwL3BhdGllbnQvZ2V0RGVsaXZlcnlNZXRob2RzXCIsXHJcblxyXG5cclxuICAgLy9yZWdpc3RhcnRpb25cclxuICAgZG9jdG9yVXJsOlwiaW5kZXgucGhwL2RvY3Rvci9zYXZlVXBkYXRlRG9jdG9yXCIsXHJcbiAgIGRvY3RvckRldGFpbHNVcmw6XCJpbmRleC5waHAvZG9jdG9yL2dldERvY3RvckRldGFpbHNcIixcclxuICAgbG9naW5DaGVja1VybDpcImluZGV4LnBocC9hdXRoZW50aWNhdGUvaXNMb2dnZWRJblwiLFxyXG4gICBkb2N0b3JEYXNoVXJsOlwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9cIixcclxuICAgbG9nb3V0VXJsOlwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9sb2dvdXRcIixcclxuXHJcbiAgIGNyZWF0ZU1vZGlmeVN0YWZmVXJsOlwiaW5kZXgucGhwL3N0YWZmL2NyZWF0ZU1vZGlmeVN0YWZmXCIsXHJcbiAgIGdldFN0YWZmRGV0YWlsc1VybDogXCJpbmRleC5waHAvc3RhZmYvZ2V0U3RhZmZEZXRhaWxzXCIsXHJcbiAgIHN0YWZmTGlzdGluZ1VybDogXCJpbmRleC5waHAvc3RhZmYvZ2V0RG9jdG9yc1N0YWZmTGlzdFwiXHJcblxyXG59XHJcbiIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcblxyXG4gICQoZnVuY3Rpb24oKXtcclxuICAgIGNvbnNvbGUubG9nKCdsb2dpbiBjb21wb25lbnQnKTtcclxuXHJcbiAgICB2YXIgY29udHJvbGxlciA9IHtcclxuICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICBsb2dpblZpZXcuaW5pdCgpO1xyXG4gICAgICB9LFxyXG4gICAgICBhdXRoZW50aWNhdGVVcmw6IGxpbmtzLmF1dGhlbnRpY2F0ZVVybCxcclxuICAgICAgc3VjY2Vzc1JlZGlyZWN0VXJsOiBsaW5rcy5zdWNjZXNzUmVkaXJlY3RVcmwsXHJcbiAgICAgIHJlZ2lzdGVyRG9jdG9yVXJsOiBsaW5rcy5yZWdpc3RlckRvY3RvclVybCxcclxuICAgICAgZm9yZ290UGFzd29yZFVybDogbGlua3MuZm9yZ290UGFzc3dvcmRVcmwsXHJcbiAgICAgIGFkbWluVXJsOiBsaW5rcy5hZG1pblVybCxcclxuICAgICAgYXV0aGVudGljYXRlOiBmdW5jdGlvbihwTG9naW5JZCwgcFBhc3N3b3JkKXtcclxuICAgICAgICAkLnBvc3QoIGNvbnRyb2xsZXIuYXV0aGVudGljYXRlVXJsICwgeyBsb2dpbklkOiAgcExvZ2luSWQsIHBhc3N3b3JkOiAgcFBhc3N3b3JkIH0pXHJcbiAgICAgICAgLmRvbmUoZnVuY3Rpb24oIHJlc3BvbnNlICkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3BvbnNlICcgKyBKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xyXG5cclxuICAgICAgICAgIGlmKHJlc3BvbnNlLmRhdGEudHlwZSA9PSBcIi0xXCIpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaW52YWxpZCB1c2VybmFtZSBvciBwYXNzd29yZCcpO1xyXG4gICAgICAgICAgICBsb2dpblZpZXcuYWxlcnRDcmVkZW50aWFsc0ludmFsaWQucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgfWVsc2UgaWYocmVzcG9uc2UuZGF0YS50eXBlID09IFwiQVwiKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2F1dGhlbnRpY2F0ZWQgYXMgYWRtaW4nKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmFkbWluVXJsO1xyXG4gICAgICAgICAgfWVsc2UgaWYocmVzcG9uc2UuZGF0YS50eXBlID09IFwiRFwiKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2F1dGhlbnRpY2F0ZWQgYXMgZG9jdG9yJyk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5zdWNjZXNzUmVkaXJlY3RVcmw7XHJcbiAgICAgICAgICB9ZWxzZSBpZihyZXNwb25zZS5kYXRhLnR5cGUgPT0gXCJTXCIpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc3RhZmYgYXV0aGVudGljYXRlZCcpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgbG9naW5WaWV3ID0ge1xyXG4gICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCd2aWV3IGluaXQnKTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2dpbklkID0gICQoJyNsb2dpbi1pZCcpO1xyXG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSAgJCgnI2xvZ2luLXBhc3N3b3JkJyk7XHJcblxyXG4gICAgICAgIHRoaXMuYWxlcnRMb2dpbklkTmVlZGVkID0gJCgnI2FsZXJ0LXVzZXItaWQtbmVlZGVkJyk7XHJcbiAgICAgICAgdGhpcy5hbGVydFBhc3NOZWVkZWQgPSAkKCcjYWxlcnQtcGFzc3dvcmQtbmVlZGVkJyk7XHJcbiAgICAgICAgdGhpcy5hbGVydENyZWRlbnRpYWxzSW52YWxpZCA9ICQoJyNhbGVydC1jcmVkcy1pbnZhbGlkJyk7XHJcblxyXG4gICAgICAgIHZhciBjb250cm9scyA9IHtsb2dpbklkOiB0aGlzLmxvZ2luSWQsIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkfTtcclxuXHJcblxyXG4gICAgICAgIC8vd2lyaW5nIGV2ZW50c1xyXG4gICAgICAgICQoJyNsb2dpbi1zdWJtaXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdoYW5kbGVyIGV4ZWMgOiAnICsgY2F0LklkKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NsaWNrIHN1Ym1pdCcgKyBjb250cm9scy5sb2dpbklkLnZhbCgpKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3VybDogJyArIGNvbnRyb2xsZXIuYXV0aGVudGljYXRlVXJsKTtcclxuXHJcbiAgICAgICAgICAgIGxvZ2luVmlldy5oaWRlQWxsQWxlcnRzKCk7XHJcblxyXG4gICAgICAgICAgICAvL3ZhbGlkYXRpb25zXHJcbiAgICAgICAgICAgIHZhciBsbG9naW5JZCA9IGxvZ2luVmlldy5sb2dpbklkLnZhbCgpO1xyXG4gICAgICAgICAgICB2YXIgbHBhc3N3b3JkID0gbG9naW5WaWV3LnBhc3N3b3JkLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgaWYoIWxsb2dpbklkIHx8ICFsbG9naW5JZC50cmltKCkpe1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwYXNzJyk7XHJcbiAgICAgICAgICAgICAgbG9naW5WaWV3LmFsZXJ0TG9naW5JZE5lZWRlZC5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZighbHBhc3N3b3JkIHx8ICFscGFzc3dvcmQudHJpbSgpKXtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY29uZmlybSBwYXNzJyk7XHJcbiAgICAgICAgICAgICAgbG9naW5WaWV3LmFsZXJ0UGFzc05lZWRlZC5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb250cm9sbGVyLmF1dGhlbnRpY2F0ZShsbG9naW5JZCwgbHBhc3N3b3JkKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJyNidG4tcmVnaXN0ZXItZG9jdG9yJykuYXR0cignaHJlZicsIGNvbnRyb2xsZXIucmVnaXN0ZXJEb2N0b3JVcmwpO1xyXG4gICAgICAgICQoJyNidG4tZm9yZ290LXBhc3N3b3JkJykuYXR0cignaHJlZicsIGNvbnRyb2xsZXIuZm9yZ290UGFzd29yZFVybCk7XHJcblxyXG4gICAgICB9LFxyXG4gICAgICBoaWRlQWxsQWxlcnRzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuYWxlcnRMb2dpbklkTmVlZGVkLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICB0aGlzLmFsZXJ0UGFzc05lZWRlZC5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgdGhpcy5hbGVydENyZWRlbnRpYWxzSW52YWxpZC5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICBjb250cm9sbGVyLmluaXQoKTtcclxuXHJcbiAgfSgpKTtcclxuXHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
