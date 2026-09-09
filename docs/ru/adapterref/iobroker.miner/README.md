---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.miner/README.md
title: ioBroker.miner
hash: M0UhAlkfyHoUoyZMOq1hXqC+qZ3SfJuZbmFP2dQ5Bt4=
---
![Логотип](../../../en/adapterref/iobroker.miner/admin/miner.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.miner.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.miner.svg)
![Количество установок](https://iobroker.live/badges/miner-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/miner-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.miner.png?downloads=true)
![Тестирование и выпуск](https://github.com/SimonFischer04/ioBroker.miner/workflows/Test%20and%20Release/badge.svg)

# ioBroker.miner

## Адаптер майнера для ioBroker

Взаимодействуйте с различными API криптомайнеров.

## Дорожная карта

- [x] v0.1: управление устройствами, реализация TRM
- [x] Поддержка большего количества майнеров: bos+, xmrig, avalon, ...?
- [ ] Внедрить больше функций (управление + информация с устройств).
- [ ] бассейны поддерживают
- [ ] обнаружение устройства
- [ ] часовой
- [ ] Подробнее: см. Todo.md / issues

## Использование

При добавлении нового устройства в настройках экземпляра (или на вкладке «Администратор устройств») должно появиться диалоговое окно, подобное этому:

![AddDevice.png](../../../en/adapterref/iobroker.miner/docs/AddDevice.png)

Все параметры должны быть достаточно понятны. Для каждого из них также есть всплывающие подсказки с более подробной информацией. Если что-то осталось непонятным, не стесняйтесь задавать вопросы в разделе "Проблемы", обсуждении или на форуме.

### Типы майнеров Brains OS

Существует две реализации майнера Braiins, поскольку компания Braiins изменила стек API при переходе на разные поколения прошивки:

- `bos` Используйте это для официальной прошивки Brain OS.`>= 23.03` Как правило, это Antminer серии S19 и более новые модели. В данной реализации используется публичный API Braiins OS (PAPI) через gRPC.
- `bosMiner` Используйте это для устаревшей прошивки Brain OS.`< 23.03` Как правило, это устройства, выпущенные до S19, такие как серии Antminer S9 и S17. При этом используется более старый API, совместимый с CGMiner.

`bosMiner` также поддерживает`control.powerTarget` состояние. Устаревшая версия Brainins OS не предоставляет эту информацию через API, совместимый с CGMiner, поэтому адаптер использует обходной путь через SSH: он подключается к майнеру и обновляет его.`power_target` в`[autotuning]` раздел и`timestamp` в`[format]` раздел`/etc/bosminer.toml` хранит резервную копию по адресу`/etc/bosminer.toml.iobroker-power-target.bak` остановки`bosminer` записывает конфигурацию и запускает`bosminer` Снова настройте действительные учетные данные SSH для`bosMiner` устройства; имя пользователя по умолчанию —`root` без пароля.

Предупреждение: изменение`control.powerTarget` на старом`bosMiner` устройства требуют полного`bosminer` Цикл остановки/запуска. Не меняйте это значение часто; используйте его для целенаправленных изменений целевых параметров, а не для быстрых циклов автоматизации.

Если вы не уверены в выборе, сначала проверьте поколение прошивки/семейство устройств:

- Образы ОС Braiins для S19/S21/T19 и более новых моделей указаны в текущем процессе загрузки прошивки и обычно должны использовать`bos` .
- Изображения S17 опубликованы как`v 23.01` и изображения S9 в качестве`v 22.08.1` на странице загрузки Braiins, поэтому представителям старшего поколения следует использовать`bosMiner` .

Ссылки:

- Публичный API ОС Braiins: <https://academy.braiins.com/braiins-os/papi-about>
- Загрузка прошивки Braiins OS: <https://braiins.com/os-firmware/download>

## Объектная модель

Все объекты создаются в рамках:

`miner.<instance>.miner.<minerId>`

`<minerId>` — это стабильный идентификатор из конфигурации устройства (`settings.id` Это позволяет запускать несколько майнинговых процессов на одном хосте.

### Группы (каналы)

- `info` : identity/config/firmware/connection meta
- `stats` : показатели производительности в реальном времени (хешрейт, количество ресурсов, энергопотребление, температура и т. д.)
- `control` : элементы управления с возможностью записи (запуск/остановка, перезагрузка и т. д.)
- `raw` : необработанные данные API (эксперт)

### Сущности (необязательные поддеревья)

Некоторые майнеры раскрывают информацию о своих дочерних объектах. Если они доступны, то размещаются ниже майнера:

- `pools.<index>...`
- `hardware.gpus.<index>...`
- `hardware.hashboards.<index>...`

### Примеры

- `miner.0.miner.<minerId>.enabled`
- `miner.0.miner.<minerId>.control.running`
- `miner.0.miner.<minerId>.stats.totalHashrate`
- `miner.0.miner.<minerId>.hardware.gpus.0.stats.temp`
- `miner.0.miner.<minerId>.raw.stats`

### Включение/отключение майнера

Каждое майнинговое устройство имеет записываемый верхний уровень.`enabled` состояние:

`miner.<instance>.miner.<minerId>.enabled`

Установите это состояние на`false` Чтобы отключить майнер в адаптере во время выполнения. Отключенные майнеры выгружаются, и для них не активна обработка опроса/управления. Верните значение к исходному.`true` чтобы повторно инициализировать майнер без перезапуска адаптера.

Это отличается от`control.running` :`enabled` контролирует, управляет ли адаптер майнером вообще, в то время как`control.running` Запрашивает у поддерживаемого майнера запуск или остановку майнинга.

### Пример дерева

Это всего лишь общий обзор/идея/план. Не все пункты еще реализованы, но он должен дать вам представление о предполагаемой структуре и названиях. Фактическая реализация может отличаться в некоторых деталях, но общая структура должна быть похожа на эту.

```
miner.0
  miner
    <minerId>                        (device)
      enabled                        (boolean)  enable/disable adapter handling for this miner
      info                           (channel)
        minerType                    (string)   e.g. xmRig / teamRedMiner / bosMiner
        host                         (string)
        version                      (string)   (maps to feature: version)
        online                        (boolean)  derived from lastSeen
        lastSeen                     (number)   unix ms
      stats                          (channel)
        totalHashrate                (number)   H/s (maps to feature: totalHashrate)
        power                        (number)   W
        dynamicPowerTarget           (number)   W, current dynamic target reported by miner
        efficiency                   (number)   H/W
        acceptedShares               (number)
        rejectedShares               (number)
      control                        (channel)  (writable states only here, top-level)
        running                      (boolean)  start/stop (maps to feature: running)
        reboot                       (boolean)  "button"
        profile                      (string)   performance profile (e.g. low/medium/high)
        powerTarget                  (number)   W, configured target to write to miner
      pools                          (channel)
        0                            (channel)
          info
            url                      (string)
            user                     (string)
          stats
            status                   (string)
            acceptedShares           (number)
            rejectedShares           (number)
        1 ...
      hardware                       (channel)
        gpus                         (channel)
          0                          (channel)
            info
              name                   (string)
            stats
              hashrate               (number)
              temp                   (number)   °C
              fanRpm                 (number)
              power                  (number)
          1 ...
        hashboards                   (channel)  (ASICs)
          0
            stats
              hashrate               (number)
              temp                   (number)
      raw                            (channel)
        stats                        (object/string) raw miner payload (maps to feature: rawStats)
```

## Кредиты

- Логотип был создан с помощью ChatGPT.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.0 (2026-07-12)
- (copilot) Adapter requires node.js >= 22 now
* (SimonFischer04) **NEW**: Added a new `bos` miner type for newer Braiins OS firmware using the Braiins Public API
* (SimonFischer04) **ENHANCED**: Extended legacy `bosMiner` devices with writable `control.powerTarget` support for deliberate power target changes
* (SimonFischer04) **NEW**: Added top-level `enabled` state to dynamically enable or disable miner handling at runtime
* (SimonFischer04) **FIXED**: Removed example configuration (option1, option2) from native section and code (fixes #126 / E5040)

### 1.0.4 (2026-04-07)
* (SimonFischer04) fix repo url in package-json

### 1.0.3 (2026-04-07)
* (SimonFischer04) increase admin requirement to fix DM (does not work at all with current stable 7.7.22)

### 1.0.2 (2026-04-07)
* (SimonFischer04) **CI/CD**: Migrated deploy workflow from NPM classic tokens to Trusted Publishing (OIDC) (fixes #80)
* (SimonFischer04) cleanup readme

### 1.0.1 (2026-04-06)
* (SimonFischer04) fix release

[Older changelogs can be found there](https://github.com/SimonFischer04/ioBroker.miner/blob/main/CHANGELOG_OLD.md)

## License

Copyright (c) 2026 SimonFischer04 <simi.fischa@gmail.com>  

This project is licensed under the GNU General Public License v3.0 - see [LICENSE](https://github.com/SimonFischer04/ioBroker.miner/blob/main/LICENSE) for details.