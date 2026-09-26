---
chapters: {"pages":{"de/adapterref/iobroker.beszel/README.md":{"title":{"de":"ioBroker.beszel — Benutzerdokumentation"},"content":"de/adapterref/iobroker.beszel/README.md"},"de/adapterref/iobroker.beszel/datapoints.md":{"title":{"de":"Datenpunkte und Metrik-Schalter"},"content":"de/adapterref/iobroker.beszel/datapoints.md"},"de/adapterref/iobroker.beszel/faq.md":{"title":{"de":"Fragen und Fehlersuche"},"content":"de/adapterref/iobroker.beszel/faq.md"}}}
---
# Fragen und Fehlersuche

## „Test Connection" schlägt fehl

Die Schaltfläche führt eine echte Anmeldung durch und gibt die Antwort des Hubs weiter — die
Meldung ist also der Hinweis:

- **Anmeldung abgelehnt** — E-Mail oder Passwort falsch: Beszel meldet nur mit der
  _E-Mail-Adresse_ an, ein Benutzername wird abgelehnt. Dieselbe Meldung erscheint, wenn der
  Benutzer eine Mehr-Faktor-Anmeldung hat (den Einmal-Code kann der Adapter nicht beantworten) oder
  der Hub mit `DISABLE_PASSWORD_AUTH=true` läuft; das Protokoll nennt, welcher der drei Fälle es ist.
- **Host nicht erreichbar** — die Adresse vom ioBroker-Rechner aus im Browser öffnen. Sie muss den
  Port enthalten, zum Beispiel `http://192.168.1.100:8090`.
- **API nicht gefunden (404)** — die Adresse antwortet, aber nicht mit der Beszel-API: ein Hub
  hinter einem Reverse-Proxy braucht seinen Pfad in der URL (`https://example.org/beszel`), und der
  Port muss der des Hubs sein, nicht der eines anderen Dienstes.
- **Zertifikat nicht vertrauenswürdig** — ein https-Hub mit selbst signiertem Zertifikat wird
  abgelehnt. Die http-Adresse des Hubs im lokalen Netz nehmen oder ein Zertifikat, dem der
  ioBroker-Rechner vertraut.
- **Verbunden, aber keine Systeme sichtbar** — die Anmeldung klappt, der Benutzer ist aber keinem
  System zugeordnet. Siehe die nächste Frage.
- **Aufruf aus einem Skript** — der Test antwortet nur den Konfigurationsoberflächen von Admin und
  Web. Ein Skript bekommt einen Fehler zurück und das Protokoll eine Warnung, damit der Adapter
  nicht benutzt werden kann, um fremde Hosts abzuklopfen.

## Die Instanz ist grün, aber es erscheinen keine Systeme

Der Adapter zeigt ausschließlich, was der Hub seinem Benutzer meldet. Ein Beszel-Benutzer sieht
die Systeme, die er selbst angelegt hat, die ein Hub-Administrator ihm zugeordnet hat
(PocketBase-Verwaltung unter `/_/`, Sammlung `systems`, Feld `users`), oder alle, wenn der Hub mit
`SHARE_ALL_SYSTEMS=true` läuft. Mit der E-Mail-Adresse des Adapters in der Beszel-Weboberfläche
anmelden: was dort erscheint, sieht auch der Adapter. Zeigt sie Systeme und ioBroker nicht, für
eine Abfrage die Protokollstufe auf `debug` stellen — das Protokoll nennt dann jedes verarbeitete
System.

## „The Hub returns no systems for this account"

PocketBase beantwortet eine Anmeldung, die es nicht mehr annimmt — nach einem Passwortwechsel,
einem gelöschten Benutzer, zurückgesetzten Hub-Schlüsseln oder einer zurückgespielten Datenbank —
mit einer leeren Liste statt mit einem Fehler. Der Adapter meldet sich deshalb neu an und fragt
noch einmal, bevor er einer leeren Liste glaubt. Erscheint diese Zeile, hat die frische Anmeldung
geklappt und die Liste ist trotzdem leer: der Benutzer ist keinem System mehr zugeordnet. Die
vorhandenen Datenpunkte behalten ihre letzten Werte, bis die Liste wieder Einträge hat.

## Ein System bleibt auf seinen letzten Werten stehen

