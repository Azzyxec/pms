<?php

require_once '../includes.php';

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

//importing entites
use Pms\Entities\UserSessionManager;
use Pms\Entities\Patient;
use Pms\Entities\bookAppointmentObject;

use Pms\Datalayer\UserDB;
use Pms\Datalayer\DoctorDB;
use Pms\Datalayer\ScheduleDB;
use Pms\Datalayer\PatientDB;
use Pms\Datalayer\ProgrammeDB;
use Pms\Datalayer\bookAppointmentEntryDB;


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
            ->write("<html><body><p>Opps, it's not allowed, please go to the main page <a href='/'>Login page</a></p></body></html>");
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

//Default route
$app->get('/', function ($request, $response) {
    return $this->view->render($response, 'login.html', array('basePath' => AppConfig::$basePath));
});

//requiring the routes, the routes are in group in the files below
require '../app/routes/authenticate.php';

require '../app/routes/adminDashboard.php';

require '../app/routes/doctorDashboard.php';

require '../app/routes/locations.php';

require '../app/routes/schedule.php';

require '../app/routes/patient.php';

require '../app/routes/programme.php';

require '../app/routes/doctor.php';

require '../app/routes/staff.php';

/*
$app->post('/saveBookPatientEntry', function ($request, $response) {
 try {
 $bookAppointmentFormData = json_decode($_POST['data']);



if (isset($bookAppointmentFormData))
    {



    //2016-01-22 -- Y-m-d  -- Asia/Calcutta
    $bookAppointmentDate = date_create_from_format('Y-m-d', $bookAppointmentFormData->bookAppointmentDate, new DateTimeZone('Asia/Calcutta'));



    $bookAppointmentObj = new bookAppointmentObject(
                            $bookAppointmentFormData->patientsName,
                            $bookAppointmentFormData->bookAppointmentTime,
                            $bookAppointmentDate->format('d-m-Y'),
                            $bookAppointmentFormData->contact,
                            $bookAppointmentFormData->description
                         );

    $bookAppoinmentDl = new bookAppointmentEntryDB();
    $res =  $bookAppoinmentDl->Persist($bookAppointmentObj);

    echo json_encode($bookAppointmentObj);
}
else{
    echo json_encode("form not posted");
}


  }  catch(PDOException $e){
                        die('Could not connect to the database:<br/>' . $e);
                        $dberror = "could not connect to database";
                        return "there was an error";
             }



});
*/

// Run app
$app->run();
