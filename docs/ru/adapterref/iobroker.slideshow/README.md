---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.slideshow/README.md
title: ioBroker.слайдшоу
hash: JzFpziqmjAlUpvoVt6P6xVMXV1nenar3ljFNKgEY15M=
---
![Логотип](../../../en/adapterref/iobroker.slideshow/admin/slideshow.png)

![версия НПМ](http://img.shields.io/npm/v/iobroker.slideshow.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.slideshow.svg)
![Количество установок (последнее)](https://iobroker.live/badges/slideshow-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/slideshow-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.slideshow.png?downloads=true)

# IoBroker.слайдшоу
![Тест и выпуск](https://github.com/gaudes/ioBroker.slideshow/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/slideshow/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

[Deutsche Beschreibung](#deutsch)

[Описание на английском языке](#english)

![Демо](../../../en/adapterref/iobroker.slideshow/docs/img/demo.gif)

##<a name="deutsch"></a> Адаптер Diashow для ioBroker
Адаптер для ioBroker может использоваться как Diashow, так и для Bildschirmschoner для VIS для Verfügung.

Folgende Quellen stehen aktuell zur Verfügung:

* Die letzten acht täglichen Bilder von Bing.com
* Через VIS-Dateimanager hochgeladene Bilder
* Изображение из достоверной информации Pfad im Dateisystem
* Фотографии Synology PhotoStation и Synology Photo

Для просмотра в VIS используется адаптер и виджет для настройки.
Dieses bietet auch Funktionen für Effekt beim Bildwechsel, beispielsweise sanftes Ein- und Ausblenden.
Время ожидания может быть изменено. В других случаях просмотр проекта должен выполняться в течение заданного времени ожидания, поэтому вы можете просмотреть его с помощью диалогового окна. Нажмите кнопку «Bilds», чтобы получить возможность получить доступ к информации или получить дополнительную информацию.

Не используйте Bild в качестве Pfad или Base64-kodiertes Objekt weitere Objekte mit Informationen zum Bild в ioBroker.
Diese sind abhängig von der ausgewählten Quelle:

| Объект | Бинг | Местные и датовые системы | Синология | ----------- | ----------- | ----------- | ----------- | информация1 | Название | Название (EXIF-информация) | Название | информация2 | Бесшрайбунг | Бетрефф (EXIF-информация) | Бесшрайбунг | информация3 | Информация об авторских правах | Комментарий (EXIF-информация) | Дата имя | дата | Datum der Anzeige на Bing-Seite | Aufnahmedatum (EXIF-информация) | Ауфнахмедатум

Кнопка «updatepicturelist» также является объектом в ioBroker, который позволяет создавать изображения в новых конфигурациях, z.B. nach Hinzufügen или Löschen von Bildern. Die Bilder aus allen Quellen mit Ausnahme Bing werden sonst nur beim Start des Adapters eingelesen. Bing-Bilder автоматически актуализируется.

**Адаптер позволяет использовать Sentry Bibliotheken в автоматическом режиме и программировать и Entwickler zu übermitteln.** Подробные сведения и информация о деактивации Fehlerberichterstattung в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting работает с JS-Controller 3.0.

### Конфигурация
При установке адаптеров будет установлен интервал в 10 секунд.
Außerdem kann eingestellt werden, wie часто умирает Liste der Bilder actualisiert werden soll. Когда Einstellung erfolgt in Stunden, bei 0 ist die autotische Aktualisierung deaktiviert.

При выборе «Dateisystem» можно, чтобы Pfad в Dateisystem ausgewählt был установлен, ausserdem das Format (Hoch- oder Querformat) der anzuzeigenden Bilder sowie die Reihenfolge.

При выборе «Synology PhotoStation» необходимо указать версию DSM, IP-адрес или имя хоста, имя пользователя и пароль. Загрузите фон Bildern durch Benutzer muss и активируйте его в режиме PhotoStation.

### VIS-Виджет
Этот виджет входит в категорию «слайд-шоу».

Этот виджет будет доступен в вашем собственном режиме просмотра. Hierdurch lässt sich der autotische Start der Diashow nutzen.

Folgende Einstellungen sind möglich:

* Абсчнитт "Allgemein"
	* Идентификатор объекта: Hier muss der vom Adaptor erzeugte Datenpunkt ausgewählt werden, beispielsweise "slideshow.0.picture"
* Виджет с заполненным изображением
		* True (Standard) = Bild füllt das Widget, der Bildrand ist möglicherweise abgeschnitten
		* False = Das vollständige Bild wird angezeigt, das Widget kann jedoch leere Zonen haben
* Абсчент "Эффект"
	* SlideshowEffect: Другие эффекты могут быть изменены:
* "Кейн"
		* «Fade»: Einfaches Verblassen und Erscheinen.
		* «Переход»: Убербленден
		* «Эффект jQuery»: разнообразные эффекты jQuery, дополнительные возможности.
	* Фаза перехода: время в миллисекундах для эффекта, время ожидания составляет 500 или 1000 мс.
	* Стиль перехода: стиль «переход» и «эффект jQuery».
	* jQuery-Effekt: Gewünschter jQuery-Effekt
* Abschnitt "Автоматическое Диашоу-Старт"
	* Активация автоматического запуска
	* Тайм-аут: Nach welcher Zeit ohne Action auf die Diashow-View Gewechselt Wird
* Цели кликов:
		* Zuletzt verwendete Ansicht
		* Настройка конфигурации (siehe nächster Einstellung)
		* Kein, Falls beispielsweise ein eigener Button integriert werden soll
	* Zielansicht: Aufzurufende Ansicht beim Verlassen der Diashow

### ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ
**Quelle Dateisystem**

Können Netzlaufwerke eingebunden werden?

Да, это не лучше, чем адаптер. ioBroker unterstützt mittlerweile sehr viele Betriebssysteme. Der Zugriff und das Verbinden von Netzwerkfreigaben ist je nach Betriebssystem komplett unterschiedlich. Teilweise werden auch weitere KomComponenten wie z.B. Samba для Linux полезна. Das Verbinden des Netzlaufwerks (Mappen bzw. Mount) может быть напрямую подключен к системе Betriebs system во время работы. В Linux используется монтирование в другом месте Verzeichnis, z.B. /мнт/картинки. Эта информация может быть изменена в конфигурации адаптера.

**Синология**

Информация для Synology PhotoStation weitere Einstellungen wie z.B. Целостны ли альбомы?

Der Zugriff auf bestimmte Fotoalben bzw. Вы можете использовать актуальную версию PhotoStation, которая действительно доступна. Hierzu unter DSM einen Benutzer for Slideshow anlegen und diesem Benutzer in der PhotoStation nur Berechtigungen auf die gewünschten Fotoalben bzw. Орднер гебен.

##<a name="english"></a> Адаптер слайд-шоу для ioBroker
Этот адаптер для ioBroker обеспечивает слайд-шоу для VIS, похожее на заставку.

Фактически могут быть использованы следующие источники:

* Последние восемь ежедневных фотографий с Bing.com
* Фотографии загружены с помощью VIS-File-Manager
* Фотографии из пути файловой системы
* Фотографии с Synology PhotoStation или Synology Photo

Адаптер предоставляет виджет для презентации в VIS, который предлагает эффекты для изменения изображения, например, плавное исчезновение и появление.
Кроме того, можно настроить тайм-аут. Если в других представлениях в том же проекте VIS не происходит никаких действий в течение определенного тайм-аута, будет запущено представление со слайд-шоу. При щелчке по изображению оно возвращается к последнему представлению или к предопределенному представлению.

Помимо изображения в виде пути или объекта, закодированного в Base64, в ioBroker созданы дополнительные объекты с информацией об изображении. Они зависят от выбранного источника:

| Объект | Bing | Локальный и файловая система | Synology | ----------- | ----------- | ----------- | ----------- | info1 | Заголовок | Заголовок (информация EXIF) | Заголовок | info2 | Описание | Тема (информация EXIF) | Описание | info3 | Авторские права | Комментарий (информация EXIF) | Dateiname | дата | Дата, отображаемая на странице Bing | Дата записи (информация EXIF) | Дата записи

Кнопка "updatepicturelist" как objekt в ioBroker перечитывает изображения из настроенного источника, полезно, например, после добавления или удаления изображений из источника. Изображения из всех источников, кроме Bing, обычно загружаются при запуске адаптера. Изображения Bing автоматически обновляются ежечасно.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

### Конфигурация
В настройках адаптера можно выбрать источник изображения. Хотя интервал смены изображения.
Также можно настроить, как часто должен обновляться список изображений. Настройка выполняется в часах, 0 отключает автоматическое обновление.

При выборе источника "Файловая система" можно ввести путь и формат (альбомный или портретный) отображаемых изображений. Также можно настроить порядок.

Если выбран источник «Synology PhotoStation», необходимо настроить версию Synology DSM, IP-адрес или имя хоста, а также имя пользователя с паролем.

Внимание: После внесения изменений (добавления или удаления) требуется перезагрузка адаптера.

### VIS-Виджет
Виджет можно найти в категории «слайд-шоу».

Виджет должен быть интегрирован в собственное представление, чтобы можно было использовать автоматический запуск слайд-шоу.

Существуют следующие варианты конфигурации:

* Категория "Общее"
* Object-ID: необходимо указать объект ioBroker, созданный адаптером, например «slideshow.0.picture»
* Заполнить виджет картинкой
* True (по умолчанию) = Картинка заполняет виджет, граница картинки может быть обрезана
* Ложь = Отображается полное изображение, но виджет может иметь пустые зоны
* Категория "Эффект"
* Эффект слайд-шоу: доступны следующие параметры:
		* "Никто"
* "Fade": простое затухание и нарастание звука.
* «Переход»: плавное наложение
* "jQuery-Effekt": Различные эффекты jQuery, например "blind"
* Период перехода: время в миллисекундах для эффекта, рекомендуемые значения — 500 или 1000.
* Стиль перехода: Стиль для «Transistion» и «jQuery-Effect»
* jQuery-Effect: Желаемый эффект
* Категория «Автоматический запуск слайд-шоу»
* Включить автоматический запуск
* Тайм-аут: по истечении указанного времени в секундах бездействия в других представлениях будет запущено слайд-шоу.
* Цель по клику:
* Последний использованный вид
* Настроенный вид (см. следующую настройку)
* Нет, например, при интеграции другого виджета, поэтому
* Целевой вид: Вид, который будет отображаться при выходе из слайд-шоу

### ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ
**Исходная файловая система**

Можно ли интегрировать сетевые диски?

Да, но не напрямую через адаптер. ioBroker теперь поддерживает большое количество операционных систем. Доступ к сетевым ресурсам и их подключение полностью различаются в зависимости от операционной системы. В некоторых случаях также требуются дополнительные компоненты, такие как Samba для Linux. Подключение сетевого диска (отображение или монтирование) может быть выполнено непосредственно операционной системой. В Linux монтирование происходит в указанном каталоге, например, /mnt/pictures. Этот каталог затем можно использовать в конфигурации адаптера.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 0.2.1 (2024-11-18)
* (Gaudes) Update in package.json for VIS

### 0.2.0 (2024-11-13)
* (Gaudes) Include support for Synology DSM 7
* (Gaudes) Add controls for start/stop
* (Gaudes) Remove support for older Node versions
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

Copyright (c) 2024 Gaudes <ralf@gaudes.net>

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