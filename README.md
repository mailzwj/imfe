# imfe
前端本地工程管理工具

## Install

```
npm install -g imfe
```

## 命令

```shell
$ imfe -h

  Usage: imfe [command] [option]

  Commands:

    init [dir]       Initialize a directory as project root.
    new <dirname>    Create file or directory. eg：imfe new a/b/c.txt
    server [option]  Start static server.
    build [option]   Minify javascript and css files.

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
    -p, --port     Set server port. Default as 8081.
    -d, --debug    Copy directories from src to dist.
```

## 示例

```shell
# 安装好工具后，初始化项目（若init后不带目录名，则初始化当前目录）
imfe init im

# 项目初始化完成，会产生一个im的项目目录，里面包含src目录
cd im

# 查看目录中的文件 src/css、src/js、src/images
ls （windows命令：dir）

# 在src目录中添加静态资源代码，完成后压缩代码（生成dist目录）
imfe build

# 控制台罗列编译文件列表，启动本地服务
imfe server

# 通过静态服务器访问静态资源
http://127.0.0.1:8081/dist/js/index/index.min.js
```