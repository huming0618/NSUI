
(function(window){
    require(['jquery', 'can', 'canControlPlugin', 'com_base'], function($, can, canControlPlugin, com_base){
        var myPlugin = 'jaqenTabMenu';
        com_base.extend({
            pluginName: myPlugin
        },{
            init: function(element, options){
                com_base.prototype.init.apply(this, arguments);
                //this.imageTexts= options["imageTexts"];
                var me = this;
                var baseClass = me.getBaseClass(myPlugin);
                var itemClass = baseClass+'__item';
                var activeItemClass = baseClass+'__item-active';

                //window.myName.appState = new can.Map();
 
                me.$el.on('mouseover', '.'+itemClass , function(e){
                    var $this = $(this);
                    var seq = $this.index();
                    $this
                        .siblings('.'+activeItemClass)
                        .prop('class', itemClass);
                    $this.prop('class', activeItemClass);
                    //me._switchView(seq);
                    me.theState.attr('tab-switch-to', seq);
                });

            }

            /*
            _switchView: function(seq){
                
                var $toMove = this.$el.find('.news-tabblock-zgw__tabbody');
                var move = 0 - seq * 900 - seq * 10;
                $toMove.animate({'margin-left':move}, 120);
                
            }*/
        });
    });
}(window));



