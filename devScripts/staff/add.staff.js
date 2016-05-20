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
           console.log('response ' + JSON.stringify(response));
           model.staff = response.data;
           CreateUpdateView.render();


           var staffId = utility.getURLParam('id');

           if(staffId){
             console.log(staffId);
             controller.updateStaffModelFromServer(staffId);
             CreateUpdateView.render();
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
      getUpdateModelFromView: function(){

        model.staff.firstName = CreateUpdateView.firstName.val();
        model.staff.lastName = CreateUpdateView.lastName.val();
        model.staff.contact1 = CreateUpdateView.contact1.val();
        model.staff.contact2 = CreateUpdateView.contact2.val();
        model.staff.email = CreateUpdateView.email.val();
        model.staff.address = CreateUpdateView.address.val();
        model.staff.userName = CreateUpdateView.userName.val();
        model.staff.pasword = CreateUpdateView.pasword.val();
        model.staff.recoveryContact = CreateUpdateView.recoveryContact.val();
        model.staff.recoveryEmail = CreateUpdateView.recoveryEmail.val();

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

        this.saveButton = $('#btn-save');

        this.saveButton.click(function() {

          console.log('save click');

          var staff = controller.getUpdateModelFromView();

          $.post(controller.createModifyStaffUrl , staff)
           .done(function( response ) {
             console.log('response ' + JSON.stringify(response));
             //model.locations = response.data;
             //CreateUpdateView.render();
           });

        });

      },
      render: function(){

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
       CreateUpdateView.pasword.val(model.staff.pasword);
       CreateUpdateView.recoveryContact.val(model.staff.recoveryContact);
       CreateUpdateView.recoveryEmail.val(model.staff.recoveryEmail);

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

      }
    }

    controller.init();

  }());


});
