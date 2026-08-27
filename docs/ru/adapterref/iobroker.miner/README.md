---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.miner/README.md
title: ioBroker.miner
hash: N6VVMr5r7l3q/UR60Pfkh8RpqILAlgq0AO/KxXvGNZ8=
---
![Логотип](../../../en/adapterref/iobroker.miner/admin/miner.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.miner.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.miner.svg)
![Количество установок](https://iobroker.live/badges/miner-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/miner-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.miner.png?downloads=true)

# IoBroker.miner
**Тесты:** ![Тестирование и выпуск](https://github.com/SimonFischer04/ioBroker.miner/workflows/Test%20and%20Release/badge.svg)

## Адаптер майнера для ioBroker
Взаимодействуйте с различными API криптомайнеров.

## Дорожная карта
- [X] v0.1: управление устройствами, реализация TRM
- [X] Поддержка других майнеров: bos+, xmrig, avalon, ...?
- [ ] реализовать больше функций (управление + информация с устройств)
- [ ] поддержка пулов
- [ ] обнаружение устройства
- [ ] часовой
- [ ] подробнее: см. Todo.md / issues

## Использование
При добавлении нового устройства в настройках экземпляра (или на вкладке «Администратор устройств») должно появиться диалоговое окно, подобное этому:

![AddDevice.png](../../../en/adapterref/iobroker.miner/docs/AddDevice.png)

Все параметры должны быть достаточно понятны. Для каждого из них также есть всплывающие подсказки с более подробной информацией. Если что-то осталось непонятным, не стесняйтесь задавать вопросы в разделе "Проблемы", обсуждении или на форуме.

### Типы майнеров Brains OS
Существует две реализации майнера Braiins, поскольку компания Braiins изменила стек API при переходе на разные поколения прошивки:

- `bos`: используйте это для официальной прошивки Braiins OS `>= 23.03`, обычно для серии Antminer S19 и более новых моделей. Эта реализация использует публичный API Braiins OS (PAPI) через gRPC.
- `bosMiner`: используйте это для устаревших версий прошивки Braiins OS (< 23.03), как правило, для устройств до S19, таких как серии Antminer S9 и S17. Это позволяет использовать более старый API, совместимый с CGMiner.

`bosMiner` также поддерживает состояние `control.powerTarget`. Устаревшая ОС Braiins не предоставляет эту возможность через API, совместимый с CGMiner, поэтому адаптер использует обходной путь через SSH: он входит в майнер, обновляет `power_target` в разделе `[autotuning]` и `timestamp` в разделе `[format]` `/etc/bosminer.toml`, сохраняет резервную копию в `/etc/bosminer.toml.iobroker-power-target.bak`, останавливает `bosminer`, записывает конфигурацию и снова запускает `bosminer`. Настройте действительные учетные данные SSH для устройств `bosMiner`; Имя пользователя по умолчанию — `root`, пароль отсутствует.

Предупреждение: изменение `control.powerTarget` на старых устройствах `bosMiner` требует полного цикла остановки/запуска `bosminer`. Не изменяйте это значение часто; используйте его для целенаправленных изменений целевых параметров, а не для быстрых циклов автоматизации.

Если вы не уверены в выборе, сначала проверьте поколение прошивки/семейство устройств:

- Образы ОС Braiins для S19/S21/T19 и более новых моделей указаны в текущем процессе загрузки прошивки и обычно должны использовать `bos`.
- Образы S17 опубликованы как `v 23.01`, а образы S9 как `v 22.08.1` на странице загрузок Braiins, поэтому для этих устаревших поколений следует использовать `bosMiner`.

Ссылки:

- Публичный API ОС Braiins: https://academy.braiins.com/braiins-os/papi-about
- Загрузка прошивки Braiins OS: https://braiins.com/os-firmware/download

## Объектная модель
Все объекты создаются в рамках:

`miner.<instance>.miner.<minerId>`

`<minerId>` — это стабильный идентификатор из конфигурации устройства (`settings.id`). Это позволяет запускать несколько майнерных процессов на одном хосте.

### Группы (каналы)
- `info`: identity/config/firmware/connection meta
- `stats`: показатели производительности в реальном времени (хешрейт, количество ресурсов, энергопотребление, температура и т. д.)
- `control`: элементы управления, доступные для записи (запуск/остановка, перезагрузка и т. д.)
- `raw`: необработанные данные API (эксперт)

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
Каждое майнерное устройство имеет доступное для записи состояние верхнего уровня `enabled`:

`miner.<instance>.miner.<minerId>.enabled`

Установите это состояние в `false`, чтобы отключить майнер в адаптере во время выполнения. Отключенные майнеры выгружаются, и для них не активна обработка опроса/управления. Верните его в `true`, чтобы инициализировать майнер снова без перезапуска адаптера.

Это отличается от `control.running`: `enabled` определяет, управляет ли адаптер майнером вообще, а `control.running` запрашивает у поддерживаемого майнера запуск или остановку майнинга.

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

## Благодарности
- Логотип был создан с помощью ChatGPT

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

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

Copyright (c) 2026 SimonFischer04 <simi.fischa@gmail.com>  

This project is licensed under the GNU General Public License v3.0 - see [LICENSE](https://github.com/SimonFischer04/ioBroker.miner/blob/main/LICENSE) for details.