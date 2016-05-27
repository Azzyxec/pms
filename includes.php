<?php
//this file is opened from the public folder
//the paths are relative to that folder

require '../vendor/autoload.php';


//Core require needed for other to work
require_once '../AppConfig.php';


//helper classes
require_once '../app/utilities/Utilities.php';


//can put a loop to include all the files from the folder
//require once for entites
require_once '../app/entities/User.php';
require_once '../app/entities/Doctor.php';
require_once '../app/entities/UserSessionManager.php';
require_once '../app/entities/Patient.php';
require_once '../app/entities/bookAppointment.php';
require_once '../app/entities/Staff.php';
require_once '../app/entities/BirthDetails.php';

//Datalayer
require_once '../app/datalayer/DBHelper.php';
require_once '../app/datalayer/UserDB.php';
require_once '../app/datalayer/DoctorDB.php';
require_once '../app/datalayer/scheduleDB.php';
require_once '../app/datalayer/PatientDB.php';
require_once '../app/datalayer/ProgrammeDB.php';
require_once '../app/datalayer/bookAppointmentAbstraction.php';
require_once '../app/datalayer/StaffDB.php';

//controller files
