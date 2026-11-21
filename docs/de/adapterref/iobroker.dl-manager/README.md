---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.dl-manager
BADGE-stable: https://iobroker.live/badges/dl-manager-stable.svg
BADGE-Installations: https://iobroker.live/badges/dl-manager-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.dl-manager
BADGE-Test and Release: https://github.com/krobipd/ioBroker.dl-manager/actions/workflows/test-and-release.yml/badge.svg
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge
chapters: {"pages":{"de/adapterref/iobroker.dl-manager/README.md":{"title":{"de":"ioBroker.dl-manager — Benutzerdokumentation"},"content":"de/adapterref/iobroker.dl-manager/README.md"},"de/adapterref/iobroker.dl-manager/datapoints.md":{"title":{"de":"Datenpunkte"},"content":"de/adapterref/iobroker.dl-manager/datapoints.md"},"de/adapterref/iobroker.dl-manager/faq.md":{"title":{"de":"Häufige Fragen"},"content":"de/adapterref/iobroker.dl-manager/faq.md"}}}
---
# ioBroker.dl-manager — Benutzerdokumentation

Der Adapter verbindet ioBroker mit deinen Download-Programmen. Jedes Programm, das du einträgst, wird ein Gerät, jeder
seiner Downloads ein Kanal mit eigenen Datenpunkten. Alles, was der Adapter zeigt, kommt vom Programm selbst; der
Adapter lädt nie selbst etwas herunter und bittet ein Programm nur dann, Dateien zu löschen, wenn der Schalter _Beim
Entfernen auch die Dateien löschen_ es sagt.

## Unterstützte Programme

| Programm                       | Zugang                                                | Was du brauchst                                                                                                                                                                                           |
| ------------------------------ | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JDownloader 2 (lokal)          | lokale Schnittstelle, Port 3128                       | In JDownloader: Einstellungen → Erweiterte Einstellungen → `DeprecatedApiEnabled` an; läuft ioBroker auf einem anderen Rechner oder Container, zusätzlich `DeprecatedApiLocalhostOnly` aus                |
| JDownloader 2 (My.JDownloader) | die My.JDownloader-Cloud                              | deine My.JDownloader-E-Mail und dein Passwort — den JDownloader wählst du aus deinem Konto                                                                                                                |
| qBittorrent                    | Weboberfläche, Port 8080                              | Benutzer und Passwort der Weboberfläche oder einen API-Schlüssel (ab qBittorrent 5.2)                                                                                                                     |
| Transmission                   | RPC, Port 9091                                        | Benutzer und Passwort, falls gesetzt; der ioBroker-Rechner muss in `rpc-whitelist` erlaubt sein                                                                                                           |
| Deluge                         | Weboberfläche, Port 8112                              | das Passwort der Weboberfläche                                                                                                                                                                            |
| SABnzbd                        | API, Port 8080                                        | den API-Schlüssel (Config → General)                                                                                                                                                                      |
| NZBGet                         | API, Port 6789                                        | Steuer-Benutzer und Passwort                                                                                                                                                                              |
| aria2                          | JSON-RPC, Port 6800                                   | das RPC-Geheimnis (`--rpc-secret`)                                                                                                                                                                        |
| pyLoad                         | API, Port 8000                                        | einen API-Schlüssel (ab pyLoad 0.5.0b3.dev97) oder Benutzer und Passwort                                                                                                                                  |
| rqbit                          | HTTP-API, Port 3030                                   | Benutzer und Passwort nur, wenn rqbit mit `RQBIT_HTTP_BASIC_AUTH_USERPASS` läuft; rqbit antwortet nur auf 127.0.0.1, außer es startet mit `--http-api-listen-addr 0.0.0.0:3030` (das Docker-Image tut es) |
| rTorrent                       | XML-RPC über einen Webserver, Port 8080, Pfad `/RPC2` | die Adresse des Webservers vor rTorrent (nginx, lighttpd, das ruTorrent-Image) und seine HTTP-Anmeldung, falls er eine verlangt                                                                           |
| Tribler                        | REST-API, Port 20100                                  | den API-Schlüssel; einen festen Port (`CORE_API_PORT` oder `api.http_port` in Triblers `configuration.json`) und `api.http_host` 0.0.0.0, wenn ioBroker auf einem anderen Rechner läuft                   |
| Flood                          | REST-API, Port 3000                                   | den Benutzer, mit dem du dich bei Flood anmeldest — nicht die Anmeldung des Torrent-Programms dahinter; keinen, wenn Flood mit `--auth none` läuft                                                        |
| Vuze                           | Plugin Web Remote, Port 9091                          | Benutzer und Passwort des Plugins — wie installiert der Benutzer `vuze` und der Zugangscode des Pairings                                                                                                  |
| µTorrent                       | Weboberfläche, Port 8080 (µTorrent Server)            | Benutzer und Passwort des Web-Zugriffs (Einstellungen → Erweitert → Web-Zugriff); den ioBroker-Rechner in der Liste erlaubter IPs, falls es eine gibt                                                     |
| Hadouken                       | JSON-RPC, Port 7070, Pfad `/api`                      | Benutzer und Passwort aus `http.auth.basic` in `hadouken.json` — admin und admin, wenn keine gesetzt sind                                                                                                 |
| Download Station               | DSM-Web-API, Port 5000 (HTTPS 5001)                   | ein DSM-Konto mit dem Recht, Download Station zu nutzen, und ohne 2-Schritt-Verifizierung; nur ein Konto, das Download Station verwaltet, liest und setzt das Upload-Limit                                |
| NZBVortex                      | Network-API, HTTPS, Port 4321                         | Preferences → Remote → Web interface an und den API-Schlüssel; die Adresse von ioBroker in seiner IP-Whitelist, falls die an ist                                                                          |
| Freebox                        | Freebox-OS-API, HTTPS, `mafreebox.freebox.fr`         | nichts einzutippen: beim Speichern der Karte bittet der Adapter die Freebox um Zugang, und du bestätigst ihn am Display der Freebox — aus dem eigenen Netz der Freebox                                    |

