---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.homeconnect/README.md
title: ioBroker.homeconnect
hash: EGNcl5i02TKA3DFfoJ3/aUVhdsdIU2m4DJMliS/Sq/k=
---
![Logo](../../../en/adapterref/iobroker.homeconnect/admin/homeconnect.png)

![GitHub-Lizenz](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.homeconnect)
![Downloads](https://img.shields.io/npm/dm/iobroker.homeconnect.svg)
![GitHub-Repo-Größe](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.homeconnect)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.homeconnect)
![GitHub-Commits seit der letzten Veröffentlichung (nach Datum)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.homeconnect/latest)
![Letzter GitHub-Commit](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.homeconnect)
![GitHub-Probleme](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.homeconnect)
![NPM-Version](http://img.shields.io/npm/v/iobroker.homeconnect.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/homeconnect-stable.svg)
![Anzahl der Installationen](https://iobroker.live/badges/homeconnect-installed.svg)

# IoBroker.homeconnect
[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/homeconnect/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br> </br> **Version:** </br> </br> **Tests:** </br> [![Testen und Freigeben](https://github.com/iobroker-community-adapters/ioBroker.homeconnect/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.homeconnect/actions/workflows/test-and-release.yml) [![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.homeconnect/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.homeconnect/actions/workflows/codeql.yml)

## Wache
**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Homeconnect-Adapter für ioBroker
## Voraussetzungen vor der Installation
- Knoten 20, 22 oder 24
- JS-Controller >= 6.0.11
- Admin >= 7.4.10

Für den Adapter ist eine ClientID erforderlich. Die Registrierung erfolgt über die Einstellungen der einzelnen Schritte.

<https://developer.home-connect.com>

![Screenshot](../../../en/adapterref/iobroker.homeconnect/img/registrierung1.JPG)

Bei **Standard-Home-Connect-Benutzerkonto zum Testen** geben Sie die E-Mail-Adresse an, mit der die Home-Connect-App versendet werden soll.
wurde registriert, dies wird auch später im Autorisierungsprozess benötigt.

![Screenshot](../../../en/adapterref/iobroker.homeconnect/img/registrierung2.JPG)

Wählen Sie bei **Kontotyp** „Einzelperson“ aus. Fügen Sie die restlichen Daten hinzu, falls verfügbar (keine Ahnung, ob dies überprüft wird).

![Screenshot](../../../en/adapterref/iobroker.homeconnect/img/application1.JPG)

Gehen Sie dann zu **Anwendungen** und dann zu **Anwendung registrieren**.

![Screenshot](../../../en/adapterref/iobroker.homeconnect/img/application2.JPG)

Geben Sie unter **Anwendungs-ID** einen Namen für die Anwendung ein, z. B. ioBroker. Wählen Sie unter **OAuth Flow** den Gerätefluss aus.
**Home Connect-Benutzerkonto für Tests** kann leer bleiben. Geben Sie unter **Erfolgreiche Weiterleitung** eine URI ein, z. B. https://example.com.
Speichern Sie anschließend und Sie erhalten die erforderliche Client-ID.

## Konfiguration
Bitte fügen Sie den Benutzernamen, das Passwort und die generierte Client-ID der Homeconnect-App in die Adapterkonfiguration ein.

## Beschreibung
🇬🇧 [Beschreibung](/docs/en/README.md)</br> 🇩🇪 [Beschreibung](/docs/de/README.md)

## Fragen
🇩🇪 [Fragen](https://forum.iobroker.net/topic/16446/test-adapter-homeconnect-bsh-home-connect-v0-0-x?_=1749842644389)

## Verwendung
Mit den Status in den Befehlen können Sie ein Programm stoppen, pausieren und fortsetzen.
Mit den Status in den Einstellungen können Sie das Gerät aus- und einschalten. Das Ändern des Werts von programs.active.BSH_Common_Root_ActiveProgram startet ein Programm. Update iQ300: Sie müssen den Programmnamen in dieser Variable festlegen. Wenn programs.selected.BSH_Common_Root_SelectedProgram kopiert wird, kann der Maschinenbenutzer das gewünschte Programm an der Maschine vordefinieren und es wird über ioBroker gestartet. Das Ändern des Werts von programs.selected.BSH_Common_Root_SelectedProgram führt zur Auswahl eines Programms oder von Optionen.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (Lucky-ESA) Clean up state roles and code
- (Lucky-ESA) Dependencies updated
- (Lucky-ESA) Added language selection
- (Lucky-ESA) Migrated to ESLint 9
- (Lucky-ESA) Adapter requires js-controller >= 6.0.11 now
- (Lucky-ESA) Adapter requires admin >= 7.4.10 now
- (mcm1957) Adapter requires node.js >= 20 now

### 1.4.3 (2024-11-19)

- (TA2k) fix for -001 devices
- (simatec) Adapter has been adapted to meet Responsive Design rules.

### 1.4.2 (2024-10-25)

- (TA2k) fix for devices with object values

### 1.4.1 (2024-07-02)

- (foxriver76) fixed invalid min/max values

### 1.4.0 (2024-04-18)

- (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
- (mcm1957) Dependencies have been updated

### 1.3.0 (2023-12-15)

- fix login

## License

The MIT License (MIT)

Copyright (c) 2024-2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2023 dna909 <dna909@googlemail.com>, TA2k

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