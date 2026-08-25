---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.elgato-key-light/README.md
title: ioBroker.elgato-key-light
hash: 12th8LHpGRONBMe5hYjbgGxLte2cGiXWo1PtJzPFvvo=
---
![Logo](../../../en/adapterref/iobroker.elgato-key-light/admin/elgato-key-light.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.elgato-key-light.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.elgato-key-light.svg)
![Installationen](https://iobroker.live/badges/elgato-key-light-installed.svg)
![Stabil](https://iobroker.live/badges/elgato-key-light-stable.svg)

# IoBroker.elgato-key-light
Englisch | [Deutsch](README_DE.md)

## Haftungsausschluss
Alle in diesem Projekt erwähnten Produkt- und Firmennamen, Logos und Marken gehören ihren jeweiligen Eigentümern. Ihre Verwendung dient ausschließlich der Identifizierung und impliziert keinerlei Verbindung zu, Unterstützung durch oder Empfehlung seitens dieser Eigentümer oder ihrer verbundenen Unternehmen. Dies ist ein privates, nicht-kommerzielles Projekt, das zu Freizeitzwecken entwickelt wurde. Elgato ist eine Marke der Corsair GmbH.

## Fehlerberichterstattung mit Sentry
Dieser Adapter nutzt die von ioBroker bereitgestellte Sentry-Integration, um unerwartete Ausnahmen und Codefehler automatisch an die Entwickler zu melden. Die Fehlerberichterstattung ist seit Version 3.0 über js-controller verfügbar und hilft dabei, Fehler zu identifizieren und zu beheben, die sonst unbemerkt bleiben würden.

Einzelheiten zu den übermittelten Informationen und Anweisungen zum Deaktivieren der Fehlerberichterstattung finden Sie in [offizielle ioBroker Sentry-Dokumentation](https://github.com/ioBroker/ioBroker.js-controller#error-reporting-via-iobroker-sentry).

Mit ioBroker lassen sich kompatible Elgato-WLAN-Leuchten lokal steuern – ganz ohne Elgato-Cloud-Konto. Der Adapter erkennt Leuchten über Bonjour/mDNS oder verbindet sich mit einer manuell konfigurierten privaten IP-Adresse oder einem lokalen Hostnamen. Gerätesteuerung und Statusinformationen sind in ioBroker verfügbar und werden in der Admin-Oberfläche übersichtlich dargestellt.

## Wozu dient der Adapter?
Der Adapter verbindet Elgato-Leuchten mit ioBroker, sodass sie über die Admin-Objektansicht, Skripte, Szenen, Visualisierungen und andere ioBroker-Adapter verwendet werden können. Typische Anwendungsfälle sind:

- gleichzeitiges Umschalten der Studiobeleuchtung mit einem Streaming- oder Aufnahme-Setup;
- Anpassung von Helligkeit und Farbtemperatur an die Tageszeit;
- Steuerung eines Elgato Light Strip über RGB/HSV-Farben;
- Überwachung, ob eine Lampe erreichbar ist und wann sie das nächste Mal abgefragt wird;
- Anzeige des Akku- und Ladezustands einer Key Light Mini;
- manuelle Bedienung der Leuchten über das spezielle Elgato Lights-Dashboard.

Die Kommunikation erfolgt im lokalen Netzwerk. Der Adapter fragt jedes konfigurierte Gerät ab, veröffentlicht dessen aktuellen Status und sendet Benutzeränderungen zurück an das Gerät. Fehlgeschlagene Anfragen werden mithilfe einer begrenzten Wiederholungs-/Backoff-Strategie verarbeitet, um eine Netzwerküberlastung durch eine nicht funktionierende Lampe zu vermeiden.

## Unterstützte Geräte und Funktionen
Die Steuerelemente werden aus der tatsächlichen API-Antwort und nicht aus einem fest codierten Produktnamen erstellt. Dadurch können kompatible Firmware und zugehörige Elgato-Leuchtenmodelle alle gemeldeten Funktionen nutzen.

| Funktionen | Schlüssellicht / Luft / Ring | Schlüssellicht Mini | Lichtleiste |
| --- | --- | --- | --- |
| Leistung und Helligkeit | Ja | Ja | Ja |
| Farbtemperatur | Ja | Ja | Falls gemeldet |
| Farbton, Sättigung, RGB und Hex | Falls gemeldet | Falls gemeldet | Ja |
| Akku- und Ladeinformationen | Nein | Ja | Nein |
| Studio-Modus / Akku-Bypass | Nein | Falls gemeldet | Nein |
| Identifizieren | Ja | Ja | Ja |

Szenen/Effekte für Lichtstreifen und ein Neustart des Geräts werden bewusst nicht angezeigt, da ihr Verhalten noch nicht auf der gesamten unterstützten Hardware- und Firmware-Matrix verifiziert wurde.

## Anforderungen
- Node.js 22.18 oder neuer
- js-controller 7.2.2 oder neuer
- Admin 7.8.23 oder neuer
- Netzwerkzugriff vom ioBroker-Host zu den Lampen, normalerweise TCP-Port 9123
- Bonjour/mDNS UDP-Port 5353 bei Verwendung der automatischen Erkennung

Die Elgato-Lampe und der ioBroker-Host müssen sich normalerweise im selben lokalen Netzwerk befinden. Die Erkennung über VLANs hinweg kann einen mDNS-Reflektor erfordern; eine manuelle Konfiguration kann verwendet werden, wenn die Multicast-Erkennung nicht verfügbar ist.

## Installation und Einrichtung
1. Installieren Sie den Adapter und erstellen Sie eine Instanz.
2. Öffnen Sie die Instanzkonfiguration.
3. Wählen Sie **Netzwerk scannen**, um Dienste mit der Endung `_elg._tcp.local.` zu finden, und fügen Sie die gewünschten Ergebnisse hinzu. Alternativ können Sie eine private IP-Adresse oder einen Hostnamen mit der Endung `.local` und den zugehörigen Port manuell eingeben. Der Standard-API-Port von Elgato ist `9123`.
4. Verwenden Sie **Test**, um eine manuelle Adresse vor dem Hinzufügen zu überprüfen.
5. Aktivieren Sie die konfigurierten Geräte und speichern Sie die Konfiguration.
6. Öffnen Sie die Registerkarte **Elgato Key Light** in der Admin-Seitenleiste, um die Steuerung live zu ermöglichen.

Netzwerkscans zeigen nur verfügbare Geräte an. Fügen Sie die benötigten Scan-Ergebnisse explizit hinzu, damit die Geräte der vorgesehenen Adapterinstanz zugeordnet bleiben.

### Laufzeitoptionen
| Option | Standard | Zweck |
| --- | ---: | --- |
| Abfrage | 60 s | Normales Intervall zum Auslesen aktueller Gerätedaten |
| Anfrage-Timeout | 3000 ms | Maximale Dauer einer Geräteanfrage |
| Maximaler Backoff | 300 s | Obergrenze für verzögerte Wiederholungsversuche nach Fehlern |
| Schreib-Entprellung | 200 ms | Reduziert die Anzahl schneller Schieberegleränderungen auf weniger API-Anfragen |
| Discovery-Timeout | 5000 ms | Dauer eines Bonjour/mDNS-Scans |

Ein kürzeres Abfrageintervall aktualisiert die Zustände zwar schneller, führt aber zu einer höheren Netzwerk- und Gerätelast. Schalter und Schieberegler im Dashboard werden optimistisch aktualisiert, sodass erfolgreiche Aktionen sofort sichtbar sind, während die nächste Geräteantwort den Wert bestätigt.

## Nutzung des Dashboards
Die Registerkarte „Adapter“ zeigt für jedes in der ausgewählten Instanz konfigurierte Gerät eine Karte an. Eine Karte zeigt nur die von diesem Gerät unterstützten Steuerelemente an:

- **Der **Ein-/Ausschalter** schaltet das Licht ein oder aus.
- Mit **Helligkeit** wird die Lichtleistung von 0 bis 100 Prozent eingestellt.
- **Temperatur** regelt die Farbtemperatur von Weiß von 2900 K bis 7000 K, sofern unterstützt.
- **Farbe** öffnet die Farbauswahl des Browsers für RGB-fähige Geräte.
- Der **Studio-Modus** steuert die Batterieumgehung bei einem Key Light Mini, wenn die Firmware diese Einstellung meldet.
- Mit der Funktion **Identifizieren** identifiziert sich das ausgewählte Gerät.
- **Wiederverbinden** erkennt das Gerät sofort erneut.

Die Karte zeigt außerdem den Online-/Offline-Status, die Antwortzeit, die Firmware-Version, – sofern verfügbar – den Akkustand und einen Countdown bis zur nächsten Abfrage an. **Alle an** und **Alle aus** schalten alle erreichbaren LEDs der aktuellen Adapterinstanz ein. **Aktualisieren** lädt die Dashboard-Daten neu, während **Diagnose** Laufzeit- und Geräteinformationen zur Fehlerbehebung anzeigt.

Das Ändern der Farbe des Lichtstreifens behält dessen separate Helligkeitseinstellung bei. Die Zustandswerte `hex` und `rgb` geben die aktuell emittierte Farbe und damit auch die aktuelle Helligkeit an. Beispielsweise kann derselbe Blauton bei 50 % Helligkeit als `#000080` und bei 100 % Helligkeit als `#0000FF` erscheinen.

## Geräte mit ioBroker-Zuständen steuern
Jedes erfolgreich kontaktierte Gerät erhält ein Root-Objekt basierend auf seiner Seriennummer:

```text
elgato-key-light.<instance>.<serial>
```

Die meisten Geräte enthalten eine Leuchte an der Position `light.lights.0`. Es werden nur vom Gerät unterstützte Zustände erzeugt.

| Relativer Zustand | Typ / Bereich | Beschreibung |
| --- | --- | --- |
| `reachable` | Boolescher Wert, schreibgeschützt | Gerät ist derzeit erreichbar |
| `info.displayName` | Zeichenkette | Gerätenamen lesen oder ändern |
| `light.numberOfLights` | Zahl, schreibgeschützt | Anzahl der von der API gemeldeten leichten Elemente |
| `light.lights.0.on` | boolesch | Strom ein-/ausschalten |
| `light.lights.0.brightness` | Zahl, 0–100 % | Helligkeit einstellen |
| `light.lights.0.temperature` | Zahl, 2900–7000 K | Weißfarbtemperatur einstellen |
| `light.lights.0.hue` | Zahl, 0–360° | Farbton festlegen |
| `light.lights.0.saturation` | Zahl, 0–100 % | Farbsättigung einstellen |
| `light.lights.0.hex` | Zeichenkette | Farbe auf `#RRGGBB` setzen |
| `light.lights.0.rgb` | Zeichenkette | Farbe im alten `R,G,B`-Format festlegen, z. B. `255,0,0` |
| `battery.level` | Zahl, 0–100 %, schreibgeschützt | Akkuladung der Key Light Mini |
| `battery.status` | Zeichenkette, schreibgeschützt | Vom Gerät gemeldeter Ladestatus |
| `battery.powerSource` | Zeichenkette, schreibgeschützt | Aktuelle Stromquelle |
| `battery.studioMode` | Boolescher Wert | Studio-Modus aktivieren oder deaktivieren, sofern unterstützt |
| `health.reachable` | Boolescher Wert, schreibgeschützt | Detaillierter Erreichbarkeitsstatus |
| `health.latency` | Zahl in ms, schreibgeschützt | Dauer der letzten API-Anfrage |
| `health.lastSuccess` | Datumszeichenfolge, schreibgeschützt | Zeitpunkt des letzten erfolgreichen Kontakts |
| `health.lastError` | Zeichenkette, schreibgeschützt | Letzter Kommunikationsfehler |
| `health.consecutiveFailures` | Zahl, schreibgeschützt | Anzahl aufeinanderfolgender fehlgeschlagener Abfragen |
| `health.nextPoll` | Datumszeichenfolge, schreibgeschützt | Geplanter Zeitpunkt der nächsten Abfrage |
| `health.nextPoll` | Datumszeichenfolge, schreibgeschützt | Geplanter Zeitpunkt der nächsten Abfrage |

Zusätzliche schreibgeschützte Zustände wie `info`, Wi-Fi, Batteriespannung/-strom und Geräteeinstellungen können beim Melden der entsprechenden Daten erstellt werden.

### Skriptbeispiele
Ersetzen Sie die Instanznummer und die Seriennummer durch die IDs aus Ihrem ioBroker-Objektbaum. Schreibbare Zustände müssen mit `ack = false` geschrieben werden, damit der Adapter sie als Befehle erkennt.

```javascript
const light = 'elgato-key-light.0.EW40K1A09882.light.lights.0';

// Switch on and set brightness to 65%.
setState(`${light}.on`, true, false);
setState(`${light}.brightness`, 65, false);

// Set a warm white color temperature.
setState(`${light}.temperature`, 3200, false);

// Set an RGB-capable light to blue without changing its brightness.
setState(`${light}.hex`, '#0000FF', false);
```

Die gleichen beschreibbaren Zustände können von Blockly, Scenes, VIS und anderen ioBroker-Komponenten verwendet werden. Schnelle Schieberegler-Schreibvorgänge werden pro Gerät zusammengefasst; der letzte Wert ist maßgebend.

## Mehrere Instanzen und Entfernen von Geräten
Jede Adapterinstanz verfügt über eine eigene, maßgebliche Geräteliste. Konfigurationsseite, Objektstruktur und Dashboard verwenden ausschließlich Geräte, die dieser Instanz zugewiesen sind. Wenn Sie mehrere Instanzen betreiben, fügen Sie jede Leuchte nur derjenigen Instanz hinzu, die sie steuern soll.

Durch das Entfernen eines Geräts mit dem Papierkorbsymbol wird dieses aus der laufenden Instanz, der gespeicherten Instanzkonfiguration und dem Geräteobjektbaum dieser Instanz gelöscht. Es wird weiterhin empfohlen, die Admin-Seite nach Konfigurationsänderungen zu speichern. Geräte, die einer anderen Instanz zugewiesen sind, sind davon nicht betroffen.

## Fehlerbehebung
### Es wurde kein Gerät gefunden
- Stellen Sie sicher, dass ioBroker und die Lampe sich im lokalen Netzwerk erreichen können.
- Zur Erkennung prüfen Sie Multicast-DNS/UDP 5353 und die Weiterleitung von `_elg._tcp.local.`.
- Fügen Sie die private IP-Adresse oder den `.local`-Hostnamen manuell hinzu, wenn die Erkennung nicht über ein VLAN hinweg möglich ist.
- Stellen Sie sicher, dass der TCP-Port 9123 erreichbar ist und das Gerät nicht durch eine Gast-WLAN-Richtlinie isoliert ist.

### Ein Gerät ist im Dashboard offline.
Die Karte zeigt den letzten Fehler und den Countdown bis zum nächsten Versuch an. Verwenden Sie **Wiederverbinden** für eine sofortige Aktualisierung. Prüfen Sie `health.lastError`, `health.consecutiveFailures` und `health.nextPoll` auf Automatisierungen oder Überwachungseinstellungen.

### Steuerelemente fehlen
Der Adapter generiert Steuerelemente aus den vom Gerät zurückgegebenen Feldern. Aktualisieren Sie gegebenenfalls die Geräte-Firmware, schließen Sie das Gerät erneut an und überprüfen Sie `info.capabilities` oder die Dashboard-Diagnose. Ein fehlendes Steuerelement bedeutet in der Regel, dass die API diese Funktion nicht gemeldet hat.

### Erfassung von Diagnosedaten
Der Diagnosedialog im Dashboard enthält die Adapter-/Laufzeitversion und die aktuelle Geräteansicht. SSID-Werte werden nicht angezeigt, Seriennummern und lokale Netzwerkadressen können jedoch vorhanden sein, da sie für die Diagnose hilfreich sind. Überprüfen Sie die Ausgabe, bevor Sie sie öffentlich teilen.

Entwickler und Hardwaretester können die GET-only-Sonde verwenden:

```shell
npm run elgato:probe -- 192.168.1.50 9123
```

Die Sonde schwärzt Seriennummer, MAC-Adresse und SSID. Protokolldetails sind in [docs/ELGATO_API.md](docs/ELGATO_API.md) dokumentiert.

## Netzwerk und Datenschutz
Die Gerätekommunikation erfolgt über die lokale, nicht authentifizierte Elgato HTTP-API. Die Hostvalidierung akzeptiert ausschließlich private/link-lokale Adressen und lokale Hostnamen; URL-Schemas, eingebettete Anmeldeinformationen, Pfade und öffentliche IP-Adressen werden abgelehnt. Der Adapter benötigt kein Elgato-Cloud-Konto und erfasst keine Telemetriedaten.

Da die lokale Geräte-API keine Authentifizierung besitzt, sollten Sie die Lampen und den ioBroker-Host in einem vertrauenswürdigen Netzwerk betreiben und den TCP-Port 9123 nicht im Internet freigeben.

## Aktualisierung von einer älteren Version
Die Seriennummern der Geräte und die unterhalb von `<serial>.light.lights.0` festgelegten beschreibbaren Pfade bleiben erhalten. Informationen zu Metadatenkorrekturen, Konfigurationsmigration und Rollback finden Sie unter [docs/MIGRATION.md](docs/MIGRATION.md). Erstellen Sie vor einem größeren Update eine ioBroker-Sicherung.

## Entwicklung
```shell
npm run install:all
npm run lint
npm run typecheck
npm test
npm run test:integration
npm run build
```

Hardwaretests sind optional, standardmäßig nur per GET-Anfrage verfügbar und dürfen nicht in CI-Umgebungen ausgeführt werden.

## Changelog
### **WORK IN PROGRESS**

### 2.0.0 (2026-08-16)

- (xXBJXx) Reworked the backend with a validated HTTP client, capability detection, resilient polling and bounded Bonjour/mDNS discovery.
- (xXBJXx) Added reliable controls for supported lights, including RGB, temperature, battery and studio mode, with strict instance isolation and clean device removal.
- (xXBJXx) Modernized the configuration and dashboard UIs with responsive device cards, health data, diagnostics and device/API details.
- (xXBJXx) Addressed repository checker findings for managed timers and repository metadata.
- (xXBJXx) Requires Node.js >= 22.18, js-controller >= 7.2.2 and Admin >= 7.8.23.
- (xXBJXx) Fixes issues [#116](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/issues/116), [#117](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/issues/117), [#130](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/issues/130), [#152](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/issues/152) and [#159](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/issues/159); supersedes PRs [#39](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/39), [#129](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/129), [#181](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/181), [#185](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/185), [#186](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/186), [#209](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/209) and [#250](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/250).

Older entries: [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

## License

Created by xXBJXx and maintained by ioBroker Community Adapters. Elgato is a trademark of Corsair GmbH; this project is not affiliated with or endorsed by Elgato/Corsair.

Copyright (c) 2024-2026 iobroker-community-adapters mcm57@gmx.at  
Copyright (c) 2023 xXBJXx issi.dev.iobroker@gmail.com

Released under the MIT License. See [LICENSE](LICENSE).