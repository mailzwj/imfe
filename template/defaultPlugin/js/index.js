$(function() {
    var _default = {
        // default params here.
    };

    function ImPluginClass(wrap, cfg) {
        var config = $.extend(true, {}, cfg || {});

        this.wrap = wrap;
        this.get = function(n) {
            return config[n];
        };
        this.set = function(n, v) {
            config[n] = v;
        };

        this.init();
    }

    ImPluginClass.prototype.init = function() {
        console.log(this);
    };

    $.fn.{{pluginName}} = function(cfg) {
        var config = $.extend({}, _default, cfg || {});
        return this.each(function(idx, ele) {
            var $this = $(ele);
            $this.data('{{pluginName}}', new ImPluginClass($this, config));
        });
    };
});