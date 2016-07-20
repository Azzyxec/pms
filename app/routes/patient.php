<?php

use Pms\Entities\User;
use Pms\Entities\Patient;
use Pms\Entities\BirthDetails;
use Pms\Entities\UserSessionManager;
use Pms\Datalayer\PatientDB;
use Pms\Datalayer\ProgrammeDB;


$app->group('/patient', function(){

$this->get('/getDeliveryMethods', function ($request, $response) {
  try {


    $patient = new PatientDB();
    $data = $patient->getDeliveryMethods();

    $data = array('status' => "1", 'data' => $data['data'], 'message' => 'success' );
    return $response->withJson($data);

  } catch (Exception $e) {
    $data = array('status' => "-1", 'data' => "-1", 'message' => 'exception in controller'  . $e->getMessage() );
    return $response->withJson($data);
  }

});

$this->get('/getPatientImage', function ($request, $response) {
  return $response->withJson('/lksdflj');

});



$this->get('/getPatientListForAutoFill', function ($request, $response) {
  try {

    $data = "";
    $message = "you might need to log in as a doctor";

    $user = UserSessionManager::getUser();

    if($user->id != "-1"){

      $patientDB =  new PatientDB();
      $resultArray = $patientDB->getPatienListForAutofill($user->doctorId);

      $message = "success";
      $data = $resultArray['data'];

    }

    $data = array('status' => "1", 'data' => $data, 'message' => $message);
    return $response->withJson($data);

  } catch (Exception $e) {
    $data = array('status' => "-1", 'data' => "-1", 'message' => 'exceptoin in main' . $e->getMessage());
    return $response->withJson($data);
  }

});




    $this->get('/getPatientList', function ($request, $response) {
      try {

        $data = "";
        $message = "you might need to log in as a doctor";

        $user = UserSessionManager::getUser();

        if($user->id != "-1"){

          $patientDB =  new PatientDB();
          $resultArray = $patientDB->getPatienList($user->doctorId);

          $message = "success";
          $data = $resultArray['data'];

        }

        $data = array('status' => "1", 'data' => $data, 'message' => $message);
        return $response->withJson($data);

      } catch (Exception $e) {
        $data = array('status' => "-1", 'data' => "-1", 'message' => 'exceptoin in main' . $e->getMessage());
        return $response->withJson($data);
      }

    });




      $this->get('/getPatientHistory', function ($request, $response) {
      try {



        $data = "";
        $message = "you might need to log in as a doctor";
        $allGetVars = $request->getQueryParams();



        if( isset($allGetVars['patient_id'])){

          $patientDB =  new PatientDB();
          $resultArray = $patientDB->getPatientsHistory($allGetVars['patient_id']);

          $message = "success";
          $data = $resultArray['data'];



        $data = array('status' => "1", 'data' => $data, 'message' => $message);
        return $response->withJson($data);

            }

      } catch (Exception $e) {
        $data = array('status' => "-1", 'data' => "-1", 'message' => 'exceptoin in main' . $e->getMessage());
        return $response->withJson($data);
      }

    });


    $this->post('/addUpdatePatient', function ($request, $response) {
      try {

        /*
          $postedData = $request->getParsedBody();

          $data = array('status' => "1", 'data' => $postedData, 'message' => 'test' );
          return $response->withJson($data);


       */

       /*
       //save patient section
       $patient = new Patient();
       $patient->id = 0;
       $patient->name = "Travolda";
       $patient->dateOfBirth = "01-04-2016";
       $patient->bloodGroup = "AB+";
       $patient->weight = "2 kgs";
       $patient->height = "20 cms";
       $patient->gender = 1;
       $patient->contact1 = "14242341";
       $patient->contact2 = "12412341";
       //$patient->email = "revolution@singing.com";
       $patient->address = "Kanas";
       $patient->picturePath = "2.jpg";
       $patient->isActive = 1;
       */

        $user = UserSessionManager::getUser();

        if($user->id != "-1"){
          //need to check for the user type too

          $postedData = $request->getParsedBody();

          //getting patients  info details
          $patient = Patient::getInsanceFromArray($postedData['patientInfo']);

          $data = array('patient' => $patient);

         //save patients info
         $patientDB = new PatientDB();
         //TODO save patient info
         $savePatientResponse = $patientDB->saveUpdatePatientInfo($patient, $user->doctorId, $user->id, $user->type);
         $savedPatientId = $savePatientResponse['data']['patientId'];
         $patient->id = $savedPatientId;

         if(isset($postedData['guardianInfo'])){

           $guardianArray = $postedData['guardianInfo'];
           $guardian =  new Patient();
           $guardian->id = $savedPatientId;
           $guardian->name = $guardianArray['name'];
           $guardian->gender = $guardianArray['gender'];
           $guardian->contact1 = $guardianArray['contact1'];
           $guardian->address =  $guardianArray['address'];
           $guardian->picturePath =  $guardianArray['picUploadPath'];
           $guardian->isActive = $patient->isActive;

           //TODO save guardian info
           $saveGuardianResponse = $patientDB->saveUpdateGuardianInfo($guardian, $savedPatientId);

           $data['guardian'] = $guardian;

         }

         $programeCount =  (int)$postedData['programmeCount'];

         if($programeCount > 0 && isset($postedData['patientsPrograms'])){

           $programList = array();
           $programList = $postedData['patientsPrograms'];
           $programList['doctorId'] = $user->doctorId;
           $programList['patientId'] = $patient->id;
           $programList['programmeCount'] = $postedData['programmeCount'];
           $programmeDB = new ProgrammeDB();
           $programmeResponse = $programmeDB->createUpdatePatientsProgramme($programList);

           $data['programmes'] = $programList;

         }

        $resp = array('status' => "1", 'data' => $data, 'message' => 'success' );

        return $response->withJson($resp);

          /*
          //collecting guardian details
          $guardian =  new Patient();
          $guardian->name = "Guardian";
          $guardian->dateOfBirth = "01-04-2016";
          $guardian->gender = 1;
          $guardian->picturePath = "2.jpg";
          $guardian->contact1 = "14242341";
          $guardian->contact2 = "12412341";
          $guardian->address = "Osaka";
          $guardian->isActive = $patient->isActive;
          */

          /*
          $birthDetails = new BirthDetails();
          $birthDetails->deliveryMethodId = 1;
          $birthDetails->birthWeight = "2 kg";
          $birthDetails->length = "25 cms";
          $birthDetails->head = " 10 cms";
          $birthDetails->bloodGroup = "AB+";
          $birthDetails->mothersName = "Jenny";
          $birthDetails->mothersBloodGroup = "B+";
          $birthDetails->fathersName = "Edward";
          $birthDetails->fathersBloodGroup = "AB+";
          $birthDetails->siblings = "1";
          $birthDetails->isActive = 1;
          $birthDetails->remarks = "Test Data";
          */

          /*
          $birthInfoArray = $postedData['birthInfo'];
          $birthDetails = new BirthDetails();
          $birthDetails->deliveryMethodId = $birthInfoArray['deliveryMethodId'];
          $birthDetails->birthWeight = $birthInfoArray['birthWeight'];
          $birthDetails->length = $birthInfoArray['length'];
          $birthDetails->head = $birthInfoArray['head'];
          $birthDetails->bloodGroup = $birthInfoArray['bloodGroup'];
          $birthDetails->mothersName = $birthInfoArray['mothersName'];
          $birthDetails->mothersBloodGroup = $birthInfoArray['mothersBloodGroup'];
          $birthDetails->fathersName = $birthInfoArray['fathersName'];
          $birthDetails->fathersBloodGroup = $birthInfoArray['fathersBloodGroup'];
          $birthDetails->siblings = $birthInfoArray['siblings'];
          $birthDetails->isActive = $patient->isActive;
          $birthDetails->remarks = $birthInfoArray['remarks'];
          */



          //$saveBirthInfoResponse = $patientDB->saveUpdateBirthDetails($birthDetails, $savedPatientId);

          //save update patients programme
          /*
          $programList = array();

          if(isset($postedData['patientsPrograms'])){
            $programList = $postedData['patientsPrograms'];

            $programList['doctorId'] = $user->doctorId;
            $programList['patientId'] =$savedPatientId;
            $programList['programmeCount'] = $postedData['patientsProgramCount'];
            $programmeDB = new ProgrammeDB();
            $programmeResponse = $programmeDB->createUpdatePatientsProgramme($programList);

          }
          */

          /*
          $moreInfoXMLArray = array();
          $moreInfoXMLArray['doctorId'] = $user->id;
          $moreInfoXMLArray['programmeListCount'] = 3;
          $moreInfoXMLArray['medicalProgrammeId'] = 1;

          $moreInfoXMLArray['programmeList'] = array();

          $moreInfoXMLArray['programmeList'] []  = array('id' => 1, 'dueOn' => '08-05-2016', 'givenOn' => '04-05-2016', 'batchNo' => '4132' );
          $moreInfoXMLArray['programmeList'] []  = array('id' => 2, 'dueOn' => '09-05-2016', 'givenOn' => '04-05-2016', 'batchNo' => '4523452' );
          $moreInfoXMLArray['programmeList'] []  = array('id' => 3, 'dueOn' => '10-05-2016', 'givenOn' => '04-05-2016', 'batchNo' => '4134536532' );
    */


          /*
          $programmeList =  $postedData['programmeLists'];
          $programmeList['doctorId'] = $user->id;
          $programmeList['patientId'] =$savedPatientId;
          $programmeList['programmeCount'] = $postedData['programmeCount'];
          $programmeDB = new ProgrammeDB();
          $programmeResponse = $programmeDB->createUpdatePatientsProgramme($programmeList);

          return $response->withJson($programmeResponse);
          */

      } else {
        $data = array('status' => "2", 'data' => "", 'message' => 'need to be logged in for this operation' );
        return $response->withJson($data);
      }


      } catch (Exception $e) {
        $data = array('status' => "-1", 'data' => "-1", 'message' => 'exceptoin in main' . $e->getMessage());
        return $response->withJson($data);
      }

    });

    $this->get('/getPatientDetails', function ($request, $response) {
      try {

          $allGetVars = $request->getQueryParams();

          if(isset($allGetVars['id'])){

            $patientDB = new PatientDB();

            $patient = $patientDB->getPatientDetails($allGetVars['id']);
            $guardian = $patientDB->getGuardianDetails($allGetVars['id']);
            //$birthDetails = $patientDB->getBirthDetails($allGetVars['id']);
            $patientsPrograme = $patientDB->getPatientsProgramme($allGetVars['id']);



            $resultArray = array('patient' => $patient,
                                 'guardian' => $guardian,
                                 //'birthDetails' => $birthDetails,
                                 'programmeLists' => $patientsPrograme);

            $data = array('status' => 1, 'data' => $resultArray, 'message' => 'success');

            return $response->withJson($data);

          }

      } catch (Exception $e) {
          $data = array('status' => "-1", 'data' => "-1", 'message' => 'exceptoin in main' . $e->getMessage());
          return $response->withJson($data);
      }

    });


});
