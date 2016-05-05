$(document).ready(function(){
  console.log('Doctor Dashboard js loaded');

  //top level controller
  var controller = {
    init: function(){
      this.logoutUrl = "index.php/logout";
      navView.init();
      navView.render();

    }
  };

  var navView = {
    init: function(){

      $("#manage-schedule-create-section-link-Btn").click(function(e){
          e.preventDefault();
           navView.hidePanels();

          console.log('new schedule click');
      });

      $("#manage-schedule-list-section-link-Btn").click(function(e){
          e.preventDefault();
           navView.hidePanels();
          $("#doctors-Manage-Schedule-Section").show();
          console.log('schedule list click');
      });



      $("#doctor-dash-logout-btn").click(function(e){
        window.location.href = controller.logoutUrl;
      });

      $("#dashboard-Section-Btn").click(function(e){
          e.preventDefault();
           navView.hidePanels();
          $("#dashboard-Section").show();
      });

       $("#book-Appointments-Section-Btn").click(function(e){
          e.preventDefault();
            navView.hidePanels();
          $("#book-Appointments-Section").show();
      });
       $("#user-Profile-Btn-Link").click(function(e){
           e.preventDefault();
             navView.hidePanels();
          $("#doctors-Registration-Form-Section").show();
       });

       $("#add-Staff-Section-Link-Btn").click(function(e){
           e.preventDefault();
             navView.hidePanels();
          $("#add-Staff-Form-Section").show();
       });


       $("#close-Book-Appointment-Section-Link-Btn").click(function(e){
             e.preventDefault();
             navView.hidePanels();
         $("#close-Book-Appointments-Section").show();
       });

       $("#patients-History-Section-Link-Btn").click(function(e){
           e.preventDefault();
           navView.hidePanels();
          $("#patients-Appointment-History-Section").show();
       });

       $("#manage-Doctors-Schedule-Section-Link-Btn").click(function(e){
           e.preventDefault();
           navView.hidePanels();
          $("#doctors-Manage-Schedule-Section").show();
       });

       $("doctors-Appointments-Section-Link-Btn").click(function(e){
           e.preventDefault();
           navView.hidePanels();
          $("#doctors-Apointments-Section").show();
       });

      this.hidePanels();
    },
    render: function(){
      $("#dashboard-Section").show();
    },
    showDash: function(){

    },
    hidePanels: function(){
      $("#dashboard-Section").hide();
      $("#book-Appointments-Section").hide();
      $("#doctors-Registration-Form-Section").hide();
      $("#add-Staff-Form-Section").hide();
      $("#close-Book-Appointments-Section").hide();
      $("#doctors-Manage-Schedule-Section").hide();
      $("#doctors-Apointments-Section").hide();
      $("#patients-Appointment-History-Section").hide();
      $("#patents-Appointment-History-Section2").hide();

    }
  }



  var addUpdateStaffView = {
    init: function(){
      this.panel = $('#add-Staff-Form-Section');

      $("#add-Staff-Section-Link-Btn").click(function(e){
          e.preventDefault();
          controller.hidePanels();
          addUpdateStaffView.panel.show();
       });

      this.panel.hide();
    },
    render: function() {
      this.panel.show();
    },
    hide: function(){
      this.panel.hide();
    }
  }; //addUpdateStaffView

  var doctorInfoView = {
    init: function(){
      this.panel = $('#doctors-Registration-Form-Section');

      this.panel.hide();
    },
    render: function() {
      this.panel.show();
    },
    hide: function(){
      this.panel.hide();
    }
  }; //doctorInfoView


  var dashboardView = {
    init: function(){
      this.panel = $('#dashboard-Section');

      $("#dashboard-Section-Btn").click(function(){
          controller.hidePanels();
          dashboardView.panel.show();
      });

      this.panel.hide();
    },
    render: function() {
      this.panel.show();
    },
    hide: function(){
      this.panel.hide();
    }
  }; //dashboardView

  var bookAppointmentView = {
    init: function(){
      this.panel = $("#book-Appointments-Section");

      $("#book-Appointments-Section-Btn").click(function(e){
           e.preventDefault();
           controller.hidePanels();
           bookAppointmentView.panel.show();
      });

      this.panel.hide();
    },
    render: function(){
      this.panel.show();
    },
    hide: function(){
      this.panel.hide();
    }
  }; //bookAppointmentView

  var closeAppointentView = {
    init: function(){
      this.panel = $("#close-Book-Appointments-Section");
      $("#close-Book-Appointment-Section-Link-Btn").click(function(e){
          e.preventDefault();
          controller.hidePanels();
          closeAppointentView.panel.show();
      });
      this.panel.hide();
    },
    render: function(){
      this.panel.show();
    },
    hide: function(){
      this.panel.hide();
    }
  }// closeAppointentView

controller.init();

});
