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
        console.log('Manage Locations  js loaded');

        var model = {
                      loc:{id:0, name:""},
                      list:[]
                    };

        var controller = {
          init: function(){
            this.saveUpdateLocations = links.saveUpdateLocations;
            this.locationListUrl = links.locationListUrl;

            LocationView.init();
            locationListView.init();
            this.updateLocationFromServer();
          },
          persistLocationModel: function(){

            console.log('persist' + JSON.stringify(model.loc));

            $.post(controller.saveUpdateLocations , model.loc)
             .done(function( response ) {
               console.log('save response ' + JSON.stringify(response));
               controller.updateLocationFromServer();
             });

          },
          getLocationList: function(){
            return model.list;
          },
          getLocationModel: function(){
            return model.loc;
          },
          updateLocationFromServer: function(){
            $.get(controller.locationListUrl , {})
             .done(function( response ) {
               console.log('save response ' + JSON.stringify(response));
               model.list = response.data;
               locationListView.render();
             });
          },
          updateModel: function(id, name){
            model.loc.id = id;
            model.loc.name = name;
            LocationView.render();
          }
        };


        var LocationView = {
          init: function(){
            this.locationName = $('#txt-location-name');

            $('#btn-add-location').click(function(){
              console.log('save click');

              var locName = LocationView.locationName.val();

              var locationModel = controller.getLocationModel();
              locationModel.name =  locName;

              console.log(JSON.stringify(model.loc));
              LocationView.locationName.val('');
              controller.persistLocationModel();

            });

          },
          render: function(){
            var locationModel = controller.getLocationModel();
            this.locationName.val(locationModel.name);
          }
        };

        var locationListView = {
          init: function(){
            this.tableBody = $('#location-list-table-body');

          },
          render:function(){

            var locations = controller.getLocationList();

            this.tableBody.empty();

            console.log('render' + JSON.stringify(locations));

            for(var i = 0; i < locations.length; i++){
              //console.log('looping ' +  JSON.stringify (patientsList[i]));

              var tr = $('<tr/>');

              var td = $('<td/>');
              td.text(locations[i].name);
              tr.append(td);

              var td = $('<a/>',{
                text: 'Edit',
              });

              td.click((function(location){
                return function(){
                  console.log('edit click ' + JSON.stringify(location));
                  controller.updateModel(location.id, location.name);
                }
              })(locations[i]));

              tr.append(td);


              this.tableBody.append(tr);
            }

          }
        };


        controller.init();

    }());

});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxpdHkuanMiLCJsaW5rcy5qcyIsImRvY3RvckRhc2hib2FyZC5qcyIsIm1hbmFnZS5sb2NhdGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNySEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1hbmFnZS5sb2NhdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL2hlbHBlciBmdW5jdGlvbiB0byBnZXQgdGhlIHVybCBxdWVyeSBwYXJhbWV0ZXJzXHJcbnZhciB1dGlsaXR5ID0ge1xyXG4gIGdldFVSTFBhcmFtOiBmdW5jdGlvbihuYW1lKXtcclxuICAgIHZhciB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuXHJcbiAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC9bXFxbXFxdXS9nLCBcIlxcXFwkJlwiKTtcclxuXHJcbiAgICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKFwiWz8mXVwiICsgbmFtZSArIFwiKD0oW14mI10qKXwmfCN8JClcIik7XHJcbiAgICB2YXIgcmVzdWx0cyA9IHJlZ2V4LmV4ZWModXJsKTtcclxuXHJcbiAgICBpZiAoIXJlc3VsdHMpIHJldHVybiBudWxsO1xyXG4gICAgaWYgKCFyZXN1bHRzWzJdKSByZXR1cm4gJyc7XHJcblxyXG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHRzWzJdLnJlcGxhY2UoL1xcKy9nLCBcIiBcIikpO1xyXG4gIH0sXHJcbiAgZ2V0VGltZU1pbnV0ZXNBcnJheTogIGZ1bmN0aW9uKCl7XHJcblxyXG4gIH1cclxufVxyXG4iLCJ2YXIgbGlua3MgPSB7XHJcblxyXG4gIC8vbG9naW4ganMgdXJsc1xyXG4gICBhdXRoZW50aWNhdGVVcmwgOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvYXV0aGVuaXRjYXRlVXNlclwiLFxyXG4gICBzdWNjZXNzUmVkaXJlY3RVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvXCIsXHJcbiAgIHJlZ2lzdGVyRG9jdG9yVXJsIDogXCJpbmRleC5waHAvZG9jdG9yL2RvY3RvckluZm9cIixcclxuICAgYWRtaW5Vcmw6XCJpbmRleC5waHAvYWRtaW5EYXNoYm9hcmQvYWRtaW5cIixcclxuXHJcbiAgIC8vYWRtaW4gcmVsYXRlZFxyXG4gICBkb2N0b3JMaXN0aW5nVXJsOiBcImluZGV4LnBocC9hZG1pbkRhc2hib2FyZC9kb2N0b3JMaXN0aW5nXCIsXHJcblxyXG4gICBsb2dvdXRVcmwgOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvbG9nb3V0XCIsXHJcblxyXG4gICAvL2RvY3RvciBkYXNoYm9hcmQgbGlua3NcclxuICAgZG9jdG9yUHJvZmlsZSA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9kb2N0b3JQcm9maWxlXCIsXHJcbiAgIGRhc2hib2FyZEhvbWVVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvXCIsXHJcbiAgIG5ld0FwcG9pbnRtZW50VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2Jvb2tBcHBvaW50bWVudFwiLFxyXG4gICBwYXRpZW50c0VudHJ5VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3BhdGllbnRzRW50cnlcIixcclxuICAgcGF0aWVudHNMaXN0aW5nVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3BhdGllbnRzTGlzdGluZ1wiLFxyXG4gICBjbG9zZUFwcG9pbnRtZW50VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2Nsb3NlQXBwb2ludG1lbnRcIixcclxuICAgZG9jdG9yc0FwcG9pbnRtZW50c0xpc3RVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvbGlzdEFwcG9pbnRtZW50XCIsXHJcbiAgIG5ld1NjaGVkdWxlVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL25ld1NjaGVkdWxlXCIsXHJcbiAgIGxpc3RTY2hlZHVsZVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9zY2hlZHVsZUxpc3RcIixcclxuICAgZ2V0U2NoZWR1bGVDYWxlbmRhclVybDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL1NjaGVkdWxlQ2FsZW5kZXJWaWV3XCIsXHJcbiAgIGFkZFN0YWZmVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3N0YWZmRW50cnlcIixcclxuICAgZG9jdG9yc1N0YWZmTGlzdGluZ1VyIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3N0YWZmTGlzdGluZ1wiLFxyXG4gICBwYXRpZW50c0hpc3RvcnlVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvcGF0aWVudEhpc3RvcnlcIixcclxuICAgY3JlYXRlUHJvZ3JhbUZvclBhdGllbnRVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvY3JlYXRlTWVkaWNhbFByb2dyYW1cIixcclxuICAgcHJvZ3JhbW1lTGlzdGluZ3NVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvcHJvZ3JhbW1lTGlzdFwiLFxyXG4gICBNYW5hZ2VMb2NhdGlvbnNVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvd29ya0xvY2F0aW9uTWFuYWdlbWVudFwiLFxyXG4gICBnZXRBbmFseXRpY3NVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvQW5hbHl0aWNzUmVwb3J0XCIsXHJcbiAgIGdldENhbGVuZGVyVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2NhbGVuZGFyVGVtcGxhdGVcIixcclxuICAgYWNjb3VudGluZ1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9hY2NvdW50aW5nXCIsXHJcbiAgIG1lZGljaW5lU2VhcmNoVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL21lZGljaW5lU2VhcmNoXCIsXHJcblxyXG5cclxuICAgLy9zY2hlZHVsZVxyXG4gICBnZXRMb2NhdGlvblVybDogXCJpbmRleC5waHAvbG9jYXRpb25zL2dldERvY3RvckxvY2F0aW9uc1wiLFxyXG4gICBjcmVhdGVVcGRhdGVTY2hlZHVsZVVybDogXCJpbmRleC5waHAvc2NoZWR1bGUvY3JlYXRlVXBkYXRlU2NoZWR1bGVcIixcclxuICAgZ2V0U2VjaGR1bGVDYWxlbmRhckRldGFpbHNVcmw6IFwiaW5kZXgucGhwL3NjaGVkdWxlL2dldENhbGFuZGVyRGV0YWlsc1wiLFxyXG5cclxuICAgLy9wcm9ncmFtbWVcclxuICAgcHJvZ3JhbW1lTGlzdFVybDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0TWVkaWNhdGlvblByb2dyYW1tZUxpc3RcIixcclxuICAgcHJvZ3JhbW1lRWRpdFVybDpcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvY3JlYXRlTWVkaWNhbFByb2dyYW1cIixcclxuICAgY3JlYXRlTW9kaWZ5UHJvZ3JhbW1lVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9jcmVhdGVNb2RpZnlQcm9ncmFtbWVcIixcclxuICAgZ2V0UHJvZ3JhbW1lVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRQcm9ncmFtbWVzXCIsXHJcblxyXG5cclxuICAgLy9wYXRpZW50XHJcbiAgIHBhdGllbnREZXRhaWxQZXJzaXN0VXJsOlwiaW5kZXgucGhwL3BhdGllbnQvYWRkVXBkYXRlUGF0aWVudFwiLFxyXG4gICBwYXRpZW50c0RldGFpbHNVcmw6XCJpbmRleC5waHAvcGF0aWVudC9nZXRQYXRpZW50RGV0YWlsc1wiLFxyXG4gICBsb2dpbkNoZWNrVXJsOlwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9pc0xvZ2dlZEluXCIsXHJcbiAgIGdldFByb2dyYW1tZUxpc3Q6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldE1lZGljYXRpb25Qcm9ncmFtbWVMaXN0XCIsXHJcbiAgIHByb2dyYW1tZUxpc3REZXRhaWxzVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRQcm9ncmFtbWVMaXN0RGV0YWlsc1wiLFxyXG4gICBwYXRpZW50c1Byb2dyYW1tZXNVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldFBhdGllbnRQcm9ncmFtbWVzXCIsXHJcbiAgIHBhdGllbnRMaXN0aW5nVXJsOlwiaW5kZXgucGhwL3BhdGllbnQvZ2V0UGF0aWVudExpc3RcIixcclxuXHJcbiAgIHNhdmVVcGRhdGVMb2NhdGlvbnM6XCJpbmRleC5waHAvbG9jYXRpb25zL2FkZFVwZGF0ZUxvY2F0aW9uXCIsXHJcbiAgIGxvY2F0aW9uTGlzdFVybDpcImluZGV4LnBocC9sb2NhdGlvbnMvZ2V0RG9jdG9yTG9jYXRpb25zXCIsXHJcbiAgIGRlbGl2ZXJ5TWV0aG9kc1VybDpcImluZGV4LnBocC9wYXRpZW50L2dldERlbGl2ZXJ5TWV0aG9kc1wiLFxyXG5cclxuXHJcbiAgIC8vcmVnaXN0YXJ0aW9uXHJcbiAgIGRvY3RvclVybDpcImluZGV4LnBocC9kb2N0b3Ivc2F2ZVVwZGF0ZURvY3RvclwiLFxyXG4gICBkb2N0b3JEZXRhaWxzVXJsOlwiaW5kZXgucGhwL2RvY3Rvci9nZXREb2N0b3JEZXRhaWxzXCIsXHJcbiAgIGxvZ2luQ2hlY2tVcmw6XCJpbmRleC5waHAvYXV0aGVudGljYXRlL2lzTG9nZ2VkSW5cIixcclxuICAgZG9jdG9yRGFzaFVybDpcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvXCIsXHJcbiAgIGxvZ291dFVybDpcImluZGV4LnBocC9hdXRoZW50aWNhdGUvbG9nb3V0XCIsXHJcblxyXG4gICBjcmVhdGVNb2RpZnlTdGFmZlVybDpcImluZGV4LnBocC9zdGFmZi9jcmVhdGVNb2RpZnlTdGFmZlwiLFxyXG4gICBnZXRTdGFmZkRldGFpbHNVcmw6IFwiaW5kZXgucGhwL3N0YWZmL2dldFN0YWZmRGV0YWlsc1wiLFxyXG4gICBzdGFmZkxpc3RpbmdVcmw6IFwiaW5kZXgucGhwL3N0YWZmL2dldERvY3RvcnNTdGFmZkxpc3RcIlxyXG5cclxufVxyXG4iLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG5cclxuICAvL2RlZmluaW5nIHRoZSBoZWxwZXIgZnVuY3Rpb25zIGluIGdsb2JhbFxyXG5cclxuICAkKGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgY29uc29sZS5sb2coJ0RvY3RvciBEYXNoYm9hcmQganMgbG9hZGVkJyk7XHJcblxyXG4gICAgLy90b3AgbGV2ZWwgY29udHJvbGxlclxyXG4gICAgdmFyIGNvbnRyb2xsZXIgPSB7XHJcbiAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy93aXJpbmcgdGhlIG5hdmlnYXRpb25cclxuICAgICAgICB0aGlzLmxvZ291dFVybCA9IGxpbmtzLmxvZ291dFVybDtcclxuICAgICAgICB0aGlzLmRvY3RvclByb2ZpbGUgPSBsaW5rcy5kb2N0b3JQcm9maWxlO1xyXG4gICAgICAgIHRoaXMuZGFzaGJvYXJkSG9tZVVybCA9IGxpbmtzLmRhc2hib2FyZEhvbWVVcmw7XHJcbiAgICAgICAgdGhpcy5uZXdBcHBvaW50bWVudFVybCA9IGxpbmtzLm5ld0FwcG9pbnRtZW50VXJsO1xyXG4gICAgICAgIHRoaXMucGF0aWVudHNFbnRyeVVybCA9IGxpbmtzLnBhdGllbnRzRW50cnlVcmw7XHJcbiAgICAgICAgdGhpcy5wYXRpZW50c0xpc3RpbmdVcmwgPSBsaW5rcy5wYXRpZW50c0xpc3RpbmdVcmw7XHJcbiAgICAgICAgdGhpcy5jbG9zZUFwcG9pbnRtZW50VXJsID0gbGlua3MuY2xvc2VBcHBvaW50bWVudFVybDtcclxuICAgICAgICB0aGlzLmRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsID0gbGlua3MuZG9jdG9yc0FwcG9pbnRtZW50c0xpc3RVcmw7XHJcblxyXG4gICAgICAgIHRoaXMubmV3U2NoZWR1bGVVcmwgPSBsaW5rcy5uZXdTY2hlZHVsZVVybDtcclxuICAgICAgICB0aGlzLmxpc3RTY2hlZHVsZVVybCA9IHRoaXMubGlzdFNjaGVkdWxlVXJsO1xyXG4gICAgICAgIHRoaXMuU2NoZWR1bGVDYWxlbmRhclVybCA9IGxpbmtzLmdldFNjaGVkdWxlQ2FsZW5kYXJVcmw7XHJcbiAgICAgICAgdGhpcy5hZGRTdGFmZlVybCA9IGxpbmtzLmFkZFN0YWZmVXJsO1xyXG4gICAgICAgIHRoaXMuZG9jdG9yc1N0YWZmTGlzdGluZ1VyID0gbGlua3MuZG9jdG9yc1N0YWZmTGlzdGluZ1VyO1xyXG5cclxuICAgICAgICB0aGlzLnBhdGllbnRzSGlzdG9yeVVybCA9IGxpbmtzLnBhdGllbnRzSGlzdG9yeVVybDtcclxuXHJcbiAgICAgICAgdGhpcy5jcmVhdGVQcm9ncmFtRm9yUGF0aWVudFVybCA9IGxpbmtzLmNyZWF0ZVByb2dyYW1Gb3JQYXRpZW50VXJsIDtcclxuICAgICAgICB0aGlzLnByb2dyYW1tZUxpc3RpbmdzVXJsID0gbGlua3MucHJvZ3JhbW1lTGlzdGluZ3NVcmw7XHJcblxyXG4gICAgICAgIHRoaXMuTWFuYWdlTG9jYXRpb25zVXJsID0gbGlua3MuTWFuYWdlTG9jYXRpb25zVXJsO1xyXG4gICAgICAgIHRoaXMuQ2FsZW5kYXJUZW1wbGF0ZVVybCA9IGxpbmtzLmdldENhbGVuZGVyVXJsO1xyXG5cclxuICAgICAgICB0aGlzLmFuYWx5dGljc1JlcG9ydFVybCA9IGxpbmtzLmdldEFuYWx5dGljc1VybDtcclxuICAgICAgICB0aGlzLmFjY291bnRpbmdVcmwgPSBsaW5rcy5hY2NvdW50aW5nVXJsO1xyXG4gICAgICAgIHRoaXMubWVkaWNpbmVTZWFyY2hVcmwgPSBsaW5rcy5tZWRpY2luZVNlYXJjaFVybDtcclxuICAgICAgICAvL2RvIHNvbWV0aG5nIGFib3V0IGRvY3RvcnMgaW5mbyBhbmQgcmVnaXN0cmF0aW9uXHJcblxyXG4gICAgICAgIC8vVGhlIHVybCBmcm9tIHRoZSBicm93c2VyICBjYW4gYmUgY29tcGFyZWQgdG8gc2V0IHRoZSBhY3RpdmUgbmF2aWdhdGlvblxyXG4gICAgICAgIG5hdlZpZXcuaW5pdCgpO1xyXG5cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgbmF2VmlldyA9IHtcclxuICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgLy93aXJpbmcgdGhlIG5hdmlnYXRpb24gY2xpY2tzXHJcblxyXG5cclxuICAgICAgICAkKFwiI3Btcy1icmFuZC1idG4tbGlua1wiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdQTVMgYnJhbmQgY2xpY2snKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAkKFwiI3VzZXItUHJvZmlsZS1CdG4tTGlua1wiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5kb2N0b3JQcm9maWxlKTtcclxuXHJcbiAgICAgICAgJChcIiNkb2N0b3ItZGFzaC1sb2dvdXQtYnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmxvZ291dFVybCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgJChcIiNkYXNoYm9hcmQtU2VjdGlvbi1CdG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIuZGFzaGJvYXJkSG9tZVVybCk7XHJcblxyXG4gICAgICAgICQoXCIjYXBwb2ludG1lbnQtc2VjdGlvbi1saW5rLWJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5kb2N0b3JzQXBwb2ludG1lbnRzTGlzdFVybCk7XHJcblxyXG4gICAgICAgICQoXCIjbWFuYWdlLURvY3RvcnMtU2NoZWR1bGUtU2VjdGlvbi1MaW5rLUJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5TY2hlZHVsZUNhbGVuZGFyVXJsKTtcclxuXHJcbiAgICAgICAgJChcIiNidG4tcHJvZ3JhbW1lLXNlY3Rpb24tbGlua1wiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5wcm9ncmFtbWVMaXN0aW5nc1VybCk7XHJcblxyXG4gICAgICAgICQoXCIjY3JlYXRlLXByb2dyYW0tZm9yLXBhdGllbnQtc2VjdGlvblwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5jcmVhdGVQcm9ncmFtRm9yUGF0aWVudFVybCk7XHJcblxyXG4gICAgICAgICQoXCIjcGF0aWVudHMtRW50cnktU2VjdGlvbi1MaW5rLUJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5wYXRpZW50c0xpc3RpbmdVcmwpO1xyXG5cclxuICAgICAgICAvLyQoXCIjcGF0aWVudHMtZW50cnktY3JlYXRlLXNlY3Rpb24tbGluay1CdG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIucGF0aWVudHNFbnRyeVVybCk7XHJcbiAgICAgICAgLy8kKFwiI3BhdGllbnRzLUhpc3RvcnktU2VjdGlvbi1MaW5rLUJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5wYXRpZW50c0hpc3RvcnlVcmwpO1xyXG5cclxuICAgICAgICAkKFwiI3N0YWZmLW1hbmFnbWVudC1zZWN0aW9uLWxpbmstYnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmRvY3RvcnNTdGFmZkxpc3RpbmdVcik7XHJcblxyXG4gICAgICAgICQoXCIjYnRuLW1hbmFnZS1sb2NhdGlvbnNcIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIuTWFuYWdlTG9jYXRpb25zVXJsKTtcclxuXHJcbiAgICAgICAgJChcIiNhbmFseXRpY3Mtc2lkZS1uYXZpZ2F0aW9uLWxpbmstYnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmFuYWx5dGljc1JlcG9ydFVybCk7XHJcbiAgICAgICAgJChcIiNhY2NvdW50aW5nLXNpZGUtbmF2aWdhdGlvbi1saW5rLWJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5hY2NvdW50aW5nVXJsKTtcclxuICAgICAgICAkKFwiI21lZGljaW5lLXNpZGUtbmF2aWdhdGlvbi1saW5rLWJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5tZWRpY2luZVNlYXJjaFVybCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8kKFwiI2Jvb2stQXBwb2ludG1lbnRzLVNlY3Rpb24tQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLm5ld0FwcG9pbnRtZW50VXJsKTtcclxuICAgICAgICAvLyQoXCIjY2xvc2UtQm9vay1BcHBvaW50bWVudC1TZWN0aW9uLUxpbmstQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmNsb3NlQXBwb2ludG1lbnRVcmwpO1xyXG4gICAgICAgIC8vJChcIiN2aWV3LUFwcG9pbnRtZW50LVNlY3Rpb24tTGluay1CdG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIuZG9jdG9yc0FwcG9pbnRtZW50c0xpc3RVcmwpO1xyXG4gICAgICAgIC8vJChcIiNtYW5hZ2UtRG9jdG9ycy1TY2hlZHVsZS1TZWN0aW9uLUxpbmstQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmxpc3RTY2hlZHVsZVVybCk7XHJcbiAgICAgICAgLy8kKFwiI21hbmFnZS1zY2hlZHVsZS1jcmVhdGUtc2VjdGlvbi1saW5rLUJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5uZXdTY2hlZHVsZVVybCk7XHJcbiAgICAgICAgLy8kKFwiI2NhbGVuZGFyLVRlbXBsYXRlLUJ0bi1MaW5rXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLkNhbGVuZGFyVGVtcGxhdGVVcmwpO1xyXG4gICAgICAgIC8vJChcIiNtYW5hZ2Utc2NoZWR1bGUtbGlzdC1zZWN0aW9uLWxpbmstQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLlNjaGVkdWxlQ2FsZW5kYXJVcmwpO1xyXG5cclxuICAgICAgICAkKFwiI290aGVyLXNldHRpbmdzLXNlY3Rpb24tbGluay1idG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChcIiNjYWxlbmRhci10ZW1wbGF0ZS1zZWN0aW9uLWxpbmstYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgIH0sXHJcbiAgICAgIHJlbmRlcjogZnVuY3Rpb24oKXtcclxuICAgICAgICAvL2hpZ2hsaWdodCB0aGUgcmlnaHQgbmF2aWdhdGlvblxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29udHJvbGxlci5pbml0KCk7XHJcblxyXG4gIH0oKSk7XHJcblxyXG59KTtcclxuIiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuXHJcbiAgICAkKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ01hbmFnZSBMb2NhdGlvbnMgIGpzIGxvYWRlZCcpO1xyXG5cclxuICAgICAgICB2YXIgbW9kZWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBsb2M6e2lkOjAsIG5hbWU6XCJcIn0sXHJcbiAgICAgICAgICAgICAgICAgICAgICBsaXN0OltdXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSB7XHJcbiAgICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVVcGRhdGVMb2NhdGlvbnMgPSBsaW5rcy5zYXZlVXBkYXRlTG9jYXRpb25zO1xyXG4gICAgICAgICAgICB0aGlzLmxvY2F0aW9uTGlzdFVybCA9IGxpbmtzLmxvY2F0aW9uTGlzdFVybDtcclxuXHJcbiAgICAgICAgICAgIExvY2F0aW9uVmlldy5pbml0KCk7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uTGlzdFZpZXcuaW5pdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUxvY2F0aW9uRnJvbVNlcnZlcigpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHBlcnNpc3RMb2NhdGlvbk1vZGVsOiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3BlcnNpc3QnICsgSlNPTi5zdHJpbmdpZnkobW9kZWwubG9jKSk7XHJcblxyXG4gICAgICAgICAgICAkLnBvc3QoY29udHJvbGxlci5zYXZlVXBkYXRlTG9jYXRpb25zICwgbW9kZWwubG9jKVxyXG4gICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24oIHJlc3BvbnNlICkge1xyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2F2ZSByZXNwb25zZSAnICsgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcclxuICAgICAgICAgICAgICAgY29udHJvbGxlci51cGRhdGVMb2NhdGlvbkZyb21TZXJ2ZXIoKTtcclxuICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBnZXRMb2NhdGlvbkxpc3Q6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiBtb2RlbC5saXN0O1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGdldExvY2F0aW9uTW9kZWw6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiBtb2RlbC5sb2M7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgdXBkYXRlTG9jYXRpb25Gcm9tU2VydmVyOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkLmdldChjb250cm9sbGVyLmxvY2F0aW9uTGlzdFVybCAsIHt9KVxyXG4gICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24oIHJlc3BvbnNlICkge1xyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2F2ZSByZXNwb25zZSAnICsgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcclxuICAgICAgICAgICAgICAgbW9kZWwubGlzdCA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICAgICAgIGxvY2F0aW9uTGlzdFZpZXcucmVuZGVyKCk7XHJcbiAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB1cGRhdGVNb2RlbDogZnVuY3Rpb24oaWQsIG5hbWUpe1xyXG4gICAgICAgICAgICBtb2RlbC5sb2MuaWQgPSBpZDtcclxuICAgICAgICAgICAgbW9kZWwubG9jLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgICAgICBMb2NhdGlvblZpZXcucmVuZGVyKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIHZhciBMb2NhdGlvblZpZXcgPSB7XHJcbiAgICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLmxvY2F0aW9uTmFtZSA9ICQoJyN0eHQtbG9jYXRpb24tbmFtZScpO1xyXG5cclxuICAgICAgICAgICAgJCgnI2J0bi1hZGQtbG9jYXRpb24nKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzYXZlIGNsaWNrJyk7XHJcblxyXG4gICAgICAgICAgICAgIHZhciBsb2NOYW1lID0gTG9jYXRpb25WaWV3LmxvY2F0aW9uTmFtZS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgdmFyIGxvY2F0aW9uTW9kZWwgPSBjb250cm9sbGVyLmdldExvY2F0aW9uTW9kZWwoKTtcclxuICAgICAgICAgICAgICBsb2NhdGlvbk1vZGVsLm5hbWUgPSAgbG9jTmFtZTtcclxuXHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkobW9kZWwubG9jKSk7XHJcbiAgICAgICAgICAgICAgTG9jYXRpb25WaWV3LmxvY2F0aW9uTmFtZS52YWwoJycpO1xyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIucGVyc2lzdExvY2F0aW9uTW9kZWwoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciBsb2NhdGlvbk1vZGVsID0gY29udHJvbGxlci5nZXRMb2NhdGlvbk1vZGVsKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9jYXRpb25OYW1lLnZhbChsb2NhdGlvbk1vZGVsLm5hbWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciBsb2NhdGlvbkxpc3RWaWV3ID0ge1xyXG4gICAgICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy50YWJsZUJvZHkgPSAkKCcjbG9jYXRpb24tbGlzdC10YWJsZS1ib2R5Jyk7XHJcblxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHJlbmRlcjpmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgdmFyIGxvY2F0aW9ucyA9IGNvbnRyb2xsZXIuZ2V0TG9jYXRpb25MaXN0KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRhYmxlQm9keS5lbXB0eSgpO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlbmRlcicgKyBKU09OLnN0cmluZ2lmeShsb2NhdGlvbnMpKTtcclxuXHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsb2NhdGlvbnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2xvb3BpbmcgJyArICBKU09OLnN0cmluZ2lmeSAocGF0aWVudHNMaXN0W2ldKSk7XHJcblxyXG4gICAgICAgICAgICAgIHZhciB0ciA9ICQoJzx0ci8+Jyk7XHJcblxyXG4gICAgICAgICAgICAgIHZhciB0ZCA9ICQoJzx0ZC8+Jyk7XHJcbiAgICAgICAgICAgICAgdGQudGV4dChsb2NhdGlvbnNbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgdHIuYXBwZW5kKHRkKTtcclxuXHJcbiAgICAgICAgICAgICAgdmFyIHRkID0gJCgnPGEvPicse1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJ0VkaXQnLFxyXG4gICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICB0ZC5jbGljaygoZnVuY3Rpb24obG9jYXRpb24pe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlZGl0IGNsaWNrICcgKyBKU09OLnN0cmluZ2lmeShsb2NhdGlvbikpO1xyXG4gICAgICAgICAgICAgICAgICBjb250cm9sbGVyLnVwZGF0ZU1vZGVsKGxvY2F0aW9uLmlkLCBsb2NhdGlvbi5uYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KShsb2NhdGlvbnNbaV0pKTtcclxuXHJcbiAgICAgICAgICAgICAgdHIuYXBwZW5kKHRkKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgIHRoaXMudGFibGVCb2R5LmFwcGVuZCh0cik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIGNvbnRyb2xsZXIuaW5pdCgpO1xyXG5cclxuICAgIH0oKSk7XHJcblxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
