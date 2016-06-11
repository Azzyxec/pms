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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxpdHkuanMiLCJsaW5rcy5qcyIsInZhbGlkYXRvci5qcyIsImRvY3RvckRhc2hib2FyZC5qcyIsIm1lZGljYWwucHJvZ3JhbW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWVkaWNhbC5wcm9ncmFtbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL2hlbHBlciBmdW5jdGlvbiB0byBnZXQgdGhlIHVybCBxdWVyeSBwYXJhbWV0ZXJzXHJcbnZhciB1dGlsaXR5ID0ge1xyXG4gIGdldFVSTFBhcmFtOiBmdW5jdGlvbihuYW1lKXtcclxuICAgIHZhciB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuXHJcbiAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC9bXFxbXFxdXS9nLCBcIlxcXFwkJlwiKTtcclxuXHJcbiAgICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKFwiWz8mXVwiICsgbmFtZSArIFwiKD0oW14mI10qKXwmfCN8JClcIik7XHJcbiAgICB2YXIgcmVzdWx0cyA9IHJlZ2V4LmV4ZWModXJsKTtcclxuXHJcbiAgICBpZiAoIXJlc3VsdHMpIHJldHVybiBudWxsO1xyXG4gICAgaWYgKCFyZXN1bHRzWzJdKSByZXR1cm4gJyc7XHJcblxyXG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHRzWzJdLnJlcGxhY2UoL1xcKy9nLCBcIiBcIikpO1xyXG4gIH0sXHJcbiAgZ2V0VGltZU1pbnV0ZXNBcnJheTogIGZ1bmN0aW9uKCl7XHJcblxyXG4gIH1cclxufVxyXG4iLCJ2YXIgbGlua3MgPSB7XHJcblxyXG4gIC8vbG9naW4ganMgdXJsc1xyXG4gICBhdXRoZW50aWNhdGVVcmwgOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvYXV0aGVuaXRjYXRlVXNlclwiLFxyXG4gICBzdWNjZXNzUmVkaXJlY3RVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvXCIsXHJcbiAgIHJlZ2lzdGVyRG9jdG9yVXJsIDogXCJpbmRleC5waHAvZG9jdG9yL2RvY3RvckluZm9cIixcclxuICAgYWRtaW5Vcmw6XCJpbmRleC5waHAvYWRtaW5EYXNoYm9hcmQvYWRtaW5cIixcclxuXHJcbiAgIC8vcGFzc3dvcmQgcmVzZXRcclxuICAgcGFzc3dvcmRSZXN0UmVxdWVzdFVybDogXCJpbmRleC5waHAvYXV0aGVudGljYXRlL3Jlc2V0UGFzc3dvcmRSZXF1ZXN0XCIsXHJcbiAgIGxvZ2luVXJsOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvbG9naW5cIixcclxuICAgcGFzc3dvcmRSZXNldFVybDogXCJpbmRleC5waHAvYXV0aGVudGljYXRlL3Bhc3N3b3JkUmVzZXRcIixcclxuICAgZm9yZ290UGFzc3dvcmRVcmw6IFwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9mb3Jnb3RQYXNzd29yZFwiLFxyXG5cclxuICAgLy9hZG1pbiByZWxhdGVkXHJcbiAgIGRvY3Rvckxpc3RpbmdVcmw6IFwiaW5kZXgucGhwL2FkbWluRGFzaGJvYXJkL2RvY3Rvckxpc3RpbmdcIixcclxuXHJcbiAgIGxvZ291dFVybCA6IFwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9sb2dvdXRcIixcclxuXHJcbiAgIC8vZG9jdG9yIGRhc2hib2FyZCBsaW5rc1xyXG4gICBkb2N0b3JQcm9maWxlIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2RvY3RvclByb2ZpbGVcIixcclxuICAgZGFzaGJvYXJkSG9tZVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9cIixcclxuICAgbmV3QXBwb2ludG1lbnRVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvYm9va0FwcG9pbnRtZW50XCIsXHJcbiAgIHBhdGllbnRzRW50cnlVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvcGF0aWVudHNFbnRyeVwiLFxyXG4gICBwYXRpZW50c0xpc3RpbmdVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvcGF0aWVudHNMaXN0aW5nXCIsXHJcbiAgIGNsb3NlQXBwb2ludG1lbnRVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvY2xvc2VBcHBvaW50bWVudFwiLFxyXG4gICBkb2N0b3JzQXBwb2ludG1lbnRzTGlzdFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9saXN0QXBwb2ludG1lbnRcIixcclxuICAgbmV3U2NoZWR1bGVVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvbmV3U2NoZWR1bGVcIixcclxuICAgbGlzdFNjaGVkdWxlVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3NjaGVkdWxlTGlzdFwiLFxyXG4gICBnZXRTY2hlZHVsZUNhbGVuZGFyVXJsOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvU2NoZWR1bGVDYWxlbmRlclZpZXdcIixcclxuICAgYWRkU3RhZmZVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvc3RhZmZFbnRyeVwiLFxyXG4gICBkb2N0b3JzU3RhZmZMaXN0aW5nVXIgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvc3RhZmZMaXN0aW5nXCIsXHJcbiAgIHBhdGllbnRzSGlzdG9yeVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wYXRpZW50SGlzdG9yeVwiLFxyXG4gICBjcmVhdGVQcm9ncmFtRm9yUGF0aWVudFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jcmVhdGVNZWRpY2FsUHJvZ3JhbVwiLFxyXG4gICBwcm9ncmFtbWVMaXN0aW5nc1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wcm9ncmFtbWVMaXN0XCIsXHJcbiAgIE1hbmFnZUxvY2F0aW9uc1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC93b3JrTG9jYXRpb25NYW5hZ2VtZW50XCIsXHJcbiAgIGdldEFuYWx5dGljc1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9BbmFseXRpY3NSZXBvcnRcIixcclxuICAgZ2V0Q2FsZW5kZXJVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvY2FsZW5kYXJUZW1wbGF0ZVwiLFxyXG4gICBhY2NvdW50aW5nVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2FjY291bnRpbmdcIixcclxuICAgbWVkaWNpbmVTZWFyY2hVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvbWVkaWNpbmVTZWFyY2hcIixcclxuXHJcblxyXG4gICAvL3NjaGVkdWxlXHJcbiAgIGdldExvY2F0aW9uVXJsOiBcImluZGV4LnBocC9sb2NhdGlvbnMvZ2V0RG9jdG9yTG9jYXRpb25zXCIsXHJcbiAgIGNyZWF0ZVVwZGF0ZVNjaGVkdWxlVXJsOiBcImluZGV4LnBocC9zY2hlZHVsZS9jcmVhdGVVcGRhdGVTY2hlZHVsZVwiLFxyXG4gICBnZXRTZWNoZHVsZUNhbGVuZGFyRGV0YWlsc1VybDogXCJpbmRleC5waHAvc2NoZWR1bGUvZ2V0Q2FsYW5kZXJEZXRhaWxzXCIsXHJcblxyXG4gICAvL3Byb2dyYW1tZVxyXG4gICBkb2N0b3JzUHJvZ3JhbXNVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldERvY3RvcnNDaGVja3VwUHJvZ3JhbXNcIixcclxuICAgcHJvZ3JhbW1lRWRpdFVybDpcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvY3JlYXRlTWVkaWNhbFByb2dyYW1cIixcclxuICAgY3JlYXRlTW9kaWZ5UHJvZ3JhbW1lVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9jcmVhdGVNb2RpZnlQcm9ncmFtbWVcIixcclxuICAgZ2V0UHJvZ3JhbW1lVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRQcm9ncmFtbWVzXCIsXHJcblxyXG5cclxuICAgLy9wYXRpZW50XHJcbiAgIHBhdGllbnREZXRhaWxQZXJzaXN0VXJsOlwiaW5kZXgucGhwL3BhdGllbnQvYWRkVXBkYXRlUGF0aWVudFwiLFxyXG4gICBwYXRpZW50c0RldGFpbHNVcmw6XCJpbmRleC5waHAvcGF0aWVudC9nZXRQYXRpZW50RGV0YWlsc1wiLFxyXG4gICBsb2dpbkNoZWNrVXJsOlwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9pc0xvZ2dlZEluXCIsXHJcbiAgIGdldFByb2dyYW1tZUxpc3Q6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldE1lZGljYXRpb25Qcm9ncmFtbWVMaXN0XCIsXHJcbiAgIHByb2dyYW1tZUxpc3REZXRhaWxzVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRQcm9ncmFtbWVMaXN0RGV0YWlsc1wiLFxyXG4gICAvL3BhdGllbnRzUHJvZ3JhbW1lc1VybDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0UGF0aWVudFByb2dyYW1tZXNcIixcclxuICAgcGF0aWVudExpc3RpbmdVcmw6XCJpbmRleC5waHAvcGF0aWVudC9nZXRQYXRpZW50TGlzdFwiLFxyXG5cclxuICAgYm9va0FwcG9pbnRtZW50VXJsOiBcImluZGV4LnBocC9hcHBvaW50bWVudC9ib29rQXBwb2ludG1lbnRcIixcclxuXHJcbiAgIHNhdmVVcGRhdGVMb2NhdGlvbnM6XCJpbmRleC5waHAvbG9jYXRpb25zL2FkZFVwZGF0ZUxvY2F0aW9uXCIsXHJcbiAgIGxvY2F0aW9uTGlzdFVybDpcImluZGV4LnBocC9sb2NhdGlvbnMvZ2V0RG9jdG9yTG9jYXRpb25zXCIsXHJcbiAgIGRlbGl2ZXJ5TWV0aG9kc1VybDpcImluZGV4LnBocC9wYXRpZW50L2dldERlbGl2ZXJ5TWV0aG9kc1wiLFxyXG5cclxuXHJcbiAgIC8vcmVnaXN0YXJ0aW9uXHJcbiAgIGRvY3RvclVybDpcImluZGV4LnBocC9kb2N0b3Ivc2F2ZVVwZGF0ZURvY3RvclwiLFxyXG4gICBkb2N0b3JEZXRhaWxzVXJsOlwiaW5kZXgucGhwL2RvY3Rvci9nZXREb2N0b3JEZXRhaWxzXCIsXHJcbiAgIGxvZ2luQ2hlY2tVcmw6XCJpbmRleC5waHAvYXV0aGVudGljYXRlL2lzTG9nZ2VkSW5cIixcclxuICAgZG9jdG9yRGFzaFVybDpcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvXCIsXHJcbiAgIGxvZ291dFVybDpcImluZGV4LnBocC9hdXRoZW50aWNhdGUvbG9nb3V0XCIsXHJcblxyXG4gICBjcmVhdGVNb2RpZnlTdGFmZlVybDpcImluZGV4LnBocC9zdGFmZi9jcmVhdGVNb2RpZnlTdGFmZlwiLFxyXG4gICBnZXRTdGFmZkRldGFpbHNVcmw6IFwiaW5kZXgucGhwL3N0YWZmL2dldFN0YWZmRGV0YWlsc1wiLFxyXG4gICBzdGFmZkxpc3RpbmdVcmw6IFwiaW5kZXgucGhwL3N0YWZmL2dldERvY3RvcnNTdGFmZkxpc3RcIlxyXG5cclxufVxyXG4iLCJ2YWxpZGF0b3IgPSB7XHJcbiAgaXNFbXB0eVN0cmluZzogZnVuY3Rpb24odmFsdWUpe1xyXG4gICAgaWYoIXZhbHVlIHx8IDAgPT09IHZhbHVlLnRyaW0oKS5sZW5ndGgpe1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1lbHNle1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcblxyXG4gIC8vZGVmaW5pbmcgdGhlIGhlbHBlciBmdW5jdGlvbnMgaW4gZ2xvYmFsXHJcblxyXG4gICQoZnVuY3Rpb24oKXtcclxuXHJcbiAgICBjb25zb2xlLmxvZygnRG9jdG9yIERhc2hib2FyZCBqcyBsb2FkZWQnKTtcclxuXHJcbiAgICAvL3RvcCBsZXZlbCBjb250cm9sbGVyXHJcbiAgICB2YXIgY29udHJvbGxlciA9IHtcclxuICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICAvL3dpcmluZyB0aGUgbmF2aWdhdGlvblxyXG4gICAgICAgIHRoaXMubG9nb3V0VXJsID0gbGlua3MubG9nb3V0VXJsO1xyXG4gICAgICAgIHRoaXMuZG9jdG9yUHJvZmlsZSA9IGxpbmtzLmRvY3RvclByb2ZpbGU7XHJcbiAgICAgICAgdGhpcy5kYXNoYm9hcmRIb21lVXJsID0gbGlua3MuZGFzaGJvYXJkSG9tZVVybDtcclxuICAgICAgICB0aGlzLm5ld0FwcG9pbnRtZW50VXJsID0gbGlua3MubmV3QXBwb2ludG1lbnRVcmw7XHJcbiAgICAgICAgdGhpcy5wYXRpZW50c0VudHJ5VXJsID0gbGlua3MucGF0aWVudHNFbnRyeVVybDtcclxuICAgICAgICB0aGlzLnBhdGllbnRzTGlzdGluZ1VybCA9IGxpbmtzLnBhdGllbnRzTGlzdGluZ1VybDtcclxuICAgICAgICB0aGlzLmNsb3NlQXBwb2ludG1lbnRVcmwgPSBsaW5rcy5jbG9zZUFwcG9pbnRtZW50VXJsO1xyXG4gICAgICAgIHRoaXMuZG9jdG9yc0FwcG9pbnRtZW50c0xpc3RVcmwgPSBsaW5rcy5kb2N0b3JzQXBwb2ludG1lbnRzTGlzdFVybDtcclxuXHJcbiAgICAgICAgdGhpcy5uZXdTY2hlZHVsZVVybCA9IGxpbmtzLm5ld1NjaGVkdWxlVXJsO1xyXG4gICAgICAgIHRoaXMubGlzdFNjaGVkdWxlVXJsID0gdGhpcy5saXN0U2NoZWR1bGVVcmw7XHJcbiAgICAgICAgdGhpcy5TY2hlZHVsZUNhbGVuZGFyVXJsID0gbGlua3MuZ2V0U2NoZWR1bGVDYWxlbmRhclVybDtcclxuICAgICAgICB0aGlzLmFkZFN0YWZmVXJsID0gbGlua3MuYWRkU3RhZmZVcmw7XHJcbiAgICAgICAgdGhpcy5kb2N0b3JzU3RhZmZMaXN0aW5nVXIgPSBsaW5rcy5kb2N0b3JzU3RhZmZMaXN0aW5nVXI7XHJcblxyXG4gICAgICAgIHRoaXMucGF0aWVudHNIaXN0b3J5VXJsID0gbGlua3MucGF0aWVudHNIaXN0b3J5VXJsO1xyXG5cclxuICAgICAgICB0aGlzLmNyZWF0ZVByb2dyYW1Gb3JQYXRpZW50VXJsID0gbGlua3MuY3JlYXRlUHJvZ3JhbUZvclBhdGllbnRVcmwgO1xyXG4gICAgICAgIHRoaXMucHJvZ3JhbW1lTGlzdGluZ3NVcmwgPSBsaW5rcy5wcm9ncmFtbWVMaXN0aW5nc1VybDtcclxuXHJcbiAgICAgICAgdGhpcy5NYW5hZ2VMb2NhdGlvbnNVcmwgPSBsaW5rcy5NYW5hZ2VMb2NhdGlvbnNVcmw7XHJcbiAgICAgICAgdGhpcy5DYWxlbmRhclRlbXBsYXRlVXJsID0gbGlua3MuZ2V0Q2FsZW5kZXJVcmw7XHJcblxyXG4gICAgICAgIHRoaXMuYW5hbHl0aWNzUmVwb3J0VXJsID0gbGlua3MuZ2V0QW5hbHl0aWNzVXJsO1xyXG4gICAgICAgIHRoaXMuYWNjb3VudGluZ1VybCA9IGxpbmtzLmFjY291bnRpbmdVcmw7XHJcbiAgICAgICAgdGhpcy5tZWRpY2luZVNlYXJjaFVybCA9IGxpbmtzLm1lZGljaW5lU2VhcmNoVXJsO1xyXG4gICAgICAgIC8vZG8gc29tZXRobmcgYWJvdXQgZG9jdG9ycyBpbmZvIGFuZCByZWdpc3RyYXRpb25cclxuXHJcbiAgICAgICAgLy9UaGUgdXJsIGZyb20gdGhlIGJyb3dzZXIgIGNhbiBiZSBjb21wYXJlZCB0byBzZXQgdGhlIGFjdGl2ZSBuYXZpZ2F0aW9uXHJcbiAgICAgICAgbmF2Vmlldy5pbml0KCk7XHJcblxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBuYXZWaWV3ID0ge1xyXG4gICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAvL3dpcmluZyB0aGUgbmF2aWdhdGlvbiBjbGlja3NcclxuXHJcblxyXG4gICAgICAgICQoXCIjcG1zLWJyYW5kLWJ0bi1saW5rXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ1BNUyBicmFuZCBjbGljaycpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICQoXCIjdXNlci1Qcm9maWxlLUJ0bi1MaW5rXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmRvY3RvclByb2ZpbGUpO1xyXG5cclxuICAgICAgICAkKFwiI2RvY3Rvci1kYXNoLWxvZ291dC1idG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIubG9nb3V0VXJsKTtcclxuXHJcblxyXG5cclxuICAgICAgICAkKFwiI2Rhc2hib2FyZC1TZWN0aW9uLUJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5kYXNoYm9hcmRIb21lVXJsKTtcclxuXHJcbiAgICAgICAgJChcIiNhcHBvaW50bWVudC1zZWN0aW9uLWxpbmstYnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsKTtcclxuXHJcbiAgICAgICAgJChcIiNtYW5hZ2UtRG9jdG9ycy1TY2hlZHVsZS1TZWN0aW9uLUxpbmstQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLlNjaGVkdWxlQ2FsZW5kYXJVcmwpO1xyXG5cclxuICAgICAgICAkKFwiI2J0bi1wcm9ncmFtbWUtc2VjdGlvbi1saW5rXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLnByb2dyYW1tZUxpc3RpbmdzVXJsKTtcclxuXHJcbiAgICAgICAgJChcIiNjcmVhdGUtcHJvZ3JhbS1mb3ItcGF0aWVudC1zZWN0aW9uXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmNyZWF0ZVByb2dyYW1Gb3JQYXRpZW50VXJsKTtcclxuXHJcbiAgICAgICAgJChcIiNwYXRpZW50cy1FbnRyeS1TZWN0aW9uLUxpbmstQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLnBhdGllbnRzTGlzdGluZ1VybCk7XHJcblxyXG4gICAgICAgIC8vJChcIiNwYXRpZW50cy1lbnRyeS1jcmVhdGUtc2VjdGlvbi1saW5rLUJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5wYXRpZW50c0VudHJ5VXJsKTtcclxuICAgICAgICAvLyQoXCIjcGF0aWVudHMtSGlzdG9yeS1TZWN0aW9uLUxpbmstQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLnBhdGllbnRzSGlzdG9yeVVybCk7XHJcblxyXG4gICAgICAgICQoXCIjc3RhZmYtbWFuYWdtZW50LXNlY3Rpb24tbGluay1idG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIuZG9jdG9yc1N0YWZmTGlzdGluZ1VyKTtcclxuXHJcbiAgICAgICAgJChcIiNidG4tbWFuYWdlLWxvY2F0aW9uc1wiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5NYW5hZ2VMb2NhdGlvbnNVcmwpO1xyXG5cclxuICAgICAgICAkKFwiI2FuYWx5dGljcy1zaWRlLW5hdmlnYXRpb24tbGluay1idG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIuYW5hbHl0aWNzUmVwb3J0VXJsKTtcclxuICAgICAgICAkKFwiI2FjY291bnRpbmctc2lkZS1uYXZpZ2F0aW9uLWxpbmstYnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmFjY291bnRpbmdVcmwpO1xyXG4gICAgICAgICQoXCIjbWVkaWNpbmUtc2lkZS1uYXZpZ2F0aW9uLWxpbmstYnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLm1lZGljaW5lU2VhcmNoVXJsKTtcclxuXHJcblxyXG5cclxuICAgICAgICAvLyQoXCIjYm9vay1BcHBvaW50bWVudHMtU2VjdGlvbi1CdG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIubmV3QXBwb2ludG1lbnRVcmwpO1xyXG4gICAgICAgIC8vJChcIiNjbG9zZS1Cb29rLUFwcG9pbnRtZW50LVNlY3Rpb24tTGluay1CdG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIuY2xvc2VBcHBvaW50bWVudFVybCk7XHJcbiAgICAgICAgLy8kKFwiI3ZpZXctQXBwb2ludG1lbnQtU2VjdGlvbi1MaW5rLUJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5kb2N0b3JzQXBwb2ludG1lbnRzTGlzdFVybCk7XHJcbiAgICAgICAgLy8kKFwiI21hbmFnZS1Eb2N0b3JzLVNjaGVkdWxlLVNlY3Rpb24tTGluay1CdG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIubGlzdFNjaGVkdWxlVXJsKTtcclxuICAgICAgICAvLyQoXCIjbWFuYWdlLXNjaGVkdWxlLWNyZWF0ZS1zZWN0aW9uLWxpbmstQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLm5ld1NjaGVkdWxlVXJsKTtcclxuICAgICAgICAvLyQoXCIjY2FsZW5kYXItVGVtcGxhdGUtQnRuLUxpbmtcIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIuQ2FsZW5kYXJUZW1wbGF0ZVVybCk7XHJcbiAgICAgICAgLy8kKFwiI21hbmFnZS1zY2hlZHVsZS1saXN0LXNlY3Rpb24tbGluay1CdG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIuU2NoZWR1bGVDYWxlbmRhclVybCk7XHJcblxyXG4gICAgICAgICQoXCIjb3RoZXItc2V0dGluZ3Mtc2VjdGlvbi1saW5rLWJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiI2NhbGVuZGFyLXRlbXBsYXRlLXNlY3Rpb24tbGluay1idG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgfSxcclxuICAgICAgcmVuZGVyOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vaGlnaGxpZ2h0IHRoZSByaWdodCBuYXZpZ2F0aW9uXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb250cm9sbGVyLmluaXQoKTtcclxuXHJcbiAgfSgpKTtcclxuXHJcbn0pO1xyXG4iLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG5cclxuICAkKGZ1bmN0aW9uKCl7XHJcbiAgICBjb25zb2xlLmxvZygnbWVkaWNhbCBwcm9ncmFtbWUganMgbG9hZGVkICcpO1xyXG5cclxuICAgIHZhciBtb2RlbCA9IHtcclxuICAgICAgcHJvZ3JhbUlkOiAwLFxyXG4gICAgICBwcm9ncmFtbWVOYW1lOiBcIlwiLFxyXG4gICAgICBwcm9ncmFtZUxpc3Q6W10sXHJcbiAgICAgIFByb2dyYW1tZURldGFpbHM6bnVsbFxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgY29udHJvbGxlciA9IHtcclxuICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmNyZWF0ZU1vZGlmeVByb2dyYW1tZVVybCA9IGxpbmtzLmNyZWF0ZU1vZGlmeVByb2dyYW1tZVVybDtcclxuICAgICAgICB0aGlzLmdldFByb2dyYW1tZVVybCA9IGxpbmtzLmdldFByb2dyYW1tZVVybDtcclxuXHJcbiAgICAgICAgcHJvZ3JhbW1lVmlldy5pbml0KCk7XHJcblxyXG5cclxuICAgICAgICB2YXIgcHJvZ3JhbW1lSWQgPSB1dGlsaXR5LmdldFVSTFBhcmFtKCdpZCcpO1xyXG5cclxuICAgICAgICBpZihwcm9ncmFtbWVJZCl7XHJcbiAgICAgICAgICAvL3RoaXMgaXMgYSB1cGRhdGUgcGF0aWVudHMgZW50cnlcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdwYXRpZW50IElkICcgKyBwcm9ncmFtbWVJZCk7XHJcblxyXG4gICAgICAgICAgJC5nZXQoIHRoaXMuZ2V0UHJvZ3JhbW1lVXJsICwge2lkOnByb2dyYW1tZUlkfSlcclxuICAgICAgICAgIC5kb25lKGZ1bmN0aW9uKCByZXNwb25zZSApIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcclxuXHJcbiAgICAgICAgICAgIG1vZGVsID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgcHJvZ3JhbW1lVmlldy5yZW5kZXIoKTtcclxuXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgIH0sXHJcbiAgICAgIGNsZWFyTW9kZWw6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbW9kZWwucHJvZ3JhbUlkID0gMDtcclxuICAgICAgICBtb2RlbC5wcm9ncmFtbWVOYW1lID0gXCJcIjtcclxuICAgICAgICBtb2RlbC5wcm9ncmFtZUxpc3QgPSBbXTtcclxuICAgICAgICBtb2RlbC5Qcm9ncmFtbWVEZXRhaWxzID0gbnVsbDtcclxuICAgICAgICBjb25zb2xlLmxvZygnY2xlYXIgbW9kZWwnKTtcclxuICAgICAgfSxcclxuICAgICAgZ2V0UHJvZ3JhbW1lTGlzdDogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gbW9kZWwucHJvZ3JhbWVMaXN0O1xyXG4gICAgICB9LFxyXG4gICAgICBnZXRQcm9ncmFtbWVOYW1lOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiBtb2RlbC5wcm9ncmFtbWVOYW1lO1xyXG4gICAgICB9LFxyXG4gICAgICBnZXRDdXJyZW50UHJvZ3JhbW1lRGV0YWlsOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiBtb2RlbC5Qcm9ncmFtbWVEZXRhaWxzO1xyXG4gICAgICB9LFxyXG4gICAgICBzZXROZXdQcm9ncmFtbWVEZXRhaWxzTW9kZWw6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbW9kZWwuUHJvZ3JhbW1lRGV0YWlscyA9IHtcclxuICAgICAgICAgIGlkOjAsXHJcbiAgICAgICAgICBkdXJhdGlvbjogXCJcIixcclxuICAgICAgICAgIHRleHQ6IFwiXCIsXHJcbiAgICAgICAgICB2YWNjaW5lOiBcIlwiLFxyXG4gICAgICAgICAgZG9zZU5vOiBcIlwiLFxyXG4gICAgICAgICAgaW5kZXg6IDBcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgICByZW1vdmVQcm9ncmFtbWU6IGZ1bmN0aW9uKHByb2dyYW0pe1xyXG4gICAgICAgIG1vZGVsLnByb2dyYW1lTGlzdC5zcGxpY2UocHJvZ3JhbS5pbmRleCwgMSk7XHJcbiAgICAgICAgLy9yZSBhc3NpZ25pbmcgdGhlIGluZGV4XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IG1vZGVsLnByb2dyYW1lTGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICBtb2RlbC5wcm9ncmFtZUxpc3RbaV0uaW5kZXggPSBpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgdXBkYXRlUHJvZ3JhbW1lTmFtZTogZnVuY3Rpb24obmFtZSl7XHJcbiAgICAgICAgbW9kZWwucHJvZ3JhbW1lTmFtZSA9IG5hbWU7XHJcbiAgICAgIH0sXHJcbiAgICAgIGFkZFByb2dyYW1tZTogIGZ1bmN0aW9uKHBkdXJhdGlvbiwgcHRleHQsIHB2YWNjaW5lLCBwZG9zZU5vKXtcclxuICAgICAgICB2YXIgcG9zbiA9IG1vZGVsLnByb2dyYW1lTGlzdC5sZW5ndGg7XHJcblxyXG5cclxuICAgICAgICBpZihtb2RlbC5Qcm9ncmFtbWVEZXRhaWxzKSB7XHJcblxyXG4gICAgICAgICAgY29uc29sZS5sb2coJ3VwZGF0ZSBwcm9ncmFtbWUgZGV0YWlscyAnICsgcGR1cmF0aW9uICsgcHRleHQgKyAgIEpTT04uc3RyaW5naWZ5KG1vZGVsLlByb2dyYW1tZURldGFpbHMpICk7XHJcblxyXG4gICAgICAgICAgbW9kZWwuUHJvZ3JhbW1lRGV0YWlscy5kdXJhdGlvbiA9IHBkdXJhdGlvbjtcclxuICAgICAgICAgIG1vZGVsLlByb2dyYW1tZURldGFpbHMudGV4dCA9IHB0ZXh0O1xyXG4gICAgICAgICAgbW9kZWwuUHJvZ3JhbW1lRGV0YWlscy52YWNjaW5lID0gcHZhY2NpbmU7XHJcbiAgICAgICAgICBtb2RlbC5Qcm9ncmFtbWVEZXRhaWxzLmRvc2VObyA9IHBkb3NlTm87XHJcblxyXG4gICAgICAgIH1lbHNle1xyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKCduZXcgcHJvZ3JhbW1lIGRldGFpbHMnKTtcclxuXHJcbiAgICAgICAgICBtb2RlbC5Qcm9ncmFtbWVEZXRhaWxzID0ge1xyXG4gICAgICAgICAgICBpZDowLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogcGR1cmF0aW9uLFxyXG4gICAgICAgICAgICB0ZXh0OiBwdGV4dCxcclxuICAgICAgICAgICAgdmFjY2luZTogcHZhY2NpbmUsXHJcbiAgICAgICAgICAgIGRvc2VObzogcGRvc2VObyxcclxuICAgICAgICAgICAgaW5kZXg6IHBvc25cclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBtb2RlbC5wcm9ncmFtZUxpc3QucHVzaChtb2RlbC5Qcm9ncmFtbWVEZXRhaWxzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1vZGVsLlByb2dyYW1tZURldGFpbHMgPSBudWxsO1xyXG4gICAgICAgIHByb2dyYW1tZVZpZXcuY2xlYXJGb3JtKCk7XHJcblxyXG4gICAgICB9LFxyXG4gICAgICBwZXJzaXN0UHJvZ3JhbW1lOiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAvL3VwZGF0ZSB0aGUgcHJvZ3JhbW1lIG5hbWVcclxuICAgICAgICBtb2RlbC5wcm9ncmFtbWVOYW1lID0gIHByb2dyYW1tZVZpZXcucHJvZ3JhbW1lTmFtZS52YWwoKTtcclxuXHJcblxyXG5cclxuICAgICAgICAkLnBvc3QoY29udHJvbGxlci5jcmVhdGVNb2RpZnlQcm9ncmFtbWVVcmwgLCBtb2RlbClcclxuICAgICAgICAuZG9uZShmdW5jdGlvbiggcmVzcG9uc2UgKSB7XHJcblxyXG4gICAgICAgICAgY29uc29sZS5sb2coJ3NhdmUgcmVzcG9uc2UgJyArIEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSk7XHJcbiAgICAgICAgICBjb250cm9sbGVyLmNsZWFyTW9kZWwoKTtcclxuICAgICAgICAgIHByb2dyYW1tZVZpZXcucmVmcmVzaEZvcm0oKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgcHJvZ3JhbW1lVmlldyA9IHtcclxuICAgICAgaXNGb3JtVmFsaWQ6ZmFsc2UsXHJcbiAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5wcm9ncmFtbWVOYW1lID0gJCgnI3Byb2dyYW1tZS1uYW1lJyk7XHJcbiAgICAgICAgdGhpcy50YWJsZUJvZHkgID0gJCgnI3Byb2dyYW1tZS1saXN0LXRhYmxlLWJvZHknKTtcclxuXHJcbiAgICAgICAgdGhpcy5kdXJhdGlvbiA9ICQoJyN0eHQtZHVyYXRpb24nKTtcclxuICAgICAgICB0aGlzLmR1cmF0aW9uVGV4dCA9ICQoJyN0eHQtZHVyYXRpb24tdGV4dCcpO1xyXG4gICAgICAgIHRoaXMudmFjY2luZSA9ICQoJyN0eHQtdmFjY2luZScpO1xyXG4gICAgICAgIHRoaXMuZG9zZU5vID0gJCgnI3R4dC1kb3NlLW5vJyk7XHJcblxyXG5cclxuICAgICAgICB0aGlzLmdyb3VwUHJvZ3JhbW1lTmFtZSA9ICQoJyNncm91cC1wcm9ncmFtbWUtbmFtZScpO1xyXG4gICAgICAgIHRoaXMucHJvZ3JhbW1lTmFtZWhlbHBMYWJlbCA9ICQoJyNoZWxwLXByb2dyYW1tZS1uYW1lJyk7XHJcbiAgICAgICAgdGhpcy5jb21tb25IZWxwTGFiZWwgPSAkKCcjaGVscC1jb21tb24tbWVzc2FnZScpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5wcm9ncmFtbWVOYW1lLm9uKCdjaGFuZ2Uga2V5dXAgcGFzdGUgJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCk7XHJcbiAgICAgICAgICBjb250cm9sbGVyLnVwZGF0ZVByb2dyYW1tZU5hbWUocHJvZ3JhbW1lVmlldy5wcm9ncmFtbWVOYW1lLnZhbCgpKVxyXG4gICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICAvL3dpcmluZyBldmVudHNcclxuICAgICAgICAkKCcjYnRuLWFkZC1yb3cnKS5jbGljaygoZnVuY3Rpb24odmlldyl7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciBkdXJhdGlvblZhbCA9ICQoJyN0eHQtZHVyYXRpb24nKS52YWwoKTtcclxuICAgICAgICAgICAgdmFyIGR1cmF0aW9uVGV4dFZhbCA9ICQoJyN0eHQtZHVyYXRpb24tdGV4dCcpLnZhbCgpO1xyXG4gICAgICAgICAgICB2YXIgdmFjY2luZVZhbCA9ICQoJyN0eHQtdmFjY2luZScpLnZhbCgpO1xyXG4gICAgICAgICAgICB2YXIgZG9zZU5vVmFsID0gJCgnI3R4dC1kb3NlLW5vJykudmFsKCk7XHJcblxyXG4gICAgICAgICAgICBpZighZHVyYXRpb25WYWwgfHxcclxuICAgICAgICAgICAgICAhZHVyYXRpb25UZXh0VmFsfHxcclxuICAgICAgICAgICAgICAhdmFjY2luZVZhbHx8XHJcbiAgICAgICAgICAgICAgIWRvc2VOb1ZhbFxyXG4gICAgICAgICAgICApe1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvbmUgb2YgdGhlIGZpbGVkIGlzIGVtcHR5Jyk7XHJcbiAgICAgICAgICAgICAgcHJvZ3JhbW1lVmlldy5jb21tb25IZWxwTGFiZWwucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAgIHByb2dyYW1tZVZpZXcuY29tbW9uSGVscExhYmVsLnRleHQoJ1BsZWFzZSBlbnRlciBhbGwgZGV0YWlscycpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGF0YSBlbnRlcmVkICcpO1xyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIuYWRkUHJvZ3JhbW1lKGR1cmF0aW9uVmFsLCBkdXJhdGlvblRleHRWYWwsIHZhY2NpbmVWYWwsIGRvc2VOb1ZhbCk7XHJcbiAgICAgICAgICAgICAgcHJvZ3JhbW1lVmlldy5jb21tb25IZWxwTGFiZWwuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAgIHByb2dyYW1tZVZpZXcucmVuZGVyKCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ21vZGVsICcgKyBKU09OLnN0cmluZ2lmeShtb2RlbCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pKHByb2dyYW1tZVZpZXcpKTtcclxuXHJcbiAgICAgICAgJCgnI2J0bi1zdWJtaXQtcHJvZ3JhbW1lJykuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdzYXZlIGNsaWNrJyk7XHJcbiAgICAgICAgICBwcm9ncmFtbWVWaWV3LnZhbGlkYXRlRm9ybSgpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ2Zvcm0gaXMgdmFsaWQ6JyArICBwcm9ncmFtbWVWaWV3LmlzRm9ybVZhbGlkKTtcclxuICAgICAgICAgIGlmKHByb2dyYW1tZVZpZXcuaXNGb3JtVmFsaWQpe1xyXG4gICAgICAgICAgICBjb250cm9sbGVyLnBlcnNpc3RQcm9ncmFtbWUoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy53aXJlVmFsaWRhdGlvbnMoKTtcclxuXHJcbiAgICAgIH0sXHJcbiAgICAgIHJlZnJlc2hGb3JtKCl7XHJcbiAgICAgICAgcHJvZ3JhbW1lVmlldy5ncm91cFByb2dyYW1tZU5hbWUucmVtb3ZlQ2xhc3MoJ2hhcy1lcnJvcicpO1xyXG4gICAgICAgIHByb2dyYW1tZVZpZXcucHJvZ3JhbW1lTmFtZWhlbHBMYWJlbC5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgcHJvZ3JhbW1lVmlldy5jb21tb25IZWxwTGFiZWwuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICAgICAgLy9yZXNldHRpbmcgYWxsIHZhbGlkYXRpb24gZXJyb3JzXHJcbiAgICAgIH0sXHJcbiAgICAgIHdpcmVWYWxpZGF0aW9uczogZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9ncmFtbWVOYW1lLm9uKCdibHVyJywgZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICB2YXIgcHJvZ3JhbW1lTmFtZSA9IHByb2dyYW1tZVZpZXcucHJvZ3JhbW1lTmFtZS52YWwoKTtcclxuICAgICAgICAgIHZhciBpc0VtcHR5ID0gdmFsaWRhdG9yLmlzRW1wdHlTdHJpbmcocHJvZ3JhbW1lTmFtZSk7XHJcblxyXG4gICAgICAgICAgaWYoaXNFbXB0eSl7XHJcbiAgICAgICAgICAgIHByb2dyYW1tZVZpZXcuZ3JvdXBQcm9ncmFtbWVOYW1lLmFkZENsYXNzKCdoYXMtZXJyb3InKTtcclxuICAgICAgICAgICAgcHJvZ3JhbW1lVmlldy5wcm9ncmFtbWVOYW1laGVscExhYmVsLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBwcm9ncmFtbWVWaWV3Lmdyb3VwUHJvZ3JhbW1lTmFtZS5yZW1vdmVDbGFzcygnaGFzLWVycm9yJyk7XHJcbiAgICAgICAgICAgIHByb2dyYW1tZVZpZXcucHJvZ3JhbW1lTmFtZWhlbHBMYWJlbC5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfSxcclxuICAgICAgdmFsaWRhdGVGb3JtOiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICBwcm9ncmFtbWVWaWV3LmlzRm9ybVZhbGlkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdmFyIHByb2dyYW1tZU5hbWUgPSBwcm9ncmFtbWVWaWV3LnByb2dyYW1tZU5hbWUudmFsKCk7XHJcbiAgICAgICAgdmFyIHByb2dyYW1tZUxpc3QgPSBjb250cm9sbGVyLmdldFByb2dyYW1tZUxpc3QoKTtcclxuXHJcbiAgICAgICAgdmFyIGlzRW1wdHkgPSB2YWxpZGF0b3IuaXNFbXB0eVN0cmluZyhwcm9ncmFtbWVOYW1lKTtcclxuXHJcbiAgICAgICAgaWYoaXNFbXB0eSl7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygndmFsaWRhZSBwcm9ncmFtbWUgbmFtZScgKTtcclxuICAgICAgICAgIHByb2dyYW1tZVZpZXcuaXNGb3JtVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgIHByb2dyYW1tZVZpZXcuZ3JvdXBQcm9ncmFtbWVOYW1lLmFkZENsYXNzKCdoYXMtZXJyb3InKTtcclxuICAgICAgICAgIHByb2dyYW1tZVZpZXcucHJvZ3JhbW1lTmFtZWhlbHBMYWJlbC5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICBwcm9ncmFtbWVWaWV3Lmdyb3VwUHJvZ3JhbW1lTmFtZS5yZW1vdmVDbGFzcygnaGFzLWVycm9yJyk7XHJcbiAgICAgICAgICBwcm9ncmFtbWVWaWV3LnByb2dyYW1tZU5hbWVoZWxwTGFiZWwuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYocHJvZ3JhbW1lTGlzdC5sZW5ndGggPD0gMCl7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygncHJvZ3JhbW1lIGxpc3QgdmFsaWRhdGlvbicpO1xyXG4gICAgICAgICAgcHJvZ3JhbW1lVmlldy5pc0Zvcm1WYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgcHJvZ3JhbW1lVmlldy5jb21tb25IZWxwTGFiZWwucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgcHJvZ3JhbW1lVmlldy5jb21tb25IZWxwTGFiZWwudGV4dCgnUGxlYXNlIGVudGVyIGF0bGVhc3Qgb25lIHByb2dyYW1tZSBlbnRyeScpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgcHJvZ3JhbW1lVmlldy5jb21tb25IZWxwTGFiZWwuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICB9LFxyXG4gICAgICBjbGVhckZvcm06IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5kdXJhdGlvbi52YWwoJycpO1xyXG4gICAgICAgIHRoaXMuZHVyYXRpb25UZXh0LnZhbCgnJyk7XHJcbiAgICAgICAgdGhpcy52YWNjaW5lLnZhbCgnJyk7XHJcbiAgICAgICAgdGhpcy5kb3NlTm8udmFsKCcnKTtcclxuICAgICAgfSxcclxuICAgICAgcmVuZGVyOiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICB2YXIgcHJvZ3JhbW1lTmFtZSA9IGNvbnRyb2xsZXIuZ2V0UHJvZ3JhbW1lTmFtZSgpO1xyXG4gICAgICAgIHZhciBjdXJyZW50cHJvZ3JhbW1lRGV0YWlsID0gY29udHJvbGxlci5nZXRDdXJyZW50UHJvZ3JhbW1lRGV0YWlsKCk7XHJcbiAgICAgICAgdmFyIHByb2dyYW1tZUxpc3QgPSBjb250cm9sbGVyLmdldFByb2dyYW1tZUxpc3QoKTtcclxuXHJcbiAgICAgICAgLy91cGRhdGluZyB0aGUgdmFsdWVzIGluIHRoZSB2aWV3XHJcblxyXG4gICAgICAgIHRoaXMucHJvZ3JhbW1lTmFtZS52YWwocHJvZ3JhbW1lTmFtZSk7XHJcblxyXG4gICAgICAgIGlmKGN1cnJlbnRwcm9ncmFtbWVEZXRhaWwpe1xyXG4gICAgICAgICAgdGhpcy5kdXJhdGlvbi52YWwoY3VycmVudHByb2dyYW1tZURldGFpbC5kdXJhdGlvbik7XHJcbiAgICAgICAgICB0aGlzLmR1cmF0aW9uVGV4dC52YWwoY3VycmVudHByb2dyYW1tZURldGFpbC50ZXh0KTtcclxuICAgICAgICAgIHRoaXMudmFjY2luZS52YWwoY3VycmVudHByb2dyYW1tZURldGFpbC52YWNjaW5lKTtcclxuICAgICAgICAgIHRoaXMuZG9zZU5vLnZhbChjdXJyZW50cHJvZ3JhbW1lRGV0YWlsLmRvc2VObyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3JlbW92ZSB0aGUgYWRkZWQgcm93c1xyXG4gICAgICAgICQoJy5wcm9nLWFkZGVkLXJvd3MnKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgdmFyIHRhYmxlSGVhZGVyQ2xvbmUgPSAkKCcjcHJvZ3JhbW1lLXRhYmxlLWhlYWRlcicpLmNsb25lKCk7XHJcbiAgICAgICAgLy90aGlzLnRhYmxlQm9keS5wcmVwZW5kKHRhYmxlSGVhZGVyQ2xvbmUpO1xyXG5cclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgcHJvZ3JhbW1lTGlzdC5sZW5ndGg7IGkrKyl7XHJcblxyXG4gICAgICAgICAgdmFyIHRyID0gJCgnPHRyLz4nKTtcclxuICAgICAgICAgIHRyLmFkZENsYXNzKCdwcm9nLWFkZGVkLXJvd3MnKVxyXG5cclxuICAgICAgICAgIHZhciB0ZCA9ICQoJzx0ZC8+Jyk7XHJcbiAgICAgICAgICB0ZC50ZXh0KHByb2dyYW1tZUxpc3RbaV0uZHVyYXRpb24pO1xyXG4gICAgICAgICAgdHIuYXBwZW5kKHRkKTtcclxuXHJcbiAgICAgICAgICB2YXIgdGQgPSAkKCc8dGQvPicpO1xyXG4gICAgICAgICAgdGQudGV4dChwcm9ncmFtbWVMaXN0W2ldLnRleHQpO1xyXG4gICAgICAgICAgdHIuYXBwZW5kKHRkKTtcclxuXHJcbiAgICAgICAgICB2YXIgdGQgPSAkKCc8dGQvPicpO1xyXG4gICAgICAgICAgdGQudGV4dChwcm9ncmFtbWVMaXN0W2ldLnZhY2NpbmUpO1xyXG4gICAgICAgICAgdHIuYXBwZW5kKHRkKTtcclxuXHJcbiAgICAgICAgICB2YXIgdGQgPSAkKCc8dGQvPicpO1xyXG4gICAgICAgICAgdGQudGV4dChwcm9ncmFtbWVMaXN0W2ldLmRvc2VObyk7XHJcbiAgICAgICAgICB0ci5hcHBlbmQodGQpO1xyXG5cclxuICAgICAgICAgIHZhciB0ZCA9ICQoJzxhLz4nLHtcclxuICAgICAgICAgICAgdGV4dDogJ1JlbW92ZScsXHJcbiAgICAgICAgICAgIGNsYXNzOiBcImJ0biBidG4tZGVmYXVsdCBidG4tc21cIlxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgdGQuY2xpY2soKGZ1bmN0aW9uKHByb2dyYW1tZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShwcm9ncmFtbWUpKTtcclxuICAgICAgICAgICAgICAvLyAgcHJvZ3JhbW1lTGlzdFtwb3NpdGlvbiAtMV0gPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVtb3ZlIGNsaWNrIG9uOiAnICsgSlNPTi5zdHJpbmdpZnkocHJvZ3JhbW1lKSk7XHJcbiAgICAgICAgICAgICAgY29udHJvbGxlci5yZW1vdmVQcm9ncmFtbWUocHJvZ3JhbW1lKTtcclxuICAgICAgICAgICAgICBwcm9ncmFtbWVWaWV3LnJlbmRlcigpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH0pKHByb2dyYW1tZUxpc3RbaV0pKTtcclxuXHJcbiAgICAgICAgICB0ci5hcHBlbmQodGQpO1xyXG5cclxuXHJcbiAgICAgICAgICB2YXIgZWRpdExpbmsgPSAkKCc8YS8+Jyx7XHJcbiAgICAgICAgICAgIHRleHQ6ICdFZGl0JyxcclxuICAgICAgICAgICAgY2xhc3M6IFwiXCJcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIGVkaXRMaW5rLmNsaWNrKChmdW5jdGlvbihwcm9ncmFtbWUpe1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocHJvZ3JhbW1lKSk7XHJcbiAgICAgICAgICAgICAgLy8gIHByb2dyYW1tZUxpc3RbcG9zaXRpb24gLTFdID0gbnVsbFxyXG5cclxuICAgICAgICAgICAgICBtb2RlbC5Qcm9ncmFtbWVEZXRhaWxzID0gcHJvZ3JhbW1lO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlZGl0IGJ1dHRvbjogJyArIEpTT04uc3RyaW5naWZ5KHByb2dyYW1tZSkpO1xyXG4gICAgICAgICAgICAgIHByb2dyYW1tZVZpZXcucmVuZGVyKCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgfSkocHJvZ3JhbW1lTGlzdFtpXSkpO1xyXG5cclxuICAgICAgICAgIHZhciB0ZCA9ICQoJzx0ZC8+Jyk7XHJcbiAgICAgICAgICB0ZC5hcHBlbmQoZWRpdExpbmspO1xyXG4gICAgICAgICAgdHIuYXBwZW5kKHRkKTtcclxuXHJcblxyXG4gICAgICAgICAgdGhpcy50YWJsZUJvZHkuYXBwZW5kKHRyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnRyb2xsZXIuaW5pdCgpO1xyXG5cclxuICB9KCkpO1xyXG5cclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
