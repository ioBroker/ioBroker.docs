---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2-widgets-eusec/README.md
title: ioBroker.vis-2-widgets-eusec
hash: vpfyrQGr/tpWkGvzYXY7w6sD3U/UH02OOkkC1X7pau4=
---
![Логотип](../../../en/adapterref/iobroker.vis-2-widgets-eusec/admin/vis-2-widgets-eusec.png)

# ioBroker.vis-2-widgets-eusec

Виджеты для vis-2, отображающие камеры адаптера [eusec](https://github.com/iobroker-community-adapters/ioBroker.eusec) ( [eufy Security](https://us.eufylife.com/collections/security) ). Требуется eusec 3.0.2 или более поздняя версия. Виджеты загружаются в vis-2 с React 18, а также в vis-2 с React 19.

**Данный проект не связан с компаниями Anker или eufy. eufy и eufy Security являются товарными знаками соответствующих владельцев и используются здесь только для обозначения камер, с которыми работают виджеты.**

## Виджеты

- **Камера в режиме реального времени** : воспроизводит прямую трансляцию, пока виджет виден, и останавливает её, когда он исчезает. Отображает последний снимок до появления первого изображения или анимацию загрузки, если указано «Пока загружается поток». Для камер, имеющих такие функции, отображаются элементы управления панорамированием и наклоном, а также кнопки предустановок, начиная с версии eusec 3.2.0.
- **Всплывающее окно события** : невидимо до тех пор, пока один из его триггеров не станет истинным (по умолчанию). `ringing` и `person_detected` (если камера существует), затем открывает прямую трансляцию в диалоговом окне и закрывает его через заданное время. Триггер, который сработал незадолго до отображения изображения (меньше, чем время до закрытия), всё ещё открывает его, поэтому скрипт может переключиться на это изображение после события. То же самое происходит после того, как страница потеряла соединение, например, на планшете, чьё киосковое приложение приостанавливает отображение страницы под заставкой: триггер, который сработал тем временем и всё ещё верен, открывает его. Он открывается только на том представлении, на котором он размещен; разместите его на каждом представлении, где он должен отображаться, или на представлении, которое включают все остальные представления.
- **Снимок** : последнее изображение с камеры и её возраст. Одно касание открывает прямую трансляцию.

Диалоговое окно события и снимок экрана получают свой заголовок, размер, цвета и шрифт из группы атрибутов "Диалог".

В каждом виджете выберите канал камеры (`eusec.0.<station>.cameras.<camera>`) как "Камера"; все состояния находятся оттуда.

## Что зависит от версии eusec?

| eusec                        | Поведение                                                                                                                                                                                                             |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 3.0.2 до 3.3.x               | Виджет записывает `start_stream`, ждет `livestream` и пишет `stop_stream` когда он закроется.                                                                                                                           |
| 3.2.0 и более поздние версии | Кнопки предустановок для камер с предустановленными настройками.                                                                                                                                                      |
| 3.4.0 и более поздние версии | При включенной функции «прямые трансляции по запросу» открытие плеера запускает потоковое вещание. Плеер сообщает, когда изображение воспроизводится, когда станция занята другой камерой и когда камера не отвечает. |

## Известные пределы

- **HTTPS:** go2rtc отображает прямую трансляцию только по протоколу HTTP. Страница vis-2, открытая по протоколу HTTPS, не может её отобразить; об этом сообщает виджет.
- **Несколько дисплеев до версии eusec 3.4:** виджет, закрывающий операции записи. `stop_stream` При начале трансляции изображение на другом экране, отображающем ту же камеру, также прерывается. В случае с EUSEC 3.4 и потоковой трансляцией по запросу такого не происходит.
- **Два всплывающих окна для двух камер, расположенных друг над другом** , самая новая сверху.

## Переход от vis2-eusec

Вплоть до версии 0.1.1 этот адаптер назывался... `vis2-eusec` ioBroker называет адаптеры виджетов для vis-2 `vis-2-widgets-<name>`, поэтому оно продолжает существовать как `vis-2-widgets-eusec` vis-2 сохраняет имя набора виджетов в каждом виджете проекта, и среда выполнения загружает только те наборы, которые указаны в этом списке. Представления, созданные с помощью `vis2-eusec` Поэтому новое имя потребуется один раз:

1. Установить `vis-2-widgets-eusec` и удалить экземпляр `vis2-eusec`.
2. В административной панели откройте вкладку «Файлы». `vis-2.0/<project>/` и скачать `vis-views.json`.
3. Замените все `vis2-eusec` в файле с `vis-2-widgets-eusec` и загрузите его в ту же папку.
4. Перезагрузите vis-2.

Все виджеты и их настройки остаются без изменений.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (typhosj) New attribute "While the stream loads": shows a loading animation instead of the last event picture until the livestream plays; it stands still when the system asks for reduced motion
- (typhosj) The event popup also opens for a trigger that turned true while the page had lost its connection, for example under the screensaver of a kiosk tablet
- (typhosj) After a lost connection, the live view and the snapshot pick up what changed meanwhile (a new event picture, a stream that ended, eusec stopping or starting) instead of waiting for the next change

### 1.0.0 (2026-11-12)

- (typhosj) The live view no longer opens with a focus ring around the close button; the dialog itself takes the focus, and Tab still reaches the button
- (typhosj) The live view shows the last event picture uncropped while the stream loads, in the same framing as the video, instead of cutting it to fill the widget
- (typhosj) A widget no longer stops a livestream that another display had started (eusec before 3.4, or with on-demand streaming switched off)
- (typhosj) Devices with a compatibility stream are recognised however their serial numbers are written in the eusec settings
- (typhosj) When the camera of a widget changes at runtime, the new camera starts instead of the widget reporting an ended stream
- (typhosj) A live widget outside the visible area no longer starts a stream for a moment
- (typhosj) The 360° button sits in the middle of the direction pad instead of the top left corner
- (typhosj) A change of the pan and tilt display setting takes effect without reloading the view
- (typhosj) Pressing a control in a dialog and releasing the mouse outside it no longer closes the dialog
- (typhosj) Escape closes only the dialog in front when several are open
- (typhosj) Choosing another camera for the event popup in the editor replaces the triggers that were filled in for the previous camera
- (typhosj) The age of a snapshot reads "1 minute ago" instead of "60 seconds ago"

### 0.2.0 (2026-10-18)

- (typhosj) Renamed from vis2-eusec to vis-2-widgets-eusec; views built with vis2-eusec need the new name once, see "Moving from vis2-eusec"

### 0.1.1 (2026-10-13)

- (typhosj) The widgets are translated into all eleven languages of ioBroker
- (typhosj) The keyboard focus stays inside the livestream dialog while it is open

### 0.1.0 (2026-10-13)

- (typhosj) Initial version: live player, event popup and snapshot widget

## License

MIT License

Copyright (c) 2026 typhosj <typhosj@gmx.de>

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