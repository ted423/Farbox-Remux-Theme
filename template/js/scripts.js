/* search function */
function search() {
    if (document.getElementById('search-bar').value) {
        location.href = 'http://' + location.host + '?s=' + document.getElementById('search-bar').value
    }
    else {
        return false;
    }
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

//code add button
$(function () {
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
        //console.log(unit.firstChild);
        unit.insertBefore(btn,unit.firstChild);
    })
});