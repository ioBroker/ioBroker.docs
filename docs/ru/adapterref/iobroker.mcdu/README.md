---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mcdu/README.md
title: ioBroker.mcdu
hash: skBMZ7Xjrw0He+SOKteKaIqxPU+i19hQ4jS2ccLMZ+U=
---
![Логотип](../../../en/adapterref/iobroker.mcdu/admin/mcdu.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.mcdu.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mcdu.svg)
![Количество установок](https://iobroker.live/badges/mcdu-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/mcdu-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.mcdu.png?downloads=true)

# IoBroker.mcdu
**Тесты:** ![Тестирование и выпуск](https://github.com/Flixhummel/ioBroker.mcdu/workflows/Test%20and%20Release/badge.svg)

## Адаптер MCDU для умного дома для ioBroker
Управляйте своим умным домом с помощью авиационного дисплея WINWING MCDU-32-CAPTAIN через MQTT. Этот проект выводит ваш умный дом на новый уровень, предлагая аутентичный интерфейс в стиле авиалайнера с вводом данных в блокнот, навигацией по страницам, диалоговыми окнами подтверждения и дисплеем 14x24 символа с 8 цветами.

Все мы через это проходили: крепили планшеты на стены для управления умным домом, возились с громоздкими визуализациями, тратили целую вечность, чтобы найти нужный выключатель для управления лампочкой.
Учитывая, что в моей семье есть пилот, я сразу же заинтересовался, увидев панель управления MCDU: простая концепция ввода данных, быстрый выбор нужной точки данных. А затем я нашел фантастический продукт от Winwing https://eu.winctrl.com/view/goods-details.html?id=945 и начал обратное проектирование. Отдельное спасибо https://github.com/alha847 за предоставленную информацию об устройстве.

Поскольку я не разработчик, а технический гик, я использовал код Claude структурированным образом. Сначала для сбора информации об устройстве и обратного проектирования, затем для структурирования правильной архитектуры для контекста умного дома, а затем для разработки адаптера для iobroker и клиента для Raspberry Pi.
Спасибо и привет замечательному сообществу открытого исходного кода, особенно https://github.com/klein0r и его отличным видеороликам о разработке адаптеров и приложениях iobroker для умного дома всех видов.

Это первая версия адаптера и клиента. Мне ещё предстоит её как следует протестировать и внести некоторые улучшения. Не стесняйтесь вносить свой вклад.

### Архитектура
```
ioBroker Adapter (main.js)  <-->  MQTT Broker  <-->  RasPi Client (mcdu-client/)  <-->  USB HID Hardware
```

Адаптер ioBroker выполняет всю бизнес-логику (рендеринг страниц, обработка ввода, валидация). Клиент для Raspberry Pi представляет собой «простой терминал», который передает сообщения MQTT на USB HID-оборудование — он не содержит никакой бизнес-логики.

### Функции
- **Экран 14x24 символов** с 8 цветами (белый, янтарный, голубой, зеленый, пурпурный, красный, желтый, серый)
- **73 кнопки**, включая 12 клавиш выбора строки, 12 функциональных клавиш, полнофункциональная буквенно-цифровая клавиатура.
- **11 светодиодов** (9 индикаторов + 2 подсветки с регулировкой яркости BRT/DIM)
- **Построчное управление цветом**: независимые цвета для colLabel и colData, цвет строки состояния для каждой страницы.
- **Ввод в авиационном стиле**: черновик на строке 14, выбор поля на основе LSK, подтверждение OVFY
- **Система страниц**: настраиваемые страницы с подзаголовками, автоматическая пагинация, типы макета (меню/данные/список)
- **Функциональные клавиши**: 11 настраиваемых клавиш (MENU, INIT, DIR, FPLN, PERF и т. д.) с возможностью сопоставления с каждым устройством.
- **Навигация**: иерархия родительских элементов, строка состояния "хлебные крошки", круговая строка SLEW, переход из CLR в родительский элемент.
- **Механизм проверки**: уровни проверки нажатия клавиш, формата, диапазона и бизнес-логики.
- **Диалоги подтверждения**: мягкие (LSK или OVFY) и жесткие (только OVFY) для критически важных действий.
- **Поддержка нескольких устройств**: несколько MCDU через пространства имен тем MQTT для каждого устройства.
- **32 состояния автоматизации**: управление светодиодами, блокнот, уведомления, запуск кнопок из скриптов ioBroker.

### Статус разработки
| Этап | Статус |
|-------|--------|
| Adapter Foundation (MQTT, дерево состояний, дисплей) | Готово |
| Система ввода (черновик, проверка, подтверждение) | Готово |
| Бизнес-логика (рендеринг, пагинация, функциональные клавиши) | Готово |
| Редизайн административного интерфейса + модель левых/правых линий | Готово |
| Этап UX A: Настройка функциональных клавиш | Готово |
| Этап B UX: Иерархия навигации и хлебные крошки | Готово |
| Этап C UX: Типы макета страницы (меню/данные/список) | Готово |
| Улучшение отображения (разделение цветов, яркость, состояния устройства) | Готово |
| Этап D UX: Страница быстрого доступа | Работа не начата |
| Этап UX E: Настройка назначения светодиодов | Не начато |
| Этап F UX: Профили конфигурации | Не начато |
| Этап G UX: Улучшение и интеграция административного интерфейса | Работа не начата |
| Тестирование развертывания оборудования | Не начато |

199 тестов пройдено успешно (188 модульных + 11 интеграционных).

### Рекомендуемое оборудование (mcdu-client)
mcdu-client — это легковесный процесс Node.js (~50-100 МБ ОЗУ), который обеспечивает связь MQTT с USB HID. Для его работы необходимы Wi-Fi, порт USB Host и достаточное питание USB для MCDU (~500 мА).

| Плата | Цена | Wi-Fi | USB-хост | Вердикт |
|-------|-------|------|----------|---------|
| **Raspberry Pi 4 (1-2 ГБ)** | 35-45 долларов | Двухдиапазонный | 4 порта USB-A | **Рекомендуется** — оптимальное соотношение цены, мощности и простоты |
| Raspberry Pi 3B+ | ~35$ | Двухдиапазонный | 4 порта USB-A | Проверенная производительность (текущая конфигурация для разработчиков), немного медленнее |
| Raspberry Pi 5 | 50-80 долларов | Двухдиапазонный | 4 порта USB-A | Хороший, но для полной мощности USB требуется официальный блок питания на 27 Вт |
| Raspberry Pi Zero 2 Вт | ~15$ | 2,4 ГГц | Требуется OTG-адаптер | Дешевая, но сложная в настройке однопортовая система OTG |
| ESP32-S3 | 5-15 долларов | Да | USB OTG | Не поддерживает Node.js — потребуется полная переработка кода на C++ |

**Ключевое ограничение**: Прошивка WinWing MCDU требует передачи управления SET_REPORT (а не прерывания OUT). mcdu-client использует `node-hid`, который обрабатывает это автоматически на всех платформах (IOHIDManager на macOS, hidraw на Linux).

### Быстрый старт (Разработка)
```bash
npm install
npm test          # Run all tests
npm run lint      # ESLint
npm run check     # Lint + test combined
```

Подробную документацию см. в [документация/](docs/README.md).

### Скрипты
| Сценарий | Описание |
|--------|-------------|
| `npm test` | Запустить все тесты |
| `npm run test:integration` | Только интеграционные тесты |
| `npm run test:watch` | Режим отслеживания модульных тестов |
| `npm run lint` | ESLint |
| `npm run lint:fix` | ESLint с автоматическим исправлением |
| `npm run check` | Комбинированная проверка синтаксиса и тестирование |
| `npm run check` | Комбинированный линтинг и тестирование |

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* (Flixhummel) Address ioBroker adapter review feedback (reviewer McM1957)
* (Flixhummel) Migrate to ESLint 9 flat config with @iobroker/eslint-config v2.2.0
* (Flixhummel) MQTT password now stored encrypted -- users must re-enter password once after updating
* (Flixhummel) Fix object hierarchy: `devices` container changed from channel to folder
* (Flixhummel) Fix 12+ state roles to match ioBroker standards
* (Flixhummel) Replace native setTimeout/setInterval with adapter equivalents
* (Flixhummel) Consolidate i18n translations to flat JSON files, move i18n.js to scripts/
* (Flixhummel) Remove unused admin/jsonConfig-complexversion.json

### 0.2.0 (2026-02-28)
* (Flixhummel) Fix error display for read-only datapoints, improve save config handling

### 0.1.9 (2026-02-27)
* (Flixhummel) Unify MCDU driver to node-hid on all platforms, clean up mcdu-client setup

### 0.1.8 (2026-02-26)
* (Flixhummel) Remove unpublished news entries and add missing jsonConfig size attributes

### 0.1.7 (2026-02-25)
* (Flixhummel) Fix ioBroker repository checker errors and warnings

### 0.1.4 (2026-02-25)
* (Flixhummel) Switch to npm trusted publishing (OIDC) for automated releases

### 0.1.3 (2026-02-25)
* (Flixhummel) Initial npm release with MQTT bridge, page system, admin UI, and automation states

For detailed changelog see [CHANGELOG.md](CHANGELOG.md).

## License
MIT License

Copyright (c) 2026 Flixhummel <hummelimages@googlemail.com>

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