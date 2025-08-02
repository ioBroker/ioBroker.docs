![Logo](admin/ai-assistant.png)

# ioBroker.ai-assistant

[![NPM version](https://img.shields.io/npm/v/iobroker.ai-assistant.svg)](https://www.npmjs.com/package/iobroker.ai-assistant)
[![Downloads](https://img.shields.io/npm/dm/iobroker.ai-assistant.svg)](https://www.npmjs.com/package/iobroker.ai-assistant)
![Number of Installations](https://iobroker.live/badges/ai-assistant-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/ai-assistant-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.ai-assistant.png?downloads=true)](https://nodei.co/npm/iobroker.ai-assistant/)

**Tests:** ![Test and Release](https://github.com/ToGe3688/ioBroker.ai-assistant/workflows/Test%20and%20Release/badge.svg)

## Overview

The ioBroker AI Assistant Adapter runs a smart assistant in your ioBroker system.
The assistant can be used to interact with your ioBroker system, set time-based instructions, trigger-based instructions, and call custom functions.
The assistant can be configured with different language models from various providers (e.g., OpenAI, Anthropic, Perplexity, OpenRouter) or custom/self-hosted models.
The assistant can be used to automate tasks, control your smart home, or provide information.

## Features

- Personalize the name and personality of your assistant
- List, Read and Write ioBroker states
- Set timeouts and cronjobs to run time-based instructions
- Set triggers on ioBroker states with conditions that run instructions when the conditions are met
- Define custom functions with your own data and logic
- Use the admin tab to chat with your personal assistant

## Supported Providers

- **Anthropic**: [anthropic.com](https://anthropic.com)
- **OpenAI**: [openai.com](https://openai.com)
- **Perplexity**: [perplexity.ai](https://perplexity.ai)
- **OpenRouter**: [openrouter.ai](https://openrouter.ai)
- **Deepseek**: [deepseek.com](http://deepseek.com/)
- **Custom/Self-hosted Models** (e.g., LM Studio, LocalAI)

---

## Quick Start

1. Install the adapter.
2. Set up a provider (e.g., OpenAI, Anthropic, Perplexity, OpenRouter) and get an API Token.
3. Configure the adapter with the API Token.
4. Select the model you want to use for the assistant.
5. Add some ioBroker states under the `Objects` tab that will be available to the assistant.
6. Start communicating with your assistant by sending text requests to the assistant's `text_request` state and receive responses from the `text_response` state or use the custom admin tab labeled "Assistant".

---

## Tested Models

The following models have been tested with the adapter and are known to work well:

- Claude 3.5 Sonnet (Anthropic)
- gpt-4o-mini (OpenAI)
- meta-llama/llama-3.3-70b-instruct (OpenRouter)
- deepseek/deepseek-chat (OpenRouter)
- x-ai/grok-beta (OpenRouter)
- perplexity/llama-3.1-sonar-huge-128k-online (Perplexity)
- perplexity/llama-3.1-sonar-large-128k-online (Perplexity)

---

## Configuration

### Assistant

Setup your assistant with the following settings:

| **Setting**            | **Description**                                                                                            |
| ---------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Name**               | The name of your assistant.                                                                                |
| **Model**              | Select the LLM model that your assistant should use (configured under providers).                          |
| **Personality**        | Describe the personality of your assistant.                                                                |
| **Language**           | Select the language your assistant should use (Currently only English/German supported)                    |
| **Debug / CoT Output** | When active the internal thoughts and processes the assistant uses are written to the text_response state. |
| **Message History**    | Include prior messages (for chatbot-like behavior). Set to 0 for single-use tools to minimize token usage. |
| **Temperature**        | Controls response creativity/consistency.                                                                  |
| **Max. Tokens**        | Limits the response token count.                                                                           |
| **Retry Delay**        | Delay between retry attempts if the request fails                                                          |
| **Maximum Retries**    | Maximum number of retries per request.                                                                     |

---

### Objects

### WARNING: Be careful with the states you give the assistant access to, as it can read and write to all states it has access to.

Setup the ioBrokers objects and states the assistant should have access to. 

**NOTE: When importing or adding objects please make sure to only add datapoints with the type "state" that can be directly controlled or contains a value to be read!**

| **Setting**                | **Description**                                                                                           |
| -------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Import from Enum.Rooms** | Imports all your states from the enum.rooms sorting in ioBroker. (Overwrites all previously set objects!) |
| **Sort**                   | All objects with the same sort field will be presented to the assistant in a group (e.g. a room)          |
| **Name**                   | Use a descriptive name so the assistant understands the function of the objects                           |
| **Object**                 | The ID of the ioBroker state                                                                              |

---

### Functions

Setup custom functions that should be available to the assistant.
Your custom functions have to write the response to the state you defined in the `State (Response)` field after the `State (Request)` is written.
The result can be in any format you like (e.g. JSON, plain text), just make sure the assistant can understand it.
Tipp: You can use the [AI-Toolbox Adapter](https://github.com/ToGe3688/ioBroker.ai-toolbox) to integrate your assistant with custom AI tools.

**NOTE: If you don't write a response to the `State (Response)` field in 60 Seconds, the function call will fail!**

| **Setting**          | **Description**                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| **Sort**             | All objects with the same sort field will be presented to the assistant in a group (e.g. a room) |
| **Name**             | Use a descriptive name for the custom function                                                   |
| **Description**      | Describe what your function does so the assistant understands when to call it                    |
| **State (Request)**  | This state will be written with a string by the assistant when the function is called            |
| **State (Response)** | This state will be read by the assistant to get the response of the function                     |

---

### LLM Providers

Configure each AI provider individually:

#### Anthropic

| **Setting**   | **Description**                 |
| ------------- | ------------------------------- |
| **API Token** | Enter your Anthropic API token. |
| **Models**    | Specify the models to use.      |

#### OpenAI

| **Setting**   | **Description**              |
| ------------- | ---------------------------- |
| **API Token** | Enter your OpenAI API token. |
| **Models**    | Specify the models to use.   |

#### Perplexity

| **Setting**   | **Description**                  |
| ------------- | -------------------------------- |
| **API Token** | Enter your Perplexity API token. |
| **Models**    | Specify the models to use.       |

#### OpenRouter

| **Setting**   | **Description**                  |
| ------------- | -------------------------------- |
| **API Token** | Enter your OpenRouter API token. |
| **Models**    | Specify the models to use.       |

#### Custom

| **Setting**                        | **Description**                                                           |
| ---------------------------------- | ------------------------------------------------------------------------- |
| **Inference Server URL**           | URL of the custom/self-hosted inference server.                           |
| **API Token for Inference Server** | API token for your inference server.                                      |
| **Models**                         | Specify the models to use.                                                |
| **Note**                           | Ensure compliance with common AI LLM API standards (e.g., LM Studio API). |

---

## Usage

### Simple Conversation

You can interact with your assistant by sending text requests to the `text_request` state and receiving responses from the `text_response` state.

#### Function Calling

The assistant can call all available functions. It does this by determining the function to call based on the text request. If you have Debug/CoT Output enabled, you can see the internal process of the assistant in the `text_response` state.

#### State Interaction

The assistant can list, read and write multiple ioBroker states at once. You can use the `Objects` tab to define which states the assistant should have access to.

#### Time-based Instructions

The assistant can set timeouts for relative time instructions and cronjobs for specific times. Cronjobs will be listed in the assistant objects tree unter `Cronjobs`.
Timeouts will only be temporary and will be removed after the timeout is executed or the adapter is restarted.
When a timeout or cronjob is triggered, the assistant will be woken up and the instruction will be executed.

#### Trigger-based Instructions

The assistant can set triggers on ioBroker states with optional conditions that run instructions when the conditions are met. Triggers will be listed in the assistant objects tree unter `Triggers`.
When triggered the assistant will be woken up and the instruction will be executed.

#### Custom Functions

The assistant can call custom functions you defined in the `Functions` tab. The assistant will write the request to the `State (Request)` field and expects the response in the `State (Response)` field.

#### Function Chaining

The assistant can be used to chain multiple functions together. For example you could setup a cronjob that when executed starts a check of ioBroker states and then calls a custom function with the results.

#### Clearing Chat History

Sometimes it can be useful to reset your chat history. You can do this by requesting the assistant to clear its history. This will remove all previous messages from the assistant's memory. (e.g. `Clear history` or `Forget the previous messages`)

## Additional Information

### Statistics

Statistics are logged for your assistant and can be viewed in the `Statistics` object tree.

| **Datapoint**                    | **Description**                                         |
| -------------------------------- | ------------------------------------------------------- |
| **.statistics.lastRequest**      | Timestamp of the last request.                          |
| **.statistics.requestCount**     | Number of sent requests to the assistant                |
| **.statistics.messages\***       | JSON array of message history (if message history > 0). |
| **.statistics.clear_messages\*** | Clear message history button.                           |
| **.statistics.tokens_input**     | Total input tokens used.                                |
| **.statistics.tokens_output**    | Total output tokens used.                               |

## Development

This adapter is still in development and may contain bugs. Please report any issues you encounter.

### Debugging

Set the log level to `debug` in the ioBroker admin interface for detailed logs.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.1.4 (2025-06-05)
* (@ToGe3688) Added tab to interact with the assitant in the admin adapter
* (@ToGe3688) Added a custom timeout parameter
* (@GermanBluefox) Corrected using of the states with the multi-language names

### 0.1.3 (2025-29-01)
* (@ToGe3688) Added support for Deepseek as api provider
* (@ToGe3688) Better display of providers in model selection for admin config
* (@ToGe3688) Fixed object hirarchy 
* (@ToGe3688) Fixed state roles
* (@ToGe3688) Fixed onStateChange handler

### 0.1.2 (2025-12-01)
- (@ToGe3688) Better error handling for Provider APIs
- (@ToGe3688) Anthropic API Versioning

### 0.1.1 (2025-12-01)

- (@ToGe3688) Better error handling for Provider APIs

### 0.1.0 (2025-04-01)

- (@ToGe3688) Beta Release

### 0.0.3 (2024-31-12)

- (@ToGe3688) Improved handling of malformed model responses
- (@ToGe3688) Fixed a bug where the names of the states were not provided to the assistant

### 0.0.2 (2024-30-12)

- (@ToGe3688) Fixed Bug in OpenAI Provider

### 0.0.1 (2024-30-12)

- (@ToGe3688) initial release

## License

The MIT License (MIT)

Copyright (c) 2024-2025 ToGe3688 <toge3688@gmail.com>

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