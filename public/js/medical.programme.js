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
  getTimeFromMinutes:  function(mins){
    var hrs = mins/60;
    var mins = mins%60;

    var mdate = moment({hours:hrs, minutes: mins});

    return mdate.format('hh:mm A');

  },

  getAlerts : function(msg,classnm,id,container){

     $('.pms-alerts').remove();

    var alert = $('<div  id = "'+id+'" class=" alert ' +classnm+' pms-alerts alert-dismissible doc-profile-before-submit-warning-error" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+msg+'</div>');
    $(container).prepend(alert);
    console.log('alert created');

  },

  removeAlerts:function(){
    $('.pms-alerts').remove();
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
   getAllDoctorsUrl: "index.php/adminDashboard/getAllDoctors",
   adminDoctorEditRedirect:"index.php/adminDashboard/adminDoctorEdit",

   logoutUrl : "index.php/authenticate/logout",

   //doctor dashboard links
   doctorProfile: "index.php/doctorDashboard/doctorProfile",
   dashboardHomeUrl : "index.php/doctorDashboard/",
   newAppointmentUrl : "index.php/doctorDashboard/bookAppointment",
   patientsEntryUrl : "index.php/doctorDashboard/patientsEntry",
   patientsListingUrl : "index.php/doctorDashboard/patientsListing",
   closeAppointmentUrl : "index.php/doctorDashboard/closeAppointment",
   doctorsAppointmentsListUrl : "index.php/doctorDashboard/listAppointment",
   newScheduleUrl : "index.php/doctorDashboard/newSchedule",
   deactivateScheduleUrl: "index.php/doctorDashboard/deactivateSchedule",
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
   getSechduleforDeactivation: "index.php/schedule/getSchedulesForDeactivation",
   deactivateScheduleDays: "index.php/schedule/deactivateScheduleDays",

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
   getPatientsForAutoFillUrl:"index.php/patient/getPatientListForAutoFill",
   getPatientHistoryUrl:'index.php/patient/getPatientHistory',
   getpatientsImageUrl:'index.php/patient/getPatientImage',


   bookAppointmentUrl: "index.php/appointment/bookAppointment",
   getAppointmentForTheDayUrl: "index.php/appointment/getAppointmentsForTheDay",
   getAllAppointmentsUrl: "index.php/appointment/getAllAppointments",
   cancelAppointmentUrl: "index.php/appointment/cancelAppointment",
   closeAppointmentUrl: "index.php/appointment/closeAppointment",
   rescheduleAppointmentUrl: "index.php/appointment/rescheduleAppointment",

   saveUpdateLocations:"index.php/locations/addUpdateLocation",
   locationListUrl:"index.php/locations/getDoctorLocations",
   deactivateLocationUrl:"index.php/locations/deactivateLocation",
   deliveryMethodsUrl:"index.php/patient/getDeliveryMethods",


   //registartion
   doctorUrl:"index.php/doctor/saveUpdateDoctor",
   doctorDetailsUrl:"index.php/doctor/getDoctorDetails",
   loginCheckUrl:"index.php/authenticate/isLoggedIn",
   doctorDashUrl:"index.php/doctorDashboard/",
   logoutUrl:"index.php/authenticate/logout",

   createModifyStaffUrl:"index.php/staff/createModifyStaff",
   getStaffDetailsUrl: "index.php/staff/getStaffDetails",
   staffListingUrl: "index.php/staff/getDoctorsStaffList",


    //upload
    closeApptUploadFiles:"index.php/Upload/CloseApptUpload",
    PatientUploadimage:"index.php/Upload/PatientImageUpload",
    GaurdianUploadimage:"index.php/Upload/GuardianImageUpload"


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

        this.staffListingUrl = links.doctorsStaffListingUr;

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

        $("#dash-staff-manage-link").attr('href', controller.doctorsStaffListingUr);
        $("#dash-location-manage-link").attr('href', controller.ManageLocationsUrl);



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
        this.programmeListUrl = links.programmeListingsUrl;

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
          if(+response.status == 1){

            controller.clearModel();
            programmeView.refreshForm();
            window.location = controller.programmeListUrl;

          }

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxpdHkuanMiLCJsaW5rcy5qcyIsInZhbGlkYXRvci5qcyIsImRvY3RvckRhc2hib2FyZC5qcyIsIm1lZGljYWwucHJvZ3JhbW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1lZGljYWwucHJvZ3JhbW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9oZWxwZXIgZnVuY3Rpb24gdG8gZ2V0IHRoZSB1cmwgcXVlcnkgcGFyYW1ldGVyc1xyXG52YXIgdXRpbGl0eSA9IHtcclxuICBnZXRVUkxQYXJhbTogZnVuY3Rpb24obmFtZSl7XHJcbiAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcblxyXG4gICAgbmFtZSA9IG5hbWUucmVwbGFjZSgvW1xcW1xcXV0vZywgXCJcXFxcJCZcIik7XHJcblxyXG4gICAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cChcIls/Jl1cIiArIG5hbWUgKyBcIig9KFteJiNdKil8JnwjfCQpXCIpO1xyXG4gICAgdmFyIHJlc3VsdHMgPSByZWdleC5leGVjKHVybCk7XHJcblxyXG4gICAgaWYgKCFyZXN1bHRzKSByZXR1cm4gbnVsbDtcclxuICAgIGlmICghcmVzdWx0c1syXSkgcmV0dXJuICcnO1xyXG5cclxuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocmVzdWx0c1syXS5yZXBsYWNlKC9cXCsvZywgXCIgXCIpKTtcclxuICB9LFxyXG4gIGdldFRpbWVGcm9tTWludXRlczogIGZ1bmN0aW9uKG1pbnMpe1xyXG4gICAgdmFyIGhycyA9IG1pbnMvNjA7XHJcbiAgICB2YXIgbWlucyA9IG1pbnMlNjA7XHJcblxyXG4gICAgdmFyIG1kYXRlID0gbW9tZW50KHtob3VyczpocnMsIG1pbnV0ZXM6IG1pbnN9KTtcclxuXHJcbiAgICByZXR1cm4gbWRhdGUuZm9ybWF0KCdoaDptbSBBJyk7XHJcblxyXG4gIH0sXHJcblxyXG4gIGdldEFsZXJ0cyA6IGZ1bmN0aW9uKG1zZyxjbGFzc25tLGlkLGNvbnRhaW5lcil7XHJcblxyXG4gICAgICQoJy5wbXMtYWxlcnRzJykucmVtb3ZlKCk7XHJcblxyXG4gICAgdmFyIGFsZXJ0ID0gJCgnPGRpdiAgaWQgPSBcIicraWQrJ1wiIGNsYXNzPVwiIGFsZXJ0ICcgK2NsYXNzbm0rJyBwbXMtYWxlcnRzIGFsZXJ0LWRpc21pc3NpYmxlIGRvYy1wcm9maWxlLWJlZm9yZS1zdWJtaXQtd2FybmluZy1lcnJvclwiIHJvbGU9XCJhbGVydFwiPjxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPjxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+PC9idXR0b24+Jyttc2crJzwvZGl2PicpO1xyXG4gICAgJChjb250YWluZXIpLnByZXBlbmQoYWxlcnQpO1xyXG4gICAgY29uc29sZS5sb2coJ2FsZXJ0IGNyZWF0ZWQnKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgcmVtb3ZlQWxlcnRzOmZ1bmN0aW9uKCl7XHJcbiAgICAkKCcucG1zLWFsZXJ0cycpLnJlbW92ZSgpO1xyXG4gIH1cclxufVxyXG4iLCJ2YXIgbGlua3MgPSB7XHJcblxyXG5cclxuXHJcbiAgLy9sb2dpbiBqcyB1cmxzXHJcbiAgIGF1dGhlbnRpY2F0ZVVybCA6IFwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9hdXRoZW5pdGNhdGVVc2VyXCIsXHJcbiAgIHN1Y2Nlc3NSZWRpcmVjdFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9cIixcclxuICAgcmVnaXN0ZXJEb2N0b3JVcmwgOiBcImluZGV4LnBocC9kb2N0b3IvZG9jdG9ySW5mb1wiLFxyXG4gICBhZG1pblVybDpcImluZGV4LnBocC9hZG1pbkRhc2hib2FyZC9hZG1pblwiLFxyXG5cclxuICAgLy9wYXNzd29yZCByZXNldFxyXG4gICBwYXNzd29yZFJlc3RSZXF1ZXN0VXJsOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvcmVzZXRQYXNzd29yZFJlcXVlc3RcIixcclxuICAgbG9naW5Vcmw6IFwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9sb2dpblwiLFxyXG4gICBwYXNzd29yZFJlc2V0VXJsOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvcGFzc3dvcmRSZXNldFwiLFxyXG4gICBmb3Jnb3RQYXNzd29yZFVybDogXCJpbmRleC5waHAvYXV0aGVudGljYXRlL2ZvcmdvdFBhc3N3b3JkXCIsXHJcblxyXG4gICAvL2FkbWluIHJlbGF0ZWRcclxuICAgZG9jdG9yTGlzdGluZ1VybDogXCJpbmRleC5waHAvYWRtaW5EYXNoYm9hcmQvZG9jdG9yTGlzdGluZ1wiLFxyXG4gICBnZXRBbGxEb2N0b3JzVXJsOiBcImluZGV4LnBocC9hZG1pbkRhc2hib2FyZC9nZXRBbGxEb2N0b3JzXCIsXHJcbiAgIGFkbWluRG9jdG9yRWRpdFJlZGlyZWN0OlwiaW5kZXgucGhwL2FkbWluRGFzaGJvYXJkL2FkbWluRG9jdG9yRWRpdFwiLFxyXG5cclxuICAgbG9nb3V0VXJsIDogXCJpbmRleC5waHAvYXV0aGVudGljYXRlL2xvZ291dFwiLFxyXG5cclxuICAgLy9kb2N0b3IgZGFzaGJvYXJkIGxpbmtzXHJcbiAgIGRvY3RvclByb2ZpbGU6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9kb2N0b3JQcm9maWxlXCIsXHJcbiAgIGRhc2hib2FyZEhvbWVVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvXCIsXHJcbiAgIG5ld0FwcG9pbnRtZW50VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2Jvb2tBcHBvaW50bWVudFwiLFxyXG4gICBwYXRpZW50c0VudHJ5VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3BhdGllbnRzRW50cnlcIixcclxuICAgcGF0aWVudHNMaXN0aW5nVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3BhdGllbnRzTGlzdGluZ1wiLFxyXG4gICBjbG9zZUFwcG9pbnRtZW50VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2Nsb3NlQXBwb2ludG1lbnRcIixcclxuICAgZG9jdG9yc0FwcG9pbnRtZW50c0xpc3RVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvbGlzdEFwcG9pbnRtZW50XCIsXHJcbiAgIG5ld1NjaGVkdWxlVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL25ld1NjaGVkdWxlXCIsXHJcbiAgIGRlYWN0aXZhdGVTY2hlZHVsZVVybDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2RlYWN0aXZhdGVTY2hlZHVsZVwiLFxyXG4gICBsaXN0U2NoZWR1bGVVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvc2NoZWR1bGVMaXN0XCIsXHJcbiAgIGdldFNjaGVkdWxlQ2FsZW5kYXJVcmw6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9TY2hlZHVsZUNhbGVuZGVyVmlld1wiLFxyXG4gICBhZGRTdGFmZlVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9zdGFmZkVudHJ5XCIsXHJcbiAgIGRvY3RvcnNTdGFmZkxpc3RpbmdVciA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9zdGFmZkxpc3RpbmdcIixcclxuICAgcGF0aWVudHNIaXN0b3J5VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3BhdGllbnRIaXN0b3J5XCIsXHJcbiAgIGNyZWF0ZVByb2dyYW1Gb3JQYXRpZW50VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2NyZWF0ZU1lZGljYWxQcm9ncmFtXCIsXHJcbiAgIHByb2dyYW1tZUxpc3RpbmdzVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3Byb2dyYW1tZUxpc3RcIixcclxuICAgTWFuYWdlTG9jYXRpb25zVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3dvcmtMb2NhdGlvbk1hbmFnZW1lbnRcIixcclxuICAgZ2V0QW5hbHl0aWNzVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL0FuYWx5dGljc1JlcG9ydFwiLFxyXG4gICBnZXRDYWxlbmRlclVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jYWxlbmRhclRlbXBsYXRlXCIsXHJcbiAgIGFjY291bnRpbmdVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvYWNjb3VudGluZ1wiLFxyXG4gICBtZWRpY2luZVNlYXJjaFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9tZWRpY2luZVNlYXJjaFwiLFxyXG5cclxuICAgLy9zY2hlZHVsZVxyXG4gICBnZXRMb2NhdGlvblVybDogXCJpbmRleC5waHAvbG9jYXRpb25zL2dldERvY3RvckxvY2F0aW9uc1wiLFxyXG4gICBjcmVhdGVVcGRhdGVTY2hlZHVsZVVybDogXCJpbmRleC5waHAvc2NoZWR1bGUvY3JlYXRlVXBkYXRlU2NoZWR1bGVcIixcclxuICAgZ2V0U2VjaGR1bGVDYWxlbmRhckRldGFpbHNVcmw6IFwiaW5kZXgucGhwL3NjaGVkdWxlL2dldENhbGFuZGVyRGV0YWlsc1wiLFxyXG4gICBnZXRTZWNoZHVsZWZvckRlYWN0aXZhdGlvbjogXCJpbmRleC5waHAvc2NoZWR1bGUvZ2V0U2NoZWR1bGVzRm9yRGVhY3RpdmF0aW9uXCIsXHJcbiAgIGRlYWN0aXZhdGVTY2hlZHVsZURheXM6IFwiaW5kZXgucGhwL3NjaGVkdWxlL2RlYWN0aXZhdGVTY2hlZHVsZURheXNcIixcclxuXHJcbiAgIC8vcHJvZ3JhbW1lXHJcbiAgIGRvY3RvcnNQcm9ncmFtc1VybDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0RG9jdG9yc0NoZWNrdXBQcm9ncmFtc1wiLFxyXG4gICBwcm9ncmFtbWVFZGl0VXJsOlwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jcmVhdGVNZWRpY2FsUHJvZ3JhbVwiLFxyXG4gICBjcmVhdGVNb2RpZnlQcm9ncmFtbWVVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2NyZWF0ZU1vZGlmeVByb2dyYW1tZVwiLFxyXG4gICBnZXRQcm9ncmFtbWVVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldFByb2dyYW1tZXNcIixcclxuXHJcblxyXG4gICAvL3BhdGllbnRcclxuICAgcGF0aWVudERldGFpbFBlcnNpc3RVcmw6XCJpbmRleC5waHAvcGF0aWVudC9hZGRVcGRhdGVQYXRpZW50XCIsXHJcbiAgIHBhdGllbnRzRGV0YWlsc1VybDpcImluZGV4LnBocC9wYXRpZW50L2dldFBhdGllbnREZXRhaWxzXCIsXHJcbiAgIGxvZ2luQ2hlY2tVcmw6XCJpbmRleC5waHAvYXV0aGVudGljYXRlL2lzTG9nZ2VkSW5cIixcclxuICAgZ2V0UHJvZ3JhbW1lTGlzdDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0TWVkaWNhdGlvblByb2dyYW1tZUxpc3RcIixcclxuICAgcHJvZ3JhbW1lTGlzdERldGFpbHNVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldFByb2dyYW1tZUxpc3REZXRhaWxzXCIsXHJcbiAgIC8vcGF0aWVudHNQcm9ncmFtbWVzVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRQYXRpZW50UHJvZ3JhbW1lc1wiLFxyXG4gICBwYXRpZW50TGlzdGluZ1VybDpcImluZGV4LnBocC9wYXRpZW50L2dldFBhdGllbnRMaXN0XCIsXHJcbiAgIGdldFBhdGllbnRzRm9yQXV0b0ZpbGxVcmw6XCJpbmRleC5waHAvcGF0aWVudC9nZXRQYXRpZW50TGlzdEZvckF1dG9GaWxsXCIsXHJcbiAgIGdldFBhdGllbnRIaXN0b3J5VXJsOidpbmRleC5waHAvcGF0aWVudC9nZXRQYXRpZW50SGlzdG9yeScsXHJcbiAgIGdldHBhdGllbnRzSW1hZ2VVcmw6J2luZGV4LnBocC9wYXRpZW50L2dldFBhdGllbnRJbWFnZScsXHJcblxyXG5cclxuICAgYm9va0FwcG9pbnRtZW50VXJsOiBcImluZGV4LnBocC9hcHBvaW50bWVudC9ib29rQXBwb2ludG1lbnRcIixcclxuICAgZ2V0QXBwb2ludG1lbnRGb3JUaGVEYXlVcmw6IFwiaW5kZXgucGhwL2FwcG9pbnRtZW50L2dldEFwcG9pbnRtZW50c0ZvclRoZURheVwiLFxyXG4gICBnZXRBbGxBcHBvaW50bWVudHNVcmw6IFwiaW5kZXgucGhwL2FwcG9pbnRtZW50L2dldEFsbEFwcG9pbnRtZW50c1wiLFxyXG4gICBjYW5jZWxBcHBvaW50bWVudFVybDogXCJpbmRleC5waHAvYXBwb2ludG1lbnQvY2FuY2VsQXBwb2ludG1lbnRcIixcclxuICAgY2xvc2VBcHBvaW50bWVudFVybDogXCJpbmRleC5waHAvYXBwb2ludG1lbnQvY2xvc2VBcHBvaW50bWVudFwiLFxyXG4gICByZXNjaGVkdWxlQXBwb2ludG1lbnRVcmw6IFwiaW5kZXgucGhwL2FwcG9pbnRtZW50L3Jlc2NoZWR1bGVBcHBvaW50bWVudFwiLFxyXG5cclxuICAgc2F2ZVVwZGF0ZUxvY2F0aW9uczpcImluZGV4LnBocC9sb2NhdGlvbnMvYWRkVXBkYXRlTG9jYXRpb25cIixcclxuICAgbG9jYXRpb25MaXN0VXJsOlwiaW5kZXgucGhwL2xvY2F0aW9ucy9nZXREb2N0b3JMb2NhdGlvbnNcIixcclxuICAgZGVhY3RpdmF0ZUxvY2F0aW9uVXJsOlwiaW5kZXgucGhwL2xvY2F0aW9ucy9kZWFjdGl2YXRlTG9jYXRpb25cIixcclxuICAgZGVsaXZlcnlNZXRob2RzVXJsOlwiaW5kZXgucGhwL3BhdGllbnQvZ2V0RGVsaXZlcnlNZXRob2RzXCIsXHJcblxyXG5cclxuICAgLy9yZWdpc3RhcnRpb25cclxuICAgZG9jdG9yVXJsOlwiaW5kZXgucGhwL2RvY3Rvci9zYXZlVXBkYXRlRG9jdG9yXCIsXHJcbiAgIGRvY3RvckRldGFpbHNVcmw6XCJpbmRleC5waHAvZG9jdG9yL2dldERvY3RvckRldGFpbHNcIixcclxuICAgbG9naW5DaGVja1VybDpcImluZGV4LnBocC9hdXRoZW50aWNhdGUvaXNMb2dnZWRJblwiLFxyXG4gICBkb2N0b3JEYXNoVXJsOlwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9cIixcclxuICAgbG9nb3V0VXJsOlwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9sb2dvdXRcIixcclxuXHJcbiAgIGNyZWF0ZU1vZGlmeVN0YWZmVXJsOlwiaW5kZXgucGhwL3N0YWZmL2NyZWF0ZU1vZGlmeVN0YWZmXCIsXHJcbiAgIGdldFN0YWZmRGV0YWlsc1VybDogXCJpbmRleC5waHAvc3RhZmYvZ2V0U3RhZmZEZXRhaWxzXCIsXHJcbiAgIHN0YWZmTGlzdGluZ1VybDogXCJpbmRleC5waHAvc3RhZmYvZ2V0RG9jdG9yc1N0YWZmTGlzdFwiLFxyXG5cclxuXHJcbiAgICAvL3VwbG9hZFxyXG4gICAgY2xvc2VBcHB0VXBsb2FkRmlsZXM6XCJpbmRleC5waHAvVXBsb2FkL0Nsb3NlQXBwdFVwbG9hZFwiLFxyXG4gICAgUGF0aWVudFVwbG9hZGltYWdlOlwiaW5kZXgucGhwL1VwbG9hZC9QYXRpZW50SW1hZ2VVcGxvYWRcIixcclxuICAgIEdhdXJkaWFuVXBsb2FkaW1hZ2U6XCJpbmRleC5waHAvVXBsb2FkL0d1YXJkaWFuSW1hZ2VVcGxvYWRcIlxyXG5cclxuXHJcbn1cclxuIiwidmFsaWRhdG9yID0ge1xyXG4gIGlzRW1wdHlTdHJpbmc6IGZ1bmN0aW9uKHZhbHVlKXtcclxuICAgIGlmKCF2YWx1ZSB8fCAwID09PSB2YWx1ZS50cmltKCkubGVuZ3RoKXtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG5cclxuICAvL2RlZmluaW5nIHRoZSBoZWxwZXIgZnVuY3Rpb25zIGluIGdsb2JhbFxyXG5cclxuICAkKGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgY29uc29sZS5sb2coJ0RvY3RvciBEYXNoYm9hcmQganMgbG9hZGVkJyk7XHJcblxyXG4gICAgLy90b3AgbGV2ZWwgY29udHJvbGxlclxyXG4gICAgdmFyIGNvbnRyb2xsZXIgPSB7XHJcbiAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy93aXJpbmcgdGhlIG5hdmlnYXRpb25cclxuICAgICAgICB0aGlzLmxvZ291dFVybCA9IGxpbmtzLmxvZ291dFVybDtcclxuICAgICAgICB0aGlzLmRvY3RvclByb2ZpbGUgPSBsaW5rcy5kb2N0b3JQcm9maWxlO1xyXG4gICAgICAgIHRoaXMuZGFzaGJvYXJkSG9tZVVybCA9IGxpbmtzLmRhc2hib2FyZEhvbWVVcmw7XHJcbiAgICAgICAgdGhpcy5uZXdBcHBvaW50bWVudFVybCA9IGxpbmtzLm5ld0FwcG9pbnRtZW50VXJsO1xyXG4gICAgICAgIHRoaXMucGF0aWVudHNFbnRyeVVybCA9IGxpbmtzLnBhdGllbnRzRW50cnlVcmw7XHJcbiAgICAgICAgdGhpcy5wYXRpZW50c0xpc3RpbmdVcmwgPSBsaW5rcy5wYXRpZW50c0xpc3RpbmdVcmw7XHJcbiAgICAgICAgdGhpcy5jbG9zZUFwcG9pbnRtZW50VXJsID0gbGlua3MuY2xvc2VBcHBvaW50bWVudFVybDtcclxuICAgICAgICB0aGlzLmRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsID0gbGlua3MuZG9jdG9yc0FwcG9pbnRtZW50c0xpc3RVcmw7XHJcblxyXG4gICAgICAgIHRoaXMubmV3U2NoZWR1bGVVcmwgPSBsaW5rcy5uZXdTY2hlZHVsZVVybDtcclxuICAgICAgICB0aGlzLmxpc3RTY2hlZHVsZVVybCA9IHRoaXMubGlzdFNjaGVkdWxlVXJsO1xyXG4gICAgICAgIHRoaXMuU2NoZWR1bGVDYWxlbmRhclVybCA9IGxpbmtzLmdldFNjaGVkdWxlQ2FsZW5kYXJVcmw7XHJcbiAgICAgICAgdGhpcy5hZGRTdGFmZlVybCA9IGxpbmtzLmFkZFN0YWZmVXJsO1xyXG4gICAgICAgIHRoaXMuZG9jdG9yc1N0YWZmTGlzdGluZ1VyID0gbGlua3MuZG9jdG9yc1N0YWZmTGlzdGluZ1VyO1xyXG5cclxuICAgICAgICB0aGlzLnBhdGllbnRzSGlzdG9yeVVybCA9IGxpbmtzLnBhdGllbnRzSGlzdG9yeVVybDtcclxuXHJcbiAgICAgICAgdGhpcy5jcmVhdGVQcm9ncmFtRm9yUGF0aWVudFVybCA9IGxpbmtzLmNyZWF0ZVByb2dyYW1Gb3JQYXRpZW50VXJsIDtcclxuICAgICAgICB0aGlzLnByb2dyYW1tZUxpc3RpbmdzVXJsID0gbGlua3MucHJvZ3JhbW1lTGlzdGluZ3NVcmw7XHJcblxyXG4gICAgICAgIHRoaXMuTWFuYWdlTG9jYXRpb25zVXJsID0gbGlua3MuTWFuYWdlTG9jYXRpb25zVXJsO1xyXG4gICAgICAgIHRoaXMuQ2FsZW5kYXJUZW1wbGF0ZVVybCA9IGxpbmtzLmdldENhbGVuZGVyVXJsO1xyXG5cclxuICAgICAgICB0aGlzLmFuYWx5dGljc1JlcG9ydFVybCA9IGxpbmtzLmdldEFuYWx5dGljc1VybDtcclxuICAgICAgICB0aGlzLmFjY291bnRpbmdVcmwgPSBsaW5rcy5hY2NvdW50aW5nVXJsO1xyXG4gICAgICAgIHRoaXMubWVkaWNpbmVTZWFyY2hVcmwgPSBsaW5rcy5tZWRpY2luZVNlYXJjaFVybDtcclxuXHJcbiAgICAgICAgdGhpcy5zdGFmZkxpc3RpbmdVcmwgPSBsaW5rcy5kb2N0b3JzU3RhZmZMaXN0aW5nVXI7XHJcblxyXG4gICAgICAgIC8vZG8gc29tZXRobmcgYWJvdXQgZG9jdG9ycyBpbmZvIGFuZCByZWdpc3RyYXRpb25cclxuXHJcbiAgICAgICAgLy9UaGUgdXJsIGZyb20gdGhlIGJyb3dzZXIgIGNhbiBiZSBjb21wYXJlZCB0byBzZXQgdGhlIGFjdGl2ZSBuYXZpZ2F0aW9uXHJcbiAgICAgICAgbmF2Vmlldy5pbml0KCk7XHJcblxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBuYXZWaWV3ID0ge1xyXG4gICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAvL3dpcmluZyB0aGUgbmF2aWdhdGlvbiBjbGlja3NcclxuXHJcblxyXG4gICAgICAgICQoXCIjcG1zLWJyYW5kLWJ0bi1saW5rXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ1BNUyBicmFuZCBjbGljaycpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICQoXCIjdXNlci1Qcm9maWxlLUJ0bi1MaW5rXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmRvY3RvclByb2ZpbGUpO1xyXG5cclxuICAgICAgICAkKFwiI2RvY3Rvci1kYXNoLWxvZ291dC1idG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIubG9nb3V0VXJsKTtcclxuXHJcblxyXG5cclxuICAgICAgICAkKFwiI2Rhc2hib2FyZC1TZWN0aW9uLUJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5kYXNoYm9hcmRIb21lVXJsKTtcclxuXHJcbiAgICAgICAgJChcIiNhcHBvaW50bWVudC1zZWN0aW9uLWxpbmstYnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsKTtcclxuXHJcbiAgICAgICAgJChcIiNtYW5hZ2UtRG9jdG9ycy1TY2hlZHVsZS1TZWN0aW9uLUxpbmstQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLlNjaGVkdWxlQ2FsZW5kYXJVcmwpO1xyXG5cclxuICAgICAgICAkKFwiI2J0bi1wcm9ncmFtbWUtc2VjdGlvbi1saW5rXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLnByb2dyYW1tZUxpc3RpbmdzVXJsKTtcclxuXHJcbiAgICAgICAgJChcIiNjcmVhdGUtcHJvZ3JhbS1mb3ItcGF0aWVudC1zZWN0aW9uXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmNyZWF0ZVByb2dyYW1Gb3JQYXRpZW50VXJsKTtcclxuXHJcbiAgICAgICAgJChcIiNwYXRpZW50cy1FbnRyeS1TZWN0aW9uLUxpbmstQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLnBhdGllbnRzTGlzdGluZ1VybCk7XHJcblxyXG4gICAgICAgIC8vJChcIiNwYXRpZW50cy1lbnRyeS1jcmVhdGUtc2VjdGlvbi1saW5rLUJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5wYXRpZW50c0VudHJ5VXJsKTtcclxuICAgICAgICAvLyQoXCIjcGF0aWVudHMtSGlzdG9yeS1TZWN0aW9uLUxpbmstQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLnBhdGllbnRzSGlzdG9yeVVybCk7XHJcblxyXG4gICAgICAgICQoXCIjc3RhZmYtbWFuYWdtZW50LXNlY3Rpb24tbGluay1idG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIuZG9jdG9yc1N0YWZmTGlzdGluZ1VyKTtcclxuXHJcbiAgICAgICAgJChcIiNidG4tbWFuYWdlLWxvY2F0aW9uc1wiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5NYW5hZ2VMb2NhdGlvbnNVcmwpO1xyXG5cclxuICAgICAgICAkKFwiI2FuYWx5dGljcy1zaWRlLW5hdmlnYXRpb24tbGluay1idG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIuYW5hbHl0aWNzUmVwb3J0VXJsKTtcclxuICAgICAgICAkKFwiI2FjY291bnRpbmctc2lkZS1uYXZpZ2F0aW9uLWxpbmstYnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmFjY291bnRpbmdVcmwpO1xyXG4gICAgICAgICQoXCIjbWVkaWNpbmUtc2lkZS1uYXZpZ2F0aW9uLWxpbmstYnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLm1lZGljaW5lU2VhcmNoVXJsKTtcclxuXHJcbiAgICAgICAgJChcIiNkYXNoLXN0YWZmLW1hbmFnZS1saW5rXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmRvY3RvcnNTdGFmZkxpc3RpbmdVcik7XHJcbiAgICAgICAgJChcIiNkYXNoLWxvY2F0aW9uLW1hbmFnZS1saW5rXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLk1hbmFnZUxvY2F0aW9uc1VybCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8kKFwiI2Jvb2stQXBwb2ludG1lbnRzLVNlY3Rpb24tQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLm5ld0FwcG9pbnRtZW50VXJsKTtcclxuICAgICAgICAvLyQoXCIjY2xvc2UtQm9vay1BcHBvaW50bWVudC1TZWN0aW9uLUxpbmstQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmNsb3NlQXBwb2ludG1lbnRVcmwpO1xyXG4gICAgICAgIC8vJChcIiN2aWV3LUFwcG9pbnRtZW50LVNlY3Rpb24tTGluay1CdG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIuZG9jdG9yc0FwcG9pbnRtZW50c0xpc3RVcmwpO1xyXG4gICAgICAgIC8vJChcIiNtYW5hZ2UtRG9jdG9ycy1TY2hlZHVsZS1TZWN0aW9uLUxpbmstQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmxpc3RTY2hlZHVsZVVybCk7XHJcbiAgICAgICAgLy8kKFwiI21hbmFnZS1zY2hlZHVsZS1jcmVhdGUtc2VjdGlvbi1saW5rLUJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5uZXdTY2hlZHVsZVVybCk7XHJcbiAgICAgICAgLy8kKFwiI2NhbGVuZGFyLVRlbXBsYXRlLUJ0bi1MaW5rXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLkNhbGVuZGFyVGVtcGxhdGVVcmwpO1xyXG4gICAgICAgIC8vJChcIiNtYW5hZ2Utc2NoZWR1bGUtbGlzdC1zZWN0aW9uLWxpbmstQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLlNjaGVkdWxlQ2FsZW5kYXJVcmwpO1xyXG5cclxuICAgICAgICAkKFwiI290aGVyLXNldHRpbmdzLXNlY3Rpb24tbGluay1idG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChcIiNjYWxlbmRhci10ZW1wbGF0ZS1zZWN0aW9uLWxpbmstYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgIH0sXHJcbiAgICAgIHJlbmRlcjogZnVuY3Rpb24oKXtcclxuICAgICAgICAvL2hpZ2hsaWdodCB0aGUgcmlnaHQgbmF2aWdhdGlvblxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29udHJvbGxlci5pbml0KCk7XHJcblxyXG4gIH0oKSk7XHJcblxyXG59KTtcclxuIiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuXHJcbiAgJChmdW5jdGlvbigpe1xyXG4gICAgY29uc29sZS5sb2coJ21lZGljYWwgcHJvZ3JhbW1lIGpzIGxvYWRlZCAnKTtcclxuXHJcbiAgICB2YXIgbW9kZWwgPSB7XHJcbiAgICAgIHByb2dyYW1JZDogMCxcclxuICAgICAgcHJvZ3JhbW1lTmFtZTogXCJcIixcclxuICAgICAgcHJvZ3JhbWVMaXN0OltdLFxyXG4gICAgICBQcm9ncmFtbWVEZXRhaWxzOm51bGxcclxuICAgIH07XHJcblxyXG4gICAgdmFyIGNvbnRyb2xsZXIgPSB7XHJcbiAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVNb2RpZnlQcm9ncmFtbWVVcmwgPSBsaW5rcy5jcmVhdGVNb2RpZnlQcm9ncmFtbWVVcmw7XHJcbiAgICAgICAgdGhpcy5nZXRQcm9ncmFtbWVVcmwgPSBsaW5rcy5nZXRQcm9ncmFtbWVVcmw7XHJcbiAgICAgICAgdGhpcy5wcm9ncmFtbWVMaXN0VXJsID0gbGlua3MucHJvZ3JhbW1lTGlzdGluZ3NVcmw7XHJcblxyXG4gICAgICAgIHByb2dyYW1tZVZpZXcuaW5pdCgpO1xyXG5cclxuXHJcbiAgICAgICAgdmFyIHByb2dyYW1tZUlkID0gdXRpbGl0eS5nZXRVUkxQYXJhbSgnaWQnKTtcclxuXHJcbiAgICAgICAgaWYocHJvZ3JhbW1lSWQpe1xyXG4gICAgICAgICAgLy90aGlzIGlzIGEgdXBkYXRlIHBhdGllbnRzIGVudHJ5XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygncGF0aWVudCBJZCAnICsgcHJvZ3JhbW1lSWQpO1xyXG5cclxuICAgICAgICAgICQuZ2V0KCB0aGlzLmdldFByb2dyYW1tZVVybCAsIHtpZDpwcm9ncmFtbWVJZH0pXHJcbiAgICAgICAgICAuZG9uZShmdW5jdGlvbiggcmVzcG9uc2UgKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSk7XHJcblxyXG4gICAgICAgICAgICBtb2RlbCA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICAgIHByb2dyYW1tZVZpZXcucmVuZGVyKCk7XHJcblxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICB9LFxyXG4gICAgICBjbGVhck1vZGVsOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIG1vZGVsLnByb2dyYW1JZCA9IDA7XHJcbiAgICAgICAgbW9kZWwucHJvZ3JhbW1lTmFtZSA9IFwiXCI7XHJcbiAgICAgICAgbW9kZWwucHJvZ3JhbWVMaXN0ID0gW107XHJcbiAgICAgICAgbW9kZWwuUHJvZ3JhbW1lRGV0YWlscyA9IG51bGw7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2NsZWFyIG1vZGVsJyk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGdldFByb2dyYW1tZUxpc3Q6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIG1vZGVsLnByb2dyYW1lTGlzdDtcclxuICAgICAgfSxcclxuICAgICAgZ2V0UHJvZ3JhbW1lTmFtZTogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gbW9kZWwucHJvZ3JhbW1lTmFtZTtcclxuICAgICAgfSxcclxuICAgICAgZ2V0Q3VycmVudFByb2dyYW1tZURldGFpbDogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gbW9kZWwuUHJvZ3JhbW1lRGV0YWlscztcclxuICAgICAgfSxcclxuICAgICAgc2V0TmV3UHJvZ3JhbW1lRGV0YWlsc01vZGVsOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIG1vZGVsLlByb2dyYW1tZURldGFpbHMgPSB7XHJcbiAgICAgICAgICBpZDowLFxyXG4gICAgICAgICAgZHVyYXRpb246IFwiXCIsXHJcbiAgICAgICAgICB0ZXh0OiBcIlwiLFxyXG4gICAgICAgICAgdmFjY2luZTogXCJcIixcclxuICAgICAgICAgIGRvc2VObzogXCJcIixcclxuICAgICAgICAgIGluZGV4OiAwXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgICAgcmVtb3ZlUHJvZ3JhbW1lOiBmdW5jdGlvbihwcm9ncmFtKXtcclxuICAgICAgICBtb2RlbC5wcm9ncmFtZUxpc3Quc3BsaWNlKHByb2dyYW0uaW5kZXgsIDEpO1xyXG4gICAgICAgIC8vcmUgYXNzaWduaW5nIHRoZSBpbmRleFxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBtb2RlbC5wcm9ncmFtZUxpc3QubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgbW9kZWwucHJvZ3JhbWVMaXN0W2ldLmluZGV4ID0gaTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHVwZGF0ZVByb2dyYW1tZU5hbWU6IGZ1bmN0aW9uKG5hbWUpe1xyXG4gICAgICAgIG1vZGVsLnByb2dyYW1tZU5hbWUgPSBuYW1lO1xyXG4gICAgICB9LFxyXG4gICAgICBhZGRQcm9ncmFtbWU6ICBmdW5jdGlvbihwZHVyYXRpb24sIHB0ZXh0LCBwdmFjY2luZSwgcGRvc2VObyl7XHJcbiAgICAgICAgdmFyIHBvc24gPSBtb2RlbC5wcm9ncmFtZUxpc3QubGVuZ3RoO1xyXG5cclxuXHJcbiAgICAgICAgaWYobW9kZWwuUHJvZ3JhbW1lRGV0YWlscykge1xyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKCd1cGRhdGUgcHJvZ3JhbW1lIGRldGFpbHMgJyArIHBkdXJhdGlvbiArIHB0ZXh0ICsgICBKU09OLnN0cmluZ2lmeShtb2RlbC5Qcm9ncmFtbWVEZXRhaWxzKSApO1xyXG5cclxuICAgICAgICAgIG1vZGVsLlByb2dyYW1tZURldGFpbHMuZHVyYXRpb24gPSBwZHVyYXRpb247XHJcbiAgICAgICAgICBtb2RlbC5Qcm9ncmFtbWVEZXRhaWxzLnRleHQgPSBwdGV4dDtcclxuICAgICAgICAgIG1vZGVsLlByb2dyYW1tZURldGFpbHMudmFjY2luZSA9IHB2YWNjaW5lO1xyXG4gICAgICAgICAgbW9kZWwuUHJvZ3JhbW1lRGV0YWlscy5kb3NlTm8gPSBwZG9zZU5vO1xyXG5cclxuICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnbmV3IHByb2dyYW1tZSBkZXRhaWxzJyk7XHJcblxyXG4gICAgICAgICAgbW9kZWwuUHJvZ3JhbW1lRGV0YWlscyA9IHtcclxuICAgICAgICAgICAgaWQ6MCxcclxuICAgICAgICAgICAgZHVyYXRpb246IHBkdXJhdGlvbixcclxuICAgICAgICAgICAgdGV4dDogcHRleHQsXHJcbiAgICAgICAgICAgIHZhY2NpbmU6IHB2YWNjaW5lLFxyXG4gICAgICAgICAgICBkb3NlTm86IHBkb3NlTm8sXHJcbiAgICAgICAgICAgIGluZGV4OiBwb3NuXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgbW9kZWwucHJvZ3JhbWVMaXN0LnB1c2gobW9kZWwuUHJvZ3JhbW1lRGV0YWlscyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtb2RlbC5Qcm9ncmFtbWVEZXRhaWxzID0gbnVsbDtcclxuICAgICAgICBwcm9ncmFtbWVWaWV3LmNsZWFyRm9ybSgpO1xyXG5cclxuICAgICAgfSxcclxuICAgICAgcGVyc2lzdFByb2dyYW1tZTogZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgLy91cGRhdGUgdGhlIHByb2dyYW1tZSBuYW1lXHJcbiAgICAgICAgbW9kZWwucHJvZ3JhbW1lTmFtZSA9ICBwcm9ncmFtbWVWaWV3LnByb2dyYW1tZU5hbWUudmFsKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgJC5wb3N0KGNvbnRyb2xsZXIuY3JlYXRlTW9kaWZ5UHJvZ3JhbW1lVXJsICwgbW9kZWwpXHJcbiAgICAgICAgLmRvbmUoZnVuY3Rpb24oIHJlc3BvbnNlICkge1xyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdzYXZlIHJlc3BvbnNlICcgKyBKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xyXG4gICAgICAgICAgaWYoK3Jlc3BvbnNlLnN0YXR1cyA9PSAxKXtcclxuXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXIuY2xlYXJNb2RlbCgpO1xyXG4gICAgICAgICAgICBwcm9ncmFtbWVWaWV3LnJlZnJlc2hGb3JtKCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IGNvbnRyb2xsZXIucHJvZ3JhbW1lTGlzdFVybDtcclxuXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBwcm9ncmFtbWVWaWV3ID0ge1xyXG4gICAgICBpc0Zvcm1WYWxpZDpmYWxzZSxcclxuICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnByb2dyYW1tZU5hbWUgPSAkKCcjcHJvZ3JhbW1lLW5hbWUnKTtcclxuICAgICAgICB0aGlzLnRhYmxlQm9keSAgPSAkKCcjcHJvZ3JhbW1lLWxpc3QtdGFibGUtYm9keScpO1xyXG5cclxuICAgICAgICB0aGlzLmR1cmF0aW9uID0gJCgnI3R4dC1kdXJhdGlvbicpO1xyXG4gICAgICAgIHRoaXMuZHVyYXRpb25UZXh0ID0gJCgnI3R4dC1kdXJhdGlvbi10ZXh0Jyk7XHJcbiAgICAgICAgdGhpcy52YWNjaW5lID0gJCgnI3R4dC12YWNjaW5lJyk7XHJcbiAgICAgICAgdGhpcy5kb3NlTm8gPSAkKCcjdHh0LWRvc2Utbm8nKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuZ3JvdXBQcm9ncmFtbWVOYW1lID0gJCgnI2dyb3VwLXByb2dyYW1tZS1uYW1lJyk7XHJcbiAgICAgICAgdGhpcy5wcm9ncmFtbWVOYW1laGVscExhYmVsID0gJCgnI2hlbHAtcHJvZ3JhbW1lLW5hbWUnKTtcclxuICAgICAgICB0aGlzLmNvbW1vbkhlbHBMYWJlbCA9ICQoJyNoZWxwLWNvbW1vbi1tZXNzYWdlJyk7XHJcblxyXG5cclxuICAgICAgICB0aGlzLnByb2dyYW1tZU5hbWUub24oJ2NoYW5nZSBrZXl1cCBwYXN0ZSAnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgY29uc29sZS5sb2coKTtcclxuICAgICAgICAgIGNvbnRyb2xsZXIudXBkYXRlUHJvZ3JhbW1lTmFtZShwcm9ncmFtbWVWaWV3LnByb2dyYW1tZU5hbWUudmFsKCkpXHJcbiAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgIC8vd2lyaW5nIGV2ZW50c1xyXG4gICAgICAgICQoJyNidG4tYWRkLXJvdycpLmNsaWNrKChmdW5jdGlvbih2aWV3KXtcclxuXHJcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyIGR1cmF0aW9uVmFsID0gJCgnI3R4dC1kdXJhdGlvbicpLnZhbCgpO1xyXG4gICAgICAgICAgICB2YXIgZHVyYXRpb25UZXh0VmFsID0gJCgnI3R4dC1kdXJhdGlvbi10ZXh0JykudmFsKCk7XHJcbiAgICAgICAgICAgIHZhciB2YWNjaW5lVmFsID0gJCgnI3R4dC12YWNjaW5lJykudmFsKCk7XHJcbiAgICAgICAgICAgIHZhciBkb3NlTm9WYWwgPSAkKCcjdHh0LWRvc2Utbm8nKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKCFkdXJhdGlvblZhbCB8fFxyXG4gICAgICAgICAgICAgICFkdXJhdGlvblRleHRWYWx8fFxyXG4gICAgICAgICAgICAgICF2YWNjaW5lVmFsfHxcclxuICAgICAgICAgICAgICAhZG9zZU5vVmFsXHJcbiAgICAgICAgICAgICl7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ29uZSBvZiB0aGUgZmlsZWQgaXMgZW1wdHknKTtcclxuICAgICAgICAgICAgICBwcm9ncmFtbWVWaWV3LmNvbW1vbkhlbHBMYWJlbC5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgcHJvZ3JhbW1lVmlldy5jb21tb25IZWxwTGFiZWwudGV4dCgnUGxlYXNlIGVudGVyIGFsbCBkZXRhaWxzJyk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkYXRhIGVudGVyZWQgJyk7XHJcbiAgICAgICAgICAgICAgY29udHJvbGxlci5hZGRQcm9ncmFtbWUoZHVyYXRpb25WYWwsIGR1cmF0aW9uVGV4dFZhbCwgdmFjY2luZVZhbCwgZG9zZU5vVmFsKTtcclxuICAgICAgICAgICAgICBwcm9ncmFtbWVWaWV3LmNvbW1vbkhlbHBMYWJlbC5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgcHJvZ3JhbW1lVmlldy5yZW5kZXIoKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbW9kZWwgJyArIEpTT04uc3RyaW5naWZ5KG1vZGVsKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSkocHJvZ3JhbW1lVmlldykpO1xyXG5cclxuICAgICAgICAkKCcjYnRuLXN1Ym1pdC1wcm9ncmFtbWUnKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ3NhdmUgY2xpY2snKTtcclxuICAgICAgICAgIHByb2dyYW1tZVZpZXcudmFsaWRhdGVGb3JtKCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnZm9ybSBpcyB2YWxpZDonICsgIHByb2dyYW1tZVZpZXcuaXNGb3JtVmFsaWQpO1xyXG4gICAgICAgICAgaWYocHJvZ3JhbW1lVmlldy5pc0Zvcm1WYWxpZCl7XHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXIucGVyc2lzdFByb2dyYW1tZSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLndpcmVWYWxpZGF0aW9ucygpO1xyXG5cclxuICAgICAgfSxcclxuICAgICAgcmVmcmVzaEZvcm0oKXtcclxuICAgICAgICBwcm9ncmFtbWVWaWV3Lmdyb3VwUHJvZ3JhbW1lTmFtZS5yZW1vdmVDbGFzcygnaGFzLWVycm9yJyk7XHJcbiAgICAgICAgcHJvZ3JhbW1lVmlldy5wcm9ncmFtbWVOYW1laGVscExhYmVsLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICBwcm9ncmFtbWVWaWV3LmNvbW1vbkhlbHBMYWJlbC5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICAvL3Jlc2V0dGluZyBhbGwgdmFsaWRhdGlvbiBlcnJvcnNcclxuICAgICAgfSxcclxuICAgICAgd2lyZVZhbGlkYXRpb25zOiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICB0aGlzLnByb2dyYW1tZU5hbWUub24oJ2JsdXInLCBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgIHZhciBwcm9ncmFtbWVOYW1lID0gcHJvZ3JhbW1lVmlldy5wcm9ncmFtbWVOYW1lLnZhbCgpO1xyXG4gICAgICAgICAgdmFyIGlzRW1wdHkgPSB2YWxpZGF0b3IuaXNFbXB0eVN0cmluZyhwcm9ncmFtbWVOYW1lKTtcclxuXHJcbiAgICAgICAgICBpZihpc0VtcHR5KXtcclxuICAgICAgICAgICAgcHJvZ3JhbW1lVmlldy5ncm91cFByb2dyYW1tZU5hbWUuYWRkQ2xhc3MoJ2hhcy1lcnJvcicpO1xyXG4gICAgICAgICAgICBwcm9ncmFtbWVWaWV3LnByb2dyYW1tZU5hbWVoZWxwTGFiZWwucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHByb2dyYW1tZVZpZXcuZ3JvdXBQcm9ncmFtbWVOYW1lLnJlbW92ZUNsYXNzKCdoYXMtZXJyb3InKTtcclxuICAgICAgICAgICAgcHJvZ3JhbW1lVmlldy5wcm9ncmFtbWVOYW1laGVscExhYmVsLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9LFxyXG4gICAgICB2YWxpZGF0ZUZvcm06IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIHByb2dyYW1tZVZpZXcuaXNGb3JtVmFsaWQgPSB0cnVlO1xyXG5cclxuICAgICAgICB2YXIgcHJvZ3JhbW1lTmFtZSA9IHByb2dyYW1tZVZpZXcucHJvZ3JhbW1lTmFtZS52YWwoKTtcclxuICAgICAgICB2YXIgcHJvZ3JhbW1lTGlzdCA9IGNvbnRyb2xsZXIuZ2V0UHJvZ3JhbW1lTGlzdCgpO1xyXG5cclxuICAgICAgICB2YXIgaXNFbXB0eSA9IHZhbGlkYXRvci5pc0VtcHR5U3RyaW5nKHByb2dyYW1tZU5hbWUpO1xyXG5cclxuICAgICAgICBpZihpc0VtcHR5KXtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCd2YWxpZGFlIHByb2dyYW1tZSBuYW1lJyApO1xyXG4gICAgICAgICAgcHJvZ3JhbW1lVmlldy5pc0Zvcm1WYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgcHJvZ3JhbW1lVmlldy5ncm91cFByb2dyYW1tZU5hbWUuYWRkQ2xhc3MoJ2hhcy1lcnJvcicpO1xyXG4gICAgICAgICAgcHJvZ3JhbW1lVmlldy5wcm9ncmFtbWVOYW1laGVscExhYmVsLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIHByb2dyYW1tZVZpZXcuZ3JvdXBQcm9ncmFtbWVOYW1lLnJlbW92ZUNsYXNzKCdoYXMtZXJyb3InKTtcclxuICAgICAgICAgIHByb2dyYW1tZVZpZXcucHJvZ3JhbW1lTmFtZWhlbHBMYWJlbC5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihwcm9ncmFtbWVMaXN0Lmxlbmd0aCA8PSAwKXtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdwcm9ncmFtbWUgbGlzdCB2YWxpZGF0aW9uJyk7XHJcbiAgICAgICAgICBwcm9ncmFtbWVWaWV3LmlzRm9ybVZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICBwcm9ncmFtbWVWaWV3LmNvbW1vbkhlbHBMYWJlbC5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICBwcm9ncmFtbWVWaWV3LmNvbW1vbkhlbHBMYWJlbC50ZXh0KCdQbGVhc2UgZW50ZXIgYXRsZWFzdCBvbmUgcHJvZ3JhbW1lIGVudHJ5Jyk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICBwcm9ncmFtbWVWaWV3LmNvbW1vbkhlbHBMYWJlbC5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgIH0sXHJcbiAgICAgIGNsZWFyRm9ybTogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmR1cmF0aW9uLnZhbCgnJyk7XHJcbiAgICAgICAgdGhpcy5kdXJhdGlvblRleHQudmFsKCcnKTtcclxuICAgICAgICB0aGlzLnZhY2NpbmUudmFsKCcnKTtcclxuICAgICAgICB0aGlzLmRvc2VOby52YWwoJycpO1xyXG4gICAgICB9LFxyXG4gICAgICByZW5kZXI6IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIHZhciBwcm9ncmFtbWVOYW1lID0gY29udHJvbGxlci5nZXRQcm9ncmFtbWVOYW1lKCk7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRwcm9ncmFtbWVEZXRhaWwgPSBjb250cm9sbGVyLmdldEN1cnJlbnRQcm9ncmFtbWVEZXRhaWwoKTtcclxuICAgICAgICB2YXIgcHJvZ3JhbW1lTGlzdCA9IGNvbnRyb2xsZXIuZ2V0UHJvZ3JhbW1lTGlzdCgpO1xyXG5cclxuICAgICAgICAvL3VwZGF0aW5nIHRoZSB2YWx1ZXMgaW4gdGhlIHZpZXdcclxuXHJcbiAgICAgICAgdGhpcy5wcm9ncmFtbWVOYW1lLnZhbChwcm9ncmFtbWVOYW1lKTtcclxuXHJcbiAgICAgICAgaWYoY3VycmVudHByb2dyYW1tZURldGFpbCl7XHJcbiAgICAgICAgICB0aGlzLmR1cmF0aW9uLnZhbChjdXJyZW50cHJvZ3JhbW1lRGV0YWlsLmR1cmF0aW9uKTtcclxuICAgICAgICAgIHRoaXMuZHVyYXRpb25UZXh0LnZhbChjdXJyZW50cHJvZ3JhbW1lRGV0YWlsLnRleHQpO1xyXG4gICAgICAgICAgdGhpcy52YWNjaW5lLnZhbChjdXJyZW50cHJvZ3JhbW1lRGV0YWlsLnZhY2NpbmUpO1xyXG4gICAgICAgICAgdGhpcy5kb3NlTm8udmFsKGN1cnJlbnRwcm9ncmFtbWVEZXRhaWwuZG9zZU5vKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcmVtb3ZlIHRoZSBhZGRlZCByb3dzXHJcbiAgICAgICAgJCgnLnByb2ctYWRkZWQtcm93cycpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICB2YXIgdGFibGVIZWFkZXJDbG9uZSA9ICQoJyNwcm9ncmFtbWUtdGFibGUtaGVhZGVyJykuY2xvbmUoKTtcclxuICAgICAgICAvL3RoaXMudGFibGVCb2R5LnByZXBlbmQodGFibGVIZWFkZXJDbG9uZSk7XHJcblxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBwcm9ncmFtbWVMaXN0Lmxlbmd0aDsgaSsrKXtcclxuXHJcbiAgICAgICAgICB2YXIgdHIgPSAkKCc8dHIvPicpO1xyXG4gICAgICAgICAgdHIuYWRkQ2xhc3MoJ3Byb2ctYWRkZWQtcm93cycpXHJcblxyXG4gICAgICAgICAgdmFyIHRkID0gJCgnPHRkLz4nKTtcclxuICAgICAgICAgIHRkLnRleHQocHJvZ3JhbW1lTGlzdFtpXS5kdXJhdGlvbik7XHJcbiAgICAgICAgICB0ci5hcHBlbmQodGQpO1xyXG5cclxuICAgICAgICAgIHZhciB0ZCA9ICQoJzx0ZC8+Jyk7XHJcbiAgICAgICAgICB0ZC50ZXh0KHByb2dyYW1tZUxpc3RbaV0udGV4dCk7XHJcbiAgICAgICAgICB0ci5hcHBlbmQodGQpO1xyXG5cclxuICAgICAgICAgIHZhciB0ZCA9ICQoJzx0ZC8+Jyk7XHJcbiAgICAgICAgICB0ZC50ZXh0KHByb2dyYW1tZUxpc3RbaV0udmFjY2luZSk7XHJcbiAgICAgICAgICB0ci5hcHBlbmQodGQpO1xyXG5cclxuICAgICAgICAgIHZhciB0ZCA9ICQoJzx0ZC8+Jyk7XHJcbiAgICAgICAgICB0ZC50ZXh0KHByb2dyYW1tZUxpc3RbaV0uZG9zZU5vKTtcclxuICAgICAgICAgIHRyLmFwcGVuZCh0ZCk7XHJcblxyXG4gICAgICAgICAgdmFyIHRkID0gJCgnPGEvPicse1xyXG4gICAgICAgICAgICB0ZXh0OiAnUmVtb3ZlJyxcclxuICAgICAgICAgICAgY2xhc3M6IFwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi1zbVwiXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICB0ZC5jbGljaygoZnVuY3Rpb24ocHJvZ3JhbW1lKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHByb2dyYW1tZSkpO1xyXG4gICAgICAgICAgICAgIC8vICBwcm9ncmFtbWVMaXN0W3Bvc2l0aW9uIC0xXSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZW1vdmUgY2xpY2sgb246ICcgKyBKU09OLnN0cmluZ2lmeShwcm9ncmFtbWUpKTtcclxuICAgICAgICAgICAgICBjb250cm9sbGVyLnJlbW92ZVByb2dyYW1tZShwcm9ncmFtbWUpO1xyXG4gICAgICAgICAgICAgIHByb2dyYW1tZVZpZXcucmVuZGVyKCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgfSkocHJvZ3JhbW1lTGlzdFtpXSkpO1xyXG5cclxuICAgICAgICAgIHRyLmFwcGVuZCh0ZCk7XHJcblxyXG5cclxuICAgICAgICAgIHZhciBlZGl0TGluayA9ICQoJzxhLz4nLHtcclxuICAgICAgICAgICAgdGV4dDogJ0VkaXQnLFxyXG4gICAgICAgICAgICBjbGFzczogXCJcIlxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgZWRpdExpbmsuY2xpY2soKGZ1bmN0aW9uKHByb2dyYW1tZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShwcm9ncmFtbWUpKTtcclxuICAgICAgICAgICAgICAvLyAgcHJvZ3JhbW1lTGlzdFtwb3NpdGlvbiAtMV0gPSBudWxsXHJcblxyXG4gICAgICAgICAgICAgIG1vZGVsLlByb2dyYW1tZURldGFpbHMgPSBwcm9ncmFtbWU7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2VkaXQgYnV0dG9uOiAnICsgSlNPTi5zdHJpbmdpZnkocHJvZ3JhbW1lKSk7XHJcbiAgICAgICAgICAgICAgcHJvZ3JhbW1lVmlldy5yZW5kZXIoKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB9KShwcm9ncmFtbWVMaXN0W2ldKSk7XHJcblxyXG4gICAgICAgICAgdmFyIHRkID0gJCgnPHRkLz4nKTtcclxuICAgICAgICAgIHRkLmFwcGVuZChlZGl0TGluayk7XHJcbiAgICAgICAgICB0ci5hcHBlbmQodGQpO1xyXG5cclxuXHJcbiAgICAgICAgICB0aGlzLnRhYmxlQm9keS5hcHBlbmQodHIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29udHJvbGxlci5pbml0KCk7XHJcblxyXG4gIH0oKSk7XHJcblxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
