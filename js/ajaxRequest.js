
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
*option �������ϣ��������ͣ����Ա��Ϊ��ѡ
*	method ���󷽷� ����ΪGET ���� POST
*	parameters ��Ҫ���͵����ݣ��ַ����ͣ���ʽ��"a=1&b=2&c=3"
*	headers ��Ҫ���͵�HTTPͷ��Ϣ���������ͣ���ÿһ��������һ��ͷ��Ϣ��������ͷ��Ϣ�����ƣ�����ֵ����Ϣ������
*	onLoading ������ʼʱִ�еĺ���
*	onComplete ���������ʱִ�еĺ���
*	onSuccess ������ɹ���ʱ��ִ�еĺ���
*	onFailure ������ʧ�ܵ�ʱ��ִ�еĺ���
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