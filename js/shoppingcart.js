function Goodsmodule(){
	let strmodule=[
			[
				"img/images/FS363_promo.jpg",
				"￥65.00",
				"飞科剃须刀FS363",
				"时尚土豪金/充电显示灯/轻触式开关/弹出式修剪刀/双环贴面刀网",
				"12673",
				"5"
			],
			[
				"img/images/FS363_promo.jpg",
				"￥65.00",
				"飞科剃须刀FS363",
				"时尚土豪金/充电显示灯/轻触式开关/弹出式修剪刀/双环贴面刀网",
				"12673",
				"5"
			],
			[
				"img/images/FS363_promo.jpg",
				"￥65.00",
				"飞科剃须刀FS363",
				"时尚土豪金/充电显示灯/轻触式开关/弹出式修剪刀/双环贴面刀网",
				"12673",
				"5"
			],
			[
				"img/images/FS363_promo.jpg",
				"￥65.00",
				"飞科剃须刀FS363",
				"时尚土豪金/充电显示灯/轻触式开关/弹出式修剪刀/双环贴面刀网",
				"12673",
				"5"
			],
			[
				"img/images/FS363_promo.jpg",
				"￥65.00",
				"飞科剃须刀FS363",
				"时尚土豪金/充电显示灯/轻触式开关/弹出式修剪刀/双环贴面刀网",
				"12673",
				"5"
			],
			[
				"img/images/FS363_promo.jpg",
				"￥65.00",
				"飞科剃须刀FS363",
				"时尚土豪金/充电显示灯/轻触式开关/弹出式修剪刀/双环贴面刀网",
				"12673",
				"5"
			],
			[
				"img/images/FS363_promo.jpg",
				"￥65.00",
				"飞科剃须刀FS363",
				"时尚土豪金/充电显示灯/轻触式开关/弹出式修剪刀/双环贴面刀网",
				"12673",
				"5"
			],
			[
				"img/images/FS363_promo.jpg",
				"￥65.00",
				"飞科剃须刀FS363",
				"时尚土豪金/充电显示灯/轻触式开关/弹出式修剪刀/双环贴面刀网",
				"12673",
				"5"
			],
			[
				"img/images/FS363_promo.jpg",
				"￥65.00",
				"飞科剃须刀FS363",
				"时尚土豪金/充电显示灯/轻触式开关/弹出式修剪刀/双环贴面刀网",
				"12673",
				"5"
			],
			[
				"img/images/FS363_promo.jpg",
				"￥65.00",
				"飞科剃须刀FS363",
				"时尚土豪金/充电显示灯/轻触式开关/弹出式修剪刀/双环贴面刀网",
				"12673",
				"5"
			],
			[
				"img/images/FS363_promo.jpg",
				"￥65.00",
				"飞科剃须刀FS363",
				"时尚土豪金/充电显示灯/轻触式开关/弹出式修剪刀/双环贴面刀网",
				"12673",
				"5"
			],
			[
				"img/images/FS363_promo.jpg",
				"￥65.00",
				"飞科剃须刀FS363",
				"时尚土豪金/充电显示灯/轻触式开关/弹出式修剪刀/双环贴面刀网",
				"12673",
				"5"
			],
			[
				"img/images/FS363_promo.jpg",
				"￥65.00",
				"飞科剃须刀FS363",
				"时尚土豪金/充电显示灯/轻触式开关/弹出式修剪刀/双环贴面刀网",
				"12673",
				"5"
			],
			[
				"img/images/FS363_promo.jpg",
				"￥65.00",
				"飞科剃须刀FS363",
				"时尚土豪金/充电显示灯/轻触式开关/弹出式修剪刀/双环贴面刀网",
				"12673",
				"5"
			],
			[
				"img/images/FS363_promo.jpg",
				"￥65.00",
				"飞科剃须刀FS363",
				"时尚土豪金/充电显示灯/轻触式开关/弹出式修剪刀/双环贴面刀网",
				"12673",
				"5"
			],
			[
				"img/images/FS363_promo.jpg",
				"￥65.00",
				"飞科剃须刀FS363",
				"时尚土豪金/充电显示灯/轻触式开关/弹出式修剪刀/双环贴面刀网",
				"12673",
				"5"
			],
			[
				"img/images/FS363_promo.jpg",
				"￥65.00",
				"飞科剃须刀FS363",
				"时尚土豪金/充电显示灯/轻触式开关/弹出式修剪刀/双环贴面刀网",
				"12673",
				"5"
			]
		];
		single_module(strmodule);
}

	function single_module(str){
		for(let i=0;i<str.length;i++){
			let oA=document.createElement("a");
			oA.style.cssText=`
				display:block;
				margin-right: 16px;
				margin-left: 16px;
				width: 530px;
				height:582px;
				font-family: "Microsoft Yahei", sans-serif;
				float:left;
			`;
			oA.href="#";
			$("#goodslistcenter").appendChild(oA);

			let oImg=document.createElement("img");
			 oImg.style.cssText=`
			 	text-align: center;
			 	margin:0 auto;
			 `;
			 oImg.src=str[i][0];
			 oA.appendChild( oImg);

			let op=document.createElement("p");
			op.style.cssText=`
				font-size:22px;
				color:#ff7c44;
				margin-left: 10px;
				font-weight: bold;
				line-height:40px;
			`;
			op.innerHTML=str[i][1];
			oA.appendChild(op);
			
			let oAs=document.createElement("a");
			oAs.style.cssText=`
				font-size:18px;
				color: #898989;
				line-height:22px;
				margin-left: 10px;
			`;
			oAs.href="#";
			oAs.innerHTML=str[i][2];
			oA.appendChild(oAs);
			
			 let ops=document.createElement("p");
			 ops.style.cssText=`
			 	font-size:18px;
			 	color: #898989;
			 	line-height:22px;
			 	margin-left: 10px;
			 `;
			 ops.innerHTML=str[i][3];
			 oA.appendChild(ops);

			let Span1=document.createElement("span");
			Span1.style.cssText=`
			 	font-size:17px;
			 	color:#000000;
			 	line-height:40px;
			 	margin-left: 10px;
			 `;
			Span1.innerHTML="本款产品月销售量";
			 oA.appendChild(Span1);
			
			let oEM=document.createElement("em");
			oEM.style.cssText=`
			 	font-style: normal;
			 	color:#ff7c44;
			 `;
			oEM.innerHTML=str[i][4];
			 Span1.appendChild(oEM);
	
			let Span2=document.createElement("span");
			Span2.style.cssText=`
			 	font-size:17px;
			 	color:#000000;
			 	line-height:40px;
			 	margin-left: 10px;
			 `;
			Span2.innerHTML="| 评价:";
			 oA.appendChild(Span2);

			let oEMs=document.createElement("em");
			oEMs.style.cssText=`
			 	font-style: normal;
			 	color:#ff7c44;
			 `;
			oEMs.innerHTML=str[i][5];
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
	