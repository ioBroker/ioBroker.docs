---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.openknx?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.openknx?label=npm%20downloads&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.openknx?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.openknx?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/iobroker-community-adapters/iobroker.openknx?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/iobroker-community-adapters/iobroker.openknx?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/iobroker.openknx?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/iobroker-community-adapters/iobroker.openknx?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/iobroker-community-adapters/iobroker.openknx?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/iobroker-community-adapters/iobroker.openknx/test-and-release.yml?branch=master&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.openknx.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/openknx-stable.svg
BADGE-Installed: http://iobroker.live/badges/openknx-installed.svg
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.openknx/README.md
title: ioBroker.openknx
hash: OLamgqmbjWOnyXZ5LhZ+B2tG2TBAluQSOPqDv4tLvmc=
---
![Логотип](../../../en/admin/openknx.png)

# IoBroker.openknx
## Функции
- Встроенная функция импорта файлов .knxproj (ETS4, ETS5, ETS6) с поддержкой паролей.
- Чтение/запись/передача/обновление флагов из объектов ETS ComObject.
- Вывод DPT из ComObjects при отсутствии DPT на уровне GA.
- Распределение комнат (перечисление комнат) в соответствии со структурой здания ETS.
- Импорт адресов групп в формате XML в качестве резервного варианта
- Защищенное туннелирование KNX IP через файл ключа .knxkeys или пароль
- Стабильный и надежный стек KNX на базе KNXUltimate
- Автоматическое кодирование/декодирование KNX-датаграмм для большинства DPT, чтение и запись в необработанном виде для остальных.
- Поддержка чтения, записи и ответа GroupValue
- Генерация псевдонимов для объединения значков действий и статусов в единый объект ioBroker.
- Прямая связь: подключите любое состояние ioBroker к адресу группы KNX.
- Поддерживает все стили адресации групп (3-уровневый, 2-уровневый, свободный).
- Бесплатный открытый исходный код, не зависит от облачных сервисов, работает в автономном режиме.

## Установка
Найдите "openknx" в списке адаптеров и установите его, нажав на символ "+".

## Конфигурация адаптера
![настройки](../../../en/adapterref/img/setting.png)

Нажмите «Сохранить и закрыть» или «Сохранить», чтобы перезапустить адаптер и применить изменения.

- **Обнаружение** — сканирует сеть на наличие всех доступных IP-шлюзов KNX. Рекомендуется сначала выбрать локальный сетевой интерфейс, а затем запустить обнаружение — IP-адрес, порт и физический адрес шлюза заполняются автоматически.
- **Локальный сетевой интерфейс IPv4** — сетевой интерфейс сервера ioBroker, который может взаимодействовать с IP-шлюзом KNX. Выберите его перед запуском обнаружения.
- **IP-адрес шлюза KNX** -- IP-адрес вашего шлюза KNX. Заполняется автоматически при обнаружении.
- **Порт** -- обычно 3671. Заполняется автоматически по результатам обнаружения.
- **Протокол** -- тип подключения к IP-шлюзу KNX. **Туннелирование UDP** является методом по умолчанию для большинства IP-интерфейсов и маршрутизаторов KNX (например, Weinzierl, MDT, ABB). **Туннелирование TCP** обеспечивает более надежное соединение и поддерживается более новыми шлюзами — рекомендуется, если доступно. **Многоадресная маршрутизация** подключается через маршрутизацию KNXnet/IP (многоадресная группа 224.0.23.12) и предназначена для IP-маршрутизаторов KNX, выступающих в качестве линейных соединителей — туннельное соединение не устанавливается, и несколько клиентов могут одновременно получать доступ.
- **Физический KNX-адрес** — индивидуальный адрес, используемый адаптером на шине KNX (например, 1.1.250). Должен быть настроен как дополнительный адрес в IP-интерфейсе в ETS и не должен использоваться другим устройством.
- **Минимальная задержка отправки между двумя кадрами [мс]** -- защищает шину KNX от перегрузки слишком быстрыми телеграммами. Увеличьте это значение, если в журнале появляются ошибки DISCONNECT_REQUEST (например, до 80-150 мс).
- **Используйте common.type boolean для однобитного перечисления вместо number** -- DPT-1 (переключение) представляется в ioBroker как логический тип (true/false) вместо number (0/1). Включите эту опцию для лучшей совместимости с виджетами VIS и скриптами, которые ожидают логические значения.
- **Считывание значений KNX при запуске** -- все объекты с флагом авточтения считываются с шины KNX при первом подключении после запуска адаптера для синхронизации текущих состояний.
- **не выдавать предупреждения по неизвестным адресам групп KNX** -- подавлять записи предупреждений в журнале при получении телеграмм для групп KNX, не настроенных в адаптере. Полезно в системах с большим количеством групп KNX, где в адаптере используется только их подмножество.
- **Стиль группового адреса** — определяет представление группового адреса в соответствии с вашей конфигурацией ETS. Поддерживаются все 3 стиля, которые преобразуются в 3-уровневый формат для хранения: 3-уровневый (1/3/5), 2-уровневый (1/25) или свободный (300). Объединенное имя группового адреса и группы должно быть уникальным в дереве объектов ioBroker.

### Импорт проекта ETS (.knxproj или .xml)
Диалоговое окно импорта принимает как файлы **.knxproj** (рекомендуется), так и файлы **.xml**.

#### Импорт .knxproj (рекомендуется)
Импортируйте файл проекта ETS напрямую. Это обеспечит получение наиболее полных данных:

1. В ETS сохраните свой проект (Файл > Сохранить). Файл .knxproj находится в каталоге вашего проекта ETS.
2. Если проект защищен паролем, введите пароль проекта в поле «Пароль» рядом с кнопкой импорта.
3. Загрузите файл .knxproj в адаптер через диалоговое окно импорта.
4. Импорт начинается немедленно и отображает приблизительный ход выполнения в зависимости от размера файла.

Преимущества по сравнению с импортом XML:

