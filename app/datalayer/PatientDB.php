<?php
namespace Pms\Datalayer;

use \PDO;
use Pms\Datalayer\DBHelper;
use Pms\Entities\Patient;
use Pms\Entities\BirthDetails;


class PatientDB{

  public function getDeliveryMethods(){
    try {

      $paramArray = array();
      $statement = DBHelper::generateStatement('get_delivery_methods',  $paramArray);
      $statement->execute();

      $allDeliveryMethods = array();
      while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {
          $deliveryMethod = array();
          $deliveryMethod['id'] =  $result['id'];
          $deliveryMethod['name'] = $result['name'];
          $allDeliveryMethods[] = $deliveryMethod;
      }

      return array('status' => 1, 'data' => $allDeliveryMethods, 'message' => 'success');

    } catch (Exception $e) {
      return array('status' => "-1", 'data' => "-1", 'message' => 'exceptoin in DB' . $e->getMessage());
    }
  }

  public function getPatienList($doctorId){
    try {

    $paramArray = array(
                          'pdoctor_id' => $doctorId,
                          'pfetch_inactive' => 1
                        );

     $statement = DBHelper::generateStatement('get_patients_list',  $paramArray);

     $statement->execute();

     $patientList = array();
     while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {
       $patient = array();
       $patient['id'] = $result['id'];
       $patient['name'] = $result['name'];
       $patient['dateOfBirth'] = $result['date_of_birth'];
       $patient['bloodGroup'] = $result['blood_group'];
       $patient['weight'] = $result['weight'];
       $patient['height'] = $result['height'];
       $patient['gender'] = $result['gender'];
       $patient['genderText'] = $result['gender'] == 0 ? 'Female' : 'Male';
       $patient['contact'] = $result['contact1'];
       $patient['address'] = $result['address'];
       $patient['picturePath'] = $result['picture_path'];
       $patient['displayName'] = $result['display'];
       $isActive =  $result['is_active'];
       $patient['isActive'] = $isActive;
       $patient['status'] =  $isActive == 1?'Active':'Inactive';

       $patientList[] = $patient;
     }

      return array('status' => 1, 'data' => $patientList, 'message' => 'success');

    } catch (Exception $e) {
      return array('status' => -1, 'data' => "", 'message' => 'exceptoin in DB' . $e->getMessage());
    }

  }

  public function getPatienListForAutofill($doctorId){
    try {

    $paramArray = array(
                          'pdoctor_id' => $doctorId,
                          'pfetch_inactive' => 0
                        );

     $statement = DBHelper::generateStatement('get_patients_list',  $paramArray);

     $statement->execute();

     $patientList = array();
     while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {
       $patient = array();
       $patient['id'] = $result['id'];
       $patient['name'] = $result['display'];
       $patient['dateOfBirth'] = $result['date_of_birth'];
       $patient['bloodGroup'] = $result['blood_group'];
       $patient['weight'] = $result['weight'];
       $patient['height'] = $result['height'];
       $patient['gender'] = $result['gender'];
       $patient['contact'] = $result['contact1'];
       $patient['address'] = $result['address'];
       $patient['picturePath'] = $result['picture_path'];
       $patient['oName'] = $result['name'];

       $patientList[] = $patient;
     }

      return array('status' => 1, 'data' => $patientList, 'message' => 'success');

    } catch (Exception $e) {
      return array('status' => -1, 'data' => "", 'message' => 'exceptoin in DB' . $e->getMessage());
    }

  }

  public function getBirthDetails($patientId){
    try {

      $paramArray = array(
                          'ppatient_id' => $patientId
                        );

     $statement = DBHelper::generateStatement('get_birth_details',  $paramArray);

     $statement->execute();

     $row = $statement->fetch();

     $birthDetails = new BirthDetails();

     $birthDetails->deliveryMethodId = $row['fk_delivery_method_id'];
     $birthDetails->birthWeight = $row['birth_weight'];
     $birthDetails->length = $row['length'];
     $birthDetails->head = $row['head'];
     $birthDetails->bloodGroup = $row['blood_group'];
     $birthDetails->mothersName = $row['mother_name'];
     $birthDetails->mothersBloodGroup = $row['mother_blood_group'];
     $birthDetails->fathersName = $row['father_name'];
     $birthDetails->fathersBloodGroup = $row['father_blood_group'];
     $birthDetails->siblings = $row['siblings'];
     $birthDetails->remarks = $row['remarks'];
     $birthDetails->isActive = $row['is_active'];

       return $birthDetails;

    } catch (Exception $e) {
      return array('status' => $status, 'data' => "", 'message' => 'exceptoin in DB' . $e->getMessage());
    }

  }


