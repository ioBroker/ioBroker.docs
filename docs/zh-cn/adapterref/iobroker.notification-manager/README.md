---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.notification-manager/README.md
title: ioBroker.通知管理器
hash: nuVZ03xa2X4kRvBRhNsVG7snbnNz28FjCAwXj+iqvgM=
---
![标识](../../../en/adapterref/iobroker.notification-manager/admin/notification-manager.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.notification-manager.svg)
![下载](https://img.shields.io/npm/dm/iobroker.notification-manager.svg)
![安装数量](https://iobroker.live/badges/notification-manager-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/notification-manager-stable.svg)
![国家公共管理](https://nodei.co/npm/iobroker.notification-manager.png?downloads=true)

# IoBroker.notification-manager
**测试：** ![测试与发布](https://github.com/foxriver76/ioBroker.notification-manager/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的通知管理器适配器
管理 ioBroker 通知，例如通过将它们作为消息发送

### 一般说明
该适配器允许将 ioBroker 内部`Notifications` 重定向到支持`Notification System` 的信使适配器。如果您缺少适配器，请在相应的适配器上开票。

### 注册以用户为中心的通知
作为用户，您最了解的是何时需要收到有关系统中特定情况的通知。
因此，`notification-manager` 为您提供了一个接口，用于在 ioBroker 通知系统内注册您自己的通知。支持三个类别，每个严重级别对应一个类别：`notify`、`info` 和`alert`。

可以通过 `sendTo` 注册通知

```ts
(async () => {
    try {
        await sendToAsync('notification-manager.0', 'registerUserNotification', { category: 'notify', message: 'Your delivery has arrived' });
    } catch (e) {
        log(`Could not register notification: ${e}`, 'error');
    }
})();
```

### 消息传递适配器的要求
请将 `io-package.json` 中的 `common.supportedMessages.notifications` 标志设置为 `true`。

每当应通过消息传递适配器传递新通知时，`notification-manager` 都会向配置的实例发送一条消息。

这些消息由命令`sendNotification`和具有以下结构的消息组成：

```json
{
  "host": "system.host.moritz-ThinkPad-P16-Gen-1",
  "scope": {
    "name": "System-Benachrichtigungen",
    "description": "Diese Benachrichtigungen werden vom ioBroker-System erfasst und weisen auf Probleme hin, die überprüft und behoben werden sollten."
  },
  "category": {
    "instances": {
      "system.adapter.backitup.0": {
        "messages": [
          {
            "message": "Restart loop detected",
            "ts": 1684074961226
          }
        ]
      },
      "system.adapter.notification-manager.0": {
        "messages": [
          {
            "message": "Restart loop detected",
            "ts": 1684075183094
          }
        ]
      }
    },
    "description": "Eine Adapterinstanz stürzt beim Start häufig ab und wurde aus diesem Grund gestoppt. Die Protokolldatei muss vor dem Neustart der Instanz überprüft werden.",
    "name": "Probleme mit häufig abstürzenden Adapterinstanzen",
    "severity": "alert"
  }
}
```

其中 `category.instances` 显示此通知受影响的适配器实例。
此外，该类别还有国际化描述和国际化名称。
该类别的范围也存在相同的属性。此外，还包括受影响的主机。

发送通知后，如果消息传递适配器能够传送通知，则`notification-manager` 期望得到属性为 `{ sent: true }` 的答复，否则应使用`{ sent: false }` 进行响应。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.0 (2023-12-08)
* (foxriver76) added possibility to send custom messages
* (foxriver76) added UI indicators for each category

### 0.1.2 (2023-10-11)
* (foxriver76) also show notifications provided by adapters in the configuration

### 0.1.1 (2023-07-04)
* (foxriver76) added possibility to send test messages from web interface (closes #1)

### 0.1.0 (2023-06-02)
* (foxriver76) initial release

## License
MIT License

Copyright (c) 2023 foxriver76 <moritz.heusinger@gmail.com>

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

Icon made by "Good Ware" from www.flaticon.com