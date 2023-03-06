---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.onvif/README.md
title: ioBroker.onvif
hash: lNKe1hc/MAwdDYoaBwZP03WgECjTw4IOZ1O5qv7OzIg=
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

## 在 vis 中包含快照
尽可能使用快照 url

onvif.0.IP_PORT.infos.streamUris.MediaProfile_Channel1_MainStream.snapshotUrl.uri

不要将此数据点用作流，因为 HDD 上的负载太高。

将 `String img src` 元素分配给数据点 onvif.0.IP_PORT.snapshot

将数据点 onvif.0.IP_PORT.snapshot 作为 `HTML` 元素添加到 vis 中，内容如下

```javascript
<img src="{onvif.0.IP_PORT.snapshot}" width="500px" />
```

## 讨论/讨论和讨论
<https://forum.iobroker.net/topic/63145/test-adapter-onvif-camera-v1-0-0>

## Changelog

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