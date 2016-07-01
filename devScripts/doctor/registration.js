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
        var newPass = formView.passwordControl.val();
        if(!validator.isEmptyString(newPass)){
          doctorModel.password =  newPass
        }
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


           if(response.data.status == "1"){
             $('.doc-profile-before-submit-warning-error').removeClass('hidden');

             console.log('Please select another login Id');
           }else if(response.data.status == "-1"){
                $('#doc-profile-before-submit-success').removeClass('hidden');

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
      this.saveButton = $('#btn-doc-reg-sumit');
      this.docProfclear = $('#btn-doc-clear-btn');

      //doctor isactive/inactive radio controls
      this.activeControl = $('#dactive');
      this.inactiveControl = $('#dinactive');
      this.validator = $("#doctor-profile-reg-form").bootstrapValidator({
        trigger:" focus blur",
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok ',
          invalid: 'glyphicon glyphicon-remove ',
          validating: 'glyphicon glyphicon-refresh'
        },

        fields:{
          dname : {
            validators : {
              notEmpty : {
                message : 'Please enter your name!'
              }
            }

          },
          dcontact : {
            validators : {
              notEmpty :{
                message : 'Please enter your contact No'
              }
            }
          },
          dalternatecontact :{

            validators : {
              notEmpty :{
                message : 'Please Select the duration'
              }
            }
          }
          , email :{

            validators : {
              notEmpty :{
                message : 'Please Enter email'
              }
            }
          }

          , qualifications :{

            validators : {
              notEmpty :{
                message : 'Please enter qualification'
              }
            }
          }
          ,  address :{

            validators : {
              notEmpty :{
                message : 'Please select patients gender'
              }
            }
          }
          , username :{

            validators : {
              notEmpty :{
                message : 'Please enter Username'
              }
            }
          }
          ,      password :{

            validators : {
              notEmpty :{
                message : 'Please select patients Weight'
              }
            }
          }

          , activeOptions :{

            validators : {
              notEmpty :{
                message : 'Please enter Patients contact no'
              }

            }
          }

        }
      });


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


      this.saveButton.on('click', (function(controller){
        //console.log('handler added : ' + cat.Id);
        return function(){
          //console.log('handler exec : ' + cat.Id);

          //steps in saved
          //update mode with info from the view
          //persist the model i.e save update




          //updates the model with info from the view
          controller.updateModelFromView();
          console.log('model value' + JSON.stringify(doctorModel) );
         controller.saveDoctorAndRedirect();

        };
      })(controller)); //submit click handler




            this.docProfclear.on('click',function(){

                            $('#doctor-profile-reg-form').bootstrapValidator("resetForm",true);
                    });


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
      //this.passwordControl.val(model.password);
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
