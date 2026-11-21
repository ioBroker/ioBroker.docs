---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-jaeger-design/README.md":{"title":{"en":"Special Jaeger Design widgets for ioBroker.vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-jaeger-design/README.md"},"en/adapterref/iobroker.vis-2-widgets-jaeger-design/docs/README_de.md":{"title":{"en":"Special Jaeger Design widgets for ioBroker.vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-jaeger-design/docs/README_de.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2-widgets-jaeger-design/README.md
title: Специальные виджеты Jaeger Design для ioBroker.vis 2.0
hash: qTtonHP78s4G44hxsH4myZ3CHMb9p7fYvH3uRaMcsSA=
---
![Логотип](../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/admin/vis-2-widgets-jaeger-design.png)

![Количество установок](https://iobroker.live/badges/vis-2-widgets-jaeger-design-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.vis-2-widgets-jaeger-design.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-jaeger-design.svg)

# Специальные виджеты Jaeger Design для ioBroker.vis 2.0

![ютуб](../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/img/youtube.jpg)

Видеоинструкции по использованию виджетов можно найти [здесь](https://www.youtube.com/playlist?list=PLddhldeLVrtl5Bhj6AAbkLabuIuyV0bVe) (на немецком языке).

Видео с виджетами benutzt werden können, kann man [hier](https://www.youtube.com/playlist?list=PLddhldeLVrtl5Bhj6AAbkLabuIuyV0bVe) finden.

Für deutsche Version вот [здесь](/#/docs/adapterref/iobroker.vis-2-widgets-jaeger-design/docs/README_de.md)

## Коммерческое использование

Обратите внимание, что бесплатной версии этого адаптера нет. Для использования этих виджетов необходимо приобрести лицензию (текущая цена: 50 евро, включая НДС).\
&#x20;Однако вы можете установить их и попробовать в редакторе совершенно бесплатно.

## Обзор процесса создания интерфейса «умного дома» с помощью адаптера дизайна «VIS-2 JAEGER».

### Требования

- Система ioBroker
- Адаптер JAEGER Design (примерно 50 евро)
- Базовые знания по использованию ioBroker.

### Введение

Адаптер JAEGER Design основан на адаптере vis-2 и позволяет создавать интерфейс с помощью перетаскивания элементов. Можно добавлять и настраивать различные виджеты для управления устройствами умного дома.

### Базовая структура интерфейса

Интерфейс состоит из нескольких областей:

- **Главное меню** : слева находится столбец с пунктами главного меню, который легко создать.
- **Строка состояния** : Вверху можно добавить различные важные индикаторы состояния.
- **Центральная область** : Здесь можно отображать сценарии, действия и уведомления. Правая часть свободно настраивается и может отображать такую информацию, как безопасность, погода, бытовая техника и энергопотребление.![iobroker Schnittstellen1](https://github.com/user-attachments/assets/d0323e58-ba6e-455c-8a06-81f9acda9ef9)

### Освещение

В главном меню можно выбрать разные этажи. На плане первого этажа отображаются все светильники, представленные значками. Некоторые значки можно только включать или выключать, а другие регулируются по яркости. При нажатии и удержании значка открывается всплывающее окно с ползунком для регулировки яркости.![iobroker-jaeger-design-beleuchtung](https://github.com/user-attachments/assets/7e4a4ee9-b1b4-4ab1-88cb-eddf0a1fc707) Сценарии освещения, расположенные справа, легко доступны, а также можно сохранять настройки освещения:![iobroker-jaeger-design-beleuchtung\_szenen\_speichern](https://github.com/user-attachments/assets/d9099048-0d26-4cfb-9b74-04a36b07131b)

### Жалюзи

В меню «Жалюзи» можно увидеть состояние затенения. Значки указывают положение жалюзи, а щелчок по значку открывает всплывающее окно для регулировки высоты и угла наклона ламелей.![Beschattung-iobroker-умный дом](https://github.com/user-attachments/assets/a808b0c2-0e84-4586-b482-3d63b49e4706)

### Энергия

В меню «Энергия» вы можете увидеть температуру в каждой комнате. Значки отображают фактическую и целевую температуру, а также состояние отопления и окон. При нажатии на значок открывается всплывающее окно, в котором можно изменить целевую температуру и управлять другими действиями, такими как кондиционирование воздуха или системы обогрева.![iobroker-jaeger-design-raumtemperatur\_ueberblick](https://github.com/user-attachments/assets/b34ab5bb-e05a-438f-b0d6-649a34d1dfde)

![iobroker-jaeger-design-raumtemperatur](https://github.com/user-attachments/assets/282f5f01-827c-4976-8cbc-78084f076ac1)

### Безопасность

В меню «Безопасность» можно просмотреть состояние окон. Открытые окна отображаются красным цветом.![iobroker-jaeger-design-sicherheit](https://github.com/user-attachments/assets/9e0234ac-aa0a-4811-b971-ac33237502f5)

### Дополнительные функции

Вы также можете создавать произвольно определяемые интерфейсы, например, отображение потребления на адаптере «потребление» или отображение данных Nightscout для диабетиков. В меню «Настройки» можно выполнить различные параметры.![iobroker-jaeger-design-energieueberwachung](https://github.com/user-attachments/assets/92e09c5f-88d9-48b3-b97f-0401a8839946)

![iobroker-jaeger-design-diabetes](https://github.com/user-attachments/assets/39d0a043-6025-4f9d-96f4-e8c9bd2245bd)

![iobroker-jaeger-design-einstellungen](https://github.com/user-attachments/assets/bff91b52-c04e-4482-9dd8-e17a9a7c762c)

### Видеоуроки на YouTube

Для получения подробных инструкций и дополнительной информации рекомендуется посмотреть видеоуроки на YouTube, ссылки на которые приведены ниже.

## Виджеты

Адаптер добавляет девять виджетов в палитру vis-2 в наборе **дизайна Jaeger** . При наведении курсора на виджет в палитре под его предварительным просмотром отображается краткое описание.

Все виджеты используют одну цветовую тему. Только виджет компоновки полностью использует эту тему; все остальные виджеты либо заимствуют цвета из него ( _Палитра → Из виджета_ ), либо определяют свои собственные. Встроено пять тем: `green`, `blue`, `green-dark`, `blue-dark` и `aurora` (ночной синий с мятным оттенком).

### Макет

![Виджет макета](../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/src-widgets/public/img/prev_layout.png)

Рамка, окружающая все остальное. Она отображает полный интерфейс: главное меню слева, строку состояния вверху, селектор этажей, домашнюю страницу со сценами и действиями, свободно настраиваемую правую колонку и — на телефоне или планшете — выдвижную панель с возможностью свайпа вместо колонки меню.

У него есть единственный атрибут, **«Настройки»** , который открывает редактор, в котором описан весь интерфейс: пункты меню, этажи и их виды, сцены, действия, информационные группы и цвета. Используйте ровно один виджет макета на каждый вид; по умолчанию он полностью заполняет вид.

### Состояние

![Виджет состояния](../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/src-widgets/public/img/prev_state.png)

Квадратная кнопка-значок для одного объекта — основного элемента планировки помещений. Нажатие переключает значение; при _нажатии «Записать конкретное значение»_ вместо этого записывается фиксированное значение, а _при нажатии «Указать, задано ли значение»_ кнопка подсвечивается, пока это значение активно.

- **Количество значений** — несколько значений, каждое со своим значком, цветом, цветом фона и всплывающей подсказкой.
- **Показать диалоговое окно управления** — вместо переключения открывается диалоговое окно со всеми значениями.
- **Управление отсутствует** — только дисплей, кнопку нажать нельзя.
- Прежде чем что-либо будет написано, **запросите подтверждение** , прислав свой собственный текст.
- Дополнительная подпись над или под значком.

### Диммер

![Виджет диммирования](../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/src-widgets/public/img/prev_dimmer.png)

Регулировка яркости для диммируемого освещения. Сам виджет отображает текущий уровень в виде вертикальной полосы; нажатие и удержание ( _длительность нажатия_ ) открывает всплывающее окно с ползунком, разделенным на заданное количество **секций** .

- **Кнопки памяти** — кнопки для установки фиксированных значений яркости, расположенные под ползунком, каждая со своим значком и текстом. Значение либо берется из объекта, либо записывается напрямую.
- **Идентификатор объекта для включения/выключения** и **значение для включения/выключения** для светильников, переключатель включения/выключения которых является отдельным объектом.
- При желании можно отобразить значение в виджете, повернуть значок и закрыть всплывающее окно после установки значения.

### Затвор

![Виджет жалюзи](../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/src-widgets/public/img/prev_shutter.png)

Аналогичный принцип применяется к рольставням и жалюзи. Значок показывает текущее положение, при этом задан значок рольставни, жалюзи или тени. **Идентификатор рольставни Shadow** добавляет второй объект для угла наклона ламелей, поэтому высота и положение ламелей задаются в одном всплывающем окне.

Поскольку приводы расходятся во мнениях относительно значения 0%, значение и отображение можно инвертировать независимо друг от друга — отдельно для высоты и для ламелей. Кнопки памяти сохраняют высоту и угол наклона ламелей вместе.

### Термостат

![Виджет термостата](../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/src-widgets/public/img/prev_thermostat.png)

Целевая температура отображается в виде регулятора. В диалоговом окне рядом с целевым значением отображаются фактическая температура, влажность и положение клапана, а также предлагаются кнопки «минус»/«плюс» и ползунок. Можно настроить минимальное, максимальное значение, шаг и единицу измерения, а в качестве десятичного разделителя можно использовать запятую.

Ниже предусмотрено место для дополнительных **кнопок** — ускорение, отключение, кондиционирование воздуха, любые функции отопления. Каждая кнопка имеет свой объект, значение, значок, метку и стиль.

### Сцена

![Виджет сцены](../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/src-widgets/public/img/prev_scene.png)

Широкая кнопка с заголовком и подзаголовком, запускающая сцену. `scenes` Адаптер или просто записывает значение. **Функция «Сохранить»** добавляет вторую кнопку справа (шестерёнка на картинке): она сохраняет текущее состояние всех элементов обратно в сцену.

Дополнительные параметры: нет активного состояния, запись `false` вместо `true` Запросите подтверждение, отправив собственное текстовое сообщение, и укажите время последнего изменения.

### Камеры

![Виджет камер](../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/src-widgets/public/img/prev_cameras.png)

Карта памяти с сеткой изображений с камер. Каждая камера либо взята из... `cameras` адаптер или с бесплатного URL-адреса, который также может быть прочитан из объекта и имеет собственный интервал обновления.

_Функция «Разрешить полноэкранный режим» открывает один большой экран_ камеры с отдельным URL-адресом и интервалом обновления для полноэкранного изображения — таким образом, миниатюры остаются маленькими. Кнопка «Показать больше» ведет к другому виджету или другой странице.

### Актуальные новости

![Виджет новостей](../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/src-widgets/public/img/prev_news.png)

Карточка с RSS-лентой: изображение, заголовок и краткое описание для каждой записи, с возможностью прокрутки. URL-адрес ленты вводится напрямую или считывается из объекта, поэтому его можно изменить во время выполнения. Интервал обновления настраивается, а кнопка «Подробнее» ведет к виджету или странице.

### Игрок

![Виджет плеера](../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/src-widgets/public/img/prev_player.png)

Карточка медиаплеера: название, исполнитель, обложка, воспроизведение/пауза, предыдущий/следующий трек, перемешивание, отключение звука, ползунок громкости и полоса прошедшего/общего времени. Каждый элемент привязан к своему собственному объекту, поэтому виджет работает с любым адаптером плеера — Sonos, Squeezebox, Alexa и так далее. Элементы, объект которых оставлен пустым, не отображаются.

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

## Changelog
### 1.5.9 (2026-11-11)
* (bluefox) Info entries can show a symbol in front of the name or instead of it

### 1.5.8 (2026-11-10)
* (bluefox) The background of a floor or page view now reaches to the end when the view is scrolled
* (bluefox) Scenes and actions with "No active state" are shown pressed for a moment after a click
* (bluefox) Redesigned the layout editor: grouped navigation, lists with search, drag & drop, duplicate and delete, fields in cards, theme previews, undo/redo (Ctrl+Z/Ctrl+Y) and animated icons
* (bluefox) Added the dark theme "Aurora" (night blue with mint)
* (bluefox) Dark themes: popovers of dimmer and shutter, the thermostat mode menu and the player sliders take the theme colors; a custom theme with a dark background is detected as dark

### 1.5.7 (2026-11-04)
* (bluefox) Copying a submenu gives its items new IDs, so the copied pages no longer take the settings (e.g., included or excluded scenes) of the original pages
* (bluefox) Menu items with the same ID are repaired when the layout settings are opened or imported from JSON

### 1.5.6 (2026-11-03)
* (bluefox) Scene widgets placed in a page no longer get a too big font and save button on mobile phones

### 1.5.5 (2026-11-03)
* (bluefox) Dimmer: the popup shows the value in percent on the bar (can be hidden in the widget settings)
* (bluefox) Pages with "Include scenes" or "Include actions" show only the scenes and actions of the current floor, the same as with "Exclude"
* (bluefox) Menu settings: "Include scenes/actions" offers only the items assigned to floors and shows which ones are visible on every floor
* (bluefox) Updated packages

Older changes can be found in CHANGELOG_OLD.md

## License
Copyright (c) 2022-2026 bluefox <dogafox@gmail.com>
All rights reserved.

This is a commercial adapter. Use requires a license, see https://www.iobroker.com/productoverview.
The full license text can be found in the [LICENSE](https://github.com/ioBroker/ioBroker.vis-2-widgets-jaeger-design/blob/master/LICENSE) file.