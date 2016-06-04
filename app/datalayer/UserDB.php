<?php

namespace Pms\Datalayer;

use \PDO;
use Pms\Datalayer\DBHelper;
use Pms\Entities\User;

class UserDB{

  public function getUser($loginId, $password){

    $user = new User();
    try {

      $paramArray = array(
                           'plogin_id' => $loginId,
                           'password' => $password
                         );

      $statement = DBHelper::generateStatement('authenticate',  $paramArray);

      $statement->execute();

      while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {
        $user->id = $result['id'];
        $user->type = $result['type'];
        $user->name = $result['name'];
        $user->doctorId = $result['doctor_id'];
      }

      return $user;

    } catch (Exception $e) {
      return $user;
    }

  }

}//UserDb
