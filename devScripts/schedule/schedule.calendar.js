$(document).ready(function(){

    $(function(){
        console.log('calander js loaded');


        $("#btn-new-schedule").click(function(e){
           e.preventDefault();
           window.location.href = links.newScheduleUrl;
       });

       /*
       $(document).on("click", ".calendar-time-Btn", function (ev) {

           $(".calendar-time-Btn").parent().parent().css("background-color","white");
       $(this).parent().parent().css("background-color","#e6ecf4");
       */

       $('#from-date').datetimepicker({
         inline: false,
         format:'LT'
       });

       $('#to-date').datetimepicker({
         inline: false,
         format:'LT'
       });


    }());

});
