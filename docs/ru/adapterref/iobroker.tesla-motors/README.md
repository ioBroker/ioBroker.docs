---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tesla-motors/README.md
title: ioBroker.tesla-motors
hash: 0ADka5jwLgihOKMHvKhc7X9AqeXOVpljg3x9oxgDcBo=
---
![Логотип](../../../en/adapterref/iobroker.tesla-motors/admin/tesla-motors.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.tesla-motors.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tesla-motors.svg)
![Количество установок (последние)](https://iobroker.live/badges/tesla-motors-installed.svg)
![Количество установок (стабильных)](https://iobroker.live/badges/tesla-motors-stable.svg)
![Статус зависимости](https://img.shields.io/david/iobroker-community-adapters/iobroker.tesla-motors.svg)
![НПМ](https://nodei.co/npm/iobroker.tesla-motors.png?downloads=true)

# IoBroker.tesla-motors
**Тесты:** ![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.tesla-motors/workflows/Test%20and%20Release/badge.svg)

## Адаптер Tesla для ioBroker
Все автомобили Tesla и устройства Powerwall, отображаемые в приложении Tesla, доступны и обновляются через официальный **API Tesla Fleet**.

Команды управления автомобилем (блокировка, разблокировка, климат-контроль, зарядка и т. д.) поддерживаются для всех моделей, включая автомобили, выпущенные после 2021 года, для которых требуется **сквозная подпись команд** (протокол управления автомобилем).

### Требования
- Аккаунт Tesla, связанный с транспортными средствами или энергетической продукцией.
- Node.js >= 20
- Зарегистрированное приложение Tesla Fleet API (идентификатор клиента + секретный ключ клиента) от [developer.tesla.com](https://developer.tesla.com)
- Домен Fleet Key (для установки виртуального ключа на транспортное средство)

### Настройка (пошаговая инструкция)
Административный интерфейс адаптера проведет вас через 4 шага:

#### Шаг 1: Сгенерируйте пару ключей
1. В настройках адаптера нажмите кнопку **Создать пару ключей**, чтобы создать пару ключей EC (prime256v1).
2. Нажмите **Скопировать открытый ключ** и перейдите на [fleetkey.net](https://fleetkey.net) - создайте учетную запись и получите свой поддомен (например, `abc123.fleetkey.net`).
3. Загрузите открытый ключ в свою учетную запись FleetKey.net. Tesla загрузит ключ оттуда во время регистрации.

#### Шаг 2: Приложение Tesla для разработчиков
1. Создайте приложение Fleet API на сайте [developer.tesla.com](https://developer.tesla.com/request)
2. Установите **Origin** на полный поддомен FleetKey (например, `https://abc123.fleetkey.net`).
3. Установите **URL перенаправления** на `https://auth.tesla.com/void/callback`
4. Скопируйте **Идентификатор клиента** и **Секретный ключ клиента** из созданного приложения и введите их ниже вместе с вашим доменом FleetKey (например, `abc123.fleetkey.net`).

#### Шаг 3: Аутентификация (OAuth2)
1. Нажмите **Сгенерировать ссылку для авторизации** — откроется новая вкладка браузера со страницей входа в Tesla.
2. Войдите в свою учетную запись Tesla и авторизуйте приложение.
3. После входа в систему вы увидите сообщение «Страница не найдена» — это нормально! Скопируйте полный URL-адрес из адресной строки браузера.
4. Вставьте URL-адрес в поле «Код URL» и нажмите **Сохранить и закрыть**.

**Внимание:** Никогда никому не делитесь этой ссылкой! Она предоставляет доступ к вашей учетной записи Tesla.

#### Шаг 4: Установка виртуального ключа
Виртуальный ключ необходим для отправки команд вашему автомобилю (блокировка/разблокировка, климат-контроль, зарядка и т. д.). Без него вы сможете только считывать данные об автомобиле. Этот шаг можно выполнить после запуска адаптера.

1. Откройте URL-адрес виртуального ключа, указанный в настройках адаптера на вашем телефоне (или отсканируйте QR-код).
2. Приложение Tesla попросит вас подтвердить добавление «ключа стороннего производителя».
3. Подойдите к своему автомобилю и приложите ключ-карту к центральной консоли, чтобы подтвердить установку.

### Удаленные команды
Удаленные команды доступны в разделе `tesla-motors.0.<VIN>.remote`.

Поддерживаемые команды включают:

- **Заблокировать/Разблокировать**: `door_lock`, `door_unlock`
- **Климат**: `auto_conditioning_start`, `auto_conditioning_stop`, `set_temps`, `set_preconditioning_max`, `remote_seat_heater_request`, `remote_steering_wheel_heater_request`
- **Зарядка**: `charge_start`, `charge_stop`, `set_charge_limit`, `set_charging_amps`, `charge_port_door_open`, `charge_port_door_close`, `set_scheduled_charging`
- **Багажник**: `actuate_trunk` (передний/задний)
- **Windows**: `window_control` (вентиляция/закрытие)
- **Безопасность**: `set_sentry_mode`, `remote_start_drive`
- **Медиа**: `media_toggle_playback`, `media_next_track`, `media_prev_track`
- **Другое**: `flash_lights`, `honk_horn`, `trigger_homelink`, `schedule_software_update`

### Описание поля
- df: передняя часть водителя
- dr: задняя часть водителя
- пф: передняя пассажирская сторона
- pr: пассажирская задняя часть
- футов: передний багажник
- rt: задний багажник

### Технические характеристики
- **Fleet API**: Региональные конечные точки (ЕС/Северная Америка/Китай) с автоматическим определением региона по токену JWT.
- **Подписание команд**: ECDSA P-256 + HMAC-SHA256 через protobuf (протокол управления транспортными средствами)
- **Два домена**: DOMAIN_INFOTAINMENT (климат, зарядка, мультимедиа) и DOMAIN_VEHICLE_SECURITY (блокировка, разблокировка, багажник)
- **Управление сессиями**: рукопожатие ECDH для каждого домена, на основе эпох и счетчика, хранится в состоянии ioBroker.
- **Обновление токена**: автоматическое обновление перед истечением срока действия.

### Вопросы и обсуждения
<https://forum.iobroker.net/topic/47203/test-tesla-motors-v1-0-0>

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ПРОЦЕССЕ** -->

## Changelog
### 2.0.0 (2026-04-12)

- (TA2k) Migrate to Tesla Fleet API with OAuth2
- (TA2k) Add Vehicle Command Protocol signing (ECDSA P-256) for post-2021 vehicles
- (TA2k) Add admin UI for Fleet API setup (key generation, credentials, virtual key)
- (TA2k) Add regional endpoint detection (EU/NA/CN) from JWT token
- (TA2k) Store session in ioBroker state to avoid restart loops
- (copilot) Adapter requires admin >= 7.7.22 now

### 1.5.0 (2025-12-28)

- (mcm1957) Adapter requires node.js >= 20, js-controller >= 6.0.11 and admin >= 6.17.14 now.
- (TA2k) powerwall backup history has been fixed
- (TA2k) Dependencies have been updated.

### 1.4.5 (2024-04-19)

- cleaned up token folder to reduce state objects

### 1.4.4 (2024-04-10)

- improve energy history data

### 1.4.3 (2024-04-10)

- fix for too many state in the powerwall energy history

## License

MIT License

Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2021-2025 iobroker-community

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