$(document).ready(function(){
    
     $(function(){
        console.log('close appointment js loaded');
        //intilizing the date and time controls
      $("#datetimepickerForClose2").datetimepicker({
       inline:false,
        format:'DD-MM-YYYY'
      });
    $("#datetimepickerForClose3").datetimepicker({
         inline:false,
        format:'LT'
      });
    $("#datetimepickerForClose4").datetimepicker({
       inline:false,
        format:'DD-MM-YYYY'
      });
      $("#datetimepickerForClose5").datetimepicker({
       inline:false,
        format:'LT'
      });
  
         
    }());
    
   
    
    
  
    
   
    
    
    //initilizing the source typeahead
        $('#tokenfield').typeahead({
     
        source: ['akhildf','jossdfeph','Agnsdfelo','Rubsdfan','Rosdfnald','Sosdfnia']
        });
   
    
   $(function () {
       
        $('#fileupload').fileupload({
      
        dataType: 'json',
        done: function (e, data) {
            $.each(data.result.files, function (index, file) {
                $('<p/>').text(file.name).appendTo('#files');
            });
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#fileupload-progress-bar').css(
                'width',
                progress + '%'
            );
        }
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
       
   });
   
    
    $('#tokenfield').tokenfield();
   

 
  $('#tokenfield').on('tokenfield:createdtoken', function (e) {
      e.preventDefault();
    // Über-simplistic e-mail validation
   // var re = /\S+@\S+\.\S+/
    //var valid = re.test(e.attrs.value)
    //if (!valid) {
      //$(e.relatedTarget).addClass('invalid')
    //}
  });

  

    
    
    
    var CloseValidator =   $("#addCompanyForm").bootstrapValidator({
        trigger:" focus blur",
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok ',
          invalid: 'glyphicon glyphicon-remove ',
          validating: 'glyphicon glyphicon-refresh'
        },
          excluded: [':disabled'],
        fields:{
          closingDate : {
            validators : {
              notEmpty : {
                message : 'Please enter closing date!'
              }
            }

          },

          closingTime : {

            validators : {
              notEmpty : {
                message : 'please enter closing time'
              }
            }
          },
          closeNextAppt : {
            validators : {
              notEmpty :{
                message : 'please select the date for the next appointment'
              }
            }
          },
          closingNextApptTime :{

            validators : {
              notEmpty :{
                message : 'Please Select the time for the next appointment'
              }
            }
          }
          , closingName :{

            validators : {
              notEmpty :{
                message : 'Please Enter Patients name'
              },
                regexp: {
                        regexp: /^[A-Za-z\s.\(\)0-9]{3,}$/,
                        message: 'The full name can consist of alphabetical characters and spaces only'
                    }
            }
          }

          , closingPrescpList :{

            validators : {
              notEmpty :{
                message : 'Please Enter the prescription'
              }
            }
          }
          ,  closingRemarks :{

            validators : {
              notEmpty :{
                message : 'Please leave a remark'
              }
            }
          }
          



    
        }
      });
    $("#timeline-close-appointment-window").on('hidden.bs.modal', function () {

            $("#timeline-close-appointment-window").find('form')[0].reset();
          $('#addCompanyForm').bootstrapValidator("resetForm",true);




      });
      validator.on('success.form.bv',function(e){
          e.preventDefault();

         console.log("validating close appt")


        });
    
    

     

});
