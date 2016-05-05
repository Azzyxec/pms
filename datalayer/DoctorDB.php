<?php

namespace Pms\Datalayer;

use \PDO;
use Pms\Entities\Doctor;
use Pms\Entities\User;
use Pms\Datalayer\DBHelper;

/**
 *
 */
class DoctorDB
{

  function __construct()
  {
    # code...
  }

  public function getDoctor($doctorId){
    $doctor = new Doctor();
    try {

      $paramArray = array('pid' => $doctorId);

      $statement = DBHelper::generateStatement('getDoctorInfo',  $paramArray);
      $statement->execute();

      $row = $statement->fetch();

      $doctor->id = $doctorId;
      $doctor->name = $row['name'];
      $doctor->contact = $row['contact1'];
      $doctor->alternateContact = $row['contact2'];
      $doctor->email = $row['email'];
      $doctor->qualifications = $row['qualification'];
      $doctor->address = $row['address'];
      $doctor->recoveryContact = $row['recovery_contact'];
      $doctor->recoveryEmail = $row['recovery_email'];
      $doctor->userName = $row['login_id'];
      $doctor->password = $row['password'];
      $doctor->isActive = $row['is_active'];

      return $doctor;
    } catch (Exception $e) {
      return $doctor;
    }
  }

  public function persistDoctor($doctor){
    $status = -1;
    $user = new User();
    try {

      $paramArray = array(
                          'pid' => $doctor->id,
                          'pname' =>  $doctor->name,
                          'pcontact1' =>  $doctor->contact,
                          'pcontact2' => $doctor->alternateContact,
                          'pemail' =>    $doctor->email ,
                          'pqualification' => $doctor->qualifications,
                          'paddress' => $doctor->address,
                          'precovery_contact' =>  $doctor->recoveryContact,
                          'precovery_email' => $doctor->recoveryEmail,
                          'plogin_id' => $doctor->userName,
                          'ppassword' => $doctor->password,
                          'pis_active' =>  $doctor->isActive
                        );

      $statement = DBHelper::generateStatement('add_update_doctor',  $paramArray);

      $statement->execute();

      $row = $statement->fetch();

      $status = $row['status'];


      if(strcmp($status, "1") == 0){

        $user->id = $row['id'];
        $user->type = $row['type'];
        $user->name = $row['name'];
      }

      return array('status' => $status, 'data' => $user, 'message' => 'success');
    } catch (Exception $e) {
      return array('status' => $status, 'data' => $user, 'message' => 'exception');
    }
  }
}
