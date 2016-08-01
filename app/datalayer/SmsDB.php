<?php
namespace Pms\Datalayer;

use \PDO;
use Pms\Datalayer\DBHelper;


class SmsDB{

    public function addEntry($message, $receipentNo, $response){
      try {

        $paramArray = array(
                            'pmessage' => $message,
                            'preceipient_no' => $receipentNo
                            'presponse' => $response
                          );

        $statement = DBHelper::generateStatement('add_sms_entry',  $paramArray);

        $statement->execute();

        $row = $statement->fetch();

        return = $row['id'];

      } catch (Exception $e) {
        return array('status' => "-1", 'data' => "", 'message' => "exception in Datalayer " . $e->getMessage());
      }
    }

}
