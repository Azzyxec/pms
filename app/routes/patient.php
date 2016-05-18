<?php

use Pms\Entities\User;
use Pms\Entities\Patient;
use Pms\Entities\UserSessionManager;
use Pms\Datalayer\PatientDB;
use Pms\Datalayer\ProgrammeDB;


$app->group('/patient', function(){



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


    $this->post('/addUpdatePatient', function ($request, $response) {
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
          $patient->isGuardian = 0;
          $patient->guardianId = null;

          //settign the gurdain details
          $guardian =  new Patient();

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
          $patientDB = new PatientDB();
          $callResponse = $patientDB->saveUpdatePatientInfo($patient, $guardian, $user->id);

          $programmeList =  $postedData['programmeLists'];
          $programmeList['doctorId'] = $user->id;
          $programmeList['patientId'] =  $callResponse['data']['patientId'];
          $programmeList['programmeCount'] = $postedData['programmeCount'];
          $programmeDB = new ProgrammeDB();
          $programmeResponse = $programmeDB->createUpdatePatientsProgramme($programmeList);

          return $response->withJson($programmeResponse);

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
