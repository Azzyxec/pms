<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \PDO;

require '.\vendor\autoload.php';


//specific to the application

//Core require needed for other to work
require_once __DIR__.'\AppConfig.php';
require_once __DIR__.'\datalayer\DBHelper.php';
use Pms\Datalayer\DBHelper;

//require once for entites
require_once __DIR__.'\entities\User.php';
require_once __DIR__.'\entities\Doctor.php';


//importing entites
use Pms\Entities\User;
use Pms\Entities\Doctor;



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


//BOC user management

class UserSessionManager{

  public static function getUser(){
    if(isset($_SESSION['user'])){
       $user = $_SESSION['user'];
       return $user;
     }else{
       $user = new User();
       $user->id = "-1";
       $user->type = "-1";
       $user->name = "-1";
       return $user;
     }
  }//getUser

  public static function setUser($user){
    if(isset($user)){
      $_SESSION['user'] = $user;
    }
  }

  public static function destroySession(){
    $_SESSION['user'] = null;
    session_destroy();
  }

}//UserSessionManager

$app->post('/isLoggedIn', function ($request, $response) {

   $user = UserSessionManager::getUser();
   $data = array('data' => $user);
   return $response->withJson($data);
});


$app->post('/authenitcateUser', function ($request, $response) {

  $user = new User();
  $user->id = "-1";
  $user->type = "-1";
  $user->name = "-1";

  try{

     $postedData = $request->getParsedBody();
     if( isset($postedData['loginId']) && isset($postedData['password']) ){

       $paramArray = array(
                            'plogin_id' => $postedData['loginId'],
                            'password' => $postedData['password']
                          );

       $statement = DBHelper::generateStatement('authenticate',  $paramArray);

       $statement->execute();

       while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {
         $user->id = $result['id'];
         $user->type = $result['type'];
         $user->name = $result['name'];
       }

       UserSessionManager::setUser($user);
     } else {
       UserSessionManager::destroySession();
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

//
$app->get('/getDoctorDetails', function ($request, $response) {

  $allGetVars = $request->getQueryParams();
  $docId = $allGetVars['id'];
  $paramArray = array('pid' => $docId);
  $statement = DBHelper::generateStatement('getDoctorInfo',  $paramArray);

  $statement->execute();
  $doc = new Doctor();
  $row = $statement->fetch();

  $doc->id = $docId;
  $doc->name = $row['name'];
  $doc->contact = $row['contact1'];
  $doc->alternateContact = $row['contact2'];
  $doc->email = $row['email'];
  $doc->qualifications = $row['qualification'];
  $doc->address = $row['address'];
  $doc->recoveryContact = $row['recovery_contact'];
  $doc->recoveryEmail = $row['recovery_email'];
  $doc->userName = $row['login_id'];
  $doc->password = $row['password'];
  $doc->isActive = $row['is_active'];


  $data = array('data' => $doc);
  return $response->withJson($data);

});

$app->post('/saveUpdateDoctor', function($request, $response){

  $user = new User();
  $user->id = "-1";
  $user->type = "-1";
  $user->name = "-1";

  $postedData = $request->getParsedBody();

  $paramArray = array(
                      'pid' => $postedData['id'],
                      'pname' =>  $postedData['name'],
                      'pcontact1' =>  $postedData['contact'],
                      'pcontact2' => $postedData['alternateContact'],
                      'pemail' =>  $postedData['email'],
                      'pqualification' => $postedData['qualifications'],
                      'paddress' => $postedData['address'],
                      'precovery_contact' =>  $postedData['recoveryContact'],
                      'precovery_email' => $postedData['recoveryEmail'],
                      'plogin_id' => $postedData['userName'],
                      'ppassword' => $postedData['password'],
                      'pis_active' =>  $postedData['isActive']
                    );

  $statement = DBHelper::generateStatement('add_update_doctor',  $paramArray);

  $statement->execute();

  $row = $statement->fetch();
  $status = $row['status'];

  if(strcmp($status, "1") == 0){
    $user = new User();
    $user->id = $row['id'];
    $user->type = $row['type'];
    $user->name = $row['name'];
    UserSessionManager::setUser($user);
  }

  $data = array('data' => array('status' => $status, "user"=> $user));
  return $response->withJson($data);


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
