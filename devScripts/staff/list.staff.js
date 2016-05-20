$(document).ready(function(){

    $(function(){
        console.log('staff listings js loaded');

        var listModel = {};

        var controller = {
          init: function(){
            this.staffListingUrl = links.staffListingUrl;
            this.addStaffUrl = links.addStaffUrl;

            listView.init();

            //getting the programme list for the doctor
            $.get( controller.staffListingUrl , {})
            .done(function( response ) {
              console.log("doctors list: " + JSON.stringify(response));
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
            this.tablebody = $('#staff-list-table-body');


          },
          render:  function(){

            var staffList = controller.getListModel();
            //console.log('model in view' + JSON.stringify (staffList));

            for(var i = 0; i < staffList.length; i++){
              //console.log('looping ' +  JSON.stringify (staffList[i]));

              var tr = $('<tr/>');

              var td = $('<td/>');
              td.text(staffList[i].firstName);
              tr.append(td);

              var td = $('<td/>');
              td.text(staffList[i].contact1);
              tr.append(td);

              var td = $('<td/>');
              td.text(staffList[i].email);
              tr.append(td);

              var td = $('<td/>');
              td.text(staffList[i].locationName);
              tr.append(td);

              var td = $('<td/>');
              td.text(staffList[i].createdDate);
              tr.append(td);

              var td = $('<td/>');
              td.text( staffList[i].isActive == 1 ? 'Active' : 'In Active');
              tr.append(td);


              var td = $('<a/>',{
                text: 'Edit',
                href: controller.addStaffUrl + '?id=' +  staffList[i].id
              });
              tr.append(td);

              this.tablebody.append(tr);
            }

          }
        };


        controller.init();

    }());

});