- **Флаги чтения/записи/передачи/обновления** из объектов ComObject (вместо значений по умолчанию read=true, write=true)
- **Вывод DPT** из ComObjects, если DPT не назначен для GA.
- **Назначение комнат** из структуры здания/местоположения ETS (автоматически создает перечисление комнат)
- **Флаг автоматического чтения**, полученный из флага ComObject ReadOnInit.
- Поддерживает проекты ETS4, ETS5 и ETS6 (включая проекты, защищенные паролем)
- В будущих версиях ETS все будет работать автоматически — обновление адаптера не требуется для новых патчей/минорных релизов ETS.

После успешного импорта файла .knxproj используйте функцию "Создать псевдонимы" ниже, чтобы связать групповые алгоритмы статуса с соответствующими групповыми алгоритмами действий.

#### Импорт XML (резервный вариант)
Если вы не можете использовать файл .knxproj, вы можете экспортировать адреса групп из ETS в формате XML:

![Как экспортировать адреса групп в формате XML в ETS](../../../en/adapterref/img/exportGA.png)

1. В ETS перейдите в раздел «Групповые адреса», выберите «Экспорт групповых адресов» и выберите «Экспорт XML в последней версии формата».

Формат ETS4 не поддерживается, он не содержит информации DPT.

2. Загрузите XML-файл экспорта ETS в адаптер через диалоговое окно импорта.
3. Импорт начинается немедленно, и по завершении предоставляется отчет о состоянии.

Подсказка: Если у вас разные подтипы DPT для GA и объектов связи, использующих его, ETS будет использовать наименьший номер DPT. Убедитесь, что все элементы используют желаемый тип данных. GA без базового типа DPT не может быть импортирован. Проекты ETS4 необходимо преобразовать в ETS5 или более позднюю версию с установленным типом DPT для GA.

#### Параметры импорта
- **Не перезаписывать существующие объекты IOB** — пропускать существующие объекты связи во время импорта, добавлять только новые.
- **Удаление существующих объектов IOB, отсутствующих в файле импорта ETS** -- удаление объектов из дерева ioBroker, которые больше не существуют в проекте ETS. Полезно для очистки после удаления GA в ETS.
- **Удалите все существующие объекты KNX перед импортом (чистый повторный импорт)** -- сначала удалите все объекты KNX, а затем импортируйте заново. Используйте это при реструктуризации проекта ETS.

### KNX Secure
![KNX Secure](../../../en/adapterref/img/knxsecure.png)

Адаптер поддерживает туннелирование KNX IP Secure. Настройка выполняется на вкладке "KNX Secure":

1. **Включить KNX Secure** — установите флажок.
2. **Файл ключей (.knxkeys)** — вставьте содержимое файла .knxkeys в текстовое поле. Файл экспортируется в ETS через Дополнительно > Экспорт KNX-ключей.
3. **Пароль файла ключа** — пароль, устанавливаемый при экспорте связки ключей в ETS.
4. **Альтернативный вариант: Пароль пользователя туннеля** — вместо файла ключа пароль туннеля можно ввести напрямую (из конфигурации проекта ETS IP-интерфейса).
5. **Интерфейс туннеля IA** — при необходимости укажите индивидуальный адрес интерфейса туннеля (например, 1.1.254).
6. **Идентификатор пользователя туннеля** — значение по умолчанию 2. Изменяйте его только в том случае, если на одном интерфейсе настроено несколько туннельных соединений.

### Псевдонимы и миграция GA
![Псевдонимы и миграция GA](../../../en/adapterref/img/alias.png)

