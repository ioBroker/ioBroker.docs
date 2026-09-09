---
chapters: {"pages":{"en/adapterref/iobroker.elgato-key-light/README.md":{"title":{"en":"ioBroker.elgato-key-light"},"content":"en/adapterref/iobroker.elgato-key-light/README.md"},"en/adapterref/iobroker.elgato-key-light/README_DE.md":{"title":{"en":"ioBroker.elgato-key-light"},"content":"en/adapterref/iobroker.elgato-key-light/README_DE.md"},"en/adapterref/iobroker.elgato-key-light/docs/ELGATO_API.md":{"title":{"en":"Elgato local API evidence"},"content":"en/adapterref/iobroker.elgato-key-light/docs/ELGATO_API.md"},"en/adapterref/iobroker.elgato-key-light/docs/MIGRATION.md":{"title":{"en":"Migration guide"},"content":"en/adapterref/iobroker.elgato-key-light/docs/MIGRATION.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.elgato-key-light/README_DE.md
title: ioBroker.elgato-key-light
hash: xXwB5c0A48ZjwEU55F5HmC96cpGXDk2a+TLIaAWU4Bk=
---
![Logo](../../../en/adapterref/iobroker.elgato-key-light/admin/elgato-key-light.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.elgato-key-light.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.elgato-key-light.svg)
![Installationen](https://iobroker.live/badges/elgato-key-light-installed.svg)
![Stabil](https://iobroker.live/badges/elgato-key-light-stable.svg)

# ioBroker.elgato-key-light

[Englisch](/#/adapters/elgato-key-light) | Deutsch

## Hakla

Alle in diesem Projekt genannten Produkt- und Firmennamen, Logos und Marken sind Eigentum ihrer jeweiligen Rechteinhaber. Ihre Verwendung dient ausschließlich der eindeutigen Bezeichnung und bedeutet weder eine Verbindung mit noch einem Sponsoring oder eine Empfehlung durch die Rechteinhaber oder verbundene Unternehmen. Dieses private, nicht kommerzielle Projekt wird ausschließlich als Freizeitprojekt entwickelt. Elgato ist eine Marke der Corsair GmbH.

## Fehlerberichte mit Sentry

Dieser Adapter verwendet die von ioBroker bereitgestellte Sentry-Integration, um unerwartete Ausnahmen und Programmfehler automatisch an die Entwickler zu melden. Die Fehlerübermittlung steht über den js-controller seit Version 3.0 zur Verfügung und hilft dabei, andernfalls unbemerkte Fehler zu erkennen und zu beheben.

Einzelheiten zu den übermittelten Informationen und eine Anleitung zum Deaktivieren der Fehlerberichte enthält die [offizielle ioBroker-Sentry-Dokumentation](https://github.com/ioBroker/ioBroker.js-controller#error-reporting-via-iobroker-sentry) .

Mit diesem Adapter lassen sich unterstützte Elgato-WLAN-Leuchten lokal über ioBroker steuern – ohne Elgato-Cloud-Konto. Der Adapter findet Leuchten über Bonjour/mDNS oder verbindet sich mit einer manuell eingetragenen privaten IP-Adresse bzw. einem lokalen Hostnamen. Er stellt die Bedienungs- und Statusinformationen als ioBroker-Datenpunkte bereit und bietet zusätzlich ein komfortables Dashboard in der Admin-Oberfläche.

## Wofür ist der Adapter gedacht?

Der Adapter bindet Elgato-Leuchten in ioBroker ein. Dadurch können sie über die Objektansicht, Skripte, Szenen, Visualisierungen und andere ioBroker-Adapter verwendet werden. Typische Anwendungen sind:

- Studioleuchten zusammen mit einem Streaming- oder Aufnahme-Setup schalten;
- Helligkeit und Farbtemperatur abhängig von der Tageszeit einstellen;
- einen Elgato Light Strip über RGB-/HSV-Farben steuern;
- Erreichbarkeit und Zeitpunkt der nächsten Abfrage überwachen;
- Akku- und Ladestatus eines Key Light Mini anzeigen;
- Leuchten manuell über das eigene Elgato-Lights-Dashboard bedienen.

Die Kommunikation bleibt im lokalen Netzwerk. Der Adapter fragt jedes konfigurierte Gerät regelmäßig ab, veröffentlicht den aktuellen Zustand und sendet Benutzeränderungen an das Gerät. Bei fehlgeschlagenen Anfragen sorgt eine begrenzte Wiederholungs- und Backoff-Logik dafür, dass ein nicht erreichbares Netzwerk nicht unnötig belastet wird.

## Unterstützte Geräte und Funktionen

Die Bedienelemente werden aus der tatsächlichen API-Antwort erzeugt und nicht anhand eines fest codierten Produktnamens. Dadurch können kompatible Firmware-Versionen und verwandte Elgato-Leuchten alle Funktionen bereitstellen, die sie selbst melden.

| Funktion                        | Schlüssellicht / Luft / Ring | Schlüssellicht Mini | Lichtleiste |
| ------------------------------- | ---------------------------- | ------------------- | ----------- |
| Ein/Aus und Helligkeit          | Ja                           | Ja                  | Ja          |
| Farbtemperatur                  | Ja                           | Ja                  | Wenn Melden |
| Farbton, Sättigung, RGB und Hex | Wenn Melden                  | Wenn Melden         | Ja          |
| Akku- und Ladeinformationen     | Nein                         | Ja                  | Nein        |
| Studio-Modus / Akku-Bypass      | Nein                         | Wenn Melden         | Nein        |
| Identifizieren                  | Ja                           | Ja                  | Ja          |

Szenen/Effekte des Light Strip und ein Geräteneustart werden bewusst nicht angeboten, da ihr Verhalten noch nicht für alle unterstützten Hardware- und Firmware-Versionen geprüft wurde.

## Voraussetzungen

- Node.js 22.18 oder neuer
- js-controller 7.2.2 oder neuer
- Admin 7.8.23 oder neuer
- Netzwerkzugriff vom ioBroker-Host auf die Leuchten, normalerweise TCP-Port 9123
- Bonjour/mDNS über UDP-Port 5353 bei Verwendung der automatischen Suche

Elgato-Leuchte und ioBroker-Host sollten sich normalerweise im selben lokalen Netzwerk befinden. Für eine Erkennung über VLAN-Grenzen hinweg kann ein mDNS-Reflektor nötig sein. Wenn Multicast nicht verfügbar ist, kann das Gerät manuell konfiguriert werden.

## Installation und Einrichtung

1. Den Adapter installieren und eine Instanz anlegen.
2. Die Konfiguration der Instanz öffnen.
3. Mit **Scan Netzwerk** nach`_elg._tcp.local.` -Dienste suchen und die gewünschten Treffer hinzufügen. Alternativ eine private IP-Adresse oder einen`.local` -Hostnamen und Port manuell eingeben. Der Standardport der Elgato-API ist`9123` Die
4. Eine manuelle Adresse vor dem Hinzufügen mit **Test** prüfen.
5. Die konfigurierten Geräte aktivieren und die Konfiguration speichern.
6. In der Admin-Seitenleiste den Tab **Elgato Key Light** für die Live-Steuerung öffnen.

Netzwerksuchen zeigen nur verfügbare Geräte an. Fügen Sie die gewünschten Suchergebnisse ausdrücklich hinzu, damit die Geräte der vorgesehenen Adapterinstanz zugeordnet bleiben.

### Laufzeitoptionen

| Option                         |     Standard | Zweck                                                         |
| ------------------------------ | -----------: | ------------------------------------------------------------- |
| Umfragen                       |   60er Jahre | Normales Intervall zum Einlesen aktueller Gerätedaten         |
| Zeitüberschreitung der Anfrage |      3000 ms | Maximale Dauer einer einzelnen Geräteanfrage                  |
| Maximaler Rücklauf             | 300 Sekunden | Obergrenze für verzögerte Wiederholungen nach Fehlern         |
| Schreiben Sie Entprellung      |       200 ms | Schnellste Slider-Änderungen zu weniger API-Anfragen zusammen |
| Entdeckungs-Timeout            |      5000 ms | Dauer eines Bonjour-/mDNS-Suchlaufs                           |

Ein kürzeres Polling-Intervall aktualisiert Datenpunkte schneller, belastetes Netzwerk und Gerät aber stärker. Schalter und Slider im Dashboard werden optimistisch aktualisiert: Eine erfolgreiche Aktion ist sofort sichtbar, während die nächste Geräteantwort den Wert bestätigt.

## Bedienung über das Dashboard

Der Adapter-Tab zeigt für jedes Gerät der ausgewählten Instanz eine eigene Karte. Es werden nur Bedienelemente angezeigt, die das jeweilige Gerät unterstützt:

- **Power** schaltet die Leuchte ein oder aus.
- **Helligkeit** stellt die Helligkeit von 0 bis 100 Prozent ein.
- **Die Temperatur** reguliert bei unterstützten Geräten die weiße Farbtemperatur von 2900 K bis 7000 K.
- **Farbe** öffnet bei RGB-fähigen Geräten die Farbauswahl des Browsers.
- **Der Studiomodus** steuert beim Key Light Mini den Akku-Bypass, wenn die Firmware diese Einstellung meldet.
- **Identify** lässt das ausgewählte Gerät seine Identifikationsfunktion ausführen.
- Schließen **Sie** das Gerät sofort erneut an.

Die Karte zeigt außerdem Online-/Offline-Status, Antwortzeit, Firmware-Version, gegebenenfalls Akkuinformationen und einen live herunterzählenden Timer bis zur nächsten Abfrage. **Alles ein** und **alles aus** schalten alle erreichbaren Leuchten der aktuellen Adapterinstanz. **Aktualisieren** lädt die Dashboard-Daten neu; **Diagnostics** zeigt Laufzeit- und Gerätedaten für die Fehlersuche.

Beim Ändern der Farbe eines Lichtstreifens bleibt die jeweils eingestellte Helligkeit erhalten. Die Datenpunkte`hex` und`rgb` Bilden Sie jedoch die aktuell ausgegebene Farbe einschließlich Helligkeit ab. Derselbe Farbton kann daher bei 50 Prozent Helligkeit als blau sein`#000080` und bei 100 Prozent als`#0000FF` angezeigt werden.

## Steuerung über ioBroker-Datenpunkte

Jedes erfolgreich verbundene Gerät erhält ein Stammobjekt auf Basis seiner Seriennummer:

```text
elgato-key-light.<Instanz>.<Seriennummer>
```

Die meisten Geräte enthalten eine Leuchte unter`light.lights.0` . Es werden nur Datenpunkte angelegt, die das Gerät unterstützt.

| Relativer Datenpunkt         | Typ / Bereich                  | Bedeutung                                                         |
| ---------------------------- | ------------------------------ | ----------------------------------------------------------------- |
| `reachable`                  | boolesch, nur lesbar           | Gerät ist aktuell erreichbar                                      |
| `identify`                   | boolean-Taster, nur schreibbar | Geräteidentifizierung durch Schreiben von`true` Aus               |
| `info.displayName`           | Zeichenkette                   | Anzeigenamen lesen oder ändern                                    |
| `light.numberOfLights`       | Nummer, nur lesbar             | Von der API gemeldete Anzahl der Leuchtelemente                   |
| `light.lights.0.on`          | boolescher Wert                | Ein- oder ausschalten                                             |
| `light.lights.0.brightness`  | Zahl, 0–100 %                  | Helligkeit einstellen                                             |
| `light.lights.0.temperature` | Nummer, 2900–7000 K            | Weiße Farbtemperatur einstellen                                   |
| `light.lights.0.hue`         | Nummer, 0–360°                 | Farbton einstellen                                                |
| `light.lights.0.saturation`  | Zahl, 0–100 %                  | Farbsättigung einstellen                                          |
| `light.lights.0.hex`         | Zeichenkette                   | Farbe als`#RRGGBB` einstellen                                     |
| `light.lights.0.rgb`         | Zeichenkette                   | Farbe im bisherigen`R,G,B` -Format setzen, zum Beispiel `255,0,0` |
| `battery.level`              | Zahl, 0–100 %, nur lesbar      | Akkustand eines Key Light Mini                                    |
| `battery.status`             | string, nur lesbar             | Vom Gerät gemeldeter Ladestatus                                   |
| `battery.powerSource`        | string, nur lesbar             | Aktuelle Stromquelle                                              |
| `battery.studioMode`         | boolescher Wert                | Studio-Modus ein- oder ausschalten, wenn unterstützt              |
| `health.reachable`           | boolesch, nur lesbar           | Detaillierter Erreichbarkeitsstatus                               |
| `health.latency`             | Zahl in ms, nur lesbar         | Dauer der letzten API-Anfrage                                     |
| `health.lastSuccess`         | Datumsstring, nur lesbar       | Zeitpunkt des letzten erfolgreichen Kontakts                      |
| `health.lastError`           | string, nur lesbar             | Letzter Kommunikationsfehler                                      |
| `health.consecutiveFailures` | Nummer, nur lesbar             | Anzahl aufeinanderfolgender fehlgeschlagener Abfragen             |
| `health.nextPoll`            | Datumsstring, nur lesbar       | Geplanter Zeitpunkt der nächsten Abfrage                          |

Weitere nur lesbare Datenpunkte unter`info` , für WLAN, Akkuspannung/-strom und Geräteeinstellungen können angelegt werden, wenn das Gerät diese Informationen meldet.

### Skriptbeispiele

Instanznummer und Seriennummer müssen durch die IDs aus dem eigenen ioBroker-Objektbaum ersetzt werden. Schreibbare Datenpunkte müssen mit`ack = false` geschrieben werden, damit der Adapter sie als Befehl erkennt.

```javascript
const light = 'elgato-key-light.0.EW40K1A09882.light.lights.0';

// Einschalten und die Helligkeit auf 65 Prozent setzen.
setState(`${light}.on`, true, false);
setState(`${light}.brightness`, 65, false);

// Eine warme weiße Farbtemperatur einstellen.
setState(`${light}.temperature`, 3200, false);

// Eine RGB-fähige Leuchte blau färben, ohne ihre Helligkeit zu ändern.
setState(`${light}.hex`, '#0000FF', false);
```

Dieselben schreibbaren Datenpunkte können aus Blockly, Szenen, VIS und anderen ioBroker-Komponenten verwendet werden. Schnell aufeinanderfolgende Slider-Werte werden pro Gerät zusammengefasst; Der letzte Wert gewinnt.

## Mehrere Instanzen und Geräte löschen

Jede Adapterinstanz besitzt ihre eigene verbindliche Geräteliste. Konfigurationsseite, Objektbaum und Dashboard verwenden nur die Geräte, die dieser Instanz zugewiesen wurden. Bei mehreren Instanzen sollte jede Leuchte nur der Instanz hinzugefügt werden, die sie steuern soll.

Wird ein Gerät über das Papierkorb-Symbol gelöscht, wird es aus der laufenden Instanz, der dauerhaft gespeicherten Instanzkonfiguration und dem Geräte-Objektbaum dieser Instanz entfernt. Nach Konfigurationsänderungen sollte die Admin-Seite dennoch gespeichert werden. Geräte anderer Instanzen bleiben unberührt.

## Implementierung

### Ein Gerät wird nicht gefunden

- Prüfen Sie, ob ioBroker-Host und Leuchte einander im lokalen Netzwerk erreichen können.
- Für die Suche Multicast-DNS/UDP 5353 und die Weiterleitung von`_elg._tcp.local.` prüfen.
- Eine private IP-Adresse oder einen`.local` -Hostnamen manuell hinzufügen, wenn die Suche kein VLAN überqueren kann.
- Prüfen Sie, ob TCP-Port 9123 erreichbar ist und das Gerät nicht durch eine Gast-WLAN-Regel isoliert wird.

### Ein Gerät ist im Dashboard offline

Die Karte zeigt den letzten Fehler und den Countdown bis zum nächsten Versuch. **Reconnect** löst sofort eine neue Abfrage aus. Für Automatisierungen oder Überwachung stehen`health.lastError` ,`health.consecutiveFailures` und`health.nextPoll` zur Verfügbarkeit.

### Bedienelemente fehlen

Der Adapter erzeugt Bedienelemente anhand der vom Gerät zurückgegebenen Felder. Gegebenenfalls die Gerätefirmware aktualisieren, das Gerät erneut anschließen und`info.capabilities` oder die Dashboard-Diagnose prüfen. Ein fehlendes Bedienelement bedeutet normalerweise, dass die API diese Fähigkeit nicht gemeldet hat.

### Diagnosedaten

Der Diagnose-Dialog im Dashboard enthält Adapter-/Laufzeitversion und aktuelle Geräteansichten. WLAN-Namen werden ausgelassen; Seriennummern und lokale Netzwerkadressen können jedoch enthalten sein, da sie bei der Fehlersuche helfen. Die Ausgabe sollte daher vor einer öffentlichen Weitergabe geprüft werden.

Entwickler und Hardwaretester können außerdem den ausschließlich lesenden GET-Probe verwenden:

```shell
npm run elgato:probe -- 192.168.1.50 9123
```

Die Probe maskiert Seriennummer, MAC-Adresse und WLAN-Namen. Einzelheiten zum Protokoll finden Sie in [docs/ELGATO\_API.md](/#/docs/adapterref/iobroker.elgato-key-light/docs/ELGATO_API.md) .

## Netzwerk und Datenschutz

Die Kommunikation Geräte verwendet die lokale, nicht authentifizierte Elgato-HTTP-API. Die Hostprüfung akzeptiert nur private/link-lokale Adressen und lokale Hostnamen. URL-Schemata, eingebettete Zugangsdaten, Pfade und öffentliche IP-Adressen werden abgewiesen. Der Adapter benötigt kein Elgato-Cloud-Konto und fügt keine Telemetrie hinzu.

Da die lokale Geräte-API keine Authentifizierung verwendet, sollten sich Leuchten und ioBroker-Host in einem vertrauenswürdigen Netzwerk befinden. TCP-Port 9123 darf nicht aus dem Internet erreichbar sein.

## Aktualisierung von einer älteren Version

Die Geräte-Stammobjekte auf Seriennummernbasis und die bekannten schreibbaren Pfade unter`<Seriennummer>.light.lights.0` erhalten bleiben. [docs/MIGRATION.md](/#/docs/adapterref/iobroker.elgato-key-light/docs/MIGRATION.md) beschreibt Metadatenkorrekturen, Konfigurationsmigration und Rollback. Vor einem großen Update sollte ein ioBroker-Backup erstellt werden.

## Entwicklung

```shell
npm run install:all
npm run lint
npm run typecheck
npm test
npm run test:integration
npm run build
```

Hardwaretests sind optional, standardmäßig rein gelesen und dürfen nicht in CI ausgeführt werden.

## Änderungsverlauf

### **IN BEARBEITUNG**

- (xXBJXx) Backend mit validiertem HTTP-Client, Fähigkeitserkennung, robustem Polling und begrenzter Bonjour-/mDNS-Suche überarbeitet.
- (xXBJXx) Zuverlässige Steuerung unterstützter Leuchten einschließlich RGB, Temperatur, Akku und Studio-Modus sowie strikte Instanztrennung und sauberes Löschen von Geräten ergänzt.
- (xXBJXx) Konfiguration und Dashboard mit responsiven Geräte-Cards, Health-Daten, Diagnose und Geräte-/API-Details modernisiert.
- (xXBJXx) Benötigt Node.js >= 22.18, js-controller >= 7.2.2 und Admin >= 7.8.23.
- (xXBJXx) Behebt die Issues [#116](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/issues/116) , [#117](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/issues/117) , [#130](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/issues/130) , [#152](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/issues/152) und [#159](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/issues/159) ; Ersetzt die PRs [#39](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/39) , [#129](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/129) , [#181](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/181) , [#185](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/185) , [#186](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/186) , [#209](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/209) und [#250](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/250) .

### 1.1.0 (2024-04-14)

- (mcm1957) Adapter benötigt jetzt Node.js 18 und js-controller >= 5.
- (mcm1957) Abhängigkeiten wurden aktualisiert.

Ältere Einträge: [CHANGELOG\_OLD.md](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/blob/main/CHANGELOG_OLD.md)

## Lizenz

Erstellt von xXBJXx und gepflegt von ioBroker Community Adapters. Elgato ist eine Marke der Corsair GmbH; Dieses Projekt ist nicht mit Elgato/Corsair verbunden und wird nicht von Elgato/Corsair unterstützt.

Copyright © 2024–2026 iobroker-community-adapters <mcm57@gmx.at>

Copyright © 2023 xXBJXx <issi.dev.iobroker@gmail.com>

Veröffentlicht unter der MIT-Lizenz. Siehe [LIZENZ](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/blob/main/LICENSE) .