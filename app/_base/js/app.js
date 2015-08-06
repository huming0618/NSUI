(function(window){
	require([
		'jquery',
		'lodash',
		'can',
		'canControlPlugin',
		'comp_tabmenu',
		'comp_tabslider'
	], function ($, _, can) {
		'use strict';
		$(function(e){
			//should search the module first to initilize the state object for each module
			var mod_blocks = $.find('*[jaqen-mod]');
			$.each(mod_blocks, 
				function(i){
					var $this = $(this);
			 		var modName = $this.attr('jaqen-mod');
			 		var component_blocks = $.find('*[jaqen-role]');
			 		var stateKey = _.uniqueId('jaqen-state_');
			 		window[stateKey] = new can.Map();
					$.each(component_blocks, 
						function(i){
					 		var $this = $(this);
					 		var compName = $this.attr('jaqen-role');
					 		
					 		try{

					 			$this[compName].call($this, {
					 				statekey: stateKey
					 			});
					 			//$this.jaqenTabMenu();
					 			//$this[compName].call();
					 		}
					 		catch(err){
					 			console.error('Fail to initilize component ' + compName + ' : ' + err);
					 		}
						}
					);
				});
		});
	});
}(window))
