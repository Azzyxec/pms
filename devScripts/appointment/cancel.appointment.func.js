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

      this.cancelReason.val('');

      this.cancelButton.off();
      this.cancelButton.on('click', function(){
        controller.cancelAppointment();
      });

    },
    render: function(){

    }
  }

  return controller;

}
