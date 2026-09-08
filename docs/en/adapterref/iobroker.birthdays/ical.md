---
chapters: {"pages":{"en/adapterref/iobroker.birthdays/README.md":{"title":{"en":"ioBroker.birthdays"},"content":"en/adapterref/iobroker.birthdays/README.md"},"en/adapterref/iobroker.birthdays/ical.md":{"title":{"en":"ioBroker.birthdays"},"content":"en/adapterref/iobroker.birthdays/ical.md"},"en/adapterref/iobroker.birthdays/carddav.md":{"title":{"en":"ioBroker.birthdays"},"content":"en/adapterref/iobroker.birthdays/carddav.md"},"en/adapterref/iobroker.birthdays/blockly.md":{"title":{"en":"ioBroker.birthdays"},"content":"en/adapterref/iobroker.birthdays/blockly.md"},"en/adapterref/iobroker.birthdays/javascript.md":{"title":{"en":"ioBroker.birthdays"},"content":"en/adapterref/iobroker.birthdays/javascript.md"}}}
---
![Logo](../../admin/birthdays.png)

# ioBroker.birthdays

## iCal

You can use an ical file (http url or local path to file) to provide access to your birthday calendar. The adapter will search for all events within that file.

_Local files are supported since adapter version 2.0.0_

Your events

1. must contain the birth year in the description (e.g. 1987)
2. are full day events
3. have to be "repeated yearly"

It is NOT required to use the iCal option. You can also define other birthday sources in the settings. _When you use multiple options, the information will be merged._

### Google Calendar

Go to [Google Calendar](http://calendar.google.com/) and create a new calendar. Add new birthday events to that calendar, which match the required criteria (see above). After that, you have to copy the private calendar url to use this calendar in the adapter.

![iCal New Event Google](./img/ical-google-new.png)

![iCal Settings Google](./img/ical-google-settings.png)

![iCal URL Google](./img/ical-google-url.png)

### Synology Calendar

![iCal New Event Synology](./img/ical-synology-new.png)

![iCal New Event Synology](./img/ical-synology-new-r.png)

![iCal URL Synology](./img/ical-synology-url.png)

### Apple iCloud Clendar

![iCal New Event iCloud](./img/ical-icloud-new.png)

![iCal Settings iCloud](./img/ical-icloud-url.png)