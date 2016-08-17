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
    currentEntry:{},
    uniqueId:'',
    uploadedFileList: [],
    //uploadedFileCount: 0
  };

  var ViewModel = {
    appointmentTimes: [{id:5, name:'5 mins'}, {id:10, name:'10 mins'}, {id:15, name:'15 mins'}, {id:20, name:'20 mins'}, {id:30, name:'30 mins'}]
  };

  var controller = {
    init: function(){
      this.allowSubmit = true;
      this.closeAppointmentUrl = links.closeAppointmentUrl;
      this.fileUploadIdCount = 1;
      this.currentRemoveFileId = 0;
      fileUploader.init();

      closeAppointmentView.init();
      prescriptionListController.init();
    },
    removeFileWithId: function(){

     _.remove(model.uploadedFileList, function(item){
        //console.log(' item ' + JSON.stringify(item));
        return item.id == controller.currentRemoveFileId;
      });

    },
    generateUUID: function(){
      var d = new Date().getTime();
      if(window.performance && typeof window.performance.now === "function"){
        d += performance.now(); //use high-precision timer if available
      }
      var uuid = '_xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
      });
      return uuid;
    },

    setCloseInfo: function(closeInfo){
      model.uniqueId = this.generateUUID();
      console.log('uniqueId = '+model.uniqueId);
      if(closeInfo){
        console.log('set info');






        model.appointmentId = closeInfo.appointmentId;
        model.closingTime = closeInfo.closingTime;
        model.patientsName = closeInfo.patientsName;
        closeAppointmentView.render();
      }
    },
    getUniqueId: function () {
      return model.uniqueId;
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

          console.log('close response ' + JSON.stringify(response));

          if(controller.cancelCallback){
            controller.cancelCallback(response);
          }




          //close in proper resonse, else dsplay messge the appoitmetn could not be compated
        })
        .always(function() {
          console.log('always after calls');
          controller.allowSubmit = true;
        });

      }
    },
    cleanup: function(){
      this.resetModel();
      closeAppointmentView.resetvalidator();
      closeAppointmentView.resetFields();
      fileUploader.destroyFileUploader();

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

      // this.medicineText.typeahead({
      //   source: ['Avil', 'Bcosules', 'Cough syrup', 'Crosin', 'Koflets']
      // });

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

      this.closingDatePicker.attr("readonly", true);
      this.closingTimePicker.attr("readonly", true);

      this.closingDatePicker.datetimepicker({
        inline:false,
        format:'DD-MM-YYYY',
        ignoreReadonly: true
      });


      this.closeDatePickerIcon.on('click', function(){
        console.log('click cal');
        closeAppointmentView.closingDatePicker.data('DateTimePicker').show();
      });


      this.closingTimePicker.datetimepicker({
        inline:false,
        format:'LT',
        ignoreReadonly: true
      });

      this.closeTimePickerIcon.on('click', function(){
        console.log('click cal');
        closeAppointmentView.closingTimePicker.data('DateTimePicker').show();
      });


      this.bookNextAppointment.on('change', function(){



        if(this.checked){
          model.bookNextAppointment = true;
          $('.book-next-controls').removeClass('hidden');
        }else{
          model.bookNextAppointment = false;
          $('.book-next-controls').addClass('hidden');
        }

        console.log('book appointment' + model.bookNextAppointment);

      });
      this.nextAppointmentDatePicker.attr("readonly", true);
      this.nextAppointmentTimePicker.attr("readonly", true);
      this.nextAppointmentDatePicker.datetimepicker({
        inline:false,
        format:'DD-MM-YYYY',
        ignoreReadonly: true
      });

      this.nextAppointmentDatePickerIcon.on('click', function(){
        console.log('click cal');
        closeAppointmentView.nextAppointmentDatePicker.data('DateTimePicker').show();
      });

      this.nextAppointmentTimePicker.datetimepicker({
        inline:false,
        format:'LT',
        ignoreReadonly: true
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


  var fileUploader = {
    init: function(){
      //initialize blueimp fileupload plugin


      this.fi = $('#fileupload');
      var process_url = links.closeApptUploadFiles; //PHP script
      this.fi.fileupload({
        url: process_url,
        dataType: 'json',
        autoUpload: true,

        acceptFileTypes: /(\.|\/)(gif|jpe?g|png|mp4|mp3)$/i,
        maxFileSize: 5242880, //1MB
        maxNumberOfFiles:'1',
        // Enable image resizing, except for Android and Opera,
        // which actually support image resizing, but fail to
        // send Blob objects via XHR requests:
        disableImageResize: /Android(?!.*Chrome)|Opera/
        .test(window.navigator.userAgent),
        previewMaxWidth: 50,
        previewMaxHeight: 50,
        previewCrop: true

      });

      var progressBar = $('<div/>').addClass('progress').append($('<div/>').addClass('progress-bar')); //create progress bar
      var uploadButton = $('<button/>').addClass('btn btn-info ').text('Upload');    //create upload button

      // uploadButton.on('click', function () {
      //
      //
      //   //button click function
      //   var $this = $(this), data = $this.data();
      //   data.submit().always(function () { //upload the file
      //     $this.remove(); //remove this button
      //   });
      // });

      this.fi.on('fileuploadadd', function (e, data) {

        var mediaType = data.files[0].type;
        console.log('file media type ' + data.files[0].type);
        var array = mediaType.split('/');
        var invalidFileType = true;
        if(array[0] == 'image'
        && (array[1] == 'jpeg')
        || (array[1] == 'png')
        || (array[1] == 'jpg')
      ){
        invalidFileType = false;
      }

      if(array[0] == 'application'
      && (array[1] == 'excel')
      || (array[1] == 'vnd.ms-excel')
      || (array[1] == 'x-excel')
      || (array[1] == 'pdf')
    ){
      invalidFileType = false;
    }

    if(data.files[0].size > 5242880 || invalidFileType){

      var alertSting = '';
      if(data.files[0].size > 5242880 ){
        alertSting  = 'Maximmum file upload size is 5mb';
      }

      if(invalidFileType){
        alertSting  = alertSting  + ' and only file types of jpg,jpeg,png,pdf,xls accepted';
      }


      utility.getAlerts(alertSting,'alert-warning','','.modal-body');

    }else{


      data.context = $('<div/>').addClass('file-wrapper').appendTo('#files'); //create new DIV with "file-wrapper" class

      var fileObj = {};

      $.each(data.files, function (index, file){  //loop though each file


        fileObj.id = controller.fileUploadIdCount;
        fileObj.name =  file.name;
        model.uploadedFileList.push(fileObj);

        controller.fileUploadIdCount++;

        var node = $('<div/>').addClass('file-row'); //create a new node with "file-row" class

        var removeBtn  = $('<button/>').addClass('btn btn-info ').text('Remove'); //create new remove button

        removeBtn.on('click', (function(lfile){ //remove button function

          return function(){
            console.log('removing file with id ' + lfile.id + ' name ' + lfile.name);
            console.log('before removing ' + JSON.stringify(model.uploadedFileList));
            controller.currentRemoveFileId  = lfile.id;
            controller.removeFileWithId();
            controller.currentRemoveFileId  = 0;
            console.log('after removing ' + JSON.stringify(model.uploadedFileList));
            $(this).parent().parent().remove(); //remove file's wrapper to remove queued file
          }

        })(fileObj));

        //create file info text, name and file size
        var file_txt = $('<div/>').addClass('file-row-text').append('<span>'+file.name  + '</span>');

        file_txt.append(removeBtn); //add remove button inside info text element

        file_txt.prependTo(node); //add to node element //add to node element

        progressBar.clone().appendTo(file_txt); //add progress bar

        if (!index){
          node.prepend(file.preview); //add image preview
        }

        node.appendTo(data.context); //attach node to data context
      });

      //posting the file for upload
      console.log(JSON.stringify(data));
      data.formData = {
        'uploadId': controller.getUniqueId(),
        'fileId': fileObj.id
      }

      data.submit();

    }
  });

  this.fi.on('fileuploadprogress', function (e, data) {

    var progress = parseInt(data.loaded / data.total * 100, 10);
    if (data.context) {
      data.context.each(function () {
        $(this).find('.progress').attr('aria-valuenow', progress).children().first().css('width',progress + '%').text(progress + '%');
      });
    }
  });

  this.fi.on('fileuploaddone', function (e, data) { // invoke callback method on success
    console.log('on done  ' + JSON.stringify(data) );
    /*  $.each(data.result.files, function (index, file) { //loop though each file
    if (file.url){ //successful upload returns a file url
    var link = $('<a>') .attr('target', '_blank') .prop('href', file.url);
    $(data.context.children()[index]).addClass('file-uploaded');
    $(data.context.children()[index]).find('canvas').wrap(link); //create a link to uploaded file url
    $(data.context.children()[index]).find('.file-remove').hide(); //hide remove button
    var done = $('<span class="text-success"/>').text('Uploaded!'); //show success message
    $(data.context.children()[index]).append(done); //add everything to data context
  } else if (file.error) {
  var error = $('<span class="text-danger"/>').text(file.error); //error text
  $(data.context.children()[index]).append(error); //add to data context
}
});*/
});

this.fi.on('fileuploadfail', function (e, data) {
  //on file upload fail
  console.log('on fail data ' + + JSON.stringify(data));


});

},
destroyFileUploader: function(){
  $('.file-wrapper').remove();

  //$('#fileupload').fileupload('destroy');
  console.log('destroy fileuploader ');

}

}
return controller;

}
