/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function($) {

$.fn.spasticNav = function(options) {

        options = $.extend({
                overlap : 20,
                speed : 500,
                reset : 1500,
                color : '#0b2b61',
                easing : 'easeOutExpo'
        }, options);

        return this.each(function() {

                var lava_menu = $(this),
                        currentPageItem = $('#selected', lava_menu),
                        blob,
                        reset;

                $('<li id="blob"></li>').css({
                        width : currentPageItem.outerWidth(),
                        height : currentPageItem.outerHeight() + options.overlap,
                        left : currentPageItem.position().left,
                        top : currentPageItem.position().top - options.overlap / 2,
                        backgroundColor : options.color
                }).appendTo(this);

                blob = $('#blob', lava_menu);

                $('li:not(#blob)', lava_menu).hover(function() {
                        // mouse over
                        clearTimeout(reset);
                        blob.animate(
                                {
                                        left : $(this).position().left,
                                        width : $(this).width()
                                },
                                {
                                        duration : options.speed,
                                        easing : options.easing,
                                        queue : false
                                }
                        );
                }, function() {
                        // mouse out	
                        reset = setTimeout(function() {
                                blob.animate({
                                        width : currentPageItem.outerWidth(),
                                        left : currentPageItem.position().left
                                }, options.speed)
                        }, options.reset);

                });

        }); // end each

};

})(jQuery);
