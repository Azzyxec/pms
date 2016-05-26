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
   getAnalyticsUrl : "index.php/doctorDashboard/AnalyticsReport",
   getCalenderUrl : "index.php/doctorDashboard/calendarTemplate",
   accountingUrl : "index.php/doctorDashboard/accounting",
   medicineSearchUrl : "index.php/doctorDashboard/medicineSearch",


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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpbmtzLmpzIiwiYWRtaW5EYXNoYm9hcmQuanMiLCJhZG1pbi5kb2N0b3IubGlzdGluZ3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFkbWluLmRvY3Rvci5saXN0aW5ncy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBsaW5rcyA9IHtcclxuXHJcbiAgLy9sb2dpbiBqcyB1cmxzXHJcbiAgIGF1dGhlbnRpY2F0ZVVybCA6IFwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9hdXRoZW5pdGNhdGVVc2VyXCIsXHJcbiAgIHN1Y2Nlc3NSZWRpcmVjdFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9cIixcclxuICAgcmVnaXN0ZXJEb2N0b3JVcmwgOiBcImluZGV4LnBocC9kb2N0b3IvZG9jdG9ySW5mb1wiLFxyXG4gICBhZG1pblVybDpcImluZGV4LnBocC9hZG1pbkRhc2hib2FyZC9hZG1pblwiLFxyXG5cclxuICAgLy9hZG1pbiByZWxhdGVkXHJcbiAgIGRvY3Rvckxpc3RpbmdVcmw6IFwiaW5kZXgucGhwL2FkbWluRGFzaGJvYXJkL2RvY3Rvckxpc3RpbmdcIixcclxuXHJcbiAgIGxvZ291dFVybCA6IFwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9sb2dvdXRcIixcclxuXHJcbiAgIC8vZG9jdG9yIGRhc2hib2FyZCBsaW5rc1xyXG4gICBkb2N0b3JQcm9maWxlIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2RvY3RvclByb2ZpbGVcIixcclxuICAgZGFzaGJvYXJkSG9tZVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9cIixcclxuICAgbmV3QXBwb2ludG1lbnRVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvYm9va0FwcG9pbnRtZW50XCIsXHJcbiAgIHBhdGllbnRzRW50cnlVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvcGF0aWVudHNFbnRyeVwiLFxyXG4gICBwYXRpZW50c0xpc3RpbmdVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvcGF0aWVudHNMaXN0aW5nXCIsXHJcbiAgIGNsb3NlQXBwb2ludG1lbnRVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvY2xvc2VBcHBvaW50bWVudFwiLFxyXG4gICBkb2N0b3JzQXBwb2ludG1lbnRzTGlzdFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9saXN0QXBwb2ludG1lbnRcIixcclxuICAgbmV3U2NoZWR1bGVVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvbmV3U2NoZWR1bGVcIixcclxuICAgbGlzdFNjaGVkdWxlVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3NjaGVkdWxlTGlzdFwiLFxyXG4gICBhZGRTdGFmZlVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9zdGFmZkVudHJ5XCIsXHJcbiAgIGRvY3RvcnNTdGFmZkxpc3RpbmdVciA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9zdGFmZkxpc3RpbmdcIixcclxuICAgcGF0aWVudHNIaXN0b3J5VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3BhdGllbnRIaXN0b3J5XCIsXHJcbiAgIGNyZWF0ZVByb2dyYW1Gb3JQYXRpZW50VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2NyZWF0ZU1lZGljYWxQcm9ncmFtXCIsXHJcbiAgIHByb2dyYW1tZUxpc3RpbmdzVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3Byb2dyYW1tZUxpc3RcIixcclxuICAgTWFuYWdlTG9jYXRpb25zVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3dvcmtMb2NhdGlvbk1hbmFnZW1lbnRcIixcclxuICAgZ2V0QW5hbHl0aWNzVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL0FuYWx5dGljc1JlcG9ydFwiLFxyXG4gICBnZXRDYWxlbmRlclVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jYWxlbmRhclRlbXBsYXRlXCIsXHJcbiAgIGFjY291bnRpbmdVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvYWNjb3VudGluZ1wiLFxyXG4gICBtZWRpY2luZVNlYXJjaFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9tZWRpY2luZVNlYXJjaFwiLFxyXG5cclxuXHJcbiAgIC8vc2NoZWR1bGVcclxuICAgZ2V0TG9jYXRpb25Vcmw6IFwiaW5kZXgucGhwL2xvY2F0aW9ucy9nZXREb2N0b3JMb2NhdGlvbnNcIixcclxuICAgY3JlYXRlVXBkYXRlU2NoZWR1bGVVcmw6IFwiaW5kZXgucGhwL3NjaGVkdWxlL2NyZWF0ZVVwZGF0ZVNjaGVkdWxlXCIsXHJcbiAgIGdldFNjaGVkdWxlQ2FsZW5kYXJVcmw6IFwiaW5kZXgucGhwL3NjaGVkdWxlL1NjaGVkdWxlQ2FsZW5kZXJWaWV3XCIsXHJcblxyXG4gICAvL3Byb2dyYW1tZVxyXG4gICBwcm9ncmFtbWVMaXN0VXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRNZWRpY2F0aW9uUHJvZ3JhbW1lTGlzdFwiLFxyXG4gICBwcm9ncmFtbWVFZGl0VXJsOlwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jcmVhdGVNZWRpY2FsUHJvZ3JhbVwiLFxyXG4gICBjcmVhdGVNb2RpZnlQcm9ncmFtbWVVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2NyZWF0ZU1vZGlmeVByb2dyYW1tZVwiLFxyXG4gICBnZXRQcm9ncmFtbWVVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldFByb2dyYW1tZXNcIixcclxuXHJcblxyXG4gICAvL3BhdGllbnRcclxuICAgcGF0aWVudERldGFpbFBlcnNpc3RVcmw6XCJpbmRleC5waHAvcGF0aWVudC9hZGRVcGRhdGVQYXRpZW50XCIsXHJcbiAgIHBhdGllbnRzRGV0YWlsc1VybDpcImluZGV4LnBocC9wYXRpZW50L2dldFBhdGllbnREZXRhaWxzXCIsXHJcbiAgIGxvZ2luQ2hlY2tVcmw6XCJpbmRleC5waHAvYXV0aGVudGljYXRlL2lzTG9nZ2VkSW5cIixcclxuICAgZ2V0UHJvZ3JhbW1lTGlzdDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0TWVkaWNhdGlvblByb2dyYW1tZUxpc3RcIixcclxuICAgcHJvZ3JhbW1lTGlzdERldGFpbHNVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldFByb2dyYW1tZUxpc3REZXRhaWxzXCIsXHJcbiAgIHBhdGllbnRzUHJvZ3JhbW1lc1VybDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0UGF0aWVudFByb2dyYW1tZXNcIixcclxuICAgcGF0aWVudExpc3RpbmdVcmw6XCJpbmRleC5waHAvcGF0aWVudC9nZXRQYXRpZW50TGlzdFwiLFxyXG5cclxuICAgc2F2ZVVwZGF0ZUxvY2F0aW9uczpcImluZGV4LnBocC9sb2NhdGlvbnMvYWRkVXBkYXRlTG9jYXRpb25cIixcclxuICAgbG9jYXRpb25MaXN0VXJsOlwiaW5kZXgucGhwL2xvY2F0aW9ucy9nZXREb2N0b3JMb2NhdGlvbnNcIixcclxuICAgZGVsaXZlcnlNZXRob2RzVXJsOlwiaW5kZXgucGhwL3BhdGllbnQvZ2V0RGVsaXZlcnlNZXRob2RzXCIsXHJcblxyXG5cclxuICAgLy9yZWdpc3RhcnRpb25cclxuICAgZG9jdG9yVXJsOlwiaW5kZXgucGhwL2RvY3Rvci9zYXZlVXBkYXRlRG9jdG9yXCIsXHJcbiAgIGRvY3RvckRldGFpbHNVcmw6XCJpbmRleC5waHAvZG9jdG9yL2dldERvY3RvckRldGFpbHNcIixcclxuICAgbG9naW5DaGVja1VybDpcImluZGV4LnBocC9hdXRoZW50aWNhdGUvaXNMb2dnZWRJblwiLFxyXG4gICBkb2N0b3JEYXNoVXJsOlwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9cIixcclxuICAgbG9nb3V0VXJsOlwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9sb2dvdXRcIixcclxuXHJcbiAgIGNyZWF0ZU1vZGlmeVN0YWZmVXJsOlwiaW5kZXgucGhwL3N0YWZmL2NyZWF0ZU1vZGlmeVN0YWZmXCIsXHJcbiAgIGdldFN0YWZmRGV0YWlsc1VybDogXCJpbmRleC5waHAvc3RhZmYvZ2V0U3RhZmZEZXRhaWxzXCIsXHJcbiAgIHN0YWZmTGlzdGluZ1VybDogXCJpbmRleC5waHAvc3RhZmYvZ2V0RG9jdG9yc1N0YWZmTGlzdFwiXHJcblxyXG59XHJcbiIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgJChmdW5jdGlvbigpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBZG1pbiBEYXNoYm9hcmQganMgbG9hZGVkJyk7XHJcblxyXG5cclxuICAgICAgICAvL3RvcCBsZXZlbCBjb250cm9sbGVyXHJcbiAgICB2YXIgY29udHJvbGxlciA9IHtcclxuICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICAvL3dpcmluZyB0aGUgbmF2aWdhdGlvblxyXG4gICAgICAgIHRoaXMubG9nb3V0VXJsID0gbGlua3MubG9nb3V0VXJsO1xyXG4gICAgICAgIHRoaXMuRG9jdG9yTGlzdGluZ1VybCA9IGxpbmtzLmRvY3Rvckxpc3RpbmdVcmw7XHJcblxyXG4gICAgICAgIC8vZG8gc29tZXRobmcgYWJvdXQgZG9jdG9ycyBpbmZvIGFuZCByZWdpc3RyYXRpb25cclxuXHJcbiAgICAgICAgLy9UaGUgdXJsIGZyb20gdGhlIGJyb3dzZXIgIGNhbiBiZSBjb21wYXJlZCB0byBzZXQgdGhlIGFjdGl2ZSBuYXZpZ2F0aW9uXHJcbiAgICAgICAgbmF2Vmlldy5pbml0KCk7XHJcblxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgICB2YXIgbmF2VmlldyA9IHtcclxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgICAgLy93aXJpbmcgdGhlIG5hdmlnYXRpb24gY2xpY2tzXHJcbiAgICAgICAgICAgICAgJChcIiNwbXMtYnJhbmQtYnRuLWxpbmtcIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1BNUyBicmFuZCBjbGljaycpO1xyXG5cclxuICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgJChcIiNhZG1pbi1kYXNoLWxvZ291dC1idG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbG9nb3V0IGNsaWNrJyk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIubG9nb3V0VXJsO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAkKFwiI2J0bi1tYW5hZ2UtZG9jdG9yc1wiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtYW5hZ2UgZG9jdG9ycyBjbGljaycpO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAkKFwiI2J0bi1kb2N0b3ItbGlzdGluZ3NcIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZG9jdG9ycyBsaXN0aW5nIGNsaWNrJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuRG9jdG9yTGlzdGluZ1VybDtcclxuICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgY29udHJvbGxlci5pbml0KCk7XHJcblxyXG4gICAgfSgpKTtcclxuXHJcbn0pO1xyXG4iLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG5cclxuICAgICQoZnVuY3Rpb24oKXtcclxuICAgICAgICBjb25zb2xlLmxvZygnYWRtaW4gIERvY3RvciBsaXN0aW5nIGpzIGxvYWRlZCAnKTtcclxuXHJcbiAgICAgICAgdmFyIGxpc3RNb2RlbCA9IHt9O1xyXG5cclxuICAgICAgICB2YXIgY29udHJvbGxlciA9IHtcclxuICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMuZG9jdG9yTGlzdGluZ1VybCA9IFwiaW5kZXgucGhwL2FkbWluL2dldEFsbERvY3RvcnNcIjtcclxuICAgICAgICAgICAgdGhpcy5hZG1pbkRvY3RvckVkaXRSZWRpcmVjdCA9IFwiaW5kZXgucGhwL2FkbWluL2FkbWluRG9jdG9yRWRpdFwiO1xyXG5cclxuICAgICAgICAgICAgbGlzdFZpZXcuaW5pdCgpO1xyXG5cclxuICAgICAgICAgICAgLy9nZXR0aW5nIHRoZSBwcm9ncmFtbWUgbGlzdCBmb3IgdGhlIGRvY3RvclxyXG4gICAgICAgICAgICAkLmdldChjb250cm9sbGVyLmRvY3Rvckxpc3RpbmdVcmwgLCAge30pXHJcbiAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uKCByZXNwb25zZSApIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInBhdGllbnRzIGxpc3Q6IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcclxuICAgICAgICAgICAgICBsaXN0TW9kZWwgPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgICAgIGxpc3RWaWV3LnJlbmRlcigpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZ2V0TGlzdE1vZGVsOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdE1vZGVsO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBsaXN0VmlldyA9IHtcclxuICAgICAgICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhYmxlYm9keSA9ICQoJyNkb2N0b3ItbGlzdC10YWJsZS1ib2R5Jyk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgcmVuZGVyOiAgZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRvY3RvcnNMaXN0ID0gY29udHJvbGxlci5nZXRMaXN0TW9kZWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdtb2RlbCBpbiB2aWV3JyArIEpTT04uc3RyaW5naWZ5IChkb2N0b3JzTGlzdCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZG9jdG9yc0xpc3QubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnbG9vcGluZyAnICsgIEpTT04uc3RyaW5naWZ5IChkb2N0b3JzTGlzdFtpXSkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgIHZhciB0ciA9ICQoJzx0ci8+Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHRkID0gJCgnPHRkLz4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgIHRkLnRleHQoZG9jdG9yc0xpc3RbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0ci5hcHBlbmQodGQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZCA9ICQoJzx0ZC8+Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0ZC50ZXh0KGRvY3RvcnNMaXN0W2ldLmNvbnRhY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdHIuYXBwZW5kKHRkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgdGQgPSAkKCc8dGQvPicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGQudGV4dChkb2N0b3JzTGlzdFtpXS5lbWFpbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0ci5hcHBlbmQodGQpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgdGQgPSAkKCc8dGQvPicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGQudGV4dChkb2N0b3JzTGlzdFtpXS5xdWFsaWZpY2F0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0ci5hcHBlbmQodGQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZCA9ICQoJzx0ZC8+Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0ZC50ZXh0KCBkb2N0b3JzTGlzdFtpXS5pc0FjdGl2ZT09MT8nQWN0aXZlJzonTm90IEFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdHIuYXBwZW5kKHRkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgdGQgPSAkKCc8YS8+Jyx7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdFZGl0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHJlZjogY29udHJvbGxlci5hZG1pbkRvY3RvckVkaXRSZWRpcmVjdCArICc/aWQ9JyArICBkb2N0b3JzTGlzdFtpXS5pZFxyXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0ci5hcHBlbmQodGQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGFibGVib2R5LmFwcGVuZCh0cik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlci5pbml0KCk7XHJcblxyXG5cclxuICAgIH0oKSk7XHJcblxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
