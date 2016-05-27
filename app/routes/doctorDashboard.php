<?php

$app->group('/doctorDashboard', function(){

  //doctor profile change

  $this->get('/doctorProfile', function ($request, $response) {
    return $this->view->render($response, '/doctor/doctor-profile.html', array('basePath' => AppConfig::$basePath));
  });

  //dash home
  $this->get('/', function ($request, $response) {
    return $this->view->render($response, '/doctor/dash-home.html',
    array('basePath' => AppConfig::$basePath, 'active' => "dashboard"));
  });

  //schedule
  $this->get('/scheduleManagement', function ($request, $response) {
    return $this->view->render($response, '/doctor/schedule.html', array('basePath' => AppConfig::$basePath, 'active' => "schedule"));
  });

  $this->get('/newSchedule', function ($request, $response) {
    return $this->view->render($response, '/schedule/new-schedule.html',
    array('basePath' => AppConfig::$basePath, 'active' => "schedule"));
  });

  $this->get('/ScheduleCalenderView', function ($request, $response) {
    return $this->view->render($response, '/schedule/schedule-calendar.html', array('basePath' => AppConfig::$basePath, 'active' => "schedule"));
  });

  $this->get('/scheduleList', function ($request, $response) {
    return $this->view->render($response, '/schedule/schedule-list.html',
    array('basePath' => AppConfig::$basePath, 'active' => "schedule"));
  });


  //patient
  $this->get('/patientsEntry', function ($request, $response) {
    return $this->view->render($response, '/patient/patient-entry.html',
    array('basePath' => AppConfig::$basePath, 'active' => "patient"));
  });

  $this->get('/patientHistory', function ($request, $response) {
    return $this->view->render($response, '/patient/patient-history.html',
    array('basePath' => AppConfig::$basePath, 'active' => "patient"));
  });


  $this->get('/patientsListing', function ($request, $response) {
    return $this->view->render($response, '/patient/patient-listing.html', array('basePath' => AppConfig::$basePath));
  });


  //BOC Appointment Management
  $this->get('/bookAppointment', function ($request, $response) {
    return $this->view->render($response, '/appointment/book-appointment.html',
    array('basePath' => AppConfig::$basePath, 'active' => "appointment"));
  });

  $this->get('/listAppointment', function ($request, $response) {
    return $this->view->render($response, '/appointment/list-appointment.html',
    array('basePath' => AppConfig::$basePath, 'active' => "appointment"));
  });

  $this->get('/closeAppointment', function ($request, $response) {
    return $this->view->render($response, '/appointment/close-appointment.html',
    array('basePath' => AppConfig::$basePath, 'active' => "appointment"));
  });
  //EOC Appointment management


  //Medical programme

  $this->get('/createMedicalProgram', function ($request, $response) {
    return $this->view->render($response, '/programs/create-program.html',
    array('basePath' => AppConfig::$basePath, 'active' => "programme"));
  });

  $this->get('/programmeList', function ($request, $response) {
    return $this->view->render($response, '/programs/programme-listing.html',
    array('basePath' => AppConfig::$basePath, 'active' => "programme"));
  });

  //staff management

  $this->get('/staffEntry', function ($request, $response) {
    return $this->view->render($response, '/staff/add-staff.html',
    array('basePath' => AppConfig::$basePath,
    'active' => "staff",
    'showActiveContol' => true));
  });


  $this->get('/staffListing', function ($request, $response) {
    return $this->view->render($response, '/staff/staff-listing.html',
    array('basePath' => AppConfig::$basePath,
    'active' => "staff"));
  });

  //location management
  $this->get('/workLocationManagement', function ($request, $response) {
    return $this->view->render($response, '/doctor/manage-locations.html',
    array('basePath' => AppConfig::$basePath, 'active' => "others"));
  });
  //Analytics reporting
  $this->get('/AnalyticsReport', function ($request, $response) {
    return $this->view->render($response, '/doctor/analytics.html',
    array('basePath' => AppConfig::$basePath, 'active' => "analytics"));
  });


  $this->get('/accounting', function ($request, $response) {
    return $this->view->render($response, '/doctor/accounting.html',
    array('basePath' => AppConfig::$basePath, 'active' => "accounting"));
  });


  $this->get('/medicineSearch', function ($request, $response) {
    return $this->view->render($response, '/doctor/medicine-search.html',
    array('basePath' => AppConfig::$basePath, 'active' => "medicine"));
  });


  $this->get('/calendarTemplate', function ($request, $response) {
    return $this->view->render($response, '/WorkPages/calendarTemplate.html',
    array('basePath' => AppConfig::$basePath, 'active' => "WorkPages"));
  });


});
