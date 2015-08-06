
(function(window){
    define('com_base', ['jquery', 'can'], function($, can){
        return can.Control({
            //*__block
            init: function(element, options){
                //this.imageTexts= options["imageTexts"];
                this.$el = this.element;
                console.log('options', options);
                if(options["statekey"]){

                    var stateKey = options["statekey"];
                    console.log('stateKey', stateKey);
                    this.theState = window[stateKey];
                }
                else{
                    this.theState = new can.Map();
                }
            },

            getBaseClass: function(pluginName){
                var exp = new RegExp("\\s*" + pluginName + "\\s*");
                return this.$el.prop('class').replace(exp, '');
            }
        });
    });
}(window));



