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



          $("#btn-programme-section-link").click(function(e){
                  e.preventDefault();

          });

            $("#create-program-for-patient-section").click(function(e){
                    e.preventDefault();
            console.log('create program for patient');
            window.location.href = controller.createProgramForPatientUrl;
            });

            $("#btn-manage-locations").click(function(e){
                    e.preventDefault();
            console.log('manage locations');
            window.location.href = controller.ManageLocationsUrl;
            });



            $("#btn-list-program-section").click(function(e){
              e.preventDefault();
              window.location.href = controller.programmeListingsUrl;
            });



            $("#patients-entry-create-section-link-Btn").click(function(e){
              e.preventDefault();
              console.log('patients Entryclick');
              window.location.href = controller.patientsEntryUrl;
            });

          $("#patients-entry-list-section-link-Btn").click(function(e){
            e.preventDefault();
            console.log('patients listing click');
            window.location.href = controller.patientsListingUrl;
          });

          $("#user-Profile-Btn-Link").click(function(e){
              e.preventDefault();
              console.log('user profile click');
              window.location.href = controller.doctorProfile;

          });

          $("#doctor-dash-logout-btn").click(function(e){
            e.preventDefault();
            console.log('logout click');
            window.location.href = controller.logoutUrl;
          });

          $("#dashboard-Section-Btn").click(function(e){
              e.preventDefault();
              window.location.href = controller.dashboardHomeUrl;
              console.log('dashboard click');
          });

          $("#book-Appointments-Section-Btn").click(function(e){
              e.preventDefault();
              window.location.href = controller.newAppointmentUrl;
          });

          $("#close-Book-Appointment-Section-Link-Btn").click(function(e){
                e.preventDefault();
                window.location.href = controller.closeAppointmentUrl;
          });

          $("#view-Appointment-Section-Link-Btn").click(function(e){
                e.preventDefault();
                window.location.href = controller.doctorsAppointmentsListUrl;
          });


          $("#manage-Doctors-Schedule-Section-Link-Btn").click(function(e){
              e.preventDefault();
              console.log('schedule click');
          });

          $("#manage-schedule-create-section-link-Btn").click(function(e){
              e.preventDefault();
              console.log('new schedule click');
              window.location.href = controller.newScheduleUrl;
          });

          $("#manage-schedule-list-section-link-Btn").click(function(e){
              e.preventDefault();
              console.log('schedule list click');
              window.location.href = controller.listScheduleUrl;
          });


           $("#add-Staff-Section-Link-Btn").click(function(e){
               e.preventDefault();
               window.location.href = controller.addStaffUrl;
           });

           $("#btn-staff-listing").click(function(e){
                e.preventDefault();
                window.location.href = controller.doctorsStaffListingUr;
           });

            $("#calendar-Template-Btn-Link").click(function(e){
                e.preventDefault();
                window.location.href = controller.CalendarTemplateUrl;
               console.log("hello hid");
            });

           $("#patients-History-Section-Link-Btn").click(function(e){
               e.preventDefault();
               window.location.href = controller.patientsHistoryUrl;
           });


            $("#manage-schedule-list-section-link-Btn").click(function(e){
               e.preventDefault();
               window.location.href = controller.ScheduleCalendarUrl;
           });

             $("#appointment-section-link-btn").click(function(e){
               e.preventDefault();
           });
            $("#patients-Entry-Section-Link-Btn").click(function(e){
               e.preventDefault();
           });

             $("#staff-managment-section-link-btn").click(function(e){
               e.preventDefault();
           });
             $("#other-settings-section-link-btn").click(function(e){
               e.preventDefault();
           });
             $("#calendar-template-section-link-btn").click(function(e){
               e.preventDefault();
           });


           $("#analytics-side-navigation-link-btn").click(function(e){
               e.preventDefault();
               window.location.href = controller.analyticsReportUrl;
           });

           $("#accounting-side-navigation-link-btn").click(function(e){
               e.preventDefault();
               window.location.href = controller.accountingUrl;
           });

           $("#medicine-side-navigation-link-btn").click(function(e){
               e.preventDefault();
               window.location.href = controller.medicineSearchUrl;
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
    }());

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

});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxpdHkuanMiLCJsaW5rcy5qcyIsInZhbGlkYXRvci5qcyIsImRvY3RvckRhc2hib2FyZC5qcyIsIm1lZGljYWwucHJvZ3JhbW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOU5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1lZGljYWwucHJvZ3JhbW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9oZWxwZXIgZnVuY3Rpb24gdG8gZ2V0IHRoZSB1cmwgcXVlcnkgcGFyYW1ldGVyc1xyXG52YXIgdXRpbGl0eSA9IHtcclxuICBnZXRVUkxQYXJhbTogZnVuY3Rpb24obmFtZSl7XHJcbiAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcblxyXG4gICAgbmFtZSA9IG5hbWUucmVwbGFjZSgvW1xcW1xcXV0vZywgXCJcXFxcJCZcIik7XHJcblxyXG4gICAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cChcIls/Jl1cIiArIG5hbWUgKyBcIig9KFteJiNdKil8JnwjfCQpXCIpO1xyXG4gICAgdmFyIHJlc3VsdHMgPSByZWdleC5leGVjKHVybCk7XHJcblxyXG4gICAgaWYgKCFyZXN1bHRzKSByZXR1cm4gbnVsbDtcclxuICAgIGlmICghcmVzdWx0c1syXSkgcmV0dXJuICcnO1xyXG5cclxuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocmVzdWx0c1syXS5yZXBsYWNlKC9cXCsvZywgXCIgXCIpKTtcclxuICB9LFxyXG4gIGdldFRpbWVNaW51dGVzQXJyYXk6ICBmdW5jdGlvbigpe1xyXG5cclxuICB9XHJcbn1cclxuIiwidmFyIGxpbmtzID0ge1xyXG5cclxuICAvL2xvZ2luIGpzIHVybHNcclxuICAgYXV0aGVudGljYXRlVXJsIDogXCJpbmRleC5waHAvYXV0aGVudGljYXRlL2F1dGhlbml0Y2F0ZVVzZXJcIixcclxuICAgc3VjY2Vzc1JlZGlyZWN0VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL1wiLFxyXG4gICByZWdpc3RlckRvY3RvclVybCA6IFwiaW5kZXgucGhwL2RvY3Rvci9kb2N0b3JJbmZvXCIsXHJcbiAgIGFkbWluVXJsOlwiaW5kZXgucGhwL2FkbWluRGFzaGJvYXJkL2FkbWluXCIsXHJcblxyXG4gICAvL2FkbWluIHJlbGF0ZWRcclxuICAgZG9jdG9yTGlzdGluZ1VybDogXCJpbmRleC5waHAvYWRtaW5EYXNoYm9hcmQvZG9jdG9yTGlzdGluZ1wiLFxyXG5cclxuICAgbG9nb3V0VXJsIDogXCJpbmRleC5waHAvYXV0aGVudGljYXRlL2xvZ291dFwiLFxyXG5cclxuICAgLy9kb2N0b3IgZGFzaGJvYXJkIGxpbmtzXHJcbiAgIGRvY3RvclByb2ZpbGUgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvZG9jdG9yUHJvZmlsZVwiLFxyXG4gICBkYXNoYm9hcmRIb21lVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL1wiLFxyXG4gICBuZXdBcHBvaW50bWVudFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9ib29rQXBwb2ludG1lbnRcIixcclxuICAgcGF0aWVudHNFbnRyeVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wYXRpZW50c0VudHJ5XCIsXHJcbiAgIHBhdGllbnRzTGlzdGluZ1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wYXRpZW50c0xpc3RpbmdcIixcclxuICAgY2xvc2VBcHBvaW50bWVudFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jbG9zZUFwcG9pbnRtZW50XCIsXHJcbiAgIGRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2xpc3RBcHBvaW50bWVudFwiLFxyXG4gICBuZXdTY2hlZHVsZVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9uZXdTY2hlZHVsZVwiLFxyXG4gICBsaXN0U2NoZWR1bGVVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvc2NoZWR1bGVMaXN0XCIsXHJcbiAgIGFkZFN0YWZmVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3N0YWZmRW50cnlcIixcclxuICAgZG9jdG9yc1N0YWZmTGlzdGluZ1VyIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3N0YWZmTGlzdGluZ1wiLFxyXG4gICBwYXRpZW50c0hpc3RvcnlVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvcGF0aWVudEhpc3RvcnlcIixcclxuICAgY3JlYXRlUHJvZ3JhbUZvclBhdGllbnRVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvY3JlYXRlTWVkaWNhbFByb2dyYW1cIixcclxuICAgcHJvZ3JhbW1lTGlzdGluZ3NVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvcHJvZ3JhbW1lTGlzdFwiLFxyXG4gICBNYW5hZ2VMb2NhdGlvbnNVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvd29ya0xvY2F0aW9uTWFuYWdlbWVudFwiLFxyXG4gICBnZXRBbmFseXRpY3NVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvQW5hbHl0aWNzUmVwb3J0XCIsXHJcbiAgIGdldENhbGVuZGVyVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2NhbGVuZGFyVGVtcGxhdGVcIixcclxuICAgYWNjb3VudGluZ1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9hY2NvdW50aW5nXCIsXHJcbiAgIG1lZGljaW5lU2VhcmNoVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL21lZGljaW5lU2VhcmNoXCIsXHJcblxyXG5cclxuICAgLy9zY2hlZHVsZVxyXG4gICBnZXRMb2NhdGlvblVybDogXCJpbmRleC5waHAvbG9jYXRpb25zL2dldERvY3RvckxvY2F0aW9uc1wiLFxyXG4gICBjcmVhdGVVcGRhdGVTY2hlZHVsZVVybDogXCJpbmRleC5waHAvc2NoZWR1bGUvY3JlYXRlVXBkYXRlU2NoZWR1bGVcIixcclxuICAgZ2V0U2NoZWR1bGVDYWxlbmRhclVybDogXCJpbmRleC5waHAvc2NoZWR1bGUvU2NoZWR1bGVDYWxlbmRlclZpZXdcIixcclxuXHJcbiAgIC8vcHJvZ3JhbW1lXHJcbiAgIHByb2dyYW1tZUxpc3RVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldE1lZGljYXRpb25Qcm9ncmFtbWVMaXN0XCIsXHJcbiAgIHByb2dyYW1tZUVkaXRVcmw6XCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2NyZWF0ZU1lZGljYWxQcm9ncmFtXCIsXHJcbiAgIGNyZWF0ZU1vZGlmeVByb2dyYW1tZVVybDpcImluZGV4LnBocC9wcm9ncmFtbWUvY3JlYXRlTW9kaWZ5UHJvZ3JhbW1lXCIsXHJcbiAgIGdldFByb2dyYW1tZVVybDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0UHJvZ3JhbW1lc1wiLFxyXG5cclxuXHJcbiAgIC8vcGF0aWVudFxyXG4gICBwYXRpZW50RGV0YWlsUGVyc2lzdFVybDpcImluZGV4LnBocC9wYXRpZW50L2FkZFVwZGF0ZVBhdGllbnRcIixcclxuICAgcGF0aWVudHNEZXRhaWxzVXJsOlwiaW5kZXgucGhwL3BhdGllbnQvZ2V0UGF0aWVudERldGFpbHNcIixcclxuICAgbG9naW5DaGVja1VybDpcImluZGV4LnBocC9hdXRoZW50aWNhdGUvaXNMb2dnZWRJblwiLFxyXG4gICBnZXRQcm9ncmFtbWVMaXN0OlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRNZWRpY2F0aW9uUHJvZ3JhbW1lTGlzdFwiLFxyXG4gICBwcm9ncmFtbWVMaXN0RGV0YWlsc1VybDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0UHJvZ3JhbW1lTGlzdERldGFpbHNcIixcclxuICAgcGF0aWVudHNQcm9ncmFtbWVzVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRQYXRpZW50UHJvZ3JhbW1lc1wiLFxyXG4gICBwYXRpZW50TGlzdGluZ1VybDpcImluZGV4LnBocC9wYXRpZW50L2dldFBhdGllbnRMaXN0XCIsXHJcblxyXG4gICBzYXZlVXBkYXRlTG9jYXRpb25zOlwiaW5kZXgucGhwL2xvY2F0aW9ucy9hZGRVcGRhdGVMb2NhdGlvblwiLFxyXG4gICBsb2NhdGlvbkxpc3RVcmw6XCJpbmRleC5waHAvbG9jYXRpb25zL2dldERvY3RvckxvY2F0aW9uc1wiLFxyXG4gICBkZWxpdmVyeU1ldGhvZHNVcmw6XCJpbmRleC5waHAvcGF0aWVudC9nZXREZWxpdmVyeU1ldGhvZHNcIixcclxuXHJcblxyXG4gICAvL3JlZ2lzdGFydGlvblxyXG4gICBkb2N0b3JVcmw6XCJpbmRleC5waHAvZG9jdG9yL3NhdmVVcGRhdGVEb2N0b3JcIixcclxuICAgZG9jdG9yRGV0YWlsc1VybDpcImluZGV4LnBocC9kb2N0b3IvZ2V0RG9jdG9yRGV0YWlsc1wiLFxyXG4gICBsb2dpbkNoZWNrVXJsOlwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9pc0xvZ2dlZEluXCIsXHJcbiAgIGRvY3RvckRhc2hVcmw6XCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL1wiLFxyXG4gICBsb2dvdXRVcmw6XCJpbmRleC5waHAvYXV0aGVudGljYXRlL2xvZ291dFwiLFxyXG5cclxuICAgY3JlYXRlTW9kaWZ5U3RhZmZVcmw6XCJpbmRleC5waHAvc3RhZmYvY3JlYXRlTW9kaWZ5U3RhZmZcIixcclxuICAgZ2V0U3RhZmZEZXRhaWxzVXJsOiBcImluZGV4LnBocC9zdGFmZi9nZXRTdGFmZkRldGFpbHNcIixcclxuICAgc3RhZmZMaXN0aW5nVXJsOiBcImluZGV4LnBocC9zdGFmZi9nZXREb2N0b3JzU3RhZmZMaXN0XCJcclxuXHJcbn1cclxuIiwidmFsaWRhdG9yID0ge1xyXG4gIGlzRW1wdHlTdHJpbmc6IGZ1bmN0aW9uKHZhbHVlKXtcclxuICAgIGlmKCF2YWx1ZSB8fCAwID09PSB2YWx1ZS50cmltKCkubGVuZ3RoKXtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG5cclxuICAgIC8vZGVmaW5pbmcgdGhlIGhlbHBlciBmdW5jdGlvbnMgaW4gZ2xvYmFsXHJcblxyXG4gICAgJChmdW5jdGlvbigpe1xyXG5cclxuICAgICAgY29uc29sZS5sb2coJ0RvY3RvciBEYXNoYm9hcmQganMgbG9hZGVkJyk7XHJcblxyXG4gICAgICAgICAgLy90b3AgbGV2ZWwgY29udHJvbGxlclxyXG4gICAgICB2YXIgY29udHJvbGxlciA9IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgLy93aXJpbmcgdGhlIG5hdmlnYXRpb25cclxuICAgICAgICAgIHRoaXMubG9nb3V0VXJsID0gbGlua3MubG9nb3V0VXJsO1xyXG4gICAgICAgICAgdGhpcy5kb2N0b3JQcm9maWxlID0gbGlua3MuZG9jdG9yUHJvZmlsZTtcclxuICAgICAgICAgIHRoaXMuZGFzaGJvYXJkSG9tZVVybCA9IGxpbmtzLmRhc2hib2FyZEhvbWVVcmw7XHJcbiAgICAgICAgICB0aGlzLm5ld0FwcG9pbnRtZW50VXJsID0gbGlua3MubmV3QXBwb2ludG1lbnRVcmw7XHJcbiAgICAgICAgICB0aGlzLnBhdGllbnRzRW50cnlVcmwgPSBsaW5rcy5wYXRpZW50c0VudHJ5VXJsO1xyXG4gICAgICAgICAgdGhpcy5wYXRpZW50c0xpc3RpbmdVcmwgPSBsaW5rcy5wYXRpZW50c0xpc3RpbmdVcmw7XHJcbiAgICAgICAgICB0aGlzLmNsb3NlQXBwb2ludG1lbnRVcmwgPSBsaW5rcy5jbG9zZUFwcG9pbnRtZW50VXJsO1xyXG4gICAgICAgICAgdGhpcy5kb2N0b3JzQXBwb2ludG1lbnRzTGlzdFVybCA9IGxpbmtzLmRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsO1xyXG5cclxuICAgICAgICAgIHRoaXMubmV3U2NoZWR1bGVVcmwgPSBsaW5rcy5uZXdTY2hlZHVsZVVybDtcclxuICAgICAgICAgIHRoaXMubGlzdFNjaGVkdWxlVXJsID0gdGhpcy5saXN0U2NoZWR1bGVVcmw7XHJcbiAgICAgICAgICB0aGlzLlNjaGVkdWxlQ2FsZW5kYXJVcmwgPSBsaW5rcy5nZXRTY2hlZHVsZUNhbGVuZGFyVXJsO1xyXG4gICAgICAgICAgdGhpcy5hZGRTdGFmZlVybCA9IGxpbmtzLmFkZFN0YWZmVXJsO1xyXG4gICAgICAgICAgdGhpcy5kb2N0b3JzU3RhZmZMaXN0aW5nVXIgPSBsaW5rcy5kb2N0b3JzU3RhZmZMaXN0aW5nVXI7XHJcblxyXG4gICAgICAgICAgdGhpcy5wYXRpZW50c0hpc3RvcnlVcmwgPSBsaW5rcy5wYXRpZW50c0hpc3RvcnlVcmw7XHJcblxyXG4gICAgICAgICAgdGhpcy5jcmVhdGVQcm9ncmFtRm9yUGF0aWVudFVybCA9IGxpbmtzLmNyZWF0ZVByb2dyYW1Gb3JQYXRpZW50VXJsIDtcclxuICAgICAgICAgIHRoaXMucHJvZ3JhbW1lTGlzdGluZ3NVcmwgPSBsaW5rcy5wcm9ncmFtbWVMaXN0aW5nc1VybDtcclxuXHJcbiAgICAgICAgICB0aGlzLk1hbmFnZUxvY2F0aW9uc1VybCA9IGxpbmtzLk1hbmFnZUxvY2F0aW9uc1VybDtcclxuICAgICAgICAgIHRoaXMuQ2FsZW5kYXJUZW1wbGF0ZVVybCA9IGxpbmtzLmdldENhbGVuZGVyVXJsO1xyXG5cclxuICAgICAgICAgIHRoaXMuYW5hbHl0aWNzUmVwb3J0VXJsID0gbGlua3MuZ2V0QW5hbHl0aWNzVXJsO1xyXG4gICAgICAgICAgdGhpcy5hY2NvdW50aW5nVXJsID0gbGlua3MuYWNjb3VudGluZ1VybDtcclxuICAgICAgICAgIHRoaXMubWVkaWNpbmVTZWFyY2hVcmwgPSBsaW5rcy5tZWRpY2luZVNlYXJjaFVybDtcclxuICAgICAgICAgIC8vZG8gc29tZXRobmcgYWJvdXQgZG9jdG9ycyBpbmZvIGFuZCByZWdpc3RyYXRpb25cclxuXHJcbiAgICAgICAgICAvL1RoZSB1cmwgZnJvbSB0aGUgYnJvd3NlciAgY2FuIGJlIGNvbXBhcmVkIHRvIHNldCB0aGUgYWN0aXZlIG5hdmlnYXRpb25cclxuICAgICAgICAgIG5hdlZpZXcuaW5pdCgpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICB2YXIgbmF2VmlldyA9IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgIC8vd2lyaW5nIHRoZSBuYXZpZ2F0aW9uIGNsaWNrc1xyXG5cclxuXHJcbiAgICAgICAgICAkKFwiI3Btcy1icmFuZC1idG4tbGlua1wiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1BNUyBicmFuZCBjbGljaycpO1xyXG5cclxuICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgJChcIiNidG4tcHJvZ3JhbW1lLXNlY3Rpb24tbGlua1wiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJChcIiNjcmVhdGUtcHJvZ3JhbS1mb3ItcGF0aWVudC1zZWN0aW9uXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NyZWF0ZSBwcm9ncmFtIGZvciBwYXRpZW50Jyk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5jcmVhdGVQcm9ncmFtRm9yUGF0aWVudFVybDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKFwiI2J0bi1tYW5hZ2UtbG9jYXRpb25zXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ21hbmFnZSBsb2NhdGlvbnMnKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLk1hbmFnZUxvY2F0aW9uc1VybDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoXCIjYnRuLWxpc3QtcHJvZ3JhbS1zZWN0aW9uXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIucHJvZ3JhbW1lTGlzdGluZ3NVcmw7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKFwiI3BhdGllbnRzLWVudHJ5LWNyZWF0ZS1zZWN0aW9uLWxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygncGF0aWVudHMgRW50cnljbGljaycpO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5wYXRpZW50c0VudHJ5VXJsO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI3BhdGllbnRzLWVudHJ5LWxpc3Qtc2VjdGlvbi1saW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncGF0aWVudHMgbGlzdGluZyBjbGljaycpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIucGF0aWVudHNMaXN0aW5nVXJsO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiN1c2VyLVByb2ZpbGUtQnRuLUxpbmtcIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd1c2VyIHByb2ZpbGUgY2xpY2snKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuZG9jdG9yUHJvZmlsZTtcclxuXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI2RvY3Rvci1kYXNoLWxvZ291dC1idG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvZ291dCBjbGljaycpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIubG9nb3V0VXJsO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiNkYXNoYm9hcmQtU2VjdGlvbi1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5kYXNoYm9hcmRIb21lVXJsO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkYXNoYm9hcmQgY2xpY2snKTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICQoXCIjYm9vay1BcHBvaW50bWVudHMtU2VjdGlvbi1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5uZXdBcHBvaW50bWVudFVybDtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICQoXCIjY2xvc2UtQm9vay1BcHBvaW50bWVudC1TZWN0aW9uLUxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmNsb3NlQXBwb2ludG1lbnRVcmw7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI3ZpZXctQXBwb2ludG1lbnQtU2VjdGlvbi1MaW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5kb2N0b3JzQXBwb2ludG1lbnRzTGlzdFVybDtcclxuICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAkKFwiI21hbmFnZS1Eb2N0b3JzLVNjaGVkdWxlLVNlY3Rpb24tTGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzY2hlZHVsZSBjbGljaycpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiNtYW5hZ2Utc2NoZWR1bGUtY3JlYXRlLXNlY3Rpb24tbGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCduZXcgc2NoZWR1bGUgY2xpY2snKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIubmV3U2NoZWR1bGVVcmw7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI21hbmFnZS1zY2hlZHVsZS1saXN0LXNlY3Rpb24tbGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzY2hlZHVsZSBsaXN0IGNsaWNrJyk7XHJcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmxpc3RTY2hlZHVsZVVybDtcclxuICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgJChcIiNhZGQtU3RhZmYtU2VjdGlvbi1MaW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuYWRkU3RhZmZVcmw7XHJcbiAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICQoXCIjYnRuLXN0YWZmLWxpc3RpbmdcIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuZG9jdG9yc1N0YWZmTGlzdGluZ1VyO1xyXG4gICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJChcIiNjYWxlbmRhci1UZW1wbGF0ZS1CdG4tTGlua1wiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5DYWxlbmRhclRlbXBsYXRlVXJsO1xyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImhlbGxvIGhpZFwiKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICQoXCIjcGF0aWVudHMtSGlzdG9yeS1TZWN0aW9uLUxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5wYXRpZW50c0hpc3RvcnlVcmw7XHJcbiAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgJChcIiNtYW5hZ2Utc2NoZWR1bGUtbGlzdC1zZWN0aW9uLWxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5TY2hlZHVsZUNhbGVuZGFyVXJsO1xyXG4gICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICQoXCIjYXBwb2ludG1lbnQtc2VjdGlvbi1saW5rLWJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkKFwiI3BhdGllbnRzLUVudHJ5LVNlY3Rpb24tTGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAkKFwiI3N0YWZmLW1hbmFnbWVudC1zZWN0aW9uLWxpbmstYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAkKFwiI290aGVyLXNldHRpbmdzLXNlY3Rpb24tbGluay1idG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICQoXCIjY2FsZW5kYXItdGVtcGxhdGUtc2VjdGlvbi1saW5rLWJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgJChcIiNhbmFseXRpY3Mtc2lkZS1uYXZpZ2F0aW9uLWxpbmstYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5hbmFseXRpY3NSZXBvcnRVcmw7XHJcbiAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICQoXCIjYWNjb3VudGluZy1zaWRlLW5hdmlnYXRpb24tbGluay1idG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmFjY291bnRpbmdVcmw7XHJcbiAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICQoXCIjbWVkaWNpbmUtc2lkZS1uYXZpZ2F0aW9uLWxpbmstYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5tZWRpY2luZVNlYXJjaFVybDtcclxuICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAvL2hpZ2hsaWdodCB0aGUgcmlnaHQgbmF2aWdhdGlvblxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgIGNvbnRyb2xsZXIuaW5pdCgpO1xyXG5cclxuICB9KCkpO1xyXG5cclxufSk7XHJcbiIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgJChmdW5jdGlvbigpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdtZWRpY2FsIHByb2dyYW1tZSBqcyBsb2FkZWQgJyk7XHJcbiAgICB9KCkpO1xyXG5cclxuICAgIHZhciBtb2RlbCA9IHtcclxuICAgICAgcHJvZ3JhbUlkOiAwLFxyXG4gICAgICBwcm9ncmFtbWVOYW1lOiBcIlwiLFxyXG4gICAgICBwcm9ncmFtZUxpc3Q6W10sXHJcbiAgICAgIFByb2dyYW1tZURldGFpbHM6bnVsbFxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgY29udHJvbGxlciA9IHtcclxuICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmNyZWF0ZU1vZGlmeVByb2dyYW1tZVVybCA9IGxpbmtzLmNyZWF0ZU1vZGlmeVByb2dyYW1tZVVybDtcclxuICAgICAgICB0aGlzLmdldFByb2dyYW1tZVVybCA9IGxpbmtzLmdldFByb2dyYW1tZVVybDtcclxuXHJcbiAgICAgICAgcHJvZ3JhbW1lVmlldy5pbml0KCk7XHJcblxyXG5cclxuICAgICAgICB2YXIgcHJvZ3JhbW1lSWQgPSB1dGlsaXR5LmdldFVSTFBhcmFtKCdpZCcpO1xyXG5cclxuICAgICAgICBpZihwcm9ncmFtbWVJZCl7XHJcbiAgICAgICAgICAvL3RoaXMgaXMgYSB1cGRhdGUgcGF0aWVudHMgZW50cnlcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdwYXRpZW50IElkICcgKyBwcm9ncmFtbWVJZCk7XHJcblxyXG4gICAgICAgICAgJC5nZXQoIHRoaXMuZ2V0UHJvZ3JhbW1lVXJsICwge2lkOnByb2dyYW1tZUlkfSlcclxuICAgICAgICAgIC5kb25lKGZ1bmN0aW9uKCByZXNwb25zZSApIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcclxuXHJcbiAgICAgICAgICAgIG1vZGVsID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgcHJvZ3JhbW1lVmlldy5yZW5kZXIoKTtcclxuXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgIH0sXHJcbiAgICAgIGNsZWFyTW9kZWw6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICBtb2RlbC5wcm9ncmFtSWQgPSAwO1xyXG4gICAgICAgICAgbW9kZWwucHJvZ3JhbW1lTmFtZSA9IFwiXCI7XHJcbiAgICAgICAgICBtb2RlbC5wcm9ncmFtZUxpc3QgPSBbXTtcclxuICAgICAgICAgIG1vZGVsLlByb2dyYW1tZURldGFpbHMgPSBudWxsO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ2NsZWFyIG1vZGVsJyk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGdldFByb2dyYW1tZUxpc3Q6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIG1vZGVsLnByb2dyYW1lTGlzdDtcclxuICAgICAgfSxcclxuICAgICAgZ2V0UHJvZ3JhbW1lTmFtZTogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gbW9kZWwucHJvZ3JhbW1lTmFtZTtcclxuICAgICAgfSxcclxuICAgICAgZ2V0Q3VycmVudFByb2dyYW1tZURldGFpbDogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gbW9kZWwuUHJvZ3JhbW1lRGV0YWlscztcclxuICAgICAgfSxcclxuICAgICAgc2V0TmV3UHJvZ3JhbW1lRGV0YWlsc01vZGVsOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIG1vZGVsLlByb2dyYW1tZURldGFpbHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWNjaW5lOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3NlTm86IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgICByZW1vdmVQcm9ncmFtbWU6IGZ1bmN0aW9uKHByb2dyYW0pe1xyXG4gICAgICAgIG1vZGVsLnByb2dyYW1lTGlzdC5zcGxpY2UocHJvZ3JhbS5pbmRleCwgMSk7XHJcbiAgICAgICAgLy9yZSBhc3NpZ25pbmcgdGhlIGluZGV4XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IG1vZGVsLnByb2dyYW1lTGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIG1vZGVsLnByb2dyYW1lTGlzdFtpXS5pbmRleCA9IGk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICB1cGRhdGVQcm9ncmFtbWVOYW1lOiBmdW5jdGlvbihuYW1lKXtcclxuICAgICAgICBtb2RlbC5wcm9ncmFtbWVOYW1lID0gbmFtZTtcclxuICAgICAgfSxcclxuICAgICAgYWRkUHJvZ3JhbW1lOiAgZnVuY3Rpb24ocGR1cmF0aW9uLCBwdGV4dCwgcHZhY2NpbmUsIHBkb3NlTm8pe1xyXG4gICAgICAgIHZhciBwb3NuID0gbW9kZWwucHJvZ3JhbWVMaXN0Lmxlbmd0aDtcclxuXHJcblxyXG4gICAgICAgICAgaWYobW9kZWwuUHJvZ3JhbW1lRGV0YWlscykge1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3VwZGF0ZSBwcm9ncmFtbWUgZGV0YWlscyAnICsgcGR1cmF0aW9uICsgcHRleHQgKyAgIEpTT04uc3RyaW5naWZ5KG1vZGVsLlByb2dyYW1tZURldGFpbHMpICk7XHJcblxyXG4gICAgICAgICAgICBtb2RlbC5Qcm9ncmFtbWVEZXRhaWxzLmR1cmF0aW9uID0gcGR1cmF0aW9uO1xyXG4gICAgICAgICAgICBtb2RlbC5Qcm9ncmFtbWVEZXRhaWxzLnRleHQgPSBwdGV4dDtcclxuICAgICAgICAgICAgbW9kZWwuUHJvZ3JhbW1lRGV0YWlscy52YWNjaW5lID0gcHZhY2NpbmU7XHJcbiAgICAgICAgICAgIG1vZGVsLlByb2dyYW1tZURldGFpbHMuZG9zZU5vID0gcGRvc2VObztcclxuXHJcbiAgICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCduZXcgcHJvZ3JhbW1lIGRldGFpbHMnKTtcclxuXHJcbiAgICAgICAgICAgIG1vZGVsLlByb2dyYW1tZURldGFpbHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBwZHVyYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IHB0ZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWNjaW5lOiBwdmFjY2luZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9zZU5vOiBwZG9zZU5vLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogcG9zblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgbW9kZWwucHJvZ3JhbWVMaXN0LnB1c2gobW9kZWwuUHJvZ3JhbW1lRGV0YWlscyk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIG1vZGVsLlByb2dyYW1tZURldGFpbHMgPSBudWxsO1xyXG4gICAgICAgIHByb2dyYW1tZVZpZXcuY2xlYXJGb3JtKCk7XHJcblxyXG4gICAgICB9LFxyXG4gICAgICBwZXJzaXN0UHJvZ3JhbW1lOiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAvL3VwZGF0ZSB0aGUgcHJvZ3JhbW1lIG5hbWVcclxuICAgICAgICBtb2RlbC5wcm9ncmFtbWVOYW1lID0gIHByb2dyYW1tZVZpZXcucHJvZ3JhbW1lTmFtZS52YWwoKTtcclxuXHJcblxyXG5cclxuICAgICAgICAkLnBvc3QoY29udHJvbGxlci5jcmVhdGVNb2RpZnlQcm9ncmFtbWVVcmwgLCBtb2RlbClcclxuICAgICAgICAgLmRvbmUoZnVuY3Rpb24oIHJlc3BvbnNlICkge1xyXG5cclxuICAgICAgICAgICBjb25zb2xlLmxvZygnc2F2ZSByZXNwb25zZSAnICsgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcclxuICAgICAgICAgICBjb250cm9sbGVyLmNsZWFyTW9kZWwoKTtcclxuICAgICAgICAgICBwcm9ncmFtbWVWaWV3LnJlZnJlc2hGb3JtKCk7XHJcbiAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBwcm9ncmFtbWVWaWV3ID0ge1xyXG4gICAgICBpc0Zvcm1WYWxpZDpmYWxzZSxcclxuICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnByb2dyYW1tZU5hbWUgPSAkKCcjcHJvZ3JhbW1lLW5hbWUnKTtcclxuICAgICAgICB0aGlzLnRhYmxlQm9keSAgPSAkKCcjcHJvZ3JhbW1lLWxpc3QtdGFibGUtYm9keScpO1xyXG5cclxuICAgICAgICB0aGlzLmR1cmF0aW9uID0gJCgnI3R4dC1kdXJhdGlvbicpO1xyXG4gICAgICAgIHRoaXMuZHVyYXRpb25UZXh0ID0gJCgnI3R4dC1kdXJhdGlvbi10ZXh0Jyk7XHJcbiAgICAgICAgdGhpcy52YWNjaW5lID0gJCgnI3R4dC12YWNjaW5lJyk7XHJcbiAgICAgICAgdGhpcy5kb3NlTm8gPSAkKCcjdHh0LWRvc2Utbm8nKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuZ3JvdXBQcm9ncmFtbWVOYW1lID0gJCgnI2dyb3VwLXByb2dyYW1tZS1uYW1lJyk7XHJcbiAgICAgICAgdGhpcy5wcm9ncmFtbWVOYW1laGVscExhYmVsID0gJCgnI2hlbHAtcHJvZ3JhbW1lLW5hbWUnKTtcclxuICAgICAgICB0aGlzLmNvbW1vbkhlbHBMYWJlbCA9ICQoJyNoZWxwLWNvbW1vbi1tZXNzYWdlJyk7XHJcblxyXG5cclxuICAgICAgICB0aGlzLnByb2dyYW1tZU5hbWUub24oJ2NoYW5nZSBrZXl1cCBwYXN0ZSAnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgY29uc29sZS5sb2coKTtcclxuICAgICAgICAgIGNvbnRyb2xsZXIudXBkYXRlUHJvZ3JhbW1lTmFtZShwcm9ncmFtbWVWaWV3LnByb2dyYW1tZU5hbWUudmFsKCkpXHJcbiAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgIC8vd2lyaW5nIGV2ZW50c1xyXG4gICAgICAgICQoJyNidG4tYWRkLXJvdycpLmNsaWNrKChmdW5jdGlvbih2aWV3KXtcclxuXHJcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyIGR1cmF0aW9uVmFsID0gJCgnI3R4dC1kdXJhdGlvbicpLnZhbCgpO1xyXG4gICAgICAgICAgICB2YXIgZHVyYXRpb25UZXh0VmFsID0gJCgnI3R4dC1kdXJhdGlvbi10ZXh0JykudmFsKCk7XHJcbiAgICAgICAgICAgIHZhciB2YWNjaW5lVmFsID0gJCgnI3R4dC12YWNjaW5lJykudmFsKCk7XHJcbiAgICAgICAgICAgIHZhciBkb3NlTm9WYWwgPSAkKCcjdHh0LWRvc2Utbm8nKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKCFkdXJhdGlvblZhbCB8fFxyXG4gICAgICAgICAgICAgICAhZHVyYXRpb25UZXh0VmFsfHxcclxuICAgICAgICAgICAgICAgIXZhY2NpbmVWYWx8fFxyXG4gICAgICAgICAgICAgICAhZG9zZU5vVmFsXHJcbiAgICAgICAgICAgICApe1xyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZygnb25lIG9mIHRoZSBmaWxlZCBpcyBlbXB0eScpO1xyXG4gICAgICAgICAgICAgICBwcm9ncmFtbWVWaWV3LmNvbW1vbkhlbHBMYWJlbC5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgIHByb2dyYW1tZVZpZXcuY29tbW9uSGVscExhYmVsLnRleHQoJ1BsZWFzZSBlbnRlciBhbGwgZGV0YWlscycpO1xyXG4gICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkYXRhIGVudGVyZWQgJyk7XHJcbiAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuYWRkUHJvZ3JhbW1lKGR1cmF0aW9uVmFsLCBkdXJhdGlvblRleHRWYWwsIHZhY2NpbmVWYWwsIGRvc2VOb1ZhbCk7XHJcbiAgICAgICAgICAgICAgIHByb2dyYW1tZVZpZXcuY29tbW9uSGVscExhYmVsLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgcHJvZ3JhbW1lVmlldy5yZW5kZXIoKTtcclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ21vZGVsICcgKyBKU09OLnN0cmluZ2lmeShtb2RlbCkpO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pKHByb2dyYW1tZVZpZXcpKTtcclxuXHJcbiAgICAgICAgJCgnI2J0bi1zdWJtaXQtcHJvZ3JhbW1lJykuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdzYXZlIGNsaWNrJyk7XHJcbiAgICAgICAgICBwcm9ncmFtbWVWaWV3LnZhbGlkYXRlRm9ybSgpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ2Zvcm0gaXMgdmFsaWQ6JyArICBwcm9ncmFtbWVWaWV3LmlzRm9ybVZhbGlkKTtcclxuICAgICAgICAgIGlmKHByb2dyYW1tZVZpZXcuaXNGb3JtVmFsaWQpe1xyXG4gICAgICAgICAgICBjb250cm9sbGVyLnBlcnNpc3RQcm9ncmFtbWUoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy53aXJlVmFsaWRhdGlvbnMoKTtcclxuXHJcbiAgICAgIH0sXHJcbiAgICAgIHJlZnJlc2hGb3JtKCl7XHJcbiAgICAgICAgcHJvZ3JhbW1lVmlldy5ncm91cFByb2dyYW1tZU5hbWUucmVtb3ZlQ2xhc3MoJ2hhcy1lcnJvcicpO1xyXG4gICAgICAgIHByb2dyYW1tZVZpZXcucHJvZ3JhbW1lTmFtZWhlbHBMYWJlbC5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgcHJvZ3JhbW1lVmlldy5jb21tb25IZWxwTGFiZWwuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICAgICAgLy9yZXNldHRpbmcgYWxsIHZhbGlkYXRpb24gZXJyb3JzXHJcbiAgICAgIH0sXHJcbiAgICAgIHdpcmVWYWxpZGF0aW9uczogZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9ncmFtbWVOYW1lLm9uKCdibHVyJywgZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICB2YXIgcHJvZ3JhbW1lTmFtZSA9IHByb2dyYW1tZVZpZXcucHJvZ3JhbW1lTmFtZS52YWwoKTtcclxuICAgICAgICAgIHZhciBpc0VtcHR5ID0gdmFsaWRhdG9yLmlzRW1wdHlTdHJpbmcocHJvZ3JhbW1lTmFtZSk7XHJcblxyXG4gICAgICAgICAgaWYoaXNFbXB0eSl7XHJcbiAgICAgICAgICAgIHByb2dyYW1tZVZpZXcuZ3JvdXBQcm9ncmFtbWVOYW1lLmFkZENsYXNzKCdoYXMtZXJyb3InKTtcclxuICAgICAgICAgICAgcHJvZ3JhbW1lVmlldy5wcm9ncmFtbWVOYW1laGVscExhYmVsLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBwcm9ncmFtbWVWaWV3Lmdyb3VwUHJvZ3JhbW1lTmFtZS5yZW1vdmVDbGFzcygnaGFzLWVycm9yJyk7XHJcbiAgICAgICAgICAgIHByb2dyYW1tZVZpZXcucHJvZ3JhbW1lTmFtZWhlbHBMYWJlbC5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfSxcclxuICAgICAgdmFsaWRhdGVGb3JtOiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICBwcm9ncmFtbWVWaWV3LmlzRm9ybVZhbGlkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdmFyIHByb2dyYW1tZU5hbWUgPSBwcm9ncmFtbWVWaWV3LnByb2dyYW1tZU5hbWUudmFsKCk7XHJcbiAgICAgICAgdmFyIHByb2dyYW1tZUxpc3QgPSBjb250cm9sbGVyLmdldFByb2dyYW1tZUxpc3QoKTtcclxuXHJcbiAgICAgICAgdmFyIGlzRW1wdHkgPSB2YWxpZGF0b3IuaXNFbXB0eVN0cmluZyhwcm9ncmFtbWVOYW1lKTtcclxuXHJcbiAgICAgICAgaWYoaXNFbXB0eSl7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygndmFsaWRhZSBwcm9ncmFtbWUgbmFtZScgKTtcclxuICAgICAgICAgIHByb2dyYW1tZVZpZXcuaXNGb3JtVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgIHByb2dyYW1tZVZpZXcuZ3JvdXBQcm9ncmFtbWVOYW1lLmFkZENsYXNzKCdoYXMtZXJyb3InKTtcclxuICAgICAgICAgIHByb2dyYW1tZVZpZXcucHJvZ3JhbW1lTmFtZWhlbHBMYWJlbC5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICBwcm9ncmFtbWVWaWV3Lmdyb3VwUHJvZ3JhbW1lTmFtZS5yZW1vdmVDbGFzcygnaGFzLWVycm9yJyk7XHJcbiAgICAgICAgICBwcm9ncmFtbWVWaWV3LnByb2dyYW1tZU5hbWVoZWxwTGFiZWwuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYocHJvZ3JhbW1lTGlzdC5sZW5ndGggPD0gMCl7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygncHJvZ3JhbW1lIGxpc3QgdmFsaWRhdGlvbicpO1xyXG4gICAgICAgICAgcHJvZ3JhbW1lVmlldy5pc0Zvcm1WYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgcHJvZ3JhbW1lVmlldy5jb21tb25IZWxwTGFiZWwucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgcHJvZ3JhbW1lVmlldy5jb21tb25IZWxwTGFiZWwudGV4dCgnUGxlYXNlIGVudGVyIGF0bGVhc3Qgb25lIHByb2dyYW1tZSBlbnRyeScpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgcHJvZ3JhbW1lVmlldy5jb21tb25IZWxwTGFiZWwuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICB9LFxyXG4gICAgICBjbGVhckZvcm06IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5kdXJhdGlvbi52YWwoJycpO1xyXG4gICAgICAgIHRoaXMuZHVyYXRpb25UZXh0LnZhbCgnJyk7XHJcbiAgICAgICAgdGhpcy52YWNjaW5lLnZhbCgnJyk7XHJcbiAgICAgICAgdGhpcy5kb3NlTm8udmFsKCcnKTtcclxuICAgICAgfSxcclxuICAgICAgcmVuZGVyOiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICB2YXIgcHJvZ3JhbW1lTmFtZSA9IGNvbnRyb2xsZXIuZ2V0UHJvZ3JhbW1lTmFtZSgpO1xyXG4gICAgICAgIHZhciBjdXJyZW50cHJvZ3JhbW1lRGV0YWlsID0gY29udHJvbGxlci5nZXRDdXJyZW50UHJvZ3JhbW1lRGV0YWlsKCk7XHJcbiAgICAgICAgdmFyIHByb2dyYW1tZUxpc3QgPSBjb250cm9sbGVyLmdldFByb2dyYW1tZUxpc3QoKTtcclxuXHJcbiAgICAgICAgLy91cGRhdGluZyB0aGUgdmFsdWVzIGluIHRoZSB2aWV3XHJcblxyXG4gICAgICAgIHRoaXMucHJvZ3JhbW1lTmFtZS52YWwocHJvZ3JhbW1lTmFtZSk7XHJcblxyXG4gICAgICAgIGlmKGN1cnJlbnRwcm9ncmFtbWVEZXRhaWwpe1xyXG4gICAgICAgICAgdGhpcy5kdXJhdGlvbi52YWwoY3VycmVudHByb2dyYW1tZURldGFpbC5kdXJhdGlvbik7XHJcbiAgICAgICAgICB0aGlzLmR1cmF0aW9uVGV4dC52YWwoY3VycmVudHByb2dyYW1tZURldGFpbC50ZXh0KTtcclxuICAgICAgICAgIHRoaXMudmFjY2luZS52YWwoY3VycmVudHByb2dyYW1tZURldGFpbC52YWNjaW5lKTtcclxuICAgICAgICAgIHRoaXMuZG9zZU5vLnZhbChjdXJyZW50cHJvZ3JhbW1lRGV0YWlsLmRvc2VObyk7XHJcbiAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcmVtb3ZlIHRoZSBhZGRlZCByb3dzXHJcbiAgICAgICAgJCgnLnByb2ctYWRkZWQtcm93cycpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICB2YXIgdGFibGVIZWFkZXJDbG9uZSA9ICQoJyNwcm9ncmFtbWUtdGFibGUtaGVhZGVyJykuY2xvbmUoKTtcclxuICAgICAgICAvL3RoaXMudGFibGVCb2R5LnByZXBlbmQodGFibGVIZWFkZXJDbG9uZSk7XHJcblxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBwcm9ncmFtbWVMaXN0Lmxlbmd0aDsgaSsrKXtcclxuXHJcbiAgICAgICAgICB2YXIgdHIgPSAkKCc8dHIvPicpO1xyXG4gICAgICAgICAgdHIuYWRkQ2xhc3MoJ3Byb2ctYWRkZWQtcm93cycpXHJcblxyXG4gICAgICAgICAgdmFyIHRkID0gJCgnPHRkLz4nKTtcclxuICAgICAgICAgIHRkLnRleHQocHJvZ3JhbW1lTGlzdFtpXS5kdXJhdGlvbik7XHJcbiAgICAgICAgICB0ci5hcHBlbmQodGQpO1xyXG5cclxuICAgICAgICAgIHZhciB0ZCA9ICQoJzx0ZC8+Jyk7XHJcbiAgICAgICAgICB0ZC50ZXh0KHByb2dyYW1tZUxpc3RbaV0udGV4dCk7XHJcbiAgICAgICAgICB0ci5hcHBlbmQodGQpO1xyXG5cclxuICAgICAgICAgIHZhciB0ZCA9ICQoJzx0ZC8+Jyk7XHJcbiAgICAgICAgICB0ZC50ZXh0KHByb2dyYW1tZUxpc3RbaV0udmFjY2luZSk7XHJcbiAgICAgICAgICB0ci5hcHBlbmQodGQpO1xyXG5cclxuICAgICAgICAgIHZhciB0ZCA9ICQoJzx0ZC8+Jyk7XHJcbiAgICAgICAgICB0ZC50ZXh0KHByb2dyYW1tZUxpc3RbaV0uZG9zZU5vKTtcclxuICAgICAgICAgIHRyLmFwcGVuZCh0ZCk7XHJcblxyXG4gICAgICAgICAgdmFyIHRkID0gJCgnPGEvPicse1xyXG4gICAgICAgICAgICB0ZXh0OiAnUmVtb3ZlJyxcclxuICAgICAgICAgICAgY2xhc3M6IFwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi1zbVwiXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICB0ZC5jbGljaygoZnVuY3Rpb24ocHJvZ3JhbW1lKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHByb2dyYW1tZSkpO1xyXG4gICAgICAgICAgICAgIC8vICBwcm9ncmFtbWVMaXN0W3Bvc2l0aW9uIC0xXSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZW1vdmUgY2xpY2sgb246ICcgKyBKU09OLnN0cmluZ2lmeShwcm9ncmFtbWUpKTtcclxuICAgICAgICAgICAgICBjb250cm9sbGVyLnJlbW92ZVByb2dyYW1tZShwcm9ncmFtbWUpO1xyXG4gICAgICAgICAgICAgIHByb2dyYW1tZVZpZXcucmVuZGVyKCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgfSkocHJvZ3JhbW1lTGlzdFtpXSkpO1xyXG5cclxuICAgICAgICAgIHRyLmFwcGVuZCh0ZCk7XHJcblxyXG5cclxuICAgICAgICAgIHZhciBlZGl0TGluayA9ICQoJzxhLz4nLHtcclxuICAgICAgICAgICAgdGV4dDogJ0VkaXQnLFxyXG4gICAgICAgICAgICBjbGFzczogXCJcIlxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgZWRpdExpbmsuY2xpY2soKGZ1bmN0aW9uKHByb2dyYW1tZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShwcm9ncmFtbWUpKTtcclxuICAgICAgICAgICAgICAvLyAgcHJvZ3JhbW1lTGlzdFtwb3NpdGlvbiAtMV0gPSBudWxsXHJcblxyXG4gICAgICAgICAgICAgIG1vZGVsLlByb2dyYW1tZURldGFpbHMgPSBwcm9ncmFtbWU7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2VkaXQgYnV0dG9uOiAnICsgSlNPTi5zdHJpbmdpZnkocHJvZ3JhbW1lKSk7XHJcbiAgICAgICAgICAgICAgcHJvZ3JhbW1lVmlldy5yZW5kZXIoKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB9KShwcm9ncmFtbWVMaXN0W2ldKSk7XHJcblxyXG4gICAgICAgICAgdmFyIHRkID0gJCgnPHRkLz4nKTtcclxuICAgICAgICAgIHRkLmFwcGVuZChlZGl0TGluayk7XHJcbiAgICAgICAgICB0ci5hcHBlbmQodGQpO1xyXG5cclxuXHJcbiAgICAgICAgICB0aGlzLnRhYmxlQm9keS5hcHBlbmQodHIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29udHJvbGxlci5pbml0KCk7XHJcblxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
