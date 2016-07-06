<?php
namespace Pms\Entities;

class Patient{
  public $id;
  public $name;
  public $dateOfBirth;
  public $bloodGroup;
  public $weight;
  public $height;
  public $gender;
  public $contact1;
  public $contact2;
  public $address;
  public $picturePath;
  public $isActive;
  //public $medicalProgrammeId;

  function __construct(){
    $this->id = "-1";
    $this->isActive = 1;
  }

  public static function  getInsanceFromArray($dataAray){

    $patient = new self();
    $patient->id = $dataAray['id'];
    $patient->name = $dataAray['name'];
    $patient->dateOfBirth = $dataAray['dateOfBirth'];
    $patient->bloodGroup = $dataAray['bloodGroup'];
    $patient->weight = $dataAray['weight'];
    $patient->height = $dataAray['height'];
    $patient->gender = $dataAray['gender'];
    $patient->contact1 = $dataAray['contact1'];
    $patient->contact2 = $dataAray['contact2'];
    $patient->picturePath = $dataAray['picUploadPath'];

    //$patient->email = $dataAray[''];
    $patient->address = $dataAray['address'];
    $patient->isActive = $dataAray['isActive'];
    
    //$patient->isGuardian = $dataAray['isGuardian'];
    //$patient->guardianId = $dataAray['guardianId'];
    //$patient->medicalProgrammeId = $dataAray[''];

    return $patient;

  }

}
