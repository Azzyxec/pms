$(document).ready(function(){

  $(function(){
    console.log('patient History js loaded');

    var listModel = {};
    var prescriptionModel = {
      prescriptionList : [{id:'',name:'crosin',dosageInfo:'3'}],
      uploadedList : [{id:'',name:'abc.jpg',fileName:'324234abc.jpg'}]
    }


    var controller = {
      init: function(){
        this.patientHistoryUrl = links.getPatientHistoryUrl;
        this.patientId = utility.getURLParam('id');
        this.getPrescriptionDetail = links.getPrescriptionDetail;






        //getting the History for the doctor
        $.get( controller.patientHistoryUrl, {patient_id:controller.patientId})
        .done(function( response ) {
          //console.log("patients list: " + JSON.stringify(response));
          listModel = response.data;

          if(listModel){
            for(var i = 0; i < listModel.length; i++){
                listModel[i].time = utility.getTimeFromMinutes(listModel[i].time);
            }
          }

          listView.render();


        });

        //getting the prescription List from the patient
        $.get( controller.getPrescriptionDetail, {patient_id:controller.patientId} )
        .done(function( response ) {
          console.log('prescriptionList' + JSON.stringify(response));

        //  prescriptionModel = response.data;

          modalView.init();

        });

      },
      getListModel: function(){
        return listModel;
      },
      getPrescriptionList : function(){
        return prescriptionModel.prescriptionList;
      },
      getUploadedFileList : function(){
        return prescriptionModel.uploadedList;
      }

    };


    var listView = {
      init: function(){




      },
      render:  function(){

        var patientsList = controller.getListModel();
        //console.log(JSON.stringify(controller.getData()));
        console.log('model in view' + JSON.stringify(patientsList));

        if(patientsList && patientsList != -1 && patientsList.length > 0){

        var table = $('#example').DataTable( {
      /*    "fnInitComplete" : function(oSettings, json) {
            console.log( 'DataTables has finished its initialisation.' );
          }*/

          "bProcessing": true,
          "data":  controller.getListModel(),
          "aoColumns": [
            { "mData": "locName" },
            { "mData": "date" },
            { "mData": "time" },
            { "mData": "stateText",
              "mRender" : function(column, type, row){
                return listView.getDescriptionTemplate(column, type, row );
              }
            },
            { "mData": "description",
            "mRender" : function ( column, type, full ) {
              return '<a href="#prescription-list-modal" data-id="100" class="prescription-btn btn btn-default" role="button" data-toggle="modal">View Prescription</a>';}
            }
          ],
          "order": [[1, 'asc']],
          "fnInitComplete" : function(oSettings, json) {
                console.log( 'DataTables has finished its initialisation.' );

           }

        } );

      }






        $(function () {
          $('[data-toggle="popover"]').popover({'trigger':'focus','placement':'left'})

        });

  },
  getDescriptionTemplate: function( column, type, row ){

    var modalHtml = "<dl class='dl-horizontal'>" +
                    "<dt>Description&nbsp;:&nbsp;</dt>" +
                    "<dd>" + row.description + "</dd>" +
                    "</dl>";

   if(+row.state != 0){
        modalHtml = modalHtml +  "<dl class='dl-horizontal'>" +
                                    "<dt>Remarks&nbsp;:&nbsp;</dt>" +
                                    "<dd>"+ row.remarks +"</dd>" +
                                  "</dl>";
   }
   var color;

   if(row.state == 0){
      color = "green";
   }else if (row.state == 1) {
       color = "yellow";
   }else if (row.state == 2) {
       color = "red";
   }


    return ' <span tabindex="0" class="'+color+'" role="button" data-toggle="popover" data-html="true" data-trigger="focus" data-placement="bottom" data-content=" '+ modalHtml  + '">'+ column + '</span>';
  }
};

var modalView = {
init: function(){
  this.prescriptionModal = $('#prescription-list-modal');
  //this.prescriptionListTable = $('#prescription-list-table');
  this.prescriptionListTableBody = $('#prescription-list-table-body');
  this.uploadedListTableBody = $('#uploaded-document-table-body');


  this.prescriptionModal.on('show.bs.modal',function(event){
    var button = $(event.relatedTarget) // Button that triggered the modal
    var apptId = button.data('id'); // Extract info from data-id attribute

    console.log('buttton id ' + apptId);




  //  var modal = $(this);

    //modal.find('.modal-body input').val(prescriptionId);
  });
},
render:function(){

  var prescriptionList = controller.getPrescriptionList();
  var uploadedList = controller.getUploadedFileList();






}

}


controller.init();

}());

});
