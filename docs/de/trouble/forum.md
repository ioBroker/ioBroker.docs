---
title:       "Forum"
lastChanged: "08.09.2026"
---

# Das Forum

Das [ioBroker-Forum](https://forum.iobroker.net) ist die Anlaufstelle, wenn die
eigene [Fehlersuche](/docs/trouble/search.md)
nicht weiterführt. Dort helfen andere Anwender und viele Adapterentwickler,
freiwillig und in ihrer Freizeit. Wie schnell und wie gut eine Frage beantwortet
wird, hängt fast ausschließlich davon ab, wie sie gestellt ist.

## Vor dem Schreiben

**Suchen.** Die meisten Fragen wurden schon einmal gestellt. Die Suche des
Forums nach der Fehlermeldung im Wortlaut führt oft direkt zum passenden Thema.

**Das richtige Unterforum wählen.** Es gibt eigene Bereiche für Einsteiger, für
die einzelnen Adapter, für Hardware, für Skripte und für die Entwicklung. Eine
Adapterfrage im Einsteigerbereich erreicht den Entwickler nicht.

**Ein bestehendes Thema nur dann fortsetzen**, wenn es wirklich dasselbe Problem
ist. Ein neues Problem im Thema eines anderen unterzubringen, verwirrt beide
Fälle.

## Was in den Beitrag gehört

| Angabe | Warum |
| --- | --- |
| **Was Sie erreichen wollen** | Oft gibt es einen einfacheren Weg als den eingeschlagenen. |
| **Was Sie getan haben** | Damit niemand Vorschläge macht, die Sie schon probiert haben. |
| **Was passiert ist** | Die tatsächliche Beobachtung, nicht die Vermutung über die Ursache. |
| **Die Versionen** | js-controller, Node.js, betroffener Adapter, Betriebssystem. |
| **Das Protokoll** | Der Abschnitt um den Fehler herum, ein paar Zeilen davor und danach. |

Die Versionen liefert `iobroker version` und der Reiter
[Hosts](/docs/admin/hosts.md).

## Der Titel

Der Titel entscheidet, wer den Beitrag überhaupt öffnet. Er sollte das Problem
benennen, nicht den Gemütszustand.

* Gut: „hm-rpc.0 verliert nach Neustart die Verbindung zur CCU3"
* Schlecht: „Hilfe!!! Geht nicht mehr"

## Das Protokoll als Text, nicht als Bild

Ein Bildschirmfoto des Protokolls ist unbrauchbar: es ist nicht durchsuchbar,
die Zeilen sind abgeschnitten, und niemand kann daraus zitieren. Fügen Sie den
Text aus der **heruntergeladenen** Protokolldatei ein und setzen Sie ihn in ein
Codefeld, damit die Formatierung erhalten bleibt.

!> Vor dem Absenden durchsehen und Passwörter, Zugangsschlüssel, IP-Adressen aus
dem öffentlichen Netz, Seriennummern und die Installations-UUID entfernen. Ein
Forumsbeitrag ist öffentlich und wird von Suchmaschinen erfasst.

## Nach dem Absenden

* **Nachfragen beantworten.** Wer helfen will, braucht oft eine Angabe mehr.
* **Geduld haben.** Alle Antwortenden machen das freiwillig. Ein „hat niemand
  eine Idee?" nach zwei Stunden hilft nicht.
* **Die Lösung nachtragen.** Wenn es am Ende funktioniert, gehört in den letzten
  Beitrag, woran es lag. Der nächste mit demselben Problem findet es über die
  Suche und ist dankbar.

## Forum oder Fehlerbericht

Nicht jedes Problem gehört ins Forum. Grobe Faustregel:

* **Forum**, wenn unklar ist, ob es überhaupt ein Fehler ist, wenn es um die
  eigene Einrichtung geht oder wenn eine Frage nach dem besten Weg dahintersteht.
* **[Fehlerbericht](/docs/trouble/issue.md)**
  beim Entwickler, wenn ein reproduzierbarer Fehler feststeht und klar ist, in
  welchem Adapter er steckt.

Im Zweifel zuerst ins Forum. Wenn sich dort herausstellt, dass es ein echter
Fehler ist, weist meist jemand den Weg zum richtigen Ort.
