---
title: Включенные виджеты
lastChanged: 09.09.2026
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/viz/basic.md
hash: LNhe5OHX7H8kIjzEHgPCxCZj1kpZC9Edl9STxLUSwnY=
---
# Включенные виджеты

vis и vis-2 поставляются с пятью наборами виджетов. Они сразу же становятся доступны в палитре после установки и не требуют дополнительных адаптеров.

| Предложение | Содержание                                                                |
| ----------- | ------------------------------------------------------------------------- |
| `basic`     | Текст, число, изображение, рамка, навигация: основные строительные блоки. |
| `jqui`      | Кнопки, поля ввода, списки выбора, ползунки, диалоговые окна              |
| `jqplot`    | указательный инструмент                                                   |
| `swipe`     | Переключение страниц осуществляется с помощью жестов пальцем и карусели.  |
| `tabs`      | Всадники в поле зрения                                                    |

Это позволяет создать полноценный пользовательский интерфейс. [Наборы виджетов](/docs/viz/widgetsets.md) из каталога адаптера добавляются только тогда, когда вам требуется что-то более привлекательное с визуальной точки зрения или специализированное.

Названия строительных блоков не переведены и отображаются на английском языке в палитре, даже в немецком интерфейсе. Поэтому на этой странице они указаны так, как отображаются там.

## базовый

Фраза, обозначающая любой элемент, указывающий на значение или скрепляющий страницу.

### Числа, текст и время

|                                                                                  | Виджет                                       | Шоу                                                                                                               |
| -------------------------------------------------------------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| ![Число](../../de/viz/media/widget_images/basic/Prev_ValueFloat.png)                          | `Number`                                     | Числовое значение с указанием единицы измерения и возможностью выбора количества десятичных знаков после запятой. |
| ![Нить](../../de/viz/media/widget_images/basic/Prev_ValueString.png)                          | `String`                                     | строка                                                                                                            |
| ![Строка без экранирования](../../de/viz/media/widget_images/basic/Prev_ValueStringRaw.png)   | `String (unescaped)`                         | То же самое, при этом отображается и включенный HTML-код.                                                         |
| ![String img src](../../de/viz/media/widget_images/basic/Prev_ValueStringImg.png)             | `String img src`                             | изображение, адрес которого содержится в точке данных.                                                            |
| ![Входное значение](../../de/viz/media/widget_images/basic/Prev_ValueInput.png)               | `Input val`                                  | Поле ввода, которое также записывает значение.                                                                    |
| ![Отметка времени](../../de/viz/media/widget_images/basic/Prev_ValueTimestamp.png)            | `Timestamp` ,`Timestamp Value` ,`TimesValue` | метка времени в различных форматах                                                                                |
| ![Последнее изменение](../../de/viz/media/widget_images/basic/Prev_ValueLastchange.png)       | `Last change Timestamp`                      | когда значение в последний раз менялось                                                                           |
| ![Список ценностей](../../de/viz/media/widget_images/basic/Prev_ValueList.png)                | `ValueList Text`                             | один из нескольких текстов, в зависимости от значения                                                             |
| ![ValueList HTML](../../de/viz/media/widget_images/basic/Prev_ValueListHtml.png)              | `ValueList HTML`                             | То же самое, но с HTML вместо обычного текста.                                                                    |
| ![Стиль HTML списка значений](../../de/viz/media/widget_images/basic/Prev_ValueListHtml8.png) | `ValueList HTML Style`                       | То же самое относится и к отдельным спецификациям CSS для каждого значения.                                       |

### Да и нет

