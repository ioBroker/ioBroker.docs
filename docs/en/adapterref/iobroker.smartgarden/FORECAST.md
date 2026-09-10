---
chapters: {"pages":{"en/adapterref/iobroker.smartgarden/README.md":{"title":{"en":"ioBroker.smartgarden"},"content":"en/adapterref/iobroker.smartgarden/README.md"},"en/adapterref/iobroker.smartgarden/FAQ.md":{"title":{"en":"ioBroker.smartgarden"},"content":"en/adapterref/iobroker.smartgarden/FAQ.md"},"en/adapterref/iobroker.smartgarden/FORECAST.md":{"title":{"en":"ioBroker.smartgarden"},"content":"en/adapterref/iobroker.smartgarden/FORECAST.md"}}}
---
![Logo](admin/smartgarden.png) 

# ioBroker.smartgarden

## Table of Contents

* [General forecast variants](#general-forecast-variants)
   * [Qualitative forecast](#qualitative-forecast)
   * [Quantitative forecast](#quantitative-forecast)
* [Forecasting in ioBroker.smartgarden](#forecasting-in-iobrokersmartgarden)
   * [What is implemented?](#what-is-implemented)
      * [An example - charging battery](#an-example---charging-battery)
   * [Detection of invalid data](#detection-of-invalid-data)
      * [Error check](#Error-check)
      * [Basic check](#basic-check)
      * [Enhanced check with box plot](#enhanced-check-with-box-plot)
   * [Handling for invalid data](#handling-for-invalid-data)
* [License](#license)

## General forecast variants

To forecast things we distinguish two main variants:

* qualitative forecast or
* quantitaive forecast

### Qualitative forecast
Qualitative forecasts are subjective assessments that are created intuitively 
by experts with a mature specialist knowledge. 

A possible variant is linear extrapolation → past values are roughly 
projected into the future.

Further variants are opinion polls.

### Quantitative forecast
Quantitaive forecasts consist mainly of the processing of data material. 
They give concrete, numerical results.

Common known quantitative forecasts are weather forecasts.

## Forecasting in ioBroker.smartgarden 

***all is data - data is all***

A smart device is ideal for collecting data. The same processes take place 
regularly.
For this reason an forecast function is implemented in smartgarden which 
collects some history data and uses this historic data to forecast the 
remaining charging and mowing time.

As far as I've seen, the mowing time varies quite significantly over 
a year. The mowing time follows the growth of the lawn. This is therefore 
mapped with this implementation. Just like the fact that the built-in 
battery is subject to a certain aging and will certainly lose capacity 
over time.

### What is implemented?

This implementation holds historic data for mowing and charging cycles. 

The following description is independent from mowing or charging times - 
it fits for both.

For historic data there is a set of real cycles. One real cycle holds 
101 elements (e.g. your battery capacity goes from 0 to 100 → 101 elements). 
In each element, a timestamp and the current capacity of the battery 
(in percent) is saved. 

When a cycle has finished, 
* the validity is checked and 
* the time difference to the end time is calculated for each battery level

#### An example - charging battery

| Capacity [%} | 0 | 1 | 2 | 3 | ... | 98 | 99 |100 
| - | - | - | - | - | - | - | - | -
| Time [min:sec] | 10:00 | 10:02 | 10:05 | 10:06 | ... | 13:16 | 13:18 | 13:20 
| Δ time [sec} to finish cycle| 200 | 198 | 195 | 194 | ... | 4 | 2 | 0 

You see, that the process started at 0% (first line) at 10:00 (second line) 
and ended with 100% at 13:20. The time difference for each element is 
written in the third line. As you see the time difference was nearly 
linear but for the step from capacity 1% to 2% the battery needed a 
little bit more time. 

If you should now forecast the needed time for the next battery charge 
you would surely say:

  - at capacity 0: it needs 200 seconds till battery is fully charged
  - at capacity 1: it needs 198 seconds till battery is fully charged
  - at capacity 2: it needs 195 seconds till battery is fully charged
  - at capacity 3: it needs 194 seconds till battery is fully charged
  - ...
  - at capacity 99: it needs 2 seconds till battery is fully charged
  - at capacity 100: it needs 0 seconds till battery is fully charged

  All those forecast values are available in your historic data.

  As written before there is a set of such cycles. With several cycles, 
  the average of the individual values is formed for the prediction of a 
  single value. This reduces the impact of possible data errors.

Of course your mower will not start charging with a battery level 
of 0% or said in other words, your mower will not mow till your battery 
is completely empty. 

### Detection of invalid data

One of the biggest challenges in statistics is to identify invalid data.
In order to achieve this, errors are monitored. In addition, 
a basic check and an extended check are carried out.

#### Error check

Errors while mowing are constantly monitored. An error in this context occurs when
the value of datapoint `state_value` is not equal `OK`.

#### Basic check

In order for a history set to be accepted as valid, the end of the action 
(mowing or charging) must have been recognized. This is recognized by a 
status change.

- for end of mowing: 
  - datapoint: `activity_value` 
    | old status | new status |
    | - | - |
    | `OK_CUTTING` or `OK_CUTTING_TIMER_OVERRIDDEN` | `OK_SEARCHING` or `OK_CHARGING` | 

- for end of charging:
  - datapoint: `batteryState_value`
    | old status | new status |
    | - | - |
    |  `CHARGING` |  `OK`|  

#### Enhanced check with box plot
	
Further correctness is checked using the box plot method. For description 
about box plots please see at WIKIPEDIA, 
[english](https://en.wikipedia.org/wiki/Box_plot) and 
[german](https://de.wikipedia.org/wiki/Box-Plot).

A box plot is created for the battery level at the end of the action.

This value will definitely change over time, but quick, big changes 
are not to be expected either. Errors in the data, e.g. because mowing 
is stopped by hand, can be reliably recognized.

*Just to clarify:* The adapter does not create real plots, but it prepares 
the data as if plots were created so that it can be decided whether the 
data is recognized as valid or not.

### Handling for invalid data

Invalid data aren't saved in history data.

If the adapter detects more than 10 invalid history sets in a row, the complete 
history is deleted.

## License

 Copyright (c) 2020 jpgorganizer, https://github.com/jpgorganizer 
 
 smartgarden by jpgorganizer is licensed under a 
 Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License 
 [(CC-BY-NC-SA-4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
 Based on a work at https://github.com/jpgorganizer/ioBroker.smartgarden.
 

<!--- SVN: $Rev: 2831 $ $Date: 2022-06-13 13:00:32 +0200 (Mo, 13 Jun 2022) $ --->