<?php
require_once('message.class.php');
$action = $_REQUEST['action'];
if($action=='getall')
{
	$message = Message::readAll();
	echo json_encode($message);
}else if($action =='addnew'){
	$message = new Message($_REQUEST['name'],$_REQUEST['message'],date('Y-m-d H:i:s'));
	$message->insert();
	echo 'ok';
}else {
	echo 'no action';
}
?>