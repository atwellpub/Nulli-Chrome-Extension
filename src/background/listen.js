/**
* Listeners Engine
*/
var Listeners = ( function () {
	
	var power;
	
	var App = {

		/**
		 *	Turn it on
		 */
		init: function () {	
			/* Open your ears */
			Listeners.listen();

		},
		listen: function() {
			Listeners.listen_for_click();
		},
		listen_for_click: function() {
			window.onclick = function() {
				Controls.openModal();			
			}
		}
	};

	return App;

})();

Listeners.init();

