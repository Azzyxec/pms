<?php
use Pms\utilities\UploadHandler;



$app->group('/Upload',function(){
    $this->post('/CloseApptUpload',function($request, $response){
        try{
           $upload_dir = 'images/scannedDoc/';
           $upload_handler = new UploadHandler(array(
                        'max_file_size' => 1048576, //1MB file size
                        'image_file_types' => '/\.(gif|jpe?g|png|mp4|mp3)$/i',
                        'upload_dir' => $upload_dir,
                        'upload_url' => 'index.php/Upload/upload',
                        'thumbnail' => array('max_width' => 80,'max_height' => 80)
                        ));
            $data = array('status' => "1", 'data' => $upload_handler, 'message' => "success" );
            return $response->withJson($data);
        } catch (Exception $e){
          $data = array('status' => "-1", 'data' => "", 'message' => "exception in controller " . $e->getMessage() );
          return $response->withJson($data);

        }

    });

    $this->post('/PatientImageUpload',function($request, $response){
        try{
           $upload_dir = 'images/patientUserImages/';
           $upload_handler = new UploadHandler(array(
                        'max_file_size' => 1048576, //1MB file size
                        'image_file_types' => '/\.(gif|jpe?g|png|mp4|mp3)$/i',
                        'upload_dir' => $upload_dir,
                        'upload_url' => 'index.php/Upload/upload',
                        'thumbnail' => array('max_width' => 80,'max_height' => 80)
                        ));
            $data = array('status' => "1", 'data' => $upload_handler, 'message' => "success" );
            return $response->withJson($data);
        } catch (Exception $e){
          $data = array('status' => "-1", 'data' => "", 'message' => "exception in controller " . $e->getMessage() );
          return $response->withJson($data);

        }

    });


    $this->post('/GuardianImageUpload',function($request, $response){
        try{
           $upload_dir = 'images/guardianUserImages/';
           $upload_handler = new UploadHandler(array(
                        'max_file_size' => 1048576, //1MB file size
                        'image_file_types' => '/\.(gif|jpe?g|png|mp4|mp3)$/i',
                        'upload_dir' => $upload_dir,
                        'upload_url' => 'index.php/Upload/upload',
                        'thumbnail' => array('max_width' => 80,'max_height' => 80)
                        ));
            $data = array('status' => "1", 'data' => $upload_handler, 'message' => "success" );
            return $response->withJson($data);
        } catch (Exception $e){
          $data = array('status' => "-1", 'data' => "", 'message' => "exception in controller " . $e->getMessage() );
          return $response->withJson($data);

        }

    });



});
?>
