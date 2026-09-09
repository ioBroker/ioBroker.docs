---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.anker-solix/README.md
title: ioBroker.anker-solix
hash: QTtGUWGlZsNSN5IK7aMwNPJZKSravG4vWRo82iQEPhE=
---
# ioBroker.anker-solix

![NPM-Version](https://img.shields.io/npm/v/iobroker.anker-solix.svg)

ioBroker-Adapter für **Anker Solix** Stromversorgungssysteme (Solarbank, Smart Meter, PPS, Ladestation für Elektrofahrzeuge usw.). Es basiert auf der Integration von Home Assistant. [thomluther/ha-anker-solix](https://github.com/thomluther/ha-anker-solix) und verwendet dasselbe inoffizielle **solixapi** Python-Bibliothek.

> **Unterstützte Betriebssysteme**
>
> | Betriebssystem | Status                                                                                 |
> | -------------- | -------------------------------------------------------------------------------------- |
> | **Linux**      | Primäres Produktionsziel — **CI-getestet** (Docker, NAS, Raspberry Pi, …)              |
> | **Windows**    | **Unterstützt und getestet** auf ioBroker für Windows (Python 3.12+)                   |
> | **macOS**      | **Nicht unterstützt** Die automatische Python/venv-Installation wurde nicht überprüft. |
>
> npm / `package.json` Kataloginstallation: **`linux`** Und **`win32`** nur. Details: [Unterstützte Plattformen](#supported-platforms).

Ein kleines **Python-Brücke** (Ein persistenter Daemon, ähnlich wie Home Assistant, fragt die Anker-Cloud und optional MQTT ab und stellt die Werte als ioBroker-Zustände bereit.) Optionale Entitätsgruppen (seit Version 0.9.0) entsprechen dem Gültigkeitsbereich von Home Assistant: nur **Kern** ist standardmäßig aktiviert, um die API-Last zu begrenzen.

## Inhaltsverzeichnis

1. [Haftungsausschluss und Nutzungsbedingungen](#disclaimer--usage-terms)
2. [Unterstützte Plattformen](#supported-platforms)
3. [Wie dieser Adapter in ioBroker funktioniert](#how-this-adapter-works-in-iobroker)
4. [Anforderungen & Installation](#requirements--installation)
5. [Konfiguration](#configuration)
6. [Anker-Konto & Anmelde-Cache](#anker-account--login-cache)
7. [Einschränkungen](#limitations)
8. [Unterstützte Geräte](#supported-devices)
9. [Staatsstruktur und Entitätsgruppen](#state-structure--entity-groups)
10. [MQTT](#mqtt-managed-devices)
11. [Besondere Hinweise zu Geräten](#special-device-notes)
12. [Fehlerbehebung bei Anmeldung/Abfrage](#troubleshooting-login--poll)
13. [Dienstleistungen](#services)
14. [Quellenangaben und weiterführende Literatur](#credits--further-reading)
15. [Änderungsprotokoll](#changelog)
16. [Veröffentlichung](#publishing-npm--iobroker-catalog)

---

## Haftungsausschluss und Nutzungsbedingungen

Dieser Adapter ist **nicht** verbunden mit Anker. Marken und Produktnamen gehören ihren jeweiligen Eigentümern.

Der Adapter verwendet einen **inoffiziell** Python-Bibliothek zur Kommunikation mit dem Anker Power **Cloud-API** (dasselbe gilt für die mobile App). Diese API kann sich jederzeit ändern oder fehlerhaft sein. Falsche Einstellungen können Geräte beeinträchtigen; der Benutzer akzeptiert diese Risiken bei der Aktivierung der Instanz (**Konto** tab). Zukünftige Adapter-Updates können die Überwachung oder Steuerung erweitern.

---

## Unterstützte Plattformen

| Plattform                                             | Status                       | Anmerkungen                                                                                                                                                                                                                                                       |
| ----------------------------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Linux** (Debian, Ubuntu, Docker, Proxmox, NAS, RPi) | **Primär / CI-getestet**     | Empfohlen für den Produktiveinsatz; Python 3.12+ venv (`python3-venv`, `python3-pip`)                                                                                                                                                                             |
| **Windows** (ioBroker für Windows)                    | **Unterstützt und getestet** | Auf einem echten ioBroker-Windows-Host verifiziert; das Installationsprogramm versucht `py -3.13`, `py -3.12`dann die Pfade zu den Programmdateien; festlegen **pythonPath** Bei Bedarf als Administrator ausführen; installiert **`tzdata`** für `Europe/Berlin` |
| **macOS**                                             | **Nicht unterstützt**        | Theoretisch der gleiche Unix-Codepfad wie unter Linux, aber automatisches Python/venv-Bootstrap war **nicht getestet** — keine Unterstützung für den npm-Katalog (`package.json` hat keine `darwin`)                                                              |

**Linux** bleibt das Hauptziel für ioBroker-Implementierungen. **Windows** wird vollständig im Code unterstützt und manuell verifiziert; GitHub Actions führt Adaptertests durch auf **`ubuntu-latest`** Und **`windows-latest`**. **macOS** ist von Supportansprüchen ausgeschlossen, bis die Python-Installation getestet wurde.

---

## Wie dieser Adapter in ioBroker funktioniert

| Schicht                                | Rolle                                                                                                     |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Node.js-Adapter**                    | Instanzkonfiguration, Zeitplanung, ioBroker-Zustände, Steuerungswarteschlange                             |
| **Python-Brücke** (`python/bridge.py`) | Langlebige Sitzung: API + optionales MQTT (HA-Stil)                                                       |
| **solixapi**                           | Cloud-Login, Standorte/Geräte, Energiestatistiken, MQTT-Karte                                             |
| **Authcache**                          | `iobroker-data/<instance>/authcache/<email>.json` — wird nach erfolgreicher API-Anmeldung wiederverwendet |

Das Abfrageintervall sollte sein **60–180 s** (Gleiche Empfehlung wie bei HA). Die Standortliste wird in jedem Zyklus aktualisiert; Geräte-/Standortdetails und Energiedaten werden in einem langsameren Intervall aktualisiert (`deviceDetailMultiplier`(Standardmäßig bei jeder 10. Abfrage).

> **Wichtig:** Für Cloud-Geräte ist die Anker-API **obligatorisch** (MQTT allein reicht nicht für vollständige Systemdaten aus). Ausnahme: **Modbus-only** Dieser Modus nutzt lokales TCP und benötigt keine Cloud-Anmeldeinformationen. **nicht** Lokale BLE-Integrationen ersetzen – siehe [Zusätzliche Ressourcen](#credits--further-reading).

---

## Anforderungen & Installation

- ioBroker **js-controller >= 6**, **admin >= 7.6**
- **Node.js >= 22**
- **Python 3.12+** auf dem ioBroker-Host (empfohlen / Upstream-Anforderung):
  - **Linux:** `python3-venv` + `python3-pip` (Debian/Ubuntu) – primäres Produktionsziel
  - **Windows:** Python 3.12+ von python.org oder `py -3.12`Der Adapter-Installer kümmert sich um venv und **`tzdata`**
  - **macOS:** **wird nicht unterstützt** (Automatische Python-Installation nicht überprüft)
  - **Ausnahme (nach bestem Bemühen):** Linux **Docker-Container** bezogen auf **Debian 12 Bookworm** (z.B `buanet/iobroker:latest-v11`) kann das System verwenden **Python 3.11** Wenn Version 3.12 nicht über apt verfügbar ist, benötigen sowohl Bare-Metal-Bookworm-Systeme als auch andere Distributionen und Nicht-Bookworm-Container weiterhin diese Version. **3.12+**&#x49;nstallieren Sie Python 3.12+ vorzugsweise in einem permanenten Pfad und stellen Sie es entsprechend ein. **pythonPath** wenn möglich.

Python-Abhängigkeiten werden im Adapterordner installiert (`python/.venv` oder `python/site-packages`Seit Version 0.2.0: automatisch beim Start (**Optionen** → `autoInstallPython`) oder Schaltfläche **Installieren Sie die Python-Abhängigkeiten.**.

Installation über ioBroker (empfohlen):

```bash
iobroker install anker-solix
```

Nachdem die Adapterdateien lokal geändert wurden, laden Sie die Instanz hoch:

```bash
iobroker upload anker-solix
```

**Multihost:** verwenden `--host "PC(SmartHome)"` mit Anführungszeichen, wenn der Name Sonderzeichen enthält.

Entfernen Sie gegebenenfalls vorhandene veraltete symbolische Verknüpfungen: `rm -f /opt/iobroker/node_modules/iobroker.AnkerSolix`

Manuelle Python-Einrichtung (falls erforderlich):

```bash
cd node_modules/iobroker.anker-solix
python3 -m venv python/.venv && python/.venv/bin/pip install -r python/requirements.txt
```

### Home Assistant (ioBroker-Add-on)

Der Offizielle **ioBroker** Die App auf Home Assistant OS hat oft `python3` Aber **NEIN `pip`** Und **NEIN `python3-venv`**&#x49;nstallieren oder aktualisieren Sie den Adapter über den ioBroker-Katalog / npm (`iobroker install anker-solix`). Aus **0.10.72** Anschließend erkennt das Installationsprogramm dieses Profil und versucht Folgendes:

1. virtualenv in `python/.venv` (oder `--without-pip` + pip innerhalb von venv)
2. `get-pip.py` mit `--break-system-packages` wenn System-Python PEP 668 ist
3. `pip install --target python/site-packages` als Ausweichlösung

Im Instanzadministrator: **Optionen** → **Installieren Sie die Python-Abhängigkeiten.**&#x6F;der starten Sie die Instanz neu mit **autoInstallPython** ermöglicht.

Wenn die Protokolle immer noch anzeigen `No module named pip`Öffnen Sie das ioBroker/SSH-Terminal auf dem Host und führen Sie Folgendes aus:

```bash
cd /data/iobroker/node_modules/iobroker.anker-solix
node tools/install-python.js
iobroker restart anker-solix.0
```

Kopie **`authcache/<email>.json`** von einem funktionierenden Anker-Setup (z. B. ha-anker-solix) in `iobroker-data/anker-solix.0/authcache/` um das Captcha beim ersten Login zu vermeiden.

### Lokaler Modbus (optional)

Neuere Anker-Geräte (Solarbank 4 / Max AC / Max, Smart Meter Gen 2, Smart Plug Gen 2, **SOLIX X1 HES**, **V1 Smart EV Ladegerät**) können abgefragt werden **lokal über Modbus TCP** (Port 502). Registerkarten folgen. [Ankers offizielle Modbus-Protokolle](https://support.ankersolix.com/) und von der Community verifizierte X1-Zuordnungen ([Anker-x1-ha](https://github.com/afewyards/anker-x1-ha)).

1. Aktivieren **Modbus TCP** in der Anker App (Solarbank: System / Dreiparteiensteuerung; **X1**Professionelle App → Kommunikationseinstellungen; **V1 EV-Ladegerät**: Einstellungen → Integrationen).
2. Adapter-Admin → **Modbus (lokal)** → Kanal aktivieren, jede Geräte-IP hinzufügen.
3. Optional: Aktivieren **Modbus-only (keine Cloud)** Wenn Sie sich nicht in der Anker-Cloud anmelden möchten, sind weder Python noch Anmeldeinformationen oder Nutzungsbedingungen erforderlich; die Instanz ist **Grün** wenn mindestens ein Modbus-Gerät angeschlossen ist (ansonsten gelb).
4. Sensoren: `anker-solix.0.modbus.<name>.sensors.*` (SOC, PV, Netz, Batterie, SN, …).
5. Bedienelemente: `anker-solix.0.modbus.<name>.control.*`
   - Solarbank: `operating_mode`, SOC-Grenzwerte, `backup_soc_enable`, `battery_power_direction` + `battery_power_setpoint` (Sollwert nur in **Kontrolle durch Dritte**; zuerst die Richtung festlegen; die Ladung wird in negativen Watt angegeben).
   - Smart Plug Gen 2: `power_switch`.
   - Smart Meter Gen 2: Nur-Lese-Funktion.

Ohne **Modbus-only**Die Cloud-Anmeldung wird weiterhin für ältere Geräte und MQTT verwendet. Solarbank 3 ist **nicht** in den offiziellen Modbus-Maps von Anker. Wenn ein anderer Modbus-Client das Gerät gerade abgefragt hat, kann die erste Abfrage möglicherweise **Verbindung abgelehnt** bis die Abklingzeit des Clients abgelaufen ist; dann erfolgt der nächste Abfrageversuch.

### Docker (`buanet/iobroker`)

Das offizielle Bildschiff **Python 3.11**. Aus **0.10.87** Der Adapter akzeptiert das als **bestmögliche Anstrengung** auf Debian 12 Bookworm Containern — kein benutzerdefiniertes Image erforderlich. **3.12+** Wird weiterhin empfohlen (Upstream) und ist auf Bare-Metal-Systemen und Nicht-Bookworm-Hosts weiterhin erforderlich. Anleitung: **[docs/docker-buanet.md](docs/docker-buanet.md)** (optionale 3.12 Dateien unter [`docs/docker/`](docs/docker/), PDF: [docs/Anker-Solix-buanet-Docker-Anleitung.pdf](docs/Anker-Solix-buanet-Docker-Anleitung.pdf)).

---

## Konfiguration

1. Instanz erstellen: `iobroker add anker-solix`
2. **Konto:** Anker-E-Mail-Adresse, Passwort, Ländervorwahl (z. B. `DE`) — **Nach Eingabe des Passworts speichern**
3. **Konto:** Inoffizielle API-Nutzung akzeptieren (Kontrollkästchen unten im Tab)
4. **Optionen:** Umfrageintervall 60–180 s, **MQTT** falls erforderlich, `deviceDetailMultiplier` (HA-Standardwert: 10)
5. **Geräte:** **Lastgeräte**, optionaler Standort-ID-/Geräte-SN-Filter
6. **Objekte** (v0.9.0+): Optionale Gruppen aktivieren; nur **Kern** Standardmäßig aktiviert → **Neustartadapter** nach den Änderungen

Tun **nicht** verwenden **Anker-Anmeldecache leeren** Es sei denn, Sie benötigen eine absichtliche Neuanmeldung (falsches Konto, beschädigte Datei). Das Löschen erzwingt eine neue Cloud-Anmeldung und löst häufig ein Captcha auf den Servern aus – siehe [Fehlerbehebung](#troubleshooting-login--poll).

---

## Anker-Konto & Anmelde-Cache

Nach dem **erster erfolgreicher API-Login**Der Adapter speichert Tokens in:

`iobroker-data/anker-solix.0/authcache/<your-email>.json`

(Der Dateiname muss mit der E-Mail-Adresse übereinstimmen.) **Konto** genau.)

Seit der Anker-App **3.10** (Mitte 2025) kann oft ein Konto verwendet werden auf **mehrere Clients parallel** (App + ioBroker + HA). Ältere Dokumente, die sich auf „nur ein Token“ beziehen, sind heute weniger kritisch, aber ein **Wiederanmeldung fehlgeschlagen** ioBroker kann die Datei weiterhin nicht aktualisieren, wenn Anker ein Captcha zurückgibt.

**Gemeinsame / Mitgliedskonten:** Ein gemeinsam genutztes Familienmitgliedkonto sieht möglicherweise weniger API-Details als das Konto des Kontoinhabers (dasselbe gilt für HA).

Weitere Kontonotizen: [HA INFO.md – Konten](https://github.com/thomluther/ha-anker-solix/blob/main/INFO.md).

---

## Einschränkungen

- **Inoffizielle API** — keine Dokumentation; Endpunkte können sich jederzeit ändern.
- **EU vs. COM-Cloud** - falsch **Land** in config → Login funktioniert, aber **keine Systeme/Geräte**Wechseln Sie nach dem Koppeln der Geräte nicht das Land.
- **Veraltete Cloud-Daten** Wenn die WLAN-Verbindung des Geräts offline ist, werden die Cloud-/MQTT-Verbindungsindikatoren verwendet, sofern diese aktiviert sind.
- **MQTT** Aktualisierungen hängen vom Veröffentlichungszyklus des Geräts ab; einige Werte nur mit **Echtzeit-Trigger** (hohes Verkehrsaufkommen bei 24/7-Betrieb).
- **Standalone-Geräte** (PPS, Ladegerät, Kühler nicht in einem Stromversorgungssystem) haben **wenig oder keine API-Energiedaten** — MQTT kann erforderlich sein ([HA-Beschränkungen](https://github.com/thomluther/ha-anker-solix#limitations)).
- **Dynamischer Tarif** über Nordpool hinaus: Prognose-/Preisdaten können fehlerhaft oder nur lesbar sein.
- **Captcha (100032)** bei direkter API-Anmeldung von VPS/VPN/Rechenzentrum – siehe [Fehlerbehebung](#troubleshooting-login--poll). Kopie `authcache` von HA oder einer anderen funktionierenden Konfiguration, falls ioBroker sich nicht anmelden kann.

Um das Hinzufügen von Geräten zu vereinfachen: Anonymisierte Daten über HA exportieren. [Exportsysteme](https://github.com/thomluther/ha-anker-solix/blob/main/INFO.md#export-systems-action) oder [anker-solix-api export\_system.py](https://github.com/thomluther/anker-solix-api#export_systempy).

---

## Unterstützte Geräte

Hersteller: [Anker SOLIX](https://www.anker.com/anker-solix) ([Support / Downloads](https://support.ankersolix.com/)Die Wolkenbedeckung entspricht [ha-anker-solix](https://github.com/thomluther/ha-anker-solix#supported-sensors-and-devices) (via solixapi). In ioBroker werden die Daten unter Status-IDs nach Gerätetyp angezeigt (`solarbank`, `smartmeter`, `combiner_box`, `system`, `modbus`, …).

| Gerätetyp                       | Beispiele                                                                                    | Cloud / MQTT            | Lokaler Modbus                      |
| ------------------------------- | -------------------------------------------------------------------------------------------- | ----------------------- | ----------------------------------- |
| **System / Standort**           | Stromversorgungssystem von der Anker-App (= API-„Website“)                                   | Ja                      | —                                   |
| **Solarbank**                   | E1600 (Gen1), SB2 Pro/Plus/AC, SB3 E2700, **SB4 E5000 Pro**, **Solarbank Max / Max AC** (XE) | API + MQTT              | **SB4, Max, Max AC** (Port 502)     |
| **Kombinationsbox**             | Power Dock (Multisystem) – zusammengeführte Bedienelemente, sofern zutreffend                | Ja                      | —                                   |
| **Smartmeter**                  | Anker 3-Phasen-Zähler, US-Zähler, Shelly 3EM / 3EM Pro, **Smart Meter Gen 2** (AE1X0)        | Ja                      | **Generation 2** (schreibgeschützt) |
| **Wechselrichter**              | MI80 Standalone (virtuelle Website in der API)                                               | Ja                      | —                                   |
| **smartplug**                   | Intelligente Steckdose 2500 W **Smart Plug Gen 2**                                           | Ja                      | **Generation 2** (`power_switch`)   |
| **Seiten** / **Solarbank\_pps** | Tragbare Stromstationen                                                                      | hauptsächlich MQTT      | —                                   |
| **ev\_charger**                 | V1 Smart EV Ladegerät                                                                        | hauptsächlich MQTT      | **Modbus TCP** (lokal)              |
| **Fahrzeug**                    | Virtuelle Elektrofahrzeuge für Ladekonten                                                    | leseorientiert          | —                                   |
| **Stromverteiler** / **er**     | US-Stromverteiler, X1 HES                                                                    | eingeschränkte API      | **X1 Modbus TCP** (lokal)           |
| **Ladegerät**                   | Prime-/Ladestationen                                                                         | MQTT                    | —                                   |
| **home\_backup**                | E10, AX170                                                                                   | sehr eingeschränkte API | —                                   |

**Solarbank 3** Dieser Adapter verfügt über Cloud/MQTT, ist aber **nicht** in den offiziellen Modbus-Registerkarten von Anker.

Gerätehierarchie (wie HA Entitäten strukturiert): [Diskussion Nr. 239](https://github.com/thomluther/ha-anker-solix/discussions/239)Lokale Modbus-Konfiguration: [Lokaler Modbus (optional)](#local-modbus-optional).

---

## Staatsstruktur und Entitätsgruppen

Typische Pfade (Instanz `anker-solix.0`):

- `anker-solix.0.solarbank.<deviceId>.sensors.*` — Leistung, Ladezustand usw.
- `anker-solix.0.solarbank.<deviceId>.control.*` — beschreibbare Steuerelemente, sofern unterstützt
- `anker-solix.0.<device>.<id>.statistics.*` — täglicher kWh (aktivieren **Objekte** → Energiestatistik)
- `…statistics.week.*` / `statistics.month.*` / `statistics.year.*` — Kalenderwochen-, Monats- und Jahressummen in kWh (getrennte Entitätsgruppen; Abfrage bei Detailaktualisierung, nicht in jedem Zyklus)
- **Kombinierer-Website:** Statistiken nur unter `combiner_box.<id>.statistics.*` (nicht dupliziert auf `system.*` oder jedes `solarbank.*`). **Ohne Kombinator:** pro `solarbank.*` (Und `smartmeter.*` (für Grid-Metriken). API-Abfragen bleiben **einmal pro Standort**.
- `anker-solix.0.smartmeter.<deviceId>.sensors.*`
- `anker-solix.0.services.*` — Exportieren, Planen, Aktualisieren (Schaltflächenzustände)
- `anker-solix.0.info.connection`, `anker-solix.0.info.pythonReady`

**Entitätsgruppen** (Admin → **Objekte**): Zuordnung zu HA-Funktionssätzen – Stromflüsse, Diagnose, PPS, EV-Ladegerät, HES, Standortpreis, Kontoinformationen usw. Deaktivierte Gruppen werden von API-Abfragen ausgeschlossen, um die Last zu reduzieren.

---

## MQTT-verwaltete Geräte

Aktivieren **MQTT** In **Optionen** wenn Sie Live-Daten oder Steuerelemente benötigen, die die Cloud-API nicht bereitstellt (viele PPS/EV/Ladegerätefunktionen).

- Zusätzliche Sensoren/Steuerungen stammen aus MQTT-Maps in solixapi (Community-decodiert pro Modell).
- **Echtzeit-Trigger** Und **Statusanfrage** sich wie HA-Tasten verhalten – ihre Automatisierung rund um die Uhr erhöht den Datenverkehr und hält die Geräte aktiv ([HA MQTT-Bereich](https://github.com/thomluther/ha-anker-solix#mqtt-managed-devices)).
- **Hybridsteuerung** (Station SOC Reserve, AC Limits, Grid Export on Multisystem) benötigt MQTT + API wie HA.
- Geräte in **MQTT-Lokalmodus** (z. B. E10 hinter Power Dock) werden über das Hub-Gerät weitergeleitet – siehe [HA-INFO – Lokaler MQTT-Modus](https://github.com/thomluther/ha-anker-solix/blob/main/INFO.md#devices-in-mqtt-local-mode).

Neue Modelle entschlüsseln: [MQTT-Richtlinien](https://github.com/thomluther/anker-solix-api/discussions/222), Werkzeug `mqtt_monitor.py` In [anker-solix-api](https://github.com/thomluther/anker-solix-api).

---

## Besondere Hinweise zu Geräten

Zusammengefasst aus dem [HA-Integrations-README](https://github.com/thomluther/ha-anker-solix)Das Verhalten von Cloud/MQTT ist über die SolixAPI identisch. Lokale Modbus-Hinweise sind adapterspezifisch.

### Solarbank 4 E5000 Pro / Solarbank Max / Max AC

Cloud: gleicher Abfragepfad wie bei anderen Solarbanken (API + optionales MQTT). **Tägliche kWh** (`statistics.daily_*`) wird abgerufen am **Detaillierte Umfragen** (jeder `deviceDetailMultiplier` Zyklen (Standardwert \~10), nicht jede Minute – überprüfen Sie das Protokoll. `Daily kWh statistics updated`. **Mit Power Dock/Combiner:** Die Werte liegen nur unter `combiner_box.<SN>.statistics.*`, nicht unter jedem `solarbank.*`Starten Sie den Adapter nach der Aktivierung neu. **Objekte → Tagesstatistiken**Die Wochen-/Monats-/Jahressummen werden nach dem Abendprogramm berechnet (23:00 / 23:15 / 23:30 Uhr Europa/Berlin).

**Lokales Modbus TCP** (Offizielle Karten): Modbus in der Anker-App aktivieren (System / Drittanbietersteuerung), dann Admin → **Modbus (lokal)**&#x54;ypische Modellcodes umfassen AE103 (SB4). Bundesstaaten: `anker-solix.0.modbus.<name>.sensors.*` Und `.control.*` (Betriebsmodus, SOC-Grenzwerte, Batteriesollwert in **Kontrolle durch Dritte**). **Modbus-only** Cloud/Python wird übersprungen; die Instanz-LED leuchtet grün, wenn mindestens ein Modbus-Gerät angeschlossen ist.

Wenn ein anderer Modbus-Client das Gerät gerade abgefragt hat, kann die erste Abfrage möglicherweise **Verbindung abgelehnt** bis die Abklingzeit des Clients abgelaufen ist – das nächste Abfrageintervall versucht es erneut.

### Intelligenter Zähler Gen 2 / Intelligente Steckdose Gen 2

Cloud-Entitäten wie bei anderen Zählern/Steckdosen. **Lokaler Modbus:** Der Zähler der 2. Generation ist **Nur lesbar** (Leistung/Spannung/Stromstärke pro Phase). Smart Plug Gen 2 zeigt `power_switch`Jedes Gerät benötigt eine eigene IP-Adresse (Port 502).

### Standalone-Wechselrichter (MI80)

Keine vollständige App-basierte „Stromversorgung“, aber die Cloud erfasst Erträge. Die API erstellt eine **virtueller Standort**Der Wi-Fi-Status des Wechselrichters in der API ist oft falsch; der Cloud-Verbindungsstatus ist zuverlässiger. **Nicht** Invertergrenzen dauerhaft ändern (Hardware-Schreibzyklen).

### Solarbank 1 (E1600)

Cloud-Updates \~alle **60er Jahre** während der Produktion/Entladung; im Standby-Modus etwa stündlich. **Zeitplanfehler:** Ein einzelner ganztägiger API-Slot kann den Export auf festlegen **0 W** — Verwenden Sie mindestens zwei Slots in der App, wenn Sie eine Ausgabevoreinstellung nutzen. Die tägliche Entladestatistik seit Mitte 2024 beinhaltet umgangene PV-Anlagen (in der App ebenfalls fehlerhaft). MQTT-Überwachung/-Steuerung ab HA v3.4+/3.5+.

### Solarbank 2 + intelligente Zähler

Wolkenintervall oft **ca. 5 Minuten**; Kontrolländerungen können bis zu **ca. 6 Minuten** In Sensoren erscheinen. Gemeinsam genutzte Konten hatten in der Vergangenheit nicht verfügbare Entitäten (Anker-seitige Korrektur). Einige **Ausgangsbegrenzung** API-Pfade weiterhin unbekannt.

### Solarbank 2 AC

Zeitbasierte Tarife werden, sofern unterstützt, über Steuerungselemente bereitgestellt; Cloud-Updates können nach intensiver App-Nutzung ins Stocken geraten ([HA #211](https://github.com/thomluther/ha-anker-solix/issues/211)).

### Kombiniertes SB2 + kaskadiertes SB1

Die Gesamtzahlen/Statistiken in der Anker-Cloud spiegeln Folgendes wider: **nur SB2**SB1 ist teilweise eine „Blackbox“. Ein minimaler Zeitplan wird für SB1 erzwungen, wenn SB2 manuell gesteuert wird – einige ioBroker/HA-Steuerelemente zeigen dies an. **nicht verfügbar** absichtlich. Für die korrekte Lade-/Entladeenergie addieren Sie **pro Gerät** Batterieleistung, nicht nur Systemnetzleistung ([HA-Details](https://github.com/thomluther/ha-anker-solix#combined-solarbank-2-systems-containing-cascaded-solarbank-1-devices)).

### Solarbank 3

Intelligenter Modus, dynamische Preisgestaltung, Zeitfenstermodi – oft **Nur umschalten** via API (vorher in der App konfigurieren). Dynamische Preise inkl. MwSt./Gebühren. **Nur Cache** Anpassungsmöglichkeiten. Nordpool-Vorhersagen sind die zuverlässigsten.

### Multisystem mit Power Dock

Bis zu 4 SB3-Einheiten; gemeinsame Stationseinstellungen (Nutzungsmodus, SOC-Reserve, Netzexport). Steuerung konsolidiert auf **Kombinierer / Stromanschluss** in der Integrationslogik. Cloud-Daten können in frühen Bereitstellungsphasen verzögert auftreten. Multisystem **AC-Ausgangsbegrenzung** Kann möglicherweise nicht über die API geändert werden.

### Stationssteuerung

SOC-Reserve, PV/AC-Grenzwerte, Netzexport oft erforderlich **API + MQTT** (Hybrid). PV-/EV-fähige Schalter von Drittanbietern erfordern in der Regel eine einmalige App-Einrichtung und sind nicht für die Automatisierung geeignet.

### PPS / Solarbank PPS (F3000 + US-Zähler)

Hausautomatisierungssystem mit Notstromversorgung in den USA; Steuerung hauptsächlich über MQTT.

### EV-Ladegerät (V1)

Die meisten Metriken/Steuerungen erfolgen über MQTT; Mitgliedskonten werden unterstützt. Betriebsmodi entsprechen einer HA-ähnlichen Zustandsmaschine – in ioBroker sollten Sie die verfügbaren Steuerungsoptionen vor der Skriptausführung prüfen. Sitzungsverlaufsstatistiken sind nicht implementiert (verwenden Sie den Zustandsverlauf).

### Fahrzeuge

Virtuelle Geräte pro Konto EV; keine Erstellung über Adapter — erkannt beim Aktualisieren.

### Stromverteiler und HES (X1)

Begrenzte API-Funktionalität; Umgehungslösungen **\~5-Minuten-Durchschnittswerte** aus Energiestatistiken (**\~80 MB/Tag** (zusätzlicher Datenverkehr pro System, falls aktiviert). Deaktiviere ressourcenintensive Kategorien in **Objekte** falls erforderlich.

**Lokaler Modbus (X1):** Modbus TCP aktivieren in der **Anker Solix Professional** App, dann Admin → **Modbus (lokal)** → Profil **SOLIX X1 HES** (oder automatische Erkennung). Staaten unter `modbus.<name>.sensors.*` und Bedienelemente für Betriebsmodus/Batterie-Sollwert (VPP/Drittanbietermodus). Der X1 akzeptiert **nur ein Modbus TCP-Client** jeweils einmal.

### V1 Smart EV Charger (lokaler Modbus)

Cloud-/MQTT-Entitäten bleiben bei Verwendung des Anker-Kontos verfügbar. **nur lokal** Steuerung, Modbus TCP aktivieren unter **Integrationen** in der Anker-App ein Profil hinzufügen **V1 Smart EV Ladegerät**Bedienelemente: Start/Stopp des Ladevorgangs, Maximalstrom (6–32 A). Bis zu **zwei** Das Ladegerät unterstützt gleichzeitige Modbus-Clients.

### Heim-Backup (E10, AX170)

Fast **NEIN** Cloud-API für Systemenergie; E10 oft **MQTT-Lokalmodus** via Dock.

### Andere / eigenständige Geräte

Nur in einem **Stromversorgungssystem** Für die vollständige API; andernfalls ist MQTT + Community-Dekodierung erforderlich.

---

## Fehlerbehebung bei Anmeldung/Abfrage

### NEIN `authcache/<email>.json`

Die Datei wird erst nach einem **erfolgreich** API-Anmeldung. Falls bei jeder Anmeldung ein Captcha zurückgegeben wird, kopieren Sie eine funktionierende Datei von [ha-anker-solix](https://github.com/thomluther/ha-anker-solix) (`custom_components/anker_solix/solixapi/authcache/`) hinein `iobroker-data/anker-solix.0/authcache/`, gleicher Dateiname wie in **Konto**.

### `(100032) Captcha id empty`

Anker blockiert einige **Server/VPN** API-Logins. Die Bibliothek kann das Captcha nicht lösen.

1. App-Anmeldung im selben LAN bestätigen; korrekt **Land**; kein VPN auf dem ioBroker-Host.
2. **Nicht** Leeren Sie den Anmeldecache, um das Captcha zu „reparieren“.
3. Kopie `authcache` von HA oder erneut anmelden, sobald die Cloud dies zulässt.
4. Warten Sie nach mehreren erfolglosen Versuchen 15–30 Minuten.
5. Adapter verwenden **≥ 0.9.3** Ein gültiger Cache wird beim Neustart also nicht verworfen.

Das Protokoll zeigt den genauen Cache-Pfad von **0.9.4+**.

### Ratenbegrenzungen (26161 / 429)

Abfrageintervall erhöhen; Aktivierungsintervalle reduzieren **Objekte** Gruppen; Adapter wiederholt Versuche und kann kurzzeitig auf die Einmalbrücke zurückgreifen.

---

## Dienstleistungen

Staaten unter `anker-solix.0.services.*` (eingestellt auf `true` (auslösend):

- `get_schedule`, `clear_schedule`, `export_systems`, `get_system_info`, `refresh_devices`

Verwendung `selectedDeviceId` / `selectedSiteId` Aus der Konfiguration. Siehe Admin. **Objekte** Registerkarte (Dienstehinweis).

---

## Quellenangaben und weiterführende Literatur

| Ressource                                                                                             | Inhalt                                                                      |
| ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [thomluther/ha-anker-solix](https://github.com/thomluther/ha-anker-solix)                             | Vollständige README-Datei **INFO.md** (Konfiguration, MQTT, Export, Tarife) |
| [thomluther/anker-solix-api](https://github.com/thomluther/anker-solix-api)                           | Python-API, Export, mqtt\_monitor                                           |
| [HA-Diskussionen](https://github.com/thomluther/ha-anker-solix/discussions)                           | Energie-Dashboard, Exportneutralität, Effizienz                             |
| [SolixBLE](https://github.com/flip-dots/SolixBLE)                                                     | Lokales BLE (nicht Cloud)                                                   |
| [ha-anker-solix-official](https://github.com/anker-charging/ha-anker-solix-official)                  | Offizielles Modbus (lokale Geräte)                                          |
| [ioBroker.pvforecast](https://www.iobroker.net/#en/adapters/adapterref/iobroker.pvforecast/README.md) | PV-Prognose (optionale Eingabe zur Vermeidung von Abregelung)               |

Deutsche Anleitungen/Videos, die von der [HA README](https://github.com/thomluther/ha-anker-solix#additional-resources) Die Anwendung erfolgt konzeptionell auf Daten und Grenzwerte; die Verdrahtung erfolgt über ioBroker-Zustände anstelle von HA-Entitäten.

---

## Vermeidung von Einschränkungen (optional)

Tab **Abregelungsvermeidung** / **Vermeidung von Einschränkungen**: erfordert die [ioBroker.pvforecast](https://www.iobroker.net/#en/adapters/adapterref/iobroker.pvforecast/README.md) Adapter. (Zuvor basierend auf [ioBroker.solarprognose](https://www.iobroker.net/#en/adapters/adapterref/iobroker.solarprognose/README.md) / solarprognose.de — gewechselt, weil **solarprognose.de wird abgeschaltet** und diese Datenquelle nicht mehr nutzbar ist.) Setzen Sie die **Pflanzenpfad** (z.B `pvforecast.0.plants.pv`); Leistungswerte werden gelesen von `{path}.power.hoursToday.*`. **Prognoseauflösung** (60 / 30 / 15 Minuten, Standard) **60**) muss mit dem in pvforecast konfigurierten Intervall übereinstimmen. **Nur Steuerelemente:** **Handbuch** Modus + **`ac_output_limit`** (AC-Ausgang / -Export). **Tut nicht** Stationsbasiseinstellungen ändern (Grid-Exportkapazität, `allow_grid_export`, Voreinstellung für die Haushaltslast, AC-Ladebegrenzung). **Vor:** `ac_output_limit` = Live-PV. **Aktiv:** `missing_charge_wh`, `max_charge_w` = `missing_charge_wh` ÷ `remaining_hours`, `export_w` = `live_pv_w` − `max_charge_w`, `ac_output_limit` = `export_w`. **Nach:** Ausgewählten Modus wiederherstellen. Zustände: `curtailment.live_pv_w`, `missing_charge_wh`, `max_charge_w`, `export_w`, `remaining_hours`.

**Admin:** Kontrollkästchen _Kombinierbox vorhanden_ — ohne Kombinator: Geräte-ID + Solarbanktyp + Batteriekapazität (Wh); mit Kombinator: Kombinator-ID + bis zu **4** Solarbank-Steckplätze (jeder Steckplatz kann sein _keiner_). **Kombinierer:** Gesamt-AC-Grenzwert = **Summe** der Grenzwerte pro Einheit (SB2 **1000** W, SB3 Pro **1200** W, SB4 Pro **2500** W). **Eigenständig:** stets **800** W.

---

## VIS / VIS-2 Dashboard (Energy Home)

Widget-Set **Anker-Solix** im VIS/VIS-2-Editor:

| Widget                               | Zweck                                                                                                              |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| **Energie-Haus**                     | Fotorealistischer Haushintergrund, Live-PV / Haus / Netz / Batterie / Elektrofahrzeug (manuelle Zustandsbindungen) |
| **HTML-Dashboard**                   | Beliebig `dashboard.sites.*.html` Zustand (leben, Energie, Einstellungen, …)                                       |
| **Website-Dashboard (Tablet)**       | Gleiches Design wie das HTML-Dashboard, Größe: ca. 900 × 700 Pixel                                                 |
| **Übersicht über mehrere Standorte** | Binden an `anker-solix.0.dashboard.overview.html`                                                                  |

**Wichtig:** Widgets werden mitgeliefert **GitHub-Hauptseite / 0.10.100+** Nur npm **0.10.90** tut **nicht** Schließen Sie sie mit ein.

Aus **0.10.104** die Adapterkopien `widgets/` Beim Start wird die Datei in den VIS/VIS-2-Dateispeicher geschrieben und ein VIS-2-Neubau ausgelöst. Nach der Installation oder Aktualisierung:

1. Starten Sie das Gerät neu. **Anker-Solix** Instanz (oder warten Sie auf die automatische Synchronisierungsprotokollzeile).
2. Laden Sie den VIS/VIS-2-Editor neu (**F5**).
3. Im Widget-Picker öffnen Sie das Set **Anker-Solix**.

Falls die Widgets immer noch fehlen, führen Sie den Befehl auf dem ioBroker-Host aus:

```bash
iobroker upload vis widgets
iobroker upload vis-2 widgets
iobroker restart vis
iobroker restart vis-2
```

Laden Sie den Editor anschließend erneut. **Energie-Haus**, Zustände in den Widget-Einstellungen zuweisen: **Zustandsbindungen**, **Netzflüsse**, **Batterie**.

Optionaler VIS-2-Ansichtsimport: `widgets/anker-solix/views/energy-home.vis2.json`.

Aktivieren **Leistungsflüsse** Und **Energiestatistik** im Adapter **Objekte** für Fußwerte (Eigenverbrauch, heute PV).

---

## HTML-Dashboards (Solix4-Stil)

Inspiriert von **[ioBroker.solix4](https://github.com/michihorn64/ioBroker.solix4)** von **Michael Horn ([@michihorn64](https://github.com/michihorn64))** — Vielen Dank für das ursprüngliche Dashboard-Konzept! Details: [CREDITS.md](CREDITS.md).

Nach jeder erfolgreichen Abfrage schreibt der Adapter **eigenständiges HTML** (Dunkelmodus, Live-Energiefluss, Einstellungen, täglicher kWh-Verbrauch, Diagnose, Geräteliste) zu Zeichenkettenzuständen mit Rolle `html`:

| Zustand                                             | Inhalt                                             |
| --------------------------------------------------- | -------------------------------------------------- |
| `anker-solix.0.dashboard.sites.<siteKey>.live.html` | Live-Stromfluss (Solar → Haus ↔ Netz, Batterie)    |
| `…dashboard.html`                                   | Live- und Einstellungen kombiniert (Tablet-Layout) |
| `…energy.html`                                      | Tägliche kWh-Ziegel + Autarkie / Selbstverbrauch   |
| `…settings.html`                                    | Grenzwerte & Modi (schreibgeschützt)               |
| `…diagnosis.html`                                   | Warnungen, MQTT, Gerätezustand                     |
| `…devices.html`                                     | Geräteinventar                                     |
| `anker-solix.0.dashboard.overview.html`             | Vergleich mehrerer Standorte                       |

`<siteKey>` sind die ersten 8 Zeichen der Anker-Site-ID (gleiches Prinzip wie bei solix4).

**VIS / VIS-2:** Widget hinzufügen **HTML-Dashboard** (Satz **Anker-Solix**und binden Sie es z.B. `anker-solix.0.dashboard.sites.<siteKey>.dashboard.html`oder verwenden Sie das generische VIS. **HTML** Widget. An Tablet-Größe anpassen (ca. 900 × 700 px). Der HTML-Code wird bei jeder Adapterabfrage aktualisiert.

Aktivieren **Objekte → Tagesstatistiken** für kWh-Kacheln; aktivieren **Leistungsflüsse** für aktuelle Leistungswerte.

---

## Veröffentlichung (npm- und ioBroker-Katalog)

**npm:** Veröffentlichung via Git-Tag (`v*`) und CI-Bereitstellung nach [Adapterprüfung](https://adaptercheck.iobroker.in/) ist grün. Veröffentlichungsnutzung **npm trusted publishing** (OIDC von GitHub Actions – kein langlebiges npm-Token). Klassische Automatisierungstoken werden von npm nicht mehr unterstützt. **Januar 2027**Dieser Adapter ist bereits auf Trusted Publishing registriert. Registrieren Sie sich in [ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories) Sobald das Paket auf npm verfügbar ist.

**Vor jeder Veröffentlichung** (durchgesetzt durch `npm run test:package` → `test/io-package-policy.js`; lokal ausführen über `npm run verify:ci` vor jedem Schubsen):

1. Stoßen `version` In `package.json` Und `io-package.json` (muss übereinstimmen).
2. Füge ein `### x.y.z` Abschnitt zu diesem README-Änderungsprotokoll (E6006).
3. Hinzufügen **eins** neu `common.news` Eintrag für diese Version; beibehalten **höchstens 7** News-Schlüssel – nur Versionen, die bereits auf npm verfügbar sind (außer der Version, die Sie veröffentlichen möchten). Entfernten Text verschieben nach [CHANGELOG\_OLD.md](CHANGELOG_OLD.md).
4. Administrator `jsonConfig.json`: Kopfzeile `size` muss sein **≤ 5** (verwenden `5` (für die kleinste Überschrift).
5. Füge keine Root-Dateien zu npm hinzu. `files` es sei denn, dies ist erforderlich (`CHANGELOG_OLD.md` bleibt außerhalb des Pakets).
6. `package.json` `os` muss mit der OS-Matrix übereinstimmen `test-and-release.yml` (E3027). Administrator behalten `i18n/*.json` im Einklang mit `en.json` (W5604/W5605).

---

## Changelog

### 0.10.104

- **VIS / VIS-2:** widget set **anker-solix** is copied to VIS file storage on adapter start; VIS-2 catalog rebuild triggered automatically
- **VIS widgets:** **HTML Dashboard**, **Site Dashboard (tablet)**, **Multi-site Overview** (bind `dashboard.*.html` states) plus existing **Energy Home**

### 0.10.103

- **HTML dashboards** (solix4-style): live flow, settings, daily kWh, diagnosis, devices, overview under `dashboard.sites.*.html` — inspired by [ioBroker.solix4](https://github.com/michihorn64/ioBroker.solix4) (Michael Horn / michihorn64); see [CREDITS.md](CREDITS.md)

### 0.10.102

- **Fix:** daily kWh statistics for SB4 / Power Dock — info/warn logs when cloud fetch runs or returns empty; recover poll state that could skip daily energy forever; fallback to `solarbank.*.statistics.*` when combiner site has no `combiner_box` object yet
- **Admin:** hint under energy statistics (daily vs week/month/year schedule, combiner path)

### 0.10.101

- **Modbus (local):** profiles for **Anker SOLIX X1 HES** and **V1 Smart EV Charger** (official protocol register maps; X1 little-endian 32-bit and string decode; existing Solarbank/Gen2 profiles unchanged)

### 0.10.100

- **VIS Energy Home:** duplicate grid-to-home flow line fixed — remove legacy `grid` SVG paths, show only import or export line at a time (GitHub-only)

### 0.10.99

- **VIS Energy Home:** VIS-1 duplicate grid/battery cards fixed — widget destroy/cleanup on re-render, legacy card removal, cache-busted CSS/JS (GitHub-only)

### 0.10.98

- **VIS Energy Home:** single always-visible grid and battery power cards; label and value switch between import/export and charge/discharge while flow lines show direction (GitHub-only)

### 0.10.97

- **VIS Energy Home:** grid and battery power cards share one slot each and toggle by active flow — Grid → Home vs PV → Grid, Entladen vs Laden (GitHub-only)

### 0.10.96

- **VIS Energy Home:** energy flow lines realigned to the Home hub (PV, grid import/export, battery charge/discharge, EV); SVG coordinates now match card positions (GitHub-only)

### 0.10.95

- **VIS Energy Home:** separate cards for Grid → Home, PV → Grid, SOC, charge, and discharge; dedicated flow lines per direction; widget settings grouped into Grid flows and Battery (GitHub-only)

### 0.10.94

- **VIS Energy Home:** removed auto-discovery and card hiding; all states (PV, home, grid import/export, SOC, battery charge/discharge, EV, footer) are assigned manually in widget settings (GitHub-only)

### 0.10.93

- **VIS Energy Home:** grid uses `grid_to_home_power` (import) vs `photovoltaic_to_grid_power` (export); battery uses `bat_charge_power` vs `bat_discharge_power`; energy line animation direction matches flow (GitHub-only)

### 0.10.92

- **VIS / VIS-2 Energy Home:** clean house background (no baked-in UI); slim animated SVG energy lines and cards as overlays; broader auto-discovery (system, combiner, smartmeter, solarbank, modbus, ev_charger); all cards always visible; live view subscribes discovered states (GitHub-only until next npm release)

### 0.10.91

- **VIS / VIS-2:** first **Energy Home** widget (auto state discovery, combiner/modbus aware); `restartAdapters` vis + vis-2; requires `iobroker upload anker-solix` after install (GitHub-only until next npm release)

### 0.10.90

- **Modbus only:** skip Anker cloud/Python when the checkbox is enabled; no credentials or usage terms required; instance LED is green when at least one local Modbus device is connected
- **Docs:** README supported devices + special notes for SB4 / Max / Modbus Gen 2; valid state roles for usage-mode and EV-charger lists; Modbus admin i18n

### 0.10.89

- **Admin:** fix GUI error when opening **Modbus (local)** (`hidden` must use `data.enableModbus`; table `items` as array with `attr`)
- **Docker:** buanet guide uses stock Python **3.11** as default (0.10.87 best-effort); 3.12 image/userscript optional

### 0.10.88

- **Modbus (optional):** local TCP poll and control for official devices (Solarbank 4 / Max AC / Max, Smart Meter Gen 2, Smart Plug Gen 2); cloud Python bridge unchanged
- **Docker:** buanet/iobroker Python guide (`docs/docker-buanet.md`)

### 0.10.87

- **Python:** Debian 12 Bookworm Docker containers (e.g. buanet v11) accept system Python **3.11** as best-effort; all other hosts still require **3.12+**

### 0.10.86

- **Solarbank 1 (E1600):** writable `preset_charge_priority` (0–100 %) and `preset_discharge_priority` (switch) via `set_home_load` — not applicable to SB2/SB3

### 0.10.85

- **Admin:** curtailment hint/path labels use new i18n keys so Admin no longer keeps stale solarprognose.de text after the pvforecast switch

### 0.10.84

- **Curtailment:** switch forecast source from solarprognose.de / [ioBroker.solarprognose](https://www.iobroker.net/#en/adapters/adapterref/iobroker.solarprognose/README.md) to [ioBroker.pvforecast](https://www.iobroker.net/#en/adapters/adapterref/iobroker.pvforecast/README.md) because **solarprognose.de is shutting down**. Plant path (`…power.hoursToday`); resolution option 60/30/15 min (default 60). (0.10.82/0.10.83 were not published: CI lint / unpublished news entries.)

### 0.10.83

- **Fix:** CI lint for curtailment/pvforecast (`prettier`, `require-await`, redundant type unions) — not published (see 0.10.84)

### 0.10.82

- **Curtailment:** switch to pvforecast (solarprognose.de shutting down) — not published (CI lint failure; see 0.10.84)

### 0.10.81

- **Repository review (mcm1957):** restore standard `test-and-release` workflow — adapter tests on every push/tag (Linux + Windows matrix), deploy only after all jobs succeed (no `always()` / no skipped-tests workaround); declare **`linux` + `win32`** in `package.json`; README: Windows supported & tested, **macOS not supported**

### 0.10.80

- **Object dump fix:** persist `periodScheduleOffsetSec` via `extendForeignObjectAsync` on `system.adapter.<instance>` (avoids invalid `anker-solix.0.system.adapter.*` object without `type`/`common`, E3004/E3007)

### 0.10.79

- **Repository re-review:** per-instance period energy schedule jitter; sensor-kind state name migration; remove unused `curtailmentModeBefore`; document Linux + **tested Windows** support

### 0.10.78

- **Adapter-check:** use `adapter.setTimeout` instead of plain `setTimeout` (E5005)

### 0.10.77

- **Repository review:** English-only log messages; English default state names and list labels (common.name/common.states)

### 0.10.76

- **Object structure:** list controls use role `state` (`max_total_ac_output`, EV charger mode lists; E1008/E1009)

### 0.10.75

- **Object structure (PR review):** folder → device → channel hierarchy before states (E3009); valid ioBroker roles/types (E1008/E1009/E1011)
- **Dev:** `@alcalzone/release-script` 5.2.1 (E0036)

### 0.10.74

- **TypeScript 6** (W0083); `tsconfig.json` adds mocha types for `tsc --noEmit`
- **CI:** `testing-action-adapter` and `testing-action-deploy` use `@v1` (S3043/S3044); `testing-action-check` stays `@v2.0.0` (no floating `@v2` tag)
- **Tests:** `npm pack` must exclude `CHANGELOG_OLD.md` (S9508)

### 0.10.73

- **README:** removed discouraged GitHub-URL installation section (adapter-check **E6013**)
- **Tests:** `test/io-package-policy.js` guards against GitHub URL install text in README

### 0.10.72

- **Repository checker:** admin i18n synced for all languages (W5604/W5605); `package.json` `os` aligned with Linux CI (E3027)
- **Tests:** `test/i18n-policy.js` and E3027 check in `test/io-package-policy.js`

### 0.10.71

- **Python install:** detects host profile (Linux server, **Home Assistant** ioBroker add-on, **Windows**, container)
- **HA:** venv-first, `get-pip.py` with `--break-system-packages` / `PIP_BREAK_SYSTEM_PACKAGES` for PEP 668
- **Windows:** tries `py -3.13`, `py -3.12`, Program Files paths; parses `--version` (no broken shell `-c` check); adds **`tzdata`** for `Europe/Berlin`
- **Bridge:** uses resolved Python spawn spec (`py -3.12` args) consistently in daemon and one-shot mode
- Deps check: `aiohttp` + `ZoneInfo("Europe/Berlin")` before skipping install

### 0.10.70

- **Repository / CI:** `common.news` capped at 7 npm-published versions; workflow concurrency per ioBroker.example; admin header `size` ≤ 5; automated checks in `test/io-package-policy.js`; `CHANGELOG_OLD.md` excluded from npm package

### 0.10.69

- **Curtailment:** after midnight (Europe/Berlin) phase `inactive` until solarprognose forecast signature changes; then safe `modeAfter` release (no export while waiting)

### 0.10.68

- **Admin:** Python install button at bottom of **Options** tab

### 0.10.67

- **Admin:** removed **Devices** tab and cloud device reload; device filter on **Objects**; **Login cache** tab rightmost

### 0.10.66

- **Admin:** device list and login-cache status via `useNative` responses

### 0.10.65

- **Login cache** tab: backup/restore; auto-backup after first login

### 0.10.64

- **Curtailment admin:** hint text; combiner vs standalone field toggle fix

### 0.10.63

- **Fix** `bat_discharge_power`; admin: terms under **Account**, **Objects** tab, curtailment UI (combiner / solarprognose link)

### 0.10.31

- **Week/month/year statistics:** fetched once per day after **23:00 / 23:15 / 23:30** (Europe/Berlin) on the next detail poll, not every detail refresh

### 0.10.30

- **Week/month statistics:** fetched like Home Assistant (`energy_daily`, `device_sn` empty for site totals); avoids `energy_analysis` 10003 with combiner SN; year still via `energy_analysis`

### 0.10.29

- **Curtailment:** instance setting *Minimum live PV (W)* (`curtailmentMinPvW`, default 50); fix ESLint/Prettier CI failure on 0.10.28

### 0.10.28

- **Curtailment:** manual mode and `ac_output_limit` only when live PV ≥ 50 W — no midnight feed-in from forecast (fixes 4800 W at `livePv=0`)

### 0.10.27

- Period `energy_analysis`: per-call retry on 10003, partial metrics if only some calls fail; uses combiner/solarbank SN; success log only when kWh values exist

### 0.10.26

- **Week/month period stats:** fetched on first detail refresh when only period groups are enabled (not after ~30 min); week interval = every detail refresh (was every 3rd); log line `Period statistics updated (week)`

### 0.10.25

- **Fix:** `curtailment.soc_percent` state object is created on start (was missing since 0.10.16)

### 0.10.24

- **Fix:** `NameError: needs_daily_energy_poll` / missing `PERIOD_YEAR` imports in **0.10.23** (incomplete release)

### 0.10.23

- **Fix:** missing `_update_energy_periods` crashed the bridge daemon (`AttributeError`) → one-shot fallback and extra 429 load
- **Year/month/week only:** skips daily `poll_device_energy` (no “today” entity group); period `energy_analysis` only every Nth detail refresh (year ≈ 8×)
- On 429: no one-shot fallback; period stats back off 30 min; parallel polls skipped

### 0.10.22

- Energy statistics (daily + week/month/year) only on **combiner_box** when a combiner exists; no duplicate states under `system.*` or each `solarbank.*`

### 0.10.21

- **Fix:** `IoBrokerAnkerApiClient` stored no `config` → daemon crashed (`AttributeError`), one-shot bridge fallback, extra API load and **429** rate limits
- Week/month/year `energy_analysis` calls are **rotated** (one period per detail refresh) instead of all three at once

### 0.10.20

- Period energy statistics (week / month / year) use subfolders: `statistics.week.*`, `statistics.month.*`, `statistics.year.*` (instead of flat `week_*` under `statistics.*`)
- Release **0.10.19** tag had no npm deploy (CI lint); install **0.10.20** or newer

### 0.10.18

- Entity groups **Weekly / monthly / yearly energy statistics** (`enableEnergyStatisticsWeek|Month|Year`): kWh totals for current calendar week, month, and year via Anker `energy_analysis` API

### 0.10.17

- **Fix:** Stale `build/` still ran old curtailment code that set **grid export limit** (`grid_export_limit`) to up to **4800 W** on adapter start (App: *Netzeinspeisungs-Leistungsgrenze* → *Anpassen*). Rebuilt `build/` from current TypeScript; tests verify compiled curtailment never touches feed-in controls

### 0.10.16

- Combiner sensor **`total_state_of_charge`**: cloud total or capacity-weighted average of all site solarbanks (poll + ioBroker state)
- Curtailment uses total SOC for `missing_charge_wh`, `max_charge_w`, and `soc_percent`

### 0.10.15

- Curtailment: **`ac_output_limit` via API only** (no MQTT) to avoid station side effects
- Fix SOC handling when combiner had no SOC (`max_charge_w` wrong); ensure `missing_charge_wh` state exists on upgrade

### 0.10.14

- Curtailment: **only** manual mode + **`ac_output_limit`** (no `grid_export_limit`, `allow_grid_export`, home load preset, AC charge limit)
- New state `curtailment.missing_charge_wh`; active phase: export = live PV − calculated max charge

### 0.10.12

- Curtailment combiner: export via **`ac_output_limit`** (`max_load`); home load preset 0 W (superseded by 0.10.14+)

### 0.10.11

- Curtailment: prefer **`system.{siteId}.sensors.total_pv_power`** for live PV

### 0.10.10

- Curtailment combiner: export via `set_output_power` (later replaced); 4800 W cap; more PV sensors for `live_pv_w`

### 0.10.9

- Curtailment active phase: AC output = full PV (intermediate behaviour; refined in 0.10.14+)

### 0.10.8

- Curtailment: **before** = instant export = live PV; **active** = slow battery charge + export surplus

### 0.10.7

- Curtailment: export limit follows live PV; updates when generation sensors change

### 0.10.6

- Curtailment: manual mode, no charge, export limit from hourly forecast (also before curtailment window)

### 0.10.5

- Curtailment: read [ioBroker.solarprognose](https://www.iobroker.net/#en/adapters/adapterref/iobroker.solarprognose/README.md) forecast (kW → W, path `11h.power`)

### 0.10.4

- Curtailment Admin: combiner checkbox, device ID + solarbank type (standalone) or 4 slots with “none” (combiner); no usage-mode change before curtailment window

### 0.10.3

- CI: curtailment unit tests use Mocha/Chai (fixes adapter-check lint)

### 0.10.2

- Curtailment AC limits: standalone 800 W; combiner per unit SB2 1000, SB3 1200, SB4 2500 W

### 0.10.1

- Curtailment: Combiner limit = sum of per-unit profiles (max 4 mixed solarbanks)

### 0.10.0

- Optional **curtailment avoidance** via solarprognose forecast (Admin tab, `curtailment.*` states)

### 0.9.9

- `package.json` keyword `ioBroker`; entity group headers with schema `size` property

### 0.9.8

- Admin UI: all option/entity fields with lg/xl breakpoints; CI release fix

### 0.9.7

- Adapter-check: npm news sync, admin responsive layout, README copyright, npm package excludes Python cache

### 0.9.6

- Adapter-check compliance: Node 22+, admin UI sizes, compact-mode Python install, dependabot

### 0.9.5

- Admin warning before **Clear Anker login cache**; log after clear

### 0.9.4

- Log exact `authcache` path when login cache file is missing

### 0.9.3

- **Fix:** Valid `authcache` no longer treated as failed login after restart (captcha 100032)

### 0.9.2

- Keep `authcache` on re-auth; reload token on 401 before forced login

### 0.9.1

- Captcha error 100032 mapping and README troubleshooting

### 0.9.0

- Configurable **entity groups** (HA-style); API scope follows enabled groups

### 0.8.1

- Fix Python bridge `ApiCategories.device_parm` crash

### 0.8.0

- Daily energy statistics under `statistics.*`

### 0.7.0

- Usage mode `preset_usage_mode`, AC fast charge switch

### 0.6.0

- Persistent bridge daemon, HA-aligned poll, multisystem controls, rate-limit fixes (see [CHANGELOG_OLD.md](CHANGELOG_OLD.md) for 0.6.1–0.6.5)

### 0.5.0

- Python auto-install, device selection, staggered polling, repository rename (see [CHANGELOG_OLD.md](CHANGELOG_OLD.md) for 0.2.0–0.4.2)

Older release notes: [CHANGELOG_OLD.md](CHANGELOG_OLD.md) and git history.

---

## License

Copyright (c) 2026 MatthiasUlrich1 info@my-smart-home-support.de

MIT — see [LICENSE](LICENSE)