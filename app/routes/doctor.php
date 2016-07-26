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

    $user = UserSessionManager::getUser();
    if($user->type == 'D' && $doctor->id == 0){
      //if its a new entry then its new registration send mail confirming the registration

      try {

        $transport = Swift_MailTransport::newInstance();

        $message = Swift_Message::newInstance('Thank you for registering')
        ->setFrom(array(AppConfig::$accountSettings['fromEmail'] => AppConfig::$accountSettings['sendAs']))
        ->setTo(array($doctor->email))
        ->setBody('Thank you for registering with us, we will activate you account soon, if you have any queries please email us as at ' . AppConfig::$accountSettings['adminMail'] . ', once the account is active you can <a href="' . AppConfig::$accountSettings['loginLink'] .'">login</a> to use the application', 'text/html');

        $mailer = Swift_Mailer::newInstance($transport);


        // Send the message
        //TODO uncomment in production
        $mailResult = $mailer->send($message);

    } catch (Exception $e) {
      $mailResult = "mail could not be sent";
    }

  }else if($user->type == 'D' &&  $doctor->isActive == 1 && $doctor->id > 0){
    //if doctor is made active send mail

    try {

      $transport = Swift_MailTransport::newInstance();

      $message = Swift_Message::newInstance('Account activated')
      ->setFrom(array(AppConfig::$accountSettings['fromEmail'] => AppConfig::$accountSettings['sendAs']))
      ->setTo(array($doctor->email))
      ->setBody('Your account has been activated, you can login to your <a href="' . AppConfig::$accountSettings['loginLink'] .'">account</a> here', 'text/html');

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

  $this->post('/saveUpdateProductStock', function($request, $response){

    try {

      $status = 1;
      $message = "success";
      $user = UserSessionManager::getUser();

      if($user->id != -1){

        $postedData = $request->getParsedBody();


        $locationId = $postedData['locationId'];
        $productId = $postedData['id'];
        $productName = $postedData['name'];
        $productStock = $postedData['stock'];
        $operationType = $postedData['operationType']; // add substract

        $doctorDB = new DoctorDB();
        //return $response->withJson($postedData);

        $status = $doctorDB->addUpdateProductStock(
                                                    $user->doctorId,
                                                    $locationId,
                                                    $productId,
                                                    $productName,
                                                    $productStock,
                                                    $operationType,
                                                    $user->id,
                                                    $user->type
                                                  );

      }else{
        $status = -1;
        $message = "user needs to be logged in";
      }


      $data = array('status' => $status, 'data' => $postedData, 'message' => $message );
      return $response->withJson($data);


    } catch (Exception $e) {

      $data = array('status' => -1, 'data' => '', 'message' => $e->getMessage() );
      return $response->withJson($data);

    }




  });

  $this->get('/getProductList', function ($request, $response) {



    try {
      $productList = '';
      $message = "success";
      $status = 1;
      $user = UserSessionManager::getUser();

      if($user->id != -1){



        $allGetVars = $request->getQueryParams();

        $locationId = $allGetVars['locationId'];
        $doctorId = $user->doctorId;
        $doctorDB = new DoctorDB();

        $productList = $doctorDB->getAllProducts($locationId, $doctorId);


      }else{
        $message = "not Logged in";
        $status = -1;
      }
      $data = array('status' => $status,'data' => $productList,'message'=> $message);
      return $response->withJson($data);

    } catch (Exception $e) {
      $data = array('status' => -1,'data' => '','message'=> $e->getMessage());
      return $response->withJson($data);
    }

  });


});
