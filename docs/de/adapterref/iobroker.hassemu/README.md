---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.hassemu
BADGE-stable: https://iobroker.live/badges/hassemu-stable.svg
BADGE-Installations: https://iobroker.live/badges/hassemu-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.hassemu
BADGE-Test and Release: https://github.com/krobipd/ioBroker.hassemu/actions/workflows/test-and-release.yml/badge.svg
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge
---
# hassemu — beliebige Webseiten auf Displays, die nur Home Assistant akzeptieren

Manche Wanddisplays sprechen ausschließlich mit einem Home-Assistant-Server. Sie durchlaufen
die HA-Einrichtung und zeigen danach ein HA-Dashboard — und sonst nichts. hassemu beantwortet
genau die Teile des HA-Protokolls, nach denen diese Displays fragen. Die Einrichtung geht
dadurch durch, und anschließend schickt der Adapter das Display auf die Webseite deiner Wahl:
eine VIS-Ansicht, ein Aura-Dashboard, Grafana, Node-RED, eine selbstgebaute Seite.

Der Adapter ist **keine** Home-Assistant-Anbindung. Es wird nichts aus HA importiert, und
keine ioBroker-Datenpunkte werden als HA-Geräte angeboten. Der Adapter stellt nur so viel
HA-Server dar, dass das Display ihn akzeptiert — und hält sich danach heraus.

