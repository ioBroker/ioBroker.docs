---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mempool-space/README.md
title: ioBroker.mempool-пространство
hash: AOtHUDsbZYkGUXfUtfUNExUfo3lKXyOJ32AFfs8AD2g=
---
![версия НПМ](https://img.shields.io/npm/v/iobroker.mempool-space.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mempool-space.svg)
![Количество установок](https://iobroker.live/badges/mempool-space-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/mempool-space-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.mempool-space.png?downloads=true)

<!-- strg+k dann v Öffnet live Darstellung -->

![Логотип](../../../en/adapterref/iobroker.mempool-space/admin/mempool-space.png)

# IoBroker.mempool-пространство
**Тесты:** ![Тест и выпуск](https://github.com/Hans-Wurst-21/ioBroker.mempool-space/workflows/Test%20and%20Release/badge.svg)

### Испытайте сеть Bitcoin у себя дома!
Текущие данные из API WebSocket mempool.space.

Этот адаптер предоставляет информацию о сети Bitcoin в режиме реального времени с помощью подключений WebSocket к API mempool.space. Он предлагает широкий спектр точек данных, включая информацию о блоках, комиссии за транзакции, статистику сети и конвертацию цен.

Передача всех данных занимает несколько минут. Подождите не менее 2 блоков.

**Важно: адаптер или mempool.space никогда не будут запрашивать ваш seed!**

**⚠️ НИКОГДА ⚠️**

**Если вы поделитесь своим семенем, вы потеряете 100% всего!**

## Веб-сокет для передачи данных в реальном времени
### Функции
1. **Данные в реальном времени**: использует соединения WebSocket для оперативных обновлений из сети Bitcoin.

2. **Конверсии цен**:

- Курсы обмена биткоинов на доллары США и евро
- Представление "Московского времени" (сатоши за USD/EUR)

3. **Комиссия за транзакцию**:

- Самый быстрый тариф, тариф за полчаса, тариф за час, тариф эконом и тариф с минимальной оплатой

4. **Информация о блокировке**:

- Последняя высота блока, хэш и временная метка
- Время с момента последнего блока
- Майнинговый пул, который добыл последний блок

5. **Статистика сети**:

- Среднее время блока
- Текущие и предыдущие корректировки сложности
- Расчетное время до следующего изменения уровня сложности
- Расчетное время до следующего халвинга

6. **Информация о Mempool**:
- Количество неподтвержденных транзакций

### Конфигурация
В настройках адаптера вы можете настроить следующую опцию:

- **URL-адрес WebSocket**:

URL для API WebSocket mempool.space (по умолчанию: `wss://mempool.space/api/v1/ws`)

- Вы можете использовать публичный или локальный экземпляр mempool.space.
- Для локального экземпляра обратитесь к документации программного обеспечения вашего биткойн-узла.

Никакой дополнительной настройки не требуется.
Все состояния и соединения создаются адаптером автоматически.

### Штаты
Адаптер автоматически создает следующие каналы и состояния:

- **конверсия**

- usd: курс обмена биткоина на доллар США
- евро: курс обмена биткоина на евро
- moscowtimeUSD: Московское время, доллар США
- moscowtimeEUR: Московское время EUR
- временная метка: временная метка последнего обновления конверсии

- **сборы**

- самый быстрый: самая высокая ставка комиссии за транзакцию
- halfHour: Ставка сбора за подтверждение в течение получаса
- час: Ставка сбора за подтверждение в течение часа
- экономика: ставка сбора за эконом-класс
- минимум: Минимальная ставка сбора

- **блокировать**

- высота: высота последнего блока
- хэш: хэш последнего блока
- временная метка: временная метка последнего блока
- miningPool: Имя пула, который добыл последний блок
- timeSinceLastBlock: Время, прошедшее с момента последнего блока

- **сеть**

- averageBlockTime: Среднее время блока
- difficultyChange: Текущая корректировка сложности (в процентах)
- previousDifficultyChange: Предыдущая настройка сложности (в процентах)
- nextDifficultyAdjustment: предполагаемая временная метка следующего изменения сложности
- remainTimeToDifficulty: Оставшееся время до следующего изменения сложности
- remainTimeToHalving: Оставшееся время до следующего деления пополам

- **мемпул**

- transactionCount: Количество неподтвержденных транзакций в мемпуле

- **информация**
- connectionn: указывает, активно ли соединение WebSocket

## Библиотека
- API-документация: https://mempool.space/docs/api/websocket
- npm-модуль: https://www.npmjs.com/package/@mempool/mempool.js
- luxon-модуль: https://github.com/moment/luxon

## Дела
- [ ] Полный перевод
- [ ] Очистить код
- [ ] Добавить примеры
- [ ] Запрос адресов, определенных пользователем
- [ ] Запрос пользовательских транзакций
- [ ] Возможно телеграм-бот

## Особая благодарность
Особая благодарность https://einundzwanzig.space и https://www.youtube.com/@haus_automation

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (Hans-Wurst-21) Update version chai, @types/chai, chai-as-promised, @types/node, eslint, sinon-chai

### 0.0.4 (2024-11-27)

- (Hans-Wurst-21) Integrate standard iobroker linter setup
- (Hans-Wurst-21) Change setInterval/clearInterval to this.setInterval/clearInterval
- (Hans-Wurst-21) clean icon and i18n from examples
- (Hans-Wurst-21) change README.md
- (Hans-Wurst-21) add to ioBroker-latest

### 0.0.3 (2024-11-17)

- (Hans-Wurst-21) fix issue from ioBroker-Bot
- (Hans-Wurst-21) add bluefox at npm
- (Hans-Wurst-21) correction readme
- (Hans-Wurst-21) set ioBroker.admin to '>=6.17.14'
- (Hans-Wurst-21) add responsive design for adminconfig

### 0.0.2 (2024-11-16)

- (Hans-Wurst-21) npm release
- (Hans-Wurst-21) fix issue from ioBroker-Bot
- (Hans-Wurst-21) prepare for npm upload

## License

MIT License

Copyright (c) 2024 Hans-Wurst-21 <github+mempool-space@hansmail.net>

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