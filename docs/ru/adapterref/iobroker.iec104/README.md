---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.iec104/README.md
title: Адаптер ioBroker IEC 60870-5-104
hash: fK8Zo/CbMZhh11PhfZTaDNakEqLayYEmb6FaLC1wt+U=
---
# Адаптер ioBroker IEC 60870-5-104
Адаптер ioBroker для связи между ведущим и ведомым устройствами по стандарту IEC 60870-5-104.

Адаптер может работать как ведущий или ведомый модуль IEC-104. Приёмные точки группируются по ASDU/общему адресу ниже `ASDU-<address>`. Каждый ASDU содержит отдельные папки для значений, качества IV, качества NT, временных меток и информации COT.

## Функции
- Режим Master для подключения к станции, управляемой по стандарту IEC-104.
- Режим ведомого устройства для передачи настроенных состояний ioBroker по стандарту IEC-104.
- Общий опрос после подключения и дополнительный циклический опрос.
- Настраиваемые размеры полей COT, общего адреса и IOA.
- Настраиваемая таблица точек данных с поддержкой импорта и экспорта.
- Схема расположения штатов сгруппирована по ASDU/общему адресу.
- Раздельные состояния для значения, IV, NT, метки времени и текста COT.

## Конфигурация
Сначала установите режим подключения:

- «Главная/управляющая станция»: подключается к удаленному ведомому устройству IEC-104.
- «Подчиненная/управляемая станция»: локально прослушивает удаленный ведущий модуль IEC-104.

Общие настройки:

| Обстановка | Смысл |
| --- | --- |
| `Remote host` | Удаленный хост используется в режиме мастера. |
| `Bind address` | Локальный адрес привязки, используемый в режиме подчиненного устройства. |
| `Common address` | Общий адрес по умолчанию для настроенных точек. |
| `Originator address` | Адрес отправителя, используемый в ASDU. |
| `Read only` | Отклонить команды ASDU с удаленной стороны. |
| Только для чтения | Отклонять команды ASDU с удаленной стороны. |

## Точки данных
Настраиваемые точки определяют, как интерфейсы ввода-вывода IEC-104 сопоставляются с состояниями ioBroker. Таблица поддерживает типы мониторинга, типы команд, временные метки, масштабирование и необязательные общие адреса для каждой точки.

Адаптер также сохраняет полученные точки ниже `ASDU-<address>`, поэтому значения с разных общих адресов остаются разделенными.

## Changelog

### **WORK IN PROGRESS**

- Correct button-state metadata, sanitize configured state IDs and clamp all configurable timer values.
- Require Admin >= 7.8.23 and update repository maintenance configuration.

### 0.1.26

- Uses the standard npm environment token fallback and keeps `common.news` within repository limits.

### 0.1.25

- Completed translations for technical ASDU option labels.

### 0.1.24

- Completed all Admin UI translations using short-format i18n files.

### 0.1.23

- Published the point-role fix with npm provenance through the standard ioBroker release workflow.

### 0.1.22

- Assigned valid ioBroker roles to read-only and writable IEC-104 points.
- Restored the standard ioBroker test-and-release deployment workflow.

### 0.1.21

- Fixed ioBroker repochecker metadata, package checks, jsonConfig i18n handling and release automation.

### 0.1.20

- Replaced plain Node.js timers with ioBroker adapter timer helpers.

### 0.1.19

- Removed old unpublished changelog entries from `io-package.json`.
- Added responsive metadata for the data point table.

### 0.1.18

- Added repository metadata, CI release automation and adapter checker compatibility for public ioBroker publication.

### 0.1.17

- Reorganized states by ASDU with Value, IV, NT, Time and COT folders.
- Exposed NT quality and COT text states.
- Improved master reconnect handling.

Older entries are available in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

Copyright (c) 2026 TheBam1990

MIT License. See [LICENSE](LICENSE) for details.