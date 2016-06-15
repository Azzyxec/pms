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

  }
}
