---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tr-064/README.md
title: ioBroker.tr-064
hash: iPhfK/VaXi4cGNZdD/sofPo4Q3nzU6FkqhlHcQz+c5c=
---
![Anzahl der Installationen](https://iobroker.live/badges/tr-064-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.tr-064.svg)
![Test und Freigabe](https://github.com/iobroker-community-adapters/iobroker.tr-064/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/tr-064/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tr-064.svg)

<img src="admin/tr-064.svg" width="128" height="128">

# ioBroker.tr-064

> \[!WICHTIG] Dieser Adapter kann nicht von GitHub installiert werden.

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

### Personen, Gruppen, Gäste (wie bei der Facebook-Anwesenheitsprüfung)

Der Reiter „Personen“ zeigt Personen anstelle einzelner Geräte an. Jede Zeile repräsentiert eine Person mit Namen, optionaler Gruppe und den MAC- oder IP-Adressen aller ihrer Geräte. Geben Sie in der Spalte „MAC/IP“ einen Teil des Namens, die MAC- oder IP-Adresse ein und wählen Sie das Gerät aus der Liste der Fritz!Box aus (Geräte des Reiters „Geräte“ werden ebenfalls angezeigt). Eine Adresse, die nicht in der Liste enthalten ist, kann einfach eingegeben werden. Alternativ kann anstelle einer Adresse auch der Hostname des Geräts in der Fritz!Box eingegeben werden (z. B. „example.com“). `Annas-iPhone` Groß- und Kleinschreibung spielt keine Rolle – es funktioniert, solange das Gerät in der Fritz!Box nicht umbenannt wird. Die Adressen werden durch Kommas getrennt gespeichert (z. B. 192. ... `AA:BB:CC:DD:EE:FF, 192.168.178.23, Annas-iPhone` Eine IP-Adresse funktioniert nur, wenn die Fritz!Box dem Gerät immer dieselbe Adresse zuweist („Diese IPv4-Adresse immer zuweisen“ in der Fritz!Box). Ein Smartphone mit privater WLAN-Adresse lässt sich besser über IP-Adresse oder Hostnamen als über seine wechselnde MAC-Adresse überwachen. IP-Adressen und Hostnamen benötigen die Hostliste der Fritz!Box; eine Box ohne diese Liste überwacht nur MAC-Adressen. Sobald eines ihrer Geräte aktiv ist, ist eine Person anwesend. Alles Weitere ist unten aufgeführt. `tr-064.0.presence`:

| Zustand                                                              | Inhalt                                                                                                              |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `persons.<name>.present`                                             | `true` während die Person zu Hause ist                                                                              |
| `persons.<name>.lastArrival` /`lastDeparture`                        | wann die Person das letzte Mal kam / ging (Frau, `0` (noch nicht bekannt)                                            |
| `persons.<name>.presentSince` /`absentSince`                         | Minuten seitdem, `0` im anderen Staat                                                                                |
| `persons.<name>.presentToday` /`absentToday`                         | Minuten anwesend/abwesend seit Mitternacht                                                                          |
| `persons.<name>.devices`                                             | die aktiven Geräte der Person                                                                                       |
| `persons.<name>.history`                                             | Die letzten Einträge als JSON, die neuesten zuerst: `[{"ts": 1791799596991, "present": false}]`                      |
| `present`, `allPresent`                                              | Alle sind zu Hause                                                                                                  |
| `presentCount`, `absentCount`, `presentNames`, `absentNames`, `json` | Wer ist zu Hause und wer nicht?                                                                                     |
| `groups.<group>.*`                                                   | Gleiches gilt wie oben für die Personen einer Gruppe                                                                |
| `guests.present`, `count`, `names`, `json`                           | aktive Geräte des Gastnetzwerks (Option "Gäste erkennen")                                                           |
| `unknown.present`, `count`, `names`, `json`                          | Aktive Geräte, die weder unter „Geräte“ noch unter „Personen“ aufgeführt sind (Option „Unbekannte Geräte erkennen“) |

Ein Smartphone schaltet sein WLAN im Standby-Modus ab. Bei der Einstellung „Abwesend nach (Minuten)“ wird eine Person nur dann als abwesend gezählt, wenn alle ihre Geräte für diese Minuten inaktiv sind; `lastDeparture` Dies ist dann der Zeitpunkt, an dem das letzte Gerät offline ging. Die erste Messung nach der Einrichtung ist „kein Ereignis“: `lastArrival` Und `lastDeparture` bleiben `0` bis die Person zum ersten Mal kommt oder geht. Zeiten, Summen und der Verlauf bleiben auch nach einem Neustart des Adapters erhalten.

Für einen längeren Verlauf aktivieren Sie eine Verlaufsinstanz (History, SQL oder InfluxDB). `persons.<name>.present` Die Widgets lesen die Ereignisse von dort. Die Objekte einer Person, die aus der Tabelle entfernt wird, werden beim nächsten Start gelöscht.

### Anrufbeantworter (auf Deutsch: `Anrufbeantworter`)

Sie können den Anrufbeantworter über den Status ein- und ausschalten. `states.ab` Mit dem Staat `states.abIndex` Sie wählen die Nummer des Anrufbeantworters (0 = die erste). Alternativ schreiben Sie `<index>,<on>` hinein `states.ab` z.B. `1,0` schaltet den zweiten Anrufbeantworter aus (`0`, `false` Und `off` (mean off).

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
- **Präsenz** (`Tr064Presence`): die konfigurierten Geräte mit Anwesenheits-/Abwesenheitsstatus, Zugangspunkt und Frequenzband - oder, mit "Modus" = Personen, die Personen der Registerkarte "Personen" (optional einer Gruppe) mit Angabe, seit wann sie zu Hause oder abwesend sind, und der Anzahl der Gäste.
- **Person** (`Tr064Person` Eine Person, ausgewählt anhand ihres Namens. Symbol, Bild und Text für Anwesenheit und Abwesenheit sowie die Farben sind frei wählbar. Angezeigt werden, seit wann die Person zu Hause oder abwesend ist, wann sie zuletzt gekommen und gegangen ist, die Tagessumme und – falls das Widget hoch genug ist – die letzten Ankünfte und Abgänge. Die Daten stammen aus einer Verlaufsdatenbank (History, SQL, InfluxDB), falls eine Protokollierung erfolgt. `present` ansonsten vom Staat `history` des Adapters.
- **Wi-Fi-QR-Code** (`Tr064GuestWlan` Der QR-Code des Gast-WLANs oder des eigenen WLANs (2,4 GHz, 5 GHz und, falls vorhanden, ein zweites 5-GHz- oder 6-GHz-Band) mit Netzwerkname und Passwort wird per Kamera gescannt. „Code anzeigen“: Im Widget, in einem Dialog nach einem Klick oder in einem Dialog nach PIN-Eingabe. Der Dialog schließt sich nach 60 Sekunden automatisch (einstellbar, 0 = nie).

ioBroker.devices: Das Widget **FRITZ!Box** kann in allen vier Größen (1x1, 2x0,5, 2x1, 2x2) einer Kategorie hinzugefügt werden. In den Widget-Einstellungen wird die Adapterinstanz ausgewählt. Das Widget „ **Person“** zeigt eine Person (ausgewählt anhand ihres Namens) mit Foto oder Symbol, den Texten und Farben der Einstellungen sowie dem Datum der letzten Ankunft und Abreise an. Ein Klick öffnet die An- und Abreisen der letzten Tage. Das Widget **„WLAN-QR-Code“** zeigt den QR-Code des Gast-WLANs oder eines Frequenzbands des eigenen WLANs in denselben drei Modi wie in vis-2 an. Die PIN-Eingabe erfolgt über das PIN-Pad von ioBroker.devices.

Der QR-Code erfordert einen Fritz!Box-Benutzer mit den richtigen "FRITZ!Box-Einstellungen" (`GetSecurityKeys` Der Adapter liest SSID und Passwort nur auf Anfrage eines Widgets (Nachricht). `guestWlan`, `{ wlan: "guest" | "wlan24" | "wlan50" | "wlan52" | "wlan60" }` Das Gast-WLAN (ohne PIN) speichert die Daten nicht und protokolliert sie nicht. Der QR-Code des eigenen WLANs ermöglicht den Zugriff auf das Heimnetzwerk: Er kann mit einer PIN oder nur im Dialog angezeigt werden. Im Dialogmodus ist das Passwort nur lesbar, solange der Dialog geöffnet ist. Die PIN wird im VIS-Projekt oder in den Kacheleinstellungen gespeichert: Sie schützt Gäste vor dem Code, bietet aber keinen Schutz vor Änderungen am Projekt.

Die Widgets benötigen die Zustände der Adapterversion mit diesen Widgets (`states.boxModel`, `states.wan*`, ...) und die laufende Instanz für die Netztopologie.

### Webkomponenten

Die gleichen fünf Kacheln sind auch Webkomponenten (`common.webComponents`,[`@iobroker/web-components`](https://github.com/ioBroker/web-components) ) für Hosts wie Aura oder Admin: `iob-tr064-fritzbox`, `iob-tr064-mesh`, `iob-tr064-presence`, `iob-tr064-person` Und `iob-tr064-guest-wlan` Jedes einzelne ist ein ES-Modul in `admin/webcomponents/` Mit dem zugehörigen Manifest; React wird vom Host geladen. Sie passen sich mithilfe von Containerabfragen an ihre Größe an, übernehmen die Farben des Host-Themes und führen im Editor des Hosts keine Aktionen aus. vis-2 und ioBroker.devices zeigen weiterhin ihre eigenen Widgets an.

Die Einstellungen entsprechen denen der Widgets, jedoch ohne das reine Vis-2-Styling (keine Karte, eigene Symbole pro Bundesstaat). Die Komponente „ **Person“** wählt die Person anhand ihres Kanals aus (`tr-064.0.presence.persons.<name>`) statt seines Namens, und die Komponenten **-Mesh-Topologie** beginnt mit der Ansicht ihrer Einstellungen - was die Symbolleiste umschaltet, wird nicht gespeichert.

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

### Nachrichten für Skripte und KI-Agenten

`sendTo('tr-064.0', 'help', {})` Antworten `{ help, commands }`: eine Beschreibung aller Nachrichten (`presence`, `discovery`, `mesh`, `guestWlan`, `setHostName`, ...) und der zu schaltenden Zustände, geschrieben für KI-Agenten (z. B. ioBroker.pi-agent) und Skriptautoren; `commands` listet jede Nachricht auf `write: true` Wenn es etwas ändert.

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
### **WORK IN PROGRESS**
* (@GermanBluefox) Fixed: writing `<index>,0` (or `false`, `off`) into `states.ab` switches the answering machine off instead of on
* (@GermanBluefox) Fixed: after a restart the answering machine selected in `states.abIndex` is used again instead of the first one

### 5.5.0 (2026-11-19)
* (@GermanBluefox) Added the short form of the web component manifests (tag, name, icon, size) to `common.webComponents`, so that hosts like Aura can list the components before the adapter is installed; the build writes it with `iob-web-components sync-io-package`
* (@GermanBluefox) Added the message "help": a description of all messages for AI agents (e.g. pi-agent), and common.supportedMessages.help

### 5.4.0 (2026-11-08)
* (GermanBluefox) Added web components for Aura and other hosts (`common.webComponents`): FRITZ!Box, mesh topology, presence, person and Wi-Fi QR code

### 5.3.2 (2026-11-04)
* (GermanBluefox) Widget "FRITZ!Box Presence" in the mode "Devices" shows the devices again instead of "0 of 0": the object of a device below `devices` is a state, not a channel (#777)

### 5.3.1 (2026-10-23)
* (GermanBluefox) Widget "Wi-Fi QR code": the QR code can also show the own WLAN (2.4 GHz, 5 GHz, second 5 GHz, 6 GHz) instead of the guest WLAN

### 5.3.0 (2026-10-23)
* (GermanBluefox) New widget "Guest Wi-Fi QR code" for vis-2 and `ioBroker.devices`: the QR code of the guest WLAN on the tile, in a dialog after a click or in a dialog after a PIN

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