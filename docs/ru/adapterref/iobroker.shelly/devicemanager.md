---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/ble-devices.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/ble-devices.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"},"de/adapterref/iobroker.shelly/devicemanager.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/devicemanager.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shelly/devicemanager.md
title: ioBroker.shelly
hash: L14NYrBOb6EK2lko5gMDczxvdyFtKWW+hC9ivJDFQgY=
---
![логотип](../../../de/admin/shelly.png)

# ioBroker.shelly

Это немецкая версия документации - [🇺🇸 Английская версия](https://github.com/iobroker-community-adapters/ioBroker.shelly/blob/master/docs/en/devicemanager.md)

## Диспетчер устройств

Адаптер интегрирован в ioBroker Device Manager (требуется Admin >= 7.8.20) и предоставляет централизованный пользовательский интерфейс для управления всеми устройствами Shelly непосредственно из административного интерфейса.

- **Обзор устройств** — все подключенные устройства с первого взгляда: состояние, версия прошивки, уровень сигнала (RSSI), уровень заряда батареи и статус подключения/отключения.
- **Управление устройствами** — прямое взаимодействие с устройствами: переключение выключателей/реле, регулировка яркости и положения рольставней с помощью ползунков, выбор цветов для устройств RGBW.
- **Подробная информация о датчиках** — отображение данных с датчиков в режиме реального времени (температура, влажность, яркость, движение, затопление и т. д.) в настраиваемой информационной панели.
- **Действия с устройством** : переименование устройств, открытие веб-интерфейса устройства или запуск обновления прошивки.
- **Группировка устройств** — устройства автоматически классифицируются по типу (реле, диммеры, розетки, светильники, счетчики, датчики, крышки, входы, климат-контроль, шлюзы, BLE).

### Фоновый мониторинг новых устройств

Адаптер может регулярно сканировать сеть на наличие новых устройств Shelly с помощью метода обнаружения mDNS.

- **Настраиваемый интервал сканирования** — интервал сканирования в секундах можно установить через конфигурацию адаптера (минимум 60 секунд, 0 = отключено).
- **Автоматическое обнаружение** — новые устройства идентифицируются путем сравнения обнаруженных IP-адресов с адресами уже настроенных устройств.
- **Административные уведомления** — При обнаружении новых устройств адаптер отправляет уведомление через систему уведомлений ioBroker.

### Предоставление ресурсов

Обнаруженные устройства можно активировать непосредственно из Диспетчера устройств, используя пошаговый алгоритм действий.

> \[!ПРИМЕЧАНИЕ]\
> &#x20;В режиме COAP и для устройств первого поколения функция инициализации не поддерживается.

- **Настройка в один шаг** : выберите обнаруженные устройства, присвойте им пользовательские имена и настройте связь по протоколу MQTT.
- **Поддержка Gen2+** - Функция инициализации поддерживает устройства Gen2+ (через`/settings` автоматически через HTTP API) и устройства Gen2/Gen3/Gen4 (через конечные точки RPC).
- **Конфигурация MQTT** — устройства настраиваются с указанием адреса MQTT-сервера, данных доступа и префикса темы адаптера.
- **Именование устройств** — пользовательские имена и префиксы тем MQTT могут быть назначены во время инициализации.
- **Синхронизация часовых поясов** — часовой пояс устройства автоматически устанавливается на время сервера.
- **Аутентификация** — поддерживает устройства, защищенные паролем, с автоматическим резервным вариантом: сначала без аутентификации, затем с использованием настроенного HTTP-пароля, а затем с запросом пароля, специфичного для устройства.
- **HTTP-аутентификация** — для устройств Gen2+ HTTP-аутентификация (дайджест SHA-256) может быть настроена автоматически, если в конфигурации адаптера указан HTTP-пароль.