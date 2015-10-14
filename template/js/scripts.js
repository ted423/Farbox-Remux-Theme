/* search function */
function search() {
	if (document.getElementById('search-bar').value) {
		location.href = 'http://' + location.host + '?s=' + document.getElementById('search-bar').value
	}
	else {
		return false;
	}
}

function displayFix(){
	a=document.getElementsByTagName('a');
	[].forEach.call(a,function(unit){
		if(unit.getClientRects()[1]&&(unit.textContent.indexOf('https://')!=-1||unit.textContent.indexOf('http://')!=-1||unit.textContent.indexOf('ed2k://')!=-1||unit.textContent.indexOf('magnet:?xt=urn:btih:')!=-1)&&unit.textContent.length>30){
			length=unit.getClientRects()[0].width/10;
			max=unit.getClientRects().length;
			for(i=1;i<max;i++)
			{
				temp=unit.getClientRects()[i].width/10;
				if (temp>length)length=temp;
			}
			unit.textContent=unit.href.slice(0,length)+'...';
		}
		else if (unit.textContent.substr(-3).indexOf('...')!=-1&&(unit.textContent.indexOf('https://')!=-1||unit.textContent.indexOf('http://')!=-1||unit.textContent.indexOf('ed2k://')!=-1||unit.textContent.indexOf('magnet:?xt=urn:btih:')!=-1)){
			unit.textContent=unit.href;
			if(unit.getClientRects()[1]&&(unit.textContent.indexOf('https://')!=-1||unit.textContent.indexOf('http://')!=-1||unit.textContent.indexOf('ed2k://')!=-1||unit.textContent.indexOf('magnet:?xt=urn:btih:')!=-1)&&unit.textContent.length>30)
			{
				length=unit.getClientRects()[0].width/10;
				max=unit.getClientRects().length;
				for(i=1;i<max;i++)
				{
					temp=unit.getClientRects()[i].width/10;
					if (temp>length)length=temp;
				}
				//由于取href的值，需要重新编码
				var a=unit.href.split(/%(?![A-Fa-f0-9]{2})/);
				var tempS="";
				for(i=0;i<a.length;i++){
					tempS+=(decodeURIComponent(a[i]));
					if(i!=a.length-1)
						tempS+="%";
				}
				unit.textContent=tempS.slice(0,length)+'...';
			}
		}
	})
	pre=document.getElementsByTagName('pre');

	[].forEach.call(pre,function(unit){
		if(window.outerHeight >= screen.availHeight&&window.outerWidth >= screen.availWidth/*FF、IE下会大16*/)unit.style.width="";
		if(unit.getClientRects()[0].width>document.getElementsByClassName('post')[0].getClientRects()[0].width){
			unit.style.width="100%";

		}
	})
}

/* search bar toggle */
$(document).ready(function () {
	$(".sidebar #search").click(function () {
		$(".sidebar .search-bar").slideToggle("250");
		$(".sidebar #search a").toggleClass("selected");
		$("#search-bar").focus();
	});

	if (location.search.indexOf('?s=')==0){
		$(".sidebar #search").click()
	}
});

/* responsive menu */
$(document).ready(function () {
	$("#switch").click(function () {
		$(".nav").slideToggle("250");
		$(".infobar").slideToggle("250");
		$("#switch").toggleClass("switch_current");
	});
	$(window).resize(function () {
		if ($('.logo').width() > 100){
			$(".nav").show();
			$(".infobar").show();
		}
	});
	$(window).resize(function () {
		if ($('.logo').width() < 100){
			$(".nav").hide();
			$(".infobar").hide();
		}
	});
});


/* smooth scroll */
$(function () {
	$('a[href*=#]:not([href=#])').click(function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 250);
				return false;
			}
		}
	});
});


$(function () {
	//code add button
	var code = document.querySelectorAll('pre>code');
	[].forEach.call(code,function(unit){
		var btn = document.createElement("span");
		btn.className = 'select-btn'
		btn.innerHTML= '<i class="fa fa-code" title="点击全选"></i>';
		btn.onclick = function(){
			var target =this.nextSibling;
			var range = document.createRange();
			var startOffset = 0;
			range.setStart(target,startOffset);
			range.setEnd(target,target.childNodes.length);
			var copy=window.getSelection();
			copy.addRange(range);
		}
		unit.parentNode.insertBefore(btn,unit);
	})
	var code = document.querySelectorAll('.codehilite pre');
	[].forEach.call(code,function(unit){
		var btn = document.createElement("span");
		btn.className = 'select-btn'
		btn.innerHTML= '<i class="fa fa-code" title="点击全选"></i>';
		btn.onclick = function(){
			var target =this.parentNode;
			var range = document.createRange();
			var startOffset = 0;
			range.setStart(target,startOffset);
			range.setEnd(target,target.childNodes.length);
			var copy=window.getSelection();
			copy.addRange(range);
		}
		unit.insertBefore(btn,unit.firstChild);
	})
});



(function(){
	//add onedrive notice
	var a =document.querySelectorAll("a[href*='https://onedrive.live.com']");
	[].forEach.call(a,function(each){
		each.setAttribute('title','可能需要使用host才能正常访问');
	})

	//ol fix
	lis=document.querySelectorAll('ol>li');
	[].forEach.call(lis,function(li){
		if(li.firstChild.nodeName=="#text"){
			p=document.createElement('p');
			p.innerHTML=li.innerHTML;
			while(li.childNodes.length!=0)
				li.childNodes[0].remove();
			if(li.firstChild){li.insertBefore(p,li.firstChild)}
				else li.appendChild(p);
		}
		else if (li.firstChild.nodeName!="P"){
			p=document.createElement('p');
			if(li.firstChild){li.insertBefore(p,li.firstChild)}
		}
})
	displayFix();
})();

window.onload=displayFix();

window.onresize=function(){
	displayFix();
};