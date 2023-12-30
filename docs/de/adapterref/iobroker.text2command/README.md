---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.text2command/README.md
title: ioBroker.text2command
hash: KdgJJMB/L5sM7ERy03ey1OqgDxxzrtCv7SeZqoEp3eI=
---
![Logo](../../../en/adapterref/iobroker.text2command/admin/text2command.png)

![Anzahl der Installationen](http://iobroker.live/badges/text2command-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.text2command.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.text2command.svg)
![Tests](https://travis-ci.org/ioBroker/ioBroker.text2command.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.text2command.png?downloads=true)

# IoBroker.text2command
## Beschreibung
Dieser Adapter kann normale Sätze wie `Switch light in kitchen on` in einen bestimmten Befehl umwandeln und setzt den Status `adapter.0.device.kitchenLight` auf `true`.

Es macht keinen Sinn, diesen Adapter eigenständig zu aktivieren. Es sollte mit anderen Adaptern wie Telegram oder der Android-App **`iobroker.vis`** verwendet werden.

## Verwendung
Um den Befehl auszuführen, schreiben Sie den Status **`text2command.<INSTANCE>.text`** mit dem Satz. Die Antwort erhalten Sie immer in `text2command.<INSTANCE>.response`.

Wenn Sie **Antwort auf ID** definieren, wird die Antwort auch in diese ID geschrieben. Dies ist z.B. erforderlich für um zu erkennen, dass die Stimme es bestätigt.

Sie können eine Nachricht über `sendTo` aus Javascript senden. Die Antwort kommt in der Nachricht zurück:

```
sendTo('text2command', 'Switch light in kitchen on', function (err, response) {
    console.log('Response is: ' + response);
});
```

Es können reguläre Ausdrücke verwendet werden, wie zum Beispiel: `/^light\son|^lamp\son/`. Bei regulären Ausdrücken wird die Groß-/Kleinschreibung immer ignoriert.

Um „Ein-/Ausschalten nach Funktion“ zu nutzen, sollten Sie auf Funktionen achten.

Schlüsselwörter funktionieren wie folgt:

- Leerzeichen trennen Schlüsselwörter
- Alle Schlüsselwörter müssen in einem Satz vorhanden sein, um eine Regel auszulösen: z. B. Schlüsselwort: „Licht an“ wird bei „Licht einschalten“, „Licht überall anmachen“ ausgelöst und nicht bei „Einschalten“, „Licht machen“. .
- Ein Schlüsselwort kann viele Formen haben. Variationen des Schlüsselworts müssen durch „/“ geteilt werden. Beispielsweise lösen die Schlüsselwörter „switch/make/do light on/true“ aus: „do light true“, „make please light on“.
- Wenn das Schlüsselwort in vielen Fällen vorkommen kann (Nom, Gen, Akkusativ, Plural, ...), müssen sie alle als Variationen aufgeführt werden, wie zum Beispiel: „Licht/Lichter einschalten“.

Folgende Funktionen werden interpretiert als:

`enum.functions`:

**`enum.functions.light`** (Licht | Свет):

- Rollen - `level.dimmer`
- Rollen - `switch.light`

**`enum.functions.backlight`** (Beleuchtung | Beitrag):

- Rollen - `level.backlight`
- Rollen - `switch.backlight`

**`enum.functions.blinds/shutter`** (Rollladen | Жалюзи/окна)

- Rollen - `level.blind`
- Rollen - `switch.blind`

**`enum.functions.curtain`** (Vorhänge | Bilder)

- Rollen - `level.curtain`
- Rollen - `switch.curtain`

**`enum.functions.heating`** (Heizung | Отопление/Подогрев)

- Rollen - `level.temperature`
- Rollen - `switch.temperature`

**`enum.functions.music`** (Musik | Musik)

- Rollen - `button.play`
- Rollen - `button.stop` / `button.pause`

**`enum.functions.alarm/security`** (Alarmanlage / Alarm | Übersicht)

- Rollen - `switch.security`

**`enum.functions.lock`** (Schloß / Schloss | Schloss)

- Rollen - `switch.open`
- Rollen - `switch.lock`

Folgende Räume werden unterstützt:

| Schlüsselwort in Phrase | Mögliche enum.rooms in Englisch | auf deutsch | auf Russisch |
|-----------------------|---------------------------------|--------------------------|------------------|
| überall | überall | - | - |
| leben | Wohnzimmer | Wohnzimmer | зал |
| Schlafzimmer | Schlafzimmer/Schlafzimmer | Schlafzimmer | spanisch |
| Bad | Badezimmer/Badewanne | badezimmer/bad | ванная |
| Arbeiten/Büro | Büro | arbeitszimmer | Schrank |
| Kinder/Kind/Kindergarten | Kindergarten | Kinderzimmer | детская |
| Gäste-WC/Gästeschrank | Gäste-WC | gästewc | гостевой туалет |
| WC/Schrank | WC | WC | туалет |
| Etage/Eintritt | Boden | diele/gang/flur | коридор/прихожая |
| Küche | Küche | küche/kueche | Küche |
| Balkon/Terrasse/Terrasse | Terrasse | Balkon/Terrasse | TERRASA/BALKON |
| Essen | Esszimmer | esszimmer | столовая |
| Garage | Garage | Garage | гараж |
| Treppe | Treppen | Trepe/Treppenhaus | лестница |
| Garten | Garten | Garten | сад |
| Hof/Hof | Gericht | hof | двор |
| Gästezimmer | Gästezimmer | gästezimmer | гостевая |
| Dachboden | Dachboden | speicher | кладовка |
| Dach | Dach | dachstuhl | крыша |
| Terminal | Terminal | anschlussraum | сени |
| Waschraum | Waschraum | waschraum | прачечная |
| Wärmeraum | Heizraum | Heizungsraum/Heizungsraum | котельная |
| Hütte | Hütte | schuppen/scheune | сарай |
| Sommerhaus | Sommerhaus | Gartenhaus | теплица |

Sie können Muster in Bestätigungen verwenden:

- „%s“: Wert
- „%u“: Einheit
- `%n`: Name (geplant!)
- „{objectId}“: Der Status dieser Objekt-ID wird hier platziert. Tatsächlich werden es dieselben Bindungen sein, die von [iobroker.vis](https://github.com/ioBroker/ioBroker.vis#bindings-of-objects) unterstützt werden, mit Ausnahme spezieller Bindungen.

Die folgenden Befehle werden unterstützt:

### Wie spät ist es?
Antwort: 14:56 (aktuelle Zeit)

### Wie heißt du?
Die Antwort ist anpassbar. Standard: `My name is Alpha`

### Wie hoch ist die Außentemperatur?
Der Benutzer muss die Status-ID angeben, in der die Außentemperatur abgelesen werden soll.
Die Antwort ist anpassbar. Standard: `Outside temperature is %s %u` **`%s`** wird durch die Temperatur ersetzt, auf eine ganze Zahl gerundet. **`%u`** wird durch Einheiten dieses Zustands oder durch Systemtemperatureinheiten ersetzt.

### Wie hoch ist die Innentemperatur?
Der Benutzer muss die Status-ID angeben, in der die Innentemperatur abgelesen werden soll.
Die Antwort ist anpassbar. Standard: `Inside temperature is %s %u` **`%s`** wird durch die Temperatur ersetzt, auf eine ganze Zahl gerundet. **`%u`** wird durch Einheiten dieses Zustands oder durch Systemtemperatureinheiten ersetzt.

### Ein-/Ausschalten nach Funktion
Dieser Befehl liest Informationen aus Enumerationen. Es verwendet `enum.functions`, um den Gerätetyp zu finden (z. B. Licht, Alarm, Musik) und `enum.rooms`, um den Raumnamen zu erkennen.

Beispiel auf Deutsch: ![Aufzählungen](../../../en/adapterref/iobroker.text2command/img/enums.png)

Schlüsselwörter zum Einschalten sind: *einschalten*, z.B. `switch rear light in bath on`

Schlüsselwörter zum Abschalten sind: *abschalten*, z.B. `switch light in living room off`

Die Antwort wird auf Wunsch automatisch generiert: `Switch off %function% in %room%`, wobei `%function%` und `%room%` durch den gefundenen Gerätetyp und Standort ersetzt werden.

Der Befehl akzeptiert auch den numerischen Wert. Es hat Vorrang, z.B. Im Befehl `switch light off in living room on 15%` wird das Licht auf 15 % gesetzt und nicht im *Aus*-Zustand.

Sie können den Standardraum in [] definieren. Z.B. `switch the light on[sleepingroom]`

### Jalousien öffnen/schließen
Dieser Befehl liest Informationen aus Aufzählungen. Es verwendet **`enum.functions.blind`**, um den Typ von Jalousien oder Rollläden zu finden, und **`enum.rooms`**, um den Raumnamen zu erkennen.

Schlüsselwörter zum Hochfahren von Jalousien sind: *Jalousien hoch*, z.B. `set blinds up in sleeping room`

Schlüsselwörter zum Herunterfahren von Jalousien sind: *Jalousien herunter*, z.B. `move blinds down in office`

Sie können die genaue Position der Jalousie in Prozent angeben, z.B. `move blinds to 40 percent in office`

Die Antwort wird auf Wunsch automatisch generiert: ` in %room%`, wobei %room% durch den gefundenen Gerätetyp und Standort ersetzt wird.

### Etwas ein-/ausschalten
Der Benutzer muss die Status-ID eines Geräts angeben, das gesteuert werden muss, und einen Wert, der geschrieben werden muss.

Sie sollten für jede Position eine Regel erstellen (z. B. für `on` und für `off`).

Die Antwort ist anpassbar. Standard: `Switched on`

Z.B.:

- „Alarm deaktivieren“, Objekt-ID: „hm-rpc.0.alarm“, Wert: „false“, Antwort: „Alarm ist deaktiviert/Deaktiviert“. In diesem Fall wird die Antwort zufällig zwischen *Alarm ist deaktiviert* und *Deaktiviert* ausgewählt.
- „Alarm aktivieren“, Objekt-ID: „hm-rpc.0.alarm“, Wert: „true“, Antwort: „Alarm ist aktiviert/Aktiviert/Fertig“. In diesem Fall wird die Antwort zufällig zwischen *Alarm ist aktiviert*, *Aktiviert* und *Fertig* ausgewählt.

*Deaktivieren* muss an erster Stelle in der Liste stehen, da es länger ist.

Sie können in den Steuerbefehlen Float-Werte verwenden. Wenn im Text ein numerischer Wert enthalten ist, wird dieser als Kontrollwert verwendet und der vordefinierte Wert wird ignoriert.

Z.B. zur Regel:

- „Lichtstärke einstellen“, Objekt-ID: „hm-rpc.0.light.STATE“, Wert: „10“, Antwort: „Stufe auf %s% gesetzt“.

Wenn der Befehl wie `Set light level to 50%` ist, wird in `hm-rpc.0.light.STATE` 50 geschrieben und die Antwort lautet `Level set to 50%`.

Wenn der Befehl wie `Set light level` ist, wird in `hm-rpc.0.light.STATE` 10 geschrieben und die Antwort lautet `Level set to 10%`.

### Nach etwas fragen
Der Benutzer muss die Status-ID eines Geräts angeben, dessen Wert gelesen wird.
Diese Vorlage antwortet mit Informationen aus einem Bundesstaat.

Z.B.:

- „Fenster geöffnet“, Objekt-ID: „javascript.0.countOpenedWindows“, Bestätigung: „Aktuell %s Fenster geöffnet“.
- „Temperatur Schlafraum“, Objekt-ID: „hm-rpc.0.sleepingRoomSensor.TEMPERATURE“, Bestätigung: „Die tatsächliche Temperatur im Schlafraum beträgt %s %u/%s %u“. In diesem Fall wird die Antwort randomisiert zwischen *Die tatsächliche Temperatur im Schlafraum beträgt %s %u* und *%s %u*.

### Text an Staat senden
Sie können Text in den Status schreiben. Der Benutzer muss die Status-ID angeben, um Text hineinschreiben zu können.

Z.B. Regel: `email [to] wife`, Objekt-ID: `javascript.0.emailToWife`, Bestätigung: `Email sent` Text: `Send email to my wife: I will be late`. Der Adapter sucht nach dem letzten Wort aus Schlüsselwörtern (in diesem Fall `wife`), extrahiert Text aus dem nächsten Wort (in diesem Fall `I will be late`) und schreibt diesen Text in `javascript.0.emailToWife`.
Wort `to` ist nicht erforderlich, um die Regel auszulösen, wird aber aus einem Text entfernt.

### Du bist gut (Nur zum Spaß)
Die Antwort ist anpassbar. Standard: `Thank you` oder `You are welcome`

### Danke (Nur zum Spaß)
Die Antwort ist anpassbar. Standard: `No problem` oder `You are welcome`

### Antwort erstellen
Sie können eine Antwort mit Bindungen {objectId} als Bestätigung generieren. Wird für Alexa verwendet.

Z.B.:

- „Fenster geöffnet“, Bestätigung: „Tatsächlich {javascript.0.countOpenedWindows} Fenster geöffnet“.
- „Temperatur Schlafraum“, Bestätigung: „Die tatsächliche Temperatur im Schlafraum beträgt {t: hm-rpc.0.sleepingRoomSensor.TEMPERATURE; Math.round(t)}/{hm-rpc.0.sleepingRoomSensor.TEMPERATURE; Round(1)} Grad`. In diesem Fall wird die Antwort zufällig zwischen *Die tatsächliche Temperatur im Schlafraum beträgt <WERT>* und *<WERT>* ausgewählt.

Mehr über Bindungen können Sie hier lesen: (Bindungen von Objekten)[https://github.com/ioBroker/ioBroker.vis#bindings-of-objects]

Zusätzlich können Sie die bisherige Zeit nach `{hm-rpc.0.light.STATE.lc;dateinterval}` (2 Minuten und 12 Sekunden) oder `{hm-rpc.0.light.STATE.lc;dateinterval(true)}` (2 Minuten und 12 Sekunden **vor**) abrufen.

## Externe Regeln mit Javascript
Es besteht die Möglichkeit, die Javascript-Engine zur Verarbeitung von Befehlen in `text2command` zu verwenden.
Dazu müssen Sie einen Status in „Prozessorstatus-ID“ (Erweiterte Einstellungen) angeben und diesen Status in einem JS- oder Blockly-Skript abhören.
Sie können einen Status manuell im Admin oder im Skript erstellen. Das Verarbeitungsskript kann wie folgt aussehen:

```
createState("textProcessor", '', function () {
    // text2command writes the value with ack=false. Change "any" is important too, to process repeated commands.
    on({id: "javascript.0.textProcessor", ack: false, change: 'any'}, function (obj) {
         var task = JSON.parse(obj.state.val);
         // value looks like
         // {
         //     "command":      "text to process", // command that was received by text2command
         //     "language":     "en",              // language in command or system language
         //     "withLanguage": false              // indicator if language was defined in command (true) or used default language (false)
         // }
         // response to text2command with ack=true
         if (task.command === 'switch light on') {
            setState("hm-rpc.0.light", true);
            setState("javascript.0.textProcessor", 'light is on', true);
         } else {
            // let it process with predefined rules
            setState("javascript.0.textProcessor", '', true);
         }
    });
});
```

Legen Sie in den Einstellungen von `text2command` **Prozessorstatus-ID** als *`javascript.0.textProcessor`* fest, damit dieses Beispiel funktioniert.

Erstens wird der Befehl mit Ihrem Javascript verarbeitet. Wenn Javascript mit „“ antwortet oder nicht innerhalb einer vordefinierten Zeit (standardmäßig 1 Sekunde) antwortet, wird der Befehl nach Regeln verarbeitet.

### Option: Bei jedem Befehl in die Antwort schreiben
Wenn dies aktiviert ist, wird bei jedem Befehl (egal ob die Anfrage über state oder sendTo kam) der `text2command.X.response` mit der Antwort geschrieben.

# Machen
- auf Russisch, männliche und weibliche Antworten.

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **ARBEIT IN ARBEIT** -->

## Changelog
### 3.0.3 (2023-12-18)
* (bluefox) Corrected GUI

### 3.0.2 (2023-02-27)
* (bluefox) Corrected link from admin

### 3.0.1 (2023-02-21)
* (bluefox) Corrected many GUI errors

### 2.3.1 (2023-02-03)
* (bluefox) Migrated GUI to v5

### 2.2.2 (2022-06-17)
* (Apollon77) Fix crash cases reported by Sentry

### 2.2.1 (2022-02-21)
* (bluefox) Checked the existence of `sayit` instance before output
* (bluefox) Added the decimal places settings to temperature  
* (bluefox) Added the second object ID to user queries
* (bluefox) Added the option: "No negative answer"

### 2.1.6 (2022-02-16)
* (bluefox) Corrected GUI

### 2.1.4 (2022-02-16)
* (bluefox) Some errors will be caught at start

### 2.1.2 (2022-02-13)
* (bluefox) Updated GUI.
* (bluefox) Updated releaser

### 2.1.1 (2021-06-15)
* (PeterVoronov) Corrected usage of regex

### 2.1.0 (2021-05-24)
* (bluefox) Updated GUI.

### 2.0.7 (2020-12-12)
* (Apollon77) Prevent crash case (Sentry IOBROKER-TEXT2COMMAND-J)

### 2.0.6 (2020-12-03)
* (Apollon77) Prevent crash case (Sentry IOBROKER-TEXT2COMMAND-D, IOBROKER-TEXT2COMMAND-C)

### 2.0.5 (2020-09-5)
* (bluefox) Updated the select ID dialog.

### 2.0.3 (2020-07-14)
* (bluefox) Fixed GUI errors

### 2.0.2 (2020-07-13)
* (bluefox) Fixed GUI errors

### 2.0.1 (2020-07-08)
* (bluefox) Fixed select ID dialog

### 2.0.0 (2020-07-06)
* (bluefox) New GUI

### 1.3.1 (2019-07-18)
* (unltdnetworx) changed copyright year to 2019, according to issue #41
* (unltdnetworx) additional words for blinds and functions in english and german
* (unltdnetworx) fixed typo

### 1.3.0 (2019-07-18)
* (bluefox) Using the defined language by words

### 1.2.5 (2019-02-12)
* (unltdnetworx) description in german corrected
* (unltdnetworx) added percent to true/false rules

### 1.2.4 (2018-05-05)
* (Apollon77) Fix

### 1.2.3 (2018-05-01)
* (bluefox) Support of bindings in answer {objId}

### 1.2.0 (2018-04-23)
* (bluefox) Support of Admin3 (but not materialize style)

### 1.1.7 (2018-04-04)
* (bluefox) The parsing error was fixed

### 1.1.6 (2017-10-05)
* (bluefox) Check if units are undefined

### 1.1.5 (2017-08-14)
* (bluefox) Support of iobroker.pro

### 1.1.4 (2017-03-27)
* (bluefox) translations

### 1.1.3 (2016-08-30)
* (bluefox) russian translations

### 1.1.2 (2016-08-29)
* (bluefox) fix the russian temperature text
* (bluefox) extend rule "control device" with option 0/1
* (bluefox) use by control of devices min/max values if set

### 1.1.1 (2016-08-19)
* (bluefox) add additional info for external text processor

### 1.1.0 (2016-08-16)
* (bluefox) add text processor state ID

### 1.0.2 (2016-07-22)
* (bluefox) fix error with detection of numeric values

### 1.0.1 (2016-06-01)
* (bluefox) fix: send text command

### 1.0.0 (2016-05-05)
* (bluefox) replace special chars in input text: #'"$&/\!?.,;:(){}^

### 0.1.10 (2016-03-20)
* (bluefox) fix double pronunciation of some answers

### 0.1.9 (2016-03-20)
* (bluefox) ignore spaces

### 0.1.8 (2016-03-15)
* (bluefox) fix error with enums

### 0.1.7 (2016-03-12)
* (bluefox) implement "say something"

### 0.1.6 (2016-02-24)
* (bluefox) fix temperature

### 0.1.5 (2016-02-23)
* (bluefox) fix russian outputs

### 0.1.4 (2016-02-22)
* (bluefox) fix russian outputs

### 0.1.3 (2016-02-21)

* (bluefox) round temperature in answers

### 0.1.2 (2016-02-21)
* (bluefox) implement russian time

### 0.1.1 (2016-02-19)
* (bluefox) check invalid commands

### 0.1.0 (2016-02-19)
* (bluefox) fix problem with controlling of channels
* (bluefox) enable write JSON as argument

### 0.0.3 (2016-02-14)
* (bluefox) remove unused files

### 0.0.2 (2016-02-10)
* (bluefox) extend readme

### 0.0.1 (2016-02-09)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2014-2023, bluefox <dogafox@gmail.com>

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