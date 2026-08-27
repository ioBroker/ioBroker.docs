---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.agent-dvr/README.md
title: ioBroker.agent-dvr
hash: FndVMZc/c5xH7KZmBMM8n02qGF84wi5MYMsFCtz3xDA=
---
![Logo](../../../en/adapterref/iobroker.agent-dvr/admin/agent-dvr.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.agent-dvr.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.agent-dvr.svg)
![Anzahl der Installationen](https://iobroker.live/badges/agent-dvr-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/agent-dvr-stable.svg)
![NPM](https://nodei.co/npm/iobroker.agent-dvr.png?downloads=true)

# IoBroker.agent-dvr
**Tests:** ![Test und Freigabe](https://github.com/ipod86/ioBroker.agent-dvr/workflows/Test%20and%20Release/badge.svg)

## Agent-DVR-Adapter für ioBroker
Verbindet ioBroker mit [AgentDVR](https://www.ispyconnect.com): erkennt automatisch alle Kameras, spiegelt jede Geräteeigenschaft als Datenpunkte wider, bietet Schaltflächen für alle gängigen Befehle (Aufnahme, Scharfschalten, PTZ, …), liefert Push-getriggerte Galerie-Updates bei neuen Aufnahmen, generiert ein responsives HTML-Galerie-Widget pro Kamera und beinhaltet ein integriertes Live-Dashboard mit Stream-Auswahl pro Kamera (MJPEG, MP4/FLV mit Audio oder go2rtc WebRTC).

## Anforderungen
- ioBroker mit dem `iobroker.web`-Adapter
**AgentDVR ≥ 7.8.0.0** – Frühere Versionen weisen einen Fehler im `streamFile.cgi`-Endpunkt auf (fehlerhafte Chunk-Codierung, falscher MIME-Typ), der die Wiedergabe von Aufnahmen im integrierten Dashboard verhindert. Der Entwickler hat bestätigt, dass die Korrektur in Version 7.8.0.0 enthalten ist.

## Merkmale
- Automatische Erkennung aller AgentDVR-Kameras beim Start (Mikrofone ausgenommen)
- Alle Geräteeigenschaften werden als Datenpunkte abgebildet (aus der API übernommen)
- Gerätespezifische Steuerungstasten: Aufnahme, Schnappschuss, Erkennung, Aktivierungs-/Deaktivierungsalarme, Ein-/Ausschalten, Objekterkennung, Zeitplan ein-/ausschalten, Detektor ein-/ausschalten, Empfindlichkeit (Min./Max./Verstärkung), Datenbereinigung, …
- Systemtasten: Scharfschalten, Unscharfschalten, Alles ein/aus, Nachladen, Speicherverwaltung, Neustart, …
- **Profilauswahl** — beschreibbares Dropdown-Menü, das das aktuelle AgentDVR-Profil anzeigt (Zuhause / Abwesend / Nachts / Benutzerdefiniert)
- **Snapshot als Base64** — `snapshot_b64`-Status pro Kamera, über eine Schaltfläche beschreibbar oder bei jedem Abfragezyklus automatisch aktualisiert
- PTZ-Steuerung mit Halte-zum-Bewegen-Tasten
- Stream-URLs pro Kamera (Schnappschuss, Foto, MJPEG, MP4)
- Webhook-Endpunkt für Echtzeitaktualisierungen – rufen Sie ihn aus einer AgentDVR-Aktion auf, um eine sofortige vollständige Abfrage auszulösen.
- HTML-Aufnahmegalerie-Widget pro Kamera (`widget_recordings`) und Live-Kachel für eine einzelne Kamera (`widget_live`) – reines HTML/CSS oder vollständiger JS-Modus mit Such- und Tag-Filter
- Übersichts-Widget, das alle Kameras in einem HTML-Zustand kombiniert
- **Integriertes Live-Dashboard** unter `http://<iobroker>:<webport>/agent-dvr.0/` — keine zusätzliche App erforderlich:
- Auswahl des Streams pro Kamera: MJPEG, MP4/FLV mit Audio oder go2rtc WebRTC/MSE
- Kamerafilter-Schaltfläche in der Kopfzeile (Trichtersymbol) – öffnet ein Popup mit Kontrollkästchen für jede Kamera; ein Badge zeigt an, wie viele Kameras ausgeblendet sind; der Status wird im localStorage gespeichert.
- Echtzeit-Bewegungs- und Alarmindikatoren (gelber/oranger Kachelrand) über Socket.io
- Vollbildansicht mit PTZ-Overlay, Aufnahmefunktion, Stummschaltung und nativer Browser-Vollbildschaltfläche; Kopfzeile wird automatisch ausgeblendet
- Registerkarte „Aufnahmen“ mit Raster-, Zeitleisten- und Ereignisprotokollansicht, Suchfunktion, ausklappbarem Tag-Filter und Videoplayer mit Vor-/Zurück-Navigation
- Aufnahmen direkt aus dem Videoplayer-Fenster löschen (erfordert AgentDVR v7.7.8.0+)
- Anzeigeeinstellungen für Aufnahmen — Das Zahnradsymbol ⚙ in der Auswahl-/Löschleiste passt die Spaltenbreite des Rasters, die maximale Anzahl der angezeigten Aufnahmen und die Sichtbarkeit des Abzeichens an (wird im lokalen Speicher gespeichert).
- Die Kamerafarben werden von AgentDVR ausgelesen und auf die Zeitleistenbalken und Aufzeichnungspunkte angewendet.
- PTZ-Voreinstellungen — Navigieren Sie über das PTZ-Overlay zu gespeicherten Voreinstellungen (erfordert AgentDVR v7.7.8.0+)
Die Statusleiste zeigt die Anzahl der Kameras in der Live-Ansicht und die Anzahl der Aufnahmen/Ereignisse in der Aufnahmeansicht an.
- Automatische Wiederverbindung für alle Stream-Typen nach Netzwerkunterbrechung oder Tab-Wechsel
- Vollständig farblich anpassbar über Adapterkonfiguration

## Konfiguration
### Registerkarte: Verbindung
| Einstellungen | Beschreibung | Standardwerte |
|---------|-------------|---------|
| AgentDVR IP | IP-Adresse des AgentDVR-Servers | — |
| Port | AgentDVR HTTP-Port | `8090` |
| Benutzername | Optionaler Benutzername für die HTTP-Basisauthentifizierung | — |
| Abfrageintervall (s) | Wie oft Daten von AgentDVR abgerufen werden sollen (5–3600) | `30` |
| HTTP-Timeout (ms) | Timeout pro API-Anfrage (1000–30000) | `8000` |
| HTTP-Timeout (ms) | Timeout pro API-Anfrage (1000–30000) | `8000` |

### Registerkarte: Funktionen
**Bedienelemente**

| Einstellungen | Beschreibung | Standardwerte |
|---------|-------------|---------|
| Systemsteuerungstasten | Schaltflächen zum Aktivieren/Deaktivieren/Neustarten/… und Profilauswahl erstellen | `true` |
| Stream-URLs generieren | URL-Zustände (Snapshot, MJPEG, MP4) pro Kamera erstellen | `true` |
| Snapshot als Base64 | Automatisches Abrufen und Speichern des aktuellen Frames als Base64 bei jeder Abfrage | `false` |
| Snapshot als Base64 | Aktuellen Frame bei jeder Abfrage automatisch als Base64 abrufen und speichern | `false` |

**Veranstaltungen**

| Einstellungen | Beschreibung | Standardwerte |
|---------|-------------|---------|
| Ereignisdatenpunkte | Metadaten der Spiegelaufzeichnung (letztes Ereignis, Anzahl, Tags, …) pro Kamera | `true` |

**Anzeige**

| Einstellungen | Beschreibung | Standardwerte |
|---------|-------------|---------|
| Übersichts-Widget | Einzelner HTML-Zustand, der alle Live-Kacheln der Kamera kombiniert | `true` |

**Proxy**

| Einstellungen | Beschreibung | Standardwerte |
|---------|-------------|---------|
| Medienproxy | MJPEG-Streams, Snapshots, Aufzeichnungsminiaturen und Videos über ioBroker weiterleiten | `false` |

**Debuggen**

| Einstellungen | Beschreibung | Standardwerte |
|---------|-------------|---------|
| Rohes API-JSON speichern | Die vollständige getObjects-Antwort in `system.raw_getObjects` | `false` schreiben |

### Registerkarte: Dashboard
**Standardansicht**

| Einstellungen | Beschreibung | Standardwerte |
|---------|-------------|---------|
| Standardansicht | Welcher Tab wird beim Laden des Dashboards geöffnet: Live oder Aufzeichnungen? | `Live` |
| Maximale Gesamtanzahl an Aufnahmen | Maximale Anzahl der im Dashboard angezeigten Aufnahmen aller Kameras (neueste zuerst). Unabhängig vom Widget-Limit. | `200` |
| Maximale Gesamtanzahl an Aufnahmen | Maximale Anzahl der im Dashboard angezeigten Aufnahmen aller Kameras (neueste zuerst). Unabhängig vom Widget-Limit. | `200` |

**Kameraraster**

| Einstellungen | Beschreibung | Standardwerte |
|---------|-------------|---------|
| Spalten | Anzahl der Rasterspalten (0 = automatische Anpassung an die Kachelbreite) | `0` |
| Position des Tag-Badges | Ecke, in der das Kamera-Namensschild auf jeder Kachel erscheint | `bottom-right` |
| Position des Kameranamens | Ecke, in der der Kameranamen auf jeder Kachel erscheint | `unten rechts` |

**Strom**

| Einstellungen | Beschreibung | Standardwerte |
|---------|-------------|---------|
| Aktualisierungsintervall (s) | Wie oft das Dashboard die Kameradaten neu abruft (10–600) | `60` |
| Automatische Wiederherstellung der Streams | Automatische Wiederherstellung der MJPEG-, MP4/FLV- und go2rtc-Streams nach einem Fehler oder Tab-Wechsel | `true` |

**Farbthema** – 7 Farbauswahlmöglichkeiten passend zu Ihrer Benutzeroberfläche:

| Schauplatz | Beschreibung |
|---------|-------------|
| Hintergrund | Hintergrundfarbe der Seite/des Rasters |
| Oberfläche | Kamerakachel-Hintergrund |
| Akzent | Hervorhebungs- / Aktivelementfarbe |
| Text | Primäre Textfarbe |
| Rand | Farbe des Fliesenrandes |
| Online-Anzeige | Farbe des Online-Statuspunkts |
| Offline-Anzeige | Farbe des Offline-Statuspunkts |

**Streamzuweisung**

Hier weisen Sie jeder Kamera einzeln eine Streamquelle zu. Die Dropdown-Liste zeigt alle von AgentDVR erkannten Kameras an (Mikrofone sind ausgeschlossen).

| Option | Beschreibung |
|--------|-------------|
| MJPEG *(AgentDVR)* | Klassischer MJPEG-Stream, bereitgestellt von AgentDVR – niedrigste Latenz, kein Audio |
| MP4 / FLV mit Audio *(AgentDVR)* | FLV-Stream, der über ioBroker mit flv.js proxied wird — inklusive Audio, korrektes Seitenverhältnis |
| *Streamname* *(go2rtc)* | WebRTC/MSE-Stream von go2rtc — flüssig, geringe Latenz, Audiounterstützung |

Die go2rtc-Streamnamen werden automatisch vom go2rtc-Server abgerufen, sobald die Admin-Oberfläche geöffnet ist. Kann der Browser go2rtc nicht direkt erreichen (z. B. bei gemischten Inhalten über HTTPS), ruft der Adapter sie serverseitig als Fallback ab.

**go2rtc-URL** *(nur sichtbar, wenn mindestens eine Kamera einen go2rtc-Stream verwendet)*

| Einstellung | Beschreibung | Beispiel |
|---------|-------------|---------|
| go2rtc URL | Basis-URL Ihrer go2rtc-Instanz | `http://192.168.1.10:1984` |

**Hinweis:** go2rtc muss die Streams bereits konfiguriert haben. Der Adapter liest lediglich die Streamliste und leitet die WebSocket-Verbindung weiter – er konfiguriert go2rtc nicht.

### Registerkarte: Widget (Galerie-Widget pro Kamera)
**Allgemein**

| Einstellungen | Beschreibung | Standardwerte |
|---------|-------------|---------|
| Widget aktivieren | Pro Kamera ein HTML-Galerie-Widget generieren | `true` |
| Widget-Modus | `Kein JS` – reines HTML/CSS, überall einbettbar; `JS` – volle Interaktivität mit Such- und Tag-Filter | `Kein JS` |

**Layout**

| Einstellungen | Beschreibung | Standardwerte |
|---------|-------------|---------|
| Max. Einträge | Maximale Anzahl der im Widget angezeigten Aufnahmen | `20` |
| Max. Modalbreite (px) | Maximale Breite des Videowiedergabe-Modals | `900` |
| Max. Modalbreite (px) | Maximale Breite des Videowiedergabe-Modals | `900` |

**Tags**

| Einstellungen | Beschreibung | Standardwerte |
|---------|-------------|---------|
| Tags anzeigen | Aufnahmetags auf jedem Miniaturbild anzeigen | `true` |
| Position des Tag-Badges | Ecke, in der die Tags auf dem Vorschaubild erscheinen | `unten links` |

**Filter**

| Einstellungen | Beschreibung | Standardwerte |
|---------|-------------|---------|
| Neueste zuerst | Aufnahmen sortieren, die neueste oben | `true` |
| Kompaktmodus | Dichtes Layout mit kleineren Vorschaubildern | `false` |
| Kompaktmodus | Dichtes Layout mit kleineren Miniaturansichten | `false` |
| Miniaturansichtsgröße | `Small` / `Medium` / `Large` | `Medium` |
| Miniaturansichtsgröße | `Klein` / `Mittel` / `Groß` | `Mittel` |

**Spieler**

| Einstellungen | Beschreibung | Standardwerte |
|---------|-------------|---------|
| Live-Seitenverhältnis | Seitenverhältnis für die Live-Stream-Vorschau, z. B. `16/9` | — |
| Player-URL | Benutzerdefinierte URL für den im Widget verwendeten Videoplayer | — |

**Farbthema** — 5 Farbauswahlfelder + abgerundete Ecken:

| Schauplatz | Beschreibung |
|---------|-------------|
| Kartenhintergrund | Widget-Kartenhintergrund |
| Tag-Hintergrund | Tag-Chip-Hintergrund |
| Tag-Text | Textfarbe des Tag-Chips |
| Akzentfarbe | Hervorhebungsfarbe |
| Modal-Hintergrund | Video-Modal-Hintergrund |
| Radius der Ecken (px) | Abgerundeter Eckenradius für Karten | `4` |

### Registerkarte: Erweitert
| Einstellungen | Beschreibung | Standardwerte |
|---------|-------------|---------|
| Maximale Rekursionstiefe | Anzahl der Ebenen, um die das API-JSON in Datenpunkte umgewandelt wird (1–10) | `6` |
| Dynamische Tags | Automatische Erstellung eines Tag-Datenpunkts für jedes eindeutige Aufzeichnungs-Tag | `false` |
| Dynamische Tags | Für jedes eindeutige Aufzeichnungs-Tag automatisch einen Tag-Datenpunkt erstellen | `false` |
| Tags ignorieren (durch Komma getrennt) | Aufzeichnungs-Tags, die von Ereignisdatenpunkten ausgeschlossen werden sollen | — |
| Tag-Filter (kommagetrennt) | Nur Ereignisdatenpunkte für Aufzeichnungen erstellen, die diesen Tags entsprechen | — |

## Live-Dashboard
Der Adapter liefert ein integriertes Live-Dashboard unter `http://<iobroker>:<webport>/agent-dvr.0/`.

Eine zweite Instanz ist unter `/agent-dvr.1/`, eine dritte unter `/agent-dvr.2/` usw. erreichbar.

**Merkmale:**

- Auswahl des Streams pro Kamera: MJPEG, MP4/FLV mit Audio (über flv.js) oder go2rtc WebRTC/MSE
- Kamerafilter-Schaltfläche (Trichtersymbol, Kopfzeile oben rechts) – öffnet ein Popup mit Kontrollkästchen für jede Kamera und einem „Alle“-Schalter; die Anzeige zeigt die Anzahl der ausgeblendeten Kameras an; der Status wird im lokalen Speicher gespeichert.
- Vollbildansicht mit PTZ-Overlay, Aufnahmetaste, Stummschalttaste und nativem Browser-Vollbildmodus (Kopfzeile wird nach 3 Sekunden Inaktivität automatisch ausgeblendet; erscheint wieder bei Maus- oder Touch-Eingabe)
- Echtzeit-Bewegungs- (gelber Rahmen) und Alarmindikatoren (oranger Rahmen) über Socket.io
- Automatische Wiederverbindung: MJPEG und FLV stellen die Verbindung nach einem Fehler wieder her; go2rtc stellt die Verbindung nach einem unerwarteten WebSocket-Abbruch oder einer Wartezeit von 10 Sekunden wieder her.
- Registerkarte „Aufnahmen“ mit Raster-, Zeitleisten- und Ereignisprotokollansicht, Suchfunktion, ausklappbarem Tag-Filter und Videoplayer mit Vor-/Zurück-Navigation
- Der Tag-Filter teilt die durch Kommas getrennten Tags von AgentDVR in einzelne Chips zur Filterung pro Tag auf.
- Aufnahmen im Videoplayer-Fenster löschen oder mehrere Aufnahmen durch langes Drücken auswählen und massenhaft löschen (erfordert AgentDVR v7.7.8.0+)
- Anzeigeeinstellungen für Aufnahmen – ⚙ Zahnradsymbol in der Auswahl-/Löschleiste; Schieberegler für die Spaltenbreite des Rasters, Überschreibung der maximalen Anzahl an Aufnahmen und Badge-Umschaltung – alles im lokalen Speicher gespeichert
- Das Symbol für neue Aufnahmen auf der Registerkarte „Aufnahmen“ zeigt an, wie viele Aufnahmen seit Ihrem letzten Besuch auf dieser Registerkarte eingegangen sind; der Basiswert wird im localStorage des Browsers gespeichert und ist browser- bzw. gerätespezifisch (wird nicht zwischen verschiedenen Browsern oder Geräten geteilt).
- Die Kamerafarben werden von AgentDVR ausgelesen und auf die Zeitleistenbalken und Aufzeichnungspunkte angewendet.
- PTZ-Voreinstellungen – Navigation zu gespeicherten Voreinstellungen über das PTZ-Overlay; ein einzelner Auswahldatenpunkt pro Kamera (erfordert AgentDVR v7.7.8.0+)
Die Statusleiste zeigt die Anzahl der Kameras, die CPU-/RAM-Auslastung und den freien Speicherplatz an.
- Farbgestaltung über Adapterkonfiguration

### Go2rtc WebRTC-Streams
[go2rtc](https://github.com/AlexxIT/go2rtc) bietet flüssige WebRTC/MSE-Streams mit niedriger Latenz und Audio.

**Aufstellen:**

1. Installieren und starten Sie go2rtc und konfigurieren Sie Ihre Kamerastreams in der go2rtc-Konfiguration.
2. Weisen Sie im Menü „Adapterkonfiguration“ auf der Registerkarte „Dashboard“ jeder Kamera den gewünschten go2rtc-Streamnamen aus der Dropdown-Liste zu.
3. Geben Sie die **go2rtc-URL** ein, die unterhalb der Tabelle angezeigt wird (z. B. `http://192.168.1.10:1984`).
4. Speichern und neu starten. Der Adapter leitet WebSocket-Datenverkehr über ioBroker weiter, um browserübergreifende Beschränkungen zu umgehen.

## Medienproxy
Der Adapter leitet alle Medien über ioBroker, sodass der Browser keine direkte Verbindung zu AgentDVR benötigt. Aktivieren Sie **Medienproxy** auf der Registerkarte „Funktionen“.

| Was wird über den Proxy geleitet? | Proxy deaktiviert | Proxy aktiviert |
|-----------------|-----------|----------|
| MJPEG-Livestream | Direkte AgentDVR-URL | `/agent-dvr.0/api/mjpeg?oid=…` |
| Aufzeichnungsminiaturen | Direkte AgentDVR-URL | `/agent-dvr.0/api/thumb?oid=…` |
| Videoaufzeichnung | Direkte AgentDVR-URL | `/agent-dvr.0/api/media?oid=…` |
| Videoaufzeichnung | Direkte AgentDVR-URL | `/agent-dvr.0/api/media?oid=…` |
| FLV-Livestream | **immer über ioBroker** | **immer über ioBroker** |
| go2rtc WebSocket | **immer über ioBroker** | **immer über ioBroker** |

FLV und go2rtc laufen unabhängig von den Einstellungen immer über ioBroker – der Browser kann keine ursprungsübergreifenden Anfragen direkt an diese Endpunkte senden.

### Wann aktivieren?
- Sie greifen von außerhalb Ihres Heimnetzwerks auf das Dashboard zu, wenn AgentDVR nicht direkt über den Browser erreichbar ist.
- Nur ioBroker ist extern zugänglich (z. B. über einen Reverse-Proxy oder ein VPN, das ausschließlich auf ioBroker zugreift).

### Wann man es ausschalten sollte
- Browser und AgentDVR befinden sich im selben Netzwerk (lokaler Zugriff).
- Direkte Verbindung ist schneller – kein zusätzlicher Zwischenknoten, geringere Latenz.
- Geringere Belastung des ioBroker-Servers – Streams werden nicht über Node.js geleitet

Die Einstellung wird sofort nach dem Speichern wirksam – ein Neustart ist nicht erforderlich.

## Datenpunkte
`<cam>` steht für `cam_<oid>_<name>`, z.B. `cam_8_Reolink`.

### System
| Datenpunkt | Typ | R/W | Beschreibung |
|-----------|------|-----|-------------|
| `system.online` | Boolescher Wert | R | Verbindung zu AgentDVR hergestellt |
| `system.lastPoll` | Nummer | R | Unix-Zeitstempel der letzten Abfrage |
| `system.cameraCount` | Nummer | R | Anzahl der erkannten Kameras |
| `system.disk_free_gb` | Nummer | R | Freier Speicherplatz in GB |
| `system.settings.*` | verschiedene | R | Abgeflachte AgentDVR-Servereinstellungen |
| `system.stats.*` | verschiedene | R | CPU-/RAM-/Festplattenstatistiken |
| `system.status.*` | verschiedene | R | Systemstatus (aktiviert, Geräte, Version, …) |
| `system.raw_getObjects` | Zeichenkette | R | Rohes getObjects-JSON (falls aktiviert) |
| `system.raw_getObjects` | Zeichenkette | R | Rohes getObjects-JSON (falls aktiviert) |

### Systemsteuerung *(erfordert "Systemsteuerungstasten")*
| Datenpunkt | Typ | R/W | Beschreibung |
|-----------|------|-----|-------------|
| `system.control.arm` | Taste | W | System aktivieren |
| `system.control.allOn` | Taste | W | Alle Geräte einschalten |
| `system.control.allOff` | Taste | W | Alle Geräte ausschalten |
| `system.control.reloadConfig` | Schaltfläche | W | AgentDVR-Konfiguration neu laden |
| `system.control.reloadObjects` | Schaltfläche | W | Objekte neu laden |
| `system.control.runStorageMgmt` | Schaltfläche | W | Speicherverwaltung ausführen |
| `system.control.blockExternal` | Schaltfläche | W | Externen Zugriff blockieren |
| `system.control.unblockExternal` | Schaltfläche | W | Externen Zugriff entsperren |
| `system.control.restart` | Schaltfläche | W | AgentDVR neu starten |
| `system.control.refresh` | Schaltfläche | W | Sofortige Abfrage erzwingen |
| `system.profile.selector` | Nummer | R/W | Aktiver Profilindex — Dropdown (0 = Zuhause, 1 = Auswärts, …) |
| `system.profile.list` | Zeichenkette | R | Verfügbare Profile als JSON-Array |
| `system.profile.list` | Zeichenkette | R | Verfügbare Profile als JSON-Array |

### Pro Kamera
| Datenpunkt | Typ | R/W | Beschreibung |
|-----------|------|-----|-------------|
| `<cam>.name` | Zeichenkette | R | Kameraname |
| `<cam>.data.connected` | boolesch | R | Stream ist verbunden |
| `<cam>.data.recording` | Boolescher Wert | R | Aktuell wird aufgezeichnet |
| `<cam>.data.detected` | Boolesch | R | Bewegung/Objekt erkannt |
| `<cam>.data.detectorActive` | Boolesch | R | Bewegungserkennung aktiviert |
| `<cam>.data.alertsActive` | Boolescher Wert | R | Warnungen aktiviert |
| `<cam>.data.alerted` | Boolescher Wert | R | Aktuell aktiver Alarm |
| `<cam>.data.scheduleActive` | Boolescher Wert | R | Zeitplan aktiviert |
| `<cam>.data.width` / `height` | Nummer | R | Streamauflösung |
| `<cam>.data.*` | verschiedene | R | Alle weiteren Geräteeigenschaften von AgentDVR |
| `<cam>.snapshot_b64` | Zeichenkette | R | Aktueller Frame als `data:image/jpeg;base64,…` (Rolle `media.picture`) |
| `<cam>.control.record` | Taste | W | Aufnahme starten |
| `<cam>.control.recordStop` | Taste | W | Aufnahme stoppen |
| `<cam>.control.recordRestart` | Taste | W | Aufnahme neu starten |
| `<cam>.control.triggerRecord` | Taste | W | Aufnahme auslösen (läuft bis zum Timeout) |
| `<cam>.control.snapshot` | Schaltfläche | W | AgentDVR anweisen, einen Snapshot auf der Festplatte zu speichern |
| `<cam>.control.refreshSnapshotB64` | Schaltfläche | W | Aktuellen Frame abrufen und in `snapshot_b64` schreiben |
| `<cam>.control.detect` | Taste | W | Bewegungserkennung auslösen |
| `<cam>.control.alertOn` | Taste | W | Alarme aktivieren |
| `<cam>.control.alertOff` | Taste | W | Alarme deaktivieren |
| `<cam>.control.switchOn` | Taste | W | Kamera einschalten |
| `<cam>.control.switchOff` | Taste | W | Kamera ausschalten |
| `<cam>.control.objectDetectOn` | Schaltfläche | W | Objekterkennung aktivieren *(nur Kameras)* |
| `<cam>.control.objectDetectOff` | Schaltfläche | W | Objekterkennung deaktivieren *(nur Kameras)* |
| `<cam>.control.scheduleOn` | Schaltfläche | W | Gerätezeitplan aktivieren |
| `<cam>.control.scheduleOff` | Schaltfläche | W | Gerätezeitplan deaktivieren |
| `<cam>.control.detectorOn` | Taste | W | Bewegungsmelder aktivieren |
| `<cam>.control.detectorOff` | Taste | W | Bewegungsmelder deaktivieren |
| `<cam>.control.sensitivityMin` | Nummer 0–100 | R/W | Detektorempfindlichkeit — Mindestschwelle *(nur Kameras)* |
| `<cam>.control.sensitivityMax` | Nummer 0–100 | R/W | Detektorempfindlichkeit — Maximalschwelle *(nur Kameras)* |
| `<cam>.control.sensitivityGain` | Nummer 0–100 | R/W | Detektorempfindlichkeit — Verstärkung *(nur Kameras)* |
| `<cam>.control.recOnAlert` | Schaltfläche | W | "Aufzeichnung bei Alarm" aktivieren |
| `<cam>.control.recOnDetect` | Schaltfläche | W | "Aufzeichnung bei Erkennung" aktivieren |
| `<cam>.control.purge` | Taste | W | Alle Aufnahmen dieser Kamera löschen |
| `<cam>.control.purge` | Schaltfläche | W | Alle Aufnahmen dieser Kamera löschen |

### PTZ *(erfordert "PTZ-Steuertasten")*
| Datenpunkt | Typ | R/W | Beschreibung |
|-----------|------|-----|-------------|
| `<cam>.control.ptz.left` | Schalter | R/W | Schwenken nach links (halten zum Weiterschwenken) |
| `<cam>.control.ptz.up` | Schalter | R/W | Neigung nach oben |
| `<cam>.control.ptz.down` | Schalter | R/W | Neigung nach unten |
| `<cam>.control.ptz.upLeft` | Schalter | R/W | Diagonal oben links |
| `<cam>.control.ptz.upRight` | Schalter | R/W | Diagonal nach oben rechts |
| `<cam>.control.ptz.downLeft` | Schalter | R/W | Diagonal unten links |
| `<cam>.control.ptz.downRight` | Schalter | R/W | Diagonal unten rechts |
| `<cam>.control.ptz.zoomIn` | Schalter | Lese-/Schreibzugriff | Vergrößern |
| `<cam>.control.ptz.zoomOut` | Schalter | R/W | Herauszoomen |
| `<cam>.control.ptz.stop` | Taste | W | PTZ-Bewegung stoppen |
| `<cam>.control.ptz.center` | Taste | W | In die Mittel-/Ausgangsposition bewegen |
| `<cam>.control.ptz.preset` | Nummer | Lese-/Schreibzugriff | Voreinstellungsauswahl — Schreibindex, um zu dieser Voreinstellung zu springen; Statusaufzählung listet Voreinstellungsnamen auf (erfordert AgentDVR v7.7.8.0+) |
| `<cam>.control.ptz.preset` | Nummer | Lese-/Schreibzugriff | Voreinstellungsauswahl – Index schreiben, um zu dieser Voreinstellung zu springen; Statusaufzählung der Voreinstellungsnamen (erfordert AgentDVR v7.7.8.0+) |

### Stream-URLs *(erfordert "Stream-URLs generieren")*
| Datenpunkt | Typ | R/W | Beschreibung |
|-----------|------|-----|-------------|
| `<cam>.urls.snapshot` | Zeichenkette | R | URL zum aktuellen JPEG-Schnappschuss *(nur Kameras)* |
| `<cam>.urls.mjpeg` | Zeichenkette | R | URL zum MJPEG-Livestream *(nur Kameras)* |
| `<cam>.urls.mp4` | Zeichenkette | R | URL zum MP4-Livestream *(nur Kameras)* |
| `<mic>.urls.audio_mp3` | Zeichenkette | R | URL zum MP3-Audiostream *(nur Mikrofone)* |
| `<mic>.urls.audio_ogg` | Zeichenkette | R | URL zum OGG-Audiostream *(nur Mikrofone)* |
| `<mic>.urls.audio_ogg` | Zeichenkette | R | URL zum OGG-Audiostream *(nur Mikrofone)* |

### Veranstaltungen / Galerie *(nur Kameras)*
| Datenpunkt | Typ | R/W | Beschreibung |
|-----------|------|-----|-------------|
| `<cam>.events.*` | verschiedene | R | Metadaten der letzten Aufzeichnung — erfordert "Ereignisdatenpunkte" |
| `<cam>.widget_live` | Zeichenkette | R | HTML-Live-Kachel für eine einzelne Kamera – erfordert „Galerie-Widget“; Snapshot-Aktualisierung bei jeder Adapterabfrage |
| `<cam>.widget_live` | Zeichenkette | R | HTML-Live-Kachel für eine einzelne Kamera — erfordert "Galerie-Widget"; Snapshot wird bei jeder Adapterabfrage aktualisiert |

## Webhook
Der Adapter stellt einen Webhook-Endpunkt bereit, der eine sofortige vollständige Abfrage von AgentDVR auslöst:

```
GET http://<iobroker>:<webport>/agent-dvr.0/webhook
```

Ersetzen Sie `agent-dvr.0` durch die tatsächliche Instanznummer (`agent-dvr.1` usw.), wenn Sie mehrere Instanzen ausführen.

Konfigurieren Sie diese URL als **Aktion** in AgentDVR (Kamera → Bearbeiten → Benachrichtigungen → Aktionen → URL), um Echtzeit-Updates zu erhalten, sobald eine Aufnahme beendet oder eine Benachrichtigung ausgelöst wird. Der Adapter ruft dann umgehend alle Kameradaten, Aufnahmen und Systemstatistiken neu ab – ein Warten auf den nächsten Abfragezyklus ist nicht erforderlich.

Gibt bei Erfolg `{"ok":true}` zurück.

### Übersicht *(erfordert das "Übersichts-Widget")*
| Datenpunkt | Typ | R/W | Beschreibung |
|-----------|------|-----|-------------|
| `widget_live_overview` | Zeichenkette | R | HTML-Kachelraster aller Kameras – Snapshot-Aktualisierungen bei jeder Adapterabfrage |

## Changelog

### 0.5.2 (2026-08-05)
* (ipod86) feat: rename `overview` DP to `widget_live_overview` for consistent naming

### 0.5.1 (2026-08-05)
* (ipod86) feat: per-instance URL routing — each adapter instance uses its own URL namespace (`agent-dvr.0/`, `agent-dvr.1/`, …)
* (ipod86) feat: rename per-camera recording widget DP from `widget` to `widget_recordings`; add new `widget_live` DP with a single-camera live tile

### 0.5.0 (2026-08-03)
* (ipod86) feat: replace live-view camera chip-bar with compact header filter button — funnel icon opens a popover with per-camera checkboxes and drag-to-reorder; order persisted in localStorage
* (ipod86) feat: new-recordings badge on the Recordings tab — shows count of recordings since last visit; persisted per browser/device in localStorage
* (ipod86) feat: recording display settings panel — ⚙ gear button in the select/delete bar; grid column width slider, max-recordings override, badge toggle (all persisted in localStorage)
* (ipod86) feat: first-visit onboarding modals for live view (camera filter & sort) and recordings tab (gestures, gear panel, badge)
* (ipod86) feat: webhook endpoint `/agent-dvr.0/webhook` triggers immediate full poll — configure as AgentDVR action for real-time updates
* (ipod86) feat: PTZ presets — navigate to saved presets from PTZ overlay; single selector DP `<cam>.control.ptz.preset` per camera (requires AgentDVR v7.7.8.0+)
* (ipod86) feat: add event log view to recordings panel (clock icon toggle) alongside grid and timeline
* (ipod86) feat: delete recording from video modal (trash icon, two-click confirm, requires AgentDVR v7.7.8.0+)
* (ipod86) feat: bulk-delete recordings — long-press a tile to enter select mode, checkbox each recording, delete all at once
* (ipod86) feat: new `dashMaxRec` config setting — limits total recordings shown across all cameras in the dashboard (independent of widget limit, default 200)
* (ipod86) feat: tag filter splits AgentDVR's comma-separated tags into individual chips for per-tag filtering
* (ipod86) feat: read camera color from AgentDVR and use it for timeline bars and recording dots
* (ipod86) feat: status bar shows CPU usage, RAM % and free, disk usage % and free alongside camera/recording counts
* (ipod86) feat: reset colors to defaults button in Live Dashboard settings tab
* (ipod86) refactor: remove per-camera pushTrigger data points in favour of the global webhook
* (ipod86) fix: new-recordings badge now correctly visible (display:none CSS fallback fixed)
* (ipod86) fix: record button moved to rightmost position in grid tiles and fullscreen panel
* (ipod86) fix: camera filter button no longer changes appearance when cameras are hidden
* (ipod86) fix: header z-index lifted so the camera filter popover renders above the main content area
* (ipod86) fix: drive object pruning regex corrected; stale drive entries are now properly removed
* (ipod86) fix: deleted recordings no longer reappear after the next adapter poll
* (ipod86) fix: extend video format error message with AgentDVR auto-convert hint in all 11 languages
* (ipod86) fix: FLV stream and grid tile layout scaling corrections
* (ipod86) fix: Italian i18n string with apostrophe broke page JS (changed to escaped variant)
* (ipod86) fix: detect AgentDVR "Command not found" response on delete and show proper error message

### 0.4.3 (2026-07-19)
* (ipod86) fix: switch polling loop from setInterval to setTimeout to prevent concurrent poll runs
* (ipod86) fix: httpTimeoutMs=0 now correctly clamps to 1000ms instead of falling back to default
* (ipod86) fix: go2rtcEnabled config flag is now honored in fetchGo2rtcStreams
* (ipod86) fix: remove unused isSupportedLang export from widget-i18n

### 0.4.2 (2026-07-12)
* (ipod86) fix: FLV stream proxy now sends Authorization header (HTTP 401 with AgentDVR auth)
* (ipod86) fix: dashboard camera online status was read from wrong state path (data.online → status.online)
* (ipod86) fix: MP4/FLV stream label was hardcoded German — now translated in all 11 languages
* (ipod86) fix: admin UI default values now match io-package.json (dashTagPosition, widgetAnzahl, widgetBorderRadius)
* (ipod86) fix: go2rtcEnabled flag now respected when loading streams in admin UI
* (ipod86) fix: enableStreamProxy missing from native defaults in io-package.json

### 0.4.1 (2026-07-12)
* (ipod86) fix: overview tile links to ioBroker host; go2rtc URL shown only when enabled

### 0.4.0 (2026-07-12)
* (ipod86) feat: optional MJPEG and snapshot stream proxy through ioBroker (browser needs only one connection to ioBroker, not directly to AgentDVR)

### 0.3.0 (2026-07-06)
* (ipod86) feat: add scheduleOn/Off and detectorOn/Off control buttons for cameras and microphones
* (ipod86) feat: add sensitivityMin, sensitivityMax, sensitivityGain level states for cameras (0–100)
* (ipod86) feat: add audio_mp3 and audio_ogg URL states for microphones
* (ipod86) fix: restrict objectDetectOn/Off and snapshot buttons to cameras (ot=2) only
* (ipod86) feat: inline flv.js into dashboard HTML — no external file required
* (ipod86) fix: preserve FLV stream aspect ratio after tab visibility change (all three player call sites)
* (ipod86) feat: collapsible tag filter row on recordings and timeline pages
* (ipod86) feat: native browser fullscreen button in live view modal with correct aspect ratio
* (ipod86) feat: live view modal header auto-hides after 3 s of inactivity; reappears on mouse/touch
* (ipod86) fix: add fsEnter, fsExit, filterByLabel, timelineView, closePanel i18n keys in all 10 languages

[Older changelog entries in CHANGELOG_OLD.md](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 ipod86 <david@graef.email>

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