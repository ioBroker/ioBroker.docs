---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.zendure-solarflow/README.md
title: ioBroker.zendure-solarflow
hash: DtJpV3VgTyGUvIfZ5JYIUTp0cRCEUpFS8hSwdV6ORbM=
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

- Solarflow 1600 AC Plus, 2400 AC, 2400 AC Plus, 2400 Pro, 800, 800 Plus, 800 Pro, 3000 Mix AC+
- Solarflow 4000 Mix AC+, 4000 Mix Pro _(noch kein Cloud-Produktschlüssel vorhanden – hinzugefügt nur über [mDNS-Erkennung](#mdns-discovery) )_

### Smart-Meter-Zubehör 📊 (nur lesbar, nur zenSDK/mDNS)

- **Smart Meter 1CT** – Spannung einer einzelnen Phase über einen Stromwandler
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

| Zustand                           | Standard | Beschreibung                                                                                                                                                                                                                                                     |
| --------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `automationEnabled`               | `false`  | Globaler Ein-/Ausschalter für die Automatisierung.                                                                                                                                                                                                               |
| `setPoint`                        | `10`     | Ziel-Netzleistung in W. Ein kleiner positiver Wert (geringe Importmenge) vermeidet die Einspeisung ins Netz.                                                                                                                                                     |
| `setPointNearlyFull`              | `-100`   | Zielnetzleistung in W, verwendet anstelle von `setPoint` Wenn alle Batterien mindestens 90 % geladen sind und Solarstrom eingespeist wird. Negative Werte ermöglichen die Einspeisung ins Stromnetz.                                                              |
| `acOnlyPenalty`                   | `50`     | Punktevorsprung in Prozent, dass nur AC-Geräte (und Geräte mit `acChargingAllowed`) muss gegenüber den anderen Geräten zum führenden Gerät werden, sobald der durchschnittliche Ladezustand (SOC) der anderen Geräte über 35 % liegt. `0` deaktiviert die Strafe. |
| `surplusChargeTrigger`            | `100`    | Netzexport in Watt über den Sollwert hinaus, ab dem im Leerlauf befindliche, nur netzbetriebene Geräte mit Überschussenergie zu laden beginnen. Minimum `30` Die                                                                                                  |
| `minIdleBeforeCharge`             | `60`     | Zeit in Sekunden, die ein Gerät im Leerlauf sein muss (weder lädt es noch Strom empfängt), bevor der Ladevorgang beginnen kann. Minimum `5` Die                                                                                                                   |
| `ignoreSuggestedInverseMaxPower`  | `false`  | Wenn `true`, das Gerät `inverseMaxPower` wird als Maximalwert anstelle des empfohlenen Werts verwendet (siehe unten).                                                                                                                                             |
| `suggestedInverseMaxPowerPerPack` | `false`  | Wenn `true` Die festgelegten Leistungsstufen der empfohlenen maximalen Ausgangsleistung (60-500 W) gelten pro Akku und werden mit der Leistung des Geräts multipliziert. `packNum` Die                                                                             |
| `deviceOrder`                     |          | Schreibgeschützt. Aktuelle Gerätereihenfolge, das erste Gerät ist das führende Gerät.                                                                                                                                                                            |

Pro Gerät (`<productKey>.<deviceKey>.adapterAutomation.*`):

| Zustand                        | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `automationEnabled`            | Dieses Gerät in die Automatisierung einbeziehen (Standardeinstellung) `false`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `forceAcCharging`              | Laden Sie dieses Gerät vollständig über das Stromnetz auf. `chargeMaxLimit` bis es voll ist, unabhängig von der aktuellen Nachfrage (Standardeinstellung) `false`).                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `acChargingAllowed`            | Nur für Geräte, die über Netzstrom geladen werden können, aber nicht ausschließlich für Netzstrom ausgelegt sind (z. B. SF 800/2400 Pro, Hyper 2000): Laden Sie dieses Gerät mit überschüssigem Netzstrom wie ein reines Netzstromgerät (Standardeinstellung). `false`).                                                                                                                                                                                                                                                                                                                                         |
| `disableAcCharging`            | Nur für Geräte, die ausschließlich mit Netzstrom betrieben werden (z. B. SF 2400 AC, SF 1600 AC+, SF 3000/4000 Mix AC+): Die Hausautomation lädt dieses Gerät niemals aus dem Netz – weder aus Überschuss noch durch …`forceAcCharging` Ein Gerät, das gerade geladen wird, stoppt sofort bei 0 W (Standardeinstellung). `false`).                                                                                                                                                                                                                                                                               |
| `feedInSolarOnly`              | Nicht für Geräte mit reinem Netzbetrieb: Die Solarstromzufuhr sollte maximal der aktuellen Eingangsleistung entsprechen, damit der Akku nicht entladen wird. **Hinweis:** Dies gilt nur bei einer Solarstromzufuhr von über 50 W. Bei einer Eingangsleistung von 50 W oder darunter (z. B. nachts) kann das Gerät wie gewohnt Strom aus dem Akku beziehen (Standardeinstellung). `false` Der Adapter schaltet ihn nie von selbst um – Sie können dies über ein eigenes Skript einstellen, z. B. während eines Niedrigpreisfensters eines dynamischen Stromtarifs, um die Batterie für teurere Stunden zu schonen. |
| `suggestedInverseMaxPower`     | Nur lesbar. Die maximale Ausgangsleistung, die die Automatisierung für dieses Gerät verwendet, wird aus dem Ladezustand (SOC) und der niedrigsten Zellspannung berechnet, um die Batterie zu schützen.                                                                                                                                                                                                                                                                                                                                                                                                           |
| `suggestedInverseMaxPowerInfo` | Schreibgeschützt. Grund für den aktuell vorgeschlagenen Wert.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `status`                       | Schreibgeschützt. Statuscode der aktuellen Anweisung der Automatisierung an dieses Gerät (siehe Tabelle unten).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `lastCalibration`              | Schreibgeschützt. Zeitstempel des letzten Zeitpunkts, an dem das Gerät 100 % SOC erreicht hat (der SOC wird dann kalibriert).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `timeSinceLastCalibration`     | Schreibgeschützt. Tage und Stunden seit `lastCalibration` z.B. `3d 5h` (wird jede Minute aktualisiert).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

