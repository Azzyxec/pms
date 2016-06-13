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



        $("#user-Profile-Btn-Link").attr('href', controller.doctorProfile);

        $("#doctor-dash-logout-btn").attr('href', controller.logoutUrl);



        $("#dashboard-Section-Btn").attr('href', controller.dashboardHomeUrl);

        $("#appointment-section-link-btn").attr('href', controller.doctorsAppointmentsListUrl);

        $("#manage-Doctors-Schedule-Section-Link-Btn").attr('href', controller.ScheduleCalendarUrl);

        $("#btn-programme-section-link").attr('href', controller.programmeListingsUrl);

        $("#create-program-for-patient-section").attr('href', controller.createProgramForPatientUrl);

        $("#patients-Entry-Section-Link-Btn").attr('href', controller.patientsListingUrl);

        //$("#patients-entry-create-section-link-Btn").attr('href', controller.patientsEntryUrl);
        //$("#patients-History-Section-Link-Btn").attr('href', controller.patientsHistoryUrl);

        $("#staff-managment-section-link-btn").attr('href', controller.doctorsStaffListingUr);

        $("#btn-manage-locations").attr('href', controller.ManageLocationsUrl);

        $("#analytics-side-navigation-link-btn").attr('href', controller.analyticsReportUrl);
        $("#accounting-side-navigation-link-btn").attr('href', controller.accountingUrl);
        $("#medicine-side-navigation-link-btn").attr('href', controller.medicineSearchUrl);



        //$("#book-Appointments-Section-Btn").attr('href', controller.newAppointmentUrl);
        //$("#close-Book-Appointment-Section-Link-Btn").attr('href', controller.closeAppointmentUrl);
        //$("#view-Appointment-Section-Link-Btn").attr('href', controller.doctorsAppointmentsListUrl);
        //$("#manage-Doctors-Schedule-Section-Link-Btn").attr('href', controller.listScheduleUrl);
        //$("#manage-schedule-create-section-link-Btn").attr('href', controller.newScheduleUrl);
        //$("#calendar-Template-Btn-Link").attr('href', controller.CalendarTemplateUrl);
        //$("#manage-schedule-list-section-link-Btn").attr('href', controller.ScheduleCalendarUrl);

        $("#other-settings-section-link-btn").click(function(e){
          e.preventDefault();
        });
        $("#calendar-template-section-link-btn").click(function(e){
          e.preventDefault();
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpbmtzLmpzIiwiZG9jdG9yRGFzaGJvYXJkLmpzIiwicGF0aWVudC5oaXN0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InBhdGllbnQuaGlzdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBsaW5rcyA9IHtcclxuXHJcbiAgLy9sb2dpbiBqcyB1cmxzXHJcbiAgIGF1dGhlbnRpY2F0ZVVybCA6IFwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9hdXRoZW5pdGNhdGVVc2VyXCIsXHJcbiAgIHN1Y2Nlc3NSZWRpcmVjdFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9cIixcclxuICAgcmVnaXN0ZXJEb2N0b3JVcmwgOiBcImluZGV4LnBocC9kb2N0b3IvZG9jdG9ySW5mb1wiLFxyXG4gICBhZG1pblVybDpcImluZGV4LnBocC9hZG1pbkRhc2hib2FyZC9hZG1pblwiLFxyXG5cclxuICAgLy9wYXNzd29yZCByZXNldFxyXG4gICBwYXNzd29yZFJlc3RSZXF1ZXN0VXJsOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvcmVzZXRQYXNzd29yZFJlcXVlc3RcIixcclxuICAgbG9naW5Vcmw6IFwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9sb2dpblwiLFxyXG4gICBwYXNzd29yZFJlc2V0VXJsOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvcGFzc3dvcmRSZXNldFwiLFxyXG4gICBmb3Jnb3RQYXNzd29yZFVybDogXCJpbmRleC5waHAvYXV0aGVudGljYXRlL2ZvcmdvdFBhc3N3b3JkXCIsXHJcblxyXG4gICAvL2FkbWluIHJlbGF0ZWRcclxuICAgZG9jdG9yTGlzdGluZ1VybDogXCJpbmRleC5waHAvYWRtaW5EYXNoYm9hcmQvZG9jdG9yTGlzdGluZ1wiLFxyXG5cclxuICAgbG9nb3V0VXJsIDogXCJpbmRleC5waHAvYXV0aGVudGljYXRlL2xvZ291dFwiLFxyXG5cclxuICAgLy9kb2N0b3IgZGFzaGJvYXJkIGxpbmtzXHJcbiAgIGRvY3RvclByb2ZpbGUgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvZG9jdG9yUHJvZmlsZVwiLFxyXG4gICBkYXNoYm9hcmRIb21lVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL1wiLFxyXG4gICBuZXdBcHBvaW50bWVudFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9ib29rQXBwb2ludG1lbnRcIixcclxuICAgcGF0aWVudHNFbnRyeVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wYXRpZW50c0VudHJ5XCIsXHJcbiAgIHBhdGllbnRzTGlzdGluZ1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wYXRpZW50c0xpc3RpbmdcIixcclxuICAgY2xvc2VBcHBvaW50bWVudFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jbG9zZUFwcG9pbnRtZW50XCIsXHJcbiAgIGRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2xpc3RBcHBvaW50bWVudFwiLFxyXG4gICBuZXdTY2hlZHVsZVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9uZXdTY2hlZHVsZVwiLFxyXG4gICBsaXN0U2NoZWR1bGVVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvc2NoZWR1bGVMaXN0XCIsXHJcbiAgIGdldFNjaGVkdWxlQ2FsZW5kYXJVcmw6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9TY2hlZHVsZUNhbGVuZGVyVmlld1wiLFxyXG4gICBhZGRTdGFmZlVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9zdGFmZkVudHJ5XCIsXHJcbiAgIGRvY3RvcnNTdGFmZkxpc3RpbmdVciA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9zdGFmZkxpc3RpbmdcIixcclxuICAgcGF0aWVudHNIaXN0b3J5VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3BhdGllbnRIaXN0b3J5XCIsXHJcbiAgIGNyZWF0ZVByb2dyYW1Gb3JQYXRpZW50VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2NyZWF0ZU1lZGljYWxQcm9ncmFtXCIsXHJcbiAgIHByb2dyYW1tZUxpc3RpbmdzVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3Byb2dyYW1tZUxpc3RcIixcclxuICAgTWFuYWdlTG9jYXRpb25zVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3dvcmtMb2NhdGlvbk1hbmFnZW1lbnRcIixcclxuICAgZ2V0QW5hbHl0aWNzVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL0FuYWx5dGljc1JlcG9ydFwiLFxyXG4gICBnZXRDYWxlbmRlclVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jYWxlbmRhclRlbXBsYXRlXCIsXHJcbiAgIGFjY291bnRpbmdVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvYWNjb3VudGluZ1wiLFxyXG4gICBtZWRpY2luZVNlYXJjaFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9tZWRpY2luZVNlYXJjaFwiLFxyXG5cclxuXHJcbiAgIC8vc2NoZWR1bGVcclxuICAgZ2V0TG9jYXRpb25Vcmw6IFwiaW5kZXgucGhwL2xvY2F0aW9ucy9nZXREb2N0b3JMb2NhdGlvbnNcIixcclxuICAgY3JlYXRlVXBkYXRlU2NoZWR1bGVVcmw6IFwiaW5kZXgucGhwL3NjaGVkdWxlL2NyZWF0ZVVwZGF0ZVNjaGVkdWxlXCIsXHJcbiAgIGdldFNlY2hkdWxlQ2FsZW5kYXJEZXRhaWxzVXJsOiBcImluZGV4LnBocC9zY2hlZHVsZS9nZXRDYWxhbmRlckRldGFpbHNcIixcclxuXHJcbiAgIC8vcHJvZ3JhbW1lXHJcbiAgIGRvY3RvcnNQcm9ncmFtc1VybDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0RG9jdG9yc0NoZWNrdXBQcm9ncmFtc1wiLFxyXG4gICBwcm9ncmFtbWVFZGl0VXJsOlwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jcmVhdGVNZWRpY2FsUHJvZ3JhbVwiLFxyXG4gICBjcmVhdGVNb2RpZnlQcm9ncmFtbWVVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2NyZWF0ZU1vZGlmeVByb2dyYW1tZVwiLFxyXG4gICBnZXRQcm9ncmFtbWVVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldFByb2dyYW1tZXNcIixcclxuXHJcblxyXG4gICAvL3BhdGllbnRcclxuICAgcGF0aWVudERldGFpbFBlcnNpc3RVcmw6XCJpbmRleC5waHAvcGF0aWVudC9hZGRVcGRhdGVQYXRpZW50XCIsXHJcbiAgIHBhdGllbnRzRGV0YWlsc1VybDpcImluZGV4LnBocC9wYXRpZW50L2dldFBhdGllbnREZXRhaWxzXCIsXHJcbiAgIGxvZ2luQ2hlY2tVcmw6XCJpbmRleC5waHAvYXV0aGVudGljYXRlL2lzTG9nZ2VkSW5cIixcclxuICAgZ2V0UHJvZ3JhbW1lTGlzdDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0TWVkaWNhdGlvblByb2dyYW1tZUxpc3RcIixcclxuICAgcHJvZ3JhbW1lTGlzdERldGFpbHNVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldFByb2dyYW1tZUxpc3REZXRhaWxzXCIsXHJcbiAgIC8vcGF0aWVudHNQcm9ncmFtbWVzVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRQYXRpZW50UHJvZ3JhbW1lc1wiLFxyXG4gICBwYXRpZW50TGlzdGluZ1VybDpcImluZGV4LnBocC9wYXRpZW50L2dldFBhdGllbnRMaXN0XCIsXHJcblxyXG4gICBib29rQXBwb2ludG1lbnRVcmw6IFwiaW5kZXgucGhwL2FwcG9pbnRtZW50L2Jvb2tBcHBvaW50bWVudFwiLFxyXG4gICBnZXRBcHBvaW50bWVudEZvclRoZURheVVybDogXCJpbmRleC5waHAvYXBwb2ludG1lbnQvZ2V0QXBwb2ludG1lbnRzRm9yVGhlRGF5XCIsXHJcblxyXG4gICBzYXZlVXBkYXRlTG9jYXRpb25zOlwiaW5kZXgucGhwL2xvY2F0aW9ucy9hZGRVcGRhdGVMb2NhdGlvblwiLFxyXG4gICBsb2NhdGlvbkxpc3RVcmw6XCJpbmRleC5waHAvbG9jYXRpb25zL2dldERvY3RvckxvY2F0aW9uc1wiLFxyXG4gICBkZWxpdmVyeU1ldGhvZHNVcmw6XCJpbmRleC5waHAvcGF0aWVudC9nZXREZWxpdmVyeU1ldGhvZHNcIixcclxuXHJcblxyXG4gICAvL3JlZ2lzdGFydGlvblxyXG4gICBkb2N0b3JVcmw6XCJpbmRleC5waHAvZG9jdG9yL3NhdmVVcGRhdGVEb2N0b3JcIixcclxuICAgZG9jdG9yRGV0YWlsc1VybDpcImluZGV4LnBocC9kb2N0b3IvZ2V0RG9jdG9yRGV0YWlsc1wiLFxyXG4gICBsb2dpbkNoZWNrVXJsOlwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9pc0xvZ2dlZEluXCIsXHJcbiAgIGRvY3RvckRhc2hVcmw6XCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL1wiLFxyXG4gICBsb2dvdXRVcmw6XCJpbmRleC5waHAvYXV0aGVudGljYXRlL2xvZ291dFwiLFxyXG5cclxuICAgY3JlYXRlTW9kaWZ5U3RhZmZVcmw6XCJpbmRleC5waHAvc3RhZmYvY3JlYXRlTW9kaWZ5U3RhZmZcIixcclxuICAgZ2V0U3RhZmZEZXRhaWxzVXJsOiBcImluZGV4LnBocC9zdGFmZi9nZXRTdGFmZkRldGFpbHNcIixcclxuICAgc3RhZmZMaXN0aW5nVXJsOiBcImluZGV4LnBocC9zdGFmZi9nZXREb2N0b3JzU3RhZmZMaXN0XCJcclxuXHJcbn1cclxuIiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuXHJcbiAgLy9kZWZpbmluZyB0aGUgaGVscGVyIGZ1bmN0aW9ucyBpbiBnbG9iYWxcclxuXHJcbiAgJChmdW5jdGlvbigpe1xyXG5cclxuICAgIGNvbnNvbGUubG9nKCdEb2N0b3IgRGFzaGJvYXJkIGpzIGxvYWRlZCcpO1xyXG5cclxuICAgIC8vdG9wIGxldmVsIGNvbnRyb2xsZXJcclxuICAgIHZhciBjb250cm9sbGVyID0ge1xyXG4gICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vd2lyaW5nIHRoZSBuYXZpZ2F0aW9uXHJcbiAgICAgICAgdGhpcy5sb2dvdXRVcmwgPSBsaW5rcy5sb2dvdXRVcmw7XHJcbiAgICAgICAgdGhpcy5kb2N0b3JQcm9maWxlID0gbGlua3MuZG9jdG9yUHJvZmlsZTtcclxuICAgICAgICB0aGlzLmRhc2hib2FyZEhvbWVVcmwgPSBsaW5rcy5kYXNoYm9hcmRIb21lVXJsO1xyXG4gICAgICAgIHRoaXMubmV3QXBwb2ludG1lbnRVcmwgPSBsaW5rcy5uZXdBcHBvaW50bWVudFVybDtcclxuICAgICAgICB0aGlzLnBhdGllbnRzRW50cnlVcmwgPSBsaW5rcy5wYXRpZW50c0VudHJ5VXJsO1xyXG4gICAgICAgIHRoaXMucGF0aWVudHNMaXN0aW5nVXJsID0gbGlua3MucGF0aWVudHNMaXN0aW5nVXJsO1xyXG4gICAgICAgIHRoaXMuY2xvc2VBcHBvaW50bWVudFVybCA9IGxpbmtzLmNsb3NlQXBwb2ludG1lbnRVcmw7XHJcbiAgICAgICAgdGhpcy5kb2N0b3JzQXBwb2ludG1lbnRzTGlzdFVybCA9IGxpbmtzLmRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsO1xyXG5cclxuICAgICAgICB0aGlzLm5ld1NjaGVkdWxlVXJsID0gbGlua3MubmV3U2NoZWR1bGVVcmw7XHJcbiAgICAgICAgdGhpcy5saXN0U2NoZWR1bGVVcmwgPSB0aGlzLmxpc3RTY2hlZHVsZVVybDtcclxuICAgICAgICB0aGlzLlNjaGVkdWxlQ2FsZW5kYXJVcmwgPSBsaW5rcy5nZXRTY2hlZHVsZUNhbGVuZGFyVXJsO1xyXG4gICAgICAgIHRoaXMuYWRkU3RhZmZVcmwgPSBsaW5rcy5hZGRTdGFmZlVybDtcclxuICAgICAgICB0aGlzLmRvY3RvcnNTdGFmZkxpc3RpbmdVciA9IGxpbmtzLmRvY3RvcnNTdGFmZkxpc3RpbmdVcjtcclxuXHJcbiAgICAgICAgdGhpcy5wYXRpZW50c0hpc3RvcnlVcmwgPSBsaW5rcy5wYXRpZW50c0hpc3RvcnlVcmw7XHJcblxyXG4gICAgICAgIHRoaXMuY3JlYXRlUHJvZ3JhbUZvclBhdGllbnRVcmwgPSBsaW5rcy5jcmVhdGVQcm9ncmFtRm9yUGF0aWVudFVybCA7XHJcbiAgICAgICAgdGhpcy5wcm9ncmFtbWVMaXN0aW5nc1VybCA9IGxpbmtzLnByb2dyYW1tZUxpc3RpbmdzVXJsO1xyXG5cclxuICAgICAgICB0aGlzLk1hbmFnZUxvY2F0aW9uc1VybCA9IGxpbmtzLk1hbmFnZUxvY2F0aW9uc1VybDtcclxuICAgICAgICB0aGlzLkNhbGVuZGFyVGVtcGxhdGVVcmwgPSBsaW5rcy5nZXRDYWxlbmRlclVybDtcclxuXHJcbiAgICAgICAgdGhpcy5hbmFseXRpY3NSZXBvcnRVcmwgPSBsaW5rcy5nZXRBbmFseXRpY3NVcmw7XHJcbiAgICAgICAgdGhpcy5hY2NvdW50aW5nVXJsID0gbGlua3MuYWNjb3VudGluZ1VybDtcclxuICAgICAgICB0aGlzLm1lZGljaW5lU2VhcmNoVXJsID0gbGlua3MubWVkaWNpbmVTZWFyY2hVcmw7XHJcbiAgICAgICAgLy9kbyBzb21ldGhuZyBhYm91dCBkb2N0b3JzIGluZm8gYW5kIHJlZ2lzdHJhdGlvblxyXG5cclxuICAgICAgICAvL1RoZSB1cmwgZnJvbSB0aGUgYnJvd3NlciAgY2FuIGJlIGNvbXBhcmVkIHRvIHNldCB0aGUgYWN0aXZlIG5hdmlnYXRpb25cclxuICAgICAgICBuYXZWaWV3LmluaXQoKTtcclxuXHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdmFyIG5hdlZpZXcgPSB7XHJcbiAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIC8vd2lyaW5nIHRoZSBuYXZpZ2F0aW9uIGNsaWNrc1xyXG5cclxuXHJcbiAgICAgICAgJChcIiNwbXMtYnJhbmQtYnRuLWxpbmtcIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnUE1TIGJyYW5kIGNsaWNrJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgJChcIiN1c2VyLVByb2ZpbGUtQnRuLUxpbmtcIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIuZG9jdG9yUHJvZmlsZSk7XHJcblxyXG4gICAgICAgICQoXCIjZG9jdG9yLWRhc2gtbG9nb3V0LWJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5sb2dvdXRVcmwpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICQoXCIjZGFzaGJvYXJkLVNlY3Rpb24tQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmRhc2hib2FyZEhvbWVVcmwpO1xyXG5cclxuICAgICAgICAkKFwiI2FwcG9pbnRtZW50LXNlY3Rpb24tbGluay1idG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIuZG9jdG9yc0FwcG9pbnRtZW50c0xpc3RVcmwpO1xyXG5cclxuICAgICAgICAkKFwiI21hbmFnZS1Eb2N0b3JzLVNjaGVkdWxlLVNlY3Rpb24tTGluay1CdG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIuU2NoZWR1bGVDYWxlbmRhclVybCk7XHJcblxyXG4gICAgICAgICQoXCIjYnRuLXByb2dyYW1tZS1zZWN0aW9uLWxpbmtcIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIucHJvZ3JhbW1lTGlzdGluZ3NVcmwpO1xyXG5cclxuICAgICAgICAkKFwiI2NyZWF0ZS1wcm9ncmFtLWZvci1wYXRpZW50LXNlY3Rpb25cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIuY3JlYXRlUHJvZ3JhbUZvclBhdGllbnRVcmwpO1xyXG5cclxuICAgICAgICAkKFwiI3BhdGllbnRzLUVudHJ5LVNlY3Rpb24tTGluay1CdG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIucGF0aWVudHNMaXN0aW5nVXJsKTtcclxuXHJcbiAgICAgICAgLy8kKFwiI3BhdGllbnRzLWVudHJ5LWNyZWF0ZS1zZWN0aW9uLWxpbmstQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLnBhdGllbnRzRW50cnlVcmwpO1xyXG4gICAgICAgIC8vJChcIiNwYXRpZW50cy1IaXN0b3J5LVNlY3Rpb24tTGluay1CdG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIucGF0aWVudHNIaXN0b3J5VXJsKTtcclxuXHJcbiAgICAgICAgJChcIiNzdGFmZi1tYW5hZ21lbnQtc2VjdGlvbi1saW5rLWJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5kb2N0b3JzU3RhZmZMaXN0aW5nVXIpO1xyXG5cclxuICAgICAgICAkKFwiI2J0bi1tYW5hZ2UtbG9jYXRpb25zXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLk1hbmFnZUxvY2F0aW9uc1VybCk7XHJcblxyXG4gICAgICAgICQoXCIjYW5hbHl0aWNzLXNpZGUtbmF2aWdhdGlvbi1saW5rLWJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5hbmFseXRpY3NSZXBvcnRVcmwpO1xyXG4gICAgICAgICQoXCIjYWNjb3VudGluZy1zaWRlLW5hdmlnYXRpb24tbGluay1idG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIuYWNjb3VudGluZ1VybCk7XHJcbiAgICAgICAgJChcIiNtZWRpY2luZS1zaWRlLW5hdmlnYXRpb24tbGluay1idG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIubWVkaWNpbmVTZWFyY2hVcmwpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vJChcIiNib29rLUFwcG9pbnRtZW50cy1TZWN0aW9uLUJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5uZXdBcHBvaW50bWVudFVybCk7XHJcbiAgICAgICAgLy8kKFwiI2Nsb3NlLUJvb2stQXBwb2ludG1lbnQtU2VjdGlvbi1MaW5rLUJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5jbG9zZUFwcG9pbnRtZW50VXJsKTtcclxuICAgICAgICAvLyQoXCIjdmlldy1BcHBvaW50bWVudC1TZWN0aW9uLUxpbmstQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsKTtcclxuICAgICAgICAvLyQoXCIjbWFuYWdlLURvY3RvcnMtU2NoZWR1bGUtU2VjdGlvbi1MaW5rLUJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5saXN0U2NoZWR1bGVVcmwpO1xyXG4gICAgICAgIC8vJChcIiNtYW5hZ2Utc2NoZWR1bGUtY3JlYXRlLXNlY3Rpb24tbGluay1CdG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIubmV3U2NoZWR1bGVVcmwpO1xyXG4gICAgICAgIC8vJChcIiNjYWxlbmRhci1UZW1wbGF0ZS1CdG4tTGlua1wiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5DYWxlbmRhclRlbXBsYXRlVXJsKTtcclxuICAgICAgICAvLyQoXCIjbWFuYWdlLXNjaGVkdWxlLWxpc3Qtc2VjdGlvbi1saW5rLUJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5TY2hlZHVsZUNhbGVuZGFyVXJsKTtcclxuXHJcbiAgICAgICAgJChcIiNvdGhlci1zZXR0aW5ncy1zZWN0aW9uLWxpbmstYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoXCIjY2FsZW5kYXItdGVtcGxhdGUtc2VjdGlvbi1saW5rLWJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICB9LFxyXG4gICAgICByZW5kZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy9oaWdobGlnaHQgdGhlIHJpZ2h0IG5hdmlnYXRpb25cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnRyb2xsZXIuaW5pdCgpO1xyXG5cclxuICB9KCkpO1xyXG5cclxufSk7XHJcbiIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgJChmdW5jdGlvbigpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdwYXRpZW50IEhpc3RvcnkganMgbG9hZGVkJyk7XHJcbiAgICB9KCkpO1xyXG5cclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
