$(document).ready(function(){

    $(function(){
        console.log('Manage Locations  js loaded');

        var model = {
                      loc:{id:0, name:""},
                      list:[]
                    };

        var controller = {
          init: function(){
            this.saveUpdateLocations = "index.php/addUpdateLocation";
            this.locationListUrl = "index.php/getDoctorLocations";

            LocationView.init();
            locationListView.init();
            this.updateLocationFromServer();
          },
          persistLocationModel: function(){

            console.log('persist' + JSON.stringify(model.loc));

            $.post(controller.saveUpdateLocations , model.loc)
             .done(function( response ) {
               console.log('save response ' + JSON.stringify(response));
               controller.updateLocationFromServer();
             });

          },
          getLocationList: function(){
            return model.list;
          },
          updateLocationFromServer: function(){
            $.get(controller.locationListUrl , {})
             .done(function( response ) {
               console.log('save response ' + JSON.stringify(response));
               model.list = response.data;
               locationListView.render();
             });
          }
        };


        var LocationView = {
          init: function(){
            this.locationName = $('#txt-location-name');

            $('#btn-add-location').click(function(){
              console.log('save click');

              var locName = LocationView.locationName.val();
              model.loc.name =  locName;
              console.log(JSON.stringify(model.loc));
              LocationView.locationName.val('');
              controller.persistLocationModel();

            });

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

              var td = $('<a/>',{
                text: 'Edit',
              });
              tr.append(td);


              this.tableBody.append(tr);
            }

          }
        };


        controller.init();

    }());

});
