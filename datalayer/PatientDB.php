<?php
namespace Pms\Datalayer;

use \PDO;
use Pms\Datalayer\DBHelper;

class PatientDB{

  public function saveUpdatePatientInfo($patient, $guardian, $moreInfoXMLArray){
    try {

      $xml_data = new \SimpleXMLElement('<?xml version="1.0"?><programe></programe>');
      $this->array_to_xml($moreInfoXMLArray, $xml_data);
      $programmeXML = $xml_data->asXML();

      $paramArray = array(
                          'pid' => $patient->id,
                          'pname' =>  $patient->name,
                          'pdate_of_birth' =>  $patient->dateOfBirth,
                          'pweight' =>  $patient->weight,
                          'pheight' =>  $patient->height,
                          'pgender' =>  $patient->gender,
                          'pcontact1' =>  $patient->contact1,
                          'pcontact2' =>  $patient->contact2,
                          'pemail' =>  $patient->email,
                          'paddress' =>  $patient->address,
                          'ppicture_path' => $patient->picturePath,
                          'pis_guardain' =>  $patient->isGuardian,
                          'ppatient_id' =>  $patient->GuardianId,
                          'pmedical_programme_id' =>  $patient->medicalProgrammeId,
                          'pdoctor_id' =>  $moreInfoXMLArray['doctorId'],
                          'pprogramme_xml' => $programmeXML
                        );

      $statement = DBHelper::generateStatement('add_update_patient',  $paramArray);

      $statement->execute();

      $row = $statement->fetch();

      $status = $row['status'];

      return array('status' => $status, 'data' => $programmeXML , 'message' => 'success');
    } catch (Exception $e) {
      return array('status' => $status, 'data' => $user, 'message' => 'exceptoin in DB' . $e->getMessage());
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
