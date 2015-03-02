document.querySelector('.source').addEventListener('mousedown',function(event){
	if(event.button==1)
		window.open(window.location.href+'?action=show_raw', '_blank')
})
