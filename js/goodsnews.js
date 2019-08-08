//ajax
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
//获取页面的数据
function getgoodsnews() {
	ajaxByPromise("php/getGoodsInfo.php", "get", {
			goodsId: "飞科智能剃须刀FS375"
		}, true)
		.then(
			(str) => {
				if (str) {
					var goodinfostr = JSON.parse(str);
					goodsrender(goodinfostr);
				}
			})
}
//展示页面
function goodsrender(str) {
	for (let key in str) {
		$(".goodstypname")[0].innerHTML = str.goodsName;
		let strimg = str.goodsImg.split(",");
		new Mirror({
				mulitple: 2
			}, $("#goodsimgbox"),
			["img/goodimg/prev.png", strimg[1], strimg[2], strimg[3], strimg[4], strimg[5], "img/goodimg/slidenext.png"]
		);

		$(".goodsname")[0].innerHTML = str.goodsId;
		let arrscrpt = str.beiyong3.split("/");
		$(".goodsdscb")[0].innerHTML = arrscrpt[0];
		$(".goodsdscb")[1].innerHTML = arrscrpt[1];
		$(".goodsdscb")[2].innerHTML = arrscrpt[2];
		$(".marketprice")[0].innerHTML = str.beiyong4;
		$(".saleprice")[0].innerHTML = str.goodsPrice;
		$(".evaluate")[0].innerHTML = str.beiyong2;
		$(".monthsallnum")[0].innerHTML = str.beiyong1;
		$(".sallnum")[0].innerHTML = str.goodsCount;
		$(".savenum")[0].innerHTML = "库存" + str.beiyong5 + "件";
	}

	$(".goodsadd")[0].onclick = function() {
		$(".sallnum")[0].innerHTML--;
		if ($(".sallnum")[0].innerHTML <= 0) {
			$(".sallnum")[0].innerHTML = 0;
			$(".typenums")[0].innerHTML = "0";
		}
	}
	$(".goodsreduce")[0].onclick = function() {
		$(".sallnum")[0].innerHTML++;
		$(".typenums")[0].innerHTML = "1";
		$(".catalt")[0].onmouseover = function() {
			let totalnum = $(".sallnum")[0].innerHTML;
			let totalprice = $(".saleprice")[0].innerHTML;
			$(".totalsinglenum")[0].innerHTML = totalnum;
			$(".totalsinglepeice")[0].innerHTML = totalnum * totalprice;
		}
	}
}
//放大镜
class Mirror {
	//构造函数
	constructor(obj, contentbox, imgsdoms) {
		this.contentbox = contentbox;
		this.imgsdoms = imgsdoms;
		this.boxDom = null;
		this.oimglist = null;
		this.mirrorDom = null;
		this.showDom = null;

		let defaultObj = {
			width: 150,
			height: 130,
			color: "#ffffff",
			opacity: 0.8,
			mulitple: 3
		}

		for (let key in defaultObj) {
			if (obj[key]) {
				this[key] = obj[key];
			} else {
				this[key] = defaultObj[key];
			}
		}
		this.render();
		this.addEvent();
	}

	render() {
		this.contentbox.style.position = "relative";
		//创建主图片
		this.boxDom = document.createElement('div');
		this.boxDom.style.cssText =
			`
			width:372px;
			height:368px;
			background:url(${this.imgsdoms[1]});
			background-size: 372px 368px;
			position:absolute;
			top:7px;
			left:7px;
		`;
		this.contentbox.appendChild(this.boxDom);

		//创建循环的图片
		this.oimglist = document.createElement('div');
		this.oimglist.style.cssText =
			`
			width:386px;
			height:75px;
			position:absolute;
			bottom:0;
			left:0;
			display:flex;
		`;
		this.oimglist.innerHTML =
			`
			<img src=${this.imgsdoms[0]} alt="" style="
					width:13px;
					height:23px;
					margin:auto;
					margin-left:7px;
					margin-right:11px;
					border:none;
				">
			<img src=${this.imgsdoms[1]} alt="">
			<img src=${this.imgsdoms[2]} alt="">
			<img src=${this.imgsdoms[3]} alt="">
			<img src=${this.imgsdoms[4]} alt="">
			<img src=${this.imgsdoms[5]} alt="">
			<img src=${this.imgsdoms[6]} alt="" style="
					width:13px;
					height:23px;
					margin:auto;
					margin-left:7px;
					margin-right:11px;
					border:none;
				">
		`;
		this.contentbox.appendChild(this.oimglist);

		//1、放大镜
		this.mirrorDom = document.createElement('div');
		this.mirrorDom.style.cssText =
			`
			position: absolute;
			width: ${this.width}px;
			height: ${this.height}px;
			background-color: ${this.color};
			opacity:${this.opacity};
			display: none;
		`;
		this.boxDom.appendChild(this.mirrorDom);
		//2、放大效果
		this.showDom = document.createElement('div');
		this.showDom.style.cssText =
			`
			position: absolute;
			left:${this.boxDom.offsetWidth+10}px;
			top:0px;
			width: ${this.width*this.mulitple}px;
			height: ${this.height*this.mulitple}px;
			background: ${getStyle(this.boxDom,"background-image")} no-repeat;
			background-size: ${this.boxDom.offsetWidth*this.mulitple}px  ${this.boxDom.offsetHeight*this.mulitple}px;
			background-position: 0px 0px;
			display: none;
			z-index:999;
		`;
		this.boxDom.appendChild(this.showDom);
		console.log(getStyle(this.boxDom, "background-image"));

	}

