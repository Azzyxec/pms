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
        console.log('Doctor edit js loaded');

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
           isActive:1
        };

        var controller = {
            init: function(){
              this.doctorUrl =  "index.php/saveUpdateDoctor";
              this.doctorDetailsUrl =  "index.php/getDoctorDetails";
              this.adminDoctorsListingUrl = "index.php/doctorListing";
              formView.init();

              //getting doctors info for the doctors id in the url
              var doctorsId = utility.getURLParam('id');

              console.log('doctors Id ' + doctorsId);
              if(doctorsId){
                controller.updateModelFromServer(doctorsId);
              }

            },
            getModel: function(){
              return doctorModel;
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
                      window.location.href = controller.adminDoctorsListingUrl;
                 }

               });
            }
        };//controller


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

    }());

});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxpdHkuanMiLCJsaW5rcy5qcyIsImFkbWluRGFzaGJvYXJkLmpzIiwiYWRtaW4uZG9jdG9yLmVkaXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFkbWluLmRvY3Rvci5lZGl0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9oZWxwZXIgZnVuY3Rpb24gdG8gZ2V0IHRoZSB1cmwgcXVlcnkgcGFyYW1ldGVyc1xyXG52YXIgdXRpbGl0eSA9IHtcclxuICBnZXRVUkxQYXJhbTogZnVuY3Rpb24obmFtZSl7XHJcbiAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcblxyXG4gICAgbmFtZSA9IG5hbWUucmVwbGFjZSgvW1xcW1xcXV0vZywgXCJcXFxcJCZcIik7XHJcblxyXG4gICAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cChcIls/Jl1cIiArIG5hbWUgKyBcIig9KFteJiNdKil8JnwjfCQpXCIpO1xyXG4gICAgdmFyIHJlc3VsdHMgPSByZWdleC5leGVjKHVybCk7XHJcblxyXG4gICAgaWYgKCFyZXN1bHRzKSByZXR1cm4gbnVsbDtcclxuICAgIGlmICghcmVzdWx0c1syXSkgcmV0dXJuICcnO1xyXG5cclxuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocmVzdWx0c1syXS5yZXBsYWNlKC9cXCsvZywgXCIgXCIpKTtcclxuICB9LFxyXG4gIGdldFRpbWVNaW51dGVzQXJyYXk6ICBmdW5jdGlvbigpe1xyXG5cclxuICB9XHJcbn1cclxuIiwidmFyIGxpbmtzID0ge1xyXG5cclxuICAvL2xvZ2luIGpzIHVybHNcclxuICAgYXV0aGVudGljYXRlVXJsIDogXCJpbmRleC5waHAvYXV0aGVudGljYXRlL2F1dGhlbml0Y2F0ZVVzZXJcIixcclxuICAgc3VjY2Vzc1JlZGlyZWN0VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL1wiLFxyXG4gICByZWdpc3RlckRvY3RvclVybCA6IFwiaW5kZXgucGhwL2RvY3Rvci9kb2N0b3JJbmZvXCIsXHJcbiAgIGFkbWluVXJsOlwiaW5kZXgucGhwL2FkbWluRGFzaGJvYXJkL2FkbWluXCIsXHJcblxyXG4gICAvL2FkbWluIHJlbGF0ZWRcclxuICAgZG9jdG9yTGlzdGluZ1VybDogXCJpbmRleC5waHAvYWRtaW5EYXNoYm9hcmQvZG9jdG9yTGlzdGluZ1wiLFxyXG5cclxuICAgbG9nb3V0VXJsIDogXCJpbmRleC5waHAvYXV0aGVudGljYXRlL2xvZ291dFwiLFxyXG5cclxuICAgLy9kb2N0b3IgZGFzaGJvYXJkIGxpbmtzXHJcbiAgIGRvY3RvclByb2ZpbGUgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvZG9jdG9yUHJvZmlsZVwiLFxyXG4gICBkYXNoYm9hcmRIb21lVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL1wiLFxyXG4gICBuZXdBcHBvaW50bWVudFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9ib29rQXBwb2ludG1lbnRcIixcclxuICAgcGF0aWVudHNFbnRyeVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wYXRpZW50c0VudHJ5XCIsXHJcbiAgIHBhdGllbnRzTGlzdGluZ1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9wYXRpZW50c0xpc3RpbmdcIixcclxuICAgY2xvc2VBcHBvaW50bWVudFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jbG9zZUFwcG9pbnRtZW50XCIsXHJcbiAgIGRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2xpc3RBcHBvaW50bWVudFwiLFxyXG4gICBuZXdTY2hlZHVsZVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9uZXdTY2hlZHVsZVwiLFxyXG4gICBsaXN0U2NoZWR1bGVVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvc2NoZWR1bGVMaXN0XCIsXHJcbiAgIGFkZFN0YWZmVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3N0YWZmRW50cnlcIixcclxuICAgcGF0aWVudHNIaXN0b3J5VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3BhdGllbnRIaXN0b3J5XCIsXHJcbiAgIGNyZWF0ZVByb2dyYW1Gb3JQYXRpZW50VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2NyZWF0ZU1lZGljYWxQcm9ncmFtXCIsXHJcbiAgIHByb2dyYW1tZUxpc3RpbmdzVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3Byb2dyYW1tZUxpc3RcIixcclxuICAgTWFuYWdlTG9jYXRpb25zVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3dvcmtMb2NhdGlvbk1hbmFnZW1lbnRcIixcclxuXHJcbiAgIC8vc2NoZWR1bGVcclxuICAgZ2V0TG9jYXRpb25Vcmw6IFwiaW5kZXgucGhwL2xvY2F0aW9ucy9nZXREb2N0b3JMb2NhdGlvbnNcIixcclxuICAgY3JlYXRlVXBkYXRlU2NoZWR1bGVVcmw6IFwiaW5kZXgucGhwL3NjaGVkdWxlL2NyZWF0ZVVwZGF0ZVNjaGVkdWxlXCIsXHJcblxyXG4gICAvL3Byb2dyYW1tZVxyXG4gICBwcm9ncmFtbWVMaXN0VXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRNZWRpY2F0aW9uUHJvZ3JhbW1lTGlzdFwiLFxyXG4gICBwcm9ncmFtbWVFZGl0VXJsOlwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9jcmVhdGVNZWRpY2FsUHJvZ3JhbVwiLFxyXG4gICBjcmVhdGVNb2RpZnlQcm9ncmFtbWVVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2NyZWF0ZU1vZGlmeVByb2dyYW1tZVwiLFxyXG4gICBnZXRQcm9ncmFtbWVVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldFByb2dyYW1tZXNcIixcclxuXHJcblxyXG4gICAvL3BhdGllbnRcclxuICAgcGF0aWVudERldGFpbFBlcnNpc3RVcmw6XCJpbmRleC5waHAvcGF0aWVudC9hZGRVcGRhdGVQYXRpZW50XCIsXHJcbiAgIHBhdGllbnRzRGV0YWlsc1VybDpcImluZGV4LnBocC9wYXRpZW50L2dldFBhdGllbnREZXRhaWxzXCIsXHJcbiAgIGxvZ2luQ2hlY2tVcmw6XCJpbmRleC5waHAvYXV0aGVudGljYXRlL2lzTG9nZ2VkSW5cIixcclxuICAgZ2V0UHJvZ3JhbW1lTGlzdDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0TWVkaWNhdGlvblByb2dyYW1tZUxpc3RcIixcclxuICAgcHJvZ3JhbW1lTGlzdERldGFpbHNVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldFByb2dyYW1tZUxpc3REZXRhaWxzXCIsXHJcbiAgIHBhdGllbnRzUHJvZ3JhbW1lc1VybDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0UGF0aWVudFByb2dyYW1tZXNcIixcclxuICAgcGF0aWVudExpc3RpbmdVcmw6XCJpbmRleC5waHAvcGF0aWVudC9nZXRQYXRpZW50TGlzdFwiLFxyXG5cclxuICAgc2F2ZVVwZGF0ZUxvY2F0aW9uczpcImluZGV4LnBocC9sb2NhdGlvbnMvYWRkVXBkYXRlTG9jYXRpb25cIixcclxuICAgbG9jYXRpb25MaXN0VXJsOlwiaW5kZXgucGhwL2xvY2F0aW9ucy9nZXREb2N0b3JMb2NhdGlvbnNcIixcclxuXHJcblxyXG4gICAvL3JlZ2lzdGFydGlvblxyXG5cclxuICAgZG9jdG9yVXJsOlwiaW5kZXgucGhwL2RvY3Rvci9zYXZlVXBkYXRlRG9jdG9yXCIsXHJcbiAgIGRvY3RvckRldGFpbHNVcmw6XCJpbmRleC5waHAvZG9jdG9yL2dldERvY3RvckRldGFpbHNcIixcclxuICAgbG9naW5DaGVja1VybDpcImluZGV4LnBocC9hdXRoZW50aWNhdGUvaXNMb2dnZWRJblwiLFxyXG4gICBkb2N0b3JEYXNoVXJsOlwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9cIixcclxuICAgbG9nb3V0VXJsOlwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9sb2dvdXRcIlxyXG5cclxufVxyXG4iLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG5cclxuICAgICQoZnVuY3Rpb24oKXtcclxuICAgICAgICBjb25zb2xlLmxvZygnQWRtaW4gRGFzaGJvYXJkIGpzIGxvYWRlZCcpO1xyXG5cclxuXHJcbiAgICAgICAgLy90b3AgbGV2ZWwgY29udHJvbGxlclxyXG4gICAgdmFyIGNvbnRyb2xsZXIgPSB7XHJcbiAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy93aXJpbmcgdGhlIG5hdmlnYXRpb25cclxuICAgICAgICB0aGlzLmxvZ291dFVybCA9IGxpbmtzLmxvZ291dFVybDtcclxuICAgICAgICB0aGlzLkRvY3Rvckxpc3RpbmdVcmwgPSBsaW5rcy5kb2N0b3JMaXN0aW5nVXJsO1xyXG5cclxuICAgICAgICAvL2RvIHNvbWV0aG5nIGFib3V0IGRvY3RvcnMgaW5mbyBhbmQgcmVnaXN0cmF0aW9uXHJcblxyXG4gICAgICAgIC8vVGhlIHVybCBmcm9tIHRoZSBicm93c2VyICBjYW4gYmUgY29tcGFyZWQgdG8gc2V0IHRoZSBhY3RpdmUgbmF2aWdhdGlvblxyXG4gICAgICAgIG5hdlZpZXcuaW5pdCgpO1xyXG5cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgICAgICAgdmFyIG5hdlZpZXcgPSB7XHJcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgICAgIC8vd2lyaW5nIHRoZSBuYXZpZ2F0aW9uIGNsaWNrc1xyXG4gICAgICAgICAgICAgICQoXCIjcG1zLWJyYW5kLWJ0bi1saW5rXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQTVMgYnJhbmQgY2xpY2snKTtcclxuXHJcbiAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICQoXCIjYWRtaW4tZGFzaC1sb2dvdXQtYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvZ291dCBjbGljaycpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmxvZ291dFVybDtcclxuICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgJChcIiNidG4tbWFuYWdlLWRvY3RvcnNcIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbWFuYWdlIGRvY3RvcnMgY2xpY2snKTtcclxuICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgJChcIiNidG4tZG9jdG9yLWxpc3RpbmdzXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RvY3RvcnMgbGlzdGluZyBjbGljaycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLkRvY3Rvckxpc3RpbmdVcmw7XHJcbiAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnRyb2xsZXIuaW5pdCgpO1xyXG5cclxuICAgIH0oKSk7XHJcblxyXG59KTtcclxuIiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuXHJcbiAgICAkKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0RvY3RvciBlZGl0IGpzIGxvYWRlZCcpO1xyXG5cclxuICAgICAgICB2YXIgZG9jdG9yTW9kZWwgPSB7XHJcbiAgICAgICAgICAgaWQ6MCxcclxuICAgICAgICAgICBuYW1lOlwiXCIsXHJcbiAgICAgICAgICAgY29udGFjdDpcIlwiLFxyXG4gICAgICAgICAgIGFsdGVybmF0ZUNvbnRhY3Q6IFwiXCIsXHJcbiAgICAgICAgICAgZW1haWw6IFwiXCIsXHJcbiAgICAgICAgICAgcXVhbGlmaWNhdGlvbnM6IFwiXCIsXHJcbiAgICAgICAgICAgYWRkcmVzczpcIlwiLFxyXG4gICAgICAgICAgIHJlY292ZXJ5Q29udGFjdDpcIlwiLFxyXG4gICAgICAgICAgIHJlY292ZXJ5RW1haWw6XCJcIixcclxuICAgICAgICAgICB1c2VyTmFtZTpcIlwiLFxyXG4gICAgICAgICAgIHBhc3N3b3JkOlwiXCIsXHJcbiAgICAgICAgICAgaXNBY3RpdmU6MVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciBjb250cm9sbGVyID0ge1xyXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgIHRoaXMuZG9jdG9yVXJsID0gIFwiaW5kZXgucGhwL3NhdmVVcGRhdGVEb2N0b3JcIjtcclxuICAgICAgICAgICAgICB0aGlzLmRvY3RvckRldGFpbHNVcmwgPSAgXCJpbmRleC5waHAvZ2V0RG9jdG9yRGV0YWlsc1wiO1xyXG4gICAgICAgICAgICAgIHRoaXMuYWRtaW5Eb2N0b3JzTGlzdGluZ1VybCA9IFwiaW5kZXgucGhwL2RvY3Rvckxpc3RpbmdcIjtcclxuICAgICAgICAgICAgICBmb3JtVmlldy5pbml0KCk7XHJcblxyXG4gICAgICAgICAgICAgIC8vZ2V0dGluZyBkb2N0b3JzIGluZm8gZm9yIHRoZSBkb2N0b3JzIGlkIGluIHRoZSB1cmxcclxuICAgICAgICAgICAgICB2YXIgZG9jdG9yc0lkID0gdXRpbGl0eS5nZXRVUkxQYXJhbSgnaWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RvY3RvcnMgSWQgJyArIGRvY3RvcnNJZCk7XHJcbiAgICAgICAgICAgICAgaWYoZG9jdG9yc0lkKXtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIudXBkYXRlTW9kZWxGcm9tU2VydmVyKGRvY3RvcnNJZCk7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0TW9kZWw6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGRvY3Rvck1vZGVsO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1cGRhdGVNb2RlbEZyb21TZXJ2ZXI6IGZ1bmN0aW9uKGRvY3RvcklkKXtcclxuICAgICAgICAgICAgICAkLmdldCggY29udHJvbGxlci5kb2N0b3JEZXRhaWxzVXJsICwge2lkOiBkb2N0b3JJZH0pXHJcbiAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uKCByZXNwb25zZSApIHtcclxuICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInVwZGF0ZUluZm9Gcm9tU2VydmVyOiBcIiArIEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgIHZhciBkb2N0b3IgID0gcmVzcG9uc2UuZGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICAgZG9jdG9yTW9kZWwuaWQgPSBkb2N0b3IuaWQ7XHJcbiAgICAgICAgICAgICAgICAgZG9jdG9yTW9kZWwubmFtZSA9IGRvY3Rvci5uYW1lO1xyXG4gICAgICAgICAgICAgICAgIGRvY3Rvck1vZGVsLmNvbnRhY3QgPSBkb2N0b3IuY29udGFjdDtcclxuICAgICAgICAgICAgICAgICBkb2N0b3JNb2RlbC5hbHRlcm5hdGVDb250YWN0ID0gZG9jdG9yLmFsdGVybmF0ZUNvbnRhY3Q7XHJcbiAgICAgICAgICAgICAgICAgZG9jdG9yTW9kZWwuZW1haWwgPSBkb2N0b3IuZW1haWw7XHJcbiAgICAgICAgICAgICAgICAgZG9jdG9yTW9kZWwucXVhbGlmaWNhdGlvbnMgPSBkb2N0b3IucXVhbGlmaWNhdGlvbnM7XHJcbiAgICAgICAgICAgICAgICAgZG9jdG9yTW9kZWwuYWRkcmVzcyA9IGRvY3Rvci5hZGRyZXNzO1xyXG4gICAgICAgICAgICAgICAgIGRvY3Rvck1vZGVsLnVzZXJOYW1lID0gZG9jdG9yLnVzZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgIGRvY3Rvck1vZGVsLnBhc3N3b3JkID0gZG9jdG9yLnBhc3N3b3JkO1xyXG4gICAgICAgICAgICAgICAgIGRvY3Rvck1vZGVsLnJlY292ZXJ5Q29udGFjdCA9IGRvY3Rvci5yZWNvdmVyeUNvbnRhY3Q7XHJcbiAgICAgICAgICAgICAgICAgZG9jdG9yTW9kZWwucmVjb3ZlcnlFbWFpbCA9IGRvY3Rvci5yZWNvdmVyeUVtYWlsO1xyXG4gICAgICAgICAgICAgICAgIGRvY3Rvck1vZGVsLmlzQWN0aXZlID0gZG9jdG9yLmlzQWN0aXZlO1xyXG5cclxuICAgICAgICAgICAgICAgICBmb3JtVmlldy5yZW5kZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdXBkYXRlTW9kZWxGcm9tVmlldzogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICBkb2N0b3JNb2RlbC5pZCA9IGZvcm1WaWV3LmlkQ29udHJvbC52YWwoKTtcclxuICAgICAgICAgICAgICBkb2N0b3JNb2RlbC5uYW1lID0gZm9ybVZpZXcubmFtZUNvbnRyb2wudmFsKCk7XHJcbiAgICAgICAgICAgICAgZG9jdG9yTW9kZWwuY29udGFjdCA9IGZvcm1WaWV3LmNvbnRhY3RDb250cm9sLnZhbCgpO1xyXG4gICAgICAgICAgICAgIGRvY3Rvck1vZGVsLmFsdGVybmF0ZUNvbnRhY3QgPSBmb3JtVmlldy5hbHRlcm5hdENvbnRhY3RDb250cm9sLnZhbCgpO1xyXG4gICAgICAgICAgICAgIGRvY3Rvck1vZGVsLmVtYWlsID0gZm9ybVZpZXcuZW1haWxDb250cm9sLnZhbCgpO1xyXG4gICAgICAgICAgICAgIGRvY3Rvck1vZGVsLnF1YWxpZmljYXRpb25zID0gZm9ybVZpZXcucXVhbGlmaWNhdGlvbkNvbnRyb2wudmFsKCk7XHJcbiAgICAgICAgICAgICAgZG9jdG9yTW9kZWwuYWRkcmVzcyA9IGZvcm1WaWV3LmFkZHJlc3NDb250cm9sLnZhbCgpO1xyXG4gICAgICAgICAgICAgIGRvY3Rvck1vZGVsLnVzZXJOYW1lID0gZm9ybVZpZXcudXNlck5hbWVDb250cm9sLnZhbCgpO1xyXG4gICAgICAgICAgICAgIGRvY3Rvck1vZGVsLnBhc3N3b3JkID0gZm9ybVZpZXcucGFzc3dvcmRDb250cm9sLnZhbCgpO1xyXG4gICAgICAgICAgICAgIGRvY3Rvck1vZGVsLnJlY292ZXJ5Q29udGFjdCA9IGZvcm1WaWV3LnJlY292ZXJ5Q29udGFjdENvbnRyb2wudmFsKCk7XHJcbiAgICAgICAgICAgICAgZG9jdG9yTW9kZWwucmVjb3ZlcnlFbWFpbCA9IGZvcm1WaWV3LnJlY292ZXJ5RW1haWxDb250cm9sLnZhbCgpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgaWYoZm9ybVZpZXcuYWN0aXZlQ29udHJvbC5pcyhcIjpjaGVja2VkXCIpKXtcclxuICAgICAgICAgICAgICAgIGRvY3Rvck1vZGVsLmlzQWN0aXZlID0gMTtcclxuICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGRvY3Rvck1vZGVsLmlzQWN0aXZlID0gMDtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIHJldHVybiBkb2N0b3JNb2RlbDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2F2ZURvY3RvckFuZFJlZGlyZWN0OiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgICAkLnBvc3QoIGNvbnRyb2xsZXIuZG9jdG9yVXJsICwgZG9jdG9yTW9kZWwpXHJcbiAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uKCByZXNwb25zZSApIHtcclxuICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVzcG9uc2UgJyArIEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5kYXRhLnN0YXR1cyA9PSBcIi0xXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1BsZWFzZSBzZWxlY3QgYW5vdGhlciBsb2dpbiBJZCcpO1xyXG4gICAgICAgICAgICAgICAgIH1lbHNlIGlmKHJlc3BvbnNlLmRhdGEudXNlci50eXBlID09IFwiRFwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5hZG1pbkRvY3RvcnNMaXN0aW5nVXJsO1xyXG4gICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTsvL2NvbnRyb2xsZXJcclxuXHJcblxyXG4gICAgICAgICAgdmFyIGZvcm1WaWV3ID0ge1xyXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmb3JtIHZpZXcgaW50aScpO1xyXG5cclxuICAgICAgICAgICAgICB0aGlzLmlkQ29udHJvbCA9ICQoJyNkaWQnKTtcclxuICAgICAgICAgICAgICB0aGlzLm5hbWVDb250cm9sID0gJCgnI2RuYW1lJyk7XHJcbiAgICAgICAgICAgICAgdGhpcy5jb250YWN0Q29udHJvbCA9ICQoJyNkY29udGFjdCcpO1xyXG4gICAgICAgICAgICAgIHRoaXMuYWx0ZXJuYXRDb250YWN0Q29udHJvbCA9ICQoJyNkYWx0ZXJuYXRlLWNvbnRhY3QnKTtcclxuICAgICAgICAgICAgICB0aGlzLmVtYWlsQ29udHJvbCA9ICQoJyNkZW1haWwnKTtcclxuICAgICAgICAgICAgICB0aGlzLnF1YWxpZmljYXRpb25Db250cm9sID0gJCgnI2RxdWFsaWZpY2F0aW9ucycpO1xyXG4gICAgICAgICAgICAgIHRoaXMuYWRkcmVzc0NvbnRyb2wgPSAkKCcjZGFkZHJlc3MnKTtcclxuICAgICAgICAgICAgICB0aGlzLnVzZXJOYW1lQ29udHJvbCA9ICQoJyNkdXNlci1uYW1lJyk7XHJcbiAgICAgICAgICAgICAgdGhpcy5wYXNzd29yZENvbnRyb2wgPSAkKCcjZHBhc3N3b3JkJyk7XHJcbiAgICAgICAgICAgICAgdGhpcy5yZWNvdmVyeUNvbnRhY3RDb250cm9sID0gJCgnI2RyZWNvdmVyeS1jb250YWN0Jyk7XHJcbiAgICAgICAgICAgICAgdGhpcy5yZWNvdmVyeUVtYWlsQ29udHJvbCA9ICQoJyNkcmVjb3ZlcnktZW1haWwnKTtcclxuICAgICAgICAgICAgICAvL2RvY3RvciBpc2FjdGl2ZS9pbmFjdGl2ZSByYWRpbyBjb250cm9sc1xyXG4gICAgICAgICAgICAgIHRoaXMuYWN0aXZlQ29udHJvbCA9ICQoJyNkYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgdGhpcy5pbmFjdGl2ZUNvbnRyb2wgPSAkKCcjZGluYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgIC8vY29udHJvbHMgYXJlIHBhc3NlZCwgc28gdGhhdCB0aGV5IGFyZSBhdmFpbGFibGUgdG8gY2xpY2sgZnVuY3Rpb24gYXMgY2xvc3VyZSB2YXJpYWJsZXNcclxuICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgIHRoaXMuY29udHJvbHMgPSB7IGlkQ29udHJvbDogdGhpcy5pZENvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVDb250cm9sOiB0aGlzLm5hbWVDb250cm9sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWN0Q29udHJvbDogdGhpcy5jb250YWN0Q29udHJvbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0ZXJuYXRDb250YWN0Q29udHJvbDogdGhpcy5hbHRlcm5hdENvbnRhY3RDb250cm9sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbWFpbENvbnRyb2w6IHRoaXMuZW1haWxDb250cm9sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWFsaWZpY2F0aW9uQ29udHJvbDogdGhpcy5xdWFsaWZpY2F0aW9uQ29udHJvbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkcmVzc0NvbnRyb2w6IHRoaXMuYWRkcmVzc0NvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJOYW1lQ29udHJvbDogdGhpcy51c2VyTmFtZUNvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkQ29udHJvbDogdGhpcy5wYXNzd29yZENvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZUNvbnRyb2w6IHRoaXMuYWN0aXZlQ29udHJvbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pbmFjdGl2ZUNvbnRyb2w6IHRoaXMuaW5hY3RpdmVDb250cm9sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgLy93aXJpbmcgZXZlbnRzXHJcblxyXG5cclxuICAgICAgICAgICAgICAkKCcjYnRuLWRvYy1yZWctc3VtaXQnKS5vbignY2xpY2snLCAoZnVuY3Rpb24oY29udHJvbGxlcil7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdoYW5kbGVyIGFkZGVkIDogJyArIGNhdC5JZCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnaGFuZGxlciBleGVjIDogJyArIGNhdC5JZCk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkb2N0b3IgcmVnIGNsaWNrIHN1Ym1pdCcpO1xyXG4gICAgICAgICAgICAgICAgICAvL3N0ZXBzIGluIHNhdmVkXHJcbiAgICAgICAgICAgICAgICAgIC8vdXBkYXRlIG1vZGUgd2l0aCBpbmZvIGZyb20gdGhlIHZpZXdcclxuICAgICAgICAgICAgICAgICAgLy9wZXJzaXN0IHRoZSBtb2RlbCBpLmUgc2F2ZSB1cGRhdGVcclxuXHJcbiAgICAgICAgICAgICAgICAgIC8vdXBkYXRlcyB0aGUgbW9kZWwgd2l0aCBpbmZvIGZyb20gdGhlIHZpZXdcclxuICAgICAgICAgICAgICAgICAgY29udHJvbGxlci51cGRhdGVNb2RlbEZyb21WaWV3KCk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtb2RlbCB2YWx1ZScgKyBKU09OLnN0cmluZ2lmeShkb2N0b3JNb2RlbCkgKTtcclxuICAgICAgICAgICAgICAgICAgY29udHJvbGxlci5zYXZlRG9jdG9yQW5kUmVkaXJlY3QoKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgfSkoY29udHJvbGxlcikpOyAvL3N1Ym1pdCBjbGljayBoYW5kbGVyXHJcblxyXG5cclxuICAgICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRDb250cm9sczogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb250cm9scztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgdmFyIG1vZGVsID0gY29udHJvbGxlci5nZXRNb2RlbCgpO1xyXG5cclxuICAgICAgICAgICAgICB0aGlzLmlkQ29udHJvbC52YWwobW9kZWwuaWQpO1xyXG4gICAgICAgICAgICAgIHRoaXMubmFtZUNvbnRyb2wudmFsKG1vZGVsLm5hbWUpO1xyXG4gICAgICAgICAgICAgIHRoaXMuY29udGFjdENvbnRyb2wudmFsKG1vZGVsLmNvbnRhY3QpO1xyXG4gICAgICAgICAgICAgIHRoaXMuYWx0ZXJuYXRDb250YWN0Q29udHJvbC52YWwobW9kZWwuYWx0ZXJuYXRlQ29udGFjdCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5lbWFpbENvbnRyb2wudmFsKG1vZGVsLmVtYWlsKTtcclxuICAgICAgICAgICAgICB0aGlzLnF1YWxpZmljYXRpb25Db250cm9sLnZhbChtb2RlbC5xdWFsaWZpY2F0aW9ucyk7XHJcbiAgICAgICAgICAgICAgdGhpcy5hZGRyZXNzQ29udHJvbC52YWwobW9kZWwuYWRkcmVzcyk7XHJcbiAgICAgICAgICAgICAgdGhpcy51c2VyTmFtZUNvbnRyb2wudmFsKG1vZGVsLnVzZXJOYW1lKTtcclxuICAgICAgICAgICAgICB0aGlzLnBhc3N3b3JkQ29udHJvbC52YWwobW9kZWwucGFzc3dvcmQpO1xyXG4gICAgICAgICAgICAgIHRoaXMucmVjb3ZlcnlDb250YWN0Q29udHJvbC52YWwobW9kZWwucmVjb3ZlcnlDb250YWN0KTtcclxuICAgICAgICAgICAgICB0aGlzLnJlY292ZXJ5RW1haWxDb250cm9sLnZhbChtb2RlbC5yZWNvdmVyeUVtYWlsKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgIGlmKG1vZGVsLmlzQWN0aXZlID09IDEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVDb250cm9sLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5hY3RpdmVDb250cm9sLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVDb250cm9sLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluYWN0aXZlQ29udHJvbC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgLy9kb2N0b3IgaXNhY3RpdmUvaW5hY3RpdmUgcmFkaW8gY29udHJvbHNcclxuICAgICAgICAgICAgICAvL3NldCBjb250cm9scyBkZXBlbmRpbmcgdXAgdGhlIGRhdGFcclxuICAgICAgICAgICAgICAvL3RoaXMuYWN0aXZlQ29udHJvbCA9ICQoJyNkYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgY29udHJvbGxlci5pbml0KCk7XHJcblxyXG4gICAgfSgpKTtcclxuXHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
