$(function(){

    var siteInit = new SiteInit({
        "contentArea" : ".article-body",
        "searchButton" : ".toggle-search",
        "searchArea" : ".site-search"
    });

});

var SiteInit = function(){

    this.init.apply(this, arguments)

};

SiteInit.prototype = {

    init : function(args){
        var _self = this;
        var _animationRate = 300;
        this.setObject(args);
        this.imageWrapper();
        this.imageFancybox();
        this.initSearchArea();
        this.clickSearchBtn(_self, _animationRate);
        this.setupInteractiveCover();
    },
    setObject : function(args){
        this.$contentArea = $(args.contentArea);
        this.$searchButton = $(args.searchButton);
        this.$searchArea = $(args.searchArea);
    },
    imageWrapper : function(){
        this.$contentArea.each(function(){
            $(this).find('img').each(function(){
                var $img = $(this),
                    imgAlt = this.alt,
                    imgSrc = this.src,
                    $imgWrap,
                    $imgCaption;
                if( imgAlt ){
                    $imgCaption = $('<span>', {
                        "class" : "caption",
                        "text" : imgAlt
                    });
                    $img.after($imgCaption);
                }
                $imgWrap = $('<a>', {
                    "class" : "img-wrap",
                    "href" : imgSrc
                });
                $img.wrap($imgWrap);
            });
        });
    },
    imageFancybox : function(){
        if( ! $.fancybox ){
            return false;
        }else{
            this.$contentArea.each(function(i){
                $(this).find('.img-wrap').each(function(){
                    $(this).attr('rel', 'image' + i);
                });
            });
            $('.img-wrap').fancybox();
        }
    },
    initSearchArea : function(){
        this.$searchArea.find('input[type="search"]').attr('type', 'text');
    },
    clickSearchBtn : function(_self, _animationRate){
        this.$searchButton.click(function(e){
            e.preventDefault();
            _self.$searchArea.toggleClass('active');
        });
    },
    setupInteractiveCover : function(){
      var duration = "200ms";
      var scale = 1.1;
      var strength = 5;
      var dom = $('.archive-article-inner');
      var originalScaleStr = dom.css('background-size');
      if (originalScaleStr) {
        var originalScale = originalScaleStr.split('%')[0];
        dom.mouseenter(function(e) {
          $(this).css('background-size', originalScale * scale + '% auto');
          $(this).css({
            "-webkit-transition": "background-size" + duration + " linear",
            "-moz-transition": "background-size" + duration + " linear",
            "-o-transition": "background-size" + duration + " linear",
            "transition": "background-size " + duration + " linear"
          });
        });
        dom.mousemove(function(e) {
          var w = $(this).outerWidth();
          var h = $(this).outerHeight();
          var sh = strength / h;
          var sw = strength / w;
          var x = -sw * ((e.pageX || e.clientX) - $(this).offset().left - (w / 2));
          var y = -sh * ((e.pageY || e.clientY) - $(this).offset().top - (h / 2));
          $(this).css('background-position', (50 - x) + '% ' + (50 - y) + '%');
        });
        dom.mouseleave(function(e) {
          $(this).css('background-position', '50% 50%');
          $(this).css('background-size', originalScale + '% auto');
        });
      }
    }
};
