/**
* Listeners Engine
*/
var CSS = ( function () {

	var App = {
		/**
		 * load styles
		 */
		init: function() {
			console.log('CSS styles loaded');
			CSS.injectStyles('.nhighlight{ background-color: #bcd5eb !important; outline: 2px solid #5166bb !important; }');			
		},
		injectStyles: function( rule ) {
			var style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML = rule;
			document.getElementsByTagName('head')[0].appendChild(style);				
		}
	
	};

	return App;

})();

CSS.init();

			