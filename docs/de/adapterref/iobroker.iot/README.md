---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.iot/README.md
title: ioBroker IoT-Adapter
hash: qfPH9qXDGZeD2CgwBIQeivMVC/gqeWVRr7Ko5za6ogw=
---
![Anzahl der Installationen](http://iobroker.live/badges/iot-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.iot.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.iot.svg)

<img src="admin/iot.svg" style="width: 100px;"/>

# IoBroker IoT-Adapter
![Test und Freigabe](https://github.com/ioBroker/ioBroker.iot/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/iot/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Dieser Adapter dient ausschließlich der Kommunikation mit Amazon Alexa, Google Home und Nightscout.
Er ist nicht für den Fernzugriff auf Ihre ioBroker-Instanz geeignet. Verwenden Sie hierfür den ioBroker.cloud-Adapter.

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Erste Schritte
### Was bewirkt dieser Adapter?
Dieser Adapter verbindet Ihre ioBroker-Geräte mit Sprachassistenten wie Amazon Alexa und Google Home. Er erstellt automatisch virtuelle Smart-Home-Geräte, die per Sprachbefehl gesteuert werden können.

### Grundlegende Konzepte
**Enumerationen** sind die Methode von ioBroker, Ihre Geräte zu organisieren. Es gibt zwei Arten:

- **Räume**: Orte wie „Wohnzimmer“, „Schlafzimmer“, „Küche“
- **Funktionen**: Gerätetypen wie „Licht“, „Heizung“, „Jalousien“

**Intelligente Namen** sind die Namen, die Sprachassistenten (Alexa, Google Home) zur Identifizierung Ihrer Geräte verwenden. Der Adapter generiert diese Namen automatisch, indem er Raum- und Funktionsinformationen kombiniert (z. B. „Wohnzimmerleuchte“).

### So funktioniert es:
1. Sie organisieren Ihre ioBroker-Zustände mithilfe von Aufzählungen in **Räume** und **Funktionen**.
2. Der Adapter erkennt Geräte automatisch und vergibt aussagekräftige Namen wie „Wohnzimmerbeleuchtung“ oder „Schlafzimmerheizung“.
3. Diese virtuellen Geräte sind in Alexa oder Google Home verfügbar.
4. Sie können sie mit Sprachbefehlen wie „Alexa, schalte das Wohnzimmerlicht ein“ steuern.

### Voraussetzungen
Um den IoT-Adapter zu verwenden, müssen Sie sich zuerst in der ioBroker-Cloud registrieren [https://iobroker.pro](https://iobroker.pro).

Hinweis: Der Feuchtigkeitssensor kann nicht ohne den Temperatursensor angezeigt werden, da Alexa und Google Home solche Geräte nicht unterstützen.

[Verweis auf Google API-Typeinstellungen](https://developers.google.com/actions/smarthome/guides/)

![Einleitung](../../../en/adapterref/iobroker.iot/img/intro.png)

## Einstellungen
### Sprache
Diese Einstellung steuert die Sprache, die für automatisch generierte Gerätenamen verwendet wird.

- **"Standard"**: Intelligente Namen verwenden die Originalnamen aus Ihren ioBroker-Enumerationen (Räume und Funktionen) ohne Übersetzung.
- **Spezifische Sprache** (z. B. Englisch, Deutsch): Alle bekannten Raum- und Funktionsnamen werden in die ausgewählte Sprache übersetzt.

**Beispiel:**

- Wenn Ihre Enumeration „Wohnzimmer“ heißt und Sie Englisch als Sprache auswählen, wird das Gerät in Alexa/Google Home als „Wohnzimmerleuchte“ bezeichnet.
- Wenn Sie "Standard" auswählen, bleibt es bei "Wohnzimmer Light".

Dies ist nützlich für Demonstrationszwecke oder wenn Sie schnell zwischen Sprachen wechseln möchten.

### Funktion zuerst in Namen einordnen
Diese Einstellung ändert die Reihenfolge der Wörter in automatisch generierten Gerätenamen.

Standardmäßig erstellt der Adapter Gerätenamen, indem er den **Raumnamen** und den **Funktionsnamen** kombiniert.

- **Wenn nicht ausgewählt (Standardeinstellung)**: Der Raum hat Priorität → "Wohnzimmer-Dimmer"
- **Wenn aktiviert**: Die Funktion hat Vorrang → "Wohnzimmer dimmen"

**Warum diese Änderung?** Manche empfinden es als natürlicher, „Alexa, schalte den Dimmer im Wohnzimmer ein“ statt „Alexa, schalte den Dimmer im Wohnzimmer ein“ zu sagen. Entscheiden Sie, was sich in Ihrer Sprache besser anhört.

### Wörter mit verketten
Diese Einstellung fügt in automatisch generierten Gerätenamen ein Verbindungswort zwischen Raum- und Funktionsnamen hinzu.

**Beispiel:**

- **Ohne** diese Einstellung: "Wohnzimmerdimmer" oder "Wohnzimmerdimmer"
- **Mit** "in" als Bindewort: "Dimmer im Wohnzimmer" oder "Wohnzimmer im Dimmer"

**Wichtig:** Die Verwendung dieser Funktion wird generell **nicht empfohlen**, da:

- Sprachassistenten müssen ein zusätzliches Wort erkennen, was zu Missverständnissen führen kann.
- Einfachere Namen funktionieren zuverlässiger mit Sprachbefehlen.

Lassen Sie dieses Feld leer, es sei denn, Sie haben einen bestimmten Grund, Verbindungswörter hinzuzufügen.

### AUS-Pegel für Schalter
Manche Gruppen bestehen aus verschiedenen Geräten: Dimmern und Schaltern. Diese lassen sich mit den Befehlen „EIN“ und „AUS“ sowie mit Prozentangaben steuern.
Wenn der Befehl „`Set to 30%`“ und „`OFF level is 30%`“ lautet, werden die Schalter eingeschaltet. Mit dem Befehl „Auf 25  %s etzen“ werden alle Schalter ausgeschaltet.

Wenn der Befehl „AUS“ lautet, merkt sich der Adapter den aktuellen Dimmerwert, sofern dieser mindestens 30 % beträgt.
Beim anschließenden Befehl „EIN“ schaltet der Adapter den Dimmer nicht auf 100 %, sondern auf den gespeicherten Wert.

Beispiel:

- Angenommen, der _OFF-Level_ beträgt 30%.
- Das virtuelle Gerät "Light" hat zwei physische Geräte: _switch_ und _dimmer_.
- Befehl: "Stelle das Licht auf 40 %". Der Adapter merkt sich diesen Wert für den Dimmer, stellt ihn für "Dimmer" ein und schaltet den Schalter ein.
- Befehl: "Licht ausschalten". Der Adapter stellt den Dimmer auf 0 % und schaltet den Schalter aus.
- Befehl: "Licht einschalten". _dimmer_ => 40%, _switch_ => EIN.
Befehl: „Licht auf 20  %s tellen“. _dimmer_ => 20 %, _switch_ => AUS. Der Wert für den Dimmer wird nicht gespeichert, da er unterhalb des _AUS-Pegels_ liegt.
- Befehl: "Licht einschalten". _dimmer_ => 40%, _switch_ => EIN.

### Von ON
Sie können das Verhalten des EIN-Befehls für den jeweiligen Zahlenstatus festlegen. Sie können einen bestimmten Wert auswählen oder den letzten von Null verschiedenen Wert verwenden.

### Antwort schreiben an
Für jeden Befehl wird eine Textantwort generiert. Hier können Sie die Objekt-ID definieren, in die dieser Text geschrieben werden soll. Beispiel: _sayit.0.tts.text_.

### Farben
Der Kanal benötigt 3-5 Zustände mit folgenden Rollen:

- `level.color.saturation` - erforderlich zur Erkennung des Kanals,
- `level.color.hue`,
- `level.dimmer`,
- `switch` - optional,
- `level.color.temperature` (optional)

```
Alexa, set the "device name" to "color"
Alexa, turn the light fuchsia
Alexa, set the bedroom light to red
Alexa, change the kitchen to the color chocolate
```

### Sperren
Um die Sperren aktivieren zu können, muss der Status die Rolle `switch.lock` besitzen und `native.LOCK_VALUE` zur Bestimmung des Sperrstatus aufweisen.
Falls Sie einen separaten Wert zur Steuerung der Sperre benötigen, können Sie `native.CONTROL VALUE` verwenden.

```
Alexa, is "lock name" locked/unlocked
Alexa, lock the "lock name"
```

## Wie Gerätenamen generiert werden
Der Adapter erstellt automatisch virtuelle Smart-Home-Geräte, indem er Informationen aus Ihrer ioBroker-Konfiguration kombiniert.

### Aufzählungen verstehen
Aufzählungen sind die in ioBroker integrierte Methode zur Organisation von Geräten:

- **Raumaufzählung**: Enthält die einzelnen Räume (Wohnzimmer, Badezimmer, Schlafzimmer, Küche usw.).
- **Funktionsaufzählung**: Enthält Gerätetypen (Licht, Jalousie, Heizung usw.)

### Anforderungen an die automatische Erkennung
Damit ein Zustand (Gerät) automatisch in die Smart-Home-Steuerung einbezogen wird, muss er folgende Bedingungen erfüllen:

1. **Muss in einer Funktionsaufzählung enthalten sein** (z. B. "Licht", "Heizung", "Jalousien")
2. **Muss die richtige Rolle haben:** `state`, `switch` oder `level.*` (wie `level.dimmer`).
- Wenn der gesamte Kanal in der Funktionsaufzählung enthalten ist, benötigen einzelne Zustände keine spezifischen Rollen.
3. **Muss beschreibbar sein**: `common.write` muss `true` sein.
4. **Besondere Anforderungen:**
- Dimmer müssen den Wert `common.type` als `number` haben.
- Die Heizung muss die Einheit `common.unit` auf `°C`, `°F` oder `°K` und den Typ `common.type` auf `number` gesetzt haben.

### Wie Namen entstehen
Der Adapter kombiniert Raum- und Funktionsinformationen, um aussagekräftige Namen zu generieren:

**Beispiel:**

- Sie haben einen Lichtschalter im Wohnzimmer.
- Der Zustand befindet sich in der Aufzählung "Licht" (Funktion) und "Wohnzimmer" (Raum)
Der generierte Name lautet: **"Wohnzimmerleuchte"**

**Mehrere Geräte desselben Typs:** Alle Lampen im Wohnzimmer sind unter dem virtuellen Gerät „Wohnzimmerbeleuchtung“ zusammengefasst. Wenn Sie sagen „Alexa, schalte die Wohnzimmerbeleuchtung ein“, schalten sich alle Lampen in diesem Raum ein.

**Gerät ohne Raum:** Befindet sich ein Zustand nur in einer Funktionsaufzählung (z. B. "Licht"), aber nicht in einem Raum, wird der ursprüngliche Zustandsname verwendet.

### Benutzerdefinierte Namen mit smartName
Sie können die automatische Namensgebung überschreiben:

- Legen Sie `common.smartName` auf Ihren bevorzugten Namen fest → Das Gerät wird genau diesen Namen verwenden
- Setzen Sie `common.smartName` auf `false` → Das Gerät wird von der Smart-Home-Steuerung ausgeschlossen.

### Manuelle Konfiguration
Im Konfigurationsdialog können Sie manuell anpassen, welche Zustände einbezogen werden und wie sie gruppiert werden: ![Konfiguration](../../../en/adapterref/iobroker.iot/img/configuration.png)

**Umbenennung:**

- **Gruppen mit nur einem Bundesstaat**: Können umbenannt werden (verwendet den SmartName des Bundesstaates)
- **Mehrstufige Gruppen**: Müssen durch Ändern der Aufzählungsnamen umbenannt werden.

### Erstellen benutzerdefinierter Gruppen
So erstellen Sie Ihre eigenen Gerätegruppen:

- Verwenden Sie den "Szenen"-Adapter
- Erstellen Sie ein "Skript" im JavaScript-Adapter

### Ersetzt
Sie können Zeichenfolgen angeben, die in den Gerätenamen automatisch ersetzt werden sollen. Wenn Sie beispielsweise „Ersetzungen“ auf „`.STATE,.LEVEL`“ setzen, werden alle Vorkommen von „`.STATE`“ und „`.LEVEL`“ aus den Namen entfernt. Achten Sie auf Leerzeichen.
Wenn Sie „`.STATE, .LEVEL`“ festlegen, werden „`.STATE`“ und „`.LEVEL`“ ersetzt, nicht aber „`.LEVEL`“.

## Hilfszustände
- `smart.lastObjectID`: Dieser Status wird gesetzt, wenn nur ein Gerät von der Smart-Home-Funktion (Alexa, Google Home) gesteuert wurde.
- `smart.lastFunction`: Funktionsname (falls vorhanden), für den der letzte Befehl ausgeführt wurde.
- `smart.lastRoom`: Name des Raums (falls vorhanden), für den der letzte Befehl ausgeführt wurde.
- `smart.lastCommand`: Zuletzt ausgeführter Befehl. Mögliche Befehle: `true(EIN)`, `false(AUS)`, `number(%)`, `-X(Verringerung bei x)`, `+X(Erhöhung bei X)`
- `smart.lastResponse`: Textuelle Antwort auf einen Befehl. Sie kann an eine `text2speech`-Engine (`sayit`) gesendet werden.

## Umschaltmodus
Alexa v3 unterstützt den Umschaltmodus.
Das bedeutet: Wenn Sie „Alexa, schalte das Licht ein“ sagen und das Licht bereits eingeschaltet ist, wird es ausgeschaltet.

## IFTTT
[Anweisungen](doc/ifttt.md)

## Google Home
Wenn die folgende Fehlermeldung im Protokoll erscheint: `[GHOME] Invalid URL Pro key. Status auto-update is disabled you can set states but receive states only manually`.

Dann müssen Sie den URL-Schlüssel neu generieren:

![URL-Schlüssel](../../../en/adapterref/iobroker.iot/img/url_key.png)

## Dienstleistungen
Es besteht die Möglichkeit, Nachrichten an den Cloud-Adapter zu senden.
Wenn Sie `[POST]https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>` aufrufen und den Wert als Nutzlast verwenden.

`curl --data "myString" https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>`

oder

`[GET]https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>&data=myString`

Wenn Sie in den Einstellungen das Feld "Whitelist für Dienste" auf den Namen `custom_test` setzen und mit "custom_test" als Dienstnamen aufrufen, wird der Status **cloud.0.services.custom_test** auf _myString_ gesetzt.

Sie können "\*" in die Whitelist eintragen, dann sind alle Dienste zugelassen.

Hier finden Sie Anweisungen zur Verwendung mit [Tasker](doc/tasker.md).

Der IFTTT-Dienst ist nur zulässig, wenn ein IFTTT-Schlüssel festgelegt ist.

Die reservierten Namen sind `ifttt`, `text2command`, `simpleApi`, `swagger`. Diese dürfen nicht mit dem Präfix `custom_` verwendet werden.

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
Sie können `text2command` in die Whitelist schreiben, Sie können eine POST-Anfrage an `https://service.iobroker.in/v1/iotService?service=text2command&key=<user-app-key>&user=<USER_EMAIL>` senden, um Daten in die Variable _text2command.X.text_ zu schreiben.

Sie können auch die GET-Methode verwenden `https://service.iobroker.in/v1/iotService?service=text2command&key=<user-app-key>&user=<USER_EMAIL>&data=<MY COMMAND>`

`X` kann in den Einstellungen über die Option "Text2Command-Instanz verwenden" definiert werden.

## Benutzerdefinierte Fertigkeit
Die Antworten für die benutzerdefinierte Fertigkeit können auf zwei Arten verarbeitet werden:

- `text2command`
- `javascript`

### `text2command`
Wenn im Konfigurationsdialog eine Instanz `text2command` definiert ist, wird die Frage an diese Instanz gesendet.

`text2command` muss so konfiguriert sein, dass der erwartete Ausdruck analysiert und die Antwort zurückgegeben wird.

### `Javascript`
Es besteht die Möglichkeit, die Frage direkt mit dem Skript zu bearbeiten. Diese Funktion ist standardmäßig aktiviert, wenn keine `text2command`-Instanz ausgewählt ist.

Wenn eine `text2command`-Instanz definiert ist, muss diese Instanz die Antwort liefern, und die Antwort von _script_ wird ignoriert.

Der Adapter liefert die Details in zwei Zuständen mit unterschiedlichem Detaillierungsgrad.

- `smart.lastCommand` enthält den empfangenen Text einschließlich Informationen über die Art der Anfrage (Intent). Beispiel: `askDevice Status Rasenmäher`
- `smart.lastCommandObj` enthält eine JSON-Zeichenkette, die in ein Objekt mit folgenden Informationen geparst werden kann:
- `words` enthält die empfangenen Wörter in einem Array
- `intent` enthält den Abfragetyp. Aktuell mögliche Werte sind:
- v1 Skill: `askDevice`, `controlDevice`, `actionStart`, `actionEnd`, `askWhen`, `askWhere`, `askWho`
- v2 Skill: `queryIntent`, wenn der vollständige Text erfasst wurde, `controlDevice` als Fallback bei nur teilweisem Text
- `deviceId` enthält eine Geräte-ID, die das Gerät identifiziert, an das die Anfrage gesendet wurde. Sie wird von Amazon bereitgestellt und ist eine leere Zeichenkette, falls sie nicht angegeben wird.
- `deviceRoom` enthält eine zugeordnete Raumkennung, die Sie in der IoT-Admin-Benutzeroberfläche für erfasste Geräte-IDs konfigurieren können.
- `sessionId` enthält die Sitzungs-ID der Skill-Sitzung. Diese sollte bei mehreren gesprochenen Befehlen identisch sein und wird von Amazon bereitgestellt. Falls sie nicht angegeben wird, ist sie eine leere Zeichenkette.
- `userId` enthält eine Benutzer-ID des Gerätebesitzers (oder später des Benutzers, der mit dem Skill interagiert hat), die von Amazon bereitgestellt wird; ist eine leere Zeichenkette, falls sie nicht angegeben wird.
- `userName` enthält einen zugeordneten Benutzernamen, den Sie in der IoT-Admin-UI für gesammelte Benutzer-IDs konfigurieren können.

Weitere Details darüber, wie die Wörter erkannt werden und welche Arten von Anfragen die Alexa Custom Skill unterscheidet, finden Sie unter https://forum.iobroker.net/viewtopic.php?f=37&t=17452 .

**Ergebnis über den smart.lastResponse-Status zurückgeben**

Die Antwort muss innerhalb von 200 ms im Status `smart.lastResponse` gesendet werden und kann eine einfache Textzeichenfolge oder ein JSON-Objekt sein.
Im Falle einer Textzeichenfolge wird diese als Antwort an den Skill gesendet.
Bei einem JSON-Objekt können die folgenden Schlüssel verwendet werden:

- `responseText` muss den Text enthalten, der an Amazon zurückgesendet werden soll.
- `shouldEndSession` ist ein boolescher Wert und steuert, ob die Sitzung nach der gesprochenen Antwort geschlossen wird oder offen bleibt, um weitere Spracheingaben entgegenzunehmen.
Das Feld `sessionId` muss die Session-ID enthalten, für die die Antwort bestimmt ist. Idealerweise sollte diese angegeben werden, um parallele Sitzungen zu ermöglichen. Wird sie nicht angegeben, wird die erste Sitzung verwendet, die eine Antwort erwartet.

**Das Ergebnis wird über eine Nachricht an die IoT-Instanz zurückgegeben.**

Die IoT-Instanz akzeptiert außerdem eine Nachricht mit dem Namen „alexaCustomResponse“, die den Schlüssel „response“ und ein Objekt enthält, das die Schlüssel `responseText`, `shouldEndSession` und `sessionId` enthalten kann (siehe oben).
Die IoT-Instanz wird auf diese Nachricht nicht antworten!

**Beispiel für ein Skript, das Texte verwendet**

```js
// important, that ack=true
on({ id: 'iot.0.smart.lastCommand', ack: true, change: 'any' }, obj => {
    // you have 200ms to prepare the answer and to write it into iot.X.smart.lastResponse
    setState('iot.0.smart.lastResponse', 'Received phrase is: ' + obj.state.val); // important, that ack=false (default)
});
```

**Beispiel für ein Skript, das JSON-Objekte verwendet**

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
Wenn Sie private Skills/Aktionen/навык zur Kommunikation mit `Alexa/Google Home/Алиса` verwenden, haben Sie die Möglichkeit, die IoT-Instanz zur Verarbeitung der Anfragen von ihr zu nutzen.

Z. B. für `yandex alice`:

```js
const OBJECT_FROM_ALISA_SERVICE = {}; // object from alisa service or empty object
OBJECT_FROM_ALISA_SERVICE.alisa = '/path/v1.0/user/devices'; // called URL, 'path' could be any text, but it must be there
sendTo('iot.0', 'private', { type: 'alisa', request: OBJECT_FROM_ALISA_SERVICE }, response => {
    // Send this response back to alisa service
    console.log(JSON.stringify(response));
});
```

Folgende Typen werden unterstützt:

- `alexa` - Interaktion mit Amazon Alexa oder Amazon Custom Skill
- `ghome` - Interaktion mit Google Actions über Google Home
- „alisa“ – Schauspiel mit Yandex Алиса
- `ifttt` - verhält sich wie IFTTT (eigentlich nicht erforderlich, aber zu Testzwecken)

## Yandex Алиса
[Anweisungen](doc/alisa.md)

## Nachrichten an die App senden
Ab Version 1.15.x können Sie Nachrichten an die Anwendung `ioBroker Visu` ([Android](https://play.google.com/store/apps/details?id=com.iobroker.visu) und [iOS](https://apps.apple.com/de/app/iobroker-visu/id1673095774)) senden.

Dazu müssen Sie die folgenden Zustände schreiben:

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

## Todo
- Intelligente Namen müssen als Gruppen eine höhere Priorität haben.
- Geräte sollten nach intelligentem Namen gruppiert werden.

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN BEARBEITUNG** -->

## Changelog
### **WORK IN PROGRESS**
- (@GermanBluefox) Showed last controller ID in `smart.lastObjectID`
- (@GermanBluefox) Showed subscription valid period in `info.validTill` and GUI
- (@Copilot) Implemented increasing reconnect intervall

### 5.0.7 (2025-11-03)
- (@GermanBluefox) Added possibility to group devices by type in GUI
- (@GermanBluefox) Allowed to select any type in Alexe V3
- (@GermanBluefox) Remove disabled states from auto-detection

### 5.0.6 (2025-11-01)
- (@GermanBluefox) Added logs to detect the issues with detection
- (@GermanBluefox) Added possibility to use the 0/1 state as socket
- (@GermanBluefox) Added dialog to bulk manage the smart names of one device

### 5.0.5 (2025-10-31)
- (@GermanBluefox) Changed behavior of HUE lamps

### 5.0.2 (2025-10-30)
- (@GermanBluefox) Added mireds<->kelvin conversion for color temperature
- (@GermanBluefox) It is possible to edit a type
- (@GermanBluefox) Correcting creation of complex groups
- (@GermanBluefox) Same as 4.2.11

### 4.2.9 (2025-10-28)
- (@GermanBluefox) Do not control "white" by RGBW devices
- (@GermanBluefox) Corrected GUI error
- (@GermanBluefox) Avoid double entries in auto-detection

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