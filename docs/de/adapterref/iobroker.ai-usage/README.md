---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.ai-usage
BADGE-stable: https://iobroker.live/badges/ai-usage-stable.svg
BADGE-Installations: https://iobroker.live/badges/ai-usage-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.ai-usage
BADGE-Test and Release: https://github.com/krobipd/ioBroker.ai-usage/actions/workflows/test-and-release.yml/badge.svg
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge
---
# ioBroker.ai-usage

Überwacht Verbrauch, Limits und Kosten deiner KI-Konten und schreibt sie in
schreibgeschützte ioBroker-Datenpunkte. Der Adapter **liest nur** — er ruft nie ein
Modell auf, ändert beim Anbieter nichts und schickt deine Daten nirgendwohin.

---

## Was er überwachen kann

| Konto                               | Was du bekommst                                                                                                                                                    | Wie es verbunden wird                                                                                                                                                                                     |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Claude-Abo** (Pro / Max)          | 5-Stunden- und Wochen-Fenster mit Prozent und Reset-Zeit, Modell-Fenster, Extra-Guthaben und die dafür ausgegebenen Kosten                                         | Anmeldung mit deinem eigenen Anthropic-Konto: Link öffnen, anmelden, Code zurück einfügen                                                                                                                 |
| **ChatGPT-Abo** (Plus / Pro, Codex) | 5-Stunden- und Wochen-Fenster, zusätzliche Fenster je Oberfläche, Guthaben, kaufbare Limit-Reset-Gutscheine                                                        | Der Adapter zeigt einen kurzen Code, den du auf der OpenAI-Seite eintippst. Deine eigene Codex-Anmeldung wird nicht angefasst                                                                             |
| **Google-Gemini-Abo** (Pro / Ultra) | Die Modell-Kontingente, die Google meldet                                                                                                                          | Link öffnen und anmelden. Google leitet auf `localhost` zurück, **dein Browser zeigt also eine Fehlerseite — das ist so gewollt**. Die komplette Adresse aus der Adresszeile kopieren und zurück einfügen |
| **OpenRouter**                      | Verbrauchtes Guthaben, Grenze, Rest, Prozent                                                                                                                       | Gespeicherten Schlüssel aus dem zentralen Admin-Speicher wählen                                                                                                                                           |
| **DeepSeek**                        | Guthaben (gewährt und aufgeladen getrennt) und ob es noch für Anfragen reicht                                                                                      | Gespeicherten Schlüssel wählen                                                                                                                                                                            |
| **OpenAI-Organisation**             | Kosten heute und diesen Monat, Monatsend-Prognose, heutige Token je Modell                                                                                         | Braucht einen **Admin-Schlüssel** deiner Organisation                                                                                                                                                     |
| **Anthropic-Organisation**          | Kosten heute und diesen Monat, Monatsend-Prognose, heutige Token — Anthropic meldet ungecachte Eingabe-Token, Treffer aus dem Prompt-Cache stehen also nicht darin | Braucht einen **Admin-Schlüssel** deiner Organisation                                                                                                                                                     |

Die drei Abo-Endpunkte sind die, die auch die Programme der Anbieter selbst benutzen. Sie
sind **nicht offiziell dokumentiert** und können sich jederzeit ändern. Claude wurde an
einem echten Abo getestet; ChatGPT und Google sind quellen-belegt gebaut, liefen aber nie
an einem echten Konto — melde dich bitte über ein Issue, wenn etwas nicht stimmt.

---

## Voraussetzungen

- Node.js >= 22
- ioBroker js-controller >= 7.2.2
- **ioBroker Admin >= 8.0.11** — der Adapter liest API-Schlüssel aus dem zentralen
  Zugangsdaten-Speicher des Admin, statt sie noch einmal abzufragen

---

## Einrichten

1. Adapter installieren und die Instanz-Einstellungen öffnen.
2. Die Seite zeigt **eine Liste**: zuerst die drei Abos, danach eine Zeile pro
   KI-Schlüssel, den du unter **Admin → Einstellungen → Zugangsdaten** hinterlegt hast.
