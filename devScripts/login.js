$(document).ready(function(){

  $(function(){
    console.log('login component');

    var controller = {
      init: function(){
        loginView.init();
      },
      authenticateUrl: links.authenticateUrl,
      successRedirectUrl: links.successRedirectUrl,
      registerDoctorUrl: links.registerDoctorUrl,
      forgotPaswordUrl: links.forgotPasswordUrl,
      adminUrl: links.adminUrl,
      authenticate: function(pLoginId, pPassword){
        loginView.loginBtn.attr('disabled','disbled');

        console.log('call authenticate');
        console.log(controller.authenticateUrl);
        $.post( controller.authenticateUrl , { loginId:  pLoginId, password:  pPassword })
        .done(function( response ) {
          console.log('response ' + JSON.stringify(response));



          if(response.data.type == "-1"){
            loginView.loginBtn.removeAttr('disabled');
            console.log('invalid username or password');
            loginView.alertCredentialsInvalid.removeClass('hidden');
          }else if(+response.data.isActive == 0){
            console.log('Account is inactive, please contact the administrator to activate the account');
          }else if(response.data.type == "A"){
            console.log('authenticated as admin');
            window.location.href = controller.adminUrl;
          }else if(response.data.type == "D"){
            console.log('authenticated as doctor');
            window.location.href = controller.successRedirectUrl;
          }else if(response.data.type == "S"){
            window.location.href = controller.successRedirectUrl;
            console.log('staff authenticated');
          }else{
            loginView.loginBtn.removeAttr('disabled');
          }

        });
      }
    };

    var loginView = {
      init: function(){
        console.log('view init');

        this.loginId =  $('#login-id');
        this.password =  $('#login-password');

        this.alertLoginIdNeeded = $('#alert-user-id-needed');
        this.alertPassNeeded = $('#alert-password-needed');
        this.alertCredentialsInvalid = $('#alert-creds-invalid');

        var controls = {loginId: this.loginId, password: this.password};

        $(document).keypress(function(event) {
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13') {
              //console.log('handler exec : ' + cat.Id);
              console.log('click submit' + controls.loginId.val());
              console.log('url: ' + controller.authenticateUrl);

              loginView.hideAllAlerts();

              //validations
              var lloginId = loginView.loginId.val();
              var lpassword = loginView.password.val();

              if(!lloginId || !lloginId.trim()){
                console.log('pass');
                loginView.alertLoginIdNeeded.removeClass('hidden');
                return;
              }else if(!lpassword || !lpassword.trim()){
                console.log('confirm pass');
                loginView.alertPassNeeded.removeClass('hidden');
                return;
              }

              controller.authenticate(lloginId, lpassword);
            }
        });


        this.loginBtn = $('#login-submit');



        //wiring events
        this.loginBtn.on('click', function(){
            //console.log('handler exec : ' + cat.Id);
            console.log('click submit' + controls.loginId.val());
            console.log('url: ' + controller.authenticateUrl);

            loginView.hideAllAlerts();

            //validations
            var lloginId = loginView.loginId.val();
            var lpassword = loginView.password.val();

            if(!lloginId || !lloginId.trim()){
              console.log('pass');
              loginView.alertLoginIdNeeded.removeClass('hidden');
              return;
            }else if(!lpassword || !lpassword.trim()){
              console.log('confirm pass');
              loginView.alertPassNeeded.removeClass('hidden');
              return;
            }

            controller.authenticate(lloginId, lpassword);

        });

        $('#btn-register-doctor').attr('href', controller.registerDoctorUrl);
        $('#btn-forgot-password').attr('href', controller.forgotPaswordUrl);

      },
      hideAllAlerts: function(){
        this.alertLoginIdNeeded.addClass('hidden');
        this.alertPassNeeded.addClass('hidden');
        this.alertCredentialsInvalid.addClass('hidden');
      }
    };
    controller.init();

  }());

});
