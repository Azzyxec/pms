<?php

namespace Pms\Entities;

class Doctor{
  public $id;
  public $name;
  public $contact;
  public $alternateContact;
  public $email;
  public $qualifications;
  public $address;
  public $recoveryContact;
  public $recoveryEmail;
  public $userName;
  public $password;
  public $isActive;

  function __construct(){
    $this->id = "-1";
  }

  public static function  getInsanceFromArray($dataAray){

    $doctor = new self();
    $doctor->id = $dataAray['id'];
    $doctor->name = $dataAray['name'];
    $doctor->contact = $dataAray['contact'];
    //$doctor->alternateContact = $dataAray['alternateContact'];
    $doctor->email = $dataAray['email'];
    $doctor->qualifications = $dataAray['qualifications'];
    $doctor->address = $dataAray['address'];
    //$doctor->recoveryContact = $dataAray['recoveryContact'];
    //$doctor->recoveryEmail = $dataAray['recoveryEmail'];
    $doctor->userName = $dataAray['userName'];
    $doctor->password = $dataAray['password'];
    $doctor->isActive = $dataAray['isActive'];
    return $doctor;

  }


}
