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


    //if its a new entry then its new registration send mail confirming the registration
    if($doctor->id == 0){



      try {

        $transport = Swift_MailTransport::newInstance();

        $message = Swift_Message::newInstance('Thank you for registering')
        ->setFrom(array(AppConfig::$registratoinSettings['fromEmail'] => AppConfig::$registratoinSettings['sendAs']))
        ->setTo(array($doctor->email))
        ->setBody('Thank you for registering with us, we will activate you account soon, if you have any queries please email us as at ' . AppConfig::$registratoinSettings['adminMail'] . ', once the account is active you can <a href="' . AppConfig::$registratoinSettings['loginLink'] .'">login</a>', 'text/html');

        $mailer = Swift_Mailer::newInstance($transport);


        // Send the message
        //TODO uncomment in production
        $mailResult = $mailer->send($message);

    } catch (Exception $e) {
      $mailResult = "mail could not be sent";
    }

    }


    //log the user in on succesful insert or update
    //if(strcmp($status, "1") == 0){
    //$user = $resultArray['data'];
    //UserSessionManager::setUser($user);
    //}

    $data = array('status' => $status, 'user' => $user);
    return $response->withJson($data);

  } catch (Exception $e) {
      $data = array('status' => $status, 'user' => '', 'message' => $e->getMessage() );
    return $response->withJson($data);
  }

});

});