В KNX для действий и статуса часто используются отдельные GA. Этот инструмент автоматически объединяет их в [Псевдонимы ioBroker](https://www.iobroker.net/#en/documentation/dev/aliases.md), так что чтение и запись осуществляются в одном объекте.

На вкладке предлагаются два варианта:

#### Вариант A: Псевдонимы (рекомендуется)
Создает объекты-псевдонимы ioBroker, объединяющие действие GA (запись) и статус GA (чтение) в один объект.

- **Регулярное выражение для идентификации статусов GA** — регулярное выражение для идентификации статуса GA по имени (например, с совпадением окончаний типа "status", "rm", "Rückmeldung"). Это же регулярное выражение используется как для генерации псевдонимов (Вариант A), так и для режима совместимости с KNX (Вариант B).
- **Минимальное сходство** — насколько строго алгоритм сопоставления фильтрует похожие записи (0 = приблизительное сходство, 1 = точное сходство).
- **Путь к псевдонимам** -- папка с объектами, где создаются псевдонимы (например, `alias.0.KNX`).
- **Включить диапазон групп в поиск** -- используйте полный путь, включая названия групп, для сопоставления, а не только название GA.
- **Сгенерировать псевдонимы** -- кнопка для запуска генерации псевдонимов. Адаптер должен быть запущен. По завершении отображается количество сгенерированных псевдонимов.

#### Вариант B: Миграция адаптера knx
Для пользователей, переходящих со старого адаптера KNX, которые хотят, чтобы существующие скрипты, проекты VIS и панели мониторинга продолжали работать без изменений.

- **Режим совместимости ioBroker.knx** -- внутренне связывает GA статуса с GA действия (как в старом адаптере knx) вместо создания псевдонимов. Использует то же регулярное выражение, что и вариант A.
- **Целевое пространство имен** -- установите значение `knx.0`, чтобы повторно использовать старые пути к объектам адаптера KNX, благодаря чему существующие скрипты, проекты VIS и панели мониторинга продолжат работать без изменений. Значение по умолчанию — `openknx.0`.

### GA-Tools / Прямая ссылка
![GA-Tools / Прямая ссылка](../../../en/adapterref/img/gatools.png)

Технология Direct Link соединяет любое состояние ioBroker (с любого адаптера) с групповым адресом KNX. Изменения во внешнем состоянии записываются в шину KNX, а значения, полученные от KNX, передаются обратно во внешнее состояние.

Выберите Google Analytics из дерева слева. На панели свойств отображаются метаданные Google Analytics (имя, адрес, DPT, флаги). Используйте карточку «Прямая ссылка» справа, чтобы связать иностранный штат.

#### Режимы связи
- **Прямой (1:1)** — каждое изменение значения передается в шину KNX без изменений. Используется для датчиков, диммеров или ползунков.
- **Триггер (только ВКЛ.)** -- передаются только истинные значения (ВКЛ. / true / ненулевое значение), ложные значения (ВЫКЛ. / false / 0) игнорируются. Используется для триггеров сцен или открывателей дверей, где источник отправляет ВКЛ./ВЫКЛ. (нажатие/отпускание).
- **Переключение (инвертирование KNX в положении ВКЛ)** -- при каждом истинном значении считывается текущее состояние KNX и отправляется инвертированное значение. Ложные значения игнорируются. Используйте для кнопок, которые должны включать/выключать индикатор KNX.

#### Порог
Минимальное изменение, необходимое перед отправкой на шину KNX. Если абсолютная разница между входящим значением и текущим значением KNX меньше порогового значения, обновление незаметно отбрасывается. Это предотвращает перегрузку шины источниками, отправляющими множество небольших инкрементальных изменений (например, аналоговыми датчиками). Применяется только к числовым значениям. Оставьте поле пустым, чтобы отправлять каждое изменение.

#### Преобразовать выражение
Выражение JavaScript для преобразования значения перед записью в KNX. Переменная `value` хранит текущее значение для записи. Примеры:

- `!!value` -- преобразует любое истинное/ложное значение в логическое.
- `value*100` -- масштабирование числа с плавающей запятой от 0 до 1 в процентное значение от 0 до 100
- `value>0?100:0` -- преобразование порогового значения в двоичный код
- `Math.round(value)` -- округляет значения с плавающей запятой

Выражение convert применяется только в направлении от внешнего состояния к KNX. В обратном направлении (от KNX к внешнему состоянию) значения передаются без преобразования.

## Переход с адаптера knx
Самый простой способ: установите **целевое пространство имен** в `knx.0` в настройках псевдонима. Все существующие скрипты, проекты VIS и панели мониторинга будут автоматически использовать объекты openknx — ручной поиск/замена не потребуется.

Если это невозможно, ссылки на `knx.0.` необходимо вручную заменить на `openknx.0.` в соответствующих инструментах (экспорт/импорт потоков Node Red, проекты VIS, скрипты, панели мониторинга Grafana).

## Концепции автобуса KNX
### Флаги подтверждения (ACK) при туннельных соединениях
Приложениям не следует устанавливать флаг ack. Адаптер устанавливает флаг ack, когда данные подтверждены:

| GA — это | устройство с флагом R | устройство без флага R | не подключено |
| --- | --- | --- | --- |
| Приложение отправляет GroupValue_Write | ack | ack | no ack |
| Приложение отправляет GroupValue_Read | подтверждение | нет подтверждения | нет подтверждения |

### Запись группового значения
Срабатывает при записи в коммуникационный объект в ioBroker. Также срабатывает при получении кадра записи на шине.

### GroupValue Read
Может быть активировано добавлением специального комментария или флага качества:

```javascript
setState(myState, { val: false, ack: false, c: "GroupValue_Read" });
setState(myState, { val: false, ack: false, q: 0x10 });
```

Примечание: Метод комментариев не работает с адаптером JavaScript. Используйте вместо него `q: 0x10`.

### Ответ GroupValue
Если `native.answer_groupValueResponse` установлено в значение true, адаптер отвечает сообщением GroupValue_Response на полученное сообщение GroupValue_Read. Этот флаг должен быть установлен только у одного объекта на шине.

### Сопоставление с флагами KNX
При импорте файлов .knxproj флаги считываются непосредственно из объектов ETS ComObject. При импорте XML применяются разумные значения по умолчанию.

| Флаг | Использование адаптера (.knxproj) | Использование адаптера (импорт XML) |
| --- | --- | --- |
| C: Коммуникация | всегда установлено | всегда установлено |
| R: Чтение | объект common.read | по умолчанию true |
| T: Передача | объект common.update | по умолчанию false |
| W: Запись | объект common.write | по умолчанию true |
| U: Обновление | собственный объект native.update | по умолчанию false |
| I: Инициализация | объект native.autoread | производный от DPT |

`native.answer_groupValueResponse` необходимо установить вручную при необходимости.

## Описание объекта ioBroker
Импорт из Google Analytics создает структуру папок в порядке основная группа/промежуточная группа. Адрес каждой группы становится объектом:

```json
{
    "_id": "path.and.name.to.object",
    "type": "state",
    "common": {
        "desc": "Basetype: 1-bit value, Subtype: switch",
        "name": "Aussen Melder Licht schalten",
        "read": true,
        "role": "state",
        "type": "boolean",
        "unit": "",
        "write": true
    },
    "native": {
        "address": "0/1/2",
        "answer_groupValueResponse": false,
        "autoread": true,
        "bitlength": 1,
        "dpt": "DPT1.001",
        "encoding": { "0": "Off", "1": "On" },
        "force_encoding": "",
        "signedness": "",
        "valuetype": "basic"
    }
}
```

Роли определяются на основе DPT (например, переключатель, уровень, дата). Для триггерных DPT, таких как номера сцен, параметр Autoread установлен в значение false.

## Ссылка на DPT
Поддерживаемые DPT: 1-22, 26, 28, 29, 213, 222, 232, 235, 237, 238, 242, 249, 251, 275.
Неподдерживаемые DPT записываются в виде шестнадцатеричных строк (исходные данные).

| KNX DPT | Тип | Описание |
| --- | --- | --- |
| DPT-1 | логическое значение | 1 бит, ложь/истина |
| DPT-2 | объект | {"priority":0/1, "data":0/1} |
| DPT-3 | объект | {"decr_incr":0/1, "data":0..7} |
| DPT-4 | строка | один 8-битный символ |
| DPT-5 | число | 8-битное беззнаковое (0..255); DPT-5.001: 0..100%, DPT-5.003: 0..360° |
| DPT-6 | число | 8-битное знаковое (-128..127) |
| DPT-7 | число | 16-битное беззнаковое |
| DPT-8 | число | 2-байтовый знаковый (-32768..32767) |
| DPT-9 | число | 2-байтовое число с плавающей запятой |
| DPT-10 | Дата | время (чч:мм:сс + день недели), часть даты игнорировать |
| DPT-11 | Дата | дата (дд/мм/гггг), часть времени не учитывать |
| DPT-12 | число | 4-байтовый беззнаковый |
| DPT-13 | число | 4-байтовый знаковый |
| DPT-14 | число | 4-байтовое число с плавающей запятой |
| DPT-15 | номер | 4-байтовый (данные доступа) |
| DPT-16 | строка | 14-символьная строка ASCII/ISO-8859-1 |
| DPT-17 | номер | номер сцены, не считывается автоматическим считыванием |
| DPT-18 | объект | {"save_recall":0/1, "scenenumber":0..63}, не считывается функцией авточтения |
| DPT-19 | Дата | дата + время, флаги качества не поддерживаются |
| DPT-20 | число | 1-байтовое перечисление |
| DPT-21 | объект | {"outOfService":bool, "fault":bool, "overridden":bool, ...} |
| DPT-22 | объект | статус RHCC |
| DPT-26 | строка | шестнадцатеричное значение, DPT_SceneInfo, не считывается функцией авточтения |
| DPT-28 | строка | Строка Unicode UTF-8, переменной длины |
| DPT-29 | строка | 8-байтовая знаковая (строка из-за ограничений на количество символов в JavaScript) |
| DPT-213 | объект | 4-байтовый временной период (часы, минуты, секунды) |
| DPT-222 | объект | 3x 2-байтовых числа с плавающей запятой |
| DPT-232 | объект | {красный:0..255, зеленый:0..255, синий:0..255} |
| DPT-235 | объект | тарифный счетчик активной энергии |
| DPT-237 | объект | Диагностика DALI |
| DPT-238 | объект | конфигурация сцены, не считывается функцией автоматического чтения |
| DPT-242 | объект | цвет xy (CIE 1931) |
| DPT-249 | объект | переход цветовой температуры |
| DPT-251 | объект | Цвет RGBW |
| DPT-275 | объект | смещение заданного значения температуры |
| другое | строка | шестнадцатеричная строка (исходные данные), например, "0102feff" |

Примечание о DPT для даты/времени: JavaScript и KNX используют разные базовые типы. DPT-10 возвращает объект JS Date, где часть, отвечающая за дату, игнорируется. DPT-11 возвращает объект JS Date, где часть, отвечающая за время, также игнорируется.

## Пример использования Node Red
Сложный тип данных DPT-2, передаваемый через функциональный узел, подключенный к выходному узлу ioBroker:

```javascript
msg.payload = { priority: 1, data: 0 };
return msg;
```

## Уровень лога
Включите экспертный режим для переключения между уровнями логирования. По умолчанию — информационный.
![уровень логирования](../../../en/adapterref/img/loglevel.png)

## Мониторинг
Openknx использует sentry.io для отслеживания ошибок (данные отправляются на сервер ioBroker Sentry в Германии, в псевдонимизированном виде).
Загрузка шины оценивается в объекте `info.busload`.

## Ограничения
— Поддерживается только IPv4

## ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ
**Автоматическое чтение запускает действия на шине.** Проверьте в ETS, установлен ли флаг R/L для групповых объектов, подключенных к GA. Потребители сигнала не должны иметь этот флаг. При необходимости отключите автоматическое чтение для соответствующего объекта.

**DISCONNECT_REQUEST при запуске** Увеличьте минимальную задержку отправки между двумя кадрами.

**Поддерживается ли защищенное туннелирование?** Да. Защищенное туннелирование KNX IP поддерживается с помощью файла ключа .knxkeys или пароля.

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.6 (2026-04-12)

- (TA2k) **breaking:** KNX communication switched to KNXUltimate
- (TA2k) **breaking:** DPT21 property names changed (outofservice → outOfService, inalarm → inAlarm, alarmeunack → alarmUnAck), values must be boolean
- (TA2k) **breaking:** DPT237 property names changed to camelCase
- (TA2k) feature: Native .knxproj import (ETS4/5/6, password-protected) with flags, DPT inference, room assignment
- (TA2k) feature: KNX Secure support
- (TA2k) feature: Extended DPT coverage and compatibility (9 additional DPTs, including DPT-22, 213, 222, 235, 242, 249, 251)
- (TA2k) feature: Improved connection stability
- (TA2k) feature: Improved role detection (switch, level, value, text, date) based on DPT type
- (TA2k) feature: Direct Link all iobroker states to a KNX state with a conversion mode
- (TA2k) feature: GA-Tools: all GA properties editable (DPT, type, role, flags) with compact layout

### 0.9.1 (2026-03-12)
- bugfix: Fixing increased delay in knx commands after several days
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (@klein0r) Adapter requires node.js >= 20 and js-controller >= 6 now

### 0.9.0 (2024-04-21)

- (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
- (mcm1957) Dependencies have been updated

### 0.8.0 (2024-03-30)

-   feature: put KNX interface name into log
-   bugfix: #419 wait for connection complete before data processing in case of receiving data before
-   bugfix: #457 Ack missing after changing IOB object value

### 0.7.3 (2024-03-05)

-   feature: one of the warnings is configurable in the dialog

### initial version

-   initial version from https://www.npmjs.com/package/iobroker.knx/v/0.8.3

## License

Copyright 2024 contributors to the ioBroker.openknx project

    				GNU GENERAL PUBLIC LICENSE

==========================  
Copyright Contributors to the ioBroker.openknx project

    				   Version 3, 29 June 2007


Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
Everyone is permitted to copy and distribute verbatim copies
of this license document, but changing it is not allowed.

    						Preamble

The GNU General Public License is a free, copyleft license for
software and other kinds of works.

The licenses for most software and other practical works are designed
to take away your freedom to share and change the works. By contrast,
the GNU General Public License is intended to guarantee your freedom to
share and change all versions of a program--to make sure it remains free
software for all its users. We, the Free Software Foundation, use the
GNU General Public License for most of our software; it applies also to
any other work released this way by its authors. You can apply it to
your programs, too.

When we speak of free software, we are referring to freedom, not
price. Our General Public Licenses are designed to make sure that you
have the freedom to distribute copies of free software (and charge for
them if you wish), that you receive source code or can get it if you
want it, that you can change the software or use pieces of it in new
free programs, and that you know you can do these things.

To protect your rights, we need to prevent others from denying you
these rights or asking you to surrender the rights. Therefore, you have
certain responsibilities if you distribute copies of the software, or if
you modify it: responsibilities to respect the freedom of others.

For example, if you distribute copies of such a program, whether
gratis or for a fee, you must pass on to the recipients the same
freedoms that you received. You must make sure that they, too, receive
or can get the source code. And you must show them these terms so they
know their rights.

Developers that use the GNU GPL protect your rights with two steps:
(1) assert copyright on the software, and (2) offer you this License
giving you legal permission to copy, distribute and/or modify it.

For the developers' and authors' protection, the GPL clearly explains
that there is no warranty for this free software. For both users' and
authors' sake, the GPL requires that modified versions be marked as
changed, so that their problems will not be attributed erroneously to
authors of previous versions.

Some devices are designed to deny users access to install or run
modified versions of the software inside them, although the manufacturer
can do so. This is fundamentally incompatible with the aim of
protecting users' freedom to change the software. The systematic
pattern of such abuse occurs in the area of products for individuals to
use, which is precisely where it is most unacceptable. Therefore, we
have designed this version of the GPL to prohibit the practice for those
products. If such problems arise substantially in other domains, we
stand ready to extend this provision to those domains in future versions
of the GPL, as needed to protect the freedom of users.

Finally, every program is threatened constantly by software patents.
States should not allow patents to restrict development and use of
software on general-purpose computers, but in those that do, we wish to
avoid the special danger that patents applied to a free program could
make it effectively proprietary. To prevent this, the GPL assures that
patents cannot be used to render the program non-free.

The precise terms and conditions for copying, distribution and
modification follow.

    				   TERMS AND CONDITIONS

0. Definitions.

"This License" refers to version 3 of the GNU General Public License.

"Copyright" also means copyright-like laws that apply to other kinds of
works, such as semiconductor masks.

"The Program" refers to any copyrightable work licensed under this
License. Each licensee is addressed as "you". "Licensees" and
"recipients" may be individuals or organizations.

To "modify" a work means to copy from or adapt all or part of the work
in a fashion requiring copyright permission, other than the making of an
exact copy. The resulting work is called a "modified version" of the
earlier work or a work "based on" the earlier work.

A "covered work" means either the unmodified Program or a work based
on the Program.

To "propagate" a work means to do anything with it that, without
permission, would make you directly or secondarily liable for
infringement under applicable copyright law, except executing it on a
computer or modifying a private copy. Propagation includes copying,
distribution (with or without modification), making available to the
public, and in some countries other activities as well.

To "convey" a work means any kind of propagation that enables other
parties to make or receive copies. Mere interaction with a user through
a computer network, with no transfer of a copy, is not conveying.

An interactive user interface displays "Appropriate Legal Notices"
to the extent that it includes a convenient and prominently visible
feature that (1) displays an appropriate copyright notice, and (2)
tells the user that there is no warranty for the work (except to the
extent that warranties are provided), that licensees may convey the
work under this License, and how to view a copy of this License. If
the interface presents a list of user commands or options, such as a
menu, a prominent item in the list meets this criterion.

1. Source Code.

The "source code" for a work means the preferred form of the work
for making modifications to it. "Object code" means any non-source
form of a work.

A "Standard Interface" means an interface that either is an official
standard defined by a recognized standards body, or, in the case of
interfaces specified for a particular programming language, one that
is widely used among developers working in that language.

The "System Libraries" of an executable work include anything, other
than the work as a whole, that (a) is included in the normal form of
packaging a Major Component, but which is not part of that Major
Component, and (b) serves only to enable use of the work with that
Major Component, or to implement a Standard Interface for which an
implementation is available to the public in source code form. A
"Major Component", in this context, means a major essential component
(kernel, window system, and so on) of the specific operating system
(if any) on which the executable work runs, or a compiler used to
produce the work, or an object code interpreter used to run it.

The "Corresponding Source" for a work in object code form means all
the source code needed to generate, install, and (for an executable
work) run the object code and to modify the work, including scripts to
control those activities. However, it does not include the work's
System Libraries, or general-purpose tools or generally available free
programs which are used unmodified in performing those activities but
which are not part of the work. For example, Corresponding Source
includes interface definition files associated with source files for
the work, and the source code for shared libraries and dynamically
linked subprograms that the work is specifically designed to require,
such as by intimate data communication or control flow between those
subprograms and other parts of the work.

The Corresponding Source need not include anything that users
can regenerate automatically from other parts of the Corresponding
Source.

The Corresponding Source for a work in source code form is that
same work.

2. Basic Permissions.

All rights granted under this License are granted for the term of
copyright on the Program, and are irrevocable provided the stated
conditions are met. This License explicitly affirms your unlimited
permission to run the unmodified Program. The output from running a
covered work is covered by this License only if the output, given its
content, constitutes a covered work. This License acknowledges your
rights of fair use or other equivalent, as provided by copyright law.

You may make, run and propagate covered works that you do not
convey, without conditions so long as your license otherwise remains
in force. You may convey covered works to others for the sole purpose
of having them make modifications exclusively for you, or provide you
with facilities for running those works, provided that you comply with
the terms of this License in conveying all material for which you do
not control copyright. Those thus making or running the covered works
for you must do so exclusively on your behalf, under your direction
and control, on terms that prohibit them from making any copies of
your copyrighted material outside their relationship with you.

Conveying under any other circumstances is permitted solely under
the conditions stated below. Sublicensing is not allowed; section 10
makes it unnecessary.

3. Protecting Users' Legal Rights From Anti-Circumvention Law.

No covered work shall be deemed part of an effective technological
measure under any applicable law fulfilling obligations under article
11 of the WIPO copyright treaty adopted on 20 December 1996, or
similar laws prohibiting or restricting circumvention of such
measures.

When you convey a covered work, you waive any legal power to forbid
circumvention of technological measures to the extent such circumvention
is effected by exercising rights under this License with respect to
the covered work, and you disclaim any intention to limit operation or
modification of the work as a means of enforcing, against the work's
users, your or third parties' legal rights to forbid circumvention of
technological measures.

4. Conveying Verbatim Copies.

You may convey verbatim copies of the Program's source code as you
receive it, in any medium, provided that you conspicuously and
appropriately publish on each copy an appropriate copyright notice;
keep intact all notices stating that this License and any
non-permissive terms added in accord with section 7 apply to the code;
keep intact all notices of the absence of any warranty; and give all
recipients a copy of this License along with the Program.

You may charge any price or no price for each copy that you convey,
and you may offer support or warranty protection for a fee.

5. Conveying Modified Source Versions.

You may convey a work based on the Program, or the modifications to
produce it from the Program, in the form of source code under the
terms of section 4, provided that you also meet all of these conditions:

    a) The work must carry prominent notices stating that you modified
    it, and giving a relevant date.

    b) The work must carry prominent notices stating that it is
    released under this License and any conditions added under section
    7.  This requirement modifies the requirement in section 4 to
    "keep intact all notices".

    c) You must license the entire work, as a whole, under this
    License to anyone who comes into possession of a copy.  This
    License will therefore apply, along with any applicable section 7
    additional terms, to the whole of the work, and all its parts,
    regardless of how they are packaged.  This License gives no
    permission to license the work in any other way, but it does not
    invalidate such permission if you have separately received it.

    d) If the work has interactive user interfaces, each must display
    Appropriate Legal Notices; however, if the Program has interactive
    interfaces that do not display Appropriate Legal Notices, your
    work need not make them do so.

