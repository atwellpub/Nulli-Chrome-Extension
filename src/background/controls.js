/**
* Listeners Engine
*/
var Controls = ( function () {

	var App = {

		init: function () {				
			Controls.injectModal();
		},
		injectModal: function() {
			console.log('injected hidden modal into dom');
			
			var div = document.createElement('div');
			div.className = 'nulli-control';
			div.innerHTML = Controls.getModalHtml();
			document.body.appendChild(div);		
		},
		getModalHtml: function() {
			return '<div class="container"></div>';
		},
		openModal: function() {
			Highlight.stopFollowingCursor();
		}
	
	};

	return App;

})();


Controls.init();
