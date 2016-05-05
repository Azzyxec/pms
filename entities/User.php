<?php

namespace Pms\Entities;

 class User {
  public $id;
  public $type;
  public $name;

  function __construct(){
    $this->id = "-1";
    $this->type = "-1";
    $this->name = "-1";
  }
}
