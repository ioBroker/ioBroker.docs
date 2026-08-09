---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.fakeroku/README.md
title: <img src="https://cdn.jsdelivr.net/gh/iobroker-community-adapters/ioBroker.fakeroku@master/admin/fakeroku.svg" width="48" align="top" /> ioBroker.fakeroku
hash: PNfvfuq6BoUvvHXVSfMMQoSibS9YWdZxtbTOVyu0lIs=
---
# <img src="https://cdn.jsdelivr.net/gh/iobroker-community-adapters/ioBroker.fakeroku@master/admin/fakeroku.svg" width="48" align="top" /> ioBroker.fakeroku

![npm-Version](https://img.shields.io/npm/v/iobroker.fakeroku)
![stabil](https://iobroker.live/badges/fakeroku-stable.svg)
![Installationen](https://iobroker.live/badges/fakeroku-installed.svg)
![npm-Downloads](https://img.shields.io/npm/dt/iobroker.fakeroku)
![Knoten](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![Typoskript](https://img.shields.io/badge/TypeScript-strict-blue)
![Lizenz](https://img.shields.io/badge/license-MIT-green)
![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg)

Emuliert ein oder mehrere **Roku-Geräte** in Ihrem LAN, sodass ECP/SSDP-Fernbedienungen – ein Logitech Harmony Hub oder ein Sofabaton X1/X2 – Ereignisse in ioBroker auslösen können. Es ist das **Eingabe-Pendant** zum Logitech Harmony-Adapter: Eine Taste auf der Fernbedienung wird zu einem Datenpunkt in ioBroker.

Anders als beim klassischen Fake-Roku beantwortet diese Version die gesamte Roku-Bedienoberfläche einschließlich `/query/device-info` mit einer **aktuellen** Roku-Version und funktioniert somit über einen klassischen Harmony-Hub hinaus.

Die offizielle Roku-Mobil-App wird nicht unterstützt. Sie steuert Roku-Geräte über den proprietären, undokumentierten ECP-2-WebSocket-Kanal von Roku, den dieser Emulator nicht implementiert. Verwenden Sie stattdessen einen Harmony Hub oder einen Sofabaton – diese unterstützen den klassischen ECP-Kanal, den dieser Adapter bereitstellt.

## Merkmale
- Emuliert ein oder mehrere Roku-Geräte im LAN – das Roku-Steuerungsprotokoll (ECP) über HTTP plus SSDP-Erkennung auf Port 1900.
- Vollständige Roku-Bedienoberfläche inklusive `/query/device-info` bei einer aktuellen Roku-Version, die über die Anforderungen eines klassischen Harmony-Hubs hinausgeht.
- Sauberes Datenmodell pro Gerät: ein `command`-Datenpunkt plus feste `keys.<Key>`-Zustände, die alle im Voraus erstellt werden.
- Mehrere emulierte Rokus von einer einzigen Instanz; Erkennung an die gewählte Netzwerkschnittstelle gebunden; Befehlsverarbeitung auf das LAN beschränkt.

## Anforderungen
- Node.js >= 22
- js-controller >= 7.2.2
- admin >= 7.8.23

## Installation
Installieren Sie den Adapter über die ioBroker-Administration.

## Konfiguration
- **Netzwerkschnittstelle** – die Netzwerkkarte, an die sich die emulierten Roku-Geräte binden und die sie bewerben.

Aktivieren Sie die Option „Alle Schnittstellen“, dann ist der Adapter sofort einsatzbereit – er erkennt die routbare IP-Adresse automatisch. Wählen Sie eine spezifische Adresse nur auf einem Host mit mehreren Netzwerkkarten.

- **Emulierte Roku-Geräte** – als Karten verwaltet: **+ Hinzufügen** öffnet einen Dialog mit einem

**Name**, ein **ECP-Port** (`8060` der echte Roku-Port; ein freier Port ist vorausgewählt, und der Dialog lehnt bereits verwendete Namen oder Ports ab) und ein **Typ**. Sie können mehrere Roku-Geräte mit einer Instanz emulieren – jedes benötigt einen eigenen Port.

- **Typ** — *Player* (Standard) stellt die 16 Standard-Navigations- und Wiedergabetasten bereit;

*TV* stellt zusätzlich Lautstärke-, Ein-/Ausschalter-, Kanal- und Eingangstasten bereit. Wählen Sie *TV* nur dann, wenn Sie diese zusätzlichen Tasten als ioBroker-Trigger benötigen.

Um den emulierten Roku zu einem Harmony-Hub hinzuzufügen, fügen Sie ein "Roku"-Gerät in der Harmony-App hinzu und verweisen Sie es auf den ioBroker-Host.

## Objekte
Für jedes emulierte Roku (`fakeroku.0.<name>`):

| Datenpunkt | Typ | Bedeutung |
|---|---|---|
| `.command` | Zeichenkette, schreibgeschützt | Der letzte Befehl als Klartext (`Home`, `Lit_a`, `launch:12`, `search:news`). Ein Datenpunkt für alles – keine Objekt-pro-Zeichen-Aufblähung. |
| `.keys.<Key>` | Boolescher Wert, schreibgeschützt | Ein Zustand pro Fernbedienungstaste, die vom Gerätetyp bereitgestellt wird – ein *Player* verfügt über die 16 Navigations-/Wiedergabetasten, ein *TV* zusätzlich über Lautstärke*, Ein/Aus, Kanal*, HDMI/AV-Eingänge – alles vordefiniert. Ein Tastendruck pulsiert kurz auf `true`; Tastendruck/-loslassen hält den Zustand aufrecht. |
| `.keys.<Key>` | Boolescher Wert, schreibgeschützt | Ein Zustand pro Fernbedienungstaste, die vom Gerätetyp bereitgestellt wird – ein *Player* verfügt über die 16 Navigations-/Wiedergabetasten, ein *TV* zusätzlich über Lautstärke*, Ein/Aus, Kanal*, HDMI/AV-Eingänge – alles im Voraus definiert. Ein Tastendruck setzt den Zustand kurzzeitig auf „true“; Tastendruck/Tastenloslassen halten ihn aufrecht. |

Freie Tastatureingaben (`Lit_x`) und App-Starts werden nur in `.command` angezeigt – sie erhalten keine eigenen Objekte.

Hinweis: Die Roku-Fernbedienung sendet für Wiedergabe und Pause den **gleichen** `Play`-Befehl, daher können Wiedergabe und Pause hier nicht unterschieden werden – das ist eine Protokollbeschränkung, keine Adapterbeschränkung.

## Verwendung
In einem Skript oder einer Blockly-Regel kann auf einen Tastendruck reagiert werden – z. B. wenn `fakeroku.0.<name>.keys.Play` zu `true` wird, oder `.command` wird auf die letzte Schaltfläche als Text überwacht.

## Geschichte
Fakeroku blickt auf eine lange Tradition auf ioBroker zurück, und diese Version setzt sie fort – für bestehende Nutzer handelt es sich lediglich um eine neue Version desselben Adapters:

**[Pmant](https://github.com/Pmant)** hat Fakeroku im Jahr 2017 entwickelt und das Original erstellt.

Roku-Emulation: SSDP-Erkennung, ECP-Oberfläche und Unterstützung mehrerer Geräte.

- **[Apollon77](https://github.com/Apollon77)** hat die Test- und Build-Tools auf dem neuesten Stand gehalten.

in den folgenden Jahren.

- Die **[ioBroker Community Adapters](https://github.com/iobroker-community-adapters)**

Das Team – insbesondere [mcm1957](https://github.com/mcm1957) und [foxriver76](https://github.com/foxriver76) – pflegte und modernisierte den Adapter von 2023 bis 2026 und veröffentlichte Versionen bis zur Version 0.5.1.

- Ab **0.6.0** wurde der Adapter von [krobi](https://github.com/krobipd) neu geschrieben.

Von Grund auf in TypeScript entwickelt und die vollständige ECP-Oberfläche einschließlich `device-info` hinzugefügt.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.0.0 (2026-08-05)
- (krobipd) First stable release — version 1.0.0 marks the complete rewrite as the mature, supported version of the adapter.
- (krobipd) Upgrading from an older version now shows a one-time notice that the button data points changed from text to real boolean values, so scripts and visualizations can be checked.

### 0.6.0 (2026-08-05)
- (krobipd) Complete rewrite. The adapter now answers the full Roku control surface — including device-info with a current Roku version — so Logitech Harmony and Sofabaton remotes pair and work reliably.
- (krobipd) Works out of the box: it detects the network address to advertise on its own, no manual interface picking.
- (krobipd) Manage multiple emulated Rokus from the admin UI, each as a Player or a TV.
- (krobipd) Cleaner object tree — one datapoint per remote button with the correct types, plus a last-command datapoint; leftover objects from older versions are removed on start.

### 0.5.1 (2026-08-05)
- (mcm1957) Adapter requires Node.js >= 22 now
- (mcm1957) Dependencies have been updated

### 0.5.0 (2026-07-30)
- Complete rewrite with the full Roku control surface, including `device-info` with a current Roku version — the part modern remotes check at pairing, beyond what a classic Harmony hub needs
- New clean data model: a `command` datapoint plus fixed `keys.<Key>` states, all created up front instead of appearing only after the first keypress
- Discovery binds to the chosen network interface, command handling is restricted to the local network

### 0.4.0 (2026-03-07)
- Adapter requires node.js >= 20, admin >= 7.7.22, js-controller >= 6.0.11

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2017-2023 Pmant <patrickmo@gmx.de>  
Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2026 krobi <krobi@power-dreams.com>

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

---

_Developed with assistance from Claude.ai_