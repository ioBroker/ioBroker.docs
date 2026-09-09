---
chapters: {"pages":{"en/adapterref/iobroker.weather-warnings/README.md":{"title":{"en":"ioBroker.weather-warnings"},"content":"en/adapterref/iobroker.weather-warnings/README.md"},"en/adapterref/iobroker.weather-warnings/README_DE.md":{"title":{"en":"ioBroker.weather-warnings"},"content":"en/adapterref/iobroker.weather-warnings/README_DE.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.weather-warnings/README_DE.md
title: ioBroker.weather-warnings
hash: BGj8r30EunOisXNV1kUH2UUefjh0lJtCRiIqxL9WvgU=
---
![Logo](../../../en/adapterref/iobroker.weather-warnings/admin/weather-warnings.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.weather-warnings.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.weather-warnings.svg)
![Anzahl der Installationen](https://iobroker.live/badges/weather-warnings-installed.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/weather-warnings/287x66-grey.png)
![NPM](https://nodei.co/npm/iobroker.weather-warnings.png?downloads=true)
![Test und Freigabe](https://github.com/ticaki/ioBroker.weather-warnings/actions/workflows/test-and-release.yml/badge.svg?event=push)
![PayPal-Spende](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)

# ioBroker.weather-warnings

## Wetterwarnungsadapter für ioBroker

Dieser Adapter ruft Wetterwarnungen verschiedener optionaler Dienste ab und gibt diese als Textnachricht oder Sprachnachrichten aus. Zusätzlich werden nach Typ gruppierte Staaten bereitgestellt, mit denen man auf aktuelle Warnlagen reagieren kann.

Anbieter:

- DWD
- ZAMG (Österreich)
- UWZ

## Installation

Min. Nodejs: v22 Nach der Installation und dem automatischen Öffnen der Konfigurationsseite diese **nochmals neu laden** . Damit werden die Vorlagen in der Systemsprache angezeigt.

## Konfiguration

![Basiskonfiguration](../../../en/adapterref/iobroker.weather-warnings/img/basic.png)

- **DWD/UWZ/ZAMG aktivieren:** Aktiviere den Datenabruf von diesen Dienstleistern

- **telegram/pushover,... aktivieren:** Aktiviere die Ausgabe von Nachrichten an diesen installierten Adapter.

- **email aktivieren:** Schreibt alle aktuellen Warnungen in eine E-Mail.

- **Verlauf aktivieren:** schreibt in den Zustand: .history einen Verlauf der bis zu 500 Einträge beinhalten kann. Alle Daten oder ausgewählt.

- **json-array aktivieren:** sehr speziel, schreibt die aktuellen Warnungen in einem Array oder nach Aktivierung ein benutzerdefiniertes Json in einem Array, das von Skripten ausgewertet werden kann.

- **Aktualisierungsintervall:** Abrufintervall in Minuten, zu dem die Daten geladen werden. (Minimum: 5)

- **Anzahl der Warnungen** Das ist die maximale Anzahl an Warnungen, die pro Provider verarbeitet werden.

- **Eingehende Warnungen ...:** Nach dem Adapterstart werden, die beim ersten Datenabruf Warnungen erhalten, als bekannt angesehen und lösen keine Benachrichtigungen aus.

- **Testwarnungen aktivieren! Adapter ist offline:** Es werden mindestens 2 Testmeldungen pro Provider bei einem Datenabruf in das System gegeben, mit zufälligen Stand- und Endzeiten

- **Die Speicherung der Rohdatenhistorie wird aktiviert bzw. deaktiviert und gelöscht (hoher Speicherverbrauch).:** Für Debugging, nur nach Aufforderung.

- **Intervall verkürzt, Testdaten aktiviert und deaktiviert:** Geänderte Funktion: Intervall wird auf 1 Minute gestellt. Im ersten Durchlauf werden 2 neue Warnungen gefunden. Im zweiten wird die Hälfte aufgehoben. Im letzten werden alle aufgehoben und dann gehts wieder von vorne los.

**Zusätzliche Einstellungen(Experte)**

**Spracheinstellungen:**

**Ruhezeiten für die Sprachausgabe:** Stelle hier die Ruhezeiten ein, die in der keine Sprachausgabe stattfinden soll. Zeiten werden als 15:30 oder 15 oder 15:00 definiert. Bitte einen Profilnamen vergeben

**Iconeinstellungen (Alternativ):** Wenn der Prefix ausgefüllt wird, wird dieses die Standardicons gesetzt. Dort wo der Prefix hinführt müssen Dateien mit einem der gelisteten Warntypen und der Endung die im Suffix steht.

![Vorlagen](../../../en/adapterref/iobroker.weather-warnings/img/template.png)

Hier können Sie eigene Vorlagen erstellen, oder anpassen. Unterhalb der Tabelle stehen alle verfügbaren „Tokens“ und was sie bedeuten. Die eindeutige Kennung(Vorlagenbezeichner) wird in den Pushdiensten verwendet, um festzulegen, welche Vorlage mit welcher Meldungsart verwendet werden soll.

Zeichen mit besonderer Bedeutung:

- `${}` Umfasst Token, die durch generierte Informationen ersetzt werden. Der Vorlagenbezeichner kann hier ebenfalls eingesetzt werden.
- Vorlagenbezeichner die mit`_` beginnen, werden bei Diensten nicht angeboten, jedoch werden diese in Staaten geschrieben.
- `${[0,1,2,3,4]token}` Eine Zeichenkette mit Werten, Token muss ein Zahlentoken sein. Index ist wie im Beispiel. 0 ist der erste Wert in der Liste
- bei einer Vorlage für Jsons muss das abschließende sein`}` so geschrieben werden`\}`
- siehe Beispiele im Adapter.
- Es ist auch sowas möglich:`${[0,🟢,🟡,🟠,🔴]warnlevelnumber}`

Ein Beispiel:

```
Luke, wir haben eine neue Warnung ${Warntypename} ab ${starttime} erhalten, sieht aus wie ein ${_customArray}
```

Das Warntypename wird zB durch`Gewitter` ersetzt.`startime` durch 20:15 und`_customArray` durch das Ergebnis der entsprechenden Vorlage.

**Vorlagen wiederherstellen:** Setzt die Vorlagen auf die aktuelle Systemsprache zurück. Vorhandene Vorlagen gehen **verloren** . Anschließend speichern & schließen. Sollte ebenfalls verwendet werden, wenn die Systemsprache geändert wurde.

**Add Templates** fügt die Standardvorlagen hinzu, solange die eindeutige Kennung nicht verwendet wird.

![DWD](../../../en/adapterref/iobroker.weather-warnings/img/DWD.png)

**DWD:** Die Auswahl erfolgt nach einer Liste von 10000 Orten, bis ein Bug im Admin behoben ist, am besten den Ortsnamen schreiben, mehrere Leerzeichen anfügen und dann wieder entfernen. Jetzt sollte die Liste richtig gefilter sein.

**UWZ:** Eingabe erfolgt über Koordinaten, die ID wird vom Adapter selbst ermittelt.

**ZAMG:** Nur für Österreich. Eingabe von Koordinaten die in Österreich liegen.

**Ortsname:** benutzerdefinierte Ortsbezeichnung, kann in Warnungen verwendet werden. (Nützlich bei mehreren Warnzellen)

**Filter:**

- Filter Stunden: Filtert vor jeder weiteren Auswertung alles aus dem X Stunden in der Zukunft liegt.
- Typ: Alles mit diesem Typ wird verworfen.
- Level: Alles kleiner als dieses Level wird verworfen.

![Telegramm](../../../en/adapterref/iobroker.weather-warnings/img/telegram.png) **Adapter:** Wenn diese Möglichkeit aktiviert wurde und es ein Adapterfeld gibt, muss dort eine gültige Auswahl getroffen werden. Eine Fehlermeldung im Log weist auf fehlende Einstellungen hin.

**Aktivieren Sie ...:** Versende Warnungen von diesem Anbieter mit diesem Dienst.

**Filter:**

1. Ignorieren Sie Warnungen mit diesem Typ
2. Ignorieren Sie Warnungen mit einem gleichen oder geringeren Level

**Nachrichten:** verwendet folgende Vorlagen für:

1. Neue Warnungen oder bestehende Warnungen
2. Eine Warnung wurde entfernt und es gibt **noch** weitere Aktive.
3. Warnungen wurden entfernt und es gibt **keine** weiteren Aktiven. Wird keine Vorlage ausgewählt, wird nicht versendet.

**Manuell**

1. Auswahl einer Vorlage, die für bestehende Warnungen verwendet werden soll
2. Auswahl einer Vorlage, die für keine Warnung verwendet werden soll

Wird keine Vorlage ausgewählt, wird nicht versendet.

Vorlagen für 3) können keine ${} Tokens enthalten, da für diese Nachricht mehrere Warnungen in Frage kommen.

**Besondere Merkmale**

**email:** Header wird vor die Mail gestellt, dann kommt wiederholt: 1,2 oder 3 + Zeilenumbruch und anschließend Footer.(weitere Funktionen in Arbeit)

**alexa:** Zusätzlich muss hier noch ein/mehrere Geräte ausgewählt werden. Die Lautstärke wird nur für die Sprachnachrichten verändert und sollte anschließend wieder zurückgesetzt werden. Nachrichtengröße pro Warnung beträgt maximal 250 Zeichen.

\###Datenpunkte:

**warning** : Enthält die Rohdaten, die vom Provider geliefert werden, nur der Stundenfilter hat hierauf **formatiert Keys** : Enthält die in Vorlagen verwendbaren Tokens und deren aktuellen Wert. **Warnungen** : Die Benachrichtigungsdatenpunkte siehe unten **Befehl** : Datenpunkte mit denen etwas ausgelöst oder eingestellt werden kann.

## Allgemeines Verhalten

- Es dürfen keine doppelten Nachrichten für ein und dasselbe Anliegen versendet werden. DWD legt diesbezüglich großen Wert.
- Wenn`none` Wenn diese Vorlage ausgewählt ist, werden keine Benachrichtigungen dafür versendet.
- Staaten unter`.alerts` Enthalten nach Warntypen guppierte Felder für Start, Ende, Warntyp, **jetzt** aktiv und Schlagzeile. Angezeigt wird 1 Warnung pro Gruppe, gefiltert nach folgenden Kriterien:
  1. Warnung ist **jetzt** aktiv, die mit dem höchsten Level.

## Symbole

Schöpfer: [Adri Ansyah](https://www.youtube.com/channel/UChLOv1L-ftAFc2ZizdEAKgw?view_as=subscriber)

Lizenz: [CC BY 4.0 Rechtscode](https://creativecommons.org/licenses/by/4.0/legalcode)

Iconpage: <https://icon-icons.com/de/symbol/Wetter-wind-cloud-Blitz-Regen/189105>