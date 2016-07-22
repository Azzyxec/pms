<?php
use Pms\utilities\UploadHandler;

class CustomUploadHandler extends UploadHandler {
  /*  protected function trim_file_name($file_path, $name, $size, $type, $error, $index, $content_range) {
            $name = 'First_' . microtime(true);
            $name = str_replace('.', '', $name);
            return $name;
        }*/
}

//$upload_handler = new CustomUploadHandler();

$app->group('/Upload',function(){
    $this->post('/CloseApptUpload',function($request, $response){
        try{
           $upload_dir = 'images/scannedDoc/';
           $upload_handler = new CustomUploadHandler(array(
                        'max_file_size' => 1048576, //1MB file size
                        'image_file_types' => '/\.(gif|jpe?g|png|mp4|mp3)$/i',
                        'upload_dir' => $upload_dir,
                        'upload_url' => 'index.php/Upload/upload',
                        'thumbnail' => array('max_width' => 180,'max_height' => 180)
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
           $upload_handler = new CustomUploadHandler(array(
                        'max_file_size' => 1048576, //1MB file size
                        'image_file_types' => '/\.(gif|jpe?g|png|mp4|mp3)$/i',
                        'upload_dir' => $upload_dir,
                        'upload_url' => 'index.php/Upload/upload',
                        'thumbnail' => array('max_width' => 180,'max_height' => 180)
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
           $upload_handler = new CustomUploadHandlerr(array(
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
