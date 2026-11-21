---
chapters: {"pages":{"en/adapterref/iobroker.bluelink/README.md":{"title":{"en":"ioBroker.bluelink"},"content":"en/adapterref/iobroker.bluelink/README.md"},"en/adapterref/iobroker.bluelink/README_de.md":{"title":{"en":"ioBroker.bluelink (Deutsche Dokumentation)"},"content":"en/adapterref/iobroker.bluelink/README_de.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.bluelink/README.md
title: ioBroker.bluelink
hash: jM7u+pIa1rHulH4yu5jAWuSs8202fD/wnvnPuqGB9E0=
---
![Логотип](../../../en/adapterref/iobroker.bluelink/admin/bluelink.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.bluelink.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.bluelink.svg)
![Количество установок (последние)](https://iobroker.live/badges/bluelink-installed.svg)
![Количество установок (стабильных)](https://iobroker.live/badges/bluelink-stable.svg)
![Тестирование и выпуск](https://github.com/Newan/iobroker.bluelink/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/bluelink/svg-badge.svg)
![НПМ](https://nodei.co/npm/iobroker.bluelink.png?downloads=true)

# ioBroker.bluelink

**[Немецкая документация (README\_de.md)](/#/docs/adapterref/iobroker.bluelink/README_de.md)**

---

## Обзор

**ioBroker.bluelink** подключает автомобили **Hyundai (Bluelink)** и **Kia (Kia Connect / UVO)** к платформе ioBroker. Он поддерживает электромобили (EV), подключаемые гибриды (PHEV/HEV) и автомобили с двигателями внутреннего сгорания (ICE), включая современные модели (например, Kia EV3, EV6, EV9, Hyundai IONIQ 5, IONIQ 6, Kona).

### Основные характеристики

- **100% автоматизированный вход в систему без графического интерфейса (EU OneApp / CCI):** прямой вход с использованием адреса электронной почты и пароля вашей учетной записи — **без ручного создания токенов, без внешних скриптов, без взаимодействия с браузером, без QR-кода и без необходимости ввода капчи** .
- **Комплексная телеметрия:** уровень заряда (высоковольтная батарея и вспомогательная 12-вольтовая батарея), состояние здоровья (SoH), состояние зарядки, расчетный запас хода (DTE), одометр, состояние дверей/окон/багажника/капота, климат-контроль, предупреждения о низком давлении в шинах и история вождения.
- **Полное дистанционное управление:** блокировка/разблокировка дверей, запуск/остановка системы климат-контроля (включая температуру, размораживание и обогрев), запуск/остановка зарядки, а также установка предельных значений зарядки переменным/постоянным током.
- **Определение местоположения и обратное геокодирование:** GPS-координаты (`lat`, `lon`, `speed`), ссылка на Google Maps и, при желании, разрешение адреса улицы через OpenStreetMap.
- **Защита 12-вольтовой батареи:** по умолчанию опрашивает облачный кэш, не пробуждая автомобиль, в сочетании с настраиваемым мониторингом порогового значения 12-вольтовой батареи.

---

## Аутентификация и первоначальная настройка (Hyundai и Kia, ЕС)

### 1. Настройка в конфигурации адаптера.

Вам **не** нужно генерировать или вводить какой-либо токен вручную:

1. Выберите свой **бренд** (`Kia` или `Hyundai`), Тип **двигателя** (`EV`, `PHEV/MHEV`, или `Diesel/Benzin`), и **Язык приложения** .
2. Введите ваше **имя пользователя** (адрес электронной почты учетной записи), **пароль** и 4-значный **PIN-код** (используемый для дистанционного управления транспортным средством).
3. Сохраните и закройте конфигурацию экземпляра.

При запуске адаптер автоматически выполняет аутентификацию **OneApp / Connected Car Infrastructure (CCI)** в режиме без графического интерфейса и управляет зашифрованными токенами сессии внутри системы.

> **Важно:** **Не** запускайте сторонние скрипты для генерации токенов (например, `bluelink_refresh_token` Эти скрипты используют устаревший протокол аутентификации OAuth, который блокируется брандмауэром Hyundai/Kia. `HTTP 403 Forbidden`) и может временно блокировать или ограничивать скорость вашего домашнего IP-адреса.

### 2. Как работает автоматическая аутентификация

Поскольку компании Hyundai и Kia навсегда отключили устаревшую европейскую точку входа OAuth, адаптер использует собственный интегрированный **менеджер токенов OneApp / CCI** . `lib/tokenManager.js`):

1. **Инициализация сессии:** Инициализирует собственную мобильную сессию на `idpconnect-eu.kia.com` /`idpconnect-eu.hyundai.com` Использование идентификатора клиента OneApp без перехода по внешним переадресациям в веб-браузере (что предотвращает появление запросов Captcha/QR-кода в браузере).
2. **Шифрование паролей RSA:** Извлекает текущий открытый ключ RSA сервера (`/auth/api/v1/accounts/certs`) и шифрует ваш пароль локально с помощью RSA-PKCS1v1.5.
3. **Вход в систему без графического интерфейса:** отправляет зашифрованные учетные данные в `/auth/account/signin` и получает код авторизации OAuth напрямую через HTTP 302.
4. **Получение подписанного токена CCI:** Обмен кода авторизации на набор токенов OneApp CCI (`/auth/v1/token`), подписано с использованием требуемого HMAC-SHA256 `X-Fingerprint`.
5. **Обмен токенов CCS:** Обмен токенов CCI осуществляется через `/auth/v1/token-exchange?serviceType=CCS` для токена CCS Bearer, используемого API телематики транспортных средств и дистанционного управления.
6. **Автоматическое обновление:** При последующих перезапусках адаптера или по мере приближения срока действия токена адаптер автоматически обновляет сессию. `/auth/v2/token-refresh` и переключается на полный вход по паролю только в том случае, если срок действия токена обновления истек.

### 3. Устранение неполадок со входом в систему

- **Ожидается подтверждение условий обслуживания/согласие учетной записи:** если в журнале отображается сообщение об этом. `Account consent or verification is required` Откройте официальное **приложение Kia** или **Hyundai Bluelink** на своем смартфоне, войдите в систему и примите все обновленные Условия обслуживания или уведомления о конфиденциальности. После этого перезапустите адаптер ioBroker.
- **Временная блокировка IP-адреса (`HTTP 403 Forbidden`) или Медленный вход в систему:** Повторные неудачные попытки входа (особенно с устаревших версий адаптера или внешних скриптов, таких как `bluelink_refresh_token` Это может привести к тому, что брандмауэр производителя (WAF) временно ограничит или заблокирует публичный IP-адрес вашего интернет-соединения. Остановите все внешние скрипты, подождите 30–60 минут (или переподключите маршрутизатор, чтобы получить новый публичный IP-адрес) и позвольте адаптеру самостоятельно войти в систему.
- **Повторная загрузка токена вручную:** Вы можете инициировать повторную загрузку токена в любое время во время выполнения, установив соответствующее состояние. `bluelink.0.info.fetchToken` к `true`.

---

## Параметры конфигурации

| Параметр                                                           | Описание                                                                                                                                                                                                                      |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Бренд**                                                          | Производитель транспортных средств (`Kia` или `Hyundai`).                                                                                                                                                                     |
| **Мотор**                                                          | Тип трансмиссии: `EV` (электрический от батареи), `PHEV/MHEV` (гибрид) или `Diesel/Benzin` (сгорание).                                                                                                                           |
| **максимальный запас хода в км**                                   | Максимальный запас хода на электротяге в км (отображается и используется только для подключаемых гибридов).                                                                                                                   |
| **Язык приложений**                                                | Язык, используемый для ответов API (`DE`, `EN`, `NL`, `IT`, `ES`, `PL`).                                                                                                                                                     |
| **Имя пользователя**                                               | Адрес электронной почты вашей учетной записи Kia Connect или Hyundai Bluelink.                                                                                                                                                |
| **Пароль**                                                         | Пароль учетной записи (хранится в зашифрованном виде через ioBroker).                                                                                                                                                         |
| **Приколоть**                                                      | Четырехзначный защитный PIN-код, настроенный в мобильном приложении (хранится в зашифрованном виде).                                                                                                                          |
| **Получать историю ежедневных поездок**                            | Получает ежедневную историю поездок и потребления энергии (только для электромобилей, требуется около 3 запросов к API в день).                                                                                               |
| **Прекратите обновление, если заряд 12-вольтовой батареи ниже...** | Защищает вспомогательную 12-вольтовую батарею от глубокого разряда.                                                                                                                                                           |
| **Запрос максимум 400**                                            | Количество ежедневных запросов на проверку состояния, распределенных на 24 часа (например) `100` = примерно каждые 14,4 минуты). Максимальное значение составляет `400` чтобы оставаться в пределах лимитов производительности. |
| **errorCounter**                                                   | Количество ошибок, допустимых подряд до регистрации ошибки и приостановки до следующего цикла.                                                                                                                                |
| **Определите адрес по координатам.**                               | Использует OpenStreetMap (Nominatim) для преобразования GPS-координат в удобочитаемый адрес улицы. `vehicleLocation.position_text`).                                                                                          |

---

## Состояния и пульты дистанционного управления

### Состояние адаптера и аутентификации (`info.*`)

| Состояние               | Роль / Тип                         | Описание                                                                                         |
| ----------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------ |
| `info.connection`       | `indicator.connected` (`boolean`) | `true` при авторизации и подключении к облачному API.                                            |
| `info.tokenType`        | `text` (`string`)                 | Активный режим аутентификации (`cci` для потока EU OneApp/CCI, `legacy` (для устаревших токенов). |
| `info.tokenExpiry`      | `text` (`string`)                 | Метка времени ISO-8601, указывающая дату истечения срока действия текущего токена доступа CCS.   |
| `info.lastTokenRefresh` | `value.time` (`number`)           | Временная метка Unix (мс) последнего успешного входа в систему или обновления токена.            |
| `info.fetchToken`       | `button` (`boolean`)              | Установить на `true` (`ack: false`) для ручного запуска немедленного обновления токена.          |

### Пульты дистанционного управления для транспортных средств (`<VIN>.control.*`)

| Состояние                           | Тип / Роль              | Описание                                                                                                                                                                                          |
| ----------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `control.lock`                      | `boolean` (`button`)   | Запирает двери автомобиля.                                                                                                                                                                        |
| `control.unlock`                    | `boolean` (`button`)   | Открывает двери автомобиля.                                                                                                                                                                       |
| `control.charge`                    | `boolean` (`button`)   | Начинается зарядка автомобиля.                                                                                                                                                                    |
| `control.charge_stop`               | `boolean` (`button`)   | Прекращает зарядку автомобиля.                                                                                                                                                                    |
| `control.charge_limit_slow`         | `number` (`indicator`) | Целевой предел SoC (`50` –`100` %) для медленной зарядки переменным током.                                                                                                                        |
| `control.charge_limit_fast`         | `number` (`indicator`) | Целевой предел SoC (`50` –`100` %) для быстрой зарядки постоянным током.                                                                                                                          |
| `control.clima.start`               | `boolean` (`button`)   | Запускается предварительная подготовка (климат-контроль) с использованием параметров, указанных ниже. `control.clima.set.*`.                                                                      |
| `control.clima.stop`                | `boolean` (`button`)   | Отключает предварительную подготовку (климат-контроль).                                                                                                                                           |
| `control.clima.set.airTemp`         | `number` (`indicator`) | Целевая температура в салоне в °C (по умолчанию: `18`).                                                                                                                                           |
| `control.clima.set.defrost`         | `boolean` (`state`)    | Включает функцию размораживания лобового стекла во время предварительного прогрева.                                                                                                               |
| `control.clima.set.heating`         | `number` (`state`)     | Включает обогрев рулевого колеса/заднего стекла (`1` = включено, `0` = выключено).                                                                                                                 |
| `control.force_refresh_from_server` | `boolean` (`button`)   | Получает последнюю кэшированную информацию о состоянии с облачного сервера Hyundai/Kia ( **не активирует автомобиль** ).                                                                          |
| `control.force_refresh_from_car`    | `boolean` (`button`)   | Активирует автомобиль через мобильную сеть для запроса текущего состояния и GPS ( **использует 12-вольтовую батарею** ).                                                                          |
| `control.force_location`            | `boolean` (`button`)   | Запрашивает обновление GPS-координат в режиме реального времени непосредственно у транспортного средства.                                                                                         |
| `control.force_update`              | `boolean` (`state`)    | Управляет периодическим опросом: `false` (по умолчанию) = только кэш сервера; `true` = разбудить машину на каждом столбе ( **не рекомендуется** ).                                                  |
| `control.batteryControlState12V`    | `number` (`state`)     | Минимальный пороговый уровень заряда батареи 12 В в % (по умолчанию: `65` Ниже этого значения активные пробуждения автомобиля блокируются, если автомобиль не находится в движении или на зарядке. |

### Телеметрия транспортного средства (`<VIN>.*`)

- ** `<VIN>.vehicleStatus.battery.*`:**
  - `soc`: Уровень заряда высоковольтной батареи `%`.
  - `soh` Состояние высоковольтной батареи `%`.
  - `charge`: `true` если автомобиль в данный момент заряжается.
  - `plugin`: Состояние подключения зарядного устройства (`0` = отключено, `1` = DC быстродействующий, `2` = портативный/ICCB, `3` = настенная станция/блок переменного тока).
  - `minutes_to_charged` Оставшееся время зарядки в минутах.
  - `soc-12V`: Вспомогательная батарея 12 В. Уровень заряда. `%`.
- ** `<VIN>.vehicleStatus.*`:**
  - `dte` /`evModeRange` /`gasModeRange`: Предполагаемый оставшийся запас хода в `km`.
  - `doorLock`, `trunkOpen`, `hoodOpen`, `doorOpen.*`: Состояние блокировки и открытия/закрытия всех дверей, багажника и капота.
  - `airCtrlOn`, `airTemp`, `steerWheelHeat`, `sideBackWindowHeat` Текущее состояние климата и теплового режима.
- ** `<VIN>.vehicleLocation.*`:**
  - `lat`, `lon`, `speed` Текущие GPS-координаты и скорость.
  - `position_url` Прямая ссылка на местоположение транспортного средства в Google Maps.
  - `position_text`: Разрешенный адрес улицы (если включено разрешение OpenStreetMap).
- ** `<VIN>.odometer.value` Общий** пробег в `km`.
- ** `<VIN>.driveHistory.*`:** Статистика ежедневного и суммарного потребления энергии, рекуперации энергии и пройденного расстояния (EV).

---

## Сообщество и ссылки

- [Обсуждение на форуме ioBroker](https://forum.iobroker.net/topic/43592/adapter-hyundai-bluelink-oder-kia-uvo)
- [Вики GitHub](https://github.com/Newan/ioBroker.bluelink/wiki)

---

## Пожертвование

[![](https://www.paypalobjects.com/de_DE/DE/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick\&hosted_button_id=L55UBQJKJEUJL)

## Changelog
### 3.1.37 (2026-11-06)
* (meistermopper) Fall back to in-memory full CCI login when runtime CCI token refresh fails (`HTTP 401 code 9030 jwt-expired / Token expired`)
* (meistermopper) Remove obsolete manual Refresh Token / Fallback section from Admin UI and documentation since OneApp/CCI authentication is fully automatic
* (meistermopper) Add comprehensive English and German documentation for automated OneApp/CCI authentication, configuration options, and data points
* (meistermopper) Modernize Admin UI and i18n translations across all 11 supported languages
* (meistermopper) Fix shutdown race condition when saving rotated CCI tokens during adapter startup

### 3.1.36 (2026-11-01)
* (meistermopper) Fix EU login: enforce OneApp/CCI flow for European vehicles when username/password are provided
* (meistermopper) Integrate evcc-compatible Node TLS, cookie jar scoping, and IDP redirect hop handling
* (meistermopper) Add random device ID fallback if legacy device registration fails (hyundai_kia_connect_api #1342)
* (meistermopper) Add support for importing evcc token bundles into the refresh token field

### 3.1.35 (2026-10-15)
* (arteck) Fix EU Hyundai/Kia login

### 3.1.34 (2026-09-17)
* (arteck) fix location request

### 3.1.33 (2026-08-22)
* (ipod86) Fix EU Hyundai/Kia login

## License
MIT License

Copyright (c) 2025-2026 Newan <info@newan.de>

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