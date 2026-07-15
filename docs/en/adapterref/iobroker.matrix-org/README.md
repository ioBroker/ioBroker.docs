![Logo](admin/matrix-logo.png)
# ioBroker.matrix-org

[![NPM version](https://img.shields.io/npm/v/iobroker.matrix-org.svg)](https://www.npmjs.com/package/iobroker.matrix-org)
[![Downloads](https://img.shields.io/npm/dm/iobroker.matrix-org.svg)](https://www.npmjs.com/package/iobroker.matrix-org)
![Number of Installations](https://iobroker.live/badges/matrix-org-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/matrix-org-stable.svg)

**Tests:** ![Test and Release](https://github.com/oelison/ioBroker.matrix-org/workflows/Test%20and%20Release/badge.svg)

## matrix-org adapter for ioBroker

Adapter for matrix push messages
Big thanks for creating matrix (https://matrix.org/) for creating a full free communication base

### Configuration

Best: Run your own client on your server!

Create an own user as your BOT with password. Create a room for all members who want the bot messages. Add your BOT to this room (not needed if autojoin is active). Add all members to this room. Put all the data into the config. (BOT name, password, room name)

### Usage

Add as many instances as you need. Add a value to matrix-org.0.sendMessage on the way you like, with js
If you set "image" to matrix.0.sendMessage, it will send the matrix logo to your channel.
Or in js use: 
```
sendTo("matrix-org.0", "Hello World!");
```
Or use the blockly symbol in Sendto.

For images from local file system (Linux): 
```
sendTo("matrix-org.0",{file: "file:///tmp/images/test.png"});
```
For images from local file system (Windows):
``` 
sendTo("matrix-org.0",{file: "file:///C:/tmp/images/test.png"});
```
For images as reference: 
```
sendTo("matrix-org.0",{file: "https://www.abcd/images/test.png"});
```
For images in base64: 
```
sendTo("matrix-org.0",{file:{type:"image/png",base64:"iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACmSURBVFhH7ZdhCoAgDEZnd9D737T8xJkNNY1Ef+yB2LTcC1qWOT20kCBgjIkh0WwfmeuIxyGYnRzIPElgFSqgAvsKOOdCzeZ1y7EcZzDG16HvwtckihLdA4xxk3HeGGttc17Cc+lN6Ds/dlO6w6/ItQHn7H4GcDK3Em/zNboE5KKjcQstQxVQARVYLlDdC2YzvBfMQgVUYB8BlMWfn2E1ZJ7Fv+dEF0UZoNhXp9NnAAAAAElFTkSuQmCC"}});
```
Or
```
sendTo("matrix-org.0",{file:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACmSURBVFhH7ZdhCoAgDEZnd9D737T8xJkNNY1Ef+yB2LTcC1qWOT20kCBgjIkh0WwfmeuIxyGYnRzIPElgFSqgAvsKOOdCzeZ1y7EcZzDG16HvwtckihLdA4xxk3HeGGttc17Cc+lN6Ds/dlO6w6/ItQHn7H4GcDK3Em/zNboE5KKjcQstQxVQARVYLlDdC2YzvBfMQgVUYB8BlMWfn2E1ZJ7Fv+dEF0UZoNhXp9NnAAAAAElFTkSuQmCC"});
```
For html please follow this spec: https://spec.matrix.org/v1.3/client-server-api/#mroommessage-msgtypes
E.g.: 
```
sendTo("matrix-org.0",{html: "<h1>Hello World!</h1>", text: "Hello World!"});
```
or 
```
sendTo("matrix-org.0",{html: "<table><tr><td>1</td><td>2</td></tr><tr><td>a</td><td>b</td></tr><table>", text: "Your client can not show html!"});
```
If your client is not able to decode html you will get the text.
If your client do not support table it either show the text or simply 12ab.

### to test your configuration use sendMessage

simply open the objects and change the string of one matrix-org instance
Mostly the port is 443, if you have a public system like matrix.org
The port is sometimes 8448, when you have a self hosted system without proxy, but then you know it.

If you like to test it:
Server: matrix.org Port: 443
room: #test-ioBroker-adapter:matrix.org
Join this room and try it out with your own credentials

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* some bumps

### 1.2.2 (2026-03-29)
* string normalisation due to bug report #95
* some bumbs

### 1.2.1 (2026-02-12)
* set body in send file to matrix

### 1.2.0 (2025-10-17)
* upgrade matrix-js-sdk to 38.4.0 node 22 required
* switch to ESM
* eslint 9 (what a messi commit)

### 1.1.0 (2024-11-23)
* upgrade matrix-js-sdk
* auto join added (default false)

### 1.0.0 (2023-04-01)
* upgrade matrix-js-sdk (node 18 needed)

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 Christian Oelschlegel <iobrokermatrix@sciphy.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.