$(document).ready(function(){

    $(function(){

        console.log('add staff js loaded');
    var model = {
      locations:[],
      staff:{
         id:0,
         firstName:"",
         lastName:"",
         contact1:"",
         contact2:"",
         email:"",
         address:"",
         userName:"",
         pasword:"",
         recoveryContact:"",
         recoveryEmail:"",
         locationId:0,
         isActive:0
      }
  }

    var controller = {
      init: function(){
        this.getLocationsUrl = links.locationListUrl;
        this.createModifyStaffUrl = links.createModifyStaffUrl;
        this.getStaffDetailsUrl = links.getStaffDetailsUrl;

        CreateUpdateView.init();

        $.get(this.getLocationsUrl , {})
         .done(function( response ) {
           console.log('locs ' + JSON.stringify(response));
           model.locations = response.data;
           CreateUpdateView.render();


           var staffId = utility.getURLParam('id');

           if(staffId){
             console.log(staffId);
             controller.updateStaffModelFromServer(staffId);
             CreateUpdateView.render();
             CreateUpdateView.validator.bootstrapValidator('enableFieldValidators', 'pswd', false);
           }


         });

      },
      getLocationList: function(){
        return model.locations;
      },
      getStaffModel: function(){
        return model.staff;
      },
      updateStaffModelFromServer: function(staffId){
        $.get(controller.getStaffDetailsUrl , {id:staffId})
         .done(function( response ) {
           console.log('staff details ' + JSON.stringify(response));
           model.staff = response.data;
           CreateUpdateView.render();
         });
      },
      resetModel: function() {
        model.staff = {
             id:0,
             firstName:"",
             lastName:"",
             contact1:"",
             contact2:"",
             email:"",
             address:"",
             userName:"",
             pasword:"",
             recoveryContact:"",
             recoveryEmail:"",
             locationId:0,
             isActive:0
          }
      },
      getUpdateModelFromView: function(){

        model.staff.firstName = CreateUpdateView.firstName.val();
        model.staff.lastName = CreateUpdateView.lastName.val();
        model.staff.contact1 = CreateUpdateView.contact1.val();
        model.staff.contact2 = CreateUpdateView.contact2.val();
        model.staff.email = CreateUpdateView.email.val();
        model.staff.address = CreateUpdateView.address.val();
        model.staff.userName = CreateUpdateView.userName.val();

        var newPass =  CreateUpdateView.pasword.val();
        if(!validator.isEmptyString(newPass)){
            model.staff.pasword =  newPass.trim();
        }else{
            model.staff.pasword = "";
        }

        var selectedValue = CreateUpdateView.selectLocations.find(":selected").attr('value');
        if(selectedValue){
          model.staff.locationId = selectedValue;
        }

        if(CreateUpdateView.activeControl.is(":checked")){
          model.staff.isActive = 1;
        }else{
          model.staff.isActive = 0;
        }

        return model.staff;

      }
    }

    var CreateUpdateView = {
      init: function(){
        this.firstName = $('#fname');
        this.lastName = $('#lname');
        this.contact1 = $('#contact1');
        this.contact2 = $('#contact2');
        this.email = $('#email');
        this.address = $('#address');
        this.userName = $('#uname');
        this.pasword = $('#pswd');
        this.recoveryContact = $('#recovery-contact');
        this.recoveryEmail = $('#recovery-email');
        this.activeControl  = $('#sactive');
        this.inActiveControl  = $('#sinactive');
        this.selectLocations = $('#sel-locations');

        this.validator =   $("#staffFrm").bootstrapValidator({
           trigger:" focus blur",
           feedbackIcons: {
             valid: 'glyphicon glyphicon-ok ',
             invalid: 'glyphicon glyphicon-remove ',
             validating: 'glyphicon glyphicon-refresh'
           },
             excluded: [':disabled'],
           fields:{
             fname : {
               validators : {
                 notEmpty : {
                   message : 'Please enter staff member\'s  Name!'
                 }
               }

             },

                lname : {
               validators : {
                 notEmpty : {
                   message : 'Please Enter staff member\'s last Name!'
                 }
               }

             }


             , s_email :{

               validators : {
                 emailAddress :{
                   message : 'Please Enter valid email'
                 },
                 notEmpty :{
                   message : 'Please enter patients Email Id'
                 }
               }
             }
             ,  uname :{

               validators : {
                 notEmpty :{
                   message : 'Please enter staff member\'s username'
                 }
               }
             },

             pswd :{

              validators : {
                notEmpty :{
                  message : 'Please enter staff member\'s password'
                }
              }
            },


            s_location:{

             validators : {
               notEmpty :{
                 message : 'Please enter staff member\'s password'
               }
             }
           }
             , phone1 :{

               validators : {
                 notEmpty :{
                   message : 'Please enter staff member\'s contact no'
                 },
                 regexp: {
                               regexp:  /^\+?[0-9()-\s]+$/,
                                 message: 'Please enter a valid phone no'
                             }

               }
             }
             ,  phone2 :{

               validators : {
                 notEmpty :{
                   message : 'Please enter staff member\'s alternate phone no'
                 }
               }
             },

               Saddress :{

               validators : {
                 notEmpty :{
                   message : 'Please enter patients address'
                 }
               }
             }



           }
         }).on('success.form.bv',function(e){
              e.preventDefault();

                        console.log('save click');

                        var staff = controller.getUpdateModelFromView();

                        $.post(controller.createModifyStaffUrl , staff)
                         .done(function( response ) {
                           console.log('response ' + JSON.stringify(response));
                           if(response.status == "1"){
                               $('#man-staff-before-submit-success').removeClass('hidden');
                               console.log("successfully edited");
                                  window.location.href = links.doctorsStaffListingUr;

                             console.log('Please select another login Id');
                           }else if(response.data.status == "-1"){
                             $('#man-staff-before-submit-success').removeClass('hidden');

                             console.log('saved successfully, now you will receive a confirmation email, then you can login');

                           }

                           controller.resetModel();
                           CreateUpdateView.render();
                           //model.locations = response.data;
                           //CreateUpdateView.render();
                         });



           });


        this.saveButton = $('#btn-save');
        this.cancelButton = $('#btn-staff-cancel');



        this.saveButton.click(function() {
            $("#staffFrm").submit();
        });

        this.cancelButton .on('click', function(e){
          e.preventDefault();
          controller.resetModel();
          CreateUpdateView.render();
        });

      },
      render: function(){


        this.selectLocations.empty();

        //adding the select option to the list
        var option = $('<option/>',{
                        value: 0,
                        text: 'Select...',
                        selected: 'selected'
                      }
                      );
        this.selectLocations.append(option);

        var locations = controller.getLocationList();

        for(var i = 0; i < locations.length; i++){
          var option = $('<option/>',{
                          value: locations[i].id,
                          text: locations[i].name
                        }
                        );
         this.selectLocations.append(option);

       }//


       //updating the staff details in the view

       CreateUpdateView.firstName.val(model.staff.firstName);
       CreateUpdateView.lastName.val(model.staff.lastName);
       CreateUpdateView.contact1.val(model.staff.contact1);
       CreateUpdateView.contact2.val(model.staff.contact2);
       CreateUpdateView.email.val(model.staff.email);
       CreateUpdateView.address.val(model.staff.address);
       CreateUpdateView.userName.val(model.staff.userName);
       CreateUpdateView.pasword.val('');


       //setting the locatio option
       CreateUpdateView.selectLocations.val(model.staff.locationId);

         // CreateUpdateView.selectLocations.find(':option[value="' + model.staff.locationId + '"]').attr('selected', 'selected');

       if(model.staff.isActive){
         CreateUpdateView.activeControl.prop('checked', true);
         CreateUpdateView.inActiveControl.prop('checked', false);

       }else{
         CreateUpdateView.activeControl.prop('checked', false);
         CreateUpdateView.inActiveControl.prop('checked', true);
       }

         //



      }
    }

    controller.init();

  }());


});
