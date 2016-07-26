$(document).ready(function(){

  $(function(){
    console.log('accounting js loaded');

    var Model = {
      selectedProduct: {id:0, name:'', stock: 0},
      productList: [],
      SelectedLocationId:1,
      StockList : [{medicineName:'crosin',UpdatedOn:'26-07-2016',UpdatedBy:'26-07-2016',stock:'4'}]
    }
    controller = {
      init:function(){
        this.saveUpdateProductStock = links.saveUpdateProductStock;
        this.getAllProductListUrl =   links.getAllProducts;

        StockView.init();

        this.getAllProductsServer();

      },
      getStockList:function(){
        return Model.StockList;
      },
      getSelectedProduct: function(){
        return Model.selectedProduct;
      },
      getAllProductsServer: function () {


          $.get(this.getAllProductListUrl, { locationId: Model.SelectedLocationId})
           .done(function(response){

             console.log('response '  + JSON.stringify(response));

             if(response.status == 1){

               Model.productList = response.data;
               StockView.initTypeahead();
             }

          });

      },
      updateProductFromView: function(){

        Model.selectedProduct.name = StockView.productName.val();
        Model.selectedProduct.stock = StockView.stockQuantity.val();

      },
      resetProductModel:function(){
        Model.selectedProduct = {id:0, name:'', stock: 0};
        StockView.reset();
      },
      AddUpdateToServer: function(opernType){

        var data = {
          locationId: 1,
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
           }else{
              utility.getAlerts('Something is wrong!','alert-warning ','','.container-fluid');
           }

        });

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
        this.form = $('#stock-inventory-form');

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

        this.productName.typeahead({
          name: 'all-products',
          source: Model.productList,
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


      },
      renderProductView: function(){

        var prod = controller.getSelectedProduct();

        this.productName.val(prod.name);
        this.stockLabel.text(prod.stock);
        this.stockQuantity.val('');

      },
      renderLocations:function(){




        //move to modal view
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
