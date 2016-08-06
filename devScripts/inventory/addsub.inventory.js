$(document).ready(function(){

  $(function(){
    console.log('accounting js loaded');

    var Model = {
      selectedProduct: {id:0, name:'', stock: 0},
      productList: [],
      locationList:[],
      DefaultlocationId:0,
      userType: '',
      SelectedLocationId:1,
      StockList : []
    }
    controller = {
      init:function(){
        this.saveUpdateProductStock = links.saveUpdateProductStock;
        this.getAllProductListUrl =   links.getAllProducts;
        this.locationListUrl = links.getActiveLocations1;
        this.DefaultLocationInit = false;

        //setting user info
        Model.userType = $('#user-type').val();
        Model.DefaultlocationId = $('#default-location-id').val();

        console.log('controller init, model ' + JSON.stringify(Model));

        StockView.init();
        productListView.init();
        StockView.renderProductView();
        this.getLocations();
        this.getAllProductsServer();

      },
      getStockList:function(){
        return Model.StockList;
      },
      getLocationList : function () {
        return model.locationList;
      },
      getProductListforLocation: function(locationId){
        console.log("getProductListLocation " +locationId);
        var list = [];
        var productList = Model.productList;

        for(var i = 0; i < productList.length; i++){
          if(+productList[i].locationId == +locationId){
            list.push(productList[i]);
          }
        }

        return list;

      },
      getUserInfoModel : function () {
        return model.userInfo;
      },
      setSelectedLocationId : function (locId) {
        model.DefaultlocationId = locId;
      },


      setProductName:function(){
        return Model.selectedProduct.name;
      },
      getSelectedProduct: function(){
        return Model.selectedProduct;
      },
      getLocations: function(){

        $.get(this.locationListUrl, { })
        .done(function(response){

          console.log('locations '  + JSON.stringify(response));

          if(response.status == 1){
            Model.locationList = response.data;

            if(Model.locationList.length > 0){
              Model.DefaultlocationId = Model.locationList[0].id;
              StockView.renderLocations();
              StockView.initTypeahead();
            }else{

                console.log('disable buttons');
                StockView.btnAddStock.prop('disabled', true);
                StockView.btnSubstrsctStock.prop('disabled', true);

              //there are no locations
              StockView.locationSelect.prop('disabled', true);
              utility.getAlerts('could not find locations, please create work locations or active existing ones', 'alert-warning', '', '.container-fluid');
            }

          }

        });

      },
      getAllProductsServer: function () {

        $.get(this.getAllProductListUrl, {})
        .done(function(response){

          console.log('response '  + JSON.stringify(response));

          if(response.status == 1){

            Model.productList = response.data;

            /*
            if(Model.userType == 'D'
            && Model.locationList
            && Model.locationList.length > 0
            && !controller.DefaultLocationInit){
              controller.DefaultLocationInit = true;
              Model.DefaultlocationId = Model.locationList[0].id;
            }
            */
            setTimeout(productListView.render(), 700);
            setTimeout(StockView.initTypeahead(), 100);
          }

        });

      },
      updateProductFromView: function(){
        var name1 = StockView.productName.val();
        Model.selectedProduct.name = name1.trim()
        Model.selectedProduct.stock = StockView.stockQuantity.val();

      },
      resetProductModel:function(){
        Model.selectedProduct = {id:0, name:'', stock: 0};

      },
      AddUpdateToServer: function(opernType){


        if(Model.DefaultlocationId > 0){
          var data = {
            locationId: Model.DefaultlocationId,
            id: Model.selectedProduct.id,
            name: Model.selectedProduct.name,
            stock: Model.selectedProduct.stock,
            operationType: opernType
          }

          $.post( controller.saveUpdateProductStock , data)
          .done(function( response ) {

            console.log(' response ' + JSON.stringify(response));
            if(response.status == 1){
              controller.resetProductModel();
              utility.getAlerts('Stock updated Successfully!','alert-success ','','.container-fluid');
              StockView.reset();
              controller.getAllProductsServer();
            }else{
              utility.getAlerts('Something is wrong!','alert-warning ','','.container-fluid');
              StockView.reset();
            }

          });

        }else{
          utility.getAlerts('cannnot save, no location selected','alert-warning ','','.container-fluid');
        }

      }

    }

    StockView = {
      init:function(){
        this.productName = $('#txt-product-name');
        this.stockLabel = $('#current-stock');
        this.stockQuantity  = $('#txt-stock-quantity');
        this.btnAddStock = $('#btn-add-stock');
        this.btnSubstrsctStock = $('#btn-substract-stock');
        this.linkViewStockHistory = $('#link-stock-history');
        this.locationSelect = $('#loc-Select');


        this.form = $('#stock-inventory-form');

        this.locationSelect.on('change',function(){
          Model.DefaultlocationId =  $(this).val();
          controller.resetProductModel();
          StockView.renderProductView();
          StockView.reset();

          StockView.initTypeahead();

          productListView.render();


        });



        this.form.bootstrapValidator({
          trigger:" focus click change keyup select blur ",
          feedbackIcons: {
            valid: 'glyphicon glyphicon-ok ',
            invalid: 'glyphicon glyphicon-remove ',
            validating: 'glyphicon glyphicon-refresh'
          },
          excluded: [':disabled'],
          fields:{
            ProductName : {
              validators : {
                notEmpty : {
                  message : 'Please product name!'
                }
              }

            },  stockQuantityTxt : {
              validators : {
                notEmpty : {
                  message : 'Please enter the stock!'
                },
                regexp :{
                  regexp: /^[0-9]+$/,
                  message: 'Please enter a valid number'

                }
              }

            }

          }
        });
        this.ProductNameHandler =  function(){
          console.log('reset patient model1');
          var name = StockView.productName.val();
          name = name.trim();

          //if the product name is not found in the product list, then enable editing of the controls
          if(!name || 0 === name.length){
            console.log('reset patient model');
            controller.resetProductModel();
            StockView.stockLabel.text('0');

          }else if(name.length > 0) {


            var list = Model.productList;

            var containsName = false;

            for(var i = 0; i < list.length; i++){
              if(list[i].name === name){
                containsName = true;
                break;
              }
            }

            console.log('contains '  + containsName);
            if(!containsName){
              //if there is name not contained in the list
              //clear the fields except name
              // to allow a new new entry


              controller.resetProductModel();
              StockView.stockLabel.text('0');
              console.log('reset model');
            }
          }
        };


        this.productName.on("change click keyup select blur ",this.ProductNameHandler);




        this.btnAddStock.on('click', function(){
          console.log('add stock');
          StockView.form.data('bootstrapValidator').validate();
          if(StockView.form.data('bootstrapValidator').isValid()){
            console.log('validated');
            controller.updateProductFromView();
            controller.AddUpdateToServer(1);
          }


        });

        this.btnSubstrsctStock.on('click', function(){
          console.log('substract stock');
          StockView.form.data('bootstrapValidator').validate();
          if(StockView.form.data('bootstrapValidator').isValid()){
            console.log('validated');
            controller.updateProductFromView();
            controller.AddUpdateToServer(-1);
          }
        });

      },
      initTypeahead: function(){
        var ProductList = controller.getProductListforLocation(Model.DefaultlocationId);

        console.log('iniit typeahead product list' + JSON.stringify(ProductList));
        this.productName.typeahead("destroy");
        this.productName.on("change click keyup select blur ",this.ProductNameHandler);
        this.productName.typeahead({
          name: 'all-products',
          source: ProductList,
          updater: function(productObj) {
            console.log('type ahead call back for ' + JSON.stringify(productObj));
            Model.selectedProduct = productObj;
            StockView.renderProductView();
            return productObj.name;
          }
        });

      },
      reset:function(){
        //this.form.reset();

        this.form.bootstrapValidator("resetForm",true);
        this.stockLabel.text('0');

      },
      renderProductView: function(){
        console.log('render product view');

        var prod = controller.getSelectedProduct();
        console.log(JSON.stringify(prod));
        this.productName.val(prod.name);
        this.stockLabel.text(prod.stock);
        //this.stockQuantity.val('');

      },
      renderLocations:function(){

        var list = Model.locationList;

        this.locationSelect.prop('disabled', false);

        this.locationSelect.empty();


        for(var i = 0; i< list.length; i++ ){
          //<li role="presentation" id="all-appointments-filter-button"  class="all-appointments-filter-button active "><a >Margaon</a></li>
          var option = $('<option/>', {
            value:list[i].id,
            text:list[i].name
          });

          var defaultLocId = Model.DefaultlocationId;

          if(defaultLocId == list[i].id){
            option.addClass('select');
          }

          this.locationSelect.append(option);

        }

        //disable select for staff
        if(Model.userType == 'S'){
          this.locationSelect.attr('disabled', true);

        }
      }

    }

    var productListView = {
      init: function(){
        this.listingTable = $('#product-listing');

        this.dataTable = this.listingTable.DataTable({

        "bProcessing": true,
        "data":  [],
        "aoColumns": [
          { "mData": "name" },
          { "mData": "stock" },
          { "mData": "createdDate" },
          { "mData": "createdBy" }


        ],
        "order": [[1, 'asc']],
        "fnInitComplete" : function(oSettings, json) {
          console.log( 'DataTables has finished its initialisation.' );

        }

      } );


      },
      render: function(){

        var lprodList = controller.getProductListforLocation(Model.DefaultlocationId);

        console.log('product list ' + lprodList);

        table = this.listingTable.dataTable();
        oSettings = table.fnSettings();
        table.fnClearTable();

        for (var i=0; i<lprodList.length; i++)
        {
         table.oApi._fnAddData(oSettings, lprodList[i]);
        }

        oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
        table.fnDraw();

      }
    }


    controller.init();


  }());

});