|                                                                                         | Виджет                     | Шоу                                                                                                      |
| --------------------------------------------------------------------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------- |
| ![Логический HTML](../../de/viz/media/widget_images/basic/Prev_ValueBool.png)                        | `Bool HTML`                | два разных текста для слов «верно» и «неверно».                                                          |
| ![Логический HTML-элемент управления](../../de/viz/media/widget_images/basic/Prev_ValueBoolCtrl.png) | `Bool HTML` (переключение) | То же самое, переключение происходит при нажатии на область.                                             |
| ![Неверный флажок](../../de/viz/media/widget_images/basic/Prev_ValueBoolCheckbox.png)                | `Bool Checkbox`            | флажок, который также переключает                                                                        |
| ![Выбор логического значения](../../de/viz/media/widget_images/basic/Prev_ValueBoolSelect.png)       | `Bool Select`              | выпадающее меню с двумя пунктами                                                                         |
| ![Bool SVG](../../de/viz/media/widget_images/basic/Prev_ValueBoolCtrlSvg.png)                        | `Bool SVG`                 | Рисунок, значение которого устанавливается при щелчке.                                                   |
| ![AckFlag](../../de/viz/media/widget_images/basic/Prev_AckBool.png)                                  | `AckFlag HTML`             | Подтверждено ли последнее значение; инструмент для устранения неполадок.                                 |
| ![HTML-состояние](../../de/viz/media/widget_images/basic/Prev_BasicState.png)                        | `HTML State`               | текст, находящийся в точке 0 или`false` Оно полностью исчезает; хорошо подходит для служебных сообщений. |

### Изображения, рамки и внешний контент

|                                                                    | Виджет      | Шоу                                                             |
| ------------------------------------------------------------------ | ----------- | --------------------------------------------------------------- |
| ![HTML](../../de/viz/media/widget_images/basic/Prev_HTML.png)                   | `HTML`      | любой HTML-код                                                  |
|                                                                    | `Svg shape` | Простая геометрическая фигура: круг, прямоугольник, линия       |
| ![изображение](../../de/viz/media/widget_images/basic/Prev_Image.png)           | `Image`     | изображение, которое при желании можно регулярно перезагружать. |
| ![Изображение 8](../../de/viz/media/widget_images/basic/Prev_StatefulImage.png) | `Image 8`   | одно из восьми изображений, в зависимости от значения           |
| ![iFrame](../../de/viz/media/widget_images/basic/Prev_iFrame.png)               | `iFrame`    | иностранный веб-сайт в окне                                     |
| ![iFrame 8](../../de/viz/media/widget_images/basic/Prev_StatefulIFrame8.png)    | `iFrame 8`  | восемь страниц, переключаемых с помощью значения                |
| ![Граница](../../de/viz/media/widget_images/basic/Prev_tplFrame.png)            | `Border`    | рамка, опционально с заголовком                                 |
| ![примечание](../../de/viz/media/widget_images/basic/Prev_Note.png)             | `Note`      | блокнот                                                         |
| ![Стол](../../de/viz/media/widget_images/basic/Prev_TableBody.png)              | `Table`     | таблица, полученная из точки данных                             |

### Навигация и виды

|                                                                                       | Виджет              | Делает                                                                                     |
| ------------------------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------ |
| ![связь](../../de/viz/media/widget_images/basic/Prev_tplLink.png)                                  | `link`              | делает весь район ориентиром                                                               |
| ![HTML-навигация](../../de/viz/media/widget_images/basic/Prev_HTMLnavigation.png)                  | `HTML navigation`   | переключается на другой ракурс с эффектом перехода.                                        |
| ![Просмотреть в виджете](../../de/viz/media/widget_images/basic/Prev_ContainerView.png)            | `view in widget`    | Встраивает целое представление; это обычный способ реализации общей панели навигации.      |
| ![Просмотреть в виджете 8](../../de/viz/media/widget_images/basic/Prev_StatefulContainerView8.png) | `view in widget 8`  | Отображает один из восьми вариантов отображения в зависимости от значения.                 |
|                                                                                       | `Dialog`            | открывает вид в окне                                                                       |
| ![Выпадающий фильтр](../../de/viz/media/widget_images/basic/Prev_FilterDropdown.png)               | `filter - dropdown` | Отображает и скрывает виджеты в зависимости от используемого в них фильтрующего параметра. |

### Инструменты

|                                                                           | Виджет              | Делает                                                                                                        |
| ------------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------- |
| ![Полноэкранный](../../de/viz/media/widget_images/basic/Prev_FullScreen.png)           | `Full Screen`       | переключает полноэкранный режим браузера                                                                      |
| ![Разрешение экрана](../../de/viz/media/widget_images/basic/Prev_ScreenResolution.png) | `Screen Resolution` | Отображает размер экрана и присваивает имя соответствующему представлению; полезно только во время настройки. |
| ![HTML выход](../../de/viz/media/widget_images/basic/Prev_HtmlLogout.png)              | `HTML logout`       | выходит из системы                                                                                            |
| ![Жест](../../de/viz/media/widget_images/basic/Prev_ValueGesture.png)                  | `Gesture indicator` | отображает распознанные жесты смахивания                                                                      |

