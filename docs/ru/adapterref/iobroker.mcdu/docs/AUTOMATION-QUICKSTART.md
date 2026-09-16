---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md
title: Краткое руководство по быстрому запуску автоматизации MCDU
hash: e0QqMV2owuHMkpmoN9SXyqfB1MxWwCL3B0TTaJy/RUU=
---
# Краткое руководство по быстрому запуску автоматизации MCDU

**Этап 4.1: Основные состояния для автоматизации**

В этом руководстве показано, как использовать 32 новых состояния автоматизации для управления вашим MCDU из скриптов ioBroker, автоматизаций и внешних систем.

---

## 🚀 Краткие примеры

### 1. Управление светодиодами

```javascript
// Turn on STATUS LED (full brightness)
setState('mcdu.0.leds.STATUS', true);

// Set FAIL LED to 50% brightness
setState('mcdu.0.leds.FAIL', 128);

// Turn off MENU LED
setState('mcdu.0.leds.MENU', false);

// Set backlight to 75%
setState('mcdu.0.leds.BACKLIGHT', 191);
```

### 2. Показать уведомления

```javascript
// Info notification (white, 3 seconds)
setState('mcdu.0.notifications.type', 'info');
setState('mcdu.0.notifications.message', 'System bereit');

// Warning notification (amber, 5 seconds)
setState('mcdu.0.notifications.type', 'warning');
setState('mcdu.0.notifications.duration', 5000);
setState('mcdu.0.notifications.message', 'BATTERIE SCHWACH');

// Error notification (red, 10 seconds)
setState('mcdu.0.notifications.type', 'error');
setState('mcdu.0.notifications.duration', 10000);
setState('mcdu.0.notifications.message', 'VERBINDUNGSFEHLER');

// Success notification (green)
setState('mcdu.0.notifications.type', 'success');
setState('mcdu.0.notifications.message', 'Gespeichert');
```

### 3. Перемещение по страницам

```javascript
// Go to specific page
setState('mcdu.0.control.switchPage', 'heating-control');

// Navigate to next page
setState('mcdu.0.control.nextPage', true);

// Navigate to previous page
setState('mcdu.0.control.previousPage', true);

// Go back to home
setState('mcdu.0.control.homePage', true);
```

### 4. Нажатия кнопок триггера

```javascript
// Press LSK1L (left button, line 1)
setState('mcdu.0.actions.pressButton', 'LSK1L');

// Press MENU key
setState('mcdu.0.actions.pressButton', 'MENU');

// Confirm pending action
setState('mcdu.0.actions.confirmAction', true);

// Cancel/clear
setState('mcdu.0.actions.cancelAction', true);
```

### 5. Заполните блокнот для заметок.

```javascript
// Set scratchpad content (user can edit)
setState('mcdu.0.scratchpad.content', '22.5');

// Check if content is valid
const isValid = getState('mcdu.0.scratchpad.valid').val;

// Clear scratchpad
setState('mcdu.0.scratchpad.clear', true);
```

### 6. Мониторинг состояния выполнения.

```javascript
// Check if user is editing
const editing = getState('mcdu.0.runtime.editActive').val;

// Check if confirmation dialog is showing
const pending = getState('mcdu.0.runtime.confirmationPending').val;

// See last button pressed
const lastButton = getState('mcdu.0.runtime.lastButtonPress').val;
const lastTime = getState('mcdu.0.runtime.lastButtonTime').val;

// Check adapter uptime
const uptime = getState('mcdu.0.runtime.uptime').val; // seconds
```

---

## 📋 Полный справочник по штатам

### Управление светодиодами (11 штатов)

| Состояние               | Тип       | Ценности              | Описание                   |
| ----------------------- | --------- | --------------------- | -------------------------- |
| `leds.FAIL`             | смешанный | истина/ложь или 0-255 | Индикатор НЕИСПРАВНОСТИ    |
| `leds.FM`               | смешанный | истина/ложь или 0-255 | FM-индикатор               |
| `leds.MCDU`             | смешанный | истина/ложь или 0-255 | индикатор MCDU             |
| `leds.MENU`             | смешанный | истина/ложь или 0-255 | Индикатор МЕНЮ             |
| `leds.FM1`              | смешанный | истина/ложь или 0-255 | индикатор FM1              |
| `leds.IND`              | смешанный | истина/ложь или 0-255 | индикатор IND              |
| `leds.RDY`              | смешанный | истина/ложь или 0-255 | Индикатор RDY (готовность) |
| `leds.STATUS`           | смешанный | истина/ложь или 0-255 | Индикатор СТАТУС           |
| `leds.FM2`              | смешанный | истина/ложь или 0-255 | индикатор FM2              |
| `leds.BACKLIGHT`        | число     | 0-255                 | яркость подсветки кнопок   |
| `leds.SCREEN_BACKLIGHT` | число     | 0-255                 | яркость подсветки экрана   |

