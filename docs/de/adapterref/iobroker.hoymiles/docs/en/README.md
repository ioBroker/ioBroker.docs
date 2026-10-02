---
chapters: {"pages":{"en/adapterref/iobroker.hoymiles/README.md":{"title":{"en":"ioBroker.hoymiles"},"content":"en/adapterref/iobroker.hoymiles/README.md"},"en/adapterref/iobroker.hoymiles/docs/en/README.md":{"title":{"en":"ioBroker.hoymiles — Hoymiles HMS microinverters and HAT hybrid inverters"},"content":"en/adapterref/iobroker.hoymiles/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hoymiles/docs/en/README.md
title: ioBroker.hoymiles - Hoymiles HMS-Mikrowechselrichter und HAT-Hybridwechselrichter
hash: mqHecXDnZeFg4PyB9XelKlbmxFkKnuG5mfqhwm1CYm4=
---
![Logo](../../../../../en/adapterref/iobroker.hoymiles/admin/hoymiles.png)

# IoBroker.hoymiles - Hoymiles HMS-Mikrowechselrichter und HAT-Hybridwechselrichter
## Unterstützte Wechselrichter
Dieser Adapter ist für **Hoymiles HMS Mikro-Wechselrichter mit integriertem WiFi (oder WiFi + Bluetooth) DTU** (DTUBI) konzipiert.

**Lokal (TCP)** = direkte TCP/Protobuf-Verbindung über Port 10081 (WiFi-Modelle). **Lokal (BLE)** = lokale Bluetooth-Verbindung über [ESPHome Bluetooth-Proxy](https://esphome.io/projects/?type=bluetooth) (WB-Serie). **Cloud** = S-Miles Cloud API - automatische Erkennung, Echtzeitdaten (schneller Burst-Kanal ~1,5-3 s), Energieaggregate, Netzprofil, Wechselrichter ein/aus + Neustart, DTU-Neustart.

| Modell | Zeichenketten | Lokal (TCP) | Lokal (BLE)² | Cloud | Status |
|-------|:---:|:---:|:---:|:---:|--------|
| HMS-300W-1T | 1 | ✅ | - | ✅ | Ungetestet |
| HMS-350W-1T | 1 | ✅ | - | ✅ | Ungetestet |
| HMS-400W-1T | 1 | ✅ | - | ✅ | **Getestet** (Lokal + Cloud-Relay, DTU-Firmware V01.01.01) |
| HMS-450W-1T | 1 | ✅ | - | ✅ | Ungetestet |
| HMS-500W-1T | 1 | ✅ | - | ✅ | Ungetestet |
| HMS-600W-2T | 2 | ✅ | - | ✅ | Ungetestet |
| HMS-700W-2T | 2 | ✅ | - | ✅ | Ungetestet |
| HMS-800W-2T | 2 | ✅ | - | ✅ | **Getestet** (Lokal + Cloud; lokales + Cloud-Relay auch mit DTU-Firmware V01.01.01) |
| HMS-900W-2T | 2 | ✅ | - | ✅ | Ungetestet |
| HMS-1000W-2T | 2 | ✅ | - | ✅ | **Geprüft** (Lokal) |
| HMS-1600DW-4T | 4 | ✅ | - | ✅ | Ungetestet |
| HMS-1800DW-4T | 4 | ✅ | - | ✅ | Ungetestet |
| HMS-2000DW-4T | 4 | ✅ | - | ✅ | Ungetestet |
| HMS-600-2WB | 2 | ❌¹ | ✅ | ✅ | Ungetestet |
| HMS-700-2WB | 2 | ❌¹ | ✅ | ✅ | Ungetestet |
| HMS-800-2WB | 2 | ❌¹ | ✅ | ✅ | **Getestet** (Cloud; BLE-Gateway-Pfad in der Testphase) |
| HMS-900-2WB | 2 | ❌¹ | ✅ | ✅ | Ungetestet |
| HMS-1000-2WB | 2 | ❌¹ | ✅ | ✅ | Ungetestet |
| HMS-1600-4WB | 4 | ❌¹ | ✅ | ✅ | Ungetestet |
| HMS-1800-4WB | 4 | ❌¹ | ✅ | ✅ | Ungetestet |
| HMS-2000-4WB | 4 | ❌¹ | ✅ | ✅ | Ungetestet |

¹ Die **WB-Serie** (verkauft als **„HiFlow Pro“**) verfügt über keinen lokalen TCP-Port - ihr einziger lokaler Kanal ist Bluetooth LE. Sie erreichen sie entweder **lokal über Bluetooth** (Spalte *Lokal (BLE)*) oder über die **Cloud**. Alle WB-Modelle basieren auf derselben Plattform; bisher wurde nur das Modell HMS-800-2WB getestet.

² **Lokale (BLE)** Modelle benötigen [ESPHome Bluetooth-Proxy (ein günstiger ESP32) in Ihrem Netzwerk - der Adapter liest und steuert den Wechselrichter dann lokal über Bluetooth, ohne Cloud. Siehe [BLE-Gateway (ESPHome)](https://esphome.io/projects/?type=bluetooth)](#ble-gateway-esphome). WiFi (T) Modelle benötigen dies nicht; sie verwenden den lokalen TCP-Pfad.

**Nur-Cloud-Betrieb:** Jeder unterstützte Wechselrichter in Ihrem S-Miles-Konto funktioniert auch ohne lokale Verbindung. Der Adapter erkennt ihn automatisch und stellt Echtzeit-Leistungsdaten (Burst-Kanal), Energieaggregate, Netzprofil sowie die Befehle zum Ein-/Ausschalten und Neustarten des Wechselrichters (`inverter.active` / `inverter.reboot`) und zum Neustart der DTU (`dtu.reboot`) über die Cloud bereit. Die übrigen Befehle (Leistungsbegrenzung, Sperren, Warnungen löschen usw.) erfordern die lokale TCP-Verbindung.

### Hybrid-Wechselrichter mit Batterie (HAT-Serie) - Cloud, Nur-Lese-Funktion, experimentell
Ein Hoymiles-Hybridwechselrichter in Ihrem S-Miles-Konto - Referenzsystem: HAT-6.0HV-EUG1 mit einer HB-(10-23)S-G2-Batterie, einem Drehstromzähler und einem DTS-WIFI-G1 - wird über die Cloud ausgelesen: Drehstromwerte, Notstromleistung (EPS), PV-Einspeisung, detaillierte Batterieinformationen (Ladezustand und Zustand, Zell- und Modul-Extremwerte) sowie der Leistungsfluss und die Energiebilanz der Anlage für heute, diesen Monat, dieses Jahr und die gesamte Lebensdauer - Netzeinspeisung und -einspeisung, direkt genutzte PV-Leistung, Verbrauch, Batterieladung und -entladung sowie der Selbstversorgungsgrad. Zusätzlich werden die Werte aus dem Tab „Produktion & Verbrauch“ der S-Miles-App sowie die Einnahmen- und Kostendaten der Cloud angezeigt. Unterhalb des Wechselrichters finden Sie außerdem die aktuellen Kurven für Wechselstrom, Batterieleistung und Ladezustand, die Alarmliste der Cloud sowie, bei Bedarf vom Gerät abrufbar, die Batterie- und potentialfreien Kontakteinstellungen (Relais). Die Bundesstaaten finden Sie unter Hybrid-Wechselrichter. Die **Messpunkte** der Anlage - Netzzähler, Verbraucher, ein PV-Zähler an einem Wechselrichter eines Drittanbieters, ein Generator - werden ebenfalls erfasst und unterhalb der Station angezeigt; siehe Stationsmesspunkte. Diese funktionieren für jede Anlage, für die die Cloud Daten liefert, nicht nur für Hybrid-Wechselrichter.

**Lesen, nicht Steuern.** Betriebsmodus und Batterieeinstellungen werden angezeigt (`<dtuSerial>.battery.*`), können aber nicht geändert werden - der Adapter hat keinen Zustand, der die Funktionsweise des Speichersystems beeinflussen würde. Der Befehl zum Auslesen des Netzprofils, der für Mikro-Wechselrichter entwickelt wurde, wird nicht an einen Hybrid-Wechselrichter gesendet.
Die drei vorhandenen Befehle funktionieren so, wie sie vom S-Miles-Portal gesendet werden. Die Geräteverwaltung des Portals bietet für einen HAT-Wechselrichter die Befehle *Einschalten*, *Herunterfahren* und *Neustart* sowie einen *Neustart* für dessen DTU - dies sind die Adapterbefehle `inverter.active`, `inverter.reboot` und `dtu.reboot`. Für ein Speichersystem werden die Befehle, wie vom Portal angegeben, mit dem Gerätetyp des Wechselrichters und der Speichervariante des DTU-Neustarts gesendet. Die Befehle wurden anhand des Portalcodes verifiziert und nicht auf realer Hardware ausgeführt. Das Herunterfahren eines Speicherwechselrichters deaktiviert auch dessen Backup-Ausgang; verwenden Sie diese Befehle daher mit Bedacht.
- **Erfordert ein Installateur-Konto** (mit Anmeldeberechtigung für global.hoymiles.com). Der zugehörige Endpunkt ist für die S-Miles Home API nicht bekannt.
**Aktualisierungsrate:** Der schnelle Echtzeitkanal funktioniert auch für Speicheranlagen, selbst in reinen Cloud-Umgebungen: PV-, Netz-, Last- und Batterieleistung (`station-<id>.grid.*`) sowie der Ladezustand der Batterie (`<dtuSerial>.battery.soc`) werden etwa alle 10 Sekunden übertragen - gemessen am Referenzsystem. Dies entspricht der tatsächlichen Übertragungsrate des Geräts; häufigeres Abfragen liefert keine zusätzlichen Informationen. Im Gegensatz zu Mikro-Wechselrichtern verfügt der Kanal für Speicheranlagen über keinen gerätespezifischen Modus. Daher folgen alle anderen Daten (Phasen, EPS, PV-Eingänge, Batteriedetails, Zähler) dem regulären Upload des Geräts in die Cloud, etwa alle 5 Minuten.
**Welche Werte werden schnell aktualisiert, welche nicht?** Fünf Werte werden live (etwa alle 10 Sekunden) aktualisiert: `station-<id>.grid.power` (PV), `grid.gridPower`, `grid.loadPower`, `grid.batteryPower` und `<dtuSerial>.battery.soc`. `grid.gridPower` ist der aktuelle Messwert des Netzstromzählers. Alle anderen Werte - einschließlich der phasenspezifischen Werte `gridMeter.*`, `load.*` und `pvMeter.*` - sind nur so aktuell wie der letzte Upload des Geräts in die Cloud (etwa alle 5 Minuten). Weder die Cloud noch das Portal bieten eine schnellere Aktualisierung.
**Vorzeichen.** `grid.gridPower` steht für Import/Export und `grid.batteryPower` für Entladung/Laden, jeweils aus dem Energieflussdiagramm der Cloud. Die Werte pro Gerät und pro Zähler werden von der Cloud übernommen. Beachten Sie, dass der Netzzähler den Import als **negative** Wirkleistung meldet (`gridMeter.power` zeigte −284 W an, während `grid.gridPower` +278 W anzeigte).
- Konzipiert für ein einzelnes System, auf das über das Cloud-Konto des Besitzers zugegriffen wird (danke an BastiBerlin) - bitte melden Sie, was Sie auf Ihrem System sehen.

Dieser Adapter funktioniert **NICHT** mit: HMS-1600/1800/2000-4T ohne "DW", HM-Serie, MI-Serie, externen DTU-Sticks oder HMT-Drehstrommodellen.

## Konfiguration
Öffnen Sie die Adapterkonfiguration in der ioBroker-Admin-Oberfläche.

### Lokale Verbindung (TCP)
| Einstellung | Standard | Beschreibung |
|---------|---------|-------------|
| **Lokale Verbindung aktivieren** | ein | Aktiviert die direkte TCP/Protobuf-Verbindung. Der Adapter hält eine dauerhafte TCP-Verbindung mit Protobuf-Heartbeat aufrecht. |
| **DTU-Geräte** | (leer) | Tabelle der DTU-IP-Adressen/Hostnamen. Fügen Sie pro DTU eine Zeile hinzu. |
| **Datenabfrageintervall** | 5s | Sekunden zwischen Datenanfragen (0-300). Stellen Sie 0 für schnellstmögliche Abfrage ein (~1s pro Zyklus). |
| **Abfragefaktor für Konfiguration/Alarme** | 6 | Konfiguration und Alarme werden in jedem N-ten Datenzyklus abgefragt. |
| **Totzone der Leistungsbegrenzung** | 1 % | Kleinere Änderungen der Leistungsbegrenzung werden nicht an das Gerät gesendet. Jeder Schreibvorgang löscht zwei Flash-Sektoren. 0 = Aus. |
| **Minimales Intervall für die Leistungsbegrenzung** | 60 s | Kürzester Abstand zwischen zwei Schreibvorgängen zur Leistungsbegrenzung. 0 = aus. |
| **Cloud Relay** | ein | Leitet Echtzeitdaten im Auftrag der DTU an die Hoymiles Cloud weiter. Ohne diese Option verhindert die lokale TCP-Verbindung, dass die DTU Daten in die Cloud hochlädt. |

**DTU-Firmware V01.01.01 und höher verschlüsselt die lokale Verbindung.** Der Adapter erkennt dies in der ersten Antwort der DTU und schaltet automatisch auf AES-128-GCM um - eine Konfiguration ist nicht erforderlich. Eine solche DTU kommuniziert auch über TLS (Port 10083) mit der Cloud, und der Cloud-Relay verhält sich genauso: Er verbindet sich immer mit dem Server und Port, für den die DTU selbst konfiguriert ist (`config.serverDomain` / `config.serverPort`), mit TLS auf Port 10083 und unverschlüsseltem TCP auf Port 10081. Ältere Firmware (bis V01.00.07) funktioniert weiterhin wie bisher.

### Cloud-Verbindung (S-Miles)
| Einstellung | Standard | Beschreibung |
|---------|---------|-------------|
| **Cloud aktivieren** | Aus | Hoymiles S-Miles Cloud-API aktivieren |
| **S-Miles-E-Mail** | - | Die E-Mail-Adresse Ihres S-Miles-Kontos |
| **S-Miles-Passwort** | - | Ihr S-Miles-Kontopasswort (verschlüsselt gespeichert) |
| **Schnelle Echtzeitdaten (Cloud)** | Ein | Schnelle Leistungsdaten pro Sekunde aus der Cloud abrufen (derselbe „Burst“-Kanal, den die Live-Ansicht der S-Miles-App verwendet). Bei Wechselrichtern **ohne** lokale Verbindung werden `grid.power` und `pvN.power` etwa alle 1,5-3 Sekunden (servergesteuert) anstatt nur alle ~80 Sekunden aktualisiert; lokal angeschlossene Wechselrichter behalten ihre direkten lokalen Echtzeitdaten. Die **Stationssummen** unter `station-<id>.grid.*` stammen in jeder Konfiguration, auch in einer rein lokalen, aus diesem Kanal - keine lokale Verbindung kann eine stationsweite Aggregation erzeugen, daher greifen sie bei deaktivierter Option auf die langsame Cloud-Abfrage zurück und hinken der Summe der einzelnen Wechselrichter sichtbar hinterher. |

Alle Wechselrichter in Ihrem Cloud-Konto werden automatisch erkannt. Eine manuelle Konfiguration der Seriennummern ist nicht erforderlich.

Beide Verbindungen können gleichzeitig aktiviert werden. Lokale Daten haben Priorität - Cloud-Daten werden verwendet, wenn die DTU offline ist (z. B. nachts).

#### Kontotypen - S-Miles Installateur / Endnutzer / Privatkunden
Der Adapter akzeptiert Konten von allen drei offiziellen Hoymiles-Apps:

- **S-Miles Installer** (`com.hm.hemaiInstall1`)
- **S-Miles Endbenutzer** (`com.hm.hemaiClient1`)
- **S-Miles Home** (`com.hm.balcony`)

Der Login ist ein einzelner v3-Flow, gefolgt von einer Profilprüfung (`region_c → pre-insp → login → probe`):

**Vorabprüfung + Anmeldung** legen die Authentifizierungsvariante fest. Hoymiles hat 2026 alle Konten auf Argon2id (`v=3 + salt`) umgestellt, daher ist `v` kein Profilsignal mehr - Installateur-, Endbenutzer- und Heimkonten verwenden heute alle dieselbe Argon2id-Challenge (Parameter aus der S-Miles Home Android-App: `t=3, m=32 MiB, p=1, hashLen=32, V13`). Die ältere Challenge `md5hex(password).sha256base64(password)` wird als Fallback für Regionen beibehalten, die noch `v=2` verwenden.
- **probe** (`/pvm/.../select_by_page`) entscheidet dann, auf welcher Daten-API-Oberfläche das Konto zugelassen ist:
- Probe akzeptiert → **Installer**-Profil - das Konto funktioniert auf `global.hoymiles.com` und erreicht die vollständige `/pvm/...` Web-API, einschließlich `latitude`/`longitude`/`address`/`local_time`/`status`/`warn_data` und Firmware-Versionszeichenfolgen.
- Anfrage abgelehnt (Server meldet: „Kann nur für die Anmeldung bei der S-Miles Home App verwendet werden“) → **Heimprofil** - vom Server auf `/pvmc/.../*_c` beschränkt. Diese Oberfläche lässt die oben genannten Felder aus, stellt aber einige zusätzliche Informationen bereit (Rückfluss-/Eigenverbrauchsenergie, Strompreis). Der Adapter erstellt **keine** Zustände für die fehlenden Felder - diese erscheinen nur, wenn die zugrunde liegende Antwort den entsprechenden Wert enthält. `latitude`, `longitude` und `address` werden für Heimkonten über den zusätzlichen Endpunkt `pvm-ext/station-ak/find` abgerufen, den die S-Miles Home App selbst verwendet, um die Wetterabfrage aufrechtzuerhalten.

**Hinweis:** `dataeu.hoymiles.com:10081` (einfache, ältere Firmware) und `dataeu.hoymiles.com:10083` (TLS, Firmware V01.01.01 und höher) sind die europäischen Cloud-Relay-Endpunkte, an die DTUs Daten senden - sie sind **keine** Benutzer-Login-Server. Der Adapter verwaltet Cloud-Relay automatisch (siehe *Cloud Relay*).

#### Cloud-Login testen
Klicken Sie im Zweifelsfall auf die Schaltfläche **Cloud-Anmeldung testen** neben dem Passwortfeld. Der Test durchläuft die vier Phasen einmalig mit Ihren aktuellen Anmeldedaten (`region_c`, `pre-insp`, `login`, `probe`) und meldet `v` sowie das Vorhandensein eines Salts aus der Vorabprüfung, ob die Anmeldung ein Token erzeugt hat und welches Profil der Test zugewiesen hat (`installer` / `home`). Das Ergebnis wird protokolliert, sodass Sie es in einen Bugreport im Forum einfügen können. Der Test speichert kein Token und ändert den Adapterstatus nicht.

### BLE-Gateway (ESPHome)
Einige Wechselrichter - die **WB-Serie** (z. B. HMS-800-2WB) - sind nur über **Bluetooth** erreichbar, nicht über Ihr normales Netzwerk. Um sie ohne Cloud-Anbindung zu nutzen, fügen Sie Ihrem Netzwerk eine kleine, kostengünstige Bluetooth-Bridge hinzu (einen **ESPHome Bluetooth-Proxy**). Der Adapter erreicht Ihren Wechselrichter dann über diese Bridge.

**1. Bluetooth-Brücke einrichten.** Flashen Sie einen unterstützten ESP32 mit der fertigen Firmware - verwenden Sie dazu den Link **Bluetooth-Proxy flashen** in den Einstellungen oder <https://esphome.io/projects/?type=bluetooth>. Schließen Sie ihn in der Nähe Ihres Wechselrichters an. Es sind keine weiteren Konfigurationen erforderlich.

**2. Fügen Sie Ihren Wechselrichter hinzu.** Öffnen Sie in den Adaptereinstellungen den Tab **BLE** und aktivieren Sie **BLE-Gateway aktivieren**. Speichern Sie die Einstellungen. Klicken Sie bei eingeschaltetem Wechselrichter auf **Gefundene Wechselrichter hinzufügen**. Ihr Wechselrichter wird nun mit Seriennummer und Adresse in der Tabelle angezeigt. Geben Sie die **PIN** (die am Wechselrichter eingestellte PIN) ein, aktivieren Sie **Aktiv** und speichern Sie die Einstellungen. Fertig - der Adapter verbindet sich.

**Gut zu wissen**

Sie wählen keine Bridge aus. Wenn mehrere vorhanden sind, verwendet der Adapter automatisch diejenige mit dem besten Signal.
- Wenn **Erkannte Wechselrichter hinzufügen** nichts findet, befindet sich kein Wechselrichter in Bluetooth-Reichweite einer Bridge.
Eine falsche PIN schaltet das Gerät erneut aus; der Grund wird im Status „info.bleLastError“ angezeigt. Korrigieren Sie die PIN und speichern Sie die Eingabe, um es erneut zu versuchen.
Wenn der Wechselrichter nachts abgeschaltet wird, wird die Bluetooth-Verbindung getrennt und die Statusinformationen werden als veraltet markiert (`info.connected` = `false`). Der Adapter verbindet sich morgens automatisch wieder. Falls die Bluetooth-Verbindung nicht wiederhergestellt wird, liefert die Cloud die Werte, bis dies der Fall ist - vorausgesetzt, die Cloud-Verbindung ist aktiviert.

### Anschluss eines Energiezählers (Shelly / ecotracker)
Ein über Bluetooth verbundener Wechselrichter (Serie WB) kann einen **Energiezähler** mitnutzen. Dieser zeigt Ihnen nicht nur Ihre Produktion an, sondern auch die ins Netz eingespeisten und aus dem Netz entnommenen Daten. Auf Wunsch drosselt der Wechselrichter seine Leistung, sodass **keine Energie mehr ins Netz eingespeist wird** (Null-Export).

**Voraussetzung:** Der Zähler muss sich im selben Netz befinden und sich dort melden. Der Wechselrichter sucht ihn selbstständig; der gefundene Zähler wird in der Auswahl angezeigt.

**So geht's:** Klicken Sie im *Konfigurationsmanager* auf das Zählersymbol Ihres Wechselrichters. Der Wechselrichter sucht dann automatisch nach Zählern im Netzwerk - wählen Sie einen aus der Liste und anschließend den gewünschten Modus aus.

| Modus | Effekt |
| --- | --- |
| **Aus** | Es werden keine Daten gesendet; eine bestehende Verbindung bleibt unverändert. |
| **Nur Zähler** | Der Wechselrichter liest den Zähler aus. Die Werte erscheinen unter `<serial>.meter.*`, es wird nichts geregelt. |
| **Null-Einspeisung** | Der Wechselrichter behandelt den Zähler zusätzlich als Netzzähler und drosselt seine eigene Leistung, sobald ein Überschuss ins Netz eingespeist würde. |

Die Regelung erfolgt **innerhalb des Wechselrichters** - der Adapter dient lediglich der Einrichtung und Überwachung. Er muss nicht in Betrieb sein, damit er funktioniert.

**Wichtig:** Der Zähler muss sich **via mDNS** im Netzwerk anmelden. Kann der Wechselrichter ihn dort nicht finden, übernimmt er zwar die Einstellung, ruft aber keine Daten ab. Ein Original-Shelly-Zähler erledigt dies standardmäßig; bei einem Emulator (z. B. Uni-Meter) muss dessen mDNS-Dienst aktiv sein.

**Gut zu wissen**

- `meter.gridPower` ist der Netzaustausch: positiv = Import, negativ = Export. Daneben gibt es

`pvPower`, `loadPower`, `storagePower` und `plugPower` - die Aufteilung wird vom Wechselrichter berechnet.

- Pro Phase erhält man `meter.l1Voltage`/`l1Current`/`l1Power` (analog für L2 und L3) plus

`meter.frequency`. Die Leistung ist vorzeichenbehaftet: Ein negatives Vorzeichen bedeutet, dass die Phase aktuell exportiert.

- `meter.connected` zeigt an, ob der Zähler aktuell Strom liefert. Wenn der Wert `false` lautet, ist der Zähler nicht verbunden.

Die Verbindung zum Zähler ist unterbrochen - bestätigen Sie den Modus einfach erneut im Dialog, um die Verbindung wiederherzustellen.

Nur die WB-Serie kann das. Die WiFi(T)-Modelle haben weder einen Zählereingang noch eine Regelung.

Deshalb wird das Symbol dort nicht angezeigt.

## Konfigurationsmanager
Der Adapter integriert sich in den ioBroker **Config Manager**, sodass jeder Wechselrichter und jede Cloud-Station als Karte auf der Registerkarte *Config Manager* in der Admin-Benutzeroberfläche angezeigt wird - mit Live-Status, Steuerelementen und einem Einstellungsdialog, ohne dass Sie Ihre eigene VIS-Ansicht erstellen müssen.

**Was gezeigt wird**

- Jede **DTU/Wechselrichter** (`<dtuSerial>`) und jede **Cloud-Station** (`station-<id>`), die der Adapter erstellt hat.
Eine Live-Verbindungsanzeige (grün/rot) und bei lokal angeschlossenen DTUs die WLAN-Signalqualität in Prozent (0-100 %) werden angezeigt. Der Kartentitel setzt sich aus dem Namen der Station (des Werks), zu der der Wechselrichter gehört - dem Namen, den Sie ihm in der S-Miles-App gegeben haben - und der DTU-Seriennummer (z. B. „Zuhause · 4143A01CEDE4“) zusammen, wodurch jeder Wechselrichter eindeutig identifiziert wird. Ohne Stationszuordnung wird auf den Modellnamen oder die Seriennummer zurückgegriffen.
**Live-Werte direkt auf der Karte:** Aktuelle Leistung (W), heutige Energie (kWh), die tatsächliche Leistung jedes PV-Strings am Wechselrichter (eine Zeile pro String) und die Wechselrichtertemperatur - alles automatisch aktualisiert. Die Stationen zeigen die Gesamtleistung, die **PV-Auslastung in Prozent**, die tägliche, jährliche und Gesamtenergie sowie die täglichen und gesamten Einnahmen in der Währung des Kraftwerks an (die Einnahmenzeilen werden nur angezeigt, wenn in der Cloud ein Strompreis konfiguriert ist).
- Ein Gerätesymbol nach Typ - ein flacher Mikro-Wechselrichter, ein aufrechter Dreiphasen-Wechselrichter (HMT-Reihe) oder eine Station. Dieselben Symbole werden für die Geräteobjekte in der Objektstruktur verwendet.
- Ein **Firmware-Update-Indikator**, wenn die Cloud ein solches Update meldet (von `dtu.fwUpdateAvailable`).
Die Schaltfläche „Mehr“ öffnet ein schreibgeschütztes Detailfenster mit folgenden Bereichen: Wechselrichter (Modell, Seriennummer, Hardware-/Softwareversion), DTU/Firmware (Seriennummer, Firmwareversionen, WLAN-Version, Update-Anzeige), Netzwerk (verwendete Adresse, Signalqualität, SSID, IP- und MAC-Adresse, DNS, DHCP) und Cloud-Server (Domäne, Port). Die Bereiche „Netzwerk“ und „Server“ werden nur für lokal verbundene Geräte angezeigt, da diese Werte ausschließlich über die lokale Verbindung übertragen werden.

Warum werden nicht alle Netzwerkfelder angezeigt? Die Konfigurationsmeldung der DTU deckt die gesamte Hoymiles-DTU-Familie ab. Neben den WLAN-Feldern enthält sie Felder für kabelgebundene Netzwerke (IP, MAC, Subnetzmaske, Gateway, Kabel-DNS) sowie Felder für Mobilfunk (APN, GPRS) und Sub-1-GHz-Funk. Ein HMS-Wechselrichter unterstützt ausschließlich WLAN, daher bleiben seine kabelgebundenen Felder dauerhaft auf `0.0.0.0` und `00:00:00:00:00:00`. Der Adapter blendet alle Felder aus, für die das Gerät keinen gültigen Wert meldet - andernfalls würde das Bedienfeld eine nicht existierende Adresse anzeigen. Ein numerischer Wert `0` bleibt sichtbar: Bei einem Flag wie DHCP bedeutet dies eine Antwort, nicht eine Abwesenheit. Stationen zeigen Kapazität, Status und Adresse an.

**Steuerung und Einstellungen - aufgeteilt nach Persistenz**

Die Karte spiegelt die beschreibbaren Zustände wider, sodass ein Klick über den normalen Befehlspfad geleitet wird (lokale TCP-Verbindung bevorzugt, Cloud-Fallback). Die beiden Dialoge unterscheiden sich strikt danach, **was das Gerät speichert**:

⚠️ Die Persistenz bestimmt die Aufteilung, firmware-verifiziert (`_fwanalysis/POWER_LIMIT_CHAIN_2T.md`): `inverter.powerLimit` (Prozent) wird im Flash-Speicher der DTU und im EEPROM des Wechselrichters gespeichert und benötigt zwei 4-KB-Flash-Sektoren pro Änderung; es handelt sich also um eine Einstellung. `inverter.powerLimitWatt` (Watt, nur HMS-800W-2T-Familie über lokales TCP) verbleibt auf beiden Seiten im RAM und wird nach einem Neustart des Wechselrichters gelöscht; es handelt sich also um eine Steuerungseinstellung.

**Steuerelemente** (Schieberegler-Symbol) - Nichts davon bleibt nach einem DTU-Neustart erhalten:

- **Bedienung (Schalter):** Wechselrichter ein/aus, Wechselrichter verriegeln.
- **Laufzeit:** Leistungsbegrenzung in Watt (nur HMS-800W-2T-Familie über lokales TCP) und Cloud-Sendeintervall. Es wird darauf hingewiesen, dass das Gerät diese Einstellungen beim Neustart vergisst.

Jedem Schieberegler ist sein aktueller Wert und seine Einheit vorangestellt, da diese erst beim Ziehen des Schiebereglers sichtbar werden.

**Einstellungen** (Zahnradsymbol, nur lokale Geräte) - alles, was die DTU speichert:

- Leistungsgrenze, Leistungsfaktorgrenze, Blindleistungsgrenze.
Jedes Feld enthält den Hinweis, dass häufige Änderungen den Gerätespeicher belasten. Im Dialogfeld werden **nur die tatsächlich geänderten Felder** überschrieben - unveränderte Felder bleiben unberührt.

**Kartentasten** (mit Bestätigung): Wechselrichter neu starten, DTU neu starten und - **nur wenn etwas zu bestätigen ist** - Warnungen bestätigen und Erdschluss bestätigen. Die Warntaste wird angezeigt, solange `alarms.hasActive` eingestellt ist; die Erdungstaste nur, solange die Alarmliste einen aktiven Eintrag mit dem Erdschlussalarmcode (182) enthält. Beide werden erst angezeigt, nachdem die Alarmliste gelesen wurde.

Bei der **WB-Serie** wird die Erdungstaste nicht angezeigt: Die Firmware akzeptiert den Befehl, führt ihn aber nachweislich nicht aus (leerer Zweig, Antwort „kein Fehler“). Eine Taste, die Erfolg meldet, aber keine Funktion hat, ist irreführend. Bei der T-Serie wird der Befehl ausgeführt.

**Hinweis zur Admin-Version:** Die Karte verwendet bewusst nur Anzeigefunktionen, die von älteren Admin-Versionen unterstützt werden. Admin 7.8.x liefert die Geräte-Manager-GUI in ihrer `dm-utils 3.0.x`-Form aus, die benutzerdefinierte Statussymbole (`indicators`) noch nicht kennt und diese daher nicht anzeigt. Daher werden WLAN-Qualität und PV-Auslastung in der von jeder Version vorgegebenen Größe angezeigt, und die Bestätigungssymbole werden in ihrer korrekten Größe angezeigt (Admin skaliert sie nicht).

Bei Wechselrichtern mit reiner Cloud-Anbindung (ohne lokale Verbindung, z. B. HMS-800-2WB) werden nur die Aktionen angezeigt, die über die Cloud ausgeführt werden können - Wechselrichter ein/aus, Wechselrichter neu starten, DTU neu starten -, da die anderen Befehle nur lokal verfügbar sind. Stationen zeigen lediglich Status und Details an (keine Bedienelemente).

**Instanzaktionen** (über der Geräteliste): **Netzwerk scannen** durchsucht das LAN nach DTUs und meldet die gefundenen Ergebnisse, und **Cloud-Anmeldung testen** führt die Anmeldediagnose durch. (Zum Neuladen der Liste wird die integrierte Aktualisierungsschaltfläche des Konfigurationsmanagers verwendet.)

> **Hinweis:** Geräte, die später über die Cloud gefunden werden (bis zu ca. 60 Sekunden nach dem Start), erscheinen nach dem Drücken der **Aktualisierung**-Taste oder nach erneutem Öffnen des Tabs; der Live-Status bereits aufgelisteter Geräte wird automatisch aktualisiert.

## Verbindungsmodi
Der Adapter unterstützt je nach Konfiguration verschiedene Verbindungsmodi:

| | Nur lokal | Lokal + Relay | Nur Cloud | Lokal + Cloud | Lokal + Relay + Cloud |
|---|---|---|---|---|---|
| **TCP-Umfrage** | ja | ja | - | ja | ja |
| **Wieder verbinden** | Backoff 1-60s | Backoff 1-60s | - | Backoff 1-60s | Backoff 1-60s |
| **Cloud Relay** | - | HB 60s, Daten alle `serverSendTime` | - | - | HB 60s, Daten alle `serverSendTime` |
| **Cloud (WR online)** | - | - | Alle 5 Minuten | Alle `serverSendTime` | 30 Sekunden nach dem Senden des Relays |
| **Cloud (WR online)** | - | - | Alle 5 Minuten | Alle `serverSendTime` | 30 Sekunden nach dem Senden des Relays |
| **Cloud (WR offline)** | - | - | Alle 5 Minuten | Nur Wetter + FW | Nur Wetter + FW |

### Automatische Wiederverbindung
Der Wechselrichter (DTU) ist nur erreichbar, wenn er Strom erzeugt (Sonnenschein). Der Adapter verbindet sich automatisch mit exponentieller Verzögerung (1 s, 2 s, 4 s, ... bis maximal 60 s). Nach erfolgreicher Verbindung wird die Verzögerung auf 1 s zurückgesetzt.

BLE-Geräte (HMS-800-2WB) verwenden dasselbe Prinzip, jedoch mit langsameren Schritten, da jeder Versuch eine vollständige GATT-Runde über den Bluetooth-Proxy auslöst: 5 s, 10 s, 20 s, ... bis maximal 5 min. Nach erfolgreicher Kopplung erfolgt ein Reset. Fehlgeschlagene Versuche während der Nacht werden unter `debug` protokolliert; nur der erste Fehlschlag einer Serie wird als Warnung angezeigt.

### Cloud-Downlinks (Server → Adapter)
> **Das Relay betrifft nur TCP-Geräte** (HMS-*-xT). Dort bedient die DTU einen einzelnen Socket > auf Port 10081: Solange der Adapter lokal verbunden ist, kann das Gerät die Cloud nicht erreichen, > daher lädt der Adapter die Daten in seinem Namen hoch. Ein BLE-Gerät (HMS-800-2WB) hat keinen lokalen TCP-Port; der Adapter trennt seine Cloud-Verbindung nie und lädt selbstständig weiter. Der Adapter startet daher **kein** Relay für BLE-Geräte - dies würde einen zweiten Datenstrom unter derselben Seriennummer erzeugen.

> > Das Relay verbindet sich mit dem Server und Port gemäß der DTU-Konfiguration. Auf Port 10083 > (Standard ab Firmware V01.01.01) verwendet es TLS und verifiziert den Server anhand der Hoymiles-eigenen Zertifizierungsstelle, genau wie die DTU; auf Port 10081 verwendet es unverschlüsseltes HM wie ältere Firmware.

Die Rahmen im Inneren sind in beiden Fällen gleich - die DTU identifiziert sich gegenüber der Cloud allein durch ihre Seriennummer, nicht durch ein Zertifikat.

Während das Relay läuft, bestätigt der Cloud-Server die Uploads und sendet gelegentlich Befehle. Der Adapter ordnet **jede** dieser Nachrichten ihrem Firmware-Namen zu:

| Art | Beispiele | Verhalten |
|------|----------|-----------|
| Bestätigungen unserer Uploads | `InfoDataRes`, `HBRes`, `RealRes`, `HistoryRes` | Serverzeit und Zeitzonenabweichung werden gelesen; wenn der Server einen Upload ablehnt (`error_code ≠ 0`), wird eine Warnung protokolliert |
| Befehle | `CommandRes` (Aktion) | werden über die lokale Verbindung an das Gerät übergeben; der Server empfängt eine Bestätigung und den Status |
| Datenanfragen | Rasterprofil (Aktion 41), Version (Aktion 4) | beantwortet aus lokal gelesenen Daten |
| Nicht ausgeführt | OTA-Download (Aktion 2/15), Konfigurationsschreibvorgänge (Aktion 52-54 und 56/57) | **absichtlich verweigert** und protokolliert - ein Firmware-Update oder eine Serverumleitung wird niemals unbeaufsichtigt durchgeführt |

Nachrichten, deren Verhalten noch nicht festgelegt ist, werden mit Namen und Länge protokolliert, anstatt verworfen zu werden. Eine nicht implementierte Downlink-Verbindung ist daher im Protokoll sichtbar und nicht mehr von einer gar nicht vorhandenen Downlink-Verbindung zu unterscheiden.

### Nachtmodus
Wenn die lokale Verbindung abbricht (typischerweise bei Sonnenuntergang), wechselt der Adapter in den **Nachtmodus**:

- Die Cloud-Weiterleitung pausiert (sendet einen letzten Daten-Upload und trennt dann die Verbindung).
- Die Cloud-API beschränkt sich auf Wetteraktualisierungen und Firmware-Prüfungen (keine Echtzeitdaten, da sich nichts ändert).
- Sobald die lokale Verbindung wiederhergestellt ist (Sonnenaufgang), verlässt der Adapter den Nachtmodus und nimmt den normalen Betrieb wieder auf.

### Staatliche Qualität
Der Adapter verwendet das Statusqualitätsattribut (`q`) von ioBroker, um die Zuverlässigkeit und die Quelle der Datenwerte anzugeben:

| Qualität | Wert | Bedeutung | Wann |
|---------|-------|---------|------|
| Gut | `0x00` (0) | Aktuelle, lokal erzeugte Daten | Normalbetrieb - Daten direkt von der DTU über TCP empfangen |
| Gerät nicht verbunden | `0x42` (66) | Veraltete Daten, Gerät offline | DTU-Verbindung unterbrochen - Werte sind die letzten bekannten Messwerte vor der Trennung. Wird auch auf der Cloud-Station gesetzt: `grid.*`, wenn der letzte Cloud-Upload der Station älter als ca. 20 Minuten ist (DTU lädt nicht hoch). |
| Gerät nicht verbunden | `0x42` (66) | Veraltete Daten, Gerät offline | DTU-Verbindung unterbrochen - die Werte sind die letzten bekannten Messwerte vor der Trennung. Wird auch auf der Cloud-Station `grid.*` gesetzt, wenn der letzte Cloud-Upload der Station älter als ca. 20 Minuten ist (DTU lädt nicht hoch). |

**Betroffene Zustände:** `grid.*`, `pv*.*`, `inverter.temperature`, `inverter.active`, `inverter.warnCount`, `inverter.warnMessage`, `inverter.activePowerLimit`, `inverter.powerLimitWatt`, `meter.*` - sowie die Wolkenstationsmessungen `station-<id>.grid.*` (gekennzeichnet als `0x42`, solange die Station offline/veraltet ist).

Info-Zustände (`info.*`), Konfigurations-Zustände (`config.*`) und statische Stations-Cloud-Daten (Name, Adresse, Koordinaten, Warnflags) sind von Qualitätsänderungen **nicht** betroffen.

**Automatischer Reset:** Sobald die lokale DTU-Verbindung wiederhergestellt ist, werden durch die nächste erfolgreiche Datenantwort alle betroffenen Zustände automatisch auf die Qualitätsstufe `0x00` (gut) zurückgesetzt. Ebenso wird die Qualitätsstufe `grid.*` einer Cloud-Station, die den Upload wieder aufnimmt, auf `0x00` zurückgesetzt, und der Adapter führt sofort eine vollständige Aktualisierung (Details, Geräte, Firmware, Warnungen) durch, bevor er den normalen Abfragezyklus wieder aufnimmt.

Sie können das Qualitätsattribut in Skripten und Visualisierungen verwenden, um zwischen aktuellen und veralteten Daten zu unterscheiden, z. B. durch Abdunkeln oder Ausgrauen von Werten mit `q > 0`.

## Mehrere Wechselrichter
Dieser Adapter unterstützt mehrere Wechselrichter in einer einzigen Instanz:

- **Lokal:** Fügen Sie mehrere DTU-IP-Adressen in der Gerätetabelle hinzu.
- **Cloud:** Alle Wechselrichter und Stationen in Ihrem Konto werden automatisch erkannt

Jede DTU erstellt einen Geräteknoten, indem sie ihre Seriennummer als ID verwendet:

```
hoymiles.0.4143A01CEDE4.grid.power
hoymiles.0.4143A01CEDE4.inverter.*
hoymiles.0.4143A01CEDE4.dtu.*
hoymiles.0.4143A01CEDE4.pv0.*
```

Cloud-Stationen erstellen aggregierte Geräteknoten:

```
hoymiles.0.station-12345.grid.power      ← Sum of all inverters
hoymiles.0.station-12345.grid.totalEnergy
hoymiles.0.station-12345.info.stationName
```

## Staaten
### `<dtuSerial>.grid.*` - Netzleistung (pro DTU)
| Bundesland | Typ | Einheit | Beschreibung |
|-------|------|------|-------------|
| `grid.power` | Zahl | W | Netzausgangsleistung |
| `grid.current` | Nummer | A | Netzstrom |
| `grid.frequency` | Nummer | Hz | Netzfrequenz |
| `grid.reactivePower` | Zahl | Variable | Blindleistung |
| `grid.powerFactor` | Nummer | - | Leistungsfaktor |
| `grid.dailyEnergy` | Anzahl | kWh | Täglicher Energieertrag |
| `grid.dailyEnergy` | Zahl | kWh | Tägliche Energieausbeute |

### `<dtuSerial>.info.*` - Geräteinformationen (pro DTU)
| Bundesland | Typ | Beschreibung |
|-------|------|-------------|
| `info.connected` | Boolescher Wert | Gerät verbunden (lokal oder Cloud) |
| `info.lastResponse` | Zahl | Letzte Antwortzeit (Unix-Zeitstempel, nur lokal) |

### `<dtuSerial>.pv0.*` / `pv1.*` / … - PV-Panel-Eingänge (pro DTU)
Es werden dynamisch PV-Kanäle erstellt, einer pro Wechselrichtereingang (`pv0` … `pv11`, maximal 12).

Der Adapter bestimmt die Anzahl in dieser Reihenfolge:

1. **Lokal:** aus den Geräteinformationen des Wechselrichters.
2. **Cloud:** aus dem Hoymiles-Regelwörterbuch, abgerufen anhand des Seriennummernpräfixes des Wechselrichters - dieselbe Quelle, die auch die S-Miles-App verwendet. Dies umfasst alle Produktlinien, einschließlich `…-2WB` / `…-4WB`.
3. **Fallback:** vom Modellnamen (`…-2T`, `…-4WB`, …), oder von der Anzahl der Zeichenketten, die tatsächlich in den Live-Daten angezeigt werden.

| Bundesland | Typ | Einheit | Beschreibung |
|-------|------|------|-------------|
| `pvX.power` | Nummer | W | Panelleistung |
| `pvX.current` | Nummer | A | Panelstrom |
| `pvX.dailyEnergy` | Anzahl | kWh | Täglicher Energieverbrauch (nur lokal) |
| `pvX.totalEnergy` | Anzahl | kWh | Gesamtenergie (nur lokal) |
| `pvX.totalEnergy` | Zahl | kWh | Gesamtenergie (nur lokal) |

### `<dtuSerial>.inverter.*` - Wechselrichterstatus und -steuerung (pro DTU)
| Zustand | Typ | Einheit | Beschreibbar | Beschreibung |
|-------|------|------|----------|-------------|
| `inverter.serialNumber` | Zeichenkette | - | nein | Seriennummer des Wechselrichters |
| `inverter.hwVersion` | Zeichenkette | - | nein | Hardwareversion |
| `inverter.swVersion` | Zeichenkette | - | nein | Softwareversion |
| `inverter.temperature` | Nummer | °C | nein | Wechselrichtertemperatur |
| `inverter.powerLimit` | Zahl | % | **Ja** | Leistungsbegrenzung, 2-100 %, lokal. **Persistent:** Die DTU speichert den Wert im Flash-Speicher und der Wechselrichter im EEPROM. Daher ist dies auch der Wert, mit dem der Wechselrichter jeden Morgen startet. ⚠️ Jeder Schreibvorgang programmiert den Flash-Speicher in beiden (siehe Warnung unten) - der Adapter drosselt die Leistung daher mit einer Totzone und einem Mindestintervall. Für eine schnelle Null-Export-Schleife bei der HMS-800W-2T-Familie verwenden Sie stattdessen `inverter.powerLimitWatt`. Über lokales TCP wird der Status durch das Echo der DTU bestätigt (siehe unten). |
| `inverter.powerLimitWatt` | Zahl | W | **Ja** | Laufzeit-Leistungsbegrenzung in Watt, 0,1-3276,7 W in Schritten von 0,1 W. **Nur HMS-800W-2T-Familie über lokales TCP** - die WB-Serie verfügt über keinen solchen Befehl, daher wird der Zustand dort nicht erstellt. Wirkt sofort und schreibt **weder in den DTU-Flash noch in den Wechselrichter-EEPROM** (Aktion 211, Firmware-verifiziert und im Live-Test getestet), daher ist keine Drosselung erforderlich und es eignet sich für eine Zero-Export-Schleife. **Verliert beim Neustart des Wechselrichters** (jede Nacht) - dann gilt `inverter.powerLimit` erneut; der Adapter sendet es nicht erneut. Unterhalb von ca. 2 % der Nennleistung des Wechselrichters wendet der Wechselrichter seine eigene 2-%-Untergrenze an. Vom DTU-Echo bestätigt; Qualität `0x42` nach einer Trennung |
| `inverter.activePowerLimit` | Zahl | % | Nein | Aktive Leistungsbegrenzung in Prozent (live, lokal). Solange eine Wattbegrenzung (`inverter.powerLimitWatt`) aktiv ist, wird diese nicht aktualisiert - die DTU meldet dann Watt, die stattdessen in `inverter.powerLimitWatt` bestätigt werden. |
| `inverter.active` | Boolesch | - | **Ja** | Wechselrichter ein-/ausschalten (lokal; über die Cloud für reine Cloud-Geräte). Bei einem Hybrid-Wechselrichter wird der Wert aus der Cloud ausgelesen: Ein, wenn die Cloud meldet, dass er verbunden ist und sich im Netzbetrieb befindet oder Wechselstrom liefert; Aus, wenn er vom Netz getrennt ist. |
| `inverter.reboot` | Boolesch | - | **Ja** | Wechselrichter neu starten (Taste, lokal; über die Cloud für reine Cloud-Geräte) |
| `inverter.powerFactorLimit` | Nummer | - | **ja** | Leistungsfaktorbegrenzung (-1 bis 1, lokal). ⚠️ Programme blinken genau wie bei der Leistungsbegrenzung (Aktion 47, gleicher Erfolgspfad) - gedrosselt |
| `inverter.reactivePowerLimit` | Nummer | ° | **Ja** | Blindleistungsbegrenzung (-50 bis 50, lokal). ⚠️ Programme blinken genau wie die Leistungsbegrenzung (Aktion 48, gleicher Erfolgspfad) - gedrosselt |
| `inverter.cleanWarnings` | Boolesch | - | **Ja** | Warnungen bestätigen (Schaltfläche, lokal). Funktioniert auf beiden Geräteserien. |
| `inverter.cleanGroundingFault` | Boolesch | - | **Ja** | Erdschluss bestätigen (Taster, lokal). ⚠️ **Keine Auswirkung auf die WB-Serie** - deren Firmware akzeptiert den Befehl, führt ihn aber nicht aus und meldet trotzdem Erfolg (firmware-verifiziert). Die T-Serie führt ihn aus. |
| `inverter.lock` | Boolesch | - | **Ja** | Sperr-/Entsperr-Inverter (lokal) |
| `inverter.warnCount` | Nummer | - | nein | SGSMO `warning_number` Feld, Rohwert (lokal) - kein dokumentierter Warncode |
| `inverter.warnMessage` | Zeichenkette | - | nein | Aktive Warnmeldung aus der WCode-Alarmliste (lokal) |
| `inverter.linkStatus` | Nummer | - | nein | Verbindungsstatus |
| `inverter.linkStatus` | Zahl | - | nein | Linkstatus |

**Bestätigung der beiden Leistungsgrenzen (lokales TCP).** Die DTU sendet die zuletzt in ihren Live-Daten festgelegte Grenze zurück - als Prozentsatz nach `inverter.powerLimit`, in Watt nach `inverter.powerLimitWatt` (live verifiziert). Der Adapter bestätigt diese beiden Zustände daher erst, wenn die Rückmeldung mit dem von der DTU gemeldeten Wert eintrifft, nicht zum Zeitpunkt des Sendens des Befehls. Ein nicht bestätigter Zustand bedeutet, dass die DTU ihn noch nicht bestätigt hat. Die Rückmeldung enthält nur den **letzten** Befehl; der zuletzt festgelegte Wert ist also der gültige. Bei der WB-Serie und über die Cloud werden die Zustände wie zuvor beim Senden bestätigt (dort enthält das Feld den Sollwert des Energiemanagements, nicht den Befehl).

### `<dtuSerial>.dtu.*` - DTU-Informationen (pro DTU, nur lokal, außer `dtu.reboot`)
| Bundesland | Typ | Einheit | Beschreibung |
|-------|------|------|-------------|
| `dtu.serialNumber` | Zeichenkette | - | DTU-Seriennummer |
| `dtu.hwVersion` | Zeichenkette | - | Hardwareversion |
| `dtu.signalQuality` | Zahl | % | WLAN-Signalqualität (0-100, **nicht dBm** - die DTU meldet die gleiche abgeleitete Qualität wie `config.wifiSignalQuality`) |
| `dtu.reboot` | Boolesch | - | DTU neu starten (**beschreibbar**, Schaltfläche). Wird über die lokale TCP-Verbindung gesendet, wenn eine Verbindung besteht, andernfalls über die Cloud für reine Cloud-Geräte (z. B. HMS-800-2WB). |
| `dtu.wifiVersion` | Zeichenkette | - | WLAN-Version |
| `dtu.fwUpdateAvailable` | Boolescher Wert | - | Firmware-Update verfügbar (wird einmal täglich über die Cloud geprüft) |
| `dtu.stepTime` | Zahl | s | Schrittzeit |
| `dtu.accessModel` | Nummer | - | Netzwerkzugriffsmodus (0=GPRS, 1=WiFi, 2=Ethernet) |
| `dtu.communicationTime` | Nummer | - | Letzte Kommunikation (Unix-Zeitstempel) |
| `dtu.connState` | Nummer | - | DTU-Fehlercode (0=OK) |
| `dtu.connState` | Nummer | - | DTU-Fehlercode (0=OK) |

### `station-<id>.grid.*` - Stationsaggregate (Wolke)
| Bundesland | Typ | Einheit | Beschreibung |
|-------|------|------|-------------|
| `grid.power` | Nummer | W | Gesamtstationsleistung (live in ~1,5-3 s über den Burst-Kanal - auch in einer rein lokalen Konfiguration; nur ~80 s, wenn der Burst abgeschaltet ist) |
| `grid.loadPower` | Zahl | W | Last-/Verbrauchsleistung (Echtzeit) |
| `grid.batteryPower` | Zahl | W | Batterieleistung (Echtzeit) - nur Batteriesysteme. In einem Speicherkraftwerk: +Entladung/−Laden, wie in den Diagrammen des S-Miles-Portals; die Richtung wird, wie im Portal, aus dem Energieflussdiagramm der Cloud übernommen. |
| `grid.pvUtilization` | Anzahl | % | PV-Auslastung (Echtzeit) |
| `grid.dailyEnergy` | Anzahl | kWh | Tägliche Energie |
| `grid.gridImportToday` / `gridImportMonth` / `gridImportYear` / `gridImportTotal` | Anzahl | kWh | Energie, die die Last heute / diesen Monat / dieses Jahr / insgesamt aus dem Netz bezogen hat - Anlagen mit Batteriespeicher oder Netzzähler; Quelle: Registerkarte „Produktion & Verbrauch“ der S-Miles-App |
| `grid.gridExportToday` / `gridExportMonth` / `gridExportYear` / `gridExportTotal` | Anzahl | kWh | Heute / diesen Monat / dieses Jahr / insgesamt ins Netz eingespeiste PV-Energie - Anlagen mit Batteriespeicher oder Netzzähler; Quelle: Registerkarte „Produktion & Verbrauch“ der S-Miles-App |
| `grid.pvToLoadToday` / `pvToLoadMonth` / `pvToLoadYear` / `pvToLoadTotal` | Anzahl | kWh | PV-Energie, die heute / diesen Monat / dieses Jahr / insgesamt direkt vom Verbraucher genutzt wird - Anlagen mit Batteriespeicher oder Netzzähler; Quelle: Registerkarte „Produktion & Verbrauch“ der S-Miles-App |
| `grid.consumptionToday` / `consumptionMonth` / `consumptionYear` / `consumptionTotal` | Anzahl | kWh | Verbrauch heute / diesen Monat / dieses Jahr / insgesamt (Last aus PV + Batterie + Netz) - Anlagen mit Batterie- oder Netzzähler; Quelle: Registerkarte „Produktion & Verbrauch“ der S-Miles-App |
| `grid.selfSufficiencyToday` / `selfSufficiencyMonth` / `selfSufficiencyYear` / `selfSufficiencyTotal` | Zahl | % | Selbstversorgungsgrad heute / diesen Monat / dieses Jahr / insgesamt: Anteil des Verbrauchs, der nicht aus dem Netz bezogen wird, eine Dezimalstelle, 0, wenn kein Verbrauch stattfand - berechnet wie in der App - nur Anlagen mit Batterie- oder Netzzähler; Quelle: Registerkarte „Produktion & Verbrauch“ der S-Miles-App |
| `grid.batteryChargeToday` / `batteryChargeMonth` / `batteryChargeYear` / `batteryChargeTotal` | Anzahl | kWh | Heute / diesen Monat / dieses Jahr / insgesamt in die Batterie geladene PV-Energie - nur Batteriesysteme |
| `grid.batteryDischargeToday` / `batteryDischargeMonth` / `batteryDischargeYear` / `batteryDischargeTotal` | Anzahl | kWh | Energie, die die Last heute / diesen Monat / dieses Jahr / insgesamt aus der Batterie bezogen hat - nur Batteriesysteme |
| `grid.monthEnergy` | Anzahl | kWh | Monatlicher Energieverbrauch |
| `grid.yearEnergy` | Anzahl | kWh | Jährlicher Energieverbrauch |
| `grid.totalEnergy` | Anzahl | kWh | Gesamtenergieverbrauch über die gesamte Lebensdauer |
| `grid.co2Saved` | Anzahl | kg | CO2 eingespart |
| `grid.treesPlanted` | Anzahl | - | Entsprechende Anzahl gepflanzter Bäume |
| `grid.electricityPrice` | Anzahl | /kWh | Strompreis |
| `grid.currency` | Zeichenkette | - | Währungscode |
| `grid.isBalance` | Boolescher Wert | - | Nullexport aktiv |
| `grid.isReflux` | Boolescher Wert | - | Feed-in aktiv |
| `grid.todayIncome` / `monthIncome` / `yearIncome` / `totalIncome` | Anzahl | - | Einkommen heute / diesen Monat / dieses Jahr / insgesamt. Wo die Cloud ihre eigene Buchhaltung führt (Anlagen mit Tarif), werden deren Zahlen verwendet; andernfalls werden die heutigen/gesamten Werte als Ertrag × Preis geschätzt. |
| `grid.todayCost` / `monthCost` / `yearCost` / `totalCost` | Nummer | - | Stromkosten heute / diesen Monat / dieses Jahr / insgesamt, aus der Cloud-Abrechnung - nur Kraftwerke mit Tarif |
| `grid.todayCost` / `monthCost` / `yearCost` / `totalCost` | Zahl | - | Stromkosten heute / diesen Monat / dieses Jahr / insgesamt, aus der Cloud-Abrechnung - nur Kraftwerke mit Tarif |

### `station-<id>.info.*` - Stationsinformationen (Cloud)
| Bundesland | Typ | Beschreibung |
|-------|------|-------------|
| `info.stationName` | Zeichenkette | Stationsname |
| `info.systemCapacity` | Nummer | Systemleistung (kWp) |
| `info.address` | Zeichenkette | Stationsadresse |
| `info.latitude` | Nummer | GPS-Breitengrad |
| `info.longitude` | Nummer | GPS-Längengrad |
| `info.stationStatus` | Nummer | Stationsstatus |
| `info.installedAt` | Nummer | Installationsdatum |
| `info.timezone` | Zeichenkette | Zeitzone |
| `info.lastCloudUpdate` | Nummer | Letzte Aktualisierung der Cloud |
| `info.lastDataTime` | Nummer | Letzte DTU-Datumszeit |
| `info.lastDataTime` | Nummer | Letzte DTU-Datumszeit |

### `station-<id>.weather.*` - Wetter an der Station (Bewölkung)
| Bundesland | Typ | Einheit | Beschreibung |
|-------|------|------|-------------|
| `weather.icon` | Zeichenkette | - | Wettersymbolcode ([OpenWeatherMap](https://openweathermap.org/weather-conditions)) |
| `weather.temperature` | Zahl | °C | Aktuelle Temperatur am Stationsstandort |
| `weather.sunrise` | Nummer | - | Sonnenaufgangszeit (Unix-Zeitstempel ms) |
| `weather.sunset` | Nummer | - | Sonnenuntergangszeit (Unix-Zeitstempel ms) |
| `weather.sunset` | Zahl | - | Sonnenuntergangszeit (Unix-Zeitstempel ms) |

**Wettersymbolcodes:** Die Symbolcodes folgen dem Muster [OpenWeatherMap-Konvention](https://openweathermap.org/weather-conditions). Um das Symbol als Bild anzuzeigen, verwenden Sie: `https://openweathermap.org/img/wn/{icon}@2x.png`

### `station-<id>.warn.*` - Stationswarnungen (Wolke)
Warnmeldungen auf Netz- und Zählerebene aus dem Cloud-Datensatz `station/find`. Alle Werte sind boolesch - `true` bedeutet, dass der Zustand aktuell aktiv ist. Installateur-Konten lesen die Meldungen aus `station/find`; bei S-Miles-Home-Konten (wo `find_c` diese auslässt) greift der Adapter auf die Antwort `realtime_c` zurück. Dieser Fallback-Block enthält sechs der Meldungen - jedoch **nicht** `warn.powerLimited`, das nur im Installateur-Datensatz `station/find` vorhanden ist -, sodass bei Home-Konten `warn.powerLimited` auch bei aktiver Leistungsreduzierung `false` bleibt. Die Zustände erscheinen erst, wenn die Cloud einen `warn_data`-Block von einer der beiden Quellen liefert.

| Bundesland | Typ | Beschreibung |
|-------|------|-------------|
| `warn.stationOffline` | Boolesch | Station offline / Versorgungsspannung aus. Gegenprüfung anhand der Aktualität der Echtzeitdaten: Eine Station, die noch aktuelle Daten hochlädt, wird niemals als offline gemeldet, selbst wenn die Cloud kurzzeitig `s_uoff` signalisiert (z. B. während das Cloud-Relay beim Start des Adapters die Uplink-Verbindung der DTU übernimmt). |
| `warn.gridFault` | Boolesch | Netzfehler / Netzanomalie |
| `warn.deviceAlarm` | Boolesch | Wechselrichteralarm - Ein Wechselrichter weist einen aktiven Fehler auf (z. B. „PVx kein Eingang“, wenn ein DC-String getrennt ist). Derselbe Zustand tritt lokal und schneller unter `alarms.lastCode`/`alarms.lastMessage` auf. |
| `warn.deviceIdWarning` | Boolescher Wert | Geräte-ID-Warnung (ID-Abweichung / Diebstahlschutz) |
| `warn.meterFault` | Boolesch | Zählerfehler / Zählerwarnung |
| `warn.powerLimited` | Boolesch | Leistungsbegrenzung (Leistungsreduzierung/Leistungsbegrenzung aktiv). **Nur für Installateure** - nicht für Privatkunden verfügbar |
| `warn.powerLimited` | Boolescher Wert | Leistungsabgabe begrenzt (Leistungsbegrenzung aktiv). **Nur für Installateur-Konten** - nicht für Privatkunden verfügbar |

### `<dtuSerial>.history.*` - Tagesleistungskurve (pro DTU, lokal)
Der Wechselrichter speichert seine eigene Leistungskurve für den Tag im Flash-Speicher. Der Adapter ruft diese im Slow-Poll-Verfahren (`0xa315`) ab - **ohne Cloud**, sowohl über TCP als auch über BLE.

Das Gerät unterteilt den Tag in Seiten mit maximal 200 Messwerten und meldet deren Anzahl. Der Adapter erfasst alle Seiten und veröffentlicht die Kurve erst, wenn der gesamte Tag erfasst ist - Seite 0 allein endet am Vormittag.

Gemessen mit einem HMS-800W-2T: 903 Messwerte pro Minute über 15 Stunden, mit einem Spitzenwert von 602 W um 14:06 Uhr.
Das HMS-800-2WB liefert dieselbe Kurve mit einem 300-Sekunden-Intervall ab Mitternacht.

**Zum Gerät:** Die Firmware gibt dies nicht an - das Feld wird ohne Konvertierung aus dem Flash-Speicher kopiert. Der Faktor von 0,1 W wird daher **gemessen, nicht aus dem Code ausgelesen**: Die Integration der Kurve über den Tag ergibt **4495 Wh** gegenüber den vom Gerät selbst angezeigten **4500 Wh**, eine Differenz von 0,12 %. Ein Faktor von 1 oder 0,01 entspräche einer Abweichung um eine Zehnerpotenz.

| Zustand | Typ | Einheit | Beschreibbar | Beschreibung |
|-------|------|------|----------|-------------|
| `history.powerJson` | Zeichenkette | W | nein | Tagesleistungskurve als JSON-Array, ein Wert pro Schritt |
| `history.stepTime` | Anzahl | s | keine | Sekunden zwischen zwei Abtastungen (2T: 60, 2WB: 300) |
| `history.dailyEnergy` | Anzahl | Wh | Nr. | Vom Gerät gemeldeter täglicher Energieverbrauch |
| `history.totalEnergy` | Anzahl | kWh | Nr. | Gesamtenergie laut Geräteangabe |
| `history.totalEnergy` | Zahl | kWh | Nr. | Gesamtenergie laut Gerätebericht |

Zeitstempel einer Probe: `history.startTime + index * history.stepTime * 1000`.

### `<dtuSerial>.alarms.*` - Alarmdaten (pro DTU, lokal)
| Bundesland | Typ | Beschreibung |
|-------|------|-------------|
| `alarms.count` | Anzahl | Gesamtzahl der Alarme |
| `alarms.hasActive` | Boolesch | Hat aktive Alarme |
| `alarms.json` | Zeichenkette | Vollständige Alarmliste als JSON |
| `alarms.lastCode` | Nummer | Letzter Alarmcode |
| `alarms.lastStartTime` | Nummer | Letzte Alarmstartzeit |
| `alarms.lastEndTime` | Nummer | Letzte Alarmendzeit |
| `alarms.lastMessage` | Zeichenkette | Letzte Alarmmeldung (in der Systemsprache von ioBroker, ansonsten Englisch) |
| `alarms.lastData1` | Nummer | Letzte Alarmdaten 1 (Rohsensorwert) |
| `alarms.lastData2` | Nummer | Letzte Alarmdaten 2 (Rohsensorwert) |
| `alarms.lastData2` | Nummer | Letzte Alarmdaten 2 (Rohsensorwert) |

### `<dtuSerial>.config.*` - DTU-Konfiguration (pro DTU, lokal)
⚠️ **WARNUNG - Jeder Schreibvorgang zur Leistungsbegrenzung programmiert den Flash-Speicher im Gerät.** Dies betrifft ** `inverter.powerLimit`, `inverter.powerFactorLimit` und `inverter.reactivePowerLimit` ** - alle drei durchlaufen denselben Erfolgspfad (Aktionen 8, 47 und 48). `inverter.powerLimitWatt` (Aktion 211) ist **nicht** betroffen und verbleibt im RAM.

Der Inverter überschreibt bei jedem dieser Befehle zusätzlich seinen EEPROM (34 Wörter, die jeweils ausgelesen werden). Am Ende eines erfolgreichen Befehls ruft die Firmware den Konfigurations-Serialisierer auf, der **zwei 4-KB-Flash-Sektoren löscht und neu beschreibt** (HMS-800W-2T: `0x4080d642` → Löschen + Schreiben für Region 3 und Region 0xe; HMS-800-2WB: `sys_cfg_write` führt > `nv_erase`+`nv_write` zweimal aus). Die Lebensdauer des Flash-Speichers ist begrenzt - nur Zehntausende von Zyklen -, daher führt eine Schleife mit Null-Exporten pro Sekunde zu Verschleiß und kann das Gerät **dauerhaft unbrauchbar machen**.


Der Adapter schützt davor: Die Einstellungen (Registerkarte „Lokal“) bieten eine **Totzone** (Standard: 1 %) und ein **Mindestintervall** (Standard: 60 s). Eine Änderung unterhalb der Totzone oder eine Änderung, die zu kurz nach dem letzten Schreibvorgang erfolgt, wird nicht gesendet; der Zustand wird dennoch bestätigt und im Protokoll vermerkt der Grund. Beide Werte können mit 0 angepasst oder deaktiviert werden - wer die Regelung bewusst beschleunigen möchte, kann dies tun und den damit verbundenen Verschleiß in Kauf nehmen.

**Für die Nulleinspeisung bei der HMS-800W-2T-Familie verwenden Sie `inverter.powerLimitWatt`:** Diese Einstellung wird sofort in Watt wirksam und beschreibt weder den DTU-Flash noch den Wechselrichter-EEPROM. Sie geht beim Neustart des Wechselrichters verloren - jede Nacht, da sich der Wechselrichter bei Sonneneinstrahlung abschaltet -, woraufhin der Prozentsatz in `inverter.powerLimit` wieder gilt. Die WB-Serie verfügt über keinen solchen Befehl: Hier ist `inverter.powerLimit` die einzige Begrenzung mit dem oben beschriebenen Verschleiß, oder der Wechselrichter regelt die Nulleinspeisung selbst mit einem angeschlossenen Zähler (`meter.mode`).

> ⚠️ **Konfiguration schreiben - der Adapter liest immer zuerst.** > > Die DTU übernimmt **jedes** Feld einer Konfigurationsnachricht, einschließlich derer, die das Protokoll gar nicht erst überträgt, da sie ihren Standardwert enthalten. Wenn Sie also nur das Feld senden, das Sie ändern möchten, werden alle anderen gelöscht. Firmware-geprüft für den HMS-800W-2T: > `server_domain_name`, `serverport`, `limit_power_mypower`, `server_send_time`, `lock_password` > und `lock_time` werden ungeschützt überschrieben. Genau das hat beim 2WB in einem Live-Test die Serveradresse, den Port und die Leistungsbegrenzung zerstört.

Der Adapter schreibt daher niemals nur einen Teilsatz: Er übernimmt die zuletzt vom Gerät gelesene Konfiguration, ändert nur das angeforderte Feld und sendet alles zurück. Wurde in der aktuellen Sitzung keine Konfiguration gelesen, wird der Schreibvorgang abgelehnt und der Grund protokolliert - lieber gar nicht schreiben als unvollständig.

Die WLAN-Zugangsdaten bleiben unverändert: Das Gerät übernimmt sie nur, wenn ein zusätzliches Feld gesetzt wird, das der Adapter absichtlich leer lässt.

| Zustand | Typ | Einheit | Beschreibbar | Beschreibung |
|-------|------|------|----------|-------------|
| `config.serverDomain` | Zeichenkette | - | nein | Cloud-Server-Domäne |
| `config.serverSendTime` | Anzahl | Min. | **Ja** | Cloud-Sendeintervall (Minuten). ⚠️ **Weder persistent noch Flash-Schreibvorgang** (Firmware-geprüft): Das SetConfig-Feld 10 landet nur im RAM (`gp-110188`); der SetConfig-Pfad schreibt ausschließlich im WLAN/AP-Passwort-Zweig in den Flash-Speicher. Frühere Versionen dieser Dokumentation nannten es „persistent (DTU-Flash)“ - das war falsch. Nach einem Neustart des Geräts erneut einstellen. |
| `config.wifiSsid` | Zeichenkette | - | nein | WLAN-SSID |
| `config.wifiSignalQuality` | Zahl | % | nein | WLAN **Signalqualität 0-100**, **nicht dBm**, trotz des Feldnamens. Die Firmware leitet sie aus dem rohen RSSI als `clamp(2*(95 - |rssi|), 0, 100)` ab und benennt die beiden Werte in ihrer eigenen Debug-Ausgabe als `rssi` (roh) und `wifi_rssi` (dieser Wert). Ein Messwert von 46 entspricht ungefähr −72 dBm. Frühere Versionen dieser Dokumentation nannten ihn „echtes dBm, z. B. −65“ - das war falsch. Der rohe dBm-Wert bleibt im benachbarten Byte und ist über keine der vom Adapter verwendeten Nachrichten erreichbar. Das Gerät meldet denselben Wert wie `csq` in seiner NetworkInfo-Nachricht - dasselbe Byte, daher wäre ein separater Zustand eine Duplikation. |
| `config.invType` | Nummer | - | Nein | Wechselrichtertyp |
| `config.netmodeSelect` | Nummer | - | nein | Netzwerkmodus (0=GPRS, 1=WLAN, 2=Ethernet) |
| `config.netDhcpSwitch` | Nummer | - | nein | DHCP aktiviert |
| `config.wifiIpAddress` | Zeichenkette | - | nein | WLAN-IP-Adresse |
| `config.wifiMacAddress` | Zeichenkette | - | nein | WLAN-MAC-Adresse |
| `config.dtuApSsid` | Zeichenkette | - | nein | DTU-Zugangspunkt-SSID |
| `config.ipAddress` | Zeichenkette | - | nein | IP-Adresse (Ethernet/primäre Schnittstelle) |
| `config.subnetMask` | Zeichenkette | - | nein | Subnetzmaske |
| `config.gateway` | Zeichenkette | - | nein | Standardgateway |
| `config.dnsServer` | Zeichenkette | - | nein | DNS-Server |
| `config.macAddress` | Zeichenkette | - | nein | MAC-Adresse |
| `config.meterKind` | Zeichenkette | - | nein | Konfigurierter Zählertyp. Leer bei Geräten ohne Zählereingang - der HMS-800W-2T hat keinen (firmware-verifiziert), daher ist ein leerer Wert hier die korrekte Antwort. |
| `config.meterInterface` | Zeichenkette | - | nein | Schnittstelle, an die der Zähler angeschlossen ist |
| `config.zeroExportEnable` | Nummer | - | nein | Null-Export-Flag, wie von der DTU gemeldet |
| `config.zeroExport433Addr` | Nummer | - | nein | 433-MHz-Adresse ohne Export |
| `config.lockTime` | Nummer | s | Nr. | Dauer der Wechselrichtersperre (0 = keine Sperre) |
| `config.lockTime` | Zahl | s | nein | Dauer der Inverter-Sperre (0 = keine Sperre) |

### `<dtuSerial>.gridProfile.*` - Grid-Profil (pro DTU, lokal - wird für reine Cloud-Geräte über die Cloud gelesen)
Das Netzanschlussprofil des Wechselrichters (Sicherheits-/Netzanschlussparameter) wird lokal über DevConfigFetch ausgelesen. Alle Daten sind schreibgeschützt. Spannungs-/Frequenzwerte entsprechen dem aktiven Netzstandard (z. B. `DE_VDE4105_2018`). Funktionsflags sind boolesche Werte (`true` = Funktion aktiv).

| Zustand | Typ | Einheit | Beschreibbar | Beschreibung |
|-------|------|------|----------|-------------|
| `gridProfile.standard` | Zeichenkette | - | nein | Name des Rasterstandards (z. B. DE_VDE4105_2018) |
| `gridProfile.version` | Nummer | - | Nein | Grid-Profilversion |
| `gridProfile.nominalVoltage` | Nummer | V | Nr. | Nennspannung |
| `gridProfile.lowVoltage1` | Nummer | V | nein | Niederspannung 1 (LV1) |
| `gridProfile.lowVoltage1TripTime` | Anzahl | s | Nein | LV1 maximale Fahrzeit |
| `gridProfile.highVoltage1` | Nummer | V | Nr. | Hochspannung 1 (HV1) |
| `gridProfile.highVoltage1TripTime` | Nummer | s | Nr. | HV1 max. Fahrzeit |
| `gridProfile.lowVoltage2` | Nummer | V | nein | Niederspannung 2 (LV2) |
| `gridProfile.lowVoltage2TripTime` | Anzahl | s | Nein | LV2 maximale Fahrzeit |
| `gridProfile.avgHighVoltage10min` | Nummer | V | nein | 10-Minuten-Mittelwert der Hochspannung |
| `gridProfile.nominalFrequency` | Nummer | Hz | Nr. | Nennfrequenz |
| `gridProfile.lowFrequency1` | Anzahl | Hz | Nein | Niederfrequenz 1 (LF1) |
| `gridProfile.lowFrequency1TripTime` | Nummer | s | Nr. | LF1 maximale Fahrzeit |
| `gridProfile.highFrequency1` | Nummer | Hz | nein | Hochfrequenz 1 (HF1) |
| `gridProfile.highFrequency1TripTime` | Anzahl | s | Nr. | HF1 maximale Fahrzeit |
| `gridProfile.islandingDetection` | boolesch | - | nein | Inselerkennung aktiv |
| `gridProfile.reconnectTime` | Nummer | s | nein | Wiederverbindungszeit |
| `gridProfile.reconnectHighVoltage` | Nummer | V | nein | Hochspannung wieder anschließen |
| `gridProfile.reconnectLowVoltage` | Nummer | V | nein | Niederspannung wiederherstellen |
| `gridProfile.reconnectHighFrequency` | Nummer | Hz | nein | Hochfrequenz wieder verbinden |
| `gridProfile.reconnectLowFrequency` | Nummer | Hz | Nein | Niederfrequenz wieder verbinden |
| `gridProfile.rampUpRateNormal` | Anzahl | %/s | Nein | Normale Anstiegsgeschwindigkeit |
| `gridProfile.rampUpRateSoftStart` | Anzahl | %/s | Nein | Sanfte Anlauframpenrate |
| `gridProfile.freqWattActive` | Boolesch | - | Nein | Frequenz-Watt aktiv |
| `gridProfile.freqWattStart` | Nummer | Hz | Nr. | Frequenz-Watt-Start (Fstart) |
| `gridProfile.freqWattDroopSlope` | Anzahl | %Pn/Hz | Nein | Frequenz-Watt-Abfallflanke |
| `gridProfile.recoveryRampRate` | Anzahl | %Pn/s | Nein | Erholungsrampenrate |
| `gridProfile.recoveryHighFrequency` | Nummer | Hz | nein | Wiederherstellungsfrequenz |
| `gridProfile.recoveryLowFrequency` | Nummer | Hz | nein | Wiederherstellungsfrequenz (niedrig) |
| `gridProfile.activePowerControlActive` | Boolesch | - | Nein | Aktive Leistungssteuerung aktiv |
| `gridProfile.powerRampRate` | Anzahl | %Pn/s | Nein | Leistungsanstiegsrate |
| `gridProfile.voltVarActive` | boolescher Wert | - | nein | Volt-Var aktiv |
| `gridProfile.voltVarV1` | Nummer | V | Nr. | Volt-Var-Sollwert V1 |
| `gridProfile.voltVarQ1` | Nummer | %Pn | nein | Volt-Var-Sollwert Q1 |
| `gridProfile.voltVarV2` | Nummer | V | Nr. | Volt-Var-Sollwert V2 |
| `gridProfile.voltVarV3` | Zahl | V | nein | Volt-Var-Sollwert V3 |
| `gridProfile.voltVarV4` | Zahl | V | nein | Volt-Var-Sollwert V4 |
| `gridProfile.voltVarQ4` | Nummer | %Pn | nein | Volt-Var-Sollwert Q4 |
| `gridProfile.specifiedPowerFactorActive` | Boolesch | - | Nein | Angegebener Leistungsfaktor aktiv |
| `gridProfile.powerFactor` | Nummer | - | nein | Leistungsfaktor (cos φ) |
| `gridProfile.wattPowerFactorActive` | boolesch | - | nein | Watt-Leistungsfaktor aktiv |
| `gridProfile.wattPowerFactorStart` | Nummer | %Pn | nein | Watt-PF Anlaufleistung |
| `gridProfile.powerFactorAtRatedPower` | Nummer | - | nein | Leistungsfaktor bei Nennleistung |
| `gridProfile.reactivePowerControlActive` | boolesch | - | nein | Blindleistungsregelung aktiv |
| `gridProfile.reactivePower` | Nummer | %Sn | Nr. | Blindleistung (VAR) |
| `gridProfile.reactivePower` | Zahl | %Sn | nein | Blindleistung (VAR) |

### `<dtuSerial>.meter.*` - Kabelgebundener Energiezähler (pro DTU, lokal, dynamisch)
Zählerstände werden automatisch erstellt, sobald Zählerdaten vom DTU empfangen werden. Nur verfügbar, wenn ein kompatibler, kabelgebundener Energiezähler (DTU-Pro-Typ, Modbus) angeschlossen ist.

| Bundesland | Typ | Einheit | Beschreibung |
|-------|------|------|-------------|
| `meter.totalPower` | Nummer | W | Gesamtleistung (alle Phasen) |
| `meter.phaseBPower` | Anzahl | W | Leistung Phase B |
| `meter.phaseCPower` | Anzahl | W | Leistung Phase C |
| `meter.powerFactorTotal` | Nummer | - | Gesamtleistungsfaktor |
| `meter.energyTotalExport` | Anzahl | kWh | Gesamtenergieexport (Einspeisung) |
| `meter.energyTotalImport` | Anzahl | kWh | Gesamtenergieimport (Verbrauch) |
| `meter.voltagePhaseA` | Nummer | V | Spannung Phase A |
| `meter.voltagePhaseB` | Nummer | V | Spannung Phase B |
| `meter.voltagePhaseC` | Nummer | V | Spannung Phase C |
| `meter.currentPhaseA` | Nummer | A | Aktuelle Phase A |
| `meter.currentPhaseB` | Nummer | A | Aktuelle Phase B |
| `meter.currentPhaseC` | Nummer | A | Aktuelle Phase C |
| `meter.energyPhaseAExport` | Anzahl | kWh | Energieexport Phase A |
| `meter.energyPhaseBExport` | Anzahl | kWh | Energieexport Phase B |
| `meter.energyPhaseCExport` | Anzahl | kWh | Energieexport Phase C |
| `meter.energyPhaseAImport` | Anzahl | kWh | Energieimport Phase A |
| `meter.energyPhaseBImport` | Anzahl | kWh | Energieimport Phase B |
| `meter.energyPhaseCImport` | Anzahl | kWh | Energieimport Phase C |
| `meter.powerFactorPhaseA` | Nummer | - | Leistungsfaktor Phase A |
| `meter.powerFactorPhaseB` | Nummer | - | Leistungsfaktor Phase B |
| `meter.powerFactorPhaseC` | Nummer | - | Leistungsfaktor Phase C |
| `meter.faultCode` | Nummer | - | Zählerfehlercode |
| `meter.faultCode` | Nummer | - | Zählerfehlercode |

### `<dtuSerial>.meter.*` - Netzwerk-Energiezähler (Shelly / ecotracker, BLE-Serie, lokal, dynamisch)
Diese Zustände werden bei Bedarf für einen Wechselrichter der WB-Serie erstellt, sobald ein Zähler über den *Konfigurationsmanager* gekoppelt wurde - siehe [Anschluss eines Energiezählers](#connecting-an-energy-meter-shelly--ecotracker). Die T-Serie verfügt weder über einen Zählereingang noch über eine entsprechende Regelung, daher werden diese Zustände dort nicht angezeigt.

| Zustand | Typ | Einheit | Beschreibbar | Beschreibung |
|-------|------|------|----------|-------------|
| `meter.mode` | Nummer | - | **ja** | Betriebsmodus: `0` = ungebunden (Startwert, kein Befehl), `1` = nur Zähler, `2` = Netzzähler für Nullexport |
| `meter.detected` | Zeichenkette | - | nein | Zähler für den im Netzwerk gefundenen Wechselrichter (JSON-Liste) |
| `meter.connected` | boolesch | - | nein | Gibt an, ob der Zähler aktuell Daten liefert |
| `meter.lastData` | Nummer | - | nein | Zeitstempel der letzten Zählerablesung |
| `meter.gridPower` | Nummer | W | nein | Netzaustausch: positiv = Import, negativ = Export |
| `meter.pvPower` | Anzahl | W | Nein | Vom Wechselrichter berechneter PV-Anteil |
| `meter.loadPower` | Nummer | W | Nr. | Vom Wechselrichter berechnete Hauslast |
| `meter.storagePower` | Anzahl | W | Nein | Vom Wechselrichter berechneter Batterieanteil |
| `meter.plugPower` | Anzahl | W | Nein | Stecker-/Hilfsanteil vom Wechselrichter berechnet |
| `meter.frequency` | Nummer | Hz | nein | Netzfrequenz am Zähler |
| `meter.l1Voltage` | Nummer | V | Nr. | Spannung L1 |
| `meter.l1Current` | Nummer | A | nein | Aktuelle L1 |
| `meter.l1Power` | Nummer | W | nein | Leistung L1 (vorzeichenbehaftet: negativ = exportierend) |
| `meter.l2Voltage` | Nummer | V | Nr. | Spannung L2 |
| `meter.l2Current` | Nummer | A | nein | Aktuelle L2 |
| `meter.l2Power` | Nummer | W | nein | Leistung L2 (vorzeichenbehaftet) |
| `meter.l3Voltage` | Nummer | V | Nr. | Spannung L3 |
| `meter.l3Current` | Nummer | A | nein | Aktuelle L3 |
| `meter.l3Power` | Nummer | W | nein | Leistung L3 (vorzeichenbehaftet) |
| `meter.l3Power` | Zahl | W | nein | Leistung L3 (vorzeichenbehaftet) |

### `<dtuSerial>.*` - Hybrid-Wechselrichter mit Batterie (HAT-Serie, Cloud, dynamisch)
Erstellt wird nur, wenn die Cloud einen Hybridwechselrichter unterhalb der DTU meldet; alle sind schreibgeschützt und stammen aus der Cloud. Die Gesamtwerte des Wechselrichters verwenden die Zustände jedes Geräts: `grid.power` (kombinierte Wirkleistung), `grid.frequency`, `inverter.temperature` (interne Umgebungstemperatur), `inverter.model` / `serialNumber` / `swVersion` und `pv0.*` / `pv1.*` (`power`, `voltage`, `current` und `dailyEnergy`, wenn die Cloud sie liefert) für die PV-Eingänge - nur wenn PV tatsächlich an den Hybrid-Wechselrichter angeschlossen ist; Bei einer AC-gekoppelten Anlage, in der der PV-Strom von einem separaten Wechselrichter hinter einem PV-Zähler (`station-<id>.pvMeter.*`) eingespeist wird, kennzeichnet die Cloud die Eingänge des Wechselrichters als ungenutzt, und es werden keine Zustände (`pvN`) erstellt. Der Zustand `battery.*` wird erst erzeugt, wenn eine Batterie unterhalb des Wechselrichters angeschlossen ist - er enthält alle Informationen zur Batterie. Die Station speichert lediglich den Leistungsfluss und die Energiebilanz der Anlage (`grid.batteryPower`, `grid.batteryCharge*`, `grid.batteryDischarge*` für heute, Monat, Jahr und Lebensdauer). Zeilen mit der Kennzeichnung ⁺ gehören zum Vokabular der Cloud für diese Geräte, wurden aber nicht vom Referenzsystem bereitgestellt - sie werden nur angezeigt, wenn Ihr Gerät sie meldet.

| Bundesland | Typ | Einheit | Beschreibung |
|-------|------|------|-------------|
| `grid.l1Voltage` / `l2…` / `l3…` | Nummer | V | Wechselrichter-Wechselspannung pro Phase |
| `grid.l1Power` / `l2…` / `l3…` | Anzahl | W | Wirkleistung des Wechselrichters pro Phase |
| `grid.l1ReactivePower` / `l2…` / `l3…` | Anzahl | var | Blindleistung des Wechselrichters pro Phase |
| `inverter.operatingState` | Zahl | - | Betriebszustand als Zahl (3 = Netzbetrieb beobachtet; die vollständige Werteliste ist noch nicht bekannt) |
| `inverter.operatingStateText` | Zeichenkette | - | Betriebszustand, wie er in der Cloud dargestellt wird |
| `inverter.busVoltage` | Nummer | V | Gleichspannung zwischen Bus |
| `inverter.drmMode` | Nummer | - | DRM-Modus (Demand Response) |
| `inverter.pvPower` | Zahl | W | PV-Leistung aller Eingänge zusammen |
| `inverter.pvEnergyToday` ⁺ | Anzahl | kWh | PV-Energie aller Inputs heute |
| `inverter.pvHeatsinkTemperature` / `heatsinkTemperature` / `batteryHeatsinkTemperature` ⁺ | Zahl | °C | Kühlkörpertemperaturen der PV-, Wechselrichter- und Batteriestufe |
| `inverter.powerFaultCode` / `safetyFaultCode` ⁺ | Zeichenkette | - | Fehlercodes der Leistungs- und Sicherheitssteuerung |
| `eps.l1Voltage` / `l2…` / `l3…` | Nummer | V | Backup-Ausgangsspannung (EPS) pro Phase |
| `eps.l1Current` / `l2…` / `l3…` | Nummer | A | Backup-Ausgangsstrom (EPS) pro Phase |
| `eps.l1Power` / `l2…` / `l3…` | Anzahl | W | Wirkleistung der Notstromversorgung (EPS) pro Phase |
| `battery.serialNumber` / `model` / `swVersion` / `hwVersion` | Zeichenkette | - | Batterieidentität aus der Geräteliste der Cloud |
| `battery.capacity` | Anzahl | kWh | Installierte Batteriekapazität |
| `battery.connected` | boolescher Wert | - | Vom Cloud-Dienst online gemeldeter Akkustand |
| `battery.type` | Zeichenkette | - | Batteriechemie, wie sie in der Cloud beschrieben wird (z. B. `Li-Ion`) |
| `battery.soc` | Zahl | % | Ladezustand - etwa alle 10 s über den schnellen Echtzeitkanal, ansonsten mit den regulären Werten der Batterie |
| `battery.soh` | Zahl | % | Gesundheitszustand |
| `battery.state` | Zahl | - | Batteriezustand als Zahl (2 = Entladung wurde beobachtet) |
| `battery.stateText` | Zeichenkette | - | Batteriestatus, wie er in der Cloud angezeigt wird |
| `battery.faultCode` | Zeichenkette | - | Batteriefehlercode (`0` = keiner) |
| `battery.voltage` / `current` / `power` | Nummer | V / A / W | Batteriemessungen des Batteriemanagementsystems |
| `battery.cycles` ⁺ | Nummer | - | Ladezyklen |
| `battery.heating` / `heatingText` ⁺ | Zahl / Zeichenkette | - | Batterieheizstatus, als Zahl und als Wort in der Cloud |
| `battery.workMode` | Nummer | - | Betriebsmodus: 1 = Eigenverbrauch, 2 = Sparmodus, 3 = Notstromversorgung, 4 = Inselbetrieb, 5 = Zwangsladung, 6 = Zwangsentladung, 7 = Lastspitzenkappung, 8 = Zeitgesteuerter Betrieb. Die Daten werden mit der regulären Stationsabfrage übermittelt - es werden keine Daten an das Gerät gesendet. |
| `battery.readSettings` | Boolescher Wert (Taste) | - | Liest die Akkueinstellungen vom Gerät. **Nur Lesevorgang** - die Anfrage wird jedoch an das Gerät gesendet und benötigt einige Sekunden, daher wird sie einmal pro Netzteilstart und nur dann ausgeführt, wenn Sie diese Taste drücken. |
| `battery.reserveSoc` | Nummer | % | Reservierter Ladezustand des aktiven Betriebsmodus (aus den gelesenen Einstellungen) |
| `battery.settingsJson` | Zeichenkette (JSON) | - | Die vollständigen Einstellungen, wie sie vom Gerät gemeldet werden: aktiver Modus plus die Parameter jedes Modus (`k_1`…`k_8`: SoC-Reserve, Leistungsgrenzen, Zeitfenster, Tarife). Unverändert weitergegeben - die Parameter haben keine Einheiten und unterscheiden sich je nach Modus. |
| `battery.settingsUpdated` | Nummer | - | Wann wurden die Einstellungen zuletzt gelesen? |
| `dryContact.readSettings` | Boolesch (Taste) | - | Liest die potentialfreien Relais-Einstellungen des Geräts - Start-/Stopp-Schwellenwerte des Generators, Laststeuerungsfenster, SoC-Grenzwerte. **Nur lesend**; wie die Batterieeinstellungen werden diese an das Gerät übertragen, daher wird der Vorgang einmal pro Adapterstart und anschließend bei Betätigung dieser Taste ausgeführt. Anlagen, deren Relaishardware auf keinen der bekannten Aktionscodes reagiert, bleiben unverändert. |
| `dryContact.mode` | Nummer | - | Relaismodus (0 = aus) |
| `dryContact.settingsJson` | Zeichenkette (JSON) | - | Die vollständigen Relais-Einstellungen, wie sie vom Gerät gemeldet werden, unverändert |
| `dryContact.settingsUpdated` | Nummer | - | Wann die Relais-Einstellungen zuletzt ausgelesen wurden |
| `alarms.cloudActiveCount` / `alarms.cloudActiveJson` | Zahl / Zeichenkette (JSON) | - | Aktive Alarme des Wechselrichters und seiner DTU, wie sie in der Cloud aufgelistet sind (`code`, `time`, `source`, Rohdatenwörter), aktualisiert bei langsamer Abfrage |
| `history.powerJson` / `batteryPowerJson` / `socJson` / `pvPowerJson` | string (JSON) | W / W / % / W | Heutige Kurven für Wechselstromleistung, Batterieleistung, Ladezustand und - mit PV-Anlage am Wechselrichter - PV-Leistung, ein Wert alle 5 Minuten; `history.startTime` (ms) und `history.stepTime` (s) wie für die lokale Kurve. Aktualisiert durch langsame Abfrage. |
| `battery.maxChargeCurrent` / `maxDischargeCurrent` | Nummer | A | Stromgrenzen, die die Batterie zulässt |
| `battery.chargeCutoffVoltage` / `dischargeCutoffVoltage` | Nummer | V | Spannungsgrenzen der Batterie |
| `battery.cellTempMax` / `cellTempMin` | Nummer | °C | Heißeste / kälteste Zelle |
| `battery.moduleTempMax` / `moduleTempMin` | Nummer | °C | Heißestes / kältestes Modul |
| `battery.cellVoltageMax` / `cellVoltageMin` | Nummer | V | Höchste / niedrigste Zellspannung |
| `battery.moduleVoltageMax` / `moduleVoltageMin` | Nummer | V | Höchste / niedrigste Modulspannung |
| `battery.inverterVoltage` / `inverterCurrent` / `inverterPower` | Nummer | V / A / W | Die Messung erfolgt an den Anschlüssen der gleichen Batterie wie beim Wechselrichter. |
| `battery.inverterVoltage` / `inverterCurrent` / `inverterPower` | Zahl | V / A / W | Die Spannung wird an den Anschlüssen der gleichen Batterie wie beim Wechselrichter gemessen. |

### `station-<id>.*` - Messpunkte: Netzzähler, Lasten, PV-Zähler, Generator (Cloud, dynamisch)
Die Daten werden für jede Anlage, die über entsprechende Daten verfügt, aus der Cloud ausgelesen. Der Adapter fragt nur die Daten ab, die in der Cloud als vorhanden gekennzeichnet sind. Anlagen ohne diese Daten verursachen daher keine zusätzlichen Abfragen und erhalten keine zusätzlichen Statusinformationen. Der Zugriff ist schreibgeschützt und erfordert ein Installateur-Konto. Die Werte werden nach dem Upload des Geräts in die Cloud (ca. alle 5 Minuten) aktualisiert. Die Daten werden unverändert übernommen. Zeilen mit der Kennzeichnung ⁺ wurden vom Referenzsystem nicht erfasst und werden nur angezeigt, wenn Ihre Anlage sie meldet.

| Bundesland | Typ | Einheit | Beschreibung |
|-------|------|------|-------------|
| `gridMeter.connected` | boolesch | - | Netzzähler online gemeldet |
| `gridMeter.l1Voltage` / `l1Current` / `l1Power` / `l1ReactivePower` / `l1PowerFactor` (auch `l2…`, `l3…`) | Nummer | V / A / W / var / - | Messwerte des Netzzählers pro Phase |
| `gridMeter.importToday` / `exportToday` ⁺ (auch pro Phase: `l1ImportToday`, `l1ExportToday`, …) | Anzahl | kWh | Heute aus dem Netz entnommene / in das Netz eingespeiste Energie |
| `load.l1Voltage` / `l1Power` (auch `l2…`, `l3…`) | Nummer | V / W | Spannung und Wirkleistung auf der Lastseite |
| `load.energyToday` ⁺ (auch pro Phase: `l1EnergyToday`, …) | Anzahl | kWh | Heute verbrauchte Energie |
| `load.mode` / `modeText` ⁺ | Zahl / Zeichenkette | - | Lademodus, als Zahl und als Wortwolke |
| `pvMeter.connected` | Boolescher Wert | - | PV-Zähler online gemeldet (ein Zähler an einem PV-Wechselrichter eines Drittanbieters) |
| `pvMeter.power` / `reactivePower` / `frequency` | Anzahl | W / var / Hz | Summen des gemessenen PV-Wechselrichters |
| `pvMeter.l1Voltage` / `l1Current` / `l1Power` / `l1ReactivePower` (auch `l2…`, `l3…`) | Nummer | V / A / W / var | Messwerte des PV-Zählers pro Phase |
| `pvMeter.energyToday` ⁺ (auch pro Phase: `l1EnergyToday`, …) | Anzahl | kWh | Energie des gemessenen PV-Wechselrichters heute |
| `generator.state` / `stateText` ⁺ | Zahl / Zeichenkette | - | Generatorstatus |
| `generator.power` / `reactivePower` / `frequency` ⁺ | Anzahl | W / var / Hz | Generatorgesamtwerte |
| `generator.l1Voltage` / `l1Current` / `l1Power` / `l1ReactivePower` (auch `l2…`, `l3…`) ⁺ | Nummer | V / A / W / var | Messwerte des Generators pro Phase |
| `generator.energyToday` ⁺ (auch pro Phase: `l1EnergyToday`, …) | Anzahl | kWh | Generatorenergie heute |
| `generator.energyToday` ⁺ (auch pro Phase: `l1EnergyToday`, …) | Zahl | kWh | Generatorenergie heute |

### Zustände auf Adapterebene
| Bundesland | Typ | Beschreibung |
|-------|------|-------------|
| `info.connection` | Boolescher Wert | Beliebiges verbundenes Gerät (lokal oder Cloud) |
| `info.cloudLastError` | Zeichenkette | Letzter permanenter Cloud-Anmeldefehler (leer, wenn OK). Nicht leere Werte pausieren die automatischen Wiederholungsversuche, bis die Anmeldeinformationen korrigiert sind. |
| `info.cloudLastError` | Zeichenkette | Letzter permanenter Cloud-Anmeldefehler (leer, wenn OK). Nicht leere Werte pausieren die automatischen Wiederholungsversuche, bis die Anmeldeinformationen korrigiert sind. |

## Protokoll
### Lokal (TCP/Protobuf)
- **Transport:** TCP-Port 10081
- **Kodierung:** Protocol Buffers (protobuf)
- **Frame:** 10-Byte-Header (`HM`-Magic + Befehls-ID + CRC16 + Länge) + Protobuf-Nutzdaten mit Sequenznummern (0-60000)
- **Authentifizierung:** Keine (nur lokales Netzwerk)
- **Verschlüsselung:** Bis einschließlich DTU-Firmware V01.00.x ist keine Verschlüsselung vorhanden. Ab V01.01.01 setzt die DTU Bit 25 von `dfs` in ihrer InfoData-Antwort und erwartet **AES-128-GCM** für jeden zweiten lokalen Frame. Schlüssel und Nonce werden aus dem 16-Byte-`enc_rand` abgeleitet, das unverschlüsselt gesendet wird. Das 16-Byte-Authentifizierungs-Tag folgt dem Chiffretext über die Frame-Länge hinaus. Der Adapter erkennt dies in der ersten Antwort und schaltet selbstständig um. Nur die InfoData-Anfrage und -Antwort bleiben unverschlüsselt.
- **Heartbeat:** Ein Protobuf-Heartbeat nach 20 Sekunden ohne Datenverkehr hält die persistente Verbindung offen
- **Wiederverbindung:** nach 5 Minuten ohne Datenverbindung und bei jeder Trennung, mit exponentieller Verzögerung von 1 Sekunde bis zu 5 Minuten

### Cloud (S-Miles API)
- **Basis-URL:** `https://neapi.hoymiles.com`; Stationen im EU-Rechenzentrum werden von `https://euapi.hoymiles.com` bedient, und der Adapter wählt den Host pro Station aus.
- **Authentifizierung:** Challenge-Login; Argon2id, wenn der Server ein Salt (S-Miles Home) bereitstellt, andernfalls der herkömmliche MD5/SHA-256-Hash, den das Webportal sendet
- **Daten:** Stations-Echtzeitdaten und Details, Gerätebaum, gerätespezifische Echtzeitindikatoren (Hybrid-Wechselrichter, Batterie, Zähler), der schnelle Echtzeit-Burst-Kanal, Tageskurven, Energiestatistiken (Tag, Monat, Jahr, Gesamtlebensdauer), Einnahmen und Kosten, Alarmlisten und Geräteaufgaben (Einstellungsabruf, Ein-/Ausschalten, Neustart)
- **Cloud-Relay:** Der Adapter leitet die Daten der DTU an den in der DTU konfigurierten Server und Port weiter - unverschlüsseltes TCP auf Port 10081 für ältere Firmware, TLS auf Port 10083 (verifiziert mit der Root-CA von Hoymiles) für Firmware V01.01.01 und höher
- **Passwort:** Verschlüsselt in der ioBroker-Konfiguration gespeichert.

### Danksagungen
Gemeinschaftsprojekte, die die ersten Schritte ermöglichten:

- [hoymiles-wifi](https://github.com/suaveolent/hoymiles-wifi) - Python-Bibliothek
- [dtuGateway](https://github.com/ohAnd/dtuGateway) - ESP32-Gateway
- [Hoymiles-DTU-Proto](https://github.com/henkwiedig/Hoymiles-DTU-Proto) - Originale Protobuf-Definitionen

Heute wird das Protokoll anhand der S-Miles-App sowie der Firmware des DTU und des Wechselrichters selbst überprüft.

Vielen Dank an die Nutzer, die ihre Systeme zur Verfügung gestellt haben:

- **BastiBerlin** - Zugang zu einem HAT-6.0HV-EUG1-Hybridsystem mit Batterie, der Referenz für die Unterstützung von Hybrid-Wechselrichtern
- **akwf1927** - Erster Test der DTU-Firmware V01.01.01 auf einem HMS-400W-1T und einem HMS-800W-2T, lokal und über das TLS-Cloud-Relay

## Fehlerbehebung
### Adapter kann keine Verbindung herstellen
- Überprüfen Sie, ob die DTU-IP-Adresse korrekt ist (prüfen Sie die DHCP-Tabelle Ihres Routers).
- Stellen Sie sicher, dass keine andere Anwendung mit Port 10081 verbunden ist (es darf immer nur eine Verbindung gleichzeitig bestehen).
- Falls der dtuGateway ESP32 läuft, stoppen Sie ihn zuerst.

### Nach dem Verbindungsaufbau wurden keine Daten übertragen
- Überprüfen Sie das Adapterprotokoll auf Protobuf-Dekodierungsfehler.
Die Fehlermeldung „Entschlüsselung fehlgeschlagen: ... falsche Blocklänge“ oder „Fehlerhafte Entschlüsselung“ auf einer DTU mit Firmware V01.01.01 bedeutet, dass eine Adapterversion ohne Unterstützung für das verschlüsselte Protokoll verwendet wird. Installieren Sie die aktuelle Version und starten Sie die Instanz neu. Im Protokoll wird dann „DTU erfordert verschlüsselte Kommunikation (Firmware V01.01.01+)“ angezeigt.
Leistungsbegrenzung, Ein-/Ausschalten, Neustart oder Einstellungsänderungen haben keine Auswirkung auf eine DTU mit Firmware V01.01.01, obwohl das Protokoll „Leistungsbegrenzung wird auf … gesetzt“ und eine Befehlsantwort anzeigt: Adapterversionen bis einschließlich 0.5.0 senden Befehle unverschlüsselt an eine solche DTU. Die DTU antwortet, kann den Befehl jedoch nicht entschlüsseln und führt ihn mit leerem Inhalt aus. Aktualisieren Sie den Adapter.

### Cloud-Anmeldung fehlgeschlagen
- Überprüfen Sie Ihre S-Miles-E-Mail-Adresse und Ihr Passwort.
- Stellen Sie sicher, dass Sie sich unter https://global.hoymiles.com/website/login anmelden können.
Bei einem permanenten Authentifizierungsfehler (falsche Anmeldedaten, Konto gesperrt) beendet der Adapter die Wiederholungsschleife, um weitere Kontosperrungen zu vermeiden. Der Fehler wird in `info.cloudLastError` protokolliert und eine ioBroker-Benachrichtigung (Bereich `hoymiles`, Kategorie `cloudAuth`) ausgelöst. Korrigieren Sie die Anmeldedaten und speichern Sie die Konfiguration, um den Status zurückzusetzen und die Wiederholungsversuche fortzusetzen.

### Einen Fehler melden
Um aus einem „Es funktioniert nicht“ ein behebbares Problem zu machen, gibt der Adapter ein fokussiertes, **anonymisiertes** Diagnoseprotokoll aus:

1. Öffnen Sie in der ioBroker-Administration die Einstellungen der Adapterinstanz und stellen Sie den **Protokollierungsgrad** auf `debug` ein.
2. Starten Sie die Instanz neu und lassen Sie sie einige Minuten laufen (ein bis zwei Cloud-Abfragezyklen).
3. Exportieren Sie das Protokoll und wählen Sie die mit `[diag]` gekennzeichneten Zeilen aus.

Die Zeilen `[diag]` enthalten die Rohdaten der Cloud-API-Antworten (Anmeldevorgang, Stationsliste/-details, Gerätebaum, Echtzeitdaten, Firmware) sowie die Ergebnisse des Adapters pro Entscheidung. Die Seriennummern von DTU/Wechselrichter und die E-Mail-Adresse des Kontos werden durch stabile Hash-Token ersetzt, und GPS-Koordinaten/Adresse/Stationsname werden unkenntlich gemacht. Daher können die Zeilen `[diag]` bedenkenlos in einen Fehlerbericht in einem öffentlichen Forum eingefügt werden. (Andere Debug-Zeilen, die nicht zu `[diag]` gehören, können noch die tatsächliche Seriennummer enthalten. Senden Sie daher bitte explizit die Zeilen `[diag]`.)