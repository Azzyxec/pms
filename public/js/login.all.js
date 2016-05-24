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
   getCalenderUrl : "index.php/doctorDashboard/calendarTemplate",


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
  console.log('login component');

  var controller = {
                      init: function(){
                        loginView.init();
                      },
                      authenticateUrl: links.authenticateUrl,
                      successRedirectUrl: links.successRedirectUrl,
                      registerDoctorUrl: links.registerDoctorUrl,
                      adminUrl: links.adminUrl
                   };

    var loginView = {
                      init: function(){
                        console.log('view init');

                        this.loginId =  $('#login-id');
                        this.password =  $('#login-password');

                        var controls = {loginId: this.loginId, password: this.password};


                        //wiring events
                        $('#login-submit').on('click', (function(controls){
                          //console.log('handler added : ' + cat.Id);
                          return function(){
                            //console.log('handler exec : ' + cat.Id);
                            console.log('click submit' + controls.loginId.val());
                              console.log('url: ' + controller.authenticateUrl);

                               $.post( controller.authenticateUrl , { loginId:  controls.loginId.val(), password:  controls.password.val() })
                                .done(function( response ) {
                                  console.log('response ' + JSON.stringify(response));

                                  if(response.data.type == "-1"){
                                    console.log('invalid username or password');
                                  }else if(response.data.type == "A"){
                                    console.log('authenticated as admin');
                                    window.location.href = controller.adminUrl;
                                  }else if(response.data.type == "D"){
                                    console.log('authenticated as doctor');
                                    window.location.href = controller.successRedirectUrl;
                                  }

                                });

                          };
                        })(controls));

                        $('#btn-register-doctor').on('click', function(){
                          console.log('register click redirect');
                          window.location.href = controller.registerDoctorUrl;
                        });


                        // $.post( controller.authenticateUrl , { loginId: this.loginId.val(), password: this.password.val() })
                        //  .done(function( data ) {
                        //    console.log('data ' + JSON.stringify(data));
                        //  });
                      },
                      render: function(){

                      }
                    };
    controller.init();

});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpbmtzLmpzIiwibG9naW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibG9naW4uYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGxpbmtzID0ge1xyXG5cclxuICAvL2xvZ2luIGpzIHVybHNcclxuICAgYXV0aGVudGljYXRlVXJsIDogXCJpbmRleC5waHAvYXV0aGVudGljYXRlL2F1dGhlbml0Y2F0ZVVzZXJcIixcclxuICAgc3VjY2Vzc1JlZGlyZWN0VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL1wiLFxyXG4gICByZWdpc3RlckRvY3RvclVybCA6IFwiaW5kZXgucGhwL2RvY3Rvci9kb2N0b3JJbmZvXCIsXHJcbiAgIGFkbWluVXJsOlwiaW5kZXgucGhwL2FkbWluRGFzaGJvYXJkL2FkbWluXCIsXHJcblxyXG4gICAvL2FkbWluIHJlbGF0ZWRcclxuICAgZG9jdG9yTGlzdGluZ1VybDogXCJpbmRleC5waHAvYWRtaW5EYXNoYm9hcmQvZG9jdG9yTGlzdGluZ1wiLFxyXG5cclxuICAgbG9nb3V0VXJsIDogXCJpbmRleC5waHAvYXV0aGVudGljYXRlL2xvZ291dFwiLFxyXG5cclxuICAgLy9kb2N0b3IgZGFzaGJvYXJkIGxpbmtzXHJcbiAgIGRvY3RvclByb2ZpbGUgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvZG9jdG9yUHJvZmlsZVwiLFxyXG4gICBkYXNoYm9hcmRIb21lVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL1wiLFxyXG4gICBuZXdBcHBvaW50bWVudFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9ib29rQXBwb2ludG1lbnRcIixcclxuICAgcGF0aWVudHNFbnRyeVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wYXRpZW50c0VudHJ5XCIsXHJcbiAgIHBhdGllbnRzTGlzdGluZ1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wYXRpZW50c0xpc3RpbmdcIixcclxuICAgY2xvc2VBcHBvaW50bWVudFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jbG9zZUFwcG9pbnRtZW50XCIsXHJcbiAgIGRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2xpc3RBcHBvaW50bWVudFwiLFxyXG4gICBuZXdTY2hlZHVsZVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9uZXdTY2hlZHVsZVwiLFxyXG4gICBsaXN0U2NoZWR1bGVVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvc2NoZWR1bGVMaXN0XCIsXHJcbiAgIGFkZFN0YWZmVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3N0YWZmRW50cnlcIixcclxuICAgZG9jdG9yc1N0YWZmTGlzdGluZ1VyIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3N0YWZmTGlzdGluZ1wiLFxyXG4gICBwYXRpZW50c0hpc3RvcnlVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvcGF0aWVudEhpc3RvcnlcIixcclxuICAgY3JlYXRlUHJvZ3JhbUZvclBhdGllbnRVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvY3JlYXRlTWVkaWNhbFByb2dyYW1cIixcclxuICAgcHJvZ3JhbW1lTGlzdGluZ3NVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvcHJvZ3JhbW1lTGlzdFwiLFxyXG4gICBNYW5hZ2VMb2NhdGlvbnNVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvd29ya0xvY2F0aW9uTWFuYWdlbWVudFwiLFxyXG4gICBnZXRDYWxlbmRlclVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jYWxlbmRhclRlbXBsYXRlXCIsXHJcblxyXG5cclxuICAgLy9zY2hlZHVsZVxyXG4gICBnZXRMb2NhdGlvblVybDogXCJpbmRleC5waHAvbG9jYXRpb25zL2dldERvY3RvckxvY2F0aW9uc1wiLFxyXG4gICBjcmVhdGVVcGRhdGVTY2hlZHVsZVVybDogXCJpbmRleC5waHAvc2NoZWR1bGUvY3JlYXRlVXBkYXRlU2NoZWR1bGVcIixcclxuICAgZ2V0U2NoZWR1bGVDYWxlbmRhclVybDogXCJpbmRleC5waHAvc2NoZWR1bGUvU2NoZWR1bGVDYWxlbmRlclZpZXdcIixcclxuXHJcbiAgIC8vcHJvZ3JhbW1lXHJcbiAgIHByb2dyYW1tZUxpc3RVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldE1lZGljYXRpb25Qcm9ncmFtbWVMaXN0XCIsXHJcbiAgIHByb2dyYW1tZUVkaXRVcmw6XCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2NyZWF0ZU1lZGljYWxQcm9ncmFtXCIsXHJcbiAgIGNyZWF0ZU1vZGlmeVByb2dyYW1tZVVybDpcImluZGV4LnBocC9wcm9ncmFtbWUvY3JlYXRlTW9kaWZ5UHJvZ3JhbW1lXCIsXHJcbiAgIGdldFByb2dyYW1tZVVybDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0UHJvZ3JhbW1lc1wiLFxyXG5cclxuXHJcbiAgIC8vcGF0aWVudFxyXG4gICBwYXRpZW50RGV0YWlsUGVyc2lzdFVybDpcImluZGV4LnBocC9wYXRpZW50L2FkZFVwZGF0ZVBhdGllbnRcIixcclxuICAgcGF0aWVudHNEZXRhaWxzVXJsOlwiaW5kZXgucGhwL3BhdGllbnQvZ2V0UGF0aWVudERldGFpbHNcIixcclxuICAgbG9naW5DaGVja1VybDpcImluZGV4LnBocC9hdXRoZW50aWNhdGUvaXNMb2dnZWRJblwiLFxyXG4gICBnZXRQcm9ncmFtbWVMaXN0OlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRNZWRpY2F0aW9uUHJvZ3JhbW1lTGlzdFwiLFxyXG4gICBwcm9ncmFtbWVMaXN0RGV0YWlsc1VybDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0UHJvZ3JhbW1lTGlzdERldGFpbHNcIixcclxuICAgcGF0aWVudHNQcm9ncmFtbWVzVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRQYXRpZW50UHJvZ3JhbW1lc1wiLFxyXG4gICBwYXRpZW50TGlzdGluZ1VybDpcImluZGV4LnBocC9wYXRpZW50L2dldFBhdGllbnRMaXN0XCIsXHJcblxyXG4gICBzYXZlVXBkYXRlTG9jYXRpb25zOlwiaW5kZXgucGhwL2xvY2F0aW9ucy9hZGRVcGRhdGVMb2NhdGlvblwiLFxyXG4gICBsb2NhdGlvbkxpc3RVcmw6XCJpbmRleC5waHAvbG9jYXRpb25zL2dldERvY3RvckxvY2F0aW9uc1wiLFxyXG4gICBkZWxpdmVyeU1ldGhvZHNVcmw6XCJpbmRleC5waHAvcGF0aWVudC9nZXREZWxpdmVyeU1ldGhvZHNcIiwgXHJcblxyXG5cclxuICAgLy9yZWdpc3RhcnRpb25cclxuICAgZG9jdG9yVXJsOlwiaW5kZXgucGhwL2RvY3Rvci9zYXZlVXBkYXRlRG9jdG9yXCIsXHJcbiAgIGRvY3RvckRldGFpbHNVcmw6XCJpbmRleC5waHAvZG9jdG9yL2dldERvY3RvckRldGFpbHNcIixcclxuICAgbG9naW5DaGVja1VybDpcImluZGV4LnBocC9hdXRoZW50aWNhdGUvaXNMb2dnZWRJblwiLFxyXG4gICBkb2N0b3JEYXNoVXJsOlwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9cIixcclxuICAgbG9nb3V0VXJsOlwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9sb2dvdXRcIixcclxuXHJcbiAgIGNyZWF0ZU1vZGlmeVN0YWZmVXJsOlwiaW5kZXgucGhwL3N0YWZmL2NyZWF0ZU1vZGlmeVN0YWZmXCIsXHJcbiAgIGdldFN0YWZmRGV0YWlsc1VybDogXCJpbmRleC5waHAvc3RhZmYvZ2V0U3RhZmZEZXRhaWxzXCIsXHJcbiAgIHN0YWZmTGlzdGluZ1VybDogXCJpbmRleC5waHAvc3RhZmYvZ2V0RG9jdG9yc1N0YWZmTGlzdFwiXHJcblxyXG59XHJcbiIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcbiAgY29uc29sZS5sb2coJ2xvZ2luIGNvbXBvbmVudCcpO1xyXG5cclxuICB2YXIgY29udHJvbGxlciA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2luVmlldy5pbml0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgYXV0aGVudGljYXRlVXJsOiBsaW5rcy5hdXRoZW50aWNhdGVVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzUmVkaXJlY3RVcmw6IGxpbmtzLnN1Y2Nlc3NSZWRpcmVjdFVybCxcclxuICAgICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVyRG9jdG9yVXJsOiBsaW5rcy5yZWdpc3RlckRvY3RvclVybCxcclxuICAgICAgICAgICAgICAgICAgICAgIGFkbWluVXJsOiBsaW5rcy5hZG1pblVybFxyXG4gICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICB2YXIgbG9naW5WaWV3ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3ZpZXcgaW5pdCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpbklkID0gICQoJyNsb2dpbi1pZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhc3N3b3JkID0gICQoJyNsb2dpbi1wYXNzd29yZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRyb2xzID0ge2xvZ2luSWQ6IHRoaXMubG9naW5JZCwgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmR9O1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vd2lyaW5nIGV2ZW50c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjbG9naW4tc3VibWl0Jykub24oJ2NsaWNrJywgKGZ1bmN0aW9uKGNvbnRyb2xzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdoYW5kbGVyIGFkZGVkIDogJyArIGNhdC5JZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdoYW5kbGVyIGV4ZWMgOiAnICsgY2F0LklkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjbGljayBzdWJtaXQnICsgY29udHJvbHMubG9naW5JZC52YWwoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd1cmw6ICcgKyBjb250cm9sbGVyLmF1dGhlbnRpY2F0ZVVybCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5wb3N0KCBjb250cm9sbGVyLmF1dGhlbnRpY2F0ZVVybCAsIHsgbG9naW5JZDogIGNvbnRyb2xzLmxvZ2luSWQudmFsKCksIHBhc3N3b3JkOiAgY29udHJvbHMucGFzc3dvcmQudmFsKCkgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiggcmVzcG9uc2UgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVzcG9uc2UgJyArIEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzcG9uc2UuZGF0YS50eXBlID09IFwiLTFcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbnZhbGlkIHVzZXJuYW1lIG9yIHBhc3N3b3JkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihyZXNwb25zZS5kYXRhLnR5cGUgPT0gXCJBXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnYXV0aGVudGljYXRlZCBhcyBhZG1pbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuYWRtaW5Vcmw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihyZXNwb25zZS5kYXRhLnR5cGUgPT0gXCJEXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnYXV0aGVudGljYXRlZCBhcyBkb2N0b3InKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLnN1Y2Nlc3NSZWRpcmVjdFVybDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKGNvbnRyb2xzKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjYnRuLXJlZ2lzdGVyLWRvY3RvcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlZ2lzdGVyIGNsaWNrIHJlZGlyZWN0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLnJlZ2lzdGVyRG9jdG9yVXJsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAkLnBvc3QoIGNvbnRyb2xsZXIuYXV0aGVudGljYXRlVXJsICwgeyBsb2dpbklkOiB0aGlzLmxvZ2luSWQudmFsKCksIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkLnZhbCgpIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAuZG9uZShmdW5jdGlvbiggZGF0YSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgY29uc29sZS5sb2coJ2RhdGEgJyArIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgIGNvbnRyb2xsZXIuaW5pdCgpO1xyXG5cclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
