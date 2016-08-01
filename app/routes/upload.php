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
      $fileId = $postedData['fileId'];

      $files = $request->getUploadedFiles();
      $MaxfileSize = 5242880; //make5mb
      foreach ($files['files'] as $key => $value) {
        if ($value->getError() === UPLOAD_ERR_OK) {
          $uploadFileName = $value->getClientFilename();
          $fileSize =  $value->getSize();
          $mediaType =  $value->getClientMediaType(); //check file extension
          $uniqueFileNameGenerate = uniqid();
          $uniqueFileName = $uniqueFileNameGenerate.$uploadFileName;

          //generate a random  file name
          if($fileSize <= $MaxfileSize){
            $value->moveTo("images/scannedDoc/$uniqueFileName");
          }

          UserSessionManager::addUploadedfile($uniqueCloseAppointmentId, $fileId, $uploadFileName, $uniqueFileName);

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

      //return $response;
      $data = array('status' => "1", 'data' => $uniqueCloseAppointmentId, 'message' => "success" );
      return $response->withJson($data);
    } catch (Exception $e){

      $data = array('status' => "-1", 'data' => "", 'message' => "exception in controller " . $e->getMessage() );
      return $response->withJson($data);

    }

  });

  $this->post('/PatientImageUpload',function($request, $response){
    try{

      $postedData = $request->getParsedBody();
      $uniquefileId = $postedData['uploadId'];

      $files = $request->getUploadedFiles();
      $MaxfileSize = 2097152; //make5mb
      foreach ($files['files'] as $key => $value) {
        if ($value->getError() === UPLOAD_ERR_OK) {
          $uploadFileName = $value->getClientFilename();
          $fileSize =  $value->getSize();
          $mediaType =  $value->getClientMediaType(); //check file extension
          $uniqueFileName = uniqid().$uploadFileName;

          //generate a random  file name
          if($fileSize <= $MaxfileSize){
            $value->moveTo("images/patientUserImages/$uniqueFileName");
          }
          $type="P";// upload type patient image;

          UserSessionManager::singleAddUploadfile($uniquefileId, $type, $uploadFileName , $uniqueFileName);

        }

      }

      //forming the return object
      $returnFiles = array();
      $returnFiles['files'] =  array(
          'name'=>$uploadFileName
          , 'size' => $fileSize
          , 'type'=> 'image/jpeg'
          , 'url' => 'images/patientUserImages/' . $uniqueFileName
      );

      //return $response;
      $data = array('status' => "1", 'data' => $uniquefileId, 'message' => "success" );
      return $response->withJson($data);
    } catch (Exception $e){

      $data = array('status' => "-1", 'data' => "", 'message' => "exception in controller " . $e->getMessage() );
      return $response->withJson($data);

    }
  });


  $this->post('/GuardianImageUpload',function($request, $response){

      try{

        $postedData = $request->getParsedBody();
        $uniquefileId = $postedData['uploadId'];

        $files = $request->getUploadedFiles();
        $MaxfileSize = 2097152; //make2mb
        foreach ($files['files'] as $key => $value) {
          if ($value->getError() === UPLOAD_ERR_OK) {
            $uploadFileName = $value->getClientFilename();
            $fileSize =  $value->getSize();
            $mediaType =  $value->getClientMediaType(); //check file extension
            $uniqueFileName = uniqid().$uploadFileName;

            //generate a random  file name
            if($fileSize <= $MaxfileSize){
              $value->moveTo("images/guardianUserImages/$uniqueFileName");
            }

            $type="G";// upload type Guardian image;

            UserSessionManager::singleAddUploadfile($uniquefileId, $type, $uploadFileName , $uniqueFileName);

          }

        }

        //forming the return object
        $returnFiles = array();
        $returnFiles['files'] =  array(
            'name'=>$uploadFileName
            , 'size' => $fileSize
            , 'type'=> 'image/jpeg'
            , 'url' => 'images/guardianUserImages/' . $uniqueFileName
        );

        //return $response;
        $data = array('status' => "1", 'data' => $returnFiles, 'message' => "success" );
        return $response->withJson($returnFiles);
      } catch (Exception $e){

        $data = array('status' => "-1", 'data' => "", 'message' => "exception in controller " . $e->getMessage() );
        return $response->withJson($data);

      }

  });



});
?>
