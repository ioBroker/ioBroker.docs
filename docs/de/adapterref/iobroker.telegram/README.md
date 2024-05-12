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
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.telegram/README.md
title: ioBroker.telegram
hash: WOfJHntlnct290cbQ5De/aApPS0pIWQ0PuQtdfMmHik=
---
![Logo](../../../en/admin/telegram.png)

# IoBroker.telegram
## Aufbau
Bitten Sie [@BotFather](https://telegram.me/botfather), einen neuen Bot `/newbot` zu erstellen.

Sie werden aufgefordert, den Namen des Bots und dann den Benutzernamen einzugeben.
Danach erhalten Sie das Token.

![Bildschirmfoto](../../../en/adapterref/iobroker.telegram/img/chat.png)

Im Konfigurationsdialog legen Sie das Passwort für die Kommunikation fest. Starten Sie anschließend den Adapter.

Um eine Konversation mit Ihrem Bot zu beginnen, müssen Sie den Benutzer mit `/password phrase` authentifizieren, wobei **`phrase`** Ihr konfiguriertes Passwort ist. Öffnen Sie also eine neue Konversation mit Ihrem generierten Bot in Telegram und geben Sie dann das Passwort als ersten Befehl ein.

**Hinweis:** Sie können die Kurzform `/p phrase` verwenden.

Um ein schönes Avatarbild hinzuzufügen, geben Sie `/setuserpic` im **BotFather**-Chat ein und laden Sie das gewünschte Bild (512 x 512 Pixel) hoch, wie dieses hier [Logo](img/logo.png).

Sie können die Nachricht an alle authentifizierten Benutzer über die MessageBox `sendTo('telegram', 'Test message')` oder an einen bestimmten Benutzer `sendTo('telegram', '@userName Test message')` senden.
Der Benutzer muss zuvor authentifiziert werden.

Sie können einen Benutzer auch folgendermaßen angeben:

```javascript
sendTo('telegram', {user: 'UserName', text: 'Test message'}, function (res) {
    console.log('Sent to ' + res + ' users');
});
```

Wenn Sie das obige Beispiel verwenden, beachten Sie, dass Sie „Benutzername“ entweder durch den Vornamen oder den öffentlichen Telegram-Benutzernamen des Benutzers ersetzen müssen, an den Sie die Nachricht senden möchten. (Hängt davon ab, ob die Einstellung „Benutzernamen statt Vornamen speichern“ in den Adaptereinstellungen aktiviert ist oder nicht.) Wenn die Option aktiviert ist und der Benutzer in seinem Telegram-Konto keinen öffentlichen Benutzernamen angegeben hat, verwendet der Adapter weiterhin den Vornamen des Benutzers. Beachten Sie, dass, wenn der Benutzer später (nach der Authentifizierung bei Ihrem Bot) einen öffentlichen Benutzernamen festlegt, der gespeicherte Vorname beim nächsten Senden einer Nachricht an den Bot durch den Benutzernamen ersetzt wird.

Es ist möglich, mehr als einen Empfänger anzugeben (trennen Sie die Benutzernamen einfach durch Kommas).
Beispiel: Empfänger: „Benutzer1,Benutzer4,Benutzer5“

Sie können auch eine Nachricht über den Status senden. Legen Sie dazu einfach den Status *"telegram.INSTANCE.communicate.response"* mit dem Wert *"@userName Test message"* oder mit einem JSON-Objekt fest:

```json
{
    "text": "Test message"
}
```

Die JSON-Syntax erlaubt auch das Hinzufügen von Optionen aus [Telegramm-Bots-API](https://core.telegram.org/bots/api) sowie das Festlegen der Benutzer- oder Chat-ID:

```json
{
    "text": "Test message, but with *bold*",
    "parse_mode": "Markdown",
    "chatId": "1234567890",
    "user": "UserName"
}
```

Sie können `parse_mode` auch im Text setzen:

```
sendTo('telegram', {user: 'UserName', text: '<MarkdownV2>Test message, but with *bold*</MarkdownV2>'}, function (res) {
   console.log('Sent to ' + res + ' users');
});
```

oder

```
setState('telegram.0.communicate.response', '<MarkdownV2>Test message, but with *bold*</MarkdownV2>');
```

Um Nachrichten an die Gruppen zu senden, müssen Sie den Bot zu der Gruppe einladen, in der er Beiträge veröffentlichen soll.
Indem Sie der JSON-Nachrichtennutzlast `chat_id` hinzufügen, können Sie tatsächlich Nachrichten an diese Gruppen senden.

Um `chat_id` herauszufinden, müssen Sie die Protokollebene des Adapters auf `debug` setzen.
Sie können Ihren Bot dann einfach in den Gruppen anpingen, an die der Bot Nachrichten senden soll.
Stellen Sie sicher, dass Sie vor der Nachricht ein `/` setzen, damit der Bot die Nachricht sieht ([wenn der Bot-Datenschutz eingeschaltet ist](#How-to-receive-messages-in-group-chats-using-telegram-adapter)).
Das iobroker-Protokoll zeigt Ihnen dann die Chat-ID in den Protokollen an.

## Verwendung
Sie können Telegramm mit dem Adapter [text2command](https://github.com/ioBroker/ioBroker.text2command) verwenden. Es gibt ein vordefiniertes Kommunikationsschema und Sie können Befehle in Textform an Ihr Zuhause senden.

Um ein Foto zu senden, senden Sie einfach einen Pfad zur Datei anstelle von Text oder URL: `sendTo('telegram', 'absolute/path/file.png')` oder `sendTo('telegram', 'https://telegram.org/img/t_logo.png')`.

Beispiel zum Senden eines Screenshots von der Webcam an Telegram:

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

Die folgenden Nachrichten sind für Aktionen reserviert:

- *tippen* - für Textnachrichten,
- *upload_photo* - für Fotos,
- *upload_video* - für Videos,
- *record_video* - für Videos,
- *record_audio* - für Audio,
- *upload_audio* - für Audio,
- *upload_document* - für Dokumente,
- *find_location* - für Standortdaten

In diesem Fall wird der Aktionsbefehl gesendet.

Die Beschreibung der Telegram-API finden Sie unter [Hier](https://core.telegram.org/bots/api). Sie können alle in dieser API definierten Optionen verwenden, indem Sie diese einfach in das Sendeobjekt einbinden. Beispiel:

```javascript
sendTo('telegram.0', {
    text:                   '/tmp/snap.jpg',
    caption:                'Snapshot',
    disable_notification:   true
});
```

**Möglichkeiten**:

- *disable_notification*: Sendet die Nachricht im Hintergrund. iOS-Benutzer erhalten keine Benachrichtigung, Android-Benutzer erhalten eine Benachrichtigung ohne Ton. (alle Typen)
- *parse_mode*: Senden Sie Markdown oder HTML, wenn Telegram-Apps in der Nachricht Ihres Bots fetten, kursiven oder Text mit fester Breite oder Inline-URLs anzeigen sollen. Mögliche Werte: „Markdown“, „MarkdownV2“, „HTML“ (Nachricht)
- *disable_web_page_preview*: Deaktiviert die Linkvorschau für Links in dieser Nachricht (Nachricht)
- *Beschriftung*: Beschriftung für das Dokument, Foto oder Video, 0-200 Zeichen (Video, Audio, Foto, Dokument)
- *Dauer*: Dauer des gesendeten Videos oder Audios in Sekunden (Audio, Video)
- *Interpret*: Interpret der Audiodatei (Audio)
- *Titel*: Titelname der Audiodatei (Audio)
- *Breite*: Videobreite (Video)
- *Höhe*: Videohöhe (Video)

Der Adapter versucht, den Nachrichtentyp (Foto, Video, Audio, Dokument, Aufkleber, Aktion, Standort) abhängig vom Text in der Nachricht zu erkennen. Handelt es sich bei dem Text um einen Pfad zu einer vorhandenen Datei, wird er dem Typ entsprechend gesendet.

Der Standort wird anhand des Breitengradattributs ermittelt:

```javascript
sendTo('telegram.0', {
    latitude:               52.522430,
    longitude:              13.372234,
    disable_notification:   true
});
```

### Explizite Nachrichtentypen
Sie haben die Möglichkeit, den Nachrichtentyp zusätzlich zu definieren, falls Sie die Daten als Puffer senden möchten.

Folgende Typen sind möglich: *Aufkleber*, *Video*, *Dokument*, *Audio*, *Foto*.

```javascript
sendTo('telegram.0', {
    text: fs.readFileSync('/opt/path/picture.png'),
    type: 'photo'
});
```

### Tastatur
Sie können die Tastatur **ReplyKeyboardMarkup** im Client anzeigen:

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

Mehr dazu lesen Sie [hier](https://core.telegram.org/bots/api#replykeyboardmarkup) und [hier](https://core.telegram.org/bots#keyboards).

Sie können die Tastatur **InlineKeyboardMarkup** im Client anzeigen:

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

Mehr dazu lesen Sie [hier](https://core.telegram.org/bots/api#inlinekeyboardmarkup) und [hier](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating).

**HINWEIS:** *Nachdem der Benutzer eine Rückruftaste gedrückt hat, zeigen Telegram-Clients einen Fortschrittsbalken an, bis Sie answerCallbackQuery aufrufen. Es ist daher notwendig, mit dem Aufruf von answerCallbackQuery zu reagieren, auch wenn keine Benachrichtigung an den Benutzer erforderlich ist (z. B. ohne Angabe eines der optionalen Parameter).*

### AntwortCallbackQuery
Verwenden Sie diese Methode, um Antworten auf Rückrufanfragen zu senden, die von Inline-Tastaturen gesendet wurden. Die Antwort wird dem Benutzer als Benachrichtigung oben auf dem Chat-Bildschirm oder als Warnung angezeigt. Bei Erfolg wird *True* zurückgegeben.

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

Mehr dazu lesen Sie [Hier](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegrambotanswercallbackquerycallbackqueryid-text-showalert-options--promise).

### Frage
Sie können die Nachricht per Telegramm senden und die nächste Antwort wird per Rückruf zurückgegeben.
Das Timeout kann in der Konfiguration festgelegt werden und beträgt standardmäßig 60 Sekunden.

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

## Chat-ID
Ab Version 0.4.0 können Sie die Chat-ID verwenden, um Nachrichten an den Chat zu senden.

```javascript
sendTo('telegram.0', {text: 'Message to chat', chatId: 'SOME-CHAT-ID-123'});
```

## Nachrichten aktualisieren
Mit den folgenden Methoden können Sie eine vorhandene Nachricht im Nachrichtenverlauf ändern, anstatt eine neue mit dem Ergebnis einer Aktion zu senden. Dies ist besonders nützlich für Nachrichten mit *Inline-Tastaturen*, die Rückrufabfragen verwenden, kann aber auch dazu beitragen, die Unordnung in Unterhaltungen mit regulären Chatbots zu reduzieren.

### EditMessageText
Verwenden Sie diese Methode, um vom Bot oder über den Bot gesendeten Text zu bearbeiten (für Inline-Bots). Bei Erfolg wird, wenn der Bot eine bearbeitete Nachricht sendet, die bearbeitete Nachricht zurückgegeben, andernfalls wird *True* zurückgegeben.

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

*oder neuer Text für letzte Nachricht:*

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

Mehr dazu lesen Sie [Hier](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegramboteditmessagetexttext-options--promise).

### EditMessageCaption
Verwenden Sie diese Methode, um die Überschrift der vom Bot oder über den Bot gesendeten Nachricht zu bearbeiten (für Inline-Bots).
Bei Erfolg wird, wenn der Bot eine bearbeitete Nachricht sendet, die bearbeitete Nachricht zurückgegeben; andernfalls wird *True* zurückgegeben.

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

Mehr dazu lesen Sie [Hier](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegramboteditmessagetexttext-options--promise).

### EditMessageMedia
Verwenden Sie diese Methode, um das Bild der vom Bot oder über den Bot gesendeten Nachricht zu bearbeiten (für Inline-Bots).
Bei Erfolg wird, wenn der Bot eine bearbeitete Nachricht sendet, die bearbeitete Nachricht zurückgegeben, andernfalls wird *True* zurückgegeben.

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

Unterstützt werden folgende Medientypen: `photo`, `animation`, `audio`, `document`, `video`.

Mehr dazu lesen Sie [Hier](https://core.telegram.org/bots/api#editmessagemedia).

### EditMessageReplyMarkup
Verwenden Sie diese Methode, um nur die Antwortmarkierung von Nachrichten zu bearbeiten, die vom Bot oder über den Bot gesendet wurden (für Inline-Bots). Bei Erfolg wird, wenn der Bot eine bearbeitete Nachricht sendet, die bearbeitete Nachricht zurückgegeben; andernfalls wird *True* zurückgegeben.

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

Mehr dazu lesen Sie [Hier](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegramboteditmessagereplymarkupreplymarkup-options--promise).

### Nachricht löschen
Mit dieser Methode können Sie eine Nachricht (einschließlich Servicenachrichten) mit den folgenden Einschränkungen löschen:

- Eine Nachricht kann nur gelöscht werden, wenn sie vor weniger als 48 Stunden gesendet wurde.

Gibt bei Erfolg *True* zurück.

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

Mehr dazu lesen Sie [Hier](https://github.com/yagop/node-telegram-bot-api/blob/master/doc/api.md#TelegramBot+deleteMessage).

## Auf Benutzerantworten/Nachrichten reagieren
Angenommen, Sie verwenden nur JavaScript ohne `text2command`. Sie haben Ihrem Benutzer bereits eine Nachricht/Frage mit `sendTo()` gesendet, wie oben beschrieben. Der Benutzer antwortet darauf, indem er eine Taste drückt oder eine Nachricht schreibt. Sie können den Befehl extrahieren und Ihrem Benutzer Feedback geben, Befehle ausführen oder Zustände in iobroker wechseln.

- telegram.0 ist die iobroker Telegram-Instanz, die Sie verwenden möchten
- Benutzer ist der bei Ihrem TelegramBot registrierte Benutzer, der die Nachricht gesendet hat
- command ist der Befehl, den Ihr TelegramBot erhalten hat

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

## Spezielle Befehle
### /state stateName - Statuswert lesen
Den Wert von state können Sie abfragen, wenn Sie die ID kennen:

```
/state system.adapter.admin.0.memHeapTotal
> 56.45
```

### /state stateName value - Statuswert festlegen
Sie können den Statuswert festlegen, wenn Sie die ID kennen:

```
/state hm-rpc.0.JEQ0ABCDE.3.STOP true
> Done
```

## Polling- oder Servermodus
Wenn der Polling-Modus verwendet wird, fragt der Adapter standardmäßig alle 300 ms den Telegrammserver nach Updates ab. Dabei wird Datenverkehr verwendet und Nachrichten können bis zum Polling-Intervall verzögert werden. Das Polling-Intervall kann in der Adapterkonfiguration definiert werden.

Um den Servermodus zu verwenden, muss Ihre ioBroker-Instanz über das Internet erreichbar sein (z. B. mit dem dynamischen DNS-Dienst `noip.com`).

Telegram kann nur mit HTTPS-Servern funktionieren, aber Sie können **Let’s Encrypt**-Zertifikate verwenden.

Für den Servermodus müssen folgende Einstellungen vorgenommen werden:

- URL – in der Form https://IhreDomain.com:8443.
- IP - IP-Adresse, an die der Server gebunden ist. Standardmäßig 0.0.0.0. Ändern Sie diese nicht, wenn Sie nicht sicher sind.
- Port – aktuell werden von Telegram nur die Ports 443, 80, 88 und 8443 unterstützt, Sie können die Ports aber über Ihren Router an jeden weiterleiten.
- Öffentliches Zertifikat – erforderlich, wenn **Let’s Encrypt** deaktiviert ist.
- Privater Schlüssel – erforderlich, wenn **Let’s Encrypt** deaktiviert ist.
- Kettenzertifikat (optional)
- Let’s Encrypt-Optionen – Es ist sehr einfach, **Let’s Encrypt**-Zertifikate einzurichten. Bitte lesen Sie [hier](https://github.com/ioBroker/ioBroker.admin#lets-encrypt-certificates) mehr darüber.

## Erweiterte Sicherheit
Die Authentifizierung von Benutzern kann deaktiviert werden. So kann sich niemand mehr authentifizieren.

Um eine Liste vertrauenswürdiger Benutzer zu erstellen, deaktivieren Sie zunächst die Option „Neue Benutzer nicht authentifizieren“ und authentifizieren Sie alle Benutzer, die in der vertrauenswürdigen Liste enthalten sein sollen, durch Senden der Nachricht `/password <PASSWORD>`.

Die Benutzer, die ein gültiges Passwort gesendet haben, werden in der vertrauenswürdigen Liste gespeichert.

Anschließend könnte die Option „Neue Benutzer nicht authentifizieren“ aktiviert werden und es können sich keine neuen Benutzer authentifizieren.

Um diese Option nutzen zu können, muss die Option „Authentifizierte Benutzer merken“ aktiviert sein.

## Anrufe per Telegramm
Dank der API [rufmichbot an](https://www.callmebot.com/) können Sie Ihren Telegramm-Account anrufen und einige Texte werden über die TTS-Engine vorgelesen.

Um dies vom JavaScript-Adapter aus zu tun, rufen Sie einfach Folgendes auf:

```javascript
sendTo('telegram.0', 'call', 'Some text');
```

oder

```javascript
sendTo('telegram.0', 'call', {
    text: 'Some text',
    user: '@Username', // optional and the call will be done to the first user in telegram.0.communicate.users.
    language: 'de-DE-Standard-A', // optional and the system language will be taken
    repeats: 0, // number of repeats
});
```

oder

```javascript
sendTo('telegram.0', 'call', {
    text: 'Some text',
    users: ['@Username1', '+49xxxx'] // Array of `users' or telephone numbers.
});
```

oder

```javascript
sendTo('telegram.0', 'call', {
    file: 'url of mp3 file that is accessible from internet',
    users: ['@Username1', '@Username2'] // Array of `users' or telephone numbers.
});
```

Mögliche Werte für Sprache:

- `ar-XA-Standard-A` – Arabisch (weibliche Stimme)
- `ar-XA-Standard-B` – Arabisch (Männerstimme)
- `ar-XA-Standard-C` – Arabisch (männlich, 2 Stimmen)
- `cs-CZ-Standard-A` - Tschechisch (Tschechische Republik) (weibliche Stimme)
- `da-DK-Standard-A` - Dänisch (Dänemark) (weibliche Stimme)
- „nl-NL-Standard-A“ – Niederländisch (Niederlande) (Weibliche Stimme – wird verwendet, wenn die Systemsprache NL ist und keine Sprache angegeben wurde)
- `nl-NL-Standard-B` - Niederländisch (Niederlande) (Männerstimme)
- `nl-NL-Standard-C` - Niederländisch (Niederlande) (Männlich, 2 Stimmen)
- `nl-NL-Standard-D` - Niederländisch (Niederlande) (weiblich, 2 Stimmen)
- `nl-NL-Standard-E` - Niederländisch (Niederlande) (weiblich, 3 Stimmen)
- `en-AU-Standard-A` - Englisch (Australien) (weibliche Stimme)
- `en-AU-Standard-B` - Englisch (Australien) (Männliche Stimme)
- `en-AU-Standard-C` - Englisch (Australien) (weiblich, 2 Stimmen)
- `en-AU-Standard-D` - Englisch (Australien) (Männlich, 2 Stimmen)
- `en-IN-Standard-A` – Englisch (Indien) (weibliche Stimme)
- `en-IN-Standard-B` - Englisch (Indien) (Männerstimme)
- `en-IN-Standard-C` - Englisch (Indien) (Männlich, 2 Stimmen)
- „en-GB-Standard-A“ – Englisch (UK) (Weibliche Stimme – wird verwendet, wenn die Systemsprache EN ist und keine Sprache angegeben wurde)
- `en-GB-Standard-B` - Englisch (UK) (Männliche Stimme)
- `en-GB-Standard-C` - Englisch (UK) (weiblich, 2 Stimmen)
- `en-GB-Standard-D` - Englisch (UK) (Männlich, 2 Stimmen)
- `en-US-Standard-B` - Englisch (US) (Männliche Stimme)
- `en-US-Standard-C` - Englisch (US) (weibliche Stimme)
- `en-US-Standard-D` - Englisch (US) (Männlich, 2 Stimmen)
- `en-US-Standard-E` - Englisch (US) (weiblich, 2 Stimmen)
- `fil-PH-Standard-A` – Filipino (Philippinen) (weibliche Stimme)
- `fi-FI-Standard-A` - Finnisch (Finnland) (weibliche Stimme)
- `fr-CA-Standard-A` – Französisch (Kanada) (weibliche Stimme)
- `fr-CA-Standard-B` - Französisch (Kanada) (Männerstimme)
- `fr-CA-Standard-C` - Französisch (Kanada) (weiblich, 2 Stimmen)
- `fr-CA-Standard-D` - Französisch (Kanada) (Männlich, 2 Stimmen)
- „fr-FR-Standard-A“ – Französisch (Frankreich) (Weibliche Stimme – wird verwendet, wenn die Systemsprache FR ist und keine Sprache angegeben wurde)
- `fr-FR-Standard-B` - Französisch (Frankreich) (Männerstimme)
- `fr-FR-Standard-C` - Französisch (Frankreich) (weiblich, 2 Stimmen)
- `fr-FR-Standard-D` - Französisch (Frankreich) (Männlich, 2 Stimmen)
- `de-DE-Standard-A` - Deutsch (Deutschland) (Weibliche Stimme - wird verwendet, wenn die Systemsprache DE ist und keine Sprache angegeben wurde)
- `de-DE-Standard-B` - Deutsch (Deutschland) (Männerstimme)
- `el-GR-Standard-A` – Griechisch (Griechenland) (weibliche Stimme)
- `hi-IN-Standard-A` – Hindi (Indien) (weibliche Stimme)
- `hi-IN-Standard-B` – Hindi (Indien) (Männerstimme)
- `hi-IN-Standard-C` - Hindi (Indien) (männlich, 2 Stimmen)
- `hu-HU-Standard-A` - Ungarisch (Ungarn) (Weibliche Stimme)
- `id-ID-Standard-A` – Indonesisch (Indonesien) (weibliche Stimme)
- `id-ID-Standard-B` – Indonesisch (Indonesien) (Männliche Stimme)
- `id-ID-Standard-C` – Indonesisch (Indonesien) (Männlich, 2 Stimmen)
- „it-IT-Standard-A“ – Italienisch (Italien) (Weibliche Stimme – wird verwendet, wenn die Systemsprache IT ist und keine Sprache angegeben wurde)
- `it-IT-Standard-B` - Italienisch (Italien) (weiblich, 2 Stimmen)
- `it-IT-Standard-C` - Italienisch (Italien) (Männerstimme)
- `it-IT-Standard-D` - Italienisch (Italien) (Männlich, 2 Stimmen)
- `ja-JP-Standard-A` – Japanisch (Japan) (weibliche Stimme)
- `ja-JP-Standard-B` - Japanisch (Japan) (weiblich, 2 Stimmen)
- `ja-JP-Standard-C` – Japanisch (Japan) (Männliche Stimme)
- `ja-JP-Standard-D` - Japanisch (Japan) (Männlich, 2 Stimmen)
- `ko-KR-Standard-A` – Koreanisch (Südkorea) (weibliche Stimme)
- `ko-KR-Standard-B` – Koreanisch (Südkorea) (weiblich, 2 Stimmen)
- `ko-KR-Standard-C` – Koreanisch (Südkorea) (Männerstimme)
- `ko-KR-Standard-D` – Koreanisch (Südkorea) (Männlich, 2 Stimmen)
- `cmn-CN-Standard-A` – Mandarin-Chinesisch (weibliche Stimme)
- `cmn-CN-Standard-B` – Mandarin-Chinesisch (Männerstimme)
- `cmn-CN-Standard-C` - Mandarin-Chinesisch (männlich, 2 Stimmen)
- `nb-NO-Standard-A` – Norwegisch (Norwegen) (Weibliche Stimme)
- `nb-NO-Standard-B` – Norwegisch (Norwegen) (Männliche Stimme)
- `nb-NO-Standard-C` - Norwegisch (Norwegen) (weiblich, 2 Stimmen)
- `nb-NO-Standard-D` - Norwegisch (Norwegen) (Männlich, 2 Stimmen)
- `nb-no-Standard-E` - Norwegisch (Norwegen) (weiblich, 3 Stimmen)
- `pl-PL-Standard-A` – Polnisch (Polen) (Weibliche Stimme – wird verwendet, wenn die Systemsprache PL ist und keine Sprache angegeben wurde)
- `pl-PL-Standard-B` - Polnisch (Polen) (Männerstimme)
- `pl-PL-Standard-C` - Polnisch (Polen) (Männlich, 2 Stimmen)
- `pl-PL-Standard-D` - Polnisch (Polen) (weiblich, 2 Stimmen)
- `pl-PL-Standard-E` - Polnisch (Polen) (weiblich, 3 Stimmen)
- `pt-BR-Standard-A` – Portugiesisch (Brasilien) (Weibliche Stimme – wird verwendet, wenn die Systemsprache PT ist und keine Sprache angegeben wurde)
- `pt-PT-Standard-A` – Portugiesisch (Portugal) (weibliche Stimme)
- `pt-PT-Standard-B` – Portugiesisch (Portugal) (Männerstimme)
- `pt-PT-Standard-C` - Portugiesisch (Portugal) (Männlich, 2 Stimmen)
- `pt-PT-Standard-D` - Portugiesisch (Portugal) (weiblich, 2 Stimmen)
- „ru-RU-Standard-A“ – Russisch (Russland) (Weibliche Stimme – wird verwendet, wenn die Systemsprache RU ist und keine Sprache angegeben wurde)
- `ru-RU-Standard-B` - Russisch (Russland) (Männerstimme)
- `ru-RU-Standard-C` - Russisch (Russland) (weiblich, 2 Stimmen)
- `ru-RU-Standard-D` - Russisch (Russland) (Männlich, 2 Stimmen)
- `sk-SK-Standard-A` - Slowakisch (Slowakei) (weibliche Stimme)
- „es-ES-Standard-A“ – Spanisch (Spanien) (Weibliche Stimme – wird verwendet, wenn die Systemsprache ES ist und keine Sprache angegeben wurde)
- `sv-SE-Standard-A` - Schwedisch (Schweden) (weibliche Stimme)
- `tr-TR-Standard-A` – Türkisch (Türkei) (weibliche Stimme)
- `tr-TR-Standard-B` – Türkisch (Türkei) (Männerstimme)
- `tr-TR-Standard-C` - Türkisch (Türkei) (weiblich, 2 Stimmen)
- `tr-TR-Standard-D` - Türkisch (Türkei) (weiblich, 3 Stimmen)
- `tr-TR-Standard-E` - Türkisch (Türkei) (Männerstimme)
- `uk-UA-Standard-A` - Ukrainisch (Ukraine) (weibliche Stimme)
- `vi-VN-Standard-A` – Vietnamesisch (Vietnam) (Weibliche Stimme)
- `vi-VN-Standard-B` – Vietnamesisch (Vietnam) (Männliche Stimme)
- `vi-VN-Standard-C` - Vietnamesisch (Vietnam) (weiblich, 2 Stimmen)
- `vi-VN-Standard-D` - Vietnamesisch (Vietnam) (Männlich, 2 Stimmen)

MACHEN:

- Veranstaltungsort

## Automatische Inline-Tastatur basierend auf den Einstellungen im Admin (Easy-Keyboard)
Für jeden Status können die folgenden zusätzlichen Einstellungen aktiviert werden:

![Einstellungen](../../../en/adapterref/iobroker.telegram/img/stateSettings.png)

Durch Eingabe von `/cmds` wird im Telegramm folgende Tastatur angezeigt:

![Einstellungen](../../../en/adapterref/iobroker.telegram/img/stateSettings1.png)

`/cmds` kann im Konfigurationsdialog des Telegrammadapters durch einen beliebigen Text (z. B. "?") ersetzt werden.

Wenn die Option **Räume in Tastaturbefehlen verwenden** im Konfigurationsdialog des Telegrammadapters aktiviert ist, wird im ersten Schritt die Raumliste angezeigt. ***Noch nicht implementiert***

### Einstellungen im Status
Zuerst muss die Konfiguration aktiviert werden.

#### Alias
Name des Gerätes. Wenn der Name leer ist, wird der Name von einem Objekt übernommen.
Durch Eingabe von „Türlampe“ wird für den booleschen Status folgendes Menü angezeigt.
![Einstellungen](../../../en/adapterref/iobroker.telegram/img/stateSettings2.png)

Sie können das Gerät einschalten, ausschalten oder den Status abfragen.
Wenn Sie auf `Door lamp ?` klicken, erhalten Sie `Door lamp  => switched off`.

### Schreibgeschützt
Wenn aktiviert, werden keine EIN/AUS-Schaltflächen angezeigt, sondern nur ein `Door lamp ?`.

### Änderungen melden
Wenn sich der Status des Geräts geändert hat (z. B. jemand hat die Lampe physisch eingeschaltet), wird der neue Status per Telegramm übermittelt.
Z. B. `Door lamp  => switched on`.

### Schaltflächen in der Zeile
Wie viele Schaltflächen müssen in der Zeile für ein Gerät angezeigt werden.
Aufgrund des langen Namens ist es möglicherweise besser, nur 2 (oder sogar nur eine) Schaltflächen in der Zeile anzuzeigen.

![Einstellungen](../../../en/adapterref/iobroker.telegram/img/stateSettings3.png)

### Nur schreiben
Wenn aktiviert, wird die Schaltfläche „Statusabfrage“ (`Door lamp ?`) nicht angezeigt.
![Einstellungen](../../../en/adapterref/iobroker.telegram/img/stateSettings4.png)

### Auf Befehl
Welcher Text wird auf der Schaltfläche `ON` angezeigt?
Wie hier: ![Einstellungen](../../../en/adapterref/iobroker.telegram/img/stateSettings5.png)

Erzeugt folgende Tastatur: ![Einstellungen](../../../en/adapterref/iobroker.telegram/img/stateSettings6.png)

### EIN Text
Der Text, der im Statusbericht angezeigt wird.
Zum Beispiel `Door lamp => activated`, wenn der Status des Geräts auf „true“ geändert wurde und der **ON-Text** `activated` ist.

Die EIN/AUS-Texte werden nur angezeigt, wenn **Änderungen melden** aktiviert ist.

### OFF-Befehl
Dasselbe wie **ON-Befehl**, aber für OFF.

### AUS Text
Dasselbe wie **ON-Text**, aber für OFF.
Zum Beispiel `Door lamp => deactivated`, wenn sich der Status des Geräts auf „false“ geändert hat und der **OFF-Text** `deactivated` ist.

### Nur wahr
Beispielsweise gibt es bei Schaltflächen keinen AUS-Zustand. In diesem Fall wird die AUS-Schaltfläche nicht angezeigt.

![Einstellungen](../../../en/adapterref/iobroker.telegram/img/stateSettings7.png)

## So empfangen Sie Nachrichten in Gruppenchats mit dem Telegrammadapter
Wenn der Telegram-Bot Nachrichten empfängt, die von Benutzern in privaten Chats an den Bot gesendet werden, aber keine Nachrichten empfängt, die von Benutzern in Gruppenchats gesendet werden.
In diesem Fall müssen Sie mit `@botfather` sprechen und den Datenschutzmodus deaktivieren.

BotFather-Chat:

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

## So senden Sie Nachrichten über Node-Red
Für einfache Textnachrichten an alle Benutzer fügen Sie den Text einfach in die Nutzlast der Nachricht ein und senden ihn an den ioBroker-Status `telegram.INSTANCE.communicate.response`.

Wenn Sie zusätzliche Optionen festlegen möchten, füllen Sie die Nutzlast mit einem JSON-Objekt, etwa:

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

Vor dem Senden an `telegram.INSTANCE.communicate.responseJson you need to stringify the object!`

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