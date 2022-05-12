---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/adaptertranslate.md
title: Übersetzung von Adapter
hash: L2W7WsInFLrJZUsGZg0wORin1/ZdGZR0Zd1zpbnKDjo=
---
# Übersetzung von Adaptern
## Einführung
ioBroker wird international in [viele verschiedene Sprachen](https://www.iobroker.net/#en/statistics) verwendet, daher sind Übersetzungen sehr wichtig.

Adapter haben mehrere Teile, die übersetzt werden müssen:

1. Strings in der Admin-Benutzeroberfläche
1. Titel und Beschreibung in „io-package.json“.
1. Neuigkeiten in `io-package.json` veröffentlichen

## Sprachen
Alle diese kurzen Zeichenfolgen **müssen** in die folgenden Sprachen übersetzt werden:

- Englisch (en)
- Deutsch

Sie **sollten** auch in die folgenden zusätzlichen Sprachen übersetzt werden:

- Russisch (ru)
- Portugiesisch (pt)
- Niederländisch (nl)
- Französisch (fr)
- Italienisch (es)
- Spanisch (es)
- Polnisch (pl)
- Chinesisch (zh-cn)

## Automatische Übersetzung
Alle Adapter sollten die automatische Übersetzung mit `gulp` verwenden.

Wenn ein Adapter mit [Adapter-Creator](https://github.com/ioBroker/create-adapter) erstellt wird, wird die richtige Gulp-Datei erstellt.

Wann immer Sie einige Zeichenfolgen hinzufügen, können Sie einfach `gulp translateAndUpdateWordsJS` verwenden, um alle fehlenden Übersetzungen hinzuzufügen.

Um das Übersetzen der Versionshinweise zu automatisieren, ist auch die Verwendung des [Release-Skript von @AlCalzone](https://github.com/AlCalzone/release-script) eine einfache Option, die das aus einem englisch geschriebenen Änderungsprotokoll automatisiert.

## Verwaltete Übersetzungen
Automatisierte Übersetzungen sind oft nicht gut genug oder verwirrend, daher bietet ioBroker die Weblate-Plattform für verwaltete Community-Übersetzungen an:

https://weblate.iobroker.net/

In Weblate können Mitglieder der Community problemlos Übersetzungen in eine beliebige Anzahl von Sprachen für alle enthaltenen ioBroker-Adapter verwalten.

Um Ihren Adapter zu Weblate hinzuzufügen, folgen Sie bitte [diese Richtlinien](https://github.com/ioBrokerTranslator/doc/blob/master/README.md).

Weblate verwaltet derzeit nur Zeichenfolgen in der Admin-Benutzeroberfläche. Es ändert weder `io-package.json` noch irgendetwas an Ihrer Dokumentation.