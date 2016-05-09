<?php
namespace Pms\Entities;
             
 class bookAppointmentObject{
        public $patientsName;
        public $appointmentTime;
        public $appointmentDate;
        public $contact;
        public $description;

   
    function __construct($patientsName, $appointmentTime, $appointmentDate, $contact, $description){
         $this->patientsName = $patientsName;
         $this->appointmentTime = $appointmentTime;
         $this->appointmentDate = $appointmentDate;
         $this->contact = $contact;
         $this->description = $description;
    }
}


?>