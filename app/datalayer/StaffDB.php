<?php
namespace Pms\Datalayer;

use \PDO;
use Pms\Datalayer\DBHelper;
use Pms\Entities\Staff;

class StaffDB{

  public function getDoctorsStaffList($doctorId){
    try {

      $paramArray = array(
                          'pdoctor_id' => $doctorId,
                        );

      $statement = DBHelper::generateStatement('get_staff_list_for_doctor',  $paramArray);

      $statement->execute();

      $staffList = array();
      while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {
        $staff = array();
        $staff['id'] = $result['id'];
        $staff['firstName'] = $result['first_name'];
        $staff['contact1'] = $result['contact1'];
        $staff['email'] = $result['email'];
        $staff['createdDate'] = $result['created_date'];
        $staff['isActive'] = $result['is_active'];
        $staff['locationName'] = $result['location'];
        $staffList[] = $staff;
      }

      return array('status' => 1, 'data' => $staffList , 'message' => 'success');

    } catch (Exception $e) {
      return array('status' => "-1", 'data' => "", 'message' => "exception in Datalayer " . $e->getMessage());
    }
  }

  public function getStaffDetails($staffId){
    try {

      $paramArray = array(
                          'pid' => $staffId,
                        );

      $statement = DBHelper::generateStatement('get_staff_details',  $paramArray);

      $statement->execute();

      $row = $statement->fetch();

      $staff = new Staff();

      $staff->id = $staffId;
      $staff->locationId = $row['fk_location_id'];
      $staff->firstName = $row['first_name'];
      $staff->lastName = $row['last_name'];
      $staff->contact1 = $row['contact1'];
      $staff->contact2 = $row['contact2'];
      $staff->email = $row['email'];
      $staff->address = $row['address'];
      $staff->userName = $row['user_name'];
      $staff->pasword = $row['password'];
      $staff->recoveryContact = $row['recovery_contact'];
      $staff->recoveryEmail = $row['recovery_email'];
      $staff->isActive = $row['is_active'];


      return array('status' => 1, 'data' => $staff , 'message' => 'success');

    } catch (Exception $e) {
      return array('status' => "-1", 'data' => "", 'message' => "exception in Datalayer " . $e->getMessage());
    }

  }

  public function creatUpdateStaff($staff, $doctorId, $loggedInUserId, $loggedInuserType){
    try {

      $paramArray = array(
                          'pid' => $staff->id,
                          'pfk_doctor_id' => $doctorId,
                          'pfk_location_id' => $staff->locationId,
                          'pfirst_name' => $staff->firstName,
                          'plast_name' => $staff->lastName,
                          'pcontact1' => $staff->contact1,
                          'pcontact2' => $staff->contact2,
                          'pemail' => $staff->email,
                          'paddress' => $staff->address,
                          'puser_name' => $staff->userName,
                          'ppassword' => $staff->pasword,
                          'precovery_contact' => $staff->recoveryContact,
                          'precovery_email' => $staff->recoveryEmail,
                          'pfk_logged_in_user_id' => $loggedInUserId,
                          'plogged_in_user_type' => $loggedInuserType,
                          'pis_active' => $staff->isActive
                        );

      $statement = DBHelper::generateStatement('create_modify_staff',  $paramArray);

      $statement->execute();

      $row = $statement->fetch();

      $status = $row['status'];

      //$data =  array('patientId' => $row['patient_id']);

      return array('status' => $status, 'data' => "" , 'message' => 'success');

    } catch (Exception $e) {
      return array('status' => "-1", 'data' => "", 'message' => "exception in Datalayer " . $e->getMessage());
    }
  }

}
