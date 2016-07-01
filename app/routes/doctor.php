<?php

use Pms\Entities\User;
use Pms\Entities\Doctor;
use Pms\Entities\UserSessionManager;
use Pms\Datalayer\DoctorDB;

$app->group('/doctor', function(){

  //used for doctor registration
  $this->get('/doctorInfo', function ($request, $response) {
    return $this->view->render($response, '/doctor/doctor-registration.html', array('basePath' => AppConfig::$basePath));
  });

  // BOC Doctor management
  $this->get('/getDoctorDetails', function ($request, $response) {

    $doc = new Doctor();

    try {

      $allGetVars = $request->getQueryParams();

      if(isset($allGetVars['id'])){
        $doctorDB = new DoctorDB();
        $doc = $doctorDB->getDoctor($allGetVars['id']);
      }

      $data = array('data' => $doc);
      return $response->withJson($data);

    } catch (Exception $e) {
      $data = array('data' => $doc);
      return $response->withJson($data);
    }

  });



  $this->post('/saveUpdateDoctor', function($request, $response){

    $doctor = new Doctor();
    $user = new User();
    $status = -2;



    $postedData = $request->getParsedBody();
    $doctor = Doctor::getInsanceFromArray($postedData);

    try {

      //hash password
      if($doctor->password != ''){

        $passwordHash = password_hash(
          $doctor->password,
          AppConfig::$passwordHashSettings['algorithm'],
          AppConfig::$passwordHashSettings['settings']
        );

        $doctor->password = $passwordHash;


        if($passwordHash === false){
          throw new Exception("Password hash failed");
        }

      }

    $doctorDB = new DoctorDB();

    $resultArray = $doctorDB->persistDoctor($doctor);

    $status = $resultArray['status'];

    //log the user in on succesful insert or update
    //if(strcmp($status, "1") == 0){
    //$user = $resultArray['data'];
    //UserSessionManager::setUser($user);
    //}

    $data = array('status' => $status, 'data' => '');
    return $response->withJson($data);

  } catch (Exception $e) {
      $data = array('status' => $status, 'data' => '');
    return $response->withJson($data);
  }

});

});
