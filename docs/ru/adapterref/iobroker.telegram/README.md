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
title: ioBroker.телеграмма
hash: 4bqUvopK6VJFk9nKbkT2Fn54ZPPfbBbWrcZEDwLwAJw=
---
![Логотип](../../../en/admin/telegram.png)

# IoBroker.телеграмма
## Конфигурация
Попросите [@BotFather](https://telegram.me/botfather) создать нового бота `/newbot`.

Вам будет предложено ввести имя бота, а затем имя пользователя.
После этого вы получите токен.

![Скриншот](../../../en/adapterref/iobroker.telegram/img/chat.png)

В диалоге конфигурации необходимо задать пароль для связи. После этого запустите адаптер.

Чтобы начать разговор с вашим ботом, вам нужно аутентифицировать пользователя с помощью `/password phrase`, где **`phrase`** — ваш настроенный пароль. Поэтому откройте новый разговор с вашим сгенерированным ботом в Telegram, а затем вам нужно ввести пароль в качестве первой команды.

**Примечание:** вы можете использовать краткую форму `/p phrase`.

Чтобы добавить красивую картинку аватара, введите `/setuserpic` в чате **BotFather** и загрузите ему желаемую картинку (512x512 пикселей), например, эту [логотип](img/logo.png).

Вы можете отправить сообщение всем аутентифицированным пользователям через messageBox `sendTo('telegram', 'Test message')` или конкретному пользователю `sendTo('telegram', '@userName Test message')`.
Пользователь должен быть аутентифицирован заранее.

Вы также можете указать пользователя таким образом:

```javascript
sendTo('telegram', {user: 'UserName', text: 'Test message'}, function (res) {
    console.log('Sent to ' + res + ' users');
});
```

Если вы используете пример выше, имейте в виду, что вам нужно заменить «UserName» либо на имя, либо на Public-Telegram-Username пользователя, которому вы хотите отправить сообщение. (Зависит от того, включена ли настройка «Store username not firstname» в настройках адаптера или нет) Если эта опция установлена и пользователь не указал публичное имя пользователя в своей учетной записи Telegram, то адаптер продолжит использовать имя пользователя. Имейте в виду, что если пользователь позже задаст публичное имя пользователя (после аутентификации в вашем боте), сохраненное имя будет заменено на имя пользователя при следующей отправке сообщения боту.

Можно указать более одного получателя (просто разделите имена пользователей запятой). Например, получатель: "User1,User4,User5"

Вы также можете отправить сообщение через состояние, просто задайте состояние *"telegram.INSTANCE.communication.response"* со значением *"@userName Test message"* или с помощью объекта JSON:

```json
{
    "text": "Test message"
}
```

Синтаксис JSON также позволяет добавлять параметры из [API телеграмм-ботов](https://core.telegram.org/bots/api), а также устанавливать идентификатор пользователя или чата:

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

Чтобы отправлять сообщения в группы, вам нужно пригласить бота в группу, в которой вы хотите, чтобы бот публиковал сообщения. Добавив `chat_id` в полезную нагрузку сообщения JSON, вы фактически можете отправлять сообщения в эти группы.

Чтобы узнать `chat_id`, вам нужно установить уровень журнала адаптера на `debug`.
Затем вы можете просто пинговать своего бота в группах, в которые вы хотите, чтобы бот отправлял сообщения.
Убедитесь, что вы поставили `/` перед сообщением, чтобы бот увидел сообщение ([если включена конфиденциальность бота](#How-to-receive-messages-in-group-chats-using-telegram-adapter)).
Затем журнал iobroker покажет вам идентификатор чата в журналах.

## Использование
Вы можете использовать телеграмму с адаптером [текст2команда](https://github.com/ioBroker/ioBroker.text2command). Существует предопределенная схема связи, и вы можете отдавать команды домой в текстовой форме.

Чтобы отправить фотографию, просто отправьте путь к файлу вместо текста или URL: `sendTo('telegram', 'absolute/path/file.png')` или `sendTo('telegram', 'https://telegram.org/img/t_logo.png')`.

Пример отправки скриншота с веб-камеры в Telegram:

```javascript
function sendImage() {
    httpGet('https://raw.githubusercontent.com/ioBroker/ioBroker.javascript/master/admin/javascript.png', { responseType: 'arraybuffer' }, async (err, response) => {
        if (err) {
            console.error(err);
        } else {
            const tempFilePath = createTempFile('telegram-image.png', response.data);

            sendTo('telegram.0', 'send', {
                text: tempFilePath,
                caption: 'A wonderful adapter',
                user: 'yourUserName1,yourUserName2',
            });
        }
    });
}

on('0_userdata.0.someState', (obj) => {
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
- *record_audio* - для аудио,
- *upload_audio* - для аудио,
- *upload_document* - для документов,
- *find_location* - для данных о местоположении

В этом случае будет отправлена команда на действие.

Описание API Telegram можно найти в [здесь](https://core.telegram.org/bots/api), и вы можете использовать все параметры, определенные в этом API, просто включив их в объект send. Например:

```javascript
sendTo('telegram.0', 'send', {
    text:                   '/tmp/snap.jpg',
    caption:                'Snapshot',
    disable_notification:   true
});
```

**Возможные варианты**:

- *disable_notification*: Отправляет сообщение без звука. Пользователи iOS не получат уведомление, пользователи Android получат уведомление без звука. (все типы)
- *parse_mode*: Отправьте Markdown или HTML, если вы хотите, чтобы приложения Telegram отображали жирный, курсивный, фиксированной ширины текст или встроенные URL-адреса в сообщении вашего бота. Возможные значения: "Markdown", "MarkdownV2", "HTML" (сообщение)
- *disable_web_page_preview*: Отключает предварительный просмотр ссылок в этом сообщении (сообщении)
- *подпись*: Подпись к документу, фото или видео, 0-200 символов (видео, аудио, фото, документ)
- *продолжительность*: Продолжительность отправленного видео или аудио в секундах (аудио, видео)
- *исполнитель*: Исполнитель аудиофайла (аудио)
- *title*: Название трека аудиофайла (аудио)
- *ширина*: Ширина видео (видео)
- *высота*: Высота видео (видео)

Адаптер пытается определить тип сообщения (фото, видео, аудио, документ, наклейка, действие, местоположение) в зависимости от текста в сообщении. Если текст представляет собой путь к существующему файлу, он будет отправлен в соответствии с типом.

Местоположение будет определено по широте и долготе атрибута:

```javascript
sendTo('telegram.0', 'send', {
    latitude:               52.522430,
    longitude:              13.372234,
    disable_notification:   true
});
```

Место проведения будет определено по широте, долготе, названию и адресу:

```javascript
sendTo('telegram.0', 'send', {
    latitude:               52.51630462381893,
    longitude:              13.37770039691943,
    title:                  'Brandenburger Tor',
    address:                'Pariser Platz 8, 10117 Berlin',
});
```

### Явные типы сообщений
У вас есть возможность дополнительно определить тип сообщения, если вы хотите отправить данные в виде буфера.

Возможны следующие типы: *стикер*, *видео*, *документ*, *аудио*, *фото*.

```javascript
sendTo('telegram.0', 'send', {
    text: fs.readFileSync('/opt/path/picture.png'),
    type: 'photo'
});
```

### Клавиатура
Вы можете отобразить клавиатуру **ReplyKeyboardMarkup** в клиенте:

```javascript
sendTo('telegram.0', 'send', {
    text: 'Press button',
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

Подробнее можно прочитать [здесь](https://core.telegram.org/bots/api#replykeyboardmarkup) и [здесь](https://core.telegram.org/bots#keyboards).

Вы можете отобразить клавиатуру **InlineKeyboardMarkup** в клиенте:

```javascript
sendTo('telegram', 'send', {
    user: 'my_username;username2', // optional. Separator could be ";" or "," or space
    text: 'Click the button',
    reply_markup: {
        inline_keyboard: [
            [{ text: 'Button 1_1', callback_data: '1_1' }],
            [{ text: 'Button 1_2', callback_data: '1_2' }]
        ]
    }
});
```

Подробнее можно прочитать [здесь](https://core.telegram.org/bots/api#inlinekeyboardmarkup) и [здесь](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating).

**ПРИМЕЧАНИЕ:** *После того, как пользователь нажмет кнопку обратного вызова, клиенты Telegram будут отображать индикатор выполнения, пока вы не вызовете answerCallbackQuery. Поэтому необходимо отреагировать вызовом answerCallbackQuery, даже если уведомление пользователю не требуется (например, без указания каких-либо дополнительных параметров).*

### ОтветОбратныйВызовЗапрос
Используйте этот метод для отправки ответов на запросы обратного вызова, отправленные с помощью встроенных клавиатур. Ответ будет показан пользователю в виде уведомления в верхней части экрана чата или в виде оповещения. В случае успеха возвращается *True*.

```javascript
if (command === '1_2') {
    sendTo('telegram', 'send', {
     user: 'my_username username2', // optional. Separator could be ";" or "," or space
        answerCallbackQuery: {
            text: 'Pressed!',
            showAlert: false, // Optional parameter
        },
   });
}
```

Подробнее можно прочитать [здесь](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegrambotanswercallbackquerycallbackqueryid-text-showalert-options--promise).

### Вопрос
Вы можете отправить сообщение в Telegram, и следующий ответ будет возвращен в обратном вызове.
Тайм-аут можно установить в конфигурации экземпляра (по умолчанию 60 секунд).

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
sendTo('telegram.0', 'send', {
    text: 'Message to chat',
    chatId: 'SOME-CHAT-ID-123'
});
```

## Идентификатор темы
Вы также можете задать идентификатор потока для супергрупп.

```javascript
sendTo('telegram.0', 'send', {
    text: 'Message to chat',
    chatId: 'SOME-CHAT-ID-123',
    message_thread_id: 7,
});
```

## Обновление сообщений
Следующие методы позволяют вам изменить существующее сообщение в истории сообщений вместо отправки нового с результатом действия. Это наиболее полезно для сообщений со *встроенными клавиатурами*, использующими запросы обратного вызова, но также может помочь уменьшить беспорядок в разговорах с обычными чат-ботами.

### EditMessageText
Используйте этот метод для редактирования текста, отправленного ботом или через бота (для встроенных ботов). В случае успеха, если отредактированное сообщение отправлено ботом, возвращается отредактированное сообщение; в противном случае возвращается *True*.

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

*или новый текст для последнего сообщения:*

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

Подробнее можно прочитать [здесь](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegramboteditmessagetexttext-options--promise).

### EditMessageCaption
Используйте этот метод для редактирования заголовка сообщения, отправленного ботом или через бота (для встроенных ботов).
В случае успеха, если отредактированное сообщение отправлено ботом, возвращается отредактированное сообщение; в противном случае возвращается *True*.

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

Подробнее можно прочитать [здесь](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegramboteditmessagetexttext-options--promise).

### EditMessageMedia
Используйте этот метод для редактирования изображения сообщения, отправленного ботом или через бота (для встроенных ботов).
В случае успеха, если отредактированное сообщение отправлено ботом, возвращается отредактированное сообщение; в противном случае возвращается *True*.

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

Подробнее можно прочитать [здесь](https://core.telegram.org/bots/api#editmessagemedia).

### EditMessageReplyMarkup
Используйте этот метод для редактирования только ответной разметки сообщений, отправленных ботом или через бота (для встроенных ботов). В случае успеха, если отредактированное сообщение отправлено ботом, возвращается отредактированное сообщение; в противном случае возвращается *True*.

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

Подробнее можно прочитать [здесь](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegramboteditmessagereplymarkupreplymarkup-options--promise).

### УдалитьСообщение
Используйте этот метод для удаления сообщения, включая служебные сообщения, со следующими ограничениями:

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

Подробнее можно прочитать [здесь](https://github.com/yagop/node-telegram-bot-api/blob/master/doc/api.md#TelegramBot+deleteMessage).

## Реагирование на ответы/сообщения пользователей
Предположим, вы используете только JavaScript без `text2command`.
Вы уже отправили сообщение/вопрос своему пользователю с помощью `sendTo()`, как описано выше.
Пользователь отвечает на это, нажимая кнопку или написав сообщение.
Вы можете извлечь команду и дать обратную связь своему пользователю, выполнить команды или переключить состояния в iobroker.

- telegram.0 — это ваш экземпляр Telegram iobroker, который вы хотите использовать
- пользователь - это зарегистрированный у вас пользователь TelegramBot, который отправил сообщение
- command — это команда, которую получил ваш TelegramBot

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
### /state stateName - прочитать значение состояния
Вы можете запросить значение состояния, если знаете идентификатор:

```
/state system.adapter.admin.0.memHeapTotal
> 56.45
```

### /state stateName значение - установить значение состояния
Вы можете установить значение состояния, если знаете идентификатор:

```
/state hm-rpc.0.JEQ0ABCDE.3.STOP true
> Done
```

## Режим опроса или сервера
Если используется режим опроса, адаптер по умолчанию опрашивает сервер Telegram каждые 300 мс на предмет обновлений. Он использует трафик, и сообщения могут задерживаться на время до интервала опроса. Интервал опроса можно определить в конфигурации адаптера.

Для использования режима сервера экземпляр ioBroker должен быть доступен из Интернета (например, с помощью динамической службы DNS `noip.com`).

Telegram может работать только с HTTPS-серверами, но вы можете использовать сертификаты **let's encrypt**.

Для режима сервера необходимо указать следующие настройки:

- URL - в формате https://yourdomain.com:8443.
- IP - IP-адрес, к которому будет привязан сервер. По умолчанию 0.0.0.0. Не меняйте его, если не уверены.
- Порт - на самом деле Telegram поддерживает только порты 443, 80, 88, 8443, но вы можете перенаправить порты кому угодно через свой маршрутизатор.
- Публичный сертификат - требуется, если **let's encrypt** отключен.
- Закрытый ключ - требуется, если **let's encrypt** отключен.
- Сертификат цепочки (необязательно)
- Параметры Let's encrypt - Очень просто настроить сертификаты **let's encrypt**. Пожалуйста, прочтите [здесь](https://github.com/ioBroker/ioBroker.admin#lets-encrypt-certificates) об этом.

## Расширенная безопасность
Аутентификация пользователей может быть отключена. Так что никто новый не сможет аутентифицироваться.

Чтобы создать список доверенных пользователей, сначала отключите опцию «Не аутентифицировать новых пользователей» и аутентифицируйте всех пользователей, которые должны быть в списке доверенных, отправив сообщение `/password <PASSWORD>`.

Пользователи, отправившие действительный пароль, будут сохранены в доверенном списке.

После этого может быть активирована опция «Не аутентифицировать новых пользователей», и новые пользователи не смогут пройти аутентификацию.

Для использования этой опции необходимо активировать опцию «Запоминать аутентифицированных пользователей».

## Звонки через телеграмм
Благодаря API [callmebot](https://www.callmebot.com/) вы можете совершить звонок на свой аккаунт Telegram, и часть текста будет прочитана с помощью движка TTS.

Чтобы сделать это из адаптера JavaScript, просто вызовите:

```javascript
sendTo('telegram.0', 'call', 'Some text');
```

или

```javascript
sendTo('telegram.0', 'call', {
    text: 'Some text',
    user: '@Username', // optional and the call will be done to the first user in telegram.0.communicate.users.
    lang: 'de-DE-Standard-A', // optional and the system language will be taken
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

Возможные значения для языка:

- `ar-XA-Standard-A` - Арабский (Женский голос)
- `ar-XA-Standard-B` - Арабский (Мужской голос)
- `ar-XA-Standard-C` - Арабский (Мужской 2 голос)
- `cs-CZ-Standard-A` - Чешский (Чешская Республика) (Женский голос)
- `da-DK-Standard-A` - датский (Дания) (женский голос)
- `nl-NL-Standard-A` - голландский (Нидерланды) (женский голос - будет использоваться, если системный язык - NL и язык не был указан)
- `nl-NL-Standard-B` - голландский (Нидерланды) (мужской голос)
- `nl-NL-Standard-C` - голландский (Нидерланды) (мужской 2 голос)
- `nl-NL-Standard-D` - голландский (Нидерланды) (женский 2-й голос)
- `nl-NL-Standard-E` - голландский (Нидерланды) (женский 3-й голос)
- `en-AU-Standard-A` - Английский (Австралия) (Женский голос)
- `en-AU-Standard-B` - Английский (Австралия) (Мужской голос)
- `en-AU-Standard-C` - Английский (Австралия) (Женский 2-й голос)
- `en-AU-Standard-D` - английский (Австралия) (мужской 2 голоса)
- `en-IN-Standard-A` - Английский (Индия) (Женский голос)
- `en-IN-Standard-B` - Английский (Индия) (Мужской голос)
- `en-IN-Standard-C` - Английский (Индия) (Мужской 2 голос)
- `en-GB-Standard-A` - английский (Великобритания) (женский голос - будет использоваться, если системный язык - EN и язык не указан)
- `en-GB-Standard-B` - Английский (Великобритания) (Мужской голос)
- `en-GB-Standard-C` - Английский (Великобритания) (Женский 2-й голос)
- `en-GB-Standard-D` - Английский (Великобритания) (Мужской 2 голос)
- `en-US-Standard-B` - Английский (США) (Мужской голос)
- `en-US-Standard-C` - Английский (США) (Женский голос)
- `en-US-Standard-D` - Английский (США) (Мужской 2 голос)
- `en-US-Standard-E` - Английский (США) (Женский 2-й голос)
- `fil-PH-Standard-A` - Филиппинский (Филиппины) (Женский голос)
- `fi-FI-Standard-A` - финский (Финляндия) (Женский голос)
- `fr-CA-Standard-A` - Французский (Канада) (Женский голос)
- `fr-CA-Standard-B` - французский (Канада) (мужской голос)
- `fr-CA-Standard-C` - французский (Канада) (женский 2-й голос)
- `fr-CA-Standard-D` - французский (Канада) (мужской 2 голос)
- `fr-FR-Standard-A` - французский (Франция) (женский голос - будет использоваться, если системный язык - FR и язык не был указан)
- `fr-FR-Standard-B` - французский (Франция) (мужской голос)
- `fr-FR-Standard-C` - французский (Франция) (женский 2-й голос)
- `fr-FR-Standard-D` - французский (Франция) (мужской 2 голос)
- `de-DE-Standard-A` - немецкий (Германия) (женский голос - будет использоваться, если системный язык - DE и язык не указан)
- `de-DE-Standard-B` - немецкий (Германия) (Мужской голос)
- `el-GR-Standard-A` - Греческий (Греция) (Женский голос)
- `hi-IN-Standard-A` - Хинди (Индия) (Женский голос)
- `hi-IN-Standard-B` - Хинди (Индия) (Мужской голос)
- `hi-IN-Standard-C` - Хинди (Индия) (Мужской 2 голос)
- `hu-HU-Standard-A` - венгерский (Венгрия) (женский голос)
- `id-ID-Standard-A` - Индонезийский (Индонезия) (Женский голос)
- `id-ID-Standard-B` - Индонезийский (Индонезия) (Мужской голос)
- `id-ID-Standard-C` - Индонезийский (Индонезия) (Мужской 2 голос)
- `it-IT-Standard-A` - итальянский (Италия) (женский голос - будет использоваться, если системным языком является IT и язык не указан)
- `it-IT-Standard-B` - Итальянский (Италия) (Женский 2 голос)
- `it-IT-Standard-C` - Итальянский (Италия) (Мужской голос)
- `it-IT-Standard-D` - Итальянский (Италия) (Мужской 2 голос)
- `ja-JP-Standard-A` - Японский (Япония) (Женский голос)
- `ja-JP-Standard-B` - Японский (Япония) (Женский 2-й голос)
- `ja-JP-Standard-C` - Японский (Япония) (Мужской голос)
- `ja-JP-Standard-D` - Японский (Япония) (Мужской 2 голос)
- `ko-KR-Standard-A` - корейский (Южная Корея) (женский голос)
- `ko-KR-Standard-B` - корейский (Южная Корея) (женский 2 голос)
- `ko-KR-Standard-C` - корейский (Южная Корея) (мужской голос)
- `ko-KR-Standard-D` - корейский (Южная Корея) (Мужской 2 голос)
- `cmn-CN-Standard-A` - Мандаринский китайский (женский голос)
- `cmn-CN-Standard-B` - Мандаринский китайский (мужской голос)
- `cmn-CN-Standard-C` - Мандаринский китайский (мужской 2-й голос)
- `nb-NO-Standard-A` - Норвежский (Норвегия) (Женский голос)
- `nb-NO-Standard-B` - Норвежский (Норвегия) (Мужской голос)
- `nb-NO-Standard-C` - Норвежский (Норвегия) (Женский 2-й голос)
- `nb-NO-Standard-D` - Норвежский (Норвегия) (Мужской 2 голос)
- `nb-no-Standard-E` - Норвежский (Норвегия) (Женский 3-й голос)
- `pl-PL-Standard-A` - польский (Польша) (женский голос - будет использоваться, если системным языком является PL и язык не указан)
- `pl-PL-Standard-B` - Польский (Польша) (Мужской голос)
- `pl-PL-Standard-C` - Польский (Польша) (Мужской 2 голос)
- `pl-PL-Standard-D` - Польский (Польша) (Женский 2 голос)
- `pl-PL-Standard-E` - Польский (Польша) (Женский 3 голос)
- `pt-BR-Standard-A` - португальский (Бразилия) (женский голос - будет использоваться, если системным языком является португальский язык и язык не указан)
- `pt-PT-Standard-A` - Португальский (Португалия) (Женский голос)
- `pt-PT-Standard-B` - Португальский (Португалия) (Мужской голос)
- `pt-PT-Standard-C` - Португальский (Португалия) (Мужской 2 голос)
- `pt-PT-Standard-D` - Португальский (Португалия) (Женский 2-й голос)
- `ru-RU-Standard-A` - русский (Россия) (Женский голос - будет использоваться, если системный язык - RU и язык не указан)
- `ru-RU-Standard-B` - Русский (Россия) (Мужской голос)
- `ru-RU-Standard-C` - Русский (Россия) (Женский 2 голос)
- `ru-RU-Standard-D` - Русский (Россия) (Мужской 2 голос)
- `sk-SK-Standard-A` - словацкий (Словакия) (Женский голос)
- `es-ES-Standard-A` - испанский (Испания) (женский голос - будет использоваться, если системный язык - ES и язык не указан)
- `sv-SE-Standard-A` - Шведский (Швеция) (Женский голос)
- `tr-TR-Standard-A` - Турецкий (Турция) (Женский голос)
- `tr-TR-Standard-B` - Турецкий (Турция) (Мужской голос)
- `tr-TR-Standard-C` - Турецкий (Турция) (Женский 2 голос)
- `tr-TR-Standard-D` - Турецкий (Турция) (Женский 3 голос)
- `tr-TR-Standard-E` - Турецкий (Турция) (Мужской голос)
- `uk-UA-Standard-A` - Украинский (Украина) (Женский голос)
- `vi-VN-Standard-A` - вьетнамский (Вьетнам) (женский голос)
- `vi-VN-Standard-B` - вьетнамский (Вьетнам) (мужской голос)
- `vi-VN-Standard-C` - вьетнамский (Вьетнам) (женский 2-й голос)
- `vi-VN-Standard-D` - вьетнамский (Вьетнам) (мужской 2 голос)

ТО, ЧТО ДЕЛАТЬ:

- место проведения

## Автоматическая встроенная клавиатура на основе настроек администратора (Easy-Keyboard)
Для каждого состояния можно включить дополнительные настройки:

![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings.png)

При вводе `/cmds` в Telegram отобразится следующая клавиатура:

![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings1.png)

`/cmds` можно заменить любым текстом (например, «?») в диалоговом окне конфигурации адаптера Telegram.

Если в диалоговом окне конфигурации адаптера Telegram включена опция **Использовать комнаты в клавиатурных командах**, то на первом этапе будет показан список комнат. ***Еще не реализовано***

### Настройки в состоянии
Во-первых, конфигурация должна быть включена.

#### Псевдоним
Имя устройства. Если имя пустое, имя будет взято из объекта.
При вводе «Дверной светильник» будет показано следующее меню для булевого состояния.
![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings2.png)

Вы можете включить устройство, выключить устройство или запросить состояние.
Если вы нажмете `Door lamp ?`, вы получите `Door lamp  => switched off`.

### Только для чтения
Если эта функция активирована, кнопки ВКЛ/ВЫКЛ отображаться не будут, будет отображаться только `Door lamp ?`.

### Сообщить об изменениях
Если статус устройства изменился (например, кто-то физически включил лампу), новый статус будет отправлен в Telegram.
Например, `Door lamp  => switched on`.

### Кнопки в линию
Сколько кнопок должно быть показано в строке для одного устройства.
Из-за длинного названия, возможно, лучше показать только 2 (или даже только одну) кнопки в строке.

![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings3.png)

### Только для записи
Если активировано, кнопка запроса статуса (`Door lamp ?`) не будет отображаться.
![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings4.png)

### Команда ВКЛ
Какой текст будет показан на кнопке `ON`.
Например, здесь: ![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings5.png)

Будет создана следующая клавиатура: ![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings6.png)

### ВКЛ Текст
Текст, который будет показан в отчете о состоянии.
Например, `Door lamp => activated`, если состояние устройства изменилось на true, а **Текст ВКЛ** — `activated`

Тексты ВКЛ/ВЫКЛ будут отображаться только в том случае, если активирована функция **Сообщать об изменениях**.

### Команда ВЫКЛ.
То же, что и **Команда ВКЛ**, но для ВЫКЛ.

### ВЫКЛ Текст
То же, что и **Текст ВКЛ**, но для ВЫКЛ.
Например, `Door lamp => deactivated`, если состояние устройства изменилось на false, а **Текст ВЫКЛ** — `deactivated`

### Только правда
Например, для кнопок, у них нет состояния ВЫКЛ. В этом случае кнопка ВЫКЛ не будет показана.

![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings7.png)

## Как получать сообщения в групповых чатах с помощью адаптера Telegram
Если бот Telegram получает сообщения, отправленные пользователем боту в приватных чатах, но не получает сообщения, отправленные пользователями в групповых чатах.
В этом случае вам необходимо поговорить с `@botfather` и отключить режим приватности.

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

Если вы хотите задать дополнительные параметры, заполните полезную нагрузку объектом JSON, например:

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
### 3.9.0 (2024-07-22)
* (klein0r) Added option to send venue (with title and address)

### 3.8.2 (2024-07-16)
* (bluefox) Username can consist of more than one user. The separator is comma, semicolon or space.

### 3.8.0 (2024-07-14)
* (bluefox) Migrated GUI for Admin 7

### 3.7.1 (2024-07-03)
* (klein0r) Restored translations for messages

### 3.7.0 (2024-07-03)
* (klein0r) Removed default / shadow fiel from Blockly block ask
* (klein0r) Added state to answer last request (same chat)

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