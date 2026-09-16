---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.samsungtv/README.md
title: iobroker.samsungtv
hash: bq1hEQ5784mHAuEAQAZKwSMfLyMbpZUatvmOb0fiZEs=
---
<img src="admin/samsung.svg" alt="Samsung TV logo" width="180">

# iobroker.samsungtv

Современный адаптер для телевизоров Samsung с автоматическим обнаружением и управлением несколькими устройствами в одном экземпляре (поддерживается подключение нескольких телевизоров к одному экземпляру).

Это независимый адаптер, разработанный сообществом пользователей, для телевизоров производства [Samsung Electronics](https://www.samsung.com/) .

Документы на немецком языке доступны по адресу:`doc/de/README.md` .

## Функции

- Автоматическое обнаружение через SSDP/UPnP и опционально mDNS
- Одновременное подключение нескольких телевизоров:`samsungtv.0.<tvname>.*`
- API Tizen WebSocket (8001/8002) + сопряжение/токен
- Парное соединение PIN-кодов серии H/J (по мере возможности)
- Функция Wake-on-LAN (опционально)
- Полная регулировка громкости и отключение звука через UPnP RenderingControl
- Стабильное сопоставление устройств по ID/UUID/MAC, в том числе и при переименовании.
- В логах и пользовательском интерфейсе токены не отображаются (токены хранятся в зашифрованном виде).

## Конфигурация

Адаптер использует встроенные компоненты ioBroker JSONConfig и Device Manager. Они автоматически следуют активной теме оформления административной панели и адаптируются к макетам настольных компьютеров и мобильных устройств.

Вкладка **«Конфигурация»** содержит:

- **Автоматическое сканирование** и **интервал автоматического сканирования** для периодического обнаружения
- **Интервал опроса** для обновления информации о питании, громкости и отключении звука.
- **Тайм-аут обнаружения**
- **Включить SSDP** / **Включить источники обнаружения mDNS**
- **Включить функцию пробуждения по локальной сети (Wake-on-LAN)**
- **Сервисы mDNS** в экспертном режиме (разделенные запятыми, с наилучшими усилиями)

### Добавить устройства

1. Откройте вкладку **«Управление телевизором»** .
2. Начать **сканирование** или использовать **ручное добавление** в качестве запасного варианта.
3. Добавьте обнаруженный телевизор и выберите его читаемое имя в виде дерева объектов.

Действия диспетчера устройств применяются и сохраняются немедленно. Обычная кнопка сохранения ioBroker применяет настройки из вкладки **«Конфигурация»** .

### Сочетание

- **Tizen** : при нажатии **кнопки «Сопряжение»** на экране телевизора появляется запрос (обычно **«Разрешить/Отменить** », без ввода PIN-кода). Подтвердите сопряжение на телевизоре.
- **Серия H/J** : нажмите **«Сопряжение»** → «Телевизор показывает PIN-код» → введите PIN-код в диалоговом окне.

Динамический реестр устройств хранится в каталоге данных постоянного экземпляра ioBroker, поэтому действия Диспетчера устройств не могут быть перезаписаны уже открытой формой настроек. Токены/идентификаторы в этом реестре зашифрованы с помощью системного секрета ioBroker, а запись в файл осуществляется только с правами владельца. Существующие`native.devices` и зашифрованный`native.tokens` Значения импортируются автоматически при первом запуске.

Если во время сопряжения **не появляется соответствующее сообщение** :

- ТВ: **Диспетчер подключений устройств** → включить **уведомления о доступе** .
- Телевизор: проверьте **список устройств** и удалите старые записи.
- Убедитесь, что ioBroker и телевизор находятся в **одной подсети** .

## Объектная модель

По сообщению телеканала:

- `samsungtv.0.<tvname>.info.*`
  - `id` ,`ip` ,`mac` ,`model` ,`uuid` ,`api` ,`lastSeen` ,`paired` , `online`
  - `tokenAuthSupport`
- `samsungtv.0.<tvname>.state.*`
  - `power` ,`volume` , `muted`
- `samsungtv.0.<tvname>.control.*`
  - `power` ,`wol` ,`key` ,`volumeUp` ,`volumeDown` ,`mute` ,`channelUp` ,`channelDown` ,`launchApp` ,`source`
  - `volume` ,`muted`

### Контроль (короткий)

- `control.key` : любая клавиша дистанционного управления (например)`KEY_POWER` ,`KEY_VOLUP` )
- `control.launchApp` : идентификатор приложения (Tizen) из списка приложений для ТВ
- `control.source` : источник как ключ (`KEY_HDMI` ,`KEY_SOURCE` ) или сокращенная форма (`HDMI` )
- `control.volume` : абсолютный объем от 0 до 100
- `control.muted` : включение или выключение звука, в отличие от`control.mute` , который переключает

