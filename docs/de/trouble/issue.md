---
title:       "Fehler melden"
lastChanged: "08.09.2026"
---

# Fehler melden

Etwas funktioniert nicht. Bevor daraus eine Meldung an den Entwickler wird,
gehört eine Frage geklärt, und sie ist wichtiger als alles Weitere auf dieser
Seite: liegt es überhaupt am Programm?

## Zuerst: ist es ein Fehler im Programm

Die meisten Probleme sind keine. Sie liegen an einer Einstellung, an einer
veralteten Version, an einem Gerät, das nicht antwortet, oder an einem
Missverständnis darüber, wie etwas gedacht ist. Deshalb der Reihe nach:

1. **Selbst eingrenzen.** Läuft die Instanz, kommen Werte an, was sagt das
   Protokoll? Das Vorgehen steht unter
   [Fehlersuche](/docs/trouble/search.md).
2. **Im [Forum](/docs/trouble/forum.md)
   fragen.** Dort wird schnell geklärt, ob es an der eigenen Einrichtung liegt.
   Sehr oft ist die Antwort damit gefunden, und niemand muss etwas am Programm
   ändern.

?> Faustregel: **Forum**, solange unklar ist, ob überhaupt ein Fehler vorliegt.
**Meldung an den Entwickler** erst, wenn der Fehler nachvollziehbar ist und
feststeht, in welchem Adapter er steckt. Im Zweifel zuerst ins Forum. Wenn sich
dort herausstellt, dass es ein echter Fehler ist, weist meist jemand den Weg
zum richtigen Ort.

## Dann: drei Dinge prüfen

* **Ist alles aktuell?** Adapter und js-controller auf dem neuesten Stand. Viele
  Fehler sind längst behoben.
* **Lässt sich der Fehler wiederholen?** Wenn ja, notieren Sie, wie. Das ist die
  wertvollste Angabe des ganzen Berichts.
* **Ist er schon gemeldet?** Wie Sie das nachsehen, steht weiter unten.

## Was ein Issue ist

Gemeldet wird nicht per E-Mail, sondern als **Issue**. Das ist ein Eintrag in
der Fehlerliste eines Programms. Jeder Adapter, der js-controller, der Admin und
auch diese Dokumentation haben eine solche Liste. Sie liegt bei GitHub, der
Plattform, auf der der Quelltext von ioBroker verwaltet wird.

| | Forum | Issue |
| --- | --- | --- |
| Wer liest mit | Andere Anwender | Die Person, die den Adapter geschrieben hat |
| Wofür gedacht | Fragen, Hilfe bei der eigenen Einrichtung | Ein Fehler im Programm |
| Was daraus wird | Eine Antwort | Eine Änderung am Programm, oder eine Begründung, warum nicht |

Zwei Eigenschaften sind wichtig zu kennen.

Ein Issue ist **öffentlich**. Jeder kann es lesen, es bleibt dauerhaft stehen,
und Suchmaschinen finden es. Das ist so gewollt, denn der Nächste mit demselben
Problem soll es finden. Es heißt aber auch, dass keine Zugangsdaten
hineingehören.

Und es ist **kein Supportvertrag**. Adapter werden in der Freizeit geschrieben
und verschenkt. Ein Issue ist ein Hinweis an die Person, die das getan hat, kein
Anspruch auf eine Bearbeitung innerhalb einer Frist.

## Die richtige Liste finden

| Was betroffen ist | Wohin |
| --- | --- |
| Ein einzelner Adapter | Das Repository dieses Adapters |
| Der Admin selbst | `ioBroker/ioBroker.admin` |
| Start, Datenbanken, `iobroker`-Befehle | `ioBroker/ioBroker.js-controller` |
| Die Installation unter Linux | `ioBroker/ioBroker` |
| Diese Dokumentation | `ioBroker/ioBroker.docs` |

Das Repository eines Adapters finden Sie am schnellsten über die
[Adapterliste](/adapters) auf dieser
Website: Adapter auswählen, dort führt eine Schaltfläche mit dem GitHub-Zeichen
direkt zum Repository. Ansonsten hilft eine Suche bei GitHub nach
`ioBroker.<name>`.

?> Adapter werden von verschiedenen Personen betreut, das Repository liegt
deshalb nicht immer unter `ioBroker`. Entscheidend ist, dass der Name auf
`ioBroker.<adaptername>` endet.

## Ein Issue anlegen, Schritt für Schritt

