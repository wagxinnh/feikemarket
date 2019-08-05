	function funnav(){
		let oli=$("#nav").children;
		let showwrap=$(".show-wrap");
		for(let i=0;i<oli.length;i++){
			oli[i].index=i;
			let oA=showwrap[i].children;
			var height=oA[0].offsetHeight;
			var width=oA[0].offsetWidth;
			var length=oA.length;
			var col=Math.ceil(length/6);
			showwrap[i].style.width=col*width+"px";
			showwrap[i].style.height="459px";
			for(let j=0;j<oA.length;j++){
				var x=Math.floor(j/6);
				var y=j%6;
				oA[j].style.left=x*width+"px";
				oA[j].style.top=y*height+"px";
			}
			showwrap[i].style.display="none";
			oli[i].onmouseover=function(){
				for(let i=0;i<oli.length;i++){
					oli[i].style.background="";
				}
				oli[this.index].style.background="#0c82d9"
				showwrap[i].style.display="block";
			}
			oli[i].onmouseout=function(){
				showwrap[i].style.display="none";
				oli[i].style.background="";
			}
		}
	}
	
