<?php

namespace Pms\Datalayer;

use Pms\Datalayer\DBHelper;
use Pms\Datalayer\DoctorDB;
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

  public function getCalanderDetails($doctorId, $locationId, $startDate, $endDate){
    try {

      // get locaion list for the doctor

      $doctorDB = new DoctorDB();
      $locationArray = $doctorDB->getAllLocations($doctorId);

      //loop for each location array

      $paramArray = array(
        'pdoctor_id' => $doctorId,
        'plocation_id' => $locationId,
        'pstart_date' => $startDate,
        'pend_date' => $endDate
      );

      $statement = DBHelper::generateStatement('get_schedule_calander_details',  $paramArray);

      $statement->execute();

      $scheduleCalendar = array();
      $scheduleCalendar['locatationId'] = $locationId;
      $scheduleCalendar['LocationName'] = 'Marg';


      while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {

        $item = array();
        $item['startDateMinutes'] = $result['start_time_mins'];
        $item['endDateMinutes'] = $result['end_time_mins'];
        $item['scheduleId'] = $result['fk_schedule_id'];

        //making a schedule
        $schedule = array();
        $schedule['date'] = $result['schedule_date'];
        $schedule['schedule'][] = $item;

        $scheduleCalendar['scheduleList'][] = $schedule;

      }

      $scheduleLists = $scheduleCalendar['scheduleList'];
      $newList = array();
      foreach ($scheduleLists as $key => $value) {
        $date = $value['date'];

        $valueExists = false;
        foreach ($newList as $key1 => $value1) {
          //$newList[] = $date;
          if(isset($value1)){
            if(strcmp($date, $value1['date']) == 0){
              $newList[$key1]['schedule'][] = $value['schedule'];
              $valueExists = true;
            }
          }
        }//inner for loop ends

        if(!$valueExists){
          //$newList[] = $date;
          $newList[] = $value;
        }

      }

      $scheduleCalendar['twoList'] = $newList;


      return array('status' => "1", 'data' => $newList, 'message' => 'success' );

    } catch (Exception $e) {
      return array('status' => "-1", 'data' => "-1", 'message' => 'exception' );
    }

  }

}
