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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxpdHkuanMiLCJsaW5rcy5qcyIsInZhbGlkYXRvci5qcyIsImRvY3RvckRhc2hib2FyZC5qcyIsIm1lZGljYWwucHJvZ3JhbW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWVkaWNhbC5wcm9ncmFtbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL2hlbHBlciBmdW5jdGlvbiB0byBnZXQgdGhlIHVybCBxdWVyeSBwYXJhbWV0ZXJzXHJcbnZhciB1dGlsaXR5ID0ge1xyXG4gIGdldFVSTFBhcmFtOiBmdW5jdGlvbihuYW1lKXtcclxuICAgIHZhciB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuXHJcbiAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC9bXFxbXFxdXS9nLCBcIlxcXFwkJlwiKTtcclxuXHJcbiAgICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKFwiWz8mXVwiICsgbmFtZSArIFwiKD0oW14mI10qKXwmfCN8JClcIik7XHJcbiAgICB2YXIgcmVzdWx0cyA9IHJlZ2V4LmV4ZWModXJsKTtcclxuXHJcbiAgICBpZiAoIXJlc3VsdHMpIHJldHVybiBudWxsO1xyXG4gICAgaWYgKCFyZXN1bHRzWzJdKSByZXR1cm4gJyc7XHJcblxyXG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHRzWzJdLnJlcGxhY2UoL1xcKy9nLCBcIiBcIikpO1xyXG4gIH0sXHJcbiAgZ2V0VGltZU1pbnV0ZXNBcnJheTogIGZ1bmN0aW9uKCl7XHJcblxyXG4gIH1cclxufVxyXG4iLCJ2YXIgbGlua3MgPSB7XHJcblxyXG4gIC8vbG9naW4ganMgdXJsc1xyXG4gICBhdXRoZW50aWNhdGVVcmwgOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvYXV0aGVuaXRjYXRlVXNlclwiLFxyXG4gICBzdWNjZXNzUmVkaXJlY3RVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvXCIsXHJcbiAgIHJlZ2lzdGVyRG9jdG9yVXJsIDogXCJpbmRleC5waHAvZG9jdG9yL2RvY3RvckluZm9cIixcclxuICAgYWRtaW5Vcmw6XCJpbmRleC5waHAvYWRtaW5EYXNoYm9hcmQvYWRtaW5cIixcclxuXHJcbiAgIC8vYWRtaW4gcmVsYXRlZFxyXG4gICBkb2N0b3JMaXN0aW5nVXJsOiBcImluZGV4LnBocC9hZG1pbkRhc2hib2FyZC9kb2N0b3JMaXN0aW5nXCIsXHJcblxyXG4gICBsb2dvdXRVcmwgOiBcImluZGV4LnBocC9hdXRoZW50aWNhdGUvbG9nb3V0XCIsXHJcblxyXG4gICAvL2RvY3RvciBkYXNoYm9hcmQgbGlua3MgXHJcbiAgIGRvY3RvclByb2ZpbGUgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvZG9jdG9yUHJvZmlsZVwiLFxyXG4gICBkYXNoYm9hcmRIb21lVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL1wiLFxyXG4gICBuZXdBcHBvaW50bWVudFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9ib29rQXBwb2ludG1lbnRcIixcclxuICAgcGF0aWVudHNFbnRyeVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wYXRpZW50c0VudHJ5XCIsXHJcbiAgIHBhdGllbnRzTGlzdGluZ1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wYXRpZW50c0xpc3RpbmdcIixcclxuICAgY2xvc2VBcHBvaW50bWVudFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jbG9zZUFwcG9pbnRtZW50XCIsXHJcbiAgIGRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2xpc3RBcHBvaW50bWVudFwiLFxyXG4gICBuZXdTY2hlZHVsZVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9uZXdTY2hlZHVsZVwiLFxyXG4gICBsaXN0U2NoZWR1bGVVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvc2NoZWR1bGVMaXN0XCIsXHJcbiAgIGdldFNjaGVkdWxlQ2FsZW5kYXJVcmw6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9TY2hlZHVsZUNhbGVuZGVyVmlld1wiLFxyXG4gICBhZGRTdGFmZlVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9zdGFmZkVudHJ5XCIsXHJcbiAgIGRvY3RvcnNTdGFmZkxpc3RpbmdVciA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9zdGFmZkxpc3RpbmdcIixcclxuICAgcGF0aWVudHNIaXN0b3J5VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3BhdGllbnRIaXN0b3J5XCIsXHJcbiAgIGNyZWF0ZVByb2dyYW1Gb3JQYXRpZW50VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2NyZWF0ZU1lZGljYWxQcm9ncmFtXCIsXHJcbiAgIHByb2dyYW1tZUxpc3RpbmdzVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3Byb2dyYW1tZUxpc3RcIixcclxuICAgTWFuYWdlTG9jYXRpb25zVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3dvcmtMb2NhdGlvbk1hbmFnZW1lbnRcIixcclxuICAgZ2V0QW5hbHl0aWNzVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL0FuYWx5dGljc1JlcG9ydFwiLFxyXG4gICBnZXRDYWxlbmRlclVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jYWxlbmRhclRlbXBsYXRlXCIsXHJcbiAgIGFjY291bnRpbmdVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvYWNjb3VudGluZ1wiLFxyXG4gICBtZWRpY2luZVNlYXJjaFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9tZWRpY2luZVNlYXJjaFwiLFxyXG5cclxuXHJcbiAgIC8vc2NoZWR1bGVcclxuICAgZ2V0TG9jYXRpb25Vcmw6IFwiaW5kZXgucGhwL2xvY2F0aW9ucy9nZXREb2N0b3JMb2NhdGlvbnNcIixcclxuICAgY3JlYXRlVXBkYXRlU2NoZWR1bGVVcmw6IFwiaW5kZXgucGhwL3NjaGVkdWxlL2NyZWF0ZVVwZGF0ZVNjaGVkdWxlXCIsXHJcblxyXG4gICAvL3Byb2dyYW1tZVxyXG4gICBwcm9ncmFtbWVMaXN0VXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRNZWRpY2F0aW9uUHJvZ3JhbW1lTGlzdFwiLFxyXG4gICBwcm9ncmFtbWVFZGl0VXJsOlwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jcmVhdGVNZWRpY2FsUHJvZ3JhbVwiLFxyXG4gICBjcmVhdGVNb2RpZnlQcm9ncmFtbWVVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2NyZWF0ZU1vZGlmeVByb2dyYW1tZVwiLFxyXG4gICBnZXRQcm9ncmFtbWVVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldFByb2dyYW1tZXNcIixcclxuXHJcblxyXG4gICAvL3BhdGllbnRcclxuICAgcGF0aWVudERldGFpbFBlcnNpc3RVcmw6XCJpbmRleC5waHAvcGF0aWVudC9hZGRVcGRhdGVQYXRpZW50XCIsXHJcbiAgIHBhdGllbnRzRGV0YWlsc1VybDpcImluZGV4LnBocC9wYXRpZW50L2dldFBhdGllbnREZXRhaWxzXCIsXHJcbiAgIGxvZ2luQ2hlY2tVcmw6XCJpbmRleC5waHAvYXV0aGVudGljYXRlL2lzTG9nZ2VkSW5cIixcclxuICAgZ2V0UHJvZ3JhbW1lTGlzdDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0TWVkaWNhdGlvblByb2dyYW1tZUxpc3RcIixcclxuICAgcHJvZ3JhbW1lTGlzdERldGFpbHNVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldFByb2dyYW1tZUxpc3REZXRhaWxzXCIsXHJcbiAgIHBhdGllbnRzUHJvZ3JhbW1lc1VybDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0UGF0aWVudFByb2dyYW1tZXNcIixcclxuICAgcGF0aWVudExpc3RpbmdVcmw6XCJpbmRleC5waHAvcGF0aWVudC9nZXRQYXRpZW50TGlzdFwiLFxyXG5cclxuICAgc2F2ZVVwZGF0ZUxvY2F0aW9uczpcImluZGV4LnBocC9sb2NhdGlvbnMvYWRkVXBkYXRlTG9jYXRpb25cIixcclxuICAgbG9jYXRpb25MaXN0VXJsOlwiaW5kZXgucGhwL2xvY2F0aW9ucy9nZXREb2N0b3JMb2NhdGlvbnNcIixcclxuICAgZGVsaXZlcnlNZXRob2RzVXJsOlwiaW5kZXgucGhwL3BhdGllbnQvZ2V0RGVsaXZlcnlNZXRob2RzXCIsXHJcblxyXG5cclxuICAgLy9yZWdpc3RhcnRpb25cclxuICAgZG9jdG9yVXJsOlwiaW5kZXgucGhwL2RvY3Rvci9zYXZlVXBkYXRlRG9jdG9yXCIsXHJcbiAgIGRvY3RvckRldGFpbHNVcmw6XCJpbmRleC5waHAvZG9jdG9yL2dldERvY3RvckRldGFpbHNcIixcclxuICAgbG9naW5DaGVja1VybDpcImluZGV4LnBocC9hdXRoZW50aWNhdGUvaXNMb2dnZWRJblwiLFxyXG4gICBkb2N0b3JEYXNoVXJsOlwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9cIixcclxuICAgbG9nb3V0VXJsOlwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9sb2dvdXRcIixcclxuXHJcbiAgIGNyZWF0ZU1vZGlmeVN0YWZmVXJsOlwiaW5kZXgucGhwL3N0YWZmL2NyZWF0ZU1vZGlmeVN0YWZmXCIsXHJcbiAgIGdldFN0YWZmRGV0YWlsc1VybDogXCJpbmRleC5waHAvc3RhZmYvZ2V0U3RhZmZEZXRhaWxzXCIsXHJcbiAgIHN0YWZmTGlzdGluZ1VybDogXCJpbmRleC5waHAvc3RhZmYvZ2V0RG9jdG9yc1N0YWZmTGlzdFwiXHJcblxyXG59XHJcbiIsInZhbGlkYXRvciA9IHtcclxuICBpc0VtcHR5U3RyaW5nOiBmdW5jdGlvbih2YWx1ZSl7XHJcbiAgICBpZighdmFsdWUgfHwgMCA9PT0gdmFsdWUudHJpbSgpLmxlbmd0aCl7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuXHJcbiAgLy9kZWZpbmluZyB0aGUgaGVscGVyIGZ1bmN0aW9ucyBpbiBnbG9iYWxcclxuXHJcbiAgJChmdW5jdGlvbigpe1xyXG5cclxuICAgIGNvbnNvbGUubG9nKCdEb2N0b3IgRGFzaGJvYXJkIGpzIGxvYWRlZCcpO1xyXG5cclxuICAgIC8vdG9wIGxldmVsIGNvbnRyb2xsZXJcclxuICAgIHZhciBjb250cm9sbGVyID0ge1xyXG4gICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vd2lyaW5nIHRoZSBuYXZpZ2F0aW9uXHJcbiAgICAgICAgdGhpcy5sb2dvdXRVcmwgPSBsaW5rcy5sb2dvdXRVcmw7XHJcbiAgICAgICAgdGhpcy5kb2N0b3JQcm9maWxlID0gbGlua3MuZG9jdG9yUHJvZmlsZTtcclxuICAgICAgICB0aGlzLmRhc2hib2FyZEhvbWVVcmwgPSBsaW5rcy5kYXNoYm9hcmRIb21lVXJsO1xyXG4gICAgICAgIHRoaXMubmV3QXBwb2ludG1lbnRVcmwgPSBsaW5rcy5uZXdBcHBvaW50bWVudFVybDtcclxuICAgICAgICB0aGlzLnBhdGllbnRzRW50cnlVcmwgPSBsaW5rcy5wYXRpZW50c0VudHJ5VXJsO1xyXG4gICAgICAgIHRoaXMucGF0aWVudHNMaXN0aW5nVXJsID0gbGlua3MucGF0aWVudHNMaXN0aW5nVXJsO1xyXG4gICAgICAgIHRoaXMuY2xvc2VBcHBvaW50bWVudFVybCA9IGxpbmtzLmNsb3NlQXBwb2ludG1lbnRVcmw7XHJcbiAgICAgICAgdGhpcy5kb2N0b3JzQXBwb2ludG1lbnRzTGlzdFVybCA9IGxpbmtzLmRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsO1xyXG5cclxuICAgICAgICB0aGlzLm5ld1NjaGVkdWxlVXJsID0gbGlua3MubmV3U2NoZWR1bGVVcmw7XHJcbiAgICAgICAgdGhpcy5saXN0U2NoZWR1bGVVcmwgPSB0aGlzLmxpc3RTY2hlZHVsZVVybDtcclxuICAgICAgICB0aGlzLlNjaGVkdWxlQ2FsZW5kYXJVcmwgPSBsaW5rcy5nZXRTY2hlZHVsZUNhbGVuZGFyVXJsO1xyXG4gICAgICAgIHRoaXMuYWRkU3RhZmZVcmwgPSBsaW5rcy5hZGRTdGFmZlVybDtcclxuICAgICAgICB0aGlzLmRvY3RvcnNTdGFmZkxpc3RpbmdVciA9IGxpbmtzLmRvY3RvcnNTdGFmZkxpc3RpbmdVcjtcclxuXHJcbiAgICAgICAgdGhpcy5wYXRpZW50c0hpc3RvcnlVcmwgPSBsaW5rcy5wYXRpZW50c0hpc3RvcnlVcmw7XHJcblxyXG4gICAgICAgIHRoaXMuY3JlYXRlUHJvZ3JhbUZvclBhdGllbnRVcmwgPSBsaW5rcy5jcmVhdGVQcm9ncmFtRm9yUGF0aWVudFVybCA7XHJcbiAgICAgICAgdGhpcy5wcm9ncmFtbWVMaXN0aW5nc1VybCA9IGxpbmtzLnByb2dyYW1tZUxpc3RpbmdzVXJsO1xyXG5cclxuICAgICAgICB0aGlzLk1hbmFnZUxvY2F0aW9uc1VybCA9IGxpbmtzLk1hbmFnZUxvY2F0aW9uc1VybDtcclxuICAgICAgICB0aGlzLkNhbGVuZGFyVGVtcGxhdGVVcmwgPSBsaW5rcy5nZXRDYWxlbmRlclVybDtcclxuXHJcbiAgICAgICAgdGhpcy5hbmFseXRpY3NSZXBvcnRVcmwgPSBsaW5rcy5nZXRBbmFseXRpY3NVcmw7XHJcbiAgICAgICAgdGhpcy5hY2NvdW50aW5nVXJsID0gbGlua3MuYWNjb3VudGluZ1VybDtcclxuICAgICAgICB0aGlzLm1lZGljaW5lU2VhcmNoVXJsID0gbGlua3MubWVkaWNpbmVTZWFyY2hVcmw7XHJcbiAgICAgICAgLy9kbyBzb21ldGhuZyBhYm91dCBkb2N0b3JzIGluZm8gYW5kIHJlZ2lzdHJhdGlvblxyXG5cclxuICAgICAgICAvL1RoZSB1cmwgZnJvbSB0aGUgYnJvd3NlciAgY2FuIGJlIGNvbXBhcmVkIHRvIHNldCB0aGUgYWN0aXZlIG5hdmlnYXRpb25cclxuICAgICAgICBuYXZWaWV3LmluaXQoKTtcclxuXHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdmFyIG5hdlZpZXcgPSB7XHJcbiAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIC8vd2lyaW5nIHRoZSBuYXZpZ2F0aW9uIGNsaWNrc1xyXG5cclxuXHJcbiAgICAgICAgJChcIiNwbXMtYnJhbmQtYnRuLWxpbmtcIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnUE1TIGJyYW5kIGNsaWNrJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgJChcIiN1c2VyLVByb2ZpbGUtQnRuLUxpbmtcIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIuZG9jdG9yUHJvZmlsZSk7XHJcblxyXG4gICAgICAgICQoXCIjZG9jdG9yLWRhc2gtbG9nb3V0LWJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5sb2dvdXRVcmwpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICQoXCIjZGFzaGJvYXJkLVNlY3Rpb24tQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmRhc2hib2FyZEhvbWVVcmwpO1xyXG5cclxuICAgICAgICAkKFwiI2FwcG9pbnRtZW50LXNlY3Rpb24tbGluay1idG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIuZG9jdG9yc0FwcG9pbnRtZW50c0xpc3RVcmwpO1xyXG5cclxuICAgICAgICAkKFwiI21hbmFnZS1Eb2N0b3JzLVNjaGVkdWxlLVNlY3Rpb24tTGluay1CdG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIuU2NoZWR1bGVDYWxlbmRhclVybCk7XHJcblxyXG4gICAgICAgICQoXCIjYnRuLXByb2dyYW1tZS1zZWN0aW9uLWxpbmtcIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIucHJvZ3JhbW1lTGlzdGluZ3NVcmwpO1xyXG5cclxuICAgICAgICAkKFwiI2NyZWF0ZS1wcm9ncmFtLWZvci1wYXRpZW50LXNlY3Rpb25cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIuY3JlYXRlUHJvZ3JhbUZvclBhdGllbnRVcmwpO1xyXG5cclxuICAgICAgICAkKFwiI3BhdGllbnRzLUVudHJ5LVNlY3Rpb24tTGluay1CdG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIucGF0aWVudHNMaXN0aW5nVXJsKTtcclxuXHJcbiAgICAgICAgLy8kKFwiI3BhdGllbnRzLWVudHJ5LWNyZWF0ZS1zZWN0aW9uLWxpbmstQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLnBhdGllbnRzRW50cnlVcmwpO1xyXG4gICAgICAgIC8vJChcIiNwYXRpZW50cy1IaXN0b3J5LVNlY3Rpb24tTGluay1CdG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIucGF0aWVudHNIaXN0b3J5VXJsKTtcclxuXHJcbiAgICAgICAgJChcIiNzdGFmZi1tYW5hZ21lbnQtc2VjdGlvbi1saW5rLWJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5kb2N0b3JzU3RhZmZMaXN0aW5nVXIpO1xyXG5cclxuICAgICAgICAkKFwiI2J0bi1tYW5hZ2UtbG9jYXRpb25zXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLk1hbmFnZUxvY2F0aW9uc1VybCk7XHJcblxyXG4gICAgICAgICQoXCIjYW5hbHl0aWNzLXNpZGUtbmF2aWdhdGlvbi1saW5rLWJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5hbmFseXRpY3NSZXBvcnRVcmwpO1xyXG4gICAgICAgICQoXCIjYWNjb3VudGluZy1zaWRlLW5hdmlnYXRpb24tbGluay1idG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIuYWNjb3VudGluZ1VybCk7XHJcbiAgICAgICAgJChcIiNtZWRpY2luZS1zaWRlLW5hdmlnYXRpb24tbGluay1idG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIubWVkaWNpbmVTZWFyY2hVcmwpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vJChcIiNib29rLUFwcG9pbnRtZW50cy1TZWN0aW9uLUJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5uZXdBcHBvaW50bWVudFVybCk7XHJcbiAgICAgICAgLy8kKFwiI2Nsb3NlLUJvb2stQXBwb2ludG1lbnQtU2VjdGlvbi1MaW5rLUJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5jbG9zZUFwcG9pbnRtZW50VXJsKTtcclxuICAgICAgICAvLyQoXCIjdmlldy1BcHBvaW50bWVudC1TZWN0aW9uLUxpbmstQnRuXCIpLmF0dHIoJ2hyZWYnLCBjb250cm9sbGVyLmRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsKTtcclxuICAgICAgICAvLyQoXCIjbWFuYWdlLURvY3RvcnMtU2NoZWR1bGUtU2VjdGlvbi1MaW5rLUJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5saXN0U2NoZWR1bGVVcmwpO1xyXG4gICAgICAgIC8vJChcIiNtYW5hZ2Utc2NoZWR1bGUtY3JlYXRlLXNlY3Rpb24tbGluay1CdG5cIikuYXR0cignaHJlZicsIGNvbnRyb2xsZXIubmV3U2NoZWR1bGVVcmwpO1xyXG4gICAgICAgIC8vJChcIiNjYWxlbmRhci1UZW1wbGF0ZS1CdG4tTGlua1wiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5DYWxlbmRhclRlbXBsYXRlVXJsKTtcclxuICAgICAgICAvLyQoXCIjbWFuYWdlLXNjaGVkdWxlLWxpc3Qtc2VjdGlvbi1saW5rLUJ0blwiKS5hdHRyKCdocmVmJywgY29udHJvbGxlci5TY2hlZHVsZUNhbGVuZGFyVXJsKTtcclxuXHJcbiAgICAgICAgJChcIiNvdGhlci1zZXR0aW5ncy1zZWN0aW9uLWxpbmstYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoXCIjY2FsZW5kYXItdGVtcGxhdGUtc2VjdGlvbi1saW5rLWJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICB9LFxyXG4gICAgICByZW5kZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy9oaWdobGlnaHQgdGhlIHJpZ2h0IG5hdmlnYXRpb25cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnRyb2xsZXIuaW5pdCgpO1xyXG5cclxuICB9KCkpO1xyXG5cclxufSk7XHJcbiIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgJChmdW5jdGlvbigpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdtZWRpY2FsIHByb2dyYW1tZSBqcyBsb2FkZWQgJyk7XHJcblxyXG4gICAgdmFyIG1vZGVsID0ge1xyXG4gICAgICBwcm9ncmFtSWQ6IDAsXHJcbiAgICAgIHByb2dyYW1tZU5hbWU6IFwiXCIsXHJcbiAgICAgIHByb2dyYW1lTGlzdDpbXSxcclxuICAgICAgUHJvZ3JhbW1lRGV0YWlsczpudWxsXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBjb250cm9sbGVyID0ge1xyXG4gICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuY3JlYXRlTW9kaWZ5UHJvZ3JhbW1lVXJsID0gbGlua3MuY3JlYXRlTW9kaWZ5UHJvZ3JhbW1lVXJsO1xyXG4gICAgICAgIHRoaXMuZ2V0UHJvZ3JhbW1lVXJsID0gbGlua3MuZ2V0UHJvZ3JhbW1lVXJsO1xyXG5cclxuICAgICAgICBwcm9ncmFtbWVWaWV3LmluaXQoKTtcclxuXHJcblxyXG4gICAgICAgIHZhciBwcm9ncmFtbWVJZCA9IHV0aWxpdHkuZ2V0VVJMUGFyYW0oJ2lkJyk7XHJcblxyXG4gICAgICAgIGlmKHByb2dyYW1tZUlkKXtcclxuICAgICAgICAgIC8vdGhpcyBpcyBhIHVwZGF0ZSBwYXRpZW50cyBlbnRyeVxyXG4gICAgICAgICAgY29uc29sZS5sb2coJ3BhdGllbnQgSWQgJyArIHByb2dyYW1tZUlkKTtcclxuXHJcbiAgICAgICAgICAkLmdldCggdGhpcy5nZXRQcm9ncmFtbWVVcmwgLCB7aWQ6cHJvZ3JhbW1lSWR9KVxyXG4gICAgICAgICAgLmRvbmUoZnVuY3Rpb24oIHJlc3BvbnNlICkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xyXG5cclxuICAgICAgICAgICAgbW9kZWwgPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgICBwcm9ncmFtbWVWaWV3LnJlbmRlcigpO1xyXG5cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgfSxcclxuICAgICAgY2xlYXJNb2RlbDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgIG1vZGVsLnByb2dyYW1JZCA9IDA7XHJcbiAgICAgICAgICBtb2RlbC5wcm9ncmFtbWVOYW1lID0gXCJcIjtcclxuICAgICAgICAgIG1vZGVsLnByb2dyYW1lTGlzdCA9IFtdO1xyXG4gICAgICAgICAgbW9kZWwuUHJvZ3JhbW1lRGV0YWlscyA9IG51bGw7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnY2xlYXIgbW9kZWwnKTtcclxuICAgICAgfSxcclxuICAgICAgZ2V0UHJvZ3JhbW1lTGlzdDogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gbW9kZWwucHJvZ3JhbWVMaXN0O1xyXG4gICAgICB9LFxyXG4gICAgICBnZXRQcm9ncmFtbWVOYW1lOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiBtb2RlbC5wcm9ncmFtbWVOYW1lO1xyXG4gICAgICB9LFxyXG4gICAgICBnZXRDdXJyZW50UHJvZ3JhbW1lRGV0YWlsOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiBtb2RlbC5Qcm9ncmFtbWVEZXRhaWxzO1xyXG4gICAgICB9LFxyXG4gICAgICBzZXROZXdQcm9ncmFtbWVEZXRhaWxzTW9kZWw6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbW9kZWwuUHJvZ3JhbW1lRGV0YWlscyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhY2NpbmU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvc2VObzogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICAgIHJlbW92ZVByb2dyYW1tZTogZnVuY3Rpb24ocHJvZ3JhbSl7XHJcbiAgICAgICAgbW9kZWwucHJvZ3JhbWVMaXN0LnNwbGljZShwcm9ncmFtLmluZGV4LCAxKTtcclxuICAgICAgICAvL3JlIGFzc2lnbmluZyB0aGUgaW5kZXhcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgbW9kZWwucHJvZ3JhbWVMaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbW9kZWwucHJvZ3JhbWVMaXN0W2ldLmluZGV4ID0gaTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHVwZGF0ZVByb2dyYW1tZU5hbWU6IGZ1bmN0aW9uKG5hbWUpe1xyXG4gICAgICAgIG1vZGVsLnByb2dyYW1tZU5hbWUgPSBuYW1lO1xyXG4gICAgICB9LFxyXG4gICAgICBhZGRQcm9ncmFtbWU6ICBmdW5jdGlvbihwZHVyYXRpb24sIHB0ZXh0LCBwdmFjY2luZSwgcGRvc2VObyl7XHJcbiAgICAgICAgdmFyIHBvc24gPSBtb2RlbC5wcm9ncmFtZUxpc3QubGVuZ3RoO1xyXG5cclxuXHJcbiAgICAgICAgICBpZihtb2RlbC5Qcm9ncmFtbWVEZXRhaWxzKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndXBkYXRlIHByb2dyYW1tZSBkZXRhaWxzICcgKyBwZHVyYXRpb24gKyBwdGV4dCArICAgSlNPTi5zdHJpbmdpZnkobW9kZWwuUHJvZ3JhbW1lRGV0YWlscykgKTtcclxuXHJcbiAgICAgICAgICAgIG1vZGVsLlByb2dyYW1tZURldGFpbHMuZHVyYXRpb24gPSBwZHVyYXRpb247XHJcbiAgICAgICAgICAgIG1vZGVsLlByb2dyYW1tZURldGFpbHMudGV4dCA9IHB0ZXh0O1xyXG4gICAgICAgICAgICBtb2RlbC5Qcm9ncmFtbWVEZXRhaWxzLnZhY2NpbmUgPSBwdmFjY2luZTtcclxuICAgICAgICAgICAgbW9kZWwuUHJvZ3JhbW1lRGV0YWlscy5kb3NlTm8gPSBwZG9zZU5vO1xyXG5cclxuICAgICAgICAgIH1lbHNle1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ25ldyBwcm9ncmFtbWUgZGV0YWlscycpO1xyXG5cclxuICAgICAgICAgICAgbW9kZWwuUHJvZ3JhbW1lRGV0YWlscyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IHBkdXJhdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogcHRleHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhY2NpbmU6IHB2YWNjaW5lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3NlTm86IHBkb3NlTm8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBwb3NuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBtb2RlbC5wcm9ncmFtZUxpc3QucHVzaChtb2RlbC5Qcm9ncmFtbWVEZXRhaWxzKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgbW9kZWwuUHJvZ3JhbW1lRGV0YWlscyA9IG51bGw7XHJcbiAgICAgICAgcHJvZ3JhbW1lVmlldy5jbGVhckZvcm0oKTtcclxuXHJcbiAgICAgIH0sXHJcbiAgICAgIHBlcnNpc3RQcm9ncmFtbWU6IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIC8vdXBkYXRlIHRoZSBwcm9ncmFtbWUgbmFtZVxyXG4gICAgICAgIG1vZGVsLnByb2dyYW1tZU5hbWUgPSAgcHJvZ3JhbW1lVmlldy5wcm9ncmFtbWVOYW1lLnZhbCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICQucG9zdChjb250cm9sbGVyLmNyZWF0ZU1vZGlmeVByb2dyYW1tZVVybCAsIG1vZGVsKVxyXG4gICAgICAgICAuZG9uZShmdW5jdGlvbiggcmVzcG9uc2UgKSB7XHJcblxyXG4gICAgICAgICAgIGNvbnNvbGUubG9nKCdzYXZlIHJlc3BvbnNlICcgKyBKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xyXG4gICAgICAgICAgIGNvbnRyb2xsZXIuY2xlYXJNb2RlbCgpO1xyXG4gICAgICAgICAgIHByb2dyYW1tZVZpZXcucmVmcmVzaEZvcm0oKTtcclxuICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdmFyIHByb2dyYW1tZVZpZXcgPSB7XHJcbiAgICAgIGlzRm9ybVZhbGlkOmZhbHNlLFxyXG4gICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMucHJvZ3JhbW1lTmFtZSA9ICQoJyNwcm9ncmFtbWUtbmFtZScpO1xyXG4gICAgICAgIHRoaXMudGFibGVCb2R5ICA9ICQoJyNwcm9ncmFtbWUtbGlzdC10YWJsZS1ib2R5Jyk7XHJcblxyXG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSAkKCcjdHh0LWR1cmF0aW9uJyk7XHJcbiAgICAgICAgdGhpcy5kdXJhdGlvblRleHQgPSAkKCcjdHh0LWR1cmF0aW9uLXRleHQnKTtcclxuICAgICAgICB0aGlzLnZhY2NpbmUgPSAkKCcjdHh0LXZhY2NpbmUnKTtcclxuICAgICAgICB0aGlzLmRvc2VObyA9ICQoJyN0eHQtZG9zZS1ubycpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5ncm91cFByb2dyYW1tZU5hbWUgPSAkKCcjZ3JvdXAtcHJvZ3JhbW1lLW5hbWUnKTtcclxuICAgICAgICB0aGlzLnByb2dyYW1tZU5hbWVoZWxwTGFiZWwgPSAkKCcjaGVscC1wcm9ncmFtbWUtbmFtZScpO1xyXG4gICAgICAgIHRoaXMuY29tbW9uSGVscExhYmVsID0gJCgnI2hlbHAtY29tbW9uLW1lc3NhZ2UnKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMucHJvZ3JhbW1lTmFtZS5vbignY2hhbmdlIGtleXVwIHBhc3RlICcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygpO1xyXG4gICAgICAgICAgY29udHJvbGxlci51cGRhdGVQcm9ncmFtbWVOYW1lKHByb2dyYW1tZVZpZXcucHJvZ3JhbW1lTmFtZS52YWwoKSlcclxuICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgLy93aXJpbmcgZXZlbnRzXHJcbiAgICAgICAgJCgnI2J0bi1hZGQtcm93JykuY2xpY2soKGZ1bmN0aW9uKHZpZXcpe1xyXG5cclxuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgZHVyYXRpb25WYWwgPSAkKCcjdHh0LWR1cmF0aW9uJykudmFsKCk7XHJcbiAgICAgICAgICAgIHZhciBkdXJhdGlvblRleHRWYWwgPSAkKCcjdHh0LWR1cmF0aW9uLXRleHQnKS52YWwoKTtcclxuICAgICAgICAgICAgdmFyIHZhY2NpbmVWYWwgPSAkKCcjdHh0LXZhY2NpbmUnKS52YWwoKTtcclxuICAgICAgICAgICAgdmFyIGRvc2VOb1ZhbCA9ICQoJyN0eHQtZG9zZS1ubycpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgaWYoIWR1cmF0aW9uVmFsIHx8XHJcbiAgICAgICAgICAgICAgICFkdXJhdGlvblRleHRWYWx8fFxyXG4gICAgICAgICAgICAgICAhdmFjY2luZVZhbHx8XHJcbiAgICAgICAgICAgICAgICFkb3NlTm9WYWxcclxuICAgICAgICAgICAgICl7XHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvbmUgb2YgdGhlIGZpbGVkIGlzIGVtcHR5Jyk7XHJcbiAgICAgICAgICAgICAgIHByb2dyYW1tZVZpZXcuY29tbW9uSGVscExhYmVsLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgcHJvZ3JhbW1lVmlldy5jb21tb25IZWxwTGFiZWwudGV4dCgnUGxlYXNlIGVudGVyIGFsbCBkZXRhaWxzJyk7XHJcbiAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RhdGEgZW50ZXJlZCAnKTtcclxuICAgICAgICAgICAgICAgY29udHJvbGxlci5hZGRQcm9ncmFtbWUoZHVyYXRpb25WYWwsIGR1cmF0aW9uVGV4dFZhbCwgdmFjY2luZVZhbCwgZG9zZU5vVmFsKTtcclxuICAgICAgICAgICAgICAgcHJvZ3JhbW1lVmlldy5jb21tb25IZWxwTGFiZWwuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAgICBwcm9ncmFtbWVWaWV3LnJlbmRlcigpO1xyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbW9kZWwgJyArIEpTT04uc3RyaW5naWZ5KG1vZGVsKSk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSkocHJvZ3JhbW1lVmlldykpO1xyXG5cclxuICAgICAgICAkKCcjYnRuLXN1Ym1pdC1wcm9ncmFtbWUnKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ3NhdmUgY2xpY2snKTtcclxuICAgICAgICAgIHByb2dyYW1tZVZpZXcudmFsaWRhdGVGb3JtKCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnZm9ybSBpcyB2YWxpZDonICsgIHByb2dyYW1tZVZpZXcuaXNGb3JtVmFsaWQpO1xyXG4gICAgICAgICAgaWYocHJvZ3JhbW1lVmlldy5pc0Zvcm1WYWxpZCl7XHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXIucGVyc2lzdFByb2dyYW1tZSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLndpcmVWYWxpZGF0aW9ucygpO1xyXG5cclxuICAgICAgfSxcclxuICAgICAgcmVmcmVzaEZvcm0oKXtcclxuICAgICAgICBwcm9ncmFtbWVWaWV3Lmdyb3VwUHJvZ3JhbW1lTmFtZS5yZW1vdmVDbGFzcygnaGFzLWVycm9yJyk7XHJcbiAgICAgICAgcHJvZ3JhbW1lVmlldy5wcm9ncmFtbWVOYW1laGVscExhYmVsLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICBwcm9ncmFtbWVWaWV3LmNvbW1vbkhlbHBMYWJlbC5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICAvL3Jlc2V0dGluZyBhbGwgdmFsaWRhdGlvbiBlcnJvcnNcclxuICAgICAgfSxcclxuICAgICAgd2lyZVZhbGlkYXRpb25zOiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICB0aGlzLnByb2dyYW1tZU5hbWUub24oJ2JsdXInLCBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgIHZhciBwcm9ncmFtbWVOYW1lID0gcHJvZ3JhbW1lVmlldy5wcm9ncmFtbWVOYW1lLnZhbCgpO1xyXG4gICAgICAgICAgdmFyIGlzRW1wdHkgPSB2YWxpZGF0b3IuaXNFbXB0eVN0cmluZyhwcm9ncmFtbWVOYW1lKTtcclxuXHJcbiAgICAgICAgICBpZihpc0VtcHR5KXtcclxuICAgICAgICAgICAgcHJvZ3JhbW1lVmlldy5ncm91cFByb2dyYW1tZU5hbWUuYWRkQ2xhc3MoJ2hhcy1lcnJvcicpO1xyXG4gICAgICAgICAgICBwcm9ncmFtbWVWaWV3LnByb2dyYW1tZU5hbWVoZWxwTGFiZWwucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHByb2dyYW1tZVZpZXcuZ3JvdXBQcm9ncmFtbWVOYW1lLnJlbW92ZUNsYXNzKCdoYXMtZXJyb3InKTtcclxuICAgICAgICAgICAgcHJvZ3JhbW1lVmlldy5wcm9ncmFtbWVOYW1laGVscExhYmVsLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9LFxyXG4gICAgICB2YWxpZGF0ZUZvcm06IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIHByb2dyYW1tZVZpZXcuaXNGb3JtVmFsaWQgPSB0cnVlO1xyXG5cclxuICAgICAgICB2YXIgcHJvZ3JhbW1lTmFtZSA9IHByb2dyYW1tZVZpZXcucHJvZ3JhbW1lTmFtZS52YWwoKTtcclxuICAgICAgICB2YXIgcHJvZ3JhbW1lTGlzdCA9IGNvbnRyb2xsZXIuZ2V0UHJvZ3JhbW1lTGlzdCgpO1xyXG5cclxuICAgICAgICB2YXIgaXNFbXB0eSA9IHZhbGlkYXRvci5pc0VtcHR5U3RyaW5nKHByb2dyYW1tZU5hbWUpO1xyXG5cclxuICAgICAgICBpZihpc0VtcHR5KXtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCd2YWxpZGFlIHByb2dyYW1tZSBuYW1lJyApO1xyXG4gICAgICAgICAgcHJvZ3JhbW1lVmlldy5pc0Zvcm1WYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgcHJvZ3JhbW1lVmlldy5ncm91cFByb2dyYW1tZU5hbWUuYWRkQ2xhc3MoJ2hhcy1lcnJvcicpO1xyXG4gICAgICAgICAgcHJvZ3JhbW1lVmlldy5wcm9ncmFtbWVOYW1laGVscExhYmVsLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIHByb2dyYW1tZVZpZXcuZ3JvdXBQcm9ncmFtbWVOYW1lLnJlbW92ZUNsYXNzKCdoYXMtZXJyb3InKTtcclxuICAgICAgICAgIHByb2dyYW1tZVZpZXcucHJvZ3JhbW1lTmFtZWhlbHBMYWJlbC5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihwcm9ncmFtbWVMaXN0Lmxlbmd0aCA8PSAwKXtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdwcm9ncmFtbWUgbGlzdCB2YWxpZGF0aW9uJyk7XHJcbiAgICAgICAgICBwcm9ncmFtbWVWaWV3LmlzRm9ybVZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICBwcm9ncmFtbWVWaWV3LmNvbW1vbkhlbHBMYWJlbC5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICBwcm9ncmFtbWVWaWV3LmNvbW1vbkhlbHBMYWJlbC50ZXh0KCdQbGVhc2UgZW50ZXIgYXRsZWFzdCBvbmUgcHJvZ3JhbW1lIGVudHJ5Jyk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICBwcm9ncmFtbWVWaWV3LmNvbW1vbkhlbHBMYWJlbC5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgIH0sXHJcbiAgICAgIGNsZWFyRm9ybTogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmR1cmF0aW9uLnZhbCgnJyk7XHJcbiAgICAgICAgdGhpcy5kdXJhdGlvblRleHQudmFsKCcnKTtcclxuICAgICAgICB0aGlzLnZhY2NpbmUudmFsKCcnKTtcclxuICAgICAgICB0aGlzLmRvc2VOby52YWwoJycpO1xyXG4gICAgICB9LFxyXG4gICAgICByZW5kZXI6IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIHZhciBwcm9ncmFtbWVOYW1lID0gY29udHJvbGxlci5nZXRQcm9ncmFtbWVOYW1lKCk7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRwcm9ncmFtbWVEZXRhaWwgPSBjb250cm9sbGVyLmdldEN1cnJlbnRQcm9ncmFtbWVEZXRhaWwoKTtcclxuICAgICAgICB2YXIgcHJvZ3JhbW1lTGlzdCA9IGNvbnRyb2xsZXIuZ2V0UHJvZ3JhbW1lTGlzdCgpO1xyXG5cclxuICAgICAgICAvL3VwZGF0aW5nIHRoZSB2YWx1ZXMgaW4gdGhlIHZpZXdcclxuXHJcbiAgICAgICAgdGhpcy5wcm9ncmFtbWVOYW1lLnZhbChwcm9ncmFtbWVOYW1lKTtcclxuXHJcbiAgICAgICAgaWYoY3VycmVudHByb2dyYW1tZURldGFpbCl7XHJcbiAgICAgICAgICB0aGlzLmR1cmF0aW9uLnZhbChjdXJyZW50cHJvZ3JhbW1lRGV0YWlsLmR1cmF0aW9uKTtcclxuICAgICAgICAgIHRoaXMuZHVyYXRpb25UZXh0LnZhbChjdXJyZW50cHJvZ3JhbW1lRGV0YWlsLnRleHQpO1xyXG4gICAgICAgICAgdGhpcy52YWNjaW5lLnZhbChjdXJyZW50cHJvZ3JhbW1lRGV0YWlsLnZhY2NpbmUpO1xyXG4gICAgICAgICAgdGhpcy5kb3NlTm8udmFsKGN1cnJlbnRwcm9ncmFtbWVEZXRhaWwuZG9zZU5vKTtcclxuICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9yZW1vdmUgdGhlIGFkZGVkIHJvd3NcclxuICAgICAgICAkKCcucHJvZy1hZGRlZC1yb3dzJykucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgIHZhciB0YWJsZUhlYWRlckNsb25lID0gJCgnI3Byb2dyYW1tZS10YWJsZS1oZWFkZXInKS5jbG9uZSgpO1xyXG4gICAgICAgIC8vdGhpcy50YWJsZUJvZHkucHJlcGVuZCh0YWJsZUhlYWRlckNsb25lKTtcclxuXHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHByb2dyYW1tZUxpc3QubGVuZ3RoOyBpKyspe1xyXG5cclxuICAgICAgICAgIHZhciB0ciA9ICQoJzx0ci8+Jyk7XHJcbiAgICAgICAgICB0ci5hZGRDbGFzcygncHJvZy1hZGRlZC1yb3dzJylcclxuXHJcbiAgICAgICAgICB2YXIgdGQgPSAkKCc8dGQvPicpO1xyXG4gICAgICAgICAgdGQudGV4dChwcm9ncmFtbWVMaXN0W2ldLmR1cmF0aW9uKTtcclxuICAgICAgICAgIHRyLmFwcGVuZCh0ZCk7XHJcblxyXG4gICAgICAgICAgdmFyIHRkID0gJCgnPHRkLz4nKTtcclxuICAgICAgICAgIHRkLnRleHQocHJvZ3JhbW1lTGlzdFtpXS50ZXh0KTtcclxuICAgICAgICAgIHRyLmFwcGVuZCh0ZCk7XHJcblxyXG4gICAgICAgICAgdmFyIHRkID0gJCgnPHRkLz4nKTtcclxuICAgICAgICAgIHRkLnRleHQocHJvZ3JhbW1lTGlzdFtpXS52YWNjaW5lKTtcclxuICAgICAgICAgIHRyLmFwcGVuZCh0ZCk7XHJcblxyXG4gICAgICAgICAgdmFyIHRkID0gJCgnPHRkLz4nKTtcclxuICAgICAgICAgIHRkLnRleHQocHJvZ3JhbW1lTGlzdFtpXS5kb3NlTm8pO1xyXG4gICAgICAgICAgdHIuYXBwZW5kKHRkKTtcclxuXHJcbiAgICAgICAgICB2YXIgdGQgPSAkKCc8YS8+Jyx7XHJcbiAgICAgICAgICAgIHRleHQ6ICdSZW1vdmUnLFxyXG4gICAgICAgICAgICBjbGFzczogXCJidG4gYnRuLWRlZmF1bHQgYnRuLXNtXCJcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIHRkLmNsaWNrKChmdW5jdGlvbihwcm9ncmFtbWUpe1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocHJvZ3JhbW1lKSk7XHJcbiAgICAgICAgICAgICAgLy8gIHByb2dyYW1tZUxpc3RbcG9zaXRpb24gLTFdID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlbW92ZSBjbGljayBvbjogJyArIEpTT04uc3RyaW5naWZ5KHByb2dyYW1tZSkpO1xyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIucmVtb3ZlUHJvZ3JhbW1lKHByb2dyYW1tZSk7XHJcbiAgICAgICAgICAgICAgcHJvZ3JhbW1lVmlldy5yZW5kZXIoKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB9KShwcm9ncmFtbWVMaXN0W2ldKSk7XHJcblxyXG4gICAgICAgICAgdHIuYXBwZW5kKHRkKTtcclxuXHJcblxyXG4gICAgICAgICAgdmFyIGVkaXRMaW5rID0gJCgnPGEvPicse1xyXG4gICAgICAgICAgICB0ZXh0OiAnRWRpdCcsXHJcbiAgICAgICAgICAgIGNsYXNzOiBcIlwiXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBlZGl0TGluay5jbGljaygoZnVuY3Rpb24ocHJvZ3JhbW1lKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHByb2dyYW1tZSkpO1xyXG4gICAgICAgICAgICAgIC8vICBwcm9ncmFtbWVMaXN0W3Bvc2l0aW9uIC0xXSA9IG51bGxcclxuXHJcbiAgICAgICAgICAgICAgbW9kZWwuUHJvZ3JhbW1lRGV0YWlscyA9IHByb2dyYW1tZTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZWRpdCBidXR0b246ICcgKyBKU09OLnN0cmluZ2lmeShwcm9ncmFtbWUpKTtcclxuICAgICAgICAgICAgICBwcm9ncmFtbWVWaWV3LnJlbmRlcigpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH0pKHByb2dyYW1tZUxpc3RbaV0pKTtcclxuXHJcbiAgICAgICAgICB2YXIgdGQgPSAkKCc8dGQvPicpO1xyXG4gICAgICAgICAgdGQuYXBwZW5kKGVkaXRMaW5rKTtcclxuICAgICAgICAgIHRyLmFwcGVuZCh0ZCk7XHJcblxyXG5cclxuICAgICAgICAgIHRoaXMudGFibGVCb2R5LmFwcGVuZCh0cik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb250cm9sbGVyLmluaXQoKTtcclxuXHJcbiAgICAgIH0oKSk7XHJcblxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
