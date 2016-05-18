$(document).ready(function(){
  console.log('login component');

  var controller = {
                      init: function(){
                        loginView.init();
                      },
                      authenticateUrl: "index.php/authenitcateUser",
                      successRedirectUrl: "index.php/doctorDashboard",
                      registerDoctorUrl: "index.php/doctorInfo"
                   };

    var loginView = {
                      init: function(){
                        console.log('view init');

                        this.loginId =  $('#login-id');
                        this.password =  $('#login-password');

                        var controls = {loginId: this.loginId, password: this.password};


                        //wiring events
                        $('#login-submit').on('click', (function(controls){
                          //console.log('handler added : ' + cat.Id);
                          return function(){
                            //console.log('handler exec : ' + cat.Id);
                            console.log('click submit' + controls.loginId.val());
                              console.log('url: ' + controller.authenticateUrl);

                               $.post( controller.authenticateUrl , { loginId:  controls.loginId.val(), password:  controls.password.val() })
                                .done(function( response ) {
                                  console.log('response ' + JSON.stringify(response));

                                  if(response.data.type == "-1"){
                                    console.log('invalid username or password');
                                  }else if(response.data.type == "A"){
                                    console.log('authenticated as admin');
                                    window.location.href = "index.php/admin";
                                  }else if(response.data.type == "D"){
                                    console.log('authenticated as doctor');
                                    window.location.href = controller.successRedirectUrl;
                                  }

                                });

                          };
                        })(controls));

                        $('#btn-register-doctor').on('click', function(){
                          console.log('register click redirect');
                          window.location.href = controller.registerDoctorUrl;
                        });


                        // $.post( controller.authenticateUrl , { loginId: this.loginId.val(), password: this.password.val() })
                        //  .done(function( data ) {
                        //    console.log('data ' + JSON.stringify(data));
                        //  });
                      },
                      render: function(){

                      }
                    };
    controller.init();

});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibG9naW4uYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuICBjb25zb2xlLmxvZygnbG9naW4gY29tcG9uZW50Jyk7XHJcblxyXG4gIHZhciBjb250cm9sbGVyID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9naW5WaWV3LmluaXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICBhdXRoZW50aWNhdGVVcmw6IFwiaW5kZXgucGhwL2F1dGhlbml0Y2F0ZVVzZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NSZWRpcmVjdFVybDogXCJpbmRleC5waHAvZG9jdG9yRGFzaGJvYXJkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICByZWdpc3RlckRvY3RvclVybDogXCJpbmRleC5waHAvZG9jdG9ySW5mb1wiXHJcbiAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgIHZhciBsb2dpblZpZXcgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndmlldyBpbml0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2luSWQgPSAgJCgnI2xvZ2luLWlkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFzc3dvcmQgPSAgJCgnI2xvZ2luLXBhc3N3b3JkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29udHJvbHMgPSB7bG9naW5JZDogdGhpcy5sb2dpbklkLCBwYXNzd29yZDogdGhpcy5wYXNzd29yZH07XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy93aXJpbmcgZXZlbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNsb2dpbi1zdWJtaXQnKS5vbignY2xpY2snLCAoZnVuY3Rpb24oY29udHJvbHMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2hhbmRsZXIgYWRkZWQgOiAnICsgY2F0LklkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2hhbmRsZXIgZXhlYyA6ICcgKyBjYXQuSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NsaWNrIHN1Ym1pdCcgKyBjb250cm9scy5sb2dpbklkLnZhbCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3VybDogJyArIGNvbnRyb2xsZXIuYXV0aGVudGljYXRlVXJsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLnBvc3QoIGNvbnRyb2xsZXIuYXV0aGVudGljYXRlVXJsICwgeyBsb2dpbklkOiAgY29udHJvbHMubG9naW5JZC52YWwoKSwgcGFzc3dvcmQ6ICBjb250cm9scy5wYXNzd29yZC52YWwoKSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uKCByZXNwb25zZSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXNwb25zZSAnICsgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5kYXRhLnR5cGUgPT0gXCItMVwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ludmFsaWQgdXNlcm5hbWUgb3IgcGFzc3dvcmQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHJlc3BvbnNlLmRhdGEudHlwZSA9PSBcIkFcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhdXRoZW50aWNhdGVkIGFzIGFkbWluJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCJpbmRleC5waHAvYWRtaW5cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHJlc3BvbnNlLmRhdGEudHlwZSA9PSBcIkRcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhdXRoZW50aWNhdGVkIGFzIGRvY3RvcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIuc3VjY2Vzc1JlZGlyZWN0VXJsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkoY29udHJvbHMpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNidG4tcmVnaXN0ZXItZG9jdG9yJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVnaXN0ZXIgY2xpY2sgcmVkaXJlY3QnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGNvbnRyb2xsZXIucmVnaXN0ZXJEb2N0b3JVcmw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICQucG9zdCggY29udHJvbGxlci5hdXRoZW50aWNhdGVVcmwgLCB7IGxvZ2luSWQ6IHRoaXMubG9naW5JZC52YWwoKSwgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQudmFsKCkgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gIC5kb25lKGZ1bmN0aW9uKCBkYXRhICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBjb25zb2xlLmxvZygnZGF0YSAnICsgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgcmVuZGVyOiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgY29udHJvbGxlci5pbml0KCk7XHJcblxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