  public function getGuardianDetails($patientId){
    try {

      $paramArray = array(
                          'ppatient_id' => $patientId
                        );

     $statement = DBHelper::generateStatement('get_guardian_info',  $paramArray);

     $statement->execute();

     $guardian = array();

     if($row = $statement->fetch()){

       $guardian['name'] = $row['name'];
       //$guardian['dateOfBirth'] = $row['date_of_birth'];
       $guardian['gender'] = $row['gender'];
       $guardian['contact1'] = $row['phone1'];
       //$guardian['contact2'] = $row['phone2'];
       $guardian['address'] = $row['address'];
       $guardian['picturePath'] = $row['picture_path'];
       $guardian['empty'] = false;

     }else{
       $guardian['empty'] = true;
     }

    return $guardian;

    } catch (Exception $e) {
      return array('status' => -1, 'data' => "", 'message' => 'exceptoin in DB' . $e->getMessage());
    }

  }

  public function getPatientDetails($patientId){
    try {

      $paramArray = array(
                          'ppatient_id' => $patientId
                        );

     $statement = DBHelper::generateStatement('get_patient_details',  $paramArray);

     $statement->execute();

     $row = $statement->fetch();

     $patient = new Patient();
     $patient->id = $patientId;
     $patient->name = $row['name'];
     $patient->dateOfBirth = $row['date_of_birth'];
     $patient->bloodGroup = $row['blood_group'];
     $patient->weight = $row['weight'];
     $patient->height = $row['height'];
     $patient->gender = $row['gender'];
     $patient->contact1 = $row['contact1'];
     $patient->contact2 = $row['contact2'];
     $patient->address = $row['address'];
     $patient->picturePath = $row['picture_path'];
     $patient->isActive = $row['is_active'];

       return $patient;

    } catch (Exception $e) {
      return array('status' => $status, 'data' => "", 'message' => 'exceptoin in DB' . $e->getMessage());
    }

  }

  public function saveUpdatePatientInfo($patient, $doctorId, $loggedInUserId, $loggedInUserType){
    try {

      $paramArray = array(
                          'pid' => $patient->id,
                          'pname' =>  $patient->name,
                          'pdate_of_birth' =>  $patient->dateOfBirth,
                          'pblood_group' =>  $patient->bloodGroup,
                          'pweight' =>  $patient->weight,
                          'pheight' =>  $patient->height,
                          'pgender' =>  $patient->gender,
                          'pcontact1' =>  $patient->contact1,
                          'pcontact2' =>  $patient->contact2,
                          'paddress' =>  $patient->address,
                          'ppicture_path' => $patient->picturePath,
                          'pdoctor_id' =>  $doctorId,
                          'pfk_logged_in_user_id' =>  $loggedInUserId,
                          'logged_in_user_type' =>  $loggedInUserType,
                          'pis_active' => $patient->isActive
                        );

      $statement = DBHelper::generateStatement('create_modify_patient',  $paramArray);

      $statement->execute();

      $row = $statement->fetch();

      $status = $row['status'];

      $data =  array('patientId' => $row['patient_id']);

      return array('status' => $status, 'data' => $data , 'message' => 'success');
    } catch (Exception $e) {
      return array('status' => -1, 'data' => "", 'message' => 'exceptoin in DB' . $e->getMessage());
    }
  }


  public function saveUpdateGuardianInfo($guardian, $patientId){
    try {

      $paramArray = array(
                          'pfk_patient_id' =>  $patientId,
                          'pname' =>  $guardian->name,
                          'pdate_of_birth' =>  $guardian->dateOfBirth,
                          'pgender' =>  $guardian->gender,
                          'pphone1' =>  $guardian->contact1,
                          'pphone2' =>  $guardian->contact2,
                          'ppicture_path' =>  $guardian->picturePath,
                          'pis_active' =>  $guardian->isActive,
                          'paddress' =>  $guardian->address
                        );

      $statement = DBHelper::generateStatement('create_modify_guardian',  $paramArray);

      $statement->execute();

      $row = $statement->fetch();

      $status = $row['status'];

      return array('status' => $status, 'data' => $status , 'message' => 'success');
    } catch (Exception $e) {
      return array('status' => -1, 'data' => "", 'message' => 'exceptoin in DB' . $e->getMessage());
    }
  }


