$(document).ready(function(){

    $(function(){
        console.log('patient entry js loaded');

        var model = {
          patient: {
            id:0,
            name:"",
            dateOfBirth: "",
            bloodGroup:"",
            weight:"",
            height:"",
            gender:"1",
            contact1:"",
            contact2:"",
            address: "",
            isGuardian: 0,
            guardianId: 0
          }
        };

        var controller = {
          init :function(){
            this.patientDetailPersistUrl ="index.php/addUpdatePatient";
            this.patientsDetailsUrl = "index.php/getPatientDetails";
            this.loginCheckUrl = "index.php/isLoggedIn";
            this.getProgrammeList = "index.php/getMedicationProgrammeList";
            patientDetailsView.init();
            patientGuardianDetailsView.init();
            patientBirthDetailsView.init();
            patientProgrammeView.init();

            $.post( controller.loginCheckUrl , {})
             .done(function( response ) {
               console.log("login check patient: " + JSON.stringify(response));

                           $.get( controller.getProgrammeList , {id: response.data.id})
                            .done(function( response ) {
                              console.log("programme list: " + JSON.stringify(response));

                            });
             });


            ///check is the url has a id
            var patientId = utility.getURLParam('id');

            if(patientId){
              //this is a update patients entry
              console.log('patient Id ' + patientId);

              $.get( controller.patientsDetailsUrl , {id:patientId})
               .done(function( response ) {
                 console.log(JSON.stringify(response));
                 model.patient = response.data.patient;
                 patientDetailsView.render();

               });

            }else{
                //if this is a new patients entry
                patientDetailsView.render();
            }

            patientDetailsView.tab.trigger('click');

          },
          getPatientModel: function(){
            return model.patient;
          },
          getUpdatedPatientModelFromView: function(){

            model.patient.name = patientDetailsView.name.val();
            var dateOfBirth = moment(patientDetailsView.dateOfbirth.val(), "YYYY-MM-DD");
            model.patient.dateOfBirth = dateOfBirth.format('DD-MM-YYYY');
            console.log('getting date ' + model.patient.dateOfBirth);
            model.patient.bloodGroup = patientDetailsView.bloodGroup.val();
            model.patient.weight = patientDetailsView.weight.val();
            model.patient.height = patientDetailsView.height.val();
            model.patient.gender  = patientDetailsView.rbMale.val();

            if(patientDetailsView.rbMale.is(":checked")){
              model.patient.gender = 1;
            }else{
              model.patient.gender = 0;
            }

            model.patient.contact1 = patientDetailsView.contact1.val();
            model.patient.contact2 = patientDetailsView.contact2.val();
            model.patient.address = patientDetailsView.address.val();

            //model.patient. = patientDetailsView.picUpload;

            return model.patient;

          },
          persistPatient: function(){

            $.post( controller.patientDetailPersistUrl , model.patient)
             .done(function( response ) {
               console.log(JSON.stringify(response));
             });
          }
        };

        var patientDetailsView = {
          init: function(){
            this.tab = $('#patients-entry-link');
            this.name = $('#patient-name');
            this.dateOfbirth = $('#patient-date-of-birth');
            this.bloodGroup = $('#patient-blood-group');
            this.weight = $('#patient-weight-input');
            this.height = $('#patient-height');
            this.rbMale = $('#rb-male');
            this.rbFemale = $('#rb-female');
            this.contact1 = $('#patient-contact1');
            this.contact2 = $('#patient-contact2');
            this.address = $('#patient-address');
            this.picUpload =$('#patient-picture');

            $('#patient-save-button').click(function(){
              console.log('patient click');

              var model = controller.getUpdatedPatientModelFromView();
              console.log('save click' + JSON.stringify(model));

              controller.persistPatient();

            });

            //this.tab.hide();
          },
          render: function(){

            var model = controller.getPatientModel();

            this.name.val(model.name);
            var dateOfBirth = moment(model.dateOfBirth, 'DD-MM-YYYY');
            console.log('dob model' + model.dateOfBirth);
            this.dateOfbirth.val(dateOfBirth.format('YYYY-MM-DD'));
            console.log('dob' + dateOfBirth.format('YYYY-MM-DD'));
            this.bloodGroup.val(model.bloodGroup);
            this.weight.val(model.weight);
            this.height.val(model.height);
            this.contact1.val(model.contact1);
            this.contact2.val(model.contact2);
            this.address.val(model.address);
            //this.picUpload.val(model.);


            if(model.gender == 1){
              this.rbMale.prop('checked', true);
              this.rbFemale.prop('checked', false);
            } else{
              this.rbMale.prop('checked', false);
              this.rbFemale.prop('checked', true);

            }

          }
        };

        var patientGuardianDetailsView = {
          init: function(){
            this.tab = $('#guardian-entry-link');


          },
          render: function(){

          }
        }

        var patientBirthDetailsView = {
          init: function(){
            this.tab = $('#birth-entry-link');


          },
          render: function(){

          }
        }

        var patientProgrammeView = {
          init: function(){
            this.tab = $('#patients-programme-link');
            this.programmeSelect = $('#')
          },
          render: function(){

          }
        };

        controller.init();

    }());

});
