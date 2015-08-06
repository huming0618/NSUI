(function(window){
    require(['jquery', 'can', 'canControlPlugin', 'com_base'], function($, can, canControlPlugin, com_base){
        var myPlugin = 'jaqenTabSlider';
        com_base.extend({
            pluginName: myPlugin
        },{
            //*__block
            init: function(element, options){
                com_base.prototype.init.apply(this, arguments);
                var me = this;
                me.theClass = me.getBaseClass(myPlugin);
                me.$slideWrapper = me.$el.children('.' + me.theClass + '__body');
                me.$blocks = me.$slideWrapper.children('.' + me.theClass + '__body__block');
                
                var boxWidth = me.$el.width();
                var numOfBlocks = me.$blocks.length;
                me.$slideWrapper.width(boxWidth * numOfBlocks + 10 * numOfBlocks);
                me.$blocks.width(boxWidth);

                me.theState.bind('tab-switch-to', function(e, newVal, oldVal){
                    console.log('tab-switch-to', arguments);
                    me._slide(newVal, boxWidth);
                });
            },

            _slide: function(seq, moveWidth){
                var move = 0 - seq * moveWidth - seq * 10;
                this.$slideWrapper.animate({'margin-left':move}, 120);
                
            }
        });
    });
}(window));



