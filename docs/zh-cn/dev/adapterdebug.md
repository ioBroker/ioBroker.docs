---
title: 调试
lastChanged: 14.09.2018
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/adapterdebug.md
hash: Cz67x0YZ6eFTiBBw1qO/E8odJ7LNuUYZPNlxe9Xq/Lc=
---
# 调试适配器
## 使用 Chrome 调试适配器
Node.JS 支持使用 Chrome 进行调试。

如果您在 ioBroker 中停止适配器，然后像这样从控制台启动它：

```
cd /opt/iobroker
iobroker stop sayit
node --inspect node_modules/iobroker.sayit/main.js --debug
```

重要的是 `-–inspect`

然后输出这样的东西：

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

之后，您可以通过在 Chrome 中键入链接来使用 Chrome 进行调试：

![铬合金](../../de/dev/media/adapterdebug1.png)

*已测试：Windows、Chrome 55、node.js 6.9.2*

### 使用 Chrome 进行远程调试
如果 iobroker 未在与 chrome 相同的机器上运行，则该命令基于上面的示例：

```
node --inspect-brk=0.0.0.0:9229 node_modules/iobroker.sayit/main.js --debug
```

与上面相比，参数 `--inspect-brk` 提供，

当调试器启动时，在适配器的第一行设置断点。

如果你不总是想单独复制链接启动调试，也可以在chrome中调出如下页面：

```
chrome://inspect
```

然后输入您的 **oBroker 计算机** 的 IP 地址和端口，通过与 inspect 命令完全相同的配置进行一次。

调试会话会在命令启动后显示在那里，并且可以一键启动。

chrome 调试选项很棒。
您拥有从 **web 调试** 中了解到的所有选项：断点、条件、监视、调用堆栈、范围检查、控制台输出等。

图片和英文说明在[这里](https://software.intel.com/en-us/xdk/articles/using-chrome-devtools-to-debug-your-remote-iot-nodejs-application)

如果尚未安装，iobroker 计算机上需要节点检查器：

```
npm install -g node-inspector
```

## 使用 WebStorm 调试
## 使用 §§SSSSS_0 进行调试§§
如果您使用 `VS Code` 打开目录，则在打开适配器目录（`File=>Open folder...` 菜单）后，您可以调试适配器。

`.vscode/launch.js` 文件中的配置应如下所示：

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
适配器停止后（`iobroker stop ADAPTER_NAME`），您可以在 VS Code 中启动适配器：![VS代码](../../de/dev/media/adapterdebug10.png)

选择 `Launch Program` 并单击 `Play` 按钮后，适配器启动，您可以在本地进行调试。

### 远程调试
为此，您应该专门在 ioBroker 服务器上启动适配器。

```
d /opt/iobroker
obroker stop ADAPTERNAME
ode --inspect-brk=0.0.0.0:9229 node_modules/iobroker.ADAPTERNAME/main.js --debug
```

之后可以连接 `VS Code` 进行处理 (`attach`)。

![VS代码](../../de/dev/media/adapterdebug11.png)