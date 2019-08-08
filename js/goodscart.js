function ajax1905(url, method, params, func, isAsync) {
	//1、创建对象
	let xhr = new XMLHttpRequest();

	//产生请求参数的字符串：循环把json对象转换为形如这样的格式：key1=value1&key2=value2
	let sendstr = '';
	for (let key in params) {
		sendstr += `${key}=${params[key]}&`;
		// sendstr += key+"="+params[key]+"&"
	}
	if (sendstr.length > 0) {
		sendstr = sendstr.substring(0, sendstr.length - 1); //musicname=你
	}

	let urlAndParam = url; //getMusic.php
	//如果是get方式，并且有请求参数，那么就把url和请求参数用问号隔开
	if (method.toLowerCase() == "get" && sendstr != "") {
		urlAndParam += "?" + sendstr; //getMusic.php?musicname=你
	}

	//2、设置请求参数
	xhr.open(method, urlAndParam, isAsync);

	//3、设置回调函数
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			//调用回调函数（如下的 && 表示，逻辑短路，如果func是真，才调用func函数）
			// func&&func(xhr.responseText);
			if (func) {
				func(xhr.responseText);
			}
		}
	}
	if (method.toLowerCase() == "post") {
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.send(sendstr);
	} else {
		//4、发送请求
		xhr.send();
	}

}

function ajax190502(obj) {

	let defaultObj = {
		"url": "#",
		"method": "get",
		"params": {},
		"func": null,
		"isAsync": true
	};

	ajaxObj = {};
	for (let key in defaultObj) { //key = url
		ajaxObj[key] = obj[key] || defaultObj[key];
	}

	ajax1905(ajaxObj.url, ajaxObj.method, ajaxObj.params, ajaxObj.func, ajaxObj.isAsync);
}

function ajaxByPromise(url, method, params, isAsync) {
	//1、创建对象
	let xhr = new XMLHttpRequest();

	//产生请求参数的字符串：循环把json对象转换为形如这样的格式：key1=value1&key2=value2
	let sendstr = '';
	for (let key in params) {
		sendstr += `${key}=${params[key]}&`;
		// sendstr += key+"="+params[key]+"&"
	}
	if (sendstr.length > 0) {
		sendstr = sendstr.substring(0, sendstr.length - 1); //musicname=你
	}

	let urlAndParam = url; //getMusic.php
	//如果是get方式，并且有请求参数，那么就把url和请求参数用问号隔开
	if (method.toLowerCase() == "get" && sendstr != "") {
		urlAndParam += "?" + sendstr; //getMusic.php?musicname=你
	}

	//2、设置请求参数
	xhr.open(method, urlAndParam, isAsync);

	let p = new Promise(function(resolve, reject) {
		//3、设置回调函数
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					if (resolve) {
						resolve(xhr.responseText);
					}
				} else {
					if (reject) {
						reject("服务器出错了");
					}
				}
			}
		}
	});


	if (method.toLowerCase() == "post") {
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.send(sendstr);
	} else {
		//4、发送请求
		xhr.send();
	}
	return p;
}

function getgoodcartnews() {
	ajaxByPromise("php/getShoppingCart", "get", {
			vipName: "15528963448"
		}, true)
		.then(
			(str) => {
				if (str) {
					var purchasestr = JSON.parse(str);
					console.log(purchasestr);
					rendergoodscart(purchasestr);
				}
			})
	}

function rendergoodscart(str) {
	for (let i = 0; i < str.length; i++) {
		for (let key in str[i]) {
		$(".singlegoodsimg")[0].src = str[i].goodsImg.split(",")[0];
		$(".singlegoodsname")[0].innerHTML = str[i].goodsId;
		$(".singlegoodsprice")[0].innerHTML = str[i].goodsPrice;
		$(".goodsnum")[0].innerHTML = str[i].goodsCount;
		let totalnum = $(".singlegoodsprice")[0].innerHTML;
		let totalprice = $(".goodsnum")[0].innerHTML;
		$(".singletotalprice")[0].innerHTML = totalnum * totalprice;
		}
	}
}
function totalprice(){
	let totalnum = $(".sallnum")[0].innerHTML;
	let totalprice = $(".saleprice")[0].innerHTML;
	$(".totalsinglenum")[0].innerHTML = totalnum;
	$(".totalsinglepeice")[0].innerHTML = totalnum * totalprice;
}
// function rendergoodscart(str) {
// 	for (let i = 0; i < str.length; i++) {
// 		for (let key in str[i]) {
// 			$(".singlegoodsimg")[0].src = str[i].goodsImg.split(",")[0];
// 			$(".singlegoodsname")[0].innerHTML = str[i].goodsId;
// 			$(".singlegoodsprice")[0].innerHTML = str[i].goodsPrice;
// 			$(".goodsnum")[0].innerHTML = str[i].goodsCount;
// 			let totalnum = $(".singlegoodsprice")[0].innerHTML;
// 			let totalprice = $(".goodsnum")[0].innerHTML;
// 			$(".singletotalprice")[0].innerHTML = totalnum * totalprice;
// 
// 			$(".goodsadd")[0].onclick = function() {
// 				$(".goodsnum")[0].innerHTML--;
// 				if ($(".goodsnum")[0].innerHTML <= 0) {
// 					$(".goodsnum")[0].innerHTML = 0;
// 				}
// 				let totalnum = $(".singlegoodsprice")[0].innerHTML;
// 				let totalprice = $(".goodsnum")[0].innerHTML;
// 				$(".singletotalprice")[0].innerHTML = totalnum * totalprice;
// 			}
// 			$(".goodsreduce")[0].onclick = function() {
// 				$(".goodsnum")[0].innerHTML++;
// 				let totalnum = $(".singlegoodsprice")[0].innerHTML;
// 				let totalprice = $(".goodsnum")[0].innerHTML;
// 				$(".singletotalprice")[0].innerHTML = totalnum * totalprice;		
// 			}
// 			$(".totalpurgoodsprice").innerHTML+=$(".singletotalprice")[i].innerHTML;
// 
// 		}
// 	}
// }
// function totalprice(){
// 	let totalnum = $(".sallnum")[0].innerHTML;
// 	let totalprice = $(".saleprice")[0].innerHTML;
// 	$(".totalsinglenum")[0].innerHTML = totalnum;
// 	$(".totalsinglepeice")[0].innerHTML = totalnum * totalprice;
// }