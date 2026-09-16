---
chapters: {"pages":{"en/adapterref/iobroker.pid/README.md":{"title":{"en":"ioBroker.pid"},"content":"en/adapterref/iobroker.pid/README.md"},"en/adapterref/iobroker.pid/docs/en/pid_en.md":{"title":{"en":"PID Adapter Information"},"content":"en/adapterref/iobroker.pid/docs/en/pid_en.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.pid/docs/en/pid_en.md
title: Informationen zum PID-Adapter
hash: BoQ/oHV6rDyrAB5Z17VO2oZ4wEqgTqK/l6U0pzjRqq8=
---
# Informationen zum PID-Adapter

## allgemeine Informationen

Dieser Adapter stellt pro Instanz einen oder mehrere konfigurierbare PID-Controller bereit.

Die allgemeine Funktionsweise eines PID-Reglers ist beispielsweise auf Wikipedia ( <https://en.wikipedia.org/wiki/PID_controller> ) dokumentiert. Kurz gesagt, berechnet ein PID-Regler einen Ausgabewert in Abhängigkeit vom Eingabewert und drei Parametern:

- proportionale Komponente
- integraler Bestandteil
- abgeleitete Komponente

Dieser ioBroker-Adapter ermöglicht die Konfiguration des PID-Reglers durch Angabe verschiedener, [hier](#controller-configuration) aufgeführter Parameter. Der Ausgabewert wird in regelmäßigen, als Zykluszeit festgelegten Intervallen berechnet. Zusätzlich kann die Berechnung angehalten und interne Werte bei Bedarf zurückgesetzt werden.

Als praktische Funktion kann der Ausgabewert im manuellen Modus auf einen bestimmten Wert eingestellt werden.

Die für die Eingabe verwendeten und durch den Reglerausgang festgelegten Zustände sind im Abschnitt [„Beschreibung der Zustände“](#description-of-states) aufgeführt.

## Konfiguration

### TAB-Konfiguration

Über diese Registerkarte können Sie eine oder mehrere Controller-Instanzen angeben, die unabhängig voneinander arbeiten.

<p align=center><img src="img/pid_tab_controllers.jpg" width="600" /></p>

#### Auswahl des Konfigurationsmodus

Sie können die folgenden Parameter angeben:

- Konfigurationsmodus<br> Das Feld`configuration mode` Hier können Sie auswählen, ob der Kp/Tn/Tv-Modus oder der Xp/tn/Tv-Modus gewünscht ist. Rechts neben der Auswahl wird die Berechnungsformel angezeigt, die von Ihrer Auswahl abhängt.

- Sollwert für Ableitung ignorieren<br> Wenn dieses Feld ausgewählt ist, wird der Differenzwert für den Ableitungsterm nur auf Basis des Istwerts berechnet, andernfalls wird auch der Sollwert berücksichtigt.

#### Controller-Konfiguration

Diese Tabelle ermöglicht die Konfiguration einer Liste von Controllern.

<!-- prettier-ignore-start -->

| Parameter                                | Typ             | Beschreibung                                                                                                | Kommentar                                                                                               |
| ---------------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Ermöglicht                               | boolescher Wert | Falls markiert, wird ein Controller verwendet.                                                              | kann verwendet werden, um einen Controller vorübergehend zu deaktivieren.                               |
| Autostart                                | boolescher Wert | Wenn diese Option aktiviert ist, wird der Controller immer dann gestartet, wenn der Adapter gestartet wird. | Der Controller kann gestoppt und gestartet werden mit`hold` in jedem Fall                               |
| Zustände für die Konfiguration verwenden | boolescher Wert | Falls markiert, werden die Parameter durch die Zustände gesteuert.                                          | Diese Option deaktiviert die Parameterfelder, wenn sie ausgewählt ist.                                  |
| Controller-ID                            | Text            | Controller-ID zur Identifizierung eines Controllers                                                         | Diese ID muss unter allen Controllern eindeutig sein, kann aber vom Benutzer ausgewählt werden.         |
| Kp oder Xp                               | Nummer          | Proportionalanteil des Reglers                                                                              | Die Angabe eines Teils der Dezimalstellen ist möglich.                                                  |
| Tn                                       | Nummer          | Integralanteil des Reglers                                                                                  | Die Angabe eines Teils der Dezimalstellen ist möglich.                                                  |
| Fernseher                                | Nummer          | Ableitungsterm des Reglers                                                                                  | Die Angabe eines Teils der Dezimalstellen ist möglich.                                                  |
| Min Out                                  | Nummer          | minimaler Ausgabewert                                                                                       |                                                                                                         |
| Maximal aus                              | Nummer          | maximaler Ausgabewert                                                                                       |                                                                                                         |
| Offset                                   | Nummer          | Offset zum Ausgabewert addiert                                                                              |                                                                                                         |
| Hysterese                                | Nummer          | Hysteresewert                                                                                               | Die Ausgabe ändert sich nicht, solange die Differenz kleiner als die Hysterese ist.                     |
| Umkehren                                 | boolescher Wert | Invertiere den Ausgabewert                                                                                  |                                                                                                         |
| Zykluszeit (ss)                          | ganze Zahl      | Zykluszeit in ms                                                                                            | Gibt die Zykluszeit für wiederkehrende Berechnungen an. Die Zykluszeit ist auf 100–3600000 ms begrenzt. |

<!-- prettier-ignore-end -->

### Registerkarte „Allgemeine Optionen“

Hier legen Sie einige allgemeine Optionen fest.

<p align=center><img src="img/pid_tab_options.jpg" width="600" /></p>

- Logarithmische Berechnung<br> Durch Aktivieren dieser Option wird die Protokollierung der bei regelmäßigen Neuberechnungen ermittelten Daten aktiviert.

- Ordner für Zustände deaktivieren<br> Normalerweise werden Zustände in Ordnern organisiert. Wenn eine flache Struktur bevorzugt wird, deaktiviert diese Option alle Ordner. Bitte beachten Sie, dass durch die Änderung dieser Option alle vorhandenen Zustände gelöscht werden. Dies kann Nebenwirkungen haben, z. B. auf die Verlaufsaufzeichnung. Daher muss vor der Änderung dieser Option eine Warnung bestätigt werden.

## Details zur Funktionalität

### Beschreibung der Staaten

Jede Adapterinstanz erzeugt pro konfiguriertem Controller eine Reihe von Zuständen. Die folgende Tabelle beschreibt den Inhalt dieser Zustände und ob sie schreibgeschützt (RO) oder für Benutzer beschreibbar (RW) sind.

<!-- prettier-ignore-start -->

| Ordner | Zustand               | Typ             | RW/RO | Beschreibung                                                                                                                      |
| ------ | --------------------- | --------------- | ----- | --------------------------------------------------------------------------------------------------------------------------------- |
| cfg    | Zyklus                | Nummer          | RO    | Zykluszeit in ms, wie in der Konfiguration festgelegt (\*)                                                                        |
| cfg    | dao                   | boolescher Wert | RO    | „true“ bedeutet, dass die Ableitung nur den Eingabewert „act“ verwendet.                                                          |
| cfg    | inv                   | boolescher Wert | RO    | „true“ bedeutet, dass die Ausgabe invertiert ist.                                                                                 |
| cfg    | useXp                 | boolescher Wert | RO    | „true“ bedeutet, dass der XP/TN/TV-Modus verwendet wird.                                                                          |
|        |                       |                 |       |                                                                                                                                   |
| In     | Akt                   | Nummer          | RW    | Istwert als Eingabe für den Regler                                                                                                |
| In     | halten                | boolescher Wert | RW    | Flagge zum Anhalten der Verarbeitung                                                                                              |
| In     | Mann                  | boolescher Wert | RW    | Flagge zur Aktivierung des manuellen Modus; „true“ aktiviert den manuellen Modus.                                                 |
| In     | man\_inp              | Nummer          | RW    | Der manuelle Eingabewert wird auf 'y' ausgegeben, wenn 'man' auf true gesetzt ist.                                                |
| In     | rst                   | boolescher Wert | RW    | Auslöser für einen Controller-Reset (Schreiben von true setzt den Controller zurück)                                              |
| In     | Satz                  | Nummer          | RW    | Sollwert als Eingangsgröße für den Regler                                                                                         |
|        |                       |                 |       |                                                                                                                                   |
| aus    | diff                  | Nummer          | RO    | Differenz zwischen Istwert („act“) und Sollwert („set“) im letzten Zyklus                                                         |
| aus    | lim                   | boolescher Wert | RO    | Die Anzeige wird auf „wahr“ gesetzt, wenn der Reglerausgang im letzten Zyklus die Grenzwerte erreicht hat.                        |
| aus    | supr                  | boolescher Wert | RO    | Der Indikator wird auf „wahr“ gesetzt, wenn der Regler die Eingabe aufgrund der Übersteuerungsgrenze (Hysteresegrenze) ignoriert. |
| aus    | y                     | Nummer          | RO    | Der Ausgangswert des Reglers soll als Rückkopplung an das System verwendet werden.                                                |
|        |                       |                 |       |                                                                                                                                   |
| para   | kp                    | Nummer          | RW    | Proportionalfaktor konfiguriert bei config (\*)                                                                                   |
| para   | max                   | Nummer          | RW    | Maximalwert für die Ausgabe oder Null als Faktor, konfiguriert in config (\*)                                                     |
| para   | min                   | Nummer          | RW    | Minimalwert für Ausgabe oder Null als Faktor, konfiguriert in config (\*)                                                         |
| para   | aus                   | Nummer          | RW    | Der zu Ausgabe addierte Wert des Statistik-Coffset ('y')                                                                          |
| para   | Sup                   | Nummer          | RW    | Unterdrückungs-/Hysteresewert                                                                                                     |
| para   | tn                    | Nummer          | RW    | Integralterm konfiguriert bei Konfiguration (\*)                                                                                  |
| para   | Fernseher             | Nummer          | RW    | Ableitungsterm konfiguriert in config (\*)                                                                                        |
| para   | XP                    | Nummer          | RW    | Proportionalfaktor konfiguriert bei config (\*)                                                                                   |
|        |                       |                 |       |                                                                                                                                   |
| extra  | i\_differr            | Nummer          | RO    | Die interne Differenz wurde zur Berechnung des D-Terms im letzten Zyklus verwendet.                                               |
| extra  | i\_sumerr             | Nummer          | RO    | Interner akkumulierter Fehler, der zur Berechnung des P-Terms im letzten Zyklus verwendet wurde                                   |
| extra  | letztes\_Delta        | Nummer          | RO    | Zeit zwischen den letzten Zyklen (ms)                                                                                             |
| extra  | letzte Aktualisierung | Nummer          | RO    | Zeitstempel (ms seit der Unix-Epoche) des letzten iupdate-Zyklus                                                                  |
| extra  | laufen                | boolescher Wert | RO    | Auf „true“ setzen, wenn der Controller läuft. Durch Setzen von „run“ auf „false“ werden die Berechnungen angehalten.              |
|        |                       |                 |       |                                                                                                                                   |

<!-- prettier-ignore-end -->

### Hysteresebehandlung und Aktualisierung der Ausgabe

Der Adapter wertet jeden in den Zustand „act“ geschriebenen Wert aus und berechnet die Differenz zu „set“. Ist die Differenz kleiner als der Hysteresewert, erfolgt keine Neuberechnung. Dadurch werden geringfügige Änderungen der Ausgabe minimiert, wenn sich „act“ nur geringfügig ändert.

Wenn der Adaptersteuerungsstatus „hold“ auf „true“ gesetzt ist, wird keine neue Berechnung durchgeführt. Die Ausgabe wird eingefroren („on-hold“), solange „hold“ auf „true“ gesetzt ist.

Wenn eine Zykluszeit ungleich Null konfiguriert ist (und „hold“ auf „false“ gesetzt ist), führt der Adapter alle x ms, die durch „cycle“ festgelegt wird, eine Neuberechnung durch. Das Ergebnis der Berechnung wird in die entsprechenden Zustände geschrieben. Sie können auch die internen Werte überprüfen.