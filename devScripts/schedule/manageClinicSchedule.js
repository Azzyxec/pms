$(document).ready(function(){
     $(function () {
            $('#datetimepicker5,#datetimepicker6,#datetimepicker7,#datetimepicker8,#datetimepicker9,#datetimepicker10,#datetimepicker11,#datetimepicker12,#datetimepicker13,#datetimepicker14').datetimepicker({
                inline: true,
              
                format:'LT'
            });
        }); 
    
      $(function () {
            $('#datetimepicker15,#datetimepicker16').datetimepicker({
               
            });
        }); 
    
    $(document).on("click", ".calendar-time-Btn", function (ev) {
        
        $(".calendar-time-Btn").parent().parent().css("background-color","white");
    $(this).parent().parent().css("background-color","#e6ecf4");
      
});
    
     
     
  });
    

