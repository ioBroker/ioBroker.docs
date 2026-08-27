---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.cameras/README.md
title: ioBroker.cameras
hash: fSnqPVjJjTyJTJj/UZea9dcomRiNu92/HLbsmdqYpvc=
---
![标识](../../../en/adapterref/iobroker.cameras/admin/cameras.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.cameras.svg)
![下载](https://img.shields.io/npm/dm/iobroker.cameras.svg)
![依赖状态](https://img.shields.io/david/ioBroker/iobroker.cameras.svg)
![已知漏洞](https://snyk.io/test/github/ioBroker/ioBroker.cameras/badge.svg)
![NPM](https://nodei.co/npm/iobroker.cameras.png?downloads=true)
![特拉维斯-CI](http://img.shields.io/travis/ioBroker/ioBroker.cameras/master.svg)

# IoBroker.cameras
## IoBroker 的 IP 摄像头适配器
您可以将网络/IP摄像头集成到可视化和其他可视化工具中。

如果您配置的摄像头名称为`cam1`，则它在网络服务器上的名称为`http(s)://iobroker-IP:8082/cameras.0/cam1`。

**请完全使用该URL，不要添加文件扩展名。** 每次请求都会从摄像头获取新帧，因此定期重新加载即可获得实时图像。

此外，适配器还会将最后一帧存储在名为 `cameras.0/cam1.jpg` 的文件下，而 Web 服务器恰好也将其存储在名为 `http(s)://iobroker-IP:8082/cameras.0/cam1.jpg` 的文件下。该文件仅在适配器启动时以及处理名为 `image` 的消息时才会被重写——它不会通过请求进行更新。因此，无论配置的刷新间隔是多少，将控件指向 `.jpg` 都会显示一个永远不会刷新的图片。

此外，还可以通过消息请求图像：

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

结果始终为 `jpg` 格式。

支持的相机：

- 通过 RTSP 连接 `Reolink E1 Pro`（重要提示，如果没有 `Pro` 将无法工作）
- 通过 eusec 适配器使用 `Eufy`
- [HiKam](https://support.hikam.de/support/solutions/articles/16000070656-zugriff-auf-kameras-der-2- Generation-via-onvif-f%C3%BCr-s6-q8-a7-2- Generation-) 通过 ONVIF 的第二代和第三代（适用于 S6、Q8、A7 第二代）、A7 Pro、A9
- [WIWICam M1 通过 HiKam 适配器](https://www.wiwacam.com/de/mw1-minikamera-kurzanleitung-und-faq/)
- RTSP 原生 - 如果您的摄像头支持 RTSP 协议
- 通过 HTTP URL 获取屏幕截图 - 如果您可以通过 URL 从相机获取快照。

### 图片网址
这是一个普通的 URL 请求，所有参数都包含在 URL 中。例如 `http://mycam/snapshot.jpg`

### 使用基本身份验证的 URL 图片
这是一个图片 URL 请求，所有参数都在 URL 中，但您可以提供基本身份验证的凭据。例如 `http://mycam/snapshot.jpg`

### FFmpeg
如果要访问RTSP摄像头的快照，可以使用ffmpeg。您需要在系统上安装ffmpeg：

- Windows 系统已预编译了 ffmpeg，无需下载任何内容。（Windows 版本取自此处：https://www.gyan.dev/ffmpeg/builds/ffmpeg-git-full.7z）
- Linux：`sudo apt-get install ffmpeg -y`

如何更新 Windows 版本的 `ffmpeg`：

- 下载文件 https://www.gyan.dev/ffmpeg/builds/ffmpeg-git-full.7z
- 提取 `bin/ffmpeg.exe`
- 将 `ffmpeg.exe` 重命名为 `win-ffmpeg.exe`
将 `win-ffmpeg.exe` 压缩成 `win-ffmpeg.zip`
- 将 `win-ffmpeg.zip` 放置在此仓库的根目录下
- 执行 `win-ffmpeg.exe --version` 获取版本号并将其保存到 `main.ts` 的 `WIN_FFMPEG_VERSION` 常量中（例如 `2025-02-02-git-957eb2323a-full_build-www.gyan.dev`）。

以下是添加 Reolink E1 的示例：

![RTSP](../../../en/adapterref/iobroker.cameras/img/rtsp.png)

### Ezviz - 如何重新启用 EZVIZ 摄像机的 RTSP 功能
出于某种原因，EZVIZ决定在其摄像机中禁用RTSP功能：

打开 EZVIZ 应用，然后依次进入：个人资料 / 设置 / 局域网实时视图
开始扫描，然后选择相机：
- 使用您的相机密码登录（默认密码在相机标签上）
- 按下设置图标，然后选择本地服务设置
- 启用RTSP

## 如何添加新摄像头（面向开发者）
### 简便方法：通用型新制造商
大多数摄像头不需要任何代码。`universal` 类型由 `src-admin/public/data/` 中的数据文件驱动，这些数据文件由 ispyconnect.com 生成：

1. 将制造商添加到 `tools/parser.js` 文件顶部的 `MANUFACTURERS` 映射中。
2. 运行 `node tools/parser.js <制造商>` — 这会将文件写入 `src-admin/public/data/<制造商>.json`

以及更新 `manufacturers.json`

3. 运行 `node tools/logos.js` 添加徽标。它会使用 `simple-icons` 中的品牌标识。

集合中包含制造商信息，否则将生成一个字母组合图案。要使用真正的徽标，只需将 `<manufacturer>.svg`、`.png` 或 `.jpg` 放入 `src-admin/public/data/` 中即可——现有文件永远不会被覆盖（除非指定了 `--force`）。

然后，新的制造商会出现在“按制造商”相机类型的下拉菜单中。

### 专用相机类型
仅当摄像头需要独立逻辑时才需要。创建拉取请求时：

- `src/types.d.ts` — 将键添加到 `CameraType` 联合体，添加 `CameraConfigMyCam extends CameraConfig`

接口并将其添加到 `CameraConfigAny` 联合体

- `src/cameras/MyCamCamera.ts` — 扩展 `GenericCamera` 以实现纯 HTTP 快照，或扩展 `GenericRtspCamera`

对于 RTSP（在调用 `super.init()` 之前，在 `init()` 中填写 `this.settings` 和 `this.decodedPassword`）

- `src/cameras/Factory.ts` — 为新类型添加 `case`
- `src-admin/src/Types/MyCam.tsx` — 配置对话框，继承自 `ConfigGeneric`
- `src-admin/src/Tabs/Cameras.tsx` — 导入对话框并将其添加到 `TYPES` 结构中，例如：

`mycam: { Config: MyCamConfig as unknown as IConfigGeneric, name: 'MyCam' },`。密钥必须与后端使用的`type`相同。

- 将新标签添加到 `src-admin/src/i18n/` 目录下的所有文件

### Go2rtc（可选）
如果在设置中启用了`go2rtc`，则会使用本地[go2rtc](https://github.com/AlexxIT/go2rtc)进程替换`ffmpeg`进程：适配器中每个快照对应一个进程，Web扩展中每个摄像头对应一个进程。go2rtc为每个摄像头维护一个连接，并服务于所有使用该连接的用户。

go2rtc 将其 API 绑定到 `127.0.0.1`，浏览器无法直接访问。所有访问都通过 `web` 适配器进行，因此它使用与 ioBroker 其余部分相同的身份验证和相同的 http/https 方案——无需打开额外的端口。除了现有的 WebSocket 之外，每个摄像头还提供 `/<instance>/<camera>/stream.mjpeg`，该接口可以在纯 `<img src="...">` 中使用。

如果找不到二进制文件或二进制文件无法启动，适配器将透明地回退到 `ffmpeg`。

## 待办事项
- [ ] 如果对话框打开或关闭，则发送新的 RTSP 摄像头订阅请求

<!-- 下一版本的占位符（位于行首）：

### **正在进行中** -->

## Changelog
### 3.0.2 (2026-08-17)
* (@GermanBluefox) The web extension can now request snapshots via messages instead of the private HTTP server, which is used automatically when the cameras adapter runs on a different host than the web instance
* (@GermanBluefox) Fixed: a failed snapshot request answered with an empty `{}` instead of the error message

### 3.0.1 (2026-08-16)
* (@GermanBluefox) Completely rewritten in TypeScript
* (@GermanBluefox) Added Ezviz cameras
* (@GermanBluefox) Snapshot requests are answered with `Cache-Control: no-store` so browsers cannot show a stale frame
* (@GermanBluefox) Fixed: a list of allowed IPs was never split correctly, so any list with more than one address rejected every request
* (@GermanBluefox) Fixed: connections from the IPv6 loopback address were not recognized as local
* (@GermanBluefox) Fixed: a failed image request could terminate the adapter with `ERR_HTTP_HEADERS_SENT`
* (@GermanBluefox) The cameras are reachable immediately after start instead of only after the first frame of every camera was grabbed
* (@GermanBluefox) The web extension picks up a changed key by itself, without restarting ioBroker.web
* (@paul179) Added Steinel cameras (as manufacturer of the universal camera type)
* (@GermanBluefox) The universal camera type now offers ~50 manufacturers with ~13000 models, each with a logo
* (ioBroker-Bot) Removed the deprecated `common.materialize` from io-package.json
* (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now
* (ioBroker-Bot) Adapter requires node.js >= 22 now
* (@GermanBluefox) Added Instar cameras
* (@GermanBluefox) Added optional go2rtc support for snapshots and live streams, proxied via the web adapter
* (@GermanBluefox) Fixed: the second viewer of the same camera did not receive any picture
* (@GermanBluefox) Added two widgets for ioBroker.devices: RTSP camera and snapshot camera
* (@GermanBluefox) Fixed: the `.running` state did not start or stop the stream
* (@GermanBluefox) Fixed: width/height/angle of the `image` message were ignored
* (@GermanBluefox) Fixed: a camera in the dialog of the snapshot widget was never used

### 2.1.2 (2024-07-15)
* (bluefox) Updated packages

### 2.1.1 (2024-07-07)
* (bluefox) Removed withStyles package

### 2.0.8 (2024-06-09)
* (bluefox) Packages updated
* (bluefox) Allowed selecting another source (with bigger resolution) for URL cameras

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2020-2026 bluefox <dogafox@gmail.com>

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