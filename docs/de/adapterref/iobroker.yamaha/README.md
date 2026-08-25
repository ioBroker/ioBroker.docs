---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.yamaha/README.md
title: <img src="https://cdn.jsdelivr.net/gh/iobroker-community-adapters/ioBroker.yamaha@master/admin/yamaha.svg" width="48" align="top" /> ioBroker.yamaha
hash: +YtGbtXS8CaTUQ5dtzvxBO6kEZY+AWsc+vnYjGT3q4I=
---
# <img src="https://cdn.jsdelivr.net/gh/iobroker-community-adapters/ioBroker.yamaha@master/admin/yamaha.svg" width="48" align="top" /> ioBroker.yamaha

![npm-Version](https://img.shields.io/npm/v/iobroker.yamaha)
![stabil](https://iobroker.live/badges/yamaha-stable.svg)
![Installationen](https://iobroker.live/badges/yamaha-installed.svg)
![npm-Downloads](https://img.shields.io/npm/dt/iobroker.yamaha)
![Knoten](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![Typoskript](https://img.shields.io/badge/TypeScript-strict-blue)
![Lizenz](https://img.shields.io/badge/license-MIT-green)
![Ko-fi](https://img.shields.io/badge/Ko--fi-Support%20me-ff5e5b?logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg)

Steuert AV-Receiver und MusicCast-Geräte von ioBroker über das lokale Netzwerk. Es vereint die drei von Yamaha unterstützten Protokolle – YNCA (das textbasierte Steuerungsprotokoll der vernetzten Receiver), MusicCast/Yamaha Extended Control (das umfangreichere JSON-Protokoll der MusicCast-Generation) und das ältere XML-Protokoll der ältesten Modelle vor 2010 – in einer einzigen Objektstruktur.

## Merkmale
- **Drei Protokolle, ein Adapter** – YNCA, MusicCast (Yamaha Extended Control) und das ältere XML-Protokoll der Modelle vor 2010
- **Protokolle laufen parallel** – ein MusicCast-Empfänger kombiniert die YNCA-Verstärkersteuerung mit MusicCast Multiroom, Equalizer und Medien in einem Objektbaum.
- **Sofortige Aktualisierungen** – MusicCast überträgt seine Änderungen, YNCA meldet dies über seine Live-Verbindung.
- **Selbstheilende Verbindungen** – ein Offline-Empfänger verbindet sich, sobald er antwortet; ein einzelnes Protokoll verbindet sich selbstständig wieder, während die anderen weiterlaufen.
- **Typisierte Datenpunkte** – Boolesche Werte, Dropdown-Listen und Zahlen mit Einheit und Bereich anstelle von reinem Text
- **Voreinstellungen und Favoriten** – Tuner-Voreinstellungen und gespeicherte Netzwerk-/USB-Favoriten anhand der Nummer aufrufen, Voreinstellungen durchblättern und die gespeicherten Listen mit ihren Namen anzeigen (MusicCast); zuletzt abgespielte Titel auf MusicCast-Geräten abrufen
- **Uhr- und Weckeransicht** – MusicCast-Tisch-Audiogeräte zeigen ihre Uhr- und Weckereinstellungen an
- **Fähigkeitsgesteuert** – Zustände werden aus den Meldungen der einzelnen Geräte generiert, keine fest codierte Modellliste
- **Automatische Erkennung** – eine leere Geräteliste findet und richtet MusicCast-Geräte beim Start automatisch ein.
- **Geräteverwaltung** — Empfänger als Administratorkarten mit Modell-, Adress-, Protokollanzeige und einem Symbol für den Gerätetyp (Empfänger, Stereoanlage, Lautsprecher, Soundbar, CD-Player)

## Anforderungen
- Node.js >= 22
- js-controller >= 7.2.2
- admin >= 7.8.23

## Anschlüsse
- **UDP 41100 (Listening)** — MusicCast-Geräte senden ihre Änderungsereignisse an diesen Port auf dem ioBroker-Host.
- **UDP 1900 (Multicast, ausgehend)** — die SSDP-Erkennungssuche beim Start.
- **TCP 50000 (ausgehend)** — die YNCA-Steuerverbindung zu jedem Empfänger.
- **TCP 80 (ausgehend)** — die MusicCast- und XML-Protokollanfragen an jedes Gerät.

## Konfiguration
Geräte werden in der Administration als Karten verwaltet. **Lassen Sie die Liste leer**, dann findet der Adapter MusicCast-Geräte im Netzwerk beim Start automatisch. Alternativ können Sie Geräte per IP-Adresse über das **"+"-Dialogfeld** hinzufügen, um nur diese zu verwenden. Die Suche durchsucht standardmäßig alle Netzwerkschnittstellen; mit der optionalen **Netzwerkschnittstellenauswahl** kann sie auf eine beschränkt werden.

Ältere Yamaha-Receiver (vor ca. 2010, XML-Protokoll) melden sich nicht automatisch im Netzwerk an und müssen manuell hinzugefügt werden. Das **XML-Abfrageintervall** legt fest, wie oft sie abgefragt werden (Standard: 60 Sekunden).

Im Abschnitt **Datenpunkte** lassen sich ganze Gruppen von Datenpunkten aktivieren oder deaktivieren – **Wiedergabe**, **Tuner**, **Multiroom**, **HDMI**, **Szenen**, **Ton**, **Erweitert** und **Uhr & Wecker**. Eine deaktivierte Gruppe wird aus der Baumstruktur entfernt und nicht mehr abgefragt, was den Startvorgang beschleunigt. Die Verstärkerfunktionen (Ein/Aus, Lautstärke, Stummschaltung, Eingang, Klangprogramm, Standby) bleiben stets aktiv.

## Staatsbaum
Jeder Empfänger wird zu einem Geräteknoten mit thematischen Gruppen – denselben Gruppen, die die **Datenpunkte**-Schalter steuern. Es werden nur die von Ihrem Gerät gemeldeten Daten erstellt.

- **Verstärkerkern** (immer eingeschaltet) — Ein-/Ausschalten, Lautstärke, Stummschaltung, Eingang, Klangprogramm, Schlafmodus sowie Geräteinformationen mit Modell, Firmware und Verbindung.
- **`player`** — ein Kanal pro Wiedergabequelle (Spotify, USB, Server, Internetradio, CD, …) mit Wiedergabestatus, Interpret, Album, Titel, Coverbild und den Transporttasten.
- **`tuner`** — AM/FM- und DAB-Radio inklusive RDS-Texten und Frequenz.
- **`multiroom`** — Zonen 2–4, Zone B, die All-Zones-Schalter (Master Power, Party-Modus) und die MusicCast-Gerätegruppe in ihrem eigenen Ordner `multiroom.group`.
- **`hdmi`** — die HDMI-Ausgänge und die Lippensynchronisation.
- **`scene`** — die Szenennamen des Empfängers und ein Szenenrückruf.
- **`Sound`** — Klang- und Tonbearbeitung: Bass/Höhen, DSP-Modi, Enhancer, Equalizer, ….
- **`erweitert`** — Datenpunkte auf Setup-Ebene: maximale/anfängliche Lautstärke, Lautsprecherkonfiguration, Eingangsnamen.
- **`clock`** — die Uhr- und Weckereinstellungen von MusicCast-Tisch-Audiogeräten (schreibgeschützt).

## Fehlerbehebung
### Upgrade von Version 0.5.x
Version 1.0.0 ist eine vollständige Neuentwicklung. Beim ersten Start nach dem Update werden die alten Datenpunkte (`volume`, `power`, `Commands.*`, `Realtime.*`, …) entfernt und Ihr Receiver als Gerät neu angelegt; seine IP-Adresse wird automatisch übernommen. Richten Sie Skripte und Visualisierungen auf die neuen Pfade aus – beispielsweise auf `yamaha.0.<device>.power` anstatt auf `yamaha.0.power`.

### Empfänger wird nicht automatisch gefunden
Nur MusicCast-Geräte melden sich im Netzwerk automatisch an – ältere Receiver müssen manuell über das **"+"-Dialogfeld** hinzugefügt werden. Falls die Suche auf einem Host mit mehreren Netzwerkschnittstellen fehlschlägt, überprüfen Sie die **Netzwerkschnittstellen**-Einstellung.

### Es fehlen Datenpunkte
Überprüfen Sie die Gruppeneinstellung in den **Datenpunkten**-Einstellungen und beachten Sie, dass die Baumstruktur nur die von Ihrem Gerät gemeldeten Daten enthält. Zonendatenpunkte befinden sich unter `multiroom`, nicht auf der obersten Ebene.

### Werte werden langsam aktualisiert
Wenn MusicCast die Änderungen nur alle paar Minuten aktualisiert, belegt eine andere Anwendung den UDP-Port 41100, und der Adapter ist auf Polling zurückgefallen – dies wird im Startprotokoll vermerkt.

### Der erste Start dauert eine Weile
Beim ersten Verbindungsaufbau fragt der Adapter den Empfänger, welche Funktionen er unterstützt – dies kann bis zu einer halben Minute pro YNCA-Gerät dauern. Das Ergebnis wird gespeichert, zukünftige Verbindungen erfolgen schneller.

## Geschichte
Der Yamaha-Adapter hat eine lange Tradition bei ioBroker, und diese Version setzt diese fort – für bestehende Benutzer handelt es sich einfach um eine neue Version desselben Adapters:

- **[soef](https://github.com/soef)** hat den Adapter im Jahr 2015 entwickelt und gebaut.

Originale Kontrolle über Yamahas XML-Netzwerkprotokoll mit Echtzeit-Statusaktualisierungen und Unterstützung mehrerer Zonen.

- **[Garfonso](https://github.com/Garfonso)**, **[Sneak-L8](https://github.com/Sneak-L8)**

und **[Apollon77](https://github.com/Apollon77)** leisteten in den folgenden Jahren Beiträge zur Administratorkompatibilität, Fehlerbehebungen und Sentry-Absturzberichterstattung.

- Die **[ioBroker Community Adapters](https://github.com/iobroker-community-adapters)**

Das Team – insbesondere [foxriver76](https://github.com/foxriver76) und [mcm1957](https://github.com/mcm1957) – pflegte den Adapter von 2020 bis 2026 und veröffentlichte Versionen bis einschließlich 0.5.4.

Seit 2026 pflegt [krobi](https://github.com/krobipd) den Adapter in der Community.

Die Organisation wurde von Grund auf neu aufgebaut, wobei die Protokolle YNCA, MusicCast (YXC) und ältere XML-Protokolle in einem einzigen Objektbaum vereint wurden.

## Unterstützung
- [ioBroker Forum](https://forum.iobroker.net/)
- [GitHub-Probleme](https://github.com/iobroker-community-adapters/ioBroker.yamaha/issues)

### Unterstützung der Entwicklungsabteilung
Dieser Adapter ist kostenlos und Open Source. Wenn er Ihnen nützlich ist, würde ich mich über eine kleine Spende freuen:

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.2.0 (2026-08-25)

- (krobipd) Fixed: volume writes work again — a written -38 dB reached the receiver as -3.8 dB, so most values were ignored; all numeric controls now send the proper wire format (#612)
- (krobipd) Fixed: the FM frequency datapoint now shows MHz (it was mislabelled kHz) and accepts direct frequency writes in the form the tuner expects.
- (krobipd) New: preset selection — recall tuner presets by number with up/down stepping, and recall stored network or USB favourites per source on YNCA receivers (#613)
- (krobipd) New: MusicCast selection lists — stored favourites and tuner presets with names, a recently-played list with recall by number, and the device's own allowed values as dropdowns.
- (krobipd) New: more device detail — CD track and drive info, DAB and RDS station data, and a read-only clock and alarm view with its own datapoint group switch in the admin settings.

### 1.1.1 (2026-08-22)

- (krobipd) Changed: Internal cleanup. No user-facing changes.

### 1.1.0 (2026-08-22)

- (krobipd) Fixed: a device carried over from the old adapter is no longer called by its IP — the object folder and the admin card now show the name the device reports, or its model.
- (krobipd) Improved: a device that has not reported a model yet already carries its device-class symbol instead of none.

### 1.0.1 (2026-08-22)

- (krobipd) Complete rebuild: one adapter now speaks YNCA, MusicCast and the legacy XML protocol — every protocol a device answers runs in parallel on one object tree.
- (krobipd) New object tree with typed datapoints built from what your device reports. Old datapoints are removed automatically, the address is carried over — point scripts at the new paths.
- (krobipd) Instant updates: MusicCast push events and the live YNCA connection replace polling; connections heal themselves, and one protocol's hiccup reconnects just that protocol.
- (krobipd) Auto-discovery sets up MusicCast devices by itself when the device list is empty, and the admin shows every receiver as a card with model, address and protocol indicators.
- (krobipd) Whole datapoint groups such as playback sources, tuner, multiroom or scenes can be switched off in the admin — and are then not even queried from the device.
- (krobipd) The multiroom folder tells the scope at a glance: switches that affect all zones say so in their name, and the MusicCast device group has its own `multiroom.group` folder.
- (krobipd) Every device shows a type icon — receiver, stereo receiver, speaker, soundbar or CD system, detected from the reported model — in the object tree and on its admin card; the adapter logo now stays readable in light and dark mode.
- (krobipd) Upgrading from 0.5.x shows a one-time notice explaining the new object tree before the update installs.
- (mcm1957) version has been rebuilt due to deploy problems

### 0.5.4 (2024-06-14) — stable

- (foxriver76) updated packages

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2015-2024 soef <soef@gmx.net>  
Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
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