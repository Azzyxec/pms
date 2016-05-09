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
require_once __DIR__.'\datalayer\PatientDB.php';
require_once __DIR__.'\datalayer\ProgrammeDB.php';

use Pms\Datalayer\DBHelper;
use Pms\Datalayer\UserDB;
use Pms\Datalayer\DoctorDB;
use Pms\Datalayer\ScheduleDB;
use Pms\Datalayer\PatientDB;
use Pms\Datalayer\ProgrammeDB;


//require once for entites
require_once __DIR__.'\entities\User.php';
require_once __DIR__.'\entities\Doctor.php';
require_once __DIR__.'\entities\UserSessionManager.php';
require_once __DIR__.'\entities\Patient.php';


//importing entites
use Pms\Entities\User;
use Pms\Entities\Doctor;
use Pms\Entities\UserSessionManager;
use Pms\Entities\Patient;

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

//BOC Patient Management

$app->post('/addUpdatePatient', function ($request, $response) {
  try {

    /*
    $postedData = $request->getParsedBody();

    $data = array('status' => "1", 'data' => $postedData, 'message' => 'test' );
    return $response->withJson($data);
*/



    $user = UserSessionManager::getUser();

    if($user->id != "-1"){
      //need to check for the user type too

      $postedData = $request->getParsedBody();
      $patient = Patient::getInsanceFromArray($postedData);

      /*
      $patient =  new Patient();
      $patient->id = 0;
      $patient->name = "Travolda";
      $patient->dateOfBirth = "01-04-2016";
      $patient->bloodGroup = "AB+";
      $patient->weight = "2 kgs";
      $patient->height = "20 cms";
      $patient->gender = 1;
      $patient->contact1 = "14242341";
      $patient->contact2 = "12412341";
      //$patient->email = "revolution@singing.com";
      $patient->address = "Kanas";
      $patient->picturePath = "2.jpg";
      $patient->isGuardian = 0;
      $patient->guardianId = null;
      */

      //settign the gurdain details
      $guardian =  new Patient();


      $moreInfoXMLArray = array();
      $moreInfoXMLArray['doctorId'] = $user->id;
      $moreInfoXMLArray['programmeListCount'] = 3;
      $moreInfoXMLArray['medicalProgrammeId'] = 1;

      $moreInfoXMLArray['programmeList'] = array();

      $moreInfoXMLArray['programmeList'] []  = array('id' => 1, 'dueOn' => '08-05-2016', 'givenOn' => '04-05-2016', 'batchNo' => '4132' );
      $moreInfoXMLArray['programmeList'] []  = array('id' => 2, 'dueOn' => '09-05-2016', 'givenOn' => '04-05-2016', 'batchNo' => '4523452' );
      $moreInfoXMLArray['programmeList'] []  = array('id' => 3, 'dueOn' => '10-05-2016', 'givenOn' => '04-05-2016', 'batchNo' => '4134536532' );

      $patientDB = new PatientDB();
      $callResponse = $patientDB->saveUpdatePatientInfo($patient, $guardian, $moreInfoXMLArray);

      return $response->withJson($callResponse);

  } else {
    $data = array('status' => "2", 'data' => "", 'message' => 'need to be logged in for this oeration' );
    return $response->withJson($data);
  }



  } catch (Exception $e) {
    $data = array('status' => "-1", 'data' => "-1", 'message' => 'exceptoin in main' . $e->getMessage());
    return $response->withJson($data);
  }

});

$app->get('/getPatientDetails', function ($request, $response) {
  try {

      $allGetVars = $request->getQueryParams();

      if(isset($allGetVars['id'])){

        $patientDB = new PatientDB();

        $result = $patientDB->getPatientDetails($allGetVars['id']);

        return $response->withJson($result);

      }

  } catch (Exception $e) {
      $data = array('status' => "-1", 'data' => "-1", 'message' => 'exceptoin in main' . $e->getMessage());
      return $response->withJson($data);
  }

});

$app->get('/getMedicationProgrammeList', function ($request, $response) {
  try {

      $allGetVars = $request->getQueryParams();

      if(isset($allGetVars['id'])){

        $programmeDB = new ProgrammeDB();
        $result = $programmeDB->getMedicationProgrammeList($allGetVars['id']);
        return $response->withJson($result);

      }

  } catch (Exception $e) {
      $data = array('status' => "-1", 'data' => "-1", 'message' => 'exceptoin in main' . $e->getMessage());
      return $response->withJson($data);
  }

});

//EOC end of patient Management

// Run app
$app->run();
