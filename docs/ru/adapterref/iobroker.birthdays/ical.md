---
chapters: {"pages":{"de/adapterref/iobroker.birthdays/README.md":{"title":{"de":"ioBroker.birthdays"},"content":"de/adapterref/iobroker.birthdays/README.md"},"de/adapterref/iobroker.birthdays/ical.md":{"title":{"de":"ioBroker.birthdays"},"content":"de/adapterref/iobroker.birthdays/ical.md"},"de/adapterref/iobroker.birthdays/carddav.md":{"title":{"de":"ioBroker.birthdays"},"content":"de/adapterref/iobroker.birthdays/carddav.md"},"de/adapterref/iobroker.birthdays/https://raw.githubusercontent.com/klein0r/ioBroker.birthdays/master/docs/en/blockly.md":{"title":{"de":"ioBroker.birthdays"},"content":"de/adapterref/iobroker.birthdays/https://raw.githubusercontent.com/klein0r/ioBroker.birthdays/master/docs/en/blockly.md"},"de/adapterref/iobroker.birthdays/https://raw.githubusercontent.com/klein0r/ioBroker.birthdays/master/docs/en/javascript.md":{"title":{"de":"ioBroker.birthdays"},"content":"de/adapterref/iobroker.birthdays/https://raw.githubusercontent.com/klein0r/ioBroker.birthdays/master/docs/en/javascript.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.birthdays/ical.md
title: ioBroker.дни рождения
hash: 5D+ntgsEHCBXP3I+yFLcB4+QOlDXGbxViucNSp7ZBtI=
---
![логотип](../../../de/admin/birthdays.png)

# IoBroker.дни рождения
## ICal
Вы можете использовать файл iCal (HTTP URL или путь к локальному файлу), содержащий все дни рождения. Адаптер ищет все встречи в этом файле.

_Локальные файлы поддерживаются начиная с версии адаптера 2.0.0_

Ваши встречи

1. необходимо указать год рождения в описании (например, 1987)
2. весь день
3. настроены на «ежегодное повторение»

Использование опции iCal НЕ является обязательным. Вы также можете использовать другие источники для дней рождения. _Если вы используете несколько вариантов, информация будет объединена._

### Google Календарь
Перейдите в [Google Календарь](http://calendar.google.com/) и создайте новый календарь. Затем вы вводите новые встречи, которые соответствуют критериям (см. выше). Затем URL-адрес личного календаря можно использовать в адаптере для доступа к встречам.

![iCal Новая запись Google](../../../de/adapterref/iobroker.birthdays/img/ical-google-new.png)

![Настройки iCal Google](../../../de/adapterref/iobroker.birthdays/img/ical-google-settings.png)

![URL-адрес iCal Google](../../../de/adapterref/iobroker.birthdays/img/ical-google-url.png)

### Календарь Synology
![iCal Новая запись Synology](../../../de/adapterref/iobroker.birthdays/img/ical-synology-new.png)

![iCal Новая запись Synology](../../../de/adapterref/iobroker.birthdays/img/ical-synology-new-r.png)

![URL-адрес iCal Synology](../../../de/adapterref/iobroker.birthdays/img/ical-synology-url.png)

### Резервное копирование Apple iCloud
![iCal Новое событие iCloud](../../../de/adapterref/iobroker.birthdays/img/ical-icloud-new.png)

![Настройки iCal iCloud](../../../de/adapterref/iobroker.birthdays/img/ical-icloud-url.png)