A compilation of a covered work with other separate and independent
works, which are not by their nature extensions of the covered work,
and which are not combined with it such as to form a larger program,
in or on a volume of a storage or distribution medium, is called an
"aggregate" if the compilation and its resulting copyright are not
used to limit the access or legal rights of the compilation's users
beyond what the individual works permit. Inclusion of a covered work
in an aggregate does not cause this License to apply to the other
parts of the aggregate.

6. Conveying Non-Source Forms.

You may convey a covered work in object code form under the terms
of sections 4 and 5, provided that you also convey the
machine-readable Corresponding Source under the terms of this License,
in one of these ways:

    a) Convey the object code in, or embodied in, a physical product
    (including a physical distribution medium), accompanied by the
    Corresponding Source fixed on a durable physical medium
    customarily used for software interchange.

    b) Convey the object code in, or embodied in, a physical product
    (including a physical distribution medium), accompanied by a
    written offer, valid for at least three years and valid for as
    long as you offer spare parts or customer support for that product
    model, to give anyone who possesses the object code either (1) a
    copy of the Corresponding Source for all the software in the
    product that is covered by this License, on a durable physical
    medium customarily used for software interchange, for a price no
    more than your reasonable cost of physically performing this
    conveying of source, or (2) access to copy the
    Corresponding Source from a network server at no charge.

    c) Convey individual copies of the object code with a copy of the
    written offer to provide the Corresponding Source.  This
    alternative is allowed only occasionally and noncommercially, and
    only if you received the object code with such an offer, in accord
    with subsection 6b.

    d) Convey the object code by offering access from a designated
    place (gratis or for a charge), and offer equivalent access to the
    Corresponding Source in the same way through the same place at no
    further charge.  You need not require recipients to copy the
    Corresponding Source along with the object code.  If the place to
    copy the object code is a network server, the Corresponding Source
    may be on a different server (operated by you or a third party)
    that supports equivalent copying facilities, provided you maintain
    clear directions next to the object code saying where to find the
    Corresponding Source.  Regardless of what server hosts the
    Corresponding Source, you remain obligated to ensure that it is
    available for as long as needed to satisfy these requirements.

    e) Convey the object code using peer-to-peer transmission, provided
    you inform other peers where the object code and Corresponding
    Source of the work are being offered to the general public at no
    charge under subsection 6d.