### Контроль блокнота (4 состояния)

| Состояние                    | Тип        | Доступ | Описание                            |
| ---------------------------- | ---------- | ------ | ----------------------------------- |
| `scratchpad.content`         | нить       | Р/В    | Буфер текста для черновика          |
| `scratchpad.valid`           | логический | Р      | Является ли контент достоверным?    |
| `scratchpad.validationError` | нить       | Р      | Сообщение об ошибке проверки        |
| `scratchpad.clear`           | логический | В      | Прозрачная записная книжка (кнопка) |

### Уведомления (5 штатов)

| Состояние                | Тип        | Ценности                               | Описание                                                |
| ------------------------ | ---------- | -------------------------------------- | ------------------------------------------------------- |
| `notifications.message`  | нить       | любой текст                            | Текст уведомления                                       |
| `notifications.type`     | нить       | информация/предупреждение/ошибка/успех | Тип сообщения (задает цвет)                             |
| `notifications.duration` | число      | миллисекунды                           | Как долго отображать (по умолчанию: 3000)               |
| `notifications.line`     | число      | 1-13                                   | Какую строку отображения вы выберете (по умолчанию: 13) |
| `notifications.clear`    | логический | истинный                               | Снять уведомление сейчас                                |

### Навигация (4 штата)

| Состояние              | Тип           | Описание                       |
| ---------------------- | ------------- | ------------------------------ |
| `control.nextPage`     | логический    | Перейти на следующую страницу  |
| `control.previousPage` | логический    | Перейти на предыдущую страницу |
| `control.homePage`     | логический    | Перейти на первую страницу     |
| `control.pageHistory`  | строка (JSON) | История навигации              |

### Кнопочные триггеры (3 состояния)

| Состояние               | Тип        | Ценности            | Описание                     |
| ----------------------- | ---------- | ------------------- | ---------------------------- |
| `actions.pressButton`   | нить       | LSK1L, МЕНЮ и т. д. | Имитация нажатия кнопки      |
| `actions.confirmAction` | логический | истинный            | Запустить OVFY (подтвердить) |
| `actions.cancelAction`  | логический | истинный            | Запустить CLR (отмена)       |

### Мониторинг в режиме реального времени (5 штатов)

| Состояние                     | Тип        | Описание                                        |
| ----------------------------- | ---------- | ----------------------------------------------- |
| `runtime.editActive`          | логический | Пользователь находится в режиме редактирования. |
| `runtime.confirmationPending` | логический | Отображается диалоговое окно подтверждения.     |
| `runtime.lastButtonPress`     | нить       | Последняя нажатая физическая кнопка             |
| `runtime.lastButtonTime`      | число      | Отметка времени последнего нажатия кнопки       |
| `runtime.uptime`              | число      | Время работы адаптера (в секундах)              |

---

## 🎯 Типичные сценарии использования

### Вариант использования 1: Отображение состояния системы отопления

```javascript
// Show heating on/off on LED
on({ id: 'hm-rpc.0.Heizung.STATE', change: 'ne' }, function(obj) {
    setState('mcdu.0.leds.STATUS', obj.state.val);
    
    if (obj.state.val) {
        setState('mcdu.0.notifications.type', 'success');
        setState('mcdu.0.notifications.message', 'Heizung AN');
    } else {
        setState('mcdu.0.notifications.type', 'info');
        setState('mcdu.0.notifications.message', 'Heizung AUS');
    }
});
```

### Вариант использования 2: Предупреждение о неисправности дверного замка

```javascript
on({ id: 'hm-rpc.0.Tuer.LOCK_STATE', val: false }, function() {
    // Flash FAIL LED
    setInterval(() => {
        const current = getState('mcdu.0.leds.FAIL').val;
        setState('mcdu.0.leds.FAIL', !current);
    }, 500);
    
    // Show warning
    setState('mcdu.0.notifications.type', 'warning');
    setState('mcdu.0.notifications.duration', 60000); // 1 minute
    setState('mcdu.0.notifications.message', 'TÜR NICHT VERSCHLOSSEN');
});
```

### Вариант использования 3: Вспомогательная функция регулировки температуры

```javascript
// Pre-fill current temperature when user switches to heating page
on({ id: 'mcdu.0.runtime.currentPage', val: 'heating-control' }, function() {
    const currentTemp = getState('hm-rpc.0.Heizung.ACTUAL_TEMPERATURE').val;
    setState('mcdu.0.scratchpad.content', currentTemp.toFixed(1));
    
    setState('mcdu.0.notifications.type', 'info');
    setState('mcdu.0.notifications.duration', 2000);
    setState('mcdu.0.notifications.message', 'Aktuell: ' + currentTemp + '°C');
});
```

