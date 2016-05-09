<?php
namespace Pms\Datalayer;

use \PDO;
use Pms\Datalayer\DBHelper;

class ProgrammeDB{


  public function getMedicationProgrammeList($doctorId){
    try {

      $paramArray = array(
                          'pdoctor_id' => $doctorId
                        );

      $statement = DBHelper::generateStatement('get_medication_programme_list',  $paramArray);

      $statement->execute();

      $programmeList = array();

      while (($result = $statement->fetch(PDO::FETCH_ASSOC)) !== false) {
        $programmeList[] = array('id' => $result['id'], 'name' => $result['name']);
      }

      return array('status' => 1, 'data' => $programmeList, 'message' => 'success');

    } catch (Exception $e) {
      return array('status' => $status, 'data' => "", 'message' => 'exceptoin in DB' . $e->getMessage());
    }

  }



}
