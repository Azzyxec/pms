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

$(document).ready(function(){

    //defining the helper functions in global

    $(function(){

      console.log('Doctor Dashboard js loaded');

          //top level controller
      var controller = {
        init: function(){
          //wiring the navigation
          this.logoutUrl = "index.php/logout";
          this.doctorProfile = "index.php/doctorProfile";
          this.dashboardHomeUrl = "index.php/doctorDashboard";
          this.newAppointmentUrl = "index.php/bookAppointment";
          this.patientsEntryUrl = "index.php/patientsEntry";
          this.patientsListingUrl = "index.php/patientsListing";
          this.closeAppointmentUrl = "index.php/closeAppointment";
          this.doctorsAppointmentsListUrl = "index.php/listAppointment";

          this.newScheduleUrl = "index.php/newSchedule";
          this.listScheduleUrl = "index.php/scheduleList";
          this.addStaffUrl = "index.php/staffEntry";
          this.patientsHistoryUrl = "index.php/patientHistory";

          this.createProgramForPatientUrl = "index.php/createMedicalProgram";
          this.programmeListingsUrl = "index.php/programmeList";

          this.ManageLocationsUrl = "index.php/workLocationManagement";

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
        this.doctorUrl =  "index.php/saveUpdateDoctor";
        this.doctorDetailsUrl =  "index.php/getDoctorDetails";
        this.loginCheckUrl = "index.php/isLoggedIn";
        this.doctorDashUrl = "index.php/doctorDashboard";
        this.logoutUrl = "index.php/logout";
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvY3RvckRhc2hib2FyZC5qcyIsInJlZ2lzdHJhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJkb2N0b3IucHJvZmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vaGVscGVyIGZ1bmN0aW9uIHRvIGdldCB0aGUgdXJsIHF1ZXJ5IHBhcmFtZXRlcnNcclxudmFyIHV0aWxpdHkgPSB7XHJcbiAgZ2V0VVJMUGFyYW06IGZ1bmN0aW9uKG5hbWUpe1xyXG4gICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xyXG5cclxuICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoL1tcXFtcXF1dL2csIFwiXFxcXCQmXCIpO1xyXG5cclxuICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAoXCJbPyZdXCIgKyBuYW1lICsgXCIoPShbXiYjXSopfCZ8I3wkKVwiKTtcclxuICAgIHZhciByZXN1bHRzID0gcmVnZXguZXhlYyh1cmwpO1xyXG5cclxuICAgIGlmICghcmVzdWx0cykgcmV0dXJuIG51bGw7XHJcbiAgICBpZiAoIXJlc3VsdHNbMl0pIHJldHVybiAnJztcclxuXHJcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHJlc3VsdHNbMl0ucmVwbGFjZSgvXFwrL2csIFwiIFwiKSk7XHJcbiAgfSxcclxuICBnZXRUaW1lTWludXRlc0FycmF5OiAgZnVuY3Rpb24oKXtcclxuICAgIFxyXG4gIH1cclxufVxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuXHJcbiAgICAvL2RlZmluaW5nIHRoZSBoZWxwZXIgZnVuY3Rpb25zIGluIGdsb2JhbFxyXG5cclxuICAgICQoZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKCdEb2N0b3IgRGFzaGJvYXJkIGpzIGxvYWRlZCcpO1xyXG5cclxuICAgICAgICAgIC8vdG9wIGxldmVsIGNvbnRyb2xsZXJcclxuICAgICAgdmFyIGNvbnRyb2xsZXIgPSB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgIC8vd2lyaW5nIHRoZSBuYXZpZ2F0aW9uXHJcbiAgICAgICAgICB0aGlzLmxvZ291dFVybCA9IFwiaW5kZXgucGhwL2xvZ291dFwiO1xyXG4gICAgICAgICAgdGhpcy5kb2N0b3JQcm9maWxlID0gXCJpbmRleC5waHAvZG9jdG9yUHJvZmlsZVwiO1xyXG4gICAgICAgICAgdGhpcy5kYXNoYm9hcmRIb21lVXJsID0gXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkXCI7XHJcbiAgICAgICAgICB0aGlzLm5ld0FwcG9pbnRtZW50VXJsID0gXCJpbmRleC5waHAvYm9va0FwcG9pbnRtZW50XCI7XHJcbiAgICAgICAgICB0aGlzLnBhdGllbnRzRW50cnlVcmwgPSBcImluZGV4LnBocC9wYXRpZW50c0VudHJ5XCI7XHJcbiAgICAgICAgICB0aGlzLnBhdGllbnRzTGlzdGluZ1VybCA9IFwiaW5kZXgucGhwL3BhdGllbnRzTGlzdGluZ1wiO1xyXG4gICAgICAgICAgdGhpcy5jbG9zZUFwcG9pbnRtZW50VXJsID0gXCJpbmRleC5waHAvY2xvc2VBcHBvaW50bWVudFwiO1xyXG4gICAgICAgICAgdGhpcy5kb2N0b3JzQXBwb2ludG1lbnRzTGlzdFVybCA9IFwiaW5kZXgucGhwL2xpc3RBcHBvaW50bWVudFwiO1xyXG5cclxuICAgICAgICAgIHRoaXMubmV3U2NoZWR1bGVVcmwgPSBcImluZGV4LnBocC9uZXdTY2hlZHVsZVwiO1xyXG4gICAgICAgICAgdGhpcy5saXN0U2NoZWR1bGVVcmwgPSBcImluZGV4LnBocC9zY2hlZHVsZUxpc3RcIjtcclxuICAgICAgICAgIHRoaXMuYWRkU3RhZmZVcmwgPSBcImluZGV4LnBocC9zdGFmZkVudHJ5XCI7XHJcbiAgICAgICAgICB0aGlzLnBhdGllbnRzSGlzdG9yeVVybCA9IFwiaW5kZXgucGhwL3BhdGllbnRIaXN0b3J5XCI7XHJcblxyXG4gICAgICAgICAgdGhpcy5jcmVhdGVQcm9ncmFtRm9yUGF0aWVudFVybCA9IFwiaW5kZXgucGhwL2NyZWF0ZU1lZGljYWxQcm9ncmFtXCI7XHJcbiAgICAgICAgICB0aGlzLnByb2dyYW1tZUxpc3RpbmdzVXJsID0gXCJpbmRleC5waHAvcHJvZ3JhbW1lTGlzdFwiO1xyXG5cclxuICAgICAgICAgIHRoaXMuTWFuYWdlTG9jYXRpb25zVXJsID0gXCJpbmRleC5waHAvd29ya0xvY2F0aW9uTWFuYWdlbWVudFwiO1xyXG5cclxuICAgICAgICAgIC8vZG8gc29tZXRobmcgYWJvdXQgZG9jdG9ycyBpbmZvIGFuZCByZWdpc3RyYXRpb25cclxuXHJcbiAgICAgICAgICAvL1RoZSB1cmwgZnJvbSB0aGUgYnJvd3NlciAgY2FuIGJlIGNvbXBhcmVkIHRvIHNldCB0aGUgYWN0aXZlIG5hdmlnYXRpb25cclxuICAgICAgICAgIG5hdlZpZXcuaW5pdCgpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICB2YXIgbmF2VmlldyA9IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgIC8vd2lyaW5nIHRoZSBuYXZpZ2F0aW9uIGNsaWNrc1xyXG5cclxuXHJcbiAgICAgICAgICAkKFwiI3Btcy1icmFuZC1idG4tbGlua1wiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1BNUyBicmFuZCBjbGljaycpO1xyXG5cclxuICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgJChcIiNidG4tcHJvZ3JhbW1lLXNlY3Rpb24tbGlua1wiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJChcIiNjcmVhdGUtcHJvZ3JhbS1mb3ItcGF0aWVudC1zZWN0aW9uXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NyZWF0ZSBwcm9ncmFtIGZvciBwYXRpZW50Jyk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5jcmVhdGVQcm9ncmFtRm9yUGF0aWVudFVybDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKFwiI2J0bi1tYW5hZ2UtbG9jYXRpb25zXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ21hbmFnZSBsb2NhdGlvbnMnKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLk1hbmFnZUxvY2F0aW9uc1VybDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoXCIjYnRuLWxpc3QtcHJvZ3JhbS1zZWN0aW9uXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIucHJvZ3JhbW1lTGlzdGluZ3NVcmw7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKFwiI3BhdGllbnRzLWVudHJ5LWNyZWF0ZS1zZWN0aW9uLWxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygncGF0aWVudHMgRW50cnljbGljaycpO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5wYXRpZW50c0VudHJ5VXJsO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI3BhdGllbnRzLWVudHJ5LWxpc3Qtc2VjdGlvbi1saW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncGF0aWVudHMgbGlzdGluZyBjbGljaycpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIucGF0aWVudHNMaXN0aW5nVXJsO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiN1c2VyLVByb2ZpbGUtQnRuLUxpbmtcIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd1c2VyIHByb2ZpbGUgY2xpY2snKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuZG9jdG9yUHJvZmlsZTtcclxuXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI2RvY3Rvci1kYXNoLWxvZ291dC1idG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvZ291dCBjbGljaycpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIubG9nb3V0VXJsO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiNkYXNoYm9hcmQtU2VjdGlvbi1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5kYXNoYm9hcmRIb21lVXJsO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkYXNoYm9hcmQgY2xpY2snKTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICQoXCIjYm9vay1BcHBvaW50bWVudHMtU2VjdGlvbi1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5uZXdBcHBvaW50bWVudFVybDtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICQoXCIjY2xvc2UtQm9vay1BcHBvaW50bWVudC1TZWN0aW9uLUxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmNsb3NlQXBwb2ludG1lbnRVcmw7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI3ZpZXctQXBwb2ludG1lbnQtU2VjdGlvbi1MaW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5kb2N0b3JzQXBwb2ludG1lbnRzTGlzdFVybDtcclxuICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAkKFwiI21hbmFnZS1Eb2N0b3JzLVNjaGVkdWxlLVNlY3Rpb24tTGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzY2hlZHVsZSBjbGljaycpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiNtYW5hZ2Utc2NoZWR1bGUtY3JlYXRlLXNlY3Rpb24tbGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCduZXcgc2NoZWR1bGUgY2xpY2snKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIubmV3U2NoZWR1bGVVcmw7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI21hbmFnZS1zY2hlZHVsZS1saXN0LXNlY3Rpb24tbGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzY2hlZHVsZSBsaXN0IGNsaWNrJyk7XHJcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmxpc3RTY2hlZHVsZVVybDtcclxuICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgJChcIiNhZGQtU3RhZmYtU2VjdGlvbi1MaW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuYWRkU3RhZmZVcmw7XHJcbiAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICQoXCIjYnRuLXN0YWZmLWxpc3RpbmdcIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAkKFwiI3BhdGllbnRzLUhpc3RvcnktU2VjdGlvbi1MaW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIucGF0aWVudHNIaXN0b3J5VXJsO1xyXG4gICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKXtcclxuICAgICAgICAgIC8vaGlnaGxpZ2h0IHRoZSByaWdodCBuYXZpZ2F0aW9uXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgY29udHJvbGxlci5pbml0KCk7XHJcblxyXG4gIH0oKSk7XHJcblxyXG59KTtcclxuIiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuICBjb25zb2xlLmxvZygnZG9jdG9yIHJlZ2lzdHJhdGlvbiBpbiAnKTtcclxuXHJcbiAgdmFyIGRvY3Rvck1vZGVsID0ge1xyXG4gICAgIGlkOjAsXHJcbiAgICAgbmFtZTpcIlwiLFxyXG4gICAgIGNvbnRhY3Q6XCJcIixcclxuICAgICBhbHRlcm5hdGVDb250YWN0OiBcIlwiLFxyXG4gICAgIGVtYWlsOiBcIlwiLFxyXG4gICAgIHF1YWxpZmljYXRpb25zOiBcIlwiLFxyXG4gICAgIGFkZHJlc3M6XCJcIixcclxuICAgICByZWNvdmVyeUNvbnRhY3Q6XCJcIixcclxuICAgICByZWNvdmVyeUVtYWlsOlwiXCIsXHJcbiAgICAgdXNlck5hbWU6XCJcIixcclxuICAgICBwYXNzd29yZDpcIlwiLFxyXG4gICAgIGlzQWN0aXZlOjBcclxuICB9O1xyXG5cclxuICB2YXIgY29udHJvbGxlciA9IHtcclxuICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmRvY3RvclVybCA9ICBcImluZGV4LnBocC9zYXZlVXBkYXRlRG9jdG9yXCI7XHJcbiAgICAgICAgdGhpcy5kb2N0b3JEZXRhaWxzVXJsID0gIFwiaW5kZXgucGhwL2dldERvY3RvckRldGFpbHNcIjtcclxuICAgICAgICB0aGlzLmxvZ2luQ2hlY2tVcmwgPSBcImluZGV4LnBocC9pc0xvZ2dlZEluXCI7XHJcbiAgICAgICAgdGhpcy5kb2N0b3JEYXNoVXJsID0gXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkXCI7XHJcbiAgICAgICAgdGhpcy5sb2dvdXRVcmwgPSBcImluZGV4LnBocC9sb2dvdXRcIjtcclxuICAgICAgICBmb3JtVmlldy5pbml0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0RG9jdG9ySW5mbygpO1xyXG4gICAgICAgIC8vaWYgdGhlIGRvY3RvciBpcyBsb2dnZWQgaW4gdGhlbiBmaWxsIHRoZSBmb3JtIHdpdGggdGhlIGRvY3RvcnMgZGF0YVxyXG5cclxuICAgICAgfSxcclxuICAgICAgZ2V0TW9kZWw6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIGRvY3Rvck1vZGVsO1xyXG4gICAgICB9LFxyXG4gICAgICBnZXREb2N0b3JJbmZvOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICQucG9zdCggY29udHJvbGxlci5sb2dpbkNoZWNrVXJsICwge30pXHJcbiAgICAgICAgIC5kb25lKGZ1bmN0aW9uKCByZXNwb25zZSApIHtcclxuICAgICAgICAgICBjb25zb2xlLmxvZyhcImxvZ2luIGNoZWNrOiBcIiArIEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSk7XHJcblxyXG4gICAgICAgICAgIGlmKHJlc3BvbnNlLmRhdGEudHlwZSA9PSBcIkRcIil7XHJcbiAgICAgICAgICAgICBjb250cm9sbGVyLnVwZGF0ZU1vZGVsRnJvbVNlcnZlcihyZXNwb25zZS5kYXRhLmlkKTtcclxuICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICB9KTtcclxuXHJcbiAgICAgIH0sXHJcbiAgICAgIHVwZGF0ZU1vZGVsRnJvbVNlcnZlcjogZnVuY3Rpb24oZG9jdG9ySWQpe1xyXG4gICAgICAgICQuZ2V0KCBjb250cm9sbGVyLmRvY3RvckRldGFpbHNVcmwgLCB7aWQ6IGRvY3RvcklkfSlcclxuICAgICAgICAgLmRvbmUoZnVuY3Rpb24oIHJlc3BvbnNlICkge1xyXG4gICAgICAgICAgIGNvbnNvbGUubG9nKFwidXBkYXRlSW5mb0Zyb21TZXJ2ZXI6IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcclxuXHJcbiAgICAgICAgICAgdmFyIGRvY3RvciAgPSByZXNwb25zZS5kYXRhO1xyXG5cclxuICAgICAgICAgICBkb2N0b3JNb2RlbC5pZCA9IGRvY3Rvci5pZDtcclxuICAgICAgICAgICBkb2N0b3JNb2RlbC5uYW1lID0gZG9jdG9yLm5hbWU7XHJcbiAgICAgICAgICAgZG9jdG9yTW9kZWwuY29udGFjdCA9IGRvY3Rvci5jb250YWN0O1xyXG4gICAgICAgICAgIGRvY3Rvck1vZGVsLmFsdGVybmF0ZUNvbnRhY3QgPSBkb2N0b3IuYWx0ZXJuYXRlQ29udGFjdDtcclxuICAgICAgICAgICBkb2N0b3JNb2RlbC5lbWFpbCA9IGRvY3Rvci5lbWFpbDtcclxuICAgICAgICAgICBkb2N0b3JNb2RlbC5xdWFsaWZpY2F0aW9ucyA9IGRvY3Rvci5xdWFsaWZpY2F0aW9ucztcclxuICAgICAgICAgICBkb2N0b3JNb2RlbC5hZGRyZXNzID0gZG9jdG9yLmFkZHJlc3M7XHJcbiAgICAgICAgICAgZG9jdG9yTW9kZWwudXNlck5hbWUgPSBkb2N0b3IudXNlck5hbWU7XHJcbiAgICAgICAgICAgZG9jdG9yTW9kZWwucGFzc3dvcmQgPSBkb2N0b3IucGFzc3dvcmQ7XHJcbiAgICAgICAgICAgZG9jdG9yTW9kZWwucmVjb3ZlcnlDb250YWN0ID0gZG9jdG9yLnJlY292ZXJ5Q29udGFjdDtcclxuICAgICAgICAgICBkb2N0b3JNb2RlbC5yZWNvdmVyeUVtYWlsID0gZG9jdG9yLnJlY292ZXJ5RW1haWw7XHJcbiAgICAgICAgICAgZG9jdG9yTW9kZWwuaXNBY3RpdmUgPSBkb2N0b3IuaXNBY3RpdmU7XHJcblxyXG4gICAgICAgICAgIGZvcm1WaWV3LnJlbmRlcigpO1xyXG5cclxuICAgICAgICAgfSk7XHJcblxyXG4gICAgICB9LFxyXG4gICAgICB1cGRhdGVNb2RlbEZyb21WaWV3OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGRvY3Rvck1vZGVsLmlkID0gZm9ybVZpZXcuaWRDb250cm9sLnZhbCgpO1xyXG4gICAgICAgIGRvY3Rvck1vZGVsLm5hbWUgPSBmb3JtVmlldy5uYW1lQ29udHJvbC52YWwoKTtcclxuICAgICAgICBkb2N0b3JNb2RlbC5jb250YWN0ID0gZm9ybVZpZXcuY29udGFjdENvbnRyb2wudmFsKCk7XHJcbiAgICAgICAgZG9jdG9yTW9kZWwuYWx0ZXJuYXRlQ29udGFjdCA9IGZvcm1WaWV3LmFsdGVybmF0Q29udGFjdENvbnRyb2wudmFsKCk7XHJcbiAgICAgICAgZG9jdG9yTW9kZWwuZW1haWwgPSBmb3JtVmlldy5lbWFpbENvbnRyb2wudmFsKCk7XHJcbiAgICAgICAgZG9jdG9yTW9kZWwucXVhbGlmaWNhdGlvbnMgPSBmb3JtVmlldy5xdWFsaWZpY2F0aW9uQ29udHJvbC52YWwoKTtcclxuICAgICAgICBkb2N0b3JNb2RlbC5hZGRyZXNzID0gZm9ybVZpZXcuYWRkcmVzc0NvbnRyb2wudmFsKCk7XHJcbiAgICAgICAgZG9jdG9yTW9kZWwudXNlck5hbWUgPSBmb3JtVmlldy51c2VyTmFtZUNvbnRyb2wudmFsKCk7XHJcbiAgICAgICAgZG9jdG9yTW9kZWwucGFzc3dvcmQgPSBmb3JtVmlldy5wYXNzd29yZENvbnRyb2wudmFsKCk7XHJcbiAgICAgICAgZG9jdG9yTW9kZWwucmVjb3ZlcnlDb250YWN0ID0gZm9ybVZpZXcucmVjb3ZlcnlDb250YWN0Q29udHJvbC52YWwoKTtcclxuICAgICAgICBkb2N0b3JNb2RlbC5yZWNvdmVyeUVtYWlsID0gZm9ybVZpZXcucmVjb3ZlcnlFbWFpbENvbnRyb2wudmFsKCk7XHJcblxyXG5cclxuICAgICAgICBpZihmb3JtVmlldy5hY3RpdmVDb250cm9sLmlzKFwiOmNoZWNrZWRcIikpe1xyXG4gICAgICAgICAgZG9jdG9yTW9kZWwuaXNBY3RpdmUgPSAxO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgZG9jdG9yTW9kZWwuaXNBY3RpdmUgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRvY3Rvck1vZGVsO1xyXG4gICAgICB9LFxyXG4gICAgICBzYXZlRG9jdG9yQW5kUmVkaXJlY3Q6IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICQucG9zdCggY29udHJvbGxlci5kb2N0b3JVcmwgLCBkb2N0b3JNb2RlbClcclxuICAgICAgICAgLmRvbmUoZnVuY3Rpb24oIHJlc3BvbnNlICkge1xyXG4gICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXNwb25zZSAnICsgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcclxuXHJcblxyXG4gICAgICAgICAgIGlmKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09IFwiLTFcIil7XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZygnUGxlYXNlIHNlbGVjdCBhbm90aGVyIGxvZ2luIElkJyk7XHJcbiAgICAgICAgICAgfWVsc2UgaWYocmVzcG9uc2UuZGF0YS51c2VyLnR5cGUgPT0gXCJEXCIpe1xyXG4gICAgICAgICAgICAgY29uc29sZS5sb2coJ3NhdmVkIHN1Y2Nlc3NmdWxseSwgbm93IHlvdSB3aWxsIHJlY2VpdmUgYSBjb25maXJtYXRpb24gZW1haWwsIHRoZW4geW91IGNhbiBsb2dpbicpO1xyXG4gICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmxvZ291dFVybDtcclxuICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICAvKmdldFVSTFBhcmFtOiBmdW5jdGlvbihuYW1lOiBzdHJpbmcpe1xyXG5cclxuICAgICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xyXG5cclxuICAgICAgbmFtZSA9IG5hbWUucmVwbGFjZSgvW1xcW1xcXV0vZywgXCJcXFxcJCZcIik7XHJcblxyXG4gICAgICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKFwiWz8mXVwiICsgbmFtZSArIFwiKD0oW14mI10qKXwmfCN8JClcIik7XHJcbiAgICAgIHZhciByZXN1bHRzID0gcmVnZXguZXhlYyh1cmwpO1xyXG5cclxuICAgICAgaWYgKCFyZXN1bHRzKSByZXR1cm4gbnVsbDtcclxuICAgICAgaWYgKCFyZXN1bHRzWzJdKSByZXR1cm4gJyc7XHJcblxyXG4gICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHJlc3VsdHNbMl0ucmVwbGFjZSgvXFwrL2csIFwiIFwiKSk7XHJcblxyXG4gICAgfSovXHJcbiAgfTtcclxuXHJcblxyXG4gIHZhciBmb3JtVmlldyA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdmb3JtIHZpZXcgaW50aScpO1xyXG5cclxuICAgICAgdGhpcy5pZENvbnRyb2wgPSAkKCcjZGlkJyk7XHJcbiAgICAgIHRoaXMubmFtZUNvbnRyb2wgPSAkKCcjZG5hbWUnKTtcclxuICAgICAgdGhpcy5jb250YWN0Q29udHJvbCA9ICQoJyNkY29udGFjdCcpO1xyXG4gICAgICB0aGlzLmFsdGVybmF0Q29udGFjdENvbnRyb2wgPSAkKCcjZGFsdGVybmF0ZS1jb250YWN0Jyk7XHJcbiAgICAgIHRoaXMuZW1haWxDb250cm9sID0gJCgnI2RlbWFpbCcpO1xyXG4gICAgICB0aGlzLnF1YWxpZmljYXRpb25Db250cm9sID0gJCgnI2RxdWFsaWZpY2F0aW9ucycpO1xyXG4gICAgICB0aGlzLmFkZHJlc3NDb250cm9sID0gJCgnI2RhZGRyZXNzJyk7XHJcbiAgICAgIHRoaXMudXNlck5hbWVDb250cm9sID0gJCgnI2R1c2VyLW5hbWUnKTtcclxuICAgICAgdGhpcy5wYXNzd29yZENvbnRyb2wgPSAkKCcjZHBhc3N3b3JkJyk7XHJcbiAgICAgIHRoaXMucmVjb3ZlcnlDb250YWN0Q29udHJvbCA9ICQoJyNkcmVjb3ZlcnktY29udGFjdCcpO1xyXG4gICAgICB0aGlzLnJlY292ZXJ5RW1haWxDb250cm9sID0gJCgnI2RyZWNvdmVyeS1lbWFpbCcpO1xyXG4gICAgICAvL2RvY3RvciBpc2FjdGl2ZS9pbmFjdGl2ZSByYWRpbyBjb250cm9sc1xyXG4gICAgICB0aGlzLmFjdGl2ZUNvbnRyb2wgPSAkKCcjZGFjdGl2ZScpO1xyXG4gICAgICB0aGlzLmluYWN0aXZlQ29udHJvbCA9ICQoJyNkaW5hY3RpdmUnKTtcclxuXHJcbiAgICAgIC8vY29udHJvbHMgYXJlIHBhc3NlZCwgc28gdGhhdCB0aGV5IGFyZSBhdmFpbGFibGUgdG8gY2xpY2sgZnVuY3Rpb24gYXMgY2xvc3VyZSB2YXJpYWJsZXNcclxuICAgICAgLypcclxuICAgICAgdGhpcy5jb250cm9scyA9IHsgaWRDb250cm9sOiB0aGlzLmlkQ29udHJvbCxcclxuICAgICAgICAgICAgICAgICAgICAgIG5hbWVDb250cm9sOiB0aGlzLm5hbWVDb250cm9sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgY29udGFjdENvbnRyb2w6IHRoaXMuY29udGFjdENvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICBhbHRlcm5hdENvbnRhY3RDb250cm9sOiB0aGlzLmFsdGVybmF0Q29udGFjdENvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICBlbWFpbENvbnRyb2w6IHRoaXMuZW1haWxDb250cm9sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgcXVhbGlmaWNhdGlvbkNvbnRyb2w6IHRoaXMucXVhbGlmaWNhdGlvbkNvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICBhZGRyZXNzQ29udHJvbDogdGhpcy5hZGRyZXNzQ29udHJvbCxcclxuICAgICAgICAgICAgICAgICAgICAgIHVzZXJOYW1lQ29udHJvbDogdGhpcy51c2VyTmFtZUNvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICBwYXNzd29yZENvbnRyb2w6IHRoaXMucGFzc3dvcmRDb250cm9sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgYWN0aXZlQ29udHJvbDogdGhpcy5hY3RpdmVDb250cm9sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgLy9pbmFjdGl2ZUNvbnRyb2w6IHRoaXMuaW5hY3RpdmVDb250cm9sXHJcbiAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgLy93aXJpbmcgZXZlbnRzXHJcblxyXG5cclxuICAgICAgJCgnI2J0bi1kb2MtcmVnLXN1bWl0Jykub24oJ2NsaWNrJywgKGZ1bmN0aW9uKGNvbnRyb2xsZXIpe1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2hhbmRsZXIgYWRkZWQgOiAnICsgY2F0LklkKTtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgICAgICAgIC8vY29uc29sZS5sb2coJ2hhbmRsZXIgZXhlYyA6ICcgKyBjYXQuSWQpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ2RvY3RvciByZWcgY2xpY2sgc3VibWl0Jyk7XHJcbiAgICAgICAgICAvL3N0ZXBzIGluIHNhdmVkXHJcbiAgICAgICAgICAvL3VwZGF0ZSBtb2RlIHdpdGggaW5mbyBmcm9tIHRoZSB2aWV3XHJcbiAgICAgICAgICAvL3BlcnNpc3QgdGhlIG1vZGVsIGkuZSBzYXZlIHVwZGF0ZVxyXG5cclxuICAgICAgICAgIC8vdXBkYXRlcyB0aGUgbW9kZWwgd2l0aCBpbmZvIGZyb20gdGhlIHZpZXdcclxuICAgICAgICAgIGNvbnRyb2xsZXIudXBkYXRlTW9kZWxGcm9tVmlldygpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ21vZGVsIHZhbHVlJyArIEpTT04uc3RyaW5naWZ5KGRvY3Rvck1vZGVsKSApO1xyXG4gICAgICAgICAgY29udHJvbGxlci5zYXZlRG9jdG9yQW5kUmVkaXJlY3QoKTtcclxuICAgICAgICB9O1xyXG4gICAgICB9KShjb250cm9sbGVyKSk7IC8vc3VibWl0IGNsaWNrIGhhbmRsZXJcclxuXHJcblxyXG4gICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfSxcclxuICAgIGdldENvbnRyb2xzOiBmdW5jdGlvbigpe1xyXG4gICAgICByZXR1cm4gdGhpcy5jb250cm9scztcclxuICAgIH0sXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgdmFyIG1vZGVsID0gY29udHJvbGxlci5nZXRNb2RlbCgpO1xyXG5cclxuICAgICAgdGhpcy5pZENvbnRyb2wudmFsKG1vZGVsLmlkKTtcclxuICAgICAgdGhpcy5uYW1lQ29udHJvbC52YWwobW9kZWwubmFtZSk7XHJcbiAgICAgIHRoaXMuY29udGFjdENvbnRyb2wudmFsKG1vZGVsLmNvbnRhY3QpO1xyXG4gICAgICB0aGlzLmFsdGVybmF0Q29udGFjdENvbnRyb2wudmFsKG1vZGVsLmFsdGVybmF0ZUNvbnRhY3QpO1xyXG4gICAgICB0aGlzLmVtYWlsQ29udHJvbC52YWwobW9kZWwuZW1haWwpO1xyXG4gICAgICB0aGlzLnF1YWxpZmljYXRpb25Db250cm9sLnZhbChtb2RlbC5xdWFsaWZpY2F0aW9ucyk7XHJcbiAgICAgIHRoaXMuYWRkcmVzc0NvbnRyb2wudmFsKG1vZGVsLmFkZHJlc3MpO1xyXG4gICAgICB0aGlzLnVzZXJOYW1lQ29udHJvbC52YWwobW9kZWwudXNlck5hbWUpO1xyXG4gICAgICB0aGlzLnBhc3N3b3JkQ29udHJvbC52YWwobW9kZWwucGFzc3dvcmQpO1xyXG4gICAgICB0aGlzLnJlY292ZXJ5Q29udGFjdENvbnRyb2wudmFsKG1vZGVsLnJlY292ZXJ5Q29udGFjdCk7XHJcbiAgICAgIHRoaXMucmVjb3ZlcnlFbWFpbENvbnRyb2wudmFsKG1vZGVsLnJlY292ZXJ5RW1haWwpO1xyXG5cclxuXHJcbiAgICAgIGlmKG1vZGVsLmlzQWN0aXZlID09IDEpe1xyXG4gICAgICAgIHRoaXMuYWN0aXZlQ29udHJvbC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5pbmFjdGl2ZUNvbnRyb2wucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgfSBlbHNle1xyXG4gICAgICAgIHRoaXMuYWN0aXZlQ29udHJvbC5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuaW5hY3RpdmVDb250cm9sLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vZG9jdG9yIGlzYWN0aXZlL2luYWN0aXZlIHJhZGlvIGNvbnRyb2xzXHJcbiAgICAgIC8vc2V0IGNvbnRyb2xzIGRlcGVuZGluZyB1cCB0aGUgZGF0YVxyXG4gICAgICAvL3RoaXMuYWN0aXZlQ29udHJvbCA9ICQoJyNkYWN0aXZlJyk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29udHJvbGxlci5pbml0KCk7XHJcblxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