Diese Seite ist die ausführliche Anleitung. Die [README](https://github.com/krobipd/ioBroker.hassemu/blob/main/README.md) ist die Kurzfassung.

## Voraussetzungen

- Node.js 22 oder neuer
- ioBroker js-controller 7.2.2 oder neuer
- ioBroker Admin 8.0.11 oder neuer
- Display und ioBroker im selben Netz

Nur eine hassemu-Instanz je Netz. Der Adapter lauscht auf Port 8123, weil HA-Clients genau
diesen Port erwarten; er ist nicht einstellbar — zwei Instanzen würden sich darum streiten.

## Einrichtung

### 1. Instanz anlegen

Adapter installieren, Instanz 0 starten. In den Instanz-Einstellungen musst du zunächst
nichts ändern: mDNS ist an, die Anmeldung ist aus, und der Adapter lauscht auf allen
Schnittstellen.

Hat dein ioBroker-Rechner mehrere Netzwerkkarten, stell **Auf Schnittstelle binden** auf die,
in der deine Displays hängen. Der Adapter kündigt sich unter dieser Adresse an — kündigt er
eine an, die das Display nicht erreicht, ist das der häufigste Grund dafür, dass die
Erkennung scheinbar klappt, die Verbindung danach aber nicht.

### 2. Server am Display eintragen

Am Display einen Home-Assistant-Server hinzufügen.

- **Mit mDNS** findet das Display den Server von allein. Er erscheint unter dem Namen aus
  **Dienstname** (Vorgabe `ioBroker`).
- **Ohne mDNS** — oder wenn das Display nicht sucht — die Adresse von Hand eintragen:
  `http://<IP-deines-ioBroker>:8123`. Es muss `http` sein, siehe
  [Anmeldung und dein Netz](#anmeldung-und-dein-netz).

### 3. Einrichtung abschließen

Das Display durchläuft jetzt die HA-Anmeldung. Ist die Anmeldung aus, klickst du einfach
durch. Ist sie an, gibst du Benutzernamen und Passwort aus den Instanz-Einstellungen ein.

Hinter diesem Klick tauschen Display und Adapter ein Zugangsmerkmal aus, und der Adapter
hinterlegt ein Erkennungsmerkmal (Cookie) auf dem Display. Das ist von da an die Identität
des Displays: Es übersteht Neustarts, Adresswechsel und Umbenennungen — deshalb behält ein
Display seine Seite, ohne neu eingerichtet zu werden.

### 4. Das Display wartet jetzt

Ist die Einrichtung durch, zeigt das Display eine kleine Seite mit einer Geräte-Kennung.
Diese Seite bedeutet: verbunden, aber noch keine Seite gewählt. Über die Kennung findest du
das Display im Objektbaum wieder.

### 5. Dem Display sagen, was es zeigen soll

Im ioBroker-Objektbaum das Display unter `hassemu.0.clients.<Kennung>` öffnen und **mode**
setzen:

- eines der gefundenen Dashboards aus der Auswahlliste nehmen, oder
- `Manuelle URL` wählen und die Adresse daneben in **manualUrl** eintragen.

Das Display lädt innerhalb von etwa 30 Sekunden neu.

Sollen alle Displays dieselbe Seite zeigen, nimm `hassemu.0.global.mode` (und
`global.manualUrl`) und schalte `global.enabled` ein, statt jedes Display einzeln zu setzen.

## Was ein Display anzeigt

Jedes Display trägt seinen eigenen **mode**. Der Adapter löst ihn bei jeder Anfrage auf:

| mode               | Was das Display bekommt                  |
| ------------------ | ---------------------------------------- |
| eine URL           | diese Seite                              |
| `Manuelle URL`     | was in `manualUrl` dieses Displays steht |
| `Globale URL`      | worauf `global.mode` hinausläuft         |
| `---` (keine Wahl) | die Warteseite mit der Geräte-Kennung    |

`global.mode` wird genauso aufgelöst, nur darf er selbst nicht `Globale URL` sein — das
zeigte auf sich selbst, und der Adapter weist den Schreibvorgang ab.

### Der Hauptschalter

`global.enabled` ist kein Zustand, in dem ein Display sein kann, sondern eine Sammelaktion
über alle:

- **Einschalten** setzt jedes Display auf `Globale URL`.
- **Ausschalten** setzt jedes Display zurück auf `---`.

Ausschalten stellt also **nicht** wieder her, was die Displays vorher hatten — es leert sie
alle. Danach die gewünschten Displays einzeln setzen. Neue Displays starten immer auf `---`,
nie auf einer Seite, die du für sie nicht ausgewählt hast.

## Was im Objektbaum liegt

```
hassemu.0.
├── info.
│   ├── connection      der Adapter läuft
│   ├── serverUuid      die Identität, an der die Displays den Server wiedererkennen
│   └── refreshUrls     Knopf: erneut nach Dashboards suchen
├── global.
│   ├── enabled         Hauptschalter (siehe oben)
│   ├── mode            die Seite für alle Displays, die auf Globale URL stehen
│   └── manualUrl       freie Adresse, genutzt wenn global.mode auf Manuelle URL steht
└── clients.
    └── <Kennung>       ein Eintrag je Display, benannt nach Hostname oder Adresse
        ├── mode        was dieses Display zeigt
        ├── manualUrl   freie Adresse, genutzt wenn mode auf Manuelle URL steht
        ├── resolvedUrl die Adresse, an die dieses Display tatsächlich geschickt wurde
        ├── ip          die Adresse, unter der das Display zuletzt gesehen wurde
        └── remove      Knopf: dieses Display vergessen
```

**serverUuid** ist gut zu kennen: Daran erkennen die Displays den Server wieder. Sie wird
einmal erzeugt und behalten, damit ein Adapter-Neustart für das Display nicht wie ein anderer
Server aussieht. Änderte sie sich, wollte sich jedes Display neu einrichten.

**remove** löscht den Eintrag und damit die Identität des Displays. Verbindet es sich das
nächste Mal, ist es ein neues und startet auf `---`. Gedacht für Displays, die du abgebaut
hast; Einträge, die 30 Tage nicht gesehen wurden, räumt der Adapter ohnehin selbst weg.

**resolvedUrl** beantwortet die Frage „wo ist dieses Display tatsächlich gelandet". Der Wert
ist nur lesbar und folgt jeder Änderung: Wählst du ein Dashboard, steht dessen Adresse drin;
steht das Display auf Globale URL, das Ergebnis der globalen Einstellung; nimmst du die Auswahl
zurück, ist er leer, weil das Display seine Startseite zeigt. Praktisch bei Displays auf Globale
URL — sonst müsstest du dich für das Ergebnis durch zwei Einstellungen arbeiten.

**ip** ist nur zur Information. Displays werden über ihr Erkennungsmerkmal identifiziert,
nicht über die Adresse — eine neue Adresse vom Router legt also keinen zweiten Eintrag an.

## Die drei Seiten des Adapters

Neben deinem Dashboard kann das Display drei Seiten zeigen, die vom Adapter selbst kommen.

**Die Warteseite** — Geräte-Kennung und ein Hinweis. Bedeutet: verbunden, keine Seite
gewählt. Sie lädt sich alle 15 Sekunden selbst neu und verschwindet damit von allein, sobald
du einen Modus setzt.

**„hassemu offline"** — der Adapter ist gestoppt oder nicht erreichbar. Das Display merkt es
nach etwa 1,5 Minuten, bietet einen Knopf zum Neuladen und kehrt von selbst zu deinem
Dashboard zurück, sobald der Adapter wieder da ist. Eine Einschränkung: Ein Display, das
startet, _während_ der Adapter aus ist, kann diese Seite nicht laden und zeigt stattdessen
seinen eigenen Verbindungsfehler.

**„Weiterleitungsziel nicht erreichbar"** — der Adapter läuft, aber die Seite, auf die er das
Display schickt, antwortet nicht. Ohne diese Karte sähst du nur Schwarz. Sie nennt die
Zieladresse und bietet Neuladen an; das Display kehrt von selbst zum Dashboard zurück, sobald
das Ziel wieder antwortet.

Der Adapter urteilt dabei zurückhaltend: **Jede** HTTP-Antwort zählt als erreichbar, auch
eine Anmeldeseite oder eine Fehlerseite — dort läuft ja ein Server. Nur eine abgelehnte
Verbindung oder eine Zeitüberschreitung lässt die Karte erscheinen. Zertifikate prüft er
nicht, denn bei einem Dashboard zu Hause sind selbstsignierte Zertifikate der Normalfall.

## Woher die Auswahlliste kommt

Der Adapter durchsucht den ioBroker-Rechner nach Seiten, die sich anzubieten lohnen:

- **VIS und VIS-2** — ein Eintrag je Projekt und einer je Ansicht darin, für jede vorhandene
  `web`-Instanz
- **Aura** — ein Eintrag je laufender Instanz, mit dem Port, auf den diese Instanz
  tatsächlich eingestellt ist
- **Admin-Kacheln** — alles, was ein Adapter für die ioBroker-Startseite anbietet (Grafana,
  jarvis, material, deine eigene Web-Oberfläche …)

Gesucht wird beim Start und immer dann, wenn eine Adapter-Instanz dazukommt, verschwindet
oder umkonfiguriert wird. Nach dem Anlegen oder Umbenennen eines VIS-2-Projekts oder einer
Ansicht setzt du **info.refreshUrls** auf `true`, um ohne Adapter-Neustart neu zu suchen.

Wird etwas nicht gefunden, ist es nicht verloren: `Manuelle URL` wählen und die Adresse
einsetzen. Adressen mit `javascript:`, `data:` oder `file:` weist der Adapter ab — das sind
keine Seiten, das ist Programmcode.

## Anmeldung und dein Netz

**Alles auf Port 8123 läuft unverschlüsselt über HTTP.** Das ist keine Abkürzung, sondern
das, was die HA-Clients auf diesem Weg verlangen; HTTPS machen sie hier nicht mit. Daraus
folgen zwei Dinge, die man klar sagen sollte:

- Behandle Port 8123 als etwas, das nur in dein Heimnetz gehört. Leite ihn nicht aus dem
  Internet herein.
- Ist die Anmeldung an, laufen Benutzername, Passwort und Zugangsmerkmale unverschlüsselt
  durch dein Netz. Die Anmeldung hält andere Geräte in deinem Netz von der HA-Schnittstelle
  fern — sie ist kein Schutz gegen eine Öffnung ins Internet.

**Reverse-Proxy-Kopfzeilen vertrauen** bleibt aus, solange nicht wirklich ein Reverse-Proxy
davor steht, der die Verschlüsselung beendet und die vom Client mitgeschickten
`X-Forwarded-*`-Kopfzeilen entfernt. Ohne einen solchen eingeschaltet, kann jedes Gerät bei
**jeder einzelnen Anfrage** eine andere Adresse behaupten. Der Adapter protokolliert dann
falsche Adressen, und seine Grenze für neue Display-Einträge je Adresse begrenzt nichts mehr.
Seit Version 1.40.0 gibt es deshalb eine zweite Grenze, die nicht an der Adresse hängt —
höchstens 100 neue Display-Einträge pro Stunde insgesamt. Eine Fehlkonfiguration kann die
Datenbank damit nicht mehr vollschreiben. Displays funktionieren weiter, solange diese Grenze
greift; sie bekommen nur keine gespeicherte Identität, bis der Schwall vorbei ist. Die Grenze
deckelt den Schaden — sie macht die Einstellung nicht sicher.

## Ports

| Port       | Richtung  | Wofür der Adapter ihn braucht                     |
| ---------- | --------- | ------------------------------------------------- |
| 8123 / TCP | eingehend | die HA-Schnittstelle, mit der das Display spricht |
| 5353 / UDP | eingehend | mDNS, damit Displays den Server von allein finden |

## Häufige Fragen

**Kann ich zwei Instanzen betreiben?** Nein. Port 8123 ist von den HA-Clients vorgegeben,
also betreibt ein Rechner im Netz hassemu.

**Muss das Display dauerhaft mit dem Adapter verbunden bleiben?** Ja. Es holt seine Seite
über den Adapter, und die Offline-Seite wie auch die Ziel-Prüfung hängen daran. Stoppt der
Adapter, zeigt das Display die zuletzt geladene Seite weiter, bis es das nächste Mal
nachfragt.

**Kann ich ein Display umbenennen?** Ja — das Objekt `clients.<Kennung>` im Objektbaum
umbenennen. Der Adapter behält deinen Namen und überschreibt ihn nicht, auch nicht, wenn sich
Adresse oder Hostname des Displays ändern.

**Warum gibt es zwei Einträge für dasselbe Display?** Das Display hat sein Erkennungsmerkmal
nicht zurückgeschickt — meist nach einem Zurücksetzen auf Werkseinstellungen, einem geleerten
Browser-Speicher oder in einem Privatmodus, der Cookies verwirft. Den alten Eintrag über
seinen `remove`-Knopf entfernen. Die Ursache liegt am Display, nicht am Adapter.

**Brauche ich ein installiertes Home Assistant?** Nein. Der Adapter beantwortet das
HA-Protokoll selbst. In diesem Aufbau gibt es nirgends ein Home Assistant.

**Kann das Display ioBroker steuern?** Nein. Über die Verbindung laufen die Einrichtung und
die Seitenadresse, sonst nichts. Es werden keine Datenpunkte angeboten und keine Befehle
angenommen.

## Herausfinden, was schiefgelaufen ist

Stell die Protokollstufe der Instanz auf `debug`. Der Adapter schreibt dann jede Entscheidung
mit: welches Display erkannt wurde, wie die Anmeldung lief, welche Dashboards gefunden
wurden, und wie er den Modus je Anfrage zu einer Adresse aufgelöst hat. Die meisten Probleme
lassen sich direkt aus diesem Protokoll ablesen.

Ist mDNS an, im Protokoll steht aber keine Zeile `mDNS: Broadcasting`, ging die Ankündigung
nicht raus — meist, weil etwas anderes Port 5353 belegt. Dann mDNS ausschalten und die
Adresse am Display von Hand eintragen; alles Übrige bleibt gleich.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 1.43.1 (2026-09-07)

- Changed: the button that removes a display now carries a description — it deletes the display's folder and all its states, and the display returns as a new entry on its next request

### 1.43.0 (2026-09-06)

- Fixed: taking a display's choice back (mode `---`, or turning the master switch off) now reaches the display — until now it kept the dashboard it had until someone reloaded it by hand
- Fixed: a display that lost power no longer holds up the adapter's shutdown for 30 seconds
- Fixed: VIS projects are found on every VIS instance, not only on `vis.0` / `vis-2.0`
- Fixed: upgrading from a pre-1.1.1 version no longer overwrites the whole instance configuration while removing the old URL setting
- New: every display now shows the address it was actually sent to, so you can see at a glance where a display landed without walking through the global and per-display settings yourself
- Changed: `info.serverUuid` and `global.enabled` carry clearer labels, and the per-display manual URL now has a description

### 1.42.0 (2026-09-04)

- Fixed: a leftover setting from older versions is now removed from the instance completely instead of only being switched off — switched off, it stayed behind for good

### 1.41.0 (2026-09-03)

- Fixed: renamed datapoints now reach installations that already exist — until now a changed name or description only ever showed up on a fresh install
- Fixed: the object tree kept outdated labels ("Known display clients", "Client IP", "Forget this client") and showed a developer note in the global manual URL name
- Changed: datapoint names now appear in your ioBroker language throughout the object tree, including the names the displays report for themselves
- New: full user documentation in English and German covering setup, the object tree and troubleshooting, shown by the ioBroker documentation portal

### 1.40.0 (2026-09-02)

- Fixed: with trustProxy enabled but no sanitising reverse proxy in front, a single device could create unlimited display entries — a global ceiling now caps this

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

<!-- prettier-ignore -->
*Developed with assistance from Claude.ai*