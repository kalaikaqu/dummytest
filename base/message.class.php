<?php
require_once('db.class.php');

/*
 * class: Message
 * аТят╟Е
 */
class Message
{
	public $name;
	public $message;
	public $postdate;
	
	public function Message($name,$message,$postdate){
		
		$this->name = $name;
		$this->message = $message;
		$this->postdate = $postdate;
				
	}
	
	public static function readAll()
	{
		$db = new DB();
		$message = $db->getObjListBySql('select * from message');
		return $message;
	}
	
	public function insert()
	{
		$db =new DB();
		$db->insertDate('message',array('name','message','postdate'),array($this->name,$this->message,$this->postdate));
	}
}
?>