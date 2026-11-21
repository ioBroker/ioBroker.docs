---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.max/README.md
title: ioBroker.max
hash: IChHpHDpNDEUd7lgUQNfCdu6DLrw2r4DPv/BfKTD36Q=
---
![Логотип](../../../en/adapterref/iobroker.max/admin/max.png)

![Стабильный](https://iobroker.live/badges/max-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.max.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.max.svg)
![Лицензия](https://img.shields.io/github/license/sadam6752-tech/ioBroker.max.svg)
![НПМ](https://nodei.co/npm/iobroker.max.png?downloads=true)
![Тестирование и выпуск](https://github.com/sadam6752-tech/ioBroker.max/actions/workflows/test-and-release.yml/badge.svg)
![Количество установок](https://iobroker.live/badges/max-installed.svg)

# IoBroker.max
**Адаптер ioBroker для интеграции с мессенджер-ботом MAX**

Отправляйте и получайте сообщения через бота [MAX мессенджер](https://max.ru) от ioBroker.
Аналог ioBroker.telegram - отправляйте уведомления, получайте команды, управляйте устройствами.

## Функции
- Отправлять сообщения конкретным пользователям или всем известным пользователям.
- Получать сообщения и команды от пользователей.
- Динамические пользовательские объекты, создаваемые при первом контакте.
- Контроль доступа с помощью списка разрешенных идентификаторов пользователей.
- Отправка изображений, видео, аудио и файлов (по локальному пути или URL-адресу HTTP(s), например, снимка с камеры).
- Кнопки под сообщением (меню, как в адаптере Telegram)
- Отвечайте на команды только тому пользователю (или в групповом чате), который их отправил - `communicate.request` / `communicate.response`

как в адаптере Telegram

- Групповые чаты: отправляйте сообщения в группу, в которой состоит бот, и получайте от него сообщения.
- Форматирование текста (Markdown или HTML), идентификаторы сообщений, редактирование и удаление отправленных сообщений.
- Вопросы с кнопками для ответа, которые ожидают ответа («задать вопрос»).
- Уведомления ioBroker (notification-manager) и блоки Blockly для адаптера JavaScript
- Голосовые сообщения сохраняются в виде файлов и озвучиваются в `communicate.pathFile`, как в адаптере Telegram (например, для

распознавание речи другим адаптером)

- Полученные фотографии сохраняются в виде файлов и также отображаются в `communicate.pathFile` (например, для агента ИИ).
- Поддержка функции `sendTo()` для использования в скриптах

## Установка
Установите адаптер через интерфейс ioBroker **Admin**: откройте раздел *Адаптеры*, найдите `max` и установите адаптер из репозитория *Latest* или *Stable*. Ручная установка npm не требуется.

## Конфигурация
1. Создайте бота в мессенджере MAX через **MasterBot** - получите свой токен.
2. Откройте настройки адаптера в административной панели ioBroker.
3. Введите **токен бота**.
4. При желании укажите **разрешенные идентификаторы пользователей** (разделенные запятыми), чтобы ограничить доступ.

Токен бота хранится в **зашифрованном** (`encryptedNative`) и **защищенном** (`protectedNative`): js-контроллер шифрует его с помощью системного секрета, и другие адаптеры не могут его прочитать. В версиях до 0.1.11 он хранился в открытом виде; при первом запуске версии 0.1.12 адаптер самостоятельно перемещает такой токен в зашифрованное хранилище (запись в журнале `The MAX bot token is now stored encrypted`, за которой следует один перезапуск). Если после обновления токен не удается прочитать (запись в журнале `token was rejected` или `token is unreadable`), введите его снова в настройках.

### Сертификат API MAX
API MAX (`platform-api2.max.ru`) использует сертификат, выданный **российским доверенным корневым центром сертификации** Министерства цифрового развития России. Node.js не включает этот корневой сертификат и игнорирует хранилище доверенных сертификатов операционной системы, поэтому соединения будут завершаться ошибкой `fetch failed (UNABLE_TO_GET_ISSUER_CERT_LOCALLY)`. Поэтому адаптер поставляется с этим корневым сертификатом (`lib/certs/russian-trusted-root-ca.pem`, действительным до 2032 года, SHA-256 `D2:6D:2D:02:31:B7:C3:9F:92:CC:73:85:12:BA:54:10:35:19:E4:40:5D:68:B5:BD:70:3E:97:88:CA:8E:CF:31`) и доверяет ему **только для своих собственных запросов к API MAX**. На хосте ничего устанавливать не нужно, и глобальное хранилище доверенных сертификатов Node.js, а также всех других адаптеров остается неизменным.

## Использование
Во всех примерах `123456` обозначает идентификатор пользователя MAX, а `-987654321` - идентификатор группового чата (идентификаторы групповых чатов отрицательные). Пользователь получает идентификатор, как только пишет боту или нажимает **Старт**: он отображается как канал `max.0.users.<userId>` и в `max.0.message.userId`.

### Отправить через штат
Напишите в `max.0.message.send`:

- `"123456|Hello World"` - отправить пользователю 123456 (в качестве идентификатора пользователя используется только числовой префикс)
- «Привет всем» - отправить всем известным пользователям (если включена опция «Отправить всем пользователям»); текст, например:

`"Status|ok"` без числового префикса также отправляется в широковещательной рассылке.

- JSON-объект, например, `{"userId": 123456, "text": "Door", "image": "/opt/iobroker/snapshot.jpg"}` - те же самые поля

как и в случае с `sendTo()` ниже; без `userId` это трансляция.

`max.0.users.<userId>.send` принимает обычный текст (отправленный как есть, включая `|`) или тот же объект JSON без `userId`.

Примеры государственных ценностей:

| Состояние | Ценность | Эффект |
| --- | --- | --- |
| `max.0.message.send` | `123456\|Washing machine is done` | текст пользователю 123456 |
| `max.0.message.send` | `{"userId": 123456, "text": "Front door", "image": "http://192.168.1.20/snapshot.jpg"}` | Фотография с камеры с подписью для пользователя 123456 |
| `max.0.message.send` | `{"text": "Monthly report", "file": "/opt/iobroker/report.pdf"}` | файл для всех известных пользователей |
| `max.0.users.123456.send` | `Hello` | текст для этого пользователя |
| `max.0.users.123456.send` | `{"image": ["/tmp/a.jpg", "/tmp/b.jpg"]}` | два изображения для этого пользователя |
| `max.0.users.123456.send` | `{"video": "/tmp/clip.mp4", "text": "Motion in the garden"}` | видео с субтитрами для этого пользователя |
| `max.0.users.123456.send` | `{"video": "/tmp/clip.mp4", "text": "Движение в саду"}` | видео с подписью для этого пользователя |

### Отправка через скрипт
```javascript
sendTo('max.0', 'send', { userId: '123456', text: 'Hello!' });
// or to all:
sendTo('max.0', 'send', 'Hello everyone!');

// with an answer
sendTo('max.0', 'send', { userId: '123456', text: 'Hello!' }, res => {
    if (res.error) {
        log(`MAX: ${res.error}`, 'warn');
    } else {
        log(`MAX: sent as ${res.messageId}`);
    }
});
```

### Форматирование текста
`format: 'markdown'` или `format: 'html'` форматируют текст с использованием разметки MAX. Для скриптов, написанных для адаптера Telegram, также принимается `parse_mode`: `'HTML'` становится `html`, `'Markdown'` и `'MarkdownV2'` становятся `markdown`.
Без обоих вариантов текст отправляется как обычный текст, как и раньше. Данный формат работает совместно с вложениями и кнопками в `sendTo()`, в значениях состояния JSON (`message.send`, `users.<userId>.send`, `chats.<chatId>.send`) и в `editMessage`.

```javascript
sendTo('max.0', 'send', { userId: 123456, text: '<b>Alarm</b> in the <i>garage</i>', format: 'html' });
sendTo('max.0', 'send', { userId: 123456, text: '**Alarm** in the garage', format: 'markdown' });
sendTo('max.0', 'send', { userId: 123456, text: '<b>Alarm</b>', parse_mode: 'HTML' }); // Telegram style
```

Используется разметка MAX, а не Telegram: текст, экранированный для Telegram MarkdownV2 (`\.`, `\!`), может выглядеть иначе в MAX - удалите экранирование при переносе такого скрипта. Какие теги и элементы Markdown отображает MAX, описано в документации MAX Bot API (<https://dev.max.ru/docs-api>).

### Идентификаторы сообщений, редактирование и удаление
Каждый `send` отвечает идентификатором отправленного сообщения (`messageId`, как `returnMessageIds: true` адаптера Telegram):

| Получатель | Ответ |
| --- | --- |
| Один пользователь / один групповой чат | `{ result: 'sent', messageId: 'mid.…' }` |
| broadcast | `{ result: 'sent', sent, failed, skipped, messages: [{ userId, messageId }], failures: [{ userId, error }] }` |

С помощью идентификатора сообщение можно изменить или удалить позже:

```javascript
sendTo('max.0', 'send', { userId: 123456, text: 'Washing machine: 10 min left' }, res => {
    if (res.messageId) {
        // later: change the text (and the buttons)
        sendTo('max.0', 'editMessage', { messageId: res.messageId, text: 'Washing machine: <b>done</b>', format: 'html' });
        // or remove the message
        // sendTo('max.0', 'deleteMessage', { messageId: res.messageId });
    }
});
```

- `editMessage` `{ messageId, text?, format?, keyboard? }` отвечает `{ result: 'edited', messageId }`. Без

`keyboard` кнопки остаются как есть, `keyboard: null` их удаляют, а на их место появляется новый `keyboard`.

- `deleteMessage` `{ messageId }` отвечает `{ result: 'deleted', messageId }`.
- Ошибки возвращаются в виде `{ error }` (см. [Устранение неполадок](#answers-of-sendto)).

### Вопросы с кнопками для ответов (задать вопрос)
`ask` отправляет вопрос с одной кнопкой на каждый ответ и ожидает ответа от пользователя, которому был задан вопрос (или от любого участника группового чата, которому был задан вопрос). Функция обратного вызова получает ответ:

```javascript
sendTo('max.0', 'ask', {
    userId: 123456,                        // or chatId: -987654321
    text: 'Open the gate?',
    answers: ['Yes', 'No'],
    timeout: 60,                           // seconds, default 60, at most 3600
}, answer => {
    if (answer.data === '0') {             // index of the pressed answer
        setState('0_userdata.0.gate', true);
    }
    // answer = { data: '0', text: 'Yes', userId, chatId, messageId }, or { timeout: true } without an answer
});
```

Нажатая кнопка подтверждается в MAX текстом ответа. Ответы не записываются в `communicate.request`.
Открытые вопросы заканчиваются на `{ error: 'Adapter stopped' }`, когда экземпляр останавливается.

### Уведомления ioBroker
Адаптер получает уведомления от ioBroker (`supportedMessages.notifications`), подобно адаптеру Telegram: выберите `max.0` в настройках адаптера **notification-manager**. Уведомление отправляется в формате HTML без звука, с указанием категории, хоста и последнего сообщения каждого экземпляра:

- каждому пользователю в списке **Разрешенные идентификаторы пользователей** - а также пользователям, которые еще неизвестны (они должны были нажать кнопку **Пуск**).

бот, в противном случае MAX отклоняет сообщение);

- без предоставления этого списка каждому известному пользователю.

Параметр **Отправлять всем известным пользователям** **не** применяется к уведомлениям. Адаптер отвечает `{ sent: true }`, если хотя бы один пользователь получил уведомление, в противном случае `{ sent: false }`, чтобы менеджер уведомлений мог попробовать отправить уведомление следующему пользователю.

### Сообщения для скриптов и агентов ИИ (справка)
`sendTo('max.0', 'help', {})` отвечает `{ help, commands }`: `help` описывает все команды с их параметрами и ответами на английском языке для агентов ИИ (например, ioBroker.pi-agent) и авторов скриптов; `commands` перечисляет каждую команду с `write` (`true` когда она отправляет, изменяет или удаляет что-либо). Это работает даже когда бот не запущен.

### Блокли
Адаптер добавляет два блока в категорию **sendTo** адаптера JavaScript:

| Блок | Генерирует |
| --- | --- |
| **МАКС.** - экземпляр, сообщение, идентификатор пользователя или идентификатор группового чата (оба пусты = все известные пользователи), формат, без уведомления, вложение (изображение, файл, видео, аудио: путь или URL), уровень логирования | `sendTo('max.0', 'send', { ... })` |
| **задать вопрос через MAX** - экземпляр, вопрос, идентификатор пользователя или идентификатор группового чата, формат, уровень логирования, ответы (значок шестеренки: добавить ответы), одна ветка на каждый ответ | `sendTo('max.0', 'ask', { ..., answers: [...] }, async (msg) => { if (msg.data == '0') { ... } })` |

При **всех экземплярах** вызов направляется каждому экземпляру адаптера (`sendTo('max', ...)`).

### Сообщения без уведомления
`notify: false` отправляет сообщение без звука или всплывающих окон на телефоне. `disable_notification: true` адаптера Telegram также принимается, поэтому существующие скрипты продолжают работать. Он работает с `sendTo()` и со значениями состояния в формате JSON.

```javascript
sendTo('max.0', 'send', {
    chatId: -987654321,
    text: 'Radiation: ' + getState('0_userdata.0.radiation').val + ' µSv/h',
    notify: false,
});
```

### Отправляйте изображения, видео, аудио и файлы
```javascript
// a picture with a caption
sendTo('max.0', 'send', { userId: 123456, text: 'Front door', image: '/opt/iobroker/iobroker-data/snapshot.jpg' });

// straight from a camera in the local network (credentials in the URL are sent as basic auth)
sendTo('max.0', 'send', { userId: 123456, image: 'http://user:password@192.168.1.20/snapshot.jpg' });

// several attachments in one message
sendTo('max.0', 'send', { userId: 123456, image: ['/tmp/a.jpg', '/tmp/b.jpg'], file: '/opt/iobroker/report.pdf' });

// video and audio
sendTo('max.0', 'send', { userId: 123456, video: '/tmp/clip.mp4' });
sendTo('max.0', 'send', { userId: 123456, audio: '/tmp/doorbell.mp3' });
```

- `image`, `video`, `audio`, `file`: локальный путь к файлу или URL-адрес `http(s)`, отдельная строка или список; `text` - это

Прилагать файл необязательно.

- Адаптер загружает файл самостоятельно (в том числе с устройств в локальной сети, к которым MAX не имеет доступа) и выгружает его в сеть.

Максимальный размер файлов (MAX) - файлы размером более 100 МБ отклоняются.

- При широковещательной рассылке каждое вложение загружается только один раз и отправляется всем пользователям.

Функция обратного вызова получает `{ result: 'sent', messageId }` для одного пользователя, `{ result: 'sent', sent, failed, skipped, messages, failures }` for a broadcast, or `{ error: '...' }`, когда ничего не было доставлено (нет текста или вложения, бот не запущен, `sendToAllUsers` отключен, нет известных пользователей, вложение нечитаемо или загрузка не удалась, доставка не удалась).

Трансляции доходят только до пользователей, которые ранее связывались с ботом и которым это разрешено **идентификаторами разрешенных пользователей**.

### Отвечайте на команды пользователя (как адаптер Telegram)
Каждое сообщение (и каждое нажатие кнопки) публикуется в формате `telegram.0.communicate.request`:

| Состояние | Содержание |
| --- | --- |
| `max.0.communicate.request` | `[Name]text` - записано **последним**, срабатывает при этом состоянии |
| `max.0.communicate.requestChatId` | ID группового чата, `0` для личного диалога |
| `max.0.communicate.requestMessageId` | Максимальный идентификатор сообщения |
| `max.0.communicate.response` | Напишите здесь текст или объект JSON: он будет отправлен в тот же групповой чат или в личное сообщение отправителю |
| `max.0.communicate.pathFile` | полный путь к последнему полученному голосовому сообщению или файлу фотографии (см. [Голосовые сообщения](#голосовые-сообщения), [Фотографии]](#photos)) |
| `max.0.communicate.pathFile` | полный путь к последнему полученному голосовому сообщению или файлу фотографии (см. [Голосовые сообщения](#voice-messages), [Фотографии](#photos)) |

Идентификаторы записываются до запроса, поэтому скрипт, запускаемый событием `communicate.request`, считывает соответствующие значения. Скрипту, написанному для адаптера Telegram, потребуются лишь небольшие изменения:

```javascript
on({ id: 'max.0.communicate.request', ack: true, change: 'any' }, obj => {
    const value = String(obj.state.val);
    const user = value.substring(value.indexOf('[') + 1, value.indexOf(']'));
    const command = value.substring(value.indexOf(']') + 1).trim().toLowerCase();

    if (command === '/start' || command === 'menu') {
        setState('max.0.communicate.response', JSON.stringify({
            text: `Hello ${user}, what do you need?`,
            keyboard: [['Pool', 'Temperature'], ['Lights off']],
        }));
    } else if (command === 'pool') {
        const level = getState('0_userdata.0.pool.level').val;
        const volume = getState('0_userdata.0.pool.volume').val;
        setState('max.0.communicate.response', `Pool level: ${level} m, ${volume} m³`);
    }
});
```

То же самое относится к `sendTo()` и состоянию для каждого пользователя - ответ отправляется только отправителю:

```javascript
on({ id: /^max\.0\.users\.\d+\.last_message$/, ack: true, change: 'any' }, obj => {
    const userId = obj.id.split('.')[3];
    if (String(obj.state.val).trim().toLowerCase() === 'pool') {
        sendTo('max.0', 'send', { userId, text: `Pool level: ${getState('0_userdata.0.pool.level').val} m` });
    }
});
```

### Кнопки (меню)
`keyboard` добавляет кнопки под сообщением: список строк, каждая строка - список кнопок (не более 7 кнопок в строке, 30 строк, 210 кнопок).

| Кнопка | Эффект при нажатии |
| --- | --- |
| `'Pool'` | отправляет `Pool` как сообщение от пользователя - обрабатывается как введенная команда |
| `{ text: 'Website', url: 'https://…' }` | открывает ссылку |
| `{ text: 'Веб-сайт', url: 'https://…' }` | открывает ссылку |

```javascript
sendTo('max.0', 'send', {
    userId: 123456,
    text: 'Garden',
    keyboard: [
        ['Pool', 'Temperature'],
        [{ text: 'Open gate', callback: 'gate_open' }, { text: 'Camera', url: 'http://192.168.1.20/' }],
    ],
});

// confirm a callback button with a short notification
on({ id: 'max.0.communicate.request', ack: true, change: 'any' }, obj => {
    if (String(obj.state.val).endsWith(']gate_open')) {
        const userId = getState('max.0.communicate.requestUserId').val;
        setState('0_userdata.0.gate', true);
        sendTo('max.0', 'answerCallback', { userId, text: 'Gate opens' });
    }
});
```

Клавиатура также работает со значениями состояния в формате JSON, например, `max.0.users.123456.send` = `{"text": "Menu", "keyboard": [["Pool", "Temperature"]]}`.

### Групповые чаты
Добавьте бота в групповой чат в MAX. Адаптер создаст канал `max.0.chats.<chatId>` (названный в честь чата) при добавлении бота или получении первого сообщения. В зависимости от настроек группы, боту могут потребоваться права администратора для получения всех сообщений.

| Состояние | Содержание |
| --- | --- |
| `max.0.chats.<chatId>.last_message` | последнее сообщение в чате |
| `max.0.chats.<chatId>.callback_data` | последняя нажатая кнопка в чате |
| `max.0.chats.<chatId>.send` | текст или JSON (вложения, клавиатура) для отправки в чат |
| `max.0.chats.<chatId>.send` | текст или JSON (вложения, клавиатура) для отправки в чат |

Сообщения в группе также устанавливают значения `max.0.message.chatId` и `max.0.communicate.requestChatId`, поэтому `max.0.communicate.response` отвечает в группе. Члены группы не становятся записями ниже `max.0.users` и не получают широковещательных сообщений.

```javascript
// to a group chat
sendTo('max.0', 'send', { chatId: -987654321, text: 'Washing machine is done' });
sendTo('max.0', 'send', { chatId: -987654321, image: 'http://192.168.1.20/snapshot.jpg', text: 'Doorbell' });
```

По состоянию: `max.0.message.send` = `-987654321|Washing machine is done` (отрицательный ID перед `|` всегда означает групповой чат, никогда не трансляцию), или `max.0.chats.-987654321.send` = `Washing machine is done`. Отрицательный `userId` в `sendTo()` также принимается за `chatId`.

### Голосовые сообщения
Голосовое сообщение от разрешенного пользователя (см. **Идентификаторы разрешенных пользователей**) загружается и сохраняется в папке данных ioBroker:

```
<iobroker-data>/max_<instance>/voice/<message id>.<ext>
```

Например, `/opt/iobroker/iobroker-data/max_0/voice/mid.0000abc.ogg`. Расширение определяется типом содержимого загружаемого файла (или URL-адресом), по умолчанию `.ogg`. Сохраняются 20 самых новых файлов, более старые удаляются.

Затем адаптер записывает данные в следующем порядке:

1. `max.0.communicate.requestChatId`, `max.0.communicate.requestUserId`, `max.0.communicate.requestMessageId` -

отправитель голосового сообщения;

2. `max.0.communicate.pathFile` - полный путь к файлу (всегда с разделителем `/`).

Это тот же контракт, что и `telegram.0.communicate.pathFile` адаптера Telegram, поэтому адаптер или скрипт, расшифровывающий голосовые сообщения Telegram, также может быть направлен на `max.0`. Сообщение, содержащее только голосовое сообщение, не записывает `communicate.request`, `message.received` или `users.<userId>.last_message` с пустым текстом; голосовое сообщение с подписью записывает и текст, и файл.

```javascript
on({ id: 'max.0.communicate.pathFile', ack: true, change: 'any' }, obj => {
    const file = String(obj.state.val);
    if (!file.includes('/voice/')) {
        return;
    }
    const userId = getState('max.0.communicate.requestUserId').val;
    const chatId = getState('max.0.communicate.requestChatId').val;   // 0 = private dialog
    log(`Voice message from ${userId}${chatId ? ` in chat ${chatId}` : ''}: ${file}`);
    // e.g. hand the file to a speech recognition, then answer with
    // sendTo('max.0', 'send', chatId ? { chatId, text } : { userId, text });
});
```

Файл находится на хосте ioBroker экземпляра `max`; потребитель на другом хосте многохостовой системы не может его прочитать. При уровне логирования `debug` адаптер регистрирует типы вложений каждого входящего сообщения (`Attachments of message …: audio{payload:url,token}`) и путь каждого сохраненного голосового сообщения.

### Фотографии
Фотографии от разрешенного пользователя (вложения типа `image`) загружаются и сохраняются как голосовые сообщения, всегда и без каких-либо настроек:

```
<iobroker-data>/max_<instance>/photo/<message id>.<ext>          one photo in the message
<iobroker-data>/max_<instance>/photo/<message id>_<n>.<ext>      several photos: _1, _2, ...
```

Например, `/opt/iobroker/iobroker-data/max_0/photo/mid.0000abc.jpg`. Расширение (`.jpg`, `.png`, `.webp`, `.gif`) определяется типом содержимого загружаемого файла, в противном случае - первыми байтами файла, в противном случае - URL-адресом; `.jpg` по умолчанию. Файлы размером более 20 МБ не загружаются. Сохраняются **50 самых новых файлов** из папки с фотографиями, старые удаляются при сохранении новой фотографии (папка с голосом хранит свои 20 самых новых файлов).

Адаптер записывает данные в следующем порядке:

1. `max.0.communicate.requestChatId`, `max.0.communicate.requestUserId`, `max.0.communicate.requestMessageId` -

отправитель сообщения;

2. `max.0.communicate.pathFile` - один раз для каждой фотографии, с полным путем к файлу (всегда с разделителем `/`);
3. только если сообщение имеет заголовок: `max.0.communicate.request` (`[Name]caption`), как у текстового сообщения.

Фотографии и подпись к одному сообщению имеют одинаковый `communicate.requestMessageId`, поэтому пользователь может объединить их.
Фотография без подписи записывает только `communicate.pathFile`; `communicate.request`, `message.received` и `users.<userId>.last_message` остаются без изменений. Фотографии пользователей, которым это запрещено, не загружаются. Фотография, загрузка которой не удалась, регистрируется как предупреждение (`Photo 1 of 2 from … could not be saved: …`); остальные фотографии и подпись все равно публикуются.

```javascript
const photos = {};   // message id -> list of files

on({ id: 'max.0.communicate.pathFile', ack: true, change: 'any' }, obj => {
    const file = String(obj.state.val);
    if (!file.includes('/photo/')) {
        return;                                  // a voice message
    }
    const messageId = getState('max.0.communicate.requestMessageId').val;
    (photos[messageId] = photos[messageId] || []).push(file);
    log(`Photo ${file} from ${getState('max.0.communicate.requestUserId').val}`);
});

on({ id: 'max.0.communicate.request', ack: true, change: 'any' }, obj => {
    const messageId = getState('max.0.communicate.requestMessageId').val;
    const files = photos[messageId];
    if (files) {
        delete photos[messageId];
        log(`Caption ${obj.state.val} belongs to ${files.join(', ')}`);
    }
});
```

MAX предоставляет одну ссылку для скачивания для каждой фотографии; выбор размера отсутствует, поэтому адаптер сохраняет фотографию в том виде, в котором её предлагает MAX.
Как и в случае с голосовыми сообщениями, файл находится на хосте ioBroker экземпляра `max`.

### Состояние соединения
`max.0.info.connection` становится `true`, пока адаптер получает обновления от MAX API. Потеря соединения регистрируется как предупреждение и автоматически повторяется; токен, отклоненный MAX API, сообщается как ошибка и не повторяется.

### Получать сообщения
Подпишитесь на `max.0.message.received`; перед ним пишутся `max.0.message.userId` (отправитель) и `max.0.message.chatId` (групповой чат, `0` для личного диалога). Чтобы ответить отправителю, предпочтительнее использовать `max.0.communicate.request` или `max.0.users.<userId>.last_message` (см. выше).

### Состояния для каждого пользователя
Каждый пользователь получает свой собственный канал в разделе `max.0.users.<userId>`:

- `last_message` - последнее полученное сообщение
- `отправить` - напишите здесь, чтобы отправить напрямую этому пользователю
- `callback_data` - полезная нагрузка обратного вызова последней кнопки
- `username` - отображаемое имя
- `started` - `true` после того, как пользователь нажал кнопку «Старт» в боте

После перезапуска адаптера известные пользователи восстанавливаются из дерева объектов, поэтому широковещательные сообщения продолжают работать без ожидания повторной записи каждым пользователем.

## Поиск неисправностей
### Найдите причину ошибки
`sendTo()` отвечает на каждый вызов. Записывает ответ - в нем указывается причина:

```javascript
sendTo('max.0', 'send', { chatId: -987654321, text: 'Test' }, res => {
    log('MAX: ' + JSON.stringify(res), res && res.error ? 'warn' : 'info');
});
```

`{"result":"sent"}` означает, что MAX принял сообщение. Для получения более подробной информации установите уровень логирования экземпляра `max.0` на `debug` (Экземпляры → `max.0` → уровень логирования): каждое входящее сообщение будет регистрироваться с указанием отправителя и чата.

### Ответы на `sendTo()`
| Ответ | Причина | Решение |
| --- | --- | --- |
| Нет ответа вообще | Версия адаптера ниже 0.1.6 (нет `messagebox`), или экземпляр не запущен | Обновите адаптер, проверьте, запущен ли `max.0` |
| `Unknown command: …` | `sendTo('max.0', '<command>', …)` с командой, отличной от `send`, `editMessage`, `deleteMessage`, `ask`, `answerCallback`, `sendNotification` или `help` | используйте одну из этих команд |
| `Bot not initialized` | Бот не запущен: нет токена или токен был отклонен при запуске | проверьте лог `max.0` при запуске |
| `sendToAllUsers is disabled` | широковещательная рассылка (без `userId` / `chatId` или в виде обычного текста в `message.send`), пока **Отправлять всем известным пользователям** отключено | включите эту опцию или укажите `userId` / `chatId`. Версии адаптера ниже 0.1.9 не распознают `chatId` и рассматривают такой вызов как широковещательную рассылку |
| `No known users` | широковещательная рассылка, но ни один пользователь еще не написал боту (или ни одного пользователя нет в списке **Разрешенных идентификаторов пользователей**) | разрешить пользователям нажать **Старт** в боте |
| `Delivery failed for all users` | широковещательная рассылка, все отправленные сообщения не удались | см. предупреждения `Failed to send to <userId>` в журнале |
| `Invalid userId: …` / `Invalid chatId: …` | Идентификатор не является целым числом | используйте число из `max.0.users` / `max.0.chats` |
| `Use either userId or chatId` | оба даны | укажите только один из них |
| `Invalid keyboard: …` | неправильно `keyboard` (строка/кнопка с именами сообщений, например, `button 1/2 has no text`) | см. [Кнопки](#buttons-menu) |
| `Invalid image: expected a file path or an http(s) URL` | Вложение не является строкой (то же самое для `video`, `audio`, `file`) | Укажите путь или URL в виде текста |
| `Cannot attach image …: Cannot read …: ENOENT` | файл не существует на хосте ioBroker (`EACCES`: нет прав доступа) | проверьте путь и права доступа пользователя `iobroker` |
| `Cannot attach …: … is too large` | файл размером более 100 МБ | отправить файл меньшего размера |
| `Cannot attach …: Download of … failed: HTTP 401` / `404` | URL требует учетных данных или не существует | `http://user:password@host/…`, проверьте URL в браузере |
| `Cannot attach …: Upload of … failed: HTTP …` | MAX отклонил загрузку (например, из-за типа или размера файла) | попробуйте другой формат |
| `answerCallback needs userId and text` / `No button press of user … to answer` | `answerCallback` без данных или на нажатие кнопки уже был дан ответ | отвечать на каждое нажатие кнопки один раз |
| `Invalid format: …` / `Invalid parse_mode: …` | `format` не является `markdown` / `html`, `parse_mode` не является `HTML` / `Markdown` / `MarkdownV2` | используйте одно из этих значений или опустите его |
| `editMessage needs messageId` / `deleteMessage needs messageId` | `messageId` не указан | возьмите это из ответа `send` |
| `editMessage needs text or keyboard` | `editMessage` без изменений | дать `text` и/или `keyboard` |
| `Edit failed: …` / `Delete failed: …` | MAX отклонил изменение (причина указана ниже, например, сообщение слишком старое или не от этого бота) | проверьте `messageId` |
| `404: …` на `editMessage` / `deleteMessage` | сообщение не существует (уже удалено, неверный идентификатор) | проверьте `messageId` |
| `ask needs userId or chatId` / `ask needs a text` / `ask needs 1 to 30 answers` / `ask: every answer needs a text` | неполный `ask` | дать одному получателю вопрос и 1-30 ответов |
| `{ timeout: true }` (ответ `ask`) | никто не ответил вовремя | поднять `timeout` (секунды, до 3600) |
| `Adapter stopped` (ответ на `ask`) | экземпляр остановлен, пока вопрос открыт | спросить снова |
| `Адаптер остановлен` (ответ на `ask`) | экземпляр остановлен, пока вопрос был открыт | задать вопрос снова |

### Ошибки API MAX
Ошибки, возвращаемые MAX, имеют формат `<HTTP status>: <text>`.

| Ошибка | Причина | Решение |
| --- | --- | --- |
| `401: Invalid access_token` | Токен неверен или был отозван; при запуске в журнале отображается `the token was rejected`, и адаптер не пытается повторно использовать токен | Скопируйте токен еще раз из MasterBot в настройки |
| `403: …` | Бот не может записывать туда данные, например, если у него нет прав в группе или пользователь заблокировал бота | Предоставьте боту права в группе / попросите пользователя снова нажать **Старт** |
| `429: …` | слишком много запросов | отправлять реже, объединять сообщения |
| `400: …` | MAX отклонил содержимое (например, слишком длинный текст - до 4000 символов) | сократить текст, проверить вложения |
| `400: …` | MAX отклонил содержимое (например, слишком длинный текст - до 4000 символов) | сократить текст, проверить вложения |

### Проблемы с подключением (журнал `max.0`)
| Запись в журнале | Причина | Решение |
| --- | --- | --- |
| `fetch failed (UNABLE_TO_GET_ISSUER_CERT_LOCALLY …)` | адаптер ниже версии 0.1.7: Node.js не доверяет сертификату MAX API | обновите адаптер (см. [Сертификат MAX API](#certificate-of-the-max-api)) |
| `fetch failed (ENOTFOUND …)` / `(EAI_AGAIN …)` | DNS: хост не может разрешить `platform-api2.max.ru` | проверьте DNS / доступ в интернет хоста ioBroker |
| `fetch failed (ECONNREFUSED …)` / `(ETIMEDOUT …)` | нет соединения (брандмауэр, прокси, нет интернета) | разрешить исходящий HTTPS для `platform-api2.max.ru` |
| `Connection to the MAX API lost: …` | кратковременное отключение; `info.connection` становится false | ничего - адаптер переподключается и регистрирует `Connected to the MAX API` |
| `Failed to start MAX bot: … Retrying in 60 s` | Нет подключения при запуске | Адаптер повторяет попытку каждые 60 секунд |
| `No MAX bot token configured!` | Поле для токена пустое | Введите токен |
| `The stored MAX bot token is unreadable …` | Токен поврежден (например, версией 0.1.3) | Введите токен еще раз в настройках |
| `The MAX bot token is now stored encrypted (one-time migration)` | обновление с версии до 0.1.11 - информация, а не ошибка | ничего, адаптер перезагружается один раз |
| `Токен бота MAX теперь хранится в зашифрованном виде (однократная миграция)` | обновление с версии до 0.1.11 - информация, а не ошибка | ничего, адаптер перезапускается один раз |

### Сообщения из группы не доходят
Если после добавления бота и добавления пользователя в группу не появляется `max.0.chats.<chatId>`, бот не получает сообщения от группы: сделайте его администратором группы. При уровне логирования `debug` каждое полученное сообщение регистрируется как `Message from <userId> in chat <chatId>: …`.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (sadam6752-tech) `@iobroker/testing` 6.3.2 (repository checker W0037)

### 0.2.2 (2026-11-20)
- (@GermanBluefox) Added the message `help`: a description of all messages for AI agents (e.g. pi-agent), and
  `common.supportedMessages.help`

### 0.2.1 (2026-11-04)
- (sadam6752-tech) Received photos are saved in `<iobroker-data>/max_<instance>/photo/` (several photos of one message
  as `<mid>_1`, `<mid>_2`, ...) and announced in `communicate.pathFile`: request ids first, then one path per photo,
  then the caption in `communicate.request` — all with the same `requestMessageId`; the newest 50 photos are kept

### 0.2.0 (2026-11-04)
- (sadam6752-tech) Text formatting: `format: 'markdown' | 'html'` in `sendTo()`, JSON state values and `editMessage`;
  `parse_mode` of the Telegram adapter is accepted (`HTML` → html, `Markdown` / `MarkdownV2` → markdown)
- (sadam6752-tech) `send` answers with the message id (`messageId`), a broadcast with `messages` and `failures`;
  new commands `editMessage` and `deleteMessage`
- (sadam6752-tech) New command `ask`: question with answer buttons, the callback receives the pressed answer or
  `{ timeout: true }`
- (sadam6752-tech) ioBroker notifications (notification-manager, `supportedMessages.notifications`): sent to the
  allowed users, or to all known users; answered with `{ sent: true | false }`
- (sadam6752-tech) Blockly blocks "MAX" and "ask via MAX" for the JavaScript adapter, in eleven languages

### 0.1.13 (2026-11-03)
- (sadam6752-tech) Voice messages: a voice message from an allowed user is saved in
  `<iobroker-data>/max_<instance>/voice/` (newest 20 files) and its path is written to the new state
  `communicate.pathFile`, after `communicate.requestChatId` / `requestUserId` / `requestMessageId` — the contract of
  the Telegram adapter
- (sadam6752-tech) A message without text (e.g. a pure voice message) no longer writes empty text into
  `communicate.request`, `message.received` and `users.<userId>.last_message`
- (sadam6752-tech) Debug log of the attachment types of incoming messages

### 0.1.12 (2026-10-13)
- (sadam6752-tech) The bot token is stored encrypted (`encryptedNative`, checker W1074). A token stored as plain text by
  an earlier version is moved into encrypted storage automatically on the first start (one restart); the stored plain
  text value is used for that, so the token does not have to be entered again
- (sadam6752-tech) Integration test with a real js-controller for the migration of the token

Older changelog entries can be found in CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 sadam6752-tech sadam6752@gmail.com

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