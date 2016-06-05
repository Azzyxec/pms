<?php

class AppConfig{
  //slim config
  public static $templatePath = '../app/templates';
  public static $displayErrorDetails = true;
  public static $basePath = '/pms/public/';
  //Database config
  public static $dbhost = 'localhost';
  public static $dbname = 'pms';
  public static $port = '3306';
  public static $dbuser = 'pms';
  public static $dbpass = 'pms';

  public static $passwordResetConfig = array(
    'resetLink' => 'http://dreamlogic.in/demo/pms/public/index.php/authenticate/passwordReset?code=',
    'fromEmail' => 'dreamdkp@dreamlogic.in',
    'sendAs' => 'Admin'
  );

  public static $passwordHashSettings = array(
    'algorithm' => PASSWORD_DEFAULT,
    'settings' => array('cost' => 12)
  );

}



?>
