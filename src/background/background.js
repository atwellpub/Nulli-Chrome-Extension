/**
* Selector Engine
*/
var Selector = ( function () {
	
	var power;
	
	var App = {

		/**
		 *	Initialize the Profile Management Section
		 */
		init: function () {	
			console.log('Starting Background dot JS');
			Selector.listen();
		},
		listen: function() {
			/* listen for selector button  */
			chrome.runtime.onMessage.addListener( function (message, sender, sendResponse) {
					
				/* check message */
				if (!message.clicked) {
					return;
				}
				
				/* Log click */
				console.log('Selector Clicked');
				
				/* load Highlight class into DOM */
				if ( !Selector.power ) {
					
					/* enable highlight */
					chrome.tabs.executeScript({
						file: 'src/background/highlight.js'
					});
					
					/* enable controls */
					chrome.tabs.executeScript({
						file: 'src/background/controls.js'
					});
					
					/* enable listeners */
					chrome.tabs.executeScript({
						file: 'src/background/listen.js'
					});
					
					/* enable css */
					chrome.tabs.executeScript({
						file: 'src/background/css.js'
					});					
				} else {

				}				
				
				/* Tell the boss we're cookin. */
				Selector.power = false;
			});
		}
	};

	return App;

})();

Selector.init();

