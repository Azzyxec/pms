<?php

use Pms\Entities\User;
use Pms\Entities\UserSessionManager;
use Pms\Datalayer\ScheduleDB;

$app->group('/schedule', function(){

  // schedule functions
  $this->post('/createUpdateSchedule', function ($request, $response) {

    $postedData = $request->getParsedBody();
    return $response->withJson($postedData);

    $user = UserSessionManager::getUser();

    if($user->id != "-1"){

      $postedData = $request->getParsedBody();

      $scheduleDB = new ScheduleDB();
      $arrayCopy = $postedData;
      $arrayCopy['userId'] =  $user->id;
      $resultArray = $scheduleDB->persistSchedule($arrayCopy);

      return $response->withJson($resultArray);

    }else{

      $data = array('status' => "-1", 'data' => "-1", 'message' => 'exception' );
      return $response->withJson($data);

    }
  });

  $this->get('/getScheduleList', function ($request, $response) {

    try {

      $user = UserSessionManager::getUser();

      if($user->id != "-1"){

        $scheduleDB = new ScheduleDB();

        $scheduleResponse = $scheduleDB->getScheduleList($user->id);

        return $response->withJson($scheduleResponse);

      }

    } catch (Exception $e) {
      $data = array('status' => "-1", 'data' => "-1", 'message' => 'exception' );
      return $response->withJson($data);
    }


  });

});
