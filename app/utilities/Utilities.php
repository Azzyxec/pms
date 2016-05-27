<?php
namespace Pms\Utilities;

class XMLHelper {

  //shift this to a utility class
  public static function array_to_xml( $data, $xml_data ) {

      foreach( $data as $key => $value ) {
          if( \is_array($value) ) {
              if( \is_numeric($key) ){
                  $key = 'item'; //dealing with <0/>..<n/> issues
              }
              $subnode = $xml_data->addChild($key);
              XMLHelper::array_to_xml($value, $subnode);
          } else {
              $xml_data->addChild("$key",\htmlspecialchars("$value"));
          }
       }

  }

}
