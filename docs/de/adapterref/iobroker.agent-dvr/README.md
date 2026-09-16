---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.agent-dvr/README.md
title: ioBroker.agent-dvr
hash: dr75B9u2HX5NzWSUHWM9Xte9P0HAg1wZthWZamajoDA=
---
![Logo](../../../en/adapterref/iobroker.agent-dvr/admin/agent-dvr.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.agent-dvr.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.agent-dvr.svg)
![Anzahl der Installationen](https://iobroker.live/badges/agent-dvr-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/agent-dvr-stable.svg)
![NPM](https://nodei.co/npm/iobroker.agent-dvr.png?downloads=true)
![Test und Freigabe](https://github.com/ipod86/ioBroker.agent-dvr/workflows/Test%20and%20Release/badge.svg)

# ioBroker.agent-dvr

## Agent-DVR-Adapter für ioBroker

Verbindet ioBroker mit [AgentDVR](https://www.ispyconnect.com) : Erkennt automatisch alle Kameras, spiegelt jede Geräteeigenschaft als Datenpunkte wider, bietet Schaltflächen für alle gängigen Befehle (Aufnahme, Scharfschalten, PTZ, …), liefert Push-getriggerte Galerie-Updates bei neuen Aufnahmen, generiert ein responsives HTML-Galerie-Widget pro Kamera und beinhaltet ein integriertes Live-Dashboard mit Stream-Auswahl pro Kamera (MJPEG, MP4/FLV mit Audio oder go2rtc WebRTC).

## Anforderungen

- ioBroker mit`iobroker.web` Adapter
- **AgentDVR ≥ 7.8.0.0** – frühere Versionen weisen einen Fehler auf`streamFile.cgi` Ein Endpunkt (fehlerhafte Chunked-Codierung, falscher MIME-Typ) verhindert die Wiedergabe von Aufnahmen im integrierten Dashboard. Der Entwickler hat bestätigt, dass die Korrektur in Version 7.8.0.0 enthalten ist.

## Merkmale

- Automatische Erkennung aller AgentDVR-Kameras beim Start (Mikrofone ausgenommen)
- Alle Geräteeigenschaften werden als Datenpunkte abgebildet (aus der API übernommen).
- Gerätespezifische Steuerungstasten: Aufnahme, Schnappschuss, Erkennung, Aktivierungs-/Deaktivierungsalarme, Ein-/Ausschalten, Objekterkennung, Zeitplan-Ein-/Ausschalten, Detektor-Ein-/Ausschalten, Empfindlichkeit (Min./Max./Verstärkung), Datenbereinigung, …
- Systemtasten: Scharfschalten, Unscharfschalten, Alles ein/aus, Nachladen, Speicherverwaltung, Neustart, …
- **Profilauswahl** – beschreibbares Dropdown-Menü, das das aktuelle AgentDVR-Profil anzeigt (Zuhause / Abwesend / Nachts / Benutzerdefiniert)
- **Snapshot als Base64** —`snapshot_b64` Status pro Kamera, über eine Schaltfläche beschreibbar oder bei jedem Abfragezyklus automatisch aktualisiert
- PTZ-Steuerung mit Halte-zum-Bewegen-Tasten
- Stream-URLs pro Kamera (Schnappschuss, Foto, MJPEG, MP4)
- Webhook-Endpunkt für Echtzeitaktualisierungen – rufen Sie ihn aus einer AgentDVR-Aktion auf, um eine sofortige vollständige Abfrage auszulösen.
- HTML-Aufnahmegalerie-Widget pro Kamera (`widget_recordings` ) und Live-Kachel mit einer Kamera (`widget_live` — reiner HTML/CSS- oder vollständiger JS-Modus mit Such- und Tag-Filter
- Übersichts-Widget, das alle Kameras in einem HTML-Zustand kombiniert
- **Integriertes Live-Dashboard** bei`http://<iobroker>:<webport>/agent-dvr.0/` — keine zusätzliche App erforderlich:
  - Auswahl des Streams pro Kamera: MJPEG, MP4/FLV mit Audio oder go2rtc WebRTC/MSE
  - Schaltfläche für den Kamerafilter in der Kopfzeile (Trichtersymbol) – öffnet ein Popup mit Kontrollkästchen für jede Kamera; ein Badge zeigt an, wie viele Kameras ausgeblendet sind; der Status wird im localStorage gespeichert.
  - Bewegungs- und Alarmindikatoren in Echtzeit (gelber/oranger Kachelrand) über Socket.io
  - Vollbildansicht mit PTZ-Overlay, Aufnahmefunktion, Stummschaltung und nativer Browser-Vollbildschaltfläche; Kopfzeile wird automatisch ausgeblendet
  - Registerkarte „Aufnahmen“ mit Raster-, Zeitleisten- und Ereignisprotokollansicht, Suche, ausklappbarem Tag-Filter und Videoplayer mit Zurück-/Weiter-Navigation
  - Aufnahmen direkt aus dem Videoplayer-Fenster löschen (erfordert AgentDVR v7.7.8.0+)
  - Anzeigeeinstellungen für Aufnahmen — Das Zahnradsymbol ⚙ in der Auswahl-/Löschleiste passt die Spaltenbreite des Rasters, die maximale Anzahl der angezeigten Aufnahmen und die Sichtbarkeit des Abzeichens an (wird im lokalen Speicher gespeichert).
  - Die Kamerafarben werden von AgentDVR ausgelesen und auf die Zeitleistenbalken und Aufzeichnungspunkte angewendet.
  - PTZ-Voreinstellungen – Navigieren Sie über das PTZ-Overlay zu gespeicherten Voreinstellungen (erfordert AgentDVR v7.7.8.0+)
  - Die Statusleiste zeigt die Anzahl der Kameras in der Live-Ansicht und die Anzahl der Aufnahmen/Ereignisse in der Aufnahmeansicht an.
  - Automatische Wiederverbindung für alle Stream-Typen nach Netzwerkunterbrechung oder Tab-Wechsel
  - Vollständig farblich anpassbar über Adapterkonfiguration

## Konfiguration

### Registerkarte: Verbindung

| Einstellung          | Beschreibung                                                | Standard |
| -------------------- | ----------------------------------------------------------- | -------- |
| AgentDVR IP          | IP-Adresse des AgentDVR-Servers                             | —        |
| Hafen                | AgentDVR HTTP-Port                                          | `8090`   |
| Benutzername         | Optionaler Benutzername für die HTTP-Basisauthentifizierung | —        |
| Passwort             | Optionales HTTP-Basisauthentifizierungspasswort             | —        |
| Umfrageintervall (s) | Wie oft sollen Daten von AgentDVR abgerufen werden (5–3600) | `30`     |
| HTTP-Timeout (ms)    | Timeout pro API-Anfrage (1000–30000)                        | `8000`   |

### Registerkarte: Funktionen

**Bedienelemente**

| Einstellung            | Beschreibung                                                                                      | Standard |
| ---------------------- | ------------------------------------------------------------------------------------------------- | -------- |
| Systemsteuerungstasten | Erstellen Sie Schaltflächen zum Aktivieren/Deaktivieren/Neustarten usw. und die Profilauswahl.    | `true`   |
| PTZ-Steuertasten       | PTZ-Halteschalter pro Kamera erstellen (links, rechts, oben, unten, diagonal, Zoom, Stopp, Mitte) | `true`   |
| Stream-URLs generieren | Erstellen Sie URL-Zustände (Snapshot, MJPEG, MP4) pro Kamera                                      | `true`   |
| Snapshot als Base64    | Automatisches Abrufen und Speichern des aktuellen Frames als Base64 bei jeder Abfrage             | `false`  |

**Veranstaltungen**

| Einstellung         | Beschreibung                                                                     | Standard |
| ------------------- | -------------------------------------------------------------------------------- | -------- |
| Ereignisdatenpunkte | Metadaten der Spiegelaufzeichnung (letztes Ereignis, Anzahl, Tags, …) pro Kamera | `true`   |

**Anzeige**

| Einstellung       | Beschreibung                                                       | Standard |
| ----------------- | ------------------------------------------------------------------ | -------- |
| Übersichts-Widget | Ein einziger HTML-Zustand, der alle Live-Kamerakacheln kombiniert. | `true`   |

**Proxy**

| Einstellung  | Beschreibung                                                                            | Standard |
| ------------ | --------------------------------------------------------------------------------------- | -------- |
| Medien-Proxy | MJPEG-Streams, Snapshots, Aufzeichnungsminiaturen und Videos über ioBroker weiterleiten | `false`  |

**Debuggen**

| Einstellung                      | Beschreibung                                                                 | Standard |
| -------------------------------- | ---------------------------------------------------------------------------- | -------- |
| Speichern Sie das rohe API-JSON. | Schreiben Sie die vollständige getObjects-Antwort an `system.raw_getObjects` | `false`  |

### Registerkarte: Dashboard

**Standardansicht**

| Einstellung                         | Beschreibung                                                                                                        | Standard |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------- | -------- |
| Standardansicht                     | Welcher Tab öffnet sich beim Laden des Dashboards: Live oder Aufzeichnungen?                                        | `Live`   |
| Offline-Kameras anzeigen            | Kamerakacheln auch dann anzeigen, wenn die Kamera offline ist                                                       | `true`   |
| Maximale Anzahl Aufnahmen insgesamt | Maximale Anzahl der im Dashboard angezeigten Aufnahmen aller Kameras (neueste zuerst). Unabhängig vom Widget-Limit. | `200`    |

**Kameraraster**

| Einstellung                  | Beschreibung                                                                                   | Standard       |
| ---------------------------- | ---------------------------------------------------------------------------------------------- | -------------- |
| Spalten                      | Anzahl der Rasterspalten (0 = automatische Anpassung an die Kachelbreite)                      | `0`            |
| Schaltflächen immer sichtbar | Die Aufnahme-/PTZ-Tasten werden dauerhaft angezeigt, anstatt nur beim Überfahren mit der Maus. | `false`        |
| Position des Tag-Badges      | Ecke, in der das Kamera-Namensschild auf jeder Kachel erscheint.                               | `bottom-right` |

**Strom**

| Einstellung                               | Beschreibung                                                                                              | Standard |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------- | -------- |
| Aktualisierungsintervall (s)              | Wie oft das Dashboard die Kameradaten neu abruft (10–600)                                                 | `60`     |
| Automatische Wiederverbindung von Streams | Automatische Wiederherstellung der MJPEG-, MP4/FLV- und go2rtc-Streams nach einem Fehler oder Tab-Wechsel | `true`   |

**Farbthema** – 7 Farbauswahlmöglichkeiten passend zu Ihrer Benutzeroberfläche:

| Einstellung      | Beschreibung                       |
| ---------------- | ---------------------------------- |
| Hintergrund      | Seiten-/Rasterhintergrundfarbe     |
| Oberfläche       | Hintergrund der Kamerakachel       |
| Akzent           | Hervorhebungs-/aktive Elementfarbe |
| Text             | Primäre Textfarbe                  |
| Grenze           | Fliesenrandfarbe                   |
| Online-Indikator | Farbe des Online-Statuspunktes     |
| Offline-Anzeige  | Farbe des Offline-Statuspunkts     |

**Stream-Zuweisung**

Hier weisen Sie jeder Kamera einzeln eine Streamquelle zu. Die Dropdown-Liste zeigt alle von AgentDVR erkannten Kameras an (Mikrofone sind ausgeschlossen).

| Option                         | Beschreibung                                                                                                  |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| MJPEG _(AgentDVR)_             | Klassischer MJPEG-Stream von AgentDVR – niedrigste Latenz, kein Ton                                           |
| MP4 / FLV mit Ton _(AgentDVR)_ | FLV-Stream, der über ioBroker mit flv.js weitergeleitet wird – inklusive Audio und korrektem Seitenverhältnis |
| _Streamname_ _(go2rtc)_        | WebRTC/MSE-Stream von go2rtc – flüssig, geringe Latenz, Audiounterstützung                                    |

Die go2rtc-Streamnamen werden automatisch vom go2rtc-Server abgerufen, sobald die Admin-Oberfläche geöffnet ist. Kann der Browser go2rtc nicht direkt erreichen (z. B. bei gemischten Inhalten über HTTPS), ruft der Adapter sie serverseitig als Fallback ab.

**go2rtc-URL** _(nur sichtbar, wenn mindestens eine Kamera einen go2rtc-Stream verwendet)_

| Einstellung | Beschreibung                   | Beispiel                   |
| ----------- | ------------------------------ | -------------------------- |
| go2rtc URL  | Basis-URL Ihrer go2rtc-Instanz | `http://192.168.1.10:1984` |

> **Hinweis:** go2rtc muss die Streams bereits konfiguriert haben. Der Adapter liest lediglich die Streamliste und leitet die WebSocket-Verbindung weiter – er konfiguriert go2rtc nicht.

### Registerkarte: Widget (Galerie-Widget pro Kamera)

**Allgemein**

| Einstellung       | Beschreibung                                                                                             | Standard |
| ----------------- | -------------------------------------------------------------------------------------------------------- | -------- |
| Widget aktivieren | Erzeuge ein HTML-Galerie-Widget pro Kamera                                                               | `true`   |
| Widget-Modus      | `No JS` — reines HTML/CSS, überall einbettbar;`JS` — volle Interaktivität mit Such- und Schlagwortfilter | `No JS`  |

**Layout**

| Einstellung                 | Beschreibung                                        | Standard |
| --------------------------- | --------------------------------------------------- | -------- |
| Max. Einträge               | Maximale Anzahl der im Widget angezeigten Aufnahmen | `20`     |
| Minimale Spaltenbreite (px) | Mindestbreite jeder Miniaturansichtspalte           | `150`    |
| Maximale Modalbreite (px)   | Maximale Breite des Videowiedergabefensters         | `900`    |

**Tags**

| Einstellung             | Beschreibung                                          | Standard      |
| ----------------------- | ----------------------------------------------------- | ------------- |
| Tags anzeigen           | Aufzeichnungs-Tags auf jedem Miniaturbild anzeigen    | `true`        |
| Position des Tag-Badges | Ecke, in der die Tags auf dem Vorschaubild erscheinen | `bottom-left` |

**Filter**

| Einstellung     | Beschreibung                                                | Standard |
| --------------- | ----------------------------------------------------------- | -------- |
| Neueste zuerst  | Sortiere die Aufnahmen, wobei die neueste oben steht.       | `true`   |
| Suche anzeigen  | Ein Textsuchfeld im JS-Modus anzeigen                       | `false`  |
| Kompaktmodus    | Dichtes Layout mit kleineren Vorschaubildern                | `false`  |
| Standard-Tag    | Wählen Sie diesen Tag-Filter beim Laden des Widgets voraus. | —        |
| Miniaturansicht | `Small` /`Medium` / `Large`                                 | `Medium` |

**Spieler**

| Einstellung           | Beschreibung                                                     | Standard |
| --------------------- | ---------------------------------------------------------------- | -------- |
| Live-Seitenverhältnis | Seitenverhältnis für die Live-Stream-Vorschau, z. B.`16/9`       | —        |
| Player-URL            | Benutzerdefinierte URL für den im Widget verwendeten Videoplayer | —        |

**Farbthema** – 5 Farbauswahlfelder + abgerundete Ecken:

| Einstellung                      | Beschreibung                 |
| -------------------------------- | ---------------------------- |
| Kartenhintergrund                | Widget-Kartenhintergrund     |
| Tag-Hintergrund                  | Tag-Chip-Hintergrund         |
| Tag-Text                         | Textfarbe des Etiketts       |
| Akzent                           | Hervorhebungsfarbe           |
| Modaler Hintergrund              | Video-Modal-Hintergrund      |
| Radius der Begrenzungslinie (px) | Abgerundete Ecken für Karten |

### Registerkarte: Erweitert

| Einstellung                            | Beschreibung                                                                           | Standard |
| -------------------------------------- | -------------------------------------------------------------------------------------- | -------- |
| Maximale Rekursionstiefe               | Um wie viele Ebenen ist das API-JSON in Datenpunkte vereinfacht (1–10)?                | `6`      |
| Maximale Array-Einträge                | Maximale Anzahl der gespiegelten Array-Elemente pro Eigenschaft (1–500)                | `30`     |
| Dynamische Tags                        | Automatische Erstellung eines Tag-Datenpunkts für jedes eindeutige Aufzeichnungs-Tag   | `false`  |
| Tags ignorieren (durch Komma getrennt) | Aufzeichnungs-Tags, die von den Ereignisdatenpunkten ausgeschlossen werden sollen      | —        |
| Tag-Filter (durch Komma getrennt)      | Erstellen Sie nur Ereignisdatenpunkte für Aufzeichnungen, die diesen Tags entsprechen. | —        |

## Live-Dashboard

Der Adapter verfügt über ein integriertes Live-Dashboard bei`http://<iobroker>:<webport>/agent-dvr.0/` Eine zweite Instanz ist erreichbar unter`/agent-dvr.1/` , ein Drittel bei`/agent-dvr.2/` , und so weiter.

**Merkmale:**

- Stream-Auswahl pro Kamera: MJPEG, MP4/FLV mit Audio (über flv.js) oder go2rtc WebRTC/MSE
- Kamerafilter-Schaltfläche (Trichtersymbol, Kopfzeile oben rechts) – öffnet ein Popup-Fenster mit Kontrollkästchen für jede Kamera und der Option „Alle“; die Anzeige zeigt die Anzahl der ausgeblendeten Kameras an; der Status wird im lokalen Speicher gespeichert.
- Vollbildansicht mit PTZ-Overlay, Aufnahmetaste, Stummschalttaste und nativem Browser-Vollbildmodus (Kopfzeile wird nach 3 Sekunden Inaktivität automatisch ausgeblendet; erscheint wieder bei Maus- oder Touch-Eingabe)
- Echtzeit-Bewegungs- (gelber Rahmen) und Alarmindikatoren (oranger Rahmen) über Socket.io
- Automatische Wiederverbindung: MJPEG und FLV stellen die Verbindung nach einem Fehler wieder her; go2rtc stellt die Verbindung nach einem unerwarteten WebSocket-Abbruch oder einer 10-sekündigen Pause wieder her.
- Registerkarte „Aufnahmen“ mit Raster-, Zeitleisten- und Ereignisprotokollansicht, Suche, ausklappbarem Tag-Filter und Videoplayer mit Zurück-/Weiter-Navigation
- Der Tag-Filter teilt die durch Kommas getrennten Tags von AgentDVR in einzelne Chips zur Filterung pro Tag auf.
- Aufnahmen im Videoplayer-Fenster löschen oder mehrere Aufnahmen durch langes Drücken auswählen und massenhaft löschen (erfordert AgentDVR v7.7.8.0+).
- Anzeigeeinstellungen für Aufnahmen – ⚙ Zahnradsymbol in der Auswahl-/Löschleiste; Schieberegler für die Spaltenbreite des Rasters, Überschreibung der maximalen Anzahl an Aufnahmen und Badge-Umschaltung – alles im lokalen Speicher gespeichert
- Das Symbol für neue Aufnahmen auf der Registerkarte „Aufnahmen“ zeigt an, wie viele Aufnahmen seit Ihrem letzten Besuch auf dieser Registerkarte eingegangen sind; der Basiswert wird im localStorage des Browsers gespeichert und ist browser- bzw. gerätespezifisch (wird nicht zwischen verschiedenen Browsern oder Geräten geteilt).
- Die Kamerafarben werden von AgentDVR ausgelesen und auf die Zeitleistenbalken und Aufzeichnungspunkte angewendet.
- PTZ-Voreinstellungen – Navigation zu gespeicherten Voreinstellungen über das PTZ-Overlay; ein einzelner Auswahldatenpunkt pro Kamera (erfordert AgentDVR v7.7.8.0+)
- Die Statusleiste zeigt die Anzahl der Kameras, die CPU-/RAM-Auslastung und den freien Speicherplatz an.
- Farbgestaltung über Adapterkonfiguration

### go2rtc WebRTC-Streams

[go2rtc](https://github.com/AlexxIT/go2rtc) bietet flüssige WebRTC/MSE-Streams mit niedriger Latenz und Audio.

**Aufstellen:**

1. Installieren und starten Sie go2rtc und konfigurieren Sie Ihre Kamerastreams in der go2rtc-Konfiguration.
2. Im Menüpunkt „Adapterkonfiguration → _Dashboard“_ weisen Sie jeder Kamera aus der Dropdown-Liste den gewünschten go2rtc-Streamnamen zu.
3. Geben Sie die **go2rtc-URL** ein, die unterhalb der Tabelle angezeigt wird (z. B.`http://192.168.1.10:1984` ).
4. Speichern und neu starten. Der Adapter leitet WebSocket-Datenverkehr über ioBroker weiter, um browserübergreifende Beschränkungen zu umgehen.

## Medienproxy

Der Adapter leitet alle Medien über ioBroker, sodass der Browser keine direkte Verbindung zu AgentDVR benötigt. Aktivieren Sie **den Medienproxy** auf der Registerkarte „Funktionen“.

| Was wird als Proxy verwendet? | Proxy deaktiviert       | Proxy aktiviert                |
| ----------------------------- | ----------------------- | ------------------------------ |
| MJPEG-Livestream              | direkte AgentDVR-URL    | `/agent-dvr.0/api/mjpeg?oid=…` |
| Schnappschuss                 | direkte AgentDVR-URL    | `/agent-dvr.0/api/snap?oid=…`  |
| Miniaturansichten aufnehmen   | direkte AgentDVR-URL    | `/agent-dvr.0/api/thumb?oid=…` |
| Videoaufnahmen                | direkte AgentDVR-URL    | `/agent-dvr.0/api/media?oid=…` |
| FLV-Livestream                | **immer über ioBroker** | **immer über ioBroker**        |
| go2rtc WebSocket              | **immer über ioBroker** | **immer über ioBroker**        |

FLV und go2rtc laufen unabhängig von den Einstellungen immer über ioBroker – der Browser kann keine ursprungsübergreifenden Anfragen direkt an diese Endpunkte senden.

### Wann aktivieren?

- Sie greifen von außerhalb Ihres Heimnetzwerks auf das Dashboard zu, wenn AgentDVR nicht direkt über den Browser erreichbar ist.
- Lediglich ioBroker ist extern zugänglich (z. B. über einen Reverse-Proxy oder ein VPN, das ausschließlich auf ioBroker zugreift).

### Wann sollte man es abstellen?

- Browser und AgentDVR befinden sich im selben Netzwerk (lokaler Zugriff).
- Direkte Verbindung ist schneller – kein zusätzlicher Zwischenknoten, geringere Latenz.
- Geringere Belastung des ioBroker-Servers – Streams werden nicht über Node.js geleitet.

> Die Einstellung wird sofort nach dem Speichern wirksam – ein Neustart ist nicht erforderlich.

## Datenpunkte

`<cam>` steht für`cam_<oid>_<name>` z.B.`cam_8_Reolink` Die

### System

| Datenpunkt              | Typ             | R/W | Beschreibung                                      |
| ----------------------- | --------------- | --- | ------------------------------------------------- |
| `system.online`         | boolescher Wert | R   | Verbindung zu AgentDVR hergestellt                |
| `system.lastUpdate`     | Zeichenkette    | R   | ISO-Zeitstempel der letzten erfolgreichen Umfrage |
| `system.lastPoll`       | Nummer          | R   | Unix-Zeitstempel der letzten Umfrage              |
| `system.cameraCount`    | Nummer          | R   | Anzahl der entdeckten Kameras                     |
| `system.disk_free_gb`   | Nummer          | R   | Freier Speicherplatz in GB                        |
| `system.settings.*`     | verschieden     | R   | Vereinfachte AgentDVR-Servereinstellungen         |
| `system.stats.*`        | verschieden     | R   | CPU-/RAM-/Festplattenstatistik                    |
| `system.status.*`       | verschieden     | R   | Systemstatus (aktiviert, Geräte, Version, …)      |
| `system.raw_getObjects` | Zeichenkette    | R   | Rohes getObjects-JSON (falls aktiviert)           |

### Systemsteuerung _(erfordert "Systemsteuerungsknöpfe")_

| Datenpunkt                       | Typ          | R/W | Beschreibung                                                          |
| -------------------------------- | ------------ | --- | --------------------------------------------------------------------- |
| `system.control.arm`             | Taste        | W   | Aktivieren Sie das System                                             |
| `system.control.disarm`          | Taste        | W   | System deaktivieren                                                   |
| `system.control.allOn`           | Taste        | W   | Alle Geräte einschalten                                               |
| `system.control.allOff`          | Taste        | W   | Alle Geräte ausschalten                                               |
| `system.control.reloadConfig`    | Taste        | W   | AgentDVR-Konfiguration neu laden                                      |
| `system.control.reloadObjects`   | Taste        | W   | Objekte neu laden                                                     |
| `system.control.runStorageMgmt`  | Taste        | W   | Speicherverwaltung ausführen                                          |
| `system.control.blockExternal`   | Taste        | W   | Externen Zugriff blockieren                                           |
| `system.control.unblockExternal` | Taste        | W   | Externen Zugriff freigeben                                            |
| `system.control.restart`         | Taste        | W   | AgentDVR neu starten                                                  |
| `system.control.refresh`         | Taste        | W   | Erzwinge sofortige Abstimmung                                         |
| `system.profile.selector`        | Nummer       | R/W | Aktive Profilübersicht — Dropdown-Menü (0 = Zuhause, 1 = Abwesend, …) |
| `system.profile.list`            | Zeichenkette | R   | Verfügbare Profile als JSON-Array                                     |

### Pro Kamera

| Datenpunkt                         | Typ             | R/W | Beschreibung                                                            |
| ---------------------------------- | --------------- | --- | ----------------------------------------------------------------------- |
| `<cam>.name`                       | Zeichenkette    | R   | Kameraname                                                              |
| `<cam>.data.online`                | boolescher Wert | R   | Die Kamera ist online                                                   |
| `<cam>.data.connected`             | boolescher Wert | R   | Stream ist verbunden                                                    |
| `<cam>.data.recording`             | boolescher Wert | R   | Aktuell wird aufgenommen                                                |
| `<cam>.data.detected`              | boolescher Wert | R   | Bewegung/Objekt erkannt                                                 |
| `<cam>.data.detectorActive`        | boolescher Wert | R   | Bewegungsmelder aktiviert                                               |
| `<cam>.data.alertsActive`          | boolescher Wert | R   | Benachrichtigungen aktiviert                                            |
| `<cam>.data.alerted`               | boolescher Wert | R   | Warnung aktuell aktiv                                                   |
| `<cam>.data.scheduleActive`        | boolescher Wert | R   | Zeitplan aktiviert                                                      |
| `<cam>.data.width` /`height`       | Nummer          | R   | Streamauflösung                                                         |
| `<cam>.data.*`                     | verschieden     | R   | Alle weiteren Geräteeigenschaften von AgentDVR                          |
| `<cam>.snapshot_b64`               | Zeichenkette    | R   | Aktueller Frame als`data:image/jpeg;base64,…` (Rolle`media.picture` )   |
| `<cam>.control.record`             | Taste           | W   | Aufnahme starten                                                        |
| `<cam>.control.recordStop`         | Taste           | W   | Aufnahme stoppen                                                        |
| `<cam>.control.recordRestart`      | Taste           | W   | Aufnahme neu starten                                                    |
| `<cam>.control.triggerRecord`      | Taste           | W   | Triggeraufzeichnung (läuft bis zum Timeout)                             |
| `<cam>.control.snapshot`           | Taste           | W   | Weisen Sie AgentDVR an, einen Snapshot auf der Festplatte zu speichern. |
| `<cam>.control.refreshSnapshotB64` | Taste           | W   | Aktuellen Frame abrufen und schreiben an `snapshot_b64`                 |
| `<cam>.control.detect`             | Taste           | W   | Bewegungserkennung auslösen                                             |
| `<cam>.control.alertOn`            | Taste           | W   | Alarme aktivieren                                                       |
| `<cam>.control.alertOff`           | Taste           | W   | Alarme deaktivieren                                                     |
| `<cam>.control.switchOn`           | Taste           | W   | Kamera einschalten                                                      |
| `<cam>.control.switchOff`          | Taste           | W   | Kamera ausschalten                                                      |
| `<cam>.control.objectDetectOn`     | Taste           | W   | Objekterkennung aktivieren _(nur Kameras)_                              |
| `<cam>.control.objectDetectOff`    | Taste           | W   | Objekterkennung deaktivieren _(nur Kameras)_                            |
| `<cam>.control.scheduleOn`         | Taste           | W   | Aktivieren Sie den Gerätezeitplan                                       |
| `<cam>.control.scheduleOff`        | Taste           | W   | Gerätezeitplan deaktivieren                                             |
| `<cam>.control.detectorOn`         | Taste           | W   | Bewegungsmelder aktivieren                                              |
| `<cam>.control.detectorOff`        | Taste           | W   | Bewegungsmelder deaktivieren                                            |
| `<cam>.control.sensitivityMin`     | Nummer 0–100    | R/W | Detektorempfindlichkeit – Mindestschwelle _(nur Kameras)_               |
| `<cam>.control.sensitivityMax`     | Nummer 0–100    | R/W | Detektorempfindlichkeit – maximaler Schwellenwert _(nur Kameras)_       |
| `<cam>.control.sensitivityGain`    | Nummer 0–100    | R/W | Detektorempfindlichkeit – Verstärkung _(nur Kameras)_                   |
| `<cam>.control.recOnAlert`         | Taste           | W   | „Aufzeichnung bei Alarm“ aktivieren                                     |
| `<cam>.control.recOnDetect`        | Taste           | W   | „Aufzeichnung bei Erkennung“ aktivieren                                 |
| `<cam>.control.purge`              | Taste           | W   | Alle Aufnahmen dieser Kamera löschen                                    |

### PTZ _(erfordert "PTZ-Steuertasten")_

| Datenpunkt                    | Typ      | R/W | Beschreibung                                                                                                                                                  |
| ----------------------------- | -------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<cam>.control.ptz.left`      | schalten | R/W | Schwenken Sie nach links (halten, um die Bewegung fortzusetzen)                                                                                               |
| `<cam>.control.ptz.right`     | schalten | R/W | Schwenken Sie nach rechts                                                                                                                                     |
| `<cam>.control.ptz.up`        | schalten | R/W | Neigen nach oben                                                                                                                                              |
| `<cam>.control.ptz.down`      | schalten | R/W | Neigen nach unten                                                                                                                                             |
| `<cam>.control.ptz.upLeft`    | schalten | R/W | Diagonal oben links                                                                                                                                           |
| `<cam>.control.ptz.upRight`   | schalten | R/W | Diagonal nach oben rechts                                                                                                                                     |
| `<cam>.control.ptz.downLeft`  | schalten | R/W | Diagonal nach unten links                                                                                                                                     |
| `<cam>.control.ptz.downRight` | schalten | R/W | Diagonal nach unten rechts                                                                                                                                    |
| `<cam>.control.ptz.zoomIn`    | schalten | R/W | Vergrößern                                                                                                                                                    |
| `<cam>.control.ptz.zoomOut`   | schalten | R/W | Herauszoomen                                                                                                                                                  |
| `<cam>.control.ptz.stop`      | Taste    | W   | PTZ-Bewegung stoppen                                                                                                                                          |
| `<cam>.control.ptz.center`    | Taste    | W   | Bewegen Sie sich zur Center-/Heimposition                                                                                                                     |
| `<cam>.control.ptz.preset`    | Nummer   | R/W | Voreinstellungsauswahl – Index schreiben, um zu dieser Voreinstellung zu wechseln; Status-Enum-Listen mit Voreinstellungsnamen (erfordert AgentDVR v7.7.8.0+) |

### Stream-URLs _(erfordert „Stream-URLs generieren“)_

| Datenpunkt             | Typ          | R/W | Beschreibung                                         |
| ---------------------- | ------------ | --- | ---------------------------------------------------- |
| `<cam>.urls.snapshot`  | Zeichenkette | R   | URL zum aktuellen JPEG-Schnappschuss _(nur Kameras)_ |
| `<cam>.urls.photo`     | Zeichenkette | R   | URL zum Foto-Endpunkt _(nur Kameras)_                |
| `<cam>.urls.mjpeg`     | Zeichenkette | R   | URL zum MJPEG-Livestream _(nur Kameras)_             |
| `<cam>.urls.mp4`       | Zeichenkette | R   | URL zum MP4-Livestream _(nur Kameras)_               |
| `<mic>.urls.audio_mp3` | Zeichenkette | R   | URL zum MP3-Audiostream _(nur Mikrofone)_            |
| `<mic>.urls.audio_ogg` | Zeichenkette | R   | URL zum OGG-Audiostream _(nur Mikrofone)_            |

### Veranstaltungen / Galerie _(nur Kameras)_

| Datenpunkt                | Typ          | R/W | Beschreibung                                                                                                                               |
| ------------------------- | ------------ | --- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `<cam>.events.*`          | verschieden  | R   | Neueste Aufzeichnungsmetadaten – erfordert „Ereignisdatenpunkte“                                                                           |
| `<cam>.widget_recordings` | Zeichenkette | R   | HTML-Aufnahmegalerie – erfordert das „Galerie-Widget“                                                                                      |
| `<cam>.widget_live`       | Zeichenkette | R   | HTML-Live-Kachel für eine einzelne Kamera – erfordert das „Galerie-Widget“; die Momentaufnahme wird bei jeder Adapterabfrage aktualisiert. |

## Webhook

Der Adapter stellt einen Webhook-Endpunkt bereit, der eine sofortige vollständige Abfrage von AgentDVR auslöst:

```
GET http://<iobroker>:<webport>/agent-dvr.0/webhook
```

Ersetzen`agent-dvr.0` mit der tatsächlichen Instanznummer (`agent-dvr.1` usw.), wenn Sie mehrere Instanzen ausführen.

Konfigurieren Sie diese URL als **Aktion** in AgentDVR (Kamera → Bearbeiten → Benachrichtigungen → Aktionen → URL), um Echtzeit-Updates zu erhalten, sobald eine Aufnahme beendet oder eine Benachrichtigung ausgelöst wird. Der Adapter ruft dann umgehend alle Kameradaten, Aufnahmen und Systemstatistiken neu ab – ein Warten auf den nächsten Abfragezyklus ist nicht erforderlich.

Rücksendungen`{"ok":true}` auf Erfolg.

### Übersicht _(erfordert das "Übersichts-Widget")_

| Datenpunkt             | Typ          | R/W | Beschreibung                                                                                 |
| ---------------------- | ------------ | --- | -------------------------------------------------------------------------------------------- |
| `widget_live_overview` | Zeichenkette | R   | HTML-Kachelraster aller Kameras – Aktualisierung der Schnappschüsse bei jeder Adapterabfrage |

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

[Older changelog entries in CHANGELOG_OLD.md](https://github.com/ipod86/ioBroker.agent-dvr/blob/main/CHANGELOG_OLD.md)

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