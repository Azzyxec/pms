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

  public function saveUpdateLoction($id, $name, $isActive, $doctorId){
    try {

      $paramArray = array('pid' => $id,
                          'pname' => $name,
                          'pis_active' => $isActive,
                          'pdoctor_id' =>$doctorId
                          );

      $statement = DBHelper::generateStatement('add_update_locations',  $paramArray);
      $statement->execute();

      $row = $statement->fetch();

      return  array('status' =>$row['status'], 'data' => $row['dates'], 'message' => 'success');
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



  public function getAllLocations($doctorId, $getOnlyActiveRows){
    try {

      $paramArray = array('pdoctor_id' => $doctorId, 'ponly_active_rows' => $getOnlyActiveRows);
      $statement = DBHelper::generateStatement('get_all_doctor_locations',  $paramArray);
      $statement->execute();

      $allLocaions = array();
      while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {
          $location = array();
          $location['id'] =  $result['id'];
          $location['name'] = $result['name'];
          $location['isActive'] = $result['is_active'];
          $location['status'] = $result['status'];
          $allLocaions[] = $location;
      }

      return array('status' => 1, 'data' => $allLocaions, 'message' => 'success');

    } catch (Exception $e) {
      return array('status' => "-1", 'data' => "-1", 'message' => 'exceptoin in DB' . $e->getMessage());
    }

  }

  public function getActiveLocations($doctorId, $loginUserId , $userType){
    try {

      $paramArray = array('pdoctor_id' => $doctorId
      , 'plogin_user_id' => $loginUserId
      , 'puser_type' => $userType);
      $statement = DBHelper::generateStatement('get_active_locations',  $paramArray);
      $statement->execute();

      $allLocaions = array();
      while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {
          $location = array();
          $location['id'] =  $result['id'];
          $location['name'] = $result['name'];
          $location['isActive'] = $result['is_active'];
          $location['status'] = $result['status'];
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
      return array('status' => -1, 'data' => $user, 'message' => 'exception');
    }
  }

  public function addUpdateProductStock($doctorId, $locationId, $productId, $name, $stock, $loggedInUserId, $loggedInUserType){
    try {

      $paramArray = array(
                          'pdoctor_id' => $doctorId,
                          'plocation_id' => $locationId,
                          'pproduct_id' => $productId,
                          'pname' => $name,
                          'pstock' => $stock,
                          'ploggedin_user_id' => $loggedInUserId,
                          'ploggedin_user_type' => $loggedInUserType
                        );

      $statement = DBHelper::generateStatement('add_update_product_stock',  $paramArray);

      $statement->execute();

      $row = $statement->fetch();

      $status = $row['status'];

      return $status;
    } catch (Exception $e) {
      return array('status' => -1, 'data' => '', 'message' => 'exception');
    }
  }


  public function getAllProducts($locationId, $doctorId){
    try {

      $paramArray = array(
                          'pdoctor_id' => $doctorId,
                          'plocation_id' => $locationId
                          );

      $statement = DBHelper::generateStatement('get_all_products',  $paramArray);
      $statement->execute();


      $allProducts = array();
      while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {
          $product = array();
          $product['id'] =  $result['id'];
          $product['name'] = $result['name'];
          $product['stock'] = $result['current_stock'];
          $product['locationId'] = $result['fk_location_id'];
          $product['createdDate'] = $result['created_date'];
          $product['createdBy'] = $result['created_by'];
          $product['status'] = $result['status'];

          $allProducts[] = $product;
      }

      return $allProducts;

    } catch (Exception $e) {
      return array('status' => "-1", 'data' => "-1", 'message' => 'exception');
    }
  }

  public function getproductHistory($productId){
    try {

      $paramArray = array(
                          'pproduct_id' => $productId
                          );

      $statement = DBHelper::generateStatement('get_product_stock_history',  $paramArray);
      $statement->execute();

      $stockHistoryList = array();
      while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {
          $row = array();
          $row['productName'] =  $result['product_name'];
          $row['stock'] = $result['stock'];
          $row['operationType'] = $result['operation_type'];
          $row['createdDate'] = $result['created_date'];
          $row['createdBy'] = $result['created_by'];
          $row['createdByType'] = $result['created_by_type'];
          $stockHistoryList[] = $row;
      }

      return $stockHistoryList;

    } catch (Exception $e) {
      return array('status' => "-1", 'data' => "-1", 'message' => 'exception');
    }
  }


}
