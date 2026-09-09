---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.roomba/README.md
title: ioBroker.roomba
hash: tiqaQH0IrDUoas8VR1vU+QnIEeFpaBlhnNWknReAacQ=
---
![Логотип](../../../en/adapterref/iobroker.roomba/admin/roomba.png)

![Количество установок](http://iobroker.live/badges/roomba-installed.svg)
![Стабильная версия](http://iobroker.live/badges/roomba-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.roomba.svg)
![Изменения с момента последнего релиза](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.roomba/latest.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.roomba.svg)
![НПМ](https://nodei.co/npm/iobroker.roomba.png?downloads=true)

# ioBroker.roomba

Подключите свой робот-пылесос iRobot Roomba к ioBroker.

Основано на библиотеке dorita980 <https://github.com/karlvr/dorita980#readme>

[![Трэвис CI](https://travis-ci.com/iobroker-community-adapters/ioBroker.roomba.svg?branch=master)](https://travis-ci.com/iobroker-community-adapters/ioBroker.roomba)

**Оглавление**

1. [Функции](#features)
2. [Установка](#installation)
3. [Инструкции по установке](#setup-instructions)
4. [Поддерживаемые модели Roomba / Версии прошивки](#supported-roombas--firmware-versions)
5. [Каналы и штаты](#channels--states)
6. [Описание предпочтений (неполное)](#description-of-preferences-incomplete)
7. [Интеграция системы «Умный дом» / Alexa с использованием ioBroker.javascript](#smart-home--alexa-integration-using-iobrokerjavascript)
8. [Список изменений](#changelog)
9. [Кредиты](#credits)
10. [Лицензия](#license)

## Функции

Данный адаптер обладает следующими функциями:

- **Отправка команд** (`start` ,`stop` ,`resume` ,`pause` ,`dock` ) к вашему роботу-пылесосу Roomba
- Получение информации **о состоянии устройства** , например, заряд батареи, подключение к док-станции, заполненность/вставка в корзину (полный список см. в разделе [«Каналы и состояния](#channels--states) »).
- Получите **конфигурацию устройства** , например, настройки параметров, сети или расписания (полный список см. в разделе [«Каналы и состояния](#channels--states) »).
- Получите **статистику устройства** , такую как общее количество миссий, время работы на док-станции и т. д. (полный список см. в разделе [«Каналы и состояния](#channels--states) »).
- Получите информацию о **текущей задаче** (во время уборки вашего робота-пылесоса Roomba), такую как время начала и окончания, общее время работы, площадь уборки и т. д. (только для поддерживаемых моделей Roomba; см. [раздел «Поддерживаемые модели Roomba / Версии прошивки»](#supported-roombas--firmware-versions) ).
- **Построение карты на основе полученных данных миссии** (только для поддерживаемых моделей Roomba).
- **Веб-интерфейс** , отображающий статус и карту текущих, а также предыдущих/архивных миссий:![Интерфейс Roomba](../../../en/adapterref/iobroker.roomba/img/roomba.interface.png)

## Установка

Для отображения карт маршрутов робота-пылесоса Roomba компоненту ioBroker.roomba требуется [canvas](https://www.npmjs.com/package/canvas) . ioBroker попытается установить эту зависимость при установке ioBroker.roomba.

Однако, скорее всего, вам потребуется установить зависимые пакеты для canvas (и сам canvas) с помощью следующей команды:

### Linux

```
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

Кроме того, выполните следующую команду **в каталоге ioBroker.roomba** (`/opt/iobroker/node_modules/iobroker.roomba` ):

```
sudo npm install canvas --unsafe-perm=true
```

### Windows

1. Убедитесь, что у вас есть`node-gyp` установлен через
   ```
   npm install -g node-gyp
   ```

2. Убедитесь, что у вас установлены необходимые компоненты сборки (build essentials) через...
   ```
   npm install --global --production windows-build-tools
   ```

3. Скачайте GTK 2 (для [Win32](http://ftp.gnome.org/pub/GNOME/binaries/win32/gtk+/2.24/gtk+-bundle_2.24.10-20120208_win32.zip) или [Win64](http://ftp.gnome.org/pub/GNOME/binaries/win64/gtk+/2.22/gtk+-bundle_2.22.1-20101229_win64.zip) ) и распакуйте его (например, в архив).`C:\path\to\GTK2` )

4. Бегать
   ```
   node-gyp rebuild --GTK_Root=C:\path\to\GTK2
   ```

5. Установите Canvas из папки iobroker.roomba.
   ```
   cd C:\path\to\iobroker\node_modules\iobroker.roomba
   npm install canvas
   ```

Подробности см. на странице <https://github.com/Automattic/node-canvas/wiki/Installation:-Windows> .

## Инструкции по установке

### Автоматическая настройка

Для автоматической настройки ioBroker.roomba следуйте инструкциям в административной панели ioBroker.roomba.

**ВНИМАНИЕ** : Учетные данные для аутентификации не совпадают с теми, которые вы используете в мобильном приложении!

1. Убедитесь, что адаптер ioBroker.roomba запущен.
2. Убедитесь, что ваш робот находится на домашней базе и включен (горит зеленый индикатор).
3. Затем нажмите и удерживайте кнопку HOME на вашем роботе, пока он не воспроизведет серию звуковых сигналов (примерно 2 секунды).
4. Отпустите кнопку, и ваш робот начнет мигать индикатором Wi-Fi.
5. Затем вернитесь сюда и нажмите кнопку, чтобы получить IP-адрес и учетные данные.

Если автоматизированный процесс не сможет получить ваши учетные данные, воспользуйтесь ручной настройкой.

### Ручная настройка

Для ручной настройки см. <https://github.com/karlvr/dorita980#how-to-get-your-usernameblid-and-password> .

## Поддерживаемые модели Roomba / Версии прошивки

### Поддерживаемые версии прошивки

| Версия программного обеспечения | Информация о прошивке                                                                             | Поддерживается                                                                                                                                            |
| ------------------------------- | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| v1.4                            | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/19549#rn_PageTitle) | ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) **поддерживается (![#c5f015](https://placehold.it/15/c5f015/000000?text=+) (включая карту)**     |
| v2.4.6-x                        | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/529#rn_PageTitle)   | ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) **поддерживается (![#c5f015](https://placehold.it/15/c5f015/000000?text=+) (включая карту)**     |
| v3.2.xx                         | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle)   | ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) **поддерживается** (![#f03c15](https://placehold.it/15/f03c15/000000?text=+) (Карта отсутствует) |

### Поддерживаемые модели роботов-пылесосов Roomba

| Серия                     | Модели _(неполные)_                                                                                                         | Версия программного обеспечения | Информация о прошивке                                                                                      | Поддерживается                                                                                                                                            |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Робот-пылесос Roomba® 6xx | 605, 606, 612, 616, 671, 676, 680, 696                                                                                      | v3.2.40                         | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle)            | (вероятно)                                                                                                                                                |
| Робот-пылесос Roomba® 6xx | 675, [690](https://github.com/koalazak/dorita980/issues/71#issuecomment-513043465)                                          | v3.2.40                         | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle)            | ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) **поддерживается** (![#f03c15](https://placehold.it/15/f03c15/000000?text=+) (Карта отсутствует) |
| Робот-пылесос Roomba® 6xx | [692](https://github.com/iobroker-community-adapters/ioBroker.roomba/issues/28)                                             | v3.5.62                         | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle)            | ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) **поддерживается** (![#f03c15](https://placehold.it/15/f03c15/000000?text=+) (Карта отсутствует) |
| Робот-пылесос Roomba® 7xx | 774, 785,                                                                                                                   | -                               |                                                                                                            | ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) _Данная модель не поддерживает подключение к Wi-Fi, поэтому не имеет соответствующей поддержки._ |
| Робот-пылесос Roomba® 8xx | 880, 886, 891, 896                                                                                                          | -                               | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle)            | (вероятно)                                                                                                                                                |
| Робот-пылесос Roomba® 8xx | [895](https://github.com/iobroker-community-adapters/ioBroker.roomba/blob/master/\(https:/forum.iobroker.net/post/245274\)) | v3.2.10 / 40 / 69               | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle)            | ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) **поддерживается** (![#f03c15](https://placehold.it/15/f03c15/000000?text=+) (Карта отсутствует) |
| Робот-пылесос Roomba® 9xx | 965, 981                                                                                                                    | -                               | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/529#rn_PageTitle)            | (вероятно)                                                                                                                                                |
| Roomba® 9xx               | [960](https://forum.iobroker.net/user/jb_sullivan) , [966](https://forum.iobroker.net/user/thomaslpz) , 980                 | v2.4.6-3                        | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/529#rn_PageTitle)            | ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) **Поддерживается (включая карту)**                                                               |
| Roomba® i                 | [i7 (7150)](https://forum.iobroker.net/post/240589) , i7+ (7550)                                                            | v1.4                            | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/19549#rn_PageTitle)          | ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) **Поддерживается (включая карту)**                                                               |
| Робот-пылесос Roomba® e5  | [е5](https://forum.iobroker.net/topic/7657/irobot-roomba-adapter/158)                                                       | v3.4.42                         | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/6345#rn_PageTitle)           | ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) **поддерживается** (![#f03c15](https://placehold.it/15/f03c15/000000?text=+) (Карта отсутствует) |
| Робот-пылесос Roomba®     | [S9+](https://github.com/Zefau/ioBroker.roomba/issues/34)                                                                   | v3.2.4                          | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/26887/kw/s9%2B#rn_PageTitle) | ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) **Поддерживается (включая карту)**                                                               |

Пожалуйста, помогите нам определить поддерживаемые устройства и сообщите мне [через форму заявки](https://github.com/iobroker-community-adapters/ioBroker.roomba/issues) , поддерживается ли ваша модель Roomba!

## Каналы и штаты

После успешной настройки будут созданы следующие каналы и состояния:

| Канал      | Папка        | Состояние                  | Описание                                                                                                                                                   |
| ---------- | ------------ | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| уборка     | -            | -                          | Команды и информация, касающиеся процесса уборки.                                                                                                          |
| уборка     | последний    | -                          | Последние команды, отправленные роботу                                                                                                                     |
| уборка     | последний    | команда                    | Последняя команда, отправленная роботу                                                                                                                     |
| уборка     | последний    | метка времени              | Отметка времени отправки последней команды                                                                                                                 |
| уборка     | последний    | дата и время               | Дата и время отправки последней команды                                                                                                                    |
| уборка     | последний    | инициатор                  | Инициатор последнего приказа                                                                                                                               |
| уборка     | последний    | цикл                       | Цикл                                                                                                                                                       |
| уборка     | последний    | фаза                       | Фаза                                                                                                                                                       |
| уборка     | последний    | ошибка                     | Указывает на ошибку во время последней миссии.                                                                                                             |
| уборка     | расписание   | -                          | Информация о расписании                                                                                                                                    |
| уборка     | расписание   | цикл                       | Цикл расписания (с воскресенья по субботу)                                                                                                                 |
| уборка     | расписание   | часы                       | Время начала цикла (с воскресенья по субботу)                                                                                                              |
| уборка     | расписание   | минут                      | Минуты до начала цикла (с воскресенья по субботу)                                                                                                          |
| уборка     | -            | док                        | Отправьте робота на док-станцию.                                                                                                                           |
| уборка     | -            | пауза                      | Приостановить текущий процесс очистки                                                                                                                      |
| уборка     | -            | резюме                     | Возобновить текущий процесс уборки                                                                                                                         |
| уборка     | -            | начинать                   | Начать процесс очистки                                                                                                                                     |
| уборка     | -            | останавливаться            | Остановите текущий процесс очистки.                                                                                                                        |
| устройство | -            | -                          | Информация об устройстве                                                                                                                                   |
| устройство | сеть         | -                          | Информация о сети                                                                                                                                          |
| устройство | сеть         | dhcp                       | Укажите, активирован ли DHCP.                                                                                                                              |
| устройство | сеть         | маршрутизатор              | MAC-адрес маршрутизатора                                                                                                                                   |
| устройство | сеть         | IP                         | IP-адрес                                                                                                                                                   |
| устройство | сеть         | подсеть                    | Адрес подсети                                                                                                                                              |
| устройство | сеть         | шлюз                       | Адрес шлюза                                                                                                                                                |
| устройство | сеть         | dns1                       | Основной DNS-адрес                                                                                                                                         |
| устройство | сеть         | dns2                       | Вторичный DNS-адрес                                                                                                                                        |
| устройство | предпочтения | -                          | Настройте параметры                                                                                                                                        |
| устройство | предпочтения | binPause                   | **НЕИЗВЕСТНЫЙ**                                                                                                                                            |
| устройство | предпочтения | carpetBoostAuto            | Автоматический режим: Робот-пылесос Roomba автоматически увеличит мощность всасывания для глубокой очистки ковров.                                         |
| устройство | предпочтения | carpetBoostHigh            | Режим повышенной производительности: Roomba всегда увеличивает мощность всасывания для максимальной эффективности уборки на всех типах напольных покрытий. |
| устройство | предпочтения | экоЗаряд                   | **НЕИЗВЕСТНЫЙ**                                                                                                                                            |
| устройство | предпочтения | noAutoPasses               | Один проход: Roomba обработает все участки за один проход.                                                                                                 |
| устройство | предпочтения | нетPP                      | **НЕИЗВЕСТНЫЙ**                                                                                                                                            |
| устройство | предпочтения | только открытый            | **НЕИЗВЕСТНЫЙ**                                                                                                                                            |
| устройство | предпочтения | schedHold                  | **НЕИЗВЕСТНЫЙ**                                                                                                                                            |
| устройство | предпочтения | два прохода                | Робот-пылесос Roomba повторно обработает все участки. Это может быть полезно в домах с домашними животными или для периодической генеральной уборки.       |
| устройство | версии       | -                          | Информация о версии                                                                                                                                        |
| устройство | версии       | hardwareRev                | Обновление оборудования                                                                                                                                    |
| устройство | версии       | Тип батареи                | Тип батареи                                                                                                                                                |
| устройство | версии       | soundVer                   | **НЕИЗВЕСТНЫЙ**                                                                                                                                            |
| устройство | версии       | uiSwVer                    | **НЕИЗВЕСТНЫЙ**                                                                                                                                            |
| устройство | версии       | navSwVer                   | **НЕИЗВЕСТНЫЙ**                                                                                                                                            |
| устройство | версии       | wifiSwVer                  | **НЕИЗВЕСТНЫЙ**                                                                                                                                            |
| устройство | версии       | мобильностьВер             | **НЕИЗВЕСТНЫЙ**                                                                                                                                            |
| устройство | версии       | загрузчикВер               | Версия загрузчика                                                                                                                                          |
| устройство | версии       | umiVer                     | **НЕИЗВЕСТНЫЙ**                                                                                                                                            |
| устройство | версии       | softwareVer                | Версия программного обеспечения                                                                                                                            |
| устройство | -            | \_rawData                  | Исходные данные о предпочтениях в формате JSON.                                                                                                            |
| устройство | -            | мак                        | MAC-адрес робота                                                                                                                                           |
| устройство | -            | имя                        | Название робота                                                                                                                                            |
| устройство | -            | тип                        | Тип робота                                                                                                                                                 |
| штаты      | -            | -                          | Информация о состоянии                                                                                                                                     |
| штаты      | -            | \_подключено               | Состояние соединения                                                                                                                                       |
| штаты      | -            | батарея                    | Уровень заряда батареи робота                                                                                                                              |
| штаты      | -            | binFull                    | Укажите, заполнен ли контейнер.                                                                                                                            |
| штаты      | -            | binInserted                | Укажите, вставлен ли контейнер.                                                                                                                            |
| штаты      | -            | пристыкованный             | Укажите, подключен ли робот к док-станции.                                                                                                                 |
| штаты      | -            | сигнал                     | Уровень сигнала                                                                                                                                            |
| штаты      | -            | статус                     | Текущее состояние робота                                                                                                                                   |
| статистика | -            | -                          | Статистическая информация                                                                                                                                  |
| статистика | миссии       | -                          | Статистика миссии                                                                                                                                          |
| статистика | миссии       | неуспешный                 | Количество неудачных работ по уборке                                                                                                                       |
| статистика | миссии       | преуспевать                | Количество успешно выполненных работ по уборке                                                                                                             |
| статистика | миссии       | общий                      | Количество заказов на уборку                                                                                                                               |
| статистика | время        | -                          | Статистика времени                                                                                                                                         |
| статистика | время        | avgMin                     | **НЕИЗВЕСТНЫЙ**                                                                                                                                            |
| статистика | время        | hOnDock                    | **НЕИЗВЕСТНЫЙ**                                                                                                                                            |
| статистика | время        | nAvail                     | **НЕИЗВЕСТНЫЙ**                                                                                                                                            |
| статистика | время        | estCap                     | **НЕИЗВЕСТНЫЙ**                                                                                                                                            |
| статистика | время        | nLithChrg                  | **НЕИЗВЕСТНЫЙ**                                                                                                                                            |
| статистика | время        | nNimhChrg                  | **НЕИЗВЕСТНЫЙ**                                                                                                                                            |
| статистика | время        | nDocks                     | **НЕИЗВЕСТНЫЙ**                                                                                                                                            |
| -          | -            | refreshedDateTime          | Дата и время последнего обновления                                                                                                                         |
| -          | -            | обновленнаяВременная метка | Отметка времени последнего обновления                                                                                                                      |

## Описание предпочтений _(неполное)_

При вызове будет получена следующая полезная нагрузка.`getPreferences()` (см. <https://github.com/karlvr/dorita980#getpreferences> ):

| Объект                    | Индекс     | Тип         | Описание                                                 | ioBroker State                |
| ------------------------- | ---------- | ----------- | -------------------------------------------------------- | ----------------------------- |
| netinfo                   | -          | объект      | Информация о сетевом подключении робота-пылесоса Roomba. | -                             |
| netinfo                   | .dhcp      | логический  | Укажите, активирован ли DHCP.                            | device.network.dhcp           |
| netinfo                   | .addr      | IP          | IP-адрес                                                 | устройство.сеть.ip            |
| netinfo                   | .маска     | IP          | Адрес подсети                                            | устройство.сеть.подсеть       |
| netinfo                   | .gw        | IP          | Адрес шлюза                                              | устройство.сеть.шлюз          |
| netinfo                   | .dns1      | IP          | Основной DNS-адрес                                       | device.network.dns1           |
| netinfo                   | .dns2      | IP          | Вторичный DNS-адрес                                      | device.network.dns2           |
| netinfo                   | .bssid     | мак         | MAC-адрес маршрутизатора                                 | устройство.сеть.маршрутизатор |
| netinfo                   | .сек       | целое число | Неизвестный                                              | _(не нанесено на карту)_      |
| wifistat                  | -          | объект      | Неизвестный                                              | -                             |
| wifistat                  | .Wi-Fi     | целое число | Неизвестный                                              | _(не нанесено на карту)_      |
| wifistat                  | .uap       | логический  | Неизвестный                                              | _(не нанесено на карту)_      |
| wifistat                  | .облако    | целое число | Неизвестный                                              | _(не нанесено на карту)_      |
| wlcfg                     | -          | объект      | Неизвестный                                              | -                             |
| wlcfg                     | .сек       | целое число | Неизвестный                                              | _(не нанесено на карту)_      |
| wlcfg                     | .ssid      | нить        | Неизвестный                                              | _(не нанесено на карту)_      |
| мак                       | -          | мак         | MAC-адрес робота-пылесоса Roomba                         | -                             |
| страна                    | -          | нить        | Неизвестный                                              | -                             |
| cloudEnv                  | -          | нить        | Неизвестный                                              | -                             |
| svcEndpoints              | .svcDeplId | нить        | Неизвестный                                              | -                             |
| mapUploadAllowed          | -          | логический  | Неизвестный                                              | -                             |
| смещение местного времени | -          | целое число | Неизвестный                                              | -                             |
| ...                       | -          | ...         | ...                                                      | -                             |

Пожалуйста, помогите нам с описанием настроек. Если вы знаете значение настроек, помеченных как «неизвестно» в таблице, сообщите мне [об этом через форму запроса](https://github.com/iobroker-community-adapters/ioBroker.roomba/issues) !

## Интеграция системы «Умный дом» / Alexa с использованием ioBroker.javascript

### Отправьте карту через Telegram, когда миссия будет завершена.

Для этого необходимо установить адаптер ioBroker ioBroker.telegram ( <https://github.com/ioBroker/ioBroker.telegram> ).

Создайте скрипт в папке "common" файла ioBroker.javascript и добавьте к нему следующий обработчик событий:

```javascript
var _fs = require('fs');

/*
 * MISSION END: Send map
 * 
 */
var message = "%device.name% finished at %missions.current.endedDateTime% cleaning %missions.current.sqm% sqm in %missions.current.runtime% seconds (%missions.current.error% errors).";
var ns = 'roomba.0';
var imagePath = 'tmp/';

on({id: ns + '.missions.current.ended', change: 'any'}, function(obj)
{
    if (!obj.state || !obj.state.val) return;
    
    // replace variables with state values
    var pos, variable, state, value;
    while (message.indexOf('%') > -1)
    {
        pos = message.indexOf('%');
        variable = message.substring(pos, message.indexOf('%', pos+1)+1);
        state = getState(ns + '.' + variable.replace(/%/g, ''));
        
        if (state !== null && state.val !== null)
            value = state.val
        else
        {
            log('State ' + variable.replace(/%/g, '') + ' not found!', 'warn');
            value =  '';
        }

        if (typeof value === "boolean") value = value === true ? 'with' : 'no';
        message = message.replace(RegExp(variable, 'gi'), value);
    }
    
    // console
    log(message);
    
    // get image
    var img = getState(ns + '.missions.current.mapImage').val;

    if (img !== null && img.indexOf('data:image/png;base64,') > -1)
    {
        _fs.writeFile(imagePath + 'image.png', img.replace(/^data:image\/png;base64,/, ''), 'base64', function(err)
        {
            if (err !== null)
                log(err.message, 'warn');
            else
                sendTo('telegram', {text: imagePath + 'image.png', message: message});
        });
    }
});
```

_04.05.2019 исправлена ошибка, препятствовавшая отправке карты._

Вы можете отредактировать переменную.`message` Вы можете использовать любые уведомления, которые хотите получать вместе с картой.`%name-of-state%` для получения значения состояния в дереве объектов ioBroker.roomba.

## Кредиты

### неофициальный API

Спасибо [@koalazak](https://github.com/koalazak) за [неофициальную библиотеку (SDK) для iRobot Roomba 980 на Node.js.](https://github.com/koalazak/dorita980#readme)

### Иконки

Иконки созданы<a href="https://www.flaticon.com/authors/iconnice" title="Iconnice"> Иконница</a> от<a href="https://www.flaticon.com/" title="Flaticon"> [www.flaticon.com](http://www.flaticon.com)</a> лицензировано компанией<a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank"> CC 3.0 BY</a></div>

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (iobroker-bot) Adapter requires node.js >= 20 now.
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now

### 1.3.0 (2024-04-26)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.2.2 (2023-09-03)
* (mcm1957) some dependencies have been upgraded
* (TheRealArthurDent) Background color of the adapter settings page has been removed to make it useable in dark mode.

### 1.2.1 (2023-08-09)

* (mcm1957) dorita980 dependency has been upgraded
* (mcm1957) some other dependencies have been upgraded
* (mcm1957) Adapter now requires node 16 or newer and js-controller 4.0.24 or newer

### 1.2.0 (2023-08-09)

* (TheRealArthurDent) dorita980 has been updated (see PR #144)
* (mcm1957) Release script has been updated
* (mcm1957) Several issues reported by adapter checker have been fixed

### 1.1.4 (2021-07-19)
* (Apollon77) Adjust some types to prevent js-controller 3.3 warnings
* (thost96) fix hanging state loading in frontend
* (thost96) fixed link in canvas warning

### 1.1.1 (2020-02-16)
- (Zefau) moved development to Community Repository

### 1.1.0 (2020-02-06)
- (Zefau) added support to change schedule (see [#36](https://github.com/Zefau/ioBroker.roomba/issues/36))
- (Zefau) fixed bug with state `commands.last.dateTime` having incorrect value `NaN`
- (Zefau) fixed error message shown when robot is on a mission but map is not given

### 1.1.0 (2020-02-06)
- (Zefau) acknowledged support for S9+ (see [#34](https://github.com/Zefau/ioBroker.roomba/issues/34))

### 1.0.7 (2019-09-03)
- (Zefau) fixed bugs occurring when Roomba is on a mission
- (Zefau) added additional debug logging

### 1.0.6 (2019-08-19)
- (Zefau) added loading screen to web interface

### 1.0.5 (2019-08-18)
- (Zefau) fixed failing secure connection
- (Zefau) fixed broken credential retrieval
- (Zefau) fixed broken refresh

### 1.0.4 (2019-08-15)
- (Zefau) fixed password retrieval
- (Zefau) fixed German translations
- (Zefau) added donations button
- (Zefau) updated `dorita980` dependency to v3.1.3
- (Zefau) updated `canvas` dependency to v2.6.0

### 1.0.3 (2019-07-23)
- (Zefau) fixed bug _uncaught exception: Cannot read property 'x' of undefined_

### 1.0.2 (2019-07-20)
- (Zefau) reworked placing home icon ([#23](https://github.com/Zefau/ioBroker.roomba/issues/23))
- (Zefau) updated dependencies to fix security vulnerabilities in depending packages

### 1.0.1 (2019-05-15)
- (Zefau) fixed display error in Chrome ([#19](https://github.com/Zefau/ioBroker.roomba/issues/19#issuecomment-492963244))
- ([@Apollon77](https://github.com/Apollon77)) updated testing for Node.js v12 ([#18](https://github.com/Zefau/ioBroker.roomba/pull/18))
- (Zefau) updated dependencies

### 1.0.0 (2019-05-04)
- (zefau) No changes, only bump to stable release

### 0.5.0 (2019-04-21)
- (zefau) Added command buttons to map page / web interface ([#17](https://github.com/Zefau/ioBroker.roomba/issues/17))
- (zefau) Removed button to end mission manually ```missions.current._endMission```
- (zefau) Run ```stop``` command in the background when ```dock``` command is received ([#14](https://github.com/Zefau/ioBroker.roomba/issues/14))
- (zefau) Added Web Adapter as dependency

### 0.4.5 (2019-03-20)
- Zefau) Refactored retrieval of preferences and added debug mode

### 0.4.4 (2019-03-15)
- ([@Apollon77](https://github.com/Apollon77)) Core Files/Testing Update and introduce adapter-core ([#8](https://github.com/Zefau/ioBroker.roomba/pull/8))

### 0.4.3 (2019-02-10)
- (zefau) Improved compatibility for series 600

### 0.4.2 (2019-02-09)
- (zefau) Bug fixing

### 0.4.1 (2019-02-03)
- (zefau) Support for Compact Mode
- (zefau) Bug fixing

### 0.4.0 (2019-01-08)
- (zefau) Support for e5 and 600 series (due to support by [dorita980](https://github.com/koalazak/dorita980#readme))

### 0.3.0 (2019-01-06)
- (zefau) Image / Map of the current cleaning mission will be created
- (zefau) Removed encryption of password

### 0.2.3 (2018-12-03)
- (zefau) Fixed an issue encrypting the password when entered by user (no automated retrieval)

### 0.2.2 (2018-12-02)
- (zefau) Password will now be stored encrypted

Note: If you are coming from an earlier version, you have to (1) empty your settings, (2) save, (3) restart the adapter and (4) enter / fetch credentials again (duo to the fact that password will be stored encrypted now)

### 0.2.1 (2018-11-25)
- (zefau) Fixed / improved automatically retrieving of authentication credentials

### 0.2.0 (2018-11-18)
- (zefau) improved admin interface to automatically retrieve authentication credentials

### 0.1.0 (2018-11-04)
- (zefau) initial version

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.roomba/blob/master/CHANGELOG_OLD.md)

## License
The MIT License (MIT)

Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2020 Zefau <zefau@mailbox.org>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.