---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.zeekr/README.md
title: ioBroker Zeekr Adapter
hash: h+bxt5Ti5Z0L4NLoHjhNySSDLjnt+M109Yo0fjRMO8Y=
---
# ioBroker Zeekr Adapter

<p align="center">
  <img src="admin/zeekr.svg" alt="Zeekr logo" width="160" height="160" />
</p>

Dieses Repository enthält einen ioBroker-Adapter für [Zeekr-Elektrofahrzeuge](https://www.zeekr.com) . Er folgt der Standardstruktur des ioBroker-Adapters und stellt Fahrzeugstatusdaten als Datenpunkte bereit.

## Merkmale

- Standardmäßiges ioBroker-Adapterlayout mit Konfigurations-UI
- Benutzername und Passwort für Zeekr sowie die vom Upstream-Client zeekr\_ev\_api benötigten Zeekr-spezifischen Geheimnisse können in der ioBroker-Administrationsschnittstelle konfiguriert werden.
- Optionale automatische Geheimnisextraktion aus einem `zeekr_secrets.json` oder direkt von den Zeekr-APKs auf dem ioBroker-Host
- Fahrzeugerkennung und Statusabfrage über eine Python-Bridge, die den Zeekr-API-Client verwendet.
- Datenpunkte für Fahrzeugidentität, Batteriestand, Reichweite, Kilometerzähler, Ladezustand, Verriegelungszustand, Klimazustand und Rohnutzlasten
- Fahrtenbuch für die Adapterseite (`trips.own*`, funktioniert mit gemeinsam genutzten Konten), Gebühren für die Sitzungsauswertung mit Roaming-Tarifen (`energy.*`), Tages-/Wochen-/Monatsaggregate und CSV-Export für VIS und Tabellenkalkulationen
- Benannte Geozonen, adaptive Abfrage (schnell während der Fahrt) und Webhook-Benachrichtigungen (Ladevorgang abgeschlossen/unterbrochen, Wartung fällig, Reifendruckwarnung, niedriger 12-V-Wert)
- Gesundheits- und Alarmzustände wie z.B. `info.health`, `info.alertCount`, Und `info.lastSuccessfulUpdate`
- Automatisches Einrichten einer lokalen Python-Laufzeitumgebung und der Zeekr-Abhängigkeit bei der ersten Verwendung

## Anforderungen

- Node.js 22+ (passt `engines` In `package.json`)
- Python 3

Es ist keine manuelle Installation von Python-Paketen erforderlich. Der Adapter erstellt beim ersten Start eine lokale virtuelle Umgebung und installiert die Zeekr-Abhängigkeit automatisch.

Auf Debian/Ubuntu-Hosts und -Containern ist der venv-Bootstrap autark: Die venv wird ohne das System-pip erstellt, und pip wird aus dem mitgelieferten Paket gestartet. `lib/get-pip.py` — Keine Downloads, keine Betriebssystempakete. Nur wenn `venv` Das Python-Modul selbst fehlt; Sie benötigen das Betriebssystempaket und einen Neustart der Instanz (des Adapters). `.venv` (Das Verzeichnis wird automatisch neu erstellt):

```bash
apt-get update && apt-get install -y python3-venv
```

## Entwicklung

Führen Sie die Testsuite lokal aus:

```bash
npm test
```

## Installation

Installieren Sie den Adapter aus den ioBroker-Repositories: Öffnen Sie die Admin-Oberfläche, gehen Sie zu Adapter und suchen Sie nach `Zeekr` und installieren Sie es. Erstellen Sie anschließend eine neue Instanz und konfigurieren Sie diese (siehe unten).

Falls der Adapter nach einem Update nicht ordnungsgemäß funktioniert, führen Sie Folgendes aus: `iobroker fix` auf dem Host.

## Konfigurieren Sie die Instanz

Öffnen Sie die ioBroker-Admin-Benutzeroberfläche und erstellen Sie eine neue Instanz von `Zeekr` Adapter und Konfiguration:

- Benutzername: Ihre Zeekr-Konto-E-Mail-Adresse oder Ihr Anmeldename
- Passwort: Ihr Zeekr-Kontopasswort
- Ländercode: ISO-Ländercode, der vom Zeekr-API-Client verwendet wird (Standardwert: `AU`)
- hmacAccessKey: HMAC-Zugriffsschlüssel, der vom Upstream-Client benötigt wird
- hmacSecretKey: Der vom Upstream-Client benötigte HMAC-Geheimschlüssel.
- passwordPublicKey: Öffentlicher Schlüssel zur Passwortverschlüsselung, der vom Upstream-Client benötigt wird.
- prodSecret: Produktionsgeheimnis, das vom Upstream-Client benötigt wird.
- vinKey: VIN-Verschlüsselungsschlüssel, der vom Upstream-Client benötigt wird
- vinIv: VIN-Verschlüsselungs-IV, der vom Upstream-Client benötigt wird
- Abfrageintervall: Aktualisierungsintervall in Sekunden
- Fahrzeugfilter: Optionaler Teilstringfilter für ein oder mehrere Fahrzeuge; er entscheidet lediglich, welche Fahrzeuge als Datenpunkte angezeigt werden.
- pythonBinary: Optionale Überschreibung der vom Adapter-Bridge und Secret Extractor verwendeten Python-Executable.
- autoExtractSecrets: Wenn diese Option aktiviert ist, versucht der Adapter, fehlende Geheimnisse aus den APKs oder aus einer Datei zu extrahieren. `zeekr_secrets.json` Datei beim Start des Adapters
- apkBasePath/apkArm64Path: Optionale Pfade zu den Zeekr-APK-Dateien für die automatische Extraktion
- secretsJsonPath: optionaler Pfad zu einem `zeekr_secrets.json` erstellt vom Extraktor
- extractRegion: Region, die vom vorgelagerten Extraktor verwendet wird (`EM`, `SEA`, `EU`, `CN`)
- Debug: Ausführliche Bridge-Protokollierung aktivieren

## Automatische Geheimnisextraktion

Der Adapter kann den Extraktionsprozess von der vorgelagerten Quelle automatisieren. `zeekr_key_extractor` Tool. Damit dies funktioniert, benötigen Sie entweder:

- die vollständige Zeekr-Basis-APK und die dazugehörige ARM64-Split-APK auf dem ioBroker-Host, oder
- ein vorab generiert `zeekr_secrets.json` Datei.

Das Extraktionsskript ist zusammen mit dem Adapter in einem festgelegten, geprüften Upstream-Commit enthalten (`lib/extractor/`, MIT) — Zur Laufzeit wird nichts geklont oder heruntergeladen.

### Wie man APKs von einem Telefon oder Emulator erhält

Obligatorische Vorbereitung auf Ihrem eigenen Gerät – der Adapter kann dies nicht für Sie erledigen:

1. Installieren Sie auf Ihrem Android-Smartphone oder Emulator die Zeekr-App aus dem Play Store.
2. Installieren Sie es auf Ihrem PC. `adb` (Android-Plattformtools) und USB-Debugging auf dem Gerät aktivieren, dann die Verbindung überprüfen:
   - `adb devices` (Ihr Gerät muss aufgeführt sein)
3. Ermitteln Sie die genauen Paketpfade (verwenden Sie `com.zeekr.overseas` für EU-Konten `com.zeekr.global` ansonsten):
   - `adb shell pm path com.zeekr.overseas`
4. Ziehen Sie genau diese beiden Dateien (die `arm64_v8a` Aufteilung ist obligatorisch —`xxhdpi` oder Sprachtrennungen funktionieren **nicht** ):
   - `adb pull /data/app/<...>/base.apk base.apk`
   - `adb pull /data/app/<...>/split_config.arm64_v8a.apk arm64.apk`
5. Laden Sie die beiden Dateien von Ihrem PC hoch: Klicken Sie in den Adaptereinstellungen (Registerkarte „Zugriff“) auf „APKs von diesem PC hochladen“ und wählen Sie die entsprechende Option aus. `base.apk` plus die ARM64 Split-APK. Die Extraktion startet automatisch; anschließend muss die Instanz neu gestartet werden, damit das Polling mit den neuen Geheimnissen beginnt. (Alternativ können die Dateien an einem beliebigen Ort abgelegt werden.) `iobroker` Der Benutzer kann die Pfade lesen und eingeben in `apkBasePath` /`apkArm64Path`.)
6. Satz `extractRegion` in die Region, die zu Ihrem Zeekr-Konto passt (`EU` für `com.zeekr.overseas`, ansonsten `EM`, `SEA`, oder `CN`).
7. Bitte überprüfen Sie dies mit dem `testConnection` Nachricht (oder prüfen) `info.connection` Bei erfolgreicher Eingabe ist der Vorgang abgeschlossen. Informationen zu fehlenden Tasten finden Sie weiter unten.