**Zur lokalen JDownloader-Schnittstelle:** Sie hat kein Passwort. Wer im Netz den Port erreicht, kann JDownloaders
Einstellungen ändern oder ihn beenden. Nutze sie nur, wenn JDownloader auf dem ioBroker-Rechner oder im selben
Docker-Netz läuft; sonst nimm My.JDownloader.

**Zu NZBVortex:** Es spricht HTTPS mit einem eigenen, selbstsignierten Zertifikat, das der Adapter ungeprüft annimmt.
Ist SSL in NZBVortex abgeschaltet, schalte auch auf seiner Karte HTTPS ab.

**Zur Freebox:** Lass `mafreebox.freebox.fr` als Host stehen — der Adapter prüft das Zertifikat der Freebox gegen die
eigenen Stammzertifikate von Free, und es gilt für diesen Namen, nicht für die IP-Adresse der Box. Mit abgeschaltetem
HTTPS antwortet die Freebox auf Port 80. Der Zugang, den die Freebox gewährt, wird verschlüsselt gespeichert wie ein
Passwort. Fehlt der App _ioBroker dl-manager_ das Recht auf die Downloads, gewähre es in Freebox OS (Paramètres de la
Freebox › Gestion des accès › Applications) und schalte die Karte der Freebox aus und wieder ein. Hast du die App auf
der Freebox entfernt, hake im Dialog der Karte _Neu mit der Freebox koppeln_ an und bestätige noch einmal am Display.

## Einrichtung

1. Adapter installieren und die Instanz-Einstellungen öffnen. Die Programme sind Karten des Gerätemanagers; sie
   erscheinen, solange die Instanz läuft.
