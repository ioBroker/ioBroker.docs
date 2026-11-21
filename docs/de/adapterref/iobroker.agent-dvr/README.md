---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.agent-dvr/README.md
title: ioBroker.agent-dvr
hash: ohtgpxpNavUZkt/nkbGJdtkMO1lW7y1qktPf9E/2LCo=
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

> Dies ist eine von der Community gepflegte Integration, die nicht mit iSpyConnect verbunden ist und von diesem auch nicht unterstützt wird. Bitte melden Sie Probleme über [den GitHub-Tracker dieses Repositorys](https://github.com/ipod86/ioBroker.agent-dvr/issues) und nicht über die Supportkanäle von iSpyConnect.

## Anforderungen

- ioBroker mit `iobroker.web` Adapter
- **AgentDVR ≥ 7.8.0.0** – frühere Versionen weisen einen Fehler auf `streamFile.cgi` Ein Endpunkt (fehlerhafte Chunked-Codierung, falscher MIME-Typ) verhindert die Wiedergabe von Aufnahmen im integrierten Dashboard. Der Entwickler hat bestätigt, dass die Korrektur in Version 7.8.0.0 enthalten ist.

## Highlights

### Widgets (Webkomponenten) für AURA, vis-2, Geräte und andere Visualisierungen

Die Aufnahmegalerie, die Live-Kachel und die Live-Übersicht sind auch als Webkomponenten verfügbar (`@iobroker/web-components` AURA (0.106.0+, 0.112.0+ empfohlen), vis-2 (2.20.7+), der Geräteadapter (4.3.0+) und alle anderen Visualisierungen, die Webkomponenten unterstützen, listen sie in ihrer Widget-Palette auf – eine HTML-Bindung ist nicht erforderlich. Sie werden nativ im Browser gerendert, anstatt die HTML-Datenpunkte anzuzeigen, sodass ein Seitenneuladen einen geöffneten Player nicht schließt.

- **Agent DVR-Aufnahmen** – die Aufnahmegalerie einer Kamera mit Such- und Tag-Filter, integriertem Player oder externer Player-URL
- **Agent DVR Live-Kamera** – die Live-Kachel einer Kamera; das Bild wird im Browser aktualisiert, ein Klick öffnet den Live-Stream.
- **Agent DVR Live-Übersicht** – die Live-Kacheln aller Kameras einer Instanz
- **Quelle** : Entweder _Widget aus den Adaptereinstellungen_ (alle Einstellungen des Widget-Tabs der Instanz) oder _eigene Einstellungen hier_ – jede Widget-Einstellung der Instanz (Modus, Anzahl, Miniaturansichtsgröße, Tags, Sortierung, Suche, Standard-Tag, kompaktes Layout, Player, Seitenverhältnis, Aktualisierungsintervall, Farben, Radius der Ecken) pro Widget
- Übernimmt optional die Farben des Visualisierungsthemas
- Es werden keine Anmeldeinformationen benötigt: Die Bilder und Videos verwenden dieselben AgentDVR-Links wie die HTML-Widgets; die Daten stammen von `widget_config` Und `<cam>.widget_data`

### Benachrichtigungen (Kamera offline, Person/Tier/Fahrzeug erkannt, neue Aufnahme)

- Ein separater **Benachrichtigungsreiter** : Jede Benachrichtigungsart kann einzeln aktiviert werden – Kamera offline, Kamera wieder online, Agent-DVR-Server offline/online, Personen-, Tier-, Fahrzeug- oder sonstige Erkennung, neue Aufnahme – pro Kamera über eine Kontrollkästchenliste aktivierbar.
- Benachrichtigungen werden an das ioBroker-Benachrichtigungssystem (Glocke im Adminbereich) gesendet; der **Benachrichtigungsmanager-** Adapter leitet sie weiter, z. B. an Telegram oder E-Mail – Messenger-Einstellungen sind in diesem Adapter nicht verfügbar.
- **„Kamera offline“** wird gemeldet, wenn eine im Agent DVR eingeschaltete Kamera für die eingestellte Zeit (standardmäßig 10 Minuten) nicht verbunden ist. Ohne Verbindung gibt es kein Bild und keine Bewegungserkennung; kurze Ausfälle, wie z. B. ein Neustart der Kamera, werden nicht gemeldet.
- Neue Datenpunkte pro Kamera: `status.offlineSince` Und `status.offlineAlarm` für Ihre eigenen Skripte und Visualisierungen

### Aufnahmen im ioBroker-Dateispeicher und als Telegram-Video

- **Die letzten Aufnahmen im ioBroker-Dateispeicher bereitstellen** (standardmäßig deaktiviert): Jede neue Aufnahme einer Kamera wird von AgentDVR heruntergeladen und gespeichert als `rec1` …`rec3` pro Kamera — mit Dateipfad, `iobfile://` URI und http URL in `<cam>.recordings.*`, genau wie die Alarmfotos
- Optional auch als **MP4** (verlustfreier Remux mit ffmpeg, keine Neukodierung) – überall abspielbar, auch direkt in Telegram.
- ** `sendRecording` ** sendet die letzte, eine gespeicherte oder eine beliebige Aufnahme direkt als Video an Telegram (oder eine andere Instanz);** `getRecording` ** stellt es als Datei für Ihre eigenen Skripte zur Verfügung.
- Details: [Aufnahmen im Dateispeicher](#recordings-in-the-file-storage)

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
- HTML-Aufnahmegalerie-Widget pro Kamera (`widget_recordings`) und Live-Kachel mit einer Kamera (`widget_live` — reiner HTML/CSS- oder vollständiger JS-Modus mit Such- und Tag-Filter
- Übersichts-Widget, das alle Kameras in einem HTML-Zustand kombiniert
- **Integriertes Live-Dashboard** bei `http://<iobroker>:<webport>/agent-dvr.0/` — keine zusätzliche App erforderlich:
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

| Einstellung                          | Beschreibung                                                                                                             | Standard    |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ | ----------- |
| Ereignisdatenpunkte                  | Metadaten der Spiegelaufzeichnung (letztes Ereignis, Anzahl, Tags, …) pro Kamera                                         | `true`      |
| Speichern Sie Benachrichtigungsfotos | Speichern Sie das Foto jeder Webhook-Benachrichtigung im Dateispeicher (siehe [Benachrichtigungsfotos](#alert-photos) ). | `true`      |
| Webinstanz für Fotolinks             | Die Webinstanz wird für die `url*` Links zu Fotos und Aufnahmen von Alarmsituationen                                      | automatisch |

**Aufzeichnungen im Dateispeicher** – siehe [Aufzeichnungen im Dateispeicher](#recordings-in-the-file-storage)

| Einstellung                                                              | Beschreibung                                                                                                               | Standard |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- | -------- |
| Stellen Sie die letzten Aufzeichnungen im ioBroker-Dateispeicher bereit. | Laden Sie jede neue Aufnahme herunter und speichern Sie sie pro Kamera.                                                    | `false`  |
| Kameras                                                                  | Alle Kameras oder eine Auswahl (für die Liste muss eine laufende Instanz erforderlich sein)                                | alle     |
| Anzahl der gespeicherten Aufnahmen pro Kamera                            | 1, 2 oder 3 (`rec1` = neueste)                                                                                             | `1`      |
| Maximale Größe (MB)                                                      | Größere Aufnahmen werden mit einem Infoprotokoll übersprungen; außerdem wird das Limit für `sendRecording` / `getRecording` | `50`     |
| Download-Timeout (s)                                                     | Herunterladen und Konvertieren einer Aufnahme (10–900)                                                                     | `120`    |
| Als MP4 bereitstellen                                                    | MKV mit ffmpeg in MP4 konvertieren (keine Neukodierung); ohne ffmpeg bleibt die MKV-Datei erhalten.                        | `true`   |
| ffmpeg-Pfad                                                              | Leer = automatische Suche                                                                                                  | —        |

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

| Einstellung                     | Beschreibung                                                                                                        | Standard |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------- | -------- |
| Standardansicht                 | Welcher Tab öffnet sich beim Laden des Dashboards: Live oder Aufzeichnungen?                                        | `Live`   |
| Offline-Kameras anzeigen        | Kamerakacheln auch dann anzeigen, wenn die Kamera offline ist                                                       | `true`   |
| Maximale Gesamtanzahl Aufnahmen | Maximale Anzahl der im Dashboard angezeigten Aufnahmen aller Kameras (neueste zuerst). Unabhängig vom Widget-Limit. | `200`    |

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
| Widget-Modus      | `No JS` — reines HTML/CSS, überall einbettbar; `JS` — volle Interaktivität mit Such- und Schlagwortfilter | `No JS`  |

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
| Neueste zuerst  | Sortieren Sie die Aufnahmen, wobei die neueste oben steht.  | `true`   |
| Suche anzeigen  | Ein Textsuchfeld im JS-Modus anzeigen                       | `false`  |
| Kompaktmodus    | Dichtes Layout mit kleineren Vorschaubildern                | `false`  |
| Standard-Tag    | Wählen Sie diesen Tag-Filter beim Laden des Widgets voraus. | —        |
| Miniaturansicht | `Small` /`Medium` / `Large`                                 | `Medium` |

**Spieler**

| Einstellung           | Beschreibung                                                     | Standard |
| --------------------- | ---------------------------------------------------------------- | -------- |
| Live-Seitenverhältnis | Seitenverhältnis für die Live-Stream-Vorschau, z. B. `16/9`       | —        |
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

### Registerkarte: Benachrichtigungen

Alle Einstellungen sind optional und standardmäßig deaktiviert. Benachrichtigungen werden an das ioBroker-Benachrichtigungssystem gesendet; installieren Sie den **Notification-Manager-** Adapter und wählen Sie dort für _Agent DVR_ aus, wohin die einzelnen Benachrichtigungsarten (Telegram, E-Mail usw.) gesendet werden sollen.

| Einstellung                              | Beschreibung                                                                                                                                                                                                        | Standard      |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Kamera offline                           | Eine im Agent DVR eingeschaltete Kamera ist seit der eingestellten Zeit nicht angeschlossen.                                                                                                                        | `false`       |
| Kamera wieder online                     | Erst nach einer Offline-Benachrichtigung, mit Angabe der Dauer des Ausfalls                                                                                                                                         | `false`       |
| Agent-DVR-Server offline / wieder online | Der Agent-DVR-Server antwortet nicht zur eingestellten Zeit.                                                                                                                                                        | `false`       |
| Offline nach (Minuten)                   | Gemeldete Ausfalldauer (1–1440)                                                                                                                                                                                     | `10`          |
| Person / Tier / Fahrzeug erkannt         | Erkennungs-Tags von Agent DVR (`people`, `dog_cat`, `vehicle`, …)                                                                                                                                                  | `false`       |
| Weitere Detektionen                      | Alle anderen Tags, z. B. von Ihren eigenen KI-Modellen (einfache Bewegung) `detected` Handbuch `trigger` Und `timelapse` werden nicht erkannt und nicht gemeldet)                                                      | `false`       |
| Neue Aufnahme                            | Agent DVR hat eine neue Aufnahme erstellt                                                                                                                                                                           | `false`       |
| Kameras                                  | Liste aller Kameras mit Kontrollkästchen; nicht markierte Kameras senden keine Benachrichtigungen. Neue Kameras werden automatisch markiert; die Einstellung bleibt auch nach dem Umbenennen einer Kamera erhalten. | alles geprüft |

Für Erkennungen und neue Aufzeichnungen werden _Ereignisdatenpunkte_ oder das Widget (Registerkarte „Funktionen“) benötigt.

### Registerkarte: Erweitert

| Einstellung                            | Beschreibung                                                                           | Standard |
| -------------------------------------- | -------------------------------------------------------------------------------------- | -------- |
| Maximale Rekursionstiefe               | Um wie viele Ebenen ist das API-JSON in Datenpunkte vereinfacht (1–10)?                | `6`      |
| Maximale Array-Einträge                | Maximale Anzahl der gespiegelten Array-Elemente pro Eigenschaft (1–500)                | `30`     |
| Dynamische Tags                        | Automatische Erstellung eines Tag-Datenpunkts für jedes eindeutige Aufzeichnungs-Tag   | `false`  |
| Tags ignorieren (durch Komma getrennt) | Aufzeichnungs-Tags, die von den Ereignisdatenpunkten ausgeschlossen werden sollen      | —        |
| Tag-Filter (durch Komma getrennt)      | Erstellen Sie nur Ereignisdatenpunkte für Aufzeichnungen, die diesen Tags entsprechen. | —        |

## Live-Dashboard

Der Adapter verfügt über ein integriertes Live-Dashboard bei `http://<iobroker>:<webport>/agent-dvr.0/` Eine zweite Instanz ist erreichbar unter `/agent-dvr.1/`, ein Drittel bei `/agent-dvr.2/`, und so weiter.

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
3. Geben Sie die **go2rtc-URL** ein, die unterhalb der Tabelle angezeigt wird (z. B. `http://192.168.1.10:1984`).
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

### Sicherheit

Dieser Adapter speichert Ihre AgentDVR-Administratoranmeldeinformationen und stellt sie zur Verfügung `system.control.purge`, `system.control.restart` Und `system.control.unblockExternal` Da diese Zustände mit einem Klick beschreibbar sind, kann jeder, der den Webport von ioBroker erreichen kann, Aufnahmen löschen, AgentDVR neu starten oder die Sperre für externen Zugriff deaktivieren. **Stellen Sie sicher, dass `iobroker.web` Die Authentifizierung muss aktiviert sein, bevor ioBroker außerhalb Ihres LANs (direkt oder über einen Reverse-Proxy) zugänglich gemacht wird** – dies ist bei vielen ioBroker-Konfigurationen nicht die Standardeinstellung.

> Die Einstellung wird sofort nach dem Speichern wirksam – ein Neustart ist nicht erforderlich.

## Datenpunkte

`<cam>` steht für `cam_<oid>_<name>` z.B. `cam_8_Reolink` Die

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

| Datenpunkt                         | Typ             | R/W | Beschreibung                                                                         |
| ---------------------------------- | --------------- | --- | ------------------------------------------------------------------------------------ |
| `<cam>.name`                       | Zeichenkette    | R   | Kameraname                                                                           |
| `<cam>.data.online`                | boolescher Wert | R   | Die Kamera ist im Agent DVR eingeschaltet.                                           |
| `<cam>.data.connected`             | boolescher Wert | R   | Stream ist verbunden                                                                 |
| `<cam>.status.online`              | boolescher Wert | R   | Die Kamera ist im Agent DVR eingeschaltet (sagt nichts über die Erreichbarkeit aus). |
| `<cam>.status.connected`           | boolescher Wert | R   | Kamera ist erreichbar: Agent DVR empfängt sein Bild (Rolle `indicator.reachable`)    |
| `<cam>.status.offlineSince`        | Nummer          | R   | Zeit seit der letzten Verbindung der Kamera (leer im angeschlossenen Zustand)        |
| `<cam>.status.offlineAlarm`        | boolescher Wert | R   | Länger als die festgelegte Zeit nicht verbunden (Registerkarte „Benachrichtigungen“) |
| `<cam>.data.recording`             | boolescher Wert | R   | Aktuell wird aufgenommen                                                             |
| `<cam>.data.detected`              | boolescher Wert | R   | Bewegung/Objekt erkannt                                                              |
| `<cam>.data.detectorActive`        | boolescher Wert | R   | Bewegungsmelder aktiviert                                                            |
| `<cam>.data.alertsActive`          | boolescher Wert | R   | Benachrichtigungen aktiviert                                                         |
| `<cam>.data.alerted`               | boolescher Wert | R   | Warnung aktuell aktiv                                                                |
| `<cam>.data.scheduleActive`        | boolescher Wert | R   | Zeitplan aktiviert                                                                   |
| `<cam>.data.width` /`height`       | Nummer          | R   | Streamauflösung                                                                      |
| `<cam>.data.*`                     | verschieden     | R   | Alle weiteren Geräteeigenschaften von AgentDVR                                       |
| `<cam>.snapshot_b64`               | Zeichenkette    | R   | Aktueller Frame als `data:image/jpeg;base64,…` (Rolle `media.picture`)                |
| `<cam>.control.record`             | Taste           | W   | Aufnahme starten                                                                     |
| `<cam>.control.recordStop`         | Taste           | W   | Aufnahme stoppen                                                                     |
| `<cam>.control.recordRestart`      | Taste           | W   | Aufnahme neu starten                                                                 |
| `<cam>.control.triggerRecord`      | Taste           | W   | Triggeraufzeichnung (läuft bis zum Timeout)                                          |
| `<cam>.control.snapshot`           | Taste           | W   | Weisen Sie AgentDVR an, einen Snapshot auf der Festplatte zu speichern.              |
| `<cam>.control.refreshSnapshotB64` | Taste           | W   | Aktuellen Frame abrufen und schreiben an `snapshot_b64`                              |
| `<cam>.control.detect`             | Taste           | W   | Bewegungserkennung auslösen                                                          |
| `<cam>.control.alertOn`            | Taste           | W   | Alarme aktivieren                                                                    |
| `<cam>.control.alertOff`           | Taste           | W   | Alarme deaktivieren                                                                  |
| `<cam>.control.switchOn`           | Taste           | W   | Kamera einschalten                                                                   |
| `<cam>.control.switchOff`          | Taste           | W   | Kamera ausschalten                                                                   |
| `<cam>.control.objectDetectOn`     | Taste           | W   | Objekterkennung aktivieren _(nur Kameras)_                                           |
| `<cam>.control.objectDetectOff`    | Taste           | W   | Objekterkennung deaktivieren _(nur Kameras)_                                         |
| `<cam>.control.scheduleOn`         | Taste           | W   | Aktivieren Sie den Gerätezeitplan                                                    |
| `<cam>.control.scheduleOff`        | Taste           | W   | Gerätezeitplan deaktivieren                                                          |
| `<cam>.control.detectorOn`         | Taste           | W   | Bewegungsmelder aktivieren                                                           |
| `<cam>.control.detectorOff`        | Taste           | W   | Bewegungsmelder deaktivieren                                                         |
| `<cam>.control.sensitivityMin`     | Nummer 0–100    | R/W | Detektorempfindlichkeit – Mindestschwelle _(nur Kameras)_                            |
| `<cam>.control.sensitivityMax`     | Nummer 0–100    | R/W | Detektorempfindlichkeit – maximaler Schwellenwert _(nur Kameras)_                    |
| `<cam>.control.sensitivityGain`    | Nummer 0–100    | R/W | Detektorempfindlichkeit – Verstärkung _(nur Kameras)_                                |
| `<cam>.control.recOnAlert`         | Taste           | W   | „Aufzeichnung bei Alarm“ aktivieren                                                  |
| `<cam>.control.recOnDetect`        | Taste           | W   | „Aufzeichnung bei Erkennung“ aktivieren                                              |
| `<cam>.control.purge`              | Taste           | W   | Alle Aufnahmen dieser Kamera löschen                                                 |

### PTZ _(erfordert "PTZ-Steuertasten")_

| Datenpunkt                    | Typ      | R/W | Beschreibung                                                                                                                                                  |
| ----------------------------- | -------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<cam>.control.ptz.left`      | schalten | R/W | Schwenken Sie nach links (halten Sie gedrückt, um die Bewegung fortzusetzen)                                                                                  |
| `<cam>.control.ptz.right`     | schalten | R/W | Schwenken Sie nach rechts                                                                                                                                     |
| `<cam>.control.ptz.up`        | schalten | R/W | Neigen nach oben                                                                                                                                              |
| `<cam>.control.ptz.down`      | schalten | R/W | Neigen nach unten                                                                                                                                             |
| `<cam>.control.ptz.upLeft`    | schalten | R/W | Diagonal oben links                                                                                                                                           |
| `<cam>.control.ptz.upRight`   | schalten | R/W | Diagonal nach oben rechts                                                                                                                                     |
| `<cam>.control.ptz.downLeft`  | schalten | R/W | Diagonal unten links                                                                                                                                          |
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

| Datenpunkt                | Typ          | R/W | Beschreibung                                                                                                                                               |
| ------------------------- | ------------ | --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<cam>.events.*`          | verschieden  | R   | Neueste Aufzeichnungsmetadaten – erfordert „Ereignisdatenpunkte“                                                                                           |
| `<cam>.recordings.*`      | verschieden  | R   | Gespeicherte Aufnahmen (`file1`, `uri1`, `url1`, `name1`, `ts1`, …) — erfordert „Stellen Sie die letzten Aufzeichnungen im ioBroker-Dateispeicher bereit“ |
| `<cam>.widget_recordings` | Zeichenkette | R   | HTML-Aufnahmegalerie – erfordert das „Galerie-Widget“                                                                                                      |
| `<cam>.widget_live`       | Zeichenkette | R   | HTML-Live-Kachel für eine einzelne Kamera – erfordert das „Galerie-Widget“; die Momentaufnahme wird bei jeder Adapterabfrage aktualisiert.                 |
| `<cam>.widget_data`       | Zeichenkette | R   | Aufzeichnungen als JSON für die Webkomponenten (neueste 500) — erfordert „Galerie-Widget“ oder „Ereignisdatenpunkte“                                       |

## Webhook

Der Adapter stellt einen Webhook-Endpunkt bereit, der eine sofortige vollständige Abfrage von AgentDVR auslöst:

```
GET http://<iobroker>:<webport>/agent-dvr.0/webhook
```

Ersetzen `agent-dvr.0` mit der tatsächlichen Instanznummer (`agent-dvr.1` usw.), wenn Sie mehrere Instanzen ausführen.

Konfigurieren Sie diese URL als **Aktion** in AgentDVR (Kamera → Bearbeiten → Benachrichtigungen → Aktionen → URL), um Echtzeit-Updates zu erhalten, sobald eine Aufnahme beendet oder eine Benachrichtigung ausgelöst wird. Der Adapter ruft dann umgehend alle Kameradaten, Aufnahmen und Systemstatistiken neu ab – ein Warten auf den nächsten Abfragezyklus ist nicht erforderlich.

Rücksendungen `{"ok":true}` auf Erfolg.

### Schnelle Alarmierung pro Kamera

Fügen Sie die Kamera-ID hinzu, damit der Adapter weiß, welche Kamera ausgelöst hat:

```
GET http://<iobroker>:<webport>/agent-dvr.0/webhook?oid={ID}&ot={OT}
```

`{ID}` Und `{OT}` Es handelt sich um AgentDVR-Tags, die von AgentDVR ausgefüllt werden. Der Adapter sendet dann Impulse. `<cam>.events.webhook` Die Aktion wird **sofort** ausgeführt – bevor Daten abgerufen werden – und anschließend erneut abgefragt. Verwenden Sie die Aktion „ _Bewegung erkannt“_ . Wenn Alarmfotos aktiviert sind, wird das Foto sofort gespeichert – siehe [„Bilder für VIS abrufen“ und „Skripte“](#getting-images-for-vis-and-scripts) für den richtigen Auslöser. AgentDVR ruft die Aktion oft mehrmals pro Bewegung auf; weitere Aufrufe für dieselbe Kamera innerhalb von 20 Sekunden aktualisieren lediglich die Daten und führen keine erneute Abfrage durch. `<cam>.events.webhookParams` enthält alle Parameter des letzten Aufrufs als JSON (plus `ts`), geschrieben vor dem Impuls und auch während der Abklingzeit – fügen Sie alle benötigten AgentDVR-Tags zur URL hinzu (z. B. `&ai={AI}&zone={ZONE}&name={NAME}`) und werten Sie sie in Ihrem eigenen Skript aus.

Ohne `oid` Der Webhook löst lediglich eine vollständige Abfrage aus. Die Abfrageparameter werden im Debug-Modus in das Webinstanzprotokoll geschrieben.

Verwenden Sie einfach `http` Bei der Webinstanz werden selbstsignierte Zertifikate von AgentDVR stillschweigend abgelehnt.

### Alarmfotos

Wenn **„Benachrichtigungsfotos speichern“** aktiviert ist (Standardeinstellung), wird bei jedem Webhook-Aufruf mit `?oid={ID}` speichert auch das aktuelle Foto in voller Auflösung (`photo.jpg`) im ioBroker-Dateispeicher. Die letzten 3 Fotos pro Kamera werden gespeichert:

| Datenpunkt                         | Inhalt                                                                                                                                                                       |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<cam>.alertPhotos.grab1` …`grab3` | Absoluter Dateipfad des Fotos (`grab1` = neueste)                                                                                                                            |
| `<cam>.alertPhotos.url1` …`url3`   | http(s) URL über die Webinstanz, z. B. `http://192.168.1.10:8082/agent-dvr.0/photos/cam_8_Reolink/grab1.jpg` — für TV-, Kiosk- oder andere Apps, die nur Weblinks akzeptieren |
| `<cam>.alertPhotos.uri1` …`uri3`   | ioBroker-Datei-URI, z. B. `iobfile://agent-dvr.0/cam_8_Reolink/grab1.jpg`                                                                                                     |
| `<cam>.alertPhotos.ts1` …`ts3`     | Zeitpunkt der Aufnahme                                                                                                                                                       |

Dateien: `<namespace>/<cam>/grab1.jpg` …`grab3.jpg` (z.B `agent-dvr.0/cam_8_Reolink/grab1.jpg` Bei jedem neuen Foto rotieren sie (grab1 → grab2 → grab3). `ts1` wird **zuletzt** geschrieben, nachdem die Datei vollständig ist – Auslöser bei `ts1` und sende das Foto mit Telegram, eine HTTP-Anfrage ist nicht erforderlich (siehe [Telegram](#telegram) ). Der Dateipfad in `grab1` –`grab3` ist nur gültig, wenn sich der Dateispeicher auf der lokalen Festplatte befindet (Standardeinstellung); `uri1` –`uri3` Funktioniert mit jedem Speichermedium.

### Übersicht _(erfordert das "Übersichts-Widget")_

| Datenpunkt             | Typ          | R/W | Beschreibung                                                                                                                         |
| ---------------------- | ------------ | --- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `widget_live_overview` | Zeichenkette | R   | HTML-Kachelraster aller Kameras – Aktualisierung der Schnappschüsse bei jeder Adapterabfrage                                         |
| `widget_config`        | Zeichenkette | R   | Widget-Einstellungen, Kameras und Texte als JSON für die Webkomponenten (immer geschrieben, keine Anmeldeinformationen erforderlich) |

## Aufzeichnungen im Dateispeicher

Mit der **Option „Letzte Aufnahmen im ioBroker-Dateispeicher bereitstellen“** (Registerkarte _„Funktionen_ “, standardmäßig deaktiviert) lädt der Adapter jede neue Aufnahme einer Kamera von AgentDVR herunter, sobald diese in der Aufnahmeliste erscheint. `<cam>.events.new` Impulse – _Ereignisdatenpunkte_ müssen also aktiviert sein) und speichert sie im ioBroker-Dateispeicher. Der Download erfolgt im Arbeitsspeicher, niemals in einer temporären Datei. Wie bei den Alarmfotos werden die letzten 1, 2 oder 3 Aufnahmen pro Kamera gespeichert (Einstellung _Anzahl der gespeicherten Aufnahmen pro Kamera_ , Standardwert 1):

| Datenpunkt                        | Inhalt                                                                                                                                       |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `<cam>.recordings.file1` …`file3` | Absoluter Dateipfad, z.B. `/opt/iobroker/iobroker-data/files/agent-dvr.0/cam_8_Reolink/rec1.mp4` (`1` = neueste)                              |
| `<cam>.recordings.uri1` …`uri3`   | ioBroker-Datei-URI, z. B. `iobfile://agent-dvr.0/cam_8_Reolink/rec1.mp4`                                                                      |
| `<cam>.recordings.url1` …`url3`   | http(s) URL über die Webinstanz, z. B. `http://192.168.1.10:8082/agent-dvr.0/recordings/cam_8_Reolink/rec1.mp4` (Unterstützung bei der Suche) |
| `<cam>.recordings.name1` …`name3` | Ursprünglicher AgentDVR-Dateiname, z. B. `8_2026-11-12_15-55-29_931.mkv`                                                                      |
| `<cam>.recordings.ts1` …`ts3`     | Zeitpunkt der Aufnahme                                                                                                                       |

Dateien: `<namespace>/<cam>/rec1.mp4` (oder `.mkv`) …`rec3` Bei jeder neuen Aufnahme rotieren die Aufnahmen (Aufnahme 1 → Aufnahme 2 → Aufnahme 3), die älteste wird gelöscht. Wenn Sie die Anzahl verringern, werden die überflüssigen Dateien und Datenpunkte beim nächsten Start entfernt. Der Speicherplatzbedarf bleibt konstant: Anzahl × maximale Größe pro Kamera. Aufnahmen, die größer als _die maximale Größe_ (standardmäßig 50 MB) sind, werden mit einem Informationsprotokoll übersprungen. `ts1` wird **zuletzt** geschrieben, nachdem die Datei fertiggestellt ist – verwenden Sie sie als Auslöser.

**Speicherbegrenzung:** `file1` –`file3` Sie enthalten nur dann einen Pfad, wenn sich der ioBroker-Dateispeicher auf der lokalen Festplatte befindet (Standard-Datei-/JSON-Objektdatenbank). Bei Redis oder einer anderen Nicht-Datei-Objektdatenbank bleiben sie leer. `uri*` (Telegram 6+, Skripte) oder `url*` stattdessen solche, die mit jedem Speichermedium kompatibel sind.

### Was passiert, wenn…

- **Die Option ist aktiviert:** Beim nächsten Start (das Speichern der Einstellungen startet die Instanz neu) lädt jede ausgewählte Kamera ihre letzte Aufnahme, sofern Speicherplatz 1 leer ist oder eine ältere Aufnahme enthält – Kamera für Kamera, unter Berücksichtigung der Größenbeschränkung. Anschließend wird jede neue Aufnahme gespeichert, sobald sie verfügbar ist.
- **…eine Kamera wird neu ausgewählt:** Wie oben beschrieben, wird sofort die aktuell letzte Aufnahme abgerufen.
- **…wird eine neue Kamera in AgentDVR hinzugefügt:** Sie erscheint bei der nächsten Abfrage (die Kameraliste in den Einstellungen wird live von der laufenden Instanz gelesen); bei _„Alle Kameras“_ wird sie wie die anderen ausgefüllt und gespeichert.
- **…eine Kamera wird abgewählt:** beim nächsten Start `recordings` Datenpunkte und ihre Dateien `rec1` –`rec3` Und `send.*` werden gelöscht.
- **…die Option ist deaktiviert:** beim nächsten Start `recordings` Datenpunkte und die `rec*` /`send.*` Die Dateien aller Kameras wurden gelöscht.
- **…eine Kamera wird aus AgentDVR entfernt:** Ihre Datenpunkte werden wie zuvor gelöscht, und ihr gesamter Ordner im Dateispeicher (`agent-dvr.0/<cam>/` — Aufnahmen, `send.*` und Alarmfotos) werden gelöscht. Falls AgentDVR plötzlich gar keine Kamera mehr meldet, wird nichts gelöscht (vermutlich ein vorübergehender Fehler).
- **…eine ausgewählte Kamera existiert nicht mehr:** In den Einstellungen wird sie als _„<cam> (nicht mehr in AgentDVR)"_ , daher können Sie es deaktivieren; der Adapter ignoriert es einfach.

`send.mp4|mkv` (verwendet von) `sendRecording` /`getRecording` (bei Aufnahmen, die sich nicht in einem Speicherplatz befinden) bleibt so lange erhalten, bis die Aufnahmen der Kamera bereinigt werden – eine Datei pro Kamera, die jedes Mal überschrieben wird.

### MP4 und ffmpeg

AgentDVR zeichnet MKV-Dateien auf. Mit der Option „ **Als MP4 bereitstellen** “ (standardmäßig aktiviert) remuxt der Adapter die MKV-Datei mit ffmpeg zu MP4 – dabei ändert sich nur der Container, Video und Audio werden kopiert, sodass der Vorgang deutlich unter einer Sekunde dauert. HEVC-Videos (H.265) erhalten die …`hvc1` Die Videos werden mit einem Tag versehen, damit Apple-Geräte und Telegram sie abspielen können. Falls der Audio-Codec nicht mit MP4 kompatibel ist, wird das Video ohne Ton neu muxt (einmaliger Protokolleintrag). Ohne ffmpeg wird die MKV-Datei unverändert bereitgestellt (ein Informationseintrag).

ffmpeg ist **nicht** im Lieferumfang enthalten. Der Adapter sucht beim Start und bei Bedarf danach: die _ffmpeg-_ Pfadeinstellung →`ffmpeg` über `PATH` →`/usr/bin/ffmpeg`, `/usr/local/bin/ffmpeg`, `/opt/homebrew/bin/ffmpeg`, `C:\ffmpeg\bin\ffmpeg.exe`, `%ProgramFiles%\ffmpeg\bin\ffmpeg.exe` Das Ergebnis ist in `info.ffmpeg` (z.B `6.1.1 (/usr/bin/ffmpeg)` oder `not found`) und in den Einstellungen neben der MP4-Option mit einer Schaltfläche **„Erneut suchen“** . Installieren Sie ffmpeg mit dem Paketmanager Ihres Systems:

| System                          | Befehl                  |
| ------------------------------- | ----------------------- |
| Debian, Ubuntu, Raspberry Pi OS | `apt install ffmpeg`    |
| Alpine (Docker)                 | `apk add ffmpeg`        |
| Fedora                          | `dnf install ffmpeg`    |
| macOS (Homebrew)                | `brew install ffmpeg`   |
| Windows                         | `winget install ffmpeg` |

Führen Sie den Befehl wie gewohnt als Administrator/Root auf Ihrem System aus. Klicken Sie anschließend in den Einstellungen _erneut auf „Suchen“_ (oder starten Sie die Instanz neu).

### Aufnahmen senden: `sendRecording` Und `getRecording`

`sendRecording` stellt eine Aufnahme im Dateispeicher des Adapters bereit und sendet sie als Video an eine Messenger-Instanz. Eine bereits gespeicherte Aufnahme (`recordings.*`) wird direkt verwendet; alle anderen werden in den Speicher geladen, bei Bedarf in MP4 konvertiert und in einer festen Datei pro Kamera gespeichert. `agent-dvr.0/<cam>/send.mp4` (oder `.mkv`), das jedes Mal überschrieben wird – der Speicherplatz bleibt also unverändert:

```js
sendTo('agent-dvr.0', 'sendRecording', {
    camera: 'cam_8_Reolink',      // folder id, AgentDVR oid (8) or camera name
    recording: 'last',            // 'last' (newest in AgentDVR), 1-3 (stored slot) or an AgentDVR file name
    target: 'telegram.0',         // instance that gets the video
    caption: 'Motion at the front door',
    // user: 'Max', chatId: 123, // optional, passed through to Telegram
    // mp4: true,                 // optional, overrides "Provide as MP4"
}, res => {
    if (!res.ok) log(res.error, 'warn'); // e.g. too large for Telegram
});
```

Die Botschaft an das Ziel lautet: `{ text: 'iobfile://agent-dvr.0/<cam>/<file>', type: 'video', fileName: '<name>.mp4', width, height, duration, caption, user, chatId }` — Telegram 6 und neuere Versionen lesen die Datei selbst aus dem Dateispeicher. `width`, `height` Und `duration` werden aus der Videodatei gelesen: Telegram erkennt sie bei größeren Bot-Uploads nicht selbst und würde das Video andernfalls im Chat mit einem falschen Seitenverhältnis anzeigen, bis es geöffnet wird. Andere Ziele erhalten stattdessen den absoluten Dateipfad (oder die URI, falls die Datei nicht lokal gespeichert ist). Die Antwort lautet: `{ ok, error?, fileName, format, mime, size, uri, url, file, width, height, duration }` Eine von AgentDVR noch bearbeitete Aufnahme wird nach Fertigstellung gesendet. **Telegram-Bots können nur Dateien bis zu 50 MB senden** ; größere Aufnahmen werden mit einer Fehlermeldung abgelehnt – noch bevor sie heruntergeladen werden können, obwohl AgentDVR die Größe bereits angibt.

> **Über den ioBroker-Nachrichtenbus werden keine Videodaten übertragen.** Große Nachrichten (mehrere zehn Megabyte) können die Zustandsdatenbank und damit den gesamten ioBroker blockieren. Daher übermittelt der Adapter lediglich die Dateireferenz und verweigert das Senden und Beantworten von Anfragen, die Binärdaten enthalten.

Sende jede neue Aufnahme an Telegram (Blockly wird nicht benötigt):

```js
on({ id: 'agent-dvr.0.cam_8_Reolink.events.new', val: true }, () => {
    sendTo('agent-dvr.0', 'sendRecording', { camera: 'cam_8_Reolink', recording: 'last', target: 'telegram.0', caption: 'New recording' });
});
```

Wenn die Dateispeicherfunktion aktiviert ist, wird sie ausgelöst bei `recordings.ts1` und stattdessen die gespeicherte Kopie senden (`recording: 1`):

```js
on({ id: 'agent-dvr.0.cam_8_Reolink.recordings.ts1', change: 'ne', ack: true }, () => {
    sendTo('agent-dvr.0', 'sendRecording', { camera: 'cam_8_Reolink', recording: 1, target: 'telegram.0', caption: 'New recording' });
});
```

> **Tipp: Achte auf das richtige Seitenverhältnis im Chat.** Wenn du die Videodatei selbst an Telegram sendest (Telegram Blockly Block), `recordings.file1` /`uri1` Telegram zeigt größere Videos in der Chat-Vorschau oft in einem falschen Format (z. B. 3:4) an, bis man sie öffnet – Telegram liest die Bildgröße bei größeren Bot-Uploads nicht selbst aus. `sendRecording` Liest Breite, Höhe und Dauer aus der Videodatei und leitet diese weiter, sodass das Video im Chat sofort im Seitenverhältnis der Kamera abgespielt wird. Keine Konfiguration erforderlich, es funktioniert einfach, wenn Sie es verwenden. `sendRecording` Die

`getRecording` benötigt dasselbe `camera`, `recording` Und `mp4`, stellt die Aufnahme auf die gleiche Weise zur Verfügung und gibt nur den Speicherort zurück: `{ ok, error?, fileName, mime, format, size, uri, url, file, width, height, duration }` Lesen Sie die Datei selbst in Ihrem Skript ein, z. B.:

```js
sendTo('agent-dvr.0', 'getRecording', { camera: 'cam_8_Reolink', recording: 'last' }, res => {
    if (!res.ok) return log(res.error, 'warn');
    // res.uri = 'iobfile://agent-dvr.0/cam_8_Reolink/send.mp4', res.url = http link, res.file = local path
    readFile('agent-dvr.0', res.uri.replace('iobfile://agent-dvr.0/', ''), (err, data) => { /* … */ });
});
```

## Bilder für VIS und Skripte abrufen

### Welches Bild stammt von wo

| Bild                              | Datenpunkt / URL                     | Größe                                   | Zeit                                                     |
| --------------------------------- | ------------------------------------ | --------------------------------------- | -------------------------------------------------------- |
| Livebild, klein                   | `<cam>.urls.snapshot` (`grab.jpg`)  | Vorschau                                | Jetzt                                                    |
| Livebild, vollständig             | `<cam>.urls.photo` (`photo.jpg`)    | Volle Auflösung, Ladezeit ca. 1 Sekunde | Jetzt                                                    |
| Live-Stream                       | `<cam>.urls.mjpeg`, `<cam>.urls.mp4` | Video                                   | live                                                     |
| Letzte Aufnahme – Miniaturansicht | `<cam>.events.last.thumb`            | max. 320×180 (AgentDVR-Limit)           | Der beste Moment der Aufnahme zeigt das erkannte Objekt. |
| Letzte Aufnahme – Video           | `<cam>.events.last.video`            | Video                                   | nach der Aufnahme                                        |
| Alarmfotos                        | `<cam>.alertPhotos.grab1`…`grab3`    | volle Auflösung                         | Zeitpunkt der Benachrichtigung (Webhook mit `oid`)       |

Der `urls.*` Und `events.last.*` Die URLs verweisen direkt auf AgentDVR. Sie funktionieren nur im lokalen Netzwerk – die Server von Telegram können sie nicht abrufen. Laden Sie sie daher zuerst mit einer HTTP-Anfrage (Antworttyp: .txt). `arraybuffer`) oder verwenden Sie die Alarmfotos, die bereits in ioBroker gespeichert sind.

### Welcher Auslöser für was

| Auslösen                      | Brände                                                                                            | Verwendung für                           |
| ----------------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `<cam>.alertPhotos.ts1`       | Foto gespeichert, ca. 1–2 Sekunden nach der Benachrichtigung                                      | **Senden Sie das Alarmfoto** (empfohlen) |
| `<cam>.events.webhook`        | sofort beim Webhook-Aufruf                                                                        | ein Bild selbst abrufen                  |
| `<cam>.events.new`            | Neue Aufnahme aufgelistet                                                                         | Miniaturansicht der Aufnahme             |
| `<cam>.events.detected_<tag>` | KI-Tag einer neuen Aufnahme, z. B. `detected_people` — auch wenn AgentDVR das Tag später hinzufügt | nur Personen benachrichtigen             |

> **Nicht verwenden `events.webhook` für das gespeicherte Alarmfoto.** Der Webhook-Impuls erfolgt, _bevor_ das neue Foto abgerufen und gespeichert wird. In diesem Moment `alertPhotos.grab1` /`uri1` /`url1` Sie verweisen weiterhin auf das Foto der **vorherigen** Warnung – eine Fernseh- oder Telegram-Nachricht zeigt dann ein altes Bild (möglicherweise Stunden alt). Für alles, was verwendet `alertPhotos.*` immer auslösen `alertPhotos.ts1` Die `events.webhook` ist nur für Skripte gedacht, die das Bild in diesem Moment selbst abrufen (z. B. `urls.photo` oder einem Schnappschuss ihrer eigenen Kamera).

Verwenden Sie **„größer als vorher“** (Blockly) oder `change: 'gt'` als Bedingung. Der Adapter überschreibt seine Zustände bei jeder Abfrage, daher wird "wurde aktualisiert" bei jeder Abfrage ausgelöst. `status.alerted` ist in der Regel zu kurz, um von einer Umfrage erfasst zu werden, und ist kein zuverlässiger Auslöser.

### Telegramm

Blockly: Auslöser bei `<cam>.alertPhotos.ts1` mit "größer als vorher", Telegram-Block mit _dem Wert von_ `<cam>.alertPhotos.uri1` als Text.

- **Telegram 6 oder neuer:** verwenden `uri1` (`iobfile://…` Telegram liest das Foto direkt aus dem ioBroker-Dateispeicher und sendet es als Foto – funktioniert mit jedem Speichertyp.
- **Ältere Telegram-Versionen:** verwenden `grab1` (Lokaler Dateipfad). Ein Text, der bereits lokal vorhanden ist. `.jpg` Der Pfad wird als Foto gesendet.

Das Senden des Dateiinhalts selbst (z. B. _Datei lesen_ → Telegram) funktioniert mit Blockly **nicht** : Rohdaten werden nur als Foto mit explizitem Attribut gesendet. `type: 'photo'` Die

JavaScript:

```js
on({ id: 'agent-dvr.0.cam_8_Reolink.alertPhotos.ts1', change: 'gt' }, () => {
    sendTo('telegram.0', { text: getState('agent-dvr.0.cam_8_Reolink.alertPhotos.uri1').val });
});
```

Die Datei selbst in einem Skript lesen: `readFile('agent-dvr.0', 'cam_8_Reolink/grab1.jpg', (err, data) => { … })` Die

### VIS / Dashboards

Die Alarmbilder werden von der Webinstanz bereitgestellt – der fertige Link befindet sich in `<cam>.alertPhotos.url1` …`url3` Der Adapter wählt eine aktivierte Webinstanz (einfache `http` (bevorzugt, da TV-Apps selbstsignierte Zertifikate oft ablehnen) und die IPv4-Adresse des Hosts. Die Webinstanz kann auch in den Einstellungen ausgewählt werden ( _Funktionen → Webinstanz für Fotolinks_ ). Wenn sich eine Webinstanz (Port, HTTPS, Bindungsadresse, aktiviert) oder die Hostadresse ändert, werden die Links automatisch neu geschrieben. Die Links bleiben für jedes neue Foto gleich, sodass Sie sie einmalig in einer App eingeben können.

```
http://<iobroker>:<webport>/agent-dvr.0/photos/<cam>/grab1.jpg
```

z.B `http://192.168.1.10:8082/agent-dvr.0/photos/cam_8_Reolink/grab1.jpg` (Auch `grab2.jpg`, `grab3.jpg` Verwenden Sie es in einem Bild-Widget und aktualisieren Sie es bei Änderungen. `alertPhotos.ts1` Dasselbe gilt, wenn Sie den Link an einen Fernseher oder eine andere App senden: weiterleiten `alertPhotos.ts1` nicht an `events.webhook` Andernfalls lädt die App das vorherige Foto. Für ein Livebild verwenden Sie `urls.snapshot` oder `urls.photo` mit einem Aktualisierungsintervall.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.10.0 (2026-11-16)
* (ipod86) feat: Notifications tab – camera offline/online again, server offline, person/animal/vehicle/other detection, new recording via the ioBroker notification system (notification-manager), each optional
* (ipod86) feat: choose per camera which ones send notifications (checkbox list, survives renaming in Agent DVR)
* (ipod86) feat: `status.offlineSince` and `status.offlineAlarm` per camera
* (ipod86) fix: `status.connected` now has the role `indicator.reachable` (camera reachable), `status.online` means "switched on in Agent DVR"

### 0.9.1 (2026-11-13)
* (ipod86) fix: recordings were stored while AgentDVR was still writing them (video cut off) — the adapter now waits until the recording is finished
* (ipod86) fix: `sendRecording` passes width, height and duration to Telegram — larger videos were shown in a wrong aspect ratio in the chat; `sendRecording`/`getRecording` also wait until a recording is finished
* (ipod86) feat: messages `getCameras` and `getWidgets` for the web components (prepares dropdowns instead of the object browser)

### 0.9.0 (2026-11-12)
* (ipod86) feat: keep the last 1–3 recordings per camera in the ioBroker file storage (`recordings.file/uri/url/name/ts`), optionally as MP4 via ffmpeg
* (ipod86) feat: `sendRecording` / `getRecording` send a recording to Telegram as video or provide it as a file for scripts
* (ipod86) feat: initial fill on enabling; recordings and files are cleaned up when switched off, deselected or the camera is removed
* (ipod86) feat: ffmpeg detection with status in the settings and `info.ffmpeg`
* (ipod86) fix: the settings page uses all 11 languages

### 0.8.1 (2026-11-12)
* (ipod86) fix: live overview web component fits its tiles to the widget size (no scrolling, no empty space); option "Fit to the widget size"
* (ipod86) chore: description and keywords mention the widgets for vis-2, AURA and other visualisations

### 0.8.0 (2026-11-12)
* (ipod86) feat: widgets (web components) for AURA (0.106.0+), vis-2 (2.20.7+), devices (4.3.0+) and other visualisations – recordings gallery, live tile and live overview, with the adapter's widget settings or own ones

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