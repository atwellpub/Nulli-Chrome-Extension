/**
 * Background Engine
 */
var Background = (function() {

    var power;

    var App = {

        /**
         *	Initialize the Profile Management Section
         */
        init: function() {
            console.log('Starting Background dot JS');
            Background.listenForSelector();
        },
        listenForSelector: function() {
            /* listen for selector button  */
            chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

                /* check message */
                if (!message.clicked) {
                    return;
                }

                /* load Highlight class into DOM */
                if (!Background.power) {

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
                Background.power = false;
            });
        }
    };

    return App;

})();

Background.init();