<?php
use Pms\Entities\UserSessionManager;

$app->group('/doctorDashboard', function(){

  //doctor profile change

  $this->get('/doctorProfile', function ($request, $response) {
    $user = UserSessionManager::getUser();

    $viewData = array('basePath' => AppConfig::$basePath,
                      'name' => $user->name,
                      'userType' => $user->type);

    return $this->view->render($response, '/doctor/doctor-profile.html', $viewData);

  });

  //dash home
  $this->get('/', function ($request, $response) {

    $user = UserSessionManager::getUser();
    $viewData = array('basePath' => AppConfig::$basePath,
                      'active' => "dashboard",
                      'name' => $user->name,
                      'userType' => $user->type);

    return $this->view->render($response, '/doctor/dash-home.html',  $viewData);
  })->setName('dashboardHome');

  //schedule
  $this->get('/scheduleManagement', function ($request, $response) {

    $user = UserSessionManager::getUser();
    $viewData = array('basePath' => AppConfig::$basePath,
                      'active' => "schedule",
                      'name' => $user->name,
                      'userType' => $user->type);
    return $this->view->render($response, '/doctor/schedule.html', $viewData);

  });

  $this->get('/newSchedule', function ($request, $response) {
    $user = UserSessionManager::getUser();
    $viewData = array('basePath' => AppConfig::$basePath,
                      'active' => "schedule",
                      'name' => $user->name,
                      'userType' => $user->type);
    return $this->view->render($response, '/schedule/new-schedule.html', $viewData);
  });

  $this->get('/ScheduleCalenderView', function ($request, $response) {
    $user = UserSessionManager::getUser();
    $viewData = array('basePath' => AppConfig::$basePath,
                      'active' => "schedule",
                      'name' => $user->name,
                      'userType' => $user->type);
    return $this->view->render($response, '/schedule/schedule-calendar.html', $viewData);
  });

  $this->get('/scheduleList', function ($request, $response) {
    $user = UserSessionManager::getUser();
    $viewData = array('basePath' => AppConfig::$basePath,
                      'active' => "schedule",
                      'name' => $user->name,
                      'userType' => $user->type);
    return $this->view->render($response, '/schedule/schedule-list.html', $viewData);

  });


  //patient
  $this->get('/patientsEntry', function ($request, $response) {
    $user = UserSessionManager::getUser();
    $viewData = array('basePath' => AppConfig::$basePath,
                      'active' => "patient",
                      'name' => $user->name,
                      'userType' => $user->type);
    return $this->view->render($response, '/patient/patient-entry.html', $viewData);
  });

  $this->get('/patientHistory', function ($request, $response) {
    $user = UserSessionManager::getUser();
    $viewData = array('basePath' => AppConfig::$basePath,
                      'active' => "patient",
                      'name' => $user->name,
                      'userType' => $user->type);
    return $this->view->render($response, '/patient/patient-history.html', $viewData);

  });


  $this->get('/patientsListing', function ($request, $response) {
    $user = UserSessionManager::getUser();
    $viewData = array('basePath' => AppConfig::$basePath,
                      'name' => $user->name,
                      'userType' => $user->type);
    return $this->view->render($response, '/patient/patient-listing.html', $viewData);
  });


  //BOC Appointment Management
  $this->get('/bookAppointment', function ($request, $response) {
    $user = UserSessionManager::getUser();
    $viewData = array('basePath' => AppConfig::$basePath,
                      'active' => "appointment",
                      'name' => $user->name,
                      'userType' => $user->type);
    return $this->view->render($response, '/appointment/book-appointment.html', $viewData);
  });

  $this->get('/listAppointment', function ($request, $response) {

    $user = UserSessionManager::getUser();
    $viewData = array('basePath' => AppConfig::$basePath,
                      'active' => "appointment",
                      'name' => $user->name,
                      'userType' => $user->type);
    return $this->view->render($response, '/appointment/list-appointment.html', $viewData);

  });

  $this->get('/closeAppointment', function ($request, $response) {

    $user = UserSessionManager::getUser();
    $viewData = array('basePath' => AppConfig::$basePath,
                      'active' => "appointment",
                      'name' => $user->name,
                      'userType' => $user->type);
    return $this->view->render($response, '/appointment/close-appointment.html', $viewData);

  });
  //EOC Appointment management


  //Medical programme

  $this->get('/createMedicalProgram', function ($request, $response) {
    $user = UserSessionManager::getUser();
    $viewData = array('basePath' => AppConfig::$basePath,
                      'active' => "programme",
                      'name' => $user->name,
                      'userType' => $user->type);
    return $this->view->render($response, '/programs/create-program.html', $viewData);
  });

  $this->get('/programmeList', function ($request, $response) {

    $user = UserSessionManager::getUser();
    $viewData = array('basePath' => AppConfig::$basePath,
                      'active' => "programme",
                      'name' => $user->name,
                      'userType' => $user->type);
    return $this->view->render($response, '/programs/programme-listing.html', $viewData);

  });

  //staff management

  $this->get('/staffEntry', function ($request, $response) {
    $user = UserSessionManager::getUser();
    $viewData =   array('basePath' => AppConfig::$basePath,
                        'active' => "staff",
                        'showActiveContol' => true,
                        'name' => $user->name,
                        'userType' => $user->type);
    return $this->view->render($response, '/staff/add-staff.html', $viewData);
  });


  $this->get('/staffListing', function ($request, $response) {
    $user = UserSessionManager::getUser();
    $viewData = array('basePath' => AppConfig::$basePath,
                      'active' => "staff",
                      'name' => $user->name,
                      'userType' => $user->type);
    return $this->view->render($response, '/staff/staff-listing.html', $viewData);
  });

  //location management
  $this->get('/workLocationManagement', function ($request, $response) {
    $user = UserSessionManager::getUser();
    $viewData = array('basePath' => AppConfig::$basePath,
                      'active' => "others",
                      'name' => $user->name,
                      'userType' => $user->type);
    return $this->view->render($response, '/doctor/manage-locations.html', $viewData);
  });
  //Analytics reporting
  $this->get('/AnalyticsReport', function ($request, $response) {
    $user = UserSessionManager::getUser();
    $viewData = array('basePath' => AppConfig::$basePath,
                      'active' => "analytics",
                      'name' => $user->name,
                      'userType' => $user->type);
    return $this->view->render($response, '/doctor/analytics.html', $viewData);
  });


  $this->get('/accounting', function ($request, $response) {
    $user = UserSessionManager::getUser();
    $viewData = array('basePath' => AppConfig::$basePath,
                      'active' => "accounting",
                      'name' => $user->name,
                      'userType' => $user->type);
    return $this->view->render($response, '/doctor/accounting.html', $viewData);
  });


  $this->get('/medicineSearch', function ($request, $response) {
    $user = UserSessionManager::getUser();
    $viewData =   array('basePath' => AppConfig::$basePath,
                        'active' => "medicine",
                        'name' => $user->name,
                        'userType' => $user->type);
    return $this->view->render($response, '/doctor/medicine-search.html', $viewData);
  });


})->add('Pms\Middleware\AuthenticateMiddleware:redirectNonLogin');
