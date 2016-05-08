$(document).ready(function(){
  console.log('doctor registration in ');

  var doctorModel = {
     id:0,
     name:"",
     contact:"",
     alternateContact: "",
     email: "",
     qualifications: "",
     address:"",
     recoveryContact:"",
     recoveryEmail:"",
     userName:"",
     password:"",
     isActive:1
  };

  var controller = {
      init: function(){
        this.doctorUrl =  "index.php/saveUpdateDoctor";
        this.doctorDetailsUrl =  "index.php/getDoctorDetails";
        this.loginCheckUrl = "index.php/isLoggedIn";
        this.doctorDashUrl = "index.php/doctorDashboard";
        formView.init();

        this.getDoctorInfo();
        //if the doctor is logged in then fill the form with the doctors data

      },
      getModel: function(){
        return doctorModel;
      },
      getDoctorInfo: function(){
        $.post( controller.loginCheckUrl , {})
         .done(function( response ) {
           console.log("login check: " + JSON.stringify(response));

           if(response.data.type == "D"){
             controller.updateModelFromServer(response.data.id);
           }

         });

      },
      updateModelFromServer: function(doctorId){
        $.get( controller.doctorDetailsUrl , {id: doctorId})
         .done(function( response ) {
           console.log("updateInfoFromServer: " + JSON.stringify(response));

           var doctor  = response.data;

           doctorModel.id = doctor.id;
           doctorModel.name = doctor.name;
           doctorModel.contact = doctor.contact;
           doctorModel.alternateContact = doctor.alternateContact;
           doctorModel.email = doctor.email;
           doctorModel.qualifications = doctor.qualifications;
           doctorModel.address = doctor.address;
           doctorModel.userName = doctor.userName;
           doctorModel.password = doctor.password;
           doctorModel.recoveryContact = doctor.recoveryContact;
           doctorModel.recoveryEmail = doctor.recoveryEmail;
           doctorModel.isActive = doctor.isActive;

           formView.render();

         });

      },
      updateModelFromView: function(){
        doctorModel.id = formView.idControl.val();
        doctorModel.name = formView.nameControl.val();
        doctorModel.contact = formView.contactControl.val();
        doctorModel.alternateContact = formView.alternatContactControl.val();
        doctorModel.email = formView.emailControl.val();
        doctorModel.qualifications = formView.qualificationControl.val();
        doctorModel.address = formView.addressControl.val();
        doctorModel.userName = formView.userNameControl.val();
        doctorModel.password = formView.passwordControl.val();
        doctorModel.recoveryContact = formView.recoveryContactControl.val();
        doctorModel.recoveryEmail = formView.recoveryEmailControl.val();


        if(formView.activeControl.is(":checked")){
          doctorModel.isActive = 1;
        }else{
          doctorModel.isActive = 0;
        }

        return doctorModel;
      },
      saveDoctorAndRedirect: function(){

        $.post( controller.doctorUrl , doctorModel)
         .done(function( response ) {
           console.log('response ' + JSON.stringify(response));


           if(response.data.status == "-1"){
             console.log('Please select another login Id');
           }else if(response.data.user.type == "D"){
             console.log('saved successfully');
             window.location.href = controller.doctorDashUrl;
           }

         });
      }
      /*getURLParam: function(name: string){

      var url = window.location.href;

      name = name.replace(/[\[\]]/g, "\\$&");

      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
      var results = regex.exec(url);

      if (!results) return null;
      if (!results[2]) return '';

      return decodeURIComponent(results[2].replace(/\+/g, " "));

    }*/
  };


  var formView = {
    init: function(){
      console.log('form view inti');

      this.idControl = $('#did');
      this.nameControl = $('#dname');
      this.contactControl = $('#dcontact');
      this.alternatContactControl = $('#dalternate-contact');
      this.emailControl = $('#demail');
      this.qualificationControl = $('#dqualifications');
      this.addressControl = $('#daddress');
      this.userNameControl = $('#duser-name');
      this.passwordControl = $('#dpassword');
      this.recoveryContactControl = $('#drecovery-contact');
      this.recoveryEmailControl = $('#drecovery-email');
      //doctor isactive/inactive radio controls
      this.activeControl = $('#dactive');
      this.inactiveControl = $('#dinactive');

      //controls are passed, so that they are available to click function as closure variables
      /*
      this.controls = { idControl: this.idControl,
                      nameControl: this.nameControl,
                      contactControl: this.contactControl,
                      alternatContactControl: this.alternatContactControl,
                      emailControl: this.emailControl,
                      qualificationControl: this.qualificationControl,
                      addressControl: this.addressControl,
                      userNameControl: this.userNameControl,
                      passwordControl: this.passwordControl,
                      activeControl: this.activeControl,
                      //inactiveControl: this.inactiveControl
                      };
                      */
      //wiring events


      $('#btn-doc-reg-sumit').on('click', (function(controller){
        //console.log('handler added : ' + cat.Id);
        return function(){
          //console.log('handler exec : ' + cat.Id);
          console.log('doctor reg click submit');
          //steps in saved
          //update mode with info from the view
          //persist the model i.e save update

          //updates the model with info from the view
          controller.updateModelFromView();
          console.log('model value' + JSON.stringify(doctorModel) );
          controller.saveDoctorAndRedirect();
        };
      })(controller)); //submit click handler


      this.render();
    },
    getControls: function(){
      return this.controls;
    },
    render: function() {

      var model = controller.getModel();

      this.idControl.val(model.id);
      this.nameControl.val(model.name);
      this.contactControl.val(model.contact);
      this.alternatContactControl.val(model.alternateContact);
      this.emailControl.val(model.email);
      this.qualificationControl.val(model.qualifications);
      this.addressControl.val(model.address);
      this.userNameControl.val(model.userName);
      this.passwordControl.val(model.password);
      this.recoveryContactControl.val(model.recoveryContact);
      this.recoveryEmailControl.val(model.recoveryEmail);


      if(model.isActive == 1){
        this.activeControl.prop('checked', true);
        this.inactiveControl.prop('checked', false);
      } else{
        this.activeControl.prop('checked', false);
        this.inactiveControl.prop('checked', true);

      }

      //doctor isactive/inactive radio controls
      //set controls depending up the data
      //this.activeControl = $('#dactive');
    }
  };

  controller.init();

});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZ2lzdHJhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImRvY3Rvci5yZWdpc3RyYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gIGNvbnNvbGUubG9nKCdkb2N0b3IgcmVnaXN0cmF0aW9uIGluICcpO1xyXG5cclxuICB2YXIgZG9jdG9yTW9kZWwgPSB7XHJcbiAgICAgaWQ6MCxcclxuICAgICBuYW1lOlwiXCIsXHJcbiAgICAgY29udGFjdDpcIlwiLFxyXG4gICAgIGFsdGVybmF0ZUNvbnRhY3Q6IFwiXCIsXHJcbiAgICAgZW1haWw6IFwiXCIsXHJcbiAgICAgcXVhbGlmaWNhdGlvbnM6IFwiXCIsXHJcbiAgICAgYWRkcmVzczpcIlwiLFxyXG4gICAgIHJlY292ZXJ5Q29udGFjdDpcIlwiLFxyXG4gICAgIHJlY292ZXJ5RW1haWw6XCJcIixcclxuICAgICB1c2VyTmFtZTpcIlwiLFxyXG4gICAgIHBhc3N3b3JkOlwiXCIsXHJcbiAgICAgaXNBY3RpdmU6MVxyXG4gIH07XHJcblxyXG4gIHZhciBjb250cm9sbGVyID0ge1xyXG4gICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuZG9jdG9yVXJsID0gIFwiaW5kZXgucGhwL3NhdmVVcGRhdGVEb2N0b3JcIjtcclxuICAgICAgICB0aGlzLmRvY3RvckRldGFpbHNVcmwgPSAgXCJpbmRleC5waHAvZ2V0RG9jdG9yRGV0YWlsc1wiO1xyXG4gICAgICAgIHRoaXMubG9naW5DaGVja1VybCA9IFwiaW5kZXgucGhwL2lzTG9nZ2VkSW5cIjtcclxuICAgICAgICB0aGlzLmRvY3RvckRhc2hVcmwgPSBcImluZGV4LnBocC9kb2N0b3JEYXNoYm9hcmRcIjtcclxuICAgICAgICBmb3JtVmlldy5pbml0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0RG9jdG9ySW5mbygpO1xyXG4gICAgICAgIC8vaWYgdGhlIGRvY3RvciBpcyBsb2dnZWQgaW4gdGhlbiBmaWxsIHRoZSBmb3JtIHdpdGggdGhlIGRvY3RvcnMgZGF0YVxyXG5cclxuICAgICAgfSxcclxuICAgICAgZ2V0TW9kZWw6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIGRvY3Rvck1vZGVsO1xyXG4gICAgICB9LFxyXG4gICAgICBnZXREb2N0b3JJbmZvOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICQucG9zdCggY29udHJvbGxlci5sb2dpbkNoZWNrVXJsICwge30pXHJcbiAgICAgICAgIC5kb25lKGZ1bmN0aW9uKCByZXNwb25zZSApIHtcclxuICAgICAgICAgICBjb25zb2xlLmxvZyhcImxvZ2luIGNoZWNrOiBcIiArIEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSk7XHJcblxyXG4gICAgICAgICAgIGlmKHJlc3BvbnNlLmRhdGEudHlwZSA9PSBcIkRcIil7XHJcbiAgICAgICAgICAgICBjb250cm9sbGVyLnVwZGF0ZU1vZGVsRnJvbVNlcnZlcihyZXNwb25zZS5kYXRhLmlkKTtcclxuICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICB9KTtcclxuXHJcbiAgICAgIH0sXHJcbiAgICAgIHVwZGF0ZU1vZGVsRnJvbVNlcnZlcjogZnVuY3Rpb24oZG9jdG9ySWQpe1xyXG4gICAgICAgICQuZ2V0KCBjb250cm9sbGVyLmRvY3RvckRldGFpbHNVcmwgLCB7aWQ6IGRvY3RvcklkfSlcclxuICAgICAgICAgLmRvbmUoZnVuY3Rpb24oIHJlc3BvbnNlICkge1xyXG4gICAgICAgICAgIGNvbnNvbGUubG9nKFwidXBkYXRlSW5mb0Zyb21TZXJ2ZXI6IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcclxuXHJcbiAgICAgICAgICAgdmFyIGRvY3RvciAgPSByZXNwb25zZS5kYXRhO1xyXG5cclxuICAgICAgICAgICBkb2N0b3JNb2RlbC5pZCA9IGRvY3Rvci5pZDtcclxuICAgICAgICAgICBkb2N0b3JNb2RlbC5uYW1lID0gZG9jdG9yLm5hbWU7XHJcbiAgICAgICAgICAgZG9jdG9yTW9kZWwuY29udGFjdCA9IGRvY3Rvci5jb250YWN0O1xyXG4gICAgICAgICAgIGRvY3Rvck1vZGVsLmFsdGVybmF0ZUNvbnRhY3QgPSBkb2N0b3IuYWx0ZXJuYXRlQ29udGFjdDtcclxuICAgICAgICAgICBkb2N0b3JNb2RlbC5lbWFpbCA9IGRvY3Rvci5lbWFpbDtcclxuICAgICAgICAgICBkb2N0b3JNb2RlbC5xdWFsaWZpY2F0aW9ucyA9IGRvY3Rvci5xdWFsaWZpY2F0aW9ucztcclxuICAgICAgICAgICBkb2N0b3JNb2RlbC5hZGRyZXNzID0gZG9jdG9yLmFkZHJlc3M7XHJcbiAgICAgICAgICAgZG9jdG9yTW9kZWwudXNlck5hbWUgPSBkb2N0b3IudXNlck5hbWU7XHJcbiAgICAgICAgICAgZG9jdG9yTW9kZWwucGFzc3dvcmQgPSBkb2N0b3IucGFzc3dvcmQ7XHJcbiAgICAgICAgICAgZG9jdG9yTW9kZWwucmVjb3ZlcnlDb250YWN0ID0gZG9jdG9yLnJlY292ZXJ5Q29udGFjdDtcclxuICAgICAgICAgICBkb2N0b3JNb2RlbC5yZWNvdmVyeUVtYWlsID0gZG9jdG9yLnJlY292ZXJ5RW1haWw7XHJcbiAgICAgICAgICAgZG9jdG9yTW9kZWwuaXNBY3RpdmUgPSBkb2N0b3IuaXNBY3RpdmU7XHJcblxyXG4gICAgICAgICAgIGZvcm1WaWV3LnJlbmRlcigpO1xyXG5cclxuICAgICAgICAgfSk7XHJcblxyXG4gICAgICB9LFxyXG4gICAgICB1cGRhdGVNb2RlbEZyb21WaWV3OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGRvY3Rvck1vZGVsLmlkID0gZm9ybVZpZXcuaWRDb250cm9sLnZhbCgpO1xyXG4gICAgICAgIGRvY3Rvck1vZGVsLm5hbWUgPSBmb3JtVmlldy5uYW1lQ29udHJvbC52YWwoKTtcclxuICAgICAgICBkb2N0b3JNb2RlbC5jb250YWN0ID0gZm9ybVZpZXcuY29udGFjdENvbnRyb2wudmFsKCk7XHJcbiAgICAgICAgZG9jdG9yTW9kZWwuYWx0ZXJuYXRlQ29udGFjdCA9IGZvcm1WaWV3LmFsdGVybmF0Q29udGFjdENvbnRyb2wudmFsKCk7XHJcbiAgICAgICAgZG9jdG9yTW9kZWwuZW1haWwgPSBmb3JtVmlldy5lbWFpbENvbnRyb2wudmFsKCk7XHJcbiAgICAgICAgZG9jdG9yTW9kZWwucXVhbGlmaWNhdGlvbnMgPSBmb3JtVmlldy5xdWFsaWZpY2F0aW9uQ29udHJvbC52YWwoKTtcclxuICAgICAgICBkb2N0b3JNb2RlbC5hZGRyZXNzID0gZm9ybVZpZXcuYWRkcmVzc0NvbnRyb2wudmFsKCk7XHJcbiAgICAgICAgZG9jdG9yTW9kZWwudXNlck5hbWUgPSBmb3JtVmlldy51c2VyTmFtZUNvbnRyb2wudmFsKCk7XHJcbiAgICAgICAgZG9jdG9yTW9kZWwucGFzc3dvcmQgPSBmb3JtVmlldy5wYXNzd29yZENvbnRyb2wudmFsKCk7XHJcbiAgICAgICAgZG9jdG9yTW9kZWwucmVjb3ZlcnlDb250YWN0ID0gZm9ybVZpZXcucmVjb3ZlcnlDb250YWN0Q29udHJvbC52YWwoKTtcclxuICAgICAgICBkb2N0b3JNb2RlbC5yZWNvdmVyeUVtYWlsID0gZm9ybVZpZXcucmVjb3ZlcnlFbWFpbENvbnRyb2wudmFsKCk7XHJcblxyXG5cclxuICAgICAgICBpZihmb3JtVmlldy5hY3RpdmVDb250cm9sLmlzKFwiOmNoZWNrZWRcIikpe1xyXG4gICAgICAgICAgZG9jdG9yTW9kZWwuaXNBY3RpdmUgPSAxO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgZG9jdG9yTW9kZWwuaXNBY3RpdmUgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRvY3Rvck1vZGVsO1xyXG4gICAgICB9LFxyXG4gICAgICBzYXZlRG9jdG9yQW5kUmVkaXJlY3Q6IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICQucG9zdCggY29udHJvbGxlci5kb2N0b3JVcmwgLCBkb2N0b3JNb2RlbClcclxuICAgICAgICAgLmRvbmUoZnVuY3Rpb24oIHJlc3BvbnNlICkge1xyXG4gICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXNwb25zZSAnICsgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcclxuXHJcblxyXG4gICAgICAgICAgIGlmKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09IFwiLTFcIil7XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZygnUGxlYXNlIHNlbGVjdCBhbm90aGVyIGxvZ2luIElkJyk7XHJcbiAgICAgICAgICAgfWVsc2UgaWYocmVzcG9uc2UuZGF0YS51c2VyLnR5cGUgPT0gXCJEXCIpe1xyXG4gICAgICAgICAgICAgY29uc29sZS5sb2coJ3NhdmVkIHN1Y2Nlc3NmdWxseScpO1xyXG4gICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb250cm9sbGVyLmRvY3RvckRhc2hVcmw7XHJcbiAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgLypnZXRVUkxQYXJhbTogZnVuY3Rpb24obmFtZTogc3RyaW5nKXtcclxuXHJcbiAgICAgIHZhciB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuXHJcbiAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoL1tcXFtcXF1dL2csIFwiXFxcXCQmXCIpO1xyXG5cclxuICAgICAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cChcIls/Jl1cIiArIG5hbWUgKyBcIig9KFteJiNdKil8JnwjfCQpXCIpO1xyXG4gICAgICB2YXIgcmVzdWx0cyA9IHJlZ2V4LmV4ZWModXJsKTtcclxuXHJcbiAgICAgIGlmICghcmVzdWx0cykgcmV0dXJuIG51bGw7XHJcbiAgICAgIGlmICghcmVzdWx0c1syXSkgcmV0dXJuICcnO1xyXG5cclxuICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHRzWzJdLnJlcGxhY2UoL1xcKy9nLCBcIiBcIikpO1xyXG5cclxuICAgIH0qL1xyXG4gIH07XHJcblxyXG5cclxuICB2YXIgZm9ybVZpZXcgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICBjb25zb2xlLmxvZygnZm9ybSB2aWV3IGludGknKTtcclxuXHJcbiAgICAgIHRoaXMuaWRDb250cm9sID0gJCgnI2RpZCcpO1xyXG4gICAgICB0aGlzLm5hbWVDb250cm9sID0gJCgnI2RuYW1lJyk7XHJcbiAgICAgIHRoaXMuY29udGFjdENvbnRyb2wgPSAkKCcjZGNvbnRhY3QnKTtcclxuICAgICAgdGhpcy5hbHRlcm5hdENvbnRhY3RDb250cm9sID0gJCgnI2RhbHRlcm5hdGUtY29udGFjdCcpO1xyXG4gICAgICB0aGlzLmVtYWlsQ29udHJvbCA9ICQoJyNkZW1haWwnKTtcclxuICAgICAgdGhpcy5xdWFsaWZpY2F0aW9uQ29udHJvbCA9ICQoJyNkcXVhbGlmaWNhdGlvbnMnKTtcclxuICAgICAgdGhpcy5hZGRyZXNzQ29udHJvbCA9ICQoJyNkYWRkcmVzcycpO1xyXG4gICAgICB0aGlzLnVzZXJOYW1lQ29udHJvbCA9ICQoJyNkdXNlci1uYW1lJyk7XHJcbiAgICAgIHRoaXMucGFzc3dvcmRDb250cm9sID0gJCgnI2RwYXNzd29yZCcpO1xyXG4gICAgICB0aGlzLnJlY292ZXJ5Q29udGFjdENvbnRyb2wgPSAkKCcjZHJlY292ZXJ5LWNvbnRhY3QnKTtcclxuICAgICAgdGhpcy5yZWNvdmVyeUVtYWlsQ29udHJvbCA9ICQoJyNkcmVjb3ZlcnktZW1haWwnKTtcclxuICAgICAgLy9kb2N0b3IgaXNhY3RpdmUvaW5hY3RpdmUgcmFkaW8gY29udHJvbHNcclxuICAgICAgdGhpcy5hY3RpdmVDb250cm9sID0gJCgnI2RhY3RpdmUnKTtcclxuICAgICAgdGhpcy5pbmFjdGl2ZUNvbnRyb2wgPSAkKCcjZGluYWN0aXZlJyk7XHJcblxyXG4gICAgICAvL2NvbnRyb2xzIGFyZSBwYXNzZWQsIHNvIHRoYXQgdGhleSBhcmUgYXZhaWxhYmxlIHRvIGNsaWNrIGZ1bmN0aW9uIGFzIGNsb3N1cmUgdmFyaWFibGVzXHJcbiAgICAgIC8qXHJcbiAgICAgIHRoaXMuY29udHJvbHMgPSB7IGlkQ29udHJvbDogdGhpcy5pZENvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lQ29udHJvbDogdGhpcy5uYW1lQ29udHJvbCxcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnRhY3RDb250cm9sOiB0aGlzLmNvbnRhY3RDb250cm9sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgYWx0ZXJuYXRDb250YWN0Q29udHJvbDogdGhpcy5hbHRlcm5hdENvbnRhY3RDb250cm9sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZW1haWxDb250cm9sOiB0aGlzLmVtYWlsQ29udHJvbCxcclxuICAgICAgICAgICAgICAgICAgICAgIHF1YWxpZmljYXRpb25Db250cm9sOiB0aGlzLnF1YWxpZmljYXRpb25Db250cm9sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgYWRkcmVzc0NvbnRyb2w6IHRoaXMuYWRkcmVzc0NvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICB1c2VyTmFtZUNvbnRyb2w6IHRoaXMudXNlck5hbWVDb250cm9sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmRDb250cm9sOiB0aGlzLnBhc3N3b3JkQ29udHJvbCxcclxuICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZUNvbnRyb2w6IHRoaXMuYWN0aXZlQ29udHJvbCxcclxuICAgICAgICAgICAgICAgICAgICAgIC8vaW5hY3RpdmVDb250cm9sOiB0aGlzLmluYWN0aXZlQ29udHJvbFxyXG4gICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgIC8vd2lyaW5nIGV2ZW50c1xyXG5cclxuXHJcbiAgICAgICQoJyNidG4tZG9jLXJlZy1zdW1pdCcpLm9uKCdjbGljaycsIChmdW5jdGlvbihjb250cm9sbGVyKXtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdoYW5kbGVyIGFkZGVkIDogJyArIGNhdC5JZCk7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKCdoYW5kbGVyIGV4ZWMgOiAnICsgY2F0LklkKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdkb2N0b3IgcmVnIGNsaWNrIHN1Ym1pdCcpO1xyXG4gICAgICAgICAgLy9zdGVwcyBpbiBzYXZlZFxyXG4gICAgICAgICAgLy91cGRhdGUgbW9kZSB3aXRoIGluZm8gZnJvbSB0aGUgdmlld1xyXG4gICAgICAgICAgLy9wZXJzaXN0IHRoZSBtb2RlbCBpLmUgc2F2ZSB1cGRhdGVcclxuXHJcbiAgICAgICAgICAvL3VwZGF0ZXMgdGhlIG1vZGVsIHdpdGggaW5mbyBmcm9tIHRoZSB2aWV3XHJcbiAgICAgICAgICBjb250cm9sbGVyLnVwZGF0ZU1vZGVsRnJvbVZpZXcoKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdtb2RlbCB2YWx1ZScgKyBKU09OLnN0cmluZ2lmeShkb2N0b3JNb2RlbCkgKTtcclxuICAgICAgICAgIGNvbnRyb2xsZXIuc2F2ZURvY3RvckFuZFJlZGlyZWN0KCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgfSkoY29udHJvbGxlcikpOyAvL3N1Ym1pdCBjbGljayBoYW5kbGVyXHJcblxyXG5cclxuICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH0sXHJcbiAgICBnZXRDb250cm9sczogZnVuY3Rpb24oKXtcclxuICAgICAgcmV0dXJuIHRoaXMuY29udHJvbHM7XHJcbiAgICB9LFxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgIHZhciBtb2RlbCA9IGNvbnRyb2xsZXIuZ2V0TW9kZWwoKTtcclxuXHJcbiAgICAgIHRoaXMuaWRDb250cm9sLnZhbChtb2RlbC5pZCk7XHJcbiAgICAgIHRoaXMubmFtZUNvbnRyb2wudmFsKG1vZGVsLm5hbWUpO1xyXG4gICAgICB0aGlzLmNvbnRhY3RDb250cm9sLnZhbChtb2RlbC5jb250YWN0KTtcclxuICAgICAgdGhpcy5hbHRlcm5hdENvbnRhY3RDb250cm9sLnZhbChtb2RlbC5hbHRlcm5hdGVDb250YWN0KTtcclxuICAgICAgdGhpcy5lbWFpbENvbnRyb2wudmFsKG1vZGVsLmVtYWlsKTtcclxuICAgICAgdGhpcy5xdWFsaWZpY2F0aW9uQ29udHJvbC52YWwobW9kZWwucXVhbGlmaWNhdGlvbnMpO1xyXG4gICAgICB0aGlzLmFkZHJlc3NDb250cm9sLnZhbChtb2RlbC5hZGRyZXNzKTtcclxuICAgICAgdGhpcy51c2VyTmFtZUNvbnRyb2wudmFsKG1vZGVsLnVzZXJOYW1lKTtcclxuICAgICAgdGhpcy5wYXNzd29yZENvbnRyb2wudmFsKG1vZGVsLnBhc3N3b3JkKTtcclxuICAgICAgdGhpcy5yZWNvdmVyeUNvbnRhY3RDb250cm9sLnZhbChtb2RlbC5yZWNvdmVyeUNvbnRhY3QpO1xyXG4gICAgICB0aGlzLnJlY292ZXJ5RW1haWxDb250cm9sLnZhbChtb2RlbC5yZWNvdmVyeUVtYWlsKTtcclxuXHJcblxyXG4gICAgICBpZihtb2RlbC5pc0FjdGl2ZSA9PSAxKXtcclxuICAgICAgICB0aGlzLmFjdGl2ZUNvbnRyb2wucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuaW5hY3RpdmVDb250cm9sLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgIH0gZWxzZXtcclxuICAgICAgICB0aGlzLmFjdGl2ZUNvbnRyb2wucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLmluYWN0aXZlQ29udHJvbC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICAvL2RvY3RvciBpc2FjdGl2ZS9pbmFjdGl2ZSByYWRpbyBjb250cm9sc1xyXG4gICAgICAvL3NldCBjb250cm9scyBkZXBlbmRpbmcgdXAgdGhlIGRhdGFcclxuICAgICAgLy90aGlzLmFjdGl2ZUNvbnRyb2wgPSAkKCcjZGFjdGl2ZScpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnRyb2xsZXIuaW5pdCgpO1xyXG5cclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
