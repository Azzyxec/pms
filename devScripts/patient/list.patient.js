$(document).ready(function(){
 /*    
 this.table = $('#dataTables-example').DataTable({
                responsive: true,
     ajax: dataSet,
        columns: [
            { title: "Name" },
            { title: "Date of birth" },
            { title: "Blood Group" },
            { title: "Gender" },
            { title: "Contact" },
            { title: "Action" }
        ]
        });*/
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

          },
          render:  function(){

             var patientsList = controller.getListModel();
              //console.log(JSON.stringify(controller.getData()));
            console.log('model in view' + JSON.stringify(patientsList));
              
              
          
              
 

 

    var table = $('#example').DataTable( {
        "bProcessing": true,
    "data":  controller.getListModel(),
        "aoColumns": [
           
            { "mData": "name" },
            { "mData": "dateOfBirth" },
            { "mData": "bloodGroup" },
            { "mData": "genderText" },
            { "mData": "contact" },
            { "mData": 'id',
            
                "mRender" : function ( data, type, full ) {
    return '<a href="' + controller.editPatientRedirect + '?id='+data+'">EDIT</a>';}
            }
             
        ],
        "order": [[1, 'asc']]
    } );
     
   


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
