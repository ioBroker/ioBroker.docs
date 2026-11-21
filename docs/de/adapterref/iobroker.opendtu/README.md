---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.opendtu/README.md
title: ioBroker.opendtu
hash: 9qU6Broe5Trb+HX0KfpeJG7cPEFXWE0cVErkCqQ9W68=
---
![Logo](../../../en/adapterref/iobroker.opendtu/admin/opendtu.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.opendtu.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.opendtu.svg)
![Anzahl der Installationen](https://iobroker.live/badges/opendtu-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/opendtu-stable.svg)
![NPM](https://nodei.co/npm/iobroker.opendtu.png?downloads=true)
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.opendtu/workflows/Test%20and%20Release/badge.svg)

# ioBroker.opendtu

**🇩🇪 [Deutsche Anleitung](https://github.com/iobroker-community-adapters/ioBroker.opendtu/blob/main/docs/de/README.md)**

## OpenDTU-Adapter für ioBroker

[OpenDTU](https://www.opendtu.solar) ist eine kleine Box, die per Funk mit Hoymiles-Mikrowechselrichtern kommuniziert – diese werden häufig für Solaranlagen auf Balkonen eingesetzt. Dieser Adapter überträgt die Werte Ihres OpenDTU live und verzögerungsfrei an ioBroker.

- aktuelle Leistung jedes Wechselrichters und aller Wechselrichter zusammen
- Ertrag heute und seit Inbetriebnahme
- Werte pro Solarmodul, Temperatur, Spannung und mehr
- **Begrenzen Sie die Leistung** Ihrer Wechselrichter, z. B. für Nulleinspeisung.

## Was Sie benötigen

- ein OpenDTU, das in Ihrem Heimnetzwerk läuft und erreichbar ist (Sie können seine Webseite im Browser öffnen).
- seine Adresse, z.B. `192.168.1.50`
- Das Passwort der OpenDTU-Webseite – wird benötigt, um die Leistung zu begrenzen (siehe [Passwort](#password) ).

## Aufstellen

1. Installieren Sie den Adapter in ioBroker unter **Adapters** und erstellen Sie eine Instanz.
2. Geben Sie in den Einstellungen die **Adresse** Ihres OpenDTU ein – dieselbe, die Sie in den Browser eingeben.
3. Geben Sie das **Passwort** der OpenDTU-Webseite ein (Benutzername). `admin`).
4. **Speichern** . Nach einigen Sekunden erscheinen die Werte unter **Objekte → opendtu.0** .

Das ist alles. Protokoll (HTTP) und Port (80) müssen nur in seltenen Fällen geändert werden – sie sind im Expertenmodus des Administrators sichtbar.

### Optionen

| Option                                                               | Was es tut                                                                                                                                                                 |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Setzen Sie die Werte auf 0, wenn kein Wechselrichter erreichbar ist. | Empfohlen. Nachts schalten sich die Wechselrichter ab. Ohne diese Option bleiben die letzten Werte des Abends die ganze Nacht sichtbar. Die Ertragswerte bleiben erhalten. |
| Ich behalte meine eigenen Namen für die Objekte bei.                 | Aktivieren Sie diese Option, wenn Sie Objekte in ioBroker umbenannt haben. Der Adapter überschreibt die Namen dann nicht mehr.                                             |

### Passwort

- Zum **Auslesen** der Werte ist kein Passwort erforderlich, sofern in OpenDTU _die Option „Schreibgeschützten Zugriff auf die Weboberfläche ohne Passwort zulassen“_ aktiviert ist ( _Einstellungen → Sicherheit_ ). Dies ist die Standardeinstellung.
- Um **die Leistung zu begrenzen** oder einen Wechselrichter ein- und auszuschalten, wird stets das Passwort benötigt.

## Anhand der Werte

Jeder Wechselrichter erhält einen eigenen Ordner, der nach seiner Seriennummer benannt ist (der Name, den Sie ihm in OpenDTU gegeben haben, wird daneben angezeigt).

| Objekt                                | Bedeutung                                                   |
| ------------------------------------- | ----------------------------------------------------------- |
| `opendtu.0.total.power`               | Aktuelle Gesamtleistung aller Wechselrichter (W)            |
| `opendtu.0.total.yieldday`            | Ertrag aller Wechselrichter heute (Wh)                      |
| `opendtu.0.total.yieldtotal`          | Ertrag aller Wechselrichter seit Inbetriebnahme (kWh)       |
| `opendtu.0.<serial>.ac.phase_1.power` | Aktuelle Leistung dieses Wechselrichters (W)                |
| `opendtu.0.<serial>.yieldday`         | Heutiger Ertrag dieses Wechselrichters (Wh)                 |
| `opendtu.0.<serial>.yieldtotal`       | Ertrag dieses Wechselrichters seit der Inbetriebnahme (kWh) |
| `opendtu.0.<serial>.dc.input_1.power` | Leistung des Solarmoduls bei Eingangsleistung 1 (W)         |
| `opendtu.0.<serial>.temperature`      | Temperatur des Wechselrichters (°C)                         |
| `opendtu.0.<serial>.available`        | Wechselrichter erreichbar –`false` nachts ist normal        |
| `opendtu.0.<serial>.producing`        | Der Wechselrichter erzeugt Strom                            |
| `opendtu.0.dtu.available`             | OpenDTU selbst ist erreichbar                               |

**Tipp für Energiestatistiken:** Nutzen Sie `yieldtotal` Es zählt nur hoch und wird von Neustarts nicht beeinflusst – ideal für Adapter wie _SourceAnalytix_ oder für Ihre eigenen Diagramme.

## Begrenzung der Leistung

Im Ordner `opendtu.0.<serial>.power_control` Sie können die Leistung eines Wechselrichters begrenzen. Tragen Sie dazu einfach eine Zahl in eines dieser Felder ein:

| Objekt                         | Limit                | Wurden die Daten nach dem Neustart des Wechselrichters beibehalten? |
| ------------------------------ | -------------------- | ------------------------------------------------------------------- |
| `limit_nonpersistent_absolute` | in Watt, z.B. `300`   | NEIN                                                                |
| `limit_nonpersistent_relative` | in Prozent, z.B. `50` | NEIN                                                                |
| `limit_persistent_absolute`    | in Watt              | Ja                                                                  |
| `limit_persistent_relative`    | in Prozent           | Ja                                                                  |

- Für die **automatische Steuerung** (z. B. Nulleinspeisung, Änderungen alle paar Sekunden oder Minuten) sollten Sie immer die **nichtpersistenten** Objekte verwenden.
- ⚠️ Die **permanenten** Grenzwerte werden im Speicher des Wechselrichters gespeichert, der nur eine begrenzte Anzahl von Schreibvorgängen zulässt. Ändern Sie diese daher **nur selten** , z. B. einmalig bei der Systemeinrichtung.
- Die aktuell angewendete Grenze ist in folgender Tabelle dargestellt: `current_limit_relative` Und `current_limit_absolute` Nach dem Festlegen eines absoluten Grenzwerts kann es bis zu etwa 4 Minuten dauern, bis dieser Wert aktualisiert wird.
- `limit_set_status` zeigt an, ob der Wechselrichter den letzten Grenzwert akzeptiert hat: `Pending` = gesendet, `Ok` = angewendet `Failure` = noch nicht empfangen (OpenDTU versucht es von selbst erneut).

Beispiel in einem JavaScript-Skript – Begrenzung des Wechselrichters auf 300 W:

```js
setState('opendtu.0.116100000001.power_control.limit_nonpersistent_absolute', 300);
```

Die Knöpfe `power_on`, `power_off` Und `restart` Schalten Sie den Wechselrichter ein, aus oder starten Sie ihn neu.

## Meldungen des Wechselrichters

`opendtu.0.<serial>.events.last` zeigt die letzte Meldung des Wechselrichters mit der zugehörigen Zeitangabe an (z. B. eine Netzstörung oder einen Startvorgang). `events.count` ist die Anzahl der gespeicherten Meldungen (der Wechselrichter löscht sie beim Start am Morgen) und `events.json` Die vollständige Liste. Sie können diese für Benachrichtigungen verwenden, z. B. mit einem Skript oder dem _Benachrichtigungsmanager_ .

## Fragen und Probleme

**Es werden keine Werte angezeigt**

- Öffnen Sie die Adresse in den Einstellungen Ihres Browsers. Falls die OpenDTU-Seite dort nicht angezeigt wird, kann ioBroker sie ebenfalls nicht erreichen (überprüfen Sie die Adresse, WLAN, Firewall oder VLAN).
- Wenn Sie in OpenDTU die _Option „Schreibgeschützten Zugriff zulassen“_ deaktiviert haben, geben Sie das Passwort in den Adaptereinstellungen ein.

**Die Beschränkung wird nicht angewendet**

- Überprüfen Sie das Passwort in den Adaptereinstellungen – es wird immer benötigt, um das Limit zu ändern.
- Schauen Sie in das ioBroker-Protokoll; der Adapter schreibt dort eine Meldung, wenn OpenDTU den Befehl ablehnt.

**Nachts sind alle Werte 0 / die Wechselrichter sind "nicht verfügbar".**

- Das ist normal: Hoymiles-Wechselrichter werden von den Solarmodulen gespeist und schalten sich bei Dunkelheit ab.

**Ein Wechselrichter ist tagsüber oft „nicht verfügbar“.**

- Die Funkverbindung ist wahrscheinlich schwach. Schau mal nach `opendtu.0.<serial>.radio.rssi` (unterhalb von etwa −80 dBm ist schwach) und `opendtu.0.dtu.hints.radio_problem` Platzieren Sie den OpenDTU näher an den Wechselrichtern oder drehen Sie seine Antenne.

**Mein Netzwerk zeigt viele DNS-Anfragen von ioBroker an.**

- Geben Sie die IP-Adresse ein (z. B. `192.168.1.50`) anstelle eines Namens wie `opendtu.local` Die

<details>
<summary>For advanced users</summary>

### Funktionsweise des Adapters

- Live-Werte werden von OpenDTU über den WebSocket übertragen. `ws://<address>/livedata` OpenDTU sendet pro Wechselrichter eine Nachricht, sobald neue Daten eintreffen (etwa alle 1–10 Sekunden), es findet also kein Polling statt.
- Status von OpenDTU selbst (`dtu.*`: Hostname, IP-Adresse, WLAN-Signalstärke, Betriebszeit) werden alle 60 Sekunden ausgelesen von `/api/network/status` Und `/api/system/status` Die
- Befehle werden gesendet an `/api/limit/config` Und `/api/power/config` (Basisauthentifizierung, Benutzer) `admin`).
- `yieldtotal` wird einmal täglich um 00:01 Uhr erneut geschrieben, damit die Statistik-Anpasser den neuen Tag erkennen.

### Grenzwerttypen

| Objekt                         | OpenDTU `limit_type` |
| ------------------------------ | -------------------- |
| `limit_nonpersistent_absolute` | 0                    |
| `limit_nonpersistent_relative` | 1                    |
| `limit_persistent_absolute`    | 256                  |
| `limit_persistent_relative`    | 257                  |

Weitere Details zu den Beschränkungen finden Sie in der [OpenDTU-Dokumentation](https://www.opendtu.solar/firmware/web_api/) .

### Objektstruktur

```
opendtu.0
├── info.connection         connected to OpenDTU
├── dtu                     OpenDTU itself (incl. hints, heap)
├── total                   sum of all inverters
└── <serial>                one folder per inverter
    ├── ac.phase_1          AC side (grid)
    ├── dc.input_1 … n      DC side (solar panels)
    ├── events              messages of the inverter
    ├── radio               radio statistics
    └── power_control       limits, on/off and command status
```

</details>

## Credits

Dieser Adapter wäre ohne die großartige Arbeit von @o0Shojo0o ( <https://github.com/o0Shojo0o> ) nicht möglich gewesen, der frühere Versionen dieses Adapters entwickelt hat.

## Wie man Probleme und Funktionswünsche meldet

Bitte nutzen Sie [die GitHub-Issues](https://github.com/iobroker-community-adapters/ioBroker.opendtu/issues) . Es ist sehr hilfreich, wenn Sie den Adapter auf die Protokollierungsstufe _„Debug“_ einstellen (Instanzen → Expertenmodus → _Spaltenprotokollierungsstufe_ ) und die Protokolldatei des ioBrokers anhängen. `log` Verzeichnis – **nicht** vom Administrator, wodurch lange Zeilen abgeschnitten werden.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (Schimi1983) Translations of the settings page moved to the short file format, obsolete workflow file removed (repository checker #413)

### 4.1.1 (2026-11-04)
- (GermanBluefox) Fixed: a limit of 0 % that was not set by the adapter (e.g. in the OpenDTU web UI or via MQTT) was not shown

### 4.1.0 (2026-11-04)
- (Schimi1983) Status of the last limit and on/off command, maximum power of the inverter [#226]
- (Schimi1983) Event log of each inverter (number, last event, list) [#261]
- (Schimi1983) Radio statistics per inverter and hints of OpenDTU (time not synchronized, radio problem, default password)
- (Schimi1983) Temperature, memory and firmware of the OpenDTU; model and firmware of each inverter
- (Schimi1983) Daily maximum power and temperature (OpenDTU v26.9 and newer)
- (Schimi1983) Fixed: host name of the OpenDTU was never shown
- (Schimi1983) Fixed: after a restart of the OpenDTU the current limit showed 0 % for some minutes
- (Schimi1983) Total DC power over all inverters, message ID of the last event (for notifications)
- (Schimi1983) Event log is also updated when it is full (OpenDTU keeps 15 events per inverter)
- (Schimi1983) Clearer object names (e.g. current limit in % and W, persistent / non-persistent limits)
- (Schimi1983) Roles of all objects corrected according to the ioBroker state roles (e.g. yield `value.energy.produced`, availability `indicator.reachable`, limits `level`, buttons write-only)

### 4.0.0 (2026-11-03)
- (copilot) Adapter requires node.js >= 22.19.0 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (Schimi1983) README rewritten for beginners, German guide added (docs/de/README.md)
- (Schimi1983) Settings page: short guide, help texts in simple words, protocol and port only in expert mode, address is checked before saving
- (Schimi1983) New state `info.connection`, the instance shows green/yellow again
- (Schimi1983) Clear log messages for wrong or missing password, connection problems are logged only once
- (Schimi1983) Password is no longer part of the websocket URL
- (Schimi1983) Reconnect waits longer while OpenDTU is offline (2 s up to 60 s), fewer DNS queries [#192]
- (Schimi1983) Fixed: adapter reconnected after it was stopped
- (Schimi1983) Fixed: several adapter instances in compact mode influenced each other
- (Schimi1983) Fixed: with several inverters an offline inverter could show old values again
- (Schimi1983) Commands are confirmed (ack) only after OpenDTU accepted them, invalid limits are rejected
- (Schimi1983) Address field accepts input like `http://192.168.1.10/`
- (Schimi1983) Fixed: `total.yieldtotal` and `total.yieldday` dropped after midnight or an OpenDTU restart until all inverters answered; counters such as SourceAnalytix saw this as a meter reset
- (mcm1957) Dependencies have been updated.

### 3.1.0 (2024-12-02)
- (mattreim) Variable polling interval has been removed and polling intervals hev been increased.
- (mattreim) Description has been translated into supported languages.
- (mattreim) Admin-UI has been adapted for some display sizes.
- (mcm1957) Dependencies have been updated.

### 3.0.1 (2024-10-26)
- (simatec) Admin-UI has been adapted for small displays.
- (mcm1957) Dependencies have been updated.

## License
MIT License

Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2024 ioBroker Community Developers <iobroker-community-adapters@gmx.de>  
Copyright (c) 2024 Dennis Rathjen <dennis.rathjen@outlook.de>

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