---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.miner/README.md
title: ioBroker.miner
hash: PbsimuJ+Zj1MI5dpVDFZUulmbYCu1eMtI49nE+li5nk=
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
- [ ] Исправить плагин лицензирования в файле .releaseconfig

## Использование
При добавлении нового устройства в настройках экземпляра (или на вкладке «Администратор устройств») должно появиться диалоговое окно, подобное этому:

![AddDevice.png](../../../en/adapterref/iobroker.miner/docs/AddDevice.png)

Все параметры должны быть достаточно понятны. Для каждого из них также есть всплывающие подсказки с более подробной информацией. Если что-то осталось непонятным, не стесняйтесь задавать вопросы в разделе "Проблемы", обсуждении или на форуме.

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
- `miner.0.miner.<minerId>.control.running`
- `miner.0.miner.<minerId>.stats.totalHashrate`
- `miner.0.miner.<minerId>.hardware.gpus.0.stats.temp`
- `miner.0.miner.<minerId>.raw.stats`

### Пример дерева
Это всего лишь общий обзор/идея/план. Не все пункты еще реализованы, но он должен дать вам представление о предполагаемой структуре и названиях. Фактическая реализация может отличаться в некоторых деталях, но общая структура должна быть похожа на эту.

```
miner.0
  miner
    <minerId>                        (device)
      info                           (channel)
        minerType                    (string)   e.g. xmRig / teamRedMiner / bosMiner
        host                         (string)
        version                      (string)   (maps to feature: version)
        online                        (boolean)  derived from lastSeen
        lastSeen                     (number)   unix ms
      stats                          (channel)
        totalHashrate                (number)   H/s (maps to feature: totalHashrate)
        power                        (number)   W
        efficiency                   (number)   H/W
        acceptedShares               (number)
        rejectedShares               (number)
      control                        (channel)  (writable states only here, top-level)
        running                      (boolean)  start/stop (maps to feature: running)
        reboot                       (boolean)  "button"
        profile                      (string)   performance profile (e.g. low/medium/high)
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
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
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

### 1.0.0 (2026-04-06)
* (SimonFischer04) **FIXED**: Added missing size attributes (xs, xl) to admin configuration fields
* (SimonFischer04) **ENHANCED**: Updated dependencies to recommended versions (admin 7.6.17, js-controller 6.0.11)
* (SimonFischer04) **ENHANCED**: Added copyright notice to README
* (SimonFischer04) **NEW**: Added support for Avalon (Canaan) devices via CGMiner-compatible socket API (port 4028), including start/stop (softon/softoff) and stats polling
* (SimonFischer04) **ENHANCED**: Restructured object model with dedicated channels for control, info, stats, and raw data (**breaking change** – legacy state paths are auto-cleaned on startup)
* (SimonFischer04) **NEW**: Added info states (minerType, host, online, lastSeen) and stats states (power, efficiency, acceptedShares, rejectedShares) to match the documented object model
* (SimonFischer04) **NEW**: Added reboot control state (button) with wiring in state change handler
* (SimonFischer04) **NEW**: Added running switch control to Device Manager for devices supporting the running feature
* (SimonFischer04) **NEW**: Added performance profile feature with control.profile state and Device Manager dropdown (low/medium/high) — initially for Avalon miners via ascset workmode command
* (SimonFischer04) **ENHANCED**: Renamed SGMiner to CGMiner throughout the codebase to better reflect the underlying API
* (SimonFischer04) **FIXED**: Fixed copyright formatting in README to satisfy ioBroker repository checker (fixes #95)

### 0.0.1 (2026-02-15)
* (SimonFischer04) initial release

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

Copyright (c) 2026 SimonFischer04 <simi.fischa@gmail.com>  

This project is licensed under the GNU General Public License v3.0 - see [LICENSE](https://github.com/SimonFischer04/ioBroker.miner/blob/main/LICENSE) for details.