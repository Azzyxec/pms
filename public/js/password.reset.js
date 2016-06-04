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
    console.log('forgot password js loaded');

    var model = {
      resetCode: ''
    }

    var controller = {
      init: function(){
        this.passwordResetUrl = links.passwordResetUrl;
        this.doctorDashboardUrl = links.dashboardHomeUrl;
        this.forgotPasswordUrl = links.forgotPasswordUrl;

        var resetCode = utility.getURLParam('code');
        //console.log('log reset code ' + resetCode);
        if(resetCode){
          //console.log('log reset code ' + resetCode);
          model.resetCode = resetCode;
          view.init();
        }else{
          //redirect to login
        }

      },
      resetPassword: function(newPass){

        code = model.resetCode;
        $.post( controller.passwordResetUrl , { password: newPass, resetCode: code})
        .done(function( response ) {
          console.log('respose ' + JSON.stringify(response));

          if(response.status == 0){
            console.log('success');
            var user = response.data;
            if(user.type == 'D'){
              console.log('redirect to doc');
              window.location.href = controller.doctorDashboardUrl;
            }else if (user.type == 'S'){
              console.log('redirect to staff');
              //redirect to staff dashboard
              //window.location.href = controller.doctorDashboardUrl;
            }
            //password reset successfully, now redirect

          }else if(response.status == 2){
            //code is not valid,
            console.log('reset code is not valid');
            view.alertResetCodeInvalid.removeClass('hidden');
          }

        });

      }
    };


    var view = {
      init: function(){
        this.txtPassword = $('#txt-password');
        this.txtConfirmPassword = $('#txt-confirm-password');
        this.btnResetPassword = $('#btn-reset-password');
        this.linkForgotPassword = $('#link-forgot-password');

        this.alertPassNeeded = $('#alert-password-needed');
        this.alertConfirmPassNeeded = $('#alert-confirm-password-needed');
        this.alertMatchingValidation = $('#alert-password-not-matching');
        this.alertInfo = $('#alert-info');
        this.alertResetCodeInvalid = $('#alert-reset-code-invalid');


        console.log('init view');

        this.linkForgotPassword.attr('href', controller.forgotPasswordUrl);

        this.btnResetPassword.click(function(){
          view.hideAllAlerts();

          var password = view.txtPassword.val();
          var confirmPassword = view.txtConfirmPassword.val();

          console.log('pass' + password + ' confirm ' + confirmPassword);

          if(!password || !password.trim()){
            console.log('pass');
            view.alertPassNeeded.removeClass('hidden');
            return;
          }else if(!confirmPassword || !confirmPassword.trim()){
            console.log('confirm pass');
            view.alertConfirmPassNeeded.removeClass('hidden');
            return;
          }else if(password != confirmPassword){
            console.log('matching');
            view.alertMatchingValidation.removeClass('hidden');
            return;
          }

          controller.resetPassword(password);

        });

      },
      hideAllAlerts: function(){
        this.alertPassNeeded.addClass('hidden');
        this.alertConfirmPassNeeded.addClass('hidden');
        this.alertMatchingValidation.addClass('hidden');
        this.alertInfo.addClass('hidden');
        this.alertResetCodeInvalid.addClass('hidden');
      }
    };

    controller.init();

  }());

});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxpdHkuanMiLCJsaW5rcy5qcyIsInBhc3N3b3JkLnJlc2V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InBhc3N3b3JkLnJlc2V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9oZWxwZXIgZnVuY3Rpb24gdG8gZ2V0IHRoZSB1cmwgcXVlcnkgcGFyYW1ldGVyc1xyXG52YXIgdXRpbGl0eSA9IHtcclxuICBnZXRVUkxQYXJhbTogZnVuY3Rpb24obmFtZSl7XHJcbiAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcblxyXG4gICAgbmFtZSA9IG5hbWUucmVwbGFjZSgvW1xcW1xcXV0vZywgXCJcXFxcJCZcIik7XHJcblxyXG4gICAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cChcIls/Jl1cIiArIG5hbWUgKyBcIig9KFteJiNdKil8JnwjfCQpXCIpO1xyXG4gICAgdmFyIHJlc3VsdHMgPSByZWdleC5leGVjKHVybCk7XHJcblxyXG4gICAgaWYgKCFyZXN1bHRzKSByZXR1cm4gbnVsbDtcclxuICAgIGlmICghcmVzdWx0c1syXSkgcmV0dXJuICcnO1xyXG5cclxuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocmVzdWx0c1syXS5yZXBsYWNlKC9cXCsvZywgXCIgXCIpKTtcclxuICB9LFxyXG4gIGdldFRpbWVNaW51dGVzQXJyYXk6ICBmdW5jdGlvbigpe1xyXG5cclxuICB9XHJcbn1cclxuIiwidmFyIGxpbmtzID0ge1xyXG5cclxuICAvL2xvZ2luIGpzIHVybHNcclxuICAgYXV0aGVudGljYXRlVXJsIDogXCJpbmRleC5waHAvYXV0aGVudGljYXRlL2F1dGhlbml0Y2F0ZVVzZXJcIixcclxuICAgc3VjY2Vzc1JlZGlyZWN0VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL1wiLFxyXG4gICByZWdpc3RlckRvY3RvclVybCA6IFwiaW5kZXgucGhwL2RvY3Rvci9kb2N0b3JJbmZvXCIsXHJcbiAgIGFkbWluVXJsOlwiaW5kZXgucGhwL2FkbWluRGFzaGJvYXJkL2FkbWluXCIsXHJcblxyXG4gICAvL3Bhc3N3b3JkIHJlc2V0XHJcbiAgIHBhc3N3b3JkUmVzdFJlcXVlc3RVcmw6IFwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9yZXNldFBhc3N3b3JkUmVxdWVzdFwiLFxyXG4gICBsb2dpblVybDogXCJpbmRleC5waHAvYXV0aGVudGljYXRlL2xvZ2luXCIsXHJcbiAgIHBhc3N3b3JkUmVzZXRVcmw6IFwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9wYXNzd29yZFJlc2V0XCIsXHJcbiAgIGZvcmdvdFBhc3N3b3JkVXJsOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvZm9yZ290UGFzc3dvcmRcIixcclxuXHJcbiAgIC8vYWRtaW4gcmVsYXRlZFxyXG4gICBkb2N0b3JMaXN0aW5nVXJsOiBcImluZGV4LnBocC9hZG1pbkRhc2hib2FyZC9kb2N0b3JMaXN0aW5nXCIsXHJcblxyXG4gICBsb2dvdXRVcmwgOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvbG9nb3V0XCIsXHJcblxyXG4gICAvL2RvY3RvciBkYXNoYm9hcmQgbGlua3NcclxuICAgZG9jdG9yUHJvZmlsZSA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9kb2N0b3JQcm9maWxlXCIsXHJcbiAgIGRhc2hib2FyZEhvbWVVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvXCIsXHJcbiAgIG5ld0FwcG9pbnRtZW50VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2Jvb2tBcHBvaW50bWVudFwiLFxyXG4gICBwYXRpZW50c0VudHJ5VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3BhdGllbnRzRW50cnlcIixcclxuICAgcGF0aWVudHNMaXN0aW5nVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3BhdGllbnRzTGlzdGluZ1wiLFxyXG4gICBjbG9zZUFwcG9pbnRtZW50VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2Nsb3NlQXBwb2ludG1lbnRcIixcclxuICAgZG9jdG9yc0FwcG9pbnRtZW50c0xpc3RVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvbGlzdEFwcG9pbnRtZW50XCIsXHJcbiAgIG5ld1NjaGVkdWxlVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL25ld1NjaGVkdWxlXCIsXHJcbiAgIGxpc3RTY2hlZHVsZVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9zY2hlZHVsZUxpc3RcIixcclxuICAgZ2V0U2NoZWR1bGVDYWxlbmRhclVybDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL1NjaGVkdWxlQ2FsZW5kZXJWaWV3XCIsXHJcbiAgIGFkZFN0YWZmVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3N0YWZmRW50cnlcIixcclxuICAgZG9jdG9yc1N0YWZmTGlzdGluZ1VyIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3N0YWZmTGlzdGluZ1wiLFxyXG4gICBwYXRpZW50c0hpc3RvcnlVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvcGF0aWVudEhpc3RvcnlcIixcclxuICAgY3JlYXRlUHJvZ3JhbUZvclBhdGllbnRVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvY3JlYXRlTWVkaWNhbFByb2dyYW1cIixcclxuICAgcHJvZ3JhbW1lTGlzdGluZ3NVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvcHJvZ3JhbW1lTGlzdFwiLFxyXG4gICBNYW5hZ2VMb2NhdGlvbnNVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvd29ya0xvY2F0aW9uTWFuYWdlbWVudFwiLFxyXG4gICBnZXRBbmFseXRpY3NVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvQW5hbHl0aWNzUmVwb3J0XCIsXHJcbiAgIGdldENhbGVuZGVyVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2NhbGVuZGFyVGVtcGxhdGVcIixcclxuICAgYWNjb3VudGluZ1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9hY2NvdW50aW5nXCIsXHJcbiAgIG1lZGljaW5lU2VhcmNoVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL21lZGljaW5lU2VhcmNoXCIsXHJcblxyXG5cclxuICAgLy9zY2hlZHVsZVxyXG4gICBnZXRMb2NhdGlvblVybDogXCJpbmRleC5waHAvbG9jYXRpb25zL2dldERvY3RvckxvY2F0aW9uc1wiLFxyXG4gICBjcmVhdGVVcGRhdGVTY2hlZHVsZVVybDogXCJpbmRleC5waHAvc2NoZWR1bGUvY3JlYXRlVXBkYXRlU2NoZWR1bGVcIixcclxuICAgZ2V0U2VjaGR1bGVDYWxlbmRhckRldGFpbHNVcmw6IFwiaW5kZXgucGhwL3NjaGVkdWxlL2dldENhbGFuZGVyRGV0YWlsc1wiLFxyXG5cclxuICAgLy9wcm9ncmFtbWVcclxuICAgcHJvZ3JhbW1lTGlzdFVybDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0TWVkaWNhdGlvblByb2dyYW1tZUxpc3RcIixcclxuICAgcHJvZ3JhbW1lRWRpdFVybDpcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvY3JlYXRlTWVkaWNhbFByb2dyYW1cIixcclxuICAgY3JlYXRlTW9kaWZ5UHJvZ3JhbW1lVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9jcmVhdGVNb2RpZnlQcm9ncmFtbWVcIixcclxuICAgZ2V0UHJvZ3JhbW1lVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRQcm9ncmFtbWVzXCIsXHJcblxyXG5cclxuICAgLy9wYXRpZW50XHJcbiAgIHBhdGllbnREZXRhaWxQZXJzaXN0VXJsOlwiaW5kZXgucGhwL3BhdGllbnQvYWRkVXBkYXRlUGF0aWVudFwiLFxyXG4gICBwYXRpZW50c0RldGFpbHNVcmw6XCJpbmRleC5waHAvcGF0aWVudC9nZXRQYXRpZW50RGV0YWlsc1wiLFxyXG4gICBsb2dpbkNoZWNrVXJsOlwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9pc0xvZ2dlZEluXCIsXHJcbiAgIGdldFByb2dyYW1tZUxpc3Q6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldE1lZGljYXRpb25Qcm9ncmFtbWVMaXN0XCIsXHJcbiAgIHByb2dyYW1tZUxpc3REZXRhaWxzVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRQcm9ncmFtbWVMaXN0RGV0YWlsc1wiLFxyXG4gICBwYXRpZW50c1Byb2dyYW1tZXNVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldFBhdGllbnRQcm9ncmFtbWVzXCIsXHJcbiAgIHBhdGllbnRMaXN0aW5nVXJsOlwiaW5kZXgucGhwL3BhdGllbnQvZ2V0UGF0aWVudExpc3RcIixcclxuXHJcbiAgIHNhdmVVcGRhdGVMb2NhdGlvbnM6XCJpbmRleC5waHAvbG9jYXRpb25zL2FkZFVwZGF0ZUxvY2F0aW9uXCIsXHJcbiAgIGxvY2F0aW9uTGlzdFVybDpcImluZGV4LnBocC9sb2NhdGlvbnMvZ2V0RG9jdG9yTG9jYXRpb25zXCIsXHJcbiAgIGRlbGl2ZXJ5TWV0aG9kc1VybDpcImluZGV4LnBocC9wYXRpZW50L2dldERlbGl2ZXJ5TWV0aG9kc1wiLFxyXG5cclxuXHJcbiAgIC8vcmVnaXN0YXJ0aW9uXHJcbiAgIGRvY3RvclVybDpcImluZGV4LnBocC9kb2N0b3Ivc2F2ZVVwZGF0ZURvY3RvclwiLFxyXG4gICBkb2N0b3JEZXRhaWxzVXJsOlwiaW5kZXgucGhwL2RvY3Rvci9nZXREb2N0b3JEZXRhaWxzXCIsXHJcbiAgIGxvZ2luQ2hlY2tVcmw6XCJpbmRleC5waHAvYXV0aGVudGljYXRlL2lzTG9nZ2VkSW5cIixcclxuICAgZG9jdG9yRGFzaFVybDpcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvXCIsXHJcbiAgIGxvZ291dFVybDpcImluZGV4LnBocC9hdXRoZW50aWNhdGUvbG9nb3V0XCIsXHJcblxyXG4gICBjcmVhdGVNb2RpZnlTdGFmZlVybDpcImluZGV4LnBocC9zdGFmZi9jcmVhdGVNb2RpZnlTdGFmZlwiLFxyXG4gICBnZXRTdGFmZkRldGFpbHNVcmw6IFwiaW5kZXgucGhwL3N0YWZmL2dldFN0YWZmRGV0YWlsc1wiLFxyXG4gICBzdGFmZkxpc3RpbmdVcmw6IFwiaW5kZXgucGhwL3N0YWZmL2dldERvY3RvcnNTdGFmZkxpc3RcIlxyXG5cclxufVxyXG4iLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG5cclxuICAkKGZ1bmN0aW9uKCl7XHJcbiAgICBjb25zb2xlLmxvZygnZm9yZ290IHBhc3N3b3JkIGpzIGxvYWRlZCcpO1xyXG5cclxuICAgIHZhciBtb2RlbCA9IHtcclxuICAgICAgcmVzZXRDb2RlOiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBjb250cm9sbGVyID0ge1xyXG4gICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMucGFzc3dvcmRSZXNldFVybCA9IGxpbmtzLnBhc3N3b3JkUmVzZXRVcmw7XHJcbiAgICAgICAgdGhpcy5kb2N0b3JEYXNoYm9hcmRVcmwgPSBsaW5rcy5kYXNoYm9hcmRIb21lVXJsO1xyXG4gICAgICAgIHRoaXMuZm9yZ290UGFzc3dvcmRVcmwgPSBsaW5rcy5mb3Jnb3RQYXNzd29yZFVybDtcclxuXHJcbiAgICAgICAgdmFyIHJlc2V0Q29kZSA9IHV0aWxpdHkuZ2V0VVJMUGFyYW0oJ2NvZGUnKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdsb2cgcmVzZXQgY29kZSAnICsgcmVzZXRDb2RlKTtcclxuICAgICAgICBpZihyZXNldENvZGUpe1xyXG4gICAgICAgICAgLy9jb25zb2xlLmxvZygnbG9nIHJlc2V0IGNvZGUgJyArIHJlc2V0Q29kZSk7XHJcbiAgICAgICAgICBtb2RlbC5yZXNldENvZGUgPSByZXNldENvZGU7XHJcbiAgICAgICAgICB2aWV3LmluaXQoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIC8vcmVkaXJlY3QgdG8gbG9naW5cclxuICAgICAgICB9XHJcblxyXG4gICAgICB9LFxyXG4gICAgICByZXNldFBhc3N3b3JkOiBmdW5jdGlvbihuZXdQYXNzKXtcclxuXHJcbiAgICAgICAgY29kZSA9IG1vZGVsLnJlc2V0Q29kZTtcclxuICAgICAgICAkLnBvc3QoIGNvbnRyb2xsZXIucGFzc3dvcmRSZXNldFVybCAsIHsgcGFzc3dvcmQ6IG5ld1Bhc3MsIHJlc2V0Q29kZTogY29kZX0pXHJcbiAgICAgICAgLmRvbmUoZnVuY3Rpb24oIHJlc3BvbnNlICkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3Bvc2UgJyArIEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSk7XHJcblxyXG4gICAgICAgICAgaWYocmVzcG9uc2Uuc3RhdHVzID09IDApe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc3VjY2VzcycpO1xyXG4gICAgICAgICAgICB2YXIgdXNlciA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICAgIGlmKHVzZXIudHlwZSA9PSAnRCcpe1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZWRpcmVjdCB0byBkb2MnKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuZG9jdG9yRGFzaGJvYXJkVXJsO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZiAodXNlci50eXBlID09ICdTJyl7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlZGlyZWN0IHRvIHN0YWZmJyk7XHJcbiAgICAgICAgICAgICAgLy9yZWRpcmVjdCB0byBzdGFmZiBkYXNoYm9hcmRcclxuICAgICAgICAgICAgICAvL3dpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5kb2N0b3JEYXNoYm9hcmRVcmw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9wYXNzd29yZCByZXNldCBzdWNjZXNzZnVsbHksIG5vdyByZWRpcmVjdFxyXG5cclxuICAgICAgICAgIH1lbHNlIGlmKHJlc3BvbnNlLnN0YXR1cyA9PSAyKXtcclxuICAgICAgICAgICAgLy9jb2RlIGlzIG5vdCB2YWxpZCxcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc2V0IGNvZGUgaXMgbm90IHZhbGlkJyk7XHJcbiAgICAgICAgICAgIHZpZXcuYWxlcnRSZXNldENvZGVJbnZhbGlkLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB2YXIgdmlldyA9IHtcclxuICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnR4dFBhc3N3b3JkID0gJCgnI3R4dC1wYXNzd29yZCcpO1xyXG4gICAgICAgIHRoaXMudHh0Q29uZmlybVBhc3N3b3JkID0gJCgnI3R4dC1jb25maXJtLXBhc3N3b3JkJyk7XHJcbiAgICAgICAgdGhpcy5idG5SZXNldFBhc3N3b3JkID0gJCgnI2J0bi1yZXNldC1wYXNzd29yZCcpO1xyXG4gICAgICAgIHRoaXMubGlua0ZvcmdvdFBhc3N3b3JkID0gJCgnI2xpbmstZm9yZ290LXBhc3N3b3JkJyk7XHJcblxyXG4gICAgICAgIHRoaXMuYWxlcnRQYXNzTmVlZGVkID0gJCgnI2FsZXJ0LXBhc3N3b3JkLW5lZWRlZCcpO1xyXG4gICAgICAgIHRoaXMuYWxlcnRDb25maXJtUGFzc05lZWRlZCA9ICQoJyNhbGVydC1jb25maXJtLXBhc3N3b3JkLW5lZWRlZCcpO1xyXG4gICAgICAgIHRoaXMuYWxlcnRNYXRjaGluZ1ZhbGlkYXRpb24gPSAkKCcjYWxlcnQtcGFzc3dvcmQtbm90LW1hdGNoaW5nJyk7XHJcbiAgICAgICAgdGhpcy5hbGVydEluZm8gPSAkKCcjYWxlcnQtaW5mbycpO1xyXG4gICAgICAgIHRoaXMuYWxlcnRSZXNldENvZGVJbnZhbGlkID0gJCgnI2FsZXJ0LXJlc2V0LWNvZGUtaW52YWxpZCcpO1xyXG5cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coJ2luaXQgdmlldycpO1xyXG5cclxuICAgICAgICB0aGlzLmxpbmtGb3Jnb3RQYXNzd29yZC5hdHRyKCdocmVmJywgY29udHJvbGxlci5mb3Jnb3RQYXNzd29yZFVybCk7XHJcblxyXG4gICAgICAgIHRoaXMuYnRuUmVzZXRQYXNzd29yZC5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgdmlldy5oaWRlQWxsQWxlcnRzKCk7XHJcblxyXG4gICAgICAgICAgdmFyIHBhc3N3b3JkID0gdmlldy50eHRQYXNzd29yZC52YWwoKTtcclxuICAgICAgICAgIHZhciBjb25maXJtUGFzc3dvcmQgPSB2aWV3LnR4dENvbmZpcm1QYXNzd29yZC52YWwoKTtcclxuXHJcbiAgICAgICAgICBjb25zb2xlLmxvZygncGFzcycgKyBwYXNzd29yZCArICcgY29uZmlybSAnICsgY29uZmlybVBhc3N3b3JkKTtcclxuXHJcbiAgICAgICAgICBpZighcGFzc3dvcmQgfHwgIXBhc3N3b3JkLnRyaW0oKSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwYXNzJyk7XHJcbiAgICAgICAgICAgIHZpZXcuYWxlcnRQYXNzTmVlZGVkLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfWVsc2UgaWYoIWNvbmZpcm1QYXNzd29yZCB8fCAhY29uZmlybVBhc3N3b3JkLnRyaW0oKSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjb25maXJtIHBhc3MnKTtcclxuICAgICAgICAgICAgdmlldy5hbGVydENvbmZpcm1QYXNzTmVlZGVkLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfWVsc2UgaWYocGFzc3dvcmQgIT0gY29uZmlybVBhc3N3b3JkKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ21hdGNoaW5nJyk7XHJcbiAgICAgICAgICAgIHZpZXcuYWxlcnRNYXRjaGluZ1ZhbGlkYXRpb24ucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29udHJvbGxlci5yZXNldFBhc3N3b3JkKHBhc3N3b3JkKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9LFxyXG4gICAgICBoaWRlQWxsQWxlcnRzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuYWxlcnRQYXNzTmVlZGVkLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICB0aGlzLmFsZXJ0Q29uZmlybVBhc3NOZWVkZWQuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgIHRoaXMuYWxlcnRNYXRjaGluZ1ZhbGlkYXRpb24uYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgIHRoaXMuYWxlcnRJbmZvLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICB0aGlzLmFsZXJ0UmVzZXRDb2RlSW52YWxpZC5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29udHJvbGxlci5pbml0KCk7XHJcblxyXG4gIH0oKSk7XHJcblxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
