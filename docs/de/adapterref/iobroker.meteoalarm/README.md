---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.meteoalarm/README.md
title: ioBroker.meteoalarm
hash: kBaShtjPs24XEaIcv6XpFuhXcnngk++euf8elrsCNbI=
---
![Logo](../../../en/adapterref/iobroker.meteoalarm/admin/meteoalarm.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.meteoalarm.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.meteoalarm.svg)
![Anzahl der Installationen](http://iobroker.live/badges/meteoalarm-stable.svg)
![NPM](https://nodei.co/npm/iobroker.meteoalarm.png?downloads=true)

# IoBroker.meteoalarm
**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Dokumentation zum Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

meteoalarm Adapter für ioBroker ---------------------------------------------------------- -------------------------------- Dieser Adapter zieht Wetteralarme von meteoalarm.eu, die Wind, Schnee, Regen einschließen , hohe und niedrige Temperatur usw. Diese Informationen sind in der Landessprache und für detaillierte Regionen verfügbar.

## So verwenden Sie es
Es gibt zwei Möglichkeiten, wie Sie den Link zum Abrufen der Meteoalarm-Informationen abrufen können.

Option 1: Wählen Sie Ihr Land aus, drücken Sie dann auf "Region laden" und wählen Sie dann die Region aus. Die XML wird dann automatisch gefüllt. Drücken Sie einfach auf Speichern und Sie sind bereit.

Option 2: Gehen Sie zu http://meteoalarm.eu und wählen Sie Ihre Region aus. Dann gehen Sie auf das RSS-Symbol oben rechts, machen einen Rechtsklick und kopieren den Link. Dies ist der Link, den Sie bitte zur Einrichtung des Adapters hinzufügen.

![Logo](../../../en/adapterref/iobroker.meteoalarm/screenshot.png)

## Verfügbare Felder
|Feldname|Beschreibung|
|:---:|:---:|
|Letzte Aktualisierung|Datum, an dem der Adapter das letzte Mal Daten empfangen hat|
|Link|Link zum RSS-Feed|
|Standort|Alarmstandort|
|Veröffentlichungsdatum|Veröffentlichungsdatum des Alarms laut Website|
|HTMLToday|HTML-Widget, das Alarme für heute anzeigt|
|Wetterkarte Land|HTML Link zur Wetterkarte des Alarmlandes|
|Heute/Morgen|Diese Datenpunkte sind für heute und morgen verfügbar:|
| Text|Alarmtext in länderspezifischer Sprache|
| Von|Alarm Startdatum|
| Bis|Alarm-Enddatum|
| Typ|Alarmtyp als Zahl|
| TypeText|Alarmtyp als Text|
| Stufe|Alarmstufe als Zahl|
| LevelText|Alarmstufe als Text|
| Farbe|Alarmfarbe für Widgets|
| Symbol|Symbol für Alarmtyp|

## Alarmtypen
|Alarmtyp|Beschreibung|
|:---:|:---:|
|1|Wind|
|2|Schnee/Eis|
|3|Donner & Blitz|
|4|Nebel|
|5|Hohe Temperatur|
|6|Niedrige Temperatur|
|7|Küsten-Event|
|8|Waldbrand|
|9|Lawine|
|10|Regen|
|11|Unbekannt|
|12|Hochwasser|
|13|Regen-Flut|

## Einrichten
"Keine Hintergrundfarbe im HTML-Widget": Möglichkeit, das HTML-Widget ohne Hintergrundfarbe zu verwenden (z. B. wenn Sie das Farbobjekt verwenden möchten, um Ihr gesamtes Widget auszufüllen, nicht nur das HTML-Widget)

"Warnfarben definieren": Möglichkeit, die Farben für die verschiedenen Alarmstufen im HEX-Code zu definieren. Wird für das HTML-Widget und auch für das Farbobjekt verwendet, um es manuell einem anderen Widget zuzuweisen

„Weiße Icons verwenden“: Verwende weiße statt schwarzer Icons

"Keine Symbole im Widget": Verwenden Sie das Symbol nicht im HTML-Widget. Sie können weiterhin in den Objekten darauf zugreifen. Dies ist sinnvoll, wenn Sie das Symbol getrennt vom Widget anzeigen möchten - z.B. in größerer Größe.

## Alarmstufen
|Alarmstufe|Beschreibung|
|:---:|:---:|
|Grün|Im Moment ist keine Warnung verfügbar.|
|Gelb|Das Wetter ist potenziell gefährlich. Die vorhergesagten Wetterphänomene sind nicht ungewöhnlich, aber Aktivitäten, die meteorologischen Risiken ausgesetzt sind, sollte erhöhte Aufmerksamkeit gewidmet werden. Informieren Sie sich über die zu erwartenden meteorologischen Bedingungen und gehen Sie keine vermeidbaren Risiken ein.|
|Orange|Das Wetter ist gefährlich. Ungewöhnliche meteorologische Phänomene wurden vorhergesagt. Schäden und Unfälle sind wahrscheinlich. Seien Sie sehr aufmerksam und vorsichtig und informieren Sie sich über die zu erwartenden meteorologischen Bedingungen. |
|Rot|Das Wetter ist sehr gefährlich. Es wurden ungewöhnlich intensive meteorologische Phänomene vorhergesagt. Extreme Schäden und Unfälle, oft großflächig, bedrohen Leben und Sachwerte. |

##Unterstützte Länder
* Österreich
* Kroatien
* Tschechien
* Finnland
* Deutschland
* Griechenland
* Ungarn
* Irland
* Israel
* Italien
* Lettland
* Litauen
* Malta
* Moldawien
* Montenegro
* Niederlande
* Norwegen
* Polen
* Rumänien
* Serbien
* Slowakei
* Spanien
* Schweiz
* Schweden

Wenn Sie Ihr Land nicht finden, erstellen Sie bitte ein Problem auf github, und ich füge es gerne hinzu

## Nicht mögliche Länder
* Frankreich (kein RSS-Feed verfügbar)
* Portugal (keine Aufteilung möglich)
* Slowenien (kein RSS-Feed verfügbar)

## Zu implementierende Funktionen
* Behandeln Sie mehrere Alarme an einem Tag

## 1.2.0 (2021-05-16)
* (jack-blackson) Neues Setup: "Keine Hintergrundfarbe im HTML-Widget", "Warnfarben definieren" und "Weiße Symbole verwenden"
* (jack-blackson) Neue Icons

## 1.1.11 (2021-05-09)
* (jack-blackson) Paket-Updates

## 1.1.9 (2021-05-07)
* (jack-blackson) Paket-Updates

## 1.1.5 (2021-05-02)
* (jack-blackson) Bugfix JS-Controller 3.3.1 Fehler, Fehlerbehandlung keine Sprache definiert

## 1.1.4 (2021-04-05)
* (jack-blackson) ENOTFOUND-Fehlermeldung behandeln, Sentry hinzugefügt

## 1.1.3 (2021-03-29)
* (jack-blackson) Fehler behebt Adapterchecker

## 1.1.2 (2021-03-29)
* (jack-blackson) Bugfix für nicht funktionierendes Datenupdate, automatische Linkgenerierung aufgrund von CORS-Fehlern entfernt

## 1.1.1 (2020-10-28)
* (jack-blackson) Bugfix HTML-Daten

## 1.1.0 (2020-03-29)
* (jack-blackson) Bugfix Deutschland

## 1.0.9 (2020-02-06)
* (jack-blackson) Bugfix Deutschland

## 1.0.8 (2019-11-15)
* (jack-blackson) Polen, Moldawien, Griechenland, Rumänien hinzugefügt
* (jack-blackson) Neuer Datenpunkt hinzugefügt, um Link zur Wetterkarte zu erhalten

## 1.0.7 (13.11.2019)
* (jack-blackson) Tschechien, Irland, Israel, Litauen, Lettland, Montenegro, Malta, Serbien, Schweden hinzugefügt

## 1.0.6 (2019-10-19)
* (jack-blackson) Schweiz & Slowakei hinzugefügt

## 1.0.5 (2019-09-22)
* (jack-blackson) Kleine Logging-Anpassungen

## 1.0.4 (2019-09-11)
* (jack-blackson) Travis-Fehler

## 1.0.3 (2019-09-09)
* (jack-blackson) Kleine Bugfixes, Änderung von Typ "Deamon" zu "Schedule"

## 1.0.2 (2019-08-25)
* (jack-blackson) Infos zur Veröffentlichung nachbestellt

### 1.0.1 (18.08.2019)
* (jack-blackson) Bugfix kein Alarmsymbol

### 1.0.0 (2019-08-12)
* (jack-blackson) Release-Version

### 0.6.0 (2019-08-05)
* (jack-blackson) Wettersymbole lokal im Adapter speichern

### 0.5.0 (2019-07-21)
* (jack-blackson) Zeitüberschreitungen behandeln
* (jack-blackson) Übersetzungen für alle Sprachen
* (jack-blackson) URL-Prüfungen

### 0.4.0 (2019-07-20)
* (jack-blackson) Daten für NL,NO,HR,FI,ES . hinzugefügt
* (jack-blackson) Type Text hinzugefügt, Type ist jetzt leer wenn Level 1 ist (keine Warnung)
* (jack-blackson) Angepasste Farben

### 0.3.0 (2019-07-13)
* (jack-blackson) HTML-Widget hinzugefügt
* (jack-blackson) Bugfix-Symbol

### 0.2.0 (2019-07-12)
* (jack-blackson) "Morgen"-Daten hinzugefügt

### 0.1.0 (2019-07-11)
* (jack-blackson) erste Version

## Credits
Glocke im Icon von Freepik von www.flaticon.com

## Changelog

## License
The MIT License (MIT)

Copyright (c) 2019-2021 jack-blackson <blacksonj7@gmail.com>

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