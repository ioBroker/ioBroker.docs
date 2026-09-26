---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fujitsu-airstage/README.md
title: ioBroker.fujitsu-airstage
hash: TmZqiLJaNZQ5e70yc2ADMC/IowyBzm6Ep+Ruf68VRJ4=
---
![Логотип](../../../en/adapterref/iobroker.fujitsu-airstage/admin/fujitsu.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.fujitsu-airstage.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.fujitsu-airstage.svg)
![Количество установок](https://iobroker.live/badges/fujitsu-airstage-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/fujitsu-airstage-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.fujitsu-airstage.png?downloads=true)
![Тестирование и выпуск](https://github.com/stefan5232/ioBroker.fujitsu-airstage/workflows/Test%20and%20Release/badge.svg)

# ioBroker.fujitsu-airstage

## Адаптер Fujitsu Airstage для ioBroker

Этот адаптер позволяет управлять кондиционерами Fujitsu Airstage через ioBroker. Кондиционеры должны быть оснащены модулем Wi-Fi и доступны в локальной сети.

**Примечание** : Этот адаптер является независимым проектом сообщества и не связан с компанией Fujitsu Limited или ее дочерними предприятиями. «Fujitsu» и «Airstage» являются зарегистрированными товарными знаками Fujitsu Limited. Их использование предназначено исключительно для идентификации совместимых устройств. Список поддерживаемых устройств см. на официальной [странице продукта Fujitsu Airstage](https://www.fujitsu-general.com/us/products/split/) .

### Функции

- **Полный контроль** : включение/выключение, температура, режим работы, скорость вентилятора.
- **Расширенные функции** : мощный режим, экономичный режим, управление качанием (вертикальное/горизонтальное).
- **Мониторинг состояния** : текущая температура внутри и снаружи помещения, потребление электроэнергии, состояние устройства.
- **Дополнительные функции** : Wi-Fi светодиодная подсветка, режим низкого уровня шума, датчик присутствия человека, энергосберегающий вентилятор.
- **Поддержка нескольких устройств** : возможность подключения неограниченного количества кондиционеров.
- **Автоматические обновления** : настраиваемый интервал опроса для обновления статуса.

### Требования

- Кондиционер Fujitsu Airstage с модулем Wi-Fi
- Кондиционер должен быть доступен в локальной сети (LAN/WLAN).
- IP-адрес и идентификатор устройства (MAC-адрес) кондиционера.

### Установка

Установите адаптер через административный интерфейс ioBroker.

### Конфигурация

#### Как найти идентификатор устройства

Идентификатор устройства (Device ID) — это MAC-адрес модуля Wi-Fi **без двоеточий** :

- Пример MAC-адреса: `AA:BB:CC:DD:EE:FF`
- Идентификатор устройства для адаптера: `AABBCCDDEEFF`

Вы можете найти MAC-адрес:

- В приложении Fujitsu (например, FGLair)
- В списке подключенных устройств вашего маршрутизатора.
- На наклейке на модуле Wi-Fi

#### Определение IP-адреса

Вы можете найти IP-адрес кондиционера:

- В настройках вашего маршрутизатора в разделе DHCP-клиенты
- В приложении Fujitsu в разделе «Сведения об устройстве»

**Рекомендация** : Назначьте кондиционеру статический IP-адрес (резервирование DHCP) в настройках вашего маршрутизатора.

#### Настройки адаптера

1. Откройте конфигурацию адаптера в ioBroker.
2. Добавьте одно или несколько устройств:
   - **Название** : Название в произвольной форме (например, «Гостиная», «Спальня»)
   - **IP-адрес** : Локальный IP-адрес кондиционера (например, 192.168.1.100)
   - **Идентификатор устройства** : MAC-адрес без двоеточий (например, AABBCCDDEEFF)
3. **Интервал опроса** : определяет, как часто запрашивается статус (по умолчанию: 30 секунд).
4. Сохраните настройки и запустите экземпляр.

### Точки данных

Для каждого настроенного устройства создаются следующие точки данных:

#### Управление (доступно для записи)

| Точка данных         | Тип        | Описание                                                             |
| -------------------- | ---------- | -------------------------------------------------------------------- |
| `power`              | логический | Включение/выключение устройства                                      |
| `target_temperature` | число      | Целевая температура (16-30°C)                                        |
| `mode`               | нить       | Режимы работы: авто, охлаждение, обогрев, сушка, вентилятор          |
| `fan_speed`          | нить       | Скорость вращения вентилятора: авто, тихий, низкий, средний, высокий |
| `swing_vertical`     | логический | Вертикальный мах                                                     |
| `swing_horizontal`   | логический | Горизонтальное качание                                               |
| `powerful`           | логический | Мощный режим (быстрый нагрев/охлаждение)                             |
| `economy`            | логический | Экономичный режим (энергосбережение)                                 |
| `fan_ctrl`           | логический | Энергосберегающий вентилятор                                         |
| `outdoor_low_noise`  | логический | Режим пониженного уровня шума для наружного блока                    |
| `wifi_led`           | логический | Включение/выключение светодиода Wi-Fi                                |
| `min_heat`           | логический | Минимальный режим нагрева                                            |

#### Статус (только для чтения)

| Точка данных           | Тип        | Описание                                   |
| ---------------------- | ---------- | ------------------------------------------ |
| `current_temperature`  | число      | Текущая температура в помещении            |
| `outdoor_temperature`  | число      | Температура наружного воздуха              |
| `power_consumption`    | число      | Суммарное потребление энергии в Вт·ч       |
| `vertical_direction`   | нить       | Вертикальное направление воздушного потока |
| `vertical_increments`  | число      | Вертикальные приращения воздушного потока  |
| `horizontal_direction` | число      | Направление горизонтального потока воздуха |
| `human_detection`      | логический | Активно обнаружение людей                  |
| `online`               | логический | Устройство доступно                        |

### Поиск неисправностей

#### Устройство отображается как находящееся в автономном режиме.

- Убедитесь, что IP-адрес указан правильно.
- Проверьте, доступен ли кондиционер в сети (ping).
- Убедитесь, что идентификатор устройства указан правильно (12 шестнадцатеричных символов).
- Убедитесь, что соединение не блокируется брандмауэром.

#### Команды не выполняются.

- Проверьте журнал на наличие сообщений об ошибках.
- Для получения подробной информации повысьте уровень логирования до "отладочного".
- Убедитесь, что кондиционер не заблокирован вручную.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.4 (2026-09-20)
* (S. Bott) Fix `power_consumption` role mismatch with its unit (`value.power.consumed` → `value.energy.consumed`, matching the cumulative Wh value reported by the device)
* (S. Bott) Fix missing `Name`/`Device ID` i18n keys in admin table, and incorrect German placeholder text in 9 non-German languages
* (S. Bott) Fix `info.connection` object name not being corrected on existing installations

### 0.2.3 (2026-08-25)
* (S. Bott) Fix PR review findings: preserve custom object settings on restart, avoid overlapping polling calls, correct state roles
* (S. Bott) Clean up i18n keys in jsonConfig.json and translation files
* (S. Bott) Add link to official Fujitsu Airstage product page in README

### 0.2.2 (2026-07-07)
* (S. Bott) Fix vertical_direction write flag not applied on existing installations

### 0.2.1 (2026-07-07)
* (S. Bott) Fix vertical_direction: make writable to set fixed vane position

### 0.2.0 (2026-07-07)
* (S. Bott) Fix PR review findings: sendCommand, pollInterval validation, i18n, metadata
* (S. Bott) Add news translations for all ioBroker languages
* (S. Bott) Update dependencies, raise admin requirement to >=7.8.23

### 0.1.7 (2026-06-20)
* (S. Bott) Fix installation from GitHub: commit build output to repository

### 0.1.6 (2026-06-19)
* (S. Bott) Fix human_detection_auto_save: set write=true to match role switch
* (S. Bott) Fix repository checker errors (E0036, E5019)

### 0.1.5 (2026-06-14)
* (S. Bott) Fix 'no existing object' warnings when MAC address entered in lowercase
* (S. Bott) Fix typo: info.connected → info.connection

### 0.1.4 (2026-06-14)
* (S. Bott) Fix all repository checker errors and warnings (issue #86)
* (S. Bott) Add missing i18n translations for all languages
* (S. Bott) Add prettier.config.mjs, fix eslint config import
* (S. Bott) Remove redundant devDependencies (@typescript-eslint/*, eslint)
* (S. Bott) Upgrade to TypeScript 6 with required tsconfig migrations
* (S. Bott) Update all dependencies to latest versions

### 0.1.3 (2026-06-14)
* (S. Bott) Resolve all repository checker errors, warnings and suggestions from issue #84
* (S. Bott) Update Node.js requirement to >=22 and GitHub Actions to Node 24.x
* (S. Bott) Update @alcalzone/release-script packages to 5.2.0
* (S. Bott) Update admin dependency to >=7.6.20
* (S. Bott) Restructure README to English-only (ioBroker requirement)
* (S. Bott) Add English translations for jsonConfig
* (S. Bott) Replace setTimeout/setInterval with adapter methods
* (S. Bott) Configure Dependabot with 7-day cooldown
* (S. Bott) Update all dependencies to latest versions

### 0.1.1 (2026-01-03)
* (S. Bott) Fix ioBroker repository checker errors and warnings
* (S. Bott) Update dependencies (axios, sinon, typescript-eslint, etc.)
* (S. Bott) Fix setTimeout memory leak
* (S. Bott) Fix ESLint compatibility with TypeScript ESLint v8

### 0.1.0 (2025-12-31)
* (S. Bott) initial release

## License

MIT License

Copyright (c) 2026 S. Bott <stefan5232@gmx.de>

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