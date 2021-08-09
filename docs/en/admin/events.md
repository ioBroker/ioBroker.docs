---
title: Events
lastChanged: 10.05.2021
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/admin/events.md
hash: +KFMmCj/chMyEZB/QW+TFWarAfGD1U+w6FxSkTJrUbw=
---
The current states of all data points are displayed in this tab.
The values cannot be changed here.

![The events page](../../de/admin/media/ADMIN_Ereignisse_numbers.png)

## The title line
in the title line there are icons for the most important processes. There is context help for each icon. Simply stay on the icon with the mouse for a while.

### The icons in detail:
### 1 - pause view
With this button you can stop the current display of the latest events. The button then changes to a yellow background on which the number of "missed" events is counted up.

!> Since the events are sometimes updated in the millisecond range, there may be delays up to and including the display freezing

Clicking the button again starts the live display.

### 2 - delete display
This button clears the screen

## The page content
The existing events are displayed in a table on the page. The most recent event is at the top.

![The events page](../../de/admin/media/ADMIN_Ereignisse_numbers02.png)

By clicking on the column headers, you can filter according to certain criteria.

### 1 - type
Here either ***stateChange*** is an update of a value, or ***objectChange*** These are also the two filter options.

### 2 - ID
This is the unique name of the corresponding data point, according to the structure consisting of e.g. name of the adapter, number of the instance, device name, channel name, data point name.

Here you can filter for complete IDs, but also for parts of them, e.g. for all TEMPERATURE data points.

### 3 - value
This is the current value of the respective data point.

### 4 - Confirmed
If this value has been changed and it has been adopted by the system, the value is true, otherwise false.

These are also the filter options

### 5 - source
This indicates which instance made the last change to the data point.

You can filter for these in this column.

### 6 - time
This is the time stamp at which the data point was last updated.

### 7 - Changed
This is the time stamp at which the value of the data point last changed.