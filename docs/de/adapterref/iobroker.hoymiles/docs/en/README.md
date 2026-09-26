---
chapters: {"pages":{"en/adapterref/iobroker.hoymiles/README.md":{"title":{"en":"ioBroker.hoymiles"},"content":"en/adapterref/iobroker.hoymiles/README.md"},"en/adapterref/iobroker.hoymiles/docs/en/README.md":{"title":{"en":"ioBroker.hoymiles — Hoymiles HMS microinverters and HAT hybrid inverters"},"content":"en/adapterref/iobroker.hoymiles/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hoymiles/docs/en/README.md
title: ioBroker.hoymiles - Hoymiles HMS-Mikrowechselrichter und HAT-Hybridwechselrichter
hash: qz7HvPvR9qgJunymx9X0AfbQRQvTcRp5BiPnrgN5ryU=
---
![Logo](../../../../../en/adapterref/iobroker.hoymiles/admin/hoymiles.png)

# ioBroker.hoymiles – Hoymiles HMS-Mikrowechselrichter und HAT-Hybridwechselrichter

## Unterstützte Wechselrichter

Dieser Adapter ist für **Hoymiles HMS Mikro-Wechselrichter mit integriertem WiFi (oder WiFi + Bluetooth) DTU** (DTUBI) konzipiert.

**Lokal (TCP)** = direkte TCP/Protobuf-Verbindung über Port 10081 (WLAN-Modelle). **Lokal (BLE)** = lokale Bluetooth-Verbindung über einen [ESPHome Bluetooth-Proxy](https://esphome.io/projects/?type=bluetooth) (WB-Serie). **Cloud** = S-Miles Cloud API – automatische Erkennung, Echtzeitdaten (schneller Burst-Kanal \~1,5–3 s), Energieaggregate, Netzprofil, Wechselrichter ein-/ausschalten + Neustart, DTU-Neustart.

| Modell        | Saiten | Lokal (TCP) | Lokal (BLE)² | Wolke | Status                                                                              |
| ------------- | :----: | :---------: | :----------: | :---: | ----------------------------------------------------------------------------------- |
| HMS-300W-1T   |    1   |      ✅      |       —      |   ✅   | Ungetestet                                                                          |
| HMS-350W-1T   |    1   |      ✅      |       —      |   ✅   | Ungetestet                                                                          |
| HMS-400W-1T   |    1   |      ✅      |       —      |   ✅   | **Getestet** (Lokal + Cloud-Relay, DTU-Firmware V01.01.01)                          |
| HMS-450W-1T   |    1   |      ✅      |       —      |   ✅   | Ungetestet                                                                          |
| HMS-500W-1T   |    1   |      ✅      |       —      |   ✅   | Ungetestet                                                                          |
| HMS-600W-2T   |    2   |      ✅      |       —      |   ✅   | Ungetestet                                                                          |
| HMS-700W-2T   |    2   |      ✅      |       —      |   ✅   | Ungetestet                                                                          |
| HMS-800W-2T   |    2   |      ✅      |       —      |   ✅   | **Getestet** (Lokal + Cloud; lokales + Cloud-Relay auch mit DTU-Firmware V01.01.01) |
| HMS-900W-2T   |    2   |      ✅      |       —      |   ✅   | Ungetestet                                                                          |
| HMS-1000W-2T  |    2   |      ✅      |       —      |   ✅   | **Getestet** (lokal)                                                                |
| HMS-1600DW-4T |    4   |      ✅      |       —      |   ✅   | Ungetestet                                                                          |
| HMS-1800DW-4T |    4   |      ✅      |       —      |   ✅   | Ungetestet                                                                          |
| HMS-2000DW-4T |    4   |      ✅      |       —      |   ✅   | Ungetestet                                                                          |
| HMS-600-2WB   |    2   |      ❌¹     |       ✅      |   ✅   | Ungetestet                                                                          |
| HMS-700-2WB   |    2   |      ❌¹     |       ✅      |   ✅   | Ungetestet                                                                          |
| HMS-800-2WB   |    2   |      ❌¹     |       ✅      |   ✅   | **Getestet** (Cloud; BLE-Gateway-Pfad in der Testphase)                             |
| HMS-900-2WB   |    2   |      ❌¹     |       ✅      |   ✅   | Ungetestet                                                                          |
| HMS-1000-2WB  |    2   |      ❌¹     |       ✅      |   ✅   | Ungetestet                                                                          |
| HMS-1600-4WB  |    4   |      ❌¹     |       ✅      |   ✅   | Ungetestet                                                                          |
| HMS-1800-4WB  |    4   |      ❌¹     |       ✅      |   ✅   | Ungetestet                                                                          |
| HMS-2000-4WB  |    4   |      ❌¹     |       ✅      |   ✅   | Ungetestet                                                                          |

¹ Die **WB-Serie** (verkauft als **„HiFlow Pro“** ) verfügt über keinen lokalen TCP-Port – ihr einziger lokaler Kanal ist Bluetooth LE. Sie ist entweder **lokal über Bluetooth** (Column _Local (BLE)_ ) oder über die **Cloud** erreichbar. Alle WB-Modelle basieren auf derselben Plattform; bisher wurde nur das Modell HMS-800-2WB getestet.

² **Für die lokale BLE-Variante** benötigen Sie einen [ESPHome Bluetooth-Proxy](https://esphome.io/projects/?type=bluetooth) (einen günstigen ESP32) in Ihrem Netzwerk. Der Adapter liest und steuert den Wechselrichter dann lokal über Bluetooth, ohne Cloud-Anbindung. Siehe [BLE-Gateway (ESPHome)](#ble-gateway-esphome) . WiFi(T)-Modelle benötigen dies nicht; sie nutzen den lokalen TCP-Pfad.

**Betrieb nur über die Cloud:** Jeder unterstützte Wechselrichter in Ihrem S-Miles-Konto funktioniert auch ohne lokale Verbindung – der Adapter erkennt ihn automatisch und liefert Echtzeitleistung (Burst-Kanal), Energieaggregate, Netzprofil sowie die Möglichkeit, den Wechselrichter ein-/auszuschalten und neu zu starten. `inverter.active` /`inverter.reboot`) plus DTU-Neustart (`dtu.reboot`) Befehle über die Cloud. Die übrigen Befehle (Leistungsbegrenzung, Sperren, Warnungen löschen, …) erfordern die lokale TCP-Verbindung.

### Hybrid-Wechselrichter mit Batterie (HAT-Serie) – Cloud, schreibgeschützt, experimentell

Ein Hoymiles- **Hybridwechselrichter** in Ihrem S-Miles-Konto – Referenzsystem: **HAT-6.0HV-EUG1** mit einer **HB-(10-23)S-G2-** Batterie, einem Drehstromzähler und einem DTS-WIFI-G1 – wird **über die Cloud** ausgelesen: Drehstromwerte, Notstromleistung (EPS), PV-Einspeisung, detaillierte Batterieinformationen (Ladezustand und Zustand, Zell- und Modul-Extremwerte) sowie der Leistungsfluss und die Energiebilanz der Anlage für heute, diesen Monat, dieses Jahr und die gesamte Lebensdauer – Netzimport und -export, direkt genutzter PV-Strom, Verbrauch, Batterieladung und -entladung sowie der Selbstversorgungsgrad. Zusätzlich werden die Werte aus dem Tab „Produktion & Verbrauch“ der S-Miles-App sowie die Einnahmen- und Kostendaten der Cloud angezeigt. Unterhalb des Wechselrichters finden Sie außerdem die aktuellen Kurven für Wechselstrom, Batterieleistung und Ladezustand, die Alarmliste der Cloud sowie, bei Bedarf vom Gerät abrufbar, die Batterie- und potentialfreien Kontakteinstellungen (Relais). Informationen zu den Zuständen finden Sie unter „Hybridwechselrichter“. Die **Messpunkte** der Anlage – Netzzähler, Verbraucher, ein PV-Zähler an einem Wechselrichter eines Drittanbieters, ein Generator – werden ebenfalls erfasst und unterhalb der Station angezeigt; siehe Stationsmesspunkte. Diese Funktion ist für jede Anlage verfügbar, für die die Cloud Daten liefert, nicht nur für Hybridwechselrichter.

- **Lesen, nicht Steuern.** Arbeitsmodus und Batterieeinstellungen werden angezeigt (`<dtuSerial>.battery.*`), kann aber nicht geändert werden – der Adapter hat keinen Zustand, der die Funktionsweise des Speichersystems beeinflussen würde. Der Befehl „Grid-Profile read“, der für Mikro-Wechselrichter entwickelt wurde, wird nicht an einen Hybrid-Wechselrichter gesendet.
- **Die drei vorhandenen Befehle funktionieren so, wie sie vom S-Miles-Portal gesendet werden.** Die Geräteverwaltung des Portals bietet für einen HAT-Wechselrichter _die Befehle „Einschalten“_ , _„Ausschalten“_ und _„Neustart“_ sowie für dessen DTU einen _Neustart_ – dies sind die Befehle des Adapters. `inverter.active`, `inverter.reboot` Und `dtu.reboot` Bei Speicheranlagen werden sie mit dem Gerätetyp des Wechselrichters und der Speichervariante des DTU-Neustarts ausgeführt, wie es auch das Portal tut. Sie wurden anhand des Portalcodes verifiziert, **nicht auf realer Hardware ausgeführt** – das Abschalten eines Speicherwechselrichters unterbricht auch dessen Backup-Ausgang, daher sollten sie mit Bedacht eingesetzt werden.
- **Es wird ein Installateur-Konto benötigt** (eines, mit dem man sich bei global.hoymiles.com anmelden kann). Der zugehörige Endpunkt ist für die S-Miles Home API nicht bekannt.
- **Aktualisierungsrate:** Der schnelle Echtzeitkanal funktioniert auch für ein Speicherkraftwerk, auch in einer reinen Cloud-Umgebung: PV, Netzstrom, Last und Batteriestrom (`station-<id>.grid.*`) und dem Ladezustand der Batterie (`<dtuSerial>.battery.soc` Die Daten treffen etwa alle 10 Sekunden ein – gemessen am Referenzsystem. Dies entspricht der tatsächlichen Übertragungsfrequenz des Geräts; häufigeres Abfragen liefert keine neuen Informationen. Anders als bei Mikro-Wechselrichtern verfügt der Kanal für Speicheranlagen über keinen gerätespezifischen Modus. Daher werden alle anderen Daten (Phasen, EPS, PV-Eingänge, Batteriedetails, Zähler) im Rahmen des regulären Uploads des Geräts in die Cloud, etwa alle 5 Minuten, übertragen.
- **Welche Werte sind schnell, welche nicht?** Live (etwa alle 10 Sekunden) sind genau fünf Werte: `station-<id>.grid.power` (PV), `grid.gridPower`, `grid.loadPower`, `grid.batteryPower` Und `<dtuSerial>.battery.soc` Die `grid.gridPower` _ist_ der aktuelle Messwert des Netzzählers. Alles andere – einschließlich der Messwerte pro Phase `gridMeter.*`, `load.*` Und `pvMeter.*` Die Werte sind nur so aktuell wie der letzte Upload des Geräts in die Cloud (etwa alle 5 Minuten); die Cloud bietet keine schnellere Möglichkeit, sie zu aktualisieren, auch nicht das Portal.
- **Schilder.** `grid.gridPower` ist +Import/−Export und `grid.batteryPower` +Entladung/−Aufladung, jeweils aus dem Energieflussdiagramm der Cloud. Die Werte pro Gerät und pro Zähler werden so weitergeleitet, wie sie von der Cloud geliefert werden – beachten Sie, dass der _Netzzähler_ die importierte Leistung als **negative** Wirkleistung meldet (`gridMeter.power` ablese −284 W während `grid.gridPower` zeigte +278 W an).
- Erstellt für ein einzelnes System, auf das über das Cloud-Konto des Besitzers zugegriffen wird (danke an BastiBerlin) – bitte melden Sie, was Sie auf Ihrem System sehen.

> Dieser Adapter funktioniert **NICHT** mit: HMS-1600/1800/2000-4T ohne "DW", HM-Serie, MI-Serie, externen DTU-Sticks oder HMT-Drehstrommodellen.

## Konfiguration

Öffnen Sie die Adapterkonfiguration in der ioBroker-Admin-Oberfläche.

### Lokale Verbindung (TCP)

| Einstellung                                  | Standard   | Beschreibung                                                                                                                                                          |
| -------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Lokal aktivieren**                         | An         | Aktivieren Sie die direkte TCP/Protobuf-Verbindung. Der Adapter hält eine dauerhafte TCP-Verbindung mit Protobuf-Heartbeat aufrecht.                                  |
| **DTU-Geräte**                               | (leer)     | Tabelle der DTU-IP-Adressen/Hostnamen. Fügen Sie pro DTU eine Zeile hinzu.                                                                                            |
| **Datenabfrageintervall**                    | 5s         | Sekunden zwischen Datenanfragen (0-300). Stellen Sie 0 für die schnellstmögliche Zeit ein (\~1 Sekunde pro Zyklus).                                                   |
| **Konfigurations-/Alarmabfragefaktor**       | 6          | Konfiguration und Alarme werden in jedem N-ten Datenzyklus abgefragt.                                                                                                 |
| **Totzone der Leistungsbegrenzung**          | 1 %        | Kleinere Änderungen der Leistungsbegrenzung werden nicht an das Gerät gesendet. Jeder Schreibvorgang löscht zwei Flash-Sektoren. 0 = Aus.                             |
| **Mindestintervall für Leistungsbegrenzung** | 60er Jahre | Kürzester Abstand zwischen zwei Leistungsbegrenzungs-Schreibvorgängen. 0 = aus.                                                                                       |
| **Cloud Relay**                              | An         | Leiten Sie Echtzeitdaten im Auftrag der DTU an die Hoymiles Cloud weiter. Andernfalls verhindert die lokale TCP-Verbindung, dass die DTU Daten in die Cloud hochlädt. |

> **Die DTU-Firmware V01.01.01 und höher verschlüsselt die lokale Verbindung.** Der Adapter erkennt dies in der ersten Antwort der DTU und schaltet selbstständig auf AES-128-GCM um – es ist keine Konfiguration erforderlich. Eine solche DTU kommuniziert auch über TLS (Port 10083) mit der Cloud, und das Cloud-Relay verhält sich genauso: Es verbindet sich immer mit dem Server und Port, für den die DTU selbst konfiguriert ist (`config.serverDomain` /`config.serverPort`), mit TLS auf Port 10083 und unverschlüsseltem TCP auf Port 10081. Ältere Firmware (bis Version V01.00.07) funktioniert weiterhin genau wie zuvor.

### Cloud-Verbindung (S-Miles)

| Einstellung                        | Standard | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cloud aktivieren**               | aus      | Hoymiles S-Miles Cloud-API aktivieren                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **S-Miles-E-Mail**                 | —        | Ihre S-Miles-Konto-E-Mail                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **S-Miles-Passwort**               | —        | Ihr S-Miles-Kontopasswort (verschlüsselt gespeichert)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Schnelle Echtzeitdaten (Cloud)** | An       | Leistungsdaten werden sekundengenau aus der Cloud abgerufen (über denselben „Burst“-Kanal, den die S-Miles-App für die Live-Ansicht verwendet). Für Wechselrichter **ohne** lokale Verbindung werden dadurch Aktualisierungen vorgenommen. `grid.power` Und `pvN.power` etwa alle 1,5–3 Sekunden (serverseitig vorgegeben) statt nur alle \~80 Sekunden; lokal angeschlossene Wechselrichter behalten ihre direkten lokalen Echtzeitdaten. Die **Stationsgesamtwerte** liegen unter `station-<id>.grid.*` In jeder Konfiguration, auch in einer rein lokalen, stammen die Daten aus diesem Kanal – da keine lokale Verbindung eine stationsweite Aggregation erzeugen kann, greifen sie bei deaktivierter Option auf die langsame Cloud-Abfrage zurück und hinken der Summe der einzelnen Wechselrichter sichtbar hinterher. |

Alle Wechselrichter in Ihrem Cloud-Konto werden automatisch erkannt. Eine manuelle Konfiguration der Seriennummern ist nicht erforderlich.

Beide Verbindungen können gleichzeitig aktiviert werden. Lokale Daten haben Priorität – Cloud-Daten werden verwendet, wenn die DTU offline ist (z. B. nachts).

#### Kontotypen — S-Miles-Installateur / Endnutzer / Privatkunden

Der Adapter akzeptiert Konten von allen drei offiziellen Hoymiles-Apps:

- **S-Miles-Installateur** (`com.hm.hemaiInstall1`)
- **S-Miles Endbenutzer** (`com.hm.hemaiClient1`)
- **S-Miles Home** (`com.hm.balcony`)

Der Login ist ein einzelner v3-Flow, gefolgt von einer Profilprüfung (`region_c → pre-insp → login → probe`):

- **Vorabprüfung und Anmeldung** bestimmen die Authentifizierungsvariante. Hoymiles hat alle Konten auf Argon2id vereinheitlicht (`v=3 + salt`) im Jahr 2026, also `v` ist kein Profilsignal mehr – Installateur-, Endbenutzer- und Heimkonten verwenden heute alle dieselbe Argon2id-Herausforderung (Parameter aus der S-Miles Home Android-App): `t=3, m=32 MiB, p=1, hashLen=32, V13` Das Vermächtnis `md5hex(password).sha256base64(password)` Die Herausforderung wird als Ausweichlösung für jede Region beibehalten, die noch immer `v=2` Die
- **Sonde** (`/pvm/.../select_by_page` entscheidet dann, auf welcher Daten-API-Oberfläche das Konto zugelassen wird:
  - Probe akzeptiert → **Installer-** Profil — das Konto funktioniert auf `global.hoymiles.com` und erreicht die volle `/pvm/...` Web-API, einschließlich `latitude` /`longitude` /`address` /`local_time` /`status` /`warn_data` und Firmware-Versionszeichenfolgen.
  - Anfrage abgelehnt (Server meldet: _„Kann nur für die Anmeldung bei der S-Miles Home App verwendet werden“_ ) → **Heimprofil** – vom Server eingeschränkt auf `/pvmc/.../*_c` Diese Oberfläche lässt die oben genannten Felder aus, stellt aber einige zusätzliche Informationen bereit (Rückfluss-/Eigenverbrauchsenergie, Strompreis). Der Adapter erzeugt **keine** Zustände für die fehlenden Felder – sie erscheinen nur, wenn die zugrunde liegende Antwort den entsprechenden Wert enthält. `latitude` /`longitude` /`address` werden für Privatkonten über die Zusatzversicherung wiederhergestellt `pvm-ext/station-ak/find` Der Endpunkt, den die S-Miles Home App selbst verwendet, sorgt dafür, dass die Wetterabfrage funktioniert.

> **Notiz:** `dataeu.hoymiles.com:10081` (einfache, ältere Firmware) und `dataeu.hoymiles.com:10083` (TLS, Firmware V01.01.01 und höher) sind die europäischen Cloud-Relay-Endpunkte, an die DTUs Daten senden – sie sind **keine** Benutzeranmeldeserver. Der Adapter verwaltet Cloud-Relay automatisch (siehe _Cloud-Relay_ ).

#### Cloud-Anmeldung testen

Klicken Sie im Zweifelsfall auf die Schaltfläche **„Cloud-Anmeldung testen“** neben dem Passwortfeld. Dadurch werden die vier Phasen einmal mit Ihren aktuellen Anmeldedaten durchlaufen (`region_c`, `pre-insp`, `login`, `probe` und Berichte `v` und das Vorhandensein von Salt aus der Vorabprüfung, ob die Anmeldung ein Token erzeugt hat und welches Profil die Sonde zugewiesen hat (`installer` /`home` Das Ergebnis wird protokolliert, sodass Sie es in einen Fehlerbericht im Forum einfügen können. Der Test speichert kein Token und ändert auch nicht den Adapterstatus.

### BLE-Gateway (ESPHome)

Einige Wechselrichter – beispielsweise die **WB-Serie** (z. B. HMS-800-2WB) – sind nur über **Bluetooth** und nicht über Ihr normales Netzwerk erreichbar. Um sie ohne Cloud-Anbindung zu nutzen, benötigen Sie eine kleine, kostengünstige Bluetooth-Bridge (einen **ESPHome Bluetooth Proxy** ) für Ihr Netzwerk. Der Adapter kann dann über diese Bridge mit Ihrem Wechselrichter kommunizieren.

**1. Richten Sie die Bluetooth-Brücke ein.** Flashen Sie einen kompatiblen ESP32 mit der fertigen Firmware – verwenden Sie dazu **den Link „Bluetooth-Proxy flashen“** in den Einstellungen oder <https://esphome.io/projects/?type=bluetooth> . Schließen Sie ihn in der Nähe Ihres Wechselrichters an. Es sind keine weiteren Konfigurationen erforderlich.

**2. Fügen Sie Ihren Wechselrichter hinzu.** Öffnen Sie in den Adaptereinstellungen den **BLE-** Tab und aktivieren Sie **„BLE-Gateway aktivieren“** . Speichern Sie die Einstellungen. Klicken Sie bei eingeschaltetem Wechselrichter **auf „Gefundene Wechselrichter hinzufügen** “. Ihr Wechselrichter wird nun mit Seriennummer und Adresse in der Tabelle angezeigt. Geben Sie die **PIN** (die Sie am Wechselrichter festgelegt haben) ein, aktivieren Sie **„Aktiv“** und speichern Sie die Einstellungen. Fertig – der Adapter verbindet sich.

**Gut zu wissen**

- Sie wählen keine Bridge aus. Wenn mehrere vorhanden sind, verwendet der Adapter automatisch diejenige mit dem besten Signal.
- Wenn **Add detected inverters** nichts findet, befindet sich kein Wechselrichter in Bluetooth-Reichweite einer Bridge.
- Eine falsche PIN schaltet das Gerät wieder aus; der Grund wird im Status angezeigt. `info.bleLastError` Korrigieren Sie die PIN und speichern Sie die Einstellungen, um es erneut zu versuchen.
- Wenn der Wechselrichter über Nacht abgeschaltet wird, endet die Bluetooth-Verbindung und die Zustände werden als veraltet markiert (`info.connected` =`false` Der Adapter verbindet sich morgens automatisch wieder. Sollte die Bluetooth-Verbindung nicht wiederhergestellt werden, liefert die Cloud die Werte, bis dies der Fall ist – vorausgesetzt, die Cloud-Verbindung ist aktiviert.

### Anschluss eines Energiezählers (Shelly / ecotracker)

Ein über Bluetooth verbundener Wechselrichter (Serie WB) kann einen **Energiezähler** mitnutzen. Dieser zeigt Ihnen nicht nur Ihre Produktion an, sondern auch den Stromfluss ins und aus dem Netz – und auf Anfrage drosselt der Wechselrichter seine Leistung, sodass **keine Energie mehr ins Netz eingespeist wird** (Null-Export).

**Voraussetzung:** Der Zähler muss sich im selben Netz befinden und sich dort melden. Der Wechselrichter sucht ihn selbstständig; der gefundene Zähler wird in der Auswahl angezeigt.

**Vorgehensweise:** Klicken Sie im _Konfigurationsmanager_ auf das Zählersymbol Ihres Wechselrichters. Der Wechselrichter sucht automatisch nach Zählern im Netzwerk – wählen Sie einen aus der Liste und anschließend den gewünschten Modus aus.

| Modus           | Wirkung                                                                                                                                                        |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Aus**         | Es werden keine Daten gesendet; die bestehende Verbindung bleibt unverändert.                                                                                  |
| **Nur Zähler**  | Der Wechselrichter liest den Zählerstand aus. Die Werte werden unter folgendem Abschnitt angezeigt: `<serial>.meter.*` Nichts ist reguliert.                    |
| **Null Export** | Der Wechselrichter behandelt den Zähler zusätzlich als Netzzähler und drosselt seine eigene Leistung, sobald ein Überschuss ins Netz eingespeist werden würde. |

Die Regelung erfolgt **im Wechselrichter selbst** – der Adapter dient lediglich der Einrichtung und Überwachung. Er muss nicht in Betrieb sein, damit er funktioniert.

> **Wichtig:** Der Zähler muss sich **über mDNS** im Netzwerk anmelden. Kann der Wechselrichter ihn dort nicht finden, übernimmt er zwar die Einstellung, ruft aber keine Daten ab. Ein Original-Shelly-Zähler erledigt dies standardmäßig; bei einem Emulator (z. B. Uni-Meter) muss dessen mDNS-Dienst aktiv sein.

**Gut zu wissen**

- `meter.gridPower` Das ist der Netzaustausch: positiv = Import, negativ = Export. Daneben gibt es `pvPower`, `loadPower`, `storagePower` Und `plugPower` — Die Aufteilung wird vom Wechselrichter berechnet.
- Pro Phase erhält man `meter.l1Voltage` /`l1Current` /`l1Power` (gleiches gilt für L2 und L3) plus `meter.frequency` Die Leistung ist vorzeichenbehaftet: Ein negatives Vorzeichen bedeutet, dass die Phase aktuell exportiert.
- `meter.connected` Zeigt an, ob der Zähler aktuell Strom liefert. Wenn der Wert „Ja“ lautet, …`false` Die Verbindung zum Zähler ist unterbrochen – bestätigen Sie einfach den Modus erneut im Dialog, um die Verbindung wiederherzustellen.
- Nur die WB-Serie kann das. Die WiFi (T)-Modelle haben weder einen Messeingang noch eine entsprechende Regelung, daher wird das Symbol dort nicht angezeigt.

## Konfigurationsmanager

Der Adapter integriert sich in den ioBroker **Config Manager** , sodass jeder Wechselrichter und jede Cloud-Station als Karte auf der Registerkarte _Config Manager_ in der Admin-Benutzeroberfläche angezeigt wird – mit Live-Status, Steuerelementen und einem Einstellungsdialog, ohne dass Sie Ihre eigene VIS-Ansicht erstellen müssen.

**Was gezeigt wird**

- Jeder **DTU/Wechselrichter** (`<dtuSerial>`) und jede **Wolkenstation** (`station-<id>`) der Adapter erstellt hat.
- Eine **Statusanzeige (grün/rot) zeigt die aktuelle Verbindung an** , und bei lokal angeschlossenen DTUs die **WLAN-Signalqualität in Prozent** (0–100 %). Der Kartentitel enthält den Namen des Kraftwerks, zu dem der Wechselrichter gehört – den Namen, den Sie ihm in der S-Miles-App gegeben haben – sowie die Seriennummer des DTU (z. B. 127-2000). `Zuhause · 4143A01CEDE4`), wodurch jeder Wechselrichter eindeutig identifiziert wird; ohne Station wird auf den Modellnamen oder die Seriennummer zurückgegriffen.
- **Live-Werte direkt auf der Karte:** aktuelle Leistung (W), heutige Energie (kWh), die tatsächliche Leistung jedes PV-Strings am Wechselrichter (eine Zeile pro String) und die Wechselrichtertemperatur – alles automatisch aktualisiert. Die Stationen zeigen die Gesamtleistung, die **PV-Auslastung in Prozent** , die tägliche, jährliche und Gesamtenergie sowie die täglichen und gesamten Einnahmen in der Währung des Kraftwerks an (die Einnahmenzeilen werden nur angezeigt, wenn ein Strompreis in der Cloud konfiguriert ist).
- Ein **Gerätesymbol** nach Typ – ein flacher Mikro-Wechselrichter, ein stehender Dreiphasen-Wechselrichter (HMT-Reihe) oder eine Station. Dieselben Symbole werden für die Geräteobjekte in der Objektstruktur verwendet.
- Eine **Firmware-Update-Anzeige** , wenn die Cloud ein solches Update meldet (von `dtu.fwUpdateAvailable`).
- Die Schaltfläche **„Mehr“** öffnet ein schreibgeschütztes Detailfenster mit folgenden Bereichen: **Wechselrichter** (Modell, Seriennummer, Hardware-/Softwareversion), **DTU/Firmware** (Seriennummer, Firmwareversionen, WLAN-Version, Update-Anzeige), **Netzwerk** (verwendete Adresse, Signalqualität, SSID, IP- und MAC-Adresse, DNS, DHCP) und **Cloud-Server** (Domäne, Port). Die Bereiche „Netzwerk“ und „Server“ werden nur für lokal angeschlossene Geräte angezeigt, da diese Werte ausschließlich über die lokale Verbindung übertragen werden.

> **Warum werden nicht alle Netzwerkfelder angezeigt?** Die Konfigurationsnachricht der DTU deckt die **gesamte Hoymiles-DTU-Familie** ab. Neben den WLAN-Feldern enthält sie Felder für **kabelgebundene Netzwerke** (IP, MAC, Subnetzmaske, Gateway, Kabel-DNS) sowie Felder für **Mobilfunk** (APN, GPRS) und Sub-1-GHz-Funk. Ein HMS-Wechselrichter ist ausschließlich WLAN-fähig, daher bleiben seine kabelgebundenen Felder unverändert. `0.0.0.0` Und `00:00:00:00:00:00` Der Adapter blendet alle Felder aus, für die das Gerät keinen gültigen Wert meldet – andernfalls würde das Bedienfeld eine nicht existierende Adresse anzeigen. Ein numerischer Wert `0` bleibt sichtbar: Bei einem Flag wie DHCP bedeutet dies eine Antwort, nicht eine Abwesenheit. Stationen zeigen Kapazität, Status und Adresse an.

**Steuerelemente und Einstellungen – aufgeteilt nach Persistenz**

Die Karte spiegelt die beschreibbaren Zustände wider, sodass ein Klick über den normalen Befehlspfad geleitet wird (lokale TCP-Verbindung bevorzugt, Cloud-Fallback). Die beiden Dialoge unterscheiden sich ausschließlich dadurch, **welche Daten das Gerät speichert** :

> ⚠️ Die Statusbezeichnungen sind hier irreführend; die Firmware entscheidet anders: `inverter.powerLimit` Klingt wie ein Laufzeitparameter, wird aber in die persistente Struktur geschrieben und kostet zwei 4-KB-Flash-Sektoren pro Änderung, während `config.limitPowerMyPower` wird als „persistent“ bezeichnet, befindet sich aber nur im RAM und ist nach einem Neustart nicht mehr vorhanden. Beide sind firmware-verifiziert (`_fwanalysis/ADAPTER_FINDINGS.md` §1, §2, §15).

**Steuerelemente** (Schieberegler-Symbol) – hier bleibt nach einem DTU-Neustart nichts erhalten:

- **Bedienung (Schalter):** Wechselrichter ein/aus, Wechselrichter verriegeln.
- **Laufzeit:** Leistungsbegrenzung (DTU-Konfigurationsfeld) als Schieberegler, Cloud-Sendeintervall. Beide Einstellungen werden beim Neustart vom DTU vergessen.

Jedem Schieberegler ist sein aktueller Wert und seine Einheit vorangestellt, da diese erst beim Ziehen des Schiebereglers sichtbar werden.

**Einstellungen** (Zahnradsymbol, nur lokale Geräte) – alles, was die DTU speichert:

- Leistungsgrenze, Leistungsfaktorgrenze, Blindleistungsgrenze.
- Jedes Feld enthält den Hinweis, dass häufige Änderungen den Gerätespeicher belasten. Der Dialog speichert **nur die tatsächlich geänderten Felder** – unveränderte Felder werden nicht überschrieben.

**Kartentasten** (mit Bestätigung): Wechselrichter neu starten, DTU neu starten und – **nur wenn etwas zu bestätigen ist** – Warnungen bestätigen und Erdschluss bestätigen. Die Warntaste erscheint, während `alarms.hasActive` Die Erdungstaste ist nur dann aktiv, wenn die Alarmliste einen Eintrag mit dem Erdungsalarmcode (182) enthält. Beide Tasten werden erst angezeigt, nachdem die Alarmliste gelesen wurde.

> Bei der **WB-Serie** wird die Erdungstaste nicht angezeigt: Die Firmware akzeptiert den Befehl, führt ihn aber nachweislich nicht aus (leerer Zweig, Antwort „kein Fehler“). Eine Taste, die Erfolg meldet, aber keine Funktion hat, ist irreführend. Bei der T-Serie wird der Befehl ausgeführt.

> **Hinweis zur Admin-Version:** Die Karte nutzt bewusst nur Anzeigefunktionen, die von älteren Admin-Versionen unterstützt werden. Admin 7.8.x enthält die Geräte-Manager-GUI. `dm-utils 3.0.x` Formular, das noch keine benutzerdefinierten Statussymbole kennt (`indicators`) und verwirft sie spurlos – so dass die WLAN-Qualität und die PV-Auslastung dort bleiben, wo sie in jeder Version gerendert werden, und die Bestätigungssymbole in der Größe ausgeliefert werden, in der sie erscheinen sollen (der Administrator skaliert sie nicht).

Bei Wechselrichtern **mit reiner Cloud-** Anbindung (ohne lokale Verbindung, z. B. HMS-800-2WB) werden nur die Aktionen angezeigt, die über die Cloud ausgeführt werden können – Wechselrichter ein/aus, Wechselrichter neu starten, DTU neu starten –, da die anderen Befehle nur lokal verfügbar sind. Stationen zeigen lediglich Status und Details an (keine Steuerungsmöglichkeiten).

**Instanzaktionen** (oberhalb der Geräteliste): **„Netzwerk scannen“** durchsucht das LAN nach DTUs und meldet die gefundenen Ergebnisse, und **„Cloud-Anmeldung testen“** führt die Anmeldediagnose durch. (Zum Neuladen der Liste wird die integrierte Aktualisierungsschaltfläche des Konfigurationsmanagers verwendet.)

> **Hinweis:** Geräte, die später über die Cloud gefunden werden (bis zu ca. 60 Sekunden nach dem Start), erscheinen nach dem Drücken **der Aktualisierungstaste** oder dem erneuten Öffnen des Tabs; der Live-Status bereits aufgelisteter Geräte wird automatisch aktualisiert.

## Verbindungsmodi

Der Adapter unterstützt je nach Konfiguration verschiedene Verbindungsmodi:

|                        | Nur für lokale Nutzer       | Lokal + Relais                     | Nur Wolken          | Lokal + Cloud               | Lokal + Relais + Cloud                 |
| ---------------------- | --------------------------- | ---------------------------------- | ------------------- | --------------------------- | -------------------------------------- |
| **TCP-Abfrage**        | Ja                          | Ja                                 | —                   | Ja                          | Ja                                     |
| **Wiederverbinden**    | Zurückweichen 1–60 Sekunden | Zurückweichen 1–60 Sekunden        | —                   | Zurückweichen 1–60 Sekunden | Zurückweichen 1–60 Sekunden            |
| **Cloud Relay**        | —                           | HB 60s, Daten alle `serverSendTime` | —                   | —                           | HB 60s, Daten alle `serverSendTime`     |
| **Wolke beim Start**   | —                           | —                                  | Vollständiger Abruf | Vollständiger Abruf         | Vollständiger Abruf                    |
| **Cloud (WR online)**  | —                           | —                                  | Alle 5 Minuten      | Jeder `serverSendTime`       | 30 Sekunden nach dem Senden des Relais |
| **Cloud (WR offline)** | —                           | —                                  | Alle 5 Minuten      | Wetter + FW nur             | Wetter + FW nur                        |

### Automatische Wiederverbindung

Der Wechselrichter (DTU) ist nur erreichbar, wenn er Strom erzeugt (Sonnenschein). Der Adapter verbindet sich automatisch mit exponentieller Verzögerung (1 s, 2 s, 4 s, ... bis maximal 60 s). Nach erfolgreicher Verbindung wird die Verzögerung auf 1 s zurückgesetzt.

BLE-Geräte (HMS-800-2WB) verwenden dasselbe Prinzip, jedoch mit langsameren Schritten, da jeder Versuch eine vollständige GATT-Runde über den Bluetooth-Proxy auslöst: 5 s, 10 s, 20 s, ... bis maximal 5 min. Nach erfolgreicher Kopplung erfolgt ein Reset. Fehlgeschlagene Versuche während der Nacht werden protokolliert. `debug` Nur der erste Fehler einer Serie wird als Warnung angezeigt.

### Cloud-Downlinks (Server → Adapter)

> **Das Relay betrifft ausschließlich TCP-Geräte** (HMS-\*-xT). Dort bedient die DTU einen einzelnen Socket auf Port 10081: Solange der Adapter lokal verbunden ist, kann das Gerät die Cloud nicht erreichen, daher lädt der Adapter die Daten in seinem Namen hoch. Ein BLE-Gerät (HMS-800-2WB) verfügt über keinen lokalen TCP-Port; der Adapter trennt seine Cloud-Verbindung nie und lädt die Daten selbstständig hoch. Daher startet der Adapter **kein** Relay für BLE-Geräte – es würde einen zweiten Datenstrom unter derselben Seriennummer erzeugen.
>
> Das Relay verbindet sich über die DTU-Konfiguration mit dem Server und Port. Auf Port 10083 (Standardport der Firmware-Version V01.01.01 und höher) verwendet es TLS und verifiziert den Server anhand der Hoymiles-eigenen Zertifizierungsstelle, genau wie die DTU selbst. Auf Port 10081 verwendet es unverschlüsseltes HM, wie ältere Firmware-Versionen. Die Datenpakete sind in beiden Fällen identisch – die DTU identifiziert sich gegenüber der Cloud ausschließlich über ihre Seriennummer, nicht über ein Zertifikat.

Während das Relay läuft, bestätigt der Cloud-Server die Uploads und sendet gelegentlich Befehle. Der Adapter ordnet **jede** dieser Nachrichten seinem Firmware-Namen zu:

| Art                             | Beispiele                                                                            | Verhalten                                                                                                                                        |
| ------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Danksagungen für unsere Uploads | `InfoDataRes`, `HBRes`, `RealRes`, `HistoryRes`                                      | Serverzeit und Zeitzonenverschiebung werden gelesen; wenn der Server einen Upload ablehnt (`error_code ≠ 0`) Es wird eine Warnung protokolliert |
| Befehle                         | `CommandRes` (Aktion)                                                                | wird über die lokale Verbindung an das Gerät übergeben; der Server empfängt eine Bestätigung und den Status.                                     |
| Datenanfragen                   | Rasterprofil (Aktion 41), Version (Aktion 4)                                         | Die Antwort basiert auf lokal gelesenen Daten.                                                                                                   |
| Nicht ausgeführt                | OTA-Download (Aktion 2/15), Konfigurationsschreibvorgänge (Aktionen 52–54 und 56/57) | **absichtlich verweigert** und protokolliert – ein Firmware-Update oder eine Serverumleitung wird niemals unbeaufsichtigt durchgeführt.          |

Nachrichten, deren Verhalten noch nicht festgelegt ist, werden mit Namen und Länge protokolliert, anstatt verworfen zu werden. Eine nicht implementierte Downlink-Verbindung ist daher im Protokoll sichtbar und nicht mehr von einer gar nicht vorhandenen Downlink-Verbindung zu unterscheiden.

### Nachtmodus

Wenn die lokale Verbindung abbricht (typischerweise bei Sonnenuntergang), schaltet der Adapter in **den Nachtmodus** :

- Die Cloud-Weiterleitung pausiert (sendet einen letzten Daten-Upload und trennt dann die Verbindung).
- Die Cloud-API beschränkt sich auf Wetteraktualisierungen und Firmware-Prüfungen (keine Echtzeitdaten, da sich nichts ändert).
- Sobald die lokale Verbindung wiederhergestellt ist (Sonnenaufgang), verlässt der Adapter den Nachtmodus und nimmt den normalen Betrieb wieder auf.

### Staatliche Qualität

Der Adapter verwendet das Statusqualitätsattribut von ioBroker (`q`) um die Zuverlässigkeit und Quelle der Datenwerte anzugeben:

| Qualität              | Wert        | Bedeutung                      | Wann                                                                                                                                                                                                                                   |
| --------------------- | ----------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Gut                   | `0x00` (0)  | Frische, lokal bezogene Daten  | Normalbetrieb – Daten werden direkt von der DTU über TCP empfangen.                                                                                                                                                                    |
| Ersatz                | `0x40` (64) | Ausweichdaten aus der Cloud    | Wechselrichterdaten werden über die Hoymiles Cloud API anstatt über lokales TCP abgerufen (nur Cloud-Geräte).                                                                                                                          |
| Gerät nicht verbunden | `0x42` (66) | Veraltete Daten, Gerät offline | DTU-Verbindung unterbrochen – die Werte sind die letzten bekannten Messwerte vor der Trennung. Auch in Cloud Station eingestellt. `grid.*` wenn der letzte Cloud-Upload der Station älter als ca. 20 Minuten ist (DTU lädt nicht hoch). |

**Betroffene Staaten:** `grid.*`, `pv*.*`, `inverter.temperature`, `inverter.active`, `inverter.warnCount`, `inverter.warnMessage`, `inverter.activePowerLimit`, `meter.*` — plus die Messungen der Wolkenstation `station-<id>.grid.*` (markiert) `0x42` (während der Sender offline/veraltet ist).

Info-Angaben (`info.*`), Konfigurationszustände (`config.*`), und statische Stations-Cloud-Daten (Name, Adresse, Koordinaten, Warnhinweise) sind von Qualitätsänderungen **nicht** betroffen.

**Automatischer Reset:** Sobald die lokale DTU-Verbindung wiederhergestellt ist, werden durch die nächste erfolgreiche Datenantwort alle betroffenen Zustände automatisch auf den Qualitätsstandard zurückgesetzt. `0x00` (Gut). Ebenso verhält es sich, wenn eine Cloud-Station den Upload wieder aufnimmt. `grid.*` Qualität kehrt zurück zu `0x00` und der Adapter führt sofort eine vollständige Aktualisierung durch (Details, Geräte, Firmware, Warnungen), bevor er den normalen Abfragezyklus wieder aufnimmt.

Sie können das Qualitätsattribut in Skripten und Visualisierungen verwenden, um zwischen aktuellen und veralteten Daten zu unterscheiden, z. B. durch Abdunkeln oder Ausgrauen von Werten. `q > 0` Die

## Mehrere Wechselrichter

Dieser Adapter unterstützt mehrere Wechselrichter in einer einzigen Instanz:

- **Lokal:** Mehrere DTU-IP-Adressen in der Gerätetabelle hinzufügen
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

### `<dtuSerial>.grid.*` — Netzleistung (pro DTU)

| Zustand              | Typ    | Einheit | Beschreibung         |
| -------------------- | ------ | ------- | -------------------- |
| `grid.power`         | Nummer | W       | Netzausgangsleistung |
| `grid.voltage`       | Nummer | V       | Netzspannung         |
| `grid.current`       | Nummer | A       | Netzstrom            |
| `grid.frequency`     | Nummer | Hz      | Netzfrequenz         |
| `grid.reactivePower` | Nummer | var     | Blindleistung        |
| `grid.powerFactor`   | Nummer | —       | Leistungsfaktor      |
| `grid.dailyEnergy`   | Nummer | kWh     | Tagesenergieertrag   |

### `<dtuSerial>.info.*` — Geräteinformationen (pro DTU)

| Zustand             | Typ             | Beschreibung                                     |
| ------------------- | --------------- | ------------------------------------------------ |
| `info.connected`    | boolescher Wert | Gerät verbunden (lokal oder Cloud)               |
| `info.lastResponse` | Nummer          | Letzte Antwortzeit (Unix-Zeitstempel, nur lokal) |

### `<dtuSerial>.pv0.*` /`pv1.*` / … — PV-Modul-Eingänge (pro DTU)

PV-Kanäle werden dynamisch erstellt, einer pro Wechselrichtereingang (`pv0` …`pv11` (höchstens 12).

Der Adapter bestimmt die Anzahl in dieser Reihenfolge:

1. **Lokal:** aus den Geräteinformationen des Wechselrichters.
2. **Cloud:** aus dem Hoymiles-Regelwerk, nachgeschlagen anhand des Seriennummernpräfixes des Wechselrichters – dieselbe Quelle, die auch die S-Miles-App verwendet. Dies umfasst alle Produktlinien, einschließlich `…-2WB` /`…-4WB` Die
3. **Fallback:** vom Modellnamen (`…-2T`, `…-4WB`, …), oder anhand der Anzahl der Zeichenketten, die tatsächlich in den Live-Daten erscheinen.

| Zustand           | Typ    | Einheit | Beschreibung                 |
| ----------------- | ------ | ------- | ---------------------------- |
| `pvX.power`       | Nummer | W       | Panelstrom                   |
| `pvX.voltage`     | Nummer | V       | Panelspannung                |
| `pvX.current`     | Nummer | A       | Panelstrom                   |
| `pvX.dailyEnergy` | Nummer | kWh     | Tägliche Energie (nur lokal) |
| `pvX.totalEnergy` | Nummer | kWh     | Gesamtenergie (nur lokal)    |

### `<dtuSerial>.inverter.*` — Wechselrichterstatus und -steuerung (pro DTU)

| Zustand                        | Typ             | Einheit | Beschreibbar | Beschreibung                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------ | --------------- | ------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `inverter.serialNumber`        | Zeichenkette    | —       | NEIN         | Seriennummer des Wechselrichters                                                                                                                                                                                                                                                                                                                 |
| `inverter.model`               | Zeichenkette    | —       | NEIN         | Wechselrichtermodell (Cloud)                                                                                                                                                                                                                                                                                                                     |
| `inverter.hwVersion`           | Zeichenkette    | —       | NEIN         | Hardwareversion                                                                                                                                                                                                                                                                                                                                  |
| `inverter.swVersion`           | Zeichenkette    | —       | NEIN         | Softwareversion                                                                                                                                                                                                                                                                                                                                  |
| `inverter.temperature`         | Nummer          | °C      | NEIN         | Wechselrichtertemperatur                                                                                                                                                                                                                                                                                                                         |
| `inverter.powerLimit`          | Nummer          | %       | **Ja**       | Leistungsbegrenzung, 2–100 %, lokal. **Nutzen Sie diesen Zustand für die dynamische Leistungsreduzierung. ⚠️ Jeder Schreibvorgang lädt Programme in den Flash-** Speicher des Geräts (siehe Warnung unten) – der Adapter drosselt ihn daher mit einer Totzone und einem Mindestintervall.                                                        |
| `inverter.activePowerLimit`    | Nummer          | %       | NEIN         | Aktive Leistungsbegrenzung (live, lokal)                                                                                                                                                                                                                                                                                                         |
| `inverter.active`              | boolescher Wert | —       | **Ja**       | Wechselrichter ein-/ausschalten (lokal; bei reinen Cloud-Geräten über die Cloud). Bei einem Hybrid-Wechselrichter wird der Wert aus der Cloud ausgelesen: eingeschaltet, wenn die Cloud den Betriebszustand „verbunden“ und „im Netzbetrieb“ oder „im Wechselstrombetrieb“ meldet; ausgeschaltet, wenn der Wechselrichter vom Netz getrennt ist. |
| `inverter.reboot`              | boolescher Wert | —       | **Ja**       | Wechselrichter neu starten (Knopf, lokal; über die Cloud für reine Cloud-Geräte)                                                                                                                                                                                                                                                                 |
| `inverter.powerFactorLimit`    | Nummer          | —       | **Ja**       | Leistungsfaktorbegrenzung (-1 bis 1, lokal). ⚠️ Programme blinken wie bei der Leistungsbegrenzung (Aktion 47, gleicher Erfolgspfad) – gedrosselt.                                                                                                                                                                                                |
| `inverter.reactivePowerLimit`  | Nummer          | °       | **Ja**       | Blindleistungsbegrenzung (-50 bis 50, lokal). ⚠️ Programme blinken wie bei der Leistungsbegrenzung (Aktion 48, gleicher Erfolgspfad) – gedrosselt.                                                                                                                                                                                               |
| `inverter.cleanWarnings`       | boolescher Wert | —       | **Ja**       | Warnungen bestätigen (Schaltfläche, lokal). Funktioniert auf beiden Geräteserien.                                                                                                                                                                                                                                                                |
| `inverter.cleanGroundingFault` | boolescher Wert | —       | **Ja**       | Erdschluss bestätigen (Taster, lokal). ⚠️ **Keine Auswirkung auf die WB-Serie** – deren Firmware akzeptiert den Befehl, führt ihn aber nicht aus und meldet trotzdem Erfolg (firmware-verifiziert). Die T-Serie führt ihn aus.                                                                                                                   |
| `inverter.lock`                | boolescher Wert | —       | **Ja**       | Wechselrichter verriegeln/entriegeln (lokal)                                                                                                                                                                                                                                                                                                     |
| `inverter.warnCount`           | Nummer          | —       | NEIN         | SGSMO `warning_number` Feld, Rohwert (lokal) – kein dokumentierter Warncode                                                                                                                                                                                                                                                                       |
| `inverter.warnMessage`         | Zeichenkette    | —       | NEIN         | Aktive Warnmeldung aus der WCode-Alarmliste (lokal)                                                                                                                                                                                                                                                                                              |
| `inverter.linkStatus`          | Nummer          | —       | NEIN         | Linkstatus                                                                                                                                                                                                                                                                                                                                       |

### `<dtuSerial>.dtu.*` — DTU-Informationen (pro DTU, nur lokal außer `dtu.reboot`)

| Zustand                 | Typ             | Einheit | Beschreibung                                                                                                                                                                                           |
| ----------------------- | --------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `dtu.serialNumber`      | Zeichenkette    | —       | DTU-Seriennummer                                                                                                                                                                                       |
| `dtu.swVersion`         | Zeichenkette    | —       | Softwareversion                                                                                                                                                                                        |
| `dtu.hwVersion`         | Zeichenkette    | —       | Hardwareversion                                                                                                                                                                                        |
| `dtu.signalQuality`     | Nummer          | %       | WLAN-Signalqualität (0–100, **nicht dBm)** – die DTU meldet dieselbe abgeleitete Qualität wie `config.wifiSignalQuality`)                                                                              |
| `dtu.reboot`            | boolescher Wert | —       | DTU neu starten ( **beschreibbar** , Schaltfläche). Wird über die lokale TCP-Verbindung gesendet, wenn eine Verbindung besteht, andernfalls über die Cloud für reine Cloud-Geräte (z. B. HMS-800-2WB). |
| `dtu.wifiVersion`       | Zeichenkette    | —       | WLAN-Version                                                                                                                                                                                           |
| `dtu.fwUpdateAvailable` | boolescher Wert | —       | Firmware-Update verfügbar (wird täglich über die Cloud geprüft)                                                                                                                                        |
| `dtu.stepTime`          | Nummer          | S       | Schrittzeit                                                                                                                                                                                            |
| `dtu.accessModel`       | Nummer          | —       | Netzwerkzugriffsmodus (0=GPRS, 1=WLAN, 2=Ethernet)                                                                                                                                                     |
| `dtu.communicationTime` | Nummer          | —       | Letzte Kommunikation (Unix-Zeitstempel)                                                                                                                                                                |
| `dtu.connState`         | Nummer          | —       | DTU-Fehlercode (0=OK)                                                                                                                                                                                  |

### `station-<id>.grid.*` — Stationsaggregate (Wolke)

| Zustand                                                                                                | Typ             | Einheit | Beschreibung                                                                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------ | --------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `grid.power`                                                                                           | Nummer          | W       | Gesamtstationsleistung (Live in \~1,5–3 s über den Burst-Kanal – auch in einer rein lokalen Konfiguration; nur \~80 s, wenn der Burst abgeschaltet ist)                                                                                                                                                                         |
| `grid.gridPower`                                                                                       | Nummer          | W       | Netzaustauschleistung (Echtzeit, +Import/−Export) — nur bei gemessenen Systemen ungleich Null                                                                                                                                                                                                                                   |
| `grid.loadPower`                                                                                       | Nummer          | W       | Last-/Verbrauchsleistung (Echtzeit)                                                                                                                                                                                                                                                                                             |
| `grid.batteryPower`                                                                                    | Nummer          | W       | Batterieleistung (Echtzeit) – nur Batteriesysteme. In einem Speicherkraftwerk: +Entladung/−Laden, wie in den Diagrammen des S-Miles-Portals dargestellt; die Richtung wird dem Energieflussdiagramm der Cloud entnommen, wie es auch das Portal tut.                                                                            |
| `grid.pvUtilization`                                                                                   | Nummer          | %       | PV-Nutzung (Echtzeit)                                                                                                                                                                                                                                                                                                           |
| `grid.dailyEnergy`                                                                                     | Nummer          | kWh     | Tägliche Energie                                                                                                                                                                                                                                                                                                                |
| `grid.gridImportToday` /`gridImportMonth` /`gridImportYear` /`gridImportTotal`                         | Nummer          | kWh     | Energiebezug der Last aus dem Netz heute / diesen Monat / dieses Jahr / insgesamt – Anlagen mit Batteriespeicher oder Netzzähler; Quelle: Registerkarte „Produktion & Verbrauch“ der S-Miles-App                                                                                                                                |
| `grid.gridExportToday` /`gridExportMonth` /`gridExportYear` /`gridExportTotal`                         | Nummer          | kWh     | Heute / diesen Monat / dieses Jahr / insgesamt ins Netz eingespeiste PV-Energie – nur Anlagen mit Batteriespeicher oder Netzzähler; Quelle: Registerkarte „Produktion & Verbrauch“ der S-Miles-App.                                                                                                                             |
| `grid.pvToLoadToday` /`pvToLoadMonth` /`pvToLoadYear` /`pvToLoadTotal`                                 | Nummer          | kWh     | PV-Energie, die heute / diesen Monat / dieses Jahr / insgesamt direkt vom Verbraucher genutzt wird – nur Anlagen mit Batteriespeicher oder Netzzähler; Quelle: Registerkarte „Produktion & Verbrauch“ der S-Miles-App.                                                                                                          |
| `grid.consumptionToday` /`consumptionMonth` /`consumptionYear` /`consumptionTotal`                     | Nummer          | kWh     | Verbrauch heute / diesen Monat / dieses Jahr / insgesamt (Last aus PV + Batterie + Netz) – Anlagen mit Batterie- oder Netzzähler; Quelle: Registerkarte „Produktion & Verbrauch“ der S-Miles-App.                                                                                                                               |
| `grid.selfSufficiencyToday` /`selfSufficiencyMonth` /`selfSufficiencyYear` /`selfSufficiencyTotal`     | Nummer          | %       | Selbstversorgungsgrad heute / diesen Monat / dieses Jahr / insgesamt: Anteil des Verbrauchs, der nicht aus dem Netz bezogen wird (eine Nachkommastelle; 0 bei keinem Verbrauch) – berechnet wie in der App – nur für Anlagen mit Batterie- oder Netzstromzähler; Quelle: Registerkarte „Produktion & Verbrauch“ der S-Miles-App |
| `grid.batteryChargeToday` /`batteryChargeMonth` /`batteryChargeYear` /`batteryChargeTotal`             | Nummer          | kWh     | Heute / diesen Monat / dieses Jahr / insgesamt in die Batterie geladene PV-Energie – nur Batteriesysteme                                                                                                                                                                                                                        |
| `grid.batteryDischargeToday` /`batteryDischargeMonth` /`batteryDischargeYear` /`batteryDischargeTotal` | Nummer          | kWh     | Energie, die die Last heute / diesen Monat / dieses Jahr / insgesamt aus der Batterie bezogen hat – nur Batteriesysteme                                                                                                                                                                                                         |
| `grid.monthEnergy`                                                                                     | Nummer          | kWh     | Monatliche Energie                                                                                                                                                                                                                                                                                                              |
| `grid.yearEnergy`                                                                                      | Nummer          | kWh     | Jährlicher Energie                                                                                                                                                                                                                                                                                                              |
| `grid.totalEnergy`                                                                                     | Nummer          | kWh     | Gesamtlebensdauerenergie                                                                                                                                                                                                                                                                                                        |
| `grid.co2Saved`                                                                                        | Nummer          | kg      | CO2 eingespart                                                                                                                                                                                                                                                                                                                  |
| `grid.treesPlanted`                                                                                    | Nummer          | —       | Entsprechende Anzahl Bäume gepflanzt                                                                                                                                                                                                                                                                                            |
| `grid.electricityPrice`                                                                                | Nummer          | /kWh    | Strompreis                                                                                                                                                                                                                                                                                                                      |
| `grid.currency`                                                                                        | Zeichenkette    | —       | Währungscode                                                                                                                                                                                                                                                                                                                    |
| `grid.isBalance`                                                                                       | boolescher Wert | —       | Null Export aktiv                                                                                                                                                                                                                                                                                                               |
| `grid.isReflux`                                                                                        | boolescher Wert | —       | Einspeisungsaktiv                                                                                                                                                                                                                                                                                                               |
| `grid.todayIncome` /`monthIncome` /`yearIncome` /`totalIncome`                                         | Nummer          | —       | Heutige / monatliche / jährliche / gesamteinnahmen. Sofern der Cloud-Anbieter seine eigene Buchhaltung führt (z. B. bei Anbietern mit Tarif), werden dessen Daten verwendet; andernfalls werden die heutigen/gesamten Einnahmen als Ertrag × Preis geschätzt.                                                                   |
| `grid.todayCost` /`monthCost` /`yearCost` /`totalCost`                                                 | Nummer          | —       | Stromkosten heute / diesen Monat / dieses Jahr / insgesamt, aus der Cloud-Abrechnung – nur Kraftwerke mit Tarif                                                                                                                                                                                                                 |

### `station-<id>.info.*` — Stationsinformationen (Cloud)

| Zustand                | Typ          | Beschreibung                    |
| ---------------------- | ------------ | ------------------------------- |
| `info.stationName`     | Zeichenkette | Stationsname                    |
| `info.stationId`       | Nummer       | Senderkennung                   |
| `info.systemCapacity`  | Nummer       | Systemkapazität (kWp)           |
| `info.address`         | Zeichenkette | Stationsadresse                 |
| `info.latitude`        | Nummer       | GPS-Breitengrad                 |
| `info.longitude`       | Nummer       | GPS-Längengrad                  |
| `info.stationStatus`   | Nummer       | Stationsstatus                  |
| `info.installedAt`     | Nummer       | Installationsdatum              |
| `info.timezone`        | Zeichenkette | Zeitzone                        |
| `info.lastCloudUpdate` | Nummer       | Letzte Aktualisierung der Cloud |
| `info.lastDataTime`    | Nummer       | Letzte DTU-Datenzeit            |

### `station-<id>.weather.*` — Wetter am Bahnhof (Bewölkung)

| Zustand               | Typ          | Einheit | Beschreibung                                                                         |
| --------------------- | ------------ | ------- | ------------------------------------------------------------------------------------ |
| `weather.icon`        | Zeichenkette | —       | Wettersymbolcode ( [OpenWeatherMap](https://openweathermap.org/weather-conditions) ) |
| `weather.description` | Zeichenkette | —       | Wetterbeschreibung auf Deutsch (z. B. „Klarer Himmel“, „Regen“)                      |
| `weather.temperature` | Nummer       | °C      | Aktuelle Temperatur am Messort                                                       |
| `weather.sunrise`     | Nummer       | —       | Sonnenaufgangszeit (Unix-Zeitstempel ms)                                             |
| `weather.sunset`      | Nummer       | —       | Sonnenuntergangszeit (Unix-Zeitstempel in Millisekunden)                             |

> **Wettersymbolcodes:** Die Symbolcodes folgen der [OpenWeatherMap-Konvention](https://openweathermap.org/weather-conditions) . Um das Symbol als Bild anzuzeigen, verwenden Sie: `https://openweathermap.org/img/wn/{icon}@2x.png`

### `station-<id>.warn.*`— Stationswarnungen (Wolke)

Warnmeldungen auf Netz- und Zählerebene aus der Cloud `station/find` Datensatz. Alle booleschen Werte —`true` Das bedeutet, dass der Zustand aktuell aktiv ist. Installer-Konten lesen die Flags von `station/find`; auf S-Miles Home-Konten (wo `find_c` (lässt sie aus) greift der Adapter auf den zurück `realtime_c` Antwort. Dieser Ausweichblock enthält sechs der Flaggen – aber **nicht** `warn.powerLimited`, das nur im Installationsprogramm existiert `station/find` Aufzeichnung — so auch auf Heimkonten `warn.powerLimited` Aufenthalte `false` auch dann, wenn die Drosselung aktiv ist. Die Zustände erscheinen erst, wenn die Cloud eine `warn_data` Blockierung von beiden Quellen.

| Zustand                | Typ             | Beschreibung                                                                                                                                                                                                                                                                                                                                      |
| ---------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `warn.stationOffline`  | boolescher Wert | Station offline / Versorgungsspannung unterbrochen. Abgleich mit der Aktualität der Echtzeitdaten: Eine Station, die noch aktuelle Daten hochlädt, wird niemals als offline gemeldet, selbst wenn die Cloud dies kurzzeitig signalisiert. `s_uoff` (z. B. während das Cloud-Relay beim Start des Adapters die Uplink-Verbindung der DTU übernimmt) |
| `warn.gridUnstable`    | boolescher Wert | Netzspannung instabil                                                                                                                                                                                                                                                                                                                             |
| `warn.gridFault`       | boolescher Wert | Netzstörung / Netzanomalie                                                                                                                                                                                                                                                                                                                        |
| `warn.deviceAlarm`     | boolescher Wert | Wechselrichteralarm – ein Wechselrichter weist einen aktiven Fehler auf (z. B. „PVx kein Eingang“, wenn ein DC-String getrennt ist). Derselbe Zustand tritt lokal und schneller auf unter `alarms.lastCode` / `alarms.lastMessage`                                                                                                                 |
| `warn.deviceIdWarning` | boolescher Wert | Geräte-ID-Warnung (ID-Abweichung / Diebstahlschutz)                                                                                                                                                                                                                                                                                               |
| `warn.meterFault`      | boolescher Wert | Zählerstörung / Zählerwarnung                                                                                                                                                                                                                                                                                                                     |
| `warn.powerLimited`    | boolescher Wert | Leistungsbegrenzung (Leistungsreduzierung/Leistungsbegrenzung aktiv). **Nur für Installateure** – nicht für Privatkunden.                                                                                                                                                                                                                         |

### `<dtuSerial>.history.*` — Tagesleistungskurve (pro DTU, lokal)

Der Wechselrichter speichert seine eigene Leistungskurve für den Tag im Flash-Speicher. Der Adapter ruft sie im Slow-Polling-Verfahren ab (`0xa315`) — **ohne die Cloud** , sowohl über TCP als auch über BLE.

Das Gerät unterteilt den Tag in Seiten mit maximal 200 Messwerten und meldet deren Anzahl. Der Adapter erfasst alle Seiten und veröffentlicht die Kurve erst, wenn der gesamte Tag erfasst ist – Seite 0 allein endet am Vormittag.

Gemessen mit einem HMS-800W-2T: 903 Messwerte mit einer Messung pro Minute über 15 Stunden, mit einem Spitzenwert von 602 W um 14:06 Uhr. Das HMS-800-2WB liefert die gleiche Kurve in 300-Sekunden-Schritten ab Mitternacht.

> **Zum Gerät:** Die Firmware gibt dies nicht an – das Feld wird ohne Konvertierung aus dem Flash-Speicher kopiert. Der Faktor von 0,1 W wird daher **gemessen und nicht aus dem Code ausgelesen** : Die Integration der Kurve über den Tag ergibt **4495 Wh** gegenüber den vom Gerät selbst angezeigten **4500 Wh** , eine Differenz von 0,12 %. Ein Faktor von 1 oder 0,01 würde eine Abweichung um eine Zehnerpotenz bedeuten.

| Zustand               | Typ          | Einheit | Beschreibbar | Beschreibung                                             |
| --------------------- | ------------ | ------- | ------------ | -------------------------------------------------------- |
| `history.powerJson`   | Zeichenkette | W       | NEIN         | Tagesleistungskurve als JSON-Array, ein Wert pro Schritt |
| `history.startTime`   | Nummer       | MS      | NEIN         | Zeitstempel der **ersten** Abtastung der Kurve           |
| `history.stepTime`    | Nummer       | S       | NEIN         | Sekunden zwischen zwei Messungen (2T: 60, 2WB: 300)      |
| `history.dailyEnergy` | Nummer       | Wh      | NEIN         | Vom Gerät gemeldeter täglicher Energieverbrauch          |
| `history.totalEnergy` | Nummer       | kWh     | NEIN         | Gesamtenergie, wie vom Gerät angezeigt                   |

Zeitstempel einer Stichprobe: `history.startTime + index * history.stepTime * 1000` Die

### `<dtuSerial>.alarms.*` — Alarmdaten (pro DTU, lokal)

| Zustand                | Typ             | Beschreibung                                                                    |
| ---------------------- | --------------- | ------------------------------------------------------------------------------- |
| `alarms.count`         | Nummer          | Gesamtzahl der Alarme                                                           |
| `alarms.activeCount`   | Nummer          | Anzahl aktiver (unbehobener) Alarme                                             |
| `alarms.hasActive`     | boolescher Wert | Verfügt über aktive Alarme                                                      |
| `alarms.json`          | Zeichenkette    | Vollständige Alarmliste als JSON                                                |
| `alarms.lastCode`      | Nummer          | Letzter Alarmcode                                                               |
| `alarms.lastStartTime` | Nummer          | Letzte Alarmstartzeit                                                           |
| `alarms.lastEndTime`   | Nummer          | Letzter Alarm Endzeit                                                           |
| `alarms.lastMessage`   | Zeichenkette    | Letzte Alarmmeldung (in der Systemsprache von ioBroker, ansonsten auf Englisch) |
| `alarms.lastData1`     | Nummer          | Letzte Alarmdaten 1 (Rohsensorwert)                                             |
| `alarms.lastData2`     | Nummer          | Letzter Alarmdatensatz 2 (Rohsensorwert)                                        |

### `<dtuSerial>.config.*` — DTU-Konfiguration (pro DTU, lokal)

> ⚠️ **WARNUNG — Jeder Schreibvorgang zur Leistungsbegrenzung lädt Flash-Programme im Gerät.**
>
> Es betrifft ** `inverter.powerLimit`, `inverter.powerFactorLimit` Und `inverter.reactivePowerLimit` ** — Alle drei durchlaufen denselben Erfolgspfad (Aktionen 8, 47 und 48). Dies hat **keine** Auswirkungen `config.limitPowerMyPower` Dieses Konfigurationsfeld greift nur auf den Arbeitsspeicher zu. In früheren Versionen dieser Dokumentation waren die beiden vertauscht. `inverter.powerLimit` wurde als ein nur im Arbeitsspeicher verwendeter Laufzeitbefehl beschrieben und `config.limitPowerMyPower` als Flash-Schreiber. Beide waren falsch. Am Ende eines erfolgreichen Befehls ruft die Firmware den Konfigurationsserialisierer auf, der **zwei 4 KB Flash-Sektoren löscht und neu beschreibt** (HMS-800W-2T: `0x4080d642` → Löschen + Schreiben für Region 3 und Region 0xe; HMS-800-2WB: `sys_cfg_write` Läufe `nv_erase` +`nv_write` zweimal). Die Lebensdauer des Flash-Speichers ist begrenzt – Zehntausende von Zyklen –, daher führt eine Schleife von Null-Exporten pro Sekunde zu Verschleiß und kann **das Gerät dauerhaft unbrauchbar machen** .
>
> **Der Adapter verhindert dies:** Die Einstellungen (Registerkarte _„Lokal“_ ) bieten eine **Totzone** (Standard: 1 %) und ein **Mindestintervall** (Standard: 60 s). Änderungen unterhalb der Totzone oder solche, die zu kurz nach dem letzten Schreibvorgang erfolgen, werden nicht gesendet; der Status wird dennoch bestätigt und der Grund im Protokoll vermerkt. Beide Werte können angepasst oder auf 0 gesetzt werden – wer die Regelung bewusst schneller gestalten möchte, kann dies tun und den damit verbundenen Verschleiß in Kauf nehmen.
>
> Für Null-Exporte `inverter.powerLimit` Der Zustand bleibt korrekt: Er tritt sofort in Kraft. Es handelt sich jedoch **nicht** um einen blitzfreien Pfad – genau deshalb gibt es die Totzone und das Mindestintervall. `config.limitPowerMyPower` Kostet keinen Flash-Speicher, übersteht aber einen Neustart des HMS-800W-2T nicht und sendet keinen Befehl an den Wechselrichter.

> ⚠️ **Schreibkonfiguration — der Adapter liest immer zuerst.**
>
> Die DTU übernimmt **jedes** Feld einer Konfigurationsnachricht, einschließlich derjenigen, die das Protokoll gar nicht überträgt, da sie ihren Standardwert enthalten. Durch das Senden nur des zu ändernden Feldes werden daher alle anderen gelöscht. Firmware-geprüft für HMS-800W-2T: `server_domain_name`, `serverport`, `limit_power_mypower`, `server_send_time`, `lock_password` Und `lock_time` werden ungeschützt überschrieben. Genau das hat bei einem Live-Test auf dem 2WB die Serveradresse, den Port und die Leistungsbegrenzung zerstört.
>
> Der Adapter **schreibt daher niemals einen Teildatensatz** : Er übernimmt die zuletzt vom Gerät gelesene Konfiguration, ändert nur das angeforderte Feld und sendet alles zurück. Wurde in der aktuellen Sitzung keine Konfiguration gelesen, wird der Schreibvorgang **abgelehnt** und der Grund protokolliert – lieber gar nicht schreiben als unvollständig.
>
> Die WLAN-Zugangsdaten bleiben unverändert: Das Gerät übernimmt sie nur, wenn ein zusätzliches Feld gesetzt wird, das der Adapter absichtlich leer lässt.

| Zustand                    | Typ          | Einheit | Beschreibbar | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| -------------------------- | ------------ | ------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config.serverDomain`      | Zeichenkette | —       | NEIN         | Cloud-Server-Domäne                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `config.serverPort`        | Nummer       | —       | NEIN         | Cloud-Server-Port                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `config.serverSendTime`    | Nummer       | min     | **Ja**       | Cloud-Sendeintervall (Minuten). ⚠️ **Weder persistent noch Flash-Schreibvorgang** (firmware-verifiziert): SetConfig-Feld 10 landet nur im RAM (`gp-110188` Der Pfad „SetConfig“ schreibt ausschließlich in den Zweig „WiFi/AP password“ im Flash-Speicher. Frühere Versionen dieser Dokumentation nannten ihn fälschlicherweise „persistent (DTU flash)“. Nach einem Neustart des Geräts muss er erneut konfiguriert werden.                                                          |
| `config.limitPowerMyPower` | Nummer       | %       | **Ja**       | Leistungsbegrenzung über das **Konfigurationsfeld** der DTU (2–100 %, lokal). ⚠️ **Beim HMS-800W-2T bleibt dieser Wert nach einem Neustart nicht erhalten** (Firmware-geprüft) – frühere Versionen dieser Dokumentation behaupteten das Gegenteil. Stellen Sie ihn nach einem Neustart des Geräts erneut ein. **Entgegen früheren Behauptungen werden auch keine Flash-Daten geschrieben** – das Ziel ist `gp-108260` (`0x6c204`) liegt außerhalb der persistenten Struktur `0x6b8dc` |
| `config.wifiSsid`          | Zeichenkette | —       | NEIN         | WLAN-SSID                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `config.wifiSignalQuality` | Nummer       | %       | NEIN         | Die WLAN **-Signalqualität wird mit 0–100 angegeben** , **nicht mit dBm,** trotz des Feldnamens. Die Firmware leitet sie aus dem rohen RSSI-Wert ab: \`clamp(2\*(95 -                                                                                                                                                                                                                                                                                                                 |
| `config.invType`           | Nummer       | —       | NEIN         | Wechselrichtertyp                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `config.netmodeSelect`     | Nummer       | —       | NEIN         | Netzwerkmodus (0=GPRS, 1=WLAN, 2=Ethernet)                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `config.netDhcpSwitch`     | Nummer       | —       | NEIN         | DHCP aktiviert                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `config.wifiIpAddress`     | Zeichenkette | —       | NEIN         | WLAN-IP-Adresse                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `config.wifiMacAddress`    | Zeichenkette | —       | NEIN         | WLAN-MAC-Adresse                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `config.dtuApSsid`         | Zeichenkette | —       | NEIN         | DTU-Zugangspunkt-SSID                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `config.ipAddress`         | Zeichenkette | —       | NEIN         | IP-Adresse (Ethernet/primäre Schnittstelle)                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `config.subnetMask`        | Zeichenkette | —       | NEIN         | Subnetzmaske                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `config.gateway`           | Zeichenkette | —       | NEIN         | Standardgateway                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `config.dnsServer`         | Zeichenkette | —       | NEIN         | DNS-Server                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `config.macAddress`        | Zeichenkette | —       | NEIN         | MAC-Adresse                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `config.meterKind`         | Zeichenkette | —       | NEIN         | Konfigurierter Zählertyp. Bei Geräten ohne Zählereingang leer – der HMS-800W-2T hat keinen (firmware-geprüft), daher ist hier ein leerer Wert korrekt.                                                                                                                                                                                                                                                                                                                                |
| `config.meterInterface`    | Zeichenkette | —       | NEIN         | Schnittstelle, an der das Messgerät angeschlossen ist                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `config.zeroExportEnable`  | Nummer       | —       | NEIN         | Null-Export-Flag, wie von der DTU gemeldet                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `config.zeroExport433Addr` | Nummer       | —       | NEIN         | 433-MHz-Adresse ohne Export                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `config.lockTime`          | Nummer       | S       | NEIN         | Verriegelungsdauer des Wechselrichters (0 = keine Verriegelung)                                                                                                                                                                                                                                                                                                                                                                                                                       |

### `<dtuSerial>.gridProfile.*` — Grid-Profil (pro DTU, lokal – wird für reine Cloud-Geräte über die Cloud gelesen)

Das Netzanschlussprofil des Wechselrichters (Sicherheits-/Netzanschlussparameter) wird lokal über DevConfigFetch ausgelesen. Alle Daten sind schreibgeschützt. Spannungs-/Frequenzwerte entsprechen dem aktiven Netzstandard (z. B. `DE_VDE4105_2018` Funktionsflags sind boolesche Werte (`true` = Funktion aktiv).

| Zustand                                  | Typ             | Einheit | Beschreibbar | Beschreibung                                       |
| ---------------------------------------- | --------------- | ------- | ------------ | -------------------------------------------------- |
| `gridProfile.standard`                   | Zeichenkette    | —       | NEIN         | Name des Rasterstandards (z. B. DE\_VDE4105\_2018) |
| `gridProfile.countryStdCode`             | Nummer          | —       | NEIN         | Länderstandardcode                                 |
| `gridProfile.version`                    | Nummer          | —       | NEIN         | Grid-Profilversion                                 |
| `gridProfile.nominalVoltage`             | Nummer          | V       | NEIN         | Nennspannung                                       |
| `gridProfile.lowVoltage1`                | Nummer          | V       | NEIN         | Niederspannung 1 (LV1)                             |
| `gridProfile.lowVoltage1TripTime`        | Nummer          | S       | NEIN         | LV1 maximale Fahrzeit                              |
| `gridProfile.highVoltage1`               | Nummer          | V       | NEIN         | Hochspannung 1 (HV1)                               |
| `gridProfile.highVoltage1TripTime`       | Nummer          | S       | NEIN         | HV1 maximale Fahrzeit                              |
| `gridProfile.lowVoltage2`                | Nummer          | V       | NEIN         | Niederspannung 2 (LV2)                             |
| `gridProfile.lowVoltage2TripTime`        | Nummer          | S       | NEIN         | LV2 maximale Fahrzeit                              |
| `gridProfile.avgHighVoltage10min`        | Nummer          | V       | NEIN         | 10-minütiger durchschnittlicher Hochspannungswert  |
| `gridProfile.nominalFrequency`           | Nummer          | Hz      | NEIN         | Nennfrequenz                                       |
| `gridProfile.lowFrequency1`              | Nummer          | Hz      | NEIN         | Niederfrequenz 1 (LF1)                             |
| `gridProfile.lowFrequency1TripTime`      | Nummer          | S       | NEIN         | LF1 maximale Fahrzeit                              |
| `gridProfile.highFrequency1`             | Nummer          | Hz      | NEIN         | Hochfrequenz 1 (HF1)                               |
| `gridProfile.highFrequency1TripTime`     | Nummer          | S       | NEIN         | HF1 maximale Fahrzeit                              |
| `gridProfile.islandingDetection`         | boolescher Wert | —       | NEIN         | Inselerkennung aktiv                               |
| `gridProfile.reconnectTime`              | Nummer          | S       | NEIN         | Zeit zum Wiederverbinden                           |
| `gridProfile.reconnectHighVoltage`       | Nummer          | V       | NEIN         | Hochspannung wiederherstellen                      |
| `gridProfile.reconnectLowVoltage`        | Nummer          | V       | NEIN         | Niederspannung wiederherstellen                    |
| `gridProfile.reconnectHighFrequency`     | Nummer          | Hz      | NEIN         | Hochfrequenzverbindung wiederherstellen            |
| `gridProfile.reconnectLowFrequency`      | Nummer          | Hz      | NEIN         | Niederfrequenzverbindung wiederherstellen          |
| `gridProfile.rampUpRateNormal`           | Nummer          | %/S     | NEIN         | Normale Anstiegsrate                               |
| `gridProfile.rampUpRateSoftStart`        | Nummer          | %/S     | NEIN         | Sanfte Anlauframpenrate                            |
| `gridProfile.freqWattActive`             | boolescher Wert | —       | NEIN         | Frequenz-Watt aktiv                                |
| `gridProfile.freqWattStart`              | Nummer          | Hz      | NEIN         | Frequenz-Watt-Start (Fstart)                       |
| `gridProfile.freqWattDroopSlope`         | Nummer          | %Pn/Hz  | NEIN         | Frequenz-Watt-Abfall                               |
| `gridProfile.recoveryRampRate`           | Nummer          | %Pn/s   | NEIN         | Erholungsrampenrate                                |
| `gridProfile.recoveryHighFrequency`      | Nummer          | Hz      | NEIN         | Erholung hohe Frequenz                             |
| `gridProfile.recoveryLowFrequency`       | Nummer          | Hz      | NEIN         | Erholung niedrige Frequenz                         |
| `gridProfile.activePowerControlActive`   | boolescher Wert | —       | NEIN         | Aktive Leistungsregelung aktiv                     |
| `gridProfile.powerRampRate`              | Nummer          | %Pn/s   | NEIN         | Leistungsrampenrate                                |
| `gridProfile.voltVarActive`              | boolescher Wert | —       | NEIN         | Volt-Var aktiv                                     |
| `gridProfile.voltVarV1`                  | Nummer          | V       | NEIN         | Volt-Var-Sollwert V1                               |
| `gridProfile.voltVarQ1`                  | Nummer          | %Pn     | NEIN         | Volt-Var-Sollwert Q1                               |
| `gridProfile.voltVarV2`                  | Nummer          | V       | NEIN         | Volt-Var-Sollwert V2                               |
| `gridProfile.voltVarV3`                  | Nummer          | V       | NEIN         | Volt-Var-Sollwert V3                               |
| `gridProfile.voltVarV4`                  | Nummer          | V       | NEIN         | Volt-Var-Sollwert V4                               |
| `gridProfile.voltVarQ4`                  | Nummer          | %Pn     | NEIN         | Volt-Var-Sollwert Q4                               |
| `gridProfile.specifiedPowerFactorActive` | boolescher Wert | —       | NEIN         | Vorgegebener Leistungsfaktor aktiv                 |
| `gridProfile.powerFactor`                | Nummer          | —       | NEIN         | Leistungsfaktor (cos φ)                            |
| `gridProfile.wattPowerFactorActive`      | boolescher Wert | —       | NEIN         | Watt-Leistungsfaktor aktiv                         |
| `gridProfile.wattPowerFactorStart`       | Nummer          | %Pn     | NEIN         | Watt-PF-Anlaufleistung                             |
| `gridProfile.powerFactorAtRatedPower`    | Nummer          | —       | NEIN         | Leistungsfaktor bei Nennleistung                   |
| `gridProfile.reactivePowerControlActive` | boolescher Wert | —       | NEIN         | aktive Blindleistungsregelung                      |
| `gridProfile.reactivePower`              | Nummer          | %Sn     | NEIN         | Blindleistung (VAR)                                |

### `<dtuSerial>.meter.*` — Kabelgebundener Energiezähler (pro DTU, lokal, dynamisch)

Zählerstände werden automatisch erstellt, sobald Zählerdaten vom DTU empfangen werden. Nur verfügbar, wenn ein kompatibler, kabelgebundener Energiezähler (DTU-Pro-Typ, Modbus) angeschlossen ist.

| Zustand                    | Typ    | Einheit | Beschreibung                      |
| -------------------------- | ------ | ------- | --------------------------------- |
| `meter.totalPower`         | Nummer | W       | Gesamtleistung (alle Phasen)      |
| `meter.phaseAPower`        | Nummer | W       | Phase-A-Stromversorgung           |
| `meter.phaseBPower`        | Nummer | W       | Phase B Stromversorgung           |
| `meter.phaseCPower`        | Nummer | W       | Phase C-Strom                     |
| `meter.powerFactorTotal`   | Nummer | —       | Gesamtleistungsfaktor             |
| `meter.energyTotalExport`  | Nummer | kWh     | Gesamtenergieexport (Einspeisung) |
| `meter.energyTotalImport`  | Nummer | kWh     | Gesamtenergieimport (Verbrauch)   |
| `meter.voltagePhaseA`      | Nummer | V       | Spannung Phase A                  |
| `meter.voltagePhaseB`      | Nummer | V       | Spannung Phase B                  |
| `meter.voltagePhaseC`      | Nummer | V       | Spannung Phase C                  |
| `meter.currentPhaseA`      | Nummer | A       | Aktuelle Phase A                  |
| `meter.currentPhaseB`      | Nummer | A       | Aktuelle Phase B                  |
| `meter.currentPhaseC`      | Nummer | A       | Aktuelle Phase C                  |
| `meter.energyPhaseAExport` | Nummer | kWh     | Energieexport der Phase A         |
| `meter.energyPhaseBExport` | Nummer | kWh     | Energieexport der Phase B         |
| `meter.energyPhaseCExport` | Nummer | kWh     | Energieexport der Phase C         |
| `meter.energyPhaseAImport` | Nummer | kWh     | Energieimporte der Phase A        |
| `meter.energyPhaseBImport` | Nummer | kWh     | Energieimporte der Phase B        |
| `meter.energyPhaseCImport` | Nummer | kWh     | Energieimport der Phase C         |
| `meter.powerFactorPhaseA`  | Nummer | —       | Leistungsfaktor Phase A           |
| `meter.powerFactorPhaseB`  | Nummer | —       | Leistungsfaktor Phase B           |
| `meter.powerFactorPhaseC`  | Nummer | —       | Leistungsfaktor Phase C           |
| `meter.faultCode`          | Nummer | —       | Zählerfehlercode                  |

### `<dtuSerial>.meter.*` — Netzwerk-Energiezähler (Shelly / ecotracker, BLE-Serie, lokal, dynamisch)

Diese Zustände werden bei Bedarf für einen Wechselrichter der WB-Serie erstellt, sobald ein Zähler über den _Konfigurationsmanager_ gekoppelt wurde – siehe [„Anschließen eines Energiezählers“](#connecting-an-energy-meter-shelly--ecotracker) . Die T-Serie verfügt weder über einen Zählereingang noch über eine entsprechende Regelung, daher werden diese Zustände dort nicht angezeigt.

| Zustand              | Typ             | Einheit | Beschreibbar | Beschreibung                                                                                                 |
| -------------------- | --------------- | ------- | ------------ | ------------------------------------------------------------------------------------------------------------ |
| `meter.mode`         | Nummer          | —       | **Ja**       | Betriebsart: `0` = ungebunden (Startwert, kein Befehl), `1` = nur Zähler, `2` = Netzzähler für Null-Einspeisung |
| `meter.deviceId`     | Zeichenkette    | —       | **Ja**       | MAC-Adresse des Zählers zum Binden, blankes Hexadezimal oder mit Trennzeichen                                |
| `meter.detected`     | Zeichenkette    | —       | NEIN         | Zähler für den im Netzwerk gefundenen Wechselrichter (JSON-Liste)                                            |
| `meter.connected`    | boolescher Wert | —       | NEIN         | Ob der Zähler aktuell Daten liefert                                                                          |
| `meter.lastData`     | Nummer          | —       | NEIN         | Zeitstempel der letzten Zählerablesung                                                                       |
| `meter.gridPower`    | Nummer          | W       | NEIN         | Netzaustausch: positiv = Import, negativ = Export                                                            |
| `meter.pvPower`      | Nummer          | W       | NEIN         | PV-Anteil, berechnet vom Wechselrichter                                                                      |
| `meter.loadPower`    | Nummer          | W       | NEIN         | Die Hauslast wird vom Wechselrichter berechnet.                                                              |
| `meter.storagePower` | Nummer          | W       | NEIN         | Batterieanteil, berechnet vom Wechselrichter                                                                 |
| `meter.plugPower`    | Nummer          | W       | NEIN         | Plug/Aux-Anteil wird vom Wechselrichter berechnet                                                            |
| `meter.frequency`    | Nummer          | Hz      | NEIN         | Netzfrequenz am Zähler                                                                                       |
| `meter.l1Voltage`    | Nummer          | V       | NEIN         | Spannung L1                                                                                                  |
| `meter.l1Current`    | Nummer          | A       | NEIN         | Aktueller L1                                                                                                 |
| `meter.l1Power`      | Nummer          | W       | NEIN         | Leistung L1 (Vorzeichen: negativ = exportierend)                                                             |
| `meter.l2Voltage`    | Nummer          | V       | NEIN         | Spannung L2                                                                                                  |
| `meter.l2Current`    | Nummer          | A       | NEIN         | Aktueller L2-Kanal                                                                                           |
| `meter.l2Power`      | Nummer          | W       | NEIN         | Power L2 (signiert)                                                                                          |
| `meter.l3Voltage`    | Nummer          | V       | NEIN         | Spannung L3                                                                                                  |
| `meter.l3Current`    | Nummer          | A       | NEIN         | Aktueller L3                                                                                                 |
| `meter.l3Power`      | Nummer          | W       | NEIN         | Power L3 (signiert)                                                                                          |

### `<dtuSerial>.*` — Hybrid-Wechselrichter mit Batterie (HAT-Serie, Cloud, Dynamic)

Diese Werte werden nur erstellt, wenn die Cloud einen Hybridwechselrichter unterhalb der DTU meldet; alle diese Werte sind schreibgeschützt und stammen aus der Cloud. Die Gesamtwerte des Wechselrichters basieren auf den Zuständen aller Geräte: `grid.power` (kombinierte Wirkleistung), `grid.frequency`, `inverter.temperature` (interne Umgebungstemperatur), `inverter.model` /`serialNumber` /`swVersion`, Und `pv0.*` /`pv1.*` (`power`, `voltage`, `current`, Und `dailyEnergy` wenn die Cloud es liefert) für die PV-Eingänge - nur wenn PV tatsächlich an den Hybridwechselrichter angeschlossen ist; bei einer AC-gekoppelten Anlage, bei der das PV von einem separaten Wechselrichter hinter einem PV-Zähler kommt (`station-<id>.pvMeter.*`), kennzeichnet die Cloud die Eingänge des Wechselrichters als ungenutzt und nicht `pvN` Staaten werden geschaffen. `battery.*` Die Batterie existiert, sobald sie unterhalb des Wechselrichters hängt – sie ist der zentrale Ort für alle Informationen über die Batterie; die Station transportiert lediglich den Leistungsfluss und die Energiebilanz des Kraftwerks (`grid.batteryPower`, `grid.batteryCharge*`, `grid.batteryDischarge*` (für heute, Monat, Jahr und Gesamtlebenszeit). Mit ⁺ gekennzeichnete Zeilen gehören zum Vokabular der Cloud für diese Geräte, wurden aber nicht vom Referenzsystem bereitgestellt – sie werden nur angezeigt, wenn Ihr Gerät sie meldet.

| Zustand                                                                                 | Typ                            | Einheit       | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------------------------------------------------------------------------------- | ------------------------------ | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `grid.l1Voltage` /`l2…` /`l3…`                                                          | Nummer                         | V             | Wechselrichter-Wechselspannung pro Phase                                                                                                                                                                                                                                                                                                                                                                                                             |
| `grid.l1Current` /`l2…` /`l3…`                                                          | Nummer                         | A             | Wechselrichter-Wechselstrom pro Phase                                                                                                                                                                                                                                                                                                                                                                                                                |
| `grid.l1Power` /`l2…` /`l3…`                                                            | Nummer                         | W             | Wirkleistung des Wechselrichters pro Phase                                                                                                                                                                                                                                                                                                                                                                                                           |
| `grid.l1ReactivePower` /`l2…` /`l3…`                                                    | Nummer                         | var           | Blindleistung des Wechselrichters pro Phase                                                                                                                                                                                                                                                                                                                                                                                                          |
| `inverter.operatingState`                                                               | Nummer                         | —             | Betriebszustand als Zahl (3 = Netzbetrieb beobachtet; die vollständige Werteliste ist noch nicht bekannt)                                                                                                                                                                                                                                                                                                                                            |
| `inverter.operatingStateText`                                                           | Zeichenkette                   | —             | Betriebszustand, wie die Wolkenwörter es ausdrücken                                                                                                                                                                                                                                                                                                                                                                                                  |
| `inverter.busVoltage`                                                                   | Nummer                         | V             | Gleichspannung                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `inverter.drmMode`                                                                      | Nummer                         | —             | DRM-Modus (Demand-Response-Modus)                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `inverter.pvPower`                                                                      | Nummer                         | W             | PV-Leistung aller Eingänge zusammen                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `inverter.pvEnergyToday` ⁺                                                              | Nummer                         | kWh           | PV-Energie aller Inputs heute                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `inverter.pvHeatsinkTemperature` /`heatsinkTemperature` /`batteryHeatsinkTemperature` ⁺ | Nummer                         | °C            | Kühlkörpertemperaturen der PV-, Wechselrichter- und Batteriestufe                                                                                                                                                                                                                                                                                                                                                                                    |
| `inverter.powerFaultCode` /`safetyFaultCode` ⁺                                          | Zeichenkette                   | —             | Fehlercodes der Stromversorgung und der Sicherheitssteuerung                                                                                                                                                                                                                                                                                                                                                                                         |
| `eps.l1Voltage` /`l2…` /`l3…`                                                           | Nummer                         | V             | Backup-Ausgangsspannung (EPS) pro Phase                                                                                                                                                                                                                                                                                                                                                                                                              |
| `eps.l1Current` /`l2…` /`l3…`                                                           | Nummer                         | A             | Notstrom (EPS) pro Phase                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `eps.l1Power` /`l2…` /`l3…`                                                             | Nummer                         | W             | Ausgangsleistung der Notstromversorgung (EPS) pro Phase                                                                                                                                                                                                                                                                                                                                                                                              |
| `battery.serialNumber` /`model` /`swVersion` /`hwVersion`                               | Zeichenkette                   | —             | Batterieidentifikation aus der Geräteliste der Cloud                                                                                                                                                                                                                                                                                                                                                                                                 |
| `battery.capacity`                                                                      | Nummer                         | kWh           | Installierte Batteriekapazität                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `battery.connected`                                                                     | boolescher Wert                | —             | Die Batterie wird online von der Cloud gemeldet.                                                                                                                                                                                                                                                                                                                                                                                                     |
| `battery.type`                                                                          | Zeichenkette                   | —             | Batteriechemie, wie es in der Cloud-Sprache heißt (z. B. `Li-Ion`)                                                                                                                                                                                                                                                                                                                                                                                   |
| `battery.soc`                                                                           | Nummer                         | %             | Ladezustand – etwa alle 10 Sekunden über den schnellen Echtzeitkanal, ansonsten mit den regulären Werten der Batterie.                                                                                                                                                                                                                                                                                                                               |
| `battery.soh`                                                                           | Nummer                         | %             | Gesundheitszustand                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `battery.state`                                                                         | Nummer                         | —             | Batteriezustand als Zahl (2 = Entladung wurde beobachtet)                                                                                                                                                                                                                                                                                                                                                                                            |
| `battery.stateText`                                                                     | Zeichenkette                   | —             | Der Batteriestatus wird in der Cloud angezeigt.                                                                                                                                                                                                                                                                                                                                                                                                      |
| `battery.faultCode`                                                                     | Zeichenkette                   | —             | Batteriefehlercode (`0` = keine)                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `battery.voltage` /`current` /`power`                                                   | Nummer                         | V / A / W     | Batteriemessungen vom Batteriemanagementsystem                                                                                                                                                                                                                                                                                                                                                                                                       |
| `battery.cycles` ⁺                                                                      | Nummer                         | —             | Ladezyklen                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `battery.heating` /`heatingText` ⁺                                                      | Zahl / Zeichenkette            | —             | Batterieheizstatus, sowohl als Zahl als auch als Wort in der Cloud.                                                                                                                                                                                                                                                                                                                                                                                  |
| `battery.workMode`                                                                      | Nummer                         | —             | Betriebsmodi: 1 = Eigenverbrauch, 2 = Sparmodus, 3 = Notstromversorgung, 4 = Inselbetrieb, 5 = Zwangsladung, 6 = Zwangsentladung, 7 = Lastspitzenkappung, 8 = Zeitgesteuerter Betrieb. Die Daten werden mit der regulären Stationsabfrage übermittelt – es werden keine weiteren Daten an das Gerät gesendet.                                                                                                                                        |
| `battery.readSettings`                                                                  | boolescher Wert (Schaltfläche) | —             | Liest die Akkueinstellungen des Geräts. **Es werden lediglich die Daten gelesen** – die Anfrage wird jedoch an das Gerät gesendet und benötigt einige Sekunden. Daher wird der Vorgang einmal pro Netzteilstart und auch dann nur beim Drücken dieser Taste ausgeführt.                                                                                                                                                                              |
| `battery.reserveSoc`                                                                    | Nummer                         | %             | Reservierter Ladezustand des aktiven Arbeitsmodus (aus den gelesenen Einstellungen)                                                                                                                                                                                                                                                                                                                                                                  |
| `battery.settingsJson`                                                                  | Zeichenkette (JSON)            | —             | Die vollständigen Einstellungen, wie sie vom Gerät gemeldet werden: aktiver Modus plus die Parameter jedes Modus (`k_1` …`k_8`: Reserve-SoC, Leistungsgrenzen, Zeitfenster, Tarife). Unverändert weitergegeben – die Parameter sind dimensionslos und unterscheiden sich je nach Modus.                                                                                                                                                             |
| `battery.settingsUpdated`                                                               | Nummer                         | —             | Wann wurden die Einstellungen zuletzt gelesen?                                                                                                                                                                                                                                                                                                                                                                                                       |
| `dryContact.readSettings`                                                               | boolescher Wert (Schaltfläche) | —             | Liest die potentialfreien Relais-Einstellungen vom Gerät – Start-/Stopp-Schwellenwerte des Generators, Laststeuerungsfenster, SoC-Grenzwerte. **Liest nur diese Werte** ; wie die Batterieeinstellungen werden sie an das Gerät weitergeleitet, sodass sie einmal pro Adapterstart und anschließend bei Betätigung dieses Knopfes ausgeführt werden. Anlagen, deren Relaishardware auf keine der bekannten Aktionscodes reagiert, bleiben unberührt. |
| `dryContact.mode`                                                                       | Nummer                         | —             | Relaismodus (0 = aus)                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `dryContact.settingsJson`                                                               | Zeichenkette (JSON)            | —             | Die vollständigen Relais-Einstellungen, wie sie vom Gerät gemeldet werden, unverändert.                                                                                                                                                                                                                                                                                                                                                              |
| `dryContact.settingsUpdated`                                                            | Nummer                         | —             | Wann wurden die Relais-Einstellungen zuletzt ausgelesen?                                                                                                                                                                                                                                                                                                                                                                                             |
| `alarms.cloudActiveCount` /`alarms.cloudActiveJson`                                     | Zahl / Zeichenkette (JSON)     | —             | Aktive Alarme des Wechselrichters und seiner DTU, wie sie in der Cloud aufgelistet sind (`code`, `time`, `source` (Rohdatenwörter), aktualisiert in der langsamen Umfrage                                                                                                                                                                                                                                                                            |
| `history.powerJson` /`batteryPowerJson` /`socJson` /`pvPowerJson`                       | Zeichenkette (JSON)            | W / W / % / W | Heutige Kurven für Wechselstrom, Batterieleistung, Ladezustand und – bei eingeschaltetem Wechselrichter – PV-Leistung, ein Wert alle 5 Minuten; `history.startTime` (ms) und `history.stepTime` (s) Was die lokale Kurve betrifft. Aktualisiert durch die langsame Umfrage.                                                                                                                                                                            |
| `battery.maxChargeCurrent` /`maxDischargeCurrent`                                       | Nummer                         | A             | Die aktuellen Grenzen, die die Batterie zulässt                                                                                                                                                                                                                                                                                                                                                                                                      |
| `battery.chargeCutoffVoltage` /`dischargeCutoffVoltage`                                 | Nummer                         | V             | Spannungsgrenzen der Batterie                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `battery.cellTempMax` /`cellTempMin`                                                    | Nummer                         | °C            | Heißeste / kälteste Zelle                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `battery.moduleTempMax` /`moduleTempMin`                                                | Nummer                         | °C            | heißestes / kältestes Modul                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `battery.cellVoltageMax` /`cellVoltageMin`                                              | Nummer                         | V             | Höchste / niedrigste Zellspannung                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `battery.moduleVoltageMax` /`moduleVoltageMin`                                          | Nummer                         | V             | Höchste / niedrigste Modulspannung                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `battery.inverterVoltage` /`inverterCurrent` /`inverterPower`                           | Nummer                         | V / A / W     | Die gleiche Batterie, mit der auch der Wechselrichter arbeitet, misst die Temperatur an ihren eigenen Anschlüssen.                                                                                                                                                                                                                                                                                                                                   |

### `station-<id>.*` — Messpunkte: Netzzähler, Verbraucherzähler, PV-Zähler, Generator (Cloud, dynamisch)

Die Daten werden für jede Anlage, die über entsprechende Daten verfügt, aus der Cloud ausgelesen. Der Adapter fragt nur die Daten ab, die in der Cloud als vorhanden gekennzeichnet sind. Anlagen ohne diese Daten verursachen daher keine zusätzlichen Abfragen und erhalten keine zusätzlichen Statusinformationen. Der Zugriff ist schreibgeschützt und erfordert ein Installateur-Konto. Die Werte werden nach dem Upload des Geräts in die Cloud (ca. alle 5 Minuten) aktualisiert. Die Daten werden unverändert übernommen. Zeilen mit der Kennzeichnung ⁺ wurden vom Referenzsystem nicht erfasst und werden nur angezeigt, wenn Ihre Anlage sie meldet.

| Zustand                                                                                               | Typ                 | Einheit             | Beschreibung                                                                           |
| ----------------------------------------------------------------------------------------------------- | ------------------- | ------------------- | -------------------------------------------------------------------------------------- |
| `gridMeter.connected`                                                                                 | boolescher Wert     | —                   | Netzzähler meldete online                                                              |
| `gridMeter.power` /`reactivePower` /`powerFactor` /`frequency`                                        | Nummer              | W / var / — / Hz    | Gesamtwerte am Netzanschluss                                                           |
| `gridMeter.l1Voltage` /`l1Current` /`l1Power` /`l1ReactivePower` /`l1PowerFactor` (Auch `l2…`, `l3…`) | Nummer              | V / A / W / var / — | Phasenweise Ablesungen des Netzzählers                                                 |
| `gridMeter.importToday` /`exportToday` ⁺ (auch pro Phase: `l1ImportToday`, `l1ExportToday`, …)        | Nummer              | kWh                 | Heute wird Energie aus dem Netz entnommen/in das Netz eingespeist.                     |
| `load.l1Voltage` /`l1Power` (Auch `l2…`, `l3…`)                                                       | Nummer              | V / W               | Spannung und Wirkleistung auf der Lastseite                                            |
| `load.energyToday` ⁺ (auch pro Phase: `l1EnergyToday`, …)                                             | Nummer              | kWh                 | Heute verbrauchte Energie                                                              |
| `load.mode` /`modeText` ⁺                                                                             | Zahl / Zeichenkette | —                   | Lademodus, sowohl als Zahl als auch als Wort in der Cloud.                             |
| `pvMeter.connected`                                                                                   | boolescher Wert     | —                   | PV-Zähler online gemeldet (ein Zähler an einem PV-Wechselrichter eines Drittanbieters) |
| `pvMeter.power` /`reactivePower` /`frequency`                                                         | Nummer              | W / var / Hz        | Summen des gemessenen PV-Wechselrichters                                               |
| `pvMeter.l1Voltage` /`l1Current` /`l1Power` /`l1ReactivePower` (Auch `l2…`, `l3…`)                    | Nummer              | V / A / W / var     | Phasenweise Messwerte des PV-Zählers                                                   |
| `pvMeter.energyToday` ⁺ (auch pro Phase: `l1EnergyToday`, …)                                          | Nummer              | kWh                 | Energie des gemessenen PV-Wechselrichters heute                                        |
| `generator.state` /`stateText` ⁺                                                                      | Zahl / Zeichenkette | —                   | Generatorstatus                                                                        |
| `generator.power` /`reactivePower` /`frequency` ⁺                                                     | Nummer              | W / var / Hz        | Generatorsummen                                                                        |
| `generator.l1Voltage`/`l1Current` /`l1Power` /`l1ReactivePower` (Auch `l2…`, `l3…`) ⁺                 | Nummer              | V / A / W / var     | Messwerte des Generators pro Phase                                                     |
| `generator.energyToday` ⁺ (auch pro Phase: `l1EnergyToday`, …)                                        | Nummer              | kWh                 | Generatorenergie heute                                                                 |

### Adapter-Level-Zustände

| Zustand               | Typ             | Beschreibung                                                                                                                                                                         |
| --------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `info.connection`     | boolescher Wert | Jedes angeschlossene Gerät (lokal oder Cloud)                                                                                                                                        |
| `info.cloudConnected` | boolescher Wert | Cloud-API verbunden                                                                                                                                                                  |
| `info.cloudLastError` | Zeichenkette    | Letzter permanenter Cloud-Anmeldefehler (leer, wenn erfolgreich). Nicht leere Werte pausieren die automatischen Wiederholungsversuche, bis die Anmeldeinformationen korrigiert sind. |

## Protokoll

### Lokal (TCP/Protobuf)

- **Transport:** TCP-Port 10081
- **Kodierung:** Protocol Buffers (protobuf)
- **Frame:** 10-Byte-Header (`HM` Magie + Befehls-ID + CRC16 + Länge) + Protobuf-Nutzdaten, mit Sequenznummern (0-60000)
- **Authentifizierung:** Keine (nur lokales Netzwerk)
- **Verschlüsselung:** Bis einschließlich DTU-Firmware V01.00.x keine. Ab V01.01.01 setzt die DTU Bit 25 von `dfs` In seiner InfoData-Antwort erwartet er **AES-128-GCM** bei jedem zweiten lokalen Frame – Schlüssel und Nonce werden aus dem 16-Byte-Bereich abgeleitet. `enc_rand` Die Daten werden unverschlüsselt gesendet; das 16-Byte-Authentifizierungs-Tag folgt dem Chiffretext über die Frame-Länge hinaus. Der Adapter erkennt dies in der ersten Antwort und schaltet selbstständig um. Nur die InfoData-Anfrage und -Antwort bleiben unverschlüsselt.
- **Heartbeat:** Ein Protobuf-Heartbeat nach 20 Sekunden ohne Datenverkehr hält die persistente Verbindung offen
- **Wiederverbindung:** nach 5 Minuten ohne Daten und bei jeder Trennung, mit exponentieller Verzögerung von 1 Sekunde bis zu 5 Minuten

### Cloud (S-Miles API)

- **Basis-URL:** `https://neapi.hoymiles.com`; Stationen im EU-Rechenzentrum werden bedient von `https://euapi.hoymiles.com` Der Adapter wählt den Host pro Station aus.
- **Authentifizierung:** Challenge-Login; Argon2id, wenn der Server ein Salt (S-Miles Home) liefert, andernfalls der herkömmliche MD5/SHA-256-Hash, den das Webportal sendet.
- **Daten:** Stations-Echtzeitdaten und Details, Gerätebaum, gerätespezifische Echtzeitindikatoren (Hybrid-Wechselrichter, Batterie, Zähler), der schnelle Echtzeit-Burst-Kanal, Tageskurven, Energiestatistiken (Tag, Monat, Jahr, Gesamtlebensdauer), Einnahmen und Kosten, Alarmlisten und Geräteaufgaben (Einstellungsabruf, Ein-/Ausschalten, Neustart)
- **Cloud-Relay:** Der Adapter leitet die Daten der DTU an den in der DTU konfigurierten Server und Port weiter – unverschlüsseltes TCP auf Port 10081 für ältere Firmware, TLS auf Port 10083 (verifiziert mit der Root-CA von Hoymiles) für Firmware V01.01.01 und höher.
- **Passwort:** Verschlüsselt in der ioBroker-Konfiguration gespeichert.

### Danksagungen

Gemeinschaftsprojekte, die die ersten Schritte ermöglichten:

- [hoymiles-wifi](https://github.com/suaveolent/hoymiles-wifi) — Python-Bibliothek
- [dtuGateway](https://github.com/ohAnd/dtuGateway) – ESP32-Gateway
- [Hoymiles-DTU-Proto](https://github.com/henkwiedig/Hoymiles-DTU-Proto) — ursprüngliche Protobuf-Definitionen

Heute wird das Protokoll anhand der S-Miles-App sowie der Firmware des DTU und des Wechselrichters selbst überprüft.

Vielen Dank an die Nutzer, die ihre Systeme zur Verfügung gestellt haben:

- **BastiBerlin** – Zugang zu einem HAT-6.0HV-EUG1-Hybridsystem mit Batterie, die Referenz für die Unterstützung von Hybrid-Wechselrichtern
- **akwf1927** – Erster Test der DTU-Firmware V01.01.01 auf einem HMS-400W-1T und einem HMS-800W-2T, lokal und über das TLS-Cloud-Relay

## Fehlerbehebung

### Der Adapter kann keine Verbindung herstellen.

- Überprüfen Sie, ob die DTU-IP-Adresse korrekt ist (prüfen Sie die DHCP-Tabelle Ihres Routers).
- Stellen Sie sicher, dass keine andere Anwendung mit Port 10081 verbunden ist (es darf immer nur eine Verbindung gleichzeitig bestehen).
- Falls der dtuGateway ESP32 läuft, stoppen Sie ihn zuerst.

### Nach dem Verbindungsaufbau wurden keine Daten übertragen.

- Überprüfen Sie das Adapterprotokoll auf Protobuf-Dekodierungsfehler.
- `Decryption failed: ... wrong final block length` oder `bad decrypt` Auf einem DTU mit Firmware V01.01.01 bedeutet dies, dass eine Adapterversion ohne Unterstützung für das verschlüsselte Protokoll ausgeführt wird. Installieren Sie die aktuelle Version und starten Sie die Instanz neu; das Protokoll meldet dann Folgendes: `DTU requires encrypted communication (firmware V01.01.01+)`

### Cloud-Anmeldung fehlgeschlagen

- Überprüfen Sie Ihre S-Miles-E-Mail und Ihr Passwort.
- Stellen Sie sicher, dass Sie sich unter <https://global.hoymiles.com/website/login> anmelden können.
- Bei einem permanenten Authentifizierungsfehler (falsche Anmeldedaten, Konto gesperrt) beendet der Adapter die Wiederholungsschleife, um weitere Kontosperrungen zu vermeiden. Der Fehler wird protokolliert. `info.cloudLastError` und eine ioBroker-Alarmbenachrichtigung (Bereich) `hoymiles`, Kategorie `cloudAuth`) wird ausgelöst. Korrigieren Sie die Anmeldeinformationen und speichern Sie die Konfiguration, um den Status zurückzusetzen und die Wiederholungsversuche fortzusetzen.

### Einen Fehler melden

Um aus einem „Es funktioniert nicht“ ein behebbares Problem zu machen, gibt der Adapter ein fokussiertes, **anonymisiertes** Diagnoseprotokoll aus:

1. Öffnen Sie in der ioBroker-Administration die Einstellungen der Adapterinstanz und stellen Sie den **Protokollierungsgrad** auf ein. `debug` Die
2. Starten Sie die Instanz neu und lassen Sie sie einige Minuten laufen (ein bis zwei Cloud-Abfragezyklen).
3. Exportieren Sie das Protokoll und wählen Sie die markierten Zeilen aus. `[diag]` Die

Der `[diag]` Die Zeilen enthalten die rohen Antworten der Cloud-API (Anmeldevorgang, Stationsliste/-details, Gerätebaum, Echtzeitdaten, Firmware) sowie die Ergebnisse des Adapters pro Entscheidung. DTU-/Wechselrichter-Seriennummern und die E-Mail-Adresse des Kontos werden durch stabile Hash-Token ersetzt, und GPS-Koordinaten/Adresse/Stationsname werden unkenntlich gemacht – so dass die `[diag]` Zeilen können bedenkenlos in einen Fehlerbericht in einem öffentlichen Forum eingefügt werden. (Andere, nicht-`[diag]` Die Debug-Zeilen können noch die eigentliche serielle Schnittstelle enthalten, senden Sie daher die `[diag]` (insbesondere Zeilen.)