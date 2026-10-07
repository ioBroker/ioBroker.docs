---
chapters: {"pages":{"en/adapterref/iobroker.e3oncan/README.md":{"title":{"en":"ioBroker.e3oncan"},"content":"en/adapterref/iobroker.e3oncan/README.md"},"en/adapterref/iobroker.e3oncan/lib/data-points.md":{"title":{"en":"ioBroker.e3oncan"},"content":"en/adapterref/iobroker.e3oncan/lib/data-points.md"},"en/adapterref/iobroker.e3oncan/README.de.md":{"title":{"en":"ioBroker.e3oncan"},"content":"en/adapterref/iobroker.e3oncan/README.de.md"},"en/adapterref/iobroker.e3oncan/docs/raw-gateway-api.md":{"title":{"en":"Raw-Gateway-API (open3e-esp32 ↔ ioBroker.e3oncan)"},"content":"en/adapterref/iobroker.e3oncan/docs/raw-gateway-api.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.e3oncan/docs/raw-gateway-api.md
title: Raw-Gateway-API (open3e-esp32 ↔ ioBroker.e3oncan)
hash: YgwK2j905os41jd7Jh6rkplqOCaD4jBliTKVscG2rjU=
---
# Raw-Gateway-API (open3e-esp32 ↔ ioBroker.e3oncan)

Referenz für die Rohdaten-Schnittstellen, die dieser Branch für externe Integrationen ergänzt (REST `rawread` /`rawwrite`, MQTT-Raw-Relay, Status- Erkennung, Scan-Delegation) sowie für die Gegenseite in ioBroker.e3oncan, das als erste Software diesen Weg nutzt. Siehe auch die kurze Übersicht im README unter „Rohdaten für externe Integrationen“.

**Umsetzungsstand:** Abschnitt 1 (REST rawread/rawwrite, ohne Service 0x77) und der `rawApiVersion` /`rawWriteEnabled` -Teil von Abschnitt 3 sind implementiert, geflasht und **Ende-zu-Ende gegen die Simulator-Umgebung verifiziert** (`GET /api/rawread` gelesen `rawWriteEnabled` pro `/api/settings` gesetzt, `POST /api/rawwrite` auf DID 396 geschrieben, Little-Endian-Kodierung über Rücklesen bestätigt). Abschnitt 5 (Scan-Umbau auf Firmware-Delegation, nutzt ausschließlich bereits dieses Endpoints – kein neuer Firmware-Code nötig) ist ebenfalls implementiert und **Ende-zu-Ende verifiziert** (Geräte-Scan mit Fortschrittsanzeige, Datenpunkt-Scan mit und ohne Speichern, 7 Geräte / über 1200 DIDs, Varianten-Erkennung inklusive). Abschnitt 2 (Raw-MQTT-Topic für Collect/E380) ist ebenfalls implementiert und **Ende-zu-Ende verifiziert** (0x693 und E380 auf 0x250 kommen sauber per MQTT an, parallel zu normalem UDS-Poll-Betrieb und zu `em380` s eigene Dekodierung). Der Push-Teil von Abschnitt 3 (retained `open3e/status`) ist (`mqtt_pub.c`), **noch nicht gegen echte Hardware verifiziert** (Build ausstehend).

## 1. UDS Lesen/Schreiben (REST)

### GET /api/rawread

Abfrage: `ecu=0x680&did=268,269` (Batch durch Komma-Liste)

Antwort 200:

```json
{
  "ecu": "0x680",
  "results": [
    { "did": 268, "data": "6201..." , "len": 12 },
    { "did": 269, "error": "timeout" }
  ]
}
```

Wichtig für den Scan-Anwendungsfall: Eine nicht antwortende DID ist ein **normaler, erwarteter** Ausgang (die meisten DIDs im Bereich 256–4000 existieren nicht) – kein HTTP-Fehler, sondern ein `error` -Feld pro Ergebnis in einer sonst erfolgreichen Antwort. Nur Transport-/Gateway-Probleme (Bus nicht erreichbar, ECU-Adresse ungültig) sollen als HTTP-Fehler zurückkommen.

Obergrenze für die Batch-Größe pro Aufruf: 10 DIDs. Der ESP32 ist deutlich langsamer als ein Raspi – hier bewusst zurückhaltend, damit die Bus-Owner-Queue nicht zu lange von einem einzelnen Request blockiert wird.

### POST /api/rawwrite

Körper:

```json
{ "ecu": "0x680", "did": 396, "svc": "0x2E", "data": "1600" }
```

`svc`: nur `"0x2E"` **vorerst** —`uds.h` in open3e-esp32 bewusst auf Service 0x77 verzichtet (open3e stuft ihn als experimentell ein, siehe Kommentar dort), das ist keine Lücke, sondern eine bewusste Sicherheitsentscheidung. `rawwrite` ablehnen `"0x77"` deshalb aktuell mit einem klaren Fehler ab; Ob/wie das ergänzt wird, klären wir separat mit boonkerz, bevor dafür Code entsteht.

Antwort folgt der Kon aufbauvention von `/api/write`, nicht einem eigenen `{"ok": false, ...}` -Schema: Erfolg `{"ok": true}` (HTTP 200), Fehler ein HTTP-4xx-Status mit `{"error": "..."}` -Körper.

Gate: eigene Einstellung `rawWriteEnabled`, **getrennt** von `writeEnabled` und default aus —`rawwrite` umgeht bewusst die Datenbank-Prüfungen (bekannt/rw), die `writeEnabled` Heute voraussetzt, ist auch ein größerer Vertrauensschritt und verdient einen eigenen Schalter.

`data` sind die reinen Wertbytes, **ohne** Service-Envelope – für ein zukünftiges `0x77` also nicht das Viessmann-spezifische Präfix (`43 01 82 <didLo> <didHi> <lenCode>` + Padding), das die lokale Implementierung heute noch selbst baut. Das Envelope baut die Firmware, analog dazu, wie sie eingegebene 0x77-Antworten laut README schon heute vollständig decodiert, ohne dass der Aufrufer das Protokoll-Detail sehen muss. Grund: Der ganze Sinn des Raw-Wegs ist, dass ioBroker.e3oncan der einzige Ort bleibt, der die Bedeutung der Bytes kennt — das Envelope ist aber reines Transport-/Service-Framing, kein Datenpunkt-Wissen, und gehört damit konsequent zur selben Schicht wie das ISO-TP-Framing, das die Firmware für `0x2E` ja bereits benötigt.

## 2. Passive Rohdaten (Collect/E380) – MQTT

**Implementiert und Ende-zu-Ende verifiziert** (`raw_relay.c` /`.h`, neues Modul, keine Reassemblierung — ein CAN-Frame rein, ein MQTT-Nachricht raus).

Thema: `<baseTopic>/raw/<id-hex-3-stellig>` z. B. `open3e/raw/251` Die

Payload (JSON, nicht nur Hex – DLC und Zeitstempel werden für die Collect-Geräte-Erkennung in ioBroker.e3oncan verwendet):

```json
{ "dlc": 8, "data": "21fa01b3...", "ts": 1725455669123 }
```

Nur IDs, sterben in der neuen Einstellung `rawCanIds` (Komma-Liste, Standardleerzeichen, pro `/api/settings` GET/PUT und `/api/export`) enthalten sind, werden veröffentlicht — nach dem Muster der bestehenden `collectCanIds` -Einstellung. Unabhängig von decodierten Topics, `points.json` und automatische Erkennung.

### Auf ioBroker.e3oncan-Seite: `rawCanIds` automatisch setzen

`main.js` Berechnet die Menge selbst und schreibt sie pro`PUT
/api/settings ` an jeden Bus mit Gateway-Transport (` computeGatewayRawCanIds()`

- `configureGatewayRawCanIds()`,rufen Sie an `onReady()` nach dem Verbindungsaufbau) – kein manuelles Pflegen durch den Anwender nötig:

* **Beide Energiezähler, alle CAN-IDs, immer** (E380 0x250–0x25D, E3100CB 0x569) – unabhängig davon, ob `e380Active` /`e3100cbActive` gerade aktiviert sind. Grund: die passive Erkennung während des Scans (`lib/udsScan.js`) müssen diese IDs schon sehen, bevor der Anwender überhaupt einen Grund hätte, sie zu aktivieren.
* **Alle vom Geräte-Scan vorgeschlagenen `collectCanId` -Werte** aus der bestätigten Geräte-Tabelle, unabhängig davon, ob der Anwender die Collect-Aktivierung dafür bereits eingeschaltet hat (`collectIdsFromDevices()` In `lib/udsScan.js`, jetzt eine eigenständige, exportierte Funktion – vorher inline in `scanUdsDids()`, jetzt auch von `main.js` wiederverwendet, damit beide Stellen dieselbe Quelle haben).

Eine ID zu Relayen, für die kein Verkehr kommt, kostet nichts; Eine benötigte nicht zu Relayen, bricht Erkennung oder Collect-Betrieb noch. Deshalb bewusst großzügig statt exakt.

### Zwei Stolperfallen, die beim Implementieren tatsächlich auftraten

- **Eine Listener-Spanne über weit auseinanderliegende IDs schluckt fremden Verkehr dazwischen.** `collect.c` s Muster „ein Zuhörer über `[min(ids), max(ids)]`, Filterung im Callback“ ist nur sicher, wenn die konfigurierten IDs eng beieinander liegen. Sobald `rawCanIds` zwei weit auseinanderliegende IDs enthält (z. B. `0x451` und `0x693`), deckt die Spanne dazwischen auch echte UDS-Antwortadressen ab (z. B. `0x690`) – der bestehende Versand in `can_port.c` Routet einen Frame in dieser Spanne **ausschließlich** an den Listener, nie an die ISO-TP-Queue, was den normalen Poll-Betrieb störte (`poll.failures` /`busErrors` deutlich erhöht im Test). Fix: neu `can_port_add_id_listener()` In `can_port.c` /`.h` — wie die Existenz `can_port_add_listener()`, aber nur exakte IDs innerhalb der Spanne werden geroutet, alles andere dazwischen fällt wie gewohnt an die ISO-TP-Queue durch. Bestehende Aufrufer (`collect.c`, `em380.c`) unverändert, weiterhin über die alte Funktion.
- **Zwei Listener möchten dieselbe ID.** `em380.c` anspruchsvolle `0x250–0x25D` bereits exklusiv für die eigene Dekodierung. Da der Versand vor diesem Fix beim ersten Treffer erfolgte `return` ete, sah einen zusätzlichen Raw-Relay-Listener für dieselbe ID nie etwas, solange `em380_enabled` aktiver Krieg. Fix: der Versand in `can_port.c` Ruft jetzt **alle** passenden Listener auf (nicht nur den ersten) und fällt nur an die ISO-TP-Queue durch, wenn **keiner** gepasst hat —`em380.c` Deckt seine eigene Dekodierung weiter ab, während der Raw-Relay-Listener parallel dieselben Frames sieht.
- ** `rawCanIds` wurde beim Schreiben über `PUT /api/settings` stillschweigend abgeschnitten** , sofort `computeGatewayRawCanIds()` (so) beide Energiezähler plus Collect-IDs kombinierte (> 63 Zeichen) — Symptom: der Geräte-Scan meldete „Energiezähler: erkannt“, obwohl E380 zuvor per manuell gesetztem, keine kürzerem `rawCanIds` nachweislich funktionierte. Ursache: `sys_cfg_t.raw_canids` (`app_config.h`) nutzte wie alle anderen Zeichenketten-Felder `CFG_STR_MAX` (64 Byte) — zu klein für bis zu `RAW_RELAY_MAX_IDS` (32) IDs. Korrektur: eigene `CFG_RAW_IDS_MAX` (256 Byte) für `raw_canids`; die lokalen `raw_ids_was` -Kopie in `h_settings_put()` (Änderungserkennung) musste auf die gleiche Größe angepasst werden, sonst hätte sie ihrerseits abgeschnitten und die Änderungserkennung verfälscht.
- ** `gatewayChannel`(ioBroker-Seite) hörte auf das falsche MQTT-Topic-Präfix** , sobald das Gateway mit einem von `"open3e"` abweichenden `mqtt.baseTopic` betrieben wird (z. B. `"open3e32"`). `main.js` reichte beim Aufbau des Kanals nur `brokerUrl` /`username` /`password` durch, nie das Base-Topic —`gatewayChannel` fiel also stumm auf seinen hartkodierten Standard `"open3e"` zurück und abonniert `open3e/raw/+` /`open3e/LWT` /`open3e/status`, während das Gateway tatsächlich unter `open3e32/...` publizierte. Symptom: identisch zum Buffer-Bug oben (Scan meldet „keine Energiezähler/Collect-Geräte erkannt"), obwohl `rawCanIds` korrekt gesetzt war und die MQTT-Nachrichten extern nachweislich ankamen – der Adapter selbst hat sie schlicht nie gesehen, auch die LWT/status-Gesundheitsprüfung lief seither ins Leere (weder gesund noch `onStopped`, einfach nie gefüllt). Fix: neues Config-Feld `canExtGatewayMqttBaseTopic` /`canIntGatewayMqttBaseTopic` (Standard `"open3e"`, muss zum Gateway passen); `gatewayChannel` direkt `rawTopicPrefix` jetzt aus `baseTopic` ab `${baseTopic}/raw`) statt beides unabhängig hartzukodieren.

## 3. Status & Fähigkeits-Erkennung

### Abfrage (REST)

`/api/status` (nicht `/api/sysinfo` — das ist CPU-/Heap-/Task-Diagnostik, der falsche Ort dafür liefert `can.state` und `mqtt.connected` **bereits heute** , unverändert:

```json
{ "can": { "state": "running", ... }, "mqtt": { "connected": true, ... }, ... }
```

`can.state`: `"running"` |`"error-warning"` |`"error-passive"` |`"bus-off"` |`"stopped"` (TWAI-Fahrerzustand, siehe `can_port.h`). ioBroker.e3oncan liest das beim Verbindungsaufbau – kein neuer Endpoint nötig, nur die beiden vorhandenen Felder nutzen.

Neu (in `/api/status`, `/api/settings`, `/api/export` /`/api/import`, neben `writeEnabled`): `rawApiVersion` (aktuell `1`, für Firmware-Versions-Erkennung) und `rawWriteEnabled` (siehe Abschnitt 1, Tor für `rawwrite`).

### Push (MQTT)

Neuer, **behielt** Thema bei `open3e/status`, veröffentlicht bei jeder Zustandsänderung:

```json
{ "can": "running", "mqtt": true, "tec": 0, "rec": 0 }
```

Behalten, damit ein neu verbundener Client den aktuellen Zustand sofort erhält, ohne auf die nächste Änderung warten zu müssen. Für den Fall, dass die Firmware selbst komplett weg ist (Absturz, Stromausfall), bleibt das bestehen `open3e/LWT` zuständig — Dafür braucht es keinen Heartbeat auf `open3e/status` zusätzlich.

### Auf ioBroker.e3oncan-Seite

Der Gateway-Transport abonniert `open3e/LWT` und `open3e/status` beim Verbindungsaufbau und speist daraus **dasselbe** `info.connection` -State, den heute schon `onCanExtStopped` /`onCanIntStopped` für den lokalen Bus setzen (`true` nur wenn LWT=online _und_ `can` ="läuft"). Damit sieht ein gestörter Gateway-Betrieb für den Rest des Adapters — und für einen künftigen Watchdog nach demselben Muster wie bei #255 — genauso aus wie ein gestörter lokaler Bus. Solange `info.connection=false`, werden keine neuen `rawread` /`rawwrite` -Anfragen abgeschickt, statt sie ins Leere laufen und timeouten zu lassen.

**Wichtig:** `evaluateHealth()` In `lib/canGatewayChannel.js` Wertet erst aus, sobald _beide_ Themen mindestens einmal gemeldet haben (`lwtKnown` und `statusKnown` Solange die Firmware `open3e/status` nicht veröffentlicht, bleibt `statusKnown` für immer `false` —`onStopped` feuert dann nie, auch nicht bei einem echten Ausfall. Der Push-Teil hier ist auch kein Nice-to-have, sondern Voraussetzung dafür, dass die Gateway-Verbindungsüberwachung überhaupt funktioniert.

**Selbstheilung:** Anders als der lokale Bus (#255: Worker halten ihre Kanal-Referenz seit dem Aufbau, ein sicheres In-Place-Reconnect ist deshalb bewusst nicht vorgesehen) bleibt der MQTT-Client von `gatewayChannel` nach einem `onStopped` am Leben, statt ihn abzureißen – genau um `open3e/LWT` und `open3e/status` weiter zu beobachten. Kehrt der gesunde Zustand zurück (`mqtt.js` s eigener Reconnect vorausgesetzt), feuert ein neues Event `onRecovered` Die `main.js` handelt darauf mit`this.terminate('...',
EXIT_CODES.START_IMMEDIATELY_AFTER_STOP) ` — ein vollständiger, sauberer Adapter-Neustart, kein Versuch, Worker im laufenden Betrieb neu aufzusetzen. Das ist im Wesentlichen dasselbe, was der externe #255-Watchdog tut (Instanz neu starten, sobald` info.connection ` wieder gebraucht wird), nur ereignisgesteuert und ohne das separate Skript — für Gateway-Betrieb reicht das eigene, eingebaute Neustart-Signal aus, ein externer Watchdog bleibt aber weiterhin nötig für den Fall, dass die Firmware selbst nie mehr antwortet (dafür gibt es kein` onRecovered `, per Definition). Kein eigenes Rate-Limiting eingebaut:` onRecovered` feuert nur bei einer echten Erholung, nie bei fortgesetztem Ausfall, und js-controller hat einen eigenen Schutz vor Neustart-Schleifen.

## 4. ioBroker.e3oncan – Transportabstraktion

- **UDS Lesen/Schreiben:** `lib/canUds.js` S `uds` -Klasse ist kein reiner Protokoll-Codec, sondern ein sich selbst steuernder Worker (eigene Kommando-Queue, State-Subscriptions, Timeout-/Statistik-Handling). Eine vorgeschaltete Fassade passt hier nicht. Stattdessen: neue Klasse `udsGateway`, die von `uds` **erbt** und nur die drei Stellen mit Frame-I/O überschreibt —`readByDid`, `writeByDid2E`, `writeByDid77` Diese rufen statt `sendFrame()` +Warten auf die `msgUds` -Staatsmaschine direkt `rawread` /`rawwrite` (1) auf und lösen bei Erfolg `decodeDataCAN()`
  - `setDidDone()` aus (genau das, was `msgUds` beim Abschluss der SF/MF-Zusammensetzung heute tut), bei Fehler gleichen Callback-/Log-Pfade wie `onTimeout` Die `sendFrame` /`msgUds` werden für Gateway-Worker nie aufgerufen. Alles andere (Warteschlange, Terminplanung, `onUdsStateChange`, Statistik) bleibt erhalten und unverändert. Auswahl per neuem Config-Feld `transport` (`'local'` Standard /`'gateway'`) an den Worker-Konstruktionsstellen: `main.js:setupUdsWorkers`, `lib/udsScan.js` (Geräte- und DID-Scan), plus Weiterreichen an `startupUdsWorkerService77` In `canUds.js` Die
- **Passive Rohdaten (Collect/E380):** `lib/canCollect.js` Kennt `socketcan` gar nicht — es decodiert nur aus einem transportunabhängigen Nachrichtenformat (`msg.id`, `msg.data`, `msg.ts_sec/ts_usec`). Genauso wenig weiß der Versand dazu (`main.js: onCanMsgExt` /`onCanMsgInt`) oder die Ad-hoc-Listener in `lib/udsScan.js` (Collect-Geräte-Erkennung, Energy-Meter-Listener) `socketcan` direkt — sie hängen nur von der Kanal-Event-Schnittstelle ab. Deshalb reicht hier ein neues Gateway-Kanalobjekt, das gleiche `addListener('onMessage', cb)` /`addListener('onStopped', cb)` /`start()` /`stop()` -Schnittstelle wie der heutige socketcan-Kanal bereitstellt, gespeist aus (2) — und tritt einfach an die Stelle von `this.channelExt` /`this.channelInt` Die `lib/canCollect.js`, `onCanMsgExt` /`onCanMsgInt` und die Ad-hoc-Listener in `lib/udsScan.js` Dadurch bleiben sie **vollständig unverändert** .
- Neue Verbindungsart in `admin/jsonConfig.json` pro Bus (ext/int): „CAN-Interface (lokal)“ vs. „Gateway (open3e-esp32)“ — bei Gateway: REST-Basis-URL, MQTT-Broker-URL/Zugangsdaten, MQTT-Base-Topic (muss zum Gateway-eigenen `mqtt.baseTopic` passen, su — Standard `"open3e"`, daraus leiten `gatewayChannel` Sowohl das Raw-Topic-Präfix (`<baseTopic>/raw`) als auch `<baseTopic>/LWT` /`<baseTopic>/status` ab; ein explizites `rawTopicPrefix` in der Kanal-Konfiguration überschreibt nur den Raw-Teil, für den unwahrscheinlichen Fall, dass der abweicht).

## 5. Geräte-/Datenpunkt-Scan im Gateway-Betrieb

**Nicht** wie beim lokalen Bus über einzelne `rawread` -Aufrufe pro Kandidatenadresse/DID (das würde bei gestaffelt-aber-gleichzeitig gestarteten Anfragen hinter der Firmware-eigenen Bus-Owner-Queue aufstauen und in Client-Timeouts laufen — Größenordnung Sekunden statt der \~1 Min./ECU, die ein nativer Scan braucht). Stattdessen: die komplette Geräte-/DID-Existenz-Erkennung an die bereits vorhandene, schnelle Scan-Engine der Firmware delegieren.

### Ablauf

1. `POST /api/scan` mit `{"mode": "known"}` (Standard; `"full"` als Option für undokumentierte DIDs, deutlich langsamer) — startet Geräte- **und** DID-Scan als einen durchgehenden Firmware-Lauf (`SCAN_ECUS` →`SCAN_DIDS` →`SCAN_DONE`, nicht zwei separate startbare Vorgänge).
2. `GET /api/status` Pollen `scan.phase` /`scan.probed` /`scan.total` /`scan.curDid` für eine **echte Fortschrittsanzeige** im Geräte-Scan-Dialog nutzen (die Firmware liefert das ohnehin für ihre eigene Web-UI, kein Mehraufwand).
3. Nach `scan.phase == "done"`: `GET /api/system` einmalig abholen — liefert pro ECU Metadaten (`prop`, `function`, `sw`, `hw`, `vin`, `ident`) **und** alle gefundenen DIDs als `[did, Antwortlänge]` -Paare. Keine Werte, nur Existenz+Länge – passt zu unserem Prinzip, dass ioBroker.e3oncan der einzige Ort bleibt, der Bytes deutet.

Zwei Stolperfallen, die beim Implementieren tatsächlich reingefallen sind, für spätere Referenz:

- `addrHex` kommt großgeschrieben zurück (`"0x6A1"`), während ioBroker.e3oncan überall sonst kleingeschriebene Hex-Strings verwendet (`toString(16)` in JS ist immer smallcase) – ohne Normalisierung liefen Lookups für jede Adresse mit einem Hex-Buchstaben (a/b/c/d/e/f) ins Leere.
- Das Ergebnis aus (3) nur im Adapter-Prozessspeicher zu halten reicht nicht: Das Bestätigen der Geräteliste im Scan-Dialog speichert die Adapter-Config, was einen Adapter-Neustart auslöst — der Cache ist dann weg. Der DID-Scan muss `/api/system` bei Bedarf selbst erneut abholen (kein neuer Scan nötig, die Firmware hält ihr letztes Ergebnis ohnehin persistent auf ihrer eigenen Storage-Partition).

### Zweistufigkeit bleibt erhalten

Der bestehende UX-Grund für getrennten Geräte-/DID-Scan (Anwender kann Gerätenamen ändern, bevor darunter irgendetwas im Objektbaum gespeichert wird) bleibt bestehen, nur die Mechanik dahinter ändert sich:

- **Geräte-Scan-Dialog** : löst intern bereits den kompletten Lauf aus (1)–(3) aus, zeigt aber weiterhin nur die Geräteliste zum Bestätigen/ Umbenennen — die DID-Existenz-Infos liegen im Hintergrund schon bereit. Dauert dadurch spürbar länger als der bisherige reine Adress-Sweep (Sekunden bis niedrige Minuten statt Sekunden) — Fortschrittsanzeige (siehe oben) fängt das ab.
- **Datenpunkt-Scan** (nach Bestätigung): „Speichern“ bedeutet **nicht** „lesen oder nicht lesen“ — in beiden Fällen werden die gefundenen DIDs gelesen und decodiert, das ist nötig, um gerätespezifische Varianten (per Antwortlänge) zu erkennen und die Metadaten (`didsDictDevCom`, Schreibbarkeit) anzulegen/zu aktualisieren. Der Unterschied liegt allein darin, ob dabei **neue** Objekte im Baum angelegt werden – das geregelt `storage.js` s bereits `suppressStateStorage` -Prüfung bereits transportunabhängig, dafür war keine Gateway-spezifische Änderung nötig. Technisch: kein Batching über `rawread` (die Batch-Fähigkeit aus Abschnitt 1 wird hier nicht) — stattdessen die bestehende, bereits pro Worker sequenzielle Kommando-Queue (`readByDid` je DID) unverändert weiterverwenden, nur mit der auf tatsächlich ist DIDs eingeschränkten Kandidatenliste aus (3) statt einem blinden 256–4000-Sweep. Jeem Gerät einen eigenen Worker startete, gestaffelt um 500 ms. Das reichte in der Praxis aus (Ende-zu-Ende gegen die Simulator-Umgebung verifiziert: 1215 DIDs über 6 Geräte, vereinzelte reguläre Retries, sauber durchgelaufen in rund einer Minute, kein Timeout-Stau) — kein Konkurrenzproblem mehr, weil das _nach_ dem Firmware-Scan läuft, nicht parallel dazu.

### Sammel-/Energiezähler-Erkennung — bleibt unabhängig davon offen

Weder die Firmware-Scan-Engine noch der neue Ablauf oben erkennen Collect-Geräte oder Energiezähler (E380/E3100CB) — beide antworten nicht auf Anfragen, sondern senden nur, das ist prinzipiell nicht per Request/Response scannbar. Das gilt für open3e-esp32 selbst genauso (`em380_enabled` /`collect_enabled` sind dort manuelle Schalter ohne Auto-Erkennung).

Was ioBroker.e3oncan heute an Komfort bietet, bleibt aber teilweise nutzbar, auch ohne Abschnitt 2:

- **Zuordnung** Gerätetyp → wahrscheinliche Collect-CAN-ID (`prop` -Feld aus `/api/system` z. B. `HPMUMASTER` →`0x693`, statische Tabelle `udsDevName2CanId`): funktioniert sofort, ganz ohne Rohdaten-Quelle — reine Zuordnung auf Basis von Scan-Daten, die schon da sind. Als **unbestätigter Vorschlag** wird der Anwender manuell aktiviert.
- **Live-Bestätigung** (läuft auf dieser CAN-ID tatsächlich Traffic): benötigt weiterhin das Raw-MQTT-Topic aus Abschnitt 2 — keine zusätzliche Firmware-Änderung darüber hinaus nötig, aber ohne das keine Bestätigung.