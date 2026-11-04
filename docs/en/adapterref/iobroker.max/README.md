![Logo](admin/max.png)

# ioBroker.max

![Stable](https://iobroker.live/badges/max-stable.svg)
[![NPM version](https://img.shields.io/npm/v/iobroker.max.svg)](https://www.npmjs.com/package/iobroker.max)
[![Downloads](https://img.shields.io/npm/dm/iobroker.max.svg)](https://www.npmjs.com/package/iobroker.max)
[![License](https://img.shields.io/github/license/sadam6752-tech/ioBroker.max.svg)](LICENSE)

[![NPM](https://nodei.co/npm/iobroker.max.png?downloads=true)](https://nodei.co/npm/iobroker.max/)

[![Test and Release](https://github.com/sadam6752-tech/ioBroker.max/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/sadam6752-tech/ioBroker.max/actions/workflows/test-and-release.yml)
![Number of Installations](https://iobroker.live/badges/max-installed.svg)

**ioBroker adapter for MAX messenger bot integration**

Send and receive messages via [MAX messenger](https://max.ru) bot from ioBroker.  
Analog to ioBroker.telegram — send notifications, receive commands, control devices.

## Features

- Send messages to specific users or all known users
- Receive messages and commands from users
- Dynamic user objects created on first contact
- Access control via allowed user IDs list
- Send images, videos, audio and files (local path or http(s) URL, e.g. a camera snapshot)
- Buttons below a message (menus like in the Telegram adapter)
- Answer commands only to the user (or group chat) that sent them — `communicate.request` / `communicate.response`
  as in the Telegram adapter
- Group chats: send to a group the bot is a member of and receive its messages
- Text formatting (Markdown or HTML), message ids, editing and deleting sent messages
- Questions with answer buttons that wait for the answer (`ask`)
- ioBroker notifications (notification-manager) and Blockly blocks for the JavaScript adapter
- Voice messages are saved as files and announced in `communicate.pathFile`, like in the Telegram adapter (e.g. for
  speech recognition by another adapter)
- Received photos are saved as files and announced in `communicate.pathFile` as well (e.g. for an AI agent)
- `sendTo()` support for use in scripts

## Installation

Install the adapter through the ioBroker **Admin** interface: open *Adapters*, search for
`max` and install the adapter from the *Latest* or *Stable* repository. No manual npm
installation is required.

## Configuration

1. Create a bot in MAX messenger via **MasterBot** — get your token
2. Open adapter settings in ioBroker Admin
3. Enter the **Bot Token**
4. Optionally set **Allowed User IDs** (comma-separated) to restrict access

The bot token is stored **encrypted** (`encryptedNative`) and **protected** (`protectedNative`): the js-controller
encrypts it with the system secret, and other adapters cannot read it. Versions up to 0.1.11 kept it as plain text;
on the first start of 0.1.12 the adapter moves such a token into encrypted storage by itself (log entry
`The MAX bot token is now stored encrypted`, followed by one restart). If the token cannot be read after the update
(log entry `token was rejected` or `token is unreadable`), enter it again in the settings.

### Certificate of the MAX API

The MAX API (`platform-api2.max.ru`) uses a certificate issued by the **Russian Trusted Root CA** of the Russian
Ministry of Digital Development. Node.js does not include this root certificate and ignores the trust store of the
operating system, so connections would fail with `fetch failed (UNABLE_TO_GET_ISSUER_CERT_LOCALLY)`. The adapter
therefore ships this root certificate (`lib/certs/russian-trusted-root-ca.pem`, valid until 2032, SHA-256
`D2:6D:2D:02:31:B7:C3:9F:92:CC:73:85:12:BA:54:10:35:19:E4:40:5D:68:B5:BD:70:3E:97:88:CA:8E:CF:31`) and trusts it
**only for its own requests to the MAX API**. Nothing has to be installed on the host, and the global trust store of
Node.js as well as all other adapters stay untouched.

## Usage

In all examples `123456` stands for the ID of a MAX user and `-987654321` for the ID of a group chat (group chat IDs
are negative). A user gets an ID as soon as they write to the bot or press
**Start**: it appears as channel `max.0.users.<userId>` and in `max.0.message.userId`.

### Send via state

Write to `max.0.message.send`:
- `"123456|Hello World"` — send to user 123456 (only a numeric prefix is taken as a user ID)
- `"Hello everyone"` — send to all known users (if `sendToAllUsers` enabled); a text such as
  `"Status|ok"` without a numeric prefix is sent as a broadcast as well
- a JSON object, e.g. `{"userId": 123456, "text": "Door", "image": "/opt/iobroker/snapshot.jpg"}` — the same fields
  as for `sendTo()` below; without `userId` it is a broadcast

`max.0.users.<userId>.send` accepts plain text (sent as it is, `|` included) or the same JSON object without `userId`.

Examples of state values:

| State | Value | Effect |
| --- | --- | --- |
| `max.0.message.send` | `123456\|Washing machine is done` | text to user 123456 |
| `max.0.message.send` | `Alarm armed` | text to all known users |
| `max.0.message.send` | `{"userId": 123456, "text": "Front door", "image": "http://192.168.1.20/snapshot.jpg"}` | camera picture with caption to user 123456 |
| `max.0.message.send` | `{"text": "Monthly report", "file": "/opt/iobroker/report.pdf"}` | file to all known users |
| `max.0.users.123456.send` | `Hello` | text to this user |
| `max.0.users.123456.send` | `{"image": ["/tmp/a.jpg", "/tmp/b.jpg"]}` | two pictures to this user |
| `max.0.users.123456.send` | `{"video": "/tmp/clip.mp4", "text": "Motion in the garden"}` | video with caption to this user |

### Send via script

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

### Text formatting

`format: 'markdown'` or `format: 'html'` formats the text with the markup of MAX. For scripts written for the Telegram
adapter `parse_mode` is accepted as well: `'HTML'` becomes `html`, `'Markdown'` and `'MarkdownV2'` become `markdown`.
Without both the text is sent as plain text, as before. The format works together with attachments and buttons, in
`sendTo()`, in JSON state values (`message.send`, `users.<userId>.send`, `chats.<chatId>.send`) and in `editMessage`.

```javascript
sendTo('max.0', 'send', { userId: 123456, text: '<b>Alarm</b> in the <i>garage</i>', format: 'html' });
sendTo('max.0', 'send', { userId: 123456, text: '**Alarm** in the garage', format: 'markdown' });
sendTo('max.0', 'send', { userId: 123456, text: '<b>Alarm</b>', parse_mode: 'HTML' }); // Telegram style
```

The markup is the one of MAX, not the one of Telegram: a text escaped for Telegram MarkdownV2 (`\.`, `\!`) may look
different in MAX — remove the escaping when you port such a script. Which tags and Markdown elements MAX renders is
described in the documentation of the MAX Bot API (<https://dev.max.ru/docs-api>).

### Message ids, editing and deleting

Every `send` answers with the id of the sent message (`messageId`, like `returnMessageIds: true` of the Telegram
adapter):

| Recipient | Answer |
| --- | --- |
| one user / one group chat | `{ result: 'sent', messageId: 'mid.…' }` |
| broadcast | `{ result: 'sent', sent, failed, skipped, messages: [{ userId, messageId }], failures: [{ userId, error }] }` |

With the id a message can be changed or removed later:

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

- `editMessage` `{ messageId, text?, format?, keyboard? }` answers `{ result: 'edited', messageId }`. Without
  `keyboard` the buttons stay as they are, `keyboard: null` removes them, a new `keyboard` replaces them.
- `deleteMessage` `{ messageId }` answers `{ result: 'deleted', messageId }`.
- Errors come back as `{ error }` (see [Troubleshooting](#answers-of-sendto)).

### Questions with answer buttons (ask)

`ask` sends a question with one button per answer and waits for the answer of the asked user (or of any member of the
asked group chat). The callback receives the answer:

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

The pressed button is confirmed in MAX with the text of the answer. Answers are not written to `communicate.request`.
Open questions end with `{ error: 'Adapter stopped' }` when the instance stops.

### ioBroker notifications

The adapter receives notifications of ioBroker (`supportedMessages.notifications`), like the Telegram adapter: select
`max.0` in the settings of the **notification-manager** adapter. A notification is sent, as HTML and without sound,
with its category, the host and the newest message of every instance:

- to every user in **Allowed User IDs** — also to users who are not known yet (they must have pressed **Start** in
  the bot, otherwise MAX refuses the message);
- without that list to every known user.

The setting **Send to all known users** does **not** apply to notifications. The adapter answers
`{ sent: true }` when at least one user got the notification, otherwise `{ sent: false }`, so that the
notification-manager can try the next messenger.

### Blockly

The adapter adds two blocks to the category **sendTo** of the JavaScript adapter:

| Block | Generates |
| --- | --- |
| **MAX** — instance, message, user ID or group chat ID (both empty = all known users), format, without notification, attachment (image, file, video, audio: path or URL), log level | `sendTo('max.0', 'send', { ... })` |
| **ask via MAX** — instance, question, user ID or group chat ID, format, log level, answers (gear icon: add answers), one branch per answer | `sendTo('max.0', 'ask', { ..., answers: [...] }, async (msg) => { if (msg.data == '0') { ... } })` |

With **all instances** the call goes to every instance of the adapter (`sendTo('max', ...)`).

### Messages without notification

`notify: false` sends a message silently (no sound or pop-up on the phone). `disable_notification: true` of the
Telegram adapter is accepted as well, so existing scripts keep working. It works in `sendTo()` and in JSON state values.

```javascript
sendTo('max.0', 'send', {
    chatId: -987654321,
    text: 'Radiation: ' + getState('0_userdata.0.radiation').val + ' µSv/h',
    notify: false,
});
```

### Send images, videos, audio and files

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

- `image`, `video`, `audio`, `file`: a local file path or an `http(s)` URL, a single string or a list; `text` is
  optional when an attachment is given.
- The adapter loads the file itself (also from devices in the local network that MAX cannot reach) and uploads it to
  MAX; files above 100 MB are refused.
- A broadcast uploads every attachment only once and sends it to all users.

The callback receives `{ result: 'sent', messageId }` for a single user, `{ result: 'sent', sent, failed, skipped,
messages, failures }` for a broadcast, or `{ error: '...' }` when nothing was delivered (no text or attachment, bot not running,
`sendToAllUsers` disabled, no known users, attachment not readable or upload failed, delivery failed).

Broadcasts only reach users who contacted the bot before and who are allowed by **Allowed User IDs**.

### Answer commands of a user (like the Telegram adapter)

Every message (and every button press) is published like `telegram.0.communicate.request`:

| State | Content |
| --- | --- |
| `max.0.communicate.request` | `[Name]text` — written **last**, trigger on this state |
| `max.0.communicate.requestUserId` | user ID of the sender |
| `max.0.communicate.requestChatId` | group chat ID, `0` for a private dialog |
| `max.0.communicate.requestMessageId` | MAX message ID |
| `max.0.communicate.response` | write a text or a JSON object here: it goes to the same group chat, or privately to the sender |
| `max.0.communicate.pathFile` | full path of the last received voice message or photo file (see [Voice messages](#voice-messages), [Photos](#photos)) |

The IDs are written before the request, so a script triggered by `communicate.request` reads the matching values. A
script written for the Telegram adapter needs only small changes:

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

The same with `sendTo()` and the per-user state — the answer goes only to the sender:

```javascript
on({ id: /^max\.0\.users\.\d+\.last_message$/, ack: true, change: 'any' }, obj => {
    const userId = obj.id.split('.')[3];
    if (String(obj.state.val).trim().toLowerCase() === 'pool') {
        sendTo('max.0', 'send', { userId, text: `Pool level: ${getState('0_userdata.0.pool.level').val} m` });
    }
});
```

### Buttons (menu)

`keyboard` adds buttons below a message: a list of rows, each row a list of buttons (at most 7 per row, 30 rows,
210 buttons).

| Button | Effect when pressed |
| --- | --- |
| `'Pool'` | sends `Pool` as a message of the user — handled like a typed command |
| `{ text: 'Open gate', callback: 'gate_open' }` | the payload `gate_open` arrives in `communicate.request` (`[Name]gate_open`) and `users.<userId>.callback_data` |
| `{ text: 'Website', url: 'https://…' }` | opens the link |

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

The keyboard also works in JSON state values, e.g. `max.0.users.123456.send` =
`{"text": "Menu", "keyboard": [["Pool", "Temperature"]]}`.

### Group chats

Add the bot to a group chat in MAX. The adapter creates the channel `max.0.chats.<chatId>` (named after the chat) when
the bot is added or the first message arrives. Depending on the group settings the bot may need to be an administrator
to receive all messages.

| State | Content |
| --- | --- |
| `max.0.chats.<chatId>.last_message` | last message in the chat |
| `max.0.chats.<chatId>.last_user_id` / `last_username` | sender of the last message |
| `max.0.chats.<chatId>.callback_data` | last button payload pressed in the chat |
| `max.0.chats.<chatId>.send` | text or JSON (attachments, keyboard) to send to the chat |

Messages in a group also set `max.0.message.chatId` and `max.0.communicate.requestChatId`, so
`max.0.communicate.response` answers in the group. Group members do not become entries below `max.0.users` and do not
receive broadcasts.

```javascript
// to a group chat
sendTo('max.0', 'send', { chatId: -987654321, text: 'Washing machine is done' });
sendTo('max.0', 'send', { chatId: -987654321, image: 'http://192.168.1.20/snapshot.jpg', text: 'Doorbell' });
```

Via state: `max.0.message.send` = `-987654321|Washing machine is done` (a negative ID before `|` is always a group
chat, never a broadcast), or `max.0.chats.-987654321.send` = `Washing machine is done`. A negative `userId` in
`sendTo()` is taken as `chatId` as well.

### Voice messages

A voice message from an allowed user (see **Allowed User IDs**) is downloaded and saved in the data folder of ioBroker:

```
<iobroker-data>/max_<instance>/voice/<message id>.<ext>
```

for example `/opt/iobroker/iobroker-data/max_0/voice/mid.0000abc.ogg`. The extension comes from the content type of the
download (or the URL), `.ogg` by default. The newest 20 files are kept, older ones are deleted.

The adapter then writes, in this order:

1. `max.0.communicate.requestChatId`, `max.0.communicate.requestUserId`, `max.0.communicate.requestMessageId` — the
   sender of the voice message;
2. `max.0.communicate.pathFile` — the full path of the file (always with `/` as separator).

This is the same contract as `telegram.0.communicate.pathFile` of the Telegram adapter, so an adapter or script that
transcribes Telegram voice messages can be pointed at `max.0` as well. A message that contains only a voice message
does not write `communicate.request`, `message.received` or `users.<userId>.last_message` with an empty text; a voice
message with a caption writes both the text and the file.

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

The file lies on the ioBroker host of the `max` instance; a consumer on another host of a multihost system cannot read
it. With log level `debug` the adapter logs the attachment types of every incoming message
(`Attachments of message …: audio{payload:url,token}`) and the path of every saved voice message.

### Photos

Photos from an allowed user (attachments of type `image`) are downloaded and saved like voice messages, always and
without a setting:

```
<iobroker-data>/max_<instance>/photo/<message id>.<ext>          one photo in the message
<iobroker-data>/max_<instance>/photo/<message id>_<n>.<ext>      several photos: _1, _2, ...
```

for example `/opt/iobroker/iobroker-data/max_0/photo/mid.0000abc.jpg`. The extension (`.jpg`, `.png`, `.webp`,
`.gif`) comes from the content type of the download, else from the first bytes of the file, else from the URL; `.jpg`
by default. Files larger than 20 MB are not downloaded. The newest **50 files** of the photo folder are kept, older
ones are deleted when a new photo is saved (the voice folder keeps its own newest 20 files).

The adapter writes, in this order:

1. `max.0.communicate.requestChatId`, `max.0.communicate.requestUserId`, `max.0.communicate.requestMessageId` — the
   sender of the message;
2. `max.0.communicate.pathFile` — once for every photo, with the full path of the file (always with `/` as separator);
3. only if the message has a caption: `max.0.communicate.request` (`[Name]caption`), like a text message.

Photos and caption of one message carry the same `communicate.requestMessageId`, so a consumer can put them together.
A photo without caption writes only `communicate.pathFile`; `communicate.request`, `message.received` and
`users.<userId>.last_message` stay untouched. Photos of users that are not allowed are not downloaded. A photo whose
download fails is logged as warning (`Photo 1 of 2 from … could not be saved: …`); the other photos and the caption are
published anyway.

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

MAX delivers one download URL per photo; there is no choice of sizes, so the adapter saves the photo as MAX offers it.
As with voice messages, the file lies on the ioBroker host of the `max` instance.

### Connection state

`max.0.info.connection` is `true` while the adapter receives updates from the MAX API. A lost connection is logged
as a warning and retried automatically; a token that the MAX API rejects is reported as an error and not retried.

### Receive messages

Subscribe to `max.0.message.received`; `max.0.message.userId` (sender) and `max.0.message.chatId` (group chat, `0`
for a private dialog) are written before it. To answer the sender, prefer `max.0.communicate.request` or
`max.0.users.<userId>.last_message` (see above).

### Per-user states

Each user gets their own channel under `max.0.users.<userId>`:
- `last_message` — last received message
- `send` — write here to send directly to this user
- `callback_data` — last button callback payload
- `username` — display name
- `started` — `true` once the user pressed "Start" in the bot

Known users are restored from the object tree after an adapter restart, so
broadcasts keep working without waiting for every user to write again.

## Troubleshooting

### Find the cause of an error

`sendTo()` answers every call. Log the answer — it names the cause:

```javascript
sendTo('max.0', 'send', { chatId: -987654321, text: 'Test' }, res => {
    log('MAX: ' + JSON.stringify(res), res && res.error ? 'warn' : 'info');
});
```

`{"result":"sent"}` means MAX accepted the message. For more details set the log level of the instance `max.0` to
`debug` (Instances → `max.0` → log level): every incoming message is logged with sender and chat.

### Answers of `sendTo()`

| Answer | Cause | Solution |
| --- | --- | --- |
| no answer at all | adapter version below 0.1.6 (no `messagebox`), or the instance is not running | update the adapter, check that `max.0` is running |
| `No text or attachment given` | neither `text` nor `image` / `video` / `audio` / `file` given (a `keyboard` alone is not enough) | add a text |
| `Unknown command: …` | `sendTo('max.0', '<command>', …)` with a command other than `send`, `editMessage`, `deleteMessage`, `ask`, `answerCallback` or `sendNotification` | use one of these commands |
| `Bot not initialized` | the bot is not running: no token, or the token was rejected at start | check the log of `max.0` at start |
| `sendToAllUsers is disabled` | a broadcast (no `userId` / `chatId`, or plain text in `message.send`) while **Send to all known users** is off | enable the option or give `userId` / `chatId`. Adapter versions below 0.1.9 do not know `chatId` and treat such a call as a broadcast |
| `No known users` | broadcast, but no user has written to the bot yet (or none is in **Allowed User IDs**) | let the users press **Start** in the bot |
| `Delivery failed for all users` | broadcast, every single delivery failed | see the warnings `Failed to send to <userId>` in the log |
| `Invalid userId: …` / `Invalid chatId: …` | the ID is not a whole number | use the number from `max.0.users` / `max.0.chats` |
| `Use either userId or chatId` | both given | give only one of them |
| `Invalid keyboard: …` | wrong `keyboard` (the message names row/button, e.g. `button 1/2 has no text`) | see [Buttons](#buttons-menu) |
| `Invalid image: expected a file path or an http(s) URL` | an attachment is not a string (same for `video`, `audio`, `file`) | give a path or URL as text |
| `Cannot attach image …: Cannot read …: ENOENT` | the file does not exist on the ioBroker host (`EACCES`: no permission) | check path and permissions of the `iobroker` user |
| `Cannot attach …: … is too large` | file above 100 MB | send a smaller file |
| `Cannot attach …: Download of … failed: HTTP 401` / `404` | the URL needs credentials or does not exist | `http://user:password@host/…`, check the URL in a browser |
| `Cannot attach …: Upload of … failed: HTTP …` | MAX rejected the upload (e.g. file type or size) | try another format |
| `answerCallback needs userId and text` / `No button press of user … to answer` | `answerCallback` without data, or the button press was already answered | answer each button press once |
| `Invalid format: …` / `Invalid parse_mode: …` | `format` is not `markdown` / `html`, `parse_mode` not `HTML` / `Markdown` / `MarkdownV2` | use one of these values or leave it out |
| `editMessage needs messageId` / `deleteMessage needs messageId` | no `messageId` given | take it from the answer of `send` |
| `editMessage needs text or keyboard` | `editMessage` with nothing to change | give `text` and/or `keyboard` |
| `Edit failed: …` / `Delete failed: …` | MAX refused the change (the reason follows, e.g. the message is too old or not from this bot) | check the `messageId` |
| `404: …` on `editMessage` / `deleteMessage` | the message does not exist (already deleted, wrong id) | check the `messageId` |
| `ask needs userId or chatId` / `ask needs a text` / `ask needs 1 to 30 answers` / `ask: every answer needs a text` | incomplete `ask` | give one recipient, a question and 1–30 answers |
| `{ timeout: true }` (answer of `ask`) | nobody answered in time | raise `timeout` (seconds, up to 3600) |
| `Adapter stopped` (answer of `ask`) | the instance stopped while the question was open | ask again |

### Errors of the MAX API

Errors returned by MAX have the form `<HTTP status>: <text>`.

| Error | Cause | Solution |
| --- | --- | --- |
| `401: Invalid access_token` | the token is wrong or was revoked; at start the log says `the token was rejected` and the adapter does not retry | copy the token again from MasterBot into the settings |
| `404: Chat not found` | the bot of this adapter is **not a member** of the group, or the chat ID is wrong. Typical when the ID was taken from a script that used another bot | add the bot of this adapter (the token in the settings) to the group, write a message there and take the ID from `max.0.chats.<chatId>` |
| `403: …` | the bot may not write there, e.g. no rights in the group or the user blocked the bot | give the bot rights in the group / ask the user to press **Start** again |
| `429: …` | too many requests | send less often, combine messages |
| `400: …` | MAX rejected the content (e.g. a text that is too long — up to 4000 characters) | shorten the text, check the attachments |

### Connection problems (log of `max.0`)

| Log entry | Cause | Solution |
| --- | --- | --- |
| `fetch failed (UNABLE_TO_GET_ISSUER_CERT_LOCALLY …)` | adapter below 0.1.7: Node.js does not trust the certificate of the MAX API | update the adapter (see [Certificate of the MAX API](#certificate-of-the-max-api)) |
| `Voice message from <userId> could not be saved: …` | the download of a voice message failed (cause in the message) | check the connection; the next voice message is tried again |
| `fetch failed (ENOTFOUND …)` / `(EAI_AGAIN …)` | DNS: the host cannot resolve `platform-api2.max.ru` | check DNS / internet access of the ioBroker host |
| `fetch failed (ECONNREFUSED …)` / `(ETIMEDOUT …)` | no connection (firewall, proxy, no internet) | allow outgoing HTTPS to `platform-api2.max.ru` |
| `Connection to the MAX API lost: …` | short outage; `info.connection` turns false | nothing — the adapter reconnects and logs `Connected to the MAX API` |
| `Failed to start MAX bot: … Retrying in 60 s` | no connection at start | the adapter retries every 60 s |
| `No MAX bot token configured!` | the token field is empty | enter the token |
| `The stored MAX bot token is unreadable …` | the token was damaged (e.g. by version 0.1.3) | enter the token again in the settings |
| `The MAX bot token is now stored encrypted (one-time migration)` | update from a version up to 0.1.11 — information, not an error | nothing, the adapter restarts once |

### Messages from a group do not arrive

If `max.0.chats.<chatId>` does not appear after the bot was added and someone wrote in the group, the bot does not
receive the group messages: make it an administrator of the group. With log level `debug` every received message is
logged as `Message from <userId> in chat <chatId>: …`.

## Changelog

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

### 0.1.11 (2026-10-13)
- (sadam6752-tech) Remove "ioBroker" from `common.keywords` of `io-package.json` (checker W1068); it stays in
  `package.json`
- (sadam6752-tech) Update `@iobroker/testing` to 6.3.0 (checker W0037)

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