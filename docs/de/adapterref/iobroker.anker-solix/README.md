---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.anker-solix/README.md
title: ioBroker.anker-solix
hash: AHcAyfPuwFJaONU3Oaj4bvkYMSuVnLhAmixGluKBJC8=
---
# IoBroker.anker-solix

![NPM-Version](https://img.shields.io/npm/v/iobroker.anker-solix.svg)

ioBroker-Adapter für **Anker Solix**-Stromversorgungssysteme (Solarbank, Smart Meter, PPS, EV-Ladegerät u. v. m.). Er basiert auf der Home Assistant-Integration [thomluther/ha-anker-solix](https://github.com/thomluther/ha-anker-solix) und verwendet dieselbe inoffizielle **solixapi**-Python-Bibliothek.

> **Unterstützte Betriebssysteme** > > | OS | Status |

> |----|--------|

> | **Linux** | Primäres Produktionsziel – **CI-getestet** (Docker, NAS, Raspberry Pi, …)

> | **Windows** | **Unterstützt und getestet** auf ioBroker für Windows (Python 3.12+)


| **macOS** | **Nicht unterstützt** – automatische Python/venv-Installation wurde nicht verifiziert |

> > npm / `package.json` Kataloginstallation: **`linux`** und **`win32`** nur. Details: [Unterstützte Plattformen](#supported-platforms).

Eine kleine **Python-Bridge** (ein persistenter Daemon, ähnlich wie Home Assistant) fragt die Anker-Cloud und optional MQTT ab und stellt die Werte als ioBroker-Zustände bereit. Optionale Entitätsgruppen (seit Version 0.9.0) spiegeln den Umfang von Home Assistant wider: Standardmäßig ist nur **Core** aktiviert, um die API-Last zu begrenzen.

## Inhaltsverzeichnis
1. [Haftungsausschluss & Nutzungsbedingungen](#disclaimer--usage-terms)
2. [Unterstützte Plattformen](#supported-platforms)
3. [So funktioniert dieser Adapter in ioBroker](#how-this-adapter-works-in-iobroker)
4. [Anforderungen & Installation](#requirements--installation)
5. [Konfiguration](#configuration)
6. [Anker-Konto & Anmeldecache](#anker-account--login-cache)
7. [Einschränkungen](#Einschränkungen)
8. [Unterstützte Geräte](#supported-devices)
9. [Zustandsstruktur & Entitätsgruppen](#state-structure--entity-groups)
10. [MQTT](#mqtt-managed-devices)
11. [Besondere Gerätehinweise](#special-device-notes)
12. [Fehlerbehebung bei Anmeldung/Abfrage](#troubleshooting-login--poll)
13. [Dienste](#dienste)
14. [Credits & weiterführende Literatur](#credits--further-reading)
15. [Änderungsprotokoll](#changelog)
16. [Veröffentlichung](#publishing-npm--iobroker-catalog)

---

## Haftungsausschluss und Nutzungsbedingungen
Dieser Adapter steht **in keiner** Verbindung zu Anker. Marken und Produktnamen gehören ihren jeweiligen Inhabern.

Der Adapter verwendet eine **inoffizielle** Python-Bibliothek zur Kommunikation mit der Anker Power **Cloud-API** (dieselbe wie die mobile App). Diese API kann sich jederzeit ändern oder fehlerhaft funktionieren. Falsche Einstellungen können Geräte beeinträchtigen; der Benutzer akzeptiert diese Risiken beim Aktivieren der Instanz (Registerkarte „Konto“). Zukünftige Adapter-Updates können die Überwachungs- und Steuerungsfunktionen erweitern.

---

## Unterstützte Plattformen
| Plattform | Status | Hinweise |
|----------|--------|-------|
| **Linux** (Debian, Ubuntu, Docker, Proxmox, NAS, RPi) | **Primär / CI-getestet** | Empfohlen für den Produktiveinsatz; Python 3.12+ venv (`python3-venv`, `python3-pip`) |
| **macOS** | **Nicht unterstützt** | Theoretisch gleicher Unix-Codepfad wie Linux, aber automatisches Python/venv-Bootstrap wurde **nicht getestet** — keine npm-Katalogunterstützung (`package.json` hat kein `darwin`) |
| **macOS** | **Nicht unterstützt** | Theoretisch gleicher Unix-Codepfad wie Linux, aber automatisches Python/venv-Bootstrap wurde **nicht getestet** — keine npm-Katalogunterstützung (`package.json` enthält kein `darwin`) |

**Linux** bleibt das Hauptziel für ioBroker-Implementierungen. **Windows** wird vollständig im Code unterstützt und manuell verifiziert; GitHub Actions führt Adaptertests auf **`ubuntu-latest`** und **`windows-latest`** durch. **macOS** wird bis zum Test der Python-Installation nicht unterstützt.

---

## So funktioniert dieser Adapter in ioBroker
| Ebene | Rolle |
|-------|------|
| **Node.js-Adapter** | Instanzkonfiguration, Zeitplanung, ioBroker-Zustände, Steuerung der Warteschlange |
| **Python-Bridge** (`python/bridge.py`) | Langlebige Sitzung: API + optionales MQTT (HA-Stil) |
| **Auth-Cache** | `iobroker-data/<instance>/authcache/<email>.json` — wird nach erfolgreicher API-Anmeldung wiederverwendet |
| **Auth-Cache** | `iobroker-data/<instance>/authcache/<email>.json` — wird nach erfolgreicher API-Anmeldung wiederverwendet |

Das Abfrageintervall sollte **60–180 s** betragen (gleiche Empfehlung wie bei HA). Die Standortliste wird in jedem Zyklus aktualisiert; Geräte-/Standortdetails und Energiedaten werden in einem langsameren Intervall abgerufen (`deviceDetailMultiplier`, standardmäßig bei jeder 10. Abfrage).

**Wichtig:** Die Cloud-API ist **obligatorisch**. MQTT allein reicht für vollständige Systemdaten nicht aus. Dieser Adapter ersetzt **keine** lokalen BLE- oder Modbus-Integrationen – siehe [Zusätzliche Ressourcen](#credits--further-reading).

---

## Anforderungen & Installation
- ioBroker **js-controller >= 6**, **admin >= 7.6**
- **Node.js >= 22**
- **Python 3.12+** auf dem ioBroker-Host:
- **Linux:** `python3-venv` + `python3-pip` (Debian/Ubuntu) — primäres Produktionsziel
- **Windows:** Python 3.12+ von python.org oder `py -3.12`; der Adapter-Installer kümmert sich um venv und **`tzdata`**
- **macOS:** **nicht unterstützt** (automatische Python-Installation nicht verifiziert)

Die Python-Abhängigkeiten werden im Adapterordner (`python/.venv` oder `python/site-packages`) installiert. Seit Version 0.2.0: automatisch beim Start (**Optionen** → `autoInstallPython`) oder über die Schaltfläche **Python-Abhängigkeiten installieren**.

Installation über ioBroker (empfohlen):

```bash
iobroker install anker-solix
```

Nachdem die Adapterdateien lokal geändert wurden, laden Sie die Instanz hoch:

```bash
iobroker upload anker-solix
```

**Multihost:** Verwenden Sie `--host "PC(SmartHome)"` in Anführungszeichen, wenn der Name Sonderzeichen enthält.

Entfernen Sie gegebenenfalls vorhandene, veraltete symbolische Verknüpfungen: `rm -f /opt/iobroker/node_modules/iobroker.AnkerSolix`

Manuelle Python-Einrichtung (falls erforderlich):

```bash
cd node_modules/iobroker.anker-solix
python3 -m venv python/.venv && python/.venv/bin/pip install -r python/requirements.txt
```

### Home Assistant (ioBroker-Add-on)
Die offizielle **ioBroker**-App für Home Assistant OS enthält oft `python3`, aber **kein `pip`** und **kein `python3-venv`**. Installieren oder aktualisieren Sie den Adapter über den ioBroker-Katalog/npm (`iobroker install anker-solix`). Ab **Version 0.10.72** erkennt das Installationsprogramm dieses Profil und versucht Folgendes:

1. virtualenv in `python/.venv` (oder `--without-pip` + pip innerhalb von venv)
2. `get-pip.py` mit `--break-system-packages`, wenn das System-Python PEP 668 ist
3. `pip install --target python/site-packages` als Fallback

In der Instanzverwaltung: **Optionen** → **Python-Abhängigkeiten installieren** oder die Instanz mit aktiviertem **autoInstallPython** neu starten.

Falls in den Protokollen weiterhin `No module named pip` angezeigt wird, öffnen Sie das ioBroker/SSH-Terminal auf dem Host und führen Sie folgenden Befehl aus:

```bash
cd /data/iobroker/node_modules/iobroker.anker-solix
node tools/install-python.js
iobroker restart anker-solix.0
```

Kopieren Sie **`authcache/<email>.json`** aus einer funktionierenden Anker-Installation (z. B. ha-anker-solix) nach `iobroker-data/anker-solix.0/authcache/`, um das Captcha beim ersten Login zu vermeiden.

---

## Konfiguration
1. Instanz erstellen: `iobroker add anker-solix`
2. **Konto:** Anker-E-Mail-Adresse, Passwort, Ländervorwahl (z. B. „DE“) — **Nach Eingabe des Passworts speichern**
3. **Konto:** Nutzung der inoffiziellen API akzeptieren (Kontrollkästchen unten im Tab)
4. **Optionen:** Abfrageintervall 60–180 s, **MQTT** falls erforderlich, `deviceDetailMultiplier` (HA-Standard: 10)
5. **Geräte:** **Geräte laden**, optionaler Filter für Standort-ID/Geräte-SN.
6. **Objekte** (v0.9.0+): Optionale Gruppen aktivieren; standardmäßig nur **Core** aktiviert → **Adapter nach Änderungen neu starten**.

Verwenden Sie die Funktion „Anker-Anmeldecache leeren“ **nur**, wenn Sie sich absichtlich neu anmelden müssen (falsches Konto, beschädigte Datei). Das Leeren des Caches erzwingt eine erneute Anmeldung in der Cloud und löst häufig ein Captcha auf den Servern aus – siehe [Fehlerbehebung](#troubleshooting-login--poll).

---

## Anker-Konto- und Anmeldecache
Nach der **ersten erfolgreichen API-Anmeldung** speichert der Adapter die Tokens in:

`iobroker-data/anker-solix.0/authcache/<your-email>.json`

(Der Dateiname muss exakt mit der E-Mail-Adresse im **Konto** übereinstimmen.)

Seit der Anker-App **3.10** (Mitte 2025) kann ein Konto häufig parallel auf **mehreren Clients** verwendet werden (App + ioBroker + HA). Ältere Dokumente, die von „nur einem Token“ sprechen, sind heute weniger relevant, aber ein **fehlgeschlagener erneuter Login** von ioBroker kann die Datei weiterhin nicht aktualisieren, wenn Anker ein Captcha zurückgibt.

**Gemeinsame Konten / Mitgliedskonten:** Ein familiengemeinsames Konto sieht möglicherweise weniger API-Details als das Konto des Eigentümers (dasselbe gilt für HA).

Weitere Kontonotizen: [HA INFO.md – Konten](https://github.com/thomluther/ha-anker-solix/blob/main/INFO.md).

---

## Einschränkungen
- **Inoffizielle API** — keine Dokumentation; Endpunkte können sich jederzeit ändern.
- **EU vs. COM Cloud** – falsches **Land** in der Konfiguration → Anmeldung funktioniert, aber **keine Systeme/Geräte**. Wechseln Sie das Land nicht nach dem Koppeln der Geräte.
- **Veraltete Cloud-Daten**, wenn die WLAN-Verbindung des Geräts offline ist; verwenden Sie die Cloud-/MQTT-Verbindungsindikatoren, wenn diese aktiviert sind.
- **MQTT**-Aktualisierungen hängen vom Veröffentlichungszyklus des Geräts ab; einige Werte nur mit **Echtzeit-Trigger** (hohes Datenaufkommen bei 24/7).
- **Einzelgeräte** (PPS, Ladegerät, Kühler, die nicht in ein Stromnetz eingebunden sind) verfügen **über geringe oder keine API-Energiedaten** – MQTT kann erforderlich sein ([HA-Einschränkungen](https://github.com/thomluther/ha-anker-solix#limitations)).
- **Dynamischer Tarif** außerhalb von Nordpool: Prognose-/Preisdaten können fehlerhaft oder nur lesbar sein.
- **Captcha (100032)** bei direkter API-Anmeldung von VPS/VPN/Rechenzentrum – siehe [Fehlerbehebung](#troubleshooting-login--poll). Kopieren Sie `authcache` aus HA oder einer anderen funktionierenden Umgebung, falls ioBroker sich nicht anmelden kann.

Um das Hinzufügen von Geräten zu erleichtern: Exportieren Sie anonymisierte Daten über HA [export systems](https://github.com/thomluther/ha-anker-solix/blob/main/INFO.md#export-systems-action) oder [anker-solix-api export_system.py](https://github.com/thomluther/anker-solix-api#export_systempy).

---

## Unterstützte Geräte
Gleiche Geräteabdeckung wie [ha-anker-solix](https://github.com/thomluther/ha-anker-solix#supported-sensors-and-devices) (über solixapi). In ioBroker werden die Daten unter Status-IDs nach Gerätetyp angezeigt (`solarbank`, `smartmeter`, `combiner_box`, `system`, …).

| Gerätetyp | Beispiele / Hinweise |
|-------------|------------------|
| **System / Site** | Stromversorgungssystem aus der Anker-App (= API „Site“) |
| **Solarbank** | E1600 (Gen1), SB2 Pro/Plus/AC, SB3 E2700 — API + MQTT |
| **combiner_box** | Power Dock (Multisystem) — Zusammenführung der Steuerelemente in ioBroker, sofern zutreffend |
| **Smartmeter** | Anker 3-Phasen-Zähler, US-Zähler, Shelly 3EM / 3EM Pro |
| **Wechselrichter** | MI80 Standalone (virtueller Standort in der API) |
| **Smartplug** | Smartplug 2500 W |
| **pps** / **solarbank_pps** | Tragbare Stromstationen — hauptsächlich MQTT |
| **EV-Ladegerät** | Intelligentes V1-Ladegerät – hauptsächlich MQTT |
| **Fahrzeug** | Virtuelle Elektrofahrzeuge für Ladekonten — leseorientiert in ioBroker |
| **powerpanel** / **hes** | US Power Panel, X1 HES — eingeschränkte API, intensive Statistikabfrage |
| **Ladegerät** | Prime / Ladestationen — MQTT |
| **home_backup** | E10, AX170 — sehr eingeschränkte API |

Gerätehierarchie (wie HA Entitäten strukturiert): [Diskussion Nr. 239](https://github.com/thomluther/ha-anker-solix/discussions/239).

---

## Staatsstruktur und Entitätsgruppen
Typische Pfade (Instanz `anker-solix.0`):

- `anker-solix.0.solarbank.<deviceId>.sensors.*` — Leistung, SOC usw.
- `anker-solix.0.solarbank.<deviceId>.control.*` — beschreibbare Steuerelemente, sofern unterstützt
- `anker-solix.0.<device>.<id>.statistics.*` — täglicher kWh-Verbrauch (aktivieren Sie **Objekte** → Energiestatistik)
- `…statistics.week.*` / `statistics.month.*` / `statistics.year.*` — Kalenderwochen-, Monats- und Jahressummen in kWh (separate Entitätsgruppen; Abfrage bei Detailaktualisierung, nicht in jedem Zyklus)
- **Combiner-Site:** Statistiken nur unter `combiner_box.<id>.statistics.*` (nicht dupliziert auf `system.*` oder jeder `solarbank.*`). **Ohne Combiner:** pro `solarbank.*` (und `smartmeter.*` für Netzmetriken). API-Abfragen bleiben **einmal pro Site**.
- `anker-solix.0.smartmeter.<deviceId>.sensors.*`
- `anker-solix.0.services.*` — Exportieren, Planen, Aktualisieren (Schaltflächenzustände)
- `anker-solix.0.info.connection`, `anker-solix.0.info.pythonReady`

**Entitätsgruppen** (Admin → **Objekte**): Zuordnung zu HA-Funktionssätzen – Stromflüsse, Diagnose, PPS, EV-Ladegerät, HES, Standortpreis, Kontoinformationen usw. Deaktivierte Gruppen werden von API-Abfragen ausgeschlossen, um die Last zu reduzieren.

---

## MQTT-verwaltete Geräte
Aktivieren Sie **MQTT** in den **Optionen**, wenn Sie Live-Daten oder Steuerelemente benötigen, die die Cloud-API nicht bereitstellt (viele PPS/EV/Ladegerätefunktionen).

- Zusätzliche Sensoren/Steuerungen stammen aus MQTT-Maps in solixapi (von der Community pro Modell dekodiert).
- **Echtzeit-Trigger** und **Statusabfrage** verhalten sich wie HA-Tasten – deren Automatisierung rund um die Uhr erhöht den Datenverkehr und hält die Geräte aktiv ([HA MQTT-Abschnitt](https://github.com/thomluther/ha-anker-solix#mqtt-managed-devices)).
- **Hybridsteuerungen** (Stations-SOC-Reserve, AC-Grenzwerte, Netzexport bei Mehrsystem) benötigen MQTT + API wie HA.
- Geräte im **MQTT-Lokalmodus** (z. B. E10 hinter Power Dock) werden über das Hub-Gerät als Proxy verwendet — siehe [HA INFO – MQTT-Lokalmodus](https://github.com/thomluther/ha-anker-solix/blob/main/INFO.md#devices-in-mqtt-local-mode).

Neue Modelle dekodieren: [MQTT-Richtlinien](https://github.com/thomluther/anker-solix-api/discussions/222), Tool `mqtt_monitor.py` in [anker-solix-api](https://github.com/thomluther/anker-solix-api).

---

## Besondere Hinweise zu Geräten
Zusammenfassung von [HA-Integrations-README](https://github.com/thomluther/ha-anker-solix); Verhalten ist über solixapi identisch.

### Standalone-Wechselrichter (MI80)
Es handelt sich nicht um eine vollständige App für das Stromversorgungssystem, aber die Cloud erfasst die Erträge. Die API erstellt einen **virtuellen Standort**. Der WLAN-Status des Wechselrichters in der API ist oft fehlerhaft; der Status der Cloud-Verbindung ist zuverlässiger. **Ändern Sie die** Wechselrichtergrenzen nicht dauerhaft (Hardware-Schreibzyklen).

### Solarbank 1 (E1600)
Cloud-Aktualisierungen erfolgen während der Produktion/Entladung etwa alle **60 Sekunden**; im Standby-Modus etwa stündlich. **Planungsfehler:** Ein einzelner ganztägiger API-Slot kann die Exportleistung auf **0 W** setzen – verwenden Sie in der App mindestens 2 Slots, wenn Sie eine voreingestellte Ausgabeleistung nutzen. Die tägliche Entladestatistik seit Mitte 2024 beinhaltet umgangene PV-Anlagen (auch in der App fehlerhaft). MQTT-Überwachung/-Steuerung ab HA v3.4+/3.5+.

### Solarbank 2 + intelligente Zähler
Das Cloud-Intervall beträgt üblicherweise **~5 Minuten**; Änderungen an der Steuerung können bis zu **~6 Minuten** dauern, bis sie in den Sensoren sichtbar sind. In der Vergangenheit gab es bei gemeinsam genutzten Konten Probleme mit nicht verfügbaren Entitäten (Anker-seitige Behebung). Einige API-Pfade mit **Ausgabelimit** sind noch unbekannt.

### Solarbank 2 AC
Zeitabhängige Tarife werden über Steuerungsmöglichkeiten bereitgestellt, sofern dies unterstützt wird; Cloud-Updates können nach intensiver App-Nutzung ins Stocken geraten ([HA #211](https://github.com/thomluther/ha-anker-solix/issues/211)).

### Kombiniertes SB2 + kaskadiertes SB1
Die Gesamtwerte/Statistiken in der Anker-Cloud beziehen sich **nur auf SB2**; SB1 ist teilweise intransparent. Bei manueller Steuerung von SB2 wird für SB1 ein minimaler Zeitplan erzwungen – einige ioBroker/HA-Steuerelemente werden absichtlich als **nicht verfügbar** angezeigt. Für die korrekte Lade-/Entladeenergie addieren Sie die Akkuleistung **pro Gerät**, nicht nur die System-Nettoleistung ([HA-Details](https://github.com/thomluther/ha-anker-solix#combined-solarbank-2-systems-containing-cascaded-solarbank-1-devices)).

### Solarbank 3
Smart-Modus, dynamische Preise, Zeitfenstermodi – oft **nur** per API aktivierbar (vorher in der App konfigurieren). Dynamische Preise, Mehrwertsteuer/Gebühren sind möglicherweise **nur im Cache** anpassbar. Nordpool-Vorhersagen sind am zuverlässigsten.

### Multisystem mit Power Dock
Bis zu 4 SB3-Einheiten; gemeinsame Stationseinstellungen (Nutzungsmodus, SOC-Reserve, Netzexport). Die Steuerung ist in der Integrationslogik auf dem **Combiner/Power Dock** konsolidiert. Cloud-Daten können in der Anfangsphase verzögert sein. Die **AC-Ausgangsgrenze** mehrerer Systeme ist möglicherweise nicht über die API änderbar.

### Stationssteuerungen
SOC-Reserve, PV/AC-Grenzwerte und Netzeinspeisung erfordern häufig **API + MQTT** (Hybrid). PV-/EV-fähige Schalter von Drittanbietern werden üblicherweise einmalig per App eingerichtet und sind nicht für die Automatisierung geeignet.

### PPS / Solarbank PPS (F3000 + US-Zähler)
Hausautomatisierungssystem mit Notstromversorgung in den USA; Steuerung hauptsächlich über MQTT.

### Ladegerät für Elektrofahrzeuge (V1)
Die meisten Metriken/Steuerungen erfolgen über MQTT; Mitgliedskonten werden unterstützt. Betriebsmodi entsprechen einer HA-ähnlichen Zustandsmaschine – in ioBroker sollten Sie die verfügbaren Steuerungsoptionen vor der Skriptausführung prüfen. Sitzungsverlaufsstatistiken sind nicht implementiert (verwenden Sie den Zustandsverlauf).

### Fahrzeuge
Virtuelle Geräte pro Konto EV; keine Erstellung über Adapter — erkannt beim Aktualisieren.

### Stromverteiler und HES (X1)
Begrenzte API-Leistung; als Workaround werden **~5-Minuten-Durchschnittswerte** aus den Energiestatistiken verwendet (**~80 MB/Tag** zusätzlicher Datenverkehr pro System, falls aktiviert). Deaktivieren Sie bei Bedarf ressourcenintensive Kategorien in **Objekten**. X1: Lokalen **Modbus** ([Anker-Spezifikation](https://support.ankersolix.com/de/s/download-preview?urlname=Anker-SOLIX-X1-Series-Modbus-Protocol)) berücksichtigen – nicht Teil dieses Adapters.

### Heim-Backup (E10, AX170)
Nahezu keine Cloud-API für Systemenergie; E10 oft im lokalen MQTT-Modus über Dockingstation.

### Andere / eigenständige Geräte
Nur in einem **Stromversorgungssystem** für die vollständige API; andernfalls ist MQTT + Community-Dekodierung erforderlich.

---

## Fehlerbehebung bei Anmeldung / Umfrage
### Keine `authcache/<email>.json`
Die Datei wird erst nach einer **erfolgreichen** API-Anmeldung erstellt. Falls bei jeder Anmeldung ein Captcha ausgegeben wird, kopieren Sie eine funktionierende Datei aus [ha-anker-solix](https://github.com/thomluther/ha-anker-solix) (`custom_components/anker_solix/solixapi/authcache/`) nach `iobroker-data/anker-solix.0/authcache/`. Der Dateiname muss dem im **Konto** entsprechen.

### `(100032) Captcha id empty`
Anker blockiert einige Server-/VPN-API-Anmeldungen. Die Bibliothek kann Captchas nicht lösen.

1. Bestätigen Sie, dass sich die App im selben LAN befindet; das **Land** muss korrekt sein; auf dem ioBroker-Host darf kein VPN verwendet werden.
2. **Löschen Sie den Anmeldecache nicht, um das Captcha zu „reparieren“.**
3. Kopieren Sie `authcache` aus HA oder melden Sie sich erneut an, sobald die Cloud dies zulässt.
4. Warten Sie nach mehreren erfolglosen Versuchen 15–30 Minuten.
5. Verwenden Sie einen Adapter **≥ 0.9.3**, damit ein gültiger Cache beim Neustart nicht verworfen wird.

Das Protokoll zeigt den genauen Cache-Pfad ab **0.9.4+**.

### Ratenbegrenzungen (26161 / 429)
Das Abfrageintervall erhöhen; die Anzahl der aktivierten **Objektgruppen** reduzieren; der Adapter wiederholt die Abfragen und kann kurzzeitig auf die Einmalbrücke zurückgreifen.

---

## Dienstleistungen
Staaten gemäß `anker-solix.0.services.*` (auf `true` gesetzt, um die Auslösung zu bewirken):

- `get_schedule`, `clear_schedule`, `export_systems`, `get_system_info`, `refresh_devices`

Verwendet `selectedDeviceId` / `selectedSiteId` aus der Konfiguration. Siehe Registerkarte **Objekte** im Adminbereich (Hinweis zu Diensten).

---

## Quellenangaben & weiterführende Literatur
| Ressource | Inhalt |
|----------|---------|
| [thomluther/ha-anker-solix](https://github.com/thomluther/ha-anker-solix) | Vollständige README-Datei, **INFO.md** (Konfiguration, MQTT, Export, Tarife) |
| [HA-Diskussionen](https://github.com/thomluther/ha-anker-solix/discussions) | Energie-Dashboard, Null-Export, Effizienz |
| [SolixBLE](https://github.com/flip-dots/SolixBLE) | Lokales BLE (nicht Cloud) |
| [ha-anker-solix-official](https://github.com/anker-charging/ha-anker-solix-official) | Offizieller Modbus (lokale Geräte) |
| [ioBroker.pvforecast](https://www.iobroker.net/#en/adapters/adapterref/iobroker.pvforecast/README.md) | PV-Prognose (optionale Eingabe zur Vermeidung von Abregelung) |
| [ioBroker.pvforecast](https://www.iobroker.net/#en/adapters/adapterref/iobroker.pvforecast/README.md) | PV-Prognose (optionale Eingabe zur Vermeidung von Abregelung) |

Deutsche Anleitungen/Videos, die unter [HA README](https://github.com/thomluther/ha-anker-solix#additional-resources) verlinkt sind, beziehen sich konzeptionell auf Daten und Grenzwerte; die Verkabelung erfolgt über ioBroker-Zustände anstelle von HA-Entitäten.

---

## Vermeidung von Einschränkungen (optional)
Registerkarte **Abregelungsvermeidung** / **Abschaltvermeidung**: Erfordert [ioBroker.pvforecast](https://www.iobroker.net/#en/adapters/adapterref/iobroker.pvforecast/README.md)-Adapter. (Bisher basierend auf [ioBroker.solarprognose](https://www.iobroker.net/#en/adapters/adapterref/iobroker.pvforecast/README.md))](https://www.iobroker.net/#en/adapters/adapterref/iobroker.solarprognose/README.md) / solarprognose.de – deaktiviert, da **solarprognose.de eingestellt wird** und diese Datenquelle nicht mehr verfügbar ist.) Legen Sie den **Anlagenpfad** fest (z. B. `pvforecast.0.plants.pv`); die Leistungswerte werden von `{path}.power.hoursToday.*` gelesen. Die **Prognoseauflösung** (60 / 30 / 15 Minuten, Standard **60**) muss dem in pvforecast konfigurierten Intervall entsprechen. **Steuert nur:** **Manueller** Modus + **`ac_output_limit`** (AC-Ausgang / -Export). **Ändert nicht** die Basiseinstellungen der Station (Netzexportbegrenzung, `allow_grid_export`, Voreinstellung für die Eigenlast, AC-Ladebegrenzung). **Vorher:** `ac_output_limit` = Live-PV. **Aktiv:** `missing_charge_wh`, `max_charge_w` = `missing_charge_wh` ÷ `remaining_hours`, `export_w` = `live_pv_w` − `max_charge_w`, `ac_output_limit` = `export_w`. **Nachher:** Ausgewählten Modus wiederherstellen. Zustände: `curtailment.live_pv_w`, `missing_charge_wh`, `max_charge_w`, `export_w`, `remaining_hours`.

**Admin:** Kontrollkästchen *Kombinator vorhanden* – ohne Kombinator: Geräte-ID + Solarbanktyp + Batteriekapazität (Wh); mit Kombinator: Kombinator-ID + bis zu **4** Solarbank-Steckplätze (jeder Steckplatz kann *kein* sein). **Kombinator:** Gesamt-AC-Grenzwert = **Summe** der Grenzwerte pro Einheit (SB2 **1000** W, SB3 Pro **1200** W, SB4 Pro **2500** W). **Standalone:** immer **800** W.

---

## Veröffentlichung (npm- und ioBroker-Katalog)
**npm:** Veröffentlichung über Git-Tag (`v*`) und CI-Deployment nach [Der Adaptercheck (https://adaptercheck.iobroker.in/) ist erfolgreich. Die Veröffentlichung erfolgt über **npm Trusted Publishing** (OIDC von GitHub Actions – kein langlebiges npm-Token). Klassische Automatisierungstoken werden von npm ab **Januar 2027** nicht mehr unterstützt; dieser Adapter verwendet bereits Trusted Publishing. Registrieren Sie sich in [ioBroker.repositories].](https://github.com/ioBroker/ioBroker.repositories), sobald das Paket auf npm verfügbar ist.

**Vor jeder Veröffentlichung** (durchgesetzt durch `npm run test:package` → `test/io-package-policy.js`):

1. Erhöhen Sie die Versionsangabe in `package.json` und `io-package.json` (muss übereinstimmen).
2. Fügen Sie diesem README-Changelog einen Abschnitt `### x.y.z` hinzu (E6006).
3. Füge **einen** neuen `common.news`-Eintrag für diese Version hinzu; behalte **maximal 7** News-Schlüssel bei – nur Versionen, die bereits auf npm verfügbar sind (mit Ausnahme der Version, die du veröffentlichen möchtest). Verschiebe entfernten Text nach [CHANGELOG_OLD.md](CHANGELOG_OLD.md).
4. Admin `jsonConfig.json`: Die Überschrift `size` muss **≤ 5** sein (verwenden Sie `5` für die kleinste Überschrift).
5. Fügen Sie keine Root-Dateien zu npm `files` hinzu, es sei denn, dies ist erforderlich (`CHANGELOG_OLD.md` bleibt außerhalb des Pakets).
6. Die Angabe `os` in `package.json` muss mit der Betriebssystemmatrix in `test-and-release.yml` übereinstimmen (E3027). Halten Sie die administrativen Dateien `i18n/*.json` mit `en.json` synchron (W5604/W5605).

---

## Changelog

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