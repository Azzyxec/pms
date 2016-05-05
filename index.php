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


use Pms\Datalayer\DBHelper;
use Pms\Datalayer\UserDB;
use Pms\Datalayer\DoctorDB;


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
    return $this->view->render($response, '/doctor/doctor-info.html');
});

$app->get('/scheduleManagement', function ($request, $response) {
    return $this->view->render($response, '/doctor/schedule.html');
});


$app->get('/doctorDashboard', function ($request, $response) {
    return $this->view->render($response, '/doctor/doctor-dash.html');
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
  $startDate = $postedData['startDate'];
  $endDate = $postedData['endDate'];
  $docId = $user->id;
  $scheduleCount = $postedData['scheduleDaysCount'];
  $locationCount = $postedData['locationCount'];
  $postedLocationJson = $postedData['locationList'];

  $xml_data = new SimpleXMLElement('<?xml version="1.0"?><schedules></schedules>');
  array_to_xml($postedLocationJson, $xml_data);
  $scheduleXML = $xml_data->asXML();

  $paramArray = array(
                      'pdoctor_id' => $docId,
                      'pstart_date' =>  $startDate,
                      'pend_date' =>  $endDate,
                      'pschedule_count' => $scheduleCount,
                      'plocation_count' =>  $locationCount,
                      'pschedule_xml' => $scheduleXML
                    );

  $statement = DBHelper::generateStatement('create_modify_schedule',  $paramArray);

  $statement->execute();

  $resArray = array();
  while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {
      $resArray['schedule'] = $result['schedule'];
  }


  $data = array('data'=>$resArray);

  return $response->withJson($data);


  }else{

    $data = array('data'=> '-1');
    return $response->withJson($data);

  }
});

function array_to_xml( $data, &$xml_data ) {
    foreach( $data as $key => $value ) {
        if( is_array($value) ) {
            if( is_numeric($key) ){
                $key = 'item'; //dealing with <0/>..<n/> issues
            }
            $subnode = $xml_data->addChild($key);
            array_to_xml($value, $subnode);
        } else {
            $xml_data->addChild("$key",htmlspecialchars("$value"));
        }
     }
}


//EOC Schedule Management

// Run app
$app->run();
