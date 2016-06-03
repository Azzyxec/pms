$(document).ready(function(){

  $(function(){
    console.log('forgot password js loaded');
  }());

  var controller = {
    init: function(){
      this.loginUrl = links.loginUrl;
      this.passwordRestRequestUrl = links.passwordRestRequestUrl;
      view.init();
    },
    resetPasswordFor: function(userId){

      $.post( controller.passwordRestRequestUrl , { loginId: userId})
      .done(function( response ) {
        console.log('respose ' + JSON.stringify(response));
        view.hideAllAlerts();

        if(response.data.status == 0){
          console.log('password reset link has been sent to you');
          view.alertSuccess.removeClass('hidden');
          view.emailLabel.text(response.data.email);
          view.clearText();
        }else if(response.data.status == 2){
          console.log('this user is inactive');
          view.alertCantRest.removeClass('hidden');
        }

      });

    }
  };


  var view = {
    init: function(){
      this.txtLoginId = $('#txt-login-id');
      this.btnResetPassword = $('#btn-reset-password');
      this.linkLogin = $('#link-login');



      this.alertValidation = $('#alert-error');
      this.alertSuccess = $('#alert-success');
      this.alertCantRest = $('#alert-warning');
      this.alertInfo = $('#alert-info');

      this.emailLabel = $('#lbl-email');

      this.linkLogin.attr('href', controller.loginUrl);

      this.btnResetPassword.click(function(){
        view.hideAllAlerts();

        var loginId = view.txtLoginId.val();
        if(loginId || loginId.trim()){
          controller.resetPasswordFor(loginId);
        }else {
          console.log('please enter a user id');
          view.alertValidation.removeClass('hidden');
        }
      });

    },
    clearText: function(){
      this.txtLoginId.val('');
    },
    hideAllAlerts: function(){
      this.alertValidation.addClass('hidden');
      this.alertSuccess.addClass('hidden');
      this.alertCantRest.addClass('hidden');
      this.alertInfo.addClass('hidden');
    }
  };

  controller.init();

});
