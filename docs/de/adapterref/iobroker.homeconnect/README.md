---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.homeconnect/README.md
title: ioBroker.homeconnect
hash: kRnby0GUGm3oJYEyvIjcApJJS6PN2hNaxUS9zM/tqrg=
---
![Logo](../../../en/adapterref/iobroker.homeconnect/admin/homeconnect.png)

![GitHub-Lizenz](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.homeconnect)
![Downloads](https://img.shields.io/npm/dm/iobroker.homeconnect.svg)
![GitHub-Repo-Größe](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.homeconnect)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.homeconnect)
![GitHub-Commits seit der letzten Veröffentlichung (nach Datum)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.homeconnect/latest)
![GitHub letzter Commit](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.homeconnect)
![GitHub-Probleme](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.homeconnect)
![NPM-Version](http://img.shields.io/npm/v/iobroker.homeconnect.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/homeconnect-stable.svg)
![Anzahl der Installationen](https://iobroker.live/badges/homeconnect-installed.svg)

# IoBroker.homeconnect
[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/homeconnect/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br> </br> **Version:** </br> </br> **Tests:** </br> [![Test und Veröffentlichung](https://github.com/iobroker-community-adapters/ioBroker.homeconnect/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.homeconnect/actions/workflows/test-and-release.yml) [![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.homeconnect/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.homeconnect/actions/workflows/codeql.yml)

## Wachposten
**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Homeconnect-Adapter für ioBroker
## Voraussetzungen vor der Installation
Es muss mindestens Node.js Version 16 installiert sein!!

Für den Adapter wird eine ClientID benötigt. Nutzen Sie die Einstellungen, um jeden Schritt der Registrierung zu erreichen.

## Anforderungen vor der Installation
Es muss mindestens Node.js Version 16 installiert sein!

Für den Adapter ist eine ClientID erforderlich. Verwenden Sie zur Registrierung die Einstellungen für jeden Schritt.

<https://developer.home-connect.com>

![Bildschirmfoto](../../../en/adapterref/iobroker.homeconnect/img/registrierung1.JPG)

Bei **Standard-Home Connect-Benutzerkonto zum Testen** die E-Mail-Adresse angeben, mit der die Home-Connect-App registriert wurde, wird diese später auch beim Autorisierungsprozess benötigt.

Geben Sie bei **Standard-Home Connect-Benutzerkonto zum Testen** die E-Mail-Adresse an, mit der die Home Connect-App versendet werden soll.
registriert wurde, ist dies auch später im Autorisierungsprozess erforderlich.

![Bildschirmfoto](../../../en/adapterref/iobroker.homeconnect/img/registrierung2.JPG)

Bei **Kontotyp** Einzelperson auswählen. Die restlichen Daten sofern vorhanden ergänzen (keine Ahnung, ob das geprüft wird).

Wählen Sie für **Kontotyp** die Option „Individuell“ aus. Fügen Sie die restlichen Daten hinzu, falls verfügbar (keine Ahnung, ob dies überprüft wird).

![Bildschirmfoto](../../../en/adapterref/iobroker.homeconnect/img/application1.JPG)

Dann auf **Bewerbungen** und anschließend auf **Register Application** gehen.

Gehen Sie dann zu **Bewerbungen** und dann zu **Bewerbung registrieren**.

![Bildschirmfoto](../../../en/adapterref/iobroker.homeconnect/img/application2.JPG)

Bei **Application ID** einen Namen für die Bewerbung eintragen, z.B. ioBroker. Bei **OAuth Flow** Device Flow auswählen.
**Home Connect-Benutzerkonto zum Testen** kann leer bleiben. Bei **Success Redirect** eine URI eintragen, z.B. https://example.com.
Dann speichern und dann hat man die benötigte ClientID.

Geben Sie unter **Anwendungs-ID** einen Namen für die Anwendung ein, z. B. ioBroker. Mit **OAuth Flow** Device Flow auswählen.
**Home Connect-Benutzerkonto zum Testen** kann leer bleiben. Geben Sie für **Success Redirect** einen URI ein, z. B. https://example.com.
Anschließend speichern und Sie haben die benötigte ClientID.

## Konfiguration
In der Adapter-Config müssen der Homeconnect App Benutzername und Passwort und die erstellte ClientID eingetragen werden.

## Benutzung
Mit den Zuständen in Befehlen kannst du das Programm stoppen, pausieren oder fortführen.

Mit den Zuständen in den Einstellungen kannst du das Gerät ein- oder ausschalten.

Ändern des Status „Programme.active.BSH_Common_Root_ActiveProgram“ führt zum Starten eines Programms Update iQ300: Es muss das gewünschte Programm registriert werden. Wenn man Programme.selected.BSH_Common_Root_SelectedProgram ausliest und einträgt, hat der Benutzer die Möglichkeit, am Gerät das gewünschte Programm auszuwählen, welches dann per ioBroker gestartet wird.

Das Ändern des Status „programs.selected.BSH_Common_Root_SelectedProgram“ führt zum Auswählen des Programms oder der Optionen

Wenn man prüfen möchte, ob ein Programm fertig ist, muss

status.BSH_Common_Status_OperationState

Auf den vollständigen Statusnamen wird geprüft:

BSH.Common.EnumType.OperationState.Finished

Weitere Zustände sind noch:

„BSH.Common.EnumType.OperationState.Inactive“: „Inaktiv“, „BSH.Common.EnumType.OperationState.Ready“: „Bereit“, „BSH.Common.EnumType.OperationState.Run“: „Ausführen“, „BSH .Common.EnumType.OperationState.ActionRequired": "ActionRequired", "BSH.Common.EnumType.OperationState.Finished": "Fertig"

Oder ob ein Gerät geöffnet ist

„BSH.Common.EnumType.DoorState.Open“: „Offen“, „BSH.Common.EnumType.DoorState.Closed“: „Geschlossen“

## Verwendung
Mit den Zuständen in Befehlen können Sie ein Programm stoppen, pausieren und fortsetzen.
Mit den Zuständen in den Einstellungen können Sie das Gerät aus- oder einschalten. Ändern Sie den Wert von „Programme.active.BSH_Common_Root_ActiveProgram“, um ein Programm zu starten. Update iQ300: Sie müssen den Programmnamen in dieser Variablen festlegen. Wenn „programs.selected.BSH_Common_Root_SelectedProgram“ kopiert wird, kann der Maschinenbenutzer das gewünschte Programm an der Maschine vordefinieren und es wird über ioBroker gestartet. Eine Änderung des Werts von „programs.selected.BSH_Common_Root_SelectedProgram“ führt zur Auswahl eines Programms oder von Optionen

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.3.0 (2023-12-15)

- fix login

### 1.2.2 (2023-12-02)

- bump version

### 1.2.1 (2023-12-02)

- bump version

### 1.2.0 (2023-12-02)

- fix login flow
- (mcm1957) changed: Testing has been changed to support node 16, 18 and 20
- (mcm1957) changed: Dependencies have been updated
- (ta2k) restart adapter instead of relogin

### 1.1.1

- Fix auto login for SingleKey User

### 1.1.0

- Add auto login for SingleKey User

### 1.0.3

- Add manually login for SingleKey User

### 1.0.2

- Adapter complete rewriten. Includes a lot of Bugfixes

### 0.0.36

- fix for js.controller 3.3. Please delete the device in Objects manually

### 0.0.32 (29.12.2020)

- (Morluktom) bugfix for devices that are completely switched off (e.g. washing machine, dryer)

### 0.0.31

- (ta2k) fix pause start command

### 0.0.30 (10.05.2020)

- (ta2k) fix js controller 3 issues

### 0.0.27 (13.11.2019)

- (ta2k) improve option selecting

### 0.0.26 (04.11.2019)

- (ta2k) fix boolean settings

### 0.0.25 (08.09.2019)

- (ta2k) fix compact mode
- (ta2k) reduce query per minute to prevent too much request error

### 0.0.24 (08.09.2019)

- (ta2k) improve error messaging

### 0.0.22 (08.09.2019)

- (ta2k) improve error messaging

### 0.0.22 (26.07.2019)

- (ta2k) bugfixing

### 0.0.21 (12.07.2019)

- (ta2k) bugfixing

### 0.0.19 (30.06.2019)

- (ta2k) improve displaying long states, options and events

### 0.0.18 (26.06.2019)

- (ta2k) add error handling for stoping

### 0.0.17 (26.06.2019)

- (ta2k) make commands writeable

### 0.0.16 (26.06.2019)

- (ta2k) cleanup states after update

### 0.0.15 (24.06.2019)

- (ta2k) reconnect after token refresh

### 0.0.14 (18.06.2019)

- (ta2k) check for keep alive events

### 0.0.13 (18.06.2019)

- (ta2k) close event stream before reconnect

### 0.0.12 (18.06.2019)

- (ta2k) fix events lost after 12hr

### 0.0.11 (09.06.2019)

- (ta2k) fix set values and refresh available options after program select

### 0.0.10 (04.06.2019)

- (ta2k) add settings and commands, add options to available and fix bugs

### 0.0.9 (29.05.2019)

- (ta2k) clean up code and receive event notifications

### 0.0.8 (10.04.2019)

- (dna909) increase refreshTokenInterval

### 0.0.7 (03.04.2019)

- (TA2k) Improve refreshToken and add Register process in instance option

### 0.0.6 (09.01.2019)

- (dna909) Oven: add Option.FastPreHeat, Logging, query stream.type DISCONNECTED
- (tFaster) code format and cleanups,fixed devices data structure,renamed deviceArray to devices,
  added startInRelative for Oven

### 0.0.5 (28.11.2018)

- (dna909) add eventstream handling

### 0.0.4 (23.11.2018)

- (dna909) add event-listener

### 0.0.3 (14.11.2018)

- (dna909) query States and available programs

### 0.0.2 (08.11.2018)

- (dna909) OAuth2 Deviceflow-Authorization, enumerate connected appliances

### 0.0.1 (09.10.2018)

- (dna909) initial release

## License

The MIT License (MIT)

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