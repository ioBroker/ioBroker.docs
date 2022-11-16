---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.iot/README.md
title: ioBroker IoT-Adapter
hash: ndUzsWUt52XKWs88JISRea2rEUe2nxFbF6PMyRPcMVE=
---
![Logo](../../../en/adapterref/iobroker.iot/admin/iot.png)

![Anzahl der Installationen](http://iobroker.live/badges/iot-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.iot.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.iot.svg)

# IoBroker IoT-Adapter
![Testen und freigeben](https://github.com/ioBroker/ioBroker.iot/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/iot/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Dieser Adapter dient NUR zur Kommunikation mit Amazon Alexa, Google Home und Nightscout.
Es dient nicht dem Fernzugriff auf Ihre ioBroker-Instanz. Verwenden Sie dafür den ioBroker.cloud-Adapter.

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry-Berichte werden ab js-controller 3.0 verwendet.

## Einstellungen
Um den Cloud-Adapter zu verwenden, sollten Sie sich zuerst in der ioBroker-Cloud [https://iobroker.pro](https://iobroker.pro) registrieren.

[Verweis auf Google API-Typeinstellungen](https://developers.google.com/actions/smarthome/guides/)

![Einleitung](../../../en/adapterref/iobroker.iot/img/intro.png)

### Sprache
Wenn Sie die Sprache „Standard“ auswählen, werden die intelligenten Namen von Geräten und Aufzählungen nicht übersetzt. Wenn eine Sprache angegeben ist, werden alle bekannten Namen in diese Sprache übersetzt.
Es dient dazu, zu Demonstrationszwecken schnell zwischen vielen Sprachen umzuschalten.

### Platzieren Sie die Funktion zuerst in den Namen
Ändern Sie die Reihenfolge von Funktionen und Rollen in selbst generierten Namen:

- falls falsch: „Raumfunktion“, z.B. "Wohnzimmer Dimmer"
- wenn wahr: "Funktionsraum", z.B. "Dimmer Wohnzimmer"

### Wörter mit verketten
Sie können das Wort definieren, das zwischen Funktion und Raum platziert wird. Z.B. "in" und aus "Dimmer Wohnzimmer" wird "Dimmer im Wohnzimmer".

Dies wird jedoch nicht empfohlen, da die Erkennungsmaschine ein weiteres Wort analysieren muss und dies zu Missverständnissen führen kann.

### AUS-Pegel für Schalter
Einige Gruppen bestehen aus gemischten Geräten: Dimmer und Schalter. Es ist erlaubt, sie mit "ON"- und "OFF"-Befehlen und mit Prozenten zu steuern.
Wenn der Befehl `Set to 30%` und `OFF level is 30%` ist, werden die Schalter eingeschaltet. Mit dem Befehl „Set to 25%“ werden alle Schalter ausgeschaltet.

Wenn der Befehl „OFF“ ist, erinnert sich der Adapter außerdem an die aktuelle Dimmerstufe, wenn der tatsächliche Wert über oder gleich „30 %“ ist.
Später, wenn der neue "ON"-Befehl kommt, schaltet der Adapter den Dimmer nicht auf 100%, sondern auf das Niveau im Speicher.

Beispiel:

- Angenommen, dass *OFF level* 30% beträgt.
- Virtuelles Gerät „Licht“ hat zwei physische Geräte: *Schalter* und *Dimmer*.
- Befehl: „Setze das Licht auf 40 %“. Der Adapter merkt sich diesen Wert für *dimmer*, stellt ihn auf "dimmer" ein und schaltet den *Schalter* EIN.
- Befehl: „Licht ausschalten“. Der Adapter stellt den *Dimmer* auf 0% und schaltet den *Schalter* aus.
- Befehl: "Licht anmachen". *dimmer* => 40%, *schalter* => EIN.
- Befehl: „Setze das Licht auf 20 %“. *dimmer* => 20%, *schalter* => AUS. Der Wert für Dimmer wird nicht gespeichert, da er unterhalb von *OFF level* liegt.
- Befehl: "Licht anmachen". *dimmer* => 40%, *schalter* => EIN.

### Von EIN
Sie können das Verhalten des EIN-Befehls auswählen, der für den Nummernstatus kommt. Der spezifische Wert kann ausgewählt werden oder es wird der letzte Nicht-Null-Wert verwendet.

### Antwort schreiben an
Für jeden Befehl wird die Textantwort generiert. Hier können Sie die Objekt-ID definieren, wohin dieser Text geschrieben werden soll. Z.B. *sayit.0.tts.text*.

### Farben
Derzeit unterstützt nur die englische Alexa die Farbsteuerung.
Der Kanal muss 4 Zustände mit folgenden Rollen haben:

- level.color.saturation (erforderlich für die Erkennung des Kanals),
- level.color.hue,
- level.dimmer,
- Schalter (optional)

```
Alexa, set the "device name" to "color"
Alexa, turn the light fuchsia
Alexa, set the bedroom light to red
Alexa, change the kitchen to the color chocolate
```

### Sperren
Um die Möglichkeit zu haben, die Sperren zu sperren, muss der Zustand die Rolle „switch.lock“ haben und „native.LOCK_VALUE“ haben, um den Sperrzustand zu bestimmen. Wenn Sie einen separaten Wert benötigen, um die Sperre zu steuern, können Sie "native.CONTROL VALUE" verwenden.

```
Alexa, is "lock name" locked/unlocked
Alexa, lock the "lock name"
```

## Wie Namen generiert werden
Der Adapter versucht, virtuelle Geräte für die Smart-Home-Steuerung zu generieren (z. B. Amazon Alexa oder Google Home).

Dafür gibt es zwei wichtige Aufzählungen: Räume und Funktionen.

Zimmer sind wie: Wohnzimmer, Badezimmer, Schlafzimmer.
Funktionen sind wie: Licht, Jalousie, Heizung.

Folgende Bedingungen müssen erfüllt sein, um den Status in die automatisch generierte Liste zu bekommen:

- Der Zustand muss sich in einer "Funktions"-Aufzählung befinden.
- Der Zustand muss eine Rolle haben ("state", "switch" oder "level.*", z. B. level.dimmer), wenn er nicht direkt in "functions" enthalten ist.

Es kann sein, dass der Kanal in den "Funktionen" steht, sich aber nicht ausgibt.

- der Zustand muss beschreibbar sein: `common.write` = true
- der Zustandsdimmer muss `common.type` als 'number' haben
- Die Zustandsheizung muss `common.unit` als `°C`, `°F` oder `°K` und `common.type` als `number` haben

Befindet sich der Staat nur in "Funktionen" und in keinem "Raum", wird der Name des Staates verwendet.

Die Zustandsnamen werden aus Funktion und Raum generiert. Z.B. Alle *Leuchten* im *Wohnzimmer* werden im virtuellen Gerät *Wohnzimmerlicht* gesammelt.
Der Benutzer kann diesen Namen nicht ändern, da er automatisch generiert wird.
Aber wenn sich der Aufzählungsname ändert, wird dieser Name auch geändert. (z.B. Funktion "Licht" geändert in "Lichter", also *Wohnzimmerlicht* wird geändert in *Wohnzimmerlicht*)

Alle Regeln werden ignoriert, wenn der Zustand common.smartName hat. In diesem Fall wird nur der Smart-Name verwendet.

wenn *common.smartName* **false** ist, wird der Status oder die Enumeration nicht in die Listengenerierung eingeschlossen.

Der Konfigurationsdialog ermöglicht das bequeme Entfernen und Hinzufügen der einzelnen Zustände zu virtuellen Gruppen oder als Einzelgerät.
![Aufbau](../../../en/adapterref/iobroker.iot/img/configuration.png)

Wenn die Gruppe nur einen Zustand hat, kann sie umbenannt werden, da hierfür der smartName des Zustands verwendet wird.
Wenn die Gruppe mehr als einen Zustand hat, muss die Gruppe über die Namen der Aufzählung umbenannt werden.

Um eigene Gruppen zu erstellen, kann der Benutzer den "Scenes"-Adapter installieren oder "Script" im Javascript-Adapter erstellen.

### Ersetzt
Sie können Zeichenfolgen angeben, die automatisch in den Gerätenamen ersetzt werden können. Z.B. Wenn Sie Ersetzen auf: `.STATE,.LEVEL` setzen, werden alle ".STATE" und ".LEVEL" aus den Namen gelöscht. Vorsicht mit Leerzeichen.
Setzt man `.STATE, .LEVEL`, so werden ".STATE" und ".LEVEL" ersetzt und nicht ".LEVEL".

## Helferzustände
- **smart.lastObjectID**: Dieser Status wird gesetzt, wenn nur ein Gerät per Home-Skill (Alexa, Google Home) gesteuert wurde.
- **smart.lastFunction**: Funktionsname (falls vorhanden), für den der letzte Befehl ausgeführt wurde.
- **smart.lastRoom**: Raumname (falls vorhanden), für den der letzte Befehl ausgeführt wurde.
- **smart.lastCommand**: Zuletzt ausgeführter Befehl. Befehl kann sein: true(ON), false(OFF), number(%), -X(verringern bei x), +X(erhöhen bei X)
- **smart.lastResponse**: Textantwort auf Befehl. Es kann an eine Text2Speech-Engine (Sayit) gesendet werden.

## IFTTT
[Anweisungen](doc/ifttt.md)

## Google Home
Wenn Sie im Protokoll folgende Fehlermeldung sehen: `[GHOME] Invalid URL Pro key. Status auto-update is disabled you can set states but receive states only manually`.
Sie müssen also den URL-Key neu generieren:

![URL-Schlüssel](../../../en/adapterref/iobroker.iot/img/url_key.png)

## Dienstleistungen
Es besteht die Möglichkeit, Nachrichten an den Cloud-Adapter zu senden.
Wenn Sie `[POST]https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>` aufrufen und Wert als Nutzlast.

`curl --data "myString" https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>`

oder

`[GET]https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>&data=myString`

Wenn Sie in den Einstellungen im Feld "Whitelist für Dienste" den Namen *custom_test* setzen und mit "custom_test" als Dienstnamen aufrufen, wird der Status **cloud.0.services.custom_test** auf *myString gesetzt *.

Sie können "*" in die Whitelist schreiben und alle Dienste werden zugelassen.

Hier finden Sie eine Anleitung zur Verwendung mit [Tasker](doc/tasker.md).

Der IFTTT-Dienst ist nur erlaubt, wenn der IFTTT-Schlüssel gesetzt ist.

Reservierte Namen sind `ifttt`, `text2command`, `simpleApi`, `swagger`. Diese müssen ohne das Präfix `custom_` verwendet werden.

### `text2command`
Sie können "text2command" in die weiße Liste schreiben, Sie können eine POST-Anforderung an `https://service.iobroker.in/v1/iotService?service=text2command&key=<user-app-key>&user=<USER_EMAIL>` senden, um Daten in die Variable *text2command.X.text* zu schreiben.

Sie können auch die GET-Methode verwenden `https://service.iobroker.in/v1/iotService?service=text2command&key=<user-app-key>&user=<USER_EMAIL>&data=<MY COMMAND>`

`X` kann in den Einstellungen durch die Option "Text2Befehlsinstanz verwenden" definiert werden.

## Benutzerdefinierte Fähigkeit
Die Antworten für benutzerdefinierte Skills können auf zwei Arten verarbeitet werden:

- "Text2Befehl".
- "Javascript".

### `text2command`
wenn im Konfigurationsdialog die Instanz `text2command` definiert ist, so wird die Frage an die Instanz gesendet.

`text2command` muss konfiguriert werden, dass die erwartete Phrase geparst und die Antwort zurückgegeben wird.

### `Javascript`
Es besteht die Möglichkeit, die Frage direkt per Skript zu bearbeiten. Es ist standardmäßig aktiviert, wenn keine *text2command*-Instanz ausgewählt ist.

Wenn eine `text2command`-Instanz definiert ist, muss diese Instanz die Antwort liefern und die Antwort von *script* wird ignoriert.

Der Adapter stellt die Details in zwei Zuständen mit unterschiedlicher Detailstufe bereit

* **smart.lastCommand** enthält den empfangenen Text inklusive einer Info zur Art der Abfrage (Intent). Beispiel: „askDevice Status Rasenmäher“
* **smart.lastCommandObj*** enthält eine JSON-Zeichenfolge, die in ein Objekt geparst werden kann, das die folgenden Informationen enthält
  * **words** enthält die empfangenen Wörter in einem Array
  * **Absicht** enthält die Art der Abfrage. Mögliche Werte sind derzeit:
    * v1 Skill: „askDevice“, „controlDevice“, „actionStart“, „actionEnd“, „askWhen“, „askWhere“, „askWho“
    * v2 Skill: "queryIntent", wenn der gesamte Text erfasst wurde, "controlDevice" für Fallback mit nur teilweisem Text
  * **deviceId** enthält eine DeviceId, die das Gerät identifiziert, an das die Anfrage gesendet wurde, geliefert von Amazon, ist eine leere Zeichenfolge, wenn sie nicht angegeben wird
  * **deviceRoom** enthält eine zugeordnete Raumkennung, die Sie in der iot-Admin-Benutzeroberfläche für gesammelte Geräte-IDs konfigurieren können
  * **sessionId** enthält eine sessionId der Skill-Session, sollte gleich sein, wenn mehrere Befehle gesprochen wurden, geliefert von Amazon, ist ein leerer String, wenn nicht angegeben
  * **userId** enthält eine Benutzer-ID des Gerätebesitzers (oder später des Benutzers, der mit dem Skill interagiert hat), die von Amazon geliefert wird, ist eine leere Zeichenfolge, wenn sie nicht angegeben wird
  * **userName** enthält einen zugeordneten Benutzernamen, den Sie in der iot-Admin-Benutzeroberfläche für gesammelte Benutzer-IDs konfigurieren können

 Weitere Einzelheiten darüber, wie die Wörter erkannt werden und welche Art von Abfragen der Alexa Custom Skill unterscheidet, finden Sie unter https://forum.iobroker.net/viewtopic.php?f=37&t=17452 .

**Ergebnis über smart.lastResponse-Status zurückgeben**

Die Antwort muss innerhalb von 200 ms im Zustand „smart.lastResponse“ gesendet werden und kann eine einfache Textzeichenfolge oder ein JSON-Objekt sein.
Wenn es sich um eine Textzeichenfolge handelt, wird dieser Text als Antwort an den Skill gesendet.
Wenn der Text ein JSON-Objekt ist, können die folgenden Schlüssel verwendet werden:

* **responseText** muss den Text enthalten, um an Amazon zurückzusenden
* **shouldEndSession** ist ein boolescher Wert und steuert, ob die Sitzung geschlossen wird, nachdem die Antwort gesprochen wurde, oder offen bleibt, um eine weitere Spracheingabe zu akzeptieren.
* **sessionId** muss die sessionId enthalten, für die die Antwort bestimmt ist. Stellen Sie es idealerweise bereit, um gleichzeitige Sitzungen zu ermöglichen. Wenn nicht angegeben, wird die erste Sitzung angenommen, die eine Antwort erwartet.

**Ergebnis über die Nachricht an die iot-Instanz zurücksenden**

Die iot-Instanz akzeptiert auch eine Nachricht mit dem Namen „alexaCustomResponse“, die den Schlüssel „response“ enthält, mit einem Objekt, das die Schlüssel **responseText** und **shouldEndSession** und **sessionId** wie oben beschrieben enthalten kann.
Es erfolgt keine Antwort von der iot-Instanz auf die Nachricht!

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
Wenn Sie private Skills/Aktionen/навык für die Kommunikation mit `Alexa/Google Home/Алиса` verwenden, haben Sie die Möglichkeit, die IoT-Instanz zu verwenden, um die Anfragen von ihr zu verarbeiten.

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

- „alexa“ – Handeln mit Amazon Alexa oder Amazon Custom Skill
- "ghome" - Handeln mit Google Actions über Google Home
- `alisa` - handelt mit Yandex Алиса
- `ifttt` - verhält sich wie IFTTT (eigentlich nicht erforderlich, aber zu Testzwecken)

## Yandex Alisa
[Anweisungen](doc/alisa.md)

<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### **IN ARBEIT** -->

## Changelog
### 1.12.2 (2022-10-01)
* (Apollon77) Fix crash case

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
* (Apollon77) Fix control percent value to respect min/max correctly
* (bluefox) Support of response messages longer than 128k (zip)

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
* (foxriver76) we now write data received from custom services with acknowledge flag

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
* (bluefox) Corrected the "google home" error

### 1.8.6 (2020-12-13)
* (bluefox) Try to fix google home error

### 1.8.5 (2020-11-23)
* (bluefox) Corrected the configuration table for google home

### 1.8.4 (2020-11-18)
* (bluefox) Corrected the configuration table for google home

### 1.8.3 (2020-11-16)
* (bluefox) Trying to fix the set to false at start for google home

### 1.8.2 (2020-11-15)
* (bluefox) Added the debug outputs for google home

### 1.8.1 (2020-11-13)
* (bluefox) The deletion of google home devices was corrected

### 1.8.0 (2020-11-12)
* (bluefox) The google home table was rewritten

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
* (bluefox) Do not try load the "sharp" if blood sugar not enabled

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
* fix iot crash when timeouts in communications to Google happens (Sentry IOBROKER-IOT-2)
* fix iot crash when google answers without customData (Sentry IOBROKER-IOT-1)

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

Copyright (c) 2018-2022 bluefox <dogafox@gmail.com>

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