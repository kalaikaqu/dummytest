var url='base/service.php';
/*
 * 留言板初始化程序
 * 
 */
function init(){
	document.getElementById('btnSubmit').onclick = submitMessage;
	readMessage();
}
/*
 * 读取留言板功能模块
 */
function readMessage()
{
	
	var options={
			method:'GET',
			parameters:'action=getall',
			onLoading:function()
			{
				document.getElementById('loadingMsg').style.display='';
			},
			onSuccess:function(x)
			{
				var resBack = x.responseText;
				try
				{
					var messages = eval('('+resBack+')');
					
					for(var i=0; i<messages.length;i++)
					{
						displayMessage(messages[i]);
					}
					document.getElementById('loadingMsg').style.display='none';
					
					document.getElementById('btnSubmit').disabled = false;
						
					doScroll();
				}catch(e){}
			},
			onFailure:function()
			{
				document.getElementById('loadingMsg').style.display ='none';
				alert('Request failure');
			}
	}
	ajaxRequest(url,options);
}

function displayMessage(data)
{
	var name = data.name;
	var date = data.postdate;
	var message = data.message;
	var span = document.createElement('span');
	var nameText = document.createTextNode(name);
	span.appendChild(nameText);
	var dateSpan = document.createElement('span');
	var dateText = document.createTextNode(date);
	dateSpan.appendChild(dateText);
	var p = document.createElement('p');
	var contentText = document.createTextNode(message);
	p.appendChild(contentText);
	var li = document.createElement('li');
	li.appendChild(span);
	li.appendChild(dateSpan);
	li.appendChild(p);
	document.getElementById('msgList').appendChild(li);
}
/*
 * 发送留言功能模块
 */
function submitMessage()
{
	var name = document.getElementById('txtName').value;
	var message = document.getElementById('txtContent').value;
	
	var options = {
			method:'GET',
			parameters:'action=addnew&name='+escapeHTML(name)+'&message='+escapeHTML(message),
			onLoading:function(){
				document.getElementById('submitMsg').style.display='';
				document.getElementById('btnSubmit').disabled =true;
			},
			onSuccess:function(x)
			{
				var resBack = x.responseText;
				if(resBack =='ok')
					{
						var date = new Date();
						var postDate = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'-'+date.getHours()+'-'+date.getMinutes()+'-'+date.getSeconds();						
						var msg={
								name:name,
								message:message,
								postdate:postDate
						}
						displayMessage(msg);
						doScroll();
					}else{
						alert('Submit failure');
					}
					document.getElementById('submitMsg').style.dsiplay='none';
					document.getElementById('btnSubmit').disabled = false;
			},
			onFailure:function()
			{
				document.getElementById('submitMsg').style.display='none';
				document.getElementById('btnSubmit').disabled = true;
				alert('Request failure');
			}
	}
	ajaxRequest(url,options);
}

function doScroll()
{
	var height = document.getElementById('msgList').offestHeight;
	var totalHeight = document.getElementById('msgList').scrollHeight;
	document.getElementById('msgList').scrollTop = totalHeight-height;
}

function escapeHTML(str)
{
	str = str.replace('<','&lt;');
	str = str.replace('>','&gt;');
	return str;
}

window.onload = init;