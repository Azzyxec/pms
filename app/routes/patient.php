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
    $data = array('status' => "-1", 'data' => "-1", 'message' => 'exception in controller' );
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
          $resultArray = $patientDB->getPatienList($user->id);

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


    $this->get('/addUpdatePatient', function ($request, $response) {
      try {

        /*
          $postedData = $request->getParsedBody();

          $data = array('status' => "1", 'data' => $postedData, 'message' => 'test' );
          return $response->withJson($data);
       */

        $user = UserSessionManager::getUser();

        if($user->id != "-1"){
          //need to check for the user type too

          $postedData = $request->getParsedBody();
          //$patient = Patient::getInsanceFromArray($postedData['patient']);


          //save patient section
          $patient = new Patient();
          $patient->id = 66;
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
          $patient->isGuardian = 0;
          $patient->guardianId = null;

          //settign the gurdain details
          $guardian =  new Patient();


          $patientDB = new PatientDB();
          $savePatientResponse = $patientDB->saveUpdatePatientInfo($patient, $guardian, $user->id);
          $savedPatientId =   $savePatientResponse['data']['patientId'];

          //save birth info section

          $birthDetails = new BirthDetails();
          $birthDetails->patientId = $savedPatientId;
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

          $saveBirthInfoResponse = $patientDB->saveUpdateBirthDetails($birthDetails, $user->id, $user->type);

          $data = array('patient info' => $patient, 'birth info' => $birthDetails );
          return $response->withJson($data);


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
        $data = array('status' => "2", 'data' => "", 'message' => 'need to be logged in for this oeration' );
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

            $result = $patientDB->getPatientDetails($allGetVars['id']);

            return $response->withJson($result);

          }

      } catch (Exception $e) {
          $data = array('status' => "-1", 'data' => "-1", 'message' => 'exceptoin in main' . $e->getMessage());
          return $response->withJson($data);
      }

    });


});
