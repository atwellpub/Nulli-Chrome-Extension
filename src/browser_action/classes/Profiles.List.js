/*
* Profiles_List display engine
*
*/
var Profiles_List = ( function () {

	var target_container = '#container-list';
	var html;

	var App = {

		/**
		 *	Initialize the Profile Management Section
		 */
		init: function () {
			this.build_table();
		},
		build_table: function() {
			var table = $('<table>', { class: "tablesorter", cellspacing: 1 , id:"table-profiles-list" });

			var cols = this.build_cols();

			cols.appendTo(table);

			
			for ( var id in Profiles_Manage.nulli.profiles ) {
				
				if ( !Profiles_Manage.nulli.profiles[ id ] ) {
					continue;
				}
				
				var profile = Profiles_List.prepare_defaults( Profiles_Manage.nulli.profiles[ id ] );

				var tr = $('<tr>' , { class: 'profile-row' , id: 'row-' + id } );

				$('<td>' , { class: 'profile-col' , id: 'col-id-' +id , text: id } ).appendTo(tr);

				$('<td>' , { class: 'profile-col' , id: 'col-name-' +id , text: profile['profile-name'] } ).appendTo(tr);
				var actions = this.get_actions( id );
				$('<td>' , { class: 'profile-col' , id: 'col-actions-' +id , html: actions} ).appendTo(tr);
				$('<td>' , { class: 'profile-col' , id: 'col-status-' +id , text: profile['profile-toggle'] } ).appendTo(tr);
				$('<td>' , { class: 'profile-col' , id: 'col-description-' +id , text: profile['profile-description'] } ).appendTo(tr);
				tr.appendTo(table);
			}



			table.appendTo( target_container );
			jQuery('#table-profiles-list').tablesorter();
		},
		build_cols: function() {
			var tr = $('<tr>' , { class: 'headings' });

			$( '<th>' , { class: 'heading' , id: 'th-profile-ID' } ).appendTo(tr);
			$( '<th>' , { class: 'heading' , id: 'th-profile-name'	} ).appendTo(tr);
			$( '<th>' , { class: 'heading' , id: 'th-profile-actions' } ).appendTo(tr);
			$( '<th>' , { class: 'heading' , id: 'th-profile-status' } ).appendTo(tr);
			$( '<th>' , { class: 'heading' , id: 'th-profile-description' } ).appendTo(tr);

			return tr;
		},
		get_actions: function( id ) {
			var actions = $('<div>' , { class: 'row-actions' });

			$('<a>' , { class: 'quick-action edit-profile' , rel: id } ).appendTo(actions);
			$('<a>' , { class: 'quick-action delete-profile' , rel: id  }  ).appendTo(actions);

			return actions;
		},
		prepare_defaults: function( profile ){

			for( key in rules.settings ) {
				if ( typeof profile[ rules.settings[key]['id'] ] == 'undefined' ) {
					profile[ rules.settings[key]['id'] ] = "";
				}
			}

			return profile;
		},
		rebuild_table: function() {
			/* remove old table */
			$('.tablesorter').remove();

			/* rebuild table */
			Profiles_List.build_table();

			/* Switch to profile update mode */
			Navigation.tab = 'list';
			Navigation.load_nav_tab( );
			loadMessages();
		}


	};

	return App;

})();

/* Load js class on dom complete */
jQuery( document ).ready( function() {
});

