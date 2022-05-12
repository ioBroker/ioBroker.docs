---
title: events
lastChanged: 10.05.2021
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/admin/events.md
hash: 5xQhxMr82Fyb7tKpihP3Sp/Vj7as6+yQvCM9e0k1ZGI=
---
The current states of all data points are displayed in this tab.
The values cannot be changed here.

![The event page](../../de/admin/media/ADMIN_Ereignisse_numbers.png)

## The title line
The title bar contains icons for the most important processes. There is context help for each icon. Simply hold the mouse on the icon for a while.

### The icons in detail:
### 1 - Pause view
With this button you can stop the current display of the latest events. The button then changes to a yellow background on which the number of "missed" events is counted up.

!> Since the events are sometimes updated in the millisecond range, there may be delays or the display may freeze

Clicking the button again restarts the live display.

### 2 - Delete ad
This button clears the screen

## The page content
The existing events are displayed in tabular form on the page. The most recent event is at the top.

![The event page](../../de/admin/media/ADMIN_Ereignisse_numbers02.png)

You can filter according to certain criteria by clicking on the column headers.

### 1 - type
Here is either ***stateChange***, i.e. an update of a value, or ***objectChange*** These are also the two filter options.

###2-ID
This is the unique name of the corresponding data point, according to the structure consisting of e.g. name of the adapter.number of the instance.device name.channel name.data point name.

Here you can filter for complete IDs, but also for parts of them, e.g. for all TEMPERATURE data points.

### 3 - Value
This is the current value of the respective data point.

### 4 - Confirmed
If this value was changed and accepted by the system, the value is true, otherwise false.

These are also the filter options

### 5 - Source
Here it is specified which instance made the last change to the data point.

These can be filtered in this column.

### 6 - time
This is the timestamp when the data point was last updated.

### 7 - Changed
This is the timestamp when the value of the data point last changed.