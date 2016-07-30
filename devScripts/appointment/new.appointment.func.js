
function makeAppointmentController(){

  console.log('new appointment');

  var model = {
    appointment:{
      scheduleDayId: 0,
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
      bloodGroup:'-',
      contact: ''
    },
    userInfo:{},
    patientList:[],
    locationList:[],
    appointmentTimes: [{id:5, name:'5 mins'}, {id:10, name:'10 mins'}, {id:15, name:'15 mins'}, {id:20, name:'20 mins'}, {id:30, name:'30 mins'}],
    bloodGroups:['-','A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
  };

  function mainController(){
    this.allowSubmit = true;
    this.getLocationUrl = links.getLocationUrl;
    this.bookAppointmentUrl = links.bookAppointmentUrl;
    this.getPatientsForAutoFillUrl = links.getPatientsForAutoFillUrl;
  };

  mainController.prototype.getBloodGroups = function () {
    return model.bloodGroups;
  };

  mainController.prototype.getUserInfo = function () {
    return model.userInfo;
  };

  mainController.prototype.setPatientId = function (id) {
    model.patient.id = id;
    console.log('setting patient id ' +   model.patient.id );
  };

    mainController.prototype.getPatientId = function () {
      console.log('getting patient id ' + model.patient.id);
      return model.patient.id;
    };

    mainController.prototype.setPatientName = function (name) {
      model.patient.name = name;
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

    //console.log('init Obj' + JSON.stringify(initObj));
    appointmentView.init();

    //getting work locations for the doctor
    if(initObj){

      console.log('init booking data');


      model.appointment.scheduleDayId = initObj.scheduleDayId;

      model.appointment.date = initObj.appointmetDate;
      model.appointment.startTimeMins = initObj.appointmentTime;

      model.locationList = initObj.locationList;
      model.appointment.locationId = initObj.locationId;

      console.log('inti userInfo ' + JSON.stringify(initObj.userInfo));

      model.userInfo = initObj.userInfo;

      //resetting fields
      model.appointment.description = "";
      controller.resetPatientInfo();

      appointmentView.render();

      model.patientList = initObj.patientList;

      //focus click change keyup select blur

      //initilizing typeahead for patients name
      //appointmentView.patientsName.typeahead("destroy");
      appointmentView.patientsName.typeahead({
        name: 'patients-name',
        source: model.patientList,
        updater: function(patientObj) {
          console.log('type ahead call back for ' + JSON.stringify(patientObj));
          controller.TypeaheadSelectCallBack(patientObj);

          return patientObj.oName;
        }
      });

      appointmentView.initValidators();

      //rewiring the events
      appointmentView.patientsName.on("change click keyup select blur ", appointmentView.patientEventsCallback);

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
          appointmentView.patientsName.typeahead("destroy");
          appointmentView.patientsName.typeahead({
            name: 'patients-name',
            source: model.patientList,
            updater: function(patient) {
              console.log('type ahead call back for ' + patient.id );
              controller.TypeaheadSelectCallBack(patient);
              return patient;
            }
          });

        }

      });

    }
  }

  mainController.prototype.cleanup = function () {
    appointmentView.patientsName.off("focus click change keyup select blur");
    appointmentView.patientsName.typeahead("destroy");
    //appointmentView.form.bootstrapValidator.destroy();

  };

 mainController.prototype.resetPatientModel = function () {

       model.patient.id = 0;
       model.patient.name = '';
       model.patient.dateOfBirth = '';
       model.patient.gender = 1;
       model.patient.height = '';
       model.patient.weight = '';
       model.patient.bloodGroup = '-';
       model.patient.contact = '';
 };

  mainController.prototype.resetPatientInfo = function () {
    console.log("model reset at " + moment().format("HH:mm:ss SSS"));

    //var patientModel  = this.getPatientModel();

    this.resetPatientModel();

    appointmentView.renderPatientsView();
    appointmentView.enablePatientEditing(true);

  };

  mainController.prototype.TypeaheadSelectCallBack = function (patientObj) {

    controller.setPatientId(patientObj.id);
    model.patient.name = patientObj.name;
    model.patient.dateOfBirth = patientObj.dateOfBirth;
    model.patient.gender = patientObj.gender;
    model.patient.height = patientObj.height;
    model.patient.weight = patientObj.weight;
    model.patient.bloodGroup = patientObj.bloodGroup;
    model.patient.contact = patientObj.contact;

    appointmentView.renderPatientsView();

  };

  mainController.prototype.updateModelFromview = function () {
    //getting the selected location id
    console.log("update model from view for " + controller.getPatientId() + ' at ' + moment().format("HH:mm:ss SSS"));

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
    controller.setPatientId(appointmentView.hiddenInputId.val());

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

    if(controller.allowSubmit){

      controller.allowSubmit = false;

      var patientModel  = this.getPatientModel();
      //patientModel.id = controller.getPatientId();

      console.log('posting patient data at ' + moment().format("HH:mm:ss SSS") +  ' ' +JSON.stringify(patientModel));

        //appointmentView.patientsName.off("click change keyup select blur");

      $.post(this.bookAppointmentUrl , {appointment: model.appointment, patient: patientModel})
      .done(function( response ) {
        console.log('response at ' + moment().format("HH:mm:ss SSS") +  ' ' + JSON.stringify(response));

        //appointmentView.patientsName.on("click change keyup select blur", appointmentView.patientsNameCallback);

        if(response.status == 1){
          console.log('appointmetn added success fully');
          controller.resetPatientInfo();
          //todayAppointmentListView.newAppointmentModal.modal('hide');
          //update the location list with new values
          utility.getAlerts("Appointments booked successfully, please try refresh the page if you cannot see the appointment","alert-success text-center",'','.modal-body');
          //may be can return the id of the newly added patient, to update the patient model

        }else if(response.status == 2){
          utility.getAlerts("Schedule not added or timimgs dont match!, please check the schedules timmings or try refreshing the page","alert-warning text-center",'','.modal-body');

          console.log('schedule not added or timimgs dont match');

        }else if(response.status == 3){
            utility.getAlerts("timimng clash with existign appointment, please try refreshing","alert-warning text-center",'','.modal-body');

          console.log('timimng clash with existign appointment');
        }else if(response.status == 4){
          utility.getAlerts("cannot book a backdated appointment","alert-warning text-center",'','.modal-body');
          console.log('cannot book a backdated appointment');
        }


        controller.completeCallback(response);
      }).always(function () {
        console.log('always after calls');
        controller.allowSubmit = true;

      });

    }
  };



  var appointmentView = {
    init: function(){
      this.form = $("#book-Appointment-Form");
      this.locationSelect = $('#sel-locations');
      this.appointmentDate = $('#new-appointment-date');
      this.appointmentTime = $('#new-appointment-time');
      this.appointmentDurationSelect = $('#sel-appointment-duration');
      this.hiddenInputId = $('#patients-id');
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

      var userInfo = model.userInfo;
      console.log('userInfo ' + JSON.stringify(model.userInfo));
      if(userInfo && userInfo.type == 'S'){
        this.locationSelect.attr('disabled', 'disabled');
      }else{
        this.locationSelect.removeAttr('disabled');
      }

      this.appointmentDate.val('');
      this.appointmentTime.val('');

      //alerts
      this.alertNoScheduleOrTimingOustideWorkTiming = $('#book-appointment-no-schedule');
      this.alertTimingClash = $('#book-appointment-timings-clash');
      this.alertSuccess  = $('#book-appointment-before-submit-success');
      this.backdatedBooking  = $('#book-appointment-backdated');

      this.saveButton = $('#book-appointment-button');

      //unbinding  events from previous call
      this.saveButton.off('click');

      //unbinding events from previous cancelledList
      //and binding events for validations

      this.patientEventsCallback = function(){

          var name = appointmentView.patientsName.val();
          name = name.trim();

          //if the patient name is not found in the patients list, then enable editing of the controls
          if(!name || 0 === name.length){
              console.log('reset patient model');
              controller.resetPatientInfo();
          }else if(name.length > 0) {

            var patientsList = controller.getPatientsList();

            var containsName = false;

            for(var i = 0; i < patientsList.length; i++){
              if(patientsList[i].oName === name){
                containsName = true;
                break;
              }
            }

            //console.log('contains '  + containsName);
            if(!containsName){
              //if there is name not contained in the list
              //clear the fields except name
              // to allow a new new entry
              controller.resetPatientModel();
              controller.setPatientName(name);
              appointmentView.renderPatientsView ();
              appointmentView.enablePatientEditing(true);
            }

          }

          appointmentView.form.bootstrapValidator('revalidateField', 'bookApptDob');
          appointmentView.form.bootstrapValidator('revalidateField', 'newApptContact');
          appointmentView.form.bootstrapValidator('revalidateField', 'newApptgender');
          appointmentView.form.bootstrapValidator('revalidateField', 'newBookusername');

        };

      //intilizing the date and time controls
      this.appointmentDate.datetimepicker({
        inline: false,
        format:'DD-MM-YYYY',
         minDate: moment()

      });

      this.appointmentTime.datetimepicker({
        inline: false,
        format : "LT"
      });

      this.patientsDOB.datetimepicker({
        inline: false,
        format:'DD-MM-YYYY',
        maxDate: new Date()
      });

      this.bookApptclear.on('click',function(){

        appointmentView.enablePatientEditing(true);
        $(appointmentView.bookApptModal).find('form')[0].reset();

        appointmentView.form.bootstrapValidator("resetForm",true);

        //setting default values to controls after resetting
        appointmentView.rbMale.prop('checked', true);
        appointmentView.patientsBloodGroup.val('-');

        appointmentView.locationSelect.val(model.appointment.locationId);

        console.log(JSON.stringify(model.appointment));

      });

      this.bookApptModal.on('hidden.bs.modal', function () {

      $(appointmentView.bookApptModal).find('form')[0].reset();
          $('#book-Appointment-Form').bootstrapValidator("resetForm",true);

      });

      this.saveButton.click(function(){

        appointmentView.form.data('bootstrapValidator').validate();
        if(appointmentView.form.data('bootstrapValidator').isValid()){
          console.log('validated');
          controller.updateModelFromview();
          controller.bookAppointment();
        } else{
          console.log('invalid');
        }

      });

       $('.pms-alerts').remove();


    },
    initValidators: function(){

      this.contact.prop('maxlength', 15);

      this.form.bootstrapValidator({
        trigger:" focus click change keyup select blur ",
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
          },
          newBookusername :{

            validators : {
              notEmpty :{
                message : 'Please enter patients name'
              }
            }
          },
          bookApptDob :{

            validators : {
              notEmpty :{
                message : 'Please Select the date of birth'
              }
            }
          },
          newApptgender :{

            validators : {

            }
          },
          newApptHeight :{

            validators : {
              numeric :{
                message : 'Please enter numbers',
                separator: ','
              }
            }
          },
          newbookWeight :{

            validators : {
              numeric :{
                message : 'Please enter numbers',
                separator: ','
              }
            }
          },
          newApptContact :{

            validators : {
              notEmpty :{
                message : 'Please enter Patients contact no'
              },
              regexp: {
                regexp: /^\+?[0-9()-\s]+$/,
                message: 'The value is not valid phone number'
              }

            }
          },
          newApptaddress :{

            validators : {
              notEmpty :{
                message : 'Please enter some description'
              }
            }
          }

        }
      });

    },
    render: function(){
      console.log('render view');

      //hiding the alerts
      this.alertNoScheduleOrTimingOustideWorkTiming.addClass('hidden');
      this.alertTimingClash.addClass('hidden');
      this.alertSuccess.addClass('hidden');
      this.backdatedBooking.addClass('hidden');

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

        //make 15 mins as default option

        var option = $('<option/>', {
          value: timeList[i].id,
          text: timeList[i].name
        });

        this.appointmentDurationSelect.append(option);

      }

      var bloodGroupList = controller.getBloodGroups();

      this.patientsBloodGroup.empty();

      for(var i = 0; i < bloodGroupList.length; i++ ){
        var option = $('<option/>', {
          value: bloodGroupList[i],
          text: bloodGroupList[i]
        });

        this.patientsBloodGroup.append(option);
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

      //appointmentView.patientsName.off("click change keyup select blur");

      var patient = controller.getPatientModel();
      console.log('render  patient ' + controller.getPatientId() + '  at  ' + moment().format("HH:mm:ss SSS")); // + JSON.stringify(patient));

      this.hiddenInputId.val(controller.getPatientId());
      //this.patientsName.val(patient.name);
      this.patientsDOB.val(patient.dateOfBirth);


      console.log('gender ' + patient.gender);
      if(patient.gender == 1){
        this.rbMale.prop('checked', true);
        //this.rbFemale.removeAttr('checked');
      }else{
        //this.rbMale.removeAttr('checked');
        this.rbFemale.prop('checked', true);
      }

      this.patientsHeight.val(patient.height);
      this.patientsWeight.val(patient.weight);
      this.patientsBloodGroup.val(patient.bloodGroup);
      this.contact.val(patient.contact);

      //appointmentView.patientsName.on("click change keyup select blur", appointmentView.patientsNameCallback);

      //var patientsList = controller.getPatientsList();

      //appointmentView.patientsName.on("click change keyup select blur",(function(patientsList){
      //  return appointmentView.patientsNameCallback(patientsList);
      //})(patientsList));

      //revalidate patients before disabling controls
      //appointmentView.form.bootstrapValidator('revalidateField', 'bookApptDob');
      //appointmentView.form.bootstrapValidator('revalidateField', 'newApptContact');
      //appointmentView.form.bootstrapValidator('revalidateField', 'newApptgender');

      this.enablePatientEditing(false);

    },
    enablePatientEditing: function(enable){
      if(enable){

        this.patientsDOB.removeAttr('readonly');

        this.rbMale.removeAttr('disabled');
        this.rbFemale.removeAttr('disabled');

        this.patientsHeight.removeAttr('readonly');
        this.patientsWeight.removeAttr('readonly');
        this.patientsBloodGroup.removeAttr('disabled');
        //this.contact.removeAttr('disabled');

      }else{
        //disable patients controls to prevent editing
        this.patientsDOB.prop('readonly', true);

        this.rbMale.prop('disabled', true);
        this.rbFemale.prop('disabled', true);

        this.patientsHeight.prop('readonly', true);
        this.patientsWeight.prop('readonly', true);
        this.patientsBloodGroup.prop('disabled', true);
        //this.contact.attr('disabled', 'disabled');
      }
    }

  };

  var controller = new mainController();

  return controller;

};
