---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.iot/README.md
title: ioBroker IoT-Adapter
hash: F92Msc6FfpHuPuDUbKZC8Zcr4aXRGIWCYknHnzguwq0=
---
![Logo](../../../en/adapterref/iobroker.iot/admin/iot.png)

![Anzahl der Installationen](http://iobroker.live/badges/iot-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.iot.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.iot.svg)

# IoBroker IoT-Adapter
![Test und Freigabe](https://github.com/ioBroker/ioBroker.iot/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/iot/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Dieser Adapter dient NUR zur Kommunikation mit Amazon Alexa, Google Home und Nightscout.
Es ist nicht für den Fernzugriff auf Ihre ioBroker-Instanz gedacht. Verwenden Sie dazu den ioBroker.cloud-Adapter.

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Einstellungen
Um den IoT-Adapter nutzen zu können, sollten Sie sich zunächst in der ioBroker-Cloud registrieren [https://iobroker.pro](https://iobroker.pro).

[Verweis auf die Google API-Typeinstellungen](https://developers.google.com/actions/smarthome/guides/)

![Einführung](../../../en/adapterref/iobroker.iot/img/intro.png)

### Sprache
Wenn Sie die Sprache „Standard“ auswählen, werden die Smart-Namen von Geräten und Aufzählungen nicht übersetzt. Wenn eine Sprache angegeben ist, werden alle bekannten Namen in diese Sprache übersetzt.
Dies dient dazu, zu Demonstrationszwecken schnell zwischen vielen Sprachen zu wechseln.

### Platzieren Sie die Funktion zuerst in Namen
Ändern Sie die Reihenfolge von Funktionen und Rollen in selbst generierten Namen:

- wenn falsch: „Raumfunktion“, z.B. „Wohnzimmerdimmer“
- wenn wahr: „Veranstaltungsraum“, z.B. „Wohnzimmer dimmen“

### Wörter verketten mit
Sie können das Wort definieren, das zwischen Funktion und Raum platziert werden soll. Z.B. „in“ und aus „Dimmer Wohnzimmer“ wird „Dimmer im Wohnzimmer“.

Dies wird jedoch nicht empfohlen, da die Erkennungsmaschine ein weiteres Wort analysieren muss, was zu Missverständnissen führen kann.

### OFF-Pegel für Schalter
Einige Gruppen bestehen aus gemischten Geräten: Dimmer und Schalter. Es ist erlaubt, sie mit „EIN“- und „AUS“-Befehlen und mit Prozenten zu steuern.
Wenn der Befehl `Set to 30%` und der `OFF level is 30%` lautet, werden die Schalter eingeschaltet. Mit dem Befehl „Auf 25  %s etzen“ werden alle Schalter ausgeschaltet.

Wenn der Befehl außerdem „AUS“ lautet, merkt sich der Adapter die aktuelle Dimmerstufe, wenn der tatsächliche Wert größer oder gleich „30 %“ ist.
Wenn später der neue „EIN“-Befehl kommt, schaltet der Adapter den Dimmer nicht auf 100 %, sondern auf den im Speicher gespeicherten Wert.

Beispiel:

- Gehen Sie davon aus, dass der *OFF-Pegel* 30 % beträgt.
- Das virtuelle Gerät „Licht“ verfügt über zwei physische Geräte: *Schalter* und *Dimmer*.
- Befehl: „Licht auf 40  %s tellen“. Der Adapter merkt sich diesen Wert für *Dimmer*, stellt ihn auf „Dimmer“ ein und schaltet den *Schalter* ein.
- Befehl: „Licht ausschalten“. Der Adapter stellt den *Dimmer* auf 0 % und schaltet den *Schalter* aus.
- Befehl: „Mach das Licht an“. *Dimmer* => 40 %, *Schalter* => EIN.
- Befehl: „Licht auf 20  %s tellen“. *Dimmer* => 20 %, *Schalter* => AUS. Der Wert für den Dimmer wird nicht gespeichert, da er unter dem *AUS-Pegel* liegt.
- Befehl: „Mach das Licht an“. *Dimmer* => 40 %, *Schalter* => EIN.

### Von ON
Sie können das Verhalten des EIN-Befehls für den Nummernstatus auswählen. Der spezifische Wert kann ausgewählt werden, oder der letzte Wert ungleich Null wird verwendet.

### Antwort schreiben an
Für jeden Befehl wird die Textantwort generiert. Hier können Sie die Objekt-ID definieren, in die dieser Text geschrieben werden soll. Z.B. *sayit.0.tts.text*.

### Farben
Der Kanal benötigt 3-5 Zustände mit den folgenden Rollen:

- `level.color.saturation` – erforderlich für die Erkennung des Kanals,
- `level.color.hue`,
- `level.dimmer`,
- „Schalter“ – optional,
- `level.color.temperature` (optional)

```
Alexa, set the "device name" to "color"
Alexa, turn the light fuchsia
Alexa, set the bedroom light to red
Alexa, change the kitchen to the color chocolate
```

### Sperren
Um die Möglichkeit zu haben, die Sperren zu sperren, muss der Status die Rolle „switch.lock“ haben und über „native.LOCK_VALUE“ verfügen, um den Sperrstatus zu bestimmen.
Wenn Sie einen separaten Wert zur Steuerung der Sperre benötigen, können Sie „native.CONTROL VALUE“ verwenden.

```
Alexa, is "lock name" locked/unlocked
Alexa, lock the "lock name"
```

## Wie Namen generiert werden
Der Adapter versucht, virtuelle Geräte für die Smart-Home-Steuerung zu generieren (z. B. Amazon Alexa oder Google Home).

Dafür gibt es zwei wichtige Aufzählungen: Räume und Funktionen.

Die Zimmer sind wie folgt: Wohnzimmer, Badezimmer, Schlafzimmer.
Funktionen sind wie: Licht, Jalousie, Heizung.

Um den Status in die automatisch generierte Liste zu bekommen, müssen folgende Bedingungen erfüllt sein:

- Der Zustand muss in einer „Funktions“-Aufzählung enthalten sein.
- Der Zustand muss eine Rolle haben („Zustand“, „Schalter“ oder „Stufe.*“, z. B. Stufe.Dimmer), wenn er nicht direkt in „Funktionen“ enthalten ist.

Es kann sein, dass der Kanal in den „Funktionen“ liegt, sich aber nicht angibt.

- Der Zustand muss beschreibbar sein: `common.write` = true
- Der Statusdimmer muss „common.type“ als „Nummer“ haben.
- Die Zustandsheizung muss „common.unit“ als „°C“, „°F“ oder „°K“ und „common.type“ als „number“ haben

Wenn der Zustand nur in „Funktionen“ und nicht in irgendeinem „Raum“ vorkommt, wird der Name des Staates verwendet.

Die Landesnamen werden aus Funktion und Raum generiert. Z.B. Alle *Lichter* im *Wohnzimmer* werden im virtuellen Gerät *Wohnzimmerlicht* gesammelt.
Der Benutzer kann diesen Namen nicht ändern, da er automatisch generiert wird.
Wenn sich jedoch der Aufzählungsname ändert, wird auch dieser Name geändert. (z. B. wurde die Funktion „Licht“ in „Lichter“ geändert, sodass *Wohnzimmerlicht* in *Wohnzimmerlichter* geändert wird)

Alle Regeln werden ignoriert, wenn der Staat common.smartName hat. In diesem Fall wird nur der Smartname verwendet.

Wenn `common.smartName` `false` ist, wird der Status oder die Aufzählung nicht in die Listengenerierung einbezogen.

Der Konfigurationsdialog ermöglicht das komfortable Entfernen und Hinzufügen einzelner Zustände zu virtuellen Gruppen oder als einzelnes Gerät.
![Aufbau](../../../en/adapterref/iobroker.iot/img/configuration.png)

Wenn die Gruppe nur einen Staat hat, kann sie umbenannt werden, da hierfür der smartName des Staates verwendet wird.
Wenn die Gruppe mehr als einen Status hat, muss die Gruppe über die Namen der Aufzählung umbenannt werden.

Um eigene Gruppen zu erstellen, kann der Benutzer den „Szenen“-Adapter installieren oder „Skript“ im Javascript-Adapter erstellen.

### Ersetzt
Sie können Zeichenfolgen angeben, die in den Gerätenamen automatisch ersetzt werden könnten. Wenn Sie beispielsweise Ersetzungen auf `.STATE,.LEVEL` setzen, werden alle `.STATE` und `.LEVEL` aus den Namen gelöscht. Seien Sie vorsichtig mit Leerzeichen.
Wenn Sie `.STATE, .LEVEL` setzen, werden also `.STATE` und `.LEVEL` ersetzt und nicht `.LEVEL`.

## Hilfszustände
- „smart.lastObjectID“: Dieser Status wird gesetzt, wenn nur ein Gerät per Home Skill (Alexa, Google Home) gesteuert wurde.
- „smart.lastFunction“: Funktionsname (falls vorhanden), für den der letzte Befehl ausgeführt wurde.
- „smart.lastRoom“: Raumname (falls vorhanden), für den der letzte Befehl ausgeführt wurde.
- „smart.lastCommand“: Letzter ausgeführter Befehl. Der Befehl kann sein: „true(ON)“, „false(OFF)“, „number(%)“, „-X(senken bei x)“, „+X(ansteigen bei X)“.
- „smart.lastResponse“: Textantwort auf Befehl. Es kann an eine „text2speech“-Engine („sayit“) gesendet werden.

## Modus umschalten
Alexa v3 unterstützt den Umschaltmodus.
Das heißt, wenn Sie „Alexa, schalte das Licht ein“ sagen und das Licht bereits an ist, wird es ausgeschaltet.

## IFTTT
[Anweisungen](doc/ifttt.md)

## Google Home
Wenn im Protokoll die folgende Fehlermeldung angezeigt wird: `[GHOME] Invalid URL Pro key. Status auto-update is disabled you can set states but receive states only manually`.
Sie müssen also den URL-Key neu generieren:

![URL-Schlüssel](../../../en/adapterref/iobroker.iot/img/url_key.png)

## Dienstleistungen
Es besteht die Möglichkeit, Nachrichten an den Cloud-Adapter zu senden.
Wenn Sie `[POST]https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>` und Wert als Payload aufrufen.

`curl --data "myString" https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>`

oder

`[GET]https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>&data=myString`

Wenn Sie in den Einstellungen im Feld „Whitelist für Dienste“ den Namen `custom_test` festlegen und mit „custom_test“ als Dienstnamen aufrufen, wird der Status **cloud.0.services.custom_test** gesetzt zu *myString*.

Sie können „*“ in die Whitelist schreiben und alle Dienste werden zugelassen.

Hier finden Sie eine Anleitung zur Nutzung mit [Tasker](doc/tasker.md).

Der IFTTT-Dienst ist nur zulässig, wenn ein IFTTT-Schlüssel festgelegt ist.

Reservierte Namen sind `ifttt`, `text2command`, `simpleApi`, `swagger`. Diese müssen ohne das Präfix `custom_` verwendet werden.

Sie können auch per Nachricht nach der gültigen URL für den Service fragen:

```
sendTo('iot.0', 'getServiceEndpoint', {serviceName: 'custom_myService'}, result =>
  console.log(JSON.stringify(result)));
  // Output: {"result":
  //  {"url": "https://service.iobroker.in/v1/iotService?key=xxx&user=uuu&service=custom_myService",
  //   "stateID":"iot.0.services.myService",
  //   "warning":"Service name is not in white list"
  //  }}
```

### `text2command`
Sie können `text2command` in die Whitelist schreiben, Sie können eine POST-Anfrage an `https://service.iobroker.in/v1/iotService?service=text2command&key=<user-app-key>&user=<USER_EMAIL>` senden, um Daten in die Variable *text2command.X.text* zu schreiben.

Sie können auch die GET-Methode verwenden `https://service.iobroker.in/v1/iotService?service=text2command&key=<user-app-key>&user=<USER_EMAIL>&data=<MY COMMAND>`

`X` kann in den Einstellungen durch die Option „Text2command-Instanz verwenden“ definiert werden.

## Benutzerdefinierte Fähigkeit
Die Antworten für den benutzerdefinierten Skill können auf zwei Arten verarbeitet werden:

- `text2command`
- „Javascript“.

### `text2command`
Wenn im Konfigurationsdialog eine `text2command`-Instanz definiert ist, wird die Frage an die Instanz gesendet.

`text2command` muss so konfiguriert werden, dass die erwartete Phrase geparst und die Antwort zurückgegeben wird.

### `Javascript`
Es besteht die Möglichkeit, die Frage direkt mit dem Skript zu bearbeiten. Es ist standardmäßig aktiviert, wenn keine `text2command`-Instanz ausgewählt ist.

Wenn eine `text2command`-Instanz definiert ist, muss diese Instanz die Antwort bereitstellen und die Antwort von *script* wird ignoriert.

Der Adapter stellt die Details in zwei Zuständen mit unterschiedlichem Detaillierungsgrad bereit

* „smart.lastCommand“ enthält den empfangenen Text einschließlich Informationen über die Art der Abfrage (Absicht). Beispiel: `askDevice Status Rasenmäher`
* „smart.lastCommandObj“ enthält eine JSON-Zeichenfolge, die in ein Objekt geparst werden kann, das die folgenden Informationen enthält
  * „Wörter“ enthalten die empfangenen Wörter in einem Array
  * „Absicht“ enthält den Typ der Abfrage. Mögliche Werte sind derzeit:
    * v1-Skill: „askDevice“, „controlDevice“, „actionStart“, „actionEnd“, „askWhen“, „askWhere“, „askWho“.
    * v2-Skill: „queryIntent“, wenn der vollständige Text erfasst wurde, „controlDevice“ für den Fallback mit nur Teiltext
  * „deviceId“ enthält eine Geräte-ID, die das Gerät identifiziert, an das die Anfrage gesendet wurde. Wird von Amazon bereitgestellt und ist eine leere Zeichenfolge, wenn sie nicht angegeben wird
  * „deviceRoom“ enthält eine zugeordnete Raumkennung, die Sie in der IoT-Administrator-Benutzeroberfläche für gesammelte Geräte-IDs konfigurieren können
  * „sessionId“ enthält eine Sitzungs-ID der Skill-Sitzung, sollte identisch sein, wenn mehrere Befehle gesprochen wurden, wird von Amazon geliefert und ist eine leere Zeichenfolge, wenn nicht angegeben
  * „userId“ enthält eine Benutzer-ID des Gerätebesitzers (oder möglicherweise später des Benutzers, der mit dem Skill interagiert hat), bereitgestellt von Amazon, ist eine leere Zeichenfolge, wenn sie nicht angegeben wird
  * „userName“ enthält einen zugeordneten Benutzernamen, den Sie in der IoT-Administrator-Benutzeroberfläche für gesammelte Benutzer-IDs konfigurieren können

 Weitere Details dazu, wie die Wörter erkannt werden und welche Art von Abfragen der Alexa Custom Skill unterscheidet, finden Sie unter https://forum.iobroker.net/viewtopic.php?f=37&t=17452.

**Ergebnis über smart.lastResponse-Status zurückgeben**

Die Antwort muss innerhalb von 200 ms im Status `smart.lastResponse` gesendet werden und kann eine einfache Textzeichenfolge oder ein JSON-Objekt sein.
Wenn es sich um eine Textzeichenfolge handelt, wird dieser Text als Antwort an den Skill gesendet.
Wenn der Text ein JSON-Objekt ist, können die folgenden Schlüssel verwendet werden:

* „responseText“ muss den Text enthalten, der an Amazon zurückgegeben werden soll
* „shouldEndSession“ ist ein boolescher Wert und steuert, ob die Sitzung geschlossen wird, nachdem die Antwort gesprochen wurde, oder offen bleibt, um eine weitere Spracheingabe zu akzeptieren.
* „sessionId“ muss die Sitzungs-ID enthalten, für die die Antwort bestimmt ist. Stellen Sie es idealerweise bereit, um gleichzeitige Sitzungen zu ermöglichen. Wenn nicht angegeben, wird die erste Sitzung angenommen, die eine Antwort erwartet.

**Ergebnis über die Nachricht an die IoT-Instanz zurücksenden**

Die iot-Instanz akzeptiert auch eine Nachricht mit dem Namen „alexaCustomResponse“, die den Schlüssel „response“ enthält, mit einem Objekt, das wie oben beschrieben die Schlüssel `responseText` und `shouldEndSession` und `sessionId` enthalten kann.
Es erfolgt keine Antwort der iot-Instanz auf die Nachricht!

**Beispiel für ein Skript, das Texte verwendet**

```
// important, that ack=true
on({id: 'iot.0.smart.lastCommand', ack: true, change: 'any'}, obj => {
    // you have 200ms to prepare the answer and to write it into iot.X.smart.lastResponse
    setState('iot.0.smart.lastResponse', 'Received phrase is: ' + obj.state.val); // important, that ack=false (default)
});
```

**Beispiel für ein Skript, das JSON-Objekte verwendet**

```
// important, that ack=true
on({id: 'iot.0.smart.lastCommandObj', ack: true, change: 'any'}, obj => {
    // you have 200ms to prepare the answer and to write it into iot.X.smart.lastResponse
    const request = JSON.parse(obj.state.val);
    const response = {
        'responseText': 'Received phrase is: ' + request.words.join(' ') + '. Bye',
        'shouldEndSession': true,
        'sessionId': request.sessionId
    };

    // Return response via state
    setState('iot.0.smart.lastResponse', JSON.stringify(response)); // important, that ack=false (default)

    // or alternatively return as message
    sendTo('iot.0', 'alexaCustomResponse', response);
});
```

### Private Wolke
Wenn Sie für die Kommunikation mit `Alexa/Google Home/Алиса` private Skills/Aktionen/Nachrichten verwenden, haben Sie die Möglichkeit, die IoT-Instanz zu verwenden, um die Anfragen von ihr zu verarbeiten.

Z.B. für `yandex alice`:

```
const OBJECT_FROM_ALISA_SERVICE = {}; // object from alisa service or empty object
OBJECT_FROM_ALISA_SERVICE.alisa = '/path/v1.0/user/devices'; // called URL, 'path' could be any text, but it must be there
sendTo('iot.0', 'private', {type: 'alisa', request: OBJECT_FROM_ALISA_SERVICE}, response => {
    // Send this response back to alisa service
    console.log(JSON.stringify(response));
});
```

Folgende Typen werden unterstützt:

- „Alexa“ – Handeln mit Amazon Alexa oder Amazon Custom Skill
- „ghome“ – Handeln mit Google Actions über Google Home
- „alisa“ – Schauspiel mit Yandex Алиса
- „ifttt“ – verhält sich wie IFTTT (eigentlich nicht erforderlich, aber zu Testzwecken)

## Yandex Alisa
[Anweisungen](doc/alisa.md)

## Nachrichten an App senden
Ab Version 1.15.x können Sie Nachrichten an die `ioBroker.visu`-Anwendung (Android und iOS) senden.
Dazu müssen Sie die folgenden Zustände schreiben:

```
setState('iot.0.app.expire', 60); // optional. Time in seconds
setState('iot.0.app.priority', 'normal'); // optional. Priority: 'high' or 'normal'
setState('iot.0.app.title', 'ioBroker'); // optional. Default "ioBroker"
setState('iot.0.app.message', 'Message text'); // important, that ack=false (default)

// or just one state
// only is message is mandatory. All other are optional
setState('iot.0.app.message', JSON.stringify({
  message: 'Message text',
  title: 'ioBroker',
  expire: 60,
  priority: 'normal'
})); // important, that ack=false (default)
```

## Machen
- Intelligente Namen müssen als Gruppen eine höhere Priorität haben
- Geräte sollten nach intelligentem Namen gruppiert werden

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **ARBEIT IN ARBEIT** -->

## Changelog
### 3.1.0 (2024-02-05)
* (bluefox) Updated packages
* (bluefox) Disabled the state change report for alexa v3

### 3.0.0 (2023-10-24)
* (bluefox) Updated packages
* (bluefox) The minimal supported node.js version is 16

### 2.0.11 (2023-06-20)
* (bluefox) Added support for the state toggling (alexa 3)
* (bluefox) Done small improvements for alexa 3

### 2.0.9 (2023-06-15)
* (bluefox) Working on support for amazon alexa v3

### 2.0.2 (2023-06-05)
* (bluefox) Added support for amazon alexa v3
* (bluefox) Removed support for sugar blood indication

### 1.14.6 (2023-05-12)
* (bluefox) Corrected translations

### 1.14.5 (2023-03-01)
* (bluefox) Corrected names of enums in GUI

### 1.14.3 (2023-01-10)
* (kirovilya) Fixed processing for lights with CT and RGB in Alisa

### 1.14.2 (2022-12-23)
* (bluefox) Updated GUI packages

### 1.14.1 (2022-12-22)
* (bluefox) Downgraded the axios version to 0.27.2

### 1.14.0 (2022-12-13)
* (bluefox) Added netatmo support

### 1.13.0 (2022-12-08)
* (Apollon77) Added support vor Custom Skill v2

### 1.12.5 (2022-11-09)
* (bluefox) Small changes on configuration GUI

### 1.12.4 (2022-11-03)
* (bluefox) Added ukrainian language
* (bluefox) Corrected blockly for unknown languages

### 1.12.2 (2022-10-01)
* (Apollon77) Fixed crash case

### 1.12.1 (2022-09-27)
* (bluefox) Corrected error in GUI with empty password

### 1.12.0 (2022-09-27)
* (Apollon77) Do not control saturation with a percentage request via alexa
* (bluefox) Migrated GUI to v5

### 1.11.9 (2022-07-22)
* (Apollon77) Fix temperature controlling for thermostats via alexa

### 1.11.8 (2022-06-24)
* (Apollon77) Update dependencies to allow better automatic rebuild

### 1.11.7 (2022-06-13)
* (bluefox) Tried to correct URL key creation for Google home

### 1.11.5 (2022-06-03)
* (kirovilya) Alisa: update for binary-sensor "motion" and "contact"

### 1.11.4 (2022-03-29)
* (Apollon77) Fix crash cases reported by Sentry

### 1.11.3 (2022-03-23)
* (bluefox) Added the generation of URL key for services

### 1.11.2 (2022-03-20)
* (Apollon77) Fix crash case reported by Sentry (IOBROKER-IOT-3P)

### 1.11.1 (2022-03-18)
* (Apollon77) Optimize logging when many devices are used

### 1.11.0 (2022-03-17)
* (Apollon77) Also support "stored" when a rgb state is turned on/off
* (Apollon77) Fixed control percent value to respect min/max correctly
* (bluefox) Support for response messages longer than 128k (zip)

### 1.10.0 (2022-03-09)
* (Apollon77) Respect min/max when calculating the value for byOn with % values

### 1.9.7 (2022-02-20)
* (Apollon77) Fix crash case reported by Sentry (IOBROKER-IOT-3C)

### 1.9.6 (2022-02-19)
* (Apollon77) Make sure to not remember the off value when using stored values for on
* (Apollon77) Fix crash case reported by Sentry (IOBROKER-IOT-3A)

### 1.9.5 (2022-02-08)
* (bluefox) Fixed Google home error with color control

### 1.9.4 (2022-02-08)
* (bluefox) Fixed error with the certificates fetching

### 1.9.3 (2022-02-03)
* (bluefox) Removed deprecated package `request`
* (bluefox) Refactoring and better error handling

### 1.9.2 (2022-01-26)
* (bluefox) Added experimental support for remote access

### 1.8.25 (2021-11-18)
* (bluefox) Corrected the enabling of the category

### 1.8.24 (2021-09-19)
* (bluefox) Respect the min/max limits by controlling

### 1.8.23 (2021-09-18)
* (bluefox) Fixed the response for the heating control

### 1.8.22 (2021-05-16)
* (bluefox) Make it admin4 compatible

### 1.8.21 (2021-05-16)
* (bluefox) Fixed the encryption of the password. Warning: if you see the message in the log, that password is invalid, please enter the password in configuration dialog one more time and save.

### 1.8.20 (2021-05-16)
* (foxriver76) we now write data received from custom services with the acknowledge flag

### 1.8.19 (2021-05-14)
* (bluefox) Only added one debug output

### 1.8.16 (2021-03-13)
* (bluefox) fixed the blind functionality in alisa

### 1.8.15 (2021-03-12)
* (bluefox) implemented the sensor functionality in alisa

### 1.8.14 (2021-03-12)
* (bluefox) allowed the control of the blinds in alisa

### 1.8.13 (2021-02-04)
* (Apollon77) add missing object smart.lastObjectID

### 1.8.12 (2021-02-02)
* (bluefox) Fixed the dimmer issue with alisa.

### 1.8.11 (2021-01-20)
* (Morluktom) Alexa - Corrected the request for percentage values

### 1.8.10 (2021-01-20)
* (bluefox) Added the reconnection strategy if DNS address cannot be resolved

### 1.8.9 (2020-12-27)
* (bluefox) Updated configuration GUI to the latest state

### 1.8.8 (2020-12-14)
* (bluefox) Corrected the "Google home" error

### 1.8.6 (2020-12-13)
* (bluefox) Try to fix google home error

### 1.8.5 (2020-11-23)
* (bluefox) Corrected the configuration table for Google home

### 1.8.4 (2020-11-18)
* (bluefox) Corrected the configuration table for Google home

### 1.8.3 (2020-11-16)
* (bluefox) Trying to fix the set to false at start for Google home

### 1.8.2 (2020-11-15)
* (bluefox) Added the debug outputs for Google home

### 1.8.1 (2020-11-13)
* (bluefox) The deletion of google home devices was corrected

### 1.8.0 (2020-11-12)
* (bluefox) The Google home table was rewritten

### 1.7.15 (2020-11-05)
* (Morluktom) Corrected the request for temperature

### 1.7.14 (2020-11-05)
* (bluefox) Updated the select ID dialog.

### 1.7.12 (2020-09-25)
* (bluefox) Updated the select ID dialog.

### 1.7.9 (2020-09-17)
* (bluefox) Updated GUI for config.

### 1.7.7 (2020-09-02)
* (bluefox) Added information about changed linking process.

### 1.7.6 (2020-08-25)
* (bluefox) Some colors were changed in the dark mode.

### 1.7.5 (2020-08-21)
* (Apollon77) Crash prevented (Sentry IOBROKER-IOT-W)
* (bluefox) Values for modes will be converted to number in Alisa

### 1.7.3 (2020-08-16)
* (bluefox) Added vacuum cleaner to Alisa

### 1.7.1 (2020-08-16)
* (bluefox) Added blinds, lock and thermostat to Alisa

### 1.6.4 (2020-08-06)
* (Apollon77) crash prevented (Sentry IOBROKER-IOT-V)

### 1.6.3 (2020-08-04)
* (bluefox) Added french letters to allowed symbols

### 1.6.1 (2020-07-10)
* (bluefox) Used new SelectID Dialog in GUI

### 1.5.3 (2020-05-28)
* (bluefox) Small change for nightscout

### 1.5.2 (2020-05-21)
* (bluefox) Changed requirements for password
* (bluefox) Do not try to load the "sharp" if the blood sugar not enabled

### 1.4.18 (2020-05-11)
* (Apollon77) Make sure that invalid configured states or values without a timestamp do not crash adapter (Sentry IOBROKER-IOT-8)
* (Apollon77) Make sure publishes after the disconnect to not break adapter (Sentry IOBROKER-IOT-A)

### 1.4.17 (2020-05-11)
* (bluefox) Better error output is implemented

### 1.4.14 (2020-05-01)
* (bluefox) Fixed the problem if admin is not on 8081 port

### 1.4.12 (2020-04-30)
* (Apollon77) error case handled where system.config objects does not exist (Sentry IOBROKER-IOT-5)

### 1.4.11 (2020-04-26)
* (bluefox) fixed IOBROKER-IOT-REACT-F

### 1.4.10 (2020-04-24)
* (bluefox) Fixed crashes reported by sentry

### 1.4.7 (2020-04-23)
* fixed iot crash when timeouts in communications to Google happens (Sentry IOBROKER-IOT-2)
* fixed iot crash when google answers without customData (Sentry IOBROKER-IOT-1)

### 1.4.6 (2020-04-18)
* (Apollon77) Add the Sentry error reporting to `React Frontend`

### 1.4.4 (2020-04-14)
* (Apollon77) remove js-controller 3.0 warnings and replace `adapter.objects` access
* (Apollon77) add linux dependencies for canvas library
* (Apollon77) add sentry configuration

### 1.4.2 (2020-04-08)
* (TA2k) Fix updateState for Google Home

### 1.4.1 (2020-04-04)
* (bluefox) The blood glucose request supported now

### 1.3.4 (2020-02-26)
* (TA2k) Fixed deconz issues in Google Home

### 1.3.3 (2020-02-12)
* (Apollon77) fix alisa error with invalid smartName attributes

### 1.3.2 (2020-02-10)
* (Apollon77) usage with all kinds of admin ports and reverse proxies optimized

### 1.3.1 (2020-02-09)
* (Apollon77) Dependency updates
* (Apollon77) Make compatible with Admin > 4.0 because of updated socket.io

### 1.2.1 (2020-01-18)
* (bluefox) Fixed problem if the port of admin is not 8081

### 1.2.0 (2020-01-04)
* (TA2k) Google Home handling and visualization improved.

### 1.1.10 (2020-01-03)
* (bluefox) Now is allowed to select the temperature values as alexa states
* (bluefox) Allowed the setting type immediately after insertion of new state

### 1.1.9 (2019-11-27)
* (bluefox) Fixed: sometimes the configuration could not be loaded

### 1.1.8 (2019-09-12)
* (bluefox) Optimization of google home communication was done

### 1.1.7 (2019-09-11)
* (bluefox) The sending rate to google home is limited now

### 1.1.6 (2019-09-11)
* (TA2k) Room fix for Google Home and LinkedDevices

### 1.1.4 (2019-09-10)
* (bluefox) decreased keepalive value to fix issue with disconnect

### 1.1.3 (2019-09-09)
* (TA2k) Google Home problem fixed with LinkedDevices

### 1.1.0 (2019-09-06)
* (bluefox) Added support of aliases

### 1.0.8 (2019-09-03)
* (TA2k) Improved support for Google Home
* (TA2k) Added auto detection for RGB, RGBSingle, Hue, CT, MediaDevice, Switch, Info, Socket, Light, Dimmer, Thermostat, WindowTilt, Blinds, Slider
* (TA2k) Added support for manually adding states as devices
* (TA2k) Fix update state after Sync
* (TA2k) Added typical Google Home devices and traits/actions
* (TA2k) Fix only process update message when Alexa is checked in the options

### 1.0.4 (2019-08-01)
* (bluefox) Fixed password encoding. Please enter password anew!

### 1.0.3 (2019-07-30)
* (bluefox) Fixed language issues for google home and yandex alice

### 1.0.1 (2019-07-26)
* (bluefox) Support of private skills/actions was added.

### 1.0.0 (2019-07-14)
* (TA2k) Google Home list was added

### 0.5.0 (2019-06-29)
* (bluefox) tried to add yandex Alisa

### 0.4.3 (2019-04-14)
* (Apollon77) Change enable/disable of Amazon Alexa and of Google Home from configuration to be really "active if selected".

### 0.4.2 (2019-03-10)
* (bluefox) Allowed the enablement and disable of Amazon Alexa and of Google Home from configuration.

### 0.4.1 (2019-02-19)
* (bluefox) Add version check to google home

### 0.3.1 (2019-01-13)
* (bluefox) Blockly was fixed

### 0.3.0 (2018-12-30)
* (bluefox) Detection of google devices was fixed

### 0.2.2 (2018-12-21)
* (bluefox) Generation of new URL key was added

### 0.2.0 (2018-12-18)
* (bluefox) Change the name of adapter

### 0.1.8 (2018-10-21)
* (bluefox) Added extended diagnostics

### 0.1.7 (2018-10-14)
* (bluefox) The configuration dialog was corrected
* (bluefox) The possibility to create the answer with script for the custom skill was implemented.

### 0.1.4 (2018-09-26)
* (bluefox) Initial commit

## License
The MIT License (MIT)

Copyright (c) 2018-2024 bluefox <dogafox@gmail.com>

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