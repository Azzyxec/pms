<?php

use Pms\Entities\User;
use Pms\Entities\UserSessionManager;

use Pms\Datalayer\UserDB;

$app->group('/authenticate', function(){

  $this->get('/login', function ($request, $response) {
      return $this->view->render($response, 'login.html', array('basePath' => AppConfig::$basePath));
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

       $data = array('data' => $user);
       return $response->withJson($data);

   }catch(Exception $e){

     $data = array('data' => $user);
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
