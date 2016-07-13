<?php

use Pms\Entities\User;
use Pms\Entities\Appointment;
use Pms\Entities\Patient;
use Pms\Entities\UserSessionManager;
use Pms\Datalayer\AppointmentDB;
use Pms\Datalayer\PatientDB;
use Pms\Utilities\XMLHelper;

$app->group('/appointment', function(){


  $this->get('/test', function ($request, $response) {


      $appointment = array( "appointmentId" => 2,
                            "closingDate" => "12-07-2016",
                            "closingTime" => "09:00 AM",
                            "nextAppointmentDate" => "",
                            "nextAppointmentTime" => "",
                            "patientsName" => "John",
                            "remarks" =>   "xyz"
                            );

      $prescription = array();
      $prescription[] = array("name"=>"one", "remarks"=>"ola");
      $prescription[] = array("name"=>"two", "remarks"=>"obrigado");

      $prescriptionCount = 2;

      $xml_data = new \SimpleXMLElement('<?xml version="1.0"?><list></list>');
      XMLHelper::array_to_xml($prescription, $xml_data);
      $prescriptionListXml = $xml_data->asXML();

      $appointmentDB = new AppointmentDB();
      $status = $appointmentDB->closeAppointment($appointment, $prescriptionListXml, $prescriptionCount, 1, 'D');

      return $response->withJson(array("status" => $status));
    });

  $this->post('/closeAppointment', function ($request, $response) {
    try {

      $message = "success";
      $status = "-1";

      $user = UserSessionManager::getUser();

      if($user->id != -1){

        $postedData = $request->getParsedBody();

        $appointment = $postedData['appointment'];

        //Test code


        $prescription = array();
        $prescriptionListXml = "";
        $prescriptionCount = 0;

        if(isset($appointment['prescriptionList'])){

          $prescription = $appointment['prescriptionList'];

          $prescriptionCount = count($prescription);

          $xml_data = new \SimpleXMLElement('<?xml version="1.0"?><list></list>');
          XMLHelper::array_to_xml($prescription, $xml_data);
          $prescriptionListXml = $xml_data->asXML();

        }

        $appointmentDB = new AppointmentDB();
        $status = $appointmentDB->closeAppointment($appointment, $prescriptionListXml, $prescriptionCount,  $user->id, $user->type);

      }else {
        $message = "user not logged in";
      }

      $data = array('status' => $status, 'data' => $postedData, 'message' => $message);
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


      //if date is previous date then dont calculate the free time, so that booking appointment slot is not shown

      $todaysDate = date_create(); // date("Y-m-d H:i:s");
      $appointmentDate = DateTime::createFromFormat('d-m-Y', $date);

      $allowBooking =  $appointmentDate >= $todaysDate;//   $todaysDate->diff($appointmentDate);


      $timingList = $appointmentDB->getScheduleTimingsForTheDay($user->doctorId, $locationId, $date);

      $todaysSchedule = array();
      foreach ($timingList as $key => $schedule) {
        //value is array with start and end timings i.e. 9 to 5 and 3 to 6
        $startMins = $schedule['startMins'];
        foreach ($allApointments as $key1 => $appointment) {

          //Loop throught the schedules and determine if ther are withing the time range of a  schedule
          if($schedule['startMins']  <= $appointment['startMins'] &&
          $schedule['endMins'] >=  $appointment['endMins']){

          //each appointmetn has a start mins and end mins
          $endMins = $appointment['startMins'];

            $differenceMins = $endMins - $startMins;
            //$todaysSchedule[] = array('diff' => $differenceMins, 'startMins' => $startMins, 'endMins' => $endMins);

            if($differenceMins >= $minTimeMins){
              if($allowBooking){
                $freeTimeSlot = array('type' => 'f',
                                      'state' => 0,
                                      'scheduleId' => $schedule['scheduleId'],
                                      'locId' => $schedule['locId'],
                                      'diff' => $differenceMins,
                                      'startMins' => $startMins,
                                      'endMins' => $endMins);
                $todaysSchedule[] = $freeTimeSlot;
              }
            }

            //type f for free time slot and a for any kin gof appointment

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
          if($allowBooking){
            $todaysSchedule[] = array('type' => 'f',
                                      'state' => 0,
                                      'scheduleId' => $schedule['scheduleId'],
                                      'locId' => $schedule['locId'],
                                      'diff' => $differenceMins,
                                      'startMins' => $startMins,
                                      'endMins' => $endMins);
          }
        }


      }//outer foreach

      $data = array('status' => 1, 'data' => $todaysSchedule, 'message' => $message, 'allowBooking' => $allowBooking);
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
      else if($status == 4){
        // the timing over lap with an existing appointment
        $message = "cannot book appointment for a previous date";
      }

      $data = array('status' => $status, 'data' => $postedData, 'message' => $message);
      return $response->withJson($data);

    } catch (Exception $e) {
      $data = array('status' => "-1", 'data' => "-1", 'message' => 'exception in main' . $e->getMessage());
      return $response->withJson($data);
    }

  });


});
