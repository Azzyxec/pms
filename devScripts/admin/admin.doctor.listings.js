$(document).ready(function(){

    $(function(){
        console.log('admin  Doctor listing js loaded ');

        var listModel = {};

        var controller = {
          init: function(){
            this.doctorListingUrl = links.getAllDoctorsUrl;
            this.adminDoctorEditRedirect = links.adminDoctorEditRedirect;

            listView.init();

            console.log('doc listing' + this.doctorListingUrl);

            //getting the programme list for the doctor
            $.get(this.doctorListingUrl ,  {})
            .done(function( response ) {
              console.log("Doctor List: " + JSON.stringify(response));
              if(response.status == 1){
                listModel = response.data;
                listView.render();
                listView.overLay.addClass('hidden');
              }
            });

          },
          getListModel: function(){
            return listModel;
          }
        };


                var listView = {
                  init: function(){
                    this.tablebody = $('#doctor-list-table-body');
                    this.overLay = $('#dash-overlay');


                  },
                  render:  function(){

                    var doctorsList = controller.getListModel();
                    console.log('model in view ' + JSON.stringify (doctorsList));

                    var table = $('#example').DataTable( {
                      "bProcessing": true,
                      "data":  controller.getListModel(),
                      "aoColumns": [
                      { "mData": "name" },
                      { "mData": "contact" },
                      { "mData": "email" },
                      { "mData": "qualifications" },
                      { "mData": "isActive",
                      "mRender" : function(column, type, row){
                        if(column == 1){
                          return '<label>Active</label>'
                        }else {
                          return '<label>Inactive</label>'
                        }

                      }

                    },
                      { "mData": "id",
                      "mRender" : function(column, type, row){
                        return '<a href = " '+controller.adminDoctorEditRedirect + '?id=' +column+'" class="btn btn-sm btn-default">Edit</a>';
                      }
                    }
                    ],
                    "order": [[1, 'asc']]
                  } );

                    

                  }
                };


                controller.init();


    }());

});
