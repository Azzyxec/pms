var links = {

  //login js urls
   authenticateUrl : "index.php/authenticate/authenitcateUser",
   successRedirectUrl : "index.php/doctorDashboard/",
   registerDoctorUrl : "index.php/doctorInfo",
   adminUrl:"index.php/adminDashboard/admin",

   //admin related
   doctorListingUrl: "index.php/adminDashboard/doctorListing",

   logoutUrl : "index.php/authenticate/logout",

   //doctor dashboard links
   doctorProfile : "index.php/doctorProfile",
   dashboardHomeUrl : "index.php/doctorDashboard/",
   newAppointmentUrl : "index.php/doctorDashboard/bookAppointment",
   patientsEntryUrl : "index.php/doctorDashboard/patientsEntry",
   patientsListingUrl : "index.php/doctorDashboard/patientsListing",
   closeAppointmentUrl : "index.php/doctorDashboard/closeAppointment",
   doctorsAppointmentsListUrl : "index.php/doctorDashboard/listAppointment",
   newScheduleUrl : "index.php/doctorDashboard/newSchedule",
   listScheduleUrl : "index.php/doctorDashboard/scheduleList",
   addStaffUrl : "index.php/doctorDashboard/staffEntry",
   patientsHistoryUrl : "index.php/doctorDashboard/patientHistory",
   createProgramForPatientUrl : "index.php/doctorDashboard/createMedicalProgram",
   programmeListingsUrl : "index.php/doctorDashboard/programmeList",
   ManageLocationsUrl : "index.php/doctorDashboard/workLocationManagement",

   //schedule
   getLocationUrl: "index.php/locations/getDoctorLocations",
   createUpdateScheduleUrl: "index.php/schedule/createUpdateSchedule",

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
   locationListUrl:"index.php/locations/getDoctorLocations"


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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpbmtzLmpzIiwibG9naW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImxvZ2luLmFsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBsaW5rcyA9IHtcclxuXHJcbiAgLy9sb2dpbiBqcyB1cmxzXHJcbiAgIGF1dGhlbnRpY2F0ZVVybCA6IFwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9hdXRoZW5pdGNhdGVVc2VyXCIsXHJcbiAgIHN1Y2Nlc3NSZWRpcmVjdFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9cIixcclxuICAgcmVnaXN0ZXJEb2N0b3JVcmwgOiBcImluZGV4LnBocC9kb2N0b3JJbmZvXCIsXHJcbiAgIGFkbWluVXJsOlwiaW5kZXgucGhwL2FkbWluRGFzaGJvYXJkL2FkbWluXCIsXHJcblxyXG4gICAvL2FkbWluIHJlbGF0ZWRcclxuICAgZG9jdG9yTGlzdGluZ1VybDogXCJpbmRleC5waHAvYWRtaW5EYXNoYm9hcmQvZG9jdG9yTGlzdGluZ1wiLFxyXG5cclxuICAgbG9nb3V0VXJsIDogXCJpbmRleC5waHAvYXV0aGVudGljYXRlL2xvZ291dFwiLFxyXG5cclxuICAgLy9kb2N0b3IgZGFzaGJvYXJkIGxpbmtzXHJcbiAgIGRvY3RvclByb2ZpbGUgOiBcImluZGV4LnBocC9kb2N0b3JQcm9maWxlXCIsXHJcbiAgIGRhc2hib2FyZEhvbWVVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvXCIsXHJcbiAgIG5ld0FwcG9pbnRtZW50VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2Jvb2tBcHBvaW50bWVudFwiLFxyXG4gICBwYXRpZW50c0VudHJ5VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3BhdGllbnRzRW50cnlcIixcclxuICAgcGF0aWVudHNMaXN0aW5nVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3BhdGllbnRzTGlzdGluZ1wiLFxyXG4gICBjbG9zZUFwcG9pbnRtZW50VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2Nsb3NlQXBwb2ludG1lbnRcIixcclxuICAgZG9jdG9yc0FwcG9pbnRtZW50c0xpc3RVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvbGlzdEFwcG9pbnRtZW50XCIsXHJcbiAgIG5ld1NjaGVkdWxlVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL25ld1NjaGVkdWxlXCIsXHJcbiAgIGxpc3RTY2hlZHVsZVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9zY2hlZHVsZUxpc3RcIixcclxuICAgYWRkU3RhZmZVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvc3RhZmZFbnRyeVwiLFxyXG4gICBwYXRpZW50c0hpc3RvcnlVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvcGF0aWVudEhpc3RvcnlcIixcclxuICAgY3JlYXRlUHJvZ3JhbUZvclBhdGllbnRVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvY3JlYXRlTWVkaWNhbFByb2dyYW1cIixcclxuICAgcHJvZ3JhbW1lTGlzdGluZ3NVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvcHJvZ3JhbW1lTGlzdFwiLFxyXG4gICBNYW5hZ2VMb2NhdGlvbnNVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvd29ya0xvY2F0aW9uTWFuYWdlbWVudFwiLFxyXG5cclxuICAgLy9zY2hlZHVsZVxyXG4gICBnZXRMb2NhdGlvblVybDogXCJpbmRleC5waHAvbG9jYXRpb25zL2dldERvY3RvckxvY2F0aW9uc1wiLFxyXG4gICBjcmVhdGVVcGRhdGVTY2hlZHVsZVVybDogXCJpbmRleC5waHAvc2NoZWR1bGUvY3JlYXRlVXBkYXRlU2NoZWR1bGVcIixcclxuXHJcbiAgIC8vcHJvZ3JhbW1lXHJcbiAgIHByb2dyYW1tZUxpc3RVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldE1lZGljYXRpb25Qcm9ncmFtbWVMaXN0XCIsXHJcbiAgIHByb2dyYW1tZUVkaXRVcmw6XCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2NyZWF0ZU1lZGljYWxQcm9ncmFtXCIsXHJcbiAgIGNyZWF0ZU1vZGlmeVByb2dyYW1tZVVybDpcImluZGV4LnBocC9wcm9ncmFtbWUvY3JlYXRlTW9kaWZ5UHJvZ3JhbW1lXCIsXHJcbiAgIGdldFByb2dyYW1tZVVybDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0UHJvZ3JhbW1lc1wiLFxyXG5cclxuXHJcbiAgIC8vcGF0aWVudFxyXG4gICBwYXRpZW50RGV0YWlsUGVyc2lzdFVybDpcImluZGV4LnBocC9wYXRpZW50L2FkZFVwZGF0ZVBhdGllbnRcIixcclxuICAgcGF0aWVudHNEZXRhaWxzVXJsOlwiaW5kZXgucGhwL3BhdGllbnQvZ2V0UGF0aWVudERldGFpbHNcIixcclxuICAgbG9naW5DaGVja1VybDpcImluZGV4LnBocC9hdXRoZW50aWNhdGUvaXNMb2dnZWRJblwiLFxyXG4gICBnZXRQcm9ncmFtbWVMaXN0OlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRNZWRpY2F0aW9uUHJvZ3JhbW1lTGlzdFwiLFxyXG4gICBwcm9ncmFtbWVMaXN0RGV0YWlsc1VybDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0UHJvZ3JhbW1lTGlzdERldGFpbHNcIixcclxuICAgcGF0aWVudHNQcm9ncmFtbWVzVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRQYXRpZW50UHJvZ3JhbW1lc1wiLFxyXG4gICBwYXRpZW50TGlzdGluZ1VybDpcImluZGV4LnBocC9wYXRpZW50L2dldFBhdGllbnRMaXN0XCIsXHJcblxyXG4gICBzYXZlVXBkYXRlTG9jYXRpb25zOlwiaW5kZXgucGhwL2xvY2F0aW9ucy9hZGRVcGRhdGVMb2NhdGlvblwiLFxyXG4gICBsb2NhdGlvbkxpc3RVcmw6XCJpbmRleC5waHAvbG9jYXRpb25zL2dldERvY3RvckxvY2F0aW9uc1wiXHJcblxyXG5cclxufVxyXG4iLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gIGNvbnNvbGUubG9nKCdsb2dpbiBjb21wb25lbnQnKTtcclxuXHJcbiAgdmFyIGNvbnRyb2xsZXIgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dpblZpZXcuaW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgIGF1dGhlbnRpY2F0ZVVybDogbGlua3MuYXV0aGVudGljYXRlVXJsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc1JlZGlyZWN0VXJsOiBsaW5rcy5zdWNjZXNzUmVkaXJlY3RVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgICByZWdpc3RlckRvY3RvclVybDogbGlua3MucmVnaXN0ZXJEb2N0b3JVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgICBhZG1pblVybDogbGlua3MuYWRtaW5VcmxcclxuICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgdmFyIGxvZ2luVmlldyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd2aWV3IGluaXQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9naW5JZCA9ICAkKCcjbG9naW4taWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXNzd29yZCA9ICAkKCcjbG9naW4tcGFzc3dvcmQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb250cm9scyA9IHtsb2dpbklkOiB0aGlzLmxvZ2luSWQsIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkfTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3dpcmluZyBldmVudHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2xvZ2luLXN1Ym1pdCcpLm9uKCdjbGljaycsIChmdW5jdGlvbihjb250cm9scyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnaGFuZGxlciBhZGRlZCA6ICcgKyBjYXQuSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnaGFuZGxlciBleGVjIDogJyArIGNhdC5JZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2xpY2sgc3VibWl0JyArIGNvbnRyb2xzLmxvZ2luSWQudmFsKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndXJsOiAnICsgY29udHJvbGxlci5hdXRoZW50aWNhdGVVcmwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQucG9zdCggY29udHJvbGxlci5hdXRoZW50aWNhdGVVcmwgLCB7IGxvZ2luSWQ6ICBjb250cm9scy5sb2dpbklkLnZhbCgpLCBwYXNzd29yZDogIGNvbnRyb2xzLnBhc3N3b3JkLnZhbCgpIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24oIHJlc3BvbnNlICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3BvbnNlICcgKyBKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3BvbnNlLmRhdGEudHlwZSA9PSBcIi0xXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaW52YWxpZCB1c2VybmFtZSBvciBwYXNzd29yZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYocmVzcG9uc2UuZGF0YS50eXBlID09IFwiQVwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2F1dGhlbnRpY2F0ZWQgYXMgYWRtaW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmFkbWluVXJsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYocmVzcG9uc2UuZGF0YS50eXBlID09IFwiRFwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2F1dGhlbnRpY2F0ZWQgYXMgZG9jdG9yJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5zdWNjZXNzUmVkaXJlY3RVcmw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KShjb250cm9scykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2J0bi1yZWdpc3Rlci1kb2N0b3InKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZWdpc3RlciBjbGljayByZWRpcmVjdCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5yZWdpc3RlckRvY3RvclVybDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gJC5wb3N0KCBjb250cm9sbGVyLmF1dGhlbnRpY2F0ZVVybCAsIHsgbG9naW5JZDogdGhpcy5sb2dpbklkLnZhbCgpLCBwYXNzd29yZDogdGhpcy5wYXNzd29yZC52YWwoKSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgLmRvbmUoZnVuY3Rpb24oIGRhdGEgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGNvbnNvbGUubG9nKCdkYXRhICcgKyBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICBjb250cm9sbGVyLmluaXQoKTtcclxuXHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
