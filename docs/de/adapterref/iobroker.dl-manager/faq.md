---
chapters: {"pages":{"de/adapterref/iobroker.dl-manager/README.md":{"title":{"de":"ioBroker.dl-manager — Benutzerdokumentation"},"content":"de/adapterref/iobroker.dl-manager/README.md"},"de/adapterref/iobroker.dl-manager/datapoints.md":{"title":{"de":"Datenpunkte"},"content":"de/adapterref/iobroker.dl-manager/datapoints.md"},"de/adapterref/iobroker.dl-manager/faq.md":{"title":{"de":"Häufige Fragen"},"content":"de/adapterref/iobroker.dl-manager/faq.md"}}}
---
# Häufige Fragen

## Ein Programm bleibt bei `online` = falsch

`error` am Gerät des Programms sagt, warum. Ein Netzwerk-Text (abgewiesen, Zeitüberschreitung, keine Route) heißt, der
ioBroker-Rechner erreicht das Programm nicht: Host, Port, den HTTPS-Schalter und eine Firewall dazwischen prüfen. Der
Test-Knopf auf der Karte des Programms fragt es einmal und zeigt seine Antwort. Antwortet ein Reverse-Proxy vor dem
Programm mit 502, 503 oder 504, gilt es ebenfalls als nicht erreichbar — das Programm dahinter läuft nicht. Manche
Programme weisen Anfragen ab, die sie nicht kennen:

- **SABnzbd** antwortet nur Hostnamen aus seiner `host_whitelist` — die IP-Adresse eintragen oder den Namen dort
  hinzufügen.
- **Transmission** antwortet nur Adressen aus seiner `rpc-whitelist` — den ioBroker-Rechner eintragen oder die Liste
  abschalten.
- **JDownloader (lokale Schnittstelle)** antwortet nur dem eigenen Rechner, solange `DeprecatedApiLocalhostOnly` an
  ist.
- **rqbit** antwortet nur auf 127.0.0.1, außer es startet mit `--http-api-listen-addr 0.0.0.0:3030` (sein
  Docker-Image tut es).
- **Tribler** antwortet nur auf 127.0.0.1 und bei jedem Start auf einem neuen Port, solange der Port nicht fest ist —
  den Port festlegen und, wenn ioBroker auf einem anderen Rechner läuft, `api.http_host` auf 0.0.0.0 setzen.
- **rTorrent** hat keinen eigenen Web-Zugang — die Adresse des Webservers davor eintragen.
- **µTorrent** und **NZBVortex** antworten nur Adressen aus ihrer Liste erlaubter IPs, solange die Liste an ist — den
  ioBroker-Rechner eintragen.
- **Freebox** gewährt Zugang nur aus ihrem eigenen Netz, und ihr Zertifikat gilt nur für `mafreebox.freebox.fr` — diesen
  Namen als Host lassen.

## „Login rejected" — und das Programm wird nicht mehr gefragt

Weist ein Programm die Anmeldung ab, schreibt der Adapter eine Warnung, zeigt eine ioBroker-Benachrichtigung und fragt
dieses Programm nicht mehr. qBittorrent und Transmission sperren eine Adresse nach mehreren Fehlversuchen; alle paar
Sekunden neu zu fragen würde den ioBroker-Rechner aussperren. Die Warnung sagt, was auf der Karte zu prüfen ist — und
wenn die Karte gar keine Anmeldung trägt, sagt sie das: Transmission etwa braucht im Dialog das Häkchen _Das Programm
verlangt eine Anmeldung_. Korrigiere die Zugangsdaten auf der Karte des Programms — die Änderung gilt sofort, das
Programm wird wieder gefragt, und das Log zeigt seine Antwort.

## Kopplung mit der Freebox

Die Freebox hat kein Passwort zum Eintippen. Speicherst du ihre Karte, bittet der Adapter die Freebox um Zugang, und der
Dialog wartet: Bestätige die Anfrage am Display der Freebox mit ihren Pfeiltasten. Lehnst du sie ab oder läuft sie ab,
wird nichts gespeichert. Der Zugang wirkt nur, solange die App _ioBroker dl-manager_ das Recht auf die Downloads hat —
fehlt es, gewähre es in Freebox OS (Paramètres de la Freebox › Gestion des accès › Applications) und schalte die Karte
aus und wieder ein. Hast du die App auf der Freebox entfernt, hake im Dialog der Karte _Neu mit der Freebox koppeln_ an
und bestätige noch einmal am Display.

## Lokale JDownloader-Schnittstelle oder My.JDownloader?

Die lokale Schnittstelle hat kein Passwort: Wer ihren Port erreicht, kann JDownloaders Einstellungen ändern oder ihn
beenden. Nutze sie nur, wenn JDownloader auf dem ioBroker-Rechner oder im selben Docker-Netz läuft. In jedem anderen
Fall wähle im JDownloader-Dialog _Über My.JDownloader_, melde dich an und wähle deinen JDownloader aus der Liste.
My.JDownloader wird höchstens alle 30 Sekunden gefragt, egal was das Abfrage-Intervall sagt. Schaltest du einen
bestehenden JDownloader zwischen beiden um, behält er seine Räume und Funktionen.

## Wie oft werden die Programme gefragt?

