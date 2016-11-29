var http = require('http'),
    path = require('path'),
    fs = require('fs');

var cmd = require('commander'),
    static = require('node-static'),
    log = require('./log');

var commandName = 'imfe';

function imMkDir(dir) {
    var dirname = path.normalize(dir);
    if (fs.existsSync(dirname)) {
        log.warn('Warn: Directory already exists. Use:\n  cd ' + dirname);
        return;
    }
    fs.mkdirSync(dirname);
    log.info('Info: Directory created. Use:\n  cd ' + dirname);
}

function createBaseFiles(base) {
    var base;
    var fileList = [
        'src/css/index/index.css',
        'src/js/index/index.js',
        'src/images/'
    ];
    if (base) {
        base = path.normalize(base);
        base = base.match(/[\/\\]$/) ? base : base + '/';
    } else {
        base = './';
    }
    fileList.forEach(function(f, i) {
        var p = base + f;
        var pObj = path.parse(p);
        var dir = path.normalize(pObj.dir);
        var tmpPath = '';
        if (!fs.existsSync(p)) {
            if (pObj.ext) {
                dir.split(path.sep).forEach(function(d, i) {
                    tmpPath = path.join(tmpPath, d);
                    if (!fs.existsSync(tmpPath)) {
                        fs.mkdirSync(tmpPath);
                    }
                });
                fs.writeFileSync(p, '', {encoding: 'utf8', flag: 'a'});
            } else {
                var dirArr = dir.split(path.sep);
                dirArr.push(pObj.base);
                dirArr.forEach(function(d, i) {
                    tmpPath = path.join(tmpPath, d);
                    if (!fs.existsSync(tmpPath)) {
                        fs.mkdirSync(tmpPath);
                    }
                });
            }
        }
    });
    log.info('Info: Directory initialization success.');
}

cmd.version('0.0.1')
    .usage('[command] [option]')
    .option('-p, --port', 'Set server port. Default as 8081.')
    .option('-d, --debug', 'Copy directories from src to dist.');

cmd.command('init [dir]')
    .description('Initialize a directory as project root.')
    .action(function(dir) {
        if (dir) {
            imMkDir(dir);
            createBaseFiles(dir);
        } else {
            createBaseFiles();
        }
    });

cmd.command('new <dirname>')
    .description('Create file or directory. eg：' + commandName + ' new a/b/c.txt')
    .action(function(dirname) {
        var pathObj = path.parse(dirname);
        if (pathObj.ext || pathObj.name.indexOf('.') === 0) {
            if (fs.existsSync(dirname)) {
                log.warn('Warn: File already exists.');
                return;
            }
            fs.writeFileSync(dirname, '', {encoding: 'utf8', flag: 'a'});
            log.info('Info: ' + dirname + ' create success.');
        } else {
            imMkDir(dirname);
        }
    });

cmd.command('server [option]')
    .description('Start static server.')
    .action(function(port) {
        var port = +port;
        if (isNaN(port)) {
            port = 8081;
        }
        http.createServer(function(req, res) {
            req.addListener('end', function() {
                var ss = new static.Server('.');
                ss.serve(req, res).addListener('error', function(err) {
                    log.error("Error: " + req.url + " -- " + err.message);
                });
            }).resume();
        }).listen(port);
        log.text('Server is running at http://127.0.0.1:' + port + '.');
    });

module.exports = cmd;