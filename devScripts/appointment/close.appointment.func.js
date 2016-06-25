function getCloseAppointmentController(){

  var model = {
    appointmentId: 0,
    closingDate: moment().format('DD-MM-YYYY'),
    closingTime: '',
    nextAppointmentDate:'',
    nextAppointmentTime:'',
    patientsName:'',
    remarks: '',
    prescriptionList:[] 
  }

  var controller = {
    init: function(initObj){

      this.closeAppointmentUrl = links.closeAppointmentUrl;

      if(initObj){
        model.appointmentId = initObj.appointmentId;
        model.closingTime = initObj.closingTime;
        model.patientsName = initObj.patientsName;
      }

      closeAppointmentView.init();
    },
    resetForm: function(){
      closeAppointmentView.resetForm();
    },
    getModel: function(){
      return model;
    },
    setCloseAppointmentCallback: function(callbackFunction){
          this.cancelCallback = callbackFunction;
    },
    updateModelFromView: function(){

      model.closingDate = closeAppointmentView.closingDatePicker.val();
      model.closingTime = closeAppointmentView.closingTimePicker.val();
      model.nextAppointmentDate = closeAppointmentView.nextAppointmentDatePicker.val();
      model.nextAppointmentTime = closeAppointmentView.nextAppointmentTimePicker.val();
      model.patientsName = closeAppointmentView.patientsName.val();
      model.remarks = closeAppointmentView.remarks.val();
    },
    closeAppointment: function(){

      this.updateModelFromView();

      $.post( this.closeAppointmentUrl , {appointment: model})
       .done(function( response ) {

         if(controller.cancelCallback){
           controller.cancelCallback(response);
         }

         console.log('close response ' + JSON.stringify(response));
         //close in proper resonse, else dsplay messge the appoitmetn could not be compated
       });
    }
  }

  var closeAppointmentView = {
    init: function() {
      this.form = $('#close-appointment-form');
      this.closingDatePicker = $('#close-appointment-date');
      this.closeDatePickerIcon = $('#close-appointment-date-icon');
      this.closingTimePicker = $('#close-appointment-time');
      this.closeTimePickerIcon = $('#close-appointment-time-icon');

      this.nextAppointmentDatePicker = $('#next-appointment-date');
      this.nextAppointmentDatePickerIcon = $('#next-appointment-date-icon');


      this.nextAppointmentTimePicker = $('#next-appointment-time');
      this.nextAppointmentTimePickerIcon = $('#next-appointment-time-icon');
      this.patientsName = $('#close-appointment-patients-name');
      this.prescriptionControl = $('#tokenfield');
      this.remarks = $('#close-appointment-remarks');
      this.closeAppointmentButton = $('#close-appointment-submit-btn');

      this.closingDatePicker.datetimepicker({
        inline:false,
        format:'DD-MM-YYYY'
      });

      this.closeDatePickerIcon.on('click', function(){
        console.log('click cal');
        closeAppointmentView.closingDatePicker.data('DateTimePicker').show();
      });

      this.closingTimePicker.datetimepicker({
        inline:false,
        format:'LT'
      });

      this.closeTimePickerIcon.on('click', function(){
        console.log('click cal');
        closeAppointmentView.closingTimePicker.data('DateTimePicker').show();
      });

      this.nextAppointmentDatePicker.datetimepicker({
        inline:false,
        format:'DD-MM-YYYY'
      });

      this.nextAppointmentDatePickerIcon.on('click', function(){
        console.log('click cal');
        closeAppointmentView.nextAppointmentDatePicker.data('DateTimePicker').show();
      });

      this.nextAppointmentTimePicker.datetimepicker({
        inline:false,
        format:'LT'
      });

      this.nextAppointmentTimePickerIcon.on('click', function(){
        console.log('click cal');
        closeAppointmentView.nextAppointmentTimePicker.data('DateTimePicker').show();
      });

      this.prescriptionControl.typeahead({
      source: ['Avil', 'Bcosules', 'Cough syrup', 'Crosin', 'Koflets']
       });

      this.prescriptionControl.tokenfield();

      this.prescriptionControl.on('tokenfield:createdtoken', function (e) {
          e.preventDefault();

          console.log('add prescription');
        // Über-simplistic e-mail validation
       // var re = /\S+@\S+\.\S+/
        //var valid = re.test(e.attrs.value)
        //if (!valid) {
          //$(e.relatedTarget).addClass('invalid')
        //}
      });

      var validator = this.initValidators();

      validator.on('success.form.bv',function(e){
          e.preventDefault();

         console.log("validating close appt")

        });

        this.closeAppointmentButton.on('click', function(){
          console.log('click submit');
          controller.closeAppointment();
        });

      this.render();

    },
    initValidators: function(){
      var validatorObj = this.form.bootstrapValidator({
          trigger:" focus blur",
          feedbackIcons: {
            valid: 'glyphicon glyphicon-ok ',
            invalid: 'glyphicon glyphicon-remove ',
            validating: 'glyphicon glyphicon-refresh'
          },
            excluded: [':disabled'],
          fields:{
            closingDate : {
              validators : {
                notEmpty : {
                  message : 'Please enter closing date!'
                }
              }

            },

            closingTime : {

              validators : {
                notEmpty : {
                  message : 'please enter closing time'
                }
              }
            },
            closeNextAppt : {
              validators : {
                notEmpty :{
                  message : 'please select the date for the next appointment'
                }
              }
            },
            closingNextApptTime :{

              validators : {
                notEmpty :{
                  message : 'Please Select the time for the next appointment'
                }
              }
            }
            , closingName :{

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

      //      , closingPrescpList :{

        //      validators : {
          //      notEmpty :{
            //      message : 'Please Enter the prescription'
            //    }
            //  }
          //  }
            ,  closingRemarks :{

              validators : {
                notEmpty :{
                  message : 'Please leave a remark'
                }
              }
            }

          }
        });

        return validatorObj;
    },
    resetForm: function(){
     //this.form.reset();
     this.form.bootstrapValidator("resetForm", true);
     this.closeAppointmentButton.off();
     //destroy typehad and token field

    },
    render: function(){
      var viewModel = controller.getModel();

      this.closingDatePicker.val(viewModel.closingDate);
      this.closingTimePicker.val( utility.getTimeFromMinutes(viewModel.closingTime));
      this.patientsName.val(viewModel.patientsName);

    }
  }

  return controller;

}
