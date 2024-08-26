---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.device-reminder/README.md
title: ioBroker.device-напоминание
hash: 2fkXEtserWPGmdczF4XvV9xfGixFMyNxpDu36OzGe+A=
---
![Логотип](../../../en/adapterref/iobroker.device-reminder/admin/icon.png)

![Количество установок (стабильно)](http://iobroker.live/badges/device-reminder-stable.svg)
![Количество установок (последних)](http://iobroker.live/badges/device-reminder-installed.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.device-reminder.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.device-reminder.svg)
![Статус зависимости](https://img.shields.io/david/xenon-s/iobroker.device-reminder.svg)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Пожертвование через PayPal](https://img.shields.io/badge/paypal-donate%20%7C%20spenden-blue.svg)
![НПМ](https://nodei.co/npm/iobroker.device-reminder.png?downloads=true)

# IoBroker.device-reminder
![Тестирование и выпуск](https://github.com/xenon-s/iobroker.device-reminder/workflows/Test%20and%20Release/badge.svg)

## Нужен файл readme на немецком языке?<br> [немецкий readme](https://github.com/Xenon-s/ioBroker.device-reminder/blob/master/README_GER.md)
<br>

# Адаптер для мониторинга состояний устройства Версия
Этот адаптер может определять с помощью измерительных разъемов, включено ли устройство, работает или выключено, и реагировать на это. Затем сообщения можно отправлять автоматически через Telegram, WhatsApp, Alexa, Sayit, Pushover и электронную почту (возможен множественный выбор для каждого устройства). Также возможно автоматическое отключение розетки после завершения процесса (тоже с задержкой по времени). При заданном времени выполнения можно выводить сигнал тревоги для каждой точки данных (при использовании внешнего сценария точка данных выдает только значения «истина/ложь» или отображается в визуальном отображении). Для этого достаточно просто ввести время предварительного запуска в минутах в точку данных «device-reminder.X.XXX.config.runtime max».

# Что следует учитывать?
Интервал обновления «значения живого потребления (называется **»_energy «**)» для большинства устройств не должен превышать 10 секунд, иначе это может привести к очень задержке сообщений. Сам адаптер опрашивает значения каждые 10 секунд и использует новые значения на основе событий. Это спасает систему<br> Команда в консоли Tasmota: TelePeriod 10

# Что возможно для каждого устройства?
- Уведомление при запуске устройства
- Уведомление об окончании работы соответствующего устройства
- Уведомление в Telegram (возможно несколько идентификаторов)
- Уведомление Alexa (возможно несколько идентификаторов)
- Уведомление WhatsApp (возможно несколько идентификаторов)
- Pushover-уведомление (возможно несколько идентификаторов)
- Уведомление по электронной почте (возможно несколько идентификаторов)
- Уведомление о сигнале (возможно несколько идентификаторов)
- Матричное уведомление (возможно несколько идентификаторов)
- Уведомления могут создаваться свободно или задаваться внешним скриптом.
- Точки данных с текущим статусом, потреблением в реальном времени и последним отправленным сообщением о состоянии для использования значений из этого адаптера в других сценариях.
- Устройства могут быть отключены по требованию (также с задержкой по времени), если процесс был обнаружен завершенным
- Голосовые помощники могут быть временно отключены для каждой точки данных.
- Мониторинг времени выполнения в минутах: если время превышено, во все выбранные мессенджеры отправляется сигнал тревоги.

# Инструкция
## Основные вещи заранее
Для каждой группы устройств, Alexa и т.п. есть кнопка «Проверить вход». При нажатии этой кнопки существующие записи проверяются на достоверность и вы сразу получаете ответ, все ли записи верны. Если вы вносили изменения, эту кнопку нужно всегда нажимать! Кнопку нужно нажимать всегда, когда она появляется!<br> ![check_btn_false.png](admin/pictures/check_btn_false.png)<br> ![check_btn_true.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/check_btn_true.png)

## Создать устройство
![addDevice.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/addDevice.png)

- **Имя устройства**: произвольно выбираемое имя.
- **Тип устройства**: здесь необходимо выбрать, какое это устройство, чтобы расчеты в адаптере могли выполняться правильно.
- **Потребление**: при нажатии на кнопку с тремя белыми точками открывается управление объектами. Вам необходимо выбрать точку данных, которая показывает **текущее потребление**.
- **Включение/выключение**: нажмите кнопку с тремя белыми точками, чтобы открыть управление объектами. Вам необходимо выбрать точку данных, которая включает/выключает ваш **сокет** (не обязательно). Если этот параметр не выбран, автоматическое выключение произойти не может.
- **Начальный текст**: уведомление, которое должно быть отправлено при запуске устройства (также возможны специальные символы).
- Конечный текст**: уведомление, которое будет отправлено после завершения работы устройства (также возможны специальные символы)

В **Starttext** и **Endtext** вы также можете получить сообщение от внешней точки данных. Это сообщение считывается с задержкой в 1 секунду от точки данных после изменения статуса устройства. Таким образом, вы можете получить сообщение от внешнего скрипта. Адаптер автоматически определяет, исходит ли сообщение из точки данных или оно было просто введено вручную. Чтобы выбрать точку данных, просто нажмите кнопку с тремя белыми точками, а затем выберите соответствующую точку данных. **Обратите внимание**: можно использовать только точку данных **или** сообщение, введенное вручную!<br>

# Настройка устройств
![configureDevices.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/configureDevices.png)

- **активно**: активировано по умолчанию. Здесь вы можете временно отключить устройство, чтобы оно больше не отправляло уведомления.
- Устройство**: будет создано автоматически.
- **Alexa**: все ранее созданные Alexa перечислены здесь, и их можно добавить, щелкнув мышью.
- **sayit**: здесь перечислены все ранее созданные устройства Sayit, которые можно добавить, щелкнув мышью.
- **telegram**: здесь перечислены все ранее созданные пользователи Telegram, и их можно добавить, щелкнув мышью.
- **whatsapp**: здесь будут перечислены все ранее созданные пользователи WhatsApp, и их можно будет добавить, нажав на них.
- **pushover**: здесь перечислены все ранее созданные пользователи pushover, и их можно добавить, щелкнув мышью.
- **электронная почта**: здесь будут перечислены все ранее созданные пользователи электронной почты, и их можно будет добавить, щелкнув по ним.
- **сигнал**: здесь перечислены все ранее созданные пользователи сигналов, и их можно добавить, щелкнув по ним.
- **матрица**: здесь перечислены все ранее созданные пользователи матрицы, и их можно добавить, щелкнув по ним.
- **Задержка выключения**: здесь можно дополнительно ввести тайм-аут в **минутах**. По истечении таймаута розетка выключается *если активировано автовыключение*. Тайм-аут не влияет на уведомление о завершении устройства! Можно использовать только в том случае, если в разделе «Устройства» также была указана точка данных отключения.
- **Отменить обнаружение**: если эта функция активирована, адаптер пытается определить, было ли устройство уже выключено вручную до получения уведомления, а затем больше не уведомляет.

После нажатия кнопки «**Сохранить и закрыть**» в разделе *Объекты -> устройство-напоминание* для каждого вновь созданного устройства создается папка, в которой

- не беспокоить (если активировано, никакие сообщения не будут отправляться через **голосовое напоминание**)
- максимальное время работы
- текущее состояние устройства
- сигнализация времени работы
- среднее потребление (может использоваться в качестве вспомогательного средства для определения собственных пороговых значений)
- последние прогоны в формате JSON
- последнее время выполнения в формате чч:мм:сс
- текущее живое потребление
- сообщение мессенджерам
- текущее время выполнения в формате чч:мм:сс
- текущее время выполнения в миллисекундах

отображается.<br>

## Создать Алексу
![addAlexa.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/addAlexa.png)

- **Имя**: произвольно выбираемое имя, также возможны специальные символы.
- alexa2/../announcement'/'speak'**: здесь вам нужно выбрать точку данных, которая позволит вашей Alexa говорить. Чтобы выбрать точку данных, просто нажмите кнопку с тремя маленькими белыми точками.
- **громкость 0–100**: громкость, с которой должна говорить ваша Alexa (от 0 до 100%).

Последние два поля можно использовать для создания периода времени, в течение которого вашей Alexa разрешено выполнять голосовой вывод. По умолчанию период активен с 00:00 до 23:59.

- **активно с**: время начала периода уведомления.
- **активно до**: время окончания периода уведомления.

## Создать устройство SayIt
![addSayit.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/addSayit.png)

- **Имя**: произвольно выбираемое имя, также возможны специальные символы.
- **'sayit/../text'**: выберите точку данных «текст» в соответствующей папке устройства SayIt. Здесь отправляется текстовый вывод.
- **громкость 0–100**: громкость, с которой должно говорить ваше устройство Sayit (от 0 до 100%).
- **активно с**: время начала периода уведомления.
- **неактивно с**: время окончания периода уведомления.

## Создать резервного пользователя
![addPushover.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/addPushover.png)

- **Имя**: произвольно выбираемое имя, также возможны специальные символы.
- **Pushover-экземпляр**: экземпляр, которому должно быть отправлено сообщение.
- **Тема**: необязательная тема сообщения.
- **Идентификатор устройства**: дополнительный идентификатор устройства, на которое должно быть отправлено сообщение.
- **Приоритет**: приоритет отправки.
- **Звук**: звук, который воспроизводится, когда Pushover получает сообщение.

## Создать пользователя электронной почты
![addEmail.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/addEmail.png)

- **имя**: произвольно выбираемое имя, также возможны специальные символы.
- **адрес отправителя**: адрес электронной почты, с которого отправляется электронное письмо.
- **адрес получателя**: адрес электронной почты, на который будет отправлено сообщение.

## Создать пользователя сигнала
![addSignal.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/addSignal.png)

- **Имя**: произвольно выбираемое имя, также возможны специальные символы.
- **Экземпляр сигнала**: установленный экземпляр для отправки.
- **Телефон**: при необходимости номер мобильного телефона.

## Создать пользователя Telegram
![addTelegram.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/addTelegram.png)

- **Группа**: если этот флажок установлен, для отправки в групповой чат необходимо обязательно указать идентификатор чата.
- **Имя**: произвольно выбираемое имя, также возможны специальные символы.
- **Экземпляр Telegram**: установленный экземпляр для отправки.
- **Имя пользователя/имя**: имя, хранящееся в адаптере Telegram.
- **Идентификатор чата**: необходимо заполнить, только если вы хотите отправить сообщение группе.

## Создать пользователя WhatsApp
![добавитьWhatsapp.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/addWhatsapp.png)

- **Имя**: произвольно выбираемое имя, также возможны специальные символы.
- **'whatsapp-cmb/../sendMessage'**: точка данных адаптера WhatsApp, на который должно быть отправлено сообщение.

# Устройства по умолчанию
![default-devices.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/default-devices.png) Эти значения определялись в течение нескольких месяцев с помощью многочисленных тестеров. Изменения значений могут привести к тому, что устройства перестанут записываться правильно, что приведет к появлению ложных отчетов.

# Пользовательские устройства
![custom-devices.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/custom-devices.png) Эти значения могут быть настроены пользователем и затем использованы. Ниже приводится объяснение:

- **Порог «Старт» (Ватт)**: начальное значение в ваттах, которое необходимо превысить, чтобы устройство было распознано как запущенное.
- **Пороговое значение «Конец» (Ватт)**: конечное значение в ваттах, которое должно быть ниже, чтобы устройство было распознано как терминированное.
- **Порог режима ожидания (Ватт)**: пороговое значение, указывающее, что устройство находится в состоянии «ВЫКЛЮЧЕНО» или «НАХОДИТ В ОЖИДАНИЕ». Если текущее рассчитанное значение ниже порога **Standy**, устройство считается выключенным.
- **Количество начальных значений**: определяет, как часто «начальное значение» должно превышаться **последовательно**. Падение ниже этого значения один раз приведет к прерыванию запуска. Среднее значение этих значений должно быть выше начального значения, чтобы устройство было признано запущенным.<br>

*Пример: значение должно составлять 10 Вт и превышаться 3 раза подряд. 1. 15 Вт, 2. 1 Вт, 15 Вт => фаза запуска была прервана, поскольку второе значение было ниже 10.*.

- **Количество окончательных значений**: указывает, сколько значений должно быть записано перед расчетом готовности устройства. Чем меньше здесь значений, тем менее точным является результат и увеличивается риск ложных срабатываний. Чем выше значение, тем точнее запись. Недостатком, однако, является то, что готовое сообщение отправляется с сильной задержкой. Конец обнаруживается только тогда, когда достигнуто «Количество конечных значений» и среднее потребление ниже «Порогового значения «Конец» (Ватт)».

*Краткий пример расчета:* Значения потребления поступают каждые 10 секунд. **Порог окончания (Ватт)** установлен на 50, **Количество конечных значений** установлен на 100. После того, как устройство распознано как запущенное, 100 значений (*принимает 100 значений x 10 секунд = 1000 секунд) *) фиксируются и только потом формируется среднее значение. Если оно ниже 50, то примерно через 16,5 минут (мы помним, что **количество конечных значений** = 100 значений) распознается **завершено** и выходит сообщение (если оно настроено). Если значение выше 50, ничего не происходит, поскольку устройство все еще работает. Каждое дополнительное значение теперь заменяет самое старое, и после каждого нового значения рассчитывается новое среднее значение.<br>

# Поддерживать
**Если вам нравится моя работа :**<br>

[![PayPal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=3EYML5A4EMJCW&source=url)<br><br>

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 3.0.1 (2023-10-18)
* (xenon-s) Update testing: [issue #325](https://github.com/Xenon-s/ioBroker.device-reminder/issues/325)
* (xenon-s) bugfix: [issue #327](https://github.com/Xenon-s/ioBroker.device-reminder/issues/327)
* (xenon-s) bugfix: [issue #328](https://github.com/Xenon-s/ioBroker.device-reminder/issues/328)
* (xenon-s) bugfix: [issue #329](https://github.com/Xenon-s/ioBroker.device-reminder/issues/329)

### 3.0.0 (2023-10-18)
**Breaking Changes**
* Made basic changes to the adapter structure, because there were numerous problems with the new "js-Controller 5.x". It is mandatory to reinstall the adapter!
* Numerous bug fixes
* New messengers added
* Admin GUI fundamentally reworked
* Whatsapp and Telegram must now be created manually
* (xenon-s) Fixes for js-controller 5.*
* (xenon-s) bugfix: [issue #278](https://github.com/Xenon-s/ioBroker.device-reminder/issues/278)
* (xenon-s) bugfix: [issue #273](https://github.com/Xenon-s/ioBroker.device-reminder/issues/273)
* (xenon-s) bugfix: [issue #267](https://github.com/Xenon-s/ioBroker.device-reminder/issues/267)
* (xenon-s) bugfix: [issue #218](https://github.com/Xenon-s/ioBroker.device-reminder/issues/218)
* (xenon-s) bugfix: [issue #207](https://github.com/Xenon-s/ioBroker.device-reminder/issues/207)
* (xenon-s) GUI Fixes "devices" : switch may be empty, but then no longer selectable 
* (xenon-s) add: [issue #258: Signal Messenger added](https://github.com/Xenon-s/ioBroker.device-reminder/issues/258)
* (xenon-s) add: [issue #245: Matrix added](https://github.com/Xenon-s/ioBroker.device-reminder/issues/245)
* (xenon-s) add: [issue #185: pushover device id added](https://github.com/Xenon-s/ioBroker.device-reminder/issues/185)
* (xenon-s) bugfix [issue #210](https://github.com/Xenon-s/ioBroker.device-reminder/issues/210)
* (xenon-s) bugfix [issue #169](https://github.com/Xenon-s/ioBroker.device-reminder/issues/169)
* (xenon-s) bugfix [issue #297](https://github.com/Xenon-s/ioBroker.device-reminder/issues/297)

### 1.2.9 (2021-06-22)
* (xenon-s) bugfix: error catching JSON last operations doesn't work

### 1.2.4 (2021-06-13)
* (xenon-s) bugfix: incorrect JSON format

### 1.2.3 (2021-06-13)
* (xenon-s) bugfix: [issue #76](https://github.com/Xenon-s/ioBroker.device-reminder/issues/76) messages from datapoint were not displayed
* (xenon-s) bugfix: [issue #75](https://github.com/Xenon-s/ioBroker.device-reminder/issues/75) "undefined is not a valid state"

### 1.2.1 (2021-05-01)
* (xenon-s) Adapter structure redesigned to classes
* (xenon-s) Admin UI design and inputs made more user friendly
* (xenon-s) Telegram bug fixed
* (xenon-s) Fix for js-controller 3.3.*
* (xenon-s) new datapoints added (runtime max, last runs as JSON, last runtime, runtime max, runtime alert)
* (xenon-s) add: runtime-alert

### 1.0.0 (2021-01-05)
* (xenon-s) initial commit version 1.0

## License

MIT License

Copyright (c) 2023 xenon-s <ente_s@hotmail.de>

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
