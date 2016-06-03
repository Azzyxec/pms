$(document).ready(function(){

  $(function(){
    console.log('forgot password js loaded');

    var model = {
      resetCode: ''
    }

    var controller = {
      init: function(){
        this.passwordResetUrl = links.passwordResetUrl;
        this.doctorDashboardUrl = links.dashboardHomeUrl;
        this.forgotPasswordUrl = links.forgotPasswordUrl;

        var resetCode = utility.getURLParam('code');
        //console.log('log reset code ' + resetCode);
        if(resetCode){
          //console.log('log reset code ' + resetCode);
          model.resetCode = resetCode;
          view.init();
        }else{
          //redirect to login
        }

      },
      resetPassword: function(newPass){

        code = model.resetCode;
        $.post( controller.passwordResetUrl , { password: newPass, resetCode: code})
        .done(function( response ) {
          console.log('respose ' + JSON.stringify(response));

          if(response.status == 0){
            console.log('success');
            var user = response.data;
            if(user.type == 'D'){
              console.log('redirect to doc');
              window.location.href = controller.doctorDashboardUrl;
            }else if (user.type == 'S'){
              console.log('redirect to staff');
              //redirect to staff dashboard
              //window.location.href = controller.doctorDashboardUrl;
            }
            //password reset successfully, now redirect

          }else if(response.status == 2){
            //code is not valid,
            console.log('reset code is not valid');
            view.alertResetCodeInvalid.removeClass('hidden');
          }

        });

      }
    };


    var view = {
      init: function(){
        this.txtPassword = $('#txt-password');
        this.txtConfirmPassword = $('#txt-confirm-password');
        this.btnResetPassword = $('#btn-reset-password');
        this.linkForgotPassword = $('#link-forgot-password');

        this.alertPassNeeded = $('#alert-password-needed');
        this.alertConfirmPassNeeded = $('#alert-confirm-password-needed');
        this.alertMatchingValidation = $('#alert-password-not-matching');
        this.alertInfo = $('#alert-info');
        this.alertResetCodeInvalid = $('#alert-reset-code-invalid');


        console.log('init view');

        this.linkForgotPassword.attr('href', controller.forgotPasswordUrl);

        this.btnResetPassword.click(function(){
          view.hideAllAlerts();

          var password = view.txtPassword.val();
          var confirmPassword = view.txtConfirmPassword.val();

          console.log('pass' + password + ' confirm ' + confirmPassword);

          if(!password || !password.trim()){
            console.log('pass');
            view.alertPassNeeded.removeClass('hidden');
            return;
          }else if(!confirmPassword || !confirmPassword.trim()){
            console.log('confirm pass');
            view.alertConfirmPassNeeded.removeClass('hidden');
            return;
          }else if(password != confirmPassword){
            console.log('matching');
            view.alertMatchingValidation.removeClass('hidden');
            return;
          }

          controller.resetPassword(password);

        });

      },
      hideAllAlerts: function(){
        this.alertPassNeeded.addClass('hidden');
        this.alertConfirmPassNeeded.addClass('hidden');
        this.alertMatchingValidation.addClass('hidden');
        this.alertInfo.addClass('hidden');
        this.alertResetCodeInvalid.addClass('hidden');
      }
    };

    controller.init();

  }());

});
