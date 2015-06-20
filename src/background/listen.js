/**
* Listeners Engine
*/
var Listeners = ( function () {
	var open;
	
	var App = {
		
		/**
		 *	Turn it on
		 */
		init: function () {	
			/* Open your ears */
			Listeners.listen();
			
		},
		listen: function() {
			Listeners.listen_for_selection_click();
		},
		/**
		 *  Perform these events when user selects element
		 */
		listen_for_selection_click: function() {
			window.onclick = function() {
				/* listen for selection and open modal */
				Controls.openModal();
				
			}
		}
	};

	return App;

})();

Listeners.init();