2. **+** drücken, Programm wählen. Sein Dialog fragt nur, was dieses Programm braucht: einen Namen, Adresse und Port
   (leer = der Standard des Programms) und seine Anmeldung. Bei JDownloader _Lokal im Netz_ oder _Über My.JDownloader_
   wählen; mit My.JDownloader meldest du dich an und wählst deinen JDownloader aus einer Liste.
3. Übernehmen. Das Programm erscheint sofort als Karte und als Gerät unter `dl-manager.0` — die Instanz startet nicht
   neu. Der Name ist nur die Beschriftung von Karte und Gerät. Die Objekt-ID vergibt der Adapter: das Programm und der
   Rechner, auf dem es läuft (`qbittorrent-nas`, `transmission-192-168-1-20`; bei `localhost` der Name des
   ioBroker-Hosts), bei My.JDownloader die letzten vier Zeichen der Kennung, die das Konto für diesen JDownloader führt
   (`jdownloader-7f11`). Ein zweites Programm auf demselben Rechner bekommt seinen Port, dann einen Zähler. Die ID ändert
   sich danach nie mehr — nicht bei neuem Namen, neuer Adresse oder einem Wechsel zwischen lokal und My.JDownloader —,
   damit Räume, Funktionen und Skripte weiter passen. Die Details der Karte zeigen sie.
4. Der Test-Knopf auf der Karte fragt das Programm einmal und zeigt seine Version oder den Grund, warum es nicht
   erreichbar ist.

Jedes Programm lässt sich beliebig oft hinzufügen. Ein zweiter Eintrag für dasselbe Programm — dieselbe Adresse oder
derselbe JDownloader eines My.JDownloader-Kontos — wird abgewiesen. Der Schalter auf einer Karte schaltet ein Programm
ab, ohne sein Gerät zu löschen; Löschen entfernt das Gerät, nie eine Datei. Die Programme liegen in `programs.json` im
Datenordner der Instanz (`iobroker-data/dl-manager.0/`, Teil jeder ioBroker-Sicherung), nicht im Objektbaum; Passwörter
und API-Schlüssel sind mit dem Geheimnis der Installation verschlüsselt.

## Was du im Objektbaum findest

- `info.*` — wie viele Programme eingerichtet und erreichbar sind.
- `summary.*` — über alle Programme: ob irgendein Download aktiv ist, die Gesamt-Geschwindigkeiten, ein Schalter, der
  alle Programme pausiert; `summary.last.*` der zuletzt fertige und der zuletzt fehlgeschlagene Download (mit Uhrzeit).
- `<programm>-<stück>.*` — das Programm: erreichbar, Grund, Version, Geschwindigkeiten, Limits, freier Speicher,
  Pause-Schalter, ein Eingabefeld für neue Links, Zähler; `last.*` der eigene zuletzt fertige / fehlgeschlagene
  Download.
- `<programm>-<stück>.downloads.<download>.*` — ein Kanal je Download mit Status, Fortschritt, Größe, Geschwindigkeit,
  Restzeit, Fehler und den Aktionen, die das Programm anbietet (anhalten, entfernen, bei manchen Programmen neu prüfen,
  sofort starten oder erneut versuchen).

Der Status ist für jedes Programm dieselbe Liste: wartet, lädt, kommt nicht voran, angehalten, wird geprüft, wird
nachbearbeitet, wird weiterverteilt, fertig, fehlgeschlagen.

## Welche Downloads im Objektbaum stehen

Zwei Einstellungen bestimmen, welche Downloads einen eigenen Kanal bekommen. Das Programm behält in jedem Fall alle
Downloads, und die Summen (`summary.*`, die Zähler des Programms und `last.finished`) zählen immer jeden Download.

- **Downloads im Objektbaum:** _Alle_ (Vorgabe), _Ohne fertige_ oder _Nur unfertige (ohne fertige und seedende)_ —
  die letzte Stufe lässt auch weiterverteilte Torrents weg. Fehlgeschlagene Downloads bleiben immer, sie brauchen dich.