3. Einschalten, was überwacht werden soll. Jede Zeile hat ihre eigene **Warnschwelle**
   (10–100 %, Standard 80 %).
4. Bei einem Abo klappt unter der Zeile der Anmelde-Bereich auf und führt durch genau den
   Weg, den dieser Anbieter erzwingt. **Vorher speichern** — die Anmeldung läuft über die
   laufende Instanz.
5. Nach erfolgreicher Anmeldung wird das Konto sofort abgefragt; du musst nicht auf den
   nächsten Zyklus warten.

### Optionen

| Option                 | Wirkung                                                                                                               | Standard |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------- | -------- |
| **Abfrage-Intervall**  | Wie oft jedes Konto abgefragt wird, in Sekunden. Minimum 60 s                                                         | 300 s    |
| **Benachrichtigungen** | Eine ioBroker-Meldung, wenn ein Konto seine Warnschwelle überschreitet oder die Zugangsdaten nicht mehr funktionieren | ein      |

Die Konten werden zeitlich versetzt abgefragt. Antwortet ein Anbieter mit „zu viele
Anfragen", geht genau dieses Konto in einen wachsenden Backoff (10 Minuten, verdoppelnd
bis zu einer Stunde) — die zuletzt gelesenen Werte bleiben dabei stehen.

---

## Der Objektbaum

Ein Geräte-Knoten pro Konto, bei jedem Anbieter gleich benannt:

```
ai-usage.0
├─ info.connection            mindestens ein Konto liefert Daten
├─ <konto>                    z. B. claude, chatgpt, gemini, <name>-api
│  ├─ info.unreach            das Offline-Kennzeichen; steuert das Symbol im Objektbaum
│  ├─ info.error              der Grund im Klartext; leer, solange alles läuft
│  ├─ info.lastUpdate         letzte erfolgreiche Abfrage
│  ├─ warning                 über der Warnschwelle des Kontos
│  ├─ limitReached            bei 100 %
│  ├─ limits.<fenster>.percent     Auslastung eines Limit-Fensters
│  ├─ limits.<fenster>.resetAt     wann es zurückgesetzt wird (leer, wenn keins läuft)
│  ├─ limits.<fenster>.active      ob dieses Fenster gerade das gültige Limit ist
│  ├─ credits.*               verbraucht / Grenze / Rest / Prozent, gewährt / aufgeladen,
│  │                          und ob das Guthaben noch für Aufrufe reicht
│  ├─ costs.*                 heute / Monat / gesamt / Monatsend-Prognose
│  ├─ tokens.*                Eingabe- und Ausgabe-Token heute
│  └─ models.<modell>.*       Token je Modell
└─ total
   ├─ costs.today / month / projectedMonth      summiert über alle USD-Konten
   ├─ maxLimitPercent         das vollste Konto (Limit-Fenster oder Budget)
   ├─ warningsActive          Konten über ihrer Schwelle
   ├─ limitReached            irgendein Konto bei 100 %
   ├─ accountsReachable       Konten, die gerade liefern
   └─ accounts                Konten, die du eingeschaltet hast
```

**Einmal angelegte Datenpunkte bleiben.** Lässt ein Anbieter ein Feld zeitweise weg,
verschwindet der Datenpunkt nicht — Zeitstempel werden stattdessen leer geschrieben.
Entfernt wird nur ein ganzes Fenster oder Modell, das der Anbieter gar nicht mehr meldet;
und ein ausgeschaltetes Konto verliert seinen Knoten vollständig.

**`total.costs` summiert nur echtes Geld gleicher Währung** — Stück-Zähler
(Anfrage-Guthaben, Reset-Gutscheine) und Fremdwährungen bleiben bewusst draußen.

---

## Warnungen — und was fürs Konto spricht

