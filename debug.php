<?php
require_once 'base/db.class.php';

$x = new DB();
//$x->insertDate('message',array('name','message','postdate'),array('jiangqi','testinfo','2012-05-11'));
$message=$x->getObjListBySql('select * from message');
?>