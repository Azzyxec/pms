<?php

namespace Pms\Entities;

use Pms\Entities\User;

class UserSessionManager{

  public static function getUser(){
    if(isset($_SESSION['user'])){
       $user = $_SESSION['user'];
       return $user;
     }else{
       $user = new User();
       return $user;
     }
  }//getUser


  public static function addUploadedfile($originalFileName, $newFileName){

    if(isset($originalFileName) && isset($newFileName)){

      if(isset($_SESSION['uploadedFiles'])){
        $uploadedFiles = $_SESSION['uploadedFiles'];
        $uploadedFiles[] = array('orignalFileName'=>$originalFileName, 'newFileName'=>$newFileName);


        $_SESSION['uploadedFiles'] = $uploadedFiles;
      }else{

              $uploadedFiles = array();
              $uploadedFiles[] = array('orignalFileName'=>$originalFileName, 'newFileName'=>$newFileName);
              $_SESSION['uploadedFiles'] = $uploadedFiles;
      }
    }
  }

  public static function clearUploadedFileList(){
    unset($_SESSION['uploadedFiles']);
  }

  public static function getUploadedfileList(){
    if(isset($_SESSION['uploadedFiles'])){
        $uploadedFiles = $_SESSION['uploadedFiles'];
      return $uploadedFiles;

    }else{
      $uploadedFiles = array();
      return   $uploadedFiles;
    }
  }

  /*
  public static function setAppointmentFileArray($appointmentId){
    if(isset($uploadedFiles)){
      $appointmentFileArray = array();
      $appointmentFileArray = [$appointmentId => $uploadedFiles];

      $_SESSION['appointmentFileArray'] = $appointmentFileArray;
    }
  }

  public static function getAppointmentFileArray(){
    if(isset($_SESSION['appointmentFileArray'])){
      $appointmentFileArray = $_SESSION['appointmentFileArray'];
      return $appointmentFileArray;
    }else{
      return $appointmentFileArray = array();
    }
  }
*/


  public static function setUser($user){
    if(isset($user)){
      $_SESSION['user'] = $user;
    }
  }

  public static function destroySession(){
    $_SESSION['user'] = null;
    session_destroy();
  }

}//UserSessionManager
