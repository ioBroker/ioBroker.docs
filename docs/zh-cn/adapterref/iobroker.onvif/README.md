---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.onvif/README.md
title: ioBroker.onvif
hash: zq9DV1BOr3VI3pXcPtQRTJUyRJslFvIWQbwrUyf01cs=
---
![标识](../../../en/adapterref/iobroker.onvif/admin/onvif.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.onvif.svg)
![下载](https://img.shields.io/npm/dm/iobroker.onvif.svg)
![安装数量](https://iobroker.live/badges/onvif-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/onvif-stable.svg)
![NPM](https://nodei.co/npm/iobroker.onvif.png?downloads=true)

# IoBroker.onvif
**测试：** ![测试与发布](https://github.com/iobroker-community-adapters/ioBroker.onvif/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 ONVIF 适配器
**ONVIF 摄像机适配器**

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

[zur deutschen Dokumentation](README-de.md)

## 添加摄像头
### 发现：
每次启动适配器时，都会使用设置中输入的用户名和密码执行发现操作，并尝试登录到摄像头。如果摄像头尚未添加到“对象”下。

您可以在设置中手动执行设备发现操作。如果摄像头使用不同的凭据，您需要输入这些凭据并执行设备发现操作。您可以在日志中查看该过程的详细信息。

要再次检测到摄像头，只需将其从“对象”中删除即可。

### 手动搜索
如果摄像头发现功能失效，可以手动搜索摄像头。为此，需要手动输入 IP 地址范围和端口号并执行搜索。您可以在日志中查看该过程的详细信息。

## 州
onvif.0.IP_PORT.events 摄像头事件，例如移动侦测。有时需要手动触发事件才能看到。

onvif.0.IP_PORT.general 摄像头的一般信息

onvif.0.IP_PORT.infos 中关于摄像头的信息仅在适配器启动或远程刷新时更新。

视频和快照网址：

onvif.0.IP_PORT.infos.streamUris.MediaProfile_Channel1_MainStream.snapshotUrl.uri

onvif.0.IP_PORT.远程控制摄像机

onvif.0.IP_PORT.remote.refresh 正在更新信息数据

onvif.0.IP_PORT.remote.gotoHomePosition 将云台摄像机设置到初始位置

onvif.0.IP_PORT.remote.gotoPreset 选择云台摄像机预设编号

onvif.0.IP_PORT.remote.snapshot 保存快照到 onvif.0.IP_PORT.snapshot

＃＃ 信息
适配器接收到消息“快照”并返回图像

```javascript
sendTo('onvif.0', 'snapshot', '192_168_178_100_80', (result) => {
  if (result) {
    sendTo('telegram.0', {
      text: result,

      type: 'photo',

      caption: 'camera2',
    });
  }
});
```

## 向 Telegram 发送动议
```javascript
on('onvif.0.192_168_178_100_80.events.RuleEngine/CellMotionDetector/Motion', (obj) => {
  if (obj.state.val === true) {
    sendTo('onvif.0', 'snapshot', '192_168_178_100_80', (result) => {
      if (result) {
        sendTo('telegram.0', {
          text: result,

          type: 'photo',

          caption: 'Camera 2',
        });
      }
    });
  }
});
```

## 将流包含到可视化中
如果需要将视频流显示在 Apple HomeKit 中，请直接在 Yahka 中创建摄像头。如果此方法无效或需要 HKSV 编码，请在 Docker 中安装 Scrypted，然后使用 ONVIF 和 HomeKit 插件添加摄像头。

## Go2rtsp Docker
通常情况下，数据流通过 RTSP 流传输。使用 Motion Eye 进行转换非常消耗资源且存在延迟。转换为 WebRTC 则速度更快，资源消耗更少。我的建议是使用 [go2rtsp](https://github.com/AlexxIT/go2rtc)。为此，需要从 alexxit/go2rtc 创建一个 Docker 镜像。

https://hub.docker.com/r/alexxit/go2rtc

```
 image: alexxit/go2rtc
    network_mode: host # important for WebRTC, HomeKit, UDP cameras
    privileged: true # only for FFmpeg hardware transcoding
    restart: unless-stopped # autorestart on fail or config change from WebUI
    environment:
      - TZ=Europe/Berlin # timezone in logs
    volumes:
      - "~/go2rtc:/config" # folder for go2rtc.yaml file (edit from WebUI)
```

必须为路径 /config 设置卷，并将网络指定为主机。

然后可以通过以下方式访问 go2rtsp

```
http://IP:1984
```

然后您可以添加流。流 URL 可以在例如 `onvif.0.IP_PORT.infos.streamUris.ProfileName.live_stream_tcp.uri` 下找到。

<img src="addgo.png" height="300">

### 将流插入为 iFrame
在可视化界面中添加 `iFrame` 小部件，并使用来自 go2rtsp 的流链接作为源。

`http://192.168.178.1:1984/stream.html?src=camera&mode=webrtc`

## Rtsp2Web Docker
另一种方法是使用 [RTSPtoWeb](https://github.com/deepch/RTSPtoWeb) Docker。但是，这种方法设置起来更复杂。

必须从 ghcr.io/deepch/rtsptoweb:latest 创建 Docker 容器。

<details>

```
docker run --name rtsp-to-web -v /YOURPATHFORCONFIG:/config --network host ghcr.io/deepch/rtsptoweb:latest
```

必须为路径 /config 设置卷，并且必须将网络设置为主机。

然后可以通过以下方式访问 rtsptoweb

```
http://IP:8083
```

然后您可以添加流。流 URL 可以在例如 `onvif.0.IP_PORT.infos.streamUris.ProfileName.live_stream_tcp.uri` 下找到。

<img src="addstream.png" height="600">

接下来我们需要流 ID。为此，请编辑流并复制 URL 中的 ID。
`http://192.168.178.2:8083/pages/stream/edit/ddbdb583-9f80-4b61-bafa-613aa7a5daa5`

## 在可视化界面中插入单个流
然后，在可视化窗口中选择一个 HTML 对象。然后在 HTML 组件下的小部件中输入带有流 ID 的 rtsp2web 服务器：

<img src="html.png" height="150">

## **如果要添加多个流，则必须将 HTML 和脚本中的 `webrtc-url` 和 `webrtc-video` 替换为新的 ID，例如 `webrtc-url2` 和 `webrtc-video2`**
```html
<input
  type="hidden"
  name="webrtc-url"
  id="webrtc-url"
  value="http://192.168.0.2:8083/stream/ddbdb583-9f80-4b61-bafa-613aa7a5daa5/channel/0/webrtc"
/>

<video id="webrtc-video" autoplay muted playsinline controls style="max-width: 100%; max-height: 100%;"></video>
```

在小部件的“脚本”下添加以下脚本：

```javascript
setTimeout(function () {
  function startPlay(videoEl, url) {
    const webrtc = new RTCPeerConnection({
      iceServers: [
        {
          urls: ['stun:stun.l.google.com:19302'],
        },
      ],
      sdpSemantics: 'unified-plan',
    });
    webrtc.ontrack = function (event) {
      console.log(event.streams.length + ' track is delivered');
      videoEl.srcObject = event.streams[0];
      videoEl.play();
    };
    webrtc.addTransceiver('video', { direction: 'sendrecv' });
    webrtc.onnegotiationneeded = async function handleNegotiationNeeded() {
      const offer = await webrtc.createOffer();

      await webrtc.setLocalDescription(offer);

      fetch(url, {
        method: 'POST',
        body: new URLSearchParams({ data: btoa(webrtc.localDescription.sdp) }),
      })
        .then((response) => response.text())
        .then((data) => {
          try {
            webrtc.setRemoteDescription(new RTCSessionDescription({ type: 'answer', sdp: atob(data) }));
          } catch (e) {
            console.warn(e);
          }
        });
    };

    const webrtcSendChannel = webrtc.createDataChannel('rtsptowebSendChannel');
    webrtcSendChannel.onopen = (event) => {
      console.log(`${webrtcSendChannel.label} has opened`);
      webrtcSendChannel.send('ping');
    };
    webrtcSendChannel.onclose = (_event) => {
      console.log(`${webrtcSendChannel.label} has closed`);
      startPlay(videoEl, url);
    };
    webrtcSendChannel.onmessage = (event) => console.log(event.data);
  }

  const videoEl = document.querySelector('#webrtc-video');
  const webrtcUrl = document.querySelector('#webrtc-url').value;

  startPlay(videoEl, webrtcUrl);
}, 1000);
```

<img src="widgetskript.png" height="200">

## 所有流均为 iFrame
或者，您也可以将摄像头概览作为 iframe 插入：添加小部件 `iFrame` 并将 rtsp2web 服务器作为源输入：

`http://192.168.0.2:8083/pages/multiview/full?controls`

</details>

## FFMpeg 支持
如果摄像机不支持快照功能，ffmpeg 将从 rtsp 流中创建快照。

## 在 vis 中包含快照服务器
该适配器提供了一个无需密码的快照服务器。在实例设置中激活该服务器，然后您可以通过 http://iobrokerIp:8095/CAMERAIP_PORT 获取当前快照，例如 http://192.168.0.1:8095/192_168_0_1_80。

在可视化界面中插入图像组件，并将 URL 指定为源，然后选择更新时间。

## 在可视化中包含快照
如果可能，请使用 snapshotUri，例如：

onvif.0.IP_PORT.infos.streamUris.MediaProfile_Channel1_MainStream.snapshotUrl.uri

### _请勿将状态用作流，否则磁盘负载会过高。_
#### 通过 onvif.0.IP_PORT.remote.snapshot 更新状态
将 `String img src` 元素分配给 onvif.0.IP_PORT.snapshot 状态。

或者，如果 `String img src` 不起作用，则可采用以下替代方案。

将状态 onvif.0.IP_PORT.snapshot 作为 `HTML` 元素插入到 vis 中，内容如下

```javascript
<img src="{onvif.0.IP_PORT.snapshot}" width="500px" />
```

事件发生时创建新快照：

```javascript
on('onvif.0.192_168_178_100_80.events.RuleEngine/CellMotionDetector/Motion', (obj) => {
  if (obj.state.val === true) {
    setState('onvif.0.192_168_178_100_80.remote.snapshot', true, false);
  }
});
```

## 讨论（德语）
<https://forum.iobroker.net/topic/63145/test-adapter-onvif-camera-v1-0-0>

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.6 (2026-08-08)

- (TA2k) Faster reconnect after a camera reboot (detection in ~30-50s instead of ~4min)
- (TA2k) Connection state now reflects the real reconnect instead of flipping back to true too early
- (TA2k) Throttled the repeated event error log messages during a reboot

### 1.1.5 (2026-08-06)

- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now

### 1.1.4 (2024-05-27)

- update onvif lib to support newer TAPO cameras
- (mcm1957) Adapter requires nodejs >=18 now.

### 1.1.3 (2024-03-15)

- Allow non number PTZ presets

### 1.1.2 (2023-12-29)

- (TA2k) Catch callback error

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023-2024 TA2k <tombox2020@gmail.com>

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

```

```