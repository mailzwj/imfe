module.exports = function(cmd) {
    var shell = require('shelljs/global'),
        fs = require('fs'),
        log = require('./log'),
        path = require('path');

    var defaultPlugin = {
        readme: '## {{pluginName}}\n\n{{pluginName}}',
        html: '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <title>{{pluginName}} 插件演示</title>\n    <link rel="stylesheet" type="text/css" href="../css/jquery.{{pluginName}}.css">\n</head>\n<body>\n<div class="main">\n    <div id="J_PluginWrap" class="{{pluginName}}-wrap">\n        <!-- Add your plugin\'s structure -->\n    </div>\n</div>\n<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>\n<script src="../js/jquery.{{pluginName}}.js"></script>\n<script>\n$(function() {\n    // jQuery plugin init\n    $(\'#J_PluginWrap\').{{pluginName}}({\n        // params\n    });\n});\n</script>\n</body>\n</html>',
        css: '/**\n * write style here\n */\n.{{pluginName}}-wrap {\n\n}',
        js: '$(function() {\n    var _default = {\n        // default params here.\n    };\n\n    function ImPluginClass(wrap, cfg) {\n        var config = $.extend(true, {}, cfg || {});\n\n        this.wrap = wrap;\n        this.get = function(n) {\n            return config[n];\n        };\n        this.set = function(n, v) {\n            config[n] = v;\n        };\n\n        this.init();\n    }\n\n    ImPluginClass.prototype.init = function() {\n        console.log(this);\n    };\n\n    $.fn.{{pluginName}} = function(cfg) {\n        var config = $.extend({}, _default, cfg || {});\n        return this.each(function(idx, ele) {\n            var $this = $(ele);\n            $this.data(\'{{pluginName}}\', new ImPluginClass($this, config));\n        });\n    };\n});'
    };

    cmd.command('add <pluginName>')
        .description('Add a new plugin with default files.')
        .action(function(pluginName) {
            if (pluginName) {
                var dir = './' + pluginName;
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                } else {
                    log.warn('Warn: The plugin already exists.');
                    return;
                }
                fs.mkdirSync(dir + '/js');
                fs.mkdirSync(dir + '/css');
                fs.mkdirSync(dir + '/demo');
                fs.writeFileSync(dir + '/js/jquery.' + pluginName + '.js', defaultPlugin.js.toString('utf8').replace(/{{pluginName}}/g, pluginName), 'utf8');
                fs.writeFileSync(dir + '/css/jquery.' + pluginName + '.css', defaultPlugin.css.toString('utf8').replace(/{{pluginName}}/g, pluginName), 'utf8');
                fs.writeFileSync(dir + '/demo/index.html', defaultPlugin.html.toString('utf8').replace(/{{pluginName}}/g, pluginName), 'utf8');
                fs.writeFileSync(dir + '/README.md', defaultPlugin.readme.toString('utf8').replace(/{{pluginName}}/g, pluginName), 'utf8');
                log.info('Info: The plugin already created.');
            } else {
                log.error('Error: pluginName is must.');
            }
        });
};