---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.parcelapp
BADGE-stable: https://iobroker.live/badges/parcelapp-stable.svg
BADGE-Installations: https://iobroker.live/badges/parcelapp-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.parcelapp
BADGE-Test and Release: https://github.com/krobipd/ioBroker.parcelapp/actions/workflows/test-and-release.yml/badge.svg
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge
chapters: {"pages":{"de/adapterref/iobroker.parcelapp/README.md":{"title":{"de":"ioBroker.parcelapp — Nutzerdokumentation"},"content":"de/adapterref/iobroker.parcelapp/README.md"},"de/adapterref/iobroker.parcelapp/scripting.md":{"title":{"de":"Skripte und Automatisierung"},"content":"de/adapterref/iobroker.parcelapp/scripting.md"},"de/adapterref/iobroker.parcelapp/faq.md":{"title":{"de":"Häufige Fragen"},"content":"de/adapterref/iobroker.parcelapp/faq.md"}}}
---
# ioBroker.parcelapp — Nutzerdokumentation

Verfolgt Sendungen aller Zusteller, die [parcel.app](https://parcelapp.net) unterstützt, mit einem
einzigen API-Schlüssel. Der Adapter fragt dein parcel.app-Konto ab und bildet jede Sendung im
ioBroker-Objektbaum ab.

Kapitel: **diese Seite** · [Skripte und Automatisierung](/#/docs/adapterref/iobroker.parcelapp/scripting.md) · [Häufige Fragen](/#/docs/adapterref/iobroker.parcelapp/faq.md)

---

## Voraussetzung

Du brauchst ein **parcel.app-Premium-Abo**. Die API ist eine Premium-Funktion — ohne sie beantwortet
parcel.app jede Anfrage mit HTTP 403 und der Adapter kann nichts lesen. Der Adapter legt kein Konto
an und verwaltet keines; er liest nur (und fügt auf Wunsch Sendungen hinzu).

Der Adapter spricht nicht selbst mit den Zustellern. Alles, was in ioBroker erscheint, ist das, was
parcel.app über eine Sendung weiß — einen Zusteller, den parcel.app nicht erreicht, erreicht auch
dieser Adapter nicht.

---

## Einrichtung

### 1. API-Schlüssel holen

1. [web.parcelapp.net](https://web.parcelapp.net) öffnen und mit dem parcel.app-Konto anmelden.
2. Den Bereich **API** öffnen.
3. Den Schlüssel kopieren. Er ist eine lange Zeichenkette — vollständig kopieren, ohne Leerzeichen
   davor oder dahinter.

### 2. Instanz anlegen

In ioBroker unter **Adapter** nach `parcelapp` suchen und eine Instanz hinzufügen. Der
Konfigurationsdialog öffnet sich von selbst.

### 3. Einstellungen ausfüllen

| Einstellung                                  | Wirkung                                                                                                                                                                                                                            |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **API-Schlüssel**                            | Der Schlüssel aus Schritt 1. Er wird verschlüsselt im Instanz-Objekt gespeichert und niemals ins Log geschrieben.                                                                                                                  |
| **Abfrageintervall**                         | Wie oft der Adapter parcel.app nach Neuigkeiten fragt, in Minuten (5–60, Vorgabe 10).                                                                                                                                              |
| **Zugestellte Pakete automatisch entfernen** | Ein: eine zugestellte Sendung verschwindet aus dem Objektbaum. Aus: sie bleibt mit dem Status _Zugestellt_ stehen, solange parcel.app sie liefert — der Adapter entfernt eine Sendung nur, wenn die API sie nicht mehr zurückgibt. |

### 4. Verbindung testen

Die Schaltfläche **Verbindung testen** führt eine echte Anfrage aus und meldet das tatsächliche
Ergebnis — ein falscher Schlüssel, ein abgelaufenes Abo oder ein Netzwerkproblem werden benannt und
nicht hinter einem grünen „Ok" versteckt. Danach speichern; die Instanz startet und die erste
Abfrage folgt sofort.

> Hinweis: der Test verbraucht dasselbe Anfragebudget wie das Abfragen (20 Anfragen pro Stunde). Der
> Adapter zählt mit: ist das Stundenbudget verbraucht, sagt der Knopf das, statt parcel.app zu fragen.

### Das richtige Abfrageintervall

parcel.app selbst liegt laut eigener FAQ im Schnitt **45 und höchstens etwa 90 Minuten** hinter
der Website des Zustellers. Ein kürzeres Intervall macht die Sendungsdaten deshalb nicht frischer —
es verkürzt nur die Zeit zwischen dem, was parcel.app erfährt, und dem Bemerken in ioBroker. Die
Vorgabe von 10 Minuten ist ein guter Kompromiss; unter 5 Minuten wäre das Stundenbudget gesprengt
und wird abgelehnt.

---

## Was im Objektbaum entsteht

```
parcelapp.0.
├── info.connection              Verbindung zur parcel.app-API
├── summary.
│   ├── activeCount              Noch nicht zugestellte Sendungen
│   ├── todayCount               Heute erwartete Sendungen
│   └── deliveryWindow           Gemeinsames Fenster der heutigen Sendungen
└── deliveries.
    └── <Paketkennung>.          Ein Gerät je Sendung
        ├── carrier
        ├── status
        ├── statusCode
        ├── description
        ├── trackingNumber
        ├── extraInfo
        ├── deliveryWindow
        ├── deliveryEstimate
        ├── lastEvent
        ├── lastLocation
        └── lastUpdated
```

### Verbindung

| Datenpunkt        | Typ     | Bedeutung                                                                                                                                                       |
| ----------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `info.connection` | boolean | Wahr, solange der Adapter die parcel.app-API erreicht. Ein kurzer Aussetzer der ioBroker-Datenbank färbt ihn **nicht** rot — nur ein echter API-Fehler tut das. |

### Zusammenfassung

| Datenpunkt               | Typ    | Bedeutung                                                                                                                                                                     |
| ------------------------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `summary.activeCount`    | number | Sendungen, die noch nicht zugestellt sind.                                                                                                                                    |
| `summary.todayCount`     | number | Sendungen, deren voraussichtliches Zustelldatum heute ist.                                                                                                                    |
| `summary.deliveryWindow` | string | Das gemeinsame Fenster aller heute erwarteten Sendungen: frühester Beginn bis spätestes Ende, z. B. `09:15 - 18:30`. Leer, wenn keine Sendung ein brauchbares Fenster meldet. |

Die Zusammenfassungswerte werden beim Stoppen der Instanz **nicht** zurückgesetzt. Die Zahl der
unterwegs befindlichen Sendungen ändert sich nicht dadurch, dass niemand hinsieht.

### Je Sendung

Jede Sendung wird ein **Gerät** unterhalb von `deliveries.`. Der Gerätename ist die Beschreibung,
die du der Sendung in parcel.app gegeben hast, und folgt ihr: änderst du sie dort, wird das Gerät
bei der nächsten Abfrage umbenannt. Der Name gehört dem Adapter — eine Umbenennung im
ioBroker-Admin hält also nicht; für eine eigene Bezeichnung nimm einen Alias oder einen Datenpunkt
in `0_userdata`.

Jede Sendung trägt im Objektbaum außerdem das **Zeichen ihres Zustellers**, damit du siehst, wer
liefert, bevor du den Namen liest: DHL, Deutsche Post, Hermes/Evri, DPD, GLS, UPS, Amazon, USPS,
TNT, FedEx, InPost, Apple, Vinted und DoorDash haben ihr eigenes Zeichen, nationale
Postgesellschaften und ihre Express-Töchter einen Briefumschlag, alle übrigen Zusteller einen
Lieferwagen. Die Zeichen sind einfarbig gezeichnet und folgen deinem Admin-Thema.

| Datenpunkt         | Typ    | Bedeutung                                                                                                                                                                                                                                                                                                                                                      |
| ------------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `carrier`          | string | Anzeigename des Zustellers (z. B. `DHL Express`). Ersatzweise das Zustellerkürzel in Großbuchstaben, wenn parcel.app keinen Namen kennt.                                                                                                                                                                                                                       |
| `status`           | string | Der Status als lesbarer Text, in deiner ioBroker-Systemsprache.                                                                                                                                                                                                                                                                                                |
| `statusCode`       | number | Der Status als Zahl — **das ist der Datenpunkt für Skripte**, weil er sich nicht mit der Sprache ändert. Der Admin zeigt die Bedeutung jedes Codes daneben. Siehe Tabelle unten.                                                                                                                                                                               |
| `description`      | string | Die Beschreibung aus parcel.app. Anders als der Gerätename zeigt sie immer den aktuellen Wert.                                                                                                                                                                                                                                                                 |
| `trackingNumber`   | string | Die Sendungsnummer.                                                                                                                                                                                                                                                                                                                                            |
| `extraInfo`        | string | Zusatzangabe, die der Zusteller benötigt, etwa Postleitzahl oder E-Mail-Adresse. Bei den meisten Sendungen leer.                                                                                                                                                                                                                                               |
| `deliveryWindow`   | string | Erwartetes Zustellfenster, z. B. `14:00 - 16:00`. Ein über mehrere Tage reichendes Fenster trägt auf beiden Seiten das Datum (`12-06 14:30 - 12-08 18:30`). Leer, wenn kein brauchbares Fenster vorliegt — entweder meldet der Zusteller keins, oder er meldet ein Datum in einem Format, das der Adapter nicht liest (eine Debug-Zeile nennt dann den Wert).  |
| `deliveryEstimate` | string | Dieselbe Information in Worten: _heute_, _morgen_, _in 3 Tagen_, _überfällig_. In der Systemsprache. Jeder Tag eines gemeldeten Bereichs gilt als _heute_; der Wert rückt direkt nach Mitternacht weiter, ohne Anfrage.                                                                                                                                        |
| `lastEvent`        | string | Die jüngste Sendungsmeldung mit Datum, z. B. `Im Zustellstützpunkt eingetroffen - 2026-09-02`.                                                                                                                                                                                                                                                                 |
| `lastLocation`     | string | Wo diese Meldung entstanden ist, sofern der Zusteller einen Ort nennt.                                                                                                                                                                                                                                                                                         |
| `lastUpdated`      | string | Wann sich die Sendungsdaten zuletzt **geändert** haben — nicht, wann der Adapter zuletzt abgefragt hat. Eine Sendung, die zwei Tage stillsteht, behält einen zwei Tage alten Zeitstempel; das ist so gewollt. Eine weiterrückende Schätzung, ein neuer Anzeigename des Zustellers oder eine andere Systemsprache zählen nicht; ein neuer Zusteller-Code schon. |

### Status-Codes

| Code | Bedeutung           | Code | Bedeutung                     |
| ---- | ------------------- | ---- | ----------------------------- |
| 0    | Zugestellt          | 5    | Nicht gefunden                |
| 1    | Eingefroren         | 6    | Zustellversuch fehlgeschlagen |
| 2    | Unterwegs           | 7    | Ausnahme                      |
| 3    | Zur Abholung bereit | 8    | Registriert                   |
| 4    | In Zustellung       | -1   | Unbekannt                     |

`-1` ist kein parcel.app-Status. Der Adapter verwendet ihn, wenn parcel.app einen Statuswert
schickt, den er nicht deuten kann — etwa weil dort ein neuer Code eingeführt wurde. Eine solche
Sendung bleibt bewusst **sichtbar**, statt als „zugestellt" missverstanden und still entfernt zu
werden.

Nur Sendungen im Status 2, 4 und 8 können ein voraussichtliches Zustelldatum haben; bei allen
anderen sind `deliveryWindow` und `deliveryEstimate` deshalb leer.

Eine Sendung im Status 4 (_In Zustellung_) zählt als **heute**, auch wenn der Zusteller kein
voraussichtliches Datum meldet — sofern die letzte Erfassung von heute ist, denn dann ist sie im
Fahrzeug. `deliveryEstimate` sagt dann _heute_ und die Sendung zählt in `summary.todayCount`,
während `deliveryWindow` leer bleibt: es gibt keine Uhrzeit zu zeigen.

---

## Sprache

Jeder Text, den der Adapter schreibt — Statusbezeichnungen, Zustellprognosen, Objektnamen und
Beschreibungen — folgt der **ioBroker-Systemsprache** (_Systemeinstellungen → Sprache_). Es gibt
keine Spracheinstellung je Instanz. Ein Sprachwechsel wirkt bei den Objektnamen sofort und bei den
Zustandswerten nach dem nächsten Adapter-Neustart.

---

## Sendungen löschen

Die parcel.app-API hat keinen Lösch-Endpunkt, der Adapter **kann** eine Sendung also nicht aus
deinem parcel.app-Konto entfernen. Lösche sie in der parcel.app-App oder im Web, dann verschwindet
sie mit der nächsten Abfrage auch aus ioBroker.

Was der Adapter tut: bei eingeschaltetem _Zugestellte Pakete automatisch entfernen_ verschwinden
eine zugestellte Sendung und alle ihre Datenpunkte aus dem Objektbaum — die Sendung selbst bleibt in
deinem parcel.app-Konto.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.14.0 (2026-09-25)

- Fixed: A package expected over several days turned overdue after the first one — every day of the range now counts as today.
- Fixed: A parcel out for delivery with an outdated date counts as today when the carrier scanned it today.
- Improved: Scan dates in the weekday form of all app languages and the UPS dotted form are read, so today's deliveries are recognised more often.
- New: Tomorrow turns into today right after midnight, without waiting for the next poll.
- Fixed: lastUpdated no longer moves every day — a moving estimate or a renamed carrier is not a tracking change; a new carrier code is.
- Fixed: Three packages with the same tracking number no longer overwrite each other, and a restart never swaps the ids of two packages.
- Improved: Correcting the carrier of a shipment in parcel.app keeps its datapoints instead of deleting and recreating them.
- New: statusCode shows the meaning of every code in the admin, and an unknown status is shown in your language.
- Changed: The adapter keeps parcel.app's limits itself — at most 20 addDelivery calls a day and never more than 20 requests an hour.
- Changed: A network outage shows in the connection indicator only, not as a warning; a rejected API key is retried less and less often.
- Fixed: addDelivery without a callback now adds the delivery; the result is written to the log.
- Fixed: One damaged entry from parcel.app no longer stops the whole poll, and a garbled status is never taken for delivered.
- Improved: The carrier list is refreshed daily; FedEx and InPost have their own pictogram, PostNL, PostNord and Bring the envelope.
- Fixed: A start that keeps failing no longer restarts the instance every second — the host now stops it after three attempts.
- Fixed: The documentation said error reporting is off by default — it is on unless switched off in the system settings.

### 0.13.0 (2026-09-15) — stable

- Fixed: Every package showed the carrier's short code instead of its name — parcel.app changed the format of its carrier list, and the adapter could no longer read it.
- New: Each package now carries the pictogram of its carrier in the object tree, drawn to read in the light and the dark theme.
- New: Deliveries added from a script can pass a postcode or an e-mail address — some carriers cannot track a shipment without one.
- Fixed: When parcel.app rejects a request, the reply now carries its own explanation instead of only the HTTP status line.
- Changed: The device name of a package follows the description in parcel.app again; a rename in the ioBroker admin no longer survives, use an alias for your own label.
- Fixed: The same tracking number under two carriers is two packages again — one of them used to be invisible in the object tree.
- Fixed: A failed removal of a delivered package no longer kept the count of active packages and the combined delivery window a poll behind.
- Improved: A package the carrier reports as out for delivery counts towards today even when no delivery date is reported.
- Fixed: Stopping the instance while it was still starting no longer spends one more request of the hourly parcel.app budget on a poll nobody reads.
- Fixed: The setting for delivered packages promised they stay until you delete them in parcel.app — they stay while parcel.app still lists them.

### 0.12.1 (2026-09-07)

- New: Carrier, status and description of a package now carry a short explanation in the object tree, in all eleven languages — including why scripts should read the status code, not the text.

### 0.12.0 (2026-09-06)

- Fixed: A package that reappeared after a database hiccup kept datapoints without a name or description until the adapter was restarted.
- Fixed: A delivery window written as "September 6, 2026 14:30" was ignored, so window, estimate and the count of packages expected today stayed empty for those carriers.
- New: The documentation explains why a delivery window can stay empty, and an unreadable date from the carrier can now be reported so the format gets added.
- New: The last known location of a package explains itself in the object tree: it is where the carrier last scanned it, not a live position.

### 0.11.1 (2026-09-04)

- Fixed: The last-changed timestamp of a package kept its old label and had no description as long as the package did not move.

## License

MIT License

Copyright (c) 2026 krobi <krobi@power-dreams.com>

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

---

_Developed with assistance from Claude.ai_