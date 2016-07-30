function getRescheduleAppointmentController(){

  console.log('reschedule appointment form');

  var model = {
    appointmentId: 0,
    date: '',
    startTimeMins:0,
    endTimeMins:0,
    remarks: ''
  }

  var ViewModel = {
                    appointmentTimes: [{id:5, name:'5 mins'}, {id:10, name:'10 mins'}, {id:15, name:'15 mins'}, {id:20, name:'20 mins'}, {id:30, name:'30 mins'}],
                    duration: 15
                  };

  var controller = {
    init: function(){
      this.allowSubmit = true;
      this.rescheleduAppointmentUrl = links.rescheduleAppointmentUrl;
      rescheduleView.init();
    },
    setInitInfo: function(info){

      if(info){
        model.appointmentId = info.appointmentId;
        rescheduleView.patientName.val(info.patientName);

        rescheduleView.render();
      }

    },
    reset: function(){

      model.appointmentId = 0;
      model.date = '';
      model.startTimeMins = 0;
      model.endTimeMins = 0;
      model.remarks = '';

      ViewModel.duration = 15;

      rescheduleView.patientName.val('');
      rescheduleView.appointmentDate.val(moment().format('DD-MM-YYYY'));
      rescheduleView.appointmentTime.val('');
      rescheduleView.selectApptDuration.val(ViewModel.duration);
      rescheduleView.rescheduleRemarks.val('');

      //reset validator
      rescheduleView.form.bootstrapValidator("resetForm", true);

    },
    setCallback: function(callbackFunction){
      this.callback = callbackFunction;
    },
    updateModelFromView: function(){

      model.date = rescheduleView.appointmentDate.val();

      var startTime = rescheduleView.appointmentTime.val();

      var mStartTime = moment(startTime, "hh:mm A");

      model.startTimeMins = mStartTime.hours()*60 + mStartTime.minutes();

      var selectedOption = rescheduleView.selectApptDuration.find(":selected");
      var endMins = selectedOption.attr('value');

      model.endTimeMins = +model.startTimeMins + +endMins;

      model.remarks = rescheduleView.rescheduleRemarks.val();

    },
    rescheduleAppointment: function(){

      if(this.allowSubmit){
        this.allowSubmit = false;
        $.post(this.rescheleduAppointmentUrl , {rescheduleInfo: model})
         .done(function( response ) {

           if(controller.callback){
             controller.callback(response);
           }

           if(response.status == 2){
            utility.getAlerts("Appointment could not be rescheduled either because timings clash with existing appointment or there is no schedule","alert-warning","",".modal-body");
             console.log('message that appointment could not be rescheduled');
           }

           console.log('reschedule response ' + JSON.stringify(response));
         }).always(function () {
           console.log('always after calls');
           controller.allowSubmit = true;
         });
      }

      }



  };

  var rescheduleView = {

    init: function(){
      this.form =$('#modal-reschedule-form');
      this.patientName = $('#modal-reschedule-patients-name');
      this.appointmentDate = $('#modal-reschedule-appt-date');
      this.appointmentTime = $('#modal-reschedule-appt-time');
      this.selectApptDuration = $('#modal-reschedule-duration-sel');
      this.rescheduleRemarks =  $('#modal-reschedule-remarks');
      this.rescheduleButton = $('#btn-modal-reschedule-appt');

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

      this.rescheduleButton.on('click', function(){
        console.log('reschedule button click');

        rescheduleView.form.data('bootstrapValidator').validate();
        if(rescheduleView.form.data('bootstrapValidator').isValid()){

          controller.updateModelFromView();
          console.log('model ' + JSON.stringify(model));
          controller.rescheduleAppointment();

        }



      });

      this.initValidators();

    },
    initValidators: function(){
      this.form.bootstrapValidator({
          trigger:"focus click change keyup select blur",
          feedbackIcons: {
            valid: 'glyphicon glyphicon-ok ',
            invalid: 'glyphicon glyphicon-remove ',
            validating: 'glyphicon glyphicon-refresh'
          },
            excluded: [':disabled'],
          fields:{
            rescheduleDate : {
              validators : {
                notEmpty : {
                  message : 'Please select a date'
                }
              }
            },
            rescheduleTime : {

              validators : {
                notEmpty : {
                  message : 'please select time'
                }
              }
            },
            rescheduleRemarks :{
              validators : {
                notEmpty :{
                  message : 'Please enter a remark'
                }
              }
            }

          }
        });


    },
    render: function(){

      var times = ViewModel.appointmentTimes;

      this.selectApptDuration.empty();

      for(var i = 0; i < times.length; i++){

        console.log('loop');

        var option = $('<option/>', {
          value: times[i].id,
          text: times[i].name
        });

        this.selectApptDuration.append(option);

      }

      this.selectApptDuration.val(ViewModel.duration);

    }
  }

  return controller;

}
