$(document).ready(function(){
    

    $(function(){
        console.log('lsit appointment js loaded');
 
 
 $(function(){
        console.log('patient listings js loaded');

        var listModel = {};
        
      
        var controller = {
          init: function(){
            this.allAppointmentsUrl = links.getAllAppointmentsUrl;
            this.viewPatientHistory = links.patientsHistoryUrl;
           
console.log("controller intialized");
           

            //getting the programme list for the doctor
            $.get(controller.allAppointmentsUrl , {})
            .done(function( response ) {
              console.log("patients list: " + JSON.stringify(response));
              listModel = response.data;
              listView.render();
            });

          },
          getApptListModel: function(){
            return listModel;
          }
       
        }; 


        var listView = {
          init: function(){
           

          },
          render:  function(){

             var appointmentsList = controller.getApptListModel();
              //console.log(JSON.stringify(controller.getData()));
            console.log('model in view' + JSON.stringify(appointmentsList));
              
          
 

 

    var table = $('#example').DataTable( {
        "bProcessing": true,
        "data":  controller.getApptListModel(),
        "aoColumns": [
           
            { "mData": "name" },
            { "mData": "date" },
            { "mData": "startMins" },
            { "mData": "location" },
            { "mData": "description",
            "mRender" : function ( data, type, full ) {
    return ' <span tabindex="0" class="" role="button" data-toggle="popover" data-html="true" data-trigger="focus" data-placement="bottom" title="View Ailment" data-content="'+data+'">'+data.slice(0,10)+'...</span>';}
            
            
            },
            { "mData": 'patientId',
            
            "mRender" : function ( data, type, full ) {
    return ' <a data-toggle="tooltip" title="Reschedule appointment"><span style="font-size: 1.3em;" class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a><span class="invisible">..</span><a data-toggle="tooltip" title="Close appointment"><span style="font-size: 1.3em;" class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span></a><span class="invisible">..</span><a data-toggle="tooltip" title="Patients history"><span  style="font-size: 1.3em;" class="glyphicon glyphicon-list-alt" aria-hidden="true"></span></a>';}
            }
             
        ],
        "order": [[1, 'asc']]
    } );
     
   
    $(function () {
    $('[data-toggle="popover"]').popover({'trigger':'focus','placement':'left'})

  });
          
              

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

        
    }());

});
