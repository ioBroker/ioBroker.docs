---
BADGE-GitHub license: https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.telegram
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.telegram.svg
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.telegram
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.telegram
BADGE-GitHub commits since latest release (by date): https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.telegram/latest
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.telegram
BADGE-GitHub issues: https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.telegram
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.telegram.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/telegram-stable.svg
BADGE-Number of Installations: https://iobroker.live/badges/telegram-installed.svg
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.telegram/README.md
title: ioBroker.telegram
hash: WOfJHntlnct290cbQ5De/aApPS0pIWQ0PuQtdfMmHik=
---
![Логотип](../../../en/admin/telegram.png)

# IoBroker.telegram
## Конфигурация
Попросите [@BotFather](https://telegram.me/botfather) создать нового бота `/newbot`.

Вам будет предложено ввести имя бота, а затем имя пользователя.
После этого вы получите Токен.

![Скриншот](../../../en/adapterref/iobroker.telegram/img/chat.png)

Пароль для связи необходимо установить в диалоге конфигурации. После этого запустите адаптер.

Чтобы начать разговор с вашим ботом, вам необходимо аутентифицировать пользователя с помощью `/password phrase`, где **`phrase`** — это настроенный вами пароль. Итак, откройте новый разговор с созданным вами ботом в Telegram, а затем вам нужно будет ввести пароль в качестве первой команды.

**Примечание:** вы можете использовать краткую форму `/p phrase`.

Чтобы добавить красивую картинку на аватар, введите `/setuserpic` в чат **BotFather** и загрузите ему нужную картинку (512x512 пикселей), например, [логотип](img/logo.png).

Вы можете отправить сообщение всем аутентифицированным пользователям через messageBox `sendTo('telegram', 'Test message')` или конкретному пользователю `sendTo('telegram', '@userName Test message')`.
Пользователь должен пройти аутентификацию заранее.

Вы также можете указать пользователя таким образом:

```javascript
sendTo('telegram', {user: 'UserName', text: 'Test message'}, function (res) {
    console.log('Sent to ' + res + ' users');
});
```

Если вы используете приведенный выше пример, имейте в виду, что вам необходимо заменить «Имя пользователя» либо именем, либо именем пользователя Public-Telegram пользователя, которому вы хотите отправить сообщение. (Зависит от того, включена ли в настройках адаптера опция «Сохранять имя пользователя, а не имя»). Если опция установлена, а пользователь не указал общедоступное имя пользователя в своей учетной записи Telegram, то адаптер продолжит использовать имя пользователя. Пользователь. Имейте в виду, что если пользователь позже установит общедоступное имя пользователя (после аутентификации в вашем боте), сохраненное имя будет заменено именем пользователя в следующий раз, когда пользователь отправит сообщение боту.

Можно указать более одного получателя (просто разделите имена пользователей запятой).
Например, получатель: «Пользователь1,Пользователь4,Пользователь5».

Вы также можете отправить сообщение через состояние, просто установите состояние *"telegram.INSTANCE.communicate.response"* со значением *"@userName Test message"* или с помощью объекта JSON:

```json
{
    "text": "Test message"
}
```

Синтаксис JSON также позволяет добавлять параметры из [API ботов Telegram](https://core.telegram.org/bots/api), а также устанавливать идентификатор пользователя или чата:

```json
{
    "text": "Test message, but with *bold*",
    "parse_mode": "Markdown",
    "chatId": "1234567890",
    "user": "UserName"
}
```

Вы также можете установить `parse_mode` в тексте:

```
sendTo('telegram', {user: 'UserName', text: '<MarkdownV2>Test message, but with *bold*</MarkdownV2>'}, function (res) {
   console.log('Sent to ' + res + ' users');
});
```

или

```
setState('telegram.0.communicate.response', '<MarkdownV2>Test message, but with *bold*</MarkdownV2>');
```

Чтобы отправлять сообщения в группы, вам необходимо пригласить бота в группу, в которой вы хотите, чтобы бот публиковал сообщения.
Предоставляя `chat_id` в полезные данные сообщения JSON, вы действительно можете отправлять сообщения этим группам.

Чтобы узнать `chat_id`, вам необходимо установить уровень журнала адаптера на `debug`.
Затем вы можете просто пропинговать своего бота в группах, которым вы хотите, чтобы бот отправлял сообщения.
Обязательно поместите `/` перед сообщением, чтобы бот увидел сообщение ([если конфиденциальность бота включена](#How-to-receive-messages-in-group-chats-using-telegram-adapter)).
Затем журнал iobroker покажет вам идентификатор чата в журналах.

## Использование
Вы можете использовать Telegram с адаптером [текст2команда](https://github.com/ioBroker/ioBroker.text2command). Существует предопределенная схема связи, и вы можете отправить домой команду в текстовой форме.

Чтобы отправить фотографию, просто отправьте путь к файлу вместо текста или URL: `sendTo('telegram', 'absolute/path/file.png')` или `sendTo('telegram', 'https://telegram.org/img/t_logo.png')`.

Пример как отправить скриншот с веб-камеры в Telegram:

```javascript
var request = require('request');
var fs      = require('fs');

function sendImage() {
    request.get({url: 'http://login:pass@ipaddress/web/tmpfs/snap.jpg', encoding: 'binary'}, function (err, response, body) {
        fs.writeFile('/tmp/snap.jpg', body, 'binary', function (err) {

        if (err) {
            console.error(err);
        } else {
            console.log('Snapshot sent');
            sendTo('telegram.0', '/tmp/snap.jpg');
            //sendTo('telegram.0', {text: '/tmp/snap.jpg', caption: 'Snapshot'});
        }
      });
    });
}
on('someState', function (obj) {
    if (obj.state.val) {
        // send 4 images: immediately, in 5, 15 and 30 seconds
        sendImage();
        setTimeout(sendImage, 5000);
        setTimeout(sendImage, 15000);
        setTimeout(sendImage, 30000);
    }
});
```

Следующие сообщения зарезервированы для действий:

- *печатает* - для текстовых сообщений,
- *upload_photo* - для фотографий,
- *upload_video* - для видео,
- *record_video* - для видео,
- *record_audio* — для звука,
- *upload_audio* - для аудио,
- *upload_document* - для документов,
- *find_location* — для данных о местоположении

В этом случае будет отправлена команда действия.

Описание API Telegram можно найти [здесь](https://core.telegram.org/bots/api), и вы можете использовать все параметры, определенные в этом API, просто включив их в объект отправки. Например.:

```javascript
sendTo('telegram.0', {
    text:                   '/tmp/snap.jpg',
    caption:                'Snapshot',
    disable_notification:   true
});
```

**Возможные варианты**:

- *disable_notification*: отправляет сообщение без звука. Пользователи iOS не получат уведомление, пользователи Android получат уведомление без звука. (все типы)
- *parse_mode*: отправьте Markdown или HTML, если вы хотите, чтобы приложения Telegram отображали жирный, курсив, текст фиксированной ширины или встроенные URL-адреса в сообщении вашего бота. Возможные значения: «Markdown», «MarkdownV2», «HTML» (сообщение).
- *disable_web_page_preview*: отключает предварительный просмотр ссылок в этом сообщении (сообщении).
- *подпись*: подпись к документу, фото или видео, 0–200 символов (видео, аудио, фото, документ).
- *duration*: Продолжительность отправленного видео или аудио в секундах (аудио, видео)
- *исполнитель*: Исполнитель аудиофайла (аудио)
- *title*: название дорожки аудиофайла (аудио)
- *ширина*: ширина видео (видео)
- *height*: высота видео (видео)

Адаптер пытается определить тип сообщения (фото, видео, аудио, документ, наклейка, действие, местоположение). В зависимости от текста в сообщении. Если текст является путем к существующему файлу, он будет отправлен в соответствии с типом.

Местоположение будет определяться по атрибуту широты:

```javascript
sendTo('telegram.0', {
    latitude:               52.522430,
    longitude:              13.372234,
    disable_notification:   true
});
```

### Явные типы сообщений
У вас есть возможность дополнительно определить тип сообщения, если вы хотите отправить данные в виде буфера.

Возможны следующие типы: *стикер*, *видео*, *документ*, *аудио*, *фото*.

```javascript
sendTo('telegram.0', {
    text: fs.readFileSync('/opt/path/picture.png'),
    type: 'photo'
});
```

### Клавиатура
Вы можете отобразить клавиатуру **ReplyKeyboardMarkup** в клиенте:

```javascript
sendTo('telegram.0', {
    text:   'Press button',
    reply_markup: {
        keyboard: [
            ['Line 1, Button 1', 'Line 1, Button 2'],
            ['Line 2, Button 3', 'Line 2, Button 4']
        ],
        resize_keyboard:   true,
        one_time_keyboard: true
    }
});
```

Вы можете прочитать больше [здесь](https://core.telegram.org/bots/api#replykeyboardmarkup) и [здесь](https://core.telegram.org/bots#keyboards).

Вы можете отобразить клавиатуру **InlineKeyboardMarkup** в клиенте:

```javascript
sendTo('telegram', {
    user: user,
    text: 'Click the button',
    reply_markup: {
        inline_keyboard: [
            [{ text: 'Button 1_1', callback_data: '1_1' }],
            [{ text: 'Button 1_2', callback_data: '1_2' }]
        ]
    }
});
```

Вы можете прочитать больше [здесь](https://core.telegram.org/bots/api#inlinekeyboardmarkup) и [здесь](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating).

**ПРИМЕЧАНИЕ.** *После того, как пользователь нажмет кнопку обратного вызова, клиенты Telegram будут отображать индикатор выполнения, пока вы не вызовете ответCallbackQuery. Поэтому необходимо отреагировать, вызвав ответ AnswerCallbackQuery, даже если уведомление пользователя не требуется (например, без указания каких-либо дополнительных параметров).*

### ОтветCallbackQuery
Используйте этот метод для отправки ответов на запросы обратного вызова, отправленные со встроенной клавиатуры. Ответ будет отображаться пользователю в виде уведомления вверху экрана чата или в виде оповещения. В случае успеха возвращается *True*.

```javascript
if (command === '1_2') {
    sendTo('telegram', {
        user: user,
        answerCallbackQuery: {
            text: 'Pressed!',
            showAlert: false, // Optional parameter
        },
   });
}
```

Вы можете прочитать больше [здесь](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegrambotanswercallbackquerycallbackqueryid-text-showalert-options--promise).

### Вопрос
Вы можете отправить в Telegram сообщение, и следующий ответ будет возвращен в обратном вызове.
Таймаут может быть установлен в конфигурации и по умолчанию составляет 60 секунд.

```javascript
sendTo('telegram.0', 'ask', {
    user: user, // optional
    text: 'Are you sure?',
    reply_markup: {
        inline_keyboard: [
            // two buttons could be on one line too, but here they are on different
            [{ text: 'Yes!',  callback_data: '1' }], // first line
            [{ text: 'No...', callback_data: '0' }]  // second line
        ]
    }
}, msg => {
    console.log('user says ' + msg.data);
});
```

## Идентификатор чата
Начиная с версии 0.4.0 вы можете использовать идентификатор чата для отправки сообщений в чат.

```javascript
sendTo('telegram.0', {text: 'Message to chat', chatId: 'SOME-CHAT-ID-123'});
```

## Обновление сообщений
Следующие методы позволяют изменить существующее сообщение в истории сообщений вместо отправки нового с результатом действия. Это наиболее полезно для сообщений с *встроенной клавиатурой* с использованием запросов обратного вызова, но также может помочь уменьшить беспорядок в разговорах с обычными чат-ботами.

### РедактироватьТекстСообщения
Используйте этот метод для редактирования текста, отправленного ботом или через него (для встроенных ботов). В случае успеха, если отредактированное сообщение отправляется ботом, отредактированное сообщение возвращается; в противном случае возвращается *True*.

```javascript
if (command === '1_2') {
    sendTo('telegram', {
        user: user,
        text: 'New text before buttons',
        editMessageText: {
            options: {
                chat_id: getState('telegram.0.communicate.requestChatId').val,
                message_id: getState('telegram.0.communicate.requestMessageId').val,
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Button 1', callback_data: '2_1' }],
                        [{ text: 'Button 2', callback_data: '2_2' }]
                    ],
                }
            }
        }
    });
}
```

*или новый текст последнего сообщения:*

```javascript
if (command === '1_2') {
    sendTo('telegram', {
        user: user,
        text: 'New text message',
        editMessageText: {
            options: {
                chat_id: getState('telegram.0.communicate.requestChatId').val,
                message_id: getState('telegram.0.communicate.requestMessageId').val,
            }
        }
    });
}
```

Вы можете прочитать больше [здесь](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegramboteditmessagetexttext-options--promise).

### РедактироватьMessageCaption
Используйте этот метод для редактирования заголовка сообщения, отправленного ботом или через него (для встроенных ботов).
В случае успеха, если отредактированное сообщение отправляется ботом, отредактированное сообщение возвращается; в противном случае возвращается *True*.

```javascript
if (command === '1_2') {
    sendTo('telegram', {
        user, // optional
        text: 'New caption',
        editMessageCaption: {
            options: {
                chat_id: getState('telegram.0.communicate.requestChatId').val,
                message_id: getState('telegram.0.communicate.requestMessageId').val
            }
        }
    });
}
```

Вы можете прочитать больше [здесь](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegramboteditmessagetexttext-options--promise).

### EditMessageMedia
Используйте этот метод для редактирования изображения сообщения, отправленного ботом или через него (для встроенных ботов).
В случае успеха, если отредактированное сообщение отправляется ботом, отредактированное сообщение возвращается, в противном случае возвращается *True*.

```javascript
if (command === '1_2') {
    sendTo('telegram', {
        user, // optional
        text: 'picture.jpg',
        editMessageMedia: {
            options: {
                chat_id: (await getStateAsync('telegram.0.communicate.botSendChatId')).val,
                message_id: (await getStateAsync('telegram.0.communicate.botSendMessageId')).val
            }
        }
    });
}
```

Поддерживаются следующие типы носителей: `photo`, `animation`, `audio`, `document`, `video`.

Вы можете прочитать больше [здесь](https://core.telegram.org/bots/api#editmessagemedia).

### EditMessageReplyMarkup
Используйте этот метод, чтобы редактировать только разметку ответа сообщений, отправленных ботом или через него (для встроенных ботов). В случае успеха, если отредактированное сообщение отправляется ботом, отредактированное сообщение возвращается; в противном случае возвращается *True*.

```javascript
if (command === '1_2') {
    sendTo('telegram', {
        user: user,
        text: 'New text before buttons',
        editMessageReplyMarkup: {
            options: {
                chat_id: (await getStateAsync('telegram.0.communicate.botSendChatId')).val,
                message_id: (await getStateAsync('telegram.0.communicate.botSendMessageId')).val,
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Button 1', callback_data: '2_1' }],
                        [{ text: 'Button 2', callback_data: '2_2' }]
                    ],
                }
            }
        }
    });
}
```

Вы можете прочитать больше [здесь](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegramboteditmessagereplymarkupreplymarkup-options--promise).

### Удаленное сообщение
Используйте этот метод для удаления сообщения, включая служебные, со следующими ограничениями:

- Сообщение можно удалить только в том случае, если оно было отправлено менее 48 часов назад.

Возвращает *True* в случае успеха.

```javascript
if (command === 'delete') {
    sendTo('telegram', {
        user: user,
        deleteMessage: {
            options: {
                chat_id: getState('telegram.0.communicate.requestChatId').val,
                message_id: getState('telegram.0.communicate.requestMessageId').val
            }
        }
    });
}
```

Вы можете прочитать больше [здесь](https://github.com/yagop/node-telegram-bot-api/blob/master/doc/api.md#TelegramBot+deleteMessage).

## Реакция на ответы/сообщения пользователей
Предположим, вы используете только JavaScript без `text2command`. Вы уже отправили сообщение/вопрос своему пользователю, используя `sendTo()`, как описано выше. Пользователь отвечает на это нажатием кнопки или написанием сообщения. Вы можете извлечь команду и оставить отзыв своему пользователю, выполнить команды или переключить состояния в iobroker.

 - Telegram.0 — это экземпляр Telegram вашего iobroker, который вы хотите использовать.
 - пользователь — зарегистрированный у вас TelegramBot, который отправил сообщение
 - команда — это команда, которую получил ваш TelegramBot

```javascript
on({id: 'telegram.0.communicate.request', change: 'any'}, function (obj) {
    var stateval = getState('telegram.0.communicate.request').val;              // save Statevalue received from your Bot
    var user = stateval.substring(1,stateval.indexOf(']'));                 // extract user from the message
    var command = stateval.substring(stateval.indexOf(']') + 1,stateval.length);   // extract command/text from the message

    switch (command) {
        case '1_2':
            //... see example above ...
            break;
        case 'delete':
            //... see example above
            break;
        //.... and so on ...
    }
});

```

## Специальные команды
### /statestateName — прочитать значение состояния
Вы можете запросить значение состояния, если теперь у вас есть идентификатор:

```
/state system.adapter.admin.0.memHeapTotal
> 56.45
```

### /statestateName value — установить значение состояния
Вы можете установить значение состояния, если теперь у вас есть идентификатор:

```
/state hm-rpc.0.JEQ0ABCDE.3.STOP true
> Done
```

## Режим опроса или сервера
Если используется режим опроса, адаптер по умолчанию каждые 300 мс опрашивает сервер Telegram на наличие обновлений. Он использует трафик, и сообщения могут быть задержаны на период до интервала опроса. Интервал опроса можно определить в конфигурации адаптера.

Чтобы использовать режим сервера, ваш экземпляр ioBroker должен быть доступен из Интернета (например, с помощью службы динамического DNS `noip.com`).

Telegram может работать только с HTTPS-серверами, но вы можете использовать сертификаты **давайте зашифруем**.

Для режима сервера необходимо указать следующие настройки:

- URL - в формате https://вашдомен.com:8443.
- IP - IP адрес, к которому будет привязан сервер. По умолчанию 0.0.0.0. Не меняйте его, если вы не уверены.
- Порт - на самом деле Telegram поддерживает только порты 443, 80, 88, 8443, но вы можете перенаправлять порты кому угодно через свой роутер.
- Публичный сертификат - требуется, если отключена функция **давайте зашифровать**.
- Закрытый ключ - требуется, если отключена функция **зашифровать**.
- Сертификат цепи (по желанию)
- Параметры шифрования. Настроить сертификаты **зашифрования** очень просто. Пожалуйста, прочитайте об этом [здесь](https://github.com/ioBroker/ioBroker.admin#lets-encrypt-certificates).

## Расширенная безопасность
Аутентификацию пользователей можно отключить. Поэтому никто новый не сможет аутентифицироваться.

Чтобы создать список доверенных пользователей, сначала отключите опцию «Не аутентифицировать новых пользователей» и аутентифицируйте всех пользователей, которые должны быть в списке доверенных, отправив сообщение `/password <PASSWORD>`.

Пользователи, отправившие действительный пароль, будут сохранены в списке доверенных.

После этого опция «Не аутентифицировать новых пользователей» может быть активирована, и новые пользователи не смогут аутентифицироваться.

Чтобы использовать эту опцию, необходимо активировать опцию «Запоминать аутентифицированных пользователей».

## Звонки через Telegram
Благодаря API [callmebot](https://www.callmebot.com/) вы можете позвонить на свою учетную запись Telegram, и некоторый текст будет прочитан через механизм TTS.

Чтобы сделать это из адаптера JavaScript, просто позвоните:

```javascript
sendTo('telegram.0', 'call', 'Some text');
```

или

```javascript
sendTo('telegram.0', 'call', {
    text: 'Some text',
    user: '@Username', // optional and the call will be done to the first user in telegram.0.communicate.users.
    language: 'de-DE-Standard-A', // optional and the system language will be taken
    repeats: 0, // number of repeats
});
```

или

```javascript
sendTo('telegram.0', 'call', {
    text: 'Some text',
    users: ['@Username1', '+49xxxx'] // Array of `users' or telephone numbers.
});
```

или

```javascript
sendTo('telegram.0', 'call', {
    file: 'url of mp3 file that is accessible from internet',
    users: ['@Username1', '@Username2'] // Array of `users' or telephone numbers.
});
```

Возможные значения языка:

- `ar-XA-Standard-A` - арабский (женский голос)
- `ar-XA-Standard-B` - арабский (мужской голос)
- `ar-XA-Standard-C` - арабский (мужской 2 голоса)
- `cs-CZ-Standard-A` - Чешский (Чехия) (Женский голос)
- `da-DK-Standard-A` - датский (Дания) (женский голос)
- `nl-NL-Standard-A` — голландский (Нидерланды) (женский голос — будет использоваться, если системный язык — NL и язык не указан)
- `nl-NL-Standard-B` - голландский (Нидерланды) (мужской голос)
- `nl-NL-Standard-C` - голландский (Нидерланды) (мужской 2 голоса)
- `nl-NL-Standard-D` - голландский (Нидерланды) (женский 2 голоса)
- `nl-NL-Standard-E` - голландский (Нидерланды) (женский 3 голос)
- `en-AU-Standard-A` - английский (Австралия) (женский голос)
- `en-AU-Standard-B` - английский (Австралия) (мужской голос)
- `en-AU-Standard-C` - английский (Австралия) (женский 2 голоса)
- `en-AU-Standard-D` - английский (Австралия) (мужской 2 голоса)
- `en-IN-Standard-A` - английский (Индия) (женский голос)
- `en-IN-Standard-B` - английский (Индия) (мужской голос)
- `en-IN-Standard-C` - английский (Индия) (мужской 2 голоса)
- `en-GB-Standard-A` - английский (Великобритания) (женский голос - будет использоваться, если системным языком является EN и язык не указан)
- `en-GB-Standard-B` - английский (Великобритания) (мужской голос)
- `en-GB-Standard-C` - английский (Великобритания) (женский 2 голоса)
- `en-GB-Standard-D` - английский (Великобритания) (мужской 2 голоса)
- `en-US-Standard-B` - английский (США) (мужской голос)
- `en-US-Standard-C` - английский (США) (женский голос)
- `en-US-Standard-D` - английский (США) (мужской 2 голоса)
- `en-US-Standard-E` - английский (США) (женский 2 голоса)
- `fil-PH-Standard-A` - филиппинский (Филиппины) (женский голос)
- `fi-FI-Standard-A` - финский (Финляндия) (женский голос)
- `fr-CA-Standard-A` - французский (Канада) (женский голос)
- `fr-CA-Standard-B` - французский (Канада) (мужской голос)
- `fr-CA-Standard-C` - французский (Канада) (женский 2 голоса)
- `fr-CA-Standard-D` - французский (Канада) (мужской 2 голоса)
- `fr-FR-Standard-A` — французский (Франция) (женский голос — будет использоваться, если системным языком является FR и язык не указан)
- `fr-FR-Standard-B` - французский (Франция) (мужской голос)
- `fr-FR-Standard-C` - французский (Франция) (женский 2 голоса)
- `fr-FR-Standard-D` - французский (Франция) (мужской 2 голоса)
- `de-DE-Standard-A` - немецкий (Германия) (женский голос - будет использоваться, если системный язык DE и язык не указан)
- `de-DE-Standard-B` - немецкий (Германия) (мужской голос)
- `el-GR-Standard-A` - греческий (Греция) (женский голос)
- `hi-IN-Standard-A` - Хинди (Индия) (Женский голос)
- `hi-IN-Standard-B` - Хинди (Индия) (мужской голос)
- `hi-IN-Standard-C` - Хинди (Индия) (мужской 2 голоса)
- `hu-HU-Standard-A` - венгерский (Венгрия) (женский голос)
- `id-ID-Standard-A` - индонезийский (Индонезия) (женский голос)
- `id-ID-Standard-B` - индонезийский (Индонезия) (мужской голос)
- `id-ID-Standard-C` - индонезийский (Индонезия) (мужской 2 голоса)
- `it-IT-Standard-A` - итальянский (Италия) (женский голос - будет использоваться, если системным языком является IT и язык не указан)
- `it-IT-Standard-B` - итальянский (Италия) (женский 2 голоса)
- `it-IT-Standard-C` - итальянский (Италия) (мужской голос)
- `it-IT-Standard-D` - итальянский (Италия) (мужской 2 голоса)
- `ja-JP-Standard-A` - японский (Япония) (женский голос)
- `ja-JP-Standard-B` - японский (Япония) (женский 2 голоса)
- `ja-JP-Standard-C` - японский (Япония) (мужской голос)
- `ja-JP-Standard-D` - японский (Япония) (мужской 2 голоса)
- `ko-KR-Standard-A` - корейский (Южная Корея) (женский голос)
- `ko-KR-Standard-B` - корейский (Южная Корея) (женский 2 голос)
- `ko-KR-Standard-C` - корейский (Южная Корея) (мужской голос)
- `ko-KR-Standard-D` - корейский (Южная Корея) (мужской 2 голоса)
- `cmn-CN-Standard-A` - китайский (женский голос)
- `cmn-CN-Standard-B` - китайский (мужской голос)
- `cmn-CN-Standard-C` - китайский (мужской 2 голос)
- `nb-NO-Standard-A` - норвежский (Норвегия) (женский голос)
- `nb-NO-Standard-B` - норвежский (Норвегия) (мужской голос)
- `nb-NO-Standard-C` - норвежский (Норвегия) (женский 2 голос)
- `nb-NO-Standard-D` - норвежский (Норвегия) (мужской 2 голоса)
- `nb-no-Standard-E` - Норвежский (Норвегия) (Женский 3 голос)
- `pl-PL-Standard-A` — польский (Польша) (женский голос — будет использоваться, если системным языком является PL и язык не указан)
- `pl-PL-Standard-B` - польский (Польша) (мужской голос)
- `pl-PL-Standard-C` - польский (Польша) (мужской 2 голоса)
- `pl-PL-Standard-D` - польский (Польша) (женский 2 голоса)
- `pl-PL-Standard-E` - польский (Польша) (женский 3 голос)
- `pt-BR-Standard-A` — португальский (Бразилия) (женский голос — будет использоваться, если системным языком является PT и язык не указан)
- `pt-PT-Standard-A` - португальский (Португалия) (женский голос)
- `pt-PT-Standard-B` - Португальский (Португалия) (мужской голос)
- `pt-PT-Standard-C` - португальский (Португалия) (мужской 2 голоса)
- `pt-PT-Standard-D` - португальский (Португалия) (женский 2 голоса)
- `ru-RU-Standard-A` - Русский (Россия) (Женский голос - будет использоваться, если системный язык RU и язык не указан)
- `ru-RU-Standard-B` - Русский (Россия) (Мужской голос)
- `ru-RU-Standard-C` - Русский (Россия) (Женский 2 голос)
- `ru-RU-Standard-D` - Русский (Россия) (Мужской 2 голос)
- `sk-SK-Standard-A` - словацкий (Словакия) (женский голос)
- `es-ES-Standard-A` — испанский (Испания) (женский голос — будет использоваться, если системным языком является ES и язык не указан)
- `sv-SE-Standard-A` - Шведский (Швеция) (Женский голос)
- `tr-TR-Standard-A` - Turkish (Турция) (Женский голос)
- `tr-TR-Standard-B` - Турецкий (Турция) (Мужской голос)
- `tr-TR-Standard-C` - Турецкий (Турция) (Женский 2 голоса)
- `tr-TR-Standard-D` - Турецкий (Турция) (Женский 3 голос)
- `tr-TR-Standard-E` - Turkish (Турция) (мужской голос)
- `uk-UA-Standard-A` - Украинский (Украина) (Женский голос)
- `vi-VN-Standard-A` - вьетнамский (Вьетнам) (женский голос)
- `vi-VN-Standard-B` - вьетнамский (Вьетнам) (мужской голос)
- `vi-VN-Standard-C` - вьетнамский (Вьетнам) (женский 2 голоса)
- `vi-VN-Standard-D` - вьетнамский (Вьетнам) (мужской 2 голоса)

ДЕЛАТЬ:

- место проведения

## Автоматическая вставка клавиатуры на основе настроек администратора (Easy-Keyboard)
Для каждого состояния можно включить дополнительные настройки:

![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings.png)

При вводе `/cmds` в телеграмме отобразится следующая клавиатура:

![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings1.png)

`/cmds` можно заменить любым текстом (например, «?») в диалоге настройки адаптера Telegram.

Если в диалоговом окне конфигурации адаптера Telegram включена опция **Использовать комнаты в команде с клавиатуры**, то на первом этапе будет показан список комнат. ***Еще не реализовано***

###Настройки в штате
Сначала необходимо активировать конфигурацию.

#### Псевдоним
Название устройства. Если имя пустое, имя будет взято из объекта.
При вводе «Дверной светильник» отображается следующее меню для логического состояния.
![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings2.png)

Вы можете включить устройство, выключить его или запросить состояние.
Если вы нажмете `Door lamp ?`, вы получите `Door lamp  => switched off`.

### Только чтение
Если эта функция активирована, кнопки ВКЛ/ВЫКЛ не будут отображаться, а только `Door lamp ?`.

### Сообщить об изменениях
Если статус устройства изменился (например, кто-то физически включил лампу), новый статус будет доставлен в Telegram.
Например. `Door lamp  => switched on`.

### Кнопки в строке
Сколько кнопок должно быть показано в строке для одного устройства.
Из-за длинного названия, возможно, лучше показывать в строке только 2 (или даже одну) кнопки.

![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings3.png)

### Только запись
Если эта функция активирована, кнопка запроса статуса (`Door lamp ?`) не будет отображаться.
![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings4.png)

### По команде
Какой текст будет отображаться на кнопке `ON`.
Как здесь: ![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings5.png)

Произведет следующую клавиатуру: ![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings6.png).

### ВКЛ Текст
Текст, который будет показан в государственном отчете.
Например. `Door lamp => activated`, если состояние устройства изменилось на true и **Текст ON** равен `activated`

Тексты ВКЛ/ВЫКЛ будут отображаться только в том случае, если активирован **Отчет об изменениях**.

### Команда ВЫКЛ.
То же, что и **Команда ВКЛ**, но для ВЫКЛ.

### ВЫКЛ. Текст
То же, что и **ВКЛ. Текст**, но для ВЫКЛ.
Например. `Door lamp => deactivated`, если состояние устройства изменилось на ложное, а **Текст ВЫКЛ** равен `deactivated`

### Только правда
Например, у кнопок нет состояния ВЫКЛ. В этом случае кнопка ВЫКЛ не будет отображаться.

![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings7.png)

## Как получать сообщения в групповых чатах с помощью адаптера Telegram
Если бот Telegram получает сообщения, отправленные пользователем боту в приватных чатах, но не получает сообщения, отправленные пользователями в групповых чатах.
В этом случае вам необходимо поговорить с `@botfather` и отключить режим конфиденциальности.

Чат BotFather:

```
You: /setprivacy

BotFather: Choose a bot to change group messages settings.

You: @your_name_bot

BotFather: 'Enable' - your bot will only receive messages that either start with the '/' symbol or mention the bot by username.

'Disable' - your bot will receive all messages that people send to groups.

Current status is: ENABLED

You: Disable

BotFather: Success! The new status is: DISABLED. /help
```

## Как отправлять сообщения через node-red
Для простых текстовых сообщений всем пользователям просто поместите текст в полезные данные сообщения и отправьте его в состояние ioBroker `telegram.INSTANCE.communicate.response`.

Если вы хотите установить дополнительные параметры, заполните полезную нагрузку объектом JSON, например:

```javascript
msg.payload = {
    // text is the only mandatory field here
    "text": "*bold _italic bold ~italic bold strikethrough~ __underline italic bold___ bold*",
    // optional chatId or user, the recipient of the message
    "chatId": "1234567890",
    // optional settings from the telegram bots API
    "parse_mode": "MarkdownV2"
}
```

Прежде чем отправить его на `telegram.INSTANCE.communicate.responseJson you need to stringify the object!`

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 3.2.1 (2024-04-03)
* (PeterVoronov) An error at providing error information has been fixed.

### 3.2.0 (2024-04-02)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (PeterVoronov) The current error is added as a separate property error to the response object (messageId) now.
* (theknut) Added units to responses
* (mcm1957) Dependencies have been updated0

### 3.1.0 (2024-02-17)
* (theknut) Option to send state updates without notification sound has been added. [#793]
* (mcm1957) Dependencies have been updated.

### 3.0.1 (2023-12-08)
* (foxriver76) send the actual message too via notification-manager

### 3.0.0 (2023-11-06)
* (boergegrunicke) BREAKING CHANGE: Socks5 support has been removed.
* (PeterVoronov ) Extended and improved the returned list of processed messages.

## License

The MIT License (MIT)

Copyright (c) 2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2016-2023, bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.