<?php

use Pms\Entities\User;
use Pms\Entities\UserSessionManager;

use Pms\Datalayer\UserDB;
use Pms\Datalayer\AuthenticateDB;

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

      $authenticateDB = new authenticateDB();

      $result = $authenticateDB->resetPassword($resetCode, $newPassword);

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

        $authenticateDB = new authenticateDB();

        $result = $authenticateDB->resetPasswordRequest($loginId);

        $sendData = array();
        $sendData['status'] = $result['status'];
        $sendData['email'] = $result['email'];

        if($result['status'] == 0){
          $email = $result['email'];

          //$resetCode = $result['resetCode'];
          //send mail
        }

        $data = array('status' => "1", 'data' => $sendData, 'message' => 'success');
        return $response->withJson($data);

      } catch (Exception $e) {
        $data = array('status' => "-1", 'data' => '', 'message' => 'something is not right in controller' . $e->getMessage() );
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
         $user = $userDb->getUser($postedData['loginId'],  $postedData['password']);

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
