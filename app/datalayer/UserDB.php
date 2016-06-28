<?php

namespace Pms\Datalayer;

use \PDO;
use Pms\Datalayer\DBHelper;
use Pms\Entities\User;

class UserDB{

  public function getUser($loginId){

    $user = new User();
    try {

      $paramArray = array(
                           'puser_id' => $loginId
                         );

      $statement = DBHelper::generateStatement('get_user_info',  $paramArray);

      $statement->execute();

      while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {
        $user->id = $result['id'];
        $user->type = $result['type'];
        $user->name = $result['name'];
        $user->password = $result['password'];
        $user->doctorId = $result['doctor_id'];
        $user->locationId = $result['location_id'];
      }

      return $user;

    } catch (Exception $e) {
      return $user;
    }

  }

}//UserDb
