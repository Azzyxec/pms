<?php

class AppConfig{
  //slim config
  public static $templatePath = '../app/templates';
  public static $displayErrorDetails = true;
  public static $basePath = '/public/';
  //Database config
  public static $dbhost = 'localhost';
  public static $dbname = 'pms';
  public static $port = '3306';
  public static $dbuser = 'pms';
  public static $dbpass = 'pms';
}


/* NicolasXec Configurations

class AppConfig{
  //slim config
  public static $templatePath = '../app/templates';
  public static $displayErrorDetails = true;
  public static $basePath = '/public/';
  //Database config
  public static $dbhost = 'localhost';
  public static $dbname = 'pms';
  public static $port = '3306';
  public static $dbuser = 'root';
  public static $dbpass = '';
}

*/
?>