Das ist Absicht. Ist ein System aus oder pausiert, liefert der Hub keinen neuen Messwert; der
Adapter lässt den letzten stehen, statt Nullen zu schreiben — eine Null wäre eine Behauptung, die
niemand gemessen hat. Ein pausiertes System schickt der Hub mit lauter genullten Systemwerten; auch
die übernimmt der Adapter nicht. Was sich sehr wohl ändert, sind `info.online` (falsch) und
`info.status` — dort sollte eine Automatisierung hinschauen.

## Nach einem Update sind Datenpunkte verschwunden

Im Protokoll nach `Object tree updated: removed N datapoint(s)` sehen. Der Adapter entfernt, was
eine abgeschaltete Metrik nicht mehr abdeckt, und er entfernt Mitglieder einer Gruppe, die der Host
nicht mehr meldet — eine abgezogene GPU, ein ausgehängtes Dateisystem, ein gelöschter Container.
Ein Mitglied wird erst entfernt, wenn es in zwei aufeinander folgenden Abfragen fehlt; ein
einzelner Aussetzer entfernt nichts. Ein am Hub umbenanntes oder entferntes System nennt das
Protokoll.

## Container-Datenpunkte fehlen oder stehen still

Wer ein System sieht, sieht auch seine Container — ein eigenes Recht dafür gibt es nicht. Scheitert
die Container-Anfrage, schreibt der Adapter `Container fetch failed (…)` mit dem Grund, lässt alles
andere weiterlaufen und rührt die bereits angelegten Container-Datenpunkte nicht an. Mit der
nächsten erfolgreichen Abfrage kommen die Container wieder, und das Protokoll meldet, dass
Container-Daten wieder verfügbar sind. Ist ein System aus oder pausiert, behalten seine Container
ihre letzten Werte; der Hub entfernt die Zeile eines Containers etwa zehn Minuten, nachdem sein
Agent ihn nicht mehr meldet.

## Die Hardware-Infos bleiben leer

_System info_ liest eine eigene Sammlung, die Beszel mit Version 0.18.0 eingeführt hat. Auf einem
älteren Hub gibt es sie nicht, und die Datenpunkte werden schlicht nicht angelegt. Die Daten sind
statisch und werden deshalb beim Start, beim Auftauchen eines neuen Systems und immer dann geholt,
wenn ein System wieder online kommt — ein System, das `pending` war, bekommt seine Hardware-Infos
mit seinem ersten Kontakt.

## Netzwerk-Monitore erscheinen nicht

Sie brauchen Beszel 0.20.0 oder neuer am Hub und am Agenten und einen für das System am Hub
eingerichteten Monitor (Ping, TCP, HTTP oder DNS). Auf einem älteren Hub meldet der Adapter einmal,
dass die Sammlung fehlt. Ein noch nie geprüfter Monitor zeigt seine Einstellungen mit leeren
Antwortzeiten; einer, der am Hub abgeschaltet ist, behält seine letzten Werte mit `enabled` falsch.

## Lüfter oder Werte je Akku erscheinen nicht

Beides braucht Beszel 0.18.8 oder neuer. Lüfter zusätzlich Linux, weil der Agent sie aus hwmon
liest; unter macOS, Windows und FreeBSD meldet er keine.

## Wie viel Last erzeugt der Adapter am Hub?

Jede Abfrage liest die Systeme und ihre neuesten Messwerte. Die Messwert-Anfrage bricht das
Blättern ab, sobald eine Seite kein System mehr beisteuert, das sie nicht schon kennt; sie liest
also den neuesten Datensatz je System, statt die Stunde Minutenwerte zu durchlaufen, die der Hub
vorhält. Alles andere läuft nur mit eingeschaltetem Schalter: Container, systemd-Units und
Netzwerk-Monitore (samt ihrem neuesten Prüf-Datensatz) bei jeder Abfrage, die Pool-Details und die
SMART-Geräte höchstens alle 15 Minuten. Die Hardware-/OS-Details werden beim Start gelesen und immer
dann neu, wenn ein System wieder online kommt. Eine Sammlung, die dieser Hub nicht anbietet, wird
einmal angefragt und dann bis zum nächsten Neustart nicht mehr.

Die Anmeldung wird kurz vor dem Ablauf des Hub-Tokens erneuert (spätestens nach 23 Stunden) und
ein weiteres Mal, wenn eine leere Liste den Adapter an seinem Token zweifeln lässt.

## Kann ich einen Datenpunkt beschreiben?

Nein. Alle Datenpunkte sind schreibgeschützt, und der Adapter abonniert keine Zustände. Er ist ein
Spiegel in eine Richtung, ohne eingehenden Port und ohne etwas zu schalten.