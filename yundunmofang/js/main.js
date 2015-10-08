window.onload = function(){
	document.getElementById("slide-top").onclick = function(){
		/*回到顶部按钮*/
		document.documentElement.scrollTop = document.body.scrollTop =0;
	}
	document.getElementById("activeDiv").isActive=false;
	bindEvent(document.getElementById("activeDiv"),"webkitAnimationEnd",css3AnimateEnd);
	bindEvent(document.getElementById("activeDiv"),"animationend",css3AnimateEnd);

	if(document.addEventListener){
		document.addEventListener('DOMMouseScroll',scrollFunc,false);
	}
	window.onmousewheel=document.onmousewheel=document.onkeydowm=scrollFunc;//IE/Opera/Chrome
}

function scrollFunc(e){
	var page1Div = document.getElementById("activeDiv");
	var page2Div=document.getElementById("activeDiv2");
	if(page1Div.isActive) return;
	var preClass=page1Div.className;
	if(page1Div.style.display!="none"){
		//page1占据整个页面时		
		if (!isScrollUp(e)) {//滚动条向上滑动	
			isForbiddenBodyScroll(true);
			document.documentElement.scrollTop = document.body.scrollTop =0;
			page1Div.className =preClass+" toHigh";
			page1Div.style.display="block";
			page1Div.isActive=true;
			page2Div.style.display="block";
		}		
	}
	else if(document.body.scrollTop==0 && document.documentElement.scrollTop==0){
		//page2在浏览器中，为初始化状态，且滚动条向上滑动
		console.info(document.body.scrollTop);
		isForbiddenBodyScroll(true);
		document.documentElement.scrollTop = document.body.scrollTop =0;
		page1Div.className =preClass+" toLow";
		page1Div.style.display="block";
		page1Div.isActive=true;		
	}
}
function isScrollUp(e){
	/*在非firefox浏览器中，滚轮向上滚动返回的数值是120，向下滚动返回-120
		而在firefox浏览器中，滚轮向上滚动返回的数值是-3，向下滚动返回3
	*/
	if(e.wheelDelta){
		return e.wheelDelta>=0 ? true : false;
	}
	else 
		return e.detail>0 ? false : true;
}
function bindEvent(node,eventName,funcName){
	if(document.addEventListener){
		node.addEventListener(eventName,funcName);
	}
	else{
		node.attachEvent(eventName,funcName,false);
	}
}
function css3AnimateEnd(){
	var page1=document.getElementById("activeDiv");
	var page2=document.getElementById("activeDiv2");		
	if(page1.className.indexOf("toLow")>=0){
		page2.style.display="none";
	}else if(page1.className.indexOf("toHigh")>=0){
		page1.style.display="none";
	}		
	page1.className="page page1";
	page1.isActive=false;	
	isForbiddenBodyScroll(false);//恢复浏览器效果
}
function isForbiddenBodyScroll(isFbd){
	//true为禁用，false为不禁用
	if(isFbd){
		document.body.onmousewheel=function(){
			return false;
		}
	}
	else{
		document.body.onmousewheel=function(){
			return true;
		}
	}
}