- **Höchstens so viele Downloads je Programm im Objektbaum:** Vorgabe 100, 0 = alle. Hat ein Programm mehr, behalten
  zuerst die laufenden ihren Kanal, dann fehlgeschlagene, pausierte und wartende, die in der Warteschlange,
  weiterverteilte und fertige — innerhalb jeder Gruppe die neuesten zuerst. Ein Download, der seinen Kanal verliert,
  bekommt ihn zurück, sobald wieder Platz ist.

Jeder Download legt bis zu 15 Objekte an, deren Werte sich bei jeder Abfrage ändern können. Mit 0 oder mehr als 200
Downloads je Programm werden es schnell Tausende; das belastet die ioBroker-Datenbank und macht den Objektbaum im Admin
langsam. Die Einstellungsseite zeigt dann eine Warnung, und das Log warnt einmal je Programm, wenn tatsächlich mehr als
200 Downloads im Objektbaum stehen.

## Ein neuer Link, während ein Programm pausiert ist

**Ein neuer Link setzt ein pausiertes Programm fort** (Vorgabe aus) entscheidet, was ein Link bewirkt, den du in `add`
eines Programms schreibst, während das Programm pausiert ist. Aus: Die Pause hält bei jedem Programm, und der Link
wartet, bis du das Programm fortsetzt; JDownloader, der bei jedem neuen Link von selbst startet, wird sofort wieder
angehalten. An: Das Hinzufügen setzt das Programm zuerst fort, alle seine Downloads laufen weiter.

## Einen Download entfernen

`remove` an einem Download nimmt ihn aus der Liste seines Programms. Ob das Programm dabei auch löscht, was es für den
Download geladen hat — bei einem fertigen Download die Dateien, bei einem abgebrochenen oder fehlgeschlagenen das bis
dahin Geladene —, entscheidet der Schalter **Beim Entfernen auch die Dateien löschen**, Vorgabe aus. Er steht auf der
Einstellungsseite für alle Programme; solange er dort aus ist, hat die Karte jedes Programms, das Dateien löschen kann,
denselben Schalter nur für dieses Programm, und solange er an ist, folgt ihm jede Karte. Die Datenpunkte des Downloads
gehören nicht dazu — die regeln die Einstellungen unter _Löschen von Datenpunkten_.

Ein Download, den sein Programm nicht so entfernen kann, wie der Schalter sagt, hat kein `remove` — er bekommt es
zurück, sobald das Entfernen wieder geht, etwa wenn er fertig ist oder der Schalter umgestellt wurde:

| Programm                | Was es nicht kann                                                                                         |
| ----------------------- | --------------------------------------------------------------------------------------------------------- |
| aria2, pyLoad, rTorrent | Dateien löschen — ihre Karten haben keinen Schalter                                                       |
| SABnzbd                 | die Dateien eines fertigen Downloads löschen; einen Download entfernen, während es ihn nachbearbeitet     |
| NZBGet                  | die Dateien eines fertigen Downloads löschen; die Dateien eines fehlgeschlagenen oder gelöschten behalten |
| Download Station        | die Dateien eines fertigen Downloads löschen; behalten, was ein unfertiger geladen hat                    |

## Löschen von Datenpunkten

Stellt der Adapter einen Datenpunkt nicht mehr bereit — ein Download ist aus der Liste des Programms verschwunden oder
fällt aus den Baum-Einstellungen, eine Programm-Karte wurde gelöscht —, löscht er ihn. Zwei Einstellungen am Ende der
Einstellungsseite entscheiden, was mit einem Datenpunkt geschieht, den du aufzeichnest (history, sql, influxdb):

- **Datenpunkte mit Aufzeichnung löschen** (Vorgabe an): an, geht ein solcher Datenpunkt wie jeder andere. Aus, bleibt er
  samt Kanal und Gerät darüber stehen, und eine Zeile im Log nennt, wie viele Datenpunkte behalten wurden und welche
  Instanzen sie aufzeichnen — bitte manuell prüfen.
