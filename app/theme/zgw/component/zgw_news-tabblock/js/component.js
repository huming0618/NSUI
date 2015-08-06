
(function(window){
    require(['jquery', 'can'], function($, can){
        var myPlugin = 'zgwNewsTabBlock';
            window[myPlugin] = can.Control({
                pluginName: myPlugin
            },{
                init: function(element, options){
                    /*
                    this.imageTexts= options["imageTexts"];
                    this.smallImages= options["smallImages"];
                    this.bigImages= options["bigImages"];
                    this.pageTitle = options["title"];
                    this.pageDate = options["date"];
                    */
                    var me = this;
                    //window.myName.appState = new can.Map();
                    me.$el = this.element;
                    me.$el.on('mouseover','.news-tabblock-zgw__tabheader__item', function(e){
                        var $this = $(this);
                        var seq = $this.index();
                        $this
                            .siblings('.news-tabblock-zgw__tabheader__item-active')
                            .prop('class','news-tabblock-zgw__tabheader__item');

                        $this.prop('class', 'news-tabblock-zgw__tabheader__item-active');
                        me._switchView(seq);
                    });
                    me._render();
                },
                
                _render: function(){
                    /*
                    var me = this;

                    smallImageLoader.load().done(function(){
                        me.nav.render({images : me.images});
                        me.nav.show();
                        me._switchView(window.appState.view);
                    });*/
                },
                
                _switchView: function(seq){
                    var $toMove = this.$el.find('.news-tabblock-zgw__tabbody');
                    var move = 0 - seq * 900 - seq * 10;
                    $toMove.animate({'margin-left':move}, 120);
                }
            });
    });
}(window));



