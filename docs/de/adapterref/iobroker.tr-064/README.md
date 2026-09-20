---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tr-064/README.md
title: ioBroker.tr-064
hash: 3NAmar9gzVTvklMV7BV3G0LPjqC0hxoqiLmlkxDCbjs=
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
- Aktivieren Sie den Anwendungszugriff auf der Registerkarte „Netzwerk“. In der deutschen Benutzeroberfläche lautet der Pfad: `Netzwerk` ->`Heimnetzfreigaben` ->`Zugriff für Anwendungen` ->`aktiviert` Die
- Wenn Sie die `ring` Für diese Funktion müssen Sie zusätzliche Einstellungen konfigurieren. Siehe [Abschnitt „Anrufen (Nummer wählen)“](#ring-dial-a-number) .

## Merkmale

### Einfache Zustände und Funktionen

- Schalten Sie das WLAN für 2,4 GHz und 5 GHz ein und aus.
- Schalten Sie das Gast-WLAN ein und aus.
- Schalten Sie alle WLAN-Verbindungen um mit `states.wlan` Wie die WLAN-Taste der Fritz!Box: Nur die zuvor aktiven WLAN-Netzwerke werden wieder eingeschaltet, nicht das Gast-WLAN oder ein deaktiviertes Frequenzband.
- Fritz!Box neu starten
- Starten Sie den WPS-Prozess
- Stellen Sie die Internetverbindung wieder her.
- Lesen Sie die externe IP-Adresse
- Lesen Sie die Internetverbindung: `states.wanAccessType` (`DSL`, `Ethernet`, `Fiber`, `Cable`, `LTE`, `UMTS`), `states.wanLinkStatus` (`Up`, `Down`, ...), `states.wanProvider`, die Liniengeschwindigkeit `states.wanDownstreamMax` /`states.wanUpstreamMax` (Bit/s), die seit Verbindungsaufbau gesendeten und empfangenen Bytes. `states.wanBytesSent` /`states.wanBytesReceived` und die aktuellen Preise `states.wanSendRate` /`states.wanReceiveRate` (Bytes pro Sekunde). Eine Änderung von `wanAccessType` zeigt beispielsweise einen Fallback auf eine Mobilfunkverbindung an.

### klingeln (eine Nummer wählen)

- Wenn Sie beispielsweise eine interne Nummer verwenden `**610`, der Staat `ring` Lässt dieses interne Telefon klingeln. Beispiel: `**610[,timeout]`
- Wenn Sie eine externe Nummer verwenden, der Staat `ring` Verbindet Sie mit dieser externen Nummer. Die Fritz!Box wählt die externe Nummer, und Ihr Standardtelefon klingelt, sobald der Angerufene abnimmt.

Sie können das Standardtelefon in der Fritz!Box konfigurieren. In der deutschen Benutzeroberfläche lautet der Pfad: `Telefonie` ->`Anrufe` ->`Wahlhilfe` ->`Wählhilfe verwenden` Wählen Sie dort auch die Option aus `Verbindung mit dem Telefon ISDN- und Schnurlostelefone` Die

### toPauseState

- Mögliche Werte: `ring`, `connect`, `end`
- Sie können diesen Zustand nutzen, um einen Videoplayer bei einem eingehenden Anruf anzuhalten (`ring`), oder wenn jemand den Hörer abnimmt (`connect`).
- Sie können die Wiedergabe für diesen Wert fortsetzen. `end` Die

### Gegenwart

Mit diesem Adapter können Sie die Anwesenheit von Personen in Ihrem Zuhause überwachen. So sehen Sie, wann ein Familienmitglied oder ein Mitbewohner das Haus verlässt oder zurückkehrt:

- Öffnen Sie die Einstellungen des Adapters und wechseln Sie zum Tab „Geräte“.
- Fügen Sie alle Geräte Ihrer Familienmitglieder oder Mitbewohner hinzu, beispielsweise deren Smartphones, und bestätigen Sie mit „Speichern“.
- Für jedes Gerät erstellt der Adapter eine Ordnerstruktur in den Adapterobjekten. Normalerweise ist dies der Ordner `tr-064.0.devices` Die
- Sobald jemand ankommt oder abreist, erhält der Adapter diese Information. Der Zustand `tr-064.0.devices.xxx.active`, Wo `xxx` ist der Name des Geräts, zeigt an, ob dieses Gerät verfügbar ist und somit, ob die Person zu Hause ist.

Die Option „Zugangspunkte der Geräte anzeigen“ (standardmäßig aktiviert) liest die Mesh-Topologie der Fritz!Box einmal pro Minute aus: `devices.xxx.accessPoint` Ist es die Fritz!Box oder der Repeater, an den das Gerät angeschlossen ist? `devices.xxx.connection` die Band (`2.4 GHz`, `5 GHz`, `6 GHz`) oder `LAN` Damit kann ein Skript nur dann reagieren, wenn ein Smartphone mit dem Repeater am Eingang verbunden ist. Der Reiter „Mesh“ in den Einstellungen zeigt die gesamte Mesh-Topologie grafisch an, während die Instanz läuft.

Standardmäßig `xxx` ist der Name des Geräts in der Fritz!Box, nicht der Name in der Tabelle. Aktivieren Sie im Reiter „Geräte“ die Option „Objekte nach dieser Tabelle benennen“, um die Namen aus der Tabelle zu erhalten. Dadurch erhalten zwei Geräte mit demselben Namen in der Fritz!Box separate Objekte, und die Objekte bleiben erhalten, wenn ein Gerät in der Fritz!Box umbenannt wird. Wenn Sie die Option aktivieren, werden die Objekte, die mit dem Namen der Fritz!Box erstellt wurden, beim nächsten Start gelöscht. Daher müssen Skripte, Aliase oder VIS-Ansichten, die diese verwenden, angepasst werden. Ein Name, der zweimal in der Tabelle vorkommt, erhält eine Zahl am Ende (`Guest`, `Guest_2`).

Ein Smartphone mit einer privaten WLAN-Adresse hat in jedem WLAN eine andere MAC-Adresse, z. B. im Gast-WLAN. Tragen Sie alle seine Adressen durch Kommas getrennt in die Spalte „MAC“ ein: Das Gerät ist vorhanden, sobald eine davon aktiv ist. `lastMAC-address` zeigt an, welche. Eine rotierende private Adresse (iOS 18: „Rotierend“) ändert sich regelmäßig und kann auf diese Weise nicht überwacht werden.

Sie können auch die Option „mDNS zur Erkennung neuer Geräte verwenden“ aktivieren. Wenn mDNS verwendet wird, muss der Adapter die Fritz!Box nicht abfragen und erkennt Änderungen schneller.

Nutzer berichten, dass die Erkennung auch auf iOS-Geräten, beispielsweise iPhones, zuverlässig funktioniert. Bei iPhones benötigen die Fritz!Box-Nutzer laut Berichten bis zu 10 Minuten, um zu erkennen, dass eine Person das WLAN verlassen hat und nicht mehr mit dem WLAN verbunden ist. Die Fritz!Box benötigt dann bis zu einer Minute, um die Anwesenheit erneut zu erkennen.

Die ioBroker-Community hat ein Skript veröffentlicht, das diese Adapterinformationen nutzt, um Aktionen auszulösen. Beispiele hierfür sind: automatisches Abschalten aller Geräte, nachdem alle Personen das Haus verlassen haben; Anzeige der Anzahl der anwesenden Personen; oder Anzeige des Status einer Person in VIS. Siehe den [entsprechenden Thread im ioBroker-Forum](https://forum.iobroker.net/topic/4538/anwesenheitscontrol-basierend-auf-tr64-adapter-script) (auf Deutsch).

### Anrufbeantworter (auf Deutsch: `Anrufbeantworter`)

Sie können den Anrufbeantworter ein- und ausschalten. Mit dem Status `cbIndex` Sie wählen die Nummer des Anrufbeantworters.

### Anrufüberwachung

Der Anrufmonitor erstellt in Echtzeit Zustände für jeden eingehenden und ausgehenden Anruf. Wenn das Telefonbuch aktiviert ist (Standardeinstellung), löst der Adapter die Nummern in Namen auf. Es gibt außerdem einen Zustand, der ein klingelndes Telefon anzeigt.

- `callmonitor.connected` zeigt an, ob der Adapter mit dem Anrufmonitor der Fritz!Box verbunden ist.
- `extension` ist der Anschluss des Telefons, der Anrufe entgegennimmt oder tätigt. `device` sein Name, z.B. `Mobilteil Küche` Die Fritz!Box meldet nur den Port; der Adapter lernt den Namen jedes Ports aus den Aufruflisten, so `device` wird nur gefüllt, wenn die Anruflisten aktiviert sind und das Telefon einmal benutzt wurde. Die Fritz!Box erkennt das Telefon eines eingehenden Anrufs erst, wenn der Hörer abgenommen wird: `callmonitor.connect.device` Die
- Die Fritz!Box protokolliert keine internen Anrufe, z. B. den Anruf einer Türklingel. `**9` weder an den Anrufmonitor noch über TR-064.

### Telefonbuch

- Wenn das Telefonbuch eingeschaltet ist, verwendet der Adapter es, um den Namen des Anrufers zur angegebenen Nummer zu ermitteln.
- Es gibt drei weitere Optionen zur Auflösung einer Nummer oder eines Namens. Falls ein Bild verfügbar ist, erhalten Sie auch die URL des Bildes des Kontakts.

Beispiel: Wenn Sie den Zustand festlegen `phonebook.number` Der Adapter stellt alle 3 Zustände ein. `name`, `number` Und `image` Die Werte werden den gefundenen Kontaktwerten zugeordnet. Hinweis: Bei einer Namenssuche vergleicht der Adapter zunächst den vollständigen Namen. Wird kein Kontakt gefunden, sucht er nach einem Namensbestandteil.

Wenn eine Nummer in mehreren Telefonbüchern unter verschiedenen Namen gespeichert ist, bestimmt die Tabelle „Telefonbuch pro eigener Nummer“ in den Optionen, welchen Namen der Anrufmonitor anzeigt: Geben Sie Ihre eigene Nummer (die letzten Ziffern genügen) und den Namen des Telefonbuchs in der Fritz!Box ein. Bei einem Anruf an oder von dieser eigenen Nummer wird zuerst der Name aus diesem Telefonbuch verwendet.

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

### Ereignisprotokoll

Die Option „Ereignisprotokoll der FRITZ!Box lesen“ liest das Ereignisprotokoll der Fritz!Box einmal pro Minute:

- `deviceLog.json` - die letzten 50 Ereignisse, das neueste zuerst: `[{"id": 506, "group": "sys", "date": "18.09.26", "time": "10:05:00", "msg": "..."}]` Die `group` Ist `sys`, `net`, `fon`, `wlan` oder `usb` Die
- `deviceLog.newEvents` Die Ereignisse seit dem letzten Lesen werden nur bei neuen Ereignissen protokolliert. Nach einem Neustart enthält die Liste die Ereignisse seit dem letzten Durchlauf.

Damit kann ein Skript eine Anmeldung an der Benutzeroberfläche der Fritz!Box melden („Anmeldung des Benutzers ... an der FRITZ!Box-Benutzeroberfläche“). Der Text der Meldungen hängt von der Sprache der Fritz!Box ab. Die Aktion `GetDeviceLog` von `states.command` Gibt ein verkürztes Protokoll ohne diese Ereignisse zurück.

### Schreiben Sie unveränderte Werte

Standardmäßig schreibt der Adapter einen Wert nur, wenn er sich ändert. Mit der Option „Auch unveränderte Werte schreiben“ wird jeder abgefragte Wert mit einem neuen Zeitstempel versehen, sodass ein Skript „wurde aktualisiert“ anstelle von „wurde geändert“ verwenden kann. Dies erhöht die Datenbanklast.

### Widgets für vis-2 und ioBroker.devices

Der Adapter fügt Widgets hinzu, die den Status der Fritz!Box anzeigen. Ein Klick auf die Kachel öffnet einen Dialog mit der Netztopologie, der auf einem Smartphone im Vollbildmodus angezeigt wird.

vis-2 (Widget-Set "FRITZ!Box"):

- **FRITZ!Box** (`Tr064FritzBox`): Eine Kachel ähnlich wie in ioBroker.devices mit Online-Status, Modell, Verbindungstyp, aktuellem Download und Upload, externer IP-Adresse, WLAN und Gast-WLAN, neuen Nachrichten und verpassten Anrufen. Das Layout wird anhand der Größe gewählt, von einem kleinen Quadrat bis zu einer großen Karte mithilfe der Linie. Optional können die Chips des WLANs und des Gast-WLANs umgeschaltet werden (`switchWlan`).
- **Netztopologie** (`Tr064Mesh`): die Mesh-Topologie als Grafik oder Tabelle, die das Widget ausfüllt und während der Sichtbarkeit aktualisiert wird.
- **Präsenz** (`Tr064Presence`): die konfigurierten Geräte mit Anwesenheits-/Abwesenheitsstatus, Zugangspunkt und Frequenzband.

ioBroker.devices: Das Widget **FRITZ!Box** kann in allen vier Größen (1x1, 2x0,5, 2x1, 2x2) zu einer Kategorie hinzugefügt werden; in den Einstellungen des Widgets wird die Instanz des Adapters ausgewählt.

Die Widgets benötigen die Zustände der Adapterversion mit diesen Widgets (`states.boxModel`, `states.wan*`, ...) und die laufende Instanz für die Netztopologie.

### Die Zustände Befehl und Befehlsergebnis

Mit dem Staat `command` Sie können jeden tr-064-Befehl aus dieser [Dokumentation](https://avm.de/service/schnittstellen/) aufrufen. Beispiel:

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

Den Zustand festlegen `command` Für das JSON der obigen Zeilen bedeutet dies: `{ ... }`, ohne `command =` und ohne Zeilenumbrüche. Die Antwort auf den Anruf wird im Status gespeichert. `commandResult` Die

Das folgende Beispiel zeigt, wie man den Anrufbeantworter der Fritz!Box im Zustand ein- und ausschaltet. `command` Zum Testen können Sie den Text kopieren und in den Status einfügen. `tr-064.0.states.command` Die

Schalten Sie den Anrufbeantworter ein:

`{"service": "urn:dslforum-org:service:X_AVM-DE_TAM:1","action": "SetEnable", "params": {"NewIndex": "0","NewEnable": "1"}}`

Schalten Sie den Anrufbeantworter aus:

`{"service": "urn:dslforum-org:service:X_AVM-DE_TAM:1","action": "SetEnable", "params": {"NewIndex": "0","NewEnable": "0"}}`

Eine detaillierte Beschreibung der Aktionen und Parameter von TAM finden Sie hier: [x\_tam.pdf](https://avm.de/fileadmin/user_upload/Global/Service/Schnittstellen/x_tam.pdf) . Dieser Link ist auch in der obenstehenden AVM-Dokumentation enthalten.

### Schalten Sie den Anrufmonitor ein.

Bevor Sie den Anrufmonitor verwenden können, müssen Sie ihn in der AVM Fritz!Box aktivieren. Um den Anrufmonitor zu aktivieren, wählen Sie `#96*5*` auf einem angeschlossenen Telefon. Die Fritz!Box öffnet dann den TCP/IP-Port 1012. Um den Port zu schließen, wählen Sie `#96*4*` Die

## Erste Erstellung

@soef hat diesen Adapter unter <https://github.com/soef/ioBroker.tr-064> erstellt. Da der Adapter dort nicht mehr weiterentwickelt wird, wurde er nach iobroker-community verschoben, um Fehler beheben zu können. Vielen Dank an @soef für seine Arbeit.

## Wie migriert man von tr-064-community (Zwischenversion und -name)?

Wenn Sie vom Adapter tr-064-community wechseln, können Sie die vollständige Geräteliste und alle Einstellungen kopieren:

- Öffnen Sie die Objekte im Adminbereich und schalten Sie den Expertenmodus ein.
- Suche nach dem Objektbaum `system.adapter.tr-064-community.0`, Wo `0` Dies ist die Nummer der Instanz. Falls mehrere Instanzen vorhanden sind, wählen Sie die richtige aus.
- Klicken Sie auf die Schaltfläche mit dem Stiftsymbol rechts neben dieser Zeile.
- Wählen Sie im Fenster „Rohdaten (nur für Experten)“ aus und kopieren Sie den entsprechenden Teil. `native` des JSON.
- Offen `system.adapter.tr-064.0`, Wo `0` Dies ist die Nummer der Instanz. Falls mehrere Instanzen vorhanden sind, wählen Sie die richtige aus.
- Fügen Sie den kopierten Inhalt in den entsprechenden Abschnitt ein. `native` Die
- Änderungen speichern.
- Schalten Sie den Adapter ein.
- Überprüfen Sie die Konfiguration und stellen Sie sicher, dass alles korrekt wiederhergestellt wurde.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 5.1.0 (2026-09-19)
- (@GermanBluefox) New widgets for vis-2 ("FRITZ!Box", "Mesh topology", "Presence") and for ioBroker.devices ("FRITZ!Box"): the state of the box as a tile, a click shows the mesh topology
- (@GermanBluefox) New states `boxModel` and `boxFirmware`
- (@GermanBluefox) The table in the tab "Devices" uses the whole width again: in 5.0.2 it was so narrow that name, IP and MAC could not be read
- (@GermanBluefox) "Search for devices" works with many devices: the adapter reads the list of all devices in one request (`X_AVM-DE_GetHostListPath`) instead of one request per device, which took longer than the 20 seconds of the button. The search is always answered, also when a request fails, the box has no devices or the adapter is not connected
- (@GermanBluefox) Fixed the crash `systemData.save is not a function` on start when a call list is generated: installations which ran an adapter version from 2017 to 2020 still had an invalid attribute `save` in the object `tr-064.<instance>`, which is removed now
- (@GermanBluefox) `wlanGuest` switches the guest WLAN again on boxes with three bands (e.g. FRITZ!Box 5690 Pro, 4060) instead of the third band: the guest WLAN is always the last WLAN configuration of the box
- (@GermanBluefox) New states `wlan60` and `wlan60Password` for the 6 GHz WLAN, and `wlan52` and `wlan52Password` for the second 5 GHz WLAN (e.g. FRITZ!Box 4060). The adapter asks the box which band its third WLAN uses
- (@GermanBluefox) The call lists do not stop updating after some hours any more: the call monitor detects a connection which the box dropped unnoticed (e.g. by a restart) with TCP keepalive and reconnects, and the call lists are also read once a minute - that way they are updated without call monitor, too
- (@GermanBluefox) A call list download which the box does not answer is given up after 10 seconds with a warning
- (@GermanBluefox) `states.wlan` switches all WLANs like the WLAN button of the FRITZ!Box (`X_AVM-DE_SetWLANGlobalEnable`) and shows its state: switching on does not switch on the guest WLAN and bands which were off any more
- (@GermanBluefox) New states for the internet connection: `wanAccessType` (e.g. `LTE` during a fallback to a mobile connection), `wanLinkStatus`, `wanProvider`, `wanDownstreamMax`, `wanUpstreamMax`, and the traffic `wanBytesSent`, `wanBytesReceived` (64 bit counters), `wanSendRate`, `wanReceiveRate`
- (@GermanBluefox) New states `devices.xxx.accessPoint` and `devices.xxx.connection`: the FRITZ!Box or repeater a device is connected to and the band, read from the mesh topology. The new tab "Mesh" in the settings shows the mesh topology as a graphic. Admin 8 is required now
- (@GermanBluefox) New option "Read the event log of the FRITZ!Box": the complete event log including the logins to the user interface in `deviceLog.json`, new events in `deviceLog.newEvents`
- (@GermanBluefox) New state `callmonitor.connected` shows whether the call monitor is connected, and `callmonitor.*.device` the name of the telephone of a call
- (@GermanBluefox) New table "Phone book per own number": a number which is in several phone books gets its name from the phone book of the own number of the call
- (@GermanBluefox) New option "Write unchanged values too": every polled value is written with a new time stamp
- (@GermanBluefox) A single call forwarding of the FRITZ!Box is shown in `callForwarding` now - before, the states were only created from the second call forwarding on. With only one phone number the name of the number is added to the name of the state again, and a box without call forwardings does not delay the poll cycle by 3 seconds any more
- (@GermanBluefox) The call monitor does not lose events any more when the FRITZ!Box sends two of them in one network packet (e.g. `RING` and `DISCONNECT` of a very short call) or one event in two packets: the received data is split into lines now
- (@GermanBluefox) The call lists do not freeze for good any more when the FRITZ!Box numbers its calls from the beginning again, e.g. after exchanging the box, a factory reset or a restart: the adapter asked only for the calls after the last known call ID and got an empty list forever. It now checks an empty answer against the newest call of the box and builds the lists again from the call list of the box; only calls after the newest known call increase the counters. The meta object `tr-064.<instance>` is only written when the lists changed, not with every refresh
- (@GermanBluefox) New state `states.abNewMessages`: number of new (not yet listened) messages on the answering machines
- (@GermanBluefox) The MAC addresses of the configured devices are sent to the box in its own format `AA:BB:CC:DD:EE:FF`, so addresses entered in lower case, with dashes or without separators are found
- (@GermanBluefox) A configured device which the box does not know (or which is offline since the start) is logged once with a hint to check its MAC address and listed as inactive in `jsonDeviceList`, instead of silently being left out
- (@GermanBluefox) New option "Name the objects after this table" in the tab "Devices": the objects below `devices` get the names of the table instead of the names in the Fritz!Box, so two devices with the same name in the box are not mixed up any more. When the option is switched on, the objects which were created with the name of the box are deleted. mDNS writes into the same objects as the poll now - before it created additional objects with the name of the table
- (@GermanBluefox) A device can have several MAC addresses, separated by commas (e.g. a smartphone with a private Wi-Fi address in the home and the guest Wi-Fi): it is present if one of them is active. Changing the spelling of a MAC address does not delete the objects of the device any more, and "Search for devices" does not add a device of the table a second time
- (@GermanBluefox) A device request which the box does not answer does not stop the presence detection and the polling any more
- (@GermanBluefox) An info message tells when "Create JSON device list" is switched on, but no devices are configured
- (@GermanBluefox) The adapter connects to a FRITZ!Box whose WLAN is switched off: the check of the login used the WLAN, which the box answers with an error then, so the adapter restarted (4.x) or retried forever without creating its objects (5.0). A refused login is reported with a hint to check user, password and rights of the user instead of the advice to restart the box
- (@GermanBluefox) The adapter does not hang silently any more when the FRITZ!Box does not deliver the description of a service (e.g. `x_speedtestSCPD.xml` with FRITZ!OS 8.24 Labor): after 10 seconds the service is skipped with a warning, and the connection is limited to 60 seconds and retried
- (@GermanBluefox) The debug log does not contain sensitive data any more, so it can be shared to analyze problems: phone numbers, names, phone book and call data, host names, MAC and IP addresses, values of states and results of `states.command` are only logged with level `silly`, and the session ID in URLs of the box is never logged. The result of `states.command` is no longer logged with level info - it is still written into `states.commandResult`
- (@GermanBluefox) The call monitor does not stop any more when the FRITZ!Box refuses the connection, e.g. while it restarts after a firmware update: it retries every 60 seconds and reconnects on its own. The hint to open port 1012 with `#96*5*` is only logged if the call monitor was never connected

### 5.0.2 (2026-09-10)
- (@GermanBluefox) Fixed the crash `Cannot read properties of undefined (reading 'safe')` in `getWLAN` right after the start: the WLAN states are read again in every poll cycle
- (@GermanBluefox) A box without a separate 5 GHz configuration does not delay the polling by 3 seconds any more

### 5.0.1 (2026-09-09)
- (@GermanBluefox) **Breaking change:** the adapter requires node.js >= 22 now
- (@GermanBluefox) Adapter requires admin >= 7.7.22 now
- (@GermanBluefox) Adapter requires js-controller >= 6.0.11 now
- (@GermanBluefox) The adapter does not stop any more if the Fritz!Box cannot be reached. The connection is retried every 30 seconds, and the new state `info.connection` shows whether the box answers
- (@justr1) Expected disconnects of the call monitor (`ETIMEDOUT`, `ECONNRESET`, `EPIPE`) are logged as info now, because the adapter reconnects on its own
- (@GermanBluefox) The mDNS socket is closed when the adapter stops, so a restart does not leave a listener behind
- (@GermanBluefox) A phone book with only one contact is read now
- (@GermanBluefox) The hint how to open port 1012 is shown again if the call monitor is refused by the Fritz!Box
- (@GermanBluefox) The adapter was refactored to TypeScript. The sources are in `src/`, the adapter runs from `build/`
- (@GermanBluefox) The configuration dialog was rewritten as JsonConfig. Admin 7.7.22 or newer is required for it
- (@GermanBluefox) The adapter can only be installed from npm now, no longer directly from GitHub (`common.nogit`)
- (@GermanBluefox) The options "Use call forwarding options", "Use mDNS" and "Create JSON device list" have a default value in `io-package.json` now
- (@GermanBluefox) The command `dumpservices.fs` writes the file again instead of stopping the adapter

### 4.3.0 (2024-04-30)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 4.2.18 (2023-01-04)
* (Apollon77) Prepare for future js-controller versions

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