A separable portion of the object code, whose source code is excluded
from the Corresponding Source as a System Library, need not be
included in conveying the object code work.

A "User Product" is either (1) a "consumer product", which means any
tangible personal property which is normally used for personal, family,
or household purposes, or (2) anything designed or sold for incorporation
into a dwelling. In determining whether a product is a consumer product,
doubtful cases shall be resolved in favor of coverage. For a particular
product received by a particular user, "normally used" refers to a
typical or common use of that class of product, regardless of the status
of the particular user or of the way in which the particular user
actually uses, or expects or is expected to use, the product. A product
is a consumer product regardless of whether the product has substantial
commercial, industrial or non-consumer uses, unless such uses represent
the only significant mode of use of the product.

"Installation Information" for a User Product means any methods,
procedures, authorization keys, or other information required to install
and execute modified versions of a covered work in that User Product from
a modified version of its Corresponding Source. The information must
suffice to ensure that the continued functioning of the modified object
code is in no case prevented or interfered with solely because
modification has been made.

If you convey an object code work under this section in, or with, or
specifically for use in, a User Product, and the conveying occurs as
part of a transaction in which the right of possession and use of the
User Product is transferred to the recipient in perpetuity or for a
fixed term (regardless of how the transaction is characterized), the
Corresponding Source conveyed under this section must be accompanied
by the Installation Information. But this requirement does not apply
if neither you nor any third party retains the ability to install
modified object code on the User Product (for example, the work has
been installed in ROM).

