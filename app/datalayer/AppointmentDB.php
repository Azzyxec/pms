<?php
namespace Pms\Datalayer;

use \PDO;
use Pms\Datalayer\DBHelper;
use Pms\Entities\Appointment;


class AppointmentDB{

  public function getAppointmentsForTheDay($doctorId, $locationId, $date){
    try {



      $paramArray = array(
        'pdoctor_id' => $doctorId,
        'plocation_id' => $locationId,
        'pdate' => $date
      );

      $statement = DBHelper::generateStatement('get_appointments_for_the_day',  $paramArray);

      $statement->execute();

      $appointments = array();
      while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {

        $appointment = array();
        $appointment['id'] = $result['id'];
        $appointment['contact'] = $result['contact'];
        $appointment['patientId'] = $result['fk_patient_id'];
        $appointment['name'] = $result['name'];
        $appointment['startMins'] = $result['start_mins'];
        $appointment['endMins'] = $result['end_mins'];
        $appointment['description'] = $result['description'];
        $appointment['state'] = $result['state'];
        $appointment['isRescheduled'] = $result['is_rescheduled'];

        $appointments[] = $appointment;
      }

      return $appointments;




    } catch (Exception $e) {
      return -1;
    }

  }

  public function getScheduleTimingsForTheDay($doctorId, $locationId, $date){
    try {

      $paramArray = array(
        'pdoctor_id' => $doctorId,
        'plocation_id' => $locationId,
        'pdate' => $date
      );

      $statement = DBHelper::generateStatement('get_schedules_timings_for_the_day',  $paramArray);

      $statement->execute();

      $timingList = array();
      while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {

        $timing = array();
        $timing['startMins'] = $result['start_time_mins'];
        $timing['endMins'] = $result['end_time_mins'];

        $timingList[] = $timing;
      }

      return $timingList;

    } catch (Exception $e) {
      return -1;
    }

  }

  public function checkAppointmentAvailibility($appointment, $doctorId){
    try {


      $paramArray = array(
        'pdoctor_id' => $doctorId,
        'plocation_id' => $appointment->locationId,
        'pappointment_date' => $appointment->appointmentDate,
        'pstart_time' => $appointment->startMins,
        'pend_time' => $appointment->endMins
      );
      $statmentType = "select"; //for a function call

      $statement = DBHelper::generateStatement('check_appointment_avalibility',  $paramArray, $statmentType);

      $statement->execute();

      $row = $statement->fetch();

      return $row[0];


    } catch (Exception $e) {
      return -1;
    }

  }

  public function insertAppointmentEntry($appointment, $doctorId, $loggedinUserId, $loggedinUserType){
    try {

      $paramArray = array(
        'pdoctor_id' => $doctorId,
        'plocation_id' => $appointment->locationId,
        'ppatient_id' => $appointment->patientId,
        'pappointment_date' => $appointment->appointmentDate,
        'pstart_mins' => $appointment->startMins,
        'pend_mins' => $appointment->endMins,
        'pcreated_by_id' => $loggedinUserId,
        'pcreated_by_type' => $loggedinUserType,
        'pcontact' => $appointment->contact,
        'pdescription' => $appointment->description
      );

      $statement = DBHelper::generateStatement('insert_new_appointment',  $paramArray);

      return $statement->execute();




    } catch (Exception $e) {
      return  -1;
    }
  }

}
