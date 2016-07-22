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
                listModel[i].appt_time = utility.getTimeFromMinutes(listModel[i].appt_time);
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
            { "mData": "loc_name" },
            { "mData": "appt_date" },
            { "mData": "appt_time" },
            { "mData": "patient_Status",
          "mRender" : function(data, type, full ){
           if(data == 2){
             return "<span>Canceled</span>";
           }else{
              return "<span>Closed</span>";
           }
          } },
            { "mData": "patient_desc",
            "mRender" : function ( data, type, full ) {
              return ' <span tabindex="0" class="" role="button" data-toggle="popover" data-html="true" data-trigger="focus" data-placement="bottom" title="Description" data-content="'+data+'">'+data.slice(0,10)+'...</span>';}
            }
          ],
          "order": [[1, 'asc']]
        } );

      }

        $(function () {
          $('[data-toggle="popover"]').popover({'trigger':'focus','placement':'left'})

        });


        /*  for(var i = 0; i < patientsList.length; i++){
        //console.log('looping ' +  JSON.stringify (patientsList[i]));

        var tr = $('<tr/>');

        var td = $('<td/>');
        td.text(patientsList[i].name);
        tr.append(td);

        var td = $('<td/>');
        td.text(patientsList[i].dateOfBirth);
        tr.append(td);

        var td = $('<td/>');
        td.text(patientsList[i].bloodGroup);
        tr.append(td);

        var td = $('<td/>');
        td.text( patientsList[i].gender == 1 ? 'Male' : 'Female');
        tr.append(td);

        var td = $('<td/>');
        td.text(patientsList[i].contact);
        tr.append(td);

        var td = $('<a/>',{
        text: 'Edit',
        href: controller.editPatientRedirect + '?id=' +  patientsList[i].id
      });
      tr.append(td);

      this.tablebody.append(tr);
    }*/

  }
};


controller.init();

}());

});
