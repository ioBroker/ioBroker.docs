---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wolf-smartset/README.md
title: ioBroker.wolf-smartset
hash: /fAHrUoAIV+m6YdGp/L2QU9PWPyUeAI5pOafYsMDdcA=
---
![Логотип](../../../en/adapterref/iobroker.wolf-smartset/admin/wolf-smartset.png)

![версия НПМ](http://img.shields.io/npm/v/iobroker.wolf-smartset.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.wolf-smartset.svg)
![Количество установок (последнее)](http://iobroker.live/badges/wolf-smartset-installed.svg)
![Статус зависимости](https://img.shields.io/david/iobroker-community-adapters/iobroker.wolf-smartset.svg)
![Известные уязвимости](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.wolf-smartset/badge.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/wolf-smartset-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.wolf-smartset.png?downloads=true)

# IoBroker.wolf-smartset
![Тест и выпуск](https://github.com/iobroker-community-adapters/ioBroker.wolf-smartset/workflows/Test%20and%20Release/badge.svg)

## Адаптер wolf-smartset для ioBroker
Подключите Wolf Heating к iobroker.

Этот адаптер подключается к серверу Wolf Smartset (https://wolf-smartset.com) для мониторинга и управления вашим отопительным устройством Wolf. Это не локальное подключение. Преимущество в том, что вы можете использовать приложение Wolf Smartset или [Портал Wolf Smartset](https://wolf-smartset.com), а также получать или задавать значения параметров в ioBroker параллельно.

## Требования
Вам необходимо устройство отопления/климата Wolf, оснащенное модулем WLAN/LAN ISM7i (он же Link Home), подключенное к серверу Wolf Smartset, и учетная запись Wolf Smartset, авторизованная для вашего устройства.

## Настройки экземпляра адаптера
### Вкладка: Основные настройки
#### Учетная запись Wolf Smartset
Для подключения к серверу Wolf Smartset вам понадобится ваш

- `Имя пользователя` и
- `Пароль`

который вы также используете для входа в приложение Wolf Smartset или [Портал Wolf Smartset](https://wolf-smartset.com).

#### Устройство Волка
Ваша учетная запись Wolf связана с одним или несколькими устройствами Wolf. Для каждого устройства требуется отдельный экземпляр адаптера ioBroker.

После первой установки вам необходимо выбрать конкретный

- `Устройство` для каждого экземпляра.

Как только вы ввели действительные `Username` и `Password`,

- «Список устройств Wolf» будет заполнен устройствами, закрепленными за вашей учетной записью.

После выбора устройства из списка нажмите на

- «ИСПОЛЬЗОВАТЬ ЭТО УСТРОЙСТВО» для подтверждения выбора.

### Вкладка: Дополнительные настройки
Расширенные настройки позволяют вам адаптировать работу адаптера к вашим потребностям. Обычно вы можете оставить все расширенные настройки по умолчанию.

#### Интервалы цикла опроса и списки параметров
Адаптер будет - после подключения к серверу Wolf Smartset - периодически опрашивать значения параметров с сервера. Он поддерживает два независимых цикла опроса с различными интервалами цикла.

- `Short Poll Cycle Interval`: введите интервал в секундах. Сервер Wolf Smartset определяет абсолютный минимальный интервал опроса (в настоящее время 60 секунд), который вы не должны уменьшать. Если вы настроите значение ниже этого минимального интервала, сервер не ответит ожидаемым образом или даже может отключить ваш сеанс. Адаптер периодически запрашивает текущий минимальный интервал опроса у сервера. Если настроенный интервал опроса меньше минимального интервала опроса, указанного сервером, вы получите журнал предупреждений от адаптера, и вам следует соответствующим образом настроить интервал опроса.
- «Длительный интервал цикла опроса»: введите интервал в минутах для второго цикла опроса.

Сервер Wolf Smartset группирует различные параметры устройств в различные пакеты, идентифицируемые числовым BundleId. В пользовательском интерфейсе __ioBroker Admin__ вы найдете BundleId для различных групп параметров в представлении __Object__ под экземпляром __wolf-smartset__ на уровне канала.

- `Параметры пакета`: В этой таблице вы можете определить, какая группа значений параметров должна быть опрошена в каком цикле опроса. Хорошей идеей будет:
- «Включить в короткий цикл опроса» все быстро меняющиеся значения параметров (например, рабочие состояния) и
- «Включить в длинный цикл опроса» редко меняющиеся значения параметров (например, параметры конфигурации устройства).

API Wolf Smartset требует, чтобы каждый запрос на опрос включал — помимо списка параметров для опроса — также BundleId. Не совсем понятно, как BundleId соотносится с фактическим списком параметров, но в большинстве случаев «Default» должно быть нормально: он сопоставляется с наибольшим выбранным BundleId для данного цикла опроса. Любые другие настройки здесь предназначены для экспериментального использования. Настройте BundleId для использования в качестве:

- `BundleId для короткого цикла опроса`
- `BundleId для длинного цикла опроса`

#### Экспортировать вход
API Wolf Smartset определяет два уровня доступа для параметров устройства: __User__ и __Expert__. Соответственно, в представлении __Object__ пользовательского интерфейса __ioBroker Admin__ вы найдете соответствующие два поддерева: __Benutzer__ и __Fachmann__. После первоначальной аутентификации адаптер находится в пользовательском режиме и получит все доступные значения параметров только один раз во время инициализации. После этого во время периодических опросов он будет получать только обновления для значений параметров уровня пользователя (т. е. значения в дереве __Benutzer__).

Если вы проверите

- `Выполнить экспертный вход` и ввести правильный
- `Экспертный пароль`,

адаптер выполнит вход в систему эксперта во время инициализации, а также будет получать периодические обновления значений параметров экспертного уровня (как показано в дереве __Fachmann__) во время цикла опроса, с которым они связаны.

__!!! Важное примечание по уровню эксперта: Начало !!!__

Уровень Expert, похоже, ведет себя как ящик Пандоры! Тесты показали, что после включения уровня Expert выйти из него довольно сложно. Хотя адаптер полностью выйдет из системы и удалит все локально кэшированные данные аутентификации (токены OpenId и идентификатор сеанса) при отключении настройки `Do Expert Login` и перезапуске экземпляра, похоже, что этого недостаточно для сервера Wolf Smartset.

```
In fact, only a change of the adapter's public IP address in combination with an adapter instance reload might get the adapter back to User level.
```

Хотя на первый взгляд пребывание в режиме эксперта не кажется слишком проблематичным, есть по крайней мере один побочный эффект, который может стать для вас реальной проблемой:

```
In Expert mode some pre-period statistics might not be updated reliably from Wolf Smartset server!
```

Это влияет, в частности, на следующие ParameterIds и, возможно, также на другие:

```
- wolf-smartset.0.Benutzer.Heizung.212_Statistik_Wärmeerzeuger 1.27017500001
- wolf-smartset.0.Benutzer.Heizung.212_Statistik_Wärmeerzeuger 1.27017600001
- wolf-smartset.0.Benutzer.Heizung.212_Statistik_Wärmeerzeuger 1.27017700001
```

Итак, если вы полагаетесь на постоянную и точную доставку таких статистических значений до периода, вам следует дважды подумать, стоит ли проверять `Do Expert Login`. Не жалуйтесь, если у вас возникнут проблемы с возвращением на уровень пользователя, вас предупредили!

__!!! Важное примечание по уровню эксперта: Конец !!!__

#### Проверьте наличие изменений публичного IP-адреса
Сервер Wolf Smartset распознает клиентский IP-адрес. Это означает, что он связывает некоторую информацию о состоянии приложения с публичным IP-адресом клиентского приложения. Таким образом, если вы настроили `Do Expert Login` и публичный IP-адрес адаптера изменился (например, после перезагрузки маршрутизатора), адаптеру придется повторно аутентифицироваться на сервере Wolf Smartset, чтобы снова включить режим Expert. Поскольку адаптер будет выполнять повторную аутентификацию только каждый час, может пройти до __одного часа, пока адаптер снова не перейдет в режим Expert__.

Если это слишком долго для вас, вы можете проверить

- `Включить проверку публичного IP`: в этом случае адаптер будет проверять ваш публичный IP-адрес через [ipify.org](https://ipify.org) __каждый 4-й цикл короткого опроса__ и запустит повторную аутентификацию при изменении. Таким образом, адаптер вернется в режим Expert __самое позднее после 4 циклов короткого опроса__.

#### API-профилирование
Профилирование API позволяет отслеживать использование API Wolf Smartset адаптера. Если вы

- «Включить профилирование API», адаптер обновит следующие объекты в __дереве объектов экземпляра адаптера__ для каждого запроса опроса:
- инфо_апи
- poll_req_bundle_id: BundleId, используемый в запросе опроса
- poll_req_num_params: количество параметров, запрошенных адаптером
- poll_resp_num_params: количество параметров, возвращаемых сервером
- poll_resp_num_params: количество значений параметров, возвращаемых сервером (возвращаемые параметры могут иметь или не иметь связанное значение)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.0.0 (2025-04-02)
- (flingo64) BREAKING CHANGE: Please reenter your login credentials.
- (mcm1957) Adapter requires node.js 20, js-controller 6 and admin 7 now.
- (flingo64) A general code cleanup and partial rewrite has been done.
- (flingo64) Trigger re-initalization has been added, if api returns an error (server might be down temporarily).
- (flingo64) Expert login and periodic re-login have been added (#242).
- (flingo64) Support for level 3 objects `time programs` / `party mode` / `vacation mode` has been added.
- (flingo64) Request UserInfo from Wolf server, check whether adapter instance's poll interval meets requirements (60 sec) added.
- (flingo64) ParameterId lists for each Wolf BundleId created and show `BundleIds` for each channel added
- (flingo64) Support for two sepearate poll cycles to avoid server abuse reactions has been added. 
- (flingo64) Switched AdminUI to `jsconConfig`.

### 2.0.0-internal
- (flingo64) further internal changes omitted from news section due to size limitations
  - Demystified (decoded) API constants (array _021a[])
  - All API strings (URL, paths, params) as constants
  - Fixed various typechecker and eslint/prettier warnings
  - Replaced deprecated ioBroker async functions by sync function equivalents
  - Re-ordered and renamed private functions in main.js and admin/wss.js
  - Reorganized adapter initialization / openIdInit for more robust error handling
  - Added openId logout on instance unload to force a fresh AuthN on next adapter start
  - Added API Profiling option to track requested BundleId / # of requested params and # of returned params / # of returned values
  - Migrated translations from words.js to i18n
  - Added complete translation for all adapter instance setting strings
  - Disabled code for caching of auth data to allow a clean re-auth when required by server or on adapter reload
  - Added optional Check for public IP changes for faster Wolf Smartset expert session recovery
  - README: added descriptions on all instance settings and adpater operation

### 1.2.4 (2024-12-22)
- (flingo64) Bugfix for issues #281, #329, #365, #406: ioBroker object limits min/max use Wolf Smartset Min/MaxValueCondition if available, otherwise use Min/MaxValue now.
- (flingo64) Added some comments on Wolf Smartset ControlTypes
- (flingo64) Modified misspelled variable name to 'SubMenuEntry'
- (flingo64) Add NamePrefix, if exists, to object names (e.g. 'A1: ', 'WP001: ') for better parameter identification
- (mcm1957) Adapter has been adapted to @iobroker/eslint-config and eslint 9.x.
- (mcm1957) Dependencies have been updated

### 1.2.3 (2024-04-29)
- (mcm1957) Dependencies have been updated

### 1.2.2 (2024-04-22)
- (flingo64) A crash during re-authentication has been fixed. OpenIdInit will be called only once to avoid endless loop during re-authentication.

### 1.2.1 (2024-04-19)
- (flingo64) Initialization added to openId. This fixes GET_AUTH_TOKEN_ERROR [#304, #330]

### 1.2.0 (2024-04-19)
- (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
- (mcm1957) Dependencies have been updated

### 1.1.1 (2023-01-26)
* (Apollon77) Adjusted to new Login procedure
* (Apollon77) Tokens are now stored and tried to be refreshed automatically
* (Apollon77) Errors in session updates will try to create new session or authenticate anew
* (Apollon77) Generates folder and channel structures for created states
* (Apollon77) Fix some more crash cases
* (Apollon77) make sure adapter is stopped correctly in all cases

### 1.0.0 (2021-07-31)
* (MeisterTR) fix Sentry: IOBROKER-WOLF-SMARTSET-6,IOBROKER-WOLF-SMARTSET-5, IOBROKER-WOLF-SMARTSET-7,IOBROKER-WOLF-SMARTSET-8,IOBROKER-WOLF-SMARTSET-1,IOBROKER-WOLF-SMARTSET-3,IOBROKER-WOLF-SMARTSET-4
* (MeisterTR) Change api from app data to Web PEASE DELETE ADAPTER AND REINSTALL OR DELETE ALL OBJECTS
* (MEISTERTR) added "FACHMANN" states

### 0.2.2 (26.03.2021)
* (MeisterTR) fix timeouts, fix conection

### 0.2.1
* (MeisterTR) Rebuild api and objects, breaking change

### 0.1.2
* (MeisterTR) Poll and set Values
* (MeisterTR) Fix error at start

### 0.1.0
* (MeisterTR) First running Version, Poll Param Only

## License
MIT License

Copyright (c) 2024-2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2021-2023 MeisterTR <meistertr.smarthome@gmail.com>

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