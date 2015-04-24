/*
* Selector engine
*
*/
var BrowserActions = ( function () {

	var App = {

		/**
		 *	Initialize the Profile Management Section
		 */
		init: function () {
			BrowserActions.load_language();			
			BrowserActions.listen_selector();			
		},
		/**
		 *  Applies i18n to language strings and adds them to DOM
		 */
		load_language: function() {
			document.getElementById("add").innerHTML = i18n.get('Add New Rule');
			document.getElementById("manage").innerHTML = i18n.get('Manage Rules');
			document.getElementById("selector").innerHTML = i18n.get('Selector');
		},
		/**
		 *  Add listener for selector click
		 */
		listen_selector: function() {
			document.getElementById("selector-btn").addEventListener("click", function(){				
				chrome.runtime.sendMessage({clicked : true});
				console.log('Selector Clicked');
			});
		}
	};

	return App;

})();

BrowserActions.init();