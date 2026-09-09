---
chapters: {"pages":{"en/adapterref/iobroker.weather-warnings/README.md":{"title":{"en":"ioBroker.weather-warnings"},"content":"en/adapterref/iobroker.weather-warnings/README.md"},"en/adapterref/iobroker.weather-warnings/README_DE.md":{"title":{"en":"ioBroker.weather-warnings"},"content":"en/adapterref/iobroker.weather-warnings/README_DE.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.weather-warnings/README_DE.md
title: ioBroker.weather-warnings
hash: BGj8r30EunOisXNV1kUH2UUefjh0lJtCRiIqxL9WvgU=
---
![Логотип](../../../en/adapterref/iobroker.weather-warnings/admin/weather-warnings.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.weather-warnings.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.weather-warnings.svg)
![Количество установок](https://iobroker.live/badges/weather-warnings-installed.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/weather-warnings/287x66-grey.png)
![НПМ](https://nodei.co/npm/iobroker.weather-warnings.png?downloads=true)
![Тестирование и выпуск](https://github.com/ticaki/ioBroker.weather-warnings/actions/workflows/test-and-release.yml/badge.svg?event=push)
![Пожертвование через PayPal](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)

# ioBroker.weather-warnings

## адаптер предупреждений о погоде для ioBroker

Dieser Adaptor ruft Wetterwarnungen verschiedener опционально Dienste ab und gibt diese als Textnachricht или Sprachnachrichten aus. Zusätzlich werden nach Typ gruppierte States bereitgestellt, mit denen man auf aktuelle Warnlagen reagieren kann.

Поставщик услуг:

- ДВД
- ZAMG (Österreich)
- UWZ

## Установка

Мин. Nodejs: v22 При установке и автоматической **перезагрузке** конфигураций. Damit werden die Vorlagen in der Systemsprache angezeigt.

## Конфигурация

![Базовая конфигурация](../../../en/adapterref/iobroker.weather-warnings/img/basic.png)

- **Активация DWD/UWZ/ZAMG:** активация Datenabruf von diesen Dienstleistern

- **телеграмма/пушовер,... активация:** активация Ausgabe von Nachrichten и этот установочный адаптер.

- **Активация электронной почты:** Schreibt alle aktuellen Warnungen in eine Email.

- **Verlauf aktivieren:** schreibt in den State: .history einen Verlauf der bis zu 500 Einträgen beinhalten kann. Alle Daten или ausgewählte.

- **Активация json-array:** если есть специальное сообщение, вы должны указать актуальные предупреждения в массиве или активировать определенные параметры Json в массиве, а скрипты могут быть активированы.

- **Интервал обновления:** Abrufinterval in Minuten zu dem Daten geladen werden. (минимум: 5)

- **Предупреждение —** это максимальное предупреждение и предупреждение, касающееся поставщика услуг.

- **Предупреждения ...:** При запуске адаптера, прежде чем начать работу с адаптером, необходимо предупредить, что оно должно быть отключено и отключено от сети.

- **Тестовое предупреждение активировано! Адаптер отключен от сети:** Es werden mindestens 2 Testmeldungen pro Provider bei einem Datenabruf in das System begeben, mit Zufälligen Stand und Endzeiten

- **Die Speicherung der Rohdatenhistorie wird aktiviert bzw. deaktiviert und gelöscht (hoher Speicherverbrauch).:** Для отладки, nur nach Aufforderung.

- **Интервал проверки, тестовая дата включения и выключения:** Указание функции: Интервал в течение 1 минуты. Im ersten Durchlauf werden 2 neue Warnungen gefunden. Im zweiten wird die Hälfte aufgehoben. Я позволю себе увидеть все это и дать возможность увидеть их.

**Zusätzliche Einstellungen (Эксперт)**

**Spracheinstellungen:**

**Ruhezeiten für die Sprachausgabe:** Stelle hier die Ruhezeiten ein in der keine Sprachausgabe stattfinden soll. Определенно время будет 15:30 или 15 или 15:00. Bitte einen Profilnamen vergeben

**Iconeinstellungen (Альтернативный вариант):** Wenn der Prefix ausgefüllt wird ersetz dieses die Standardicons. Dort wo der Prefix hinführt müssen Dateien mit einem der gelisteten Warntypen und der Endung die in Suffix steeht befinden.

![Предложения](../../../en/adapterref/iobroker.weather-warnings/img/template.png)

Hier kannst du eigenen Vorlagen erstellen, orer vorhandene anpassen. Unterhalb der Tablele stehen alle verfügbare «Tokens» и был sie beeuten. Die eindeutige Kennung(Vorlagenbezeichner) в ден Pushdiensten verwendet, um einzustellen welche Vorlage mit welcher Meldungsart verwendet werden soll.

Zeichen mit besonderer Bedeutung:

- `${}` umfasst Tokens, die durch Generierte Infomationen ersetzt werden. Der Vorlagenbezeichner может быть ebenfalls eingesetzt werden.
- Vorlagenbezeichner die mit`_` начало, werden bei Diensten nicht angeboten, jedoch werden diese в Штатах Geschrieben.
- `${[0,1,2,3,4]token}` Eine Zeichenkette mit Werten, token muß ein Zahlentoken sein. Index ist wie im Beispiel. 0 ist der erste Wert in der Liste
- bei einer Vorlage für Jsons muß das abschließende`}` so geschrieben werden`\}`
- siehe Beispiele im Adapter.
- es ist ebenfalls sowas möglich:`${[0,🟢,🟡,🟠,🔴]warnlevelnumber}`

Пример:

```
Luke, wir haben eine neue Warnung ${Warntypename} ab ${starttime} erhalten, sieht aus wie ein ${_customArray}
```

Das Warntypename wird zB durch`Gewitter` ersetzt.`startime` durch 20:15 und`_customArray` durch das Ergebnis der entsprechenden Vorlage.

**Шаблоны восстановления:** Setzt die Vorlagen auf die aktuelle Systemsprache zurück. Vorhandene Vorlagen gehen **verloren** . Anschließend speichern & schließen. Если вы хотите, чтобы системы были верны, вы можете сказать, что они работают.

**Добавьте шаблоны** , соответствующие стандартным требованиям, и убедитесь, что вы не знаете, что делать.

![ДВД](../../../en/adapterref/iobroker.weather-warnings/img/DWD.png)

**DWD:** Die Auswahl erfolgt nach einer Liste von 10000 Orten, это ошибка, связанная с администратором, это лучший вариант для Ortsnamen schreiben, mehrere Leerzeichen anfügen und dann wieder entfernen. Соберите полный список фильтров.

**UWZ:** Обратите внимание на координаты, если идентификатор адаптера не указан.

**ЗАМГ:** Нур для Австрии. Эйнгабе фон Координатен умирает в Австрии.

**Название места:** benutzerdefinierte Ortsbezeichnung, kann in Warnungen verwendet werden. (Nützlich bei mehreren Warncellen)

**Фильтр:**

- Filter Stunden: Filtert vor jer weiteren Auswertung alles aus das das X Stunden in der Zukunft Liegt.
- Тип: alles mit diesem Type wird verworfen.
- Уровень: alles kleiner dieses Уровни wird verworfen.

![телеграмма](../../../en/adapterref/iobroker.weather-warnings/img/telegram.png) **Адаптер:** если этот адаптер активен, и этот адаптер должен быть использован, чтобы его можно было использовать. Eine Fehlermeldung im Log weißt auf fehlende Einstellungen hin.

**Активировать...:** Versende Warnungen von diesem Anbieter mit diesem Dienst.

**Фильтр:**

1. Ignoriere Warnungen mit diesem Type
2. Ignoriere Warnungen mit einem gleichen или geringeren Level

**Сообщения:** verwende folgende Vorlagen für:

1. Новые предупреждения или лучшие предупреждения
2. Предупреждение о том, что это означает, **что** вы находитесь в активном режиме.
3. **Внимание** ! Wird keine Vorlagen ausgewählt, wird nicht versendet.

**Мануэль**

1. Auswahl einer Vorlage die für bestehende Warnungen verwendet werden soll
2. Auswahl einer Vorlage die für keine Warnung verwendet werden soll

Wird keine Vorlagen ausgewählt, wird nicht versendet.

Предложение для 3) использования токенов ${} означает, что вы можете получить больше предупреждений в ближайшем будущем.

**Особые функции**

**электронная почта:** Заголовок сообщения для почты, а также адрес электронной почты: 1,2 или 3 + Zeilenumbruch und anschließend Footer.(weitere Funktionen in Arbeit)

**alexa:** Zusätzlich muß hier noch ein/mehrere Geräte ausgewählt werden. Die Lautstärke wird nur für die Sprachnachrichten verändert und sollte anschließend wieder zurück gesetzt werden. Nachrichtengröße pro Warnung — это максимум 250 Цейхен.

\###Точки данных:

**предупреждение** : Enthält die Rohdaten die vom Provider geliefert werden, nur der Stundenfilter Hat einfluß hierauf **formattedKeys** : Enthält die in Vorlagen verwendbaren Tokens und deren aktueller Wert. **оповещения** : Die Benachrichtigungsdatenpunkte siehe unten **команда** : Datenpunkte mit denen etwas ausgelöst oder eingestellt werden kann.

## Общее поведение

- Не следует отправлять дублирующие сообщения для одной и той же цели. DWD очень щепетильно относится к этому вопросу.
- Если`none` Если выбран шаблон, уведомления по нему не отправляются.
- Штаты под`.alerts` Enthalten nach Warntypen guppierte Felder for Start, Ende, Warntyp, **jetzt** aktiv und Schlagzeile. Предупреждение о фильтровании группы 1 по следующим критериям:
  1. Предупреждение **активируется** , если уровень сигнала повышен.

## Иконки

Автор: [Адри Ансях](https://www.youtube.com/channel/UChLOv1L-ftAFc2ZizdEAKgw?view_as=subscriber)

Лицензия: [CC BY 4.0 ПРАВОВОЙ КОДЕКС](https://creativecommons.org/licenses/by/4.0/legalcode)

Страница с иконкой: <https://icon-icons.com/de/symbol/Wetter-wind-cloud-Blitz-Regen/189105>