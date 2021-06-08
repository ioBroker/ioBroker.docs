---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.slideshow/README.md
title: ioBroker.slideshow
hash: 8/D05kkVGAGGdx8R2raAPYz/Nnw278Ps6uxt/JycIvw=
---
![Логотип](../../../en/adapterref/iobroker.slideshow/admin/slideshow.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.slideshow.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.slideshow.svg)
![Количество установок (последнее)](https://iobroker.live/badges/slideshow-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/slideshow-stable.svg)
![Статус зависимости](https://img.shields.io/david/gaudes/iobroker.slideshow.svg)
![НПМ](https://nodei.co/npm/iobroker.slideshow.png?downloads=true)

# IoBroker.slideshow
![Тестирование и выпуск](https://github.com/gaudes/ioBroker.slideshow/workflows/Test%20and%20Release/badge.svg) [![Статус перевода] (https://weblate.iobroker.net/widgets/adapters/-/slideshow/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

[Deutsche Beschreibung](#deutsch)

[Английское описание](#english)

![Демо](../../../en/adapterref/iobroker.slideshow/docs/img/demo.gif)

##<a name="deutsch"></a> Адаптер Diashow для ioBroker
Dieser Adapter für ioBroker stellt eine Diashow quasi als Bildschirmschoner für VIS zur Verfügung.

Folgende Quellen stehen aktuell zur Verfügung:

* Die letzten acht täglichen Фотографии на Bing.com
* Через VIS-Dateimanager hochgeladene Bilder
* Изображения на основе Pfad im Dateisystem
* Фотографии Synology PhotoStation

Zur Darstellung в VIS stellt der Adapter ein Widget zur Verfügung.
Dieses bietet auch Funktionen für Effekt beim Bildwechsel, beispielsweise sanftes Ein- und Ausblenden.
Zusätzlich kann ein Timeout eingestellt werden. Sofern auf anderen View im Projekt keine Aktion für das eingestellte Timeout erfolgt ist, wird zur View mit der Diashow gewechselt. Durck Klicken des Bilds wird entweder zurück zur letzten Ansicht oder zu eingestellten Ansicht gewechselt.

Neben dem Bild selbst als Pfad oder Base64-kodiertes Objekt werden weitere Objekte mit Informationen zum Bild in ioBroker erstellt.
Diese sind abhängig von der ausgewählten Quelle:

| Объект | Bing | Lokal und Dateisystem | Synology | ----------- | ----------- | ----------- | ----------- | info1 | Название | Название (EXIF-информация) | Название | info2 | Beschreibung | Betreff (EXIF-информация) | Beschreibung | info3 | Информация об авторских правах | Комментарий (EXIF-информация) | Dateiname | дата | Datum der Anzeige auf Bing-Seite | Ауфнахмедатум (EXIF-информация) | Aufnahmedatum

Der Button "updatepicturelist" как Objekt в ioBroker liet die Bilder aus den konfigurierten Quellen neu ein, z.B. nach Hinzufügen oder Löschen von Bildern. Die Bilder aus allen Quellen mit Ausnahme Bing werden sonst nur beim Start des Adapters eingelesen. Bing-Bilder werden stündlich automatisch aktualisiert.

** Dieser Adapter предназначен для Sentry Bibliotheken um automatisch Abstürze und Programmfehler an die Entwickler zu übermitteln. ** Подробная информация и информация о Deaktivierung der Fehlerberichterstattung в [Документация Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting сообщает о версии JS-Controller 3.0.

### Конфигурация
In den Einstellungen des Adapters wird die Quelle der Bilder ausgewählt, außerdem das Intervall für den Wechsel der Bilder, beispielsweise 10 Sekunden.
Außerdem kann eingestellt werden, wie of die Liste der Bilder aktualisiert werden soll. Die Einstellung erfolgt in Stunden, bei 0 ist die automatische Aktualisierung deaktiviert.

Bei Auswahl der Quelle "Dateisystem" kann dann noch der Pfad im Dateisystem ausgewählt werden, außerdem das Format (Hoch- oder Querformat) der anzuzeigenden Bilder sowie die Reihenfolge.

Bei Auswahl der Quelle "Synology PhotoStation" должен иметь IP-адрес или имя хоста sowie Benutzername und Passwort angegeben werden. Скачать фон Bildern из Benutzer Muss in den Einstellungen von PhotoStation aktiviert sein.

### VIS-Widget
Das Widget представляет собой увлекательную категорию «слайд-шоу».

Das Widget Sollte в собственном представлении View interiert werden. Hierdurch lässt sich der automatische Start der Diashow nutzen.

Folgende Einstellungen sind möglich:

* Abschnitt "Allgemein"
* Идентификатор объекта: Hier muss der vom Adapter erzeugte Datenpunkt ausgewählt werden, beispielsweise "slideshow.0.picture"
* Widget mit Bild füllen
* True (стандартный) = Bild füllt das Widget, der Bildrand ist möglicherweise abgeschnitten
* False = Das vollständige Bild wird angezeigt, das Widget kann jedoch leere Zonen haben
* Abschnitt "Эффект"
* Эффект слайд-шоу: Als Effekt kann zwischen folgenden gewählt werden:
* «Кейн»
* "Fade": Einfaches Verblassen und Erscheinen
* «Переход»: Überblenden
* "jQuery-Effekt": разнообразные jQuery-Effekte, beispielsweise Rolladen
* Übergangsphase: Zeit in Millisekunden für den Effekt, gute Werte sind 500 или 1000 мс
* Стиль перехода: Стиль для "Transistion" и "jQuery-Effekt"
* jQuery-Effekt: Gewünschter jQuery-Effekt
* Abschnitt "Automatischer Diashow-Start"
* Aktivierung des automatischen Starts
* Тайм-аут: Nach welcher Zeit ohne Aktion auf die Diashow-View gewechselt wird
* Зил бейм Кликен:
* Zuletzt verwendete Ansicht
* Konfigurierte Ansicht (siehe nächster Einstellung)
* Кейн, Falls beispielsweise ein eigener Button integriert werden soll
* Zielansicht: Aufzurufende Ansicht beim Verlassen der Diashow

### ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ
** Quelle Dateisystem **

Können Netzlaufwerke eingebunden werden?

Ja, aber nicht direkt durch den Adapter. ioBroker unterstützt mittlerweile sehr viele Betriebssysteme. Der Zugriff und das Verbinden von Netzwerkfreigaben ist je nach Betriebssystem komplett unterschiedlich. Teilweise werden auch weitere Komponenten wie z.B. Samba bei Linux полезен. Das Verbinden des Netzlaufwerks (Mappen bzw. Mount) kann aber direkt über das Betriebssystem durchgeführt werden. Unter Linux erfolgt der Mount in ein angegebenes Verzeichnis, z.B. / мнт / картинки. Dieses Verzeichnis kann dann in der Adapter-Konfiguration verwendet werden.

** Synology **

Können für Synology PhotoStation weitere Einstellungen wie z.B. Auswahl des Albums integriert werden? Kann DSM 7 (Synology Photos) unterstützt werden?

Synology PhotoStation wird mit DSM 6 enden. Der Nachfolger, Synology Photos, erscheint mit DSM 7. DSM 7 ist aktuell noch Beta, die final Version wird vermutlich Sommer 2021 erscheinen. Vermutlich ändert sich auch die Entwickler-Schnittstelle. Daher investiere ich keinen Aufwand mehr in die bisherige Version. Sobald DSM 7 offiziell erscheint werden ich die Integration prüfen. Leider gab es für die bisherige Version keine offizielle Dokumentation von Synology.
Der Zugriff auf bestimmte Fotoalben bzw. Ordner kann jedoch in der aktuellen Version von PhotoStation einfach realisiert werden. Hierzu unter DSM einen Benutzer für Slideshow anlegen und diesem Benutzer in der PhotoStation nur Berechtigungen auf die gewünschten Fotoalben bzw. Ordner geben.

##<a name="english"></a> Адаптер слайд-шоу для ioBroker
Этот адаптер для ioBroker предоставляет слайд-шоу для VIS, как заставку.

Фактически можно использовать следующие источники:

* Последние восемь ежедневных изображений с Bing.com
* Изображения загружены VIS-File-Manager
* Картинки из пути к файловой системе
* Изображения с Synology PhotoStation

Адаптер предоставляет виджет для презентации в VIS, который предлагает эффекты при изменении изображения, например плавное затухание и затухание.
Дополнительно можно настроить тайм-аут. Если в других представлениях того же проекта VIS не произошло никаких действий в течение заданного времени ожидания, будет запущено представление со слайд-шоу. Щелчком по изображению происходит возврат к последнему виду или к предопределенному виду.

Помимо изображения в виде пути или объекта в кодировке Base64 есть еще объекты с информацией об изображении, созданные в ioBroker.
Это зависит от выбранного источника:

| Объект | Bing | Локальная и файловая система | Synology | ----------- | ----------- | ----------- | ----------- | info1 | Название | Название (информация EXIF) | Название | info2 | Описание | Тема (информация EXIF) | Описание | info3 | Авторские права | Комментарий (информация EXIF) | Dateiname | дата | Дата, указанная на странице Bing | Дата записи (информация EXIF) | Дата записи

Кнопка «updatepicturelist» как объект в ioBroker перечитывает изображения из настроенного источника, что полезно, например, после добавления или удаления изображений из источника. Изображения из всех источников, кроме Bing, обычно загружаются при запуске адаптера. Картинки Bing автоматически обновляются ежечасно.

** Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. ** Дополнительные сведения и информацию о том, как отключить отчет об ошибках, см. В [Документация Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сторожевые отчеты используются начиная с js-controller 3.0.

### Конфигурация
В настройках адаптера можно выбрать источник изображения. Хотя интервал для картинки менялся.
Также можно настроить частоту обновления списка изображений. Настройка производится в часах, 0 отключает автоматическое обновление.

Когда выбран источник «Файловая система», можно ввести путь и формат (альбомный или портретный) отображаемых изображений. Также порядок можно настроить.

Когда выбран источник «Synology PhotoStation», необходимо настроить IP-адрес или имя хоста и имя пользователя с паролем. Скачивание изображений должно быть разрешено в настройках PhotoStation.

Внимание: после внесения изменений (добавления или удаления) потребуется перезапуск адаптера.

### VIS-Widget
Виджет находится в категории «слайд-шоу».

Виджет должен быть интегрирован в собственное представление, чтобы можно было использовать автоматический запуск слайд-шоу.

Существуют следующие варианты конфигурации:

* Категория «Обычные»
* Object-ID: должен быть предоставлен объект ioBroker, созданный адаптером, например "slideshow.0.picture"
* Заполните виджет картинкой
* True (по умолчанию) = изображение заполняет виджет, граница изображения может быть обрезана
* False = Изображение отображается полностью, но в виджете могут быть пустые зоны
* Категория «Эффект»
* Эффект слайд-шоу: доступны следующие параметры:
* "Никто"
* "Fade": простое постепенное исчезновение и появление.
* «Переход»: плавное усиление
* «jQuery-Effekt»: различные эффекты jQuery, например «слепой».
* Переходный период: время действия эффекта в миллисекундах, рекомендуемые значения - 500 или 1000.
* Стиль перехода: стиль для "Transistion" и "jQuery-Effect"
* jQuery-Effect: желаемый эффект
* Категория «Автоматический запуск слайд-шоу»
* Включить автоматический запуск
* Тайм-аут: по истечении которого в секундах бездействия в других представлениях будет запущено слайд-шоу.
* Таргетинг на клик:
* Последний использованный просмотр
* Настроенный вид (см. Следующую настройку)
* Нет, например, при интеграции другого виджета, поэтому
* Целевой вид: вид, отображаемый при выходе из слайд-шоу

### ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ
** Исходная файловая система **

Можно ли интегрировать сетевые диски?

Да, но не напрямую через адаптер. ioBroker теперь поддерживает большое количество операционных систем. Доступ к общим сетевым ресурсам и подключение к ним полностью различаются в зависимости от операционной системы. В некоторых случаях также требуются дополнительные компоненты, такие как Samba для Linux. Подключение сетевого диска (сопоставление или монтирование) может быть выполнено непосредственно операционной системой. В Linux монтирование происходит в указанном каталоге, например. / мнт / картинки. Затем этот каталог можно использовать в конфигурации адаптера.

** Источник Synology **

Можно ли интегрировать в Synology PhotoStation дополнительные настройки, такие как выбор альбома? Может ли поддерживаться DSM 7 (Synology Photos)?

Synology PhotoStation прекратит выпуск DSM 6. Преемник, Synology Photos, появится в DSM 7. DSM 7 в настоящее время все еще находится в стадии бета-тестирования, окончательная версия, вероятно, появится летом 2021 года. Предположительно, интерфейс разработчика также изменится. Так что я не буду прилагать больше усилий к предыдущей версии. Как только DSM 7 выйдет официально, проверю интеграцию. К сожалению, официальной документации Synology для предыдущей версии не было.
Однако доступ к определенным фотоальбомам или папкам можно легко реализовать в текущей версии PhotoStation. Для этого создайте пользователя для слайд-шоу в DSM и предоставьте ему права доступа только к нужным фотоальбомам или папкам на PhotoStation.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### 0.1.4 (2021-04-18)
* (Gaudes) Configurable order for Filesystem (Git #37)
* (Gaudes) Configurable picture list update every n hours (Git #41)
* (Gaudes) Fix toggleClass for effect Transition (Git #42)
* (Gaudes) Configurable picture filling in widget (Git #38)
* (Gaudes) Fix for multiple widgets (Git #44)
* (Gaudes) Include Dependabot updates

### 0.1.3 (2021-04-07)
* (Gaudes) Handle Synology picture download error 502 (Sentry #A)
* (Gaudes) Fix update picture list (Git #30)
* (Gaudes) Handle passwords with special characters for Synology (Git #12)
* (Gaudes) Fix empty result (Sentry #9)
* (Gaudes) Prepare for WebLate translations
* (Gaudes) Quality fixing (lgtm.com)
* (Gaudes) Include Dependabot updates

### 0.1.2 (2021-03-09)
* (Gaudes) Fix error with breadcrumb on Synology login

### 0.1.1 (2021-03-08)
* (Gaudes) Rename Adapter to slideshow
* (Gaudes) Fix directory access denied (Sentry #4)
* (Gaudes) Error handling for Synology Login (Sentry #3)
* (Gaudes) Fix empty result (Sentry #2)
* (Gaudes) Fix file-not-found (Sentry #1)
* (Gaudes) Include Dependabot updates

### 0.1.0 (2021-02-26)
* (Gaudes) Prepare for beta tests
* (Gaudes) Include Dependabot updates

### 0.0.5 (2021-02-17)
* (Gaudes) Adaptive width and height in widget depending on orientation
* (Gaudes) Fix format option for Synology
* (Gaudes) Writing extended picture information to objects
* (Gaudes) Button for update picture list
* (Gaudes) Save picture count as object
* (Gaudes) Quality fixing (lgtm.com)
* (Gaudes) Include Sentry error reporting
* (Gaudes) Include Dependabot updates

### 0.0.4 (2021-01-21)
* (Gaudes) Allow PNG-files in Filesystem
* (Gaudes) Fix config problem with formats
* (Gaudes) Handle portrait orientation in widget

### 0.0.3 (2021-01-14)
* (Gaudes) Prepare for alpha tests

### 0.0.2 (2021-01-11)
* (Gaudes) initial release

## License
MIT License

Copyright (c) 2021 Gaudes <ralf@gaudes.net>

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