var Highlight = ( function () {
	var prevElement;
	var finalElement;
	var rule; 
	
	var App = {
		init: function() {
			Highlight.startFollowingCursor();
		},
		followCursor: function(e) {
			var elem = e.target || e.srcElement;
			
			if (Highlight.prevElement!= null) {Highlight.prevElement.classList.remove('nhighlight');} 
			
			/* design rule */
			if ( elem.id ) {
				Highlight.rule = 'body #' + elem.id	 + ' { display:none !important; } ';
			} else if ( elem.className ) {
				Highlight.rule = 'body .' + elem.className	 + ' { display:none !important; } ';
			} else {
				Highlight.rule = 'No id or classname discovered, go higher or handcraft.'
			}
			
			/* highlight */
			elem.classList.add('nhighlight');
			
			Highlight.prevElement = elem;
		},
		startFollowingCursor: function() {
			Highlight.prevElement = null;
			document.addEventListener( 'mousemove' , Highlight.followCursor , true);
		},
		stopFollowingCursor: function() {
			Highlight.finalElement = Highlight.prevElement;
			Highlight.prevElement = null;
			document.removeEventListener( 'mousemove' , Highlight.followCursor , true);
			
			/* add rule to textarea */
			document.getElementById('nulli-css-rules').value = Highlight.rule;
		},
		destroyHighlight: function() {
			Highlight.finalElement.classList.remove('nhighlight');
		}
	};

	return App;

})();

Highlight.init();