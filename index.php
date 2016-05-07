<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \PDO;

require '.\vendor\autoload.php';


//specific to the application

//Core require needed for other to work
require_once __DIR__.'\AppConfig.php';


//loading datalayer files
require_once __DIR__.'\datalayer\DBHelper.php';
require_once __DIR__.'\datalayer\UserDB.php';
require_once __DIR__.'\datalayer\DoctorDB.php';
require_once __DIR__.'\datalayer\ScheduleDB.php';

use Pms\Datalayer\DBHelper;
use Pms\Datalayer\UserDB;
use Pms\Datalayer\DoctorDB;
use Pms\Datalayer\ScheduleDB;

//require once for entites
require_once __DIR__.'\entities\User.php';
require_once __DIR__.'\entities\Doctor.php';
require_once __DIR__.'\entities\UserSessionManager.php';


//importing entites
use Pms\Entities\User;
use Pms\Entities\Doctor;
use Pms\Entities\UserSessionManager;


$configuration = [
    'settings' => [
        'displayErrorDetails' => AppConfig::$displayErrorDetails,
    ],
];

// initilizing and setting the container

$container = new \Slim\Container($configuration);

//Override the default Not Found Handler
$container['notFoundHandler'] = function ($container) {
    return function ($request, $response) use ($container) {
        return $container['response']
            ->withStatus(404)
            ->withHeader('Content-Type', 'text/html')
            ->write("<html><body><p>Opps, it's not allowed, please go to the main page <a href='/pms/'>Login page</a></p></body></html>");
    };
};


//to make use of default session
session_cache_limiter(false);
session_start();

// Create and configure Slim app
$app = new \Slim\App($container);


$container = $app->getContainer();

// Register component on container
$container['view'] = function ($container) {
  //$view = new \Slim\Views\Twig($templatePath, ['cache' => $templatePath ]);
  $view = new \Slim\Views\Twig(AppConfig::$templatePath, []);  //cache can be added later
    $view->addExtension(new \Slim\Views\TwigExtension(
        $container['router'],
        $container['request']->getUri()
    ));

    return $view;
};

//end of database section

//default route
$app->get('/', function ($request, $response) {
    return $this->view->render($response, 'login.html');
});


$app->get('/login', function ($request, $response) {
    return $this->view->render($response, 'login.html');
});

$app->get('/doctorInfo', function ($request, $response) {
    return $this->view->render($response, '/doctor/doctor-registration.html');
});

$app->get('/scheduleManagement', function ($request, $response) {
    return $this->view->render($response, '/doctor/schedule.html');
});
$app->get('/createProgramForPatient', function ($request, $response) {
    return $this->view->render($response, '/programs/create-program.html');
});


$app->get('/doctorDashboard', function ($request, $response) {
    return $this->view->render($response, '/doctor/dash-home.html');
});

$app->get('/doctorProfile', function ($request, $response) {
    return $this->view->render($response, '/doctor/doctor-profile.html');
});

$app->get('/bookAppointment', function ($request, $response) {
    return $this->view->render($response, '/appointment/book-appointment.html');
});

$app->get('/listAppointment', function ($request, $response) {
    return $this->view->render($response, '/appointment/list-appointment.html');
});

$app->get('/closeAppointment', function ($request, $response) {
    return $this->view->render($response, '/appointment/close-appointment.html');
});

$app->get('/newSchedule', function ($request, $response) {
    return $this->view->render($response, '/schedule/new-schedule.html');
});

$app->get('/scheduleList', function ($request, $response) {
    return $this->view->render($response, '/schedule/schedule-list.html');
});

$app->get('/patientsEntry', function ($request, $response) {
    return $this->view->render($response, '/patient/patient-entry.html');
});


$app->get('/staffEntry', function ($request, $response) {
    return $this->view->render($response, '/staffManage/add-staff.html');
});

$app->get('/patientHistory', function ($request, $response) {
    return $this->view->render($response, '/patient/patient-history.html');
});



$app->post('/isLoggedIn', function ($request, $response) {

   $user = UserSessionManager::getUser();
   $data = array('data' => $user);
   return $response->withJson($data);
});

$app->post('/authenitcateUser', function ($request, $response) {

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


$app->post('/logout', function($request, $response){
    UserSessionManager::destroySession();
    $data = array('data' => "1");
    return $response->withJson($data);
});

$app->get('/logout', function($request, $response){
    UserSessionManager::destroySession();
    return $this->view->render($response, 'login.html');
});

//EOC user management

// BOC Doctor management
$app->get('/getDoctorDetails', function ($request, $response) {

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

$app->post('/saveUpdateDoctor', function($request, $response){

  $doctor = new Doctor();
  $user = new User();
  $status = -2;

  try {

    $postedData = $request->getParsedBody();
    $doctor = Doctor::getInsanceFromArray($postedData);

    $doctorDB = new DoctorDB();
    $resultArray = $doctorDB->persistDoctor($doctor);

    $status = $resultArray['status'];

    //log the user in on succesful insert or update
    if(strcmp($status, "1") == 0){
      $user = $resultArray['data'];
      UserSessionManager::setUser($user);
    }

    $data = array('data' => array('status' => $status, "user"=> $user));
    return $response->withJson($data);

  } catch (Exception $e) {
    $data = array('data' => array('status' => $status, "user"=> $user));
    return $response->withJson($data);
  }

});

//EOC Doctor Management

//BOC Schedule Management

$app->post('/createUpdateSchedule', function ($request, $response) {


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

$app->get('/getScheduleList', function ($request, $response) {

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

//EOC Schedule Management

// Run app
$app->run();
