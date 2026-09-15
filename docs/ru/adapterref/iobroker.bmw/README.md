---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.bmw/README.md
title: ioBroker.bmw
hash: bDZ/XMl4dbHVdEUVPUrbZFgmlEIcHxuk2u2Xm550tCs=
---
![Версия NPM](https://img.shields.io/npm/v/iobroker.bmw.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.bmw.svg)
![node-lts](https://img.shields.io/node/v-lts/iobroker.bmw?style=flat-square)
![Статус зависимостей Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.bmw?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/TA2k/iobroker.bmw?style=flat-square)
![размер репозитория GitHub](https://img.shields.io/github/repo-size/TA2k/iobroker.bmw?logo=github&style=flat-square)
![активность коммитов на GitHub](https://img.shields.io/github/commit-activity/m/TA2k/iobroker.bmw?logo=github&style=flat-square)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/TA2k/iobroker.bmw?logo=github&style=flat-square)
![Проблемы на GitHub](https://img.shields.io/github/issues/TA2k/iobroker.bmw?logo=github&style=flat-square)
![Статус рабочего процесса GitHub](https://img.shields.io/github/actions/workflow/status/TA2k/iobroker.bmw/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Известные уязвимости SNYK](https://snyk.io/test/github/TA2k/ioBroker.bmw/badge.svg)
![Бета](https://img.shields.io/npm/v/iobroker.bmw.svg?color=red&label=beta)
![Стабильный](https://iobroker.live/badges/bmw-stable.svg)
![Установлено](https://iobroker.live/badges/bmw-installed.svg)
![НПМ](https://nodei.co/npm/iobroker.bmw.png?downloads=true)

<img src="admin/bmw.png" alt="Logo" width="200">

# ioBroker.bmw

## Версии

## Адаптер BMW для ioBroker

Этот адаптер интегрирует автомобили BMW в ioBroker, используя новый API BMW CarData с аутентификацией OAuth2 и потоковой передачей данных по протоколу MQTT в реальном времени. Он обеспечивает комплексный мониторинг данных об автомобилях BMW для всех моделей, связанных с вашей учетной записью BMW.

## Часовой

Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде. Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, обратитесь к [документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) !

## Обновление данных во время зарядки

Во время зарядки может случиться так, что уровень заряда батареи не обновляется через поток данных, поскольку автомобиль находится в спящем режиме/режиме ожидания. При включении автомобиля данные будут обновлены. Вы можете инициировать обновление через API.`bmw.0.vin.remote.fetchViaAPI`

## Описание точки данных

Подробное описание параметров можно найти здесь: [telematic.json](https://github.com/TA2k/ioBroker.bmw/blob/master/telematic.json)

## Инструкции по установке

### 1. Настройка портала BMW ConnectedDrive

1. Посетите портал BMW ConnectedDrive: **<https://www.bmw.de/de-de/mybmw/vehicle-overview>** или <https://www.mini.de/de-de/mymini/vehicle-overview>
2. Перейдите в раздел **BMW CarData** (вы увидите различные категории услуг).

![Обзор портала BMW](../../../en/adapterref/iobroker.bmw/img/bmw-portal-overview.png)

3. Нажмите на кнопку **"Создать клиент CarData"** (Create CarData Client).
4. Скопируйте client\_id
5. Подождите 30 секунд
6. Нажмите на CarData API
7. Подождите 30 секунд
8. Нажмите CarData Streaming

![Настройка клиента CarData](../../../en/adapterref/iobroker.bmw/img/cardata-client-setup.png)

## **ВАЖНО** : Нажмите на одну из служб и подождите 30 секунд. Если появится сообщение об ошибке, нажмите еще раз. Не нажимайте на "Gerät Authentifizieren/Devict authentication". Введите client\_id в настройках iobroker. Если это не работает, попробуйте ввести все буквы строчными.

### 2. Настройка потоковой передачи CarData

**НЕОБХОДИМО НАСТРОИТЬ ПОТОКОВУЮ ПЕРЕДАЧУ КАРДАТЫ И ВЫБРАТЬ ВСЕ 244 ТОЧКИ ДАННЫХ.**

После создания идентификатора клиента настройте потоковую передачу:

1. В разделе CarData найдите **"CARDATA STREAMING".**
2. Статус конфигурации должен отображаться как **«готово».**
3. Обратите внимание на временную метку **«Letztes Konfigurationsupdate»** (последнее обновление конфигурации).

![Настройка потоковой передачи CarData](../../../en/adapterref/iobroker.bmw/img/cardata-streaming-setup.png)

4. Нажмите кнопку **«Datenauswahl ändern»** (Изменить выбор данных).
5. **Выберите ВСЕ категории** (Состояние автомобиля, Зарядка, Данные о поездке и т. д.)
6. **Вручную проверьте ВСЕ 244 отдельных точки данных.**
7. Или введите это в консоли разработчика Google, нажав F12.`document.querySelectorAll('label.chakra-checkbox:not([data-checked])').forEach(l => l.click());`
8. Сохраните конфигурацию, нажав кнопку **"Stream löschen",** если необходимо сбросить настройки, а затем выполните повторную настройку.

**Без выбора всех точек данных потоковая передача MQTT не предоставит полные данные!**

### 3. Конфигурация адаптера

1. Введите свой **идентификатор клиента** в настройках адаптера.
2. Выберите **марку** вашего автомобиля (BMW, Mini, Toyota Supra)
3. Установите **интервал обновления** (минимум 10 минут из-за квоты API).
4. При необходимости настройте **список игнорируемых VIN-кодов.**

### 4. Процесс аутентификации

1. Запустите адаптер
2. Проверьте журналы на наличие URL-адреса авторизации OAuth2.
3. Перейдите по ссылке и войдите в систему, используя свою учетную запись BMW.
4. Авторизовать приложение
5. После авторизации адаптер автоматически продолжит работу.

## Структура данных

Данные об автомобиле организованы в следующем порядке:`bmw.0.VIN.*` где`VIN` обозначает идентификационный номер вашего транспортного средства:

### Основная структура папок

- **`bmw.0.VIN.api.*`** — Данные API (периодические обновления)
  - Данные получены через REST API BMW CarData с использованием ресурса .remote.
  - Использует квоту API (50 вызовов в течение 24 часов).

- **`bmw.0.VIN.stream.*`** - Потоковая передача данных (MQTT в реальном времени)
  - Данные получены через потоковую передачу MQTT в реальном времени или удаленную функцию fetchViaAPI.
  - Мгновенное обновление при изменении данных об автомобиле.
  - Включает все 244 настроенные точки данных.

### Доступные конечные точки API (настраиваемые)

Вы можете включить/отключить эти конечные точки в настройках адаптера (BMW CarData API v1):

- `bmw.0.VIN.api.basicData.*` - Информация об автомобиле: модель, марка, серия ✅ **(По умолчанию: включено)**
- `bmw.0.VIN.api.chargingHistory.*` - Сеансы зарядки и история ✅ **(По умолчанию: Включено)**
- `bmw.0.VIN.api.image.*` Изображение автомобиля представлено в демонстрационных целях.
- `bmw.0.VIN.api.locationBasedChargingSettings.*` - Настройки и параметры зарядки с учетом местоположения
- `bmw.0.VIN.api.smartMaintenanceTyreDiagnosis.*` - Интеллектуальная система технического обслуживания: диагностика состояния и состояния шин

### Метаданные

- `bmw.0.VIN.lastStreamViaAPIUpdate` - Отметка времени последнего обновления данных (API)
- `bmw.0.VIN.lastStreamUpdate` - Отметка времени последнего обновления потока MQTT

## Обновления в режиме реального времени

Адаптер получает обновления в реальном времени через потоковую передачу MQTT, когда:

- Автомобиль не находится в спящем режиме/режиме ожидания.
- Изменения состояния автомобиля (двери, окна, фары)
- Обновления статуса зарядки
- Изменение местоположения во время вождения
- Активация системы климат-контроля
- Уведомления службы

## Удаленные команды

**Доступные пульты дистанционного управления:**

API BMW CarData доступен только для чтения, поэтому этот адаптер не предоставляет функциональность управления автомобилем. Для дистанционного управления используйте:

**Официальные решения BMW:**

- **Мобильное приложение MyBMW** - Полная функциональность дистанционного управления
- **Портал BMW ConnectedDrive** — веб-система управления автомобилем.
- **Навык BMW Alexa** — интеграция голосового управления с Amazon Alexa для выполнения таких команд, как:
  - «Алекса, попроси BMW заблокировать мою машину»
  - «Алекса, попроси BMW включить климат-контроль».
  - «Алекса, попроси BMW включить мне фары».

**Встроенные в этот адаптер пульты дистанционного управления:**

- `fetchViaAPI` - Получение последних телематических данных через API контейнера
- `basicData` - Обновить основные данные об автомобиле (модель, марка, серия)
- `chargingHistory` - Получить данные о сеансах зарядки за последние 30 дней
- `image` - Получить текущее изображение транспортного средства
- `locationBasedChargingSettings` - Получение настроек зарядки в зависимости от местоположения
- `smartMaintenanceTyreDiagnosis` - Получение данных диагностики шин

_Примечание: Это только команды для получения данных — API BMW CarData не поддерживает команды управления автомобилем._

## Поиск неисправностей

### Проблемы с аутентификацией (ошибка 400 Bad Request)

Если возникнут ошибки аутентификации:

1. Убедитесь, что API CarData активирован для вашего идентификатора клиента.
2. Убедитесь, что функция CarData Streaming включена.
3. Убедитесь, что выбраны все 244 точки данных.
4. Рекомендуем повторно сгенерировать ваш идентификатор клиента.

### Нет данных MQTT

Если вы не получаете обновления в режиме реального времени:

1. Убедитесь, что CarData Streaming подписан и активен.
2. Убедитесь, что выбраны все дескрипторы данных (244 точки).
3. Убедитесь, что ваш автомобиль поддерживает потоковую передачу CarData.
4. Перезапустите адаптер после внесения изменений в конфигурацию дескриптора.

### Превышена квота API

Адаптер автоматически управляет ограничением в 50 вызовов API за 24 часа:

- **Отключите ненужные конечные точки API** в настройках адаптера, чтобы уменьшить использование квоты.
- Увеличьте интервал обновления, если вы часто превышаете лимиты квоты.
- Потоковая передача данных по протоколу MQTT не учитывается в рамках квоты API и обеспечивает передачу данных в режиме реального времени.
- Каждая включенная конечная точка API использует один вызов квоты за интервал обновления.

### Отсутствуют данные в папке API.

Если вы не видите ожидаемых данных в`VIN.api.*` :

1. Проверьте, включена ли соответствующая конечная точка в настройках адаптера.
2. Убедитесь, что вы не превысили квоту API (проверьте журналы адаптера).
3. Некоторые конечные точки могут быть недоступны для всех типов транспортных средств.
4. Проверьте журналы адаптера на наличие ошибок конкретных конечных точек (404, 403 и т. д.).

### Понимание источников данных

- **`VIN.api.*`** - Периодически обновляется в зависимости от интервала и включенных конечных точек.
- **`VIN.stream.*`** — Обновление данных о транспортном средстве происходит в режиме реального времени через MQTT при изменении этих данных.
- **`VIN.lastUpdate`** - Отметка времени последнего обновления данных (API или MQTT)
- **`VIN.lastStreamUpdate`** - Отметка времени последнего обновления потока MQTT

## Источник

Этот адаптер доступен по адресу: <https://github.com/TA2k/ioBroker.bmw>

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (hombach) fixed repochecker error
- (hombach) fixed translations
- (hombach) updated dependencies

### 5.0.2 (2026-08-11)

- (TA2k) added a staged telematic container fallback on CU-403: full catalogue (294) -> without endpoint-bound keys (290) -> all streaming-capable keys plus extras (252) -> curated reduced set (75), keeping as much coverage as BMW accepts instead of failing
- (TA2k) expanded the reduced/fallback container to a curated 75-key set covering EV charging/HV battery, range/mileage/fuel, location, doors, windows, tyres, service and status for both EV and combustion vehicles
- (TA2k) log the active container's state, version and name for diagnostics
- (TA2k) auto-upgrade an outdated reduced container via a version marker in the container purpose, while never deleting a working full container

### 5.0.1 (2026-08-10)

- (TA2k) fixed CU-103 "token-scope is not CarData" by requesting the cardata:api:read scope explicitly in the device code flow
- (TA2k) fixed MQTT streaming: use the token gcid as username and topic prefix (matching BMW's broker ACL), fixing the "Unspecified error" subscribe failure
- (TA2k) fixed container cleanup deleting with an undefined containerId (CU-121)
- (TA2k) removed the CarData Streaming Username setting - the gcid is now taken automatically from the token
- (TA2k) added an option to create a reduced telematic container (workaround for CU-403 on container creation)
- (hombach) updated adapter-core
- (hombach) fixed adapterchecker errors: downgraded @types/node to ^22, added Sentry notice to README, added @iobroker/adapter-dev
- (hombach) replaced native setInterval/setTimeout with adapter-managed equivalents in main.js
- (hombach) moved all jsonConfig.json inline translations to i18n files
- (hombach) updated dependencies

### 5.0.0 (2026-05-17)

- (copilot) BREAKING: Adapter requires node.js >= 22 now
- (hombach) fixed axios vulnerability
- (hombach) removed node 20 tests
- (hombach) added CHANGELOG_OLD.md
- (hombach) updated dependencies

### 4.3.5 (2026-04-11)

- (hombach) fix repo checker warnings
- (hombach) fix vulnerability
- (hombach) update dependencies
- (hombach) remove old admin files

### 4.3.4 (2026-02-28)

- enhance docu and logging
- (hombach) fix vulnerability
- (hombach) update dependencies

### 4.3.3 (2026-01-02)

- (hombach) year 2026 changes
- (hombach) update dependencies

### Old Changes see [CHANGELOG OLD](https://github.com/TA2k/ioBroker.bmw/blob/master/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2021-2026 TA2k <tombox2020@gmail.com>

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