---
title: 调试
lastChanged: 14.09.2018
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/adapterdebug.md
hash: Ut+I3NFMdm9vI6ASK9i8VBIPRKjKBJSlVWTcyAYuh3w=
---
# 调试适配器
## 使用 Chrome 调试适配器
Node.JS 支持使用 Chrome 进行调试。

如果您在 ioBroker 中停止适配器，然后从控制台 (CLI) 启动它，如下所示：

```
cd /opt/iobroker
iobroker stop sayit
node --inspect node_modules/iobroker.sayit/main.js --debug
```

重要的是`-–inspect`

然后输出类似这样的内容：

```
Debugger listening on port 9229.
Warning: This is an experimental feature and could change at any time.
To start debugging, open the following URL in Chrome:
    chrome-devtools://devtools/remote/serve_file/@60cd6e859b9f557d2312f5bf532f6aec5f284980/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9229/9415dda6-0825-40ed-855c-83c6142e56e9
2016-12-27 15:23:02.637  - error: sayit.0 adapter disabled
starting. Version 1.3.1 in /opt/iobroker/node_modules/iobroker.sayit, node: v6.9.2
2016-12-27 15:23:02.647  - info: sayit.0 starting. Version 1.3.1 in /opt/iobroker/node_modules/iobroker.sayit, node: v6.9.2
Debugger attached.
```

如果您在 Chrome 中输入输出链接，则可以使用 Chrome 进行调试：

![铬合金](../../de/dev/media/adapterdebug1.png)

*测试：Windows、Chrome 55、node.js 6.9.2*

### 使用 Chrome 进行远程调试
如果 iobroker 没有在运行 Chrome 浏览器的同一台计算机上运行，则命令基于上面的示例：

```
node --inspect-brk=0.0.0.0:9229 node_modules/iobroker.sayit/main.js --debug
```

与上面相比，参数`--inspect-brk`确保，

当您启动调试器时，断点就设置在适配器的第一行。

如果你并不总是想复制链接单独启动调试，也可以在chrome中访问以下页面：

```
chrome://inspect
```

然后通过配置输入您的 **ioBroker 计算机** 的 IP 地址和端口，就像使用 Inspect 命令一样。

启动命令后，调试会话将显示在那里，并且可以一键启动。

Chrome 的调试功能非常棒。
您拥有从 **Web 调试** 中了解到的所有选项：断点、条件、`watch`、`call stack`、`scope inspection`、控制台输出等。

图片和英文说明位于[这里](https://software.intel.com/en-us/xdk/articles/using-chrome-devtools-to-debug-your-remote-iot-nodejs-application)。

如果尚未安装，则 ioBroker 计算机上需要节点检查器：

```
npm install -g node-inspector
```

通常，节点检查器会随 ioBroker 自动安装。

## 使用 WebStorm 进行调试
## 使用 `Visual Studio Code` 进行调试
如果您使用`VS Code`打开目录，则在打开适配器目录（`File=>Open folder...`菜单）后，您可以调试适配器。

文件`.vscode/launch.js`中的配置应如下所示：

```
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceFolder}\\main.js",
            "args": ["--debug"]
        },
        {
            "name": "Attach to Process",
            "type": "node",
            "request": "attach",
            "address": "IO_BROKER_IP_ADDRESS",
            "port": 9229
          }
    ]
}
```

### 本地调试
适配器停止后 (`iobroker stop ADAPTER_NAME`)，您可以在 VS Code 中启动适配器：![VS代码](../../de/dev/media/adapterdebug10.png)

选择`Launch Program`并单击`Play`按钮后，适配器将启动，您可以在本地进行调试。

### 远程调试
为此，您应该专门在 ioBroker 服务器上启动适配器。

```
d /opt/iobroker
obroker stop ADAPTERNAME
ode --inspect-brk=0.0.0.0:9229 node_modules/iobroker.ADAPTERNAME/main.js --debug
```

然后，您可以将 `VS Code` 连接到进程 (`attach`)。

![VS代码](../../de/dev/media/adapterdebug11.png)