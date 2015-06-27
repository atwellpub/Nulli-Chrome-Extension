/**
* Listeners Engine
*/
var Controls = ( function () {
	var nulli;
	var selected;
	
	var App = {

		init: function ( nulli ) {	
			Controls.nulli = nulli.nulli;
			Controls.injectModal();
			Controls.disableLinks();
		},
		injectModal: function() {

			/* ignore if already injected */
			if ( document.getElementById('nulli-rules-container') ) {
				return;
			}
			
			console.log('injected hidden modal into dom');
			
			var div = document.createElement('div');
			div.className = 'nulli-control';
			div.id = 'nulli-control';
			div.innerHTML = Controls.getModalHtml();
			document.body.appendChild(div);	

			/* setup listners */
			Listeners.modalOpen = false;			
			Listeners.modalClosing = false;			
			Listeners.listen_for_box_drag();
			Listeners.listenForModalClose();
			Listeners.listenForAddActions();
		},
		getModalHtml: function() {
			var html =   '<div class="nulli-control-container"  id="nulli-control-container"  >'
						+' 	<div class="nulli-handle" id="nulli-handle" style=""><span id="nulli-close">X</span></div>'
						+'	<div class="nulli-rules-preview-container"  id="nulli-rules-preview-container" draggable="true" >'
						/* +' 		<div class="nulli-note" style="">CSS</div>' */
						+'			<textarea id="nulli-css-rules"warp="hard" style="">'
						+'			</textarea>'
						+'			<div class="nulli-actions">'
						+' 				<button class="nulli-button" id="nulli-button-add-rule-to-existing-profile" >Add rule to existing profile</button>'
						+'				<button class="nulli-button" id="nulli-button-add-rule-to-new-profile">Add rule to new profile</button>'
						+'			</div>'
						+'	</div>'
						+'	<div class="nulli-add-to-profiles-container" id="nulli-add-to-profiles-container">'
						+' 		<select id="nulli-selected-profile">';

						for( key in Controls.nulli.profiles ) {
							if ( !Controls.nulli.profiles[key] ) {
								continue;
							}
							
							html += '<option value="'+ Controls.nulli.profiles[key]['profile-name'] + '" >'+ Controls.nulli.profiles[key]['profile-name'] + '</option>';
						}
						
						html += ' 		</select>'							
						+' 		<button class="nulli-button" id="nulli-button-confirm-rule-to-existing-profile" >Add!</button>'							
						+'	</div>'
						+'	<div class="nulli-add-new-profile-container" id="nulli-add-new-profile-container">'
						+' 		<input type="text" id="nulli-new-profile-name"  placeholder="Enter profile name here">'				
						+' 		<button class="nulli-button" id="nulli-button-confirm-rule-to-existing-profile">Create!</button>'							
						+'	</div>'
						+'</div>';
	
			return html;
		},
		openModal: function() {
			Highlight.stopFollowingCursor();
			document.getElementById('nulli-control').style.display = 'block';
		},
		/**
		 *  Fires when the handle is clicked
		 */
		dragModalInit: function(elem) {
			if (!elem) {
				return;
			}
			selected = elem;
			x_elem = x_pos - selected.offsetLeft;
			y_elem = y_pos - selected.offsetTop;
		},
		dragModalMove: function(e) {
			x_pos = document.all ? window.event.clientX : e.pageX;
			y_pos = document.all ? window.event.clientY : e.pageY;

			if ( typeof selected != 'undefined' && selected ) {
				selected.style.left = (x_pos - x_elem) + 'px';
				selected.style.top = (y_pos - y_elem) + 'px';
			}
		},
		dragModalRelease: function() {
			selected = null;
		},
		/**
		 *  Disables Links on Page
		 */
		disableLinks: function() {
			var anchors = document.getElementsByTagName("a");
			for (var i = 0; i < anchors.length; i++) {
				anchors[i].onclick = function() {return(false);};
			}
		},
		/**
		 *  Enables Links on Page
		 */
		enableLinks: function() {
			var anchors = document.getElementsByTagName("a");
			for (var i = 0; i < anchors.length; i++) {
				anchors[i].onclick = function() {return(true);};
			}
		}
	};

	return App;

})();

chrome.storage.sync.get( 'nulli' , function( nulli ) {
	Controls.init( nulli );
});