### App 3.1.0 und neuer (KiwiVM)

In App 3.1.0 und neueren Versionen ist die statische Extraktion stark eingeschränkt: Die HMAC-Schlüssel können nicht statisch wiederhergestellt werden (KiwiVM-Verschleierung, Upstream-Problem Nr. 14), und VIN-Schlüssel/IV plus `prod_secret` sind nur zur Laufzeit verfügbar (iWall). Falls beim Extrahieren fehlende Schlüssel gemeldet werden, stellen Sie bitte ein **älteres APK-Paar** (z. B. eine ausländische Version 3.0.x) über die Upload-Seite bereit. `apkOldBasePath` /`apkOldArm64Path` — Fehlende Geheimnisse werden automatisch daraus aufgefüllt (überprüfen mit `testConnection` (Die Schlüssel können je nach Version variieren). Alles, was übrig bleibt, muss aus einem Frida-Dump stammen:

### Laufzeitschlüssel über Frida (Schritt für Schritt, einmalige Aufgabe)

> **Für App 2.x nicht erforderlich:** Ausländische 2.x-APKs (z. B. 2.9.9) enthalten weiterhin alle Schlüssel statisch – laden Sie einfach das Schlüsselpaar hoch, und fertig. Kein Frida, kein Root, kein zweites Gerät nötig. Die folgenden Schritte gelten nur für App 3.1.0+, da die statische Extraktion hier nicht alle Daten wiederherstellen kann.

`prod_secret`, `vin_key` Und `vin_iv` existieren nur innerhalb der laufenden App (iWall/`libiwallca.so` Daher können sie von keinem statischen Tool gelesen werden. Sie werden einmalig von einem gerooteten Gerät ausgelesen; danach wird das gerootete Gerät nicht mehr benötigt. Basierend auf [mescon/zeekr-7x-home-assistant](https://github.com/mescon/zeekr-7x-home-assistant) (Schnellstart- und Emulator-Anleitungen).

**Sie benötigen:** ein gerootetes arm64-Android-Gerät (ein günstiges gebrauchtes Smartphone mit Magisk oder einen gerooteten Emulator – siehe unten), einen PC mit Python +`adb` und ein zweites Zeekr-Konto, auf dem das Auto geteilt wird (erstellen/teilen Sie es in Ihrer normalen App; verwenden Sie niemals Ihr tägliches Konto für die Extraktion).

1. **Emulator (falls kein Ersatztelefon vorhanden):** Android Studio → Geräte-Manager → Pixel-Telefon → **arm64-v8a** , API 33/34, **Google APIs-** Image (enthält Play-Dienste und ist rootbar; das **Google Play-** Image kann nicht gerootet werden). Einmal starten. Rooten mit [rootAVD](https://github.com/newbit1/rootAVD) . `git clone https://github.com/newbit1/rootAVD && cd rootAVD && ./rootAVD.sh ListAllAVDs`, Dann `./rootAVD.sh <that/ramdisk.img path>`. Bestätigen Sie den Root-Zugriff in der Magisk-App (`adb root` Allein reicht das nicht aus. Verwenden Sie auf Intel/AMD-PCs stattdessen ein x86\_64-Image – falls die App beim Anmelden abstürzt (ARM-Übersetzung vs. White-Box-Kryptografie), greifen Sie auf ein physisches ARM-Telefon zurück.
2. **Frida 16.x (nicht 17 – Version 17 entfernte die Java-Brücke):** auf dem PC `pip install "frida-tools==16.7.19"`. Herunterladen `frida-server-16.7.19-android-<arch>.xz` Aus [Frida-Releases](https://github.com/frida/frida/releases) (die Architektur entspricht dem **Gerät** : arm64 oder x86\_64 für einen Intel-Emulator) entpacken und hochladen:
   - `adb push frida-server-16.7.19-android-<arch> /data/local/tmp/frida-server`
   - `adb shell "su -c 'chmod 755 /data/local/tmp/frida-server && /data/local/tmp/frida-server &'"`
   - überprüfen mit `frida-ps -U` (Prozesse müssen aufgelistet werden).
   - **Hinweis zu App 3.1.0:** Die App erkennt einen laufenden Frida-Server und weigert sich zu starten. Lösung: Benennen Sie die Binärdatei in einen neutralen Namen um (nicht in „Frida“). `frida-server`), auf einem benutzerdefinierten Port lauschen (`/data/local/tmp/<name> -l 127.0.0.1:<port>` Richten Sie die Tools darauf aus) und setzen Sie die Zeekr-App auf die Magisk-Sperrliste (Shamiko). Falls sie weiterhin fehlschlägt, verwenden Sie `frida-gadget` (`objection patchapk`) anstelle eines Servers – dann gibt es keinen Serverprozess zu erkennen.
3. **Installieren Sie die Zeekr-App** (`com.zeekr.overseas`, aktuelle **Version 3.0.x** von [APKPure](https://apkpure.com/zeekr/com.zeekr.overseas) — die `.xapk` ist eine ZIP-Datei: entpacken, dann `adb install-multiple base.apk split_config.arm64_v8a.apk split_config.xxhdpi.apk` Öffnen Sie die App und **melden Sie sich mit dem zweiten Konto an** – die Werte existieren erst nach der ersten signierten Anfrage; das bloße Öffnen der App reicht nicht aus.
4. **Schlüssel auslesen:**
   - `git clone https://github.com/mescon/zeekr-7x-home-assistant && cd zeekr-7x-home-assistant/tools`
   - `bash check.sh` (Bestätigt Frida + Gerät + laufende App; die App wird angezeigt al&#x73;** `ZEEKR` ** )
   - `python3 extract_runtime_keys.py` — Drucke `prod_secret`, `vin_key`, `vin_iv` Die
   - Wenn gemeldet wird, dass der Getter fehlgeschlagen ist (in einem neueren Build wurden die Klassen verschoben): `jadx` die Basis-APK, öffnen `xn/a.java` Kopieren Sie die drei Base64-Strings der Felder. `c` (`prod_secret`), `a` (`vin_key`), `l` (`vin_iv`) in die `PROD` /`VKEY` /`VIV` Platzhalter in `tools/dump.js` und erneut ausführen.
5. **In den Adapter:** Fügen Sie die drei Werte in die Registerkarte „Schlüssel“ ein (`prodSecret`, `vinKey`, `vinIv`) — oder speichern `{"prod_secret": "...", "vin_key": "...", "vin_iv": "..."}` als JSON und setzen `runtimeSecretsJsonPath`. Überprüfen Sie mit `testConnection` Die
6. **Bereinigung:** Deinstallieren Sie die App vom Extraktionsgerät (andernfalls konkurrieren zwei Sitzungen um das zweite Konto) und beenden/entfernen Sie sie. `frida-server` Die

### Alternative: Verwendung einer geheimen JSON-Datei

Wenn Sie bereits einen besitzen `zeekr_secrets.json` Im Extractor können Sie den APK-Schritt komplett überspringen und den absoluten Pfad angeben. `secretsJsonPath` Die

Dadurch entfällt die Notwendigkeit, die sechs Geheimnisse manuell in die Admin-Seite zu kopieren, sobald die APKs oder die JSON-Datei auf dem Host verfügbar sind.

### Sicherung und Wiederherstellung von Geheimnissen

Geschützte Konfigurationswerte (`password` HMAC-Schlüssel, Produktionsgeheimnis, VIN-Schlüssel) werden im Adminbereich nie angezeigt – ioBroker blendet sie absichtlich aus. Die Anwesenheit ist ohne Werte sichtbar:

- Staaten `zeekr.0.info.secretsPresent.*` (`true` /`false` pro geheimer Gruppe),
- Die `Credentials:` Zeile im Adapterprotokoll beim Start.

Um die Geheimnisse außerhalb von ioBroker zu sichern (Migration, Neuinstallation, Aufbewahrung):

1. Öffne die APK-Seite (`Upload APKs from this PC`), Abschnitt 4: **Sicherung der Geheimnisse exportieren** .
2. Die Sicherungskopie wird direkt auf Ihren PC heruntergeladen als `zeekr-secrets-backup.json` und wird zusätzlich auf dem Host gespeichert (Standard: `secrets-backup.json` im Instanzdatenordner, z.B. `/opt/iobroker/iobroker-data/zeekr.0/`, konfigurierbar über `secretsBackupPath` **Die Datei ist im Klartextformat** – bewahren Sie sie sicher auf und löschen Sie sie vom Host, wenn sie nicht mehr benötigt wird.
3. Die **Funktion „Geheimnisse importieren“** liest die Sicherung ein: Wählen Sie die Datei auf Ihrem PC aus (kein Hostzugriff erforderlich) oder lassen Sie das Auswahlfeld leer, um die Hostdatei zu verwenden (z. B. nach einer Instanzverschiebung). Starten Sie die Instanz anschließend neu.

Hochgeladene APKs befinden sich im selben Instanzdatenordner (`apks/` Unterverzeichnis) und überstehen Adapteraktualisierungen und Neustarts (früher befanden sie sich im temporären Verzeichnis des Containers – falls Ihre Dateien nach dieser Änderung fehlen, laden Sie sie bitte erneut hoch).

Die Sicherungsdatei wird nie gespeichert (siehe `.gitignore`) und wird vom Adapter niemals irgendwo hochgeladen.

Der Adapter speichert außerdem bei jedem Start automatisch die Sicherungsdatei (sofern Geheimnisse vorhanden sind) und füllt Lücken anhand dieser auf: Bei einer Neuinstallation des Adapters wird das Instanzobjekt überschrieben und die vom Adapter gespeicherten Geheimnisse werden gelöscht (sichtbar als `from: system.host.iobroker.cli` (mit leeren Werten) – beim nächsten Start werden diese automatisch wiederhergestellt. Nur leere Felder werden jemals neu befüllt; um Geheimnisse endgültig zu löschen, löschen Sie auch die Sicherungsdatei.

## Konfiguration

Der Adapter stellt die folgenden Konfigurationsfelder bereit:

- `username`
- `password`
- `countryCode`
- `hmacAccessKey`
- `hmacSecretKey`
- `passwordPublicKey`
- `prodSecret`
- `vinKey`
- `vinIv`
- `pollingInterval`
- `drivePollingInterval` (Sekunden, Minuten 30 — schnelle Umfrage während der Fahrt)
- `storeTripPositions` (Boolescher Wert, optional: Start-/Endkoordinaten im eigenen Logbuch, gerundet; standardmäßig deaktiviert)
- `zonesJson` (optionale Liste wie `[{"name":"Office","lat":52.5,"lon":13.4,"radiusM":200}]` — dargestellt als `zones.currentZone`)
- `tariffsJson` (Optionale Gebühren-/Zeittarife für die Sitzungspreise, siehe „Energie“ unten)
- `homeLat` /`homeLon` /`homeRadiusM` (Heimzone für `isHome` und Tarifanpassung)
- `batteryCapacityKwh` (Standardwert 100 – geben Sie Ihre tatsächliche Nettokapazität an), `chargingEfficiencyPct` (Standardwert 88), `defaultPricePerKwh` (Standardwert 0,3)
- `smartChargeEnabled`, `smartChargeDeparture` (im günstigsten Zeitfenster vor Abflug laden)
- `vehicleFilter`
- `vehicleModel` (optional, wird angezeigt als `details.model` (Die API gibt keinen Modellnamen an.)
- `abrpEnabled`, `abrpApiKey`, `abrpUserTokens` (siehe „ABRP-Upload“ weiter unten)
- `mockMode` (Boolescher Wert, Verbindungstest ohne echtes Konto)
- `alertWebhook` (optional, Fehlermeldungen)
- `pythonBinary` (optional)
- `autoExtractSecrets` (boolesch)
- `apkBasePath` /`apkArm64Path` (optional)
- `secretsJsonPath` (optional)
- `secretsBackupPath` (optional, leer =`secrets-backup.json` (im Instanzdatenordner)
- `extractRegion`
- `debug` (boolesch)

### Kompromisse beim gemeinsamen Konto

Die Verwendung eines zweiten (gemeinsamen) Kontos für den Adapter vermeidet Sitzungskonflikte (079021) mit der App – empfehlenswert. Der Server beschränkt jedoch einige Endpunkte auf das Inhaberkonto. Konkret:

| Funktion                                                         | Eigentümerkonto | Gemeinsames (2.) Konto                                                                     |
| ---------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------ |
| Live-Status, SoC, GPS, Kilometerzähler, Ladezustand              | Ja              | Ja                                                                                         |
| Aufladen/Tarife/Fernsteuerung                                    | Ja              | Ja                                                                                         |
| API-Reiseprotokoll (`trips.*`, Trackpunkte, `ms-vehicle-trail`) | Ja              | **Nein** – bleibt leer/`total: 0` (`trips.fetchJson` selbst wenn die App Laufwerke anzeigt |
| Eigenes Logbuch (`trips.own*` (Adapterseite)                     | Ja              | Ja                                                                                         |
| Sitzungen aufladen (`energy.*` (Adapterseite)                    | Ja              | Ja                                                                                         |

Wenn `trips.count` Wenn die Anzahl der angezeigten Laufwerke 0 bleibt, ist dies wahrscheinlich die Ursache (Endpunkt nur für Besitzer), kein Zuordnungsfehler.

## Datenpunkte

Der Adapter erstellt für jedes erkannte Fahrzeug einen Fahrzeugkanal mit den folgenden Unterkanälen:

- `status`: Batterie, Reichweite, Kilometerzähler, Ladeleistung, Geschwindigkeit, Steckerstatus, Ladestatus, Verriegelungsstatus, Klimastatus, Ladegrenze, Reifendruck, GPS, 12-V-Batterie, Zentralverriegelung, Tür-/Kofferraumstatus, Verbrauch, Motor-/Wartungsstatus und Zeitstempel
- `control`: Befehlsnutzlast, Dienst-ID, Senden-Taste, gedrückte Tasten (Sperren, Klima, Laden, Fenster, Sonnenschutz, Licht), beschreibbares Ladelimit, Klimatemperatur/-dauer, Eingaben für Lade-/Reiseplan, letzter Befehl und letztes Ergebnis
- `trips`: API-Fahrtenanzahl, Entfernung/Start/Ende/Dauer/Durchschnittsgeschwindigkeit/Verbrauch der letzten Fahrt, Liste der letzten Fahrten (Fahrtenbuch, die letzten 5 ohne Koordinaten), Status abrufen (`trips.fetchJson`: ok/total/payload-Schlüssel – leer, wenn der Server nichts sendet, z. B. bei gemeinsam genutzten Konten (siehe oben), plus das unten stehende Adapter-seitige Protokoll.
- `energy`: letzte Sitzung, laufende Monatssummen, Standby-Verbrauch, Tages-/Wochensummen, Ladesitzungsverlauf (`sessionsList`), Eingaben zur Preisüberschreibung pro Sitzung (`nextSessionPrice` /`nextSessionName`, automatischer Rücksetzvorgang nach dem Einschwingen), gemessene Energiezufuhr (`nextSessionKwh`), rückwirkende Korrektureingaben (`editSessionKwh` /`editSessionPrice` /`editSessionCost` /`editSessionTariff`), monatliche Kostenaufteilung nach Tarif (`monthByTariff`)
- `smartCharge` Entscheidungszustand für das günstigste Fenster
- `zones`: aktuelle benannte Geozone (`currentZone` und Zeitpunkt des letzten Wechsels; `isHome` spiegelt die konfigurierte Heimzone wider
- `batteryLog`: monatliche Momentaufnahmen von Kilometerzähler/Reichweite/SoC
- `raw`: Rohdaten von der Brücke
- `details`: zusätzliche Metadaten; `details.model` zeigt das konfigurierte Fahrzeugmodell (Registerkarte „Erweitert“) an, da die API keinen Modellnamen bereitstellt.

Die Abstimmung ist adaptiv: Fahrende Fahrzeuge nutzen `drivePollingInterval` (Standardmäßig 30 Sekunden, minimal 30 Sekunden, mit Hysterese, um kurze Stopps zu vermeiden). Ladende Fahrzeuge fragen alle 60 Sekunden ab, Fahrzeuge im Leerlauf im konfigurierten Intervall. Der Alarm-Webhook (ratenbegrenzt, 15 Minuten Abklingzeit, flankengesteuert) wird ausgelöst bei unerwarteten Ladestopps, abgeschlossenen Ladevorgängen, neu geöffneten Türen/Deckeln, fälliger Wartung (≤ 30 Tage oder ≤ 2000 km), Reifendruckwarnungen und niedrigem 12-V-Batteriestand (< 12,0 V).

### Eigenes Fahrtenbuch (funktioniert mit jedem Konto)

Das API-Protokoll ist nur für den Besitzer zugänglich, daher führt der Adapter sein eigenes Protokollbuch anhand der Abfragedaten (`trips.own*`) — unabhängig von `trips.*`:

- Reisebeginn bei Bewegung (`currentSpeed > 0` Fahrten mit laufendem Motor oder einem Kilometerzählersprung von ≥ 0,1 km werden nach drei geparkten Haltestellen beendet. Fahrten mit laufendem Motor im Leerlauf ohne zurückgelegte Strecke (< 0,2 km) werden verworfen und nicht protokolliert.
- `trips.ownList` (letzte 20), `trips.ownCount`, letzte Fahrtstrecke/Start/Ziel/Dauer/Durchschnittsgeschwindigkeit/Verbrauch/Energie/Kosten, `trips.ownMonthKm` /`trips.ownMonthCount` /`trips.ownMonthUsedKwh` /`trips.ownMonthCost` Monatlicher Verbrauch und Kosten pro 100 km. Bleibt auch nach Neustarts erhalten (Instanzdatenverzeichnis).
- Standardmäßig keine Koordinaten; aktivieren `storeTripPositions` um auch gerundete Start-/Endpositionen zu speichern.
- Verbrauch/Energie stammen aus SoC-Delta ×`batteryCapacityKwh` — Stellen Sie Ihre tatsächliche Nettokapazität ein (z. B. 100 kWh für das 100-kWh-Paket, weniger für kleinere Pakete), andernfalls sind die Energiewerte falsch.

### Anzeige in VIS (und anderen Visualisierungen)

Alle Anzeigewerte sind einfache Zustände – es werden keine VIS-Widgets mitgeliefert (der Adapter bleibt ansichtsunabhängig):

- **Heute/Woche im Überblick:** `energy.todayKwh` /`todayCost` /`todayLossKwh`, `energy.weekKwh` /`weekCost`, `trips.ownTodayKm` /`ownTodayCount`, `trips.ownWeekKm` Einzelne Zahlen, ideal für Info-Widgets oder ECharts-Balken.
- **Monat:** `energy.monthKwh` /`monthCost` /`monthLossKwh`, `trips.ownMonthKm` /`ownMonthCount` /`ownMonthUsedKwh` /`ownMonthCost`, `trips.ownMonthConsumptionKwh100km`, `trips.ownMonthCostPer100km` Die
- **Tabellen:** `trips.ownList` Und `energy.sessionsList` Es handelt sich um JSON-Arrays (die letzten 20) für Tabellen-Widgets (z. B. die Tabelle „vis-inventwo“, Jarvis- oder ECharts-Datensätze). Reiseeinträge enthalten Start-/Endpunkt, Entfernung, Dauer, Energie, Verbrauch und Kosten; Sitzungen enthalten kWh, Kosten, Tarif und Preis. `energy.monthByTariff` Gibt den aktuellen Monat pro Anbieter als JSON-Objekt an.
- **Verlauf:** Protokoll `status.batteryLevel`, `all.chargePower`, `status.isCharging`, `status.pluggedIn` (bei Standardinstallationen bereits historienfähig) für Ladekurven; `status.batterySoh` erscheint, sobald die API einen plausiblen Wert liefert (0 = nicht unterstützt, wird als leer angezeigt).
- **CSV-Export:** Die APK-Seite („6. Logbuch-CSV herunterladen“) lädt herunter `zeekr-trips.csv` +`zeekr-sessions.csv` Für Tabellenkalkulationen – gleicher Inhalt wie die JSON-Listen, durch Semikolon getrennt.

## Energie, Kosten und intelligentes Laden

Jedes Fahrzeug verfügt über ein `energy` Kanal:

- `sessionKwh` /`sessionCost` /`sessionTariff` /`sessionLossKwh`: letzte abgeschlossene Ladesitzung. Die Energie auf der Ladegerätseite umfasst den Batteriegewinn **zuzüglich der Verluste** (`charger = max(integrated power, gain / efficiency)`).
- `monthKwh` /`monthCost` /`monthLossKwh`: Monatliche Gesamtsummen (bleiben auch nach Neustarts erhalten, werden jeden Monat zurückgesetzt).
- `standbyMonthKwh`/`standbyMonthCost`: Standby-Verbrauch im geparkten Zustand, berechnet zum Standardtarif.
- `lastSession`: vollständige Details als JSON.

Zölle in der `tariffsJson` Die Konfiguration legt den Preis pro Sitzung je nach **Standort und Zeit** fest, z. B. den Nachttarif zu Hause im Vergleich zu öffentlichen Ladestationen:

```json
[{"name":"home-night","lat":52.52,"lon":13.405,"radiusM":200,"pricePerKwh":0.25,"from":"22:00","to":"06:00"}]
```

Einträge ohne Ortsangabe passen überall; Einträge ohne `from` /`to` Jederzeit ein Match möglich. Ohne Match gilt der Standardpreis. Festlegen `batteryCapacityKwh` (Standardwert 100) und `chargingEfficiencyPct` (Standardwert 88) für korrekte Verlustberechnung.

Für einmalige Roaming-Preise schreiben Sie `energy.nextSessionPrice` (€/kWh) und optional `energy.nextSessionName` vor/während der Abbuchung (VIS, Skript oder Admin): Die nächste Abrechnung verwendet die Überschreibung anstelle des Geotarifs/Standardtarifs und setzt alle drei Überschreibungszustände zurück (`nextSessionPrice`, `nextSessionName`, `nextSessionKwh` Anschließend wird der verwendete Preis pro Sitzung gespeichert. `lastSession` /`sessionsList` Die

Gemessene Werte sind besser als geschätzte: Wenn Sie den gemessenen kWh-Wert an einer öffentlichen Ladestation (oder später auf der Rechnung) ablesen, notieren Sie ihn. `energy.nextSessionKwh` — Der Rechner nutzt diese Energie als Ladeenergie anstelle des rekonstruierten Wertes (Verluste werden, sofern verfügbar, aus dem gespeicherten Batteriegewinn neu berechnet). Ohne diese Energie integriert der Adapter die Ladeleistung über mehrere Abfragen oder greift auf den SoC-Gewinn ÷ Wirkungsgrad zurück.

Korrekturen im Nachhinein (der Normalfall unterwegs – ioBroker ist an der Ladestation nicht verfügbar, und öffentliche Ladestationen stellen die Rechnung oft später per App aus): die Rechnungswerte schreiben nach `energy.editSessionKwh` /`energy.editSessionPrice` /`energy.editSessionCost` (Rechnungssumme gewinnt und leitet den Einzelpreis ab) /`energy.editSessionTariff` Der Adapter wendet die Änderungen auf die letzte Sitzung an und berechnet die Historie, die Tages- und Monatssummen neu. Anschließend werden die Bearbeitungsstatus zurückgesetzt. Sitzungen aus abgeschlossenen Monaten aktualisieren nur die Historie.

`energy.monthByTariff` Aufschlüsselung des aktuellen Monats nach Tarif/Anbieter (`{"EnBW": {"kWh": …, "cost": …}}`) — die Roaming-Übersicht ohne Tabellenkalkulation.

Robustheitsregeln: Eine Sitzung wird erst nach zwei aufeinanderfolgenden Leerlaufabfragen stabilisiert (um zu verhindern, dass einzelne veraltete Abfragen eine Ladung in Fragmente aufteilen) und nur im angeschlossenen Zustand – SoC-Sprünge ohne Kabel führen niemals zu Sitzungen. Fragmente, die weniger als 15 Minuten auseinanderliegen, werden wieder zu einem Sitzungsdatensatz zusammengeführt (die Summen bleiben exakt). Die Monatssummen werden automatisch zurückgesetzt, wenn der Kalendermonat wechselt.

`isHome` spiegelt die konfigurierte Heimzone wider. `smartChargeEnabled` und einer Abfahrtszeit, der Adapter startet/pausiert den Ladevorgang über `RCS` Der Wagen lädt also im günstigsten passenden Zeitfenster vor der Abfahrt (`smartCharge.state` Shows `charge` /`wait` /`idle`).

## ABRP-Upload

Der Adapter kann den Akkuladestand (sowie Position, Geschwindigkeit und Reichweite, sofern bekannt) nach jeder Abfrage an [A Better Routeplanner](https://abetterrouteplanner.com) senden, indem er den Iternio-Telemetrie-Endpunkt verwendet. `https://api.iternio.com/1/tlm/send` Die

### Schrittweise Einrichtung

1. ABRP-App: Erstellen Sie ein Benutzertoken pro Fahrzeug (Einstellungen → Live-Daten → Allgemein). Kopieren Sie das Token.
2. Browser: öffnen `abetterrouteplanner.com/resources/api` → „Telemetrie-API-Schlüssel verwalten“ → Erstellen Sie einen kostenlosen Telemetrieschlüssel. Kopieren Sie den Schlüssel.
3. ioBroker-Admin → Instanzen →`zeekr.0` → ABRP-Registerkarte:
   - „ABRP-Upload aktivieren“ aktivieren.
   - „ABRP API-Schlüssel“: Fügen Sie den Telemetrieschlüssel aus Schritt 2 ein.
   - „Benutzertoken aus der ABRP-App“: Fügen Sie exakt das Token aus Schritt 1 ein – sonst nichts, keine Fahrgestellnummer (der Adapter kennt seine Fahrzeuge). Nur bei mehreren Fahrzeugen verwenden Sie stattdessen eine Zuordnung pro Fahrgestellnummer. `{"VIN": "token", ...}` Die
   - Speichern. Beide Schlüssel landen in `protectedNative` (niemals in Zuständen oder Protokollen).
4. Warten Sie auf die nächste Abfrage (maximal ein Abfrageintervall) oder lösen Sie einen sofortigen Upload aus. `sendAbrpTelemetry` Nachricht an `zeekr.0` Die
5. Verifizieren: `info.abrpLastSend` zeigt Zeitstempel, Fahrzeugidentifikationsnummer (VIN) und SoC an; `info.abrpLastResult` zeigt die Serverantwort an (`{"status":"ok",...}` - A `missing: ...` Hinweis listet nur optionale Felder auf und ist normal); `info.abrpLastError` muss leer bleiben.

### Fehlerbehebung

- NEIN `abrpLast*` Es werden keine Zustände angezeigt: Upload deaktiviert, API-Schlüssel leer oder das Token-Feld ist kein gültiges JSON / enthält keinen Eintrag für diese VIN – der Adapter überspringt dann stillschweigend (nur Debug-Protokoll).
- Serverfehler oder HTTP 401: API-Schlüssel oder Benutzertoken falsch – erstellen Sie beide neu und fügen Sie sie erneut ein.
- ABRP zeigt veraltete Daten an: Telemetriedaten, die älter als einige Minuten sind, gelten als veraltet; während der Fahrt fragt der Adapter alle paar Minuten ab. `drivePollingInterval` (Standardeinstellung 30 Sekunden) automatisch.
- Datenschutz: Wenn diese Option aktiviert ist, werden SoC, Position und Geschwindigkeit bei jeder Abfrage an die ABRP-Cloud übermittelt.

Details zur gesendeten Nutzlast: `utc`, `soc`, `power` (negativ beim Laden), `speed`, `lat` /`lon`, `is_charging`, `is_parked`, `odometer`, `est_battery_range`, `capacity` Diagnose mittels `info.abrpLastSend`, `info.abrpLastResult`, `info.abrpLastError`; A `sendAbrpTelemetry` Die Nachricht löst einen sofortigen Upload aus.

## Empfehlung für die Geschichte

Diese Zustände sollten in InfluxDB/SQL protokolliert werden, um Diagramme und Langzeitstatistiken zu erstellen: `status.batteryLevel`, `status.rangeKm`, `status.odometerKm`, `status.chargePower`, `status.isCharging`, `status.pluggedIn`, `energy.monthKwh`, `energy.monthCost`, `trips.ownTodayKm`, `trips.count`, `status.batterySoh` (sobald die API es liefert).

Der Adapter stellt außerdem Root-Zustände bereit unter `info` für Verbindungsstatus, Integrität, Fehler, Protokolle und das letzte erfolgreiche Update.

## Befehle

Der Adapter nimmt ein leichtes `sendCommand` Nachricht mit:

- `vin`: Zielfahrzeug-VIN
- `command`: Fernsteuerungsbefehl (zum Beispiel `start` oder `stop` (abhängig von der Zielaktion)
- `serviceId`: Zeekr-Dienstkennung (zum Beispiel `RCS` (z. B. zur Ladekontrolle oder für andere Fernsteuerungsdienste)
- `setting`: Payload-Objekt, das an die Zeekr-API weitergeleitet wurde

Der Befehl wird über die Python-Brücke geleitet und an den zugrunde liegenden Prozess weitergeleitet. `zeekr_ev_api` Kunde.

Beschreibbare Steuerelementzustände reagieren auf direkte Schreibvorgänge: Setzen Sie einen Schaltflächenzustand (zum Beispiel `vehicles.<id>.control.lock`) Zu `true` mit `ack: false` von der Admin-Oberfläche, Vis, Blockly (`setState`) oder Skripten, und der Adapter führt den Befehl aus und setzt die Schaltfläche zurück. Direkte Status-Schreibvorgänge und `sendTo(instance, 'stateChange', { id, value })` Nachrichten teilen sich denselben Handler.

### Experimentelle Befehle (Borconi/Openzeekr-Forschung)

Zusätzliche Schaltflächen mit der Aufschrift `(experimental)` Die folgenden Funktionen stammen aus einer Studie von Smali in [borconi/openzeekr](https://github.com/borconi/openzeekr) und sind **noch nicht verifiziert** : Kofferraum/Vorderkofferraum, Ladeklappe, Entfroster, Schiebedach, Wächtermodus, Fernstart/-stopp des Motors, Weckfunktion, Batterievorwärmung, Sitz-/Lenkradheizung, Kühlschrank, Kabinenlüftung. Es werden lediglich neue Funktionen hinzugefügt; bewährte Standardeinstellungen bleiben unverändert.

Seit dem letzten Update bestätigt (openzeekr hat nun die gleichen Werte, Konflikte wurden behoben):

- Fenster/Sonnenschutz: `RWS` + Kleinbuchstabenziele (`window`, `ventilate`, `sunshade`, `sunroof`) — unsere Werte waren korrekt
- Kofferraum entriegeln: `start` /`RDU` /`target=trunk` (Upstream #162, live getestet auf 7X — unser `stop` korrigiert)
- Klima/Komfort: einheitlich `ZAF` Service (`AC`, `DF`, `SH.11`, `SW`) — unsere Werte waren korrekt
- Blinken/Hupen: Kleinbuchstaben `rhl` Schlüssel – unsere Werte waren korrekt

Bekannte Einschränkungen:

- elektrisch betriebene Heckklappenöffnung/-schließung (`RDU_2` /`RDL_2`) benötigen den Ecarx Telematik-Transport (`PUT /remote-control/vehicle/telematics/{vin}`), die die `zeekr_ev_api` Der Client spricht nicht – erwarten Sie über diesen Adapter keine Wirkung. Einfache Kofferraumentriegelung (`RDU`) verwendet den Standardtransport.
- Der Wächtermodus benötigt die Kleinschreibung `rsm` Schlüssel (Großbuchstaben werden vom Fahrzeug ignoriert). Das Fahrzeug muss außerdem für Sentry-on **verriegelt** sein (openzeekr #41: Entriegelt = stille Funktion trotz Cloud 200) – der Adapter verweigert dies. `sentryOn` während es positiv entsperrt wurde und es meldet in `control.lastResult` Die
- Für die Befehle Handschuhfach/Besucherfenster/Schließfach ist eine physische PIN erforderlich (`0000` Platzhalter) und werden absichtlich **nicht** als Ein-Klick-Schaltflächen angezeigt.
- Ladestrom (`control.chargeCurrent`, 6–32 A über `RCS` /`rcs.ac.current`) ist experimentell.

### Live-A/B-Test-Checkliste (für das reale Auto)

Für jedes offene Paar soll die aufgelistete Variante ausprobiert und gemeldet werden, ob das Auto sie ausführt (prüfen). `control.lastResult` plus das Auto selbst):

1. Kofferraum entriegeln: `start` /`RDU` /`target=trunk`
2. Frunk: `start` /`RDU` /`target=hood`
3. Batterievorwärmung: `start` /`ZAN`
4. Ladestrom 16 A: `start` /`RCS` /`rcs.ac.current=16`

## Veröffentlichung und Wartung

- Das Repository beinhaltet GitHub Actions für CI und die Erstellung von Releases.
- Veröffentlichungen werden automatisiert mit `release-please` Die Veröffentlichung eines Releases löst den Asset-Build-Workflow aus.
- Der Release-Workflow erstellt automatisch ein Tar-Archiv und hängt es an das GitHub-Release an.
- npm-Veröffentlichung benötigt kein lokales Token: Pushen eines Versions-Tags (`vX.Y.Z`) führt den Test-and-Release-Bereitstellungsjob aus, der über Trusted Publishing auf npm veröffentlicht. Niemals `npm publish` Tokens sollten niemals manuell übertragen werden.
- `common.news` Es werden maximal 7 Einträge gespeichert (Repository-Bot kürzt, E1032): Bei der Veröffentlichung werden die ältesten Einträge gelöscht – die vollständige Historie bleibt im unten stehenden Änderungsprotokoll erhalten.
- Ein geplanter Upstream-Synchronisierungs-Workflow prüft das Referenz-Repository auf neue Commits und öffnet ein Tracking-Ticket, wenn Änderungen festgestellt werden.

## Roadmap

- [x] Erweiterte Datenpunkte (VTM/Reifendruck/GPS/12V, Ladegrenze, Lade-/Reisepläne, kürzlich durchgeführte Fahrten)
- [x] Tastensteuerung (Verriegeln/Entriegeln, Klimastart/Stopp, Ladestart/Stopp über RCS, Lade-/Reiseplan)
- [x] Live-Validierung ohne Konto (Testmodus +`testConnection` Nachricht)
- [x] Fahrtenbuch mit Fahrtenkostenanzeige (funktioniert mit gemeinsam genutzten Konten)
- [x] Gebührensitzungsauswertung mit Roaming-Tarifen und Tages-/Wochen-/Monatsaggregaten
- [x] Benachrichtigungen (Ladevorgang abgeschlossen/unterbrochen, Service, Reifen, 12 V) und benannte Geozonen
- [ ] Live-Validierung anhand eines realen Kontos (Überprüfung der Befehlsvorgaben pro Modell)
- [ ] bei Bedarf weitere Datenpunkte

## Live-Validierung mit einem echten Auto (Checkliste)

1. Schalten Sie den Testmodus aus, geben Sie Konto und Schlüssel ein und überprüfen Sie die `testConnection` Nachricht (`ok: true`).
2. Überprüfen Sie die Messwerte: Batterie, Reichweite, Türen/Kofferraum (Öffnen/Schließen testen), GPS, Ladegrenze.
3. Betätigen Sie jeden Knopf einmal und prüfen Sie, ob er funktioniert. `control.lastResult`: Verriegeln/Entriegeln, Klimastart/Stopp, Ladestart/Stopp, Fenster, Sonnenschutz, Licht/Hupe.
4. Stellen Sie das Ladelimit beispielsweise auf 80 ein und überprüfen Sie es. `status.chargingLimit` Die
5. Melden Sie die Ergebnisse als Problem (Modell, App-Version, Region), damit die Standardeinstellungen verfeinert werden können.

### Objekt-Dump zur Repository-Überprüfung

Die Objektstrukturprüfung von Repochecker akzeptiert im Stammverzeichnis nur ein einfaches JSON- **Objekt** : `{ "<id>": { "_id": "<id>", ... }, ... }` — jeder Wert muss tragen `_id` identisch mit seinem Schlüssel (ein Array oder fehlende `_id` Fehlercode E3001/E3002). Vor dem Anhängen schwärzen: Fahrzeugidentifikationsnummer (VIN, Geräte-IDs in Groß- und Kleinbuchstaben), E-Mail-Adresse des Kontos (`username`), Heimatkoordinaten (`homeLat` /`homeLon` und alle `protectedNative` geheime Werte (Passwort, HMAC, Produktgeheimnis, VIN-Schlüssel/IV, ABRP-Schlüssel) — nur Struktur, niemals Werte.

## Haftungsausschluss

Inoffizielles Community-Projekt. Steht in keiner Verbindung zu Zeekr oder Geely.

- Nur für den persönlichen und Bildungsgebrauch, auf eigene Gefahr.
- Der Adapter kommuniziert mit undokumentierten Zeekr-APIs und leitet Schlüssel von der offiziellen Android-App ab (siehe `wysie/zeekr_key_extractor` Reverse Engineering und die Nutzung der API können gegen die Nutzungsbedingungen von Zeekr und geltendes Recht verstoßen; bitte prüfen Sie dies vor der Nutzung.
- Niemals APKs einchecken `zeekr_secrets.json`, Anmeldeinformationen oder Token. Geheimnisse gehören in ioBroker `protectedNative`, niemals in Git, Logs oder Status (wird durch CI-Geheimnisscan erzwungen).
- In diesem Repository werden keine APKs oder Schlüssel ausgeliefert.

## Credits

- [Fryyyyy](https://github.com/Fryyyyy) für die [Zeekr EV API](https://github.com/Fryyyyy/zeekr_ev_api) und die [Zeekr Home Assistant Integration](https://github.com/Fryyyyy/zeekr_homeassistant)
- [Wysie](https://github.com/wysie) für den [Zeekr-Schlüsselextraktor](https://github.com/wysie/zeekr_key_extractor)

## Changelog

### 0.1.83

- Month totals also heal when day history already holds charges but month states read 0 (update path from versions with per-poll resets)

### 0.1.82

- Fix: charge sessions merge only with forward time gaps (no merging of out-of-order records)

### 0.1.81

- Month totals backfill from day history on updates (consistent month/session/day figures); aggregate states refresh in the same poll instead of the next one

### 0.1.80

- Charge statistics hardened: session/month states are created once and never rewritten per poll (no more resets to 0, user price overrides survive); sessions settle only after two idle polls and only while plugged in (no phantom sessions from SoC noise); fragments under 15 min merge into one session; month totals reset on calendar rollover

### 0.1.79

- VIS data layer: today/week aggregates for charging and trips, charge session history (`energy.sessionsList`), per-trip and month costs, month consumption/cost per 100 km; new alerts (service due, tyre warning, low 12V, charge finished); battery SoH state; named geo zones (`zones.currentZone`); logbook CSV export on the APK page

### 0.1.78

- Own logbook: engine-on idle without distance is discarded instead of logged (trips require 0.2 km; unknown odometer still settles after a sustained run)

### 0.1.77

- Own trip logbook (`trips.own*`): trips detected from speed/odometer/engine, restart-proof storage, monthly distance/count, optional position storage (`storeTripPositions`); works with shared accounts where the API journey log stays empty. Faster polling while driving (`drivePollingInterval`, hysteresis)

### 0.1.76

- Charge evaluation for roaming: session samples survive restarts/updates, missed short charges are reconstructed from SoC jumps, per-session price override (`energy.nextSessionPrice/Name`, auto-reset) beats geo tariffs, journey-log errors surface in `trips.fetchJson` for diagnosis

### 0.1.75

- Re-release of 0.1.74 (npm trusted-publishing retry): all admin translations completed, polling loop cleaned to a pure `setTimeout` chain (dead `setInterval` aliases removed), APK upload page backup check fixed (script syntax error)

### 0.1.74

- Review follow-up: all admin translations completed (no English duplicates left), polling loop documented and cleaned to a pure `setTimeout` chain (dead `setInterval` aliases removed), APK upload page backup check fixed (script syntax error)

### 0.1.73

- Review follow-up: no runtime code downloads (vendored `lib/get-pip.py`, pinned extractor script in `lib/extractor/` with MIT license, staged into the instance dir without git)

Older entries moved to CHANGELOG_OLD.md.

See [GitHub releases](https://github.com/solderer-de/ioBroker.zeekr/releases) for the full history. Releases are created automatically with release-please.

## License

Copyright (c) 2026 solderer-de <hagen_sc@web.de>

MIT — see [LICENSE](https://github.com/solderer-de/ioBroker.zeekr/blob/main/LICENSE). This is an unofficial community project, not affiliated with Zeekr or Geely.