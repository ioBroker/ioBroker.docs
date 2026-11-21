---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.max/README.md
title: ioBroker.max
hash: IChHpHDpNDEUd7lgUQNfCdu6DLrw2r4DPv/BfKTD36Q=
---
![Logo](../../../en/adapterref/iobroker.max/admin/max.png)

![Stabil](https://iobroker.live/badges/max-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.max.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.max.svg)
![Lizenz](https://img.shields.io/github/license/sadam6752-tech/ioBroker.max.svg)
![NPM](https://nodei.co/npm/iobroker.max.png?downloads=true)
![Test und Freigabe](https://github.com/sadam6752-tech/ioBroker.max/actions/workflows/test-and-release.yml/badge.svg)
![Anzahl der Installationen](https://iobroker.live/badges/max-installed.svg)

# IoBroker.max
**ioBroker-Adapter für die MAX Messenger-Bot-Integration**

Senden und empfangen Sie Nachrichten über den Bot [MAX Messenger](https://max.ru) von ioBroker.
Analog zu ioBroker.telegram - Benachrichtigungen senden, Befehle empfangen, Geräte steuern.

## Merkmale
- Nachrichten an bestimmte Benutzer oder alle bekannten Benutzer senden
- Nachrichten und Befehle von Benutzern empfangen
- Dynamische Benutzerobjekte werden beim ersten Kontakt erstellt
- Zugriffskontrolle über Liste zulässiger Benutzer-IDs
- Senden Sie Bilder, Videos, Audiodateien und andere Dateien (lokaler Pfad oder HTTP(S)-URL, z. B. ein Kamerafoto)
- Schaltflächen unterhalb einer Nachricht (Menüs wie im Telegram-Adapter)
- Antwortbefehle werden nur an den Benutzer (oder Gruppenchat) gesendet, der sie gesendet hat - `communicate.request` / `communicate.response`

wie im Telegram-Adapter

- Gruppenchats: Sende Nachrichten an eine Gruppe, der der Bot angehört, und empfange deren Nachrichten.
- Textformatierung (Markdown oder HTML), Nachrichten-IDs, Bearbeiten und Löschen gesendeter Nachrichten
- Fragen mit Antwortbuttons, die auf die Antwort warten (`fragen`)
- ioBroker-Benachrichtigungen (notification-manager) und Blockly-Blöcke für den JavaScript-Adapter
Sprachnachrichten werden als Dateien gespeichert und in `communicate.pathFile` angesagt, ähnlich wie beim Telegram-Adapter (z. B. für

Spracherkennung durch einen anderen Adapter)

- Empfangene Fotos werden als Dateien gespeichert und auch in `communicate.pathFile` angekündigt (z. B. für einen KI-Agenten).
- Unterstützung für `sendTo()` zur Verwendung in Skripten

## Installation
Installieren Sie den Adapter über die ioBroker-Admin-Oberfläche: Öffnen Sie *Adapter*, suchen Sie nach `max` und installieren Sie den Adapter aus dem *Neuesten*- oder *Stabilen*-Repository. Eine manuelle npm-Installation ist nicht erforderlich.

## Konfiguration
1. Erstelle einen Bot in MAX Messenger über **MasterBot** - erhalte dein Token.
2. Öffnen Sie die Adaptereinstellungen in ioBroker Admin.
3. Geben Sie den **Bot-Token** ein.
4. Optional können Sie **zulässige Benutzer-IDs** (durch Komma getrennt) festlegen, um den Zugriff einzuschränken.

Das Bot-Token wird **verschlüsselt** (`encryptedNative`) und **geschützt** (`protectedNative`) gespeichert: Der JS-Controller verschlüsselt es mit dem Systemgeheimnis, sodass andere Adapter es nicht lesen können. In Versionen bis 0.1.11 wurde es im Klartext gespeichert; beim ersten Start von Version 0.1.12 verschiebt der Adapter das Token automatisch in den verschlüsselten Speicher (Logeintrag `The MAX bot token is now stored encrypted`, gefolgt von einem Neustart). Falls das Token nach dem Update nicht lesbar ist (Logeintrag `token was rejected` oder `token is unreadable`), geben Sie es bitte erneut in den Einstellungen ein.

### Zertifikat der MAX-API
Die MAX-API (`platform-api2.max.ru`) verwendet ein Zertifikat der **russischen vertrauenswürdigen Stammzertifizierungsstelle** des russischen Ministeriums für digitale Entwicklung. Node.js bindet dieses Stammzertifikat nicht ein und ignoriert den Truststore des Betriebssystems, weshalb Verbindungen mit `fetch failed (UNABLE_TO_GET_ISSUER_CERT_LOCALLY)` fehlschlagen würden. Der Adapter verwendet daher dieses Stammzertifikat (`lib/certs/russian-trusted-root-ca.pem`, gültig bis 2032, SHA-256 `D2:6D:2D:02:31:B7:C3:9F:92:CC:73:85:12:BA:54:10:35:19:E4:40:5D:68:B5:BD:70:3E:97:88:CA:8E:CF:31`) und vertraut ihm **ausschließlich für seine eigenen Anfragen an die MAX-API**. Es ist keine Installation auf dem Host erforderlich, und der globale Truststore von Node.js sowie aller anderen Adapter bleibt unverändert.

## Verwendung
In allen Beispielen steht `123456` für die ID eines MAX-Benutzers und `-987654321` für die ID eines Gruppenchats (Gruppenchat-IDs sind negativ). Ein Benutzer erhält eine ID, sobald er dem Bot schreibt oder auf **Start** klickt: Sie erscheint als Kanal `max.0.users.<userId>` und in `max.0.message.userId`.

### Über den Status senden
Schreibe in `max.0.message.send`:

- `"123456|Hello World"` - an Benutzer 123456 senden (nur eine numerische Vorwahl wird als Benutzer-ID verwendet)
- `"Hallo zusammen"` - an alle bekannten Benutzer senden (wenn `sendToAllUsers` aktiviert ist); ein Text wie z. B.

`"Status|ok"` ohne numerisches Präfix wird ebenfalls als Broadcast gesendet.

- ein JSON-Objekt, z. B. `{"userId": 123456, "text": "Tür", "image": "/opt/iobroker/snapshot.jpg"}` - dieselben Felder

Wie in `sendTo()` unten beschrieben; ohne `userId` handelt es sich um eine Sendung.

`max.0.users.<userId>.send` akzeptiert Klartext (unverändert gesendet, einschließlich `|`) oder dasselbe JSON-Objekt ohne `userId`.

Beispiele für Zustandswerte:

| Zustand | Wert | Wirkung |
| --- | --- | --- |
| `max.0.message.send` | `123456\|Washing machine is done` | Text an Benutzer 123456 |
| `max.0.message.send` | `{"userId": 123456, "text": "Front door", "image": "http://192.168.1.20/snapshot.jpg"}` | Kamerabild mit Bildunterschrift an Benutzer 123456 |
| `max.0.message.send` | `{"text": "Monthly report", "file": "/opt/iobroker/report.pdf"}` | Datei an alle bekannten Benutzer senden |
| `max.0.users.123456.send` | `Hello` | Text an diesen Benutzer |
| `max.0.users.123456.send` | `{"image": ["/tmp/a.jpg", "/tmp/b.jpg"]}` | Zwei Bilder für diesen Benutzer |
| `max.0.users.123456.send` | `{"video": "/tmp/clip.mp4", "text": "Motion in the garden"}` | Video mit Untertitel für diesen Benutzer |
| `max.0.users.123456.send` | `{"video": "/tmp/clip.mp4", "text": "Bewegung im Garten"}` | Video mit Untertitel für diesen Benutzer |

### Per Skript senden
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

### Textformatierung
`format: 'markdown'` oder `format: 'html'` formatieren den Text mit der Auszeichnungssprache von MAX. Für Skripte, die für den Telegram-Adapter geschrieben wurden, wird auch `parse_mode` akzeptiert: `'HTML'` wird zu `html`, `'Markdown'` und `'MarkdownV2'` werden zu `markdown`. Ohne beide Formate wird der Text wie zuvor als Klartext gesendet. Das Format funktioniert zusammen mit Anhängen und Schaltflächen, in `sendTo()`, in JSON-Statuswerten (`message.send`, `users.<userId>.send`, `chats.<chatId>.send`) und in `editMessage`.

```javascript
sendTo('max.0', 'send', { userId: 123456, text: '<b>Alarm</b> in the <i>garage</i>', format: 'html' });
sendTo('max.0', 'send', { userId: 123456, text: '**Alarm** in the garage', format: 'markdown' });
sendTo('max.0', 'send', { userId: 123456, text: '<b>Alarm</b>', parse_mode: 'HTML' }); // Telegram style
```

Die Auszeichnungssprache ist die von MAX, nicht die von Telegram: Ein für Telegram MarkdownV2 maskierter Text (`\.`, `\!`) kann in MAX anders aussehen - entfernen Sie die Maskierung, wenn Sie ein solches Skript portieren. Welche Tags und Markdown-Elemente MAX rendert, ist in der Dokumentation der MAX Bot API (<https://dev.max.ru/docs-api>) beschrieben.

### Nachrichten-IDs, Bearbeiten und Löschen
Jede `send`-Antwort gibt die ID der gesendeten Nachricht zurück (`messageId`, wie `returnMessageIds: true` des Telegram-Adapters):

| Empfänger | Antwort |
| --- | --- |
| Ein Benutzer / ein Gruppenchat | `{ result: 'sent', messageId: 'mid.…' }` |
| broadcast | `{ result: 'sent', sent, failed, skipped, messages: [{ userId, messageId }], failures: [{ userId, error }] }` |

Mithilfe der ID kann eine Nachricht später geändert oder entfernt werden:

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

- `editMessage` `{ messageId, text?, format?, keyboard? }` antwortet mit `{ result: 'edited', messageId }`. Ohne

`keyboard` Die Schaltflächen bleiben unverändert, `keyboard: null` entfernt sie, eine neue `keyboard` ersetzt sie.

- `deleteMessage` `{ messageId }` Antworten `{ result: 'deleted', messageId }`.
- Fehler werden als `{ error }` zurückgegeben (siehe [Fehlerbehebung](#answers-of-sendto)).

### Fragen mit Antwortbuttons (fragen)
`ask` sendet eine Frage mit einer Schaltfläche pro Antwort und wartet auf die Antwort des angefragten Benutzers (oder eines beliebigen Mitglieds des angefragten Gruppenchats). Der Callback empfängt die Antwort:

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

Die gedrückte Taste wird in MAX mit dem Antworttext bestätigt. Antworten werden nicht in `communicate.request` geschrieben.
Offene Fragen enden mit `{ error: 'Adapter stopped' }`, wenn die Instanz beendet wird.

### IoBroker-Benachrichtigungen
Der Adapter empfängt Benachrichtigungen von ioBroker (`supportedMessages.notifications`), ähnlich wie der Telegram-Adapter: Wählen Sie `max.0` in den Einstellungen des **Benachrichtigungsmanagers**-Adapters aus. Es wird eine Benachrichtigung als HTML-Code ohne Ton mit Kategorie, Host und der neuesten Nachricht jeder Instanz gesendet.

- an alle Benutzer in **Zulässige Benutzer-IDs** - auch an Benutzer, die noch nicht bekannt sind (sie müssen **Start** gedrückt haben in

dem Bot, andernfalls lehnt MAX die Nachricht ab);

- ohne diese Liste an jeden bekannten Benutzer.

Die Einstellung **An alle bekannten Nutzer senden** gilt **nicht** für Benachrichtigungen. Der Adapter antwortet mit `{ sent: true }`, wenn mindestens ein Nutzer die Benachrichtigung erhalten hat, andernfalls mit `{ sent: false }`, damit der Benachrichtigungsmanager den nächsten Messenger ausprobieren kann.

### Meldungen für Skripte und KI-Agenten (Hilfe)
`sendTo('max.0', 'help', {})` beantwortet `{ help, commands }`: `help` beschreibt alle Befehle mit ihren Parametern und Antworten in englischer Sprache für KI-Agenten (z. B. ioBroker.pi-agent) und Skriptautoren; `commands` listet jeden Befehl mit `write` auf (`true`, wenn er etwas sendet, ändert oder löscht). Es funktioniert auch, wenn der Bot nicht ausgeführt wird.

### Blockly
Der Adapter fügt der Kategorie **sendTo** des JavaScript-Adapters zwei Blöcke hinzu:

| Block | Generiert |
| --- | --- |
| **MAX** - Instanz, Nachricht, Benutzer-ID oder Gruppenchat-ID (beides leer = alle bekannten Benutzer), Format, ohne Benachrichtigung, Anhang (Bild, Datei, Video, Audio: Pfad oder URL), Protokollierungsstufe | `sendTo('max.0', 'send', { ... })` |
| **Frage über MAX** - Instanz, Frage, Benutzer-ID oder Gruppenchat-ID, Format, Protokollierungsstufe, Antworten (Zahnradsymbol: Antworten hinzufügen), ein Zweig pro Antwort | `sendTo('max.0', 'ask', { ..., answers: [...] }, async (msg) => { if (msg.data == '0') { ... } })` |

Bei **allen Instanzen** wird der Aufruf an jede Instanz des Adapters (`sendTo('max', ...)`) gesendet.

### Nachrichten ohne Benachrichtigung
`notify: false` sendet eine Nachricht stumm (ohne Ton oder Pop-up auf dem Telefon). `disable_notification: true` des Telegram-Adapters wird ebenfalls akzeptiert, sodass bestehende Skripte weiterhin funktionieren. Es funktioniert mit `sendTo()` und mit JSON-Statuswerten.

```javascript
sendTo('max.0', 'send', {
    chatId: -987654321,
    text: 'Radiation: ' + getState('0_userdata.0.radiation').val + ' µSv/h',
    notify: false,
});
```

### Senden Sie Bilder, Videos, Audiodateien und Dateien
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

- `image`, `video`, `audio`, `file`: ein lokaler Dateipfad oder eine `http(s)`-URL, eine einzelne Zeichenkette oder eine Liste; `text` ist

optional, wenn ein Anhang beigefügt ist.

Der Adapter lädt die Datei selbst (auch von Geräten im lokalen Netzwerk, die MAX nicht erreichen kann) und lädt sie hoch nach

MAX; Dateien über 100 MB werden abgelehnt.

- Bei einem Broadcast wird jeder Anhang nur einmal hochgeladen und an alle Benutzer gesendet.

Der Callback empfängt `{ result: 'sent', messageId }` für einen einzelnen Benutzer, `{ result: 'sent', sent, failed, skipped, messages, failures }` for a broadcast, or `{ error: '...' }`, wenn nichts zugestellt wurde (kein Text oder Anhang, Bot läuft nicht, `sendToAllUsers` deaktiviert, keine bekannten Benutzer, Anhang nicht lesbar oder Upload fehlgeschlagen, Zustellung fehlgeschlagen).

Broadcasts erreichen nur Benutzer, die zuvor mit dem Bot Kontakt aufgenommen haben und die über **Erlaubte Benutzer-IDs** zugelassen sind.

### Befehle eines Benutzers beantworten (wie der Telegram-Adapter)
Jede Nachricht (und jeder Tastendruck) wird wie folgt veröffentlicht: `telegram.0.communicate.request`:

| Status | Inhalt |
| --- | --- |
| `max.0.communicate.request` | `[Name]text` - zuletzt geschrieben, löst diesen Zustand aus |
| `max.0.communicate.requestChatId` | Gruppenchat-ID, `0` für einen privaten Dialog |
| `max.0.communicate.requestMessageId` | MAX Nachrichten-ID |
| `max.0.communicate.response` | Hier einen Text oder ein JSON-Objekt eingeben: Es wird entweder im selben Gruppenchat oder privat an den Absender gesendet. |
| `max.0.communicate.pathFile` | vollständiger Pfad der zuletzt empfangenen Sprachnachricht oder Fotodatei (siehe [Sprachnachrichten](#voice-messages), [Fotos](#photos)) |
| `max.0.communicate.pathFile` | vollständiger Pfad der zuletzt empfangenen Sprachnachricht oder Fotodatei (siehe [Sprachnachrichten](#voice-messages), [Fotos](#photos)) |

Die IDs werden vor der Anfrage geschrieben, sodass ein durch `communicate.request` ausgelöstes Skript die entsprechenden Werte ausliest. Ein für den Telegram-Adapter geschriebenes Skript benötigt nur geringfügige Änderungen:

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

Gleiches gilt für `sendTo()` und den benutzerbezogenen Status - die Antwort geht nur an den Absender:

```javascript
on({ id: /^max\.0\.users\.\d+\.last_message$/, ack: true, change: 'any' }, obj => {
    const userId = obj.id.split('.')[3];
    if (String(obj.state.val).trim().toLowerCase() === 'pool') {
        sendTo('max.0', 'send', { userId, text: `Pool level: ${getState('0_userdata.0.pool.level').val} m` });
    }
});
```

### Schaltflächen (Menü)
`keyboard` fügt Schaltflächen unterhalb einer Nachricht hinzu: eine Liste von Zeilen, jede Zeile eine Liste von Schaltflächen (maximal 7 pro Zeile, 30 Zeilen, 210 Schaltflächen).

| Taste | Effekt beim Drücken |
| --- | --- |
| `'Pool'` | sendet `Pool` als Nachricht des Benutzers - wird wie ein eingegebener Befehl behandelt |
| `{ text: 'Website', url: 'https://…' }` | öffnet den Link |
| `{ text: 'Website', url: 'https://…' }` | öffnet den Link |

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

Die Tastatur funktioniert auch mit JSON-Statuswerten, z. B. `max.0.users.123456.send` = `{"text": "Menu", "keyboard": [["Pool", "Temperature"]]}`.

### Gruppenchats
Fügen Sie den Bot in MAX einem Gruppenchat hinzu. Der Adapter erstellt den Kanal `max.0.chats.<chatId>` (benannt nach dem Chat), sobald der Bot hinzugefügt wird oder die erste Nachricht eingeht. Je nach Gruppeneinstellungen benötigt der Bot möglicherweise Administratorrechte, um alle Nachrichten empfangen zu können.

| Status | Inhalt |
| --- | --- |
| `max.0.chats.<chatId>.last_message` | letzte Nachricht im Chat |
| `max.0.chats.<chatId>.callback_data` | zuletzt im Chat gedrückte Schaltflächen-Payload |
| `max.0.chats.<chatId>.send` | Text oder JSON (Anhänge, Tastatur), der an den Chat gesendet werden soll |
| `max.0.chats.<chatId>.send` | Text oder JSON (Anhänge, Tastatur), der an den Chat gesendet werden soll |

Nachrichten in einer Gruppe setzen außerdem `max.0.message.chatId` und `max.0.communicate.requestChatId`, sodass `max.0.communicate.response` Antworten in der Gruppe erscheinen. Gruppenmitglieder werden nicht zu Einträgen unterhalb von `max.0.users` und erhalten keine Broadcasts.

```javascript
// to a group chat
sendTo('max.0', 'send', { chatId: -987654321, text: 'Washing machine is done' });
sendTo('max.0', 'send', { chatId: -987654321, image: 'http://192.168.1.20/snapshot.jpg', text: 'Doorbell' });
```

Über den Status: `max.0.message.send` = `-987654321|Washing machine is done` (eine negative ID vor `|` bedeutet immer Gruppenchat, niemals Broadcast), oder `max.0.chats.-987654321.send` = `Washing machine is done`. Ein negatives `userId` in `sendTo()` wird ebenfalls als `chatId` interpretiert.

### Sprachnachrichten
Eine Sprachnachricht eines berechtigten Benutzers (siehe **Zugelassene Benutzer-IDs**) wird heruntergeladen und im Datenordner von ioBroker gespeichert:

```
<iobroker-data>/max_<instance>/voice/<message id>.<ext>
```

Beispielsweise `/opt/iobroker/iobroker-data/max_0/voice/mid.0000abc.ogg`. Die Dateiendung ergibt sich aus dem Inhaltstyp des Downloads (oder der URL), standardmäßig `.ogg`. Die 20 neuesten Dateien werden aufbewahrt, ältere werden gelöscht.

Der Adapter schreibt dann in dieser Reihenfolge:

1. `max.0.communicate.requestChatId`, `max.0.communicate.requestUserId`, `max.0.communicate.requestMessageId` - die

Absender der Sprachnachricht;

2. `max.0.communicate.pathFile` - der vollständige Pfad der Datei (immer mit `/` als Trennzeichen).

Dies entspricht dem Vertrag `telegram.0.communicate.pathFile` des Telegram-Adapters. Daher kann ein Adapter oder ein Skript, das Telegram-Sprachnachrichten transkribiert, auch auf `max.0` verweisen. Eine Nachricht, die nur eine Sprachnachricht enthält, schreibt `communicate.request`, `message.received` oder `users.<userId>.last_message` nicht mit leerem Text; eine Sprachnachricht mit einer Bildunterschrift schreibt sowohl den Text als auch die Datei.

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

Die Datei befindet sich auf dem ioBroker-Host der Instanz `max`; ein Client auf einem anderen Host eines Multihost-Systems kann sie nicht lesen. Mit dem Protokollierungsgrad `debug` protokolliert der Adapter die Anhangstypen jeder eingehenden Nachricht (`Attachments of message …: audio{payload:url,token}`) und den Pfad jeder gespeicherten Sprachnachricht.

### Fotos
Fotos von berechtigten Benutzern (Anhänge vom Typ `image`) werden wie Sprachnachrichten heruntergeladen und gespeichert, immer und ohne Einstellung:

```
<iobroker-data>/max_<instance>/photo/<message id>.<ext>          one photo in the message
<iobroker-data>/max_<instance>/photo/<message id>_<n>.<ext>      several photos: _1, _2, ...
```

Beispielsweise `/opt/iobroker/iobroker-data/max_0/photo/mid.0000abc.jpg`. Die Dateiendung (`.jpg`, `.png`, `.webp`, `.gif`) ergibt sich aus dem Inhaltstyp des Downloads, ansonsten aus den ersten Bytes der Datei oder ansonsten aus der URL; standardmäßig `.jpg`. Dateien, die größer als 20 MB sind, werden nicht heruntergeladen. Die **50 neuesten Dateien** des Fotoordners werden gespeichert, ältere werden beim Speichern eines neuen Fotos gelöscht (der Sprachordner speichert seine jeweils 20 neuesten Dateien).

Der Adapter schreibt in dieser Reihenfolge:

1. `max.0.communicate.requestChatId`, `max.0.communicate.requestUserId`, `max.0.communicate.requestMessageId` - die

Absender der Nachricht;

2. `max.0.communicate.pathFile` - einmal für jedes Foto, mit dem vollständigen Pfad der Datei (immer mit `/` als Trennzeichen);
3. nur wenn die Nachricht eine Bildunterschrift hat: `max.0.communicate.request` (`[Name]caption`), wie eine Textnachricht.

Fotos und Bildunterschriften einer Nachricht tragen die gleiche Kennzeichnung `communicate.requestMessageId`, sodass sie vom Nutzer zusammengefügt werden können.
Ein Foto ohne Bildunterschrift trägt lediglich die Kennzeichnung `communicate.pathFile`; `communicate.request`, `message.received` und `users.<userId>.last_message` bleiben unverändert. Fotos von nicht autorisierten Nutzern werden nicht heruntergeladen. Ein Foto, dessen Download fehlschlägt, wird als Warnung (`Photo 1 of 2 from … could not be saved: …`) protokolliert; die übrigen Fotos und die Bildunterschrift werden dennoch veröffentlicht.

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

MAX liefert für jedes Foto eine Download-URL; die Größe ist nicht wählbar, daher speichert der Adapter das Foto in der von MAX bereitgestellten Form.
Wie bei Sprachnachrichten befindet sich die Datei auf dem ioBroker-Host der Instanz `max`.

### Verbindungsstatus
`max.0.info.connection` ist `true`, solange der Adapter Aktualisierungen von der MAX-API empfängt. Ein Verbindungsverlust wird als Warnung protokolliert und automatisch wiederholt; ein von der MAX-API abgelehntes Token wird als Fehler gemeldet und nicht erneut versucht.

### Nachrichten empfangen
Abonnieren Sie `max.0.message.received`; davor stehen `max.0.message.userId` (Absender) und `max.0.message.chatId` (Gruppenchat, `0` für einen privaten Dialog). Um dem Absender zu antworten, verwenden Sie `max.0.communicate.request` oder `max.0.users.<userId>.last_message` (siehe oben).

### Benutzerbezogene Zustände
Jeder Benutzer erhält seinen eigenen Kanal unter `max.0.users.<userId>`:

- `last_message` - zuletzt empfangene Nachricht
- `send` - Hier schreiben, um die Nachricht direkt an diesen Benutzer zu senden
- `callback_data` - Nutzdaten des letzten Button-Callbacks
- `username` - Anzeigename
- `started` - `true`, sobald der Benutzer im Bot auf "Start" geklickt hat.

Bekannte Benutzer werden nach einem Neustart des Adapters aus dem Objektbaum wiederhergestellt, sodass Broadcasts weiterhin funktionieren, ohne dass auf das erneute Schreiben jedes einzelnen Benutzers gewartet werden muss.

## Fehlerbehebung
### Die Ursache eines Fehlers finden
`sendTo()` beantwortet jeden Anruf. Protokolliere die Antwort - sie gibt die Ursache an:

```javascript
sendTo('max.0', 'send', { chatId: -987654321, text: 'Test' }, res => {
    log('MAX: ' + JSON.stringify(res), res && res.error ? 'warn' : 'info');
});
```

`{"result":"sent"}` bedeutet, dass MAX die Nachricht akzeptiert hat. Weitere Details erhalten Sie, indem Sie den Protokollierungsgrad der Instanz `max.0` auf `debug` setzen (Instanzen → `max.0` → Protokollierungsgrad): Jede eingehende Nachricht wird mit Absender und Chat protokolliert.

### Antworten von `sendTo()`
| Antwort | Ursache | Lösung |
| --- | --- | --- |
| Keine Antwort | Adapterversion unter 0.1.6 (kein `messagebox`) oder die Instanz läuft nicht | Adapter aktualisieren, prüfen, ob `max.0` ausgeführt wird |
| `Unknown command: …` | `sendTo('max.0', '<command>', …)` mit einem anderen Befehl als `send`, `editMessage`, `deleteMessage`, `ask`, `answerCallback`, `sendNotification` oder `help` | verwenden Sie einen dieser Befehle |
| `Bot not initialized` | Der Bot läuft nicht: Kein Token vorhanden oder der Token wurde beim Start abgelehnt. | Überprüfen Sie das Protokoll von `max.0` beim Start. |
| `sendToAllUsers is disabled` | Eine Broadcast-Nachricht (ohne `userId` / `chatId` oder Klartext in `message.send`), während **An alle bekannten Benutzer senden** deaktiviert ist | Aktivieren Sie die Option oder geben Sie `userId` / `chatId` an. Adapterversionen unter 0.1.9 kennen `chatId` nicht und behandeln einen solchen Aufruf als Broadcast-Nachricht. |
| `No known users` | Broadcast, aber noch kein Benutzer hat dem Bot geschrieben (oder keiner ist in **Zulässige Benutzer-IDs**) | Benutzer sollen im Bot auf **Start** klicken |
| `Delivery failed for all users` | Broadcast, jede einzelne Zustellung fehlgeschlagen | siehe die Warnungen `Failed to send to <userId>` im Protokoll |
| `Invalid userId: …` / `Invalid chatId: …` | Die ID ist keine ganze Zahl | Verwende die Nummer aus `max.0.users` / `max.0.chats` |
| `Use either userId or chatId` | beide gegeben | nur eines davon angeben |
| `Invalid keyboard: …` | falsch `keyboard` (die Meldung benennt Zeile/Schaltfläche, z. B. `button 1/2 has no text`) | siehe [Tasten](#buttons-menu) |
| `Invalid image: expected a file path or an http(s) URL` | Ein Anhang ist keine Zeichenkette (dasselbe gilt für `video`, `audio`, `file`) | Geben Sie einen Pfad oder eine URL als Text an |
| `Cannot attach image …: Cannot read …: ENOENT` | Die Datei existiert nicht auf dem ioBroker-Host (`EACCES`: Keine Berechtigung) | Überprüfen Sie Pfad und Berechtigungen des Benutzers `iobroker` |
| `Cannot attach …: … is too large` | Datei über 100 MB | Kleinere Datei senden |
| `Cannot attach …: Download of … failed: HTTP 401` / `404` | Die URL benötigt Anmeldeinformationen oder existiert nicht | `http://user:password@host/…`, URL im Browser prüfen |
| `Cannot attach …: Upload of … failed: HTTP …` | MAX hat den Upload abgelehnt (z. B. Dateityp oder -größe) | Versuchen Sie ein anderes Format |
| `answerCallback needs userId and text` / `No button press of user … to answer` | `answerCallback` keine Daten oder der Tastendruck wurde bereits beantwortet | jeden Tastendruck einmal beantworten |
| `Invalid format: …` / `Invalid parse_mode: …` | `format` ist nicht `markdown` / `html`, `parse_mode` ist nicht `HTML` / `Markdown` / `MarkdownV2` | Verwenden Sie einen dieser Werte oder lassen Sie ihn weg |
| `editMessage needs messageId` / `deleteMessage needs messageId` | kein `messageId` angegeben | aus der Antwort von `send` übernehmen |
| `editMessage needs text or keyboard` | `editMessage` ohne Änderungen | gib `text` und/oder `keyboard` an |
| `Edit failed: …` / `Delete failed: …` | MAX hat die Änderung abgelehnt (Grund folgt, z. B. ist die Nachricht zu alt oder stammt nicht von diesem Bot) | überprüfe `messageId` |
| `404: …` auf `editMessage` / `deleteMessage` | Die Nachricht existiert nicht (bereits gelöscht, falsche ID) | Überprüfe `messageId` |
| `ask needs userId or chatId` / `ask needs a text` / `ask needs 1 to 30 answers` / `ask: every answer needs a text` | unvollständig `ask` | Geben Sie einem Empfänger eine Frage und 1-30 Antworten |
| `{ timeout: true }` (Antwort von `ask`) | Niemand hat rechtzeitig geantwortet | Erhöhung `timeout` (Sekunden, bis zu 3600) |
| `Adapter stopped` (Antwort auf `ask`) | Die Instanz wurde beendet, während die Frage noch offen war | Erneut fragen |
| `Adapter gestoppt` (Antwort auf `ask`) | Die Instanz wurde gestoppt, während die Frage offen war | erneut fragen |

### Fehler der MAX-API
Von MAX zurückgegebene Fehler haben die Form `<HTTP status>: <text>`.

| Fehler | Ursache | Lösung |
| --- | --- | --- |
| `401: Invalid access_token` | Das Token ist falsch oder wurde widerrufen; beim Start steht im Log `the token was rejected` und der Adapter versucht es nicht erneut | Token erneut von MasterBot in die Einstellungen kopieren |
| `403: …` | Der Bot darf dort nicht schreiben, z. B. weil er keine Rechte in der Gruppe hat oder der Benutzer den Bot blockiert hat | Dem Bot Rechte in der Gruppe geben / den Benutzer bitten, erneut auf **Start** zu klicken |
| `429: …` | Zu viele Anfragen | Weniger häufig senden, Nachrichten zusammenfassen |
| `400: …` | MAX hat den Inhalt abgelehnt (z. B. ein zu langer Text - bis zu 4000 Zeichen) | Text kürzen, Anhänge prüfen |
| `400: …` | MAX hat den Inhalt abgelehnt (z. B. ein zu langer Text - bis zu 4000 Zeichen) | Text kürzen, Anhänge prüfen |

### Verbindungsprobleme (Protokoll von `max.0`)
| Protokolleintrag | Ursache | Lösung |
| --- | --- | --- |
| `fetch failed (UNABLE_TO_GET_ISSUER_CERT_LOCALLY …)` | Adapter unter 0.1.7: Node.js vertraut dem Zertifikat der MAX-API nicht | Adapter aktualisieren (siehe [Zertifikat der MAX-API](#certificate-of-the-max-api)) |
| `fetch failed (ENOTFOUND …)` / `(EAI_AGAIN …)` | DNS: Der Host kann `platform-api2.max.ru` nicht auflösen | Überprüfen Sie den DNS-Server/Internetzugang des ioBroker-Hosts |
| `fetch failed (ECONNREFUSED …)` / `(ETIMEDOUT …)` | keine Verbindung (Firewall, Proxy, kein Internet) | Ausgehende HTTPS-Verbindungen zu `platform-api2.max.ru` zulassen |
| `Connection to the MAX API lost: …` | Kurzer Ausfall; `info.connection` wird auf „false“ gesetzt | nichts - der Adapter verbindet sich wieder und protokolliert `Connected to the MAX API` |
| `Failed to start MAX bot: … Retrying in 60 s` | Keine Verbindung beim Start | Der Adapter versucht es alle 60 Sekunden erneut |
| `No MAX bot token configured!` | Das Token-Feld ist leer | Geben Sie das Token ein |
| `The stored MAX bot token is unreadable …` | Das Token wurde beschädigt (z. B. durch Version 0.1.3) | Geben Sie das Token erneut in den Einstellungen ein |
| `The MAX bot token is now stored encrypted (one-time migration)` | Aktualisierung von einer Version bis zu 0.1.11 - Information, kein Fehler | nichts, der Adapter wird einmal neu gestartet |
| `Das MAX-Bot-Token wird jetzt verschlüsselt gespeichert (einmalige Migration)` | Aktualisierung von einer Version bis 0.1.11 - Information, kein Fehler | nichts, der Adapter wird einmal neu gestartet |

### Nachrichten aus einer Gruppe kommen nicht an
Wenn `max.0.chats.<chatId>` nach dem Hinzufügen des Bots und dem ersten Beitrag in der Gruppe nicht angezeigt wird, empfängt der Bot keine Gruppennachrichten: Machen Sie ihn zum Administrator der Gruppe. Mit dem Protokollierungsgrad `debug` wird jede empfangene Nachricht als `Message from <userId> in chat <chatId>: …` protokolliert.

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