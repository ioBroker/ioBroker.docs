---
chapters: {"pages":{"en/adapterref/iobroker.hoymiles/README.md":{"title":{"en":"ioBroker.hoymiles"},"content":"en/adapterref/iobroker.hoymiles/README.md"},"en/adapterref/iobroker.hoymiles/docs/en/README.md":{"title":{"en":"ioBroker.hoymiles — Hoymiles HMS-xxxW-xT / HMS-xxx-xWB"},"content":"en/adapterref/iobroker.hoymiles/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hoymiles/docs/en/README.md
title: ioBroker.hoymiles - Hoymiles HMS-xxxW-xT / HMS-xxx-xWB
hash: ExFxJWfhkQQ3u7r5iGjDwRaSNNYY5EzmksmQwBlzP7A=
---
![Logo](../../../../../en/adapterref/iobroker.hoymiles/admin/hoymiles.png)

# ioBroker.hoymiles — Hoymiles HMS-xxxW-xT / HMS-xxx-xWB

## Unterstützte Wechselrichter

Dieser Adapter ist für **Hoymiles HMS Mikro-Wechselrichter mit integriertem WiFi (oder WiFi + Bluetooth) DTU** (DTUBI) konzipiert.

**Lokal** = direkte TCP/Protobuf-Verbindung über Port 10081. **Cloud** = S-Miles Cloud API — automatische Erkennung, Echtzeitdaten (schneller Burst-Kanal \~1,5–3 s), Energieaggregate, Netzprofil, Wechselrichter ein/aus + Neustart, DTU-Neustart.

| Modell        | Saiten | Lokal (TCP) | Wolke | Status                                                                              |
| ------------- | :----: | :---------: | :---: | ----------------------------------------------------------------------------------- |
| HMS-300W-1T   |    1   |      ✅      |   ✅   | Ungetestet                                                                          |
| HMS-350W-1T   |    1   |      ✅      |   ✅   | Ungetestet                                                                          |
| HMS-400W-1T   |    1   |      ✅      |   ✅   | Ungetestet                                                                          |
| HMS-450W-1T   |    1   |      ✅      |   ✅   | Ungetestet                                                                          |
| HMS-500W-1T   |    1   |      ✅      |   ✅   | Ungetestet                                                                          |
| HMS-600W-2T   |    2   |      ✅      |   ✅   | Ungetestet                                                                          |
| HMS-700W-2T   |    2   |      ✅      |   ✅   | Ungetestet                                                                          |
| HMS-800W-2T   |    2   |      ✅      |   ✅   | **Getestet** (lokal + Cloud)                                                        |
| HMS-900W-2T   |    2   |      ✅      |   ✅   | Ungetestet                                                                          |
| HMS-1000W-2T  |    2   |      ✅      |   ✅   | **Getestet** (lokal)                                                                |
| HMS-1600DW-4T |    4   |      ✅      |   ✅   | Ungetestet                                                                          |
| HMS-1800DW-4T |    4   |      ✅      |   ✅   | Ungetestet                                                                          |
| HMS-2000DW-4T |    4   |      ✅      |   ✅   | Ungetestet                                                                          |
| HMS-600-2WB   |    2   |      ❌¹     |   ✅   | Ungetestet                                                                          |
| HMS-700-2WB   |    2   |      ❌¹     |   ✅   | Ungetestet                                                                          |
| HMS-800-2WB   |    2   |      ❌¹     |   ✅   | **Getestet** (Cloud: Echtzeit-Burst, Grid-Profil, Ein/Aus + Neustart, DTU-Neustart) |
| HMS-900-2WB   |    2   |      ❌¹     |   ✅   | Ungetestet                                                                          |
| HMS-1000-2WB  |    2   |      ❌¹     |   ✅   | Ungetestet                                                                          |
| HMS-1600-4WB  |    4   |      ❌¹     |   ✅   | Ungetestet                                                                          |
| HMS-1800-4WB  |    4   |      ❌¹     |   ✅   | Ungetestet                                                                          |
| HMS-2000-4WB  |    4   |      ❌¹     |   ✅   | Ungetestet                                                                          |

¹ Die **WB-Serie** (verkauft als **„HiFlow Pro“** ) verfügt über keinen lokalen TCP-Port – ihr einziger lokaler Kanal ist Bluetooth LE, und alle Daten werden an die Hoymiles-Cloud übertragen. Diese Wechselrichter funktionieren daher **ausschließlich cloudbasiert** : Nach Aktivierung der Cloud-Verbindung liest der Adapter die Daten über die S-Miles-API (Echtzeit-Burst, Energie, Netzprofil) und kann Befehle zum Ein-/Ausschalten, Neustarten und Neustarten des DTU senden. Alle WB-Modelle basieren auf derselben Plattform; bisher wurde nur das Modell HMS-800-2WB getestet.

**Betrieb nur über die Cloud:** Jeder unterstützte Wechselrichter in Ihrem S-Miles-Konto funktioniert auch ohne lokale Verbindung – der Adapter erkennt ihn automatisch und liefert Echtzeitleistung (Burst-Kanal), Energieaggregate, Netzprofil sowie die Möglichkeit, den Wechselrichter ein-/auszuschalten und neu zu starten.`inverter.active` /`inverter.reboot` ) plus DTU-Neustart (`dtu.reboot` ) Befehle über die Cloud. Die übrigen Befehle (Leistungsbegrenzung, Sperren, Warnungen löschen, …) erfordern die lokale TCP-Verbindung.

> Dieser Adapter funktioniert **NICHT** mit: HMS-1600/1800/2000-4T ohne "DW", HM-Serie, MI-Serie, externen DTU-Sticks oder HMT-Drehstrommodellen.

## Konfiguration

Öffnen Sie die Adapterkonfiguration in der ioBroker-Admin-Oberfläche.

### Lokale Verbindung (TCP)

| Einstellung                            | Standard | Beschreibung                                                                                                                                                          |
| -------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Lokal aktivieren**                   | An       | Aktivieren Sie die direkte TCP/Protobuf-Verbindung. Der Adapter hält eine dauerhafte TCP-Verbindung mit Protobuf-Heartbeat aufrecht.                                  |
| **DTU-Geräte**                         | (leer)   | Tabelle der DTU-IP-Adressen/Hostnamen. Fügen Sie pro DTU eine Zeile hinzu.                                                                                            |
| **Datenabfrageintervall**              | 5s       | Sekunden zwischen Datenanfragen (0-300). Stellen Sie 0 für die schnellstmögliche Zeit ein (\~1 Sekunde pro Zyklus).                                                   |
| **Konfigurations-/Alarmabfragefaktor** | 6        | Konfiguration und Alarme werden in jedem N-ten Datenzyklus abgefragt.                                                                                                 |
| **Cloud Relay**                        | An       | Leiten Sie Echtzeitdaten im Auftrag der DTU an die Hoymiles Cloud weiter. Andernfalls verhindert die lokale TCP-Verbindung, dass die DTU Daten in die Cloud hochlädt. |

### Cloud-Verbindung (S-Miles)

| Einstellung                        | Standard | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cloud aktivieren**               | aus      | Hoymiles S-Miles Cloud-API aktivieren                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **S-Miles-E-Mail**                 | —        | Ihre S-Miles-Konto-E-Mail                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **S-Miles-Passwort**               | —        | Ihr S-Miles-Kontopasswort (verschlüsselt gespeichert)                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Schnelle Echtzeitdaten (Cloud)** | An       | Für Wechselrichter **ohne** lokale Verbindung werden sekundengenaue Leistungsdaten aus der Cloud abgerufen (derselbe „Burst“-Kanal, den die Live-Ansicht der S-Miles-App verwendet). Updates`grid.power` Und`pvN.power` ungefähr alle 1,5–3 Sekunden (vom Server vorgegeben) anstatt nur alle \~80 Sekunden. Betrifft nur Geräte, die ausschließlich in der Cloud arbeiten; lokal angeschlossene Wechselrichter behalten ihre direkten lokalen Echtzeitdaten. |

Alle Wechselrichter in Ihrem Cloud-Konto werden automatisch erkannt. Eine manuelle Konfiguration der Seriennummern ist nicht erforderlich.

Beide Verbindungen können gleichzeitig aktiviert werden. Lokale Daten haben Priorität – Cloud-Daten werden verwendet, wenn die DTU offline ist (z. B. nachts).

#### Kontotypen – S-Miles-Installateur / Endnutzer / Privatkunden

Der Adapter akzeptiert Konten von allen drei offiziellen Hoymiles-Apps:

- **S-Miles-Installateur** (`com.hm.hemaiInstall1` )
- **S-Miles Endbenutzer** (`com.hm.hemaiClient1` )
- **S-Miles Home** (`com.hm.balcony` )

Der Login ist ein einzelner v3-Flow, gefolgt von einer Profilprüfung (`region_c → pre-insp → login → probe` ):

- **Vorabprüfung und Anmeldung** entscheiden über die Authentifizierungsvariante. Hoymiles hat alle Konten auf Argon2id vereinheitlicht (`v=3 + salt` ) im Jahr 2026, also`v` ist kein Profilsignal mehr – Installateur-, Endbenutzer- und Heimkonten verwenden heute alle dieselbe Argon2id-Herausforderung (Parameter aus der S-Miles Home Android-App):`t=3, m=32 MiB, p=1, hashLen=32, V13` Das Vermächtnis`md5hex(password).sha256base64(password)` Die Herausforderung wird als Ausweichlösung für jede Region beibehalten, die noch immer`v=2` Die
- **Sonde** (`/pvm/.../select_by_page` entscheidet dann, auf welcher Daten-API-Oberfläche das Konto zugelassen wird:
  - Probe akzeptiert → **Installer-** Profil – das Konto funktioniert auf`global.hoymiles.com` und erreicht die volle`/pvm/...` Web-API, einschließlich`latitude` /`longitude` /`address` /`local_time` /`status` /`warn_data` und Firmware-Versionszeichenfolgen.
  - Anfrage abgelehnt (Server meldet: _„Kann nur für die Anmeldung bei der S-Miles Home App verwendet werden“_ ) → **Heimprofil** – vom Server eingeschränkt auf`/pvmc/.../*_c` Diese Oberfläche lässt die oben genannten Felder aus, stellt aber einige zusätzliche Informationen bereit (Rückfluss-/Eigenverbrauchsenergie, Strompreis). Der Adapter erzeugt **keine** Zustände für die fehlenden Felder – sie erscheinen nur, wenn die zugrunde liegende Antwort den entsprechenden Wert enthält.`latitude` /`longitude` /`address` werden für Privatkonten über die Zusatzversicherung wiederhergestellt`pvm-ext/station-ak/find` Der Endpunkt, den die S-Miles Home App selbst verwendet, sorgt dafür, dass die Wetterabfrage funktioniert.

> **Notiz:**`dataeu.hoymiles.com:10081` Es handelt sich um den europäischen Cloud-Relay-Endpunkt, an den DTUs Daten senden – es ist **kein** Benutzer-Login-Server. Der Adapter verwaltet Cloud-Relay automatisch (siehe _Cloud Relay_ ).

#### Cloud-Anmeldung testen

Klicken Sie im Zweifelsfall auf die Schaltfläche **„Cloud-Anmeldung testen“** neben dem Passwortfeld. Dadurch werden die vier Phasen einmal mit Ihren aktuellen Anmeldedaten durchlaufen (`region_c` ,`pre-insp` ,`login` ,`probe` und Berichte`v` und das Vorhandensein von Salt aus der Vorabprüfung, ob die Anmeldung ein Token erzeugt hat und welches Profil die Sonde zugewiesen hat (`installer` /`home` Das Ergebnis wird protokolliert, sodass Sie es in einen Fehlerbericht im Forum einfügen können. Der Test speichert kein Token und ändert auch nicht den Adapterstatus.

## Geräte-Manager

Der Adapter integriert sich in den ioBroker **Device Manager** , sodass jeder Wechselrichter und jede Cloud-Station als Karte auf der Registerkarte _„Device Manager“_ in der Admin-Benutzeroberfläche angezeigt wird – mit Live-Status, Steuerelementen und einem Einstellungsdialog, ohne dass Sie Ihre eigene VIS-Ansicht erstellen müssen.

**Was gezeigt wird**

- Jeder **DTU/Wechselrichter** (`<dtuSerial>` ) und jede **Wolkenstation** (`station-<id>` ) der Adapter erstellt hat.
- Eine **Statusanzeige (grün/rot) zeigt die aktuelle Verbindung an** , und bei lokal angeschlossenen DTUs die WLAN-Signalstärke. Der Kartentitel enthält den Namen des Kraftwerks, zu dem der Wechselrichter gehört – den Namen, den Sie ihm in der S-Miles-App gegeben haben – sowie die Seriennummer des DTU (z. B. …).`Zuhause · 4143A01CEDE4` ), wodurch jeder Wechselrichter eindeutig identifiziert wird; ohne Station wird auf den Modellnamen oder die Seriennummer zurückgegriffen.
- **Live-Werte direkt auf der Karte:** aktuelle Leistung (W), heutige Energie (kWh), die tatsächliche Leistung jedes PV-Strings am Wechselrichter (eine Leitung pro String) und die Wechselrichtertemperatur – alles automatisch aktualisiert. Die Stationen zeigen die aggregierte Leistung und Energie an.
- **Gerätesymbole** nach Typ – flacher Mikro-Wechselrichter, aufrechter Drehstrom-Wechselrichter (HMT-Reihe) oder Umspannwerk. Es handelt sich um Originalsymbole, die speziell für den Adapter entworfen wurden und nicht von Herstellern stammen. Dieselben Symbole werden für die Geräteobjekte in der Objektstruktur verwendet.
- Eine **Firmware-Update-Anzeige** , wenn die Cloud ein solches Update meldet (von`dtu.fwUpdateAvailable` ).
- Über die Schaltfläche **„Mehr“** wird ein schreibgeschütztes Detailfenster geöffnet (Seriennummern, Hardware-/Softwareversionen, Modell, Signalstärke; bei Stationen Kapazität, Status und Adresse).

**Bedienelemente** (auf jeder Inverterkarte)

Die Karte spiegelt die beschreibbaren Zustände wider, sodass ein Klick über den normalen Befehlspfad geleitet wird (lokale TCP-Verbindung bevorzugt, Cloud-Fallback):

- **Schalter:** Wechselrichter ein/aus, Wechselrichter verriegeln.
- **Schieberegler / Zahlen:** Leistungsgrenze (Laufzeit), Leistungsfaktorgrenze, Blindleistungsgrenze, Dauerleistungsgrenze, Cloud-Sendeintervall.
- **Tasten (mit Bestätigung):** Wechselrichter neu starten, DTU neu starten, Warnungen löschen, Erdschluss löschen.
- **Einstellungen** (Schaltfläche, Lokale Geräte): Ein Dialog, um das Cloud-Sendeintervall und die dauerhafte Leistungsbegrenzung gleichzeitig zu ändern.

Bei Wechselrichtern **mit reiner Cloud-** Anbindung (ohne lokale Verbindung, z. B. HMS-800-2WB) werden nur die Aktionen angezeigt, die über die Cloud ausgeführt werden können – Wechselrichter ein/aus, Wechselrichter neu starten, DTU neu starten –, da die anderen Befehle nur lokal verfügbar sind. Stationen zeigen lediglich Status und Details an (keine Steuerungsmöglichkeiten).

**Instanzaktionen** (oberhalb der Geräteliste): **„Netzwerk scannen“** durchsucht das LAN nach DTUs und meldet die gefundenen Geräte, und **„Cloud-Anmeldung testen“** führt die Anmeldediagnose durch. (Zum Neuladen der Liste wird die integrierte Aktualisierungsschaltfläche des Geräte-Managers verwendet.)

> **Hinweis:** Geräte, die später über die Cloud gefunden werden (bis zu ca. 60 Sekunden nach dem Start), erscheinen nach dem Drücken **der Aktualisierungstaste** oder dem erneuten Öffnen des Tabs; der Live-Status bereits aufgelisteter Geräte wird automatisch aktualisiert.

## Verbindungsmodi

Der Adapter unterstützt je nach Konfiguration verschiedene Verbindungsmodi:

|                        | Nur für lokale Nutzer       | Lokal + Relais                     | Nur Wolken          | Lokal + Cloud               | Lokal + Relais + Cloud                 |
| ---------------------- | --------------------------- | ---------------------------------- | ------------------- | --------------------------- | -------------------------------------- |
| **TCP-Abfrage**        | Ja                          | Ja                                 | —                   | Ja                          | Ja                                     |
| **Wiederverbinden**    | Zurückweichen 1–60 Sekunden | Zurückweichen 1–60 Sekunden        | —                   | Zurückweichen 1–60 Sekunden | Zurückweichen 1–60 Sekunden            |
| **Cloud Relay**        | —                           | HB 60s, Daten alle`serverSendTime` | —                   | —                           | HB 60s, Daten alle`serverSendTime`     |
| **Wolke beim Start**   | —                           | —                                  | Vollständiger Abruf | Vollständiger Abruf         | Vollständiger Abruf                    |
| **Cloud (WR online)**  | —                           | —                                  | Alle 5 Minuten      | Jeder`serverSendTime`       | 30 Sekunden nach dem Senden des Relais |
| **Cloud (WR offline)** | —                           | —                                  | Alle 5 Minuten      | Wetter + FW nur             | Wetter + FW nur                        |

### Automatische Wiederverbindung

Der Wechselrichter (DTU) ist nur erreichbar, wenn er Strom erzeugt (Sonnenschein). Der Adapter verbindet sich automatisch mit exponentieller Verzögerung (1 s, 2 s, 4 s, ... bis maximal 60 s). Nach erfolgreicher Verbindung wird die Verzögerung auf 1 s zurückgesetzt.

### Nachtmodus

Wenn die lokale Verbindung abbricht (typischerweise bei Sonnenuntergang), schaltet der Adapter in **den Nachtmodus** :

- Die Cloud-Weiterleitung pausiert (sendet einen letzten Daten-Upload und trennt dann die Verbindung).
- Die Cloud-API beschränkt sich auf Wetteraktualisierungen und Firmware-Prüfungen (keine Echtzeitdaten, da sich nichts ändert).
- Sobald die lokale Verbindung wiederhergestellt ist (Sonnenaufgang), verlässt der Adapter den Nachtmodus und nimmt den normalen Betrieb wieder auf.

### Staatliche Qualität

Der Adapter verwendet das Statusqualitätsattribut von ioBroker (`q` ) um die Zuverlässigkeit und Quelle der Datenwerte anzugeben:

| Qualität              | Wert        | Bedeutung                      | Wann                                                                                                                                                                                                                                   |
| --------------------- | ----------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Gut                   | `0x00` (0)  | Frische, lokal bezogene Daten  | Normalbetrieb – Daten werden direkt von der DTU über TCP empfangen.                                                                                                                                                                    |
| Ersatz                | `0x40` (64) | Cloudbasierte Fallback-Daten   | Wechselrichterdaten werden über die Hoymiles Cloud API anstatt über lokales TCP abgerufen (nur Cloud-Geräte).                                                                                                                          |
| Gerät nicht verbunden | `0x42` (66) | Veraltete Daten, Gerät offline | DTU-Verbindung unterbrochen – die Werte sind die letzten bekannten Messwerte vor der Trennung. Auch in Cloud Station eingestellt.`grid.*` wenn der letzte Cloud-Upload der Station älter als ca. 20 Minuten ist (DTU lädt nicht hoch). |

**Betroffene Staaten:**`grid.*` ,`pv*.*` ,`inverter.temperature` ,`inverter.active` ,`inverter.warnCount` ,`inverter.warnMessage` ,`inverter.activePowerLimit` ,`meter.*` — plus die Messungen der Wolkenstation`station-<id>.grid.*` (markiert)`0x42` (während der Sender offline/veraltet ist).

Info-Angaben (`info.*` ), Konfigurationszustände (`config.*` ), und statische Stations-Cloud-Daten (Name, Adresse, Koordinaten, Warnhinweise) sind von Qualitätsänderungen **nicht** betroffen.

**Automatischer Reset:** Sobald die lokale DTU-Verbindung wiederhergestellt ist, werden durch die nächste erfolgreiche Datenantwort alle betroffenen Zustände automatisch auf den Qualitätsstandard zurückgesetzt.`0x00` (Gut). Ebenso verhält es sich, wenn eine Cloud-Station den Upload wieder aufnimmt.`grid.*` Qualität kehrt zurück zu`0x00` und der Adapter führt sofort eine vollständige Aktualisierung durch (Details, Geräte, Firmware, Warnungen), bevor er den normalen Abfragezyklus wieder aufnimmt.

Sie können das Qualitätsattribut in Skripten und Visualisierungen verwenden, um zwischen aktuellen und veralteten Daten zu unterscheiden, z. B. durch Abdunkeln oder Ausgrauen von Werten.`q > 0` Die

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
2. **Cloud:** aus dem Hoymiles-Regelwerk, nachgeschlagen anhand des Seriennummernpräfixes des Wechselrichters – dieselbe Quelle, die auch die S-Miles-App verwendet. Dies umfasst alle Produktlinien, einschließlich`…-2WB` /`…-4WB` Die
3. **Fallback:** vom Modellnamen (`…-2T` ,`…-4WB` , …), oder anhand der Anzahl der Zeichenketten, die tatsächlich in den Live-Daten erscheinen.

| Zustand           | Typ    | Einheit | Beschreibung                                                |
| ----------------- | ------ | ------- | ----------------------------------------------------------- |
| `pvX.power`       | Nummer | W       | Panelstrom                                                  |
| `pvX.voltage`     | Nummer | V       | Panelspannung                                               |
| `pvX.current`     | Nummer | A       | Panelstrom                                                  |
| `pvX.dailyEnergy` | Nummer | kWh     | Tägliche Energie (nur lokal)                                |
| `pvX.totalEnergy` | Nummer | kWh     | Gesamtenergie (nur lokal)                                   |
| `pvX.errorCode`   | Nummer |         | Fehlercode pro Zeichenkette, 0 im Normalbetrieb (nur lokal) |

### `<dtuSerial>.inverter.*` — Wechselrichterstatus und -steuerung (pro DTU)

| Zustand                          | Typ             | Einheit | Beschreibbar | Beschreibung                                                                                                                                                                                                                                        |
| -------------------------------- | --------------- | ------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `inverter.serialNumber`          | Zeichenkette    | —       | NEIN         | Seriennummer des Wechselrichters                                                                                                                                                                                                                    |
| `inverter.model`                 | Zeichenkette    | —       | NEIN         | Wechselrichtermodell (Cloud)                                                                                                                                                                                                                        |
| `inverter.hwVersion`             | Zeichenkette    | —       | NEIN         | Hardwareversion                                                                                                                                                                                                                                     |
| `inverter.swVersion`             | Zeichenkette    | —       | NEIN         | Softwareversion                                                                                                                                                                                                                                     |
| `inverter.temperature`           | Nummer          | °C      | NEIN         | Wechselrichtertemperatur                                                                                                                                                                                                                            |
| `inverter.powerLimit`            | Nummer          | %       | **Ja**       | **Laufzeit** -Leistungsbegrenzung (nur RAM, **kein Flash-/NVM-Verschleiß – sicheres Schreiben jede Sekunde** ). **Nutzen Sie diesen Zustand zur Realisierung von Zero-Export (Nulleinspeisung)** / dynamischer Leistungsreduzierung. 2–100 %, lokal |
| `inverter.activePowerLimit`      | Nummer          | %       | NEIN         | Aktive Leistungsbegrenzung (live, lokal)                                                                                                                                                                                                            |
| `inverter.active`                | boolescher Wert | —       | **Ja**       | Wechselrichter ein-/ausschalten (lokal; über die Cloud für reine Cloud-Geräte)                                                                                                                                                                      |
| `inverter.reboot`                | boolescher Wert | —       | **Ja**       | Wechselrichter neu starten (Knopf, lokal; über die Cloud für reine Cloud-Geräte)                                                                                                                                                                    |
| `inverter.powerFactorLimit`      | Nummer          | —       | **Ja**       | Leistungsfaktorgrenze (-1 bis 1, lokal)                                                                                                                                                                                                             |
| `inverter.reactivePowerLimit`    | Nummer          | °       | **Ja**       | Blindleistungsgrenze (-50 bis 50, lokal)                                                                                                                                                                                                            |
| `inverter.cleanWarnings`         | boolescher Wert | —       | **Ja**       | Warnungen löschen (Schaltfläche, lokal)                                                                                                                                                                                                             |
| `inverter.cleanGroundingFault`   | boolescher Wert | —       | **Ja**       | Saubere Erdschlussbehebung (Taster, lokal)                                                                                                                                                                                                          |
| `inverter.lock`                  | boolescher Wert | —       | **Ja**       | Wechselrichter verriegeln/entriegeln (lokal)                                                                                                                                                                                                        |
| `inverter.warnCount`             | Nummer          | —       | NEIN         | SGSMO`warning_number` Feld, Rohwert (lokal) – kein dokumentierter Warncode                                                                                                                                                                          |
| `inverter.warnMessage`           | Zeichenkette    | —       | NEIN         | Aktive Warnmeldung aus der WCode-Alarmliste (lokal)                                                                                                                                                                                                 |
| `inverter.linkStatus`            | Nummer          | —       | NEIN         | Linkstatus                                                                                                                                                                                                                                          |
| `inverter.modulationIndexSignal` | Nummer          | —       | NEIN         | SGSMO #20, Rohdatenpaket (Modulationsindex + Signal; genaue Dekodierung noch nicht bestätigt, lokal)                                                                                                                                                |

### `<dtuSerial>.dtu.*` — DTU-Informationen (pro DTU, nur lokal außer`dtu.reboot` )

| Zustand                 | Typ             | Einheit | Beschreibung                                                                                                                                                                                           |
| ----------------------- | --------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `dtu.serialNumber`      | Zeichenkette    | —       | DTU-Seriennummer                                                                                                                                                                                       |
| `dtu.swVersion`         | Zeichenkette    | —       | Softwareversion                                                                                                                                                                                        |
| `dtu.hwVersion`         | Zeichenkette    | —       | Hardwareversion                                                                                                                                                                                        |
| `dtu.rssi`              | Nummer          | dBm     | Signalstärke                                                                                                                                                                                           |
| `dtu.reboot`            | boolescher Wert | —       | DTU neu starten ( **beschreibbar** , Schaltfläche). Wird über die lokale TCP-Verbindung gesendet, wenn eine Verbindung besteht, andernfalls über die Cloud für reine Cloud-Geräte (z. B. HMS-800-2WB). |
| `dtu.wifiVersion`       | Zeichenkette    | —       | WLAN-Version                                                                                                                                                                                           |
| `dtu.fwUpdateAvailable` | boolescher Wert | —       | Firmware-Update verfügbar (wird täglich über die Cloud geprüft)                                                                                                                                        |
| `dtu.stepTime`          | Nummer          | S       | Schrittzeit                                                                                                                                                                                            |
| `dtu.accessModel`       | Nummer          | —       | Netzwerkzugriffsmodus (0=GPRS, 1=WLAN, 2=Ethernet)                                                                                                                                                     |
| `dtu.communicationTime` | Nummer          | —       | Letzte Kommunikation (Unix-Zeitstempel)                                                                                                                                                                |
| `dtu.connState`         | Nummer          | —       | DTU-Fehlercode (0=OK)                                                                                                                                                                                  |
| `dtu.searchResult`      | Zeichenkette    | —       | Ergebnis der automatischen Suche (Seriennummern von Wechselrichtern, JSON)                                                                                                                             |

### `station-<id>.grid.*` — Stationsaggregate (Wolke)

| Zustand                 | Typ             | Einheit | Beschreibung                                                                                                             |
| ----------------------- | --------------- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| `grid.power`            | Nummer          | W       | Gesamtstationsleistung (Live-Übertragung in ca. 1,5–3 s über den Burst-Kanal, wenn dieser aktiv ist, ansonsten ca. 80 s) |
| `grid.gridPower`        | Nummer          | W       | Netzaustauschleistung (Echtzeit, +Import/−Export) — nur bei gemessenen Systemen ungleich Null                            |
| `grid.loadPower`        | Nummer          | W       | Last-/Verbrauchsleistung (Echtzeit)                                                                                      |
| `grid.batteryPower`     | Nummer          | W       | Batterieleistung (Echtzeit, +Laden/−Entladen) — nur Batteriesysteme                                                      |
| `grid.pvUtilization`    | Nummer          | %       | PV-Nutzung (Echtzeit)                                                                                                    |
| `grid.dailyEnergy`      | Nummer          | kWh     | Tägliche Energie                                                                                                         |
| `grid.monthEnergy`      | Nummer          | kWh     | Monatliche Energie                                                                                                       |
| `grid.yearEnergy`       | Nummer          | kWh     | Jährlicher Energieaufwand                                                                                                |
| `grid.totalEnergy`      | Nummer          | kWh     | Gesamtlebensdauerenergie                                                                                                 |
| `grid.co2Saved`         | Nummer          | kg      | CO2 eingespart                                                                                                           |
| `grid.treesPlanted`     | Nummer          | —       | Entsprechende Anzahl Bäume gepflanzt                                                                                     |
| `grid.electricityPrice` | Nummer          | /kWh    | Strompreis                                                                                                               |
| `grid.currency`         | Zeichenkette    | —       | Währungscode                                                                                                             |
| `grid.isBalance`        | boolescher Wert | —       | Null Export aktiv                                                                                                        |
| `grid.isReflux`         | boolescher Wert | —       | Einspeisungsaktiv                                                                                                        |
| `grid.todayIncome`      | Nummer          | —       | Heutiges Einkommen                                                                                                       |
| `grid.totalIncome`      | Nummer          | —       | Gesamteinkommen                                                                                                          |

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

> **Wettersymbolcodes:** Die Symbolcodes folgen der [OpenWeatherMap-Konvention](https://openweathermap.org/weather-conditions) . Um das Symbol als Bild anzuzeigen, verwenden Sie:`https://openweathermap.org/img/wn/{icon}@2x.png`

### `station-<id>.warn.*` — Stationswarnungen (Wolke)

Warnmeldungen auf Netz- und Zählerebene aus der Cloud`station/find` Datensatz. Alle booleschen Werte —`true` Das bedeutet, dass der Zustand aktuell aktiv ist. Installer-Konten lesen die Flags von`station/find` ; auf S-Miles Home-Konten (wo`find_c` (lässt sie aus) greift der Adapter auf den zurück`realtime_c` Antwort. Dieser Ausweichblock enthält sechs der Flaggen – aber **nicht**`warn.powerLimited` , das nur im Installationsprogramm existiert`station/find` Aufzeichnung — so auch auf Heimkonten`warn.powerLimited` Aufenthalte`false` auch dann, wenn die Drosselung aktiv ist. Die Zustände erscheinen erst, wenn die Cloud eine`warn_data` Blockierung von beiden Quellen.

| Zustand                | Typ             | Beschreibung                                                                                                                                                                                                                                                                                                                                      |
| ---------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `warn.stationOffline`  | boolescher Wert | Station offline / Versorgungsspannung unterbrochen. Abgleich mit der Aktualität der Echtzeitdaten: Eine Station, die noch aktuelle Daten hochlädt, wird niemals als offline gemeldet, selbst wenn die Cloud dies kurzzeitig signalisiert.`s_uoff` (z. B. während das Cloud-Relay beim Start des Adapters die Uplink-Verbindung der DTU übernimmt) |
| `warn.gridUnstable`    | boolescher Wert | Netzspannung instabil                                                                                                                                                                                                                                                                                                                             |
| `warn.gridFault`       | boolescher Wert | Netzstörung / Netzanomalie                                                                                                                                                                                                                                                                                                                        |
| `warn.deviceAlarm`     | boolescher Wert | Wechselrichteralarm – ein Wechselrichter weist einen aktiven Fehler auf (z. B. „PVx kein Eingang“, wenn ein DC-String getrennt ist). Derselbe Zustand tritt lokal und schneller auf unter`alarms.lastCode` / `alarms.lastMessage`                                                                                                                 |
| `warn.deviceIdWarning` | boolescher Wert | Geräte-ID-Warnung (ID-Abweichung / Diebstahlschutz)                                                                                                                                                                                                                                                                                               |
| `warn.meterFault`      | boolescher Wert | Zählerstörung / Zählerwarnung                                                                                                                                                                                                                                                                                                                     |
| `warn.powerLimited`    | boolescher Wert | Leistungsbegrenzung (Leistungsreduzierung/Leistungsbegrenzung aktiv). **Nur für Installateure** – nicht für Privatkunden.                                                                                                                                                                                                                         |

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

> ⚠️ **WARNUNG — niemals schreiben`config.*` Staaten (insbesondere`config.limitPowerMyPower` Häufige oder automatisierte** Schreibvorgänge programmieren den **internen Flash-Speicher des integrierten DTU** (des WLAN-Moduls im HMS-xT). Die Lebensdauer des Flash-Speichers ist begrenzt (ca. zehntausende Zyklen); wiederholte, hochfrequente Schreibvorgänge – z. B. eine Null-Export-Schleife pro Sekunde – führen zu Verschleiß und können **das Gerät dauerhaft beschädigen** . Verwenden Sie diese Zustände nur für gelegentliche, dauerhafte Einstellungen. **Für dynamische/häufige Leistungsbegrenzung (Null-Export) verwenden Sie`inverter.powerLimit` stattdessen** – ein Laufzeitbefehl, der ausschließlich im Arbeitsspeicher ausgeführt **wird, keine Flash-Schreibvorgänge durchführt und keinen Verschleiß verursacht** und daher bedenkenlos jede Sekunde aktualisiert werden kann.

| Zustand                    | Typ          | Einheit | Beschreibbar | Beschreibung                                                                                                                                                                                                                                                                                                   |
| -------------------------- | ------------ | ------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config.serverDomain`      | Zeichenkette | —       | NEIN         | Cloud-Server-Domäne                                                                                                                                                                                                                                                                                            |
| `config.serverPort`        | Nummer       | —       | NEIN         | Cloud-Server-Port                                                                                                                                                                                                                                                                                              |
| `config.serverSendTime`    | Nummer       | min     | **Ja**       | Cloud-Sendeintervall (Minuten). ⚠️ Persistent (DTU-Flash) – nicht häufig schreiben, siehe Warnung oben                                                                                                                                                                                                         |
| `config.limitPowerMyPower` | Nummer       | %       | **Ja**       | **Permanente** Leistungsbegrenzung (im DTU-Flash gespeichert, bleibt nach einem Neustart erhalten; 2–100 %, lokal). ⚠️ **Nur permanente Begrenzung – niemals in einer Schleife schreiben (verursacht Verschleiß am DTU-Flash). Für dynamische Null-Export-Nutzung.`inverter.powerLimit`** (siehe Warnung oben) |
| `config.wifiSsid`          | Zeichenkette | —       | NEIN         | WLAN-SSID                                                                                                                                                                                                                                                                                                      |
| `config.wifiRssi`          | Nummer       | dBm     | NEIN         | WLAN-Signalstärke (reale dBm, z. B. −65)                                                                                                                                                                                                                                                                       |
| `config.invType`           | Nummer       | —       | NEIN         | Wechselrichtertyp                                                                                                                                                                                                                                                                                              |
| `config.netmodeSelect`     | Nummer       | —       | NEIN         | Netzwerkmodus (0=GPRS, 1=WLAN, 2=Ethernet)                                                                                                                                                                                                                                                                     |
| `config.netDhcpSwitch`     | Nummer       | —       | NEIN         | DHCP aktiviert                                                                                                                                                                                                                                                                                                 |
| `config.wifiIpAddress`     | Zeichenkette | —       | NEIN         | WLAN-IP-Adresse                                                                                                                                                                                                                                                                                                |
| `config.wifiMacAddress`    | Zeichenkette | —       | NEIN         | WLAN-MAC-Adresse                                                                                                                                                                                                                                                                                               |
| `config.dtuApSsid`         | Zeichenkette | —       | NEIN         | DTU-Zugangspunkt-SSID                                                                                                                                                                                                                                                                                          |

### `<dtuSerial>.gridProfile.*` — Grid-Profil (pro DTU, lokal – wird für reine Cloud-Geräte über die Cloud gelesen)

Das Netzanschlussprofil des Wechselrichters (Sicherheits-/Netzanschlussparameter) wird lokal über DevConfigFetch ausgelesen. Alle Daten sind schreibgeschützt. Spannungs-/Frequenzwerte entsprechen dem aktiven Netzstandard (z. B.`DE_VDE4105_2018` Funktionsflags sind boolesche Werte (`true` = Funktion aktiv).

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

### `<dtuSerial>.meter.*` — Energiezähler (pro DTU, lokal, dynamisch)

Zählerstände werden automatisch erstellt, sobald die Zählerdaten vom DTU empfangen werden. Nur verfügbar, wenn ein kompatibler Energiezähler angeschlossen ist.

| Zustand                   | Typ    | Einheit | Beschreibung                      |
| ------------------------- | ------ | ------- | --------------------------------- |
| `meter.totalPower`        | Nummer | W       | Gesamtleistung (alle Phasen)      |
| `meter.phaseAPower`       | Nummer | W       | Phase-A-Stromversorgung           |
| `meter.phaseBPower`       | Nummer | W       | Phase B Stromversorgung           |
| `meter.phaseCPower`       | Nummer | W       | Phase C-Strom                     |
| `meter.powerFactorTotal`  | Nummer | —       | Gesamtleistungsfaktor             |
| `meter.energyTotalExport` | Nummer | kWh     | Gesamtenergieexport (Einspeisung) |
| `meter.energyTotalImport` | Nummer | kWh     | Gesamtenergieimport (Verbrauch)   |
| `meter.voltagePhaseA`     | Nummer | V       | Spannung Phase A                  |
| `meter.voltagePhaseB`     | Nummer | V       | Spannung Phase B                  |
| `meter.voltagePhaseC`     | Nummer | V       | Spannung Phase C                  |
| `meter.currentPhaseA`     | Nummer | A       | Aktuelle Phase A                  |
| `meter.currentPhaseB`     | Nummer | A       | Aktuelle Phase B                  |
| `meter.currentPhaseC`     | Nummer | A       | Aktuelle Phase C                  |
| `meter.faultCode`         | Nummer | —       | Zählerfehlercode                  |

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
- **Verschlüsselung:** Optionale AES-128-CBC-Verschlüsselung mit SHA-256-Schlüsselableitung (automatische Erkennung über die DTU-Informationsantwort)
- **Herzschlag:** Protobuf sendet alle 20 Sekunden einen Herzschlag, um die dauerhafte Verbindung aufrechtzuerhalten.
- **Wiederverbindung:** 5-minütige Leerlaufzeitüberschreitung, automatische Wiederverbindung mit exponentiellem Backoff (1s-60s)

### Cloud (S-Miles API)

- **Basis-URL:**`https://neapi.hoymiles.com`
- **Authentifizierung:** MD5+SHA256-Hash der Anmeldeinformationen mit Nonce
- **Daten:** Stations-Echtzeit, Gerätebaum, Stationsdetails
- **Passwort:** Verschlüsselt in der ioBroker-Konfiguration gespeichert.

### Danksagungen

Protokoll-Reverse-Engineering durch die Community:

- [hoymiles-wifi](https://github.com/suaveolent/hoymiles-wifi) — Python-Bibliothek (primäre Referenz)
- [dtuGateway](https://github.com/ohAnd/dtuGateway) – ESP32-Gateway
- [Hoymiles-DTU-Proto](https://github.com/henkwiedig/Hoymiles-DTU-Proto) — Originale Protobuf-Definitionen

## Fehlerbehebung

### Der Adapter kann keine Verbindung herstellen.

- Überprüfen Sie, ob die DTU-IP-Adresse korrekt ist (prüfen Sie die DHCP-Tabelle Ihres Routers).
- Stellen Sie sicher, dass keine andere Anwendung mit Port 10081 verbunden ist (es darf immer nur eine Verbindung gleichzeitig bestehen).
- Falls der dtuGateway ESP32 läuft, stoppen Sie ihn zuerst.

### Nach dem Verbindungsaufbau wurden keine Daten übertragen.

- DTU-Firmware V01.01.00 und neuer kann die lokale Protobuf-Kommunikation beeinträchtigen.
- Aktualisieren Sie die DTU-Firmware NICHT, wenn Ihnen der lokale Zugriff wichtig ist.
- Überprüfen Sie das Adapterprotokoll auf Protobuf-Dekodierungsfehler.

### Cloud-Anmeldung fehlgeschlagen

- Überprüfen Sie Ihre S-Miles-E-Mail und Ihr Passwort.
- Stellen Sie sicher, dass Sie sich unter <https://global.hoymiles.com/website/login> anmelden können.
- Bei einem permanenten Authentifizierungsfehler (falsche Anmeldedaten, Konto gesperrt) beendet der Adapter die Wiederholungsschleife, um weitere Kontosperrungen zu vermeiden. Der Fehler wird protokolliert.`info.cloudLastError` und eine ioBroker-Alarmbenachrichtigung (Bereich)`hoymiles` , Kategorie`cloudAuth` ) wird ausgelöst. Korrigieren Sie die Anmeldeinformationen und speichern Sie die Konfiguration, um den Status zurückzusetzen und die Wiederholungsversuche fortzusetzen.

### Einen Fehler melden

Um aus einem „Es funktioniert nicht“ ein behebbares Problem zu machen, gibt der Adapter ein fokussiertes, **anonymisiertes** Diagnoseprotokoll aus:

1. Öffnen Sie in der ioBroker-Administration die Einstellungen der Adapterinstanz und stellen Sie den **Protokollierungsgrad** auf ein.`debug` Die
2. Starten Sie die Instanz neu und lassen Sie sie einige Minuten laufen (ein bis zwei Cloud-Abfragezyklen).
3. Exportieren Sie das Protokoll und wählen Sie die markierten Zeilen aus.`[diag]` Die

Der`[diag]` Die Zeilen enthalten die rohen Antworten der Cloud-API (Anmeldevorgang, Stationsliste/-details, Gerätebaum, Echtzeitdaten, Firmware) sowie die Ergebnisse des Adapters pro Entscheidung. DTU-/Wechselrichter-Seriennummern und die E-Mail-Adresse des Kontos werden durch stabile Hash-Token ersetzt, und GPS-Koordinaten/Adresse/Stationsname werden unkenntlich gemacht – so dass die`[diag]` Zeilen können bedenkenlos in einen Fehlerbericht in einem öffentlichen Forum eingefügt werden. (Andere, nicht-`[diag]` Die Debug-Zeilen können noch die eigentliche serielle Schnittstelle enthalten, senden Sie daher die`[diag]` (insbesondere Zeilen.)