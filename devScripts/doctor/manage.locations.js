$(document).ready(function(){

    $(function(){
        console.log('Manage Locations  js loaded');

        var model = {
                      loc:{id:0, name:"", isActive:1},
                      list:[]
                    };

        var controller = { 
          init: function(){
            this.saveUpdateLocations = links.saveUpdateLocations;
            this.locationListUrl = links.getLocationUrl;
            this.deactivateLocationUrl = links.deactivateLocationUrl;

            LocationView.init();
            locationListView.init();
            this.updateLocationFromServer();
          },
          persistLocationModel: function(){

            console.log('persist' + JSON.stringify(model.loc));

            $.post(controller.saveUpdateLocations , model.loc)
             .done(function( response ) {
               console.log('save response ' + JSON.stringify(response));
               LocationView.locationName.val('');
               controller.updateLocationFromServer();
             });

          },
          getLocationList: function(){
            return model.list;
          },
          getLocationModel: function(){
            return model.loc;
          },
          updateLocationFromServer: function(){
            $.get(controller.locationListUrl , {})
             .done(function( response ) {
               console.log('get loc response ' + JSON.stringify(response));
               model.list = response.data;
               locationListView.render();
               LocationView.overLay.addClass('hidden');
             });
          },
          updateModel: function(id, name, isActive){
            model.loc.id = id;
            model.loc.name = name;
            model.loc.isActive = isActive;
            LocationView.render();
          },
          deactivateLocation: function(locationId, pisActive){

            $.post(controller.deactivateLocationUrl , {id: locationId, isActive: pisActive})
             .done(function( response ) {
               console.log('deactivate response ' + JSON.stringify(response));

               controller.updateLocationFromServer();
               locationListView.render();
               LocationView.overLay.addClass('hidden');

             });



          }
        };


        var LocationView = {
          init: function(){
            this.locationName = $('#txt-location-name');
            this.locationNameHelpLabel = $('#help-location-name');
            this.activeControl = $('#pactive');
            this.inActiveControl = $('#pinactive');
            this.overLay = $('#dash-overlay');

            $('#btn-add-location').click(function(){
              console.log('save click');

              var locName = LocationView.locationName.val();

              var isEmpty = validator.isEmptyString(locName);

              if(!isEmpty){

                if(LocationView.activeControl.is(":checked")){
                  model.loc.isActive = 1;
                }else{
                  model.loc.isActive = 0;
                }

                var locationModel = controller.getLocationModel();
                locationModel.name =  locName;

                console.log(JSON.stringify(model.loc));

                controller.persistLocationModel();
             }

            });

            //wiring validations
            this.locationName.on('focus click change keyup select blur', function(){


              var locName = LocationView.locationName.val();
              var isEmpty = validator.isEmptyString(locName);

              if(isEmpty){
                LocationView.locationName.addClass('has-error');
                LocationView.locationNameHelpLabel.removeClass('hidden');
              }else{
                LocationView.locationName.removeClass('has-error');
                LocationView.locationNameHelpLabel.addClass('hidden');
              }

            });

          },
          render: function(){
            var locationModel = controller.getLocationModel();
            this.locationName.val(locationModel.name);

            console.log(JSON.stringify(locationModel));

            if(+locationModel.isActive == 1){
              console.log('check active');
              this.activeControl.prop('checked', true);
            }else{
              console.log('check inactive');
              this.inActiveControl.prop('checked', true);
            }

          }
        };

        var locationListView = {
          init: function(){
            this.tableBody = $('#location-list-table-body');

          },
          render:function(){

            var locations = controller.getLocationList();

            this.tableBody.empty();

            console.log('render' + JSON.stringify(locations));

            for(var i = 0; i < locations.length; i++){
              //console.log('looping ' +  JSON.stringify (patientsList[i]));

              var tr = $('<tr/>');

              var td = $('<td/>');
              td.text(locations[i].name);
              tr.append(td);

              var td = $('<td/>');
              td.text(locations[i].status);
              tr.append(td);

              var editLink = $('<a/>',{
                text: 'Edit',
              });

              editLink.click((function(location){
                return function(){
                  console.log('edit click ' + JSON.stringify(location));
                  controller.updateModel(location.id, location.name, location.isActive);
                }
              })(locations[i]));

              var td = $('<span/>');
              td.append(editLink);


              // var deactivateLink = $('<a/>',{
              //   text: 'Deactivate',
              // });
              //
              // deactivateLink.click((function(location){
              //   return function(){
              //     console.log('remove click ' + JSON.stringify(location));
              //     controller.deactivateLocation(location.id);
              //   }
              // })(locations[i]));
              //
              // var td = $('<span/>');
              // td.append(editLink);
              //td.append(" / ");
              //td.append(deactivateLink);

              tr.append(td);


              this.tableBody.append(tr);
            }

          }
        };


        controller.init();

    }());

});
