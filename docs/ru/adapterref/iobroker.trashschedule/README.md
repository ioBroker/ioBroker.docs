---
chapters: {"pages":{"en/adapterref/iobroker.trashschedule/README.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/README.md"},"en/adapterref/iobroker.trashschedule/providers.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/providers.md"},"en/adapterref/iobroker.trashschedule/blockly.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/blockly.md"},"en/adapterref/iobroker.trashschedule/faq.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/faq.md"},"en/adapterref/iobroker.trashschedule/javascript.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/javascript.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.trashschedule/README.md
title: ioBroker.trashschedule
hash: P4dpvdBIRl7Q49ihJLc++xP9yz8WGtJkihKMfdyizEE=
---
![Логотип](../../../en/admin/trashschedule.png)

# ioBroker.trashschedule

## Оглавление

- [Поставщики](/#/docs/adapterref/iobroker.trashschedule/providers.md)
- [Блокли](/#/docs/adapterref/iobroker.trashschedule/blockly.md)
- [JavaScript](/#/docs/adapterref/iobroker.trashschedule/javascript.md)
- [Часто задаваемые вопросы](/#/docs/adapterref/iobroker.trashschedule/faq.md)

## Требования

1. Node.js 20.0 (или более поздняя версия)
2. js-controller 6.0.0 (или более поздняя версия)
3. Административный адаптер 6.0.0 (или более поздняя версия)
4. iCal Adapter 1.12.1 (или более поздняя версия) — _опционально_

## Конфигурация

1. Создать`trashschedule` Выберите экземпляр iCal в качестве источника. В качестве альтернативы можно выбрать поставщиков напрямую, которые интегрированы через различные онлайн-сервисы.
2. Перейдите на вкладку «Типы мусора» и добавьте столько типов, сколько у вас уже есть.
3. Задайте имя для каждого нового типа мусора и настройте соответствующие события.
4. Запустите экземпляр

**Есть вопросы?** Ознакомьтесь с разделом [часто задаваемых вопросов (FAQ).](/#/docs/adapterref/iobroker.trashschedule/faq.md)

![График вывоза мусора](../../../en/adapterref/iobroker.trashschedule/img/trashschedule.png)

![Типы графиков вывоза мусора](../../../en/adapterref/iobroker.trashschedule/img/trashschedule_types.png)

## Предварительные условия для iCal

1. Создайте новый экземпляр [адаптера iCal.](https://github.com/iobroker-community-adapters/ioBroker.ical)
2. Настройте URL-адрес своего календаря (например, Google Календарь).
3. Установите параметр "Дни предварительного просмотра" в диапазоне, который включает каждый тип мусора как минимум дважды (например, 45 дней).
4. Если вы используете вкладку «События», убедитесь, что для каждого типа событий установлен флажок «Отображать», который также должен использоваться в вашем расписании удаления (в противном случае событие будет скрыто экземпляром iCal).

![iCal](../../../en/adapterref/iobroker.trashschedule/img/ical.png)

## Виджет VIS (версия VIS 1.x)

![Виджет VIS](../../../en/adapterref/iobroker.trashschedule/img/vis.png)

**Данный виджет не поддерживает VIS 2.x!**