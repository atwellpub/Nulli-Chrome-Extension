/**
 *  Loads all i18n messages located in _locales/en_US/messages.json
 */

function setProperty(selector, prop, msg) {

    if ($(selector).length == 0) {
        return true;
    }

    $(selector).prop(prop, chrome.i18n.getMessage(msg));

}

function loadMessages() {
    var obj = $.getJSON('../../_locales/en_US/messages.json', function(data) {

        $.each(data, function(key, val) {

            if (!val.selector) {
                return true;
            }

            setProperty(
                val.selector,
                val.prop,
                key
            );
        });

    });
}

/**
 *  On windows load load i18n messages
 */
window.onload = function() {
    loadMessages();
};