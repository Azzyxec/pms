//helper function to get the url query parameters
var utility = {
  getURLParam: function(name){
    var url = window.location.href;

    name = name.replace(/[\[\]]/g, "\\$&");

    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    var results = regex.exec(url);

    if (!results) return null;
    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, " "));
  },
  getTimeFromMinutes:  function(mins){
    var hrs = mins/60;
    var mins = mins%60;

    var mdate = moment({hours:hrs, minutes: mins});

    return mdate.format('hh:mm A');

  },

  getAlerts : function(msg,classnm,id,container){

     $('.pms-alerts').remove();

    var alert = $('<div  id = "'+id+'" class=" alert ' +classnm+' pms-alerts alert-dismissible doc-profile-before-submit-warning-error" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+msg+'</div>');
    $(container).prepend(alert);
    console.log('alert created');

  }
}
