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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpbmtzLmpzIiwibG9naW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJsb2dpbi5hbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgbGlua3MgPSB7XHJcblxyXG4gIC8vbG9naW4ganMgdXJsc1xyXG4gICBhdXRoZW50aWNhdGVVcmwgOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvYXV0aGVuaXRjYXRlVXNlclwiLFxyXG4gICBzdWNjZXNzUmVkaXJlY3RVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvXCIsXHJcbiAgIHJlZ2lzdGVyRG9jdG9yVXJsIDogXCJpbmRleC5waHAvZG9jdG9yL2RvY3RvckluZm9cIixcclxuICAgYWRtaW5Vcmw6XCJpbmRleC5waHAvYWRtaW5EYXNoYm9hcmQvYWRtaW5cIixcclxuXHJcbiAgIC8vYWRtaW4gcmVsYXRlZFxyXG4gICBkb2N0b3JMaXN0aW5nVXJsOiBcImluZGV4LnBocC9hZG1pbkRhc2hib2FyZC9kb2N0b3JMaXN0aW5nXCIsXHJcblxyXG4gICBsb2dvdXRVcmwgOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvbG9nb3V0XCIsXHJcblxyXG4gICAvL2RvY3RvciBkYXNoYm9hcmQgbGlua3NcclxuICAgZG9jdG9yUHJvZmlsZSA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9kb2N0b3JQcm9maWxlXCIsXHJcbiAgIGRhc2hib2FyZEhvbWVVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvXCIsXHJcbiAgIG5ld0FwcG9pbnRtZW50VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2Jvb2tBcHBvaW50bWVudFwiLFxyXG4gICBwYXRpZW50c0VudHJ5VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3BhdGllbnRzRW50cnlcIixcclxuICAgcGF0aWVudHNMaXN0aW5nVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3BhdGllbnRzTGlzdGluZ1wiLFxyXG4gICBjbG9zZUFwcG9pbnRtZW50VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2Nsb3NlQXBwb2ludG1lbnRcIixcclxuICAgZG9jdG9yc0FwcG9pbnRtZW50c0xpc3RVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvbGlzdEFwcG9pbnRtZW50XCIsXHJcbiAgIG5ld1NjaGVkdWxlVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL25ld1NjaGVkdWxlXCIsXHJcbiAgIGxpc3RTY2hlZHVsZVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9zY2hlZHVsZUxpc3RcIixcclxuICAgZ2V0U2NoZWR1bGVDYWxlbmRhclVybDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL1NjaGVkdWxlQ2FsZW5kZXJWaWV3XCIsXHJcbiAgIGFkZFN0YWZmVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3N0YWZmRW50cnlcIixcclxuICAgZG9jdG9yc1N0YWZmTGlzdGluZ1VyIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3N0YWZmTGlzdGluZ1wiLFxyXG4gICBwYXRpZW50c0hpc3RvcnlVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvcGF0aWVudEhpc3RvcnlcIixcclxuICAgY3JlYXRlUHJvZ3JhbUZvclBhdGllbnRVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvY3JlYXRlTWVkaWNhbFByb2dyYW1cIixcclxuICAgcHJvZ3JhbW1lTGlzdGluZ3NVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvcHJvZ3JhbW1lTGlzdFwiLFxyXG4gICBNYW5hZ2VMb2NhdGlvbnNVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvd29ya0xvY2F0aW9uTWFuYWdlbWVudFwiLFxyXG4gICBnZXRBbmFseXRpY3NVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvQW5hbHl0aWNzUmVwb3J0XCIsXHJcbiAgIGdldENhbGVuZGVyVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2NhbGVuZGFyVGVtcGxhdGVcIixcclxuICAgYWNjb3VudGluZ1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9hY2NvdW50aW5nXCIsXHJcbiAgIG1lZGljaW5lU2VhcmNoVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL21lZGljaW5lU2VhcmNoXCIsXHJcblxyXG5cclxuICAgLy9zY2hlZHVsZVxyXG4gICBnZXRMb2NhdGlvblVybDogXCJpbmRleC5waHAvbG9jYXRpb25zL2dldERvY3RvckxvY2F0aW9uc1wiLFxyXG4gICBjcmVhdGVVcGRhdGVTY2hlZHVsZVVybDogXCJpbmRleC5waHAvc2NoZWR1bGUvY3JlYXRlVXBkYXRlU2NoZWR1bGVcIixcclxuICAgZ2V0U2VjaGR1bGVDYWxlbmRhckRldGFpbHNVcmw6IFwiaW5kZXgucGhwL3NjaGVkdWxlL2dldENhbGFuZGVyRGV0YWlsc1wiLFxyXG5cclxuICAgLy9wcm9ncmFtbWVcclxuICAgcHJvZ3JhbW1lTGlzdFVybDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0TWVkaWNhdGlvblByb2dyYW1tZUxpc3RcIixcclxuICAgcHJvZ3JhbW1lRWRpdFVybDpcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvY3JlYXRlTWVkaWNhbFByb2dyYW1cIixcclxuICAgY3JlYXRlTW9kaWZ5UHJvZ3JhbW1lVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9jcmVhdGVNb2RpZnlQcm9ncmFtbWVcIixcclxuICAgZ2V0UHJvZ3JhbW1lVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRQcm9ncmFtbWVzXCIsXHJcblxyXG5cclxuICAgLy9wYXRpZW50XHJcbiAgIHBhdGllbnREZXRhaWxQZXJzaXN0VXJsOlwiaW5kZXgucGhwL3BhdGllbnQvYWRkVXBkYXRlUGF0aWVudFwiLFxyXG4gICBwYXRpZW50c0RldGFpbHNVcmw6XCJpbmRleC5waHAvcGF0aWVudC9nZXRQYXRpZW50RGV0YWlsc1wiLFxyXG4gICBsb2dpbkNoZWNrVXJsOlwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9pc0xvZ2dlZEluXCIsXHJcbiAgIGdldFByb2dyYW1tZUxpc3Q6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldE1lZGljYXRpb25Qcm9ncmFtbWVMaXN0XCIsXHJcbiAgIHByb2dyYW1tZUxpc3REZXRhaWxzVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRQcm9ncmFtbWVMaXN0RGV0YWlsc1wiLFxyXG4gICBwYXRpZW50c1Byb2dyYW1tZXNVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldFBhdGllbnRQcm9ncmFtbWVzXCIsXHJcbiAgIHBhdGllbnRMaXN0aW5nVXJsOlwiaW5kZXgucGhwL3BhdGllbnQvZ2V0UGF0aWVudExpc3RcIixcclxuXHJcbiAgIHNhdmVVcGRhdGVMb2NhdGlvbnM6XCJpbmRleC5waHAvbG9jYXRpb25zL2FkZFVwZGF0ZUxvY2F0aW9uXCIsXHJcbiAgIGxvY2F0aW9uTGlzdFVybDpcImluZGV4LnBocC9sb2NhdGlvbnMvZ2V0RG9jdG9yTG9jYXRpb25zXCIsXHJcbiAgIGRlbGl2ZXJ5TWV0aG9kc1VybDpcImluZGV4LnBocC9wYXRpZW50L2dldERlbGl2ZXJ5TWV0aG9kc1wiLFxyXG5cclxuXHJcbiAgIC8vcmVnaXN0YXJ0aW9uXHJcbiAgIGRvY3RvclVybDpcImluZGV4LnBocC9kb2N0b3Ivc2F2ZVVwZGF0ZURvY3RvclwiLFxyXG4gICBkb2N0b3JEZXRhaWxzVXJsOlwiaW5kZXgucGhwL2RvY3Rvci9nZXREb2N0b3JEZXRhaWxzXCIsXHJcbiAgIGxvZ2luQ2hlY2tVcmw6XCJpbmRleC5waHAvYXV0aGVudGljYXRlL2lzTG9nZ2VkSW5cIixcclxuICAgZG9jdG9yRGFzaFVybDpcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvXCIsXHJcbiAgIGxvZ291dFVybDpcImluZGV4LnBocC9hdXRoZW50aWNhdGUvbG9nb3V0XCIsXHJcblxyXG4gICBjcmVhdGVNb2RpZnlTdGFmZlVybDpcImluZGV4LnBocC9zdGFmZi9jcmVhdGVNb2RpZnlTdGFmZlwiLFxyXG4gICBnZXRTdGFmZkRldGFpbHNVcmw6IFwiaW5kZXgucGhwL3N0YWZmL2dldFN0YWZmRGV0YWlsc1wiLFxyXG4gICBzdGFmZkxpc3RpbmdVcmw6IFwiaW5kZXgucGhwL3N0YWZmL2dldERvY3RvcnNTdGFmZkxpc3RcIlxyXG5cclxufVxyXG4iLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gIGNvbnNvbGUubG9nKCdsb2dpbiBjb21wb25lbnQnKTtcclxuXHJcbiAgdmFyIGNvbnRyb2xsZXIgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dpblZpZXcuaW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgIGF1dGhlbnRpY2F0ZVVybDogbGlua3MuYXV0aGVudGljYXRlVXJsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc1JlZGlyZWN0VXJsOiBsaW5rcy5zdWNjZXNzUmVkaXJlY3RVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgICByZWdpc3RlckRvY3RvclVybDogbGlua3MucmVnaXN0ZXJEb2N0b3JVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgICBhZG1pblVybDogbGlua3MuYWRtaW5VcmxcclxuICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgdmFyIGxvZ2luVmlldyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd2aWV3IGluaXQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9naW5JZCA9ICAkKCcjbG9naW4taWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXNzd29yZCA9ICAkKCcjbG9naW4tcGFzc3dvcmQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb250cm9scyA9IHtsb2dpbklkOiB0aGlzLmxvZ2luSWQsIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkfTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3dpcmluZyBldmVudHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2xvZ2luLXN1Ym1pdCcpLm9uKCdjbGljaycsIChmdW5jdGlvbihjb250cm9scyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnaGFuZGxlciBhZGRlZCA6ICcgKyBjYXQuSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnaGFuZGxlciBleGVjIDogJyArIGNhdC5JZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2xpY2sgc3VibWl0JyArIGNvbnRyb2xzLmxvZ2luSWQudmFsKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndXJsOiAnICsgY29udHJvbGxlci5hdXRoZW50aWNhdGVVcmwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQucG9zdCggY29udHJvbGxlci5hdXRoZW50aWNhdGVVcmwgLCB7IGxvZ2luSWQ6ICBjb250cm9scy5sb2dpbklkLnZhbCgpLCBwYXNzd29yZDogIGNvbnRyb2xzLnBhc3N3b3JkLnZhbCgpIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24oIHJlc3BvbnNlICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3BvbnNlICcgKyBKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3BvbnNlLmRhdGEudHlwZSA9PSBcIi0xXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaW52YWxpZCB1c2VybmFtZSBvciBwYXNzd29yZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYocmVzcG9uc2UuZGF0YS50eXBlID09IFwiQVwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2F1dGhlbnRpY2F0ZWQgYXMgYWRtaW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmFkbWluVXJsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYocmVzcG9uc2UuZGF0YS50eXBlID09IFwiRFwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2F1dGhlbnRpY2F0ZWQgYXMgZG9jdG9yJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5zdWNjZXNzUmVkaXJlY3RVcmw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KShjb250cm9scykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2J0bi1yZWdpc3Rlci1kb2N0b3InKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZWdpc3RlciBjbGljayByZWRpcmVjdCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5yZWdpc3RlckRvY3RvclVybDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gJC5wb3N0KCBjb250cm9sbGVyLmF1dGhlbnRpY2F0ZVVybCAsIHsgbG9naW5JZDogdGhpcy5sb2dpbklkLnZhbCgpLCBwYXNzd29yZDogdGhpcy5wYXNzd29yZC52YWwoKSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgLmRvbmUoZnVuY3Rpb24oIGRhdGEgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGNvbnNvbGUubG9nKCdkYXRhICcgKyBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICBjb250cm9sbGVyLmluaXQoKTtcclxuXHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
