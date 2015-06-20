/**
* Listeners Engine
*/
var Controls = ( function () {
	
	var App = {

		init: function () {				
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
			div.innerHTML = Controls.getModalHtml();
			document.body.appendChild(div);		
		},
		getModalHtml: function() {
			var html =   '<div id="nulli-rules-container" draggable="true" style="display:none;width:338px;height:144px;background-color:#000;color:#fff;position:fixed;left:1px;bottom:100px;text-align:right;">'
						+' <div class="handle" style="width:100%;height:20px;background-color:#4CA454;cursor:move;text-align:left">&nbsp;</div>'
						+' <div class="nulli-note" style="">CSS</div>'
						+'	<textarea id="nulli-css-rules"warp="hard" style="background: #1d1f21;color:#9b869c;width:98%;height;90%;  font-family: \'Source Code Pro\', Menlo, Consolas, Monaco, monospace; font-size: 0.9rem;  background: none;  padding: 15px;  white-space: pre;  overflow: none; display: block; border:none;">'
						+'	</textarea>'
						+'	<div class="nulli-actions">'
						+' 		<button class="nulli-button">Add rule to existing profile</button>'
						+'		<button class="nulli-button">Add rule to new profile</button>'
						+'	</div>'
						+'</div>';
			return html;
		},
		openModal: function() {
			console.log('run openModal');
			Highlight.stopFollowingCursor();
			document.getElementById('nulli-rules-container').style.display = 'block';
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


Controls.init();
