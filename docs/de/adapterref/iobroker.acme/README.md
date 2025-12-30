---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.acme/README.md
title: ioBroker.acme
hash: 6PaTYasXWjL2QReVKVOM7tmkighgHD/M/nHbtZ3KGmU=
---
![Logo](../../../en/adapterref/iobroker.acme/admin/acme.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.acme.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.acme.svg)
![Anzahl der Installationen](https://iobroker.live/badges/acme-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/acme-stable.svg)
![NPM](https://nodei.co/npm/iobroker.acme.png?downloads=true)

# IoBroker.acme
**Tests:** ![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.acme/workflows/Test%20and%20Release/badge.svg)

## ACME-Adapter für ioBroker
Dieser Adapter generiert Zertifikate mithilfe von ACME-Herausforderungen.

## Verwendung
Der Adapter startet regelmäßig (standardmäßig um Mitternacht) und nach Konfigurationsaktualisierungen, um alle erforderlichen Zertifikate (neue oder bald ablaufende) zu generieren.

Aktuell werden Bestellungen über die Zertifizierungsstelle Let's Encrypt abgewickelt und sind daher kostenlos.

Die Zertifikatsdetails werden in einem „Zertifikatsammlungsobjekt“ gespeichert, das weitere relevante Informationen wie Ablaufdatum, zu sichernde Domains und privaten Schlüssel enthält.
Diese Objekte werden über ihre Sammlungs-ID referenziert.

Adapter, die Zertifikate zur Sicherung ihrer Kommunikation benötigen (z. B. [Webadapter](https://www.npmjs.com/package/iobroker.web)), können Zertifikatssammlungen laden und nutzen.

Speicherung und Nutzung werden über eine Schnittstelle gesteuert, die in [Core ioBroker Controller](https://www.npmjs.com/package/iobroker.js-controller) enthalten ist.

### ACME-Herausforderungen
Es sind zwei Methoden zur Überprüfung der Herausforderung implementiert, und mindestens eine davon sollte auf der Konfigurationsseite aktiviert sein.

Beachten Sie, dass Wildcard-Zertifikatsbestellungen nur mit der DNS-01-Challenge validiert werden können.

#### HTTP-01
Der Adapter startet seinen eigenen HTTP-01-Challenge-Server auf dem konfigurierten Port und der Adresse.

Damit eine HTTP-01-Challenge erfolgreich ist, muss der Port/die Adresse des Challenge-Servers öffentlich erreichbar sein, und zwar über Port 80 des FQDN, der in einer Sammlung von Common/Alternative Names aus dem offenen Internet angegeben ist.

Konfigurieren Sie Ihre Firewall, Ihren Reverse-Proxy usw. entsprechend.

Beispielszenarien:

1. Der IoB-Host, auf dem ACME läuft, befindet sich hinter einem Router, und dieser Router hat eine öffentlich erreichbare IP-Adresse:

    Lösung:

- Konfigurieren Sie ACME so, dass es auf einem beliebigen freien Port läuft: z. B. 8092.
- Konfigurieren Sie den Router so, dass er Verbindungen an Port 80 seiner öffentlichen Adresse an Port 8092 des IoB-Hosts weiterleitet.
- Konfigurieren Sie den DNS-Namen des gewünschten Zertifikats (Common Name) so, dass er zur öffentlichen Adresse des Routers aufgelöst wird.

2. Der IoB-Host, auf dem ACME läuft, verfügt über eine direkte Internetverbindung mit einer öffentlich erreichbaren IP-Adresse:

    Lösung:

- Konfigurieren Sie den ACME-Adapter so, dass er auf Port 80 aktiv ist.
- Konfigurieren Sie den DNS-Namen des gewünschten Zertifikats (Common Name) so, dass er zur öffentlichen Adresse des IoB-Hosts aufgelöst wird.

3. Szenario 1 und 2 sind unmöglich, da auf Port 80 der öffentlich erreichbaren IP-Adresse bereits ein anderer Dienst läuft.

Mögliche Lösungen:

1. Wenn es sich bei dem anderen Dienst um einen IoB-Adapter handelt, der den Portkonfigurations-Namensstandards folgt, wird ACME diesen stoppen, bevor versucht wird, ein Zertifikat zu bestellen, Port 80 für den HTTP-01-Challenge-Server verwenden und jeden gestoppten Adapter nach Abschluss neu starten.

Dies führt offensichtlich zu einem kurzen Ausfall des anderen Adapters, was unter Umständen unerwünscht ist.

2. Verwenden Sie eine DNS-01-Herausforderung.
3. Richten Sie einen benannten virtuellen Host-HTTP-Proxy auf Port 80 des Routers oder eines öffentlich erreichbaren IoB-Hosts ein.

- Geben Sie dem bestehenden Dienst einen anderen Hostnamen als den, für den ein Zertifikat benötigt wird, und konfigurieren Sie diesen Hostnamen so, dass er zur gleichen Adresse aufgelöst wird.
- Konfigurieren Sie den Proxy so, dass er Anfragen je nach verwendetem Namen entweder an den bestehenden Dienst oder an den ACME-Adapter weiterleitet.

4. Führen Sie ACME nur dann manuell aus, wenn der erforderliche Portzugriff verfügbar ist. **Nicht empfohlen**, sollte aber funktionieren:

- Deaktivieren (stoppen) Sie den ACME-Adapter nach der Installation.
- Kurz bevor eine Zertifikatsbestellung oder -verlängerung erforderlich ist (die Verlängerung erfolgt bis zu 7 Tage vor Ablauf), führen Sie bitte manuell die folgenden Schritte durch:
- Richten Sie alle erforderlichen Firewall-/Portweiterleitungs-/Wartungsmaßnahmen ein, damit ACME auf dem konfigurierten Port ausgeführt werden kann und dieser Port aus dem öffentlichen Internet erreichbar ist.
- Starten Sie ACME manuell über die IoB-Admin-Instanzenseite.
- Warten Sie, bis ACME alle Zertifikatsbestellungen abgeschlossen hat.
- ACME manuell über die IoB-Admin-Instanzenseite stoppen.
Diese Schritte sind bei jeder Zertifikatsbestellung/-verlängerung erforderlich, daher ist diese Methode **nicht empfehlenswert**. ACME ist für einen vollautomatisierten Prozess ausgelegt.

#### DNS-01
Für gängige Domain-Hosting-Plattformen sind verschiedene DNS-01-Challenge-Plugins implementiert.

#### Referenzen
Weitere Einzelheiten finden Sie in [AMCS.js](https://www.npmjs.com/package/acme).

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN BEARBEITUNG** -->

## Changelog

### **WORK IN PROGRESS**
- (mcm1957) Adapter requires node.js >= 20, js-controller >= 6.0.11 and admin >= 7.6.17 now
- (mcm1957) Dependencies have been updated

### 1.0.6 (2024-12-27)

- (mcm1957) Missing size attributes for jsonCOnfig have been added.
- (mcm1957) Dependencies have been updated

### 1.0.5 (2024-12-08)

- (@GermanBluefox) Corrected error with admin 7.4.3

### 1.0.3 (2024-11-27)

- (@GermanBluefox) Migrated GUI for admin 7 (one more time)

### 1.0.1 (2024-07-06)

- (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
- (mcm1957) Dependencies have been updated
- (bluefox) Prepared for admin v7

### 0.1.2 (2023-11-15)

- (mcm1957) Issues reported by adapter checker have been fixed.
- (mcm1957) Release 0.1.1 has been released again due to error during deploy.

## License

MIT License


Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023 Robin Rainton <robin@rainton.com>

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