---
chapters: {"pages":{"en/adapterref/iobroker.weather-warnings/README.md":{"title":{"en":"ioBroker.weather-warnings"},"content":"en/adapterref/iobroker.weather-warnings/README.md"},"en/adapterref/iobroker.weather-warnings/README_DE.md":{"title":{"en":"ioBroker.weather-warnings"},"content":"en/adapterref/iobroker.weather-warnings/README_DE.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.weather-warnings/README.md
title: ioBroker.weather-warnings
hash: c11YKkuV+1axKe04ZpnfIHAKuipCnuhzFGO88iMKJFM=
---
![Logo](../../../en/adapterref/iobroker.weather-warnings/admin/weather-warnings.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.weather-warnings.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.weather-warnings.svg)
![Anzahl der Installationen](https://iobroker.live/badges/weather-warnings-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/weather-warnings-stable.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/weather-warnings/287x66-grey.png)
![NPM](https://nodei.co/npm/iobroker.weather-warnings.png?downloads=true)
![Test und Freigabe](https://github.com/ticaki/ioBroker.weather-warnings/actions/workflows/test-and-release.yml/badge.svg?event=push)
![PayPal-Spende](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)

# ioBroker.weather-warnings

## Wetterwarnungsadapter für ioBroker

[Deutsche Readme (meist aktueller)](/#/docs/adapterref/iobroker.weather-warnings/README_DE.md)

Dieser Adapter greift auf Wetterwarnungen verschiedener Wetterdienste zu und gibt sie als Text- oder Sprachnachrichten aus. Zusätzlich erstellt er nach Typ gruppierte Zustände, mit denen auf aktuelle Warnungen reagiert werden kann.

Anbieter:

- DWD
- ZAMG (Österreich)
- UWZ

Push-Dienst

- Telegramm
- WhatsApp
- Leichtgläubig
- E-Mail
- Alexa
- Sag es

## Installation

Mindestens Node.js-Version: v22. Nach der Installation öffnet sich die Konfigurationsseite automatisch und muss **neu geladen** werden. Dadurch werden die Vorlagen in der eingestellten Sprache angezeigt.

## Konfiguration

![Basiskonfiguration](../../../en/adapterref/iobroker.weather-warnings/img/basic.png)

- **DWD/UWZ/ZAMG aktivieren:** Aktivieren Sie den Datenabruf dieser Dienstanbieter.

- **Telegram/Pushover aktivieren,...:** Aktivieren Sie die Ausgabe von Nachrichten an diese installierten Adapter.

- **E-Mail aktivieren:** Sendet alle aktuellen Warnungen in eine E-Mail.

- **Verlauf aktivieren:** Schreibt den Verlauf, der bis zu 500 Einträge enthalten kann, in den Ordner „.history“. Alle Daten oder ausgewählte Daten.

- **Aktiviert json-array:** Eine ganz besondere Funktion, die die aktuellen Warnungen in ein Array einfügt oder - nach der Aktivierung - ein benutzerdefiniertes JSON in ein Array einfügt, das von Skripten verwendet werden kann.

- **Aktualisierungsintervall:** das Intervall der Datenabfrage in Minuten (Minimum: 5)

- **Eingehende Warnungen...:** Nach dem Start des Adapters werden die Warnungen des ersten Datenabrufs als bekannt behandelt und lösen keine Benachrichtigung aus.

- **Experte** : Aktiviert zusätzliche optionale Einstellungen

- **Testen – Aktivieren…:** Testdaten verwenden. Adapter ist offline.

- **Testen – Rohdatenverlauf:** Nur auf Anfrage für Debugging-Zwecke.

![Vorlage](../../../en/adapterref/iobroker.weather-warnings/img/template.png)

Hier können Sie eigene Nachrichten erstellen oder bestehende bearbeiten. Alle verfügbaren „Tokens“ und ihre Bedeutungen werden unterhalb der Tabelle angezeigt. Die eindeutige Kennung wird von Push-Benachrichtigungsdiensten verwendet, um zu bestimmen, welche Vorlage für welchen Benachrichtigungstyp verwendet wird.

Nach dem Hinzufügen oder Löschen von Vorlagen speichern und schließen.

Schilder mit besonderer Bedeutung:

- `${}` Enthält Platzhalter, die durch generierte Informationen ersetzt werden. Die Vorlagenkennung kann hier ebenfalls verwendet werden.
- Vorlagenkennungen, die mit beginnen`_` werden von den Diensten nicht angeboten.
- `${[0,1,2,3,4]token}` Eine Zeichenkette mit Werten, wobei das Token ein Zahlentoken sein muss. Der Index entspricht dem im Beispiel gezeigten. 0 ist der erste Wert in der Liste.
- `${(value=token)result1#result2}` oder`${(value=token)result1}` ist dasselbe wie ein JavaScript-Befehl:`if (value == token) result1 else result2` mögliche Vergleiche:`= < > != `
- für eine JSON-Vorlage die schließende Klammer`}` muss auf diese Weise geschrieben werden`\}`
- Beispiele finden Sie im Adapter.
- Alternativ ist auch Folgendes möglich:`${[0,🟢,🟡,🟠,🔴]warnlevelnumber}`

**Vorlagen wiederherstellen:** Setzt die Vorlagen auf die aktuelle Systemsprache zurück. Vorhandene Vorlagen gehen dabei **verloren** . Anschließend speichern und schließen. Sollte nach dem Ändern der Systemsprache verwendet werden.

![DWD](../../../en/adapterref/iobroker.weather-warnings/img/DWD.png)

**DWD:** Auswahl aus einer Liste von 10000 Orten, nach der Eingabe auf einen anderen Tab klicken und dann zurückkehren, Liste ist zu groß und muss aktualisiert werden.

**UWZ:** Eingabe mit der Länderkennung DE AT (andere sind möglich, müssen getestet werden) und der Postleitzahl, zum Beispiel DE12345

**ZAMG:** Nur für Österreich. Eingabe von Koordinaten innerhalb Österreichs.

**Ortsname:** Benutzerspezifischer Ortsname, kann in Warnungen verwendet werden (nützlich bei mehreren Warnzellen)

**Filter:**

- Rohdaten filtern: Filtert alle Daten heraus, die innerhalb von X Stunden in die Zukunft fallen, bevor jede weitere Verarbeitung erfolgt.
- Typ: Verwirft alle Elemente dieses Typs.
- Stufe: Alles unterhalb dieser Stufe wird verworfen.

![Telegramm](../../../en/adapterref/iobroker.weather-warnings/img/telegram.png) **Adapter:** Wenn diese Option aktiviert ist und ein Adapterfeld vorhanden ist, muss eine gültige Option ausgewählt werden. Eine Fehlermeldung im Protokoll weist auf fehlende Einstellungen hin.

**Aktivieren ...:** Warnungen dieses Anbieters mit diesem Dienst senden.

**Filter:**

1. Warnungen dieses Typs ignorieren
2. Warnungen mit gleichem oder niedrigerem Niveau ignorieren

**Nachrichten:** Verwenden Sie die folgenden Vorlagen für: Spalte 1:

1. Neue oder bestehende Warnungen
2. Eine Warnung wurde entfernt, es gibt aber **noch andere** aktive Warnungen.
3. Die Warnungen wurden entfernt und es gibt **keine weiteren** aktiven Warnungen.

Spalte 2:

1. Manuell ausgelöste Benachrichtigungen
2. Verwendung ohne Warnung 1.3

Vorlagen für 3) dürfen nicht enthalten`${}` Token.

**Besondere Merkmale**

**E-Mail:** Der Header wird vor der eigentlichen E-Mail-Adresse eingefügt, gefolgt von 1, 2 oder 3 Zeilenumbrüchen und dem Footer. Die E-Mail wird im HTML-Format versendet, sodass Sie beliebige HTML-Tags hinzufügen können. (Weitere Funktionen sind in Arbeit und noch nicht verfügbar.)

**Alexa:** Zusätzlich muss ein oder mehrere Geräte ausgewählt werden. Die Lautstärke ändert sich nur bei Sprachnachrichten und sollte anschließend auf den Standardwert zurückgesetzt werden. Die Nachrichtenlänge pro Warnung ist auf 250 Zeichen begrenzt. Töne sind möglich; aktivieren Sie den Expertenmodus, um die Optionen anzuzeigen.

Nur **Titel, Kopfzeile und Fußzeile** – ${status} funktioniert hier. Andere Platzhalter enthalten zufällige Werte oder keinen Wert.

## Allgemeines Verhalten

- Es dürfen keine doppelten Nachrichten für ein und dasselbe Anliegen versendet werden. DWD legt diesbezüglich großen Wert.
- Wenn`none` Wenn diese Vorlage ausgewählt ist, werden keine Benachrichtigungen dafür versendet.
- Die Zustände in .alerts enthalten Arrays für Start, Ende, Warnungstyp, Status „aktiv“ und Überschrift, gruppiert nach Warnungstyp. Pro Gruppe wird eine Warnung angezeigt, gefiltert nach folgenden Kriterien:
  1. Die Warnung ist **jetzt** aktiv (die mit der höchsten Stufe).

## Symbole

DWD-Symbol: Copyright durch Deutscher Wetterdienst ZAMG Symbol: Copyright durch

andere:

Schöpfer: [Adri Ansyah](https://www.youtube.com/channel/UChLOv1L-ftAFc2ZizdEAKgw?view_as=subscriber)

Änderungen: Im Original sind sie blau, andere Farben sind Abwandlungen des Originals.

Lizenz: [CC BY 4.0 Rechtscode](https://creativecommons.org/licenses/by/4.0/legalcode)

Iconpage: <https://icon-icons.com/de/symbol/Wetter-wind-cloud-Blitz-Regen/189105>

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.11.3 (2026-07-19)
- (ticaki) **FIXED**: adapter no longer crashes in a restart loop in compact mode; the trailing `export = WeatherWarnings` overwrote the compact-mode factory export, so js-controller tried to call the class without `new` ("Class constructor WeatherWarnings cannot be invoked without 'new'") (#317)
- (ticaki) **FIXED**: resolved UWZ warncell IDs are now persisted correctly; the wrong (unmodified) copy was written back to `uwzwarncellTable`, so every start re-ran the same lookup and config write, which in turn triggered another restart (#317)

### 0.11.2 (2026-06-18)
- (ticaki) **FIXED**: DWD spoken/written color names (`warnlevelcolorname`) now come from an exact lookup of the official DWD CAP color palette instead of a hue heuristic; light heat violet is now distinguished from dark heat violet, and the extreme-storm, UV and preliminary-information colors are named correctly (adds the color names light violet, dark red, magenta and pink) (#220)

### 0.11.1 (2026-06-18)
- (ticaki) **FIXED**: spoken/written color name for DWD heat warnings (`warnlevelcolorname`) is now correct: the light violet DWD heat color (`#cc99ff`) was misclassified as "green" and is now named "violet", matching email/vis (#220)

### 0.11.0 (2026-06-02)
- (copilot) **BREAKING**: Adapter requires node.js >= 22 now
- (ticaki) **NEW**: added DWD warning type 86 "extreme black ice" (extremes Glatteis) (#251)
- (ticaki) **NEW**: added global aggregate states `provider.hasActiveWarning` (boolean), `provider.maxLevel` (number) and `provider.maxLevelText` (text)
- (ticaki) **FIXED**: alexa2 notification no longer crashes when a warning type has no assigned sound
- (ticaki) **FIXED**: per-provider deactivation of datapoint categories (warning/alerts/formatedKeys) is applied again on restart
- (ticaki) **FIXED**: addressed ioBroker repository checker findings (node >= 22, `source-map-support` moved to runtime dependencies, admin jsonConfig schema issues, missing translations) (#300, #112)
- (ticaki) **FIXED**: DWD color name (`warnlevelcolorname`, e.g. spoken by Alexa) now matches the actual DWD warning color shown in email/vis instead of being derived from severity (#220)

### 0.10.1 (2026-04-20)
- (ticaki) **FIXED**: Network errors (e.g. internet down, DNS failure, HTTP errors) now show a clear, readable message instead of `[object Object]` or a useless stack trace