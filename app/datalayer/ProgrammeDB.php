<?php
namespace Pms\Datalayer;

use \PDO;
use Pms\Datalayer\DBHelper;

class ProgrammeDB{

  public function createModifyPrograme($programId, $doctorId, $programName, $isActive, $listCount, $loggedInUserId, $loggedInUserType,  $programmeListArray){
    try {

      $xml_data = new \SimpleXMLElement('<?xml version="1.0"?><programme></programme>');
      $this->array_to_xml($programmeListArray, $xml_data);
      $programmeXML = $xml_data->asXML();

      $paramArray = array(
                          'pprogramme_id' => $programId,
                          'pdoctor_id' => $doctorId,
                          'pprogramme_name' => $programName,
                          'pis_active' => $isActive,
                          'pprogrammes_count' => $listCount,
                          'puser_id' => $loggedInUserId,
                          'puser_type' =>$loggedInUserType,
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


  public function getDoctorsCheckupPrograms($doctorId, $getOnlyActiveRows){
    try {

      $paramArray = array(
                          'pdoctor_id' => $doctorId
                          ,'pget_active_rows' => $getOnlyActiveRows
                        );

      $statement = DBHelper::generateStatement('get_doctors_checkup_programs',  $paramArray);

      $statement->execute();

      $programmeList = array();

      while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {
        $programmeList[] = array('id' => $result['id']
                                 , 'name' => $result['name']
                                 , 'created' =>  $result['created_date']
                                 , 'state' =>  $result['state']
                                 );
      }

      return $programmeList;

    } catch (Exception $e) {
      return array('status' => $status, 'data' => "", 'message' => 'exceptoin in DB' . $e->getMessage());
    }

  }

//used to get into to attach a program to a patient
  public function getProgrammeListDetails($programmeId, $getOnlyActiveRows){
    try {

      $paramArray = array(
                          'pprogramme_id' => $programmeId
                          ,'pget_active_rows' => $getOnlyActiveRows
                        );

      $statement = DBHelper::generateStatement('get_programme_list_details',  $paramArray);

      $statement->execute();

      $programmeDetailList = array();

      while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {
        $programmeDetailList[] = array(
                                       'id' => "0",
                                       'programmeListId' => $result['id'],
                                       'durationDays' => $result['duration_days'],
                                       'durationText' => $result['duration_text'],
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

 //used in create edit programme
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
      $medicationProgramme['isActive'] = $programmeRow['is_active'];

      $paramArray = array(
                          'pprogramme_id' => $medicationProgramme['programId']
                          ,'pget_active_rows' => 0
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
