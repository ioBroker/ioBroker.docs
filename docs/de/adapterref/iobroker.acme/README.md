---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.acme/README.md
title: ioBroker.acme
hash: FmXLZhYoeZJF9Hzf1mENOYBQDeUW9LAHIcg1cFlwv/M=
---
![Logo](../../../en/adapterref/iobroker.acme/admin/acme.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.acme.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.acme.svg)
![Anzahl der Installationen](https://iobroker.live/badges/acme-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/acme-stable.svg)
![NPM](https://nodei.co/npm/iobroker.acme.png?downloads=true)

# IoBroker.acme
**Tests:** ![Testen und Freigeben](https://github.com/iobroker-community-adapters/ioBroker.acme/workflows/Test%20and%20Release/badge.svg)

## ACME-Adapter für ioBroker
Dieser Adapter generiert Zertifikate mithilfe von ACME-Herausforderungen.

## Verwendung
Der Adapter wird regelmäßig (standardmäßig um Mitternacht) und nach Konfigurationsaktualisierungen gestartet, um alle erforderlichen Zertifikate (neue oder bald ablaufende) zu generieren.

Aktuell werden Bestellungen über die Zertifizierungsstelle Let’s Encrypt abgewickelt und sind somit kostenfrei.

Zertifikatsdetails werden in einem Objekt „Zertifikatssammlung“ gespeichert, das weitere relevante Details wie Ablaufdatum, zu sichernde Domänen und privaten Schlüssel enthält.
Auf diese Objekte wird über ihre Sammlungs-ID verwiesen.

Adapter, die zur Sicherung ihrer Kommunikation Zertifikate benötigen (z. B. [Webadapter](https://www.npmjs.com/package/iobroker.web)), können Zertifikatssammlungen laden und verwenden.

Die Speicherung und Nutzung erfolgt über eine in [Kern-ioBroker-Controller](https://www.npmjs.com/package/iobroker.js-controller) enthaltene Schnittstelle.

### ACME-Herausforderungen
Es sind zwei Methoden zur Challenge-Verifizierung implementiert und mindestens eine sollte auf der Konfigurationsseite aktiviert werden.

Beachten Sie, dass Wildcard-Zertifikatsbestellungen nur mit der DNS-01-Challenge validiert werden können.

#### HTTP-01
Der Adapter startet seinen eigenen HTTP-01-Challenge-Server auf dem konfigurierten Port und der konfigurierten Adresse.

Damit eine HTTP-01-Challenge erfolgreich ist, **muss** der Port/die Adresse des Challenge-Servers öffentlich als Port 80 des FQDN erreichbar sein, der in einer Sammlung allgemeiner/alternativer Namen aus dem offenen Internet angegeben ist.

Konfigurieren Sie Ihre Firewall, Ihren Reverseproxy usw. entsprechend.

Beispielszenarien:

1. Der IoB-Host, auf dem ACME läuft, befindet sich hinter einem Router und dieser Router hat eine öffentlich erreichbare IP-Adresse:

    Lösung:

- Konfigurieren Sie ACME so, dass es auf jedem freien Port ausgeführt wird: Z. B.: 8092.
– Konfigurieren Sie den Router so, dass Verbindungen von Port 80 seiner öffentlichen Adresse an Port 8092 des IoB-Hosts weitergeleitet werden.
- Konfigurieren Sie den DNS-Namen des gewünschten allgemeinen Zertifikatsnamens so, dass er in die öffentliche Adresse des Routers aufgelöst wird.

2. Der IoB-Host, auf dem ACME läuft, verfügt über eine direkte Internetverbindung mit einer öffentlich erreichbaren IP-Adresse:

    Lösung:

- Konfigurieren Sie den ACME-Adapter so, dass er auf Port 80 lauscht.
- Konfigurieren Sie den DNS-Namen des gewünschten allgemeinen Zertifikatsnamens so, dass er in die öffentliche Adresse des IoB-Hosts aufgelöst wird.

3. Szenario 1 und 2 sind unmöglich, da auf Port 80 der öffentlich erreichbaren IP-Adresse ein anderer Dienst ausgeführt wird.

Mögliche Lösungen:

1. Wenn es sich bei dem anderen Dienst um einen IoB-Adapter handelt, der den Benennungsstandards für Portkonfigurationen folgt, wird ACME ihn stoppen, bevor versucht wird, ein Zertifikat anzufordern, Port 80 für den HTTP-01-Challenge-Server verwenden und alle gestoppten Adapter nach Abschluss neu starten.

Dies führt offensichtlich zu einem kurzen Ausfall des anderen Adapters, was möglicherweise nicht erwünscht ist.

2. Verwenden Sie eine DNS-01-Herausforderung.
3. Richten Sie einen benannten virtuellen Host-HTTP-Proxy auf Port 80 des Routers oder einem öffentlich erreichbaren IoB-Host ein.

- Geben Sie dem vorhandenen Dienst einen anderen Hostnamen als den, für den ein Zertifikat erforderlich ist, und konfigurieren Sie diesen Hostnamen so, dass er in dieselbe Adresse aufgelöst wird.
- Konfigurieren Sie den Proxy so, dass Anfragen basierend auf dem verwendeten Namen entweder an den vorhandenen Dienst oder an den ACME-Adapter weitergeleitet werden.

4. Führen Sie ACME nur manuell aus, wenn der erforderliche Portzugriff verfügbar ist. **Nicht empfohlen**, sollte aber funktionieren:

– Deaktivieren (stoppen) Sie den ACME-Adapter nach der Installation.
- Kurz bevor die Zertifikatsbestellung bzw. -erneuerung erforderlich ist (die Erneuerung erfolgt bis zu 7 Tage vor Ablauf), führen Sie manuell die folgenden Schritte aus:
- Richten Sie die Firewall/Portweiterleitung/andere erforderliche Wartungsmaßnahmen ein, damit ACME auf dem konfigurierten Port ausgeführt werden kann und dieser Port vom öffentlichen Internet aus zugänglich ist.
– Starten Sie ACME manuell von der IoB-Admin-Instanzen-Seite.
- Warten Sie, bis ACME alle Zertifikatsbestellungen abgeschlossen hat.
- Stoppen Sie ACME manuell von der IoB-Admin-Instances-Seite aus.
- Diese Schritte sind bei jeder erforderlichen Zertifikatsbestellung/-erneuerung erforderlich und daher wird diese Methode **nicht empfohlen**. ACME ist darauf ausgelegt, einen vollständig automatisierten Prozess zu ermöglichen.

#### DNS-01
Für beliebte Domain-Hosting-Plattformen sind verschiedene DNS-01-Challenge-Plugins implementiert.

#### Referenzen
Weitere Einzelheiten finden Sie unter [AMCS.js](https://www.npmjs.com/package/acme).

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
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

### 0.1.1 (2023-11-15)

- (raintonr) Various improvements in start/stop of other adapters using HTTP challenge server port fixing restart loop (#43).
- (raintonr) Fixed ACME notify messages (#64).

## License

MIT License

Copyright (c) 2023-2024 ioBroker Community Developers <iobroker-community-adapters@gmx.de>  
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