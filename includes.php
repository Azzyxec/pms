<?php
//this file is opened from the public folder
//the paths are relative to that folder

require '../vendor/autoload.php';


//Core require needed for other to work 
require_once '../AppConfig.php';


//can put a loop to include all the files from the folder
//require once for entites
require_once '../entities/User.php';
require_once '../entities/Doctor.php';
require_once '../entities/UserSessionManager.php';
require_once '../entities/Patient.php';
require_once '../entities/bookAppointment.php';

//Datalayer
require_once '../datalayer/DBHelper.php';
require_once '../datalayer/UserDB.php';
require_once '../datalayer/DoctorDB.php';
require_once '../datalayer/ScheduleDB.php';
require_once '../datalayer/PatientDB.php';
require_once '../datalayer/ProgrammeDB.php';
require_once '../datalayer/bookAppointmentAbstraction.php';

//controller files
