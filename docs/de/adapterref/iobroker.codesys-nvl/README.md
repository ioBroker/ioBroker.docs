---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.codesys-nvl/README.md
title: ioBroker.codesys-nvl
hash: 54MRaFUT64/G9p29rijarj9N0rmrGTjQlqw0Suxdz4Y=
---
![Logo](../../../en/adapterref/iobroker.codesys-nvl/admin/codesys-nvl.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.codesys-nvl.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.codesys-nvl.svg)
![Anzahl der Installationen](https://iobroker.live/badges/codesys-nvl-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/codesys-nvl-stable.svg)
![NPM](https://nodei.co/npm/iobroker.codesys-nvl.png?downloads=true)

# ioBroker.codesys-nvl

**Tests:**![Test und Freigabe](https://github.com/Bannsaenger/ioBroker.codesys-nvl/workflows/Test%20and%20Release/badge.svg)

## codesys-nvl-Adapter für ioBroker

Senden und Empfangen von Netzwerkvariablenlisten (NVL) von einer CODESYS®-gesteuerten SPS

## Referenzen

CODESYS® ist eine eingetragene Marke der [CODESYS GmbH, einem Mitglied der CODESYS-Gruppe.](https://www.codesys.com)

Das Logo stammt von der CODESYS-Homepage.

EN 61131 ist eine europäische Norm, die auf der internationalen Norm IEC 61131-3 basiert. [(Wikipedia)](https://en.wikipedia.org/wiki/IEC_61131-3)

Der Datenhelfer stammt aus [jisotalo/iec-61131-3](https://github.com/jisotalo/iec-61131-3)

Die Verarbeitung von Telegram-Nachrichten (Parsing und Erstellung) sowie der Umgang mit der Variablenstruktur stammen von [Hopperpop](https://github.com/Hopperpop) und seinem Projekt [node-red-contrib-nvl.](https://github.com/Hopperpop/node-red-contrib-nvl)

## Zweck

Einfacher Adapter zum Senden und Empfangen von Daten an und von einer CODESYS®-gesteuerten SPS über NVL-Listen. Diese Listen können im CODESYS-Editor bearbeitet und exportiert werden.

## Dokumentation

### Erste Schritte

Zuerst muss im CODESYS-Editor eine NVL-Datei erstellt werden. Aktuell werden nur unkomprimierte Listen unterstützt. Überschreitet die Liste 256 Byte, werden die Daten in mehreren Telegrammen übertragen. Dies wird derzeit nicht unterstützt.

### Erstellen einer GVL-Datei

Zuerst exportieren Sie die NVL-Liste im Editor und speichern sie als GVL-Datei, z. B. **myfirstlist.gvl.** Sie sieht dann so aus:

```
<GVL>
  <Declarations><![CDATA[{attribute 'qualified_only'}
VAR_GLOBAL
	Watchdog: BOOL;
	Input1: BOOL;
	Input2: BOOL;
END_VAR]]></Declarations>
  <NetvarSettings Protocol="UDP">
    <ListIdentifier>1</ListIdentifier>
    <Pack>True</Pack>
    <Checksum>False</Checksum>
    <Acknowledge>False</Acknowledge>
    <CyclicTransmission>True</CyclicTransmission>
    <TransmissionOnChange>True</TransmissionOnChange>
    <TransmissionOnEvent>False</TransmissionOnEvent>
    <Interval>T#10s</Interval>
    <MinGap>T#20ms</MinGap>
    <EventVariable>
    </EventVariable>
  </NetvarSettings>
</GVL>
```

### Platzieren Sie die Datei in ioBroker und konfigurieren Sie sie.

Anschließend muss die Datei im Reiter **„Dateien“** unter **codesys-nvl.0** oder Ihrer jeweiligen Instanznummer abgelegt werden. Nach einem Neustart des Adapters erscheint die Datei in der Verwaltungsoberfläche im Reiter **„Netzwerkvariablenlisten“** .

Hier können Sie den Listentyp auf **Senden** , **Empfangen** oder **Deaktivieren** einstellen.

### Verwendung

Beim Start erstellt der Adapter für jede Liste eine Datenbank. Der Pfad zur Liste lautet beispielsweise:

```
codesys-nvl.0.nvl.1
```

Unter **„Konfiguration“** finden Sie die importierten GVL-Inhalte. Der **Info-** Kanal liefert Informationen über den Verbindungsstatus und die Aktualität der Daten.

Unter **var** finden Sie die Variablennamen als channel und im channel den **Typ** und den **Wert** .

In einer **Sendeliste** können Sie die Werte in der Datenbank festlegen, um die Daten an die SPS zu übertragen. Auf der anderen Seite sehen Sie die empfangenen Werte aus einer **Empfangsliste** .

## Aufgaben

- Behebung des Problems mit der Unterstützung für lange NVLs
- Unterstützung für komprimierte NVLs hinzufügen

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.0.6 (2026-08-31)
- (Bannsaenger) fixed last errors from code review

### 0.0.5 (2026-08-25)
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.
- (Bannsaenger) fixed errors from code review for check in to latest repository

### 0.0.4 (2026-07-08)
- (Bannsaenger) fixed errors from code review for check in to latest repository

### 0.0.3 (2026-06-16)
- (Bannsaenger) fixed errors for check in to repository

### 0.0.2 (2026-05-15)
- (Bannsaenger) add initial documentation

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2024 - 2026 Bannsaenger <bannsaenger@gmx.de>

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