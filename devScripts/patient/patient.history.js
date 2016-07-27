$(document).ready(function(){

  $(function(){
    console.log('patient History js loaded');

    var listModel = {};



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
          modalView.init();


        });


      },
      getListModel: function(){
        return listModel;
      },
      getAppointmentInfo : function(appointmentId){
        console.log("button id appointment "+ appointmentId);
        var AppointmentInfo = {};
        for(var i = 0 ; i < listModel.length ; i++)
        {

          if(listModel[i].id == appointmentId){
            return listModel[i];
          }
        }
        return AppointmentInfo;
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
            console.log("full stringfify"+JSON.stringify(full));
            if(full.state == 1 && (full.prescriptionList.length > 0 || full.uploadedList.length > 0)){
              console.log('active button');

                return '<a href="#prescription-list-modal" data-id="'+full.id+'" class="prescription-btn btn btn-default" role="button" data-toggle="modal">View Prescription</a>';

            }else{
              console.log('deactive button');
              return '<a   disabled="true" class="prescription-btn btn btn-default" role="button" >View Prescription</a>';
            }
          }
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
      color = "#5cb85c";
    }else if (row.state == 1) {
      color = "#337ab7";
    }else if (row.state == 2) {
      color = "#d9534f";
    }else if (row.state == 3) {
      color = "#f0ad4e;";
    }


    return ' <span tabindex="0" style="color:'+color+'" role="button" data-toggle="popover" data-html="true" data-trigger="focus" data-placement="bottom" data-content=" '+ modalHtml  + '">'+ column + '</span>';
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
      var AppointmentInfo = controller.getAppointmentInfo(apptId);


      modalView.render(AppointmentInfo);

      console.log('buttton id ' + apptId);

    });
  },
  render:function(AppointmentInfo){


    this.prescriptionListTableBody.empty();
    this.uploadedListTableBody.empty();
      var pList =   AppointmentInfo.prescriptionList;
      //  console.log('rendering prescriptoin'+ JSON.stringify(AppointmentInfo));

      if (pList.length > 0){

      for (var i = 0 ; i < pList.length ; i++ ){
        var tr = $('<tr/>');

        var td = $('<td/>',{
          text:i+1
        });
        tr.append(td);

        var td = $('<td/>',{
          text:pList[i].medicine
        });
        tr.append(td);

        var td = $('<td/>',{
          text:pList[i].remarks
        });
        tr.append(td);
        this.prescriptionListTableBody.append(tr);
      }
    }

      var UploadList =   AppointmentInfo.uploadedList;
        if (UploadList.length > 0){
      for (var i = 0 ; i < UploadList.length ; i++ ){
        var tr = $('<tr/>');

        var td = $('<td/>',{
          text:i+1
        });
        tr.append(td);

        var td = $('<td/>',{
          text:UploadList[i].documentName
        });
        tr.append(td);

        var td = $('<td/>',{
          html:'<a   href="'+UploadList[i].documentPath+'" class=" btn btn-sm btn-default" role="button" >Download</a>'
        });
        tr.append(td);
        this.uploadedListTableBody.append(tr);
      } 
      }











  }

}


controller.init();

}());

});
