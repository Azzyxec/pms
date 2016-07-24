$(document).ready(function(){

  $(function(){
    console.log('patient History js loaded');

    var listModel = {};


    var controller = {
      init: function(){
        this.patientHistoryUrl = links.getPatientHistoryUrl;
        this.patientId = utility.getURLParam('id');

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

      },
      getListModel: function(){
        return listModel;
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
              return ' <span tabindex="0" class="" role="button" data-toggle="popover" data-html="true" data-trigger="focus"  data-placement="bottom" title="Description" data-content="'+ column +'">'+ column.slice(0,10)+'...</span>';}
            }
          ],
          "order": [[1, 'asc']]
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


controller.init();

}());

});
