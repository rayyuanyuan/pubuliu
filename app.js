window.onload = function(){
    imgLocation('container','box');
    var imgData = {"data":[{'src':"02.jpg"},{'src':"03.jpg"},{'src':"05.jpg"},{'src':"06.jpg"}]}
    window.onscroll = function(){
         if(checkFlag()){
         	var cparent = document.getElementById('container');
         	for(var i=0;i<imgData.data.length;i++){
         		var ccontent = document.createElement("div");
         		ccontent.className="box";
         		cparent.appendChild(ccontent);
         		var boxing = document.createElement('div');
         		boxing.className = "img_box";
         		ccontent.appendChild(boxing);
         		var img = document.createElement('img');
         		img.src = "images/" + imgData.data[i].src;
         		boxing.appendChild(img);
         	}
         	imgLocation('container','box');
         }
    }
}

function checkFlag(){
	var cparent = document.getElementById('container');
	var ccontent = getChildElement(cparent,"box");
	var lastContentHeight = ccontent[ccontent.length-1].offsetTop;
	var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
	var pageHeight = document.documentElement.clientHeight||document.body.clientHeight;
	//console.log(lastContentHeight+":"+scrollTop+":"+pageHeight);
    if(lastContentHeight<scrollTop+pageHeight){
    	return true;
    }
}

function imgLocation(parent,content){
	var cparent = document.getElementById(parent);
	var ccontent = getChildElement(cparent,content);
	var imgWidth = ccontent[0].offsetWidth;
	var cols = Math.floor(document.documentElement.clientWidth / imgWidth);
	cparent.style.cssText = "width:"+imgWidth*cols+"px;margin:0 auto;";

	var BoxHeightArr = [];
	for(var i=0;i<ccontent.length;i++){
		if(i<cols){
		    BoxHeightArr[i] = ccontent[i].offsetHeight;
		}else{
			var minheight = Math.min.apply(null,BoxHeightArr);
			var minIndex = getimiheightLocation(BoxHeightArr,minheight);
		
			ccontent[i].style.position = 'absolute';
			ccontent[i].style.top = minheight+"px";
            ccontent[i].style.left = ccontent[minIndex].offsetLeft+'px';
            BoxHeightArr[minIndex] = BoxHeightArr[minIndex] + ccontent[i].offsetHeight;
		}
	}
}

function getimiheightLocation(BoxHeightArr,minheight){
	for(var i in BoxHeightArr){
		if(BoxHeightArr[i] == minheight){
			return i;
		}
	}
}

function getChildElement(parent,content){
	var contentArr = [];
	var allcontent = parent.getElementsByTagName("*");
	for(var i=0;i<allcontent.length;i++){
		if(allcontent[i].className==content){
			contentArr.push(allcontent[i]);
		}
	}
	return contentArr;
}

