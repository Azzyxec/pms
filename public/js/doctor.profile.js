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
   locationListUrl:"index.php/locations/getDoctorLocations",


   //registartion

   doctorUrl:"index.php/doctor/saveUpdateDoctor",
   doctorDetailsUrl:"index.php/doctor/getDoctorDetails",
   loginCheckUrl:"index.php/authenticate/isLoggedIn",
   doctorDashUrl:"index.php/doctorDashboard/",
   logoutUrl:"index.php/authenticate/logout"

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
          this.addStaffUrl = links.addStaffUrl;
          this.patientsHistoryUrl = links.patientsHistoryUrl;

          this.createProgramForPatientUrl = links.createProgramForPatientUrl ;
          this.programmeListingsUrl = links.programmeListingsUrl;

          this.ManageLocationsUrl = links.ManageLocationsUrl;

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

           });

           $("#patients-History-Section-Link-Btn").click(function(e){
               e.preventDefault();
               window.location.href = controller.patientsHistoryUrl;
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
  console.log('doctor registration in ');

  var doctorModel = {
     id:0,
     name:"",
     contact:"",
     alternateContact: "",
     email: "",
     qualifications: "",
     address:"",
     recoveryContact:"",
     recoveryEmail:"",
     userName:"",
     password:"",
     isActive:0
  };

  var controller = {
      init: function(){
        this.doctorUrl =  links.doctorUrl;
        this.doctorDetailsUrl =  links.doctorDetailsUrl;
        this.loginCheckUrl = links.loginCheckUrl;
        this.doctorDashUrl = links.doctorDashUrl;
        this.logoutUrl = links.logoutUrl;
        formView.init();

        this.getDoctorInfo();
        //if the doctor is logged in then fill the form with the doctors data

      },
      getModel: function(){
        return doctorModel;
      },
      getDoctorInfo: function(){
        $.post( controller.loginCheckUrl , {})
         .done(function( response ) {
           console.log("login check: " + JSON.stringify(response));

           if(response.data.type == "D"){
             controller.updateModelFromServer(response.data.id);
           }

         });

      },
      updateModelFromServer: function(doctorId){
        $.get( controller.doctorDetailsUrl , {id: doctorId})
         .done(function( response ) {
           console.log("updateInfoFromServer: " + JSON.stringify(response));

           var doctor  = response.data;

           doctorModel.id = doctor.id;
           doctorModel.name = doctor.name;
           doctorModel.contact = doctor.contact;
           doctorModel.alternateContact = doctor.alternateContact;
           doctorModel.email = doctor.email;
           doctorModel.qualifications = doctor.qualifications;
           doctorModel.address = doctor.address;
           doctorModel.userName = doctor.userName;
           doctorModel.password = doctor.password;
           doctorModel.recoveryContact = doctor.recoveryContact;
           doctorModel.recoveryEmail = doctor.recoveryEmail;
           doctorModel.isActive = doctor.isActive;

           formView.render();

         });

      },
      updateModelFromView: function(){
        doctorModel.id = formView.idControl.val();
        doctorModel.name = formView.nameControl.val();
        doctorModel.contact = formView.contactControl.val();
        doctorModel.alternateContact = formView.alternatContactControl.val();
        doctorModel.email = formView.emailControl.val();
        doctorModel.qualifications = formView.qualificationControl.val();
        doctorModel.address = formView.addressControl.val();
        doctorModel.userName = formView.userNameControl.val();
        doctorModel.password = formView.passwordControl.val();
        doctorModel.recoveryContact = formView.recoveryContactControl.val();
        doctorModel.recoveryEmail = formView.recoveryEmailControl.val();


        if(formView.activeControl.is(":checked")){
          doctorModel.isActive = 1;
        }else{
          doctorModel.isActive = 0;
        }

        return doctorModel;
      },
      saveDoctorAndRedirect: function(){

        $.post( controller.doctorUrl , doctorModel)
         .done(function( response ) {
           console.log('response ' + JSON.stringify(response));


           if(response.data.status == "-1"){
             console.log('Please select another login Id');
           }else if(response.data.user.type == "D"){
             console.log('saved successfully, now you will receive a confirmation email, then you can login');
             window.location.href = controller.logoutUrl;
           }

         });
      }
      /*getURLParam: function(name: string){

      var url = window.location.href;

      name = name.replace(/[\[\]]/g, "\\$&");

      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
      var results = regex.exec(url);

      if (!results) return null;
      if (!results[2]) return '';

      return decodeURIComponent(results[2].replace(/\+/g, " "));

    }*/
  };


  var formView = {
    init: function(){
      console.log('form view inti');

      this.idControl = $('#did');
      this.nameControl = $('#dname');
      this.contactControl = $('#dcontact');
      this.alternatContactControl = $('#dalternate-contact');
      this.emailControl = $('#demail');
      this.qualificationControl = $('#dqualifications');
      this.addressControl = $('#daddress');
      this.userNameControl = $('#duser-name');
      this.passwordControl = $('#dpassword');
      this.recoveryContactControl = $('#drecovery-contact');
      this.recoveryEmailControl = $('#drecovery-email');
      //doctor isactive/inactive radio controls
      this.activeControl = $('#dactive');
      this.inactiveControl = $('#dinactive');

      //controls are passed, so that they are available to click function as closure variables
      /*
      this.controls = { idControl: this.idControl,
                      nameControl: this.nameControl,
                      contactControl: this.contactControl,
                      alternatContactControl: this.alternatContactControl,
                      emailControl: this.emailControl,
                      qualificationControl: this.qualificationControl,
                      addressControl: this.addressControl,
                      userNameControl: this.userNameControl,
                      passwordControl: this.passwordControl,
                      activeControl: this.activeControl,
                      //inactiveControl: this.inactiveControl
                      };
                      */
      //wiring events


      $('#btn-doc-reg-sumit').on('click', (function(controller){
        //console.log('handler added : ' + cat.Id);
        return function(){
          //console.log('handler exec : ' + cat.Id);
          console.log('doctor reg click submit');
          //steps in saved
          //update mode with info from the view
          //persist the model i.e save update

          //updates the model with info from the view
          controller.updateModelFromView();
          console.log('model value' + JSON.stringify(doctorModel) );
          controller.saveDoctorAndRedirect();
        };
      })(controller)); //submit click handler


      this.render();
    },
    getControls: function(){
      return this.controls;
    },
    render: function() {

      var model = controller.getModel();

      this.idControl.val(model.id);
      this.nameControl.val(model.name);
      this.contactControl.val(model.contact);
      this.alternatContactControl.val(model.alternateContact);
      this.emailControl.val(model.email);
      this.qualificationControl.val(model.qualifications);
      this.addressControl.val(model.address);
      this.userNameControl.val(model.userName);
      this.passwordControl.val(model.password);
      this.recoveryContactControl.val(model.recoveryContact);
      this.recoveryEmailControl.val(model.recoveryEmail);


      if(model.isActive == 1){
        this.activeControl.prop('checked', true);
        this.inactiveControl.prop('checked', false);
      } else{
        this.activeControl.prop('checked', false);
        this.inactiveControl.prop('checked', true);

      }

      //doctor isactive/inactive radio controls
      //set controls depending up the data
      //this.activeControl = $('#dactive');
    }
  };

  controller.init();

});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxpdHkuanMiLCJsaW5rcy5qcyIsImRvY3RvckRhc2hib2FyZC5qcyIsInJlZ2lzdHJhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImRvY3Rvci5wcm9maWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9oZWxwZXIgZnVuY3Rpb24gdG8gZ2V0IHRoZSB1cmwgcXVlcnkgcGFyYW1ldGVyc1xyXG52YXIgdXRpbGl0eSA9IHtcclxuICBnZXRVUkxQYXJhbTogZnVuY3Rpb24obmFtZSl7XHJcbiAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcblxyXG4gICAgbmFtZSA9IG5hbWUucmVwbGFjZSgvW1xcW1xcXV0vZywgXCJcXFxcJCZcIik7XHJcblxyXG4gICAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cChcIls/Jl1cIiArIG5hbWUgKyBcIig9KFteJiNdKil8JnwjfCQpXCIpO1xyXG4gICAgdmFyIHJlc3VsdHMgPSByZWdleC5leGVjKHVybCk7XHJcblxyXG4gICAgaWYgKCFyZXN1bHRzKSByZXR1cm4gbnVsbDtcclxuICAgIGlmICghcmVzdWx0c1syXSkgcmV0dXJuICcnO1xyXG5cclxuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocmVzdWx0c1syXS5yZXBsYWNlKC9cXCsvZywgXCIgXCIpKTtcclxuICB9LFxyXG4gIGdldFRpbWVNaW51dGVzQXJyYXk6ICBmdW5jdGlvbigpe1xyXG5cclxuICB9XHJcbn1cclxuIiwidmFyIGxpbmtzID0ge1xyXG5cclxuICAvL2xvZ2luIGpzIHVybHNcclxuICAgYXV0aGVudGljYXRlVXJsIDogXCJpbmRleC5waHAvYXV0aGVudGljYXRlL2F1dGhlbml0Y2F0ZVVzZXJcIixcclxuICAgc3VjY2Vzc1JlZGlyZWN0VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL1wiLFxyXG4gICByZWdpc3RlckRvY3RvclVybCA6IFwiaW5kZXgucGhwL2RvY3Rvci9kb2N0b3JJbmZvXCIsXHJcbiAgIGFkbWluVXJsOlwiaW5kZXgucGhwL2FkbWluRGFzaGJvYXJkL2FkbWluXCIsXHJcblxyXG4gICAvL2FkbWluIHJlbGF0ZWRcclxuICAgZG9jdG9yTGlzdGluZ1VybDogXCJpbmRleC5waHAvYWRtaW5EYXNoYm9hcmQvZG9jdG9yTGlzdGluZ1wiLFxyXG5cclxuICAgbG9nb3V0VXJsIDogXCJpbmRleC5waHAvYXV0aGVudGljYXRlL2xvZ291dFwiLFxyXG5cclxuICAgLy9kb2N0b3IgZGFzaGJvYXJkIGxpbmtzXHJcbiAgIGRvY3RvclByb2ZpbGUgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvZG9jdG9yUHJvZmlsZVwiLFxyXG4gICBkYXNoYm9hcmRIb21lVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL1wiLFxyXG4gICBuZXdBcHBvaW50bWVudFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9ib29rQXBwb2ludG1lbnRcIixcclxuICAgcGF0aWVudHNFbnRyeVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wYXRpZW50c0VudHJ5XCIsXHJcbiAgIHBhdGllbnRzTGlzdGluZ1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wYXRpZW50c0xpc3RpbmdcIixcclxuICAgY2xvc2VBcHBvaW50bWVudFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jbG9zZUFwcG9pbnRtZW50XCIsXHJcbiAgIGRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2xpc3RBcHBvaW50bWVudFwiLFxyXG4gICBuZXdTY2hlZHVsZVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9uZXdTY2hlZHVsZVwiLFxyXG4gICBsaXN0U2NoZWR1bGVVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvc2NoZWR1bGVMaXN0XCIsXHJcbiAgIGFkZFN0YWZmVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3N0YWZmRW50cnlcIixcclxuICAgcGF0aWVudHNIaXN0b3J5VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3BhdGllbnRIaXN0b3J5XCIsXHJcbiAgIGNyZWF0ZVByb2dyYW1Gb3JQYXRpZW50VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2NyZWF0ZU1lZGljYWxQcm9ncmFtXCIsXHJcbiAgIHByb2dyYW1tZUxpc3RpbmdzVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3Byb2dyYW1tZUxpc3RcIixcclxuICAgTWFuYWdlTG9jYXRpb25zVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3dvcmtMb2NhdGlvbk1hbmFnZW1lbnRcIixcclxuXHJcbiAgIC8vc2NoZWR1bGVcclxuICAgZ2V0TG9jYXRpb25Vcmw6IFwiaW5kZXgucGhwL2xvY2F0aW9ucy9nZXREb2N0b3JMb2NhdGlvbnNcIixcclxuICAgY3JlYXRlVXBkYXRlU2NoZWR1bGVVcmw6IFwiaW5kZXgucGhwL3NjaGVkdWxlL2NyZWF0ZVVwZGF0ZVNjaGVkdWxlXCIsXHJcblxyXG4gICAvL3Byb2dyYW1tZVxyXG4gICBwcm9ncmFtbWVMaXN0VXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRNZWRpY2F0aW9uUHJvZ3JhbW1lTGlzdFwiLFxyXG4gICBwcm9ncmFtbWVFZGl0VXJsOlwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jcmVhdGVNZWRpY2FsUHJvZ3JhbVwiLFxyXG4gICBjcmVhdGVNb2RpZnlQcm9ncmFtbWVVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2NyZWF0ZU1vZGlmeVByb2dyYW1tZVwiLFxyXG4gICBnZXRQcm9ncmFtbWVVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldFByb2dyYW1tZXNcIixcclxuXHJcblxyXG4gICAvL3BhdGllbnRcclxuICAgcGF0aWVudERldGFpbFBlcnNpc3RVcmw6XCJpbmRleC5waHAvcGF0aWVudC9hZGRVcGRhdGVQYXRpZW50XCIsXHJcbiAgIHBhdGllbnRzRGV0YWlsc1VybDpcImluZGV4LnBocC9wYXRpZW50L2dldFBhdGllbnREZXRhaWxzXCIsXHJcbiAgIGxvZ2luQ2hlY2tVcmw6XCJpbmRleC5waHAvYXV0aGVudGljYXRlL2lzTG9nZ2VkSW5cIixcclxuICAgZ2V0UHJvZ3JhbW1lTGlzdDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0TWVkaWNhdGlvblByb2dyYW1tZUxpc3RcIixcclxuICAgcHJvZ3JhbW1lTGlzdERldGFpbHNVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldFByb2dyYW1tZUxpc3REZXRhaWxzXCIsXHJcbiAgIHBhdGllbnRzUHJvZ3JhbW1lc1VybDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0UGF0aWVudFByb2dyYW1tZXNcIixcclxuICAgcGF0aWVudExpc3RpbmdVcmw6XCJpbmRleC5waHAvcGF0aWVudC9nZXRQYXRpZW50TGlzdFwiLFxyXG5cclxuICAgc2F2ZVVwZGF0ZUxvY2F0aW9uczpcImluZGV4LnBocC9sb2NhdGlvbnMvYWRkVXBkYXRlTG9jYXRpb25cIixcclxuICAgbG9jYXRpb25MaXN0VXJsOlwiaW5kZXgucGhwL2xvY2F0aW9ucy9nZXREb2N0b3JMb2NhdGlvbnNcIixcclxuXHJcblxyXG4gICAvL3JlZ2lzdGFydGlvblxyXG5cclxuICAgZG9jdG9yVXJsOlwiaW5kZXgucGhwL2RvY3Rvci9zYXZlVXBkYXRlRG9jdG9yXCIsXHJcbiAgIGRvY3RvckRldGFpbHNVcmw6XCJpbmRleC5waHAvZG9jdG9yL2dldERvY3RvckRldGFpbHNcIixcclxuICAgbG9naW5DaGVja1VybDpcImluZGV4LnBocC9hdXRoZW50aWNhdGUvaXNMb2dnZWRJblwiLFxyXG4gICBkb2N0b3JEYXNoVXJsOlwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9cIixcclxuICAgbG9nb3V0VXJsOlwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9sb2dvdXRcIlxyXG5cclxufVxyXG4iLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG5cclxuICAgIC8vZGVmaW5pbmcgdGhlIGhlbHBlciBmdW5jdGlvbnMgaW4gZ2xvYmFsXHJcblxyXG4gICAgJChmdW5jdGlvbigpe1xyXG5cclxuICAgICAgY29uc29sZS5sb2coJ0RvY3RvciBEYXNoYm9hcmQganMgbG9hZGVkJyk7XHJcblxyXG4gICAgICAgICAgLy90b3AgbGV2ZWwgY29udHJvbGxlclxyXG4gICAgICB2YXIgY29udHJvbGxlciA9IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgLy93aXJpbmcgdGhlIG5hdmlnYXRpb25cclxuICAgICAgICAgIHRoaXMubG9nb3V0VXJsID0gbGlua3MubG9nb3V0VXJsO1xyXG4gICAgICAgICAgdGhpcy5kb2N0b3JQcm9maWxlID0gbGlua3MuZG9jdG9yUHJvZmlsZTtcclxuICAgICAgICAgIHRoaXMuZGFzaGJvYXJkSG9tZVVybCA9IGxpbmtzLmRhc2hib2FyZEhvbWVVcmw7XHJcbiAgICAgICAgICB0aGlzLm5ld0FwcG9pbnRtZW50VXJsID0gbGlua3MubmV3QXBwb2ludG1lbnRVcmw7XHJcbiAgICAgICAgICB0aGlzLnBhdGllbnRzRW50cnlVcmwgPSBsaW5rcy5wYXRpZW50c0VudHJ5VXJsO1xyXG4gICAgICAgICAgdGhpcy5wYXRpZW50c0xpc3RpbmdVcmwgPSBsaW5rcy5wYXRpZW50c0xpc3RpbmdVcmw7XHJcbiAgICAgICAgICB0aGlzLmNsb3NlQXBwb2ludG1lbnRVcmwgPSBsaW5rcy5jbG9zZUFwcG9pbnRtZW50VXJsO1xyXG4gICAgICAgICAgdGhpcy5kb2N0b3JzQXBwb2ludG1lbnRzTGlzdFVybCA9IGxpbmtzLmRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsO1xyXG5cclxuICAgICAgICAgIHRoaXMubmV3U2NoZWR1bGVVcmwgPSBsaW5rcy5uZXdTY2hlZHVsZVVybDtcclxuICAgICAgICAgIHRoaXMubGlzdFNjaGVkdWxlVXJsID0gdGhpcy5saXN0U2NoZWR1bGVVcmw7XHJcbiAgICAgICAgICB0aGlzLmFkZFN0YWZmVXJsID0gbGlua3MuYWRkU3RhZmZVcmw7XHJcbiAgICAgICAgICB0aGlzLnBhdGllbnRzSGlzdG9yeVVybCA9IGxpbmtzLnBhdGllbnRzSGlzdG9yeVVybDtcclxuXHJcbiAgICAgICAgICB0aGlzLmNyZWF0ZVByb2dyYW1Gb3JQYXRpZW50VXJsID0gbGlua3MuY3JlYXRlUHJvZ3JhbUZvclBhdGllbnRVcmwgO1xyXG4gICAgICAgICAgdGhpcy5wcm9ncmFtbWVMaXN0aW5nc1VybCA9IGxpbmtzLnByb2dyYW1tZUxpc3RpbmdzVXJsO1xyXG5cclxuICAgICAgICAgIHRoaXMuTWFuYWdlTG9jYXRpb25zVXJsID0gbGlua3MuTWFuYWdlTG9jYXRpb25zVXJsO1xyXG5cclxuICAgICAgICAgIC8vZG8gc29tZXRobmcgYWJvdXQgZG9jdG9ycyBpbmZvIGFuZCByZWdpc3RyYXRpb25cclxuXHJcbiAgICAgICAgICAvL1RoZSB1cmwgZnJvbSB0aGUgYnJvd3NlciAgY2FuIGJlIGNvbXBhcmVkIHRvIHNldCB0aGUgYWN0aXZlIG5hdmlnYXRpb25cclxuICAgICAgICAgIG5hdlZpZXcuaW5pdCgpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICB2YXIgbmF2VmlldyA9IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgIC8vd2lyaW5nIHRoZSBuYXZpZ2F0aW9uIGNsaWNrc1xyXG5cclxuXHJcbiAgICAgICAgICAkKFwiI3Btcy1icmFuZC1idG4tbGlua1wiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1BNUyBicmFuZCBjbGljaycpO1xyXG5cclxuICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgJChcIiNidG4tcHJvZ3JhbW1lLXNlY3Rpb24tbGlua1wiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJChcIiNjcmVhdGUtcHJvZ3JhbS1mb3ItcGF0aWVudC1zZWN0aW9uXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NyZWF0ZSBwcm9ncmFtIGZvciBwYXRpZW50Jyk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5jcmVhdGVQcm9ncmFtRm9yUGF0aWVudFVybDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKFwiI2J0bi1tYW5hZ2UtbG9jYXRpb25zXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ21hbmFnZSBsb2NhdGlvbnMnKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLk1hbmFnZUxvY2F0aW9uc1VybDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoXCIjYnRuLWxpc3QtcHJvZ3JhbS1zZWN0aW9uXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIucHJvZ3JhbW1lTGlzdGluZ3NVcmw7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKFwiI3BhdGllbnRzLWVudHJ5LWNyZWF0ZS1zZWN0aW9uLWxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygncGF0aWVudHMgRW50cnljbGljaycpO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5wYXRpZW50c0VudHJ5VXJsO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI3BhdGllbnRzLWVudHJ5LWxpc3Qtc2VjdGlvbi1saW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncGF0aWVudHMgbGlzdGluZyBjbGljaycpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIucGF0aWVudHNMaXN0aW5nVXJsO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiN1c2VyLVByb2ZpbGUtQnRuLUxpbmtcIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd1c2VyIHByb2ZpbGUgY2xpY2snKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuZG9jdG9yUHJvZmlsZTtcclxuXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI2RvY3Rvci1kYXNoLWxvZ291dC1idG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvZ291dCBjbGljaycpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIubG9nb3V0VXJsO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiNkYXNoYm9hcmQtU2VjdGlvbi1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5kYXNoYm9hcmRIb21lVXJsO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkYXNoYm9hcmQgY2xpY2snKTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICQoXCIjYm9vay1BcHBvaW50bWVudHMtU2VjdGlvbi1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5uZXdBcHBvaW50bWVudFVybDtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICQoXCIjY2xvc2UtQm9vay1BcHBvaW50bWVudC1TZWN0aW9uLUxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmNsb3NlQXBwb2ludG1lbnRVcmw7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI3ZpZXctQXBwb2ludG1lbnQtU2VjdGlvbi1MaW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5kb2N0b3JzQXBwb2ludG1lbnRzTGlzdFVybDtcclxuICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAkKFwiI21hbmFnZS1Eb2N0b3JzLVNjaGVkdWxlLVNlY3Rpb24tTGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzY2hlZHVsZSBjbGljaycpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiNtYW5hZ2Utc2NoZWR1bGUtY3JlYXRlLXNlY3Rpb24tbGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCduZXcgc2NoZWR1bGUgY2xpY2snKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIubmV3U2NoZWR1bGVVcmw7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI21hbmFnZS1zY2hlZHVsZS1saXN0LXNlY3Rpb24tbGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzY2hlZHVsZSBsaXN0IGNsaWNrJyk7XHJcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmxpc3RTY2hlZHVsZVVybDtcclxuICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgJChcIiNhZGQtU3RhZmYtU2VjdGlvbi1MaW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuYWRkU3RhZmZVcmw7XHJcbiAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICQoXCIjYnRuLXN0YWZmLWxpc3RpbmdcIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAkKFwiI3BhdGllbnRzLUhpc3RvcnktU2VjdGlvbi1MaW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIucGF0aWVudHNIaXN0b3J5VXJsO1xyXG4gICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKXtcclxuICAgICAgICAgIC8vaGlnaGxpZ2h0IHRoZSByaWdodCBuYXZpZ2F0aW9uXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgY29udHJvbGxlci5pbml0KCk7XHJcblxyXG4gIH0oKSk7XHJcblxyXG59KTtcclxuIiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuICBjb25zb2xlLmxvZygnZG9jdG9yIHJlZ2lzdHJhdGlvbiBpbiAnKTtcclxuXHJcbiAgdmFyIGRvY3Rvck1vZGVsID0ge1xyXG4gICAgIGlkOjAsXHJcbiAgICAgbmFtZTpcIlwiLFxyXG4gICAgIGNvbnRhY3Q6XCJcIixcclxuICAgICBhbHRlcm5hdGVDb250YWN0OiBcIlwiLFxyXG4gICAgIGVtYWlsOiBcIlwiLFxyXG4gICAgIHF1YWxpZmljYXRpb25zOiBcIlwiLFxyXG4gICAgIGFkZHJlc3M6XCJcIixcclxuICAgICByZWNvdmVyeUNvbnRhY3Q6XCJcIixcclxuICAgICByZWNvdmVyeUVtYWlsOlwiXCIsXHJcbiAgICAgdXNlck5hbWU6XCJcIixcclxuICAgICBwYXNzd29yZDpcIlwiLFxyXG4gICAgIGlzQWN0aXZlOjBcclxuICB9O1xyXG5cclxuICB2YXIgY29udHJvbGxlciA9IHtcclxuICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmRvY3RvclVybCA9ICBsaW5rcy5kb2N0b3JVcmw7XHJcbiAgICAgICAgdGhpcy5kb2N0b3JEZXRhaWxzVXJsID0gIGxpbmtzLmRvY3RvckRldGFpbHNVcmw7XHJcbiAgICAgICAgdGhpcy5sb2dpbkNoZWNrVXJsID0gbGlua3MubG9naW5DaGVja1VybDtcclxuICAgICAgICB0aGlzLmRvY3RvckRhc2hVcmwgPSBsaW5rcy5kb2N0b3JEYXNoVXJsO1xyXG4gICAgICAgIHRoaXMubG9nb3V0VXJsID0gbGlua3MubG9nb3V0VXJsO1xyXG4gICAgICAgIGZvcm1WaWV3LmluaXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5nZXREb2N0b3JJbmZvKCk7XHJcbiAgICAgICAgLy9pZiB0aGUgZG9jdG9yIGlzIGxvZ2dlZCBpbiB0aGVuIGZpbGwgdGhlIGZvcm0gd2l0aCB0aGUgZG9jdG9ycyBkYXRhXHJcblxyXG4gICAgICB9LFxyXG4gICAgICBnZXRNb2RlbDogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gZG9jdG9yTW9kZWw7XHJcbiAgICAgIH0sXHJcbiAgICAgIGdldERvY3RvckluZm86IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJC5wb3N0KCBjb250cm9sbGVyLmxvZ2luQ2hlY2tVcmwgLCB7fSlcclxuICAgICAgICAgLmRvbmUoZnVuY3Rpb24oIHJlc3BvbnNlICkge1xyXG4gICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9naW4gY2hlY2s6IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcclxuXHJcbiAgICAgICAgICAgaWYocmVzcG9uc2UuZGF0YS50eXBlID09IFwiRFwiKXtcclxuICAgICAgICAgICAgIGNvbnRyb2xsZXIudXBkYXRlTW9kZWxGcm9tU2VydmVyKHJlc3BvbnNlLmRhdGEuaWQpO1xyXG4gICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIH0pO1xyXG5cclxuICAgICAgfSxcclxuICAgICAgdXBkYXRlTW9kZWxGcm9tU2VydmVyOiBmdW5jdGlvbihkb2N0b3JJZCl7XHJcbiAgICAgICAgJC5nZXQoIGNvbnRyb2xsZXIuZG9jdG9yRGV0YWlsc1VybCAsIHtpZDogZG9jdG9ySWR9KVxyXG4gICAgICAgICAuZG9uZShmdW5jdGlvbiggcmVzcG9uc2UgKSB7XHJcbiAgICAgICAgICAgY29uc29sZS5sb2coXCJ1cGRhdGVJbmZvRnJvbVNlcnZlcjogXCIgKyBKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xyXG5cclxuICAgICAgICAgICB2YXIgZG9jdG9yICA9IHJlc3BvbnNlLmRhdGE7XHJcblxyXG4gICAgICAgICAgIGRvY3Rvck1vZGVsLmlkID0gZG9jdG9yLmlkO1xyXG4gICAgICAgICAgIGRvY3Rvck1vZGVsLm5hbWUgPSBkb2N0b3IubmFtZTtcclxuICAgICAgICAgICBkb2N0b3JNb2RlbC5jb250YWN0ID0gZG9jdG9yLmNvbnRhY3Q7XHJcbiAgICAgICAgICAgZG9jdG9yTW9kZWwuYWx0ZXJuYXRlQ29udGFjdCA9IGRvY3Rvci5hbHRlcm5hdGVDb250YWN0O1xyXG4gICAgICAgICAgIGRvY3Rvck1vZGVsLmVtYWlsID0gZG9jdG9yLmVtYWlsO1xyXG4gICAgICAgICAgIGRvY3Rvck1vZGVsLnF1YWxpZmljYXRpb25zID0gZG9jdG9yLnF1YWxpZmljYXRpb25zO1xyXG4gICAgICAgICAgIGRvY3Rvck1vZGVsLmFkZHJlc3MgPSBkb2N0b3IuYWRkcmVzcztcclxuICAgICAgICAgICBkb2N0b3JNb2RlbC51c2VyTmFtZSA9IGRvY3Rvci51c2VyTmFtZTtcclxuICAgICAgICAgICBkb2N0b3JNb2RlbC5wYXNzd29yZCA9IGRvY3Rvci5wYXNzd29yZDtcclxuICAgICAgICAgICBkb2N0b3JNb2RlbC5yZWNvdmVyeUNvbnRhY3QgPSBkb2N0b3IucmVjb3ZlcnlDb250YWN0O1xyXG4gICAgICAgICAgIGRvY3Rvck1vZGVsLnJlY292ZXJ5RW1haWwgPSBkb2N0b3IucmVjb3ZlcnlFbWFpbDtcclxuICAgICAgICAgICBkb2N0b3JNb2RlbC5pc0FjdGl2ZSA9IGRvY3Rvci5pc0FjdGl2ZTtcclxuXHJcbiAgICAgICAgICAgZm9ybVZpZXcucmVuZGVyKCk7XHJcblxyXG4gICAgICAgICB9KTtcclxuXHJcbiAgICAgIH0sXHJcbiAgICAgIHVwZGF0ZU1vZGVsRnJvbVZpZXc6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgZG9jdG9yTW9kZWwuaWQgPSBmb3JtVmlldy5pZENvbnRyb2wudmFsKCk7XHJcbiAgICAgICAgZG9jdG9yTW9kZWwubmFtZSA9IGZvcm1WaWV3Lm5hbWVDb250cm9sLnZhbCgpO1xyXG4gICAgICAgIGRvY3Rvck1vZGVsLmNvbnRhY3QgPSBmb3JtVmlldy5jb250YWN0Q29udHJvbC52YWwoKTtcclxuICAgICAgICBkb2N0b3JNb2RlbC5hbHRlcm5hdGVDb250YWN0ID0gZm9ybVZpZXcuYWx0ZXJuYXRDb250YWN0Q29udHJvbC52YWwoKTtcclxuICAgICAgICBkb2N0b3JNb2RlbC5lbWFpbCA9IGZvcm1WaWV3LmVtYWlsQ29udHJvbC52YWwoKTtcclxuICAgICAgICBkb2N0b3JNb2RlbC5xdWFsaWZpY2F0aW9ucyA9IGZvcm1WaWV3LnF1YWxpZmljYXRpb25Db250cm9sLnZhbCgpO1xyXG4gICAgICAgIGRvY3Rvck1vZGVsLmFkZHJlc3MgPSBmb3JtVmlldy5hZGRyZXNzQ29udHJvbC52YWwoKTtcclxuICAgICAgICBkb2N0b3JNb2RlbC51c2VyTmFtZSA9IGZvcm1WaWV3LnVzZXJOYW1lQ29udHJvbC52YWwoKTtcclxuICAgICAgICBkb2N0b3JNb2RlbC5wYXNzd29yZCA9IGZvcm1WaWV3LnBhc3N3b3JkQ29udHJvbC52YWwoKTtcclxuICAgICAgICBkb2N0b3JNb2RlbC5yZWNvdmVyeUNvbnRhY3QgPSBmb3JtVmlldy5yZWNvdmVyeUNvbnRhY3RDb250cm9sLnZhbCgpO1xyXG4gICAgICAgIGRvY3Rvck1vZGVsLnJlY292ZXJ5RW1haWwgPSBmb3JtVmlldy5yZWNvdmVyeUVtYWlsQ29udHJvbC52YWwoKTtcclxuXHJcblxyXG4gICAgICAgIGlmKGZvcm1WaWV3LmFjdGl2ZUNvbnRyb2wuaXMoXCI6Y2hlY2tlZFwiKSl7XHJcbiAgICAgICAgICBkb2N0b3JNb2RlbC5pc0FjdGl2ZSA9IDE7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICBkb2N0b3JNb2RlbC5pc0FjdGl2ZSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZG9jdG9yTW9kZWw7XHJcbiAgICAgIH0sXHJcbiAgICAgIHNhdmVEb2N0b3JBbmRSZWRpcmVjdDogZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgJC5wb3N0KCBjb250cm9sbGVyLmRvY3RvclVybCAsIGRvY3Rvck1vZGVsKVxyXG4gICAgICAgICAuZG9uZShmdW5jdGlvbiggcmVzcG9uc2UgKSB7XHJcbiAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3BvbnNlICcgKyBKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xyXG5cclxuXHJcbiAgICAgICAgICAgaWYocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT0gXCItMVwiKXtcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQbGVhc2Ugc2VsZWN0IGFub3RoZXIgbG9naW4gSWQnKTtcclxuICAgICAgICAgICB9ZWxzZSBpZihyZXNwb25zZS5kYXRhLnVzZXIudHlwZSA9PSBcIkRcIil7XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2F2ZWQgc3VjY2Vzc2Z1bGx5LCBub3cgeW91IHdpbGwgcmVjZWl2ZSBhIGNvbmZpcm1hdGlvbiBlbWFpbCwgdGhlbiB5b3UgY2FuIGxvZ2luJyk7XHJcbiAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIubG9nb3V0VXJsO1xyXG4gICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIC8qZ2V0VVJMUGFyYW06IGZ1bmN0aW9uKG5hbWU6IHN0cmluZyl7XHJcblxyXG4gICAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcblxyXG4gICAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC9bXFxbXFxdXS9nLCBcIlxcXFwkJlwiKTtcclxuXHJcbiAgICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAoXCJbPyZdXCIgKyBuYW1lICsgXCIoPShbXiYjXSopfCZ8I3wkKVwiKTtcclxuICAgICAgdmFyIHJlc3VsdHMgPSByZWdleC5leGVjKHVybCk7XHJcblxyXG4gICAgICBpZiAoIXJlc3VsdHMpIHJldHVybiBudWxsO1xyXG4gICAgICBpZiAoIXJlc3VsdHNbMl0pIHJldHVybiAnJztcclxuXHJcbiAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocmVzdWx0c1syXS5yZXBsYWNlKC9cXCsvZywgXCIgXCIpKTtcclxuXHJcbiAgICB9Ki9cclxuICB9O1xyXG5cclxuXHJcbiAgdmFyIGZvcm1WaWV3ID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgY29uc29sZS5sb2coJ2Zvcm0gdmlldyBpbnRpJyk7XHJcblxyXG4gICAgICB0aGlzLmlkQ29udHJvbCA9ICQoJyNkaWQnKTtcclxuICAgICAgdGhpcy5uYW1lQ29udHJvbCA9ICQoJyNkbmFtZScpO1xyXG4gICAgICB0aGlzLmNvbnRhY3RDb250cm9sID0gJCgnI2Rjb250YWN0Jyk7XHJcbiAgICAgIHRoaXMuYWx0ZXJuYXRDb250YWN0Q29udHJvbCA9ICQoJyNkYWx0ZXJuYXRlLWNvbnRhY3QnKTtcclxuICAgICAgdGhpcy5lbWFpbENvbnRyb2wgPSAkKCcjZGVtYWlsJyk7XHJcbiAgICAgIHRoaXMucXVhbGlmaWNhdGlvbkNvbnRyb2wgPSAkKCcjZHF1YWxpZmljYXRpb25zJyk7XHJcbiAgICAgIHRoaXMuYWRkcmVzc0NvbnRyb2wgPSAkKCcjZGFkZHJlc3MnKTtcclxuICAgICAgdGhpcy51c2VyTmFtZUNvbnRyb2wgPSAkKCcjZHVzZXItbmFtZScpO1xyXG4gICAgICB0aGlzLnBhc3N3b3JkQ29udHJvbCA9ICQoJyNkcGFzc3dvcmQnKTtcclxuICAgICAgdGhpcy5yZWNvdmVyeUNvbnRhY3RDb250cm9sID0gJCgnI2RyZWNvdmVyeS1jb250YWN0Jyk7XHJcbiAgICAgIHRoaXMucmVjb3ZlcnlFbWFpbENvbnRyb2wgPSAkKCcjZHJlY292ZXJ5LWVtYWlsJyk7XHJcbiAgICAgIC8vZG9jdG9yIGlzYWN0aXZlL2luYWN0aXZlIHJhZGlvIGNvbnRyb2xzXHJcbiAgICAgIHRoaXMuYWN0aXZlQ29udHJvbCA9ICQoJyNkYWN0aXZlJyk7XHJcbiAgICAgIHRoaXMuaW5hY3RpdmVDb250cm9sID0gJCgnI2RpbmFjdGl2ZScpO1xyXG5cclxuICAgICAgLy9jb250cm9scyBhcmUgcGFzc2VkLCBzbyB0aGF0IHRoZXkgYXJlIGF2YWlsYWJsZSB0byBjbGljayBmdW5jdGlvbiBhcyBjbG9zdXJlIHZhcmlhYmxlc1xyXG4gICAgICAvKlxyXG4gICAgICB0aGlzLmNvbnRyb2xzID0geyBpZENvbnRyb2w6IHRoaXMuaWRDb250cm9sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgbmFtZUNvbnRyb2w6IHRoaXMubmFtZUNvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb250YWN0Q29udHJvbDogdGhpcy5jb250YWN0Q29udHJvbCxcclxuICAgICAgICAgICAgICAgICAgICAgIGFsdGVybmF0Q29udGFjdENvbnRyb2w6IHRoaXMuYWx0ZXJuYXRDb250YWN0Q29udHJvbCxcclxuICAgICAgICAgICAgICAgICAgICAgIGVtYWlsQ29udHJvbDogdGhpcy5lbWFpbENvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICBxdWFsaWZpY2F0aW9uQ29udHJvbDogdGhpcy5xdWFsaWZpY2F0aW9uQ29udHJvbCxcclxuICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3NDb250cm9sOiB0aGlzLmFkZHJlc3NDb250cm9sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdXNlck5hbWVDb250cm9sOiB0aGlzLnVzZXJOYW1lQ29udHJvbCxcclxuICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkQ29udHJvbDogdGhpcy5wYXNzd29yZENvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVDb250cm9sOiB0aGlzLmFjdGl2ZUNvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICAvL2luYWN0aXZlQ29udHJvbDogdGhpcy5pbmFjdGl2ZUNvbnRyb2xcclxuICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAvL3dpcmluZyBldmVudHNcclxuXHJcblxyXG4gICAgICAkKCcjYnRuLWRvYy1yZWctc3VtaXQnKS5vbignY2xpY2snLCAoZnVuY3Rpb24oY29udHJvbGxlcil7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnaGFuZGxlciBhZGRlZCA6ICcgKyBjYXQuSWQpO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgLy9jb25zb2xlLmxvZygnaGFuZGxlciBleGVjIDogJyArIGNhdC5JZCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnZG9jdG9yIHJlZyBjbGljayBzdWJtaXQnKTtcclxuICAgICAgICAgIC8vc3RlcHMgaW4gc2F2ZWRcclxuICAgICAgICAgIC8vdXBkYXRlIG1vZGUgd2l0aCBpbmZvIGZyb20gdGhlIHZpZXdcclxuICAgICAgICAgIC8vcGVyc2lzdCB0aGUgbW9kZWwgaS5lIHNhdmUgdXBkYXRlXHJcblxyXG4gICAgICAgICAgLy91cGRhdGVzIHRoZSBtb2RlbCB3aXRoIGluZm8gZnJvbSB0aGUgdmlld1xyXG4gICAgICAgICAgY29udHJvbGxlci51cGRhdGVNb2RlbEZyb21WaWV3KCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnbW9kZWwgdmFsdWUnICsgSlNPTi5zdHJpbmdpZnkoZG9jdG9yTW9kZWwpICk7XHJcbiAgICAgICAgICBjb250cm9sbGVyLnNhdmVEb2N0b3JBbmRSZWRpcmVjdCgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH0pKGNvbnRyb2xsZXIpKTsgLy9zdWJtaXQgY2xpY2sgaGFuZGxlclxyXG5cclxuXHJcbiAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0Q29udHJvbHM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xzO1xyXG4gICAgfSxcclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICB2YXIgbW9kZWwgPSBjb250cm9sbGVyLmdldE1vZGVsKCk7XHJcblxyXG4gICAgICB0aGlzLmlkQ29udHJvbC52YWwobW9kZWwuaWQpO1xyXG4gICAgICB0aGlzLm5hbWVDb250cm9sLnZhbChtb2RlbC5uYW1lKTtcclxuICAgICAgdGhpcy5jb250YWN0Q29udHJvbC52YWwobW9kZWwuY29udGFjdCk7XHJcbiAgICAgIHRoaXMuYWx0ZXJuYXRDb250YWN0Q29udHJvbC52YWwobW9kZWwuYWx0ZXJuYXRlQ29udGFjdCk7XHJcbiAgICAgIHRoaXMuZW1haWxDb250cm9sLnZhbChtb2RlbC5lbWFpbCk7XHJcbiAgICAgIHRoaXMucXVhbGlmaWNhdGlvbkNvbnRyb2wudmFsKG1vZGVsLnF1YWxpZmljYXRpb25zKTtcclxuICAgICAgdGhpcy5hZGRyZXNzQ29udHJvbC52YWwobW9kZWwuYWRkcmVzcyk7XHJcbiAgICAgIHRoaXMudXNlck5hbWVDb250cm9sLnZhbChtb2RlbC51c2VyTmFtZSk7XHJcbiAgICAgIHRoaXMucGFzc3dvcmRDb250cm9sLnZhbChtb2RlbC5wYXNzd29yZCk7XHJcbiAgICAgIHRoaXMucmVjb3ZlcnlDb250YWN0Q29udHJvbC52YWwobW9kZWwucmVjb3ZlcnlDb250YWN0KTtcclxuICAgICAgdGhpcy5yZWNvdmVyeUVtYWlsQ29udHJvbC52YWwobW9kZWwucmVjb3ZlcnlFbWFpbCk7XHJcblxyXG5cclxuICAgICAgaWYobW9kZWwuaXNBY3RpdmUgPT0gMSl7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVDb250cm9sLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgICB0aGlzLmluYWN0aXZlQ29udHJvbC5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICB9IGVsc2V7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVDb250cm9sLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5pbmFjdGl2ZUNvbnRyb2wucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgLy9kb2N0b3IgaXNhY3RpdmUvaW5hY3RpdmUgcmFkaW8gY29udHJvbHNcclxuICAgICAgLy9zZXQgY29udHJvbHMgZGVwZW5kaW5nIHVwIHRoZSBkYXRhXHJcbiAgICAgIC8vdGhpcy5hY3RpdmVDb250cm9sID0gJCgnI2RhY3RpdmUnKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb250cm9sbGVyLmluaXQoKTtcclxuXHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