В **vis-2** отсутствуют четыре строительных блока, которые присутствовали в vis 1:`Red Number` ,`Bulb on/off` ,`Bar` и`Speech2Text` В идеале, любой, кто берется за старый проект, должен заменить его строительными блоками из [Material](/docs/viz/widgets-material.md) или [Collection](/docs/viz/widgets-collection.md) .

## jqui

Это набор элементов управления. Здесь находится всё, на что нажимают, что вводят или перетаскивают. Элементы выглядят как в jQuery UI: простые и несколько старомодные, но надёжные.

### кнопки

|                                                                        | Виджет                              | Делает                                                |
| ---------------------------------------------------------------------- | ----------------------------------- | ----------------------------------------------------- |
| ![Кнопка](../../de/viz/media/widget_images/jqui/Prev_Jqui_NavButton.PNG)            | `Button`                            | переключается на другой вид                           |
| ![Значок кнопки](../../de/viz/media/widget_images/jqui/Prev_Jqui_NavButtonIcon.PNG) | `navigation - Icon`                 | то же самое, что и символ                             |
| ![Кнопка Pw](../../de/viz/media/widget_images/jqui/Prev_Jqui_NavButtonPW.PNG)       | `navigation - Pw`                   | То же самое, но только после ввода пароля.            |
| ![Штат Баттон](../../de/viz/media/widget_images/jqui/Prev_Jqui_ButtonState.PNG)     | `Button State`                      | записывает фиксированное значение в точку данных.     |
| ![Кнопка-ссылка](../../de/viz/media/widget_images/jqui/Prev_Jqui_Link.PNG)          | `Button Link` ,`Button Link _blank` | открывает адрес в том же или в новом окне.            |
| ![Ссылка на иконку](../../de/viz/media/widget_images/jqui/Prev_Jqui_Iconlink.PNG)   | `Icon link`                         | то же самое, что и символ                             |
| ![Значок HTTP GET](../../de/viz/media/widget_images/jqui/Prev_Jqui_UrlGet.PNG)      | `Icon HTTP GET`                     | Вызывает адрес в фоновом режиме, не покидая страницу. |

### Вход

|                                                                                 | Виджет                      | Делает                                                       |
| ------------------------------------------------------------------------------- | --------------------------- | ------------------------------------------------------------ |
| ![Вход](../../de/viz/media/widget_images/jqui/Prev_Jqui_Input.PNG)                           | `Input`                     | Текстовое поле, запись при каждом изменении.                 |
| ![Ввод + Установить](../../de/viz/media/widget_images/jqui/Prev_Jqui_InputSet.PNG)           | `ctrl - Input + Set-Button` | Текстовое поле, запись происходит только при нажатии кнопки. |
| ![Ввод даты](../../de/viz/media/widget_images/jqui/Prev_Jqui_ControlDate.PNG)                | `ctrl - Input Date`         | Выбор даты                                                   |
| ![Введите дату и время](../../de/viz/media/widget_images/jqui/Prev_Jqui_ControlDateTime.PNG) | `ctrl - Input Datetime`     | Дата и время                                                 |

### Выбор и управление

