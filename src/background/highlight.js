var Highlight = ( function () {
	var prevElement;
	
	var App = {
		init: function() {
			Highlight.startFollowingCursor();
		},
		followCursor: function(e) {
			var elem = e.target || e.srcElement;
			if (prevElement!= null) {prevElement.classList.remove('nhighlight');} 
			elem.classList.add('nhighlight');
			prevElement = elem;
		},
		startFollowingCursor: function() {
			console.log('highlight enabled');
			Highlight.prevElement = null;
			document.addEventListener( 'mousemove' , Highlight.followCursor , true);
			Highlight.switch = true;
		},
		stopFollowingCursor: function() {
			console.log('highlight disabled');
			Highlight.prevElement = null;
			document.removeEventListener( 'mousemove' , Highlight.followCursor , true);
		}
	};

	return App;

})();

Highlight.init();