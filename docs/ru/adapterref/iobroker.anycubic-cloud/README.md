---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.anycubic-cloud/README.md
title: ioBroker.anycubic-cloud
hash: 39BZtGFRzD7S/dRW8pXUKRICspvFs2CbiHUpRmE08NE=
---
# ioBroker.anycubic-cloud

![Версия NPM](https://img.shields.io/npm/v/iobroker.anycubic-cloud.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.anycubic-cloud.svg)
![Тестирование и выпуск](https://github.com/hwiedermann/ioBroker.anycubic-cloud/actions/workflows/test-and-release.yml/badge.svg)

[Deutsche Anleitung](docs/de/README.md)

## Описание

Считывает состояние 3D-принтеров Anycubic и контейнера для филамента ACE Pro из облака Anycubic: задание на печать, температура, вентиляторы, слоты ACE и количество филамента, использованного в каждом слоте. Адаптер работает только в режиме чтения и не отправляет команд принтеру.

Протестировано на [Kobra S1](https://www.anycubic.com/products/kobra-s1-combo) и ACE 2 Pro, производитель: [Anycubic](https://www.anycubic.com) . Другие модели, совместимые с приложением Anycubic, также должны работать; отзывы приветствуются.

> \[!WARNING] Неофициально. У Anycubic нет публичного API. Адаптер использует те же облачные запросы, что и Anycubic Slicer Next, и загружает учетные данные и сертификаты приложения из проекта с открытым исходным кодом [anycubic-cloud-api](https://pypi.org/project/anycubic-cloud-api/) во время выполнения. Если Anycubic изменит свое облако, адаптер может перестать работать.

Принтер должен быть подключен к облаку Anycubic. В режиме работы только по локальной сети он недоступен.

## Установка

Адаптер пока отсутствует в репозитории ioBroker. Установите его из npm:

```bash
iobroker url iobroker.anycubic-cloud
```

Требования: Node.js 22.19 или новее, js-controller 6.0.11 или новее, Admin 7.6.20 или новее.

## Конфигурация

| Параметр                | Описание                                                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------------------ |
| Токен среза             | Токен доступа к Anycubic Slicer Next см. ниже.                                                         |
| REST-синхронизация      | Интервал полной синхронизации через REST в минутах (по умолчанию 10)                                   |
| Предупреждение о токене | За несколько дней до истечения срока годности, когда `info.tokenExpiring` установлено (по умолчанию 14) |

### Получение токена

Anycubic не предоставляет возможность входа через API с использованием имени пользователя и пароля. Адаптер использует токен доступа, который Anycubic Slicer Next сохраняет после входа в систему. Он действителен примерно 90 дней.

В Windows скрипт[`tools/get-token.ps1`](https://github.com/hwiedermann/ioBroker.anycubic-cloud/blob/main/tools/get-token.ps1) Это делает свою работу. Это не входит в пакет npm, скачайте его с GitHub.

1. Запустите Anycubic Slicer Next и войдите в систему.
2. Бегать `powershell -ExecutionPolicy Bypass -File .\get-token.ps1`.
3. Скрипт считывает конфигурацию слайсера. В более новых версиях слайсера она шифруется; затем скрипт запрашивает файл дампа: Диспетчер задач, вкладка «Подробности», щелчок правой кнопкой мыши. `AnycubicSlicerNext.exe` "Создать файл дампа". Запустите скрипт еще раз, он найдет файл в `%TEMP%`.
4. Токен копируется в буфер обмена. Вставьте его в настройки экземпляра.

Скрипт только читает файлы и ничего не отправляет по сети. Он не подписан, поэтому Windows может запросить подтверждение. `Unblock-File .\get-token.ps1` или "Подробнее, но все равно бегите".

Без скрипта: в более старых версиях среза данных токен хранится в виде обычного текста. `%APPDATA%\AnycubicSlicerNext\AnycubicSlicerNext.conf` (`anycubic_cloud.access_token` В файле дампа токен представляет собой длинную строку, начинающуюся с `eyJ` и содержащий две точки.

## Штаты

Одно устройство на один принтер, именуемое по его облачному идентификатору.

| Состояние                                                      | Описание                                                                                                                                                     |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `status`                                                       | бездействие, загрузка, проверка, выравнивание, обогрев, печать, пауза, возобновление, завершено, остановка, остановлено, ошибка                              |
| `online`, `busy`, `model`, `firmware`, `firmwareUpdate`        | Информация о принтере                                                                                                                                        |
| `light`, `lightBrightness`                                     | Свет в комнате                                                                                                                                               |
| `job.*`                                                        | Файл, ход выполнения, оставшееся и прошедшее время, слои, тип нити (мм, г, запланированный), начало, конец, причина паузы.                                   |
| `temperature.*`                                                | Сопло и основание, течение и цель                                                                                                                            |
| `fan.*`                                                        | Система частичного охлаждения, вспомогательный вентилятор и вентилятор ACE                                                                                   |
| `ace.*`                                                        | Температура, влажность, активный слот, сушка                                                                                                                 |
| `ace.slotN.*`                                                  | Цвет, материал, артикул, остаток в %. `manual` Это справедливо для катушек, заполненных вручную без использования RFID-меток; у них нет остаточной стоимости. |
| `usage.last`, `usage.history`                                  | Количество филамента, использованного в каждом слоте для последней печати и последних 30 отпечатков (JSON)                                                   |
| `event.finished`                                               | true, когда печать завершена, false, когда начинается следующая.                                                                                             |
| `message.*`                                                    | Последняя ошибка или уведомление от принтера                                                                                                                 |
| `info.tokenExpiry`, `info.tokenDaysLeft`, `info.tokenExpiring` | Срок действия токена истекает                                                                                                                                |

Принтер отправляет данные о температуре часто только во время работы приложения или слайсера; в противном случае значения обновляются с помощью REST-синхронизации. Данные о температуре и влажности ACE поступают только из MQTT: в ответе REST-запроса сообщаются фиксированные значения.

### Не поддерживается

- Управление принтером (пауза, остановка, подсветка, сушка). Возможно через облако, но пока не реализовано.
- Изображения с камеры. Облачное хранилище предоставляет только прямую трансляцию, снимки недоступны.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.3.7 (2026-10-31)

- (hwiedermann) Printer IDs from the cloud are restricted to letters, digits, `-` and `_`, every other character becomes `_`
- (hwiedermann) Adapter requires Node.js >= 22.19.0 now

### 0.3.6 (2026-10-27)

- (hwiedermann) Requests to the Anycubic cloud and to PyPI time out after 30 s instead of waiting indefinitely
- (hwiedermann) Printer IDs from the cloud are cleaned of forbidden characters before they are used as object IDs

### 0.3.5 (2026-10-08)

- (hwiedermann) ACE humidity no longer jumps to a fixed cloud value (e.g. 22 %) with every REST resync, only MQTT reports the real value

### 0.3.4 (2026-10-08)

- (hwiedermann) ACE temperature no longer drops to a fixed cloud value (e.g. 30 °C) with every REST resync, only MQTT reports the real value
- (hwiedermann) Printer is shown online again right after waking up from sleep (`lastWill/onlineReport` with state `online`)

### 0.3.3 (2026-10-05)

- (hwiedermann) Name and role of existing objects are updated on start, not only when a new value arrives

## License

GPL-3.0-or-later, see [LICENSE](LICENSE) and [COPYING](COPYING). Based on findings of the
[anycubic-cloud-api](https://pypi.org/project/anycubic-cloud-api/) project (GPL-3.0).

Copyright (c) 2026 Hendrik <iobroker@hwiedermann.de>