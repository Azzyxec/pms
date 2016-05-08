$(document).ready(function(){

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
          this.closeAppointmentUrl = "index.php/closeAppointment";
          this.doctorsAppointmentsListUrl = "index.php/listAppointment";
          this.createProgramForPatientUrl = "index.php/createProgramForPatient";
          this.newScheduleUrl = "index.php/newSchedule";
          this.listScheduleUrl = "index.php/scheduleList";
          this.addStaffUrl = "index.php/staffEntry";
          this.patientsHistoryUrl = "index.php/patientHistory";
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

            $("#create-program-for-patient-section").click(function(e){
                    e.preventDefault();
            console.log('create program for patient');
            window.location.href = controller.createProgramForPatientUrl;
            });

            $("#patients-entry-create-section-link-Btn").click(function(e){
              e.preventDefault();
              console.log('patients Entryclick');
              window.location.href = controller.patientsEntryUrl;
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
     isActive:1
  };

  var controller = {
      init: function(){
        this.doctorUrl =  "index.php/saveUpdateDoctor";
        this.doctorDetailsUrl =  "index.php/getDoctorDetails";
        this.loginCheckUrl = "index.php/isLoggedIn";
        this.doctorDashUrl = "index.php/doctorDashboard";
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
             console.log('saved successfully');
             window.location.href = controller.doctorDashUrl;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvY3RvckRhc2hib2FyZC5qcyIsInJlZ2lzdHJhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJkb2N0b3IucHJvZmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgJChmdW5jdGlvbigpe1xyXG5cclxuICAgICAgY29uc29sZS5sb2coJ0RvY3RvciBEYXNoYm9hcmQganMgbG9hZGVkJyk7XHJcblxyXG4gICAgICAgICAgLy90b3AgbGV2ZWwgY29udHJvbGxlclxyXG4gICAgICB2YXIgY29udHJvbGxlciA9IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgLy93aXJpbmcgdGhlIG5hdmlnYXRpb25cclxuICAgICAgICAgIHRoaXMubG9nb3V0VXJsID0gXCJpbmRleC5waHAvbG9nb3V0XCI7XHJcbiAgICAgICAgICB0aGlzLmRvY3RvclByb2ZpbGUgPSBcImluZGV4LnBocC9kb2N0b3JQcm9maWxlXCI7XHJcbiAgICAgICAgICB0aGlzLmRhc2hib2FyZEhvbWVVcmwgPSBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmRcIjtcclxuICAgICAgICAgIHRoaXMubmV3QXBwb2ludG1lbnRVcmwgPSBcImluZGV4LnBocC9ib29rQXBwb2ludG1lbnRcIjtcclxuICAgICAgICAgIHRoaXMucGF0aWVudHNFbnRyeVVybCA9IFwiaW5kZXgucGhwL3BhdGllbnRzRW50cnlcIjtcclxuICAgICAgICAgIHRoaXMuY2xvc2VBcHBvaW50bWVudFVybCA9IFwiaW5kZXgucGhwL2Nsb3NlQXBwb2ludG1lbnRcIjtcclxuICAgICAgICAgIHRoaXMuZG9jdG9yc0FwcG9pbnRtZW50c0xpc3RVcmwgPSBcImluZGV4LnBocC9saXN0QXBwb2ludG1lbnRcIjtcclxuICAgICAgICAgIHRoaXMuY3JlYXRlUHJvZ3JhbUZvclBhdGllbnRVcmwgPSBcImluZGV4LnBocC9jcmVhdGVQcm9ncmFtRm9yUGF0aWVudFwiO1xyXG4gICAgICAgICAgdGhpcy5uZXdTY2hlZHVsZVVybCA9IFwiaW5kZXgucGhwL25ld1NjaGVkdWxlXCI7XHJcbiAgICAgICAgICB0aGlzLmxpc3RTY2hlZHVsZVVybCA9IFwiaW5kZXgucGhwL3NjaGVkdWxlTGlzdFwiO1xyXG4gICAgICAgICAgdGhpcy5hZGRTdGFmZlVybCA9IFwiaW5kZXgucGhwL3N0YWZmRW50cnlcIjtcclxuICAgICAgICAgIHRoaXMucGF0aWVudHNIaXN0b3J5VXJsID0gXCJpbmRleC5waHAvcGF0aWVudEhpc3RvcnlcIjtcclxuICAgICAgICAgIC8vZG8gc29tZXRobmcgYWJvdXQgZG9jdG9ycyBpbmZvIGFuZCByZWdpc3RyYXRpb25cclxuXHJcbiAgICAgICAgICAvL1RoZSB1cmwgZnJvbSB0aGUgYnJvd3NlciAgY2FuIGJlIGNvbXBhcmVkIHRvIHNldCB0aGUgYWN0aXZlIG5hdmlnYXRpb25cclxuICAgICAgICAgIG5hdlZpZXcuaW5pdCgpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICB2YXIgbmF2VmlldyA9IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgIC8vd2lyaW5nIHRoZSBuYXZpZ2F0aW9uIGNsaWNrc1xyXG5cclxuXHJcbiAgICAgICAgICAkKFwiI3Btcy1icmFuZC1idG4tbGlua1wiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1BNUyBicmFuZCBjbGljaycpO1xyXG5cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJChcIiNjcmVhdGUtcHJvZ3JhbS1mb3ItcGF0aWVudC1zZWN0aW9uXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NyZWF0ZSBwcm9ncmFtIGZvciBwYXRpZW50Jyk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5jcmVhdGVQcm9ncmFtRm9yUGF0aWVudFVybDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKFwiI3BhdGllbnRzLWVudHJ5LWNyZWF0ZS1zZWN0aW9uLWxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygncGF0aWVudHMgRW50cnljbGljaycpO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5wYXRpZW50c0VudHJ5VXJsO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI3VzZXItUHJvZmlsZS1CdG4tTGlua1wiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3VzZXIgcHJvZmlsZSBjbGljaycpO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5kb2N0b3JQcm9maWxlO1xyXG5cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICQoXCIjZG9jdG9yLWRhc2gtbG9nb3V0LWJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbG9nb3V0IGNsaWNrJyk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5sb2dvdXRVcmw7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI2Rhc2hib2FyZC1TZWN0aW9uLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmRhc2hib2FyZEhvbWVVcmw7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Rhc2hib2FyZCBjbGljaycpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiNib29rLUFwcG9pbnRtZW50cy1TZWN0aW9uLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLm5ld0FwcG9pbnRtZW50VXJsO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJChcIiNjbG9zZS1Cb29rLUFwcG9pbnRtZW50LVNlY3Rpb24tTGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuY2xvc2VBcHBvaW50bWVudFVybDtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICQoXCIjdmlldy1BcHBvaW50bWVudC1TZWN0aW9uLUxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmRvY3RvcnNBcHBvaW50bWVudHNMaXN0VXJsO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICQoXCIjbWFuYWdlLURvY3RvcnMtU2NoZWR1bGUtU2VjdGlvbi1MaW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NjaGVkdWxlIGNsaWNrJyk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKFwiI21hbmFnZS1zY2hlZHVsZS1jcmVhdGUtc2VjdGlvbi1saW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ25ldyBzY2hlZHVsZSBjbGljaycpO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5uZXdTY2hlZHVsZVVybDtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICQoXCIjbWFuYWdlLXNjaGVkdWxlLWxpc3Qtc2VjdGlvbi1saW5rLUJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NjaGVkdWxlIGxpc3QgY2xpY2snKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIubGlzdFNjaGVkdWxlVXJsO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAkKFwiI2FkZC1TdGFmZi1TZWN0aW9uLUxpbmstQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5hZGRTdGFmZlVybDtcclxuICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgJChcIiNwYXRpZW50cy1IaXN0b3J5LVNlY3Rpb24tTGluay1CdG5cIikuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLnBhdGllbnRzSGlzdG9yeVVybDtcclxuICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAvL2hpZ2hsaWdodCB0aGUgcmlnaHQgbmF2aWdhdGlvblxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgIGNvbnRyb2xsZXIuaW5pdCgpO1xyXG5cclxuICB9KCkpO1xyXG5cclxufSk7XHJcbiIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcbiAgY29uc29sZS5sb2coJ2RvY3RvciByZWdpc3RyYXRpb24gaW4gJyk7XHJcblxyXG4gIHZhciBkb2N0b3JNb2RlbCA9IHtcclxuICAgICBpZDowLFxyXG4gICAgIG5hbWU6XCJcIixcclxuICAgICBjb250YWN0OlwiXCIsXHJcbiAgICAgYWx0ZXJuYXRlQ29udGFjdDogXCJcIixcclxuICAgICBlbWFpbDogXCJcIixcclxuICAgICBxdWFsaWZpY2F0aW9uczogXCJcIixcclxuICAgICBhZGRyZXNzOlwiXCIsXHJcbiAgICAgcmVjb3ZlcnlDb250YWN0OlwiXCIsXHJcbiAgICAgcmVjb3ZlcnlFbWFpbDpcIlwiLFxyXG4gICAgIHVzZXJOYW1lOlwiXCIsXHJcbiAgICAgcGFzc3dvcmQ6XCJcIixcclxuICAgICBpc0FjdGl2ZToxXHJcbiAgfTtcclxuXHJcbiAgdmFyIGNvbnRyb2xsZXIgPSB7XHJcbiAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5kb2N0b3JVcmwgPSAgXCJpbmRleC5waHAvc2F2ZVVwZGF0ZURvY3RvclwiO1xyXG4gICAgICAgIHRoaXMuZG9jdG9yRGV0YWlsc1VybCA9ICBcImluZGV4LnBocC9nZXREb2N0b3JEZXRhaWxzXCI7XHJcbiAgICAgICAgdGhpcy5sb2dpbkNoZWNrVXJsID0gXCJpbmRleC5waHAvaXNMb2dnZWRJblwiO1xyXG4gICAgICAgIHRoaXMuZG9jdG9yRGFzaFVybCA9IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZFwiO1xyXG4gICAgICAgIGZvcm1WaWV3LmluaXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5nZXREb2N0b3JJbmZvKCk7XHJcbiAgICAgICAgLy9pZiB0aGUgZG9jdG9yIGlzIGxvZ2dlZCBpbiB0aGVuIGZpbGwgdGhlIGZvcm0gd2l0aCB0aGUgZG9jdG9ycyBkYXRhXHJcblxyXG4gICAgICB9LFxyXG4gICAgICBnZXRNb2RlbDogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gZG9jdG9yTW9kZWw7XHJcbiAgICAgIH0sXHJcbiAgICAgIGdldERvY3RvckluZm86IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJC5wb3N0KCBjb250cm9sbGVyLmxvZ2luQ2hlY2tVcmwgLCB7fSlcclxuICAgICAgICAgLmRvbmUoZnVuY3Rpb24oIHJlc3BvbnNlICkge1xyXG4gICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9naW4gY2hlY2s6IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcclxuXHJcbiAgICAgICAgICAgaWYocmVzcG9uc2UuZGF0YS50eXBlID09IFwiRFwiKXtcclxuICAgICAgICAgICAgIGNvbnRyb2xsZXIudXBkYXRlTW9kZWxGcm9tU2VydmVyKHJlc3BvbnNlLmRhdGEuaWQpO1xyXG4gICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIH0pO1xyXG5cclxuICAgICAgfSxcclxuICAgICAgdXBkYXRlTW9kZWxGcm9tU2VydmVyOiBmdW5jdGlvbihkb2N0b3JJZCl7XHJcbiAgICAgICAgJC5nZXQoIGNvbnRyb2xsZXIuZG9jdG9yRGV0YWlsc1VybCAsIHtpZDogZG9jdG9ySWR9KVxyXG4gICAgICAgICAuZG9uZShmdW5jdGlvbiggcmVzcG9uc2UgKSB7XHJcbiAgICAgICAgICAgY29uc29sZS5sb2coXCJ1cGRhdGVJbmZvRnJvbVNlcnZlcjogXCIgKyBKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xyXG5cclxuICAgICAgICAgICB2YXIgZG9jdG9yICA9IHJlc3BvbnNlLmRhdGE7XHJcblxyXG4gICAgICAgICAgIGRvY3Rvck1vZGVsLmlkID0gZG9jdG9yLmlkO1xyXG4gICAgICAgICAgIGRvY3Rvck1vZGVsLm5hbWUgPSBkb2N0b3IubmFtZTtcclxuICAgICAgICAgICBkb2N0b3JNb2RlbC5jb250YWN0ID0gZG9jdG9yLmNvbnRhY3Q7XHJcbiAgICAgICAgICAgZG9jdG9yTW9kZWwuYWx0ZXJuYXRlQ29udGFjdCA9IGRvY3Rvci5hbHRlcm5hdGVDb250YWN0O1xyXG4gICAgICAgICAgIGRvY3Rvck1vZGVsLmVtYWlsID0gZG9jdG9yLmVtYWlsO1xyXG4gICAgICAgICAgIGRvY3Rvck1vZGVsLnF1YWxpZmljYXRpb25zID0gZG9jdG9yLnF1YWxpZmljYXRpb25zO1xyXG4gICAgICAgICAgIGRvY3Rvck1vZGVsLmFkZHJlc3MgPSBkb2N0b3IuYWRkcmVzcztcclxuICAgICAgICAgICBkb2N0b3JNb2RlbC51c2VyTmFtZSA9IGRvY3Rvci51c2VyTmFtZTtcclxuICAgICAgICAgICBkb2N0b3JNb2RlbC5wYXNzd29yZCA9IGRvY3Rvci5wYXNzd29yZDtcclxuICAgICAgICAgICBkb2N0b3JNb2RlbC5yZWNvdmVyeUNvbnRhY3QgPSBkb2N0b3IucmVjb3ZlcnlDb250YWN0O1xyXG4gICAgICAgICAgIGRvY3Rvck1vZGVsLnJlY292ZXJ5RW1haWwgPSBkb2N0b3IucmVjb3ZlcnlFbWFpbDtcclxuICAgICAgICAgICBkb2N0b3JNb2RlbC5pc0FjdGl2ZSA9IGRvY3Rvci5pc0FjdGl2ZTtcclxuXHJcbiAgICAgICAgICAgZm9ybVZpZXcucmVuZGVyKCk7XHJcblxyXG4gICAgICAgICB9KTtcclxuXHJcbiAgICAgIH0sXHJcbiAgICAgIHVwZGF0ZU1vZGVsRnJvbVZpZXc6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgZG9jdG9yTW9kZWwuaWQgPSBmb3JtVmlldy5pZENvbnRyb2wudmFsKCk7XHJcbiAgICAgICAgZG9jdG9yTW9kZWwubmFtZSA9IGZvcm1WaWV3Lm5hbWVDb250cm9sLnZhbCgpO1xyXG4gICAgICAgIGRvY3Rvck1vZGVsLmNvbnRhY3QgPSBmb3JtVmlldy5jb250YWN0Q29udHJvbC52YWwoKTtcclxuICAgICAgICBkb2N0b3JNb2RlbC5hbHRlcm5hdGVDb250YWN0ID0gZm9ybVZpZXcuYWx0ZXJuYXRDb250YWN0Q29udHJvbC52YWwoKTtcclxuICAgICAgICBkb2N0b3JNb2RlbC5lbWFpbCA9IGZvcm1WaWV3LmVtYWlsQ29udHJvbC52YWwoKTtcclxuICAgICAgICBkb2N0b3JNb2RlbC5xdWFsaWZpY2F0aW9ucyA9IGZvcm1WaWV3LnF1YWxpZmljYXRpb25Db250cm9sLnZhbCgpO1xyXG4gICAgICAgIGRvY3Rvck1vZGVsLmFkZHJlc3MgPSBmb3JtVmlldy5hZGRyZXNzQ29udHJvbC52YWwoKTtcclxuICAgICAgICBkb2N0b3JNb2RlbC51c2VyTmFtZSA9IGZvcm1WaWV3LnVzZXJOYW1lQ29udHJvbC52YWwoKTtcclxuICAgICAgICBkb2N0b3JNb2RlbC5wYXNzd29yZCA9IGZvcm1WaWV3LnBhc3N3b3JkQ29udHJvbC52YWwoKTtcclxuICAgICAgICBkb2N0b3JNb2RlbC5yZWNvdmVyeUNvbnRhY3QgPSBmb3JtVmlldy5yZWNvdmVyeUNvbnRhY3RDb250cm9sLnZhbCgpO1xyXG4gICAgICAgIGRvY3Rvck1vZGVsLnJlY292ZXJ5RW1haWwgPSBmb3JtVmlldy5yZWNvdmVyeUVtYWlsQ29udHJvbC52YWwoKTtcclxuXHJcblxyXG4gICAgICAgIGlmKGZvcm1WaWV3LmFjdGl2ZUNvbnRyb2wuaXMoXCI6Y2hlY2tlZFwiKSl7XHJcbiAgICAgICAgICBkb2N0b3JNb2RlbC5pc0FjdGl2ZSA9IDE7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICBkb2N0b3JNb2RlbC5pc0FjdGl2ZSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZG9jdG9yTW9kZWw7XHJcbiAgICAgIH0sXHJcbiAgICAgIHNhdmVEb2N0b3JBbmRSZWRpcmVjdDogZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgJC5wb3N0KCBjb250cm9sbGVyLmRvY3RvclVybCAsIGRvY3Rvck1vZGVsKVxyXG4gICAgICAgICAuZG9uZShmdW5jdGlvbiggcmVzcG9uc2UgKSB7XHJcbiAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3BvbnNlICcgKyBKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xyXG5cclxuXHJcbiAgICAgICAgICAgaWYocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT0gXCItMVwiKXtcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQbGVhc2Ugc2VsZWN0IGFub3RoZXIgbG9naW4gSWQnKTtcclxuICAgICAgICAgICB9ZWxzZSBpZihyZXNwb25zZS5kYXRhLnVzZXIudHlwZSA9PSBcIkRcIil7XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2F2ZWQgc3VjY2Vzc2Z1bGx5Jyk7XHJcbiAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuZG9jdG9yRGFzaFVybDtcclxuICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICAvKmdldFVSTFBhcmFtOiBmdW5jdGlvbihuYW1lOiBzdHJpbmcpe1xyXG5cclxuICAgICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xyXG5cclxuICAgICAgbmFtZSA9IG5hbWUucmVwbGFjZSgvW1xcW1xcXV0vZywgXCJcXFxcJCZcIik7XHJcblxyXG4gICAgICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKFwiWz8mXVwiICsgbmFtZSArIFwiKD0oW14mI10qKXwmfCN8JClcIik7XHJcbiAgICAgIHZhciByZXN1bHRzID0gcmVnZXguZXhlYyh1cmwpO1xyXG5cclxuICAgICAgaWYgKCFyZXN1bHRzKSByZXR1cm4gbnVsbDtcclxuICAgICAgaWYgKCFyZXN1bHRzWzJdKSByZXR1cm4gJyc7XHJcblxyXG4gICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHJlc3VsdHNbMl0ucmVwbGFjZSgvXFwrL2csIFwiIFwiKSk7XHJcblxyXG4gICAgfSovXHJcbiAgfTtcclxuXHJcblxyXG4gIHZhciBmb3JtVmlldyA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdmb3JtIHZpZXcgaW50aScpO1xyXG5cclxuICAgICAgdGhpcy5pZENvbnRyb2wgPSAkKCcjZGlkJyk7XHJcbiAgICAgIHRoaXMubmFtZUNvbnRyb2wgPSAkKCcjZG5hbWUnKTtcclxuICAgICAgdGhpcy5jb250YWN0Q29udHJvbCA9ICQoJyNkY29udGFjdCcpO1xyXG4gICAgICB0aGlzLmFsdGVybmF0Q29udGFjdENvbnRyb2wgPSAkKCcjZGFsdGVybmF0ZS1jb250YWN0Jyk7XHJcbiAgICAgIHRoaXMuZW1haWxDb250cm9sID0gJCgnI2RlbWFpbCcpO1xyXG4gICAgICB0aGlzLnF1YWxpZmljYXRpb25Db250cm9sID0gJCgnI2RxdWFsaWZpY2F0aW9ucycpO1xyXG4gICAgICB0aGlzLmFkZHJlc3NDb250cm9sID0gJCgnI2RhZGRyZXNzJyk7XHJcbiAgICAgIHRoaXMudXNlck5hbWVDb250cm9sID0gJCgnI2R1c2VyLW5hbWUnKTtcclxuICAgICAgdGhpcy5wYXNzd29yZENvbnRyb2wgPSAkKCcjZHBhc3N3b3JkJyk7XHJcbiAgICAgIHRoaXMucmVjb3ZlcnlDb250YWN0Q29udHJvbCA9ICQoJyNkcmVjb3ZlcnktY29udGFjdCcpO1xyXG4gICAgICB0aGlzLnJlY292ZXJ5RW1haWxDb250cm9sID0gJCgnI2RyZWNvdmVyeS1lbWFpbCcpO1xyXG4gICAgICAvL2RvY3RvciBpc2FjdGl2ZS9pbmFjdGl2ZSByYWRpbyBjb250cm9sc1xyXG4gICAgICB0aGlzLmFjdGl2ZUNvbnRyb2wgPSAkKCcjZGFjdGl2ZScpO1xyXG4gICAgICB0aGlzLmluYWN0aXZlQ29udHJvbCA9ICQoJyNkaW5hY3RpdmUnKTtcclxuXHJcbiAgICAgIC8vY29udHJvbHMgYXJlIHBhc3NlZCwgc28gdGhhdCB0aGV5IGFyZSBhdmFpbGFibGUgdG8gY2xpY2sgZnVuY3Rpb24gYXMgY2xvc3VyZSB2YXJpYWJsZXNcclxuICAgICAgLypcclxuICAgICAgdGhpcy5jb250cm9scyA9IHsgaWRDb250cm9sOiB0aGlzLmlkQ29udHJvbCxcclxuICAgICAgICAgICAgICAgICAgICAgIG5hbWVDb250cm9sOiB0aGlzLm5hbWVDb250cm9sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgY29udGFjdENvbnRyb2w6IHRoaXMuY29udGFjdENvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICBhbHRlcm5hdENvbnRhY3RDb250cm9sOiB0aGlzLmFsdGVybmF0Q29udGFjdENvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICBlbWFpbENvbnRyb2w6IHRoaXMuZW1haWxDb250cm9sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgcXVhbGlmaWNhdGlvbkNvbnRyb2w6IHRoaXMucXVhbGlmaWNhdGlvbkNvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICBhZGRyZXNzQ29udHJvbDogdGhpcy5hZGRyZXNzQ29udHJvbCxcclxuICAgICAgICAgICAgICAgICAgICAgIHVzZXJOYW1lQ29udHJvbDogdGhpcy51c2VyTmFtZUNvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICBwYXNzd29yZENvbnRyb2w6IHRoaXMucGFzc3dvcmRDb250cm9sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgYWN0aXZlQ29udHJvbDogdGhpcy5hY3RpdmVDb250cm9sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgLy9pbmFjdGl2ZUNvbnRyb2w6IHRoaXMuaW5hY3RpdmVDb250cm9sXHJcbiAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgLy93aXJpbmcgZXZlbnRzXHJcblxyXG5cclxuICAgICAgJCgnI2J0bi1kb2MtcmVnLXN1bWl0Jykub24oJ2NsaWNrJywgKGZ1bmN0aW9uKGNvbnRyb2xsZXIpe1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2hhbmRsZXIgYWRkZWQgOiAnICsgY2F0LklkKTtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgICAgICAgIC8vY29uc29sZS5sb2coJ2hhbmRsZXIgZXhlYyA6ICcgKyBjYXQuSWQpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ2RvY3RvciByZWcgY2xpY2sgc3VibWl0Jyk7XHJcbiAgICAgICAgICAvL3N0ZXBzIGluIHNhdmVkXHJcbiAgICAgICAgICAvL3VwZGF0ZSBtb2RlIHdpdGggaW5mbyBmcm9tIHRoZSB2aWV3XHJcbiAgICAgICAgICAvL3BlcnNpc3QgdGhlIG1vZGVsIGkuZSBzYXZlIHVwZGF0ZVxyXG5cclxuICAgICAgICAgIC8vdXBkYXRlcyB0aGUgbW9kZWwgd2l0aCBpbmZvIGZyb20gdGhlIHZpZXdcclxuICAgICAgICAgIGNvbnRyb2xsZXIudXBkYXRlTW9kZWxGcm9tVmlldygpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ21vZGVsIHZhbHVlJyArIEpTT04uc3RyaW5naWZ5KGRvY3Rvck1vZGVsKSApO1xyXG4gICAgICAgICAgY29udHJvbGxlci5zYXZlRG9jdG9yQW5kUmVkaXJlY3QoKTtcclxuICAgICAgICB9O1xyXG4gICAgICB9KShjb250cm9sbGVyKSk7IC8vc3VibWl0IGNsaWNrIGhhbmRsZXJcclxuXHJcblxyXG4gICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfSxcclxuICAgIGdldENvbnRyb2xzOiBmdW5jdGlvbigpe1xyXG4gICAgICByZXR1cm4gdGhpcy5jb250cm9scztcclxuICAgIH0sXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgdmFyIG1vZGVsID0gY29udHJvbGxlci5nZXRNb2RlbCgpO1xyXG5cclxuICAgICAgdGhpcy5pZENvbnRyb2wudmFsKG1vZGVsLmlkKTtcclxuICAgICAgdGhpcy5uYW1lQ29udHJvbC52YWwobW9kZWwubmFtZSk7XHJcbiAgICAgIHRoaXMuY29udGFjdENvbnRyb2wudmFsKG1vZGVsLmNvbnRhY3QpO1xyXG4gICAgICB0aGlzLmFsdGVybmF0Q29udGFjdENvbnRyb2wudmFsKG1vZGVsLmFsdGVybmF0ZUNvbnRhY3QpO1xyXG4gICAgICB0aGlzLmVtYWlsQ29udHJvbC52YWwobW9kZWwuZW1haWwpO1xyXG4gICAgICB0aGlzLnF1YWxpZmljYXRpb25Db250cm9sLnZhbChtb2RlbC5xdWFsaWZpY2F0aW9ucyk7XHJcbiAgICAgIHRoaXMuYWRkcmVzc0NvbnRyb2wudmFsKG1vZGVsLmFkZHJlc3MpO1xyXG4gICAgICB0aGlzLnVzZXJOYW1lQ29udHJvbC52YWwobW9kZWwudXNlck5hbWUpO1xyXG4gICAgICB0aGlzLnBhc3N3b3JkQ29udHJvbC52YWwobW9kZWwucGFzc3dvcmQpO1xyXG4gICAgICB0aGlzLnJlY292ZXJ5Q29udGFjdENvbnRyb2wudmFsKG1vZGVsLnJlY292ZXJ5Q29udGFjdCk7XHJcbiAgICAgIHRoaXMucmVjb3ZlcnlFbWFpbENvbnRyb2wudmFsKG1vZGVsLnJlY292ZXJ5RW1haWwpO1xyXG5cclxuXHJcbiAgICAgIGlmKG1vZGVsLmlzQWN0aXZlID09IDEpe1xyXG4gICAgICAgIHRoaXMuYWN0aXZlQ29udHJvbC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5pbmFjdGl2ZUNvbnRyb2wucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgfSBlbHNle1xyXG4gICAgICAgIHRoaXMuYWN0aXZlQ29udHJvbC5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuaW5hY3RpdmVDb250cm9sLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vZG9jdG9yIGlzYWN0aXZlL2luYWN0aXZlIHJhZGlvIGNvbnRyb2xzXHJcbiAgICAgIC8vc2V0IGNvbnRyb2xzIGRlcGVuZGluZyB1cCB0aGUgZGF0YVxyXG4gICAgICAvL3RoaXMuYWN0aXZlQ29udHJvbCA9ICQoJyNkYWN0aXZlJyk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29udHJvbGxlci5pbml0KCk7XHJcblxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
