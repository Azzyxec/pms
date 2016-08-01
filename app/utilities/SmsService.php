<?php
namespace Pms\Utilities;


class SmsService{

    public $sendUrl;

    public function send($message, $mobileNo){

      if( isset($this->sendUrl) && isset($message) && isset($message) && $mobileNo){

        //check if a number is valid

        $noLength = strlen($mobileNo);
        if($noLength == \AppConfig::$SmsConifg['addCodeWhenLength']){
          $mobileNo =  \AppConfig::$SmsConifg['countryCode'] . $mobileNo;
        }

        $this->sendUrl = str_replace("#message#", $message,  $this->sendUrl);
        $this->sendUrl = str_replace("#mobileNo#", $mobileNo,  $this->sendUrl);

      }

      $chUrl = curl_init();
      curl_setopt($chUrl, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($chUrl, CURLOPT_URL, $this->sendUrl);

      $response = curl_exec($chUrl);

      return $response;

    }

    public function getsendUrl(){
      return $this->sendUrl;
    }

    public static function getInstance(){

      $url = \AppConfig::$SmsConifg['url'];
      $QueryParams = \AppConfig::$SmsConifg['queryParams'];

      $dataAttributes = array_map(function($value, $key) {
            return $key.'='.$value.'';
        }
        , array_values($QueryParams)
        , array_keys($QueryParams)
      );

      $queryString = implode('&', $dataAttributes);

      $url = $url . '?' .  $queryString;

      $smsService = new self();
      $smsService->sendUrl = $url;
      return $smsService;

     }


}
