function getCancelAppointmentController(){

  console.log('cancel appointment form');

  var model = {
    appointmentId: 0
  }

  var controller = {
    init: function(appointmentInfo){
      this.cancelAppointmentUrl = links.cancelAppointmentUrl;
      if(appointmentInfo){
        model.appointmentId = appointmentInfo.id;
      }
      cancelView.init();

    },
    setCancelCallback: function(callbackFunction){
      this.cancelCallback = callbackFunction;
    },
    cancelAppointment: function(){

      var cancelReason = cancelView.cancelReason.val();
      $.post( this.cancelAppointmentUrl , {id: model.appointmentId, remarks: cancelReason})
       .done(function( response ) {

         if(controller.cancelCallback){
           controller.cancelCallback(response);
         }

         console.log('cancel response ' + JSON.stringify(response));
         //close in proper resonse, else dsplay messge the appoitmetn could not be compated
       });
    }

  };

  var cancelView = {

    init: function(){
      this.cancelReason = $('#cancel-appointment-reason');
      this.cancelButton =  $('#cancel-appointment-btn');

        this.validator =   $("#timeline-cancel-form").bootstrapValidator({
        trigger:" focus blur",
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok ',
          invalid: 'glyphicon glyphicon-remove ',
          validating: 'glyphicon glyphicon-refresh'
        },
          excluded: [':disabled'],
        fields:{
          address : {
            validators : {
              notEmpty : {
                message : 'Please Enter Description!'
              }
            }

          }


        }
      });
         $('#cancel-appointment-modal-window').on('hidden.bs.modal', function () {

            $('#cancel-appointment-modal-window').find('form')[0].reset();
          $('#timeline-cancel-form').bootstrapValidator("resetForm",true);




      });



      this.cancelReason.val('');

      this.cancelButton.off();
      this.cancelButton.on('click', function(){
          cancelView.validator.on('success.form.bv',function(e){
          e.preventDefault();

          console.log('appointment cancelled');
         controller.cancelAppointment();


        });


      });

    },
    render: function(){

    }
  }

  return controller;

}
