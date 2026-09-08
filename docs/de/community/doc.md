---
title:       "Artikel schreiben"
lastChanged: "08.09.2026"
---

# Einen Artikel schreiben

Diese Dokumentation liegt als Sammlung von Markdown-Dateien im Repository
[ioBroker.docs](https://github.com/ioBroker/ioBroker.docs). Jede Seite hier
entspricht genau einer Datei dort. Wer einen Fehler findet oder etwas ergänzen
möchte, ändert diese Datei.

## Der schnelle Weg

Am Ende jeder Seite steht neben dem Änderungsdatum der Verweis **Edit on
github**. Er führt genau auf die Datei, die diese Seite erzeugt hat, und von
dort der Bleistift in einen Editor im Browser. Beim Speichern legt
GitHub eine Abzweigung an und schlägt einen Pull Request vor. Ein GitHub-Konto
genügt, mehr braucht es für eine Korrektur nicht.

Für größere Änderungen lohnt sich der übliche Weg: Repository abzweigen, lokal
ändern, Pull Request stellen.

## Welche Datei die richtige ist

Die Dokumentation liegt in vier Sprachen unter `docs/de`, `docs/en`, `docs/ru`
und `docs/zh-cn`. Nur eine davon ist jeweils die Quelle. Erkennen lässt sich das
am Kopf der Datei:

```
---
title:       "Reiter Benutzer"
lastChanged: "07.09.2026"
---
```

So sieht eine Quelle aus. Eine erzeugte Übersetzung trägt stattdessen ein Feld
`translatedFrom` und eine Warnung dazu:

```
---
translatedFrom: de
translatedWarning: If you want to edit this document ...
hash: ...
---
```

!> Eine Datei mit `translatedFrom` **nicht** bearbeiten. Sie wird beim nächsten
Durchlauf neu erzeugt, und die Änderung ist weg. Bearbeitet wird die Datei in
der Sprache, aus der übersetzt wurde.

## Regeln

Die verbindlichen Vorgaben stehen im
[Styleguide](/docs/community/styleguidedoc.md).
Das Wichtigste daraus:

* Dateinamen klein, nur `a-z`, `0-9`, `_` und `.`.
* Zeilenumbruch bei 80 Zeichen.
* Jedes Dokument beginnt mit einer Überschrift der Ebene 1.
* Keine Personalpronomen in Referenztexten, geschlechtsneutrale Formulierungen.
* Als Strich das Minuszeichen verwenden, keinen langen Gedankenstrich.
* Bilder und andere Beigaben in den Ordner `media` neben der Seite.

Welche Auszeichnungen darüber hinaus zur Verfügung stehen, etwa die farbigen
Hinweiskästen, steht unter
[Markdown-Syntax](/docs/community/docmarkdown.md).

## Neue Seiten

Eine neue Datei allein genügt nicht: die Seite muss zusätzlich in `docs/content.md`
eingetragen werden, sonst taucht sie im Menü nicht auf. Der Eintrag legt auch
den Titel in den vier Sprachen fest:

```
  * [en:Users;de:Benutzer;ru:Пользователи;zh-cn:用户](admin/users)
```

Steht dort nur ein Wort ohne Sprachkürzel, gilt es für alle Sprachen.

## Worauf es inhaltlich ankommt

* **Nachprüfen statt erinnern.** Wenn eine Seite eine Oberfläche beschreibt,
  gehört sie neben die geöffnete Oberfläche. Beschriftungen ändern sich.
* **Sagen, was zu tun ist.** Eine Aufzählung der Schaltflächen ist keine
  Anleitung. Der Leser hat ein Ziel.
* **Aktuelle Bilder.** Ein Bildschirmfoto einer alten Version verwirrt mehr, als
  es hilft. Lieber kein Bild als ein falsches.
* **Nichts behaupten, was nicht geprüft ist.** Eine Vermutung als Tatsache
  aufzuschreiben, richtet mehr Schaden an als eine Lücke.

?> Sie müssen keine ganze Seite schreiben. Ein korrigierter Befehl, ein
ergänzter Satz oder ein aktuelles Bild sind willkommene Beiträge.
