---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sevenio/README.md
title: ioBroker.sevenio
hash: fVC94uHk32BrzxkvGGvqSOFaItPhWtl303RIrqnfcOI=
---
![Logo](../../../en/adapterref/iobroker.sevenio/admin/sevenio.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.sevenio.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sevenio.svg)
![Anzahl der Installationen](https://iobroker.live/badges/sevenio-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/sevenio-stable.svg)

# IoBroker.sevenio
**Tests:** ![Test und Freigabe](https://github.com/ipod86/ioBroker.sevenio/workflows/Test%20and%20Release/badge.svg)

## IoBroker-Adapter für seven.io
Dieser Adapter verbindet ioBroker mit der SMS- und Kommunikations-API. Versenden Sie SMS und starten Sie Sprachanrufe mit Text-to-Speech direkt aus Ihren Automatisierungen, Blockly-Skripten oder JavaScript-Code heraus – inklusive Kontaktverwaltung, Zustellverfolgung, SMS-Abfrage und Kontostandsüberwachung.

---

## Merkmale
- **SMS senden** — Auslösung über Datenpunkt, Blockly-Block oder `sendTo()`
- **Flash-SMS** – die Nachricht erscheint direkt auf dem Bildschirm des Empfängers
- **Sprachanrufe (TTS)** – Vorlesen von beliebigen Texten über einen automatisierten Anruf
- **Zustellstatus** — automatische Prüfung ca. 60 Sekunden nach Versand, wird in einem dedizierten Bundesstaat gespeichert
- **Kontaktverwaltung** – Kontakte von seven.io als einzelne Datenpunkte synchronisieren; neue Kontakte direkt in ioBroker erstellen
- **Empfänger nach Namen** – Geben Sie anstelle einer Telefonnummer einen Kontaktnamen ein; der Adapter löst ihn automatisch auf.
- **Kontostandsabfrage** – konfigurierbares Intervall, Ergebnis als lesbarer Zustand verfügbar
- **Abfrage eingehender SMS** — Empfang eingehender SMS (erfordert eine gemietete virtuelle Nummer, siehe unten)
- **Blockly-Block** – sofort einsatzbereiter Block in der Kategorie „Senden an“ mit Kontrollkästchen für SMS und/oder Sprachanrufe
- **`sendTo()` API** — vollständige Skriptunterstützung für den JavaScript-Adapter

---

## Anforderungen
- Ein Konto bei [seven.io](https://www.seven.io)
- Ein gültiger API-Schlüssel (zu finden in Ihrem seven.io-Dashboard unter *Entwickler → API-Schlüssel*)

**Kostenmodell:**

- Das Versenden von SMS und Sprachanrufen erfolgt **pro Nutzung** – Sie zahlen nur pro Nachricht oder Anruf, es gibt keine monatliche Gebühr.
- **Zum Empfang eingehender SMS** ist eine virtuelle Telefonnummer erforderlich, die von seven.io gemietet wird (ca. 20 €/Monat). Ohne eine gemietete Nummer ist das Abfragen eingehender SMS nicht möglich.

**Privatnutzer:** seven.io ist primär ein Geschäftsdienst. Bei der Registrierung ist ein Firmenname erforderlich. Privatnutzer können einfach ihren eigenen Namen oder das Wort *Privat* in dieses Feld eintragen – seven.io hat bestätigt, dass dies zulässig ist.

---

## Konfiguration
| Einstellungen | Beschreibung | Standardwerte |
|---|---|---|
| **API-Schlüssel** | Ihr seven.io API-Schlüssel | *(erforderlich)* |
| **Standard-Absender-ID** | Absendername oder -nummer, die den Empfängern angezeigt wird. Maximal 11 alphanumerische **oder** 16 numerische Zeichen. Lassen Sie das Feld leer, um die Standardeinstellung Ihres seven.io-Kontos zu verwenden. Um Antworten zu ermöglichen, verwenden Sie `getReplies: true` pro Nachricht (Blockly oder `sendTo()`) – siehe [Eingehende SMS](#inbound-sms). | *(leer)* |
| **Abfrageintervall für eingehende SMS** | Wie oft (in Minuten) der Adapter auf neue eingehende SMS prüft. Auf `0` setzen, um die Funktion zu deaktivieren. | `0` |
| **Ländercode für die Preisgestaltung** | ISO-Ländercode (z. B. `DE`, `US`), um die SMS-Preise nur für dieses Land anzuzeigen. Leer lassen, um alle Länder anzuzeigen. | *(leer)* |
| **Ländercode für die Preisgestaltung** | ISO-Ländercode (z. B. `DE`, `US`), um die SMS-Preise nur für dieses Land anzuzeigen. Feld leer lassen, um alle Länder anzuzeigen. | *(leer)* |

---

## Datenpunkte
### `info`
| Bundesland | Typ | Beschreibung |
| `info.connection` | boolescher Wert | `true` wenn der Adapter die seven.io API erreichen kann |
| `info.connection` | boolean | `true`, wenn der Adapter die seven.io API erreichen kann |

### `account`
| Bundesland | Typ | Beschreibung |
| `account.balance` | Nummer | Aktueller Kontostand |
| `account.currency` | Zeichenkette | Währung (z. B. `EUR`) |
| `account.lastCheck` | Zeichenkette | ISO-Zeitstempel der letzten Saldenabfrage |
| `account.lastCheck` | Zeichenkette | ISO-Zeitstempel der letzten Kontostandsabfrage |

### `contacts`
| Bundesland | Typ | Beschreibung |
| `contacts.json` | Zeichenkette (JSON) | Vollständige Kontaktliste als JSON-Array |
| `contacts.count` | Nummer | Anzahl der Kontakte |
| `contacts.refresh` | Boolescher Wert | Auf `true` setzen, um eine sofortige Aktualisierung der Kontakte auszulösen |
| `contacts.new.name` | Zeichenkette | Name für einen neu zu erstellenden Kontakt |
| `contacts.new.number` | Zeichenkette | Telefonnummer für den neuen Kontakt (Format: `491234567890`, ohne `+`) |
| `contacts.new.save` | Boolescher Wert | Auf `true` setzen, um den Kontakt zu erstellen und die Liste zu aktualisieren |
| `contacts.list.<Name>` | Zeichenkette | Ein Bundesstaat pro Kontakt – der Bundesstaatsname ist der Anzeigename des Kontakts (z. B. `contacts.list.Max_Mustermann`), der Wert ist die Telefonnummer |
| `contacts.list.<Name>` | Zeichenkette | Ein Bundesland pro Kontakt – der Name des Bundeslandes ist der Anzeigename des Kontakts (z. B. `contacts.list.Max_Mustermann`), der Wert ist die Telefonnummer |

### `sms`
| Zustand | Typ | R/W | Beschreibung |
| `sms.to` | Zeichenkette | rw | Empfänger — Telefonnummer (`+491234567890`) **oder Kontaktname** (z. B. `Max Mustermann`) |
| `sms.from` | Zeichenkette | rw | Absender-ID überschreiben — leer = Standardwert aus den Einstellungen verwenden |
| `sms.text` | Zeichenkette | rw | Nachrichtentext (max. 1520 Zeichen / ~10 SMS-Teile) |
| `sms.flash` | Boolesch | rw | Als Flash-SMS senden (Nachricht wird direkt auf dem Bildschirm angezeigt) |
| `sms.getReplies` | Boolesch | rw | Gemeinsamer Adresspool aktivieren, damit der Empfänger antworten kann — Opt-in pro Nachricht, Standard `false` |
| `sms.send` | Boolescher Wert | rw | Auf `true` setzen, um zu senden — wird automatisch auf `false` zurückgesetzt |
| `sms.lastResult` | Zeichenkette (JSON) | r | Vollständige API-Antwort des letzten Sendeversuchs, einschließlich `statusText` |
| `sms.lastStatus` | Zeichenkette | r | Für Menschen lesbarer Status der letzten Sendung (z. B. `Success`, `Insufficient credits`) |
| `sms.lastDelivery` | Zeichenkette (JSON) | r | Zustellbericht abgerufen ca. 60 Sekunden nach dem Senden — enthält `id`, `to`, `status` (z. B. `DELIVERED`) |
| `sms.lastDelivery` | string (JSON) | r | Zustellbericht ca. 60 Sekunden nach dem Senden abgerufen — enthält `id`, `to`, `status` (z. B. `DELIVERED`) |

### `sms.inbound`
| Bundesland | Typ | Beschreibung |
| `sms.inbound.id` | Zeichenkette | Nachrichten-ID der zuletzt empfangenen SMS |
| `sms.inbound.from` | Zeichenkette | Absendernummer der zuletzt empfangenen SMS |
| `sms.inbound.text` | Zeichenkette | Textinhalt der zuletzt empfangenen SMS |
| `sms.inbound.timestamp` | Zeichenkette | Zeitstempel des SMS-Empfangs |
| `sms.inbound.timestamp` | Zeichenkette | Zeitstempel des SMS-Empfangs |

### `voice`
| Zustand | Typ | R/W | Beschreibung |
| `voice.to` | Zeichenkette | rw | Telefonnummer des Empfängers |
| `voice.from` | Zeichenkette | rw | Verifizierte Anrufernummer (muss in Ihrem seven.io-Konto registriert sein) |
| `voice.text` | Zeichenkette | rw | Vorzulesender Text (TTS), max. 10.000 Zeichen |
| `voice.ringtime` | Nummer | rw | Wie lange soll es klingeln, bevor aufgelegt wird (5–60 Sekunden, Standard 30) |
| `voice.send` | Boolescher Wert | rw | Auf `true` setzen, um den Aufruf zu starten — wird automatisch auf `false` zurückgesetzt |
| `voice.lastResult` | Zeichenkette (JSON) | r | Vollständige API-Antwort des letzten Aufrufversuchs |
| `voice.lastStatus` | Zeichenkette | r | Für Menschen lesbarer Status des letzten Aufrufs (z. B. `Success`, `Call failed`) |
| `voice.lastStatus` | Zeichenkette | r | Für Menschen lesbarer Status des letzten Anrufs (z. B. `Erfolg`, `Anruf fehlgeschlagen`) |

### `pricing`
| Bundesland | Typ | Beschreibung |
| `pricing.json` | Zeichenkette (JSON) | Vollständige Preisdaten von seven.io — SMS-Preise pro Netzwerk für das konfigurierte Land oder alle Länder |
| `pricing.price` | Nummer (€) | SMS-Preis für das konfigurierte Land — wird nur festgelegt, wenn eine Ländervorwahl konfiguriert ist |
| `pricing.lastUpdate` | Zeichenkette | ISO-Zeitstempel der letzten Preisabfrage |
| `pricing.refresh` | Boolescher Wert | Auf `true` setzen, um die Preisdaten sofort zu aktualisieren |
| `pricing.refresh` | Boolescher Wert | Auf `true` setzen, um die Preisdaten sofort zu aktualisieren |

### `stats` *(gleitender 30-Tage-Durchschnitt)*
Die Statistiken beziehen sich stets auf den Zeitraum **heute − 30 Tage → heute**. Sie werden einmalig beim Start des Adapters und bei manueller Auslösung abgerufen – es gibt keinen automatischen Aktualisierungstimer.

| Bundesland | Typ | Beschreibung |
|---|---|---|
| `stats.smsSent` | Anzahl | Gesamtzahl der in den letzten 30 Tagen versendeten ausgehenden SMS |
| `stats.inbound` | Anzahl | Gesamtzahl der in den letzten 30 Tagen empfangenen eingehenden SMS |
| `stats.totalCost` | Nummer | Gesamtkosten in EUR für die letzten 30 Tage |
| `stats.lastUpdate` | Zeichenkette | ISO-Zeitstempel des letzten Statistikabrufs |
| `stats.json` | Zeichenkette (JSON) | Rohdaten der Analyse, gruppiert nach Tag |
| `stats.refresh` | Boolescher Wert | Auf `true` setzen, um die Statistiken sofort zu aktualisieren |
| `stats.refresh` | Boolescher Wert | Auf `true` setzen, um die Statistiken sofort zu aktualisieren |

---

## Eingehende SMS
Um SMS-Antworten zu erhalten, benötigen Sie einen **numerischen Absender** – alphanumerische Namen (z. B. `MyCompany`) können keine Antworten direkt empfangen. Sie haben zwei Möglichkeiten:

### Option 1 — Gemeinsamer Pool (kostenlos, zum Testen und für gelegentliche Nutzung)
Übergeben Sie `getReplies: true` pro Nachricht (Blockly-Kontrollkästchen oder `sendTo()`-Parameter). seven.io weist dem Absender automatisch eine temporäre Shared-Pool-Nummer zu, sodass Antworten auch mit einer alphanumerischen Absender-ID funktionieren.

| | |
|---|---|
| **Kosten** | Kostenlos – es fallen lediglich die üblichen SMS-Versandkosten an |
| **Antwortzeitraum** | 48 Stunden nach Absenden |
| **Nummerstabilität** | Dieselbe Nummer wird innerhalb von 2 Wochen erneut getestet – keine Garantie |
| **Verfügbare Länder** | DE 🇩🇪 AT 🇦🇹 CH 🇨🇭 US 🇺🇸 PL 🇵🇱 |
| **Geeignet für** | Tests, geringes Benachrichtigungsaufkommen, nicht kritische Benachrichtigungen |

### Option 2 — Eigene Rufnummer für eingehende Anrufe (~20 €/Monat)
Mieten Sie eine virtuelle Rufnummer direkt in Ihrem seven.io-Dashboard. Antworten werden zuverlässig und dauerhaft zugestellt.

| | |
|---|---|
| **Kosten** | ~20 €/Monat |
| **Antwortfenster** | Unbegrenzt |
| **Zahlenstabilität** | Fest, immer die gleiche Zahl |
| **Verfügbare Länder** | Viele – siehe seven.io-Dashboard |
| **Geeignet für** | Laufende Kundenkommunikation, Produktion |

Konfigurieren Sie das Abfrageintervall in den Adaptereinstellungen. Setzen Sie den Wert auf `0`, um die eingehende Abfrage zu deaktivieren (z. B. wenn Sie stattdessen Webhooks verwenden).

**Mehrere Nachrichten pro Zyklus:** Wenn zwischen zwei Abfragen mehrere SMS eintreffen, verarbeitet der Adapter sie alle – die älteste zuerst. Jede Nachricht löst eine separate Zustandsänderung in `sms.inbound.text` aus, sodass jede Blockly-Regel oder JavaScript-Automatisierung, die diesen Zustand überwacht, einmal pro Nachricht ausgeführt wird. Die Datenpunkte spiegeln nach dem Zyklus immer die aktuellste Nachricht wider.

---

## Blockly
Nach der Installation des Adapters erscheint ein sofort einsatzbereiter Block in der Kategorie **sendTo** des ioBroker Blockly-Editors.

```
┌─ seven.io  |  SMS ☑  Voice call ☐ ─────────────┐
│  sender (optional)  [ ""                  ]      │
│  recipient          [ "+491234567890"     ]      │
│  message            [ "Alarm!"            ]      │
│  flash SMS ☐  replies (shared pool) ☐           │
│  ring time (s)  30                               │
│  instance  sevenio.0 ▼                           │
└──────────────────────────────────────────────────┘
```

- Aktivieren Sie **SMS**, um eine SMS zu senden
- Aktivieren Sie **Sprachanruf**, um einen automatisierten TTS-Anruf auszulösen.
- Aktivieren Sie **beide** Optionen, um gleichzeitig eine SMS zu senden und einen Anruf zu tätigen (parallel, ohne zusätzliche Verzögerung).
- **Antworten (gemeinsamer Pool)** — Wenn diese Option aktiviert ist, verwendet seven.io eine gemeinsam genutzte Poolnummer als Absender, damit der Empfänger antworten kann (siehe [Eingehende SMS](#inbound-sms)).
- Das Feld **Empfänger** akzeptiert eine Telefonnummer oder einen Kontaktnamen aus Ihrer seven.io-Kontaktliste.

---

## SendTo()-Skripting
Alle Funktionen sind über `sendTo()` im JavaScript-Adapter verfügbar.

**SMS senden:**

```javascript
sendTo('sevenio.0', 'send', {
    to: '+491234567890',   // or a contact name: 'Max Mustermann'
    text: 'Door opened!',
    flash: false,          // optional
    getReplies: true,      // optional — enable shared pool so recipient can reply
}, result => {
    console.log(result.statusText); // e.g. 'Success'
});
```

**Sprachanruf auslösen:**

```javascript
sendTo('sevenio.0', 'voice', {
    to: '+491234567890',
    text: 'Attention! Motion detected in the garage.',
    ringtime: 30,          // optional, 5–60 s
});
```

**Kontostand abrufen:**

```javascript
sendTo('sevenio.0', 'get_balance', {}, result => {
    console.log(result.amount, result.currency);
});
```

**Kontaktliste abrufen:**

```javascript
sendTo('sevenio.0', 'get_contacts', {}, contacts => {
    console.log(JSON.stringify(contacts));
});
```

**Kontakt erstellen:**

```javascript
sendTo('sevenio.0', 'create_contact', {
    name: 'Max Mustermann',
    number: '491234567890',   // without +
});
```

**Test-SMS (Senden Sie eine Testnachricht, um den API-Schlüssel zu verifizieren):**

```javascript
sendTo('sevenio.0', 'test_sms', { to: '+491234567890' }, result => {
    console.log(result.statusText);
});
```

**Testanruf:**

```javascript
sendTo('sevenio.0', 'test_voice', { to: '+491234567890' }, result => {
    console.log(result);
});
```

**Statistiken sofort aktualisieren:**

```javascript
sendTo('sevenio.0', 'get_stats', {}, result => {
    console.log(result); // raw analytics data
});
```

Alternativ kann der Datenpunkt `sevenio.0.stats.refresh` auf `true` gesetzt werden – der Adapter ruft dann automatisch neue Statistiken ab und setzt den Zustand auf `false` zurück.

**Verzögerte SMS (geplante Zustellung):**

```javascript
sendTo('sevenio.0', 'send', {
    to: '+491234567890',
    text: 'Good morning!',
    delay: '2026-12-24 08:00:00', // ISO datetime or Unix timestamp (seconds)
}, result => {
    console.log(result.statusText);
});
```

Der Parameter `delay` wird direkt an die seven.io-API weitergeleitet. Verwenden Sie eine ISO-Datums-/Zeitzeichenfolge (`YYYY-MM-DD HH:MM:SS`) oder einen Unix-Zeitstempel in Sekunden. Die Nachricht wird von seven.io in die Warteschlange gestellt und zum angegebenen Zeitpunkt zugestellt.

---

## SMS-Statuscodes
Der Status `sms.lastStatus` enthält eine für Menschen lesbare Übersetzung des seven.io-Statuscodes:

| Code | Bedeutung |
|---|---|
| 100 | Erfolg |
| 101 | Weiterleitung an das SMS-Center fehlgeschlagen |
| 201 | Ungültige Empfängernummer |
| 202 | Ungültige Absender-ID |
| 301 | Unzureichende Leistungspunkte |
| 403 | Absender ist auf der schwarzen Liste |
| 500 | Unbekannter Fehler |
| 700 | Netzwerk-Timeout |

---

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.1.2 (2026-07-22)
* (ipod86) Maintenance: fix io-package.json structure, improve CI and dependabot configuration

### 0.1.1 (2026-07-22)
* (ipod86) Fix: multiple inbound SMS per poll cycle now each trigger automations (processed oldest-first)

### 0.1.0 (2026-07-22)
* (ipod86) SMS sending via state, Blockly, and sendTo()
* (ipod86) Voice calls (TTS) via state, Blockly, and sendTo()
* (ipod86) Contact management — sync, create, send by name
* (ipod86) Inbound SMS polling with shared pool and own number support
* (ipod86) Delivery status check ~60 s after sending
* (ipod86) Account balance polling
* (ipod86) SMS pricing data with per-country price state
* (ipod86) Usage statistics (rolling 30-day window)

---

## License
MIT License

Copyright (c) 2026 ipod86 <david@graef.email>

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