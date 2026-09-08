---
chapters: {"pages":{"de/adapterref/iobroker.beszel/README.md":{"title":{"de":"ioBroker.beszel — Benutzerdokumentation"},"content":"de/adapterref/iobroker.beszel/README.md"},"de/adapterref/iobroker.beszel/datapoints.md":{"title":{"de":"Datenpunkte und Metrik-Schalter"},"content":"de/adapterref/iobroker.beszel/datapoints.md"},"de/adapterref/iobroker.beszel/faq.md":{"title":{"de":"Fragen und Fehlersuche"},"content":"de/adapterref/iobroker.beszel/faq.md"}}}
---
# Fragen und Fehlersuche

## „Test Connection" schlägt fehl

Die Schaltfläche führt eine echte Anmeldung durch und gibt die Antwort des Hubs weiter — die
Meldung ist also der Hinweis:

- **Benutzername oder Passwort falsch** — der Benutzername ist die _E-Mail-Adresse_ Ihrer
  Beszel-Anmeldung, kein Anzeigename. PocketBase, auf dem Beszel aufbaut, meldet über die E-Mail an.
- **Host nicht erreichbar** — die Adresse vom ioBroker-Rechner aus im Browser öffnen. Sie muss den
  Port enthalten, zum Beispiel `http://192.168.1.100:8090`.
- **Es passiert gar nichts** — der Test ist auf die Konfigurationsoberflächen von Admin und Web
  beschränkt. Ein Aufruf per `sendTo` aus einem Skript wird bewusst abgelehnt, damit der Adapter
  nicht benutzt werden kann, um fremde Hosts abzuklopfen.

## Die Instanz ist grün, aber es erscheinen keine Systeme

Der Adapter zeigt ausschließlich, was der Hub meldet. Zeigt die Weboberfläche des Hubs selbst keine
Systeme, gibt es nichts zu spiegeln. Zeigt sie welche und ioBroker nicht, für eine Abfrage die
Protokollstufe auf `debug` stellen — das Protokoll nennt dann jedes verarbeitete System.

## Ein System bleibt auf seinen letzten Werten stehen

Das ist Absicht. Ist ein System aus oder pausiert, liefert der Hub keinen neuen Messwert; der
Adapter lässt den letzten stehen, statt Nullen zu schreiben — eine Null wäre eine Behauptung, die
niemand gemessen hat. Was sich sehr wohl ändert, sind `info.online` (falsch) und `info.status` —
dort sollte eine Automatisierung hinschauen.

## Nach einem Update sind Datenpunkte verschwunden

Im Protokoll nach `Object tree updated: removed N datapoint(s)` sehen. Der Adapter entfernt, was
eine abgeschaltete Metrik nicht mehr abdeckt, und er entfernt Mitglieder einer Gruppe, die der Host
nicht mehr meldet — eine abgezogene GPU, ein ausgehängtes Dateisystem, ein gelöschter Container.
Leerte sich eine ganze Gruppe auf einmal, geschieht das Entfernen erst, wenn eine zweite Abfrage es
bestätigt.

## Container-Datenpunkte fehlen oder stehen still

Der Beszel-Benutzer braucht Leserecht auf die `containers`-Sammlung. Ohne das schreibt der Adapter
eine Warnung, lässt alles andere weiterlaufen und rührt die bereits angelegten
Container-Datenpunkte nicht an — ein Rechteproblem darf den Baum nicht löschen. Sobald das Recht am
Hub gesetzt ist, greift die nächste Abfrage und das Protokoll meldet, dass Container-Daten wieder
verfügbar sind.

## Das Protokoll warnt wegen unverschlüsseltem http

Die Hub-Adresse benutzt `http` zu einer anderen Maschine als dieser, Anmeldung und Sitzungsschlüssel
laufen also unverschlüsselt über das Netz. In einem vertrauenswürdigen LAN ist das die normale
Beszel-Installation, und der Adapter blockt sie nicht. Ist der Hub über das eigene Netz hinaus
erreichbar, `https` verwenden.

## Die Hardware-Infos bleiben leer

_System info_ liest eine eigene Sammlung, die Beszel mit Version 0.18.0 eingeführt hat. Auf einem
älteren Hub gibt es sie nicht, und die Datenpunkte werden schlicht nicht angelegt. Die Daten sind
statisch und werden deshalb beim Start und beim Auftauchen eines neuen Systems geholt — ein System,
das in diesem Moment `pending` war, bekommt seine Hardware-Infos nach dem nächsten Neustart des
Adapters.

## Lüfter oder Werte je Akku erscheinen nicht

Beides braucht Beszel 0.18.8 oder neuer. Lüfter zusätzlich Linux, weil der Agent sie aus hwmon
liest; unter macOS, Windows und FreeBSD meldet er keine.

## Wie viel Last erzeugt der Adapter am Hub?

Pro Abfrage drei Anfragen — Systeme, neueste Messwerte, Container — dazu alle 23 Stunden eine
Anmeldung. Die Messwert-Anfrage bricht das Blättern ab, sobald eine Seite kein System mehr
beisteuert, das sie nicht schon kennt; sie liest also den neuesten Datensatz je System, statt die
acht Stunden Historie des Hubs zu durchlaufen. Container-Daten werden nur angefragt, wenn der
Schalter an ist.

## Kann ich einen Datenpunkt beschreiben?

Nein. Alle Datenpunkte sind schreibgeschützt, und der Adapter abonniert keine Zustände. Er ist ein
Spiegel in eine Richtung, ohne eingehenden Port und ohne etwas zu schalten.