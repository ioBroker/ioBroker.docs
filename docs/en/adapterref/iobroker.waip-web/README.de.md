---
chapters: {"pages":{"en/adapterref/iobroker.waip-web/README.md":{"title":{"en":"ioBroker.waip-web"},"content":"en/adapterref/iobroker.waip-web/README.md"},"en/adapterref/iobroker.waip-web/README.de.md":{"title":{"en":"ioBroker.waip-web"},"content":"en/adapterref/iobroker.waip-web/README.de.md"},"en/adapterref/iobroker.waip-web/LOGGING.md":{"title":{"en":"Logging reference"},"content":"en/adapterref/iobroker.waip-web/LOGGING.md"}}}
---
![Logo](admin/waip-web-logo.png)

# ioBroker.waip-web

🇬🇧 [English version of this README](/#/adapters/waip-web)

ioBroker-Adapter für **Wachalarm IP-Web (WAIP-Web)**

Verbindet sich per Socket.IO mit einem WAIP-Web-Wachalarm-Monitor und bildet
Einsätze, Rückmeldungen, Routen und TTS-Ansagen als ioBroker-States ab –
ohne dass ein Browser-Tab dauerhaft offen sein muss.

## Inhaltsverzeichnis

- [Über diesen Adapter](#über-diesen-adapter)
- [Über WAIP-Web](#über-waip-web)
- [Praktische Anwendungsfälle](#praktische-anwendungsfälle)
- [Funktionen](#funktionen)
- [Konfiguration](#konfiguration)
  - [Verbindung](#verbindung)
  - [Warum ein Session-Cookie nötig ist](#warum-ein-session-cookie-nötig-ist)
  - [Rettungsdienst](#rettungsdienst)
  - [Stichwort-Stammdaten](#stichwort-stammdaten)
  - [Einsatzkarte](#einsatzkarte)
  - [Dashboard](#dashboard)
- [States (unter `waip-web.0.*`)](#states-unter-waip-web0)
  - [info](#info) · [status](#status) · [einsatzAktuell](#einsatzaktuell) ·
    [einsatzAktuell.json](#einsatzaktuelljson) · [einsatzAktuell.tts](#einsatzaktuelltts) ·
    [dashboard](#dashboard-states) · [debug](#debug)
- [Logging](#logging)
- [Lizenz und Changelog](#lizenz-und-changelog)

## Über diesen Adapter

Dieser Adapter ist ein **eigenständiges Community-Projekt** und steht in
keiner Verbindung zum WAIP-Web-Projekt, zu Robert-112 oder zum Betreiber
einer konkreten Instanz (z. B. der Integrierten Regionalleitstelle
Lausitz). Er wurde entwickelt, indem das öffentlich über den Browser
ausgelieferte Frontend (`client_waip.js`) einer WAIP-Web-Instanz auf sein
Verhalten hin analysiert wurde, um dieselben Socket.IO-Events und
Datenfelder nachzubilden, die auch ein regulärer Browser-Client empfängt.

Der Adapter meldet sich **ohne Login** an und erhält dadurch ausschließlich
die öffentliche Berechtigungsstufe von WAIP-Web (Stichwort, Ort, ungefähre
Position, alarmierte Einsatzmittel, Rückmeldungen) – dieselben Daten, die
auch ein anonymer Browser-Besucher ohne Anmeldung sehen würde. Es werden
keine Zugriffsbeschränkungen umgangen.

> **Hinweis:** Ein automatisierter Dauerclient wie dieser Adapter ist etwas
> anderes als ein gelegentlich geöffneter Browser-Tab. Bevor du den Adapter
> gegen eine produktive Instanz laufen lässt, sprich kurz mit dem
> Betreiber/deiner Leitstelle ab, ob eine dauerhafte automatisierte
> Verbindung erwünscht ist.

## Über WAIP-Web

[Wachalarm IP-Web](https://github.com/Robert-112/n112_waip-web) ist eine
quelloffene Webanwendung von **Robert-112**, die Alarmierungsinformationen
für Feuerwehr/Rettungsdienst geräteunabhängig im Browser darstellt (Windows,
Linux, Mac, Smartphone – keine Installation nötig). Sie bietet u. a.:

- **Alarmmonitor** – Einsatzart, Stichwort, Sondersignal, Ort, Karte,
  alarmierte Einsatzmittel, App-Rückmeldungen der Einsatzkräfte inkl.
  Sprachansage
- **Dashboard** – Gesamtübersicht laufender Einsätze
- **Rückmeldefunktion** – App-basierte Rückmeldungen der Einsatzkräfte,
  gegliedert nach Rolle (EK/GF/ZF/VF) und Zusatzfunktion (AGT/FZF/MA/MED)
- **Administration** – Nutzerverwaltung, Wachdaten, Monitor-Übersicht

WAIP-Web selbst ist unter der
[**Creative Commons BY-SA 4.0**](https://creativecommons.org/licenses/by-sa/4.0/deed.de)
lizenziert. Dieser Adapter enthält keinen Code aus dem WAIP-Web-Projekt,
sondern implementiert eine eigenständige Anbindung an dessen Socket.IO-
Schnittstelle.

## Praktische Anwendungsfälle

In diesem Abschnitt geht es darum, was sich mit den States dieses Adapters
konkret **bauen** lässt – typischer Einsatz auf einer Feuerwehr-/
Rettungsdienst-Wache:

- **Wandmontierte Alarmanzeige.** `einsatzAktuell.json.current` an ein
  VIS-Tabellen-Widget auf einem wandmontierten Tablet/TV im Aufenthalts-
  raum oder in der Fahrzeughalle binden – Einsatzart, Stichwort, Adresse
  und alarmierte Einsatzmittel erscheinen automatisch, ohne dass dort
  dauerhaft ein Browser-Tab offen gehalten werden muss (genau dafür
  existiert dieser Adapter).
- **Klartext-Stichwort auf Anzeigen und Benachrichtigungen.**
  `einsatzAktuell.beschreibung` macht aus einem kryptischen Alarmierungscode
  (`B:Wald groß/WSP`, `R1N0`) eine lesbare Beschreibung
  ("Wald-/Getreidefeldbrand (groß)", "Rettungswagen: 1,
  Notfalleinsatzfahrzeug: 0") – neben `einsatzAktuell.stichwort` auf der
  Wandanzeige einblenden oder in Push-Benachrichtigung/TTS-Ansage mit
  aufnehmen, damit nicht jeder alle Stichwörter auswendig kennen muss.
- **Automationen direkt bei Alarmeingang auslösen.** `einsatzAktuell.alarmAktiv`
  (ggf. zusammen mit `info.connection`) in einem Script/einer Blockly-Regel
  beobachten, um bei Alarm Licht in der Fahrzeughalle einzuschalten, ein
  Tor/eine Tür zu öffnen, eine Push-Benachrichtigung (z. B. über einen
  Telegram-/Pushover-Adapter) mit `einsatzAktuell.stichwort`/`einsatzAktuell.beschreibung`
  + `einsatzAktuell.ort` zu versenden oder eine Lichtszene auszulösen – wenige
  Sekunden nach der eigentlichen Alarmierung, da ioBroker-State-Änderungen
  sofort feuern und kein Polling nötig ist.
- **Alarm laut ansagen.** `einsatzAktuell.tts.last` ist eine fertige, absolute
  mp3-URL; eine `sonos`-/`snapcast`-/`text2speech`-Automation darauf
  ansetzen (oder die URL direkt abspielen), um den Einsatz über
  Gebäudelautsprecher anzusagen, sobald `io.playtts` feuert – hilfreich,
  wenn nicht alle Mitglieder gerade auf einen Bildschirm schauen.
- **Live-Übersicht der Rückmeldungen.** Die `einsatzAktuell.rueckmeldungen.*`
  Zähler (`rollen.ek`/`.gf`/`.zf`/`.vf` pro Rolle, `funktionen.agt`/`.fzf`/
  `.ma`/`.med` pro Zusatzfunktion) aktualisieren sich in Echtzeit, sobald
  Einsatzkräfte per App zurückmelden – als Gauge- oder Zahlen-Widget
  gebunden ergibt das eine
  Übersicht auf einen Blick, wer bereits kommt.
- **Nachbereitung/Statistik.** `einsatzAktuell.json.history` hält die letzten
  10 abgeschlossenen Einsätze als flache Tabelle vor – an eine zweite
  VIS-Ansicht binden oder periodisch exportieren (z. B. per Script, das
  den State bei `io.standby` ausliest), um ein längerfristiges Log zu
  führen oder Einsatzzahlen in ein Statistik-/Dashboard-Adapter
  einzuspeisen.
- **Routen-/Fahrzeugübersicht auf einer Karte.** `einsatzAktuell.json.routen`
  enthält für jede alarmierte Wache `lat`/`lon` und `color` – an ein
  VIS-Kartenwidget gebunden ergibt das auf einen Blick, wer unterwegs ist,
  unabhängig von der WAIP-Web-eigenen Karte.
- **Anbindung an weitere ioBroker-Automationen.** Da jedes Feld ein
  gewöhnlicher ioBroker-State ist, lässt sich das Ganze mit allem
  kombinieren, was ohnehin in der Instanz läuft – `einsatzAktuell.*` in eine
  Smart-Home-Szenensteuerung einspeisen, eine Grafana-/InfluxDB-Historie
  für Reaktionszeit-Auswertungen führen, oder per ioBroker-MQTT-Adapter
  in einen Node-RED-artigen Flow einbinden, ganz ohne eigene Anbindung an
  die WAIP-Web-API.

## Funktionen

- Verbindung zum Namespace `/waip` per `socket.io-client`, Registrierung
  über `emit('WAIP', monitorId)` einmalig (verlässt sich als Fallback
  auf `REGISTRATION_TIMEOUT_MS` statt auf wiederholte Emits, da ein
  redundanter Emit den Server nur erneut antworten lässt, ohne die
  Zustellungssicherheit zu erhöhen)
- Manuelles Reconnect-Handling (kein Auto-Reconnect der Bibliothek) mit
  konfigurierbarer Verzögerung
- Registrierungs-Timeout mit Audit-Log (`debug.monitorAudit`)
- Normalisierung von Geodaten (wgs84-Felder, `position` oder
  GeoJSON-`geometry` → Mittelpunkt)
- History der letzten 10 abgeschlossenen Einsätze (`einsatzAktuell.json.history`)
- Getrennte Handler für Alarm (`io.new_waip`), Rückmeldung (`io.new_rmld`),
  Routen (`io.routes`), TTS (`io.playtts`) und Standby (`io.standby`)
- Automatisches Session-Cookie-Management (siehe unten), damit die
  Alarm-Zustellung auch ohne offene Browsersitzung dauerhaft weiterläuft
- Server-Neustart-Erkennung über `io.version` mit automatischem
  Session-Refresh + Reconnect
- Einsatz-, Rückmeldungs-, Routen- und Einsatzmittel-Daten als eigene,
  flache JSON-Arrays unter `einsatzAktuell.json.*` – ohne Verschachtelung, damit
  VIS-Tabellen-Widgets direkt daran binden können
- Aggregierte Rückmeldungs-Zähler pro Rolle/Fähigkeit, analog zu den
  Live-Badges der Weboberfläche
- Sauberer Zustand bei jedem Neustart: alle States werden beim Adapter-
  Start aktiv auf ihren leeren Wert zurückgesetzt (`false`/`0`/`null`/
  `[]`), außer `einsatzAktuell.json.history` und `debug.monitorAudit` (beide
  bleiben über Neustarts hinweg erhalten). Startet der Adapter neu,
  während gerade ein Einsatz läuft, werden dessen Live-Felder
  (`einsatzAktuell.*`) ebenfalls geleert und füllen sich erst wieder, sobald
  der Server das nächste Event zu diesem Einsatz sendet.
- Schutz vor veralteten Daten: Beginnt ein neuer Einsatz, bevor für ihn
  eigene Routen-/Rückmeldungs-Events eingetroffen sind, werden
  `einsatzAktuell.json.routen`/`.rueckmeldungen` und die Rückmeldungs-Zähler
  sofort geleert, statt auf diese Events zu warten. Und falls `io.standby`
  für einen Einsatz jemals verpasst wird (z.B. durch einen Disconnect
  zum falschen Zeitpunkt), schließt ein Watchdog den Einsatz automatisch
  ab, sobald seine `ablaufzeit` um mehr als eine Gnadenfrist (60
  Sekunden) überschritten ist, statt unbegrenzt veraltete "aktiv"-Daten
  stehen zu lassen.
- Zeigt immer nur den zuletzt aktiven Einsatz; mehrere gleichzeitig
  laufende Einsätze sind aktuell nur über das Dashboard der
  WAIP-Web-Instanz selbst einsehbar
- Optionale Klartext-Beschreibung zu `einsatzAktuell.stichwort`
  (`einsatzAktuell.beschreibung`), lokal ermittelt aus einer selbst pflegbaren
  Stichwort-Tabelle sowie einem optionalen Dekoder für das von
  mehreren Leitstellen verwendete Rettungsdienst-Stichwortschema
  (`R<RTW>N<NEF>`) - siehe [Rettungsdienst](#rettungsdienst)
- Rettungsdienst-Einsätze können komplett ignoriert werden (keine
  States, keine History, kein TTS) - sinnvoll, wenn WAIP sie in der
  eigenen Region ohnehin nur unzuverlässig signalisiert, siehe
  [Rettungsdienst](#rettungsdienst)
- Optionales Einsatzkarten-Bild: ein auf die Einsatz-Koordinaten
  zentriertes PNG, lokal aus OpenStreetMap-Kacheln zusammengesetzt, mit
  dem von WAIP-Web gesendeten Einsatzgebiet als Umriss in
  konfigurierbarer Farbe/Stärke eingezeichnet (umschaltbar auf eine
  einfache Punkt-Markierung), zoomt bei Bedarf automatisch so heraus,
  dass das gesamte Gebiet sichtbar bleibt, Dateipfad als State
  bereitgestellt -
  siehe [Einsatzkarte](#einsatzkarte)
- Optionales Dashboard: spiegelt die letzten N Einsätze, die zum
  Monitor dieser Instanz passen, als `dashboard.einsatz1` … `einsatzN` -
  wird periodisch über kurzlebige Verbindungen abgefragt (keine
  dauerhafte Dashboard-Verbindung), siehe [Dashboard](#dashboard)

## Konfiguration

In der Admin-Oberfläche der Adapterinstanz sind die Einstellungen auf
vier Tabs verteilt: **Verbindung**, **Rettungsdienst**,
**Stichwort-Stammdaten** und **Einsatzkarte** – alle vier unten näher
beschrieben.

### Verbindung

| Feld | Beschreibung | Default |
| --- | --- | --- |
| WAIP-Server-URL | Basis-URL der WAIP-Web-Instanz | `https://wachalarm.leitstelle-lausitz.de` |
| Monitor-ID | Auswahl per Live-Dropdown, geladen von der `/waip/`-Übersichtsseite des konfigurierten Servers und gruppiert nach Leitstelle/Kreis/Träger/Wache; manuelle Eingabe bleibt möglich, falls der Server nicht erreichbar ist. Leer/`0` = globaler Monitor (alle Einsätze) | *(leer)* |
| Registrierungs-Timeout (s) | Zeit bis eine ausbleibende Registrierungsbestätigung geloggt wird | `10` |
| Wiederverbindungs-Verzögerung (s) | Wartezeit vor manuellem Reconnect nach Disconnect/Fehler | `5` |

Das Session-Keepalive-Intervall ist **nicht konfigurierbar** – es wird bei
jeder Erneuerung vollautomatisch aus der vom Server gemeldeten Cookie-
Laufzeit abgeleitet (min. 55s, max. 5 Min., analog zu
`/js/session_keepalive.js` der Website selbst).

### Warum ein Session-Cookie nötig ist

Der WAIP-Web-Server bindet die Alarm-Zustellung an einen
Express-Session-Cookie, den ein Browser über ein mitgeliefertes Skript
automatisch alle paar Minuten erneuert. Ein reiner Socket.IO-Client bekommt
diesen Cookie nie automatisch – der Adapter holt ihn deshalb selbst per
`GET /session/keepalive` und hängt ihn an die Socket.IO-Verbindung an.

Die Cookie-Lebensdauer ist laut Quellcode von WAIP-Web **pro Instanz per
Umgebungsvariable konfigurierbar** (Server-Standard: 60 Sekunden; diese
Instanz nutzt offenbar 10 Minuten) – ein fest angenommenes Erneuerungs-
intervall wäre daher für andere WAIP-Web-Instanzen potenziell falsch. Der
Adapter leitet das tatsächliche Intervall deshalb **adaptiv** aus der vom
Server bei jedem Aufruf gemeldeten Ablaufzeit ab (80 % der beobachteten
Laufzeit, mindestens 55 Sekunden, höchstens die konfigurierte Obergrenze) –
genau die gleiche Klammerung, die auch `/js/session_keepalive.js` der
Website selbst verwendet.

### Rettungsdienst

**Rettungsdienst-Einsätze verarbeiten** (Admin-Checkbox, standardmäßig
**an**): Einsätze, deren `einsatzart` auf einen Rettungsdienst-Einsatz
hindeutet (enthält "Rettung" oder "Krankentransport", ohne
Berücksichtigung von Groß-/Kleinschreibung - siehe die
`einsatzart`-Beispiele unter [einsatzAktuell](#einsatzaktuell)), werden standardmäßig
ganz normal verarbeitet, wie in jeder früheren Adapter-Version. Wird die
Checkbox deaktiviert, ignoriert der Adapter solche Einsätze stattdessen
**komplett**: keine `einsatzAktuell.*`-States werden aktualisiert, kein
History-Eintrag geschrieben, keine TTS-Ansage ausgelöst - als wäre der
Einsatz nie eingegangen. Hintergrund: Rettungsdienst-Einsätze werden
über WAIP Berichten zufolge nur in manchen Regionen/Leitstellen
überhaupt alarmiert/signalisiert - wo das nicht der Fall ist oder nicht
gewünscht wird, schaltet diese Checkbox das Rauschen ab. Alles darunter
auf diesem Tab (die Dekodierungs-Checkbox und ihre Bezeichnungsfelder)
wird nur angezeigt, solange diese Checkbox aktiv ist - ist sie aus,
werden Rettungsdienst-Einsätze ohnehin komplett ignoriert, ihre
Stichwort-Dekodierung ist dann irrelevant.

`einsatzAktuell.stichwort` wird unverändert vom Server als bloßer Code
übernommen (z.B. `B2`, `H:VU mit P`) – WAIP-Web selbst erklärt nicht,
was das bedeutet, und es gibt kein bundesweit einheitliches Schema:
jede Leitstelle nutzt ihr eigenes Stichwortverzeichnis.
`einsatzAktuell.beschreibung` schließt diese Lücke **vollständig lokal**, es
werden dabei keine Daten irgendwohin gesendet. Dieser Tab ist die erste
von zwei Quellen, die der Reihe nach geprüft werden (die zweite steht
unter [Stichwort-Stammdaten](#stichwort-stammdaten)):

**Rettungsdienst-Dekodierung** (Admin-Checkbox, standardmäßig an):
passt das Stichwort auf das Muster `R<Anzahl RTW>N<Anzahl NEF>[p][f][-NT]`
(z.B. `R1N0` → "Rettungswagen: 1, Notfalleinsatzfahrzeug: 0"), wird
automatisch eine Beschreibung erzeugt. Zwei Schreibweisen des
`p`/`f`/`NT`-Teils werden erkannt: ohne Leerzeichen und mit Bindestrich
vor `NT` (z.B. `R1N1p`, `R1N0-NT`, siehe
[die dokumentierte Erklärung der Leitstelle Lausitz](https://www.leitstelle-lausitz.de/anpassung-der-einsatzstichworte-rettungsdienst/)
dazu) sowie mit Leerzeichen und ohne Bindestrich (z.B. `R1N1 p`,
`R1N0 nt`, wie von der IRLS Brandenburg verwendet) – dieses Schema
(in beiden Schreibweisen) wird von mehreren Leitstellen verwendet,
nicht nur diesen beiden – hat keine Auswirkung, falls eure Leitstelle
keines dieser Muster verwendet, da das Stichwort dann einfach nicht
passt. Der Text für jeden Teil ist
selbst konfigurierbar (5 zusätzliche Textfelder erscheinen, sobald
die Checkbox aktiviert ist), da der Adapter mehrsprachig ist und
diese Bezeichnungen nicht automatisch übersetzt werden:

| Teil | Bedeutung | Default-Bezeichnung |
| --- | --- | --- |
| `R<n>` | Anzahl Rettungswagen | `Rettungswagen` |
| `N<n>` | Anzahl Notfalleinsatzfahrzeuge | `Notfalleinsatzfahrzeug` |
| Suffix `p` | Polytrauma | `Polytrauma` |
| Suffix `f` | First Responder einbezogen | `First Responder` |
| Suffix `-NT`/` nt` | Notfalltransport mit Notfallkrankenwagen | `Notfalltransport mit Notfallkrankenwagen` |

### Stichwort-Stammdaten

Wird nur geprüft, falls der Dekoder auf dem Tab
[Rettungsdienst](#rettungsdienst) nicht gegriffen
hat: eine Liste von `{Stichwort-Muster, Beschreibung, Abgleich-Typ}`-Zeilen
– Abgleich-Typ ist `beginnt mit` oder `enthält`, der Vergleich ist
case-insensitiv und behandelt Leerzeichen und Bindestriche als
gleichwertig (jede Folge aus beidem wird vor dem Vergleich zu einem
Leerzeichen zusammengefasst) – z.B. matchen `H:VU mit P`,
`H:VU-mit-P` und `H:VU - mit - P` dieselbe Zeile, es muss also keine
eigene Zeile pro Schreibvariante gepflegt werden. Passen mehrere
Zeilen, gewinnt automatisch das **spezifischste (längste) Muster** –
die Zeilenreihenfolge hat keinen Einfluss auf den Abgleich, die
Tabelle kann also gefahrlos nach jeder Spalte sortiert werden (Klick
auf die Spaltenüberschrift). Die Tabelle ist mit
einer beispielhaften Feuerwehr-/Rettungsdienst-Stichwortliste
(`B:...`/`H:...`) als Startpunkt vorbefüllt – das ist **nicht** für
irgendeine bestimmte Leitstelle bestätigt, bei Bedarf anpassen oder
komplett ersetzen. Zum Sichern/Übertragen dieser Tabelle die
Standard-Instanzkonfiguration von ioBroker exportieren/importieren
(JSON). Nach einem solchen Import **die Admin-Seite neu laden**, bevor
du diese Tabelle prüfst – der offene Konfigurationsdialog aktualisiert
sie bei einem externen Import nicht automatisch (eine
State-Sync-Einschränkung der Admin-Tabellenkomponente selbst, nicht
etwas, das dieser Adapter beeinflussen kann).

Passt weder diese Tabelle noch der Dekoder oben, bleibt
`einsatzAktuell.beschreibung` einfach `null` – kein Fehler.

### Einsatzkarte

**Kartenbild für jeden Einsatz erzeugen** (Admin-Checkbox, standardmäßig
aus): ist die Checkbox aktiv und liegen für einen Einsatz gültige
Koordinaten vor, lädt der Adapter die dafür nötigen Kacheln vom
öffentlichen Server `tile.openstreetmap.org` herunter, setzt sie zu
einem einzigen PNG zusammen, zentriert auf den Einsatzort, und stempelt
die von der ODbL-Lizenz vorgeschriebene OpenStreetMap-Attribution unten
links auf.

Standardmäßig wird das Einsatzgebiet, das WAIP-Web im `geometry`-Feld
des Events sendet (meist ein kreisförmiges Polygon um den Einsatzort,
nicht nur dessen Mittelpunkt), als Umriss in konfigurierbarer Farbe und
Strichstärke ins Bild eingezeichnet - also die vom Server original
gesendete Form, keine Markierung an deren Mittelpunkt. **Einsatzgebiet-
Polygon anzeigen** (Admin-Checkbox, standardmäßig an) steuert das:
deaktivieren, um stattdessen immer eine einfache Punkt-Markierung in
der Mitte zu zeigen, auch wenn ein Polygon verfügbar wäre. Liegt gar
kein Polygon vor (z.B. enthält das Event nur einen Punkt), wird ohnehin
immer die Punkt-Markierung verwendet, unabhängig von der Checkbox. Das
Einsatzgebiet bleibt beim Zeichnen des Polygons immer vollständig
sichtbar: passt es bei der konfigurierten Zoomstufe nicht ins Bild,
zoomt der Adapter automatisch so weit heraus (nie hinein), wie nötig,
damit das gesamte Gebiet hineinpasst, statt es am Rand abzuschneiden.

**Zoomstufe**, **Marker- & Umrissfarbe** und **Bildbreite/-höhe**
stehen alle oberhalb dieser Checkbox, da sie für **beide**
Darstellungsarten gelten - die Zoomstufe wie oben beschrieben für das
Polygon, bzw. als fester Wert für die Punkt-Markierung; die Farbe für
den Polygon-Umriss, bzw. für den Kern der Punkt-Markierung;
Bildbreite/-höhe für das Bild selbst in beiden Fällen. Nur die
**Umriss-Strichstärke** wird unterhalb der Checkbox angezeigt, da sie
wirklich nur den Polygon-Umriss betrifft - die Größe der
Punkt-Markierung ist fest vorgegeben, nicht einstellbar.

Der Dateipfad wird in `einsatzAktuell.kartenbildPfad` geschrieben (siehe
[einsatzAktuell](#einsatzaktuell)) – typische Verwendung ist der Versand dieser Datei
aus einem Blockly-/JavaScript-Skript heraus, z.B. als
Pushover-Benachrichtigungsanhang. Es werden nur die 10 zuletzt erzeugten
Bilder aufgehoben, ältere werden automatisch gelöscht, sobald ein neues
geschrieben wird. Die Alarmverarbeitung wartet auf die Fertigstellung
des Bildes, bevor sie fortfährt – `einsatzAktuell.kartenbildPfad` trägt daher
garantiert schon den richtigen Wert, sobald auch die übrigen Felder des
Einsatzes (z.B. `einsatzAktuell.alarmAktiv`) verfügbar werden – allerdings
höchstens bis zum konfigurierbaren **OSM-Timeout**: Ist der
Kachel-Download/die Bildzusammensetzung bis dahin nicht fertig, wird
eine Warnung geloggt und `einsatzAktuell.kartenbildPfad` bleibt für diesen
Einsatz leer, ohne die Alarmverarbeitung unbegrenzt zu blockieren.

| Feld | Beschreibung | Default |
| --- | --- | --- |
| OSM-Timeout (s) | Maximale Wartezeit auf das Bild (Kachel-Download und -Zusammensetzung), bevor ohne es fortgefahren wird (1-60) | `10` |
| Zoomstufe | OpenStreetMap-Zoomstufe (1 = ganze Welt, 19 = Gebäudeebene) - ein Maximalwert für das Polygon (wird bei Bedarf automatisch reduziert, damit das Einsatzgebiet vollständig sichtbar bleibt), ein fester Wert für die Punkt-Markierung | `19` |
| Marker- & Umrissfarbe | Farbe der zentrierten Punkt-Markierung, bzw. des Einsatzgebiet-Umrisses, wenn stattdessen ein Polygon gezeichnet wird | `#DD2020` |
| Bildbreite (px) | Breite des erzeugten PNGs | `600` |
| Bildhöhe (px) | Höhe des erzeugten PNGs | `400` |
| Einsatzgebiet-Polygon anzeigen | Das von WAIP-Web gesendete Original-Polygon zeichnen (an) vs. immer eine zentrierte Punkt-Markierung zeigen (aus) | *(an)* |
| Umriss-Strichstärke (px) | Linienstärke des Umrisses in Pixeln (1-12) | `4` |

Die Bilder liegen im eigenen Datenverzeichnis dieser Adapterinstanz
(`iobroker-data/<instance>/maps/`), nicht als ioBroker-Dateiobjekte –
`einsatzAktuell.kartenbildPfad` ist deshalb ein echter, absoluter
Dateisystempfad, den ein auf demselben Host laufendes Skript direkt
lesen kann. Dieses Verzeichnis wird **nicht** automatisch gelöscht,
wenn der Adapter gestoppt oder seine Instanzkonfiguration
zurückgesetzt wird; um es bei einer Deinstallation zu entfernen,
im Bestätigungsdialog beim Löschen der Instanz/des Adapters in Admin
die Option **"Auch Instanzdaten löschen"** anhaken (seit js-controller
4.0 / Admin 5 für das Instanzdaten-Verzeichnis jedes Adapters verfügbar
– standardmäßig nicht angehakt).

> **Hinweis:** Genutzt wird der offizielle, kostenlose Server
> `tile.openstreetmap.org`, der für gelegentliche/geringe Nutzung
> gedacht ist (siehe die
> [OSM Tile Usage Policy](https://operations.osmfoundation.org/policies/tiles/)).
> Ein Bild pro Einsatz bleibt deutlich darunter – die Zoomstufe nicht
> so weit reduzieren, dass riesige Gebiete abgedeckt werden, und das
> Ganze nicht zu einem Massen-Kachel-Abruf ausbauen.

### Dashboard

**Dashboard aktivieren** (Admin-Checkbox, standardmäßig aus): spiegelt
zusätzlich zum einzelnen aktuellen Einsatz unter [einsatzAktuell](#einsatzaktuell)
die letzten N Einsätze, die zum konfigurierten Monitor dieser Instanz
passen, als `dashboard.einsatz1` … `dashboard.einsatzN`. Sinnvoll bei
einer Monitor-ID, die auf "alle Wachalarme" (`0`) oder einen größeren
Kreis/Träger eingestellt ist, wo mehrere Einsätze gleichzeitig aktiv
sein können und `einsatzAktuell.*` allein immer nur den jeweils aktuellsten
zeigt.

Anders als die dauerhaft offene `/waip`-Verbindung dieses Adapters wird
das Dashboard periodisch aktualisiert: Der Adapter ruft die öffentliche
Einsatzübersichtsseite `/dbrd/` ab, filtert sie auf Einsätze, die zum
Monitor dieser Instanz passen (dieselbe `l`/`a`/`b`/`c`-Korrelation
Leitstelle/Kreis/Träger/Wache wie das Monitor-ID-Dropdown selbst –
siehe [Verbindung](#verbindung)), und öffnet für jeden der bis zu N
passenden Einsätze nacheinander (nie parallel) eine **kurzlebige**
Socket.IO-Verbindung, um dessen aktuellen Stand abzurufen, bevor sie
wieder geschlossen wird. Ein vollständiger Refresh dauert dadurch
realistisch einige Sekunden pro belegtem `einsatzN`, nicht Millisekunden –
das Minimum beim **Refresh-Intervall** unten trägt dem Rechnung.

| Feld | Beschreibung | Standard |
| --- | --- | --- |
| Number of incidents to show | Wie viele der aktuellsten passenden Einsätze angezeigt werden, `dashboard.einsatz1` … `einsatzN` (1–20) | `10` |
| Refresh interval (s) | Wie oft das Dashboard aktualisiert wird (30–300) | `60` |

Zusätzlich zum regulären Timer läuft ein Refresh auch einmal sofort
nach jedem (Neu-)Start des Adapters (damit das Dashboard nicht bis zum
konfigurierten Intervall leer bleibt) sowie einmal bei jedem neuen
Alarm für den eigenen Monitor dieser Instanz (`einsatzAktuell.*`). Ein
manueller Refresh lässt sich jederzeit über den Button-State
`dashboard.refreshNow` auslösen, z. B. per VIS-Button oder Skript.

Kartenbilder unter `dashboard.einsatzN.kartenbildPfad` werden **nicht**
eigens für das Dashboard erzeugt – sie werden aus demselben
Datei-Fundus abgeleitet, den [Einsatzkarte](#einsatzkarte) für den
eigenen Monitor dieser Instanz bereits erzeugt hat. `einsatzN` hat also
nur dann ein Kartenbild, wenn dieser Adapter für genau diesen Einsatz
über die eigene `einsatzAktuell.*`-Alarmverarbeitung bereits eines erzeugt
hat – am vollständigsten, wenn die **Monitor-ID** auf `0` (alle
Wachalarme) steht und **Kartenbild für jeden Einsatz erzeugen**
aktiviert ist, da dann jeder Einsatz, der im Dashboard erscheinen kann,
zuvor auch schon einmal `einsatzAktuell.*` durchlaufen hat. Bei einer
enger gefassten Monitor-ID fehlt `einsatzN`-Einträgen für Einsätze außerhalb
der eigenen Alarm-Historie das Kartenbild – das ist erwartetes
Verhalten, kein Fehler.

Wird das Feature deaktiviert, wird der komplette `dashboard.*`-Objekt-
baum entfernt (Kanäle und States, nicht nur deren Werte); wird **Number
of incidents to show** verringert, werden nur die dadurch nicht mehr
benötigten `einsatzN`-Einträge am Ende entfernt (z. B. entfernt eine Reduzierung von
10 auf 5 die Einträge `dashboard.einsatz6` … `einsatz10`). Beide Änderungen
wirken erst nach dem **nächsten Adapter-Neustart** nach dem Speichern
(ioBroker startet die Instanz ohnehin bei jeder Konfigurationsänderung
neu – die Entfernung passiert nicht sofort, während der Admin-Dialog
noch offen ist).

## States (unter `waip-web.0.*`)

Rückmeldungen und Routen sind pro Einsatz Listen (1:n). Sie liegen als
**flache** JSON-Arrays unter `einsatzAktuell.json.*` (keine verschachtelten
Objekte/Arrays innerhalb einer Zeile), damit sie direkt an VIS-Tabellen-
Widgets gebunden werden können – ergänzt um schnell bindbare Zähler,
damit Bindings und Trigger komplett ohne JSON-Parsing auskommen.

### info

| State | Typ | Beschreibung |
| --- | --- | --- |
| `connection` | boolean | Standard-ioBroker-Indikator: Verbindung zum WAIP-Server aktiv |

### status

| State | Typ | Beschreibung |
| --- | --- | --- |
| `connected` | boolean | Socket.IO-Verbindung technisch aufgebaut |
| `registeredMonitor` | string | Zuletzt beim Server registrierte Monitor-ID |
| `registeredMonitorName` | string | Anzeigename dieses Monitors ohne ID (z. B. „Leitstelle: Lausitz"); wird einmalig beim Start von derselben `/waip/`-Übersichtsseite wie das Admin-Dropdown aufgelöst, `null` falls nicht auflösbar |
| `registrationAccepted` | boolean | `true` sobald das erste Event empfangen wurde, sonst `false` direkt nach Connect oder nach Ablauf des Registrierungs-Timeouts |
| `registrationPending` | boolean | `true` direkt nach Connect, solange noch auf eine Antwort vom Server gewartet wird, sonst `false` sobald bestätigt oder Timeout erreicht |

### einsatzAktuell

Flache Felder des aktuell laufenden Einsatzes. Werden bei `io.standby`
geleert (`null`/`0`), analog zum offiziellen Frontend – `alarmAktiv` ist
damit ein verlässlicher Schalter dafür, ob hier gerade echte Live-Daten
stehen. Der zuletzt abgeschlossene Einsatz bleibt trotzdem über
`einsatzAktuell.json.history` abrufbar:

> **Hinweis:** Der Adapter bildet immer nur den zuletzt aktiv gemeldeten
> Einsatz ab (`einsatzAktuell.*` bzw. `einsatzAktuell.json.current`) – analog zum
> Alarmmonitor des offiziellen WAIP-Web-Frontends. Theoretisch können in
> WAIP-Web mehrere Einsätze gleichzeitig aktiv sein (z. B. wenn kurz
> hintereinander zwei Alarmierungen eingehen). Diese States sind **kein
> Array mehrerer laufender Einsätze**, sondern werden bei jedem neuen
> `io.new_waip`-Event überschrieben – ein zeitgleich zweiter laufender
> Einsatz ist über den Adapter aktuell nicht sichtbar. Eine vollständige
> Übersicht aller gerade aktiven Einsätze liefert derzeit nur das
> Dashboard der angebundenen WAIP-Web-Instanz selbst.

> **Hinweis:** WAIP-Web befüllt `einsatznummer`, `objekt`/`objektteil`,
> `besonderheiten`, `strasse`/`hausnummer`, `einsatzdetails` sowie das
> Berechtigungsflag serverseitig nur für **eingeloggte** Clients
> (`db_user_check_permission_for_waip()` im server-eigenen
> `server/waip.js`) – da dieser Adapter sich bewusst ohne Login
> verbindet (siehe [Über diesen Adapter](#über-diesen-adapter)), sendet
> der Server diese Felder immer leer bzw. `false`. Sie werden deshalb
> gar nicht erst als States geführt, statt dauerhaft leere Werte
> vorzuhalten.

| State | Typ | Beschreibung |
| --- | --- | --- |
| `alarmAktiv` | boolean | `true` seit dem letzten `io.new_waip`, `false` seit dem letzten `io.standby` |
| `restzeit` | number (s) | Verbleibende Sekunden bis `ablaufzeit`, sekündlich aktualisiert |
| `id` | number | Interne Einsatz-ID |
| `uuid` | string | Eindeutige Einsatz-UUID (dient auch der Zuordnung von Rückmeldungen) |
| `einsatzart` | string | z. B. „Brandeinsatz", „Hilfeleistungseinsatz", „Rettungseinsatz", „Krankentransport" |
| `stichwort` | string | Alarmstichwort |
| `beschreibung` | string | Beschreibung zu `stichwort`, lokal ermittelt (wird nicht vom Server gesendet) - siehe [Rettungsdienst](#rettungsdienst)/[Stichwort-Stammdaten](#stichwort-stammdaten) unten. `null` falls nichts passte |
| `ort` | string | Ort |
| `ortsteil` | string | Ortsteil (falls abweichend vom Ort) |
| `alarmierungszeit` | string (date) | Alarmzeit |
| `ablaufzeit` | string (date) | Ende der Standby-Anzeigedauer, Basis für `restzeit` |
| `sondersignal` | number | `1` = Sondersignal, sonst kein Sondersignal |
| `latitude` / `longitude` | number | Position des Einsatzortes (normalisiert aus wgs84-Feldern oder GeoJSON-Mittelpunkt) |
| `kartenbildPfad` | string | Pfad zum zuletzt erzeugten Einsatzkarten-Bild (PNG) - siehe [Einsatzkarte](#einsatzkarte). Leer bis das Bild für den aktuellen Einsatz fertig ist; wird außerdem zu Beginn eines neuen Einsatzes, bei einem Fehlschlag der Erzeugung oder falls das OSM-Timeout überschritten wird geleert (bzw. bleibt leer), sowie - wie die übrigen Felder oben - bei `io.standby`. Die zugrundeliegende Bild-Datei selbst wird beim Leeren des States nicht gelöscht (nur das 10er-Rotationslimit entfernt Dateien, siehe [Einsatzkarte](#einsatzkarte)) |
| `routenGesamt` | number | Anzahl Routen im aktuellen Einsatz |
| `rueckmeldungenGesamt` | number | Rückmeldungen gesamt im aktuellen Einsatz |
| `rueckmeldungen.rollen.ek` | number | Anzahl Rückmeldungen als Einsatzkraft |
| `rueckmeldungen.rollen.gf` | number | Anzahl Rückmeldungen als Gruppenführer |
| `rueckmeldungen.rollen.zf` | number | Anzahl Rückmeldungen als Zugführer |
| `rueckmeldungen.rollen.vf` | number | Anzahl Rückmeldungen als Verbandsführer |
| `rueckmeldungen.funktionen.agt` | number | Anzahl Rückmeldungen mit Atemschutz-Befähigung |
| `rueckmeldungen.funktionen.fzf` | number | Anzahl Rückmeldungen als Fahrzeugführer |
| `rueckmeldungen.funktionen.ma` | number | Anzahl Rückmeldungen als Maschinist |
| `rueckmeldungen.funktionen.med` | number | Anzahl Rückmeldungen mit medizinischer Befähigung |

### einsatzAktuell.json

Flache JSON-Objekte/Arrays, maximal eine Verschachtelungsebene, gedacht
zum direkten Binden an VIS-Tabellen-Widgets (verschachtelte Strukturen wie
ein einfaches `{routen, rueckmeldungen, ...}`-Objekt werden von diesen
Widgets in der Regel nicht dargestellt). `routen`/`rueckmeldungen`/
`emAlarmiert`/`emWeitere` enthalten immer nur die Daten des **aktuellen**
Einsatzes – sie werden bei `io.standby` geleert (`[]`) und sind **nicht**
Teil der History. Wie bei `einsatzAktuell.*` oben gilt auch hier: `current`
enthält immer nur den zuletzt aktiven Einsatz – siehe Hinweis im
Abschnitt [`einsatzAktuell`](#einsatzaktuell).

| State | Typ | Beschreibung |
| --- | --- | --- |
| `current` | string (JSON-Array) | Flache Daten des aktuellen Einsatzes: dieselben 12 Felder wie die einzelnen `einsatzAktuell.*`-States oben (`id` … `sondersignal`, plus `beschreibung`, `alarmierungszeit`, `lat`/`lon`), zusätzlich `registeredMonitor`/`registeredMonitorName` (der Monitor, auf den der Adapter zu diesem Zeitpunkt registriert war), gebündelt als ein Objekt innerhalb eines Arrays mit einem Element (`[]` falls kein Einsatz aktiv) – der Array-Wrapper ist nötig, weil die meisten Tabellen-Widgets am Root ein Array statt eines nackten Objekts erwarten |
| `history` | string (JSON-Array) | Letzte 10 abgeschlossenen Einsätze, gleiches Schema wie `current`, ein Array-Eintrag pro Einsatz, geschrieben bei `io.standby` |
| `routen` | string (JSON-Array) | Routen des aktuellen Einsatzes; jeder Eintrag hat `nr_wache`, `name_wache`, `color`, `lat`, `lon` (`position` zu flachem `lat`/`lon` aufgelöst - siehe Hinweis unten, wofür `lat`/`lon` bei einer Route steht) |
| `rueckmeldungen` | string (JSON-Array) | Rückmeldungen des aktuellen Einsatzes, wie vom Server empfangen |
| `emAlarmiert` | string (JSON-Array) | Alarmierte Einsatzmittel des aktuellen Einsatzes; jeder Eintrag hat `name`, `zeit`, `wache`, `zeit_alarmierung_iso`, `zeit_ausgerueckt_iso` |
| `emWeitere` | string (JSON-Array) | Weitere Einsatzmittel des aktuellen Einsatzes, gleiches Schema wie `emAlarmiert` |

> **Hinweis:** `routen[].lat`/`.lon` ist der **Standort der alarmierten Wache**, kein
> Punkt entlang der tatsächlichen Anfahrtsroute und nicht der Einsatzort. Der Server
> sendet jede Route entweder als vollständigen `LineString` (die berechnete Strecke
> von der Wache zum Einsatzort) oder, wenn keine Strecke berechnet werden konnte, als
> einzelnes Koordinatenpaar für die Wache selbst - in beiden Fällen löst der Adapter
> `lat`/`lon` auf den Wachenstandort auf (im `LineString`-Fall der erste Punkt der
> Linie), damit die Bedeutung über alle Einträge hinweg konsistent bleibt. Die
> vollständige Routen-Geometrie selbst wird nicht als State bereitgestellt.

### einsatzAktuell.tts

Sprachansage (`io.playtts`) zum aktuell laufenden Einsatz – liegt unter
`einsatzAktuell` statt in einem eigenen Top-Level-Kanal, da sie ohne Einsatzbezug
keine Bedeutung hat. Keine History: eine TTS-Ansage ist nur im Moment
relevant, deshalb wird nur die jeweils letzte vorgehalten.

| State | Typ | Beschreibung |
| --- | --- | --- |
| `last` | string (URL) | Vollständige, absolute URL zur mp3-Datei der letzten Sprachansage. Der Server sendet nur einen (oft relativen) Pfad, der als `audio.src` in einem Browser mit derselben Origin gedacht ist; der Adapter löst diesen gegen die konfigurierte WAIP-Server-URL auf, damit der Link auch außerhalb der WAIP-Web-Seite funktioniert (z.B. in einem VIS-Audio-Widget) |
| `lastTimestamp` | string (date) | Zeitpunkt der letzten Ansage |

<a id="dashboard-states"></a>

### dashboard

Nur vorhanden, wenn [Dashboard](#dashboard) aktiviert ist – siehe dort
für den Objektbaum-Lebenszyklus bei Aktivierung/Deaktivierung/
Größenänderung. `dashboard.einsatzN` (`N` = 1 … die konfigurierte
Anzahl anzuzeigender Einsätze) spiegelt dasselbe Schema wie `einsatzAktuell`/`einsatzAktuell.json`
oben, für den N-aktuellsten Einsatz, der zum Monitor dieser Instanz
passt – **nicht** beschränkt auf den einen aktuellen Einsatz. Alle
Felder eines belegten `einsatzN` werden bei jedem Refresh immer komplett
neu geschrieben (nicht nur bei Änderung), damit laufende Rückmeldungen
für einen Einsatz, der über mehrere Refreshs hinweg an demselben `einsatzN`
bleibt, weiter aktualisiert werden; ein unbelegtes `einsatzN` (weniger
passende Einsätze als konfiguriert) trägt an allen Feldern den
Leerwert, genau wie `einsatzAktuell.*`, wenn kein Einsatz aktiv ist.

Bewusst **ohne** `restzeit`/`ablaufzeit` (WAIP-Webs `/dbrd/`-
Einsatzdetaildaten haben kein entsprechendes Feld, anders als der
Live-Alarmstream unter `/waip`) und ohne Entsprechung zu `einsatzAktuell.tts`
(kein TTS-Event im `/dbrd`-Namespace vorhanden). Umgekehrt hat
`dashboard.einsatzN.json.wachen` kein `einsatzAktuell.json.*`-Gegenstück – es
stammt aus einem Feld (`wachen[]`, die am Einsatz beteiligten Wachen),
das nur im `/dbrd`-Payload enthalten ist.

| State | Typ | Beschreibung |
| --- | --- | --- |
| `refreshNow` | boolean (Button) | `true` schreiben, um einen sofortigen Dashboard-Refresh auszulösen, z. B. per VIS-Button oder Skript. Setzt sich nach Abschluss des Refreshs selbst auf `false` zurück |
| `einsatzN.alarmAktiv` | boolean | `true`, solange `einsatzN` mit einem passenden Einsatz belegt ist |
| `einsatzN.id` | number | Interne Einsatz-ID |
| `einsatzN.uuid` | string | Eindeutige Einsatz-UUID |
| `einsatzN.einsatzart` | string | Gleiche Bedeutung wie [einsatzAktuell.einsatzart](#einsatzaktuell) |
| `einsatzN.stichwort` | string | Alarmstichwort |
| `einsatzN.beschreibung` | string | Beschreibung zum Stichwort, ermittelt wie bei [einsatzAktuell.beschreibung](#einsatzaktuell) |
| `einsatzN.ort` | string | Ort |
| `einsatzN.ortsteil` | string | Ortsteil (falls abweichend von `ort`) |
| `einsatzN.alarmierungszeit` | string (date) | Alarmierungszeitpunkt |
| `einsatzN.sondersignal` | number | `1` = Sondersignal (Blaulicht & Martinshorn), sonst keins |
| `einsatzN.latitude` / `einsatzN.longitude` | number | Einsatzort, gleiche Normalisierung wie bei [einsatzAktuell](#einsatzaktuell) |
| `einsatzN.kartenbildPfad` | string | Pfad zu einem passenden, bereits erzeugten Einsatzkarten-Bild – siehe [Dashboard](#dashboard) oben. Leer, falls keins gefunden wurde |
| `einsatzN.routenGesamt` | number | Anzahl Routen für den Einsatz von `einsatzN` |
| `einsatzN.rueckmeldungenGesamt` | number | Rückmeldungen gesamt für den Einsatz von `einsatzN` |
| `einsatzN.rueckmeldungen.rollen.*` / `.funktionen.*` | number | Dieselben acht Rückmeldungs-Zähler wie bei [einsatzAktuell.rueckmeldungen](#einsatzaktuell), pro `einsatzN` |
| `einsatzN.json.current` | string (JSON-Array) | Flache Einsatzdaten von `einsatzN`, gleiches Schema wie `einsatzAktuell.json.current` (ohne `registeredMonitor`/`registeredMonitorName`) |
| `einsatzN.json.routen` | string (JSON-Array) | Routen des Einsatzes von `einsatzN`, gleiches Schema wie `einsatzAktuell.json.routen` |
| `einsatzN.json.rueckmeldungen` | string (JSON-Array) | Rückmeldungen des Einsatzes von `einsatzN` |
| `einsatzN.json.emAlarmiert` | string (JSON-Array) | Alarmierte Einsatzmittel des Einsatzes von `einsatzN` |
| `einsatzN.json.wachen` | string (JSON-Array) | Am Einsatz von `einsatzN` beteiligte Wachen (`em_station_id`/`em_station_name`) – nur über `/dbrd` verfügbar, kein `einsatzAktuell.json.*`-Gegenstück |

### debug

| State | Typ | Beschreibung |
| --- | --- | --- |
| `lastEvent` | string (JSON-Array) | Letztes empfangenes Socket-Event (Name + Zeitstempel), zur Verbindungsdiagnose; einelementiges Array (`[]` falls noch keins), für VIS-Tabellen-Kompatibilität |
| `normalizedPosition` | string (JSON-Array) | Ergebnis der Geodaten-Normalisierung für das letzte `io.new_waip`-Event, als flaches einelementiges `[{lat, lon}]`-Array (beide `null`, falls keine gültige Position ermittelt werden konnte; `[]` falls noch kein Event), für VIS-Tabellen-Kompatibilität |
| `rawPayloadShort` | string | Vorschau (500 Zeichen) der rohen, unnormalisierten `io.new_waip`-Nutzlast |
| `ignoredCount` | number | Anzahl verworfener Events (Payload nannte explizit eine andere Monitor-ID) |
| `monitorAudit` | string (JSON-Array) | Chronologisches Log von Connect-/Registrierungs-/Reconnect-Ereignissen (200 Einträge) |
| `sessionExpires` | string (date) | Ablaufzeit des Session-Cookies laut letzter Erneuerung |
| `lastError` | string | Letzte vom Server gemeldete Fehlermeldung (`io.error`); reiner Text, kein JSON, da der Server hier einen bloßen String sendet |
| `serverVersion` | string | Zuletzt gemeldete Server-Instanz-ID (`io.version`); Änderung deutet auf Server-Neustart hin |

## Logging

Sämtliche Log-Texte sind auf Englisch, unabhängig von der ioBroker-
Systemsprache (nur UI-Texte wie Admin-Beschriftungen werden übersetzt).
Wiederkehrbare Fehlerzustände (Session-Cookie-Erneuerung,
WAIP-Registrierung, die Socket.IO-Verbindung, eine Flut von
Falscher-Monitor-Events) werden beim ersten Auftreten einmalig auf `warn`
geloggt, danach solange sie bestehen nur noch auf `debug`, und bei
Erholung einmalig auf `info` – entsprechend der
[offiziellen ioBroker-Logging-Richtlinie](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md#logging).

Eine vollständige Referenz aller Log-Meldungen (gruppiert nach Level, mit
Ursache und Beispieltext) gibt es in **[LOGGING.md](/#/docs/adapterref/iobroker.waip-web/LOGGING.md)** (auf
Englisch, wie auch der Quelltext des Adapters selbst).

## Lizenz und Changelog

Lizenz und vollständiges Changelog stehen in der
[englischen README](/#/adapters/waip-web#license) (`## License`, `## Changelog`).