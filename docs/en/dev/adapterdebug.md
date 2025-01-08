---
title: debugging
lastChanged: 14.09.2018
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/dev/adapterdebug.md
hash: Ut+I3NFMdm9vI6ASK9i8VBIPRKjKBJSlVWTcyAYuh3w=
---
# Debugging adapters
## Debugging adapters with Chrome
Node.JS supports debugging with Chrome.

If you stop an adapter in ioBroker and then start it from the console (CLI) like this:

```
cd /opt/iobroker
iobroker stop sayit
node --inspect node_modules/iobroker.sayit/main.js --debug
```

Important is `-–inspect`

Then something like this is output:

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

After that you can debug with Chrome by entering the output link in Chrome:

![Chrome](../../de/dev/media/adapterdebug1.png)

*Tested: Windows, Chrome 55, node.js 6.9.2*

### Remote debugging with Chrome
If iobroker is not running on the same computer as Chrome Browser, then the command is based on the example above:

```
node --inspect-brk=0.0.0.0:9229 node_modules/iobroker.sayit/main.js --debug
```

the parameter `--inspect-brk` ensures, in comparison to above,

that a breakpoint is set on the first line of your adapter as soon as the debugger starts.

If you don't want to copy the link to start the debug every time, you can also open the following page in Chrome:

```
chrome://inspect
```

then enter the IP address and port of your **ioBroker computer** via Configuration exactly as in the Inspect command.

The debug session is then displayed after the command has been started and can be started with one click.

The Chrome debugging options are fantastic.
You have all the options you know from **web debugging**: breakpoints, also with conditions, `watch`, `call stack`, `scope inspection`, console output, etc.

Pictures and English description can be found in [here](https://software.intel.com/en-us/xdk/articles/using-chrome-devtools-to-debug-your-remote-iot-nodejs-application).

If not yet installed, the node-inspector is required on the ioBroker computer:

```
npm install -g node-inspector
```

Normally the node-inspector is installed automatically with the ioBroker.

## Debugging with WebStorm
## Debugging with `Visual Studio Code`
If you open a directory with `VS Code`, then after opening Adapter directory (`File=>Open folder...` menu), you can then debug an adapter.

The configuration in the file `.vscode/launch.js` should look like this:

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

### Local Debugging
After the adapter is stopped (`iobroker stop ADAPTER_NAME`), you can start the adapter in VS Code: ![VS Code](../../de/dev/media/adapterdebug10.png)

After selecting `Launch Program` and clicking `Play` button, the adapter will start and you can debug locally.

### Remote Debugging
To do this, you should specifically start the adapter on the ioBroker server.

```
d /opt/iobroker
obroker stop ADAPTERNAME
ode --inspect-brk=0.0.0.0:9229 node_modules/iobroker.ADAPTERNAME/main.js --debug
```

You can then connect `VS Code` to process (`attach`).

![VS Code](../../de/dev/media/adapterdebug11.png)