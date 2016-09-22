/* search function */
function search() {
	if (document.getElementById('search-bar').value) location.href = '//' + location.host + '?s=' + document.getElementById('search-bar').value;
	else return false;
}

function displayFix() { //判断链接是否超出一行，是的话调整为1行
	$("a").each(function() {
		var reg = /((https?)|(ed2k):\/\/)|(magnet\:\?xt\=urn\:btih\:)/i;
		if (this.getClientRects()[1] && reg.test(this.textContent)) {
			length = this.getClientRects()[0].width / 11;
			max = this.getClientRects().length;
			for (i = 1; i < max; i++) {
				temp = this.getClientRects()[i].width / 11;
				if (temp > length) length = temp;
			}
			//由于取href的值，需要重新编码
			var a = this.href.split(/%(?![A-Fa-f0-9]{2})/);
			var tempS = "";
			for (i = 0; i < a.length; i++) {
				tempS += (decodeURIComponent(a[i]));
				if (i != a.length - 1)
					tempS += "%";
			}
			this.textContent = tempS.slice(0, length) + '...';
		} else if (this.textContent.substr(-3).indexOf('...') != -1 && reg.test(this.textContent)) { //先还原，然后再次调整
			//由于取href的值，需要重新编码
			var array = this.href.split(/%(?![A-Fa-f0-9]{2})/);
			var tempS = "";
			for (i = 0; i < array.length; i++) {
				tempS += (decodeURIComponent(array[i]));
				if (i != array.length - 1)
					tempS += "%";
			}
			this.textContent = tempS;
			if (this.getClientRects()[1] && reg.test(this.textContent)) {
				length = this.getClientRects()[0].width / 11;
				max = this.getClientRects().length;
				for (i = 1; i < max; i++) {
					temp = this.getClientRects()[i].width / 11;
					if (temp > length) length = temp;
				}
				//由于取href的值，需要重新编码
				var a = this.href.split(/%(?![A-Fa-f0-9]{2})/);
				var tempS = "";
				for (i = 0; i < a.length; i++) {
					tempS += (decodeURIComponent(a[i]));
					if (i != a.length - 1)
						tempS += "%";
				}
				this.textContent = tempS.slice(0, length) + '...';
			}
		}
	})
	$('pre').each(function() {
		if (window.outerHeight >= screen.availHeight && window.outerWidth >= screen.availWidth /*FF、IE下会大16*/ ) this.style.width = "";
		if (this.getClientRects()[0].width > document.getElementsByClassName('post')[0].getClientRects()[0].width) {
			this.style.width = "100%";

		}
	})
}

/* search bar toggle */
$(document).ready(function() {
	$(".sidebar #search").click(function() {
		$(".sidebar .search-bar").slideToggle("250");
		$(".sidebar #search a").toggleClass("selected");
		$("#search-bar").focus();
	});

	if (location.search.indexOf('?s=') == 0) {
		$(".sidebar #search").click()
	}
});

/* responsive menu */
$(document).ready(function() {
	$("#switch").click(function() {
		$(".nav").slideToggle("250");
		$(".infobar").slideToggle("250");
		$("#switch").toggleClass("switch_current");
	});
	$(window).resize(function() {
		if ($('.logo').width() > 100) {
			$(".nav").show();
			$(".infobar").show();
		}
	});
	$(window).resize(function() {
		if ($('.logo').width() < 100) {
			$(".nav").hide();
			$(".infobar").hide();
		}
	});
});

/* smooth scroll */
$(function() {
	$('a[href*=#]:not([href=#])').click(function() {
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

$(function() {
	//code add button
	$('pre>code,.codehilite pre').each(function() {
		var btn = document.createElement("span");
		btn.className = 'select-btn'
		btn.innerHTML = '<i class="fa fa-code" title="点击全选"></i>';
		btn.onclick = function() {
			var target = this.previousSibling;
			var range = document.createRange();
			range.setStart(target, 0);
			range.setEnd(target, target.childNodes.length);
			document.getSelection().removeAllRanges();
			document.getSelection().addRange(range);
		}
		$(btn).insertAfter(this);
	})
});

(function() {
	//add onedrive notice
	$("a[href*='https://onedrive.live.com']").attr('title', '可能需要使用host才能正常访问');
	//ed2k UTF-8再编码
	$("a[href*='ed2k://']").each(function() {
		this.href = decodeURIComponent(this.href)
	});

	//ol fix
	lis = document.querySelectorAll('ol>li');
	[].forEach.call(lis, function(li) {
		if (li.firstChild.nodeName == "#text" || getComputedStyle(li.firstChild).display == "inline") {
			p = document.createElement('p');
			if (li.firstChild.nodeName == "#text") p.innerHTML = li.firstChild.textContent;
			else p.innerHTML = li.firstChild.outerHTML;
			that = li.firstChild;
			while (that.nextSibling && (that.nextSibling.nodeName == "#text" || getComputedStyle(that.nextSibling).display == "inline")) { //处理文字+inline元素的情况
				if (that.nextSibling.nodeName == "#text") p.innerHTML += that.nextSibling.textContent;
				else p.innerHTML += that.nextSibling.outerHTML;
				$(that.nextSibling).remove();
			}
			$(li.childNodes[0]).remove();
			if (li.firstChild) li.insertBefore(p, li.firstChild)
			else li.appendChild(p);
		} else if (li.firstChild.nodeName != "P" && li.firstChild.nodeName != "H6" && getComputedStyle(li.firstChild).display == "block") {
			p = document.createElement('p');
			if (li.firstChild) li.insertBefore(p, li.firstChild);
		}
	});
	$('li>code').each(function() {
		if ($(this).text().substring(0, 1) == "\n") {
			pre = document.createElement("pre");
			pre.innerHTML = "<code>" + this.innerHTML.substring(1) + "</code>"
			$(this).replaceWith(pre);
		}
	});
})();

window.onload = displayFix();

window.onresize = function() {
	displayFix();
};