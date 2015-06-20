/**
* Listeners Engine
*/
var CSS = ( function () {
	
	var loaded;
	
	var App = {
		/**
		 * load styles
		 */
		init: function() {
			console.log('CSS.init()');
			
			CSS.injectStyles('.nhighlight{ background-color: #bcd5eb !important; outline: 2px solid #5166bb !important; }');		
			CSS.injectStyles('.nulli-button{ cursor: pointer; font-size:12px; display: inline-block;  color: #fff;  line-height: 1;  padding: .6em .8em;  background: #009afd;  -webkit-transition: background 0.15s ease, color 0.15s ease;  -moz-transition: background 0.15s ease, color 0.15s ease;  -ms-transition: background 0.15s ease, color 0.15s ease;  -o-transition: background 0.15s ease, color 0.15s ease;  border: 1px solid #1777b7;  box-shadow: 0 1px 0 rgba(255,255,255,0.3) inset,0 1px 1px rgba(100,100,100,0.3);  border-radius: 3px; }');		
			CSS.injectStyles('.nulli-note{ width:80%;height:20px;background-color:#1d1f21;color:#f90;opacity: 0.5;padding-left:5px;padding-top:5px;font-weight:600;text-align:left !important; }');		
			CSS.injectStyles('.nulli-actions{ padding-right:10px;text-align:center; }');		
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

			