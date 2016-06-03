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

validator = {
  isEmptyString: function(value){
    if(!value || 0 === value.trim().length){
      return true;
    }else{
      return false;
    }
  }
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
    console.log('medical programme js loaded ');

    var model = {
      programId: 0,
      programmeName: "",
      programeList:[],
      ProgrammeDetails:null
    };

    var controller = {
      init: function(){
        this.createModifyProgrammeUrl = links.createModifyProgrammeUrl;
        this.getProgrammeUrl = links.getProgrammeUrl;

        programmeView.init();


        var programmeId = utility.getURLParam('id');

        if(programmeId){
          //this is a update patients entry
          console.log('patient Id ' + programmeId);

          $.get( this.getProgrammeUrl , {id:programmeId})
          .done(function( response ) {
            console.log(JSON.stringify(response));

            model = response.data;
            programmeView.render();

          });

        }


      },
      clearModel: function(){
        model.programId = 0;
        model.programmeName = "";
        model.programeList = [];
        model.ProgrammeDetails = null;
        console.log('clear model');
      },
      getProgrammeList: function(){
        return model.programeList;
      },
      getProgrammeName: function(){
        return model.programmeName;
      },
      getCurrentProgrammeDetail: function(){
        return model.ProgrammeDetails;
      },
      setNewProgrammeDetailsModel: function(){
        model.ProgrammeDetails = {
          id:0,
          duration: "",
          text: "",
          vaccine: "",
          doseNo: "",
          index: 0
        };
      },
      removeProgramme: function(program){
        model.programeList.splice(program.index, 1);
        //re assigning the index
        for(var i = 0; i < model.programeList.length; i++){
          model.programeList[i].index = i;
        }
      },
      updateProgrammeName: function(name){
        model.programmeName = name;
      },
      addProgramme:  function(pduration, ptext, pvaccine, pdoseNo){
        var posn = model.programeList.length;


        if(model.ProgrammeDetails) {

          console.log('update programme details ' + pduration + ptext +   JSON.stringify(model.ProgrammeDetails) );

          model.ProgrammeDetails.duration = pduration;
          model.ProgrammeDetails.text = ptext;
          model.ProgrammeDetails.vaccine = pvaccine;
          model.ProgrammeDetails.doseNo = pdoseNo;

        }else{

          console.log('new programme details');

          model.ProgrammeDetails = {
            id:0,
            duration: pduration,
            text: ptext,
            vaccine: pvaccine,
            doseNo: pdoseNo,
            index: posn
          };
          model.programeList.push(model.ProgrammeDetails);
        }

        model.ProgrammeDetails = null;
        programmeView.clearForm();

      },
      persistProgramme: function(){

        //update the programme name
        model.programmeName =  programmeView.programmeName.val();



        $.post(controller.createModifyProgrammeUrl , model)
        .done(function( response ) {

          console.log('save response ' + JSON.stringify(response));
          controller.clearModel();
          programmeView.refreshForm();
        });
      }
    };

    var programmeView = {
      isFormValid:false,
      init: function(){
        this.programmeName = $('#programme-name');
        this.tableBody  = $('#programme-list-table-body');

        this.duration = $('#txt-duration');
        this.durationText = $('#txt-duration-text');
        this.vaccine = $('#txt-vaccine');
        this.doseNo = $('#txt-dose-no');


        this.groupProgrammeName = $('#group-programme-name');
        this.programmeNamehelpLabel = $('#help-programme-name');
        this.commonHelpLabel = $('#help-common-message');


        this.programmeName.on('change keyup paste ', function(){
          console.log();
          controller.updateProgrammeName(programmeView.programmeName.val())
        })


        //wiring events
        $('#btn-add-row').click((function(view){

          return function(){
            var durationVal = $('#txt-duration').val();
            var durationTextVal = $('#txt-duration-text').val();
            var vaccineVal = $('#txt-vaccine').val();
            var doseNoVal = $('#txt-dose-no').val();

            if(!durationVal ||
              !durationTextVal||
              !vaccineVal||
              !doseNoVal
            ){
              console.log('one of the filed is empty');
              programmeView.commonHelpLabel.removeClass('hidden');
              programmeView.commonHelpLabel.text('Please enter all details');
            }else{
              console.log('data entered ');
              controller.addProgramme(durationVal, durationTextVal, vaccineVal, doseNoVal);
              programmeView.commonHelpLabel.addClass('hidden');
              programmeView.render();
              console.log('model ' + JSON.stringify(model));
            }
          }

        })(programmeView));

        $('#btn-submit-programme').click(function(){
          console.log('save click');
          programmeView.validateForm();
          console.log('form is valid:' +  programmeView.isFormValid);
          if(programmeView.isFormValid){
            controller.persistProgramme();
          }
        });

        this.wireValidations();

      },
      refreshForm(){
        programmeView.groupProgrammeName.removeClass('has-error');
        programmeView.programmeNamehelpLabel.addClass('hidden');
        programmeView.commonHelpLabel.addClass('hidden');
        this.render();
        //resetting all validation errors
      },
      wireValidations: function(){

        this.programmeName.on('blur', function(){

          var programmeName = programmeView.programmeName.val();
          var isEmpty = validator.isEmptyString(programmeName);

          if(isEmpty){
            programmeView.groupProgrammeName.addClass('has-error');
            programmeView.programmeNamehelpLabel.removeClass('hidden');
          }else{
            programmeView.groupProgrammeName.removeClass('has-error');
            programmeView.programmeNamehelpLabel.addClass('hidden');
          }

        });

      },
      validateForm: function(){

        programmeView.isFormValid = true;

        var programmeName = programmeView.programmeName.val();
        var programmeList = controller.getProgrammeList();

        var isEmpty = validator.isEmptyString(programmeName);

        if(isEmpty){
          console.log('validae programme name' );
          programmeView.isFormValid = false;
          programmeView.groupProgrammeName.addClass('has-error');
          programmeView.programmeNamehelpLabel.removeClass('hidden');
        }else{
          programmeView.groupProgrammeName.removeClass('has-error');
          programmeView.programmeNamehelpLabel.addClass('hidden');
        }

        if(programmeList.length <= 0){
          console.log('programme list validation');
          programmeView.isFormValid = false;
          programmeView.commonHelpLabel.removeClass('hidden');
          programmeView.commonHelpLabel.text('Please enter atleast one programme entry');
        }else{
          programmeView.commonHelpLabel.addClass('hidden');
        }


      },
      clearForm: function(){
        this.duration.val('');
        this.durationText.val('');
        this.vaccine.val('');
        this.doseNo.val('');
      },
      render: function(){

        var programmeName = controller.getProgrammeName();
        var currentprogrammeDetail = controller.getCurrentProgrammeDetail();
        var programmeList = controller.getProgrammeList();

        //updating the values in the view

        this.programmeName.val(programmeName);

        if(currentprogrammeDetail){
          this.duration.val(currentprogrammeDetail.duration);
          this.durationText.val(currentprogrammeDetail.text);
          this.vaccine.val(currentprogrammeDetail.vaccine);
          this.doseNo.val(currentprogrammeDetail.doseNo);
        }

        //remove the added rows
        $('.prog-added-rows').remove();

        var tableHeaderClone = $('#programme-table-header').clone();
        //this.tableBody.prepend(tableHeaderClone);

        for(var i = 0; i < programmeList.length; i++){

          var tr = $('<tr/>');
          tr.addClass('prog-added-rows')

          var td = $('<td/>');
          td.text(programmeList[i].duration);
          tr.append(td);

          var td = $('<td/>');
          td.text(programmeList[i].text);
          tr.append(td);

          var td = $('<td/>');
          td.text(programmeList[i].vaccine);
          tr.append(td);

          var td = $('<td/>');
          td.text(programmeList[i].doseNo);
          tr.append(td);

          var td = $('<a/>',{
            text: 'Remove',
            class: "btn btn-default btn-sm"
          });

          td.click((function(programme){
            return function(){

              console.log(JSON.stringify(programme));
              //  programmeList[position -1] = null;

              console.log('remove click on: ' + JSON.stringify(programme));
              controller.removeProgramme(programme);
              programmeView.render();

            }

          })(programmeList[i]));

          tr.append(td);


          var editLink = $('<a/>',{
            text: 'Edit',
            class: ""
          });

          editLink.click((function(programme){
            return function(){

              console.log(JSON.stringify(programme));
              //  programmeList[position -1] = null

              model.ProgrammeDetails = programme;
              console.log('edit button: ' + JSON.stringify(programme));
              programmeView.render();

            }

          })(programmeList[i]));

          var td = $('<td/>');
          td.append(editLink);
          tr.append(td);


          this.tableBody.append(tr);
        }

      }
    };

    controller.init();

  }());

});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxpdHkuanMiLCJsaW5rcy5qcyIsInZhbGlkYXRvci5qcyIsImRvY3RvckRhc2hib2FyZC5qcyIsIm1lZGljYWwucHJvZ3JhbW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNySEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtZWRpY2FsLnByb2dyYW1tZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vaGVscGVyIGZ1bmN0aW9uIHRvIGdldCB0aGUgdXJsIHF1ZXJ5IHBhcmFtZXRlcnNcclxudmFyIHV0aWxpdHkgPSB7XHJcbiAgZ2V0VVJMUGFyYW06IGZ1bmN0aW9uKG5hbWUpe1xyXG4gICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xyXG5cclxuICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoL1tcXFtcXF1dL2csIFwiXFxcXCQmXCIpO1xyXG5cclxuICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAoXCJbPyZdXCIgKyBuYW1lICsgXCIoPShbXiYjXSopfCZ8I3wkKVwiKTtcclxuICAgIHZhciByZXN1bHRzID0gcmVnZXguZXhlYyh1cmwpO1xyXG5cclxuICAgIGlmICghcmVzdWx0cykgcmV0dXJuIG51bGw7XHJcbiAgICBpZiAoIXJlc3VsdHNbMl0pIHJldHVybiAnJztcclxuXHJcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHJlc3VsdHNbMl0ucmVwbGFjZSgvXFwrL2csIFwiIFwiKSk7XHJcbiAgfSxcclxuICBnZXRUaW1lTWludXRlc0FycmF5OiAgZnVuY3Rpb24oKXtcclxuXHJcbiAgfVxyXG59XHJcbiIsInZhciBsaW5rcyA9IHtcclxuXHJcbiAgLy9sb2dpbiBqcyB1cmxzXHJcbiAgIGF1dGhlbnRpY2F0ZVVybCA6IFwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9hdXRoZW5pdGNhdGVVc2VyXCIsXHJcbiAgIHN1Y2Nlc3NSZWRpcmVjdFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9cIixcclxuICAgcmVnaXN0ZXJEb2N0b3JVcmwgOiBcImluZGV4LnBocC9kb2N0b3IvZG9jdG9ySW5mb1wiLFxyXG4gICBhZG1pblVybDpcImluZGV4LnBocC9hZG1pbkRhc2hib2FyZC9hZG1pblwiLFxyXG5cclxuICAgLy9wYXNzd29yZCByZXNldFxyXG4gICBwYXNzd29yZFJlc3RSZXF1ZXN0VXJsOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvcmVzZXRQYXNzd29yZFJlcXVlc3RcIixcclxuICAgbG9naW5Vcmw6IFwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9sb2dpblwiLFxyXG4gICBwYXNzd29yZFJlc2V0VXJsOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvcGFzc3dvcmRSZXNldFwiLFxyXG4gICBmb3Jnb3RQYXNzd29yZFVybDogXCJpbmRleC5waHAvYXV0aGVudGljYXRlL2ZvcmdvdFBhc3N3b3JkXCIsXHJcblxyXG4gICAvL2FkbWluIHJlbGF0ZWRcclxuICAgZG9jdG9yTGlzdGluZ1VybDogXCJpbmRleC5waHAvYWRtaW5EYXNoYm9hcmQvZG9jdG9yTGlzdGluZ1wiLFxyXG5cclxuICAgbG9nb3V0VXJsIDogXCJpbmRleC5waHAvYXV0aGVudGljYXRlL2xvZ291dFwiLFxyXG5cclxuICAgLy9kb2N0b3IgZGFzaGJvYXJkIGxpbmtzXHJcbiAgIGRvY3RvclByb2ZpbGUgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvZG9jdG9yUHJvZmlsZVwiLFxyXG4gICBkYXNoYm9hcmRIb21lVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL1wiLFxyXG4gICBuZXdBcHBvaW50bWVudFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9ib29rQXBwb2ludG1lbnRcIixcclxuICAgcGF0aWVudHNFbnRyeVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wYXRpZW50c0VudHJ5XCIsXHJcbiAgIHBhdGllbnRzTGlzdGluZ1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wYXRpZW50c0xpc3RpbmdcIixcclxuICAgY2xvc2VBcHBvaW50bWVudFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jbG9zZUFwcG9pbnRtZW50XCIsXHJcbiAgIGRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2xpc3RBcHBvaW50bWVudFwiLFxyXG4gICBuZXdTY2hlZHVsZVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9uZXdTY2hlZHVsZVwiLFxyXG4gICBsaXN0U2NoZWR1bGVVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvc2NoZWR1bGVMaXN0XCIsXHJcbiAgIGdldFNjaGVkdWxlQ2FsZW5kYXJVcmw6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9TY2hlZHVsZUNhbGVuZGVyVmlld1wiLFxyXG4gICBhZGRTdGFmZlVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9zdGFmZkVudHJ5XCIsXHJcbiAgIGRvY3RvcnNTdGFmZkxpc3RpbmdVciA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9zdGFmZkxpc3RpbmdcIixcclxuICAgcGF0aWVudHNIaXN0b3J5VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3BhdGllbnRIaXN0b3J5XCIsXHJcbiAgIGNyZWF0ZVByb2dyYW1Gb3JQYXRpZW50VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2NyZWF0ZU1lZGljYWxQcm9ncmFtXCIsXHJcbiAgIHByb2dyYW1tZUxpc3RpbmdzVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3Byb2dyYW1tZUxpc3RcIixcclxuICAgTWFuYWdlTG9jYXRpb25zVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3dvcmtMb2NhdGlvbk1hbmFnZW1lbnRcIixcclxuICAgZ2V0QW5hbHl0aWNzVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL0FuYWx5dGljc1JlcG9ydFwiLFxyXG4gICBnZXRDYWxlbmRlclVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jYWxlbmRhclRlbXBsYXRlXCIsXHJcbiAgIGFjY291bnRpbmdVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvYWNjb3VudGluZ1wiLFxyXG4gICBtZWRpY2luZVNlYXJjaFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9tZWRpY2luZVNlYXJjaFwiLFxyXG5cclxuXHJcbiAgIC8vc2NoZWR1bGVcclxuICAgZ2V0TG9jYXRpb25Vcmw6IFwiaW5kZXgucGhwL2xvY2F0aW9ucy9nZXREb2N0b3JMb2NhdGlvbnNcIixcclxuICAgY3JlYXRlVXBkYXRlU2NoZWR1bGVVcmw6IFwiaW5kZXgucGhwL3NjaGVkdWxlL2NyZWF0ZVVwZGF0ZVNjaGVkdWxlXCIsXHJcbiAgIGdldFNlY2hkdWxlQ2FsZW5kYXJEZXRhaWxzVXJsOiBcImluZGV4LnBocC9zY2hlZHVsZS9nZXRDYWxhbmRlckRldGFpbHNcIixcclxuXHJcbiAgIC8vcHJvZ3JhbW1lXHJcbiAgIHByb2dyYW1tZUxpc3RVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldE1lZGljYXRpb25Qcm9ncmFtbWVMaXN0XCIsXHJcbiAgIHByb2dyYW1tZUVkaXRVcmw6XCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2NyZWF0ZU1lZGljYWxQcm9ncmFtXCIsXHJcbiAgIGNyZWF0ZU1vZGlmeVByb2dyYW1tZVVybDpcImluZGV4LnBocC9wcm9ncmFtbWUvY3JlYXRlTW9kaWZ5UHJvZ3JhbW1lXCIsXHJcbiAgIGdldFByb2dyYW1tZVVybDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0UHJvZ3JhbW1lc1wiLFxyXG5cclxuXHJcbiAgIC8vcGF0aWVudFxyXG4gICBwYXRpZW50RGV0YWlsUGVyc2lzdFVybDpcImluZGV4LnBocC9wYXRpZW50L2FkZFVwZGF0ZVBhdGllbnRcIixcclxuICAgcGF0aWVudHNEZXRhaWxzVXJsOlwiaW5kZXgucGhwL3BhdGllbnQvZ2V0UGF0aWVudERldGFpbHNcIixcclxuICAgbG9naW5DaGVja1VybDpcImluZGV4LnBocC9hdXRoZW50aWNhdGUvaXNMb2dnZWRJblwiLFxyXG4gICBnZXRQcm9ncmFtbWVMaXN0OlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRNZWRpY2F0aW9uUHJvZ3JhbW1lTGlzdFwiLFxyXG4gICBwcm9ncmFtbWVMaXN0RGV0YWlsc1VybDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0UHJvZ3JhbW1lTGlzdERldGFpbHNcIixcclxuICAgcGF0aWVudHNQcm9ncmFtbWVzVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRQYXRpZW50UHJvZ3JhbW1lc1wiLFxyXG4gICBwYXRpZW50TGlzdGluZ1VybDpcImluZGV4LnBocC9wYXRpZW50L2dldFBhdGllbnRMaXN0XCIsXHJcblxyXG4gICBzYXZlVXBkYXRlTG9jYXRpb25zOlwiaW5kZXgucGhwL2xvY2F0aW9ucy9hZGRVcGRhdGVMb2NhdGlvblwiLFxyXG4gICBsb2NhdGlvbkxpc3RVcmw6XCJpbmRleC5waHAvbG9jYXRpb25zL2dldERvY3RvckxvY2F0aW9uc1wiLFxyXG4gICBkZWxpdmVyeU1ldGhvZHNVcmw6XCJpbmRleC5waHAvcGF0aWVudC9nZXREZWxpdmVyeU1ldGhvZHNcIixcclxuXHJcblxyXG4gICAvL3JlZ2lzdGFydGlvblxyXG4gICBkb2N0b3JVcmw6XCJpbmRleC5waHAvZG9jdG9yL3NhdmVVcGRhdGVEb2N0b3JcIixcclxuICAgZG9jdG9yRGV0YWlsc1VybDpcImluZGV4LnBocC9kb2N0b3IvZ2V0RG9jdG9yRGV0YWlsc1wiLFxyXG4gICBsb2dpbkNoZWNrVXJsOlwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9pc0xvZ2dlZEluXCIsXHJcbiAgIGRvY3RvckRhc2hVcmw6XCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL1wiLFxyXG4gICBsb2dvdXRVcmw6XCJpbmRleC5waHAvYXV0aGVudGljYXRlL2xvZ291dFwiLFxyXG5cclxuICAgY3JlYXRlTW9kaWZ5U3RhZmZVcmw6XCJpbmRleC5waHAvc3RhZmYvY3JlYXRlTW9kaWZ5U3RhZmZcIixcclxuICAgZ2V0U3RhZmZEZXRhaWxzVXJsOiBcImluZGV4LnBocC9zdGFmZi9nZXRTdGFmZkRldGFpbHNcIixcclxuICAgc3RhZmZMaXN0aW5nVXJsOiBcImluZGV4LnBocC9zdGFmZi9nZXREb2N0b3JzU3RhZmZMaXN0XCJcclxuXHJcbn1cclxuIiwidmFsaWRhdG9yID0ge1xyXG4gIGlzRW1wdHlTdHJpbmc6IGZ1bmN0aW9uKHZhbHVlKXtcclxuICAgIGlmKCF2YWx1ZSB8fCAwID09PSB2YWx1ZS50cmltKCkubGVuZ3RoKXtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG5cclxuICAvL2RlZmluaW5nIHRoZSBoZWxwZXIgZnVuY3Rpb25zIGluIGdsb2JhbFxyXG5cclxuICAkKGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgY29uc29sZS5sb2coJ0RvY3RvciBEYXNoYm9hcmQganMgbG9hZGVkJyk7XHJcblxyXG4gICAgLy90b3AgbGV2ZWwgY29udHJvbGxlclxyXG4gICAgdmFyIGNvbnRyb2xsZXIgPSB7XHJcbiAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy93aXJpbmcgdGhlIG5hdmlnYXRpb25cclxuICAgICAgICB0aGlzLmxvZ291dFVybCA9IGxpbmtzLmxvZ291dFVybDtcclxuICAgICAgICB0aGlzLmRvY3RvclByb2ZpbGUgPSBsaW5rcy5kb2N0b3JQcm9maWxlO1xyXG4gICAgICAgIHRoaXMuZGFzaGJvYXJkSG9tZVVybCA9IGxpbmtzLmRhc2hib2FyZEhvbWVVcmw7XHJcbiAgICAgICAgdGhpcy5uZXdBcHBvaW50bWVudFVybCA9IGxpbmtzLm5ld0FwcG9pbnRtZW50VXJsO1xyXG4gICAgICAgIHRoaXMucGF0aWVudHNFbnRyeVVybCA9IGxpbmtzLnBhdGllbnRzRW50cnlVcmw7XHJcbiAgICAgICAgdGhpcy5wYXRpZW50c0xpc3RpbmdVcmwgPSBsaW5rcy5wYXRpZW50c0xpc3RpbmdVcmw7XHJcbiAgICAgICAgdGhpcy5jbG9zZUFwcG9pbnRtZW50VXJsID0gbGlua3MuY2xvc2VBcHBvaW50bWVudFVybDtcclxuICAgICAgICB0aGlzLmRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsID0gbGlua3MuZG9jdG9yc0FwcG9pbnRtZW50c0xpc3RVcmw7XHJcblxyXG4gICAgICAgIHRoaXMubmV3U2NoZWR1bGVVcmwgPSBsaW5rcy5uZXdTY2hlZHVsZVVybDtcclxuICAgICAgICB0aGlzLmxpc3RTY2hlZHVsZVVybCA9IHRoaXMubGlzdFNjaGVkdWxlVXJsO1xyXG4gICAgICAgIHRoaXMuU2NoZWR1bGVDYWxlbmRhclVybCA9IGxpbmtzLmdldFNjaGVkdWxlQ2FsZW5kYXJVcmw7XHJcbiAgICAgICAgdGhpcy5hZGRTdGFmZlVybCA9IGxpbmtzLmFkZFN0YWZmVXJsO1xyXG4gICAgICAgIHRoaXMuZG9jdG9yc1N0YWZmTGlzdGluZ1VyID0gbGlua3MuZG9jdG9yc1N0YWZmTGlzdGluZ1VyO1xyXG5cclxuICAgICAgICB0aGlzLnBhdGllbnRzSGlzdG9yeVVybCA9IGxpbmtzLnBhdGllbnRzSGlzdG9yeVVybDtcclxuXHJcbiAgICAgICAgdGhpcy5jcmVhdGVQcm9ncmFtRm9yUGF0aWVudFVybCA9IGxpbmtzLmNyZWF0ZVByb2dyYW1Gb3JQYXRpZW50VXJsIDtcclxuICAgICAgICB0aGlzLnByb2dyYW1tZUxpc3RpbmdzVXJsID0gbGlua3MucHJvZ3JhbW1lTGlzdGluZ3NVcmw7XHJcblxyXG4gICAgICAgIHRoaXMuTWFuYWdlTG9jYXRpb25zVXJsID0gbGlua3MuTWFuYWdlTG9jYXRpb25zVXJsO1xyXG4gICAgICAgIHRoaXMuQ2FsZW5kYXJUZW1wbGF0ZVVybCA9IGxpbmtzLmdldENhbGVuZGVyVXJsO1xyXG5cclxuICAgICAgICB0aGlzLmFuYWx5dGljc1JlcG9ydFVybCA9IGxpbmtzLmdldEFuYWx5dGljc1VybDtcclxuICAgICAgICB0aGlzLmFjY291bnRpbmdVcmwgPSBsaW5rcy5hY2NvdW50aW5nVXJsO1xyXG4gICAgICAgIHRoaXMubWVkaWNpbmVTZWFyY2hVcmwgPSBsaW5rcy5tZWRpY2luZVNlYXJjaFVybDtcclxuICAgICAgICAvL2RvIHNvbWV0aG5nIGFib3V0IGRvY3RvcnMgaW5mbyBhbmQgcmVnaXN0cmF0aW9uXHJcblxyXG4gICAgICAgIC8vVGhlIHVybCBmcm9tIHRoZSBicm93c2VyICBjYW4gYmUgY29tcGFyZWQgdG8gc2V0IHRoZSBhY3RpdmUgbmF2aWdhdGlvblxyXG4gICAgICAgIG5hdlZpZXcuaW5pdCgpO1xyXG5cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgbmF2VmlldyA9IHtcclxuICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgLy93aXJpbmcgdGhlIG5hdmlnYXRpb24gY2xpY2tzXHJcblxyXG5cclxuICAgICAgICAkKFwiI3Btcy1icmFuZC1idG4tbGlua1wiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdQTVMgYnJhbmQgY2xpY2snKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAkKFwiI3VzZXItUHJvZmlsZS1CdG4tTGlua1wiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5kb2N0b3JQcm9maWxlKTtcclxuXHJcbiAgICAgICAgJChcIiNkb2N0b3ItZGFzaC1sb2dvdXQtYnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmxvZ291dFVybCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgJChcIiNkYXNoYm9hcmQtU2VjdGlvbi1CdG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIuZGFzaGJvYXJkSG9tZVVybCk7XHJcblxyXG4gICAgICAgICQoXCIjYXBwb2ludG1lbnQtc2VjdGlvbi1saW5rLWJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5kb2N0b3JzQXBwb2ludG1lbnRzTGlzdFVybCk7XHJcblxyXG4gICAgICAgICQoXCIjbWFuYWdlLURvY3RvcnMtU2NoZWR1bGUtU2VjdGlvbi1MaW5rLUJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5TY2hlZHVsZUNhbGVuZGFyVXJsKTtcclxuXHJcbiAgICAgICAgJChcIiNidG4tcHJvZ3JhbW1lLXNlY3Rpb24tbGlua1wiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5wcm9ncmFtbWVMaXN0aW5nc1VybCk7XHJcblxyXG4gICAgICAgICQoXCIjY3JlYXRlLXByb2dyYW0tZm9yLXBhdGllbnQtc2VjdGlvblwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5jcmVhdGVQcm9ncmFtRm9yUGF0aWVudFVybCk7XHJcblxyXG4gICAgICAgICQoXCIjcGF0aWVudHMtRW50cnktU2VjdGlvbi1MaW5rLUJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5wYXRpZW50c0xpc3RpbmdVcmwpO1xyXG5cclxuICAgICAgICAvLyQoXCIjcGF0aWVudHMtZW50cnktY3JlYXRlLXNlY3Rpb24tbGluay1CdG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIucGF0aWVudHNFbnRyeVVybCk7XHJcbiAgICAgICAgLy8kKFwiI3BhdGllbnRzLUhpc3RvcnktU2VjdGlvbi1MaW5rLUJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5wYXRpZW50c0hpc3RvcnlVcmwpO1xyXG5cclxuICAgICAgICAkKFwiI3N0YWZmLW1hbmFnbWVudC1zZWN0aW9uLWxpbmstYnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmRvY3RvcnNTdGFmZkxpc3RpbmdVcik7XHJcblxyXG4gICAgICAgICQoXCIjYnRuLW1hbmFnZS1sb2NhdGlvbnNcIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIuTWFuYWdlTG9jYXRpb25zVXJsKTtcclxuXHJcbiAgICAgICAgJChcIiNhbmFseXRpY3Mtc2lkZS1uYXZpZ2F0aW9uLWxpbmstYnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmFuYWx5dGljc1JlcG9ydFVybCk7XHJcbiAgICAgICAgJChcIiNhY2NvdW50aW5nLXNpZGUtbmF2aWdhdGlvbi1saW5rLWJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5hY2NvdW50aW5nVXJsKTtcclxuICAgICAgICAkKFwiI21lZGljaW5lLXNpZGUtbmF2aWdhdGlvbi1saW5rLWJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5tZWRpY2luZVNlYXJjaFVybCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8kKFwiI2Jvb2stQXBwb2ludG1lbnRzLVNlY3Rpb24tQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLm5ld0FwcG9pbnRtZW50VXJsKTtcclxuICAgICAgICAvLyQoXCIjY2xvc2UtQm9vay1BcHBvaW50bWVudC1TZWN0aW9uLUxpbmstQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmNsb3NlQXBwb2ludG1lbnRVcmwpO1xyXG4gICAgICAgIC8vJChcIiN2aWV3LUFwcG9pbnRtZW50LVNlY3Rpb24tTGluay1CdG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIuZG9jdG9yc0FwcG9pbnRtZW50c0xpc3RVcmwpO1xyXG4gICAgICAgIC8vJChcIiNtYW5hZ2UtRG9jdG9ycy1TY2hlZHVsZS1TZWN0aW9uLUxpbmstQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmxpc3RTY2hlZHVsZVVybCk7XHJcbiAgICAgICAgLy8kKFwiI21hbmFnZS1zY2hlZHVsZS1jcmVhdGUtc2VjdGlvbi1saW5rLUJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5uZXdTY2hlZHVsZVVybCk7XHJcbiAgICAgICAgLy8kKFwiI2NhbGVuZGFyLVRlbXBsYXRlLUJ0bi1MaW5rXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLkNhbGVuZGFyVGVtcGxhdGVVcmwpO1xyXG4gICAgICAgIC8vJChcIiNtYW5hZ2Utc2NoZWR1bGUtbGlzdC1zZWN0aW9uLWxpbmstQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLlNjaGVkdWxlQ2FsZW5kYXJVcmwpO1xyXG5cclxuICAgICAgICAkKFwiI290aGVyLXNldHRpbmdzLXNlY3Rpb24tbGluay1idG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChcIiNjYWxlbmRhci10ZW1wbGF0ZS1zZWN0aW9uLWxpbmstYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgIH0sXHJcbiAgICAgIHJlbmRlcjogZnVuY3Rpb24oKXtcclxuICAgICAgICAvL2hpZ2hsaWdodCB0aGUgcmlnaHQgbmF2aWdhdGlvblxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29udHJvbGxlci5pbml0KCk7XHJcblxyXG4gIH0oKSk7XHJcblxyXG59KTtcclxuIiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuXHJcbiAgJChmdW5jdGlvbigpe1xyXG4gICAgY29uc29sZS5sb2coJ21lZGljYWwgcHJvZ3JhbW1lIGpzIGxvYWRlZCAnKTtcclxuXHJcbiAgICB2YXIgbW9kZWwgPSB7XHJcbiAgICAgIHByb2dyYW1JZDogMCxcclxuICAgICAgcHJvZ3JhbW1lTmFtZTogXCJcIixcclxuICAgICAgcHJvZ3JhbWVMaXN0OltdLFxyXG4gICAgICBQcm9ncmFtbWVEZXRhaWxzOm51bGxcclxuICAgIH07XHJcblxyXG4gICAgdmFyIGNvbnRyb2xsZXIgPSB7XHJcbiAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVNb2RpZnlQcm9ncmFtbWVVcmwgPSBsaW5rcy5jcmVhdGVNb2RpZnlQcm9ncmFtbWVVcmw7XHJcbiAgICAgICAgdGhpcy5nZXRQcm9ncmFtbWVVcmwgPSBsaW5rcy5nZXRQcm9ncmFtbWVVcmw7XHJcblxyXG4gICAgICAgIHByb2dyYW1tZVZpZXcuaW5pdCgpO1xyXG5cclxuXHJcbiAgICAgICAgdmFyIHByb2dyYW1tZUlkID0gdXRpbGl0eS5nZXRVUkxQYXJhbSgnaWQnKTtcclxuXHJcbiAgICAgICAgaWYocHJvZ3JhbW1lSWQpe1xyXG4gICAgICAgICAgLy90aGlzIGlzIGEgdXBkYXRlIHBhdGllbnRzIGVudHJ5XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygncGF0aWVudCBJZCAnICsgcHJvZ3JhbW1lSWQpO1xyXG5cclxuICAgICAgICAgICQuZ2V0KCB0aGlzLmdldFByb2dyYW1tZVVybCAsIHtpZDpwcm9ncmFtbWVJZH0pXHJcbiAgICAgICAgICAuZG9uZShmdW5jdGlvbiggcmVzcG9uc2UgKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSk7XHJcblxyXG4gICAgICAgICAgICBtb2RlbCA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICAgIHByb2dyYW1tZVZpZXcucmVuZGVyKCk7XHJcblxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICB9LFxyXG4gICAgICBjbGVhck1vZGVsOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIG1vZGVsLnByb2dyYW1JZCA9IDA7XHJcbiAgICAgICAgbW9kZWwucHJvZ3JhbW1lTmFtZSA9IFwiXCI7XHJcbiAgICAgICAgbW9kZWwucHJvZ3JhbWVMaXN0ID0gW107XHJcbiAgICAgICAgbW9kZWwuUHJvZ3JhbW1lRGV0YWlscyA9IG51bGw7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2NsZWFyIG1vZGVsJyk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGdldFByb2dyYW1tZUxpc3Q6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIG1vZGVsLnByb2dyYW1lTGlzdDtcclxuICAgICAgfSxcclxuICAgICAgZ2V0UHJvZ3JhbW1lTmFtZTogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gbW9kZWwucHJvZ3JhbW1lTmFtZTtcclxuICAgICAgfSxcclxuICAgICAgZ2V0Q3VycmVudFByb2dyYW1tZURldGFpbDogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gbW9kZWwuUHJvZ3JhbW1lRGV0YWlscztcclxuICAgICAgfSxcclxuICAgICAgc2V0TmV3UHJvZ3JhbW1lRGV0YWlsc01vZGVsOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIG1vZGVsLlByb2dyYW1tZURldGFpbHMgPSB7XHJcbiAgICAgICAgICBpZDowLFxyXG4gICAgICAgICAgZHVyYXRpb246IFwiXCIsXHJcbiAgICAgICAgICB0ZXh0OiBcIlwiLFxyXG4gICAgICAgICAgdmFjY2luZTogXCJcIixcclxuICAgICAgICAgIGRvc2VObzogXCJcIixcclxuICAgICAgICAgIGluZGV4OiAwXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgICAgcmVtb3ZlUHJvZ3JhbW1lOiBmdW5jdGlvbihwcm9ncmFtKXtcclxuICAgICAgICBtb2RlbC5wcm9ncmFtZUxpc3Quc3BsaWNlKHByb2dyYW0uaW5kZXgsIDEpO1xyXG4gICAgICAgIC8vcmUgYXNzaWduaW5nIHRoZSBpbmRleFxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBtb2RlbC5wcm9ncmFtZUxpc3QubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgbW9kZWwucHJvZ3JhbWVMaXN0W2ldLmluZGV4ID0gaTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHVwZGF0ZVByb2dyYW1tZU5hbWU6IGZ1bmN0aW9uKG5hbWUpe1xyXG4gICAgICAgIG1vZGVsLnByb2dyYW1tZU5hbWUgPSBuYW1lO1xyXG4gICAgICB9LFxyXG4gICAgICBhZGRQcm9ncmFtbWU6ICBmdW5jdGlvbihwZHVyYXRpb24sIHB0ZXh0LCBwdmFjY2luZSwgcGRvc2VObyl7XHJcbiAgICAgICAgdmFyIHBvc24gPSBtb2RlbC5wcm9ncmFtZUxpc3QubGVuZ3RoO1xyXG5cclxuXHJcbiAgICAgICAgaWYobW9kZWwuUHJvZ3JhbW1lRGV0YWlscykge1xyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKCd1cGRhdGUgcHJvZ3JhbW1lIGRldGFpbHMgJyArIHBkdXJhdGlvbiArIHB0ZXh0ICsgICBKU09OLnN0cmluZ2lmeShtb2RlbC5Qcm9ncmFtbWVEZXRhaWxzKSApO1xyXG5cclxuICAgICAgICAgIG1vZGVsLlByb2dyYW1tZURldGFpbHMuZHVyYXRpb24gPSBwZHVyYXRpb247XHJcbiAgICAgICAgICBtb2RlbC5Qcm9ncmFtbWVEZXRhaWxzLnRleHQgPSBwdGV4dDtcclxuICAgICAgICAgIG1vZGVsLlByb2dyYW1tZURldGFpbHMudmFjY2luZSA9IHB2YWNjaW5lO1xyXG4gICAgICAgICAgbW9kZWwuUHJvZ3JhbW1lRGV0YWlscy5kb3NlTm8gPSBwZG9zZU5vO1xyXG5cclxuICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnbmV3IHByb2dyYW1tZSBkZXRhaWxzJyk7XHJcblxyXG4gICAgICAgICAgbW9kZWwuUHJvZ3JhbW1lRGV0YWlscyA9IHtcclxuICAgICAgICAgICAgaWQ6MCxcclxuICAgICAgICAgICAgZHVyYXRpb246IHBkdXJhdGlvbixcclxuICAgICAgICAgICAgdGV4dDogcHRleHQsXHJcbiAgICAgICAgICAgIHZhY2NpbmU6IHB2YWNjaW5lLFxyXG4gICAgICAgICAgICBkb3NlTm86IHBkb3NlTm8sXHJcbiAgICAgICAgICAgIGluZGV4OiBwb3NuXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgbW9kZWwucHJvZ3JhbWVMaXN0LnB1c2gobW9kZWwuUHJvZ3JhbW1lRGV0YWlscyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtb2RlbC5Qcm9ncmFtbWVEZXRhaWxzID0gbnVsbDtcclxuICAgICAgICBwcm9ncmFtbWVWaWV3LmNsZWFyRm9ybSgpO1xyXG5cclxuICAgICAgfSxcclxuICAgICAgcGVyc2lzdFByb2dyYW1tZTogZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgLy91cGRhdGUgdGhlIHByb2dyYW1tZSBuYW1lXHJcbiAgICAgICAgbW9kZWwucHJvZ3JhbW1lTmFtZSA9ICBwcm9ncmFtbWVWaWV3LnByb2dyYW1tZU5hbWUudmFsKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgJC5wb3N0KGNvbnRyb2xsZXIuY3JlYXRlTW9kaWZ5UHJvZ3JhbW1lVXJsICwgbW9kZWwpXHJcbiAgICAgICAgLmRvbmUoZnVuY3Rpb24oIHJlc3BvbnNlICkge1xyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdzYXZlIHJlc3BvbnNlICcgKyBKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xyXG4gICAgICAgICAgY29udHJvbGxlci5jbGVhck1vZGVsKCk7XHJcbiAgICAgICAgICBwcm9ncmFtbWVWaWV3LnJlZnJlc2hGb3JtKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdmFyIHByb2dyYW1tZVZpZXcgPSB7XHJcbiAgICAgIGlzRm9ybVZhbGlkOmZhbHNlLFxyXG4gICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMucHJvZ3JhbW1lTmFtZSA9ICQoJyNwcm9ncmFtbWUtbmFtZScpO1xyXG4gICAgICAgIHRoaXMudGFibGVCb2R5ICA9ICQoJyNwcm9ncmFtbWUtbGlzdC10YWJsZS1ib2R5Jyk7XHJcblxyXG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSAkKCcjdHh0LWR1cmF0aW9uJyk7XHJcbiAgICAgICAgdGhpcy5kdXJhdGlvblRleHQgPSAkKCcjdHh0LWR1cmF0aW9uLXRleHQnKTtcclxuICAgICAgICB0aGlzLnZhY2NpbmUgPSAkKCcjdHh0LXZhY2NpbmUnKTtcclxuICAgICAgICB0aGlzLmRvc2VObyA9ICQoJyN0eHQtZG9zZS1ubycpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5ncm91cFByb2dyYW1tZU5hbWUgPSAkKCcjZ3JvdXAtcHJvZ3JhbW1lLW5hbWUnKTtcclxuICAgICAgICB0aGlzLnByb2dyYW1tZU5hbWVoZWxwTGFiZWwgPSAkKCcjaGVscC1wcm9ncmFtbWUtbmFtZScpO1xyXG4gICAgICAgIHRoaXMuY29tbW9uSGVscExhYmVsID0gJCgnI2hlbHAtY29tbW9uLW1lc3NhZ2UnKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMucHJvZ3JhbW1lTmFtZS5vbignY2hhbmdlIGtleXVwIHBhc3RlICcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygpO1xyXG4gICAgICAgICAgY29udHJvbGxlci51cGRhdGVQcm9ncmFtbWVOYW1lKHByb2dyYW1tZVZpZXcucHJvZ3JhbW1lTmFtZS52YWwoKSlcclxuICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgLy93aXJpbmcgZXZlbnRzXHJcbiAgICAgICAgJCgnI2J0bi1hZGQtcm93JykuY2xpY2soKGZ1bmN0aW9uKHZpZXcpe1xyXG5cclxuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgZHVyYXRpb25WYWwgPSAkKCcjdHh0LWR1cmF0aW9uJykudmFsKCk7XHJcbiAgICAgICAgICAgIHZhciBkdXJhdGlvblRleHRWYWwgPSAkKCcjdHh0LWR1cmF0aW9uLXRleHQnKS52YWwoKTtcclxuICAgICAgICAgICAgdmFyIHZhY2NpbmVWYWwgPSAkKCcjdHh0LXZhY2NpbmUnKS52YWwoKTtcclxuICAgICAgICAgICAgdmFyIGRvc2VOb1ZhbCA9ICQoJyN0eHQtZG9zZS1ubycpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgaWYoIWR1cmF0aW9uVmFsIHx8XHJcbiAgICAgICAgICAgICAgIWR1cmF0aW9uVGV4dFZhbHx8XHJcbiAgICAgICAgICAgICAgIXZhY2NpbmVWYWx8fFxyXG4gICAgICAgICAgICAgICFkb3NlTm9WYWxcclxuICAgICAgICAgICAgKXtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnb25lIG9mIHRoZSBmaWxlZCBpcyBlbXB0eScpO1xyXG4gICAgICAgICAgICAgIHByb2dyYW1tZVZpZXcuY29tbW9uSGVscExhYmVsLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICBwcm9ncmFtbWVWaWV3LmNvbW1vbkhlbHBMYWJlbC50ZXh0KCdQbGVhc2UgZW50ZXIgYWxsIGRldGFpbHMnKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RhdGEgZW50ZXJlZCAnKTtcclxuICAgICAgICAgICAgICBjb250cm9sbGVyLmFkZFByb2dyYW1tZShkdXJhdGlvblZhbCwgZHVyYXRpb25UZXh0VmFsLCB2YWNjaW5lVmFsLCBkb3NlTm9WYWwpO1xyXG4gICAgICAgICAgICAgIHByb2dyYW1tZVZpZXcuY29tbW9uSGVscExhYmVsLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICBwcm9ncmFtbWVWaWV3LnJlbmRlcigpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtb2RlbCAnICsgSlNPTi5zdHJpbmdpZnkobW9kZWwpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KShwcm9ncmFtbWVWaWV3KSk7XHJcblxyXG4gICAgICAgICQoJyNidG4tc3VibWl0LXByb2dyYW1tZScpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnc2F2ZSBjbGljaycpO1xyXG4gICAgICAgICAgcHJvZ3JhbW1lVmlldy52YWxpZGF0ZUZvcm0oKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdmb3JtIGlzIHZhbGlkOicgKyAgcHJvZ3JhbW1lVmlldy5pc0Zvcm1WYWxpZCk7XHJcbiAgICAgICAgICBpZihwcm9ncmFtbWVWaWV3LmlzRm9ybVZhbGlkKXtcclxuICAgICAgICAgICAgY29udHJvbGxlci5wZXJzaXN0UHJvZ3JhbW1lKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMud2lyZVZhbGlkYXRpb25zKCk7XHJcblxyXG4gICAgICB9LFxyXG4gICAgICByZWZyZXNoRm9ybSgpe1xyXG4gICAgICAgIHByb2dyYW1tZVZpZXcuZ3JvdXBQcm9ncmFtbWVOYW1lLnJlbW92ZUNsYXNzKCdoYXMtZXJyb3InKTtcclxuICAgICAgICBwcm9ncmFtbWVWaWV3LnByb2dyYW1tZU5hbWVoZWxwTGFiZWwuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgIHByb2dyYW1tZVZpZXcuY29tbW9uSGVscExhYmVsLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIC8vcmVzZXR0aW5nIGFsbCB2YWxpZGF0aW9uIGVycm9yc1xyXG4gICAgICB9LFxyXG4gICAgICB3aXJlVmFsaWRhdGlvbnM6IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIHRoaXMucHJvZ3JhbW1lTmFtZS5vbignYmx1cicsIGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgdmFyIHByb2dyYW1tZU5hbWUgPSBwcm9ncmFtbWVWaWV3LnByb2dyYW1tZU5hbWUudmFsKCk7XHJcbiAgICAgICAgICB2YXIgaXNFbXB0eSA9IHZhbGlkYXRvci5pc0VtcHR5U3RyaW5nKHByb2dyYW1tZU5hbWUpO1xyXG5cclxuICAgICAgICAgIGlmKGlzRW1wdHkpe1xyXG4gICAgICAgICAgICBwcm9ncmFtbWVWaWV3Lmdyb3VwUHJvZ3JhbW1lTmFtZS5hZGRDbGFzcygnaGFzLWVycm9yJyk7XHJcbiAgICAgICAgICAgIHByb2dyYW1tZVZpZXcucHJvZ3JhbW1lTmFtZWhlbHBMYWJlbC5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcHJvZ3JhbW1lVmlldy5ncm91cFByb2dyYW1tZU5hbWUucmVtb3ZlQ2xhc3MoJ2hhcy1lcnJvcicpO1xyXG4gICAgICAgICAgICBwcm9ncmFtbWVWaWV3LnByb2dyYW1tZU5hbWVoZWxwTGFiZWwuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIH0sXHJcbiAgICAgIHZhbGlkYXRlRm9ybTogZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgcHJvZ3JhbW1lVmlldy5pc0Zvcm1WYWxpZCA9IHRydWU7XHJcblxyXG4gICAgICAgIHZhciBwcm9ncmFtbWVOYW1lID0gcHJvZ3JhbW1lVmlldy5wcm9ncmFtbWVOYW1lLnZhbCgpO1xyXG4gICAgICAgIHZhciBwcm9ncmFtbWVMaXN0ID0gY29udHJvbGxlci5nZXRQcm9ncmFtbWVMaXN0KCk7XHJcblxyXG4gICAgICAgIHZhciBpc0VtcHR5ID0gdmFsaWRhdG9yLmlzRW1wdHlTdHJpbmcocHJvZ3JhbW1lTmFtZSk7XHJcblxyXG4gICAgICAgIGlmKGlzRW1wdHkpe1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ3ZhbGlkYWUgcHJvZ3JhbW1lIG5hbWUnICk7XHJcbiAgICAgICAgICBwcm9ncmFtbWVWaWV3LmlzRm9ybVZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICBwcm9ncmFtbWVWaWV3Lmdyb3VwUHJvZ3JhbW1lTmFtZS5hZGRDbGFzcygnaGFzLWVycm9yJyk7XHJcbiAgICAgICAgICBwcm9ncmFtbWVWaWV3LnByb2dyYW1tZU5hbWVoZWxwTGFiZWwucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgcHJvZ3JhbW1lVmlldy5ncm91cFByb2dyYW1tZU5hbWUucmVtb3ZlQ2xhc3MoJ2hhcy1lcnJvcicpO1xyXG4gICAgICAgICAgcHJvZ3JhbW1lVmlldy5wcm9ncmFtbWVOYW1laGVscExhYmVsLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHByb2dyYW1tZUxpc3QubGVuZ3RoIDw9IDApe1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ3Byb2dyYW1tZSBsaXN0IHZhbGlkYXRpb24nKTtcclxuICAgICAgICAgIHByb2dyYW1tZVZpZXcuaXNGb3JtVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgIHByb2dyYW1tZVZpZXcuY29tbW9uSGVscExhYmVsLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgIHByb2dyYW1tZVZpZXcuY29tbW9uSGVscExhYmVsLnRleHQoJ1BsZWFzZSBlbnRlciBhdGxlYXN0IG9uZSBwcm9ncmFtbWUgZW50cnknKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIHByb2dyYW1tZVZpZXcuY29tbW9uSGVscExhYmVsLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgfSxcclxuICAgICAgY2xlYXJGb3JtOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuZHVyYXRpb24udmFsKCcnKTtcclxuICAgICAgICB0aGlzLmR1cmF0aW9uVGV4dC52YWwoJycpO1xyXG4gICAgICAgIHRoaXMudmFjY2luZS52YWwoJycpO1xyXG4gICAgICAgIHRoaXMuZG9zZU5vLnZhbCgnJyk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHJlbmRlcjogZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgdmFyIHByb2dyYW1tZU5hbWUgPSBjb250cm9sbGVyLmdldFByb2dyYW1tZU5hbWUoKTtcclxuICAgICAgICB2YXIgY3VycmVudHByb2dyYW1tZURldGFpbCA9IGNvbnRyb2xsZXIuZ2V0Q3VycmVudFByb2dyYW1tZURldGFpbCgpO1xyXG4gICAgICAgIHZhciBwcm9ncmFtbWVMaXN0ID0gY29udHJvbGxlci5nZXRQcm9ncmFtbWVMaXN0KCk7XHJcblxyXG4gICAgICAgIC8vdXBkYXRpbmcgdGhlIHZhbHVlcyBpbiB0aGUgdmlld1xyXG5cclxuICAgICAgICB0aGlzLnByb2dyYW1tZU5hbWUudmFsKHByb2dyYW1tZU5hbWUpO1xyXG5cclxuICAgICAgICBpZihjdXJyZW50cHJvZ3JhbW1lRGV0YWlsKXtcclxuICAgICAgICAgIHRoaXMuZHVyYXRpb24udmFsKGN1cnJlbnRwcm9ncmFtbWVEZXRhaWwuZHVyYXRpb24pO1xyXG4gICAgICAgICAgdGhpcy5kdXJhdGlvblRleHQudmFsKGN1cnJlbnRwcm9ncmFtbWVEZXRhaWwudGV4dCk7XHJcbiAgICAgICAgICB0aGlzLnZhY2NpbmUudmFsKGN1cnJlbnRwcm9ncmFtbWVEZXRhaWwudmFjY2luZSk7XHJcbiAgICAgICAgICB0aGlzLmRvc2VOby52YWwoY3VycmVudHByb2dyYW1tZURldGFpbC5kb3NlTm8pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9yZW1vdmUgdGhlIGFkZGVkIHJvd3NcclxuICAgICAgICAkKCcucHJvZy1hZGRlZC1yb3dzJykucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgIHZhciB0YWJsZUhlYWRlckNsb25lID0gJCgnI3Byb2dyYW1tZS10YWJsZS1oZWFkZXInKS5jbG9uZSgpO1xyXG4gICAgICAgIC8vdGhpcy50YWJsZUJvZHkucHJlcGVuZCh0YWJsZUhlYWRlckNsb25lKTtcclxuXHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHByb2dyYW1tZUxpc3QubGVuZ3RoOyBpKyspe1xyXG5cclxuICAgICAgICAgIHZhciB0ciA9ICQoJzx0ci8+Jyk7XHJcbiAgICAgICAgICB0ci5hZGRDbGFzcygncHJvZy1hZGRlZC1yb3dzJylcclxuXHJcbiAgICAgICAgICB2YXIgdGQgPSAkKCc8dGQvPicpO1xyXG4gICAgICAgICAgdGQudGV4dChwcm9ncmFtbWVMaXN0W2ldLmR1cmF0aW9uKTtcclxuICAgICAgICAgIHRyLmFwcGVuZCh0ZCk7XHJcblxyXG4gICAgICAgICAgdmFyIHRkID0gJCgnPHRkLz4nKTtcclxuICAgICAgICAgIHRkLnRleHQocHJvZ3JhbW1lTGlzdFtpXS50ZXh0KTtcclxuICAgICAgICAgIHRyLmFwcGVuZCh0ZCk7XHJcblxyXG4gICAgICAgICAgdmFyIHRkID0gJCgnPHRkLz4nKTtcclxuICAgICAgICAgIHRkLnRleHQocHJvZ3JhbW1lTGlzdFtpXS52YWNjaW5lKTtcclxuICAgICAgICAgIHRyLmFwcGVuZCh0ZCk7XHJcblxyXG4gICAgICAgICAgdmFyIHRkID0gJCgnPHRkLz4nKTtcclxuICAgICAgICAgIHRkLnRleHQocHJvZ3JhbW1lTGlzdFtpXS5kb3NlTm8pO1xyXG4gICAgICAgICAgdHIuYXBwZW5kKHRkKTtcclxuXHJcbiAgICAgICAgICB2YXIgdGQgPSAkKCc8YS8+Jyx7XHJcbiAgICAgICAgICAgIHRleHQ6ICdSZW1vdmUnLFxyXG4gICAgICAgICAgICBjbGFzczogXCJidG4gYnRuLWRlZmF1bHQgYnRuLXNtXCJcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIHRkLmNsaWNrKChmdW5jdGlvbihwcm9ncmFtbWUpe1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocHJvZ3JhbW1lKSk7XHJcbiAgICAgICAgICAgICAgLy8gIHByb2dyYW1tZUxpc3RbcG9zaXRpb24gLTFdID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlbW92ZSBjbGljayBvbjogJyArIEpTT04uc3RyaW5naWZ5KHByb2dyYW1tZSkpO1xyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIucmVtb3ZlUHJvZ3JhbW1lKHByb2dyYW1tZSk7XHJcbiAgICAgICAgICAgICAgcHJvZ3JhbW1lVmlldy5yZW5kZXIoKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB9KShwcm9ncmFtbWVMaXN0W2ldKSk7XHJcblxyXG4gICAgICAgICAgdHIuYXBwZW5kKHRkKTtcclxuXHJcblxyXG4gICAgICAgICAgdmFyIGVkaXRMaW5rID0gJCgnPGEvPicse1xyXG4gICAgICAgICAgICB0ZXh0OiAnRWRpdCcsXHJcbiAgICAgICAgICAgIGNsYXNzOiBcIlwiXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBlZGl0TGluay5jbGljaygoZnVuY3Rpb24ocHJvZ3JhbW1lKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHByb2dyYW1tZSkpO1xyXG4gICAgICAgICAgICAgIC8vICBwcm9ncmFtbWVMaXN0W3Bvc2l0aW9uIC0xXSA9IG51bGxcclxuXHJcbiAgICAgICAgICAgICAgbW9kZWwuUHJvZ3JhbW1lRGV0YWlscyA9IHByb2dyYW1tZTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZWRpdCBidXR0b246ICcgKyBKU09OLnN0cmluZ2lmeShwcm9ncmFtbWUpKTtcclxuICAgICAgICAgICAgICBwcm9ncmFtbWVWaWV3LnJlbmRlcigpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH0pKHByb2dyYW1tZUxpc3RbaV0pKTtcclxuXHJcbiAgICAgICAgICB2YXIgdGQgPSAkKCc8dGQvPicpO1xyXG4gICAgICAgICAgdGQuYXBwZW5kKGVkaXRMaW5rKTtcclxuICAgICAgICAgIHRyLmFwcGVuZCh0ZCk7XHJcblxyXG5cclxuICAgICAgICAgIHRoaXMudGFibGVCb2R5LmFwcGVuZCh0cik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb250cm9sbGVyLmluaXQoKTtcclxuXHJcbiAgfSgpKTtcclxuXHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
