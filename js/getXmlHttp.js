function getXmlHttp()
{
	var versions =  {
			function()
			{
				return new XMLHttpRequest();
			}
			function()
			{
				new ActiveXObject("Microsoft.XMLHTTP");
			}
			function()
			{
				new ActiveXObject("Microsoft.XMLHTTP"); 
			}
	};
	var request;
	for(var i = 0; i < version.length;i++)
		{
			var lambda= version[i];
			try{
				request = lambda();
			}catch(e){};
		
		}
		return request;
}