<?php
namespace Pms\Datalayer;

use \PDO;
use Pms\Datalayer\DBHelper;
use Pms\Entities\Patient;

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
                          'pdoctor_id' => $doctorId
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
       $patient['contact'] = $result['contact1'];
       $patient['address'] = $result['address'];
       $patient['picturePath'] = $result['picture_path'];

       $patientList[] = $patient;
     }

      return array('status' => 1, 'data' => $patientList, 'message' => 'success');

    } catch (Exception $e) {
      return array('status' => $status, 'data' => "", 'message' => 'exceptoin in DB' . $e->getMessage());
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
     $patient->isGuardian = $row['is_guardian'];
     $patient->guardianId = $row['patient_id'];

     $resultArray = array();

     $resultArray['patient'] = $patient;

       return array('status' => 1, 'data' => $resultArray, 'message' => 'success');

    } catch (Exception $e) {
      return array('status' => $status, 'data' => "", 'message' => 'exceptoin in DB' . $e->getMessage());
    }

  }

  public function saveUpdatePatientInfo($patient, $guardian, $doctorId){
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
                          'pis_guardain' =>  $patient->isGuardian,
                          'ppatient_id' =>  $patient->guardianId,
                          'pdoctor_id' =>  $doctorId
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
