---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.reolink/README.md
title: ioBroker.reolink
hash: 5OorZn0IyfqIMVnxiFVoVf6i58cbkPXb0wIuV3MA7yU=
---
![Логотип](../../../en/adapterref/iobroker.reolink/admin/reolink.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.reolink.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.reolink.svg)
![Количество установок](https://iobroker.live/badges/reolink-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/reolink-stable.svg)
![Статус зависимости](https://img.shields.io/david/aendue/iobroker.reolink.svg)
![НПМ](https://nodei.co/npm/iobroker.reolink.png?downloads=true)
![Тестирование и выпуск](https://github.com/aendue/ioBroker.reolink/workflows/Test%20and%20Release/badge.svg)

# ioBroker.reolink

## Адаптер reolink для ioBroker

Адаптер для платформы ioBroker для получения информации [о камерах Reolink](https://reolink.com/) .

В целом, все новые камеры Reolink поддерживают команды API. Разница лишь в наборе поддерживаемых команд.

Напоминание о пароле. Попробуйте использовать кодировку URI или нет, если у вас всего один специальный символ. Лучше вообще не использовать специальные символы и просто придумать более длинный пароль для обеспечения той же безопасности. Проверьте, работают ли ваши учетные данные, используя <http://cam.ip.add.ress/api.cgi?cmd=GetDevInfo&channel=0&user=username&password=yoursecurity> .

Если вам необходимо включить какую-либо конкретную команду API... просто дайте мне знать.

## Реализованные функции

### НАБОР

- Управление PTZ / Защита PTZ
- Push-уведомления
- Установите значения автофокуса: 0,1
- Настройка параметров ИК-подсветки: Авто, Выкл.
- Установите светодиодную подсветку
- Установите значения для уведомлений по почте: 0, 1
- Воспроизвести звуковой сигнал тревоги
- Приближение Фокус

Функции можно активировать, изменив параметр reolink.<Instanze> .settings states.

### ПОЛУЧАТЬ

- Информация об устройстве
- Информация о PTZ
- Информация о диске
- Информация о сети
- Обнаружение движения
- Автофокус
- Снимок
- ИК-свет
- Светодиодная подсветка
- Уведомление по почте

### Настройки push-уведомлений

Push-уведомления на телефон будут отправляться только при соблюдении следующих условий:

- Переключатель push-уведомлений в адаптере включен.
- Для сетевых видеорегистраторов (NVR) включены как глобальный переключатель, так и переключатель каналов.
- В приложении Reolink на этом телефоне включены push-уведомления.

Функция push-уведомлений в приложении Reolink не зависит от настроек адаптера. Она также не зависит от настроек других телефонов, подключенных к той же камере. Reolink делает это для того, чтобы у вас был независимый способ отключения push-уведомлений для каждого телефона. Это означает, что отключение push-уведомлений в iobroker никак не влияет на кнопку переключения в приложении.

### Пример использования функции получения изображения:

```js
sendTo("reolink.0",{action: "snap"}, function(result){
    sendTo("matrix-org.0",{file:result});
});
```

// Содержимое **результата** — JSON:

```json
{ "type": "image/png","base64": "iVBORw....askldfj" }
```

Для Telegram это работает.

```js
sendTo("reolink.0",{action: "snap"}, function(result){
    const buffer =Buffer.from(result.base64, "base64");
    sendTo('telegram.0', {
        text: buffer,
        type: "photo",
        caption: 'the image'
    });
});
```

## Фотоаппараты с батарейным питанием

Фотоаппараты с батарейным питанием (Argus PT, Argus 3 Pro и др.) используют проприетарный протокол и поддерживаются через **[neolink](https://github.com/QuantumEntangledAndy/neolink)** — инструмент с открытым исходным кодом, который автоматически загружается при первом использовании.

### Быстрая настройка

1. **Включить в настройках:** ✅ «Камера с питанием от батареи»
2. **Введите UID камеры:** Найдите в приложении Reolink → Информация об устройстве
3. **Установите зависимости (Linux):**
   ```bash
   sudo apt install gstreamer1.0-rtsp
   ```
4. **Запустить адаптер** → Доступные потоки RTSP по адресу`rtsp://<server-ip>:8554/<CameraName>/mainStream`

> IP-адрес сервера определяется автоматически.`<CameraName>` Это имя, заданное в конфигурации адаптера.

### Экономия заряда батареи

**Батарея быстро разряжается во время работы!** Адаптер использует стратегию автоматического отключения:

- **`streams.enable`** (логическое значение) — Включить/отключить потоковую передачу RTSP
  - По умолчанию:`false` (выкл = экономия заряда батареи)
  - Автоматическое отключение через 30 секунд (настраивается)
  - Трансляция автоматически приостанавливается, если ни один клиент не подключен.

- **`mqtt.enable`** (логическое значение) — Включить интеграцию MQTT для датчиков движения/аккумулятора/прожектора/датчика движения PIR
  - Необходимо для обновления статуса и управления прожекторами/датчиками движения.
  - Автоматическое отключение по истечении заданного времени (защита батареи)
  - Настройте брокера в параметрах адаптера.

### Состояние батареи камеры

| Состояние                | Тип        | Р/В | Описание                                                                                                 |
| ------------------------ | ---------- | --- | -------------------------------------------------------------------------------------------------------- |
| `streams.enable`         | логический | Р/В | Запуск/остановка RTSP-потока                                                                             |
| `streams.mainStream`     | нить       | Р   | RTSP-адрес для основного потока                                                                          |
| `streams.subStream`      | нить       | Р   | RTSP-адрес для дополнительного потока                                                                    |
| `mqtt.enable`            | логический | Р/В | Запуск/остановка интеграции MQTT                                                                         |
| `floodlight`             | логический | Р/В | Включение/выключение прожектора — статус через MQTT, управление через MQTT (автоматический запуск MQTT)  |
| `pir`                    | логический | Р/В | Включение/выключение PIR-датчика — статус через MQTT, управление через MQTT (автоматический запуск MQTT) |
| `snapshot`               | кнопка     | В   | Создание снимка состояния через RTSP                                                                     |
| `query.battery`          | кнопка     | В   | Запрос уровня заряда батареи через интерфейс командной строки NeoLink.                                   |
| `query.preview`          | кнопка     | В   | Создание снимка состояния через RTSP                                                                     |
| `ptz.preset`             | число      | Р/В | Переместите камеру в сохраненное заданное положение (0–9)                                                |
| `ptz.up/down/left/right` | логический | Р/В | Удерживайте для перемещения (`true` =начало,`false` =стоп)                                               |
| `ptz.speed`              | число      | Р/В | Скорость перемещения PTZ-камеры (1–100, по умолчанию 32)                                                 |
| `status.motion`          | логический | Р   | Обнаружено движение (через MQTT)                                                                         |
| `status.battery_level`   | число      | Р   | Уровень заряда батареи в % (через интерфейс командной строки Neolink, периодически)                      |

|`snapshotImage` | строка | R | Последнее изображение снимка (base64, URI данных) | |`snapshotStatus` | строка | R | Статус снимка:`idle` /`capturing` /`success` /`error` | |`info.neolink_status` | строка | R | состояние процесса neolink:`stopped` /`running` |

### Управление PTZ

PTZ работает через интерфейс командной строки Neolink — протокол MQTT не требуется.

**Направленное движение** (`ptz.up/down/left/right` ):

- Установить на`true` → Камера начинает движение, автоматически останавливается через 5 секунд.
- Установить на`false` → камера немедленно останавливается
- В Visual Studio: настройте кнопку с помощью`mousedown=true` /`mouseup=false` для удержания для перемещения
- Отрегулируйте скорость с помощью`ptz.speed` (1–100)

**Предустановки** (`ptz.preset` Установите значение по умолчанию (0–9), чтобы перейти к сохраненной позиции.

### Функции

✅ Потоки RTSP (основной + дополнительный)\
&#x20;✅ Создание снимка экрана (требуется ffmpeg)\
&#x20;✅ Управление прожекторами (статус + управление через MQTT)\
&#x20;✅ Управление PIR-датчиком (статус + управление через MQTT)\
&#x20;✅ Обнаружение движения (через MQTT)\
&#x20;✅ Уровень заряда батареи (периодически отображается через интерфейс командной строки Neolink)\
&#x20;✅ Изображение предварительного просмотра (автоматически обновляется через MQTT)\
&#x20;✅ Управление PTZ — направленное движение + предустановки (через интерфейс командной строки Neolink)\
&#x20;✅ Многоплатформенность — бинарный файл neolink загружается автоматически (Linux x64/ARM/ARM64, macOS)

### Настройка MQTT

Настройте в параметрах адаптера:

- **Хост брокера** (по умолчанию:`127.0.0.1` )
- **Порт брокера** (по умолчанию:`1883` )
- **Имя пользователя / Пароль** (необязательно)
- **Автоматическое отключение тайм-аута** (по умолчанию:`30` с, защита батареи)

Протокол MQTT используется для обновления состояния камеры и управления ею. Адаптер автоматически подписывается на него, когда...`mqtt.enable` установлено на`true` .

Темы для обсуждения (публикуются камерой через Neolink):

- `neolink/<camera>/status/motion`
- `neolink/<camera>/status/battery_level`
- `neolink/<camera>/status/floodlight`
- `neolink/<camera>/status/pir`
- `neolink/<camera>/status/preview`

Темы управления (публикуемые адаптером для камеры):

- `neolink/<camera>/control/floodlight`
- `neolink/<camera>/control/pir`

### Поиск неисправностей

| Проблема                               | Решение                                                                                                                  |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| "Требуется UID камеры"                 | Введите UID в приложении Reolink → Информация об устройстве                                                              |
| "libgstrtspserver не найден"           | `sudo apt install gstreamer1.0-rtsp`                                                                                     |
| Трансляция не подключается             | Давать возможность`streams.enable` Подождите около 5 секунд, пока NeoLink запустится.                                    |
| Сбой создания снимка                   | Установите ffmpeg:`sudo apt install ffmpeg`                                                                              |
| Прожектор/датчик движения не реагирует | MQTT запускается автоматически — подождите примерно 3 секунды после переключения.                                        |
| MQTT`NotAuthorized`                    | Проверьте учетные данные брокера; Neolink использует`credentials = ["user", "pass"]` формат                              |
| Батарея быстро разряжается             | Отключайте потоковую передачу, когда приложение не используется; используйте MQTT только для передачи данных о движении. |
| PTZ не реагирует                       | Для каждой команды PTZ требуется примерно 2 секунды (вход в P2P-камеру) — это нормально.                                 |

---

## Известные рабочие камеры

### HTTP API (стандартный)

RLC-420-5MP, E1 Zoom, RLC-522, RLC-810A, RLC-823A, Duo 3 PoE

### Фотоаппараты с батарейным питанием (через Neolink)

Reolink Argus PT, Reolink Argus 3 Pro

---

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.4.2 (2026-03-16)
* (oelison) fast fix for issue #230

### 1.4.1 (2026-03-15)
* (oelison) fix issue #187

### 1.4.0 (2026-03-13)
* (bloop16) Battery camera support via neolink
* (oelison) Adapter requires node.js >= 20 now.

### 1.3.0 (2025-12-20)
* (agross) AiCfg config
* (oelison) bump some libs #202
* (bluefox) migration to ts
* (bot) revoking classic token #204
* (oelison) state changes from info log to debug #206

### 1.2.3 (2025-06-30)
* (oelison) settings email notification #170
* (oelison) testing node.js 24 #172

### 1.2.2 (2025-05-01)
* (oelison) update readme #141 #155
* (oelison) supress errors with axios timeout #154

### 1.2.1 (2025-02-09)
* (oelison) set some errors to debug logs

### 1.2.0 (2025-02-07)
* (oelison) update disk info
* (oelison) uri enconding is switchable (helps sometimes by one special char)
* (oelison) #28 PTZ check added

### 1.1.2 (2024-09-14)
* (oelison) [#22](https://github.com/aendue/ioBroker.reolink/issues/22) password with some more special chars works now
* (oelison) adapter warnings resolved

### 1.1.1 (2024-08-03)
* (oelison) removed warnings from adapter check
* (olli) added ftp support
* (oelison) channel now distinguishing most requests
* (oelison) [#79](https://github.com/aendue/ioBroker.reolink/issues/79) error messages with more info where

### 1.1.0 (2024-05-16)
* (Nibbels) [#56](https://github.com/aendue/ioBroker.reolink/issues/56) added function to switch scheduled recording on and off
* (Nibbels) [#25](https://github.com/aendue/ioBroker.reolink/issues/25) detach led light from led light mode
* (Nibbels) added setWhiteLedMode function
* (Nibbels) read zoom and focus with POST request (works on RLC-823A v3.1)
* (oelison) removed node 16

### 1.0.3 (2024-01-21)
* (oelison) [#49](https://github.com/aendue/ioBroker.reolink/issues/49)
* (oelison) [#47](https://github.com/aendue/ioBroker.reolink/issues/47)

### 1.0.2 (2023-12-19)
* (oelison) known working cameras added
* (oelison) setIrLights accept "On" now
* (oelison) [#40](https://github.com/aendue/ioBroker.reolink/issues/40)
* (oelison) [#42](https://github.com/aendue/ioBroker.reolink/issues/42)

### 1.0.1 (2023-11-11)
* (oelison) resolve review for latest adapter addition
* (oelison) maybe the last node 16 version
* (oelison) booleans are now false/true and not 0/1

## License
MIT License

Copyright (c) 2026 Andy Grundt <andygrundt@gmail.com>

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