---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-materialdesign/README.md
title: Виджеты материального дизайна для ioBroker VIS
hash: yidKUUG2JA+NnBVnd/fu4H+iPs3uvUa2e1QY4D9iaw4=
---
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/admin/vis-materialdesign.png) <! - пропустить в toc ->

![стабильная версия](http://iobroker.live/badges/vis-materialdesign.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.vis-materialdesign.svg)
![Количество установок](http://iobroker.live/badges/vis-materialdesign-installed.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-materialdesign.svg)
![НПМ](https://nodei.co/npm/iobroker.vis-materialdesign.png?downloads=true)

## IoBroker.vis-materialdesign
<! - опустить в toc ->

# Виджеты Material Design для ioBroker VIS [![PayPal] (https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=VWAXSTS634G88&source=url)
Виджеты ioBroker Material Design основаны на [Рекомендации Google по материальному дизайну](https://material.io/design/)

<br>

<! - опустить в toc ->

## Таблица содержания
- [Общие] (# общие)
- [Интернет-пример проекта] (# онлайн-пример-проект)
- [Практические примеры] (# практических-примеров)
- [Вопросы и ответы о виджетах] (# вопросы и ответы о виджетах)
- [Поддерживаемый браузер] (# поддерживаемый браузер)
- [Поддерживаемый браузер для функции вибрации на мобильных устройствах] (# supported-browser-for-vibrate-on-mobil-devices-function)
- [Приложение ioBroker VIS] (# iobroker-vis-app)
- [Настройки адаптера] (# настройки адаптера)
- [Общий] (# общий-1)
- [Редактор тем] (# редактор тем)
- [Настройки темы] (# настройки темы)
- [Виджеты] (# виджетов)
- [Значки и изображения материального дизайна] (# material-design-icons-and-images)
- [Настройки редактора] (# редактор-настройки)
- [Свойства HTML] (# html-свойства)
- [Кнопки] (# кнопки)
- [Навигация] (# навигация)
- [Настройки редактора] (# editor-settings-1)
- [Свойства HTML] (# html-properties-1)
- [Ссылка] (# ссылка)
- [Настройки редактора] (# editor-settings-2)
- [Свойства HTML] (# html-properties-2)
- [Состояние] (# состояние)
- [Настройки редактора] (# editor-settings-3)
- [Свойства HTML] (# html-properties-3)
- [Несколько состояний] (# несколько состояний)
- [Настройки редактора] (# editor-settings-4)
- [Свойства HTML] (# html-properties-4)
- [Дополнение] (# добавление)
- [Настройки редактора] (# editor-settings-5)
- [Свойства HTML] (# html-properties-5)
- [Переключить] (# переключатель)
- [Настройки редактора] (# editor-settings-6)
- [Свойства HTML] (# html-properties-6)
- [Кнопки по вертикали] (# кнопки по вертикали)
- [Навигация] (# навигация-1)
- [Настройки редактора] (# editor-settings-7)
- [Свойства HTML] (# html-properties-7)
- [Ссылка] (# ссылка-1)
- [Настройки редактора] (# editor-settings-8)
- [Свойства HTML] (# html-properties-8)
- [Состояние] (# состояние-1)
- [Настройки редактора] (# editor-settings-9)
- [Свойства HTML] (# html-properties-9)
- [Мульти-состояние] (# мульти-состояние-1)
- [Настройки редактора] (# editor-settings-10)
- [Свойства HTML] (# html-properties-10)
- [Дополнение] (# добавление-1)
- [Настройки редактора] (# editor-settings-11)
- [Свойства HTML] (# html-properties-11)
- [Переключить] (# переключатель-1)
- [Настройки редактора] (# editor-settings-12)
- [Свойства HTML] (# html-properties-12)
- [Иконки кнопок] (# иконка-кнопки)
- [Навигация] (# навигация-2)
- [Настройки редактора] (# editor-settings-13)
- [Свойства HTML] (# html-properties-13)
- [Ссылка] (# ссылка-2)
- [Настройки редактора] (# editor-settings-14)
- [Свойства HTML] (# html-properties-14)
- [Состояние] (# состояние-2)
- [Настройки редактора] (# editor-settings-15)
- [Свойства HTML] (# html-properties-15)
- [Мульти-состояние] (# мульти-состояние-2)
- [Настройки редактора] (# editor-settings-16)
- [Свойства HTML] (# html-properties-16)
- [Дополнение] (# добавление-2)
- [Настройки редактора] (# editor-settings-17)
- [Свойства HTML] (# html-properties-17)
- [Переключить] (# переключатель-2)
- [Настройки редактора] (# editor-settings-18)
- [Свойства HTML] (# html-properties-18)
- [Флажок] (флажок #)
- [Настройки редактора] (# editor-settings-19)
- [Свойства HTML] (# html-properties-19)
- [Переключатель] (переключатель #)
- [Настройки редактора] (# editor-settings-20)
- [Свойства HTML] (# html-properties-20)
- [Значение] (# значение)
- [Настройки редактора] (# editor-settings-21)
- [Свойства HTML] (# html-properties-21)
- [HTML-карта] (# html-карта)
- [Список] (# список)
- [Настройки редактора] (# editor-settings-22)
- [Свойства JSON данных] (# data-json-properties)
- [IconList] (# список значков)
- [Настройки редактора] (# editor-settings-23)
- [Свойства данных JSON] (# data-json-properties-1)
- [Прогресс] (# прогресс)
- [Настройки редактора] (# editor-settings-24)
- [Свойства HTML] (# html-properties-22)
- [Информационный бюллетень] (# информационный бюллетень)
- [Настройки редактора] (# editor-settings-25)
- [Свойства HTML] (# html-properties-23)
- [Ползунок] (# ползунок)
- [Свойства HTML] (# html-properties-24)
- [Круглый слайдер] (# круговой слайдер)
- [Свойства HTML] (# html-properties-25)
- [Вход] (# вход)
- [Ввод текста] (# ввод текста)
- [Настройки редактора] (# editor-settings-26)
- [Свойства HTML] (# html-properties-26)
- [Выбрать] (# выбрать)
- [Свойства меню JSON] (# menu-json-properties)
- [Свойства HTML] (# html-properties-27)
- [Автозаполнение] (# автозаполнение)
- [Свойства меню JSON] (# menu-json-properties-1)
- [Свойства HTML] (# html-properties-28)
- [Верхняя панель приложений] (# верхняя панель приложений)
- [Настройки редактора] (# editor-settings-27)
- [Свойства меню JSON] (# menu-json-properties-2)
- [Подменю] (# подменю)
- [Подменю JSON Properties] (# submenu-json-properties)
- [Диаграммы] (# диаграмм)
- [Гистограмма] (# гистограмма)
- [Настройки редактора] (# editor-settings-28)
- [Свойства JSON набора данных] (# набор данных-json-properties)
- [Круговая диаграмма] (# круговая диаграмма)
- [Настройки редактора] (# editor-settings-29)
- [Свойства JSON набора данных] (# dataset-json-properties-1)
- [Линейная диаграмма истории:] (# линия-история-диаграмма)
- [Настройки редактора] (# editor-settings-30)
- [JSON Chart] (# json-chart)
- [Свойства JSON] (# свойства json)
- [Таблица] (# таблица)
- [Настройки редактора] (# editor-settings-31)
- [Data - JSON Stucture] (# data --- json-stucture)
- [привязка внутреннего объекта] (# привязка внутреннего объекта)
- [Элементы управления с помощью виджетов HTML] (# control-elements-using-html-widgets)
- [Элементы управления - **устарело с версии v0.5.0** (# элементы управления --- устарело с версии v050)
- [Адаптивный макет] (# адаптивный макет)
- [Виды кладки] (# вида кладки)
- [Настройки редактора] (# editor-settings-32)
- [Представления сетки] (# представлений сетки)
- [Настройки редактора] (# editor-settings-33)
- [Оповещения] (# оповещений)
- [Настройки редактора] (# editor-settings-34)
- [Свойства Datapoint JSON] (# datapoint-json-properties)
- [Сценарий: отправить предупреждение виджету] (# script-send-alert-to-widget)
- [Календарь] (# календарь)
- [Настройки редактора] (# editor-settings-35)
- [Свойства Datapoint JSON] (# datapoint-json-properties-1)
- [Скрипт: ical-преобразование] (# скрипт-ical-преобразование)
- [Диалог] (# диалог)
- [Настройки редактора] (# editor-settings-36)
- [HTML-виджеты] (# html-widgets)
- [Примеры] (# примеров)
- [Информация] (# информации)
- [используемые библиотеки] (# используемые библиотеки)
- [Список изменений] (# список изменений)

# Общий
## Интернет-пример проекта
предоставлено [iobroker.click](https://iobroker.click/index.html), спасибо bluefox и iobroker.

* <a href="https://iobroker.click/vis/index.html?Material%20Design%20Widgets" target="_blank">VIS Runtime</a> ( <a href="http://iobroker.click:8082/vis/index.html?Material%20Design%20Widgets" target="_blank">альтернатива</a> )
* <a href="https://iobroker.click/vis/edit.html?Material%20Design%20Widgets" target="_blank">Редактор VIS</a> ( <a href="http://iobroker.click:8082/vis/edit.html?Material%20Design%20Widgets" target="_blank">альтернатива</a> )

## Практические примеры
* [Просмотр погоды] (https://forum.iobroker.net/topic/32232/material-design-widgets-wetter-view)
* [Статус сценария] (https://forum.iobroker.net/topic/30662/material-design-widgets-skript-status)
* [Статус адаптера] (https://forum.iobroker.net/topic/30661/material-design-widgets-adapter-status)
* [Статус UniFi Netzwerk] (https://github.com/Scrounger/ioBroker.vis-materialdesign/tree/master/examples/UnifiNetworkState)

## Вопросы и ответы о виджетах
Если у вас есть вопросы по отдельным виджетам, сначала просмотрите темы отдельных виджетов.

* [Немецкие темы] (https://forum.iobroker.net/search?term=Material%20Design%20Widgets%3A&in=titles&matchWords=all&by%5B%5D=Scrounger&categories%5B%5D=7&sortBy=topic.title&sortDshoirection=desc темы)

## Поддерживаемый браузер
Я официально поддерживаю последние две версии всех основных браузеров. В частности, я тестирую следующие браузеры:

* Firefox в Windows и Linux
* Chrome для Android, Windows и Linux

## Поддерживаемый браузер для функции вибрации на мобильных устройствах
https://developer.mozilla.org/en-US/docs/Web/API/Navigator/vibrate

## Приложение ioBroker VIS
последняя версия должна быть реализована приложением, см. https://github.com/ioBroker/ioBroker.vis.cordova.
Я приложением не пользуюсь и на нем не тестирую

# Настройки адаптера
Начиная с версии 0.4.0 есть страница настроек адаптера. Вы можете найти его в разделе «Экземпляры» в пользовательском интерфейсе адаптера администратора.

## Общий
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/settings_general.png)

| установка | описание |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Документация | Ссылки на документацию, которая поможет вам настроить виджеты |
| Сгенерировать глобальный скрипт | Создайте глобальный сценарий для [Механизм сценариев Javascript](https://github.com/ioBroker/ioBroker.javascript) со всеми точками данных темы. Это позволяет удобно использовать цвета, шрифты и размеры шрифтов в скриптах. |
| Часовой | используйте библиотеки Sentry, чтобы автоматически анонимно сообщать разработчикам об исключениях и ошибках кода. Для получения дополнительных сведений и информации о том, как отключить отчет об ошибках, см. [Документация Sentry-Plugin] (https://github.com/ioBroker/plugin-sentry#plugin-sentry)! |

## Редактор тем
С помощью редактора тем вы можете централизованно устанавливать цвета, шрифты и размеры шрифтов для всех виджетов через настройки адаптера. Для каждого виджета создаются точки данных (см. Снимок экрана ниже) с заданными значениями. Это также позволяет использовать эти настройки в других виджетах (не в виджетах Material Design) через привязки.

##### Структура Datapoint
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/settings_datapoints.png)

### Настройки темы
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/settings_colors_light.png)

Каждая страница настроек для цветов, темных цветов, шрифтов и размеров шрифтов выглядит так, как показано на скриншоте выше.

Стандартные цвета / шрифты / размеры шрифта можно определить в верхней части. Эти стандартные цвета / шрифты / размеры шрифтов затем можно назначить отдельным виджетам с помощью кнопок в таблице. Если вы измените цвета / шрифты / размеры по умолчанию, это также изменится для всех виджетов, которые используют эти цвета / шрифты / размеры шрифта.
Кроме того, виджетам можно назначить свои собственные цвета / шрифты / размеры шрифта, независимо от стандартных цветов.

Для цветов есть две темы - светлая тема и темная тема. С помощью точки данных `vis-materialdesign.0.colors.darkTheme` вы можете переключаться между двумя темами. Например, эту точку данных можно использовать в скрипте для переключения между светом и темными цветами на восходе и закате.

##### VIS Editor (восстановление / обновление старых виджетов)
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/vis_editor_theme_restore.gif)

В редакторе VIS вы найдете кнопку `use theme` для каждого виджета. С помощью этой кнопки вы можете сбросить виджеты на использование тем. Это означает, что если вы изменили цвета, шрифты или размеры шрифтов, вы можете сбросить их с помощью этой кнопки.

С помощью этой кнопки также можно обновить ваши виджеты с версий до 0.4.0, чтобы использовать темы.

##### Изменить привязку точки данных для виджетов Material Design
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/settings_mdw_binding.gif)

Если вы хотите изменить использование других цветов, определенных для других виджетов, вы можете скопировать привязку точек данных, нажав кнопку со значком материального дизайна. Просто вставьте это в любое поле цвета, шрифта или размера шрифта виджета материального дизайна. Например, цветовая «привязка состояния» выглядит как `#mdwTheme:vis-materialdesign.0.colors.card.background`

##### Использовать привязку для виджетов без материального дизайна
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/settings_binding.gif)

В настройках адаптера вы можете скопировать команду привязки в буфер обмена, нажав на кнопку со значком iobroker. Затем эту привязку можно использовать путем копирования и вставки даже для виджетов, не относящихся к материальному дизайну. Например, цветовая привязка выглядит как `{mode:vis-materialdesign.0.colors.darkTheme;light:vis-materialdesign.0.colors.light.card.background;dark:vis-materialdesign.0.colors.dark.card.background; mode === "true" ? dark : light}`

# Виджеты
## Значки и изображения Material Design
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/materialdesignicons.png)

### Настройки редактора
Настройки, не указанные в таблице ниже, не требуют пояснений.

<table><thead><tr><th>Скриншот</th><th> Описание</th></tr></thead><tbody><tr><td rowspan=6><img src="doc/en/media/material-icons.png"></td><td> Некоторые виджеты поддерживают библиотеку <a href="https://materialdesignicons.com/" target="_blank">значков материального дизайна.</a> Вы можете нарисовать значок из списка выше или открыть средство выбора изображений, нажав кнопку справа от поля ввода.<br><br> <b>Цвета изображения применимы только к значкам материального дизайна, а не к изображению!</b></td></tr></tbody></table>

### Свойства HTML
Следующие свойства могут использоваться как [HTML-виджеты](#html-widgets).

<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения </th></tr></thead><tbody><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Общий</b></i></td></tr><tr><td> mdw-mdwIcon</td><td> икона</td><td> нить</td><td></tr><tr><td> mdw-mdwIconSize</td><td> размер значка</td><td> номер</td><td></tr><tr><td> mdw-mdwIconColor</td><td> цвет значка</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-debug</td><td> отлаживать</td><td> логический</td><td> ложь | правда</tr></tbody></table>

<! - опустить в toc ->

#### Свойства HTML - пример
<details>

```
<div class='vis-widget materialdesign-widget materialdesign-icon materialdesign-materialdesignicons-html-element'
	style='width: 50px; height: 50px; position: relative; display: flex; align-items: center;'
	mdw-mdwIcon='iobroker'
	mdw-mdwIconSize='30'
	mdw-mdwIconColor='#mdwTheme:vis-materialdesign.0.colors.material_design_icon.color'
	mdw-debug='true'
></div>
```

</details>

## Кнопки
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/buttons_default.gif)

### Навигация
#### Настройки редактора
Настройки, не указанные в таблице ниже, не требуют пояснений.

<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание </th></tr></thead><tbody><tr><td rowspan=1><img src="doc/en/media/button_navigation_common.png"></td><td>Просмотр для навигации</td><td> название представления для навигации</td></tr></tbody></table>

#### Свойства HTML
Следующие свойства могут использоваться как [HTML-виджеты](#html-widgets).

<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> mdw-тип</td><td> Тип виджета</td><td> нить</td><td> navigation_default</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Общий</b></i></td></tr><tr><td> mdw-buttonStyle</td><td> стиль кнопки</td><td> нить</td><td> текст | поднял | не повышенный | очерченный</tr><tr><td> mdw-nav_view</td><td> Просмотр для навигации</td><td> взгляды</td><td></tr><tr><td> mdw-vibrateOnMobilDevices</td><td> вибрировать на мобильных устройствах [ах]</td><td> номер</td><td></tr><tr><td> mdw-debug</td><td> отлаживать</td><td> логический</td><td> ложь | правда</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>маркировка</b></i></td></tr><tr><td> mdw-buttontext</td><td> Текст кнопки</td><td> нить</td><td></tr><tr><td> mdw-textFontFamily</td><td> шрифт</td><td> нить</td><td></tr><tr><td> mdw-textFontSize</td><td> размер текста</td><td> номер</td><td></tr><tr><td> mdw-labelWidth</td><td> ширина текста</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>цвета</b></i></td></tr><tr><td> mdw-mdwButtonPrimaryColor</td><td> Основной цвет</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-mdwButtonSecondaryColor</td><td> вторичный цвет</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-mdwButtonColorPress</td><td> цвет нажат</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>икона</b></i></td></tr><tr><td> mdw-изображение</td><td> Изображение</td><td> нить</td><td></tr><tr><td> mdw-imageColor</td><td> цвет изображения</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-iconPosition</td><td> положение изображения</td><td> нить</td><td> слева | верно</tr><tr><td> mdw-iconHeight</td><td> высота изображения</td><td> номер</td><td></tr></tbody></table>

<! - опустить в toc ->

##### Свойства HTML - пример
<details>

```
<div class='vis-widget materialdesign-widget materialdesign-button materialdesign-button-html-element'
	style='width: 100%; height: 100%; position: relative; padding: 0px;'
	mdw-type='navigation_default'
	mdw-buttonStyle='raised'
	mdw-nav_view='value'
	mdw-vibrateOnMobilDevices='50'
	mdw-buttontext=' Navigation'
	mdw-textFontFamily='#mdwTheme:vis-materialdesign.0.fonts.button.default.text'
	mdw-textFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.button.default.text'
	mdw-mdwButtonPrimaryColor='#mdwTheme:vis-materialdesign.0.colors.button.default.primary'
	mdw-mdwButtonSecondaryColor='#mdwTheme:vis-materialdesign.0.colors.button.default.secondary'
	mdw-image='navigation'
	mdw-iconPosition='left'
></div>
```

</details>

### Ссылка на сайт
#### Настройки редактора
Настройки, не указанные в таблице ниже, не требуют пояснений.

<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание</th></tr></thead><tbody><tr><td rowspan=2><img src="doc/en/media/button_link_common.png"></td><td> Ссылка на сайт</td><td> URL для открытия</td></tr><tr><td> открыть в новом окне</td><td> открыть ссылку в новом окне / вкладке</td></tr></tbody></table>

#### Свойства HTML
Следующие свойства могут использоваться как [HTML-виджеты](#html-widgets).

<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> mdw-тип</td><td> Тип виджета</td><td> нить</td><td> link_default</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Общий</b></i></td></tr><tr><td> mdw-buttonStyle</td><td> стиль кнопки</td><td> нить</td><td> текст | поднял | не повышенный | очерченный</tr><tr><td> mdw-href</td><td> Ссылка на сайт</td><td> url</td><td></tr><tr><td> mdw-openNewWindow</td><td> открыть в новом окне</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-vibrateOnMobilDevices</td><td> вибрировать на мобильных устройствах [ах]</td><td> номер</td><td></tr><tr><td> mdw-debug</td><td> отлаживать</td><td> логический</td><td> ложь | правда</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>маркировка</b></i></td></tr><tr><td> mdw-buttontext</td><td> Текст кнопки</td><td> нить</td><td></tr><tr><td> mdw-textFontFamily</td><td> шрифт</td><td> нить</td><td></tr><tr><td> mdw-textFontSize</td><td> размер текста</td><td> номер</td><td></tr><tr><td> mdw-labelWidth</td><td> ширина текста</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>цвета</b></i></td></tr><tr><td> mdw-mdwButtonPrimaryColor</td><td> Основной цвет</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-mdwButtonSecondaryColor</td><td> вторичный цвет</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-mdwButtonColorPress</td><td> цвет нажат</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>икона</b></i></td></tr><tr><td> mdw-изображение</td><td> Изображение</td><td> нить</td><td></tr><tr><td> mdw-imageColor</td><td> цвет изображения</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-iconPosition</td><td> положение изображения</td><td> нить</td><td> слева | верно</tr><tr><td> mdw-iconHeight</td><td> высота изображения</td><td> номер</td><td></tr></tbody></table>

<! - опустить в toc ->

##### Свойства HTML - пример
<details>

```
<div class='vis-widget materialdesign-widget materialdesign-button materialdesign-button-html-element'
	style='width: 100px; height: 30px; position: relative; padding: 0px;'
	mdw-type='link_default'
	mdw-buttonStyle='raised'
	mdw-href='https://github.com/Scrounger/ioBroker.vis-materialdesign'
	mdw-openNewWindow='true'
	mdw-vibrateOnMobilDevices='50'
	mdw-buttontext=' Link'
	mdw-textFontFamily='#mdwTheme:vis-materialdesign.0.fonts.button.default.text'
	mdw-textFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.button.default.text'
	mdw-mdwButtonPrimaryColor='#mdwTheme:vis-materialdesign.0.colors.button.default.primary'
	mdw-mdwButtonSecondaryColor='#mdwTheme:vis-materialdesign.0.colors.button.default.secondary'
	mdw-image='link'
	mdw-iconPosition='left'
></div>
```

</details>

### Состояние
#### Настройки редактора
Настройки, не указанные в таблице ниже, не требуют пояснений.

<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание</th></tr></thead><tbody><tr><td rowspan=1><img src="doc/en/media/button_state_common.png"></td><td>значение</td><td> значение для установки</td></tr></tbody></table>

#### Свойства HTML
Следующие свойства могут использоваться как [HTML-виджеты](#html-widgets).

<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> mdw-тип</td><td> Тип виджета</td><td> нить</td><td> state_default</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Общий</b></i></td></tr><tr><td> mdw-oid</td><td> ID объекта</td><td> нить</td><td></tr><tr><td> mdw-buttonStyle</td><td> стиль кнопки</td><td> нить</td><td> текст | поднял | не повышенный | очерченный</tr><tr><td> mdw-значение</td><td> значение</td><td> нить</td><td></tr><tr><td> mdw-vibrateOnMobilDevices</td><td> вибрировать на мобильных устройствах [ах]</td><td> номер</td><td></tr><tr><td> mdw-debug</td><td> отлаживать</td><td> логический</td><td> ложь | правда</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>маркировка</b></i></td></tr><tr><td> mdw-buttontext</td><td> Текст кнопки</td><td> нить</td><td></tr><tr><td> mdw-textFontFamily</td><td> шрифт</td><td> нить</td><td></tr><tr><td> mdw-textFontSize</td><td> размер текста</td><td> номер</td><td></tr><tr><td> mdw-labelWidth</td><td> ширина текста</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>цвета</b></i></td></tr><tr><td> mdw-mdwButtonPrimaryColor</td><td> Основной цвет</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-mdwButtonSecondaryColor</td><td> вторичный цвет</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-mdwButtonColorPress</td><td> цвет нажат</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>икона</b></i></td></tr><tr><td> mdw-изображение</td><td> Изображение</td><td> нить</td><td></tr><tr><td> mdw-imageColor</td><td> цвет изображения</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-iconPosition</td><td> положение изображения</td><td> нить</td><td> слева | верно</tr><tr><td> mdw-iconHeight</td><td> высота изображения</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>Блокировка</b></i></td></tr><tr><td> mdw-lockEnabled</td><td> включить блокировку</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-autoLockAfter</td><td> автоматическая блокировка через [с]</td><td> номер</td><td></tr><tr><td> mdw-lockIcon</td><td> икона</td><td> нить</td><td></tr><tr><td> mdw-lockIconSize</td><td> размер значка</td><td> номер</td><td></tr><tr><td> mdw-lockIconColor</td><td> цвет значка</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-lockFilterGrayscale</td><td> серый фильтр, если заблокирован</td><td> номер</td><td></tr></tbody></table>

<! - опустить в toc ->

##### Свойства HTML - пример
<details>

```
<div class='vis-widget materialdesign-widget materialdesign-button materialdesign-button-html-element'
	style='width: 100%; height: 100%; position: relative; padding: 0px;'
	mdw-type='state_default'
	mdw-oid='0_userdata.0.number'
	mdw-buttonStyle='raised'
	mdw-value='22'
	mdw-vibrateOnMobilDevices='50'
	mdw-buttontext=' State'
	mdw-textFontFamily='#mdwTheme:vis-materialdesign.0.fonts.button.default.text'
	mdw-textFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.button.default.text'
	mdw-mdwButtonPrimaryColor='#mdwTheme:vis-materialdesign.0.colors.button.default.primary'
	mdw-mdwButtonSecondaryColor='#mdwTheme:vis-materialdesign.0.colors.button.default.secondary'
	mdw-image='pencil'
	mdw-iconPosition='left'
	mdw-autoLockAfter='10'
	mdw-lockIconColor='#mdwTheme:vis-materialdesign.0.colors.button.lock_icon'
	mdw-lockFilterGrayscale='30'
></div>
```

</details>

### Несколько состояний
#### Настройки редактора
Настройки, не указанные в таблице ниже, не требуют пояснений.

<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание </th></tr></thead><tbody><tr><td rowspan=3><img src="doc/en/media/button_multiState_Objeckt_id_x.png"></td><td> ID объекта [x]</td><td> id объекта, из которого должно быть установлено значение</td></tr><tr><td> значение [x]</td><td> значение, которое нужно установить</td></tr><tr><td> задержка [мс] [x]</td><td> задержка до тех пор, пока значение не будет установлено</td></tr></tbody></table>

#### Свойства HTML
Следующие свойства могут использоваться как [HTML-виджеты](#html-widgets).

<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> mdw-тип</td><td> Тип виджета</td><td> нить</td><td> multiState_default</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Общий</b></i></td></tr><tr><td> mdw-countOids</td><td> количество идентификаторов объекта</td><td> номер</td><td></tr><tr><td> mdw-buttonStyle</td><td> стиль кнопки</td><td> нить</td><td> текст | поднял | не повышенный | очерченный</tr><tr><td> mdw-vibrateOnMobilDevices</td><td> вибрировать на мобильных устройствах [ах]</td><td> номер</td><td></tr><tr><td> mdw-debug</td><td> отлаживать</td><td> логический</td><td> ложь | правда</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Идентификатор объекта [x]</b></i></td></tr><tr><td> mdw-oid [x]</td><td> ID объекта</td><td> нить</td><td></tr><tr><td> mdw-значение [x]</td><td> значение</td><td> нить</td><td></tr><tr><td> mdw-delayInMs [x]</td><td> задержка [мс]</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>маркировка</b></i></td></tr><tr><td> mdw-buttontext</td><td> Текст кнопки</td><td> нить</td><td></tr><tr><td> mdw-textFontFamily</td><td> шрифт</td><td> нить</td><td></tr><tr><td> mdw-textFontSize</td><td> размер текста</td><td> номер</td><td></tr><tr><td> mdw-labelWidth</td><td> ширина текста</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>цвета</b></i></td></tr><tr><td> mdw-mdwButtonPrimaryColor</td><td> Основной цвет</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-mdwButtonSecondaryColor</td><td> вторичный цвет</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-mdwButtonColorPress</td><td> цвет нажат</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>икона</b></i></td></tr><tr><td> mdw-изображение</td><td> Изображение</td><td> нить</td><td></tr><tr><td> mdw-imageColor</td><td> цвет изображения</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-iconPosition</td><td> положение изображения</td><td> нить</td><td> слева | верно</tr><tr><td> mdw-iconHeight</td><td> высота изображения</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>Блокировка</b></i></td></tr><tr><td> mdw-lockEnabled</td><td> включить блокировку</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-autoLockAfter</td><td> автоматическая блокировка через [с]</td><td> номер</td><td></tr><tr><td> mdw-lockIcon</td><td> икона</td><td> нить</td><td></tr><tr><td> mdw-lockIconSize</td><td> размер значка</td><td> номер</td><td></tr><tr><td> mdw-lockIconColor</td><td> цвет значка</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-lockFilterGrayscale</td><td> серый фильтр, если заблокирован</td><td> номер</td><td></tr></tbody></table>

<! - опустить в toc ->

##### Свойства HTML - пример
<details>

```
<div class='vis-widget materialdesign-widget materialdesign-button materialdesign-button-html-element'
	style='width: 100%; height: 100%; position: relative; padding: 0px;'
	mdw-type='multiState_default'
	mdw-countOids='1'
	mdw-buttonStyle='raised'
	mdw-vibrateOnMobilDevices='50'
	mdw-buttontext=' Multi State'
	mdw-textFontFamily='#mdwTheme:vis-materialdesign.0.fonts.button.default.text'
	mdw-textFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.button.default.text'
	mdw-mdwButtonPrimaryColor='#mdwTheme:vis-materialdesign.0.colors.button.default.primary'
	mdw-mdwButtonSecondaryColor='#mdwTheme:vis-materialdesign.0.colors.button.default.secondary'
	mdw-image='pencil-box-multiple'
	mdw-iconPosition='left'
	mdw-autoLockAfter='10'
	mdw-lockIconColor='#mdwTheme:vis-materialdesign.0.colors.button.lock_icon'
	mdw-lockFilterGrayscale='30'
	mdw-oid0='0_userdata.0.MDW.Buttons.multiState.bool'
	mdw-value0='true'
	mdw-delayInMs0='0'
	mdw-oid1='0_userdata.0.MDW.Buttons.number'
	mdw-value1='66'
	mdw-delayInMs1='0'
></div>
```

</details>

### Добавление
#### Настройки редактора
Настройки, не указанные в таблице ниже, не требуют пояснений.

<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание </th></tr></thead><tbody><tr><td rowspan=2><img src="doc/en/media/button_addition_common.png"></td><td> значение</td><td> стоимость, которую нужно добавить или вычесть</td></tr><tr><td> мин Макс</td><td> минимальное / максимальное значение, до которого может происходить сложение или вычитание</td></tr></tbody></table>

#### Свойства HTML
Следующие свойства могут использоваться как [HTML-виджеты](#html-widgets).

<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> mdw-тип</td><td> Тип виджета</td><td> нить</td><td> добавление_по умолчанию</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Общий</b></i></td></tr><tr><td> mdw-oid</td><td> ID объекта</td><td> нить</td><td></tr><tr><td> mdw-buttonStyle</td><td> стиль кнопки</td><td> нить</td><td> текст | поднял | не повышенный | очерченный</tr><tr><td> mdw-значение</td><td> значение</td><td> нить</td><td></tr><tr><td> mdw-minmax</td><td> мин Макс</td><td> нить</td><td></tr><tr><td> mdw-vibrateOnMobilDevices</td><td> вибрировать на мобильных устройствах [ах]</td><td> номер</td><td></tr><tr><td> mdw-debug</td><td> отлаживать</td><td> логический</td><td> ложь | правда</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>маркировка</b></i></td></tr><tr><td> mdw-buttontext</td><td> Текст кнопки</td><td> нить</td><td></tr><tr><td> mdw-textFontFamily</td><td> шрифт</td><td> нить</td><td></tr><tr><td> mdw-textFontSize</td><td> размер текста</td><td> номер</td><td></tr><tr><td> mdw-labelWidth</td><td> ширина текста</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>цвета</b></i></td></tr><tr><td> mdw-mdwButtonPrimaryColor</td><td> Основной цвет</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-mdwButtonSecondaryColor</td><td> вторичный цвет</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-mdwButtonColorPress</td><td> цвет нажат</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>икона</b></i></td></tr><tr><td> mdw-изображение</td><td> Изображение</td><td> нить</td><td></tr><tr><td> mdw-imageColor</td><td> цвет изображения</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-iconPosition</td><td> положение изображения</td><td> нить</td><td> слева | верно</tr><tr><td> mdw-iconHeight</td><td> высота изображения</td><td> номер</td><td></tr></tbody></table>

<! - опустить в toc ->

##### Свойства HTML - пример
<details>

```
<div class='vis-widget materialdesign-widget materialdesign-button materialdesign-button-html-element'
	style='width: 100%; height: 100%; position: relative; padding: 0px;'
	mdw-type='addition_default'
	mdw-oid='0_userdata.0.MDW.Buttons.number'
	mdw-buttonStyle='raised'
	mdw-value='1'
	mdw-minmax='100'
	mdw-vibrateOnMobilDevices='50'
	mdw-buttontext=' Addition'
	mdw-textFontFamily='#mdwTheme:vis-materialdesign.0.fonts.button.default.text'
	mdw-textFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.button.default.text'
	mdw-mdwButtonPrimaryColor='#mdwTheme:vis-materialdesign.0.colors.button.default.primary'
	mdw-mdwButtonSecondaryColor='#mdwTheme:vis-materialdesign.0.colors.button.default.secondary'
	mdw-image='plus'
	mdw-iconPosition='left'
></div>
```

</details>

### Переключать
#### Настройки редактора
Настройки, не указанные в таблице ниже, не требуют пояснений.

подлежит уточнению

#### Свойства HTML
Следующие свойства могут использоваться как [HTML-виджеты](#html-widgets).

<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> mdw-тип</td><td> Тип виджета</td><td> нить</td><td> toggle_default</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Общий</b></i></td></tr><tr><td> mdw-oid</td><td> ID объекта</td><td> нить</td><td></tr><tr><td> mdw-buttonStyle</td><td> стиль кнопки</td><td> нить</td><td> текст | поднял | не повышенный | очерченный</tr><tr><td> mdw-readOnly</td><td> только чтение</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-toggleType</td><td> тип переключения</td><td> нить</td><td> логическое | значение</tr><tr><td> mdw-pushButton</td><td> нажать кнопку</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-valueOff</td><td> значение для выкл.</td><td> нить</td><td></tr><tr><td> mdw-valueOn</td><td> значение для</td><td> нить</td><td></tr><tr><td> mdw-stateIfNotTrueValue</td><td> указать, если значение не равно условию &quot;включено&quot;</td><td> нить</td><td> на | выключенный</tr><tr><td> mdw-vibrateOnMobilDevices</td><td> вибрировать на мобильных устройствах [ах]</td><td> номер</td><td></tr><tr><td> mdw-debug</td><td> отлаживать</td><td> логический</td><td> ложь | правда</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>маркировка</b></i></td></tr><tr><td> mdw-buttontext</td><td> Текст кнопки</td><td> нить</td><td></tr><tr><td> mdw-labelTrue</td><td> Ярлык верно</td><td> нить</td><td></tr><tr><td> mdw-labelColorFalse</td><td> цвет этикетки</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-labelColorTrue</td><td> цвет активной метки</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-textFontFamily</td><td> шрифт</td><td> нить</td><td></tr><tr><td> mdw-textFontSize</td><td> размер текста</td><td> номер</td><td></tr><tr><td> mdw-labelWidth</td><td> ширина текста</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>цвета</b></i></td></tr><tr><td> mdw-mdwButtonPrimaryColor</td><td> Основной цвет</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-mdwButtonSecondaryColor</td><td> вторичный цвет</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-mdwButtonColorPress</td><td> цвет нажат</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-colorBgFalse</td><td> задний план</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-colorBgTrue</td><td> активный фон</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>икона</b></i></td></tr><tr><td> mdw-изображение</td><td> Изображение</td><td> нить</td><td></tr><tr><td> mdw-imageColor</td><td> цвет изображения</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-imageTrue</td><td> активное изображение</td><td> нить</td><td></tr><tr><td> mdw-imageTrueColor</td><td> цвет активного изображения</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-iconPosition</td><td> положение изображения</td><td> нить</td><td> слева | верно</tr><tr><td> mdw-iconHeight</td><td> высота изображения</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>Блокировка</b></i></td></tr><tr><td> mdw-lockEnabled</td><td> включить блокировку</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-autoLockAfter</td><td> автоматическая блокировка через [с]</td><td> номер</td><td></tr><tr><td> mdw-lockIcon</td><td> икона</td><td> нить</td><td></tr><tr><td> mdw-lockIconSize</td><td> размер значка</td><td> номер</td><td></tr><tr><td> mdw-lockIconColor</td><td> цвет значка</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-lockFilterGrayscale</td><td> серый фильтр, если заблокирован</td><td> номер</td><td></tr></tbody></table>

<! - опустить в toc ->

##### Свойства HTML - пример
<details>

```
<div class='vis-widget materialdesign-widget materialdesign-button materialdesign-button-html-element'
	style='width: 100%; height: 100%; position: relative; padding: 0px;'
	mdw-type='toggle_default'
	mdw-oid='0_userdata.0.MDW.Buttons.multiState.bool'
	mdw-buttonStyle='raised'
	mdw-toggleType='boolean'
	mdw-stateIfNotTrueValue='on'
	mdw-vibrateOnMobilDevices='50'
	mdw-buttontext='off'
	mdw-labelTrue='on'
	mdw-textFontFamily='#mdwTheme:vis-materialdesign.0.fonts.button.default.text'
	mdw-textFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.button.default.text'
	mdw-mdwButtonPrimaryColor='#mdwTheme:vis-materialdesign.0.colors.button.default.primary'
	mdw-mdwButtonSecondaryColor='#mdwTheme:vis-materialdesign.0.colors.button.default.secondary'
	mdw-colorBgTrue='green'
	mdw-image='checkbox-blank-outline'
	mdw-imageTrue='checkbox-marked'
	mdw-iconPosition='left'
	mdw-autoLockAfter='4'
	mdw-lockIconColor='#mdwTheme:vis-materialdesign.0.colors.button.lock_icon'
	mdw-lockFilterGrayscale='30'
></div>
```

</details>

## Кнопки вертикальные
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/buttons_vertical.gif)

### Навигация
#### Настройки редактора
Настройки, не указанные в таблице ниже, не требуют пояснений.

<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание </th></tr></thead><tbody><tr><td rowspan=1><img src="doc/en/media/button_navigation_common.png"></td><td>Просмотр для навигации</td><td> название представления для навигации</td></tr></tbody></table>

#### Свойства HTML
Следующие свойства могут использоваться как [HTML-виджеты](#html-widgets).

<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> mdw-тип</td><td> Тип виджета</td><td> нить</td><td> navigation_vertical</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Общий</b></i></td></tr><tr><td> mdw-buttonStyle</td><td> стиль кнопки</td><td> нить</td><td> текст | поднял | не повышенный | очерченный</tr><tr><td> mdw-nav_view</td><td> Просмотр для навигации</td><td> взгляды</td><td></tr><tr><td> mdw-vibrateOnMobilDevices</td><td> вибрировать на мобильных устройствах [ах]</td><td> номер</td><td></tr><tr><td> mdw-debug</td><td> отлаживать</td><td> логический</td><td> ложь | правда</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>маркировка</b></i></td></tr><tr><td> mdw-buttontext</td><td> Текст кнопки</td><td> нить</td><td></tr><tr><td> mdw-textFontFamily</td><td> шрифт</td><td> нить</td><td></tr><tr><td> mdw-textFontSize</td><td> размер текста</td><td> номер</td><td></tr><tr><td> mdw-alignment</td><td> выравнивание</td><td> нить</td><td> гибкий старт | центр | гибкий конец</tr><tr><td> mdw-distanceBetweenTextAndImage</td><td> расстояние между текстом и изображением</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>цвета</b></i></td></tr><tr><td> mdw-mdwButtonPrimaryColor</td><td> Основной цвет</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-mdwButtonSecondaryColor</td><td> вторичный цвет</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-mdwButtonColorPress</td><td> цвет нажат</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>икона</b></i></td></tr><tr><td> mdw-изображение</td><td> Изображение</td><td> нить</td><td></tr><tr><td> mdw-imageColor</td><td> цвет изображения</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-iconPosition</td><td> положение изображения</td><td> нить</td><td> наверх | Нижний</tr><tr><td> mdw-iconHeight</td><td> высота изображения</td><td> номер</td><td></tr></tbody></table>

<! - опустить в toc ->

##### Свойства HTML - пример
<details>

```
<div class='vis-widget materialdesign-widget materialdesign-button materialdesign-button-html-element'
	style='width: 100%; height: 100%; position: relative; padding: 0px;'
	mdw-type='navigation_vertical'
	mdw-buttonStyle='raised'
	mdw-nav_view='progress'
	mdw-vibrateOnMobilDevices='50'
	mdw-buttontext='Navigation'
	mdw-textFontFamily='#mdwTheme:vis-materialdesign.0.fonts.button.vertical.text'
	mdw-textFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.button.vertical.text'
	mdw-alignment='center'
	mdw-mdwButtonPrimaryColor='#mdwTheme:vis-materialdesign.0.colors.button.vertical.primary'
	mdw-mdwButtonSecondaryColor='#mdwTheme:vis-materialdesign.0.colors.button.vertical.secondary'
	mdw-image='navigation'
	mdw-iconPosition='top'
	mdw-iconHeight='26'
></div>
```

</details>

### Ссылка на сайт
#### Настройки редактора
Настройки, не указанные в таблице ниже, не требуют пояснений.

<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание</th></tr></thead><tbody><tr><td rowspan=2><img src="doc/en/media/button_link_common.png"></td><td> Ссылка на сайт</td><td> URL для открытия</td></tr><tr><td> открыть в новом окне</td><td> открыть ссылку в новом окне / вкладке</td></tr></tbody></table>

#### Свойства HTML
Следующие свойства могут использоваться как [HTML-виджеты](#html-widgets).

<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> mdw-тип</td><td> Тип виджета</td><td> нить</td><td> link_vertical</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Общий</b></i></td></tr><tr><td> mdw-buttonStyle</td><td> стиль кнопки</td><td> нить</td><td> текст | поднял | не повышенный | очерченный</tr><tr><td> mdw-href</td><td> Ссылка на сайт</td><td> url</td><td></tr><tr><td> mdw-openNewWindow</td><td> открыть в новом окне</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-vibrateOnMobilDevices</td><td> вибрировать на мобильных устройствах [ах]</td><td> номер</td><td></tr><tr><td> mdw-debug</td><td> отлаживать</td><td> логический</td><td> ложь | правда</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>маркировка</b></i></td></tr><tr><td> mdw-buttontext</td><td> Текст кнопки</td><td> нить</td><td></tr><tr><td> mdw-textFontFamily</td><td> шрифт</td><td> нить</td><td></tr><tr><td> mdw-textFontSize</td><td> размер текста</td><td> номер</td><td></tr><tr><td> mdw-alignment</td><td> выравнивание</td><td> нить</td><td> гибкий старт | центр | гибкий конец</tr><tr><td> mdw-distanceBetweenTextAndImage</td><td> расстояние между текстом и изображением</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>цвета</b></i></td></tr><tr><td> mdw-mdwButtonPrimaryColor</td><td> Основной цвет</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-mdwButtonSecondaryColor</td><td> вторичный цвет</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-mdwButtonColorPress</td><td> цвет нажат</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>икона</b></i></td></tr><tr><td> mdw-изображение</td><td> Изображение</td><td> нить</td><td></tr><tr><td> mdw-imageColor</td><td> цвет изображения</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-iconPosition</td><td> положение изображения</td><td> нить</td><td> наверх | Нижний</tr><tr><td> mdw-iconHeight</td><td> высота изображения</td><td> номер</td><td></tr></tbody></table>

<! - опустить в toc ->

##### Свойства HTML - пример
<details>

```
<div class='vis-widget materialdesign-widget materialdesign-button materialdesign-button-html-element'
	style='width: 100%; height: 100%; position: relative; padding: 0px;'
	mdw-type='link_vertical'
	mdw-debug='true'
	mdw-buttonStyle='raised'
	mdw-href='https://github.com/Scrounger/ioBroker.vis-materialdesign'
	mdw-openNewWindow='true'
	mdw-vibrateOnMobilDevices='50'
	mdw-buttontext='Link'
	mdw-textFontFamily='#mdwTheme:vis-materialdesign.0.fonts.button.vertical.text'
	mdw-textFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.button.vertical.text'
	mdw-alignment='center'
	mdw-mdwButtonPrimaryColor='#mdwTheme:vis-materialdesign.0.colors.button.vertical.primary'
	mdw-mdwButtonSecondaryColor='#mdwTheme:vis-materialdesign.0.colors.button.vertical.secondary'
	mdw-image='link'
	mdw-iconPosition='top'
	mdw-iconHeight='26'
></div>
```

</details>

### Состояние
#### Настройки редактора
Настройки, не указанные в таблице ниже, не требуют пояснений.

<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание</th></tr></thead><tbody><tr><td rowspan=1><img src="doc/en/media/button_state_common.png"></td><td>значение</td><td> значение для установки</td></tr></tbody></table>

#### Свойства HTML
Следующие свойства могут использоваться как [HTML-виджеты](#html-widgets).

<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> mdw-тип</td><td> Тип виджета</td><td> нить</td><td> state_vertical</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Общий</b></i></td></tr><tr><td> mdw-oid</td><td> ID объекта</td><td> нить</td><td></tr><tr><td> mdw-buttonStyle</td><td> стиль кнопки</td><td> нить</td><td> текст | поднял | не повышенный | очерченный</tr><tr><td> mdw-значение</td><td> значение</td><td> нить</td><td></tr><tr><td> mdw-vibrateOnMobilDevices</td><td> вибрировать на мобильных устройствах [ах]</td><td> номер</td><td></tr><tr><td> mdw-debug</td><td> отлаживать</td><td> логический</td><td> ложь | правда</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>маркировка</b></i></td></tr><tr><td> mdw-buttontext</td><td> Текст кнопки</td><td> нить</td><td></tr><tr><td> mdw-textFontFamily</td><td> шрифт</td><td> нить</td><td></tr><tr><td> mdw-textFontSize</td><td> размер текста</td><td> номер</td><td></tr><tr><td> mdw-alignment</td><td> выравнивание</td><td> нить</td><td> гибкий старт | центр | гибкий конец</tr><tr><td> mdw-distanceBetweenTextAndImage</td><td> расстояние между текстом и изображением</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>цвета</b></i></td></tr><tr><td> mdw-mdwButtonPrimaryColor</td><td> Основной цвет</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-mdwButtonSecondaryColor</td><td> вторичный цвет</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-mdwButtonColorPress</td><td> цвет нажат</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>икона</b></i></td></tr><tr><td> mdw-изображение</td><td> Изображение</td><td> нить</td><td></tr><tr><td> mdw-imageColor</td><td> цвет изображения</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-iconPosition</td><td> положение изображения</td><td> нить</td><td> наверх | Нижний</tr><tr><td> mdw-iconHeight</td><td> высота изображения</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>Блокировка</b></i></td></tr><tr><td> mdw-lockEnabled</td><td> включить блокировку</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-autoLockAfter</td><td> автоматическая блокировка через [с]</td><td> номер</td><td></tr><tr><td> mdw-lockIcon</td><td> икона</td><td> нить</td><td></tr><tr><td> mdw-lockIconTop</td><td> расстояние символа сверху [%]</td><td> номер</td><td></tr><tr><td> mdw-lockIconLeft</td><td> расстояние символа слева [%]</td><td> номер</td><td></tr><tr><td> mdw-lockIconSize</td><td> размер значка</td><td> номер</td><td></tr><tr><td> mdw-lockIconColor</td><td> цвет значка</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-lockFilterGrayscale</td><td> серый фильтр, если заблокирован</td><td> номер</td><td></tr></tbody></table>

<! - опустить в toc ->

##### Свойства HTML - пример
<details>

```
<div class='vis-widget materialdesign-widget materialdesign-button materialdesign-button-html-element'
	style='width: 100%; height: 100%; position: relative; padding: 0px;'
	mdw-type='state_vertical'
	mdw-oid='0_userdata.0.MDW.Buttons.number'
	mdw-buttonStyle='raised'
	mdw-value='41'
	mdw-vibrateOnMobilDevices='50'
	mdw-buttontext='State'
	mdw-textFontFamily='#mdwTheme:vis-materialdesign.0.fonts.button.vertical.text'
	mdw-textFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.button.vertical.text'
	mdw-alignment='center'
	mdw-mdwButtonPrimaryColor='#mdwTheme:vis-materialdesign.0.colors.button.vertical.primary'
	mdw-mdwButtonSecondaryColor='#mdwTheme:vis-materialdesign.0.colors.button.vertical.secondary'
	mdw-image='pencil'
	mdw-iconPosition='top'
	mdw-iconHeight='26'
	mdw-autoLockAfter='10'
	mdw-lockIconTop='5'
	mdw-lockIconLeft='5'
	mdw-lockIconColor='#mdwTheme:vis-materialdesign.0.colors.button.lock_icon'
	mdw-lockFilterGrayscale='30'
></div>
```

</details>

### Несколько состояний
#### Настройки редактора
Настройки, не указанные в таблице ниже, не требуют пояснений.

<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание </th></tr></thead><tbody><tr><td rowspan=3><img src="doc/en/media/button_multiState_Objeckt_id_x.png"></td><td> ID объекта [x]</td><td> id объекта, из которого должно быть установлено значение</td></tr><tr><td> значение [x]</td><td> значение, которое нужно установить</td></tr><tr><td> задержка [мс] [x]</td><td> задержка до тех пор, пока значение не будет установлено</td></tr></tbody></table>

#### Свойства HTML
Следующие свойства могут использоваться как [HTML-виджеты](#html-widgets).

<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> mdw-тип</td><td> Тип виджета</td><td> нить</td><td> multiState_vertical</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Общий</b></i></td></tr><tr><td> mdw-countOids</td><td> количество идентификаторов объекта</td><td> номер</td><td></tr><tr><td> mdw-buttonStyle</td><td> стиль кнопки</td><td> нить</td><td> текст | поднял | не повышенный | очерченный</tr><tr><td> mdw-vibrateOnMobilDevices</td><td> вибрировать на мобильных устройствах [ах]</td><td> номер</td><td></tr><tr><td> mdw-debug</td><td> отлаживать</td><td> логический</td><td> ложь | правда</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Идентификатор объекта [x]</b></i></td></tr><tr><td> mdw-oid [x]</td><td> ID объекта</td><td> нить</td><td></tr><tr><td> mdw-значение [x]</td><td> значение</td><td> нить</td><td></tr><tr><td> mdw-delayInMs [x]</td><td> задержка [мс]</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>маркировка</b></i></td></tr><tr><td> mdw-buttontext</td><td> Текст кнопки</td><td> нить</td><td></tr><tr><td> mdw-textFontFamily</td><td> шрифт</td><td> нить</td><td></tr><tr><td> mdw-textFontSize</td><td> размер текста</td><td> номер</td><td></tr><tr><td> mdw-alignment</td><td> выравнивание</td><td> нить</td><td> гибкий старт | центр | гибкий конец</tr><tr><td> mdw-distanceBetweenTextAndImage</td><td> расстояние между текстом и изображением</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>цвета</b></i></td></tr><tr><td> mdw-mdwButtonPrimaryColor</td><td> Основной цвет</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-mdwButtonSecondaryColor</td><td> вторичный цвет</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-mdwButtonColorPress</td><td> цвет нажат</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>икона</b></i></td></tr><tr><td> mdw-изображение</td><td> Изображение</td><td> нить</td><td></tr><tr><td> mdw-imageColor</td><td> цвет изображения</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-iconPosition</td><td> положение изображения</td><td> нить</td><td> наверх | Нижний</tr><tr><td> mdw-iconHeight</td><td> высота изображения</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>Блокировка</b></i></td></tr><tr><td> mdw-lockEnabled</td><td> включить блокировку</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-autoLockAfter</td><td> автоматическая блокировка через [с]</td><td> номер</td><td></tr><tr><td> mdw-lockIcon</td><td> икона</td><td> нить</td><td></tr><tr><td> mdw-lockIconTop</td><td> расстояние символа сверху [%]</td><td> номер</td><td></tr><tr><td> mdw-lockIconLeft</td><td> расстояние символа слева [%]</td><td> номер</td><td></tr><tr><td> mdw-lockIconSize</td><td> размер значка</td><td> номер</td><td></tr><tr><td> mdw-lockIconColor</td><td> цвет значка</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-lockFilterGrayscale</td><td> серый фильтр, если заблокирован</td><td> номер</td><td></tr></tbody></table>

<! - опустить в toc ->

##### Свойства HTML - пример
<details>

```
<div class='vis-widget materialdesign-widget materialdesign-button materialdesign-button-html-element'
	style='width: 100%; height: 100%; position: relative; padding: 0px;'
	mdw-type='multiState_vertical'
	mdw-countOids='1'
	mdw-buttonStyle='raised'
	mdw-vibrateOnMobilDevices='50'
	mdw-buttontext='Multi State'
	mdw-textFontFamily='#mdwTheme:vis-materialdesign.0.fonts.button.vertical.text'
	mdw-textFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.button.vertical.text'
	mdw-alignment='center'
	mdw-mdwButtonPrimaryColor='#mdwTheme:vis-materialdesign.0.colors.button.vertical.primary'
	mdw-mdwButtonSecondaryColor='#mdwTheme:vis-materialdesign.0.colors.button.vertical.secondary'
	mdw-image='pencil-box-multiple'
	mdw-iconPosition='top'
	mdw-iconHeight='26'
	mdw-autoLockAfter='10'
	mdw-lockIconTop='5'
	mdw-lockIconLeft='5'
	mdw-lockIconColor='#mdwTheme:vis-materialdesign.0.colors.button.lock_icon'
	mdw-lockFilterGrayscale='30'
	mdw-oid0='0_userdata.0.MDW.Buttons.multiState.bool'
	mdw-value0='true'
	mdw-delayInMs0='0'
	mdw-oid1='0_userdata.0.MDW.Buttons.number'
	mdw-value1='33'
	mdw-delayInMs1='0'
></div>
```

</details>

### Добавление
#### Настройки редактора
Настройки, не указанные в таблице ниже, не требуют пояснений.

<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание </th></tr></thead><tbody><tr><td rowspan=2><img src="doc/en/media/button_addition_common.png"></td><td> значение</td><td> стоимость, которую нужно добавить или вычесть</td></tr><tr><td> мин Макс</td><td> минимальное / максимальное значение, до которого может происходить сложение или вычитание</td></tr></tbody></table>

#### Свойства HTML
Следующие свойства могут использоваться как [HTML-виджеты](#html-widgets).

<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> mdw-тип</td><td> Тип виджета</td><td> нить</td><td> добавление_вертикальное</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Общий</b></i></td></tr><tr><td> mdw-oid</td><td> ID объекта</td><td> нить</td><td></tr><tr><td> mdw-buttonStyle</td><td> стиль кнопки</td><td> нить</td><td> текст | поднял | не повышенный | очерченный</tr><tr><td> mdw-значение</td><td> значение</td><td> нить</td><td></tr><tr><td> mdw-minmax</td><td> мин Макс</td><td> нить</td><td></tr><tr><td> mdw-vibrateOnMobilDevices</td><td> вибрировать на мобильных устройствах [ах]</td><td> номер</td><td></tr><tr><td> mdw-debug</td><td> отлаживать</td><td> логический</td><td> ложь | правда</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>маркировка</b></i></td></tr><tr><td> mdw-buttontext</td><td> Текст кнопки</td><td> нить</td><td></tr><tr><td> mdw-textFontFamily</td><td> шрифт</td><td> нить</td><td></tr><tr><td> mdw-textFontSize</td><td> размер текста</td><td> номер</td><td></tr><tr><td> mdw-alignment</td><td> выравнивание</td><td> нить</td><td> гибкий старт | центр | гибкий конец</tr><tr><td> mdw-distanceBetweenTextAndImage</td><td> расстояние между текстом и изображением</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>цвета</b></i></td></tr><tr><td> mdw-mdwButtonPrimaryColor</td><td> Основной цвет</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-mdwButtonSecondaryColor</td><td> вторичный цвет</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-mdwButtonColorPress</td><td> цвет нажат</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>икона</b></i></td></tr><tr><td> mdw-изображение</td><td> Изображение</td><td> нить</td><td></tr><tr><td> mdw-imageColor</td><td> цвет изображения</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-iconPosition</td><td> положение изображения</td><td> нить</td><td> наверх | Нижний</tr><tr><td> mdw-iconHeight</td><td> высота изображения</td><td> номер</td><td></tr></tbody></table>

<! - опустить в toc ->

##### Свойства HTML - пример
<details>

```
<div class='vis-widget materialdesign-widget materialdesign-button materialdesign-button-html-element'
	style='width: 100%; height: 100%; position: relative; padding: 0px;'
	mdw-type='addition_vertical'
	mdw-oid='0_userdata.0.MDW.Buttons.number'
	mdw-buttonStyle='raised'
	mdw-value='-1'
	mdw-minmax='0'
	mdw-vibrateOnMobilDevices='50'
	mdw-buttontext='Addition'
	mdw-textFontFamily='#mdwTheme:vis-materialdesign.0.fonts.button.vertical.text'
	mdw-textFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.button.vertical.text'
	mdw-alignment='center'
	mdw-mdwButtonPrimaryColor='#mdwTheme:vis-materialdesign.0.colors.button.vertical.primary'
	mdw-mdwButtonSecondaryColor='#mdwTheme:vis-materialdesign.0.colors.button.vertical.secondary'
	mdw-image='minus'
	mdw-iconPosition='top'
	mdw-iconHeight='26'
></div>
```

</details>

### Переключать
#### Настройки редактора
Настройки, не указанные в таблице ниже, не требуют пояснений.

подлежит уточнению

#### Свойства HTML
Следующие свойства могут использоваться как [HTML-виджеты](#html-widgets).

<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> mdw-тип</td><td> Тип виджета</td><td> нить</td><td> toggle_vertical</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Общий</b></i></td></tr><tr><td> mdw-oid</td><td> ID объекта</td><td> нить</td><td></tr><tr><td> mdw-buttonStyle</td><td> стиль кнопки</td><td> нить</td><td> текст | поднял | не повышенный | очерченный</tr><tr><td> mdw-readOnly</td><td> только чтение</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-toggleType</td><td> тип переключения</td><td> нить</td><td> логическое | значение</tr><tr><td> mdw-pushButton</td><td> нажать кнопку</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-valueOff</td><td> значение для выкл.</td><td> нить</td><td></tr><tr><td> mdw-valueOn</td><td> значение для</td><td> нить</td><td></tr><tr><td> mdw-stateIfNotTrueValue</td><td> указать, если значение не равно условию &quot;включено&quot;</td><td> нить</td><td> на | выключенный</tr><tr><td> mdw-vibrateOnMobilDevices</td><td> вибрировать на мобильных устройствах [ах]</td><td> номер</td><td></tr><tr><td> mdw-debug</td><td> отлаживать</td><td> логический</td><td> ложь | правда</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>маркировка</b></i></td></tr><tr><td> mdw-buttontext</td><td> Текст кнопки</td><td> нить</td><td></tr><tr><td> mdw-labelTrue</td><td> Ярлык верно</td><td> нить</td><td></tr><tr><td> mdw-labelColorFalse</td><td> цвет этикетки</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-labelColorTrue</td><td> цвет активной метки</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-textFontFamily</td><td> шрифт</td><td> нить</td><td></tr><tr><td> mdw-textFontSize</td><td> размер текста</td><td> номер</td><td></tr><tr><td> mdw-alignment</td><td> выравнивание</td><td> нить</td><td> гибкий старт | центр | гибкий конец</tr><tr><td> mdw-distanceBetweenTextAndImage</td><td> расстояние между текстом и изображением</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>цвета</b></i></td></tr><tr><td> mdw-mdwButtonPrimaryColor</td><td> Основной цвет</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-mdwButtonSecondaryColor</td><td> вторичный цвет</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-colorBgFalse</td><td> задний план</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-colorBgTrue</td><td> активный фон</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>икона</b></i></td></tr><tr><td> mdw-изображение</td><td> Изображение</td><td> нить</td><td></tr><tr><td> mdw-imageColor</td><td> цвет изображения</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-imageTrue</td><td> активное изображение</td><td> нить</td><td></tr><tr><td> mdw-imageTrueColor</td><td> цвет активного изображения</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-iconPosition</td><td> положение изображения</td><td> нить</td><td> наверх | Нижний</tr><tr><td> mdw-iconHeight</td><td> высота изображения</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>Блокировка</b></i></td></tr><tr><td> mdw-lockEnabled</td><td> включить блокировку</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-autoLockAfter</td><td> автоматическая блокировка через [с]</td><td> номер</td><td></tr><tr><td> mdw-lockIcon</td><td> икона</td><td> нить</td><td></tr><tr><td> mdw-lockIconTop</td><td> расстояние символа сверху [%]</td><td> номер</td><td></tr><tr><td> mdw-lockIconLeft</td><td> расстояние символа слева [%]</td><td> номер</td><td></tr><tr><td> mdw-lockIconSize</td><td> размер значка</td><td> номер</td><td></tr><tr><td> mdw-lockIconColor</td><td> цвет значка</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-lockFilterGrayscale</td><td> серый фильтр, если заблокирован</td><td> номер</td><td></tr></tbody></table>

<! - опустить в toc ->

##### Свойства HTML - пример
<details>

```
<div class='vis-widget materialdesign-widget materialdesign-button materialdesign-button-html-element'
	style='width: 100%; height: 100%; position: relative; padding: 0px;'
	mdw-type='toggle_vertical'
	mdw-oid='0_userdata.0.MDW.Buttons.multiState.bool'
	mdw-buttonStyle='raised'
	mdw-toggleType='boolean'
	mdw-pushButton='true'
	mdw-stateIfNotTrueValue='on'
	mdw-vibrateOnMobilDevices='50'
	mdw-buttontext='off push'
	mdw-labelTrue='on push'
	mdw-textFontFamily='#mdwTheme:vis-materialdesign.0.fonts.button.vertical.text'
	mdw-textFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.button.vertical.text'
	mdw-alignment='center'
	mdw-mdwButtonPrimaryColor='#mdwTheme:vis-materialdesign.0.colors.button.vertical.primary'
	mdw-mdwButtonSecondaryColor='#mdwTheme:vis-materialdesign.0.colors.button.vertical.secondary'
	mdw-colorBgTrue='green'
	mdw-image='checkbox-blank-outline'
	mdw-imageTrue='checkbox-marked'
	mdw-iconPosition='top'
	mdw-iconHeight='26'
	mdw-autoLockAfter='4'
	mdw-lockIconTop='5'
	mdw-lockIconLeft='5'
	mdw-lockIconSize='24'
	mdw-lockIconColor='#mdwTheme:vis-materialdesign.0.colors.button.lock_icon'
	mdw-lockFilterGrayscale='100'
></div>
```

</details>

## Кнопки со значками
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/buttons_icons.gif)

### Навигация
#### Настройки редактора
Настройки, не указанные в таблице ниже, не требуют пояснений.

<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание </th></tr></thead><tbody><tr><td rowspan=1><img src="doc/en/media/button_navigation_common.png"></td><td>Просмотр для навигации</td><td> название представления для навигации</td></tr></tbody></table>

#### Свойства HTML
Следующие свойства могут использоваться как [HTML-виджеты](#html-widgets).

<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> mdw-тип</td><td> Тип виджета</td><td> нить</td><td> Navigation_icon</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Общий</b></i></td></tr><tr><td> mdw-nav_view</td><td> Просмотр для навигации</td><td> взгляды</td><td></tr><tr><td> mdw-vibrateOnMobilDevices</td><td> вибрировать на мобильных устройствах [ах]</td><td> номер</td><td></tr><tr><td> mdw-debug</td><td> отлаживать</td><td> логический</td><td> ложь | правда</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>икона</b></i></td></tr><tr><td> mdw-изображение</td><td> Изображение</td><td> нить</td><td></tr><tr><td> mdw-imageColor</td><td> цвет изображения</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-iconHeight</td><td> высота изображения</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>цвета</b></i></td></tr><tr><td> mdw-colorBgFalse</td><td> задний план</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-colorPress</td><td> цвет нажат</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr></tbody></table>

<! - опустить в toc ->

##### Свойства HTML - пример
<details>

```
<div class='vis-widget materialdesign-widget materialdesign-icon-button materialdesign-button-html-element'
	style='width: 48px; height: 48px; position: relative; padding: 0px;'
	mdw-type='navigation_icon'
	mdw-nav_view='progress'
	mdw-vibrateOnMobilDevices='50'
	mdw-image='navigation'
	mdw-imageColor='#mdwTheme:vis-materialdesign.0.colors.button.icon.icon_off'
	mdw-colorBgFalse='#mdwTheme:vis-materialdesign.0.colors.button.icon.background_off'
	mdw-colorPress='#mdwTheme:vis-materialdesign.0.colors.button.icon.pressed'
></div>
```

</details>

### Ссылка на сайт
#### Настройки редактора
Настройки, не указанные в таблице ниже, не требуют пояснений.

<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание</th></tr></thead><tbody><tr><td rowspan=2><img src="doc/en/media/button_link_common.png"></td><td> Ссылка на сайт</td><td> URL для открытия</td></tr><tr><td> открыть в новом окне</td><td> открыть ссылку в новом окне / вкладке</td></tr></tbody></table>

#### Свойства HTML
Следующие свойства могут использоваться как [HTML-виджеты](#html-widgets).

<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> mdw-тип</td><td> Тип виджета</td><td> нить</td><td> link_icon</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Общий</b></i></td></tr><tr><td> mdw-href</td><td> Ссылка на сайт</td><td> url</td><td></tr><tr><td> mdw-openNewWindow</td><td> открыть в новом окне</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-vibrateOnMobilDevices</td><td> вибрировать на мобильных устройствах [ах]</td><td> номер</td><td></tr><tr><td> mdw-debug</td><td> отлаживать</td><td> логический</td><td> ложь | правда</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>икона</b></i></td></tr><tr><td> mdw-изображение</td><td> Изображение</td><td> нить</td><td></tr><tr><td> mdw-imageColor</td><td> цвет изображения</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-iconHeight</td><td> высота изображения</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>цвета</b></i></td></tr><tr><td> mdw-colorBgFalse</td><td> задний план</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-colorPress</td><td> цвет нажат</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr></tbody></table>

<! - опустить в toc ->

##### Свойства HTML - пример
<details>

```
<div class='vis-widget materialdesign-widget materialdesign-icon-button materialdesign-button-html-element'
	style='width: 48px; height: 48px; position: relative; padding: 0px;'
	mdw-type='link_icon'
	mdw-href='https://github.com/Scrounger/ioBroker.vis-materialdesign'
	mdw-openNewWindow='true'
	mdw-vibrateOnMobilDevices='50'
	mdw-image='link'
	mdw-imageColor='#mdwTheme:vis-materialdesign.0.colors.button.icon.icon_off'
	mdw-colorBgFalse='#mdwTheme:vis-materialdesign.0.colors.button.icon.background_off'
	mdw-colorPress='#mdwTheme:vis-materialdesign.0.colors.button.icon.pressed'
></div>
```

</details>

### Состояние
#### Настройки редактора
Настройки, не указанные в таблице ниже, не требуют пояснений.

<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание</th></tr></thead><tbody><tr><td rowspan=1><img src="doc/en/media/button_state_common.png"></td><td>значение</td><td> значение для установки</td></tr></tbody></table>

#### Свойства HTML
Следующие свойства могут использоваться как [HTML-виджеты](#html-widgets).

<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> mdw-тип</td><td> Тип виджета</td><td> нить</td><td> state_icon</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Общий</b></i></td></tr><tr><td> mdw-oid</td><td> ID объекта</td><td> нить</td><td></tr><tr><td> mdw-значение</td><td> значение</td><td> нить</td><td></tr><tr><td> mdw-vibrateOnMobilDevices</td><td> вибрировать на мобильных устройствах [ах]</td><td> номер</td><td></tr><tr><td> mdw-debug</td><td> отлаживать</td><td> логический</td><td> ложь | правда</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>икона</b></i></td></tr><tr><td> mdw-изображение</td><td> Изображение</td><td> нить</td><td></tr><tr><td> mdw-imageColor</td><td> цвет изображения</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-iconHeight</td><td> высота изображения</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>цвета</b></i></td></tr><tr><td> mdw-colorBgFalse</td><td> задний план</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-colorPress</td><td> цвет нажат</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Блокировка</b></i></td></tr><tr><td> mdw-lockEnabled</td><td> включить блокировку</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-autoLockAfter</td><td> автоматическая блокировка через [с]</td><td> номер</td><td></tr><tr><td> mdw-lockIcon</td><td> икона</td><td> нить</td><td></tr><tr><td> mdw-lockIconTop</td><td> расстояние символа сверху [%]</td><td> номер</td><td></tr><tr><td> mdw-lockIconLeft</td><td> расстояние символа слева [%]</td><td> номер</td><td></tr><tr><td> mdw-lockIconSize</td><td> размер значка</td><td> номер</td><td></tr><tr><td> mdw-lockIconColor</td><td> цвет значка</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-lockIconBackground</td><td> lockIconBackground</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-lockBackgroundSizeFactor</td><td> lockBackgroundSizeFactor</td><td> номер</td><td></tr><tr><td> mdw-lockFilterGrayscale</td><td> серый фильтр, если заблокирован</td><td> номер</td><td></tr></tbody></table>

<! - опустить в toc ->

##### Свойства HTML - пример
<details>

```
<div class='vis-widget materialdesign-widget materialdesign-icon-button materialdesign-button-html-element'
	style='width: 48px; height: 48px; position: relative; padding: 0px;'
	mdw-type='state_icon'
	mdw-oid='0_userdata.0.MDW.Buttons.number'
	mdw-value='77'
	mdw-vibrateOnMobilDevices='50'
	mdw-image='pencil'
	mdw-imageColor='#mdwTheme:vis-materialdesign.0.colors.button.icon.icon_off'
	mdw-colorBgFalse='#mdwTheme:vis-materialdesign.0.colors.button.icon.background_off'
	mdw-colorPress='#mdwTheme:vis-materialdesign.0.colors.button.icon.pressed'
	mdw-lockEnabled='true'
	mdw-autoLockAfter='10'
	mdw-lockIconTop='45'
	mdw-lockIconLeft='55'
	mdw-lockIconSize='20'
	mdw-lockIconColor='#mdwTheme:vis-materialdesign.0.colors.button.icon.lock_icon'
	mdw-lockIconBackground='#mdwTheme:vis-materialdesign.0.colors.button.icon.lock_icon_background'
	mdw-lockBackgroundSizeFactor='1'
	mdw-lockFilterGrayscale='30'
></div>
```

</details>

### Несколько состояний
#### Настройки редактора
Настройки, не указанные в таблице ниже, не требуют пояснений.

<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание </th></tr></thead><tbody><tr><td rowspan=3><img src="doc/en/media/button_multiState_Objeckt_id_x.png"></td><td> ID объекта [x]</td><td> id объекта, из которого должно быть установлено значение</td></tr><tr><td> значение [x]</td><td> значение, которое нужно установить</td></tr><tr><td> задержка [мс] [x]</td><td> задержка до тех пор, пока значение не будет установлено</td></tr></tbody></table>

#### Свойства HTML
Следующие свойства могут использоваться как [HTML-виджеты](#html-widgets).

<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> mdw-тип</td><td> Тип виджета</td><td> нить</td><td> multiState_icon</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Общий</b></i></td></tr><tr><td> mdw-countOids</td><td> количество идентификаторов объекта</td><td> номер</td><td></tr><tr><td> mdw-vibrateOnMobilDevices</td><td> вибрировать на мобильных устройствах [ах]</td><td> номер</td><td></tr><tr><td> mdw-debug</td><td> отлаживать</td><td> логический</td><td> ложь | правда</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Идентификатор объекта [x]</b></i></td></tr><tr><td> mdw-oid [x]</td><td> ID объекта</td><td> нить</td><td></tr><tr><td> mdw-значение [x]</td><td> значение</td><td> нить</td><td></tr><tr><td> mdw-delayInMs [x]</td><td> задержка [мс]</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>икона</b></i></td></tr><tr><td> mdw-изображение</td><td> Изображение</td><td> нить</td><td></tr><tr><td> mdw-imageColor</td><td> цвет изображения</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-iconHeight</td><td> высота изображения</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>цвета</b></i></td></tr><tr><td> mdw-colorBgFalse</td><td> задний план</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-colorPress</td><td> цвет нажат</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Блокировка</b></i></td></tr><tr><td> mdw-lockEnabled</td><td> включить блокировку</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-autoLockAfter</td><td> автоматическая блокировка через [с]</td><td> номер</td><td></tr><tr><td> mdw-lockIcon</td><td> икона</td><td> нить</td><td></tr><tr><td> mdw-lockIconTop</td><td> расстояние символа сверху [%]</td><td> номер</td><td></tr><tr><td> mdw-lockIconLeft</td><td> расстояние символа слева [%]</td><td> номер</td><td></tr><tr><td> mdw-lockIconSize</td><td> размер значка</td><td> номер</td><td></tr><tr><td> mdw-lockIconColor</td><td> цвет значка</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-lockIconBackground</td><td> lockIconBackground</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-lockBackgroundSizeFactor</td><td> lockBackgroundSizeFactor</td><td> номер</td><td></tr><tr><td> mdw-lockFilterGrayscale</td><td> серый фильтр, если заблокирован</td><td> номер</td><td></tr></tbody></table>

<! - опустить в toc ->

##### Свойства HTML - пример
<details>

```
<div class='vis-widget materialdesign-widget materialdesign-icon-button materialdesign-button-html-element'
	style='width: 48px; height: 48px; position: relative; padding: 0px;'
	mdw-type='multiState_icon'
	mdw-countOids='1'
	mdw-vibrateOnMobilDevices='50'
	mdw-image='pencil-box-multiple'
	mdw-imageColor='#mdwTheme:vis-materialdesign.0.colors.button.icon.icon_off'
	mdw-colorBgFalse='#mdwTheme:vis-materialdesign.0.colors.button.icon.background_off'
	mdw-colorPress='#mdwTheme:vis-materialdesign.0.colors.button.icon.pressed'
	mdw-autoLockAfter='10'
	mdw-lockIconTop='45'
	mdw-lockIconLeft='55'
	mdw-lockIconSize='20'
	mdw-lockIconColor='#mdwTheme:vis-materialdesign.0.colors.button.icon.lock_icon'
	mdw-lockIconBackground='#mdwTheme:vis-materialdesign.0.colors.button.icon.lock_icon_background'
	mdw-lockBackgroundSizeFactor='1'
	mdw-lockFilterGrayscale='30'
	mdw-oid0='0_userdata.0.MDW.Buttons.number'
	mdw-value0='22'
	mdw-delayInMs0='0'
	mdw-oid1='0_userdata.0.MDW.Buttons.multiState.bool'
	mdw-value1='true'
	mdw-delayInMs1='0'
></div>
```

</details>

### Добавление
#### Настройки редактора
Настройки, не указанные в таблице ниже, не требуют пояснений.

<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание </th></tr></thead><tbody><tr><td rowspan=2><img src="doc/en/media/button_addition_common.png"></td><td> значение</td><td> стоимость, которую нужно добавить или вычесть</td></tr><tr><td> мин Макс</td><td> минимальное / максимальное значение, до которого может происходить сложение или вычитание</td></tr></tbody></table>

#### Свойства HTML
Следующие свойства могут использоваться как [HTML-виджеты](#html-widgets).

<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> mdw-тип</td><td> Тип виджета</td><td> нить</td><td> дополнительный_икон</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Общий</b></i></td></tr><tr><td> mdw-oid</td><td> ID объекта</td><td> нить</td><td></tr><tr><td> mdw-значение</td><td> значение</td><td> нить</td><td></tr><tr><td> mdw-minmax</td><td> мин Макс</td><td> нить</td><td></tr><tr><td> mdw-vibrateOnMobilDevices</td><td> вибрировать на мобильных устройствах [ах]</td><td> номер</td><td></tr><tr><td> mdw-debug</td><td> отлаживать</td><td> логический</td><td> ложь | правда</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>икона</b></i></td></tr><tr><td> mdw-изображение</td><td> Изображение</td><td> нить</td><td></tr><tr><td> mdw-imageColor</td><td> цвет изображения</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-iconHeight</td><td> высота изображения</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>цвета</b></i></td></tr><tr><td> mdw-colorBgFalse</td><td> задний план</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-colorPress</td><td> цвет нажат</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr></tbody></table>

<! - опустить в toc ->

##### Свойства HTML - пример
<details>

```
<div class='vis-widget materialdesign-widget materialdesign-icon-button materialdesign-button-html-element'
	style='width: 48px; height: 48px; position: relative; padding: 0px;'
	mdw-type='addition_icon'
	mdw-oid='0_userdata.0.MDW.Buttons.number'
	mdw-value='1'
	mdw-minmax='100'
	mdw-vibrateOnMobilDevices='50'
	mdw-image='plus'
	mdw-imageColor='#mdwTheme:vis-materialdesign.0.colors.button.icon.icon_off'
	mdw-colorBgFalse='#mdwTheme:vis-materialdesign.0.colors.button.icon.background_off'
	mdw-colorPress='#mdwTheme:vis-materialdesign.0.colors.button.icon.pressed'
></div>
```

</details>

### Переключать
#### Настройки редактора
Настройки, не указанные в таблице ниже, не требуют пояснений.

подлежит уточнению

#### Свойства HTML
Следующие свойства могут использоваться как [HTML-виджеты](#html-widgets).

<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> mdw-тип</td><td> Тип виджета</td><td> нить</td><td> toggle_icon</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Общий</b></i></td></tr><tr><td> mdw-oid</td><td> ID объекта</td><td> нить</td><td></tr><tr><td> mdw-readOnly</td><td> только чтение</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-toggleType</td><td> тип переключения</td><td> нить</td><td> логическое | значение</tr><tr><td> mdw-pushButton</td><td> нажать кнопку</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-valueOff</td><td> значение для выкл.</td><td> нить</td><td></tr><tr><td> mdw-valueOn</td><td> значение для</td><td> нить</td><td></tr><tr><td> mdw-stateIfNotTrueValue</td><td> указать, если значение не равно условию &quot;включено&quot;</td><td> нить</td><td> на | выключенный</tr><tr><td> mdw-vibrateOnMobilDevices</td><td> вибрировать на мобильных устройствах [ах]</td><td> номер</td><td></tr><tr><td> mdw-debug</td><td> отлаживать</td><td> логический</td><td> ложь | правда</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>икона</b></i></td></tr><tr><td> mdw-изображение</td><td> Изображение</td><td> нить</td><td></tr><tr><td> mdw-imageColor</td><td> цвет изображения</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-imageTrue</td><td> активное изображение</td><td> нить</td><td></tr><tr><td> mdw-imageTrueColor</td><td> цвет активного изображения</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-iconHeight</td><td> высота изображения</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>цвета</b></i></td></tr><tr><td> mdw-colorBgFalse</td><td> задний план</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-colorBgTrue</td><td> активный фон</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-colorPress</td><td> цвет нажат</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Блокировка</b></i></td></tr><tr><td> mdw-lockEnabled</td><td> включить блокировку</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-autoLockAfter</td><td> автоматическая блокировка через [с]</td><td> номер</td><td></tr><tr><td> mdw-lockIcon</td><td> икона</td><td> нить</td><td></tr><tr><td> mdw-lockIconTop</td><td> расстояние символа сверху [%]</td><td> номер</td><td></tr><tr><td> mdw-lockIconLeft</td><td> расстояние символа слева [%]</td><td> номер</td><td></tr><tr><td> mdw-lockIconSize</td><td> размер значка</td><td> номер</td><td></tr><tr><td> mdw-lockIconColor</td><td> цвет значка</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-lockIconBackground</td><td> lockIconBackground</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-lockBackgroundSizeFactor</td><td> lockBackgroundSizeFactor</td><td> номер</td><td></tr><tr><td> mdw-lockFilterGrayscale</td><td> серый фильтр, если заблокирован</td><td> номер</td><td></tr></tbody></table>

<! - опустить в toc ->

##### Свойства HTML - пример
<details>

```
<div class='vis-widget materialdesign-widget materialdesign-icon-button materialdesign-button-html-element'
	style='width: 48px; height: 48px; position: relative; padding: 0px;'
	mdw-type='toggle_icon'
	mdw-oid='0_userdata.0.MDW.Buttons.multiState.bool'
	mdw-toggleType='boolean'
	mdw-stateIfNotTrueValue='on'
	mdw-vibrateOnMobilDevices='50'
	mdw-image='checkbox-blank-outline'
	mdw-imageColor='#mdwTheme:vis-materialdesign.0.colors.button.icon.icon_off'
	mdw-imageTrue='checkbox-marked'
	mdw-imageTrueColor='#mdwTheme:vis-materialdesign.0.colors.button.icon.icon_on'
	mdw-colorBgFalse='#mdwTheme:vis-materialdesign.0.colors.button.icon.background_off'
	mdw-colorBgTrue='lightgreen'
	mdw-colorPress='#mdwTheme:vis-materialdesign.0.colors.button.icon.pressed'
	mdw-autoLockAfter='10'
	mdw-lockIconTop='45'
	mdw-lockIconLeft='55'
	mdw-lockIconSize='20'
	mdw-lockIconColor='#mdwTheme:vis-materialdesign.0.colors.button.icon.lock_icon'
	mdw-lockIconBackground='#mdwTheme:vis-materialdesign.0.colors.button.icon.lock_icon_background'
	mdw-lockBackgroundSizeFactor='1'
	mdw-lockFilterGrayscale='30'
></div>
```

</details>

## Флажок
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/checbox.gif)

### Настройки редактора
Настройки, не указанные в таблице ниже, не требуют пояснений.

<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание </th></tr></thead><tbody><tr><td rowspan=4><img src="doc/en/media/checkbox_settings_common.png"></td><td>тип переключения</td><td> Определите, какой тип точки данных (логическое или значение) следует переключить</td></tr><tr><td> значение для выкл.</td><td> Установите, при каком значении флажок установлен в false</td></tr><tr><td> значение для</td><td> Установите, при каком значении флажок установлен</td></tr><tr><td> указать, если значение не равно условию &quot;включено&quot;</td><td> Установите состояние флажка, если значение не соответствует условию включения</td></tr></tbody></table>

### Свойства HTML
Следующие свойства могут использоваться как [HTML-виджеты](#html-widgets).

<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения </th></tr></thead><tbody><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Общий</b></i></td></tr><tr><td> mdw-oid</td><td> ID объекта</td><td> нить</td><td></tr><tr><td> mdw-readOnly</td><td> только чтение</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-toggleType</td><td> тип переключения</td><td> нить</td><td> логическое | значение</tr><tr><td> mdw-valueOff</td><td> значение для выкл.</td><td> нить</td><td></tr><tr><td> mdw-valueOn</td><td> значение для</td><td> нить</td><td></tr><tr><td> mdw-stateIfNotTrueValue</td><td> указать, если значение не равно условию &quot;включено&quot;</td><td> нить</td><td> на | выключенный</tr><tr><td> mdw-vibrateOnMobilDevices</td><td> вибрировать на мобильных устройствах [ах]</td><td> номер</td><td></tr><tr><td> mdw-debug</td><td> отлаживать</td><td> логический</td><td> ложь | правда</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>маркировка</b></i></td></tr><tr><td> mdw-labelFalse</td><td> Ярлык false</td><td> нить</td><td></tr><tr><td> mdw-labelTrue</td><td> Ярлык верно</td><td> нить</td><td></tr><tr><td> mdw-labelPosition</td><td> labelPosition</td><td> нить</td><td> слева | право | выключенный</tr><tr><td> mdw-labelClickActive</td><td> активировать ярлык нажмите</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-valueFontFamily</td><td> valueFontFamily</td><td> нить</td><td></tr><tr><td> mdw-valueFontSize</td><td> значение размера шрифта</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>цвета</b></i></td></tr><tr><td> mdw-colorCheckBox</td><td> цвет флажка</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-colorCheckBoxBorder</td><td> цвет границы</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-colorCheckBoxHover</td><td> цвет наведения флажка</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-labelColorFalse</td><td> цвет этикетки</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-labelColorTrue</td><td> цвет активной метки</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Блокировка</b></i></td></tr><tr><td> mdw-lockEnabled</td><td> включить блокировку</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-autoLockAfter</td><td> автоматическая блокировка через [с]</td><td> номер</td><td></tr><tr><td> mdw-lockIcon</td><td> икона</td><td> нить</td><td></tr><tr><td> mdw-lockIconTop</td><td> расстояние символа сверху [%]</td><td> номер</td><td></tr><tr><td> mdw-lockIconLeft</td><td> расстояние символа слева [%]</td><td> номер</td><td></tr><tr><td> mdw-lockIconSize</td><td> размер значка</td><td> номер</td><td></tr><tr><td> mdw-lockIconColor</td><td> цвет значка</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-lockFilterGrayscale</td><td> серый фильтр, если заблокирован</td><td> номер</td><td></tr></tbody></table>

<! - опустить в toc ->

#### Свойства HTML - пример
<details>

```
<div class='vis-widget materialdesign-widget materialdesign-checkbox materialdesign-checkbox-html-element'
	style='width: 100%; height: 50px; position: relative; overflow: visible !important; display: flex; align-items: center;'
	mdw-debug='false'
	mdw-oid='0_userdata.0.bool'
	mdw-toggleType='boolean'
	mdw-stateIfNotTrueValue='on'
	mdw-vibrateOnMobilDevices='50'
	mdw-labelFalse='off'
	mdw-labelTrue='on'
	mdw-labelPosition='right'
	mdw-labelClickActive='true'
	mdw-valueFontFamily='#mdwTheme:vis-materialdesign.0.fonts.checkbox.value'
	mdw-valueFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.checkbox.value'
	mdw-colorCheckBox='#mdwTheme:vis-materialdesign.0.colors.checkbox.on'
	mdw-colorCheckBoxBorder='#mdwTheme:vis-materialdesign.0.colors.checkbox.border'
	mdw-colorCheckBoxHover='#mdwTheme:vis-materialdesign.0.colors.checkbox.hover'
	mdw-labelColorFalse='#mdwTheme:vis-materialdesign.0.colors.checkbox.text_off'
	mdw-labelColorTrue='#mdwTheme:vis-materialdesign.0.colors.checkbox.text_on'
	mdw-autoLockAfter='10'
	mdw-lockIconTop='5'
	mdw-lockIconLeft='5'
	mdw-lockIconColor='#mdwTheme:vis-materialdesign.0.colors.checkbox.lock_icon'
	mdw-lockFilterGrayscale='30'
></div>
```

</details>

## Выключатель
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/switch.gif)

### Настройки редактора
Настройки, не указанные в таблице ниже, не требуют пояснений.

<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание </th></tr></thead><tbody><tr><td rowspan=4><img src="doc/en/media/switch_settings_common.png"></td><td> тип переключения</td><td> Определите, какой тип точки данных (логическое или значение) следует переключить</td></tr><tr><td> значение для выкл.</td><td> Установите, при каком значении переключатель является ложным</td></tr><tr><td> значение для</td><td> Установите, при каком значении переключатель является истинным</td></tr><tr><td> указать, если значение не равно условию &quot;включено&quot;</td><td> Установите состояние переключателя, когда значение не соответствует условию включения</td></tr></tbody></table>

### Свойства HTML
Следующие свойства могут использоваться как [HTML-виджеты](#html-widgets).

<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения </th></tr></thead><tbody><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Общий</b></i></td></tr><tr><td> mdw-oid</td><td> ID объекта</td><td> нить</td><td></tr><tr><td> mdw-readOnly</td><td> только чтение</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-toggleType</td><td> тип переключения</td><td> нить</td><td> логическое | значение</tr><tr><td> mdw-valueOff</td><td> значение для выкл.</td><td> нить</td><td></tr><tr><td> mdw-valueOn</td><td> значение для</td><td> нить</td><td></tr><tr><td> mdw-stateIfNotTrueValue</td><td> указать, если значение не равно условию &quot;включено&quot;</td><td> нить</td><td> на | выключенный</tr><tr><td> mdw-vibrateOnMobilDevices</td><td> вибрировать на мобильных устройствах [ах]</td><td> номер</td><td></tr><tr><td> mdw-debug</td><td> отлаживать</td><td> логический</td><td> ложь | правда</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>маркировка</b></i></td></tr><tr><td> mdw-labelFalse</td><td> Ярлык false</td><td> нить</td><td></tr><tr><td> mdw-labelTrue</td><td> Ярлык верно</td><td> нить</td><td></tr><tr><td> mdw-labelPosition</td><td> labelPosition</td><td> нить</td><td> слева | право | выключенный</tr><tr><td> mdw-labelClickActive</td><td> активировать ярлык нажмите</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-valueFontFamily</td><td> valueFontFamily</td><td> нить</td><td></tr><tr><td> mdw-valueFontSize</td><td> значение размера шрифта</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>цвета</b></i></td></tr><tr><td> mdw-colorSwitchThumb</td><td> цвет большого пальца переключателя</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-colorSwitchTrack</td><td> отслеживать цвет переключателя</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-colorSwitchTrue</td><td> цвет активного переключателя</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-colorSwitchHover</td><td> цвет переключателя при наведении</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-colorSwitchHoverTrue</td><td> активный цвет переключателя выбран / наведен</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-labelColorFalse</td><td> цвет этикетки</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-labelColorTrue</td><td> цвет активной метки</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Блокировка</b></i></td></tr><tr><td> mdw-lockEnabled</td><td> включить блокировку</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-autoLockAfter</td><td> автоматическая блокировка через [с]</td><td> номер</td><td></tr><tr><td> mdw-lockIcon</td><td> икона</td><td> нить</td><td></tr><tr><td> mdw-lockIconTop</td><td> расстояние символа сверху [%]</td><td> номер</td><td></tr><tr><td> mdw-lockIconLeft</td><td> расстояние символа слева [%]</td><td> номер</td><td></tr><tr><td> mdw-lockIconSize</td><td> размер значка</td><td> номер</td><td></tr><tr><td> mdw-lockIconColor</td><td> цвет значка</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-lockFilterGrayscale</td><td> серый фильтр, если заблокирован</td><td> номер</td><td></tr></tbody></table>

<! - опустить в toc ->

#### Свойства HTML - пример
<details>

```
<div class='vis-widget materialdesign-widget materialdesign-switch materialdesign-switch-html-element'
	style='width: 100%; height: 50px; position: relative; overflow: visible !important; display: flex; align-items: center;'
	mdw-debug='false'
	mdw-oid='0_userdata.0.bool'
	mdw-toggleType='boolean'
	mdw-stateIfNotTrueValue='on'
	mdw-vibrateOnMobilDevices='50'
	mdw-labelFalse='off'
	mdw-labelTrue='on'
	mdw-labelPosition='right'
	mdw-labelClickActive='true'
	mdw-valueFontFamily='#mdwTheme:vis-materialdesign.0.fonts.switch.value'
	mdw-valueFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.switch.value'
	mdw-colorSwitchThumb='#mdwTheme:vis-materialdesign.0.colors.switch.off'
	mdw-colorSwitchTrack='#mdwTheme:vis-materialdesign.0.colors.switch.track'
	mdw-colorSwitchTrue='#mdwTheme:vis-materialdesign.0.colors.switch.on'
	mdw-colorSwitchHover='#mdwTheme:vis-materialdesign.0.colors.switch.off_hover'
	mdw-colorSwitchHoverTrue='#mdwTheme:vis-materialdesign.0.colors.switch.on_hover'
	mdw-labelColorFalse='#mdwTheme:vis-materialdesign.0.colors.switch.text_off'
	mdw-labelColorTrue='#mdwTheme:vis-materialdesign.0.colors.switch.text_on'
	mdw-autoLockAfter='10'
	mdw-lockIconTop='5'
	mdw-lockIconLeft='5'
	mdw-lockIconColor='#mdwTheme:vis-materialdesign.0.colors.switch.lock_icon'
	mdw-lockFilterGrayscale='30'
></div>
```

</details>

## Значение
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/value.gif)

Как виджет HTML он может использоваться в качестве альтернативы привязкам, обеспечивая лучшую производительность.

### Настройки редактора
Настройки, не указанные в таблице ниже, не требуют пояснений.

<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание </th></tr></thead><tbody><tr><td rowspan=2><img src="doc/en/media/value_settings_common.png"></td><td> тип цели</td><td> Если вы хотите преобразовать в другой тип, выберите целевой тип, в который нужно преобразовать.</td></tr><tr><td> переопределить текст</td><td> переопределить текст значения. вы можете использовать <code>#value</code> чтобы показать значение в тексте</td></tr><tr><td rowspan=3><img src="doc/en/media/value_settings_layout.png"></td><td> Цвет шрифта</td><td> Определите цвет текста. Дополнительно можно использовать <code>#value</code> для условий, чтобы отображать разные цвета в зависимости от значения точки данных. Разрешенное выражение см. <a href="https://mathjs.org/docs/expressions/syntax.html#operators" _target="blank">Выражения оценки mathjs</a></td></tr><tr><td> цвет добавленного текста</td><td> Определите цвет текста. Дополнительно можно использовать <code>#value</code> для условий, чтобы отображать разные цвета в зависимости от значения точки данных. Разрешенное выражение см. <a href="https://mathjs.org/docs/expressions/syntax.html#operators" _target="blank">Выражения оценки mathjs</a></td></tr><tr><td> цвет добавляемого текста</td><td> Определите цвет текста. Дополнительно можно использовать <code>#value</code> для условий, чтобы отображать разные цвета в зависимости от значения точки данных. Разрешенное выражение см. <a href="https://mathjs.org/docs/expressions/syntax.html#operators" _target="blank">Выражения оценки mathjs</a></td></tr><tr><td rowspan=3><img src="doc/en/media/value_settings_number_formatting.png"></td><td> вычислить</td><td> Используйте <code>#value</code> для значения точки данных и преобразуйте его путем вычисления с использованием <a href="https://mathjs.org/docs/expressions/syntax.html#operators" _target="blank">выражений оценки mathjs</a></td></tr><tr><td> конвертировать секунды в продолжительность</td><td> преобразовать продолжительность в секундах в читаемую строку. Утвержденные форматы необходимо вводить в соответствии с библиотекой <a href="https://github.com/jsmreese/moment-duration-format#template-string">форматов момент-длительность.</a> Вы также можете использовать <code>humanize</code> .<br><br> Также возможно объединить это с вычислением, например, если исходное значение выражено в минутах, вы можете преобразовать его в секунды, используя вычисление.</td></tr><tr><td> преобразовать метку времени в дату и время</td><td> преобразовать метку времени в удобочитаемую дату и время. Утвержденные форматы необходимо вводить согласно библиотеке <a href="https://momentjs.com/docs/#/displaying/format/">momentjs.</a><br><br> Также можно совместить это с расчетом</td></tr><tr><td rowspan=1><img src="doc/en/media/value_settings_boolean_formatting.png"></td><td> условие</td><td> Используйте <code>#value</code> для значения точки данных и условий, чтобы <a href="https://mathjs.org/docs/expressions/syntax.html#operators" _target="blank">преобразовать другие типы в логические с помощью выражений оценки mathjs.</a></td></tr><tr><td rowspan=2><img src="doc/en/media/value_settings_image.png"></td><td> Изображение</td><td> Выберите значок материала или изображение. Дополнительно можно использовать <code>#value</code> для условий для отображения разных изображений / значков в зависимости от значения точки данных. Разрешенное выражение см. <a href="https://mathjs.org/docs/expressions/syntax.html#operators" _target="blank">Выражения оценки mathjs</a></td></tr><tr><td> цвет изображения</td><td> Определите цвет значка материала. Дополнительно можно использовать <code>#value</code> для условий, чтобы отображать разные цвета в зависимости от значения точки данных. Разрешенное выражение см. <a href="https://mathjs.org/docs/expressions/syntax.html#operators" _target="blank">Выражения оценки mathjs</a></td></tr></tbody></table>

### Свойства HTML
Следующие свойства могут использоваться как [HTML-виджеты](#html-widgets).

<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения </th></tr></thead><tbody><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Общий</b></i></td></tr><tr><td> mdw-oid</td><td> ID объекта</td><td> нить</td><td></tr><tr><td> mdw-targetType</td><td> тип цели</td><td> нить</td><td> авто | номер | строка | логический</tr><tr><td> mdw-overrideText</td><td> переопределить текст</td><td> нить</td><td></tr><tr><td> mdw-debug</td><td> отлаживать</td><td> логический</td><td> ложь | правда</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>макет</b></i></td></tr><tr><td> mdw-textAlign</td><td> textAlign</td><td> нить</td><td> начало | центр | конец</tr><tr><td> mdw-valuesFontColor</td><td> Цвет шрифта</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-valuesFontFamily</td><td> шрифт</td><td> нить</td><td></tr><tr><td> mdw-valuesFontSize</td><td> размер шрифта</td><td> номер</td><td></tr><tr><td> mdw-PrepandText</td><td> текст добавлен</td><td> нить</td><td></tr><tr><td> mdw-PrepandTextColor</td><td> цвет добавленного текста</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-prepandTextFontFamily</td><td> шрифт текста добавлен</td><td> нить</td><td></tr><tr><td> mdw-PrepandTextFontSize</td><td> размер текста добавлен</td><td> номер</td><td></tr><tr><td> mdw-appendText</td><td> добавленный текст</td><td> нить</td><td></tr><tr><td> mdw-appendTextColor</td><td> цвет добавляемого текста</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-appendTextFontFamily</td><td> шрифт добавляемого текста</td><td> нить</td><td></tr><tr><td> mdw-appendTextFontSize</td><td> размер шрифта добавляемого текста</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>форматирование чисел</b></i></td></tr><tr><td> mdw-valueLabelUnit</td><td> Ед. изм</td><td> нить</td><td></tr><tr><td> mdw-minDecimals</td><td> минимальные десятичные дроби</td><td> номер</td><td></tr><tr><td> mdw-maxDecimals</td><td> максимальные десятичные дроби</td><td> номер</td><td></tr><tr><td> mdw-Calculate</td><td> вычислить</td><td> нить</td><td></tr><tr><td> mdw-convertToDuration</td><td> преобразовать в продолжительность</td><td> текст</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>логическое форматирование</b></i></td></tr><tr><td> mdw-textOnTrue</td><td> текст, если правда</td><td> нить</td><td></tr><tr><td> mdw-textOnFalse</td><td> текст, если ложь</td><td> нить</td><td></tr><tr><td> mdw-условие</td><td> условие</td><td> нить</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>икона</b></i></td></tr><tr><td> mdw-изображение</td><td> Изображение</td><td> нить</td><td></tr><tr><td> mdw-imageColor</td><td> цвет изображения</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-iconPosition</td><td> положение изображения</td><td> нить</td><td> слева | верно</tr><tr><td> mdw-iconHeight</td><td> высота изображения</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>эффект изменения стоимости</b></i></td></tr><tr><td> mdw-changeEffectEnabled</td><td> включено</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-effectFontColor</td><td> Цвет шрифта</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-effectFontSize</td><td> размер шрифта</td><td> номер</td><td></tr><tr><td> mdw-effectDuration</td><td> продолжительность эффекта</td><td> номер</td><td></tr></tbody></table>

<! - опустить в toc ->

#### Свойства HTML - пример
<details>

```
<div class='vis-widget materialdesign-widget materialdesign-value materialdesign-value-html-element'
	style='width: 218px; height: 30px; position: relative; display: flex; align-items: center;'
	mdw-debug='false'
	mdw-oid='0_userdata.0.MDW.Value.number'
	mdw-targetType='auto'
	mdw-textAlign='start'
	mdw-valuesFontColor='#mdwTheme:vis-materialdesign.0.colors.value.text'
	mdw-valuesFontFamily='#mdwTheme:vis-materialdesign.0.fonts.value.text'
	mdw-valuesFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.value.text'
	mdw-prepandText='aktuelle Leistung:'
	mdw-prepandTextColor='#mdwTheme:vis-materialdesign.0.colors.value.prepand'
	mdw-prepandTextFontFamily='#mdwTheme:vis-materialdesign.0.fonts.value.prepand'
	mdw-prepandTextFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.value.prepand'
	mdw-appendTextColor='#mdwTheme:vis-materialdesign.0.colors.value.append'
	mdw-appendTextFontFamily='#mdwTheme:vis-materialdesign.0.fonts.value.append'
	mdw-appendTextFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.value.append'
	mdw-valueLabelUnit='W'
	mdw-image='power-plug'
	mdw-imageColor='#mdwTheme:vis-materialdesign.0.colors.value.icon'
	mdw-iconPosition='left'
	mdw-changeEffectEnabled='true'
	mdw-effectFontColor='#00e640'
	mdw-effectFontSize='20'
	mdw-effectDuration='1000'
></div>
```

</details>

## HTML-карта
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/cards.png)

## Список
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/list.gif)

### Настройки редактора
Настройки, не указанные в таблице ниже, не требуют пояснений.

<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание </th></tr></thead><tbody><tr><td rowspan=4><img src="doc/en/media/list_settings_layout.png"></td><td> тип списка</td><td> тип управления списком, например флажок, состояние кнопки, переключатель кнопки и т. д.</td></tr><tr><td> стиль разделителя</td><td> стиль разделителя</td></tr><tr><td> макет</td><td> стандартный или карточный макет</td></tr><tr><td> показать полосу прокрутки</td><td> при необходимости показать полосу прокрутки</td></tr><tr><td rowspan=4><img src="doc/en/media/list_settings_data.png"></td><td> метод ввода для данных списка</td><td> используйте редактор или строку json для определения элементов</td></tr><tr><td> Редактор: количество элементов списка</td><td> подсчет элементов списка с помощью редактора</td></tr><tr><td> JSON-String: идентификатор объекта</td><td> идентификатор объекта точки данных, содержащей строку json. Допустимые свойства описаны ниже</td></tr></tbody></table>

### Свойства данных JSON
<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> objectId</td><td> идентификатор точки данных</td><td> нить</td><td></td></tr><tr><td> buttonStateValue</td><td> значение для кнопки, если список взят из состояния кнопки типа</td><td> нить</td><td></td></tr><tr><td> buttonNavView</td><td> вид для кнопки, если список взят из типа навигации по кнопке</td><td> нить</td><td></td></tr><tr><td> buttonLink</td><td> адрес ссылки для кнопки, если список взят из кнопки типа ссылка</td><td> нить</td><td></td></tr><tr><td> заголовок</td><td> текст заголовка элемента</td><td> нить</td><td></td></tr><tr><td> текст</td><td> основной текст</td><td> нить</td><td></td></tr><tr><td> подтекст</td><td> вторичный текст</td><td> нить</td><td></td></tr><tr><td> rightText</td><td> основной правый текст</td><td> нить</td><td></td></tr><tr><td> rightSubText</td><td> второй правый текст</td><td> нить</td><td></td></tr><tr><td> изображение</td><td> значок материального дизайна или путь к изображению</td><td> нить</td><td></td></tr><tr><td> imageColor</td><td> Цвет значка материального дизайна</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> imageActive</td><td> значок материального дизайна или путь к изображению, если точка данных активна</td><td> нить</td><td></td></tr><tr><td> imageActiveColor</td><td> цвет значка материального дизайна, если точка данных активна</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> showDivider</td><td> показать разделитель</td><td> логический</td><td> ложь | правда</td></tr><tr><td> listOverflow</td><td> автоматически настраивать ширину столбца на значение</td><td> логический</td><td> ложь | правда</td></tr></tbody></table>

<! - опустить в toc ->

#### Свойства JSON - пример
<details> <pre><code> [ { "text": "item0", "subText": "{0_userdata.0.MDW.list.bind0}", "rightText": "right", "rightSubText": "", "image": "clock-check-outline", "imageColor": "#44739e", "imageActive": "", "imageActiveColor": "", "header": "JSON", "showDivider": "false", "objectId": "0_userdata.0.MDW.list.bool.val0", "buttonStateValue": "", "buttonNavView": "", "buttonLink": "", "listOverflow": false }, { "text": "item1", "subText": "{0_userdata.0.MDW.list.bind1}", "rightText": "right", "rightSubText": "", "image": "clock-check-outline", "imageColor": "#44739e", "imageActive": "", "imageActiveColor": "", "header": "", "showDivider": "false", "objectId": "0_userdata.0.MDW.list.bool.val1", "buttonStateValue": "", "buttonNavView": "", "buttonLink": "", "listOverflow": false }, { "text": "item2", "subText": "", "rightText": "right", "rightSubText": "", "image": "clock-check-outline", "imageColor": "#44739e", "imageActive": "", "imageActiveColor": "", "header": "", "showDivider": "false", "objectId": "0_userdata.0.MDW.list.bool.val2", "buttonStateValue": "", "buttonNavView": "", "buttonLink": "", "listOverflow": false }, { "text": "item3", "subText": "fuuuu", "rightText": "right", "rightSubText": "", "image": "clock-check-outline", "imageColor": "#44739e", "imageActive": "", "imageActiveColor": "", "header": "", "showDivider": "false", "objectId": "0_userdata.0.MDW.list.bool.val3", "buttonStateValue": "", "buttonNavView": "", "buttonLink": "", "listOverflow": false } ] </code></pre> </details>

## IconList
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/iconList.gif)

### Настройки редактора
Настройки, не указанные в таблице ниже, не требуют пояснений.

<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание </th></tr></thead><tbody><tr><td rowspan=6><img src="doc/en/media/iconlist_settings_data.png"></td><td> метод ввода для данных списка</td><td> Данные для IconList можно ввести через редактор или использовать строку JSON.</td></tr><tr><td> Редактор: количество элементов списка</td><td> количество элементов списка с использованием редактора vis для данных списка</td></tr><tr><td> JSON-String: идентификатор объекта</td><td> идентификатор объекта точки данных, содержащей строку json. Допустимые свойства описаны ниже</td></tr></tbody></table>

### Свойства данных JSON
Строка JSON должна быть массивом объектов со следующими свойствами:

<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> listType</td><td> тип списка<ul><li> buttonToggleValueTrue: включен, только если значение равно условию &#39;on&#39;</li><li> buttonToggleValueFalse: отключается, только если значение равно условию &#39;off&#39;</li></ul></td><td> нить</td><td> текст | buttonState | buttonToggle | buttonToggleValueTrue | buttonToggleValueFalse | buttonNav | buttonLink</td></tr><tr><td> objectId</td><td> идентификатор объекта для кнопки</td><td> нить</td><td/></tr><tr><td> minWidth</td><td> минимальная ширина для элемента</td><td> нить</td><td> 30px | 60%</td></tr><tr><td> usePercentOfRow</td><td> элемент использует x процентов строки.</td><td> номер</td><td> 0 = авто</td></tr><tr><td> buttonStateValue</td><td> значение для состояния кнопки</td><td> нить</td><td/></tr><tr><td> buttonNavView</td><td> вид для навигации</td><td> нить</td><td/></tr><tr><td> buttonLink</td><td> URL для навигации</td><td> нить</td><td/></tr><tr><td> buttonToggleValueTrue</td><td> истинное значение для кнопки переключения</td><td> нить</td><td/></tr><tr><td> buttonToggleValueFalse</td><td> ложное значение для кнопки переключения</td><td> нить</td><td/></tr><tr><td> только для чтения</td><td> кнопка доступна только для чтения</td><td> логический</td><td> ложь | правда</td></tr><tr><td> showValueLabel</td><td> показать значение как текст</td><td> логический</td><td> ложь | правда</td></tr><tr><td> valueAppendix</td><td> добавить текст к значению</td><td> нить</td><td/></tr><tr><td> задний план</td><td> фоновый цвет</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> текст</td><td> текст</td><td> нить</td><td/></tr><tr><td> подтекст</td><td> второй текст</td><td> нить</td><td/></tr><tr><td> изображение</td><td> путь к изображению или имя иконок Material Design</td><td> нить</td><td/></tr><tr><td> imageColor</td><td> цвет иконок материального дизайна</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> imageActive</td><td> путь к изображению или имя иконок Material Design</td><td> нить</td><td/></tr><tr><td> imageActiveColor</td><td> путь к изображению или имя иконок Material Design для активной кнопки</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> buttonBackgroundColor</td><td> цвет фона кнопки</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> buttonBackgroundActiveColor</td><td> цвет фона кнопки для активной кнопки</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> statusBarColor</td><td> цвет строки состояния</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> statusBarColorActive</td><td> цвет строки состояния, если активен</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> statusBarText</td><td> текст строки состояния</td><td> нить</td><td/></tr><tr><td> statusBarTextActive</td><td> текст строки состояния, если активен</td><td> нить</td><td/></tr><tr><td> lockEnabled</td><td> включить блокировку</td><td> логический</td><td> ложь | правда</td></tr><tr><td> visibilityOid</td><td> Идентификатор объекта для видимости</td><td> нить</td><td/></tr><tr><td> visibilityCondition</td><td> условие видимости</td><td> нить</td><td> == | ! = | &lt;= | &gt; = | &lt;| &gt; | состоят | не состоять | существуют | не существует</td></tr><tr><td> visibilityConditionValue</td><td> значение для условия видимости</td><td> нить</td><td/></tr></tbody></table>

<! - опустить в toc ->

#### Свойства JSON - пример
<details> <pre><code> [ { "background": "red", "text": "text1", "subText": "number", "image": "harddisk", "imageColor": "#ec0909", "imageActive": "folder", "imageActiveColor": "#5ad902", "buttonBackgroundColor": "", "buttonBackgroundActiveColor": "", "listType": "buttonState", "objectId": "0_userdata.0.iconList.buttonState.number", "buttonStateValue": "60", "buttonNavView": "", "buttonLink": "", "buttonToggleValueTrue": "", "buttonToggleValueFalse": "", "valueAppendix": "", "showValueLabel": "true", "statusBarColor": "green", "lockEnabled": "false" }, { "background": "green", "text": "text0", "subText": "bool", "image": "home", "imageColor": "#44739e", "imageActive": "home", "imageActiveColor": "#44739e", "buttonBackgroundColor": "", "buttonBackgroundActiveColor": "#a0f628", "listType": "buttonToggle", "objectId": "0_userdata.0.iconList.buttonToggle.bool0", "buttonStateValue": "60", "buttonNavView": "", "buttonLink": "", "buttonToggleValueTrue": "", "buttonToggleValueFalse": "", "valueAppendix": "", "showValueLabel": "false", "statusBarColor": "", "lockEnabled": "false" } ] </code></pre> </details>

## Прогресс
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/progress.gif)

### Настройки редактора
<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание </th></tr></thead><tbody><tr><td rowspan=2><img src="doc/en/media/progress_settings_colors.png"></td><td>условие прохождения цвета 1 [&gt;]</td><td> Состояние с момента использования цвета 1. Значение условия должно быть в процентах.</td></tr><tr><td> условие прохождения цвета 2 [&gt;]</td><td> Состояние с момента использования цвета 2. Значение условия должно быть в процентах.</td></tr><tr><td rowspan=1><img src="doc/en/media/progress_settings.png"></td><td> специальный ярлык</td><td> Для настраиваемой метки вы можете использовать свойство <code>[#value]</code> чтобы показать реальное значение точки данных. Чтобы показать текущий процент, вы можете использовать <code>[#percent]</code></td></tr></tbody></table>

### Свойства HTML
Следующие свойства могут использоваться как [HTML-виджеты](#html-widgets).

<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> mdw-тип</td><td> Тип виджета</td><td> нить</td><td> линейный</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Общий</b></i></td></tr><tr><td> mdw-oid</td><td> ID объекта</td><td> нить</td><td></tr><tr><td> mdw-min</td><td> мин</td><td> нить</td><td></tr><tr><td> mdw-max</td><td> Максимум</td><td> нить</td><td></tr><tr><td> mdw-progressIndeterminate</td><td> неопределенный - непрерывно оживляет</td><td> логический</td><td> ложь | правда</td></tr><tr><td> mdw-reverse</td><td> Реверс значение</td><td> логический</td><td> ложь | правда</td></tr><tr><td> mdw-debug</td><td> отлаживать</td><td> логический</td><td> ложь | правда</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>макет</b></i></td></tr><tr><td> mdw-progressRounded</td><td> закругленные углы</td><td> логический</td><td> ложь | правда</td></tr><tr><td> mdw-progressStriped</td><td> полосатый</td><td> логический</td><td> ложь | правда</td></tr><tr><td> mdw-progressStripedColor</td><td> progressStripedColor</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> mdw-stripDistance</td><td> stripDistance</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>цвета</b></i></td></tr><tr><td> mdw-colorProgressBackground</td><td> фоновый цвет</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-colorProgress</td><td> цвет прогресс</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-colorOneCondition</td><td> условие прохождения цвета 1 [&gt;]</td><td> номер</td><td></tr><tr><td> mdw-colorOne</td><td> цвет 1 прогресс</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> mdw-colorTwoCondition</td><td> условие прохождения цвета 2 [&gt;]</td><td> номер</td><td></tr><tr><td> mdw-colorTwo</td><td> цвет 2 прогресс</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>маркировка</b></i></td></tr><tr><td> mdw-showValueLabel</td><td> показать ценность</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-valueLabelStyle</td><td> значение стиля подписи</td><td> нить</td><td> progressPercent | progressValue | прогресс</td></tr><tr><td> mdw-valueLabelUnit</td><td> Ед. изм</td><td> нить</td><td></tr><tr><td> mdw-valueMaxDecimals</td><td> десятичные точки</td><td> номер</td><td></tr><tr><td> mdw-valueLabelCustom</td><td> специальный ярлык</td><td> нить</td><td></tr><tr><td> mdw-textColor</td><td> Цвет текста минут</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> mdw-textFontSize</td><td> размер текста</td><td> номер</td><td></tr><tr><td> mdw-textFontFamily</td><td> шрифт</td><td> нить</td><td></tr><tr><td> mdw-textAlign</td><td> textAlign</td><td> нить</td><td> начало | центр | конец</td></tr></tbody></table>

<! - опустить в toc ->

#### Свойства HTML - пример
<details>

```
<div class='vis-widget materialdesign-widget materialdesign-progress materialdesign-progress-html-element'
	style='width: 100%; height: 100%; position: relative; padding: 0px;'
	mdw-type='linear'
	mdw-oid='0_userdata.0.MDW.Progress.val0'
	mdw-debug='true'
	mdw-progressRounded='true'
	mdw-colorProgressBackground='#mdwTheme:vis-materialdesign.0.colors.progress.track_background'
	mdw-colorProgress='#mdwTheme:vis-materialdesign.0.colors.progress.track'
	mdw-colorOneCondition='50'
	mdw-colorOne='#mdwTheme:vis-materialdesign.0.colors.progress.track_condition1'
	mdw-colorTwoCondition='70'
	mdw-colorTwo='#mdwTheme:vis-materialdesign.0.colors.progress.track_condition2'
	mdw-showValueLabel='true'
	mdw-valueLabelStyle='progressPercent'
	mdw-textColor='#mdwTheme:vis-materialdesign.0.colors.progress.text'
	mdw-textFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.progress.text'
	mdw-textFontFamily='#mdwTheme:vis-materialdesign.0.fonts.progress.text'
	mdw-textAlign='end'
></div>
```

</details>

## Информационный бюллетень
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/progress_circular.gif)

### Настройки редактора
Настройки, не указанные в таблице ниже, не требуют пояснений.

<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание </th></tr></thead><tbody><tr><td rowspan=2><img src="doc/en/media/progress_circular_settings_colors.png"></td><td> условие прохождения цвета 1 [&gt;]</td><td> Состояние с момента использования цвета 1. Значение условия должно быть в процентах.</td></tr><tr><td> условие прохождения цвета 2 [&gt;]</td><td> Состояние с момента использования цвета 2. Значение условия должно быть в процентах.</td></tr><tr><td rowspan=6><img src="doc/en/media/progress_settings.png"></td><td> специальный ярлык</td><td> Для настраиваемой метки вы можете использовать свойство <code>[#value]</code> чтобы показать реальное значение точки данных. Чтобы показать текущий процент, вы можете использовать <code>[#percent]</code></td></tr></tbody></table>

### Свойства HTML
Следующие свойства могут использоваться как [HTML-виджеты](#html-widgets).

<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> mdw-тип</td><td> Тип виджета</td><td> нить</td><td> линейный</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Общий</b></i></td></tr><tr><td> mdw-oid</td><td> ID объекта</td><td> нить</td><td></tr><tr><td> mdw-min</td><td> мин</td><td> нить</td><td></tr><tr><td> mdw-max</td><td> Максимум</td><td> нить</td><td></tr><tr><td> mdw-reverse</td><td> Реверс значение</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-invertValue</td><td> инвертировать значение</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-debug</td><td> отлаживать</td><td> логический</td><td> ложь | правда</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>макет</b></i></td></tr><tr><td> mdw-progressRounded</td><td> закругленные углы</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-progressIndeterminate</td><td> неопределенный - непрерывно оживляет</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-progressRotate</td><td> повернуть на 90 градусов</td><td> нить</td><td> noRotate | даПовернуть</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>group_layoutStriped</b></i></td></tr><tr><td> mdw-progressStriped</td><td> полосатый</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-progressStripedColor</td><td> progressStripedColor</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-stripAngle</td><td> stripAngle</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>цвета</b></i></td></tr><tr><td> mdw-colorProgressBackground</td><td> фоновый цвет</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-colorProgress</td><td> цвет прогресс</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-colorOneCondition</td><td> условие прохождения цвета 1 [&gt;]</td><td> номер</td><td></tr><tr><td> mdw-colorOne</td><td> цвет 1 прогресс</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-colorTwoCondition</td><td> условие прохождения цвета 2 [&gt;]</td><td> номер</td><td></tr><tr><td> mdw-colorTwo</td><td> цвет 2 прогресс</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>маркировка</b></i></td></tr><tr><td> mdw-showValueLabel</td><td> показать ценность</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-valueLabelStyle</td><td> значение стиля подписи</td><td> нить</td><td> progressPercent | progressValue | прогресс</tr><tr><td> mdw-valueLabelUnit</td><td> Ед. изм</td><td> нить</td><td></tr><tr><td> mdw-valueMaxDecimals</td><td> десятичные точки</td><td> номер</td><td></tr><tr><td> mdw-valueLabelCustom</td><td> специальный ярлык</td><td> нить</td><td></tr><tr><td> mdw-textColor</td><td> Цвет текста минут</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-textFontSize</td><td> размер текста</td><td> номер</td><td></tr><tr><td> mdw-textFontFamily</td><td> шрифт</td><td> нить</td><td></tr><tr><td> mdw-textAlign</td><td> textAlign</td><td> нить</td><td> начало | центр | конец</tr></tbody></table>

<! - опустить в toc ->

#### Свойства HTML - пример
<details>

```
<div class='vis-widget materialdesign-widget materialdesign-progress materialdesign-progress-html-element'
	style='width: 100%; height: 100%; position: relative; padding: 0px;'
	mdw-type='circular'
	mdw-oid='0_userdata.0.MDW.Progress.val1'
	mdw-colorProgressBackground='#mdwTheme:vis-materialdesign.0.colors.progress.track_background'
	mdw-colorProgress='#mdwTheme:vis-materialdesign.0.colors.progress.track'
	mdw-innerColor='#mdwTheme:vis-materialdesign.0.colors.progress.circular_background'
	mdw-colorOneCondition='50'
	mdw-colorOne='#mdwTheme:vis-materialdesign.0.colors.progress.track_condition1'
	mdw-colorTwoCondition='70'
	mdw-colorTwo='#mdwTheme:vis-materialdesign.0.colors.progress.track_condition2'
	mdw-showValueLabel='true'
	mdw-valueLabelStyle='progressPercent'
	mdw-textColor='#mdwTheme:vis-materialdesign.0.colors.progress.text'
	mdw-textFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.progress.text'
	mdw-textFontFamily='#mdwTheme:vis-materialdesign.0.fonts.progress.text'
></div>
```

</details>

## Слайдер
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/slider.gif)

### Свойства HTML
Следующие свойства могут использоваться как [HTML-виджеты](#html-widgets).

<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения </th></tr></thead><tbody><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Общий</b></i></td></tr><tr><td> mdw-oid</td><td> ID объекта</td><td> нить</td><td></tr><tr><td> mdw-oid-рабочий</td><td> ID рабочего объекта</td><td> нить</td><td></tr><tr><td> mdw-ориентация</td><td> Ориентация</td><td> нить</td><td> горизонтальный | вертикальный</tr><tr><td> mdw-reverseSlider</td><td> инвертировать слайдер</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-knobSize</td><td> размер ручки</td><td> нить</td><td> knobSmall | knobMedium | ручкаБольшая</tr><tr><td> mdw-readOnly</td><td> только чтение</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-min</td><td> мин</td><td> нить</td><td></tr><tr><td> mdw-max</td><td> Максимум</td><td> нить</td><td></tr><tr><td> mdw-step</td><td> шаги</td><td> нить</td><td></tr><tr><td> mdw-vibrateOnMobilDevices</td><td> вибрировать на мобильных устройствах [ах]</td><td> номер</td><td></tr><tr><td> mdw-debug</td><td> отлаживать</td><td> логический</td><td> ложь | правда</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Шаги Макет</b></i></td></tr><tr><td> mdw-showTicks</td><td> показать шаги</td><td> нить</td><td> нет | да | всегда</tr><tr><td> mdw-tickSize</td><td> отображать размер шагов</td><td> номер</td><td></tr><tr><td> mdw-tickLabels</td><td> текст шагов (через запятую)</td><td> нить</td><td></tr><tr><td> mdw-tickTextColor</td><td> цвет текста шагов</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-tickFontFamily</td><td> шрифт ступеней</td><td> нить</td><td></tr><tr><td> mdw-tickFontSize</td><td> размер шрифта</td><td> номер</td><td></tr><tr><td> mdw-tickColorBefore</td><td> цвет перед регулятором</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-tickColorAfter</td><td> цвет после регулятора</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>цвета</b></i></td></tr><tr><td> mdw-colorBeforeThumb</td><td> цвет перед регулятором</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-colorThumb</td><td> цвет регулятора</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-colorAfterThumb</td><td> цвет после регулятора</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>маркировка</b></i></td></tr><tr><td> mdw-PrepandText</td><td> текст добавлен</td><td> нить</td><td></tr><tr><td> mdw-PrepandTextWidth</td><td> PrepandTextWidth</td><td> номер</td><td></tr><tr><td> mdw-PrepandTextColor</td><td> цвет добавленного текста</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-PrepandTextFontSize</td><td> размер текста добавлен</td><td> номер</td><td></tr><tr><td> mdw-prepandTextFontFamily</td><td> шрифт текста добавлен</td><td> нить</td><td></tr><tr><td> mdw-showValueLabel</td><td> показать ценность</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-valueLabelStyle</td><td> значение стиля подписи</td><td> нить</td><td> sliderPercent | sliderValue</tr><tr><td> mdw-valueLabelUnit</td><td> Ед. изм</td><td> нить</td><td></tr><tr><td> mdw-valueFontFamily</td><td> valueFontFamily</td><td> нить</td><td></tr><tr><td> mdw-valueFontSize</td><td> значение размера шрифта</td><td> номер</td><td></tr><tr><td> mdw-valueLabelColor</td><td> цвет текста значения</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-valueLabelMin</td><td> текст для значения меньше min</td><td> нить</td><td></tr><tr><td> mdw-valueLabelMax</td><td> текст для значения больше min</td><td> нить</td><td></tr><tr><td> mdw-valueLessThan</td><td> условие &quot;меньше чем&quot; для текста значения</td><td> номер</td><td></tr><tr><td> mdw-textForValueLessThan</td><td> текст для &quot;меньше чем&quot;</td><td> нить</td><td></tr><tr><td> mdw-valueGreaterThan</td><td> условие &#39;больше чем&#39; для текста значения</td><td> номер</td><td></tr><tr><td> mdw-textForValueGreaterThan</td><td> текст для &quot;больше чем&quot;</td><td> нить</td><td></tr><tr><td> mdw-valueLabelWidth</td><td> метка расстояния</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>макет этикетки контроллера</b></i></td></tr><tr><td> mdw-showThumbLabel</td><td> показать этикетку</td><td> нить</td><td> нет | да | всегда</tr><tr><td> mdw-thumbSize</td><td> размер этикетки</td><td> номер</td><td></tr><tr><td> mdw-thumbBackgroundColor</td><td> фоновый цвет</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-thumbFontColor</td><td> Цвет шрифта</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-thumbFontSize</td><td> размер шрифта</td><td> номер</td><td></tr><tr><td> mdw-thumbFontFamily</td><td> шрифт</td><td> нить</td><td></tr><tr><td> mdw-useLabelRules</td><td> использовать правила текста</td><td> логический</td><td> ложь | правда</tr></tbody></table>

<! - опустить в toc ->

#### Свойства HTML - пример
<details>

```
<div class='vis-widget materialdesign-widget materialdesign-slider-vertical materialdesign-slider-html-element'
	style='width: 342px; height: 100px; position: relative; overflow:visible !important; display: flex; align-items: center;'
	mdw-debug='false'
	mdw-oid='0_userdata.0.MDW.Slider.val0'
	mdw-oid-working='0_userdata.0.MDW.Slider.working'
	mdw-orientation='horizontal'
	mdw-knobSize='knobSmall'
	mdw-min='0'
	mdw-max='100'
	mdw-step='10'
	mdw-vibrateOnMobilDevices='50'
	mdw-showTicks='always'
	mdw-tickSize='5'
	mdw-tickLabels='1,2,3,4,5,6,7,8,9,10,11'
	mdw-tickTextColor='#mdwTheme:vis-materialdesign.0.colors.slider.tick'
	mdw-tickFontFamily='#mdwTheme:vis-materialdesign.0.fonts.slider.ticks'
	mdw-tickFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.slider.ticks'
	mdw-tickColorBefore='#mdwTheme:vis-materialdesign.0.colors.slider.tick_before'
	mdw-tickColorAfter='#mdwTheme:vis-materialdesign.0.colors.slider.tick_after'
	mdw-colorBeforeThumb='#mdwTheme:vis-materialdesign.0.colors.slider.control_before'
	mdw-colorThumb='#mdwTheme:vis-materialdesign.0.colors.slider.control'
	mdw-colorAfterThumb='#mdwTheme:vis-materialdesign.0.colors.slider.control_behind'
	mdw-prepandText='prepand'
	mdw-prepandTextWidth='60'
	mdw-prepandTextColor='#mdwTheme:vis-materialdesign.0.colors.slider.text_prepand'
	mdw-prepandTextFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.slider.prepand'
	mdw-prepandTextFontFamily='#mdwTheme:vis-materialdesign.0.fonts.slider.prepand'
	mdw-showValueLabel='true'
	mdw-valueLabelStyle='sliderPercent'
	mdw-valueFontFamily='#mdwTheme:vis-materialdesign.0.fonts.slider.value'
	mdw-valueFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.slider.value'
	mdw-valueLabelColor='#mdwTheme:vis-materialdesign.0.colors.slider.text'
	mdw-valueLabelWidth='50'
	mdw-showThumbLabel='always'
	mdw-thumbBackgroundColor='#mdwTheme:vis-materialdesign.0.colors.slider.control_background'
	mdw-thumbFontColor='#mdwTheme:vis-materialdesign.0.colors.slider.control_text'
	mdw-thumbFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.slider.control'
	mdw-thumbFontFamily='#mdwTheme:vis-materialdesign.0.fonts.slider.control'
></div>
```

</details>

## Ползунок Круглый
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/round_slider.gif)

### Свойства HTML
Следующие свойства могут использоваться как [HTML-виджеты](#html-widgets).

<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения </th></tr></thead><tbody><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Общий</b></i></td></tr><tr><td> mdw-oid</td><td> ID объекта</td><td> нить</td><td></tr><tr><td> mdw-oid-рабочий</td><td> ID рабочего объекта</td><td> нить</td><td></tr><tr><td> mdw-min</td><td> мин</td><td> нить</td><td></tr><tr><td> mdw-max</td><td> Максимум</td><td> нить</td><td></tr><tr><td> mdw-step</td><td> шаги</td><td> нить</td><td></tr><tr><td> mdw-readOnly</td><td> только чтение</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-startAngle</td><td> начальный угол</td><td> номер</td><td></tr><tr><td> mdw-arcLength</td><td> длина дуги</td><td> номер</td><td></tr><tr><td> mdw-sliderWidth</td><td> толщина слайдера</td><td> номер</td><td></tr><tr><td> mdw-handleSize</td><td> размер ручки</td><td> номер</td><td></tr><tr><td> mdw-handleZoom</td><td> ручка увеличения на контроле</td><td> номер</td><td></tr><tr><td> mdw-rtl</td><td> движение ползунка справа налево</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-vibrateOnMobilDevices</td><td> вибрировать на мобильных устройствах [ах]</td><td> номер</td><td></tr><tr><td> mdw-debug</td><td> отлаживать</td><td> логический</td><td> ложь | правда</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>цвета</b></i></td></tr><tr><td> mdw-colorSliderBg</td><td> задний план</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-colorBeforeThumb</td><td> цвет перед регулятором</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-colorThumb</td><td> цвет регулятора</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-colorAfterThumb</td><td> цвет после регулятора</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-valueLabelColor</td><td> цвет текста значения</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>маркировка</b></i></td></tr><tr><td> mdw-showValueLabel</td><td> показать ценность</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-valueLabelVerticalPosition</td><td> положение значения по вертикали</td><td> номер</td><td></tr><tr><td> mdw-valueLabelStyle</td><td> значение стиля подписи</td><td> нить</td><td> sliderPercent | sliderValue</tr><tr><td> mdw-valueLabelUnit</td><td> Ед. изм</td><td> нить</td><td></tr><tr><td> mdw-valueFontFamily</td><td> valueFontFamily</td><td> нить</td><td></tr><tr><td> mdw-valueFontSize</td><td> значение размера шрифта</td><td> номер</td><td></tr><tr><td> mdw-valueLabelMin</td><td> текст для значения меньше min</td><td> нить</td><td></tr><tr><td> mdw-valueLabelMax</td><td> текст для значения больше min</td><td> нить</td><td></tr><tr><td> mdw-valueLessThan</td><td> условие &quot;меньше чем&quot; для текста значения</td><td> номер</td><td></tr><tr><td> mdw-textForValueLessThan</td><td> текст для &quot;меньше чем&quot;</td><td> нить</td><td></tr><tr><td> mdw-valueGreaterThan</td><td> условие &#39;больше чем&#39; для текста значения</td><td> номер</td><td></tr><tr><td> mdw-textForValueGreaterThan</td><td> текст для &quot;больше чем&quot;</td><td> нить</td><td></tr></tbody></table>

<! - опустить в toc ->

#### Свойства HTML - пример
<details>

```
<div class="vis-widget materialdesign-widget materialdesign-slider-round materialdesign-roundslider-html-element"
	style="width: 100px; height: 100px; position: relative;"
	mdw-debug="false"
	mdw-oid='0_userdata.0.MDW.Slider.val0'
	mdw-oid-working='0_userdata.0.MDW.Slider.working'
	mdw-step='1'
	mdw-startAngle='135'
	mdw-arcLength='270'
	mdw-handleZoom='1.5'
	mdw-vibrateOnMobilDevices='50'
	mdw-colorSliderBg='#mdwTheme:vis-materialdesign.0.colors.slider.background'
	mdw-colorBeforeThumb='#mdwTheme:vis-materialdesign.0.colors.slider.control_before'
	mdw-colorThumb='#mdwTheme:vis-materialdesign.0.colors.slider.control'
	mdw-colorAfterThumb='#mdwTheme:vis-materialdesign.0.colors.slider.control_behind'
	mdw-valueLabelColor='#mdwTheme:vis-materialdesign.0.colors.slider.text'
	mdw-showValueLabel='true'
	mdw-valueLabelStyle='sliderValue'
	mdw-valueFontFamily='#mdwTheme:vis-materialdesign.0.fonts.slider.value'
	mdw-valueFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.slider.value'
></div>
```

</details>

## Вход
### Ввод текста
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/input.gif)

#### Настройки редактора
Настройки, не указанные в таблице ниже, не требуют пояснений.

<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание </th></tr></thead><tbody><tr><td rowspan=4><img src="doc/en/media/input_settings_common.png"></td><td> ID объекта</td><td> идентификатор точки данных</td></tr><tr><td> тип ввода</td><td> тип ввода текстового поля</td></tr><tr><td> Маска ввода</td><td> при использовании маски типа ввода вы можете определить маску. Допустимые свойства описаны в <a href="https://vuejs-tips.github.io/vue-the-mask/" target="_blank">документации по маске.</a></td></tr><tr><td> максимальная длина</td><td> максимальная длина текстового поля ввода</td></tr></tbody></table>

#### Свойства HTML
Следующие свойства могут использоваться как [HTML-виджеты](#html-widgets).

<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения </th></tr></thead><tbody><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Общий</b></i></td></tr><tr><td> mdw-oid</td><td> ID объекта</td><td> нить</td><td></tr><tr><td> mdw-inputType</td><td> тип ввода</td><td> нить</td><td> текст | номер | дата | время | маска</tr><tr><td> mdw-inputMask</td><td> Маска ввода</td><td> нить</td><td></tr><tr><td> mdw-inputMaxLength</td><td> максимальная длина</td><td> номер</td><td></tr><tr><td> mdw-debug</td><td> отлаживать</td><td> логический</td><td> ложь | правда</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>ввод макета</b></i></td></tr><tr><td> mdw-inputLayout</td><td> макет</td><td> нить</td><td> регулярный | соло | соло-округлые | соло-образный | заполненный | заполнено-округлые | заполненная форма | изложил | очерченный-округлый | очерченный</tr><tr><td> mdw-inputAlignment</td><td> выравнивание текста</td><td> нить</td><td> слева | центр | верно</tr><tr><td> mdw-inputLayoutBackgroundColor</td><td> фоновый цвет</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-inputLayoutBackgroundColorHover</td><td> цвет фона при наведении</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-inputLayoutBackgroundColorSelected</td><td> цвет фона выбран</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-inputLayoutBorderColor</td><td> цвет границы</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-inputLayoutBorderColorHover</td><td> цвет границы при наведении</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-inputLayoutBorderColorSelected</td><td> выбран цвет границы</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-inputTextFontFamily</td><td> шрифт</td><td> нить</td><td></tr><tr><td> mdw-inputTextFontSize</td><td> размер шрифта</td><td> номер</td><td></tr><tr><td> mdw-inputTextColor</td><td> цвет текста</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>метка ввода</b></i></td></tr><tr><td> mdw-inputLabelText</td><td> текст</td><td> нить</td><td></tr><tr><td> mdw-inputLabelColor</td><td> цвет текста</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-inputLabelColorSelected</td><td> цвет текста выбран</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-inputLabelFontFamily</td><td> шрифт</td><td> нить</td><td></tr><tr><td> mdw-inputLabelFontSize</td><td> размер шрифта</td><td> номер</td><td></tr><tr><td> mdw-inputTranslateX</td><td> смещение x</td><td> номер</td><td></tr><tr><td> mdw-inputTranslateY</td><td> смещение y</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>приложения ввода</b></i></td></tr><tr><td> mdw-inputPrefix</td><td> добавленный текст</td><td> нить</td><td></tr><tr><td> mdw-inputSuffix</td><td> добавленный текст</td><td> нить</td><td></tr><tr><td> mdw-inputAppendixColor</td><td> цвет текста</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-inputAppendixFontSize</td><td> размер шрифта</td><td> номер</td><td></tr><tr><td> mdw-inputAppendixFontFamily</td><td> шрифт</td><td> нить</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>дополнительный текст ввода</b></i></td></tr><tr><td> mdw-showInputMessageAlways</td><td> показывайте всегда</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-inputMessage</td><td> текст</td><td> нить</td><td></tr><tr><td> mdw-inputMessageFontFamily</td><td> шрифт</td><td> нить</td><td></tr><tr><td> mdw-inputMessageFontSize</td><td> размер шрифта</td><td> номер</td><td></tr><tr><td> mdw-inputMessageColor</td><td> цвет текста</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>макет стойки</b></i></td></tr><tr><td> mdw-showInputCounter</td><td> показать счетчик</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-inputCounterColor</td><td> Цвет шрифта</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-inputCounterFontSize</td><td> размер шрифта</td><td> номер</td><td></tr><tr><td> mdw-inputCounterFontFamily</td><td> шрифт</td><td> нить</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>Иконки</b></i></td></tr><tr><td> mdw-clearIconShow</td><td> показать значок удаления текста</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-clearIcon</td><td> значок удаления текста</td><td> нить</td><td></tr><tr><td> mdw-clearIconSize</td><td> размер значка удаления текста</td><td> номер</td><td></tr><tr><td> mdw-clearIconColor</td><td> цвет значка удаления текста</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-PrepandIcon</td><td> значок с префиксом</td><td> нить</td><td></tr><tr><td> mdw-PrepandIconSize</td><td> размер значка с префиксом</td><td> номер</td><td></tr><tr><td> mdw-PrepandIconColor</td><td> цвет значка префикса</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-PrepandInnerIcon</td><td> внутренний префиксный символ</td><td> нить</td><td></tr><tr><td> mdw-PrepandInnerIconSize</td><td> размер внутреннего префиксного символа</td><td> номер</td><td></tr><tr><td> mdw-PrepandInnerIconColor</td><td> цвет внутреннего префикса символа</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-appendIcon</td><td> добавленный символ</td><td> нить</td><td></tr><tr><td> mdw-appendIconSize</td><td> размер добавляемого символа</td><td> номер</td><td></tr><tr><td> mdw-appendIconColor</td><td> цвет добавленного символа</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-appendOuterIcon</td><td> внешний добавленный символ</td><td> нить</td><td></tr><tr><td> mdw-appendOuterIconSize</td><td> размер внешнего добавленного символа</td><td> номер</td><td></tr><tr><td> mdw-appendOuterIconColor</td><td> цвет внешнего добавленного символа</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr></tbody></table>

### Выбирать
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/select.gif)

Настройки, не указанные в таблице ниже, не требуют пояснений.

<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание</th></tr></thead><tbody><tr><td rowspan=6><img src="doc/en/media/select_autocomplete_settings.png"></td><td> метод данных меню</td><td> Есть три метода определения данных меню. Во-первых, нужно определить его через редактор. Во-вторых, определить его через строку json. Третий метод - определить его тремя списками для значений, меток и значков.</td></tr><tr><td> Редактор: количество пунктов меню</td><td> Способ ввода данных меню: через редактор<br> Определите количество пунктов меню. Отдельные пункты меню могут быть определены в пункте меню [x].</td></tr><tr><td> Строка JSON</td><td> Здесь вы можете добавить строку JSON для определения записей меню или использовать привязки к точке данных, содержащей строку JSON.<br><br> Строка JSON должна иметь формат, описанный выше.<br></td></tr><tr><td> список значений</td><td> Определите количество пунктов меню, добавив значения, которые будут установлены для точки данных. Записи должны разделяться точкой с запятой.</td></tr><tr><td> список значений: метки</td><td> Определите связанные метки значений. Записи должны разделяться точкой с запятой.</td></tr><tr><td> список значений: изображения</td><td> Определите соответствующие значки значений. Записи должны разделяться точкой с запятой. Вы можете использовать путь к изображению или название значков дизайна материалов</td></tr></tbody></table>

#### Меню свойств JSON
<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> текст</td><td> текст пункта меню</td><td> нить</td><td></td></tr><tr><td> подтекст</td><td> подтекст пункта меню</td><td> нить</td><td></td></tr><tr><td> значение</td><td> значение пункта меню, оно будет присвоено как значение точке данных, если оно выбрано</td><td> нить</td><td/></tr><tr><td> икона</td><td> значок материального дизайна или путь к изображению для пункта меню</td><td> нить</td><td/></tr><tr><td> iconColor</td><td> Цвет значка материального дизайна</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> iconColorSelectedTextField</td><td> цвет значка поля ввода при выборе</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr></tbody></table>

<! - опустить в toc ->

##### Меню свойств JSON - пример
<details>

```
[   {
		"text": "1 Tag",
		"subText": "sub",
		"value": "1 day",
		"icon": "home"
	},
	{
		"text": "3 Tage",
		"subText": "sub",
		"value": "3 days",
		"icon": "home"
	},
	{
		"text": "1 Woche",
		"subText": "sub",
		"value": "7 days",
		"icon": "home"
	},
	{
		"text": "2 Wochen",
		"subText": "sub",
		"value": "14 days",
		"icon": "home"
	},
	{
		"text": "1 Monat",
		"subText": "sub",
		"value": "1 month",
		"icon": "/vis.0/myImages/hard-drive.png"
	},
	{
		"text": "2 Monate",
		"subText": "sub",
		"value": "2 months",
		"icon": "home",
		"iconColor": "blue",
		"iconColorSelectedTextField": "purple"
	},
	{
		"text": "3 Monate",
		"value": "3 months"
	},
	{
		"text": "6 Monate",
		"value": "6 months"
	},
	{
		"text": "1 Jahr",
		"value": "1 year"
	}
]
```

</details>

#### Свойства HTML
Следующие свойства могут использоваться как [HTML-виджеты](#html-widgets).

<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения </th></tr></thead><tbody><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Общий</b></i></td></tr><tr><td> mdw-oid</td><td> ID объекта</td><td> нить</td><td></tr><tr><td> mdw-inputType</td><td> тип ввода</td><td> нить</td><td> текст | дата | время</tr><tr><td> mdw-vibrateOnMobilDevices</td><td> вибрировать на мобильных устройствах [ах]</td><td> номер</td><td></tr><tr><td> mdw-debug</td><td> отлаживать</td><td> логический</td><td> ложь | правда</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>ввод макета</b></i></td></tr><tr><td> mdw-inputLayout</td><td> макет</td><td> нить</td><td> регулярный | соло | соло-округлые | соло-образный | заполненный | заполнено-округлые | заполненная форма | изложил | очерченный-округлый | очерченный</tr><tr><td> mdw-inputAlignment</td><td> выравнивание текста</td><td> нить</td><td> слева | центр | верно</tr><tr><td> mdw-inputLayoutBackgroundColor</td><td> фоновый цвет</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-inputLayoutBackgroundColorHover</td><td> цвет фона при наведении</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-inputLayoutBackgroundColorSelected</td><td> цвет фона выбран</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-inputLayoutBorderColor</td><td> цвет границы</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-inputLayoutBorderColorHover</td><td> цвет границы при наведении</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-inputLayoutBorderColorSelected</td><td> выбран цвет границы</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-inputTextFontFamily</td><td> шрифт</td><td> нить</td><td></tr><tr><td> mdw-inputTextFontSize</td><td> размер шрифта</td><td> номер</td><td></tr><tr><td> mdw-inputTextColor</td><td> цвет текста</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>метка ввода</b></i></td></tr><tr><td> mdw-inputLabelText</td><td> текст</td><td> нить</td><td></tr><tr><td> mdw-inputLabelColor</td><td> цвет текста</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-inputLabelColorSelected</td><td> цвет текста выбран</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-inputLabelFontFamily</td><td> шрифт</td><td> нить</td><td></tr><tr><td> mdw-inputLabelFontSize</td><td> размер шрифта</td><td> номер</td><td></tr><tr><td> mdw-inputTranslateX</td><td> смещение x</td><td> номер</td><td></tr><tr><td> mdw-inputTranslateY</td><td> смещение y</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>приложения ввода</b></i></td></tr><tr><td> mdw-inputPrefix</td><td> добавленный текст</td><td> нить</td><td></tr><tr><td> mdw-inputSuffix</td><td> добавленный текст</td><td> нить</td><td></tr><tr><td> mdw-inputAppendixColor</td><td> цвет текста</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-inputAppendixFontSize</td><td> размер шрифта</td><td> номер</td><td></tr><tr><td> mdw-inputAppendixFontFamily</td><td> шрифт</td><td> нить</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>дополнительный текст ввода</b></i></td></tr><tr><td> mdw-showInputMessageAlways</td><td> показывайте всегда</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-inputMessage</td><td> текст</td><td> нить</td><td></tr><tr><td> mdw-inputMessageFontFamily</td><td> шрифт</td><td> нить</td><td></tr><tr><td> mdw-inputMessageFontSize</td><td> размер шрифта</td><td> номер</td><td></tr><tr><td> mdw-inputMessageColor</td><td> цвет текста</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>макет стойки</b></i></td></tr><tr><td> mdw-showInputCounter</td><td> показать счетчик</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-inputCounterColor</td><td> Цвет шрифта</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-inputCounterFontSize</td><td> размер шрифта</td><td> номер</td><td></tr><tr><td> mdw-inputCounterFontFamily</td><td> шрифт</td><td> нить</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>Иконки</b></i></td></tr><tr><td> mdw-clearIconShow</td><td> показать значок удаления текста</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-clearIcon</td><td> значок удаления текста</td><td> нить</td><td></tr><tr><td> mdw-clearIconSize</td><td> размер значка удаления текста</td><td> номер</td><td></tr><tr><td> mdw-clearIconColor</td><td> цвет значка удаления текста</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-collapseIcon</td><td> символ открытия меню</td><td> нить</td><td></tr><tr><td> mdw-collapseIconSize</td><td> размер символа открытия меню</td><td> номер</td><td></tr><tr><td> mdw-collapseIconColor</td><td> цвет символа открытия меню</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-PrepandIcon</td><td> значок с префиксом</td><td> нить</td><td></tr><tr><td> mdw-PrepandIconSize</td><td> размер значка с префиксом</td><td> номер</td><td></tr><tr><td> mdw-PrepandIconColor</td><td> цвет значка префикса</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-PrepandInnerIcon</td><td> внутренний префиксный символ</td><td> нить</td><td></tr><tr><td> mdw-PrepandInnerIconSize</td><td> размер внутреннего префиксного символа</td><td> номер</td><td></tr><tr><td> mdw-PrepandInnerIconColor</td><td> цвет внутреннего префикса символа</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-appendOuterIcon</td><td> внешний добавленный символ</td><td> нить</td><td></tr><tr><td> mdw-appendOuterIconSize</td><td> размер внешнего добавленного символа</td><td> номер</td><td></tr><tr><td> mdw-appendOuterIconColor</td><td> цвет внешнего добавленного символа</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>данные меню</b></i></td></tr><tr><td> mdw-listDataMethod</td><td> метод ввода данных меню</td><td> нить</td><td> inputPerEditor | jsonStringObject | multistatesObject | valueList</tr><tr><td> mdw-countSelectItems</td><td> Редактор: количество пунктов меню</td><td> номер</td><td></tr><tr><td> mdw-jsonStringObject</td><td> Строка JSON. Должен быть экранированный HTML! Подсказка: используйте <a href="https://github.com/mathiasbynens/he#heencodetext-options" target="_blank">библиотеку</a> в своих скриптах для кодирования в HTML</td><td> нить</td><td></tr><tr><td> mdw-valueList</td><td> список значений</td><td> нить</td><td></tr><tr><td> mdw-valueListLabels</td><td> список значений: метки</td><td> нить</td><td></tr><tr><td> mdw-valueListIcons</td><td> список значений: изображения</td><td> нить</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>макет меню</b></i></td></tr><tr><td> mdw-listPosition</td><td> должность</td><td> нить</td><td> авто | наверх | Нижний</tr><tr><td> mdw-listPositionOffset</td><td> использовать смещение позиции</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-openOnClear</td><td> открыть меню с помощью кнопки очистки</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-listItemHeight</td><td> высота пункта меню</td><td> номер</td><td></tr><tr><td> mdw-listItemBackgroundColor</td><td> фоновый цвет</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-listItemBackgroundHoverColor</td><td> цвет наведения</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-listItemBackgroundSelectedColor</td><td> цвет выбранного элемента</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-listItemRippleEffectColor</td><td> цвет эффекта</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-showSelectedIcon</td><td> показать значок выбранного элемента</td><td> нить</td><td> нет | добавить | prepend-inner | добавление-внешний</tr><tr><td> mdw-listIconSize</td><td> размер значка</td><td> номер</td><td></tr><tr><td> mdw-listIconColor</td><td> цвет значка</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-listIconHoverColor</td><td> цвет значка при наведении</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-listIconSelectedColor</td><td> цвет значка выбранного элемента</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-listItemFontSize</td><td> размер шрифта</td><td> номер</td><td></tr><tr><td> mdw-listItemFont</td><td> шрифт</td><td> нить</td><td></tr><tr><td> mdw-listItemFontColor</td><td> Цвет шрифта</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-listItemFontHoverColor</td><td> цвет шрифта при наведении</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-listItemFontSelectedColor</td><td> цвет шрифта выбранного элемента</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-listItemSubFontSize</td><td> второй размер шрифта текста</td><td> номер</td><td></tr><tr><td> mdw-listItemSubFont</td><td> второй шрифт текста</td><td> нить</td><td></tr><tr><td> mdw-listItemSubFontColor</td><td> второй цвет шрифта текста</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-listItemSubFontHoverColor</td><td> цвет второго текста при наведении</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-listItemSubFontSelectedColor</td><td> цвет второго выделенного текста</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-showValue</td><td> показать ценность</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-listItemValueFontSize</td><td> размер шрифта значения</td><td> номер</td><td></tr><tr><td> mdw-listItemValueFont</td><td> шрифт значения</td><td> нить</td><td></tr><tr><td> mdw-listItemValueFontColor</td><td> цвет шрифта значения</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-listItemValueFontHoverColor</td><td> цвет шрифта при наведении на значение</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-listItemValueFontSelectedColor</td><td> цвет шрифта выбранного значения</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>пункт меню [x]</b></i></td></tr><tr><td> mdw-значение [x]</td><td> значение</td><td> нить</td><td></tr><tr><td> mdw-label [x]</td><td> метка</td><td> нить</td><td></tr><tr><td> mdw-subLabel [x]</td><td> второй текст</td><td> нить</td><td></tr><tr><td> mdw-listIcon [x]</td><td> икона</td><td> нить</td><td></tr><tr><td> mdw-listIconColor [x]</td><td> цвет значка</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-imageColorSelectedTextField [x]</td><td> выбранный цвет значка для текстового поля</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr></tbody></table>

<! - опустить в toc ->

##### Свойства HTML - пример
<details>

```
<div class='vis-widget materialdesign-widget materialdesign-select materialdesign-select-html-element'
	style='width: 322px; height: 38px; position: relative; overflow: visible; display: flex; align-items: center;'
	mdw-debug='true'
	mdw-oid='0_userdata.0.MDW.Input.string'
	mdw-inputType='text'
	mdw-vibrateOnMobilDevices='50'
	mdw-inputLayout='regular'
	mdw-inputAlignment='left'
	mdw-inputLayoutBorderColor='#mdwTheme:vis-materialdesign.0.colors.input.border'
	mdw-inputLayoutBorderColorHover='#mdwTheme:vis-materialdesign.0.colors.input.border_hover'
	mdw-inputLayoutBorderColorSelected='#mdwTheme:vis-materialdesign.0.colors.input.border_selected'
	mdw-inputTextFontFamily='#mdwTheme:vis-materialdesign.0.fonts.input.text'
	mdw-inputTextFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.text'
	mdw-inputTextColor='#mdwTheme:vis-materialdesign.0.colors.input.text'
	mdw-inputLabelText='Fuu'
	mdw-inputLabelColor='#mdwTheme:vis-materialdesign.0.colors.input.label'
	mdw-inputLabelColorSelected='#mdwTheme:vis-materialdesign.0.colors.input.label_selected'
	mdw-inputLabelFontFamily='#mdwTheme:vis-materialdesign.0.fonts.input.label'
	mdw-inputLabelFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.label'
	mdw-inputAppendixColor='#mdwTheme:vis-materialdesign.0.colors.input.appendix'
	mdw-inputAppendixFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.appendix'
	mdw-inputAppendixFontFamily='#mdwTheme:vis-materialdesign.0.fonts.input.appendix'
	mdw-showInputMessageAlways='true'
	mdw-inputMessageFontFamily='#mdwTheme:vis-materialdesign.0.fonts.input.message'
	mdw-inputMessageFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.message'
	mdw-inputMessageColor='#mdwTheme:vis-materialdesign.0.colors.input.message'
	mdw-showInputCounter='true'
	mdw-inputCounterColor='#mdwTheme:vis-materialdesign.0.colors.input.counter'
	mdw-inputCounterFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.counter'
	mdw-inputCounterFontFamily='#mdwTheme:vis-materialdesign.0.fonts.input.counter'
	mdw-clearIconShow='true'
	mdw-clearIconColor='#mdwTheme:vis-materialdesign.0.colors.input.icon_clear'
	mdw-collapseIconColor='#mdwTheme:vis-materialdesign.0.colors.input.icon_collapse'
	mdw-prepandIcon='account-network'
	mdw-prepandIconSize='30'
	mdw-prepandIconColor='#f91010'
	mdw-prepandInnerIcon='alert-box'
	mdw-prepandInnerIconSize='20'
	mdw-appendOuterIcon='/vis.0/myImages/hard-drive.png'
	mdw-listDataMethod='jsonStringObject'
	mdw-countSelectItems='0'
	mdw-jsonStringObject='[   {
&#x9;&#x9;&#x22;text&#x22;: &#x22;1 Tag&#x22;,
&#x9;&#x9;&#x22;subText&#x22;: &#x22;sub&#x22;,
&#x9;&#x9;&#x22;value&#x22;: &#x22;1 day&#x22;,
&#x9;&#x9;&#x22;icon&#x22;: &#x22;home&#x22;
&#x9;},
&#x9;{
&#x9;&#x9;&#x22;text&#x22;: &#x22;3 Tage&#x22;,
&#x9;&#x9;&#x22;subText&#x22;: &#x22;sub&#x22;,&#x9;&#x9;
&#x9;&#x9;&#x22;value&#x22;: &#x22;3 days&#x22;,
&#x9;&#x9;&#x22;icon&#x22;: &#x22;home&#x22;
&#x9;},
&#x9;{
&#x9;&#x9;&#x22;text&#x22;: &#x22;1 Woche&#x22;,
&#x9;&#x9;&#x22;subText&#x22;: &#x22;sub&#x22;,&#x9;&#x9;
&#x9;&#x9;&#x22;value&#x22;: &#x22;7 days&#x22;,
&#x9;&#x9;&#x22;icon&#x22;: &#x22;home&#x22;
&#x9;},
&#x9;{
&#x9;&#x9;&#x22;text&#x22;: &#x22;2 Wochen&#x22;,
&#x9;&#x9;&#x22;subText&#x22;: &#x22;sub&#x22;,&#x9;&#x9;
&#x9;&#x9;&#x22;value&#x22;: &#x22;14 days&#x22;,
&#x9;&#x9;&#x22;icon&#x22;: &#x22;home&#x22;
&#x9;},
&#x9;{
&#x9;&#x9;&#x22;text&#x22;: &#x22;1 Monat&#x22;,
&#x9;&#x9;&#x22;subText&#x22;: &#x22;sub&#x22;,&#x9;&#x9;
&#x9;&#x9;&#x22;value&#x22;: &#x22;1 month&#x22;,
&#x9;&#x9;&#x22;icon&#x22;: &#x22;/vis.0/myImages/hard-drive.png&#x22;
&#x9;},
&#x9;{
&#x9;&#x9;&#x22;text&#x22;: &#x22;2 Monate&#x22;,
&#x9;&#x9;&#x22;subText&#x22;: &#x22;sub&#x22;,&#x9;&#x9;
&#x9;&#x9;&#x22;value&#x22;: &#x22;2 months&#x22;,
&#x9;&#x9;&#x22;icon&#x22;: &#x22;home&#x22;,
&#x9;&#x9;&#x22;iconColor&#x22;: &#x22;blue&#x22;,
&#x9;&#x9;&#x22;iconColorSelectedTextField&#x22;: &#x22;purple&#x22;
&#x9;},
&#x9;{
&#x9;&#x9;&#x22;text&#x22;: &#x22;3 Monate&#x22;,
&#x9;&#x9;&#x22;value&#x22;: &#x22;3 months&#x22;
&#x9;},
&#x9;{
&#x9;&#x9;&#x22;text&#x22;: &#x22;6 Monate&#x22;,
&#x9;&#x9;&#x22;value&#x22;: &#x22;6 months&#x22;
&#x9;},
&#x9;{
&#x9;&#x9;&#x22;text&#x22;: &#x22;1 Jahr&#x22;,
&#x9;&#x9;&#x22;value&#x22;: &#x22;1 year&#x22;
&#x9;}
]'
	mdw-listPosition='bottom'
	mdw-listPositionOffset='true'
	mdw-listItemBackgroundColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.background'
	mdw-listItemBackgroundHoverColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.hover'
	mdw-listItemBackgroundSelectedColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.selected'
	mdw-listItemRippleEffectColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.effect'
	mdw-showSelectedIcon='prepend-inner'
	mdw-listIconColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.icon'
	mdw-listIconHoverColor='#bf0d0d'
	mdw-listIconSelectedColor='#42ff2e'
	mdw-listItemFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.dropdown.text'
	mdw-listItemFont='#mdwTheme:vis-materialdesign.0.fonts.input.dropdown.text'
	mdw-listItemFontColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.text'
	mdw-listItemSubFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.dropdown.subText'
	mdw-listItemSubFont='#mdwTheme:vis-materialdesign.0.fonts.input.dropdown.subText'
	mdw-listItemSubFontColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.subText'
	mdw-showValue='true'
	mdw-listItemValueFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.dropdown.value'
	mdw-listItemValueFont='#mdwTheme:vis-materialdesign.0.fonts.input.dropdown.value'
	mdw-listItemValueFontColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.value'
></div>
```

</details>

### Автозаполнение
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/autocomplete.gif)

Настройки, не указанные в таблице ниже, не требуют пояснений.

<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание</th></tr></thead><tbody><tr><td rowspan=6><img src="doc/en/media/select_autocomplete_settings.png"></td><td> метод данных меню</td><td> Есть три метода определения данных меню. Во-первых, нужно определить его через редактор. Во-вторых, определить его через строку json. Третий метод - определить его тремя списками для значений, меток и значков.</td></tr><tr><td> Редактор: количество пунктов меню</td><td> Способ ввода данных меню: через редактор<br> Определите количество пунктов меню. Отдельные пункты меню могут быть определены в пункте меню [x].</td></tr><tr><td> Строка JSON</td><td> Здесь вы можете добавить строку JSON для определения записей меню или использовать привязки к точке данных, содержащей строку JSON.<br><br> Строка JSON должна иметь формат, описанный выше.<br></td></tr><tr><td> список значений</td><td> Определите количество пунктов меню, добавив значения, которые будут установлены для точки данных. Записи должны разделяться точкой с запятой.</td></tr><tr><td> список значений: метки</td><td> Определите связанные метки значений. Записи должны разделяться точкой с запятой.</td></tr><tr><td> список значений: изображения</td><td> Определите соответствующие значки значений. Записи должны разделяться точкой с запятой. Вы можете использовать путь к изображению или название значков дизайна материалов</td></tr></tbody></table>

#### Меню свойств JSON
<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> текст</td><td> текст пункта меню</td><td> нить</td><td></td></tr><tr><td> подтекст</td><td> подтекст пункта меню</td><td> нить</td><td></td></tr><tr><td> значение</td><td> значение пункта меню, оно будет присвоено как значение точке данных, если оно выбрано</td><td> нить</td><td/></tr><tr><td> икона</td><td> значок материального дизайна или путь к изображению для пункта меню</td><td> нить</td><td/></tr><tr><td> iconColor</td><td> Цвет значка материального дизайна</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> iconColorSelectedTextField</td><td> цвет значка поля ввода при выборе</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr></tbody></table>

<! - опустить в toc ->

##### Меню свойств JSON - пример
<details>

```
[   {
		"text": "1 Tag",
		"subText": "sub",
		"value": "1 day",
		"icon": "home"
	},
	{
		"text": "3 Tage",
		"subText": "sub",
		"value": "3 days",
		"icon": "home"
	},
	{
		"text": "1 Woche",
		"subText": "sub",
		"value": "7 days",
		"icon": "home"
	},
	{
		"text": "2 Wochen",
		"subText": "sub",
		"value": "14 days",
		"icon": "home"
	},
	{
		"text": "1 Monat",
		"subText": "sub",
		"value": "1 month",
		"icon": "/vis.0/myImages/hard-drive.png"
	},
	{
		"text": "2 Monate",
		"subText": "sub",
		"value": "2 months",
		"icon": "home",
		"iconColor": "blue",
		"iconColorSelectedTextField": "purple"
	},
	{
		"text": "3 Monate",
		"value": "3 months"
	},
	{
		"text": "6 Monate",
		"value": "6 months"
	},
	{
		"text": "1 Jahr",
		"value": "1 year"
	}
]
```

</details>

#### Свойства HTML
Следующие свойства могут использоваться как [HTML-виджеты](#html-widgets).

<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения </th></tr></thead><tbody><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>Общий</b></i></td></tr><tr><td> mdw-oid</td><td> ID объекта</td><td> нить</td><td></tr><tr><td> mdw-inputMode</td><td> режим ввода</td><td> нить</td><td> написать | Выбрать</tr><tr><td> mdw-inputType</td><td> тип ввода</td><td> нить</td><td> текст | дата | время</tr><tr><td> mdw-vibrateOnMobilDevices</td><td> вибрировать на мобильных устройствах [ах]</td><td> номер</td><td></tr><tr><td> mdw-debug</td><td> отлаживать</td><td> логический</td><td> ложь | правда</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>ввод макета</b></i></td></tr><tr><td> mdw-inputLayout</td><td> макет</td><td> нить</td><td> регулярный | соло | соло-округлые | соло-образный | заполненный | заполнено-округлые | заполненная форма | изложил | очерченный-округлый | очерченный</tr><tr><td> mdw-inputAlignment</td><td> выравнивание текста</td><td> нить</td><td> слева | центр | верно</tr><tr><td> mdw-inputLayoutBackgroundColor</td><td> фоновый цвет</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-inputLayoutBackgroundColorHover</td><td> цвет фона при наведении</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-inputLayoutBackgroundColorSelected</td><td> цвет фона выбран</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-inputLayoutBorderColor</td><td> цвет границы</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-inputLayoutBorderColorHover</td><td> цвет границы при наведении</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-inputLayoutBorderColorSelected</td><td> выбран цвет границы</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-inputTextFontFamily</td><td> шрифт</td><td> нить</td><td></tr><tr><td> mdw-inputTextFontSize</td><td> размер шрифта</td><td> номер</td><td></tr><tr><td> mdw-inputTextColor</td><td> цвет текста</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>метка ввода</b></i></td></tr><tr><td> mdw-inputLabelText</td><td> текст</td><td> нить</td><td></tr><tr><td> mdw-inputLabelColor</td><td> цвет текста</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-inputLabelColorSelected</td><td> цвет текста выбран</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-inputLabelFontFamily</td><td> шрифт</td><td> нить</td><td></tr><tr><td> mdw-inputLabelFontSize</td><td> размер шрифта</td><td> номер</td><td></tr><tr><td> mdw-inputTranslateX</td><td> смещение x</td><td> номер</td><td></tr><tr><td> mdw-inputTranslateY</td><td> смещение y</td><td> номер</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>приложения ввода</b></i></td></tr><tr><td> mdw-inputPrefix</td><td> добавленный текст</td><td> нить</td><td></tr><tr><td> mdw-inputSuffix</td><td> добавленный текст</td><td> нить</td><td></tr><tr><td> mdw-inputAppendixColor</td><td> цвет текста</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-inputAppendixFontSize</td><td> размер шрифта</td><td> номер</td><td></tr><tr><td> mdw-inputAppendixFontFamily</td><td> шрифт</td><td> нить</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>дополнительный текст ввода</b></i></td></tr><tr><td> mdw-showInputMessageAlways</td><td> показывайте всегда</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-inputMessage</td><td> текст</td><td> нить</td><td></tr><tr><td> mdw-inputMessageFontFamily</td><td> шрифт</td><td> нить</td><td></tr><tr><td> mdw-inputMessageFontSize</td><td> размер шрифта</td><td> номер</td><td></tr><tr><td> mdw-inputMessageColor</td><td> цвет текста</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>макет стойки</b></i></td></tr><tr><td> mdw-showInputCounter</td><td> показать счетчик</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-inputCounterColor</td><td> Цвет шрифта</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-inputCounterFontSize</td><td> размер шрифта</td><td> номер</td><td></tr><tr><td> mdw-inputCounterFontFamily</td><td> шрифт</td><td> нить</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>Иконки</b></i></td></tr><tr><td> mdw-clearIconShow</td><td> показать значок удаления текста</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-clearIcon</td><td> значок удаления текста</td><td> нить</td><td></tr><tr><td> mdw-clearIconSize</td><td> размер значка удаления текста</td><td> номер</td><td></tr><tr><td> mdw-clearIconColor</td><td> цвет значка удаления текста</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-collapseIcon</td><td> символ открытия меню</td><td> нить</td><td></tr><tr><td> mdw-collapseIconSize</td><td> размер символа открытия меню</td><td> номер</td><td></tr><tr><td> mdw-collapseIconColor</td><td> цвет символа открытия меню</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-PrepandIcon</td><td> значок с префиксом</td><td> нить</td><td></tr><tr><td> mdw-PrepandIconSize</td><td> размер значка с префиксом</td><td> номер</td><td></tr><tr><td> mdw-PrepandIconColor</td><td> цвет значка префикса</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-PrepandInnerIcon</td><td> внутренний префиксный символ</td><td> нить</td><td></tr><tr><td> mdw-PrepandInnerIconSize</td><td> размер внутреннего префиксного символа</td><td> номер</td><td></tr><tr><td> mdw-PrepandInnerIconColor</td><td> цвет внутреннего префикса символа</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-appendOuterIcon</td><td> внешний добавленный символ</td><td> нить</td><td></tr><tr><td> mdw-appendOuterIconSize</td><td> размер внешнего добавленного символа</td><td> номер</td><td></tr><tr><td> mdw-appendOuterIconColor</td><td> цвет внешнего добавленного символа</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>данные меню</b></i></td></tr><tr><td> mdw-listDataMethod</td><td> метод ввода данных меню</td><td> нить</td><td> inputPerEditor | jsonStringObject | multistatesObject | valueList</tr><tr><td> mdw-countSelectItems</td><td> Редактор: количество пунктов меню</td><td> номер</td><td></tr><tr><td> mdw-jsonStringObject</td><td> Строка JSON. Должен быть экранированный HTML! Подсказка: используйте <a href="https://github.com/mathiasbynens/he#heencodetext-options" target="_blank">библиотеку</a> в своих скриптах для кодирования в HTML</td><td> нить</td><td></tr><tr><td> mdw-valueList</td><td> список значений</td><td> нить</td><td></tr><tr><td> mdw-valueListLabels</td><td> список значений: метки</td><td> нить</td><td></tr><tr><td> mdw-valueListIcons</td><td> список значений: изображения</td><td> нить</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b><br>макет меню</b></i></td></tr><tr><td> mdw-listPosition</td><td> должность</td><td> нить</td><td> авто | наверх | Нижний</tr><tr><td> mdw-listPositionOffset</td><td> использовать смещение позиции</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-openOnClear</td><td> открыть меню с помощью кнопки очистки</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-listItemHeight</td><td> высота пункта меню</td><td> номер</td><td></tr><tr><td> mdw-listItemBackgroundColor</td><td> фоновый цвет</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-listItemBackgroundHoverColor</td><td> цвет наведения</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-listItemBackgroundSelectedColor</td><td> цвет выбранного элемента</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-listItemRippleEffectColor</td><td> цвет эффекта</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-showSelectedIcon</td><td> показать значок выбранного элемента</td><td> нить</td><td> нет | добавить | prepend-inner | добавление-внешний</tr><tr><td> mdw-listIconSize</td><td> размер значка</td><td> номер</td><td></tr><tr><td> mdw-listIconColor</td><td> цвет значка</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-listIconHoverColor</td><td> цвет значка при наведении</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-listIconSelectedColor</td><td> цвет значка выбранного элемента</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-listItemFontSize</td><td> размер шрифта</td><td> номер</td><td></tr><tr><td> mdw-listItemFont</td><td> шрифт</td><td> нить</td><td></tr><tr><td> mdw-listItemFontColor</td><td> Цвет шрифта</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-listItemFontHoverColor</td><td> цвет шрифта при наведении</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-listItemFontSelectedColor</td><td> цвет шрифта выбранного элемента</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-listItemSubFontSize</td><td> второй размер шрифта текста</td><td> номер</td><td></tr><tr><td> mdw-listItemSubFont</td><td> второй шрифт текста</td><td> нить</td><td></tr><tr><td> mdw-listItemSubFontColor</td><td> второй цвет шрифта текста</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-listItemSubFontHoverColor</td><td> цвет второго текста при наведении</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-listItemSubFontSelectedColor</td><td> цвет второго выделенного текста</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-showValue</td><td> показать ценность</td><td> логический</td><td> ложь | правда</tr><tr><td> mdw-listItemValueFontSize</td><td> размер шрифта значения</td><td> номер</td><td></tr><tr><td> mdw-listItemValueFont</td><td> шрифт значения</td><td> нить</td><td></tr><tr><td> mdw-listItemValueFontColor</td><td> цвет шрифта значения</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-listItemValueFontHoverColor</td><td> цвет шрифта при наведении на значение</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-listItemValueFontSelectedColor</td><td> цвет шрифта выбранного значения</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"> <i><b><br>пункт меню [x]</b></i></td></tr><tr><td> mdw-значение [x]</td><td> значение</td><td> нить</td><td></tr><tr><td> mdw-label [x]</td><td> метка</td><td> нить</td><td></tr><tr><td> mdw-subLabel [x]</td><td> второй текст</td><td> нить</td><td></tr><tr><td> mdw-listIcon [x]</td><td> икона</td><td> нить</td><td></tr><tr><td> mdw-listIconColor [x]</td><td> цвет значка</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr><tr><td> mdw-imageColorSelectedTextField [x]</td><td> выбранный цвет значка для текстового поля</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</tr></tbody></table>

<! - опустить в toc ->

##### Свойства HTML - пример
<details>

```
<div class='vis-widget materialdesign-widget materialdesign-autocomplete materialdesign-autocomplete-html-element'
	style='width: 354px; height: 38px; position: relative; overflow: visible; display: flex; align-items: center;'
	mdw-oid='0_userdata.0.MDW.Input.string'
	mdw-inputMode='write'
	mdw-inputType='text'
	mdw-vibrateOnMobilDevices='50'
	mdw-inputLayout='regular'
	mdw-inputAlignment='left'
	mdw-inputLayoutBorderColor='#mdwTheme:vis-materialdesign.0.colors.input.border'
	mdw-inputLayoutBorderColorHover='#mdwTheme:vis-materialdesign.0.colors.input.border_hover'
	mdw-inputLayoutBorderColorSelected='#mdwTheme:vis-materialdesign.0.colors.input.border_selected'
	mdw-inputTextFontFamily='#mdwTheme:vis-materialdesign.0.fonts.input.text'
	mdw-inputTextFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.text'
	mdw-inputTextColor='#mdwTheme:vis-materialdesign.0.colors.input.text'
	mdw-inputLabelText='fuuu'
	mdw-inputLabelColor='#mdwTheme:vis-materialdesign.0.colors.input.label'
	mdw-inputLabelColorSelected='#mdwTheme:vis-materialdesign.0.colors.input.label_selected'
	mdw-inputLabelFontFamily='#mdwTheme:vis-materialdesign.0.fonts.input.label'
	mdw-inputLabelFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.label'
	mdw-inputAppendixColor='#mdwTheme:vis-materialdesign.0.colors.input.appendix'
	mdw-inputAppendixFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.appendix'
	mdw-inputAppendixFontFamily='#mdwTheme:vis-materialdesign.0.fonts.input.appendix'
	mdw-showInputMessageAlways='true'
	mdw-inputMessageFontFamily='#mdwTheme:vis-materialdesign.0.fonts.input.message'
	mdw-inputMessageFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.message'
	mdw-inputMessageColor='#mdwTheme:vis-materialdesign.0.colors.input.message'
	mdw-showInputCounter='true'
	mdw-inputCounterColor='#mdwTheme:vis-materialdesign.0.colors.input.counter'
	mdw-inputCounterFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.counter'
	mdw-inputCounterFontFamily='#mdwTheme:vis-materialdesign.0.fonts.input.counter'
	mdw-clearIconShow='true'
	mdw-clearIconColor='#mdwTheme:vis-materialdesign.0.colors.input.icon_clear'
	mdw-collapseIconColor='#mdwTheme:vis-materialdesign.0.colors.input.icon_collapse'
	mdw-listDataMethod='jsonStringObject'
	mdw-countSelectItems='1'
	mdw-jsonStringObject='[   {
&#x9;&#x9;&#x22;text&#x22;: &#x22;1 Tag&#x22;,
&#x9;&#x9;&#x22;subText&#x22;: &#x22;sub&#x22;,
&#x9;&#x9;&#x22;value&#x22;: &#x22;1 day&#x22;,
&#x9;&#x9;&#x22;icon&#x22;: &#x22;home&#x22;
&#x9;},
&#x9;{
&#x9;&#x9;&#x22;text&#x22;: &#x22;3 Tage&#x22;,
&#x9;&#x9;&#x22;subText&#x22;: &#x22;sub&#x22;,&#x9;&#x9;
&#x9;&#x9;&#x22;value&#x22;: &#x22;3 days&#x22;,
&#x9;&#x9;&#x22;icon&#x22;: &#x22;home&#x22;
&#x9;},
&#x9;{
&#x9;&#x9;&#x22;text&#x22;: &#x22;1 Woche&#x22;,
&#x9;&#x9;&#x22;subText&#x22;: &#x22;sub&#x22;,&#x9;&#x9;
&#x9;&#x9;&#x22;value&#x22;: &#x22;7 days&#x22;,
&#x9;&#x9;&#x22;icon&#x22;: &#x22;home&#x22;
&#x9;},
&#x9;{
&#x9;&#x9;&#x22;text&#x22;: &#x22;2 Wochen&#x22;,
&#x9;&#x9;&#x22;subText&#x22;: &#x22;sub&#x22;,&#x9;&#x9;
&#x9;&#x9;&#x22;value&#x22;: &#x22;14 days&#x22;,
&#x9;&#x9;&#x22;icon&#x22;: &#x22;home&#x22;
&#x9;},
&#x9;{
&#x9;&#x9;&#x22;text&#x22;: &#x22;1 Monat&#x22;,
&#x9;&#x9;&#x22;subText&#x22;: &#x22;sub&#x22;,&#x9;&#x9;
&#x9;&#x9;&#x22;value&#x22;: &#x22;1 month&#x22;,
&#x9;&#x9;&#x22;icon&#x22;: &#x22;home&#x22;
&#x9;},
&#x9;{
&#x9;&#x9;&#x22;text&#x22;: &#x22;2 Monate&#x22;,
&#x9;&#x9;&#x22;subText&#x22;: &#x22;sub&#x22;,&#x9;&#x9;
&#x9;&#x9;&#x22;value&#x22;: &#x22;2 months&#x22;,
&#x9;&#x9;&#x22;icon&#x22;: &#x22;home&#x22;
&#x9;},
&#x9;{
&#x9;&#x9;&#x22;text&#x22;: &#x22;3 Monate&#x22;,
&#x9;&#x9;&#x22;value&#x22;: &#x22;3 months&#x22;
&#x9;},
&#x9;{
&#x9;&#x9;&#x22;text&#x22;: &#x22;6 Monate&#x22;,
&#x9;&#x9;&#x22;value&#x22;: &#x22;6 months&#x22;
&#x9;},
&#x9;{
&#x9;&#x9;&#x22;text&#x22;: &#x22;1 Jahr&#x22;,
&#x9;&#x9;&#x22;value&#x22;: &#x22;1 year&#x22;
&#x9;}
]'
	mdw-listPosition='auto'
	mdw-listPositionOffset='true'
	mdw-listItemBackgroundColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.background'
	mdw-listItemBackgroundHoverColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.hover'
	mdw-listItemBackgroundSelectedColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.selected'
	mdw-listItemRippleEffectColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.effect'
	mdw-showSelectedIcon='prepend-inner'
	mdw-listIconColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.icon'
	mdw-listItemFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.dropdown.text'
	mdw-listItemFont='#mdwTheme:vis-materialdesign.0.fonts.input.dropdown.text'
	mdw-listItemFontColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.text'
	mdw-listItemSubFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.dropdown.subText'
	mdw-listItemSubFont='#mdwTheme:vis-materialdesign.0.fonts.input.dropdown.subText'
	mdw-listItemSubFontColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.subText'
	mdw-showValue='true'
	mdw-listItemValueFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.dropdown.value'
	mdw-listItemValueFont='#mdwTheme:vis-materialdesign.0.fonts.input.dropdown.value'
	mdw-listItemValueFontColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.value'
></div>
```

</details>

## Верхняя панель приложения
Верхнюю панель приложения с навигационным ящиком можно объединить с <a href="https://www.iobroker.net/#en/documentation/viz/basic.md" target="_blank">представлением в виджете 8</a> .

<b>Взгляните на [Пример проекта Material Design Widgets](https://github.com/Scrounger/ioBroker.vis-materialdesign#online-example-project),</b> чтобы понять, как это работает.

##### Макет модальный:
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/topappbar_modal.gif)

##### Макет постоянный:
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/topappbar_permanent.gif)

##### Автоматическая раскладка:
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/topappbar_auto.gif)

Макет «Авто» автоматически переключается между «модальным» и «постоянным» макетом в зависимости от разрешения экрана. С помощью VIS-Editor вы можете установить разрешение, с которого должен использоваться «постоянный» макет (больше, чем условие).

** Подсказка: использование с виджетом «Просмотр в виджете 8» **

Для правильной работы с виджетом «вид в виджете 8» вам необходимо определить медиа-правило CSS.

* Сначала назначьте виджету «Общее правило CSS», например с именем `my-view-in-widget8`.
* Затем добавьте в свой проект следующий CSS:

```
.my-view-in-widget8 {
    top: 64px !important;
    height: calc(100% - 64px) !important;
    overflow-y: auto;
}
@media screen and (max-width: 800px) {
    /* Resolution lower than 800px -> using 'modal' layout */
    .my-view-in-widget8 {
        left: 0 !important;
        width: 100% !important;
    }
}
@media screen and (min-width: 800px) {
    /* Resolution higher than 800px -> using 'modal' layout */
    .my-view-in-widget8 {
        left: 256px !important;
        width: calc(100% - 256px) !important;
    }
}
```

* В CSS настройте разрешение в соответствии с разрешением, которое вы установили с помощью редактора VIS (в примере `max-width: 800px` и` min-width: 800px`)
* Если вы устанавливаете произвольную ширину для панели меню, вам также необходимо изменить свойства 'left' и 'width' в CSS на это значение (в примере `left: 256px! Important;` и `width: calc ( 100% - 256 пикселей)! Important; `)

### Настройки редактора
Настройки, не указанные в таблице ниже, не требуют пояснений.

<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание</th></tr></thead><tbody><tr><td rowspan=6><img src="doc/en/media/topappbar_common.png"></td><td> ID объекта</td><td> должен быть установлен на точку данных от типового номера. Например, эту точку данных можно использовать в <a href="https://www.iobroker.net/#en/documentation/viz/basic.md" target="_blank">представлении в виджете 8.</a></td></tr><tr><td> показать индекс элементов навигации</td><td> показывает индекс навигации перед меткой элемента. Этот номер можно использовать в <a href="https://www.iobroker.net/#en/documentation/viz/basic.md" target="_blank">представлении в виджете 8</a> для определения представления, которое должно отображаться, если элемент выбран.</td></tr><tr><td> количество элементов навигации</td><td> Определите количество элементов навигации</td></tr><tr><td> резервное значение, если не в группе пользователей</td><td> если вы используете разрешения группы, вы можете определить здесь значение, на которое нужно переключиться, если пользователь не входит в группу</td></tr><tr><td> отключить резервное значение</td><td> отключить резервное значение</td></tr><tr><td> Идентификатор объекта для идентификатора или имени выбранного пункта меню</td><td> При желании вы можете указать точку данных, в которую записывается имя или идентификатор меню выбранного элемента навигации.<br> Если идентификатор меню не указан, используется текст элемента навигации. Если выбранный элемент навигации является подменю, имя или идентификатор меню соответствующего элемента навигации и элемента подменю записываются через &#39;.&#39;, Например <code>EG.Wohnzimmer</code><br><br> Например, это можно использовать для динамического создания виджетов в зависимости от выбранного элемента навигации.</td></tr><tr><td rowspan=2><img src="doc/en/media/topappbar_data.png"></td><td> метод ввода для элементов навигации</td><td> Выберите, создаются ли элементы навигации редактором VIS или строкой json.</td></tr><tr><td> Строка JSON для элементов навигации</td><td> <a href="#menu-json-properties-2">подробности см. в меню «Свойства JSON» и «Свойства подменю JSON».</a></td></tr></tbody></table>

### Меню свойств JSON
пункты меню могут быть определены строкой JSON:

<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> menuId</td><td> определить пользовательский идентификатор для элемента меню, будет записан в «Идентификатор объекта для идентификатора или имени выбранного элемента меню», если он выбран</td><td> нить</td><td></td></tr><tr><td> текст</td><td> текст пункта меню</td><td> нить</td><td></td></tr><tr><td> заголовок</td><td> заголовок пункта меню</td><td> нить</td><td></td></tr><tr><td> икона</td><td> значок или изображение путь входа</td><td> нить</td><td></td></tr><tr><td> iconColor</td><td> цвет значка (не работает, если используется изображение)</td><td> цвет</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> разделитель</td><td> показать разделитель</td><td> логический</td><td> false true</td></tr><tr><td> userGroups</td><td> группы пользователей, которым разрешено просматривать эту запись и управлять ею.</td><td> массив [строка]</td><td> id групп пользователей</td></tr><tr><td> behaviorNotInUserGroup</td><td> скрыть или отключить запись, если пользователь не входит в группу пользователей</td><td> нить</td><td> скрыть, отключен</td></tr><tr><td> setValueOnMenuToggleClick</td><td> установить значение при щелчке по элементу, который переключает подменю</td><td> логический</td><td> false true</td></tr><tr><td> subMenuIconColor</td><td> цвет значка пунктов подменю (не работает, если используется изображение)</td><td> цвет</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> subMenus</td><td> Объект с элементами подменю, <a href="#submenu-json-properties">подробности см. В подменю Свойства JSON</a></td><td> массив [подменю]</td><td></td></tr></tbody></table>

<! - опустить в toc ->

#### Меню свойств JSON - пример
<details> <pre><code> [ { "text": "Start", "divider": "true", "icon": "home" }, { "menuId": "EG", "text": "Erdgeschoss", "icon": "home-floor-0", "setValueOnMenuToggleClick": "true", "subMenus": [ { "menuId": "Esszimmer", "text": "Esszimmer", "icon": "table-furniture" }, { "menuId": "Wohnzimmer", "text": "Wohnzimmer", "icon": "sofa" }, { "menuId": "Kueche", "text": "Küche", "icon": "sofa" }, { "menuId": "Eingang", "text": "Eingang", "icon": "sofa" }, { "menuId": "Flur", "text": "Flur", "icon": "sofa" }, { "menuId": "Bad", "text": "Bad", "icon": "sofa" }, { "menuId": "Zimmer", "text": "Zimmer", "icon": "sofa" } ] }, { "menuId": "DG", "text": "Dachgeschoss", "icon": "home-roof", "setValueOnMenuToggleClick": "true", "subMenus": [ { "text": "Flur", "icon": "table-furniture" }, { "text": "Galerie", "icon": "sofa" }, { "text": "Schlafzimmer", "icon": "sofa" }, { "text": "Ankleide", "icon": "sofa" }, { "text": "Bad", "icon": "sofa" }, { "text": "Kinderzimmer", "icon": "sofa" } ] } ] </code></pre> </details>

### Подменю
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/drawer_subMenu.png)

подменю должны быть определены строкой JSON:

#### Подменю Свойства JSON
<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> menuId</td><td> определить пользовательский идентификатор для элемента меню, будет записан в «Идентификатор объекта для идентификатора или имени выбранного элемента меню», если он выбран</td><td> нить</td><td></td></tr><tr><td> текст</td><td> текст подменю</td><td> нить</td><td></td></tr><tr><td> икона</td><td> значок или изображение путь входа</td><td> нить</td><td></td></tr><tr><td> iconColor</td><td> цвет значка (не работает, если используется изображение)</td><td> цвет</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> разделитель</td><td> показать разделитель</td><td> логический</td><td> false true</td></tr><tr><td> userGroups</td><td> группы пользователей, которым разрешено просматривать эту запись и управлять ею.</td><td> массив [строка]</td><td> id групп пользователей</td></tr><tr><td> behaviorNotInUserGroup</td><td> скрыть или отключить запись, если пользователь не входит в группу пользователей</td><td> нить</td><td> скрыть, отключен</td></tr></tbody></table>

<! - опустить в toc ->

##### Подменю "Свойства JSON" - пример
<details> <pre><code> [ { "text": "subitem0", "icon": "account", "iconColor": "red" }, { "text": "subitem1", "icon": "home", "iconColor": "green", "divider": "true" }, { "text": "subitem1", "divider": "true", "icon": "/vis.0/myImages/devices/lxc_iobroker.png", "userGroups": ["administrator", "user"], "behaviorNotInUserGroup": "disabled" } ] </code></pre> </details>

## Графики
### Гистограмма
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/barChart.png)

#### Настройки редактора
Настройки, не указанные в таблице ниже, не требуют пояснений.

<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание </th></tr></thead><tbody><tr><td rowspan=3><img src="doc/en/media/barchart_settings_common.png"></td><td>установить наборы данных с</td><td> Данные для BarChart можно ввести через редактор или использовать строку JSON.</td></tr><tr><td> Количество предметов</td><td> количество баров с использованием редактора vis для данных списка</td></tr><tr><td> Идентификатор объекта</td><td> идентификатор объекта точки данных, содержащей строку json. Допустимые свойства описаны ниже</td></tr><tr><td rowspan=><img src="doc/en/media/barchart_settings_dataset.png"></td><td> ID объекта [x]</td><td> идентификатор объекта для отдельных столбцов с использованием редактора vis</td></tr></tbody></table>

#### Свойства JSON набора данных
Строка JSON должна быть массивом объектов со следующими свойствами:

<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> метка</td><td> метка оси стержня</td><td> нить</td><td/></tr><tr><td> значение</td><td> значение бара</td><td> номер</td><td/></tr><tr><td> dataColor</td><td> цвет полосы</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td><td/></tr><tr><td> valueText</td><td> переопределить текст панели</td><td> нить</td><td/></tr><tr><td> valueColor</td><td> цвет текста значения</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td><td/></tr><tr><td> valueAppendix</td><td> приложение текста значения</td><td> нить</td><td/></tr><tr><td> tooltipTitle</td><td> заголовок всплывающей подсказки</td><td> нить</td><td/></tr><tr><td> tooltipText</td><td> текст всплывающей подсказки</td><td> нить</td><td/></tr></tbody></table>

<! - опустить в toc ->

#### Свойства JSON набора данных - пример
<details> <pre><code> [ { "label": "val0", "value": "30", "valueColor": "#ffffff" }, { "label": "val1", "value": "12.54645646", "tooltipTitle": "myTitle" }, { "label": "val2", "value": "48", "dataColor": "#c2c2c2", "valueAppendix": "\n extra" }, { "label": "val3", "value": "97", "valueColor": "#ffffff" }, { "label": "val4", "value": "32", "valueText": "text" } ] </pre></code> </details>

### Круговая диаграмма
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/pieChart.png)

#### Настройки редактора
Настройки, не указанные в таблице ниже, не требуют пояснений.

<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание </th></tr></thead><tbody><tr><td rowspan=3><img src="doc/en/media/piechart_settings_common.png"></td><td>установить наборы данных с</td><td> Данные для PieChart можно ввести через редактор или использовать строку JSON.</td></tr><tr><td> Количество предметов</td><td> количество штук пирожков с использованием редактора vis для данных списка</td></tr><tr><td> Идентификатор объекта</td><td> идентификатор объекта точки данных, содержащей строку json. Допустимые свойства описаны ниже</td></tr><tr><td rowspan=><img src="doc/en/media/barchart_settings_dataset.png"></td><td> ID объекта [x]</td><td> идентификатор объекта для отдельных частей пирога с использованием редактора vis</td></tr></tbody></table>

#### Свойства JSON набора данных
Строка JSON должна быть массивом объектов со следующими свойствами:

<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> метка</td><td> метка оси пирога</td><td> нить</td><td/></tr><tr><td> значение</td><td> стоимость пирога</td><td> номер</td><td/></tr><tr><td> dataColor</td><td> цвет пирога</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td><td/></tr><tr><td> valueText</td><td> переопределить текст пирога</td><td> нить</td><td/></tr><tr><td> valueColor</td><td> цвет текста значения</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td><td/></tr><tr><td> valueAppendix</td><td> приложение текста значения</td><td> нить</td><td/></tr><tr><td> tooltipTitle</td><td> заголовок всплывающей подсказки</td><td> нить</td><td/></tr><tr><td> tooltipText</td><td> текст всплывающей подсказки</td><td> нить</td><td/></tr></tbody></table>

<! - опустить в toc ->

#### Свойства JSON набора данных - пример
<details> <pre><code> [ { "label": "val0", "value": "30", "valueColor": "#ffffff" }, { "label": "val1", "value": "12.54645646" }, { "label": "val2", "value": "48", "dataColor": "#c2c2c2", "valueAppendix": "\nextra" }, { "label": "val3", "value": "97", "valueColor": "#ffffff" }, { "label": "val4", "value": "32", "valueText": "text" } ] </pre></code> </details>

### График истории линий:
> Требуемый адаптер: [SQL] (https://github.com/ioBroker/ioBroker.sql), [История] (https://github.com/ioBroker/ioBroker.history) или [InfluxDb](https://github.com/ioBroker/ioBroker.influxdb)!

![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/line_history_chart.gif)

#### Настройки редактора
Настройки, не указанные в таблице ниже, не требуют пояснений.

<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание </th></tr></thead><tbody><tr><td rowspan=5><img src="doc/en/media/line_hostory_chart_general.png"></td><td> экземпляр адаптера</td><td> Экземпляр для адаптера sql или истории</td></tr><tr><td> управление временным интервалом с помощью объекта</td><td> Идентификатор точки данных для изменения временного интервала графика.<br><br> Если точка данных относится к типу &#39;строка&#39;, она должна содержать <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign/blob/235530e4e54346b5527333ca06ce596519954c67/widgets/materialdesign/js/materialdesign.chart.js#L802">одно из связанных значений.</a><br> Если точка данных относится к типу &#39;number&#39;, она должна содержать начальную временную метку графика.<br><br> Например, вы можете использовать кнопку здесь, чтобы изменить отображение диаграммы во время выполнения.</td></tr><tr><td> логический объект для обновления</td><td> Идентификатор adatapoint для запуска обновления диаграммы вручную.<br> Например, вы можете использовать кнопку здесь, чтобы обновить диаграмму во время выполнения.</td></tr><tr><td> тайм-аут графика</td><td> таймаут для загрузки данных диаграммы. Если вы получили сообщение об ошибке тайм-аута, увеличьте это значение</td></tr><tr><td> Режим отладки</td><td> если у вас есть проблемы или ошибки, активируйте режим отладки и прикрепите данные журнала консоли (F12) к проблеме</td></tr><tr><td rowspan=5><img src="doc/en/media/line_hostory_chart_dataset.png"></td><td> Идентификатор объекта [x]</td><td> идентификатор точки данных с активированным экземпляром истории</td></tr><tr><td> метод отображения [x]</td><td> <a href="https://www.iobroker.net/docu/index-195.htm?page_id=198&lang=en#Aggregation">метод агрегирования</a></td></tr><tr><td> Максимум. количество отображаемых точек данных [x]</td><td> Количество максимальных точек данных для отображения</td></tr><tr><td> временной интервал между точками данных в [s] [x]</td><td> Необязательная настройка, отменяет настройку «счетчик».<br> Расстояние между отдельными точками данных в секундах.<br> Например, если вы хотите отображать точки данных каждую минуту, вы должны ввести здесь 60</td></tr><tr><td> данные умножаются на [x]</td><td> Необязательная настройка, умножьте каждую точку данных на заданное значение</td></tr><tr><td><img src="doc/en/media/line_hostory_chart_xAxis_layout.png"></td><td> форматы времени оси x</td><td> Измените формат времени оси X. Форматы времени необходимо вводить для всех единиц <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign/blob/c677220868961b3cf0b153fb8bf04e13b4475c09/widgets/materialdesign/js/materialdesign.chart.js#L805">времени, разрешены следующие единицы времени.</a><br> Утвержденные форматы времени необходимо вводить согласно библиотеке moment.js, <a href="https://momentjs.com/docs/#/displaying/">см. Ссылку</a></td></tr><tr><td><img src="doc/en/media/line_hostory_chart_tooltip_layout.png"></td><td> форматы времени всплывающей подсказки</td><td> Измените формат времени всплывающей подсказки. Форматы времени необходимо вводить для всех единиц <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign/blob/c677220868961b3cf0b153fb8bf04e13b4475c09/widgets/materialdesign/js/materialdesign.chart.js#L805">времени, разрешены следующие единицы времени.</a><br> Утвержденные форматы времени необходимо вводить согласно библиотеке moment.js, <a href="https://momentjs.com/docs/#/displaying/">см. Ссылку</a></td></tr></tbody></table>

### Диаграмма JSON
С диаграммой JSON у вас есть максимальная свобода создания смешанной диаграммы (линии, столбцы и столбцы с накоплением) с помощью скрипта.

![Логотип] (doc / en / media / jsonChart.png)! [Logo](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/jsonChart2.png)

#### Свойства JSON
<! - опустить в toc ->

##### Общий
<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> axisLabels</td><td> метка оси графика</td><td> Множество</td><td> числа или строка</td></tr><tr><td> графики</td><td> данные графиков</td><td> массив &lt; <a href="#graph">график</a> &gt;</td><td> см. график</td></tr></tbody></table>

<! - опустить в toc ->

##### График
<details><table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> данные</td><td> данные графика или данные с отметкой времени</td><td> Массив [числа] | Массив [ <a href="#values-with-timestamp">значения с отметкой времени</a> ]</td><td> номер</td></tr><tr><td> тип</td><td> тип графика</td><td> нить</td><td> &#39;линия&#39;, &#39;полоса&#39;</td></tr><tr><td> legendText</td><td> текст легенды</td><td> нить</td><td></td></tr><tr><td> Отобразить заказ</td><td> порядок наложения графика</td><td> номер</td><td> 1, 2, ...</td></tr><tr><td> цвет</td><td> цвет графика</td><td> цвет</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> use_gradient_color</td><td> использовать цвет градиента</td><td> логический</td><td> false true</td></tr><tr><td> gradient_color</td><td> цветовой массив градиента</td><td> массив [ <a href="#gradientcolor">gradientColor</a> ]</td><td> [{значение: -20, цвет: &#39;# 7d3c98&#39;}, {значение: 0, цвет: &#39;# 2874a6&#39;}]</td></tr><tr><td> tooltip_title</td><td> заголовок всплывающей подсказки</td><td> строка | массив [строка]</td><td></td></tr><tr><td> tooltip_text</td><td> ovveride текст всплывающей подсказки</td><td> строка | массив [строка]</td><td></td></tr><tr><td> tooltip_MinDigits</td><td> максимальное количество знаков после запятой в значении всплывающей подсказки</td><td> номер</td><td> 0, 1, 2, ...</td></tr><tr><td> tooltip_MaxDigits</td><td> максимальное количество знаков после запятой в значении всплывающей подсказки</td><td> номер</td><td> 0, 1, 2, ...</td></tr><tr><td> tooltip_AppendText</td><td> добавить текст к значению всплывающей подсказки</td><td> нить</td><td></td></tr><tr><td> datalabel_show</td><td> показать метки данных для графика</td><td> строка | логический</td><td> ложь, истина, авто</td></tr><tr><td> datalabel_anchor</td><td> привязка меток данных</td><td> нить</td><td> центр, начало, конец</td></tr><tr><td> datalabel_align</td><td> положение метки данных относительно точки привязки</td><td> нить</td><td> влево, начало, центр, конец, вправо, вверх, вниз</td></tr><tr><td> datalabel_offset</td><td> расстояние (в пикселях), чтобы отодвинуть метку данных от точки привязки</td><td> номер</td><td> 0, 1, 2, ...</td></tr><tr><td> datalabel_text_align</td><td> текстовое соответствие метки данных</td><td> нить</td><td> влево, начало, центр, конец, вправо</td></tr><tr><td> datalabel_rotation</td><td> угол поворота (в градусах) метки данных по часовой стрелке</td><td> номер</td><td> 0, 1, 2, ...</td></tr><tr><td> datalabel_steps</td><td> показывать метку данных каждые x шаг</td><td> номер</td><td> 0, 1, 2, ...</td></tr><tr><td> datalabel_minDigits</td><td> минимальное количество знаков после запятой в метках данных</td><td> номер</td><td> 0, 1, 2, ...</td></tr><tr><td> datalabel_maxDigits</td><td> максимальное количество знаков после запятой в метках данных</td><td> номер</td><td> 0, 1, 2, ...</td></tr><tr><td> datalabel_override</td><td> переопределить текст метки данных</td><td> массив [строка]</td><td></td></tr><tr><td> datalabel_append</td><td> добавить текст к метке данных</td><td> нить</td><td></td></tr><tr><td> datalabel_color</td><td> цвет метки данных</td><td> цвет | массив [цвета]</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> datalabel_fontFamily</td><td> семейство шрифтов метки данных</td><td> нить</td><td></td></tr><tr><td> datalabel_fontSize</td><td> размер шрифта метки данных</td><td> номер</td><td> 1, 2, 5, ...</td></tr><tr><td> datalabel_backgroundColor</td><td> цвет фона метки данных</td><td> цвет | массив [цвета]</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> datalabel_borderColor</td><td> цвет границы метки данных</td><td> цвет | массив [цвета]</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> datalabel_borderWidth</td><td> ширина границы метки данных</td><td> номер</td><td> 1, 2, 5, ...</td></tr><tr><td> datalabel_borderRadius</td><td> радиус границы метки данных</td><td> номер</td><td> 1, 2, 5, ...</td></tr></tbody></table></details>

<! - опустить в toc ->

##### График линейная диаграмма spfeicifc
<details><table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> line_pointStyle</td><td> точечный стиль линии</td><td> нить</td><td> круг, крест, crossRot, тире, линия, rect, rectRounded, rectRot, звезда, треугольник</td></tr><tr><td> line_pointSize</td><td> размер строки</td><td> номер</td><td> 1, 2, 3, ...</td></tr><tr><td> line_pointSizeHover</td><td> размер строки</td><td> номер</td><td> 1, 2, 3, ...</td></tr><tr><td> line_PointColor</td><td> цвет точки линии</td><td> цвет | массив [цвета]</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> line_PointColorBorder</td><td> цвет границы точки линии</td><td> цвет | массив [цвета]</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> line_PointColorHover</td><td> цвет при наведении курсора на линию</td><td> цвет | массив [цвета]</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> line_PointColorBorderHover</td><td> цвет границы при наведении курсора на точку линии</td><td> цвет | массив [цвета]</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> line_spanGaps</td><td> рисовать линии, если в данных есть пробелы</td><td> логический</td><td> false true</td></tr><tr><td> line_steppedLine</td><td> включить ступенчатую линию</td><td> логический</td><td> false true</td></tr><tr><td> line_Tension</td><td> плавность линии</td><td> номер</td><td> 0 - 1</td></tr><tr><td> line_Thickness</td><td> толщина линии</td><td> номер</td><td> 1, 2, 5, ...</td></tr><tr><td> line_UseFillColor</td><td> использовать цвет заливки под линией</td><td> логический</td><td> false true</td></tr><tr><td> line_FillColor</td><td> цвет заливки под линией</td><td> цвет</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> use_line_gradient_fill_color</td><td> использовать цвет градиентной заливки</td><td> логический</td><td> false true</td></tr><tr><td> line_gradient_fill_color</td><td> цветовой массив градиента</td><td> массив [ <a href="#gradientcolor">gradientColor</a> ]</td><td> [{значение: -20, цвет: &#39;# 7d3c98&#39;}, {значение: 0, цвет: &#39;# 2874a6&#39;}]</td></tr><tr><td> line_FillBetweenLines</td><td> цвет заливки до следующей / предыдущей строки</td><td> нить</td><td> &#39;+1&#39;, &#39;-1&#39;, &#39;+2&#39;, ...</td></tr></tbody></table></details>

<! - опустить в toc ->

##### График гистограмма spfeicifc
<details><table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> barIsStacked</td><td> сложенный бар. Если у вас есть составная диаграмма (линия + столбик с накоплением), вы также должны установить это значение для линейного набора данных!</td><td> логический</td><td> false true</td></tr><tr><td> barStackId</td><td> идентификатор стека. Бар, который должен объединиться в стек, должен иметь одинаковый идентификатор.</td><td> номер</td><td> 1, 2, 5, ...</td></tr><tr><td> barColorHover</td><td> цвет панели при наведении</td><td> цвет | массив [цвета]</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> barBorderColor</td><td> цвет границы полосы</td><td> цвет | массив [цвета]</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> barBorderWidth</td><td> толщина бордюра</td><td> номер</td><td> 1, 2, 5, ...</td></tr><tr><td> barBorderColorHover</td><td> цвет границы при наведении курсора</td><td> цвет | массив [цвета]</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> barBorderWidthHover</td><td> толщина границы бара</td><td> номер</td><td> 1, 2, 5, ...</td></tr></tbody></table></details>

<! - опустить в toc ->

##### График оси Y
<details><table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> yAxis_id</td><td> id оси y. Если вы хотите использовать общую ось Y для данных графика умножения, используйте тот же идентификатор.</td><td> номер</td><td> 1, 2, 5, ...</td></tr><tr><td> yAxis_position</td><td> положение оси y</td><td> нить</td><td> лево право</td></tr><tr><td> yAxis_show</td><td> показать ось Y</td><td> логический</td><td> false true</td></tr><tr><td> yAxis_title_text</td><td> заголовок оси Y</td><td> нить</td><td></td></tr><tr><td> yAxis_title_color</td><td> переопределить цвет заголовка оси Y</td><td> цвет</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> yAxis_title_fontFamily</td><td> переопределить семейство шрифтов заголовка оси Y</td><td> нить</td><td></td></tr><tr><td> yAxis_title_fontSize</td><td> переопределить размер шрифта заголовка оси Y</td><td> номер</td><td> 1, 2, 5, ...</td></tr><tr><td> yAxis_min</td><td> минимальное значение оси Y</td><td> номер</td><td> 1, 2, 5, ...</td></tr><tr><td> yAxis_max</td><td> максимальное значение оси Y</td><td> номер</td><td> 1, 2, 5, ...</td></tr><tr><td> yAxis_step</td><td> шаги оси y</td><td> номер</td><td> 1, 2, 5, ...</td></tr><tr><td> yAxis_minimumDigits</td><td> Минимальное количество десятичных знаков по оси Y</td><td> номер</td><td> 1, 2, 5, ...</td></tr><tr><td> yAxis_maximumDigits</td><td> Максимальное количество десятичных знаков по оси Y</td><td> номер</td><td> 1, 2, 5, ...</td></tr><tr><td> yAxis_maxSteps</td><td> максимальные шаги по оси ординат</td><td> номер</td><td> 1, 2, 5, ...</td></tr><tr><td> yAxis_distance</td><td> переопределить значение оси Y расстояние до оси</td><td> номер</td><td> 1, 2, 5, ...</td></tr><tr><td> yAxis_appendix</td><td> добавить текст к значению оси Y</td><td> нить</td><td></td></tr><tr><td> yAxis_color</td><td> переопределить цвет значения оси Y</td><td> цвет</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> yAxis_fontFamily</td><td> переопределить семейство шрифтов значения оси Y</td><td> нить</td><td></td></tr><tr><td> yAxis_fontSize</td><td> переопределить размер шрифта значения оси Y</td><td> номер</td><td> 1, 2, 5, ...</td></tr><tr><td> yAxis_zeroLineWidth</td><td> ширина нулевой линии по оси Y</td><td> номер</td><td> 0,3, 1,5, 4, ...</td></tr><tr><td> yAxis_zeroLineColor</td><td> цвет нулевой линии по оси Y</td><td> цвет</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> yAxis_gridLines_show</td><td> показать линии сетки по оси Y</td><td> логический</td><td> false true</td></tr><tr><td> yAxis_gridLines_color</td><td> цвет линий сетки по оси Y</td><td> цвет</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> yAxis_gridLines_lineWidth</td><td> ширина линий сетки</td><td> номер</td><td> 0 - 1</td></tr><tr><td> yAxis_gridLines_border_show</td><td> показать границу линий сетки по оси Y</td><td> логический</td><td> false true</td></tr><tr><td> yAxis_gridLines_ticks_show</td><td> показать отметки интервала сетки по оси Y</td><td> логический</td><td> false true</td></tr><tr><td> yAxis_gridLines_ticks_length</td><td> длина штрихов сетки по оси Y</td><td> номер</td><td> 1, 2, 5, ...</td></tr></tbody></table></details>

<! - опустить в toc ->

##### GradientColor
<details><table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> значение</td><td> значение, в котором должен быть применен цвет</td><td> номер</td><td> 1, 2, 5, ...</td></tr><tr><td> цвет</td><td> цвет для значения</td><td> цвет</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr></tbody></table></details>

<! - опустить в toc ->

##### Диаграмма с временной осью JSON Chart поддерживает данные с отметкой времени. Чтобы использовать это, массив данных должен иметь значения для отметки времени (значение оси X) и значения (значение оси Y).
###### Значения с отметкой времени
<details><table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> т</td><td> отметка времени - значение xAxis</td><td> номер</td><td> 1, 2, 5, ...</td></tr><tr><td> у</td><td> значение для отметки времени - значение yAxis</td><td> номер</td><td> 1, 2, 5, ...</td></tr></tbody></table></details>

###### Настройки оси x для данных с отметкой времени
<details><table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> xAxis_bounds</td><td> стратегия границы масштаба<br><br> &#39;data&#39;: обеспечивает полную видимость данных, внешние ярлыки удаляются<br> &#39;ticks&#39;: проверяет, что галочки полностью видны, данные за пределами усекаются</td><td> Нить</td><td> данные, тики</td></tr><tr><td> xAxis_timeFormats</td><td> форматы времени для оси x</td><td> Объект</td><td> Форматы времени необходимо вводить для всех единиц <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign/blob/c677220868961b3cf0b153fb8bf04e13b4475c09/widgets/materialdesign/js/materialdesign.chart.js#L805">времени, разрешены следующие единицы времени.</a><br> Утвержденные форматы времени необходимо вводить согласно библиотеке moment.js, <a href="https://momentjs.com/docs/#/displaying/">см. Ссылку</a></td></tr><tr><td> xAxis_tooltip_timeFormats</td><td> форматы времени для оси x</td><td> Нить</td><td> Утвержденные форматы времени необходимо вводить согласно библиотеке moment.js, <a href="https://momentjs.com/docs/#/displaying/">см. Ссылку</a></td></tr><tr><td> xAxis_time_unit</td><td> установить формат времени для оси x</td><td> Нить</td><td> допустимы следующие единицы, <a href="https://www.chartjs.org/docs/latest/axes/cartesian/time.html#time-units">см. ссылку</a></td></tr></tbody></table></details>

<! - опустить в toc ->

#### Пример
<details> <pre><code> { "axisLabels": ["1h", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "10h", "11h", "12h", "13h", "14h", "17h", "18h", "19h", "20h", "21h", "22h", "23h", "24h"], "graphs": [ { "data": [19, 19, 18, 19, 19, 20, 20, 21, 22, 24, 24, 24, 23, 22, 23, 23, 24, 23, 23, 22, 22, 21, 20, 20], "type": "line", "color": "gray", "legendText": "Temperatur", "line_pointSizeHover": 5, "line_pointSize": 0, "line_Tension": 0.3, "yAxis_show": false, "yAxis_gridLines_show": false, "yAxis_gridLines_ticks_length": 5, "yAxis_min": 0, "yAxis_max": 30, "yAxis_step": 5, "yAxis_position": "left", "yAxis_appendix": " °C", "yAxis_zeroLineWidth": 0.1, "yAxis_zeroLineColor": "black", "displayOrder": 0, "tooltip_AppendText": " °C", "datalabel_backgroundColor": ["#2b9a44", "#2b9a44", "#3aa35b", "#2b9a44", "#2b9a44", "#1d922e", "#1d922e", "#0e8917", "#008000", "#668f00", "#668f00", "#668f00", "#338700", "#008000", "#338700", "#338700", "#668f00", "#338700", "#338700", "#008000", "#008000", "#0e8917", "#1d922e", "#1d922e"], "datalabel_color": "white", "datalabel_offset": -10, "datalabel_fontFamily": "RobotoCondensed-Light", "datalabel_fontSize": 12, "datalabel_borderRadius": 6, "datalabel_show": "auto", "line_PointColor": ["#2b9a44", "#2b9a44", "#3aa35b", "#2b9a44", "#2b9a44", "#1d922e", "#1d922e", "#0e8917", "#008000", "#668f00", "#668f00", "#668f00", "#338700", "#008000", "#338700", "#338700", "#668f00", "#338700", "#338700", "#008000", "#008000", "#0e8917", "#1d922e", "#1d922e"], "line_PointColorBorder": ["#2b9a44", "#2b9a44", "#3aa35b", "#2b9a44", "#2b9a44", "#1d922e", "#1d922e", "#0e8917", "#008000", "#668f00", "#668f00", "#668f00", "#338700", "#008000", "#338700", "#338700", "#668f00", "#338700", "#338700", "#008000", "#008000", "#0e8917", "#1d922e", "#1d922e"], "line_PointColorHover": ["#2b9a44", "#2b9a44", "#3aa35b", "#2b9a44", "#2b9a44", "#1d922e", "#1d922e", "#0e8917", "#008000", "#668f00", "#668f00", "#668f00", "#338700", "#008000", "#338700", "#338700", "#668f00", "#338700", "#338700", "#008000", "#008000", "#0e8917", "#1d922e", "#1d922e"], "line_PointColorBorderHover": ["#2b9a44", "#2b9a44", "#3aa35b", "#2b9a44", "#2b9a44", "#1d922e", "#1d922e", "#0e8917", "#008000", "#668f00", "#668f00", "#668f00", "#338700", "#008000", "#338700", "#338700", "#668f00", "#338700", "#338700", "#008000", "#008000", "#0e8917", "#1d922e", "#1d922e"], "use_gradient_color": true, "gradient_color": [{ "value": -20, "color": "#5b2c6f66" }, { "value": 0, "color": "#2874a666" }, { "value": 14, "color": "#73c6b666" }, { "value": 22, "color": "#00800066" }, { "value": 27, "color": "#ffa50066" }, { "value": 35, "color": "#ff000066" } ], "use_line_gradient_fill_color": true, "line_gradient_fill_color": [{ "value": -20, "color": "#5b2c6f66" }, { "value": 0, "color": "#2874a666" }, { "value": 14, "color": "#73c6b666" }, { "value": 22, "color": "#00800066" }, { "value": 27, "color": "#ffa50066" }, { "value": 35, "color": "#ff000066" } ] }, { "data": [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 19, 33, 36, 23, 14, 16, 34, 46, 40, 24, 22], "type": "line", "color": "#0d47a1", "legendText": "Regenwahrscheinlichkeit", "line_UseFillColor": true, "line_pointSize": 0, "line_pointSizeHover": 5, "yAxis_min": 0, "yAxis_max": 100, "yAxis_maxSteps": 10, "yAxis_position": "left", "yAxis_gridLines_show": false, "yAxis_gridLines_border_show": false, "yAxis_zeroLineWidth": 0.1, "yAxis_zeroLineColor": "black", "yAxis_appendix": " %", "displayOrder": 1, "tooltip_AppendText": " %", "datalabel_show": false }, { "data": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1.3", "2.5", 0, 1.9, 1.17, 0, 0, 0, 0.18, 0.7, 0.2, 0, 0], "type": "bar", "color": "#6dd600", "legendText": "Niederschlag", "yAxis_min": 0, "yAxis_max": 5, "yAxis_maxSteps": 10, "yAxis_position": "right", "yAxis_gridLines_show": false, "yAxis_appendix": " mm", "yAxis_gridLines_border_show": false, "yAxis_zeroLineWidth": 0.1, "yAxis_zeroLineColor": "black", "displayOrder": 1, "tooltip_AppendText": " mm", "datalabel_show": false } ] }

</pre> </code> </details>

<details> <pre><code> { "axisLabels": ["Jan", "Feb", "Mrz", "Apr"], "graphs": [{ "type": "line", "data": [40, 22, 160, 92], "yAxis_id": 0, "barIsStacked": true, "datalabel_show": false, "line_UseFillColor": true

}, {"type": "bar", "barIsStacked": true, "data": [30, 69, 91, 35], "yAxis_id": 0, "barStackId": 0, "color": "# 6dd600 "," datalabel_color ":" #FFFFFF "," datalabel_align ":" start "," use_gradient_color ": true," gradient_color ": [{" value ": 60," color ":" # 6dd600 "}, {" value ": 0," color ":" lightgray "}]}, {" type ":" bar "," barIsStacked ": true," data ": [17, 68, 83, 49]," yAxis_id ": 0, "barStackId": 1, "color": "# ff9800", "datalabel_color": "#FFFFFF", "datalabel_align": "start"}, {"type": "bar", "barIsStacked": true, "data ": [95, 42, 34, 31]," yAxis_id ": 0," barStackId ": 1," color ":" # 8e24aa "," datalabel_color ":" #FFFFFF "," datalabel_align ":" start "} , {"type": "bar", "barIsStacked": true, "data": [33, 44, 22, 34], "yAxis_id": 0, "barStackId": 2, "color": "# a65628" , "datalabel_color": "#FFFFFF", "datalabel_align": "start"}, {"type": "bar", "barIsStacked": true, "data": [28, 34, 45, 23], "yAxis_id ": 0," yAxis_max ":" 180 "," barStackId ": 2," color ":" # d32f2f "," datalabel_color ":" #FFFFFF " , "datalabel_align": "start"}]}

</pre> </code> </details>

## Таблица
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/table.gif)

### Настройки редактора
<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание</th></tr></thead><tbody><tr><td rowspan=2><img src="doc/en/media/table_general.png"></td><td> выключатель</td><td> Datapoint из строки типа с входными данными, как показано выше</td></tr><tr><td> данные как JSON</td><td> Необязательно, введите данные, как показано выше, если точка данных oid не задана.</td></tr><tr><td rowspan=4><img src="doc/en/media/table_column.png"></td><td> colType [x]</td><td> Если изображение выбрано, свойство объекта должно иметь путь к изображению ( <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign#input-data">см. Выше</a> )</td></tr><tr><td> префикс [x]</td><td> Можно использовать префикс для свойства объекта, внутренней привязки объекта ( <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign#internal-object-binding">см. Ниже</a> ) и html.</td></tr><tr><td> суффикс [x]</td><td> Можно использовать суффикс для свойства объекта, внутренней привязки объекта ( <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign#internal-object-binding">см. Ниже</a> ) и html.</td></tr><tr><td> имя объекта для сортировки [x]</td><td> Здесь вы можете определить другое свойство объекта, которое следует использовать для сортировки.</td></tr></tbody></table>

### Данные - структура JSON
Входные данные должны быть массивом объектов json. Можно использовать любое свойство, структура исправлений отсутствует. Столбец 0 получает значение первого свойства, столбец 1 получает значение второго свойства и так далее.
Важно то, что каждый объект имеет одинаковую структуру.

```
[
	{
		"img": "/vis.0/myImages/erlebnis_50.png",
		"name": "Empire",
		"betriebszeit": "4h 06m",
		"funk": "5G",
		"ip": "10.0.0.1"
	},
	{
		"img": "/vis.0/myImages/erlebnis_100.png",
		"name": "Handy",
		"betriebszeit": "13m",
		"funk": "5G",
		"ip": "10.0.0.2"
	},
	{
		"img": "/vis.0/myImages/erlebnis_100.png",
		"name": "Harmony Hub - Wohnzimmer",
		"betriebszeit": "18T 07h 21m",
		"funk": "2G",
		"ip": "10.0.0.3"
	}
]
```

### Привязка внутреннего объекта
префикс и суффикс поддерживают привязку внутреннего объекта таблицы -> вы можете получить доступ к другим свойствам объекта, используя

```
#[obj.'propertyName']
```

Пример см <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign#input-data">. Выше</a> .

Пример рабочего виджета можно найти

* [здесь] (https://forum.iobroker.net/topic/26199/test-adapter-material-design-widgets-v0-1-x/113)
* [ical Adapter] (https://forum.iobroker.net/topic/29658/material-design-widgets-table-widget/2)

### Элементы управления с использованием виджетов HTML
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/table_html_widget_example.gif)

Вы можете использовать [HTML-виджеты](#html-widgets) непосредственно в строке json. Если вы хотите настроить ячейку, которая содержит виджет, используйте следующий контейнер:

<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Характеристики</th></tr></thead><tbody><tr><td> рядный пролет</td><td> ячейка, занимающая x строк</td><td> номер</td><td> 1, 2, 3, ...</td></tr><tr><td> Colspan</td><td> ячейка, занимающая x столбцов</td><td> номер</td><td> 1, 2, 3, ...</td></tr><tr><td> cellStyleAttrs</td><td> Атрибуты стиля css для ячейки</td><td> нить</td><td></td></tr><tr><td> html</td><td> любой элемент html, например. виджет html</td><td> нить</td><td></td></tr></tbody></table>

<! - опустить в toc ->

#### HTML-виджеты управления - пример
<details>

```
[
	{
		"col_1": "button toggle",
		"col_2": {
			"rowspan": "2",
			"html": "<div style='display: flex; justify-content: center'><div class='vis-widget materialdesign-widget materialdesign-button materialdesign-button-html-element'
			style='width: 80px; height: 60px; position: relative; padding: 0px;'
			mdw-type='toggle_vertical'
			mdw-oid='0_userdata.0.MDW.Table.Control.bool'
			mdw-buttonStyle='raised'
			mdw-toggleType='boolean'
			mdw-stateIfNotTrueValue='on'
			mdw-vibrateOnMobilDevices='50'
			mdw-buttontext='off'
			mdw-labelTrue='on'
			mdw-labelColorTrue='#000000'
			mdw-textFontFamily='#mdwTheme:vis-materialdesign.0.fonts.button.vertical.text'
			mdw-textFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.button.vertical.text'
			mdw-alignment='center'
			mdw-mdwButtonPrimaryColor='#mdwTheme:vis-materialdesign.0.colors.button.vertical.primary'
			mdw-mdwButtonSecondaryColor='#mdwTheme:vis-materialdesign.0.colors.button.vertical.secondary'
			mdw-colorBgTrue='green'
			mdw-image='checkbox-blank-outline'
			mdw-imageTrue='checkbox-marked'
			mdw-iconPosition='top'
			mdw-iconHeight='36'
			mdw-lockEnabled='true'
			mdw-autoLockAfter='10'
			mdw-lockIconTop='5'
			mdw-lockIconLeft='5'
			mdw-lockIconColor='#mdwTheme:vis-materialdesign.0.colors.button.lock_icon'
			mdw-lockFilterGrayscale='30'
			></div></div>"
		},
		"col_3": "<div class='vis-widget materialdesign-widget materialdesign-button materialdesign-button-html-element'
		style='width: 100%; height: 100%; position: relative; padding: 0px;'
		mdw-type='toggle_default'
		mdw-oid='0_userdata.0.MDW.Table.Control.bool'
		mdw-buttonStyle='raised'
		mdw-toggleType='boolean'
		mdw-stateIfNotTrueValue='on'
		mdw-vibrateOnMobilDevices='50'
		mdw-buttontext='off'
		mdw-labelTrue='on'
		mdw-textFontFamily='#mdwTheme:vis-materialdesign.0.fonts.button.default.text'
		mdw-textFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.button.default.text'
		mdw-mdwButtonPrimaryColor='#mdwTheme:vis-materialdesign.0.colors.button.default.primary'
		mdw-mdwButtonSecondaryColor='#mdwTheme:vis-materialdesign.0.colors.button.default.secondary'
		mdw-colorBgTrue='#a2bc9f'
		mdw-image='access-point-network-off'
		mdw-imageColor='#c70000'
		mdw-imageTrue='access-point-network'
		mdw-imageTrueColor='#36fa29'
		mdw-iconPosition='left'
		mdw-autoLockAfter='10'
		mdw-lockIconColor='#mdwTheme:vis-materialdesign.0.colors.button.lock_icon'
		mdw-lockFilterGrayscale='30'
		></div>",
		"col_4": "<div class='vis-widget materialdesign-widget materialdesign-icon-button materialdesign-button-html-element'
		style='width: 48px; height: 48px; position: relative; padding: 0px;'
		mdw-type='toggle_icon'
		mdw-oid='0_userdata.0.MDW.Table.Control.bool'
		mdw-toggleType='boolean'
		mdw-stateIfNotTrueValue='on'
		mdw-vibrateOnMobilDevices='50'
		mdw-image='access-point-network-off'
		mdw-imageColor='#mdwTheme:vis-materialdesign.0.colors.button.icon.icon_off'
		mdw-imageTrue='access-point-network'
		mdw-imageTrueColor='orange'
		mdw-colorBgFalse='#mdwTheme:vis-materialdesign.0.colors.button.icon.background_off'
		mdw-colorBgTrue='#mdwTheme:vis-materialdesign.0.colors.button.icon.background_on'
		mdw-colorPress='#mdwTheme:vis-materialdesign.0.colors.button.icon.pressed'
		mdw-autoLockAfter='10'
		mdw-lockIconTop='45'
		mdw-lockIconLeft='55'
		mdw-lockIconSize='20'
		mdw-lockIconColor='#mdwTheme:vis-materialdesign.0.colors.button.icon.lock_icon'
		mdw-lockIconBackground='#mdwTheme:vis-materialdesign.0.colors.button.icon.lock_icon_background'
		mdw-lockBackgroundSizeFactor='1'
		mdw-lockFilterGrayscale='30'
		></div>"
	}, {
		"col_1": "Checkbox / Switch",
		"col_2": "<div style='display: flex; justify-content: center'><div class='vis-widget materialdesign-widget materialdesign-checkbox materialdesign-checkbox-html-element'
		style='width: 71px; height: 24px; position: relative; overflow: visible !important; display: flex; align-items: center;'
		mdw-oid='0_userdata.0.MDW.Table.Control.bool'
		mdw-toggleType='boolean'
		mdw-stateIfNotTrueValue='on'
		mdw-vibrateOnMobilDevices='50'
		mdw-labelFalse='on'
		mdw-labelTrue='off'
		mdw-labelPosition='left'
		mdw-labelClickActive='true'
		mdw-valueFontFamily='#mdwTheme:vis-materialdesign.0.fonts.checkbox.value'
		mdw-valueFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.checkbox.value'
		mdw-colorCheckBox='#mdwTheme:vis-materialdesign.0.colors.checkbox.on'
		mdw-colorCheckBoxBorder='#mdwTheme:vis-materialdesign.0.colors.checkbox.border'
		mdw-colorCheckBoxHover='#mdwTheme:vis-materialdesign.0.colors.checkbox.hover'
		mdw-labelColorFalse='#mdwTheme:vis-materialdesign.0.colors.checkbox.text_off'
		mdw-labelColorTrue='#mdwTheme:vis-materialdesign.0.colors.checkbox.text_on'
		mdw-autoLockAfter='10'
		mdw-lockIconTop='5'
		mdw-lockIconLeft='5'
		mdw-lockIconColor='#mdwTheme:vis-materialdesign.0.colors.checkbox.lock_icon'
		mdw-lockFilterGrayscale='30'
		></div></div>",
		"col_3": {
			"cellStyleAttrs": "padding: 8px;",
			"html": "<div style='display: flex; justify-content: center'><div class='vis-widget materialdesign-widget materialdesign-switch materialdesign-switch-html-element'
			style='width: 83px; height: 44px; position: relative; overflow: visible !important; display: flex; align-items: center;'
			mdw-oid='0_userdata.0.MDW.Table.Control.bool'
			mdw-toggleType='boolean'
			mdw-stateIfNotTrueValue='on'
			mdw-vibrateOnMobilDevices='50'
			mdw-labelFalse='off'
			mdw-labelTrue='on'
			mdw-labelPosition='right'
			mdw-labelClickActive='true'
			mdw-valueFontFamily='#mdwTheme:vis-materialdesign.0.fonts.switch.value'
			mdw-valueFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.switch.value'
			mdw-colorSwitchThumb='#mdwTheme:vis-materialdesign.0.colors.switch.off'
			mdw-colorSwitchTrack='#mdwTheme:vis-materialdesign.0.colors.switch.track'
			mdw-colorSwitchTrue='#mdwTheme:vis-materialdesign.0.colors.switch.on'
			mdw-colorSwitchHover='#mdwTheme:vis-materialdesign.0.colors.switch.off_hover'
			mdw-colorSwitchHoverTrue='#mdwTheme:vis-materialdesign.0.colors.switch.on_hover'
			mdw-labelColorFalse='#mdwTheme:vis-materialdesign.0.colors.switch.text_off'
			mdw-labelColorTrue='#mdwTheme:vis-materialdesign.0.colors.switch.text_on'
			mdw-lockEnabled='true'
			mdw-autoLockAfter='10'
			mdw-lockIconTop='5'
			mdw-lockIconLeft='5'
			mdw-lockIconColor='#mdwTheme:vis-materialdesign.0.colors.switch.lock_icon'
			mdw-lockFilterGrayscale='30'
			></div></div>"
		}
	}, {
		"col_1": "Button State",
		"col_2": "<div style='display: flex; justify-content: center'><div class='vis-widget materialdesign-widget materialdesign-icon-button materialdesign-button-html-element'
		style='width: 48px; height: 48px; position: relative; padding: 0px;'
		mdw-type='state_icon'
		mdw-oid='0_userdata.0.MDW.Table.Control.number'
		mdw-value='100'
		mdw-vibrateOnMobilDevices='50'
		mdw-image='battery'
		mdw-imageColor='#mdwTheme:vis-materialdesign.0.colors.button.icon.icon_off'
		mdw-iconHeight='26'
		mdw-colorBgFalse='#mdwTheme:vis-materialdesign.0.colors.button.icon.background_off'
		mdw-colorPress='#mdwTheme:vis-materialdesign.0.colors.button.icon.pressed'
		mdw-autoLockAfter='10'
		mdw-lockIconTop='45'
		mdw-lockIconLeft='55'
		mdw-lockIconSize='20'
		mdw-lockIconColor='#mdwTheme:vis-materialdesign.0.colors.button.icon.lock_icon'
		mdw-lockIconBackground='#mdwTheme:vis-materialdesign.0.colors.button.icon.lock_icon_background'
		mdw-lockBackgroundSizeFactor='1'
		mdw-lockFilterGrayscale='30'
		></div></div>",
		"col_3": "<div style='display: flex; justify-content: center'><div class='vis-widget materialdesign-widget materialdesign-button materialdesign-button-html-element'
		style='width: 100px; height: 100%; position: relative; padding: 0px;'
		mdw-type='state_default'
		mdw-oid='0_userdata.0.MDW.Table.Control.number'
		mdw-buttonStyle='raised'
		mdw-value='70'
		mdw-vibrateOnMobilDevices='50'
		mdw-buttontext='70'
		mdw-textFontFamily='#mdwTheme:vis-materialdesign.0.fonts.button.default.text'
		mdw-textFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.button.default.text'
		mdw-mdwButtonPrimaryColor='#mdwTheme:vis-materialdesign.0.colors.button.default.primary'
		mdw-mdwButtonSecondaryColor='#mdwTheme:vis-materialdesign.0.colors.button.default.secondary'
		mdw-image='battery-70'
		mdw-iconPosition='left'
		mdw-iconHeight='20'
		mdw-lockEnabled='true'
		mdw-autoLockAfter='10'
		mdw-lockIconColor='#mdwTheme:vis-materialdesign.0.colors.button.lock_icon'
		mdw-lockFilterGrayscale='30'
		></div></div>",
		"col_4": "<div style='display: flex; justify-content: center'><div class='vis-widget materialdesign-widget materialdesign-button materialdesign-button-html-element'
		style='width: 102px; height: 67px; position: relative; padding: 0px;'
		mdw-type='state_vertical'
		mdw-oid='0_userdata.0.MDW.Table.Control.number'
		mdw-buttonStyle='raised'
		mdw-value='10'
		mdw-vibrateOnMobilDevices='50'
		mdw-buttontext='10'
		mdw-textFontFamily='#mdwTheme:vis-materialdesign.0.fonts.button.vertical.text'
		mdw-textFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.button.vertical.text'
		mdw-alignment='center'
		mdw-mdwButtonPrimaryColor='#mdwTheme:vis-materialdesign.0.colors.button.vertical.primary'
		mdw-mdwButtonSecondaryColor='#mdwTheme:vis-materialdesign.0.colors.button.vertical.secondary'
		mdw-image='battery-10'
		mdw-iconPosition='top'
		mdw-iconHeight='38'
		mdw-autoLockAfter='10'
		mdw-lockIconTop='5'
		mdw-lockIconLeft='5'
		mdw-lockIconColor='#mdwTheme:vis-materialdesign.0.colors.button.lock_icon'
		mdw-lockFilterGrayscale='30'
		></div></div>"
	}, {
		"col_1": "Progress",
		"col_2": "<div style='display: flex; justify-content: center'><div class='vis-widget materialdesign-widget materialdesign-progress materialdesign-progress-html-element'
		style='width: 83px; height: 81px; position: relative; padding: 0px;'
		mdw-type='circular'
		mdw-oid='0_userdata.0.MDW.Table.Control.number'
		mdw-min='0'
		mdw-max='100'
		mdw-progressCircularSize='80'
		mdw-progressCircularWidth='10'
		mdw-progressCircularRotate='90'
		mdw-colorProgressBackground='#mdwTheme:vis-materialdesign.0.colors.progress.track_background'
		mdw-colorProgress='#mdwTheme:vis-materialdesign.0.colors.progress.track'
		mdw-innerColor='#mdwTheme:vis-materialdesign.0.colors.progress.circular_background'
		mdw-colorOneCondition='60'
		mdw-colorOne='#mdwTheme:vis-materialdesign.0.colors.progress.track_condition1'
		mdw-colorTwoCondition='80'
		mdw-colorTwo='#mdwTheme:vis-materialdesign.0.colors.progress.track_condition2'
		mdw-showValueLabel='true'
		mdw-valueLabelStyle='progressValue'
		mdw-valueMaxDecimals='3'
		mdw-textColor='#mdwTheme:vis-materialdesign.0.colors.progress.text'
		mdw-textFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.progress.text'
		mdw-textFontFamily='#mdwTheme:vis-materialdesign.0.fonts.progress.text'
		></div></div>",
		"col_3": {
			"colspan": "2",
			"html": "<div style='display: flex; justify-content: center'><div class='vis-widget materialdesign-widget materialdesign-progress materialdesign-progress-html-element'
			style='width: 80%; height: 36px; position: relative; padding: 0px;'
			mdw-type='linear'
			mdw-oid='0_userdata.0.MDW.Table.Control.number'
			mdw-min='0'
			mdw-max='100'
			mdw-colorProgressBackground='#mdwTheme:vis-materialdesign.0.colors.progress.track_background'
			mdw-colorProgress='#mdwTheme:vis-materialdesign.0.colors.progress.track'
			mdw-colorOneCondition='50'
			mdw-colorOne='#mdwTheme:vis-materialdesign.0.colors.progress.track_condition1'
			mdw-colorTwoCondition='70'
			mdw-colorTwo='#mdwTheme:vis-materialdesign.0.colors.progress.track_condition2'
			mdw-showValueLabel='true'
			mdw-valueLabelStyle='progressPercent'
			mdw-textColor='#mdwTheme:vis-materialdesign.0.colors.progress.text'
			mdw-textFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.progress.text'
			mdw-textFontFamily='#mdwTheme:vis-materialdesign.0.fonts.progress.text'
			mdw-textAlign='end'
			></div></div>"
		}
	}, {
		"col_1": "Slider",
		"col_2": {
			"colspan": "2",
			"cellStyleAttrs": "overflow: visible;",
			"html": "<div style='display: flex; justify-content: center'><div class='vis-widget materialdesign-widget materialdesign-slider-vertical materialdesign-slider-html-element'
			style='width: 90%; height: 60px; position: relative; overflow:visible !important; display: flex; align-items: center;'
			mdw-oid='0_userdata.0.MDW.Table.Control.number'
			mdw-orientation='horizontal'
			mdw-knobSize='knobSmall'
			mdw-step='1'
			mdw-vibrateOnMobilDevices='50'
			mdw-showTicks='no'
			mdw-tickTextColor='#mdwTheme:vis-materialdesign.0.colors.slider.tick'
			mdw-tickFontFamily='#mdwTheme:vis-materialdesign.0.fonts.slider.ticks'
			mdw-tickFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.slider.ticks'
			mdw-tickColorBefore='#mdwTheme:vis-materialdesign.0.colors.slider.tick_before'
			mdw-tickColorAfter='#mdwTheme:vis-materialdesign.0.colors.slider.tick_after'
			mdw-colorBeforeThumb='#mdwTheme:vis-materialdesign.0.colors.slider.control_before'
			mdw-colorThumb='#mdwTheme:vis-materialdesign.0.colors.slider.control'
			mdw-colorAfterThumb='#mdwTheme:vis-materialdesign.0.colors.slider.control_behind'
			mdw-prepandTextWidth='1'
			mdw-prepandTextColor='#mdwTheme:vis-materialdesign.0.colors.slider.text_prepand'
			mdw-prepandTextFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.slider.prepand'
			mdw-prepandTextFontFamily='#mdwTheme:vis-materialdesign.0.fonts.slider.prepand'
			mdw-showValueLabel='true'
			mdw-valueLabelStyle='sliderValue'
			mdw-valueLabelUnit='%'
			mdw-valueFontFamily='#mdwTheme:vis-materialdesign.0.fonts.slider.value'
			mdw-valueFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.slider.value'
			mdw-valueLabelColor='#mdwTheme:vis-materialdesign.0.colors.slider.text'
			mdw-valueLabelWidth='50'
			mdw-showThumbLabel='yes'
			mdw-thumbBackgroundColor='#mdwTheme:vis-materialdesign.0.colors.slider.control_background'
			mdw-thumbFontColor='#mdwTheme:vis-materialdesign.0.colors.slider.control_text'
			mdw-thumbFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.slider.control'
			mdw-thumbFontFamily='#mdwTheme:vis-materialdesign.0.fonts.slider.control'
			></div></div>"
		},
		"col_3": "<div style='display: flex; justify-content: center'><div class='vis-widget materialdesign-widget materialdesign-slider-round materialdesign-roundslider-html-element'
		style='width: 79px; height: 67px; position: relative;'
		mdw-oid='0_userdata.0.MDW.Table.Control.number'
		mdw-step='1'
		mdw-startAngle='135'
		mdw-arcLength='270'
		mdw-handleZoom='1.5'
		mdw-vibrateOnMobilDevices='50'
		mdw-colorSliderBg='#mdwTheme:vis-materialdesign.0.colors.slider.background'
		mdw-colorBeforeThumb='#mdwTheme:vis-materialdesign.0.colors.slider.control_before'
		mdw-colorThumb='#mdwTheme:vis-materialdesign.0.colors.slider.control'
		mdw-colorAfterThumb='#mdwTheme:vis-materialdesign.0.colors.slider.control_behind'
		mdw-valueLabelColor='#mdwTheme:vis-materialdesign.0.colors.slider.text'
		mdw-showValueLabel='true'
		mdw-valueLabelStyle='sliderValue'
		mdw-valueFontFamily='#mdwTheme:vis-materialdesign.0.fonts.slider.value'
		mdw-valueFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.slider.value'
		></div></div>"
	}, {
		"col_1": "Select",
		"col_2": "<div style='display: flex; justify-content: center'><div class='vis-widget materialdesign-widget materialdesign-select materialdesign-select-html-element'
		style='width: 90%; height: 38px; position: relative; overflow: visible; display: flex; align-items: center;'
		mdw-oid='0_userdata.0.MDW.Table.Control.number'
		mdw-inputType='text'
		mdw-vibrateOnMobilDevices='50'
		mdw-inputLayout='regular'
		mdw-inputAlignment='left'
		mdw-inputLayoutBorderColor='#mdwTheme:vis-materialdesign.0.colors.input.border'
		mdw-inputLayoutBorderColorHover='#mdwTheme:vis-materialdesign.0.colors.input.border_hover'
		mdw-inputLayoutBorderColorSelected='#mdwTheme:vis-materialdesign.0.colors.input.border_selected'
		mdw-inputTextFontFamily='#mdwTheme:vis-materialdesign.0.fonts.input.text'
		mdw-inputTextFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.text'
		mdw-inputTextColor='#mdwTheme:vis-materialdesign.0.colors.input.text'
		mdw-inputLabelText='by Editor'
		mdw-inputLabelColor='#mdwTheme:vis-materialdesign.0.colors.input.label'
		mdw-inputLabelColorSelected='#mdwTheme:vis-materialdesign.0.colors.input.label_selected'
		mdw-inputLabelFontFamily='#mdwTheme:vis-materialdesign.0.fonts.input.label'
		mdw-inputLabelFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.label'
		mdw-inputTranslateX='-29'
		mdw-inputAppendixColor='#mdwTheme:vis-materialdesign.0.colors.input.appendix'
		mdw-inputAppendixFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.appendix'
		mdw-inputAppendixFontFamily='#mdwTheme:vis-materialdesign.0.fonts.input.appendix'
		mdw-showInputMessageAlways='true'
		mdw-inputMessageFontFamily='#mdwTheme:vis-materialdesign.0.fonts.input.message'
		mdw-inputMessageFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.message'
		mdw-inputMessageColor='#mdwTheme:vis-materialdesign.0.colors.input.message'
		mdw-inputCounterColor='#mdwTheme:vis-materialdesign.0.colors.input.counter'
		mdw-inputCounterFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.counter'
		mdw-inputCounterFontFamily='#mdwTheme:vis-materialdesign.0.fonts.input.counter'
		mdw-clearIconShow='true'
		mdw-clearIconColor='#mdwTheme:vis-materialdesign.0.colors.input.icon_clear'
		mdw-collapseIconColor='#mdwTheme:vis-materialdesign.0.colors.input.icon_collapse'
		mdw-listDataMethod='inputPerEditor'
		mdw-countSelectItems='2'
		mdw-listPosition='auto'
		mdw-listItemBackgroundColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.background'
		mdw-listItemBackgroundHoverColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.hover'
		mdw-listItemBackgroundSelectedColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.selected'
		mdw-listItemRippleEffectColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.effect'
		mdw-showSelectedIcon='prepend-inner'
		mdw-listIconColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.icon'
		mdw-listItemFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.dropdown.text'
		mdw-listItemFont='#mdwTheme:vis-materialdesign.0.fonts.input.dropdown.text'
		mdw-listItemFontColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.text'
		mdw-listItemSubFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.dropdown.subText'
		mdw-listItemSubFont='#mdwTheme:vis-materialdesign.0.fonts.input.dropdown.subText'
		mdw-listItemSubFontColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.subText'
		mdw-showValue='true'
		mdw-listItemValueFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.dropdown.value'
		mdw-listItemValueFont='#mdwTheme:vis-materialdesign.0.fonts.input.dropdown.value'
		mdw-listItemValueFontColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.value'
		mdw-value0='10'
		mdw-label0='val0'
		mdw-listIcon0='alpha-d-box'
		mdw-value1='70'
		mdw-label1='val1'
		mdw-listIcon1='account-alert'
		mdw-value2='100'
		mdw-label2='val2'
		mdw-listIcon2='karate'
		></div></div>",
		"col_3": "<div style='display: flex; justify-content: center'><div class='vis-widget materialdesign-widget materialdesign-select materialdesign-select-html-element'
		style='width: 90%; height: 38px; position: relative; overflow: visible; display: flex; align-items: center;'
		mdw-oid='0_userdata.0.MDW.Table.Control.number'
		mdw-inputType='text'
		mdw-vibrateOnMobilDevices='50'
		mdw-inputLayout='regular'
		mdw-inputAlignment='left'
		mdw-inputLayoutBorderColor='#mdwTheme:vis-materialdesign.0.colors.input.border'
		mdw-inputLayoutBorderColorHover='#mdwTheme:vis-materialdesign.0.colors.input.border_hover'
		mdw-inputLayoutBorderColorSelected='#mdwTheme:vis-materialdesign.0.colors.input.border_selected'
		mdw-inputTextFontFamily='#mdwTheme:vis-materialdesign.0.fonts.input.text'
		mdw-inputTextFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.text'
		mdw-inputTextColor='#mdwTheme:vis-materialdesign.0.colors.input.text'
		mdw-inputLabelText='by Value List'
		mdw-inputLabelColor='#mdwTheme:vis-materialdesign.0.colors.input.label'
		mdw-inputLabelColorSelected='#mdwTheme:vis-materialdesign.0.colors.input.label_selected'
		mdw-inputLabelFontFamily='#mdwTheme:vis-materialdesign.0.fonts.input.label'
		mdw-inputLabelFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.label'
		mdw-inputTranslateX='-29'
		mdw-inputAppendixColor='#mdwTheme:vis-materialdesign.0.colors.input.appendix'
		mdw-inputAppendixFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.appendix'
		mdw-inputAppendixFontFamily='#mdwTheme:vis-materialdesign.0.fonts.input.appendix'
		mdw-showInputMessageAlways='true'
		mdw-inputMessageFontFamily='#mdwTheme:vis-materialdesign.0.fonts.input.message'
		mdw-inputMessageFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.message'
		mdw-inputMessageColor='#mdwTheme:vis-materialdesign.0.colors.input.message'
		mdw-inputCounterColor='#mdwTheme:vis-materialdesign.0.colors.input.counter'
		mdw-inputCounterFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.counter'
		mdw-inputCounterFontFamily='#mdwTheme:vis-materialdesign.0.fonts.input.counter'
		mdw-clearIconShow='true'
		mdw-clearIconColor='#mdwTheme:vis-materialdesign.0.colors.input.icon_clear'
		mdw-collapseIconColor='#mdwTheme:vis-materialdesign.0.colors.input.icon_collapse'
		mdw-listDataMethod='valueList'
		mdw-countSelectItems='0'
		mdw-valueList='10;30;90'
		mdw-valueListLabels='val1;val2;val3'
		mdw-valueListIcons='home;home;home'
		mdw-listPosition='auto'
		mdw-listItemBackgroundColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.background'
		mdw-listItemBackgroundHoverColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.hover'
		mdw-listItemBackgroundSelectedColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.selected'
		mdw-listItemRippleEffectColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.effect'
		mdw-showSelectedIcon='prepend-inner'
		mdw-listIconColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.icon'
		mdw-listItemFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.dropdown.text'
		mdw-listItemFont='#mdwTheme:vis-materialdesign.0.fonts.input.dropdown.text'
		mdw-listItemFontColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.text'
		mdw-listItemSubFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.dropdown.subText'
		mdw-listItemSubFont='#mdwTheme:vis-materialdesign.0.fonts.input.dropdown.subText'
		mdw-listItemSubFontColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.subText'
		mdw-showValue='true'
		mdw-listItemValueFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.dropdown.value'
		mdw-listItemValueFont='#mdwTheme:vis-materialdesign.0.fonts.input.dropdown.value'
		mdw-listItemValueFontColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.value'
		></div></div>",
		"col_4": {
			"cellStyleAttrs": "padding: 6px;",
			"html": "<div style='display: flex; justify-content: center'><div class='vis-widget materialdesign-widget materialdesign-select materialdesign-select-html-element'
			style='width: 293px; height: 38px; position: relative; overflow: visible; display: flex; align-items: center;'
			mdw-oid='0_userdata.0.MDW.Table.Control.string'
			mdw-inputType='text'
			mdw-vibrateOnMobilDevices='50'
			mdw-inputLayout='solo-rounded'
			mdw-inputAlignment='center'
			mdw-inputLayoutBorderColor='#mdwTheme:vis-materialdesign.0.colors.input.border'
			mdw-inputLayoutBorderColorHover='#mdwTheme:vis-materialdesign.0.colors.input.border_hover'
			mdw-inputLayoutBorderColorSelected='#mdwTheme:vis-materialdesign.0.colors.input.border_selected'
			mdw-inputTextFontFamily='#mdwTheme:vis-materialdesign.0.fonts.input.text'
			mdw-inputTextFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.text'
			mdw-inputTextColor='#mdwTheme:vis-materialdesign.0.colors.input.text'
			mdw-inputLabelText='by JSON Editor'
			mdw-inputLabelColor='#mdwTheme:vis-materialdesign.0.colors.input.label'
			mdw-inputLabelColorSelected='#mdwTheme:vis-materialdesign.0.colors.input.label_selected'
			mdw-inputLabelFontFamily='#mdwTheme:vis-materialdesign.0.fonts.input.label'
			mdw-inputLabelFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.label'
			mdw-inputTranslateX='-29'
			mdw-inputAppendixColor='#mdwTheme:vis-materialdesign.0.colors.input.appendix'
			mdw-inputAppendixFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.appendix'
			mdw-inputAppendixFontFamily='#mdwTheme:vis-materialdesign.0.fonts.input.appendix'
			mdw-showInputMessageAlways='true'
			mdw-inputMessageFontFamily='#mdwTheme:vis-materialdesign.0.fonts.input.message'
			mdw-inputMessageFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.message'
			mdw-inputMessageColor='#mdwTheme:vis-materialdesign.0.colors.input.message'
			mdw-inputCounterColor='#mdwTheme:vis-materialdesign.0.colors.input.counter'
			mdw-inputCounterFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.counter'
			mdw-inputCounterFontFamily='#mdwTheme:vis-materialdesign.0.fonts.input.counter'
			mdw-clearIconShow='true'
			mdw-clearIconColor='#mdwTheme:vis-materialdesign.0.colors.input.icon_clear'
			mdw-collapseIconColor='#mdwTheme:vis-materialdesign.0.colors.input.icon_collapse'
			mdw-listDataMethod='jsonStringObject'
			mdw-countSelectItems='0'
			mdw-jsonStringObject='[   {
			&#x9;&#x9;&#x22;text&#x22;: &#x22;1 Tag&#x22;,
			&#x9;&#x9;&#x22;value&#x22;: &#x22;1 day&#x22;
			&#x9;},
			&#x9;{
			&#x9;&#x9;&#x22;text&#x22;: &#x22;3 Tage&#x22;,
			&#x9;&#x9;&#x22;value&#x22;: &#x22;3 days&#x22;
			&#x9;},
			&#x9;{
			&#x9;&#x9;&#x22;text&#x22;: &#x22;1 Woche&#x22;,
			&#x9;&#x9;&#x22;value&#x22;: &#x22;7 days&#x22;
			&#x9;},
			&#x9;{
			&#x9;&#x9;&#x22;text&#x22;: &#x22;2 Wochen&#x22;,
			&#x9;&#x9;&#x22;value&#x22;: &#x22;14 days&#x22;
			&#x9;},
			&#x9;{
			&#x9;&#x9;&#x22;text&#x22;: &#x22;1 Monat&#x22;,
			&#x9;&#x9;&#x22;value&#x22;: &#x22;1 month&#x22;
			&#x9;},
			&#x9;{
			&#x9;&#x9;&#x22;text&#x22;: &#x22;2 Monate&#x22;,
			&#x9;&#x9;&#x22;value&#x22;: &#x22;2 months&#x22;
			&#x9;},
			&#x9;{
			&#x9;&#x9;&#x22;text&#x22;: &#x22;3 Monate&#x22;,
			&#x9;&#x9;&#x22;value&#x22;: &#x22;3 months&#x22;
			&#x9;},
			&#x9;{
			&#x9;&#x9;&#x22;text&#x22;: &#x22;6 Monate&#x22;,
			&#x9;&#x9;&#x22;value&#x22;: &#x22;6 months&#x22;
			&#x9;},
			&#x9;{
			&#x9;&#x9;&#x22;text&#x22;: &#x22;1 Jahr&#x22;,
			&#x9;&#x9;&#x22;value&#x22;: &#x22;1 year&#x22;
			&#x9;}
			]'
			mdw-listPosition='auto'
			mdw-listItemBackgroundColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.background'
			mdw-listItemBackgroundHoverColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.hover'
			mdw-listItemBackgroundSelectedColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.selected'
			mdw-listItemRippleEffectColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.effect'
			mdw-showSelectedIcon='prepend-inner'
			mdw-listIconColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.icon'
			mdw-listItemFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.dropdown.text'
			mdw-listItemFont='#mdwTheme:vis-materialdesign.0.fonts.input.dropdown.text'
			mdw-listItemFontColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.text'
			mdw-listItemSubFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.dropdown.subText'
			mdw-listItemSubFont='#mdwTheme:vis-materialdesign.0.fonts.input.dropdown.subText'
			mdw-listItemSubFontColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.subText'
			mdw-showValue='true'
			mdw-listItemValueFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.dropdown.value'
			mdw-listItemValueFont='#mdwTheme:vis-materialdesign.0.fonts.input.dropdown.value'
			mdw-listItemValueFontColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.value'
			></div></div>"
		}
	}, {
		"col_1": "col_1",
		"col_2": "col_2",
		"col_3": "col_3",
		"col_4": "col_4"
	}
]

```

</details>

### Элементы управления - **устарело, начиная с версии 0.5.0**
> **устарело. Вместо этого используйте [HTML-виджеты](#html-widgets)!**

Для создания элемента управления (кнопки, флажка и т. Д.) В ячейке таблицы необходимо создать объект вместо строки.

![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/table_control_example.gif)

## Адаптивный макет
Есть два виджета - Masonry Views и Grid Views - с помощью которых можно создать отзывчивый макет (макет для настольных компьютеров, планшетов и мобильных устройств). Оба виджета имеют несколько интегрированных `view in widget`.

### Виды кладки
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/masnory.gif)

Masonry Views имеет несколько интегрированных `view in widget`, которые будут автоматически упорядочены в зависимости от ширины виджета. С помощью этого виджета можно создать адаптивный макет (один макет для рабочего стола, планшета и мобильного телефона).
Виды кладки особенно полезны, если они имеют разную высоту.

<b>Взгляните на [Пример проекта Material Design Widgets](https://github.com/Scrounger/ioBroker.vis-materialdesign#online-example-project),</b> чтобы понять, как это работает.

#### Настройки редактора
<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание </th></tr></thead><tbody><tr><td rowspan=1><img src="doc/en/media/masonry_resolution_settings.png"></td><td colspan=2>В зависимости от ширины виджета можно установить количество столбцов и расстояние между представлениями. Настройки могут быть установлены независимо для книжного и альбомного формата. Чтобы узнать ширину разрешения для разных устройств, активируйте Помощник по разрешению в общих настройках.</td></tr><tr><td rowspan=2><img src="doc/en/media/masnory_settings_views.png"></td><td> ширина обзора [x]</td><td> Определите ширину представления. Допустимые значения: число, пиксели,% или вычисление. Примеры: <code>100</code> , <code>100px</code> , <code>55%</code> , <code>calc(60% - 12px)</code></td></tr><tr><td> высота обзора [x]</td><td> Здесь вы можете указать высоту используемого вида.<br><br> Если вы хотите, чтобы высота изменялась в соответствии с представлением, тогда этот ввод должен быть пустым, а для виджета с наибольшей высотой в представлении положение должно быть установлено относительным, см. Снимок экрана:<br><br><img src="doc/en/media/masonry_grid_position_settings.png"></td></tr></tbody></table>

### Виды сетки
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/grid.gif)

Grid Views имеет несколько интегрированных `view in widget`, которые будут автоматически упорядочены в зависимости от ширины виджета. С помощью этого виджета можно создать адаптивный макет (один макет для рабочего стола, планшета и мобильного телефона).
Виды сетки особенно полезны, если включенные виды имеют одинаковую высоту.

<b>В виджете Grid View всего 12 столбцов. Если вы хотите, чтобы представление имело ширину 4 столбца, вы должны установить для диапазона столбцов значение 4 в соответствующем представлении [x]</b>

<b>Взгляните на [Пример проекта Material Design Widgets](https://github.com/Scrounger/ioBroker.vis-materialdesign#online-example-project),</b> чтобы понять, как это работает.

#### Настройки редактора
<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание </th></tr></thead><tbody><tr><td rowspan=1><img src="doc/en/media/grid_settings_resolution.png"></td><td colspan=2> В зависимости от ширины виджета определяется, от какой ширины виджета могут применяться правила для диапазона столбцов отдельных представлений [x], а также расстояние между представлениями. Настройки могут быть установлены независимо для книжного и альбомного формата. Чтобы узнать ширину разрешения для разных устройств, активируйте Помощник по разрешению в общих настройках.</td></tr><tr><td rowspan=2><img src="doc/en/media/grid_settings_view.png"></td><td colspan=2> Определите диапазон столбцов представления в зависимости от текущего правила разрешения ширины.<br> Вы также можете указать здесь, должно ли представление отображаться только с разрешением выше или ниже определенного значения или оно должно быть видимым через идентификатор объекта.</td></tr><tr><td> высота обзора [x]</td><td> Здесь вы можете указать высоту используемого вида.<br><br> Если вы хотите, чтобы высота изменялась в соответствии с представлением, тогда этот ввод должен быть пустым, а для виджета с наибольшей высотой в представлении положение должно быть установлено относительным, см. Снимок экрана:<br><br><img src="doc/en/media/masonry_grid_position_settings.png"></td></tbody></table>

## Оповещения
Виджет предупреждений можно использовать, например, для отображения сообщений в VIS, как это работает с адаптером pushover, но непосредственно в VIS.

![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/alerts.gif)

### Настройки редактора
Настройки, не указанные в таблице ниже, не требуют пояснений.

<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание</th></tr></thead><tbody><tr><td rowspan=3><img src="doc/en/media/alerts_settings.png"></td><td> Число столбцов</td><td> определить количество столбцов</td></tr><tr><td> ID объекта</td><td> Объект должен быть строкой json. Допустимые свойства описаны ниже</td></tr><tr><td> Максимум. Оповещения</td><td> максимальное количество отображаемых предупреждений.</td></tr></tbody></table>

### Свойства Datapoint JSON
<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> текст</td><td> текст пункта меню</td><td> нить</td><td></td></tr><tr><td> фоновый цвет</td><td> цвет фона элемента предупреждения</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> цвет границы</td><td> цвет границы элемента предупреждения</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> икона</td><td> значок материального дизайна или путь к изображению для пункта меню</td><td> нить</td><td/></tr><tr><td> iconColor</td><td> Цвет значка материального дизайна</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> Цвет шрифта</td><td> цвет шрифта элемента предупреждения</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr></tbody></table>

<! - опустить в toc ->

#### Свойства JSON Datapoint - пример
<details>

```
[
       {
		"text": "we have a new message",
		"backgroundColor": "",
		"borderColor": "darkred",
		"icon": "message-alert-outline",
		"iconColor": "darkred",
		"fontColor": "blue"
	}, {
		"text": "we have a new message",
		"backgroundColor": "#e6b0aa",
		"borderColor": "green",
		"icon": "/vis/img/bulb_on.png",
		"iconColor": "green",
		"fontColor": "gold"
	}, {
		"text": "we have a new message",
		"backgroundColor": "",
		"borderColor": "gold",
		"icon": "alert-outline",
		"iconColor": "gold",
		"fontColor": ""
	}
]
```

</details>

### Скрипт: отправить оповещение виджету
С помощью следующего скрипта вы можете отправлять простые сообщения в точку данных, которая используется виджетом предупреждений.
Скрипт необходимо поместить в глобальные скрипты. Затем можно отправить сообщение с помощью следующей команды

`materialDesignWidgets.sendTo('datapoint_id', 'message', 'color');`

```


var materialDesignWidgets = {};
materialDesignWidgets.sendTo = function (id, text, backgroundColor = '', borderColor = '', icon = '', iconColor = '', fontColor = '') {
    let json = getState(id).val;

    if (json) {
        try {

            json = JSON.parse(json);

        } catch (e) {
            json = [];
            console.warn('Wert ist kein JSON string! Wert wird ersetzt!');
        }
    } else {
        json = [];
    }

    json.push(
        {
            text: text,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            icon: icon,
            iconColor: iconColor,
            fontColor: fontColor
        }
    )
    setState(id, JSON.stringify(json), true);
}
```

## Календарь
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/calendar.gif)

### Настройки редактора
Настройки, не указанные в таблице ниже, не требуют пояснений.

<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание</th></tr></thead><tbody><tr><td rowspan=1><img src="doc/en/media/calendar_common.png"></td><td> Идентификатор объекта</td><td> идентификатор точки данных. Datapoint должен содержать строку json. Допустимые свойства json описаны ниже.</td></tr><tr><td rowspan=2><img src="doc/en/media/calendar_layout.png"></td><td> дни недели, которые будут показаны</td><td> Указывает, какие дни недели отображать. Для отображения только с понедельника по пятницу можно использовать значения <code>1, 2, 3, 4, 5</code> . Для отображения недели, начинающейся с понедельника, можно использовать значение <code>1, 2, 3, 4, 5, 6, 0</code> .</td></tr><tr><td> ID объекта</td><td> Объект должен быть строкой json, которая должна быть структурирована, как описано выше.</td></tr><tr><td rowspan=2><img src="doc/en/media/calendar_timeaxis.png"></td><td> час начала</td><td> Час, с которого встречи должны отображаться в режиме просмотра недели и дня.</td></tr><tr><td> конец часа</td><td> Час, до которого встречи должны отображаться в режиме просмотра недели и дня.</td></tr><tr><td rowspan=2><img src="doc/en/media/calendar_custom_date.png"></td><td colspan=2> Отменить форматы даты по умолчанию. Допустимые форматы описаны в документации <a href="https://momentjs.com/docs/#/displaying/">momentjs.</a></td></td></tr></tbody></table>

### Свойства Datapoint JSON
<table><thead><tr><th>Имущество</th><th> Описание</th><th> Тип</th><th> Значения</th></tr></thead><tbody><tr><td> название</td><td> название мероприятия</td><td> нить</td><td></td></tr><tr><td> цвет</td><td> цвет фона события</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> colorText</td><td> цвет текста события</td><td> нить</td><td> шестнадцатеричный (# 44739e), RGB (20, 50, 200), RGBA (20, 50, 200, 0,5)</td></tr><tr><td> Начало</td><td> дата и время начала события. Для событий на весь день используйте только дату без времени.</td><td> нить</td><td> ГГГГ-ММ-ДД | ГГГГ-ММ-ДД ЧЧ: мм</td></tr><tr><td> конец</td><td> дата и время окончания события. Для событий на весь день используйте только дату без времени</td><td> нить</td><td> ГГГГ-ММ-ДД | ГГГГ-ММ-ДД ЧЧ: мм</td></tr></tbody></table>

<! - опустить в toc ->

#### Свойства JSON Datapoint - пример
<details>

```
[
	{
		"name": "Event",
		"color": "#e74c3c",
		"colorText": "#FFFFFF",
		"start": "2020-01-24",
		"end": "2020-01-26"
	},
	{
		"name": "Meeting",
		"color": "#717d7e",
		"colorText": "#FFFFFF",
		"start": "2020-03-23 16:00",
		"end": "2020-03-24 17:15"
	}
]
```

</details>

### Скрипт: ical преобразование
Если вы хотите использовать виджет с [ical адаптер](https://github.com/iobroker-community-adapters/ioBroker.ical), вы можете использовать следующий сценарий для преобразования объекта ical для работы с виджетом.

<details>

```
// momentjs is required as dependecies in javascript adapter
const moment = require("moment");

var instances = $(`[id=ical.*.data.table]`);
instances.on(ical2CalendarWidget);

// remove this, if you know to use your own datapoint
let datapointId = 'materialdesignwidgets.calendar.ical2calendar'
createState(datapointId, "[]", {
  read: true,
  write: false,
  desc: "JSON String for Calendar Widget",
  type: "string",
  def: "[]"
});

function ical2CalendarWidget() {
    try {
        let calList = [];

        for (var inst = 0; inst <= instances.length - 1; inst++) {
            let icalObj = getState(instances[inst]).val;

            if (icalObj) {
                for (var i = 0; i <= icalObj.length - 1; i++) {
                    let item = icalObj[i];

                    // extract calendar color
                    let calendarName = item._class.split(' ')[0].replace('ical_', '');

                    let startTime = moment(item._date);
                    let endTime = moment(item._end);

                    let start = startTime.format("YYYY-MM-DD HH:mm");
                    let end = endTime.format("YYYY-MM-DD HH:mm");

                    if (startTime.format('HH:mm') === '00:00' && endTime.format('HH:mm') === '00:00') {
                        // is full-day event
                        if (endTime.diff(startTime, 'hours') === 24) {
                            // full-day event, one day
                            start = startTime.format("YYYY-MM-DD");
                            end = startTime.format("YYYY-MM-DD");
                        } else {
                            // full-day event, multiple days
                            start = startTime.format("YYYY-MM-DD");
                            end = endTime.format("YYYY-MM-DD");
                        }
                    }

                    // create object for calendar widget
                    calList.push({
                        name: item.event,
                        color: getMyCalendarColor(calendarName),
                        colorText: getMyCalendarTextColor(calendarName),
                        start: start,
                        end: end
                    })
                }

                function getMyCalendarColor(calendarName) {
                    // assign colors via the calendar names, use calendar name as set in ical
                    if (calendarName === 'calendar1') {
                        return '#FF0000';
                    } else if (calendarName === 'calendar2') {
                        return '#44739e'
                    } else if (calendarName === 'calendar3') {
                        return '#32a852'
                    }
                }

                function getMyCalendarTextColor(calendarName) {
                    // assign colors via the calendar names, use calendar name as set in ical
                    if (calendarName === 'calendar1') {
                        return '#FFFFFF';
                    } else if (calendarName === 'calendar2') {
                        return '#FFFFFF'
                    } else if (calendarName === 'calendar3') {
                        return '#FFFFFF'
                    }
                }
            }

            // Enter the destination data point that is to be used as object ID in the widget
            setState(datapointId, JSON.stringify(calList), true);
        }
    } catch (e) {
        console.error(`ical2MaterialDesignCalendarWidget: message: ${e.message}, stack: ${e.stack}`);
    }
}

ical2CalendarWidget();
```

</details>

## Диалог
![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/dialog.png)

### Настройки редактора
Настройки, не указанные в таблице ниже, не требуют пояснений.

<table><thead><tr><th>Скриншот</th><th> Параметр</th><th> Описание </th></tr></thead><tbody><tr><td rowspan=3><img src="doc/en/media/dialog_settings_common.png"></td><td> способ показать диалог</td><td> показать диалог с помощью кнопки или с помощью точки данных (тип логический)</td></tr><tr><td> Вид Конатина</td><td> вид, который должен отображаться в диалоговом окне</td></tr><tr><td> показать полноэкранный диалог, если разрешение ниже, чем</td><td> Показать полноэкранный диалог, если разрешение ниже заданного значения.</td></tr></tbody></table>

## HTML-виджеты
Создайте виджет html из поддерживаемых виджетов Material Design, чтобы использовать его в любом другом виджете, поддерживающем html.
Просто создайте свой виджет Material Design, нажмите `generate Html Element`, скопируйте данные и вставьте их в любой виджет, поддерживающий теги html.
Или используйте его в скриптах для динамического создания виджетов.

> Внимание:> *атрибуты тегов html должны быть окружены `'` (одинарная кавычка)>* двойные кавычки `"`, используемые в атрибутах, должны быть экранированы, как `\"`§>> сравните это с показанными примерами различных виджетов

![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/html-elements.gif)

Более подробную информацию о поддерживаемых свойствах можно найти в главе HTML-свойства отдельных виджетов.

### Примеры
<! - опустить в toc ->

#### Ползунок Round в сочетании с кнопкой со значком с использованием виджета HTML
Круглый ползунок и кнопка со значком в виде HTML-виджета

![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/html_widget_example_round_slider.gif)

Виджет для импорта через VIS Editor:<details>

```
[{"tpl":"tplHtml","data":{"g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":false,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","refreshInterval":"0","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"html":"<div>\n    <div class='vis-widget materialdesign-widget materialdesign-slider-round materialdesign-roundslider-html-element'\n    \tstyle='width: 100px; height: 100px; position: relative;'\n    \tmdw-oid='0_userdata.0.MDW.Slider.val0'\n    \tmdw-step='1'\n    \tmdw-startAngle='135'\n    \tmdw-arcLength='270'\n    \tmdw-handleZoom='1.5'\n    \tmdw-vibrateOnMobilDevices='50'\n    \tmdw-colorSliderBg='#mdwTheme:vis-materialdesign.0.colors.slider.background'\n    \tmdw-colorBeforeThumb='#mdwTheme:vis-materialdesign.0.colors.slider.control_before'\n    \tmdw-colorThumb='#mdwTheme:vis-materialdesign.0.colors.slider.control'\n    \tmdw-colorAfterThumb='#mdwTheme:vis-materialdesign.0.colors.slider.control_behind'\n    \tmdw-valueLabelColor='#mdwTheme:vis-materialdesign.0.colors.slider.text'\n    ></div>\n    <div class='vis-widget materialdesign-widget materialdesign-icon-button materialdesign-button-html-element'\n    \tstyle='width: 60px; height: 60px; position: absolute; padding: 0px; top: calc(50% - 30px); left:calc(50% - 30px);'\n    \tmdw-type='toggle_icon'\n    \tmdw-oid='0_userdata.0.MDW.Slider.val0'\n    \tmdw-toggleType='value'\n    \tmdw-valueOff='0'\n    \tmdw-valueOn='50'\n    \tmdw-iconHeight='35'\n    \tmdw-stateIfNotTrueValue='on'\n    \tmdw-vibrateOnMobilDevices='50'\n    \tmdw-image='lightbulb-off'\n    \tmdw-imageColor='#mdwTheme:vis-materialdesign.0.colors.button.icon.icon_off'\n    \tmdw-imageTrue='lightbulb-on'\n    \tmdw-imageTrueColor='gold'\n    \tmdw-colorBgFalse='#mdwTheme:vis-materialdesign.0.colors.button.icon.background_off'\n    \tmdw-colorBgTrue='#mdwTheme:vis-materialdesign.0.colors.button.icon.background_on'\n    \tmdw-colorPress='#mdwTheme:vis-materialdesign.0.colors.button.icon.pressed'\n    \tmdw-autoLockAfter='10'\n    \tmdw-lockIconTop='45'\n    \tmdw-lockIconLeft='55'\n    \tmdw-lockIconSize='20'\n    \tmdw-lockIconColor='#mdwTheme:vis-materialdesign.0.colors.button.icon.lock_icon'\n    \tmdw-lockIconBackground='#mdwTheme:vis-materialdesign.0.colors.button.icon.lock_icon_background'\n    \tmdw-lockBackgroundSizeFactor='1'\n    \tmdw-lockFilterGrayscale='30'\n    ></div>\n</div>"},"style":{"left":"527px","top":"76px","width":"100px","height":"100px"},"widgetSet":"basic"}]
```

</details>

<! - опустить в toc ->

#### Список с виджетами HTML
Список с настраиваемыми элементами управления с использованием HTML-виджетов

![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/html_widget_example_list.gif)

Виджет для импорта через VIS Editor:<details>

```
[{"tpl":"tplVis-materialdesign-List","data":{"g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":false,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","vibrateOnMobilDevices":"50","listType":"text","listItemDividerStyle":"padded","listLayout":"card","showScrollbar":false,"listItemDataMethod":"inputPerEditor","countListItems":"5","listItemAlignment":"left","listItemBackground":"#mdwTheme:vis-materialdesign.0.colors.list.background_off","listItemBackgroundActive":"#mdwTheme:vis-materialdesign.0.colors.list.background_on","colorSwitchThumb":"#mdwTheme:vis-materialdesign.0.colors.switch.off","colorSwitchTrack":"#mdwTheme:vis-materialdesign.0.colors.switch.track","colorSwitchTrue":"#mdwTheme:vis-materialdesign.0.colors.switch.on","colorSwitchHover":"#mdwTheme:vis-materialdesign.0.colors.switch.off_hover","colorCheckBox":"#mdwTheme:vis-materialdesign.0.colors.checkbox.on","colorListItemHover":"#mdwTheme:vis-materialdesign.0.colors.list.hover","colorListItemSelected":"#mdwTheme:vis-materialdesign.0.colors.list.selected","colorListItemText":"#mdwTheme:vis-materialdesign.0.colors.list.text","colorListItemTextSecondary":"#mdwTheme:vis-materialdesign.0.colors.list.subText","colorListItemTextRight":"#mdwTheme:vis-materialdesign.0.colors.list.text_right","colorListItemTextSecondaryRight":"{mode:vis-materialdesign.0.colors.darkTheme;light:vis-materialdesign.0.colors.light.list.subText_right;dark:vis-materialdesign.0.colors.dark.list.subText_right; mode === \"true\" ? dark : light}","colorListItemHeaders":"#mdwTheme:vis-materialdesign.0.colors.list.header","colorListItemDivider":"#mdwTheme:vis-materialdesign.0.colors.list.divider","headerFontFamily":"#mdwTheme:vis-materialdesign.0.fonts.list.header","listItemFont":"#mdwTheme:vis-materialdesign.0.fonts.list.text","listItemSubFont":"#mdwTheme:vis-materialdesign.0.fonts.list.subText","listItemRightFont":"#mdwTheme:vis-materialdesign.0.fonts.list.text_right","listItemSubRightFont":"#mdwTheme:vis-materialdesign.0.fonts.list.subText_right","listItemTextSize":"#mdwTheme:vis-materialdesign.0.fontSizes.list.text","listItemSubTextSize":"#mdwTheme:vis-materialdesign.0.fontSizes.list.subText","listItemTextRightSize":"#mdwTheme:vis-materialdesign.0.fontSizes.list.text_right","listItemSubTextRightSize":"#mdwTheme:vis-materialdesign.0.fontSizes.list.subText_right","listItemHeaderTextSize":"#mdwTheme:vis-materialdesign.0.fontSizes.list.header","listImageColor0":"#mdwTheme:vis-materialdesign.0.colors.list.icon_off","listImageActiveColor0":"#mdwTheme:vis-materialdesign.0.colors.list.icon_on","listImageColor1":"#mdwTheme:vis-materialdesign.0.colors.list.icon_off","listImageActiveColor1":"#mdwTheme:vis-materialdesign.0.colors.list.icon_on","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"groupHeader0":"List with HTML Widgets","label0":"Button Toggle","rightLabel0":"<div style=\"display: flex; justify-content: flex-end;\">\n    <div class='vis-widget materialdesign-widget materialdesign-button materialdesign-button-html-element'\n    \tstyle='width: 103px; height: 29px; position: relative; padding: 0px; margin-right: 10px;'\n    \tmdw-type='toggle_default'\n    \tmdw-oid='0_userdata.0.bool'\n    \tmdw-buttonStyle='raised'\n    \tmdw-toggleType='boolean'\n    \tmdw-stateIfNotTrueValue='on'\n    \tmdw-vibrateOnMobilDevices='50'\n    \tmdw-buttontext='off'\n    \tmdw-labelTrue='on'\n    \tmdw-textFontFamily='#mdwTheme:vis-materialdesign.0.fonts.button.default.text'\n    \tmdw-textFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.button.default.text'\n    \tmdw-mdwButtonPrimaryColor='#mdwTheme:vis-materialdesign.0.colors.button.default.primary'\n    \tmdw-mdwButtonSecondaryColor='#mdwTheme:vis-materialdesign.0.colors.button.default.secondary'\n    \tmdw-colorBgTrue='green'\n    \tmdw-image='checkbox-blank-outline'\n    \tmdw-imageTrue='checkbox-marked'\n    \tmdw-iconPosition='left'\n    \tmdw-lockEnabled='false'\n    \tmdw-autoLockAfter='10'\n    \tmdw-lockIconColor='#mdwTheme:vis-materialdesign.0.colors.button.lock_icon'\n    \tmdw-lockFilterGrayscale='30'\n    ></div>\n</div>","rightTextWidth":"300","label1":"Switch","rightLabel1":"<div style=\"display: flex; justify-content: flex-end;\">\n    <div class='vis-widget materialdesign-widget materialdesign-switch materialdesign-switch-html-element'\n    \tstyle='height: 50px; position: relative; overflow: visible !important; display: flex; align-items: center;'\n    \tmdw-oid='0_userdata.0.bool'\n    \tmdw-toggleType='boolean'\n    \tmdw-stateIfNotTrueValue='on'\n    \tmdw-vibrateOnMobilDevices='50'\n    \tmdw-labelPosition='right'\n    \tmdw-labelClickActive='true'\n    \tmdw-valueFontFamily='#mdwTheme:vis-materialdesign.0.fonts.switch.value'\n    \tmdw-valueFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.switch.value'\n    \tmdw-colorSwitchThumb='#mdwTheme:vis-materialdesign.0.colors.switch.off'\n    \tmdw-colorSwitchTrack='#mdwTheme:vis-materialdesign.0.colors.switch.track'\n    \tmdw-colorSwitchTrue='#mdwTheme:vis-materialdesign.0.colors.switch.on'\n    \tmdw-colorSwitchHover='#mdwTheme:vis-materialdesign.0.colors.switch.off_hover'\n    \tmdw-colorSwitchHoverTrue='#mdwTheme:vis-materialdesign.0.colors.switch.on_hover'\n    \tmdw-labelColorFalse='#mdwTheme:vis-materialdesign.0.colors.switch.text_off'\n    \tmdw-labelColorTrue='#mdwTheme:vis-materialdesign.0.colors.switch.text_on'\n    \tmdw-autoLockAfter='10'\n    \tmdw-lockIconTop='5'\n    \tmdw-lockIconLeft='5'\n    \tmdw-lockIconColor='#mdwTheme:vis-materialdesign.0.colors.switch.lock_icon'\n    \tmdw-lockFilterGrayscale='30'\n    ></div>\n</div>","listImageColor2":"#mdwTheme:vis-materialdesign.0.colors.list.icon_off","listImageActiveColor2":"#mdwTheme:vis-materialdesign.0.colors.list.icon_on","listImageColor3":"#mdwTheme:vis-materialdesign.0.colors.list.icon_off","listImageActiveColor3":"#mdwTheme:vis-materialdesign.0.colors.list.icon_on","listImageColor4":"#mdwTheme:vis-materialdesign.0.colors.list.icon_off","listImageActiveColor4":"#mdwTheme:vis-materialdesign.0.colors.list.icon_on","listImageColor5":"#mdwTheme:vis-materialdesign.0.colors.list.icon_off","listImageActiveColor5":"#mdwTheme:vis-materialdesign.0.colors.list.icon_on","listImageColor6":"#mdwTheme:vis-materialdesign.0.colors.list.icon_off","listImageActiveColor6":"#mdwTheme:vis-materialdesign.0.colors.list.icon_on","label2":"Slider","rightLabel2":"<div style=\"display: flex; justify-content: flex-end; overflow:visible !important;\">\n    <div class='vis-widget materialdesign-widget materialdesign-slider-vertical materialdesign-slider-html-element'\n    \tstyle='width: 100%; height: 100%; position: relative; overflow:visible !important; display: flex; align-items: center; padding: 0; margin-right: -6px;'\n    \tmdw-oid='0_userdata.0.number'\n    \tmdw-orientation='horizontal'\n    \tmdw-knobSize='knobSmall'\n    \tmdw-step='1'\n    \tmdw-vibrateOnMobilDevices='50'\n    \tmdw-showTicks='no'\n    \tmdw-tickTextColor='#mdwTheme:vis-materialdesign.0.colors.slider.tick'\n    \tmdw-tickFontFamily='#mdwTheme:vis-materialdesign.0.fonts.slider.ticks'\n    \tmdw-tickFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.slider.ticks'\n    \tmdw-tickColorBefore='#mdwTheme:vis-materialdesign.0.colors.slider.tick_before'\n    \tmdw-tickColorAfter='#mdwTheme:vis-materialdesign.0.colors.slider.tick_after'\n    \tmdw-colorBeforeThumb='#mdwTheme:vis-materialdesign.0.colors.slider.control_before'\n    \tmdw-colorThumb='#mdwTheme:vis-materialdesign.0.colors.slider.control'\n    \tmdw-colorAfterThumb='#mdwTheme:vis-materialdesign.0.colors.slider.control_behind'\n    \tmdw-prepandTextColor='#mdwTheme:vis-materialdesign.0.colors.slider.text_prepand'\n    \tmdw-prepandTextFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.slider.prepand'\n    \tmdw-prepandTextFontFamily='#mdwTheme:vis-materialdesign.0.fonts.slider.prepand'\n    \tmdw-valueLabelStyle='sliderValue'\n    \tmdw-valueFontFamily='#mdwTheme:vis-materialdesign.0.fonts.slider.value'\n    \tmdw-valueFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.slider.value'\n    \tmdw-valueLabelColor='#mdwTheme:vis-materialdesign.0.colors.slider.text'\n    \tmdw-valueLabelWidth='50'\n    \tmdw-showThumbLabel='yes'\n    \tmdw-thumbBackgroundColor='#mdwTheme:vis-materialdesign.0.colors.slider.control_background'\n    \tmdw-thumbFontColor='#mdwTheme:vis-materialdesign.0.colors.slider.control_text'\n    \tmdw-thumbFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.slider.control'\n    \tmdw-thumbFontFamily='#mdwTheme:vis-materialdesign.0.fonts.slider.control'\n    ></div>\n</div>","listOverflow2":true,"listItemRightAlignment":"left","rightLabel3":"<div style=\"display: flex; justify-content: flex-end; overflow:visible !important; margin-right: 10px;\">\n    <div class='vis-widget materialdesign-widget materialdesign-progress materialdesign-progress-html-element'\n    \tstyle='width: 100%; height: 30px; position: relative; padding: 0px;'\n    \tmdw-type='linear'\n    \tmdw-oid='0_userdata.0.number'\n    \tmdw-progressRounded='true'\n    \tmdw-colorProgressBackground='#mdwTheme:vis-materialdesign.0.colors.progress.track_background'\n    \tmdw-colorProgress='#mdwTheme:vis-materialdesign.0.colors.progress.track'\n    \tmdw-colorOneCondition='50'\n    \tmdw-colorOne='#mdwTheme:vis-materialdesign.0.colors.progress.track_condition1'\n    \tmdw-colorTwoCondition='70'\n    \tmdw-colorTwo='#mdwTheme:vis-materialdesign.0.colors.progress.track_condition2'\n    \tmdw-showValueLabel='true'\n    \tmdw-valueLabelStyle='progressPercent'\n    \tmdw-textColor='#000'\n    \tmdw-textFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.progress.text'\n    \tmdw-textFontFamily='#mdwTheme:vis-materialdesign.0.fonts.progress.text'\n    \tmdw-textAlign='end'\n    ></div>\n</div>\n\n\n\n","rightSubLabel3":"","listOverflow1":true,"label3":"Progress","dividers0":true,"dividers1":true,"dividers2":true,"dividers3":true,"listImageHeight":"","listItemHeight":"40","listImage0":"gesture-tap-button","oid1":"","listImage1":"application-export","listImage2":"view-day","listImage3":"progress-download","label4":"Select","rightLabel4":"<div style=\"display: flex; justify-content: flex-end; margin-right: 10px;\">\n    <div class='vis-widget materialdesign-widget materialdesign-select materialdesign-select-html-element'\n    \tstyle='width: 183px; height: 28px; position: relative; overflow: visible; display: flex; align-items: center;'\n    \tmdw-oid='0_userdata.0.number'\n    \tmdw-inputType='text'\n    \tmdw-vibrateOnMobilDevices='50'\n    \tmdw-inputLayout='regular'\n    \tmdw-inputAlignment='left'\n    \tmdw-inputLayoutBorderColor='#mdwTheme:vis-materialdesign.0.colors.input.border'\n    \tmdw-inputLayoutBorderColorHover='#mdwTheme:vis-materialdesign.0.colors.input.border_hover'\n    \tmdw-inputLayoutBorderColorSelected='#mdwTheme:vis-materialdesign.0.colors.input.border_selected'\n    \tmdw-inputTextFontFamily='#mdwTheme:vis-materialdesign.0.fonts.input.text'\n    \tmdw-inputTextFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.text'\n    \tmdw-inputTextColor='#mdwTheme:vis-materialdesign.0.colors.input.text'\n    \tmdw-inputLabelText='by Value List'\n    \tmdw-inputLabelColor='#mdwTheme:vis-materialdesign.0.colors.input.label'\n    \tmdw-inputLabelColorSelected='#mdwTheme:vis-materialdesign.0.colors.input.label_selected'\n    \tmdw-inputLabelFontFamily='#mdwTheme:vis-materialdesign.0.fonts.input.label'\n    \tmdw-inputLabelFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.label'\n    \tmdw-inputTranslateX='-29'\n    \tmdw-inputAppendixColor='#mdwTheme:vis-materialdesign.0.colors.input.appendix'\n    \tmdw-inputAppendixFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.appendix'\n    \tmdw-inputAppendixFontFamily='#mdwTheme:vis-materialdesign.0.fonts.input.appendix'\n    \tmdw-showInputMessageAlways='true'\n    \tmdw-inputMessageFontFamily='#mdwTheme:vis-materialdesign.0.fonts.input.message'\n    \tmdw-inputMessageFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.message'\n    \tmdw-inputMessageColor='#mdwTheme:vis-materialdesign.0.colors.input.message'\n    \tmdw-inputCounterColor='#mdwTheme:vis-materialdesign.0.colors.input.counter'\n    \tmdw-inputCounterFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.counter'\n    \tmdw-inputCounterFontFamily='#mdwTheme:vis-materialdesign.0.fonts.input.counter'\n    \tmdw-clearIconShow='true'\n    \tmdw-clearIconColor='#mdwTheme:vis-materialdesign.0.colors.input.icon_clear'\n    \tmdw-collapseIconColor='#mdwTheme:vis-materialdesign.0.colors.input.icon_collapse'\n    \tmdw-listDataMethod='valueList'\n    \tmdw-countSelectItems='0'\n    \tmdw-valueList='10;30;90'\n    \tmdw-valueListLabels='val1;val2;val3'\n    \tmdw-valueListIcons='home;home;home'\n    \tmdw-listPosition='auto'\n    \tmdw-listItemBackgroundColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.background'\n    \tmdw-listItemBackgroundHoverColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.hover'\n    \tmdw-listItemBackgroundSelectedColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.selected'\n    \tmdw-listItemRippleEffectColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.effect'\n    \tmdw-showSelectedIcon='prepend-inner'\n    \tmdw-listIconColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.icon'\n    \tmdw-listItemFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.dropdown.text'\n    \tmdw-listItemFont='#mdwTheme:vis-materialdesign.0.fonts.input.dropdown.text'\n    \tmdw-listItemFontColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.text'\n    \tmdw-listItemSubFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.dropdown.subText'\n    \tmdw-listItemSubFont='#mdwTheme:vis-materialdesign.0.fonts.input.dropdown.subText'\n    \tmdw-listItemSubFontColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.subText'\n    \tmdw-showValue='true'\n    \tmdw-listItemValueFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.input.dropdown.value'\n    \tmdw-listItemValueFont='#mdwTheme:vis-materialdesign.0.fonts.input.dropdown.value'\n    \tmdw-listItemValueFontColor='#mdwTheme:vis-materialdesign.0.colors.input.menu.value'\n    ></div>\n</div>\n\n\n\n","listImage4":"airplane-takeoff","dividers4":true,"label5":"Value","subLabel5":"","rightLabel5":"<div style=\"display: flex; justify-content: flex-end; overflow:visible !important; margin-right: 10px;\">\n    <div class='vis-widget materialdesign-widget materialdesign-value materialdesign-value-html-element'\n    \tstyle='width: 80px; height: 100%; position: relative; display: flex; align-items: center;'\n    \tmdw-debug='false'\n    \tmdw-oid='0_userdata.0.number'\n    \tmdw-targetType='auto'\n    \tmdw-textAlign='end'\n    \tmdw-valuesFontColor='#mdwTheme:vis-materialdesign.0.colors.value.text'\n    \tmdw-valuesFontFamily='#mdwTheme:vis-materialdesign.0.fonts.value.text'\n    \tmdw-valuesFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.value.text'\n    \tmdw-prepandTextColor='#mdwTheme:vis-materialdesign.0.colors.value.prepand'\n    \tmdw-prepandTextFontFamily='#mdwTheme:vis-materialdesign.0.fonts.value.prepand'\n    \tmdw-prepandTextFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.value.prepand'\n    \tmdw-appendTextColor='#mdwTheme:vis-materialdesign.0.colors.value.append'\n    \tmdw-appendTextFontFamily='#mdwTheme:vis-materialdesign.0.fonts.value.append'\n    \tmdw-appendTextFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.value.append'\n    \tmdw-valueLabelUnit='%'\n    \tmdw-calculate='#value * 10'\n    \tmdw-image='information'\n    \tmdw-imageColor='#mdwTheme:vis-materialdesign.0.colors.value.icon'\n    \tmdw-iconPosition='left'\n    \tmdw-changeEffectEnabled='true'\n    \tmdw-effectFontColor='#00e640'\n    \tmdw-effectFontSize='16'\n    \tmdw-effectDuration='750'\n    ></div>\n    </div>","listOverflow5":false,"dividers5":true,"listImage5":"parachute","rightLabel6":"","subLabel4":"","listOverflow4":true,"listBackground":"#mdwTheme:vis-materialdesign.0.colors.list.background"},"style":{"left":"12px","top":"12px","width":"433px","height":"315px","overflow-x":""},"widgetSet":"materialdesign"}]
```

</details>

<! - опустить в toc ->

#### HTML-виджеты, использующиеся в виджетах без материального дизайна
Переключатель кнопок используется в виджете, отличном от Material Design, здесь используется [vis-material-advanced](https://github.com/iobroker-community-adapters/ioBroker.vis-material-advanced) Виджет ListThermostat

![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/html_widget_example_non_mdw_widget.gif)

Виджет для импорта через VIS Editor:<details>

```
[{"tpl":"tplMaListThermostat","data":{"g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":false,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","showTitle":"checked","onlyTitle":"","titleSize":"medium","widgetBackground":"#121212","TextColor":"white","subtitleSize":"x-small","valueAlign":"right","valueVertical":"center","valueSize":"medium","opacityColor":"white","min":"14","max":"30","cardIcon":"/icons-mfd-svg/sani_heating_temp.svg","showIcon":"checked","centerIcon":true,"borderRadius":"10","borderColor":"white","useOverallRoundedValues":"checked","roundLeftUp":"10","roundLeftBottom":"0","roundRightUp":"0","roundRightBottom":"10","boxShadow":"unchecked","shadowWidth":"2","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"subtitle":"<br>\n<div class='vis-widget materialdesign-widget materialdesign-button materialdesign-button-html-element'\n\tstyle='width: 100%; height: 50px; position: relative; padding: 0px; z-index: 1'\n\tmdw-type='toggle_default'\n\tmdw-oid='0_userdata.0.string'\n\tmdw-buttonStyle='raised'\n\tmdw-toggleType='value'\n\tmdw-valueOff='bla'\n\tmdw-valueOn='on'\n\tmdw-stateIfNotTrueValue='on'\n\tmdw-vibrateOnMobilDevices='50'\n\tmdw-buttontext=' Toggle'\n\tmdw-textFontFamily='#mdwTheme:vis-materialdesign.0.fonts.button.default.text'\n\tmdw-textFontSize='#mdwTheme:vis-materialdesign.0.fontSizes.button.default.text'\n\tmdw-mdwButtonPrimaryColor='#mdwTheme:vis-materialdesign.0.colors.button.default.primary'\n\tmdw-mdwButtonSecondaryColor='#mdwTheme:vis-materialdesign.0.colors.button.default.secondary'\n\tmdw-colorBgTrue='green'\n\tmdw-image='checkbox-marked'\n\tmdw-iconPosition='left'\n\tmdw-autoLockAfter='10'\n\tmdw-lockIconColor='#mdwTheme:vis-materialdesign.0.colors.button.lock_icon'\n\tmdw-lockFilterGrayscale='30'\n></div>","title":"Material Design Button in Material Advanced Widget"},"style":{"left":"75px","top":"559px","width":"847px","height":"107px"},"widgetSet":"vis-material-advanced"}]
```

</details>

<! - опустить в toc ->

#### Value HTML-виджеты, использующие в комплексном представлении
Виджет значения в более сложном представлении с преобразованиями, показывающий, как использовать виджет значения вместо привязок.

![Логотип](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/hauskraftwerk.gif)

Просмотр для импорта с помощью редактора VIS:<details>

```
{
  "settings": {
    "style": {
      "background_class": ""
    },
    "theme": "redmond",
    "sizex": "",
    "sizey": "",
    "gridSize": "",
    "snapType": null
  },
  "widgets": {
    "e00001": {
      "tpl": "tplVis-materialdesign-Card",
      "data": {
        "g_fixed": true,
        "g_visibility": false,
        "g_css_font_text": false,
        "g_css_background": false,
        "g_css_shadow_padding": false,
        "g_css_border": false,
        "g_gestures": false,
        "g_signals": false,
        "g_last_change": false,
        "visibility-cond": "==",
        "visibility-val": 1,
        "visibility-groups-action": "hide",
        "cardLayout": "Basic",
        "cardStyle": "default",
        "showTitle": false,
        "titleLayout": "20",
        "titleFontFamily": "",
        "showSubTitle": false,
        "subtitleLayout": "",
        "subTitleFontFamily": "",
        "showText": "true",
        "textFontSize": "",
        "textFontFamily": "",
        "refresh_oid_delay": "100",
        "refresh_animation_duration": "150",
        "colorBackground": "#mdwTheme:vis-materialdesign.0.colors.card.background",
        "colorTitleSectionBackground": "#mdwTheme:vis-materialdesign.0.colors.card.background_title",
        "colorTextSectionBackground": "#mdwTheme:vis-materialdesign.0.colors.card.background_body",
        "colorTitle": "#mdwTheme:vis-materialdesign.0.colors.card.title",
        "colorSubtitle": "#mdwTheme:vis-materialdesign.0.colors.card.subTitle",
        "colorBody": "#mdwTheme:vis-materialdesign.0.colors.card.text",
        "clickType": "none",
        "controlType": "link",
        "signals-cond-0": "==",
        "signals-val-0": true,
        "signals-icon-0": "/vis/signals/lowbattery.png",
        "signals-icon-size-0": 0,
        "signals-blink-0": false,
        "signals-horz-0": 0,
        "signals-vert-0": 0,
        "signals-hide-edit-0": false,
        "signals-cond-1": "==",
        "signals-val-1": true,
        "signals-icon-1": "/vis/signals/lowbattery.png",
        "signals-icon-size-1": 0,
        "signals-blink-1": false,
        "signals-horz-1": 0,
        "signals-vert-1": 0,
        "signals-hide-edit-1": false,
        "signals-cond-2": "==",
        "signals-val-2": true,
        "signals-icon-2": "/vis/signals/lowbattery.png",
        "signals-icon-size-2": 0,
        "signals-blink-2": false,
        "signals-horz-2": 0,
        "signals-vert-2": 0,
        "signals-hide-edit-2": false,
        "lc-type": "last-change",
        "lc-is-interval": true,
        "lc-is-moment": false,
        "lc-format": "",
        "lc-position-vert": "top",
        "lc-position-horz": "right",
        "lc-offset-vert": 0,
        "lc-offset-horz": 0,
        "lc-font-size": "12px",
        "lc-font-family": "",
        "lc-font-style": "",
        "lc-bkg-color": "",
        "lc-color": "",
        "lc-border-width": "0",
        "lc-border-style": "",
        "lc-border-color": "",
        "lc-border-radius": 10,
        "lc-zindex": 0,
        "title": "",
        "html": "<div style=\"width: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; margin-top: -10px\">\n    \n    <!-- Header Text -->\n    <div style=\"text-align:center; font-size: 20px; font-family: RobotoCondensed-Regular\">Photovoltaik</div>\n    \n    <!-- Icon -->\n    <div class='vis-widget materialdesign-widget materialdesign-icon materialdesign-materialdesignicons-html-element'\n    \tstyle='width: 100%; height: 55px; position: relative; display: flex; align-items: center; justify-content: center; margin-top: 4px;'\n    \tmdw-mdwIcon='solar-panel-large'\n    \tmdw-mdwIconSize='50'\n    \tmdw-mdwIconColor='gold'\n    ></div>\n        \n    <!-- Value -> Energie today -->\n    <div class='vis-widget materialdesign-widget materialdesign-value materialdesign-value-html-element'\n        style='width: auto; height: 20px; position: relative; display: flex; align-items: center;'\n        mdw-oid='0_userdata.0.Verbrauchszaehler.Photovoltaik.Verbrauch.Tag'\n        mdw-valueLabelUnit='kWh'\n        mdw-maxDecimals='1'        \n        mdw-textAlign='left'\n        mdw-valuesFontColor='#44739e'\n        mdw-valuesFontFamily='RobotoCondensed-Regular'\n        mdw-valuesFontSize='13'\n\t    mdw-image='arrow-down-bold'\n\t    mdw-imageColor='#44739e'\n\t    mdw-iconPosition='left'\n\t    mdw-iconHeight='16'\n    ></div>\n</div>",
        "showScrollbar": false,
        "name": "Photovoltaik - Card "
      },
      "style": {
        "left": "10px",
        "top": "10px",
        "z-index": "1",
        "width": "calc(50% - 15px)",
        "height": "120px"
      },
      "widgetSet": "materialdesign"
    },
    "e00002": {
      "tpl": "tplVis-materialdesign-Progress",
      "data": {
        "oid": "",
        "g_fixed": true,
        "g_visibility": true,
        "g_css_font_text": false,
        "g_css_background": false,
        "g_css_shadow_padding": false,
        "g_css_border": false,
        "g_gestures": false,
        "g_signals": false,
        "g_last_change": false,
        "visibility-cond": "!=",
        "visibility-val": "0",
        "visibility-groups-action": "hide",
        "progressRounded": false,
        "colorProgressBackground": "#mdwTheme:vis-materialdesign.0.colors.progress.track_background",
        "colorProgress": "#mdwTheme:vis-materialdesign.0.colors.progress.track",
        "colorOne": "#mdwTheme:vis-materialdesign.0.colors.progress.track_condition1",
        "colorTwo": "#mdwTheme:vis-materialdesign.0.colors.progress.track_condition2",
        "showValueLabel": false,
        "valueLabelStyle": "progressValue",
        "textColor": "#mdwTheme:vis-materialdesign.0.colors.progress.text",
        "textFontSize": "#mdwTheme:vis-materialdesign.0.fontSizes.progress.text",
        "textFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.progress.text",
        "textAlign": "center",
        "signals-cond-0": "==",
        "signals-val-0": true,
        "signals-icon-0": "/vis/signals/lowbattery.png",
        "signals-icon-size-0": 0,
        "signals-blink-0": false,
        "signals-horz-0": 0,
        "signals-vert-0": 0,
        "signals-hide-edit-0": false,
        "signals-cond-1": "==",
        "signals-val-1": true,
        "signals-icon-1": "/vis/signals/lowbattery.png",
        "signals-icon-size-1": 0,
        "signals-blink-1": false,
        "signals-horz-1": 0,
        "signals-vert-1": 0,
        "signals-hide-edit-1": false,
        "signals-cond-2": "==",
        "signals-val-2": true,
        "signals-icon-2": "/vis/signals/lowbattery.png",
        "signals-icon-size-2": 0,
        "signals-blink-2": false,
        "signals-horz-2": 0,
        "signals-vert-2": 0,
        "signals-hide-edit-2": false,
        "lc-type": "last-change",
        "lc-is-interval": true,
        "lc-is-moment": false,
        "lc-format": "",
        "lc-position-vert": "top",
        "lc-position-horz": "right",
        "lc-offset-vert": 0,
        "lc-offset-horz": 0,
        "lc-font-size": "12px",
        "lc-font-family": "",
        "lc-font-style": "",
        "lc-bkg-color": "",
        "lc-color": "",
        "lc-border-width": "0",
        "lc-border-style": "",
        "lc-border-color": "",
        "lc-border-radius": 10,
        "lc-zindex": 0,
        "progressIndeterminate": true,
        "visibility-oid": "linkeddevices.0.Energiespeicher.Photovoltaik.Leistung",
        "reverse": false,
        "progressRotate": "yes",
        "name": "Photovoltaik - Progress OUT "
      },
      "style": {
        "left": "calc(25% - 2px)",
        "top": "130px",
        "width": "4px",
        "height": "50px",
        "z-index": "1"
      },
      "widgetSet": "materialdesign"
    },
    "e00003": {
      "tpl": "tplVis-materialdesign-value",
      "data": {
        "oid": "linkeddevices.0.Energiespeicher.Photovoltaik.Leistung",
        "g_fixed": true,
        "g_visibility": true,
        "g_css_font_text": false,
        "g_css_background": false,
        "g_css_shadow_padding": false,
        "g_css_border": false,
        "g_gestures": false,
        "g_signals": false,
        "g_last_change": false,
        "visibility-cond": "!=",
        "visibility-val": "0",
        "visibility-groups-action": "hide",
        "targetType": "auto",
        "textAlign": "start",
        "valuesFontColor": "#mdwTheme:vis-materialdesign.0.colors.value.text",
        "valuesFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.value.text",
        "valuesFontSize": "#mdwTheme:vis-materialdesign.0.fontSizes.value.text",
        "prepandTextColor": "#mdwTheme:vis-materialdesign.0.colors.value.prepand",
        "prepandTextFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.value.prepand",
        "prepandTextFontSize": "#mdwTheme:vis-materialdesign.0.fontSizes.value.prepand",
        "appendTextColor": "#mdwTheme:vis-materialdesign.0.colors.value.append",
        "appendTextFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.value.append",
        "appendTextFontSize": "#mdwTheme:vis-materialdesign.0.fontSizes.value.append",
        "image": "",
        "imageColor": "#mdwTheme:vis-materialdesign.0.colors.value.icon",
        "iconPosition": "left",
        "effectFontColor": "#00e640",
        "effectFontSize": "",
        "effectDuration": "500",
        "signals-cond-0": "==",
        "signals-val-0": true,
        "signals-icon-0": "/vis/signals/lowbattery.png",
        "signals-icon-size-0": 0,
        "signals-blink-0": false,
        "signals-horz-0": 0,
        "signals-vert-0": 0,
        "signals-hide-edit-0": false,
        "signals-cond-1": "==",
        "signals-val-1": true,
        "signals-icon-1": "/vis/signals/lowbattery.png",
        "signals-icon-size-1": 0,
        "signals-blink-1": false,
        "signals-horz-1": 0,
        "signals-vert-1": 0,
        "signals-hide-edit-1": false,
        "signals-cond-2": "==",
        "signals-val-2": true,
        "signals-icon-2": "/vis/signals/lowbattery.png",
        "signals-icon-size-2": 0,
        "signals-blink-2": false,
        "signals-horz-2": 0,
        "signals-vert-2": 0,
        "signals-hide-edit-2": false,
        "lc-type": "last-change",
        "lc-is-interval": true,
        "lc-is-moment": false,
        "lc-format": "",
        "lc-position-vert": "top",
        "lc-position-horz": "right",
        "lc-offset-vert": 0,
        "lc-offset-horz": 0,
        "lc-font-size": "12px",
        "lc-font-family": "",
        "lc-font-style": "",
        "lc-bkg-color": "",
        "lc-color": "",
        "lc-border-width": "0",
        "lc-border-style": "",
        "lc-border-color": "",
        "lc-border-radius": 10,
        "lc-zindex": 0,
        "valueLabelUnit": "W",
        "changeEffectEnabled": false,
        "generateHtmlControl": "true",
        "visibility-oid": "linkeddevices.0.Energiespeicher.Photovoltaik.Leistung",
        "name": "Photovoltaik - Leistung"
      },
      "style": {
        "left": "calc(25% + 10px)",
        "top": "140px",
        "z-index": "2",
        "width": "100px",
        "height": "29px"
      },
      "widgetSet": "materialdesign"
    },
    "e00004": {
      "tpl": "tplVis-materialdesign-Chart-Bar",
      "data": {
        "oid": "nothing_selected",
        "g_fixed": true,
        "g_visibility": false,
        "g_css_font_text": false,
        "g_css_background": false,
        "g_css_shadow_padding": false,
        "g_css_border": false,
        "g_gestures": false,
        "g_signals": false,
        "g_last_change": false,
        "visibility-cond": "==",
        "visibility-val": 1,
        "visibility-groups-action": "hide",
        "chartDataMethod": "inputPerEditor",
        "dataCount": "1",
        "chartType": "vertical",
        "backgroundColor": "#mdwTheme:vis-materialdesign.0.colors.charts.background",
        "chartAreaBackgroundColor": "#mdwTheme:vis-materialdesign.0.colors.charts.background_chart",
        "titleLayout": "#mdwTheme:vis-materialdesign.0.fontSizes.card.title",
        "titleFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.card.title",
        "colorBackground": "#mdwTheme:vis-materialdesign.0.colors.card.background",
        "colorTitleSectionBackground": "#mdwTheme:vis-materialdesign.0.colors.card.background_title",
        "colorTextSectionBackground": "#mdwTheme:vis-materialdesign.0.colors.card.background_body",
        "colorTitle": "#mdwTheme:vis-materialdesign.0.colors.card.title",
        "globalColor": "#mdwTheme:vis-materialdesign.0.colors.charts.global",
        "hoverColor": "#mdwTheme:vis-materialdesign.0.colors.charts.bar.hover",
        "hoverBorderColor": "#mdwTheme:vis-materialdesign.0.colors.charts.bar.hover_border",
        "showValues": "showValuesOn",
        "valuesFontColor": "#mdwTheme:vis-materialdesign.0.colors.charts.value",
        "valuesFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.charts.value",
        "valuesFontSize": "#mdwTheme:vis-materialdesign.0.fontSizes.charts.value",
        "valuesPositionAnchor": "end",
        "valuesPositionAlign": "top",
        "valuesTextAlign": "center",
        "yAxisPosition": "left",
        "yAxisTitleColor": "#mdwTheme:vis-materialdesign.0.colors.charts.y_axis_title",
        "yAxisTitleFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.charts.y_axis_title",
        "yAxisTitleFontSize": "#mdwTheme:vis-materialdesign.0.fontSizes.charts.y_axis_title",
        "yAxisValueLabelColor": "#mdwTheme:vis-materialdesign.0.colors.charts.y_axis_values",
        "yAxisValueFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.charts.y_axis_values",
        "yAxisValueFontSize": "#mdwTheme:vis-materialdesign.0.fontSizes.charts.y_axis_values",
        "yAxisValueDistanceToAxis": "10",
        "yAxisShowAxis": false,
        "yAxisShowAxisLabels": false,
        "yAxisShowGridLines": false,
        "yAxisGridLinesColor": "#mdwTheme:vis-materialdesign.0.colors.charts.y_axis_gridlines",
        "yAxisShowTicks": false,
        "yAxisZeroLineColor": "#mdwTheme:vis-materialdesign.0.colors.charts.y_axis_zeroline",
        "xAxisPosition": "bottom",
        "xAxisTicksSource": "auto",
        "xAxisTitleColor": "#mdwTheme:vis-materialdesign.0.colors.charts.x_axis_title",
        "xAxisTitleFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.charts.x_axis_title",
        "xAxisTitleFontSize": "#mdwTheme:vis-materialdesign.0.fontSizes.charts.x_axis_title",
        "xAxisValueLabelColor": "#mdwTheme:vis-materialdesign.0.colors.charts.x_axis_values",
        "xAxisValueFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.charts.x_axis_values",
        "xAxisValueFontSize": "#mdwTheme:vis-materialdesign.0.fontSizes.charts.x_axis_values",
        "xAxisValueDistanceToAxis": "6",
        "xAxisShowAxis": false,
        "xAxisShowAxisLabels": true,
        "xAxisShowGridLines": false,
        "xAxisGridLinesColor": "#mdwTheme:vis-materialdesign.0.colors.charts.x_axis_gridlines",
        "xAxisShowTicks": false,
        "xAxisZeroLineColor": "#mdwTheme:vis-materialdesign.0.colors.charts.x_axis_zeroline",
        "xAxisMinRotation": "0",
        "xAxisMaxRotation": "0",
        "legendPosition": "right",
        "legendFontColor": "#mdwTheme:vis-materialdesign.0.colors.charts.legend",
        "legendFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.charts.legend",
        "legendFontSize": "#mdwTheme:vis-materialdesign.0.fontSizes.charts.legend",
        "legendPointStyle": "true",
        "showTooltip": false,
        "tooltipBackgroundColor": "#mdwTheme:vis-materialdesign.0.colors.charts.tooltip_background",
        "tooltipShowColorBox": "true",
        "tooltipTitleFontColor": "#mdwTheme:vis-materialdesign.0.colors.charts.tooltip_title",
        "tooltipTitleFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.charts.tooltip_title",
        "tooltipTitleFontSize": "#mdwTheme:vis-materialdesign.0.fontSizes.charts.tooltip_title",
        "tooltipBodyFontColor": "#mdwTheme:vis-materialdesign.0.colors.charts.tooltip_text",
        "tooltipBodyFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.charts.tooltip_text",
        "tooltipBodyFontSize": "#mdwTheme:vis-materialdesign.0.fontSizes.charts.tooltip_text",
        "signals-cond-0": "==",
        "signals-val-0": true,
        "signals-icon-0": "/vis/signals/lowbattery.png",
        "signals-icon-size-0": 0,
        "signals-blink-0": false,
        "signals-horz-0": 0,
        "signals-vert-0": 0,
        "signals-hide-edit-0": false,
        "signals-cond-1": "==",
        "signals-val-1": true,
        "signals-icon-1": "/vis/signals/lowbattery.png",
        "signals-icon-size-1": 0,
        "signals-blink-1": false,
        "signals-horz-1": 0,
        "signals-vert-1": 0,
        "signals-hide-edit-1": false,
        "signals-cond-2": "==",
        "signals-val-2": true,
        "signals-icon-2": "/vis/signals/lowbattery.png",
        "signals-icon-size-2": 0,
        "signals-blink-2": false,
        "signals-horz-2": 0,
        "signals-vert-2": 0,
        "signals-hide-edit-2": false,
        "lc-type": "last-change",
        "lc-is-interval": true,
        "lc-is-moment": false,
        "lc-format": "",
        "lc-position-vert": "top",
        "lc-position-horz": "right",
        "lc-offset-vert": 0,
        "lc-offset-horz": 0,
        "lc-font-size": "12px",
        "lc-font-family": "",
        "lc-font-style": "",
        "lc-bkg-color": "",
        "lc-color": "",
        "lc-border-width": "0",
        "lc-border-style": "",
        "lc-border-color": "",
        "lc-border-radius": 10,
        "lc-zindex": 0,
        "oid0": "linkeddevices.0.Energiespeicher.Eigenverbrauch",
        "oid1": "linkeddevices.0.Energiespeicher.Autarkie",
        "axisValueMin": "0",
        "axisValueMax": "100",
        "chartPaddingTop": "30",
        "valueTextColor0": "",
        "valuesAppendText": " %",
        "label0": "Eigenverbrauch",
        "label1": "Autarkie",
        "cardUse": true,
        "dataColor0": "#ff9800",
        "dataColor1": "#6dd600",
        "barWidth": "",
        "disableHoverEffects": true,
        "name": "Bar Chart "
      },
      "style": {
        "left": "30px",
        "top": "180px",
        "width": "calc(100% - 60px)",
        "height": "200px",
        "z-index": "1"
      },
      "widgetSet": "materialdesign"
    },
    "e00005": {
      "tpl": "tplVis-materialdesign-Card",
      "data": {
        "g_fixed": true,
        "g_visibility": false,
        "g_css_font_text": false,
        "g_css_background": false,
        "g_css_shadow_padding": false,
        "g_css_border": false,
        "g_gestures": false,
        "g_signals": false,
        "g_last_change": false,
        "visibility-cond": "==",
        "visibility-val": 1,
        "visibility-groups-action": "hide",
        "cardLayout": "Basic",
        "cardStyle": "default",
        "showTitle": false,
        "titleLayout": "20",
        "titleFontFamily": "",
        "showSubTitle": false,
        "subtitleLayout": "",
        "subTitleFontFamily": "",
        "showText": "true",
        "textFontSize": "",
        "textFontFamily": "",
        "refresh_oid_delay": "100",
        "refresh_animation_duration": "150",
        "colorBackground": "#mdwTheme:vis-materialdesign.0.colors.card.background",
        "colorTitleSectionBackground": "#mdwTheme:vis-materialdesign.0.colors.card.background_title",
        "colorTextSectionBackground": "#mdwTheme:vis-materialdesign.0.colors.card.background_body",
        "colorTitle": "#mdwTheme:vis-materialdesign.0.colors.card.title",
        "colorSubtitle": "#mdwTheme:vis-materialdesign.0.colors.card.subTitle",
        "colorBody": "#mdwTheme:vis-materialdesign.0.colors.card.text",
        "clickType": "none",
        "controlType": "link",
        "signals-cond-0": "==",
        "signals-val-0": true,
        "signals-icon-0": "/vis/signals/lowbattery.png",
        "signals-icon-size-0": 0,
        "signals-blink-0": false,
        "signals-horz-0": 0,
        "signals-vert-0": 0,
        "signals-hide-edit-0": false,
        "signals-cond-1": "==",
        "signals-val-1": true,
        "signals-icon-1": "/vis/signals/lowbattery.png",
        "signals-icon-size-1": 0,
        "signals-blink-1": false,
        "signals-horz-1": 0,
        "signals-vert-1": 0,
        "signals-hide-edit-1": false,
        "signals-cond-2": "==",
        "signals-val-2": true,
        "signals-icon-2": "/vis/signals/lowbattery.png",
        "signals-icon-size-2": 0,
        "signals-blink-2": false,
        "signals-horz-2": 0,
        "signals-vert-2": 0,
        "signals-hide-edit-2": false,
        "lc-type": "last-change",
        "lc-is-interval": true,
        "lc-is-moment": false,
        "lc-format": "",
        "lc-position-vert": "top",
        "lc-position-horz": "right",
        "lc-offset-vert": 0,
        "lc-offset-horz": 0,
        "lc-font-size": "12px",
        "lc-font-family": "",
        "lc-font-style": "",
        "lc-bkg-color": "",
        "lc-color": "",
        "lc-border-width": "0",
        "lc-border-style": "",
        "lc-border-color": "",
        "lc-border-radius": 10,
        "lc-zindex": 0,
        "title": "",
        "html": "<div style=\"width: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; margin-top: -10px\">\n    \n    <!-- Header Text -->\n    <div style=\"text-align:center; font-size: 20px; font-family: RobotoCondensed-Regular\">Netz</div>\n    \n    <!-- Icon -->\n    <div class='vis-widget materialdesign-widget materialdesign-icon materialdesign-materialdesignicons-html-element'\n    \tstyle='width: 100%; height: 55px; position: relative; display: flex; align-items: center; justify-content: center; margin-top: 4px;'\n    \tmdw-mdwIcon='power-plug'\n    \tmdw-mdwIconSize='50'\n    \tmdw-mdwIconColor='#44739e'\n    ></div>\n        \n    <!-- Value -> Energie today -->\n    <div style=\"display: flex; align-items: center; justify-content: center; flex-direction: row;\">\n        <div class='vis-widget materialdesign-widget materialdesign-value materialdesign-value-html-element'\n            style='width: auto; height: 20px; position: relative; display: flex; align-items: center;'\n            mdw-oid='0_userdata.0.Verbrauchszaehler.Stromzaehler.Bezug.Verbrauch.Tag'\n            mdw-valueLabelUnit='kWh'\n            mdw-maxDecimals='1'        \n            mdw-textAlign='left'\n            mdw-valuesFontColor='#44739e'\n            mdw-valuesFontFamily='RobotoCondensed-Regular'\n            mdw-valuesFontSize='13'\n    \t    mdw-image='arrow-down-bold'\n    \t    mdw-imageColor='#44739e'\n    \t    mdw-iconPosition='left'\n    \t    mdw-iconHeight='16'\n        ></div>\n        <div class='vis-widget materialdesign-widget materialdesign-value materialdesign-value-html-element'\n            style='width: auto; height: 20px; position: relative; display: flex; align-items: center;'\n            mdw-oid='0_userdata.0.Verbrauchszaehler.Stromzaehler.Einspeisung.Verbrauch.Tag'\n            mdw-valueLabelUnit='kWh'\n            mdw-maxDecimals='1'        \n            mdw-textAlign='left'\n            mdw-valuesFontColor='#44739e'\n            mdw-valuesFontFamily='RobotoCondensed-Regular'\n            mdw-valuesFontSize='13'\n    \t    mdw-image='arrow-up-bold'\n    \t    mdw-imageColor='#44739e'\n    \t    mdw-iconPosition='left'\n    \t    mdw-iconHeight='16'\n        ></div>\n    </div>\n</div>",
        "showScrollbar": false,
        "name": "Netz - Card "
      },
      "style": {
        "left": "calc(50% + 5px)",
        "top": "10px",
        "z-index": "1",
        "width": "calc(50% - 15px)",
        "height": "120px"
      },
      "widgetSet": "materialdesign"
    },
    "e00006": {
      "tpl": "tplVis-materialdesign-Progress",
      "data": {
        "oid": "nothing_selected",
        "g_fixed": true,
        "g_visibility": true,
        "g_css_font_text": false,
        "g_css_background": false,
        "g_css_shadow_padding": false,
        "g_css_border": false,
        "g_gestures": false,
        "g_signals": false,
        "g_last_change": false,
        "visibility-cond": "<",
        "visibility-val": "0",
        "visibility-groups-action": "hide",
        "progressRounded": false,
        "colorProgressBackground": "#mdwTheme:vis-materialdesign.0.colors.progress.track_background",
        "colorProgress": "#mdwTheme:vis-materialdesign.0.colors.progress.track",
        "colorOne": "#mdwTheme:vis-materialdesign.0.colors.progress.track_condition1",
        "colorTwo": "#mdwTheme:vis-materialdesign.0.colors.progress.track_condition2",
        "showValueLabel": false,
        "valueLabelStyle": "progressPercent",
        "textColor": "#mdwTheme:vis-materialdesign.0.colors.progress.text",
        "textFontSize": "#mdwTheme:vis-materialdesign.0.fontSizes.progress.text",
        "textFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.progress.text",
        "textAlign": "end",
        "signals-cond-0": "==",
        "signals-val-0": true,
        "signals-icon-0": "/vis/signals/lowbattery.png",
        "signals-icon-size-0": 0,
        "signals-blink-0": false,
        "signals-horz-0": 0,
        "signals-vert-0": 0,
        "signals-hide-edit-0": false,
        "signals-cond-1": "==",
        "signals-val-1": true,
        "signals-icon-1": "/vis/signals/lowbattery.png",
        "signals-icon-size-1": 0,
        "signals-blink-1": false,
        "signals-horz-1": 0,
        "signals-vert-1": 0,
        "signals-hide-edit-1": false,
        "signals-cond-2": "==",
        "signals-val-2": true,
        "signals-icon-2": "/vis/signals/lowbattery.png",
        "signals-icon-size-2": 0,
        "signals-blink-2": false,
        "signals-horz-2": 0,
        "signals-vert-2": 0,
        "signals-hide-edit-2": false,
        "lc-type": "last-change",
        "lc-is-interval": true,
        "lc-is-moment": false,
        "lc-format": "",
        "lc-position-vert": "top",
        "lc-position-horz": "right",
        "lc-offset-vert": 0,
        "lc-offset-horz": 0,
        "lc-font-size": "12px",
        "lc-font-family": "",
        "lc-font-style": "",
        "lc-bkg-color": "",
        "lc-color": "",
        "lc-border-width": "0",
        "lc-border-style": "",
        "lc-border-color": "",
        "lc-border-radius": 10,
        "lc-zindex": 0,
        "progressIndeterminate": true,
        "visibility-oid": "linkeddevices.0.Stromzaehler.Leistung",
        "reverse": true,
        "progressRotate": "yes",
        "name": "Netz - Progress IN "
      },
      "style": {
        "left": "calc(75% - 2px)",
        "top": "130px",
        "width": "4px",
        "height": "50px",
        "z-index": "1"
      },
      "widgetSet": "materialdesign"
    },
    "e00007": {
      "tpl": "tplVis-materialdesign-Progress",
      "data": {
        "oid": "nothing_selected",
        "g_fixed": true,
        "g_visibility": true,
        "g_css_font_text": false,
        "g_css_background": false,
        "g_css_shadow_padding": false,
        "g_css_border": false,
        "g_gestures": false,
        "g_signals": false,
        "g_last_change": false,
        "visibility-cond": ">",
        "visibility-val": "0",
        "visibility-groups-action": "hide",
        "progressRounded": false,
        "colorProgressBackground": "#mdwTheme:vis-materialdesign.0.colors.progress.track_background",
        "colorProgress": "#mdwTheme:vis-materialdesign.0.colors.progress.track",
        "colorOne": "#mdwTheme:vis-materialdesign.0.colors.progress.track_condition1",
        "colorTwo": "#mdwTheme:vis-materialdesign.0.colors.progress.track_condition2",
        "showValueLabel": false,
        "valueLabelStyle": "progressPercent",
        "textColor": "#mdwTheme:vis-materialdesign.0.colors.progress.text",
        "textFontSize": "#mdwTheme:vis-materialdesign.0.fontSizes.progress.text",
        "textFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.progress.text",
        "textAlign": "end",
        "signals-cond-0": "==",
        "signals-val-0": true,
        "signals-icon-0": "/vis/signals/lowbattery.png",
        "signals-icon-size-0": 0,
        "signals-blink-0": false,
        "signals-horz-0": 0,
        "signals-vert-0": 0,
        "signals-hide-edit-0": false,
        "signals-cond-1": "==",
        "signals-val-1": true,
        "signals-icon-1": "/vis/signals/lowbattery.png",
        "signals-icon-size-1": 0,
        "signals-blink-1": false,
        "signals-horz-1": 0,
        "signals-vert-1": 0,
        "signals-hide-edit-1": false,
        "signals-cond-2": "==",
        "signals-val-2": true,
        "signals-icon-2": "/vis/signals/lowbattery.png",
        "signals-icon-size-2": 0,
        "signals-blink-2": false,
        "signals-horz-2": 0,
        "signals-vert-2": 0,
        "signals-hide-edit-2": false,
        "lc-type": "last-change",
        "lc-is-interval": true,
        "lc-is-moment": false,
        "lc-format": "",
        "lc-position-vert": "top",
        "lc-position-horz": "right",
        "lc-offset-vert": 0,
        "lc-offset-horz": 0,
        "lc-font-size": "12px",
        "lc-font-family": "",
        "lc-font-style": "",
        "lc-bkg-color": "",
        "lc-color": "",
        "lc-border-width": "0",
        "lc-border-style": "",
        "lc-border-color": "",
        "lc-border-radius": 10,
        "lc-zindex": 0,
        "progressIndeterminate": true,
        "visibility-oid": "linkeddevices.0.Stromzaehler.Leistung",
        "reverse": false,
        "progressRotate": "yes",
        "name": "Netz - Progress OUT "
      },
      "style": {
        "left": "calc(75% - 2px)",
        "top": "130px",
        "width": "4px",
        "height": "50px",
        "z-index": "1"
      },
      "widgetSet": "materialdesign"
    },
    "e00008": {
      "tpl": "tplVis-materialdesign-value",
      "data": {
        "oid": "linkeddevices.0.Stromzaehler.Leistung",
        "g_fixed": true,
        "g_visibility": true,
        "g_css_font_text": false,
        "g_css_background": false,
        "g_css_shadow_padding": false,
        "g_css_border": false,
        "g_gestures": false,
        "g_signals": false,
        "g_last_change": false,
        "visibility-cond": "!=",
        "visibility-val": "0",
        "visibility-groups-action": "hide",
        "targetType": "auto",
        "textAlign": "start",
        "valuesFontColor": "#mdwTheme:vis-materialdesign.0.colors.value.text",
        "valuesFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.value.text",
        "valuesFontSize": "#mdwTheme:vis-materialdesign.0.fontSizes.value.text",
        "prepandTextColor": "#mdwTheme:vis-materialdesign.0.colors.value.prepand",
        "prepandTextFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.value.prepand",
        "prepandTextFontSize": "#mdwTheme:vis-materialdesign.0.fontSizes.value.prepand",
        "appendTextColor": "#mdwTheme:vis-materialdesign.0.colors.value.append",
        "appendTextFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.value.append",
        "appendTextFontSize": "#mdwTheme:vis-materialdesign.0.fontSizes.value.append",
        "image": "",
        "imageColor": "#mdwTheme:vis-materialdesign.0.colors.value.icon",
        "iconPosition": "left",
        "effectFontColor": "#00e640",
        "effectFontSize": "",
        "effectDuration": "500",
        "signals-cond-0": "==",
        "signals-val-0": true,
        "signals-icon-0": "/vis/signals/lowbattery.png",
        "signals-icon-size-0": 0,
        "signals-blink-0": false,
        "signals-horz-0": 0,
        "signals-vert-0": 0,
        "signals-hide-edit-0": false,
        "signals-cond-1": "==",
        "signals-val-1": true,
        "signals-icon-1": "/vis/signals/lowbattery.png",
        "signals-icon-size-1": 0,
        "signals-blink-1": false,
        "signals-horz-1": 0,
        "signals-vert-1": 0,
        "signals-hide-edit-1": false,
        "signals-cond-2": "==",
        "signals-val-2": true,
        "signals-icon-2": "/vis/signals/lowbattery.png",
        "signals-icon-size-2": 0,
        "signals-blink-2": false,
        "signals-horz-2": 0,
        "signals-vert-2": 0,
        "signals-hide-edit-2": false,
        "lc-type": "last-change",
        "lc-is-interval": true,
        "lc-is-moment": false,
        "lc-format": "",
        "lc-position-vert": "top",
        "lc-position-horz": "right",
        "lc-offset-vert": 0,
        "lc-offset-horz": 0,
        "lc-font-size": "12px",
        "lc-font-family": "",
        "lc-font-style": "",
        "lc-bkg-color": "",
        "lc-color": "",
        "lc-border-width": "0",
        "lc-border-style": "",
        "lc-border-color": "",
        "lc-border-radius": 10,
        "lc-zindex": 0,
        "valueLabelUnit": "W",
        "calculate": "",
        "condition": "",
        "textOnTrue": "",
        "textOnFalse": "",
        "changeEffectEnabled": false,
        "visibility-oid": "linkeddevices.0.Stromzaehler.Leistung",
        "name": "Netz - Leistung "
      },
      "style": {
        "left": "calc(75% + 10px)",
        "top": "140px",
        "width": "100px",
        "height": "29px",
        "z-index": "2"
      },
      "widgetSet": "materialdesign"
    },
    "e00009": {
      "tpl": "tplVis-materialdesign-Card",
      "data": {
        "g_fixed": true,
        "g_visibility": false,
        "g_css_font_text": false,
        "g_css_background": false,
        "g_css_shadow_padding": false,
        "g_css_border": false,
        "g_gestures": false,
        "g_signals": false,
        "g_last_change": false,
        "visibility-cond": "==",
        "visibility-val": 1,
        "visibility-groups-action": "hide",
        "cardLayout": "Basic",
        "cardStyle": "default",
        "showTitle": false,
        "titleLayout": "20",
        "titleFontFamily": "",
        "showSubTitle": false,
        "subtitleLayout": "",
        "subTitleFontFamily": "",
        "showText": "true",
        "textFontSize": "",
        "textFontFamily": "",
        "refresh_oid_delay": "100",
        "refresh_animation_duration": "150",
        "colorBackground": "#mdwTheme:vis-materialdesign.0.colors.card.background",
        "colorTitleSectionBackground": "#mdwTheme:vis-materialdesign.0.colors.card.background_title",
        "colorTextSectionBackground": "#mdwTheme:vis-materialdesign.0.colors.card.background_body",
        "colorTitle": "#mdwTheme:vis-materialdesign.0.colors.card.title",
        "colorSubtitle": "#mdwTheme:vis-materialdesign.0.colors.card.subTitle",
        "colorBody": "#mdwTheme:vis-materialdesign.0.colors.card.text",
        "clickType": "none",
        "controlType": "link",
        "signals-cond-0": "==",
        "signals-val-0": true,
        "signals-icon-0": "/vis/signals/lowbattery.png",
        "signals-icon-size-0": 0,
        "signals-blink-0": false,
        "signals-horz-0": 0,
        "signals-vert-0": 0,
        "signals-hide-edit-0": false,
        "signals-cond-1": "==",
        "signals-val-1": true,
        "signals-icon-1": "/vis/signals/lowbattery.png",
        "signals-icon-size-1": 0,
        "signals-blink-1": false,
        "signals-horz-1": 0,
        "signals-vert-1": 0,
        "signals-hide-edit-1": false,
        "signals-cond-2": "==",
        "signals-val-2": true,
        "signals-icon-2": "/vis/signals/lowbattery.png",
        "signals-icon-size-2": 0,
        "signals-blink-2": false,
        "signals-horz-2": 0,
        "signals-vert-2": 0,
        "signals-hide-edit-2": false,
        "lc-type": "last-change",
        "lc-is-interval": true,
        "lc-is-moment": false,
        "lc-format": "",
        "lc-position-vert": "top",
        "lc-position-horz": "right",
        "lc-offset-vert": 0,
        "lc-offset-horz": 0,
        "lc-font-size": "12px",
        "lc-font-family": "",
        "lc-font-style": "",
        "lc-bkg-color": "",
        "lc-color": "",
        "lc-border-width": "0",
        "lc-border-style": "",
        "lc-border-color": "",
        "lc-border-radius": 10,
        "lc-zindex": 0,
        "title": "",
        "html": "<div style=\"width: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; margin-top: -10px\">\n    \n    <!-- Header Text -->\n    <div style=\"text-align: center\">\n        <div class='vis-widget materialdesign-widget materialdesign-value materialdesign-value-html-element'\n        \tstyle='width: 100%; height: 30px; position: relative; display: flex; align-items:'\n        \tmdw-oid='linkeddevices.0.Energiespeicher.Batterie.Ladungszustand'\n        \tmdw-textAlign='start'\n        \tmdw-valuesFontColor='#44739e'\n        \tmdw-valuesFontFamily='RobotoCondensed-Regular'\n        \tmdw-valuesFontSize='20'\n        \tmdw-prepandText='Batterie |'\n        \tmdw-prepandTextColor='#44739e'\n        \tmdw-prepandTextFontFamily='RobotoCondensed-Regular'\n        \tmdw-prepandTextFontSize='20'\n        \tmdw-valueLabelUnit='%'\n        ></div>\n    </div>\n    \n    <!-- Icon -->\n    <div style=\"width: 100%; display: flex; align-items: center; justify-content: center; flex-direction: row;\">\n        <!-- Icon - Batterie Percent -->\n        <div class='vis-widget materialdesign-widget materialdesign-value materialdesign-value-html-element'\n        \tstyle='width: 55px; height: 55px; position: relative; display: flex; align-items: center; justify-content: center;'\n        \tmdw-oid='linkeddevices.0.Energiespeicher.Batterie.Ladungszustand'\n        \tmdw-overrideText='<span class=\"mdi mdi-#value[0]\" style=\"width: auto; height: auto; font-size: 50px; color: #value[1];\"></span>'\n        \tmdw-calculate='#value < 10 ? \"battery-outline|FireBrick\" : #value < 20 ? \"battery-10|FireBrick\" : #value < 30 ? \"battery-20|FireBrick\" : #value < 40 ? \"battery-30|orange\" : #value < 50 ? \"battery-40|orange\" : #value < 60 ? \"battery-50|orange\" : #value < 70 ? \"battery-60|orange\" : #value < 80 ? \"battery-70|green\" : #value < 90 ? \"battery-80|green\" : #value < 100 ? \"battery-90|green\" : \"battery|green\"'\n        ></div>\n        <!-- Icon - Batterie Loading -->\n        <div class='vis-widget materialdesign-widget materialdesign-value materialdesign-value-html-element'\n        \tstyle='width: 30px; height: 30px; position: absolute; display: flex; align-items: center; margin-left: 40px;'\n        \tmdw-oid='linkeddevices.0.Energiespeicher.Batterie.Leistung'\n        \tmdw-overrideText='<span class=\"mdi mdi-#value materialdesign-icon-image\" style=\"width: auto; height: auto; font-size: 30px; color: gold;\"></span>'\n        \tmdw-calculate='#value > 0 ? \"lightning-bolt\" : \"\"'\n        \tmdw-imageColor='#mdwTheme:vis-materialdesign.0.colors.value.icon'\n        ></div>        \n    </div>\n        \n    <!-- Value -> Energie today -->\n    <div style=\"display: flex; align-items: center; justify-content: center; flex-direction: row;\">\n        <div class='vis-widget materialdesign-widget materialdesign-value materialdesign-value-html-element'\n            style='width: auto; height: 20px; position: relative; display: flex; align-items: center;'\n            mdw-oid='0_userdata.0.Verbrauchszaehler.Batterie.Laden.Verbrauch.Tag'\n            mdw-valueLabelUnit='kWh'\n            mdw-maxDecimals='1'        \n            mdw-textAlign='left'\n            mdw-valuesFontColor='#44739e'\n            mdw-valuesFontFamily='RobotoCondensed-Regular'\n            mdw-valuesFontSize='13'\n    \t    mdw-image='arrow-down-bold'\n    \t    mdw-imageColor='#44739e'\n    \t    mdw-iconPosition='left'\n    \t    mdw-iconHeight='16'\n        ></div>\n        <div class='vis-widget materialdesign-widget materialdesign-value materialdesign-value-html-element'\n            style='width: auto; height: 20px; position: relative; display: flex; align-items: center;'\n            mdw-oid='0_userdata.0.Verbrauchszaehler.Batterie.Entladen.Verbrauch.Tag'\n            mdw-valueLabelUnit='kWh'\n            mdw-maxDecimals='1'        \n            mdw-textAlign='left'\n            mdw-valuesFontColor='#44739e'\n            mdw-valuesFontFamily='RobotoCondensed-Regular'\n            mdw-valuesFontSize='13'\n    \t    mdw-image='arrow-up-bold'\n    \t    mdw-imageColor='#44739e'\n    \t    mdw-iconPosition='left'\n    \t    mdw-iconHeight='16'\n        ></div>\n    </div>\n</div>",
        "showScrollbar": false,
        "name": "Batterie - Card "
      },
      "style": {
        "left": "10px",
        "top": "430px",
        "z-index": "1",
        "width": "calc(50% - 15px)",
        "height": "120px"
      },
      "widgetSet": "materialdesign"
    },
    "e00010": {
      "tpl": "tplVis-materialdesign-Progress",
      "data": {
        "oid": "nothing_selected",
        "g_fixed": true,
        "g_visibility": true,
        "g_css_font_text": false,
        "g_css_background": false,
        "g_css_shadow_padding": false,
        "g_css_border": false,
        "g_gestures": false,
        "g_signals": false,
        "g_last_change": false,
        "visibility-cond": "<",
        "visibility-val": "0",
        "visibility-groups-action": "hide",
        "progressRounded": false,
        "colorProgressBackground": "#mdwTheme:vis-materialdesign.0.colors.progress.track_background",
        "colorProgress": "#mdwTheme:vis-materialdesign.0.colors.progress.track",
        "colorOne": "#mdwTheme:vis-materialdesign.0.colors.progress.track_condition1",
        "colorTwo": "#mdwTheme:vis-materialdesign.0.colors.progress.track_condition2",
        "showValueLabel": false,
        "valueLabelStyle": "progressPercent",
        "textColor": "#mdwTheme:vis-materialdesign.0.colors.progress.text",
        "textFontSize": "#mdwTheme:vis-materialdesign.0.fontSizes.progress.text",
        "textFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.progress.text",
        "textAlign": "end",
        "signals-cond-0": "==",
        "signals-val-0": true,
        "signals-icon-0": "/vis/signals/lowbattery.png",
        "signals-icon-size-0": 0,
        "signals-blink-0": false,
        "signals-horz-0": 0,
        "signals-vert-0": 0,
        "signals-hide-edit-0": false,
        "signals-cond-1": "==",
        "signals-val-1": true,
        "signals-icon-1": "/vis/signals/lowbattery.png",
        "signals-icon-size-1": 0,
        "signals-blink-1": false,
        "signals-horz-1": 0,
        "signals-vert-1": 0,
        "signals-hide-edit-1": false,
        "signals-cond-2": "==",
        "signals-val-2": true,
        "signals-icon-2": "/vis/signals/lowbattery.png",
        "signals-icon-size-2": 0,
        "signals-blink-2": false,
        "signals-horz-2": 0,
        "signals-vert-2": 0,
        "signals-hide-edit-2": false,
        "lc-type": "last-change",
        "lc-is-interval": true,
        "lc-is-moment": false,
        "lc-format": "",
        "lc-position-vert": "top",
        "lc-position-horz": "right",
        "lc-offset-vert": 0,
        "lc-offset-horz": 0,
        "lc-font-size": "12px",
        "lc-font-family": "",
        "lc-font-style": "",
        "lc-bkg-color": "",
        "lc-color": "",
        "lc-border-width": "0",
        "lc-border-style": "",
        "lc-border-color": "",
        "lc-border-radius": 10,
        "lc-zindex": 0,
        "progressIndeterminate": true,
        "visibility-oid": "linkeddevices.0.Energiespeicher.Batterie.Leistung",
        "reverse": true,
        "progressRotate": "yes",
        "name": "Batterie - Progress OUT "
      },
      "style": {
        "left": "calc(25% - 2px)",
        "top": "380px",
        "width": "4px",
        "height": "50px",
        "z-index": "1"
      },
      "widgetSet": "materialdesign"
    },
    "e00011": {
      "tpl": "tplVis-materialdesign-Progress",
      "data": {
        "oid": "nothing_selected",
        "g_fixed": true,
        "g_visibility": true,
        "g_css_font_text": false,
        "g_css_background": false,
        "g_css_shadow_padding": false,
        "g_css_border": false,
        "g_gestures": false,
        "g_signals": false,
        "g_last_change": false,
        "visibility-cond": ">",
        "visibility-val": "0",
        "visibility-groups-action": "hide",
        "progressRounded": false,
        "colorProgressBackground": "#mdwTheme:vis-materialdesign.0.colors.progress.track_background",
        "colorProgress": "#mdwTheme:vis-materialdesign.0.colors.progress.track",
        "colorOne": "#mdwTheme:vis-materialdesign.0.colors.progress.track_condition1",
        "colorTwo": "#mdwTheme:vis-materialdesign.0.colors.progress.track_condition2",
        "showValueLabel": false,
        "valueLabelStyle": "progressPercent",
        "textColor": "#mdwTheme:vis-materialdesign.0.colors.progress.text",
        "textFontSize": "#mdwTheme:vis-materialdesign.0.fontSizes.progress.text",
        "textFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.progress.text",
        "textAlign": "end",
        "signals-cond-0": "==",
        "signals-val-0": true,
        "signals-icon-0": "/vis/signals/lowbattery.png",
        "signals-icon-size-0": 0,
        "signals-blink-0": false,
        "signals-horz-0": 0,
        "signals-vert-0": 0,
        "signals-hide-edit-0": false,
        "signals-cond-1": "==",
        "signals-val-1": true,
        "signals-icon-1": "/vis/signals/lowbattery.png",
        "signals-icon-size-1": 0,
        "signals-blink-1": false,
        "signals-horz-1": 0,
        "signals-vert-1": 0,
        "signals-hide-edit-1": false,
        "signals-cond-2": "==",
        "signals-val-2": true,
        "signals-icon-2": "/vis/signals/lowbattery.png",
        "signals-icon-size-2": 0,
        "signals-blink-2": false,
        "signals-horz-2": 0,
        "signals-vert-2": 0,
        "signals-hide-edit-2": false,
        "lc-type": "last-change",
        "lc-is-interval": true,
        "lc-is-moment": false,
        "lc-format": "",
        "lc-position-vert": "top",
        "lc-position-horz": "right",
        "lc-offset-vert": 0,
        "lc-offset-horz": 0,
        "lc-font-size": "12px",
        "lc-font-family": "",
        "lc-font-style": "",
        "lc-bkg-color": "",
        "lc-color": "",
        "lc-border-width": "0",
        "lc-border-style": "",
        "lc-border-color": "",
        "lc-border-radius": 10,
        "lc-zindex": 0,
        "progressIndeterminate": true,
        "visibility-oid": "linkeddevices.0.Energiespeicher.Batterie.Leistung",
        "reverse": false,
        "progressRotate": "yes",
        "name": "Batterie - Progress IN "
      },
      "style": {
        "left": "calc(25% - 2px)",
        "top": "380px",
        "width": "4px",
        "height": "50px",
        "z-index": "1"
      },
      "widgetSet": "materialdesign"
    },
    "e00012": {
      "tpl": "tplVis-materialdesign-value",
      "data": {
        "oid": "linkeddevices.0.Energiespeicher.Batterie.Leistung",
        "g_fixed": true,
        "g_visibility": true,
        "g_css_font_text": false,
        "g_css_background": false,
        "g_css_shadow_padding": false,
        "g_css_border": false,
        "g_gestures": false,
        "g_signals": false,
        "g_last_change": false,
        "visibility-cond": "!=",
        "visibility-val": "0",
        "visibility-groups-action": "hide",
        "targetType": "auto",
        "textAlign": "start",
        "valuesFontColor": "#mdwTheme:vis-materialdesign.0.colors.value.text",
        "valuesFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.value.text",
        "valuesFontSize": "#mdwTheme:vis-materialdesign.0.fontSizes.value.text",
        "prepandTextColor": "#mdwTheme:vis-materialdesign.0.colors.value.prepand",
        "prepandTextFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.value.prepand",
        "prepandTextFontSize": "#mdwTheme:vis-materialdesign.0.fontSizes.value.prepand",
        "appendTextColor": "#mdwTheme:vis-materialdesign.0.colors.value.append",
        "appendTextFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.value.append",
        "appendTextFontSize": "#mdwTheme:vis-materialdesign.0.fontSizes.value.append",
        "image": "",
        "imageColor": "#mdwTheme:vis-materialdesign.0.colors.value.icon",
        "iconPosition": "left",
        "effectFontColor": "#00e640",
        "effectFontSize": "",
        "effectDuration": "500",
        "signals-cond-0": "==",
        "signals-val-0": true,
        "signals-icon-0": "/vis/signals/lowbattery.png",
        "signals-icon-size-0": 0,
        "signals-blink-0": false,
        "signals-horz-0": 0,
        "signals-vert-0": 0,
        "signals-hide-edit-0": false,
        "signals-cond-1": "==",
        "signals-val-1": true,
        "signals-icon-1": "/vis/signals/lowbattery.png",
        "signals-icon-size-1": 0,
        "signals-blink-1": false,
        "signals-horz-1": 0,
        "signals-vert-1": 0,
        "signals-hide-edit-1": false,
        "signals-cond-2": "==",
        "signals-val-2": true,
        "signals-icon-2": "/vis/signals/lowbattery.png",
        "signals-icon-size-2": 0,
        "signals-blink-2": false,
        "signals-horz-2": 0,
        "signals-vert-2": 0,
        "signals-hide-edit-2": false,
        "lc-type": "last-change",
        "lc-is-interval": true,
        "lc-is-moment": false,
        "lc-format": "",
        "lc-position-vert": "top",
        "lc-position-horz": "right",
        "lc-offset-vert": 0,
        "lc-offset-horz": 0,
        "lc-font-size": "12px",
        "lc-font-family": "",
        "lc-font-style": "",
        "lc-bkg-color": "",
        "lc-color": "",
        "lc-border-width": "0",
        "lc-border-style": "",
        "lc-border-color": "",
        "lc-border-radius": 10,
        "lc-zindex": 0,
        "valueLabelUnit": "W",
        "calculate": "",
        "condition": "",
        "textOnTrue": "",
        "textOnFalse": "",
        "changeEffectEnabled": false,
        "visibility-oid": "linkeddevices.0.Energiespeicher.Batterie.Leistung",
        "name": "Batterie - Leistung "
      },
      "style": {
        "left": "calc(25% + 10px)",
        "top": "390px",
        "width": "100px",
        "height": "29px",
        "z-index": "2"
      },
      "widgetSet": "materialdesign"
    },
    "e00013": {
      "tpl": "tplVis-materialdesign-Card",
      "data": {
        "g_fixed": true,
        "g_visibility": false,
        "g_css_font_text": false,
        "g_css_background": false,
        "g_css_shadow_padding": false,
        "g_css_border": false,
        "g_gestures": false,
        "g_signals": false,
        "g_last_change": false,
        "visibility-cond": "==",
        "visibility-val": 1,
        "visibility-groups-action": "hide",
        "cardLayout": "Basic",
        "cardStyle": "default",
        "showTitle": false,
        "titleLayout": "20",
        "titleFontFamily": "",
        "showSubTitle": false,
        "subtitleLayout": "",
        "subTitleFontFamily": "",
        "showText": "true",
        "textFontSize": "",
        "textFontFamily": "",
        "refresh_oid_delay": "100",
        "refresh_animation_duration": "150",
        "colorBackground": "#mdwTheme:vis-materialdesign.0.colors.card.background",
        "colorTitleSectionBackground": "#mdwTheme:vis-materialdesign.0.colors.card.background_title",
        "colorTextSectionBackground": "#mdwTheme:vis-materialdesign.0.colors.card.background_body",
        "colorTitle": "#mdwTheme:vis-materialdesign.0.colors.card.title",
        "colorSubtitle": "#mdwTheme:vis-materialdesign.0.colors.card.subTitle",
        "colorBody": "#mdwTheme:vis-materialdesign.0.colors.card.text",
        "clickType": "none",
        "controlType": "link",
        "signals-cond-0": "==",
        "signals-val-0": true,
        "signals-icon-0": "/vis/signals/lowbattery.png",
        "signals-icon-size-0": 0,
        "signals-blink-0": false,
        "signals-horz-0": 0,
        "signals-vert-0": 0,
        "signals-hide-edit-0": false,
        "signals-cond-1": "==",
        "signals-val-1": true,
        "signals-icon-1": "/vis/signals/lowbattery.png",
        "signals-icon-size-1": 0,
        "signals-blink-1": false,
        "signals-horz-1": 0,
        "signals-vert-1": 0,
        "signals-hide-edit-1": false,
        "signals-cond-2": "==",
        "signals-val-2": true,
        "signals-icon-2": "/vis/signals/lowbattery.png",
        "signals-icon-size-2": 0,
        "signals-blink-2": false,
        "signals-horz-2": 0,
        "signals-vert-2": 0,
        "signals-hide-edit-2": false,
        "lc-type": "last-change",
        "lc-is-interval": true,
        "lc-is-moment": false,
        "lc-format": "",
        "lc-position-vert": "top",
        "lc-position-horz": "right",
        "lc-offset-vert": 0,
        "lc-offset-horz": 0,
        "lc-font-size": "12px",
        "lc-font-family": "",
        "lc-font-style": "",
        "lc-bkg-color": "",
        "lc-color": "",
        "lc-border-width": "0",
        "lc-border-style": "",
        "lc-border-color": "",
        "lc-border-radius": 10,
        "lc-zindex": 0,
        "title": "",
        "html": "<div style=\"width: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; margin-top: -10px\">\n    \n    <!-- Header Text -->\n    <div style=\"text-align:center; font-size: 20px; font-family: RobotoCondensed-Regular\">Haus</div>\n    \n    <!-- Icon -->\n    <div class='vis-widget materialdesign-widget materialdesign-icon materialdesign-materialdesignicons-html-element'\n    \tstyle='width: 100%; height: 55px; position: relative; display: flex; align-items: center; justify-content: center; margin-top: 4px;'\n    \tmdw-mdwIcon='home'\n    \tmdw-mdwIconSize='50'\n    \tmdw-mdwIconColor='#44739e'\n    ></div>\n        \n    <!-- Value -> Energie today -->\n    <div class='vis-widget materialdesign-widget materialdesign-value materialdesign-value-html-element'\n        style='width: auto; height: 20px; position: relative; display: flex; align-items: center;'\n        mdw-oid='0_userdata.0.Verbrauchszaehler.Haus.Verbrauch.Tag'\n        mdw-valueLabelUnit='kWh'\n        mdw-maxDecimals='1'        \n        mdw-textAlign='left'\n        mdw-valuesFontColor='#44739e'\n        mdw-valuesFontFamily='RobotoCondensed-Regular'\n        mdw-valuesFontSize='13'\n\t    mdw-image='arrow-down-bold'\n\t    mdw-imageColor='#44739e'\n\t    mdw-iconPosition='left'\n\t    mdw-iconHeight='16'\n    ></div>    \n</div>",
        "showScrollbar": false,
        "name": "Haus - Card "
      },
      "style": {
        "left": "calc(50% + 5px)",
        "top": "430px",
        "z-index": "1",
        "width": "calc(50% - 15px)",
        "height": "120px"
      },
      "widgetSet": "materialdesign"
    },
    "e00014": {
      "tpl": "tplVis-materialdesign-Progress",
      "data": {
        "oid": "nothing_selected",
        "g_fixed": true,
        "g_visibility": true,
        "g_css_font_text": false,
        "g_css_background": false,
        "g_css_shadow_padding": false,
        "g_css_border": false,
        "g_gestures": false,
        "g_signals": false,
        "g_last_change": false,
        "visibility-cond": "!=",
        "visibility-val": "0",
        "visibility-groups-action": "hide",
        "progressRounded": false,
        "colorProgressBackground": "#mdwTheme:vis-materialdesign.0.colors.progress.track_background",
        "colorProgress": "#mdwTheme:vis-materialdesign.0.colors.progress.track",
        "colorOne": "#mdwTheme:vis-materialdesign.0.colors.progress.track_condition1",
        "colorTwo": "#mdwTheme:vis-materialdesign.0.colors.progress.track_condition2",
        "showValueLabel": false,
        "valueLabelStyle": "progressPercent",
        "textColor": "#mdwTheme:vis-materialdesign.0.colors.progress.text",
        "textFontSize": "#mdwTheme:vis-materialdesign.0.fontSizes.progress.text",
        "textFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.progress.text",
        "textAlign": "end",
        "signals-cond-0": "==",
        "signals-val-0": true,
        "signals-icon-0": "/vis/signals/lowbattery.png",
        "signals-icon-size-0": 0,
        "signals-blink-0": false,
        "signals-horz-0": 0,
        "signals-vert-0": 0,
        "signals-hide-edit-0": false,
        "signals-cond-1": "==",
        "signals-val-1": true,
        "signals-icon-1": "/vis/signals/lowbattery.png",
        "signals-icon-size-1": 0,
        "signals-blink-1": false,
        "signals-horz-1": 0,
        "signals-vert-1": 0,
        "signals-hide-edit-1": false,
        "signals-cond-2": "==",
        "signals-val-2": true,
        "signals-icon-2": "/vis/signals/lowbattery.png",
        "signals-icon-size-2": 0,
        "signals-blink-2": false,
        "signals-horz-2": 0,
        "signals-vert-2": 0,
        "signals-hide-edit-2": false,
        "lc-type": "last-change",
        "lc-is-interval": true,
        "lc-is-moment": false,
        "lc-format": "",
        "lc-position-vert": "top",
        "lc-position-horz": "right",
        "lc-offset-vert": 0,
        "lc-offset-horz": 0,
        "lc-font-size": "12px",
        "lc-font-family": "",
        "lc-font-style": "",
        "lc-bkg-color": "",
        "lc-color": "",
        "lc-border-width": "0",
        "lc-border-style": "",
        "lc-border-color": "",
        "lc-border-radius": 10,
        "lc-zindex": 0,
        "progressIndeterminate": true,
        "visibility-oid": "linkeddevices.0.Energiespeicher.Haus.Leistung",
        "reverse": false,
        "progressRotate": "yes",
        "name": "Haus - Progress IN "
      },
      "style": {
        "left": "calc(75% - 2px)",
        "top": "380px",
        "width": "4px",
        "height": "50px",
        "z-index": "1"
      },
      "widgetSet": "materialdesign"
    },
    "e00015": {
      "tpl": "tplVis-materialdesign-value",
      "data": {
        "oid": "linkeddevices.0.Energiespeicher.Haus.Leistung",
        "g_fixed": true,
        "g_visibility": true,
        "g_css_font_text": false,
        "g_css_background": false,
        "g_css_shadow_padding": false,
        "g_css_border": false,
        "g_gestures": false,
        "g_signals": false,
        "g_last_change": false,
        "visibility-cond": "!=",
        "visibility-val": "0",
        "visibility-groups-action": "hide",
        "targetType": "auto",
        "textAlign": "start",
        "valuesFontColor": "#mdwTheme:vis-materialdesign.0.colors.value.text",
        "valuesFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.value.text",
        "valuesFontSize": "#mdwTheme:vis-materialdesign.0.fontSizes.value.text",
        "prepandTextColor": "#mdwTheme:vis-materialdesign.0.colors.value.prepand",
        "prepandTextFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.value.prepand",
        "prepandTextFontSize": "#mdwTheme:vis-materialdesign.0.fontSizes.value.prepand",
        "appendTextColor": "#mdwTheme:vis-materialdesign.0.colors.value.append",
        "appendTextFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.value.append",
        "appendTextFontSize": "#mdwTheme:vis-materialdesign.0.fontSizes.value.append",
        "image": "",
        "imageColor": "#mdwTheme:vis-materialdesign.0.colors.value.icon",
        "iconPosition": "left",
        "effectFontColor": "#00e640",
        "effectFontSize": "",
        "effectDuration": "500",
        "signals-cond-0": "==",
        "signals-val-0": true,
        "signals-icon-0": "/vis/signals/lowbattery.png",
        "signals-icon-size-0": 0,
        "signals-blink-0": false,
        "signals-horz-0": 0,
        "signals-vert-0": 0,
        "signals-hide-edit-0": false,
        "signals-cond-1": "==",
        "signals-val-1": true,
        "signals-icon-1": "/vis/signals/lowbattery.png",
        "signals-icon-size-1": 0,
        "signals-blink-1": false,
        "signals-horz-1": 0,
        "signals-vert-1": 0,
        "signals-hide-edit-1": false,
        "signals-cond-2": "==",
        "signals-val-2": true,
        "signals-icon-2": "/vis/signals/lowbattery.png",
        "signals-icon-size-2": 0,
        "signals-blink-2": false,
        "signals-horz-2": 0,
        "signals-vert-2": 0,
        "signals-hide-edit-2": false,
        "lc-type": "last-change",
        "lc-is-interval": true,
        "lc-is-moment": false,
        "lc-format": "",
        "lc-position-vert": "top",
        "lc-position-horz": "right",
        "lc-offset-vert": 0,
        "lc-offset-horz": 0,
        "lc-font-size": "12px",
        "lc-font-family": "",
        "lc-font-style": "",
        "lc-bkg-color": "",
        "lc-color": "",
        "lc-border-width": "0",
        "lc-border-style": "",
        "lc-border-color": "",
        "lc-border-radius": 10,
        "lc-zindex": 0,
        "valueLabelUnit": "W",
        "calculate": "",
        "condition": "",
        "textOnTrue": "",
        "textOnFalse": "",
        "changeEffectEnabled": false,
        "visibility-oid": "linkeddevices.0.Energiespeicher.Haus.Leistung",
        "name": "Haus - Leistung "
      },
      "style": {
        "left": "calc(75% + 10px)",
        "top": "390px",
        "width": "100px",
        "height": "29px",
        "z-index": "2"
      },
      "widgetSet": "materialdesign"
    },
    "e00016": {
      "tpl": "tplVis-materialdesign-Card",
      "data": {
        "g_fixed": true,
        "g_visibility": false,
        "g_css_font_text": false,
        "g_css_background": false,
        "g_css_shadow_padding": false,
        "g_css_border": false,
        "g_gestures": false,
        "g_signals": false,
        "g_last_change": false,
        "visibility-cond": "==",
        "visibility-val": 1,
        "visibility-groups-action": "hide",
        "cardLayout": "Basic",
        "cardStyle": "default",
        "showTitle": "true",
        "titleLayout": "#mdwTheme:vis-materialdesign.0.fontSizes.card.title",
        "titleFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.card.title",
        "showSubTitle": "true",
        "subtitleLayout": "#mdwTheme:vis-materialdesign.0.fontSizes.card.subTitle",
        "subTitleFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.card.subTitle",
        "showText": "true",
        "textFontSize": "#mdwTheme:vis-materialdesign.0.fontSizes.card.text",
        "textFontFamily": "#mdwTheme:vis-materialdesign.0.fonts.card.text",
        "refresh_oid_delay": "100",
        "refresh_animation_duration": "150",
        "colorBackground": "#mdwTheme:vis-materialdesign.0.colors.card.background",
        "colorTitleSectionBackground": "#mdwTheme:vis-materialdesign.0.colors.card.background_title",
        "colorTextSectionBackground": "#mdwTheme:vis-materialdesign.0.colors.card.background_body",
        "colorTitle": "#mdwTheme:vis-materialdesign.0.colors.card.title",
        "colorSubtitle": "#mdwTheme:vis-materialdesign.0.colors.card.subTitle",
        "colorBody": "#mdwTheme:vis-materialdesign.0.colors.card.text",
        "clickType": "none",
        "controlType": "link",
        "signals-cond-0": "==",
        "signals-val-0": true,
        "signals-icon-0": "/vis/signals/lowbattery.png",
        "signals-icon-size-0": 0,
        "signals-blink-0": false,
        "signals-horz-0": 0,
        "signals-vert-0": 0,
        "signals-hide-edit-0": false,
        "signals-cond-1": "==",
        "signals-val-1": true,
        "signals-icon-1": "/vis/signals/lowbattery.png",
        "signals-icon-size-1": 0,
        "signals-blink-1": false,
        "signals-horz-1": 0,
        "signals-vert-1": 0,
        "signals-hide-edit-1": false,
        "signals-cond-2": "==",
        "signals-val-2": true,
        "signals-icon-2": "/vis/signals/lowbattery.png",
        "signals-icon-size-2": 0,
        "signals-blink-2": false,
        "signals-horz-2": 0,
        "signals-vert-2": 0,
        "signals-hide-edit-2": false,
        "lc-type": "last-change",
        "lc-is-interval": true,
        "lc-is-moment": false,
        "lc-format": "",
        "lc-position-vert": "top",
        "lc-position-horz": "right",
        "lc-offset-vert": 0,
        "lc-offset-horz": 0,
        "lc-font-size": "12px",
        "lc-font-family": "",
        "lc-font-style": "",
        "lc-bkg-color": "",
        "lc-color": "",
        "lc-border-width": "0",
        "lc-border-style": "",
        "lc-border-color": "",
        "lc-border-radius": 10,
        "lc-zindex": 0,
        "class": "my-card-container-relative",
        "showScrollbar": true
      },
      "style": {
        "left": "",
        "top": "",
        "height": "600px",
        "z-index": "0"
      },
      "widgetSet": "materialdesign"
    }
  },
  "name": "Energie_2",
  "filterList": []
}
```

</details>

# Информация
## Используемые библиотеки
Адаптер использует следующие библиотеки:

* [Материальные компоненты Google для Интернета] (https://github.com/material-components/material-components-web)
* [Vuetify] (https://github.com/vuetifyjs/vuetify)
* [chartjs] (https://www.chartjs.org/)
* [круглый слайдер от thomasloven] (https://github.com/thomasloven/round-slider)
* [Значки дизайна материалов] (https://materialdesignicons.com/)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):	   
	### __WORK IN PROGRESS__
-->

<!-- omit in toc -->
### __WORK IN PROGRESS__
* (Scrounger) Button Toggle Widgets: bug fix for state on runtime load
* (Scrounger) Value Widget: bug fix for show unit only if result is of type number
* (Scrounger) Value Widget: bug fix for data ovveride
* (Scrounger) IconList Widget: option to set minimal width for single item added
* (Scrounger) IconList Widget: header added
* (Scrounger) IconList Widget: color options added
* (Scrounger) IconList Widget: added option for color and text of status bar if state is active
* (Scrounger) List Widget: main header added
* (Scrounger) List Widget: events bug fix
* (darkiop) documentation updated ([#PR179](https://github.com/Scrounger/ioBroker.vis-materialdesign/pull/179))
* (Scrounger) Top App Bar Widget: fixed bugs found by sentry
* (Scrounger) Top App Bar Widget: icon color bug fix if using json string
* (Scrounger) Top App Bar Widget: selected item icon color option added
* (Scrounger) Round Slider Widget: control bug fix
* (Scrounger) Grid Views Widget: Bug fix for nested grid views widgets
* (Scrounger) Masonry Views Widget: Bug fix for nested masonry views widgets
* (Scrounger) Progress Widget: striped distance option added
* (Scrounger) Advanced View in Widget widget added
* (Scrounger) Dialog Widget: background color bug fix on close animation
* (Scrounger) Dialog Widget: option added to show a save button and write a value to a datapoint
* (Scrounger) HTML Widget: bug fix for wrong type ([#182](https://github.com/Scrounger/ioBroker.vis-materialdesign/issues/182))
* (Scrounger) support for base64 images added
* (Scrounger) bug fix for VIS Editor dev values

<!-- omit in toc -->
### 0.5.9 (2021-06-13)
* (Scrounger) Top App Bar Widget: option added to define navigation items per JSON String [Details see documentation!](https://github.com/Scrounger/ioBroker.vis-materialdesign#top-app-bar)
* (Scrounger) Top App Bar Widget: option added to define an id per item
* (Scrounger) fixed bugs found by sentry

<!-- omit in toc -->
### 0.5.8 (2021-06-09)
* (Scrounger) Top App Bar Widget: new layout 'auto' added - change between modal and permanent layout depending on screen resolution. [Details see documentation!](#layout-auto)
* (Scrounger) Top App Bar Widget: option added to set value on click at item that toggle submenu
* (Scrounger) IconList Widget: option added to set used space per row for every items
* (Scrounger) IconList Widget: option added to set visibility condition for every items ([#118](https://github.com/Scrounger/ioBroker.vis-materialdesign/issues/118))
* (Scrounger) IconList Widget: bug fix for applying active color ([#176](https://github.com/Scrounger/ioBroker.vis-materialdesign/issues/176))
* (Scrounger) Grid Widget: bug fix for visibility condition
* (Scrounger) Masonry Widget: bug fix for visibility condition

<!-- omit in toc -->
### 0.5.7 (2021-05-26)
* (Scrounger) Top App Bar Widget: color option for menu icon added ([#171](https://github.com/Scrounger/ioBroker.vis-materialdesign/issues/171))
* (Scrounger) Top App Bar Widget: Permission group - option to deactivate default value added ([#173](https://github.com/Scrounger/ioBroker.vis-materialdesign/issues/173))
* (Scrounger) iconList Widget: bug fix for active state at diffrent types ([#168](https://github.com/Scrounger/ioBroker.vis-materialdesign/issues/168))
* (Scrounger) iconList Widget: layout bug fix for radius of buttons ([#174](https://github.com/Scrounger/ioBroker.vis-materialdesign/issues/174))
* (Scrounger) list Widget: bug fix for theme properties
* (Scrounger) select Widget: bug fix for long text ([#169](https://github.com/Scrounger/ioBroker.vis-materialdesign/issues/169))
* (Scrounger) fixed bugs found by sentry

<!-- omit in toc -->
### 0.5.6 (2021-05-07)
* (Scrounger) Html Widgets: escaping bug fix
* (Scrounger) iconList: layout bug fix

<!-- omit in toc -->
### 0.5.5 (2021-04-21)
* (Scrounger) adapter settings bug fixes
* (Scrounger) icon buttons: color bug fixes
* (Scrounger) Fixing bugs found by sentry

<!-- omit in toc -->

## License
MIT License

Copyright (c) 2021 Scrounger <scrounger@gmx.net>

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