---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.wireless-mbus/README.md
title: ioBroker.wireless-mbus
hash: pVmHXIrFw/pfk7p7SHdAgL1Wjq4QZsO9qIKgBGk65/w=
---
![Logo](../../../en/adapterref/iobroker.wireless-mbus/admin/wireless-mbus.png)

![Installierte Anzahl](https://iobroker.live/badges/wireless-mbus-installed.svg)
![stabile Version](https://iobroker.live/badges/wireless-mbus-stable.svg)

# IoBroker.wireless-mbus
Dieser Adapter ermöglicht den Empfang von drahtlosen M-Bus-Daten von unterstützten Empfängern. Der Umfang der Geräteimplementierung variiert, aber wMBus-Modi können für alle aufgelisteten Geräte konfiguriert werden.

* Embit WMB-Module
* Amber Wireless AMB8465 (**Achtung:** Befehlsmodus (UART_CMD_Out_Enable) ist aktiviert!)
* IMST iM871A
* CUL

Der WMBUS-Stack wurde vom FHEM-Projekt "gemeldet" und wurde umfassend repariert und umgestaltet. Die Tests wurden mit Rohdaten aus dem Internet, OMS-Beispieldaten und einigen Testdaten aus der jmbus-Bibliothek durchgeführt. Einige Grenzfälle sind noch ungetestet.

Die Geräteerstellung, -aktualisierung usw. basiert hauptsächlich auf dem M-Bus-Adapter von Apollon77 (siehe unten).

Wenn der Adapter verschlüsselte Telegramme empfängt, sollte die Registerkarte AES-Schlüsselkonfiguration die Geräte-ID automatisch auflisten.

Wenn der Parser fehlschlägt, werden die Rohdaten des Telegramms im Zustand info.rawdata gespeichert.

*Achtung:* Der Amber-Empfänger scheint nach einiger Zeit (oder Anzahl empfangener Nachrichten) im C-Modus abzustürzen? Hardwarefehler?

##Links:
* [WMBus Stack-Modul](https://github.com/mhop/fhem-mirror/blob/master/fhem/FHEM/WMBus.pm)
* [ioBroker.mbus](https://github.com/Apollon77/ioBroker.mbus)
* [Ursprünglicher WMBUS-Stack: wm-bus](https://github.com/soef/wm-bus)
* [M-Bus-Protokoll](http://www.m-bus.com/files/MBDOC48.PDF)
* [OMS-Spezifikationen](https://oms-group.org/en/download4all/oms-specification/)

## Ersteinrichtung
Die Ersteinrichtung erfordert die Konfiguration der Grundlagen (Hardwareverbindung zum wmbus) und die Einrichtung von AES-Schlüsseln für alle zu sammelnden verschlüsselten wmbus-Knoten. Der schwierigste Teil sind die AES-Schlüssel.

### Grundeinstellung
Dies erfordert die Auswahl des geeigneten USB-Geräts und der richtigen Baudrate (**normalerweise** für IMST: 57600 Baud; Amber: 9600 Baud; Embit: 9600 Baud). Die meisten Messgeräte senden im „T-Modus“.

### Andere Optionen
* **Ungeänderte Zustände aktualisieren**: Beim Eintreffen eines Telegramms werden alle Zustände aktualisiert, auch wenn sich ihr Wert nicht geändert hat. (Standard ein)
* **Cache für Compact-Frames-Unterstützung**: Zur Unterstützung von Compact-Telegrammen (wird von einigen (Kamstrup?) Geräten verwendet) wird die Struktur aller empfangenen Telegramme zwischengespeichert. Dies bedeutet in der Regel nur einen Cache-Eintrag pro Gerät. Wenn Sie kein Gerät haben, das kompakte Telegramme sendet, können Sie es deaktivieren, um etwas Leistung und Speicherplatz zu sparen. (Standard: aus)
* **Energieeinheiten in kWh umwandeln**: Alle Energieeinheiten (Wh und J) werden in kWh umgerechnet. (Standard: aus)
* **Gerät nach aufeinanderfolgenden Fehlern vorübergehend blockieren**: Wenn 10 aufeinanderfolgende Telegramme desselben Geräts nicht erfolgreich geparst werden, wird das Gerät bis zum Neustart des Adapters ignoriert (Standard: Ein)

### AES-Schlüssel
Die Gerätekennung ist eine Kombination aus dem Herstellercode und der Geräte-ID (z. B. AAA-12345678). Der Schlüssel kann entweder als Klartextschlüssel mit 16 Zeichen oder als Hex-String mit 32 Zeichen (16 Bytes) eingegeben werden.

Der einfachste Weg, die Schlüssel einzurichten, besteht darin, den Adapter ohne Schlüsseleinrichtung zu starten und auf ein verschlüsseltes Telegramm zu warten, wonach vom Adapter ein Eintrag mit "UNBEKANNTER" Schlüssel generiert wird. Anschließend können Sie den entsprechenden Schlüssel ausfüllen und die Einstellungen speichern. Wenn Sie Geräte sehen, die Sie nicht kennen oder die Sie einfach loswerden möchten (z. B. Geräte von Nachbarn), können Sie diese im Tab Gesperrte Geräte eintragen.

## Machen
* Senden von Telegrammen für S-Mode-Empfänger?

## 0.8.10
* (ChL) Kompakten Frame-Cache unabhängig vom Herstellercode verwenden

## 0.8.9
* (ChL) Anzeige von Nicht-Standardeinstellungen auf der Admin-Seite korrigiert

## 0.8.8
* (ChL) Datetime Type I Handling hinzugefügt

### 0.8.7
* (ChL) Leicht verbesserte Handhabung von LVAR DIF-Werten

### 0.8.3 / 0.8.4 / 0.8.5 / 0.8.6
* (ChL) Entwicklerabhängigkeiten aktualisieren - Achtung CI-Test wird <= NodeJS 12 nicht mehr unterstützen
* (ChL) Geringfügige Protokollierungsänderungen

### 0.8.2
* (ChL) C-Modus-Unterstützung für CUL

### 0.8.1
* (ChL) Verbindungsstatus korrigieren
* (ChL) Serielle Protokollierung wieder hinzugefügt

### 0.8.0
* (ChL) Vollständige Überarbeitung der seriellen Kommunikation - enthält jetzt einheitengetestete Geräteklassen
* (ChL) Upgrade auf SerialPort 10.x und Bereinigung von Abhängigkeiten
* (ChL) PRIOS-Decoder verbessern

### 0.7.9
* (ChL) Debug-Protokollierung für alle seriellen Geräte hinzugefügt

### 0.7.8
* (ChL) Logging von Empfängermodulen verbessern
* (ChL) Rohdatenstatus korrigieren

### 0.7.7
* (ChL) Unterstützung für Diehl PRIOS-codierte Telegramme hinzugefügt (portiert von wmbusmeters)

### 0.7.5 / 0.7.6
* (ChL) Timeout-Behandlung behoben - wenn keine Probleme auftreten, wird dies als 1.0.0 neu veröffentlicht

### 0.7.3 / 0.7.4
* (ChL) Versuchen Sie, die CUL-Unterstützung zu verbessern

### 0.7.1 / 0.7.2
* (ChL) Umbenennung in ioBroker.wireless-mbus, um in npm veröffentlichen zu können
* (ChL) Sperrliste, Logo der Admin-Seite und Repo-URL in package.json korrigiert

### 0.7.0
* (ChL) Ändern Sie den Hauptadaptercode in Klasse
* (ChL) Enthält neben Englisch und Deutsch auch aktuelle (Maschinen-)Übersetzungen
* (ChL) Upgrade-Abhängigkeiten
* (ChL) Test für wmbus-Decoder hinzugefügt
* (ChL) Integrationstests hinzufügen
* (ChL) Github-Workflow hinzugefügt

### 0.6.2
* (ChL) Verbessern Sie die Admin-Seite, um den benutzerdefinierten Serialport-Pfad zu handhaben
* (ChL) Option hinzugefügt, um das automatische Blockieren von Geräten auszuschalten
* (ChL) "Simple Hexstring"-Empfänger zu Testzwecken hinzugefügt
* (ChL) Internes Refactoring

### 0.6.0 / 0.6.1
* (ChL) Upgrade der Serialport-Bibliothek auf 9.2.0
* (ChL) experimentelle CUL-Unterstützung

### 0.5.2
* (ChL) Fix für Verbindungsanzeige mit js-controller 2.x

### 0.5.1
* (ChL) Kleine Korrekturen
* (ChL) Interner Telegrammparser unterstützt jetzt kabelgebundene M-Bus-Frames (nicht verwendet - für Test-/Entwicklungszwecke)
* (D Glaser) Zeitstempel der letzten Aktualisierung zur Geräteinfo hinzugefügt
* (D Glaser/ChL) Setup-Dokumentation zu README hinzugefügt

### 0.5.0
* (ChL) Basisunterstützung für Techem-Geräte
* (ChL) Option Energieeinheiten (Wh und J) auf kWh zu zwingen - ACHTUNG dies ist nicht wirklich abwärtskompatibel. Alte Zustände behalten ihre "alte" Einheit, zeigen aber den angepassten Wert an!

### 0.4.7
* (ChL) Blockiert Geräte nach 10 aufeinanderfolgenden fehlgeschlagenen Parsing-Versuchen bis zum Neustart des Adapters
* (ChL) Von Einheiten abgeleitete Rollen zuweisen (wie beim mbus-Adapter)

### 0.4.6
* (ChL) Unterstützung für (Kamstrup?) Kompaktframes durch Datensatz-Cache (vordefinierte Frames wurden entfernt!)

### 0.4.5
* (ChL) Geräte-IDs mit dem Schlüssel "UNKNOWN" beim Start an den Needskey anhängen

### 0.4.2 / 0.4.3 / 0.4.4
* (ChL) Kleine Korrekturen

### 0.4.1
* (ChL) grundlegende IMST iM871A-Unterstützung

### 0.4.0
* (ChL) bessere Amber-Stick-Unterstützung
* (ChL) Kompaktmodus?
* (ChL) Schönere Staatsnamen
* (ChL) wMBus-Modus teilweise wählbar

### 0.3.0
* (ChL) Alle VIF-Typen aus MBus-Dokument implementiert
* (ChL) VIF-Erweiterungen werden (wieder) besser gehandhabt
* (ChL) VIF-Info neu organisiert
* (ChL) Reorganisation der Empfängerhandhabung
* (ChL) Sperrung von Geräten möglich

### 0.2.0 (nicht markiert)
* (ChL) Drastisch verbesserter Parser: Unterstützung für Sicherheitsmodus 7, Rahmentyp B, viele kleine Korrekturen
* (ChL) VIF-Erweiterungen werden besser gehandhabt, aber die korrekte Handhabung ist noch nicht ganz klar
* (ChL) CRCs werden geprüft und entfernt, falls noch vorhanden
* (ChL) Rohdaten werden gespeichert, wenn der Parser fehlschlägt

### 0.1.0
* (ChL) Erstveröffentlichung

## Changelog

## License

Copyright (c) 2019 ISFH - Institute for Solar Energy Research www.isfh.de
Copyright (c) 2021 Christian Landvogt

Licensed under GPLv2. See [LICENSE](LICENSE) and [NOTICE](NOTICE)