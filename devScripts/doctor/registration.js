$(document).ready(function(){
  console.log('doctor registration in ');



  var doctorModel = {
     id:0,
     name:"",
     contact:"",
     //alternateContact: "0",
     email: "",
     qualifications: "",
     address:"",
     //recoveryContact:"",
     //recoveryEmail:"",
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

        /*
        this.alertcontainer = $('.container');
        this.alert = function(msg,classnm,id){
          $('.pms-alerts').remove();
          var alert = $('<div  id = "'+id+'" class=" alert ' +classnm+' pms-alerts alert-dismissible doc-profile-before-submit-warning-error" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+msg+'</div>');
          return alert;
        }
        */
        formView.init();
        formView.render();

        //this.getDoctorInfo();
        //if the doctor is logged in then fill the form with the doctors data

      },
      resetModel: function(){
        doctorModel = {
           id:0,
           name:"",
           contact:"",
           //alternateContact: "0",
           email: "",
           qualifications: "",
           address:"",
           //recoveryContact:"",
           //recoveryEmail:"",
           userName:"",
           password:"",
           isActive:0
        };
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
           //doctorModel.alternateContact = doctor.alternateContact;
           doctorModel.email = doctor.email;
           doctorModel.qualifications = doctor.qualifications;
           doctorModel.address = doctor.address;
           doctorModel.userName = doctor.userName;
           doctorModel.password = doctor.password;
           //doctorModel.recoveryContact = doctor.recoveryContact;
           //doctorModel.recoveryEmail = doctor.recoveryEmail;
           doctorModel.isActive = doctor.isActive;

           formView.render();

         });

      },
      updateModelFromView: function(){
        doctorModel.id = formView.idControl.val();
        doctorModel.name = formView.nameControl.val();
        doctorModel.contact = formView.contactControl.val();
        //doctorModel.alternateContact = formView.alternatContactControl.val();
        doctorModel.email = formView.emailControl.val();
        doctorModel.qualifications = formView.qualificationControl.val();
        doctorModel.address = formView.addressControl.val();
        doctorModel.userName = formView.userNameControl.val();
        var newPass = formView.passwordControl.val();
        if(!validator.isEmptyString(newPass)){
          doctorModel.password =  newPass
        }
        //doctorModel.recoveryContact = formView.recoveryContactControl.val();
        //doctorModel.recoveryEmail = formView.recoveryEmailControl.val();


        if(formView.activeControl.is(":checked")){
          doctorModel.isActive = 1;
        }else{
          doctorModel.isActive = 0;
        }

        return doctorModel;
      },

      saveDoctorAndRedirect: function(){
             formView.addSaveButtonAnimation(true);
             console.log('registergin doc info');
             $.post( controller.doctorUrl , doctorModel)
              .done(function( response ) {
                console.log('response ' + JSON.stringify(response));
                formView.addSaveButtonAnimation(false);

                //hide all alerts
                formView.alertLoginIdTaken.addClass('hidden');
                formView.alertSucess.addClass('hidden');

                if(response.status == "-1"){
                  formView.alertLoginIdTaken.removeClass('hidden');
                  console.log('Please select another login Id');
                  //controller.alertcontainer.prepend(controller.alert("Please select another login Id","alert-warning text-center",''));

                }else if(response.status == "1"){

                  if(response.user && response.user.type == '-1'){

                    //the user is not logged in so its a new registration
                    //controller.alertcontainer.prepend(controller.alert("Thank you for registering with us, we have send you a email with your account info","alert-success text-center",''));

                    controller.resetModel();
                    formView.render();
                    formView.passwordControl.val('');
                    formView.alertSucess.removeClass('hidden');
                    console.log('Thank you for registering with us, we have send you a email with your account info');
                    //window.location.href = controller.logoutUrl;
                  }else if(response.user.id && response.user.type != '-1'){
                    //logged in user, so its profile modifications
                    console.log('modifying');
                    //controller.alertcontainer.prepend(controller.alert("Doctor Info updated succesfully","alert-success text-center",''));
                  }

                }
      });
    }
  };


  var formView = {
    init: function(){
      console.log('form view inti');
      this.form = $("#doctor-profile-reg-form");
      this.idControl = $('#did');
      this.nameControl = $('#dname');
      this.contactControl = $('#dcontact');
      //this.alternatContactControl = $('#dalternate-contact');
      this.emailControl = $('#demail');
      this.qualificationControl = $('#dqualifications');
      this.addressControl = $('#daddress');
      this.userNameControl = $('#duser-name');
      this.passwordControl = $('#dpassword');
      //this.recoveryContactControl = $('#drecovery-contact');
      //this.recoveryEmailControl = $('#drecovery-email');
      this.saveButton = $('#btn-doc-reg-sumit');
      this.docProfclear = $('#btn-doc-clear-btn');

      //doctor isactive/inactive radio controls
      this.activeControl = $('#dactive');
      this.inactiveControl = $('#dinactive');

      this.validator = this.form.bootstrapValidator({
        trigger:" focus click change keyup select blur",
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok ',
          invalid: 'glyphicon glyphicon-remove ',
          validating: 'glyphicon glyphicon-refresh'
        },
          excluded: [':disabled'],
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
              },
              regexp: {
                            regexp:  /^\+?[0-9()-\s]+$/,
                              message: 'Please enter a valid phone no'
                          }
            }
          }
          , email :{

            validators : {

              emailAddress :{
                message : 'Please Enter valid email'
              },
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
                message : 'Please enter address'
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
          ,password :{
            validators : {
              notEmpty :{
                message : 'Please enter your password'
              }
            }
          }
        }
      }).on('success.form.bv',function(e){
        e.preventDefault();
        console.log('validate click');
        //console.log('model value' + JSON.stringify(doctorModel) );
        controller.updateModelFromView();
        controller.saveDoctorAndRedirect();
      });


    this.saveButton.on('click', function(){
        //console.log('handler added : ' + cat.Id);

          //console.log('handler exec : ' + cat.Id);

          console.log('save button click');

          formView.form.submit();

          //steps in saved
          //update mode with info from the view
          //persist the model i.e save update
          /*
          formView.validator.on('success.form.bv',function(e){
            e.preventDefault();

            console.log('model value' + JSON.stringify(doctorModel) );
            controller.updateModelFromView();
            controller.saveDoctorAndRedirect();

          });
          */
          //updates the model with info from the view


        }); //submit click handler

      //alerts
      this.alertLoginIdTaken = $('#login-id-already-taken');
      this.alertSucess = $('#doc-profile-before-submit-success');

      this.render();
    },
    addSaveButtonAnimation: function(show){
      if(show){
        this.saveButton.attr('disabled','disbled')
                       .children('span')
                       .addClass('fa fa-spinner fa-pulse fa-fw');
      }else{
        this.saveButton.removeAttr('disabled')
                       .children('span')
                       .removeClass('fa fa-spinner fa-pulse fa-fw');
      }
    },
    render: function() {

      this.alertLoginIdTaken.addClass('hidden');
      this.alertSucess.addClass('hidden');

      var model = controller.getModel();

      console.log('render ' + JSON.stringify(model));

      this.idControl.val(model.id);
      this.nameControl.val(model.name);
      this.contactControl.val(model.contact);
      //this.alternatContactControl.val(model.alternateContact);
      this.emailControl.val(model.email);
      this.qualificationControl.val(model.qualifications);
      this.addressControl.val(model.address);
      this.userNameControl.val(model.userName);
      //this.passwordControl.val(model.password);
      //this.recoveryContactControl.val(model.recoveryContact);
      //this.recoveryEmailControl.val(model.recoveryEmail);


      if(model.isActive == 1){
        this.activeControl.prop('checked', true);
        //this.inactiveControl.prop('checked', false);
      } else{
        this.activeControl.prop('checked', false);
        //this.inactiveControl.prop('checked', true);

      }

      //doctor isactive/inactive radio controls
      //set controls depending up the data
      //this.activeControl = $('#dactive');
    }
  };

  controller.init();

});
