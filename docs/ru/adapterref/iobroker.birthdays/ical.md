---
chapters: {"pages":{"de/adapterref/iobroker.birthdays/README.md":{"title":{"de":"ioBroker.birthdays"},"content":"de/adapterref/iobroker.birthdays/README.md"},"de/adapterref/iobroker.birthdays/ical.md":{"title":{"de":"ioBroker.birthdays"},"content":"de/adapterref/iobroker.birthdays/ical.md"},"de/adapterref/iobroker.birthdays/carddav.md":{"title":{"de":"ioBroker.birthdays"},"content":"de/adapterref/iobroker.birthdays/carddav.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.birthdays/ical.md
title: ioBroker.дни рождения
hash: 7PVSXX5HcARvg3MqME0iIPEkz+trfJT22hvzPMJ8VVM=
---
![логотип](../../../de/adapterref/iobroker.birthdays/../../admin/birthdays.png)

# IoBroker.дни рождения
## ICal
Вы можете использовать URL-адрес iCal, который содержит все дни рождения. Адаптер ищет все встречи в этом файле.

ваши встречи

1. в описании должен быть указан год рождения (например, 1987)
2. полный рабочий день
3. установите «повторять ежегодно»

НЕ обязательно использовать опцию iCal. Кроме того, вы также можете вручную ввести все дни рождения в экземпляре. *Если вы используете оба варианта, информация будет объединена.*

### Пример Календаря Google
Перейдите к [Календарь Google](http://calendar.google.com/) и создайте новый календарь. Затем вы вводите новые встречи, соответствующие критериям (см. выше). После этого URL-адрес частного календаря можно использовать в адаптере для использования встреч.

![iCal Новая запись Google](../../../de/adapterref/iobroker.birthdays/./ical-google-new.png)

![Настройки iCal Google](../../../de/adapterref/iobroker.birthdays/./ical-google-settings.png)

![iCal URL-адрес Google](../../../de/adapterref/iobroker.birthdays/./ical-google-url.png)