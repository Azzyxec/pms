<?php
use Pms\utilities\UploadHandler;

class CustomUploadHandler extends UploadHandler {
  /*  protected function trim_file_name($file_path, $name, $size, $type, $error, $index, $content_range) {
            $name = 'First_' . microtime(true);
            $name = str_replace('.', '', $name);
            return $name;
        }*/
}

/*

class UploadHandler
{
    public $file_name;
    protected $options;
and then add that to the function that creates the name

protected function get_file_name($name,
        $type = null, $index = null, $content_range = null) {

    $this->file_name = $this->get_unique_filename(
        $this->trim_file_name($name, $type, $index, $content_range),
        $type,
        $index,
        $content_range
    );
    return $this->file_name;
}
then under index.php you could do something like this

$upload_handler = new UploadHandler();
echo "\r\n [" . $upload_handler->fileName . "]\r\n";

*/





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
           $upload_handler = new CustomUploadHandler(array(
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
