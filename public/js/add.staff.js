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

        console.log('add staff js loaded');
    var model = {
      locations:[],
      staff:{
         id:0,
         firstName:"",
         lastName:"",
         contact1:"",
         contact2:"",
         email:"",
         address:"",
         userName:"",
         pasword:"",
         recoveryContact:"",
         recoveryEmail:"",
         locationId:0,
         isActive:0
      }
  }

    var controller = {
      init: function(){
        this.getLocationsUrl = links.locationListUrl;
        this.createModifyStaffUrl = links.createModifyStaffUrl;
        this.getStaffDetailsUrl = links.getStaffDetailsUrl;

        CreateUpdateView.init();

        $.get(this.getLocationsUrl , {})
         .done(function( response ) {
           console.log('locs ' + JSON.stringify(response));
           model.locations = response.data;
           CreateUpdateView.render();


           var staffId = utility.getURLParam('id');

           if(staffId){
             console.log(staffId);
             controller.updateStaffModelFromServer(staffId);
             CreateUpdateView.render();
           }


         });

      },
      getLocationList: function(){
        return model.locations;
      },
      getStaffModel: function(){
        return model.staff;
      },
      updateStaffModelFromServer: function(staffId){
        $.get(controller.getStaffDetailsUrl , {id:staffId})
         .done(function( response ) {
           console.log('staff details ' + JSON.stringify(response));
           model.staff = response.data;
           CreateUpdateView.render();
         });
      },
      getUpdateModelFromView: function(){

        model.staff.firstName = CreateUpdateView.firstName.val();
        model.staff.lastName = CreateUpdateView.lastName.val();
        model.staff.contact1 = CreateUpdateView.contact1.val();
        model.staff.contact2 = CreateUpdateView.contact2.val();
        model.staff.email = CreateUpdateView.email.val();
        model.staff.address = CreateUpdateView.address.val();
        model.staff.userName = CreateUpdateView.userName.val();
        model.staff.pasword = CreateUpdateView.pasword.val();
        model.staff.recoveryContact = CreateUpdateView.recoveryContact.val();
        model.staff.recoveryEmail = CreateUpdateView.recoveryEmail.val();

        var selectedValue = CreateUpdateView.selectLocations.find(":selected").attr('value');
        if(selectedValue){
          model.staff.locationId = selectedValue;
        }

        if(CreateUpdateView.activeControl.is(":checked")){
          model.staff.isActive = 1;
        }else{
          model.staff.isActive = 0;
        }

        return model.staff;

      }
    }

    var CreateUpdateView = {
      init: function(){
        this.firstName = $('#fname');
        this.lastName = $('#lname');
        this.contact1 = $('#contact1');
        this.contact2 = $('#contact2');
        this.email = $('#email');
        this.address = $('#address');
        this.userName = $('#uname');
        this.pasword = $('#pswd');
        this.recoveryContact = $('#recovery-contact');
        this.recoveryEmail = $('#recovery-email');
        this.activeControl  = $('#sactive');
        this.inActiveControl  = $('#sinactive');
        this.selectLocations = $('#sel-locations');

        this.saveButton = $('#btn-save');

        this.saveButton.click(function() {

          console.log('save click');

          var staff = controller.getUpdateModelFromView();

          $.post(controller.createModifyStaffUrl , staff)
           .done(function( response ) {
             console.log('response ' + JSON.stringify(response));
             //model.locations = response.data;
             //CreateUpdateView.render();
           });

        });

      },
      render: function(){

        //adding the select option to the list
        var option = $('<option/>',{
                        value: 0,
                        text: 'Select...',
                        selected: 'selected'
                      }
                      );
        this.selectLocations.append(option);

        var locations = controller.getLocationList();

        for(var i = 0; i < locations.length; i++){
          var option = $('<option/>',{
                          value: locations[i].id,
                          text: locations[i].name
                        }
                        );
         this.selectLocations.append(option);

       }//


       //updating the staff details in the view

       CreateUpdateView.firstName.val(model.staff.firstName);
       CreateUpdateView.lastName.val(model.staff.lastName);
       CreateUpdateView.contact1.val(model.staff.contact1);
       CreateUpdateView.contact2.val(model.staff.contact2);
       CreateUpdateView.email.val(model.staff.email);
       CreateUpdateView.address.val(model.staff.address);
       CreateUpdateView.userName.val(model.staff.userName);
       CreateUpdateView.pasword.val(model.staff.pasword);
       CreateUpdateView.recoveryContact.val(model.staff.recoveryContact);
       CreateUpdateView.recoveryEmail.val(model.staff.recoveryEmail);

       //setting the locatio option
       CreateUpdateView.selectLocations.val(model.staff.locationId);

         // CreateUpdateView.selectLocations.find(':option[value="' + model.staff.locationId + '"]').attr('selected', 'selected');

       if(model.staff.isActive){
         CreateUpdateView.activeControl.prop('checked', true);
         CreateUpdateView.inActiveControl.prop('checked', false);
       }else{
         CreateUpdateView.activeControl.prop('checked', false);
         CreateUpdateView.inActiveControl.prop('checked', true);
       }

      }
    }

    controller.init();

  }());


});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxpdHkuanMiLCJsaW5rcy5qcyIsImRvY3RvckRhc2hib2FyZC5qcyIsImFkZC5zdGFmZi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNySEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhZGQuc3RhZmYuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL2hlbHBlciBmdW5jdGlvbiB0byBnZXQgdGhlIHVybCBxdWVyeSBwYXJhbWV0ZXJzXHJcbnZhciB1dGlsaXR5ID0ge1xyXG4gIGdldFVSTFBhcmFtOiBmdW5jdGlvbihuYW1lKXtcclxuICAgIHZhciB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuXHJcbiAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC9bXFxbXFxdXS9nLCBcIlxcXFwkJlwiKTtcclxuXHJcbiAgICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKFwiWz8mXVwiICsgbmFtZSArIFwiKD0oW14mI10qKXwmfCN8JClcIik7XHJcbiAgICB2YXIgcmVzdWx0cyA9IHJlZ2V4LmV4ZWModXJsKTtcclxuXHJcbiAgICBpZiAoIXJlc3VsdHMpIHJldHVybiBudWxsO1xyXG4gICAgaWYgKCFyZXN1bHRzWzJdKSByZXR1cm4gJyc7XHJcblxyXG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHRzWzJdLnJlcGxhY2UoL1xcKy9nLCBcIiBcIikpO1xyXG4gIH0sXHJcbiAgZ2V0VGltZU1pbnV0ZXNBcnJheTogIGZ1bmN0aW9uKCl7XHJcblxyXG4gIH1cclxufVxyXG4iLCJ2YXIgbGlua3MgPSB7XHJcblxyXG4gIC8vbG9naW4ganMgdXJsc1xyXG4gICBhdXRoZW50aWNhdGVVcmwgOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvYXV0aGVuaXRjYXRlVXNlclwiLFxyXG4gICBzdWNjZXNzUmVkaXJlY3RVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvXCIsXHJcbiAgIHJlZ2lzdGVyRG9jdG9yVXJsIDogXCJpbmRleC5waHAvZG9jdG9yL2RvY3RvckluZm9cIixcclxuICAgYWRtaW5Vcmw6XCJpbmRleC5waHAvYWRtaW5EYXNoYm9hcmQvYWRtaW5cIixcclxuXHJcbiAgIC8vYWRtaW4gcmVsYXRlZFxyXG4gICBkb2N0b3JMaXN0aW5nVXJsOiBcImluZGV4LnBocC9hZG1pbkRhc2hib2FyZC9kb2N0b3JMaXN0aW5nXCIsXHJcblxyXG4gICBsb2dvdXRVcmwgOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvbG9nb3V0XCIsXHJcblxyXG4gICAvL2RvY3RvciBkYXNoYm9hcmQgbGlua3MgXHJcbiAgIGRvY3RvclByb2ZpbGUgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvZG9jdG9yUHJvZmlsZVwiLFxyXG4gICBkYXNoYm9hcmRIb21lVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL1wiLFxyXG4gICBuZXdBcHBvaW50bWVudFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9ib29rQXBwb2ludG1lbnRcIixcclxuICAgcGF0aWVudHNFbnRyeVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wYXRpZW50c0VudHJ5XCIsXHJcbiAgIHBhdGllbnRzTGlzdGluZ1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wYXRpZW50c0xpc3RpbmdcIixcclxuICAgY2xvc2VBcHBvaW50bWVudFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jbG9zZUFwcG9pbnRtZW50XCIsXHJcbiAgIGRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2xpc3RBcHBvaW50bWVudFwiLFxyXG4gICBuZXdTY2hlZHVsZVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9uZXdTY2hlZHVsZVwiLFxyXG4gICBsaXN0U2NoZWR1bGVVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvc2NoZWR1bGVMaXN0XCIsXHJcbiAgIGdldFNjaGVkdWxlQ2FsZW5kYXJVcmw6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9TY2hlZHVsZUNhbGVuZGVyVmlld1wiLFxyXG4gICBhZGRTdGFmZlVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9zdGFmZkVudHJ5XCIsXHJcbiAgIGRvY3RvcnNTdGFmZkxpc3RpbmdVciA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9zdGFmZkxpc3RpbmdcIixcclxuICAgcGF0aWVudHNIaXN0b3J5VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3BhdGllbnRIaXN0b3J5XCIsXHJcbiAgIGNyZWF0ZVByb2dyYW1Gb3JQYXRpZW50VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2NyZWF0ZU1lZGljYWxQcm9ncmFtXCIsXHJcbiAgIHByb2dyYW1tZUxpc3RpbmdzVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3Byb2dyYW1tZUxpc3RcIixcclxuICAgTWFuYWdlTG9jYXRpb25zVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3dvcmtMb2NhdGlvbk1hbmFnZW1lbnRcIixcclxuICAgZ2V0QW5hbHl0aWNzVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL0FuYWx5dGljc1JlcG9ydFwiLFxyXG4gICBnZXRDYWxlbmRlclVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jYWxlbmRhclRlbXBsYXRlXCIsXHJcbiAgIGFjY291bnRpbmdVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvYWNjb3VudGluZ1wiLFxyXG4gICBtZWRpY2luZVNlYXJjaFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9tZWRpY2luZVNlYXJjaFwiLFxyXG5cclxuXHJcbiAgIC8vc2NoZWR1bGVcclxuICAgZ2V0TG9jYXRpb25Vcmw6IFwiaW5kZXgucGhwL2xvY2F0aW9ucy9nZXREb2N0b3JMb2NhdGlvbnNcIixcclxuICAgY3JlYXRlVXBkYXRlU2NoZWR1bGVVcmw6IFwiaW5kZXgucGhwL3NjaGVkdWxlL2NyZWF0ZVVwZGF0ZVNjaGVkdWxlXCIsXHJcblxyXG4gICAvL3Byb2dyYW1tZVxyXG4gICBwcm9ncmFtbWVMaXN0VXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRNZWRpY2F0aW9uUHJvZ3JhbW1lTGlzdFwiLFxyXG4gICBwcm9ncmFtbWVFZGl0VXJsOlwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jcmVhdGVNZWRpY2FsUHJvZ3JhbVwiLFxyXG4gICBjcmVhdGVNb2RpZnlQcm9ncmFtbWVVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2NyZWF0ZU1vZGlmeVByb2dyYW1tZVwiLFxyXG4gICBnZXRQcm9ncmFtbWVVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldFByb2dyYW1tZXNcIixcclxuXHJcblxyXG4gICAvL3BhdGllbnRcclxuICAgcGF0aWVudERldGFpbFBlcnNpc3RVcmw6XCJpbmRleC5waHAvcGF0aWVudC9hZGRVcGRhdGVQYXRpZW50XCIsXHJcbiAgIHBhdGllbnRzRGV0YWlsc1VybDpcImluZGV4LnBocC9wYXRpZW50L2dldFBhdGllbnREZXRhaWxzXCIsXHJcbiAgIGxvZ2luQ2hlY2tVcmw6XCJpbmRleC5waHAvYXV0aGVudGljYXRlL2lzTG9nZ2VkSW5cIixcclxuICAgZ2V0UHJvZ3JhbW1lTGlzdDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0TWVkaWNhdGlvblByb2dyYW1tZUxpc3RcIixcclxuICAgcHJvZ3JhbW1lTGlzdERldGFpbHNVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldFByb2dyYW1tZUxpc3REZXRhaWxzXCIsXHJcbiAgIHBhdGllbnRzUHJvZ3JhbW1lc1VybDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0UGF0aWVudFByb2dyYW1tZXNcIixcclxuICAgcGF0aWVudExpc3RpbmdVcmw6XCJpbmRleC5waHAvcGF0aWVudC9nZXRQYXRpZW50TGlzdFwiLFxyXG5cclxuICAgc2F2ZVVwZGF0ZUxvY2F0aW9uczpcImluZGV4LnBocC9sb2NhdGlvbnMvYWRkVXBkYXRlTG9jYXRpb25cIixcclxuICAgbG9jYXRpb25MaXN0VXJsOlwiaW5kZXgucGhwL2xvY2F0aW9ucy9nZXREb2N0b3JMb2NhdGlvbnNcIixcclxuICAgZGVsaXZlcnlNZXRob2RzVXJsOlwiaW5kZXgucGhwL3BhdGllbnQvZ2V0RGVsaXZlcnlNZXRob2RzXCIsXHJcblxyXG5cclxuICAgLy9yZWdpc3RhcnRpb25cclxuICAgZG9jdG9yVXJsOlwiaW5kZXgucGhwL2RvY3Rvci9zYXZlVXBkYXRlRG9jdG9yXCIsXHJcbiAgIGRvY3RvckRldGFpbHNVcmw6XCJpbmRleC5waHAvZG9jdG9yL2dldERvY3RvckRldGFpbHNcIixcclxuICAgbG9naW5DaGVja1VybDpcImluZGV4LnBocC9hdXRoZW50aWNhdGUvaXNMb2dnZWRJblwiLFxyXG4gICBkb2N0b3JEYXNoVXJsOlwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9cIixcclxuICAgbG9nb3V0VXJsOlwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9sb2dvdXRcIixcclxuXHJcbiAgIGNyZWF0ZU1vZGlmeVN0YWZmVXJsOlwiaW5kZXgucGhwL3N0YWZmL2NyZWF0ZU1vZGlmeVN0YWZmXCIsXHJcbiAgIGdldFN0YWZmRGV0YWlsc1VybDogXCJpbmRleC5waHAvc3RhZmYvZ2V0U3RhZmZEZXRhaWxzXCIsXHJcbiAgIHN0YWZmTGlzdGluZ1VybDogXCJpbmRleC5waHAvc3RhZmYvZ2V0RG9jdG9yc1N0YWZmTGlzdFwiXHJcblxyXG59XHJcbiIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcblxyXG4gIC8vZGVmaW5pbmcgdGhlIGhlbHBlciBmdW5jdGlvbnMgaW4gZ2xvYmFsXHJcblxyXG4gICQoZnVuY3Rpb24oKXtcclxuXHJcbiAgICBjb25zb2xlLmxvZygnRG9jdG9yIERhc2hib2FyZCBqcyBsb2FkZWQnKTtcclxuXHJcbiAgICAvL3RvcCBsZXZlbCBjb250cm9sbGVyXHJcbiAgICB2YXIgY29udHJvbGxlciA9IHtcclxuICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICAvL3dpcmluZyB0aGUgbmF2aWdhdGlvblxyXG4gICAgICAgIHRoaXMubG9nb3V0VXJsID0gbGlua3MubG9nb3V0VXJsO1xyXG4gICAgICAgIHRoaXMuZG9jdG9yUHJvZmlsZSA9IGxpbmtzLmRvY3RvclByb2ZpbGU7XHJcbiAgICAgICAgdGhpcy5kYXNoYm9hcmRIb21lVXJsID0gbGlua3MuZGFzaGJvYXJkSG9tZVVybDtcclxuICAgICAgICB0aGlzLm5ld0FwcG9pbnRtZW50VXJsID0gbGlua3MubmV3QXBwb2ludG1lbnRVcmw7XHJcbiAgICAgICAgdGhpcy5wYXRpZW50c0VudHJ5VXJsID0gbGlua3MucGF0aWVudHNFbnRyeVVybDtcclxuICAgICAgICB0aGlzLnBhdGllbnRzTGlzdGluZ1VybCA9IGxpbmtzLnBhdGllbnRzTGlzdGluZ1VybDtcclxuICAgICAgICB0aGlzLmNsb3NlQXBwb2ludG1lbnRVcmwgPSBsaW5rcy5jbG9zZUFwcG9pbnRtZW50VXJsO1xyXG4gICAgICAgIHRoaXMuZG9jdG9yc0FwcG9pbnRtZW50c0xpc3RVcmwgPSBsaW5rcy5kb2N0b3JzQXBwb2ludG1lbnRzTGlzdFVybDtcclxuXHJcbiAgICAgICAgdGhpcy5uZXdTY2hlZHVsZVVybCA9IGxpbmtzLm5ld1NjaGVkdWxlVXJsO1xyXG4gICAgICAgIHRoaXMubGlzdFNjaGVkdWxlVXJsID0gdGhpcy5saXN0U2NoZWR1bGVVcmw7XHJcbiAgICAgICAgdGhpcy5TY2hlZHVsZUNhbGVuZGFyVXJsID0gbGlua3MuZ2V0U2NoZWR1bGVDYWxlbmRhclVybDtcclxuICAgICAgICB0aGlzLmFkZFN0YWZmVXJsID0gbGlua3MuYWRkU3RhZmZVcmw7XHJcbiAgICAgICAgdGhpcy5kb2N0b3JzU3RhZmZMaXN0aW5nVXIgPSBsaW5rcy5kb2N0b3JzU3RhZmZMaXN0aW5nVXI7XHJcblxyXG4gICAgICAgIHRoaXMucGF0aWVudHNIaXN0b3J5VXJsID0gbGlua3MucGF0aWVudHNIaXN0b3J5VXJsO1xyXG5cclxuICAgICAgICB0aGlzLmNyZWF0ZVByb2dyYW1Gb3JQYXRpZW50VXJsID0gbGlua3MuY3JlYXRlUHJvZ3JhbUZvclBhdGllbnRVcmwgO1xyXG4gICAgICAgIHRoaXMucHJvZ3JhbW1lTGlzdGluZ3NVcmwgPSBsaW5rcy5wcm9ncmFtbWVMaXN0aW5nc1VybDtcclxuXHJcbiAgICAgICAgdGhpcy5NYW5hZ2VMb2NhdGlvbnNVcmwgPSBsaW5rcy5NYW5hZ2VMb2NhdGlvbnNVcmw7XHJcbiAgICAgICAgdGhpcy5DYWxlbmRhclRlbXBsYXRlVXJsID0gbGlua3MuZ2V0Q2FsZW5kZXJVcmw7XHJcblxyXG4gICAgICAgIHRoaXMuYW5hbHl0aWNzUmVwb3J0VXJsID0gbGlua3MuZ2V0QW5hbHl0aWNzVXJsO1xyXG4gICAgICAgIHRoaXMuYWNjb3VudGluZ1VybCA9IGxpbmtzLmFjY291bnRpbmdVcmw7XHJcbiAgICAgICAgdGhpcy5tZWRpY2luZVNlYXJjaFVybCA9IGxpbmtzLm1lZGljaW5lU2VhcmNoVXJsO1xyXG4gICAgICAgIC8vZG8gc29tZXRobmcgYWJvdXQgZG9jdG9ycyBpbmZvIGFuZCByZWdpc3RyYXRpb25cclxuXHJcbiAgICAgICAgLy9UaGUgdXJsIGZyb20gdGhlIGJyb3dzZXIgIGNhbiBiZSBjb21wYXJlZCB0byBzZXQgdGhlIGFjdGl2ZSBuYXZpZ2F0aW9uXHJcbiAgICAgICAgbmF2Vmlldy5pbml0KCk7XHJcblxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBuYXZWaWV3ID0ge1xyXG4gICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAvL3dpcmluZyB0aGUgbmF2aWdhdGlvbiBjbGlja3NcclxuXHJcblxyXG4gICAgICAgICQoXCIjcG1zLWJyYW5kLWJ0bi1saW5rXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ1BNUyBicmFuZCBjbGljaycpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICQoXCIjdXNlci1Qcm9maWxlLUJ0bi1MaW5rXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmRvY3RvclByb2ZpbGUpO1xyXG5cclxuICAgICAgICAkKFwiI2RvY3Rvci1kYXNoLWxvZ291dC1idG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIubG9nb3V0VXJsKTtcclxuXHJcblxyXG5cclxuICAgICAgICAkKFwiI2Rhc2hib2FyZC1TZWN0aW9uLUJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5kYXNoYm9hcmRIb21lVXJsKTtcclxuXHJcbiAgICAgICAgJChcIiNhcHBvaW50bWVudC1zZWN0aW9uLWxpbmstYnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsKTtcclxuXHJcbiAgICAgICAgJChcIiNtYW5hZ2UtRG9jdG9ycy1TY2hlZHVsZS1TZWN0aW9uLUxpbmstQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLlNjaGVkdWxlQ2FsZW5kYXJVcmwpO1xyXG5cclxuICAgICAgICAkKFwiI2J0bi1wcm9ncmFtbWUtc2VjdGlvbi1saW5rXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLnByb2dyYW1tZUxpc3RpbmdzVXJsKTtcclxuXHJcbiAgICAgICAgJChcIiNjcmVhdGUtcHJvZ3JhbS1mb3ItcGF0aWVudC1zZWN0aW9uXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmNyZWF0ZVByb2dyYW1Gb3JQYXRpZW50VXJsKTtcclxuXHJcbiAgICAgICAgJChcIiNwYXRpZW50cy1FbnRyeS1TZWN0aW9uLUxpbmstQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLnBhdGllbnRzTGlzdGluZ1VybCk7XHJcblxyXG4gICAgICAgIC8vJChcIiNwYXRpZW50cy1lbnRyeS1jcmVhdGUtc2VjdGlvbi1saW5rLUJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5wYXRpZW50c0VudHJ5VXJsKTtcclxuICAgICAgICAvLyQoXCIjcGF0aWVudHMtSGlzdG9yeS1TZWN0aW9uLUxpbmstQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLnBhdGllbnRzSGlzdG9yeVVybCk7XHJcblxyXG4gICAgICAgICQoXCIjc3RhZmYtbWFuYWdtZW50LXNlY3Rpb24tbGluay1idG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIuZG9jdG9yc1N0YWZmTGlzdGluZ1VyKTtcclxuXHJcbiAgICAgICAgJChcIiNidG4tbWFuYWdlLWxvY2F0aW9uc1wiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5NYW5hZ2VMb2NhdGlvbnNVcmwpO1xyXG5cclxuICAgICAgICAkKFwiI2FuYWx5dGljcy1zaWRlLW5hdmlnYXRpb24tbGluay1idG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIuYW5hbHl0aWNzUmVwb3J0VXJsKTtcclxuICAgICAgICAkKFwiI2FjY291bnRpbmctc2lkZS1uYXZpZ2F0aW9uLWxpbmstYnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmFjY291bnRpbmdVcmwpO1xyXG4gICAgICAgICQoXCIjbWVkaWNpbmUtc2lkZS1uYXZpZ2F0aW9uLWxpbmstYnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLm1lZGljaW5lU2VhcmNoVXJsKTtcclxuXHJcblxyXG5cclxuICAgICAgICAvLyQoXCIjYm9vay1BcHBvaW50bWVudHMtU2VjdGlvbi1CdG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIubmV3QXBwb2ludG1lbnRVcmwpO1xyXG4gICAgICAgIC8vJChcIiNjbG9zZS1Cb29rLUFwcG9pbnRtZW50LVNlY3Rpb24tTGluay1CdG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIuY2xvc2VBcHBvaW50bWVudFVybCk7XHJcbiAgICAgICAgLy8kKFwiI3ZpZXctQXBwb2ludG1lbnQtU2VjdGlvbi1MaW5rLUJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5kb2N0b3JzQXBwb2ludG1lbnRzTGlzdFVybCk7XHJcbiAgICAgICAgLy8kKFwiI21hbmFnZS1Eb2N0b3JzLVNjaGVkdWxlLVNlY3Rpb24tTGluay1CdG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIubGlzdFNjaGVkdWxlVXJsKTtcclxuICAgICAgICAvLyQoXCIjbWFuYWdlLXNjaGVkdWxlLWNyZWF0ZS1zZWN0aW9uLWxpbmstQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLm5ld1NjaGVkdWxlVXJsKTtcclxuICAgICAgICAvLyQoXCIjY2FsZW5kYXItVGVtcGxhdGUtQnRuLUxpbmtcIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIuQ2FsZW5kYXJUZW1wbGF0ZVVybCk7XHJcbiAgICAgICAgLy8kKFwiI21hbmFnZS1zY2hlZHVsZS1saXN0LXNlY3Rpb24tbGluay1CdG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIuU2NoZWR1bGVDYWxlbmRhclVybCk7XHJcblxyXG4gICAgICAgICQoXCIjb3RoZXItc2V0dGluZ3Mtc2VjdGlvbi1saW5rLWJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiI2NhbGVuZGFyLXRlbXBsYXRlLXNlY3Rpb24tbGluay1idG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgfSxcclxuICAgICAgcmVuZGVyOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vaGlnaGxpZ2h0IHRoZSByaWdodCBuYXZpZ2F0aW9uXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb250cm9sbGVyLmluaXQoKTtcclxuXHJcbiAgfSgpKTtcclxuXHJcbn0pO1xyXG4iLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG5cclxuICAgICQoZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coJ2FkZCBzdGFmZiBqcyBsb2FkZWQnKTtcclxuICAgIHZhciBtb2RlbCA9IHtcclxuICAgICAgbG9jYXRpb25zOltdLFxyXG4gICAgICBzdGFmZjp7XHJcbiAgICAgICAgIGlkOjAsXHJcbiAgICAgICAgIGZpcnN0TmFtZTpcIlwiLFxyXG4gICAgICAgICBsYXN0TmFtZTpcIlwiLFxyXG4gICAgICAgICBjb250YWN0MTpcIlwiLFxyXG4gICAgICAgICBjb250YWN0MjpcIlwiLFxyXG4gICAgICAgICBlbWFpbDpcIlwiLFxyXG4gICAgICAgICBhZGRyZXNzOlwiXCIsXHJcbiAgICAgICAgIHVzZXJOYW1lOlwiXCIsXHJcbiAgICAgICAgIHBhc3dvcmQ6XCJcIixcclxuICAgICAgICAgcmVjb3ZlcnlDb250YWN0OlwiXCIsXHJcbiAgICAgICAgIHJlY292ZXJ5RW1haWw6XCJcIixcclxuICAgICAgICAgbG9jYXRpb25JZDowLFxyXG4gICAgICAgICBpc0FjdGl2ZTowXHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gICAgdmFyIGNvbnRyb2xsZXIgPSB7XHJcbiAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5nZXRMb2NhdGlvbnNVcmwgPSBsaW5rcy5sb2NhdGlvbkxpc3RVcmw7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVNb2RpZnlTdGFmZlVybCA9IGxpbmtzLmNyZWF0ZU1vZGlmeVN0YWZmVXJsO1xyXG4gICAgICAgIHRoaXMuZ2V0U3RhZmZEZXRhaWxzVXJsID0gbGlua3MuZ2V0U3RhZmZEZXRhaWxzVXJsO1xyXG5cclxuICAgICAgICBDcmVhdGVVcGRhdGVWaWV3LmluaXQoKTtcclxuXHJcbiAgICAgICAgJC5nZXQodGhpcy5nZXRMb2NhdGlvbnNVcmwgLCB7fSlcclxuICAgICAgICAgLmRvbmUoZnVuY3Rpb24oIHJlc3BvbnNlICkge1xyXG4gICAgICAgICAgIGNvbnNvbGUubG9nKCdsb2NzICcgKyBKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xyXG4gICAgICAgICAgIG1vZGVsLmxvY2F0aW9ucyA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICAgQ3JlYXRlVXBkYXRlVmlldy5yZW5kZXIoKTtcclxuXHJcblxyXG4gICAgICAgICAgIHZhciBzdGFmZklkID0gdXRpbGl0eS5nZXRVUkxQYXJhbSgnaWQnKTtcclxuXHJcbiAgICAgICAgICAgaWYoc3RhZmZJZCl7XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyhzdGFmZklkKTtcclxuICAgICAgICAgICAgIGNvbnRyb2xsZXIudXBkYXRlU3RhZmZNb2RlbEZyb21TZXJ2ZXIoc3RhZmZJZCk7XHJcbiAgICAgICAgICAgICBDcmVhdGVVcGRhdGVWaWV3LnJlbmRlcigpO1xyXG4gICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICB9KTtcclxuXHJcbiAgICAgIH0sXHJcbiAgICAgIGdldExvY2F0aW9uTGlzdDogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gbW9kZWwubG9jYXRpb25zO1xyXG4gICAgICB9LFxyXG4gICAgICBnZXRTdGFmZk1vZGVsOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiBtb2RlbC5zdGFmZjtcclxuICAgICAgfSxcclxuICAgICAgdXBkYXRlU3RhZmZNb2RlbEZyb21TZXJ2ZXI6IGZ1bmN0aW9uKHN0YWZmSWQpe1xyXG4gICAgICAgICQuZ2V0KGNvbnRyb2xsZXIuZ2V0U3RhZmZEZXRhaWxzVXJsICwge2lkOnN0YWZmSWR9KVxyXG4gICAgICAgICAuZG9uZShmdW5jdGlvbiggcmVzcG9uc2UgKSB7XHJcbiAgICAgICAgICAgY29uc29sZS5sb2coJ3N0YWZmIGRldGFpbHMgJyArIEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSk7XHJcbiAgICAgICAgICAgbW9kZWwuc3RhZmYgPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgIENyZWF0ZVVwZGF0ZVZpZXcucmVuZGVyKCk7XHJcbiAgICAgICAgIH0pO1xyXG4gICAgICB9LFxyXG4gICAgICBnZXRVcGRhdGVNb2RlbEZyb21WaWV3OiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICBtb2RlbC5zdGFmZi5maXJzdE5hbWUgPSBDcmVhdGVVcGRhdGVWaWV3LmZpcnN0TmFtZS52YWwoKTtcclxuICAgICAgICBtb2RlbC5zdGFmZi5sYXN0TmFtZSA9IENyZWF0ZVVwZGF0ZVZpZXcubGFzdE5hbWUudmFsKCk7XHJcbiAgICAgICAgbW9kZWwuc3RhZmYuY29udGFjdDEgPSBDcmVhdGVVcGRhdGVWaWV3LmNvbnRhY3QxLnZhbCgpO1xyXG4gICAgICAgIG1vZGVsLnN0YWZmLmNvbnRhY3QyID0gQ3JlYXRlVXBkYXRlVmlldy5jb250YWN0Mi52YWwoKTtcclxuICAgICAgICBtb2RlbC5zdGFmZi5lbWFpbCA9IENyZWF0ZVVwZGF0ZVZpZXcuZW1haWwudmFsKCk7XHJcbiAgICAgICAgbW9kZWwuc3RhZmYuYWRkcmVzcyA9IENyZWF0ZVVwZGF0ZVZpZXcuYWRkcmVzcy52YWwoKTtcclxuICAgICAgICBtb2RlbC5zdGFmZi51c2VyTmFtZSA9IENyZWF0ZVVwZGF0ZVZpZXcudXNlck5hbWUudmFsKCk7XHJcbiAgICAgICAgbW9kZWwuc3RhZmYucGFzd29yZCA9IENyZWF0ZVVwZGF0ZVZpZXcucGFzd29yZC52YWwoKTtcclxuICAgICAgICBtb2RlbC5zdGFmZi5yZWNvdmVyeUNvbnRhY3QgPSBDcmVhdGVVcGRhdGVWaWV3LnJlY292ZXJ5Q29udGFjdC52YWwoKTtcclxuICAgICAgICBtb2RlbC5zdGFmZi5yZWNvdmVyeUVtYWlsID0gQ3JlYXRlVXBkYXRlVmlldy5yZWNvdmVyeUVtYWlsLnZhbCgpO1xyXG5cclxuICAgICAgICB2YXIgc2VsZWN0ZWRWYWx1ZSA9IENyZWF0ZVVwZGF0ZVZpZXcuc2VsZWN0TG9jYXRpb25zLmZpbmQoXCI6c2VsZWN0ZWRcIikuYXR0cigndmFsdWUnKTtcclxuICAgICAgICBpZihzZWxlY3RlZFZhbHVlKXtcclxuICAgICAgICAgIG1vZGVsLnN0YWZmLmxvY2F0aW9uSWQgPSBzZWxlY3RlZFZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoQ3JlYXRlVXBkYXRlVmlldy5hY3RpdmVDb250cm9sLmlzKFwiOmNoZWNrZWRcIikpe1xyXG4gICAgICAgICAgbW9kZWwuc3RhZmYuaXNBY3RpdmUgPSAxO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgbW9kZWwuc3RhZmYuaXNBY3RpdmUgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1vZGVsLnN0YWZmO1xyXG5cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBDcmVhdGVVcGRhdGVWaWV3ID0ge1xyXG4gICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuZmlyc3ROYW1lID0gJCgnI2ZuYW1lJyk7XHJcbiAgICAgICAgdGhpcy5sYXN0TmFtZSA9ICQoJyNsbmFtZScpO1xyXG4gICAgICAgIHRoaXMuY29udGFjdDEgPSAkKCcjY29udGFjdDEnKTtcclxuICAgICAgICB0aGlzLmNvbnRhY3QyID0gJCgnI2NvbnRhY3QyJyk7XHJcbiAgICAgICAgdGhpcy5lbWFpbCA9ICQoJyNlbWFpbCcpO1xyXG4gICAgICAgIHRoaXMuYWRkcmVzcyA9ICQoJyNhZGRyZXNzJyk7XHJcbiAgICAgICAgdGhpcy51c2VyTmFtZSA9ICQoJyN1bmFtZScpO1xyXG4gICAgICAgIHRoaXMucGFzd29yZCA9ICQoJyNwc3dkJyk7XHJcbiAgICAgICAgdGhpcy5yZWNvdmVyeUNvbnRhY3QgPSAkKCcjcmVjb3ZlcnktY29udGFjdCcpO1xyXG4gICAgICAgIHRoaXMucmVjb3ZlcnlFbWFpbCA9ICQoJyNyZWNvdmVyeS1lbWFpbCcpO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlQ29udHJvbCAgPSAkKCcjc2FjdGl2ZScpO1xyXG4gICAgICAgIHRoaXMuaW5BY3RpdmVDb250cm9sICA9ICQoJyNzaW5hY3RpdmUnKTtcclxuICAgICAgICB0aGlzLnNlbGVjdExvY2F0aW9ucyA9ICQoJyNzZWwtbG9jYXRpb25zJyk7XHJcblxyXG4gICAgICAgIHRoaXMuc2F2ZUJ1dHRvbiA9ICQoJyNidG4tc2F2ZScpO1xyXG5cclxuICAgICAgICB0aGlzLnNhdmVCdXR0b24uY2xpY2soZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgY29uc29sZS5sb2coJ3NhdmUgY2xpY2snKTtcclxuXHJcbiAgICAgICAgICB2YXIgc3RhZmYgPSBjb250cm9sbGVyLmdldFVwZGF0ZU1vZGVsRnJvbVZpZXcoKTtcclxuXHJcbiAgICAgICAgICAkLnBvc3QoY29udHJvbGxlci5jcmVhdGVNb2RpZnlTdGFmZlVybCAsIHN0YWZmKVxyXG4gICAgICAgICAgIC5kb25lKGZ1bmN0aW9uKCByZXNwb25zZSApIHtcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXNwb25zZSAnICsgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcclxuICAgICAgICAgICAgIC8vbW9kZWwubG9jYXRpb25zID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgIC8vQ3JlYXRlVXBkYXRlVmlldy5yZW5kZXIoKTtcclxuICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9LFxyXG4gICAgICByZW5kZXI6IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIC8vYWRkaW5nIHRoZSBzZWxlY3Qgb3B0aW9uIHRvIHRoZSBsaXN0XHJcbiAgICAgICAgdmFyIG9wdGlvbiA9ICQoJzxvcHRpb24vPicse1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1NlbGVjdC4uLicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkOiAnc2VsZWN0ZWQnXHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0TG9jYXRpb25zLmFwcGVuZChvcHRpb24pO1xyXG5cclxuICAgICAgICB2YXIgbG9jYXRpb25zID0gY29udHJvbGxlci5nZXRMb2NhdGlvbkxpc3QoKTtcclxuXHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGxvY2F0aW9ucy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICB2YXIgb3B0aW9uID0gJCgnPG9wdGlvbi8+Jyx7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGxvY2F0aW9uc1tpXS5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBsb2NhdGlvbnNbaV0ubmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgIHRoaXMuc2VsZWN0TG9jYXRpb25zLmFwcGVuZChvcHRpb24pO1xyXG5cclxuICAgICAgIH0vL1xyXG5cclxuXHJcbiAgICAgICAvL3VwZGF0aW5nIHRoZSBzdGFmZiBkZXRhaWxzIGluIHRoZSB2aWV3XHJcblxyXG4gICAgICAgQ3JlYXRlVXBkYXRlVmlldy5maXJzdE5hbWUudmFsKG1vZGVsLnN0YWZmLmZpcnN0TmFtZSk7XHJcbiAgICAgICBDcmVhdGVVcGRhdGVWaWV3Lmxhc3ROYW1lLnZhbChtb2RlbC5zdGFmZi5sYXN0TmFtZSk7XHJcbiAgICAgICBDcmVhdGVVcGRhdGVWaWV3LmNvbnRhY3QxLnZhbChtb2RlbC5zdGFmZi5jb250YWN0MSk7XHJcbiAgICAgICBDcmVhdGVVcGRhdGVWaWV3LmNvbnRhY3QyLnZhbChtb2RlbC5zdGFmZi5jb250YWN0Mik7XHJcbiAgICAgICBDcmVhdGVVcGRhdGVWaWV3LmVtYWlsLnZhbChtb2RlbC5zdGFmZi5lbWFpbCk7XHJcbiAgICAgICBDcmVhdGVVcGRhdGVWaWV3LmFkZHJlc3MudmFsKG1vZGVsLnN0YWZmLmFkZHJlc3MpO1xyXG4gICAgICAgQ3JlYXRlVXBkYXRlVmlldy51c2VyTmFtZS52YWwobW9kZWwuc3RhZmYudXNlck5hbWUpO1xyXG4gICAgICAgQ3JlYXRlVXBkYXRlVmlldy5wYXN3b3JkLnZhbChtb2RlbC5zdGFmZi5wYXN3b3JkKTtcclxuICAgICAgIENyZWF0ZVVwZGF0ZVZpZXcucmVjb3ZlcnlDb250YWN0LnZhbChtb2RlbC5zdGFmZi5yZWNvdmVyeUNvbnRhY3QpO1xyXG4gICAgICAgQ3JlYXRlVXBkYXRlVmlldy5yZWNvdmVyeUVtYWlsLnZhbChtb2RlbC5zdGFmZi5yZWNvdmVyeUVtYWlsKTtcclxuXHJcbiAgICAgICAvL3NldHRpbmcgdGhlIGxvY2F0aW8gb3B0aW9uXHJcbiAgICAgICBDcmVhdGVVcGRhdGVWaWV3LnNlbGVjdExvY2F0aW9ucy52YWwobW9kZWwuc3RhZmYubG9jYXRpb25JZCk7XHJcblxyXG4gICAgICAgICAvLyBDcmVhdGVVcGRhdGVWaWV3LnNlbGVjdExvY2F0aW9ucy5maW5kKCc6b3B0aW9uW3ZhbHVlPVwiJyArIG1vZGVsLnN0YWZmLmxvY2F0aW9uSWQgKyAnXCJdJykuYXR0cignc2VsZWN0ZWQnLCAnc2VsZWN0ZWQnKTtcclxuXHJcbiAgICAgICBpZihtb2RlbC5zdGFmZi5pc0FjdGl2ZSl7XHJcbiAgICAgICAgIENyZWF0ZVVwZGF0ZVZpZXcuYWN0aXZlQ29udHJvbC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgIENyZWF0ZVVwZGF0ZVZpZXcuaW5BY3RpdmVDb250cm9sLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICB9ZWxzZXtcclxuICAgICAgICAgQ3JlYXRlVXBkYXRlVmlldy5hY3RpdmVDb250cm9sLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgIENyZWF0ZVVwZGF0ZVZpZXcuaW5BY3RpdmVDb250cm9sLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgIH1cclxuXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb250cm9sbGVyLmluaXQoKTtcclxuXHJcbiAgfSgpKTtcclxuXHJcblxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