- **Auch die aufgezeichneten Daten löschen** (Vorgabe aus, nur sichtbar, solange die erste Einstellung an ist): jede
  aufzeichnende Instanz löscht zuerst die aufgezeichneten Daten des Datenpunkts. Ein Datenpunkt, dessen Daten eine Instanz
  nicht löscht, bleibt stehen.

Ein Gerät, das auf eine neue ID umzieht, ist keine Löschung: seine Datenpunkte ziehen mit Werten und Aufzeichnung mit.

## Aktualisierung von 0.2

Der erste Start von 0.3 zieht die Programme aus den Instanz-Einstellungen in den Programm-Speicher des Adapters um (die Instanz
startet einmal neu), verschlüsselt ihre Passwörter und gibt jedem Programm seine neue Objekt-ID. Jedes Gerät zieht mit
seinen Werten, Räumen, Funktionen und Aliasen um; eine Aufzeichnung behält ihren Verlauf unter der alten ID. Ein
My.JDownloader-Programm zieht um, sobald das Konto die Kennung seines JDownloaders genannt hat (erste erfolgreiche
Verbindung). Der zuletzt fertige und fehlgeschlagene Download ziehen in den Kanal `last`: `lastFinished` →
`last.finished`, `lastFinishedTime` → `last.finishedTime`, `lastFailed` → `last.failed`, `lastFailedTime` →
`last.failedTime` — unter jedem Programm und unter `summary`.

**Alte IDs in Skripten und VIS anpassen** — zum Beispiel `dl-manager.0.jdownloader-cloud` →
`dl-manager.0.jdownloader-7f11` und `dl-manager.0.summary.lastFinished` → `dl-manager.0.summary.last.finished`. Nicht
auf 0.2 zurückgehen: sie fände ihre Programme nicht mehr.

## Mehr