The requirement to provide Installation Information does not include a
requirement to continue to provide support service, warranty, or updates
for a work that has been modified or installed by the recipient, or for
the User Product in which it has been modified or installed. Access to a
network may be denied when the modification itself materially and
adversely affects the operation of the network or violates the rules and
protocols for communication across the network.

Corresponding Source conveyed, and Installation Information provided,
in accord with this section must be in a format that is publicly
documented (and with an implementation available to the public in
source code form), and must require no special password or key for
unpacking, reading or copying.

7. Additional Terms.

"Additional permissions" are terms that supplement the terms of this
License by making exceptions from one or more of its conditions.
Additional permissions that are applicable to the entire Program shall
be treated as though they were included in this License, to the extent
that they are valid under applicable law. If additional permissions
apply only to part of the Program, that part may be used separately
under those permissions, but the entire Program remains governed by
this License without regard to the additional permissions.

When you convey a copy of a covered work, you may at your option
remove any additional permissions from that copy, or from any part of
it. (Additional permissions may be written to require their own
removal in certain cases when you modify the work.) You may place
additional permissions on material, added by you to a covered work,
for which you have or can give appropriate copyright permission.

Notwithstanding any other provision of this License, for material you
add to a covered work, you may (if authorized by the copyright holders of
that material) supplement the terms of this License with terms:

    a) Disclaiming warranty or limiting liability differently from the
    terms of sections 15 and 16 of this License; or

    b) Requiring preservation of specified reasonable legal notices or
    author attributions in that material or in the Appropriate Legal
    Notices displayed by works containing it; or

    c) Prohibiting misrepresentation of the origin of that material, or
    requiring that modified versions of such material be marked in
    reasonable ways as different from the original version; or

    d) Limiting the use for publicity purposes of names of licensors or
    authors of the material; or

    e) Declining to grant rights under trademark law for use of some
    trade names, trademarks, or service marks; or

    f) Requiring indemnification of licensors and authors of that
    material by anyone who conveys the material (or modified versions of
    it) with contractual assumptions of liability to the recipient, for
    any liability that these contractual assumptions directly impose on
    those licensors and authors.

