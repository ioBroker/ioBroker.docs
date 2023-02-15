---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.hid-community/README.md
title: ioBroker.hid-社区
hash: wrdc7UMRCczdXq6tBx2ACtPn3vjI1vq4ZZHKf7MXwTY=
---
![商标](../../../en/adapterref/iobroker.hid-community/admin/hid.png)

![安装数量](http://iobroker.live/badges/hid-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.hid-community.svg)
![构建状态](https://ci.appveyor.com/api/projects/status/9w4enhutav1e2leu?svg=true)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

# IoBroker.hid-社区
＃＃ 描述
HID 设备的适配器，例如苹果遥控器

## 初始创建
此适配器最初由 @soef 在 https://github.com/soef/ioBroker.hid 创建，但不再维护，因此我们将其移至 iobroker-community 以便修复错误。感谢@soef 的工作。

＃＃ 安装
请安装 bia Admin

可能是需要以下额外的东西

* **准备权限**：执行`iob fix`
* **安装附加包**：`sudo apt install libusb-1.0-0-dev`
* **设置适当的权限**：如果设备无法打开，请查看 https://github.com/node-hid/node-hid#udev-device-permissions

＃＃ 状态
有两个状态组，raw 和 key。密钥组只会被解雇，是一个映射被发现。

只有状态 xxx.double、xxx.single 和 xxx.long 中的一个会在事件中发生变化。
状态 xxx.dsl 得到结果.double、single 或 long。
动作指示向下、向上或重复。

## 映射
添加或编辑 io-package.json 文件中的映射部分以查看键代码的名称。
这不是必需的，无论如何都会创建原始数据状态。

```
  "mappings": {
    "26017F2A55": "AllLightsOn-(AM)",
    "26017F1867": "AllLightsOff-(Memory)",
    "26857A21DE": "OK",
    "26857A55AA": "ESC"
  },
```

<!--

＃＃＃＃ 要求
在对 node-hid 项目进行小的更改之前，node-hid 模块无法在 Windows 10 上运行。
安装 iobroker.hid-community 后编辑：

```
<path to iobroker>/node_modules/iobroker.hid-community/node_modules/node-hid/hidapi/windows/hid.c
```

寻找：

```
open_device
```

更改函数调用“CreateFileA”的第二个和第三个参数：

```
static HANDLE open_device(const char *path, BOOL enumerate)
{
    ...

	handle = CreateFileA(path,
		//desired_access,                    // original line
		GENERIC_WRITE | GENERIC_READ,        // replaced line
		//share_mode,                        // original line
		FILE_SHARE_READ | FILE_SHARE_WRITE,  // replaced line
		NULL,
		OPEN_EXISTING,
		FILE_FLAG_OVERLAPPED,/*FILE_ATTRIBUTE_NORMAL,*/
		0);

	...
}
```

要重建 node-hid 模块，请更改目录：

```
cd <path to iobroker>/node_modules/iobroker.hid-community/node_modules/node-hid
```

执行：

```
npm install --build-from-source
```

重新启动 iobroker.hid-community 模块...
-->

## Changelog
### 0.3.0 (2023-01-04)
* Renamed to hid-community

### 0.2.0 (2022-12-30)
* General updates

## License
The MIT License (MIT)

Copyright (c) 2015-2023 ioBroker-Community, soef <soef@gmx.net>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.