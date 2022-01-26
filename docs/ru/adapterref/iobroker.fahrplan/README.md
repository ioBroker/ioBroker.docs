---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fahrplan/README.md
title: ioBroker.fahrplan
hash: kTK6yHU2pWIjDYV9j1ZE4GdWcFpfNoNcfgBXZsuoeM8=
---
![Логотип](../../../en/adapterref/iobroker.fahrplan/admin/fahrplan.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.fahrplan.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.fahrplan.svg)
![Количество установок (последнее)](https://iobroker.live/badges/fahrplan-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/fahrplan-stable.svg)
![Статус зависимости](https://img.shields.io/david/gaudes/iobroker.fahrplan.svg)
![НПМ](https://nodei.co/npm/iobroker.fahrplan.png?downloads=true)

# IoBroker.fahrplan
![Тестирование и выпуск](https://github.com/gaudes/ioBroker.fahrplan/workflows/Test%20and%20Release/badge.svg) [![Статус перевода] (https://weblate.iobroker.net/widgets/adapters/-/fahrplan/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## Адаптер Fahrplan для ioBroker
### Deutsch
Адаптер Dieser для работы с мобильным API от HAFAS. HAFAS steht für HaCon Fahrplan-Auskunfts-System und wird von vielen europäischen Verkehrsunternehmen verwendet, unter anderem auch von der Deutschen Bahn.
Der Zugriff auf HAFAS erfolgt hierbei über [HAFAS-Клиент](https://github.com/public-transport/hafas-client).

Der Adapter bietet hierbei drei Funktionen:

#### Fahrplan für Verbindungen (Routen)
Die gewünschten Routen müssen in der Adapterkonfiguration eingerichtet und aktiviert werden.
Über einen konfigurierbaren Intervall ruft der Adapter dann regelmäßig die Verbindungsinformationen ab.
Неизвестно, какие вербиндинги вердены на HTML и дополнительные детали, как на Objekte в ioBroker dargestellt.
Das HTML-Objekt kann einfach in VIS eingebunden werden.

#### Benachrichtigung bei Verspätungen der Routen
Für die konfigurierten Routen kann ein Verspätungsalarm aktiviert werden. Таким образом, kann beispielsweise eine Benachrichtigung через Telegram или Alexa erfolgen, попадает во все другие предложения Verbindung verspätet ist.

#### Abfahrtstafeln für Stationen
Zusätzlich bietet der Adapter eine Abfahrtstafel für konfigurierte Stationen.
Hierbei werden die nächsten drei Abfahrten einer Station abgerufen und als Objekte und HTML dargestellt.

** Dieser Adapter предназначен для Sentry Bibliotheken um automatisch Abstürze und Programmfehler an die Entwickler zu übermitteln. ** Подробная информация и информация о Deaktivierung der Fehlerberichterstattung в [Документация Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting сообщает о JS-Controller 3.0.

### Английский
Этот адаптер для ioBroker использует мобильный API HAFAS. HAFAS - это система управления общественным транспортом, используемая поставщиками общественного транспорта по всей Европе, например Deutsche Bahn.
[HAFAS-Клиент](https://github.com/public-transport/hafas-client) используется для доступа к HAFAS.

Адаптер выполняет три функции:

#### Расписание пересадок (маршрутов)
Желаемые маршруты должны быть настроены и включены в конфигурации адаптера.
Адаптер автоматически получает информацию о соединении с заданным интервалом.
Следующие три соединения сохраняются в ioBroker как HTML и, по желанию, как подробные объекты.
HTML-объект можно легко использовать в VIS.

#### Уведомление о задержках на маршрутах
Уведомление о задержке может быть активировано для настроенных маршрутов. Например, Telegram или Alexa может получать уведомление, когда все или одно конкретное соединение задерживается.

#### Расписание отправления по станциям
Кроме того, адаптер предоставляет расписание отправлений для настроенных станций.
Здесь следующие три соединения обнаруживаются и создаются как объекты и HTML.

** Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. ** Дополнительные сведения и информацию о том, как отключить отчет об ошибках, см. В [Документация Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сторожевые отчеты используются начиная с js-controller 3.0.

## Конфигурация
### Deutsch
Die Start- und Zielorte sowie Zwischenziele müssen mit ihrer numerischen ID angegeben werden.
Eine suchfunktion ist im Tab Einstellungen integriert.

#### Tab Einstellungen
![](../../../en/adapterref/iobroker.fahrplan/docs/de/img/settings.png)

| Einstellung | Beschreibung | --------------------------------- | --- | Анбитер | Auswahl des zu verwendenden Anbieters, aktuell DB und ÖBB | Aktualisierungsintervall | Intervall in dem die Route aktualisiert werden, Ангабе в Минутене | Verspätet markieren ab | Verspätung в Minuten ab der die Verbindung als verspätet markiert wird. Standardmäßig werden nur Verspätungen ab zwei Minuten markiert | Farbe für Pünktlich | Farbwert für bestätigte Pünktlichkeit | Farbe für Verspätungen | Farbwert für Verspätungen | Überschriftenerstellung | HTML-таблица werden mit Überschriften erzeugt | HTML-Ansicht erzeugen für Route | Erzeugt pro Route eine konfigurierbare HTML-tabelle in einem Objekt | HTML-Ansicht erzeugen pro Verbindung | Erzeugt pro einzelner Verbindung eine HTML-Tabelle in einem Objekt | Детальерте особые объекты | Konfiguration der auszugebenden Objekte | JSON-Elemente speichern | Die Rückgabe von HAFAS erfolgt als JSON, diese sollten zur Fehlerbehebung gespeichert werden

Auf der rechten Seite ist die suchfunktion integriert. Zuerst muss ein Anbieter ausgewählt werden.
Данах канн über das Сучфельд и Drücken des Knopfs "Suche" nach einer Station gesucht werden.
Die Suchergebnisse der aktuellen Suche werden in der Tabelle angezeigt.

#### Вкладка Routen
![](../../../en/adapterref/iobroker.fahrplan/docs/de/img/settings_routes.png)

Mit dem + -Button können neue Einträge zur Tabelle hinzugefügt werden.

| Einstellung | Beschreibung | ----------------------------- | --- | № | Die Nummer entspricht dem Unterknoten in den Objekten und wird automatisch vergeben.
| Актив | Wenn die Route aktiviert ist werden die Verbindungsinfos aktualisiert | Фон | Numerische ID от Startbahnhof или Starthaltestelle (Ermittlung über Suche) | Фон (имя Эйгенера) | Benutzerdefinierter Name von Startbahnhof или Starthaltestelle, für HTML- и Verspätungstext verwendet | Нач | Numerische ID von Zielbahnhof oder Zielhaltestelle (Ermittlung über Suche) | Нах (имя Айгенер) | Benutzerdefinierter Name von Zielbahnhof oder Zielhaltestelle, für HTML- и Verspätungstext verwendet | Через | Fahrt über bestimmten Ort angegeben als numerische ID (необязательно, sonst leer) | Verkehrsmittel | Auswahl des Verkehrsmittels, z.B. Автобус, S-Bahn, usw. Standardmäßig werden all Verkehrsmittel ausgewählt | Максимум. Umstiege | Maximale Anzahl an Umstiegen. 0 für nur direkte Verbindungen.
| Абфахртен | Анзал абзуруфендер Фартен | Fahrradmitnahme | Nur Verbindungen mit Fahrradmitnahme auswählen | Zeit-Offset | Abfahrtszeit: 0 = Jetzt, sonst n Minuten = Jetzt плюс n Minuten

#### Вкладка Verspätungsalarm
![](../../../en/adapterref/iobroker.fahrplan/docs/de/img/settings_delaynotification.png)

Mit dem + -Button können neue Einträge zur Tabelle hinzugefügt werden.

| Einstellung | Beschreibung | ----------------------------- | --- | № | Die Nummer entspricht dem Unterknoten in den Objekten und wird automatisch vergeben.
| Актив | Wenn der Verspätungsalarm aktiviert ist wird dieser geprüft | Маршрут | Route auf die sich der Alarm beziehen soll | Geplante Abfahrt | Geplante Abfahrtszeit der zu prüfenden Route (Leer = Alle Verbindungen) | Wochentag | Wochentage an denen die Prüfung erfolgen soll | Benachrichtigung в Минутене | Anzahl der Minuten vor der Abfahrt, in denen benachrichtigt werden soll | Objekt für Ausgabetext | Angabe eines vorhandenen Objekts

Hinweis zum Ausgabetext: Hier kann neben einfachen Objekten für VIS z.B. auch das "Speak" -Objekt des Alexa-Adapters или das "reponse" -Objekt des Telegram-Adapters verwendet werden.

#### Tab Abfahrtstafeln
![](../../../en/adapterref/iobroker.fahrplan/docs/de/img/settings_departuretimetables.png)

Mit dem + -Button können neue Einträge zur Tabelle hinzugefügt werden.

| Einstellung | Beschreibung | ----------------------------- | --- | № | Die Nummer entspricht dem Unterknoten in den Objekten und wird automatisch vergeben.
| Актив | Венн дер Эйнтраг активный активист вирд dieser abgerufen | Фон | Numerische ID от Startbahnhof или Starthaltestelle (Ermittlung über Suche) | Фон (имя Эйгенера) | Benutzerdefinierter Name von Startbahnhof или Starthaltestelle, für HTML-Ausgabe verwendet | Абфахртен | Anzahl abzurufender Abfahrten | Verkehrsmittel | Auswahl des Verkehrsmittels, z.B. Автобус, S-Bahn, usw. Standardmäßig werden all Verkehrsmittel ausgewählt | Zeit-Offset | Abfahrtszeit: 0 = Jetzt, sonst n Minuten = Jetzt плюс n Minuten

### Английский
Начало, пункт назначения и остановки должны быть обозначены числовым идентификатором.
Функция поиска по этим идентификаторам интегрирована в настройках вкладок.

#### Настройки вкладки
![](../../../en/adapterref/iobroker.fahrplan/docs/en/img/settings.png)

| Настройка | Описание | ----------------------------- | --- | Провайдер | Выбор поставщика общественного транспорта, в настоящее время DB и ÖBB | Интервал обновления | Интервал обновления маршрутов в минутах | Отметка задерживается после задержки в | Определить минуты после того, как задержка должна быть помечена как задержка, по умолчанию задержка отмечается, когда задержка превышает одну минуту | Цвет на время | Цвет подтвержден вовремя | Цвет задержек | Цвет задержек | Создание заголовков для HTML-таблиц | Создавайте заголовки для HTML-таблиц | Создать HTML-представление для маршрута | Создает для каждого маршрута настраиваемую таблицу HTML в объекте | Создавать HTML-представление для каждого путешествия | Создает для каждого путешествия таблицу HTML в объекте | Сохранить подробные объекты | Конфигурация объектов вывода | Сохранить элементы JSON | Возврат из HAFAS - это JSON, следует сохранить для устранения неполадок.

#### Вкладка "Маршруты"
![](../../../en/adapterref/iobroker.fahrplan/docs/en/img/settings_routes.png)

С помощью + -Button новые записи могут быть добавлены в таблицу.

| Настройка | Описание | ----------------------------- | --- | № | Номер соответствует подузлу в объектах и присваивается автоматически | Activ | Информация о подключении обновляется, когда активен маршрут | От | Числовой идентификатор начальной станции или начальной остановки | От (Пользовательское имя) | Пользовательское имя для начальной станции или начальной остановки, используется в выводе HTML-уведомлений и уведомлений о задержках | К | Числовой идентификатор станции назначения или остановки назначения | От (Пользовательское имя) | Пользовательское имя для станции назначения или остановки назначения, используемое в выводе HTML-уведомлений и уведомлений о задержке | Через | Проехать через специальную станцию в виде числового идентификатора (необязательно, по умолчанию пусто) | Автомобиль | Выбор автомобиля, например Автобус, S-Bahn и т. Д. По умолчанию выбраны все автомобили | Максимум. трансферы | Максимальное количество пересадок по маршруту, 0 только для прямых пересадок | Отправления | Количество отправлений для приема | Bycicle | Выбирать только те соединения, где разрешены байки | Смещение времени | Время отправления: 0 = сейчас, в противном случае n минут = сейчас плюс n минут

#### Тревога задержки табуляции
![](../../../en/adapterref/iobroker.fahrplan/docs/en/img/settings_delaynotification.png)

С помощью + -Button новые записи могут быть добавлены в таблицу.

| Einstellung | Beschreibung | ----------------------------- | --- | № | Номер соответствует подузлу в объектах и присваивается автоматически | Activ | Активирована проверка задержки сигнала тревоги | Маршрут | Маршрут относительно этого сигнала задержки | Планируемый отъезд | Планируемое отправление соединения для проверки (Пусто = Все маршруты) | Будние дни | Будни, когда нужно проверять соединение | Уведомление за считанные минуты | Минуты до отправления при активном сигнале задержки | Объект для вывода текста | Состояние ioBroker для вывода текста

Подсказка для «Объект для вывода текста»: могут использоваться простые состояния для использования в VIS, но также «говорить» -состояние адаптера Alexa или «ответное» -состояние адаптера Telegram.

#### Вкладка "Расписание отправлений"
![](../../../en/adapterref/iobroker.fahrplan/docs/en/img/settings_departuretimetables.png)

С помощью + -Button новые записи могут быть добавлены в таблицу.

| Настройка | Описание | ----------------------------- | --- | № | Номер соответствует подузлу в объектах и присваивается автоматически | Activ | Информация о подключении обновляется, когда элемент активен | От | Числовой идентификатор начальной станции или начальной остановки | От (Пользовательское имя) | Пользовательское имя для начальной станции или начальной остановки, используется в выводе HTML-уведомлений и уведомлений о задержках | Отправления | Количество отправлений для приема | Автомобиль | Выбор автомобиля, например Автобус, S-Bahn и т. Д. По умолчанию выбраны все автомобили | Смещение времени | Время отправления: 0 = сейчас, в противном случае n минут = сейчас плюс n минут

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### 1.2.0 (2021-09-19)
* (Gaudes) Remove support for SBB, not using HAFAS anymore
* (Gaudes) Fix Hafas error "Bad Gateway" with code 502 (Sentry #26)
* (Gaudes) Fix unkown station in route (Sentry #7)
* (Gaudes) Remove support for Node 10
* (Gaudes) Update to newest Adapter creator for internal dependencies
* (Gaudes) Include Dependabot updates

### 1.1.1 (2021-06-22)
* (Gaudes) Advanced error reporting for HAFAS errors
* (Gaudes) Include Dependabot updates

### 1.1.0 (2021-06-04)
* (Gaudes) Time offset for routes and departure tables (Git #88)
* (Gaudes) Check if unloaded before writing/deleting objects (Sentry #7)
* (Gaudes) Include Dependabot updates

### 1.0.7 (2021-04-06)
* (Gaudes) Update HAFAS client to 5.15.2 (Fix error 'invalid json response body' with OEBB profile)
* (Gaudes) Configurable colors for delays and on time
* (Gaudes) Prepare for WebLate translations
* (Gaudes) Include Dependabot updates

### 1.0.6 (2021-03-16)
* (Gaudes) Fix route selection in delay config
* (Gaudes) Fix SBB product suburban-train (Sentry #21)
* (Gaudes) Include Dependabot updates

## License
MIT License

Copyright (c) 2021 Ralf Gaudes <ralf@gaudes.net>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.