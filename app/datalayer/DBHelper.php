<?php
namespace Pms\Datalayer;

use \PDO;
use \AppConfig;


class DBHelper{
  public static function getConnection(){

       $dns = 'mysql:host='.AppConfig::$dbhost.';dbname='.AppConfig::$dbname.';port='. AppConfig::$port ;
       $pdo = new PDO($dns, AppConfig::$dbuser, AppConfig::$dbpass);
       $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
       return $pdo;
  }

  public static function generateStatement($procdureName, $paramAray){
    $sql = 'call ' . $procdureName . '(';
    foreach ($paramAray as $key => $value) {
      $sql = $sql . ':' . $key . ',';
    }
    $sql = rtrim($sql, ',') . ')';

    $pdo = DBHelper::getConnection();

    $statement = $pdo->prepare($sql);

    foreach ($paramAray as $key => $value) {
      $statement->bindValue(':' . $key , $value);
    }

    return $statement;
  }

  /*
this function dsnt work for some reason
  public static function getTableArray($procdureName, $paramAray){
    try{
    $statement1 =  DBHelper::generateStatement($procdureName, $paramAray);

    $user = array();
    while (($result = $statement1->fetch(PDO::FETCH_ASSOC)) !== false) {
      $user['id'] = $result['id'];
      $user['type'] = $result['type'];
      $user['name'] = $result['name'];
    }

    return $user;

  }catch(Exception $e){
    return $e->getMessage();
  }

  }
*/

}

 ?>
