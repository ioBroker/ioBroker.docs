---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tr-064/README.md
title: ioBroker.tr-064
hash: P0ws0tCFzve9Hd4S+gtMecUzFOIp98i/OreueFatlAk=
---
![Anzahl der Installationen](http://iobroker.live/badges/tr-064-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.tr-064.svg)
![Test und Freigabe](https://github.com/iobroker-community-adapters/iobroker.tr-064/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/tr-064/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tr-064.svg)

<img src="admin/tr-064.svg" width="128" height="128">

# ioBroker.tr-064

**Dieser Adapter verwendet die Sentry-Bibliotheken. Diese Bibliotheken melden Ausnahmen und Codefehler automatisch an die Entwickler.** Weitere Informationen sowie Hinweise zum Deaktivieren der Fehlerberichterstattung finden Sie in der [Dokumentation des Sentry-Plugins](https://github.com/ioBroker/plugin-sentry#plugin-sentry) . Die Sentry-Berichterstattung wird ab js-controller Version 3.0 verwendet.

## Info

Dieser Adapter liest die wichtigsten Informationen von einer AVM Fritz!Box aus. Beispiele hierfür sind die Anrufliste und die Anzahl der Nachrichten auf dem Anrufbeantworter.

Der Adapter basiert auf der [FRITZ!-Schnittstellendokumentation](https://fritz.com/pages/schnittstellen/) .

## Erforderliche Einstellungen in Ihrer Fritz!Box

- Ändern Sie die Anmeldemethode auf „Benutzername und Passwort verwenden“.
- Die Fritz!Box verwendet maximal 32 Zeichen für das Passwort. Längere Passwörter werden in der Benutzeroberfläche der Fritz!Box ohne Warnung gekürzt. Geben Sie daher bei der Konfiguration des Adapters nur diese 32 Zeichen ein.
- Erstellen Sie einen Benutzer und erteilen Sie diesem Benutzer die Berechtigung, die Fritz!Box und ihre Einstellungen zu steuern.
- Aktivieren Sie den Anwendungszugriff auf der Registerkarte „Netzwerk“. In der deutschen Benutzeroberfläche lautet der Pfad:`Netzwerk` ->`Heimnetzfreigaben` ->`Zugriff für Anwendungen` ->`aktiviert` Die
- Wenn Sie die`ring` Für diese Funktion müssen Sie zusätzliche Einstellungen konfigurieren. Siehe [Abschnitt „Anrufen (Nummer wählen)“](#ring-dial-a-number) .

## Merkmale

### Einfache Zustände und Funktionen

- Schalten Sie das WLAN für 2,4 GHz und 5 GHz ein und aus.
- Schalten Sie das Gast-WLAN ein und aus.
- Fritz!Box neu starten
- Starten Sie den WPS-Prozess
- Stellen Sie die Internetverbindung wieder her.
- Lesen Sie die externe IP-Adresse

### klingeln (eine Nummer wählen)

- Wenn Sie beispielsweise eine interne Nummer verwenden`**610` , der Staat`ring` Lässt dieses interne Telefon klingeln. Beispiel:`**610[,timeout]`
- Wenn Sie eine externe Nummer verwenden, der Staat`ring` Verbindet Sie mit dieser externen Nummer. Die Fritz!Box wählt die externe Nummer, und Ihr Standardtelefon klingelt, sobald der Angerufene abnimmt.

Sie können das Standardtelefon in der Fritz!Box konfigurieren. In der deutschen Benutzeroberfläche lautet der Pfad:`Telefonie` ->`Anrufe` ->`Wahlhilfe` ->`Wählhilfe verwenden` Wählen Sie dort auch die Option aus`Verbindung mit dem Telefon ISDN- und Schnurlostelefone` Die

### toPauseState

- Mögliche Werte:`ring` ,`connect` ,`end`
- Sie können diesen Zustand nutzen, um einen Videoplayer bei einem eingehenden Anruf anzuhalten (`ring` ), oder wenn jemand den Hörer abnimmt (`connect` ).
- Sie können die Wiedergabe für diesen Wert fortsetzen.`end` Die

### Gegenwart

Mit diesem Adapter können Sie die Anwesenheit von Personen in Ihrem Zuhause überwachen. So sehen Sie, wann ein Familienmitglied oder ein Mitbewohner das Haus verlässt oder zurückkehrt:

- Öffnen Sie die Einstellungen des Adapters und wechseln Sie zum Tab „Geräte“.
- Fügen Sie alle Geräte Ihrer Familienmitglieder oder Mitbewohner hinzu, beispielsweise deren Smartphones, und bestätigen Sie mit „Speichern“.
- Für jedes Gerät erstellt der Adapter eine Ordnerstruktur in den Adapterobjekten. Normalerweise ist dies der Ordner`tr-064.0.devices` Die
- Sobald jemand ankommt oder abreist, erhält der Adapter diese Information. Der Zustand`tr-064.0.devices.xxx.active` , Wo`xxx` ist der Name des Geräts, zeigt an, ob dieses Gerät verfügbar ist und somit, ob die Person zu Hause ist.

Sie können auch die Option „mDNS zur Erkennung neuer Geräte verwenden“ aktivieren. Wenn mDNS verwendet wird, muss der Adapter die Fritz!Box nicht abfragen und erkennt Änderungen schneller.

Nutzer berichten, dass die Erkennung auch auf iOS-Geräten, beispielsweise iPhones, zuverlässig funktioniert. Bei iPhones benötigen die Fritz!Box-Nutzer laut Berichten bis zu 10 Minuten, um zu erkennen, dass eine Person das WLAN verlassen hat und nicht mehr mit dem WLAN verbunden ist. Die Fritz!Box benötigt dann bis zu einer Minute, um die Anwesenheit erneut zu erkennen.

Die ioBroker-Community hat ein Skript veröffentlicht, das diese Adapterinformationen nutzt, um Aktionen auszulösen. Beispiele hierfür sind: automatisches Abschalten aller Geräte, nachdem alle Personen das Haus verlassen haben; Anzeige der Anzahl der anwesenden Personen; oder Anzeige des Status einer Person in VIS. Siehe den [entsprechenden Thread im ioBroker-Forum](https://forum.iobroker.net/topic/4538/anwesenheitscontrol-basierend-auf-tr64-adapter-script) (auf Deutsch).

### Anrufbeantworter (auf Deutsch:`Anrufbeantworter` )

Sie können den Anrufbeantworter ein- und ausschalten. Mit dem Status`cbIndex` Sie wählen die Nummer des Anrufbeantworters.

### Anrufüberwachung

Der Anrufmonitor erstellt in Echtzeit Zustände für jeden eingehenden und ausgehenden Anruf. Wenn das Telefonbuch aktiviert ist (Standardeinstellung), löst der Adapter die Nummern in Namen auf. Es gibt außerdem einen Zustand, der ein klingelndes Telefon anzeigt.

### Telefonbuch

- Wenn das Telefonbuch eingeschaltet ist, verwendet der Adapter es, um den Namen des Anrufers zur angegebenen Nummer zu ermitteln.
- Es gibt drei weitere Optionen zur Auflösung einer Nummer oder eines Namens. Falls ein Bild verfügbar ist, erhalten Sie auch die URL des Bildes des Kontakts.

Beispiel: Wenn Sie den Zustand festlegen`phonebook.number` Der Adapter stellt alle 3 Zustände ein.`name` ,`number` Und`image` Die Werte werden den gefundenen Kontaktwerten zugeordnet. Hinweis: Bei einer Namenssuche vergleicht der Adapter zunächst den vollständigen Namen. Wird kein Kontakt gefunden, sucht er nach einem Namensbestandteil.

### Anruflisten

Ausgabeformate:

- `json`
- `html`

Folgende Anruflisten existieren:

- alle Anrufe
- verpasste Anrufe
- eingehende Anrufe
- ausgehende Anrufe

Anrufzähler: Sie können den Anrufzähler auf 0 setzen. Der nächste Anruf erhöht den Zähler um 1.

Sie können die HTML-Ausgabe mithilfe einer Vorlage konfigurieren.

### Die Zustände Befehl und Befehlsergebnis

Mit dem Staat`command` Sie können jeden tr-064-Befehl aus dieser [Dokumentation](https://avm.de/service/schnittstellen/) aufrufen. Beispiel:

```javascript
command = {
    "service": "urn:dslforum-org:service:WLANConfiguration:1",
    "action": "X_AVM-DE_SetWPSConfig",
    "params": {
        "NewX_AVM-DE_WPSMode": "pbc",
        "NewX_AVM-DE_WPSClientPIN": ""
    }
};
```

Den Zustand festlegen`command` Für das JSON der obigen Zeilen bedeutet dies:`{ ... }` , ohne`command =` und ohne Zeilenumbrüche. Die Antwort auf den Anruf wird im Status gespeichert.`commandResult` Die

Das folgende Beispiel zeigt, wie man den Anrufbeantworter der Fritz!Box im Zustand ein- und ausschaltet.`command` Zum Testen können Sie den Text kopieren und in den Status einfügen.`tr-064.0.states.command` Die

Schalten Sie den Anrufbeantworter ein:

`{"service": "urn:dslforum-org:service:X_AVM-DE_TAM:1","action": "SetEnable", "params": {"NewIndex": "0","NewEnable": "1"}}`

Schalten Sie den Anrufbeantworter aus:

`{"service": "urn:dslforum-org:service:X_AVM-DE_TAM:1","action": "SetEnable", "params": {"NewIndex": "0","NewEnable": "0"}}`

Eine detaillierte Beschreibung der Aktionen und Parameter von TAM finden Sie hier: [x\_tam.pdf](https://avm.de/fileadmin/user_upload/Global/Service/Schnittstellen/x_tam.pdf) . Dieser Link ist auch in der obenstehenden AVM-Dokumentation enthalten.

### Schalten Sie den Anrufmonitor ein.

Bevor Sie den Anrufmonitor verwenden können, müssen Sie ihn in der AVM Fritz!Box aktivieren. Um den Anrufmonitor zu aktivieren, wählen Sie`#96*5*` auf einem angeschlossenen Telefon. Die Fritz!Box öffnet dann den TCP/IP-Port 1012. Um den Port zu schließen, wählen Sie`#96*4*` Die

## Vorabversionen

Vorabversionen sind auf npm unter dem Tag verfügbar.`dev` Sie können sie aus dem Stammverzeichnis von ioBroker mit den folgenden Befehlen installieren:

```bash
npm install iobroker.tr-064@dev
iobroker upload tr-064
```

## Erste Erstellung

@soef hat diesen Adapter unter <https://github.com/soef/ioBroker.tr-064> erstellt. Da der Adapter dort nicht mehr weiterentwickelt wird, wurde er nach iobroker-community verschoben, um Fehler beheben zu können. Vielen Dank an @soef für seine Arbeit.

## Wie migriert man von tr-064-community (Zwischenversion und -name)?

Wenn Sie vom Adapter tr-064-community wechseln, können Sie die vollständige Geräteliste und alle Einstellungen kopieren:

- Öffnen Sie die Objekte im Adminbereich und schalten Sie den Expertenmodus ein.
- Suche nach dem Objektbaum`system.adapter.tr-064-community.0` , Wo`0` Dies ist die Nummer der Instanz. Falls mehrere Instanzen vorhanden sind, wählen Sie die richtige aus.
- Klicken Sie auf die Schaltfläche mit dem Stiftsymbol rechts neben dieser Zeile.
- Wählen Sie im Fenster „Rohdaten (nur für Experten)“ aus und kopieren Sie den entsprechenden Teil.`native` des JSON.
- Offen`system.adapter.tr-064.0` , Wo`0` Dies ist die Nummer der Instanz. Falls mehrere Instanzen vorhanden sind, wählen Sie die richtige aus.
- Fügen Sie den kopierten Inhalt in den entsprechenden Abschnitt ein.`native` Die
- Änderungen speichern.
- Schalten Sie den Adapter ein.
- Überprüfen Sie die Konfiguration und stellen Sie sicher, dass alles korrekt wiederhergestellt wurde.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (@justr1) Expected disconnects of the call monitor (`ETIMEDOUT`, `ECONNRESET`, `EPIPE`) are logged as info now, because the adapter reconnects on its own
- (@GermanBluefox) The mDNS socket is closed when the adapter stops, so a restart does not leave a listener behind
- (@GermanBluefox) A phone book with only one contact is read now
- (@GermanBluefox) The hint how to open port 1012 is shown again if the call monitor is refused by the Fritz!Box
- (@GermanBluefox) The adapter was refactored to TypeScript. The sources are in `src/`, the adapter runs from `build/`
- (@GermanBluefox) The configuration dialog was rewritten as JsonConfig. Admin 7.7.22 or newer is required for it
- (@GermanBluefox) **Breaking change:** the adapter requires node.js >= 22 now
- (@GermanBluefox) The adapter can only be installed from npm now, no longer directly from GitHub (`common.nogit`)
- (@GermanBluefox) The options "Use call forwarding options", "Use mDNS" and "Create JSON device list" have a default value in `io-package.json` now
- (@GermanBluefox) The command `dumpservices.fs` writes the file again instead of stopping the adapter
- (@GermanBluefox) Adapter requires admin >= 7.7.22 now
- (@GermanBluefox) Adapter requires js-controller >= 6.0.11 now

### 4.3.0 (2024-04-30)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 4.2.18 (2023-01-04)
* (Apollon77) Prepare for future js-controller versions

### 4.2.17 (2022-09-16)
* (simatec/Apollon77) Prevent duplication of entries in configuration
* (Apollon77) Make sure the active status of devices in jsonDeviceList is correct

### 4.2.16 (2022-03-21)
* (Apollon77) Fix info logs on callee/caller
* (Apollon77) Add special handling for potential broken external image links in a phonebook
* (Apollon77) Prevent some crash cases reported by Sentry

### 4.2.15 (2021-12-08)
* (bluefox) fix crash case (Sentry IOBROKER-TR-064-35)

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.tr-064/blob/master/CHANGELOG_OLD.md)

## License
The MIT License (MIT)


Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2015-2023 soef <soef@gmx.net>, ioBroker-Community-Developers

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