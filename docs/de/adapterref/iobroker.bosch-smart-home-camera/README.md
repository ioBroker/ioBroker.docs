---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.bosch-smart-home-camera/README.md
title: ioBroker.bosch-smart-home-camera
hash: RDr3O0gf0d/t02Aw84Y+b17ynD5zNABiKmixQVxNuPU=
---
# ioBroker.bosch-smart-home-camera

![NPM-Version](https://img.shields.io/npm/v/iobroker.bosch-smart-home-camera.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.bosch-smart-home-camera.svg)
![Anzahl der Installationen](https://iobroker.live/badges/bosch-smart-home-camera-installed.svg)
![Lizenz](https://img.shields.io/npm/l/iobroker.bosch-smart-home-camera.svg)
![GitHub-Veröffentlichung](https://img.shields.io/github/release/mosandlt/ioBroker.bosch-smart-home-camera.svg)
![GitHub-Aktivität](https://img.shields.io/github/commit-activity/y/mosandlt/ioBroker.bosch-smart-home-camera.svg)
![Test und Freigabe](https://github.com/mosandlt/ioBroker.bosch-smart-home-camera/actions/workflows/test-and-release.yml/badge.svg)
![Projektwartung](https://img.shields.io/badge/maintainer-%40mosandlt-blue.svg)
![BuyMeCoffee](https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow.svg)
![Community-Forum](https://img.shields.io/badge/community-forum-brightgreen.svg)
![KI-gestützt](https://img.shields.io/badge/AI--Assisted-blue.svg)
![NPM](https://nodei.co/npm/iobroker.bosch-smart-home-camera.png?downloads=true)

ioBroker-Adapter für Bosch Smart Home Kameras (Eyes Outdoor, 360 Indoor, Gen2 Eyes Indoor II + Outdoor II). Der gesamte Funktionsumfang ist durchgängig nutzbar und wurde live mit realer Hardware getestet.

**Unterstützte Modelle:** Eyes Outdoor (Gen1), Eyes Outdoor II (Gen2), 360 Indoor (Gen1), Eyes Indoor II (Gen2) — modellspezifische Zeitsteuerung und Konfiguration erfolgen automatisch.

> **Keine offizielle API.** Dieser Adapter nutzt die per Reverse Engineering entwickelte Bosch Cloud API, die durch mitmproxy-Traffic-Analyse der offiziellen Bosch Smart Camera App ermittelt wurde.

---

## Inhaltsverzeichnis

- [Integrationsvergleich](#integration-comparison) – Wählen Sie das richtige Projekt für Ihre Plattform
- [Unterstützte Kameras](#supported-cameras)
- [Haftungsausschluss](#disclaimer)
- [Aufstellen](#setup)
- [Architektur](#architecture)
  - [Netzwerkverbindungen](#network-connectivity) – erforderliche Ports, VLAN-/Subnetz-Fallstricke
- [Status](#status)
- [Datenpunkte](#datapoints)
- [Armaturenbrett](#dashboard)
- [Beispielautomatisierungen](#example-automations)
- [MQTT-Brücke](#mqtt-bridge)
- [KI-Kameraanalyse](#ai-camera-analysis)
- [Anmeldeinformationsfreie RTSP-Front-Door](#credential-free-rtsp-front-door) – das Flaggschiff-Feature, Ablaufdiagramm + Konfiguration
- [Externe Rekorder (BlueIris, Frigate)](#external-recorders-blueiris-frigate)
- [Entwicklung](#development)
- [Vorhandene Adapterlandschaft](#existing-adapter-landscape)
- [Freigabeprozess](#release-process)
- [Verwandte Projekte](#related-projects)
- [Änderungsprotokoll](#changelog)
- [Lizenz](#license)

---

## Integrationsvergleich

Die per Reverse Engineering entwickelte API der Bosch Smart Home Kamera wird über vier verwandte Projekte bereitgestellt. Wählen Sie dasjenige aus, das zu Ihrer Plattform passt.

| Besonderheit                                                                             | [Integration von Home Assistant](https://github.com/mosandlt/Bosch-Smart-Home-Camera-Tool-HomeAssistant) | [Python CLI-Tool](https://github.com/mosandlt/Bosch-Smart-Home-Camera-Tool-Python) | [ioBroker-Adapter](https://github.com/mosandlt/ioBroker.bosch-smart-home-camera)                  | [MCP-Server](https://github.com/mosandlt/Bosch-Smart-Home-Camera-Tool-MCP)                                           | [Frontend (NiceGUI)](https://github.com/mosandlt/Bosch-Smart-Home-Camera-Tool-Python-frontend) | [Node-RED](https://github.com/mosandlt/Bosch-Smart-Home-Camera-Tool-NodeRED) |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **Reife**                                                                                | v15.0+ — HA Quality Scale **Platinum**                                                                   | v10.12+ stabil (Mini-NVR BETA)                                                     | Version 1.8+ stabil · npm                                                                         | v1.7+ stabil · PyPI                                                                                                  | Version 0.4.0 **alpha** · PyPI                                                                 | Version 0.4.0 **Alpha** · npm                                                |
| **Plattform**                                                                            | Home Assistant (HACS)                                                                                    | Eigenständige Python 3.10+ CLI                                                     | ioBroker (npm)                                                                                    | Python 3.10+ · pipx / uvx · stdio + streamable-HTTP für MCP-Clients (Claude Desktop, Claude Code, benutzerdefiniert) | NiceGUI-Webanwendung · Python 3.10+                                                            | Node-RED-Palette · npm                                                       |
| **Login**                                                                                | OAuth2 PKCE (Browser)                                                                                    | OAuth2 PKCE (Browser)                                                              | OAuth2 PKCE (Browser)                                                                             | ◑ teilt CLI `bosch_config.json`                                                                                       | ◑ teilt CLI `bosch_config.json`                                                                 | ◑ Aktualisierungstoken von der CLI                                           |
| **Momentaufnahmen**                                                                      | ✅ Einheimisch `Camera.image`                                                                              | ✅`snapshot` Befehl                                                                 | ✅ Dateispeicher + Base64-DP                                                                       | ✅`bosch_camera_snapshot` (Nur LAN)                                                                                   | ✅ Live- und Event-Fallback                                                                     | ✅`snapshot` Knoten                                                           |
| **Live-RTSP-Stream (LAN)**                                                               | ✅ über die HA Stream-Komponente                                                                          | ✅ ffmpeg/RTSPS-Ausgabe                                                             | ✅ TLS-Proxy → lokaler RTSP                                                                        | ✅`bosch_camera_stream_url` (Nur LAN, keine Cloud-Weiterleitung)                                                      | ◑ intern (go2rtc)                                                                              | ◑`stream-url` Knoten (nur URL)                                               |
| **WebRTC (Latenz unter einer Sekunde)**                                                  | ✅ über integriertes go2rtc                                                                               | ✅ _(v10.6.0)_ `live --webrtc`                                                       | ❌                                                                                                 | ❌                                                                                                                    | ✅ via go2rtc (ansonsten Snapshot)                                                              | ❌                                                                            |
| **Dual-Stream-URL (Haupt- + Neben-)**                                                    | ✅`sensor.bosch_<n>_stream_url` +`_sub` _(v12.4.0, optional pro Kamera)_                                  | ✅`info` zeigt beides ·`live --sub` _(v10.5.0)_                                     | ✅`stream_url` +`stream_url_sub` _(v0.5.3 experimentell)_                                          | ◑`bosch_camera_stream_url` — nur Mainstream                                                                          | ❌ _(nur Unterstrom)_                                                                           | ◑ Nur URL – keine Unteroption                                                |
| **Externer Rekorder (BlueIris, Frigate)**                                                | ✅ via go2rtc                                                                                             | ✅ Standardauspuffrohr                                                              | ✅ Digest-Creds-URL + LAN-Bindungsoption                                                           | ✅ URL zurückgegeben, Übergabe an ffmpeg / go2rtc nachgelagert                                                        | ❌                                                                                              | ◑`stream-url` → Draht stromabwärts                                           |
| **Datenschutzmodus**                                                                     | ✅ Entität wechseln                                                                                       | ✅ Befehl                                                                           | ✅ DP                                                                                              | ✅`bosch_camera_privacy_set` (LAN-Fallback über `prefer_local`)                                                       | ✅ Umschalten                                                                                   | ✅`privacy` Knoten                                                            |
| **Frontscheinwerfer (Gen1/Gen2)**                                                        | ✅ Lichtwesen                                                                                             | ✅ Befehl                                                                           | ✅ DP                                                                                              | ✅`bosch_camera_light_set` (LAN-Fallback)                                                                             | ❌ _(Phase 2 Stub)_                                                                             | ✅`bosch-camera-light` Node _(v0.3.0-alpha)_                                  |
| **RGB-Wandfluter (Gen2 Outdoor II)**                                                     | ✅ Licht mit RGB                                                                                          | ◑ Nur Ein/Aus – kein RGB                                                           | ✅ Farb- und Helligkeits-DPs                                                                       | ❌ _(nur Ein/Aus – RGB nicht sichtbar)_                                                                               | ❌                                                                                              | ◑ Nur Ein/Aus + Intensität — kein RGB _(v0.3.0-alpha)_                       |
| **Panikalarmsirene**                                                                     | ✅ Tastenentität _(Gen2 Indoor II)_                                                                       | ✅ Befehl _(nur Gen2 Indoor II)_                                                    | ✅ DP                                                                                              | ✅`bosch_camera_siren_trigger` _(Nur Gen2 Indoor II)_                                                                 | ✅ Auslöser + Dauer _(nur Gen2 Indoor II)_                                                      | ❌                                                                            |
| **Firmware-Update**                                                                      | ✅ Update-Entity + Reparaturen fix-flow, Installationsschaltfläche _(v14.4.10)_                           | ✅ Status + Installation _(v10.11.0)_                                               | ✅ Firmware-Status + Installationsauslöser, Schreibschutz _(v1.8.0)_                               | ✅ Status + Installationstools _(v1.7.0)_                                                                             | ◑ Nur-Lese-Statusanzeige, keine Installationsaktion                                            | ✅ Status + Installationsknoten _(v0.4.0-alpha)_                              |
| **Bilddrehung 180°**                                                                     | ✅ Schalter                                                                                               | ❌                                                                                  | ✅ DP                                                                                              | ❌                                                                                                                    | ❌                                                                                              | ❌                                                                            |
| **Bewegungs-/Personen-/Audioereignisse**                                                 | ✅ FCM-Push + Polling-Fallback                                                                            | ◑`watch` Nur Befehl (Ereignisbefehl entfernt)                                      | ✅ FCM-Push + Polling-Fallback                                                                     | ✅`bosch_camera_events` (Abruf auf Abruf)                                                                             | ◑ Tabelle für Ereignisse, die nur per Pull-Funktion abgerufen werden können                    | ✅`event` Knoten (Umfrage)                                                    |
| **Bewegungsflanken-Triggerzustand**                                                      | ✅`binary_sensor.motion`                                                                                  | n / A                                                                              | ✅`motion_active` DP _(v0.5.3)_                                                                    | n. v. _(Anfrage-Antwort-Verfahren, kein Abonnement)_                                                                 | ❌                                                                                              | ❌                                                                            |
| **Automatische Schnappschussaufnahme bei Bewegung**                                      | ✅ Aktualisiert die Kameraentität                                                                         | n / A                                                                              | ✅ schreibt `last_event_image` base64 _(v0.5.3)_                                                    | n. v. _(keine Hintergrundschleife)_                                                                                  | ❌                                                                                              | ❌                                                                            |
| **Synthetischer Bewegungsauslöser (externer Sensor)**                                    | ✅ Service                                                                                                | n / A                                                                              | ✅ DP                                                                                              | ❌                                                                                                                    | ❌                                                                                              | ❌                                                                            |
| **Bewegungszonen / Sichtschutzmasken**                                                   | ✅ Lesen + Schreiben                                                                                      | ✅ Lesen + Schreiben                                                                | ✅ Lesen + Schreiben _(v1.8.0)_                                                                    | ✅ Abrufen / Festlegen / Löschen _(v1.7.0)_                                                                           | ❌ _(Noch kein visueller Editor verfügbar)_                                                     | ❌                                                                            |
| **Automatisierungsregeln / Zeitpläne**                                                   | ✅ Lesen + Schreiben                                                                                      | ✅ Lesen + Schreiben                                                                | ✅ Vollständige CRUD-Funktionalität _(v1.8.0)_                                                     | ✅ Auflisten / Hinzufügen / Bearbeiten / Löschen _(v1.7.0)_                                                           | ✅ vollständige CRUD-Funktionalität (Auflisten/Hinzufügen/Bearbeiten/Löschen)                   | ❌                                                                            |
| **Beleuchtungsplan**                                                                     | ✅ lesen (Schreiben über den Dienst, nur Gen1 Eyes Outdoor)                                               | ✅ Lesen + Schreiben                                                                | ✅ gelesen _(nur Gen1, Version 1.2.0)_                                                             | ✅ Abrufen / Festlegen _(v1.7.0)_                                                                                     | ✅ Lesen + Schreiben _(Outdoor-Kameras von Eyes)_                                               | ❌                                                                            |
| **Cloud-Clip-Download (Verlauf \~30 Tage)**                                              | ✅ über den Medienbrowser                                                                                 | ❌                                                                                  | ❌ _(geparkt – noch keine Anfrage aus der Community)_                                              | ❌ _(absichtlich nicht offengelegt – große Nutzlasten)_                                                               | ❌ _(Befehlszeile verwenden)_                                                                   | ◑`clip_url` in Ereignisnutzlast                                              |
| **Mini-NVR (lokale Aufzeichnung)**                                                       | ✅ kontinuierlich + ereignisgepuffert, Ringpuffer-Vorabrollung _(v11.2.0 BETA → v14.7.0 Modi)_            | ◑ Ereignisgesteuerte Segmentmultiplexierung, kein Vorlaufring _(v10.7.0 BETA)_     | ❌ _(delegiert an einen externen Recorder über einen RTSP-Endpunkt ohne Anmeldeinformationen)_     | ❌ _(kein NVR-Konzept)_                                                                                               | ◑ Nur kontinuierlich, keine ereignisgepufferte Verarbeitung _(v0.4.0-alpha)_                   | ◑ Nur kontinuierlich über `bosch-camera-nvr-record` Node _(v0.4.0-alpha)_     |
| **SMB-/NAS-Clip-Upload**                                                                 | ✅                                                                                                        | ✅ _(v10.7.0 BETA)_                                                                 | ❌                                                                                                 | ❌                                                                                                                    | ❌                                                                                              | ❌                                                                            |
| **Kamera teilen (Freunde)**                                                              | ✅ Dienste (Teilen / Einladen / Liste)                                                                    | ✅ Befehl                                                                           | ✅ Teilen / Einladen / Entfernen _(nur Gen2, Version 1.8.0)_                                       | ✅ Liste / Einladen / Teilen / Freigabe aufheben / Entfernen _(v1.7.0)_                                               | ✅ Auflisten/Einladen/Entfernen/Teilen/Freigabe aufheben                                        | ❌                                                                            |
| **Schwenken/Neigen (360° Gen1)**                                                         | ✅ Dienstleistungen                                                                                       | ✅ Befehl                                                                           | ✅`pan_position` DP                                                                                | ✅`bosch_camera_pan`                                                                                                  | ✅ Schieberegler mit Live-API verbunden                                                         | ❌                                                                            |
| **Benannte Pan-Voreinstellungen (Pos1 / Links / Rechts / Hinten links / Hinten rechts)** | ✅ Opt-in-Auswahl der Entität                                                                             | ✅`pan --preset` Flagge                                                             | ✅`pan_preset` DP                                                                                  | ✅`bosch_camera_pan preset=`                                                                                          | ❌                                                                                              | ❌                                                                            |
| **Zwei-Wege-Audio / Gegensprechanlage**                                                  | ❌                                                                                                        | ✅ Befehl                                                                           | ❌                                                                                                 | ◑ Nur-Anhören `bosch_camera_intercom_open` _(v1.7.0)_                                                                 | ❌                                                                                              | ❌                                                                            |
| **Webhook-Übermittlung bei Ereignissen**                                                 | ✅ Service + optionale Zusatzleistungen                                                                   | ✅`watch --webhook URL`                                                             | ✅ über MQTT-Brücke                                                                                | ❌ _(Anfrage-Antwort-Modell)_                                                                                         | ❌                                                                                              | ❌                                                                            |
| **MQTT-Ereignisbrücke (Bewegung / Audio / Person)**                                      | n. v. _(HA-Ereignisbus-nativ)_                                                                           | n. v. _(einmalige Auflage)_                                                        | ✅ admin-config                                                                                    | n / A                                                                                                                | ❌                                                                                              | ❌                                                                            |
| **Apple HomeKit (über HA Core Bridge)**                                                  | ✅ dokumentiert                                                                                           | n / A                                                                              | n / A                                                                                             | n / A                                                                                                                | n / A                                                                                          | n / A                                                                        |
| **Momentaufnahme-Planer / Zeitraffer**                                                   | ✅ Beispiele/ YAML                                                                                        | ✅ Cron- und ffmpeg-Beispiele                                                       | ✅ Blockly-Beispiel                                                                                | n / A                                                                                                                | ❌                                                                                              | ❌                                                                            |
| **Native Dashboard-Karte / Widget**                                                      | ✅ 2 Lovelace-Karten (einzeln + Raster)                                                                   | n / A                                                                              | ✅ 2 vis-2 Widgets – BoschCamera + BoschOverview Multi-Cam                                         | n / A                                                                                                                | ✅ _(ist selbst ein Web-Dashboard)_                                                             | ❌                                                                            |
| **Bild-in-Bild-Funktion bleibt auch bei Hintergrund-Tab erhalten**                       | ✅`hass-suspend-when-hidden` Keep-Alive _(v14.0.0)_                                                       | n/a (keine Benutzeroberfläche)                                                     | ✅ Eigene PiP-Funktion + Wiederherstellung nach Einfrieren, Web-Worker-Heartbeat _(v1.7.2/v1.7.3)_ | n/a (keine Benutzeroberfläche)                                                                                       | ✅ Wiederverbindungs-Timeout + Wiederherstellung nach Einfrieren _(v0.4.0-alpha)_               | n/a (keine Benutzeroberfläche)                                               |
| **Cloud-Relay-Fernausweichlösung**                                                       | ✅ Automatische Umschaltung bei Nichterreichbarkeit des LAN                                               | ✅ Fernbedienungsmodus                                                              | ❌ _(Aus Prinzip nur lokal erhältlich)_                                                            | ❌ _(Medien nur LAN; Status/Ereignisse über Cloud)_                                                                   | ◑ erbt CLI                                                                                     | ◑ Fernbedienungsoption (manuell)                                             |
| **Browserbasierte Benutzeroberfläche für Administration/Konfiguration**                  | ✅ HA-Konfigurationsablauf                                                                                | n. v. (CLI)                                                                        | ✅ JSON-Konfigurationsregisterkarten                                                               | n. v. (LLM-vermittelt; Konfiguration über CLI / MCP-Client)                                                          | ✅ Einstellungsseite                                                                            | ◑ Editor-Konfigurationsknoten                                                |
| **UI-Sprachen**                                                                          | EN · DE · FR · ES · IT · NL · PL · PT · RU · UK · ZH-Hans _(v12.4.0)_                                    | EN · DE · FR · ES · IT · NL · PL · PT · RU · UK · ZH-Hans _(v10.3.0)_              | EN · DE · FR · ES · IT · NL · PL · PT · RU · UK · ZH-CN                                           | n. v. _(keine Benutzeroberfläche – LLM ist das Frontend)_                                                            | ◑ Backend-Internationalisierung · Benutzeroberfläche größtenteils Englisch                     | n. v. _(nur auf Englisch verfügbar)_                                         |

**Legende:** ✅ unterstützt · ❌ nicht unterstützt / nicht geplant · n/a nicht zutreffend für diese Plattform.

> Alle vier Projekte basieren auf der gleichen, durch Reverse Engineering entwickelten Cloud-API und dem RCP-Protokoll, entwickeln sich aber unabhängig voneinander weiter. Die Home-Assistant-Integration ist die funktionsreichste Referenzimplementierung; die Python-CLI bietet die niedrigste Ebene für Skripte; der ioBroker-Adapter ist für VIS-Dashboards und Blockly-Automatisierungen vorgesehen; der MCP-Server stellt MCP-Clients (Claude Desktop, Claude Code, benutzerdefiniert) eine speziell angepasste, LAN-basierte Tool-Oberfläche zur Steuerung von Kameras per natürlicher Sprache bereit.

---

## Unterstützte Kameras

Alle vier aktuellen [Bosch Smart Home](https://www.bosch-smarthome.com) Kameras werden unterstützt.

| Kamera              | Generation | Typ                 | Codec / FW gesehen      | Highlights                                                                                                                                        |
| ------------------- | ---------- | ------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **360°-Innenraum**  | Gen1       | Innenbereich        | H.264 + AAC · FW 7.91.x | Schwenk-/Neigemotor, automatische Nachführung, Infrarot-Nachtsicht, mechanischer Sichtschutzverschluss                                            |
| **Eyes Indoor II**  | Gen2       | Innenbereich        | H.264 + AAC · FW 9.40.x | Eingebaute 75-dB-Sirene, Audio+ Glasbruch-/Rauch-/CO-Melder, ZONES-Erkennungsmodus, RGB-LEDs, einziehbarer Kopf (Hardware-Taste für Privatsphäre) |
| **Augen im Freien** | Gen1       | Außenbereich (IP66) | H.264 + AAC · FW 7.91.x | Frontscheinwerfer, bewegungsaktiviertes Licht, Umgebungslichtsensor, zeitgesteuerte Beleuchtung                                                   |
| **Eyes Outdoor II** | Gen2       | Außenbereich (IP66) | H.264 + AAC · FW 9.40.x | RGB-LED-Gruppen vorne, oben und unten, DualRadar (Bewegungserkennung + Einbruchserkennung), Wandfluter-Modus, Montagehöhenparameter               |

---

## Haftungsausschluss

**Dieses Projekt ist ein unabhängiger, von der Community entwickelter Adapter. Es steht in keiner Verbindung zu Robert Bosch GmbH, wird weder von ihr unterstützt noch empfohlen. „Bosch“ und „Bosch Smart Home“ sind eingetragene Marken der Robert Bosch GmbH.**

Dieser Adapter kommuniziert mit einer per Reverse Engineering entwickelten, undokumentierten API. **Er** wird ohne Gewährleistung bereitgestellt. Die Nutzung erfolgt auf eigene Gefahr. Bosch behält sich das Recht vor, die API jederzeit zu ändern oder abzuschalten. Das Reverse Engineering erfolgte ausschließlich zur Gewährleistung der Interoperabilität gemäß **§ 69e UrhG** und **EU-Richtlinie 2009/24/EG** .

---

## Aufstellen

> ⚠ **Der Bosch-Authentifizierungscode in der Weiterleitungs-URL ist ca. 60 Sekunden gültig.** Öffnen Sie den Adapter-Admin-Dialog in einem separaten Tab, BEVOR Sie auf „Anmelden“ klicken, damit Sie die URL direkt nach der Weiterleitung durch Bosch einfügen können. Falls der Code abläuft, klicken Sie einfach erneut auf „Bosch-Anmeldung im Browser öffnen“ – es wird jedes Mal eine neue URL generiert.

1. **Installieren Sie** den Adapter und erstellen Sie eine Instanz (der Adapter startet im Modus "Warten auf Anmeldung").
2. **Öffnen Sie den Admin-Dialog des Adapters** (Instanzen → bosch-smart-home-camera → Schraubenschlüssel-Symbol). Im Tab „Verbindung“ wird der Anmeldevorgang angezeigt; **lassen Sie diesen Dialog in einem Tab geöffnet** .
3. **Klicken Sie auf „Bosch-Login im Browser öffnen“** – Ihre Bosch SingleKey ID öffnet sich in einem neuen Tab. Melden Sie sich an (ggf. mit Captcha/MFA).
4. **Bosch leitet** Ihren Browser um zu `https://www.bosch.com/boschcam?code=…&state=…` Die Seite kann leer sein oder einen 404-Fehler anzeigen – das ist normal. **Kopieren Sie umgehend** die vollständige URL aus der Adressleiste.
5. **Wechseln Sie zurück zum Admin-Tab des Adapters** und fügen Sie die URL in das Feld „Eingefügte Callback-URL“ ein. Speichern Sie anschließend. Führen Sie dies innerhalb von ca. 60 Sekunden nach der Weiterleitung durch, da der Autorisierungscode sonst abläuft und Sie den Vorgang wiederholen müssen.
6. Der Adapter startet neu, tauscht den Authentifizierungscode gegen Tokens aus, ruft Ihre Kameras ab und startet den FCM-Listener. Bei zukünftigen Neustarts wird der Browserschritt übersprungen, solange das gespeicherte Aktualisierungstoken noch gültig ist.

**Falls die Schaltfläche „Admin“ nicht verfügbar ist** (sehr alte ioBroker-Admin-Versionen): Der Adapter veröffentlicht die Anmelde-URL auch als Statusobjekt – offen `Objects → bosch-smart-home-camera.0 → info → login_url` Klicken Sie auf den Wert, um den Anmeldevorgang zu starten. Der Schritt zum Weiterleiten und Einfügen ist derselbe.

**Wenn der Autorisierungscode abläuft** (Sie werden sehen `code expired` Wenn Sie nach dem Einfügen im Protokoll etwas sehen, keine Panik – klicken Sie einfach erneut auf „Bosch-Login im Browser öffnen“. Der Adapter generiert bei jedem Klick eine neue URL.

Falls das Aktualisierungstoken jemals abgelehnt wird (nach einer Änderung des Bosch-Passworts oder einer längeren Ausfallzeit), protokolliert der Adapter eine neue Anmelde-URL und Sie wiederholen die Schritte 3–5.

### OAuth2 PKCE-Anmeldeablauf

```mermaid
sequenceDiagram
    autonumber
    participant U as User (browser)
    participant A as ioBroker Adapter
    participant B as Bosch SingleKey ID

    A->>A: generate PKCE verifier + state
    A->>U: log login URL (challenge + state)
    U->>B: open URL, enter credentials, solve captcha/MFA
    B->>U: redirect to bosch.com/boschcam?code=...&state=...
    U->>A: paste callback URL into Admin UI
    A->>B: POST /token (code + PKCE verifier)
    B-->>A: access_token + refresh_token
    A->>A: AES-encrypt + persist (info.access_token / info.refresh_token / info.fcm_creds)
    A->>B: GET /v11/video_inputs (with bearer)
    B-->>A: camera list
    A->>A: build per-camera DP tree, start FCM listener
```

---

## Architektur

```mermaid
flowchart LR
    Cam["Bosch Cameras<br/>Gen1 + Gen2<br/>HTTPS :443"] -->|TLS tunnel| Proxy["Adapter TLS proxy<br/>127.0.0.1:&lt;port&gt;"]
    Cloud[Bosch CBS API<br/>residential.cbs<br/>.boschsecurity.com] -->|"FCM push<br/>OAuth2 PKCE<br/>REST: events / video_inputs<br/>/ lighting / privacy"| Adapter
    Adapter[ioBroker Adapter<br/>Node.js] --> DPs[(Encrypted DPs<br/>encryptedNative)]
    Proxy --> Adapter
    DPs --> VIS[VIS / VIS-2<br/>Dashboard]
    DPs --> Blockly[Blockly / JS<br/>automations]
    Proxy -.->|rtsp://...<br/>LAN-bind opt| Recorders[BlueIris / Frigate<br/>iobroker.cameras]
    Adapter -->|file-store| Snapshots[snapshot.jpg<br/>last_event_image]
```

### Netzwerkverbindungen

Der ioBroker-Host muss die IP-Adresse jeder Kamera im LAN erreichen können. Die Bosch-Cloud erkennt die Kamera-IP automatisch, der Datenverkehr für Streams, Snapshots und RCP fließt jedoch direkt vom ioBroker-Host zur Kamera. Wird dieser Pfad durch eine Firewall, eine VLAN-Grenze oder ein Gastnetzwerk blockiert, werden der Live-MJPEG/RTSP-Stream und die On-Demand-Snapshots über einen (langsameren) Cloud-Pfad übertragen.

#### Erforderliche Anschlüsse

| Richtung                                                              | Protokoll / Port  | Zweck                                                                                            | Erforderlich       |
| --------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------ | ------------------ |
| ioBroker-Host → Kamera-IP                                             | **TCP/443**       | Schnappschüsse, Kamera-REST-API, RTSPS-Livestream (alles läuft über eine einzige TLS-Verbindung) | **Ja**             |
| ioBroker-Host →`*.boschsecurity.com`                                  | TCP/443           | OAuth, Remote-/Cloud-Fallback-Stream, FCM-Push-Registrierung                                     | Ja                 |
| ioBroker-Host →`fcm.googleapis.com` /`mtalk.google.com`               | TCP/5228          | FCM-Push-Benachrichtigungen (automatischer Rückgriff auf Abfrage)                                | Optional           |
| Externer Rekorder (BlueIris/Frigate/iobroker.cameras) → ioBroker-Host | TCP/`stream_port` | Lokales RTSP-Relay, das vom Adapter bereitgestellt wird                                          | Nur bei Verwendung |

Der Adapter selbst **benötigt lediglich TCP/443 vom ioBroker-Host zur Kamera** . Kein UDP, keine eingehende Portweiterleitung am Router.

#### Häufige Fallstricke

- **Kamera in einem anderen Subnetz/VLAN als ioBroker** – z. B. Kameras an `192.168.168.x` und ioBroker auf `192.168.1.x` Der Router/die Firewall muss ausgehende Verbindungen von der IP-Adresse des ioBroker-Hosts zur IP-Adresse der Kamera über TCP/443 zulassen.
- **Die IoT/Gastnetzwerk-Isolation** (FRITZ!Box "Gastzugang", Unifi Gastnetzwerk) blockiert standardmäßig LAN-zu-LAN-Verbindungen.
- **Die Kamera ist über die Bosch-App erreichbar, nicht aber über ioBroker** – die App kommuniziert über die Cloud, daher lässt sich daraus nichts über die Erreichbarkeit im LAN ableiten.
- **Der externe Recorder kann das Relay nicht erreichen** – der Adapter bindet das RTSP-Relay an den ioBroker-Host. Stellen Sie sicher, dass Ihre Recorder-VM/Ihr Container das Relay erreichen kann. `stream_host:stream_port` im LAN.

#### Kurzer Check vom ioBroker-Host

```bash
nc -vz 192.168.x.y 443
curl -k -v --connect-timeout 5 https://192.168.x.y/   # alternative
```

Wenn beide Verbindungen eine Zeitüberschreitung verursachen oder die Meldung „Verbindung abgelehnt“ zurückgeben, liegt das Problem zwischen ioBroker und der Kamera (Netzwerk/Firewall), nicht am Adapter.

### Wartungs-RSS-Flow

```mermaid
sequenceDiagram
    participant Tick as Adapter tick (hourly)
    participant RSS as Bosch Community RSS
    participant MP as maintenance parser
    participant DP as info.maintenance.*

    Tick->>RSS: fetch Wartungsarbeiten + Statusmeldungen
    RSS-->>MP: raw feed entries (+ HTML fallback)
    MP-->>MP: parse title / time window / camera_relevant
    MP-->>DP: state: active / scheduled / past / recent / idle
    DP-->>DP: last_notification written on state transition
    Note over Tick,DP: reactive re-fetch (5 min cooldown) on any 5xx
```

### LAN-Fallback bei Cloud-Ausfall

```mermaid
sequenceDiagram
    participant DP as cameras.<id>.privacy_enabled<br/>cameras.<id>.front_light_enabled
    participant Adapter
    participant Cloud as Bosch CBS API
    participant RCP as Camera LAN RCP
    participant Cam as Camera LAN :443

    DP->>Adapter: handlePrivacyToggle / _applyLightingState
    Adapter->>Cloud: PUT /v11/.../privacy or lighting
    Cloud-->>Adapter: 5xx (cloud outage)
    Adapter->>Adapter: lan_ip known + Gen2?
    Adapter->>RCP: RCP write (0x0d00 / 0x0c22)
    RCP->>Cam: HTTPS Digest + payload
    Cam-->>Adapter: 200 OK (local fallback)
    Adapter-->>DP: update + _localWriteAt stamp
```

---

## Status

**Stabile Version (v1.8.2)** – Live-Test mit 4 Kameras (Gen1 + Gen2, Firmware 7.91.56 / 9.40.102) auf einer realen ioBroker-Instanz. Cloud-API-Verträge wurden über mitmproxy mit der iOS-App bestätigt.

Was funktioniert:

- Browserbasierte OAuth2 PKCE-Anmeldung über Bosch SingleKey ID (keine programmatische Passwortverarbeitung – Captcha/MFA erfolgen im Browser)
- Automatische Token-Aktualisierung (ca. 45 Minuten; 4xx → erneute Anmeldung erforderlich, 5xx → automatischer Wiederholungsversuch). Gespeichert `refresh_token` wird auch beim Start verwendet, um eine frische Prägung zu erzeugen `access_token` im Hintergrund – nach einem Neustart ist keine erneute Anmeldung per PKCE erforderlich, selbst wenn der Adapter länger als die einstündige Gültigkeitsdauer des Zugriffstokens angehalten war.
- Kameraerkennung (Gen1 + Gen2, `GET /v11/video_inputs`)
- Zustandsbaum pro Kamera: `name`, `firmware_version`, `hardware_version`, `generation`, `online`, `privacy_enabled`, `light_enabled`, `front_light_enabled`, `wallwasher_enabled`, `image_rotation_180`, `snapshot_trigger`, `motion_trigger`, `motion_trigger_event_type`, `snapshot_path`, `stream_url`, `stream_host`, `stream_port`, `stream_path`, `last_motion_at`, `last_motion_event_type` — plus tägliche Ereigniszähler, Lese- und Schreibzugriffe auf Bewegungszonen/Datenschutzmasken/Regeln, Firmware-Status und -Installation sowie Datenpunkte für die Freundesfreigabe der 2. Generation (v1.2.0–v1.8.0, vollständige Liste unten unter [„Datenpunkte](#datapoints) “)
- Datenschutz-Umschalter über die Bosch Cloud API `PUT /v11/video_inputs/{id}/privacy`
- Lichtschalter, generationsspezifisch und jetzt in unabhängige Datenpunkte aufgeteilt:
  - Gen2: `PUT /lighting/switch/front` +`/topdown`
  - Gen1: `PUT /lighting_override` (Frontlicht an + Wandfluter an)
  - `front_light_enabled` Und `wallwasher_enabled` können unabhängig voneinander umgeschaltet werden; `light_enabled` bleibt als kombinierter Legacy-Schalter
- Synthetischer Bewegungsauslöser (`motion_trigger` Schreibgeschützte Schaltfläche +`motion_trigger_event_type` Wahlschalter) zur Integration externer Sensoren ohne Warten auf den Bosch FCM-Druck
- Der Snapshot-Trigger schreibt JPEG-Dateien in den Adapter-Dateispeicher (`/<namespace>/cameras/<id>/snapshot.jpg`), mit automatischem Wiederholungsversuch beim ersten „Stream wurde abgebrochen“-Fehler, den die Bosch Gen2-Firmware nach dem Leerlauf ausgibt. Ein Startbild pro Kameraumdrehung. `cameras.<id>.online` aus der Standardeinstellung `false` sofort in den realen Zustand.
- TLS-Proxy pro Kamera: `stream_url = rtsp://127.0.0.1:<port>/rtsp_tunnel` zur Verwendung in `iobroker.cameras` oder go2rtc. Aus Designgründen nur lokal – keine Cloud-Weiterleitung.
- RTSP-Sitzungsüberwachung: Lokale Sitzungen werden automatisch ca. 60 Sekunden vorher erneuert `maxSessionDuration` Ablaufdatum – Die 24/7-Aufnahme funktioniert ohne stündliche Stream-Ausfälle.
- FCM Push-Listener (`@aracna/fcm@1.0.32` MTalk/MCS) für Bewegungs-/Audioalarm-/Personenereignisse im Subsekundenbereich. `info.fcm_active` spiegelt den Zustand wider: `healthy` /`polling` /`error` /`disconnected` /`stopped` Wenn die Push-Registrierung fehlschlägt, greift der Adapter auf die Standardmethode zurück. `/v11/events` Umfrage alle 60 Sekunden (`info.fcm_active=polling` Ereignisse treffen weiterhin ein, nur mit höherer Latenz. Das Abfrageintervall ist über die `poll_interval` Einstellung (API-Anfragen / Registerkarte „Energiesparmodus“, Version 1.4.1+).
- Verschlüsselte Speicherung von Anmeldeinformationen (`encryptedNative` — js-controller verschlüsselt das Refresh-Token im Ruhezustand)
- Cloud-API-Managementebene **WRITE** (v1.8.0): Bewegungszonen, Datenschutzmasken, Automatisierungsregeln (Erstellen/Aktualisieren/Löschen), Kamerafreigabe der 2. Generation (Freunde teilen/einladen/entfernen) und ein Auslöser für die Firmware-Installation – gleich `/v11` Die Endpunkte, wie die Home Assistant-Integration und die Python-CLI, wurden byte-verifiziert. Der geräteinterne RCP-Zonen-/Maskeneditor bleibt bis zum Erhalt eines umfassenderen lokalen Schreibzugriffs von Bosch deaktiviert.
- Gepoolte Keep-Alive-HTTPS-Verbindungen (v1.8.1) für lokale Digest- und Cloud-API-Anfragen anstelle eines neuen TCP+TLS-Handshakes pro Aufruf
- Mehr als 1480 Unit-Tests bestanden

---

## Datenpunkte

Datenpunkte pro Kamera unter `cameras.<id>.*`:

| Datenpunkt                                                                                                          | Typ                            | Beschreibung                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                                                                                                              | Zeichenkette                   | Kameraname (aus dem Bosch-Konto)                                                                                                                                                                                                             |
| `firmware_version`                                                                                                  | Zeichenkette                   | Aktuelle Firmware-Version                                                                                                                                                                                                                    |
| `hardware_version`                                                                                                  | Zeichenkette                   | Hardware-Modellzeichenfolge                                                                                                                                                                                                                  |
| `generation`                                                                                                        | Zeichenkette                   | `Gen1` oder `Gen2`                                                                                                                                                                                                                           |
| `online`                                                                                                            | boolescher Wert                | Kamera erreichbar                                                                                                                                                                                                                            |
| `privacy_enabled`                                                                                                   | boolescher Wert                | Datenschutzmodus ein/aus                                                                                                                                                                                                                     |
| `front_light_enabled`                                                                                               | boolescher Wert                | Frontscheinwerfer ein/aus                                                                                                                                                                                                                    |
| `wallwasher_enabled`                                                                                                | boolescher Wert                | RGB-Wandfluter ein/aus (Gen2 Außenbeleuchtung)                                                                                                                                                                                               |
| `wallwasher_color`                                                                                                  | Zeichenkette                   | VERHEXEN `#RRGGBB` leer = warmweißer Modus                                                                                                                                                                                                    |
| `wallwasher_brightness`                                                                                             | Nummer                         | 0–100                                                                                                                                                                                                                                        |
| `top_led_brightness`                                                                                                | Nummer                         | 0–100, Gen2 Außenansicht – nur obere LED-Gruppe (unabhängig von `wallwasher_brightness`)                                                                                                                                                     |
| `bottom_led_brightness`                                                                                             | Nummer                         | 0–100, Gen2 Außenbeleuchtung – nur untere LED-Gruppe (unabhängig von `wallwasher_brightness`)                                                                                                                                                |
| `front_light_white_balance`                                                                                         | Nummer                         | -1,0 (kalt/6500K) .. 1,0 (warm/2000K), Gen2 Außen-Frontscheinwerfer – passt zur Polarität der HA-Integration                                                                                                                                 |
| `soft_light_fading`                                                                                                 | boolescher Wert                | Sanftes Ein- und Ausblenden der LED bei Dunkelheit (Gen2 Outdoor)                                                                                                                                                                            |
| `rename`                                                                                                            | Zeichenkette                   | Verfassen Sie einen neuen Kameratitel — `PUT /v11/video_inputs`                                                                                                                                                                              |
| `soft_reset`                                                                                                        | Taste                          | Kamera neu starten                                                                                                                                                                                                                           |
| `hard_reset_confirm`                                                                                                | Zeichenkette                   | Geben Sie den genauen aktuellen Titel der Kamera ein und schreiben Sie dann `hard_reset=true` Innerhalb von 60 Sekunden – Sicherheitsvorkehrung, läuft ab und muss nach 60 Sekunden oder bei jedem abgelehnten Versuch neu eingegeben werden. |
| `hard_reset`                                                                                                        | Taste                          | **Destruktiv** : Kamera auf Werkseinstellungen zurücksetzen (erfordert `hard_reset_confirm` (zuerst abgleichen) — die Kamera verliert die Kopplung mit dem Bosch-Konto und muss neu in Betrieb genommen werden                                |
| `ai_description`                                                                                                    | Zeichenkette                   | KI-Analyse: Beschreibung des zuletzt analysierten Schnappschusses (siehe [KI-Kameraanalyse](#ai-camera-analysis) )                                                                                                                           |
| `ai_score`                                                                                                          | Nummer                         | KI-Analyse: Verdachtsgrad 1 (harmlos) – 10 (sehr verdächtig)                                                                                                                                                                                 |
| `ai_last_analysis`                                                                                                  | Nummer                         | KI-Analyse: Epochen-Millisekunden-Zeitstempel der letzten abgeschlossenen Analyse                                                                                                                                                            |
| `ai_analyze`                                                                                                        | Taste                          | Trigger AI-Analyse des neuesten Snapshots                                                                                                                                                                                                    |
| `image_rotation_180`                                                                                                | boolescher Wert                | 180°-Bilddrehung                                                                                                                                                                                                                             |
| `livestream_enabled`                                                                                                | boolescher Wert                | RTSP-Livestream-Umschalter aktivieren                                                                                                                                                                                                        |
| `stream_url`                                                                                                        | Zeichenkette                   | `rtsp://user:pwd@host:port/rtsp_tunnel?inst=1&…`                                                                                                                                                                                             |
| `stream_url_sub`                                                                                                    | Zeichenkette                   | Sub-Stream-URL (`inst=2`, experimentell)                                                                                                                                                                                                    |
| `stream_host`                                                                                                       | Zeichenkette                   | Gastgeberteil von `stream_url` — in iobroker.cameras einfügen "Kamera-IP"                                                                                                                                                                     |
| `stream_port`                                                                                                       | Nummer                         | Hafenteil von `stream_url` — in iobroker.cameras "Port" einfügen                                                                                                                                                                              |
| `stream_path`                                                                                                       | Zeichenkette                   | Pfad+Abfrage von `stream_url` — in iobroker.cameras "Path" (Protocol = TCP) einfügen                                                                                                                                                          |
| `snapshot_trigger`                                                                                                  | Taste                          | Neues JPEG abrufen `snapshot_path`                                                                                                                                                                                                           |
| `snapshot_path`                                                                                                     | Zeichenkette                   | Dateispeicherpfad für das letzte JPEG                                                                                                                                                                                                        |
| `last_event_image`                                                                                                  | Zeichenkette                   | Base64 `data:image/jpeg;base64,…` (automatische Schnappschussaufnahme bei Bewegung)                                                                                                                                                           |
| `last_event_image_at`                                                                                               | Zeichenkette                   | ISO 8601-Zeitstempel des letzten Ereignisbildes                                                                                                                                                                                              |
| `motion_trigger`                                                                                                    | boolescher Wert                | Schreiben `true` um ein synthetisches Bewegungsereignis einzufügen                                                                                                                                                                            |
| `motion_trigger_event_type`                                                                                         | Zeichenkette                   | `motion`/`person` / `audio_alarm`                                                                                                                                                                                                            |
| `motion_active`                                                                                                     | boolescher Wert                | Flankenauslösung: `true` für 90 Sekunden nach der Bewegung, dann `false`                                                                                                                                                                      |
| `last_motion_at`                                                                                                    | Zeichenkette                   | ISO 8601-Zeitstempel des letzten Bewegungsereignisses                                                                                                                                                                                        |
| `last_motion_event_type`                                                                                            | Zeichenkette                   | `motion` /`person` / `audio_alarm`                                                                                                                                                                                                           |
| `pan_position`                                                                                                      | Nummer                         | Schwenkwinkel ±120° (360° nur Gen1)                                                                                                                                                                                                          |
| `pan_preset`                                                                                                        | Zeichenkette                   | Benannte Voreinstellung: `home`, `left`, `right`, `back-left`, `back-right`                                                                                                                                                                  |
| `siren_active`                                                                                                      | boolescher Wert                | Trigger 75 dB Sirene (Gen2 Indoor II)                                                                                                                                                                                                        |
| `lan_reachable`                                                                                                     | boolescher Wert                | TCP-Ping-Ergebnis gegen die Kamera-LAN-IP-Adresse                                                                                                                                                                                            |
| `lan_ip`                                                                                                            | Zeichenkette                   | Kamera-LAN-IP (wird bei jeder Sitzungsöffnung gespeichert)                                                                                                                                                                                   |
| `maintenance_state`                                                                                                 | Zeichenkette                   | `active` /`scheduled` / `none`                                                                                                                                                                                                               |
| `intrusion_sensitivity`                                                                                             | Nummer                         | DualRadar-Empfindlichkeit 1–5 (Gen2)                                                                                                                                                                                                         |
| `intrusion_distance`                                                                                                | Nummer                         | DualRadar-Erfassungsbereich 1–8 m (Gen2)                                                                                                                                                                                                     |
| `wifi_signal_pct`                                                                                                   | Nummer                         | WLAN-Signalstärke 0–100 %                                                                                                                                                                                                                    |
| `mic_level`                                                                                                         | Nummer                         | Mikrofonaufnahmepegel 0–100                                                                                                                                                                                                                  |
| `speaker_level`                                                                                                     | Nummer                         | Lautstärke des Gegensprechanlagenlautsprechers 0–100                                                                                                                                                                                         |
| `last_status_notification`                                                                                          | Zeichenkette                   | JSON: Nutzdaten für den Übergang zwischen Kamera-Online- und Offline-Status                                                                                                                                                                  |
| `_proxy_port`                                                                                                       | Nummer                         | Sticky TLS-Proxy-Port (bleibt auch nach Neustarts erhalten)                                                                                                                                                                                  |
| `events_today`                                                                                                      | Nummer                         | Gesamtzahl der Wolkenereignisse heute (UTC Tag)                                                                                                                                                                                              |
| `movement_count`                                                                                                    | Nummer                         | Bewegungsereignisse heute (UTC-Tag)                                                                                                                                                                                                          |
| `audio_count`                                                                                                       | Nummer                         | Audio-Alarmereignisse heute (UTC-Tag)                                                                                                                                                                                                        |
| `motion_enabled`                                                                                                    | boolescher Wert                | Bewegungserkennung ein/aus                                                                                                                                                                                                                   |
| `motion_sensitivity`                                                                                                | Zeichenkette                   | Bewegungsempfindlichkeit auswählen                                                                                                                                                                                                           |
| `detection_mode`                                                                                                    | Zeichenkette                   | Gen2: `all_motions` /`only_humans` / `zones`                                                                                                                                                                                                  |
| `record_sound`                                                                                                      | boolescher Wert                | Audio und Video aufnehmen                                                                                                                                                                                                                    |
| `notifications_enabled`                                                                                             | boolescher Wert                | Haupt-Druckbenachrichtigungsschalter                                                                                                                                                                                                         |
| `notify_movement` /`notify_person` /`notify_audio` /`notify_trouble` /`notify_camera_alarm` /`notify_trouble_email` | boolescher Wert                | Push-Benachrichtigungen pro Ereignistyp aktivieren/deaktivieren                                                                                                                                                                              |
| `motion_zones`                                                                                                      | Zeichenkette (JSON)            | Bewegungssensitive Zonen, Rohdaten `{x,y,w,h}` Array (schreibgeschützter Spiegel)                                                                                                                                                             |
| `motion_zones_count`                                                                                                | Nummer                         | Anzahl der konfigurierten Bewegungszonen                                                                                                                                                                                                     |
| `motion_zones_set`                                                                                                  | Zeichenkette (JSON, schreiben) | **v1.8.0** — ein JSON-Array schreiben `{x,y,w,h}` (0,0–1,0) alle Zonen ersetzen; `[]` räumt sie                                                                                                                                                |
| `privacy_masks`                                                                                                     | Zeichenkette (JSON)            | Sichtschutzmasken, roh `{x,y,w,h}` Array (schreibgeschützter Spiegel)                                                                                                                                                                         |
| `privacy_masks_count`                                                                                               | Nummer                         | Anzahl der konfigurierten Datenschutzmasken                                                                                                                                                                                                  |
| `privacy_masks_set`                                                                                                 | Zeichenkette (JSON, schreiben) | **v1.8.0** — ein JSON-Array schreiben `{x,y,w,h}` (0,0–1,0) alle Masken ersetzen; `[]` räumt sie                                                                                                                                               |
| `rules`                                                                                                             | Zeichenkette (JSON)            | Automatisierungsregeln, Roharray von `{id,name,isActive,startTime,endTime,weekdays}`                                                                                                                                                         |
| `rules_count`                                                                                                       | Nummer                         | Anzahl der konfigurierten Automatisierungsregeln                                                                                                                                                                                             |
| `rule_create`                                                                                                       | Zeichenkette (JSON, schreiben) | **v1.8.0** — Schreiben `{name,isActive,startTime:"HH:MM:SS",endTime:"HH:MM:SS",weekdays:[0-6]}` eine Regel erstellen                                                                                                                          |
| `rule_update`                                                                                                       | Zeichenkette (JSON, schreiben) | **v1.8.0** — Schreiben `{id,...changed fields}` (GET-Merge-PUT)                                                                                                                                                                               |
| `rule_delete`                                                                                                       | Zeichenkette (schreiben)       | **Version 1.8.0** – Regel-ID zum Löschen schreiben                                                                                                                                                                                           |
| `lighting_schedule_status`                                                                                          | Zeichenkette                   | Nur Gen1 – Flutlicht `scheduleStatus` Modus                                                                                                                                                                                                   |
| `lighting_schedule`                                                                                                 | Zeichenkette (JSON)            | Nur Gen1 – Rohmaterial `lighting_options` Zeitplan                                                                                                                                                                                            |
| `ambient_light_schedule`                                                                                            | Zeichenkette (JSON)            | Gen2 Außenbeleuchtung — Umgebungslicht-Zeitplan (`/lighting/ambient`)                                                                                                                                                                       |
| `ambient_light_enabled`                                                                                             | boolescher Wert                | Gen2 Außenbeleuchtung – Umgebungslichtgesteuerte Beleuchtung                                                                                                                                                                                 |
| `motion_light_enabled` /`motion_light_sensitivity`                                                                  | boolescher Wert / Zahl         | Gen2 Außenleuchte – bewegungsaktivierte Leuchte                                                                                                                                                                                              |
| `darkness_threshold`                                                                                                | Nummer                         | Dunkelheitsschwelle bei Umgebungslicht                                                                                                                                                                                                       |
| `shared_with_friends`                                                                                               | Zeichenkette (JSON)            | Nur Gen2 – Freunde, mit denen diese Kamera geteilt wird (Rohdatenarray)                                                                                                                                                                      |
| `shared_with_friends_count`                                                                                         | Nummer                         | Nur Gen2 – Zählen Sie die oben genannten                                                                                                                                                                                                     |
| `camera_share`                                                                                                      | Zeichenkette (JSON, schreiben) | **Version 1.8.0** , nur Gen2 — schreiben `{"friendId":"...","days":30}` (`days` (optional = unbestimmt) diese Kamera freigeben                                                                                                                |
| `friend_invite`                                                                                                     | Zeichenkette (schreiben)       | **Version 1.8.0** , nur Gen2 – Freunde per E-Mail einladen (kontoweit, nicht kameraspezifisch)                                                                                                                                               |
| `friend_remove`                                                                                                     | Zeichenkette (schreiben)       | **Version 1.8.0** , nur Gen2 – Freunde anhand ihrer ID entfernen (kontoweit)                                                                                                                                                                 |
| `firmware_current_version`                                                                                          | Zeichenkette                   | Installierte Kamera-Firmware-Version (über die Cloud gemeldet)                                                                                                                                                                               |
| `firmware_latest_version`                                                                                           | Zeichenkette                   | Neueste verfügbare Kamera-Firmware-Version (über die Cloud gemeldet)                                                                                                                                                                         |
| `firmware_update_available`                                                                                         | boolescher Wert                | Firmware-Update verfügbar                                                                                                                                                                                                                    |
| `firmware_updating`                                                                                                 | boolescher Wert                | Die Firmware-Installation läuft derzeit.                                                                                                                                                                                                     |
| `firmware_install`                                                                                                  | Taste                          | **v1.8.0** — Schreiben `true` um das ausstehende Firmware-Update zu installieren (geschützt gegen Doppelklick oder bereits laufende Installation)                                                                                             |
| `commissioned`                                                                                                      | boolescher Wert                | `GET /commissioned` — Kamera konfiguriert + angeschlossen + in Betrieb genommen                                                                                                                                                              |
| `unread_events_count`                                                                                               | Nummer                         | Ungelesene Cloud-Ereignisse (von `GET /v11/events`)                                                                                                                                                                                          |
| `mark_all_read`                                                                                                     | Taste                          | Markiert alle Cloud-Ereignisse als gelesen                                                                                                                                                                                                   |
| `autofollow_enabled`                                                                                                | boolescher Wert                | 360° Gen1-Nur — automatische Bewegungsverfolgung                                                                                                                                                                                             |
| `alarm_arm` /`alarm_mode` /`pre_alarm`                                                                              | boolescher Wert                | Steuerung des Gen2 Indoor II Alarmsystems                                                                                                                                                                                                    |
| `alarm_state`                                                                                                       | Zeichenkette                   | Status des Gen2 Indoor II Alarmsystems                                                                                                                                                                                                       |
| `pre_alarm_delay` /`alarm_activation_delay`                                                                         | Nummer                         | Gen2 Indoor II Alarmzeit                                                                                                                                                                                                                     |
| `siren_duration`                                                                                                    | Nummer                         | Dauer der Paniksirenenauslösung                                                                                                                                                                                                              |
| `glass_break_detection` /`fire_alarm_detection`                                                                     | boolescher Wert                | Gen2 Audio+ – Geräuscherkennung bei Glasbruch/Rauch- und Feueralarm                                                                                                                                                                          |
| `privacy_sound_enabled`                                                                                             | boolescher Wert                | Akustischer Signalton für den Privatsphäre-Modus                                                                                                                                                                                             |
| `status_led`                                                                                                        | boolescher Wert                | Gen2 — Status-LED ein/aus                                                                                                                                                                                                                    |
| `timestamp_overlay`                                                                                                 | boolescher Wert                | Zeitstempel-Overlay auf dem Bildschirm                                                                                                                                                                                                       |
| `power_led_brightness`                                                                                              | Nummer                         | Gen2 Indoor – Helligkeit der Power-LED                                                                                                                                                                                                       |
| `front_light_intensity`                                                                                             | Nummer                         | Helligkeit des Frontscheinwerfers                                                                                                                                                                                                            |
| `intercom_enabled`                                                                                                  | boolescher Wert                | Gen2 – Zwei-Wege-Audio-Umschalter                                                                                                                                                                                                            |
| `microphone_level`                                                                                                  | Nummer                         | Mikrofonaufnahmepegel 0–100 (Alias von `mic_level`)                                                                                                                                                                                          |
| `onvif_scopes`                                                                                                      | Zeichenkette (JSON)            | ONVIF-Bereichsdiagnose (Cloud-Berichte)                                                                                                                                                                                                      |
| `rcp_version`                                                                                                       | Zeichenkette                   | RCP-Protokollversionsdiagnose                                                                                                                                                                                                                |
| `stream_quality`                                                                                                    | Zeichenkette                   | Auswahl der Streamqualität (hoch/niedrig)                                                                                                                                                                                                    |
| `snapshot_url`                                                                                                      | Zeichenkette                   | Lokale HTTP-Snapshot-Server-URL (`snapshot_http_port` (siehe [Entwicklung](#development) )                                                                                                                                                   |
| `session_limit_hit`                                                                                                 | boolescher Wert                | Das gemeinsame 3-Sitzungs-Kontingent von Bosch wurde für diese Kamera erreicht.                                                                                                                                                              |
| `wifi_ssid`                                                                                                         | Zeichenkette                   | Kamera-WLAN-SSID                                                                                                                                                                                                                             |
| `lens_elevation`                                                                                                    | Nummer                         | Gen2 Outdoor II — Montagehöhenparameter                                                                                                                                                                                                      |

adapterweite Datenpunkte unter `info.*`:

| Datenpunkt                      | Beschreibung                                                      |
| ------------------------------- | ----------------------------------------------------------------- |
| `connection`                    | Boolesch – mindestens eine Kamera angeschlossen                   |
| `connection_status`             | `logged_out` /`awaiting_login` /`connected` / `auth_error`        |
| `login_url`                     | Bosch OAuth-URL (klickbarer Link in der Admin-Benutzeroberfläche) |
| `last_login_at`                 | ISO 8601 der letzten erfolgreichen Token-Prägung                  |
| `fcm_active`                    | `healthy` /`polling` /`error` /`disconnected` / `stopped`         |
| `maintenance.state`             | `active` /`scheduled` /`past` /`recent` /`unknown` / `idle`       |
| `maintenance.title`             | Analysierter Ankündigungstitel                                    |
| `maintenance.scheduled_start`   | ISO 8601 Start                                                    |
| `maintenance.scheduled_end`     | Ende von ISO 8601                                                 |
| `maintenance.camera_relevant`   | Boolesche Variable – Ankündigung erwähnt Kameras                  |
| `maintenance.last_fetched`      | ISO 8601 des letzten erfolgreichen RSS-Abrufs                     |
| `maintenance.last_notification` | JSON-Nutzdaten für das Blockly-Benachrichtigungsrouting           |

---

## Armaturenbrett

Ein sofort importierbares VIS-2-Beispiel-Dashboard ist enthalten.[`docs/vis-2-example/`](./docs/vis-2-example/) — alle vier Kameras in einem 2×2-Raster mit Schnappschussaktualisierung (alle 5 Sekunden), Schaltern für Privatsphäre und Licht, Schnappschuss-Auslöseknopf und einer Statusleiste.

Schnellinstallation:

```bash
cp docs/vis-2-example/vis-views.json ~/iobroker-data/files/vis-2.0/main/
iobroker restart vis-2
```

Dann öffnen `http://HOST:8082/vis-2/index.html#Cameras` in Ihrem Browser.

Sehen[`docs/vis-2-example/README.md`](./docs/vis-2-example/README.md) Die Schritt-für-Schritt-Anleitung enthält unter anderem Informationen zum Tauschen der Kamera-UUIDs und zur Verkabelung von go2rtc / HLS für Live-Video mit niedriger Latenz anstelle der standardmäßigen Snapshot-Aktualisierung.

### VIS-2 Kamera-Widget

Der Adapter enthält zwei integrierte **VIS-2-Widgets** (React / Module-Federation, erstellt aus `src-widgets/`) die ohne Import einer JSON-Datei in jede VIS-2-Ansicht eingefügt werden können.

**Voraussetzungen:** VIS-2-Adapter ≥ 2.13 installiert und funktionsfähig.

---

#### Bosch Kamera (Einzelkamera)

**Anwendung:**

1. Öffnen Sie den VIS-2-Editor (`http://HOST:8082/vis-2/index.html?edit=1`).
2. Suchen Sie im Widget-Bereich nach dem **Bosch Smart Home Camera** Widget-Set.
3. Ziehen Sie **die Bosch-Kamera** in Ihr Sichtfeld.
4. Stellen Sie **den Kameradatenpunkt** auf einen beliebigen DP ein unter `bosch-smart-home-camera.0.cameras.<UUID>` (z.B `.name`) — Die Kamera wird automatisch anhand des Pfades erkannt.
5. Wählen Sie einen **Stream-Modus** (siehe unten).

**Stream-Modi:**

| Modus                                         | Was es zeigt                                                                                                                                 | Bedürfnisse                                             | Audio                                                       |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------- |
| **Momentaufnahme (nahezu live)** _(Standard)_ | `<img>` abgefragt vom Snapshot-HTTP-Server des Adapters (`snapshot_url`) in einem konfigurierbaren Intervall (Standard 1 s)                 | `snapshot_http_port` im Adapter einstellen              | NEIN                                                        |
| **MJPEG (Frames)**                            | Kontinuierliche JPEG-Bilder vom lokalen RTSP-Proxy über FFmpeg, dargestellt auf einer Zeichenfläche; die Wiedergabetaste startet den Stream. | `livestream_enabled = true` +`ffmpeg` auf dem Gastgeber | NEIN                                                        |
| **go2rtc WebRTC**                             | Live-Video mit geringer Latenz über eine native `<video>` Element + WebRTC; automatischer HLS-Fallback bei ICE-Ausfall                        | go2rtc läuft mit der Kamera `stream_url` als Quelle      | **Ja** – Audio-Umschalter + Lautstärkeregler + Pausenschutz |

**Funktionsumfang:**

- Statusanzeigen: Online/Offline, Bewegung, Datenschutz, Verbindungsaufbau (pulsierend), Stream-Verfügbarkeit, HLS-Fallback-Banner, letztes Ereignis, Wartungsbanner
- Datenschutzstatus und Offline-Modus klar getrennt; Cloud-abgeglichener Online-Status
- Tipp-zum-Spielen-Funktion (kein automatischer Start); Stream- und Datenschutz-Cooldown-Schutz
- Optimistische Benutzeroberfläche: Umschaltknöpfe schalten sofort um, automatische Rückstellung bei Fehler
- Digitalzoom (Zoomgeste/Rad) im Vollbildmodus
- Page Visibility API: Snapshot-Rate im Hintergrund gedrosselt
- SVG-Overlays für Bewegungszonen und Datenschutzmasken
- Schwenktasten ◀◀ ◀ ▶ ▶▶ mit Positionsanzeige; nur für den Gen1 360° Indoor (`hardware_version==="INDOOR"`)
- Bedienleiste in Milchglasoptik (iOS/Android/Auto-Design; normales/minimalistisches/kompaktes Layout)
- Vollbildmodus über ein React-Portal (deckt den gesamten Bildschirm ab)
- Bild-in-Bild (WebRTC-Modus): Der Livestream wird in einem schwebenden, immer im Vordergrund liegenden Browserfenster angezeigt – über **allen** Apps in macOS Safari und über dem Browser in Chrome. Der Fenstertitel zeigt den Kameranamen an. Der Browser erlaubt nur **ein** Bild-in-Bild-Fenster. Solange eine Kamera im schwebenden Fenster angezeigt wird, ist die Bild-in-Bild-Schaltfläche aller anderen BoschCamera-Widgets ausgegraut. Sie bleibt jedoch nach einer Wiederherstellung der Stream-Verbindung erhalten. Die Bild-in-Bild-Funktion ist ausgeblendet, wenn der Browser kein Bild-in-Bild unterstützt (die meisten iOS/Android WebViews, Snapshot-/MJPEG-Modi).
- Ausklappbare Akkordeon-Seiten für alle erweiterten Einstellungen: Benachrichtigungen, Erweitert, Gen2 Automatisierung/Sicherheit, Licht & Kamera (inkl. `front_light_intensity` Schieberegler), Diagnose, Zonen, Dienste
- 11 UI-Sprachen (de/en/es/fr/it/nl/pl/pt/ru/uk/zh-cn)

> **Live-Untertitel und -Übersetzung (Browserfunktion, keine Einrichtung erforderlich):** Wenn Ihre Kamera über Audio verfügt, transkribiert **Chrome unter „Einstellungen“ → „Bedienungshilfen“ → „Live-Untertitel“** den gesprochenen Ton im WebRTC-Stream in Echtzeit direkt auf Ihrem Gerät. **Live Translate** übersetzt die Untertitel anschließend in Ihre Sprache. Es sind keine Widget-Änderungen nötig – die Funktion untertitelt automatisch den gesamten im Tab abgespielten Ton (funktioniert parallel zur Bild-in-Bild-Funktion).

**Erstellung des Widgets** (für Mitwirkende): `npm run build:widget` installiert `src-widgets/`, führt den Vite/Module-Federation-Build aus und kopiert das Bundle nach `widgets/bosch-smart-home-camera/` Die

---

#### Bosch-Kameraübersicht (Mehrkamera-Raster)

Das **Bosch Kamera-Übersichts** -Widget zeigt alle Kameras einer Adapterinstanz in einem responsiven Raster an – eine manuelle Konfiguration pro Kamera ist nicht erforderlich.

**Konfigurationsfelder:**

| Feld                     | Beschreibung                                            |
| ------------------------ | ------------------------------------------------------- |
| **Adapterinstanz**       | z.B `bosch-smart-home-camera.0`                          |
| **Spalten**              | Feste Spaltenanzahl (0 = automatisch)                   |
| **Mindestfliesenbreite** | Mindestbreite pro Kachel in Pixeln                      |
| **Offline ausblenden**   | Offline-Kameras nicht anzeigen                          |
| **Steuerung pro Kachel** | Sichtschutz- und Lichtschalter direkt auf jeder Kachel. |

**Funktionsumfang:**

- Automatische Erkennung aller Kameras der ausgewählten Instanz
- Sortierung: Online zuerst, dann Datenschutz, dann Offline
- Zum Erweitern klicken: Durch Klicken auf eine Kachel wird die Kamera als BoschCamera-Widget im Vollbildportal geöffnet.
- Gleiche Statusanzeigen wie bei BoschCamera (Online/Offline/Bewegung/Datenschutz)

---

## Beispielautomatisierungen

Eine stetig wachsende Bibliothek mit 20 sofort importierbaren Skripten befindet sich in[`docs/examples/`](./docs/examples/) — 8 Blockly-XML-Dateien für den visuellen Editor und 12 einfache JavaScript-Code-Snippets nebeneinander. Behandelte Themen:

- **Hauptschalter** – ein virtueller Datenpunkt schaltet Wandfluter/Privatsphäre an jeder Kamera gleichzeitig um.
- **Bewegungserkennung** – Momentaufnahme bei Bewegung mit Benachrichtigung, Hue-PIR → synthetische Bosch-Bewegungsbrücke, Burst-Aggregation-Benachrichtigung, anwesenheitsbasierter Datenschutz.
- **Lichtszenen** – dämmerungsgesteuerte automatische Wandfluterbeleuchtung, komplette Einfahrtsszene (Hue-Flutlicht + Bosch-Wandfluter/Frontleuchte), Urlaubsabwehr, Türsensorbeleuchtung.
- **Bot-/Dashboard-Integration** — Telegram `/snap` Befehl, Diashow des letzten Ereignisses für VIS, Stream-URL-Push an ein Fully Kiosk-Tablet.
- **Status & Sicherheit** – Kamera-Offline-Alarm, FCM-Push-Degradationsüberwachung, Panik-Sirenen-Auslösung, wetterbedingte Alarmunterdrückung, Stummschaltung im Schlafmodus, Garagentor-Koordination, Nachtmodus-Zeitplan.
- **Momentaufnahme-Planer / Zeitraffer** —[`docs/examples/snapshot-blockly.md`](./docs/examples/snapshot-blockly.md) Stündlicher Blockly-XML- und JavaScript-Scheduler (06:00–22:00 Uhr Cron-Job) sowie eine bewegungsgesteuerte Variante mit 15-Minuten-Drosselung. Schreibt `snapshot_trigger` liest zurück `snapshot_path` Enthält einen ffmpeg-Einzeiler, um die gesammelten JPEGs zu einem mp4-Zeitraffer zusammenzufügen.

Öffnen Sie den JavaScript-Adapter → Skripte → neues Blockly (oder JavaScript) → einfügen. Ersetzen Sie die `<CAM_UUID>` /`<PRESENCE_OID>` / lux-sensor / Telegram-Bot-Platzhalter mit Ihren tatsächlichen Objekt-IDs aus dem Tab „Objekte“. Die [README-Datei](./docs/examples/README.md) des Ordners enthält das vollständige Inhaltsverzeichnis, die Voraussetzungen und die Aufrufmuster des Benachrichtigungsadapters (Telegram, signal-cmb, Pushover, E-Mail).

→ **Bringen Sie Ihre eigenen Beiträge ein** : Posten Sie ein funktionierendes Skript als Codeblock im [ioBroker-Forum-Thread](https://forum.iobroker.net/topic/84538) oder öffnen Sie einen Pull Request – Beispiele aus der Community sind ausdrücklich willkommen.

### Bewegungs-/Ereignisablauf (Kamera → DP → Automatisierung)

```mermaid
flowchart TD
    Cam[Camera detects motion<br/>or audio alarm] -->|FCM push<br/>MTalk/MCS| L[Adapter FCM listener<br/>_aracna/fcm_]
    L -->|persistent_id dedup| F{fetchEvents<br/>GET /v11/events}
    F -->|new event| N["normalize event:<br/>id, type, tags, timestamp"]
    N --> C{eventTags / type}
    C -->|MOVEMENT + PERSON| EP[last_event_type=person<br/>motion_active=true 90s]
    C -->|MOVEMENT| EM[last_event_type=movement<br/>motion_active=true 90s]
    C -->|AUDIO_ALARM| EA[last_event_type=audio_alarm]
    EP & EM & EA --> S[fetch snapshot<br/>→ snapshot.jpg<br/>→ last_event_image base64]
    EP & EM & EA --> T[Blockly / JS trigger]
    T -->|sendTo notify| Out[Telegram / Signal /<br/>Pushover / e-mail]
    L -.->|register fail<br/>3x| Poll[Polling fallback<br/>every 30s<br/>info.fcm_active=polling]
```

Hinweis zum **Live-Streaming im Browser** : Kein Browser unterstützt RTSP nativ. Der Adapter veröffentlicht eine kameraspezifische Kennung. `stream_url` (`rtsp://<user>:<password>@127.0.0.1:<port>/rtsp_tunnel?…`) über einen lokalen TLS-Proxy zur Verwendung mit ffmpeg / mpv /`iobroker.cameras` / go2rtc. Für VIS selbst verwenden Sie entweder die Snapshot-Aktualisierung im Beispiel-Dashboard oder stellen Sie eine Brücke über go2rtc → WebRTC/HLS her.

### `stream_url` ist leer / go2rtc meldet "Verbindung abgelehnt"

Der Livestream ist **optional und standardmäßig deaktiviert** – jede offene Sitzung wird auf das lokale Sitzungskontingent von Bosch angerechnet und hält einen TLS-Proxy + Watchdog rund um die Uhr aktiv, sodass der Adapter ihn nie von selbst startet. Wenn er deaktiviert ist, lauscht der kameraspezifische Proxy nicht. `cameras.<id>.stream_url` bleibt leer, und jeder go2rtc-/Recorder, der auf den Port gerichtet ist, erhält `connection refused` Schnappschüsse und Bewegungsereignisse funktionieren auch ohne diese Funktion.

1. Satz `cameras.<id>.livestream_enabled = true` (pro Kamera). Die Sitzung wird geöffnet, der Proxy beginnt zuzuhören, und `cameras.<id>.stream_url` ist bevölkert.
2. Kopiere diese URL in go2rtc /`iobroker.cameras` / Ihr Aufnahmegerät.
3. Wenn go2rtc (oder der Recorder) auf einem **anderen Host** als ioBroker ausgeführt wird, ist der Standardwert `127.0.0.1` Bind ist von dort aus nicht erreichbar → immer noch`connection
   refused ` Aktivieren Sie in den Adaptereinstellungen **die Option „RTSP-Proxy im LAN verfügbar machen“** und legen Sie den **externen Hostnamen bzw. die LAN-IP-Adresse** fest (siehe die unten beschriebenen Schritte für den LAN-Recorder); die URL verwendet dann die LAN-IP-Adresse Ihres ioBroker-Hosts anstelle der IP-Adresse des Hosts.` 127.0.0.1` Die

---

## MQTT-Brücke

Wenn aktiviert, veröffentlicht der Adapter jedes Bewegungs-/Personen-/Audioalarm-Ereignis als JSON-Nachricht an einen MQTT-Broker Ihrer Wahl – wodurch Bosch-Kameraereignisse für jeden MQTT-Konsumenten ohne ioBroker-spezifische Bindungen verfügbar werden.

**Admin-UI → Registerkarte „MQTT-Brücke“:**

| Feld                          | Standard        | Beschreibung                                           |
| ----------------------------- | --------------- | ------------------------------------------------------ |
| MQTT-Brücke aktivieren        | `false`         | Hauptschalter                                          |
| Broker-Host / IP              | —               | Hostname oder IP-Adresse, z. B. `192.168.1.10`          |
| Broker-Port                   | `1883`          | 1–65535                                                |
| Verwenden Sie TLS (mqtts\://) | `false`         | Verschlüsselte Verbindung                              |
| Benutzername                  | —               | Optional                                               |
| Passwort                      | —               | Optional, verschlüsselt gespeichert                    |
| Themenpräfix                  | `bosch/cameras` | Alle Themenbereiche befinden sich unter diesem Präfix. |

**Themenstruktur:**

```
<prefix>/<cam-uuid>/motion      motion or unclassified movement
<prefix>/<cam-uuid>/person      person detected
<prefix>/<cam-uuid>/audio       audio_alarm event
```

**Nutzdaten (JSON):**

```json
{
  "timestamp": "2026-05-20T10:00:00.000Z",
  "cam_name":  "Front Door",
  "event_id":  "evt-uuid-or-empty",
  "event_type": "motion"
}
```

**Kompatible Endgeräte:** Node-RED, openHAB, Home Assistant (MQTT-Integration), Frigate, Zigbee2MQTT-Sidecars, jeder Standard-MQTT-Abonnent.

**Beispiel eines Node-RED-Abonnements:**

```
bosch/cameras/<camera-id>/motion
```

Verbinde es mit einer Telegram-Benachrichtigung, einer Frigate-Warnung oder einem Home Assistant. `mqtt.sensor` — Auf der Abonnentenseite ist kein ioBroker-Adapter erforderlich.

---

## KI-Kameraanalyse

Optional, standardmäßig deaktiviert. Im Gegensatz zur HA-Integration (die die Inferenz an ihre separat konfigurierte Funktion delegiert). `ai_task` Für die Integration bietet ioBroker keine vergleichbare Abstraktion eines Aufgabenanbieters. Stattdessen sendet diese Funktion den neuesten Snapshot per POST an einen **von Ihnen konfigurierten HTTPS-Endpunkt** und erwartet eine kleine JSON-Antwort. Es handelt sich um eine Schnittstelle zur Anbindung einer eigenen Vision-API, nicht um einen integrierten KI-Client.

**Admin-Benutzeroberfläche → Registerkarte „KI-Analyse“:**

| Feld                        | Standard | Beschreibung                                                                    |
| --------------------------- | -------- | ------------------------------------------------------------------------------- |
| KI-Kameraanalyse aktivieren | `false`  | Hauptschalter                                                                   |
| Endpunkt-URL                | —        | HTTPS-Endpunkt, der den folgenden POST-Request akzeptiert                       |
| API-Schlüssel               | —        | Optional, gesendet als `Authorization: Bearer <key>`, verschlüsselt gespeichert |

**Anfrage** (`POST <endpoint>`):

```json
{
  "camera": "Terrasse",
  "image_base64": "<JPEG bytes, base64>"
}
```

**Erwartete Antwort:**

```json
{
  "description": "Person walking near the door.",
  "score": 7
}
```

`score` ist auf 1 (gutartig) – 10 (sehr verdächtig) begrenzt.

**Verwendung:** schreiben `true` Zu `cameras.<id>.ai_analyze` (z. B. durch eine Bewegungsautomatisierung oder manuell). Der Adapter ruft einen aktuellen Snapshot ab, sendet ihn per POST-Anfrage und schreibt die Antwort in die entsprechende Datei. `cameras.<id>.ai_description` /`ai_score` /`ai_last_analysis` Es wird nur das letzte Ergebnis gespeichert – dieser Ausschnitt enthält kein persistentes Alarmverlaufsprotokoll (die HA-Integration). `ai_alert_store.py` hat bereits eine; kann bei Bedarf später hinzugefügt werden).

---

## Anmeldeinformationsfreie RTSP-Fronttür

Bosch-Kameras kommunizieren ausschließlich **über RTSP** (RTSP-Tunneling innerhalb von TLS) mit einem privaten Bosch-CA-Zertifikat, das die meisten NVR-Softwarelösungen (BlueIris, Frigate, VLC, go2rtc) nicht direkt verarbeiten können. Jeder Stream erfordert einen Bosch **-Digest** -Authentifizierungs-Handshake mit Anmeldeinformationen, die Bosch **bei jeder Sitzungserneuerung und jedem Wechsel des Datenschutzmodus ändert** . Dieser Adapter ist die **ursprüngliche Implementierung** eines lokalen RTSP-Relays, das beide Probleme löst. Er wurde später als RTSP-Endpunkt ohne Anmeldeinformationen in der zugehörigen Home-Assistant-Integration (Version 14.1.0) bereitgestellt, die diesen Adapter explizit als Designquelle nennt.

Das Relais besteht aus drei Schichten, alle ausschließlich lokal (dieser Adapter nutzt niemals das Cloud-Medienrelais von Bosch – nein). `proxy-NN.live.cbs.boschsecurity.com` (direkt an die LAN-IP der Kamera auf TCP/443):

1. **Bosch LOKALE Sitzung** (`src/lib/live_session.ts`) —`PUT
   /v11/video_inputs/{id}/connection {type:"LOCAL"}` Öffnet eine Sitzung und gibt die LAN-Adresse der Kamera sowie einen Digest zurück.` user ` /` password ` Paar, gültig bis` maxSessionDuration` (Standardwert 3600 s) oder eine vorzeitige Rotation.
2. **TLS-Proxy** (`src/lib/tls_proxy.ts`) — ein einfacher TCP-Listener (`net.createServer`) das öffnet `tls.connect()` Die Kamera sendet die eingehenden Daten an ihre LAN-Adresse pro Client und leitet sie durch, wodurch ein sauberes Signal bereitgestellt wird. `rtsp://` Die Verbindung zum Endkunden wird durch einen Schutzschalter unterbrochen, der den Listener nach fünf aufeinanderfolgenden Verbindungsfehlern innerhalb von 30 Sekunden abschaltet, damit eine tatsächlich nicht erreichbare Kamera nicht endlos weiterläuft.
3. **Transparente Digest-Injektion** (`src/lib/rtsp_auth.ts`) – eine kleine RTSP-Zustandsmaschine, die vor der TLS-Verbindung sitzt. Ein Client, der bereits seine eigenen Daten sendet. `Authorization:` Der Header (bei älteren Clients mit In-URL-Anmeldeinformationen) wird unverändert weitergeleitet. _Für_ alle anderen Clients wird der Digest-Handshake automatisch durchgeführt: Der Proxy empfängt die Daten der Kamera. `401 + WWW-Authenticate` berechnet die Antwort und fügt eine neue Sequenz ein. `Authorization: Digest …` Der Header wird in jede nachfolgende Clientanfrage eingefügt – der Recorder sieht niemals einen Benutzernamen oder ein Passwort. Wenn Bosch die Digest-Anmeldeinformationen der Sitzung ändert (Datenschutz-Umschaltung, Erneuerung), `updateDigestAuth()` Wechselt sie im laufenden Betrieb für zukünftige Verbindungen, ohne den Listener neu zu starten oder die veröffentlichte URL zu ändern.

```mermaid
sequenceDiagram
    autonumber
    participant Rec as Recorder<br/>(BlueIris / Frigate / go2rtc / VLC)
    participant FD as Lazy front-door<br/>always-listening, sticky port
    participant Proxy as Inner TLS proxy<br/>(tls_proxy.ts)
    participant Auth as Digest injector<br/>(rtsp_auth.ts)
    participant Bosch as Bosch Cloud API
    participant Cam as Camera LAN :443<br/>(RTSPS)

    Rec->>FD: TCP connect rtsp://host:<port>/rtsp_tunnel
    Note over FD: port is always bound —<br/>no "Connection refused" even if idle
    FD->>FD: resolveInner() — any live client already?
    alt no active Bosch session
        FD->>Bosch: PUT /connection {type:"LOCAL"}
        Bosch-->>FD: lanAddress + digestUser/digestPassword
        FD->>Proxy: startTlsProxy(remote=lanAddress, digestAuth)
    end
    FD->>Proxy: pipe client -> 127.0.0.1:<innerPort>
    Proxy->>Cam: tls.connect()
    Cam-->>Proxy: 401 + WWW-Authenticate: Digest
    Proxy->>Auth: compute Digest response
    Auth->>Cam: retry with Authorization: Digest ... (no creds from Rec)
    Cam-->>Rec: RTSP 200 OK, media flows
    Note over Bosch,Cam: privacy toggle / renewal rotates creds
    Bosch-->>FD: fresh digestUser/digestPassword (heartbeat/renew)
    FD->>Proxy: updateDigestAuth(user, password)
    Note over Proxy: future connections use rotated creds,<br/>in-flight streams untouched
    Rec-->>FD: last client disconnects
    FD->>FD: idle linger (stream_persistent_idle_timeout, default 60s)
    FD->>Bosch: DELETE /connection (release Bosch session slot)
    Note over FD: front-door itself stays bound —<br/>next connect re-opens on demand
```

**Zwei Betriebsmodi, beide als derselbe veröffentlicht `stream_url` Datenpunkt:**

| Modus                            | Konfiguration                                                     | Portverhalten                                                                                                                                                                                                                                                                                                                                                                |
| -------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Auf Anfrage** (Standard)       | `cameras.<id>.livestream_enabled = true`                          | Der TLS-Proxy lauscht nur, wenn der Stream explizit aktiviert ist; standardmäßig ist er deaktiviert, sodass er niemals unaufgefordert einen gemeinsam genutzten Bosch-Sitzungsplatz belegt.                                                                                                                                                                                  |
| **Immer eingeschaltete Haustür** | `stream_persistent_endpoint = true` (RTSP / Stream-Registerkarte) | Ein separater, fauler Zuhörer (`src/lib/lazy_stream.ts`) bleibt dauerhaft an den Sticky Port gebunden; es öffnet die Bosch-Sitzung + inneren Proxy beim ersten Client-Connect und gibt die Bosch-Sitzung danach wieder frei `stream_persistent_idle_timeout` (10–3600 s, Standard 60 s) Leerlauf – empfohlen für Rekorder, die nach eigenem Zeitplan abfragen (Forum #84538) |

**Konfigurationsoberfläche** (Admin-UI → Registerkarte "RTSP / Stream"):

| Feld                                                                 | Nativer Schlüssel                | Standard                                 | Zweck                                                                                                                                                     |
| -------------------------------------------------------------------- | -------------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RTSP-Proxy im LAN freigeben                                          | `rtsp_expose_to_lan`             | `false`                                  | Binden `0.0.0.0` anstatt `127.0.0.1` damit ein Recorder auf einem anderen Host darauf zugreifen kann.                                                       |
| Externer Hostname / LAN-IP                                           | `rtsp_external_host`             | `""`                                     | Host eingebettet in die veröffentlichte `stream_url` bei Exposition gegenüber LAN                                                                          |
| Maximale Sitzungsdauer (s)                                           | `stream_max_session_duration`    | `0` (Kamera-Standardeinstellung, 3600 s) | Erhöhen Sie die Frequenz, um einen kontinuierlichen Pull-Vorgang über einen längeren Zeitraum zwischen den Erneuerungen aufrechtzuerhalten (600–21600 s). |
| Stellen Sie sicher, dass der RTSP-Endpunkt jederzeit erreichbar ist. | `stream_persistent_endpoint`     | `false`                                  | Ermöglicht die oben beschriebene Funktion der permanent aktiven, trägen Eingangstür.                                                                      |
| Sitzung nach Leerlauf freigeben (s)                                  | `stream_persistent_idle_timeout` | `60`                                     | Leerlaufzeitfenster vor der Freigabe der bedarfsgesteuerten Bosch-Sitzung hinter der Vordertür (10–3600 s)                                                |

**Sicherheitshinweis:** Die Expositionssteuerung erfolgt ausschließlich über den Bind-Host-Schalter (`127.0.0.1` vs. `0.0.0.0` /LAN-IP) – Auf dem RTSP-Endpunkt selbst gibt es keine IP-Zulassungsliste oder zusätzliche Token-/Basisauthentifizierungsebene. Behandeln Sie „RTSP-Proxy im LAN bereitstellen“ daher wie jeden anderen nicht authentifizierten LAN-Dienst und deaktivieren Sie ihn außerhalb eines vertrauenswürdigen Netzwerks. Die verborgenen Digest-Anmeldeinformationen gehören Bosch und stellen keinen Ersatz für den Zugriffskontrollmechanismus Ihres eigenen Netzwerks dar.

**Portschema:** ein TLS-Proxy-Port pro Kamera (und, wenn der persistente Endpunkt aktiviert ist, dient derselbe Sticky-Port gleichzeitig als Front-Door-Port); wird bei der ersten Verwendung frei gewählt und bleibt über Neustarts und Bosch-Sitzungserneuerungen hinweg erhalten. `cameras.<id>._proxy_port` So bleibt die gespeicherte URL eines Rekorders ohne Neukonfiguration unbegrenzt funktionsfähig.

---

## Externe Rekorder (BlueIris, Frigate)

```mermaid
flowchart LR
    Cam["Bosch Camera<br/>LAN :443<br/>HTTPS only"] -->|RTSP-over-TLS<br/>tunneled| Proxy["Adapter TLS proxy<br/>port: per-camera<br/>bind: 127.0.0.1 or LAN"]
    Proxy -->|"rtsp://user:pwd@<br/>host:&lt;port&gt;/rtsp_tunnel<br/>?inst=1&enableaudio=1"| B[BlueIris]
    Proxy -->|"rtsp://...?inst=1"| F[Frigate]
    Proxy -->|"rtsp://...?inst=2 sub"| ICam[iobroker.cameras]
    Cloud[Bosch CBS API] -.->|hourly session renew<br/>~60s before timeout| Proxy
```

Standardmäßig lauscht der Proxy auf `127.0.0.1` — erreichbar vom ioBroker-Host selbst, aber nicht von einem anderen Rechner. So verwenden Sie einen Recorder auf einem separaten Host:

1. Admin-UI → Registerkarte "RTSP / Stream" → **RTSP-Proxy im LAN freigeben** aktivieren.
2. Setzen Sie **den externen Hostnamen / die LAN-IP-Adresse** auf die LAN-IP-Adresse des ioBroker-Hosts, z. B. `192.168.1.50` Die
3. Speichern → Adapter startet neu →`cameras.<id>.stream_url` wird `rtsp://<user>:<password>@192.168.1.50:<sticky-port>/rtsp_tunnel?…` Die
4. Kopiere diese URL in BlueIris / Frigate / deinen Recorder.

Der Port bleibt auch nach Neustarts des Adapters und Erneuerungen der Bosch-Sitzung bestehen (beibehalten in `cameras.<id>._proxy_port` — Legen Sie die URL in Ihrem Recorder einmal fest, und sie funktioniert weiterhin.

### Personenbasierte Aufzeichnung über CodeProject AI

Ein im ioBroker-Forum beschriebener Workflow: Jedes Element hinzufügen `stream_url` Als RTSP-Kamera in BlueIris aktivieren Sie die 24/7-Substream-Aufzeichnung mit kurzer Speicherdauer (z. B. 7 Tage) und integrieren die Bewegungserkennungsalarme von BlueIris in [CodeProject AI](https://www.codeproject.com/AI/) mit YOLO. Nur wenn CodeProject ein Bild als Person (oder eine andere konfigurierte Klasse – Hund, Katze, Fahrzeug, Kennzeichen, Gesicht) klassifiziert, schaltet BlueIris auf die Hauptaufzeichnung um, inklusive einiger Sekunden Vorlauf. Dies reduziert Speicherplatzbedarf und Fehlalarme drastisch und ermöglicht gleichzeitig die Nutzung der umfangreichen Hauptaufnahmen für wichtige Ereignisse.

### iobroker.cameras (Snapshot / Vis Tile)

[iobroker.cameras](https://github.com/ioBroker/ioBroker.cameras) verpackt eine generische RTSP-Quelle in JPEG-Schnappschüsse und eine Vis-MJPEG-Kachel (ohne H.264/Audio – für die vollständige Live-Wiedergabe verwenden Sie das [VIS-2-Kamera-Widget](#vis-2-camera-widget) dieses Adapters oder go2rtc). Es benötigt **keine** vollständige `rtsp://…` URL in einem Feld – die URL wird aus separaten Feldern zusammengesetzt, so dass `stream_url` muss aufgeteilt werden.

> **Empfehlung: Aktivieren Sie den Always-On-RTSP-Endpunkt.** iobroker.cameras ruft Frames nach eigenem Zeitplan ab. Standardmäßig lauscht der lokale RTSP-Proxy nur, wenn ein Livestream läuft. Daher trifft eine Anfrage, die außerhalb des Streams eingeht, auf einen geschlossenen Port, und iobroker.cameras protokolliert dies. `Connection refused`. **Einstellungen aktivieren → RTSP / Stream → RTSP-Endpunkt jederzeit erreichbar halten** (`stream_persistent_endpoint` Der Adapter hält dann permanent einen Listener an einem stabilen Port pro Kamera gebunden und öffnet die Bosch-Sitzung automatisch, sobald iobroker.cameras eine Verbindung herstellt. Nach einer Leerlaufzeit wird die Sitzung wieder freigegeben – so ist der Endpunkt stets erreichbar, ohne dass eine der drei gemeinsam genutzten Bosch-Sitzungen dauerhaft belegt wird. Ist der Adapter aktiviert, kann Schritt 1 übersprungen werden. `stream_url` /`stream_host` /`stream_port` /`stream_path` sind ab dem Start des Adapters belegt und stabil. Forum #84538.

1. (Nur erforderlich, wenn der oben genannte Always-On-Endpunkt deaktiviert ist.) Stream aktivieren: set `cameras.<id>.livestream_enabled = true` Der Proxy startet und `cameras.<id>.stream_url` bevölkert, z.B. `rtsp://127.0.0.1:8554/rtsp_tunnel?inst=1&enableaudio=1&fmtp=1&maxSessionDuration=3600` Die

2. Im `cameras.0` Fügen Sie eine Kamera vom Typ **RTSP** (der generische ffmpeg-Snapshot-Typ) hinzu. Um Ihnen das manuelle Aufteilen der URL zu ersparen, veröffentlicht der Adapter die drei Teile auch als fertig zum Einfügen bereite Datenpunkte. `cameras.<id>.stream_host`, `stream_port` Und `stream_path`:

   | iobroker.cameras-Feld       | Aus Datenpunkt kopieren | Beispiel                                                           | Anmerkungen                                                                                                                                            |
   | --------------------------- | ----------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
   | **IP-Kamera**               | `stream_host`           | `127.0.0.1`                                                        | Gleicher Host →`127.0.0.1` Die LAN-IP-Adresse wird hier automatisch angezeigt, wenn **die Option „RTSP-Proxy im LAN verfügbar machen“** aktiviert ist. |
   | **Hafen**                   | `stream_port`           | `8554`                                                             | Bleibt auch nach Neustarts erhalten.                                                                                                                   |
   | **Protokoll**               | _(manuell einstellen)_  | **TCP**                                                            | Muss geändert werden – das Feld ist standardmäßig auf UDP eingestellt, der Proxy ist aber nur TCP-fähig.                                               |
   | **Weg**                     | `stream_path`           | `/rtsp_tunnel?inst=1&enableaudio=1&fmtp=1&maxSessionDuration=3600` | Abfragezeichenfolge enthalten — wörtlich kopieren.                                                                                                     |
   | **Benutzername / Passwort** | —                       | _(leer lassen)_                                                    | Der Proxy injiziert die Bosch Digest-Authentifizierung transparent; es werden keine Anmeldeinformationen benötigt.                                     |

3. Speichern. iobroker.cameras liefert den Schnappschuss unter `http://<iobroker-host>:8082/cameras.0/<camera-name>` (Verwenden Sie diese URL in einem Vis Basic-Image-Widget) und bietet die Live-MJPEG-Kachel über das mitgelieferte Vis-Widget an.

Da beide Adapter normalerweise auf demselben ioBroker-Host laufen, `127.0.0.1` funktioniert direkt — **Die Bereitstellung eines RTSP-Proxys im LAN** ist nur erforderlich, wenn iobroker.cameras auf einem anderen Rechner ausgeführt wird.

---

## Entwicklung

```bash
npm install
npm run build        # tsc → build/
npm run watch        # auto-rebuild on save
npm test             # unit tests (1480+ passing)
npm run lint
npm run test:coverage          # coverage report → coverage/index.html (HTML) + lcov
npm run test:coverage:check    # enforce thresholds: 80% lines/functions, 70% branches
```

### CI/CD & Tests

Die gesamte Pipeline – Testebenen (Lint → Unit- und Coverage-Tests → Paketvalidierung → CodeQL/GitLeaks/Dependency-Review → Adapterintegration → RepoChecker → Release-Smoke), alle GitHub Actions-Workflows und der Release-Ablauf – ist mit Diagrammen dokumentiert in[`docs/ci-cd.md`](./docs/ci-cd.md) Qualitätsstandards und der Fortschritt von ioBroker Latest→Stable sind in[`docs/TESTING_AND_QUALITY.md`](./docs/TESTING_AND_QUALITY.md) Die

Sicherheitsebene (GitHub Actions): **CodeQL** (SAST), **gitleaks** (Geheimnisscan), **Dependency-Review** + **Dependabot** , mit Workflow-Berechtigungen nach dem Prinzip der minimalen Berechtigungen.

### Manuelle Bereitstellung auf einer lokalen ioBroker-Testinstanz

```bash
SRC=$(pwd)
DST=$HOME/iobroker-test/node_modules/iobroker.bosch-smart-home-camera
rm -rf "$DST/build" && cp -r "$SRC/build" "$DST/"
cp "$SRC/io-package.json" "$DST/"
cp -r "$SRC/admin" "$DST/"
~/iobroker-test/iob upload bosch-smart-home-camera
~/iobroker-test/iob restart bosch-smart-home-camera.0
```

---

## Vorhandene Adapterlandschaft

- **[iobroker.bshb](https://github.com/holomekc/ioBroker.bshb)** – Lokale SHC-REST-API (Thermostate, Schalter, Alarme). Kamera ein/aus, kein Stream oder Snapshot. Aktiver Entwickler.
- **[iobroker.cameras](https://github.com/ioBroker/ioBroker.cameras)** – generischer HTTP-Snapshot-/RTSP-Wrapper. Koppeln Sie diesen Adapter. `stream_url` Status mit iobroker.cameras, um eine Vis-Kachel zu erhalten — siehe [iobroker.cameras (Snapshot / Vis-Kachel)](#iobrokercameras-snapshot--vis-tile) für die feldweise Konfiguration.
- **[iobroker.onvif](https://github.com/iobroker-community-adapters/ioBroker.onvif)** – generisches ONVIF. Bosch-Kameras stellen derzeit keinen lokalen ONVIF-Endpunkt bereit, daher ist dieser Adapter die einzige Möglichkeit für Bosch-Hardware.

---

## Freigabeprozess

Dieser Adapter verwendet[`@alcalzone/release-script`](https://github.com/AlCalzone/release-script) für Versionserhöhungen.

```bash
npm run release patch    # 0.3.0 → 0.3.1
npm run release minor    # 0.3.0 → 0.4.0
npm run release major    # 0.3.0 → 1.0.0
```

1. Erstellt und führt die vollständige Testsuite aus (muss erfolgreich sein).
2. Bumps-Version in `package.json` +`io-package.json`
3. Erstellt automatisch einen News-Eintrag aus den Commits seit der letzten Version.
4. Erstellt die `vX.Y.Z` Taggen und Pushen – GitHub Actions veröffentlicht automatisch auf npm

---

## Verwandte Projekte

Teil einer Familie von fünf Implementierungen für Bosch Smart Home Kameras (plus ein Alpha-Frontend):

| Durchführung                                | Repo                                                                                                                 | Status                                                                                                                                                                                                                                                                                       |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🏆 Integration von Smart-Home-Assistenten   | [Bosch Smart-Home-Kamera-Tool-HomeAssistant](https://github.com/mosandlt/Bosch-Smart-Home-Camera-Tool-HomeAssistant) | **Version 14.4.1** · HA Quality Scale **Platinum** · produktionsreif                                                                                                                                                                                                                         |
| 🐍 Python CLI                               | [Bosch-Smart-Home-Kamera-Tool-Python](https://github.com/mosandlt/Bosch-Smart-Home-Camera-Tool-Python)               | **v10.10.4** · Mini-NVR + SMB-Upload (BETA) · LAN-Fallback (Ping / --local) · PTZ-Voreinstellungen · Webhook-Übermittlung · Aufzeichnung / Analyse / Standalone                                                                                                                              |
| 🟢 **ioBroker-Adapter** (dieses Repository) | [ioBroker.bosch-smart-home-camera](https://github.com/mosandlt/ioBroker.bosch-smart-home-camera)                     | **Version 1.8.2** · stabil · npm · RTSP-Frontdoor ohne Anmeldeinformationen (Always-On-Option) · Cloud-API-Management-Ebene (Schreibzugriff auf Zonen/Masken/Regeln/Freigabe/Firmware) · tägliche Ereigniszähler · MQTT-Bridge · PTZ-Voreinstellungen · VIS-2 Einzel- und Übersichts-Widgets |
| 🤖 MCP-Server                               | [Bosch-Smart-Home-Kamera-Tool-MCP](https://github.com/mosandlt/Bosch-Smart-Home-Camera-Tool-MCP)                     | **Version 1.5.5** · Credential-Rotation · PTZ-Voreinstellungen · TOFU-Zertifikat-Pinning · LAN-Ping + prefer\_local · Integration von Claude Code und Claude Desktop                                                                                                                         |
| 🔴 Node-RED-Knoten (Alpha)                  | [Bosch Smart-Home-Kamera-Tool NodeRED](https://github.com/mosandlt/Bosch-Smart-Home-Camera-Tool-NodeRED)             | v0.2.5-alpha · Cloud-Knoten (Ereignis / Snapshot / Datenschutz / Stream-URL / Konfiguration)                                                                                                                                                                                                 |

Außerdem: [Bosch Smart Home Kamera – Python-Frontend (NiceGUI)](https://github.com/mosandlt/Bosch-Smart-Home-Camera-Tool-Python-frontend) – v0.1.5-alpha (Dashboard + Kameradetails + Einstellungen) – Interesse aus der Community erwünscht

HA bleibt die **Referenzimplementierung** – Funktionen landen zuerst dort; die Python CLI, der ioBroker Adapter und der MCP Server holen mit der Zeit auf.

---

## Changelog

### 1.8.3 (2026-07-15)
Docs-only release: fixed the MCP row in the shared Integration Comparison table (shares the Python CLI's `bosch_config.json` rather than its own OAuth2 PKCE flow) and a broader README accuracy pass (state tree, config options, RTSP front-door emphasis). No functional changes.

### 1.8.2 (2026-07-14)
Docs-only release: refreshed the sibling-repo version table in the README. No functional changes.

### 1.8.1 (2026-07-13)
Performance/reliability fix: local camera (digest auth) and cloud API HTTPS requests now reuse pooled keep-alive connections instead of opening a fresh TCP+TLS connection per request, cutting per-request latency and connection overhead. Also fixes a related agent-cleanup gap so pooled connections are properly torn down on adapter unload instead of leaking sockets. No functional/state changes.

### 1.8.0 (2026-07-11)
New: cloud-API WRITE for the management tier, closing a feature-parity gap with the HA integration and Python CLI (same `/v11` endpoints, byte-verified against both). Writable states per camera: `motion_zones_set`/`privacy_masks_set` (POST array of `{x,y,w,h}`, `[]` clears all), `rule_create`/`rule_update`/`rule_delete` (automation rules), `firmware_install` (button — installs the pending firmware update, guarded against a double-press or an already-in-progress install). Gen2 only: `camera_share`, `friend_invite`, `friend_remove`. New read-only firmware status states: `firmware_current_version`, `firmware_latest_version`, `firmware_update_available`, `firmware_updating`. This is cloud write only — the on-device RCP zone/mask editor stays parked pending broader local write access from Bosch. Also adds a blocking `npm audit --omit=dev` CI gate ahead of the deploy job. 38 new tests, full suite 1367 → 1405 passing, coverage gate green.

### 1.7.8 (2026-07-07)
Docs-only release: repository-checker keyword fix (`package.json`/`io-package.json`, PR #46), refreshed sibling-repo version references in the "Related Projects" table, dev-sandbox Node version doc fix, devDependency bumps (`@types/node`, `@iobroker/adapter-react-v5`). No functional changes.

### 1.7.7 (2026-07-03)
ioBroker.repositories PR#5983 manual-review hardening (mcm1957, 2026-07-02): log/notification text is English-only now (was German, leaking untranslated into `this.log.*`); external camera IDs are sanitized (ioBroker `FORBIDDEN_CHARS`) before use in object paths; removed the dead `region` config option (`EU`/`US` dropdown had no effect — `CLOUD_API` is, and remains, hardcoded); README now credits/links Bosch Smart Home; minor dead-code cleanup (`_maskCreds`, `_featureFlagsCache`, `EVENT_POLL_INTERVAL_MS`). `mqtt_password` `protectedNative`/`encryptedNative` confirmed correct at the io-package.json root (already in place; a first attempt moved them under `common`, which `@iobroker/repochecker`'s schema rejects — reverted before release). New regression tests pin all of the above. No functional/behavioral change for existing installs beyond the language fix.

### 1.7.6 (2026-06-28)
CI: integration test harness (@iobroker/testing), build job, Node 22/24 matrix, coverage gate (≥80%), i18n E5606 gate. No functional changes.

### 1.7.5 (2026-06-25)
Cross-version port of Home Assistant v13.7.8–v13.7.9 WebRTC stability fixes.

- **Stale-PC guard (fix):** after a WebRTC reconnect, late `mute` events from the old peer connection no longer trigger a new recovery — ending an endless loop where every reconnect caused another one.
- **getStats freeze oracle (fix):** the player now checks `framesDecoded` via `getStats` every 5 s to catch a go2rtc silent stall or a Chrome 145 muted-background-pause that the existing frame-callback / stall timer may not see.
- **Dead-track CGNAT detection → sticky HLS (fix):** when WebRTC connects but delivers zero decoded frames (bytes flowing = decoder stall; no bytes = CGNAT cut), the player escalates to HLS for the rest of the session instead of retrying WebRTC in an endless loop.
- **iOS native-HLS 8s watchdog (fix):** Safari/iOS AVPlayer can hang at load with no self-recovery; a watchdog hard-reloads the element if `playing` does not fire within 8 s.
- **Faster reconnect (improvement):** recovery restart delay reduced from 2000 ms to 1000 ms.

### 1.7.4 (2026-06-23)
FCM push reliability: periodic 24 h re-registration prevents silent push loss on long-lived sessions.

### 1.7.3 (2026-06-21)
Cross-version port of the Home Assistant v13.7.5 fix.

- **Picture-in-Picture freeze in a background tab (fix):** follow-up to 1.7.2. With the live stream floating in Picture-in-Picture and the browser tab left in the background, the floating window could still freeze for up to a minute before recovering, because Chrome throttles the player's periodic freeze-check timer to about once a minute in a hidden tab. The player now drives that check from a Web Worker, which runs on a separate thread Chrome does not throttle, so a frozen Picture-in-Picture stream is detected and reconnected in about ten seconds instead of up to a minute. The worker only acts on a Picture-in-Picture window you are actively watching (a plain hidden tab is left alone to conserve the camera session) and falls back cleanly to the existing timer where Web Workers are unavailable. Also hardens the freeze check so a slow reconnect's first frame can't briefly look frozen.

### 1.7.2 (2026-06-19)
Cross-version port of the Home Assistant v13.7.4 fix.

- **Picture-in-Picture freeze after a tab switch (fix):** with the live WebRTC stream floating in Picture-in-Picture (vis-2 widget overlay), switching to another browser tab for a while could freeze the floating window; returning to the tab resumed the in-page video but the floating window stayed frozen. A hidden tab heavily throttles the player's periodic stall check, and the underlying go2rtc WebRTC stream can quietly die in the background. The player now detects a freeze without that throttled timer — it watches for presented video frames (which keep flowing to a Picture-in-Picture window even while the tab is hidden) and listens for the WebRTC track going silent or the connection failing, then reconnects into the **same** floating window automatically with no interaction. The reconnect reuses the existing video element so Picture-in-Picture picks the stream straight back up.

### 1.7.1 (2026-06-18)
- **Daily counters now bucket by local date (fix):** `events_today`, `movement_count` and `audio_count` were bucketed by UTC day, but Bosch event timestamps carry an explicit timezone offset (e.g. `+02:00[Europe/Berlin]`) — so events in the hours around local midnight were counted on the wrong day and the counters rolled over at UTC midnight instead of local midnight. They now bucket by each event's local calendar date, matching the Home Assistant integration (issue #34). `last_motion_at` and event freshness were already correct.

### 1.7.0 (2026-06-18)
Cross-version round porting the latest Home Assistant integration features and fixes.

- **Daily event counters (new):** per-camera `events_today`, `movement_count` and `audio_count` datapoints, derived from the cloud event list and bucketed by **UTC** day (mirrors the HA sensors; UTC avoids the mis-count around local midnight). Refreshed on every poll so they roll over at UTC midnight without needing a new event.
- **BoschOverview widget — live stream + status:** the expanded (click-to-enlarge) overlay now plays live **WebRTC/HLS** via go2rtc (grid tiles stay snapshot so the camera's ~3-session limit is respected), with a snapshot fallback on stream error. Added a cloud **maintenance banner** above the grid and a **last-event timestamp** badge per tile.
- **Widget reliability:** per-camera volume/mute localStorage keys (multiple cameras no longer overwrite each other's volume); a second tile of the *same* camera auto-mutes the first (different cameras stay independent); offline/privacy tiles now show the last good frame as a dimmed backdrop instead of a black box.
- **Backend fixes:** concurrent snapshot triggers for the same camera are coalesced onto one session/fetch (no double-open); a camera stays online during an active cloud-maintenance window while it is still locally streaming, instead of being flipped offline by the maintenance-related snapshot failures.

### 1.6.1 (2026-06-16)
- **FCM push reliability:** the motion-event safety-net poll is no longer suppressed after a failed cloud fetch. A transient cloud hiccup during a push used to stamp the defer-timestamp *before* the fetch succeeded, keeping the safety poll quiet for up to 5 minutes and delaying motion detection. The defer-timestamp now advances only after a definitive response (+3 regression tests). Cross-version of the Home Assistant integration's event-poll fix.

### 1.6.0 (2026-06-15)
Cross-platform reliability round for the BoschCamera VIS-2 widget and the adapter, driven by a structured bug-hunt (Chrome, Safari, Firefox, Edge on macOS, Windows, iOS, Android, Linux).

- **iOS Picture-in-Picture** now works: the widget falls back to the WebKit presentation-mode API where the standard PiP API is unavailable, and leaves PiP correctly when the stream stops.
- **Touch-friendly volume:** the volume control is reachable by tap (it was hover-only); audio recovers after the browser/AudioContext is interrupted by Android backgrounding or doze.
- **Reconnect fixes:** a Picture-in-Picture listener leak on re-start is fixed, a conflicting `muted` prop no longer fights the imperative mute control, and the control pill-bar scrolls instead of clipping on narrow screens.
- **Adapter robustness:** the motion-event safety-net poll now survives an FCM push reconnect (it could previously be cancelled and never re-armed, freezing motion timestamps), and several shutdown-time timer warnings were eliminated.

### 1.5.7 (2026-06-15)
Cross-version parity with the Home Assistant card v13.5.17 — live-stream reliability + quieter controls for the BoschCamera VIS-2 widget.

- **Live sound survives an auto-reconnect:** the stream no longer comes back muted after a stall / HLS-fallback / session refresh (the shared AudioContext keeps the unmute intent across reconnect; the pause-guard remains the safety net).
- **Tab-switch & bfcache recovery:** the live (WebRTC) stream now restarts when the page returns to the foreground or is restored from the browser's back/forward cache (`pageshow`/`visibilitychange`), instead of staying frozen.
- **Quieter controls:** the audio and Picture-in-Picture buttons appear only while a live stream is playing (hidden over an idle/snapshot tile). Card corners no longer flicker on re-composite (`isolation: isolate`).
- **WebRTC robustness:** ICE `disconnected` is treated as transient (only `failed` falls back to HLS, no more premature downgrade); audio/video tracks are accumulated into one MediaStream (no srcObject re-assign flash); a leaked `playing`/`pause` listener on WebRTC→HLS fallback is fixed; a light stall-checker re-plays a live `<video>` the browser paused in the background.
- **Maintenance banner** is dismissable with an × (per browser session). **Privacy placeholder** now shows the last-event time.

### 1.5.6 (2026-06-14)
Picture-in-Picture for the VIS-2 camera widget (live WebRTC view).

- **Picture-in-Picture:** a new button in the BoschCamera widget's control bar floats the live WebRTC stream into the browser's always-on-top window — over every app on macOS Safari, over the browser on Chrome. The floating window's title shows the camera name (via the Media Session API).
- **Single-PiP greying:** the browser allows only one PiP window at a time, so while one camera is floating, the PiP button on every other BoschCamera widget on the view greys out; it lights up on the active one and re-enables for all when PiP closes.
- The window keeps playing across a stream reconnect, and the button is hidden where the browser lacks PiP support (most iOS/Android WebViews; snapshot/MJPEG modes). New tooltip strings added in all 11 UI languages.

### 1.5.5 (2026-06-13)
Settings-page reorganisation, German translation polish and concurrency hardening for the always-on RTSP endpoint.

- **Settings page reorganised into tabs:** Connection · RTSP / Stream · Events / Notifications · API requests / Power saving · MQTT Bridge. The always-on RTSP endpoint option (`stream_persistent_endpoint`, still opt-in / default off) moved from the *Power saving* tab to **RTSP / Stream**, next to the other external-recorder settings (LAN exposure, external host, max session duration) where it belongs.
- **German translations polished:** the stream-settings labels/help that shipped machine-translated in v1.5.4 (e.g. *"Freigabesitzung nach Leerlauf(en)"*) are now natural German.
- **Concurrency hardening:** two recorders connecting to the same camera's always-on endpoint at the exact same moment now share a single `ensureLiveSession` instead of racing to open two Bosch sessions (one of the 3 shared slots could previously be wasted). +15 regression tests.

### 1.5.4 (2026-06-13)
New: optional always-on RTSP endpoint for external recorders (iobroker.cameras, BlueIris, Frigate).

- **Always-on RTSP endpoint (`stream_persistent_endpoint`, opt-in, default off):** the local RTSP proxy previously listened only while a live stream was running. An external recorder such as iobroker.cameras polls the RTSP URL on its own schedule, so a poll that landed while the stream was off hit a closed port and the recorder logged `Connection refused` (forum #84538). When the new option is enabled (Settings → RTSP / Stream), the adapter keeps a lightweight TCP listener bound on a stable per-camera port at all times. The Bosch session + TLS proxy are opened on demand the moment a recorder connects and released again after `stream_persistent_idle_timeout` seconds (default 60 s) with no client — so the endpoint is always reachable without permanently occupying one of the 3 shared Bosch sessions. `stream_url` / `stream_host` / `stream_port` / `stream_path` stay populated and stable from adapter start. A live stream the user explicitly enabled (`livestream_enabled = true`) is never auto-released.

### 1.5.3 (2026-06-12)
Fix: Bosch cloud connection failed to start after the v1.5.1 TLS hardening.

- **Cloud TLS partial-chain fix:** v1.5.1 pinned only the Bosch "Video CA 2A" intermediate certificate. Node.js (unlike the Python/HA integrations) has no equivalent of OpenSSL's `PARTIAL_CHAIN` flag, so it could not anchor the certificate chain at the pinned intermediate and every Bosch cloud handshake failed with `unable to get issuer certificate`. On systems without a valid persisted camera state this blocked camera discovery on startup ("No persisted camera state found — cannot start"). The adapter now verifies cloud certificates by checking the hostname, validity and that the leaf is either signed by the pinned Bosch CA or chains to a trusted system root (used by the Let's Encrypt OAuth host). MITM protection from v1.5.1 is fully preserved — self-signed, expired, hostname-mismatch and untrusted-root certificates are still rejected.

### 1.5.2 (2026-06-11)
Automatic cleanup of orphaned camera object subtrees.

- **Orphaned camera objects pruned on start:** removing a camera from the Bosch account previously left behind a `cameras.<uuid>` object subtree in ioBroker with no way to clean it up without manual object deletion. The adapter now detects these orphaned subtrees on each successful camera fetch and removes them automatically. A safety guard prevents any deletion when the cloud fetch returns an empty list (e.g. during a cloud outage), so no active camera data is lost.

### 1.5.1 (2026-06-11)
Security: TLS certificate verification for Bosch cloud and proxy connections.

- **TLS certificate verification (CWE-295):** the cloud API calls and the video proxy tunnel now validate the private Bosch CA instead of accepting any certificate, closing a potential MITM gap for OAuth tokens on the local network. Local camera endpoints are not affected.

### 1.5.0 (2026-06-10)
Fixes motion silently freezing, plus a configurable stream session length and an opt-in idle-stream reaper.

- **Fix — motion / snapshots no longer silently freeze after a while** (forum #84538): the cameras kept detecting motion in the Bosch app, but `last_motion_at` / `last_event_image_at` stopped updating and only an adapter restart brought them back. Root cause: the FCM push library does not surface a raw TCP socket death (its health check stays "connected"), and event polling was only ever started when FCM *failed at startup* — so a silently-dead push connection left motion frozen indefinitely. Like Home Assistant, the adapter now runs an always-on safety-net event poll: it fetches events roughly every 5 minutes while FCM looks healthy, and every poll interval once FCM is known to be down, so motion is never missed for longer than the safety window regardless of FCM.
- **New setting — stream `maxSessionDuration` ** (RTSP / Stream tab, `0` = camera default, range 600–21600 s): a continuous go2rtc / recorder pull could drop with a timeout at the camera's 3600 s session boundary before the adapter's renewed session took over. Raise this (e.g. 5000) to keep the stream running longer between renewals, without editing the URL by hand.
- **New setting — turn off unwatched live streams** (API requests / Power saving tab, opt-in, default off, experimental): an enabled live stream keeps occupying one of the 3 shared Bosch sessions even when nobody is watching. When enabled, the adapter reads how many clients are actually pulling the local RTSP proxy and, after the configured idle timeout with none, turns the live stream off to free the session. A stream that something is really watching is never stopped.
- **New settings — diagnostic polling** (API requests / Power saving tab): a *Poll diagnostic datapoints* switch (default on) and a separate *Diagnostic poll interval* (default 300 s, range 60–7200 s). The rarely-changing diagnostics — motion zones, light/ambient config, alarm settings, ONVIF/RCP info and cloud feature flags — can now be slowed down or turned off entirely to cut cloud requests, independently of the main poll interval. The core states (online, privacy, motion, snapshots, light, livestream) are unaffected.
- **Quieter log:** the RTSP Digest-rotation `401` (expected, self-healing churn when Bosch rotates the stream credentials and the client reconnects) is now logged at debug instead of warn.

### 1.4.1 (2026-06-10)
Options to reduce load on the shared Bosch session limit, plus dependency updates.

- **New "API requests / Power saving" settings tab.** Your cameras share a hard limit of only 3 simultaneous Bosch sessions across the Bosch app, Home Assistant, this adapter and any recorder, and the cloud is polled per camera — the new options let you cut that load. Request-heavy options are off by default on a fresh install; motion, manual snapshots and on-demand live streams keep working regardless.
- ** `startup_snapshot` (default off):** the adapter no longer opens a Bosch session per camera at start just to learn the online state. Online/offline is now resolved the cheap, session-less way (a LAN TCP ping, falling back to the cloud `/ping` and `/commissioned` checks). Turn it on to fetch a real boot image per camera.
- ** `poll_interval` (default 60 s, range 30–3600 s):** configurable cloud poll cadence. Each tick is several cloud requests per camera, so raising it reduces request volume roughly proportionally; motion push (FCM) stays near-instant.
- **Widget "Auto-refresh indoor snapshot" (default off):** the indoor snapshot pulse (360° every 5 s, Gen2 indoor every 10 s) is now opt-in per widget, so a dashboard tile no longer repeatedly opens a Bosch session unless you ask it to.
- **Dependencies:** `axios` 1.16.1 → 1.17.0 (security hardening) and `@aracna/core` 1.4.4 → 1.5.0 (matches the `@aracna/fcm` peer requirement).

### 1.4.0 (2026-06-10)
A second multi-camera widget, the single-camera card brought to Home Assistant parity, and two tile fixes.

- **New "Bosch Camera Overview" VIS-2 widget:** a multi-camera grid that discovers every camera automatically, sorts them into online / privacy / offline tiers, shows a snapshot and per-tile quick controls, and expands a tile to the full card on click.
- **Single-camera card brought to Home Assistant parity:** the WebRTC iframe is replaced by a native `<video>` element (go2rtc `RTCPeerConnection` with an HLS fallback), which adds an audio toggle, a volume slider, a pause-guard and digital zoom. The full control set is now reachable through a catalog-driven bottom-sheet (gear button) instead of a fixed list, with model-gated pan, motion-zone/privacy-mask overlays and status badges.
- **Privacy cameras now report `online` correctly:** a reachable camera in privacy mode no longer shows as offline. The state is reconciled from the cloud (LAN-TCP → ping → commissioned) so the tile shows "Online" / a privacy placeholder instead of a false "Offline".
- **Fix — no broken-image flash when leaving privacy mode:** turning privacy off briefly showed the browser's broken-image glyph before the first frame loaded. A loading veil now covers the snapshot until a real frame arrives, and the image is refetched immediately on the privacy reveal.
- **Fix — indoor tiles auto-refresh their snapshot:** the cached snapshot only updated on motion, so a panning or busy indoor camera looked frozen. Indoor tiles now pull a fresh snapshot while visible (Gen1 360° every 5 s, the indoor model every 10 s); outdoor cameras are unchanged.

### 1.3.0 (2026-06-08)
New VIS-2 camera widget (React) with live video, plus a livestream-stability fix.

- **New VIS-2 "Bosch Camera" widget (React / Module Federation):** drop it on any VIS-2 view. Three stream modes — **snapshot** (near-live image), **live MJPEG** (started by the play button, streamed from the local RTSP proxy), and **go2rtc WebRTC** (low-latency + audio). iOS/Android-style frosted control bar with privacy, livestream, light, snapshot, pan and siren buttons; actions are gated while privacy is on (only the privacy toggle and fullscreen stay active). Pan is shown only on the Gen1 360° indoor. Fullscreen renders via a portal so it always covers the whole screen, and offline cameras get a clear "Offline" state.
- **Fix:** the RTSP proxy is no longer torn down ~60 s after start when the livestream is enabled during a snapshot (a race armed the snapshot idle-teardown with a stale flag), so VLC/recorders/the widget no longer get "connection refused".

### 1.2.7 (2026-06-07)
Easier integration with the ioBroker.cameras adapter.

- **New per-camera datapoints `stream_host`, `stream_port`, `stream_path`:** the live-stream URL is now also published as three separate read-only fields. The generic RTSP camera type in the [ioBroker.cameras](https://github.com/ioBroker/ioBroker.cameras) adapter has no single full-URL input, so these can be pasted field by field without splitting `stream_url` by hand (forum request). They are populated alongside `stream_url` on stream start and cleared on teardown and on privacy-driven credential rotation.
- **README:** added an "External recorders → ioBroker.cameras" how-to with the field-by-field mapping (set Protocol to TCP — the proxy is TCP-only).

### 1.2.6 (2026-06-07)
Object-structure roles corrected for the ioBroker repository review.

- **Invalid `common.role` values fixed (repochecker object-structure check E1008/E1009):** status states (`info.fcm_active`, `info.connection_status`, `info.maintenance.state`) now use `info.status`; ISO-8601 timestamp states (`last_motion_at`, `last_event_image_at`, …) use `date` instead of `value.time` (which only allows `number`); writable string selects (`stream_quality`, `motion_sensitivity`, `detection_mode`) use `text` instead of the non-catalogue `level.mode`; JSON diagnostics (`onvif_scopes`, `cloud.feature_flags`) use `json`; the WiFi signal percentage uses `value`; the pan angle uses `level`; the string event id (`last_seen_event_id`) uses `text` instead of `value`.
- **Automatic one-time migration:** on first start of 1.2.6 existing installations have these roles rewritten in place (idempotent), so no manual object cleanup is needed.

### 1.2.5 (2026-06-04)
Stream setup is easier to discover.

- **Empty `stream_url` / go2rtc "connection refused":** the livestream is opt-in and OFF by default, so on a fresh install `stream_url` stays empty and a go2rtc / recorder pointed at the not-yet-listening proxy port gets `connection refused`, with nothing to signal why (forum #84538). The adapter now logs a one-time, actionable hint at startup while no camera streams (set `cameras.<id>.livestream_enabled=true`; enable "Expose RTSP proxy to LAN" if go2rtc runs on another host), the `stream_url` datapoint name states it stays empty until `livestream_enabled=true`, and the README has a new troubleshooting section. No behaviour change — streaming was always opt-in.

### 1.2.4 (2026-06-04)
Adapter icon fix.

- **Adapter icon:** the admin icon was a solid blue placeholder; replaced it with the real red Bosch camera logo (the blue tile had shown in the ioBroker admin and in the adapter catalogue).

### 1.2.3 (2026-06-04)
Session-quota log noise + snapshot retry hardening.

- **HTTP 444 session-quota:** when a camera shares Bosch's hard 3-session limit with the mobile app or another integration (Home Assistant / Python CLI), a 444 recurs every 60 s. The handler now warns **once per 5-minute window** (subsequent hits at `debug`), fires the "close other clients" advisory only when first crossing the threshold, and **caps the auto-retry loop at 5 attempts** — after that it logs a single info line and resumes on the next motion event / manual snapshot instead of looping forever.
- **Snapshot after motion:** the `snap.jpg` retry now does up to 2 attempts with increasing backoff (0.8 s, 1.6 s) instead of one, so an empty/aborted image in the first moment after a motion trigger (camera still warming the stream) no longer fails.

### 1.2.2 (2026-06-04)
Log-noise cleanup + Home Assistant polling parity.

- **Privacy HTTP 442:** the per-camera motion-config poll returned `442` (privacy mode / settings frozen) on every slow-tier tick for a camera in privacy mode, and logged a `Motion config poll failed` line each time. `442` is now treated like `443` — a benign "keep last value" skip, no log.
- **MJPEG fast-path:** soft FFmpeg failures (non-zero exit / empty / non-JPEG output — all of which fall back to `snap.jpg`) dropped from `warn` to `debug`, and the MJPEG path is now disabled for a camera after 2 consecutive failures this session (no more FFmpeg spawn + fallback on every snapshot for cameras whose RTSP sub-stream rejects it).
- **First-snapshot abort:** the expected Bosch "stream has been aborted" on the first `snap.jpg` after idle is now logged at `silly` (it always retries).
- **Empty snapshot after motion:** an empty `snap.jpg` body right after a motion trigger (camera still warming the stream) is now retried instead of failing.
- **Shutdown:** timers no longer re-arm during `onUnload`, removing the `setTimeout called, but adapter is shutting down` warnings.
- **Polling interval:** the event-poll fallback and the camera-state base tick are now 60 s (was 30 s), matching the Home Assistant integration's default `scan_interval`; the slow diagnostic tier still lands at 300 s.

### 1.2.1 (2026-06-04)
FCM push fix.

Push registration failed with `HTTP 401 UNAUTHENTICATED` at the Google FCM Registrations API, so the adapter fell back to event polling every 30 s. Cause: the web-push registration sent the well-known default Chrome VAPID key as `applicationPubKey`, which Google rejects — the registration token used to receive Bosch push was therefore never issued. Fixed by omitting the default VAPID (`applicationPubKey: null`), matching the Home Assistant / Python client. Push now registers reliably and motion/person/audio events arrive instantly instead of with up to 30 s delay.

Also added a self-heal: when persisted FCM credentials are rejected by Google on start, the adapter retries once with a fresh registration before falling back to polling.

Offline-camera handling: an offline camera can never serve a stream, so the first live-session attempt hit Bosch's shared session quota (`HTTP 444`) and the adapter then retried every 60 s forever, spamming the log and burning the 3-session budget shared with the Bosch App / other integrations. The 444 handler now confirms the camera's status with a session-less probe (LAN ping, then cloud `/ping` / `/commissioned`, mirroring Home Assistant); a genuinely offline camera is marked `online=false` and the retry loop stops, while a real quota contention on an online camera still retries.

### 1.2.0 (2026-06-03)
Management-tier read-only datapoints (Home Assistant parity).

New per-camera datapoints under `cameras.<id>` (all read-only):
- **Motion zones:** `motion_zones` (raw JSON array of `{x,y,w,h}`) + `motion_zones_count`.
- **Privacy masks:** `privacy_masks` (raw JSON) + `privacy_masks_count`.
- **Automation rules:** `rules` (raw JSON array of `{id,name,isActive,startTime,endTime,weekdays}`) + `rules_count`.
- **Floodlight schedule (Gen1 only):** `lighting_schedule_status` (the `scheduleStatus` mode) + `lighting_schedule` (raw JSON from `lighting_options`). Gen2 already exposes `ambient_light_schedule` via `/lighting/ambient`.
- **Friend sharing (Gen2 only):** `shared_with_friends` (raw JSON array) + `shared_with_friends_count`. Gen1 cameras do not expose this endpoint.

These are polled on the slow tier (~every 300 s) and are best-effort: HTTP 404/442/443/444 keep the last-known value and never raise. The matching write paths (zone/rule/share editing) are intentionally not wired yet.

Internal: global `eslint .` is now clean (widgets linted against real browser/VIS globals instead of being ignored).

### 1.1.0 (2026-06-02)
Feature + hardening release.

New features (Home Assistant parity + ioBroker-native):
- **Local HTTP snapshot server** (`snapshot_http_port`, role `url.cam`) so VIS image widgets / the type-detector can load the latest JPEG per camera, plus a `sendTo("bosch-smart-home-camera.0", "snapshot", {camId|name})` command returning the JPEG as buffer/base64 for Telegram/Signal/Pushover.
- **Push notifications:** global on/off (`notifications_enabled`) and six per-type toggles (`notify_movement` / `_person` / `_audio` / `_trouble` / `_camera_alarm` / `_trouble_email`).
- **Motion:** `motion_enabled` on/off + `motion_sensitivity` select; `detection_mode` select (Gen2: all_motions / only_humans / zones); `record_sound`.
- **Gen2 Indoor II alarm system:** `alarm_arm`, `alarm_mode`, `pre_alarm` switches + `alarm_state` sensor.
- **LEDs / overlay:** `status_led` (Gen2), `timestamp_overlay`, `power_led_brightness` (Gen2 Indoor); **Gen2 Outdoor lighting:** `motion_light_enabled` + `motion_light_sensitivity`, `ambient_light_enabled` + `ambient_light_schedule` sensor.
- `intercom_enabled` two-way audio (Gen2); `commissioned` status sensor; all new admin strings translated into 11 languages.

Stability fixes (several mirrored from the Home Assistant integration):
- FCM push no longer dies permanently after the hourly token refresh (the listener's bearer token is now kept current).
- Stream session-renewal hardening: a stream torn down during a renewal can no longer be resurrected (generation guard), emergency/on-demand sessions get a proper start time, and an external privacy toggle now stops the watchdog so no Bosch session leaks.
- Snapshot HTTP server closes cleanly on unload (keep-alive clients), the cached frame is published before the path so reactive consumers don't 404, and a 444 session-quota retry now reschedules instead of getting stuck.
- A CBS push-registration failure now falls back to event polling instead of leaving the adapter without any event source; Digest auth sends `cnonce` only when `qop` is present (RFC 7616); the duplicate-event guard now covers both the push and the polling path.

Internal: `npm run test:fast` (parallel mocha) for ~5× faster local runs; ~28 new regression tests (full suite 1092 passing).

### 1.0.5 (2026-06-01)
- `intrusion_sensitivity` now acknowledges the clamped 0-7 value instead of the raw input (mirroring `intrusion_distance`, fixed in 1.0.3), so the datapoint never shows a sensitivity the camera did not actually receive.

### 1.0.4 (2026-05-31)
Internal hardening release, no functional changes:
- All polling and watchdog timers (event poll, state poll, maintenance poll, session-renewal, LAN ping, snapshot retry) are now created through the adapter-core `setInterval` / `setTimeout`, so the adapter core cancels them automatically on unload — no orphaned timers outliving `onUnload`. HTTP fetch timeouts now use `AbortSignal.timeout()`.
- New CI security layer: CodeQL static analysis (Python and JavaScript/TypeScript), gitleaks full-history secret scanning, and a dependency-review gate, plus least-privilege `permissions` on every workflow and a `docs/ci-cd.md` pipeline document.
- README restructured to match the Home Assistant project layout; copyright line switched to ASCII `(c)` (repository-checker E6033).

### 1.0.3 (2026-05-29)
Write-path fixes (cross-version with the Home Assistant integration and Python CLI), live-verified on the dev sandbox against firmware 9.40.102:
- **Intrusion detection distance** now clamps to 1–8 m. The camera rejects values above 8 with HTTP 400, so writing `intrusion_distance` = 9 or 10 previously failed with `Failed to handle intrusion_distance … status code 400`. The datapoint maximum, label and acked value now all reflect the 1–8 range.
- **Intercom audio levels** are written as the full `{audioEnabled, microphoneLevel, speakerLevel}` body (read-merge-write). Setting `speaker_level` no longer silently wipes `microphone_level`.
- **Pan** acks the clamped angle that was actually written instead of the raw user value, and a busy camera (HTTP 444, too many simultaneous live sessions) is now reported as a session-quota warning instead of a hard error.

### 1.0.2 (2026-05-29)
Removed the `@aracna/fcm` registration log noise: the library no longer prints raw `postAcgRegister` / `PHONE_REGISTRATION_ERROR` lines to the ioBroker log on every push-registration attempt — its internal loggers (which run through `@aracna/core`'s `Logger`) are disabled at import. FCM health is still reported via `info.fcm_active`. As a side effect this references `@aracna/core` explicitly in source, satisfying repository-checker W5060. No functional changes.

### 1.0.1 (2026-05-29)
Repository-checker compliance hotfix: news entries translated into all 11 languages (E1054); current version listed in the README changelog (E6006); changelog consolidated into the README, with old entries archived in `CHANGELOG_OLD.md` (W6017/W6018/W6020); prettier config added (W0076); admin and vis-widget i18n completed for all 11 languages and migrated to the short `{lang}.json` format (W5612/W5603/S5601); obsolete eslint devDependencies dropped (W0078); dependencies refreshed — axios, axios-cookiejar-support, typescript, c8, eslint — and a `@tsconfig/node22` base added (W0083/S0085/S0088). No functional changes.

### 1.0.0 (2026-05-28)
Out of beta. v0.9.0 features — `privacy_sound_enabled`, `autofollow_enabled` (360° cameras), `unread_events_count` + `mark_all_read` button, `last_seen_event_id` persisted across restarts — plus v0.9.1 follow-up fixes: 442-unsupported-feature cache (no warn-storm for the Outdoor privacy_sound poll), unread count sourced from `GET /v11/events` (the listing's `numberOfUnreadEvents` field proved unreliable), and exponential backoff (30→300 s) on WiFi / autofollow / privacy-sound polls returning HTTP 444.

### 0.8.0 (2026-05-25)
HA-feature parity wave — ONVIF Scopes, RCP version, cloud feature flags, MJPEG inst=3 snapshot, 444 session-quota proper sensor state. Repochecker bot preflight added (E1032 news count ≤ 7, E1105 visWidgets components, E0028 Node ≥ 22). Engines bumped to Node 22 LTS; matrix `[22.x, 24.x]`. `@types/node` pinned to `^22.0.0` (Dependabot major-version ignore added).

### 0.7.15 (2026-05-24)
Hotfix — `upsertState` cache / DB divergence.

- **Symptom**: sandbox running v0.7.14 showed `privacy_enabled = True ack=True ts=16:10 UTC` while the state-poll loop kept logging `State poll: privacy ON → OFF (from cloud)` every 30 s. The DP `ts` stayed frozen for 4+ hours despite each poll calling `upsertState` with a new value.
- **Root cause**: `upsertState` set the in-memory `_stateCache` BEFORE awaiting `setStateAsync`. If the DB write failed or rejected for any reason, the cache held the new value while the DB still held the old one. From that point on every subsequent `upsertState` call hit the cache short-circuit (`_stateCache.get(id) === value` → return early) and silently skipped the write — the DP was frozen on the stale DB value for the rest of the adapter's lifetime.
- **Fix**: await `setStateAsync` first; only update `_stateCache` after a successful write. A failed write leaves the cache at the old value, so the next call retries instead of skipping.
- **+4 pinned tests** in `main_upsertstate_cache_divergence.spec.ts` covering: successful write updates cache; throwing write leaves cache untouched + next call retries; repeated identical writes still short-circuit; recovery after multiple transient failures. Full suite: **614 passing / 0 failing / 4 pending**.

### 0.7.14 (2026-05-24)
Live-audit pass on the Indoor II camera surfaced eight latent bugs in the data plane, all fixed in one round.

- ** `wifi_signal_pct` stuck at 0**: the `wifiinfo` endpoint returns `signalStrength` as a percent (0–100), not dBm — verified live against firmware 9.40.102. v0.7.7 had assumed dBm semantics and looked for a `signalStrengthPercentage` field that does not exist. The percent now maps to `wifi_signal_pct` directly.
- ** `wifi_signal_strength` DP retired**: it was labelled "dBm" but always received percent values from v0.7.7 onward. v0.7.14 migration removes the DP from existing instances so users don't see two contradictory readings.
- ** `trouble_disconnect` no longer classified as motion**: pre-v0.7.14 the `fetchAndProcessEvents` polling fallback wrote every cloud event — including connectivity status events (`trouble_disconnect`, `trouble_reconnect`) — into `last_motion_at` / `last_motion_event_type` and flipped `motion_active=true`. v0.7.14 limits motion DPs to an allowlist (`motion`, `person`, `audio_alarm`); status events are info-logged and skipped.
- **Stale events no longer replay on every restart**: `_lastSeenEventId` is in-memory only, so after each adapter restart the newest cached cloud event was re-processed — including four-week-old `trouble_disconnect` events from offline Gen1 cameras. Side effects (motion_active flip, auto-snapshot, MQTT publish) are now skipped for events older than 15 minutes; `last_motion_at` still updates as a historical "last motion seen" record.
- ** `lan_reachable` refreshes per poll**: pre-v0.7.14 the TCP-ping only fired during cloud outages, so `lan_reachable` stayed at its `false` default during normal operation. v0.7.14 fires a fire-and-forget per-camera TCP-ping inside every `_pollSingleCameraState` tick (no impact on poll latency).
- ** `online` flips true under privacy mode**: the snapshot-based reachability check fails when the camera is in privacy mode, so `online` stayed at the default `false` even when the camera was clearly alive (TCP-pings succeed, cloud state syncs). v0.7.14 also flips `online=true` whenever the new periodic TCP-ping succeeds.
- **Intrusion DPs mirror real cloud values**: `intrusion_sensitivity` and `intrusion_distance` were never read from `/intrusionDetectionConfig` — they showed only the DP defaults (3, 5). New `_pollIntrusionConfig` runs in every Gen2 state poll, caches the full body, and mirrors `sensitivity` + `distance` to the DPs.
- **Intrusion writes succeed**: Bosch's `intrusionDetectionConfig` endpoint rejects DELTA PUTs with HTTP 400 — pre-v0.7.14 sent `{sensitivity: N}` or `{detectionDistance: N}`. v0.7.14 reads the full config from the write-cache (or fetches it on first write), merges the user's change, and PUTs the full body. Also: the `distance` field is named `distance`, not `detectionDistance`. Verified live with `{"enabled":true,"sensitivity":4,"detectionMode":"ALL_MOTIONS","distance":8}` → HTTP 204.
- **HTTP 443 surfaces clearly**: Bosch returns 443 ("non-standard") on every config-write while the camera is in privacy mode. HA already maps this to a `privacy_blocked` error; v0.7.14 mirrors that and throws "cam is in privacy mode, disable privacy first" instead of a generic axios error.

Tests: existing pinned tests in `main_audio_intrusion_wifi.spec.ts` updated for the GET→PUT-full-body sequence and the new percent mapping; `main.spec.ts` polling-fallback test uses a fresh timestamp to exercise the post-stale-filter path. Full suite: **610 passing / 0 failing / 4 pending**.

### 0.7.13 (2026-05-24)
Privacy-toggle fix part 2 — TLS proxy now actually rotates its bound Digest creds.

- **Root cause of v0.7.12's residual 401**: the TLS proxy held its `digestUser` / `digestPassword` in a closure captured at proxy-start time. On the cached-proxy reuse path (same remote, sticky port), `upsertSession` republished the public `stream_url` with the freshly-issued creds but **never refreshed the proxy's own in-memory creds** — every reconnect from BlueIris/VLC still ran the Digest dance with the pre-toggle values.
- **Fix (`src/lib/tls_proxy.ts`)**: `digestAuth` is now stored in a mutable holder and exposed via `TlsProxyHandle.updateDigestAuth(user, password)`. Each per-connection auth-handler attachment reads the current values, so future connections pick up rotated creds without restarting the listener (sticky port + already-published `stream_url` survive untouched).
- **Wire-up (`src/main.ts` `upsertSession`)**: on the reuse branch, `proxyHandle.updateDigestAuth(session.digestUser, session.digestPassword)` is called with every session refresh.
- **Eager refresh (`_pollSingleCameraState`)**: on a detected ON→OFF privacy edge, if `livestream_enabled === true`, fire-and-forget `ensureLiveSession()` so the proxy's Digest creds are rotated **before** the next BlueIris/VLC reconnect attempt. Off-state edges or off-streaming cams stay no-op.
- **Defense-in-depth (`src/lib/rtsp_auth.ts`)**: when the camera responds 401 to our authed retry (i.e. we still got stale creds in), the proxy now forwards the 401 honestly + ends the client socket instead of unconditionally entering `INJECTING` mode with proven-bad creds. The next client reconnect retries against the by-then-refreshed proxy.
- **+13 pinned tests**: `rtsp_auth.spec.ts` covers AUTH_RESPONDING+401 abort path; `tls_proxy.spec.ts` covers `updateDigestAuth` API + idempotency; `main_privacy_toggle_invalidates_session.spec.ts` covers all 6 modes of the eager refresh (ON→OFF + livestream=true → fired; ON→OFF + livestream=false → not; ON→OFF + flag missing → not; OFF→ON → not regardless of livestream; ensureLiveSession rejects → no crash; unchanged state → not).

### 0.7.12 (2026-05-23)
Privacy-toggle invalidates cached LiveSession + clears `stream_url` DPs.

- **Symptom**: BlueIris and VLC refused to play `cameras.<id>.stream_url` after a privacy-mode toggle via the Bosch app, returning "Check Port/User/Password" / 401 until the adapter was restarted.
- **Root cause**: Bosch rotates the Digest credentials of the RTSP stream URL on every privacy-state edge (ON→OFF and OFF→ON). Our `_liveSessions` cache holds the pre-toggle creds for up to 60 s, so the published `stream_url` DPs kept advertising the now-stale credentials.
- **Fix (`_pollSingleCameraState`)**: every detected privacy-state change drops the cached `LiveSession` and clears both `stream_url` + `stream_url_sub` DPs to `""`. The next `ensureLiveSession()` call (next stream-toggle, snapshot, RCP write, or watchdog tick) is forced to issue a fresh `PUT /connection` and re-publish the URLs with rotated credentials. The empty-string clear also signals to external clients that the stream is temporarily unavailable, preventing them from silently retrying the stale URL.
- **+4 pinned tests** in `test/unit/main_privacy_toggle_invalidates_session.spec.ts`.

### 0.7.11 (2026-05-21)
Login UX: urgency warning + tab-first workflow + README recovery steps.

- **60-second urgency warning**: login dialog now displays an orange warning above the auth-code paste field emphasising that the Bosch auth code expires in ~60 seconds — prevents the most common "code expired" failure on slow copy-paste.
- **Tab-first workflow**: keyboard flow restructured so Tab moves directly to the paste field after opening the Bosch login tab, reducing fumble rate.
- **README recovery steps**: README rewritten with explicit "code expired" recovery path — what to click when the code times out mid-flow.

### 0.7.10 (2026-05-20)
Cloud-503 handling — honest error messages, exponential renewal backoff, maintenance-window detection. Closes [#9](https://github.com/mosandlt/ioBroker.bosch-smart-home-camera/issues/9).

- **Honest error messages**: 503 during active Bosch maintenance window → `[bosch-maintenance]` INFO (not WARN). 401/403 → "LAN session credentials expired". "Camera offline or unreachable" only after 3 consecutive LAN TCP failures.
- **Exponential renewal backoff** (`_handleRenewalFailure`, `_attemptBackoffRenewal`): on watchdog renewal failure the stream stays alive and retries at 5 s → 15 s → 45 s → 120 s → 300 s → every 300 s. Only tears down after (a) session age ≥ 60 min and renewal still failing, or (b) 3 consecutive LAN TCP connect failures.
- **Per-camera `maintenance_state` DP** (`cameras.<id>.maintenance_state`): string read-only, one of `"active"` / `"scheduled"` / `"none"`. Populated by the existing hourly RSS poll and reactive 5xx re-fetches.
- **+9 tests** in `test/unit/main_cloud_503_handling.spec.ts` (all passing).

### 0.7.9 (2026-05-20)
MQTT Bridge.

- **MQTT Bridge** (`src/lib/mqtt_bridge.ts`): optional publisher that connects to any MQTT broker on adapter ready and publishes `motion` / `person` / `audio_alarm` events as JSON payloads under configurable topic prefixes. Supports plain MQTT and TLS (`mqtts://`), optional username/password auth. Wired into all three event paths: FCM push, polling fallback, synthetic triggers.
- **Admin UI tab "MQTT Bridge"**: 6 config fields — enable toggle, broker host, port, TLS, username, password, topic prefix. All broker-detail fields hidden when bridge is disabled.
- **npm dep `mqtt@^5.15.1` ** added to `dependencies`.
- **+13 tests** in `test/unit/main_mqtt_bridge.spec.ts`.
- **VIS-2 Camera Tile widget (alpha)**: custom `bosch-camera-tile` widget for VIS-2 dashboards — displays `snapshot_path` image with auto-refresh, privacy-mode overlay badge, and stream URL copy button. See `widgets/bosch-camera-tile/` and `## VIS-2 Camera Tile widget (alpha)` section.

### 0.7.8 (2026-05-20)
Emergency LiveSession fix + PTZ pan presets.

- **Emergency LiveSession restart**: if a live-session open fails with 503 / timeout, the adapter now immediately retries once with a fresh Digest auth challenge instead of waiting for the next poll tick. Prevents a 30 s dead-stream window after transient cloud hiccups.
- **PTZ pan presets** (`pan_preset` DP): new string data point alongside `pan_position`. Accepts named presets: `home`, `left`, `right`, `back-left`, `back-right`. Writing a preset name triggers the same RCP pan command as the numeric position DP. Mirrors HA integration's opt-in select entity.

### 0.7.4 (2026-05-19)
LAN-fallback feature set.

- **Coordinator outage-ping sweep**: when the state-poll GET returns 5xx or fails, a throttled (once per 30 s) fan-out TCP-connect probe runs against every known camera on port 443 so `cameras.<id>.lan_reachable` has a fresh value during cloud outages.
- **Persistent LAN-IP map**: `cameras.<id>.lan_ip` is written on every successful live-session open (`upsertSession`). On adapter start the map is reloaded from these states so the TCP-ping path has a working address book even before the first successful cloud refresh.
- ** `cameras.<id>.lan_reachable` state**: boolean DP (read-only). Always reflects the last TCP-probe result; honors the post-write grace period.
- **Post-write grace period (30 s)**: after a successful local RCP write the camera briefly rotates Digest creds and tears down its HTTPS endpoint. `_localWriteAt` is stamped on every successful local write; `isLanReachable()` treats the camera as reachable during the 30 s window so the DP does not flap to `false` after every privacy/light toggle.
- **Cloud-degraded startup**: when `fetchCameras()` fails on startup (Bosch cloud 5xx), the adapter now rehydrates known camera IDs from the ioBroker object DB and kicks an immediate LAN-ping sweep instead of silently returning. Adapter stays alive and becomes fully operational once the cloud recovers.
- **Front-light Gen2 LOCAL RCP fallback**: `_applyLightingState()` now catches cloud errors and retries via `_localWriteFrontLight()` (RCP `0x0c22`, T_WORD, num=1, brightness 0–100).
- **Privacy LOCAL RCP fallback**: `handlePrivacyToggle()` now catches cloud errors and retries via `_localWritePrivacy()` (RCP `0x0d00`, P_OCTET) for Gen2 cameras with a known LAN IP.
- **+16 unit tests** in `test/unit/main_lan_fallback.spec.ts`. 572 tests total.

### 0.7.2 (2026-05-19)
Notification hooks for maintenance lifecycle and camera availability changes.

- **Maintenance lifecycle notifications** (scheduled → active → past): when the RSS-derived `info.maintenance.state` enters `scheduled`, `active`, or `past`, the adapter writes a JSON payload to the new `info.maintenance.last_notification` DP. Three notifications per window: announcement when first seen as scheduled, "active" when the window opens, "ended" when it closes. Deduped by `(RSS link, state)` so a poll tick during the same phase stays silent.
- **Per-camera offline / online transition notifications**: when `cameras.<id>.online` flips, a JSON payload is written to the new `cameras.<id>.last_status_notification` DP. The first observation after adapter start is silent (baseline recording). Payload: `{ title, message, status, ts }`.
- Both notification DPs are writable via Blockly `on-change` triggers: parse the JSON, extract `title` + `message`, and forward to Telegram, Pushover, or any other notification adapter.
- **+9 unit tests** covering the full transition matrix, dedupe, stale-past suppression, unknown-flap silence.

### 0.7.0 (2026-05-19)
Cloud maintenance / outage discovery.

- ** `info.maintenance.state` ** — string DP: `active` / `scheduled` / `past` / `recent` / `unknown` / `idle`. Classifies the latest announcement relative to the current time.
- ** `info.maintenance.title`, `.link`, `.scheduled_start`, `.scheduled_end`, `.summary`, `.source`, `.camera_relevant` ** — full parsed announcement fields.
- ** `info.maintenance.last_fetched` ** — ISO 8601 timestamp of the last successful community site contact.
- **Fetch cadence**: one immediate fetch at adapter startup, then every 3 600 s. Reactive re-fetch (5 min cooldown) on any 5xx from the camera cloud API.
- **Fallback chain**: primary RSS (Wartungsarbeiten → Statusmeldungen) → HTML board page.
- **Berlin TZ** (MEZ/MESZ, DST-aware) parsed from German DD.MM.YYYY HH:MM–HH:MM text.
- **+39 unit tests** covering RSS parser, Atom format, MEZ/MESZ DST, fallback chain, camera-relevance filter, all state classifier branches. 481 tests total.

### 0.6.2 (2026-05-18)
FCM push channel now self-heals after transient socket drops.

- **FCM auto-reconnect with exponential backoff** (5 s → 30 s → 120 s → 600 s cap). A successful retry restores `info.fcm_active` to `healthy` within seconds and resets the backoff so the next disconnect starts from 5 s again. The pending reconnect timer is cancelled on unload so the adapter never tries to start a half-torn-down listener during shutdown.
- **+6 unit tests** covering the backoff progression, success/reset path, re-entrancy guard against rapid-fire disconnect events, and onUnload cleanup. 442 tests total.

### 0.6.1 (2026-05-18)
Cleanup: removed legacy iOS FCM code paths.

- ** `FCM_IOS_APP_ID` constant removed** — the adapter has used only the Android Firebase key since its first release; the constant was dead code.
- ** `mode: "ios"` dispatch chain removed** — `FcmListenerOptions.mode`, `FcmCredentials.mode`, and `FcmRawCredentials.mode` now accept `"android" | "auto"` only.
- ** `_registerWithCbs()` always posts `deviceType: "ANDROID"` ** — the `"IOS"` branch is gone.
- **Legacy-creds back-compat**: users who stored credentials with `mode: "ios"` from a hypothetical pre-cleanup install will have their persisted mode rewritten to `"android"` on first start — no re-registration triggered.

### 0.6.0 (2026-05-16)
Security hardening + reliability round.

- **OAuth tokens + PKCE secrets are AES-encrypted at rest** via the ioBroker system secret. Migration is automatic on first start.
- **FCM credentials persisted across restarts** (`info.fcm_creds`, encrypted). Previously every adapter start triggered a full re-registration.
- **Camera-state poll runs per-camera in parallel** (`Promise.all`). With 4 cameras the per-tick wall-clock drops from ~N × 250 ms to ~250 ms.
- **Timer hygiene**: `motion_active` auto-clear (90 s) and snapshot-idle teardown (60 s) now use adapter-core's `this.setTimeout` / `this.clearTimeout`, so adapter unload cancels them reliably.
- **Snapshot-saved log line is now `debug` ** (was `info`) — it was firing on every motion event and flooding logs on busy installations.
- **+51 unit tests** covering the new encryption paths, FCM credential persistence, livestream toggle teardown, event processing dedup, siren / wallwasher handlers, idle teardown window, and reachability tracker. 436 tests total, 0 failing.

### 0.5.5 (2026-05-16)
Two forum-driven bugfixes reported against v0.5.4.

- ** `motion_active` now flips on the FCM-polling-fallback path** (`info.fcm_active="polling"`). The shared post-event helper (`_onMotionFired()`) was only being called by the real FCM event handler and the synthetic motion trigger — not by `fetchAndProcessEvents()`. Affected users saw `last_motion_at` update correctly while `motion_active` stayed permanently `false`.
- **Light state now syncs back from the Bosch app**. The 30 s state poll now derives `front_light_enabled` from `frontLightSettings.brightness > 0` and `wallwasher_enabled` from `max(topLed, bottomLed) brightness > 0`, so app toggles propagate within ~30 s.

### 0.5.4 (2026-05-15)
Login UX overhaul plus three small quality fixes.

- **One-click Bosch login button** in the instance settings. The browser-OAuth URL is also published as the `info.login_url` datapoint and rendered as a clickable link in the Admin UI.
- **No more terminate/restart loop while waiting for login**. If a stale `redirect_url` or an expired PKCE pair causes the code exchange to fail, the adapter now clears the stale state, regenerates a fresh login URL, sets `info.connection_status=auth_error`, and stays alive in awaiting-login mode.
- **Reset-login button**: new `Reset login (clear tokens & restart)` button in the instance settings.
- ** `info.connection_status` text state** (`logged_out` | `awaiting_login` | `connected` | `auth_error`).
- ** `info.last_login_at` ISO timestamp** of the most recent successful token mint.
- **Privacy mode no longer flips `online=false` **: an indoor camera in permanent privacy mode used to drift offline after a few startup-snapshot retries.
- ** `last_motion_at` is now valid ISO 8601**: strips the trailing `[zone-id]` from Bosch's `ZonedDateTime#toString` format so Blockly scripts and VIS widgets can parse the field with standard tooling.

### 0.5.3 (2026-05-14)
Five forum-driven improvements focused on the BlueIris / NVR-recorder integration.

- **RTSP-aware proxy with transparent Digest auth**: the TLS proxy now speaks RTSP and handles the Bosch Digest auth dance itself. Clients (BlueIris, iobroker.cameras, Frigate) connect to a clean `rtsp://host:port/rtsp_tunnel?inst=1&…` URL — no credentials in the URL anymore.
- **Snapshot session keep-alive (60 s idle window)**: rapid `snapshot_trigger` bursts reuse the warm Bosch session instead of paying `PUT /v11/.../connection` on every snap.
- ** `cameras.<id>.motion_active` ** (new, boolean, read-only): edge-trigger DP, flips `true` on every motion / person / audio event, auto-clears to `false` after 90 s.
- ** `cameras.<id>.last_event_image` ** + **Auto-snapshot on motion**: every FCM motion / person / audio_alarm event now fetches a fresh JPEG and writes it as a `data:image/jpeg;base64,…` string.
- ** `cameras.<id>.stream_url_sub` ** (new, experimental): sub-stream URL via `inst=2` alongside the main `inst=1` `stream_url`.

### 0.5.2 (2026-05-14)
Per-camera livestream switch — default OFF.

- ** `cameras.<id>.livestream_enabled` ** (new, boolean, writable, default `false`): explicit on/off switch for the continuous RTSP livestream. Streaming is now opt-in.
- **Snapshots remain unaffected**: every `snapshot_trigger` still opens a session, fetches the JPEG, and then — when `livestream_enabled` is `false` — closes the session right after.

### 0.5.1 (2026-05-14)
Gen2 siren + RGB wallwasher colour, plus v0.5.0 forum-driven fixes.

- **Siren** (Gen2 only): new `cameras.<id>.siren_active` boolean DP. Write `true` to trigger the integrated 75 dB siren (panic alarm), `false` to silence.
- **RGB wallwasher** (Gen2 outdoor): two new DPs — `cameras.<id>.wallwasher_color` (HEX `#RRGGBB`, empty string = warm white mode) and `cameras.<id>.wallwasher_brightness` (0…100).
- Privacy state now syncs back from the Bosch app every 30 s.
- `stream_url` now embeds Digest credentials and Bosch query params so external recorders no longer get "401 Unauthorized" on connect.
- TLS-proxy port is sticky across session renewals and adapter restarts (persisted in `cameras.<id>._proxy_port`).
- New admin tab "RTSP / Stream": tickbox to bind the proxy to `0.0.0.0` plus an external-host field so the published URL uses the ioBroker host's LAN IP.

### 0.4.0 (2026-05-13)
- Light-datapoint split: `front_light_enabled` + `wallwasher_enabled` can now be controlled independently
- Synthetic motion trigger: write `true` to `cameras.<id>.motion_trigger` (select event type via `motion_trigger_event_type`) to inject a motion/person/audio_alarm event from an external sensor
- RTSP session watchdog: LOCAL Bosch sessions renew automatically ~60 s before `maxSessionDuration` expires
- Cloud-relay media paths fully removed: adapter enforces LOCAL-only for all media (RTSP + snapshots)

Older releases (0.0.1 – 0.3.3) are archived in CHANGELOG_OLD.md.

---

## License

MIT License — see [LICENSE](./LICENSE).

Copyright (c) 2026 mosandlt