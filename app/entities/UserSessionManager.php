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


  public static function addUploadedfile($uniqueId, $originalFileName, $newFileName){
    if(isset($_SESSION[$uniqueId])){
      $list = $_SESSION[$uniqueId];
      $list[] = array('orignalFileName' => $originalFileName, 'newFileName' => $newFileName);
      $_SESSION[$uniqueId] =$list;

    }else{

      $fileList = array();
      $fileList[] = array('orignalFileName' => $originalFileName, 'newFileName' => $newFileName);
      $_SESSION[$uniqueId] = $fileList;
    }

  }

  public static function getUploadedfileList($uniqueId){
    if(isset($_SESSION[$uniqueId])){
      return $_SESSION[$uniqueId];
    }else{
      return Array();
    }
  }


  public static function clearFileList($uniqueId){
    unset($_SESSION[$uniqueId]);
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
