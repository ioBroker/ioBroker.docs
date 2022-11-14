---
BADGE-Number of Installations: http://iobroker.live/badges/telegram-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.telegram.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.telegram.svg
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.telegram/README.md
title: ioBroker.telegram
hash: NZPqr1WUHbmb+9M6BCWh2fBEK95qQj7qfkkF6DmG8Gk=
---
![Logo](../../../en/adapterref/iobroker.telegram/../../admin/telegram.png)

# IoBroker.telegram
## Aufbau
Bitten Sie [@BotVater](https://telegram.me/botfather), einen neuen Bot `/newbot` zu erstellen.

Sie werden aufgefordert, den Namen des Bots und dann den Benutzernamen einzugeben.
Danach erhalten Sie den Token.

![Bildschirmfoto](../../../en/adapterref/iobroker.telegram/img/chat.png)

Sie sollten das Passwort für die Kommunikation im Konfigurationsdialog festlegen. Starten Sie danach den Adapter.

Um eine Unterhaltung mit Ihrem Bot zu beginnen, müssen Sie den Benutzer mit `/password phrase` authentifizieren, wobei **`phrase`** Ihr konfiguriertes Passwort ist. Öffnen Sie also eine neue Konversation mit Ihrem generierten Bot in Telegram und geben Sie dann das Passwort als ersten Befehl ein.

**Hinweis:** Sie können die Kurzform `/p phrase` verwenden.

Um ein nettes Avatar-Bild hinzuzufügen, gib `/setuserpic` im **BotFather**-Chat ein und lade das gewünschte Bild (512x512 Pixel) hoch, wie dieses hier [Logo](img/logo.png).

Sie können die Nachricht an alle authentifizierten Benutzer über die messageBox `sendTo('telegram', 'Test message')` oder an einen bestimmten Benutzer `sendTo('telegram', '@userName Test message')` senden.
Der Benutzer muss zuvor authentifiziert werden.

Sie können den Benutzer auch auf diese Weise angeben:

```javascript
sendTo('telegram', {user: 'UserName', text: 'Test message'}, function (res) {
    console.log('Sent to ' + res + ' users');
});
```

Wenn Sie das obige Beispiel verwenden, beachten Sie, dass Sie 'UserName' entweder durch den Vornamen oder den Public-Telegram-Benutzernamen des Benutzers ersetzen müssen, an den Sie die Nachricht senden möchten. (Hängt davon ab, ob die Einstellung „Benutzername nicht Vorname speichern“ in den Adaptereinstellungen aktiviert ist oder nicht) Wenn die Option aktiviert ist und der Benutzer keinen öffentlichen Benutzernamen in seinem Telegrammkonto angegeben hat, verwendet der Adapter weiterhin den Vornamen von der Nutzer. Denken Sie daran, dass, wenn der Benutzer später (nach der Authentifizierung bei Ihrem Bot) einen öffentlichen Benutzernamen festlegt, der gespeicherte Vorname durch den Benutzernamen ersetzt wird, wenn der Benutzer das nächste Mal eine Nachricht an den Bot sendet.

Es ist möglich, mehr als einen Empfänger anzugeben (trennen Sie einfach die Benutzernamen durch Kommas).
Beispiel: Empfänger: "Benutzer1,Benutzer4,Benutzer5"

Sie können die Nachricht auch über den Status senden, setzen Sie einfach den Status *"telegram.INSTANCE.communicate.response"* mit dem Wert *"@userName Test message"* oder mit einem JSON-Objekt:

```json
{
    "text": "Test message"
}
```

Die JSON-Syntax erlaubt auch das Hinzufügen von Optionen aus [Telegramm-Bots-API](https://core.telegram.org/bots/api) sowie das Setzen der Benutzer- oder ChatId:

```json
{
    "text": "Test message, but with *bold*",
    "parse_mode": "Markdown",
    "chatId": "1234567890",
    "user": "UserName"
}
```

Um Nachrichten an die Gruppen zu senden, müssen Sie den Bot in die Gruppe einladen, in der der Bot posten soll.
Durch Bereitstellen von `chat_id` für die JSON-Nachrichtennutzlast können Sie tatsächlich Nachrichten an diese Gruppen senden.

Um die `chat_id` herauszufinden, müssen Sie den Loglevel des Adapters auf `debug` setzen.
Sie können Ihren Bot dann einfach in den Gruppen anpingen, an die der Bot Nachrichten senden soll.
Stellen Sie sicher, dass Sie der Nachricht ein `/` voranstellen, damit der Bot die Nachricht sehen kann ([wenn die Privatsphäre des Bots eingeschaltet ist](#How-to-receive-messages-in-group-chats-using-telegram-adapter)).
Das iobroker-Protokoll zeigt Ihnen dann die Chat-ID in den Protokollen.

## Verwendungszweck
Sie können das Telegramm mit dem [Text2Befehl](https://github.com/ioBroker/ioBroker.text2command)-Adapter verwenden. Es gibt vordefinierte Kommunikationsschemata und Sie können sie in Textform nach Hause befehlen.

Um ein Foto zu senden, senden Sie einfach einen Pfad zur Datei anstelle von Text oder URL: `sendTo('telegram', 'absolute/path/file.png')` oder `sendTo('telegram', 'https://telegram.org/img/t_logo.png')`.

Beispiel, wie man einen Screenshot von einer Webcam an ein Telegramm sendet:

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

Folgende Meldungen sind für Aktionen reserviert:

- *tippen* - für Textnachrichten,
- *upload_photo* - für Fotos,
- *upload_video* - für Videos,
- *record_video* - für Videos,
- *record_audio* - für Audio,
- *upload_audio* - für Audio,
- *upload_document* - für Dokumente,
- *find_location* - für Standortdaten

In diesem Fall wird der Aktionsbefehl gesendet.

Die Beschreibung für die Telegramm-API finden Sie in [hier](https://core.telegram.org/bots/api) und Sie können alle in dieser API definierten Optionen verwenden, indem Sie diese einfach in das Sendeobjekt aufnehmen. Z.B.:

```javascript
sendTo('telegram.0', {
    text:                   '/tmp/snap.jpg',
    caption:                'Snapshot',
    disable_notification:   true
});
```

**Möglichkeiten**:

- *disable_notification*: Sendet die Nachricht still. Die iOS-Benutzer erhalten keine Benachrichtigung, Android-Benutzer erhalten eine Benachrichtigung ohne Ton. (alle Arten)
- *parse_mode*: Senden Sie Markdown oder HTML, wenn Sie möchten, dass Telegram-Apps fett, kursiv, Text mit fester Breite oder Inline-URLs in der Nachricht Ihres Bots anzeigen. Mögliche Werte: "Markdown", "MarkdownV2", "HTML" (Nachricht)
- *disable_web_page_preview*: Deaktiviert Linkvorschauen für Links in dieser Nachricht (Nachricht)
- *Beschriftung*: Beschriftung für das Dokument, Foto oder Video, 0-200 Zeichen (Video, Audio, Foto, Dokument)
- *duration*: Dauer des gesendeten Videos oder Audios in Sekunden (Audio, Video)
- *performer*: Interpret der Audiodatei (Audio)
- *title*: Titelname der Audiodatei (Audio)
- *Breite*: Videobreite (Video)
- *height*: Videohöhe (Video)

Der Adapter versucht, den Typ der Nachricht (Foto, Video, Audio, Dokument, Aufkleber, Aktion, Ort) zu erkennen, hängt vom Text in der Nachricht ab, wenn der Text ein Pfad zu einer vorhandenen Datei ist, wird er als entsprechender Typ gesendet.

Der Standort wird anhand des Breitengradattributs erkannt:

```javascript
sendTo('telegram.0', {
    latitude:               52.522430,
    longitude:              13.372234,
    disable_notification:   true
});
```

### Explizite Arten von Nachrichten
Sie haben die Möglichkeit, den Typ der Nachricht zusätzlich zu definieren, falls Sie die Daten als Puffer senden möchten.

Folgende Typen sind möglich: *Aufkleber*, *Video*, *Dokument*, *Audio*, *Foto*.

```javascript
sendTo('telegram.0', {
    text: fs.readFileSync('/opt/path/picture.png'),
    type: 'photo'
});
```

### Klaviatur
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

Sie können mehr lesen [hier](https://core.telegram.org/bots/api#replykeyboardmarkup) und [hier](https://core.telegram.org/bots#keyboards).

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

Sie können mehr lesen [hier](https://core.telegram.org/bots/api#inlinekeyboardmarkup) und [hier](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating).

**HINWEIS:** *Nachdem der Benutzer eine Rückruftaste gedrückt hat, zeigen Telegram-Clients einen Fortschrittsbalken an, bis Sie answerCallbackQuery aufrufen. Daher muss auch dann mit dem Aufruf von answerCallbackQuery reagiert werden, wenn keine Benachrichtigung an den Benutzer erforderlich ist (z. B. ohne Angabe eines der optionalen Parameter).*

### AnswerCallbackQuery
Verwenden Sie diese Methode, um Antworten auf Rückrufabfragen zu senden, die von Inline-Tastaturen gesendet werden. Die Antwort wird dem Benutzer als Benachrichtigung oben im Chat-Bildschirm oder als Alarm angezeigt. Bei Erfolg wird *True* zurückgegeben.

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

Sie können mehr lesen [hier](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegrambotanswercallbackquerycallbackqueryid-text-showalert-options--promise).

### Frage
Sie können die Nachricht per Telegramm senden und die nächste Antwort wird im Rückruf zurückgegeben.
Timeout kann in der Konfiguration eingestellt werden und beträgt standardmäßig 60 Sekunden.

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
sendTo('telegram.0', {text: 'Message to chat', chatId: 'SOME-CHAT-ID-123');
```

## Nachrichten aktualisieren
Mit den folgenden Methoden können Sie eine vorhandene Nachricht im Nachrichtenverlauf ändern, anstatt eine neue Nachricht als Ergebnis einer Aktion zu senden. Dies ist am nützlichsten für Nachrichten mit *Inline-Tastaturen*, die Rückrufabfragen verwenden, kann aber auch dazu beitragen, Unordnung in Gesprächen mit normalen Chat-Bots zu reduzieren.

### Nachrichtentext bearbeiten
Verwenden Sie diese Methode, um vom Bot oder über den Bot (für Inline-Bots) gesendeten Text zu bearbeiten. Bei Erfolg, wenn eine bearbeitete Nachricht vom Bot gesendet wird, wird die bearbeitete Nachricht zurückgegeben, andernfalls wird *True* zurückgegeben.

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

*oder neuer Text für letzte Nachricht:*

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

Sie können mehr lesen [hier](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegramboteditmessagetexttext-options--promise).

### EditMessageCaption
Verwenden Sie diese Methode, um die Beschriftung der vom Bot oder über den Bot (für Inline-Bots) gesendeten Nachricht zu bearbeiten.
Bei Erfolg, wenn eine bearbeitete Nachricht vom Bot gesendet wird, wird die bearbeitete Nachricht zurückgegeben, andernfalls wird *True* zurückgegeben.

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

Sie können mehr lesen [hier](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegramboteditmessagetexttext-options--promise).

### EditMessageMedia
Verwenden Sie diese Methode, um das Bild der vom Bot oder über den Bot (für Inline-Bots) gesendeten Nachricht zu bearbeiten.
Bei Erfolg, wenn eine bearbeitete Nachricht vom Bot gesendet wird, wird die bearbeitete Nachricht zurückgegeben, andernfalls wird *True* zurückgegeben.

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

Sie können mehr lesen [hier](https://core.telegram.org/bots/api#editmessagemedia).

### EditMessageReplyMarkup
Verwenden Sie diese Methode, um nur das Antwort-Markup von Nachrichten zu bearbeiten, die vom Bot oder über den Bot (für Inline-Bots) gesendet wurden. Bei Erfolg, wenn eine bearbeitete Nachricht vom Bot gesendet wird, wird die bearbeitete Nachricht zurückgegeben, andernfalls wird *True* zurückgegeben.

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

Sie können mehr lesen [hier](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegramboteditmessagereplymarkupreplymarkup-options--promise).

### Nachricht löschen
Verwenden Sie diese Methode zum Löschen einer Nachricht, einschließlich Servicenachrichten, mit den folgenden Einschränkungen:

- Eine Nachricht kann nur gelöscht werden, wenn sie vor weniger als 48 Stunden gesendet wurde.

Gibt bei Erfolg *True* zurück.

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

Sie können mehr lesen [hier](https://github.com/yagop/node-telegram-bot-api/blob/master/doc/api.md#TelegramBot+deleteMessage).

## Auf Benutzerantworten/Nachrichten reagieren
Angenommen, Sie verwenden nur JavaScript ohne *text2command*. Sie haben bereits eine Nachricht/Frage an Ihren Benutzer gesendet, indem Sie *sendTo()* wie oben beschrieben verwendet haben. Der Benutzer antwortet darauf, indem er einen Knopf drückt oder eine Nachricht schreibt. Sie können den Befehl extrahieren und Ihrem Benutzer Feedback geben, Befehle ausführen oder den Status in iobroker ändern.

 -telegram.0 ist Ihre iobroker-Telegram-Instanz, die Sie verwenden möchten
 - Benutzer ist der bei Ihrem TelegramBot registrierte Benutzer, der die Nachricht gesendet hat
 - Befehl ist der Befehl, den Ihr TelegramBot erhalten hat

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

## Spezielle Befehle
### /state stateName - Statuswert lesen
Sie können den Statuswert anfordern, wenn Sie jetzt die ID:

```
/state system.adapter.admin.0.memHeapTotal
> 56.45
```

### /state stateName value - Statuswert festlegen
Sie können den Wert von state festlegen, wenn Sie nun die ID:

```
/state hm-rpc.0.JEQ0ABCDE.3.STOP true
> Done
```

## Abfrage- oder Servermodus
Wenn der Polling-Modus verwendet wird, fragt der Adapter standardmäßig alle 300 ms den Telegrammserver nach Updates ab. Es verwendet Datenverkehr und Nachrichten können bis zum Abfrageintervall verzögert werden. Das Abfrageintervall kann in der Adapterkonfiguration definiert werden.

Um den Servermodus zu verwenden, muss Ihre ioBroker-Instanz aus dem Internet erreichbar sein (z. B. mit `noip.com` dynamischem DNS-Dienst).

Telegram funktioniert nur mit HTTPS-Servern, aber Sie können **let’s encrypt**-Zertifikate verwenden.

Für den Servermodus müssen folgende Einstellungen vorgenommen werden:

- URL - im Format https://ihredomain.com:8443.
- IP - IP-Adresse, an die der Server gebunden wird. Standard 0.0.0.0. Ändern Sie es nicht, wenn Sie sich nicht sicher sind.
- Port - eigentlich werden nur 443, 80, 88, 8443 Ports per Telegramm unterstützt, aber Sie können Ports über Ihren Router an jeden weiterleiten.
- Öffentliches Zertifikat - erforderlich, wenn **let's encrypt** deaktiviert ist.
- Privater Schlüssel - erforderlich, wenn **let's encrypt** deaktiviert ist.
- Kettenzertifikat (optional)
- Let's encrypt-Optionen - Es ist sehr einfach, **let's encrypt**-Zertifikate einzurichten. Bitte lesen Sie [hier](https://github.com/ioBroker/ioBroker.admin#lets-encrypt-certificates) darüber.

## Erweiterte Sicherheit
Die Authentifizierung von Benutzern konnte deaktiviert werden. So kann sich niemand neu authentifizieren.

Um eine Liste vertrauenswürdiger Benutzer zu erstellen, deaktivieren Sie zunächst die Option „Neue Benutzer nicht authentifizieren“ und authentifizieren Sie alle Benutzer, die in der vertrauenswürdigen Liste enthalten sein sollen, indem Sie die Nachricht `/password <PASSWORD>` senden.

Die Benutzer, die ein gültiges Passwort gesendet haben, werden in der Vertrauensliste gespeichert.

Danach könnte die Option „Neue Benutzer nicht authentifizieren“ aktiviert werden und es können sich keine neuen Benutzer mehr authentifizieren.

Um diese Option nutzen zu können, muss die Option „Authentifizierte Benutzer speichern“ aktiviert sein.

## Anrufe per Telegramm
Dank [callmebot](https://www.callmebot.com/) api können Sie einen Anruf zu Ihrem Telegrammkonto tätigen und einige Texte werden über die TTS-Engine gelesen.

Rufen Sie dazu einfach vom Javascript-Adapter aus auf:

```javascript
sendTo('telegram.0', 'call', 'Some text');
```

oder

```javascript
sendTo('telegram.0', 'call', {
    text: 'Some text',
    user: '@Username', // optional and the call will be done to the first user in telegram.0.communicate.users.
    language: 'de-DE-Standard-A' // optional and the system language will be taken
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

- `ar-XA-Standard-A` - Arabisch (weibliche Stimme)
- `ar-XA-Standard-B` - Arabisch (Männerstimme)
- `ar-XA-Standard-C` - Arabisch (Männerstimme 2)
- `cs-CZ-Standard-A` - Tschechisch (Tschechische Republik) (weibliche Stimme)
- `da-DK-Standard-A` - Dänisch (Dänemark) (weibliche Stimme)
- `nl-NL-Standard-A` - Niederländisch (Niederlande) (weibliche Stimme - wird verwendet, wenn die Systemsprache NL ist und keine Sprache angegeben wurde)
- `nl-NL-Standard-B` - Niederländisch (Niederlande) (Männerstimme)
- `nl-NL-Standard-C` - Niederländisch (Niederlande) (männlich 2 Stimmen)
- `nl-NL-Standard-D` - Niederländisch (Niederlande) (Frauenstimme 2)
- `nl-NL-Standard-E` - Niederländisch (Niederlande) (Frauenstimme 3)
- `en-AU-Standard-A` - Englisch (Australien) (weibliche Stimme)
- `en-AU-Standard-B` - Englisch (Australien) (Männerstimme)
- `en-AU-Standard-C` - Englisch (Australien) (Frauenstimme 2)
- `en-AU-Standard-D` - Englisch (Australien) (Männer 2 Stimme)
- `en-IN-Standard-A` - Englisch (Indien) (weibliche Stimme)
- `en-IN-Standard-B` - Englisch (Indien) (Männerstimme)
- `en-IN-Standard-C` - Englisch (Indien) (Männer 2 Stimme)
- `en-GB-Standard-A` - Englisch (UK) (weibliche Stimme - wird verwendet, wenn die Systemsprache EN ist und keine Sprache angegeben wurde)
- `en-GB-Standard-B` - Englisch (UK) (Männerstimme)
- `en-GB-Standard-C` - Englisch (UK) (Frauenstimme 2)
- `en-GB-Standard-D` - Englisch (UK) (männlich 2 Stimmen)
- `en-US-Standard-B` - Englisch (US) (Männerstimme)
- `en-US-Standard-C` - Englisch (US) (weibliche Stimme)
- `en-US-Standard-D` - Englisch (US) (männlich 2 Stimmen)
- `en-US-Standard-E` - Englisch (US) (Frauenstimme 2)
- `fil-PH-Standard-A` - Filipino (Philippinen) (weibliche Stimme)
- `fi-FI-Standard-A` - Finnisch (Finnland) (weibliche Stimme)
- `fr-CA-Standard-A` - Französisch (Kanada) (weibliche Stimme)
- `fr-CA-Standard-B` - Französisch (Kanada) (Männerstimme)
- `fr-CA-Standard-C` - Französisch (Kanada) (Frauenstimme 2)
- `fr-CA-Standard-D` - Französisch (Kanada) (Männerstimme 2)
- `fr-FR-Standard-A` - Französisch (Frankreich) (Frauenstimme - wird verwendet, wenn die Systemsprache FR ist und keine Sprache angegeben wurde)
- `fr-FR-Standard-B` - Französisch (Frankreich) (Männerstimme)
- `fr-FR-Standard-C` - Französisch (Frankreich) (Frauenstimme 2)
- `fr-FR-Standard-D` - Französisch (Frankreich) (Männerstimme 2)
- `de-DE-Standard-A` - Deutsch (Deutschland) (Frauenstimme - wird verwendet, wenn die Systemsprache DE ist und keine Sprache angegeben wurde)
- `de-DE-Standard-B` - Deutsch (Deutschland) (Männerstimme)
- `el-GR-Standard-A` - Griechisch (Griechenland) (weibliche Stimme)
- `hi-IN-Standard-A` - Hindi (Indien) (weibliche Stimme)
- `hi-IN-Standard-B` - Hindi (Indien) (Männerstimme)
- `hi-IN-Standard-C` - Hindi (Indien) (Männerstimme 2)
- `hu-HU-Standard-A` - Ungarisch (Ungarn) (weibliche Stimme)
- `id-ID-Standard-A` - Indonesisch (Indonesien) (weibliche Stimme)
- `id-ID-Standard-B` - Indonesisch (Indonesien) (Männerstimme)
- `id-ID-Standard-C` - Indonesisch (Indonesien) (Männerstimme 2)
- `it-IT-Standard-A` - Italienisch (Italien) (weibliche Stimme - wird verwendet, wenn die Systemsprache IT ist und keine Sprache angegeben wurde)
- `it-IT-Standard-B` - Italienisch (Italien) (Frauenstimme 2)
- `it-IT-Standard-C` - Italienisch (Italien) (Männerstimme)
- `it-IT-Standard-D` - Italienisch (Italien) (Männer 2 Stimme)
- `ja-JP-Standard-A` - Japanisch (Japan) (weibliche Stimme)
- `ja-JP-Standard-B` - Japanisch (Japan) (Frauenstimme 2)
- `ja-JP-Standard-C` - Japanisch (Japan) (Männerstimme)
- `ja-JP-Standard-D` - Japanisch (Japan) (Männerstimme 2)
- `ko-KR-Standard-A` - Koreanisch (Südkorea) (weibliche Stimme)
- `ko-KR-Standard-B` - Koreanisch (Südkorea) (Frauenstimme 2)
- `ko-KR-Standard-C` - Koreanisch (Südkorea) (Männerstimme)
- `ko-KR-Standard-D` - Koreanisch (Südkorea) (Männerstimme 2)
- `cmn-CN-Standard-A` - Mandarin-Chinesisch (weibliche Stimme)
- `cmn-CN-Standard-B` - Mandarin-Chinesisch (Männerstimme)
- `cmn-CN-Standard-C` - Mandarin-Chinesisch (männliche 2-Stimme)
- `nb-NO-Standard-A` - Norwegisch (Norwegen) (weibliche Stimme)
- `nb-NO-Standard-B` - Norwegisch (Norwegen) (Männerstimme)
- `nb-NO-Standard-C` - Norwegisch (Norwegen) (Frauenstimme 2)
- `nb-NO-Standard-D` - Norwegisch (Norwegen) (Männerstimme 2)
- `nb-no-Standard-E` - Norwegisch (Norwegen) (weibliche 3-Stimme)
- `pl-PL-Standard-A` - Polnisch (Polen) (weibliche Stimme - wird verwendet, wenn die Systemsprache PL ist und keine Sprache angegeben wurde)
- `pl-PL-Standard-B` - Polnisch (Polen) (Männerstimme)
- `pl-PL-Standard-C` - Polnisch (Polen) (Männerstimme 2)
- `pl-PL-Standard-D` - Polnisch (Polen) (Frauenstimme 2)
- `pl-PL-Standard-E` - Polnisch (Polen) (weibliche 3-Stimme)
- `pt-BR-Standard-A` - Portugiesisch (Brasilien) (Frauenstimme - wird verwendet, wenn die Systemsprache PT ist und keine Sprache angegeben wurde)
- `pt-PT-Standard-A` - Portugiesisch (Portugal) (weibliche Stimme)
- `pt-PT-Standard-B` - Portugiesisch (Portugal) (Männerstimme)
- `pt-PT-Standard-C` - Portugiesisch (Portugal) (Männerstimme 2)
- `pt-PT-Standard-D` - Portugiesisch (Portugal) (Frauenstimme 2)
- `ru-RU-Standard-A` - Russisch (Russland) (weibliche Stimme - wird verwendet, wenn die Systemsprache RU ist und keine Sprache angegeben wurde)
- `ru-RU-Standard-B` - Russisch (Russland) (Männerstimme)
- `ru-RU-Standard-C` - Russisch (Russland) (Frauenstimme 2)
- `ru-RU-Standard-D` - Russisch (Russland) (2 männliche Stimme)
- `sk-SK-Standard-A` - Slowakisch (Slowakei) (weibliche Stimme)
- `es-ES-Standard-A` - Spanisch (Spanien) (Frauenstimme - wird verwendet, wenn die Systemsprache ES ist und keine Sprache angegeben wurde)
- `sv-SE-Standard-A` - Schwedisch (Schweden) (weibliche Stimme)
- `tr-TR-Standard-A` - Türkisch (Türkei) (weibliche Stimme)
- `tr-TR-Standard-B` - Türkisch (Türkei) (Männerstimme)
- `tr-TR-Standard-C` - Türkisch (Türkei) (Frauenstimme 2)
- `tr-TR-Standard-D` - Türkisch (Türkei) (weibliche 3-Stimme)
- `tr-TR-Standard-E` - Türkisch (Türkei) (Männerstimme)
- `uk-UA-Standard-A` - Ukrainisch (Ukraine) (weibliche Stimme)
- `vi-VN-Standard-A` - Vietnamesisch (Vietnam) (weibliche Stimme)
- `vi-VN-Standard-B` - Vietnamesisch (Vietnam) (Männerstimme)
- `vi-VN-Standard-C` - Vietnamesisch (Vietnam) (Frauenstimme 2)
- `vi-VN-Standard-D` - Vietnamesisch (Vietnam) (männliche 2-Stimme)

MACHEN:

- Veranstaltungsort

## Auto-Inline-Tastatur basierend auf Einstellungen im Admin (Easy-Keyboard)
Für jeden Zustand können die zusätzlichen Einstellungen aktiviert werden:

![die Einstellungen](../../../en/adapterref/iobroker.telegram/img/stateSettings.png)

Durch Eingabe von `/cmds` wird folgende Tastatur im Telegramm angezeigt:

![die Einstellungen](../../../en/adapterref/iobroker.telegram/img/stateSettings1.png)

`/cmds` kann im Konfigurationsdialog des Telegrammadapters durch einen beliebigen Text (z.B. "?") ersetzt werden.

Wenn im Konfigurationsdialog des Telegrammadapters die Option **Räume im Tastaturbefehl verwenden** aktiviert ist, wird im ersten Schritt die Raumliste angezeigt. ***Noch nicht implementiert***

### Einstellungen im Zustand
Zuerst muss die Konfiguration aktiviert werden.

#### Alias
Name des Geräts. Wenn der Name leer ist, wird der Name vom Objekt übernommen.
Durch Eingabe von „Türlampe“ wird das folgende Menü für den booleschen Zustand angezeigt.
![die Einstellungen](../../../en/adapterref/iobroker.telegram/img/stateSettings2.png)

Sie können das Gerät einschalten, das Gerät ausschalten oder den Zustand abfragen.
Wenn Sie auf `Door lamp ?` klicken, erhalten Sie `Door lamp  => switched off`.

### Schreibgeschützt
Wenn aktiviert, werden die EIN/AUS-Schaltflächen nicht angezeigt, sondern nur ein `Door lamp ?`.

### Änderungen melden
Wenn sich der Status des Geräts geändert hat (z. B. jemand hat die Lampe physisch eingeschaltet), wird der neue Status an das Telegramm übermittelt.
Z.B. `Door lamp  => switched on`.

### Schaltflächen in Reihe
Wie viele Schaltflächen müssen in der Zeile für ein Gerät angezeigt werden.
Wegen des langen Namens ist es vielleicht besser, nur 2 (oder sogar nur einen) Button in der Zeile anzuzeigen.

![die Einstellungen](../../../en/adapterref/iobroker.telegram/img/stateSettings3.png)

### Nur schreiben
Wenn aktiviert, wird die Schaltfläche Statusabfrage (`Door lamp ?`) nicht angezeigt.
![die Einstellungen](../../../en/adapterref/iobroker.telegram/img/stateSettings4.png)

### Auf Befehl
Welcher Text wird auf der Schaltfläche `ON` angezeigt.
Wie hier: ![die Einstellungen](../../../en/adapterref/iobroker.telegram/img/stateSettings5.png)

Erzeugt folgende Tastatur: ![die Einstellungen](../../../en/adapterref/iobroker.telegram/img/stateSettings6.png)

### EIN Text
Der Text, der im Zustandsbericht angezeigt wird.
Z.B. `Door lamp => activated` wenn der Status des Geräts auf wahr geändert wurde und der **ON-Text** `activated` ist

Die EIN/AUS-Texte werden nur angezeigt, wenn **Änderungen melden** aktiviert ist.

### AUS-Befehl
Dasselbe wie **EIN-Befehl**, aber für AUS.

### AUS-Text
Dasselbe wie **ON Text**, aber für OFF.
Z.B. `Door lamp => deactivated` wenn sich der Status des Geräts auf „false“ geändert hat und der **OFF-Text** `deactivated` ist

### Nur wahr
Z.B. bei Tasten haben sie keinen AUS-Zustand. In diesem Fall wird die Schaltfläche AUS nicht angezeigt.

![die Einstellungen](../../../en/adapterref/iobroker.telegram/img/stateSettings7.png)

## So empfangen Sie Nachrichten in Gruppenchats mit dem Telegrammadapter
Wenn der Telegramm-Bot Nachrichten empfängt, die vom Benutzer an den Bot in privaten Chats gesendet wurden, aber keine Nachrichten empfängt, die von Benutzern in Gruppenchats gesendet wurden.
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

## So senden Sie Nachrichten über node-red
Für einfache Textnachrichten an alle Benutzer fügen Sie den Text einfach in die Nutzlast der Nachricht ein und senden Sie ihn an den ioBroker-Status `telegram.INSTANCE.communicate.response`.

Wenn Sie zusätzliche Optionen festlegen möchten, füllen Sie die Payload mit einem JSON-Objekt, wie zum Beispiel:

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