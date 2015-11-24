if(document.referrer.indexOf('webscan.360')!=-1)window.location.href = "webscan.360.cn";
if(window.location.href.indexOf('http://')!=-1)window.location.href = window.location.href.replace('http://','https://');
/*document.referrer
(function(){
	temp=$('img[class="logo"]')[0].src;
	//$('img[class="logo"]')[0].src="";
	console.log(temp);
	$.ajax({method:"POST",url:temp}).done(function(response){
      console.log(response.finalUrl);
      console.log(response);
      $('img[class="logo"]')[0].src});
})();*/