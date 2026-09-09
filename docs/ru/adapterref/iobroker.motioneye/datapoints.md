---
chapters: {"pages":{"de/adapterref/iobroker.motioneye/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/README.md"},"de/adapterref/iobroker.motioneye/settings.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/settings.md"},"de/adapterref/iobroker.motioneye/cameras.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/cameras.md"},"de/adapterref/iobroker.motioneye/modes.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/modes.md"},"de/adapterref/iobroker.motioneye/alert-level.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/alert-level.md"},"de/adapterref/iobroker.motioneye/datapoints.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/datapoints.md"},"de/adapterref/iobroker.motioneye/vis-stream.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/vis-stream.md"},"de/adapterref/iobroker.motioneye/faq.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/faq.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.motioneye/datapoints.md
title: без названия
hash: oEQK6M3lC6VstsY2Fx/jaf0Ch0mCG1/sPjLHYfDPTlY=
---
![логотип](../../../de/admin/motioneye.png)

[Вернуться к обзору документации](/#/adapters/motioneye)

## Точки данных

### На каждую камеру (`motioneye.<Instanz>.<kanal>.*` )

Названия каналов строчными буквами (например,`garten` ,`innenhof_ii` ).

| Точка данных    | читать | Писать | Описание                                                                                                                                 |
| --------------- | ------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`          | Да     | Да     | `off` /`still` /`sharp` (MotionEye; см. [режимы](/#/docs/adapterref/iobroker.motioneye/modes.md) )                                       |
| `alertLevel`    | Да     | Да     | Сводный профиль:`off` /`motion` /`notify` /`record` /`full` — см. [уровень защиты](/#/docs/adapterref/iobroker.motioneye/alert-level.md) |
| `motion`        | Да     | нет    | Обнаружено движение (автоматический сброс)                                                                                               |
| `snapshot`      | нет    | Да     | Сделать снимок (кнопка)                                                                                                                  |
| `stream`        | Да     | Да     | Включение/выключение прямой трансляции MJPEG                                                                                             |
| `streamPulse`   | нет    | Да     | Короткий импульсный поток (кнопка)                                                                                                       |
| `streamUrl`     | Да     | нет    | Готовый HTML-код для HTML-виджетов                                                                                                       |
| `status`        | Да     | нет    | Последнее сообщение о синхронизации / ошибка                                                                                             |
| `lastAction`    | Да     | нет    | Последнее действие API                                                                                                                   |
| `webhookUrl`    | Да     | нет    | URL-адрес написан на MotionEye                                                                                                           |
| `motionEyeId`   | Да     | нет    | Идентификатор камеры MotionEye                                                                                                           |
| `motionEyeName` | Да     | нет    | Оригинальное название в MotionEye                                                                                                        |

### Настройки устройства (`motioneye.<Instanz>.<kamera>.settings.*` )

| Точка данных           | читать | Писать | Описание                                            |
| ---------------------- | ------ | ------ | --------------------------------------------------- |
| `framerate`            | Да     | Да     | Запись частоты кадров в кадрах в секунду            |
| `resolution`           | Да     | Да     | разрешение `BxH`                                    |
| `availableResolutions` | Да     | нет    | Поддерживаемые разрешения (разделенные запятыми)    |
| `rotation`             | Да     | Да     | Вращение видео`0` /`90` /`180` / `270`              |
| `autoBrightness`       | Да     | Да     | Автоматическое включение/выключение яркости         |
| `privacyMask`          | Да     | Да     | Маска для обеспечения конфиденциальности (вкл/выкл) |

### Текстовое наложение (`motioneye.<Instanz>.<kamera>.overlay.*` )

| Точка данных      | читать | Писать | Описание                                               |
| ----------------- | ------ | ------ | ------------------------------------------------------ |
| `enabled`         | Да     | Да     | Включение/выключение текстового наложения              |
| `leftText`        | Да     | Да     | `camera-name` /`timestamp` /`custom-text` / `disabled` |
| `rightText`       | Да     | Да     | Как `leftText`                                         |
| `customLeftText`  | Да     | Да     | В `leftText = custom-text`                             |
| `customRightText` | Да     | Да     | В `rightText = custom-text`                            |
| `textScale`       | Да     | Да     | Размер текста,`1` –`10`                                |

### Обнаружение движения (`motioneye.<Instanz>.<kamera>.motiondetection.*` )

| Точка данных           | читать | Писать | Описание                                                                                      |
| ---------------------- | ------ | ------ | --------------------------------------------------------------------------------------------- |
| `frameChangeThreshold` | Да     | Да     | Пороговое значение изменения кадра в % пикселей изображения (0–20)                            |
| `autoThresholdTuning`  | Да     | Да     | Включение/выключение автоматической установки порогового значения                             |
| `autoNoiseDetect`      | Да     | Да     | Автоматическое обнаружение шума изображения (вкл./выкл.)                                      |
| `noiseLevel`           | Да     | Да     | Уровень шума, устанавливаемый вручную: 0–255 (при отключенном автоматическом шумоподавлении). |
| `eventGap`             | Да     | Да     | Секунды без движения до окончания события                                                     |
| `minimumMotionFrames`  | Да     | Да     | Минимальное количество последовательных кадров с движением                                    |
| `lightSwitchDetect`    | Да     | Да     | Обнаружение изменений освещенности в % (0–100)                                                |
| `despeckleFilter`      | Да     | Да     | Включение/выключение точечного фильтра                                                        |
| `preCapture`           | Да     | Да     | Кадры до обнаружения движения (предварительный просмотр)                                      |
| `postCapture`          | Да     | Да     | Кадры после окончания движения                                                                |

### (Место для хранения)`motioneye.<Instanz>.<kamera>.storage.*` )

| Точка данных    | читать | Писать | Описание                                        |
| --------------- | ------ | ------ | ----------------------------------------------- |
| `snapshotCount` | Да     | нет    | Количество сохраненных снимков                  |
| `videoCount`    | Да     | нет    | Количество сохраненных видеороликов             |
| `usedSpaceMb`   | Да     | нет    | Использованное место для хранения данных в МБ   |
| `lastRefresh`   | Да     | нет    | Отметка времени последнего успешного обновления |
| `refresh`       | нет    | Да     | Запустите обновление сейчас.                    |

### Кэш моментальных снимков (`motioneye.<Instanz>.<kamera>.snapshots.*` )

| Точка данных | читать | Писать | Описание                                       |
| ------------ | ------ | ------ | ---------------------------------------------- |
| `url`        | Да     | нет    | Путь к веб-сайту в файловом хранилище ioBroker |
| `urlLocal`   | Да     | нет    | Полный URL-адрес локальной сети (веб-адаптер)  |
| `filePath`   | Да     | нет    | Абсолютный путь к файлу (Telegram, скрипты)    |
| `html`       | Да     | нет    | HTML-фрагмент для виджета VIS HTML             |
| `lastUpdate` | Да     | нет    | ISO-метка времени последнего обновления кэша   |
| `sizeKb`     | Да     | нет    | Размер кэшированного JPEG-файла в КБ.          |
| `refresh`    | нет    | Да     | Перезагрузка с MotionEye                       |

### Информация об экземпляре (`motioneye.<Instanz>._info.*` )

| Точка данных             | Описание                                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `_info.connection`       | `true` если доступен MotionEye Config-API                                                                     |
| `_info.camerasOnline`    | Активные камеры, используемые в MotionEye.                                                                    |
| `_info.lastSync`         | Отметка времени последнего опроса                                                                             |
| `_info.motionEyeVersion` | Версия MotionEye                                                                                              |
| `_info.motionVersion`    | Версия Motion Daemon                                                                                          |
| `_info.diskUsedGb`       | Использование жесткого диска (ГБ) — число слева в разделе «Использование жесткого диска» MotionEye.           |
| `_info.diskTotalGb`      | Общая емкость жесткого диска (ГБ) — крайнее правое число (общая емкость раздела, а не свободное пространство) |
| `_info.diskUsedPercent`  | Заполняемость в процентах (например, 3)                                                                       |