---
chapters: {"pages":{"en/adapterref/iobroker.waip-web/README.md":{"title":{"en":"ioBroker.waip-web"},"content":"en/adapterref/iobroker.waip-web/README.md"},"en/adapterref/iobroker.waip-web/README.de.md":{"title":{"en":"ioBroker.waip-web"},"content":"en/adapterref/iobroker.waip-web/README.de.md"},"en/adapterref/iobroker.waip-web/LOGGING.md":{"title":{"en":"Logging reference"},"content":"en/adapterref/iobroker.waip-web/LOGGING.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.waip-web/LOGGING.md
title: Protokollierungsreferenz
hash: 68UQtc7B0d9mf0Z1mVPMZh7CvqRS2K4aqfw6driNIn4=
---
# Protokollierungsreferenz
Dies ist eine vollständige Referenz aller Logmeldungen, die dieser Adapter erzeugen kann, gruppiert nach Ebene, mit Ursache und Beispieltext. Sie dient dazu, eine Meldung im ioBroker-Log schnell nachzuschlagen - was sie ausgelöst hat, ob Handlungsbedarf besteht und was (falls überhaupt) anschließend automatisch geschieht.

Bezugnehmend auf den Hauptabschnitt [README](/#/adapters/waip-web#logging).

## Konventionen, denen dieser Adapter folgt
- Der gesamte Protokolltext ist in **Englisch**, unabhängig vom ioBroker-System.

Sprache (nur der für die Benutzeroberfläche sichtbare Text, wie z. B. Administratorbezeichnungen, wird übersetzt) - gemäß [offizielle ioBroker-Protokollierungsrichtlinien](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md#logging).

- Für Bedingungen, die **wiederkehrend** auftreten können, während der Adapter in Betrieb ist

(Erneuerung von Session-Cookies, WAIP-Registrierung, die Socket.IO-Verbindung selbst und eine Flut von Ereignissen, die den falschen Monitor betreffen), folgt der Adapter dem in den Richtlinien empfohlenen Muster, anstatt jedes Vorkommen auf derselben Ebene zu protokollieren:

- **erstes Auftreten** → `Warnung` (oder `Fehler`, für den entsprechenden Fehlerfall).

von `handler.exec`/`wrapHandlerWithMonitorCheck`)

- **Jedes Vorkommen, solange es besteht** → `debug` (sichtbar mit

`debug`/`silly` Protokollierungsstufe, sodass nichts verloren geht, aber die Standardprotokollierung `info` wird nicht mehr wiederholt)

- **Wiederherstellung** → `info`, genau einmal protokolliert, plus ein

`<key>_recovered` Eintrag in `debug.monitorAudit`

- Doppelte Nachrichten (identischer Text innerhalb von 5 Sekunden) werden unterdrückt durch

Ein interner Deduplizierungs-Cache (`safeLog()`) sorgt dafür, dass bei einer Häufung identischer Fehler aufgrund desselben Fehlers nur eine einzige Protokollzeile entsteht.

- Es werden keine sensiblen Daten (Session-Cookie-Wert, vollständige URLs mit Anmeldeinformationen) gespeichert.

Protokolliert wurden lediglich Statuscodes, Ablaufzeitstempel und Fehlermeldungen.

## Fehler
Etwas ging verloren oder konnte nicht verarbeitet werden - es lohnt sich immer, einen Blick darauf zu werfen.

| Quelle | Ursache | Beispiel |
| --- | --- | --- |
| `handler.exec` | Ein empfangenes Ereignis (`io.new_waip`/`io.new_rmld`/`io.routes`/`io.playtts`/`io.standby`) entsprach dem registrierten Monitor, aber sein Handler löste bei der Verarbeitung eine Ausnahme aus - die Daten des Ereignisses wurden nicht angewendet. | `handler.exec: Cannot read properties of undefined (reading 'lat')` |
| `handleAlarm` | Ein `io.new_waip` (neuer Vorfall) Ereignis konnte nicht verarbeitet werden. | `handleAlarm: <error message>` |
| `handleRueckmeldung` | Ein `io.new_rmld`-Ereignis (Feedback des Antwortenden) konnte nicht verarbeitet werden. | `handleRueckmeldung: <error message>` |
| `handleStandby` | Ein `io.standby`-Ereignis konnte nicht verarbeitet werden - der Vorfallverlauf/Live-Status sind möglicherweise inkonsistent. | `handleStandby: <error message>` |
| `handleRoutes` | Ein `io.routes`-Ereignis konnte nicht verarbeitet werden. | `handleRoutes: <error message>` |
| `handleTTS` | Ein `io.playtts`-Ereignis konnte nicht verarbeitet werden. | `handleTTS: <error message>` |
| `handleTTS` | Ein `io.playtts`-Ereignis konnte nicht verarbeitet werden. | `handleTTS: <Fehlermeldung>` |

## Warnung
Irgendetwas stimmt nicht oder ist defekt, aber der Adapter läuft weiter und erholt sich normalerweise von selbst; es lohnt sich, nachzusehen, wenn das Problem erneut auftritt.

| Quelle | Ursache | Beispiel |
| --- | --- | --- |
| `refreshSessionCookie` *(erstes Auftreten, dann `debug`; Wiederherstellung zu `info` über `logRecovered`)* | Die Session-Keepalive-Anfrage ist fehlgeschlagen, oder die Serverantwort enthielt keinen `Set-Cookie`-Header. | `refreshSessionCookie: keepalive response had no Set-Cookie header (status 200)` |
| `socket.emit.WAIP` *(erstes Auftreten, dann `debug`; Wiederherstellung zu `info`)* | Der Registrierungsaufruf `socket.emit('WAIP', …)` selbst hat einen Fehler ausgelöst (z. B. Socket bereits geschlossen). | `socket.emit.WAIP: <error message>` |
| `connect` *(erstes Auftreten, dann `debug`; wird auf `info` zurückgesetzt)* | Der Aufbau der Socket.IO-Verbindung (`io(...)` / Anhängen von Listenern) hat einen Fehler ausgelöst. | `connect: <error message>` |
| `ignoredEvent.wrongMonitor` *(eskaliert von `info`, nur sobald der Schwellenwert erreicht ist; kehrt zu `info` zurück, sobald die Rate sinkt)* | Mehr als 20 Ereignisse für eine andere Monitor-ID sind innerhalb von 5 Minuten eingegangen - normalerweise nur Filterrauschen (siehe `info` unten), aber eine anhaltend hohe Rate bedeutet in der Regel, dass die konfigurierte Monitor-ID falsch ist. | `ignoredEvent.wrongMonitor: Repeatedly receiving events for a different monitor (current=0, 20 in the last 5min) - check the configured monitor ID` |
| *(direkt, nicht dedupliziert/eskaliert)* `checkMissedStandby` | `einsatz.restzeit` ist seit mehr als 60 Sekunden bei 0 hängen geblieben, während ein Vorfall noch als aktiv verfolgt wird - `io.standby` wurde sehr wahrscheinlich übersehen (z. B. eine Trennung zum falschen Zeitpunkt); der Vorfall wird direkt nach dieser Protokollzeile automatisch abgeschlossen. | `Likely missed io.standby detected (ablaufzeit exceeded by more than 60s) - finalizing incident 3fa2...c19 automatically.` |
| `resetAllStates` / `initStateIfMissing <id>` / `clearCurrentEinsatzStates` / `persistEinsatzSnapshot` / `pushEinsatzToHistory` / `updateRueckmeldungCounts` / `einsatz.*.setState` / `handleAlarm.setFields` / `handleServerVersion` / `<id>.setState` (über `setField`) | Ein einzelner `setStateAsync()`-Aufruf wurde abgelehnt (selten - z. B. Objekt noch nicht erstellt oder ein Problem mit der ioBroker-Datenbank). Jeder Standort protokolliert mit seinem eigenen Kontext, sodass der Fehlerzustand identifizierbar ist. | `einsatz.routenGesamt.setState: <error message>` |
| `initObjects channel <id>` / `initObjects state <id>` | Ein einzelner `setObjectNotExistsAsync()`-Aufruf während der Erstellung des Startobjekts wurde abgelehnt - meistens, weil der Adapter gestoppt wurde (z. B. durch einen schnellen Neustart während/direkt nach einem Update), während dieser Vorgang noch lief, sodass die Datenbankverbindung mitten in der Schleife geschlossen wurde. Die verbleibenden Kanal-/Statusdefinitionen werden für diesen Durchlauf übersprungen (und beim nächsten Start wieder aufgenommen), anstatt dass jede einzeln fehlschlägt. | `initObjects state einsatz.rueckmeldungAnzahl: Cannot check object existence of "waip-web.0.einsatz.rueckmeldungAnzahl": Connection is closed.` |
| `io.error (Server)` *(nur für nicht erkannten Fehlertext - siehe `info` unten für den bekannten, selbstheilenden Fall)* | Der Server hat ein `io.error`-Ereignis gesendet, dessen Text **nicht** dem bekannten, selbstheilenden Muster der „Sitzungserneuerung“ entspricht - es ist unklar, ob dies keine Folgen hat. | `io.error (Server): Unbekannter interner Fehler` |
| `buildEinsatzMapImage.tile <zoom>/<x>/<y>` | Beim Erstellen eines [Vorfallskarte](/#/adapters/waip-web#incident-map-image) ist der Download/die Dekodierung einer einzelnen OpenStreetMap-Kachel fehlgeschlagen (z. B. 404/Timeout) - wird toleriert, der betroffene Kachelbereich behält die Hintergrundfarbe der Leinwand bei, der Rest des Bildes ist nicht betroffen. | `buildEinsatzMapImage.tile 16/35205/21493: tile 16/35205/21493 -> HTTP 503` |
| `generateEinsatzMapImage` | Die Generierung des Ereigniskartenbildes ist vollständig fehlgeschlagen (z. B. ist jede Kachel fehlerhaft, das Kartenverzeichnis konnte nicht erstellt werden oder das Schreiben der PNG-Datei ist fehlgeschlagen) - `einsatz.kartenbildPfad` wird explizit gelöscht (nicht auf einem veralteten vorherigen Wert belassen); der Vorfall selbst wird weiterhin normal verarbeitet, nur das Kartenbild fehlt. | `generateEinsatzMapImage: no tiles to fetch for lat=52.52 lon=13.405 zoom=16` |
| `generateEinsatzMapImage.timeout` | Der Wert [Vorfallskarte](/#/adapters/waip-web#incident-map-image) war innerhalb des konfigurierten **OSM-Timeouts** (1-60 s, Standard 10 s) nicht bereit - die Alarmverarbeitung wird ohne ihn fortgesetzt (`einsatz.kartenbildPfad` bleibt für diesen Vorfall leer); der Download/die Zusammenstellung läuft im Hintergrund weiter, das Ergebnis wird jedoch verworfen, sobald es zu spät abgeschlossen ist. | `generateEinsatzMapImage.timeout: image was not ready within the configured OSM timeout of 10s - leaving einsatz.kartenbildPfad empty for this incident` |
| `pruneMapImages` / `pruneMapImages <filename>` | Das Durchsetzen der Beschränkung auf 10 Bilder für [Bilder von Vorfallskarten](/#/adapters/waip-web#incident-map-image) ist fehlgeschlagen - entweder wurde das Kartenverzeichnis aufgelistet (`pruneMapImages`) oder eine bestimmte alte Datei gelöscht (`pruneMapImages <filename>`). Nicht kritisch: Höchstens einige wenige zusätzliche alte Bilder verbleiben bis zum nächsten erfolgreichen Durchlauf auf der Festplatte. | `pruneMapImages einsatz_1787571373962_BIGCIRC0.png: EBUSY: resource busy or locked` |
| `pruneMapImages` / `pruneMapImages <Dateiname>` | Das Durchsetzen der Beschränkung auf 10 gespeicherte Bilder für [Ereigniskartenbilder](/#/adapters/waip-web#incident-map-image) ist fehlgeschlagen - entweder beim Auflisten des Kartenverzeichnisses (`pruneMapImages`) oder beim Löschen einer bestimmten alten Datei (`pruneMapImages <Dateiname>`). Nicht kritisch: Höchstens einige wenige alte Bilder verbleiben bis zum nächsten erfolgreichen Durchlauf auf der Festplatte. | `pruneMapImages einsatz_1787571373962_BIGCIRC0.png: EBUSY: Ressource belegt oder gesperrt` |

## Info
Normalbetrieb - Verbindungs-/Registrierungslebenszyklus, erwartete Wiederherstellungen und erwartete Filterereignisse. Sichtbar auf der Standard-Protokollierungsebene von ioBroker.

| Quelle | Ursache | Beispiel |
| --- | --- | --- |
| *(Bereinigung, beim Adapterstart)* `cleanupObsoleteObjects` | Ein übrig gebliebenes Zustandsobjekt aus einer vorherigen Adapterversion (anhand der Objekt-ID) wurde während der Startmigration gefunden und entfernt. | `Removed obsolete state object from a previous version: tts.last` |
| `refreshSessionCookie` | Der Server hat einen neuen Session-Cookie ausgestellt, da der vorherige ungültig war - Teil des normalen, selbstheilenden Session-Zyklus; löst eine automatische Wiederverbindung aus. | `Session cookie was reissued by the server (old session was invalid) – forcing reconnect` |
| *(via `logRecovered`)* Wiederherstellung des Session-Cookies | Ein zuvor protokollierter Fehler bei der Erneuerung des Session-Cookies (siehe `warn` oben) konnte erneut behoben werden. | `Session cookie refresh recovered` |
| `forceReconnect` | Die Socket.IO-Verbindung wird absichtlich neu aufgebaut (Sitzungscookie wurde rotiert oder der Server hat eine neue Version/Instanz-ID gemeldet). | `Rebuilding the Socket.IO connection (session cookie rotated)` |
| `handleServerVersion` | Die vom Server gemeldete Version/Instanz-ID hat sich zur Laufzeit geändert - üblicherweise durch einen Serverneustart; wird automatisch behandelt (Sitzungsaktualisierung + erneute Verbindung). | `WAIP server reports a new version/instance ID (a1b2 -> c3d4) - likely a server restart` |
| `ignoredEvent.wrongMonitor` *(Normalrate; siehe `warn` oben, sobald sie ansteigt)* | Es ist ein Ereignis eingegangen, dessen Nutzdaten explizit eine andere Monitor-ID angeben als die, bei der diese Instanz registriert ist - erwartete Filterung, kein Fehler. | `ignoredEvent.wrongMonitor: Received an event for a different monitor (current=0)` |
| `wrapHandlerWithMonitorCheck` (über `logRecovered`) | Die WAIP-Registrierung wurde durch ein empfangenes Ereignis (erneut) bestätigt. | `WAIP registration recovered` |
| *(handleStandby)* | Ein `io.standby`-Ereignis wurde empfangen - Vorfall beendet oder der Monitor ist im Leerlauf. | `Standby received - incident ended, or monitor idle` |
| `io.error (Server)` *(nur bekannter Fall)* | Der Server hat die bekannte Fehlermeldung „Fehler beim Erneuern der Sitzung“ gesendet. Diese ist Teil des automatischen Reparaturzyklus des Adapters (ca. 10 Minuten) und behebt sich von selbst. | `io.error (Server): Fehler beim Erneuern der Session` |
| *(onSocketConnect)* | Die Registrierungsnachricht wurde an den Server gesendet. | `socket.emit('WAIP', 12345)` |
| *(onSocketConnect)* | Die Socket.IO-Verbindung zum Namespace `/waip` wurde hergestellt und die Registrierungsnachricht gesendet. | `Connected monitor 12345 -> namespace /waip (registered via WAIP emit)` |
| *(via `logRecovered`)* Verbindungswiederherstellung | Ein zuvor protokollierter Verbindungsaufbaufehler (siehe `warn` oben) konnte bei einem späteren Versuch erfolgreich behoben werden. | `Socket.IO connection recovered` |
| *(onSocketDisconnect, über `logDisconnect`, dedupliziert)* | Die Socket-Verbindung wurde getrennt; eine manuelle Wiederverbindung ist geplant (`reconnection: false`, keine integrierte automatische Wiederverbindung). | `Socket disconnected: transport close` |
| *(Wiederverbindungstimer wird ausgelöst)* | Die geplante manuelle Wiederverbindung nach einer Trennung läuft jetzt. | `manual reconnect triggered for monitor '12345'` |
| `onSocketConnectError` *(über `logDisconnect`, dedupliziert)* | Der erste Verbindungsversuch selbst ist fehlgeschlagen (im Gegensatz zu einer Trennung nach erfolgter Verbindung). | `connect_error: Error: xhr poll error` |
| *(Wiederverbindungstimer wird ausgelöst)* | Die geplante manuelle Wiederverbindung nach einem `connect_error` läuft jetzt. | `manual reconnect after connect_error for monitor '12345'` |
| *(Wiederverbindungstimer ausgelöst)* | Die geplante manuelle Wiederverbindung nach einem `connect_error` wird nun ausgeführt. | `Manuelle Wiederverbindung nach connect_error für Monitor '12345'` |

## Debuggen
Diagnosedetails - nur sichtbar mit Protokollierungsstufe `debug`/`silly`. Enthält jedes wiederholte Auftreten der unter `warn` aufgeführten wiederkehrenden Fehlerbedingungen (Sitzungscookie, Registrierung, Verbindung), sobald diese einmal auf `warn` protokolliert wurden.

| Quelle | Ursache | Beispiel |
| --- | --- | --- |
| `refreshMonitorName` / `getMonitorList` | Das Abrufen/Parsen der Übersichtsseite `/waip/` (für den Monitornamen oder das Admin-Dropdown-Menü) ist fehlgeschlagen - nicht kritisch, beide haben Ausweichmöglichkeiten. | `getMonitorList: <error message>` |
| `forceReconnect(<reason>)` | Es wurde eine erneute Verbindung angefordert, diese wurde jedoch übersprungen, da `connect()` bereits ausgeführt wurde oder aktuell keine Verbindung besteht (der nächste Aufruf von `connect()` wird die Ursache ohnehin ermitteln). | `forceReconnect(session cookie rotated): connect() is already running, skipping the forced reconnect` |
| `appendMonitorAudit` | Das Schreiben eines Eintrags in `debug.monitorAudit` ist fehlgeschlagen - betrifft nur den internen Prüfpfad, nicht die eigentlichen Vorfalldaten. | `appendMonitorAudit: <error message>` |
| *(handleRueckmeldung)* | Ein Feedback-Ereignis für eine andere (bereits abgeschlossene) Vorfall-UUID als die aktuell verfolgte wurde ignoriert. | `Ignoring feedback for a different incident 9a1b...e02 (current=3fa2...c19)` |
| `connect()` Setup | Protokolliert das vom Socket.IO-Modul ausgehandelte Ping-Intervall/Timeout einmal pro Verbindung. | `engine pingInterval=25000 pingTimeout=20000` |
| `connect()` Engine-Pakete *(maximal 10 pro Verbindung)* | Rohdaten von Socket.IO-Engine-Ping-/Pong-/Open-/Close-Paketen - begrenzt, da sie sich während der gesamten Verbindungsdauer wiederholen und nach den ersten Paketen keinen zusätzlichen Diagnosewert mehr liefern. | `engine.packet: {"type":"ping"}` |
| `connect()` Engine-Pakete | Rohdaten eines Nicht-Ping/Pong-Engine-Nachrichtenpakets (auf 200 Zeichen gekürzt). | `engine.packet.message preview: 42/waip,["io.new_waip",{"stichwort":"B2"...` |
| `connect()` Vorschau eingehender Ereignisse *(nur die ersten 6 Ereignisse pro Verbindung)* | Rohdatenvorschau der ersten eingehenden Socket.IO-Ereignisse nach Verbindungsaufbau zur Diagnose der vom Server tatsächlich gesendeten Daten. | `incoming event 'io.new_waip' preview: {"stichwort":"B2","ort":"Musterstadt"...` |
| *(handleAlarm, bevor ein Zustand geändert wird)* | Ein eingehendes `io.new_waip`-Ereignis wurde als Rettungsdienstvorfall (über `einsatzart`) identifiziert und vollständig ignoriert, da das Kontrollkästchen **Rettungsdienstvorfälle verarbeiten** auf der Registerkarte [Rettungsdienst](/#/adapters/waip-web#rescue-service) deaktiviert ist. | `Ignoring rescue-service incident (einsatzart="Rettungseinsatz") - rdAlarmierungEnabled is disabled` |
| `buildEinsatzMapImage` | Die konfigurierte Zoomstufe von [Vorfallskarte](/#/adapters/waip-web#incident-map-image) reichte nicht aus, um das Polygon des Einschlagbereichs vollständig in das Bild einzupassen. Daher zoomte der Adapter automatisch auf die hier gezeigte Stufe heraus, bevor die Kacheln abgerufen wurden. | `buildEinsatzMapImage: zooming out from 16 to 10 so the incident area fits in the image` |
| `buildEinsatzMapImage` | Die konfigurierte Zoomstufe des [Ereigniskartenbildes](/#/adapters/waip-web#incident-map-image) reichte nicht aus, um das Ereignisgebiet vollständig in das Bild einzufügen. Daher hat der Adapter automatisch auf die hier gezeigte Zoomstufe herausgezoomt, bevor die Kacheln abgerufen wurden. | `buildEinsatzMapImage: Herauszoomen von 16 auf 10, damit das Ereignisgebiet in das Bild passt` |

## Audit-Trail (`debug.monitorAudit`)
Unabhängig vom oben genannten Protokollierungsgrad wird außerdem ein fortlaufend aktualisiertes JSON-Array der letzten 200 Lebenszyklusereignisse im Zustand `debug.monitorAudit` gespeichert (siehe [README](/#/adapters/waip-web#debug)). Dieses Array enthält die Einträge `emit_WAIP`, `registration_timeout`, `session_cookie_rotated`, `server_version_changed`, `standby`, `missed_standby_timeout`, `manual_reconnect_triggered`, `manual_reconnect_after_error` sowie einen Eintrag `<key>_recovered` für jede oben gemeldete Wiederherstellung (`sessionCookie_recovered`, `registration_recovered`, `connection_recovered`, `wrongMonitor_recovered`). Nützlich zur Rekonstruktion des Verbindungsverlaufs, ohne dass Debug-Protokolle aktiviert sein müssen.