Statuscodes von `<device>.adapterAutomation.status` Die Etiketten (`common.states`) sind in der ioBroker-Systemsprache (Deutsch oder Englisch) angegeben. Die Variante des führenden Geräts einer Aufgabe ist ihr Code + 1 (`code % 10 === 1`).

| Code         | Status                                                                                              |
| ------------ | --------------------------------------------------------------------------------------------------- |
| `0`          | Automatisierung global deaktiviert                                                                  |
| `1`          | Automatisierung für dieses Gerät deaktiviert                                                        |
| `2`          | Warten auf eine Änderung des Automatisierungsauslöserstatus                                         |
| `10` /`11`   | Fütterung                                                                                           |
| `20` /`21`   | Stehen zu                                                                                           |
| `30` /`31`   | Aufladen aus Überschuss                                                                             |
| `40` /`41`   | Aufrechterhaltung der Ladung                                                                        |
| `50` /`51`   | Zwangsladung                                                                                        |
| `60` /`61`   | Warten Sie, bevor der Ladevorgang beginnen kann (siehe `minIdleBeforeCharge`)                       |
| `70` /`71`   | Warten auf Überschussladung                                                                         |
| `80` /`81`   | Vollständig geladen, im Leerlauf                                                                    |
| `90` /`91`   | Leerlauf                                                                                            |
| `100` /`101` | Leerlauf, Batterie mit minimalem Ladezustand (`minSoc`)                                            |
| `110` /`111` | Leerlauf, keine Ausgangsleistung verfügbar (`suggestedInverseMaxPower` oder `inverseMaxPower` ist 0) |
| `120` /`121` | Leerlauf, SOC-Kalibrierung läuft (`socStatus` ist 1)                                                |

