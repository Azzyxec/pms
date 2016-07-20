$(document).ready(function(){
  console.log('doctor registration in ');



  var doctorModel = {
    id:0,
    name:"",
    contact:"",
    email: "",
    qualifications: "",
    address:"",
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
      formView.render();


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
        doctorModel.email = doctor.email;
        doctorModel.qualifications = doctor.qualifications;
        doctorModel.address = doctor.address;
        doctorModel.userName = doctor.userName;
        doctorModel.password = "";
        doctorModel.isActive = doctor.isActive;

        formView.render();

      });

    },
    updateModelFromView: function(){
      doctorModel.id = formView.idControl.val();
      doctorModel.name = formView.nameControl.val();
      doctorModel.contact = formView.contactControl.val();
      doctorModel.email = formView.emailControl.val();
      doctorModel.qualifications = formView.qualificationControl.val();
      doctorModel.address = formView.addressControl.val();
      doctorModel.userName = formView.userNameControl.val();
      var newPass = formView.passwordControl.val();
      if(!validator.isEmptyString(newPass)){
        doctorModel.password =  newPass.trim();
      }else{
        doctorModel.password = "";
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



        if(response.status == "-1"){
          utility.getAlerts("  <strong>oops!</strong> The login id is taken, please try another Id!.","alert-warning","",".container-fluid");
          console.log('Please select another login Id');
          //controller.alertcontainer.prepend(controller.alert("Please select another login Id","alert-warning text-center",''));

        }else if(response.status == "1"){

          if(response.user.id && response.user.type != '-1'){
            //logged in user, so its profile modifications
              utility.getAlerts("  <strong>Success!</strong> modified successfully!","alert-success","",".container-fluid");
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
                regexp: /^\+?[0-9()-\s]+$/,
                message: 'The value is not valid phone number'
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
        }
      }).on('success.form.bv',function(e){
        e.preventDefault();
        console.log('validate click');
        //console.log('model value' + JSON.stringify(doctorModel) );
        controller.updateModelFromView();
        controller.saveDoctorAndRedirect();
      });


      this.saveButton.on('click', function(){

        console.log('save button click');

        formView.form.submit();


      }); //submit click handler

      //alerts
      this.alertLoginIdTaken = $('#login-id-already-taken');
      this.alertSucess = $('#doc-profile-before-submit-success');

      this.render();
    },
    addSaveButtonAnimation: function(show){
      if(show){
        this.saveButton.attr('disabled','disbled');
      }else{
        this.saveButton.removeAttr('disabled');
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
      this.emailControl.val(model.email);
      this.qualificationControl.val(model.qualifications);
      this.addressControl.val(model.address);
      this.userNameControl.val(model.userName);
      this.passwordControl.val('');

    }
  };

  controller.init();

});