  public function saveUpdateBirthDetails($birthDetails, $patientId){
    try {

      $paramArray = array(
                          'ppatient_id' => $patientId,
                          'pdelivery_method_id' => $birthDetails->deliveryMethodId,
                          'pbirth_weight' => $birthDetails->birthWeight,
                          'plength' => $birthDetails->length,
                          'phead' => $birthDetails->head,
                          'pblood_group' => $birthDetails->bloodGroup,
                          'pmothers_name' => $birthDetails->mothersName,
                          'pmothers_blood_group' => $birthDetails->mothersBloodGroup,
                          'pfathers_name' => $birthDetails->fathersName,
                          'pfathers_blood_group' => $birthDetails->fathersBloodGroup,
                          'psiblings' => $birthDetails->siblings,
                          'premarks' => $birthDetails->remarks,
                          'pis_active' => $birthDetails->isActive
                        );

      $statement = DBHelper::generateStatement('add_update_patient_birth_details',  $paramArray);

      $statement->execute();

      $row = $statement->fetch();

      $status = $row['status'];

      return array('status' => $status, 'data' => $status , 'message' => 'success');
    } catch (Exception $e) {
      return array('status' => -1, 'data' => "", 'message' => 'exception in DB' . $e->getMessage());
    }
  }

  public function getPatientProgrammeDetails($patientId, $programmeId){
    try {


            $paramArray = array(
                                'ppatient_id' => $patientId,
                                'pmedication_programme_id' => $programmeId
                              );

            $statement = DBHelper::generateStatement('get_patients_programme_details',  $paramArray);

            $statement->execute();

            $programmes = array();
            while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {

              $programme = array();
              $programme['id'] = $result['id'];
              $programme['programmeListId'] = $result['fk_medication_programme_list_id'];
              $programme['durationDays'] = $result['duration_days'];
              $programme['medicine'] = $result['medicine'];
              $programme['doseNo'] = $result['dose_no'];
              $programme['dueOn'] = $result['due_on'];
              $programme['givenOn'] = $result['give_on'];
              $programme['batchNo'] = $result['batch_no'];

              $programmes[] = $programme;

            }

            return array('status' => 1, 'data' => $programmes, 'message' => 'success');

    } catch (Exception $e) {
      return array('status' => $status, 'data' => "", 'message' => 'exceptoin in DB' . $e->getMessage());
    }

  }

  public function getPatientsProgramme($patientId){
    try {

        $paramArray = array(
                            'ppatient_id' => $patientId
                          );

        $statement = DBHelper::generateStatement('get_patients_programmes',  $paramArray);

        $statement->execute();

        $programmes = array();

        while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {

          $programme = array();

          $programmeId = $result['fk_medication_pogramme_id'];

          $programme['id'] = $programmeId;
          $programme['name'] = $result['name'];

          $resultArray = $this->getPatientProgrammeDetails($patientId, $programmeId);


          $programme['count'] = count($resultArray['data']);
          $programme['list'] = $resultArray['data'];


          $programmes[] = $programme;

        }

        return $programmes;

    } catch (Exception $e) {
      return array('status' => $status, 'data' => "", 'message' => 'exceptoin in DB' . $e->getMessage());
    }

  }


     public function getPatientsHistory($patientId){
    try {

        $paramArray = array(
                            'patient_id' => $patientId
                          );

        $statement = DBHelper::generateStatement('get_patient_all_appointments_history',  $paramArray);

        $statement->execute();


        $patientHistory = array();
        while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {

          $patientHistoryRow = array();

          $patientHistoryRow['name'] = $result['name'];
          $patientHistoryRow['date'] = $result['appointment_date'];
          $patientHistoryRow['locName'] = $result['location_name'];
          $patientHistoryRow['time'] = $result['start_mins'];
          $patientHistoryRow['description'] = $result['description'];
          $patientHistoryRow['state'] = $result['state'];
          $patientHistoryRow['stateText'] = $result['state_text'];
          $patientHistoryRow['remarks'] = $result['remarks'];

          $patientHistory[] = $patientHistoryRow;

        }
      return array('status' => 1, 'data' => $patientHistory, 'message' => 'success');

    } catch (Exception $e) {
      return array('status' => $status, 'data' => "", 'message' => 'exceptoin in DB' . $e->getMessage());
    }

  }


  //shift this to a utility class
  function array_to_xml( $data, $xml_data ) {

      foreach( $data as $key => $value ) {
          if( \is_array($value) ) {
              if( \is_numeric($key) ){
                  $key = 'item'; //dealing with <0/>..<n/> issues
              }
              $subnode = $xml_data->addChild($key);
              $this->array_to_xml($value, $subnode);
          } else {
              $xml_data->addChild("$key",\htmlspecialchars("$value"));
          }
       }

  }


}
