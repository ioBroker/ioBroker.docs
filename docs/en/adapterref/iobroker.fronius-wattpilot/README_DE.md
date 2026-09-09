---
chapters: {"pages":{"en/adapterref/iobroker.fronius-wattpilot/README.md":{"title":{"en":"ioBroker.fronius-wattpilot"},"content":"en/adapterref/iobroker.fronius-wattpilot/README.md"},"en/adapterref/iobroker.fronius-wattpilot/README_DE.md":{"title":{"en":"ioBroker.fronius-wattpilot"},"content":"en/adapterref/iobroker.fronius-wattpilot/README_DE.md"}}}
---
![Logo](admin/fronius-wattpilot.png)
# ioBroker.fronius-wattpilot

[![NPM version](https://img.shields.io/npm/v/iobroker.fronius-wattpilot.svg)](https://www.npmjs.com/package/iobroker.fronius-wattpilot)
[![Downloads](https://img.shields.io/npm/dm/iobroker.fronius-wattpilot.svg)](https://www.npmjs.com/package/iobroker.fronius-wattpilot)
![Number of Installations](https://iobroker.live/badges/fronius-wattpilot-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/fronius-wattpilot-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.fronius-wattpilot.png?downloads=true)](https://nodei.co/npm/iobroker.fronius-wattpilot/)

**Tests:** ![Test and Release](https://github.com/tim2zg/ioBroker.fronius-wattpilot/workflows/Test%20and%20Release/badge.svg)

[To the english version of the README](/#/docs/adapterref/iobroker.fronius-wattpilot/README_DE.md)

## Was ist dieser Adapter?

Dieser Adapter integriert Ihren Fronius Wattpilot EV-Ladegerät mit ioBroker und ermöglicht es Ihnen, Ihre Ladestation zu überwachen und zu steuern. Der Wattpilot ist eine intelligente Ladelösung für Elektrofahrzeuge, die in Ihr Smart-Home-System integriert werden kann.

**🌟 Hauptfunktionen:**
- Echtzeitüberwachung des Ladestatus
- Fernsteuerung der Ladeparameter
- Unterstützung für Cloud- und lokale Verbindungen

## Installation und Einrichtung

### Voraussetzungen

Vor der Installation des Adapters müssen Sie Ihren Wattpilot einrichten:

1. **Wattpilot-Einrichtung abschließen**: Beenden Sie die Ersteinrichtung mit der offiziellen Fronius Wattpilot App und **merken Sie sich Ihr Passwort**
2. **Mit WiFi verbinden**: Gehen Sie in der App zum "Internet"-Tab und verbinden Sie Ihren Wattpilot mit Ihrem WiFi-Netzwerk
3. **IP-Adresse finden**: Sie benötigen die IP-Adresse Ihres Wattpilot mit einer dieser Methoden:
- **Router-Methode**: Prüfen Sie die Weboberfläche Ihres Routers für verbundene Geräte
- **App-Methode**: Tippen Sie in der Wattpilot App nach der Verbindung auf den WiFi-Namen. Sie sehen dann die Netzwerkdetails einschließlich der IP-Adresse

> 💡 **Wichtig**: Es wird dringend empfohlen, eine statische IP-Adresse für Ihren Wattpilot in den Router-Einstellungen zu vergeben, um Verbindungsprobleme zu vermeiden.

### Adapter-Installation

1. Installieren Sie den Adapter von der ioBroker "Adapter"-Seite
2. Erstellen Sie eine neue Instanz des fronius-wattpilot Adapters
3. In der Instanzkonfiguration:
- Geben Sie die **IP-Adresse** Ihres Wattpilot ein
- Geben Sie Ihr Wattpilot **Passwort** ein
- Konfigurieren Sie andere Einstellungen nach Bedarf
4. Speichern Sie die Konfiguration

Wenn alles korrekt konfiguriert ist, wird sich der Adapter verbinden und beginnen, Datenpunkte zu erstellen.

## Wie Sie den Adapter verwenden

### Daten lesen

Der Adapter erstellt automatisch Datenpunkte für alle Wattpilot-Werte. Sie können diese wie alle anderen Datenpunkte in ioBroker verwenden für:
- Visualisierung in VIS oder anderen Frontends
- Logik in Skripten und Blockly
- Automatisierungsregeln

**Datenmodi:**
- **Nur Schlüsselpunkte** (Standard): Zeigt nur die wichtigsten Werte
- **Alle Werte**: Deaktivieren Sie die Option "Nur Schlüsselpunkte", um alle verfügbaren API-Daten zu sehen

📖 Vollständige API-Dokumentation: [Wattpilot API-Dokumentation](https://github.com/joscha82/wattpilot/blob/main/API.md) (Dank an joscha82)

### Steuerung Ihres Wattpilot

#### Direkte Zustandssteuerung (NEU!)

Sie können jetzt wichtige Wattpilot-Funktionen direkt steuern, indem Sie in die Zustände schreiben.

#### Erweiterte Steuerung über set_state

Für erweiterte Steuerung verwenden Sie den `set_state` Datenpunkt mit diesem Format:
```
zustandsName;wert
```

**Verfügbare Zustände:**
- **amp**: `6-16` (Ladestrom in Ampere)
- **cae**: `true` oder `false` (⚠️ deaktiviert Cloud-Funktionalität - kann Neustart erfordern)

**Beispiele:**
```
amp;10          // Ladestrom auf 10A setzen
```

## Beispiele und Anwendungsfälle

### Solar-Integrations-Beispiel

Schauen Sie sich unser [Blockly-Beispiel](https://github.com/tim2zg/ioBroker.fronius-wattpilot/blob/main/examples/example-Blockly.xml) an, das zeigt, wie Sie:
- Ihre Solarstromerzeugung überwachen
- Den Wattpilot-Ladestrom automatisch basierend auf überschüssiger Solarenergie anpassen

**So verwenden Sie das Beispiel:**
1. Kopieren Sie den Inhalt aus der Beispieldatei
2. Klicken Sie in ioBroker Blockly auf das "Blöcke importieren"-Symbol (obere rechte Ecke)
3. Fügen Sie den Inhalt ein und passen Sie ihn an Ihr Setup an

### Häufige Automatisierungen

- **Zeitbasiertes Laden**: Laden während Schwachlastzeiten starten
- **Solar-Überschuss-Laden**: Nur laden, wenn überschüssige Solarenergie verfügbar ist
- **Anwesenheitserkennung**: Laden basierend auf Auto-Anwesenheit starten/stoppen
- **Lastausgleich**: Ladestrom basierend auf Haushalts-Stromverbrauch anpassen

## Technische Details

Der Adapter verbindet sich mit der WebSocket-Schnittstelle des Wattpilot und konvertiert eingehende Daten in ioBroker-Datenpunkte. Er unterstützt sowohl lokale WiFi-Verbindungen als auch Cloud-basierte Verbindungen.

**Verbindungstypen:**
- **Lokales WiFi** (empfohlen): Direkte Verbindung zu Ihrem Wattpilot
- **Cloud**: Verbindung über Fronius Cloud-Services

## Fehlerbehebung

**Häufige Probleme:**
- **Verbindung fehlgeschlagen**: Prüfen Sie IP-Adresse und Passwort
- **Häufige Verbindungsabbrüche**: Weisen Sie Ihrem Wattpilot eine statische IP zu
- **Fehlende Datenpunkte**: Versuchen Sie den "Alle Werte"-Modus zu aktivieren
- **Cloud-Verbindungsprobleme**: Überprüfen Sie die `cae`-Einstellung

**⚠️ Haftungsausschluss:** Dieser Adapter verwendet inoffizielle APIs. Verwenden Sie ihn auf eigene Gefahr und seien Sie vorsichtig beim Ändern von Einstellungen, die den Betrieb Ihres Geräts beeinträchtigen könnten.

## Entwickler

- [SebastianHanz](https://github.com/SebastianHanz)
- [tim2zg](https://github.com/tim2zg)
- [derHaubi](https://github.com/derHaubi)

## Changelog

<!--
    Platzhalter für die nächste Version (am Anfang der Zeile):
    ### **WORK IN PROGRESS**
-->

### 4.7.0 (2025-06-19)
- Neuschreibung des Adapters
- Hinzugefügte Möglichkeit, Zustände direkt zu setzen
- Hinzugefügte Möglichkeit, allgemeine Zustände direkt zu setzen
- Alle Probleme behoben

### 4.6.3 (2023-12-24)
- Einen Fehler behoben, bei dem der Adapter eine undefinierte Variable verwenden würde
- Fehler #44 behoben
- Fehler #43 behoben

### 4.6.2 (2023-08-15)
- Dank an Norb1204 für die Behebung einiger Fehler, die ich übersehen hatte. Mehr in Issue #40

### 4.6.1 (2023-08-15)
- Issue #39 behoben (set_state funktioniert nicht)

### 4.6.0 (2023-07-15)
- Timeout-Problem im normalen Parser-Modus behoben (#36), existiert noch im dynamischen Parser-Modus --> verwenden Sie kein Timeout (0)
- Eine Reihe von Problemen bezüglich des statischen Parser-Modus behoben
- Verbesserungen der Lebensqualität --> Sie können jetzt die allgemeinen Zustände direkt setzen! (set_power, set_mode) sind aus Kompatibilitätsgründen und für den dynamischen Parser-Modus weiterhin verfügbar

### 4.5.1 (2023-03-02)
- Problem #29 behoben (benutzerdefinierte Zustände funktionieren nicht)

### 4.5.0 (2023-02-19)
- Zufällige Log-Nachrichten behoben
- Einen Typkonflikt beim set_state Zustand behoben
- Commits sollten ab sofort signiert sein

### 4.4.0 (2023-02-16)
- Bekannte Zustände werden jetzt aktualisiert, auch wenn der dynamische Parser aktiviert ist

### 4.3.0 (2023-01-14)
- Abhängigkeits-Updates
- Zustands-Updates

### 4.2.1 (2023-01-05)
- Fehler im Alle-Werte-Modus / Parser behoben

### 4.2.0 (2023-01-01)
- Einige QoL-Verbesserungen

### 4.1.0 (2022-12-30)
- Möglichkeit hinzugefügt, Zustände manuell über die Instanz-Einstellungen hinzuzufügen
- Den Fehler behoben, bei dem der Adapter nicht die korrekten Werttypen setzte
- Einige Verbesserungen der Lebensqualität hinzugefügt

### 4.0.0 (2022-11-30)
- Timing-Problem behoben
- set_power und set_mode Zustände hinzugefügt

### 3.3.1 (2022-11-17)
- Einen Fehler behoben, bei dem set_state nicht beschreibbar war

### 3.3.0 (2022-11-17)
- Einen Fehler behoben, bei dem der Adapter nicht die korrekten Labels für die Zustände setzte
- Performance-Verbesserungen
- Abhängigkeiten behoben

### 3.2.5 (2022-10-14)
- Kleine Änderungen an package.json und io-package.json

### 3.2.4 (2022-10-11)
- Abkühlungszeittimer für normale Werte behoben

### 3.2.3 (2022-10-08)
- Fehler behoben, bei dem der Adapter den Timeout-Timer nicht respektierte und ständig versuchen würde, sich mit dem WattPilot zu verbinden
- Fehler behoben, bei dem der Adapter eine falsche Trennnachricht an den WattPilot senden würde

### 3.2.2 (2022-10-06)
- Wiederverbindungsfrequenz behoben
- Mehrere WebSocket-Verbindungen behoben
- Frequenz-Handler hinzugefügt

### 3.2.1 (2022-10-02)
- Wiederverbindung zum WebSocket behoben
- Code umstrukturiert

### 3.2.0 (2022-09-29)
- Wiederverbindung implementiert
- Code verkleinert

### 3.1.0 (2022-09-07)
- Option hinzugefügt, die Cloud als Datenquelle zu verwenden
- GitHub-Workflows aktualisiert

### 3.0.0 (2022-09-04)
- README.md aktualisiert
- "Beispiele"-Verzeichnis für Beispielanwendungen erstellt
- Einige Übersetzungen hinzugefügt
- Checkbox "Parser" zu etwas Intuitiverem umbenannt
- #4 behoben: Datenpunkt "map" wird jetzt korrekt erstellt
- #5 behoben: Passwort-Zeichen sind nicht mehr sichtbar
- Typkonflikt von cableType behoben

### 2.2.4 (2022-09-01)
- SebastianHanz behob unendlichen RAM-Verbrauch
- etwas Beschreibung hinzugefügt

### 2.2.3 (2022-08-30)
- SebastianHanz behob Typ-Konflikte. Vielen Dank!

### 2.2.2 (2022-08-25)
- Fehlerbehebungen

### 2.2.1 (2022-08-22)
- Fehlerbehebungen

### 2.2.0 (2022-08-21)
- Fehler behoben

### 2.1.0 (2022-08-19)
- Min Node Version 16

### 2.0.3 (2022-07-20)
- Readme aktualisiert

### 2.0.2 (2022-07-12)
- Fehler behoben

### 2.0.1 (2022-07-10)
- Eine Installationsanleitung hinzugefügt. Nicht zu detailliert, da derzeit nicht im stabilen Repository.

### 2.0.0 (2022-07-10)
- NPM-Versionen hoffentlich behoben

### 1.1.0 (2022-07-10)
- UselessPV und TimeStamp Parser hinzugefügt, einige Tests durchgeführt.

### 1.0.1 (2022-06-02)
- Tests

### 1.0.0 (2022-06-02)
- Einige Änderungen vorgenommen
- Einige weitere Änderungen vorgenommen

### 0.0.5 (2020-01-01)
- Besserer Code

### 0.0.4 (2020-01-01)
- Parser-Option hinzugefügt

### 0.0.3 (2020-01-01)
- Parser hinzugefügt

### 0.0.2 (2020-01-01)
- Fehler behoben

### 0.0.1 (2020-01-01)
- Erste Veröffentlichung

## Lizenz
MIT Lizenz

Copyright (c) 2024 tim2zg <tim2zg@protonmail.com>

Hiermit wird unentgeltlich jeder Person, die eine Kopie der Software und der zugehörigen Dokumentationen (die "Software") erhält, die Erlaubnis erteilt, sie uneingeschränkt zu nutzen, inklusive und ohne Ausnahme mit dem Recht, sie zu verwenden, zu kopieren, zu modifizieren, zu fusionieren, zu publizieren, zu verbreiten, zu unterlizenzieren und/oder zu verkaufen, und Personen, denen diese Software überlassen wird, diese Rechte zu verschaffen, unter den folgenden Bedingungen:

Der obige Urheberrechtsvermerk und dieser Erlaubnisvermerk sind in allen Kopien oder Teilkopien der Software beizulegen.

DIE SOFTWARE WIRD OHNE JEDE AUSDRÜCKLICHE ODER IMPLIZIERTE GARANTIE BEREITGESTELLT, EINSCHLIESSLICH DER GARANTIE ZUR BENUTZUNG FÜR DEN VORGESEHENEN ODER EINEN BESTIMMTEN ZWECK SOWIE JEGLICHER RECHTSVERLETZUNG, JEDOCH NICHT DARAUF BESCHRÄNKT. IN KEINEM FALL SIND DIE AUTOREN ODER COPYRIGHTINHABER FÜR JEGLICHEN SCHADEN ODER SONSTIGE ANSPRÜCHE HAFTBAR ZU MACHEN, OB INFOLGE DER ERFÜLLUNG EINES VERTRAGES, EINES DELIKTES ODER ANDERS IM ZUSAMMENHANG MIT DER SOFTWARE ODER SONSTIGER VERWENDUNG DER SOFTWARE ENTSTANDEN.