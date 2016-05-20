<?php

use Pms\Entities\Staff;
use Pms\Entities\User;
use Pms\Entities\UserSessionManager;

use Pms\Datalayer\StaffDB;


$app->group('/staff', function(){

  $this->get('/getDoctorsStaffList', function ($request, $response) {
    try {

      $result = "";

      $user = UserSessionManager::getUser();

      if($user->type == "D" ){
        $doctorId = $user->id;

        $staffDB = new StaffDB();
        $result = $staffDB->getDoctorsStaffList($doctorId);

        $result = $result['data'];

      }

      $data = array('status' => "1", 'data' => $result, 'message' => "success" );
      return $response->withJson($data);

    } catch (Exception $e) {
      $data = array('status' => "-1", 'data' => "", 'message' => "exception in controller " . $e->getMessage() );
      return $response->withJson($data);
    }

  });

  $this->get('/getStaffDetails', function ($request, $response) {
    try {

      $result = "";

      $allGetVars = $request->getQueryParams();

      if(isset($allGetVars['id'])){

        $staffDB = new StaffDB();
        $result = $staffDB->getStaffDetails($allGetVars['id']);

        $result = $result['data'];

      }


      $data = array('status' => "1", 'data' => $result, 'message' => "success" );
      return $response->withJson($data);

    } catch (Exception $e) {
      $data = array('status' => "-1", 'data' => "", 'message' => "exception in controller " . $e->getMessage() );
      return $response->withJson($data);
    }
  });

  //used for doctor registration
  $this->post('/createModifyStaff', function ($request, $response) {
    try {

      $user = UserSessionManager::getUser();

      $doctorId = $user->doctorId;
      $loggedInUserId = $user->id;
      $loggedInUserType = $user->type;

      if($user->type == "D" ||
         $user->type == "S"){
        $doctorId = $user->doctorId;
      }else if($user->type == "A"){
        $doctorId = $postedData['doctorId'];
      }

      $postedData = $request->getParsedBody();

      $staff = Staff::getInsanceFromArray($postedData);

      $staffDB = new StaffDB();
      $result = $staffDB->creatUpdateStaff($staff, $doctorId, $loggedInUserId, $loggedInUserType);

      $data = array('status' => "1", 'data' => $result['data'], 'message' => "success" );
      return $response->withJson($data);

    } catch (Exception $e) {
      $data = array('status' => "-1", 'data' => "", 'message' => "exception in controller " . $e->getMessage() );
      return $response->withJson($data);
    }
  });

});
