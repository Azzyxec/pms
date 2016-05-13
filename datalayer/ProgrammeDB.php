<?php
namespace Pms\Datalayer;

use \PDO;
use Pms\Datalayer\DBHelper;

class ProgrammeDB{

  public function createModifyPrograme($programId, $doctorId, $programName, $programmeListArray){
    try {

      $xml_data = new \SimpleXMLElement('<?xml version="1.0"?><programme></programme>');
      $this->array_to_xml($programmeListArray, $xml_data);
      $programmeXML = $xml_data->asXML();

      $paramArray = array(
                          'pprogramme_id' => $programId,
                          'pdoctor_id' => $doctorId,
                          'pprogramme_name' => $programName,
                          'pprogrammes_count' => \count($programmeListArray),
                          'pprogrammes_xml' => $programmeXML,
                        );

      $statement = DBHelper::generateStatement('create_modify_medical_programme',  $paramArray);

      $statement->execute();

      $row = $statement->fetch();

      $status = $row['status'];

      return array('status' => $status, 'data' => $status, 'message' => 'success');

    } catch (Exception $e) {
      return array('status' => $status, 'data' => "", 'message' => 'exceptoin in DB' . $e->getMessage());
    }

  }


  public function getMedicationProgrammeList($doctorId){
    try {

      $paramArray = array(
                          'pdoctor_id' => $doctorId
                        );

      $statement = DBHelper::generateStatement('get_medication_programme_list',  $paramArray);

      $statement->execute();

      $programmeList = array();

      while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {
        $programmeList[] = array('id' => $result['id'], 'name' => $result['name'], 'created' =>  $result['created_date']);
      }

      return array('status' => 1, 'data' => $programmeList, 'message' => 'success');

    } catch (Exception $e) {
      return array('status' => $status, 'data' => "", 'message' => 'exceptoin in DB' . $e->getMessage());
    }

  }

  public function getProgrammeListDetails($programmeId){
    try {

      $paramArray = array(
                          'pprogramme_id' => $programmeId
                        );

      $statement = DBHelper::generateStatement('get_programme_list_details',  $paramArray);

      $statement->execute();

      $programmeDetailList = array();

      while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {
        $programmeDetailList[] = array(
                                       'id' => "0",
                                       'programmeListId' => $result['id'],
                                       'durationDays' => $result['duration_days'],
                                       'medicine' => $result['medicine'],
                                       'doseNo' => $result['dose_no'],
                                       'dueOn' => "00-00-0000",
                                       'givenOn' => "00-00-0000",
                                       'batchNo' => ""
                                      );
      }

      return array('status' => 1, 'data' => $programmeDetailList, 'message' => 'success');


    } catch (Exception $e) {
      return array('status' => $status, 'data' => "", 'message' => 'exceptoin in DB' . $e->getMessage());
    }
  }

  public function getMedicationProgrammes($doctorId, $programmeId){
    try {

      $paramArray = array(
                          'pdoctor_id' => $doctorId,
                          'pprogramme_id' => $programmeId
                        );

      $statement = DBHelper::generateStatement('get_medication_programme',  $paramArray);

      $statement->execute();

      $programmeRow = $statement->fetch();

      $medicationProgramme = array();
      $medicationProgramme['programId'] = $programmeRow['id'];
      $medicationProgramme['programmeName'] = $programmeRow['name'];

      $paramArray = array(
                          'pprogramme_id' => $medicationProgramme['programId']
                        );

      $statement = DBHelper::generateStatement('get_programme_list_details',  $paramArray);

      $statement->execute();

      $programmeDetailList = array();  //array containing the lists
      while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {
        $programmeDetailList[] = array(
                                       'id' => $result['id'],
                                       'duration' => $result['duration_days'],
                                       'text' => $result['duration_text'],
                                       'vaccine' => $result['medicine'],
                                       'doseNo' => $result['dose_no']
                                      );
      }

      $medicationProgramme['programeList'] = $programmeDetailList;


      return array('status' => 1, 'data' => $medicationProgramme, 'message' => 'success');


    } catch (Exception $e) {
        return array('status' => $status, 'data' => "", 'message' => 'exceptoin in DB' . $e->getMessage());
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

        return array('status' => 1, 'data' => $programmes, 'message' => 'success');

    } catch (Exception $e) {
      return array('status' => $status, 'data' => "", 'message' => 'exceptoin in DB' . $e->getMessage());
    }

  }

  public function createUpdatePatientsProgramme($programmeArray){
    try {

        $xml_data = new \SimpleXMLElement('<?xml version="1.0"?><programme></programme>');
        $this->array_to_xml($programmeArray, $xml_data);
        $programmeXML = $xml_data->asXML();


        $paramArray = array(
                            'ppatient_id' => $programmeArray['patientId'],
                            'pdoctor_id' => $programmeArray['doctorId'],
                            'pprogramme_count' => $programmeArray['programmeCount'],
                            'pprogramme_xml' => $programmeXML
                          );

        $statement = DBHelper::generateStatement('create_modify_patients_programme',  $paramArray);

        $statement->execute();

        $row = $statement->fetch();

        $status = $row['status'];

        return array('status' => $status, 'data' => $programmeXML, 'message' => 'success');

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
