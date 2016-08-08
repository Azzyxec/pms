<?php

use Pms\Entities\User;
use Pms\Entities\Appointment;
use Pms\Entities\Patient;
use Pms\Entities\UserSessionManager;
use Pms\Datalayer\AppointmentDB;
use Pms\Datalayer\PatientDB;
use Pms\Datalayer\SmsDB;
use Pms\Utilities\XMLHelper;
use Pms\Utilities\SmsService;

$app->group('/appointment', function(){

  $this->get('/smsText', function ($request, $response) {

    $appointmentDB = new AppointmentDB();

    $appointmentInfo = $appointmentDB->getAppointmentInfo(137);

    //prepar sms text and send
     $smsText = "Dear " . substr($appointmentInfo['patient'], 0, 10) . "," .
                " your appointment is on " . $appointmentInfo['date'] .
                " at " . $appointmentInfo['time'] .
                " at Dr " . $appointmentInfo['doctor'] . "'s" .
                " clinic, " . $appointmentInfo['location'];


    $response->withJson(array('message' => $smsText));

  });


  $this->get('/sendsms', function ($request, $response) {

    try {

      //limit the sms to max 60 characters

      $user = UserSessionManager::getUser();

      if($user->id != -1){

        $allGetVars = $request->getQueryParams();

        $message = $allGetVars['message'];
        $mobileNo =  $allGetVars['mobileNo'];
        //return $response->write('db id' . $id);

        $sms = SmsService::getInstance();

        $uniqueId = '';

        $smsResponse = $sms->send($message, $mobileNo, $uniqueId);

        $smsDB = new SmsDB();

        $id = $smsDB->insertEntry($message, $smsService->contactNo, $smsResponse);

        return  $response->withJson(array('status' => 1, 'url' => $sms->sendUrl, 'response' => $smsResponse));
        //return  $response->write($sms->sendUrl . ' response ' . $smsResponse);

    }else{
      return $response->withJson(array('status' => -1, "message" => 'you need to be logged in for this action'));
    }


    } catch (Exception $e) {
      $data = array('status' => "-1", 'data' => "-1", 'message' => 'exception in appointment controller' . $e->getMessage());
      return $response->withJson($data);
    }

  });


  $this->get('/addFiles', function ($request, $response) {

    $sms = SmsHelper::getInstance();

    $allGetVars = $request->getQueryParams();

    $id = $allGetVars['id'];
    $name = $allGetVars['name'];
    $newName = $allGetVars['newName'];

    UserSessionManager::addUploadedfile($id, $name, $newName);

    return $response->withJson($allGetVars);

  });

  $this->get('/getFiles', function ($request, $response) {

    $data = "no files";

    $allGetVars = $request->getQueryParams();

    $id = $allGetVars['id'];

    $data = UserSessionManager::getUploadedfileList($id);

    return $response->withJson($data);

  });

  $this->get('/clearfiles', function ($request, $response) {

    $allGetVars = $request->getQueryParams();

    $id = $allGetVars['id'];

    UserSessionManager::clearFileList($id);
    return $response->withJson('');

  });


  $this->post('/closeAppointment', function ($request, $response) {

    try {

      $message = "success";
      $status = "-1";
      $nextAppointmentStatus = -1;

      $user = UserSessionManager::getUser();

      //
      //


      if($user->id != -1){

        $postedData = $request->getParsedBody();

        $appointment = $postedData['appointment'];

        $uploadedFileListXml = "";
        $uploadedFileCount = 0;

        //checking for file uploadedFiles
        if(isset( $appointment['uniqueId']) && isset($appointment['uploadedFileList'])){

          $checkFileList = $appointment['uploadedFileList'];

          $uniqueCloseAppointmentId = $appointment['uniqueId'];
          $uploadedFileList = UserSessionManager::getUploadedfileList($uniqueCloseAppointmentId);

          $checkFileListCount = count($checkFileList);
          $saveFileListArray = array();
          for ($i = 0 ; $i  < $checkFileListCount ; $i++){
            $checkFileId = $checkFileList[$i]['id'];

            if(isset($uploadedFileList['_'.$checkFileId])){
              $fileInfo = $uploadedFileList['_'.$checkFileId];
              $saveFileListArray[] = $fileInfo;
            }

          }


          //check if there are any uploaded files
          $uploadedFileListXml = '';
          $uploadedFileCount = count($saveFileListArray);
          if($uploadedFileCount > 0){

            $xml_data1 = new \SimpleXMLElement('<?xml version="1.0"?><list></list>');
            XMLHelper::array_to_xml($saveFileListArray, $xml_data1);
            $uploadedFileListXml = $xml_data1->asXML();

          }

        }

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
        $status = $appointmentDB->closeAppointment($appointment, $prescriptionListXml, $prescriptionCount, $uploadedFileListXml, $uploadedFileCount ,  $user->id, $user->type);

        if($status == 1 && isset( $appointment['uniqueId'])){
            $uniqueCloseAppointmentId = $appointment['uniqueId'];
            UserSessionManager::clearFileList($uniqueCloseAppointmentId);
        }

        //booking the next appointment
        $bookNextAppointment = $appointment['bookNextAppointment'];


        if($status == 1 && $bookNextAppointment == true){
          //info to check if next appointment is available
          $appointmentId = $appointment['appointmentId'];
          //contact get using appointment id
          $appointmentDate = $appointment['nextAppointmentDate'];
          $appointmentStartTime = $appointment['nextAppointmentStartTime'];
          $appointmentEndTime = $appointment['nextAppointmentEndTime'];
          //description set as booking through close appointment
          //last close descripton: "xyz"

          $nextAppointmentStatus = $appointmentDB->checkNextAppointmentAvailibility($appointmentId,
          $appointmentDate,
          $appointmentStartTime,
          $appointmentEndTime
        );

        if($nextAppointmentStatus == 1){


          //can book appointment/ make and new appointment entry

          $appId = $appointmentDB->insertNextAppointmentEntry(
                            $appointmentId,
                            $appointmentDate,
                            $appointmentStartTime,
                            $appointmentEndTime,
                            $user->id,
                            $user->type
                          );

          if($appId != -1){

             try{
                  //for sending sms

                  //get sms info
                  $appointmentInfo = $appointmentDB->getAppointmentInfo($appId);

                  //generate sms text
                  $smsText = "Dear " . substr($appointmentInfo['patient'], 0, 10) . "," .
                             " your next appointment is on " . $appointmentInfo['date'] .
                             " at " . $appointmentInfo['time'] .
                             " at Dr " . $appointmentInfo['doctor'] . "'s" .
                             " clinic, " . $appointmentInfo['location'];
                 //send sms
                 $contact = $appointmentInfo['contact'];
                 $smsService = SmsService::getInstance();
                 $uniqueId = '';
                 $smsResponse = $smsService->send($smsText, $contact, $uniqueId);

                 $smsDB = new SmsDB();

                 $id = $smsDB->insertEntry($smsText, $smsService->contactNo, $smsResponse);

                 //$message = $smsService->$uploadedFileCount;

             }catch (Exception $ex) {
               $message = $message + " but problems in sms sending and recording in database" . $ex->getMessage();
             }

          }

      }
      //and get patient info using patient key
    }


  }else {
    $message = "user not logged in";
  }

  $data = array('status' => $status, 'nextAppointmentStatus' => $nextAppointmentStatus, 'data' => $postedData, 'message' => $message);
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


$this->post('/rescheduleAppointment', function ($request, $response) {
  try {

    $message = "success";
    $status = "-1"; //appointment timing clasing or no schedule added
    $nextAppointmentStatus = -1;

    $user = UserSessionManager::getUser();

    if($user->id != -1){

      $postedData = $request->getParsedBody();

      $rescheduleInfo = $postedData['rescheduleInfo'];

      $appointmentId = $rescheduleInfo['appointmentId'];
      $date = $rescheduleInfo['date'];
      $startTimeMins = $rescheduleInfo['startTimeMins'];
      $endTimeMins = $rescheduleInfo['endTimeMins'];
      $remarks = $rescheduleInfo['remarks'];

      $appointmentDB = new AppointmentDB();

      $status = $appointmentDB->checkNextAppointmentAvailibility(
      $appointmentId,
      $date,
      $startTimeMins,
      $endTimeMins
    );

    if($status == 1){


      $appId = $appointmentDB->rescheduleAppointment(
                  $appointmentId,
                  $date,
                  $startTimeMins,
                  $endTimeMins,
                  $user->id,
                  $user->type,
                  $remarks
                );

    if($appId != -1){

      try{
        //for sending sms

        //get sms info
        $appointmentInfo = $appointmentDB->getAppointmentInfo($appId);

        //generate sms text
        $smsText = "Dear " . substr($appointmentInfo['patient'], 0, 10) . "," .
                   " your appointment is rescheduled on " . $appointmentInfo['date'] .
                   " at " . $appointmentInfo['time'] .
                   " at Dr " . $appointmentInfo['doctor'] . "'s" .
                   " clinic, " . $appointmentInfo['location'];
       //send sms
       $contact = $appointmentInfo['contact'];
       $smsService = SmsService::getInstance();
       $uniqueId = '';
       $smsResponse = $smsService->send($smsText, $contact, $uniqueId);

       $smsDB = new SmsDB();

       $id = $smsDB->insertEntry($smsText, $smsService->contactNo, $smsResponse);

       //$message = $smsService->sendUrl;

   }catch (Exception $ex) {
     $message = $message + " but problems in sms sending and recording in database" . $ex->getMessage();
   }


    }else{
     $status = -1;
       $message = "could not reschedule";
    }


  }




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
        if($schedule['startMins']  <= $appointment['startMins']
        && $schedule['endMins'] >=  $appointment['endMins']
        && $schedule['scheduleDayId'] = $appointment['scheduleDayId']){

          //each appointmetn has a start mins and end mins
          //check the start time of appointment
          //if there is a free time between start of an appointment and end time of previous appointment
          //its considered as free time slot to book appointments
          //initial case: when there is no booking at the start of a day, schedule start time is considered
          // as start time
          $endMins = $appointment['startMins'];

          $differenceMins = $endMins - $startMins;
          //$todaysSchedule[] = array('diff' => $differenceMins, 'startMins' => $startMins, 'endMins' => $endMins);

          if($differenceMins >= $minTimeMins){
            if($allowBooking){
              //this allowBooking flag check is booking date is today or greater than today
              $freeTimeSlot = array('type' => 'f',
              'state' => 0,
              'scheduleId' => $schedule['scheduleId'],
              'scheduleDayId' => $schedule['scheduleDayId'],
              'locId' => $schedule['locId'],
              'diff' => $differenceMins,
              'startMins' => $startMins,
              'endMins' => $endMins);
              $todaysSchedule[] = $freeTimeSlot;
            }
          }

          //type f for free time slot and a for any kin gof appointment
          $contains = false;
          foreach ($todaysSchedule as $Appkey => $Appvalue) {
            if($Appvalue['type'] != 'f'  && $Appvalue['id'] == $appointment['id']){
              $contains = true;
            }
          }
          if($contains == false){
            $appointment['type'] = 'a';
            $todaysSchedule[] = $appointment;
          }

          //since we take the end time of the current appointment
          // to determine if there is a free time betwwen the next appointment
          // we take the start time as end time of active and closed booking, active state = 0, closed state = 1
          // we dont conside cancelled and rescheduled appointmetns , cancelled state = 2, rescheduled state = 3
          if($appointment['state'] == 2 || $appointment['state'] == 3){
            //if appointment is cancelled or rescheduled it will be considered as free time
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
          'scheduleDayId' => $schedule['scheduleDayId'],
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
    $appointment->scheduleDayId = $appointmentData['scheduleDayId'];
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
        $patient->name = trim($patientData['name']);
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

      $appointment->id = $appointmentDB->insertAppointmentEntry($appointment, $user->doctorId, $user->id, $user->type);


      try{
        //for sending sms

        //get sms info
        $appointmentInfo = $appointmentDB->getAppointmentInfo($appointment->id);

        //generate sms text
        $smsText = "Dear " . substr($appointmentInfo['patient'], 0, 10) . "," .
                   " your appointment is on " . $appointmentInfo['date'] .
                   " at " . $appointmentInfo['time'] .
                   " at Dr " . $appointmentInfo['doctor'] . "'s" .
                   " clinic, " . $appointmentInfo['location'];
       //send sms
       $contact = $appointmentInfo['contact'];
       $smsService = SmsService::getInstance();
       $uniqueId = '';
       $smsResponse = $smsService->send($smsText, $contact, $uniqueId);

       $smsDB = new SmsDB();

       $id = $smsDB->insertEntry($smsText, $smsService->contactNo, $smsResponse);

       //$message = $smsService->sendUrl;

   }catch (Exception $ex) {
     $message = $message + " but problems in sms sending and recording in database" . $ex->getMessage();
   }



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
