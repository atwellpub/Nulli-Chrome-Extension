/**
 *	Load profiles and run tasks
 */


chrome.storage.sync.get('nulli', function(obj) {


    var Engine = (function() {

        var siteuri = window.location.href;

        var construct = {

            init: function() {
                console.log("Nulli has loaded profiles.");
                console.log(obj);
                for (var id in obj.nulli.profiles) {

                    if (obj.nulli.profiles[id] == null) {
                        continue;
                    }

                    if (obj.nulli.profiles[id]['profile-toggle'] == 'off') {
                        continue;
                    }

                    if (siteuri.indexOf(obj.nulli.profiles[id]['search-condition']) == -1) {
                        continue;
                    }

                    console.log('Profile loaded:');
                    console.log(obj.nulli.profiles[id]['profile-name']);

                    /* Evaluate Javascript */
                    if (typeof obj.nulli.profiles[id]['javascript'] != 'undefined') {
                        console.log('loaded js');
                        eval(obj.nulli.profiles[id]['javascript']);
                    }

                    /* Adds CSS */
                    if (typeof obj.nulli.profiles[id]['css'] != 'undefined') {
                        console.log('loaded css');
                        var body = document.getElementById('body');
                        document.body.insertAdjacentHTML('beforeend', '<style type="text/css">' + obj.nulli.profiles[id]['css'] + '</style>');

                    }

                    /* load javascript files */
                    if (typeof obj.nulli.profiles[id]['javascript-files'] != 'undefined' && obj.nulli.profiles[id]['javascript-files']) {

                        console.log(obj.nulli.profiles[id]['javascript-files']);

                        var body = document.getElementById('body');
                        document.body.insertAdjacentHTML('beforeend', '<script type="text/javascript" src="'+obj.nulli.profiles[id]['javascript-files']+'"></script>');

                        var fileref=document.createElement('script')
                        fileref.setAttribute("type","text/javascript")
                        fileref.setAttribute("src", obj.nulli.profiles[id]['javascript-files']);
                        document.getElementsByTagName("head")[0].appendChild(fileref);
                        console.log('done');
                    }

                    /*  Google Analytics add rule processed event
					(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
					(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
					m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
					})(window,document,'script','https://www.google-analytics.com/analytics.js','ga'); // Note: https protocol here

					ga('create', 'UA-56260507-2', 'auto');
					ga('set', 'checkProtocolTask', function(){}); // Removes failing protocol check. @see: http://stackoverflow.com/a/22152353/1958200
					ga('require', 'displayfeatures');
					ga('send', 'event', 'Rule Applied', 'Rule Applied' , 1 );*/

                }
            }

        }


        return construct;

    })();


    /* Load Engine */
    Engine.init();


});