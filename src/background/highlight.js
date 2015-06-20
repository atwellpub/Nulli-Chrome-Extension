var Highlight = ( function () {
	var prevElement;
	var rule; 
	
	var App = {
		init: function() {
			console.log('Highlight.init()');
			Highlight.startFollowingCursor();
		},
		followCursor: function(e) {
			var elem = e.target || e.srcElement;
			
			if (prevElement!= null) {prevElement.classList.remove('nhighlight');} 
			
			
			/* design rule */
			if ( elem.id ) {
				Highlight.rule = 'body #' + elem.id	 + ' { display:hidden } ';
			} else if ( elem.className ) {
				Highlight.rule = 'body .' + elem.className	 + ' { display:hidden } ';
			} else {
				Highlight.rule = 'No id or classname discovered, go higher.'
			}
			
			/* highlight */
			elem.classList.add('nhighlight');
			
			prevElement = elem;
		},
		startFollowingCursor: function() {
			console.log('highlight enabled');
			Highlight.prevElement = null;
			document.addEventListener( 'mousemove' , Highlight.followCursor , true);
		},
		stopFollowingCursor: function() {
			console.log('highlight disabled');
			Highlight.prevElement = null;
			document.removeEventListener( 'mousemove' , Highlight.followCursor , true);
			
			/* add rule to textarea */
			document.getElementById('nulli-css-rules').value = Highlight.rule;
		}
	};

	return App;

})();

Highlight.init();