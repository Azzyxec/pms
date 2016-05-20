<?php

namespace Pms\Entities;


class Staff{

  public $id;
  public $firstName;
  public $lastName;
  public $contact1;
  public $contact2;
  public $email;
  public $address;
  public $userName;
  public $pasword;
  public $recoveryContact;
  public $recoveryEmail;
  public $locationId;
  public $isActive;

  function __construct(){
    $this->id = "-1";
    $this->isActive = 0;
  }

  public static function  getInsanceFromArray($dataAray){

    $staff = new self();
    $staff->id = $dataAray['id'];

    $staff->firstName = $dataAray['firstName'];
    $staff->lastName = $dataAray['lastName'];
    $staff->contact1 = $dataAray['contact1'];
    $staff->contact2 = $dataAray['contact2'];
    $staff->email = $dataAray['email'];
    $staff->address = $dataAray['address'];
    $staff->userName = $dataAray['userName'];
    $staff->pasword = $dataAray['pasword'];
    $staff->recoveryContact = $dataAray['recoveryContact'];
    $staff->recoveryEmail = $dataAray['recoveryEmail'];
    $staff->locationId = $dataAray['locationId'];
    $staff->isActive = $dataAray['isActive'];

    return $staff;

  }



}
