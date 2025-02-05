---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ai-toolbox/README.md
title: ioBroker.ai-набор инструментов
hash: vOxR/4rmRRntCesgYd30u23JYfx6PH6vqQBJ27eopnk=
---
![Логотип](../../../en/adapterref/iobroker.ai-toolbox/admin/ai-toolbox.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.ai-toolbox.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ai-toolbox.svg)
![Количество установок](https://iobroker.live/badges/ai-toolbox-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/ai-toolbox-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.ai-toolbox.png?downloads=true)

# IoBroker.ai-панель инструментов
**Тесты:** ![Тест и выпуск](https://github.com/ToGe3688/ioBroker.ai-toolbox/workflows/Test%20and%20Release/badge.svg)

## Обзор
Адаптер ioBroker AI Toolbox интегрирует настраиваемые инструменты ИИ в ваш умный дом. Он поддерживает несколько поставщиков Large Language Model (LLM) и обеспечивает гибкую структуру для автоматизации и взаимодействия. Объединяя данные с устройств умного дома с возможностями ИИ, адаптер ioBroker AI Toolbox может создавать высокоперсонализированные и полезные инструменты для задач автоматизации вашего дома и взаимодействия с моделями LLM.

## Функции
- Поддержка нескольких поставщиков и моделей ИИ.
- Создавайте специальные инструменты ИИ для конкретных задач
- Управление историей чата для сохранения контекста.
- Статистика использования токенов и истории запросов.
- Возможности зрения для анализа изображений.

## Поддерживаемые поставщики
- **Антропный**: [anthropic.com](https://anthropic.com)
- **OpenAI**: [openai.com](https://openai.com)
- **Недоумение**: [perplexity.ai](https://perplexity.ai)
- **OpenRouter**: [openrouter.ai](https://openrouter.ai) (Бесплатные модели использования для новичков)
- **Deepseek**: [deepseek.com](http://deepseek.com/)
- **Пользовательские/самостоятельно размещенные модели** (например, LM Studio, LocalAI)

---

## Быстрый старт
1. Установите адаптер.
2. Создайте учетную запись и получите API-токен от openrouter.ai
3. Настройте адаптер с помощью API-токена.
4. Примеры инструментов, созданные при установке, используют бесплатную модель meta-llama/llama-3.2-3b-instruct:free для OpenRouter.
5. Отправьте сообщение инструменту с точкой данных .text_request и проверьте .text_response на наличие ответа.

Обратите внимание, что бесплатные модели иногда требуют длительного времени ожидания первого ответа, могут быть перегружены или иметь другие ограничения. Модели также различаются по качеству и возможностям, убедитесь, что выбрали правильную модель для вашего варианта использования.

**Даже если этот файл Readme написан на английском языке, большинство моделей многоязычны. Просто попробуйте написать свои инструменты на родном языке, чтобы получить желаемый результат!**

---

## Конфигурация
### Инструменты
Определите индивидуальные инструменты ИИ, адаптированные под конкретные задачи:

| **Настройка** | **Описание** |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| **Имя** | Название инструмента. |
| **Модель** | Выберите модель LLM (настраивается в разделе «Поставщики»). |
| **Системная подсказка** | Предоставьте подробную информацию, описывающую инструмент. |
| **Пример запроса** | (Необязательно) Пример запроса. |
| **Пример ответа** | (Требуется, если предоставлен пример запроса) Идеальный ответ. |
| **История сообщений** | Включить предыдущие сообщения (для поведения, подобного чат-боту). Установите значение 0 для одноразовых инструментов, чтобы минимизировать использование токенов. |
| **Температура** | Контролирует креативность/последовательность ответа. |
| **Макс. токены** | Ограничивает количество токенов ответа. |
| **Задержка повтора** | Задержка между повторными попытками, если запрос не выполнен |
| **Максимальное количество повторов** | Максимальное количество повторов на запрос. |
| **Включить запросы Vision/Image** | Включить ввод Vision/Image. |
| **Включить запросы на зрение в историю чата** | Включить данные о зрении/изображении в историю чата |

---

### Поставщики LLM
Настройте каждого поставщика ИИ индивидуально:

#### Антропный
| **Настройка** | **Описание** |
|-----------------|----------------------------------------------|
| **API-токен** | Введите свой Anthropic API-токен. |
| **Модели** | Укажите модели для использования. |

#### Открытый ИИ
| **Настройка** | **Описание** |
|-----------------|----------------------------------------------|
| **API-токен** | Введите свой API-токен OpenAI. |
| **Модели** | Укажите модели для использования. |

#### Недоумение
| **Настройка** | **Описание** |
|-----------------|----------------------------------------------|
| **API-токен** | Введите свой API-токен Perplexity. |
| **Модели** | Укажите модели для использования. |

#### Открытый маршрутизатор
| **Настройка** | **Описание** |
|-----------------|----------------------------------------------|
| **API-токен** | Введите свой API-токен OpenRouter. |
| **Модели** | Укажите модели для использования. |

#### Глубокий поиск
| **Настройка** | **Описание** |
|-----------------|----------------------------------------------|
| **API-токен** | Введите свой API-токен Deepseek. |
| **Модели** | Укажите модели для использования. |

#### Обычай
| **Настройка** | **Описание** |
|------------------------------------|----------------------------------------------------------------------------------|
| **URL-адрес сервера вывода** | URL-адрес настраиваемого/размещенного самостоятельно сервера вывода. |
| **API-токен для сервера вывода** | API-токен для вашего сервера вывода. |
| **Модели** | Укажите модели для использования. |
| **Примечание** | Обеспечьте соответствие общим стандартам AI LLM API (например, LM Studio API). |

---

## Использование ваших инструментов
### Взаимодействие объектов
Каждый инструмент отображается в дереве объектов ioBroker. Используйте `Tools.$YourToolName.text_request` для отправки запросов и `Tools.$YourToolName.text_response` для получения ответов.

#### Запросы на визуализацию/изображение
Если вы включили запросы на зрение/изображения, вы можете использовать `Tools.$YourToolName.image_url`, чтобы задать URL-адрес изображения или локальный путь к файлу для анализа инструментом. Изображение будет включено в запрос, когда вы установите состояние точки данных `Tools.$YourToolName.text_request`.

Примечание: Вы можете использовать локальный URL-адрес (например, в вашей локальной сети http://192.168.178.1/image.jpg) или путь к файлу (где ioBroker имеет разрешение на чтение файлов, например, /opt/iobroker/iobroker-data/telegram_0/photo/image.jpg). Адаптер преобразует изображение в строку base64 и включает его в запрос.

## Интеграция скрипта (`sendTo`)
Вы можете взаимодействовать программно, используя функцию `sendTo`:

#### Текстовые запросы
```javascript
sendTo('ai-toolbox.0', 'tool_request', {
    'tool': 'YOUR-TOOL-NAME',
    'text': 'The message for the tool to respond to',
}, async (result) => {
    console.info(result); // Outputs the tool's response as text string
});
```

#### Запросы изображений/визуализации с URL-адресом
```javascript
sendTo('ai-toolbox.0', 'tool_request', {
    'tool': 'YOUR-TOOL-NAME',
    'text': 'The message for the tool to respond to',
    'image_url': 'https://url-of-the-image-to-analyze.com/image.jpg',
}, async (result) => {
    console.info(result); // Outputs the tool's response as text string
});
```

#### Запросы Vision/Image с локальным файлом
```javascript
sendTo('ai-toolbox.0', 'tool_request', {
    'tool': 'YOUR-TOOL-NAME',
    'text': 'The message for the tool to respond to',
    'image_url': '/opt/iobroker/iobroker-data/telegram_0/photo/image.jpg',
}, async (result) => {
    console.info(result); // Outputs the tool's response as text string
});
```

### Использование моделей без инструментов
### Взаимодействие объектов
Каждая определенная модель также отображается в дереве объектов ioBroker. Используйте `Models.$ModelName.text_request` для отправки запросов и `Models.$ModelName.text_response` для получения ответов. С помощью интеграции скриптов вы можете создавать еще более креативные интеграции, например, вы можете создать динамическую системную подсказку.

## Интеграция скрипта (`sendTo`)
Вы можете взаимодействовать программно, используя функцию `sendTo`:

#### Текстовые запросы
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

#### Запросы изображений/визуализации с URL-адресом
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

#### Запросы Vision/Image с локальным файлом
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

## Дополнительная информация
### Статистика
Статистика создается для созданных вами инструментов, а также для моделей, чтобы вы могли отслеживать использование токенов и другие данные.

| **Точка данных** | **Описание** |
|-----------------------------|-----------------------------------------------------------------------------|
| **.statistics.lastRequest** | Временная метка последнего запроса. |

| **.statistics.messages*** | JSON-массив истории сообщений (если история сообщений > 0).
| **.statistics.clear_messages***| Кнопка очистки истории сообщений.

| **.statistics.tokens_input**| Общее количество использованных входных токенов. |
| **.statistics.tokens_output**| Общее количество использованных выходных токенов. |

 `* only available for tools, models don't have a message history`

### Запрос
| **Точка данных** | **Описание** |
|---------------------|-----------------------------------------------|
| **.request.body** | Тело запроса отправлено в API. |
| **.request.state** | Текущее состояние запроса. (старт, успех, повтор, ошибка, неудача) |

### Ответ
| **Точка данных** | **Описание** |
|--------------------|--------------------------------------------------|
| **.request.error** | Заполняется, если произошла ошибка. |
| **.request.raw** | Необработанный ответ JSON от модели. |

---

## Примеры
В следующих примерах показано, как настроить и использовать индивидуальные инструменты ИИ в адаптере ioBroker AI Toolbox. Эти примеры показывают, как адаптер может использовать данные для предоставления интеллектуальных ответов и рекомендаций.

---

### Пример 1: Простой чат-бот
**Описание:** Базовый чат-бот, который отвечает на сообщения пользователя в разговорной и дружелюбной манере. Его можно использовать для неформального общения в чате.

- **Имя:** `simple-chatbot`

- **Системное сообщение:**

`"You are a friendly and conversational chatbot. Respond to user messages in an engaging and cheerful way. Keep your answers brief and focus on maintaining a pleasant tone."`

- **Пример запроса:**

`"Hi there! How are you today?"`

- **Пример ответа:**

`"I'm doing great, thanks for asking! How about you?"`

- **История сообщений:** `10` (позволяет чат-боту запоминать контекст разговора до 10 обменов для более естественного течения.)

- **Температура:** `0,8` (Поощряет креативность, сохраняя при этом релевантность и дружелюбность ответов.)

----------

### Примеры запросов и ответов
| **Запрос** | **Ответ** |
|--------------------|--------------------------------------------------|
| `What's your favorite color?` | `I love blue! It reminds me of the sky.` |
| `Tell me something interesting.` | `Did you know that octopuses have three hearts? Cool, right?` |
| `Расскажи мне что-нибудь интересное.` | `А ты знал, что у осьминогов три сердца? Круто, да?` |

----------

### Пример интеграции скрипта
Чтобы использовать этот инструмент программно в ioBroker, вы можете интегрировать его через функцию `sendTo`:

```javascript
sendTo('ai-toolbox.0', 'tool_request', {
  tool: 'simple-chatbot',
  text: 'Hi, chatbot! How’s it going?',
}, async (result) => {
  console.info(result); // Outputs the chatbot's response
});

```

### Пример 2: Зрение/Анализатор изображений
**Описание:** Мультимодальный инструмент, который анализирует изображения и предоставляет подробные описания или идеи на основе визуального контента. Инструмент может идентифицировать объекты, сцены и другие визуальные элементы на изображении.

- **Имя:** `зрительный-анализатор`

- **Системное сообщение:**

`"You are a vision assistant. Analyze the provided image and generate a detailed description or insights based on the visual content. Your responses should be informative and engaging, focusing on key elements and context in the image."`

- **Пример запроса:**

`"What do you see in this image?"`

- **Пример ответа:**

`"This image shows a tall, columnar evergreen tree growing in a black nursery pot or container. It appears to be a cypress or juniper variety, with dense, dark green foliage that grows in a narrow, upright pyramidal shape. These types of trees are popular for landscaping, especially in formal gardens or as accent plants, and they can also be used to create natural privacy screens when planted in rows."`

- **История сообщений:** `6` (Сохраняет контекст для связанных вопросов анализа изображений.)

- **Температура:** `0,6` (Балансирует креативность и релевантность для разнообразных ответов.)

- **Включить запросы Vision/Image** `true` (Позволяет инструменту принимать URL-адреса изображений для анализа.)

- **Включать запросы Vision в историю чата** `true` (Включает URL-адреса изображений в историю чата для сохранения контекста.)

----------

### Пример интеграции скрипта
Чтобы использовать этот инструмент программно в ioBroker, вы можете интегрировать его через функцию `sendTo`:

```javascript
sendTo('ai-toolbox.0', 'tool_request', {
  tool: 'vision-analyzer',
  text: 'What do you see in this image?',
  image_url: 'https://url-of-the-image-to-analyze.com/image.jpg'
}, async (result) => {
  console.info(result); // Outputs the chatbot's response
});

```

### Пример 3: Пользовательский прогноз погоды
**Описание:** Чат-бот, который генерирует персонализированные прогнозы погоды на основе предоставленных входных данных, таких как местоположение, температура и погодные условия. Ответы увлекательны и адаптированы для пользователя.

- **Имя:** `погодный-репортер`

- **Системное сообщение:**

`"You are a weather reporter chatbot. Based on the input data, generate a detailed and engaging weather report. Your response should include a friendly greeting, a brief overview of the current conditions, and a suggestion for the day. Keep your tone cheerful and informative."`

- **Пример запроса:**

`"Current datetime 12/7/2024, 12:00:01 PM. Weatherdata: Temperature 7°C, Humidity 87%, Cloudcover 93%, Airpressure 997mbar, Wind 23kmh, Rain 0mm."`

- **Пример ответа:**

`Hello there! 🌤️ Happy December 7th! As we step into the afternoon, the weather is quite cool at a temperature of 7°C. With a humidity level of 87%, it feels a bit damp out there, so don’t forget to grab your favorite cozy sweater if you’re heading outside! Cloud cover is fairly high today, sitting at 93%, which gives the sky a soft, overcast appearance. The air pressure is at 997 mbar, and while there’s a moderate wind blowing at 23 km/h, it might feel a tad brisk, so a light jacket would be a good call. The good news is that we haven’t seen any rain today, so if you’re planning to venture out, it’s a great time for a stroll or perhaps a warm drink at your favorite café! Stay warm and enjoy your day! ☕🌧️`

- **История сообщений:** `5` (позволяет кратковременно сохранять контекст для связанных последующих вопросов.)

- **Температура:** `0,7` (Обеспечивает сочетание креативности и релевантности для разнообразных отчетов.)

----------

### Пример интеграции скрипта
Чтобы использовать этот инструмент программно в ioBroker, вы можете интегрировать его через функцию `sendTo`:

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

### Пример 4: Помощник по подбору музыки
**Описание:** Рекомендует музыкальные плейлисты на основе текущей погоды и времени суток. Можно использовать с умной колонкой, например Alexa или Google Home.

- **Имя:** `музыкальный-рекомендатор`
- **Системное сообщение:**

`"You are a music assistant. Based on the current weather and time of day, suggest a playlist or genre that matches the mood. Use concise and creative recommendations. You answer only with your suggestion and nothing else."`

- **Пример запроса:**

`"Current Time 24th December 2024 17:30. Outside Temperature: 10°C."`

- **Пример ответа:**

`"Christmas Music"`

- **История сообщений:** `7` (Мы используем значение 7, поскольку собираемся запускать этот пример инструмента один раз в день и не хотим, чтобы он повторял свои ответы. С этой настройкой он увидит, что он предложил в последних 7 ответах на наши запросы.)
- **Температура:** `0.7` (Баланс креативности и актуальности)

**Примеры запроса и ответа для этого инструмента могут выглядеть следующим образом:**

| **Запрос** | **Ответ** |
|--------------------|--------------------------------------------------|
| `Current time 3rd June 2024 16:00. Outside Temperature: 31°C` | `Latin Summer Music` |
| `Current time 11th November 2024 12:00. Outside Temperature: 15°C` | `Acoustic Guitar Music` |
| `Текущее время 11 ноября 2024 12:00. Температура наружного воздуха: 15°C` | `Акустическая гитарная музыка` |

---

### Пример 5: Рекомендации по настройкам освещения
**Описание:** Рекомендует настройки RGB-освещения на основе настроения и жанра воспроизводимой в данный момент музыки. Инструмент анализирует характеристики музыки (например, темп, настроение) и предлагает подходящие цвета освещения для пяти источников RGB. Выводит JSON с шестнадцатеричными значениями RGB для каждого источника света.

- **Имя:** `светорежиссер`

- **Системное сообщение:**

`"You are a smart home assistant. Based on the characteristics of the currently playing music, recommend RGB hex color values for five different lights to create an immersive atmosphere. Respond only with a JSON object containing the RGB hex values for each light."`

- **Пример запроса:**

```
Faithless - Insomnia
```

- **Пример ответа:**

```json
{
  "light1": "#FF4500",
  "light2": "#FFA500",
  "light3": "#FFFF00",
  "light4": "#ADFF2F",
  "light5": "#00FF00"
}
```

- **История сообщений:** `0` (Одноразовый инструмент для минимизации использования токенов.)

- **Температура:** `0,6` (Балансирует креативность и последовательность.)

---

### Примеры запросов и ответов
| **Запрос** | **Ответ** |
|-------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `The Beatles - Here Comes The Sun` | `{ "light1": "#FFD700", "light2": "#FFA500", "light3": "#FF8C00", "light4": "#FF4500", "light5": "#FF0000" }` |
| `Mozart - Eine kleine Nachtmusik` | `{ "light1": "#FFD700", "light2": "#FFA500", "light3": "#FF8C00", "light4": "#FF4500", "light5": "#FF0000" }` |
| `Моцарт - Eine kleine Nachtmusik` | `{ "light1": "#FFD700", "light2": "#FFA500", "light3": "#FF8C00", "light4": "#FF4500", "light5": "#FF0000" }` |

---

### Пример интеграции скрипта
Чтобы использовать этот инструмент программно в ioBroker, вы можете интегрировать его через функцию `sendTo`:

```javascript
sendTo('ai-toolbox.0', 'tool_request', {
  tool: 'light-setter',
  text: 'Faithless - Insomnia',
}, async (result) => {
  console.info(result); // Outputs the recommended RGB hex values for the lights
});
```

---

## Лучшие практики: максимальное использование потенциала ваших инструментов ИИ
Чтобы вы могли максимально эффективно использовать адаптер ioBroker AI Toolbox и его инструменты, вот несколько рекомендаций, советов и рекомендаций:

#### **1. Поймите ключевые концепции**
- **Системное сообщение**:

Системная подсказка определяет поведение и стиль вашего инструмента ИИ. Думайте о ней как о «личности» или «руководящих принципах» для инструмента. Например, системная подсказка для погодного бота может быть: `"You are a cheerful weather assistant. Provide detailed weather forecasts in a friendly tone."`

- **Температура**:

Эта настройка регулирует, насколько «креативными» являются ответы. Более низкие значения (например, 0,2) делают инструмент более фактическим и детерминированным, в то время как более высокие значения (например, 0,8) допускают более разнообразные и креативные результаты.

- **Максимальное количество токенов**:

Управляет длиной ответов. Установите ее на высокий уровень для подробных ответов и на низкий уровень для кратких выводов.

- **История сообщений**:

Это позволяет инструментам сохранять контекст для непрерывности разговора. Используйте большее значение (например, 10) для чат-ботов и меньшее значение (например, 0) для одноразовых ответов, чтобы сэкономить токены.

----------

#### **2. Создавайте понятные и конкретные инструменты**
- Используйте **конкретные системные подсказки**, адаптированные к цели инструмента. Хорошо продуманная системная подсказка обеспечивает целенаправленные и релевантные результаты.
- Предоставьте **примеры запросов и ответов**, чтобы установить четкие ожидания для модели. Это помогает в последовательном поведении и лучшем понимании.

----------

#### **3. Продуманно настраивайте поставщиков ИИ**
Каждый поставщик предлагает уникальные преимущества. Выберите модель, которая соответствует вашему варианту использования, и поэкспериментируйте с различными вариантами, чтобы найти оптимальный вариант.

----------

#### **4. Баланс производительности и стоимости**
- Начните с **бесплатных моделей**, таких как `meta-llama` через OpenRouter, чтобы протестировать идеи, прежде чем переходить к более мощным платным вариантам.
- Используйте **статистику токенов** (доступную в `.statistics.tokens_input` и `.statistics.tokens_output`) для мониторинга использования и оптимизации конфигураций инструментов.

----------

#### **5. Используйте динамические и повторно используемые компоненты**
- **Динамические системные подсказки**: адаптируйте подсказки на основе данных в реальном времени. Например, извлекайте данные о погоде в реальном времени, чтобы создавать персонализированные прогнозы.

```javascript
sendTo('ai-toolbox.0', 'model_request', {
    model: 'MODEL-NAME',
    system_prompt: 'Current weather in {location} is {temperature}°C. Advise suitable outdoor activities.',
    text: 'What should I do today?',
}, (result) => console.info(result.text));

```

- **Интеграция скриптов**: используйте JavaScript для динамической настройки таких параметров, как температура или системные подсказки, на основе внешних входных данных.

----------

#### **6. Тестируйте, настраивайте и развивайте**
- Используйте журналы отладки для выявления проблем в работе инструмента.

Установите уровень журнала на `debug` в интерфейсе администратора ioBroker.

- Поэкспериментируйте с **различными системными подсказками, настройками температуры и ограничениями токенов**, чтобы оптимизировать поведение.

----------

#### **7. Создавайте модульные решения**
- Разделите сложные задачи на более мелкие, повторно используемые инструменты. Например, используйте один инструмент для анализа данных, а другой для создания отчетов. Объедините их в своих скриптах для мощных рабочих процессов.

----------

#### **8. Управление историей сообщений**
- Для инструментов на основе чата поддерживайте управляемую длину истории, чтобы предоставлять контекст без чрезмерного использования токенов.

----------

#### **9. Используйте выходные данные JSON для автоматизации**
Для инструментов, интегрированных в умные дома или скрипты, настройте формат ответа в JSON, предоставив пример ответа в том формате, который вы хотели бы получить.

----------

Эти передовые методы в сочетании с экспериментами и итеративным совершенствованием гарантируют, что ваши инструменты ИИ будут давать значимые и надежные результаты, адаптированные к среде вашего умного дома.

## Разработка
### Отладка
Установите уровень журнала на `debug` в интерфейсе администратора ioBroker для получения подробных журналов.

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