Nur ein **plan-weites** Fenster löst die Warnung eines Kontos aus. Ein Modell-Kontingent
bekommt eigene Datenpunkte, aber nie den Alarm: ein Modell, das du nie anfasst, kann
dauerhaft auf 100 % stehen, und ein Alarm, der nie ausgeht, ist schlimmer als keiner.
Google ist die Ausnahme — dort gibt es überhaupt kein plan-weites Fenster, also spricht
das vollste Modell-Kontingent fürs Konto, und die Meldung nennt das Modell.

Das gewährte Budget konkurriert mit den Fenstern: ein Konto, dessen Geld fast verbraucht
ist, steht genauso still wie eines mit vollem Zeitfenster. Die höhere der beiden Seiten
gibt der Warnung ihre Beschriftung.

---

## Online-Status

`info.unreach` heißt **„dieses Konto liefert nicht"** und steuert das Verbindungssymbol
neben dem Konto im Objektbaum:

| Lage                                                    | Symbol                                 | `info.error`                         |
| ------------------------------------------------------- | -------------------------------------- | ------------------------------------ |
| Alles läuft                                             | grün                                   | leer                                 |
| Vom Anbieter gedrosselt                                 | grün — die letzten Werte gelten weiter | sagt es, mit der Wartezeit           |
| Anmeldung abgelehnt                                     | rot                                    | „Sign-in rejected — …"               |
| Der Dienst meldet einen Defekt                          | rot                                    | „The AI service reports a fault — …" |
| Gar nicht erreichbar                                    | rot, nach drei Versuchen               | „Not reachable after N attempts — …" |
| Instanz gestoppt, oder gestartet und noch nicht gefragt | rot                                    | `Unknown`                            |

---

## Datenschutz und Zugangsdaten

- Abo-Token gehören dem Adapter allein: sie liegen verschlüsselt im Instanz-Datenordner,
  nur für den Eigentümer lesbar. Der Adapter liest und schreibt **niemals** die Dateien
  deiner eigenen Programme (`~/.codex/auth.json`, `oauth_creds.json`) — deren
  Auffrisch-Token rotieren, zwei Erneuerer würden sich gegenseitig abmelden.
- API-Schlüssel kommen aus dem zentralen Admin-Speicher und werden nicht kopiert.
- Die Claude-Anmeldung fragt nur das Profil-Recht ab — das Token kann keine API-Schlüssel
  anlegen und keine Modelle aufrufen.
- Der Adapter spricht mit den KI-Anbietern und mit sonst niemandem.

---

## Wenn etwas klemmt

**Der Anmelde-Knopf tut nichts / die Zeile dreht sich endlos.**
Erst speichern, und sicherstellen, dass die Instanz läuft — die Anmeldung ist ein Gespräch
mit dem laufenden Adapter.

**Google zeigt nach der Anmeldung eine Fehlerseite.**
Das ist so gewollt und der Grund, warum der Weg überhaupt funktioniert. Die **komplette
Adresse** aus der Adresszeile kopieren und in das Feld einfügen.

**„Nicht angemeldet", obwohl du dich angemeldet hast.**
Die gespeicherte Anmeldung wurde vom Anbieter abgelehnt (zurückgezogenes oder abgelaufenes
Auffrisch-Token). Melde dich neu an — die Zeile sagt es dir, statt eine Verbindung
vorzutäuschen.

**Ein OpenAI- oder Anthropic-Konto liefert nichts.**
Diese Berichte brauchen einen **Organisations-Admin-Schlüssel**. Ein Privatkonto ohne
Organisation kann sie gar nicht erzeugen — nimm dafür das Claude-Abo.

**Claude antwortet mit „zu viele Anfragen".**
Intervall erhöhen. Der Adapter meldet sich so an, wie es Claudes eigene Werkzeuge tun, und
bremst sich selbst — bei sehr kurzen Intervallen über mehrere Programme hinweg kann es
trotzdem zusammenkommen.

---

## Unterstützung

Fragen, Fehler und Ideen: <https://github.com/krobipd/ioBroker.ai-usage/issues>

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.12.1 (2026-09-07)

