
function makeAppointmentController(){

  //initilizing the source typeahead
  //  $('#new-appointment-patients-name').typeahead({

  //  source: ['akhil','joseph','Agnelo','Ruban','Ronald','Sonia']
  //});


$("#revalidate").on('click',function(){
     console.log("patientlist intialized")

         //    $('#book-Appointment-Form').bootstrapValidator('revalidateField', 'newApptHeight');
});


  console.log('new appointment');

  var model = {
    appointment:{
      locationId: 0,
      date:moment().format('DD-MM-YYYY'),
      startTimeMins: '09:00 AM',
      endTimeMins:0,
      contact:'', //contact of the patient in appointment could change
      description:'',
    },
    patient:{
      id:0,
      name:'',
      dateOfBirth:'',
      gender:0,
      height: '',
      weight:'',
      bloodGroup:'',
      contact: ''
    },
    patientList:[],
    locationList:[],
    appointmentTimes: [{id:10, name:'10 mins'}, {id:15, name:'15 mins'}, {id:20, name:'20 mins'}]
  };

  function mainController(){
    this.getLocationUrl = links.getLocationUrl;
    this.bookAppointmentUrl = links.bookAppointmentUrl;
    this.getPatientsForAutoFillUrl = links.getPatientsForAutoFillUrl;
  };

  mainController.prototype.setCompleteEventHandler = function (pcallback) {
    this.completeCallback = pcallback;
  };

  mainController.prototype.getAppointmentLocationId = function () {
    return model.appointment.locationId;
  };

  mainController.prototype.getLocationList = function() {
    return model.locationList;
  };

  mainController.prototype.getAppointmentTimes = function(){
    return model.appointmentTimes;
  };

  mainController.prototype.getAppointmentModel = function () {
    return model.appointment;
  };

  mainController.prototype.getPatientModel = function () {
    return model.patient;
  };

  mainController.prototype.getPatientsList = function () {
    return model.patientList;
  };

  mainController.prototype.init = function (initObj) {

    console.log('init Obj' + JSON.stringify(initObj));
    appointmentView.init();


    //getting work locations for the doctor
    if(initObj){
      model.appointment.date = initObj.appointmetDate;
      model.appointment.startTimeMins = initObj.appointmentTime;

      model.locationList = initObj.locationList;
      model.appointment.locationId = initObj.locationId;

      appointmentView.render();

      model.patientList = initObj.patientList;
      //initilizing typeahead for patients name
      appointmentView.patientsName.typeahead({
        name: 'patients-name',
        source: model.patientList,
        updater: function(patient) {
          controller.TypeaheadSelectCallBack(patient);
          return patient;
        }
      });

      console.log('object passed ' + JSON.stringify(initObj));


    }else{
      $.get(links.getLocationUrl , {})
      .done(function( response ) {
        console.log('response ' + JSON.stringify(response));
        model.locationList = response.data;
        appointmentView.render();
      });

      $.get(this.getPatientsForAutoFillUrl , {})
      .done(function( response ) {
        console.log('patients ' + JSON.stringify(response));

        if(response.status == 1){
          model.patientList = response.data;

          //initilizing typeahead for patients name
          appointmentView.patientsName.typeahead({
            name: 'patients-name',
            source: model.patientList,
            updater: function(patient) {

              controller.TypeaheadSelectCallBack(patient);
              return patient;
            }
          });

        }

      });

    }






  }

  mainController.prototype.resetPatientModel = function () {
    model.patient = {
      id:0,
      name:'',
      dateOfBirth:'',
      gender:1,
      height: '',
      weight:'',
      bloodGroup:'',
      contact: ''
    };

    appointmentView.renderPatientsView();

  };

  mainController.prototype.TypeaheadSelectCallBack = function (patient) {
     this.revalidate = 1;
      if (typeof(revalidate) !== 1)
      {
          console.log("patientlist intialized success");
         // $('#book-Appointment-Form').bootstrapValidator('revalidateField', 'newApptHeight');
      }


    console.log('set patient model' + JSON.stringify(patient));
    model.patient.id = patient.id;
    model.patient.name = patient.name;
    model.patient.dateOfBirth = patient.dateOfBirth;
    model.patient.gender = patient.gender;
    model.patient.height = patient.height;
    model.patient.weight = patient.weight;
    model.patient.bloodGroup = patient.bloodGroup;
    model.patient.contact = patient.contact;
    appointmentView.renderPatientsView();
  };

  mainController.prototype.updateModelFromview = function () {
    //getting the selected location id
    var selectedOption = appointmentView.locationSelect.find(":selected");
    var locId = selectedOption.attr('value');

    model.appointment.locationId = locId;

    model.appointment.date =  appointmentView.appointmentDate.val();

    var mStartTime = moment(appointmentView.appointmentTime.val(), "hh:mm A");

    model.appointment.startTimeMins = mStartTime.hours()*60 + mStartTime.minutes();

    var durationOption = appointmentView.appointmentDurationSelect.find(":selected");
    var endMins = durationOption.attr('value');

    model.appointment.endTimeMins = +model.appointment.startTimeMins + +endMins;
    model.appointment.contact = appointmentView.contact.val();
    model.appointment.description = appointmentView.descrip.val();

    //console.log('description ' + appointmentView.descrip.val());


    //patient properties
    model.patient.name = appointmentView.patientsName.val();
    model.patient.dateOfBirth = appointmentView.patientsDOB.val();

    if(appointmentView.rbMale.is(":checked")){
      model.patient.gender = 1;
    }else{
      model.patient.gender = 0;
    }


    model.patient.height = appointmentView.patientsHeight.val();
    model.patient.weight = appointmentView.patientsWeight.val();
    model.patient.bloodGroup = appointmentView.patientsBloodGroup.val();
    model.patient.contact = appointmentView.contact.val();

  };

  mainController.prototype.bookAppointment = function(){
    //getting work locations for the doctor

    $.post(this.bookAppointmentUrl , {appointment: model.appointment, patient: model.patient})
    .done(function( response ) {
      console.log('response ' + JSON.stringify(response));
      if(response.status == 1){
        console.log('appointmetn added success fully');
        //todayAppointmentListView.newAppointmentModal.modal('hide');
        //update the location list with new values
        appointmentView.alertSuccess.removeClass('hidden');

      }else if(response.status == 2){
        appointmentView.alertNoScheduleOrTimingOustideWorkTiming.removeClass('hidden');
        console.log('schedule not added or timimgs dont match');

      }else if(response.status == 3){
        appointmentView.alertTimingClash.removeClass('hidden');
        console.log('timimng clash with existign appointment');
      }

      controller.completeCallback(response);
    });
  };



  var appointmentView = {
    init: function(){
      this.locationSelect = $('#sel-locations');
      this.appointmentDate = $('#new-appointment-date');
      this.appointmentTime = $('#new-appointment-time');
      this.appointmentDurationSelect = $('#sel-appointment-duration');
      this.patientsName = $('#new-appointment-patients-name');
      this.patientsDOB = $('#book-appointment-dob');
      this.rbMale = $('#new-appointment-rb-male');
      this.rbFemale = $('#new-appointment-rb-female');
      this.patientsHeight = $('#patient-height');
      this.patientsWeight = $('#patient-weight');
      this.patientsBloodGroup = $('#patient-blood-group');
      this.contact = $('#book-appointment-contact');
      this.descrip = $('#book-appointment-description');
      this.bookApptModal = $("#book-appointment-modal");
      this.bookApptclear = $("#book-appointment-clear");

      this.appointmentDate.val('');
      this.appointmentTime.val('');
      this.patientsName.val('');
      this.patientsDOB.val('');
      this.rbMale.attr('checked', true);
      this.rbFemale.attr('checked', false);
      this.patientsHeight.val('');
      this.patientsWeight.val('');
      this.patientsBloodGroup.val('');
      this.contact.val('');
      this.descrip.val('');

      //alerts
      this.alertNoScheduleOrTimingOustideWorkTiming = $('#book-appointment-no-schedule');
      this.alertTimingClash = $('#book-appointment-timings-clash');
      this.alertSuccess  = $('#book-appointment-before-submit-success');

      this.saveButton = $('#book-appointment-button');


      //unbinding events
      this.saveButton.off();
      this.patientsName.off("click change keyup select");

      this.patientsName.on("click change keyup select", function (event) {

        var value = appointmentView.patientsName.val();
        if(!value || 0 === value.trim().length){
            console.log('clear the patient data');
            controller.resetPatientModel();
        }

      });

      this.validator =   $("#book-Appointment-Form").bootstrapValidator({
        trigger:" focus blur",
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok ',
          invalid: 'glyphicon glyphicon-remove ',
          validating: 'glyphicon glyphicon-refresh'
        },
          excluded: [':disabled'],
        fields:{
          newBookSelLocations : {
            validators : {
              notEmpty : {
                message : 'Please select location!'
              }
            }

          },

          bloodgroup : {

            validators : {
              notEmpty : {
                message : 'please blood group is required'
              },
              stringLength : {
                min : 6,
                max : 35,
                message : 'please dont put characters more than 6 or 35'
              }

            }
          },
          newAppointmentDate : {
            validators : {
              notEmpty :{
                message : 'Please select date'
              }
            }
          },
          newSelApptDuration :{

            validators : {
              notEmpty :{
                message : 'Please Select the duration'
              }
            }
          }
          , newBookusername :{

            validators : {
              notEmpty :{
                message : 'Please Enter Patients name'
              },
                regexp: {
                        regexp: /^[A-Za-z\s.\(\)0-9]{3,}$/,
                        message: 'The full name can consist of alphabetical characters and spaces only'
                    }
            }
          }

          , bookApptDob :{

            validators : {
              notEmpty :{
                message : 'Please Select the duration'
              }
            }
          }
          ,  newApptgender :{

            validators : {
              notEmpty :{
                message : 'Please select patients gender'
              }
            }
          }
          , newApptHeight :{

            validators : {
              notEmpty :{
                message : 'Please select patients height'
              }
            }
          }
          ,      newbookWeight :{

            validators : {
              notEmpty :{
                message : 'Please select patients Weight'
              }
            }
          }


          , newApptbloodgroup :{

            validators : {
              notEmpty :{
                message : 'Please enter patients blood group'
              },
                 regexp: {

                        regexp: /(A|B|AB|O)[+-]/,
                        message: 'Please enter a proper blood group'
                    }

            }
          }

          , newApptContact :{

            validators : {
              notEmpty :{
                message : 'Please enter Patients contact no'
              }

            }
          }

          ,  newApptaddress :{

            validators : {
              notEmpty :{
                message : 'Please enter the address'
              }
            }
          }

        }
      });
      //intilizing the date and time controls
      this.appointmentDate.datetimepicker({
        inline: false,
        format:'DD-MM-YYYY'
      });

      this.appointmentTime.datetimepicker({
        inline: false,
        format : "LT"
      });

      this.patientsDOB.datetimepicker({
        inline: false,
        format:'DD-MM-YYYY'
      });

      this.bookApptclear.on('click',function(){


           $(appointmentView.bookApptModal).find('form')[0].reset();
          $('#book-Appointment-Form').bootstrapValidator("resetForm",true);
      });
      this.bookApptModal.on('hidden.bs.modal', function () {

            $(appointmentView.bookApptModal).find('form')[0].reset();
          $('#book-Appointment-Form').bootstrapValidator("resetForm",true);




      })

      this.saveButton.click(function(){
        appointmentView.validator.on('success.form.bv',function(e){
          e.preventDefault();

          console.log('book appointment');
          controller.updateModelFromview();
          controller.bookAppointment();


        });

      });


    },
    render: function(){
      console.log('render view');

      //hiding the alerts
      this.alertNoScheduleOrTimingOustideWorkTiming.addClass('hidden');
      this.alertTimingClash.addClass('hidden');
      this.alertSuccess.addClass('hidden');

      var locList = controller.getLocationList();

      //console.log(JSON.stringify(locList));
      //initilizing location list
      this.locationSelect.empty();

      this.locationSelect.append($('<option/>', {
        value: '',
        text: 'select'
      }));

      for(var i = 0; i < locList.length; i++){

        console.log('loop');

        var option = $('<option/>', {
          value: locList[i].id,
          text: locList[i].name
        });

        this.locationSelect.append(option);

      }

      this.locationSelect.val(controller.getAppointmentLocationId());

      //initilizign time duration list
      var timeList = controller.getAppointmentTimes();
      this.appointmentDurationSelect.empty();

      this.appointmentDurationSelect.append($('<option/>', {
        value: '',
        text: 'select'
      }));

      for(var i = 0; i < timeList.length; i++){

        console.log('loop');
        //make 15 mins as default option

        var option = $('<option/>', {
          value: timeList[i].id,
          text: timeList[i].name
        });

        this.appointmentDurationSelect.append(option);

      }

      this.appointmentDurationSelect.val(15);


      //initilize patients typeahead
      //  var patientsList = controller.getPatientsList();


      var appoint = controller.getAppointmentModel();

      this.appointmentDate.val(appoint.date);
      this.appointmentTime.val(appoint.startTimeMins);

      this.descrip.val(appoint.description);

    },
    renderPatientsView: function(){
      var patient = controller.getPatientModel();
      console.log('render  patient ' + JSON.stringify(patient));

      this.patientsName.val(patient.name);
      this.patientsDOB.val(patient.dateOfBirth);

      if(patient.gender == 1){
        this.rbMale.attr('checked', true);
        this.rbFemale.attr('checked', false);
      }else{
        this.rbMale.attr('checked', false);
        this.rbFemale.attr('checked', true);
      }

      this.patientsHeight.val(patient.height);
      this.patientsWeight.val(patient.weight);
      this.patientsBloodGroup.val(patient.bloodGroup);
      this.contact.val(patient.contact);

    }
  };

  var controller = new mainController();

  return controller;

};
