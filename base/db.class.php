<?php
/**
 * 类名:DB
 * 说明：数据库操作类
 */
class DB
{
	/*
	 * 属性名:$host
	 * 类型:string
	 * 说明:数据库服务器的地址
	 */
	public $host;
	
	public $username;
	
	public $password;
	
	public $dbname;
	
	public $conn;
	
	public function DB($host="localhost",$username='root',$password='111111',$dbname='guestbook')
	{
		$this->host = $host;
		$this->username = $username;
		$this->password = $password;
		$this->dbname = $dbname;
		//$this->open();
		
	}
	
	private function open(){
		$this->conn = mysql_connect($this->host,$this->username,$this->password);
		mysql_select_db($this->dbname);		
		if (!$this->conn) {
			die('Could not connect: ' . mysql_error());
		}
		//echo 'connected successfully';
		//mysql_close($this->conn);
	}
	
	public function close(){
		mysql_close($this->conn);
	}
	
	public function getObjListBySql($sql){
		$this->open();
		$rs = mysql_query($sql,$this->conn);
		if(!$rs){
			die('read mysql error'.mysql_error());
		}
		$objList = array();
		while($obj = mysql_fetch_object($rs))
		{
			if($obj)
			{
				$objList[]=$obj;
			}
		}
		$this->close();
		return $objList;
	}
	
	public function insertDate($table,$columns=array(),$values=array())
	{
		$sql = 'INSERT INTO '.$table.' (';
		for($i = 0; $i<sizeof($columns);$i++)
		{
			$sql .= $columns[$i];
			if($i <sizeof($columns) - 1)
			{
				$sql .=',';
			}
		}
		$sql .=') VALUES (';
		for($i = 0; $i<sizeof($values);$i++)
		{
			$sql .="'".$values[$i]."'";
			if($i < sizeof($values)-1)
			{
				$sql .=',';
			}
		}
		$sql .=')';
		$this->open();
		$isSucsses=mysql_query($sql,$this->conn);
		if(!$isSucsses){
			die('Could not connect: ' . mysql_error());
		}
		$id = mysql_insert_id($this->conn);
		$this->close();
		return $id;
	}
}
?>
