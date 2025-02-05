

![Logo](admin/ai-toolbox.png)
# ioBroker.ai-toolbox

[![NPM version](https://img.shields.io/npm/v/iobroker.ai-toolbox.svg)](https://www.npmjs.com/package/iobroker.ai-toolbox)
[![Downloads](https://img.shields.io/npm/dm/iobroker.ai-toolbox.svg)](https://www.npmjs.com/package/iobroker.ai-toolbox)
![Number of Installations](https://iobroker.live/badges/ai-toolbox-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/ai-toolbox-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.ai-toolbox.png?downloads=true)](https://nodei.co/npm/iobroker.ai-toolbox/)

**Tests:** ![Test and Release](https://github.com/ToGe3688/ioBroker.ai-toolbox/workflows/Test%20and%20Release/badge.svg)

## Overview

The ioBroker AI Toolbox Adapter integrates customizable AI tools into your smart home. It supports multiple Large Language Model (LLM) providers and provides a flexible framework for automation and interaction. By combining data from smart home devices, with AI capabilities, the ioBroker AI Toolbox Adapter can create highly personalized and useful tools for your household automation tasks and interaction with LLM Models.

## Features

- Multiple AI providers and models support.
- Create custom AI tools for specific tasks
- Chat history management for context retention.
- Token usage and request history statistics.
- Vision capabilities for image analysis.

## Supported Providers

- **Anthropic**: [anthropic.com](https://anthropic.com)  
- **OpenAI**: [openai.com](https://openai.com)  
- **Perplexity**: [perplexity.ai](https://perplexity.ai)  
- **OpenRouter**: [openrouter.ai](https://openrouter.ai) (Free usage models for beginners)  
- **Deepseek**: [deepseek.com](http://deepseek.com/)
- **Custom/Self-hosted Models** (e.g., LM Studio, LocalAI)  

---

## Quick Start
1. Install the adapter.
2. Create Account and get API Token from openrouter.ai
3. Configure the adapter with the API Token.
4. The Example tools created at installation use the free model meta-llama/llama-3.2-3b-instruct:free for OpenRouter.
5. Send a message to the tool with the .text_request datapoint and check .text_response for the response.

Please note the free models sometimes have a long wait time for the first response, may be overloaded or have other limitations. Models also vary in quality and capabilities, make sure to select the right model for your use case.

**Even if this Readme is written in english, most models are multilingual, just try writing your tools in your native language to get your desired output!**

---

## Configuration

### Tools

Define custom AI tools tailored to specific tasks:

| **Setting**           | **Description**                                                                                                                                 |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| **Name**              | The tool's name.                                                                                                                               |
| **Model**             | Select the LLM model (configured under providers).                                                                                             |
| **System Prompt**     | Provide detailed information describing the tool.                                                                                              |
| **Example Request**   | (Optional) A sample request.                                                                                                                   |
| **Example Response**  | (Required if an example request is provided) The ideal response.                                                                               |
| **Message History**   | Include prior messages (for chatbot-like behavior). Set to 0 for single-use tools to minimize token usage.                                     |
| **Temperature**       | Controls response creativity/consistency.                                                                                                      |
| **Max. Tokens**       | Limits the response token count.                                                                                                               |
| **Retry Delay**      | Delay between retry attempts if the request fails       |
| **Maximum Retries**  | Maximum number of retries per request. |
| **Enable Vision/Image requests**  | Enable vision/image input. |
| **Include Vision Requests in chat history**  | Include vision/image data in chat history |
---

### LLM Providers

Configure each AI provider individually:

#### Anthropic

| **Setting**     | **Description**                              |
|-----------------|----------------------------------------------|
| **API Token**   | Enter your Anthropic API token.              |
| **Models**      | Specify the models to use.                   |

#### OpenAI

| **Setting**     | **Description**                              |
|-----------------|----------------------------------------------|
| **API Token**   | Enter your OpenAI API token.                 |
| **Models**      | Specify the models to use.                   |

#### Perplexity

| **Setting**     | **Description**                              |
|-----------------|----------------------------------------------|
| **API Token**   | Enter your Perplexity API token.             |
| **Models**      | Specify the models to use.                   |

#### OpenRouter

| **Setting**     | **Description**                              |
|-----------------|----------------------------------------------|
| **API Token**   | Enter your OpenRouter API token.             |
| **Models**      | Specify the models to use.                   |

#### Deepseek

| **Setting**     | **Description**                              |
|-----------------|----------------------------------------------|
| **API Token**   | Enter your Deepseek API token.               |
| **Models**      | Specify the models to use.                   |

#### Custom

| **Setting**                        | **Description**                                                                  |
|------------------------------------|----------------------------------------------------------------------------------|
| **Inference Server URL**           | URL of the custom/self-hosted inference server.                                  |
| **API Token for Inference Server** | API token for your inference server.                                             |
| **Models**                         | Specify the models to use.                                                      |
| **Note**                           | Ensure compliance with common AI LLM API standards (e.g., LM Studio API).       |

---

## Using Your Tools

### Object Interaction

Each tool appears in the ioBroker object tree. Use `Tools.$YourToolName.text_request` to send queries and `Tools.$YourToolName.text_response` to retrieve answers.

#### Vision/Image Requests

If you have enabled vision/image requests, you can use `Tools.$YourToolName.image_url` to set an image URL or local file path for the tool to analyze. The image will be included in the request when you set the state of the `Tools.$YourToolName.text_request` datapoint. 

Note: You can use a local url (e.g. in your local network http://192.168.178.1/image.jpg) or file path (where ioBroker has permission to read the files e.g. /opt/iobroker/iobroker-data/telegram_0/photo/image.jpg). The adapter converts the image to a base64 string and includes it in the request.

## Script Integration (`sendTo`)

You can interact programmatically using the `sendTo` function:

#### Text Requests
```javascript
sendTo('ai-toolbox.0', 'tool_request', {
    'tool': 'YOUR-TOOL-NAME',
    'text': 'The message for the tool to respond to',
}, async (result) => {
    console.info(result); // Outputs the tool's response as text string
});
```
#### Vision/Image Requests with URL
```javascript
sendTo('ai-toolbox.0', 'tool_request', {
    'tool': 'YOUR-TOOL-NAME',
    'text': 'The message for the tool to respond to',
    'image_url': 'https://url-of-the-image-to-analyze.com/image.jpg',
}, async (result) => {
    console.info(result); // Outputs the tool's response as text string
});
```

#### Vision/Image Requests with Local File
```javascript
sendTo('ai-toolbox.0', 'tool_request', {
    'tool': 'YOUR-TOOL-NAME',
    'text': 'The message for the tool to respond to',
    'image_url': '/opt/iobroker/iobroker-data/telegram_0/photo/image.jpg',
}, async (result) => {
    console.info(result); // Outputs the tool's response as text string
});
```

### Using Models without Tools

### Object Interaction

Each defined model also appears in the ioBroker object tree.  Use `Models.$ModelName.text_request` to send queries and `Models.$ModelName.text_response` to retrieve answers. With the script integration you can create even more creative integrations for example you could create a dynamic system prompt.

## Script Integration (`sendTo`)

You can interact programmatically using the `sendTo` function:

#### Text Requests
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

#### Vision/Image Requests with URL
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

#### Vision/Image Requests with Local File
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

## Additional Information

### Statistics
Statistics are created for your created tools and also for the models so you can track token usage and other data. 

| **Datapoint**               | **Description**                                                             |
|-----------------------------|-----------------------------------------------------------------------------|
| **.statistics.lastRequest** | Timestamp of the last request.                                              |
| **.statistics.messages***     | JSON array of message history (if message history > 0).
| **.statistics.clear_messages***| Clear message history button.      
| **.statistics.tokens_input**| Total input tokens used.                                                    |
| **.statistics.tokens_output**| Total output tokens used.                                                  |
                                     
 `* only available for tools, models don't have a message history`                                       

### Request

| **Datapoint**       | **Description**                               |
|---------------------|-----------------------------------------------|
| **.request.body**   | Request body sent to the API.                 |
| **.request.state**  | Current state of the request. (start, success, retry, error, failed)               |

### Response

| **Datapoint**      | **Description**                                  |
|--------------------|--------------------------------------------------|
| **.request.error** | Populated if an error occurs.                    |
| **.request.raw**   | Raw JSON response from the model.                |

---


## Examples

The following examples demonstrate how to configure and use customized AI tools within the ioBroker AI Toolbox Adapter. These examples showcase how the adapter can leverage data to provide intelligent responses and recommendations.

---

### Example 1: Simple Chatbot

**Description:** A basic chatbot that responds to user messages in a conversational and friendly manner. This can be used to for a casual chat experience.

-   **Name:** `simple-chatbot`
    
-   **System Prompt:**  
    `"You are a friendly and conversational chatbot. Respond to user messages in an engaging and cheerful way. Keep your answers brief and focus on maintaining a pleasant tone."`
    
-   **Example Request:**  
    `"Hi there! How are you today?"`
    
-   **Example Response:**  
    `"I'm doing great, thanks for asking! How about you?"`
    
-   **Message History:** `10` (Allows the chatbot to remember the context of the conversation up to 10 exchanges for a more natural flow.)
    
-   **Temperature:** `0.8` (Encourages creativity while keeping responses relevant and friendly.)
    

----------

### Example Requests and Responses
| **Request**      | **Response**                                  |
|--------------------|--------------------------------------------------|
| `What's your favorite color?` | `I love blue! It reminds me of the sky.`  |
| `Do you know any jokes?` | `Why don’t skeletons fight each other? They don’t have the guts!`  |
| `Tell me something interesting.` | `Did you know that octopuses have three hearts? Cool, right?`  |

----------

### Script Integration Example

To use this tool programmatically in ioBroker, you can integrate it via the `sendTo` function:

```javascript
sendTo('ai-toolbox.0', 'tool_request', {
  tool: 'simple-chatbot',
  text: 'Hi, chatbot! How’s it going?',
}, async (result) => {
  console.info(result); // Outputs the chatbot's response
});

```

### Example 2: Vision / Image Analyzer

**Description:** A multimodal tool that analyses images and provides detailed descriptions or insights based on the visual content. The tool can identify objects, scenes, and other visual elements in the image.

-   **Name:** `vision-analyzer`
    
-   **System Prompt:**  
    `"You are a vision assistant. Analyze the provided image and generate a detailed description or insights based on the visual content. Your responses should be informative and engaging, focusing on key elements and context in the image."`
    
-   **Example Request:**  
    `"What do you see in this image?"`
    
-   **Example Response:**  
    `"This image shows a tall, columnar evergreen tree growing in a black nursery pot or container. It appears to be a cypress or juniper variety, with dense, dark green foliage that grows in a narrow, upright pyramidal shape. These types of trees are popular for landscaping, especially in formal gardens or as accent plants, and they can also be used to create natural privacy screens when planted in rows."`
    
-   **Message History:** `6` (Retains context for related image analysis questions.)
    
-   **Temperature:** `0.6` (Balances creativity and relevance for varied responses.)

  - **Enable Vision/Image requests**  `true` (Enables the tool to accept image URLs for analysis.)

  - **Include Vision Requests in chat history**  `true` (Includes image URLs in the chat history for context retention.)
    

----------

### Script Integration Example

To use this tool programmatically in ioBroker, you can integrate it via the `sendTo` function:

```javascript
sendTo('ai-toolbox.0', 'tool_request', {
  tool: 'vision-analyzer',
  text: 'What do you see in this image?',
  image_url: 'https://url-of-the-image-to-analyze.com/image.jpg'
}, async (result) => {
  console.info(result); // Outputs the chatbot's response
});

```

### Example 3: Custom Weather Reporter

**Description:** A chatbot that generates personalized weather reports based on the provided input data, such as location, temperature, and weather conditions. The responses are engaging and tailored for the user.

-   **Name:** `weather-reporter`
    
-   **System Prompt:**  
    `"You are a weather reporter chatbot. Based on the input data, generate a detailed and engaging weather report. Your response should include a friendly greeting, a brief overview of the current conditions, and a suggestion for the day. Keep your tone cheerful and informative."`
    
-   **Example Request:**  
    `"Current datetime 12/7/2024, 12:00:01 PM. Weatherdata: Temperature 7°C, Humidity 87%, Cloudcover 93%, Airpressure 997mbar, Wind 23kmh, Rain 0mm."`
    
-   **Example Response:**  
    `Hello there! 🌤️ Happy December 7th! As we step into the afternoon, the weather is quite cool at a temperature of 7°C. With a humidity level of 87%, it feels a bit damp out there, so don’t forget to grab your favorite cozy sweater if you’re heading outside! Cloud cover is fairly high today, sitting at 93%, which gives the sky a soft, overcast appearance. The air pressure is at 997 mbar, and while there’s a moderate wind blowing at 23 km/h, it might feel a tad brisk, so a light jacket would be a good call. The good news is that we haven’t seen any rain today, so if you’re planning to venture out, it’s a great time for a stroll or perhaps a warm drink at your favorite café! Stay warm and enjoy your day! ☕🌧️`
    
-   **Message History:** `5` (Allows for short-term context retention for related follow-up questions.)
    
-   **Temperature:** `0.7` (Ensures a mix of creativity and relevance for varied reports.)
    

----------

### Script Integration Example

To use this tool programmatically in ioBroker, you can integrate it via the `sendTo` function:

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

### Example 4: Music Suggestion Assistant
**Description:** Recommends music playlists based on the current weather and time of day. Can be used with a smart speaker like Alexa or Google Home.

- **Name:** `music-recommender`
- **System Prompt:**  
  `"You are a music assistant. Based on the current weather and time of day, suggest a playlist or genre that matches the mood. Use concise and creative recommendations. You answer only with your suggestion and nothing else."`
- **Example Request:**  
  `"Current Time 24th December 2024 17:30. Outside Temperature: 10°C."`
- **Example Response:**  
  `"Christmas Music"`
- **Message History:** `7` (We use a value of 7 because we are going to trigger this example tool once a day and dont want it to repeat its answers. With this setting it will see what it suggested in the last 7 responses to our requests.)
- **Temperature:** `0.7` (Balances creativity and relevance)

**Examples for a request and response to this tool could look like this:**

| **Request**      | **Response**                                  |
|--------------------|--------------------------------------------------|
| `Current time 3rd June 2024 16:00. Outside Temperature: 31°C` | `Latin Summer Music`  |
| `Current time 4th February 2024 20:00. Outside Temperature: 5°C` | `Jazz Music`  |
| `Current time 11th November 2024 12:00. Outside Temperature: 15°C` | `Acoustic Guitar Music`  |

---

### Example 5: Light Settings Recommender

**Description:** Recommends RGB light settings based on the mood and genre of the currently playing music. The tool analyzes the music's characteristics (e.g., tempo, mood) and suggests appropriate lighting colors for five RGB lights. Outputs JSON with RGB hex values for each light.

- **Name:** `light-setter`

- **System Prompt:**

  `"You are a smart home assistant. Based on the characteristics of the currently playing music, recommend RGB hex color values for five different lights to create an immersive atmosphere. Respond only with a JSON object containing the RGB hex values for each light."`

- **Example Request:**

  ```
  Faithless - Insomnia
  ```

- **Example Response:**

  ```json
  {
    "light1": "#FF4500",
    "light2": "#FFA500",
    "light3": "#FFFF00",
    "light4": "#ADFF2F",
    "light5": "#00FF00"
  }
  ```

- **Message History:** `0` (Single-use tool to minimize token usage.)

- **Temperature:** `0.6` (Balances creativity and consistency.)

---

### Example Requests and Responses

| **Request**                                                                                     | **Response**                                                                                                                                              |
|-------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `The Beatles - Here Comes The Sun`                                                             | `{ "light1": "#FFD700", "light2": "#FFA500", "light3": "#FF8C00", "light4": "#FF4500", "light5": "#FF0000" }`                                             |
| `Beethoven - Symphony No. 9`                                                                   | `{ "light1": "#FF0000", "light2": "#FF4500", "light3": "#FFA500", "light4": "#FFD700", "light5": "#FFFF00" }`                                             |
| `Mozart - Eine kleine Nachtmusik`                                                              | `{ "light1": "#FFD700", "light2": "#FFA500", "light3": "#FF8C00", "light4": "#FF4500", "light5": "#FF0000" }`                                             |

---

### Script Integration Example

To use this tool programmatically in ioBroker, you can integrate it via the `sendTo` function:

```javascript
sendTo('ai-toolbox.0', 'tool_request', {
  tool: 'light-setter',
  text: 'Faithless - Insomnia',
}, async (result) => {
  console.info(result); // Outputs the recommended RGB hex values for the lights
});
```
---

## Best Practices: Maximizing the Potential of Your AI Tools

To ensure you get the most out of the ioBroker AI Toolbox Adapter and its tools, here are some best practices, tips, and tricks:

#### **1. Understand Key Concepts**

-   **System Prompt**:  
    The system prompt defines the behavior and style of your AI tool. Think of it as the "personality" or "guidelines" for the tool. For example, a system prompt for a weather bot might be:  
    `"You are a cheerful weather assistant. Provide detailed weather forecasts in a friendly tone."`
    
-   **Temperature**:  
    This setting adjusts how "creative" the responses are. Lower values (e.g., 0.2) make the tool more factual and deterministic, while higher values (e.g., 0.8) allow for more varied and creative outputs.
    
-   **Max Tokens**:  
    Controls the length of responses. Set it high for verbose answers and low for concise outputs.
    
-   **Message History**:  
    This allows tools to retain context for conversational continuity. Use a higher value (e.g., 10) for chatbots and a lower value (e.g., 0) for one-time responses to save tokens.
    

----------

#### **2. Create Clear and Specific Tools**

-   Use **specific system prompts** tailored to the tool’s purpose. A well-crafted system prompt ensures focused and relevant outputs.
-   Provide **example requests and responses** to set clear expectations for the model. This helps in consistent behavior and better understanding.

----------

#### **3. Configure AI Providers Thoughtfully**

Each provider offers unique strengths. Choose the model that aligns with your use case and experiment with various options to find the optimal fit. 

----------

#### **4. Balance Performance and Cost**

-   Start with **free models** like `meta-llama` via OpenRouter to test ideas before scaling up to more powerful paid options.
-   Use **token statistics** (available in `.statistics.tokens_input` and `.statistics.tokens_output`) to monitor usage and optimize tool configurations.

----------

#### **5. Utilize Dynamic and Reusable Components**

-   **Dynamic System Prompts**: Adapt prompts based on real-time data. For example, pull live weather data to create personalized forecasts.
    
    ```javascript
    sendTo('ai-toolbox.0', 'model_request', {
        model: 'MODEL-NAME',
        system_prompt: 'Current weather in {location} is {temperature}°C. Advise suitable outdoor activities.',
        text: 'What should I do today?',
    }, (result) => console.info(result.text));
    
    ```
    
-   **Script Integration**: Use JavaScript to dynamically adjust parameters like temperature or system prompts based on external inputs.

----------

#### **6. Test, Tweak, and Evolve**

-   Use debugging logs to identify issues in tool performance.  
    Set log level to `debug` in the ioBroker admin interface.
-   Experiment with **different system prompts, temperature settings, and token limits** to optimize behavior.

----------

#### **7. Build Modular Solutions**

-   Split complex tasks into smaller, reusable tools. For example, use one tool for analyzing data and another for generating reports. Combine these in your scripts for powerful workflows.

----------

#### **8. Manage Message History**

-   For chat-based tools, maintain a manageable history length to provide context without excessive token usage.

----------

#### **9. Use JSON Outputs for Automation**

For tools integrated into smart homes or scripts, configure the response format in JSON by providing the example response in the format you would like to receive.

----------

These best practices, combined with experimentation and iterative improvement, will ensure that your AI tools provide meaningful and reliable outcomes tailored to your smart home environment.


## Development

### Debugging

Set the log level to `debug` in the ioBroker admin interface for detailed logs.

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