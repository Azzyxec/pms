$(document).ready(function(){

    $(function(){
        console.log('calander js loaded');


        $("#btn-new-schedule").click(function(e){
           e.preventDefault();
           window.location.href = links.newScheduleUrl;
       });


    }());

});
