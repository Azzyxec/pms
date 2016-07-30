<?php
use Pms\utilities\UploadHandler;
use Pms\Entities\UserSessionManager;



class CustomUploadHandler extends UploadHandler {
  // protected function trim_file_name($file_path, $name, $size, $type, $error, $index, $content_range) {
  //         $name = 'First_' . microtime(true);
  //         $name = str_replace('.', '', $name);
  //         return $name;
  //     }
  /*
  public $file_name;
  protected $options;

  protected function get_file_name($name,
  $type = null, $index = null, $content_range = null) {

  $this->file_name = $this->get_unique_filename(
  $this->trim_file_name($name, $type, $index, $content_range),
  $type,
  $index,
  $content_range
);
return $this->file_name;
}*/
}












$app->group('/Upload',function(){
  $this->post('/CloseApptUpload',function($request, $response){
    try{

      $postedData = $request->getParsedBody();
      $uniqueCloseAppointmentId = $postedData['uploadId'];

      $files = $request->getUploadedFiles();
      $MaxfileSize = 1048576; //make5mb
      foreach ($files['files'] as $key => $value) {
        if ($value->getError() === UPLOAD_ERR_OK) {
          $uploadFileName = $value->getClientFilename();
          $fileSize =  $value->getSize();
          $mediaType =  $value->getClientMediaType(); //check file extension
          $uniqueFileName = $uploadFileName;

          //generate a random  file name
          if($fileSize <= $MaxfileSize){
            $value->moveTo("images/scannedDoc/$uploadFileName");
          }

          UserSessionManager::addUploadedfile($uniqueCloseAppointmentId, $uploadFileName , $uniqueFileName);

        }

      }

      //forming the return object
      $returnFiles = array();
      $returnFiles['files'] =  array(
          'name'=>$uploadFileName
          , 'size' => $fileSize
          , 'type'=> 'image/jpeg'
          , 'url' => 'images/scannedDoc/' . $uniqueFileName
      );

      return $response;
      $data = array('status' => "1", 'data' => $uniqueCloseAppointmentId, 'message' => "success" );
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
