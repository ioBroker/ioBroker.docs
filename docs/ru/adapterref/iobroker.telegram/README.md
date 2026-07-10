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
hash: LIH4I86GIbO4wPtQSMlDymm3ec/3Yr+mpvSGK9W66kw=
---
![Логотип](../../../en/admin/telegram.png)

# IoBroker.telegram
## Конфигурация
Попросите [@BotFather](https://telegram.me/botfather) создать нового бота `/newbot`.

Вам будет предложено ввести имя бота, а затем имя пользователя.
После этого вы получите токен.

![Скриншот](../../../en/adapterref/iobroker.telegram/img/chat.png)

В диалоговом окне настроек необходимо установить пароль для связи. После этого запустите адаптер.

Чтобы начать разговор с вашим ботом, вам необходимо авторизовать пользователя с помощью `/password phrase`, где **`phrase`** — это ваш настроенный пароль. Затем откройте новый разговор с созданным ботом в Telegram и введите пароль в качестве первой команды.

**Примечание:** можно использовать сокращенную форму `/p phrase`.

Чтобы добавить красивую аватарку, введите `/setuserpic` в чате **BotFather** и загрузите ему желаемое изображение (512x512 пикселей), например, такое [логотип](img/logo.png).

Вы можете отправить сообщение всем авторизованным пользователям через окно сообщения `sendTo('telegram', 'Test message')` или конкретному пользователю `sendTo('telegram', '@userName Test message')`.
Пользователь должен пройти предварительную аутентификацию.

Таким же образом можно указать и пользователя:

```javascript
sendTo('telegram', {user: 'UserName', text: 'Test message'}, function (res) {
    console.log('Sent to ' + res + ' users');
});
```

Если вы используете приведенный выше пример, имейте в виду, что вам необходимо заменить «UserName» либо на имя, либо на публичное имя пользователя Telegram, которому вы хотите отправить сообщение. (Это зависит от того, включена ли опция «Сохранять имя пользователя, а не имя» в настройках адаптера). Если эта опция включена, и пользователь не указал публичное имя пользователя в своем аккаунте Telegram, адаптер продолжит использовать имя пользователя. Имейте в виду, что если пользователь позже укажет публичное имя пользователя (после аутентификации в вашем боте), сохраненное имя будет заменено именем пользователя при следующей отправке сообщения боту.

Можно указать более одного получателя (просто разделите имена пользователей запятой).

Например, получатель: "User1,User4,User5"

Вы также можете отправлять сообщения через состояние, просто установите состояние *"telegram.INSTANCE.communicate.response"* со значением *"@userName Test message"* или с помощью объекта JSON:

```json
{
    "text": "Test message"
}
```

Синтаксис JSON также позволяет добавлять параметры из [API ботов Telegram](https://core.telegram.org/bots/api), а также задавать имя пользователя или идентификатор чата:

```json
{
    "text": "Test message, but with *bold*",
    "parse_mode": "Markdown",
    "chatId": "1234567890",
    "user": "UserName"
}
```

Вы также можете установить значение `parse_mode` в тексте:

```
sendTo('telegram', {user: 'UserName', text: '<MarkdownV2>Test message, but with *bold*</MarkdownV2>'}, function (res) {
   console.log('Sent to ' + res + ' users');
});
```

или

```
setState('telegram.0.communicate.response', '<MarkdownV2>Test message, but with *bold*</MarkdownV2>');
```

Чтобы отправлять сообщения в группы, необходимо пригласить бота в ту группу, в которую вы хотите, чтобы бот отправлял сообщения.
Указав `chat_id` в полезную нагрузку JSON-сообщения, вы сможете фактически отправлять сообщения в эти группы.

Чтобы узнать значение `chat_id`, необходимо установить уровень логирования адаптера на `debug`.
Затем вы можете просто отправить пинг своему боту в группы, которым вы хотите, чтобы бот отправлял сообщения.
Убедитесь, что вы добавили `/` перед сообщением, чтобы бот его увидел ([если включена защита конфиденциальности бота](#How-to-receive-messages-in-group-chats-using-telegram-adapter)).
В логах iobroker отобразится идентификатор чата.

## Использование
Вы можете использовать Telegram с адаптером [текст2команда](https://github.com/ioBroker/ioBroker.text2command). Существует предопределенная схема связи, и вы можете отдавать команды на свой домашний телефон в текстовом виде.

Чтобы отправить фотографию, просто укажите путь к файлу вместо текста или URL: `sendTo('telegram', 'absolute/path/file.png')` или `sendTo('telegram', 'https://telegram.org/img/t_logo.png')`.

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

Следующие сообщения предназначены для выполнения действий:

- *набираю текст* - для текстовых сообщений,
- *upload_photo* - для фотографий,
- *upload_video* - для видео,
- *record_video* - для видео,
- *record_audio* - для аудио,
- *upload_audio* - для аудио,
- *upload_document* - для документов,
- *find_location* - для получения данных о местоположении

В этом случае будет отправлена команда действия.

Описание API Telegram можно найти в разделе [здесь](https://core.telegram.org/bots/api), и вы можете использовать все параметры, определенные в этом API, просто добавив их в объект отправки. Например:

```javascript
sendTo('telegram.0', 'send', {
    text:                   '/tmp/snap.jpg',
    caption:                'Snapshot',
    disable_notification:   true
});
```

**Возможные варианты**:

- *disable_notification*: Отправляет сообщение без звука. Пользователи iOS не получат уведомление, пользователи Android получат уведомление без звука. (для всех типов)
- *parse_mode*: Отправляйте Markdown или HTML, если хотите, чтобы приложения Telegram отображали жирный, курсивный текст фиксированной ширины или встроенные URL-адреса в сообщениях вашего бота. Возможные значения: "Markdown", "MarkdownV2", "HTML" (message)
- *disable_web_page_preview*: Отключает предварительный просмотр ссылок в этом сообщении (message)
- *Подпись*: Подпись к документу, фото или видео, 0-200 символов (видео, аудио, фото, документ)
- *продолжительность*: Длительность отправленного видео или аудио в секундах (аудио, видео)
- *исполнитель*: Исполнитель аудиофайла (аудио)
- *title*: Название трека аудиофайла (аудио)
- *ширина*: Ширина видео (видео)
- *высота*: Высота видео (видео)

Адаптер пытается определить тип сообщения (фото, видео, аудио, документ, стикер, действие, местоположение) в зависимости от текста в сообщении. Если текст представляет собой путь к существующему файлу, сообщение будет отправлено в соответствии с типом.

Местоположение будет определяться по атрибутам широты и долготы:

```javascript
sendTo('telegram.0', 'send', {
    latitude:               52.522430,
    longitude:              13.372234,
    disable_notification:   true
});
```

Место проведения будет определено по атрибутам широта, долгота, название и адрес:

```javascript
sendTo('telegram.0', 'send', {
    latitude:               52.51630462381893,
    longitude:              13.37770039691943,
    title:                  'Brandenburger Tor',
    address:                'Pariser Platz 8, 10117 Berlin',
});
```

### Явные типы сообщений
У вас есть возможность дополнительно указать тип сообщения, если вы хотите отправлять данные в виде буфера.

Возможны следующие типы: *наклейка*, *видео*, *документ*, *аудио*, *фотография*.

```javascript
sendTo('telegram.0', 'send', {
    text: fs.readFileSync('/opt/path/picture.png'),
    type: 'photo'
});
```

### Отправка файлов из файлового хранилища ioBroker или из состояний (URI iob://)
Помимо локального пути к файлу или веб-URL, `text` может быть **URI ioBroker**. Адаптер обрабатывает URI, считывает содержимое и отправляет его с автоматически определенным типом медиафайла (фото, видео, аудио, документ и т. д.). Это особенно полезно, когда файл хранится в файловом хранилище ioBroker за Redis/jsonl, где он **не** существует в локальной файловой системе, поэтому простой путь не подойдет.

Поддерживаются следующие схемы:

- `iobfile://<adapter.instance>/<path>` — файл из файлового хранилища ioBroker.
- `iobstate://<state.id>` — значение штата (см. ниже, как интерпретируется это значение).
- `iobobject://<object.id> /<path> ` — значение, вложенное в объект ioBroker (`path` позволяет перейти к объекту по пути `/`).

```javascript
// send a snapshot that another adapter has written into the file storage
sendTo('telegram.0', 'send', {
    user: 'UserName',
    text: 'iobfile://cameras.0/snapshots/front_door.jpg',
    caption: 'Someone is at the front door',
});

// send a file whose full path is stored in a state
sendTo('telegram.0', 'send', {
    text: 'iobstate://0_userdata.0.lastReport',
});

// take a value out of an object
sendTo('telegram.0', 'send', {
    text: 'iobobject://0_userdata.0.myObject/native/document',
});
```

Тип носителя определяется по расширению файла (`.jpg`/`.png` → фото, `.mp4` → видео, `.mp3`/`.ogg`/`.wav` → аудио, `.gif` → анимация, `.webp` → стикер, `.pdf`/`.csv`/`.docx`/... → документ). Если расширение неизвестно, тип берется из сохраненного MIME-типа; в качестве запасного варианта содержимое отправляется как документ. Вы по-прежнему можете явно переопределить это с помощью параметра `type`.

**Как интерпретируется значение состояния/объекта** (`iobstate://` и `iobobject://`):

- URL-адрес данных (`data:image/png;base64,...`) декодируется и отправляется как соответствующий тип носителя;
- значение, которое само по себе является URI типа `iob*://` или `http(s)://`, обрабатывается дополнительно (до 5 уровней вложенности);
- любая другая строка рассматривается как путь к файлу / URL-адрес;
- Числа, логические значения и объекты передаются в текстовом формате (объекты преобразуются в JSON-строки).

### Клавиатура
Вы можете отобразить разметку клавиатуры **ReplyKeyboardMarkup** на стороне клиента:

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

Вы можете прочитать подробнее в разделе [здесь](https://core.telegram.org/bots/api#replykeyboardmarkup) и [здесь]](https://core.telegram.org/bots#keyboards).

Вы можете отображать встроенную разметку клавиатуры (InlineKeyboardMarkup) на стороне клиента:

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

Вы можете прочитать подробнее в разделе [здесь](https://core.telegram.org/bots/api#inlinekeyboardmarkup) и [здесь]](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating).

**ПРИМЕЧАНИЕ:** *После нажатия пользователем кнопки обратного вызова клиенты Telegram будут отображать индикатор выполнения до тех пор, пока вы не вызовете функцию answerCallbackQuery. Поэтому необходимо реагировать, вызывая answerCallbackQuery, даже если уведомление пользователю не требуется (например, без указания каких-либо необязательных параметров).*

### AnswerCallbackQuery
Этот метод используется для отправки ответов на запросы обратного вызова, отправленные с помощью встроенных клавиатур. Ответ будет отображен пользователю в виде уведомления в верхней части экрана чата или в виде всплывающего окна. В случае успеха возвращается значение *True*.

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

Вы можете прочитать подробнее в разделе [здесь](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegrambotanswercallbackquerycallbackqueryid-text-showalert-options--promise).

### Вопрос
Вы можете отправить сообщение в Telegram, и следующий ответ будет возвращен в функции обратного вызова.
Время ожидания ответа можно установить в конфигурации экземпляра (по умолчанию 60 секунд). Если пользователь не ответит вовремя, вызывается функция обратного вызова со строкой `'__timeout__'` (таким образом, `msg.data` становится `undefined`).

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
    if (msg === '__timeout__') {
        console.log('no answer within the configured timeout');
    } else if (msg.data === '1') {
        console.log('user pressed Yes');
    } else {
        console.log('user pressed No');
    }
});
```

**Важно – у вызывающего объекта есть свой собственный таймаут `sendTo`:** адаптер, отправляющий `ask` (например, адаптер JavaScript), применяет свой **собственный** таймаут к коллбэку `sendTo`, и в адаптере JavaScript по умолчанию он составляет около **20 секунд**. Если настроенный вами таймаут ответа больше этого значения, коллбэк будет запущен *вызывающим объектом* раньше с результатом таймаута – который будет выглядеть так, как будто пользователь ответил «Нет». Увеличьте таймаут вызывающего объекта так, чтобы он был **больше** таймаута ответа, например, в адаптере JavaScript, передав его в качестве последнего аргумента:

```javascript
sendTo('telegram.0', 'ask', {
    text: 'Are you sure?',
    reply_markup: { inline_keyboard: [[{ text: 'Yes!', callback_data: '1' }], [{ text: 'No...', callback_data: '0' }]] }
}, msg => {
    // ... handle msg (see above)
}, { timeout: 65000 }); // must be > the configured answer timeout (here 60 s)
```

## Идентификатор чата
Начиная с версии 0.4.0, вы можете использовать идентификатор чата для отправки сообщений в чат.

```javascript
sendTo('telegram.0', 'send', {
    text: 'Message to chat',
    chatId: 'SOME-CHAT-ID-123'
});
```

## Идентификатор потока
Также можно задать идентификатор потока для супергрупп.

```javascript
sendTo('telegram.0', 'send', {
    text: 'Message to chat',
    chatId: 'SOME-CHAT-ID-123',
    message_thread_id: 7,
});
```

## Получение местоположения
Когда пользователь делится местоположением с ботом (скрепка → местоположение) или отправляет информацию о месте проведения мероприятия, координаты записываются в состояние `telegram.INSTANCE.communicate.requestLocation` в виде строки `latitude;longitude` (роль `value.gps`). Метаданные состояний (`requestChatId`, `requestMessageId`, `requestUserId`) также обновляются, чтобы вы знали, кто отправил информацию.

```javascript
on({ id: 'telegram.0.communicate.requestLocation', change: 'any' }, obj => {
    const [latitude, longitude] = obj.state.val.split(';').map(parseFloat);
    const user = getState('telegram.0.communicate.requestUserId').val;
    console.log(`User ${user} is at ${latitude}, ${longitude}`);
    // e.g. forward the coordinates to a map widget
});
```

## Получение сообщений канала
Если бот является администратором канала, сообщения, опубликованные в этом канале, также принимаются и записываются в `telegram.INSTANCE.communicate.request` в форме `[channel title]text` (вместе с `communicate.requestChatId` и `communicate.requestMessageId`). Сообщения канала анонимны (у них нет пользователя-отправителя), поэтому аутентификация/обработка команд к ним не применяются — они отображаются только по запросу. Любые прикрепленные медиафайлы сохраняются как для обычных сообщений, а канал добавляется в `communicate.chats`.

## Известные чаты и группы
Каждое сообщение, полученное ботом из чата или группы, запоминается в состоянии `telegram.INSTANCE.communicate.chats` как JSON-объект `id => { title, type }` (где `type` — один из `private`, `group`, `supergroup` или `channel`). Это удобно для поиска идентификатора чата группы (например, чтобы другой адаптер мог выбрать группу для отправки сообщения). Добавьте бота в группу и отправьте одно сообщение, чтобы группа появилась.

```json
{
    "1234567": { "title": "John Doe", "type": "private" },
    "-1001234567890": { "title": "My smart home group", "type": "supergroup" }
}
```

Список сохраняется, поэтому он остается активным после перезагрузки адаптера. При отправке используйте идентификатор чата как `chatId`:

```javascript
sendTo('telegram.0', 'send', { text: 'Hello group', chatId: '-1001234567890' });
```

## Обновление сообщений
Следующие методы позволяют изменять существующее сообщение в истории сообщений вместо отправки нового сообщения с результатом действия. Это наиболее полезно для сообщений с *встроенными клавиатурами*, использующими запросы обратного вызова, но также может помочь уменьшить загромождение в диалогах с обычными чат-ботами.

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

Вы можете прочитать подробнее в разделе [здесь](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegramboteditmessagetexttext-options--promise).

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

Вы можете прочитать подробнее в разделе [здесь](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegramboteditmessagetexttext-options--promise).

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

Вы можете прочитать подробнее в разделе [здесь](https://core.telegram.org/bots/api#editmessagemedia).

### EditMessageReplyMarkup
Этот метод позволяет редактировать только разметку ответа в сообщениях, отправленных ботом или через бота (для встроенных ботов). В случае успеха, если отредактированное сообщение отправлено ботом, возвращается отредактированное сообщение; в противном случае возвращается *True*.

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

Вы можете прочитать подробнее в разделе [здесь](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegramboteditmessagereplymarkupreplymarkup-options--promise).

### DeleteMessage
Этот метод позволяет удалить сообщение, включая служебные сообщения, со следующими ограничениями:

— Сообщение можно удалить только в том случае, если оно было отправлено менее 48 часов назад.

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

Вы можете прочитать подробнее в разделе [здесь](https://github.com/yagop/node-telegram-bot-api/blob/master/doc/api.md#TelegramBot+deleteMessage).

## Реагирование на ответы/сообщения пользователей
Предположим, вы используете только JavaScript без `text2command`.
Вы уже отправили сообщение/вопрос пользователю, используя `sendTo()`, как описано выше.
Пользователь отвечает на это, нажав кнопку или написав сообщение.
Вы можете извлечь команду и дать обратную связь пользователю, выполнить команды или изменить состояние в iobroker.

- telegram.0 — это ваш экземпляр Telegram-сервера iobroker, который вы хотите использовать.
- Пользователь - это пользователь, зарегистрированный в вашем TelegramBot, который отправил сообщение.
- команда - это команда, полученная вашим Telegram-ботом.

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
### /state stateName - чтение значения состояния
Вы можете запросить значение состояния, если знаете его идентификатор:

```
/state system.adapter.admin.0.memHeapTotal
> 56.45
```

### /state stateName value - установить значение состояния
Вы можете установить значение состояния, если знаете его идентификатор:

```
/state hm-rpc.0.JEQ0ABCDE.3.STOP true
> Done
```

## Режим опроса или серверный режим
При использовании режима опроса адаптер по умолчанию опрашивает Telegram-сервер на наличие обновлений каждые 300 мс. Он использует трафик, и сообщения могут задерживаться на время, равное интервалу опроса. Интервал опроса можно определить в конфигурации адаптера.

Для использования серверного режима ваш экземпляр ioBroker должен быть доступен из интернета (например, с использованием службы динамического DNS `noip.com`).

Telegram может работать только с HTTPS-серверами, но вы можете использовать сертификаты **Let's Encrypt**.

Для серверного режима необходимо указать следующие параметры:

- URL - в формате https://yourdomain.com:8443.
- IP - IP-адрес, к которому будет привязан сервер. По умолчанию 0.0.0.0. Не меняйте его, если не уверены.
- Порты - на самом деле Telegram поддерживает только порты 443, 80, 88, 8443, но вы можете перенаправлять порты на любой сервер через свой роутер.
- Публичный сертификат - требуется, если **Let's Encrypt** отключен.
- Закрытый ключ - необходим, если функция **Let's Encrypt** отключена.
- Сертификат цепочки поставок (необязательно)
- Параметры Let's Encrypt - Настроить сертификаты **Let's Encrypt** очень просто. Подробнее об этом можно прочитать [здесь](https://github.com/ioBroker/ioBroker.admin#lets-encrypt-certificates).

## Расширенная безопасность
Аутентификацию пользователей можно отключить. Таким образом, никто новый не сможет пройти аутентификацию.

Чтобы создать список доверенных пользователей, сначала отключите параметр «Не аутентифицировать новых пользователей» и аутентифицируйте всех пользователей, которые должны быть в списке доверенных, отправив сообщение `/password <PASSWORD>`.

Пользователи, отправившие действительный пароль, будут добавлены в список доверенных пользователей.

После этого можно было активировать опцию «Не аутентифицировать новых пользователей», и аутентификация новых пользователей стала невозможна.

Для использования этой опции необходимо активировать параметр "Запоминать авторизованных пользователей".

## Звонки через Telegram
Благодаря API [callmebot](https://www.callmebot.com/) вы можете отправить вызов в свой Telegram-аккаунт, и часть текста будет озвучена с помощью синтезатора речи.

Для этого из JavaScript-адаптера просто вызовите:

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

- `ar-XA-Standard-A` - Арабский (женский голос)
- `ar-XA-Standard-B` - Арабский (мужской голос)
- `ar-XA-Standard-C` - арабский (мужской голос 2)
- `cs-CZ-Standard-A` - Чешский (Чехия) (Женский голос)
- `da-DK-Standard-A` - Датский (Дания) (Женский голос)
- `nl-NL-Standard-A` - Нидерландский (Нидерланды) (Женский голос - будет использоваться, если язык системы - нидерландский, а язык не был указан)
- `nl-NL-Standard-B` - Нидерландский (Нидерланды) (мужской голос)
- `nl-NL-Standard-C` - Нидерландский (Нидерланды) (мужской голос 2)
- `nl-NL-Standard-D` - Нидерландский (Нидерланды) (Женский голос 2)
- `nl-NL-Standard-E` - Нидерландский (Нидерланды) (Женский голос 3)
- `en-AU-Standard-A` - Английский (Австралия) (Женский голос)
- `en-AU-Standard-B` - Английский (Австралия) (Мужской голос)
- `en-AU-Standard-C` - Английский (Австралия) (Женский голос 2)
- `en-AU-Standard-D` - английский (Австралия) (мужской 2 голоса)
- `en-IN-Standard-A` - Английский (Индия) (Женский голос)
- `en-IN-Standard-B` - Английский (Индия) (мужской голос)
- `en-IN-Standard-C` - Английский (Индия) (мужской голос 2)
- `en-GB-Standard-A` - Английский (Великобритания) (Женский голос - будет использоваться, если язык системы — английский и не указан)
- `en-GB-Standard-B` - Английский (Великобритания) (мужской голос)
- `en-GB-Standard-C` - Английский (Великобритания) (Женский голос 2)
- `en-GB-Standard-D` - Английский (Великобритания) (мужской голос 2)
- `en-US-Standard-B` - Английский (США) (мужской голос)
- `en-US-Standard-C` - Английский (США) (женский голос)
- `en-US-Standard-D` - Английский (США) (мужской голос 2)
- `en-US-Standard-E` - Английский (США) (Женский голос 2)
- `fil-PH-Standard-A` - филиппинский (Филиппины) (женский голос)
- `fi-FI-Standard-A` - финский (Финляндия) (женский голос)
- `fr-CA-Standard-A` - Французский (Канада) (женский голос)
- `fr-CA-Standard-B` - Французский (Канада) (мужской голос)
- `fr-CA-Standard-C` - Французский (Канада) (Женский голос 2)
- `fr-CA-Standard-D` - Французский (Канада) (мужской голос 2)
- `fr-FR-Standard-A` - Французский (Франция) (Женский голос - будет использоваться, если язык системы - FR и язык не был указан)
- `fr-FR-Standard-B` - Французский (Франция) (Мужской голос)
- `fr-FR-Standard-C` - Французский (Франция) (Женский голос 2)
- `fr-FR-Standard-D` - Французский (Франция) (мужской голос 2)
- `de-DE-Standard-A` - Немецкий (Германия) (Женский голос - будет использоваться, если язык системы DE и не указан)
- `de-DE-Standard-B` - Немецкий (Германия) (Мужской голос)
- `el-GR-Standard-A` - греческий (Греция) (женский голос)
- `hi-IN-Standard-A` - Хинди (Индия) (Женский голос)
- `hi-IN-Standard-B` - Хинди (Индия) (Мужской голос)
- `hi-IN-Standard-C` - Хинди (Индия) (мужской голос 2)
- `ху-ХУ-Стандарт-А` - Венгерский (Венгрия) (Женский голос)
- `id-ID-Standard-A` - Индонезийский (Индонезия) (Женский голос)
- `id-ID-Standard-B` - Индонезийский (Индонезия) (Мужской голос)
- `id-ID-Standard-C` - Индонезийский (Индонезия) (мужской голос 2)
- `it-IT-Standard-A` - Итальянский (Италия) (Женский голос - будет использоваться, если язык системы - IT и язык не был указан)
- `it-IT-Standard-B` - Итальянский (Италия) (Женский голос 2)
- `it-IT-Standard-C` - Итальянский (Италия) (Мужской голос)
- `it-IT-Standard-D` - Итальянский (Италия) (Мужской голос 2)
- `ja-JP-Standard-A` - Японский (Япония) (Женский голос)
- `ja-JP-Standard-B` - Японский (Япония) (Женский голос 2)
- `ja-JP-Standard-C` - Японский (Япония) (Мужской голос)
- `ja-JP-Standard-D` - Японский (Япония) (мужской голос 2)
- `ko-KR-Standard-A` - корейский (Южная Корея) (женский голос)
- `ko-KR-Standard-B` - Корейский (Южная Корея) (Женский голос 2)
- `ko-KR-Standard-C` - корейский (Южная Корея) (мужской голос)
- `ko-KR-Standard-D` - корейский (Южная Корея) (мужской 2 голоса)
- `cmn-CN-Standard-A` - Китайский язык (мандаринский диалект, женский голос)
- `cmn-CN-Standard-B` - Китайский (мужской голос)
- `cmn-CN-Standard-C` - Китайский мандарин (мужской голос 2)
- `nb-NO-Standard-A` - Норвежский (Норвегия) (женский голос)
- `nb-NO-Standard-B` - Норвежский (Норвегия) (мужской голос)
- `nb-NO-Standard-C` - Норвежский (Норвегия) (Женский голос 2)
- `nb-NO-Standard-D` - Норвежский (Норвегия) (мужской голос 2)
- `nb-no-Standard-E` - Норвежский (Норвегия) (Женский голос 3)
- `pl-PL-Standard-A` - польский (Польша) (Женский голос - будет использоваться, если язык системы - PL и язык не указан)
- `pl-PL-Standard-B` - польский (Польша) (мужской голос)
- `pl-PL-Standard-C` - польский (Польша) (мужской голос 2)
- `pl-PL-Standard-D` - польский (Польша) (женский голос 2)
- `pl-PL-Standard-E` - польский (Польша) (женский голос 3)
- `pt-BR-Standard-A` - Португальский (Бразилия) (Женский голос - будет использоваться, если язык системы - PT и не указан)
- `pt-PT-Standard-A` - Португальский (Португалия) (Женский голос)
- `pt-PT-Standard-B` - Португальский (Португалия) (Мужской голос)
- `pt-PT-Standard-C` - Португальский (Португалия) (мужской голос 2)
- `pt-PT-Standard-D` - Португальский (Португалия) (Женский голос 2)
- `ru-RU-Standard-A` - Русский (Россия) (Женский голос - будет использоваться, если язык системы RU и не указан)
- `ru-RU-Standard-B` - Русский (Россия) (Мужской голос)
- `ru-RU-Standard-C` - Русский (Россия) (Женский голос 2)
- `ru-RU-Standard-D` - Русский (Россия) (Мужской голос 2)
- `sk-SK-Standard-A` - Словацкий (Словакия) (Женский голос)
- `es-ES-Standard-A` - Испанский (Испания) (Женский голос - будет использоваться, если язык системы - ES и не указан)
- `sv-SE-Standard-A` - Шведский (Швеция) (Женский голос)
- `tr-TR-Standard-A` - Турецкий (Турция) (Женский голос)
- `tr-TR-Standard-B` - Турецкий (Турция) (Мужской голос)
- `tr-TR-Standard-C` - Турецкий (Турция) (Женский голос 2)
- `tr-TR-Standard-D` - Турецкий (Турция) (Женский голос 3)
- `tr-TR-Standard-E` - Турецкий (Турция) (Мужской голос)
- `uk-UA-Standard-A` - Украинский (Украина) (Женский голос)
- `vi-VN-Standard-A` - Вьетнамский (Вьетнам) (женский голос)
- `vi-VN-Standard-B` - Вьетнамский (Вьетнам) (мужской голос)
- `vi-VN-Standard-C` - Вьетнамский (Вьетнам) (Женский голос 2)
- `vi-VN-Standard-D` - Вьетнамский (Вьетнам) (мужской голос 2)

TODO:

- место проведения

## Автоматическое встраивание клавиатуры на основе настроек в административной панели (Easy-Keyboard)
Для каждого штата можно было включить дополнительные настройки:

![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings.png)

При вводе `/cmds` в Telegram отобразится следующая раскладка клавиатуры:

![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings1.png)

`/cmds` можно заменить любым текстом (например, "?") в диалоговом окне настроек телеграм-адаптера.

Если в диалоговом окне настроек Telegram-адаптера включена опция **Использовать комнаты в командах клавиатуры**, то на первом шаге будет показан список комнат. ***Пока не реализовано***

### Настройки в состоянии
Во-первых, необходимо включить эту конфигурацию.

#### Псевдоним
Название устройства. Если поле имени пустое, имя будет взято из объекта.
При вводе "Дверная лампа" отобразится следующее меню для логического состояния.

![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings2.png)

Вы можете включить устройство, выключить устройство или запросить его состояние.
Если вы нажмете `Door lamp ?`, вы получите `Door lamp  => switched off`.

### Только для чтения
Если активировано, кнопки ВКЛ/ВЫКЛ не будут отображаться, будет только `Door lamp ?`.

### Сообщить об изменениях
Если состояние устройства изменилось (например, кто-то физически включил лампу), новое состояние будет отправлено в Telegram.
Например, `Door lamp  => switched on`.

### Кнопки в ряд
Сколько кнопок должно отображаться в строке для одного устройства?
Из-за длинного названия, возможно, лучше отображать только 2 (или даже одну) кнопку в строке.

![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings3.png)

### Только для записи
Если кнопка запроса статуса (`Door lamp ?`) активирована, она не будет отображаться.

![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings4.png)

### Команда ВКЛ
Какой текст будет отображаться на кнопке `ON`?

Например: ![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings5.png)

В результате будет создана следующая клавиатура: ![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings6.png)

### ВКЛ Текст
Текст, который будет отображаться в отчете о состоянии.

Например, `Door lamp => activated`, если состояние устройства изменилось на true, а **текст включения** равен `activated`

Текстовые сообщения, указывающие на включение/выключение функции, будут отображаться только в том случае, если активирована функция **Отчет об изменениях**.

### Команда ВЫКЛ.
То же самое, что и **команда ВКЛ**, но для ВЫКЛ.

### ВЫКЛ Текст
То же самое, что и **текст ВКЛ**, но для ВЫКЛ.

Например, `Door lamp => deactivated`, если состояние устройства изменилось на false, а **текст ВЫКЛ** равен `deactivated`

### Только правда
Например, у кнопок нет состояния «ВЫКЛ». В этом случае кнопка «ВЫКЛ» не будет отображаться.

![настройки](../../../en/adapterref/iobroker.telegram/img/stateSettings7.png)

## Как получать сообщения в групповых чатах с помощью адаптера Telegram
Если Telegram-бот получает сообщения, отправленные пользователем в личные чаты, но не получает сообщения, отправленные пользователями в групповые чаты,

В этом случае вам необходимо связаться с `@botfather` и отключить режим конфиденциальности.

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

## Как отправлять сообщения через Node-RED
Для отправки простых текстовых сообщений всем пользователям достаточно поместить текст в полезную нагрузку сообщения и отправить его в состояние ioBroker `telegram.INSTANCE.communicate.response`.

Если вы хотите задать дополнительные параметры, заполните полезную нагрузку JSON-объектом, например:

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
### 5.0.0-alpha.0 (2026-07-10)
- (@GermanBluefox) Channel posts (from a channel where the bot is an admin) are now received and written to `communicate.request`/`communicate.requestChatId` (previously ignored)
- (@GermanBluefox) Robustness: all `setState` calls now catch their errors (via a `setStateSafe` helper), so a failing state write can no longer cause an unhandled promise rejection
- (@GermanBluefox) Added the state `communicate.chats`: every chat/group the bot receives a message from is remembered as JSON (`id => {title, type}`), so other adapters can offer a chat/group picker
- (@GermanBluefox) Outgoing messages that fail because telegram is unreachable are now queued in memory and resent automatically once the connection is back (bounded queue, permanent errors like "chat not found" are not retried)
- (@GermanBluefox) Documented that an unanswered `ask` returns the string `'__timeout__'`, and that the calling adapter's own `sendTo` timeout (JavaScript adapter defaults to ~20 s) must be larger than the configured answer timeout - otherwise the callback fires early (looks like a "No" answer)
- (@GermanBluefox) A received location or venue is now written to the new state `communicate.requestLocation` as `latitude;longitude` (role `value.gps`), so it can be shown e.g. on a map
- (@GermanBluefox) Fixed: recipients can now be mixed by username and first name in one list - a recipient without a public telegram username is matched by first name even when "store username" is active
- (@GermanBluefox) Added the missing translations for the configuration labels (API URL, port, certificates, media quality, ...) in all languages
- (@GermanBluefox) Robustness: all telegram API calls now catch their errors, so a failing call can no longer terminate the adapter with an unhandled promise rejection
- (@GermanBluefox) The inline keyboard of a broadcast `ask` question is now removed for the user who answered (taken from the pressed callback message)
- (@GermanBluefox) Fixed: the adapter no longer crashes (unhandled promise rejection) when the inline keyboard of an answered/timed-out `ask` question cannot be removed (e.g. "message to edit not found")
- (@GermanBluefox) Fixed: `deleteMessage`/`editMessage*` without an explicit `user`/`chatId` is now executed once for the chat given in its options instead of being broadcast to every user (which made the other users fail)
- (@GermanBluefox) The caption of a received photo/video/document is now written to `communicate.request` (like a normal text message), so image captions are no longer lost
- (@GermanBluefox) Added a "Parsemode" option to the "ask via Telegram" Blockly block, so questions can be formatted with HTML/MarkdownV2
- (@GermanBluefox) Added support for sending files directly from the ioBroker file storage via `iobfile://`, `iobobject://` and `iobstate://` URIs (works with Redis/jsonl where the file is not on the local filesystem)
- (@GermanBluefox) The `/password` message is now deleted from the chat after a successful authentication
- (@GermanBluefox) Fixed: `requestChatId`/`requestMessageId`/`requestUserId` are now set when receiving a photo, document or other media
- (@GermanBluefox) Fixed: sending to a recipient by numeric user id (`{ user: "12345" }`) now works
- (@GermanBluefox) Fixed: no longer crashes when a system notification contains an empty messages list
- (@GermanBluefox) Added an optional `ioBroker.assistant` instance: messages that no internal rule/command matched are forwarded to it and its answer is sent back to the chat
- (@GermanBluefox) Migrated the adapter backend to TypeScript; texts are now provided as `i18n` JSON files loaded via `I18n`
- (@GermanBluefox) The target instance is now checked to be alive before a message is forwarded (text2command/assistant)
- (@GermanBluefox) States without a value are now reported as "uncertain" instead of showing an unset boolean as "ON"
- (@GermanBluefox) Timers are now managed by the adapter and cleared on unload (including pending question timeouts)
- (@GermanBluefox) Fixed: the "allow states" option could not be disabled
- (@GermanBluefox) Fixed: a question timeout could drop other pending questions
- (@GermanBluefox) Fixed: `communicate.responseSilentJson` acknowledged the wrong state
- (@GermanBluefox) Fixed: removed a stray empty entry from the generated command keyboard
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
* (@klein0r) admin 7.6.17 and js-controller 6.0.11 (or later) are required
* (@klein0r) Updated dependencies

### 4.1.0 (2025-03-19)
* (bluefox) Admin component was migrated to TypeScript
* (bluefox) Node.js >= 20.x and js-controller >= 6 and admin >= 7 are required now.

### 4.0.0 (2025-01-13)
* NodeJS >= 20.x and js-controller >= 6 are required
* (simatec) Responsive Design added
* (klein0r) Allow async function calls in ask callback function

### 3.9.0 (2024-07-22)
* (klein0r) Added option to send venue (with title and address)

### 3.8.2 (2024-07-16)
* (bluefox) Username can consist of more than one user. The separator is comma, semicolon or space.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
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