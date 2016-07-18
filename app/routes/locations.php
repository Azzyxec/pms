<?php

use Pms\Entities\User;
use Pms\Entities\UserSessionManager;
use Pms\Datalayer\DoctorDB;

$app->group('/locations', function(){

  $this->post('/addUpdateLocation', function ($request, $response) {
    try {

      $postedData = $request->getParsedBody();
        $user = UserSessionManager::getUser();
        $doctorDB = new DoctorDB();
        $data = $doctorDB->saveUpdateLoction($postedData['id'], $postedData['name'], $user->id);

      $data = array('status' => "1", 'data' => "1", 'message' => 'success' );
      return $response->withJson($data);

    } catch (Exception $e) {
      $data = array('status' => "-1", 'data' => "-1", 'message' => 'exception in controller' );
      return $response->withJson($data);
    }

  });

  $this->post('/deactivateLocation', function ($request, $response) {
    try {

       $postedData = $request->getParsedBody();
        $user = UserSessionManager::getUser();
        $doctorDB = new DoctorDB();
        $data = $doctorDB->deactivateLoction($postedData['id']);

      $data = array('status' => "1", 'data' => "1", 'message' => 'success' );

      return $response->withJson($data);

    } catch (Exception $e) {
      $data = array('status' => "-1", 'data' => "-1", 'message' => 'exception in controller' );
      return $response->withJson($data);
    }

  });


  $this->get('/getDoctorLocations', function ($request, $response) {
    try {

      $user = UserSessionManager::getUser();
      $doctorDB = new DoctorDB();
      $data = $doctorDB->getAllLocations($user->doctorId);

      $data = array('status' => "1", 'data' => $data['data'], 'message' => 'success' );
      return $response->withJson($data);

    } catch (Exception $e) {
      $data = array('status' => "-1", 'data' => "-1", 'message' => 'exception in controller' );
      return $response->withJson($data);
    }

  });

});
