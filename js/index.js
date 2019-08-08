	
function funnav(){
		let oli=$("#nav").children;
		for(let i=0;i<oli.length;i++){
			oli[i].index=i;
			oli[i].onmouseover=function(){
				for(let i=0;i<oli.length;i++){
					oli[i].style.background="";
					if($(".show-wrap")[i]){
						$(".show-wrap")[i].style.display="none";	
					}
				}
				oli[this.index].style.background="#0c82d9"
				let that = this;
				new Navinfo("json/dates"+(i+1)+".json",that);
			}
			oli[i].onmouseleave=function(){
				oli[this.index].style.background="";
				for(let j=0;j<$(".show-wrap").length;j++){
					$(".show-wrap")[j].style.display="none";
				}
			}
		}
	}

	class Navinfo{
		constructor(objstr,objdom){
			this.objstr=objstr;
			this.getdate();	
			this.dom = objdom;
		}	
		//发送请求获取数据
		getdate(){
			var ajax = new XMLHttpRequest();
			var data=null;
			ajax.onreadystatechange=()=>{
				if (ajax.readyState == 4 && ajax.status == 200) {
					data=JSON.parse(ajax.responseText);
					this.func(data);
				}
			}
			ajax.open("GET",this.objstr,true); //true表示异步请求。false表示同步请求
			ajax.send(null);
		}
		
		//数据呈现出现
		func(data){
			let htmlstr="";
			let infowidth=264.5;
			let infoheight=76.5;
			let col=data.length/6;
			
			let showwrap=document.createElement("div");
			showwrap.className="show-wrap";
			showwrap.style.cssText=`
					width:${Math.ceil(col)*infowidth}px;
					height:459px;
					border:1px solid #d6d8d9;
					border-left:none;
					position:absolute;
					left:183px;
					top:0;
					z-index:10;
					background:#ffffff;
			`;
			this.dom.appendChild(showwrap);
			for(let i=0;i<data.length;i++){
				htmlstr+=`
				<a style="
					width:265px;
					height:76.5px;
					position:absolute;
					left:${Math.floor(i/6)*infowidth}px;
					top:${i%6*infoheight}px;
				">	
				   <img src=${data[i].img} style="
						width:40px;
						height:40px;
						margin-left:20px;
						vertical-align:middle;
				   " >	
				   <span style="
						display:inline-block;
						text-indent:16px;
						font-size:12px;
						line-height:76.5px;
						color:#333333;
						vertical-align:middle">
						${data[i].name}</span>	
				   <p style="
						float:right;
						width:58px;
						height:22px;
						line-height:22px;
						margin-right:10px;
						margin-top:26.25px;
						display:inline-block;
						border:1px solid #26a3ff;
						font-size:12px;
						color:#2fa7ff;
						text-align:center;
				   ">${data[i].mark}</p>
				</a>
				`;	
				showwrap.innerHTML=htmlstr;
				}
				
			}
	}




	