
function getXmlHttp()
{
	var versions =  [
			function()
			{
				return new XMLHttpRequest();
			},
			function()
			{
				return new ActiveXObject("Microsoft.XMLHTTP");
			},
			function()
			{
				return new ActiveXObject("Microsoft.XMLHTTP"); 
			}
	];
	var request;
	for(var i = 0; i < versions.length;i++)
		{
			var lambda= versions[i];
			try{
				request = lambda();
			}catch(e){};
		
		}
		return request;
}
/*
*
*
*option 参数集合，对象类型，其成员均为可选
*	method 请求方法 可以为GET 或者 POST
*	parameters 需要发送的数据，字符串型，形式是"a=1&b=2&c=3"
*	headers 需要发送的HTTP头信息，对象类型，其每一个属性是一个头信息属性名是头信息的名称，属性值是信息的内容
*	onLoading 在请求开始时执行的函数
*	onComplete 在请求完成时执行的函数
*	onSuccess 在请求成功的时候执行的函数
*	onFailure 在请求失败的时候执行的函数
*/
function ajaxRequest(url,options){
	var request = getXmlHttp();
	if(typeof request == 'undefine')
		{
			throw new Error("fuck you ie.");
			return;
		}
	var url = url ;
	var method = (options.method || 'POST').toUpperCase();
	if(method != 'GET' && method != 'POST'){
		method = 'POST';
	}
	var parameters = options.parameters || null;
	var headers = options.headers || {};
	var onLoadingEventHandler = options.onLoading || function(){};
	var onCompleteEventHandler = options.onComplete || function(){};
	var onSuccessEventHandler = options.onSuccess || function(){};
	var onFailureEventHandler = options.onFailure || function(){};
	
	if(method =='GET' && parameters != null)
		{
			if(url.indexOf('?')>-1)
				{
				url += '&' +parameters
				}else
					{
					url += '?'+parameters;
					}
			parameters = null;
		}
	request.open(method,url,true);
	request.setRequestHeader('contentType','application/x-www-form-urlencoded');
	for (var name in headers)
		{
			request.setRequestHeader(name,headers[name]);
		}
	request.onreadystatechange = function()
	{
		if(request.readyState == 1)
			{
				onLoadingEventHandler(request);
			}
		if(request.readyState == 4)
			{
				onCompleteEventHandler(request);
				if(request.status && request.status >= 200 && request.status < 300)
					{
						onSuccessEventHandler(request);
						//alert(request.responseText);
					}else{
						onFailureEventHandler(request);
					}
			}
	}
	request.send(parameters);
}