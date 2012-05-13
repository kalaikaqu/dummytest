window.onload = function(){
	try{
		var xmlhttp = new XMLHttpRequest();
	}catch(e){
		var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open('GET','header.php',true);
	xmlhttp.onreadystatechange = function()
	{
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
			{
				window.alert(xmlhttp.getAllResponseHeaders());
			}
	}
	xmlhttp.send();
}