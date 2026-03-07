---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.esphome/README.md
title: ioBroker.esphome
hash: 9IKJHjKeI/jq5MGXwoOR2Z5ON05NUxGKYRoqcQKWzyU=
---
![Версия NPM](http://img.shields.io/npm/v/iobroker.esphome.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.esphome.svg)
![Количество установок (последние)](http://iobroker.live/badges/esphome-installed.svg)
![Количество установок (стабильных)](http://iobroker.live/badges/esphome-stable.svg)
![Статус зависимости](https://img.shields.io/david/DrozmotiX/iobroker.esphome.svg)
![Известные уязвимости](https://snyk.io/test/github/DrozmotiX/ioBroker.esphome/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.esphome.png?downloads=true)

<img src="./admin/esphome.png" width="10%" height="10%" align="center">

# IoBroker.esphome
[![[Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/ESPHome/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Тесты:** ![Тестирование и выпуск](https://github.com/DrozmotiX/ioBroker.esphome/workflows/Test%20and%20Release/badge.svg)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется начиная с js-controller 3.0.

## Адаптер ESPHome для ioBroker
Управляйте своим ESP8266/ESP32 с помощью простых, но мощных конфигурационных файлов, созданных и управляемых ESPHome.
Нативная интеграция с управляемым ESPHome устройством (включая панель управления) через собственный API обеспечивает синхронизацию всех данных (обработка событий в реальном времени, без опроса данных! :)

![Логотип](../../../en/adapterref/iobroker.esphome/admin/img/dashboard.png)

**Быстрые ссылки:**

- 📋 [Часто задаваемые вопросы](#frequently-asked-questions-faq)
- ⚙️ [Предварительные условия и настройка](#предварительные условия)
- 🎛️ [Интеграция с панелью управления](#esphome-dashboard-integration-optional)
- 📱 [Управление устройствами](#device-management)
- 🔧 [Примеры конфигурации](#example-config)

Этот адаптер использует [esphome-native-api](https://github.com/twocolors/esphome-native-api#readme) со всеми благодарностями @twocolors за взаимодействие с [ESPHome API]](https://esphome.io/components/api.html?highlight=api)!

## Часто задаваемые вопросы (FAQ)
### В чем разница между адаптером ioBroker ESPHome и панелью управления ESPHome?
**Адаптер ioBroker ESPHome:**

- Интегрирует ваши устройства ESPHome в ioBroker для управления домашней автоматизацией.
- Осуществляет прямую связь с устройствами ESP через собственный API ESPHome.
- Создает состояния/объекты ioBroker для управления и мониторинга устройств.
- Обрабатывает обновления состояния устройства в режиме реального времени (опрос не требуется)
- Управляет конфигурацией устройства в ioBroker.

**Панель управления ESPHome:**

- Веб-интерфейс для создания, редактирования и управления конфигурациями устройств ESPHome.
- Используется для написания конфигурационных файлов в формате YAML, компиляции прошивки и прошивки устройств.
- Может быть интегрирована в административный интерфейс ioBroker в качестве дополнительной функции.
- Может запускаться как в интеграции с этим адаптером, так и в качестве внешней установки (Docker, автономное приложение).

**Вкратце:** Адаптер управляет вашими устройствами в ioBroker, а панель управления отвечает за конфигурацию устройств и прошивку.

### Как настроить селектор IP-адресов на панели управления?
Параметр IP-адреса панели управления в конфигурации адаптера выполняет различные функции:

**Для вкладки «Встроенная панель управления» в административной панели ioBroker:**

1. Введите IP-адрес и порт, на котором запущена ваша панель управления ESPHome.
2. **Встроенная панель управления:** Используйте IP-адрес вашего хоста ioBroker (например, `192.168.1.10:6052`)
- **Важно:** НЕ используйте `127.0.0.1:6052` (и `localhost:6052`), если вы обращаетесь к ioBroker с других устройств — iframe попытается связаться с 127.0.0.1 из браузера клиента, а не с сервером ioBroker.
— Используйте `127.0.0.1:6052` только в том случае, если вы получаете доступ к административной панели ioBroker ТОЛЬКО с того же компьютера, на котором запущен ioBroker.
3. **Внешняя панель управления:** Используйте IP-адрес и порт вашей внешней установки ESPHome (например, `192.168.1.100:6052`).
4. **Настройка HTTPS:** Для сред с HTTPS см. подробный раздел настройки HTTPS ниже.

**Примеры IP-адресов панели управления:**

- Встроенный (доступ из сети): `192.168.1.10:6052` (замените на IP-адрес вашего хоста ioBroker)
- Встроенный (только локально): `127.0.0.1:6052` (только если администратор имеет доступ к этому же компьютеру)
- Внешний хост: `esphome.local:6052` или `192.168.1.100:6052`
- HTTPS-прокси: `https://192.168.1.50:8082/proxy.0/esphome/`

![Настройка IP-адреса на панели управления ESPHome](../../../en/adapterref/iobroker.esphome/admin/img/ESPhomeDashboardIP.png)

**Примечание:** Вы можете использовать этот адаптер для управления устройствами ESPHome без настройки IP-адреса панели управления. IP-адрес панели управления необходим только в том случае, если вы хотите интегрировать интерфейс панели управления ESPHome в административную панель ioBroker.

### Нужна ли мне панель управления ESPHome для использования этого адаптера?
**Нет, панель управления является необязательной.** Вы можете использовать этот адаптер несколькими способами:

1. **Только адаптер:** Управление предварительно настроенными устройствами ESPHome без интеграции с панелью управления.
2. **Адаптер + Внешняя панель управления:** Используйте существующую установку ESPHome (Docker, автономная версия) и при желании интегрируйте ее в интерфейс ioBroker.
3. **Адаптер + встроенная панель управления:** Активируйте встроенную панель управления ESPHome для получения комплексного решения.

Адаптер работает автономно и требует наличия в конфигурации только тех устройств, у которых включен API ESPHome.

### Как добавить устройства к адаптеру?
1. **Убедитесь, что API ESPHome включен** в YAML-конфигурации вашего устройства (см. раздел «Предварительные условия»).
2. **Откройте вкладку «Устройства» адаптера** в административной панели ioBroker (адаптер должен быть запущен).
3. **Добавление устройств вручную:** Введите IP-адрес устройства и учетные данные для аутентификации.
4. **Автоматическое обнаружение:** Используйте функцию автоматического обнаружения, если она включена в настройках адаптера.

Адаптер установит соединение и создаст все необходимые объекты ioBroker для управления устройством.

### Я настроил устройство в панели управления ESPHome, но оно не отображается в адаптере.
**Важно:** Адаптер и панель управления являются полностью отдельными компонентами и не имеют автоматической интеграции. Адаптер может дополнительно установить (и запустить) панель управления для вашего удобства. Ещё раз подчеркнём, что это не означает какой-либо интеграции между ними.

- **Панель управления:** Используется для создания/редактирования конфигурационных файлов YAML, компиляции прошивки и прошивки устройств.
- **Адаптер:** Используется для управления устройствами и синхронизации их состояния с ioBroker.

**Чтобы устройство, настроенное на панели управления, работало с адаптером:**

1. Прошейте устройство конфигурацией из панели управления (убедитесь, что API ESPHome включен в YAML-файле).
2. Добавьте устройство вручную в настройках адаптера (вкладка «Устройство»). Введите IP-адрес/имя хоста и ключ шифрования (рекомендуется) или пароль (устаревший способ).
3. Затем адаптер подключится к устройству через собственный API ESPHome.

**Примечание:** В будущем может быть реализована более тесная интеграция между панелью управления и адаптером (см. проблему #228), но в настоящее время они работают независимо друг от друга.

### Я настроил устройство в адаптере, но оно не отображается на панели управления.
**Это ожидаемое поведение** — адаптер и панель управления не синхронизируют конфигурации устройств автоматически.

- Адаптер подключается к устройствам через собственный API ESPHome для управления/мониторинга.
- Панель управления отвечает за конфигурацию в формате YAML и компиляцию прошивки.

**Если вы хотите разместить устройство на приборной панели:**

**Вариант 1:**

1. Панель управления ESPHome может автоматически обнаруживать устройства в одной сети.
2. На панели управления обнаруженные устройства будут отображаться с кнопкой «ПРИНЯТЬ».
3. Нажмите «ПРИНЯТЬ», чтобы добавить их на панель управления для управления конфигурацией.

**Вариант 2:**

— Создайте новое устройство на панели управления и скопируйте туда существующий YAML-файл.

**Примечание:** Если вы хотите управлять устройствами только через ioBroker, вам не нужно добавлять их в панель управления. Панель управления необходима только для создания/изменения конфигураций устройств.

### Как установить/обновить Python
Вкратце: Нет!

Адаптеру всё равно, какая версия Python установлена в вашей системе. Он всё равно установит и создаст собственную среду Python с правильными версиями. Поэтому, пожалуйста, не экспериментируйте с командами Python в вашей системе, если вы не знаете, что делаете.

## [Документация](https://DrozmotiX.github.io/languages/en/Adapter/ESPHome/)

## [Документация](https://DrozmotiX.github.io/languages/en/Adapter/ESPHome/)
Всю документацию по адаптерам можно найти по адресу [Страница документации DrozmotiX](https://DrozmotiX.github.io/languages/en/Adapter/ESPHome/) -->

## Предварительные условия
* NodeJS >= 20.x
* API активирован в YAML
* Для вкладок администратора (необязательно)
* IP-адрес панели управления ESPHome указывается в настройках экземпляра.

## Интеграция с панелью управления ESPHome (опционально)
Этот адаптер позволяет дополнительно интегрировать панель управления ESPHome в административный интерфейс ioBroker. У вас есть несколько вариантов:

**Вариант 1: Встроенная панель управления (рекомендуется для начинающих)**

— Включите параметр «Встроенная интеграция панели управления ESPHome» в настройках адаптера.
- Использует встроенную среду Python (внешняя настройка не требуется)
— Панель управления по умолчанию работает на порту 6052.
— Установите IP-адрес панели управления на `127.0.0.1:6052` для интеграции с административным интерфейсом.

**Вариант 2: Внешняя панель управления**

- Использовать существующую установку ESPHome (Docker, автономный режим и т. д.)
— Введите IP-адрес и порт внешней панели управления в настройках адаптера.
- Пример: `192.168.1.100:6052` для контейнера Docker

**Вариант 3: Без интеграции с панелью управления**

- Полностью пропустить настройку панели управления
- Используйте внешние инструменты ESPHome для настройки устройства.
- Адаптер по-прежнему управляет устройствами в обычном режиме.

![Настройка IP-адреса на панели управления](../../../en/adapterref/iobroker.esphome/admin/img/ESPhomeDashboardIP.png)

> **💡 См. раздел часто задаваемых вопросов выше** для получения подробных объяснений о настройке IP-адреса панели управления и различиях между адаптером и панелью управления.

### Использование HTTPS
Одна из причин использования HTTPS — возможность прямой прошивки устройств, подключенных к вашему компьютеру, поскольку esphome не позволяет этого делать с HTTP (вероятно, это ограничение браузера в отношении WebSerial).

![flashFromThisComputer.png](../../../en/adapterref/iobroker.esphome/admin/img/flashFromThisComputer.png)

Для использования встроенной панели управления при работе iobroker с протоколом HTTPS в настоящее время требуется выполнить несколько дополнительных шагов:

1. Установите (если у вас его еще нет) веб-адаптер и настройте HTTPS. Дополнительную информацию см. в документации по веб-приложениям: [ioBroker.web](https://github.com/ioBroker/ioBroker.web)
2. Установите адаптер [proxy](https://github.com/ioBroker/ioBroker.proxy).
3. Настройте путь в параметрах прокси-адаптера:
1. контекст: `esphome/`
2. URL: `http://localhost:6052`

![proxy.png](../../../en/adapterref/iobroker.esphome/admin/img/proxy.png)

4. Настройте полный URL-адрес панели управления в разделе «Дополнительные параметры» настроек адаптера esphome — панель управления esphome:
1. Например: `https://<iobrokerIP>:<webAdapterPort>/proxy.0/esphome/`
2. где `<iobrokerIP>` — это IP-адрес хоста, на котором запущен ваш iobroker (аналогично предыдущему).
3. и `<webAdapterPort>` — это порт веб-адаптера (по умолчанию 8082).
4. Это должно выглядеть примерно так:

   ![ESPHomeDashboardUrl.png](../../../en/adapterref/iobroker.esphome/admin/img/ESPHomeDashboardUrl.png)

5. Если вы запускаете панель мониторинга на внешнем хосте, вы также можете использовать URL-адрес внешнего экземпляра панели мониторинга, указанный здесь.

## Как использовать этот адаптер
### Активация API в YAML
> [!ВАЖНО] > ioBroker ESPHome позволяет интегрировать устройства с помощью ключа шифрования (рекомендуется) или пароля API (устаревший способ). > Необходимо указать соответствующие параметры аутентификации, > см. [Документация ESPHome](https://esphome.io/components/api.html?highlight=api) > Пожалуйста, настраивайте только ключ шифрования (предпочтительно) или пароль API (устаревший способ).

#### Пример записи конфигурации ключа шифрования
```
api:
  encryption:
    key: "DyDfEgDzmA9GlK6ZuLkj3qgFcjXiZUzUf4chnIcjQto="
```

#### Пример записи конфигурации API
```
api:
  password: 'MyPassword'
```

## Управление устройствами
### Добавление/изменение/удаление устройств ESPHome в ioBroker
> [!ВАЖНО] > Этот адаптер обеспечивает связь с устройствами, поддерживающими ESPHome, и > (если активирован) интегрированной версией панели управления ESPHome.
> Вам необходимо самостоятельно настроить и загрузить конфигурацию ESP, > используя интегрированную панель управления или внешнюю альтернативу > (например, Docker), прежде чем она будет интегрирована в ioBroker.

> **💡 См. раздел часто задаваемых вопросов выше** для пошаговой инструкции по добавлению устройств к адаптеру.

На вкладке «Устройства» отображаются все известные на данный момент устройства; вы можете либо дождаться автоматического обнаружения устройств (в настоящее время эта функция отключена, см. #175), либо добавить их вручную, указав их IP-адрес и учетные данные.

![Вкладка «Устройства»](../../../en/adapterref/iobroker.esphome/admin/img/deviceTabEmpty.png)

> [!NOTE] > Кнопки для добавления/изменения/удаления устройств и загрузки таблицы устройств доступны только при работающем адаптере! > Необходимо обновить таблицу устройств вручную, нажав кнопку «Обновить обзор устройств». После этого отобразятся все устройства и их состояние подключения.

Пожалуйста, введите IP-адрес (если устройство уже известно, выберите его из выпадающего списка) и выберите соответствующие действия:

- Добавить/изменить устройства
— Отправит IP-адрес и учетные данные на серверную часть и попытается установить соединение.
— Если предоставлен ключ шифрования, пароль API игнорируется, пожалуйста, убедитесь в правильности конфигурации YAML!

- Удалить устройство
- Отправлю сообщение на серверную часть для удаления этого устройства.

> [!ПРЕДУПРЕЖДЕНИЕ] > Это действие удалит выбранное устройство и все связанные с ним состояния из ioBroker!

> [!NOTE] > После добавления устройства будет отображаться сообщение об успешном или ошибочном добавлении. > Вы можете обновить таблицу, чтобы отобразить текущие устройства и их статус подключения.

![DevicesError](admin/img/connectionIssue.png) ![Устройства OK](../../../en/adapterref/iobroker.esphome/admin/img/connectionOK.png)

Если соединение установлено успешно, устройство будет инициализировано, и будут созданы все связанные состояния для управления его атрибутами.
При внесении любых изменений в конфигурацию YAML перезагрузка ESP приведет к разрыву соединения и установлению нового.
В ходе этого процесса состояния, которые больше не являются частью конфигурации YAML, будут автоматически удалены.

![Устройства OK](../../../en/adapterref/iobroker.esphome/admin/img/deviceTree.png)

### Управление файлами YAML
Адаптер предоставляет удобный интерфейс для управления конфигурационными файлами YAML непосредственно из административного интерфейса. Эта функция позволяет загружать, скачивать и управлять файлами YAML, хранящимися в каталоге ESPHome и используемыми панелью управления ESPHome.

#### Функции
- **Загрузка YAML-файлов**: Вставьте содержимое вашей конфигурации YAML непосредственно в административный интерфейс и загрузите его в каталог ESPHome.
- **Просмотр списка файлов**: Отображение всех файлов YAML, хранящихся в каталоге ESPHome, с указанием размера файла и даты изменения.
- **Загрузка файлов**: Получите содержимое любого YAML-файла для редактирования или резервного копирования.
- **Удаление файлов**: Удалите YAML-файлы, которые больше не нужны.

#### Как использовать
1. **Перейдите на вкладку "YAML-файлы"** в конфигурации адаптера.
2. **Загрузите новый файл**:
- Введите имя файла (должно заканчиваться на .yaml или .yml)
— Вставьте содержимое вашего YAML-файла конфигурации.
— Нажмите «Загрузить файл»
3. **Обновите список файлов**, чтобы увидеть все доступные YAML-файлы.
4. **Скачать или удалить файлы**:
— Введите имя файла в поле «Выберите файл».
— Нажмите «Скачать файл», чтобы просмотреть содержимое, или «Удалить файл», чтобы удалить его.

> [!NOTE] > Файлы хранятся в каталоге ESPHome: `/opt/iobroker/iobroker-data/esphome.<instance>/` > > Это тот же каталог, который используется панелью управления ESPHome, поэтому файлы, загруженные через адаптер, > сразу же становятся доступны на панели управления и наоборот.

> [!TIP] > Эта функция особенно полезна, когда: > - Вы хотите быстро редактировать конфигурации, не обращаясь к файловой системе сервера > - Вам необходимо создавать резервные копии или делиться конфигурациями устройств > - Вы хотите управлять файлами YAML, не запуская полную панель управления ESPHome

### Пример конфигурации
Пример конфигурации, дополнительные примеры см. в [[Ссылка на документацию DrozmotiX](https://DrozmotiX.github.io) или [Документация ESPHome]](https://esphome.io/index.html)

<details><summary>Показать пример конфигурации</summary>

esphome: name: sensor_badkamer platform: ESP32 board: esp-wrover-kit

wifi: use_address: 192.168.10.122 ssid: "xxxxx" password: "xxxxxx"

# Включить API ESPHome
api: password: 'MyPassword'

# Активировать шину i2c i2c: sda: 21 scl: 22 scan: True id: bus_a
# Пример конфигурации для bh1750
датчик:

- платформа: bh1750

имя: "Hal_Illuminance" адрес: 0x23 время измерения: 69 интервал обновления: 10 с

# Пример конфигурации для выхода GPIO
    выход:

- платформа: gpio

контакт: 12 инвертированный: true идентификатор: gpio_12

# Пример конфигурации, связывающей переключатель с ранее определенным выходом
    выключатель:

- платформа: вывод

name: "Generic Output" output: 'gpio_12' </details>

## Управление RGBW-светильниками
### RGB против RGBW — В чём разница?
В **RGB-светильниках** для получения цветов, включая белый, используются три канала (красный, зеленый, синий), путем смешивания всех трех на максимальной мощности. В **RGBW-светильниках** добавлен выделенный четвертый белый канал (`white`), который обеспечивает более чистый и яркий белый цвет, чем при смешивании RGB-каналов.

### Доступные состояния для светового объекта
| Штат | Описание |
|---|---|
| `colorHEX` | Записываемая шестнадцатеричная строка цвета, например, `#ff6600`. Запись сюда обновляет красный/зеленый/синий цвета и отправляет команду. |
| `white` | Выделенный белый канал (0 – 255). Присутствует только на светильниках с поддержкой RGBW. |
| `brightness` | Общая яркость (0 – 255). |
| `config.rgbAutoWhite` | **Только RGBW** — при установке значения `true` запись `#ffffff` до `colorHEX` автоматически активирует белый канал и обнуляет RGB. Запись любого другого цвета отключает белый канал и использует RGB. |
| `config.rgbAutoWhite` | **Только RGBW** — если установлено значение `true`, запись `#ffffff` в `colorHEX` автоматически активирует белый канал и обнуляет RGB. Запись любого другого цвета отключает белый канал и использует RGB. |

### Автоматическое переключение белого канала (`rgbAutoWhite`)
Когда обнаруживается RGBW-совместимый источник света (т.е., он находится в состоянии `white`), адаптер автоматически создает для этого объекта записываемое состояние переключения `config.rgbAutoWhite`. По умолчанию оно находится в состоянии `false` (отключено).

**Чтобы включить:**

1. Откройте представление **Объекты** в ioBroker и перейдите к объекту вашего источника света, например, `esphome.0.MyLight.Light.1.config.rgbAutoWhite`.
2. Установите значение `true`.

**Поведение при включении:**

| `colorHEX` ввод | Результат |
| `#ffffff` | `white` → 1 (полный), `red` / `green` / `blue` → 0 |
| Любой другой цвет | `white` → 0, каналы RGB установлены на значения цвета |
| Любой другой цвет | `белый` → 0, каналы RGB установлены на значения цвета |

**Поведение при отключении (по умолчанию):** канал `white` никогда не активируется автоматически; пользователи управляют им самостоятельно.

## Миграция на Tasmota / ESPEasy
Переход с предыдущих настроек Sonoff Tasmota или ESPEasy очень прост. Вам нужно всего лишь, чтобы ESPHome создал для вас исполняемый файл, а затем загрузил его через веб-интерфейс.
Подробнее см. в разделе [Страница документа](https://DrozmotiX.github.io/languages/en/Adapter/ESPHome/06.migration.html)

**_ПРИМЕЧАНИЕ:_** Сгенерированные YAML-файлы хранятся по адресу ```/opt/iobroker/iobroker-data/iobroker.esphome.>instance</>device<.yaml

## Поддержите меня
Если вам нравится моя работа, пожалуйста, рассмотрите возможность личного пожертвования (это личная ссылка для пожертвований DutchmanNL, не имеющая отношения к проекту ioBroker!) [![[Пожертвовать](https://raw.githubusercontent.com/DrozmotiX/ioBroker.sourceanalytix/main/admin/button.png)](http://paypal.me/DutchmanNL)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
    * (DutchmanNL) 
-->
### __WORK IN PROGRESS__
* (@copilot) **NEW**: Add `lib/dashboardApi.js` module exposing all ESPHome Dashboard API endpoints (`getDevices`, `getConfig`, `getEncryptionKey`, `compile`, `upload`) for tighter dashboard integration
* (@copilot) **FIXED**: Invalid jsonConfig warning on adapter install caused by `multiline` property not being allowed on `text` type; changed `uploadContent` to use `textarea` type (fixes #426)

### 0.7.0-beta.4 (2026-02-21)
* (DutchmanNL) **FIXED**: ESLint errors by code refactoring
* (@copilot) **FIXED**: Restore missing `configStates` option in admin UI to allow configuring whether configuration states are shown per entity
* (@copilot) **NEW**: Per-device `rgbAutoWhite` toggle in the light config channel for automatic white-channel routing on RGBW lights (see [Controlling RGBW Lights](#controlling-rgbw-lights))

### 0.7.0-beta.3 (2026-02-20)
* (@copilot) **NEW**: Added support for `colorBrightness`, `coldWhite`, `warmWhite`, and `colorMode` states for lights using the new ESPHome color mode API
* (@copilot) **FIXED**: RGB light control (brightness, color, white, colorTemperature) not working with newer ESPHome firmware that uses `supportedColorModesList` instead of deprecated legacy flags (#338)

### 0.7.0-beta.2 (2026-02-20) - add capability for fans & Lock entity
* (@SimonFischer04) improve README
* (@SimonFischer04) fix #394, actually fix #340, #356
* (DutchmanNL) **FIXED**: Fan component not working #205
* (@copilot) **NEW**: Allow customization of Pillow version used by ESPHome Dashboard, similar to ESPHome version selector
* (@copilot) **NEW**: Add "Clear Autopy Cache" button in ESPHome Dashboard configuration tab to resolve dashboard loading issues (#209)

### 0.7.0-beta.1 (2026-02-16) - Add support for Lock entity & improve dashboard testing
* (@copilot) **NEW**: Add support for Lock entity type - Lock devices now properly display state and control options #353
* (@copilot) **NEW**: YAML file management interface in admin UI for upload/download/delete operations (#369)
* (@SimonFischer04) improve dashboard testing
* (@SimonFischer04) improve logging for #201
* (@SimonFischer04) update pillow
* (@SimonFischer04) fix readme link to lib
* (@SimonFischer04) fix connection status #311
* (@SimonFischer04) remove unneeded node-fetch dependency
* (@SimonFischer04) automatic migration from versions prior to ESPHomeDashboardUrl introduction (pre v0.6.1)
* (@copilot) **FIXED**: Invalid jsonConfig schema - removed unsupported `doNotSave` property from table elements

### 0.6.3 (2025-09-16)
* (@DutchmanNL) Fixed an admin error related to `jsonConfig` validation. #287
* (@DutchmanNL) Various general fixes and dependency updates to improve stability.
* (@DutchmanNL) Improved responsive design for better usability across devices. #284
* (@DutchmanNL) Introduced GitHub Actions to automatically verify the ESPHome Dashboard. #290
* (@DutchmanNL) Added a comprehensive FAQ section to the README to help users with common questions. #286
* (@DutchmanNL) Updated the `esphome-native-api` library to V1.3.3, which may resolve connection issues. #201

## License
MIT License

Copyright (c) 2023-2026 DutchmanNL <rdrozda86@gmail.com>

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