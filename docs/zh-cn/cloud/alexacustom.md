---
title: Alexa 自定义技能
lastChanged: 01.02.2025
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/cloud/alexacustom.md
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
hash: Su81nXGmYCs4yOuH029J6Lxpnj6QFGKD/M2LpGR2DoI=
---
# Alexa 自定义技能
## IoBroker Alexa 自定义技能是什么？
ioBroker Alexa Custom Skill 可通过单独的命令为您的智能家居实现**扩展语音控制**。
与使用标准智能家居命令的 ioBroker.iot 技能相比，自定义技能允许**复杂的交互**，例如状态查询、单独的例程或启动自动化。

使用调用名称`i o Broker`您可以指示 Alexa 执行某些任务或从您的 ioBroker 系统检索信息。

### 功能和可能性
`ioBroker Custom` Alexa Skill 支持对智能家居进行单独的语音命令、对温度或窗户状态等传感器值的状态查询、对复杂场景和例程的控制以及通过 ioBroker 脚本与外部服务的集成。它可以与`ioBroker.iot`技能并行使用。

### 设置 ioBroker 自定义 Alexa 技能
安装 ioBroker.iot 适配器：自定义技能仅适用于 ioBroker.iot 适配器。如果尚未安装，可以通过 ioBroker 管理区域下的适配器 → ioBroker.iot 适配器进行安装。

### 启用 Alexa 自定义技能
打开 Amazon Alexa 应用程序或转到 Alexa Skills 页面。

搜索`ioBroker Custom`技能。

激活技能并将您的 Amazon Alexa 帐户链接到 ioBroker。

## 自定义技能 - 使用你自己的语音命令
自定义技能的答案可以通过两种方式处理：

- 使用 text2command
- 使用 JavaScript

### 文本到命令
如果在配置接口中定义了`text2command`实例，则请求将发送给该实例。

必须配置`text2command` 以识别预期短语并生成适当的响应。

### JavaScript
可以直接用脚本处理请求。如果没有选择`text2command`实例，则这是默认选项。

如果已经定义了`text2command`实例，则该实例必须提供响应，并且忽略来自脚本的响应。

适配器提供两种状态下不同详细程度的详细信息：

- `smart.lastCommand` 包含接收到的文本，其中包括有关请求类型（意图）的信息。例如：askDevice Status Lawnmower
- `smart.lastCommandObj` 包含一个 JSON 字符串，可以解析为包含以下信息的对象：
  - `words`: 包含接收到的单词作为数组
  - `intent`：包含请求类型。可能的值有：
    - v1 技能：`askDevice`、`controlDevice`、`actionStart`、`actionEnd`、`askWhen`、`askWhere`、`askWho`
    - v2 技能：`queryIntent`（如果已捕获所有口头文本）、`controlDevice`（用于仅使用部分文本的回退）
  - `deviceId`：包含设备 ID，用于标识发送请求的设备（如果由亚马逊提供，否则为空）
  - `deviceRoom`：包含关联的房间标识符，可在 ioBroker IoT 管理 UI 中配置该标识符，用于收集的设备 ID
  - `sessionId`：包含技能会话的会话 ID，如果连续说出多个命令，则应该相同（如果由亚马逊提供，否则为空）
  - `userId`：包含设备所有者或交互用户的用户 ID（如果由亚马逊提供，否则为空）
  - `userName`：包含可在 IoT 管理界面中为收集的用户 ID 配置关联的用户名

有关单词识别和 Alexa Custom Skill 的不同请求类型的更多详细信息，请访问以下链接：[ioBroker 论坛](https://forum.iobroker.net/viewtopic.php?f=37&t=17452)

### 通过 smart.lastResponse State 返回响应
响应必须在 200ms 内写入状态 smart.lastResponse。它可以是简单的文本字符串，也可以是 JSON 对象。

- 如果它是一个文本字符串，它将作为响应发送回技能。
- 如果响应是 JSON 对象，则可以使用以下键：
  - `responseText`：包含返回给亚马逊的文本
  - `shouldEndSession`：一个布尔值，控制会话是否在响应后结束或保持打开状态以进行进一步的输入
  - `sessionId`：包含响应所针对的会话 ID。如果未指定，则使用第一个预期会话。

### 通过消息向物联网实例发送响应
ioBroker iot 实例还接受包含密钥响应的名为`alexaCustomResponse` 的消息。该对象可以包含键`responseText`、` shouldEndSession` 和`sessionId`。

物联网实例没有向消息发送响应。

### 处理文本的脚本示例
```js
// Wichtig: ack=true setzen
on({ id: 'iot.0.smart.lastCommand', ack: true, change: 'any' }, obj => {
    // Die Antwort muss innerhalb von 200ms vorbereitet und in iot.X.smart.lastResponse geschrieben werden
    setState('iot.0.smart.lastResponse', 'Received phrase is: ' + obj.state.val); // Wichtig: ack=false (Standard)
});
```

### 处理 JSON 对象的脚本示例
```js
// Wichtig: ack=true setzen
on({ id: 'iot.0.smart.lastCommandObj', ack: true, change: 'any' }, obj => {
    // Die Antwort muss innerhalb von 200ms vorbereitet und in iot.X.smart.lastResponse geschrieben werden
    const request = JSON.parse(obj.state.val);
    const response = {
        responseText: 'Received phrase is: ' + request.words.join(' ') + '. Bye',
        shouldEndSession: true,
        sessionId: request.sessionId,
    };

    // Antwort über State zurückgeben
    setState('iot.0.smart.lastResponse', JSON.stringify(response)); // Wichtig: ack=false (Standard)

    // Oder alternativ als Nachricht zurückgeben
    sendTo('iot.0', 'alexaCustomResponse', response);
});
```

## 语音命令示例
**状态查询：**

- “Alexa，询问 ioBroker 客厅的温度。”
- “Alexa，询问 ioBroker 车库门是否打开。”

**控制命令：**

- “Alexa，告诉 ioBroker 我要回家了。”
- “Alexa，让 ioBroker 启动我的咖啡机。”

**场景和惯例：**

- “Alexa，告诉 ioBroker 我要睡觉了。”

## IoBroker Alexa 自定义技能的优势
ioBroker 自定义技能通过单独的语音命令提供高度的灵活性。
它通过更全面的语音控制补充了物联网技能，实现了传感器值和系统信息的状态查询，并允许自动化和脚本的集成。自定义技能提供了一种可定制且强大的方式，可以通过 Alexa 控制您的智能家居。