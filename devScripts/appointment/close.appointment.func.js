function getCloseAppointmentController(){

  var model = {
    appointmentId: 0,
    closingDate: moment().format('DD-MM-YYYY'),
    closingTime: '',
    bookNextAppointment:false,
    nextAppointmentDate:'',
    nextAppointmentStartTime:'',
    nextAppointmentEndTime:15,
    patientsName:'',
    remarks: '',
    prescriptionList:[],
    currentEntry:{}
  }

  var ViewModel = {
                    appointmentTimes: [{id:5, name:'5 mins'}, {id:10, name:'10 mins'}, {id:15, name:'15 mins'}, {id:20, name:'20 mins'}, {id:30, name:'30 mins'}]
                  };

  var controller = {
    init: function(){
      this.allowSubmit = true;
      this.closeAppointmentUrl = links.closeAppointmentUrl;

      closeAppointmentView.init();
      prescriptionListController.init();
    },
    setCloseInfo: function(closeInfo){
      if(closeInfo){
        console.log('set info');
        model.appointmentId = closeInfo.appointmentId;
        model.closingTime = closeInfo.closingTime;
        model.patientsName = closeInfo.patientsName;
        closeAppointmentView.render();
      }
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

      model.patientsName = closeAppointmentView.patientsName.val();
      model.remarks = closeAppointmentView.remarks.val();


      model.nextAppointmentDate = closeAppointmentView.nextAppointmentDatePicker.val();

      //model.bookNextAppointment is updated on checkbox change event, so no need to updated it here
      if(model.bookNextAppointment){
        var nextApptStartTime = closeAppointmentView.nextAppointmentTimePicker.val();
        var mStartTime = moment(nextApptStartTime, "hh:mm A");
        model.nextAppointmentStartTime =  mStartTime.hours()*60 + mStartTime.minutes();

        //setting end minutes
        var durationOption = closeAppointmentView.nextAppointmentDuration.find(":selected");
        var endMins = durationOption.attr('value');

        model.nextAppointmentEndTime = +model.nextAppointmentStartTime + +endMins;

      }


    },
    resetModel: function(){
      prescriptionListController.setPrescriptionList([]);
      model.appointmentId = 0;
      model.closingDate =  moment().format('DD-MM-YYYY');
      model.closingTime = '';
      model.nextAppointmentDate = '';
      model.nextAppointmentStartTime = '';
      model.nextAppointmentEndTime = 15;
      model.patientsName = '';
      model.remarks = '';
      model.currentEntry = {};
    },
    closeAppointment: function(){



      if(controller.allowSubmit){

        controller.allowSubmit = false;

        $.post( this.closeAppointmentUrl , {appointment: model})
         .done(function( response ) {

           if(controller.cancelCallback){
             controller.cancelCallback(response);
           }

           controller.allowSubmit = true;

           console.log('close response ' + JSON.stringify(response));
           //close in proper resonse, else dsplay messge the appoitmetn could not be compated
         });
       }
    },
    cleanup: function(){
      this.resetModel();
      closeAppointmentView.resetvalidator();
      closeAppointmentView.resetFields();

      //update the prescription list in view
      prescriptionListView.render();
    }
  }

  var prescriptionListController = {
    init: function(){
      this.idCounter = 1;
      prescriptionListView.init();
    },
    addEntry: function(med, lremarks){
      this.idCounter = +this.idCounter + +model.prescriptionList.length;
      console.log( 'add entry' + model.currentEntry.id);
      if(model.currentEntry &&  model.currentEntry.id){
        var lprescriptionList = model.prescriptionList;

        for(var i = 0; i < lprescriptionList.length; i++){
          if(+model.currentEntry.id == lprescriptionList[i].id){
            lprescriptionList[i].name = med;
            lprescriptionList[i].remarks = lremarks;
            break;
          }
        }

        model.currentEntry = {};

      }else{
        model.prescriptionList.push({name:med, remarks: lremarks, id:this.idCounter});
      }
      console.log('prescription' + JSON.stringify(model.prescriptionList));
    },
    removeEntry: function(item){
      var newList = _.remove(model.prescriptionList, function(prescription){
        return prescription.id ==  item.id;
      });
    },
    getPrescriptionList: function(){
      return model.prescriptionList;
    },
    setPrescriptionList: function(newList){
      model.prescriptionList = newList;
    }
  }

  var prescriptionListView = {
    init: function(){
      this.prescriptionListBody = $('#prescription-list-table-body');
      this.medicineText = $('#txt-medicine');
      this.medicineRemarks = $('#txt-medicine-remark');
      this.addEntry = $('#btn-add-row');

      this.medicineText.typeahead({
      source: ['Avil', 'Bcosules', 'Cough syrup', 'Crosin', 'Koflets']
       });

      this.addEntry.on('click', function(){
        var medicine = prescriptionListView.medicineText.val();
        var remarks = prescriptionListView.medicineRemarks.val();
        if(medicine){
          prescriptionListController.addEntry(medicine, remarks);
          prescriptionListView.clearFields();
          prescriptionListView.render();
        }else{
          console.log('medicine name is empty');
        }

      });

    },
    render: function(){

      $('.prescription-added-rows').remove();

      var list = prescriptionListController.getPrescriptionList();

      if(list){

        for(var i = 0; i < list.length; i++){
          var tr = $('<tr/>');
          tr.addClass('prescription-added-rows')

          var td = $('<td/>');
          td.text(list[i].name);
          tr.append(td);

          var td = $('<td/>');
          td.text(list[i].remarks);
          tr.append(td);

          var editLink = $('<a/>',{
            text: 'Edit',
            class: ""
          });

          editLink.click((function(prescription){
            return function(){

              console.log(JSON.stringify(prescription));
              model.currentEntry = prescription;
              prescriptionListView.medicineText.val(prescription.name);
              prescriptionListView.medicineRemarks.val(prescription.remarks);

            }
          })(list[i]));

          var removeLink = $('<a/>',{
            text: 'Remove',
            class: ""
          });

          removeLink.click((function(prescription){
            return function(){
              //console.log(JSON.stringify(prescription));
              prescriptionListController.removeEntry(prescription);
              prescriptionListView.render();

            }
          })(list[i]));

          var td = $('<td/>');
          var separator = $('<span> / </span>');
          td.append(editLink);
          td.append(separator);
          td.append(removeLink);
          tr.append(td);

          this.prescriptionListBody.prepend(tr);

        }

      }

    },
    clearFields: function(){
      this.medicineText.val('');
      this.medicineRemarks.val('');
    }
  }

  var closeAppointmentView = {
    init: function() {
      this.form = $('#close-appointment-form');
      this.closingDatePicker = $('#close-appointment-date');
      this.closingDatePicker.prop('readonly', true);

      this.closeDatePickerIcon = $('#close-appointment-date-icon');
      this.closingTimePicker = $('#close-appointment-time');
      this.closeTimePickerIcon = $('#close-appointment-time-icon');

      this.bookNextAppointment = $('#book-next-appointment');

      this.nextAppointmentDatePicker = $('#next-appointment-date');
      this.nextAppointmentDatePickerIcon = $('#next-appointment-date-icon');

      this.nextAppointmentTimePicker = $('#next-appointment-time');
      this.nextAppointmentTimePickerIcon = $('#next-appointment-time-icon');

      this.nextAppointmentDuration = $('#duration-sel');

      this.patientsName = $('#close-appointment-patients-name');
      this.patientsName.prop('readonly', true);

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


      this.bookNextAppointment.on('change', function(){



        if(this.checked){
          model.bookNextAppointment = true;
        }else{
          model.bookNextAppointment = false;
        }

        console.log('book appointment' + model.bookNextAppointment);

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

      this.closeAppointmentButton.on('click', function(){

        console.log('click submit');

        controller.updateModelFromView();

        console.log('model ' + JSON.stringify(model));

        closeAppointmentView.form.data('bootstrapValidator').validate();
        if(closeAppointmentView.form.data('bootstrapValidator').isValid()){

          if(model.bookNextAppointment){

            if(!model.nextAppointmentDate){
              console.log('next appointment date is empty');
              return;
            }else if(!model.nextAppointmentStartTime && model.nextAppointmentStartTime != 0){
              console.log('next appointment time is empty');
              return;
            }

          }

          console.log('validation success');
          controller.closeAppointment();

        }

      });

      this.initValidators();
      this.render();

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
            closingName :{

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
            ,  closingRemarks :{
              validators : {
                notEmpty :{
                  message : 'Please enter a remark'
                }
              }
            }

          }
        });

    },
    resetvalidator: function(){
     //this.form.reset();
     this.form.bootstrapValidator("resetForm", true);
     //this.closeAppointmentButton.off();
     //destroy typehad and token field

    },
    resetFields: function(){

      this.bookNextAppointment.attr('checked', false);
      this.nextAppointmentDatePicker.val('');
      this.nextAppointmentTimePicker.val('');

    },
    render: function(){

      var times = ViewModel.appointmentTimes;


     this.nextAppointmentDuration.empty();


      for(var i = 0; i < times.length; i++){

        console.log('loop');

        var option = $('<option/>', {
          value: times[i].id,
          text: times[i].name
        });

        this.nextAppointmentDuration.append(option);

      }


      var vModel = controller.getModel();

      this.nextAppointmentDuration.val(vModel.nextAppointmentEndTime);

      this.closingDatePicker.val(vModel.closingDate);
      this.closingTimePicker.val( utility.getTimeFromMinutes(vModel.closingTime));
      this.patientsName.val(vModel.patientsName);

    }
  }

  return controller;

}
