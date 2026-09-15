---
chapters: {"pages":{"en/adapterref/iobroker.clage-dsx/README.md":{"title":{"en":"ioBroker.clage-dsx"},"content":"en/adapterref/iobroker.clage-dsx/README.md"},"en/adapterref/iobroker.clage-dsx/README_DE.md":{"title":{"en":"ioBroker.clage-dsx"},"content":"en/adapterref/iobroker.clage-dsx/README_DE.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.clage-dsx/README_DE.md
title: ioBroker.clage-dsx
hash: AqL/8/g9JmPBKjdl4er9zADHJyTnoyZDKMV5Cg5ReIk=
---
# ioBroker.clage-dsx

![NPM-Version](https://img.shields.io/npm/v/iobroker.clage-dsx.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.clage-dsx.svg)
![Test und Freigabe](https://github.com/TheBam1990/ioBroker.clage-dsx/actions/workflows/test-and-release.yml/badge.svg)

![CLAGE-DSX-Logo](../../../en/adapterref/iobroker.clage-dsx/admin/clage-dsx.png)

## Beschreibung

Der Adapter verbindet ioBroker mit einem lokalen [CLAGE](https://www.clage.de/) Home Server und den dort angemeldeten Durchlaufern. Die Kommunikation erfolgt über die HTTPS-API im lokalen Netzwerk; Ein Cloud-Dienst wird nicht benötigt.

Grundlage ist die mitgelieferte \[CLAGE Home Server API-Spezifikation v1.3.4]\( <https://github.com/TheBam1990/ioBroker.clage-dsx/blob/master/CLAGE> HomeServer API v1.3.4.pdf).

## Voraussetzungen

- ioBroker mit Node.js 22 oder neuer
- Der CLAGE Home Server muss vom ioBroker-Host erreichbar sein
- Benutzername und Passwort eines Home-Server-API-Kontos
- HTTPS-Zugriff auf den Home Server

## Konfiguration

In den Einstellungen der Instanz werden drei Werte eingetragen:

1. **IP-Adresse des CLAGE Home Servers** , zum Beispiel`192.168.2.35` (ohne`https://` )
2. **API-Benutzername** , zum Beispiel`admin`
3. **API-Passwort** , zum Beispiel`geheim`

Alle drei Felder sind erforderlich. Der historische native Konfigurationsschlüssel für den Benutzernamen heißt`port` ; Er bleibt zur Kompatibilität mit bestehenden Installationen erhalten.

Die Werte`admin` und`geheim` sind Beispiele aus der CLAGE-API-Dokumentation. Es müssen die tatsächlich auf dem eigenen Home Server eingerichteten API-Zugangsdaten verwendet werden; Das Beispielpasswort funktioniert nur, wenn es dort genauso konfiguriert wurde.

Der Home Server verwendet normalerweise ein selbstsigniertes TLS-Zertifikat. Der Adapter akzeptiert dieses lokale Zertifikat bei der direkten Verbindung mit dem konfigurierten Gerät.

## Aktueller Funktionsumfang

Für jedes angemeldete CLAGE-Gerät legt der Adapter Datenpunkte an für:

- Identität, Verbindungsstatus, RSSI, LQI, API-Rechtemaske und letzte Funkaktivität
- Sollwert, Temperaturgrenze, Ein-/Auslauftemperatur und alle vier Temperaturspeicher
- Durchfluss, Durchflussgrenze, Ventilstellung, Rohwert und berechnete Leistung, Heizstatus und Fehler
- Firmware- und Seriennummern, Leistungsteilinformationen und Betriebszeitzähler
- Gesamtverbrauch sowie letzter Zapfvorgang und Verbrauchshistorie als JSON
- Aktuelle Fehler und Fehlerhistorie als JSON
- Version, Identität, Funkkanal, Adresse und angebotene Dienste des Home Servers
- alle Timer, sowohl global als auch je Gerät gefiltert

Schreibbare Datenpunkte:

- `Setpoint` : API-Wert in Zehntelgrad, zum Beispiel`450` = 45,0 °C
- `Themperatur` : Temperatur in °C; Die historische Schreibweise bleibt aus Kompatibilitätsgründen erhalten
- `flowMax` : Durchflussgrenze in 0,1 l/min; Besondere API-Werte sind`253` (ECO) und`254` (AUTO)
- `Name` Gerätename
- `setup.flowMax` ,`setup.loadShedding` ,`setup.scaldProtection` und`setup.sound`
- `timers.createJson` ,`timers.updateJson` und`timers.deleteId` zur kontrollierten Timerverwaltung

`info.connection` zeigt an, ob der Home Server erreichbar ist und die eingetragenen Zugangsdaten akzeptiert.

Der Adapter prüft vor Schreibzugriff die API-Rechtemaske. Sollwertänderungen werden zwei Sekunden gebündelt, aktive Geräte gleichzeitig aktualisiert und die Geräteliste standardmäßig mit sequenziellem HTTP Long Polling abgefragt. Intervalle, Long Polling und der Zeitraum der Verbrauchshistorie (standardmäßig 30 Tage) sind in der Adapterkonfiguration einstellbar.

## Timer-JSON

Ein Timer kann durch Schreiben eines JSON wie diesem auf`timers.createJson` angelegt werden:

```json
{"type":0,"weekdays":127,"start":"06:00","stop":"07:00","deviceId":"A001FF0034","setpoint":450}
```

Für Änderungen wird derselbe Aufbau mit numerischer`id` auf`timers.updateJson` geschrieben. Zum Löschen eines einzelnen Timers wird dessen numerische ID aufgegeben`timers.deleteId` geschrieben. Gefährliche Sammeloperationen, das Abmelden von Geräten und Änderungen der Funkadresse werden bewusst nicht angeboten.

## Implementierung

- Die IP-Adresse darf kein Protokoll und keinen Pfad enthalten.
- API-Zugangsdaten in der Konfiguration des CLAGE Home Servers prüfen.
- TCP-Port 443 muss vom ioBroker-Host erreichbar sein.
- HTTP-Status`401` bedeutet ungültige Zugangsdaten;`403` bedeutet unzureichende API-Rechte.
- Ein Gerät kann angemeldet werden, ist aber vorübergehend nicht erreichbar. Die API meldet stirbt mit`404` ,`410` oder einem negativen Gerätefehlercode.

## Lizenz

Copyright © 2026 TheBam <elektrobam@gmx.de>

MIT-Lizenz. Siehe [LICENSE](https://github.com/TheBam1990/ioBroker.clage-dsx/blob/master/LICENSE) .

## Changelog

### 0.0.7

- Datenpunktrollen für Zeitstempel, Versionsinformationen und die numerische Bus-ID korrigiert

### 0.0.6

- Live-Temperaturen, Temperaturspeicher, Ventilstellung, berechnete Leistung und Funkdiagnose ergänzt
- Geräteeinstellungen, Verbrauchs- und Fehlerhistorie ergänzt
- Rechtegeprüfte Schreibzugriffe auf Einstellungen und Timerverwaltung ergänzt
- Home-Server-Informationen, adaptive Abfrage und sequenzielles HTTP Long Polling ergänzt
- Abfrageintervalle konfigurierbar gemacht

[Ältere Changelog-Einträge](https://github.com/TheBam1990/ioBroker.clage-dsx/blob/master/CHANGELOG_OLD.md)