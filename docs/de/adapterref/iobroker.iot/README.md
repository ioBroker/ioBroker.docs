---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.iot/README.md
title: ioBroker IoT-Adapter
hash: nHZSEspy8ae1p1z5byBu/bftY4W74lkX+nHje3yM8ks=
---
![Anzahl der Installationen](http://iobroker.live/badges/iot-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.iot.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.iot.svg)

<img src="admin/iot.svg" style="width: 100px;"/>

# IoBroker IoT-Adapter
![Testen und Freigeben](https://github.com/ioBroker/ioBroker.iot/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/iot/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Dieser Adapter dient NUR der Kommunikation mit Amazon Alexa, Google Home und Nightscout.
Er dient nicht dem Fernzugriff auf Ihre ioBroker-Instanz. Verwenden Sie hierfür den ioBroker.cloud-Adapter.

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Einstellungen
Um den IoT-Adapter zu verwenden, sollten Sie sich zunächst in der ioBroker-Cloud [https://iobroker.pro](https://iobroker.pro) registrieren.

[Verweis auf Google API-Typeinstellungen](https://developers.google.com/actions/smarthome/guides/)

![Einleitung](../../../en/adapterref/iobroker.iot/img/intro.png)

### Sprache
Wenn Sie die Standardsprache auswählen, werden die intelligenten Namen von Geräten und Enumerationen nicht übersetzt. Wenn Sie eine Sprache angeben, werden alle bekannten Namen in diese Sprache übersetzt. Dies dient dem schnellen Wechsel zwischen mehreren Sprachen zu Demonstrationszwecken.

### Platzieren Sie die Funktion zuerst in Namen
Ändern Sie die Reihenfolge der Funktionen und Rollen in selbst generierten Namen:

- wenn false: „Raumfunktion“, zB „Wohnzimmerdimmer“
- falls zutreffend: „Veranstaltungsraum“, zB „Dimmer Wohnzimmer“

### Verketten Sie Wörter mit
Sie können das Wort definieren, das zwischen Funktion und Raum platziert wird. Beispielsweise wird aus „im“ und aus „Dimmer Wohnzimmer“ „Dimmer im Wohnzimmer“.

Dies wird jedoch nicht empfohlen, da die Erkennungsmaschine ein weiteres Wort analysieren muss und dies zu Missverständnissen führen kann.

### AUS-Pegel für Schalter
Einige Gruppen bestehen aus gemischten Geräten: Dimmern und Schaltern. Diese können mit den Befehlen „EIN“ und „AUS“ sowie mit Prozentwerten gesteuert werden.
Wenn der Befehl `Set to 30%` und `OFF level is 30%` lautet, werden die Schalter eingeschaltet. Mit dem Befehl „Auf 25 % einstellen“ werden alle Schalter ausgeschaltet.

Wenn der Befehl „AUS“ lautet, merkt sich der Adapter außerdem die aktuelle Dimmerstufe, sofern der tatsächliche Wert größer oder gleich „30 %“ ist.

Wenn später der neue Befehl „EIN“ kommt, schaltet der Adapter den Dimmer nicht auf 100 %, sondern auf die gespeicherte Stufe.

Beispiel:

- Nehmen wir an, dass der _AUS-Pegel_ 30 % beträgt.
- Das virtuelle Gerät „Licht“ verfügt über zwei physische Geräte: _Schalter_ und _Dimmer_.
- Befehl: „Stelle das Licht auf 40 %“. Der Adapter merkt sich diesen Wert für _Dimmer_, stellt ihn für „Dimmer“ ein und schaltet den _Schalter_ ein.
- Befehl: „Schalte das Licht aus“. Der Adapter stellt den Dimmer auf 0 % und schaltet den Schalter aus.
- Befehl: „Licht einschalten“. _Dimmer_ => 40 %, _Schalter_ => EIN.
- Befehl: "Stelle das Licht auf 20%". _dimmer_ => 20%, _switch_ => AUS. Der Wert für den Dimmer wird nicht gespeichert, da er unter dem _AUS-Level_ liegt.
- Befehl: „Licht einschalten“. _Dimmer_ => 40 %, _Schalter_ => EIN.

### Von ON
Sie können das Verhalten des ON-Befehls für den Zahlenstatus auswählen. Der spezifische Wert kann ausgewählt werden, oder es wird der letzte Wert ungleich Null verwendet.

### Antwort schreiben an
Für jeden Befehl wird eine Textantwort generiert. Hier können Sie die Objekt-ID definieren, an die dieser Text geschrieben werden soll. Beispiel: _sayit.0.tts.text_.

### Farben
Der Kanal benötigt 3–5 Zustände mit den folgenden Rollen:

- `level.color.saturation` – erforderlich für die Erkennung des Kanals,
- `level.color.hue`,
- `level.dimmer`,
- `Schalter` - optional,
- `level.color.temperature` (optional)

```
Alexa, set the "device name" to "color"
Alexa, turn the light fuchsia
Alexa, set the bedroom light to red
Alexa, change the kitchen to the color chocolate
```

### Sperren
Um die Sperren sperren zu können, muss der Status die Rolle `switch.lock` haben und `native.LOCK_VALUE` zur Bestimmung des Sperrstatus haben.
Wenn Sie einen separaten Wert zur Steuerung der Sperre benötigen, können Sie `native.CONTROL VALUE` verwenden.

```
Alexa, is "lock name" locked/unlocked
Alexa, lock the "lock name"
```

## Wie Namen generiert werden
Der Adapter versucht, virtuelle Geräte für die Smart-Home-Steuerung (z. B. Amazon Alexa oder Google Home) zu generieren.

Dafür gibt es zwei wichtige Aufzählungen: Räume und Funktionen.

Räume sind beispielsweise: Wohnzimmer, Badezimmer, Schlafzimmer.
Funktionen sind beispielsweise: Licht, Jalousie, Heizung.

Um den Status in die automatisch generierte Liste aufzunehmen, müssen folgende Bedingungen erfüllt sein:

– Der Status muss in einer „Funktions“-Aufzählung enthalten sein.
- Der Status muss eine Rolle haben (`state`, `switch` oder `level.\*`, z. B. `level.dimmer`), wenn er nicht direkt in „Funktionen“ enthalten ist.

Es kann sein, dass der Kanal im `functions` ist, der Staat selbst jedoch nicht.

- der Status muss beschreibbar sein: `common.write` = true
- Der Statusdimmer muss „common.type“ als „Nummer“ haben.
- Der Zustand Heizung muss `common.unit` als `°C`, `°F` oder `°K` und `common.type` als `number` haben

Wenn sich der Status nur in „Funktionen“ und nicht in einem „Raum“ befindet, wird der Name des Status verwendet.

Die Zustandsnamen werden aus Funktion und Raum generiert. Beispielsweise werden alle Lichter im Wohnzimmer im virtuellen Gerät „Wohnzimmerlicht“ gesammelt.
Der Benutzer kann diesen Namen nicht ändern, da er automatisch generiert wird.
Ändert sich jedoch der Enumerationsname, ändert sich auch dieser Name. (Beispiel: Die Funktion „Licht“ wurde in „Lichter“ geändert, sodass „Wohnzimmerlicht“ in „Wohnzimmerlichter“ geändert wird.)

Alle Regeln werden ignoriert, wenn der Status „common.smartName“ hat. In diesem Fall wird nur der Smart Name verwendet.

Wenn `common.smartName` gleich `false` ist, wird der Status oder die Aufzählung nicht in die Listengenerierung einbezogen.

Über den Konfigurationsdialog können die einzelnen Zustände bequem entfernt und zu virtuellen Gruppen oder als einzelnes Gerät hinzugefügt werden.
![Konfiguration](../../../en/adapterref/iobroker.iot/img/configuration.png)

Wenn die Gruppe nur einen Status hat, kann sie umbenannt werden, da hierfür der SmartName des Status verwendet wird.
Wenn die Gruppe mehr als einen Status hat, muss die Gruppe über die Namen der Enumeration umbenannt werden.

Um eigene Gruppen zu erstellen, kann der Benutzer den Adapter „Szenen“ installieren oder ein „Skript“ im JavaScript-Adapter erstellen.

### Ersetzt
Sie können Zeichenfolgen angeben, die in den Gerätenamen automatisch ersetzt werden. Wenn Sie beispielsweise „replaces“ auf `.STATE,.LEVEL` setzen, werden alle Zeichenfolgen `.STATE` und `.LEVEL` aus den Namen gelöscht. Achten Sie auf Leerzeichen.
Wenn Sie `.STATE, .LEVEL` setzen, werden `.STATE` und `.LEVEL` ersetzt und nicht `.LEVEL`.

## Hilfszustände
- `smart.lastObjectID`: Dieser Status wird gesetzt, wenn nur ein Gerät per Home-Skill (Alexa, Google Home) gesteuert wurde.
- `smart.lastFunction`: Funktionsname (falls vorhanden), für den der letzte Befehl ausgeführt wurde.
- `smart.lastRoom`: Raumname (falls vorhanden), für den der letzte Befehl ausgeführt wurde.
- `smart.lastCommand`: Zuletzt ausgeführter Befehl. Mögliche Befehle: `true(ON)`, `false(OFF)`, `number(%)`, `-X(decrease at x)`, `+X(increase at X)`
- `smart.lastResponse`: Textantwort auf Befehl. Kann an eine `text2speech`-Engine (`sayit`) gesendet werden.

## Umschaltmodus
Alexa v3 unterstützt den Umschaltmodus. Das bedeutet: Wenn Sie „Alexa, schalte das Licht an“ sagen und das Licht bereits an ist, wird es ausgeschaltet.

## IFTTT
[Anweisungen](doc/ifttt.md)

## Google Home
Wenn im Protokoll die folgende Fehlermeldung angezeigt wird: `[GHOME] Invalid URL Pro key. Status auto-update is disabled you can set states but receive states only manually`, müssen Sie den URL-Schlüssel neu generieren:

![URL-Schlüssel](../../../en/adapterref/iobroker.iot/img/url_key.png)

## Dienstleistungen
Es besteht die Möglichkeit, Nachrichten an den Cloud-Adapter zu senden.
Wenn Sie `[POST]https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>` aufrufen und den Wert als Nutzlast verwenden.

`curl --data "myString" https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>`

oder

`[GET]https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>&data=myString`

Wenn Sie in den Einstellungen im Feld „Whitelist für Dienste“ den Namen `custom_test` festlegen und mit „custom_test“ als Dienstnamen aufrufen, wird der Status **cloud.0.services.custom_test** auf _myString_ gesetzt.

Sie können "\*" in die Whitelist schreiben und alle Dienste werden zugelassen.

Hier finden Sie eine Anleitung zur Verwendung mit [Tasker](doc/tasker.md).

Der IFTTT-Dienst ist nur zulässig, wenn ein IFTTT-Schlüssel festgelegt ist.

Reservierte Namen sind `ifttt`, `text2command`, `simpleApi`, `swagger`. Diese müssen ohne das Präfix `custom_` verwendet werden.

Sie können die gültige URL für den Dienst auch per Nachricht anfordern:

```js
sendTo('iot.0', 'getServiceEndpoint', { serviceName: 'custom_myService' }, result =>
    console.log(JSON.stringify(result)),
);
// Output: {"result":
//  {"url": "https://service.iobroker.in/v1/iotService?key=xxx&user=uuu&service=custom_myService",
//   "stateID":"iot.0.services.myService",
//   "warning":"Service name is not in white list"
//  }}
```

### `text2command`
Sie können `text2command` in die Whitelist schreiben und eine POST-Anfrage an `https://service.iobroker.in/v1/iotService?service=text2command&key=<user-app-key>&user=<USER_EMAIL>` senden, um Daten in die Variable _text2command.X.text_ zu schreiben.

Sie können auch die GET-Methode verwenden `https://service.iobroker.in/v1/iotService?service=text2command&key=<user-app-key>&user=<USER_EMAIL>&data=<MY COMMAND>`

`X` kann in den Einstellungen durch die Option „Text2Command-Instanz verwenden“ definiert werden.

## Benutzerdefinierte Fertigkeit
Die Antworten für den Custom Skill können auf zwei Arten verarbeitet werden:

- `text2command`
- `Javascript`

### `text2command`
wenn im Konfigurationsdialog die Instanz `text2command` definiert ist, so wird die Frage an die Instanz gesendet.

`text2command` muss so konfiguriert werden, dass die erwartete Phrase analysiert und die Antwort zurückgegeben wird.

### `Javascript`
Es besteht die Möglichkeit, die Frage direkt mit dem Skript zu bearbeiten. Diese ist standardmäßig aktiviert, wenn keine `text2command`-Instanz ausgewählt ist.

Wenn eine Instanz `text2command` definiert ist, muss diese Instanz die Antwort bereitstellen und die Antwort vom _Skript_ wird ignoriert.

Der Adapter stellt die Details in zwei Zuständen mit unterschiedlichem Detaillierungsgrad bereit

- `smart.lastCommand` enthält den empfangenen Text inklusive Informationen zur Art der Abfrage (Intent). Beispiel: `askDevice Status Rasenmäher`
- `smart.lastCommandObj` enthält eine JSON-Zeichenfolge, die in ein Objekt mit den folgenden Informationen analysiert werden kann
- `words` enthält die empfangenen Wörter in einem Array
- `intent` enthält den Typ der Abfrage. Mögliche Werte sind derzeit:
- v1-Fähigkeit: `askDevice`, `controlDevice`, `actionStart`, `actionEnd`, `askWhen`, `askWhere`, `askWho`
- v2-Fähigkeit: „queryIntent“, wenn der vollständige Text erfasst wurde, „controlDevice“ für Fallback mit nur einem Teiltext
- `deviceId` enthält eine Geräte-ID, die das Gerät identifiziert, an das die Anfrage gesendet wurde, bereitgestellt von Amazon, wird eine leere Zeichenfolge sein, wenn sie nicht angegeben wird
- „deviceRoom“ enthält eine zugeordnete Raumkennung, die Sie in der IoT-Admin-Benutzeroberfläche für gesammelte Geräte-IDs konfigurieren können
- `sessionId` enthält eine SessionId der Skill-Sitzung, sollte gleich sein, wenn mehrere Befehle gesprochen wurden, von Amazon bereitgestellt, wird eine leere Zeichenfolge sein, wenn nicht angegeben
- `userId` enthält eine Benutzer-ID des Gerätebesitzers (oder später möglicherweise des Benutzers, der mit der Fähigkeit interagiert hat), die von Amazon bereitgestellt wird. Wenn sie nicht angegeben wird, ist sie eine leere Zeichenfolge.
- „userName“ enthält einen zugeordneten Benutzernamen, den Sie in der IoT-Admin-Benutzeroberfläche für gesammelte Benutzer-IDs konfigurieren können

Weitere Einzelheiten dazu, wie die Wörter erkannt werden und welche Abfragetypen der Alexa Custom Skill unterscheidet, finden Sie unter https://forum.iobroker.net/viewtopic.php?f=37&t=17452.

**Ergebnis über den Status smart.lastResponse zurückgeben**

Die Antwort muss innerhalb von 200 ms im Status `smart.lastResponse` gesendet werden und kann ein einfacher Textstring oder ein JSON-Objekt sein.
Handelt es sich um einen Textstring, wird dieser als Antwort an den Skill gesendet.
Handelt es sich bei dem Text um ein JSON-Objekt, können die folgenden Schlüssel verwendet werden:

- `responseText` muss den Text enthalten, der an Amazon zurückgegeben werden soll
- „shouldEndSession“ ist ein Boolescher Wert und steuert, ob die Sitzung nach der gesprochenen Antwort geschlossen wird oder offen bleibt, um eine weitere Spracheingabe zu akzeptieren.
- `sessionId` muss die Sitzungs-ID enthalten, für die die Antwort bestimmt ist. Geben Sie diese idealerweise an, um gleichzeitige Sitzungen zu ermöglichen. Andernfalls wird die erste Sitzung angenommen, die eine Antwort erwartet.

**Ergebnis über die Nachricht an die IoT-Instanz zurückgeben**

Die IoT-Instanz akzeptiert außerdem eine Nachricht mit dem Namen „alexaCustomResponse“ mit dem Schlüssel „response“ mit einem Objekt, das die Schlüssel `responseText` und `shouldEndSession` und `sessionId` wie oben beschrieben enthalten kann.
Es erfolgt keine Antwort der IoT-Instanz auf die Nachricht!

**Beispiel eines Skripts, das Texte verwendet**

```js
// important, that ack=true
on({ id: 'iot.0.smart.lastCommand', ack: true, change: 'any' }, obj => {
    // you have 200ms to prepare the answer and to write it into iot.X.smart.lastResponse
    setState('iot.0.smart.lastResponse', 'Received phrase is: ' + obj.state.val); // important, that ack=false (default)
});
```

**Beispiel eines Skripts, das JSON-Objekte verwendet**

```js
// important, that ack=true
on({ id: 'iot.0.smart.lastCommandObj', ack: true, change: 'any' }, obj => {
    // you have 200ms to prepare the answer and to write it into iot.X.smart.lastResponse
    const request = JSON.parse(obj.state.val);
    const response = {
        responseText: 'Received phrase is: ' + request.words.join(' ') + '. Bye',
        shouldEndSession: true,
        sessionId: request.sessionId,
    };

    // Return response via state
    setState('iot.0.smart.lastResponse', JSON.stringify(response)); // important, that ack=false (default)

    // or alternatively return as message
    sendTo('iot.0', 'alexaCustomResponse', response);
});
```

### Private Cloud
Wenn Sie private Skills/Aktionen/Notizen für die Kommunikation mit `Alexa/Google Home/Алиса` verwenden, haben Sie die Möglichkeit, die IoT-Instanz zu verwenden, um die Anfragen von ihr zu verarbeiten.

Z. B. für `yandex alice`:

```js
const OBJECT_FROM_ALISA_SERVICE = {}; // object from alisa service or empty object
OBJECT_FROM_ALISA_SERVICE.alisa = '/path/v1.0/user/devices'; // called URL, 'path' could be any text, but it must be there
sendTo('iot.0', 'private', { type: 'alisa', request: OBJECT_FROM_ALISA_SERVICE }, response => {
    // Send this response back to alisa service
    console.log(JSON.stringify(response));
});
```

Die folgenden Typen werden unterstützt:

- „Alexa“ – Handeln mit Amazon Alexa oder Amazon Custom Skill
- `ghome` – Handeln mit Google Actions über Google Home
- „alisa“ – Schauspiel mit Yandex Алиса
- `ifttt` – verhält sich wie IFTTT (eigentlich nicht erforderlich, aber für Testzwecke)

## Yandex Alisa
[Anweisungen](doc/alisa.md)

## Nachrichten an die App senden
Ab Version 1.15.x können Sie Nachrichten an die Anwendung `ioBroker Visu` ([Android](https://play.google.com/store/apps/details?id=com.iobroker.visu) und [iOS](https://apps.apple.com/de/app/iobroker-visu/id1673095774)) senden.
Dazu müssen Sie die folgenden Zustände angeben:

```js
setState('iot.0.app.expire', 60); // optional. Time in seconds
setState('iot.0.app.priority', 'normal'); // optional. Priority: 'high' or 'normal'
setState('iot.0.app.title', 'ioBroker'); // optional. Default "ioBroker"
setState('iot.0.app.message', 'Message text'); // important, that ack=false (default)

// or just one state (this also allows to use payload -> `actions`, `devices` and `link` property)
// only message is mandatory. All other are optional
// Note that, if you are using `actions`or `devices`, the app needs to handle the notification in the background before showing it
// in some scenarios, e.g. low power or spamming to many notifications the OS may decide to not show the notification at all
setState('iot.0.app.message', JSON.stringify({
  message: 'Message text',
  title: 'ioBroker',
  expire: 60,
  priority: 'normal',
  payload: {
      devices: JSON.stringify(['iPhone von Maelle', 'iPhone von Max']), // devices to send the message to, if not given send to all - requires Visu App 1.4.0
      openUrl: 'https://www.iobroker.net', // opens a link when clicking on the notification
      actions: JSON.stringify([ // actions to respond to the notification - requires Visu App 1.4.0
          { buttonTitle: 'Yes', identifier: 'home:yes' }, // The app will display the button title and on clicking the identifier will be set to the state `iot.0.app.devices.<deviceName>.actionResponse`
          { buttonTitle: 'No', identifier: 'home:no' }
      ])
  }
})); // important, that ack=false (default)
```

## Aufgaben
- Smartnamen müssen eine höhere Priorität haben als Gruppen
- Geräte sollten nach Smartnamen gruppiert werden

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN ARBEIT** -->
### 4.0.3 (27.08.2025)
- (@GermanBluefox) Antwort-ID zu benutzerdefinierten Skill-Antworten hinzugefügt

### 4.0.2 (26.08.2025)
- (@GermanBluefox) Einige Dateien wurden in TypeScript neu geschrieben
- (@GermanBluefox) Verbesserung von Alexa V3

### 3.6.0 (02.07.2025)
- (@foxriver76) neue Funktionen für die kommende Visu App 1.4.0

### 3.5.2 (04.06.2025)
- (@GermanBluefox) Fehler im Backend behoben

### 3.5.1 (31.05.2025)
- (@GermanBluefox) Regeln mit TypeScript neu schreiben
- (@GermanBluefox) Paketaktualisierungen. SVG-Logo

### 3.5.0 (24.02.2025)
- (@foxriver76) Unterstützung für Benachrichtigungsmanager hinzugefügt (Benachrichtigungen werden als Push-Benachrichtigungen an die Visu-App gesendet)

### 3.4.5 (29.12.2024)
- (@GermanBluefox) Die maximale Länge der erkannten Geräte für Alexa wurde überprüft

### 3.4.4 (08.12.2024)
- (@GermanBluefox) Namensbearbeitung der Geräte für Alexa 3 korrigiert

### 3.4.3 (05.11.2024)
- (@GermanBluefox) hat die Ergänzung der Geräte für Alexa korrigiert
- (@GermanBluefox) Kompilierung der GUI geändert, um veraltete Pakete zu entfernen

### 3.4.2 (17.09.2024)
- (@GermanBluefox) GUI-Pakete aktualisiert und `gulp` entfernt
- (@foxriver76) überschreiben Sie das benutzerdefinierte „result“-Attribut nicht bei der „sendToAdapter“-Antwort (Visu-App – nur für Entwickler relevant)

### 3.4.0 (26.08.2024)
- (@foxriver76) neue Befehle für die Visu-App hinzugefügt
- (Bluefox) aktualisierte Pakete
- (Bluefox) Migrierte GUI für Admin v7

### 3.3.0 (09.05.2024)
- (foxriver76) Fehler beim erneuten Verbinden behoben
- (foxriver76) Adapter für neue ioBroker Visu App-Zustände vorbereitet
- (Bluefox) aktualisierte Pakete

### 3.2.2 (11.04.2024)
- (foxriver76) Entfernen Sie einige Warnungen, die nur im Debug-Protokoll enthalten sein sollten

### 3.2.1 (11.04.2024)
- (foxriver76) Problem behoben, dass nur gültiges JSON über den Nachrichtenstatus an die App gesendet werden konnte

### 3.2.0 (10.04.2024)
- (foxriver76) Geofence mit der ioBroker Visu-App implementiert

### 3.1.0 (05.02.2024)
- (bluefox) Aktualisierte Pakete
- (Bluefox) Statusänderungsbericht für Alexa v3 deaktiviert

### 3.0.0 (24.10.2023)
- (bluefox) Aktualisierte Pakete
- (Bluefox) Die minimal unterstützte Node.js-Version ist 16

### 2.0.11 (20.06.2023)
- (Bluefox) Unterstützung für das Umschalten des Status hinzugefügt (Alexa 3)
- (bluefox) Kleine Verbesserungen für Alexa 3 vorgenommen

### 2.0.9 (15.06.2023)
- (Bluefox) Arbeite an der Unterstützung für Amazon Alexa v3

### 2.0.2 (05.06.2023)
- (Bluefox) Unterstützung für Amazon Alexa v3 hinzugefügt
- (bluefox) Unterstützung für Blutzuckeranzeige entfernt

### 1.14.6 (12.05.2023)
- (bluefox) Korrigierte Übersetzungen

### 1.14.5 (01.03.2023)
- (bluefox) Namen der Enumerationen in der GUI korrigiert

### 1.14.3 (10.01.2023)
- (kirovilya) Feste Verarbeitung für Lichter mit CT und RGB in Alisa

### 1.14.2 (23.12.2022)
- (Bluefox) Aktualisierte GUI-Pakete

### 1.14.1 (22.12.2022)
- (bluefox) Die Axios-Version wurde auf 0.27.2 herabgestuft

### 1.14.0 (13.12.2022)
- (Bluefox) Netatmo-Unterstützung hinzugefügt

### 1.13.0 (08.12.2022)
- (Apollon77) Unterstützung für Custom Skill v2 hinzugefügt

### 1.12.5 (09.11.2022)
- (Bluefox) Kleine Änderungen an der Konfigurations-GUI

### 1.12.4 (03.11.2022)
- (Bluefox) Ukrainische Sprache hinzugefügt
- (bluefox) Blockly für unbekannte Sprachen korrigiert

### 1.12.2 (01.10.2022)
- (Apollon77) Absturzfall behoben

### 1.12.1 (27.09.2022)
- (bluefox) Fehler in der GUI mit leerem Passwort behoben

### 1.12.0 (27.09.2022)
- (Apollon77) Sättigung nicht mit einer Prozentabfrage über Alexa steuern
- (bluefox) GUI auf v5 migriert

### 1.11.9 (22.07.2022)
- (Apollon77) Temperaturregelung für Thermostate über Alexa reparieren

### 1.11.8 (24.06.2022)
- (Apollon77) Aktualisieren Sie Abhängigkeiten, um einen besseren automatischen Wiederaufbau zu ermöglichen

### 1.11.7 (13.06.2022)
- (bluefox) Versucht, die URL-Schlüsselerstellung für Google Home zu korrigieren

### 1.11.5 (03.06.2022)
- (kirovilya) Alisa: Update für Binärsensor „Bewegung“ und „Kontakt“

### 1.11.4 (29.03.2022)
- (Apollon77) Behebung von Absturzfällen, die von Sentry gemeldet wurden

### 1.11.3 (23.03.2022)
- (bluefox) Die Generierung des URL-Schlüssels für Dienste wurde hinzugefügt

### 1.11.2 (20.03.2022)
- (Apollon77) Behebung des von Sentry (IOBROKER-IOT-3P) gemeldeten Absturzfalls

### 1.11.1 (18.03.2022)
- (Apollon77) Optimieren Sie die Protokollierung, wenn viele Geräte verwendet werden

### 1.11.0 (17.03.2022)
- (Apollon77) Unterstützt auch "gespeichert", wenn ein RGB-Status ein-/ausgeschaltet wird
- (Apollon77) Kontrollprozentwert korrigiert, um Min/Max korrekt zu berücksichtigen
- (Bluefox) Unterstützung für Antwortnachrichten, die länger als 128 KB sind (Zip)

### 1.10.0 (09.03.2022)
- (Apollon77) Min/Max bei der Berechnung des Wertes für byOn mit %-Werten beachten

### 1.9.7 (20.02.2022)
- (Apollon77) Behebung des von Sentry (IOBROKER-IOT-3C) gemeldeten Absturzfalls

### 1.9.6 (19.02.2022)
- (Apollon77) Stellen Sie sicher, dass Sie sich den Aus-Wert nicht merken, wenn Sie gespeicherte Werte für Ein verwenden
- (Apollon77) Behebung des von Sentry (IOBROKER-IOT-3A) gemeldeten Absturzfalls

### 1.9.5 (08.02.2022)
- (bluefox) Google Home-Fehler mit Farbsteuerung behoben

### 1.9.4 (08.02.2022)
- (bluefox) Fehler beim Abrufen der Zertifikate behoben

### 1.9.3 (03.02.2022)
- (bluefox) Veraltetes Paket „request“ entfernt
- (bluefox) Refactoring und bessere Fehlerbehandlung

### 1.9.2 (26.01.2022)
- (bluefox) Experimentelle Unterstützung für Fernzugriff hinzugefügt

### 1.8.25 (18.11.2021)
- (bluefox) Die Aktivierung der Kategorie wurde korrigiert

### 1.8.24 (19.09.2021)
- (bluefox) Beachten Sie die Min/Max-Grenzen durch Kontrolle

### 1.8.23 (18.09.2021)
- (bluefox) Die Reaktion für die Heizungssteuerung wurde behoben

### 1.8.22 (16.05.2021)
- (Bluefox) Machen Sie es admin4-kompatibel

### 1.8.21 (16.05.2021)
- (bluefox) Die Verschlüsselung des Passworts wurde korrigiert. Achtung: Wenn im Protokoll die Meldung angezeigt wird, dass das Passwort ungültig ist, geben Sie das Passwort im Konfigurationsdialog noch einmal ein und speichern Sie.

### 1.8.20 (16.05.2021)
- (foxriver76) Wir schreiben jetzt Daten, die von benutzerdefinierten Diensten empfangen wurden, mit dem Bestätigungsflag

### 1.8.19 (14.05.2021)
- (bluefox) Nur eine Debug-Ausgabe hinzugefügt

### 1.8.16 (13.03.2021)
- (Bluefox) hat die Blindfunktion in Alisa behoben

### 1.8.15 (12.03.2021)
- (bluefox) implementierte die Sensorfunktionalität in Alisa

### 1.8.14 (12.03.2021)
- (bluefox) ermöglichte die Steuerung der Jalousien in Alisa

### 1.8.13 (04.02.2021)
- (Apollon77) fehlendes Objekt smart.lastObjectID hinzufügen

### 1.8.12 (02.02.2021)
- (bluefox) Das Dimmerproblem mit Alisa wurde behoben.

### 1.8.11 (20.01.2021)
- (Morluktom) Alexa - Die Anfrage nach Prozentwerten wurde korrigiert

### 1.8.10 (20.01.2021)
- (bluefox) Die Strategie zur Wiederverbindung wurde hinzugefügt, wenn die DNS-Adresse nicht aufgelöst werden kann

### 1.8.9 (27.12.2020)
- (bluefox) Konfigurations-GUI auf den neuesten Stand gebracht

### 1.8.8 (14.12.2020)
- (bluefox) Der Fehler „Google Home“ wurde behoben

### 1.8.6 (13.12.2020)
- (Bluefox) Versuchen Sie, den Google Home-Fehler zu beheben

### 1.8.5 (23.11.2020)
- (bluefox) Die Konfigurationstabelle für Google Home wurde korrigiert

### 1.8.4 (18.11.2020)
- (bluefox) Die Konfigurationstabelle für Google Home wurde korrigiert

### 1.8.3 (16.11.2020)
- (bluefox) Versuch, das Setzen auf „false“ beim Start für Google Home zu beheben

### 1.8.2 (15.11.2020)
- (bluefox) Die Debug-Ausgaben für Google Home wurden hinzugefügt

### 1.8.1 (13.11.2020)
- (bluefox) Das Löschen von Google Home-Geräten wurde korrigiert

### 1.8.0 (12.11.2020)
- (bluefox) Die Google Home-Tabelle wurde neu geschrieben

### 1.7.15 (05.11.2020)
- (Morluktom) Die Anfrage nach der Temperatur wurde korrigiert

### 1.7.14 (05.11.2020)
- (Bluefox) Das Dialogfeld „ID auswählen“ wurde aktualisiert.

### 1.7.12 (25.09.2020)
- (Bluefox) Das Dialogfeld „ID auswählen“ wurde aktualisiert.

### 1.7.9 (17.09.2020)
- (Bluefox) Aktualisierte GUI für die Konfiguration.

### 1.7.7 (02.09.2020)
- (bluefox) Informationen zum geänderten Verknüpfungsprozess hinzugefügt.

### 1.7.6 (25.08.2020)
- (bluefox) Im Dunkelmodus wurden einige Farben geändert.

### 1.7.5 (21.08.2020)
- (Apollon77) Absturz verhindert (Sentry IOBROKER-IOT-W)
- (bluefox) Werte für Modi werden in Alisa in Zahlen umgewandelt

### 1.7.3 (16.08.2020)
- (bluefox) Staubsauger zu Alisa hinzugefügt

### 1.7.1 (16.08.2020)
- (bluefox) Jalousien, Schloss und Thermostat zu Alisa hinzugefügt

### 1.6.4 (06.08.2020)
- (Apollon77) Absturz verhindert (Sentry IOBROKER-IOT-V)

### 1.6.3 (04.08.2020)
- (bluefox) Französische Buchstaben zu den zulässigen Symbolen hinzugefügt

### 1.6.1 (10.07.2020)
- (bluefox) Neuer SelectID-Dialog in der GUI verwendet

### 1.5.3 (28.05.2020)
- (bluefox) Kleingeld für Nightscout

### 1.5.2 (21.05.2020)
- (bluefox) Geänderte Anforderungen für das Passwort
- (bluefox) Versuchen Sie nicht, die "scharfe" laden, wenn der Blutzucker nicht aktiviert

### 1.4.18 (11.05.2020)
- (Apollon77) Stellen Sie sicher, dass ungültige konfigurierte Zustände oder Werte ohne Zeitstempel den Adapter nicht zum Absturz bringen (Sentry IOBROKER-IOT-8)
- (Apollon77) Stellen Sie sicher, dass nach der Trennung veröffentlicht wird, um den Adapter nicht zu beschädigen (Sentry IOBROKER-IOT-A)

### 1.4.17 (11.05.2020)
- (bluefox) Bessere Fehlerausgabe ist implementiert

### 1.4.14 (01.05.2020)
- (bluefox) Das Problem wurde behoben, wenn der Administrator nicht auf Port 8081 ist

### 1.4.12 (30.04.2020)
- (Apollon77) Fehlerfall behandelt, bei dem system.config-Objekte nicht vorhanden sind (Sentry IOBROKER-IOT-5)

### 1.4.11 (26.04.2020)
- (Bluefox) IOBROKER-IOT-REACT-F behoben

### 1.4.10 (24.04.2020)
- (Bluefox) Von Sentry gemeldete Abstürze behoben

### 1.4.7 (23.04.2020)
- IoT-Absturz behoben, wenn es bei der Kommunikation mit Google zu Timeouts kommt (Sentry IOBROKER-IOT-2)
- IoT-Absturz behoben, wenn Google ohne benutzerdefinierte Daten antwortet (Sentry IOBROKER-IOT-1)

### 1.4.6 (18.04.2020)
- (Apollon77) Fügen Sie die Sentry-Fehlerberichterstattung zu „React Frontend“ hinzu

### 1.4.4 (14.04.2020)
- (Apollon77) Entfernen Sie die Warnungen des js-controller 3.0 und ersetzen Sie den Zugriff auf „adapter.objects“.
- (Apollon77) Linux-Abhängigkeiten für die Canvas-Bibliothek hinzufügen
- (Apollon77) Sentry-Konfiguration hinzufügen

### 1.4.2 (08.04.2020)
- (TA2k) UpdateState für Google Home reparieren

### 1.4.1 (04.04.2020)
- (bluefox) Die Blutzuckerabfrage wird nun unterstützt

### 1.3.4 (26.02.2020)
- (TA2k) Dekonzprobleme in Google Home behoben

### 1.3.3 (12.02.2020)
- (Apollon77) Alisa-Fehler mit ungültigen SmartName-Attributen beheben

### 1.3.2 (10.02.2020)
- (Apollon77) Nutzung mit allen Arten von Admin-Ports und Reverse-Proxys optimiert

### 1.3.1 (09.02.2020)
- (Apollon77) Abhängigkeitsaktualisierungen
- (Apollon77) Kompatibel mit Admin > 4.0 machen, da socket.io aktualisiert wurde

### 1.2.1 (18.01.2020)
- (bluefox) Problem behoben, wenn der Port des Admins nicht 8081 ist

### 1.2.0 (04.01.2020)
- (TA2k) Handhabung und Visualisierung von Google Home verbessert.

### 1.1.10 (03.01.2020)
- (bluefox) Jetzt ist es möglich, die Temperaturwerte auszuwählen, wie Alexa es angibt
- (bluefox) Erlaubt den Einstellungstyp unmittelbar nach dem Einfügen des neuen Status

### 1.1.9 (27.11.2019)
- (bluefox) Behoben: Manchmal konnte die Konfiguration nicht geladen werden

### 1.1.8 (12.09.2019)
- (Bluefox) Optimierung der Google Home-Kommunikation wurde durchgeführt

### 1.1.7 (11.09.2019)
- (bluefox) Die Sendegeschwindigkeit zu Google Home ist jetzt begrenzt

### 1.1.6 (11.09.2019)
- (TA2k) Raumfixierung für Google Home und LinkedDevices

### 1.1.4 (10.09.2019)
- (Bluefox) Keepalive-Wert verringert, um Problem mit der Trennung zu beheben

### 1.1.3 (09.09.2019)
- (TA2k) Google Home-Problem mit LinkedDevices behoben

### 1.1.0 (06.09.2019)
- (bluefox) Unterstützung für Aliase hinzugefügt

### 1.0.8 (03.09.2019)
- (TA2k) Verbesserte Unterstützung für Google Home
- (TA2k) Automatische Erkennung für RGB, RGBSingle, Hue, CT, MediaDevice, Switch, Info, Socket, Light, Dimmer, Thermostat, WindowTilt, Blinds, Slider hinzugefügt
- (TA2k) Unterstützung für das manuelle Hinzufügen von Zuständen als Geräte hinzugefügt
- (TA2k) Update-Status nach der Synchronisierung korrigieren
- (TA2k) Typische Google Home-Geräte und Eigenschaften/Aktionen hinzugefügt
- (TA2k) Fix: Nur Prozessaktualisierungsnachricht, wenn Alexa in den Optionen aktiviert ist

### 1.0.4 (01.08.2019)
- (bluefox) Passwortverschlüsselung behoben. Bitte Passwort erneut eingeben!

### 1.0.3 (30.07.2019)
- (Bluefox) Sprachprobleme für Google Home und Yandex Alice behoben

### 1.0.1 (26.07.2019)
- (Bluefox) Unterstützung für private Fähigkeiten/Aktionen wurde hinzugefügt.

### 1.0.0 (14.07.2019)
- (TA2k) Google Home-Liste wurde hinzugefügt

### 0.5.0 (29.06.2019)
- (bluefox) hat versucht, Yandex Alisa hinzuzufügen

### 0.4.3 (14.04.2019)
- (Apollon77) Ändern Sie die Aktivierung/Deaktivierung von Amazon Alexa und Google Home in der Konfiguration, sodass diese wirklich „aktiv ist, wenn ausgewählt“ sind.

### 0.4.2 (10.03.2019)
- (bluefox) Ermöglicht das Aktivieren und Deaktivieren von Amazon Alexa und Google Home über die Konfiguration.

### 0.4.1 (19.02.2019)
- (Bluefox) Versionsprüfung zu Google Home hinzufügen

### 0.3.1 (13.01.2019)
- (bluefox) Blockly wurde repariert

### 0.3.0 (30.12.2018)
- (Bluefox) Die Erkennung von Google-Geräten wurde behoben

### 0.2.2 (21.12.2018)
- (bluefox) Generierung eines neuen URL-Schlüssels wurde hinzugefügt

### 0.2.0 (18.12.2018)
- (bluefox) Ändern Sie den Namen des Adapters

### 0.1.8 (21.10.2018)
- (bluefox) Erweiterte Diagnose hinzugefügt

### 0.1.7 (14.10.2018)
- (bluefox) Der Konfigurationsdialog wurde korrigiert
- (bluefox) Die Möglichkeit, die Antwort mit einem Skript für die benutzerdefinierte Fertigkeit zu erstellen, wurde implementiert.

### 0.1.4 (26.09.2018)
- (Bluefox) Erster Commit

## License

The MIT License (MIT)

Copyright (c) 2018-2025 bluefox <dogafox@gmail.com>

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