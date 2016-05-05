<?php

namespace Pms\Datalayer;

use Pms\Datalayer\DBHelper;
use \SimpleXMLElement;
use \PDO;


/**
 *
 */
class ScheduleDB
{

  function __construct(){

  }

  public function persistSchedule($infoArray){

    try {

      $startDate = $infoArray['startDate'];
      $endDate = $infoArray['endDate'];
      $docId = $infoArray['userId'];;
      $scheduleCount = $infoArray['scheduleDaysCount'];
      $locationCount = $infoArray['locationCount'];
      $postedLocationJson = $infoArray['locationList'];

      $xml_data = new SimpleXMLElement('<?xml version="1.0"?><schedules></schedules>');
      $this->array_to_xml($postedLocationJson, $xml_data);
      $scheduleXML = $xml_data->asXML();

      $paramArray = array(
                          'pdoctor_id' => $docId,
                          'pstart_date' =>  $startDate,
                          'pend_date' =>  $endDate,
                          'pschedule_count' => $scheduleCount,
                          'plocation_count' =>  $locationCount,
                          'pschedule_xml' => $scheduleXML
                        );

      $statement = DBHelper::generateStatement('create_modify_schedule',  $paramArray);


      $statement->execute();

      $schedule = null;
      while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {
          $schedule = $result['schedule'];
      }

      return array('status' => "1", 'data' => $schedule, 'message' => 'success' );

    } catch (Exception $e) {

      return array('status' => "-1", 'data' => "-1", 'message' => 'exception' );

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
