/*
 * Copyright 2012 Aleksander Zdyb
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program.  If not, see http://www.gnu.org/licenses/.
 *
 */

(function($) {

    function onTrigger(event) {
        var $this = $(this);
        var settings = event.data.settings, item = event.data.item;
        if ($this.hasClass(settings.selectedClass)) {
            $this.removeClass(settings.selectedClass);
            selectionChanged(settings);
        } else if (settings.max >= 0) {
            var selected = $(item).find(settings.items).filter(function(i, item) {
                return $(item).hasClass(settings.selectedClass);
            });
            if (selected.length < settings.max) {
                $this.addClass(settings.selectedClass);
                selectionChanged(settings);
            } else if ( (settings.max == 1) && (settings.switchSelection) ) {
                $(selected).removeClass(settings.selectedClass);
                $this.addClass(settings.selectedClass);
                selectionChanged(settings);
            } else {
                // @TODO: Raise event (one may want to indicate that more items cannot be selected)
            }
        } else {
            $this.addClass(settings.selectedClass);
            selectionChanged(settings);
        }
    }

    function selectionChanged(settings) {
        if ($.isFunction(settings.selectionChanged)) {
            settings.selectionChanged();
        }
    }
    
    var methods = {
        init : function(options) {

            var settings = $.extend({
                max: 1,
                items: "",
                selectedClass: "selected",
                triggerEvent: "click.itemspicker",
                switchSelection: true,
                selectionChanged: false
            }, options);
            
            return this.each(function(i, item) {
                var $this = $(item);
                var data = $this.data("itemspicker");
                if (!data) {
                    $this.data("itemspicker", {
                        settings: settings
                    });
                    $this.on(settings.triggerEvent, settings.items, { settings: settings, item: item }, onTrigger);
                }
            });
            
        },
        
        destroy : function( ) {
            return this.each(function(i, item) {
                var $this = $(item);
                var data = $this.data("itemspicker");
                if (data) {
                    var settings = data.settings;
                    $this.find(settings.items).removeClass(settings.selectedClass);
                    $this.off(".itemspicker");
                }
                $this.removeData("itemspicker");
            });
        },
        
        option : function(opt, val) {
            var $this = $(this);
            var data = $this.data("itemspicker");
            if (data) {
                var settings = data.settings;
                if (val === undefined) {
                    return (settings[opt] === undefined) ? null : settings[opt];
                } else {
                    settings[opt] = val;
                }
            }
            return undefined;
        }
    };
      
    $.fn.itemspicker = function(method) {
        
        if (methods[method]) {
            return methods[ method ].apply( this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || ! method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error("Method " +  method + " does not exist on jQuery.itemspicker");
        }
    };

})(jQuery);
