$(document).ready(function(){

    $(function(){
        console.log('medical programme js loaded ');
    }());

    var model = {
      programId: 0,
      programmeName: "",
      programeList:[]
    };

    var controller = {
      init: function(){
        this.createModifyProgrammeUrl = "index.php/createModifyProgramme";
        this.getProgrammeUrl = "index.php/getProgrammes";

        programmeView.init();


        var programmeId = utility.getURLParam('id');

        if(programmeId){
          //this is a update patients entry
          console.log('patient Id ' + programmeId);

          $.get( this.getProgrammeUrl , {id:programmeId})
          .done(function( response ) {
            console.log(JSON.stringify(response));

            model = response.data;
            programmeView.render();

          });

        }


      },
      getProgrammeList: function(){
        return model.programeList;
      },
      getProgrammeName: function(){
        return model.programmeName;
      },
      removeProgramme: function(program){
        model.programeList.splice(program.index, 1);
        //re assigning the index
        for(var i = 0; i < model.programeList.length; i++){
            model.programeList[i].index = i;
        }
      },
      addProgramme:  function(pduration, ptext, pvaccine, pdoseNo){
        var posn = model.programeList.length;
        var programme = {
                         id:0,
                         duration: pduration,
                         text: ptext,
                         vaccine: pvaccine,
                         doseNo: pdoseNo,
                         index: posn
                        };
        model.programeList.push(programme);
        programmeView.clearForm();
      },
      persistProgramme: function(){

        //update the programme name
        model.programmeName =  programmeView.programmeName.val();

        $.post(controller.createModifyProgrammeUrl , model)
         .done(function( response ) {
           console.log('save response ' + JSON.stringify(response));
         });
      }
    };

    var programmeView = {
      init: function(){
        this.programmeName = $('#programme-name');
        this.tableBody  = $('#programme-list-table-body');

        this.duration = $('#txt-duration');
        this.durationText = $('#txt-duration-text');
        this.vaccine = $('#txt-vaccine');
        this.doseNo = $('#txt-dose-no');

        $('#btn-add-row').click((function(view){

          return function(){
            var durationVal = $('#txt-duration').val();
            var durationTextVal = $('#txt-duration-text').val();
            var vaccineVal = $('#txt-vaccine').val();
            var doseNoVal = $('#txt-dose-no').val();

            controller.addProgramme(durationVal, durationTextVal, vaccineVal, doseNoVal);
            programmeView.render();
            console.log('model ' + JSON.stringify(model));
         }

        })(programmeView));



        $('#btn-submit-programme').click(function(){
          console.log('save click');
          controller.persistProgramme();
        });

      },
      clearForm: function(){
        this.duration.val('');
        this.durationText.val('');
        this.vaccine.val('');
        this.doseNo.val('');
      },
      render: function(){

        this.programmeName.val(controller.getProgrammeName());

        var programmeList = controller.getProgrammeList();

        //remove the added rows
        $('.prog-added-rows').remove();

        var tableHeaderClone = $('#programme-table-header').clone();
        //this.tableBody.prepend(tableHeaderClone);

        for(var i = 0; i < programmeList.length; i++){

          var tr = $('<tr/>');
          tr.addClass('prog-added-rows')

          var td = $('<td/>');
          td.text(programmeList[i].duration);
          tr.append(td);

          var td = $('<td/>');
          td.text(programmeList[i].text);
          tr.append(td);

          var td = $('<td/>');
          td.text(programmeList[i].vaccine);
          tr.append(td);

          var td = $('<td/>');
          td.text(programmeList[i].doseNo);
          tr.append(td);

          var td = $('<a/>',{
            text: '-',
            class: "btn btn-default btn-sm"
          });
          td.click((function(programme){
            return function(){

              console.log(JSON.stringify(programme));
              //  programmeList[position -1] = null;

              console.log('remove click on: ' + JSON.stringify(programme));
              controller.removeProgramme(programme);
              programmeView.render();

            }

          })(programmeList[i]));
          tr.append(td);

          this.tableBody.append(tr);
        }

      }
    };

    controller.init();

});
