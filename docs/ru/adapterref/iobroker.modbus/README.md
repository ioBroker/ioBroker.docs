---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.modbus/README.md
title: iobroker.modbus
hash: 9Qoy4ecF4s29MQeyVp/A8MXNQQ4wdTtd3IdDBEcLddY=
---
![Логотип](../../../en/adapterref/iobroker.modbus/admin/modbus.png)

![Количество установок](http://iobroker.live/badges/modbus-stable.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.modbus.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.modbus.svg)

# Iobroker.modbus
![Тестирование и выпуск](https://github.com/ioBroker/iobroker.modbus/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/modbus/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.

Реализация ведомого и ведущего устройства ModBus для ioBroker. Поддерживаются следующие типы:

- Modbus RTU через последовательный порт (главный)
- Modbus RTU через TCP (главный)
- Modbus TCP (ведомый, ведущий)

## Настройки
### IP-адрес партнера
IP-адрес партнера Modbus.

### Порт
TCP-порт партнера Modbus, если он настроен как главный (клиент), или собственный порт, если он настроен как подчиненный (сервер).

### Идентификатор устройства
Идентификатор устройства Modbus. Важно, если используется мост TCP/Modbus.

### Тип
Ведомый (Сервер) или Главный (Клиент).

### Использовать псевдонимы в качестве адреса
Обычно все регистры могут иметь адрес от 0 до 65535. Используя псевдонимы, вы можете определить поля виртуального адреса для каждого типа регистров. Обычно:

- дискретные входы от 10001 до 20000
- витков от 1 до 1000
- входные регистры от 30001 до 40000
- регистры хранения от 40001 до 60000

Каждый псевдоним будет внутренне сопоставлен с адресом, например, 30011 будет сопоставлен с входным регистром 10 и т. д.

### Прямые адреса
Используется для двоичных входов и катушек.
Без этого флага биты будут адресоваться следующим образом: `0 => 15, 1 => 14, 2 => 13, ..., 15 => 0`.
Если этот флаг активирован, биты будут адресоваться как: `0 => 0, 1 => 1, 2 => 2, ..., 15 => 15`.

### Не выравнивать адреса по 16 битам (слову)
Обычно адреса катушек и дискретных входов выравниваются по 16 битам.
Аналогичные адреса от 3 до 20 будут выровнены по значениям от 0 до 32.
Если эта опция активна, адреса не будут выровнены.

### Не используйте несколько регистров
Если ведомое устройство не поддерживает команду «записать несколько регистров», вы можете активировать ее, чтобы получать предупреждения, когда будут записаны несколько регистров.

### Использовать только несколько регистров записи
Если ведомое устройство поддерживает только команду «запись нескольких регистров», вы можете активировать, чтобы регистры всегда записывались с помощью команды FC15/FC16.

### Округление реального до
Сколько цифр после запятой для чисел с плавающей запятой и двойных чисел.

### Интервал опроса данных
Циклический интервал опроса (актуально только для ведущего устройства)

### Задержка повторного подключения
Интервал повторного подключения (актуально только для ведущего устройства)

### Тайм-аут чтения
Тайм-аут запросов на чтение в миллисекундах. Если за это время от ведомого устройства не будет получен ответ, соединение будет разорвано.

### Время пульса
Если для катушек используется импульс, это определяет интервал в миллисекундах, длительность импульса.

### Время ожидания
Время ожидания между опросом двух разных идентификаторов устройств в миллисекундах.

### Максимальная длина запроса на чтение
Максимальная длина команды READ_MULTIPLE_REGISTERS как количество регистров для чтения.

В некоторых системах требуется сначала «запрос на запись», чтобы доставить данные по «запросу на чтение».
Вы можете принудительно включить этот режим, установив для параметра «Максимальная длина запроса чтения» значение 1.

**Примечание.** Некоторые решения USB Modbus (например, на основе socat) могут иметь проблемы с работой с модулем последовательного порта npm.

Существует программный шлюз [**Modbus RTU <-> Modbus RTU через TCP**](http://mbus.sourceforge.net/index.html), позволяющий использовать последовательный RTU по протоколу TCP.

Оба решения **RTU через TCP** и **TCP** работают хорошо.

### Интервал чтения
Задержка между двумя запросами на чтение в мс. По умолчанию 0.

### Интервал записи
Задержка между двумя запросами на запись в мс. По умолчанию 0.

### Обновить неизмененные состояния
Обычно, если значение не изменилось, оно не будет записано в ioBroker.
Этот флаг позволяет обновлять временную метку значения в каждом цикле.

### Не включать адреса в идентификатор
Не добавляйте адрес в сгенерированный идентификатор ioBroker. `10_Input10` против `Input10`.

### Сохранять точки в идентификаторе
С этим флагом имя будет `Inputs.Input10`. Без => `Inputs_Input10`.

## Параметры для одной адресной строки в конфигурации
### Адрес
Адрес Modbus для чтения.

### Идентификатор подчиненного устройства
Если имеется несколько подчиненных устройств, это идентификатор, если не идентификатор по умолчанию, указанный в глобальной конфигурации.

### Имя
Это имя параметра.

### Описание
Описание параметра.

### Единица
Единица параметра.

### Тип
Тип данных для чтения из шины. Подробности о возможных типах данных см. в разделе Типы данных.

### Длина
Длина параметра. Для большинства параметров это определяется на основе типа данных, но для строк это определяет длину в байтах/символах.

### Фактор
Этот коэффициент используется для умножения значения, считанного из шины, для статического масштабирования. Таким образом, расчет выглядит следующим образом: `val = x * Factor + Offset`.

### Компенсировать
Это смещение добавляется к считанному значению после вышеуказанного умножения. Таким образом, расчет выглядит следующим образом: `val = x * Factor + Offset`.

### Формула
Это поле можно использовать для расширенных вычислений, если коэффициента и смещения недостаточно. **Если это поле установлено, то поля Коэффициент и Смещение игнорируются.** Формула выполняется функцией eval(). Таким образом, поддерживаются все распространенные функции. Особенно математические функции. Формула должна соответствовать синтаксису Javascript, поэтому также позаботьтесь о верхнем и нижнем регистре.

В формуле «x» следует использовать для значения, считанного из Modbus. Например. `x * Math.pow(10, sf['40065'])`

Используя массив «sf» (см. пример выше), вы можете получить доступ к другим значениям чтения Modbus, если они помечены в конфигурации как «Масштабный коэффициент» (см. ниже информацию о флаге «SF»).

Если формулу невозможно вычислить во время выполнения, адаптер записывает в журнал предупреждающее сообщение.

Еще одним вариантом использования формул может быть предотвращение получения неправдоподобных данных с помощью такой формулы, как `x > 2000000 ? null : x`.

### Роль
Роль ioBroker, которую нужно назначить.

### Комната
Комната ioBroker, которую нужно назначить.

### Голосование
Если активировано, значения опрашиваются через заранее заданный интервал от ведомого устройства.

### WP
Написать пульс

### CW
Циклическая запись

### СФ
Используйте значение в качестве коэффициента масштабирования.
Это необходимо для использования динамических коэффициентов масштабирования, которые в некоторых системах предоставляются через значения в интерфейсе.
Если значение помечено этим флагом, оно будет сохранено в переменной со следующим соглашением об именовании: `sf['Modbus_address']`.
Эту переменную можно впоследствии использовать в любой формуле для других параметров. Например, можно задать следующую формулу: `(x * sf['40065']) + 50;`

## Типы данных
- `uint16be` - `Беззнаковые 16 бит (Big Endian): AABB => AABB`
- `uint16le` - `Беззнаковые 16 бит (Little Endian): AABB => BBAA`
- `int16be` - `16 бит со знаком (Big Endian): AABB => AABB`
- `int16le` - `16 бит со знаком (Little Endian): AABB => BBAA`
- `uint32be` - `32 бита без знака (с прямым порядком байтов): AABBCCDD => AABBCCDD`
- `uint32le` - `Беззнаковые 32 бита (Little Endian): AABBCCDD => DDCCBBAA`
- `uint32sw` - `Беззнаковые 32 бита (замена слов с порядком байтов): AABBCCDD => CCDDAABB`
- `uint32sb` - `Беззнаковые 32 бита (обмен байтов с порядком байтов): AABBCCDD => DDCCBBAA`
- `int32be` - `32-битные со знаком (Big Endian): AABBCCDD => AABBCCDD`
- `int32le` - `32-битные со знаком (Little Endian): ABBCCDD => DDCCBBAA`
- `int32sw` - `Знаковые 32 бита (замена слов с порядком байтов): AABBCCDD => CCDDAABB`
- `int32sb` - `Знаковые 32 бита (обмен байтов с обратным порядком байтов): AABBCCDD => DDCCBBAA`
- `uint64be` - `Беззнаковые 64 бита (с прямым порядком байтов): AABBCCDDEEFFGGHH => AABBCCDDEEFFGGHH`
- `uint64le` - `Беззнаковые 64 бита (с прямым порядком байтов): AABBCCDDEEFFGGHH => HHGGFFEEDDCCBBAA`
- `uint8be` - `Беззнаковые 8 бит (Big Endian): AA => AA`
- `uint8le` - `Беззнаковые 8 бит (Little Endian): AA => AA`
- `int8be` - `8-битный знак (Big Endian): AA => AA`
- `int8le` - `8 бит со знаком (Little Endian): AA => AA`
- `floatbe` - `Float (Big Endian): AABBCCDD => AABBCCDD`
- `floatle` - `Float (Little Endian): AABBCCDD => DDCCBBAA`
- `floatsw` - `Float (замена слов с обратным порядком байтов): AABBCCDD => CCDDAABB`
- `floatsb` - `Float (обмен байтов с обратным порядком байтов): AABBCCDD => DDCCBBAA`
- `doublebe` - `Double (Big Endian): AABBCCDDEEFFGGHH => AABBCCDDEEFFGGHH`
- `doublele` - `Double (Little Endian): AABBCCDDEEFFGGHH => HHGGFFEEDDCCBBAA`
- `строка` - `Строка (конец нуля): ABCDEF\0 => ABCDEF\0`
- `stringle` - `Строка (с прямым порядком байтов, нулевой конец): BADCFE\0 => ABCDEF\0`

Следующее описание было скопировано из [здесь](http://www.chipkin.com/how-real-floating-point-and-32-bit-data-is-encoded-in-modbus-rtu-messages/).

Протокол Modbus «точка-точка» является популярным выбором для связи RTU хотя бы по той причине, что это простое удобство. Сам протокол контролирует взаимодействие каждого устройства в сети Modbus, то, как устройство устанавливает известный адрес, как каждое устройство распознает свои сообщения и как из данных извлекается основная информация. По сути, протокол является основой всей сети Modbus.

Однако такое удобство не обходится без каких-либо осложнений, и протокол сообщений Modbus RTU не является исключением.
Сам протокол был разработан на основе устройств с длиной регистра 16 бит.
Следовательно, при реализации 32-битных элементов данных требовались особые соображения.
Эта реализация остановилась на использовании двух последовательных 16-битных регистров для представления 32 битов данных или, по сути, 4 байтов данных.
Именно в этих четырех байтах данных данные одинарной точности с плавающей запятой могут быть закодированы в сообщение Modbus RTU.

### Важность порядка байтов
Сам Modbus не определяет тип данных с плавающей запятой, но широко распространено мнение, что он реализует 32-битные данные с плавающей запятой, используя стандарт IEEE-754.
Однако стандарт IEEE не имеет четкого определения порядка байтов полезных данных.
Поэтому наиболее важным моментом при работе с 32-битными данными является то, что данные адресуются в правильном порядке.

Например, число 123/456,00, определенное в стандарте IEEE 754 для 32-битных чисел одинарной точности с плавающей запятой, выглядит следующим образом:

![Изображение1](../../../en/adapterref/iobroker.modbus/img/img1.png)

Эффекты различного порядка байтов значительны. Например, упорядочение 4 байтов данных, представляющих 123456.00, в последовательности `B A D C`, известное как «замена байтов». При интерпретации как типа данных с плавающей запятой IEEE 744 результат совершенно иной:

![Изображение2](../../../en/adapterref/iobroker.modbus/img/img2.png)

Порядок одних и тех же байтов в последовательности «CDAB» известен как «замена слов». Опять же, результаты резко отличаются от исходного значения 123456,00:

![Изображение3](../../../en/adapterref/iobroker.modbus/img/img3.png)

Более того, как `byte swap`, так и `word swap`, по сути, полностью меняют последовательность байтов, чтобы получить еще один результат:

![Изображение4](../../../en/adapterref/iobroker.modbus/img/img4.png)

Очевидно, что при использовании сетевых протоколов, таких как Modbus, необходимо уделять пристальное внимание тому, как упорядочиваются байты памяти при их передаче, что также известно как «порядок байтов».

### Определение порядка байтов
Сам протокол Modbus объявлен как протокол с обратным порядком байтов согласно спецификации протокола приложений Modbus, V1.1.b:

**Modbus использует представление адресов и элементов данных с обратным порядком байтов.
Это означает, что при передаче числового значения, превышающего один байт, первым отправляется старший байт.**

Big-Endian — это наиболее часто используемый формат сетевых протоколов, настолько распространенный, что его также называют «сетевым порядком».

Учитывая, что протокол сообщений Modbus RTU имеет обратный порядок байтов, для успешного обмена 32-битным типом данных через сообщение Modbus RTU необходимо учитывать порядок байтов как ведущего, так и ведомого устройства. Многие ведущие и ведомые устройства RTU допускают определенный выбор порядка байтов, особенно в случае модулей, моделируемых программным обеспечением. Необходимо только убедиться, что оба устройства имеют одинаковый порядок байтов.

Как правило, семейство микропроцессора устройства определяет его порядок байтов. Как правило, стиль big-endian (сначала сохраняется старший байт, а затем младший байт) обычно встречается в процессорах, разработанных на базе процессоров Motorola. Стиль Little-Endian (сначала сохраняется младший байт, а затем старший байт) обычно встречается в процессорах, использующих архитектуру Intel. Какой стиль считать «обратным» — это вопрос личного подхода.

Однако если порядок байтов и порядок байтов не являются настраиваемыми параметрами, вам придется определить, как интерпретировать байт. Это можно сделать, запросив у ведомого устройства известное значение с плавающей запятой. Если возвращается невозможное значение, то есть число с двузначным показателем степени или что-то в этом роде, то порядок байтов, скорее всего, потребует изменения.

### Практическая помощь
Драйверы FieldServer Modbus RTU предлагают несколько функций, которые обрабатывают 32-битные целые числа и 32-битные значения с плавающей запятой. Что еще более важно, эти перемещения функций учитывают все различные формы последовательности байтов. В следующей таблице показаны перемещения функции FieldServer, которые копируют два соседних 16-битных регистра в 32-битное целое значение.

| Ключевое слово функции | Режим обмена | Исходные байты | Целевые байты |
|-------------------|--------------------|-----------------|--------------|
| 2.и16-1.и32 | Н/Д | [ а б ] [ c d ] | [ а б c d ] |
| 2.и16-1.и32-с | замена байтов и слов | [ а б ] [ c d ] | [ d c б а ] |
| 2.и16-1.и32-сб | замена байтов | [ а б ] [ c d ] | [ б а d c ] |
| 2.i16-1.i32-sw | замена слов | [ а б ] [ c d ] | [ c d а б ] |

В следующей таблице показаны перемещения функции FieldServer, которые копируют два соседних 16-битных регистра в 32-битное значение с плавающей запятой:

| Ключевое слово функции | Режим обмена | Исходные байты | Целевые байты |
|-------------------|--------------------|-----------------|--------------|
| 2.i16-1.float | Н/Д | [ а б ] [ c d ] | [ а б c d ] |
| 2.i16-1.ifloat-s | замена байтов и слов | [ а б ] [ c d ] | [ d c б а ] |
| 2.i16-1.ifloat-sb | замена байтов | [ а б ] [ c d ] | [ б а d c ] |
| 2.i16-1.ifloat-sw | замена слов | [ а б ] [ c d ] | [ c d а б ] |

В следующей таблице показаны перемещения функции FieldServer, которые копируют одно 32-битное значение с плавающей запятой в два соседних 16-битных регистра:

| Ключевое слово функции | Режим обмена | Исходные байты | Целевые байты |
|------------------|-------------------|-----------------|----------------|
| 1.float-2.i16 |Н/Д | [ а б ] [ c d ] | [ а б ][ c d ] |
| 1.float-2.i16-s |Обмен байтами и словами | [ а б ] [ c d ] | [ d c ][ б а ] |
| 1.float-2.i16-sb | замена байтов | [ а б ] [ c d ] | [ б а ][ d c ] |
| 1.float-2.i16-sw |замена слов | [ а б ] [ c d ] | [ c d ][ а б ] |

Учитывая различные перемещения функций FieldServer, правильная обработка 32-битных данных зависит от выбора правильного варианта. Обратите внимание на следующее поведение этих функций FieldServer, перемещающих известное десятичное значение с плавающей запятой одинарной точности, равное 123456,00:

|16-битные значения | Функция Переместить | Результат | Функция Переместить | Результат |
|--------------|------------------|-----------|------------------|---------------|
|0x2000 0x47F1 | 2.i16-1.float | 123456,00 | 1.float-2.i16 | 0x2000 0x47F1 |
|0xF147 0x0020 | 2.i16-1.float-s | 123456,00 | 1.float-2.i16-s | 0xF147 0X0020 |
|0x0020 0xF147 | 2.i16-1.float-sb | 123456,00 | 1.float-2.i16-sb | 0x0020 0xF147 |
|0x47F1 0x2000 | 2.i16-1.float-sw | 123456,00 | 1.float-2.i16-sw | 0x47F1 0x2000 |

Обратите внимание, что другой порядок байтов и слов требует использования соответствующей функции перемещения FieldServer. После выбора правильного перемещения функции данные можно преобразовать в обоих направлениях.

Из множества преобразователей шестнадцатеричных чисел в числа с плавающей запятой и калькуляторов, доступных в Интернете, очень немногие действительно позволяют манипулировать порядком байтов и слов. Одна из таких утилит находится на сайте www.61131.com/download.htm, где можно загрузить версии утилит для Linux и Windows. После установки утилита запускается как исполняемый файл с единым диалоговым интерфейсом. Утилита представляет десятичное значение с плавающей запятой 123456,00 следующим образом:

![Изображение5](../../../en/adapterref/iobroker.modbus/img/img5.png)

Затем можно поменять местами байты и/или слова, чтобы проанализировать, какие потенциальные проблемы с порядком байтов могут существовать между ведущим и ведомым устройствами Modbus RTU.

##Экспорт/Импорт регистров
Благодаря функции экспорта/импорта вы можете конвертировать все данные регистра (только одного типа) в файл TSV (значения, разделенные табуляцией) и обратно, чтобы легко копировать данные с одного устройства на другое или редактировать регистр в Excel.

Вы можете поделиться своими схемами с другими пользователями в [Modbus-шаблоны](https://github.com/ioBroker/modbus-templates) или найти там некоторые схемы регистров.

## Тест
В папке `test` есть несколько программ для проверки TCP-связи:

- Ananas32/64 - симулятор ведомого устройства (только регистры хранения и входы, без катушек и цифровых входов)
- RMMS — главный симулятор
— mod_RSsim.exe — симулятор раба. Возможно, вам понадобится [Распространяемый пакет Microsoft Visual C++ 2008 SP1] (https://www.microsoft.com/en-us/download/details.aspx?id=5582), чтобы запустить его (из-за ошибки SideBySide).

## Делать
- [] Разобрать файлы на https://github.com/ioBroker/modbus-templates и разрешить их импорт напрямую из адаптера.

<!--

### **РАБОТА В ПРОГРЕССЕ** -->

## Changelog
### 6.0.1 (2023-10-30)
* (bluefox) Better tooltips in settings

### 6.0.0 (2023-10-27)
* (bluefox) GUI packages updated
* (bluefox) Added help for settings
* (bluefox) Minimal supported node.js version is 16

### 5.0.11 (2022-12-01)
* (clausmuus) fixed reconnect of serial communication

### 5.0.8 (2022-09-27)
* (bluefox) GUI packages updated

### 5.0.5 (2022-08-13)
* (Apollon77) Prevent some crash cases reported by Sentry

### 5.0.4 (2022-06-15)v
* (bluefox) Corrected the coils reading in slave mode
* (bluefox) Corrected type of connection indicator

### 5.0.3 (2022-05-13)
* (bluefox) Fixed error with mutli-devices

### 5.0.0 (2022-05-11)
* BREAKING: All space characters will be replaced with underscores now in the Objects IDs, not only the first one.
* (Apollon77) Catch error reported by sentry when invalid Master port is entered
* (bluefox) GUI migrated to mui-v5

### 4.0.4 (2022-03-25)
* (Apollon77/UncleSamSwiss) Prevent invalid state log

### 4.0.3 (2022-03-21)
* (bluefox) Updated serial port package
* (bluefox) Minimal node.js version is 12

### 3.4.17 (2021-11-11)
* (Apollon77) Catch errors in tasks processing to prevent crashes

### 3.4.15 (2021-11-09)
* (Apollon77) Catch errors in tasks processing to prevent crashes
* (Apollon77) make sure generated IDs do not end with "."

### 3.4.14 (2021-08-31)
* (nkleber78) Fixed issue with sorting
* (bluefox) Corrected the calculations with scaling factor
* (bluefox) Read times were optimized

### 3.4.11 (2021-07-31)
* (bluefox) Corrected import of last line

### 3.4.10 (2021-07-30)
* (Apollon77) Make sure that slave reconnections at least wait 1000ms to allow old connectio to close properly
* (bluefox) Corrected the error with write single registers

### 3.4.9 (2021-07-06)
* (bluefox) Changed edit behaviour

### 3.4.8 (2021-06-24)
* (Apollon77) Fix crash case on writing floats (Sentry IOBROKER-MODBUS-2D)

### 3.4.7 (2021-06-22)
* (bluefox) Corrected addressing with aliases in GUI

### 3.4.6 (2021-06-21)
* (bluefox) Corrected addressing with aliases

### 3.4.5 (2021-06-19)
* (bluefox) Corrected the "write multiple registers" option

### 3.4.4 (2021-06-16)
* (bluefox) GUI bugs were corrected
* (bluefox) Added output of error codes

### 3.4.2 (2021-06-15)
* (nkleber78) Corrected issue with the scale factors
* (bluefox) New react GUI added
* (bluefox) Add new option: Use only Write multiple registers, read interval

### 3.3.1 (2021-05-10)
* (bluefox) fixed the configuration dialog for "input registers" in slave mode

### 3.3.0 (2021-04-16)
* (Apollon77) Allow usage of write-only (no poll) states
* (Apollon77/TmShaz) F Write multiple registers
* (prog42) create states of type string with default value of type string

### 3.2.6 (2021-03-05)
* (Apollon77) Prevent a crash case (Sentry IOBROKER-MODBUS-20)
* (Apollon77) Better handle invalid responses

### 3.2.4 (2021-01-30)
* (Sierra83) also support ttyXRUSB0 style devices

### 3.2.3 (2021-01-21)
* (Apollon77) Catch value encoding error and do not crash adapter (Sentry IOBROKER-MODBUS-1W)
* (Apollon77) add a meta object as instance object

### 3.2.2 (2020-12-15)
* (Apollon77) prevent a rash case (Sentry IOBROKER-MODBUS-1S)

### 3.2.1 (2020-12-12)
* (Apollon77) prevent a crash case (Sentry IOBROKER-MODBUS-1R)

### 3.2.0 (2020-12-09)
* (nkleber78) Fixed formula where return keyword was missing

### 3.1.13 (2020-12-07)
* (nkleber78) Added the possibility to use formulas for values

### 3.1.12 (2020-12-05)
* (Apollon77) fix admin serial port selection

### 3.1.10 (2020-09-25)
* (nkleber78) Corrected: the exported data cannot be imported without modification

### 3.1.9 (2020-09-17)
* (Apollon77) Prevent crash case (Sentry IOBROKER-MODBUS-1C)

### 3.1.7 (2020-07-23)
* (Apollon77) Fix some Sentry crash reports (IOBROKER-MODBUS-N)

### 3.1.6 (2020-07-06)
* (bluefox) Fix some Sentry crash reports (IOBROKER-MODBUS-J)

### 3.1.5 (2020-06-29)
* (Apollon77) Fix some Sentry crash reports (IOBROKER-MODBUS-F)

### 3.1.4 (2020-06-24)
* (Apollon77) Fix some Sentry crash reports (IOBROKER-MODBUS-4, IOBROKER-MODBUS-7, IOBROKER-MODBUS-6)
* (Apollon77) Change the way adapter restarts when reconnections do not help

### 3.1.3 (2020-06-12)
* (Apollon77) fix scheduled restart

### 3.1.2 (2020-06-12)
* (Apollon77) fix serialport list for Admin

### 3.1.1 (2020-06-11)
* (Apollon77) Add Sentry crash reporting when used with js-controller >=3.x

### 3.1.0 (2020-06-11)
* (Apollon77) Make sure that regular adapter stops do not terminate the process, so that scheduled restarts still work
* (Apollon77) update serialport, support nodejs 12/14

### 3.0.4 (2020-06-05)
* (bluefox) Added device ID by export/import
* (bluefox) Added the "write interval" parameter
* (bluefox) Added the disabling of write multiple registers

### 3.0.3 (2020-06-05)
* (bluefox) Corrected error after refactoring

### 3.0.2 (2020-06-01)
* (compton-git) Decodes 0xFF00 as coil ON

### 3.0.1 (2020-01-23)
* (BlackBird77) Fixes for Serial Timeouts done
* (bluefox) Refactoring

### 3.0.0 (2019-05-15)
* (Apollon77) Support for nodejs 12 added, nodejs 4 is no longer supported!

### 2.0.9 (2018-10-11)
* (Bjoern3003) Write registers was corrected

### 2.0.7 (2018-07-02)
* (bluefox) The server mode was fixed

### 2.0.6 (2018-06-26)
* (bluefox) rtu-tcp master mode was fixed

### 2.0.3 (2018-06-16)
* (bluefox) Fixed the rounding of numbers

### 2.0.2 (2018-06-12)
* (bluefox) The error with blocks reading was fixed
* (bluefox) The block reading for discrete values was implemented

### 2.0.1 (2018-05-06)
* (bluefox) Added the support of multiple device IDs

### 1.1.1 (2018-04-15)
* (Apollon77) Optimize reconnect handling

### 1.1.0 (2018-01-23)
* (bluefox) Little endian strings added
* (Apollon77) Upgrade Serialport Library

### 1.0.2 (2018-01-20)
* (bluefox) Fixed read of coils

### 0.5.4 (2017-09-27)
* (Apollon77) Several Fixes

### 0.5.0 (2017-02-11)
* (bluefox) Create all states each after other

### 0.4.10 (2017-02-10)
* (Apollon77) Do not recreate all data points on start of adapter
* (ykuendig) Multiple optimization and wording fixes

### 0.4.9 (2016-12-20)
* (bluefox) fix serial RTU

### 0.4.8 (2016-12-15)
* (Apollon77) update serialport library for node 6.x compatibility

### 0.4.7 (2016-11-27)
* (bluefox) Use old version of jsmodbus

### 0.4.6 (2016-11-08)
* (bluefox) backward compatibility with 0.3.x

### 0.4.5 (2016-10-25)
* (bluefox) better buffer handling on tcp and serial

### 0.4.4 (2016-10-21)
* (bluefox) Fix write of holding registers

### 0.4.1 (2016-10-19)
* (bluefox) Support of ModBus RTU over serial and over TCP (only slave)

### 0.3.11 (2016-08-18)
* (Apollon77) Fix wrong byte count in loop

### 0.3.10 (2016-02-01)
* (bluefox) fix lost of history settings.

### 0.3.9 (2015-11-09)
* (bluefox) Use always write_multiple_registers by write of holding registers.

### 0.3.7 (2015-11-02)
* (bluefox) add special read/write mode if "Max read request length" is 1.

### 0.3.6 (2015-11-01)
* (bluefox) add cyclic write for holding registers (fix)

### 0.3.5 (2015-10-31)
* (bluefox) add cyclic write for holding registers

### 0.3.4 (2015-10-28)
* (bluefox) add doubles and fix uint64

### 0.3.3 (2015-10-27)
* (bluefox) fix holding registers

### 0.3.2 (2015-10-27)
* (bluefox) fix import from text file

### 0.3.1 (2015-10-26)
* (bluefox) fix error with length of read block (master)
* (bluefox) support of read blocks and maximal length of read request (master)
* (bluefox) can define fields by import

### 0.3.0 (2015-10-24)
* (bluefox) add round settings
* (bluefox) add deviceID
* (bluefox) slave supports floats, integers and strings

### 0.2.6 (2015-10-22)
* (bluefox) add different types for inputRegisters and for holding registers ONLY FOR MASTER

### 0.2.5 (2015-10-20)
* (bluefox) fix names of objects if aliases used

### 0.2.4 (2015-10-19)
* (bluefox) fix error add new values

### 0.2.3 (2015-10-15)
* (bluefox) fix error with master

### 0.2.2 (2015-10-14)
* (bluefox) implement slave
* (bluefox) change addressing model

### 0.0.1
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2015-2023 Bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.