---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.slideshow/README.md
title: ioBroker.слайд-шоу
hash: 0567hUtbU7xUZRXy7s5faV7yRsbM5uJboFkUTFKLxTQ=
---
![Логотип](../../../en/adapterref/iobroker.slideshow/admin/slideshow.png)

![версия NPM](http://img.shields.io/npm/v/iobroker.slideshow.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.slideshow.svg)
![Количество установок (последние)](https://iobroker.live/badges/slideshow-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/slideshow-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.slideshow.png?downloads=true)

# IoBroker.слайд-шоу
![Тестируйте и выпускайте](https://github.com/gaudes/ioBroker.slideshow/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/slideshow/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

[Deutsche Beschreibung](#deutsch)

[английское описание](#english)

![Демо](../../../en/adapterref/iobroker.slideshow/docs/img/demo.gif)

##<a name="deutsch"></a> Адаптер Diashow для ioBroker
Адаптер Dieser для ioBroker stellt eine Diashow почти как Bildschirmschoner für VIS zur Verfügung.

Folgende Quellen stehen aktuell zur Verfügung:

* Die letzten acht täglichen Bilder von Bing.com
* Через VIS-Dateimanager hochgeladene Bilder
* Bilder aus beliebigem Pfad im Dateisystem
* Фотографии Synology PhotoStation и Synology Photo

Zur Darstellung в VIS Stellt der Adapter ein Widget zur Verfügung.
Dieses bietet auch Funktionen für Effekt beim Bildwechsel, beispielsweise sanftes Ein- und Ausblenden.
Zusätzlich kann ein Timeout eingestellt werden. Sofern auf anderen View im Projekt keine Aktion für das eingestellte Timeout erfolgt ist, wird zur View mit der Diashow gewechselt. Durck Klicken des Bilds wird entweder zurück zur letzten Ansicht oder zu einer eingestellten Ansicht gewechselt.

Neben dem Bild selbst as Pfad oder Base64-kodiertes Objekt werden weitere Objekte mit Informationen zum Bild in ioBroker erstellt.
Diese sind abhängig von der Ausgewählten Quelle:

| Объект | Бинг | Локальная система и система дат | Синология | ----------- | ----------- | ----------- | ----------- | информация1 | Название | Название (EXIF-информация) | Название | информация2 | Информация | Betreff (EXIF-информация) | Информация | информация3 | Информация об авторских правах | Комментарии (EXIF-информация) | Дата | дата | Datum der Anzeige auf Bing-Seite | Aufnahmedatum (EXIF-информация) | Ауфнамедатум

Der Button "updatepicturelist" как объект в ioBroker находится в Bilder aus den configurierten Quellen neu ein, z.B. nach Hinzufügen oder Löschen von Bildern. Die Bilder aus allen Quellen mit Ausnahme Bing werden sonst nur beim Start des Adapters eingelesen. Bing-Bilder werden stündlich Automaticisch aktualisiert.

**Адаптер для Sentry Bibliotheken с автоматическим абстракцией и программным обеспечением и интеграцией для übermitteln.** Weitere Details und für Informationen zur Deaktivierung der Fehlerberichterstattung in der [Sentry-плагин Документация](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting поддерживается JS-контроллером 3.0.

### Конфигурация
In den Einstellungen des Adapters wird die Quelle der Bilder ausgewählt, außerdem das Intervall für den Wechsel der Bilder, beispielsweise 10 Sekunden.
Außerdem kann eingestellt werden, wie часто умирают Liste der Bilder aktualisiert werden soll. Die Einstellung erfolgt in Stunden, bei 0 ist dieAutotische Aktualisierung deaktiviert.

Bei Auswahl der Quelle "Dateisystem" kann dann noch der Pfad im Dateisystem ausgewählt werden, außerdem das Format (Hochoder Querformat) der anzuzeigenden Bilder sowie die Reihenfolge.

Будьте уверены в том, что "Synology PhotoStation" должна иметь DSM-версию, IP-адрес или имя хоста, а также измененное имя пользователя и пароль. Загрузить изображения с изображением изображений в фотоснимках с PhotoStation, которые активны.

### VIS-виджет
Das Widget ist в дер Kategorie "слайд-шоу" волнует.

Das Widget один в один прекрасный вид полностью интегрированы. Hierdurch lässt sich der Automaticische Start der Diashow nutzen.

Folgende Einstellungen sind möglich:

* Абшнит "Allgemein"
* Object-ID: Hier muss der vom Adapter erzeugte Datenpunkt ausgewählt werden, beispielsweise "slideshow.0.picture"
* Виджет с полным изображением
* True (Стандарт) = Bild füllt das Widget, der Bildrand ist möglicherweise abgeschnitten
* False = Das vollständige Bild wird angezeigt, das Widget kann jedoch leere Zonen haben
* Абшнит "Эффект"
* SlideshowEffect: Als Effekt kann zwischen folgenden gewählt werden:
* "Кейн"
* "Fade": Einfaches Verblassen und Erscheinen
* «Переход»: Überblenden
* "jQuery-Effekt": Разнообразный jQuery-Effekte, beispielsweise Rolladen
* Übergangsphase: Zeit in Millisekunden für den Effekt, gute Werte sind 500 или 1000 мс
* Стиль перехода: Стиль «Переход» и «Эффект jQuery».
* jQuery-Эффект: Gewünschter jQuery-Эффект
* Abschnitt "Automatischer Diashow-Start"
* Активация автоматических пусков
* Тайм-аут: Nach welcher Zeit ohne Aktion auf die Diashow-View gewechselt wird
* Ziel beim Klicken:
* Zuletzt verwendete Ansicht
* Konfigurierte Ansicht (siehe nächster Einstellung)
* Кейн, падает beispielsweise ein eigener Button integriert werden soll
* Zielansicht: Aufzurufende Ansicht beim Verlassen der Diashow

### ВОПРОСЫ-ОТВЕТЫ
**Quelle Dateisystem**

Können Netzlaufwerke eingebunden werden?

Ja, aber nicht direkt durch den Adapter. ioBroker unterstützt mittlerweile sehr viele Betriebssysteme. Der Zugriff und das Verbinden von Netzwerkfreigaben ist je nach Betriebssystem komplett unterschiedlich. Teilweise werden auch weitere Komponenten wie z.B. Самба в Linux выгодна. Das Verbinden des Netzlaufwerks (Mappen bzw. Mount) kann aber direkt über das Betriebssystem durchgeführt werden. Unter Linux erfolgt der Mount in ein angegebenes Verzeichnis, z.B. /мнт/картинки. Dieses Verzeichnis kann dann in der Adapter-Konfiguration verwendet werden.

**Синология**

Контент для Synology PhotoStation weitere Einstellungen wie z.B. Auswahl des Albums integriert werden?

Der Zugriff auf bestimmte Fotoalben bzw. Заказать kann jedoch in der aktuellen Version от PhotoStation einfach realisiert werden. Hierzu unter DSM einen Benutzer für Slideshow anlegen und diesem Benutzer в дер PhotoStation nur Berechtigungen auf die gewünschten Fotoalben bzw. Заказ гебен.

##<a name="english"></a> Адаптер слайд-шоу для ioBroker
Этот адаптер для ioBroker обеспечивает слайд-шоу для VIS, например заставку.

Фактически могут быть использованы следующие источники:

* Последние восемь ежедневных изображений с Bing.com
* Изображения, загруженные VIS-File-Manager
* Картинки из пути к файловой системе
* Изображения с Synology PhotoStation или Synology Photo

Адаптер предоставляет виджет для презентации в VIS, который предлагает эффекты изменения изображения, например, плавное исчезновение и появление.
Дополнительно можно настроить тайм-аут. Когда в других представлениях того же проекта VIS не происходит никаких действий в течение заданного времени ожидания, будет запущено представление со Слайд-шоу. Щелчком по картинке она возвращается к последнему виду или к предварительно определенному виду.

Помимо изображения в виде пути или объекта, закодированного в Base64, есть еще объекты с информацией об изображении, созданные в ioBroker.
Они зависят от выбранного источника:

| Объект | Бинг | Локальная и файловая система | Синология | ----------- | ----------- | ----------- | ----------- | информация1 | Название | Заголовок (информация EXIF) | Название | информация2 | Описание | Тема (информация EXIF) | Описание | информация3 | Авторское право | Комментарий (информация EXIF) | Дата | дата | Дата отображается на странице Bing | Дата записи (данные EXIF) | Дата записи

Кнопка «updatepicturelist» как объект в ioBroker перечитывает картинки из настроенного источника, полезная, например, после добавления или удаления картинок из источника. Картинки со всех источников, кроме Bing, обычно загружаются при запуске Адаптера. Изображения Bing автоматически обновляются ежечасно.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

### Конфигурация
В настройках адаптера можно выбрать источник изображения. Хотя интервал смены картинки.
Также можно настроить частоту обновления списка изображений. Настройка производится в часах, 0 отключает автоматическое обновление.

Когда выбран источник «Файловая система», можно ввести путь и формат (альбомный или портретный) отображаемых изображений. Также порядок можно настроить.

Если выбран источник «Synology PhotoStation», необходимо настроить версию Synology DSM, IP-адрес или имя хоста и имя пользователя с паролем. Загрузка изображений должна быть включена в настройках PhotoStation.

Внимание: После изменений (Добавление или Удаление) требуется перезагрузка адаптера.

### VIS-виджет
Виджет можно найти в категории «слайд-шоу».

Виджет должен быть интегрирован в собственное представление, чтобы можно было использовать автоматический запуск слайд-шоу.

Существуют следующие параметры конфигурации:

* Категория "Общие"
* Object-ID: Должен быть предоставлен объект ioBroker, созданный адаптером, например "slideshow.0.picture"
* Заполнить виджет картинкой
* True (по умолчанию) = Виджет заполняется изображением, граница изображения может быть обрезана
* False = отображается полное изображение, но виджет может иметь пустые зоны
* Категория "Эффект"
* Эффект слайд-шоу: доступны следующие параметры:
* "Никто"
* «Fade»: простое постепенное исчезновение и постепенное появление
* "Переход": затухание
* "jQuery-Effekt": Различные эффекты jQuery, например "слепой"
* Переходный период: время в миллисекундах для эффекта, рекомендуемые значения 500 или 1000.
* Стиль перехода: стиль для «перехода» и «эффекта jQuery».
* jQuery-эффект: желаемый эффект
* Категория "Автоматический запуск слайд-шоу"
* Включить автоматический запуск
* Тайм-аут: по истечении которого в секундах бездействия в других представлениях будет запущено слайд-шоу.
* Таргетинг по клику:
* Последний использованный вид
* Настроенный вид (см. следующую настройку)
* Нет, например, при интеграции другого виджета, поэтому
* Целевой вид: вид для отображения при выходе из слайд-шоу

### ВОПРОСЫ-ОТВЕТЫ
**Исходная файловая система**

Можно ли интегрировать сетевые диски?

Да, но не напрямую через переходник. ioBroker теперь поддерживает большое количество операционных систем. Доступ к общим сетевым ресурсам и их подключение полностью различаются в зависимости от операционной системы. В некоторых случаях также требуются дополнительные компоненты, такие как Samba для Linux. Подключение сетевого диска (сопоставление или монтирование) может выполняться непосредственно операционной системой. В Linux монтирование происходит в указанный каталог, например. /мнт/картинки. Затем этот каталог можно использовать в конфигурации адаптера.

**Источник Synology**

Можно ли интегрировать в Synology PhotoStation дополнительные настройки, такие как выбор альбома? Поддерживается ли DSM 7 (Synology Photos)?

Synology PhotoStation закончится с DSM 6. Преемник, Synology Photos, появится с DSM 7. DSM 7 в настоящее время все еще находится в стадии бета-тестирования, финальная версия, вероятно, появится летом 2021 года. Предположительно изменится и интерфейс разработчика. Поэтому я больше не буду вкладывать усилия в предыдущую версию. Как только DSM 7 выйдет официально, проверю интеграцию. К сожалению, официальной документации Synology для предыдущей версии не было.
Однако доступ к определенным фотоальбомам или папкам можно легко реализовать в текущей версии PhotoStation. Для этого создайте пользователя для слайд-шоу в DSM и предоставьте этому пользователю разрешения только на нужные фотоальбомы или папки в PhotoStation.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### __WORK IN PROGRESS__
* (Gaudes) Include support for Synology DSM 7
* (Gaudes) Remove support for Node 10
* (Gaudes) Update to newest Adapter creator for internal dependencies
* (Gaudes) Include adapter-dev
* (Gaudes) Include Dependabot updates

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

Copyright (c) 2022 Gaudes <ralf@gaudes.net>

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