All other non-permissive additional terms are considered "further
restrictions" within the meaning of section 10. If the Program as you
received it, or any part of it, contains a notice stating that it is
governed by this License along with a term that is a further
restriction, you may remove that term. If a license document contains
a further restriction but permits relicensing or conveying under this
License, you may add to a covered work material governed by the terms
of that license document, provided that the further restriction does
not survive such relicensing or conveying.

If you add terms to a covered work in accord with this section, you
must place, in the relevant source files, a statement of the
additional terms that apply to those files, or a notice indicating
where to find the applicable terms.

Additional terms, permissive or non-permissive, may be stated in the
form of a separately written license, or stated as exceptions;
the above requirements apply either way.

8. Termination.

You may not propagate or modify a covered work except as expressly
provided under this License. Any attempt otherwise to propagate or
modify it is void, and will automatically terminate your rights under
this License (including any patent licenses granted under the third
paragraph of section 11).

However, if you cease all violation of this License, then your
license from a particular copyright holder is reinstated (a)
provisionally, unless and until the copyright holder explicitly and
finally terminates your license, and (b) permanently, if the copyright
holder fails to notify you of the violation by some reasonable means
prior to 60 days after the cessation.

Moreover, your license from a particular copyright holder is
reinstated permanently if the copyright holder notifies you of the
violation by some reasonable means, this is the first time you have
received notice of violation of this License (for any work) from that
copyright holder, and you cure the violation prior to 30 days after
your receipt of the notice.

Termination of your rights under this section does not terminate the
licenses of parties who have received copies or rights from you under
this License. If your rights have been terminated and not permanently
reinstated, you do not qualify to receive new licenses for the same
material under section 10.

9. Acceptance Not Required for Having Copies.

You are not required to accept this License in order to receive or
run a copy of the Program. Ancillary propagation of a covered work
occurring solely as a consequence of using peer-to-peer transmission
to receive a copy likewise does not require acceptance. However,
nothing other than this License grants you permission to propagate or
modify any covered work. These actions infringe copyright if you do
not accept this License. Therefore, by modifying or propagating a
covered work, you indicate your acceptance of this License to do so.

10. Automatic Licensing of Downstream Recipients.

Each time you convey a covered work, the recipient automatically
receives a license from the original licensors, to run, modify and
propagate that work, subject to this License. You are not responsible
for enforcing compliance by third parties with this License.

An "entity transaction" is a transaction transferring control of an
organization, or substantially all assets of one, or subdividing an
organization, or merging organizations. If propagation of a covered
work results from an entity transaction, each party to that
transaction who receives a copy of the work also receives whatever
licenses to the work the party's predecessor in interest had or could
give under the previous paragraph, plus a right to possession of the
Corresponding Source of the work from the predecessor in interest, if
the predecessor has it or can get it with reasonable efforts.

You may not impose any further restrictions on the exercise of the
rights granted or affirmed under this License. For example, you may
not impose a license fee, royalty, or other charge for exercise of
rights granted under this License, and you may not initiate litigation
(including a cross-claim or counterclaim in a lawsuit) alleging that
any patent claim is infringed by making, using, selling, offering for
sale, or importing the Program or any portion of it.

11. Patents.

A "contributor" is a copyright holder who authorizes use under this
License of the Program or a work on which the Program is based. The
work thus licensed is called the contributor's "contributor version".

A contributor's "essential patent claims" are all patent claims
owned or controlled by the contributor, whether already acquired or
hereafter acquired, that would be infringed by some manner, permitted
by this License, of making, using, or selling its contributor version,
but do not include claims that would be infringed only as a
consequence of further modification of the contributor version. For
purposes of this definition, "control" includes the right to grant
patent sublicenses in a manner consistent with the requirements of
this License.

Each contributor grants you a non-exclusive, worldwide, royalty-free
patent license under the contributor's essential patent claims, to
make, use, sell, offer for sale, import and otherwise run, modify and
propagate the contents of its contributor version.

In the following three paragraphs, a "patent license" is any express
agreement or commitment, however denominated, not to enforce a patent
(such as an express permission to practice a patent or covenant not to
sue for patent infringement). To "grant" such a patent license to a
party means to make such an agreement or commitment not to enforce a
patent against the party.

