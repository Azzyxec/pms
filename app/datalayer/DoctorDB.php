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

  public function saveUpdateLoction($id, $name, $doctorId){
    try {

      $paramArray = array('pid' => $id,
                          'pname' => $name,
                          'pdoctor_id' =>$doctorId
                          );

      $statement = DBHelper::generateStatement('add_update_locations',  $paramArray);
      $statement->execute();

      //$statement->fetch();
      return  array('status' => "1", 'data' => "1", 'message' => 'success');
    } catch (Exception $e) {
      return array('status' => "-1", 'data' => "-1", 'message' => 'exceptoin in DB' . $e->getMessage());
    }

  }

  public function deactivateLoction($id){
    try {

      $paramArray = array('pid' => $id,
                          );

      $statement = DBHelper::generateStatement('deactivate_location_for_doctor',  $paramArray);
      $statement->execute();

      //$statement->fetch();
      return  array('status' => "1", 'data' => "1", 'message' => 'success');
    } catch (Exception $e) {
      return array('status' => "-1", 'data' => "-1", 'message' => 'exceptoin in DB' . $e->getMessage());
    }

  }



  public function getAllLocations($doctorId){
    try {

      $paramArray = array('pdoctor_id' => $doctorId);
      $statement = DBHelper::generateStatement('get_all_doctor_locations',  $paramArray);
      $statement->execute();

      $allLocaions = array();
      while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {
          $location = array();
          $location['id'] =  $result['id'];
          $location['name'] = $result['name'];
          $location['status'] = $result['status'];
          //$location['name'] = $result['name'];
          $allLocaions[] = $location;
      }

      return array('status' => 1, 'data' => $allLocaions, 'message' => 'success');

    } catch (Exception $e) {
      return array('status' => "-1", 'data' => "-1", 'message' => 'exceptoin in DB' . $e->getMessage());
    }

  }

  public function getAllDoctors(){
    try {

      $paramArray = array();
      $statement = DBHelper::generateStatement('get_all_doctors',  $paramArray);
      $statement->execute();


      $allDoctors = array();
      while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {
          $doctor = new Doctor();
          $doctor->id =  $result['id'];
          $doctor->name = $result['name'];
          $doctor->contact = $result['contact1'];
          $doctor->email = $result['email'];
          $doctor->qualifications = $result['qualification'];
          $doctor->isActive = $result['is_active'];
          $allDoctors[] = $doctor;
      }

      return array('status' => 1, 'data' => $allDoctors, 'message' => 'success');

    } catch (Exception $e) {
      return array('status' => "-1", 'data' => "-1", 'message' => 'exception');
    }
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
      //$doctor->alternateContact = $row['contact2'];
      $doctor->email = $row['email'];
      $doctor->qualifications = $row['qualification'];
      $doctor->address = $row['address'];
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
                          //'pcontact2' => $doctor->alternateContact,
                          'pemail' =>    $doctor->email ,
                          'pqualification' => $doctor->qualifications,
                          'paddress' => $doctor->address,
                          //'precovery_contact' =>  $doctor->recoveryContact,
                          //'precovery_email' => $doctor->recoveryEmail,
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
