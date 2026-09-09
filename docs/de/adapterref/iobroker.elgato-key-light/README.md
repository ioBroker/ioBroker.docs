---
chapters: {"pages":{"en/adapterref/iobroker.elgato-key-light/README.md":{"title":{"en":"ioBroker.elgato-key-light"},"content":"en/adapterref/iobroker.elgato-key-light/README.md"},"en/adapterref/iobroker.elgato-key-light/README_DE.md":{"title":{"en":"ioBroker.elgato-key-light"},"content":"en/adapterref/iobroker.elgato-key-light/README_DE.md"},"en/adapterref/iobroker.elgato-key-light/docs/ELGATO_API.md":{"title":{"en":"Elgato local API evidence"},"content":"en/adapterref/iobroker.elgato-key-light/docs/ELGATO_API.md"},"en/adapterref/iobroker.elgato-key-light/docs/MIGRATION.md":{"title":{"en":"Migration guide"},"content":"en/adapterref/iobroker.elgato-key-light/docs/MIGRATION.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.elgato-key-light/README.md
title: ioBroker.elgato-key-light
hash: 989+EyqkMdSALewJRZ49e3GeGGMpr3KtmQzY9So+Kik=
---
![Logo](../../../en/adapterref/iobroker.elgato-key-light/admin/elgato-key-light.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.elgato-key-light.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.elgato-key-light.svg)
![Installationen](https://iobroker.live/badges/elgato-key-light-installed.svg)
![Stabil](https://iobroker.live/badges/elgato-key-light-stable.svg)

# ioBroker.elgato-key-light

Englisch | [Deutsch](/#/docs/adapterref/iobroker.elgato-key-light/README_DE.md)

## Haftungsausschluss

Alle in diesem Projekt erwähnten Produkt- und Firmennamen, Logos und Marken gehören ihren jeweiligen Eigentümern. Ihre Verwendung dient ausschließlich der Identifizierung und impliziert keinerlei Verbindung zu, Unterstützung durch oder Empfehlung seitens dieser Eigentümer oder ihrer verbundenen Unternehmen. Dies ist ein privates, nicht-kommerzielles Projekt, das zu Freizeitzwecken entwickelt wurde. Elgato ist eine Marke der Corsair GmbH.

## Fehlerberichterstattung mit Sentry

Dieser Adapter nutzt die von ioBroker bereitgestellte Sentry-Integration, um unerwartete Ausnahmen und Codefehler automatisch an die Entwickler zu melden. Die Fehlerberichterstattung ist seit Version 3.0 über js-controller verfügbar und hilft dabei, Fehler zu identifizieren und zu beheben, die sonst unbemerkt bleiben würden.

Einzelheiten zu den übermittelten Informationen und Anweisungen zum Deaktivieren der Fehlerberichterstattung finden Sie in der [offiziellen ioBroker Sentry-Dokumentation](https://github.com/ioBroker/ioBroker.js-controller#error-reporting-via-iobroker-sentry) .

Mit ioBroker lassen sich kompatible Elgato-WLAN-Leuchten lokal steuern – ganz ohne Elgato-Cloud-Konto. Der Adapter erkennt Leuchten über Bonjour/mDNS oder verbindet sich mit einer manuell konfigurierten privaten IP-Adresse oder einem lokalen Hostnamen. Gerätesteuerung und Statusinformationen sind in ioBroker verfügbar und werden in der Admin-Oberfläche übersichtlich dargestellt.

## Wozu dient der Adapter?

Der Adapter verbindet Elgato-Leuchten mit ioBroker, sodass sie über die Admin-Objektansicht, Skripte, Szenen, Visualisierungen und andere ioBroker-Adapter verwendet werden können. Typische Anwendungsfälle sind:

- Zusammenschalten der Studiobeleuchtung mit einem Streaming- oder Aufnahme-Setup;
- Helligkeit und Farbtemperatur je nach Tageszeit anpassen;
- Steuerung eines Elgato Light Strip über RGB/HSV-Farben;
- Überwachung, ob eine Lampe erreichbar ist und wann sie das nächste Mal abgefragt wird;
- Anzeige des Akku- und Ladezustands einer Key Light Mini;
- Die Beleuchtung kann manuell über das spezielle Elgato Lights-Dashboard bedient werden.

Die Kommunikation erfolgt im lokalen Netzwerk. Der Adapter fragt jedes konfigurierte Gerät ab, veröffentlicht dessen aktuellen Status und sendet Benutzeränderungen zurück an das Gerät. Fehlgeschlagene Anfragen werden mithilfe einer begrenzten Wiederholungs-/Backoff-Strategie verarbeitet, um eine Netzwerküberlastung durch eine nicht funktionierende Lampe zu vermeiden.

## Unterstützte Geräte und Funktionen

Die Steuerelemente werden aus der tatsächlichen API-Antwort und nicht aus einem fest codierten Produktnamen erstellt. Dadurch können kompatible Firmware und zugehörige Elgato-Leuchtenmodelle alle gemeldeten Funktionen nutzen.

| Fähigkeit                                          | Schlüssellicht / Luft / Ring | Schlüssellicht Mini | Lichtleiste    |
| -------------------------------------------------- | ---------------------------- | ------------------- | -------------- |
| Leistung und Helligkeit                            | Ja                           | Ja                  | Ja             |
| Farbtemperatur                                     | Ja                           | Ja                  | Falls gemeldet |
| Farbton, Sättigung, RGB und Hexadezimaldarstellung | Falls gemeldet               | Falls gemeldet      | Ja             |
| Akku- und Ladeinformationen                        | NEIN                         | Ja                  | NEIN           |
| Studio-Modus / Batterie-Bypass                     | NEIN                         | Falls gemeldet      | NEIN           |
| Identifizieren                                     | Ja                           | Ja                  | Ja             |

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
3. Wählen Sie **„Netzwerk scannen“** , um zu finden`_elg._tcp.local.` Dienste, fügen Sie dann die erforderlichen Ergebnisse hinzu. Alternativ können Sie eine private IP-Adresse eingeben oder`.local` Hostname und Port manuell festlegen. Der Standard-API-Port von Elgato ist`9123` Die
4. Verwenden Sie **die Testfunktion** , um eine manuelle Adresse vor dem Hinzufügen zu überprüfen.
5. Aktivieren Sie die konfigurierten Geräte und speichern Sie die Konfiguration.
6. Öffnen Sie den Tab **„Elgato Key Light“** in der Admin-Seitenleiste, um die Live-Steuerung zu ermöglichen.

Netzwerkscans zeigen nur verfügbare Geräte an. Fügen Sie die benötigten Scan-Ergebnisse explizit hinzu, damit die Geräte der vorgesehenen Adapterinstanz zugeordnet bleiben.

### Laufzeitoptionen

| Option                         |     Standard | Zweck                                                                |
| ------------------------------ | -----------: | -------------------------------------------------------------------- |
| Umfragen                       |   60er Jahre | Normales Intervall zum Auslesen aktueller Gerätedaten                |
| Zeitüberschreitung der Anfrage |      3000 ms | Maximale Dauer einer Geräteanfrage                                   |
| Maximaler Rücklauf             | 300 Sekunden | Obergrenze für verzögerte Wiederholungsversuche nach Fehlschlägen    |
| Entprellung schreiben          |       200 ms | Kombiniert schnelle Schieberegleränderungen mit weniger API-Anfragen |
| Entdeckungs-Timeout            |      5000 ms | Dauer eines Bonjour/mDNS-Scans                                       |

Ein kürzeres Abfrageintervall aktualisiert die Zustände zwar schneller, führt aber zu einer höheren Netzwerk- und Gerätelast. Schalter und Schieberegler im Dashboard werden optimistisch aktualisiert, sodass erfolgreiche Aktionen sofort sichtbar sind, während die nächste Geräteantwort den Wert bestätigt.

## Nutzung des Dashboards

Die Registerkarte „Adapter“ zeigt für jedes in der ausgewählten Instanz konfigurierte Gerät eine Karte an. Eine Karte zeigt nur die von diesem Gerät unterstützten Steuerelemente an:

- **Der Netzschalter** schaltet das Licht ein oder aus.
- **Mit dem Helligkeitsregler** wird die Lichtleistung von 0 bis 100 Prozent eingestellt.
- **Die Temperaturregelung** ermöglicht die Einstellung der Farbtemperatur von Weiß im Bereich von 2900 K bis 7000 K, sofern dies unterstützt wird.
- **Mit der Option „Farbe“** wird die Farbauswahl des Browsers für RGB-fähige Geräte geöffnet.
- **Der Studio-Modus** steuert die Batterieumgehung bei einem Key Light Mini, wenn die Firmware diese Einstellung meldet.
- **„Identifizieren“** bewirkt, dass sich das ausgewählte Gerät selbst identifiziert.
- **Reconnect** erkennt das Gerät sofort wieder.

Die Karte zeigt außerdem den Online-/Offline-Status, die Antwortzeit, die Firmware-Version, – sofern verfügbar – Akkuinformationen und einen Countdown bis zur nächsten Abfrage an. **„Alle ein“** und **„Alle aus“** schalten alle erreichbaren LEDs der aktuellen Adapterinstanz ein. **„Aktualisieren“** lädt die Dashboard-Daten neu, während **„Diagnose“** Laufzeit- und Geräteinformationen zur Fehlerbehebung anzeigt.

Durch das Ändern der Farbe des Lichtstreifens bleibt dessen separate Helligkeitseinstellung erhalten.`hex` Und`rgb` Die Zustandswerte repräsentieren die aktuell emittierte Farbe und beinhalten daher auch die aktuelle Helligkeit. Beispielsweise kann derselbe Blauton erscheinen als`#000080` bei 50 % Helligkeit und`#0000FF` bei 100% Helligkeit.

## Geräte mit ioBroker-Zuständen steuern

Jedes erfolgreich kontaktierte Gerät erhält ein Root-Objekt basierend auf seiner Seriennummer:

```text
elgato-key-light.<instance>.<serial>
```

Die meisten Geräte enthalten eine Leuchte bei`light.lights.0` Es werden nur vom Gerät unterstützte Zustände erstellt.

| Relativer Zustand            | Typ / Bereich                        | Beschreibung                                                             |
| ---------------------------- | ------------------------------------ | ------------------------------------------------------------------------ |
| `reachable`                  | Boolescher Wert, schreibgeschützt    | Das Gerät ist derzeit erreichbar.                                        |
| `identify`                   | Boolescher Button, nur beschreibbar  | Auslösererkennung durch Schreiben `true`                                 |
| `info.displayName`           | Zeichenkette                         | Geräteanzeigenamen lesen oder ändern                                     |
| `light.numberOfLights`       | Nummer, schreibgeschützt             | Anzahl der von der API gemeldeten leichten Elemente                      |
| `light.lights.0.on`          | boolescher Wert                      | Schalten Sie die Stromversorgung                                         |
| `light.lights.0.brightness`  | Zahl, 0–100 %                        | Helligkeit einstellen                                                    |
| `light.lights.0.temperature` | Nummer, 2900–7000 K                  | Weißtemperatur einstellen                                                |
| `light.lights.0.hue`         | Nummer, 0–360°                       | Farbton einstellen                                                       |
| `light.lights.0.saturation`  | Zahl, 0–100 %                        | Farbsättigung einstellen                                                 |
| `light.lights.0.hex`         | Zeichenkette                         | Farbe festlegen als `#RRGGBB`                                            |
| `light.lights.0.rgb`         | Zeichenkette                         | Farbe in Legacy-Systemen festlegen`R,G,B` Format, zum Beispiel `255,0,0` |
| `battery.level`              | Zahl, 0–100 %, schreibgeschützt      | Schlüssellicht Mini-Batterie laden                                       |
| `battery.status`             | Zeichenkette, schreibgeschützt       | Vom Gerät gemeldeter Ladestatus                                          |
| `battery.powerSource`        | Zeichenkette, schreibgeschützt       | Stromquelle                                                              |
| `battery.studioMode`         | boolescher Wert                      | Studio-Modus aktivieren oder deaktivieren, sofern unterstützt            |
| `health.reachable`           | Boolescher Wert, schreibgeschützt    | Detaillierter Erreichbarkeitsstatus                                      |
| `health.latency`             | Zahl in ms, schreibgeschützt         | Dauer der letzten API-Anfrage                                            |
| `health.lastSuccess`         | Datumszeichenfolge, schreibgeschützt | Zeitpunkt des letzten erfolgreichen Kontakts                             |
| `health.lastError`           | Zeichenkette, schreibgeschützt       | Letzter Kommunikationsfehler                                             |
| `health.consecutiveFailures` | Nummer, schreibgeschützt             | Anzahl aufeinanderfolgender gescheiterter Wahlen                         |
| `health.nextPoll`            | Datumszeichenfolge, schreibgeschützt | Geplanter Zeitpunkt der nächsten Abstimmung                              |

Zusätzliche schreibgeschützte`info` Beim Melden der entsprechenden Daten können Wi-Fi-, Batteriespannungs-/Strom- und Geräteeinstellungen erfasst werden.

### Skriptbeispiele

Ersetzen Sie die Instanznummer und die Seriennummer durch die IDs aus Ihrem ioBroker-Objektbaum. Schreibbare Zustände müssen mit geschrieben werden`ack = false` Der Adapter erkennt sie also als Befehle.

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

### Es wurde kein Gerät gefunden.

- Prüfen Sie, ob ioBroker und die Lampe im lokalen Netzwerk miteinander in Kontakt treten können.
- Zur Erkennung prüfen Sie Multicast-DNS/UDP 5353 und`_elg._tcp.local.` Weiterleitung.
- Fügen Sie die private IP-Adresse hinzu oder`.local` Hostnamen manuell eingeben, falls die Erkennung nicht über ein VLAN hinweg möglich ist.
- Prüfen Sie, ob der TCP-Port 9123 erreichbar ist und ob das Gerät nicht durch eine Gast-WLAN-Richtlinie isoliert ist.

### Im Dashboard wird ein Gerät als offline angezeigt.

Die Karte zeigt den letzten Fehler und den Countdown bis zum nächsten Wiederholungsversuch an. Verwenden Sie **„Neu verbinden“,** um den aktuellen Stand sofort auszulesen. Prüfen`health.lastError` ,`health.consecutiveFailures` Und`health.nextPoll` für Automatisierungen oder Überwachung.

### Es fehlen die Bedienelemente.

Der Adapter generiert Steuerelemente aus den vom Gerät zurückgegebenen Feldern. Aktualisieren Sie gegebenenfalls die Geräte-Firmware, schließen Sie das Gerät erneut an und überprüfen Sie es.`info.capabilities` oder die Dashboard-Diagnose. Ein fehlendes Steuerelement bedeutet normalerweise, dass die API diese Funktion nicht gemeldet hat.

### Diagnostik sammeln

Der Diagnosedialog im Dashboard enthält die Adapter-/Laufzeitversion und die aktuelle Geräteansicht. SSID-Werte werden nicht angezeigt, Seriennummern und lokale Netzwerkadressen können jedoch vorhanden sein, da sie für die Diagnose hilfreich sind. Überprüfen Sie die Ausgabe, bevor Sie sie öffentlich teilen.

Entwickler und Hardwaretester können die GET-only-Sonde verwenden:

```shell
npm run elgato:probe -- 192.168.1.50 9123
```

Die Sonde schwärzt Seriennummer, MAC-Adresse und SSID. Protokolldetails sind in [docs/ELGATO\_API.md](/#/docs/adapterref/iobroker.elgato-key-light/docs/ELGATO_API.md) dokumentiert.

## Netzwerk und Datenschutz

Die Gerätekommunikation erfolgt über die lokale, nicht authentifizierte Elgato HTTP-API. Die Hostvalidierung akzeptiert ausschließlich private/link-lokale Adressen und lokale Hostnamen; URL-Schemas, eingebettete Anmeldeinformationen, Pfade und öffentliche IP-Adressen werden abgelehnt. Der Adapter benötigt kein Elgato-Cloud-Konto und erfasst keine Telemetriedaten.

Da die lokale Geräte-API keine Authentifizierung besitzt, sollten Sie die Lampen und den ioBroker-Host in einem vertrauenswürdigen Netzwerk betreiben und den TCP-Port 9123 nicht im Internet freigeben.

## Aktualisierung von einer älteren Version

Seriennummern der Gerätewurzeln und die unten aufgeführten festgelegten beschreibbaren Pfade`<serial>.light.lights.0` werden beibehalten. Informationen zu Metadatenkorrekturen, Konfigurationsmigration und Rollback finden Sie in [docs/MIGRATION.md](/#/docs/adapterref/iobroker.elgato-key-light/docs/MIGRATION.md) . Erstellen Sie vor einem größeren Update eine ioBroker-Sicherung.

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

Older entries: [CHANGELOG_OLD.md](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/blob/main/CHANGELOG_OLD.md)

## License

Created by xXBJXx and maintained by ioBroker Community Adapters. Elgato is a trademark of Corsair GmbH; this project is not affiliated with or endorsed by Elgato/Corsair.

Copyright (c) 2024-2026 iobroker-community-adapters mcm57@gmx.at  
Copyright (c) 2023 xXBJXx issi.dev.iobroker@gmail.com

Released under the MIT License. See [LICENSE](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/blob/main/LICENSE).