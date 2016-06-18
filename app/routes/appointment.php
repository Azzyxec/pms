<?php

use Pms\Entities\User;
use Pms\Entities\Appointment;
use Pms\Entities\Patient;
use Pms\Entities\UserSessionManager;
use Pms\Datalayer\AppointmentDB;
use Pms\Datalayer\PatientDB;

$app->group('/appointment', function(){

  $this->post('/closeAppointment', function ($request, $response) {
    try {

      $message = "success";
      $status = "-1";

      $user = UserSessionManager::getUser();

      if($user->id != -1){

        $postedData = $request->getParsedBody();


        $appointment = $postedData['appointment'];
        //$prescriptionList = $appointment['prescriptionList'];

        $appointmentDB = new AppointmentDB();
        $appointmentDB->closeAppointment($appointment, $user->id, $user->type);

      }else{
        $message = "user not logged in";
      }

      $data = array('status' => $status, 'data' => $appointment, 'message' => $message);
      return $response->withJson($data);


    } catch (Exception $e) {
      $data = array('status' => "-1", 'data' => "-1", 'message' => 'exception in main' . $e->getMessage());
      return $response->withJson($data);
    }

  });

  $this->post('/cancelAppointment', function ($request, $response) {
    try {

      $message = "success";
      $status = "-1";

      $user = UserSessionManager::getUser();

      if($user->id != -1){

        $postedData = $request->getParsedBody();

        $appointmentId = $postedData['id'];
        $remarks = $postedData['remarks'];

        $appointmentDB = new AppointmentDB();
        $status = $appointmentDB->cancelAppointment($appointmentId, $remarks, $user->id, $user->type);

      }else{
        $message = "user not logged in";
      }

      $data = array('status' => $status, 'data' => "", 'message' => $message);
      return $response->withJson($data);

    } catch (Exception $e) {
      $data = array('status' => "-1", 'data' => "-1", 'message' => 'exception in main' . $e->getMessage());
      return $response->withJson($data);
    }

  });

  $this->get('/getAppointmentsForTheDay', function ($request, $response) {
    try {

      $minTimeMins = 5;
      //if the free time is greater than 5 mins then slot is made available for booking an appointment

      $message = "success";

      $allGetVars = $request->getQueryParams();
      $locationId = $allGetVars['locId'];
      $date = $allGetVars['date'];

      $user = UserSessionManager::getUser();

      $appointmentDB = new AppointmentDB();

      $allApointments = $appointmentDB->getAppointmentsForTheDay($user->doctorId, $locationId, $date);

      $timingList = $appointmentDB->getScheduleTimingsForTheDay($user->doctorId, $locationId, $date);

      $todaysSchedule = array();
      foreach ($timingList as $key => $schedule) {
        //value is array with start and end time
        $startMins = $schedule['startMins'];
        foreach ($allApointments as $key1 => $appointment) {

          if($schedule['startMins']  <= $appointment['startMins'] &&
          $schedule['endMins'] >=  $appointment['endMins']){

          $endMins = $appointment['startMins'];



            $differenceMins = $endMins - $startMins;
            //$todaysSchedule[] = array('diff' => $differenceMins, 'startMins' => $startMins, 'endMins' => $endMins);

            if($differenceMins >= $minTimeMins){
              $freeTimeSlot = array('type' => 'f', 'state' => 0,  'diff' => $differenceMins, 'startMins' => $startMins, 'endMins' => $endMins);
              $todaysSchedule[] = $freeTimeSlot;
            }

            $appointment['type'] = 'a';
            $todaysSchedule[] = $appointment;

            if($appointment['state'] == 2){
              //if appointment is cancelled it will be considered as free time
               $startMins = $appointment['startMins'];
            }else{
            $startMins = $appointment['endMins'];
          }

          }
        } //inner foreach

        //checking if there is free time slot at the end
        $endMins = $schedule['endMins'];
        $differenceMins = $endMins - $startMins;
        if($differenceMins >= $minTimeMins){
          $todaysSchedule[] = array('type' => 'f', 'state' => 0,'diff' => $differenceMins, 'startMins' => $startMins, 'endMins' => $endMins);
        }


      }//outer foreach

      $data = array('status' => 1, 'data' => $todaysSchedule, 'message' => $message);
      return $response->withJson($data);

    } catch (Exception $e) {
      $data = array('status' => "-1", 'data' => "-1", 'message' => 'exception in main' . $e->getMessage());
      return $response->withJson($data);
    }

  });
 $this->get('/getAllAppointments', function ($request, $response) {
    try {

      $minTimeMins = 5;
      //if the free time is greater than 5 mins then slot is made available for booking an appointment

      $message = "success";


      $user = UserSessionManager::getUser();

      $appointmentDB = new AppointmentDB();

      $allPatientApointments = $appointmentDB->getAllAppointments($user->doctorId);

     $data = array('status' => 1, 'data' => $allPatientApointments, 'message' => $message);
      return $response->withJson($data);

    } catch (Exception $e) {
      $data = array('status' => "-1", 'data' => "-1", 'message' => 'exception in main' . $e->getMessage());
      return $response->withJson($data);
    }

  });

  $this->post('/bookAppointment', function ($request, $response) {

    try {

      $message = "success";

      $user = UserSessionManager::getUser();

      $postedData = $request->getParsedBody();

      $appointmentData = $postedData['appointment'];

      $appointment = new Appointment();
      $appointment->locationId = $appointmentData['locationId'];
      $appointment->contact = $appointmentData['contact'];
      $appointment->appointmentDate = $appointmentData['date'];
      $appointment->startMins = $appointmentData['startTimeMins'];
      $appointment->endMins = $appointmentData['endTimeMins'];
      $appointment->description = $appointmentData['description'];


      //check if the appointment is available
      $appointmentDB = new AppointmentDB();
      $status = $appointmentDB->checkAppointmentAvailibility($appointment, $user->doctorId);

      if($status == 1){

        $patientData = $postedData['patient'];

        if($patientData['id'] == 0){

          //save the patient
          $patient = new Patient();
          $patient->id = 0;
          $patient->name = $patientData['name'];
          $patient->dateOfBirth = $patientData['dateOfBirth'];
          $patient->bloodGroup = $patientData['bloodGroup'];
          $patient->weight = $patientData['weight'];
          $patient->height = $patientData['height'];
          $patient->gender = $patientData['gender'];
          $patient->contact1 = $patientData['contact'];
          $patient->isActive = 1;

          $patientDB = new PatientDB();

          $resultArray = $patientDB->saveUpdatePatientInfo($patient, $user->doctorId, $user->id, $user->type );

          $patientId = $resultArray['data']['patientId'];

          $appointment->patientId = $patientId;

        }else{
          $appointment->patientId = $patientData['id'];
        }



        $appointmentDB->insertAppointmentEntry($appointment, $user->doctorId, $user->id, $user->type);

      }else if($status == 2){
        //schedule not added or appointment timings are not in work timing range
        $message = "Either there is no schedule or appointment timings are oustide the work timings";

      }else if($status == 3){
        // the timing over lap with an existing appointment
        $message = "Timings clash with an existing appointment";
      }

      $data = array('status' => $status, 'data' => $postedData, 'message' => $message);
      return $response->withJson($data);

    } catch (Exception $e) {
      $data = array('status' => "-1", 'data' => "-1", 'message' => 'exception in main' . $e->getMessage());
      return $response->withJson($data);
    }

  });


});
