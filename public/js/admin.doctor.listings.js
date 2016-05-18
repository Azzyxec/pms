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

    $(function(){
        console.log('Admin Dashboard js loaded');


        //top level controller
    var controller = {
      init: function(){
        //wiring the navigation
        this.logoutUrl = links.logoutUrl;
        this.DoctorListingUrl = links.doctorListingUrl;

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

              $("#admin-dash-logout-btn").click(function(e){
                e.preventDefault();
                console.log('logout click');
                window.location.href = controller.logoutUrl;
              });

              $("#btn-manage-doctors").click(function(e){
                      e.preventDefault();
                      console.log('manage doctors click');
              });

              $("#btn-doctor-listings").click(function(e){
                      e.preventDefault();
                      console.log('doctors listing click');
                      window.location.href = controller.DoctorListingUrl;
              });

            }
          }

        controller.init();

    }());

});

$(document).ready(function(){

    $(function(){
        console.log('admin  Doctor listing js loaded ');

        var listModel = {};

        var controller = {
          init: function(){
            this.doctorListingUrl = "index.php/admin/getAllDoctors";
            this.adminDoctorEditRedirect = "index.php/admin/adminDoctorEdit";

            listView.init();

            //getting the programme list for the doctor
            $.get(controller.doctorListingUrl ,  {})
            .done(function( response ) {
              console.log("patients list: " + JSON.stringify(response));
              listModel = response.data;
              listView.render();
            });

          },
          getListModel: function(){
            return listModel;
          }
        };


                var listView = {
                  init: function(){
                    this.tablebody = $('#doctor-list-table-body');


                  },
                  render:  function(){

                    var doctorsList = controller.getListModel();
                    //console.log('model in view' + JSON.stringify (doctorsList));

                    for(var i = 0; i < doctorsList.length; i++){
                      //console.log('looping ' +  JSON.stringify (doctorsList[i]));

                      var tr = $('<tr/>');

                      var td = $('<td/>');
                      td.text(doctorsList[i].name);
                      tr.append(td);

                      var td = $('<td/>');
                      td.text(doctorsList[i].contact);
                      tr.append(td);

                      var td = $('<td/>');
                      td.text(doctorsList[i].email);
                      tr.append(td);


                      var td = $('<td/>');
                      td.text(doctorsList[i].qualifications);
                      tr.append(td);

                      var td = $('<td/>');
                      td.text( doctorsList[i].isActive==1?'Active':'Not Active');
                      tr.append(td);

                      var td = $('<a/>',{
                        text: 'Edit',
                        href: controller.adminDoctorEditRedirect + '?id=' +  doctorsList[i].id
                      });
                      tr.append(td);

                      this.tablebody.append(tr);
                    }

                  }
                };


                controller.init();


    }());

});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpbmtzLmpzIiwiYWRtaW5EYXNoYm9hcmQuanMiLCJhZG1pbi5kb2N0b3IubGlzdGluZ3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhZG1pbi5kb2N0b3IubGlzdGluZ3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgbGlua3MgPSB7XHJcblxyXG4gIC8vbG9naW4ganMgdXJsc1xyXG4gICBhdXRoZW50aWNhdGVVcmwgOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvYXV0aGVuaXRjYXRlVXNlclwiLFxyXG4gICBzdWNjZXNzUmVkaXJlY3RVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvXCIsXHJcbiAgIHJlZ2lzdGVyRG9jdG9yVXJsIDogXCJpbmRleC5waHAvZG9jdG9ySW5mb1wiLFxyXG4gICBhZG1pblVybDpcImluZGV4LnBocC9hZG1pbkRhc2hib2FyZC9hZG1pblwiLFxyXG5cclxuICAgLy9hZG1pbiByZWxhdGVkXHJcbiAgIGRvY3Rvckxpc3RpbmdVcmw6IFwiaW5kZXgucGhwL2FkbWluRGFzaGJvYXJkL2RvY3Rvckxpc3RpbmdcIixcclxuXHJcbiAgIGxvZ291dFVybCA6IFwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9sb2dvdXRcIixcclxuXHJcbiAgIC8vZG9jdG9yIGRhc2hib2FyZCBsaW5rc1xyXG4gICBkb2N0b3JQcm9maWxlIDogXCJpbmRleC5waHAvZG9jdG9yUHJvZmlsZVwiLFxyXG4gICBkYXNoYm9hcmRIb21lVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL1wiLFxyXG4gICBuZXdBcHBvaW50bWVudFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9ib29rQXBwb2ludG1lbnRcIixcclxuICAgcGF0aWVudHNFbnRyeVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wYXRpZW50c0VudHJ5XCIsXHJcbiAgIHBhdGllbnRzTGlzdGluZ1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wYXRpZW50c0xpc3RpbmdcIixcclxuICAgY2xvc2VBcHBvaW50bWVudFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jbG9zZUFwcG9pbnRtZW50XCIsXHJcbiAgIGRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2xpc3RBcHBvaW50bWVudFwiLFxyXG4gICBuZXdTY2hlZHVsZVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9uZXdTY2hlZHVsZVwiLFxyXG4gICBsaXN0U2NoZWR1bGVVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvc2NoZWR1bGVMaXN0XCIsXHJcbiAgIGFkZFN0YWZmVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3N0YWZmRW50cnlcIixcclxuICAgcGF0aWVudHNIaXN0b3J5VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3BhdGllbnRIaXN0b3J5XCIsXHJcbiAgIGNyZWF0ZVByb2dyYW1Gb3JQYXRpZW50VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2NyZWF0ZU1lZGljYWxQcm9ncmFtXCIsXHJcbiAgIHByb2dyYW1tZUxpc3RpbmdzVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3Byb2dyYW1tZUxpc3RcIixcclxuICAgTWFuYWdlTG9jYXRpb25zVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3dvcmtMb2NhdGlvbk1hbmFnZW1lbnRcIixcclxuXHJcbiAgIC8vc2NoZWR1bGVcclxuICAgZ2V0TG9jYXRpb25Vcmw6IFwiaW5kZXgucGhwL2xvY2F0aW9ucy9nZXREb2N0b3JMb2NhdGlvbnNcIixcclxuICAgY3JlYXRlVXBkYXRlU2NoZWR1bGVVcmw6IFwiaW5kZXgucGhwL3NjaGVkdWxlL2NyZWF0ZVVwZGF0ZVNjaGVkdWxlXCIsXHJcblxyXG4gICAvL3Byb2dyYW1tZVxyXG4gICBwcm9ncmFtbWVMaXN0VXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRNZWRpY2F0aW9uUHJvZ3JhbW1lTGlzdFwiLFxyXG4gICBwcm9ncmFtbWVFZGl0VXJsOlwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jcmVhdGVNZWRpY2FsUHJvZ3JhbVwiLFxyXG4gICBjcmVhdGVNb2RpZnlQcm9ncmFtbWVVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2NyZWF0ZU1vZGlmeVByb2dyYW1tZVwiLFxyXG4gICBnZXRQcm9ncmFtbWVVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldFByb2dyYW1tZXNcIixcclxuXHJcblxyXG4gICAvL3BhdGllbnRcclxuICAgcGF0aWVudERldGFpbFBlcnNpc3RVcmw6XCJpbmRleC5waHAvcGF0aWVudC9hZGRVcGRhdGVQYXRpZW50XCIsXHJcbiAgIHBhdGllbnRzRGV0YWlsc1VybDpcImluZGV4LnBocC9wYXRpZW50L2dldFBhdGllbnREZXRhaWxzXCIsXHJcbiAgIGxvZ2luQ2hlY2tVcmw6XCJpbmRleC5waHAvYXV0aGVudGljYXRlL2lzTG9nZ2VkSW5cIixcclxuICAgZ2V0UHJvZ3JhbW1lTGlzdDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0TWVkaWNhdGlvblByb2dyYW1tZUxpc3RcIixcclxuICAgcHJvZ3JhbW1lTGlzdERldGFpbHNVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldFByb2dyYW1tZUxpc3REZXRhaWxzXCIsXHJcbiAgIHBhdGllbnRzUHJvZ3JhbW1lc1VybDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0UGF0aWVudFByb2dyYW1tZXNcIixcclxuICAgcGF0aWVudExpc3RpbmdVcmw6XCJpbmRleC5waHAvcGF0aWVudC9nZXRQYXRpZW50TGlzdFwiLFxyXG5cclxuICAgc2F2ZVVwZGF0ZUxvY2F0aW9uczpcImluZGV4LnBocC9sb2NhdGlvbnMvYWRkVXBkYXRlTG9jYXRpb25cIixcclxuICAgbG9jYXRpb25MaXN0VXJsOlwiaW5kZXgucGhwL2xvY2F0aW9ucy9nZXREb2N0b3JMb2NhdGlvbnNcIlxyXG5cclxuXHJcbn1cclxuIiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuXHJcbiAgICAkKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0FkbWluIERhc2hib2FyZCBqcyBsb2FkZWQnKTtcclxuXHJcblxyXG4gICAgICAgIC8vdG9wIGxldmVsIGNvbnRyb2xsZXJcclxuICAgIHZhciBjb250cm9sbGVyID0ge1xyXG4gICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vd2lyaW5nIHRoZSBuYXZpZ2F0aW9uXHJcbiAgICAgICAgdGhpcy5sb2dvdXRVcmwgPSBsaW5rcy5sb2dvdXRVcmw7XHJcbiAgICAgICAgdGhpcy5Eb2N0b3JMaXN0aW5nVXJsID0gbGlua3MuZG9jdG9yTGlzdGluZ1VybDtcclxuXHJcbiAgICAgICAgLy9kbyBzb21ldGhuZyBhYm91dCBkb2N0b3JzIGluZm8gYW5kIHJlZ2lzdHJhdGlvblxyXG5cclxuICAgICAgICAvL1RoZSB1cmwgZnJvbSB0aGUgYnJvd3NlciAgY2FuIGJlIGNvbXBhcmVkIHRvIHNldCB0aGUgYWN0aXZlIG5hdmlnYXRpb25cclxuICAgICAgICBuYXZWaWV3LmluaXQoKTtcclxuXHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgICAgICAgIHZhciBuYXZWaWV3ID0ge1xyXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgICAvL3dpcmluZyB0aGUgbmF2aWdhdGlvbiBjbGlja3NcclxuICAgICAgICAgICAgICAkKFwiI3Btcy1icmFuZC1idG4tbGlua1wiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUE1TIGJyYW5kIGNsaWNrJyk7XHJcblxyXG4gICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAkKFwiI2FkbWluLWRhc2gtbG9nb3V0LWJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsb2dvdXQgY2xpY2snKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5sb2dvdXRVcmw7XHJcbiAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICQoXCIjYnRuLW1hbmFnZS1kb2N0b3JzXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ21hbmFnZSBkb2N0b3JzIGNsaWNrJyk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICQoXCIjYnRuLWRvY3Rvci1saXN0aW5nc1wiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkb2N0b3JzIGxpc3RpbmcgY2xpY2snKTtcclxuICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5Eb2N0b3JMaXN0aW5nVXJsO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICBjb250cm9sbGVyLmluaXQoKTtcclxuXHJcbiAgICB9KCkpO1xyXG5cclxufSk7XHJcbiIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgJChmdW5jdGlvbigpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdhZG1pbiAgRG9jdG9yIGxpc3RpbmcganMgbG9hZGVkICcpO1xyXG5cclxuICAgICAgICB2YXIgbGlzdE1vZGVsID0ge307XHJcblxyXG4gICAgICAgIHZhciBjb250cm9sbGVyID0ge1xyXG4gICAgICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5kb2N0b3JMaXN0aW5nVXJsID0gXCJpbmRleC5waHAvYWRtaW4vZ2V0QWxsRG9jdG9yc1wiO1xyXG4gICAgICAgICAgICB0aGlzLmFkbWluRG9jdG9yRWRpdFJlZGlyZWN0ID0gXCJpbmRleC5waHAvYWRtaW4vYWRtaW5Eb2N0b3JFZGl0XCI7XHJcblxyXG4gICAgICAgICAgICBsaXN0Vmlldy5pbml0KCk7XHJcblxyXG4gICAgICAgICAgICAvL2dldHRpbmcgdGhlIHByb2dyYW1tZSBsaXN0IGZvciB0aGUgZG9jdG9yXHJcbiAgICAgICAgICAgICQuZ2V0KGNvbnRyb2xsZXIuZG9jdG9yTGlzdGluZ1VybCAsICB7fSlcclxuICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24oIHJlc3BvbnNlICkge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGF0aWVudHMgbGlzdDogXCIgKyBKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xyXG4gICAgICAgICAgICAgIGxpc3RNb2RlbCA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICAgICAgbGlzdFZpZXcucmVuZGVyKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBnZXRMaXN0TW9kZWw6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0TW9kZWw7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGxpc3RWaWV3ID0ge1xyXG4gICAgICAgICAgICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFibGVib2R5ID0gJCgnI2RvY3Rvci1saXN0LXRhYmxlLWJvZHknKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICByZW5kZXI6ICBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgZG9jdG9yc0xpc3QgPSBjb250cm9sbGVyLmdldExpc3RNb2RlbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ21vZGVsIGluIHZpZXcnICsgSlNPTi5zdHJpbmdpZnkgKGRvY3RvcnNMaXN0KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBkb2N0b3JzTGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdsb29waW5nICcgKyAgSlNPTi5zdHJpbmdpZnkgKGRvY3RvcnNMaXN0W2ldKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHRyID0gJCgnPHRyLz4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgdGQgPSAkKCc8dGQvPicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGQudGV4dChkb2N0b3JzTGlzdFtpXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgIHRyLmFwcGVuZCh0ZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHRkID0gJCgnPHRkLz4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgIHRkLnRleHQoZG9jdG9yc0xpc3RbaV0uY29udGFjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0ci5hcHBlbmQodGQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZCA9ICQoJzx0ZC8+Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0ZC50ZXh0KGRvY3RvcnNMaXN0W2ldLmVtYWlsKTtcclxuICAgICAgICAgICAgICAgICAgICAgIHRyLmFwcGVuZCh0ZCk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZCA9ICQoJzx0ZC8+Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0ZC50ZXh0KGRvY3RvcnNMaXN0W2ldLnF1YWxpZmljYXRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICAgIHRyLmFwcGVuZCh0ZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHRkID0gJCgnPHRkLz4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgIHRkLnRleHQoIGRvY3RvcnNMaXN0W2ldLmlzQWN0aXZlPT0xPydBY3RpdmUnOidOb3QgQWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0ci5hcHBlbmQodGQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZCA9ICQoJzxhLz4nLHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0VkaXQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBocmVmOiBjb250cm9sbGVyLmFkbWluRG9jdG9yRWRpdFJlZGlyZWN0ICsgJz9pZD0nICsgIGRvY3RvcnNMaXN0W2ldLmlkXHJcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgIHRyLmFwcGVuZCh0ZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy50YWJsZWJvZHkuYXBwZW5kKHRyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyLmluaXQoKTtcclxuXHJcblxyXG4gICAgfSgpKTtcclxuXHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
