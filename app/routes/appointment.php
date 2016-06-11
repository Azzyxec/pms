<?php

use Pms\Entities\User;
use Pms\Entities\Appointment;
use Pms\Entities\Patient;
use Pms\Entities\UserSessionManager;
use Pms\Datalayer\AppointmentDB;
use Pms\Datalayer\PatientDB;

$app->group('/appointment', function(){


$this->get('/getAppointmentsForTheDay', function ($request, $response) {
  try {

    $message = "success";

    $allGetVars = $request->getQueryParams();
    $locationId = $allGetVars['locId'];
    $date = $allGetVars['date'];

    $user = UserSessionManager::getUser();

    $appointmentDB = new AppointmentDB();

    $timingList = $appointmentDB->getScheduleTimingsForTheDay($user->doctorId, $locationId, $date);


    $data = array('status' => 1, 'data' => $timingList, 'message' => $message);
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
