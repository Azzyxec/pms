<?php
include_once("config.php");
class database {

	private $link;

	function __construct() {
		@$this->link = mysql_connect(config::host,config::username,config::password);
		mysql_select_db(config::database,$this->link) or die(mysql_error());
	}

	function __distruct() {
		mysql_close($this->link);
	}

	function testFunction($id) {
		$sql = sprintf("call test()");
		$rs=mysql_query($sql,$this->link) or die(mysql_error());
		if(mysql_affected_rows()==1)
		return true;
		return false;
	}

}
?>
