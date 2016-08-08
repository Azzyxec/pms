<?php
namespace Pms\Utilities;


class SmsService{

    public $sendUrl;

    public function send($message, $mobileNo, $uniqeSenderID){

      //limit the sms to max 60 characters

      if( isset($this->sendUrl) && isset($message) && isset($message) && $mobileNo){

        //check if a number is valid

        $noLength = strlen($mobileNo);
        if($noLength == \AppConfig::$SmsConifg['addCodeWhenLength']){
          $mobileNo =  \AppConfig::$SmsConifg['countryCode'] . $mobileNo;
        }

        $chUrl = \curl_init();

        $message = \rawurlencode($message);

        $this->sendUrl = str_replace("#message#", $message,  $this->sendUrl);
        $this->sendUrl = str_replace("#mobileNo#", $mobileNo,  $this->sendUrl);

        //check if unique sender id is statement
         if(!isset($uniqeSenderID) || trim($uniqeSenderID) === ''){
           //remove the sid parameter &sid=#sid#
           /*
           $this->sendUrl = str_replace("#sid#", ' ',  $this->sendUrl);
           $strLen = strlen($this->sendUrl);
           $posnFromEnd = $strLen - strrpos($this->sendUrl, "#sid#", -1);
           $startPos = strrpos($this->sendUrl, "&", -$posnFromEnd);

           $endPosn = strrpos($this->sendUrl, "#sid#") + strlen("#sid#");


           $this->sendUrl = substr($this->sendUrl, 0,  $startPos) . substr($this->sendUrl, $endPosn);
           */
            $this->sendUrl = str_replace("#sid#", 'WEBSMS',  $this->sendUrl);

         }else{
           $this->sendUrl = str_replace("#sid#", $uniqeSenderID,  $this->sendUrl);
         }

      }





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
