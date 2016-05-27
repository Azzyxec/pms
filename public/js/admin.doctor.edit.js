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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxpdHkuanMiLCJsaW5rcy5qcyIsImFkbWluRGFzaGJvYXJkLmpzIiwiYWRtaW4uZG9jdG9yLmVkaXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhZG1pbi5kb2N0b3IuZWRpdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vaGVscGVyIGZ1bmN0aW9uIHRvIGdldCB0aGUgdXJsIHF1ZXJ5IHBhcmFtZXRlcnNcclxudmFyIHV0aWxpdHkgPSB7XHJcbiAgZ2V0VVJMUGFyYW06IGZ1bmN0aW9uKG5hbWUpe1xyXG4gICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xyXG5cclxuICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoL1tcXFtcXF1dL2csIFwiXFxcXCQmXCIpO1xyXG5cclxuICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAoXCJbPyZdXCIgKyBuYW1lICsgXCIoPShbXiYjXSopfCZ8I3wkKVwiKTtcclxuICAgIHZhciByZXN1bHRzID0gcmVnZXguZXhlYyh1cmwpO1xyXG5cclxuICAgIGlmICghcmVzdWx0cykgcmV0dXJuIG51bGw7XHJcbiAgICBpZiAoIXJlc3VsdHNbMl0pIHJldHVybiAnJztcclxuXHJcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHJlc3VsdHNbMl0ucmVwbGFjZSgvXFwrL2csIFwiIFwiKSk7XHJcbiAgfSxcclxuICBnZXRUaW1lTWludXRlc0FycmF5OiAgZnVuY3Rpb24oKXtcclxuXHJcbiAgfVxyXG59XHJcbiIsInZhciBsaW5rcyA9IHtcclxuXHJcbiAgLy9sb2dpbiBqcyB1cmxzXHJcbiAgIGF1dGhlbnRpY2F0ZVVybCA6IFwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9hdXRoZW5pdGNhdGVVc2VyXCIsXHJcbiAgIHN1Y2Nlc3NSZWRpcmVjdFVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9cIixcclxuICAgcmVnaXN0ZXJEb2N0b3JVcmwgOiBcImluZGV4LnBocC9kb2N0b3IvZG9jdG9ySW5mb1wiLFxyXG4gICBhZG1pblVybDpcImluZGV4LnBocC9hZG1pbkRhc2hib2FyZC9hZG1pblwiLFxyXG5cclxuICAgLy9hZG1pbiByZWxhdGVkXHJcbiAgIGRvY3Rvckxpc3RpbmdVcmw6IFwiaW5kZXgucGhwL2FkbWluRGFzaGJvYXJkL2RvY3Rvckxpc3RpbmdcIixcclxuXHJcbiAgIGxvZ291dFVybCA6IFwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9sb2dvdXRcIixcclxuXHJcbiAgIC8vZG9jdG9yIGRhc2hib2FyZCBsaW5rcyBcclxuICAgZG9jdG9yUHJvZmlsZSA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9kb2N0b3JQcm9maWxlXCIsXHJcbiAgIGRhc2hib2FyZEhvbWVVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvXCIsXHJcbiAgIG5ld0FwcG9pbnRtZW50VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2Jvb2tBcHBvaW50bWVudFwiLFxyXG4gICBwYXRpZW50c0VudHJ5VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3BhdGllbnRzRW50cnlcIixcclxuICAgcGF0aWVudHNMaXN0aW5nVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3BhdGllbnRzTGlzdGluZ1wiLFxyXG4gICBjbG9zZUFwcG9pbnRtZW50VXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2Nsb3NlQXBwb2ludG1lbnRcIixcclxuICAgZG9jdG9yc0FwcG9pbnRtZW50c0xpc3RVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvbGlzdEFwcG9pbnRtZW50XCIsXHJcbiAgIG5ld1NjaGVkdWxlVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL25ld1NjaGVkdWxlXCIsXHJcbiAgIGxpc3RTY2hlZHVsZVVybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9zY2hlZHVsZUxpc3RcIixcclxuICAgZ2V0U2NoZWR1bGVDYWxlbmRhclVybDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL1NjaGVkdWxlQ2FsZW5kZXJWaWV3XCIsXHJcbiAgIGFkZFN0YWZmVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3N0YWZmRW50cnlcIixcclxuICAgZG9jdG9yc1N0YWZmTGlzdGluZ1VyIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL3N0YWZmTGlzdGluZ1wiLFxyXG4gICBwYXRpZW50c0hpc3RvcnlVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvcGF0aWVudEhpc3RvcnlcIixcclxuICAgY3JlYXRlUHJvZ3JhbUZvclBhdGllbnRVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvY3JlYXRlTWVkaWNhbFByb2dyYW1cIixcclxuICAgcHJvZ3JhbW1lTGlzdGluZ3NVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvcHJvZ3JhbW1lTGlzdFwiLFxyXG4gICBNYW5hZ2VMb2NhdGlvbnNVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvd29ya0xvY2F0aW9uTWFuYWdlbWVudFwiLFxyXG4gICBnZXRBbmFseXRpY3NVcmwgOiBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmQvQW5hbHl0aWNzUmVwb3J0XCIsXHJcbiAgIGdldENhbGVuZGVyVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2NhbGVuZGFyVGVtcGxhdGVcIixcclxuICAgYWNjb3VudGluZ1VybCA6IFwiaW5kZXgucGhwL2RvY3RvckRhc2hib2FyZC9hY2NvdW50aW5nXCIsXHJcbiAgIG1lZGljaW5lU2VhcmNoVXJsIDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL21lZGljaW5lU2VhcmNoXCIsXHJcblxyXG5cclxuICAgLy9zY2hlZHVsZVxyXG4gICBnZXRMb2NhdGlvblVybDogXCJpbmRleC5waHAvbG9jYXRpb25zL2dldERvY3RvckxvY2F0aW9uc1wiLFxyXG4gICBjcmVhdGVVcGRhdGVTY2hlZHVsZVVybDogXCJpbmRleC5waHAvc2NoZWR1bGUvY3JlYXRlVXBkYXRlU2NoZWR1bGVcIixcclxuXHJcbiAgIC8vcHJvZ3JhbW1lXHJcbiAgIHByb2dyYW1tZUxpc3RVcmw6XCJpbmRleC5waHAvcHJvZ3JhbW1lL2dldE1lZGljYXRpb25Qcm9ncmFtbWVMaXN0XCIsXHJcbiAgIHByb2dyYW1tZUVkaXRVcmw6XCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL2NyZWF0ZU1lZGljYWxQcm9ncmFtXCIsXHJcbiAgIGNyZWF0ZU1vZGlmeVByb2dyYW1tZVVybDpcImluZGV4LnBocC9wcm9ncmFtbWUvY3JlYXRlTW9kaWZ5UHJvZ3JhbW1lXCIsXHJcbiAgIGdldFByb2dyYW1tZVVybDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0UHJvZ3JhbW1lc1wiLFxyXG5cclxuXHJcbiAgIC8vcGF0aWVudFxyXG4gICBwYXRpZW50RGV0YWlsUGVyc2lzdFVybDpcImluZGV4LnBocC9wYXRpZW50L2FkZFVwZGF0ZVBhdGllbnRcIixcclxuICAgcGF0aWVudHNEZXRhaWxzVXJsOlwiaW5kZXgucGhwL3BhdGllbnQvZ2V0UGF0aWVudERldGFpbHNcIixcclxuICAgbG9naW5DaGVja1VybDpcImluZGV4LnBocC9hdXRoZW50aWNhdGUvaXNMb2dnZWRJblwiLFxyXG4gICBnZXRQcm9ncmFtbWVMaXN0OlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRNZWRpY2F0aW9uUHJvZ3JhbW1lTGlzdFwiLFxyXG4gICBwcm9ncmFtbWVMaXN0RGV0YWlsc1VybDpcImluZGV4LnBocC9wcm9ncmFtbWUvZ2V0UHJvZ3JhbW1lTGlzdERldGFpbHNcIixcclxuICAgcGF0aWVudHNQcm9ncmFtbWVzVXJsOlwiaW5kZXgucGhwL3Byb2dyYW1tZS9nZXRQYXRpZW50UHJvZ3JhbW1lc1wiLFxyXG4gICBwYXRpZW50TGlzdGluZ1VybDpcImluZGV4LnBocC9wYXRpZW50L2dldFBhdGllbnRMaXN0XCIsXHJcblxyXG4gICBzYXZlVXBkYXRlTG9jYXRpb25zOlwiaW5kZXgucGhwL2xvY2F0aW9ucy9hZGRVcGRhdGVMb2NhdGlvblwiLFxyXG4gICBsb2NhdGlvbkxpc3RVcmw6XCJpbmRleC5waHAvbG9jYXRpb25zL2dldERvY3RvckxvY2F0aW9uc1wiLFxyXG4gICBkZWxpdmVyeU1ldGhvZHNVcmw6XCJpbmRleC5waHAvcGF0aWVudC9nZXREZWxpdmVyeU1ldGhvZHNcIixcclxuXHJcblxyXG4gICAvL3JlZ2lzdGFydGlvblxyXG4gICBkb2N0b3JVcmw6XCJpbmRleC5waHAvZG9jdG9yL3NhdmVVcGRhdGVEb2N0b3JcIixcclxuICAgZG9jdG9yRGV0YWlsc1VybDpcImluZGV4LnBocC9kb2N0b3IvZ2V0RG9jdG9yRGV0YWlsc1wiLFxyXG4gICBsb2dpbkNoZWNrVXJsOlwiaW5kZXgucGhwL2F1dGhlbnRpY2F0ZS9pc0xvZ2dlZEluXCIsXHJcbiAgIGRvY3RvckRhc2hVcmw6XCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkL1wiLFxyXG4gICBsb2dvdXRVcmw6XCJpbmRleC5waHAvYXV0aGVudGljYXRlL2xvZ291dFwiLFxyXG5cclxuICAgY3JlYXRlTW9kaWZ5U3RhZmZVcmw6XCJpbmRleC5waHAvc3RhZmYvY3JlYXRlTW9kaWZ5U3RhZmZcIixcclxuICAgZ2V0U3RhZmZEZXRhaWxzVXJsOiBcImluZGV4LnBocC9zdGFmZi9nZXRTdGFmZkRldGFpbHNcIixcclxuICAgc3RhZmZMaXN0aW5nVXJsOiBcImluZGV4LnBocC9zdGFmZi9nZXREb2N0b3JzU3RhZmZMaXN0XCJcclxuXHJcbn1cclxuIiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuXHJcbiAgICAkKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0FkbWluIERhc2hib2FyZCBqcyBsb2FkZWQnKTtcclxuXHJcblxyXG4gICAgICAgIC8vdG9wIGxldmVsIGNvbnRyb2xsZXJcclxuICAgIHZhciBjb250cm9sbGVyID0ge1xyXG4gICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vd2lyaW5nIHRoZSBuYXZpZ2F0aW9uXHJcbiAgICAgICAgdGhpcy5sb2dvdXRVcmwgPSBsaW5rcy5sb2dvdXRVcmw7XHJcbiAgICAgICAgdGhpcy5Eb2N0b3JMaXN0aW5nVXJsID0gbGlua3MuZG9jdG9yTGlzdGluZ1VybDtcclxuXHJcbiAgICAgICAgLy9kbyBzb21ldGhuZyBhYm91dCBkb2N0b3JzIGluZm8gYW5kIHJlZ2lzdHJhdGlvblxyXG5cclxuICAgICAgICAvL1RoZSB1cmwgZnJvbSB0aGUgYnJvd3NlciAgY2FuIGJlIGNvbXBhcmVkIHRvIHNldCB0aGUgYWN0aXZlIG5hdmlnYXRpb25cclxuICAgICAgICBuYXZWaWV3LmluaXQoKTtcclxuXHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgICAgICAgIHZhciBuYXZWaWV3ID0ge1xyXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgICAvL3dpcmluZyB0aGUgbmF2aWdhdGlvbiBjbGlja3NcclxuICAgICAgICAgICAgICAkKFwiI3Btcy1icmFuZC1idG4tbGlua1wiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUE1TIGJyYW5kIGNsaWNrJyk7XHJcblxyXG4gICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAkKFwiI2FkbWluLWRhc2gtbG9nb3V0LWJ0blwiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsb2dvdXQgY2xpY2snKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5sb2dvdXRVcmw7XHJcbiAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICQoXCIjYnRuLW1hbmFnZS1kb2N0b3JzXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ21hbmFnZSBkb2N0b3JzIGNsaWNrJyk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICQoXCIjYnRuLWRvY3Rvci1saXN0aW5nc1wiKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkb2N0b3JzIGxpc3RpbmcgY2xpY2snKTtcclxuICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udHJvbGxlci5Eb2N0b3JMaXN0aW5nVXJsO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICBjb250cm9sbGVyLmluaXQoKTtcclxuXHJcbiAgICB9KCkpO1xyXG5cclxufSk7XHJcbiIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgJChmdW5jdGlvbigpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdEb2N0b3IgZWRpdCBqcyBsb2FkZWQnKTtcclxuXHJcbiAgICAgICAgdmFyIGRvY3Rvck1vZGVsID0ge1xyXG4gICAgICAgICAgIGlkOjAsXHJcbiAgICAgICAgICAgbmFtZTpcIlwiLFxyXG4gICAgICAgICAgIGNvbnRhY3Q6XCJcIixcclxuICAgICAgICAgICBhbHRlcm5hdGVDb250YWN0OiBcIlwiLFxyXG4gICAgICAgICAgIGVtYWlsOiBcIlwiLFxyXG4gICAgICAgICAgIHF1YWxpZmljYXRpb25zOiBcIlwiLFxyXG4gICAgICAgICAgIGFkZHJlc3M6XCJcIixcclxuICAgICAgICAgICByZWNvdmVyeUNvbnRhY3Q6XCJcIixcclxuICAgICAgICAgICByZWNvdmVyeUVtYWlsOlwiXCIsXHJcbiAgICAgICAgICAgdXNlck5hbWU6XCJcIixcclxuICAgICAgICAgICBwYXNzd29yZDpcIlwiLFxyXG4gICAgICAgICAgIGlzQWN0aXZlOjFcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgY29udHJvbGxlciA9IHtcclxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICB0aGlzLmRvY3RvclVybCA9ICBcImluZGV4LnBocC9zYXZlVXBkYXRlRG9jdG9yXCI7XHJcbiAgICAgICAgICAgICAgdGhpcy5kb2N0b3JEZXRhaWxzVXJsID0gIFwiaW5kZXgucGhwL2dldERvY3RvckRldGFpbHNcIjtcclxuICAgICAgICAgICAgICB0aGlzLmFkbWluRG9jdG9yc0xpc3RpbmdVcmwgPSBcImluZGV4LnBocC9kb2N0b3JMaXN0aW5nXCI7XHJcbiAgICAgICAgICAgICAgZm9ybVZpZXcuaW5pdCgpO1xyXG5cclxuICAgICAgICAgICAgICAvL2dldHRpbmcgZG9jdG9ycyBpbmZvIGZvciB0aGUgZG9jdG9ycyBpZCBpbiB0aGUgdXJsXHJcbiAgICAgICAgICAgICAgdmFyIGRvY3RvcnNJZCA9IHV0aWxpdHkuZ2V0VVJMUGFyYW0oJ2lkJyk7XHJcblxyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkb2N0b3JzIElkICcgKyBkb2N0b3JzSWQpO1xyXG4gICAgICAgICAgICAgIGlmKGRvY3RvcnNJZCl7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyLnVwZGF0ZU1vZGVsRnJvbVNlcnZlcihkb2N0b3JzSWQpO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldE1vZGVsOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgIHJldHVybiBkb2N0b3JNb2RlbDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdXBkYXRlTW9kZWxGcm9tU2VydmVyOiBmdW5jdGlvbihkb2N0b3JJZCl7XHJcbiAgICAgICAgICAgICAgJC5nZXQoIGNvbnRyb2xsZXIuZG9jdG9yRGV0YWlsc1VybCAsIHtpZDogZG9jdG9ySWR9KVxyXG4gICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiggcmVzcG9uc2UgKSB7XHJcbiAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1cGRhdGVJbmZvRnJvbVNlcnZlcjogXCIgKyBKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xyXG5cclxuICAgICAgICAgICAgICAgICB2YXIgZG9jdG9yICA9IHJlc3BvbnNlLmRhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgIGRvY3Rvck1vZGVsLmlkID0gZG9jdG9yLmlkO1xyXG4gICAgICAgICAgICAgICAgIGRvY3Rvck1vZGVsLm5hbWUgPSBkb2N0b3IubmFtZTtcclxuICAgICAgICAgICAgICAgICBkb2N0b3JNb2RlbC5jb250YWN0ID0gZG9jdG9yLmNvbnRhY3Q7XHJcbiAgICAgICAgICAgICAgICAgZG9jdG9yTW9kZWwuYWx0ZXJuYXRlQ29udGFjdCA9IGRvY3Rvci5hbHRlcm5hdGVDb250YWN0O1xyXG4gICAgICAgICAgICAgICAgIGRvY3Rvck1vZGVsLmVtYWlsID0gZG9jdG9yLmVtYWlsO1xyXG4gICAgICAgICAgICAgICAgIGRvY3Rvck1vZGVsLnF1YWxpZmljYXRpb25zID0gZG9jdG9yLnF1YWxpZmljYXRpb25zO1xyXG4gICAgICAgICAgICAgICAgIGRvY3Rvck1vZGVsLmFkZHJlc3MgPSBkb2N0b3IuYWRkcmVzcztcclxuICAgICAgICAgICAgICAgICBkb2N0b3JNb2RlbC51c2VyTmFtZSA9IGRvY3Rvci51c2VyTmFtZTtcclxuICAgICAgICAgICAgICAgICBkb2N0b3JNb2RlbC5wYXNzd29yZCA9IGRvY3Rvci5wYXNzd29yZDtcclxuICAgICAgICAgICAgICAgICBkb2N0b3JNb2RlbC5yZWNvdmVyeUNvbnRhY3QgPSBkb2N0b3IucmVjb3ZlcnlDb250YWN0O1xyXG4gICAgICAgICAgICAgICAgIGRvY3Rvck1vZGVsLnJlY292ZXJ5RW1haWwgPSBkb2N0b3IucmVjb3ZlcnlFbWFpbDtcclxuICAgICAgICAgICAgICAgICBkb2N0b3JNb2RlbC5pc0FjdGl2ZSA9IGRvY3Rvci5pc0FjdGl2ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgZm9ybVZpZXcucmVuZGVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVwZGF0ZU1vZGVsRnJvbVZpZXc6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgZG9jdG9yTW9kZWwuaWQgPSBmb3JtVmlldy5pZENvbnRyb2wudmFsKCk7XHJcbiAgICAgICAgICAgICAgZG9jdG9yTW9kZWwubmFtZSA9IGZvcm1WaWV3Lm5hbWVDb250cm9sLnZhbCgpO1xyXG4gICAgICAgICAgICAgIGRvY3Rvck1vZGVsLmNvbnRhY3QgPSBmb3JtVmlldy5jb250YWN0Q29udHJvbC52YWwoKTtcclxuICAgICAgICAgICAgICBkb2N0b3JNb2RlbC5hbHRlcm5hdGVDb250YWN0ID0gZm9ybVZpZXcuYWx0ZXJuYXRDb250YWN0Q29udHJvbC52YWwoKTtcclxuICAgICAgICAgICAgICBkb2N0b3JNb2RlbC5lbWFpbCA9IGZvcm1WaWV3LmVtYWlsQ29udHJvbC52YWwoKTtcclxuICAgICAgICAgICAgICBkb2N0b3JNb2RlbC5xdWFsaWZpY2F0aW9ucyA9IGZvcm1WaWV3LnF1YWxpZmljYXRpb25Db250cm9sLnZhbCgpO1xyXG4gICAgICAgICAgICAgIGRvY3Rvck1vZGVsLmFkZHJlc3MgPSBmb3JtVmlldy5hZGRyZXNzQ29udHJvbC52YWwoKTtcclxuICAgICAgICAgICAgICBkb2N0b3JNb2RlbC51c2VyTmFtZSA9IGZvcm1WaWV3LnVzZXJOYW1lQ29udHJvbC52YWwoKTtcclxuICAgICAgICAgICAgICBkb2N0b3JNb2RlbC5wYXNzd29yZCA9IGZvcm1WaWV3LnBhc3N3b3JkQ29udHJvbC52YWwoKTtcclxuICAgICAgICAgICAgICBkb2N0b3JNb2RlbC5yZWNvdmVyeUNvbnRhY3QgPSBmb3JtVmlldy5yZWNvdmVyeUNvbnRhY3RDb250cm9sLnZhbCgpO1xyXG4gICAgICAgICAgICAgIGRvY3Rvck1vZGVsLnJlY292ZXJ5RW1haWwgPSBmb3JtVmlldy5yZWNvdmVyeUVtYWlsQ29udHJvbC52YWwoKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgIGlmKGZvcm1WaWV3LmFjdGl2ZUNvbnRyb2wuaXMoXCI6Y2hlY2tlZFwiKSl7XHJcbiAgICAgICAgICAgICAgICBkb2N0b3JNb2RlbC5pc0FjdGl2ZSA9IDE7XHJcbiAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBkb2N0b3JNb2RlbC5pc0FjdGl2ZSA9IDA7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICByZXR1cm4gZG9jdG9yTW9kZWw7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNhdmVEb2N0b3JBbmRSZWRpcmVjdDogZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgICAgJC5wb3N0KCBjb250cm9sbGVyLmRvY3RvclVybCAsIGRvY3Rvck1vZGVsKVxyXG4gICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiggcmVzcG9uc2UgKSB7XHJcbiAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3BvbnNlICcgKyBKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgaWYocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT0gXCItMVwiKXtcclxuICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQbGVhc2Ugc2VsZWN0IGFub3RoZXIgbG9naW4gSWQnKTtcclxuICAgICAgICAgICAgICAgICB9ZWxzZSBpZihyZXNwb25zZS5kYXRhLnVzZXIudHlwZSA9PSBcIkRcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuYWRtaW5Eb2N0b3JzTGlzdGluZ1VybDtcclxuICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07Ly9jb250cm9sbGVyXHJcblxyXG5cclxuICAgICAgICAgIHZhciBmb3JtVmlldyA9IHtcclxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZm9ybSB2aWV3IGludGknKTtcclxuXHJcbiAgICAgICAgICAgICAgdGhpcy5pZENvbnRyb2wgPSAkKCcjZGlkJyk7XHJcbiAgICAgICAgICAgICAgdGhpcy5uYW1lQ29udHJvbCA9ICQoJyNkbmFtZScpO1xyXG4gICAgICAgICAgICAgIHRoaXMuY29udGFjdENvbnRyb2wgPSAkKCcjZGNvbnRhY3QnKTtcclxuICAgICAgICAgICAgICB0aGlzLmFsdGVybmF0Q29udGFjdENvbnRyb2wgPSAkKCcjZGFsdGVybmF0ZS1jb250YWN0Jyk7XHJcbiAgICAgICAgICAgICAgdGhpcy5lbWFpbENvbnRyb2wgPSAkKCcjZGVtYWlsJyk7XHJcbiAgICAgICAgICAgICAgdGhpcy5xdWFsaWZpY2F0aW9uQ29udHJvbCA9ICQoJyNkcXVhbGlmaWNhdGlvbnMnKTtcclxuICAgICAgICAgICAgICB0aGlzLmFkZHJlc3NDb250cm9sID0gJCgnI2RhZGRyZXNzJyk7XHJcbiAgICAgICAgICAgICAgdGhpcy51c2VyTmFtZUNvbnRyb2wgPSAkKCcjZHVzZXItbmFtZScpO1xyXG4gICAgICAgICAgICAgIHRoaXMucGFzc3dvcmRDb250cm9sID0gJCgnI2RwYXNzd29yZCcpO1xyXG4gICAgICAgICAgICAgIHRoaXMucmVjb3ZlcnlDb250YWN0Q29udHJvbCA9ICQoJyNkcmVjb3ZlcnktY29udGFjdCcpO1xyXG4gICAgICAgICAgICAgIHRoaXMucmVjb3ZlcnlFbWFpbENvbnRyb2wgPSAkKCcjZHJlY292ZXJ5LWVtYWlsJyk7XHJcbiAgICAgICAgICAgICAgLy9kb2N0b3IgaXNhY3RpdmUvaW5hY3RpdmUgcmFkaW8gY29udHJvbHNcclxuICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUNvbnRyb2wgPSAkKCcjZGFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgIHRoaXMuaW5hY3RpdmVDb250cm9sID0gJCgnI2RpbmFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAvL2NvbnRyb2xzIGFyZSBwYXNzZWQsIHNvIHRoYXQgdGhleSBhcmUgYXZhaWxhYmxlIHRvIGNsaWNrIGZ1bmN0aW9uIGFzIGNsb3N1cmUgdmFyaWFibGVzXHJcbiAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xzID0geyBpZENvbnRyb2w6IHRoaXMuaWRDb250cm9sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lQ29udHJvbDogdGhpcy5uYW1lQ29udHJvbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFjdENvbnRyb2w6IHRoaXMuY29udGFjdENvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdGVybmF0Q29udGFjdENvbnRyb2w6IHRoaXMuYWx0ZXJuYXRDb250YWN0Q29udHJvbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1haWxDb250cm9sOiB0aGlzLmVtYWlsQ29udHJvbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVhbGlmaWNhdGlvbkNvbnRyb2w6IHRoaXMucXVhbGlmaWNhdGlvbkNvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3NDb250cm9sOiB0aGlzLmFkZHJlc3NDb250cm9sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyTmFtZUNvbnRyb2w6IHRoaXMudXNlck5hbWVDb250cm9sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXNzd29yZENvbnRyb2w6IHRoaXMucGFzc3dvcmRDb250cm9sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVDb250cm9sOiB0aGlzLmFjdGl2ZUNvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaW5hY3RpdmVDb250cm9sOiB0aGlzLmluYWN0aXZlQ29udHJvbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgIC8vd2lyaW5nIGV2ZW50c1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgJCgnI2J0bi1kb2MtcmVnLXN1bWl0Jykub24oJ2NsaWNrJywgKGZ1bmN0aW9uKGNvbnRyb2xsZXIpe1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnaGFuZGxlciBhZGRlZCA6ICcgKyBjYXQuSWQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2hhbmRsZXIgZXhlYyA6ICcgKyBjYXQuSWQpO1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZG9jdG9yIHJlZyBjbGljayBzdWJtaXQnKTtcclxuICAgICAgICAgICAgICAgICAgLy9zdGVwcyBpbiBzYXZlZFxyXG4gICAgICAgICAgICAgICAgICAvL3VwZGF0ZSBtb2RlIHdpdGggaW5mbyBmcm9tIHRoZSB2aWV3XHJcbiAgICAgICAgICAgICAgICAgIC8vcGVyc2lzdCB0aGUgbW9kZWwgaS5lIHNhdmUgdXBkYXRlXHJcblxyXG4gICAgICAgICAgICAgICAgICAvL3VwZGF0ZXMgdGhlIG1vZGVsIHdpdGggaW5mbyBmcm9tIHRoZSB2aWV3XHJcbiAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIudXBkYXRlTW9kZWxGcm9tVmlldygpO1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbW9kZWwgdmFsdWUnICsgSlNPTi5zdHJpbmdpZnkoZG9jdG9yTW9kZWwpICk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuc2F2ZURvY3RvckFuZFJlZGlyZWN0KCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgIH0pKGNvbnRyb2xsZXIpKTsgLy9zdWJtaXQgY2xpY2sgaGFuZGxlclxyXG5cclxuXHJcbiAgICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0Q29udHJvbHM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbHM7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgIHZhciBtb2RlbCA9IGNvbnRyb2xsZXIuZ2V0TW9kZWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgdGhpcy5pZENvbnRyb2wudmFsKG1vZGVsLmlkKTtcclxuICAgICAgICAgICAgICB0aGlzLm5hbWVDb250cm9sLnZhbChtb2RlbC5uYW1lKTtcclxuICAgICAgICAgICAgICB0aGlzLmNvbnRhY3RDb250cm9sLnZhbChtb2RlbC5jb250YWN0KTtcclxuICAgICAgICAgICAgICB0aGlzLmFsdGVybmF0Q29udGFjdENvbnRyb2wudmFsKG1vZGVsLmFsdGVybmF0ZUNvbnRhY3QpO1xyXG4gICAgICAgICAgICAgIHRoaXMuZW1haWxDb250cm9sLnZhbChtb2RlbC5lbWFpbCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5xdWFsaWZpY2F0aW9uQ29udHJvbC52YWwobW9kZWwucXVhbGlmaWNhdGlvbnMpO1xyXG4gICAgICAgICAgICAgIHRoaXMuYWRkcmVzc0NvbnRyb2wudmFsKG1vZGVsLmFkZHJlc3MpO1xyXG4gICAgICAgICAgICAgIHRoaXMudXNlck5hbWVDb250cm9sLnZhbChtb2RlbC51c2VyTmFtZSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5wYXNzd29yZENvbnRyb2wudmFsKG1vZGVsLnBhc3N3b3JkKTtcclxuICAgICAgICAgICAgICB0aGlzLnJlY292ZXJ5Q29udGFjdENvbnRyb2wudmFsKG1vZGVsLnJlY292ZXJ5Q29udGFjdCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5yZWNvdmVyeUVtYWlsQ29udHJvbC52YWwobW9kZWwucmVjb3ZlcnlFbWFpbCk7XHJcblxyXG5cclxuICAgICAgICAgICAgICBpZihtb2RlbC5pc0FjdGl2ZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlQ29udHJvbC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluYWN0aXZlQ29udHJvbC5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlQ29udHJvbC5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbmFjdGl2ZUNvbnRyb2wucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIC8vZG9jdG9yIGlzYWN0aXZlL2luYWN0aXZlIHJhZGlvIGNvbnRyb2xzXHJcbiAgICAgICAgICAgICAgLy9zZXQgY29udHJvbHMgZGVwZW5kaW5nIHVwIHRoZSBkYXRhXHJcbiAgICAgICAgICAgICAgLy90aGlzLmFjdGl2ZUNvbnRyb2wgPSAkKCcjZGFjdGl2ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgIGNvbnRyb2xsZXIuaW5pdCgpO1xyXG5cclxuICAgIH0oKSk7XHJcblxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
