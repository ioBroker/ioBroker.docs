---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.opendtu/README.md
title: ioBroker.opendtu
hash: alLXbwYFsoM6loMs4wtm8WG7PEhiR+WLYwwf3XsM8wg=
---
![Logo](../../../en/adapterref/iobroker.opendtu/admin/opendtu.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.opendtu.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.opendtu.svg)
![Anzahl der Installationen](https://iobroker.live/badges/opendtu-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/opendtu-stable.svg)
![NPM](https://nodei.co/npm/iobroker.opendtu.png?downloads=true)

# IoBroker.opendtu
**Tests:** ![Testen und Freigeben](https://github.com/o0shojo0o/ioBroker.opendtu/workflows/Test%20and%20Release/badge.svg) [![CodeQL](https://github.com/o0shojo0o/ioBroker.opendtu/actions/workflows/codeql.yml/badge.svg)](https://github.com/o0shojo0o/ioBroker.opendtu/actions/workflows/codeql.yml)

## OpenDTU-Adapter für ioBroker
Über diesen Adapter werden die Datenpunkte aus dem Projekt [OpenDTU](https://github.com/tbnobody/OpenDTU) in Echtzeit zur Verfügung gestellt.

Zusätzlich können über den Adapter folgende Datenpunkte zur Leistungsbegrenzung des OpenDTU genutzt werden.

```
- opendtu.0.xxxxxx.power_control.limit_nonpersistent_absolute
- opendtu.0.xxxxxx.power_control.limit_nonpersistent_relative
- opendtu.0.xxxxxx.power_control.limit_persistent_absolute
- opendtu.0.xxxxxx.power_control.limit_persistent_relative
```

Weitere Informationen zu den Datenpunkten erhalten Sie in deren Beschreibung oder indem Sie auf [Hier](https://github.com/tbnobody/OpenDTU/blob/master/docs/MQTT_Topics.md#inverter-limit-specific-topics) klicken.

## Credits
Dieser Adapter wäre ohne die großartige Arbeit von @o0Shojo0o (https://github.com/o0Shojo0o) nicht möglich gewesen, der frühere Versionen dieses Adapters entwickelt hat.

## So melden Sie Probleme und Funktionsanfragen
Verwenden Sie hierfür idealerweise GitHub-Probleme. Die beste Methode erreichen Sie, indem Sie den Adapter in den Debug-Protokollmodus versetzen (Instanzen -> Expertenmodus -> Spaltenprotokollebene). Rufen Sie dann die Protokolldatei über das ioBroker-Unterverzeichnis „log“ von der Festplatte ab, **nicht** über Admin, da dies Zeilen abschneiden würde.

## Konfiguration
1. Erstellen Sie eine neue Instanz des Adapters
2. Geben Sie Sicherheit *(Standard http)*, IP-Adresse und Port *(Standard 80)* der [OpenDTU](https://github.com/tbnobody/OpenDTU)-Hardware ein
3. Legen Sie das WebUI-Passwort fest **(dieses ist obligatorisch, wenn es falsch ist, kann kein Limit festgelegt werden!)**
4. Speichern Sie die Einstellungen

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (mattreim) Description has benn translated into supported languages.
- (mattreim) Admin-UI has been adapted for some display sizes.

### 3.0.1 (2024-10-26)
- (simatec) Admin-UI has been adapted for small displays.
- (mcm1957) Dependencies have been updated.

### 3.0.0 (2024-10-19)
- (mcm1957) Adapter has been moved to iobroker-community-adapter organisation.
- (mcm1957) Adapter requires js-controller 5, admin 6 and node.js 20 now.
- (mcm1957) Dependencies have been updated.

### 2.1.0 (2024-10-11)

- (o0shojo0o) update dependencies
- (mattreim) support small screens
- (mattreim) update translations
- (mattreim) update object names
- (mattreim) add variable polling intervall [1-59s]

### 2.0.0 (2024-08-13)

- (o0shojo0o) changes for new websocket structure ([#129](https://github.com/o0shojo0o/ioBroker.opendtu/issues/129))
- (o0shojo0o) `Efficiency`, `YieldTotal`, `YieldDay` and `DC Power` moved from the AC section to the INV (old data points must be removed manually)
- (mattreim) update to current OpenDTU logo ([#156](https://github.com/o0shojo0o/ioBroker.opendtu/issues/156))
- (mattreim) update dependencies ([#162](https://github.com/o0shojo0o/ioBroker.opendtu/issues/162)), ([#179](https://github.com/o0shojo0o/ioBroker.opendtu/issues/179))
- (mattreim) fix GUI translation ([#163](https://github.com/o0shojo0o/ioBroker.opendtu/issues/163))

### 1.0.1 (2023-10-29)

- (o0shojo0o) fixed `power_control.current_limit_absolute" has value "-1" less than min "0"`

## License
MIT License

Copyright (c) 2024 Dennis Rathjen <dennis.rathjen@outlook.de>

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