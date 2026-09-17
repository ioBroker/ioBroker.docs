---
chapters: {"pages":{"en/adapterref/iobroker.waip-web/README.md":{"title":{"en":"ioBroker.waip-web"},"content":"en/adapterref/iobroker.waip-web/README.md"},"en/adapterref/iobroker.waip-web/README.de.md":{"title":{"en":"ioBroker.waip-web"},"content":"en/adapterref/iobroker.waip-web/README.de.md"},"en/adapterref/iobroker.waip-web/LOGGING.md":{"title":{"en":"Logging reference"},"content":"en/adapterref/iobroker.waip-web/LOGGING.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.waip-web/README.md
title: ioBroker.waip-web
hash: Ou1t65+qGMcGIkn/BmxGJpWNGqJSLZgc4pVsHp9aTRk=
---
![Logo](../../../en/adapterref/iobroker.waip-web/admin/waip-web-logo.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.waip-web.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.waip-web.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/waip-web-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/waip-web-stable.svg)
![Test und Freigabe](https://github.com/rnc11/ioBroker.waip-web/actions/workflows/test-and-release.yml/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/waip-web/svg-badge.svg)
![Lizenz](https://img.shields.io/npm/l/iobroker.waip-web.svg)

# ioBroker.waip-web

🇩🇪 [Deutsche Version dieser README](/#/docs/adapterref/iobroker.waip-web/README.de.md)

ioBroker-Adapter für **Wachalarm IP-Web (WAIP-Web)**

Verbindet sich über Socket.IO mit einem WAIP-Web-Dispatch-Monitor und spiegelt Vorfälle („Einsatz“), Rückmeldungen der Einsatzkräfte („Rückmeldungen“), Routen und TTS-Ansagen in ioBroker-Zustände – ohne dass ein Browser-Tab geöffnet bleiben muss.

## Inhaltsverzeichnis

- [Über diesen Adapter](#about-this-adapter)
- [Über WAIP-Web](#about-waip-web)
- [Praktische Anwendungsfälle](#practical-use-cases)
- [Merkmale](#features)
- [Konfiguration](#configuration)
  - [Verbindung](#connection)
  - [Warum ein Session-Cookie benötigt wird](#why-a-session-cookie-is-needed)
  - [Rettungsdienst](#rescue-service)
  - [Schlüsselwortbeschreibungen](#keyword-descriptions)
  - [Abbildung der Vorfallskarte](#incident-map-image)
  - [Armaturenbrett](#dashboard)
- [Staaten (unter `waip-web.0.*`)](#states-under-waip-web0)
  - [info](#info) · [Status](#status) · [einsatzAktuell](#einsatzaktuell) · [einsatzAktuell.json](#einsatzaktuelljson) · [einsatzAktuell.tts](#einsatzaktuelltts) · [Dashboard](#dashboard-states) · [debug](#debug)
- [Protokollierung](#logging)
- [Änderungsprotokoll](#changelog)
- [Lizenz](#license)

## Über diesen Adapter

Dieser Adapter ist ein **unabhängiges, von der Community entwickeltes Projekt** und steht in keiner Verbindung zum WAIP-Web-Projekt, zu Robert-112 oder zum Betreiber einer bestimmten Instanz (z. B. der Integrierten Regionalleitstelle Lausitz). Er wurde durch Analyse des Verhaltens des Frontends entwickelt (`client_waip.js`) dass eine WAIP-Web-Instanz öffentlich für jeden Browser bereitgestellt wird, um dieselben Socket.IO-Ereignisse und Datenfelder zu replizieren, die ein regulärer Browserclient empfängt.

Der Adapter stellt die Verbindung **ohne Anmeldung her** und empfängt daher ausschließlich die öffentlichen Berechtigungen von WAIP-Web (Schlüsselwort, Standort, ungefähre Position, gemeldete Ressourcen, Feedback) – dieselben Daten, die jeder anonyme Browserbesucher ohne Anmeldung sehen würde. Es werden keine Zugriffsbeschränkungen umgangen.

> **Hinweis:** Ein permanent aktiver, automatisierter Client wie dieser Adapter unterscheidet sich von einem gelegentlich geöffneten Browsertab. Bevor Sie ihn in einer Produktionsumgebung einsetzen, klären Sie bitte kurz mit dem Betreiber/Ihrer Leitstelle ab, ob eine permanente automatisierte Verbindung erwünscht ist.

## Über WAIP-Web

[Wachalarm IP-Web](https://github.com/Robert-112/n112_waip-web) ist eine Open-Source-Webanwendung von **Robert-112** , die Einsatz- und Alarminformationen für Feuerwehren und Rettungsdienste geräteunabhängig im Browser anzeigt (Windows, Linux, Mac, Smartphone – keine Installation erforderlich). Sie bietet unter anderem folgende Funktionen:

- **Alarmüberwachung** – Vorfallart, Stichwort, Sondersignal, Standort, Karte, alarmierte Einsatzkräfte, App-basierte Rückmeldung an die Einsatzkräfte einschließlich Sprachansagen
- **Dashboard** – Übersicht aller laufenden Vorfälle
- **Feedback-Funktion** – App-basiertes Feedback der Einsatzkräfte, gruppiert nach Rolle (EK/GF/ZF/VF) und Zusatzqualifikation (AGT/FZF/MA/MED)
- **Administration** – Benutzerverwaltung, Stationsdaten, Monitorübersicht

WAIP-Web selbst ist unter [**der Creative Commons BY-SA 4.0-**](https://creativecommons.org/licenses/by-sa/4.0/) Lizenz lizenziert. Dieser Adapter enthält keinen Code aus dem WAIP-Web-Projekt; er implementiert einen unabhängigen Client für dessen Socket.IO-Schnittstelle.

## Praktische Anwendungsfälle

In diesem Abschnitt geht es darum, was Sie mit den von diesem Adapter bereitgestellten Zuständen konkret _realisieren_ können – typische Anwendung in einer Feuerwehrwache/einem Rettungsdienst:

- **Wandmontiertes Alarmdisplay.** Binden `einsatzAktuell.json.current` auf einem VIS-Tabellen-Widget auf einem an der Wand montierten Tablet oder Fernseher im Aufenthaltsraum/Fahrzeughalle – Vorfallart, Stichwort, Adresse und alarmierte Ressourcen werden automatisch angezeigt, ohne dass jemand einen Browser-Tab auf diesem Bildschirm geöffnet halten muss (was der eigentliche Grund für die Existenz dieses Adapters ist).
- **Schlüsselwörter in einfacher Sprache auf Anzeigen und Benachrichtigungen.** `einsatzAktuell.beschreibung` wandelt einen kryptischen Dispatch-Code um (`B:Wald groß/WSP`, `R1N0`) in eine lesbare Beschreibung umwandeln („Wald-/Getreidefeldbrand (groß)“, „Rettungswagen: 1, Notfalleinsatzfahrzeug: 0“) – daneben binden `einsatzAktuell.stichwort` auf dem Wanddisplay anzeigen oder in die Push-Benachrichtigung/TTS-Ansage aufnehmen, damit sich die Mitglieder nicht jedes einzelne Schlüsselwort merken müssen.
- **Automatisierungen werden sofort nach Eingang eines Alarms ausgelöst.** Beobachten `einsatzAktuell.alarmAktiv` (oder `info.connection` zusammen damit) in einem Skript/einer Blockly-Regel, um die Beleuchtung in der Fahrzeughalle einzuschalten, ein Tor/eine Tür zu öffnen, eine Push-Benachrichtigung zu senden (z. B. über einen Telegram-/Pushover-Adapter) mit `einsatzAktuell.stichwort` /`einsatzAktuell.beschreibung` +`einsatzAktuell.ort` oder eine intelligente Lichtszene aufblitzen lassen – alles wenige Sekunden nach dem eigentlichen Pager-Alarm, kein Polling erforderlich, da ioBroker-Statusänderungen sofort ausgelöst werden.
- **Den Alarm laut ausrufen.** `einsatzAktuell.tts.last` ist eine sofort abspielbare, absolute MP3-URL; verweisen Sie auf a `sonos` /`snapcast` /`text2speech` Nutzen Sie dafür eine Automatisierung (oder spielen Sie die URL direkt ab), um den Vorfall über die Lautsprecher im Gebäude bekannt zu geben, sobald er gemeldet wird. `io.playtts` Feuerstellen – nützlich dort, wo nicht alle Mitglieder auf einen Bildschirm schauen.
- **Live-Teilnehmerzählung / Feedback-Anzeigetafel.** Die `einsatzAktuell.rueckmeldungen.*` Zähler (`rollen.ek` /`.gf` /`.zf` /`.vf` pro Rolle `funktionen.agt` /`.fzf` /`.ma` /`.med` (pro Qualifikation) Aktualisierung in Echtzeit, sobald die Einsatzkräfte über die App bestätigen – Verknüpfung mit Mess- oder Zahlen-Widgets für einen schnellen Überblick darüber, wer während des Einsatzes kommt.
- **Nachbesprechung des Vorfalls / Statistik.** `einsatzAktuell.json.history` Speichert die letzten N abgeschlossenen Vorfälle (konfigurierbar, Standard 10) als flache Tabelle – bindet sie an eine zweite VIS-Ansicht oder exportiert sie regelmäßig (z. B. über ein Skript, das den Status ausliest). `io.standby`) um ein längerfristiges Protokoll zu führen oder die Anzahl der Vorfälle in ein Dashboard/einen Statistikadapter einzuspeisen.
- **Routen-/Fahrzeugübersicht auf einer Karte.** `einsatzAktuell.json.routen` trägt die jeder Einsatzstation. `lat` /`lon` Und `color` – Binden Sie es an ein VIS-Karten-Widget, um unabhängig von der WAIP-Web-Karte schnell visuell zu erkennen, wer unterwegs ist.
- **Schnittstelle zu anderen ioBroker-Automatisierungen.** Da jedes Feld ein einfacher ioBroker-Status ist, lässt es sich mit allem anderen, was bereits in der Instanz läuft, kombinieren – vorwärts `einsatzAktuell.*` in eine Smart-Home-Szenen-Engine, eine Grafana/InfluxDB-Historie zur Analyse der Antwortzeiten oder einen Node-RED-ähnlichen Ablauf über den ioBroker MQTT-Adapter, ohne eine einzige Zeile Code für die WAIP-Web-API schreiben zu müssen.

## Merkmale

- Verbindet sich mit dem `/waip` Namespace via `socket.io-client`, registriert über `emit('WAIP', monitorId)` einmal (verlässt sich auf `REGISTRATION_TIMEOUT_MS` als Ausweichlösung anstelle wiederholter Anfragen, da eine redundante Anfrage den Server nur dazu veranlasst, erneut zu antworten, ohne die Zustellungssicherheit zu verbessern)
- Manuelle Wiederverbindungsbehandlung (die automatische Wiederverbindungsfunktion der Bibliothek ist deaktiviert) mit konfigurierbarer Verzögerung
- Registrierungs-Timeout mit Audit-Log (`debug.monitorAudit`)
- Geodatennormalisierung (wgs84 Felder, `position` oder GeoJSON `geometry` → Schwerpunkt)
- Historie der letzten N abgeschlossenen Vorfälle (konfigurierbar, Standardwert 10; `einsatzAktuell.json.history`)
- Separate Handler für Alarme (`io.new_waip`), Rückmeldung (`io.new_rmld`), Routen (`io.routes`), TTS (`io.playtts`) und Standby (`io.standby`)
- Automatische Verwaltung von Session-Cookies (siehe unten), sodass die Alarmzustellung auch ohne geöffnete Browsersitzung unbegrenzt funktioniert.
- Server-Neustart-Erkennung über `io.version` mit automatischer Sitzungsaktualisierung und Wiederverbindung
- Vorfall-, Feedback-, Routen- und Alarmierungsressourcendaten sind als separate, flache JSON-Arrays verfügbar unter `einsatzAktuell.json.*` – Keine Verschachtelung, sodass VIS-Tabellen-Widgets direkt daran gebunden werden können.
- Zusammengefasste Feedbackzähler pro Rolle/Fähigkeit, die die Live-Badges auf der Web-Benutzeroberfläche widerspiegeln.
- Sauberer Zustand bei jedem Neustart: Alle Zustände werden aktiv auf ihren leeren Wert zurückgesetzt (`false` /`0` /`null` /`[]`) beim Start des Adapters, außer `einsatzAktuell.json.history` Und `debug.monitorAudit` (beide bleiben auch nach Neustarts erhalten). Beachten Sie, dass die Live-Felder des Adapters (`einsatzAktuell.*`) werden ebenfalls gelöscht und erst wieder aufgefüllt, wenn der Server das nächste Ereignis für diesen Vorfall sendet.
- Schutz vor veralteten Daten: Wenn ein neuer Vorfall beginnt, bevor die Routen/Feedback-Ereignisse des vorherigen Vorfalls für den _neuen_ Vorfall eingegangen sind, `einsatzAktuell.json.routen` /`.rueckmeldungen` und die Feedback-Zähler werden sofort zurückgesetzt, anstatt auf diese Ereignisse zu warten. Und wenn `io.standby` Wird ein Vorfall jemals nicht erfasst (z. B. aufgrund einer Verbindungsunterbrechung zum falschen Zeitpunkt), schließt ein Überwachungssystem den Vorfall automatisch ab, sobald er erfasst ist. `ablaufzeit` ist mehr als eine Kulanzfrist (60 Sekunden) verstrichen, anstatt veraltete "aktive" Daten auf unbestimmte Zeit zu belassen.
- Es wird stets nur der zuletzt aktive Vorfall angezeigt; mehrere gleichzeitig aktive Vorfälle können derzeit nur über das Dashboard der WAIP-Web-Instanz eingesehen werden.
- Optionale Beschreibung in einfacher Sprache für `einsatzAktuell.stichwort` (`einsatzAktuell.beschreibung`), lokal aufgelöst aus einer vom Benutzer verwalteten Schlüsselworttabelle plus einem optionalen Decoder für die `R<RTW>N<NEF>` Schlüsselwortschema für Rettungsdienste, das von mehreren Leitstellen verwendet wird – siehe [Rettungsdienst](#rescue-service)
- Einsätze des Rettungsdienstes können vollständig ignoriert werden (keine Statusmeldungen, keine Historie, keine Sprachausgabe) – nützlich, wenn WAIP sie von vornherein nur unzuverlässig meldet, siehe [Rettungsdienst](#rescue-service)
- Optionales Einsatzkartenbild: Eine PNG-Datei, zentriert auf die Einsatzkoordinaten, lokal aus OpenStreetMap-Kacheln erstellt, wobei das von WAIP-Web übermittelte Einsatzgebiet als Umriss in konfigurierbarer Farbe/Dicke dargestellt wird (alternativ als einfacher Markierungspunkt umschaltbar), bei Bedarf automatisch verkleinert wird, um das gesamte Gebiet sichtbar zu halten; der Dateipfad wird als Status angezeigt – siehe [Einsatzkartenbild](#incident-map-image)
- Optionales Dashboard: Spiegelt die letzten N Vorfälle wider, die dem Monitor dieser Instanz entsprechen. `dashboard.einsatz1` …`einsatzN` Die Daten werden regelmäßig über kurzlebige Verbindungen abgefragt (keine permanente Dashboard-Verbindung) – siehe [Dashboard.](#dashboard)

## Konfiguration

In der Admin-Benutzeroberfläche der Adapterinstanz sind die Einstellungen auf vier Registerkarten gruppiert: **Verbindung** , **Rettungsdienst** , **Schlüsselwortbeschreibungen** und **Vorfallkartenbild** – siehe unten für alle vier.

### Verbindung

| Feld                                  | Beschreibung                                                                                                                                                                                                                                                                 | Standard                                  |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| WAIP-Server-URL                       | Basis-URL der WAIP-Web-Instanz                                                                                                                                                                                                                                               | `https://wachalarm.leitstelle-lausitz.de` |
| Monitor-ID                            | Aus einer Live-Dropdown-Liste ausgewählt, abgerufen vom konfigurierten Server. `/waip/` Übersichtsseite und gruppiert nach Leitstelle/Kreis/Träger/Wache; manuelle Eingabe bleibt möglich, falls der Server nicht erreichbar ist. Leer/`0` = globaler Monitor (alle Vorfälle) | _(leer)_                                  |
| Registrierungs-Timeout (s)            | Zeit bis zur Protokollierung einer fehlenden Registrierungsbestätigung                                                                                                                                                                                                       | `10`                                      |
| Wiederverbindungsverzögerung (s)      | Wartezeit vor einer manuellen Wiederverbindung nach Trennung/Fehler                                                                                                                                                                                                          | `5`                                       |
| Anzahl der Vorfälle in der Geschichte | Wie viele abgeschlossene Vorfälle sollen aufbewahrt werden? `einsatzAktuell.json.history` (Neueste zuerst). Vorhandene Einträge, die einen festgelegten Grenzwert überschreiten, werden beim nächsten Neustart des Adapters entfernt.                                         | `10`                                      |

Das Session-Keepalive-Intervall ist **nicht konfigurierbar** – es wird bei jeder Erneuerung automatisch aus der vom Server gemeldeten Cookie-Lebensdauer abgeleitet (min. 55 s, max. 5 min, passend zum aktuellen Cookie). `/js/session_keepalive.js` (auf der Website selbst).

### Warum ein Session-Cookie benötigt wird

Der WAIP-Webserver verknüpft die Alarmzustellung mit einem Express-Session-Cookie, das ein Browser alle paar Minuten automatisch über ein mitgeliefertes Skript erneuert. Ein einfacher Socket.IO-Client erhält dieses Cookie nicht automatisch – der Adapter ruft es daher selbst ab. `GET /session/keepalive` und verbindet es mit der Socket.IO-Verbindung.

Laut WAIP-Web-Quellcode ist die Lebensdauer des Cookies **pro Instanz über eine Umgebungsvariable konfigurierbar** (Serverstandard: 60 Sekunden; diese Instanz verwendet offenbar 10 Minuten). Ein festes Erneuerungsintervall wäre daher für andere WAIP-Web-Instanzen möglicherweise ungeeignet. Der Adapter ermittelt das tatsächliche Intervall stattdessen **adaptiv** aus der vom Server bei jedem Aufruf gemeldeten Ablaufzeit (80 % der beobachteten Lebensdauer, mindestens 55 Sekunden, maximal 5 Minuten) – genau dieselbe Begrenzung, die auch für andere Instanzen gilt. `/js/session_keepalive.js` wird auf der Website selbst verwendet.

### Rettungsdienst

**Vorfälle des Rettungsdienstes bearbeiten** (Administrator-Kontrollkästchen, standardmäßig **aktiviert** ): Vorfälle, deren `einsatzart` kennzeichnet sie als Rettungsdienstanruf (enthält „Rettung“ oder „Krankentransport“, Groß-/Kleinschreibung wird nicht beachtet – siehe die `einsatzart` Beispiele in [einsatzAktuell](#einsatzaktuell) werden standardmäßig normal verarbeitet und entsprechen jeder vorherigen Version des Adapters. Durch Deaktivieren dieses Kontrollkästchens **ignoriert der Adapter solche Vorfälle vollständig** : nein `einsatzAktuell.*` Die Status werden aktualisiert, es wird kein Verlaufseintrag geschrieben und keine TTS-Ansage ausgelöst.

- Als ob der Vorfall nie stattgefunden hätte. Dies ist notwendig, da Rettungseinsätze angeblich nur in einigen Regionen/Leitstellen überhaupt über WAIP gemeldet werden. Wo dies nicht der Fall ist oder nicht gewünscht wird, deaktiviert diese Option die Benachrichtigung. Alles unterhalb dieser Option auf dem Tab (das Kontrollkästchen für die Dekodierung und die zugehörigen Beschriftungsfelder) wird nur angezeigt, solange die Option aktiviert ist. Ist sie deaktiviert, werden Rettungseinsätze ohnehin ignoriert, sodass deren Schlüsselwortdekodierung irrelevant ist.

`einsatzAktuell.stichwort` wird unverändert als reiner Code vom Server weitergeleitet (z. B. `B2`, `H:VU mit P`) – WAIP-Web selbst erklärt nicht, was es bedeutet, und es gibt keinen landesweiten Standard: Jede Leitstelle verwendet ihren eigenen Stichwortkatalog. `einsatzAktuell.beschreibung` Diese Lücke wird **vollständig lokal** geschlossen, es werden keine Daten an Dritte gesendet. Dieser Tab ist die erste von zwei überprüften Datenquellen (siehe [Stichwortbeschreibungen](#keyword-descriptions) für die zweite):

**Dekodierung des Rettungsdienstes** (Admin-Kontrollkästchen, standardmäßig aktiviert): wenn das Schlüsselwort mit dem Muster übereinstimmt `R<RTW-count>N<NEF-count>[p][f][-NT]` (z.B `R1N0` → „Rettungswagen: 1, Notfalleinsatzfahrzeug: 0“) wird automatisch eine Beschreibung generiert. Zwei Schreibweisen des `p` /`f` /`NT` Teile werden erkannt: ohne Leerzeichen und mit einem Bindestrich davor `NT` (z.B `R1N1p`, `R1N0-NT` (siehe [Leitstelle Lausitz' dokumentierte Erklärung](https://www.leitstelle-lausitz.de/anpassung-der-einsatzstichworte-rettungsdienst/) dazu), und mit Leerzeichen und ohne Bindestrich (z. B. `R1N1 p`, `R1N0 nt` (wie vom IRLS Brandenburg verwendet) – dieses Schema (in beiden Schreibweisen) wird von mehreren deutschen Leitstellen genutzt, nicht nur von diesen beiden – hat keine Auswirkung, wenn Ihre Leitstelle keines dieser Muster verwendet, da das Schlüsselwort dann nicht übereinstimmt. Der Text für jeden Abschnitt ist selbst konfigurierbar (5 zusätzliche Textfelder erscheinen, sobald das Kontrollkästchen aktiviert ist), da der Adapter mehrsprachig ist und diese Bezeichnungen nicht automatisch übersetzt werden:

| Teil                | Bedeutung                             | Standardbezeichnung                        |
| ------------------- | ------------------------------------- | ------------------------------------------ |
| `R<n>`              | Anzahl Krankenwagen (Rettungswagen)   | `Rettungswagen`                            |
| `N<n>`              | Anzahl der Einsatzfahrzeuge           | `Notfalleinsatzfahrzeug`                   |
| `p` Suffix          | Polytrauma                            | `Polytrauma`                               |
| `f` Suffix          | Ersthelfer eingeschlossen             | `First Responder`                          |
| `-NT` /` nt` Suffix | Spezialtransport mit dem Krankenwagen | `Notfalltransport mit Notfallkrankenwagen` |

### Schlüsselwortbeschreibungen

Wurde nur geprüft, wenn der Decoder auf der Registerkarte [„Rettungsdienst“](#rescue-service) nicht übereinstimmte: eine Liste von `{keyword pattern, description, match type}` Zeilen – Übereinstimmungstyp ist `starts with` oder `contains` Der Vergleich unterscheidet nicht zwischen Groß- und Kleinschreibung und behandelt Leerzeichen und Bindestriche als gleichwertig (jede Folge von Leerzeichen oder Bindestrichen wird vor dem Vergleich zu einem einzelnen Zeichen zusammengefasst), z. B. `H:VU mit P`, `H:VU-mit-P` Und `H:VU - mit - P` Alle Treffer befinden sich in derselben Zeile – es ist nicht nötig, für jede Schreibvariante eine separate Zeile hinzuzufügen. Wenn mehrere Zeilen übereinstimmen, **gewinnt automatisch das spezifischste (längste) Muster** – die Zeilenreihenfolge hat keinen Einfluss auf die Übereinstimmung, sodass die Tabelle nach jeder Spalte (durch Klicken auf die Spaltenüberschrift) beliebig sortiert werden kann, ohne dass sich das Verhalten ändert. Die Tabelle enthält bereits eine Beispiel-Schlüsselwortliste für Feuerwehr/Rettungsdienst (`B:...` /`H:...` Diese Tabelle dient lediglich als Ausgangspunkt – es wird **nicht** garantiert, dass sie mit dem tatsächlichen Katalog eines bestimmten Dispatch-Centers übereinstimmt. Bearbeiten oder ersetzen Sie sie bei Bedarf vollständig. Um diese Tabelle zu sichern oder zu übertragen, verwenden Sie die Standard-Instanzkonfigurations-Export-/Importfunktion (JSON) von ioBroker. Laden Sie nach dem Import **die Admin-Seite neu** , bevor Sie diese Tabelle überprüfen – der Dialog zum Öffnen der Konfiguration aktualisiert sie nicht automatisch aus einem externen Import (eine Einschränkung der Status-Synchronisierung der Admin-Tabellenkomponente selbst, die nicht von diesem Adapter gesteuert wird).

Falls weder diese Tabelle noch der obige Decoder übereinstimmen, `einsatzAktuell.beschreibung` ist einfach `null` - kein Fehler.

### Abbildung der Vorfallskarte

**Für jeden Vorfall wird ein Kartenbild generiert** (Administrator-Kontrollkästchen, standardmäßig deaktiviert): Wenn dieses Kontrollkästchen aktiviert ist und ein Vorfall gültige Koordinaten enthält, lädt der Adapter die benötigten Kacheln aus dem öffentlichen Kartenmaterial herunter. `tile.openstreetmap.org` Der Server fügt sie zu einer einzigen PNG-Datei zusammen, die auf den Ort des Vorfalls zentriert ist, und fügt den OpenStreetMap-Urhebervermerk (der gemäß der ODbL-Lizenz erforderlich ist) in die linke untere Ecke ein.

Standardmäßig sendet der Vorfallbereich WAIP-Web die `geometry` Das Ereignisfeld (üblicherweise ein kreisförmiges Polygon um den Ort, nicht nur dessen Mittelpunkt) wird als Umriss in konfigurierbarer Farbe und Stärke in das Bild eingezeichnet – die ursprüngliche Form, die der Server gesendet hat, nicht eine Markierung am Schwerpunkt. **Die Option „Ereignisbereich-Polygon anzeigen“** (Admin-Kontrollkästchen, standardmäßig aktiviert) steuert dies: Deaktivieren Sie sie, um stattdessen immer einen einfachen Markierungspunkt im Mittelpunkt anzuzeigen, selbst wenn ein Polygon verfügbar ist. Der Punkt wird auch automatisch verwendet, wenn das Ereignis gar kein Polygon enthält (z. B. nur einen Punkt) – dies ist dann die einzige Option, unabhängig vom Kontrollkästchen. Der Ereignisbereich bleibt beim Zeichnen des Polygons immer vollständig sichtbar: Wenn er bei der konfigurierten Zoomstufe nicht in das Bild passt, zoomt der Adapter automatisch so weit heraus (niemals hinein), dass der gesamte Bereich angezeigt wird, anstatt ihn am Rand abzuschneiden.

**Zoomstufe** , **Markierungs- und Umrissfarbe** sowie **Bildbreite/-höhe** befinden sich oberhalb des Kontrollkästchens, da sie für _beide_ Anzeigemodi gelten: die Zoomstufe wie oben für das Polygon beschrieben oder als fester Wert für den Markierungspunkt; die Farbe für den Polygonumriss oder den Kern des Markierungspunkts; die Breite/Höhe für das Bild selbst. Nur **die Umrissstärke** wird unterhalb des Kontrollkästchens angezeigt, da sie sich ausschließlich auf den Polygonumriss auswirkt – die Größe des Markierungspunkts ist fest und nicht konfigurierbar.

Der Dateipfad wird geschrieben nach `einsatzAktuell.kartenbildPfad` (siehe [einsatzAktuell](#einsatzaktuell) ) – Typischerweise wird diese Datei aus einem Blockly/JavaScript-Skript angehängt, z. B. als Pushover-Benachrichtigungsanhang. Nur die 10 zuletzt generierten Bilder werden auf der Festplatte gespeichert; ältere werden automatisch gelöscht, sobald ein neues Bild geschrieben wird. Die Alarmverarbeitung wartet, bis das Bild fertiggestellt ist, bevor sie fortfährt. `einsatzAktuell.kartenbildPfad` garantiert, dass der korrekte Wert bereits vorliegt, wenn die übrigen Felder des Vorfalls (z. B. `einsatzAktuell.alarmAktiv`) verfügbar werden – jedoch nur bis zum konfigurierbaren **OSM-Timeout** : Wenn der Download/die Zusammenstellung der Kacheln nicht innerhalb dieser Zeit abgeschlossen ist, wird eine Warnung protokolliert und `einsatzAktuell.kartenbildPfad` bleibt für diesen Vorfall leer, ohne die Alarmverarbeitung auf unbestimmte Zeit zu blockieren.

| Feld                                  | Beschreibung                                                                                                                                                                                                                               | Standard  |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| OSM-Timeout (s)                       | Maximale Wartezeit für das Herunterladen und Zusammensetzen der Kacheln, bevor ohne dieses fortgefahren werden kann (1-60)                                                                                                                 | `10`      |
| Zoomstufe                             | OpenStreetMap-Zoomstufe (1 = ganze Welt, 19 = Gebäudeebene) – ein Maximalwert für das Polygon (wird bei Bedarf automatisch reduziert, um den betroffenen Bereich vollständig sichtbar zu halten), ein fester Wert für den Markierungspunkt | `19`      |
| Marker- und Umrissfarbe               | Farbe des zentrierten Markierungspunktes oder der Umrisslinie des Trefferbereichs, wenn stattdessen ein Polygon gezeichnet wird                                                                                                            | `#DD2020` |
| Bildbreite (px)                       | Breite der generierten PNG-Datei                                                                                                                                                                                                           | `600`     |
| Bildhöhe (px)                         | Höhe der generierten PNG-Datei                                                                                                                                                                                                             | `400`     |
| Polygon der Einschlagsfläche anzeigen | Das ursprüngliche Polygon zeichnen (WAIP-Web sendet es (ein)) vs. stattdessen immer einen zentrierten Markierungspunkt anzeigen (aus)                                                                                                      | _(An)_    |
| Konturstärke (px)                     | Linienstärke der Kontur in Pixel (1-12)                                                                                                                                                                                                    | `4`       |

Die Bilder werden im eigenen Datenverzeichnis dieser Adapterinstanz gespeichert (`iobroker-data/<instance>/maps/`), nicht als ioBroker-Dateiobjekte –`einsatzAktuell.kartenbildPfad` Es handelt sich daher um einen realen, absoluten Dateisystempfad, auf den ein Skript, das auf demselben Host ausgeführt wird, direkt zugreifen kann. Dieses Verzeichnis wird **nicht** automatisch gelöscht, wenn der Adapter gestoppt oder seine Instanzkonfiguration zurückgesetzt wird. Um es bei der Deinstallation zu entfernen, aktivieren Sie im Bestätigungsdialog beim Löschen der Instanz/des Adapters in der Administration **die Option „Auch Instanzdaten löschen“** (verfügbar ab js-controller 4.0 / Admin 5 für jedes Instanzdatenverzeichnis eines Adapters – standardmäßig deaktiviert).

> **Hinweis:** Hierbei wird die offizielle, kostenlose Version verwendet. `tile.openstreetmap.org` Der Server ist für gelegentliche/geringes Datenaufkommen vorgesehen (siehe die [OSM-Kachelnutzungsrichtlinie](https://operations.osmfoundation.org/policies/tiles/) ). Ein Bild pro Vorfall liegt deutlich innerhalb dieser Grenzen – reduzieren Sie nicht den Zoomfaktor, um große Bereiche abzudecken, oder führen Sie keine Massenkachelabrufe durch.

### Armaturenbrett

**Dashboard aktivieren** (Admin-Kontrollkästchen, standardmäßig deaktiviert): Spiegelt die letzten N Vorfälle wider, die dem für diese Instanz konfigurierten Monitor entsprechen. `dashboard.einsatz1` …`dashboard.einsatzN`, zusätzlich zu dem einzelnen aktuellen Vorfall, der bereits unter [einsatzAktuell](#einsatzaktuell) verfügbar ist. Dies ist nützlich mit einer Monitor-ID, die auf "alle Einsatzleitmonitore" beschränkt ist (`0` oder auf einen größeren Bezirk/Netzbetreiber, wo mehrere Vorfälle gleichzeitig aktiv sein können und `einsatzAktuell.*` alone zeigt immer nur die aktuellste Version an.

Im Gegensatz zum ständig eingeschalteten `/waip` Die Verbindung, die dieser Adapter ansonsten aufrechterhält, wird regelmäßig aktualisiert: Der Adapter ruft die öffentlichen Daten ab. `/dbrd/` Die Übersichtsseite für Vorfälle filtert die Ergebnisse nach Vorfällen, die dem Monitor dieser Instanz entsprechen (derselbe). `l` /`a` /`b` /`c` Leitstelle/Kreis/Träger/Wache-Korrelation (siehe Monitor-ID-Dropdown-Menü – siehe [Verbindung](#connection) ) und öffnet für jedes von bis zu N übereinstimmenden Ereignissen nacheinander (niemals parallel) eine **kurzlebige** Socket.IO-Verbindung, um deren aktuellen Status zu erfassen, und schließt diese anschließend wieder. Eine vollständige Aktualisierung dauert daher realistischerweise einige Sekunden pro belegtem Ereignis. `einsatzN`, nicht Millisekunden – das unten angegebene minimale **Aktualisierungsintervall** spiegelt dies wider.

| Feld                              | Beschreibung                                                                                                         | Standard |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------- |
| Anzahl der anzuzeigenden Vorfälle | Wie viele der aktuellsten übereinstimmenden Vorfälle sollen angezeigt werden? `dashboard.einsatz1` …`einsatzN` (1-20) | `10`     |
| Aktualisierungsintervall (s)      | Wie oft das Dashboard aktualisiert wird (30-300)                                                                     | `60`     |

Außerdem wird unmittelbar nach jedem (Neu-)Start des Adapters eine Aktualisierung durchgeführt (damit das Dashboard nicht bis zum konfigurierten Intervall leer bleibt) und einmal immer dann, wenn ein neuer Alarm für den Monitor dieser Instanz empfangen wird (`einsatzAktuell.*` Zusätzlich zum regulären Timer kann jederzeit eine manuelle Aktualisierung ausgelöst werden. `dashboard.refreshNow` Zustand einer Schaltfläche, z. B. von einer VIS-Schaltfläche oder einem Skript.

Kartenbilder werden angezeigt als `dashboard.einsatzN.kartenbildPfad` werden **nicht** separat für das Dashboard generiert – sie werden in der gleichen Dateihistorie nachgeschlagen [, die das Incident Map Image](#incident-map-image) bereits für den Monitor dieser Instanz erzeugt. `einsatzN` Es wird nur dann ein Kartenbild angezeigt, wenn dieser Adapter _bereits_ über seine eigenen Funktionen eines für genau diesen Vorfall generiert hat. `einsatzAktuell.*` Alarmbehandlung – am vollständigsten, wenn **die Monitor-ID** `0` (alle Einsatzleitmonitore) und **die Generierung eines Kartenbildes für jeden Vorfall** ist aktiviert; seitdem wurde jeder Vorfall, der im Dashboard angezeigt werden kann, ebenfalls durchlaufen. `einsatzAktuell.*` mindestens einmal. Mit einer engeren Monitor-ID, `einsatzN` Einträge für Vorfälle außerhalb des eigenen Alarmverlaufs des jeweiligen Monitors enthalten kein Kartenbild – dies ist beabsichtigt und kein Fehler.

Durch Deaktivieren der Funktion wird die gesamte `dashboard.*` Objektbaum (Kanäle und Zustände, nicht nur deren Werte); Reduzierung **der Anzahl der anzuzeigenden Vorfälle** entfernt nur die nun nicht mehr verwendeten. `einsatzN` Einträge am Ende (z. B. von 10 auf 5 entfernen) `dashboard.einsatz6` …`einsatz10` Beide Änderungen werden erst nach dem **nächsten Neustart des Adapters** nach dem Speichern wirksam (ioBroker startet die Instanz bei jeder Konfigurationsänderung ohnehin neu – die Entfernung erfolgt nicht sofort, während der Admin-Dialog geöffnet ist).

## Staaten (unter `waip-web.0.*`)

Feedback und Routen sind 1:n-Listen pro Vorfall. Sie werden als **flache** JSON-Arrays gespeichert unter `einsatzAktuell.json.*` (keine verschachtelten Objekte/Arrays innerhalb einer Zeile), sodass sie direkt an VIS-Tabellen-Widgets gebunden werden können – ergänzt durch schnell zu bindende Zähler, sodass Bindungen und Trigger überhaupt kein JSON-Parsing benötigen.

### Info

| Zustand      | Typ             | Beschreibung                                                  |
| ------------ | --------------- | ------------------------------------------------------------- |
| `connection` | boolescher Wert | Standard-ioBroker-Indikator: Verbindung zum WAIP-Server aktiv |

### Status

| Zustand                 | Typ             | Beschreibung                                                                                                                                                                                                            |
| ----------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `connected`             | boolescher Wert | Die Socket.IO-Verbindung wurde technisch hergestellt.                                                                                                                                                                   |
| `registeredMonitor`     | Zeichenkette    | Die zuletzt auf dem Server registrierte Monitor-ID wurde nicht mehr registriert.                                                                                                                                        |
| `registeredMonitorName` | Zeichenkette    | Anzeigename des Monitors ohne die ID (z. B. „Leitstelle: Lausitz“); wird einmalig beim Start aus demselben System aufgelöst. `/waip/` Übersichtsseite als Admin-Dropdown-Menü, `null` falls es nicht gelöst werden könnte |
| `registrationAccepted`  | boolescher Wert | `true` sobald das erste Ereignis eingegangen war, `false` direkt nach der Verbindungsherstellung oder sobald das Registrierungs-Timeout abgelaufen ist                                                                    |
| `registrationPending`   | boolescher Wert | `true` direkt nach dem Verbindungsaufbau, während noch auf eine Antwort des Servers gewartet wird, `false` Sobald die Annahme erfolgte oder die Zeit abgelaufen war                                                      |

### einsatzAktuell

Flache Felder des aktuell laufenden Einsatzes. Geräumt (`null` /`0`) An `io.standby`, passend zum offiziellen Frontend –`alarmAktiv` ist daher ein zuverlässiger Indikator dafür, ob diese Felder aktuell Live-Daten enthalten. Der zuletzt abgeschlossene Vorfall bleibt über `einsatzAktuell.json.history`:

> **Hinweis:** Der Adapter spiegelt immer nur den zuletzt aktiven Vorfall wider (`einsatzAktuell.*` /`einsatzAktuell.json.current`) – entsprechend der Alarmüberwachung des offiziellen WAIP-Web-Frontends. WAIP-Web kann prinzipiell mehrere Ereignisse gleichzeitig aktiv haben (z. B. zwei kurz nacheinander eingehende Alarme). Diese Zustände stellen **keine Liste gleichzeitig laufender Ereignisse** dar – sie werden bei jedem neuen Ereignis überschrieben. `io.new_waip` Da ein zweites, parallel laufendes Ereignis auftritt, ist es über diesen Adapter derzeit nicht sichtbar. Eine vollständige Übersicht aller aktuell aktiven Ereignisse ist momentan nur über das Dashboard der verbundenen WAIP-Web-Instanz verfügbar.

> **Hinweis:** Der Server von WAIP-Web füllt nur `einsatznummer`, `objekt` /`objektteil`, `besonderheiten`, `strasse` /`hausnummer`, `einsatzdetails` und das Berechtigungsflag für **angemeldete** Clients (`db_user_check_permission_for_waip()` im eigenen Server `server/waip.js` Da dieser Adapter systembedingt ohne Anmeldung eine Verbindung herstellt (siehe [„Über diesen Adapter](#about-this-adapter) “), sendet der Server immer diese leeren/`false` Sie werden daher überhaupt nicht als Zustände exponiert, sondern tragen dauerhaft tote Werte in sich.

| Zustand                         | Typ                  | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `alarmAktiv`                    | boolescher Wert      | `true` seit dem letzten `io.new_waip`, `false` seit dem letzten `io.standby`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `restzeit`                      | Nummer(n)            | Verbleibende Sekunden bis `ablaufzeit` wird jede Sekunde aktualisiert                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `id`                            | Nummer               | Interne Vorfall-ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `uuid`                          | Zeichenkette         | Eindeutige Vorfall-UUID (wird auch zur Zuordnung von Feedback verwendet)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `einsatzart`                    | Zeichenkette         | z.B. „Brandeinsatz“, „Hilfeleistungseinsatz“, „Rettungseinsatz“, „Krankentransport“                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `stichwort`                     | Zeichenkette         | Alarm-Schlüsselwort                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `beschreibung`                  | Zeichenkette         | Beschreibung für `stichwort`, lokal aufgelöst (nicht vom Server gesendet) - siehe Beschreibungen [der Rettungsdienste](#rescue-service) / [Schlüsselwörter](#keyword-descriptions) unten. `null` wenn nichts übereinstimmte                                                                                                                                                                                                                                                                                                                                                                                              |
| `ort`                           | Zeichenkette         | Ort/Stadt                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `ortsteil`                      | Zeichenkette         | Bezirk (falls abweichend von `ort`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `alarmierungszeit`              | Zeichenkette (Datum) | Weckzeit                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `ablaufzeit`                    | Zeichenkette (Datum) | Ende der Standby-Anzeigedauer, Grundlage für `restzeit`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `sondersignal`                  | Nummer               | `1` = Sondersignal (Lichter und Sirene), ansonsten keines                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `latitude` /`longitude`         | Nummer               | Vorfallort (normalisiert aus wgs84-Feldern oder GeoJSON-Zentroid)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `kartenbildPfad`                | Zeichenkette         | Pfad zum zuletzt generierten Ereigniskartenbild (PNG) – siehe [Ereigniskartenbild](#incident-map-image) . Leer, bis das erste Bild für den aktuellen Vorfall verfügbar ist; wird außerdem zu Beginn eines neuen Vorfalls, bei einem Generierungsfehler oder wenn die Generierung nicht innerhalb des OSM-Timeouts abgeschlossen wird, gelöscht (bleibt leer) und – wie die anderen Felder oben – bei `io.standby` Die zugrundeliegende Bilddatei selbst wird beim Löschen des Status nicht gelöscht (nur die Aufbewahrungsgrenze von 10 Bildern entfernt Dateien; siehe [Bild der Vorfallskarte](#incident-map-image) ). |
| `routenGesamt`                  | Nummer               | Anzahl der Routen im aktuellen Vorfall                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `rueckmeldungenGesamt`          | Nummer               | Gesamtzahl der Rückmeldungen zum aktuellen Vorfall                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `rueckmeldungen.rollen.ek`      | Nummer               | Feedback-Anrechnung als Teammitglied („Einsatzkraft“)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `rueckmeldungen.rollen.gf`      | Nummer               | Rückmeldung als Gruppenführer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `rueckmeldungen.rollen.zf`      | Nummer               | Rückmeldung als Zugführer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `rueckmeldungen.rollen.vf`      | Nummer               | Feedback zählt als Gruppenkommandeur ("Verbandsführer")                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `rueckmeldungen.funktionen.agt` | Nummer               | Feedback-Zählung mit Atemschutzgeräteträger-Qualifikation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `rueckmeldungen.funktionen.fzf` | Nummer               | Rückmeldung als Fahrzeugführer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `rueckmeldungen.funktionen.ma`  | Nummer               | Feedback zählt als Fahrer/Bediener ("Maschinist")                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `rueckmeldungen.funktionen.med` | Nummer               | Feedback zählt bei einer medizinischen Qualifikation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

### einsatzAktuell.json

Flache JSON-Objekte/-Arrays, maximal eine Ebene tief, die direkt an VIS-Tabellen-Widgets gebunden werden sollen (verschachtelte Strukturen wie ein einfaches `{routen, rueckmeldungen, ...}` Objekte werden im Allgemeinen nicht von diesen Widgets gerendert. `routen` /`rueckmeldungen` /`emAlarmiert` /`emWeitere` Es werden ausschließlich die Daten des _aktuellen_ Vorfalls gespeichert – diese werden gelöscht (`[]`) An `io.standby` und gehören **nicht** zur Geschichte. Wie bei `einsatzAktuell.*` über, `current` Es wird immer nur der letzte aktive Vorfall gespeichert – siehe den Hinweis im[`einsatzAktuell`](#einsatzaktuell) Abschnitt.

| Zustand          | Typ                       | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `current`        | Zeichenkette (JSON-Array) | Aktuelle Vorfallsdaten: dieselben 12 Felder wie bei der Einzelperson `einsatzAktuell.*` oben genannten Staaten (`id` …`sondersignal`, plus `beschreibung`, `alarmierungszeit`, `lat` /`lon`), plus `registeredMonitor` /`registeredMonitorName` (der Monitor, an dem der Adapter zu diesem Zeitpunkt registriert war), gebündelt als ein Objekt in einem Einzelelement-Array (`[]` (Wenn kein Ereignis aktiv ist) – Der Array-Wrapper ist erforderlich, da die meisten Tabellen-Widgets ein Array im Stammverzeichnis benötigen, kein einfaches Objekt. |
| `history`        | Zeichenkette (JSON-Array) | Letzte N abgeschlossene Vorfälle (`N` = die konfigurierte [Anzahl der Vorfälle in der Historie](#connection) (Standardwert 10), gleiche Form wie `current`, ein Array-Eintrag pro Vorfall, geschrieben auf `io.standby`                                                                                                                                                                                                                                                                                                                                |
| `routen`         | Zeichenkette (JSON-Array) | Routen des aktuellen Vorfalls; jeder Eintrag enthält `nr_wache`, `name_wache`, `color`, `lat`, `lon` (`position` aufgelöst zu flach `lat` /`lon` - siehe den unten stehenden Hinweis dazu `lat` /`lon` steht für eine Route)                                                                                                                                                                                                                                                                                                                              |
| `rueckmeldungen` | Zeichenkette (JSON-Array) | Rückmeldungen zum aktuellen Vorfall, wie sie vom Server empfangen wurden.                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `emAlarmiert`    | Zeichenkette (JSON-Array) | Die Einsatzkräfte wurden über den aktuellen Vorfall informiert; jeder Eintrag enthält `name`, `zeit`, `wache`, `zeit_alarmierung_iso`, `zeit_ausgerueckt_iso`                                                                                                                                                                                                                                                                                                                                                                                          |
| `emWeitere`      | Zeichenkette (JSON-Array) | Zusätzliche Ressourcen des aktuellen Vorfalls, gleiche Form wie `emAlarmiert`                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

> **Notiz:** `routen[].lat` /`.lon` Es handelt sich um den **Standort der alarmierten Station** , nicht um einen Punkt entlang der tatsächlichen Fahrstrecke und auch nicht um den Unfallort. Der Server sendet jede Route entweder als vollständige `LineString` (der berechnete Pfad von der Station zum Ereignisort) oder, falls kein Pfad berechnet werden konnte, als einzelnes Koordinatenpaar für die Station selbst – in beiden Fällen löst der Adapter auf `lat` /`lon` zum Standort des Bahnhofs (dem ersten Punkt der Linie in der `LineString` (Fall) für eine einheitliche Bedeutung über alle Einträge hinweg. Die vollständige Routengeometrie selbst wird nicht als Zustand dargestellt.

### einsatzAktuell.tts

Sprachansage (`io.playtts`) für den aktuell laufenden Vorfall – lebt unter `einsatzAktuell` Anstatt eines eigenen Hauptkanals, da dieser ohne ein Ereignis bedeutungslos ist. Keine Historie: Eine TTS-Ansage ist nur im Moment relevant, daher wird nur die aktuellste gespeichert.

| Zustand         | Typ                  | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `last`          | Zeichenkette (URL)   | Die vollständige absolute URL der MP3-Datei der letzten Sprachansage. Der Server sendet lediglich einen einfachen (oft relativen) Pfad, der als URL verwendet werden soll. `audio.src` in einem Browser, der denselben Ursprung hat; der Adapter löst dies gegen die konfigurierte WAIP-Server-URL auf, sodass der Link auch außerhalb der WAIP-Webseite funktioniert (z. B. in einem VIS-Audio-Widget). |
| `lastTimestamp` | Zeichenkette (Datum) | Zeitpunkt der letzten Ankündigung                                                                                                                                                                                                                                                                                                                                                                       |

<a id="dashboard-states"></a>

### Armaturenbrett

Nur vorhanden, wenn [das Dashboard](#dashboard) aktiviert ist – dort finden Sie den Lebenszyklus der Objektstruktur bei Aktivierung/Deaktivierung/Größenänderung. `dashboard.einsatzN` (`N` = 1 … die konfigurierte Anzahl der anzuzeigenden Vorfälle) spiegelt die gleiche Form wider wie `einsatzAktuell` /`einsatzAktuell.json` oben, für den N-ten letzten Vorfall, der dem Monitor dieser Instanz entspricht – **nicht** beschränkt auf den aktuellen Vorfall. Alle Felder eines belegten `einsatzN` werden bei jeder Aktualisierung neu geschrieben (nicht nur bei Änderungen), sodass fortlaufendes Feedback für einen Vorfall, der sich nicht ändert, `einsatzN` Die Aktualisierungen werden fortlaufend aktualisiert; ein unbesetzter `einsatzN` (weniger übereinstimmende Vorfälle als konfiguriert) hat alle Felder mit dem Wert leer, genau wie `einsatzAktuell.*` wenn kein Ereignis aktiv ist.

absichtlich **ohne** `restzeit` /`ablaufzeit` (WAIP-Web) `/dbrd/` Die Vorfalldetailsdaten verfügen im Gegensatz zu den Live-Daten über kein entsprechendes Feld. `/waip` Alarmstrom) und ohne `einsatzAktuell.tts` 's Äquivalent (es existiert kein TTS-Ereignis in der `/dbrd` Namespace). `dashboard.einsatzN.json.wachen` hat keine `einsatzAktuell.json.*` Gegenstück umgekehrt - es stammt von einem Feld (`wachen[]`, die an dem Vorfall beteiligten Stationen), dass nur die `/dbrd` Die Nutzlast umfasst:

| Zustand                                             | Typ                            | Beschreibung                                                                                                                                                                                                  |
| --------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `refreshNow`                                        | boolescher Wert (Schaltfläche) | Schreiben `true` um eine sofortige Aktualisierung des Dashboards auszulösen, z. B. über eine VIS-Schaltfläche oder ein Skript. Setzt sich selbst zurück auf `false` sobald die Aktualisierung abgeschlossen ist |
| `einsatzN.alarmAktiv`                               | boolescher Wert                | `true` während `einsatzN` wird von einem entsprechenden Vorfall belegt                                                                                                                                         |
| `einsatzN.id`                                       | Nummer                         | Interne Vorfall-ID                                                                                                                                                                                            |
| `einsatzN.uuid`                                     | Zeichenkette                   | Einzigartige Vorfall-UUID                                                                                                                                                                                     |
| `einsatzN.einsatzart`                               | Zeichenkette                   | Gleiche Bedeutung wie [einsatzAktuell.einsatzart](#einsatzaktuell)                                                                                                                                            |
| `einsatzN.stichwort`                                | Zeichenkette                   | Alarm-Schlüsselwort                                                                                                                                                                                           |
| `einsatzN.beschreibung`                             | Zeichenkette                   | Beschreibung für `stichwort`, auf die gleiche Weise gelöst wie [einsatzAktuell.beschreibung](#einsatzaktuell)                                                                                                 |
| `einsatzN.ort`                                      | Zeichenkette                   | Ort/Stadt                                                                                                                                                                                                     |
| `einsatzN.ortsteil`                                 | Zeichenkette                   | Bezirk (falls abweichend von `ort`)                                                                                                                                                                           |
| `einsatzN.alarmierungszeit`                         | Zeichenkette (Datum)           | Weckzeit                                                                                                                                                                                                      |
| `einsatzN.sondersignal`                             | Nummer                         | `1` = Sondersignal (Lichter und Sirene), ansonsten keines                                                                                                                                                     |
| `einsatzN.latitude` /`einsatzN.longitude`           | Nummer                         | Ort des Vorfalls, gleiche Normalisierung wie [einsatzAktuell](#einsatzaktuell)                                                                                                                                |
| `einsatzN.kartenbildPfad`                           | Zeichenkette                   | Pfad zu einer passenden, zuvor generierten Vorfallskarte – siehe [Dashboard](#dashboard) oben. Leer, falls keine gefunden wurde.                                                                              |
| `einsatzN.routenGesamt`                             | Nummer                         | Anzahl der Routen für `einsatzN` 's Vorfall                                                                                                                                                                    |
| `einsatzN.rueckmeldungenGesamt`                     | Nummer                         | Gesamtzahl der Rückmeldungen für `einsatzN` 's Vorfall                                                                                                                                                         |
| `einsatzN.rueckmeldungen.rollen.*` /`.funktionen.*` | Nummer                         | Gleiche acht Feedback-Zähler wie [einsatzAktuell.rueckmeldungen](#einsatzaktuell) , pro `einsatzN`                                                                                                            |
| `einsatzN.json.current`                             | Zeichenkette (JSON-Array)      | `einsatzN` flache Vorfalldaten, gleiche Form wie `einsatzAktuell.json.current` (ohne `registeredMonitor` /`registeredMonitorName`)                                                                             |
| `einsatzN.json.routen`                              | Zeichenkette (JSON-Array)      | Routen von `einsatzN` 's Vorfall, gleiche Form wie `einsatzAktuell.json.routen`                                                                                                                                |
| `einsatzN.json.rueckmeldungen`                      | Zeichenkette (JSON-Array)      | Feedback-Einträge von `einsatzN` 's Vorfall                                                                                                                                                                    |
| `einsatzN.json.emAlarmiert`                         | Zeichenkette (JSON-Array)      | Alarmierte Ressourcen von `einsatzN` 's Vorfall                                                                                                                                                                |
| `einsatzN.json.wachen`                              | Zeichenkette (JSON-Array)      | Teilnehmende Stationen von `einsatzN` 's Vorfall (`em_station_id` /`em_station_name`) - nur verfügbar über `/dbrd`, NEIN `einsatzAktuell.json.*` Gegenstück                                                    |

### debuggen

| Zustand              | Typ                       | Beschreibung                                                                                                                                                                                                                                                                   |
| -------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `lastEvent`          | Zeichenkette (JSON-Array) | Letztes empfangenes Socket-Ereignis (Name + Zeitstempel) für die Verbindungsdiagnose; Array mit einem Element (`[]` (falls noch nicht vorhanden), für die VIS-Tabellen-Widget-Kompatibilität                                                                                   |
| `normalizedPosition` | Zeichenkette (JSON-Array) | Ergebnis der Geodatennormalisierung für die letzte `io.new_waip` Ereignis, als flaches Einzelelement `[{lat, lon}]` Array (beide `null` wenn keine gültige Position abgeleitet werden konnte; `[]` (falls noch kein Ereignis vorliegt), für die VIS-Tabellen-Widget-Kompatibilität |
| `rawPayloadShort`    | Zeichenkette              | Vorschau (500 Zeichen) des unnormalisierten Rohmaterials `io.new_waip` Nutzlast                                                                                                                                                                                                 |
| `ignoredCount`       | Nummer                    | Anzahl der verworfenen Ereignisse (Nutzdaten explizit mit einer anderen Monitor-ID benannt)                                                                                                                                                                                    |
| `monitorAudit`       | Zeichenkette (JSON-Array) | Chronologisches Protokoll der Verbindungs-/Registrierungs-/Wiederverbindungsereignisse (200 Einträge)                                                                                                                                                                          |
| `sessionExpires`     | Zeichenkette (Datum)      | Ablaufzeit des Session-Cookies ab der letzten Verlängerung                                                                                                                                                                                                                     |
| `lastError`          | Zeichenkette              | Letzte Fehlermeldung, die vom Server gemeldet wurde (`io.error` Klartext, nicht JSON, da der Server dies als einfachen String sendet.                                                                                                                                          |
| `serverVersion`      | Zeichenkette              | Zuletzt gemeldete Serverinstanz-ID (`io.version` Eine Änderung deutet auf einen Serverneustart hin.                                                                                                                                                                            |

## Protokollierung

Alle Protokolltexte sind in Englisch. Wiederholbare Fehlerzustände (Erneuerung von Session-Cookies, WAIP-Registrierung, Socket.IO-Verbindung, Ereignisflut auf dem falschen Monitor) werden einmalig protokolliert. `warn` beim ersten Auftreten, dann bei `debug` solange sie bestehen, und sobald sie `info` bei der Wiederherstellung – gemäß der [offiziellen ioBroker-Protokollierungsrichtlinie](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md#logging) .

Die vollständige Referenz aller vom Adapter erzeugten Protokollmeldungen, gruppiert nach Ebene, mit ihrer Ursache und einem Beispiel, finden Sie in **[der Datei LOGGING.md.](/#/docs/adapterref/iobroker.waip-web/LOGGING.md)**

## Changelog

<!--
    Placeholder for the next version. Keep this line directly below the
    comment; `npm run release` replaces it with the new version heading.
    Re-add it afterwards (or use `npm run release -- --addPlaceholder`).
    Collect changes for the upcoming release underneath it.
-->
### **WORK IN PROGRESS**

- `registrationTimeoutSec` and `reconnectDelaySec` are now clamped in
  code to their admin UI range (1-120s), matching how every other
  numeric configuration value (e.g. `historySize`, `mapImageWidth`) was
  already handled - a direct instance config JSON edit/import can no
  longer set them outside that range.
- The `stateChange` listener (used only for `dashboard.refreshNow`) is
  now registered only while the Dashboard feature is enabled, matching
  its `subscribeStates()` call, instead of unconditionally in the
  constructor.

### 1.0.0 (2026-08-30)

- **Breaking change:** the `einsatz` channel is renamed to `einsatzAktuell`
  (to distinguish it from the `dashboard.einsatz1` … `einsatzN` dashboard
  channels), and `einsatzAktuell.json.history10` is renamed to
  `einsatzAktuell.json.history`, now holding a configurable number of
  entries (new "Number of incidents in history" setting on the
  [Connection](#connection) tab, 1-100, default 10). Update any VIS
  bindings/scripts referencing the old `einsatz.*`/`einsatz.json.history10`
  paths - they are removed automatically on upgrade, along with their
  values.
- Dashboard channel/state display names are now consistent: they use
  "Einsatz N" throughout, matching the `einsatzAktuell.*` naming, and
  the redundant "flat JSON array" phrase was removed from every state
  name. Object IDs are unaffected, only the display names shown in
  Admin/VIS.

### 0.12.1 (2026-08-30)

- Fixed the Dashboard admin config: the tab was mistranslated as "Armaturenbrett"
  (car dashboard) in German instead of "Dashboard", its help texts used
  wrong/mistranslated terms ("Versandzentrum"/"Vorfall" instead of
  "Leitstelle"/"Einsatz"), and the refresh interval label was missing its "(s)"
  unit suffix.
- Fixed `routen[].lat`/`.lon` (both `einsatz.json.routen` and
  `dashboard.einsatzN.json.routen`): previously resolved to the geometric
  bounding-box center of the entire route line - a point with no real meaning,
  since it lies "somewhere along the way" rather than at any actual location.
  Now resolves to the alerted station's own location instead (the first point of
  the route line, matching a separate coordinate-pair format the server sends
  when no route could be calculated for a station). Also fixed
  `dashboard.einsatzN.json.routen` specifically: it was missing the same geo
  normalization `einsatz.json.routen` already applied, so a route's raw,
  unresolved geometry (dozens of coordinate pairs) or the raw fallback
  coordinate field ended up in the written JSON instead of flat `lat`/`lon`.

### 0.12.0 (2026-08-28)

- New optional [Dashboard](#dashboard) feature: mirrors the last N
  incidents matching this instance's monitor as `dashboard.einsatz1`
  … `einsatzN` (off by default). Uses short-lived Socket.IO connections
  to WAIP-Web's `/dbrd` namespace polled on a configurable interval,
  not a permanent connection - see [Dashboard](#dashboard) and
  [dashboard states](#dashboard-states) for the full behavior,
  including the manual refresh button and the object-deletion behavior
  when disabling the feature or reducing the number of incidents to show.

### 0.7.38 (2026-08-27)

- Fixed a race condition where a routes update (`io.routes`) or TTS
  announcement (`io.playtts`) arriving while an incident was being
  finalized could still repopulate `einsatz.json.current`,
  `einsatz.json.routen` and `einsatz.routenGesamt` for the already
  finished incident. The 0.7.37 guard checked a flag that was only
  cleared at the very end of the finalization, leaving a window open
  across several `await` points.
- Fixed lost entries in `debug.monitorAudit`: the log was written with an
  unsynchronized read-modify-write, so two entries created within
  milliseconds of each other (e.g. `connect_called` followed by
  `emit_WAIP`) could overwrite one another. Writes are now serialized.
- Fixed configuration values falling back to the minimum instead of the
  default when a numeric admin field is left empty - an empty zoom field
  produced zoom 1 (the whole world map) instead of the configured
  default, and an empty width field produced 100px instead of 600px.
- Added a unit test suite (`npm run test:unit`, 75 tests) covering the
  geo normalization, the keyword decoder/table, the monitor matching and
  the state-definition consistency. `npm test` now runs it alongside the
  package tests.

### 0.7.37 (2026-08-26)

- Fixed a bug where a routes update (`io.routes`) or TTS announcement
  (`io.playtts`) arriving after an incident had already ended
  (`io.standby`) could revive `einsatz.json.current`/`.routen`/
  `einsatz.routenGesamt` or `einsatz.tts.last`/`.lastTimestamp` for the
  already-finished incident, while every other `einsatz.*` field
  correctly stayed cleared. Both handlers now ignore such events while
  no incident is active.

Older entries have been moved to CHANGELOG_OLD.md.

## License

MIT License (this adapter) – see [LICENSE](https://github.com/rnc11/ioBroker.waip-web/blob/main/LICENSE).

The adapter connects to instances of
[WAIP-Web](https://github.com/Robert-112/n112_waip-web), which is licensed
under CC BY-SA 4.0 by Robert-112. This adapter contains no code from that
project.

Copyright (c) 2026 rnc11

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