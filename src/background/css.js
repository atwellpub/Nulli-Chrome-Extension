/**
 * Listeners Engine
 */
var CSS = (function() {

    var loaded;

    var App = {
        /**
         * load styles
         */
        init: function() {
            console.log('CSS.init()');

            CSS.injectStyles('.nhighlight{ background-color: #bcd5eb !important; outline: 2px solid #5166bb !important; }');
            CSS.injectStyles('.nulli-handle{  width:100%;height:20px;background-color:darkslategray;cursor:move;text-align:right;}');
            CSS.injectStyles('#nulli-close{ position:relative;padding-right:7px;top:3px; cursor:pointer;font-size:12px; }');
            CSS.injectStyles('.nulli-control{position:fixed;left:1px;bottom:100px;display:none; }');
            CSS.injectStyles('.nulli-control-container{width:338px;height:auto;background-color:#000;color:#fff;text-align:right;padding-bottom:10px; }');
            CSS.injectStyles('.nulli-button{ cursor: pointer; font-size:12px; display: inline-block;  color: #fff;  line-height: 1;  padding: .6em .8em;  background: #4CA454;  -webkit-transition: background 0.15s ease, color 0.15s ease;  -moz-transition: background 0.15s ease, color 0.15s ease;  -ms-transition: background 0.15s ease, color 0.15s ease;  -o-transition: background 0.15s ease, color 0.15s ease;  border: 1px solid #1777b7;  box-shadow: 0 1px 0 rgba(255,255,255,0.3) inset,0 1px 1px rgba(100,100,100,0.3);  border-radius: 3px; }');
            CSS.injectStyles('.nulli-note{ width:80%;height:20px;background-color:#1d1f21;color:blanchedalmond;opacity: 0.7;padding-left:5px;padding-top:5px;font-weight:600;text-align:left !important; }');
            CSS.injectStyles('.nulli-actions{ padding-right:10px;text-align:center; }');
            CSS.injectStyles('.nulli-add-to-profiles-container{ display:none;padding:20px; }');
            CSS.injectStyles('.nulli-add-new-profile-container{ display:none;padding:20px; }');
            CSS.injectStyles('.nulli-control select{ min-width:247px;display:inline-block !important;color:#9b869c;width:auto; font-family: \'Source Code Pro\', Menlo, Consolas, Monaco, monospace; font-size: 0.9rem;   padding: 6px; overflow: none; display: block; border:none; }');
            CSS.injectStyles('.nulli-control input{ min-width:219px;display:inline-block !important;color:#9b869c;width:auto; font-family: \'Source Code Pro\', Menlo, Consolas, Monaco, monospace; font-size: 0.9rem;   padding: 6px; overflow: none; display: block; border:none; }');
            CSS.injectStyles('#nulli-css-rules { height:100px;background: #1d1f21;color:#9b869c;width:88%; font-family: \'Source Code Pro\', Menlo, Consolas, Monaco, monospace; font-size: 0.9rem;  background: none;  padding: 15px; overflow: none; display: block; border:none; }');
        },
        injectStyles: function(rule) {
            var style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = rule;
            document.getElementsByTagName('head')[0].appendChild(style);
        }

    };

    return App;

})();

CSS.init();