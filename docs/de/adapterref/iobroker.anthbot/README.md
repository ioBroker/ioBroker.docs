---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.anthbot/README.md
title: ioBroker.anthbot
hash: SwYpZPcC840gzUPpAXKSivOI+frOEwdSz3T6u8ukaig=
---
![Logo](../../../en/adapterref/iobroker.anthbot/admin/anthbot.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.anthbot.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.anthbot.svg)
![Anzahl der Installationen](https://iobroker.live/badges/anthbot-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/anthbot-stable.svg)
![NPM](https://nodei.co/npm/iobroker.anthbot.png?downloads=true)
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.anthbot/workflows/Test%20and%20Release/badge.svg)

# ioBroker.anthbot

## Anthbot-Adapter für ioBroker

Verbinden Sie sich mit [Anthbot](https://anthbot.com/) -Geräten wie beispielsweise deren Mährobotern.

Getestet mit M9- und Genie-Modellen, andere Serien könnten aber auch funktionieren. Melden Sie Probleme oder Funktionswünsche gerne über ein Ticket.

Nach der Installation rufen Sie die Seite mit den Instanzeinstellungen auf, um die Zugangsdaten für die Anthbot-Cloud hinzuzufügen. Der Adapter überwacht und steuert alle verbundenen Geräte, die er im Konto erkennt. Es gibt hier noch weitere Konfigurationsoptionen, die Standardwerte sollten jedoch einwandfrei funktionieren.

Der Adapter kann versuchen, die Zeitplanung der Anthbot-App zu verbessern. Standardmäßig geschieht nichts, diese Funktion kann jedoch durch Festlegen von Planungsstatus unter aktiviert werden. `map.custom_areas...` nach dem Starten des Adapters (siehe unten).

### Globale Überwachung

Unter dem Gerät `status` Ordner:

Der Batteriestand wird angezeigt in der `elec` Zustand.

Den Status eines Geräts in der `mode` Status (Laden, Mähen, Standby usw.).

Die letzte Statusmeldung und ihre Schwere (Ereignis, Fehler usw.) werden angezeigt in der `last_code`, `last_code_text` Und `last_code_type` Staaten. Für Nutzer, die mehr über die Geschichte erfahren möchten, die `code_list` Der Status enthält ein JSON-Array mit einer größeren Anzahl von Nachrichten.

Die übrigen Zustände in diesem Ordner sollten selbsterklärend sein.

Unter dem Gerät `iob_schedule` Ordner:

Selbsterklärend, aber beachten Sie, dass es sich hierbei um den Status der Adapterplanung handelt, _nicht um_ in der Anthbot-App definierte Zeitpläne.

### Globale Befehle

Unter dem `command` Ordner:

`stop_all_tasks` entspricht dem Tippen auf „Stop“ in der Anthbot-App.

`charge_start` entspricht dem Symbol „Aufladen“ in der Anthbot-App.

`mow_start` entspricht dem Start im Modus „Vollständige Karten“.

`custom_area_mow_start` Dies entspricht dem Modus „Benutzerdefinierte Bereiche“ (auch „Zonen“ genannt). Damit dies funktioniert, muss bereits eine gültige Liste von Bereichs-IDs festgelegt sein. `area_list` Bereichs-IDs sind nicht identisch mit den Namen, die die Anthbot-App anzeigt. Gültige Bereichs-IDs finden Sie als Kanal-IDs unter dem entsprechenden Eintrag. `map.custom_areas...` Ordner. Für jeden Bereich existiert eine Kanal-ID; Einzelheiten zu den darin enthaltenen Staaten finden Sie weiter unten.

D.h. mit dem Mähen einer oder mehrerer Zonen beginnen:

- Stellen Sie die `area_list` Zustand in ein Array von IDs umwandeln. Beispiel: `[102, 117]`
- Löse die `custom_area_mow_start` Zustand.

Der Adapter versucht zu erkennen, wann das Zonenmähen im Gange ist, und vermerkt dies im entsprechenden System. `map.custom_areas...` Kanal der Start- und Endzeiten, um zu verstehen, wie oft Zonen geschnitten werden.

`ridable_mow_start` entspricht dem Kantenmähmodus. Wie bei `custom_area_mow_start`, setze die `area_list` mit einer gültigen Liste von IDs für befahrbare Bereiche (auch Randbereiche genannt). Gültige IDs für befahrbare Bereiche finden Sie in der `map.ridable_areas.raw` Zustand.

### Überwachung und Steuerung von benutzerdefinierten Bereichen (auch Zonen genannt).

Unter jedem `map.custom_areas...` Kanal:

#### Überwachung

`last_start`, `last_finish`, `estimated_elapsed_time` &`estimated_elec` Diese Angaben dienen der Planung. Die Zustände werden beim Mähen von Aufgaben festgelegt, die den jeweiligen benutzerdefinierten Bereich betreffen und dort beginnen und enden.

Beachten Sie, dass `estimated_elapsed_time` &`estimated_elec` Die Berechnung ist nur möglich, wenn eine Aufgabe mit einem einzigen benutzerdefinierten Bereich abgeschlossen ist. Wird eine Aufgabe mit mehreren Bereichen begonnen, erhalten alle Bereiche dieselbe Start- und Endzeit, und es wird keine Schätzung der verstrichenen Zeit vorgenommen.

#### Befehle

`custom_area_mow_start` Mit dieser Schaltfläche kann als Kurzbefehl das Mähen nur dieses einen Bereichs ausgelöst werden.

`mow_head_random` Wenn der Schalter aktiviert ist, wird die Reihenfolge zufällig festgelegt. `mow_head` (auch Schnittwinkel genannt) für diesen Bereich. Er wird jedes Mal neu festgelegt, wenn dieser Schalter eingeschaltet wird und jedes Mal, wenn ein Mähvorgang in diesem Bereich erfolgreich abgeschlossen wurde.

`mow_head_alts` ist eine Reihe von Alternativen `mow_head` Winkel, die nach jedem erfolgreichen Mähvorgang in diesem Bereich durchlaufen werden. Wenn die Liste festgelegt ist, falls der aktuelle `mow_head` Wenn dieser Bereich nicht in der Liste enthalten ist, wird er auf den ersten Eintrag gesetzt. Um diese Funktion zu deaktivieren, legen Sie ein leeres Array fest (`[]`) oder leere Zeichenkette.

Beachten Sie, dass `mow_head_random` hat Vorrang vor `mow_head_alts` Die

#### Terminplanung

`schedule_enabled` Diese Funktion dient dazu, das von ioBroker initiierte Mähen dieses Bereichs zu aktivieren. Obwohl dies in Verbindung mit dem Anthbot-Zeitplan funktionieren _sollte_ , empfiehlt es sich, alle Anthbot-Zeitpläne vor der Verwendung dieser Funktion zu löschen oder zu deaktivieren.

Beachten Sie, dass für die Aktivierung des geplanten Mähens einer Fläche Folgendes gilt:

- `schedule_enabled` muss eingeschaltet sein
- `schedule_days_since_last` &`schedule_priority` Beide müssen mit gültigen Zahlen eingestellt sein.
- Das Gebiet muss über eine gültige `last_finish` Zustand

Um den letzten Punkt zu erreichen, ist es am besten, das 'Zonenmähen' in der Anthbot-App manuell zu starten oder zu planen und diese Aufgabe abschließen zu lassen, während dieser Adapter läuft.

`schedule_days_since_last` Dient zur Bestimmung des Mähzeitpunkts für jede Fläche. Die Anzahl der Tage, die zwischen den Mähvorgängen gewartet werden soll. Null bedeutet tägliches Mähen.

`schedule_priority` Diese Regel kommt zum Tragen, wenn mehrere Bereiche gemäht werden müssen: Der Bereich mit der niedrigsten Nummer (mindestens 1) wird zuerst gemäht. Wenn zwei Bereiche mit der gleichen Priorität gemäht werden müssen, ist die Reihenfolge nicht festgelegt.

### Karten- und Gebietsbearbeitung (auch Zonenbearbeitung)

Mit `area_set` Es ist möglich, einen oder mehrere Bereiche zu bearbeiten. Nehmen Sie die JSON-Darstellung eines gewünschten Eintrags aus dem `map.custom_areas.raw_list` Ändern Sie es nach Bedarf und speichern Sie es. `area_set` Status als JSON-Array.

Beachten Sie, dass bei der Verwendung `area_set` Es ist nicht notwendig, alle Parameter zu definieren; nur die angegebenen werden geändert. Beispiel: `[{"mow_head":10,"id":117}]` wird den Mähwinkel im Bereich 117 auf 10 Grad ändern und die anderen Parameter unverändert lassen.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.1 (2026-09-23)

- (raintonr) Sanitise configured intervals at startup (#63)

### 0.2.0 (2026-08-04)

- (raintonr) Few general code clean-ups
- (raintonr) Some constants are now configurable
- (raintonr) Schedule 'impossible to mow in a day' custom areas when several days overdue

### 0.1.2 (2026-07-16)

- (raintonr) Added device WiFi & 4G status

### 0.1.1 (2026-07-05)

- (raintonr) Clean up sanitized (sic) IDs in favour of warning & ignoring
- (raintonr) Clean up redacted logging of API traffic
- (raintonr) Clean up polling timer & add status.last_poll

### 0.1.0 (2026-07-03)

- (mcm1957) BREAKING: object ids are now sanitized. This might result in changed object-ids.
- (mcm1957) Translations have been corrected.
- (mcm1957) Loggings has been adapted to avoid logging secrets.

## License

MIT License

Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2026 Robin Rainton <robin@rainton.com>

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