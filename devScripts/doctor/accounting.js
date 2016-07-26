$(document).ready(function(){

    $(function(){
        console.log('accounting js loaded');


var Model = {
  StockList : [{medicineName:'crosin',UpdatedOn:'26-07-2016',UpdatedBy:'26-07-2016',stock:'4'}

  ]
}
controller = {
init:function(){
  StockView.render();
},
  getStockList:function(){
    return Model.StockList;
  }
}

StockView = {
init:function(){

},
render:function(){


  $('#example').DataTable( {

    "bProcessing": true,
    "data":  controller.getStockList(),
    "aoColumns": [
      { "mData": "medicineName" },
      { "mData": "UpdatedOn" },
      { "mData": "UpdatedBy" },
      { "mData": "stock" }

    ],
    "order": [[1, 'asc']],
    "fnInitComplete" : function(oSettings, json) {
          console.log( 'DataTables has finished its initialisation.' );

     }

  } );
}

}


controller.init();


    }());

});
