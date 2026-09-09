---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ebus/README.md
title: ioBroker.ebus
hash: RYTAE/euay/O+nj0qsz90/v9NnoupLautlQcL4dLxbU=
---
![Logo](../../../en/adapterref/iobroker.ebus/admin/ebus.png)

![Anzahl der Installationen](http://iobroker.live/badges/ebus-stable.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ebus.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.ebus.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/rg-engineering/ioBroker.ebus/badge.svg)
![GitHub Actions](https://github.com/rg-engineering/ioBroker.ebus/workflows/Test%20and%20Release/badge.svg)
![NPM](https://nodei.co/npm/iobroker.ebus.png?downloads=true)
![node-lts](https://img.shields.io/node/v-lts/iobroker.ebus?style=flat-square)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.ebus?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/rg-engineering/ioBroker.ebus?style=flat-square)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/rg-engineering/ioBroker.ebus?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/rg-engineering/ioBroker.ebus?logo=github&style=flat-square)
![Letzter Commit auf GitHub](https://img.shields.io/github/last-commit/rg-engineering/ioBroker.ebus?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/rg-engineering/ioBroker.ebus?logo=github&style=flat-square)

# ioBroker.ebus

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

**Wenn es Ihnen gefällt, erwägen Sie bitte eine Spende:**

[![PayPal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC)

Dieser Adapter liest

- Daten von ebusd über HTML: In diesem Fall muss ebusd ausgeführt werden und Daten beispielsweise an den Explorer über [http://IP:Port/Daten](http://IP:port/data) ( [z. B. http://192.168.0.123:8889/data](http://192.168.0.123:8889/data) ) senden können. Die aktuelle Version von ebusd inklusive Konfigurationsdateien kann von <https://github.com/john30/ebusd> heruntergeladen werden. Alle Felder mit den Abschnitten „data“, „lastup“ und „from global“ werden analysiert. Alle anderen Felder werden derzeit ignoriert.

Es besteht die Möglichkeit, Daten abzufragen, die nicht direkt von ebusd abgefragt werden. Der Befehl „read -f“ erzwingt das Lesen über ebus.

Eine weitere Funktion besteht darin, beliebige Befehle an ebusd zu senden und eine Antwort zu erhalten, um beispielsweise mit Skripten zu arbeiten.

**Achtung** bei ebusd – Version 22.1: Der Konfigurationspfad wurde auf <http://cfg.ebusd.eu/> geändert. Bitte passen Sie dies in Ihrer ebusd-Installation an. Details finden Sie im [Changelog.](https://github.com/john30/ebusd/blob/master/ChangeLog.md)

## wie man Befehle an ebusd sendet

1. Schreiben Sie einen einzelnen Befehl oder eine Befehlsliste auf den Datenpunkt ebus.0.cmd. Wenn Sie mehrere Befehle verwenden möchten, trennen Sie diese durch Kommas. Beispiel: read -f YieldTotal,read LegioProtectionEnabled,read -f -c broadcast outsidetemp

2. Bei Ausführung des Befehls erhalten Sie die Ergebnisse pro Befehl im Datenpunkt ebus.0.cmdResult. Die Ergebnisse sind ebenfalls durch Kommas getrennt, z. B.: 2000, ERR: Element nicht gefunden, 10.5

Achtung: Der Befehl im Datenpunkt ebus.0.cmd wird nach seiner Ausführung gelöscht!

## Installation / Aktualisierung

Bitte befolgen Sie die Installationsanweisungen für ebusd im [Wiki.](https://github.com/john30/ebusd/wiki/1.-Build-and-install)

In /opt/iobroker/node\_modules/iobroker.ebus/lib/scripts finden Sie Skripte zur Installation und Aktualisierung von SBFspot auf Debian-basierten Systemen.

## bekannte Probleme

- Bitte erstellt Issues auf [GitHub](https://github.com/rg-engineering/ioBroker.ebus/issues) , wenn ihr Fehler findet oder neue Funktionen wünscht.

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* (René) Update dependencies


### 4.0.4 (2026-07-11)
* (copilot) Adapter requires node.js >= 22 now
* (René) Update dependencies and some additional changes based on adapter checker

### 4.0.3 (2026-04-12)
* (René): bug fix see issue #517: avoid crash when using external command

### 4.0.2 (2026-04-11)
* (René): bug fix see issue #513: under some conditions admin page was not available

### 4.0.1 (2026-04-06)
* (René): admin rewitten based on react
* (René): see issue #470: table of polled datapoints can now be filled from existing datapoints in ebusd again
* (René): adapter rewritten in typescript

### 3.8.0 (2026-03-17)
* (René): avoid exception, reported by sentry
* (René) update dependencies + changes based on adapter checker
* (René) see issue #497: support of ebusd 26.1

[Older changelogs can be found there](https://github.com/rg-engineering/ioBroker.ebus/blob/master/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2017-2026 René G. <info@rg-engineering.eu>

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