/*
 * ProfilesManage display engine
 *
 */
var ProfilesManage = (function() {

    var container_manage = '#container-manage';
    var container_list = '#container-list';
    var html;
    var nulliobj;
    var profiles;
    var profile_id;
    var profile = {};
    var search_string;
    var search_nature;
    var javascript;
    var css;

    var App = {

        /**
         *	Initialize the Profile Management Section
         */
        init: function(rules) {
            /* Create HTML elements */
            var main_container = $('<div>', {
                class: "panel panel-default"
            });
            var panel_heading = $('<div>', {
                class: "panel-heading",
                text: rules.heading
            });
            var table = $('<table>', {
                class: "table",
                id: "rule-table"
            });

            /* Add HTML elements */
            //panel_heading.appendTo(main_container);
            table.appendTo(main_container);
            main_container.appendTo(container_manage);

            /* Populate HTML elements */
            ProfilesManage.render_settings(rules.settings);

            /* enable tooltips for labels - breaks table layout */
            $('.setting-label').tooltip({
                container : 'body'
            });

        },
        /* Loop through settings definitions and create settings */
        render_settings: function(settings) {

            Object.keys(settings).forEach(function(key) {

                ProfilesManage.render_setting(key, settings[key]);

            });
        },
        /**
         *	This method discovers the type of setting the definition is set to generate
         */
        render_setting: function(key, setting) {

            switch (setting.type) {

                case 'text':
                    ProfilesManage.display_text(key, setting);
                    break;
                case 'radio':
                    ProfilesManage.display_radio(key, setting);
                    break;
                case 'dropdown':
                    ProfilesManage.display_textarea(key, setting);
                    break;
                case 'textarea':
                    ProfilesManage.display_textarea(key, setting);
                    break;
                case 'fileselect':
                    ProfilesManage.display_fileselect(key, setting);
                    break;

            }
        },
        /*
         * Builds a table row
         * @accepts var input element
         * @returns row element
         */
        generate_row: function(setting, input) {
            var row = $('<tr>', {
                class: 'setting-row'
            });

            var label = $('<td>', {
                class: 'setting-label',
                text: setting.label,
                title: setting.tooltip
            }).appendTo(row);

            var value = $('<td>', {
                class: 'setting-value'
            });

            input.appendTo(value);

            value.appendTo(row);

            return row;

        },
        /* Generate text input */
        display_text: function(key, setting) {

            var input = $('<input>', {
                type: 'text',
                class: 'form-control',
                id: setting.id,
                placeholder: setting.placeholder,
                required: true
            });

            $('#rule-table').append(ProfilesManage.generate_row(setting, input));

        },
        /* Generate radio inputs */
        display_radio: function(key, setting) {
            var options = setting.options;
            var html = $('<div/>', {
                class: 'radio'
            });

            Object.keys(options).forEach(function(key) {

                var span = $('<label/>', {
                    class: 'radio-label'
                });
                var input = $('<input/>', {
                    type: 'radio',
                    name: setting.id,
                    class: setting.id,
                    value: options[key].value
                });

                /* Set first occurrence to checked */
                if (key == 0) {
                    input.attr('checked', true);
                    input.attr('value', options[key].value);
                }

                var label = $('<span/>', {
                    text: options[key].label
                });
                input.appendTo(span);
                label.appendTo(span);
                span.appendTo(html);
            });

            $('#rule-table').append(ProfilesManage.generate_row(setting, html));
        },
        /* Generate dropdown inputs */
        display_dropdown: function(key, setting) {

        },
        /* Generate textarea input */
        display_textarea: function(key, setting) {
            var input = $('<textarea>', {
                class: 'form-control',
                id: setting.id
            });

            $('#rule-table').append(ProfilesManage.generate_row(setting, input));
        },
        /* Generate file upload */
        display_fileselect: function(key, setting) {

            var div_1 = $('<div>', {
                class: 'fileupload fileupload-new'
            }).attr('data-provides', 'fileupload');
            var span_1 = $('<span>', {
                class: 'btn btn-primary btn-file'
            });
            var span_2 = $('<span>', {
                class: 'fileupload-new',
                text: i18n.get("Select File")
            });
            var span_3 = $('<span>', {
                class: 'fileupload-exists',
                text: i18n.get("Change")
            });
            var span_4 = $('<span>', {
                class: 'fileupload-preview',
                style: 'padding-left:10px;'
            });
            var input_1 = $('<input>', {
                type: 'file',
                id: setting.id
            });
            var link_1 = $('<a>', {
                href: '#',
                class: "close fileupload-exists",
                text: "x",
                style: 'float:none;padding-left:10px;'
            }).attr('data-dismiss', 'fileupload');

            span_2.appendTo(span_1);
            span_3.appendTo(span_1);
            input_1.appendTo(span_1);
            span_1.appendTo(div_1);
            span_4.appendTo(div_1);
            link_1.appendTo(div_1);

            $('#rule-table').append(ProfilesManage.generate_row(setting, div_1));
        },
        /**
         *	Gets current profile ID set by Navigation class
         */
        get_profile_id: function() {
            return Navigation.profile_id;
        },
        /**
         *	Gets next available unused profile id
         */
        get_new_profile_id: function() {

            /* See if this object contains any profiles */
            var count = ProfilesManage.count_profiles();

            if (count == 0) {
                return 1;
            } else {
                var ids = [];

                for (var id in this.nulli.profiles) {
                    ids.push(id);
                }
                ids.sort();
                ids.reverse();

                return parseInt(ids[0]) + parseInt(1, 10);
            }

        },


        /**
         *	Loads Profiles
         */
        get_profiles: function() {
            chrome.storage.sync.get('nulli', function(obj) {
                this.nulli = obj;
                /* Log object to console */
                console.log('Loads:');
                console.log(this.nulli);
            });
        },


        /**
         *	Counts the number of profiles in the profile object
         */
        count_profiles: function() {
            var i = 0;

            for (var id in this.nulli.profiles) {
                i++;
            }

            return i;
        },

        /**
         *	Reads profile inputs into static variables
         */
        set_inputs: function() {
            /* profile name */
            $('#profile-name').val(this.profile['profile-name']);

            /* profile description */
            $('#profile-description').val(this.profile['profile-description']);

            /* profile on/off switch */
            var toggle = $('input:radio[class=profile-toggle]');
            if (typeof this.profile['profile-toggle'] != 'undefined') {
                toggle.filter('[value=' + this.profile['profile-toggle'] + ']').prop('checked', true);
            }

            /* profile search condition */
            $('#search-condition').val(this.profile['search-condition']);

            /* profile search nature */
            var toggle = $('input:radio[class=search-nature]');
            if (this.profile['search-nature']) {
                toggle.filter('[value=' + this.profile['search-nature'] + ']').prop('checked', true);
            }

            /* profile javascript files */
            $('#javascript-files').val(this.profile['javascript-files']);

            /* profile inline javascript */
            $('#javascript').val(this.profile['javascript']);

            /* profile css */
            $('#css').val(this.profile['css']);
        },

        /**
         *	Updates profile record
         */
        update_profile: function() {

            this.nulli['profiles'][this.profile_id] = {
                "profile-toggle": $('.profile-toggle:checked').val(),
                "profile-name": $('#profile-name').val(),
                "profile-description": $('#profile-description').val(),
                "search-condition": $('#search-condition').val(),
                "search-nature": $('.search-nature:checked').val(),
                "javascript-files": $('#javascript-files').val(),
                "javascript": $('#javascript').val(),
                "css": $('#css').val(),
            }

            ProfilesManage.save_profiles();
            ProfilesList.rebuild_table();


            /* Add success message */
            swal(i18n.get("Profile updated!"), "Your Nulli profile has been updated!", "success")
        },

        /**
         *	Loads profile given set profile id and sets input values
         */
        load_profile: function(id) {
            this.profile_id = id;
            this.profile = this.nulli['profiles'][id];

            ProfilesManage.set_inputs();

        },

        /**
         *  Delete profile
         */
        delete_profile: function(id) {
            swal({
                title: i18n.get("Are you sure?"),
                text: i18n.get("Your will not be able to recover this profile!"),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: i18n.get("Yes, delete it!"),
                closeOnConfirm: false
            }, function() {
                delete ProfilesManage.nulli.profiles[id];

                console.log(ProfilesManage.nulli.profiles);
                ProfilesManage.save_profiles();
                ProfilesList.rebuild_table();

                Navigation.tab = 'list';
                Navigation.load_nav_tab();

                swal(i18n.get("Deleted!"), i18n.get("Your Nulli profile has been deleted."), "success");
            });


        },

        /**
         *  Clears all the input values
         */
        clear_inputs: function() {
            Object.keys(rules.settings).forEach(function(key) {
                $('#' + rules.settings[key]['id']).val('')
            });
        },


        /**
         *	Saves new profile inputs to profile id
         */
        save_new_profile: function() {

            /* get unused profile id */
            ProfilesManage.profile_id = this.get_new_profile_id();

            if (typeof ProfilesManage.nulli.profiles == 'undefined') {
                ProfilesManage.nulli.profiles = [];
            }

            /* Build new profile obj */
            ProfilesManage.nulli.profiles[this.profile_id] = {
                "profile-name": $('#profile-name').val(),
                "profile-description": $('#profile-description').val(),
                "profile-toggle": $('.profile-toggle:checked').val(),
                "search-condition": $('#search-condition').val(),
                "search-nature": $('.search-nature:checked').val(),
                "javascript-files": $('#javascript-files').val(),
                "javascript": $('#javascript').val(),
                "css": $('#css').val(),
            }

            /* Save updated profiles object to storage */
            ProfilesManage.save_profiles();
            ProfilesList.rebuild_table();

            /* Add success message */
            swal(i18n.get("Profile saved!"), "Your Nulli profile has been saved!", "success")

        },


        /**
         *	Saves the current static profiles object into sync storage
         */
        save_profiles: function() {

            /* Log object to console */
            console.log('Saves:');
            console.log({
                "nulli": ProfilesManage.nulli
            });

            chrome.storage.sync.set({
                "nulli": ProfilesManage.nulli
            });
        },
    };

    return App;

})();


/**
 *	Load js class on dom complete
 */
jQuery(document).ready(function() {

});