---
chapters: {"pages":{"en/adapterref/iobroker.smartgarden/README.md":{"title":{"en":"ioBroker.smartgarden"},"content":"en/adapterref/iobroker.smartgarden/README.md"},"en/adapterref/iobroker.smartgarden/FAQ.md":{"title":{"en":"ioBroker.smartgarden"},"content":"en/adapterref/iobroker.smartgarden/FAQ.md"},"en/adapterref/iobroker.smartgarden/FORECAST.md":{"title":{"en":"ioBroker.smartgarden"},"content":"en/adapterref/iobroker.smartgarden/FORECAST.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.smartgarden/FORECAST.md
title: ioBroker.smartgarden
hash: pYdI9ge9YcCv6kcRY2fbydcK9Ut+GqCFYmhjhDIJsmQ=
---
![Logo](../../../en/adapterref/iobroker.smartgarden/admin/smartgarden.png)

# ioBroker.smartgarden

## Inhaltsverzeichnis

- [Allgemeine Prognosevarianten](#general-forecast-variants)
  - [Qualitative Prognose](#qualitative-forecast)
  - [Quantitative Prognose](#quantitative-forecast)
- [Prognosen in ioBroker.smartgarden](#forecasting-in-iobrokersmartgarden)
  - [Was wird umgesetzt?](#what-is-implemented)
    - [Ein Beispiel – das Laden einer Batterie](#an-example---charging-battery)
  - [Erkennung ungültiger Daten](#detection-of-invalid-data)
    - [Fehlerprüfung](#Error-check)
    - [Grundlegende Überprüfung](#basic-check)
    - [Erweiterte Prüfung mit Boxplot](#enhanced-check-with-box-plot)
  - [Umgang mit ungültigen Daten](#handling-for-invalid-data)
- [Lizenz](#license)

## Allgemeine Prognosevarianten

Zur Vorhersage von Ereignissen unterscheiden wir zwei Hauptvarianten:

- qualitative Prognose oder
- quantitative Prognose

### Qualitative Prognose

Qualitative Prognosen sind subjektive Einschätzungen, die von Experten mit fundiertem Fachwissen intuitiv erstellt werden.

Eine mögliche Variante ist die lineare Extrapolation → vergangene Werte werden grob in die Zukunft projiziert.

Eine weitere Variante sind Meinungsumfragen.

### Quantitative Prognose

Quantitative Prognosen bestehen hauptsächlich aus der Verarbeitung von Datenmaterial. Sie liefern konkrete, numerische Ergebnisse.

Gängige quantitative Vorhersagen sind Wettervorhersagen.

## Prognosen in ioBroker.smartgarden

_**Alles sind Daten – Daten sind alles**_

Ein intelligentes Gerät eignet sich ideal zur Datenerfassung. Dieselben Prozesse laufen regelmäßig ab. Daher verfügt Smartgarden über eine Prognosefunktion, die historische Daten erfasst und anhand dieser Daten die verbleibende Lade- und Mähzeit vorhersagt.

Meiner Beobachtung nach variiert die Mähzeit im Laufe eines Jahres erheblich. Sie richtet sich nach dem Rasenwachstum und wird daher in der Implementierung berücksichtigt. Ebenso unterliegt der eingebaute Akku einer gewissen Alterung und verliert mit der Zeit an Kapazität.

### Was wird umgesetzt?

Diese Implementierung speichert historische Daten zu Mäh- und Ladezyklen.

Die folgende Beschreibung ist unabhängig von Mäh- und Ladezeiten – sie trifft auf beides zu.

Für historische Daten gibt es eine Reihe von realen Zyklen. Ein realer Zyklus umfasst 101 Elemente (z. B. steigt die Batteriekapazität von 0 auf 100 → 101 Elemente). In jedem Element werden ein Zeitstempel und die aktuelle Batteriekapazität (in Prozent) gespeichert.

Wenn ein Zyklus abgeschlossen ist,

- Die Gültigkeit wird geprüft und
- Die Zeitdifferenz zum Endzeitpunkt wird für jeden Batteriestand berechnet.

#### Ein Beispiel – das Laden einer Batterie

| Kapazität \[%}                              | 0     | 1     | 2     | 3     | ... | 98    | 99    | 100   |
| ------------------------------------------- | ----- | ----- | ----- | ----- | --- | ----- | ----- | ----- |
| Zeit \[Min:Sek]                             | 10:00 | 10:02 | 10:05 | 10:06 | ... | 13:16 | 13:18 | 13:20 |
| Δ Zeit \[Sek.] bis zum Abschluss des Zyklus | 200   | 198   | 195   | 194   | ... | 4     | 2     | 0     |

Sie sehen, dass der Prozess um 10:00 Uhr (zweite Zeile) bei 0 % (erste Zeile) begann und um 13:20 Uhr mit 100 % endete. Die Zeitdifferenz für jedes Element ist in der dritten Zeile angegeben. Wie Sie sehen, verlief die Zeitdifferenz nahezu linear, nur für den Sprung von 1 % auf 2 % Kapazität benötigte der Akku etwas mehr Zeit.

Wenn Sie jetzt die benötigte Zeit für die nächste Akkuladung vorhersagen sollten, würden Sie sicherlich sagen:

- Bei Kapazität 0: Es dauert 200 Sekunden, bis der Akku vollständig geladen ist.
- Bei Kapazität 1: Es dauert 198 Sekunden, bis der Akku vollständig geladen ist.
- Bei Kapazität 2: Es dauert 195 Sekunden, bis der Akku vollständig geladen ist.
- Bei Kapazität 3: Es dauert 194 Sekunden, bis der Akku vollständig geladen ist.
- ...
- Bei einer Kapazität von 99: Es dauert 2 Sekunden, bis der Akku vollständig geladen ist.
- Bei einer Kapazität von 100: Es dauert 0 Sekunden, bis der Akku vollständig geladen ist.

Alle diese Prognosewerte sind in Ihren historischen Daten verfügbar.

Wie bereits erwähnt, gibt es eine Reihe solcher Zyklen. Bei mehreren Zyklen wird der Mittelwert der Einzelwerte zur Vorhersage eines einzelnen Wertes gebildet. Dies reduziert den Einfluss möglicher Datenfehler.

Selbstverständlich beginnt der Ladevorgang Ihres Rasenmähers nicht, wenn der Akku 0 % geladen ist; anders ausgedrückt: Ihr Rasenmäher mäht erst, wenn der Akku vollständig leer ist.

### Erkennung ungültiger Daten

Eine der größten Herausforderungen in der Statistik ist die Identifizierung fehlerhafter Daten. Um dies zu erreichen, werden Fehler überwacht. Zusätzlich werden eine Basisprüfung und eine erweiterte Prüfung durchgeführt.

#### Fehlerprüfung

Fehler beim Mähen werden ständig überwacht. Ein Fehler tritt in diesem Zusammenhang auf, wenn der Wert des Datenpunkts`state_value` ist nicht gleich`OK` Die

#### Grundlegende Überprüfung

Damit ein Verlauf als gültig akzeptiert wird, muss das Ende der Aktion (Mähen oder Aufladen) erkannt worden sein. Dies wird durch eine Statusänderung signalisiert.

- zum Ende des Mähens:
  - Datenpunkt:`activity_value`
    | alter Status                                   | neuer Status                     |
    | ---------------------------------------------- | -------------------------------- |
    | `OK_CUTTING` oder`OK_CUTTING_TIMER_OVERRIDDEN` | `OK_SEARCHING` oder`OK_CHARGING` |

- zum Ende des Ladevorgangs:
  - Datenpunkt:`batteryState_value`
    | alter Status | neuer Status |
    | ------------ | ------------ |
    | `CHARGING`   | `OK`         |

#### Erweiterte Prüfung mit Boxplot

Die Korrektheit wird zusätzlich mithilfe der Boxplot-Methode überprüft. Eine Beschreibung von Boxplots finden Sie auf Wikipedia ( [englisch](https://en.wikipedia.org/wiki/Box_plot) und [deutsch)](https://de.wikipedia.org/wiki/Box-Plot) .

Für den Akkustand am Ende der Aktion wird ein Boxplot erstellt.

Dieser Wert wird sich im Laufe der Zeit sicherlich ändern, schnelle, große Änderungen sind jedoch nicht zu erwarten. Datenfehler, z. B. durch manuelles Stoppen des Mähvorgangs, lassen sich zuverlässig erkennen.

_Zur Klarstellung:_ Der Adapter erstellt keine echten Diagramme, sondern bereitet die Daten so auf, als ob Diagramme erstellt würden, damit entschieden werden kann, ob die Daten als gültig erkannt werden oder nicht.

### Umgang mit ungültigen Daten

Ungültige Daten werden nicht im Verlauf gespeichert.

Wenn der Adapter mehr als 10 ungültige Verlaufssätze hintereinander erkennt, wird der gesamte Verlauf gelöscht.

## License

 Copyright (c) 2020 jpgorganizer, https://github.com/jpgorganizer 
 
 smartgarden by jpgorganizer is licensed under a 
 Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License 
 [(CC-BY-NC-SA-4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
 Based on a work at https://github.com/jpgorganizer/ioBroker.smartgarden.
 

<!--- SVN: $Rev: 2831 $ $Date: 2022-06-13 13:00:32 +0200 (Mo, 13 Jun 2022) $ --->