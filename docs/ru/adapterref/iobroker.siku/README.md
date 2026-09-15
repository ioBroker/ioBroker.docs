---
chapters: {"pages":{"en/adapterref/iobroker.siku/README.md":{"title":{"en":"ioBroker.siku"},"content":"en/adapterref/iobroker.siku/README.md"},"en/adapterref/iobroker.siku/RELEASING.md":{"title":{"en":"Releasing and official ioBroker inclusion"},"content":"en/adapterref/iobroker.siku/RELEASING.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.siku/README.md
title: ioBroker.siku
hash: FskwhJYi4W4+8s/rDdAZxJBvyQ3QUZwzy6F7xJnKeg0=
---
![Логотип](../../../en/adapterref/iobroker.siku/admin/siku.svg)

![Версия NPM](https://img.shields.io/npm/v/iobroker.siku.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.siku.svg)
![Количество установок](https://iobroker.live/badges/siku-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/siku-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.siku.png?downloads=true)
![Тестирование и выпуск](https://github.com/ChrMaass/ioBroker.siku/workflows/Test%20and%20Release/badge.svg)

# ioBroker.siku

## Обзор

Этот адаптер позволяет интегрировать бытовые вентиляционные устройства **SIKU RV V2** и совместимые устройства из серии **Oxxify smart** в систему ioBroker. Данная формулировка явно включает устройства, продаваемые под названиями **Oxxify.smart 30** , **Oxxify.smart 50** и **Oxxify.smart 50 K.**

Текущее состояние репозитория ориентировано на создание полностью функциональной **публичной бета-версии** для работы в локальной сети и официального ioBroker.`latest` приток.

## Функции

- UDP-связь на основе документированного протокола производителя.
- Поддержка нескольких устройств в **одном** экземпляре адаптера.
- Обнаружение широковещательных сообщений в локальной сети
- Административная страница на основе JSON-конфигурации для нескольких устройств
- По умолчанию выполняется отдельная проверка времени по RTC каждые 24 часа.
- Планирование работы RTC с сохранением работоспособности после перезапуска основано на временной метке последней попытки проверки.
- Синхронизация времени происходит только при превышении заданного порогового значения дрейфа.
- Управление основными рабочими параметрами на основе состояний.
- Полное еженедельное расписание, отображаемое через состояния ioBroker, с безопасным для размера пакетов чтением каждые 15 минут.
- Локализованные метки перечисления для скорости вращения вентилятора, режима работы вентилятора и режима таймера.
- Читаемые локальные состояния-спутники меток времени для меток времени опроса и обнаружения.
- Пароли для каждого устройства шифруются по пути вложенной конфигурации и защищены от обычного чтения конфигурационных файлов.
- Для предотвращения конфликтов UDP-портов на каждый хост ioBroker требуется один экземпляр адаптера.

## Поддерживаемые основные функции

- Обнаружение главных устройств посредством широковещательной рассылки (`0x007C` ,`0x00B9` )
- Управление несколькими устройствами с помощью стабильных идентификаторов устройств.
- Опрос состояния, показаний датчиков и диагностических параметров.
- Например, запись центральных параметров через состояния:
  - власть
  - скорость вентилятора
  - ручная регулировка скорости вентилятора
  - режим вентилятора
  - режим таймера
  - заданное значение влажности
  - флаги включения датчика
- Однократные команды сброса только для записи с последующим считыванием вместо небезопасных повторных попыток.
- Структура еженедельного расписания, например:
  - `schedule.monday.p1.speed`
  - `schedule.monday.p1.endHour`
  - `schedule.monday.p1.endMinute`
  - ... до`schedule.sunday.p4.*`
- Диагностические показатели, такие как:
  - обратный отсчет фильтра
  - часы работы
  - уровень тревоги
  - индикация замены фильтра
  - последнее открытие / последний опрос / последняя проверка времени

## Справочные данные по устройствам

Данный адаптер предназначен для семейства SIKU RV V2, включая **SIKU RV 50 W Pro WiFi V2** , совместимые устройства из серии **Oxxify Smart** и аналогичные устройства того же семейства протоколов.

В настоящее время в формулировках совместимости и поисковых запросах явно указаны **Oxxify.smart 30** , **Oxxify.smart 50** , **Oxxify.smart 50 K** , **Oxxify smart** , **Oxxify smart 30** , **Oxxify smart 50** , **Oxxify smart 50 K** , а также совместимые децентрализованные вентиляционные установки с рекуперацией тепла, управляемые через приложение.

- Страница товара производителя: [SIKU RV 50 W Pro WiFi V2](https://www.siku.at/SIKU-RV-50-W-Pro-WiFi-V2/50523)
- Обзор производителя: [продукция SIKU](https://www.siku.at/en/products/)
- Обзор совместимых серий: [децентрализованная вентиляция Oxxify](https://raumluft-shop.de/lueftung/dezentrale-lueftungsanlage-mit-waermerueckgewinnung/oxxify.html)
- Примеры совместимых продуктов: [Oxxify.smart 30](https://raumluft-shop.de/oxxify-smart-30.html) и [Oxxify.smart 50](https://raumluft-shop.de/oxxify-smart-50.html)
- Официальное описание мобильного приложения: [SIKU RV WIFI в App Store](https://apps.apple.com/at/app/siku-rv-wifi/id1444515926)

## Разработка

Полезные скрипты:

| Сценарий             | Цель                                                   |
| -------------------- | ------------------------------------------------------ |
| `npm run build`      | Скомпилируйте исходный код TypeScript.                 |
| `npm run check`      | Выполнить проверку типов без сборки                    |
| `npm run lint`       | Запустите ESLint                                       |
| `npm run test`       | Запустите модульные и пакетные тесты.                  |
| `npm run coverage`   | Обеспечивать и сообщать о покрытии тестов TypeScript.  |
| `npm run dev-server` | Запустите локальную среду разработки ioBroker.         |
| `npm run release`    | Создайте официальный релиз/тег с помощью release-tools |

Адаптер был создан с помощью официальных инструментов ioBroker и разработан на TypeScript.

## CI / CD

- В обычных запросах на слияние (pull requests) после проверки синтаксиса, типов и покрытия модульных тестов запускается упрощенный дымовой тест Ubuntu.
- В запросах на слияние Dependabot перед автоматическим объединением проверяется вся матрица поддерживаемых ОС/Node.js.
- `main` Запускает матрицу операционных систем Linux/macOS/Windows, необходимую для обработки данных из репозитория ioBroker.
- Для дополнительных проверок по-прежнему доступен отдельный запланированный/ручной рабочий процесс регрессионного тестирования в Windows, поскольку загрузка контроллера ioBroker в этом случае происходит значительно медленнее.
- Изменения, внесенные во время выполнения, могут автоматически получить версию исправления после успешного завершения процесса.`main` Запуск; документы, тесты, рабочие процессы и обновления зависимостей, предназначенные только для разработки, не создают пустые релизы.
- Помеченные тегами релизы публикуются в npm напрямую из GitHub Actions через функцию Trusted Publishing.
- Релизы GitHub создаются автоматически с помощью сгенерированных примечаний к релизу в рамках стандартного действия развертывания ioBroker.

## Готовность к публикации

Краткий контрольный список для релизов и репозиториев доступен в [файле RELEASING.md](/#/docs/adapterref/iobroker.siku/RELEASING.md) .

## Заметки бета-версии

- Функции обнаружения, опроса, проверки времени и чтения расписания уже были протестированы на нескольких реальных устройствах.
- Тесты на запись в реальном времени намеренно были выполнены в консервативном режиме.
- Функции сети/сервисов, такие как перенастройка Wi-Fi, изменение пароля или сброс к заводским настройкам, намеренно не отображаются в обычном режиме записи.

## Расширенный API диалоговых окон сообщений

Адаптер предоставляет доступ к этим данным.`sendTo` Команды для скриптов и интеграций:

- `discover` : Запуск обнаружения широковещательных UDP-сообщений. Без явного пароля адаптер пытается использовать пароль по умолчанию и все настроенные пароли устройства (не более 16) в течение одного окна приема, длительностью не более 10 секунд. Обновления конфигурации возвращаются и применяются только для вызовов, маршрутизируемых из экземпляра ioBroker Admin; другие вызывающие получают`discoveryFoundNotSaved` .
- `syncTimeAll` : выполнить ручную проверку/синхронизацию RTC для всех настроенных устройств.
- `syncTimeDevice` : выполнить проверку/синхронизацию RTC вручную для одного настроенного устройства с помощью`deviceId` .
- `readDevice` : считывает выбранные необработанные параметры протокола из одного явно указанного целевого устройства IPv4/идентификатора устройства для диагностики.

Диагностика`readDevice` В ответе метаданные пакета и значения возвращаемых параметров сериализуются в виде шестнадцатеричных строк. Пароли устройств никогда не возвращаются; ответ содержит только...`passwordLength` .

Протокол UDP поставщика передает короткий пароль устройства без шифрования при передаче, в том числе во время обнаружения. Запускайте адаптер только в доверенной, изолированной локальной сети. Проверка источника администратора, описанная выше, является защитой маршрутизации сообщений при обработке конфигурации, а не барьером безопасности от вредоносного кода, уже работающего внутри ioBroker.

## Changelog

<!-- Release script placeholder for the next version. Keep this heading at the start of a line. -->
### **WORK IN PROGRESS**

### 0.2.3 (2026-07-26)

- Harden RTC scheduling, UDP shutdown/error handling, malformed response isolation, schedule write recovery and
  password/object lifecycle behavior.

### 0.2.2 (2026-07-11)

- Harden repository-checker compatibility for nested password protection, compact-mode CI scripts and release recovery.

### 0.2.1 (2026-07-10)

- Create the localized fan-speed text state object before writing its value.

### 0.2.0 (2026-07-10)

- Correct nested encryption and migration of per-device passwords from earlier beta versions.
- Harden UDP response correlation and write-only reset handling to prevent stale or repeated commands.
- Restrict fan-speed writes to protocol-defined values and expose localized enum labels.
- Persist the 24-hour RTC schedule across restarts and keep clock reads outside normal polling.
- Split weekly schedule reads into protocol-size-safe chunks and refresh them every 15 minutes.
- Extract the object factory and operation scheduler, expand tests and enforce coverage in CI.
- Modernize ioBroker dependencies, release actions and automatic patch-release classification.

### 0.1.8 (2026-06-09)

- Cleaned up unused Admin translations found during the adapter checklist review.
- Documented the advanced messagebox commands for script/integration use.
- Added a code-side upper bound for the RTC time sync drift threshold.

Older changelog entries are available in [CHANGELOG_OLD.md](https://github.com/ChrMaass/ioBroker.siku/blob/main/CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2026 Christian Maaß <christian@maass.it>

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