---
title: Diagrams
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/tutorial/flot.md
hash: 4io22R9ecslk+9zgmzF0lTrCeD8najWZfXUqFvv8WJw=
---
# Diagrams

Recorded values only become useful as a trend. This page shows the process of creating a graph from a recorded data point to a single-page chart.

First, values must be recorded. Without recording, every diagram remains empty, see \[link/reference].
[Record values](/docs/tutorial/history.md).

## Which adapter

| adapter     | note                                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------ |
| **echarts** | The latest chart adapter. The first choice for new charts.                                             |
| **fast**    | The older one. Still in use in many existing installations.                                            |
| **Grafana** | Not an ioBroker adapter, but a separate program. Worthwhile for a large number of charts and analyses. |

To begin with: `echarts`. He brings a separate tab to the admin panel where diagrams are compiled.

## Build a diagram

1. Install the adapter and create an instance.
2. Open the new tab and create a diagram.
3. A first **line** Add it and assign the recorded data point to it. The source of the data is also specified, i.e., from... `history`, `influxdb` or `sql`.
4. Set and save the time period and label.

If the line remains empty, it is almost always due to one of three reasons: the data point is not being recorded at all, the wrong source has been selected, or the set time period is before the start of the recording.

## Sensible settings

- **Choose a suitable time period.** A temperature reading over 24 hours is readable, but not over a year.
- **Summarize.** For long periods, don't plot every single measurement; instead, plot hourly or daily averages. This significantly reduces the load on the browser.
- **Unit to the axis.** A diagram without units is a curve without meaning.
- **Two axes at different sizes.** Temperature and humidity on the same axis produce an unreadable image.

## Incorporate into the image

A finished diagram can be converted into a
[Visualization](/docs/tutorial/viz.md)
To integrate a saved diagram, you need to include it. Common widget sets offer a widget that displays this type of diagram. You simply specify which one.

A chart with a very large number of points loads slowly, especially on a tablet. If a page becomes sluggish, a chart is usually the cause.

## What happens next?

The foundations are now in place. What comes up regularly is updating:
[Install updates](/docs/tutorial/updates.md).