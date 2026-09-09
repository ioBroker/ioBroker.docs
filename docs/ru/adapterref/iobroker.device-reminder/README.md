---
chapters: {"pages":{"en/adapterref/iobroker.device-reminder/README.md":{"title":{"en":"ioBroker.device-reminder"},"content":"en/adapterref/iobroker.device-reminder/README.md"},"en/adapterref/iobroker.device-reminder/README_GER.md":{"title":{"en":"ioBroker.device-reminder"},"content":"en/adapterref/iobroker.device-reminder/README_GER.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.device-reminder/README.md
title: ioBroker.device-reminder
hash: IahJOgCI31S01rTJYyhf9NAztM7Iofr797tLFK45Wvw=
---
![Логотип](../../../en/adapterref/iobroker.device-reminder/admin/device-reminder.png)

![Количество установок (стабильных)](http://iobroker.live/badges/device-reminder-stable.svg)
![Количество установок (последние)](http://iobroker.live/badges/device-reminder-installed.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.device-reminder.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.device-reminder.svg)
![Статус зависимости](https://img.shields.io/david/xenon-s/iobroker.device-reminder.svg)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Тестирование и выпуск](https://github.com/xenon-s/iobroker.device-reminder/workflows/Test%20and%20Release/badge.svg)
![Пожертвование через PayPal](https://img.shields.io/badge/paypal-donate%20%7C%20spenden-blue.svg)
![НПМ](https://nodei.co/npm/iobroker.device-reminder.png?downloads=true)

# ioBroker.device-reminder

## Нужен ли немецкий файл README?<br> [немецкий readme](/#/docs/adapterref/iobroker.device-reminder/README_GER.md)

<br>

# Адаптер для мониторинга состояний устройств. Версия.

Этот адаптер с помощью измерительных разъемов может определять, включено ли устройство, работает ли оно или выключено, и реагировать на это. Затем сообщения могут автоматически отправляться через Telegram, WhatsApp, Alexa, Sayit, Pushover и электронную почту (возможен множественный выбор для каждого устройства). Также возможно автоматическое отключение розетки после завершения процесса (также с задержкой по времени). При заданном времени работы можно выводить оповещение для каждой точки данных (с помощью внешнего скрипта точка данных выдает только true/false или отображается в виде визуализации). Для этого достаточно ввести время предварительного отключения в минутах в точку данных 'device-reminder.X.XXX.config.runtime max'.

# Что следует учесть?

Интервал обновления значения потребления энергии в реальном времени (называемого **"\_energy"** ) для большинства устройств не должен превышать 10 секунд, иначе это может привести к очень сильной задержке сообщений. Сам адаптер опрашивает значения каждые 10 секунд и использует новые значения по мере поступления событий. Это экономит ресурсы системы.<br> Команда в консоли Tasmota: TelePeriod 10

# Какие возможности предоставляет каждое устройство?

- Уведомление при запуске устройства
- Уведомление по завершении работы соответствующего устройства.
- Уведомления в Telegram (возможно использование нескольких ID)
- Уведомление от Alexa (возможно использование нескольких идентификаторов)
- Уведомление WhatsApp (возможно использование нескольких идентификаторов)
- Pushover-уведомление (возможно использование нескольких идентификаторов)
- Уведомление по электронной почте (возможно указание нескольких адресов)
- Уведомление о сигнале (возможно использование нескольких идентификаторов)
- Матричное уведомление (возможно использование нескольких идентификаторов)
- Уведомления можно создавать произвольно или задавать с помощью внешнего скрипта.
- Данные о текущем состоянии, потреблении в реальном времени и последнем отправленном сообщении о состоянии используются в других скриптах.
- Устройства можно выключить по запросу (в том числе с задержкой по времени), если процесс был завершен.
- Голосовых помощников можно временно отключить для каждой точки данных.
- Мониторинг времени выполнения в минутах: если время превышено, оповещение отправляется во все выбранные мессенджеры.

# Инструкция

## Основные вещи заранее

Для каждой группы устройств, например, Alexa, есть кнопка «Проверить ввод». При нажатии на эту кнопку проверяются существующие записи на достоверность, и вы сразу получаете ответ, все ли записи верны. Если вы внесли изменения, эту кнопку необходимо нажимать всегда! Кнопку нужно нажимать всегда, когда она появляется! <br>![check\_btn\_false.png](admin/pictures/check_btn_false.png)<br>![check\_btn\_true.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/check_btn_true.png)

## Создать устройство

![addDevice.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/addDevice.png)

- **Название устройства** : Свободно выбираемое название
- **Тип устройства** : здесь необходимо выбрать тип устройства, чтобы вычисления в адаптере выполнялись корректно.
- **Потребление** : Нажав на кнопку с тремя белыми точками, откроется управление объектами. Вам нужно выбрать точку данных, отображающую **текущее потребление в режиме реального времени** .
- **Включение/выключение** : Нажмите на кнопку с тремя белыми точками, чтобы открыть управление объектами. Вам необходимо выбрать точку данных, которая включает **/выключает вашу розетку** (это необязательно). Если она не выбрана, автоматическое выключение не произойдет.
- **Начальный текст** : Уведомление, которое должно быть отправлено при включении устройства (допускаются также специальные символы).
- Конечный текст\*\*: Уведомление, которое будет отправлено после завершения работы устройства (допускаются также специальные символы)

В **режимах Starttext** и **Endtext** также можно получить сообщение из внешней точки данных. Это сообщение считывается с задержкой в 1 секунду после изменения состояния устройства. Таким образом, вы можете получить сообщение из внешнего скрипта. Адаптер автоматически определяет, поступает ли сообщение из точки данных или было введено вручную. Чтобы выбрать точку данных, просто нажмите на кнопку с тремя белыми точками, а затем выберите соответствующую точку данных. **Обратите внимание** : можно использовать только точку данных **или** сообщение, введенное вручную!<br>

# Настройка устройств

![configureDevices.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/configureDevices.png)

- **Активно** : По умолчанию активировано. Здесь вы можете временно отключить устройство, чтобы оно больше не отправляло уведомления.
- Устройство\*\*: будет создано автоматически
- **Алекса** : здесь перечислены все ранее созданные учетные записи Алексы, которые можно добавить одним щелчком мыши.
- **sayit** : здесь перечислены все ранее созданные устройства sayit, которые можно добавить одним щелчком мыши.
- **Telegram** : здесь перечислены все ранее созданные пользователи Telegram, которых можно добавить одним щелчком мыши.
- **WhatsApp** : здесь будут перечислены все ранее созданные пользователи WhatsApp, которых можно добавить, нажав на них.
- **Pushover** : здесь перечислены все ранее созданные пользователи Pushover, которых можно добавить одним щелчком мыши.
- **Электронная почта** : здесь будут перечислены все ранее созданные учетные записи пользователей электронной почты, и их можно добавить, щелкнув по ним.
- **signal** : Здесь перечислены все ранее созданные пользователи Signal, и их можно добавить, щелкнув по ним.
- **matrix** : здесь перечислены все ранее созданные пользователи matrix, которых можно добавить, щелкнув по ним.
- **Задержка выключения** : Здесь вы можете дополнительно указать время ожидания в **минутах** . По истечении времени ожидания розетка выключается, _если активирована функция автоматического выключения_ . Уведомление о завершении работы устройства остается неизменным независимо от времени ожидания! Может использоваться только в том случае, если в разделе «Устройства» также была указана точка данных для выключения.
- **Функция отмены обнаружения** : если активирована, адаптер пытается определить, было ли устройство уже выключено вручную до получения уведомления, и в этом случае больше не отправляет уведомления.

После нажатия кнопки « **Сохранить и закрыть** » для каждого вновь созданного устройства в разделе _«Объекты» -> «Напоминания об устройстве»_ создается папка, в которой

- Режим «Не беспокоить» (если активирован, **голосовые** напоминания отправляться не будут).
- максимальное время выполнения
- текущее состояние устройства
- оповещение во время выполнения
- averageConsumption (может использоваться в качестве вспомогательного средства для определения собственных пороговых значений)
- последние запуски в формате JSON
- последнее время выполнения в чч:мм:сс
- текущее потребление в режиме реального времени
- послание посланникам
- текущее время выполнения в формате чч:мм:сс
- текущее время выполнения в миллисекундах

отображается.<br>

## Тестовая кнопка

![testButton.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/testButton.png)

В каждом мессенджере есть кнопка проверки. При нажатии на неё в соответствующий мессенджер отправляется тестовое сообщение. Если сообщение не получено, проверьте настройки. Сам адаптер не проверяет, пришло ли сообщение!

## Отобразить кнопки сохранения, если они не отображаются автоматически.

![force\_save\_buttons.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/force_save_buttons.png)

Поскольку кнопки сохранения иногда не отображаются, была добавлена кнопка, позволяющая принудительно их включить. При нажатии на неё кнопки сохранения появятся. Однако вы сохраняете данные на свой страх и риск, поскольку адаптер не проверяет входной сигнал! Адаптер может дать сбой, или данные конфигурации могут быть потеряны.

## Создать Алексу

![addAlexa.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/addAlexa.png)

- **Имя** : Имя можно выбрать произвольно, допускаются также специальные символы.
- alexa2/../announcement'/'speak'\*\*: Здесь вам нужно выбрать точку данных, которая позволит вашей Alexa говорить. Чтобы выбрать точку данных, просто нажмите на кнопку с тремя маленькими белыми точками.
- **Громкость 0-100** : Уровень громкости, с которым должна говорить ваша Alexa (от 0 до 100%). Последние 2 поля можно использовать для создания временного периода, в течение которого вашей Alexa разрешено выводить голосовые сообщения. По умолчанию период активен с 00:00 до 23:59.
- **Действует с** : Начало периода уведомления
- **Действует до** : Время окончания периода уведомления

## Создайте устройство SayIt

![addSayit.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/addSayit.png)

- **Имя** : Имя можно выбрать произвольно, допускаются также специальные символы.
- **'sayit/../text'** : выберите точку данных "text" в папке соответствующего устройства sayIt. Сюда отправляется текстовый вывод.
- **Громкость 0-100** : уровень громкости, с которым должно говорить ваше устройство Sayit (от 0 до 100%).
- **Действует с** : Начало периода уведомления
- **Неактивно с** : Время окончания периода уведомления

## Создать пользователя Pushover

![addPushover.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/addPushover.png)

- **Имя** : Имя можно выбрать произвольно, допускаются также специальные символы.
- **Экземпляр Pushover** : экземпляр, которому должно быть отправлено сообщение.
- **Тема** : необязательная тема сообщения
- **Идентификатор устройства** : необязательный идентификатор устройства, на которое должно быть отправлено сообщение.
- **Приоритет** : приоритет, с которым следует отправлять
- **Звук** : Звук, который воспроизводится при получении сообщения программой Pushover.
- **TTL** : Время, по истечении которого сообщение должно быть удалено (в секундах)

## Создать пользователя электронной почты

![addEmail.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/addEmail.png)

- **Имя** : Имя можно выбрать произвольно, допускаются также специальные символы.
- **Адрес отправителя** : адрес электронной почты, с которого отправлено письмо.
- **Адрес получателя** : адрес электронной почты, на который должно быть отправлено сообщение.

## Создать пользователя сигнала

![addSignal.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/addSignal.png)

- **Имя** : Имя можно выбрать произвольно, допускаются также специальные символы.
- **Экземпляр сигнала** : Установленный экземпляр, которому нужно отправить сигнал.

## создать пользователя Telegram

![addTelegram.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/addTelegram.png)

- **Имя** : Имя можно выбрать произвольно, допускаются также специальные символы.
- **Экземпляр Telegram** : установленный экземпляр, который нужно отправить.
- **Выберите имя пользователя/имя/идентификатор чата** : укажите, кому отправить сообщение — пользователю, имени или идентификатору чата (рекомендуется). Данные сохраняются в Telegram. Если указан отрицательный идентификатор чата, сообщение отправляется в группу.
- **Введите имя пользователя, имя или идентификатор чата** : Введите имя пользователя, имя или идентификатор чата в зависимости от того, что было выбрано.

## создать пользователя WhatsApp

![addWhatsapp.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/addWhatsapp.png)

- **Имя** : Имя можно выбрать произвольно, допускаются также специальные символы.
- **'whatsapp-cmb/../sendMessage'** : Точка данных адаптера WhatsApp, на который должно быть отправлено сообщение.

## создать пользователя Discord

![addDiscord.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/addDiscord.png)

- **Имя** : Имя можно выбрать произвольно, допускаются также специальные символы.
- **Экземпляр Discord** : Установленный экземпляр, в который нужно отправить сообщение.
- **Идентификатор пользователя** : Идентификатор пользователя Discord
- **Метка в чате** : Пользовательская метка в Discord
- **Имя пользователя в чате** : Имя пользователя Discord ( **обязательное поле** )
- **Идентификатор сервера** : Идентификатор сервера Discord
- **Идентификатор канала** : Идентификатор канала Discord

# Устройства по умолчанию

![default-devices.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/default-devices.png) Эти значения определялись в течение нескольких месяцев с помощью многочисленных тестировщиков. Изменения значений могут привести к тому, что устройства перестанут корректно регистрировать данные, что приведет к ложным отчетам.

# Пользовательские устройства

![custom-devices.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/custom-devices.png) Эти значения могут быть настроены пользователем и затем использованы. Ниже приведено объяснение:

- **Пороговое значение «Запуск» (Вт)** : значение в ваттах, которое должно быть превышено, чтобы устройство было распознано как запущенное.
- **Пороговое значение «Конец» (Вт)** : конечное значение в ваттах, ниже которого необходимо опуститься, чтобы устройство было распознано как подключенное.
- **Пороговое значение «Режим ожидания» (Вт)** : Пороговое значение, указывающее на то, что устройство выключено или находится в режиме ожидания. Если текущее вычисленное значение ниже порогового значения для режима **ожидания** , устройство считается выключенным.
- **Количество начальных значений** : Этот параметр определяет, как часто необходимо превышать «начальное значение» **подряд** . Однократное превышение этого значения приведет к прерыванию запуска. Среднее значение этих параметров должно быть выше начального значения, чтобы устройство было распознано как запущенное.<br> _Пример: Значение должно быть 10 Вт и превышено 3 раза подряд. 1. 15 Вт, 2. 1 Вт, 15 Вт => начальный этап был прерван, потому что второе значение было ниже 10_ .
- **Количество конечных значений** : Этот параметр определяет, сколько значений должно быть записано перед расчетом готовности устройства. Чем меньше значений, тем менее точным будет результат и тем выше риск ложных срабатываний. Чем выше значение, тем точнее запись. Однако недостатком является то, что сообщение о завершении отправляется с большой задержкой. Завершение работы устройства определяется только тогда, когда достигается значение «Количество конечных значений» и среднее потребление ниже «Порогового значения 'Завершение' (Вт)».

_Краткий пример расчета:_ значения потребления поступают каждые 10 секунд. **Пороговое значение «конец» (ватт)** установлено на 50, **количество конечных значений** — на 100. После того, как устройство распознается как запущенное, записывается 100 значений ( _100 значений x 10 секунд = 1000 секунд_ ), и только после этого формируется среднее значение. Если оно ниже 50, примерно через 16,5 минут (помните, **количество конечных значений** = 100) устройство распознается как **завершенное** , и отправляется сообщение (если настроено). Если значение выше 50, ничего не происходит, поскольку устройство все еще работает. Каждое новое значение заменяет самое старое, и после каждого нового значения рассчитывается новое среднее значение.<br>

# Поддерживать

**Если вам нравится моя работа:**<br>

[![PayPal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick\&hosted_button_id=3EYML5A4EMJCW\&source=url)<br><br>

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### 4.x

- (xenon-s) new Admin UI in jsonConfig

### 3.1.2 (2024-01-22)

- (xenon-s) bugfix: [issue #381](https://github.com/Xenon-s/ioBroker.device-reminder/issues/381)
- (xenon-s) bugfix: [issue #382](https://github.com/Xenon-s/ioBroker.device-reminder/issues/382)

### 3.1.1 (2024-01-20)

- (xenon-s) bugfix: [issue #380](https://github.com/Xenon-s/ioBroker.device-reminder/issues/380)

### 3.1.0 (2024-01-19)

**Attention! Check the Telegram settings after the update! You must now enter either the username, firstname or the ChatID!**

- (xenon-s) enhancement "Add comment field "Default / Custom values": [issue #337](https://github.com/Xenon-s/ioBroker.device-reminder/issues/337)
- (xenon-s) enhancement "Integrate Discord": [issue #341](https://github.com/Xenon-s/ioBroker.device-reminder/issues/341)
- (xenon-s) enhancement "Integrate Pushover TTL": [issue #342](https://github.com/Xenon-s/ioBroker.device-reminder/issues/342)
- (xenon-s) enhancement "Button to check the messenger configuration": [issue #379](https://github.com/Xenon-s/ioBroker.device-reminder/issues/379)
- (xenon-s) bugfix: [issue #344](https://github.com/Xenon-s/ioBroker.device-reminder/issues/344)
- (xenon-s) bugfix: [issue #345](https://github.com/Xenon-s/ioBroker.device-reminder/issues/345)
- (xenon-s) bugfix: [issue #346](https://github.com/Xenon-s/ioBroker.device-reminder/issues/346)
- (xenon-s) bugfix: [issue #363](https://github.com/Xenon-s/ioBroker.device-reminder/issues/363)
- (xenon-s) Optimization : MessageHandler revised

### 3.0.1 (2023-10-18)

- (xenon-s) Update testing: [issue #325](https://github.com/Xenon-s/ioBroker.device-reminder/issues/325)
- (xenon-s) bugfix: [issue #327](https://github.com/Xenon-s/ioBroker.device-reminder/issues/327)
- (xenon-s) bugfix: [issue #328](https://github.com/Xenon-s/ioBroker.device-reminder/issues/328)
- (xenon-s) bugfix: [issue #329](https://github.com/Xenon-s/ioBroker.device-reminder/issues/329)
- (xenon-s) bugfix: [issue #344](https://github.com/Xenon-s/ioBroker.device-reminder/issues/344)
- (xenon-s) bugfix: [issue #346](https://github.com/Xenon-s/ioBroker.device-reminder/issues/346)

### 3.0.0 (2023-10-18)

**Breaking Changes**

- Made basic changes to the adapter structure, because there were numerous problems with the new "js-Controller 5.x". It is mandatory to reinstall the adapter!
- Numerous bug fixes
- New messengers added
- Admin GUI fundamentally reworked
- Whatsapp and Telegram must now be created manually
- (xenon-s) Fixes for js-controller 5.\*
- (xenon-s) bugfix: [issue #278](https://github.com/Xenon-s/ioBroker.device-reminder/issues/278)
- (xenon-s) bugfix: [issue #273](https://github.com/Xenon-s/ioBroker.device-reminder/issues/273)
- (xenon-s) bugfix: [issue #267](https://github.com/Xenon-s/ioBroker.device-reminder/issues/267)
- (xenon-s) bugfix: [issue #218](https://github.com/Xenon-s/ioBroker.device-reminder/issues/218)
- (xenon-s) bugfix: [issue #207](https://github.com/Xenon-s/ioBroker.device-reminder/issues/207)
- (xenon-s) GUI Fixes "devices" : switch may be empty, but then no longer selectable
- (xenon-s) add: [issue #258: Signal Messenger added](https://github.com/Xenon-s/ioBroker.device-reminder/issues/258)
- (xenon-s) add: [issue #245: Matrix added](https://github.com/Xenon-s/ioBroker.device-reminder/issues/245)
- (xenon-s) add: [issue #185: pushover device id added](https://github.com/Xenon-s/ioBroker.device-reminder/issues/185)
- (xenon-s) bugfix [issue #210](https://github.com/Xenon-s/ioBroker.device-reminder/issues/210)
- (xenon-s) bugfix [issue #169](https://github.com/Xenon-s/ioBroker.device-reminder/issues/169)
- (xenon-s) bugfix [issue #297](https://github.com/Xenon-s/ioBroker.device-reminder/issues/297)

### 1.2.9 (2021-06-22)

- (xenon-s) bugfix: error catching JSON last operations doesn't work

### 1.2.4 (2021-06-13)

- (xenon-s) bugfix: incorrect JSON format

### 1.2.3 (2021-06-13)

- (xenon-s) bugfix: [issue #76](https://github.com/Xenon-s/ioBroker.device-reminder/issues/76) messages from datapoint were not displayed
- (xenon-s) bugfix: [issue #75](https://github.com/Xenon-s/ioBroker.device-reminder/issues/75) "undefined is not a valid state"

### 1.2.1 (2021-05-01)

- (xenon-s) Adapter structure redesigned to classes
- (xenon-s) Admin UI design and inputs made more user friendly
- (xenon-s) Telegram bug fixed
- (xenon-s) Fix for js-controller 3.3.\*
- (xenon-s) new datapoints added (runtime max, last runs as JSON, last runtime, runtime max, runtime alert)
- (xenon-s) add: runtime-alert

### 1.0.0 (2021-01-05)

- (xenon-s) initial commit version 1.0

## License

MIT License

Copyright (c) 2024 xenon-s <ente_s@hotmail.de>

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