- [Alle Datenpunkte, je Programm](/#/docs/adapterref/iobroker.dl-manager/datapoints.md)
- [Häufige Fragen](/#/docs/adapterref/iobroker.dl-manager/faq.md)

## Fehlermeldung

Die Fehlermeldung über Sentry ist ab Werk aktiv; was sie sendet und wie man sie abschaltet, steht im [Abschnitt Sentry der Haupt-README](https://github.com/krobipd/ioBroker.dl-manager/blob/main/README.md#sentry--error-reporting).

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- New: the switch "Also delete the files when removing" on the settings page and on the card of each program that can delete files, off by default
- Changed: a download has no remove datapoint while its program cannot remove it as the switch says
- Fixed: the debug log no longer shows a password or API key typed into a program's dialog
- Fixed: pausing all no longer stops halfway when a download ended meanwhile (rqbit, rTorrent, Tribler)
- Fixed: when the connection breaks off during pause all or resume all, the downloads already paused are resumed later
- Fixed: a link added during a pause is held on the next poll when its first hold did not reach the program
- Fixed: an rqbit 9 torrent paused during its check no longer ends the pause and shows as paused
- Fixed: with rqbit 8, adding a link whose files are already there during a pause no longer fails; it is paused after its check
- Fixed: Flood shows the infinite ratio of Deluge and qBittorrent instead of none
- Fixed: the log line of pause all names a program that refused apart from one that was not reachable
- Fixed: a script testing a connection gets the error as its answer when the test itself fails

### 0.5.0 (2026-11-19)

- New: rqbit can be added as a program
- New: rTorrent can be added as a program, through the web server in front of it
- New: Tribler can be added as a program
- New: Flood can be added as a program
- New: Vuze can be added as a program, through its Web Remote plugin
- New: µTorrent can be added as a program
- New: Hadouken can be added as a program
- New: Synology Download Station can be added as a program
- New: NZBVortex can be added as a program
- New: the downloads of a Freebox can be added as a program, paired once on the Freebox's display
- New: a setting lets a new link resume a paused program
- New: two settings decide whether a datapoint with a recording is deleted, and whether its recorded data goes too
- New: scripts can test a program's connection
- Fixed: the e-mail address of a My.JDownloader account no longer appears in the device object or an object export
- Fixed: a link added while downloads are paused now resumes together with them
- Fixed: aria2 shows seeding torrents and their ratio correctly
- Fixed: an infinite seed ratio shows ∞ instead of staying empty
- Fixed: size and time left stay empty while the program does not know them
- Fixed: NZBGet and pyLoad show their new version after an update
- Fixed: pyLoad shows a decrypting package as queued
- Fixed: pyLoad's speed limit keeps its value when pyLoad does not tell it, instead of emptying
- Fixed: a small speed, limit or size shows its value instead of 0
- Fixed: a program on an IPv6 address is reachable
- Fixed: the last finished and last failed download are named correctly
- Fixed: a finished SABnzbd job keeps its added time
- Fixed: a pressed button resets once the program took the command
- Fixed: the error shows the program's real problem
- Fixed: a programs.json without a program list stops the start instead of removing every device
- Fixed: the program dialog no longer stores invalid fields
- Fixed: the program dialog no longer overwrites changes made in another tab
- Fixed: an unreachable program keeps its last download values
- Fixed: an unexpected answer from a program no longer deletes its downloads
- Fixed: Deluge no longer stops as if its password were wrong
- Fixed: pause all is confirmed only once a program has paused
- Changed: every datapoint of a download starts with the download's name
- Changed: a busy or unreachable program is asked less often
- Changed: passwords and API keys use the platform's encryption; one that cannot be read stops the start instead of being emptied
- Changed: a start that cannot get going ends the adapter instead of running without function
- Changed: a poll interval that is no number ends the start with a notification in the admin instead of running at 10 s
- Improved: the adapter keeps every program's and My.JDownloader's request limit, also across a restart
- Improved: every datapoint has a short description
- Changed: requires js-controller 7.2.5 and admin 8.3.5

### 0.4.0 (2026-10-02)

- Fixed: saving a card while a second admin tab changed the programs could bring back a deleted card or undo a learned My.JDownloader connection
- Fixed: a switched-off program no longer blocks its address when you add the same program again
- Fixed: an updated JDownloader, qBittorrent or aria2 shows its new version without restarting the adapter
- Fixed: the details of a card open even when the program settings cannot be read
- Fixed: an empty entry in a Transmission or SABnzbd list no longer stops the query
- Fixed: a download added while JDownloader is paused no longer starts all its downloads again
- Changed: a card that cannot run shows what is wrong on the card; its `error` datapoint says `Unknown`
- Changed: a program that is down behind a reverse proxy counts as not reachable
- Changed: a new instance starts switched off until you set it up

### 0.3.2 (2026-09-30)

- Changed: your programs and their access data moved out of the object tree into a file of the instance, which every ioBroker backup includes — an object export no longer shows them

### 0.3.1 (2026-09-30)

- Changed: after adding, editing, switching or deleting a program on its card you now see at once whether it worked — the program answers, is not reachable, or is gone
- Fixed: the warning for a rejected login names what to check on the card and says so when the card holds no login at all, as with Transmission's login switch
- Changed: the query interval now starts at 10 seconds; a smaller value stored before keeps working and simply runs at 10 seconds from now on
- Fixed: when several programs answered at the same moment, the totals could briefly show an older speed or count

### 0.3.0 (2026-09-29)

- Fixed: saving a program card no longer hangs, and the settings page can no longer undo a change made on a card
- Changed: a change on a card applies at once without restarting the adapter; passwords are no longer kept in plain text
- Changed: device IDs follow the program and machine (My.JDownloader: its id) and never change; the name is a label
- Changed: the last finished and failed download moved into a `last` channel below each program and the summary
- Changed: the card shows the object ID in its details and has no pause switch; the `paused` datapoint stays
- Fixed: a JDownloader renamed in its own settings keeps its My.JDownloader connection

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