module.exports = function(cmd) {
    var shell = require('shelljs/global'),
        fs = require('fs'),
        log = require('./log'),
        uglify = require('uglify-js'),
        path = require('path'),
        CleanCss = require('clean-css');

    var dist = './dist/',
        src = './src/',
        suffix = '.min',
        cleanCssIns = new CleanCss();

    cmd.command('build [option]')
        .description('Minify javascript and css files.')
        .action(function(p) {
            var dir;
            if (!fs.existsSync(src)) {
                log.warn('Warn: No such file or directory.');
                return;
            }
            dir = fs.readdirSync(src);
            if (!fs.existsSync(dist)) {
                fs.mkdirSync(dist);
            }
            rm('-rf', dist + '*');
            dir.forEach(function(d, i) {
                cp('-Rf', src + d, dist);
            });
            /**
             * imfe build 压缩
             * imfe build -d 原样拷贝
             */
            if (!cmd.debug) {
                var assets = find(dist + '.').filter(function(file) {
                    return file.match(/\.(js|css)$/);
                });
                assets.forEach(function(f, i) {
                    if (f.match(/\.js$/)) {
                        var code = fs.readFileSync(f, 'utf8'),
                            ast, compressor,
                            fnObj = path.parse(f),
                            minName = fnObj.dir + '/' + fnObj.name + suffix + fnObj.ext;

                        // minify code
                        ast = uglify.parse(code);
                        ast.figure_out_scope();
                        compressor = uglify.Compressor({
                            unused: false,
                            side_effects: false
                        });
                        ast = ast.transform(compressor);
                        code = ast.print_to_string();

                        fs.writeFileSync(minName, code, 'utf8');
                        log.info('[' + fnObj.name + fnObj.ext + ']: ' + minName + ' already created.');
                    } else if (f.match(/\.css$/)) {
                        var code = fs.readFileSync(f, 'utf8'),
                            style = cleanCssIns.minify(code).styles,
                            fnObj = path.parse(f),
                            minName = fnObj.dir + '/' + fnObj.name + suffix + fnObj.ext;

                        fs.writeFileSync(minName, style, 'utf8');
                        log.info('[' + fnObj.name + fnObj.ext + ']: ' + minName + ' already created.');
                    }
                });
            }
        });
};