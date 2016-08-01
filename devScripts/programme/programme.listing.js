$(document).ready(function(){

    $(function(){
        console.log('programme listing js loaded');
    }());

    var programmeListModel = {};

    var controller = {
      init: function(){
        this.programmeListUrl = links.getAllPrograms;
        this.programmeEditUrl = links.programmeEditUrl;

        ProgrammeListView.init();


        $.get( this.programmeListUrl , {})
         .done(function( response ) {
           console.log('response ' + JSON.stringify(response));
           programmeListModel = response.data;

           if(response.status == 1){
             if(programmeListModel.length > 0){
                ProgrammeListView.tableConatiner.removeClass('hidden');
               ProgrammeListView.render();
             }else{
               ProgrammeListView.tableConatiner.addClass('hidden');
               utility.getAlerts('No medical programs to list, add new schedules by clicking the new program button','alert-warning ','','.container-fluid');
             }

           }else{
             utility.getAlerts('Something is not right','alert-danger ','','.container-fluid');
           }

         });


      },
      getListModel: function(){
        return programmeListModel;
      }
    };

    var ProgrammeListView = {
      init: function(){
        this.tableConatiner = $('#list-container');
        this.tableBody = $('#programme-list-table-body');
        this.newProgrammeButton = $('#btn-new-programme');

        this.newProgrammeButton.on('click', function(){
          window.location.href =  links.createProgramForPatientUrl
        });



      },
      render: function(){

        var programmeList = controller.getListModel();


        for(var i = 0; i < programmeList.length; i++){
          //console.log('looping ' +  JSON.stringify (patientsList[i]));

          var tr = $('<tr/>');
          var td = $('<td/>');

          var a = $('<a/>',{
            text: programmeList[i].name,
            href: controller.programmeEditUrl + '?id=' +  programmeList[i].id
          });
          td.append(a);

          tr.append(td);

          var td = $('<td/>');
          td.text(programmeList[i].created);
          tr.append(td);

          var td = $('<td/>');
          td.text(programmeList[i].state);
          tr.append(td);


          this.tableBody.append(tr);
        }

      }
    };

    controller.init();

});
