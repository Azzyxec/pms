<?php
namespace Pms\Entities;

class BirthDetails{

public $patientId;
public $deliveryMethodId;
public $birthWeight;
public $length;
public $head;
public $bloodGroup;
public $mothersName;
public $mothersBloodGroup;
public $fathersName;
public $fathersBloodGroup;
public $siblings;
public $remarks;
public $isActive;


  function __construct(){
    $this->patientId = "-1";
  }

  public static function  getInsanceFromArray($dataAray){

    $birthInfo = new self();

    $birthInfo->patientId = $dataAray['patientId'];
    $birthInfo->deliveryMethodId = $dataAray['deliveryMethodId'];
    $birthInfo->birthWeight = $dataAray['birthWeight'];
    $birthInfo->length = $dataAray['length'];
    $birthInfo->head = $dataAray['head'];
    $birthInfo->bloodGroup = $dataAray['bloodGroup'];
    $birthInfo->mothersName = $dataAray['mothersName'];
    $birthInfo->mothersBloodGroup = $dataAray['mothersBloodGroup'];
    $birthInfo->fathersName = $dataAray['fathersName'];
    $birthInfo->fathersBloodGroup = $dataAray['fathersBloodGroup'];
    $birthInfo->siblings = $dataAray['siblings'];
    $birthInfo->remarks = $dataAray['remarks'];
    $birthInfo->isActive = $dataAray['isActive'];

    return $birthInfo;

  }

}