Jedes Programm wird so oft gefragt, wie _Abfrage-Intervall (Sekunden)_ sagt (Standard 10, von 10 Sekunden bis 1
Stunde). Was du schreibst — eine Pause, ein Limit, ein neuer Link — geht sofort an das Programm, und es wird direkt
danach neu gefragt. aria2 und ein lokaler JDownloader melden Änderungen zusätzlich von selbst, sobald sie passieren
(nicht über My.JDownloader).

## Löscht `remove` meine Dateien?

Nur wenn der Schalter **Beim Entfernen auch die Dateien löschen** es sagt — auf der Einstellungsseite für alle Programme
oder auf der Karte eines Programms, das Dateien löschen kann. Aus (Vorgabe): `remove` nimmt den Download aus der Liste des
Programms, die Dateien bleiben erhalten. An: das Programm löscht auch, was es für diesen Download geladen hat. Kann ein
Programm einen Download nicht so entfernen, wie der Schalter sagt, hat dieser Download kein `remove`, bis es geht —
Download Station etwa verwirft die Daten einer unfertigen Aufgabe immer, also hat eine unfertige Aufgabe bei Schalter aus
kein `remove`.

## Ein fertiger Download bleibt im Objektbaum

Er bleibt, solange das Programm ihn führt und die Einstellungen ihn zeigen. Stelle _Downloads im Objektbaum_ auf
_Ohne fertige_, um fertige Downloads wegzulassen, oder auf _Nur unfertige (ohne fertige und seedende)_, um auch
weiterverteilte Torrents wegzulassen.
Fehlgeschlagene Downloads bleiben immer — sie brauchen dich. Das Programm behält in jedem Fall alle Downloads.

## Ein Download fehlt im Objektbaum

Entweder wird sein Status nicht gezeigt (_Downloads im Objektbaum_), oder das Programm hat mehr Downloads, als
_Höchstens so viele Downloads je Programm im Objektbaum_ erlaubt: dann behalten laufende, fehlgeschlagene, pausierte und
wartende ihren Kanal vor weiterverteilten und fertigen. Erhöhe die Grenze oder setze 0 für alle — über 200 je Programm
wird der Objektbaum langsam.

## Ich will eine Nachricht, wenn ein Download fertig ist

Löse auf `summary.last.finished` (oder auf `last.finished` des Programms) mit **wurde aktualisiert** aus, nicht mit
**wurde geändert**: Zwei Downloads mit demselben Namen enden mit demselben Wert, und ein Auslöser auf „geändert“
verpasst den zweiten. `summary.last.finishedTime` enthält die Uhrzeit. `summary.last.failed` funktioniert genauso für
fehlgeschlagene Downloads.

## `paused` bei einem Programm ohne eigene Pause

JDownloader, Deluge, SABnzbd, NZBGet, pyLoad und qBittorrent ab 5.3 pausieren das ganze Programm selbst. Alle anderen
Programme haben keine solche Pause; dort hält der Adapter die laufenden Downloads an, merkt sich genau diese und startet
genau diese wieder, wenn du `paused` auf falsch setzt — zusammen mit den Downloads, die du während der Pause über
ioBroker hinzugefügt hast. Ein Download, den du selbst angehalten hast, bleibt angehalten. Startest du einen der
angehaltenen Downloads im Programm selbst, endet die Pause des Adapters.

## Warum gibt es bei SABnzbd- und NZBGet-Downloads kein `speed`?

Beide Programme laden einen Auftrag nach dem anderen und melden Geschwindigkeit und Restzeit nur für das ganze
Programm. Du findest sie in `downloadSpeed` des Programms; der Adapter erfindet keinen Wert je Download.

## Zwei Server mit demselben Programm

Lege je Server eine Karte an — jede bekommt den Rechner, auf dem sie läuft, als ID: `qbittorrent-nas` und
`qbittorrent-seedbox` sind zwei Geräte nebeneinander. Zwei gleiche Programme auf einem Rechner unterscheidet ihr Port
(`qbittorrent-nas-8081`).

## Kann ich die ID eines Programms wählen?

Nein — der Adapter vergibt sie einmal beim Hinzufügen, und sie ändert sich nie: ein neuer Name, eine neue Adresse oder
ein Wechsel zwischen lokal und My.JDownloader lassen das Gerät, wo es ist, mit Räumen, Funktionen und Skripten. Die
Details der Karte zeigen die ID. Eine gelöschte Karte nimmt ihr Gerät mit. Eine ausgeschaltete Karte behält ihr Gerät,
es wird als nicht erreichbar angezeigt.

## Kann ein Skript die Verbindung eines Programms testen?

Ja — derselbe Test wie der Knopf auf seiner Karte. Sende `testConnection` mit der ID des Programms; die Antwort ist
`result`, wenn das Programm geantwortet hat, sonst `error`, in der Systemsprache:

```js
sendTo("dl-manager.0", "testConnection", { id: "qbittorrent-nas" }, answer => log(answer.result ?? answer.error));
```

## pyLoad meldet „too many requests“

pyLoad erlaubt 100 Anfragen pro Minute; der Adapter braucht vier bis sechs je Abfrage und fragt höchstens alle 10
Sekunden. Kommt die Meldung trotzdem, fragen weitere Werkzeuge dasselbe pyLoad — erhöhe das Abfrage-Intervall oder
frage dort seltener.