---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mempool-space/README.md
title: ioBroker.mempool-space
hash: cXThTcD0+jNx72qX//2Zhh3P60T/+KEF4gsaKnW70Ug=
---
![Версия NPM](https://img.shields.io/npm/v/iobroker.mempool-space.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mempool-space.svg)
![Количество установок](https://iobroker.live/badges/mempool-space-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/mempool-space-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.mempool-space.png?downloads=true)
![Тестирование и выпуск](https://github.com/Hans-Wurst-21/ioBroker.mempool-space/workflows/Test%20and%20Release/badge.svg)

<!--
    strg+k dann v
    Öffnet live Darstellung
-->

![Логотип](../../../en/adapterref/iobroker.mempool-space/admin/mempool-space.png)

# ioBroker.mempool-space

### Познакомьтесь с сетью Bitcoin у себя дома!

Данные в реальном времени поступают из WebSocket API mempool.space.

Этот адаптер предоставляет информацию о сети Bitcoin в режиме реального времени, используя соединения WebSocket с API mempool.space. Он предлагает широкий спектр данных, включая информацию о блоках, комиссиях за транзакции, статистику сети и конвертацию цен.

Передача всех данных занимает несколько минут. Подождите как минимум 2 блока.

**Важно: адаптер или mempool.space никогда не будут запрашивать ваш сид!**

**⚠️ НИКОГДА ⚠️**

**Если вы поделитесь своим семенем, вы потеряете 100% всего!**

## Веб-сокет для передачи данных в реальном времени

### Функции

1. **Данные в реальном времени** : Использует соединения WebSocket для получения обновлений в режиме реального времени из сети Bitcoin.

2. **Конверсия цен** :

   - Курсы конвертации биткоина в доллары США и евро
   - Представление «Московского времени» (сатоши за доллар США/евро)

3. **Комиссия за транзакцию** :

   - Самые быстрые, получасовые, почасовые, экономичные тарифы и минимальная стоимость.

4. **Информация о блоке** :

   - Последняя высота блока, хеш и временная метка.
   - Время с момента последнего блока
   - Майнинговый пул, добывший последний блок.

5. **Статистика сети** :

   - Среднее время блока
   - Текущие и предыдущие корректировки сложности
   - Примерное время до следующей корректировки уровня сложности
   - Примерное время до следующего сокращения вдвое

6. **Информация о пуле мемпулов** :
   - Количество неподтвержденных транзакций

### Конфигурация

В настройках адаптера можно указать следующую опцию:

- **URL WebSocket** : URL для API WebSocket mempool.space (по умолчанию:`wss://mempool.space/api/v1/ws` )

- Вы можете использовать общедоступный или локальный экземпляр mempool.space.

- Для локального экземпляра обратитесь к документации программного обеспечения вашего биткоин-узла.

Дополнительная настройка не требуется. Все состояния и соединения создаются адаптером автоматически.

### Штаты

Адаптер автоматически создает следующие каналы и состояния:

- **конверсия**

  - USD: Курс конвертации биткоина в доллары США
  - EUR: Курс конвертации биткоина в евро
  - MoscowtimeUSD: Moscow-Time USD
  - MoscowtimeEUR: Moscow-Time EUR
  - метка времени: метка времени последнего обновления преобразования

- **сборы**

  - Самый быстрый: Самая высокая комиссия за транзакцию.
  - halfHour: Стоимость подтверждения бронирования в течение получаса.
  - час: Стоимость подтверждения в течение часа.
  - Эконом-класс: Стоимость проезда в эконом-классе
  - минимум: Минимальная ставка платы

- **блокировать**

  - высота: Высота последнего блока
  - Хэш: Хэш последнего блока
  - метка времени: метка времени последнего блока
  - miningPool: Название пула, добывшего последний блок.
  - timeSinceLastBlock: Время, прошедшее с момента последнего блока.

- **сеть**

  - averageBlockTime: Среднее время блока
  - difficultyChange: Текущая корректировка сложности (в процентах)
  - previousDifficultyChange: Предыдущая корректировка сложности (в процентах)
  - nextDifficultyAdjustment: Предполагаемая метка времени следующей корректировки сложности.
  - remainingTimeToDifficulty: Оставшееся время до следующего повышения уровня сложности.
  - remainingTimeToHalving: Оставшееся время до следующего сокращения вдвое.

- **мемпул**

  - transactionCount: Количество неподтвержденных транзакций в пуле транзакций

- **информация**
  - connectionn: Указывает, активно ли соединение WebSocket.

## Библиотека

- Документация по API: <https://mempool.space/docs/api/websocket>
- npm-модуль: <https://www.npmjs.com/package/@mempool/mempool.js>
- Модуль luxon: <https://github.com/moment/luxon>

## Список дел

- [ ] Полный перевод
- [ ] Очистка кода
- [ ] Добавить примеры
- [ ] Запрос пользовательских адресов
- [ ] Запрос пользовательских транзакций
- [ ] Возможно, телеграм-бот

## Особая благодарность

Особая благодарность <https://einundzwanzig.space> и <https://www.youtube.com/@haus_automation>

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