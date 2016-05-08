$(document).ready(function(){

    $(function(){
        console.log('patient entry js loaded');

        var model = {
          patient: {
            id:0,
            name:"",
            dateOfBirth: "",
            weight:"",
            height:"",
            gender:"1",
            contact1:"",
            contact2:"",
            address: ""
          }

        };

        var controller = {
          init :function(){
            patientDetailsView.init();
            patientBirthDetailsView.init();
            patientProgrammeView.init();

            patientDetailsView.render();
          }
        };

        var patientDetailsView = {
          init: function(){
            this.tab = $('#patients-entry-link');

            //this.tab.hide();
          },
          render: function(){
            this.tab.trigger('click');
            //this.tab.show();
          }
        };

        var patientGuardianDetailsView = {
          init: function(){
            this.tab = $('#guardian-entry-link');

            //this.tab.hide();
          },
          render: function(){
            //this.tab.show();
          }
        }

        var patientBirthDetailsView = {
          init: function(){
            this.tab = $('#guardian-entry-link');

            //this.tab.hide();
          },
          render: function(){
            //this.tab.show();
          }
        }

        var patientProgrammeView = {
          init: function(){
            this.tab = $('#patients-programme-link');

            //this.tab.hide();
          },
          render: function(){
            //this.tab.show();
          }
        };

        controller.init();

    }());

});
