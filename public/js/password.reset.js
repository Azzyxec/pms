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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxpdHkuanMiLCJsaW5rcy5qcyIsInBhc3N3b3JkLnJlc2V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJwYXNzd29yZC5yZXNldC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vaGVscGVyIGZ1bmN0aW9uIHRvIGdldCB0aGUgdXJsIHF1ZXJ5IHBhcmFtZXRlcnNcclxudmFyIHV0aWxpdHkgPSB7XHJcbiAgZ2V0VVJMUGFyYW06IGZ1bmN0aW9uKG5hbWUpe1xyXG4gICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xyXG5cclxuICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoL1tcXFtcXF1dL2csIFwiXFxcXCQmXCIpO1xyXG5cclxuICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAoXCJbPyZdXCIgKyBuYW1lICsgXCIoPShbXiYjXSopfCZ8I3wkKVwiKTtcclxuICAgIHZhciByZXN1bHRzID0gcmVnZXguZXhlYyh1cmwpO1xyXG5cclxuICAgIGlmICghcmVzdWx0cykgcmV0dXJuIG51bGw7XHJcbiAgICBpZiAoIXJlc3VsdHNbMl0pIHJldHVybiAnJztcclxuXHJcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHJlc3VsdHNbMl0ucmVwbGFjZSgvXFwrL2csIFwiIFwiKSk7XHJcbiAgfSxcclxuICBnZXRUaW1lTWludXRlc0FycmF5OiAgZnVuY3Rpb24oKXtcclxuXHJcbiAgfVxyXG59XHJcbiIsInZhciBsaW5rcyA9IHtcclxuXHJcbiAgLy9sb2dpbiBqcyB1cmxzXHJcbiAgIGF1dGhlbnRpY2F0ZVVybCA6IFwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9hdXRoZW5pdGNhdGVVc2VyXCIsXHJcbiAgIHN1Y2Nlc3NSZWRpcmVjdFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9cIixcclxuICAgcmVnaXN0ZXJEb2N0b3JVcmwgOiBcImluZGV4LnBocC9kb2N0b3IvZG9jdG9ySW5mb1wiLFxyXG4gICBhZG1pblVybDpcImluZGV4LnBocC9hZG1pbkRhc2hib2FyZC9hZG1pblwiLFxyXG5cclxuICAgLy9wYXNzd29yZCByZXNldFxyXG4gICBwYXNzd29yZFJlc3RSZXF1ZXN0VXJsOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvcmVzZXRQYXNzd29yZFJlcXVlc3RcIixcclxuICAgbG9naW5Vcmw6IFwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9sb2dpblwiLFxyXG4gICBwYXNzd29yZFJlc2V0VXJsOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvcGFzc3dvcmRSZXNldFwiLFxyXG4gICBmb3Jnb3RQYXNzd29yZFVybDogXCJpbmRleC5waHAvYXV0aGVudGljYXRlL2ZvcmdvdFBhc3N3b3JkXCIsXHJcblxyXG4gICAvL2FkbWluIHJlbGF0ZWRcclxuICAgZG9jdG9yTGlzdGluZ1VybDogXCJpbmRleC5waHAvYWRtaW5EYXNoYm9hcmQvZG9jdG9yTGlzdGluZ1wiLFxyXG5cclxuICAgbG9nb3V0VXJsIDogXCJpbmRleC5waHAvYXV0aGVudGljYXRlL2xvZ291dFwiLFxyXG5cclxuICAgLy9kb2N0b3IgZGFzaGJvYXJkIGxpbmtzXHJcbiAgIGRvY3RvclByb2ZpbGUgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvZG9jdG9yUHJvZmlsZVwiLFxyXG4gICBkYXNoYm9hcmRIb21lVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL1wiLFxyXG4gICBuZXdBcHBvaW50bWVudFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9ib29rQXBwb2ludG1lbnRcIixcclxuICAgcGF0aWVudHNFbnRyeVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wYXRpZW50c0VudHJ5XCIsXHJcbiAgIHBhdGllbnRzTGlzdGluZ1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wYXRpZW50c0xpc3RpbmdcIixcclxuICAgY2xvc2VBcHBvaW50bWVudFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jbG9zZUFwcG9pbnRtZW50XCIsXHJcbiAgIGRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2xpc3RBcHBvaW50bWVudFwiLFxyXG4gICBuZXdTY2hlZHVsZVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9uZXdTY2hlZHVsZVwiLFxyXG4gICBsaXN0U2NoZWR1bGVVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvc2NoZWR1bGVMaXN0XCIsXHJcbiAgIGdldFNjaGVkdWxlQ2FsZW5kYXJVcmw6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9TY2hlZHVsZUNhbGVuZGVyVmlld1wiLFxyXG4gICBhZGRTdGFmZlVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9zdGFmZkVudHJ5XCIsXHJcbiAgIGRvY3RvcnNTdGFmZkxpc3RpbmdVciA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9zdGFmZkxpc3RpbmdcIixcclxuICAgcGF0aWVudHNIaXN0b3J5VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3BhdGllbnRIaXN0b3J5XCIsXHJcbiAgIGNyZWF0ZVByb2dyYW1Gb3JQYXRpZW50VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2NyZWF0ZU1lZGljYWxQcm9ncmFtXCIsXHJcbiAgIHByb2dyYW1tZUxpc3RpbmdzVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3Byb2dyYW1tZUxpc3RcIixcclxuICAgTWFuYWdlTG9jYXRpb25zVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3dvcmtMb2NhdGlvbk1hbmFnZW1lbnRcIixcclxuICAgZ2V0QW5hbHl0aWNzVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL0FuYWx5dGljc1JlcG9ydFwiLFxyXG4gICBnZXRDYWxlbmRlclVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jYWxlbmRhclRlbXBsYXRlXCIsXHJcbiAgIGFjY291bnRpbmdVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvYWNjb3VudGluZ1wiLFxyXG4gICBtZWRpY2luZVNlYXJjaFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9tZWRpY2luZVNlYXJjaFwiLFxyXG5cclxuXHJcbiAgIC8vc2NoZWR1bGVcclxuICAgZ2V0TG9jYXRpb25Vcmw6IFwiaW5kZXgucGhwL2xvY2F0aW9ucy9nZXREb2N0b3JMb2NhdGlvbnNcIixcclxuICAgY3JlYXRlVXBkYXRlU2NoZWR1bGVVcmw6IFwiaW5kZXgucGhwL3NjaGVkdWxlL2NyZWF0ZVVwZGF0ZVNjaGVkdWxlXCIsXHJcbiAgIGdldFNlY2hkdWxlQ2FsZW5kYXJEZXRhaWxzVXJsOiBcImluZGV4LnBocC9zY2hlZHVsZS9nZXRDYWxhbmRlckRldGFpbHNcIixcclxuXHJcbiAgIC8vcHJvZ3JhbW1lXHJcbiAgIGRvY3RvcnNQcm9ncmFtc1VybDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0RG9jdG9yc0NoZWNrdXBQcm9ncmFtc1wiLFxyXG4gICBwcm9ncmFtbWVFZGl0VXJsOlwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jcmVhdGVNZWRpY2FsUHJvZ3JhbVwiLFxyXG4gICBjcmVhdGVNb2RpZnlQcm9ncmFtbWVVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2NyZWF0ZU1vZGlmeVByb2dyYW1tZVwiLFxyXG4gICBnZXRQcm9ncmFtbWVVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldFByb2dyYW1tZXNcIixcclxuXHJcblxyXG4gICAvL3BhdGllbnRcclxuICAgcGF0aWVudERldGFpbFBlcnNpc3RVcmw6XCJpbmRleC5waHAvcGF0aWVudC9hZGRVcGRhdGVQYXRpZW50XCIsXHJcbiAgIHBhdGllbnRzRGV0YWlsc1VybDpcImluZGV4LnBocC9wYXRpZW50L2dldFBhdGllbnREZXRhaWxzXCIsXHJcbiAgIGxvZ2luQ2hlY2tVcmw6XCJpbmRleC5waHAvYXV0aGVudGljYXRlL2lzTG9nZ2VkSW5cIixcclxuICAgZ2V0UHJvZ3JhbW1lTGlzdDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0TWVkaWNhdGlvblByb2dyYW1tZUxpc3RcIixcclxuICAgcHJvZ3JhbW1lTGlzdERldGFpbHNVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldFByb2dyYW1tZUxpc3REZXRhaWxzXCIsXHJcbiAgIC8vcGF0aWVudHNQcm9ncmFtbWVzVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRQYXRpZW50UHJvZ3JhbW1lc1wiLFxyXG4gICBwYXRpZW50TGlzdGluZ1VybDpcImluZGV4LnBocC9wYXRpZW50L2dldFBhdGllbnRMaXN0XCIsXHJcblxyXG4gICBib29rQXBwb2ludG1lbnRVcmw6IFwiaW5kZXgucGhwL2FwcG9pbnRtZW50L2Jvb2tBcHBvaW50bWVudFwiLFxyXG5cclxuICAgc2F2ZVVwZGF0ZUxvY2F0aW9uczpcImluZGV4LnBocC9sb2NhdGlvbnMvYWRkVXBkYXRlTG9jYXRpb25cIixcclxuICAgbG9jYXRpb25MaXN0VXJsOlwiaW5kZXgucGhwL2xvY2F0aW9ucy9nZXREb2N0b3JMb2NhdGlvbnNcIixcclxuICAgZGVsaXZlcnlNZXRob2RzVXJsOlwiaW5kZXgucGhwL3BhdGllbnQvZ2V0RGVsaXZlcnlNZXRob2RzXCIsXHJcblxyXG5cclxuICAgLy9yZWdpc3RhcnRpb25cclxuICAgZG9jdG9yVXJsOlwiaW5kZXgucGhwL2RvY3Rvci9zYXZlVXBkYXRlRG9jdG9yXCIsXHJcbiAgIGRvY3RvckRldGFpbHNVcmw6XCJpbmRleC5waHAvZG9jdG9yL2dldERvY3RvckRldGFpbHNcIixcclxuICAgbG9naW5DaGVja1VybDpcImluZGV4LnBocC9hdXRoZW50aWNhdGUvaXNMb2dnZWRJblwiLFxyXG4gICBkb2N0b3JEYXNoVXJsOlwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9cIixcclxuICAgbG9nb3V0VXJsOlwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9sb2dvdXRcIixcclxuXHJcbiAgIGNyZWF0ZU1vZGlmeVN0YWZmVXJsOlwiaW5kZXgucGhwL3N0YWZmL2NyZWF0ZU1vZGlmeVN0YWZmXCIsXHJcbiAgIGdldFN0YWZmRGV0YWlsc1VybDogXCJpbmRleC5waHAvc3RhZmYvZ2V0U3RhZmZEZXRhaWxzXCIsXHJcbiAgIHN0YWZmTGlzdGluZ1VybDogXCJpbmRleC5waHAvc3RhZmYvZ2V0RG9jdG9yc1N0YWZmTGlzdFwiXHJcblxyXG59XHJcbiIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcblxyXG4gICQoZnVuY3Rpb24oKXtcclxuICAgIGNvbnNvbGUubG9nKCdmb3Jnb3QgcGFzc3dvcmQganMgbG9hZGVkJyk7XHJcblxyXG4gICAgdmFyIG1vZGVsID0ge1xyXG4gICAgICByZXNldENvZGU6ICcnXHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGNvbnRyb2xsZXIgPSB7XHJcbiAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5wYXNzd29yZFJlc2V0VXJsID0gbGlua3MucGFzc3dvcmRSZXNldFVybDtcclxuICAgICAgICB0aGlzLmRvY3RvckRhc2hib2FyZFVybCA9IGxpbmtzLmRhc2hib2FyZEhvbWVVcmw7XHJcbiAgICAgICAgdGhpcy5mb3Jnb3RQYXNzd29yZFVybCA9IGxpbmtzLmZvcmdvdFBhc3N3b3JkVXJsO1xyXG5cclxuICAgICAgICB2YXIgcmVzZXRDb2RlID0gdXRpbGl0eS5nZXRVUkxQYXJhbSgnY29kZScpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2xvZyByZXNldCBjb2RlICcgKyByZXNldENvZGUpO1xyXG4gICAgICAgIGlmKHJlc2V0Q29kZSl7XHJcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKCdsb2cgcmVzZXQgY29kZSAnICsgcmVzZXRDb2RlKTtcclxuICAgICAgICAgIG1vZGVsLnJlc2V0Q29kZSA9IHJlc2V0Q29kZTtcclxuICAgICAgICAgIHZpZXcuaW5pdCgpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgLy9yZWRpcmVjdCB0byBsb2dpblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0sXHJcbiAgICAgIHJlc2V0UGFzc3dvcmQ6IGZ1bmN0aW9uKG5ld1Bhc3Mpe1xyXG5cclxuICAgICAgICBjb2RlID0gbW9kZWwucmVzZXRDb2RlO1xyXG4gICAgICAgICQucG9zdCggY29udHJvbGxlci5wYXNzd29yZFJlc2V0VXJsICwgeyBwYXNzd29yZDogbmV3UGFzcywgcmVzZXRDb2RlOiBjb2RlfSlcclxuICAgICAgICAuZG9uZShmdW5jdGlvbiggcmVzcG9uc2UgKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygncmVzcG9zZSAnICsgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcclxuXHJcbiAgICAgICAgICBpZihyZXNwb25zZS5zdGF0dXMgPT0gMCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzdWNjZXNzJyk7XHJcbiAgICAgICAgICAgIHZhciB1c2VyID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgaWYodXNlci50eXBlID09ICdEJyl7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlZGlyZWN0IHRvIGRvYycpO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5kb2N0b3JEYXNoYm9hcmRVcmw7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmICh1c2VyLnR5cGUgPT0gJ1MnKXtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVkaXJlY3QgdG8gc3RhZmYnKTtcclxuICAgICAgICAgICAgICAvL3JlZGlyZWN0IHRvIHN0YWZmIGRhc2hib2FyZFxyXG4gICAgICAgICAgICAgIC8vd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmRvY3RvckRhc2hib2FyZFVybDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL3Bhc3N3b3JkIHJlc2V0IHN1Y2Nlc3NmdWxseSwgbm93IHJlZGlyZWN0XHJcblxyXG4gICAgICAgICAgfWVsc2UgaWYocmVzcG9uc2Uuc3RhdHVzID09IDIpe1xyXG4gICAgICAgICAgICAvL2NvZGUgaXMgbm90IHZhbGlkLFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncmVzZXQgY29kZSBpcyBub3QgdmFsaWQnKTtcclxuICAgICAgICAgICAgdmlldy5hbGVydFJlc2V0Q29kZUludmFsaWQucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIHZhciB2aWV3ID0ge1xyXG4gICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMudHh0UGFzc3dvcmQgPSAkKCcjdHh0LXBhc3N3b3JkJyk7XHJcbiAgICAgICAgdGhpcy50eHRDb25maXJtUGFzc3dvcmQgPSAkKCcjdHh0LWNvbmZpcm0tcGFzc3dvcmQnKTtcclxuICAgICAgICB0aGlzLmJ0blJlc2V0UGFzc3dvcmQgPSAkKCcjYnRuLXJlc2V0LXBhc3N3b3JkJyk7XHJcbiAgICAgICAgdGhpcy5saW5rRm9yZ290UGFzc3dvcmQgPSAkKCcjbGluay1mb3Jnb3QtcGFzc3dvcmQnKTtcclxuXHJcbiAgICAgICAgdGhpcy5hbGVydFBhc3NOZWVkZWQgPSAkKCcjYWxlcnQtcGFzc3dvcmQtbmVlZGVkJyk7XHJcbiAgICAgICAgdGhpcy5hbGVydENvbmZpcm1QYXNzTmVlZGVkID0gJCgnI2FsZXJ0LWNvbmZpcm0tcGFzc3dvcmQtbmVlZGVkJyk7XHJcbiAgICAgICAgdGhpcy5hbGVydE1hdGNoaW5nVmFsaWRhdGlvbiA9ICQoJyNhbGVydC1wYXNzd29yZC1ub3QtbWF0Y2hpbmcnKTtcclxuICAgICAgICB0aGlzLmFsZXJ0SW5mbyA9ICQoJyNhbGVydC1pbmZvJyk7XHJcbiAgICAgICAgdGhpcy5hbGVydFJlc2V0Q29kZUludmFsaWQgPSAkKCcjYWxlcnQtcmVzZXQtY29kZS1pbnZhbGlkJyk7XHJcblxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZygnaW5pdCB2aWV3Jyk7XHJcblxyXG4gICAgICAgIHRoaXMubGlua0ZvcmdvdFBhc3N3b3JkLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmZvcmdvdFBhc3N3b3JkVXJsKTtcclxuXHJcbiAgICAgICAgdGhpcy5idG5SZXNldFBhc3N3b3JkLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICB2aWV3LmhpZGVBbGxBbGVydHMoKTtcclxuXHJcbiAgICAgICAgICB2YXIgcGFzc3dvcmQgPSB2aWV3LnR4dFBhc3N3b3JkLnZhbCgpO1xyXG4gICAgICAgICAgdmFyIGNvbmZpcm1QYXNzd29yZCA9IHZpZXcudHh0Q29uZmlybVBhc3N3b3JkLnZhbCgpO1xyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdwYXNzJyArIHBhc3N3b3JkICsgJyBjb25maXJtICcgKyBjb25maXJtUGFzc3dvcmQpO1xyXG5cclxuICAgICAgICAgIGlmKCFwYXNzd29yZCB8fCAhcGFzc3dvcmQudHJpbSgpKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Bhc3MnKTtcclxuICAgICAgICAgICAgdmlldy5hbGVydFBhc3NOZWVkZWQucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9ZWxzZSBpZighY29uZmlybVBhc3N3b3JkIHx8ICFjb25maXJtUGFzc3dvcmQudHJpbSgpKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvbmZpcm0gcGFzcycpO1xyXG4gICAgICAgICAgICB2aWV3LmFsZXJ0Q29uZmlybVBhc3NOZWVkZWQucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9ZWxzZSBpZihwYXNzd29yZCAhPSBjb25maXJtUGFzc3dvcmQpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbWF0Y2hpbmcnKTtcclxuICAgICAgICAgICAgdmlldy5hbGVydE1hdGNoaW5nVmFsaWRhdGlvbi5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb250cm9sbGVyLnJlc2V0UGFzc3dvcmQocGFzc3dvcmQpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIH0sXHJcbiAgICAgIGhpZGVBbGxBbGVydHM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5hbGVydFBhc3NOZWVkZWQuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgIHRoaXMuYWxlcnRDb25maXJtUGFzc05lZWRlZC5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgdGhpcy5hbGVydE1hdGNoaW5nVmFsaWRhdGlvbi5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgdGhpcy5hbGVydEluZm8uYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgIHRoaXMuYWxlcnRSZXNldENvZGVJbnZhbGlkLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb250cm9sbGVyLmluaXQoKTtcclxuXHJcbiAgfSgpKTtcclxuXHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
