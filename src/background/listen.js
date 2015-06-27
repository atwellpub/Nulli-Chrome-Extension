/**
* Listeners Engine
*/
var Listeners = ( function () {
	var modalOpen;
	var modalClosing;

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
			document.onmousemove = Controls.dragModalMove;
			document.onmouseup = Controls.dragModalRelease;
		},
		/**
		 *  Perform these events when user selects element
		 */
		listen_for_selection_click: function() {
			window.onclick = function() {
				if ( ! Listeners.modalOpen && !Listeners.modalClosing ) {
					/* mark modal as open inside this class */
					Listeners.modalOpen = true;
					Listeners.modalClosing = false;
					
					/* listen for selection and open modal */
					Controls.openModal();
				}
			}
		},
		listen_for_box_drag: function() {
			document.getElementById('nulli-handle').onmousedown = function () {
				Controls.dragModalInit( document.getElementById('nulli-control') );
				return false;
			};
		},
		/**
		 *  This listener destroys the modal completely
		 */
		listenForModalClose: function() {
			document.getElementById('nulli-close').onmousedown = function () {
				Listeners.modalOpen = false;
				Listeners.modalClosing = true;
				Highlight.destroyHighlight();
				document.getElementById('nulli-control').parentNode.removeChild(document.getElementById('nulli-control'));
				return false;
			};
		},
		listenForAddActions: function() {
			/* add rule to existing profile */
			document.getElementById('nulli-button-add-rule-to-existing-profile').onmousedown = function () {
				document.getElementById('nulli-rules-preview-container').style.display = 'none';
				document.getElementById('nulli-add-new-profile-container').style.display = 'none';
				document.getElementById('nulli-add-to-profiles-container').style.display = 'block';
			}
			
			/* add rule to new profile */
			document.getElementById('nulli-button-add-rule-to-new-profile').onmousedown = function () { 			
				document.getElementById('nulli-rules-preview-container').style.display = 'none';
				document.getElementById('nulli-add-to-profiles-container').style.display = 'none';
				document.getElementById('nulli-add-new-profile-container').style.display = 'block';
			}
		}
	};

	return App;

})();

console.log(document);
Listeners.init();

