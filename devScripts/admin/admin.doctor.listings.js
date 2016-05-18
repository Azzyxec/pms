$(document).ready(function(){

    $(function(){
        console.log('admin  Doctor listing js loaded ');

        var listModel = {};

        var controller = {
          init: function(){
            this.doctorListingUrl = "index.php/admin/getAllDoctors";
            this.adminDoctorEditRedirect = "index.php/admin/adminDoctorEdit";

            listView.init();

            //getting the programme list for the doctor
            $.get(controller.doctorListingUrl ,  {})
            .done(function( response ) {
              console.log("patients list: " + JSON.stringify(response));
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
                    this.tablebody = $('#doctor-list-table-body');


                  },
                  render:  function(){

                    var doctorsList = controller.getListModel();
                    //console.log('model in view' + JSON.stringify (doctorsList));

                    for(var i = 0; i < doctorsList.length; i++){
                      //console.log('looping ' +  JSON.stringify (doctorsList[i]));

                      var tr = $('<tr/>');

                      var td = $('<td/>');
                      td.text(doctorsList[i].name);
                      tr.append(td);

                      var td = $('<td/>');
                      td.text(doctorsList[i].contact);
                      tr.append(td);

                      var td = $('<td/>');
                      td.text(doctorsList[i].email);
                      tr.append(td);


                      var td = $('<td/>');
                      td.text(doctorsList[i].qualifications);
                      tr.append(td);

                      var td = $('<td/>');
                      td.text( doctorsList[i].isActive==1?'Active':'Not Active');
                      tr.append(td);

                      var td = $('<a/>',{
                        text: 'Edit',
                        href: controller.adminDoctorEditRedirect + '?id=' +  doctorsList[i].id
                      });
                      tr.append(td);

                      this.tablebody.append(tr);
                    }

                  }
                };


                controller.init();


    }());

});
