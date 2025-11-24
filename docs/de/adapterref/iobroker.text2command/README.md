---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.text2command/README.md
title: ioBroker.text2command
hash: l9vN/k83Zfh9akKokc1tcMMOrclUQ+qlFqKE//sCtFY=
---
![Logo](../../../en/adapterref/iobroker.text2command/admin/text2command.png)

![Anzahl der Installationen](http://iobroker.live/badges/text2command-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.text2command.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.text2command.svg)
![Tests](https://travis-ci.org/ioBroker/ioBroker.text2command.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.text2command.png?downloads=true)

# IoBroker.text2command
## Beschreibung
Dieser Adapter kann normale Sätze wie `Switch light in kitchen on` in spezifische Befehle umwandeln und den Zustand `adapter.0.device.kitchenLight` auf `true` setzen.

Dieser Adapter ist nicht zur alleinigen Aktivierung geeignet. Er sollte zusammen mit anderen Adaptern wie Telegram oder der Android-App **`iobroker.vis`** verwendet werden.

## Verwendung
Um den Befehl auszuführen, schreiben Sie den Zustand **`text2command.<INSTANCE>.text`** mit dem Satz. Sie erhalten immer die Antwort in `text2command.<INSTANCE>.response`.

Wenn Sie **Antwort an ID** definieren, wird die Antwort ebenfalls in diese ID geschrieben. Dies ist beispielsweise erforderlich, um die Sprachbestätigung zu realisieren.

Sie können eine Nachricht über `sendTo` von `javascript` senden. Die Antwort erhalten Sie in der Rücknachricht:

```js
sendTo('text2command', 'Switch light in kitchen on', function (err, response) {
    console.log('Response is: ' + response);
});
```

Es können reguläre Ausdrücke verwendet werden, zum Beispiel: `/^light\son|^lamp\son/`. Reguläre Ausdrücke unterscheiden nicht zwischen Groß- und Kleinschreibung.

Um die Option „Ein-/Ausschalten nach Funktion“ nutzen zu können, müssen Sie sich um die Funktionen kümmern.

Schlüsselwörter funktionieren wie folgt:

- Leerzeichen trennen Schlüsselwörter
- Alle Schlüsselwörter müssen in einem Satz vorhanden sein, damit eine Regel ausgelöst wird: z.B. löst das Schlüsselwort `light on` die Regel bei `switch light on` und `make light on everywhere` aus, nicht aber bei `switch on` und `make light`.
Ein Schlüsselwort kann mehrere Formen haben. Varianten eines Schlüsselworts müssen durch „/“ getrennt werden. Zum Beispiel: Die Schlüsselwörter `switch/make/do light on/true` lösen Folgendes aus: `do light true`, `make please light on`.
- Wenn ein Schlüsselwort in mehreren Fällen vorkommen kann (Nominativ, Genitiv, Akkusativ, Plural usw.), müssen alle diese Fälle als Varianten aufgeführt werden, z. B.: `Licht/Lichter einschalten`.

Die folgenden Funktionen werden interpretiert als

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

- roles - `level.curtain`
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

- roles - `switch.open`
- roles - `switch.lock`

Folgende Räume werden unterstützt:

| Schlüsselwort in der Phrase | Mögliche Aufzählungsräume auf Englisch | auf Deutsch | auf Russisch |
|-----------------------|---------------------------------|--------------------------|-------------------|
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
| Garage | Garage | Garage | GARAGE |
| Treppe | Treppen | Trepe/Treppenhaus | лестница |
| Garten | Garten | Garten | сад |
| Hof/Hof | Gericht | hof | двор |
| Gästezimmer | Gästezimmer | gästezimmer | гостевая |
| Dachboden | Dachboden | speicher | кладовка |
| Dach | Dachstuhl | Dachstuhl | Dachstuhl |
| Terminal | Terminal | anschlussraum | сени |
| Waschraum | Waschraum | waschraum | прачечная |
| Wärmeraum | Heizraum | Heizungsraum/Heizungsraum | котельная |
| Hütte | Hütte | schuppen/scheune | сарай |
| Sommerhaus | Sommerhaus | Gartenhaus | теплица |

Sie können in Danksagungen Muster verwenden:

- `%s`: Wert
- `%u`: Einheit
- `%n`: Name (geplant!)
- `{objectId}`: Der Status dieser Objekt-ID wird hier gespeichert. Tatsächlich werden dieselben Bindungen unterstützt wie von [iobroker.vis](https://github.com/ioBroker/ioBroker.vis#bindings-of-objects), mit Ausnahme spezieller Bindungen.

Folgende Befehle werden unterstützt:

### Wie spät ist es?
Antwort: 14:56 (aktuelle Zeit)

### Wie heißt du?
Die Antwort ist anpassbar. Standard: `My name is Alpha`

### Wie hoch ist die Außentemperatur?
Der Benutzer muss die Bundesstaats-ID angeben, aus der die Außentemperatur abgelesen werden soll.
Die Antwort ist anpassbar. Standard: `Outside temperature is %s %u` **`%s`** wird durch die auf eine ganze Zahl gerundete Temperatur ersetzt. **`%u`** wird durch die Einheiten dieses Bundesstaates oder die Systemtemperatureinheiten ersetzt.

### Wie hoch ist die Innentemperatur?
Der Benutzer muss die Bundesstaats-ID angeben, in der die Innentemperatur ausgelesen werden soll.
Die Antwort ist anpassbar. Standard: `Inside temperature is %s %u` **`%s`** wird durch die auf eine ganze Zahl gerundete Temperatur ersetzt. **`%u`** wird durch die Einheiten dieses Bundesstaates oder die Systemtemperatureinheiten ersetzt.

### Ein-/Ausschalten per Funktion
Dieser Befehl liest Informationen aus Enumerationen. Er verwendet `enum.functions`, um den Gerätetyp (z. B. Licht, Alarm, Musik) zu ermitteln, und `enum.rooms`, um den Raumnamen zu erkennen.

Beispiel auf Deutsch: ![Aufzählungen](../../../en/adapterref/iobroker.text2command/img/enums.png)

Schlüsselwörter zum Einschalten sind: *einschalten*, z. B. `switch rear light in bath on`

Schlüsselwörter zum Ausschalten sind: *ausschalten*, z. B. `switch light in living room off`

Die Antwort wird auf Wunsch automatisch generiert: `Switch off %function% in %room%`, wobei `%function%` und `%room%` durch den gefundenen Gerätetyp und Standort ersetzt werden.

Der Befehl akzeptiert auch numerische Werte. Diese haben Priorität; beispielsweise wird beim Befehl `switch light off in living room on 15%` die Lampe auf 15 % eingestellt und nicht ausgeschaltet.

Sie können einen Standardraum in [] definieren. Z. B. `switch the light on[sleepingroom]`

### Jalousien öffnen/schließen
Dieser Befehl liest Informationen aus Aufzählungen. Er verwendet **`enum.functions.blind`**, um den Typ (Jalousien oder Rollläden) zu ermitteln, und **`enum.rooms`**, um den Raumnamen zu erkennen.

Schlüsselwörter zum Hochfahren der Jalousien sind: *Jalousien hoch*, z. B. `set blinds up in sleeping room`

Schlüsselwörter zum Herunterfahren der Jalousien sind: *Jalousien herunter*, z. B. `move blinds down in office`

Sie können die genaue Position der Blende in Prozent angeben, z. B. `move blinds to 40 percent in office`

Die Antwort wird auf Wunsch automatisch generiert: ` in %room%`, wobei %room% durch den gefundenen Gerätetyp und Standort ersetzt wird.

### Etwas ein-/ausschalten
Der Benutzer muss die Status-ID eines zu steuernden Geräts und den zu schreibenden Wert angeben.

Sie sollten für jede Position eine Regel erstellen (z. B. für `on` und für `off`).

Die Antwort ist anpassbar. Standard: `Switched on`

Z.B.:

- `Alarm deaktivieren`, Objekt-ID: `hm-rpc.0.alarm`, Wert: `false`, Antwort: `Alarm ist deaktiviert/Deaktiviert`. In diesem Fall wird die Antwort zufällig zwischen *Alarm ist deaktiviert* und *Deaktiviert* ausgewählt.
- `Alarm aktivieren`, Objekt-ID: `hm-rpc.0.alarm`, Wert: `true`, Antwort: `Alarm ist aktiviert/Aktiviert/Fertig`. In diesem Fall wird die Antwort zufällig zwischen *Alarm ist aktiviert*, *Aktiviert* und *Fertig* gewählt.

*Deaktivieren* muss an erster Stelle in der Liste stehen, da es länger ist.

Sie können Gleitkommazahlen in den Steuerbefehlen verwenden. Wenn ein numerischer Wert im Text enthalten ist, wird dieser als Steuerwert verwendet und der vordefinierte Wert ignoriert.

Beispiel für Regel:

- `Set light level`, Objekt-ID: `hm-rpc.0.light.STATE`, Wert: `10`, Antwort: `Level set to %s%`.

Wenn der Befehl beispielsweise `Set light level to 50%` lautet, dann wird in `hm-rpc.0.light.STATE` die Zahl 50 geschrieben und die Antwort lautet `Level set to 50%`.

Wenn der Befehl beispielsweise `Set light level` lautet, dann wird in `hm-rpc.0.light.STATE` die Zahl 10 geschrieben und die Antwort lautet `Level set to 10%`.

### Fragen Sie nach etwas
Der Benutzer muss die Status-ID eines Geräts angeben, deren Wert ausgelesen wird.
Diese Vorlage liefert Informationen aus einem bestimmten Bundesstaat.

Z.B.:

- `Fenster geöffnet`, Objekt-ID: `javascript.0.countOpenedWindows`, Bestätigung: `Tatsächlich %s Fenster geöffnet`
- `Temperatur Schlafraum`, Objekt-ID: `hm-rpc.0.sleepingRoomSensor.TEMPERATURE`, Bestätigung: `Die tatsächliche Temperatur im Schlafraum beträgt %s %u/%s %u`. In diesem Fall wird die Antwort zufällig zwischen *Die tatsächliche Temperatur im Schlafraum beträgt %s %u* und *%s %u* ausgewählt.

### SMS an den Staat senden
Sie können Text in das Feld „Status“ eingeben. Der Benutzer muss die Status-ID angeben, um Text hineinzuschreiben.

Beispiel: Regel: `email [to] wife`, Objekt-ID: `javascript.0.emailToWife`, Bestätigung: `Email sent`, Text: `Send email to my wife: I will be late`. Der Adapter sucht das letzte Wort der Schlüsselwörter (in diesem Fall `wife`), extrahiert den Text aus dem nächsten Wort (in diesem Fall `I will be late`) und schreibt diesen Text in `javascript.0.emailToWife`.
Das Wort `to` ist für die Auslösung der Regel nicht erforderlich, wird aber aus dem Text entfernt.

### Du bist gut (Nur zum Spaß)
Die Antwort ist anpassbar. Standard: `Thank you` oder `You are welcome`

### Danke (Nur zum Spaß)
Die Antwort ist anpassbar. Standard: `No problem` oder `You are welcome`

### Antwort erstellen
Sie können eine Antwort mit Bindungen {objectId} in der Bestätigung generieren. Wird für Alexa verwendet.

Z.B.:

- `windows opened`, Acknowledge: `Tatsächlich {javascript.0.countOpenedWindows} windows opened`
- `Temperatur im Schlafzimmer`, Bestätigung: `Die tatsächliche Temperatur im Schlafzimmer beträgt {t: hm-rpc.0.sleepingRoomSensor.TEMPERATURE; Math.round(t)}/{hm-rpc.0.sleepingRoomSensor.TEMPERATURE; round(1)} Grad`. In diesem Fall wird die Antwort zufällig zwischen *Die tatsächliche Temperatur im Schlafzimmer beträgt <WERT>* und *<WERT>* ausgewählt.

Mehr über Bindungen erfahren Sie hier: (Bindungen von Objekten)[https://github.com/ioBroker/ioBroker.vis#bindings-of-objects]

Zusätzlich können Sie die bisherige Zeit mit `{hm-rpc.0.light.STATE.lc;dateinterval}` (2 Minuten und 12 Sekunden) oder `{hm-rpc.0.light.STATE.lc;dateinterval(true)}` (vor 2 Minuten und 12 Sekunden) abrufen.

## Externe Regeln mit `javascript`
Es besteht die Möglichkeit, die `javascript`-Engine zur Verarbeitung von Befehlen in `text2command` zu verwenden.

Dazu müssen Sie in den „Verarbeitungsstatus-IDs“ (Erweiterte Einstellungen) einen Zustand festlegen und diesen Zustand in einem JavaScript- oder Blockly-Skript überwachen.
Sie können einen Zustand manuell im Adminbereich oder in einem Skript erstellen. Das Verarbeitungsskript könnte beispielsweise so aussehen:

```js
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

Um dieses Beispiel auszuführen, muss in den Einstellungen für `text2command` **Prozessorstatus-ID** der Wert *`javascript.0.textProcessor`* festgelegt werden.

Zunächst wird der Befehl mit Ihrem `javascript` verarbeitet. Wenn `javascript` mit '' antwortet oder nicht innerhalb der vordefinierten Zeit (standardmäßig 1 Sekunde) antwortet, wird der Befehl nach Regeln verarbeitet.

### Option: Bei jedem Befehl in die Antwort schreiben
Wenn dies durch jeden Befehl aktiviert wird (unabhängig davon, ob die Anfrage über state oder sendTo erfolgte), wird `text2command.X.response` mit der Antwort geschrieben.

# Aufgaben
- auf Russisch, männliche und weibliche Antworten.

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN BEARBEITUNG** -->

## Changelog
### 4.0.0 (2025-11-03)
* (bluefox) GUI was updated to vite
* (bluefox) Minimal nodejs version is 20.x

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
* (bluefox) Some errors will be caught at the start

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

Copyright (c) 2014-2025, bluefox <dogafox@gmail.com>

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