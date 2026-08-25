---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.cul/README.md
title: ioBroker.cul
hash: jmRF5YMscwGBaQJSz+/IKr05+JCBED1Py+hhuQa6JFQ=
---
![Logo](../../../en/adapterref/iobroker.cul/admin/busware.jpg)

![Anzahl der Installationen](http://iobroker.live/badges/cul-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.cul.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.cul.svg)

# IoBroker.cul
![Test und Freigabe](https://github.com/ioBroker/ioBroker.cul/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/cul/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

ioBroker-Adapter zur Steuerung von FS20, Max!, HMS und anderen Geräten über [CUL](http://busware.de/tiki-index.php?page=CUL) / [culfw](http://culfw.de). Abhängig von https://github.com/hobbyquaker/cul

## Unterstützte Geräte
- *EM* - EM1000WZ, EMWZ
- *FS20*, inkl. ESA1000/2000
- *HMS* - HMS100-TF, HMS100-T, HMS100-WD, RM100-2, HMS100-TFK, HMS100-MG, HMS100-CO, HMS100-FIT
- *MORITZ* - MAX!
- *WS* - KS300TH, S300TH, WS2000/WS7000

## Anleitung
### Einen Befehl an ein FS20-Gerät senden, z. B. in JavaScript
```sendTo("cul.0", "send", {"protocol":"FS20", "housecode":"A1B2", "address":"01", "command":"00"});```

### Senden eines Rohbefehls (z. B. an ein InterTechno-Gerät) mithilfe von JavaScript
```sendTo("cul.0", "sendraw", {"command": 'is0FFFFF0FFFFF'});```

Diese Befehle verwenden die CUL-Bibliothek dieses Adapters, um die Befehle an ein Gerät zu senden.
JavaScript/Node.js-basierter Adapter `Busware CUL USB / culfw`

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN BEARBEITUNG** -->
### 3.0.1 (2026-08-25)
* (bluefox) Der serielle Port kann jetzt manuell eingegeben werden, sodass ein symbolischer Link unterhalb von `/dev/serial/by-id` verwendet werden kann (#150)
* (bluefox) Die Portliste bietet unter Linux neben den Geräten unter `/dev/ttyUSBx` auch die symbolischen Links `/dev/serial/by-id` an. Diese sind nicht mehr hinter der experimentellen Option versteckt und ersetzen auch nicht mehr die Gerätepfade.

### 3.0.0 (2026-08-25)
* (bluefox) WICHTIG: Der Adapter benötigt jetzt node.js >= 22, js-controller >= 6.0.11 und admin >= 7.0.0.
* (bluefox) Der Adapter wurde in TypeScript neu geschrieben. Die Quelltexte befinden sich in `src/`, der veröffentlichte Code in `build/`.
* (bluefox) Das `cul`-Paket wurde auf Version 1.0.0 aktualisiert. Es verwendet serielle Schnittstelle 13, daher sind für die Installation keine Build-Tools mehr erforderlich.
* (bluefox) WICHTIG: In Version 1.0.0 von `cul` wurden einige Datenpunkte umbenannt: `battery` heißt jetzt `batteryLow`/`batteryState`, `window`/`isopen` heißt jetzt `open` und `valveposition` heißt jetzt `valvePosition`. Die alten Zustände werden nicht mehr gespeichert und können gelöscht werden.
* (bluefox) Die vertauschten Bezeichnungen „Modus“ und „Typ“ im Konfigurationsdialog wurden korrigiert.
* (bluefox) Die Portliste im experimentellen Modus wurde korrigiert: Die Einträge `/dev/serial/by-id` wurden aus einem undefinierten Wert erstellt.
* (bluefox) Der HTML-Konfigurationsdialog und die gulpfile wurden entfernt.
* (bluefox) Der Debug-Treiber, der `lib/rawData.txt` wiedergab, wenn die Umgebungsvariable `DEBUG` gesetzt war, wurde entfernt.

### 2.2.0 (17.04.2023)
* (jpk) Portauswahl anhand der ID statt des Namens als Option
* (bluefox) Aktualisierte Benutzeroberfläche für Administrator 6

### 2.0.2 (11.05.2022)
* WICHTIG: Mindestens Node.js 12.x wird jetzt benötigt!
* (Apollon77/achimmm) Unterstützung für Geräte mit Adresse 0 hinzugefügt
* (bluefox) Aktualisiertes Serialport-Paket

### 1.3.5 (2021-04-12)
* (Apollon77) Stellen Sie sicher, dass cul verbunden ist, bevor Sie Zustandsänderungen akzeptieren (Sentry IOBROKER-CUL-R)

[Ältere Änderungsprotokolle finden Sie dort.](CHANGELOG_OLD.md)

## License

[Licensed under GPLv2](LICENSE) Copyright (c) 2014-2026 hobbyquaker