- Fixed: The last-update stamp of an account no longer moves forward while the provider is only throttling — it dates the values standing next to it, so you can see how old they really are
- Improved: Twenty-five more datapoints explain themselves in the object tree — what "today" means (the provider counts it in UTC), and why the cost totals can be lower than the accounts show

### 0.12.0 (2026-09-06)

- Fixed: An account that has not been signed in yet no longer reports a rejected sign-in — no warning, no notification, and the settings page keeps offering the sign-in button
- Fixed: An account whose API key is missing or unreadable is now shown as not delivering, instead of leaving its old values standing as though they were current
- Fixed: An answer arriving while the adapter shuts down can no longer mark an account as online again after the shutdown wrote it offline
- Fixed: A throttled account counts as delivering everywhere now — the connection icon and the "reachable accounts" total no longer contradict each other
- Fixed: A limit the provider reports as empty is no longer shown as 0 % used, and a Google quota without a value no longer reads as completely used up
- Fixed: A rejected ChatGPT sign-in now says so at once instead of leaving you waiting for a quarter of an hour, and a Google account keeps delivering when one route is unavailable
- Fixed: A Google account without an AI subscription says so, instead of asking for a sign-in that cannot change the answer
- New: Every limit window shows whether it is the limit currently in force — with Claude the provider states it, elsewhere it is the window that speaks for the account
- Improved: An account is reported as at its limit when the provider says the window is closed, not only when the percentage happens to reach 100
- Improved: A window's reset time is written to the minute, so a recording of it no longer gains an entry on every single query, only on real changes
- Improved: An account that is delivering again says so in the log, instead of leaving the warning about its outage standing as the last word on it
- Improved: The settings page no longer asks the adapter for every status every four seconds — the values now arrive on their own as they change
- Changed: "Balance sufficient for calls" now sits under credits, where it belongs; the datapoint at the old place is removed automatically
- Changed: Each account node shows the readable provider name instead of the internal one — "Claude Max (Claude)" instead of "Claude Max (claude-sub)"
- Fixed: A per-model folder is now named in your ioBroker language as well, instead of carrying the provider's bare model identifier as its only name
- New: The datapoints whose meaning is not obvious from their name now carry a short explanation in eleven languages, shown in the object tree

### 0.11.0 (2026-09-05)

- Fixed: Signing in from the instance settings works again — a leftover setting from an earlier version had silently closed the adapter's message channel, so none of the three flows reached it
- Fixed: A subscription whose stored sign-in was rejected no longer claims to be signed in — the row now offers the sign-in again instead of showing a green check next to an error
- Fixed: The status badge of an account no longer blanks out for a moment when a single status read is missed — a hiccup in the settings page is not an account without a status
- Fixed: A stored credential whose name sorts high in the alphabet is no longer missing from the account list in the instance settings
- Fixed: The settings page falls back to English for a browser language the adapter does not ship, instead of passing that language on unchecked
- Improved: All object names are now available in eleven languages instead of English only, and a renamed object reaches installations that already exist
- Improved: ChatGPT usage is read with the identity that endpoint expects, the way the Claude query already did — fewer rejected requests on that account
- Improved: Monthly cost reports can no longer be cut short in silence — a report that does not fit is reported in the log instead of producing a figure that is too low
- Changed: "Highest account utilisation" says what it always measured — the fullest limit window **or** the account's remaining budget

### 0.10.0 (2026-09-01)

- Fixed: The reset-time datapoint of a limit window no longer disappears and reappears — it stays and simply empties while no window is running
- Fixed: The settings page no longer shows the sign-in screen to a signed-in account, and its rows load without waiting for the credential storage scan
- Improved: Claude usage is read with far fewer rejections — the query now identifies itself the way the endpoint expects
- Changed: New Claude sign-ins request only the profile permission — the stored access can no longer create API keys or run models
- New: ChatGPT accounts show their purchasable limit-reset credits — how many are available and when the next one expires
- Improved: An unreadable provider answer is now reported as a service fault instead of a missing connection

### 0.9.3 (2026-08-27)

- Fixed: The first start after updating no longer leaves a warning in the log

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