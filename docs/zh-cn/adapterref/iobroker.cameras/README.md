---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.cameras/README.md
title: ioBroker.相机
hash: dZX3hFUGrq1Y8V1kpiebGfWcc/EzvTPUzfh6XSKvtmM=
---
![标识](../../../en/adapterref/iobroker.cameras/admin/cameras.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.cameras.svg)
![下载](https://img.shields.io/npm/dm/iobroker.cameras.svg)
![依赖状态](https://img.shields.io/david/ioBroker/iobroker.cameras.svg)
![已知漏洞](https://snyk.io/test/github/ioBroker/ioBroker.cameras/badge.svg)
![新平台](https://nodei.co/npm/iobroker.cameras.png?downloads=true)
![特拉维斯-CI](http://img.shields.io/travis/ioBroker/ioBroker.cameras/master.svg)

# IoBroker.相机
## IoBroker 的 IP 摄像机适配器
您可以将 Web/IP 摄像头集成到 vis 和其他可视化中。
如果您配置名为 `cam1` 的摄像头，它将在 `http(s)://iobroker-IP:8082/cameras.0/cam1` 下的 Web 服务器上可用。

此外，可以通过消息请求图像：

```js
sendTo('cameras.0', 'image', {
    name: 'cam1',
    width: 100, // optional
    height: 50, // optional
    angle: 90,   // optional
    noCache: true // optional, if you want to get the image not from cache
}, result => {
    const img = 'data:' + result.contentType + ';base64,' + result.data;
    console.log('Show image: ' + img);
});
```

结果始终为`jpg`格式。

支持的相机：

- 通过 RTSP 使用“Reolink E1 Pro”（重要，没有“Pro”则无法工作）
- 通过 eusec 适配器的 `Eufy`
- [HiKam](https://support.hikam.de/support/solutions/articles/16000070656-zugriff-auf-kameras-der-2- Generation-via-onvif-f%C3%BCr-s6-q8-a7-2- Generation-) 通过 ONVIF 的第二代和第三代（适用于 S6、Q8、A7 第二代）、A7 Pro、A9
- [通过 HiKam 适配器的 WIWICam M1](https://www.wiwacam.com/de/mw1-minikamera-kurzanleitung-und-faq/)
- RTSP Native - 如果您的相机支持 RTSP 协议
- 通过 HTTP URL 截屏 - 如果你可以通过 URL 从相机获取快照

### 图片网址
这是一个正常的 URL 请求，所有参数都在 URL 中。例如 `http://mycam/snapshot.jpg`

### 带有基本身份验证的 URL 图像
这是图片的 URL 请求，其中所有参数都在 URL 中，但您可以提供基本身份验证的凭证。例如 `http://mycam/snapshot.jpg`

### FFmpeg
如果您想访问 RTSP 摄像机上的快照，可以使用 ffmpeg。您需要在系统上安装 ffmpeg：

- Windows 已预编译 ffmpeg，无需下载任何东西。（Windows 版本取自此处：https://www.gyan.dev/ffmpeg/builds/ffmpeg-git-full.7z）
- Linux：`sudo apt-get install ffmpeg -y`

如何更新`ffmpeg`的 Windows 版本：

- 下载文件 https://www.gyan.dev/ffmpeg/builds/ffmpeg-git-full.7z
- 提取“bin/ffmpeg.exe”
- 将“ffmpeg.exe”重命名为“win-ffmpeg.exe”
- 将“win-ffmpeg.exe”压缩为“win-ffmpeg.zip”
- 将“win-ffmpeg.zip”放在此存储库的根目录中
- 执行`win-ffmpeg.exe --version`获取版本并将其保存到`main.ts``WIN_FFMPEG_VERSION`常量中（如`2025-02-02-git-957eb2323a-full_build-www.gyan.dev`）

以下是如何添加 Reolink E1 的示例：

![RTSP 协议](../../../en/adapterref/iobroker.cameras/img/rtsp.png)

### Ezviz - 如何为 EZVIZ 摄像机重新启用 RTSP
由于某种原因，EZVIZ 决定禁用其摄像机的 RTSP：

- 打开 EZVIZ 应用程序并转到：个人资料/设置/Lan Live View
- 开始扫描，然后选择相机：
- 使用您的相机密码登录（默认密码在相机贴纸上）
- 按“设置”图标并选择“本地服务设置”
- 启用 RTSP

## 如何添加新相机（针对开发人员）
要添加新相机，您必须在 GitHub 上创建一个 Pull 请求并进行以下更改：

- 在“cameras”文件夹中添加一个新文件。这是一个从相机读取单张图像的后端。
- 在“src/src/Types/”文件夹中添加一个 GUI 文件。这是相机的配置对话框
- 在`src/src/Tabs/Cameras.js`文件中添加此对话框，类似于添加其他相机。只需添加两行：
- 导入新的配置对话框，如“从'../Types/RTSPMyCam'导入 RTSPMyCamConfig；”
- 使用新相机扩展 `TYPES` 结构，如 `mycam: { Config: RTSPMyCamConfig, name: 'MyCam' },`

属性名称必须与`cameras`文件夹中文件的名称相同。

待办事项
- [ ] 如果对话框打开或关闭，则向 RTSP 摄像机发送新的订阅请求

<!-- 下一版本的占位符（在行首）：

### **正在进行中** -->

## Changelog
### **WORK IN PROGRESS**
* (@GermanBluefox) Completely rewritten in TypeScript
* (@GermanBluefox) Added Ezviz cameras

### 2.1.2 (2024-07-15)
* (bluefox) Updated packages

### 2.1.1 (2024-07-07)
* (bluefox) Removed withStyles package

### 2.0.8 (2024-06-09)
* (bluefox) Packages updated
* (bluefox) Allowed selecting another source (with bigger resolution) for URL cameras

### 2.0.5 (2023-12-19)
* (bluefox) Minimal supported Node.js version is 18
* (bluefox) Corrected widgets

### 1.4.0 (2023-12-04)
* (bluefox) Changed widget set name
* (bluefox) Added the caching of images with time, size and rotation
* (bluefox) Added timeout for RTSP cameras

### 1.3.0 (2023-09-28)
* (bluefox) Utilized the new js-controller feature: sendToUI. RTSP Streaming works only with js-controller 5.0.13 or higher
* (bluefox) Implemented a second widget for simple cameras

### 1.2.3 (2023-09-27)
* (bluefox) Added WiWiCam MW1 and HiKam cameras

### 1.2.2 (2023-07-07)
* (bluefox) Corrected passwords with exclamation mark

### 1.2.1 (2023-07-06)
* (bluefox) Added eufy camera

### 1.1.1 (2023-03-15)
* (bluefox) Added Reolink E1 camera

### 1.0.3 (2023-01-11)
* (bluefox) Corrected GUI config error

### 1.0.2 (2023-01-07)
* (bluefox) added RTSP camera
* (bluefox) added cache of snapshots

### 0.2.0 (2022-09-27)
* (bluefox) GUI updated to MUIv5

### 0.1.8 (2022-02-13)
* (bluefox) replaced the deprecated package `request` with `axios`

### 0.1.5 (2022-02-13)
* (bluefox) Preparations for js-controller@4.x are made

### 0.1.4 (2021-07-13)
* (bluefox) Add a role for states

### 0.1.3 (2020-08-08)
* (Hirsch-DE) Parameters were applied

### 0.1.2 (2020-06-03)
* (bluefox) implemented get image by message

### 0.1.0
* (bluefox) URL and URL with basic authentication were implemented

### 0.0.1
* (bluefox) initial release

## License
MIT License

Copyright (c) 2020-2025 bluefox <dogafox@gmail.com>

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