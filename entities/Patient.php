<?php
namespace Pms\Entities;

class Patient{
  public $id;
  public $name;
  public $dateOfBirth;
  public $weight;
  public $height;
  public $gender;
  public $contact1;
  public $contact2;
  public $email;
  public $address;
  public $picturePath;
  public $isGuardian;
  public $GuardianId;
  public $medicalProgrammeId;

  function __construct(){
    $this->id = "-1";
  }

}
