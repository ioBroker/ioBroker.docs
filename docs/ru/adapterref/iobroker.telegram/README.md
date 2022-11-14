---
BADGE-Number of Installations: http://iobroker.live/badges/telegram-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.telegram.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.telegram.svg
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.telegram/README.md
title: ioBroker.telegram
hash: NZPqr1WUHbmb+9M6BCWh2fBEK95qQj7qfkkF6DmG8Gk=
---
![Логотип](../../../en/adapterref/iobroker.telegram/../../admin/telegram.png)

# IoBroker.telegram
## Конфигурация
Попросите [@BotFather](https://telegram.me/botfather) создать нового бота `/newbot`.

Вам будет предложено ввести имя бота, а затем имя пользователя.
После этого вы получите Жетон.

![Скриншот](../../../en/adapterref/iobroker.telegram/img/chat.png)

Вы должны установить пароль для связи в диалоге конфигурации. После этого запустите адаптер.

Чтобы начать разговор с вашим ботом, вам необходимо аутентифицировать пользователя с помощью `/password phrase`, где **`phrase`** – это настроенный вами пароль. Итак, откройте новый разговор с созданным ботом в Telegram, а затем вам нужно ввести пароль в качестве первой команды.

**Примечание.** вы можете использовать сокращенную форму `/p phrase`.

Чтобы добавить красивое изображение аватара, введите `/setuserpic` в чате **BotFather** и загрузите ему желаемое изображение (512x512 пикселей), например, [логотип](img/logo.png).

Вы можете отправить сообщение всем аутентифицированным пользователям через messageBox `sendTo('telegram', 'Test message')` или конкретному пользователю `sendTo('telegram', '@userName Test message')`.
Пользователь должен пройти аутентификацию перед этим.

Вы также можете указать пользователя таким образом:

```javascript
sendTo('telegram', {user: 'UserName', text: 'Test message'}, function (res) {
    console.log('Sent to ' + res + ' users');
});
```

Если вы используете приведенный выше пример, имейте в виду, что вы должны заменить «UserName» либо на имя, либо на Public-Telegram-Username пользователя, которому вы хотите отправить сообщение. (Зависит от того, включен ли параметр «Сохранить имя пользователя, а не имя» в настройках адаптера или нет) Если параметр установлен, и пользователь не указал общедоступное имя пользователя в своей учетной записи телеграммы, то адаптер будет продолжать использовать имя пользователя Пользователь. Имейте в виду, что если пользователь установит общедоступное имя пользователя позже (после аутентификации в вашем боте), сохраненное имя будет заменено именем пользователя в следующий раз, когда пользователь отправит сообщение боту.

Можно указать более одного получателя (просто разделите имена пользователей запятой).
Например: Получатель: "Пользователь1,Пользователь4,Пользователь5"

Вы также можете отправить сообщение поверх состояния, просто установите состояние *"telegram.INSTANCE.communicate.response"* со значением *"@userName Test message"* или с объектом JSON:

```json
{
    "text": "Test message"
}
```

Синтаксис JSON также позволяет добавлять параметры из [API телеграмм ботов](https://core.telegram.org/bots/api), а также устанавливать пользователя или идентификатор чата:

```json
{
    "text": "Test message, but with *bold*",
    "parse_mode": "Markdown",
    "chatId": "1234567890",
    "user": "UserName"
}
```

Чтобы отправлять сообщения в группы, вы должны пригласить бота в группу, в которой вы хотите, чтобы бот публиковал сообщения.
Предоставляя `chat_id` полезной нагрузке сообщения JSON, вы фактически можете отправлять сообщения этим группам.

Чтобы узнать `chat_id`, необходимо установить уровень журнала адаптера на `debug`.
Затем вы можете просто пропинговать своего бота в группах, которым вы хотите, чтобы бот отправлял сообщения.
Убедитесь, что вы поставили `/` перед сообщением, чтобы бот увидел сообщение ([если конфиденциальность бота включена](#How-to-receive-messages-in-group-chats-using-telegram-adapter)).
Затем журнал iobroker покажет вам идентификатор чата в журналах.

## Применение
Вы можете использовать телеграмму с адаптером [text2command](https://github.com/ioBroker/ioBroker.text2command). Есть предопределенная схема связи, и вы можете отправить команду домой в текстовой форме.

Чтобы отправить фото, просто отправьте путь к файлу вместо текста или URL: `sendTo('telegram', 'absolute/path/file.png')` или `sendTo('telegram', 'https://telegram.org/img/t_logo.png')`.

Пример отправки скриншота с веб-камеры в телеграм:

```javascript
var request = require('request');
var fs      = require('fs');

function sendImage() {
    request.get({url: 'http://login:pass@ipaddress/web/tmpfs/snap.jpg', encoding: 'binary'}, function (err, response, body) {
        fs.writeFile("/tmp/snap.jpg", body, 'binary', function(err) {

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
on("someState", function (obj) {
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

- *ввод* - для текстовых сообщений,
- *upload_photo* - для фото,
- *upload_video* - для видео,
- *record_video* - для видео,
- *record_audio* - для аудио,
- *upload_audio* - для аудио,
- *upload_document* - для документов,
- *find_location* - для данных о местоположении

В этом случае будет отправлена команда действия.

Описание для Telegram API можно найти [здесь](https://core.telegram.org/bots/api), и вы можете использовать все параметры, определенные в этом API, просто включив их в объект отправки. Например.:

```javascript
sendTo('telegram.0', {
    text:                   '/tmp/snap.jpg',
    caption:                'Snapshot',
    disable_notification:   true
});
```

**Возможные варианты**:

- *disable_notification*: отправляет сообщение без вывода сообщений. Пользователи iOS не получат уведомление, пользователи Android получат уведомление без звука. (все типы)
- *parse_mode*: отправьте Markdown или HTML, если вы хотите, чтобы приложения Telegram отображали полужирный шрифт, курсив, текст фиксированной ширины или встроенные URL-адреса в сообщении вашего бота. Возможные значения: «Markdown», «MarkdownV2», «HTML» (сообщение).
- *disable_web_page_preview*: отключает предварительный просмотр ссылок в этом сообщении (сообщении).
- *caption*: Подпись к документу, фото или видео, 0-200 символов (видео, аудио, фото, документ)
- *duration*: Продолжительность отправленного видео или аудио в секундах (аудио, видео)
- *исполнитель*: исполнитель аудиофайла (аудио)
- *title*: Название дорожки аудиофайла (аудио)
- *ширина*: ширина видео (видео)
- *высота*: высота видео (видео)

Адаптер пытается определить тип сообщения (фото, видео, аудио, документ, наклейка, действие, местоположение) в зависимости от текста в сообщении, если текст является путем к существующему файлу, он будет отправлен в соответствии с типом.

Местоположение будет определяться по широте атрибута:

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
Вы можете показать клавиатуру **ReplyKeyboardMarkup** в клиенте:

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

Вы можете показать клавиатуру **InlineKeyboardMarkup** в клиенте:

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

**ПРИМЕЧАНИЕ.** *После того, как пользователь нажмет кнопку обратного вызова, клиенты Telegram будут отображать индикатор выполнения, пока вы не вызовете answerCallbackQuery. Поэтому необходимо отреагировать, вызвав answerCallbackQuery, даже если уведомление пользователю не требуется (например, без указания каких-либо необязательных параметров).*

### Ответ на обратный вызов
Используйте этот метод для отправки ответов на запросы обратного вызова, отправленные со встроенной клавиатуры. Ответ будет отображаться пользователю в виде уведомления в верхней части экрана чата или в виде предупреждения. В случае успеха возвращается *True*.

```javascript
if (command === '1_2') {
    sendTo('telegram', {
        user: user,
        answerCallbackQuery: {
            text: "Pressed!",
            showAlert: false // Optional parameter
        }
   });
}
```

Вы можете прочитать больше [здесь](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegrambotanswercallbackquerycallbackqueryid-text-showalert-options--promise).

### Вопрос
Вы можете отправить в телеграмм сообщение, и следующий ответ будет возвращен в обратном вызове.
Время ожидания может быть установлено в конфигурации и по умолчанию составляет 60 секунд.

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
sendTo('telegram.0', {text: 'Message to chat', chatId: 'SOME-CHAT-ID-123');
```

## Обновление сообщений
Следующие методы позволяют изменить существующее сообщение в истории сообщений вместо отправки нового с результатом действия. Это наиболее полезно для сообщений со *встроенной клавиатурой* с использованием запросов обратного вызова, но также может помочь уменьшить беспорядок в разговорах с обычными чат-ботами.

### EditMessageText
Используйте этот метод для редактирования текста, отправленного ботом или через бота (для встроенных ботов). В случае успеха, если бот отправляет отредактированное сообщение, возвращается отредактированное сообщение, в противном случае возвращается *True*.

```javascript
if (command === '1_2') {
    sendTo('telegram', {
        user: user,
        text: 'New text before buttons',
        editMessageText: {
            options: {
                chat_id: getState("telegram.0.communicate.requestChatId").val,
                message_id: getState("telegram.0.communicate.requestMessageId").val,
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

*или новый текст для последнего сообщения:*

```javascript
if (command === '1_2') {
    sendTo('telegram', {
        user: user,
        text: 'New text message',
        editMessageText: {
            options: {
                chat_id: getState("telegram.0.communicate.requestChatId").val,
                message_id: getState("telegram.0.communicate.requestMessageId").val,
            }
        }
    });
}
```

Вы можете прочитать больше [здесь](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegramboteditmessagetexttext-options--promise).

### EditMessageCaption
Используйте этот метод для редактирования заголовка сообщения, отправленного ботом или через бота (для встроенных ботов).
В случае успеха, если бот отправляет отредактированное сообщение, возвращается отредактированное сообщение, в противном случае возвращается *True*.

```javascript
if (command === '1_2') {
    sendTo('telegram', {
        user, // optional
        text: 'New caption',
        editMessageCaption: {
            options: {
                chat_id: getState("telegram.0.communicate.requestChatId").val,
                message_id: getState("telegram.0.communicate.requestMessageId").val
            }
        }
    });
}
```

Вы можете прочитать больше [здесь](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegramboteditmessagetexttext-options--promise).

### EditMessageMedia
Используйте этот метод для редактирования изображения сообщения, отправленного ботом или через бота (для встроенных ботов).
В случае успеха, если бот отправляет отредактированное сообщение, возвращается отредактированное сообщение, в противном случае возвращается *True*.

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

Поддерживаются следующие типы мультимедиа: `photo`, `animation`, `audio`, `document`, `video`.

Вы можете прочитать больше [здесь](https://core.telegram.org/bots/api#editmessagemedia).

### EditMessageReplyMarkup
Используйте этот метод, чтобы редактировать только разметку ответов сообщений, отправленных ботом или через бота (для встроенных ботов). В случае успеха, если бот отправляет отредактированное сообщение, возвращается отредактированное сообщение, в противном случае возвращается *True*.

```javascript
if (command === '1_2') {
    sendTo('telegram', {
        user: user,
        text: 'New text before buttons',
        editMessageReplyMarkup: {
            options: {
                chat_id: getState("telegram.0.communicate.botSendChatId").val,
                message_id: getState("telegram.0.communicate.botSendMessageId").val,
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
Используйте этот метод для удаления сообщения, в том числе служебного, со следующими ограничениями:

- Сообщение может быть удалено только в том случае, если оно было отправлено менее 48 часов назад.

Возвращает *True* в случае успеха.

```javascript
if (command === 'delete') {
    sendTo('telegram', {
        user: user,
        deleteMessage: {
            options: {
                chat_id: getState("telegram.0.communicate.requestChatId").val,
                message_id: getState("telegram.0.communicate.requestMessageId").val
            }
        }
    });
}
```

Вы можете прочитать больше [здесь](https://github.com/yagop/node-telegram-bot-api/blob/master/doc/api.md#TelegramBot+deleteMessage).

## Реакция на ответы/сообщения пользователей
Предположим, вы используете только JavaScript без *text2command*. Вы уже отправили сообщение/вопрос своему пользователю, используя *sendTo()*, как описано выше. Пользователь отвечает на это нажатием кнопки или написанием сообщения. Вы можете извлечь команду и оставить отзыв своему пользователю, выполнить команды или изменить состояние в iobroker.

 - telegram.0 — это ваш экземпляр Telegram iobroker, который вы хотите использовать
 - пользователь - пользователь, зарегистрированный у вас TelegramBot, который отправил сообщение
 - command — это команда, которую получил ваш TelegramBot

```javascript
on({id: 'telegram.0.communicate.request', change: 'any'}, function (obj) {
    var stateval = getState('telegram.0.communicate.request').val;              // save Statevalue received from your Bot
    var user = stateval.substring(1,stateval.indexOf("]"));                 // extract user from the message
    var command = stateval.substring(stateval.indexOf("]")+1,stateval.length);   // extract command/text from the message

    switch (command) {
        case "1_2":
            //... see example above ...
            break;
        case "delete":
            //... see example above
            break;
        //.... and so on ...
    }
});

```

## Специальные команды
### /state stateName - чтение значения состояния
Вы можете запросить значение состояния, если теперь у вас есть идентификатор:

```
/state system.adapter.admin.0.memHeapTotal
> 56.45
```

### /state stateName value - установить значение состояния
Вы можете установить значение состояния, если теперь у вас есть идентификатор:

```
/state hm-rpc.0.JEQ0ABCDE.3.STOP true
> Done
```

## Режим опроса или сервера
Если используется режим опроса, адаптер по умолчанию каждые 300 мс опрашивает сервер телеграмм на наличие обновлений. Он использует трафик, и сообщения могут быть задержаны до интервала опроса. Интервал опроса можно определить в конфигурации адаптера.

Для использования режима сервера ваш экземпляр ioBroker должен быть доступен из Интернета (например, с помощью службы динамического DNS `noip.com`).

Telegram может работать только с серверами HTTPS, но вы можете использовать сертификаты **let’s encrypt**.

Для режима сервера должны быть предоставлены следующие настройки:

- URL - в виде https://вашдомен.com:8443.
- IP - IP адрес, к которому будет привязан сервер. По умолчанию 0.0.0.0. Не меняйте его, если вы не уверены.
- Порт - на самом деле телеграм поддерживает только порты 443, 80, 88, 8443, но вы можете пробросить порты кому угодно через ваш роутер.
- Публичный сертификат - требуется, если **let's encrypt** отключен.
- Закрытый ключ - требуется, если **let's encrypt** отключен.
- Сетевой сертификат (необязательно)
- Опции Let's encrypt - Очень легко настроить сертификаты **let's encrypt**. Пожалуйста, прочитайте об этом [здесь](https://github.com/ioBroker/ioBroker.admin#lets-encrypt-certificates).

## Расширенная безопасность
Аутентификация пользователей может быть отключена. Таким образом, никто новый не может аутентифицироваться.

Чтобы создать список доверенных пользователей, сначала отключите параметр «Не аутентифицировать новых пользователей» и аутентифицируйте всех пользователей, которые должны быть в доверенном списке, отправив сообщение `/password <PASSWORD>`.

Пользователи, отправившие действительный пароль, будут сохранены в списке доверенных.

После этого можно активировать опцию «Не аутентифицировать новых пользователей», и новые пользователи не смогут аутентифицироваться.

Чтобы использовать эту опцию, необходимо активировать опцию «Запоминать аутентифицированных пользователей».

## Звонки через телеграм
Благодаря API [callmebot](https://www.callmebot.com/) вы можете позвонить в свою учетную запись Telegram, и некоторый текст будет прочитан через механизм TTS.

Чтобы сделать это из адаптера javascript, просто позвоните:

```javascript
sendTo('telegram.0', 'call', 'Some text');
```

или же

```javascript
sendTo('telegram.0', 'call', {
    text: 'Some text',
    user: '@Username', // optional and the call will be done to the first user in telegram.0.communicate.users.
    language: 'de-DE-Standard-A' // optional and the system language will be taken
    repeats: 0, // number of repeats
});
```

или же

```javascript
sendTo('telegram.0', 'call', {
    text: 'Some text',
    users: ['@Username1', '+49xxxx'] // Array of `users' or telephone numbers.
});
```

или же

```javascript
sendTo('telegram.0', 'call', {
    file: 'url of mp3 file that is accessible from internet',
    users: ['@Username1', '@Username2'] // Array of `users' or telephone numbers.
});
```

Возможные значения для языка:

- `ar-XA-Standard-A` - арабский (женский голос)
- `ar-XA-Standard-B` - арабский (мужской голос)
- `ar-XA-Standard-C` - арабский (мужской 2-голосный)
- `cs-CZ-Standard-A` - Czech (Чехия) (женский голос)
- `da-DK-Standard-A` - датский (Дания) (женский голос)
- `nl-NL-Standard-A` — нидерландский (Нидерланды) (женский голос — будет использоваться, если системным языком является нидерландский и язык не указан)
- `nl-NL-Standard-B` - нидерландский (Нидерланды) (мужской голос)
- `nl-NL-Standard-C` - нидерландский (Нидерланды) (мужской 2 голос)
- `nl-NL-Standard-D` - нидерландский (Нидерланды) (женский 2 голос)
- `nl-NL-Standard-E` - нидерландский (Нидерланды) (женский 3 голос)
- `en-AU-Standard-A` - английский (Австралия) (женский голос)
- `en-AU-Standard-B` - английский (Австралия) (мужской голос)
- `en-AU-Standard-C` - английский (Австралия) (женский 2 голос)
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
- `fr-CA-Standard-C` - французский (Канада) (женский 2 голос)
- `fr-CA-Standard-D` - французский (Канада) (мужской 2 голоса)
- `fr-FR-Standard-A` - французский (Франция) (женский голос - будет использоваться, если язык системы FR и язык не указан)
- `fr-FR-Standard-B` - французский (Франция) (мужской голос)
- `fr-FR-Standard-C` - французский (Франция) (женский 2 голос)
- `fr-FR-Standard-D` - французский (Франция) (мужской 2 голос)
- `de-DE-Standard-A` - немецкий (Германия) (женский голос - будет использоваться, если язык системы DE и язык не указан)
- `de-DE-Standard-B` - немецкий (Германия) (мужской голос)
- `el-GR-Standard-A` - греческий (Греция) (женский голос)
- `hi-IN-Standard-A` - хинди (Индия) (женский голос)
- `hi-IN-Standard-B` - хинди (Индия) (мужской голос)
- `hi-IN-Standard-C` - хинди (Индия) (мужской 2 голос)
- `hu-HU-Standard-A` - венгерский (Венгрия) (женский голос)
- `id-ID-Standard-A` - индонезийский (Индонезия) (женский голос)
- `id-ID-Standard-B` - индонезийский (Индонезия) (мужской голос)
- `id-ID-Standard-C` - индонезийский (Индонезия) (мужской 2-голосый)
- `it-IT-Standard-A` - итальянский (Италия) (женский голос - будет использоваться, если системным языком является ИТ и язык не указан)
- `it-IT-Standard-B` - итальянский (Италия) (женский 2 голос)
- `it-IT-Standard-C` - итальянский (Италия) (мужской голос)
- `it-IT-Standard-D` - итальянский (Италия) (мужской 2 голоса)
- `ja-JP-Standard-A` - Японский (Япония) (женский голос)
- `ja-JP-Standard-B` - Японский (Япония) (женский 2 голос)
- `ja-JP-Standard-C` - Японский (Япония) (мужской голос)
- `ja-JP-Standard-D` - Японский (Япония) (мужской 2-голосый)
- `ko-KR-Standard-A` - корейский (Южная Корея) (женский голос)
- `ko-KR-Standard-B` - корейский (Южная Корея) (женский 2 голос)
- `ko-KR-Standard-C` - корейский (Южная Корея) (мужской голос)
- `ko-KR-Standard-D` - корейский (Южная Корея) (мужской 2 голос)
- `cmn-CN-Standard-A` - китайский (мандарин) (женский голос)
- `cmn-CN-Standard-B` - китайский (мужской голос)
- `cmn-CN-Standard-C` - китайский (мужской 2 голоса)
- `nb-NO-Standard-A` - норвежский (Норвегия) (женский голос)
- `nb-NO-Standard-B` - норвежский (Норвегия) (мужской голос)
- `nb-NO-Standard-C` - норвежский (Норвегия) (женский 2 голос)
- `nb-NO-Standard-D` - норвежский (Норвегия) (мужской 2 голос)
- `nb-no-Standard-E` - норвежский (Норвегия) (женский 3 голос)
- `pl-PL-Standard-A` - польский (Польша) (женский голос - будет использоваться, если системным языком является PL и язык не указан)
- `pl-PL-Standard-B` - польский (Польша) (мужской голос)
- `pl-PL-Standard-C` - польский (Польша) (мужской 2 голос)
- `pl-PL-Standard-D` - польский (Польша) (женский 2 голос)
- `pl-PL-Standard-E` - польский (Польша) (женский 3 голос)
- `pt-BR-Standard-A` - португальский (Бразилия) (женский голос - будет использоваться, если системным языком является PT и язык не указан)
- `pt-PT-Standard-A` - Португальский (Португалия) (женский голос)
- `pt-PT-Standard-B` - португальский (Португалия) (мужской голос)
- `pt-PT-Standard-C` - португальский (Португалия) (мужской 2 голоса)
- `pt-PT-Standard-D` - Португальский (Португалия) (женский 2 голос)
- `ru-RU-Standard-A` - Русский (Россия) (Женский голос - будет использоваться, если язык системы RU и язык не указан)
- `ru-RU-Standard-B` - Русский (Россия) (мужской голос)
- `ru-RU-Standard-C` - Русский (Россия) (Женский 2 голос)
- `ru-RU-Standard-D` - Русский (Россия) (Мужской 2 голос)
- `sk-SK-Standard-A` - словацкий (Словакия) (женский голос)
- `es-ES-Standard-A` - испанский (Испания) (женский голос - будет использоваться, если язык системы ES и язык не указан)
- `sv-SE-Standard-A` - Шведский (Швеция) (женский голос)
- `tr-TR-Standard-A` - Турецкий (Турция) (женский голос)
- `tr-TR-Standard-B` - Турецкий (Турция) (мужской голос)
- `tr-TR-Standard-C` - турецкий (Турция) (женский 2 голос)
- `tr-TR-Standard-D` - Турецкий (Турция) (Женский 3 голос)
- `tr-TR-Standard-E` - Турецкий (Турция) (мужской голос)
- `uk-UA-Standard-A` - украинский (Украина) (женский голос)
- `vi-VN-Standard-A` - вьетнамский (Вьетнам) (женский голос)
- `vi-VN-Standard-B` - вьетнамский (Вьетнам) (мужской голос)
- `vi-VN-Standard-C` - вьетнамский (Вьетнам) (женский 2 голос)
- `vi-VN-Standard-D` - вьетнамский (Вьетнам) (мужской 2 голос)

СДЕЛАТЬ:

- место проведения

## Автоматическая встроенная клавиатура на основе настроек в админке (Easy-Keyboard)
Для каждого состояния могут быть включены дополнительные настройки:

![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings.png)

При вводе `/cmds` в телеграмме будет отображаться следующая клавиатура:

![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings1.png)

`/cmds` может быть заменен любым текстом (например, "?") в диалоговом окне конфигурации адаптера телеграммы.

Если в диалоговом окне конфигурации адаптера телеграммы включена опция **Использовать комнаты в команде клавиатуры**, то на первом этапе будет показан список комнат. ***Еще не реализовано***

### Настройки в состоянии
Сначала необходимо включить конфигурацию.

#### Псевдоним
Имя устройства. Если имя пустое, имя будет взято из объекта.
При входе в «Дверной светильник» для логического состояния будет показано следующее меню.
![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings2.png)

Вы можете включить устройство, выключить устройство или запросить состояние.
Если вы нажмете `Door lamp ?`, вы получите `Door lamp  => switched off`.

### Только чтение
Если активировано, кнопки ВКЛ/ВЫКЛ не будут отображаться, только `Door lamp ?`.

### Сообщить об изменениях
Если статус устройства изменился (например, кто-то физически включил лампу), новый статус будет доставлен в телеграм.
Например. `Door lamp  => switched on`.

### Кнопки в очереди
Сколько кнопок должно быть показано в строке для одного устройства.
Из-за длинного названия, возможно, лучше отображать только 2 (или даже одну) кнопки в строке.

![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings3.png)

### Только запись
Если эта функция активирована, кнопка запроса состояния (`Door lamp ?`) не будет отображаться.
![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings4.png)

### По команде
Какой текст будет отображаться на кнопке `ON`.
Как здесь: ![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings5.png)

Будет производиться следующая клавиатура: ![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings6.png)

### ВКЛ Текст
Текст, который будет отображаться в отчете о состоянии.
Например. `Door lamp => activated`, если состояние устройства изменилось на истинное, а **ON Text** — `activated`

Тексты ВКЛ/ВЫКЛ будут отображаться только в том случае, если активирована функция **Отчет об изменениях**.

### Команда ВЫКЛ.
То же, что и команда **ON Command**, но для OFF.

### ВЫКЛ Текст
То же, что и **ON Text**, но для OFF.
Например. `Door lamp => deactivated`, если состояние устройства изменилось на false, а текст **ВЫКЛ** имеет значение `deactivated`

### Только правда
Например. для кнопок у них нет состояния OFF. В этом случае кнопка OFF не будет отображаться.

![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings7.png)

## Как получать сообщения в групповых чатах с помощью адаптера Telegram
Если телеграмм-бот получает сообщения, отправленные пользователем боту в приватных чатах, но не получает сообщения, отправленные пользователями в групповых чатах.
В этом случае вы должны поговорить с `@botfather` и отключить режим конфиденциальности.

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
Для простых текстовых сообщений всем пользователям просто поместите текст в полезную нагрузку сообщения и отправьте его в состояние ioBroker `telegram.INSTANCE.communicate.response`.

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

Перед отправкой в `telegram.INSTANCE.communicate.responseJson you need to stringify the object!`

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### __WORK IN PROGRESS__
* (Steff42) Make sure the userid is a string to revent warnings in the log
* 

### 1.15.0 (2022-09-28)
* (klein0r) Fixed custom component (user name was missing)
* (klein0r) Translated all objects
* (bluefox) Updated GUI packages and corrected build process

### 1.14.1 (2022-07-04)
* (bluefox) Fixed warnings for `botSendChatId`

### 1.14.0 (2022-07-02)
* (bluefox) Ported config Gui to Admin 6

### 1.13.0 (2022-06-01)
* (klein0r) Added Admin 5 UI config
* (bluefox) Added rule block for javascript as plugin

### 1.12.6 (2022-04-23)
* (Apollon77) Fixed crash cases reported by Sentry

## License

The MIT License (MIT)

Copyright (c) 2016-2022, bluefox <dogafox@gmail.com>

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