---
chapters: {"pages":{"en/adapterref/iobroker.sax-power/README.md":{"title":{"en":"ioBroker.sax-power"},"content":"en/adapterref/iobroker.sax-power/README.md"},"en/adapterref/iobroker.sax-power/docs/OBJECTS.md":{"title":{"en":"ioBroker object structure"},"content":"en/adapterref/iobroker.sax-power/docs/OBJECTS.md"},"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md":{"title":{"en":"Field reference"},"content":"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md"},"en/adapterref/iobroker.sax-power/docs/STATISTICS.md":{"title":{"en":"Historical energy statistics"},"content":"en/adapterref/iobroker.sax-power/docs/STATISTICS.md"},"en/adapterref/iobroker.sax-power/docs/BATTERY.md":{"title":{"en":"Battery models, equivalent full cycles and health"},"content":"en/adapterref/iobroker.sax-power/docs/BATTERY.md"},"en/adapterref/iobroker.sax-power/docs/MODBUS.md":{"title":{"en":"Modbus integration roadmap"},"content":"en/adapterref/iobroker.sax-power/docs/MODBUS.md"},"en/adapterref/iobroker.sax-power/docs/API.md":{"title":{"en":"SAX Power Cloud API"},"content":"en/adapterref/iobroker.sax-power/docs/API.md"},"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md":{"title":{"en":"Architecture"},"content":"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.sax-power/docs/BRANDING.md":{"title":{"en":"Branding and trademarks"},"content":"en/adapterref/iobroker.sax-power/docs/BRANDING.md"},"en/adapterref/iobroker.sax-power/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.sax-power/CONTRIBUTING.md"},"en/adapterref/iobroker.sax-power/SECURITY.md":{"title":{"en":"Security policy"},"content":"en/adapterref/iobroker.sax-power/SECURITY.md"},"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md":{"title":{"en":"Code of conduct"},"content":"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sax-power/CONTRIBUTING.md
title: Вклад
hash: ibLiGvkq5ca4b8DMqccbqbCJYZaxymniP9fCmW+soYY=
---
# Вклад

Благодарим вас за помощь в улучшении адаптера питания ioBroker SAX.

## Прежде чем открывать заявку

Пожалуйста, проверьте:

- Сохраняется ли проблема в последней версии?
- подключен ли экземпляр адаптера.
- работает ли облачная учетная запись SAX Power в официальной панели управления.
- Была ли эта проблема уже зарегистрирована?

Не публикуйте пароли, токены доступа, личные адреса электронной почты, полные серийные номера или другую конфиденциальную информацию.

## Сообщения об ошибках

Полезный отчет об ошибке включает в себя:

- версия адаптера
- версия js-контроллера ioBroker
- Версия Node.js
- операционная система или среда контейнеров
- количество обнаруженных устройств хранения
- соответствующие сообщения журнала адаптера
- Шаги для воспроизведения проблемы
- ожидаемое и фактическое поведение

Воспользуйтесь предоставленным шаблоном отчета об ошибке на GitHub.

## Запросы на добавление функций

Описывать:

- проблема, которую решит эта функция
- ожидаемое поведение
- потребуется ли дополнительный доступ к облаку или протоколу Modbus
- любые последствия для безопасности, связанные с возможностью записи

## Настройка разработки

Установите зависимости и запустите проверку качества:

```bash
npm ci
npm run check
npm run test:package
npm pack --dry-run
```

Административный интерфейс React имеет собственное дерево зависимостей в пределах...`src-admin` .

## Запросы на слияние

Запросы на слияние должны:

- иметь сфокусированную область применения
- Сохраняется поведение версии 1.0 только для чтения, если явно не изменено.
- Включайте тесты там, где это практически возможно.
- пройти все существующие проверки
- Обновляйте документацию при изменении поведения пользователей.
- Избегайте нерелевантного форматирования или рефакторинга.

## Сообщения о фиксации

По возможности используйте короткие сообщения коммитов в традиционном стиле, например:

```text
feat: add device diagnostic state
fix: handle missing PV power
docs: clarify history aggregation
test: cover multiple storage devices
```