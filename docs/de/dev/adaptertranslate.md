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

Adapter bestehen aus mehreren Teilen, die übersetzt werden müssen:

1. Strings in der Admin-Benutzeroberfläche
1. Titel und Beschreibung in `io-package.json`
1. Veröffentlichung von Neuigkeiten in `io-package.json`

## Sprachen
Alle diese kurzen Strings **müssen** in die folgenden Sprachen übersetzt werden:

- Englisch (de)
- Deutsch (de)

Sie **sollten** auch in die folgenden zusätzlichen Sprachen übersetzt werden:

- Russisch (ru)
- Portugiesisch (pt)
- Niederländisch (nl)
- Französisch (fr)
- Italienisch (es)
- Spanisch (es)
- Polnisch (pl)
- Chinesisch (zh-cn)

## Automatisierte Übersetzung
Alle Adapter sollten die automatisierte Übersetzung mit `gulp` verwenden.

Wenn ein Adapter mit [Adapter-Ersteller](https://github.com/ioBroker/create-adapter) erstellt wird, wird die richtige gulp-Datei erstellt.

Immer wenn Sie einige Strings hinzufügen, können Sie einfach mit `gulp translateAndUpdateWordsJS` alle fehlenden Übersetzungen hinzufügen.

Um das Übersetzen der Release Notes zu automatisieren, ist auch die Verwendung des [Release-Skript von @AlCalzone](https://github.com/AlCalzone/release-script) eine einfache Option, die das aus einem englisch geschriebenen Changelog automatisiert.

## Verwaltete Übersetzungen
Automatisierte Übersetzungen sind oft nicht gut genug oder verwirrend, daher bietet ioBroker die Weblate-Plattform für verwaltete Community-Übersetzungen an:

https://weblate.iobroker.net/

In Weblate können Mitglieder der Community problemlos Übersetzungen in eine beliebige Anzahl von Sprachen für alle enthaltenen ioBroker-Adapter verwalten.

Um Ihren Adapter zu Weblate hinzuzufügen, folgen Sie bitte [diese Richtlinien](https://github.com/ioBrokerTranslator/doc/blob/master/README.md).

Weblate verwaltet derzeit nur Strings in der Admin-Benutzeroberfläche. Es ändert weder `io-package.json` noch Ihre Dokumentation.