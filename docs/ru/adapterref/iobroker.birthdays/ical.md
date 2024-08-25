---
chapters: {"pages":{"de/adapterref/iobroker.birthdays/README.md":{"title":{"de":"ioBroker.birthdays"},"content":"de/adapterref/iobroker.birthdays/README.md"},"de/adapterref/iobroker.birthdays/ical.md":{"title":{"de":"ioBroker.birthdays"},"content":"de/adapterref/iobroker.birthdays/ical.md"},"de/adapterref/iobroker.birthdays/carddav.md":{"title":{"de":"ioBroker.birthdays"},"content":"de/adapterref/iobroker.birthdays/carddav.md"},"de/adapterref/iobroker.birthdays/https://raw.githubusercontent.com/klein0r/ioBroker.birthdays/master/docs/en/blockly.md":{"title":{"de":"ioBroker.birthdays"},"content":"de/adapterref/iobroker.birthdays/https://raw.githubusercontent.com/klein0r/ioBroker.birthdays/master/docs/en/blockly.md"},"de/adapterref/iobroker.birthdays/https://raw.githubusercontent.com/klein0r/ioBroker.birthdays/master/docs/en/javascript.md":{"title":{"de":"ioBroker.birthdays"},"content":"de/adapterref/iobroker.birthdays/https://raw.githubusercontent.com/klein0r/ioBroker.birthdays/master/docs/en/javascript.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.birthdays/ical.md
title: ioBroker.дни рождения
hash: mcVTwMZLmbvL3BdMZ8HGHJrN5FiiqS6c2TzAt7uJjzc=
---
![логотип](../../../de/adapterref/iobroker.birthdays/../../admin/birthdays.png)

# IoBroker.дни рождения
## ICal
Вы можете использовать файл iCal (URL-адрес HTTP или путь к локальному файлу), который содержит все дни рождения. Адаптер ищет все встречи в этом файле.

_Локальные файлы поддерживаются, начиная с версии адаптера 2.0.0_

ваши встречи

1. в описании должен быть указан год рождения (например, 1987)
2. полный рабочий день
3. установите «повторять ежегодно»

НЕ обязательно использовать опцию iCal. Вы также можете использовать другие источники для дней рождения. _Если вы используете несколько вариантов, информация будет объединена._

### Календарь Google
Перейдите к [Календарь Google](http://calendar.google.com/) и создайте новый календарь. Затем вы вводите новые встречи, соответствующие критериям (см. выше). После этого URL-адрес частного календаря можно использовать в адаптере для использования встреч.

![iCal Новая запись Google](../../../de/adapterref/iobroker.birthdays/./img/ical-google-new.png)

![Настройки iCal Google](../../../de/adapterref/iobroker.birthdays/./img/ical-google-settings.png)

![iCal URL-адрес Google](../../../de/adapterref/iobroker.birthdays/./img/ical-google-url.png)

### Календарь Synology
![iCal Новая запись Synology](../../../de/adapterref/iobroker.birthdays/./img/ical-synology-new.png)

![iCal Новая запись Synology](../../../de/adapterref/iobroker.birthdays/./img/ical-synology-new-r.png)

![URL-адрес iCal Synology](../../../de/adapterref/iobroker.birthdays/./img/ical-synology-url.png)