### So funktioniert es

- **PI-Regler:** Die benötigte Leistung wird aus dem aktuellen Stromverbrauch (Netzstrom + aktuelle Leistung) zuzüglich einer PI-Korrektur zum Sollwert berechnet. Innerhalb eines kleinen Totbereichs (Sollwert zu Sollwert + 10 W) wird nichts verändert, um ständige Nachjustierungen zu vermeiden.
- **Leistungsverteilung:** Die benötigte Leistung wird gewichtet nach ihrem SoC-Wert auf die aktiven Geräte verteilt – Geräte mit höherem SoC-Wert erhalten einen größeren Anteil. Geräte mit einem niedrigeren SoC-Wert erhalten einen größeren Anteil. `minSoc` Sie erhalten keinen Anteil. Leistung, die ein Gerät nicht liefern kann (über seinem Maximum), wird an Geräte mit ausreichender Leistungsreserve weitergeleitet.
- **Leitgerät:** Die Geräte werden nach Ladezustand (SOC) und Solarstromaufnahme sortiert (Neusortierung stündlich). Das Leitgerät ist immer aktiv; weitere Geräte werden hinzugefügt, wenn der Bedarf steigt (über 70 % Auslastung der aktiven Geräte) oder wenn diese fast voll sind. Nach dem Hinzufügen bleiben die Geräte mindestens 5 Minuten aktiv, um ein Flattern zu vermeiden. Inaktive Geräte werden für einige Minuten im 10-W-Standby-Modus gehalten, um eine schnellere Reaktion zu ermöglichen.
- **Batterieschutz:** `suggestedInverseMaxPower` begrenzt die Leistung bei niedrigem Ladezustand / niedriger Zellspannung (z. B. nur 60–500 W bei schwachen Zellen, optional pro Akkupack) `suggestedInverseMaxPowerPerPack`) und nachts (0-5 h) wird der Grenzwert aus dem Ladezustand (SOC) abgeleitet. Er überschreitet niemals den Grenzwert des Geräts. `inverseMaxPower` Die
- **Netzbetriebene Geräte** (z. B. SF 2400 AC, SF 1600 AC+, SF 3000/4000 Mix AC+) werden weniger bevorzugt als Hauptgerät eingesetzt, sobald die anderen Batterien über 35 % geladen sind. Wenn der Netzzähler einen Überschuss anzeigt (mindestens 35 % eingespeiste Energie), …`surplusChargeTrigger` W über dem Sollwert (Standardwert 100 W, kontinuierlich für 30 Sekunden), im Leerlauf befindliche AC-Geräte (und Geräte mit `acChargingAllowed`) mit diesem Überschuss belasten, bis zu ihrem `chargeMaxLimit` (Leistung in W).
- **Ladeaufteilung:** Der Überschuss wird so aufgeteilt, dass die Gesamtladeleistung jedes Geräts (Netzstrom plus eigener Solareingang) anhand seines fehlenden Ladezustands (SOC) und seiner Akkukapazität gewichtet wird. Ein Gerät, das bereits durch seinen eigenen Solareingang geladen wird, erhält weniger Netzstrom, der Rest geht an die anderen Geräte. Die Kapazität wird von den angeschlossenen Akkus abgeleitet (nur verwendet, wenn sie für alle Ladegeräte bekannt ist). Beim Hyper 2000 ist die Netzladeleistung zusätzlich durch die Gesamtladeleistung (Netzstrom + Solar) seiner Akkukonfiguration begrenzt: 950 W mit einem AB1000, 1200 W mit einem AB2000, 1600 W mit zwei oder mehr Akkus.
- **Ladesicherheit:** Ein Gerät schaltet erst dann in den Lademodus, wenn es mindestens eine Minute lang im Leerlauf mit 0 W betrieben wurde. `minIdleBeforeCharge` Sekunden (standardmäßig 60), sodass es nicht direkt zwischen Entladen und Laden umschaltet. Sobald ein Überschuss bestätigt ist, wird ein im Feed-In-Standby wartendes Gerät freigegeben. `minIdleBeforeCharge` statt 3 Minuten, damit der Ladevorgang beginnen kann.
- **Laderegelung:** Die Ladeleistung wird direkt aus dem Netzwert ohne Berücksichtigung der Eigenladeleistung der Geräte berechnet, sodass der Überschuss in ein bis zwei Schritten erreicht wird. Nach jeder Änderung wird der Wert gehalten, bis die Geräte ihre neue Ladeleistung erreicht und gemeldet haben (10–30 s); eine deutliche Netzentnahme (über 300 W) reduziert sie sofort.

