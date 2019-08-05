class CreateMenu{
	constructor(obj,boxDom,objDatas){
			this.boxDom = boxDom;
			this.objDatas = objDatas;
			let defaultObj = {
				url:null,
				picText:"STORM ORIGIN",
				btnTop:164,
				btnRight:370,
				pTop:95,
				pRight: 480,
			}
	
			for(let key in defaultObj){
				if(obj[key]){
					this[key] = obj[key];
				}else{
					this[key] = defaultObj[key];
				}
			}
			this.render();
			this.event();
		}
	
		render(){
			this.boxDom.innerHTML=`
				<img src=${this.url} style="float: right;">
				<p style="position: absolute;
					font-weight: 600;
					color: #ffffff;
					font-size: 24px;
					top:${this.pTop}px;
					right:${this.pRight}px;">${this.picText}
				</p>
				<a href="#" class="hoverBtns" style="
					display:block;
					width: 200px;
					height: 50px;
					background: #ffffff;
					color: #222222;
					font-size: 16px;
					position: absolute;
					top:${this.btnTop}px;
					right:${this.btnRight}px;
					text-align: center;
					line-height: 50px;
					font-weight: 600;
				">立即选购</a>
			`;
			
			for(var key in this.objDatas){
				var divDom=document.createElement("div");
				this.boxDom.appendChild(divDom);
				divDom.style.cssText=`
					padding-top: 45px;
					float:left;
					width: 125px;
				`;
				for(var i=0;i<this.objDatas[key].length;i++){
					divDom.innerHTML+=`<a href="#" class="aDoms" style="
										box-sizing:border-box;
										display: block;
										font-size: 15px;
										line-height: 18px;
										padding-bottom: 32px;
										color: #222222;"> <span>${this.objDatas[key][i]}</span>
										</a>`;
				}
			}
		}
		event(){
			var aDoms=document.getElementsByClassName("aDoms");
			for(var i=0;i<aDoms.length;i++){
				aDoms[i].onmouseover=function(){
					for(var j=0;j<aDoms.length;j++){
						aDoms[j].style.background="white";
						aDoms[j].style.color="#222222";
						aDoms[j].firstElementChild.style.borderBottom="2px solid transparent";
					}
					this.style.background="#ffffff";
					this.style.color="#ff0000";
					this.firstElementChild.style.borderBottom="2px solid #ff0000";
				}
				aDoms[i].onmouseout=function(){
					this.style.background="white";
					this.style.color="#222222";
					this.firstElementChild.style.borderBottom="2px solid transparent";
				}
			}
			
			var hoverBtns=document.getElementsByClassName("hoverBtns");
			for(var i=0;i<hoverBtns.length;i++){
				hoverBtns[i].onmouseover=function(){
					this.style.background="#eeeeee";
				}
				hoverBtns[i].onmouseout=function(){
					this.style.background="#ffffff";
				}
			}
		}
	
	}