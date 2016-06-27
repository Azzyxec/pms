<?php

use Pms\Entities\User;
use Pms\Entities\Doctor;
use Pms\Entities\UserSessionManager;
use Pms\Datalayer\DoctorDB;

$app->group('/doctor', function(){

  //used for doctor registration
  $this->get('/doctorInfo', function ($request, $response) {
    return $this->view->render($response, '/doctor/doctor-registration.html', array('basePath' => AppConfig::$basePath));
  })->add('Pms\Middleware\AuthenticateMiddleware:redirectNonLogin');

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

    try {

      $postedData = $request->getParsedBody();
      $doctor = Doctor::getInsanceFromArray($postedData);

      //hash password

      $passwordHash = password_hash(
        $doctor->password,
        AppConfig::$passwordHashSettings['algorithm'],
        AppConfig::$passwordHashSettings['settings']
      );

    if($passwordHash === false){
      throw new Exception("Password hash failed");
    }

    $doctor->password = $passwordHash;

    $doctorDB = new DoctorDB();

    $resultArray = $doctorDB->persistDoctor($doctor);

    $status = $resultArray['status'];

    //log the user in on succesful insert or update
    //if(strcmp($status, "1") == 0){
    //$user = $resultArray['data'];
    //UserSessionManager::setUser($user);
    //}

    $data = array('data' => array('status' => $status, "user"=> $user));
    return $response->withJson($data);

  } catch (Exception $e) {
    $data = array('data' => array('status' => $status, "user"=> $user));
    return $response->withJson($data);
  }

});

});
