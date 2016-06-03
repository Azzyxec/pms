<?php
namespace Pms\Datalayer;

use \PDO;
use Pms\Datalayer\DBHelper;


class AuthenticateDB{

  public function getUserInfoForLogin($LoginTableId){
    try {

      $paramArray = array(
        'plogin_id_pk' => $LoginTableId
      );

      $statement = DBHelper::generateStatement('get_user_info_for_login',  $paramArray);

      $statement->execute();

      $queryResult = array();
      while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {
        $queryResult['id'] = $result['id'];
        $queryResult['type'] = $result['type'];
        $queryResult['name'] = $result['name'];
        $queryResult['doctorId'] = $result['doctor_id'];
      }

      return $queryResult;

    } catch (Exception $e) {
      return array('status' => "-1", 'data' => "", 'message' => "exception in Datalayer " . $e->getMessage());
    }

  }

  public function resetPassword($resetCode, $newPassword){
    try {

      $paramArray = array(
        'preset_code' => $resetCode,
        'pnew_password' => $newPassword
      );

      $statement = DBHelper::generateStatement('reset_password',  $paramArray);

      $statement->execute();

      $queryResult = array();
      while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {
        $queryResult['status'] = $result['status'];
        $queryResult['LoginTableId'] = $result['login_id_pk'];
      }

      return $queryResult;

    } catch (Exception $e) {
      return array('status' => "-1", 'data' => "", 'message' => "exception in Datalayer " . $e->getMessage());
    }
  }

  public function resetPasswordRequest($loginId){
    try {

      $paramArray = array(
        'plogin_id' => $loginId
      );

      $statement = DBHelper::generateStatement('make_reset_password_request',  $paramArray);

      $statement->execute();

      $queryResult = array();
      while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {
        $queryResult['status'] = $result['status'];
        $queryResult['resetCode'] = $result['reset_code'];
        $queryResult['email'] = $result['recovery_email'];
      }

      return $queryResult;
    } catch (Exception $e) {
      return array('status' => "-1", 'data' => "", 'message' => "exception in Datalayer " . $e->getMessage());
    }
  }

}
