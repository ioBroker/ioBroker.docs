---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.nextcloudtalk/README.md
title: ioBroker Nextcloud Talk 适配器
hash: FghpMM1/d+igV6WEaRTugKo8SPF1Vuy9vr7WKzKEnyU=
---
# IoBroker Nextcloud Talk 适配器
此适配器允许向 Nextcloud Talk 房间发送通知。

＃＃ 配置
此适配器现在使用 ioBroker JSON 配置系统。在实例对话框中输入以下设置：

1. **服务器 URL** – 例如 `https://nextcloud.example.com`
2. 基本身份验证的**用户名**
3. 为用户生成**App Token**

## 州
- `roomID` (字符串): 用于发送消息的聊天室令牌。
- `text`（字符串）：当此状态发生变化时，适配器将新值作为消息发布到配置的房间。

＃＃ 用法
通过脚本或其他适配器更新`text`状态以发送消息。
消息通过 Nextcloud Talk API 端点`/ocs/v2.php/apps/spreed/api/v1/chat/{token}`发送。

## Changelog

### **WORK IN PROGRESS**

### 1.0.2
* updated logo
* tests

### 1.0.1
* initial version

### 1.0.0
* initial version

## License

Copyright (c) 2025 Rello

MIT