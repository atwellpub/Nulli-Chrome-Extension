var rules = {
    "heading": 'Profile Properties',
    "settings": [{
        "id": "profile-name",
        "type": "text",
        "label": i18n.get("Profile Name"),
        "tooltip": i18n.get("Create a short name to remember this profile by."),
        "placeholder": i18n.get("Enter profile name here."),
        "default": '',
        "required": true
    }, {
        "id": "profile-description",
        "type": "text",
        "label": i18n.get("Profile Description"),
        "tooltip": i18n.get("Create a short description to describe what this profile does."),
        "placeholder": i18n.get("Enter short description here."),
        "default": '',
        "required": true
    }, {
        "id": "profile-toggle",
        "type": "radio",
        "label": i18n.get("Enable/Disable"),
        "tooltip": i18n.get("Turn this profile on or off. Disabled profiles will not run any JS or CSS rules."),
        "options": [{
            value: "off",
            label: i18n.get("Disabled")
        }, {
            value: "on",
            label: i18n.get("Enabled")
        }, ],
        "required": true
    }, {
        "id": "search-condition",
        "type": "text",
        "label": i18n.get("Search String"),
        "tooltip": i18n.get("Nulli will search the current site's URL for this string occurrence. If it is found then the profile JS and CSS will be added to the loaded page."),
        "placeholder": i18n.get("Enter search string here"),
        "default": '',
        "required": true
    }, {
        "id": "search-nature",
        "type": "radio",
        "label": i18n.get("Search Nature"),
        "tooltip": i18n.get("Currently we only support normal string searches, but we plan to add in regular expression searches as well."),
        "options": [
            //{value: "regex", label: i18n.get("Regex")},
            {
                value: "string",
                label: i18n.get("String")
            },
        ],
        "required": true
    }, {
        "id": "javascript_files",
        "type": "text",
        "tooltip": i18n.get("Javascript files to be loaded if the above conditions evaluate to true. Separate multiple files with commas."),
        "label": i18n.get("Javascript Files"),
        "required": true
    },, {
        "id": "javascript",
        "type": "textarea",
        "tooltip": i18n.get("Javascript rules to be loaded if the above conditions evaluate to true."),
        "label": i18n.get("Inline Javascript"),
        "required": true
    }, {
        "id": "css",
        "type": "textarea",
        "tooltip": i18n.get("CSS rules to be loaded if the above conditions evaluate to true."),
        "label": i18n.get("Load CSS"),
        "required": true
    }]
};