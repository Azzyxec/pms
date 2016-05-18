<?php
namespace Pms\Datalayer;
use Pms\Entities\bookAppointmentObject;
use \PDO;
use \AppConfig;

        



             
 class bookAppointmentEntryDB{
     public $dns;
     public $username;
     public $password;
     
     function __construct(){
          
          

            $this->dns =  'mysql:host='.AppConfig::$dbhost.';dbname='.AppConfig::$dbname.';port='. AppConfig::$port ;

            $this->username  =AppConfig::$dbuser;
            $this->password = AppConfig::$dbpass;
            
     }
     
     function getData(){
         return $this->dns;
     }
     

     function Persist($bookAppointmentObject){
            try{


                $db = new PDO($this->dns, $this->username, $this->password);
                
                $sql ="INSERT INTO `pms`.`patients_appointment` (`patients_name`, `patients_appointment_date`, `patients_appointment-time`, `patients_contact`, `patients_description`) VALUES ('sdf', 'sdf', 'sdf', '93', 'sdf');
";
                $statement = $db->prepare($sql);
                
                
                $statement->bindValue(':patientsName',  $bookAppointmentObject->patientsName, PDO::PARAM_INT);
                $statement->bindValue(':patientsAppointmentDate',  $bookAppointmentObject->appointmentDate);
                $statement->bindValue(':patientsAppointmentTime',  $bookAppointmentObject->appointmentTime);
                $statement->bindValue(':patientsContact',  $bookAppointmentObject->contact);
                $statement->bindValue(':patientsDescription',  $bookAppointmentObject->description);
               
                $statement->execute();
                return $statement;
              
            }    
             catch(PDOException $e){
                        die('Could not connect to the database:<br/>' . $e);
                        $dberror = "could not connect to database";
                        return "there was an error";
             }
     }
     
     
   

     
    function getBookAppointmentList(){
        try{
            
            $db = new PDO($this->dns, $this->username, $this->password);
            
            $sql ="call getVouchers()";
            $statement = $db->prepare($sql);
            $statement->execute();
            $json;
            while ($row = $statement->fetch(PDO::FETCH_ASSOC)){

                $json[] = [
                    'voucherTypeId' => $row['voucher_type'],
                    'voucherType' => $row['Voucher_type_name'],
                    'date' => $row['date'],
                  
                 ];
              };
            return $json;

        }catch(PDOException $e){
            die('Could not connect to the database:<br/>' . $e);
            $dberror = "could not connect to database";
            return "there was an error";
        }
    }
}



?>