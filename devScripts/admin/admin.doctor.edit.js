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
           //recoveryContact:"",
           //recoveryEmail:"",
           userName:"",
           password:"",
           isActive:1
        };

        var controller = {
            init: function(){
              this.doctorUrl = links.doctorUrl;
              this.doctorDetailsUrl =  links.doctorDetailsUrl;
              this.adminDoctorsListingUrl = links.doctorListingUrl;

              this.temp = $("<h1>sdfs</h1>");
              this.alertcontainer = $('.container');
              this.alert = function(msg,classnm,id){
                $('.pms-alerts').remove();
                var alert = $('<div  id = "'+id+'" class=" alert ' +classnm+' pms-alerts alert-dismissible doc-profile-before-submit-warning-error" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+msg+'</div>');
                return alert;
              }



              formView.init();

              //getting doctors info for the doctors id in the url
              var doctorsId = utility.getURLParam('id');

              console.log('doctors Id ' + doctorsId);
              if(doctorsId){
                controller.updateModelFromServer(doctorsId);
              }else{
                formView.overLay.addClass('hidden');
              }

            },
            getModel: function(){
              return doctorModel;
            },
            updateModelFromServer: function(doctorId){
              console.log('get doc info link' + controller.doctorDetailsUrl);
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
                 doctorModel.password = ''; //doctor.password;
                 //doctorModel.recoveryContact = doctor.recoveryContact;
                 //doctorModel.recoveryEmail = doctor.recoveryEmail;
                 doctorModel.isActive = doctor.isActive;

                 formView.render();
                 formView.overLay.addClass('hidden');
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
              console.log('save doc' + this.doctorUrl);
              $.post( this.doctorUrl , doctorModel)
               .done(function( response ) {
                 console.log('response ' + JSON.stringify(response));


                 if(response.status == "-1"){
                    controller.alertcontainer.prepend(controller.alert("Please select another login Id","alert-warning text-center",'login-error-msg'));
                   console.log('Please select another login Id');
                 }else if(response.status == "1"){
                      window.location.href = controller.adminDoctorsListingUrl;
                 }

               });
            }
        };//controller


          var formView = {
            init: function(){
              console.log('form view inti');
              this.overLay = $('#dash-overlay');
              this.idControl = $('#did');
              this.nameControl = $('#dname');
              this.contactControl = $('#dcontact');
              this.alternatContactControl = $('#dalternate-contact');
              this.emailControl = $('#demail');
              this.qualificationControl = $('#dqualifications');
              this.addressControl = $('#daddress');
              this.userNameControl = $('#duser-name');
              this.passwordControl = $('#dpassword');
              //this.recoveryContactControl = $('#drecovery-contact');
              //this.recoveryEmailControl = $('#drecovery-email');
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
                      }
                    }
                  },
                  dalternatecontact :{

                    validators : {
                      notEmpty :{
                        message : 'Please enter your alternte contact no'
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
                  ,      password :{

                    validators : {
                      notEmpty :{
                        message : 'Please enter your password'
                      }
                    }
                  }

                  , activeOptions :{

                    validators : {
                      notEmpty :{
                        message : 'please select an option'
                      }

                    }
                  }

                }
              });


              $('#btn-doc-reg-sumit').on('click', (function(controller){
                //console.log('handler added : ' + cat.Id);
                return function(){
                  //console.log('handler exec : ' + cat.Id);
                  console.log('doctor reg click submit');
                  //steps in saved
                  //update mode with info from the view
                  //persist the model i.e save update

                  formView.validator.on('success.form.bv',function(e){
                    e.preventDefault();

                    console.log('model value' + JSON.stringify(doctorModel) );
                    controller.updateModelFromView();

                   controller.saveDoctorAndRedirect();

                  });
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
              //this.recoveryContactControl.val(model.recoveryContact);
              //this.recoveryEmailControl.val(model.recoveryEmail);


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
