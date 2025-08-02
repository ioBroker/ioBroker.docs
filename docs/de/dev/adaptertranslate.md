---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/adaptertranslate.md
title: Übersetzung von Adaptern
hash: 8XvB1Gq0qo9gVlIP2+QfpMZ3OQTE+OfKgPD94WrJdcQ=
---
# Übersetzung von Adaptern
## Einführung
ioBroker wird international in [viele verschiedene Sprachen](https://www.iobroker.net/#en/statistics) verwendet, daher sind Übersetzungen sehr wichtig.

Adapter bestehen aus mehreren Teilen, die übersetzt werden müssen:

1. Zeichenfolgen in der Administrator-Benutzeroberfläche
1. Titel und Beschreibung in `io-package.json`
1. Neuigkeiten in `io-package.json` veröffentlichen

## Sprachen
Alle diese kurzen Zeichenfolgen **müssen** in die folgenden Sprachen übersetzt werden:

- Englisch (en)
- Deutsch (de)

Sie **sollten** auch in die folgenden zusätzlichen Sprachen übersetzt werden:

- Russisch (ru)
- Portugiesisch (pt)
- Niederländisch (nl)
- Französisch (fr)
- Italienisch (it)
- Spanisch (es)
- Polnisch (pl)
Chinesisch (zh-cn)

## Automatisierte Übersetzung
Alle Adapter sollten die automatische Übersetzung mit `gulp` verwenden.

Wenn ein Adapter mit [Adapter-Ersteller](https://github.com/ioBroker/create-adapter) erstellt wird, wird die richtige Gulp-Datei erstellt.

Wenn Sie Zeichenfolgen hinzufügen, können Sie einfach `gulp translateAndUpdateWordsJS` verwenden, um alle fehlenden Übersetzungen hinzuzufügen.

Um die Übersetzung der Versionshinweise zu automatisieren, ist auch die Verwendung von [Release-Skript von @AlCalzone](https://github.com/AlCalzone/release-script) eine einfache Option, die dies aus einem englischsprachigen Änderungsprotokoll automatisiert.

## Verwaltete Übersetzungen
Automatisierte Übersetzungen sind oft nicht gut genug oder verwirrend, daher bietet ioBroker die Weblate-Plattform für verwaltete Community-Übersetzungen an:

https://weblate.iobroker.net/

In Weblate können Community-Mitglieder problemlos Übersetzungen in eine beliebige Anzahl von Sprachen für alle enthaltenen ioBroker-Adapter verwalten.

Um Ihren Adapter zu Weblate hinzuzufügen, folgen Sie bitte [diese Richtlinien](https://github.com/ioBrokerTranslator/doc/blob/master/README.md).

Weblate verwaltet derzeit nur Zeichenfolgen in der Administrator-Benutzeroberfläche. Es ändert weder `io-package.json` noch hat es Auswirkungen auf Ihre Dokumentation.