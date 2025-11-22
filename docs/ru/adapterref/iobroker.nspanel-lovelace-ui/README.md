---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.nspanel-lovelace-ui/README.md
title: ioBroker.nspanel-lovelace-ui
hash: uNqdmZ3zPDhZew/erMIJrCG4G4lO3NIkV3l54TFPuEs=
---
![Логотип](../../../en/adapterref/iobroker.nspanel-lovelace-ui/admin/nspanel-lovelace-ui.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.nspanel-lovelace-ui.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.nspanel-lovelace-ui.svg)
![Количество установок](https://iobroker.live/badges/nspanel-lovelace-ui-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/nspanel-lovelace-ui-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.nspanel-lovelace-ui.png?downloads=true)

# IoBroker.nspanel-lovelace-ui
**Тесты:** ![Тестирование и выпуск](https://github.com/ticaki/ioBroker.nspanel-lovelace-ui/actions/workflows/test-and-release.yml/badge.svg?branch=main)

[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/nspanel-lovelace-ui/287x66-grey.png)](https://weblate.iobroker.net/projects/adapters/nspanel-lovelace-ui/)

## Адаптер nspanel-lovelace-ui для ioBroker
NsPanel Lovelace UI — это прошивка для следующего экрана внутри NSPanel в дизайне Lovelace UI Design.

### Краткое описание
Интерфейс NSPanel Lovelace — это альтернативный пользовательский интерфейс для Sonoff NSPanel, специально разработанный для интеграции с iobroker. Он обычно использует Tasmota (прошивку) и MQTT (протокол обмена сообщениями) для предоставления пользовательских элементов управления и отображения непосредственно на небольшом сенсорном экране NSPanel.

### Что такое NSPanel?
Sonoff NSPanel — это интеллектуальный настенный выключатель со следующими функциями:

- два физических релейных переключателя
- 3,5-дюймовый сенсорный экран
- датчики температуры и яркости

Первоначально он был разработан для приложения eWeLink, но может быть гораздо более эффективно интегрирован с ioBroker, используя альтернативную прошивку.

### Что делает «NSPanel Lovelace UI»?
С помощью этого пользовательского интерфейса вы можете:

- Отображение карточек в стиле Лавлейс на NSPanel
- Отображение показаний датчиков (например, температуры, влажности)
- Управление сценами и автоматикой
- Управляйте освещением, термостатами и другими устройствами прямо на экране

---

### Установка и вопросы
Вики-ресурс по адаптеру: https://github.com/ticaki/ioBroker.nspanel-lovelace-ui/wiki Сообщество адаптера (форум ioBroker): [Форум](https://forum.iobroker.net/topic/80055/alphatest-nspanel-lovelace-ui-v0-1-1)

---

## Следующие компоненты HMI уже интегрированы в адаптер NSPanel:
### Карты HMI
- [x] заставка
- [x] заставка2
- [x] заставка3
- [x] cardChart
- [x] cardLChart
- [ ] cardLChart2 (новое - в процессе разработки)
- [x] cardEntities
- [x] cardSchedule
- [x] cardGrid
- [x] cardGrid2
- [x] cardGrid3
- [x] cardThermo
- [ ] cardMedia
- [x] cardUnlock
- [x] cardQR
- [ ] cardAlarm
- [x] cardPower

### Всплывающие окна HMI
- [x] popupInSel
- [x] popupFan
- [x] popupThermo
- [x] всплывающее уведомление
- [x] всплывающая шторка
- [x] popupShutter2
- [x] popupLight
- [x] popupLight2
- [x] popupTimer
- [x] всплывающий слайдер
- [ ] popupColor (новый - в разработке)

---

## Управление зуммером
Адаптер поддерживает управление зуммером для устройств NSPanel с помощью команды Tasmota `Buzzer`. Это позволяет включать звуки кнопок, уведомления о срочных сообщениях и управлять зуммером в целом.

### Предпосылки
Чтобы использовать функцию зуммера, убедитесь, что в прошивке NSPanel Tasmota включен параметр `SetOption111 1`. В этом случае для выходной частоты пьезоизлучателя вместо сигнала включения/выключения используется BuzzerPwm.

### Методы использования
#### 1. Государственный контроль
Каждая панель имеет состояние управления зуммером: `panels.{panelName}.cmd.buzzer`

```javascript
// Set buzzer command (tone, duration, count, frequency)
setState('nspanel-lovelace-ui.0.panels.Panel1.cmd.buzzer', '1,2,3,0xF54');

// Examples:
setState('nspanel-lovelace-ui.0.panels.Panel1.cmd.buzzer', '1'); // Single beep
setState('nspanel-lovelace-ui.0.panels.Panel1.cmd.buzzer', '1,5'); // Longer beep
setState('nspanel-lovelace-ui.0.panels.Panel1.cmd.buzzer', '2,3,5'); // 5 beeps
```

#### 2. Интерфейс SendTo
```javascript
// Basic buzzer command
sendTo('nspanel-lovelace-ui.0', 'buzzer', {
    panel: 'panelTopic',
    command: '1,2,3,0xF54',
});

// Button feedback sound
sendTo('nspanel-lovelace-ui.0', 'buzzer', {
    panel: 'kitchen_panel',
    command: '1',
});

// Urgent notification
sendTo('nspanel-lovelace-ui.0', 'buzzer', {
    panel: 'living_room',
    command: '3,5,10,0x800', // High-pitched, multiple beeps
});
```

### Формат команды зуммера
Команда зуммера следует формату Tasmota: `tone,duration,count,frequency`

- **тон**: 1-4 (тип тона)
- **Длительность**: 1–10 (единицы длительности, ~100 мс каждая)
- **счетчик**: 1-255 (количество звуковых сигналов)
- **частота**: 0x100-0xFFFF (пьезочастота в шестнадцатеричном формате)

**Примеры:**

- `1` - Один короткий звуковой сигнал
- `1,5` - Один длинный звуковой сигнал
- `2,3,5` - 5 средних сигналов с тоном 2
- `1,2,3,0xF54` - 3 коротких звуковых сигнала с настраиваемой частотой

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.8.1 (2025-11-15)
- (ticaki) first Version at latest
- (ticaki) New attempt to get MQTT TLS keys into the backup

### 0.8.0 (2025-11-13)
- (Armilar) IMPORTANT: update to TFT Version 5.1.0
- (ticaki) pagePopup added
- (ticaki) color for brightsky favorit/bottom day fixed
- (ticaki) unlock pin fail fixed

## License

MIT License

Copyright (c) 2024-2025 ticaki <github@renopoint.de>  
Copyright (c) 2024-2025 tt-tom17 <tgb@kabelmail.de>

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