---
chapters: {"pages":{"en/adapterref/iobroker.countdown/README.md":{"title":{"en":"ioBroker.countdown"},"content":"en/adapterref/iobroker.countdown/README.md"},"en/adapterref/iobroker.countdown/docs/en/countdown.md":{"title":{"en":"ioBroker.countdown"},"content":"en/adapterref/iobroker.countdown/docs/en/countdown.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.countdown/docs/en/countdown.md
title: ioBroker.countdown
hash: oDDkD6LQsk19KZmfBdbHZ9ZXBcI/5bLDhHEtDzcPe+M=
---
# ioBroker.countdown

## Countdown anzeigen

Der Adapter stellt Ihnen automatisch eine JSON-Tabelle und eine HTML-Tabelle bereit. Wählen Sie für die JSON-Tabelle das Widget „basic-table“ und für die HTML-Tabelle „basic - string (unescaped)“.

Es ist möglich, entweder den Kurztext oder den Langtext anzuzeigen.![Logo](../../../../../en/adapterref/iobroker.countdown/docs/en/admin/countdown_json.png)

## Countdowns nach Datum sortieren

Standardmäßig werden Countdowns in der HTML- und JSON-Ausgabe in der Reihenfolge ihrer Erstellung angezeigt. Um sie chronologisch nach ihrem Enddatum zu sortieren, aktivieren Sie die Option „Countdowns nach Datum sortieren“ in den Adaptereinstellungen. Dadurch werden alle Countdowns vom frühesten zum spätesten Datum sortiert.

## So fügen Sie Countdowns hinzu

Es gibt mehrere Möglichkeiten, Countdowns einzurichten:

- Sie können in den Adaptereinstellungen auf der Registerkarte „Countdown erstellen“ einen Countdown erstellen.
- Sie können im Geräte-Setup einen manuellen Status erstellen. Der Name des Objekts entspricht dem Alarmnamen, der Wert ist das Datum. Das Datum muss im Format „TT.MM.JJJJ HH:mm:ss“ vorliegen.
- Sie können mit \`sendto\` einen Alarm erstellen. Dort können Sie entweder die Komponenten (mindestens Jahr Monat Tag) oder eine Datumszeichenfolge senden. Das Format der Datumszeichenfolge können Sie in den Einstellungen des Adapters anpassen.![Logo](../../../../../en/adapterref/iobroker.countdown/docs/en/admin/countdown_blocky.png)
- Sie können mit \`sendto\` Tage, Monate und Jahre zum heutigen Datum hinzufügen. Senden Sie dazu bitte den Komponentennamen und entweder \`addminutes\`, \`addhours\`, \`adddays\`, \`addmonths\` oder \`addyears\` als Integer-Wert.![Logo](../../../../../en/adapterref/iobroker.countdown/docs/en/admin/countdown_blocky_add.png)

## So passen Sie Countdowns an

Sie können einen Countdown entweder in den Adaptereinstellungen oder mit der Funktion „sendto“ aktualisieren. Verwenden Sie dazu einfach denselben Namen und senden Sie die Nachricht mit dem neuen Datum. Dadurch wird der Countdown aktualisiert.

## Wie man Countdowns löscht

Sie können einen Countdown mit der Funktion \`sendto\` löschen. Senden Sie daher einfach den Namen mit \`sendto\` an den Adapter, und der Countdown wird automatisch gelöscht.

## Wiederholender Countdown

Wenn Sie einen Countdown in einem bestimmten Zeitraum wiederholen möchten (z. B. einen Countdown für Ihren Hochzeitstag jedes Jahr), können Sie dies ebenfalls mit diesem Adapter realisieren. Füllen Sie dazu entweder das Feld „Wiederholungszeitraum“ in den Adaptereinstellungen aus oder fügen Sie den Zeitraum nach dem Datum hinzu, wenn Sie einen Countdown vom Typ „Datum“ erstellen. Ein „sendTo“-Befehl für einen Countdown, der am 1. April 2020 endet und sich jedes Jahr wiederholen soll, sähe folgendermaßen aus:

sendTo("countdown.0", "send", { "name": 'Hochzeitstag', "date": '01.04.2020 00:01+1Y' });

Die Parameter sind hier:

- Y: Jahre
- M: Monate
- D: Tage
- H: Stunden
- m: Minuten

## Zählen Sie mit.

Neu hinzugefügt wurde die Funktion zum Hochzählen – also zum Zählen der Tage ab einem Datum in der Vergangenheit. Dies kann entweder in den Adaptereinstellungen oder durch Hinzufügen eines „#“ zu einer Datumszeichenfolge erfolgen, z. B.

sendTo("countdown.0", "send", { "name": 'Geburtsdatum', "date": '01.04.2020 00:01# });

## Verfügbare Ausgänge

|    Datentyp   |                               Beschreibung                              |
| :-----------: | :---------------------------------------------------------------------: |
|    Minuten    |       Minuten bis zum Ende des Countdowns (nicht die Gesamtzeit!)       |
|      Std.     |      Stunden bis zum Ende des Countdowns (nicht die Gesamtanzahl!)      |
|      Tage     |         Tage bis zum Ende des Countdowns (nicht die Gesamtzahl!)        |
|     Monate    |        Monate bis zum Ende des Countdowns (nicht die Gesamtzahl!)       |
|     Jahre     |        Jahre bis zum Ende des Countdowns (nicht die Gesamtzahl!)        |
|      Name     |                              Countdown-Name                             |
|    Enddatum   | Enddatum des Countdowns – formatiert wie in den Einstellungen definiert |
|  inWordsShort |       Kombinierter Wert von Minuten, Stunden,... - z. B. 1J 5M 4T       |
|  inWordsLong  |   Gesamtwert von Minuten, Stunden,... - z. B. 1 Jahr, 5 Monate, 4 Tage  |
| Gesamtstunden |                 Gesamtzahl der Stunden bis zum Enddatum                 |
|   Gesamttage  |                   Gesamtzahl der Tage bis zum Enddatum                  |
|  Gesamtwochen |                  Gesamtzahl der Wochen bis zum Enddatum                 |
|  Gesamtmonate |                  Gesamtzahl der Monate bis zum Enddatum                 |
|  Gesamtjahre  |                  Gesamtzahl der Jahre bis zum Enddatum                  |

|reached|Boolesches Feld, das angibt, ob das Enddatum erreicht wurde oder nicht| |repeatEvery|Der Countdown wird nach Erreichen des Enddatums in diesem Zeitraum wiederholt|

|totalsJson|JSON mit der Gesamtzahl der Objekte für Stunden, Tage, Wochen, Monate und Jahre| |fullJson|JSON mit allen Objekten|