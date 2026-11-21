---
chapters: {"pages":{"en/adapterref/iobroker.anomaly-detection/README.md":{"title":{"en":"ioBroker.anomaly-detection"},"content":"en/adapterref/iobroker.anomaly-detection/README.md"},"en/adapterref/iobroker.anomaly-detection/README.de.md":{"title":{"en":"ioBroker.anomaly-detection"},"content":"en/adapterref/iobroker.anomaly-detection/README.de.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.anomaly-detection/README.de.md
title: ioBroker.anomaly-detection
hash: qrI9HCmwka06U3/Ujn9zdiLgkCvLJZUJJmvNF3bgEZc=
---
![Версия NPM](https://img.shields.io/npm/v/iobroker.anomaly-detection.svg?color=blue)
![Загрузки](https://img.shields.io/npm/dm/iobroker.anomaly-detection.svg)

<img src="admin/anomaly-detection.png" alt="Logo" width="400">

# ioBroker.anomaly-detection

[Английский](/#/adapters/anomaly-detection) · **Немецкий**

Адаптер соответствует нормальным параметрам, а также позволяет получать цифровые данные о брокере ioBroker и получать локальные статистические данные.

> **Es wird keine KI verwendet.** Адаптер работает с Cloud-Dienste noch externe KI- или Machine-Learning-API. Все локальные значения зависят от детерминированных математических и статистических данных, включая медиану, медианное абсолютное отклонение (MAD), базовые значения и надежные значения. Bei gleichen Eingangsdaten und Einstellungen sind die Ergebnisse nachvollziehbar und reproduierbar.

## Funktionsweise

Стартовый режим работы не должен превышать нормальную мощность 8 кВт, а также может нагреваться в течение длительного времени. Для числовых настроек адаптера необходимо создать надежные базовые линии. Jede eingehende Zustandsänderung wird ausgewertet; die Quellzustände werden nicht abgefragt (kein Polling).

Комбинированный адаптер для детерминированных детекторов:

- **Wertabweichungen (MAD):** Erkennt Werte außerhalb des gelernten Normalbereichs, ohne dass ein einzelner Extremwert die Baseline stark verzerrt.
- **Änderungsrate:** Bewertet `Delta / vergangene Zeit` и не забудьте отключить обновление.
- **Фестиваль:** Erkennt wiederholt empfangene identische Werte, длиной и конфигурацией Dauer anhalten. Ein fehlendes Обновление allein gilt niemals als festhängend.
- **Tageszeit-Kontext:** Verwendet Standardmäßig Stundenbereiche und kann zusätzlich nach Wochentagen getrennt werden. Bei zu wenigen Daten greift die Hierarchie auf den Zeitbereich und anschließend auf die globale Baseline zurück.

`score` ist ein deterministischer Schweregrad von 0 to 100. Er ist weder eine statistische Wahrscheinlichkeit noch eine Diagnose der sischen Ursache.

## Voraussetzungen

- Node.js 24 oder neuer (laut `package.json`).
- ioBroker js-controller 7.2.2 или новая версия (загрузка `io-package.json`).
- ioBroker Admin 8.2.0 или новая вкладка «Пользовательское администрирование». Föderierte Admin-Oberfläche verwendet React 19 и MUI 9; Совместимость с Admin-8.x-Hostversion не может быть отдельной, наиболее практичной. Вы можете указать актуальную версию административной версии.

| Счет   | Bedeutung        |
| ------ | ---------------- |
| 0–49   | нормальный       |
| 50–69  | ungewöhnlich     |
| 70–84  | Аномалия         |
| 85–100 | суровая аномалия |

## Математические основы

С адаптером можно начать, только надежная статистика. Er trainiert kein Neuronales Netz, ruft keinen KI-Dienst auf und setzt keine konstanten Messintervalle voraus.

### Wertabweichungen: медиана и MAD

Für eine gelernte Baseline mit Werten `x₁ … xₙ` ist der erwartete Wert der Median `m = median(x₁ … xₙ)`. Die Streuung wird mit der Median Absolute Deviation берется:

`MAD = median(|xᵢ − m|)`

Für einen neuen Wert `x` z-Score ergift sich der Robuste:

`robuster z-Score = 0,6745 × |x − m| / MAD`

Die Option **Sensitivität** legt fest, bei welchem z-Score dieser Detector den Wert 100 erreicht. Медианное и MAD werden von einzelnen Ausreißern deutlich weniger verzerrt als Mittelwert und Standardabweichung. Бэй `MAD = 0` ist ein unveränderter Wert нормальный; ein anderer Wert gilt als starke Abweichung.

### Änderungsrate

Для того, чтобы получить дополнительные сведения о временных интервалах:

`Rate = (aktueller Wert − vorheriger Wert) / vergangene Sekunden`

Базовый уровень ставки с использованием медианного/MAD-метода. Так что cann eine ungewöhnlich schnelle Änderung erkannt werden, auch wenn der Absolute Endwert noch pausibel ist.

### Festhängende Werte

Дизер Детектор является regelbasiert. Werden identische Werte wiederholt empfangen, merkt sich der Adaptor den ersten Zeitpunkt `t₀`. Эйн Треффер - это первый шанс, когда он позолочен:

`aktueller Zeitpunkt − t₀ ≥ konfigurierte Dauer`

Ein fehlendes Update zählt nicht als wiederholter Wert und kann daher keine Festhängend-Anomalie auslösen.

### Tageszeit- und Wochentags-Kontext

Zeitbereiche werden aus der localen Tageszeit gebildet:

`Zeitbereich = floor(Minuten seit Mitternacht / Bucket-Größe)`

При активации Wochentagsoption можно использовать Wochentag в дополнительном Шлюсселе. Базовый уровень будет невероятен, если вы будете думать о нем как о **важном вопросе** . Die Fallback-Reihenfolge lautet:

`Wochentag + Zeitbereich → Zeitbereich → globale Baseline`

### Kontextabhängige Baseline

Kontextzustände erzeugen zusätzliche Schlüssel, zum Beispiel `pumpe.ein=true`, `modus=eco` Одер `temperatur=10–15`. Цифровой контекст на празднике Intervalle eingeteilt:

`Intervallbeginn = floor(Kontextwert / Bucket-Breite) × Bucket-Breite`

Bei einer Breite von 5 der Wert 12,3 zum Intervall 10–15. Ein Kontext должен учитывать конфигурацию Mindeststanzahl и Messwerten enthalten, Bevor er als Baseline verwendet wird. Ein gültiger, aber noch nicht ausgereifter Kontext bleibt im Status `learning` und wird nicht mit einer fremden globalen Baseline verglichen. Изменение или изменение контекста в обычном режиме Zeit-/Global-Fallback. Комбинации, категории и образцы не должны начинаться с того, что информация не будет неконтролируемой.

### Dauerhafte Pegelverschiebung

Die Auswertung arbeitet mit Residuen:

`Residuum = tatsächlicher Wert − erwarteter Wert`

Надежные средние значения начинаются с актуальных остатков, которые могут быть изменены с долгими остатками, а также нормированы базовым уровнем MAD. Eine Verschiebung muss bei mehreren Auswertungen in Dieselbe Richtung anhalten; ein einzelner Пиковая точка изменения.

### Тренд

Auch der Trend, когда остатки остаются, должны быть нормальными Tagesmuster zuvor abgezogen werden. Для всех необходимых действий лучше всего:

`Steigungᵢⱼ = (Residuumⱼ − Residuumᵢ) / (Zeitstempelⱼ − Zeitstempelᵢ)`

Die Finale Steigung ist der Median dieser Steigungen (надежный метод Theil-Sen-ähnliche Methode). Isolierte Ausreißer haben dadurch deutlich weniger Einfluss als bei einer gewöhnlichen линейной регрессии. Ein Trend benötigt Mindestens 12 Messwerte über Mindestens sechs Stunden.

### Kombinierter Score und Lernen

Jeder Detectorliefert einen begrenzten Оценка от 0 до 100. Wert-/Kontext-, Pegelverschiebungs- und Trendsignale gelten als zusammengehörige Evidenz; Если сигнал не работает, его можно отключить дважды. Скорость и праздничный сигнал не будут отключены. Получите лучший сигнал, чтобы получить бонус. Der Endwert будет погружаться в диапазоне от 0 до 100.

Messwerte ab **Anomalie-Schwellenwert** werdennormalerweise nicht weiter gelernt, damit ein anhaltender Fehler nicht sofort als Normal gilt. Bestätigte Pegelverschiebungen sind eine Ausnahme: Ihre Werte werden schrittweise aufgenommen, damit ein legitimes neues Betriebsniveau zur neuen Baseline werden kann.

## Конфигурация

Füge in der Tabelle **Überwachte numerische Zustände** für jede Quelle eine Zeile hinzu. Unterstützt werden nur ioBroker-Zustände mit `common.type: number`.

Die wichtigsten Standardwerte sind bewusst zurückhaltend:

- Для стандартного использования требуется 30 сообщений.
- Чувствительность имеет 3,5 надежных z-показателя.
- Постоянные аномалии имеют стандартный результат: наберите 70 очков за минуту удовольствия.
- Eine Hysterese von 10 Punkten verhindert Flattern an der Schwelle.
- Стандартный детектор деактивации и активации в течение 120 минут.
- Der Tageszeitkontext Arbeitet Standardmäßig mit 60-Minuten-Bereichen; der Wochentagskontext не является обязательным.

Не забудьте использовать новые адаптеры. Двойные идентификаторы Quell-ID будут игнорироваться. Чтобы сконфигурировать объект, необходимо автоматически настроить его; beim Запустите протокол предупреждения.

Wird eine Quelle aus der Konfiguration entfernt und der Adaptor neu gestartet, löscht er den zugehörigengenerierten Teilbaum unter `anomaly-detection.0.sources` Sowie das Gespeicherte Modell. Вы можете использовать ursprüngliche Quell-ID в метаданных генерируемых Гератс. Если вам не нужно ничего менять, вы можете сконфигурировать все, что вам нужно.

## Analyseansicht und Verlauf

Регистрационная карта **Aktuelle Anomaliebewertungen** enthält pro überwachte Quelle ein Responses, zunächst eingeklapptes Diagramm **Verlauf & Anomalien** . Der Verlauf сначала был Оффненом. Zur Auswahl stehen **1 час** , **6 часов** , **24 часа** (стандартный) и **7 дней** .

Диаграмма доступна в Einheit des ioBroker-Zustands, с точки зрения `W`, `%` Одер `°C`, и passt seine Breite и die tatsächliche Kartenbreite an. Вот время:

- **Wert:** Historische Messwerte aus dem configurierten History-Adapter.
- **Erwartungsbereich:** ein Transparentes Band ausschließlich aus den zu jedem historischen Zeitpunkt gespeicherten `decisionLow` /`decisionHigh` -Гренцен. Фехленде Гренцен bleiben leer; der aktuelle Bereich wird nicht rückwirkend projiziert.
- **Контекст:** eine dezente Hervorhebung für Zeitabschnitte, deren gespeicherter Kontext zum aktuellen Kontext passt. Если вы хотите, чтобы ioBroker-`common.name` -Namen angezeigt.
- **Аномалия:** ein rotes Dreieck nur bei historischen Bewertungen mit `detected: true`.

Beim Überfahren или Berühren eines Punktes werden Wert und Einheit, historischer Erwartungsbereich (oder ein Hinweis, dass er nicht verfügbar ist), Status, übersetzter Grund, Score und Kontext für genau diesen Zeitpunkt angezeigt. Bei Wert-/Kontextabweichungen wird zusätzlich die konkrete Distanz oberhalb или unterhalb des historischen Bereichs angegeben. Скорость, праздники, тренды и ограничения по безопасности для ювелирных детекторов.

## Lernen und Persistenz

Normale Beobachtungen actualisieren globale und zeitbasierte Baselines schrittweise. Messwerte ab dem Anomalie-Schwellenwert werden nicht gelernt. Pro Baseline содержит 240 образцов и компактные данные по моделям; eine unbegrenzte Rohdaten-Zeitreihe wird nicht angelegt.

Все неисправности детекторов отключены в стандартном режиме. Kontextabhängige Erkennung kann bis zu drei boolesche, Text-/Enum- oder numerisch gebucketete Zustände getrennt lernen. Eine gültige, aber noch zu kleine Kontext-Baseline bleibt im Lernstatus. Pegelverschiebung benötigt wiederholte Evidenz; Trend benötigt mindestens 12 Residuen über sechs Stunden.

Адаптер предназначен для статистического анализа, диагностики и диагностики некоторых заболеваний и лучшего состояния здоровья. Ein History-Import Trainiert Nur Globale, Zeit-, Wochentags- und Rate-Modelle. Kontextbaselines изучается в Live-Werten, и мы всегда можем использовать History-Adapter beliebige Kontextzustände nicht zuverlässig zeitlich rekonstruieren können.

## Optionen im Überblick

| Вариант                                          | Zweck und Anwendung                                                                                                                     | Пример                                                                                                      |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Актививер**                                    | Начните или остановите Überwachung dieser Zeile. Деактивируйте Zeilen bleiben configuriert.                                             | Пожалуйста, отключите электропитание.                                                                       |
| **Quellstatus-ID**                               | Numerischer ioBroker-Zustand, der bewertet wird. Используйте инструмент выбора объектов.                                                | `alias.0.pumpe.leistung`                                                                                    |
| **Имя**                                          | Имя лесбиянки для создания Quellgerät; ändert nicht die Quell-ID.                                                                       | `Gartenpumpe Leistung`                                                                                      |
| **Начальное обучение**                           | Nur Live-Werte lernen или vorhandene History importieren.                                                                               | Для использования Power-Meter с InfluxDB-History: импорт истории.                                           |
| **History-Quelle**                               | Совместимый, активный исторический адаптер для импорта.                                                                                 | `influxdb.0`                                                                                                |
| **Zeitraum des History-Trainings (Tage)**        | Wie weit der Import zurückreicht. Представитель Nur Normalzeiten auswählen.                                                             | `30` Таге                                                                                                    |
| **Maximal importierte Proben**                   | Начало импорта zum Schutz von Speicher und Raspberry Pi.                                                                                | `1000`                                                                                                      |
| **Начало импорта истории**                       | Начать импорт напрямую со статусом `monitoring`.                                                                                        | Для активации режима работы.                                                                                |
| **Mindestens gelernte Proben**                   | Mindestgröße einer vertrauenswürdigen Baseline.                                                                                         | `30` für häufige Leistungswerte.                                                                            |
| **Zeit-Bucket-Größe (Minuten)**                  | Größe der Tageszeitbereiche. Kleinere Bereiche sind genauer, lernen aber langsamer.                                                     | `60` Минута                                                                                                 |
| **Чувствительность (надежный z-показатель)**     | Нидригер ist empfindlicher, höher toleranter.                                                                                           | Ауф `5` erhöhen, wennnormale Schwankungen zu viele Meldungen erzeugen.                                       |
| **Аномалия-Швелленверт**                         | Оценка, ab dem eine Anomalie Gespeichert und Nicht Mehr Gelernt Wird.                                                                   | `70`                                                                                                        |
| **Mindestdauer einer Anomalie (Минуты)**         | Zeit, die die Schwelle überschritten sein muss, bevor `detected` dauerhaft gesetzt wird.                                                 | `5` Минута                                                                                                  |
| **Детектор для Wertabweichungen (MAD)**          | Erkennt ungewöhnliche Absolute Werte gegenüber dem gelernten Bereich.                                                                   | Для температуры, нагрева, включения и нагрева.                                                              |
| **Detektor für Änderungsrate**                   | Erkennt ungewöhnlich schnelle Änderungen.                                                                                               | Für Durchfluss или Füllstand aktivieren; beinormalen Lastsprüngen deaktiviert lassen.                       |
| **Детектор для праздников Верте**                | Erkennt wiederholt empfangene identische Werte über die configurierte Dauer.                                                            | Для изменения состояния датчиков, которые активируются, они не могут быть постоянными заданными значениями. |
| **Dauer eines festhängenden Wertes**             | Wird nur bei aktiviertem Festhängend-Detektor angezeigt; legt dessen Mindestdauer fest.                                                 | `120` Минута                                                                                                |
| **Tageszeit-Kontext verwenden**                  | Trennt Baselines nach Tageszeit.                                                                                                        | `60` -Минутные ведра для Haushaltsverbrauch.                                                                |
| **Wochentags-Kontext verwenden**                 | Trennt zusätzlich nach Wochentag; функционировать вместе с Tageszeit-Kontext.                                                           | Büroverbrauch werktags gegenüber Wochenende.                                                                |
| **Kontextbezogene Erkennung aktivieren**         | Lernt abhängig von bis zu drei weiteren Zuständen.                                                                                      | `pumpe.ein`, `modus`, Außentemperatur.                                                                     |
| **Kontextzustände**                              | Die Zustände, die den Betriebszustand beschreiben. Boolesche und Enum-Werte benötigen keine Breite; numerische Werte verwenden Buckets. | `pumpe.ein=true`, Температура-Широта `5`.                                                                  |
| **Dauerhafte Erkennung von Pegelverschiebungen** | Erkennt ein anhaltend verändertes Betriebsniveau.                                                                                       | Режим ожидания от 5 Вт до 12 Вт.                                                                            |
| **Trenderkennung aktivieren**                    | Erkennt langsame Aufwärts- или Abwärtsentwicklung über Residuen.                                                                        | Heizdauer steigt über mehrere Tage.                                                                         |

### Konfigurationsgrundsätze

1. Начните со стандартного детектора и активируйте его, чтобы получить физический результат при сверхвысоких требованиях.
2. Если вы не активируете детектор, то это не так.
3. Füge Kontextzustände nur hinzu, wenn sie den erwarteten Wert erklären; больше Kontext bedeutet weniger Trainingsdaten pro Kontext.
4. Начните работу со стандартами чувствительности и стандартами. Erhöhe die Toleranz erst, nachdem legitime Fehlalarme beobachtet wurden.
5. Verwende History-Training nur, wenn der ausgewählte Zeitraum den Normalen Betrieb repräsentiert und nicht überwiegend bekannte Fehler- oder Installationsphasen enthält.
6. Eine statistische Anomalie zeigt ein ungewöhnliches Verhalten относительно zu den Lerndaten. Sie beweist weder einen Gerätefehler noch dessen Ursache.

### Einrichtung mit einem KI-Assistenten

Ein KI-Assistent может дать README и определить Anwendungsfalls eine erste Konfiguration vorschlagen. Когда вы выполняете физические упражнения, обновляете обновления, соответствующие ioBroker-Kontextzustände, вы можете использовать различные варианты или длинные постоянные фазы нормального состояния, для Tages- или Wochenmuster Bestehen, или для дополнительных пегельвершихбунгов или легких. Актуальные тенденции и исторические данные.

KI-generierte Einstellungen sind nur ein Ausgangspunkt und müssen mit dem tatsächlichen Geräteverhalten abgeglichen werden. Адаптер сам по себе детерминирован и безопасен.

Пример подсказки:

> Ich möchte den elektrischen Leistungsverbrauch einer Pumpe überwachen. Der Ein-/Aus-Zustand und die Betriebsart der Pumpe, а также zusätzliche ioBroker-Zustände verfügbar. Запуск и остановка должны быть выполнены в обычном режиме. Eine dauerhafte Abweichung von der üblichen Betriebsleistung были актуальны. Für die letzten 30 Tage Liegt History в InfluxDB vor. Откройте README, пройдите инструкции по обнаружению аномалий и проверьте их правильность.

### Auswahlhilfe für Detektoren

- **MAD/Wertabweichungen:** Für unerwartete Einzelwerte relativ zum gelernten Normalverhalten.
- **Änderungsrate:** Wenn ungewöhnlich schnelle Änderungen соответствующий синд; деактивирован, если шнелле Änderungen является нормальным.
- **Фестиваль:** Для датчиков, если вы хотите, чтобы они были в порядке; nicht für Werte, die lange legitim konstant bleiben.
- **Контекст:** Wenn ein anderer Zustand das erwartete Verhalten erklärt. Boolesche/Enum-Kontexte beschreiben Betriebsart или Anwesenheit, numerische Kontexte zum Beispiel Außenttemperatur, Ladezustand или Last.
- **Pegelverschiebung:** Für dauerhafte Änderungen des Normalen Betriebsniveaus.
- **Тенденция:** Für langsame Drift или Verschlechterung; bei stark schwankenden Signalen meist deaktiviert lassen.

### Praxisbeispiel: Pumpenleistung

Для электрического Leistung einer Pumpe Sind Zunächst **Detektor für Wertabweichungen** , **kontextbezogene Erkennung** und **dauerhafte Erkennung von Pegelverschiebungen** sinnvoll. **Детектор для аварийных ситуаций** , **Детектор для праздников, которые могут быть** отключены и **отключены** , при нормальном запуске/остановке пусковых и пусковых операций, а также в случае необходимости, чтобы насос был законным. `0 W` stehen kann.

Als Kontext eignen sich der Ein-/Aus-Zustand und die Betriebsart. Таким образом, вы получаете нормальную модель для лучших насосов AUS, насос EIN в обычном режиме и насос EIN в режиме Boost. Weitere Zustände nur hinzufügen, wenn sie die erwartete Leistung nachweislich erklären; zu viele Kontextzustände vereilen die Samples auf zu viele Kombinationen.

## Дополнительные курсы по истории

Für eine Quelle **Vorhandene History importieren** auswählen und danach eine **History-Quelle** aus der Auswahlliste wählen. В списке, включенном в список, активируется поставщик истории `influxdb.0`, `history.0` Одер `sql.1`, die für genau diesen Zustand aktiviert sind. Если вы хотите, чтобы ваша история была совместима с псевдонимом или была активна; **Nur Live-Werte lernen** bleibt trotzdem verfügbar.

Standardmäßig werden 30 Tage und höchstens 1.000 импортных образцов. Ungültige Werte und Zeitstempel werden verworfen, doppelte Zeitstempel zusammengeführt und übergroße Ergebnismengen gleichmäßig über den Gesamten Zeitraum verteilt. Offensichtliche historische Extremwerte werden vor dem Lernen прочный ausgeschlossen. Große Zeitlücken erzeugen niemals eine Festhängend-Anomalie.

Ein importiertes Modell wird nach einem Neustart wiederverwendet. Eine Änderung von History-Quelle, Zeitraum или Sample-Limit startet einen neuen Import. Bei fehlgeschlagenem oder zu kleinem Import bleibt die Quelle nutzbar und lernt live weiter. Убер `sources.<sanitized-source-id>.retrain = true` найти аномальную модель, которая будет работать и тренироваться; Ein vollständiges Predictive-Modell bleibt dabei erhalten und wird nur bei erforderlichem History-Bootstrap neu aufgebaut. Адаптер установлен на место установки с помощью адаптера `ack=true` ауф `false` обратный отсчет.

## Erzeugte Objekte

Для того, чтобы выбрать адаптер для частого использования, определите идентификатор объекта:

`anomaly-detection.0.sources.<sanitized-source-id>.analysis`

| Состояние             | Тип/Ролл                         | Bedeutung                                                                                                                         |
| --------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `actual`              | число /`value`                   | zuletzt akzeptierter Quellwert                                                                                                    |
| `expected`            | число /`value`                   | Медианный базовый уровень                                                                                                         |
| `deviation`           | число / `value`                  | `actual - expected`                                                                                                               |
| `score`               | число /`value`                   | нормиртер Аномалия - Оценка 0–100                                                                                                 |
| `detected`            | логическое значение /`indicator` | persistente Anomalieanzeige                                                                                                       |
| `status`              | нить /`info.status`              | `insufficientData`, `learning` Одер `monitoring`                                                                                  |
| `reason`              | нить /`text`                     | детерминированный подход к актуальному регулированию                                                                              |
| `lastAnomaly`         | нить /`date`                     | Zeitpunkt der Letzten Hohen Bewertung                                                                                             |
| `sampleCount`         | число /`value`                   | глобальные образцы, максимум 240                                                                                                  |
| `baselineScope`       | нить /`info.status`              | verwendete Baseline: `context`, `time`, `global` Одер `insufficient`                                                               |
| `activeContext`       | нить /`text`                     | активный нормализатор контекста                                                                                                   |
| `baselineSampleCount` | число /`value`                   | Образцы исходных данных                                                                                                           |
| `contextSampleCount`  | число /`value`                   | Образцы в пассивном режиме Kontextmodell                                                                                          |
| `bootstrapStatus`     | нить /`info.status`              | Дополнительный выбор истории-импорта                                                                                              |
| `retrain`             | логическое значение /`button`    | `true` schreiben, um das Anomaliemodell zurückzusetzen und neu zu trainieren; ein vollständiges Predictive Modell bleibt erhalten |

Все адаптеры, используемые в регионе Ergebnis-States verwenden `ack=true`. `retrain` это einzige Befehls-State и wird nach der Verarbeitung zurückgesetzt.

## Прогностический прогноз

Дополнительная функция прогнозирования позволяет получить числовой прогноз, когда вы начинаете локальный прогноз. Прогноз зависит от постоянных тренировок и облачных данных или KI-API. Unterstützt werden Level/Trend-, сезонные и Tageszeitmodelle; Конфигурация модели будет работать при детерминированном бэктестинге.

Die Prognosepunkte behalten ihre echten Zeitstempel und das Modellintervall; der Letzte Punkt wird bei Bei Bedarf auf den eingestellten Horizont begrenzt. Trend und saisonale Phase werden vom letzten Trainingswert bis zur aktuellen Prognosezeit fortgeschrieben, auch zwischen zwei Modellintervallen. Актуальный Live-Wert был отделен от Ist-Marker; Вы можете увидеть серию ежедневных прогнозов, которая будет написана сегодня с вашими предложениями. Итак, bleibt eine Abweichung zwischen Messwert und modellierter Erwartung am Prognoseursprung sichtbar, ohne eine künstliche Rampe zu erzeugen.

Die Prognosekarte zeigt Horizont, ausgewähltes Modell, Modellintervall, Trainingsquelle, Anzahl der Trainingswerte, Letzten Trainingszeitpunkt, Saisonalität und Qualitätsklasse. Die Qualität базируется на абсолютных исторических показателях Фелера (MAE). Die Zustände können `disabled`, `learning`, `ready`, `unreliable` Одер `error` сейн; Вы можете выбрать или отменить прогноз, который будет отображаться на панели статуса.

Прогнозные измерения выполняются для следующих мероприятий: активация, прогнозирование, актуализация интервалов, минимальное и максимальное обучение, проводимое в режиме сезонного обучения (автоматическое или ручное). Начальное обучение может быть выполнено в реальном времени или с использованием совместимого поставщика истории. Настойчивые модели и новые учебные базы для новых стартов; fehlende или несовместимые Trainingsdaten ersetzen ein History-Modell nicht durch ein reines Live-Training.

Die Predictive-Algorithmusversion ist jetzt 8. Modelle älterer Algorithmen werden verworfen und aus der configurierten History-Quelle or neuen Live-Trainingswerten neu aufgebaut. Dadurch werden alte Modellkoeffizienten nicht mit den korrigierten Prognoseformeln интерпретация.

Прогноз-интерполяция заканчивается в Lücken, die sowohl sechs Stunden als auch sechs typische Quellintervalle überschreiten. Обучение будет проходить в тренировочном режиме. Bei zu wenigen Werten wartet es auf weitere Daten und behält ein vorhandenes trainiertes Modell bei. Mehrfachmeldungen desselben Zeitstempels zählen nicht als neue Trainingswerte. Nicht endliche Zwischenergebnisse führen zu einem ausdrücklichen Fehlerstatus ohne Prognosepunkte.

## Einschränkungen und Datenschutz

Eine Anomalie bedeutet, dass ein Wert или Verhalten относительно zu den gelernten Beobachtungen ungewöhnlich ist. Sie beweist weder einen Gerätefehler noch dessen Ursache. Ungeeignete Einstellungen, nicht repräsentative Trainingszeiträume или sich änderndes Anlagenverhalten können Fehlalarme или übersehene Anomalien verursachen.

Verarbeitung und Modellspeicherung erfolgen vollständig local в ioBroker. Кейн Мессверт использует внешний KI-, Analyse- или Cloud-Dienst gesendet.

## Unterstützung

При использовании адаптера убедитесь, что проводка может быть выполнена с дополнительными расходами:

[![Mit PayPal spenden](https://camo.githubusercontent.com/ef8c60305542390406855547e32850909812a73c4abada236de22a6dc88b313f/68747470733a2f2f7777772e70617970616c6f626a656374732e636f6d2f64655f44452f44452f692f62746e2f62746e5f646f6e61746543435f4c472e676966)](https://www.paypal.com/donate/?hosted_button_id=3RJQGSJNRSHUJ)

## Лицензия

Лицензия MIT

Авторские права (c) 2026 Voodoo2man <Voodoo2man@outlook.de>

## Changelog

Das Changelog ist in der [englischen README](/#/adapters/anomaly-detection#changelog) verfügbar.