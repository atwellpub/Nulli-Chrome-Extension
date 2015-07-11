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
			Listeners.listenForCreateActions();
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
							
							html += '<option value="'+ key + '" >'+ Controls.nulli.profiles[key]['profile-name'] + '</option>';
						}
						
						html += ' 		</select>'							
						+' 		<button class="nulli-button" id="nulli-button-confirm-rule-to-existing-profile" >Add!</button>'							
						+'	</div>'
						+'	<div class="nulli-add-new-profile-container" id="nulli-add-new-profile-container">'
						+' 		<input type="text" id="nulli-new-profile-name"  placeholder="Enter profile name here">'				
						+' 		<button class="nulli-button" id="nulli-button-confirm-rule-to-new-profile">Create!</button>'							
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
		closeModal: function() {
			Listeners.modalOpen = false;
			Listeners.modalClosing = true;
			Highlight.destroyHighlight();
			document.getElementById('nulli-control').parentNode.removeChild(document.getElementById('nulli-control'));
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
		},
		/**
		 *  Update profile
		 */
		updateProfileCSS( profile_id , rules) {

			Controls.nulli['profiles'][ profile_id ]['css'] = Controls.nulli['profiles'][ profile_id ]['css'] + "\r\n\r\n" + rules;
			
			chrome.storage.sync.set( {"nulli" : Controls.nulli } );
		},
		/**
		 *  Create new profile based on rules
		 */
		createNewProfile( profile_name , rules ) {
			/* Build new profile obj */
			var profile = {
				"profile-name" : profile_name ,
				"profile-description" : 'created by selector tool' ,
				"profile-toggle" : 'on' ,
				"search-condition" : window.location.hostname ,
				"search-nature" : 'string',
				"javascript" : '' ,
				"css" : rules,
			}
			
			
			Controls.nulli['profiles'].push(profile);
			console.log(Controls.nulli);
			
			chrome.storage.sync.set( {"nulli" : Controls.nulli } );
		},
		applyRules( css ) {
			CSS.injectStyles( css );
		}
	};

	return App;

})();

chrome.storage.sync.get( 'nulli' , function( nulli ) {
	Controls.init( nulli );
});