|                                                                                 | Виджет                   | Делает                                                |
| ------------------------------------------------------------------------------- | ------------------------ | ----------------------------------------------------- |
| ![Логический](../../de/viz/media/widget_images/jqui/Prev_Jqui_Bool.PNG)                      | `Html Bool`              | Отображает и переключает значение «да/нет».           |
| ![Переключить значок](../../de/viz/media/widget_images/jqui/Prev_Jqui_IconToggle.PNG)        | `Icon Toggle`            | то же самое с двумя символами.                        |
| ![радио](../../de/viz/media/widget_images/jqui/Prev_Jqui_RadioButton.PNG)                    | `Radiobuttons on/off`    | две кнопки для включения и выключения                 |
| ![Список радиостанций](../../de/viz/media/widget_images/jqui/Prev_Jqui_RadioButtonList.PNG)  | `Radiobuttons ValueList` | Одна кнопка на каждое значение из списка              |
| ![Радио 25%](../../de/viz/media/widget_images/jqui/Prev_Jqui_RadioButtonPercent.PNG)         | `Radiobuttons 25%`       | фиксированные уровни 0, 25, 50, 75, 100               |
| ![Выбирать](../../de/viz/media/widget_images/jqui/Prev_Jqui_SelectList.PNG)                  | `Select ValueList`       | выпадающее меню для более длинных списков             |
| ![Ползунок](../../de/viz/media/widget_images/jqui/Prev_Jqui_SliderHorizontal.PNG)            | `Slider horizontal`      | Ползунок, горизонтальный                              |
| ![Вертикальный ползунок](../../de/viz/media/widget_images/jqui/Prev_Jqui_SliderVertical.PNG) | `Slider vertical`        | Ползунок, вертикальный                                |
| ![Икона штата](../../de/viz/media/widget_images/jqui/Prev_Jqui_ControlSetState.PNG)          | `ctrl - Icon State`      | Символ, который задает значение при нажатии.          |
| ![Увеличение значка](../../de/viz/media/widget_images/jqui/Prev_Jqui_ControlIncrement.PNG)   | `ctrl - Icon Increment`  | Символ, изменяющий значение на определённую величину. |

### Диалоги

|                                                                                               | Виджет                                     | Делает                                         |
| --------------------------------------------------------------------------------------------- | ------------------------------------------ | ---------------------------------------------- |
| ![HTML-диалог](../../de/viz/media/widget_images/jqui/Prev_JquiDialog.png)                                  | `HTML - Dialog`                            | открывает окно со своим собственным содержимым |
| ![Диалоговое окно значков](../../de/viz/media/widget_images/jqui/Prev_JquiIconDialog.png)                  | `Icon - Dialog`                            | То же самое, активируется с помощью символа.   |
| ![Диалог контейнера](../../de/viz/media/widget_images/jqui/Prev_ContainerDialog.png)                       | `container - HTML - view in jqui Dialog`   | открывает весь обзор, как окно.                |
| ![Диалоговое окно значка контейнера](../../de/viz/media/widget_images/jqui/Prev_ContainerIconDialog.png)   | `container - Icon - view in jqui Dialog`   | то же самое посредством символа                |
| ![Диалоговое окно кнопки контейнера](../../de/viz/media/widget_images/jqui/Prev_ContainerButtonDialog.png) | `container - Button - view in jqui Dialog` | то же самое с помощью кнопки.                  |
| ![Кнопка закрытия](../../de/viz/media/widget_images/jqui/Prev_Jqui_ButtonClose.PNG)                        | `Button dialog close`                      | закрывает открытое окно                        |

## jqplot

![MeterGauge](../../de/viz/media/widget_images/jqplot/Prev_MeterGauge.png)

Один виджет,`MeterGauge` Указательный инструмент с цветными секциями. Для получения дополнительных опций доступны отдельные наборы; см. раздел [«Указательные инструменты»](/docs/viz/widgetsets.md) .

## свайп

|                                                                          | Виджет             | Делает                                                                               |
| ------------------------------------------------------------------------ | ------------------ | ------------------------------------------------------------------------------------ |
| ![Проведите пальцем по экрану](../../de/viz/media/widget_images/swipe/Prev_Swipe.png) | `swipe Navigation` | Переключение между режимами отображения происходит при проведении пальцем по экрану. |
| ![Карусель](../../de/viz/media/widget_images/swipe/Prev_Carousel.png)                 | `Carousel`         | отображает несколько видов подряд, как карусель.                                     |

Оба устройства в первую очередь предназначены для телефонов и настенных планшетов.

## вкладки

Виджет,`SliderTabs` : несколько режимов просмотра, скрытых за вкладками, между которыми можно переключаться вверху.

## Что относится ко всем

Настройки каждого из этих виджетов (имя, положение, видимость, CSS, сигналы) описаны в разделе [«Настройки виджета»](/docs/viz/widgets.md) .