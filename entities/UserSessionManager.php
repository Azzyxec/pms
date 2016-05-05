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
       $user->id = "-1";
       $user->type = "-1";
       $user->name = "-1";
       return $user;
     }
  }//getUser

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