	addEvent() {
		let that = this;
		this.boxDom.onmouseover = function() {
			that.mirrorDom.style.display = "block";
			that.showDom.style.display = "block";
		}

		this.boxDom.onmouseout = function() {
			that.mirrorDom.style.display = "none";
			that.showDom.style.display = "none";
		}

		this.boxDom.onmousemove = (event) => {
			let evt = event || window.event;
			//1、数据
			//1)、计算数据
			let left1 = evt.pageX - that.contentbox.offsetLeft - that.mirrorDom.offsetWidth / 2;
			let top1 = evt.pageY - that.contentbox.offsetTop - that.mirrorDom.offsetHeight / 2;

			//2)、边界
			if (left1 < 0) {
				left1 = 0;
			} else if (left1 > that.boxDom.offsetWidth - that.mirrorDom.offsetWidth) {
				left1 = that.boxDom.offsetWidth - that.mirrorDom.offsetWidth;
			}

			if (top1 < 0) {
				top1 = 0;
			} else if (top1 > that.boxDom.offsetHeight - that.mirrorDom.offsetHeight) {
				top1 = that.boxDom.offsetHeight - that.mirrorDom.offsetHeight;
			}

			//2、改变外观
			that.mirrorDom.style.left = `${left1}px`;
			that.mirrorDom.style.top = `${top1}px`;

			that.showDom.style.backgroundPosition = `-${that.mulitple*left1}px -${that.mulitple*top1}px`;
		}

		let oIMG = this.oimglist.children;
		for (let i = 1; i < oIMG.length - 1; i++) {
			oIMG[i].index = i;
			oIMG[i].onmousemove = function() {
				for (let i = 1; i < oIMG.length - 1; i++) {
					oIMG[i].style.border = "";
				}
				this.style.border = "1px solid #2264af";
			}
			oIMG[i].onmouseout = function() {
				this.style.border = "";
			}
			oIMG[i].onclick = function() {
				that.boxDom.style.backgroundImage = "url(" + that.imgsdoms[i] + ")";
				that.showDom.style.background = "url(" + that.imgsdoms[i] + ")";
			}
		}
	}
}

// // 1.cookie获取用户名
function getCookie(key) {
	var str = decodeURIComponent(document.cookie);
	// 	//1、转换成数组
	var arr = str.split("; ");
	// 	//2、根据键找到对应的数组元素
	var index = -1;
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].indexOf(key + "=") == 0) {
			index = i;
			break;
		}
	}
	// 	//3、截取出值
	if (index == -1) {
		return "";
	} else {
		return arr[index].substring(key.length + 1);
	}
}
let vipNames = getCookie("username");
// //2.发送请求更新购物信息
$(".addgooscart")[0].onclick = function() {
	ajaxByPromise("php/addShoppingCart.php", "get", {
			vipName: vipNames,
			goodsId: '$(".goodsname")[0].innerHTML',
			goodsCount: '$(".sallnum")[0].innerHTML'
		}, true)
		.then(
			(str) => {
				if (str) {
					console.log("数据存储成功");
// 					//弹窗
					let confirmdiv = document.createElement("div");
					confirmdiv.className="adddivs";
					confirmdiv.style.cssText =
						`
							width:300px;
							height:200px;
							background:#ffffff;
							border:1px solid black;
							position:fixed;
							left:50%;
							top:25%;
						`;
					confirmdiv.innerHTML =
						`
							<p style=" 
								display:block;
								margin:40px 40px;
								font-size:20px;
								color:blue;
							">成功加入购物车！</p>	
							<input class="colum" type="button"  style="margin:0 30px" value="去购物车结算" />	
							<input class="close" type="button" value="关闭页面"/>
						`;
					document.body.appendChild(confirmdiv);
					$(".colum")[0].onclick=function(){
						location.href="shoppingcart.html";
					}
					$(".close")[0].onclick=function(){
						$(".adddivs")[0].remove();
					}
				}
			})
}


//功能：获取dom元素的样式属性值
//参数：dom，属性名
//返回值：样式属性值

function getStyle(domObj, attr) {
	if (domObj.currentStyle) { //IE
		return domObj.currentStyle[attr];
	} else { //其它主流浏览器
		var cssObj = window.getComputedStyle(domObj);
		return cssObj[attr];
	}
}

function $(str) {
	if (str.charAt(0) == "#") {
		return document.getElementById(str.substring(1));
	} else if (str.charAt(0) == ".") {
		return document.getElementsByClassName(str.substring(1));
	} else {
		return document.getElementsByTagName(str);
	}
}
