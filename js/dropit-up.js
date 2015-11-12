/*
 * dropit-up v1.1.0
 * http://dev7studios.com/dropit-up
 *
 * Copyright 2012, Dev7studios
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

;(function($) {

    $.fn.dropit-up = function(method) {

        var methods = {

            init : function(options) {
                this.dropit-up.settings = $.extend({}, this.dropit-up.defaults, options);
                return this.each(function() {
                    var $el = $(this),
                         el = this,
                         settings = $.fn.dropit-up.settings;

                    // Hide initial submenus
                    $el.addClass('dropit-up')
                    .find('>'+ settings.triggerParentEl +':has('+ settings.submenuEl +')').addClass('dropit-up-trigger')
                    .find(settings.submenuEl).addClass('dropit-up-submenu').hide();

                    // Open on click
                    $el.off(settings.action).on(settings.action, settings.triggerParentEl +':has('+ settings.submenuEl +') > '+ settings.triggerEl +'', function(){
                        // Close click menu's if clicked again
                        if(settings.action == 'click' && $(this).parents(settings.triggerParentEl).hasClass('dropit-up-open')){
                            settings.beforeHide.call(this);
                            $(this).parents(settings.triggerParentEl).removeClass('dropit-up-open').find(settings.submenuEl).hide();
                            settings.afterHide.call(this);
                            return false;
                        }

                        // Hide open menus
                        settings.beforeHide.call(this);
                        $('.dropit-up-open').removeClass('dropit-up-open').find('.dropit-up-submenu').hide();
                        settings.afterHide.call(this);

                        // Open this menu
                        settings.beforeShow.call(this);
                        $(this).parents(settings.triggerParentEl).addClass('dropit-up-open').find(settings.submenuEl).show();
                        settings.afterShow.call(this);

                        return false;
                    });

                    // Close if outside click
                    $(document).on('click', function(){
                        settings.beforeHide.call(this);
                        $('.dropit-up-open').removeClass('dropit-up-open').find('.dropit-up-submenu').hide();
                        settings.afterHide.call(this);
                    });

                    // If hover
                    if(settings.action == 'mouseenter'){
                        $el.on('mouseleave', '.dropit-up-open', function(){
                            settings.beforeHide.call(this);
                            $(this).removeClass('dropit-up-open').find(settings.submenuEl).hide();
                            settings.afterHide.call(this);
                        });
                    }

                    settings.afterLoad.call(this);
                });
            }

        };

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error( 'Method "' +  method + '" does not exist in dropit-up plugin!');
        }

    };

    $.fn.dropit-up.defaults = {
        action: 'click', // The open action for the trigger
        submenuEl: 'ul', // The submenu element
        triggerEl: 'a', // The trigger element
        triggerParentEl: 'li', // The trigger parent element
        afterLoad: function(){}, // Triggers when plugin has loaded
        beforeShow: function(){}, // Triggers before submenu is shown
        afterShow: function(){}, // Triggers after submenu is shown
        beforeHide: function(){}, // Triggers before submenu is hidden
        afterHide: function(){} // Triggers before submenu is hidden
    };

    $.fn.dropit-up.settings = {};

})(jQuery);
