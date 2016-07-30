<?php

require '../vendor/autoload.php';


//Core require needed for other to work
require_once '../AppConfig.php';

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

use Pms\Middleware\AuthenticateMiddleware;

date_default_timezone_set(AppConfig::$timezone);

//importing entites
//use Pms\Entities\UserSessionManager;
//use Pms\Entities\Patient;
//use Pms\Entities\bookAppointmentObject;

//use Pms\Datalayer\UserDB;
//use Pms\Datalayer\DoctorDB;
//use Pms\Datalayer\ScheduleDB;
//use Pms\Datalayer\PatientDB;
//use Pms\Datalayer\ProgrammeDB;
//use Pms\Datalayer\bookAppointmentEntryDB;


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


$container['Pms\Middleware\AuthenticateMiddleware'] = function ($container) {
    return new AuthenticateMiddleware($container);
};

//Default route
$app->get('/', function ($request, $response) {

   //redirect to login page
   //$uri =  $this->getContainer()->get('router')->pathFor('loginPage');
   //return $response->write();
   return $response->withRedirect('index.php/authenticate/login');
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

require '../app/routes/appointment.php';
require '../app/routes/upload.php';

// Run app
$app->run();
