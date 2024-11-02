---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.notification-manager/README.md
title: ioBroker.通知管理器
hash: 6DCRrUYRYkWX5WRD5rVWvyOwZ0X6vqzzshhOrNp6tTc=
---
![标识](../../../en/adapterref/iobroker.notification-manager/admin/notification-manager.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.notification-manager.svg)
![下载](https://img.shields.io/npm/dm/iobroker.notification-manager.svg)
![安装数量](https://iobroker.live/badges/notification-manager-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/notification-manager-stable.svg)
![新平台](https://nodei.co/npm/iobroker.notification-manager.png?downloads=true)

# IoBroker.通知管理器
**测试：**![测试与发布](https://github.com/foxriver76/ioBroker.notification-manager/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的通知管理器适配器
管理 ioBroker 通知，例如通过将其作为消息发送

### 一般描述
此适配器允许将 ioBroker 内部 `Notifications` 重定向到支持 `Notification System` 的通讯适配器。如果您缺少适配器，请针对相应的适配器开具一张票。

＃＃＃ 配置
对于每个 `category`，您可以配置 `category` 是否应处于活动状态。如果类别未处于活动状态，则 `notification-manager` 将不会处理此特定 `category` 的任何内容。

此外，您可以配置`notification-manager`是否应抑制某些`categories`。如果已注册用于抑制的`category`的`notification`，则适配器将立即清除此`notification`，而不会向您发送任何消息。

最后，您可以配置支持的消息传递适配器。每当为`active`（和`non-suppressed`）`category`生成新的`notification`时，适配器将通过第一个配置的适配器发送`notification`。如果发送消息成功，`notification-manager`将清除`notification`。如果发送不成功，它将使用第二个适配器重试。

每当类别为 `active` 但尚未配置任何特定设置时，适配器将使用已配置的后备设置。新类别默认始终为 `active`，以确保您收到通知。这意味着每当某个适配器实现新的 `category` 时，将应用给定 `severity` 的后备设置。

您可以进一步将类别定义为 `suppress`。然后 `notification-manager` 将简单地确认通知，因此它不会出现在您的系统中。

从 js-controller 版本 7 开始，适配器可以向通知添加额外的 `contextData`。例如，这用于在管理 GUI 中为用户显示特定操作。默认情况下，`notification-manager` 将向您发送这些通知，并且不会删除它们，以便这些通知在以后的用户交互中保留。但是，如果您决定某些 `category` 不需要此类交互，则可以通过复选框禁用它们。

### 注册以用户为中心的通知
作为用户，您最好知道何时需要收到有关系统中特定情况的通知。
因此，`notification-manager` 为您提供了一个接口，用于在 ioBroker 通知系统内注册您自己的通知。支持三个类别，每个严重性级别一个：`notify`、`info` 和 `alert`。

可以通过`sendTo`注册通知

```ts
(async () => {
    try {
        await sendToAsync('notification-manager.0', 'registerUserNotification', { category: 'notify', message: 'Your delivery has arrived' });
    } catch (e) {
        log(`Could not register notification: ${e}`, 'error');
    }
})();
```

### 消息适配器的要求
请在您的`io-package.json`中将`common.supportedMessages.notifications`标志设置为`true`。

每当需要通过消息传递适配器传递新通知时，`notification-manager` 都会向配置的实例发送一条消息。

该消息由命令`sendNotification`和具有以下结构的消息组成：

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
此外，该类别具有 i18n 描述和 i18n 名称。
类别的范围具有相同的属性。此外，还包括受影响的主机。

发送通知后，如果消息传递适配器能够传递通知，则`notification-manager` 期望收到带有属性`{ sent: true }` 的答复，否则它应该以`{ sent: false }` 进行响应。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.3.0 (2024-10-10)
* (@foxriver76) by default we do not delete notifications with `contextData`
* (@foxriver76) added checkbox to also delete notifications with `contextData` for specific categories

### 1.2.1 (2024-08-29)
* (@foxriver76) fixed issue if host name contains `.`

### 1.2.0 (2024-08-05)
* (@klein0r) Added Blockly blocks

### 1.1.2 (2024-05-02)
* (foxriver76) made logging a bit more silent

### 1.1.1 (2024-03-16)
* (foxriver76) added possibility to suppress messages
* (foxriver76) fixed issue that bottom of settings page is shown behind toolbar
* (foxriver76) fixed issue that all notifications are cleared instead of only the handled one

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

Copyright (c) 2024 foxriver76 <moritz.heusinger@gmail.com>

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