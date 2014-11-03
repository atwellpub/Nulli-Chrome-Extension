var Navigation = ( function () {
	var params;
	var tab;
	var profile_id;
	
	
	var App = {
		init: function () {
			Navigation.get_query_params();
			Navigation.get_tab();
			Navigation.get_profile_id();
			Navigation.load_nav_tab();
		},
		get_query_params: function() {
			var qs = document.location.search.split("+").join(" ");

			var params = {}, tokens,
				re = /[?&]?([^=]+)=([^&]*)/g;

			while (tokens = re.exec(qs)) {
				params[decodeURIComponent(tokens[1])]
					= decodeURIComponent(tokens[2]);
			}

			this.params = params;
		},
		get_tab: function () {
			this.tab = this.params.tab;			
		},
		get_profile_id: function() {
			if ( this.params.id != undefined ) {
				this.profile_id =  this.params.id;
			}
		},
		/**
		 *  Loads correct tab 
		 *  @param STRING tab
		 */
		load_nav_tab: function( ) {
			/* hide containers and unset active class */
			$('.content').hide();
			$('.option-pill').hide();
			$('.nav-listing').removeClass('active');
			
			/* reveal container add active class */
			switch( this.tab ) {
				case 'add' :
					$('#container-manage').show();
					$('#pill-add').show();
					$('#nav-add').addClass('active');
					Profiles_Manage.clear_inputs();
					break;
				case 'update' :
					$('#container-manage').show();
					$('#pill-update').show();
					$('#nav-updte').addClass('active');
					break;
				case 'list' :
					$('#container-list').show();
					$('#nav-list').addClass('active');
					break;
					
			}
		},
		/**
		 *  Opens profile in manage area
		 */
		open_profile: function( id ) {
			this.tab = 'update';
			this.load_nav_tab();
			Profiles_Manage.load_profile( id );
		}
		
	};

   return App;

})();

/* Load js class on dom complete */	
jQuery( document ).ready( function() {
	
	/**
	 *  Load Navigation
	 */
	Navigation.init();
	
	//chrome.storage.sync.set( {"nulli": null } );
	
	
	/**
	 *  Let's load stored profile data first thing on page load due to it's asynchronous nature 
	 */
	chrome.storage.sync.get('nulli' , function(obj) {	

		var nulli = obj.nulli;

		/* Prepare empty object with empty profiles array */
		if ( !nulli ) {
			nulli = { };
		}
		
		Profiles_Manage.nulli = nulli;
		console.log("Loading profiles...");
		console.log(nulli);

		/* Load profiles list table */
		var response_1 = Profiles_List.init();

		/* Load profile management container -  settings defined in /settings/rules.js */
		var response_2 = Profiles_Manage.init( rules );
		
	});
	
	/**
	 *  Listener: Switch Navigation Panels
	 */
	$('.nav-listing').click( function() {
		var id = this.id;
		var tab = id.replace( 'nav-' , '' );
		Navigation.tab = tab;
		Navigation.load_nav_tab( );
	});
	
	/**
	 *  Listener: Save new profile
	 */
	$('#pill-add').click( function() {
		Profiles_Manage.save_new_profile();
	});
	
	/**
	 *  Listener: Save new profile
	 */
	$('#pill-update').click( function() {
		Profiles_Manage.update_profile();
	});
	
	/**
	 *  Listener: Edit Profile
	 */
	$('body').on( 'click' , '.edit-profile' , function() {
		Navigation.open_profile( jQuery( this ).attr('rel') );
	});
	
	/**
	 *  Listener: Delete Profile
	 */
	$('body').on( 'click' , '.delete-profile' , function() {
		Profiles_Manage.delete_profile( jQuery( this ).attr('rel') );
	});
	
	/**
	 *  Listener: CNTRL + S  fires save command
	 */
	 $(window).keydown(function(event) {

		if (!(event.which == 83 && event.ctrlKey) && !(event.which == 19)) return true;
		event.preventDefault();
		jQuery('#pill-update').click();
		return false;
	});
});