---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ai-toolbox/README.md
title: ioBroker.ai-toolbox
hash: OexmI9Ufijx9oNRIpRepIEwJCrSbdvt/nd8vhLnJP10=
---
![Логотип](../../../en/adapterref/iobroker.ai-toolbox/admin/ai-toolbox.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.ai-toolbox.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ai-toolbox.svg)
![Количество установок](https://iobroker.live/badges/ai-toolbox-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/ai-toolbox-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.ai-toolbox.png?downloads=true)
![Тестирование и выпуск](https://github.com/ToGe3688/ioBroker.ai-toolbox/workflows/Test%20and%20Release/badge.svg)

# ioBroker.ai-toolbox

## Обзор

Адаптер ioBroker AI Toolbox интегрирует настраиваемые инструменты искусственного интеллекта в ваш умный дом. Он поддерживает несколько поставщиков больших языковых моделей (LLM) и предоставляет гибкую основу для автоматизации и взаимодействия. Объединяя данные с устройств умного дома с возможностями ИИ, адаптер ioBroker AI Toolbox может создавать высоко персонализированные и полезные инструменты для задач автоматизации вашего дома и взаимодействия с моделями LLM.

## Функции

- Поддержка множества поставщиков и моделей искусственного интеллекта.
- Создавайте собственные инструменты искусственного интеллекта для решения конкретных задач.
- Управление историей чата для сохранения контекста.
- Статистика использования токенов и истории запросов.
- Возможности машинного зрения для анализа изображений.

## Поддерживаемые поставщики

- **Anthropic** : [anthropic.com](https://anthropic.com)
- **OpenAI** : [openai.com](https://openai.com)
- **Perplexity** : [perplexity.ai](https://perplexity.ai)
- **OpenRouter** : [openrouter.ai](https://openrouter.ai) (Бесплатная модель использования для начинающих)
- **Deepseek** : [deepseek.com](http://deepseek.com/)
- **Пользовательские/самостоятельно размещаемые модели** (например, LM Studio, LocalAI)

---

## Быстрый старт

1. Установите адаптер.
2. Создайте учетную запись и получите API-токен на openrouter.ai.
3. Настройте адаптер с использованием токена API.
4. В примерах инструментов, созданных при установке, используется бесплатная модель meta-llama/llama-3.2-3b-instruct:free для OpenRouter.
5. Отправьте в инструмент сообщение с точкой данных .text\_request и проверьте .text\_response на наличие ответа.

Обратите внимание, что бесплатные модели иногда имеют длительное время ожидания первого ответа, могут быть перегружены или иметь другие ограничения. Кроме того, модели различаются по качеству и возможностям, поэтому убедитесь, что вы выбрали подходящую модель для ваших задач.

**Даже если этот файл Readme написан на английском языке, большинство моделей многоязычны, просто попробуйте написать свои инструменты на родном языке, чтобы получить желаемый результат!**

---

## Конфигурация

### Инструменты

Разрабатывайте пользовательские инструменты искусственного интеллекта, адаптированные для решения конкретных задач:

| **Параметр**                                          | **Описание**                                                                                                                                                          |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Имя**                                               | Название инструмента.                                                                                                                                                 |
| **Модель**                                            | Выберите модель LLM (настраивается в разделе «Поставщики»).                                                                                                           |
| **Системная подсказка**                               | Предоставьте подробное описание инструмента.                                                                                                                          |
| **Пример запроса**                                    | (Необязательно) Пример запроса.                                                                                                                                       |
| **Пример ответа**                                     | (Обязательно, если предоставлен пример запроса) Идеальный ответ.                                                                                                      |
| **История сообщений**                                 | Включать предыдущие сообщения (для работы в режиме чат-бота). Установите значение 0 для инструментов одноразового использования, чтобы минимизировать расход токенов. |
| **Температура**                                       | Контролирует креативность/последовательность ответов.                                                                                                                 |
| **Макс. токенов**                                     | Ограничивает количество токенов ответа.                                                                                                                               |
| **Задержка повторной попытки**                        | Задержка между повторными попытками, если запрос не удался.                                                                                                           |
| **Максимальное количество повторных попыток**         | Максимальное количество повторных попыток на один запрос.                                                                                                             |
| **Включить запросы на просмотр/изображение**          | Включить ввод изображений.                                                                                                                                            |
| **Включайте запросы на визуализацию в историю чата.** | Включать данные о зрении/изображении в историю чата                                                                                                                   |

---

### Поставщики программ магистратуры в области права

Настройте каждого поставщика ИИ индивидуально:

#### Антропический

| **Параметр**  | **Описание**                                  |
| ------------- | --------------------------------------------- |
| **API-токен** | Введите свой токен Anthropic API.             |
| **Модели**    | Укажите модели, которые следует использовать. |

#### OpenAI

| **Параметр**  | **Описание**                                  |
| ------------- | --------------------------------------------- |
| **API-токен** | Введите свой API-токен OpenAI.                |
| **Модели**    | Укажите модели, которые следует использовать. |

#### Замешательство

| **Параметр**  | **Описание**                                  |
| ------------- | --------------------------------------------- |
| **API-токен** | Введите свой API-токен Perplexity.            |
| **Модели**    | Укажите модели, которые следует использовать. |

#### OpenRouter

| **Параметр**  | **Описание**                                  |
| ------------- | --------------------------------------------- |
| **API-токен** | Введите свой API-токен OpenRouter.            |
| **Модели**    | Укажите модели, которые следует использовать. |

#### Глубокий поиск

| **Параметр**  | **Описание**                                  |
| ------------- | --------------------------------------------- |
| **API-токен** | Введите свой API-токен Deepseek.              |
| **Модели**    | Укажите модели, которые следует использовать. |

#### Обычай

| **Параметр**                     | **Описание**                                                                   |
| -------------------------------- | ------------------------------------------------------------------------------ |
| **URL сервера вывода**           | URL пользовательского/самостоятельно размещенного сервера вывода результатов.  |
| **API-токен для сервера вывода** | API-токен для вашего сервера вывода.                                           |
| **Модели**                       | Укажите модели, которые следует использовать.                                  |
| **Примечание**                   | Обеспечьте соответствие общим стандартам API AI LLM (например, API LM Studio). |

---

## Использование ваших инструментов

### Взаимодействие объектов

Каждый инструмент отображается в дереве объектов ioBroker. Используйте`Tools.$YourToolName.text_request` отправлять запросы и`Tools.$YourToolName.text_response` для получения ответов.

#### Запросы на видео/изображения

Если у вас включены запросы на просмотр/изображение, вы можете использовать`Tools.$YourToolName.image_url` Укажите URL-адрес изображения или путь к локальному файлу для анализа инструментом. Изображение будет включено в запрос при установке состояния.`Tools.$YourToolName.text_request` точка данных.

Примечание: Вы можете использовать локальный URL (например, в вашей локальной сети <http://192.168.178.1/image.jpg> ) или путь к файлу (где у ioBroker есть разрешение на чтение файлов, например, /opt/iobroker/iobroker-data/telegram\_0/photo/image.jpg). Адаптер преобразует изображение в строку base64 и включает её в запрос.

## Интеграция скриптов (`sendTo` )

Вы можете взаимодействовать программно, используя`sendTo` функция:

#### Текстовые запросы

```javascript
sendTo('ai-toolbox.0', 'tool_request', {
    'tool': 'YOUR-TOOL-NAME',
    'text': 'The message for the tool to respond to',
}, async (result) => {
    console.info(result); // Outputs the tool's response as text string
});
```

#### Запросы изображений/визуальных файлов с указанием URL-адреса

```javascript
sendTo('ai-toolbox.0', 'tool_request', {
    'tool': 'YOUR-TOOL-NAME',
    'text': 'The message for the tool to respond to',
    'image_url': 'https://url-of-the-image-to-analyze.com/image.jpg',
}, async (result) => {
    console.info(result); // Outputs the tool's response as text string
});
```

#### Запросы изображений/визуальных данных с использованием локального файла

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

Каждая определенная модель также отображается в дереве объектов ioBroker. Используйте`Models.$ModelName.text_request` отправлять запросы и`Models.$ModelName.text_response` для получения ответов. Благодаря интеграции скриптов вы можете создавать еще более креативные интеграции, например, вы можете создать динамическую системную подсказку.

## Интеграция скриптов (`sendTo` )

Вы можете взаимодействовать программно, используя`sendTo` функция:

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

#### Запросы изображений/визуальных файлов с указанием URL-адреса

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

#### Запросы изображений/визуальных данных с использованием локального файла

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

Для созданных вами инструментов и моделей создается статистика, позволяющая отслеживать использование токенов и другие данные.

| **Точка данных**                   | **Описание**                                                |
| ---------------------------------- | ----------------------------------------------------------- |
| **.statistics.lastRequest**        | Отметка времени последнего запроса.                         |
| **.statistics.messages** \*        | JSON-массив истории сообщений (если история сообщений > 0). |
| **.statistics.clear\_messages** \* | Кнопка «Очистить историю сообщений».                        |
| **.statistics.tokens\_input**      | Всего использовано входных токенов.                         |
| **.statistics.tokens\_output**     | Общее количество использованных выходных токенов.           |

`* only available for tools, models don't have a message history`

### Запрос

| **Точка данных**   | **Описание**                                                                |
| ------------------ | --------------------------------------------------------------------------- |
| **.request.body**  | Тело запроса отправляется в API.                                            |
| **.request.state** | Текущее состояние запроса. (начало, успех, повторная попытка, ошибка, сбой) |

### Ответ

| **Точка данных**   | **Описание**                               |
| ------------------ | ------------------------------------------ |
| **.request.error** | Заполняется в случае возникновения ошибки. |
| **.request.raw**   | Исходный JSON-ответ от модели.             |

---

## Примеры

Приведенные ниже примеры демонстрируют, как настраивать и использовать пользовательские инструменты искусственного интеллекта в адаптере ioBroker AI Toolbox. Эти примеры показывают, как адаптер может использовать данные для предоставления интеллектуальных ответов и рекомендаций.

---

### Пример 1: Простой чат-бот

**Описание:** Простой чат-бот, который отвечает на сообщения пользователей в непринужденной и дружелюбной манере. Подходит для неформального общения.

- **Имя:**`simple-chatbot`

- **Системная подсказка:**\
  `"You are a friendly and conversational chatbot. Respond to user messages in an engaging and cheerful way. Keep your answers brief and focus on maintaining a pleasant tone."`

- **Пример запроса:**\
  `"Hi there! How are you today?"`

- **Пример ответа:**\
  `"I'm doing great, thanks for asking! How about you?"`

- **История сообщений:**`10` (Позволяет чат-боту запоминать контекст разговора до 10 раз для более естественного хода беседы.)

- **Температура:**`0.8` (Это поощряет творчество, сохраняя при этом уместность и дружелюбие в ответах.)

---

### Примеры запросов и ответов

| **Запрос**                       | **Ответ**                                                         |
| -------------------------------- | ----------------------------------------------------------------- |
| `What's your favorite color?`    | `I love blue! It reminds me of the sky.`                          |
| `Do you know any jokes?`         | `Why don’t skeletons fight each other? They don’t have the guts!` |
| `Tell me something interesting.` | `Did you know that octopuses have three hearts? Cool, right?`     |

---

### Пример интеграции скрипта

Для программного использования этого инструмента в ioBroker вы можете интегрировать его через...`sendTo` функция:

```javascript
sendTo('ai-toolbox.0', 'tool_request', {
  tool: 'simple-chatbot',
  text: 'Hi, chatbot! How’s it going?',
}, async (result) => {
  console.info(result); // Outputs the chatbot's response
});

```

### Пример 2: Компьютерный анализатор / Анализатор изображений

**Описание:** Мультимодальный инструмент, анализирующий изображения и предоставляющий подробные описания или выводы на основе визуального контента. Инструмент может идентифицировать объекты, сцены и другие визуальные элементы на изображении.

- **Имя:**`vision-analyzer`

- **Системная подсказка:**\
  `"You are a vision assistant. Analyze the provided image and generate a detailed description or insights based on the visual content. Your responses should be informative and engaging, focusing on key elements and context in the image."`

- **Пример запроса:**\
  `"What do you see in this image?"`

- **Пример ответа:**\
  `"This image shows a tall, columnar evergreen tree growing in a black nursery pot or container. It appears to be a cypress or juniper variety, with dense, dark green foliage that grows in a narrow, upright pyramidal shape. These types of trees are popular for landscaping, especially in formal gardens or as accent plants, and they can also be used to create natural privacy screens when planted in rows."`

- **История сообщений:**`6` (Сохраняет контекст для связанных вопросов анализа изображений.)

- **Температура:**`0.6` (Обеспечивает баланс между креативностью и актуальностью для разнообразных ответов.)

- **Включить запросы на просмотр/изображение**`true` (Включает возможность приема URL-адресов изображений для анализа.)

- **Включайте запросы на визуализацию в историю чата.**`true` (Включает URL-адреса изображений в историю чата для сохранения контекста.)

---

### Пример интеграции скрипта

Для программного использования этого инструмента в ioBroker вы можете интегрировать его через...`sendTo` функция:

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

**Описание:** Чат-бот, генерирующий персонализированные прогнозы погоды на основе предоставленных входных данных, таких как местоположение, температура и погодные условия. Ответы являются интерактивными и адаптированы под пользователя.

- **Имя:**`weather-reporter`

- **Системная подсказка:**\
  `"You are a weather reporter chatbot. Based on the input data, generate a detailed and engaging weather report. Your response should include a friendly greeting, a brief overview of the current conditions, and a suggestion for the day. Keep your tone cheerful and informative."`

- **Пример запроса:**\
  `"Current datetime 12/7/2024, 12:00:01 PM. Weatherdata: Temperature 7°C, Humidity 87%, Cloudcover 93%, Airpressure 997mbar, Wind 23kmh, Rain 0mm."`

- **Пример ответа:**\
  `Hello there! 🌤️ Happy December 7th! As we step into the afternoon, the weather is quite cool at a temperature of 7°C. With a humidity level of 87%, it feels a bit damp out there, so don’t forget to grab your favorite cozy sweater if you’re heading outside! Cloud cover is fairly high today, sitting at 93%, which gives the sky a soft, overcast appearance. The air pressure is at 997 mbar, and while there’s a moderate wind blowing at 23 km/h, it might feel a tad brisk, so a light jacket would be a good call. The good news is that we haven’t seen any rain today, so if you’re planning to venture out, it’s a great time for a stroll or perhaps a warm drink at your favorite café! Stay warm and enjoy your day! ☕🌧️`

- **История сообщений:**`5` (Позволяет кратковременно сохранять контекст для последующих вопросов.)

- **Температура:**`0.7` (Обеспечивает сочетание креативности и актуальности для разнообразных отчетов.)

---

### Пример интеграции скрипта

Для программного использования этого инструмента в ioBroker вы можете интегрировать его через...`sendTo` функция:

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

**Описание:** Рекомендует музыкальные плейлисты на основе текущей погоды и времени суток. Может использоваться с умными колонками, такими как Alexa или Google Home.

- **Имя:**`music-recommender`
- **Системная подсказка:**\
  `"You are a music assistant. Based on the current weather and time of day, suggest a playlist or genre that matches the mood. Use concise and creative recommendations. You answer only with your suggestion and nothing else."`
- **Пример запроса:**\
  `"Current Time 24th December 2024 17:30. Outside Temperature: 10°C."`
- **Пример ответа:**\
  `"Christmas Music"`
- **История сообщений:**`7` (Мы используем значение 7, потому что собираемся запускать этот примерный инструмент один раз в день и не хотим, чтобы он повторял свои ответы. При такой настройке он будет видеть, что предлагалось в последних 7 ответах на наши запросы.)
- **Температура:**`0.7` (Соблюдение баланса между креативностью и актуальностью)

**Пример запроса и ответа для этого инструмента может выглядеть следующим образом:**

| **Запрос**                                                         | **Ответ**               |
| ------------------------------------------------------------------ | ----------------------- |
| `Current time 3rd June 2024 16:00. Outside Temperature: 31°C`      | `Latin Summer Music`    |
| `Current time 4th February 2024 20:00. Outside Temperature: 5°C`   | `Jazz Music`            |
| `Current time 11th November 2024 12:00. Outside Temperature: 15°C` | `Acoustic Guitar Music` |

---

### Пример 5: Рекомендации по настройкам освещения

**Описание:** Рекомендует настройки RGB-подсветки в зависимости от настроения и жанра воспроизводимой музыки. Инструмент анализирует характеристики музыки (например, темп, настроение) и предлагает подходящие цвета подсветки для пяти RGB-светильников. Выводит JSON с шестнадцатеричными значениями RGB для каждого светильника.

- **Имя:**`light-setter`

- **Системная подсказка:**

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

- **История сообщений:**`0` (Инструмент одноразового использования для минимизации расхода токенов.)

- **Температура:**`0.6` (Обеспечивает баланс между креативностью и последовательностью.)

---

### Примеры запросов и ответов

| **Запрос**                         | **Ответ**                                                                                                     |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `The Beatles - Here Comes The Sun` | `{ "light1": "#FFD700", "light2": "#FFA500", "light3": "#FF8C00", "light4": "#FF4500", "light5": "#FF0000" }` |
| `Beethoven - Symphony No. 9`       | `{ "light1": "#FF0000", "light2": "#FF4500", "light3": "#FFA500", "light4": "#FFD700", "light5": "#FFFF00" }` |
| `Mozart - Eine kleine Nachtmusik`  | `{ "light1": "#FFD700", "light2": "#FFA500", "light3": "#FF8C00", "light4": "#FF4500", "light5": "#FF0000" }` |

---

### Пример интеграции скрипта

Для программного использования этого инструмента в ioBroker вы можете интегрировать его через...`sendTo` функция:

```javascript
sendTo('ai-toolbox.0', 'tool_request', {
  tool: 'light-setter',
  text: 'Faithless - Insomnia',
}, async (result) => {
  console.info(result); // Outputs the recommended RGB hex values for the lights
});
```

---

## Рекомендации: Максимальное использование потенциала ваших инструментов искусственного интеллекта

Чтобы максимально эффективно использовать адаптер ioBroker AI Toolbox и его инструменты, вот несколько рекомендаций, советов и приемов:

#### **1. Понимание ключевых понятий**

- **Системная подсказка** :\
  &#x20;Системная подсказка определяет поведение и стиль вашего инструмента искусственного интеллекта. Рассматривайте её как «характер» или «руководящие принципы» для инструмента. Например, системная подсказка для бота прогноза погоды может выглядеть так:\
  `"You are a cheerful weather assistant. Provide detailed weather forecasts in a friendly tone."`

- **Температура** :\
  &#x20;Этот параметр регулирует степень «креативности» ответов. Более низкие значения (например, 0,2) делают инструмент более объективным и детерминированным, в то время как более высокие значения (например, 0,8) позволяют получать более разнообразные и креативные результаты.

- **Максимальное количество токенов** :\
  &#x20;Регулирует длину ответов. Установите высокое значение для подробных ответов и низкое — для кратких.

- **История сообщений** :\
  &#x20;Это позволяет инструментам сохранять контекст для обеспечения непрерывности разговора. Используйте более высокое значение (например, 10) для чат-ботов и более низкое значение (например, 0) для одноразовых ответов, чтобы сэкономить токены.

---

#### **2. Создавайте четкие и конкретные инструменты.**

- Используйте **специальные системные подсказки,** адаптированные к назначению инструмента. Хорошо составленная системная подсказка обеспечивает целенаправленные и релевантные результаты.
- Предоставьте **примеры запросов и ответов,** чтобы четко обозначить ожидания от модели. Это способствует последовательному поведению и лучшему пониманию.

---

#### **3. Тщательно настройте поставщиков ИИ.**

Каждый поставщик предлагает свои уникальные преимущества. Выберите модель, которая соответствует вашим потребностям, и поэкспериментируйте с различными вариантами, чтобы найти оптимальное решение.

---

#### **4. Баланс между производительностью и стоимостью.**

- Начните с **бесплатных моделей,** таких как`meta-llama` С помощью OpenRouter можно тестировать идеи, прежде чем переходить к более мощным платным вариантам.
- Используйте **статистику токенов** (доступна в`.statistics.tokens_input` и`.statistics.tokens_output` ) для мониторинга использования и оптимизации конфигураций инструментов.

---

#### **5. Используйте динамические и многократно используемые компоненты.**

- **Динамические системные подсказки** : адаптируйте подсказки на основе данных в реальном времени. Например, используйте данные о погоде в режиме реального времени для создания персонализированных прогнозов.

  ```javascript
  sendTo('ai-toolbox.0', 'model_request', {
      model: 'MODEL-NAME',
      system_prompt: 'Current weather in {location} is {temperature}°C. Advise suitable outdoor activities.',
      text: 'What should I do today?',
  }, (result) => console.info(result.text));

  ```

- **Интеграция скриптов** : Используйте JavaScript для динамической настройки параметров, таких как температура или системные подсказки, на основе внешних входных данных.

---

#### **6. Тестируйте, дорабатывайте и развивайте.**

- Используйте журналы отладки для выявления проблем в работе инструмента.\
  &#x20;Установите уровень логирования на`debug` в административном интерфейсе ioBroker.
- Поэкспериментируйте с **различными системными подсказками, настройками температуры и ограничениями на количество токенов** , чтобы оптимизировать работу системы.

---

#### **7. Создавайте модульные решения.**

- Разделите сложные задачи на более мелкие, многократно используемые инструменты. Например, используйте один инструмент для анализа данных, а другой — для создания отчетов. Объедините их в своих скриптах для создания эффективных рабочих процессов.

---

#### **8. Управление историей сообщений**

- Для инструментов, работающих в режиме чата, следует поддерживать приемлемую длину истории, чтобы обеспечить контекст без чрезмерного использования токенов.

---

#### **9. Используйте выходные данные в формате JSON для автоматизации.**

Для инструментов, интегрированных в системы умного дома или скрипты, настройте формат ответа в формате JSON, предоставив пример ответа в желаемом формате.

---

Эти передовые методы в сочетании с экспериментами и итеративным совершенствованием обеспечат, что ваши инструменты искусственного интеллекта будут предоставлять значимые и надежные результаты, адаптированные к вашей среде умного дома.

## Разработка

### Отладка

Установите уровень логирования на`debug` Подробные журналы доступны в административном интерфейсе ioBroker.

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