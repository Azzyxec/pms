<?php
use Pms\utilities\UploadHandler.php;



$app->group('/Upload',function(){
    $this->get('/upload',function($request, $response)){
        try{
           $upload_dir = 'public/uploads/';
           $upload_handler = new UploadHandler(array(
                        'max_file_size' => 1048576, //1MB file size
                        'image_file_types' => '/\.(gif|jpe?g|png|mp4|mp3)$/i',
                        'upload_dir' => $upload_dir,
                        'upload_url' => 'index.php/Upload/upload/',
                        'thumbnail' => array('max_width' => 80,'max_height' => 80)
                        ));
            $data = array('status' => "1", 'data' => $upload_handler, 'message' => "success" );
            return $response->withJson($data)
        } catch (Exception $e){
              $data = array('status' => "-1", 'data' => "", 'message' => "exception in controller " . $e->getMessage() );
      return $response->withJson($data);

        }
    }


})

?>
