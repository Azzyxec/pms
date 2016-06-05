<?php

use Pms\Entities\User;
use Pms\Entities\UserSessionManager;

use Pms\Datalayer\UserDB;
use Pms\Datalayer\AuthenticateDB;

use \AppConfig;

$app->group('/authenticate', function(){

  $this->get('/login', function ($request, $response) {
    return $this->view->render($response, 'login.html', array('basePath' => AppConfig::$basePath));
  });

  $this->get('/passwordReset', function ($request, $response) {

    //check if reset code is valid, if valid then redirect to password reset page else inform that the reset link is no more valid
    //try going to forgor password and getting a new reset link, its quick and easy
    //$authenticateDB = new authenticateDB();

    //$isValid = $authenticateDB->isPaswordResetCodeValid();

    return $this->view->render($response, '/authenticate/password-reset.html', array('basePath' => AppConfig::$basePath));
  });

  $this->post('/passwordReset', function ($request, $response) {
    try {

      $user = new User();
      //$data = $request;

      $postedData = $request->getParsedBody();

      $resetCode = $postedData['resetCode'];
      $newPassword = $postedData['password'];

      $passwordHash = password_hash(
        $newPassword,
        AppConfig::$passwordHashSettings['algorithm'],
        AppConfig::$passwordHashSettings['settings']
      );

    if($passwordHash === false){
      throw new Exception("Password hash failed");
    }

    $authenticateDB = new AuthenticateDB();

    $result = $authenticateDB->resetPassword($resetCode, $passwordHash);

    if($result['status'] == 0){
      //log the user in and redirect from the page to dashboard
      $LoginTableId = $result['LoginTableId'];

      $user = $authenticateDB->getUserInfoForLogin($LoginTableId);

      UserSessionManager::setUser($user);

    }

    //data to send to client

    $data = array('status' => $result['status'], 'data' => $user, 'message' => 'success');
    return $response->withJson($data);
  } catch (Exception $e) {
    $data = array('status' => "-1", 'data' => '', 'message' => 'something is not right in controller' . $e->getMessage() );
    return $response->withJson($data);
  }
});

$this->get('/forgotPassword', function ($request, $response) {
  return $this->view->render($response, '/authenticate/forgot-password.html', array('basePath' => AppConfig::$basePath));
});

$this->post('/resetPasswordRequest', function ($request, $response) {
  try {

    $postedData = $request->getParsedBody();

    $loginId = $postedData['loginId'];

    $authenticateDB = new AuthenticateDB();

    $result = $authenticateDB->resetPasswordRequest($loginId);

    $sendData = array();
    $sendData['status'] = $result['status'];
    $sendData['email'] = $result['email'];

    $mailResult = "";

    if($result['status'] == 0){
      try {

        $email = $result['email'];
        $resetCode =  $result['resetCode'];

        $resetLink = AppConfig::$passwordResetConfig['resetLink']. $resetCode;

        // Create the Transport
        //$transport = Swift_SmtpTransport::newInstance('md-in-52.webhostbox.net', 465, 'ssl')
        $transport = Swift_MailTransport::newInstance();
        //->setUsername('noreply@dreamlogic.in')
        //->setPassword('Dreaml0g1c@mail');

        $message = Swift_Message::newInstance('Password reset link')
        ->setFrom(array(AppConfig::$passwordResetConfig['fromEmail'] => AppConfig::$passwordResetConfig['sendAs']))
        ->setTo(array($email))
        ->setBody('please click this <a href="' . $resetLink .'">link</a>  to reset your password or copy the following link in your browser ' . $resetLink, 'text/html');

        $mailer = Swift_Mailer::newInstance($transport);

        // Send the message
        //TODO uncomment in production
        $mailResult = $mailer->send($message);


        //$resetCode = $result['resetCode'];
        //send mail
      } catch (Exception $e) {
        $mailResult = "mail could not be sent";
      }
    }

    $data = array('status' => "1", 'data' => $sendData, 'message' => 'success');
    return $response->withJson($data);

  } catch (Exception $e) {
    $data = array('status' => "-1", 'data' => '', 'message' => 'something is not right in controller:' . $e->getMessage() );
    return $response->withJson($data);
  }

});

$this->post('/isLoggedIn', function ($request, $response) {

  $user = UserSessionManager::getUser();
  $data = array('data' => $user);
  return $response->withJson($data);
});

$this->post('/authenitcateUser', function ($request, $response) {

  $user = new User();

  try{


    $postedData = $request->getParsedBody();
    if( isset($postedData['loginId']) && isset($postedData['password']) ){

      $userDb = new UserDB();
      $user = $userDb->getUser($postedData['loginId']);

      $password = $postedData['password'];
      if(password_verify($password, $user->password) === false){
        $user = new User();
        throw new Exception("password does not match");
      }

      UserSessionManager::setUser($user);
    }

    $data = array('status' => "1", 'data' => $user, 'message' => 'success' );
    return $response->withJson($data);

  }catch(Exception $e){

    $data = array('status' => "-1", 'data' => $user, 'message' => 'something is not right in controller' . $e->getMessage() );
    return $response->withJson($data);
  }
});


$this->post('/logout', function($request, $response){
  UserSessionManager::destroySession();
  $data = array('data' => "1");
  return $response->withJson($data);
});

$this->get('/logout', function($request, $response){
  UserSessionManager::destroySession();
  return $this->view->render($response, 'login.html', array('basePath' => AppConfig::$basePath));
});

}); //authenticate group
