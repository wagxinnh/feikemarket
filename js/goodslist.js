function ajax1905(url,method,params,func,isAsync){
	//1、创建对象
	let xhr = new XMLHttpRequest();

	//产生请求参数的字符串：循环把json对象转换为形如这样的格式：key1=value1&key2=value2
	let sendstr = '';
	for(let key in params){
		sendstr += `${key}=${params[key]}&`;
		// sendstr += key+"="+params[key]+"&"
	}
	if(sendstr.length>0){
		sendstr = sendstr.substring(0,sendstr.length-1); //musicname=你
	}
	
	let urlAndParam = url;//getMusic.php
	//如果是get方式，并且有请求参数，那么就把url和请求参数用问号隔开
	if(method.toLowerCase()=="get" && sendstr!=""){
		urlAndParam+= "?"+sendstr;//getMusic.php?musicname=你
	}

	//2、设置请求参数
	xhr.open(method,urlAndParam,isAsync);

	//3、设置回调函数
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4 && xhr.status==200){
			//调用回调函数（如下的 && 表示，逻辑短路，如果func是真，才调用func函数）
			// func&&func(xhr.responseText);
			if(func){
				func(xhr.responseText);
			}
		}
	}
	if(method.toLowerCase()=="post"){
		xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		xhr.send(sendstr);
	}else{
		//4、发送请求
		xhr.send();	
	}
	
}

function ajax190502(obj){

	let defaultObj = {
		"url":"#",
		"method":"get",
		"params":{},
		"func":null,
		"isAsync":true
	};

	ajaxObj = {};
	for(let key in defaultObj){//key = url
		ajaxObj[key] = obj[key] || defaultObj[key];
	}

	ajax1905(ajaxObj.url,ajaxObj.method,ajaxObj.params,ajaxObj.func,ajaxObj.isAsync);	
}

function ajaxByPromise(url,method,params,isAsync){
	//1、创建对象
	let xhr = new XMLHttpRequest();

	//产生请求参数的字符串：循环把json对象转换为形如这样的格式：key1=value1&key2=value2
	let sendstr = '';
	for(let key in params){
		sendstr += `${key}=${params[key]}&`;
		// sendstr += key+"="+params[key]+"&"
	}
	if(sendstr.length>0){
		sendstr = sendstr.substring(0,sendstr.length-1); //musicname=你
	}
	
	let urlAndParam = url;//getMusic.php
	//如果是get方式，并且有请求参数，那么就把url和请求参数用问号隔开
	if(method.toLowerCase()=="get" && sendstr!=""){
		urlAndParam+= "?"+sendstr;//getMusic.php?musicname=你
	}

	//2、设置请求参数
	xhr.open(method,urlAndParam,isAsync);

	let p = new Promise(function(resolve,reject){
		//3、设置回调函数
		xhr.onreadystatechange = function(){			
			if(xhr.readyState==4){
				if(xhr.status==200){
					if(resolve){
						resolve(xhr.responseText);
					}
				}else{
					if(reject){
						reject("服务器出错了");
					}
				}
			}
		}
	});

	
	if(method.toLowerCase()=="post"){
		xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		xhr.send(sendstr);
	}else{
		//4、发送请求
		xhr.send();	
	}
	return p;
}

	function Goodsmodule(){
			ajaxByPromise("php/getGoodsList.php","get",true)
			  .then(
				 (str)=>{
				 if(str){
				  var strmodule=JSON.parse(str);
				  console.log(strmodule);
				 single_module(strmodule);
			}
		})
	}

	function single_module(str){
		for(let i=0;i<str.length;i++){
			let oA=document.createElement("a");
			oA.style.cssText=`
				display:block;
				margin-right: 16px;
				margin-left: 16px;
				width: 532px;
				height:582px;
				overflow:hidden;
				background:#ffffff;
				font-family: "Microsoft Yahei", sans-serif;
				float:left;
			`;
			oA.href="goodnews.html";
			$("#goodslistcenter").appendChild(oA);
			//创建内容
			for(let key in str[i]){
			$(".goodstypname")[0].innerHTML=str[i].goodsName;
			$(".tatalnum")[0].firstElementChild.innerHTML=str.length;
				
			let strimg=str[i].goodsImg.split(",")[0];
			let oImg=document.createElement("img");
			 oImg.style.cssText=`
			 	text-align: center;
				width: 532px;
			 	margin:0 auto;
			 `;
			 oImg.src=strimg;
			 oA.appendChild( oImg);

			let odivs=document.createElement("div");
			odivs.style.cssText=`
				width: 532px;
				height:153px;
				background:#ffffff;
			`;
			oA.appendChild(odivs);
	
			let op=document.createElement("p");
			op.style.cssText=`
				font-size:18px;
				color:#ff7c44;
				margin: 12px 0 12px 10px;
				font-weight: bold;
			`;
			op.innerHTML="￥"+str[i].goodsPrice;
			odivs.appendChild(op);
			
			let oAs=document.createElement("a");
			oAs.style.cssText=`
				font-size:18px;
				color: #898989;
				line-height:22px;
				margin: 5px 0 0 10px;
			`;
			oAs.href="#";
			oAs.innerHTML=str[i].goodsId;
			odivs.appendChild(oAs);
			
			 let ops=document.createElement("p");
			 ops.style.cssText=`
			 	font-size:18px;
			 	color: #898989;
				margin: 5px 0 0 10px;
			 `;
			 ops.innerHTML=str[i].goodsDesc;
			 odivs.appendChild(ops);

			let Span1=document.createElement("span");
			Span1.style.cssText=`
			 	font-size:18px;
			 	color:#000000;
			 	line-height:40px;
			 	margin: 12px 0 0 10px;
			 `;
			Span1.innerHTML="本款产品月销售量：";
			 odivs.appendChild(Span1);
			
			let oEM=document.createElement("em");
			oEM.style.cssText=`
			 	font-style: normal;
			 	color:#ff7c44;
			 `;
			oEM.innerHTML=str[i].beiyong1;
			 Span1.appendChild(oEM);
	
			let Span2=document.createElement("span");
			Span2.style.cssText=`
			 	font-size:18px;
			 	color:#000000;
			 	line-height:40px;
			 	margin: 5px 0 0 10px;
			 `;
			Span2.innerHTML="| 评价: ";
			 odivs.appendChild(Span2);

			let oEMs=document.createElement("em");
			oEMs.style.cssText=`
			 	font-style: normal;
			 	color:#ff7c44;
			 `;
			oEMs.innerHTML=str[i].beiyong2;
			Span2.appendChild(oEMs);

			 oA.onmouseover=function(){
			 	this.style.border="1px solid #ff0036";
			 	oA.style.opacity=".7";
			 }
			 oA.onmouseout=function(){
			 	this.style.border="1px solid #fafafa";
			 	oA.style.opacity="1";
			 }
			}
		}
	}
	