### Объем

`control.volume` и`control.muted` Используйте службу UPnP RenderingControl телевизора, чтобы установить точный уровень, а не ступенчатое изменение. Три момента, касающиеся этой службы, заслуживают внимания:

- Он отвечает только тогда, когда телевизор включен, и начинает отвечать через несколько секунд после того, как телевизор впервые сообщает о своей включенности. Порт может принимать TCP-соединение даже без ответа со стороны службы, находящейся за ним, поэтому доступность определяется фактическим соединением.`GetVolume` вызов.
- UPnP определяет`upnp:401` как`Invalid Action` и`upnp:402` как`Invalid Args` Некоторые телевизоры Samsung также возвращаются.`upnp:401` Когда сетевые ограничения или ограничения режима "для гостей" блокируют управление, адаптер сообщает об этих ограничениях как о возможных причинах, а не как о確確ной причине.

### Кодовые клавиши (control.key)

`control.key` принимает либо **коды ключей Samsung** (`KEY_*` ) или **удобные сокращенные формы** :

- Навигация:`up` ,`down` ,`left` ,`right` ,`enter` ,`back`
- Система:`home` ,`source` ,`menu` ,`info` ,`guide` ,`exit`
- Громкость/канал:`volup` ,`voldown` ,`mute` ,`chup` ,`chdown`
- СМИ:`play` ,`pause` ,`stop` ,`rewind` ,`ff` ,`record`
- Цвета:`red` ,`green` ,`yellow` ,`blue`
- Числа:`0` к`9`

Также работают прямые коды активации:

- Примеры:`KEY_UP` ,`KEY_DOWN` ,`KEY_ENTER` ,`KEY_RETURN` ,`KEY_HOME` ,`KEY_SOURCE`

Примечание: не все телевизоры поддерживают все кнопки. Некоторые кнопки работают только при активном меню/фокусе.

## Примечания

- Обнаружение осуществляется с максимальной эффективностью. SSDP является основным протоколом, mDNS — необязательным.
- По возможности, распознаются более старые устройства (HJ/Legacy); набор функций может отличаться.
- Для устройств H/J/JU предпочтительнее использовать HJ, если он доступен. В противном случае, если телевизор сообщает о «нераспознанном методе», предпринимается попытка использовать пульт Tizen, и он автоматически переключается на HJ.
- Если присутствуют устаревшие объекты, в журнал записываются предупреждения.
- Адаптер переименован в`samsungtv` чтобы избежать конфликтов со старыми`samsung` адаптер.

## Как провести тестирование (кратко)

1. Установите адаптер и создайте экземпляр.
2. Откройте **панель управления телевизором** и запустите **сканирование** .
3. Добавьте телевизор и задайте ему имя (например)`tv-livingroom` ).
4. Проверка дерева объектов`samsungtv.0.tv-livingroom.*` .
5. Запустите **программу сопряжения** и подтвердите сопряжение на телевизоре.
6. Тест`control.*` объекты (например)`control.mute` ).
7. Переименуйте телевизор в Диспетчере устройств: дерево объектов должно перенестись без проблем.

## Changelog

### **WORK IN PROGRESS**
- Add absolute volume and mute (`control.volume`, `control.muted`) over UPnP RenderingControl.
- Fall back to the well-known RenderingControl endpoint when SSDP returns nothing.
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.0.28
- Replace the custom React configuration page with native ioBroker JSONConfig and Device Manager components.
- Add responsive discovery, manual-add, details, pairing, rename, and remove workflows.
- Move the dynamic registry to persistent instance data with system-secret encryption and automatic migration.
- Remove obsolete custom admin message handlers and frontend dependencies.

### 0.0.27
- Fix TCP reachability checks and prevent overlapping polling/discovery cycles.
- Add bounded timer settings and cross-platform ping/ARP handling.
- Align generated objects and state roles with the current ioBroker catalogue.
- Complete metadata translations and singleton/compact-mode support.

### 0.0.26
- Replace the legacy configuration page with a responsive React admin UI.
- Add complete ioBroker admin translations and automatic light/dark theme support.
- Add typed configuration foundations and migration tests.
- Store Tizen tokens and H/J pairing identities reliably through ioBroker `encryptedNative` handling.
- Migrate pairing data written by older adapter versions without exposing secrets.

Older changes are documented in CHANGELOG_OLD.md.

## License
MIT

Copyright (c) 2026 softwarecrash