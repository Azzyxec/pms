<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \PDO;

require '../pms/vendor/autoload.php';
require_once __DIR__.'/AppConfig.php';


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

//database function
function getConnection() {

   $dns = 'mysql:host='.AppConfig::$dbhost.';dbname='.AppConfig::$dbname.';port='. AppConfig::$port ;
   $pdo = new PDO($dns, AppConfig::$dbuser, AppConfig::$dbpass);
   $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   return $pdo;

}

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

class User {
  public $id;
  public $type;
  public $name;
}

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

  /*
   $postedData = $request->getParsedBody();

   $loginId = $postedData['loginId'];
   $password = $postedData['password'];

   $user = new User();
   $user->id = "-1";
   $user->type = $loginId;
   $user->name = $password;

    $data = array('data' => $user);
    return $response->withJson($data);
    */

  $user = new User();
  $user->id = "-1";
  $user->type = "-1";
  $user->name = "-1";

  try{

    //$allGetVars = $request->getQueryParams();
    //$loginId = $allGetVars['loginId'];
    //$password = $allGetVars['password'];

     $postedData = $request->getParsedBody();
     if( isset($postedData['loginId']) && isset($postedData['password']) ){
       $loginId = $postedData['loginId'];
       $password = $postedData['password'];

       $pdo = getConnection();

       $sql = 'call authenticate(:plogin_id, :ppassword)';

       $statement = $pdo->prepare($sql);

       $statement->bindValue(':plogin_id' , $loginId, PDO::PARAM_STR);
       $statement->bindValue(':ppassword' , $password, PDO::PARAM_STR );

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
     //$data = array('data' => $user);

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

class Doctor{
  public $id;
  public $name;
  public $contact;
  public $alternateContact;
  public $email;
  public $qualifications;
  public $address;
  public $recoveryContact;
  public $recoveryEmail;
  public $userName;
  public $password;
  public $isActive;
}

//
$app->get('/getDoctorDetails', function ($request, $response) {

  $allGetVars = $request->getQueryParams();
  $docId = $allGetVars['id'];

  $pdo = getConnection();

  $sql = 'call getDoctorInfo(:pid)';
  $statement = $pdo->prepare($sql);
  $statement->bindValue(':pid', $docId);
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

  $pdo = getConnection();

  $sql = 'call add_update_doctor(:pid, :pname, :pcontact1,:pcontact2, :pemail, :pqualification , :paddress , :precovery_contact , :precovery_email,:plogin_id, :ppassword, :pis_active)';

  $statement = $pdo->prepare($sql);

  $statement->bindValue(':pid' , $postedData['id'], PDO::PARAM_INT);
  $statement->bindValue(':pname' , $postedData['name'], PDO::PARAM_STR );
  $statement->bindValue(':pcontact1' , $postedData['contact'], PDO::PARAM_STR);
  $statement->bindValue(':pcontact2', $postedData['alternateContact'], PDO::PARAM_STR);
  $statement->bindValue(':pemail', $postedData['email'], PDO::PARAM_STR);
  $statement->bindValue(':pqualification', $postedData['qualifications'], PDO::PARAM_STR);
  $statement->bindValue(':paddress', $postedData['address'], PDO::PARAM_STR);
  $statement->bindValue(':precovery_contact', $postedData['recoveryContact'], PDO::PARAM_STR);
  $statement->bindValue(':precovery_email', $postedData['recoveryEmail'], PDO::PARAM_STR);
  $statement->bindValue(':plogin_id', $postedData['userName'], PDO::PARAM_STR);
  $statement->bindValue(':ppassword', $postedData['password'], PDO::PARAM_STR);
  $statement->bindValue(':pis_active', $postedData['isActive'], PDO::PARAM_INT);

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

  $pdo = getConnection();
  $sql = 'call create_modify_schedule(:pdoctor_id, :pstart_date, :pend_date, :pschedule_count, :plocation_count, :pschedule_xml)';
  $statement = $pdo->prepare($sql);
  $statement->bindValue(':pdoctor_id', $docId);
  $statement->bindValue(':pstart_date', $startDate);
  $statement->bindValue(':pend_date', $endDate);
  $statement->bindValue(':pschedule_count', $scheduleCount);
  $statement->bindValue(':plocation_count', $locationCount, PDO::PARAM_INT);
  $statement->bindValue(':pschedule_xml', $scheduleXML);
  $statement->execute();

  $resArray = array();
  while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {
      $resArray['schedule'] = $result['schedule'];
  }


  $data = array('data'=>$resArray);


    //$data = array('data' => 'ola');
    //$response = $response->withHeader('Content-type', 'text/text');
    //return $response->write($scheduleXML);

  //$data = array('data'=>$postedLocationJson);
  return $response->withJson($data);


  }else{

    $data = array('data'=> '-1');
    return $response->withJson($data);

  }



  /*
  $schedule = '{
    "scheduleCount":"2",
    "schedule":[
              {
              "date": "12-04-2016",
              "timeSlots":{
                            "locationId": "1",
                            "startTime":"123",
                            "endTime":"456"
                          }
              },
              {
              "date": "11-05-2016",
              "timeSlots":{
                            "locationId": "2",
                            "startTime":"123",
                            "endTime":"456"
                          }
              }
            ]
  }';

  $scheduleArray = json_decode($schedule, true);

  $xml_data = new SimpleXMLElement('<?xml version="1.0"?><schedules></schedules>');
  array_to_xml($scheduleArray, $xml_data);


  $startDate = "10-04-2016";
  $endDate = "11-05-2016";
  $docId = 1;
  $scheduleXML = $xml_data->asXML();

  $pdo = getConnection();
  $sql = 'call create_update_schedule(:pdoctor_id, :pstart_date, :pend_date, :pschedule_xml)';
  $statement = $pdo->prepare($sql);
  $statement->bindValue(':pdoctor_id', $docId);
  $statement->bindValue(':pstart_date', $startDate);
  $statement->bindValue(':pend_date', $endDate);
  $statement->bindValue(':pschedule_xml', $scheduleXML);
  $statement->execute();

  $resArray = array();
  while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {
      $resArray['schedule'] = $result['schedule'];
  }


  $data = array('data'=>$resArray);
  return $response->withJson($data);

  //$data = array('data' => 'ola');
  //$response = $response->withHeader('Content-type', 'text/text');
  //return $response->write($scheduleXML);

  */
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
