<?php

namespace Pms\Datalayer;

use Pms\Datalayer\DBHelper;
use \PDO;


/**
 *
 */
class ScheduleDB
{

  function __construct(){

  }

  public function persistSchedule($doctorId, $startDate, $endDate, $locId, $scheduleCount, $scheduleListXML, $userId, $userType){

    try {

      $docId = $doctorId;
      $startDate = $startDate;
      $endDate = $endDate;
      $locationId = $locId;
      $scheduleCount = $scheduleCount;
      $scheduleXML = $scheduleListXML;
      $createdById = $userId;
      $createdByType = $userType;

      $paramArray = array(
                          'pdoctor_id' => $docId,
                          'pstart_date' =>  $startDate,
                          'pend_date' =>  $endDate,
                          'pschedule_count' => $scheduleCount,
                          'plocation_id' =>  $locationId,
                          'puser_id' =>  $createdById,
                          'puser_type' =>  $createdByType,
                          'pschedule_xml' => $scheduleXML
                        );

      $statement = DBHelper::generateStatement('create_schedule',  $paramArray);


      $statement->execute();

      $status = null;
      while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {
          $status = $result['status'];
      }

      return array('status' => $status, 'data' => $status, 'message' => 'success' );

    } catch (Exception $e) {

      return array('status' => "-1", 'data' => "-1", 'message' => 'something is not right with database access' );

    }
  }


  public function getScheduleList($doctorId){
    try {

      $paramArray = array('pdoctor_id' => $doctorId);

      $statement = DBHelper::generateStatement('get_schedule_list',  $paramArray);

      $statement->execute();

      $scheduleList = array();

      while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {
        $scheduleList[] = array(
                                  'id' => $result['id'],
                                  'startDate' => $result['start_date'],
                                  'endDate' => $result['end_date'],
                                  'createdDate' => $result['created_date'],
                               );
      }

        return array('status' => "1", 'data' => $scheduleList, 'message' => 'success' );
    } catch (Exception $e) {
      return array('status' => "-1", 'data' => "-1", 'message' => 'exception' );
    }
  }

}
