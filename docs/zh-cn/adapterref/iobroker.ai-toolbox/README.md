---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ai-toolbox/README.md
title: ioBroker.ai-工具箱
hash: vOxR/4rmRRntCesgYd30u23JYfx6PH6vqQBJ27eopnk=
---
![标识](../../../en/adapterref/iobroker.ai-toolbox/admin/ai-toolbox.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.ai-toolbox.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ai-toolbox.svg)
![安装数量](https://iobroker.live/badges/ai-toolbox-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/ai-toolbox-stable.svg)
![新平台](https://nodei.co/npm/iobroker.ai-toolbox.png?downloads=true)

# IoBroker.ai-工具箱
**测试：**![测试与发布](https://github.com/ToGe3688/ioBroker.ai-toolbox/workflows/Test%20and%20Release/badge.svg)

＃＃ 概述
ioBroker AI 工具箱适配器将可定制的 AI 工具集成到您的智能家居中。它支持多个大型语言模型 (LLM) 提供商，并提供灵活的自动化和交互框架。通过将来自智能家居设备的数据与 AI 功能相结合，ioBroker AI 工具箱适配器可以为您的家庭自动化任务和与 LLM 模型的交互创建高度个性化且实用的工具。

＃＃ 特征
- 支持多种 AI 提供商和模型。
- 为特定任务创建自定义 AI 工具
- 聊天历史管理，保留上下文。
- 令牌使用情况和请求历史统计。
- 用于图像分析的视觉能力。

## 支持的提供商
- **Anthropic**：[anthropic.com](https://anthropic.com)
- **OpenAI**：[openai.com](https://openai.com)
- **Perplexity**：[perplexity.ai](https://perplexity.ai)
- **OpenRouter**: [openrouter.ai](https://openrouter.ai)（适合初学者的免费使用模型）
- **Deepseek**：[deepseek.com](http://deepseek.com/)
- **自定义/自托管模型**（例如 LM Studio、LocalAI）

---

快速入门
1. 安装适配器。
2. 创建账户并从 openrouter.ai 获取 API 令牌
3. 使用 API 令牌配置适配器。
4. 安装时创建的示例工具使用 OpenRouter 的免费模型 meta-llama/llama-3.2-3b-instruct:free。
5. 使用 .text_request 数据点向工具发送消息，并检查 .text_response 以获取响应。

请注意，免费模型有时需要等待很长时间才能获得首次响应，可能会超载或有其他限制。模型的质量和功能也各不相同，请确保为您的用例选择正确的模型。

**即使此自述文件是用英文编写的，大多数模型都是多语言的，只需尝试用您的母语编写您的工具即可获得所需的输出！**

---

＃＃ 配置
＃＃＃ 工具
定义针对特定任务的自定义 AI 工具：

| **设置** | **描述** |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| **名称** | 工具的名称。|
| **模型** | 选择 LLM 模型（在提供商下配置）。|
| **系统提示** | 提供描述该工具的详细信息。|
| **示例请求** | （可选）示例请求。|
| **示例响应** | （如果提供了示例请求则必填）理想的响应。|
| **消息历史** | 包括之前的消息（用于类似聊天机器人的行为）。对于一次性工具，设置为 0，以最大限度地减少令牌使用。|
| **温度** | 控制响应创造力/一致性。|
| **最大令牌** | 限制响应令牌数。|
| **重试延迟** | 请求失败时重试之间的延迟 |
| **最大重试次数** | 每个请求的最大重试次数。|
| **启用视觉/图像请求** | 启用视觉/图像输入。|
| **在聊天历史中包含视觉请求** | 在聊天历史中包含视觉/图像数据 |

---

### 法学硕士提供者
单独配置每个 AI 提供程序：

#### 人择
| **设置** | **描述** |
|-----------------|----------------------------------------------|
| **API 令牌** | 输入您的 Anthropic API 令牌。|
| **模型** | 指定要使用的模型。|

OpenAI
| **设置** | **描述** |
|-----------------|----------------------------------------------|
| **API 令牌** | 输入您的 OpenAI API 令牌。|
| **模型** | 指定要使用的模型。|

困惑
| **设置** | **描述** |
|-----------------|----------------------------------------------|
| **API 令牌** | 输入您的 Perplexity API 令牌。|
| **模型** | 指定要使用的模型。|

OpenRouter 简介
| **设置** | **描述** |
|-----------------|----------------------------------------------|
| **API 令牌** | 输入您的 OpenRouter API 令牌。|
| **模型** | 指定要使用的模型。|

深度搜索
| **设置** | **描述** |
|-----------------|----------------------------------------------|
| **API 令牌** | 输入您的 Deepseek API 令牌。|
| **模型** | 指定要使用的模型。|

＃＃＃＃ 风俗
| **设置** | **描述** |
|------------------------------------|----------------------------------------------------------------------------------|
| **推理服务器 URL** | 自定义/自托管推理服务器的 URL。|
| **推理服务器的 API 令牌** | 您的推理服务器的 API 令牌。|
| **模型** | 指定要使用的模型。|
| **注意** | 确保符合常见的 AI LLM API 标准（例如 LM Studio API）。|

---

使用你的工具
### 对象交互
每个工具都显示在 ioBroker 对象树中。使用 `Tools.$YourToolName.text_request` 发送查询，使用 `Tools.$YourToolName.text_response` 检索答案。

#### 视觉/图像请求
如果您已启用视觉/图像请求，则可以使用 `Tools.$YourToolName.image_url` 设置工具要分析的图像 URL 或本地文件路径。当您设置 `Tools.$YourToolName.text_request` 数据点的状态时，该图像将包含在请求中。

注意：您可以使用本地 URL（例如，在您的本地网络中 http://192.168.178.1/image.jpg）或文件路径（ioBroker 有权读取文件，例如 /opt/iobroker/iobroker-data/telegram_0/photo/image.jpg）。适配器将图像转换为 base64 字符串并将其包含在请求中。

## 脚本集成（`sendTo`）
您可以使用`sendTo`函数以编程方式进行交互：

#### 文本请求
```javascript
sendTo('ai-toolbox.0', 'tool_request', {
    'tool': 'YOUR-TOOL-NAME',
    'text': 'The message for the tool to respond to',
}, async (result) => {
    console.info(result); // Outputs the tool's response as text string
});
```

#### 带有 URL 的视觉/图像请求
```javascript
sendTo('ai-toolbox.0', 'tool_request', {
    'tool': 'YOUR-TOOL-NAME',
    'text': 'The message for the tool to respond to',
    'image_url': 'https://url-of-the-image-to-analyze.com/image.jpg',
}, async (result) => {
    console.info(result); // Outputs the tool's response as text string
});
```

#### 使用本地文件的视觉/图像请求
```javascript
sendTo('ai-toolbox.0', 'tool_request', {
    'tool': 'YOUR-TOOL-NAME',
    'text': 'The message for the tool to respond to',
    'image_url': '/opt/iobroker/iobroker-data/telegram_0/photo/image.jpg',
}, async (result) => {
    console.info(result); // Outputs the tool's response as text string
});
```

### 不使用工具使用模型
### 对象交互
每个定义的模型也出现在 ioBroker 对象树中。使用 `Models.$ModelName.text_request` 发送查询，使用 `Models.$ModelName.text_response` 检索答案。使用脚本集成，您可以创建更具创意的集成，例如，您可以创建动态系统提示。

## 脚本集成（`sendTo`）
您可以使用`sendTo`函数以编程方式进行交互：

#### 文本请求
```javascript
sendTo('ai-toolbox.0', 'model_request', {
    'model': 'MODEL-NAME',
    'system_prompt': 'System prompt for your request'
    'temperature': 'Temperature setting for your request (Optional: Default 0.6)'
    'max_tokens': 'Max number of tokens to generate (Optional: Default 2000)'
    'text': 'The message for the tool to respond to'
}, async (result) => {
    console.info(result.text); // Text response of the model
    console.info(result.model); // Used model for request
    console.info(result.tokens_input); // Used input tokens
    console.info(result.tokens_output); // Used output tokens
    console.info(result.error); // Error, populated if request fails
    console.info(result.request_data); // JSON object with request data
    console.info(result.response_data); // JSON object with raw response of the API call
});
```

#### 带有 URL 的视觉/图像请求
```javascript
sendTo('ai-toolbox.0', 'model_request', {
    'model': 'MODEL-NAME',
    'system_prompt': 'System prompt for your request'
    'temperature': 'Temperature setting for your request (Optional: Default 0.6)'
    'max_tokens': 'Max number of tokens to generate (Optional: Default 2000)'
    'text': 'The message for the tool to respond to',
    'image_url': 'https://url-of-the-image-to-analyze.com/image.jpg',
}, async (result) => {
    console.info(result.text); // Text response of the model
    console.info(result.model); // Used model for request
    console.info(result.tokens_input); // Used input tokens
    console.info(result.tokens_output); // Used output tokens
    console.info(result.error); // Error, populated if request fails
    console.info(result.request_data); // JSON object with request data
    console.info(result.response_data); // JSON object with raw response of the API call
});
```

#### 使用本地文件的视觉/图像请求
```javascript
sendTo('ai-toolbox.0', 'model_request', {
    'model': 'MODEL-NAME',
    'system_prompt': 'System prompt for your request'
    'temperature': 'Temperature setting for your request (Optional: Default 0.6)'
    'max_tokens': 'Max number of tokens to generate (Optional: Default 2000)'
    'text': 'The message for the tool to respond to',
    'image_url': '/opt/iobroker/iobroker-data/telegram_0/photo/image.jpg',
}, async (result) => {
    console.info(result.text); // Text response of the model
    console.info(result.model); // Used model for request
    console.info(result.tokens_input); // Used input tokens
    console.info(result.tokens_output); // Used output tokens
    console.info(result.error); // Error, populated if request fails
    console.info(result.request_data); // JSON object with request data
    console.info(result.response_data); // JSON object with raw response of the API call
});
```

---

＃＃ 附加信息
＃＃＃ 统计数据
为您创建的工具和模型创建统计数据，以便您可以跟踪令牌使用情况和其他数据。

| **数据点** | **描述** |
|-----------------------------|-----------------------------------------------------------------------------|
| **.statistics.lastRequest** | 最后一个请求的时间戳。|

| **.statistics.messages*** | 消息历史记录的 JSON 数组（如果消息历史记录 > 0）。
| **.statistics.clear_messages***| 清除消息历史记录按钮。

| **.statistics.tokens_input**| 使用的总输入令牌数。|
| **.statistics.tokens_output**| 使用的总输出令牌数。|

 `* only available for tools, models don't have a message history`

＃＃＃ 要求
| **数据点** | **描述** |
|---------------------|-----------------------------------------------|
| **.request.body** | 发送给 API 的请求正文。|
| **.request.state** | 请求的当前状态。（开始，成功，重试，错误，失败）|

＃＃＃ 回复
| **数据点** | **描述** |
|--------------------|--------------------------------------------------|
| **.request.error** | 如果发生错误则填充。|
| **.request.raw** | 来自模型的原始 JSON 响应。|

---

## 示例
以下示例演示了如何在 ioBroker AI Toolbox Adapter 中配置和使用自定义 AI 工具。这些示例展示了适配器如何利用数据提供智能响应和建议。

---

### 示例 1：简单聊天机器人
**描述：**一个基本的聊天机器人，以对话和友好的方式回复用户消息。这可用于休闲聊天体验。

-**名称**：`simple-chatbot`

- **系统提示：**

`"You are a friendly and conversational chatbot. Respond to user messages in an engaging and cheerful way. Keep your answers brief and focus on maintaining a pleasant tone."`

- **示例请求：**

`"Hi there! How are you today?"`

- **示例响应：**

`"I'm doing great, thanks for asking! How about you?"`

- **消息历史记录**：`10`（允许聊天机器人记住最多 10 次对话的上下文，以实现更自然的流程。）

- **温度**：`0.8`（鼓励创造力，同时保持回应的相关性和友好性。）

----------

### 示例请求和响应
| **请求** | **响应** |
|--------------------|--------------------------------------------------|
| `What's your favorite color?` | `I love blue! It reminds me of the sky.` |
| `Tell me something interesting.` | `Did you know that octopuses have three hearts? Cool, right?` |
| “告诉我一些有趣的事。”|“你知道章鱼有三个心脏吗？很酷，对吧？”|

----------

### 脚本集成示例
要在 ioBroker 中以编程方式使用此工具，您可以通过`sendTo` 函数集成它：

```javascript
sendTo('ai-toolbox.0', 'tool_request', {
  tool: 'simple-chatbot',
  text: 'Hi, chatbot! How’s it going?',
}, async (result) => {
  console.info(result); // Outputs the chatbot's response
});

```

### 示例 2：视觉/图像分析仪
**描述：**一种多模式工具，可分析图像并根据视觉内容提供详细描述或见解。该工具可以识别图像中的物体、场景和其他视觉元素。

-**名称**：`vision-analyzer`

- **系统提示：**

`"You are a vision assistant. Analyze the provided image and generate a detailed description or insights based on the visual content. Your responses should be informative and engaging, focusing on key elements and context in the image."`

- **示例请求：**

`"What do you see in this image?"`

- **示例响应：**

`"This image shows a tall, columnar evergreen tree growing in a black nursery pot or container. It appears to be a cypress or juniper variety, with dense, dark green foliage that grows in a narrow, upright pyramidal shape. These types of trees are popular for landscaping, especially in formal gardens or as accent plants, and they can also be used to create natural privacy screens when planted in rows."`

- **消息历史记录**：`6`（保留相关图像分析问题的上下文。）

- **温度**：`0.6`（平衡创造力和相关性以获得不同的反应。）

- **启用视觉/图像请求** `true`（启用该工具来接受图像 URL 进行分析。）

- **在聊天历史中包含视觉请求** `true`（在聊天历史中包含图像 URL 以保留上下文。）

----------

### 脚本集成示例
要在 ioBroker 中以编程方式使用此工具，您可以通过`sendTo` 函数集成它：

```javascript
sendTo('ai-toolbox.0', 'tool_request', {
  tool: 'vision-analyzer',
  text: 'What do you see in this image?',
  image_url: 'https://url-of-the-image-to-analyze.com/image.jpg'
}, async (result) => {
  console.info(result); // Outputs the chatbot's response
});

```

### 示例 3：自定义天气报告器
**描述：**一个聊天机器人，根据提供的输入数据（例如位置、温度和天气状况）生成个性化的天气报告。响应引人入胜且为用户量身定制。

-**名称**：`weather-reporter`

- **系统提示：**

`"You are a weather reporter chatbot. Based on the input data, generate a detailed and engaging weather report. Your response should include a friendly greeting, a brief overview of the current conditions, and a suggestion for the day. Keep your tone cheerful and informative."`

- **示例请求：**

`"Current datetime 12/7/2024, 12:00:01 PM. Weatherdata: Temperature 7°C, Humidity 87%, Cloudcover 93%, Airpressure 997mbar, Wind 23kmh, Rain 0mm."`

- **示例响应：**

`Hello there! 🌤️ Happy December 7th! As we step into the afternoon, the weather is quite cool at a temperature of 7°C. With a humidity level of 87%, it feels a bit damp out there, so don’t forget to grab your favorite cozy sweater if you’re heading outside! Cloud cover is fairly high today, sitting at 93%, which gives the sky a soft, overcast appearance. The air pressure is at 997 mbar, and while there’s a moderate wind blowing at 23 km/h, it might feel a tad brisk, so a light jacket would be a good call. The good news is that we haven’t seen any rain today, so if you’re planning to venture out, it’s a great time for a stroll or perhaps a warm drink at your favorite café! Stay warm and enjoy your day! ☕🌧️`

- **消息历史记录**：`5`（允许短期上下文保留以回答相关的后续问题。）

- **温度**：`0.7`（确保不同报告的创造力和相关性的结合。）

----------

### 脚本集成示例
要在 ioBroker 中以编程方式使用此工具，您可以通过`sendTo` 函数集成它：

```javascript
var day =  new  Date().toLocaleString();
var cloudCover = getState('daswetter.0.NextHours.Location_1.Day_1.current.clouds_value').val;
var rlf = getState('daswetter.0.NextHours.Location_1.Day_1.current.humidity_value').val;
var pressure = getState('daswetter.0.NextHours.Location_1.Day_1.current.pressure_value').val;
var rain = getState('daswetter.0.NextHours.Location_1.Day_1.current.rain_value').val;
var temp = getState('daswetter.0.NextHours.Location_1.Day_1.current.temp_value').val;
var wind = getState('daswetter.0.NextHours.Location_1.Day_1.current.wind_value').val;

var message =  'Current datetime '  + day +  '. Weatherdata: Temperature '  + temp +  '°C, '  +  'Humidity '  + rlf +  '%, '  +  'Cloudcover '  + cloudCover +  '%, '  +  'Airpressure '  + pressure +  'mbar, '  +  'Wind '  + wind +  'kmh, '  +  'Rain '  + rain +  'mm. ';

sendTo('ai-toolbox.0',  'tool_request',  {
	'tool':  'weather-reporter',
	'text': message,
},  async  (result)  =>  {
	log(result);
});

```

### 示例4：音乐建议助手
**描述：**根据当前天气和时间推荐音乐播放列表。可与 Alexa 或 Google Home 等智能扬声器一起使用。

- **名称**：`music-recommender`
- **系统提示：**

`"You are a music assistant. Based on the current weather and time of day, suggest a playlist or genre that matches the mood. Use concise and creative recommendations. You answer only with your suggestion and nothing else."`

- **示例请求：**

`"Current Time 24th December 2024 17:30. Outside Temperature: 10°C."`

- **示例响应：**

`"Christmas Music"`

- **消息历史记录**：`7`（我们使用值 7 是因为我们将每天触发一次此示例工具，并且不希望它重复其答案。通过此设置，它将看到它对我们的请求的最后 7 次响应中所建议的内容。）
- **温度**：`0.7`（平衡创造力和相关性）

**此工具的请求和响应示例如下：**

| **请求** | **响应** |
|--------------------|--------------------------------------------------|
| `Current time 3rd June 2024 16:00. Outside Temperature: 31°C` | `Latin Summer Music` |
| `Current time 11th November 2024 12:00. Outside Temperature: 15°C` | `Acoustic Guitar Music` |
| `当前时间 2024 年 11 月 11 日 12:00。室外温度：15°C` | `原声吉他音乐` |

---

### 示例 5：灯光设置推荐器
**描述：**根据当前播放音乐的情绪和类型推荐 RGB 灯光设置。该工具会分析音乐的特征（例如节奏、情绪）并为五种 RGB 灯光推荐合适的灯光颜色。输出包含每种灯光的 RGB 十六进制值的 JSON。

-**名称**：`light-setter`

- **系统提示：**

`"You are a smart home assistant. Based on the characteristics of the currently playing music, recommend RGB hex color values for five different lights to create an immersive atmosphere. Respond only with a JSON object containing the RGB hex values for each light."`

- **示例请求：**

```
Faithless - Insomnia
```

- **示例响应：**

```json
{
  "light1": "#FF4500",
  "light2": "#FFA500",
  "light3": "#FFFF00",
  "light4": "#ADFF2F",
  "light5": "#00FF00"
}
```

- **消息历史记录**：`0`（一次性工具，以最大限度地减少令牌的使用。）

- **温度**：`0.6`（平衡创造力和一致性。）

---

### 示例请求和响应
| **请求** | **响应** |
|-------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `The Beatles - Here Comes The Sun` | `{ "light1": "#FFD700", "light2": "#FFA500", "light3": "#FF8C00", "light4": "#FF4500", "light5": "#FF0000" }` |
| `Mozart - Eine kleine Nachtmusik` | `{ "light1": "#FFD700", "light2": "#FFA500", "light3": "#FF8C00", "light4": "#FF4500", "light5": "#FF0000" }` |
| 《莫扎特 - 小夜曲》| `{ "light1": "#FFD700", "light2": "#FFA500", "light3": "#FF8C00", "light4": "#FF4500", "light5": "#FF0000" }` |

---

### 脚本集成示例
要在 ioBroker 中以编程方式使用此工具，您可以通过`sendTo` 函数集成它：

```javascript
sendTo('ai-toolbox.0', 'tool_request', {
  tool: 'light-setter',
  text: 'Faithless - Insomnia',
}, async (result) => {
  console.info(result); // Outputs the recommended RGB hex values for the lights
});
```

---

## 最佳实践：最大限度地发挥 AI 工具的潜力
为了确保您充分利用 ioBroker AI 工具箱适配器及其工具，以下是一些最佳实践、提示和技巧：

#### **1. 理解关键概念**
- **系统提示**：

系统提示定义了 AI 工具的行为和风格。可以将其视为工具的“个性”或“准则”。例如，天气机器人的系统提示可能是：`"You are a cheerful weather assistant. Provide detailed weather forecasts in a friendly tone."`

-   **温度**：

此设置可调整响应的“创造性”程度。较低的值（例如 0.2）可使工具更加真实和确定，而较高的值（例如 0.8）可实现更加多样化和富有创意的输出。

- **最大代币**：

控制响应的长度。将其设置为高可以获得详细的答案，设置为低可以获得简洁的输出。

- **消息历史**：

这样工具就可以保留上下文以保证对话的连续性。对聊天机器人使用较高的值（例如 10），对一次性响应使用较低的值（例如 0），以节省令牌。

----------

#### **2. 创建清晰、具体的工具**
- 使用针对工具用途量身定制的**特定系统提示**。精心设计的系统提示可确保输出结果有针对性且相关。
- 提供**示例请求和响应**，为模型设定明确的期望。这有助于保持一致的行为和更好的理解。

----------

#### **3. 精心配置 AI 提供商**
每个提供商都有其独特的优势。选择符合您用例的模型，并尝试各种选项以找到最佳匹配。

----------

#### **4. 平衡性能和成本**
- 通过 OpenRouter 从“meta-llama”等**免费模型**开始测试想法，然后再扩展到更强大的付费选项。
- 使用**token statistics**（可在`.statistics.tokens_input`和`.statistics.tokens_output`中使用）来监控使用情况并优化工具配置。

----------

#### **5. 利用动态和可重用组件**
- **动态系统提示**：根据实时数据调整提示。例如，提取实时天气数据以创建个性化预报。

```javascript
sendTo('ai-toolbox.0', 'model_request', {
    model: 'MODEL-NAME',
    system_prompt: 'Current weather in {location} is {temperature}°C. Advise suitable outdoor activities.',
    text: 'What should I do today?',
}, (result) => console.info(result.text));

```

- **脚本集成**：使用 JavaScript 根据外部输入动态调整温度或系统提示等参数。

----------

#### **6. 测试、调整和发展**
- 使用调试日志来识别工具性能问题。

在 ioBroker 管理界面中将日志级别设置为`debug`。

- 尝试**不同的系统提示、温度设置和令牌限制**来优化行为。

----------

#### **7. 构建模块化解决方案**
- 将复杂的任务拆分为更小、可重复使用的工具。例如，使用一个工具来分析数据，另一个工具来生成报告。将这些工具组合到脚本中，以实现强大的工作流程。

----------

#### **8. 管理消息历史记录**
- 对于基于聊天的工具，维持可管理的历史记录长度以提供上下文，而无需过多使用令牌。

----------

#### **9. 使用 JSON 输出实现自动化**
对于集成到智能家居或脚本的工具，请通过提供您想要接收的格式的示例响应来配置 JSON 中的响应格式。

----------

这些最佳实践与实验和迭代改进相结合，将确保您的 AI 工具提供适合您的智能家居环境的有意义且可靠的结果。

＃＃ 发展
### 调试
在 ioBroker 管理界面中将日志级别设置为`debug` 以获取详细日志。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.1.3 (2025-29-01)
* (@ToGe3688) Added support for Deepseek as api provider
* (@ToGe3688) Better display of providers in model selection for admin config
* (@ToGe3688) Fixed object hirarchy 
* (@ToGe3688) Fixed state roles
* (@ToGe3688) Fixed onStateChange handler

### 0.1.2 (2025-12-01)
* (@ToGe3688) Better error handling for Provider APIs
* (@ToGe3688) Added Anthropic API Versioning

### 0.1.1 (2025-05-01)
* (@ToGe3688) Added timeouts for api providers

### 0.1.0 (2025-04-01)
* (@ToGe3688) Beta Release

### 0.0.7 (2024-27-12)
* (@ToGe3688) Added translations, updated Readme, changed image fetch method to axios

### 0.0.6 (2024-26-12)
* (@ToGe3688) Added support for local files for image analysis

### 0.0.4 (2024-26-12)
* (@ToGe3688) Added vision capabilities for tools

### 0.0.3 (2024-25-12)
* (@ToGe3688) Fixed a bug with the OpenAI API Provider

### 0.0.2 (2024-07-12)
* (@ToGe3688) Added direct model requests, moved tools to separate objects, added statistics and request history

### 0.0.1 (2024-05-12)
* (@ToGe3688) initial release

## License

The MIT License (MIT)

Copyright (c) 2025 ToGe3688 <toge3688@gmail.com>

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