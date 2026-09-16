---
title:       "Styleguide Oberfläche"
lastChanged: "08.09.2026"
---

# Styleguide für die Adapteroberfläche

Die Konfigurationsseite ist für viele Anwender der einzige Teil eines Adapters,
den sie je zu Gesicht bekommen. Sie entscheidet darüber, ob ein Adapter als
einfach oder als kompliziert gilt, unabhängig davon, wie gut er darunter
arbeitet.

## JSON-Config verwenden

Konfigurationsseiten werden als `jsonConfig.json` beschrieben, nicht als eigene
HTML-Seite. Der Admin baut daraus die Oberfläche. Das hat drei Folgen, die alle
in dieselbe Richtung gehen:

* Die Seite sieht aus wie alle anderen und verhält sich auch so.
* Sie passt sich Farbthema, Sprache und Bildschirmgröße von selbst an.
* Sie funktioniert weiter, wenn sich der Admin ändert.

Die vollständige Beschreibung aller Feldtypen steht unter
[JSON-Config](/docs/dev/adapterjsonconfig.md).

!> Selbst gebaute HTML-Seiten sind der Grund, warum manche Adapter im dunklen
Farbthema unlesbar sind oder auf dem Telefon nicht bedienbar. Für neue Adapter
kommen sie nicht in Frage.

## Nur fragen, was nötig ist

Jedes Feld auf der Seite ist eine Entscheidung, die der Anwender treffen muss.
Deshalb der Reihe nach:

1. **Kann es der Adapter selbst herausfinden?** Geräte im Netz lassen sich oft
   suchen. Eine Auswahlliste gefundener Geräte ist besser als ein Eingabefeld
   für eine IP-Adresse.
2. **Gibt es eine vernünftige Voreinstellung?** Dann eintragen. Ein Feld, das in
   99 Prozent der Fälle unverändert bleibt, gehört nicht nach oben.
3. **Braucht es das überhaupt?** Ein Abfrageintervall, das ohnehin niemand
   ändert, ist eine Einstellung zu viel.

Was selten gebraucht wird, gehört auf einen eigenen Reiter oder hinter den
Expertenmodus, nicht auf die erste Seite.

## Beschriften

* **Sagen, was passiert, nicht wie das Feld heißt.** „Abfrageintervall in
  Sekunden" ist brauchbar, `pollInterval` nicht.
* **Einheiten dazuschreiben.** Sekunden oder Millisekunden, Grad oder Prozent.
* **Hilfetexte kurz halten.** Ein Satz unter dem Feld ist besser als ein Absatz,
  den niemand liest.
* **Alles übersetzen.** Auch die Hilfetexte. Der
  [Translator](https://translator.iobroker.in/) nimmt einen englischen Text und
  liefert die übrigen Sprachen.

## Rückmeldung geben

Der Anwender muss sehen, ob es funktioniert hat. Eine Schaltfläche zum Prüfen
der Verbindung, die eine klare Antwort gibt, erspart mehr Forenbeiträge als
jeder Hilfetext. Wenn etwas nicht geht, gehört in die Meldung, **was zu tun
ist**, nicht nur, dass es schiefging.

## Zugangsdaten

Passwörter und Schlüssel gehören in Felder vom Typ Passwort, werden verschlüsselt
gespeichert und über `protectedNative` vor anderen Adaptern geschützt. Siehe
[Sicherheit](/docs/dev/adaptersecurity.md).

## Vor dem Veröffentlichen ansehen

| Prüfung | Warum |
| --- | --- |
| In beiden Farbthemen öffnen | Fest eingetragene Farben fallen sofort auf. |
| In einer anderen Sprache öffnen | Fehlende Übersetzungen und zu lange Beschriftungen werden sichtbar. |
| Auf einem schmalen Fenster öffnen | Viele Anwender konfigurieren vom Tablet aus. |
| Ohne Eingaben speichern | Es muss klar werden, welche Angabe fehlt. |
| Mit falschen Angaben speichern | Die Meldung muss weiterhelfen. |

?> Als Vorbild dienen die Konfigurationsseiten gepflegter Adapter aus dem
offiziellen Repository. Etwas Bestehendes nachzubauen ist hier ausdrücklich
erwünscht, denn Wiedererkennbarkeit ist der ganze Zweck.
