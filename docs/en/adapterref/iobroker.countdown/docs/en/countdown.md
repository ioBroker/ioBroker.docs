---
chapters: {"pages":{"en/adapterref/iobroker.countdown/README.md":{"title":{"en":"ioBroker.countdown"},"content":"en/adapterref/iobroker.countdown/README.md"},"en/adapterref/iobroker.countdown/docs/en/countdown.md":{"title":{"en":"ioBroker.countdown"},"content":"en/adapterref/iobroker.countdown/docs/en/countdown.md"}}}
---
# ioBroker.countdown

## Displaying countdowns
The adapter provides you automatically a json table and as a HTML table. For the json, please choose the widget "basic-table". For the html, choose the "basic - string (unescaped)" one. 

It is possible to either display the short text or the long text.
![Logo](admin/countdown_json.png)

## Sorting countdowns by date
By default, countdowns in the HTML and JSON output are displayed in the order they were created. If you want to sort them chronologically by their end date, you can enable the "Sort countdowns by date" option in the adapter settings. This will order all countdowns from earliest to latest date.

## How to add countdowns
There are several ways to set up countdowns:

* You can create a countdown in the adapter settings, in the tab "Create Countdown".
* You can create a manual state in the device "setup". The name of the object is the alarm name, and the value will be the date. The date neets to be in the format "DD.MM.YYYY HH:mm:ss".
* You can create an alarm with sendto. There, you can either send the components (minimum is Year Month Date) or a date string. For the date string, you can adjust the format in the setup of the adapter.
![Logo](admin/countdown_blocky.png)
* You can add days, months and years with sendto to todays date. Therefore, please send the component "name" and either "addminutes", "addhours", "adddays", "addmonths" or "addyears" as int value.
![Logo](admin/countdown_blocky_add.png)

## How to adjust countdowns
You  can update a countdown either in the adapter settings, or with the sendto. Therefore, just use the same name, and send it with the new date. This will update the countdown.

## How to delete countdowns
You  can delete a countdown with the sendto. Therefore, send just the name with sendto to the adapter, and the countdown will be deleted automatically.

## Repeating countdown
If you want a countdown to repeat in a defined period (e.g. you cant a countdown for your wedding day every year) you can also do this with this adapter. Therefore either fill the field "Repeat period" in the settings of the adapter, or add the period after the date when you create a countdown with the type "date". A sendTo would look like that for a countdown which should end on the 1st of April 2020 and repeat every year:

sendTo("countdown.0", "send", {
   "name": 'Wedding Day',
   "date": '01.04.2020 00:01+1Y'
});

Parameters here are:
* Y: Years
* M: Months
* D: Days
* H: Hours
* m: Minutes 

## Count Up
Newly added is the feature to "count up" - so to count the days from a date in the past. This can be done either in the adapter setup, or with  adding a "#" to a date string, e.g. 

sendTo("countdown.0", "send", {
   "name": 'Birthdate',
   "date": '01.04.2020 00:01#
});

## Available outputs
|Data type|Description|                                                                       
|:---:|:---:|
|minutes|Minutes until countdown end (not total!)|
|hours|Hours until countdown end (not total!)|
|days|Days until countdown end (not total!)|
|months|Months until countdown end (not total!)|
|years|Years until countdown end (not total!)|
|name|Countdown name|
|endDate|End date of countdown - formated as in the setup defined|
|inWordsShort|Combined value of minutes, hours,... - e.g. 1Y 5M 4D|
|inWordsLong|Combined value of minutes, hours,... - e.g. 1 Year 5 Months 4 Days|
|totalHours|Total no. of hours until the end date|
|totalDays|Total no. of days until the end date|
|totalWeeks|Total no. of weeks until the end date|
|totalMonths|Total no. of months until the end date|
|totalYears|Total no. of years until the end date|

|reached|Boolean field defining if the end date was reached or not|
|repeatEvery|Countdown is repeted by this period after reaching the enddate|

|totalsJson|JSON with the total objects for hours, days, weeks, months and years|
|fullJson|JSON with all objects|