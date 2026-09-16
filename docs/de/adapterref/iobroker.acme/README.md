---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.acme/README.md
title: ioBroker.acme
hash: +ACUt0TBGB1M/vAE7XQceBZw+rIgrx1AZm7blfjl4Xg=
---
![Logo](../../../en/adapterref/iobroker.acme/admin/acme.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.acme.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.acme.svg)
![Anzahl der Installationen](https://iobroker.live/badges/acme-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/acme-stable.svg)
![NPM](https://nodei.co/npm/iobroker.acme.png?downloads=true)
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.acme/workflows/Test%20and%20Release/badge.svg)

# ioBroker.acme

## ACME-Adapter für ioBroker

Dieser Adapter generiert Zertifikate mithilfe von ACME-Herausforderungen.

## Verwendung

Der Adapter startet regelmäßig (standardmäßig um Mitternacht) und nach Konfigurationsaktualisierungen, um alle erforderlichen Zertifikate (neue oder bald ablaufende) zu generieren.

Aktuell werden Bestellungen über die Zertifizierungsstelle Let's Encrypt abgewickelt und sind daher kostenlos.

Die Zertifikatsdetails werden in einem „Zertifikatsammlungs“-Objekt gespeichert, das weitere relevante Informationen wie Ablaufdatum, zu sichernde Domains und privaten Schlüssel enthält. Diese Objekte werden über ihre Sammlungs-ID referenziert.

Adapter, die Zertifikate zur Sicherung ihrer Kommunikation benötigen (z. B. [Webadapter](https://www.npmjs.com/package/iobroker.web) ), können Zertifikatssammlungen laden und nutzen.

Speicherung und Nutzung werden über eine Schnittstelle gesteuert, die im [Kern-Controller ioBroker](https://www.npmjs.com/package/iobroker.js-controller) enthalten ist.

### ACME-Herausforderungen

Es werden zwei Methoden zur Überprüfung der Herausforderung implementiert, und mindestens eine davon sollte auf der Konfigurationsseite aktiviert sein.

Beachten Sie, dass Wildcard-Zertifikatsbestellungen nur mit der DNS-01-Challenge validiert werden können.

#### HTTP-01

Der CA holt`http://<FQDN>/.well-known/acme-challenge/<token>` auf Port 80. Dieser Pfad und Port sind durch das ACME-Protokoll festgelegt, daher muss etwas darauf antworten.

**Die Übermittlung der HTTP-01-Herausforderung** auf der Konfigurationsseite entscheidet über Folgendes:

- **Automatisch (empfohlen)** – der Adapter veröffentlicht die Challenge-Token im Zustand`acme.<instance>.info.httpChallenges` Die`web` Und`admin` Bedienen Sie sie direkt von dort, wenn sie kürzlich genug Zeit hatten.`@iobroker/webserver` Daher muss nichts gestoppt und kein Port freigehalten werden. Wenn der konfigurierte Port nicht mit einem veröffentlichten Token antwortet, greift der Adapter auf seinen eigenen Challenge-Server zurück und stoppt Adapter auf diesem Port, genau wie in älteren Versionen.
- **Eigener Challenge-Server, keine Adapterkonflikte** – es wird immer ein eigener Server auf dem konfigurierten Port betrieben, wobei alle daran angeschlossenen Adapter für die Dauer des Auftrags deaktiviert werden. Dies war das einzige Verhalten bis Version 5.0.0.
- **Wird der Dienst von einem anderen Adapter oder Reverse-Proxy bereitgestellt** – veröffentlichen Sie die Tokens und ändern Sie den Port niemals. Verwenden Sie dies, wenn ein nginx-, Traefik- oder anderer Dienst verwendet wird.`proxy` Adapter nach vorne`/.well-known/acme-challenge/` an einen Webserver, der den Zustand ausliest.

Damit eine HTTP-01-Challenge erfolgreich ist, **muss** der Server, der die Challenge durchführt, über Port 80 des in einem Sammlungsnamen (Common/Alt Name) angegebenen FQDN öffentlich aus dem Internet erreichbar sein. Let's Encrypt folgt Weiterleitungen, sodass die Anfrage möglicherweise über einen anderen Port oder HTTPS läuft – sie beginnt jedoch immer mit Port 80.

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

   1. Wenn der andere Dienst`web` oder`admin` auf einer Version mit`@iobroker/webserver` Mit ACME-Unterstützung ist nichts weiter zu tun: ACME beantwortet die veröffentlichten Herausforderungen selbstständig und läuft kontinuierlich. Die Zustellung kann auf **„Automatisch“** eingestellt bleiben.

   2. Wenn es sich bei dem anderen Dienst um einen IoB-Adapter handelt, der den Portkonfigurations-Namensstandards entspricht, aber die Herausforderungen nicht selbst bedienen kann, stoppt ACME ihn, bevor versucht wird, ein Zertifikat zu bestellen, verwendet Port 80 für seinen eigenen HTTP-01-Herausforderungsserver und startet jeden gestoppten Adapter nach Abschluss neu.

      Dies führt offensichtlich zu einem kurzen Ausfall des anderen Adapters, was unter Umständen unerwünscht ist.

   3. Verwenden Sie eine DNS-01-Challenge.

   4. Richten Sie einen benannten virtuellen Host-HTTP-Proxy auf Port 80 des Routers oder eines öffentlich erreichbaren IoB-Hosts ein.

      - Weisen Sie dem bestehenden Dienst einen anderen Hostnamen zu als denjenigen, für den ein Zertifikat erforderlich ist, und konfigurieren Sie diesen Hostnamen so, dass er zur gleichen Adresse aufgelöst wird.
      - Konfigurieren Sie den Proxy so, dass er Anfragen je nach verwendetem Namen entweder an den bestehenden Dienst oder an den ACME-Adapter weiterleitet.

   5. Führen Sie ACME nur dann manuell aus, wenn der erforderliche Portzugriff verfügbar ist. **Nicht empfohlen** , sollte aber funktionieren:

      - Den ACME-Adapter nach der Installation deaktivieren (stoppen).
      - Kurz bevor eine Zertifikatsbestellung oder -verlängerung erforderlich ist (die Verlängerung erfolgt bis zu 7 Tage vor Ablauf), führen Sie bitte manuell die folgenden Schritte durch:
        - Richten Sie alle erforderlichen Firewall-/Portweiterleitungs-/Wartungsmaßnahmen ein, damit ACME auf dem konfigurierten Port ausgeführt werden kann und dieser Port aus dem öffentlichen Internet erreichbar ist.
        - Starten Sie ACME manuell über die IoB-Administrationsinstanzseite.
        - Warten Sie, bis ACME alle Zertifikatsbestellungen abgeschlossen hat.
        - ACME manuell über die IoB-Administrationsseite stoppen.
      - Diese Schritte sind bei jeder Zertifikatsbestellung/-verlängerung erforderlich, daher ist diese Methode **nicht empfehlenswert** . ACME ist für einen vollautomatisierten Prozess ausgelegt.

##### Sich selbst veröffentlichen Herausforderungen stellen

Der Staat`acme.<instance>.info.httpChallenges` ist der Vertrag zwischen diesem Adapter und dem Dienst, der Port 80 bedient. Er enthält ein JSON-Objekt, dessen Schlüssel das Challenge-Token ist:

```json
{
    "<token>": {
        "keyAuthorization": "<token>.<account key thumbprint>",
        "expires": 1756200000000
    }
}
```

Ein Leser antwortet`GET /.well-known/acme-challenge/<token>` sollen:

- Lesen Sie jede einzelne Instanz, d. h. das Muster des ausländischen Staates.`acme.*.info.httpChallenges` - Die Instanznummer ist nicht festgelegt, und es können zwei Instanzen gleichzeitig bestellen;
- Ein Token ablehnen, das nicht`[A-Za-z0-9_-]{16,128}` bevor ich es nachschlage;
- einen Eintrag ignorieren, dessen`expires` liegt in der Vergangenheit;
- Antwort`200` mit`keyAuthorization` als der ganze Körper,`404` ;
- Führen Sie all dies **vor** jeglicher Authentifizierung durch, da die Zertifizierungsstelle anonym ist.

Die Werte sind absichtlich öffentlich - sie werden über einfaches HTTP an jeden, der danach fragt, übermittelt - und werden wieder entfernt, sobald die Bestellung abgeschlossen ist.

#### DNS-01

Für gängige Domain-Hosting-Plattformen sind verschiedene DNS-01-Challenge-Plugins implementiert.

#### Referenzen

Weitere Details finden Sie in [AMCS.js.](https://www.npmjs.com/package/acme)

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

## Changelog
### 5.0.2 (2026-09-08)
- (@GermanBluefox) HTTP-01 challenges are now published in `acme.<instance>.info.httpChallenges` so `web`/`admin` can serve them; adapters on port 80 are only stopped when nothing answers there (#85)
- (@GermanBluefox) Added the "HTTP-01 challenge delivery" setting to choose between automatic, an own challenge server, and an external responder
- (@GermanBluefox) Added support for deSEC and PowerDNS DNS-01 challenges
- (@GermanBluefox) Fixed DigitalOcean, DNSimple, Gandi, name.com and Route53 DNS-01 challenges failing with "request is not a function" after the acme-client migration
- (@GermanBluefox) Added support for Hetzner and Dynu DNS-01 challenges
- (@GermanBluefox) Added support for IONOS DNS-01 challenge
- (@GermanBluefox) BREAKING: Migrated from the abandoned ACME.js to acme-client. The saved ACME account is registered once anew on first run after the update.
- (chris299) Added support for eDNS.de DNS-01 challenge
- (chris299) Fixed certificate issuance failing against current Let's Encrypt with 409 / "Unhandled status '403'"
- (chris299) Fixed certificate renewal failing with "Cannot read properties of undefined (reading '0')"

### 4.0.3 (2026-08-03)
- (@GermanBluefox) Migrated to admin 8
- (@GermanBluefox) Adapter requires admin >= 8.0.0 now

### 3.1.0 (2026-05-04)
- (copilot) Adapter requires node.js >= 22 now
- (mcm1957) Dependencies have been updated

### 3.0.2 (2026-03-10)
- (@GermanBluefox) Correcting configuration dialog
- (@GermanBluefox) Added tests for the GUI component

### 3.0.0 (2026-03-05)
- (lubepi) BREAKING: DNS-01 credentials are encrypted now. You might have to reenter them once after upgrading the aadapter. 
- (copilot) Adapter requires admin >= 7.7.22 now
- (lubepi) Added support for Netcup DNS-01 challenge 
- (@GermanBluefox) Optimisations on log output and error handling

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.acme/blob/main/CHANGELOG_OLD.md)

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