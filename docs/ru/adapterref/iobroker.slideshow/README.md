---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.slideshow/README.md
title: ioBroker.slideshow
hash: 0f8OQHz1/M6kLskrRLXUT4saaSNfUIr3tOZadDwKpAg=
---
![Логотип](../../../en/adapterref/iobroker.slideshow/admin/slideshow.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.slideshow.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.slideshow.svg)
![Количество установок (последние)](https://iobroker.live/badges/slideshow-installed.svg)
![Количество установок (стабильных)](https://iobroker.live/badges/slideshow-stable.svg)
![Тестирование и выпуск](https://github.com/gaudes/ioBroker.slideshow/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/slideshow/svg-badge.svg)
![НПМ](https://nodei.co/npm/iobroker.slideshow.png?downloads=true)

# ioBroker.slideshow

[Deutsche Beschreibung](#deutsch)

[Описание на английском языке](#english)

![Демо](../../../en/adapterref/iobroker.slideshow/docs/img/demo.gif)

## <a name="deutsch"></a> Diashow Adapter für ioBroker

Адаптер для ioBroker может использоваться как Diashow, так и для Bildschirmschoner для VIS для Verfügung.

Folgende Quellen stehen aktuell zur Verfügung:

- Die letzten acht täglichen Bilder на Bing.com
- Через VIS-Dateimanager hochgeladene Bilder
- Изображение из достоверной информации Pfad im Dateisystem
- Картинка Synology PhotoStation и Synology Photo

Для просмотра в VIS используется адаптер и виджет для настройки. Dieses bietet auch Funktionen für Effekt beim Bildwechsel, beispielsweise sanftes Ein- und Ausblenden. Время ожидания может быть изменено. Таким образом, в других случаях View im Projekt keine Action für das eingestellte Timeout просто необходим для просмотра с помощью Diashow Gewechselt. Нажмите кнопку «Bilds», чтобы получить доступ к получению информации или получению дополнительной информации.

Не используйте Bild в качестве Pfad или Base64-kodiertes Objekt weitere Objekte mit Informationen zum Bild в ioBroker. Diese sind abhängig von der ausgewählten Quelle:

| Объект      | Бинг                            | Lokal und Dateisystem           | Синология     |
| ----------- | ------------------------------- | ------------------------------- | ------------- |
| информация1 | Тител                           | Название (EXIF-информация)      | Тител         |
| info2       | Описание                        | Betreff (EXIF-информация)       | Описание      |
| инфо3       | Информация об авторских правах  | Комментарий (EXIF-информация)   | Имя файла     |
| дата        | Datum der Anzeige на Bing-Seite | Aufnahmedatum (EXIF-информация) | Aufnahmedatum |

Кнопка «updatepicturelist» также является объектом в ioBroker, который содержит изображения в конфигурации, которую вы не используете, начиная с Hinzufügen или Löschen von Bildern. Die Bilder aus allen Quellen mit Ausnahme Bing werden sonst nur beim Start des Adapters eingelesen. Bing-Bilder автоматически актуализируется.

**Этот адаптер позволяет использовать Sentry Bibliotheken для автоматического обучения и программирования, а также для последующего использования.** Подробности и информация о деактивации Fehlerberichterstattung в [документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Sentry Reporting работает с JS-Controller 3.0.

### Конфигурация

При установке адаптеров будет установлен интервал в 10 секунд. Außerdem kann eingestellt werden, wie часто умирает Liste der Bilder aktualisiert werden soll. Когда Einstellung erfolgt in Stunden, bei 0 ist die autotische Aktualisierung deaktiviert.

При выборе «Dateisystem» можно, чтобы Pfad в Dateisystem ausgewählt был установлен, ausserdem das Format (Hoch- oder Querformat) der anzuzeigenden Bilder sowie die Reihenfolge.

Для выбора «Synology PhotoStation» необходимо указать версию DSM, IP-адрес или имя хоста, имя пользователя и пароль. Загрузите фон Bildern durch Benutzer muss и активируйте его в режиме PhotoStation.

### VIS-виджет

Этот виджет входит в категорию «слайд-шоу».

Этот виджет будет доступен в вашем собственном режиме просмотра. Hierdurch lässt sich der autotische Start der Diashow nutzen.

Folgende Einstellungen sind möglich:

- Abschnitt "Allgemein"
  - Идентификатор объекта: Hier muss der vom Adaptor erzeugte Datenpunkt ausgewählt werden, beispielsweise "slideshow\.0.picture"
  - Widget mit Bild füllen
    - True (Standard) = Bild füllt das Widget, der Bildrand ist möglicherweise abgeschnitten
    - False = Das vollständige Bild wird angezeigt, das Widget kann jedoch leere Zonen haben
- Абснитт "Эффект"
  - SlideshowEffect: Als Effekt kann zwischen folgenden gewählt werden:
    - "Кейн"
    - «Fade»: Einfaches Verblassen und Erscheinen
    - "Transition": Überblenden
    - «Эффект jQuery»: Разнообразные эффекты jQuery, лучшие результаты
  - Фаза перехода: время в миллисекундах для эффекта, время отсчета составляет 500 или 1000 мс.
  - Стиль перехода: Стиль «Переход» и «Эффект jQuery».
  - Эффект jQuery: Gewünschter Эффект jQuery
- Abschnitt "Автоматическое Диашоу-Старт"
  - Активация автоматического запуска
  - Тайм-аут: Nach welcher Zeit ohne Aktion auf die Diashow-View gewechselt wird
  - Цель при нажатии:
    - Zuletzt verwendete Ansicht
    - Настройка конфигурации (siehe nächster Einstellung)
    - Kein, Falls beispielsweise ein eigener Button integriert werden soll
  - Zielansicht: Aufzurufende Ansicht beim Verlassen der Diashow

### Часто задаваемые вопросы

**Quelle Dateisystem**

Können Netzlaufwerke eingebunden werden?

Да, это не лучше, чем адаптер. ioBroker unterstützt mittlerweile sehr viele Betriebssysteme. Der Zugriff und das Verbinden von Netzwerkfreigaben ist je nach Betriebssystem komplett unterschiedlich. Используйте дополнительные компоненты, которые помогут использовать Samba для Linux. Das Verbinden des Netzlaufwerks (Mappen bzw. Mount) может быть напрямую подключен к системе Betriebs system во время работы. В Linux используется монтирование в определенных версиях, zB /mnt/pictures. Эта информация может быть изменена в конфигурации адаптера.

**Синология**

Вы можете использовать Synology PhotoStation для того, чтобы узнать, какие альбомы включены?

Der Zugriff auf bestimmte Fotoalben bzw. Вы можете использовать актуальную версию PhotoStation, которая действительно доступна. Hierzu unter DSM einen Benutzer for Slideshow anlegen und diesem Benutzer in der PhotoStation nur Berechtigungen auf die gewünschten Fotoalben bzw. Орднер гебен.

## <a name="english"></a> Адаптер слайд-шоу для ioBroker

Этот адаптер для ioBroker предоставляет VIS возможность создания слайд-шоу, подобно заставке.

В действительности можно использовать следующие источники:

- Последние восемь ежедневных фотографий с сайта Bing.com
- Изображения загружены с помощью VIS-File-Manager
- Изображения из пути к файлу в файловой системе
- Фотографии из Synology PhotoStation или Synology Photo

Адаптер предоставляет виджет для презентаций в VIS, который предлагает эффекты при смене изображений, например, плавное затухание и появление. Дополнительно можно настроить тайм-аут. Если в других представлениях того же проекта VIS не произошло никаких действий в течение заданного тайм-аута, запустится представление со слайд-шоу. При щелчке по изображению оно вернется к последнему представлению или к предопределенному представлению.

Помимо изображения в виде пути или объекта, закодированного в Base64, в ioBroker создаются и другие объекты с информацией об изображении. Они зависят от выбранного источника:

| Объект      | Бинг                                 | Локальная и файловая система  | Синология   |
| ----------- | ------------------------------------ | ----------------------------- | ----------- |
| информация1 | Заголовок                            | Заголовок (информация EXIF)   | Заголовок   |
| info2       | Описание                             | Тема (информация EXIF)        | Описание    |
| инфо3       | Авторские права                      | Комментарий (информация EXIF) | Имя файла   |
| дата        | Дата, отображаемая на странице Bing. | Дата записи (информация EXIF) | Дата записи |

Кнопка "обновить список изображений" как объект в ioBroker повторно считывает изображения из настроенного источника, что полезно, например, после добавления или удаления изображений из источника. Изображения из всех источников, кроме Bing, обычно загружаются при запуске адаптера. Изображения из Bing автоматически обновляются ежечасно.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

### Конфигурация

В настройках адаптера можно выбрать источник изображения, а также интервал смены изображений. Кроме того, можно настроить частоту обновления списка изображений. Настройка производится в часах, значение 0 отключает автоматическое обновление.

При выборе источника «Файловая система» можно указать путь и формат (альбомный или книжный) отображаемых изображений. Также можно настроить порядок отображения.

При выборе источника "Synology PhotoStation" необходимо указать версию Synology DSM, IP-адрес или имя хоста, а также имя пользователя и пароль.

Внимание: После внесения изменений (добавления или удаления) требуется перезагрузка адаптера.

### VIS-виджет

Виджет находится в категории «слайд-шоу».

Виджет следует интегрировать в отдельный элемент интерфейса, чтобы можно было использовать автоматический запуск слайд-шоу.

Доступны следующие параметры конфигурации:

- Категория «Общие»
  - Идентификатор объекта: Необходимо указать объект ioBroker, созданный адаптером, например, "slideshow\.0.picture".
  - Заполните виджет картинкой
    - True (по умолчанию) = Изображение заполняет виджет, границы изображения могут быть обрезаны.
    - False = Отображается полная картина, но виджет может содержать пустые зоны.
- Категория «Эффект»
  - Эффект слайд-шоу: Доступны следующие параметры:
    - "Никто"
    - «Затухание»: Простое затухание и нарастание звука.
    - "Переход": плавное затухание
    - "jQuery-Effekt": Различные эффекты jQuery, например, "blind".
  - Период перехода: время в миллисекундах, в течение которого проявляется эффект; рекомендуемые значения — 500 или 1000.
  - Стиль перехода: Стиль для "Перехода" и "Эффекта jQuery"
  - jQuery-Effect: Желаемый эффект
- Категория «Автоматический запуск слайд-шоу»
  - Включить автоматический запуск
  - Тайм-аут: по истечении времени в секундах бездействия на других экранах будет запущено слайд-шоу.
  - Цель при клике:
    - Последний использованный вид
    - Настроенный вид (см. следующую настройку)
    - Нет, например, при интеграции другого виджета, поэтому
  - Целевой режим просмотра: Вид, отображаемый при выходе из режима слайд-шоу.

### Часто задаваемые вопросы

**Исходная файловая система**

Можно ли интегрировать сетевые накопители?

Да, но не напрямую через адаптер. ioBroker теперь поддерживает большое количество операционных систем. Доступ к сетевым ресурсам и подключение к ним полностью различаются в зависимости от операционной системы. В некоторых случаях также требуются дополнительные компоненты, такие как Samba для Linux. Подключение сетевого диска (отображение или монтирование) может осуществляться непосредственно операционной системой. В Linux монтирование происходит в указанный каталог, например, /mnt/pictures. Этот каталог затем можно использовать в конфигурации адаптера.

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