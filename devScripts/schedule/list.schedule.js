$(document).ready(function(){

    $(function(){
        console.log('list schedule js loaded');

        var model = {};

        var controller = {
          init: function(){
            this.getListUrl = "index.php/getScheduleList";
            this.editScheduleRedirect = "index.php/scheduleEntry";

            listView.init();

            $.get(   this.getListUrl , {})
             .done(function( response ) {
               //console.log('response ' + JSON.stringify(response));
               model = response.data;
               listView.render();
             });

          },
          getModel: function(){
            return model;
          },
          scheduleEditRedirect: function(scheduleId){
            window.location.href = controller.editScheduleRedirect + '?scheduleId=' +  scheduleId;
          }
        };


        var listView = {
          init: function() {
            this.tableBody = document.getElementById('schedule-list-table-body');


          },
          render: function() {
            var listModel = controller.getModel();

            //console.log('response ' + JSON.stringify(listModel));
            //this.tableBody.empty();
            for(var key in listModel){
              //console.log(JSON.stringify(listModel[key].startDate));

                var tr = document.createElement('tr');

                var td = document.createElement('td');
                td.innerHTML =  listModel[key].startDate;
                tr.appendChild(td);

                td = document.createElement('td');
                td.innerHTML =  listModel[key].endDate;
                tr.appendChild(td);

                td = document.createElement('td');
                td.innerHTML =  listModel[key].createdDate;
                tr.appendChild(td);

                var button = document.createElement('input');
                button.setAttribute('type', 'button');
                button.setAttribute('class', 'btn btn-primary');
                button.setAttribute('value', 'Edit');
                tr.appendChild(button);

                button.addEventListener('click', (function(schedule){
      						return function(){

                    console.log("schedule id: " + JSON.stringify(schedule.id));
                    controller.scheduleEditRedirect(schedule.id);
                    
                  }
                })(listModel[key]));

                this.tableBody.appendChild(tr)
            }

          }
        };

        controller.init();

    }());

});