1. **Konto anlegen.** Für das Schreiben ist ein GitHub-Konto nötig. Es ist
   kostenlos, Lesen geht auch ohne.
2. **Zum Repository gehen** und oben den Reiter **Issues** öffnen.
3. **Erst suchen.** Das Suchfeld über der Liste durchsucht nur die offenen
   Einträge. Für die geschlossenen den Filter `is:open` entfernen und
   `is:issue <stichwort>` eingeben. Oft steht dort schon die Lösung.
4. **Auf `New issue` klicken.** Manche Adapter bieten dann eine Auswahl an
   Vorlagen an, etwa *Bug report* und *Feature request*. Wählen Sie die
   Fehlermeldung. Die Vorlage fragt genau das ab, was gebraucht wird; füllen Sie
   alle Felder aus und löschen Sie die Hinweiszeilen nicht einfach weg.
5. **Titel und Text schreiben.** Was hineingehört, steht im nächsten Abschnitt.
6. **Absenden** mit `Submit new issue`.

Danach bekommen Sie eine E-Mail, sobald jemand antwortet. Rückfragen zu
beantworten ist der wichtigste Teil: ein Bericht, der nach der ersten Rückfrage
liegen bleibt, wird geschlossen, ohne dass sich etwas ändert. Am Ende schließt
die entwickelnde Person den Eintrag. Taucht der Fehler wieder auf, lässt sich
derselbe Eintrag kommentieren oder wieder öffnen.

## Was hineingehört

1. **Ein Titel, der das Problem benennt.** „hm-rpc verliert nach Neustart die
   Verbindung zur CCU3" ist brauchbar, „geht nicht" nicht.
2. **Was Sie erwartet haben** und **was stattdessen passiert ist**. Zwei Sätze,
   aber getrennt voneinander.
3. **Wie sich der Fehler auslösen lässt**, Schritt für Schritt.
4. **Die Versionen**: Adapter, js-controller, Node.js, Betriebssystem.
   `iobroker version` und der Reiter
   [Hosts](/docs/admin/hosts.md) liefern
   die Angaben.
5. **Der Protokollauszug auf der Stufe `debug`**, aus der **heruntergeladenen**
   Protokolldatei. Wie die Stufe umgestellt wird, steht unter
   [Fehlersuche](/docs/trouble/search.md).

Protokolle gehören als Text hinein, nicht als Bildschirmfoto: in der Anzeige
werden lange Zeilen abgeschnitten, und aus einem Bild lässt sich weder suchen
noch zitieren. Damit die Formatierung erhalten bleibt, den Text in drei
Rückwärts-Anführungszeichen einschließen:

````
```
2026-09-08 14:02:11.431  - error: hm-rpc.0 (1234) Cannot connect to 192.168.1.20
```
````

Für Fehler in der Oberfläche ist ein Bildschirmfoto dagegen genau richtig. Es
lässt sich einfach in das Textfeld ziehen.

!> Vor dem Absenden durchsehen. Passwörter, Zugangsschlüssel, Token,
Seriennummern und die Installations-UUID gehören nicht in einen öffentlichen
Bericht.

## Sprache

Englisch erreicht alle Entwickler. Bei Adaptern aus dem deutschsprachigen Raum
ist Deutsch in Ordnung. In beiden Fällen gilt: ein Adapter ist Arbeit, die
jemand verschenkt hat, und der Ton entscheidet oft darüber, wie schnell etwas
passiert.

## Automatische Fehlermeldungen

Viele Adapter melden Abstürze von selbst an Sentry, wenn das in den
[Systemeinstellungen](/docs/admin/settings.md)
erlaubt ist. Übertragen wird der Programmablauf des Absturzes, keine
persönlichen Daten. Der Entwickler sieht dadurch, **dass** ein Fehler auftritt
und wie oft, aber nicht, was Sie dabei getan haben. Ein selbst geschriebener
Bericht bleibt deshalb wertvoll.

## Und wenn Sie es selbst beheben können

Dann ist ein **Pull Request** der nächste Schritt: ein Änderungsvorschlag am
Quelltext, den die betreuende Person übernehmen kann. Wie das abläuft, steht
unter
[Im Team arbeiten](/docs/community/project.md).
Die Regeln für Adapter stehen unter
[Best Practices](/docs/dev/bestpractices.md),
die für die Dokumentation unter
[Artikel schreiben](/docs/community/doc.md).