### Вариант использования 4: Автоматическая навигация по расписанию

```javascript
// Show energy dashboard at 6:00 AM
schedule('0 6 * * *', function() {
    setState('mcdu.0.control.switchPage', 'energy-dashboard');
    setState('mcdu.0.leds.RDY', 255);
});

// Return to home at night
schedule('0 23 * * *', function() {
    setState('mcdu.0.control.homePage', true);
    setState('mcdu.0.leds.BACKLIGHT', 64); // Dim backlight
    setState('mcdu.0.leds.SCREEN_BACKLIGHT', 32);
});
```

### Вариант использования 5: Автоматическое подтверждение критически важных действий

```javascript
// Emergency heating boost (auto-confirm after 3 seconds)
function emergencyHeatBoost() {
    // Trigger heating boost action
    setState('mcdu.0.actions.pressButton', 'LSK6L');
    
    // Wait for confirmation dialog
    setTimeout(() => {
        const pending = getState('mcdu.0.runtime.confirmationPending').val;
        if (pending) {
            setState('mcdu.0.actions.confirmAction', true);
            log('Emergency heating boost confirmed');
        }
    }, 3000);
}
```

### Вариант использования 6: Регистратор нажатий кнопок

```javascript
// Log all button presses
on({ id: 'mcdu.0.runtime.lastButtonPress', change: 'ne' }, function(obj) {
    const button = obj.state.val;
    const time = getState('mcdu.0.runtime.lastButtonTime').val;
    const timestamp = new Date(time).toLocaleTimeString();
    
    log(`[${timestamp}] Button pressed: ${button}`, 'info');
    
    // Track button usage statistics
    setState('stats.mcdu.button.' + button + '.count', 
             getState('stats.mcdu.button.' + button + '.count').val + 1);
});
```

---

## Тестирование

Запустите набор тестов адаптера:

```bash
cd /path/to/iobroker.mcdu
npm test
```

---

## Дополнительная литература

- [PAGE-CONFIGURATION-GUIDE.md](/#/docs/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md) - Справочник по настройке страниц
- [MQTT-TEST-COMMANDS.md](/#/docs/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md) - Команды для ручного тестирования MQTT

---

## ⚠️ Важные примечания

1. **Подтверждение состояния** : Все состояния автоматизации автоматически подтверждаются после обработки.
2. **MQTT Timing** : Изменения состояния светодиодов и уведомлений передаются в MQTT с QoS 1.
3. **Имитация нажатия кнопок** : При нажатии кнопок учитывается дребезг контактов (100 мс) и диалоговые окна подтверждения.
4. **Проверка содержимого блокнота** : проверка содержимого выполняется при записи (максимум 20 символов).
5. **Состояния во время выполнения** : состояния, доступные только для чтения, обновляются автоматически, запись в них не производится.

---

## 🐛 Устранение неполадок

### Уведомление не отображается

- Проверять`notifications.message` не пуст
- Проверять`notifications.type` действителен (информация/предупреждение/ошибка/успех)
- Гарантировать`notifications.line` от 1 до 13

### Светодиод не меняется

- Убедитесь, что название светодиода указано правильно (регистр имеет значение).
- Проверяемое значение является логическим или находится в диапазоне от 0 до 255.
- Убедитесь, что соединение MQTT активно (`info.connection` = true)

### Кнопка спуска не работает

- Убедитесь, что название кнопки корректно (LSK1L, MENU и т. д.).
- Проверьте, активно ли диалоговое окно подтверждения (блокирует ли оно другие кнопки).
- Убедитесь, что адаптер работает и готов к работе.

### Блокнот не обновляется

- Проверьте длину содержимого (максимум 20 символов).
- Проверять`scratchpad.content` состояние существует
- Использовать`scratchpad.clear` для перезагрузки, если зависло

---

## 💡 Советы и рекомендации

1. **Пакетное обновление светодиодов** : объединение нескольких изменений состояния светодиодов в одном блоке скрипта для повышения производительности.
2. **Постановка уведомлений в очередь** : Ожидание`notifications.message` очистить перед отправкой следующего уведомления
3. **Интеллектуальная навигация** : проверено`runtime.currentPage` перед навигацией, чтобы избежать лишних переключателей.
4. **Обнаружение режима редактирования** : Использовать`runtime.editActive` приостанавливать автоматизацию во время ввода данных пользователем.
5. **Мониторинг времени безотказной работы** : использование`runtime.uptime` для обнаружения перезагрузок адаптера

---

**Готовы к автоматизации!** 🚀

По вопросам или проблемам обращайтесь к основной документации проекта или создайте заявку на GitHub.