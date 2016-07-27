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
        this.getLocationsUrl = links.getActiveLocations;
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
           trigger:"focus click change keyup select blur",
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
                   message : 'Please enter a name'
                 }
               }

             },
                lname : {
               validators : {
                 notEmpty : {
                   message : 'Please enter last name'
                 }
               }

             }
             , s_email :{

               validators : {
                 emailAddress :{
                   message : 'Please enter valid email'
                 },
                 notEmpty :{
                   message : 'Please enter a email'
                 }
               }
             }
             ,  uname :{

               validators : {
                 notEmpty :{
                   message : 'Please enter username'
                 }
               }
             },
             pswd :{
              validators : {
                notEmpty :{
                  message : 'Please enter staff password'
                }
              }
            },
            s_location:{

             validators : {
               notEmpty :{
                 message : 'Please select location'
               }
             }
           }
             , phone1 :{

               validators : {
                 notEmpty :{
                   message : 'Please enter contact no'
                 },
                 regexp: {
                               regexp:  /^\+?[0-9()-\s]+$/,
                                 message: 'Please enter a valid phone no'
                             }

               }
             },
               Saddress :{

               validators : {
                 notEmpty :{
                   message : 'Please enter address'
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
                           if(response.status.status == "1"){

                               console.log("successfully edited");
                               window.location.href = links.doctorsStaffListingUr+"?status=1";

                             console.log('Please select another login Id');
                           }else if(response.status.status == "-1"){

                               utility.getAlerts(" <strong>oops!</strong> The login id is taken, please try another Id!.","alert-warning text-center",'','.container-fluid');

                             console.log('The login id is taken, please try another Id!');

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
        // var option = $('<option/>',{
        //                 text: 'Select...',
        //                 selected: 'selected'
        //               }
        //               );
        //this.selectLocations.append(option);

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
       if(model.staff.locationId != 0){
         CreateUpdateView.selectLocations.val(model.staff.locationId);
       }

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
