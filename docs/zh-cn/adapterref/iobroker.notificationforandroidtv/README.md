---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.notificationforandroidtv/README.md
title: ioBroker.notificationforandroidtv - Android TV/Fire TV 的通知集成
hash: YI6BFufhPQmA6Z0Uq+gCBtF2K4JJ1ZLP1TLPqIHvfZA=
---
![标识](../../../en/adapterref/iobroker.notificationforandroidtv/admin/notificationforandroidtv.png)

![新平台](https://nodei.co/npm/iobroker.notificationforandroidtv.png?downloads=true)

# IoBroker.notificationforandroidtv - Android TV/Fire TV 的合规集成
ioBroker 的通知集成包括对 [Android TV](https://play.google.com/store/apps/details?id=de.cyberdream.androidtv.notifications.google) 和 [Fire TV 的通知](https://www.amazon.com/Christian-Fees-Notifications-for-Fire/dp/B00OESCXEK) 通知的支持。通过此集成，您可以将通知发送到 Android TV 设备。它启用覆盖层，在可自定义的持续时间内显示消息内容，然后消失。此外，它还支持发送图像（例如来自安全摄像头的图像）和自定义图标。图标的功能类似于图像，显示较小且位于通知的左侧，而图像显示较大且位于通知上方。

这些通知在您的 Android TV 设备的全局范围内运行，无论活动应用程序是什么都会出现。

在设置过程中，请注意有两个不同的应用程序：一个用于您的智能手机（此平台不需要），另一个用于您的 Android TV 设备接收通知。显示从 ioBroker 发送的通知所需的应用程序可在您的 Android TV 设备的商店中找到。任何应用内购买都是 Android 智能手机客户端独有的，不会限制从 ioBroker 推送通知。

从 3.0.0 版本开始，我们的通知集成还支持 [皮皮狗](https://github.com/rogro82/PiPup)。PiPup 可用于传输视频流（例如，来自摄像头的视频流）或将网站叠加到您的 Android TV 屏幕上。它提供了一种多功能解决方案，可将各种内容无缝集成到您的 Android TV 体验中。

＃＃ 描述
ioBroker 的通知集成支持向 Android TV 和 Fire TV 设备发送通知。此集成允许在指定的时间内在电视屏幕上显示可自定义的消息叠加层。此外，它还可以显示图像（例如来自安全摄像头的图像）和自定义图标。此外，它还引入了一项新功能，可将视频和 Web 内容无缝传输到您的 Android TV 或 Fire TV 设备。这意味着您可以使用 PiPup 广播视频流（例如来自摄像头的视频流），或将网站直接叠加到您的电视屏幕上。

## 设置步骤：
### 1.适配器设置：
- 转到 ioBroker 界面中的适配器设置。
- 添加目标设备的 IP 地址并为其命名以便识别。

### 2. 在您的 Android TV / Fire TV 上下载该应用程序：
- 从 [Google Play](https://play.google.com/store/apps/details?id=de.cyberdream.androidtv.notifications.google) 下载适用于 Android TV 设备的“Android TV 通知”应用程序。
- 从[亚马逊](https://www.amazon.com/Christian-Fees-Notifications-for-Fire/dp/B00OESCXEK)下载适用于 Fire TV 设备的“Fire TV 通知”应用程序。
- **仅限 PiPup** 查看安装指南 5

### 3. 使用以下设置创建 Android TV 通知和 Fire TV 通知的对象
| 设置 | 说明 | 示例值 |
| -------------- | ------------------------------------------- | ------------------------- |
| 持续时间 | 显示持续时间（秒） | 10 秒 |
| ip | 电视设备的 IP 地址 | 192.168.0.100 |
| 消息 | 待发送的消息 | “测试消息”|
| 位置 | 电视屏幕上的位置 | 0 = "BOTTOM_RIGHT" |
| 标题 | 消息标题 | “重要通知”|
| 透明度 | 覆盖层的透明度 | 25 |
| 类型 | 覆盖的显示类型 | 标准，ONLY_TITLE，ONLY_ICON |
| 颜色 | 颜色 | 蓝色，绿色，... |
| 宽度 | 覆盖尺寸 | 小，xxl，... |
| 图标 | 图标选择 | ！？ :-) |
| iconurl | 图标网址 | http://192.168.20.111/myIcon.png |
| delete_icon | 发送后清除图标 URL | true / false |
| imageurl | 图片网址 | http://192.168.20.111/myImage.png |
| delete_image | 发送后清除图片网址 | true / false |
| 有效载荷 | json 对象 | {“msg”：“我的消息”，“bkgcolor”：“7”，“title”：“我的标题”}，...持续时间，位置，宽度，透明度，类型，图标，iconurl，imageurl |

### 3.1 为 PiPup 创建具有以下设置的对象
每个设备的 #### 子文件夹 PiPup
| 设置 | 说明 | 示例值 |
| -------------- | ------------------------------------------- | ------------------------- |
| 持续时间 | 显示持续时间（秒） | 10 秒 |
| 消息 | 待发送的消息 | “测试消息”|
| 位置 | 电视屏幕上的位置 | 0 = "TopRight" |
| 标题 | 消息标题 | “重要通知”|
| 消息颜色 | 颜色代码消息 | #E11AE7 |
| 标题颜色 | 颜色代码标题 | #1AE730 |
| 消息颜色 | 颜色代码背景 | #711AE7 |
| titleSize | 标题大小 | 20 |
| messageSize | 消息大小 | 18 |
| 透明度 | 覆盖层的透明度 | 25 |
| 宽度 | 图像/网络/视频宽度 | 640 像素 |
| 高度 | 网高 | 480 像素 |
| 网址 | 流网址 | http://192.168.20.111/myImage.png |
| 类型 | 流类型 | 图像/网络/视频 |
| payload | json 对象 |{"duration": 30,"position": 0,"title": "您的精彩标题","titleColor": "#0066cc","titleSize": 20,"message": "您想说什么...就在这里说...","messageColor": "#000000","messageSize": 14,"backgroundColor": "#ffffff","media": { "image": {"uri": "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/cfcc3137009463.5731d08bd66a1.png", "width": 480}}} |

### 4. 发送消息：
- 一旦在“消息”对象或“有效负载”下输入消息，该消息就会发送到电视设备。有效负载仅使用来自对象的 IP 地址；其余必须通过有效负载对象传递。
- 这同样适用于 PiPup；在这里输入消息时也会传输 URL。

### 5. PiPup 安装指南
## 对于 Android 电视用户
请按照[PiPup GitHub](https://github.com/rogro82/PiPup) 中针对 Android TV 的说明进行操作。

## 适用于 Fire TV 或其他没有 Google Play Store 的 Android TV
1. 在您的智能手机上安装一个类似 [atvTools](https://apps.apple.com/us/app/atvtools/id1661419573) 的应用程序。
2. 在智能手机上下载 [PiPup apk 文件](https://github.com/desertblade/PiPup/releases)。
3. 将 apk 文件传输到您的 Android 电视。

### 使用 adb 命令
4. 在智能手机上打开命令控制台。

5.执行以下命令，允许SYSTEM_ALERT_WINDOW权限：

```bash
adb shell appops set nl.rogro82.pipup SYSTEM_ALERT_WINDOW allow
`

确保您的 Android 电视与您的智能手机连接到同一网络，并且您的 Android 电视已启用[开发者选项](https://www.firesticktricks.com/developer-options-firestick.html)。

现在，您应该能够在没有 Google Play Store 的情况下在 Fire TV 或其他 Android TV 上使用 PiPup。

## Changelog
### 3.0.4 (2024-04-24)
* (DNAngel/mcm1957) Release merges

### 3.0.3 (2024-02-16)
* (DNAngel) audit fixes

### 3.0.1 (2024-01-27)
* (DNAngel) typo fix

### 3.0.0 (2024-01-27)
* (DNAngel) added support for [PiPup](https://github.com/rogro82/PiPup) video and web stream

### 2.4.0 (2024-01-25)
* (DNAngel) change requests for official release by @mcm1957 & @Apollon77

### 2.3.1 (2024-01-12)
* (DNAngel) payload bugfix

### 2.3.0 (2024-01-08)
* (DNAngel) extended payload possibility as message object

### 2.2.2 (2024-01-01)
* (DNAngel) Stable release

### 2.2.0 (2023-12-22)
* (DNAngel) translations for official release

### 2.1.2 (2023-12-21)
* (DNAngel) small small translation issues

### 2.1.1 (2023-12-21)
* (DNAngel) device name added

### 2.1.0 (2023-12-21)
* (DNAngel) color added
* (DNAngel) icon & icon_url added
* (DNAngel) image & image_url added

### 2.0.3 (2023-12-18)
* (ldittmar81) Typo fix

### 2.0.2 (2023-12-18)
* (DNAngel) Ui Button fixed

### 2.0.1 (2023-12-18)
* (DNAngel) Design changes & description

### 2.0.0 (2023-12-18)
* (DNAngel) initial release

## License
MIT License

Copyright (c) 2024 DNAngel

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