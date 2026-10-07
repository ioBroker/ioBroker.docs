---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.zendure-solarflow/README.md
title: ioBroker.zendure-solarflow
hash: YpHqOkWhj9Ejwc/fJdPdykOMvtgiVWuge3KvpX5SIUY=
---
![Logo](../../../en/adapterref/iobroker.zendure-solarflow/admin/zendure-solarflow.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.zendure-solarflow.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.zendure-solarflow.svg)
![Anzahl der Installationen](https://iobroker.live/badges/zendure-solarflow-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/zendure-solarflow-stable.svg)
![NPM](https://nodei.co/npm/iobroker.zendure-solarflow.png?downloads=true)
![Test und Freigabe](https://github.com/nograx/ioBroker.zendure-solarflow/workflows/Test%20and%20Release/badge.svg)
![Spenden](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)

# ioBroker.zendure-solarflow

## Sentry

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Zendure Solarflow-Adapter für ioBroker

Ein ioBroker-Adapter zum Auslesen und Steuern von Zendure Solarflow-Geräten über die Zendure Cloud API sowie lokal über zenSDK (HTTP) oder MQTT für ältere Geräte.

## Spenden

Wenn Ihnen der Adapter gefällt und Sie meine Arbeit unterstützen möchten, freue ich mich über eine Spende via PayPal. Vielen Dank! (Persönlicher Spendenlink für Nograx, unabhängig vom ioBroker-Projekt)

## Merkmale

- Vollständige Telemetriedaten Ihrer Solarflow-Geräte, einschließlich Werte, die in der offiziellen App nicht angezeigt werden (z. B. Batteriespannung).
- Geräte wie mit der offiziellen App steuern – die meisten Einstellungen sind verfügbar.
- Legen Sie Ausgangs-/Eingangsgrenzen für Szenarien ohne Einspeisung ohne Shelly Pro EM fest oder erstellen Sie komplexere Automatisierungen per Skript/Blockly.
- Batterieschutz: Unterbricht die Eingangsleistung, wenn die Batteriespannung zu niedrig ist (erfordert eine über den Adapter einstellbare Ausgangsbegrenzung).
- Mehrere Solarflow-Geräte gleichzeitig steuern, mit präziseren Berechnungen.
- Integrierte Nulleinspeisungsautomatik (PI-gesteuerte, SOC-gewichtete Leistungsverteilung auf mehrere Geräte), gesteuert durch Ihren Netzzähler
- Funktioniert mit allen Zendure Solarflow-Geräten
- **zenSDK** : Lokale HTTP-Steuerung für kompatible Geräte, wobei die Daten weiterhin an die Zendure-Cloud weitergeleitet werden, sodass Sie die volle Kontrolle behalten, falls das Internet oder die Zendure-Server ausfallen.

## Modi

- **Authentifizierung per Cloud-Schlüssel** (empfohlen): die offizielle Zendure-Methode. Sie erhalten einen Cloud-Schlüssel über die App. Standardmäßig wird für kompatible Geräte im selben Netzwerk wie ioBroker das zenSDK verwendet. Dies ermöglicht die volle lokale Kontrolle bei gleichzeitiger Datenübertragung in die Cloud. Auch eine reine Cloud-Nutzung ist möglich. Ältere Geräte, die bereits an einen lokalen MQTT-Server angeschlossen sind, können Daten ebenfalls ohne Nachteile in die Cloud übertragen.
- **Lokal** : Nur lokaler Modus. Verbinden Sie den Adapter mit einem lokalen MQTT-Server für ältere Geräte (siehe unten); zenSDK-Geräte werden über mDNS gefunden.
- **zenSDK-only (mDNS/IP)** : Keine Zendure-Cloud und kein MQTT-Server. Geräte werden per [mDNS-Erkennung](#mdns-discovery) gefunden oder [über ihre IP-Adresse konfiguriert](#zensdk-devices-by-ip-address) und ausschließlich lokal über das zenSDK abgefragt und gesteuert. Daher werden nur zenSDK-kompatible Geräte unterstützt.

### mDNS Discovery

Wenn zenSDK aktiviert ist, durchsucht der Adapter das Netzwerk über mDNS/Bonjour nach Geräten, die sich als `Zendure-<model>-<serialNumber>` Solange das Netzwerk aktiv ist, wird es nach 5, 15, 30 und 60 Sekunden sowie anschließend alle 5 Minuten erneut abgefragt. So werden auch später verbundene Geräte (oder solche, die bei einer früheren Abfrage nicht erfasst wurden) gefunden, ohne dass der Adapter neu gestartet werden muss. Dadurch werden IP-Adressen bekannter Cloud-Geräte ergänzt oder korrigiert und Zubehör (Mix-Serie, Smart Meter), das keinen Cloud-Produktschlüssel besitzt und daher nicht anderweitig erstellt werden kann, automatisch angelegt. Geräte werden anhand ihrer vollständigen Seriennummer identifiziert, nicht anhand ihrer IP-Adresse oder eines gekürzten Suffixes. Die Funktion kann über die Einstellung „Über mDNS-Erkennung gefundene Geräte hinzufügen“ deaktiviert werden.

### zenSDK-Geräte nach IP-Adresse

mDNS verwendet Multicast, das normalerweise nicht zwischen Netzwerksegmenten geroutet wird. Wenn sich Ihre Zendure-Geräte in einem anderen VLAN/Subnetz als ioBroker befinden, geben Sie deren IP-Adressen (oder Hostnamen) im Abschnitt „zenSDK-Geräte nach IP-Adresse“ der Adaptereinstellungen ein. Der Adapter fragt jede Adresse über zenSDK ab (`http://<ip>/properties/report` Das System ruft beim Start und anschließend alle 5 Minuten eine neue Seriennummer ab und identifiziert das Gerät anhand dieser. Ein bereits bekanntes Gerät (z. B. aus der Zendure-Cloud-Geräteliste) behält seinen Status und wird lokal vom zenSDK gesteuert. Ein unbekanntes Gerät wird, wie ein über mDNS gefundenes Gerät, mit seiner Seriennummer als Schlüssel angelegt. Die Funktion ist in allen Verbindungsmodi verfügbar, solange das zenSDK aktiviert ist. Weisen Sie den Geräten eine feste IP-Adresse zu (DHCP-Reservierung) und stellen Sie sicher, dass ioBroker sie über TCP-Port 80 erreichen kann.

## Unterstützte Geräte

### zenSDK-kompatible Geräte ✅ (vollständige lokale Steuerung über HTTP)

> **Zendure empfiehlt** : Verwenden Sie den oben beschriebenen Authentifizierungsmodus mit Cloud-Schlüssel. Dieser ermöglicht die volle lokale Kontrolle bei gleichzeitiger Beibehaltung der Cloud-Verbindung. Die Geräte müssen nicht von der Cloud getrennt werden.

- Solarflow 1600 AC Plus, 2400 AC, 2400 AC Plus, 2400 Pro, 800, 800 Plus, 800 Pro
- Solarflow 3000 Mix AC+, 4000 Mix AC+, 4000 Mix Pro _(noch kein Cloud-Produktschlüssel vorhanden – hinzugefügt nur über [mDNS-Erkennung](#mdns-discovery) )_

### Smart-Meter-Zubehör 📊 (nur lesbar, nur zenSDK/mDNS)

- **Intelligenter Zähler 3CT** – Scheinleistung pro Phase (A/B/C) und gesamt, über Stromwandler
- **Smart Meter D0** – Live-Zählerstände über optische IEC 62056-21-Schnittstelle

### Legacy-Geräte 🔄 (lokaler MQTT-Modus über Zendure Cloud Disconnector)

- HUB 1200, HUB 2000, Hyper 2000, AIO 2400, ACE 1500 – alle unterstützen den lokalen Modus und können weiterhin Daten an die Cloud weiterleiten.

**Vorteile des lokalen Modus:** Es werden keine Daten an Zendure-Server gesendet (die Übertragung per Relay wird empfohlen), direkte/schnellere MQTT-Kommunikation, vollständige Offline-Automatisierung und Cloud-Relay kann jederzeit wieder aktiviert werden. Firmware-Updates über die offizielle App/Bluetooth funktionieren weiterhin.

## Offline-Modus (Verbindung zur Zendure Cloud trennen) für ältere Geräte

⚠️ **Garantiehinweis:** Das direkte Ändern des MQTT-Servers auf dem Gerät (über Bluetooth-Tools oder DNS-Umleitung) wird nicht offiziell unterstützt und **führt zum Verlust der Gerätegarantie** . Die Durchführung erfolgt auf eigene Gefahr.

Um ein älteres Gerät von der Cloud zu trennen, verwenden Sie den [Solarflow Bluetooth Manager](https://github.com/reinhard-brandstaedter/solarflow-bt-manager) von Reinhard Brandstätter oder meinen [Zendure Cloud Disconnector](https://github.com/nograx/zendure-cloud-disconnector) – beide legen die MQTT-URL des Geräts per Bluetooth fest. Alternativ können Sie DNS-Anfragen für „mq.zen-iot.com“ über Ihren Router an Ihren eigenen MQTT-Server umleiten.

**Hinweis:** Diese Bluetooth-Tools funktionieren nur für **ältere Geräte** . Verwenden Sie für **zenSDK** -Geräte stattdessen die offizielle Offline-Methode von Zendure.

Beide Tools erzwingen den Standard-MQTT-Port (1883 oder 8883 mit SSL) und erfordern, dass die Authentifizierung auf Ihrem Server deaktiviert ist, da das Gerät ein fest codiertes Passwort verwendet. Sie können dies mit Ihrem Cloud-Authentifizierungsschlüssel kombinieren oder den vollständigen lokalen Modus verwenden.

## Wichtig

Um das Laden/Einspeisen per Skript oder Blockly zu steuern, verwenden Sie di&#x65;** `setDeviceAutomationInOutLimit` ** Steuerparameter – er steuert das Gerät, ohne in den Flash-Speicher zu schreiben. Negative Werte lösen das Laden über das Stromnetz aus.

## Adapterautomatisierung (Null-Einspeisungssteuerung)

Der Adapter verfügt über einen integrierten Nulleinspeiseregler. Er liest Ihren Netzzähler aus und passt die Einspeisung kontinuierlich an. `setDeviceAutomationInOutLimit` Alle beteiligten Geräte werden so gesteuert, dass die Netzleistung nahe an einem konfigurierbaren Sollwert bleibt – ein externes Skript ist nicht erforderlich. Es funktioniert sowohl mit einzelnen Geräten als auch mit mehreren Geräten gleichzeitig.

### Aufstellen

1. Öffnen Sie die Adaptereinstellungen, Abschnitt **Automatisierung** , und aktivieren Sie **die Option Adapterautomatisierung aktivieren** .
2. Wählen Sie den **Triggerzustand** : einen Zustand Ihres Stromnetzes/Smart Meters mit der aktuellen Netzleistung in Watt ( **positiv = Netzbezug, negativ = Netzeinspeisung** ). Jede Änderung dieses Zustands löst einen Regelzyklus aus, daher sollte er häufig aktualisiert werden (ideal sind 1–5 Sekunden).
3. Speichern – der Adapter startet neu und erstellt die `adapterAutomation` Staaten.
4. Aktivieren Sie die Automatisierung für jedes Gerät, das gesteuert werden soll: `<productKey>.<deviceKey>.adapterAutomation.automationEnabled = true` Die
5. Schalten Sie den globalen Schalter ein. `adapterAutomation.automationEnabled = true` Die

⚠️ Solange die Automatisierung für ein Gerät aktiv ist, schreiben Sie nicht `setDeviceAutomationInOutLimit` Ihre eigenen Skripte für dieses Gerät werden von der Automatisierung überschrieben. Geräte mit `automationEnabled = false` bleiben völlig unberührt.

### Staaten

Global (`zendure-solarflow.X.adapterAutomation.*`):

| Zustand                          | Standard | Beschreibung                                                                                                                                                                                                                                                     |
| -------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `automationEnabled`              | `false`  | Globaler Ein-/Ausschalter für die Automatisierung.                                                                                                                                                                                                               |
| `setPoint`                       | `10`     | Ziel-Netzleistung in W. Ein kleiner positiver Wert (geringe Importmenge) vermeidet die Einspeisung ins Netz.                                                                                                                                                     |
| `setPointNearlyFull`             | `-100`   | Zielnetzleistung in W, verwendet anstelle von `setPoint` Wenn alle Batterien mindestens 90 % geladen sind und Solarstrom eingespeist wird. Negative Werte ermöglichen die Einspeisung ins Stromnetz.                                                              |
| `acOnlyPenalty`                  | `50`     | Der Vorsprung eines reinen Netzbetriebsgeräts wird in Prozent angegeben, um den es gegenüber anderen Geräten benötigt, um zum führenden Gerät zu werden, sobald der durchschnittliche Ladezustand der anderen Geräte über 35 % liegt. `0` deaktiviert die Strafe. |
| `surplusChargeTrigger`           | `100`    | Netzexport in Watt über den Sollwert hinaus, ab dem im Leerlauf befindliche, nur netzbetriebene Geräte mit Überschussenergie zu laden beginnen. Minimum `30` Die                                                                                                  |
| `ignoreSuggestedInverseMaxPower` | `false`  | Wenn `true`, das Gerät `inverseMaxPower` wird als Maximalwert anstelle des empfohlenen Werts verwendet (siehe unten).                                                                                                                                             |
| `deviceOrder`                    |          | Schreibgeschützt. Aktuelle Gerätereihenfolge, das erste Gerät ist das führende Gerät.                                                                                                                                                                            |

Pro Gerät (`<productKey>.<deviceKey>.adapterAutomation.*`):

| Zustand                        | Beschreibung                                                                                                                                                                                                                                                             |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `automationEnabled`            | Dieses Gerät in die Automatisierung einbeziehen (Standardeinstellung) `false`).                                                                                                                                                                                          |
| `forceAcCharging`              | Laden Sie dieses Gerät am Stromnetz vollständig auf. `chargeMaxLimit` bis es voll ist, unabhängig von der aktuellen Nachfrage (Standardeinstellung) `false`).                                                                                                             |
| `acChargingAllowed`            | Nur für Geräte, die über Netzstrom geladen werden können, aber nicht ausschließlich für Netzstrom ausgelegt sind (z. B. SF 800/2400 Pro, Hyper 2000): Laden Sie dieses Gerät mit überschüssigem Netzstrom wie ein reines Netzstromgerät (Standardeinstellung). `false`). |
| `suggestedInverseMaxPower`     | Nur lesbar. Die maximale Ausgangsleistung, die die Automatisierung für dieses Gerät verwendet, wird aus dem Ladezustand (SOC) und der niedrigsten Zellspannung berechnet, um die Batterie zu schützen.                                                                   |
| `suggestedInverseMaxPowerInfo` | Schreibgeschützt. Grund für den aktuell vorgeschlagenen Wert.                                                                                                                                                                                                            |
| `status`                       | Schreibgeschützt. Was die Automatisierung aktuell von diesem Gerät erwartet (z. B. Einspeisung, Standby, Laden aus Überschuss), in der Systemsprache von ioBroker (Deutsch oder Englisch).                                                                               |

### So funktioniert es

- **PI-Regler:** Die benötigte Leistung wird aus dem aktuellen Stromverbrauch (Netzstrom + aktuelle Leistung) zuzüglich einer PI-Korrektur zum Sollwert berechnet. Innerhalb eines kleinen Totbereichs (Sollwert zu Sollwert + 10 W) wird nichts verändert, um ständige Nachjustierungen zu vermeiden.
- **Leistungsverteilung:** Die benötigte Leistung wird gewichtet nach ihrem SoC-Wert auf die aktiven Geräte verteilt – Geräte mit höherem SoC-Wert erhalten einen größeren Anteil. Geräte mit einem niedrigeren SoC-Wert erhalten einen größeren Anteil. `minSoc` Sie erhalten keinen Anteil. Leistung, die ein Gerät nicht liefern kann (über seinem Maximum), wird an Geräte mit ausreichender Leistungsreserve weitergeleitet.
- **Leitgerät:** Die Geräte werden nach Ladezustand (SOC) und Solarstromaufnahme sortiert (Neusortierung stündlich). Das Leitgerät ist immer aktiv; weitere Geräte werden hinzugefügt, wenn der Bedarf steigt (über 70 % Auslastung der aktiven Geräte) oder wenn diese fast voll sind. Nach dem Hinzufügen bleiben die Geräte mindestens 5 Minuten aktiv, um ein Flattern zu vermeiden. Inaktive Geräte werden für einige Minuten im 10-W-Standby-Modus gehalten, um eine schnellere Reaktion zu ermöglichen.
- **Batterieschutz:** `suggestedInverseMaxPower` Die Leistung wird bei niedrigem Ladezustand (SOC) bzw. niedriger Zellspannung begrenzt (z. B. nur 60–500 W bei schwachen Zellen). Nachts (0–5 h) wird die Leistungsbegrenzung vom Ladezustand abgeleitet. Sie überschreitet niemals die maximale Leistung des Geräts. `inverseMaxPower` Die
- **Netzbetriebene Geräte** (z. B. SF 2400 AC, SF 1600 AC+, SF 3000/4000 Mix AC+) werden weniger bevorzugt als Hauptgerät eingesetzt, sobald die anderen Batterien über 35 % geladen sind. Wenn der Netzzähler einen Überschuss anzeigt (mindestens 35 % eingespeiste Energie), …`surplusChargeTrigger` W über dem Sollwert (Standardwert 100 W), im Leerlauf befindliche AC-Geräte (und Geräte mit `acChargingAllowed`) mit diesem Überschuss belasten, bis zu ihrem `chargeMaxLimit` (Leistung in W).
- **Ladesicherheit:** Das Gerät schaltet erst dann in den Lademodus, wenn es mindestens 5 Minuten lang mit 0 W im Leerlauf war. Es wechselt also nicht direkt zwischen Entladen und Laden.

## Anmerkungen

Dieser Adapter authentifiziert sich auf den offiziellen MQTT-Servern mithilfe des Cloud-Autorisierungscodes, den Sie in der Zendure-App generieren können.

### Sentry (Fehlerberichterstattung und Gerätestatistik)

Dieser Adapter nutzt Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an den Entwickler zu melden. Zusätzlich sendet er 5 Minuten nach dem Start und anschließend einmal alle 24 Stunden anonyme Gerätestatistiken: ein Ereignis pro verwendeter Geräteklasse, das lediglich Geräteklasse, Produktschlüssel, Produktname und Verbindungsmodus enthält. Es werden keine Geräteschlüssel, Seriennummern, IP-Adressen oder Anmeldeinformationen übertragen. Diese Statistiken helfen dabei, die verwendeten Geräte zu erkennen und fehlende Unterstützung aufzudecken.

Weitere Details und Informationen zur Deaktivierung der Fehlerberichterstattung finden Sie in der [Dokumentation des Sentry-Plugins](https://github.com/ioBroker/plugin-sentry#plugin-sentry) . Die Sentry-Fehlerberichterstattung wird ab js-controller 3.0 verwendet.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- zenSDK devices: smartMode is no longer turned off in standby (automation limit 0), Note: Currently it'S uncertain whether a permanently enabled smartMode increases the device's standby consumption.

### 6.0.0-alpha.7 (2026-10-06)

- (Schattenwelt) Add setting "zenSDK devices by IP address": zenSDK devices can be configured by IP address, so they also work if mDNS doesn't reach them (e.g. devices in another network segment / VLAN). Known devices are matched by serial number and keep their states, unknown devices are created with their serial number as key.
- Zero-feed in: charging devices are now accounted with their measured AC input power (gridInputPower) instead of their commanded charge limit once settled. Fixes grid import when a nearly full battery charges with much less power than requested (e.g. 80 W instead of 600 W).
- Output limit can now be set on devices without an autoModel state (previously rejected because autoModel was not '0').

### 6.0.0-alpha.6 (2026-10-06)

- Better tracking if device command is accepted
- Wait for wake up of specific device - don't set the whole script to sleep

### 6.0.0-alpha.5 (2026-10-04)

- zenSDK devices: in standby (automation limit 0), smartMode is now only turned off after at least 10 minutes and only when solar input is below 50 W and the battery level is below 98%. This is checked every minute, so the internal inverter stays on and the device reacts faster when the limit changes again.
- zenSDK devices: smartMode is now enabled before acMode when switching to charging/discharging, so these writes go to RAM instead of flash.

### 6.0.0-alpha.4 (2026-10-01)

- Zero-feed in: non-lead devices no longer get pulled out of idle into 30/10 W standby for a tiny share, and fully charged devices without solar input are released from standby to 0 W.
- Zero-feed in: devices are no longer added as extra feed-in device just because they have more than 100 W solar input.

### 6.0.0-alpha.3 (2026-10-01)

- Remove 0-5h reduction of suggested inverseMaxPower as this was related to Octopus Energy in personal setup.

For older changes see CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 Peter Frommert <peter.frommert@outlook.com>

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