## Anmerkungen

Dieser Adapter authentifiziert sich auf den offiziellen MQTT-Servern mithilfe des Cloud-Autorisierungscodes, den Sie in der Zendure-App generieren können.

### Sentry (Fehlerberichterstattung und Gerätestatistik)

Dieser Adapter nutzt Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an den Entwickler zu melden. Zusätzlich sendet er 5 Minuten nach dem Start und anschließend alle 24 Stunden anonyme Gerätestatistiken: ein Ereignis pro verwendeter Geräteklasse, das lediglich Geräteklasse, Produktschlüssel, Produktname und Verbindungsmodus enthält. Es werden keine Geräteschlüssel, Seriennummern, IP-Adressen oder Anmeldeinformationen übertragen. Diese Statistiken helfen dabei, die verwendeten Geräte zu erkennen und fehlende Unterstützung aufzudecken.

Weitere Details und Informationen zur Deaktivierung der Fehlerberichterstattung finden Sie in der [Dokumentation des Sentry-Plugins](https://github.com/ioBroker/plugin-sentry#plugin-sentry) . Die Sentry-Fehlerberichterstattung wird ab js-controller 3.0 verwendet.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 6.4.1 (2026-11-11)

- Adapter automation: Improved AC surplus charge control - grid import while charging (> 100 W) now cuts the charge budget right away, a lasting grid export during charging is corrected, and the lead device no longer feeds battery power into the grid at its standby while other devices charge from surplus

### 6.4.0 (2026-11-11)

- suggestedInverseMaxPower: The reason now states when the value is held at the minSoc hysteresis and at which SOC it is released
- Adapter automation: Fixed AC surplus charging with several devices staying "held" and never ramping up (#325) - while the charge budget is held, the devices keep their limits instead of re-splitting it every cycle, the hold is released after 30 s at the latest, and charge limit changes below 10 W / 5% are no longer sent
- Adapter automation: New global setting `suggestedInverseMaxPowerPerPack` (default `false`) - if enabled, the fixed power tiers of suggestedInverseMaxPower (60-500 W) are multiplied by the device's `packNum`

### 6.3.2 (2026-11-09)

- Adapter automation: Fixed energy being moved from one battery into another - battery feed-in of a device was counted as surplus, so AC-only devices charged from it
- Adapter automation: A charge keep-alive alone no longer keeps surplus charging running without a confirmed surplus, so it is released after 3 minutes as intended

### 6.3.1 (2026-11-09)

- Smart Meter 3CT announced via mDNS as `smartMeter3CT-S` is now auto-created
- Solarflow 3000 Mix AC+, 4000 Mix AC+ and 4000 Mix Pro: `acMode` is no longer reset to 0 by the device automation (standby via zenSDK, and HEMS initialization)
- zenSDK devices: New control state `control.chargeMaxLimit` to set the highest acceptable charge power (100 W up to the device's maximum input power)

### 6.3.0 (2026-11-05)

- Adapter automation: A device running its SOC calibration (`socStatus` is 1) is removed from feed-in (new status code `120`)
- Adapter automation: New per-device states `lastCalibration` (set when the device reaches 100% SOC) and `timeSinceLastCalibration` (days and hours since then)

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