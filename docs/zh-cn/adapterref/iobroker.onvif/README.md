---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.onvif/README.md
title: ioBroker.onvif
hash: V9UpEozWodsw93FDw5msQDnX6MKPUdm5xP4jIMbUMuM=
---
![标识](../../../en/adapterref/iobroker.onvif/admin/onvif.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.onvif.svg)
![下载](https://img.shields.io/npm/dm/iobroker.onvif.svg)
![安装数量](https://iobroker.live/badges/onvif-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/onvif-stable.svg)
![NPM](https://nodei.co/npm/iobroker.onvif.png?downloads=true)

#ioBroker.onvif
**测试：** ![测试和发布](https://github.com/iobroker-community-adapters/ioBroker.onvif/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 ONVIF 适配器
**ONVIF 相机适配器**

**此适配器使用哨兵库自动向开发人员报告异常和代码错误。**有关更多详细信息和如何禁用错误报告的信息，请参阅[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

## 相机 hinzufügen
### 发现：
Bei jedem Adapterstart wild mit dem in der Einstellungen eingetragen Benutzername und Passwort eine Discovery durchgeführt und versuch sich in die Kamera einzuloggen。 Falls die Kamera noch nicht unter Objekte hinzugefügt wurde。

在 den Einstellungen kann man die Discovery manuell ausführen。 Falls die Kameras unterschiedliche Zugangsdaten haben müssen die jeweils einggeben werden und eine discovery durchgeführt werden。 Im Log sieht man Details zu dem Prozess。

Damit eine Kamera neu erkannt wild muss sie einfach unter Objekte gelöscht werden。

### 曼努埃尔苏切
Es können Kameras manuell gesucht werden, falls Discovery nicht funktioniert。 Dazu muss eine IP Range und Ports eingegeben 和 manuell ausgeführt werden。 Im Log sieht man Details zu dem Prozess。

## 数据朋克
onvif.0.IP_PORT.events 相机事件 wie z.b. Bewegungserkennung。 Manchmal muss ein Event ausgelöst werden damit er angezeigt wired。

onvif.0.IP_PORT.general 一般信息在相机上

onvif.0.IP_PORT.infos Informationen über die Kamera werden nur bei Adapterstart aktualisiert oder bei remote.refresh

视频和快照网址：

onvif.0.IP_PORT.infos.streamUris.MediaProfile_Channel1_MainStream.snapshotUrl.uri

onvif.0.IP_PORT.remote 相机控制

onvif.0.IP_PORT.remote.refresh 信息更新

onvif.0.IP_PORT.remote.gotoHomePosition PTZ Kamera in die HomePosition setzen

onvif.0.IP_PORT.remote.gotoPreset PTZ 摄像机预设编号 auswählen

onvif.0.IP_PORT.remote.snapshot 声明在 onvif.0.IP_PORT.snapshot 下的快照

＃＃ 信息
适配器 nimmt 消息“快照”entgegen und gibt ein Bild zurück

```javascript
sendTo("onvif.0", "snapshot", "192_168_178_100_80", (result) => {
  if (result) {
    sendTo("telegram.0", {
      text: result,
      type: "photo",
      caption: "Kamera 2",
    });
  }
});
```

## Bewegungsmeldung 电报
```javascript
on("onvif.0.192_168_178_100_80.events.RuleEngine/CellMotionDetector/Motion", (obj) => {
  if (obj.state.val === true) {
    sendTo("onvif.0", "snapshot", "192_168_178_100_80", (result) => {
      if (result) {
        sendTo("telegram.0", {
          text: result,
          type: "photo",
          caption: "Camera 2",
        });
      }
    });
  }
});
```

# 在 vis einbinden 中流式传输
Apple Homekit 中的 Wenn Stream 已在 yahka eine camera erzeugen 中直接显示。 Wenn das nicht funktioniert oder hksv benötigt wird, dann scrypted in einem docker installieren und die Kamera mit onvif und homekit plugin hinzufügen

## Rtsp2Web 泊坞窗
Ein Stream 通过 rtsp stream bereitgestellt 进行正常化处理。 Eine Umwandlung 通过 motion eye ist sehr resourcen aufwändig und hat ein Verzögerng。 webrtc ist schneller und resourcenschonender 中的 Ein Umwandlung。 Meine Empfehlung ist ein [RTSP到Web](https://github.com/deepch/RTSPtoWeb)。 Dazu muss ein Docker von ghcr.io/deepch/rtsptoweb:latest erstellt werden。

```
docker run --name rtsp-to-web -v /YOURPATHFORCONFIG:/config --network host ghcr.io/deepch/rtsptoweb:latest
```

Es muss ein Volume für den Pfad /config 和 das network als host eingestellt werden。

Dann ist rtsptoweb erreichbar über

```
http://IP:8083
```

Dann kann man ein Stream hinzufügen。 Die Stream url findet man z.B.在 `onvif.0.IP_PORT.infos.streamUris.ProfileName.live_stream_tcp.uri` 之下

<img src="addstream.png" height="600">

### Danach beötigen wir die Stream Id。 Dafür Stream Edit und in der URL die Id rauskopieren
`http://192.168.178.2:8083/pages/stream/edit/ddbdb583-9f80-4b61-bafa-613aa7a5daa5`

## Einzelnen Stream in der Vis einfügen
Dann in der vis ein HTML Objekt auswählen。 Dann im Widget unter HTML den rtsp2web server mit stream id eintragen：

<img src="html.png" height="150">

## **Wenn mehrere Stream hinzugefügt werden soll muss `webrtc-url` und `webrtc-video` 在 html 和 skript mit einer neuen id ersetzt werden z.B. `webrtc-url2` 和 `webrtc-video2`**
```html
<input
  type="hidden"
  name="webrtc-url"
  id="webrtc-url"
  value="http://192.168.0.2:8083/stream/ddbdb583-9f80-4b61-bafa-613aa7a5daa5/channel/0/webrtc"
/>

<video id="webrtc-video" autoplay muted playsinline controls style="max-width: 100%; max-height: 100%;"></video>
```

在 dem Widget unter Skripte dieses Skript hinzufügen：

```javascript
setTimeout(function () {
  function startPlay(videoEl, url) {
    const webrtc = new RTCPeerConnection({
      iceServers: [
        {
          urls: ["stun:stun.l.google.com:19302"],
        },
      ],
      sdpSemantics: "unified-plan",
    });
    webrtc.ontrack = function (event) {
      console.log(event.streams.length + " track is delivered");
      videoEl.srcObject = event.streams[0];
      videoEl.play();
    };
    webrtc.addTransceiver("video", { direction: "sendrecv" });
    webrtc.onnegotiationneeded = async function handleNegotiationNeeded() {
      const offer = await webrtc.createOffer();

      await webrtc.setLocalDescription(offer);

      fetch(url, {
        method: "POST",
        body: new URLSearchParams({ data: btoa(webrtc.localDescription.sdp) }),
      })
        .then((response) => response.text())
        .then((data) => {
          try {
            webrtc.setRemoteDescription(new RTCSessionDescription({ type: "answer", sdp: atob(data) }));
          } catch (e) {
            console.warn(e);
          }
        });
    };

    const webrtcSendChannel = webrtc.createDataChannel("rtsptowebSendChannel");
    webrtcSendChannel.onopen = (event) => {
      console.log(`${webrtcSendChannel.label} has opened`);
      webrtcSendChannel.send("ping");
    };
    webrtcSendChannel.onclose = (_event) => {
      console.log(`${webrtcSendChannel.label} has closed`);
      startPlay(videoEl, url);
    };
    webrtcSendChannel.onmessage = (event) => console.log(event.data);
  }

  const videoEl = document.querySelector("#webrtc-video");
  const webrtcUrl = document.querySelector("#webrtc-url").value;

  startPlay(videoEl, webrtcUrl);
}, 1000);
```

<img src="widgetskript.png" height="200">

## Alle Streams 作为 iFrame
Alternativ könnte man auch den Kamera Overview als Iframe einfügen: Das Widget `iFrame` hinzufügen und als Quelle den rtsp2web Server eintragen:

`http://192.168.0.2:8083/pages/multiview/full?controls`

## FFMpeg Unterstützung
Wenn die Kamera keine Snapshot Unterstützng hat wild mit ffmpeg ein snapshot aus dem rtsp stream erzeugt。

## 快照服务器在 vis einbinden 中
Der Adapter bietet ein Snapshot Server ohne Passwort 和。 Dazu Server 在 den Instanzeinstellungen 和 dann kann der aktuelle Snapshot 中激活 http://iobrokerIp:8095/CAMERAIP_PORT z.B. http://192.168.0.1:8095/192_168_0_1_80 网址。

In der Vis ein Image Widget einfügen 和 die Url als Quelle angeben und eine Updatezeit auswählen

## Vis einbinden 中的快照
Wenn möglich die snapshotUri verwenden z.B.
onvif.0.IP_PORT.infos.streamUris.MediaProfile_Channel1_MainStream.snapshotUrl.uri

### _Den Datenpunkt nicht als Stream verwenden，da sonst die Festplatte zu hohe Last hat._
#### Den Datenpunkt aktualisieren 通过 onvif.0.IP_PORT.remote.snapshot
Den Datenpunkt onvif.0.IP_PORT.snapshot ein `String img src` element zuordnen

Oder als Alternative falls `String img src` nicht funktioniert

Den Datenpunkt onvif.0.IP_PORT.snapshot als `HTML` 元素在 die vis einfügen mit folgendem Inhalt 中

```javascript
<img src="{onvif.0.IP_PORT.snapshot}" width="500px" />
```

Neuen Snapshot erzeugen bei 事件：

```javascript
on("onvif.0.192_168_178_100_80.events.RuleEngine/CellMotionDetector/Motion", (obj) => {
  if (obj.state.val === true) {
    setState("onvif.0.192_168_178_100_80.remote.snapshot", true, false);
  }
});
```

＃ 英语
## 添加摄像头
### 发现：
每次启动适配器时，都会使用在设置中输入的用户名和密码执行发现，并尝试登录摄像机。如果相机尚未添加到对象下。

您可以在设置中手动执行发现。如果摄像机有不同的凭据，您必须输入它们并执行发现。在日志中，您可以看到该过程的详细信息。

为了再次检测到摄像机，只需在对象下将其删除即可。

### 手动搜索
如果 Discovery 不起作用，可以手动搜索摄像机。为此，必须手动输入和执行 IP 范围和端口。在日志中，您可以看到有关该过程的详细信息。

＃＃ 数据点
onvif.0.IP_PORT.events 相机事件，例如运动检测。有时您必须触发事件才能看到它。

onvif.0.IP_PORT.general 有关相机的一般信息

onvif.0.IP_PORT.infos 有关相机的信息仅在适配器启动或 remote.refresh 时更新

视频和快照网址：

onvif.0.IP_PORT.infos.streamUris.MediaProfile_Channel1_MainStream.snapshotUrl.uri

onvif.0.IP_PORT.remote 摄像头控制

onvif.0.IP_PORT.remote.refresh 更新信息数据

onvif.0.IP_PORT.remote.gotoHomePosition 将 PTZ 摄像机设置为起始位置

onvif.0.IP_PORT.remote.gotoPreset 选择云台摄像机预置位号

onvif.0.IP_PORT.remote.snapshot 保存快照到onvif.0.IP_PORT.snapshot

＃＃ 信息
适配器接收消息“快照”并返回图像

```javascript
sendTo("onvif.0", "snapshot", "192_168_178_100_80", (result) => {
  if (result) {
    sendTo("telegram.0", {
      text: result,

      type: "photo",

      caption: "camera2",
    });
  }
});
```

## 到 Telegram 的运动消息
```javascript
on("onvif.0.192_168_178_100_80.events.RuleEngine/CellMotionDetector/Motion", (obj) => {
  if (obj.state.val === true) {
    sendTo("onvif.0", "snapshot", "192_168_178_100_80", (result) => {
      if (result) {
        sendTo("telegram.0", {
          text: result,

          type: "photo",

          caption: "Camera 2",
        });
      }
    });
  }
});
```

# 在 vis 中包含流
如果 stream 应该在 Apple Homekit 中显示，那么请直接在 yahka 中创建一个摄像头。如果这不起作用或需要 hksv，则在 docker 中安装 scrypted 并使用 onvif 和 homekit 插件添加相机

## Rtsp2Web 泊坞窗
流通常通过 rtsp 流提供。这需要转换为vis。我的建议是 [RTSP到Web](https://github.com/deepch/RTSPtoWeb)。这需要从 ghcr.io/deepch/rtsptoweb:latest 创建一个 docker。

```

docker run --name rtsp-to-web -v /YOURPATHFORCONFIG:/config --network host ghcr.io/deepch/rtsptoweb:latest

```

您必须为路径 /config 和网络设置一个卷作为主机。

然后可以通过以下方式访问 rtsptoweb

```

http://IP:8083

```

然后你可以添加一个流。可以找到流 url，例如在下面

`onvif.0.IP_PORT.infos.streamUris.ProfileName.live_stream_tcp.uri`

<img src="addstream.png" height="600">

### 之后我们需要流 ID。为此，我们需要 Stream Edit 并在 URL 中复制 Id
`http://192.168.178.2:8083/pages/stream/edit/ddbdb583-9f80-4b61-bafa-613aa7a5daa5`

## 在vis中粘贴单个流
然后在vis中选择一个HTML对象。然后在 HTML 下的小部件中输入带有流 ID 的 rtsp2web 服务器：

<img src="html.png" height="150">

## **如果应添加多个流 `webrtc-url` 和 `webrtc-video` 必须在 html 和脚本中替换为新的 id，例如`webrtc-url2` 和 `webrtc-video2`.**
```html
<input type="hidden name="webrtc-url" id="webrtc-url"
value="http://192.168.0.2:8083/stream/ddbdb583-9f80-4b61-bafa-613aa7a5daa5/channel/0/webrtc" />

<video id="webrtc-video" autoplay muted playsinline controls style="max-width: 100%; max-height: 100%;"></video>
```

在脚本下的小部件中添加此脚本：

```javascript
setTimeout(function () {

  function startPlay(videoEl, url) {

    const webrtc = new RTCPeerConnection({

      iceServers: [

        {

          urls: ["stun:stun.l.google.com:19302"]

        },

      ],

      { "sdpSemantics": [ "unified-plan" ], [ "unified-plan"], [ "unified-plan"],

    });

    webrtc.ontrack = function (event) {

      console.log(event.streams.length + " track is delivered");

      videoEl.srcObject = event.streams[0];

      videoEl.play();

    };

    webrtc.addTransceiver("video", { direction: "sendrecv" });

    webrtc.onnegotiationneeded = async function handleNegotiationNeeded() {

      const offer = await webrtc.createOffer();



      await webrtc.setLocalDescription(offer);



      fetch(url, {

        method: "POST",

        body: new URLSearchParams({ data: btoa(webrtc.localDescription.sdp) }),

      })

        .then((response) => response.text())

        .then((data) => {

          try {

            webrtc.setRemoteDescription(new RTCSessionDescription({ type: "answer", sdp: atob(data) }));

          } catch (e) {

            console.warn(e);

          }

        });

    };



    const webrtcSendChannel = webrtc.createDataChannel("rtsptowebSendChannel");

    webrtcSendChannel.onopen = (event) => {

      console.log(`${webrtcSendChannel.label} has opened`);

      webrtcSendChannel.send("ping");

    };

    webrtcSendChannel.onclose = (_event) => {

      console.log(`${webrtcSendChannel.label} has closed`);

      startPlay(videoEl, url);

    };

    webrtcSendChannel.onmessage = (event) => console.log(event.data);

  }



  const videoEl = document.querySelector("#webrtc-video");

  const webrtcUrl = document.querySelector("#webrtc-url").value;



  startPlay(videoEl, webrtcUrl);

}, 1000);
```

<img src="widgetskript.png" height="200">

## 所有流作为 iFrame
或者，您也可以将相机概览添加为 iframe：

添加小部件 `iFrame` 并输入 rtsp2web 服务器作为源：

`http://192.168.0.2:8083/pages/multiview/full?controls`

## FFMpeg 支持
如果相机不支持快照，ffmpeg 将从 rtsp 流创建快照。

## 在 vis 中包含快照服务器
该适配器提供了一个没有密码的快照服务器。在实例设置中激活服务器，然后您可以获取当前快照 http://iobrokerIp:8095/CAMERAIP_PORT 例如http://192.168.0.1:8095/192_168_0_1_80。

在 vis 中插入一个图像小部件并将 url 指定为源并选择更新时间

## 在 vis 中包含快照
如果可能，请使用 snapshotUri，例如

onvif.0.IP_PORT.infos.streamUris.MediaProfile_Channel1_MainStream.snapshotUrl.uri

### _不要将数据点用作流，否则磁盘负载会过高。_
#### 通过 onvif.0.IP_PORT.remote.snapshot 更新数据点
将 `String img src` 元素分配给数据点 onvif.0.IP_PORT.snapshot。

或者，如果 `String img src` 不起作用，则作为替代方案

将数据点 onvif.0.IP_PORT.snapshot 作为 `HTML` 元素插入到 vis 中，内容如下

```javascript
<img src="{onvif.0.IP_PORT.snapshot}" width="500px" />
```

在事件上创建新快照：

```javascript
on("onvif.0.192_168_178_100_80.events.RuleEngine/CellMotionDetector/Motion", (obj) => {
  if (obj.state.val === true) {
    setState("onvif.0.192_168_178_100_80.remote.snapshot", true, false);
  }
});
```

## 讨论/讨论和讨论
<https://forum.iobroker.net/topic/63145/test-adapter-onvif-camera-v1-0-0>

## Changelog

### 1.0.5

- Improve event handling

### 1.0.4

- (TA2k) Minor bugfixes and readme update for livestream in vis

### 1.0.3

- (TA2k) Minor bugfixes

### 1.0.2

- (TA2k) Fixed a reonnect and empty event bug

### 1.0.1

- (TA2k) initial new release

## License

MIT License

Copyright (c) 2023 TA2k <tombox2020@gmail.com>

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