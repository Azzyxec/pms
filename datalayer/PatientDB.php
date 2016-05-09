<?php
namespace Pms\Datalayer;

use \PDO;
use Pms\Datalayer\DBHelper;
use Pms\Entities\Patient;

class PatientDB{

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

  public function saveUpdatePatientInfo($patient, $guardian, $moreInfoXMLArray){
    try {

      $xml_data = new \SimpleXMLElement('<?xml version="1.0"?><programe></programe>');
      $this->array_to_xml($moreInfoXMLArray, $xml_data);
      $programmeXML = $xml_data->asXML();

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
                          'pdoctor_id' =>  $moreInfoXMLArray['doctorId']
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
