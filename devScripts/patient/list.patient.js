$(document).ready(function(){

$(function(){
  console.log('patient listings js loaded');

  var listModel = {};

  var controller = {
    init: function(){
      this.patientListingUrl = links.patientListingUrl;
      this.editPatientRedirect = links.patientsEntryUrl;

      listView.init();

      //getting the programme list for the doctor
      $.get( controller.patientListingUrl , {})
      .done(function( response ) {
        //console.log("patients list: " + JSON.stringify(response));
        listModel = response.data;
        listView.render();
      });

    },
    getListModel: function(){
      return listModel;
    }

  };


  var listView = {
    init: function(){
      //this.tablebody = $('#patient-list-table-body');
      this.newPatientButton = $('#btn-new-patient');

      this.newPatientButton.on('click', function(){
        window.location.href = links.patientsEntryUrl;
      });

      this.alertStatus = utility.getURLParam('status');

    },
    render:  function(){

      if(this.alertStatus && this.alertStatus == 1){
        utility.getAlerts("Patient details successfully updated!","alert-success","",".container-fluid");

      }

      var patientsList = controller.getListModel();
      //console.log(JSON.stringify(controller.getData()));
      console.log('model in view' + JSON.stringify(patientsList));

      var table = $('#example').DataTable( {
        "bProcessing": true,
        "data":  controller.getListModel(),
        "aoColumns": [

          { "mData": "name",
          "mRender" : function (column, type, row ) {
            return '<a href="' + controller.editPatientRedirect + '?id='+row.id+'">'+ column +'</a>';
          }
        },
        { "mData": "dateOfBirth" },
        { "mData": "bloodGroup" },
        { "mData": "genderText" },
        { "mData": "contact" },
        { "mData": "status" }
      ],
      "order": [[1, 'asc']]
    } );


  }
};


controller.init();

}());

});
