---
chapters: {"pages":{"en/adapterref/iobroker.birthdays/README.md":{"title":{"en":"ioBroker.birthdays"},"content":"en/adapterref/iobroker.birthdays/README.md"},"en/adapterref/iobroker.birthdays/ical.md":{"title":{"en":"ioBroker.birthdays"},"content":"en/adapterref/iobroker.birthdays/ical.md"},"en/adapterref/iobroker.birthdays/carddav.md":{"title":{"en":"ioBroker.birthdays"},"content":"en/adapterref/iobroker.birthdays/carddav.md"}}}
---
![Logo](../../admin/birthdays.png)

# ioBroker.birthdays

## iCal

You can use an ical url to provide access to your birthday calendar. The adapter will search for all events within that file.

Your events

1. must contain the birth year in the description (e.g. 1987)
2. are full day events
3. have to be "repeated yearly"

It is NOT required to use the ical option. You can also define all birthday dates in the settings. *When you use both options, the information will be merged.*

### Example Google Calendar

Go to [Google Calendar](http://calendar.google.com/) and create a new calendar. Add new birthday events to that calendar, which match the required criteria (see above). After that, you have to copy the private calendar url to use this calendar in the adapter.

![iCal New Event Google](./img/ical-google-new.png)

![iCal Settings Google](./img/ical-google-settings.png)

![iCal URL Google](./img/ical-google-url.png)