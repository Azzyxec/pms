$(document).ready(function(){

  $(function(){
    console.log('patient entry js loaded');

    var model = {
      patient: {
        id:0,
        name:"",
        dateOfBirth: "",
        bloodGroup:"",
        weight:"",
        height:"",
        gender:"1",
        contact1:"",
        contact2:"",
        address: "",
        isGuardian: 0,
        guardianId: 0
      },
      attachedProgrammeId: 0,
      programmeNameList: [],  //contains name value pair for the drop down
      programmeCount: 0,
      programmeLists: [],
      deliveryMethods: []
    };

    var controller = {
      init :function(){
        this.patientDetailPersistUrl = links.patientDetailPersistUrl;
        this.patientsDetailsUrl = links.patientsDetailsUrl;
        this.loginCheckUrl = links.loginCheckUrl;
        this.getProgrammeList = links.getProgrammeList;
        this.programmeListDetailsUrl = links.programmeListDetailsUrl;
        this.patientsProgrammesUrl = links.patientsProgrammesUrl;
        this.deliveryMethodsUrl = links.deliveryMethodsUrl;

        patientDetailsView.init();
        patientGuardianDetailsView.init();
        patientBirthDetailsView.init();
        patientProgrammeView.init();
        patientProgrammesDetailsView.init();

        $.post( controller.loginCheckUrl , {})
        .done(function( response ) {
          console.log("login check patient: " + JSON.stringify(response));

          //getting the programme list for the doctor
          $.get( controller.getProgrammeList , {id: response.data.id})
          .done(function( response ) {
            console.log("programme list: " + JSON.stringify(response));

            model.programmeNameList = response.data;
            patientProgrammeView.render();

          });

        });


        ///check is the url has a id
        var patientId = utility.getURLParam('id');

        if(patientId){
          //this is a update patients entry
          console.log('patient Id ' + patientId);

          $.get( controller.patientsDetailsUrl , {id:patientId})
          .done(function( response ) {
            console.log(JSON.stringify(response));
            model.patient = response.data.patient;
            patientDetailsView.render();

          });

          //getting the programme list for the doctor
          $.get( controller.patientsProgrammesUrl , {id: patientId})
          .done(function( response ) {

            model.programmeLists = response.data;
            model.programmeCount =  model.programmeLists.length;

            console.log("programme model: " + JSON.stringify(model));

            patientProgrammesDetailsView.render();

          });



        }else{
          //if this is a new patients entry
          patientDetailsView.render();
        }


        //birth details
        $.get( controller.deliveryMethodsUrl , {})
        .done(function( response ) {
          console.log("delivery method: " + JSON.stringify(response));

          model.deliveryMethods = response.data;
          patientBirthDetailsView.render();

        });

        patientDetailsView.tab.trigger('click');

      },
      getPatientModel: function(){
        return model.patient;
      },
      getUpdatedPatientModelFromView: function(){

        model.patient.name = patientDetailsView.name.val();
        var dateOfBirth = moment(patientDetailsView.dateOfbirth.val(), "YYYY-MM-DD");
        model.patient.dateOfBirth = dateOfBirth.format('DD-MM-YYYY');
        console.log('getting date ' + model.patient.dateOfBirth);
        model.patient.bloodGroup = patientDetailsView.bloodGroup.val();
        model.patient.weight = patientDetailsView.weight.val();
        model.patient.height = patientDetailsView.height.val();
        model.patient.gender  = patientDetailsView.rbMale.val();

        if(patientDetailsView.rbMale.is(":checked")){
          model.patient.gender = 1;
        }else{
          model.patient.gender = 0;
        }

        model.patient.contact1 = patientDetailsView.contact1.val();
        model.patient.contact2 = patientDetailsView.contact2.val();
        model.patient.address = patientDetailsView.address.val();

        //model.patient. = patientDetailsView.picUpload;

        return model.patient;

      },
      persistPatient: function(){

        $.post( controller.patientDetailPersistUrl , model)
        .done(function( response ) {
          console.log(JSON.stringify(response));
        });
      },
      getProgrammeNames: function(){
        return model.programmeNameList;
      },
      setAttachedProgrammeId: function(id){
        model.attachedProgrammeId = id;
        //console.log('model: ' + JSON.stringify(model));
      },
      setProgrammeFromServer: function(programmeId, programmeName){

        $.get( controller.programmeListDetailsUrl , {id: programmeId})
        .done(function( response ) {
          //console.log(JSON.stringify(response));
          if(response.status == 1){
            for(var i = 0; i < model.programmeLists.length; i++ ){
              if(model.programmeLists[i].id == programmeId){
                return;
              }
            }
            var programme = {
              id: programmeId,
              name: programmeName,
              count: response.data.length,
              list: response.data
            };
            model.programmeLists.push(programme);
            model.programmeCount = model.programmeLists.length;
            patientProgrammesDetailsView.render();
            //model.programmeList = response.data;
          }
        });
      },
      getProgrammeModel: function(){
        return model.programmeLists;
      },
      getDeliveryMethods: function(){
        return model.deliveryMethods;
      }
    };

    var patientDetailsView = {
      init: function(){
        this.tab = $('#patients-entry-link');
        this.name = $('#patient-name');
        this.dateOfbirth = $('#patient-date-of-birth');
        this.bloodGroup = $('#patient-blood-group');
        this.weight = $('#patient-weight-input');
        this.height = $('#patient-height');
        this.rbMale = $('#rb-male');
        this.rbFemale = $('#rb-female');
        this.contact1 = $('#patient-contact1');
        this.contact2 = $('#patient-contact2');
        this.address = $('#patient-address');
        this.picUpload =$('#patient-picture');

        $('#patient-save-button').click(function(){
          console.log('patient click');

          var model = controller.getUpdatedPatientModelFromView();
          console.log('save click' + JSON.stringify(model));

          controller.persistPatient();

        });

        //this.tab.hide();
      },
      render: function(){

        var model = controller.getPatientModel();

        this.name.val(model.name);
        var dateOfBirth = moment(model.dateOfBirth, 'DD-MM-YYYY');
        console.log('dob model' + model.dateOfBirth);
        this.dateOfbirth.val(dateOfBirth.format('YYYY-MM-DD'));
        console.log('dob' + dateOfBirth.format('YYYY-MM-DD'));
        this.bloodGroup.val(model.bloodGroup);
        this.weight.val(model.weight);
        this.height.val(model.height);
        this.contact1.val(model.contact1);
        this.contact2.val(model.contact2);
        this.address.val(model.address);
        //this.picUpload.val(model.);


        if(model.gender == 1){
          this.rbMale.prop('checked', true);
          this.rbFemale.prop('checked', false);
        } else{
          this.rbMale.prop('checked', false);
          this.rbFemale.prop('checked', true);

        }

      }
    };

    var patientGuardianDetailsView = {
      init: function(){
        this.tab = $('#guardian-entry-link');


      },
      render: function(){

      }
    }

    var patientBirthDetailsView = {
      init: function(){
        this.tab = $('#birth-entry-link');
        this.selectDeliveryMethods = $('#delivery-method');


      },
      render: function(){

        //adding the select option to the list
        var option = $('<option/>',{
                        value: 0,
                        text: 'Select...',
                        selected: 'selected'
                      }
                      );
        this.selectDeliveryMethods.append(option);

        var deliveryMethods = controller.getDeliveryMethods();

        for(var i = 0; i < deliveryMethods.length; i++){
          var option = $('<option/>',{
                          value: deliveryMethods[i].id,
                          text: deliveryMethods[i].name
                        }
                        );
         this.selectDeliveryMethods.append(option);

       }//

      }
    }

    var patientProgrammeView = {
      init: function(){
        this.tab = $('#patients-programme-link');
        this.programmeSelect = $('#sel-program-list');

        $('#btn-attach-programme').click(function(){


          var selectedValue = patientProgrammeView.programmeSelect.find(":selected").attr('value');
          var name = patientProgrammeView.programmeSelect.find(":selected").text();
          if(selectedValue){
            controller.setAttachedProgrammeId(selectedValue);
            controller.setProgrammeFromServer(selectedValue, name);



          }
          console.log('programme attach click selected id, name: ' + selectedValue + name);
        });



        //
      },
      render: function(){
        var programmelist =  controller.getProgrammeNames();

        console.log('render programme view' + programmelist);

        for(var i= 0; i < programmelist.length; i++){
          this.programmeSelect.append($('<option value="'+programmelist[i].id +'">'+ programmelist[i].name + '</option>'));
          //console.log(this.programmeSelect);
        }

      }
    };

    var patientProgrammesDetailsView = {
      init: function () {
        this.tableParentPanel = $('#programme-table-parent'); //this node contains the table panels
        this.tablePanelNode = $('#programme-table-panel');  //this node contains the table inside it
        this.tablePanelNode.hide();//used to make clones, its hidden in html but this is just a double check


        //cloneNode(true);  clone the children too, when true is passed
      },
      render: function() {

        //this.tableParentPanel.empty();

        var programmeModel = controller.getProgrammeModel();

        for(var i = 0; i < programmeModel.length; i++){
          console.log('building programme table for ' + JSON.stringify(programmeModel[i]));

          var cloneTablePanel = this.tablePanelNode.clone();

          var cloneTablebody = cloneTablePanel.find('table').find('tbody');

          var label = cloneTablePanel.find('.programme-name');

          console.log('name ' + programmeModel[i].name);

          label.text(programmeModel[i].name);


          for(var j = 0; j <  programmeModel[i].list.length; j++ ){

            var tr = $('<tr/>');

            var td = $('<td/>');
            td.text(programmeModel[i].list[j].durationDays);
            tr.append(td);

            td = $('<td/>');
            td.text(programmeModel[i].list[j].medicine);
            tr.append(td);

            td = $('<td/>');
            td.text(programmeModel[i].list[j].doseNo);
            tr.append(td);

            //due on
            var input = $('<input/>', {
              type: 'date'
            });

            var date = moment(programmeModel[i].list[j].dueOn, 'DD-MM-YYYY');
            input.val(date.format('YYYY-MM-DD'));

            input.change((function(model, control){
              return  function() {
                var date = moment(control.val(), 'YYYY-MM-DD');
                model.dueOn = date.format('DD-MM-YYYY');
                console.log('change + ' + JSON.stringify(model));
              }
            })(programmeModel[i].list[j], input));

            td = $('<td/>');
            td.append(input);
            tr.append(td);

            //givenOn
            var input = $('<input/>', {
              type: 'date'
            });

            var date = moment(programmeModel[i].list[j].givenOn, 'DD-MM-YYYY');
            input.val(date.format('YYYY-MM-DD'));

            input.change((function(model, control){
              return  function() {
                var date = moment(control.val(), 'YYYY-MM-DD');
                model.givenOn = date.format('DD-MM-YYYY');
                console.log('change + ' + JSON.stringify(model));
              }
            })(programmeModel[i].list[j], input));

            td = $('<td/>');
            td.append(input);
            tr.append(td);

            //batchNo
            var input = $('<input/>', {
              type: 'input'
            });

            input.val(programmeModel[i].list[j].batchNo);

            input.keyup((function(model, control){
              return  function() {
                model.batchNo = control.val();
                console.log('change + ' + JSON.stringify(model));
              }
            })(programmeModel[i].list[j], input));

            td = $('<td/>');
            td.append(input);
            tr.append(td);

            cloneTablebody.append(tr);
          } //inner for loop

          this.tableParentPanel.append(cloneTablePanel);
          cloneTablePanel.show();

        }//outer for loop

        //adding the table panel



      }
    }

    controller.init();

  }());

});