If you convey a covered work, knowingly relying on a patent license,
and the Corresponding Source of the work is not available for anyone
to copy, free of charge and under the terms of this License, through a
publicly available network server or other readily accessible means,
then you must either (1) cause the Corresponding Source to be so
available, or (2) arrange to deprive yourself of the benefit of the
patent license for this particular work, or (3) arrange, in a manner
consistent with the requirements of this License, to extend the patent
license to downstream recipients. "Knowingly relying" means you have
actual knowledge that, but for the patent license, your conveying the
covered work in a country, or your recipient's use of the covered work
in a country, would infringe one or more identifiable patents in that
country that you have reason to believe are valid.

If, pursuant to or in connection with a single transaction or
arrangement, you convey, or propagate by procuring conveyance of, a
covered work, and grant a patent license to some of the parties
receiving the covered work authorizing them to use, propagate, modify
or convey a specific copy of the covered work, then the patent license
you grant is automatically extended to all recipients of the covered
work and works based on it.

A patent license is "discriminatory" if it does not include within
the scope of its coverage, prohibits the exercise of, or is
conditioned on the non-exercise of one or more of the rights that are
specifically granted under this License. You may not convey a covered
work if you are a party to an arrangement with a third party that is
in the business of distributing software, under which you make payment
to the third party based on the extent of your activity of conveying
the work, and under which the third party grants, to any of the
parties who would receive the covered work from you, a discriminatory
patent license (a) in connection with copies of the covered work
conveyed by you (or copies made from those copies), or (b) primarily
for and in connection with specific products or compilations that
contain the covered work, unless you entered into that arrangement,
or that patent license was granted, prior to 28 March 2007.

Nothing in this License shall be construed as excluding or limiting
any implied license or other defenses to infringement that may
otherwise be available to you under applicable patent law.

12. No Surrender of Others' Freedom.

If conditions are imposed on you (whether by court order, agreement or
otherwise) that contradict the conditions of this License, they do not
excuse you from the conditions of this License. If you cannot convey a
covered work so as to satisfy simultaneously your obligations under this
License and any other pertinent obligations, then as a consequence you may
not convey it at all. For example, if you agree to terms that obligate you
to collect a royalty for further conveying from those to whom you convey
the Program, the only way you could satisfy both those terms and this
License would be to refrain entirely from conveying the Program.

13. Use with the GNU Affero General Public License.

Notwithstanding any other provision of this License, you have
permission to link or combine any covered work with a work licensed
under version 3 of the GNU Affero General Public License into a single
combined work, and to convey the resulting work. The terms of this
License will continue to apply to the part which is the covered work,
but the special requirements of the GNU Affero General Public License,
section 13, concerning interaction through a network will apply to the
combination as such.

14. Revised Versions of this License.

The Free Software Foundation may publish revised and/or new versions of
the GNU General Public License from time to time. Such new versions will
be similar in spirit to the present version, but may differ in detail to
address new problems or concerns.

Each version is given a distinguishing version number. If the
Program specifies that a certain numbered version of the GNU General
Public License "or any later version" applies to it, you have the
option of following the terms and conditions either of that numbered
version or of any later version published by the Free Software
Foundation. If the Program does not specify a version number of the
GNU General Public License, you may choose any version ever published
by the Free Software Foundation.

If the Program specifies that a proxy can decide which future
versions of the GNU General Public License can be used, that proxy's
public statement of acceptance of a version permanently authorizes you
to choose that version for the Program.

Later license versions may give you additional or different
permissions. However, no additional obligations are imposed on any
author or copyright holder as a result of your choosing to follow a
later version.

15. Disclaimer of Warranty.

THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY
APPLICABLE LAW. EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT
HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM "AS IS" WITHOUT WARRANTY
OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM
IS WITH YOU. SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF
ALL NECESSARY SERVICING, REPAIR OR CORRECTION.

16. Limitation of Liability.

IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING
WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MODIFIES AND/OR CONVEYS
THE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES, INCLUDING ANY
GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE
USE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF
DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD
PARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER PROGRAMS),
EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF
SUCH DAMAGES.

17. Interpretation of Sections 15 and 16.

If the disclaimer of warranty and limitation of liability provided
above cannot be given local legal effect according to their terms,
reviewing courts shall apply local law that most closely approximates
an absolute waiver of all civil liability in connection with the
Program, unless a warranty or assumption of liability accompanies a
copy of the Program in return for a fee.

    				 END OF TERMS AND CONDITIONS

    		How to Apply These Terms to Your New Programs

If you develop a new program, and you want it to be of the greatest
possible use to the public, the best way to achieve this is to make it
free software which everyone can redistribute and change under these terms.

To do so, attach the following notices to the program. It is safest
to attach them to the start of each source file to most effectively
state the exclusion of warranty; and each file should have at least
the "copyright" line and a pointer to where the full notice is found.

    <one line to give the program's name and a brief idea of what it does.>
    Copyright (C) <year>  <name of author>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

Also add information on how to contact you by electronic and paper mail.

If the program does terminal interaction, make it output a short
notice like this when it starts in an interactive mode:

    <program>  Copyright (C) <year>  <name of author>
    This program comes with ABSOLUTELY NO WARRANTY; for details type `show w'.
    This is free software, and you are welcome to redistribute it
    under certain conditions; type `show c' for details.

The hypothetical commands `show w' and `show c' should show the appropriate
parts of the General Public License. Of course, your program's commands
might be different; for a GUI interface, you would use an "about box".

You should also get your employer (if you work as a programmer) or school,
if any, to sign a "copyright disclaimer" for the program, if necessary.
For more information on this, and how to apply and follow the GNU GPL, see
<https://www.gnu.org/licenses/>.

The GNU General Public License does not permit incorporating your program
into proprietary programs. If your program is a subroutine library, you
may consider it more useful to permit linking proprietary applications with
the library. If this is what you want to do, use the GNU Lesser General
Public License instead of this License. But first, please read
<https://www.gnu.org/licenses/why-not-lgpl.html>.