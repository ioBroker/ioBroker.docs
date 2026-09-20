---
chapters: {"pages":{"en/adapterref/iobroker.vis-timeandweather/README.md":{"title":{"en":"ioBroker.vis-timeandweather"},"content":"en/adapterref/iobroker.vis-timeandweather/README.md"},"en/adapterref/iobroker.vis-timeandweather/docs/en/README.md":{"title":{"en":"Time and weather widgets for vis-2"},"content":"en/adapterref/iobroker.vis-timeandweather/docs/en/README.md"}}}
---
# Time and weather widgets for vis-2

The time and weather widgets are seven widgets for clocks, dates and the weather. This page describes the **vis-2**
version. vis (vis-1) has the same widgets with the same settings, but they look slightly different there.

![All widgets](../img/overview.png)

**Contents**

- [General](#general)
    - [Requirements and migration](#requirements-and-migration)
    - [Language](#language)
    - [Own CSS](#own-css)
    - [Dark theme](#dark-theme)
- [SimpleClock](#simpleclock---tpltwsimpleclock)
- [SimpleDate](#simpledate---tpltwsimpledate)
- [CoolClock](#coolclock---tpltwcoolclock)
- [FlipClock](#flipclock---tpltwflipclock)
- [WeatherCustom](#weathercustom---tpltwweather)
- [Svg Clock](#svg-clock---tplsvgclock)
- [Segment Clock](#segment-clock---tplsegmentclock)
- [Differences to vis-1](#differences-to-vis-1)

## General

### Requirements and migration

The widgets are in the widget set **Time and weather** in the widget list of the vis-2 editor. The React versions
described here need **vis-2 2.12.8** or newer. Older vis-2 versions show the vis-1 widgets instead.

Projects made with vis-1 keep working without changes. Both versions use the same widget ids (`tplTwSimpleClock`,
`tplTwCoolClock`, ...) and the same attribute names, and vis-2 picks the React version automatically. All settings
carry over.

In the tables below, **Setting** is the label in the vis-2 editor and **Attribute** is the name stored in the project.
Use the attribute name when you edit a project in JSON or copy settings between widgets.

The clocks show the time of the device that displays the view, not the time of the ioBroker server. All clocks switch
at the same moment, on the full second.

### Language

Week days, month names and the words of the weather widget are available in all languages of vis-2: English,
German, Russian, Portuguese, Dutch, French, Italian, Spanish, Polish, Ukrainian and Chinese. The widgets use the
language of vis-2. The weather widget has a setting of its own to override it.

### Own CSS

The widgets use the class names of vis-1, and the rules have the same weight as there. So CSS that you wrote for
vis-1 in the CSS of the project still applies, for example:

```css
/* grey background for the forecast days */
.weatherForecastItem { background-color: #444; }
/* red digits of the flip clock */
.flip-clock-wrapper ul li a div div.inn { color: #e53935; }
```

| Widget | Classes |
|---|---|
| SimpleClock | `clock` on the widget |
| SimpleDate | `date` on the widget |
| FlipClock | `flip-clock-wrapper`, `flip`, `play`, `flip-clock-before`, `flip-clock-active`, `up`, `down`, `inn`, `shadow`, `flip-clock-divider`, `flip-clock-dot`, `flip-clock-meridium` |
| WeatherCustom | `weatherFeed` on the widget, `weatherItem` (plus `day` or `night`), `weatherCity`, `weatherTemp`, `weatherDesc`, `weatherRange`, `weatherWind`, `weatherHumidity`, `weatherForecast`, `weatherForecastItem`, `weatherForecastDay`, `weatherForecastDate`, `weatherForecastText`, `weatherForecastRange` |

The CSS settings of a widget in the editor (font, colour, border, ...) apply to the widget itself. They win over
`clock`, `date` and `weatherFeed`, which sit on the widget. The inner parts of the flip clock and of the weather box
keep their own colours; change those with rules like the ones above. The font size of the weather widget scales the
whole box. The colours of the Svg Clock, the CoolClock and the Segment Clock are settings of the widgets.

### Dark theme

The faces of the clocks and the weather box keep their colours in both themes of vis-2. Only what lies directly on
the view changes: the dots and the AM/PM of the flip clock. See [FlipClock](#flipclock---tpltwflipclock).

## SimpleClock - `tplTwSimpleClock`

![SimpleClock](../img/simple-clock.png)

The time as text: `hh:mm:ss` or `hh:mm`, always with 24 hours and leading zeros. The picture shows the default, the
clock without seconds, and a clock with *No style* and its own font and colour.

**Look.** The widget gets the class `clock`: large grey bold digits with a shadow (Trebuchet MS, 80 px). The CSS
settings of the widget in the editor override single properties of it, for example only the font size. If you want to
style the clock completely with a class of your own, turn on *No style*: then the widget has no look of its own.

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Hide seconds | `hideSeconds` | off | Shows `hh:mm`. |
| Blink | `blink` | off | Only without seconds: the colon disappears every other second. The minutes do not move. |
| No style | `noClass` | off | Removes the class `clock`, see above. |

Default size: 316 x 92 px.

## SimpleDate - `tplTwSimpleDate`

![SimpleDate](../img/simple-date.png)

Today's date as text. It changes right after midnight.

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Show day of week | `showWeekDay` | off | Puts the day of the week in front: `Thursday, ...`. |
| Short week day | `shortWeekDay` | off | Only with *Show day of week*: `Thu`, `Do`, ... |
| Short year | `shortYear` | off | `26` instead of `2026`. |
| Prepend zero | `prependZero` | on | `05` instead of `5` for day and month. |
| Month as word | `monthWord` | off | `21st May, 2026` or `21. Mai 2026` instead of numbers. |
| Short month | `shortMonth` | off | Only with *Month as word*: the first three letters, e.g. `Sep`. |
| American format | `americanOrder` | off | English only: month before day. |
| No style | `noClass` | off | Removes the class `date` (grey bold text, 26 px), like *No style* of the [SimpleClock](#simpleclock---tpltwsimpleclock). |

The formats depend on the language of vis-2:

| | English | American format (English) | All other languages |
|---|---|---|---|
| Numbers | `21/05/2026` | `05/21/2026` | `21.05.2026` |
| Month as word | `21st May, 2026` | `May 21st, 2026` | `21. Mai 2026` |

Default size: 134 x 33 px. Longer texts, for example with the day of the week, wrap onto a second line unless the
widget is wide enough.

## CoolClock - `tplTwCoolClock`

An analog clock with 21 skins, drawn on a canvas. The clock is always round. Its diameter is the shorter side of
the widget, and the editor keeps the widget square.

![Skins](../img/cool-clock-skins.png)

![Options](../img/cool-clock-options.png)

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Theme | `theme` | classic | The skin, see picture. An unknown name shows `chunkySwiss`. |
| Hide seconds | `noSeconds` | off | Without second hand. The clock is then redrawn every 15 seconds. |
| Digital clock | `showDigital` | off | Shows the time as text below the centre, without seconds. |
| Show am/pm | `showAmPm` | off | Only with *Digital clock*: 12-hour time with `am` / `pm`. |

Some skins (`Sand`, `Sun`, `Tumb`, `Stone`, `Disc`) draw beyond the round face and are cut at the edge of the
widget, as in vis-1. Default size: 150 x 150 px.

## FlipClock - `tplTwFlipClock`

![FlipClock](../img/flip-clock.png)

A clock with flip cards for hours, minutes and seconds. When a digit changes, the upper half of the card folds
down.

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Clock face | `face` | 24 hours | `24 hours` (`TwentyFourHourClock`) or `12 hours (AM/PM)` (`TwelveHourClock`). The 12-hour clock shows 12:00 to 11:59 and `AM` / `PM` behind the seconds. |

The clock has a fixed size and cannot be resized: 500 px wide with 24 hours, 600 px with 12 hours, about 110 px high.
As in vis-1, the cards start 1 em right of and below the top left corner of the widget. The colours can be changed
with [own CSS](#own-css).

In the dark theme of vis-2 the dots and `AM` / `PM` become light, so they stay visible on a dark view:

![FlipClock in the dark theme](../img/flip-clock-dark.png)

## WeatherCustom - `tplTwWeather`

![WeatherCustom](../img/weather.png)

The current weather and a forecast for today and up to six more days. The widget takes its values from any states,
for example of the *daswetter*, *accuweather* or *weatherunderground* adapter: you select one state per value.

The box shows, from top to bottom:

- city, current temperature, weather condition
- *High* / *Low*: maximum and minimum of today
- *Wind*: direction and speed. A direction in degrees is shown as compass direction (`255` → `WSW`), a text like
  `SW` stays as it is.
- *Humidity* in %
- the forecast: one line per day with week day, date, condition and temperatures, starting with today

The icon of *Now* is the background image of the box, the icons of the days are at the left of each line. Without
an icon of *Now* the box has a gradient from grey to dark. The widget cuts everything that does not fit: at the
default size of 250 x 107 px only the upper part is visible, so make the widget as high as the days you want to show.

**Weather conditions.** If a condition is one of the known weather terms (`Cloudy`, `Rain`, `Wolkig`, `Regen`,
`Облачно`, ...) in any language, it is shown in the language of the widget. Any other text is shown exactly as the
adapter delivers it.

| Setting | Attribute | Default | Description |
|---|---|---|---|
| City | `city` | | Name above the temperature, shown in capitals. |
| Language | `language` | as vis | Language of the week days, the months, the labels and the conditions. |
| Speed units | `units_speed` | `km/h` | Appended to the wind speed. |

**Group "Now"** - today and the current weather:

| Setting | Attribute | Description |
|---|---|---|
| Temperature ID | `temperature-0-oid` | Current temperature. |
| Condition ID | `condition-0-oid` | Current weather condition as text. |
| Humidity ID | `humidity-0-oid` | Humidity in %. |
| Min. temperature ID / Max. temperature ID | `temperature-min-0-oid` / `temperature-max-0-oid` | Minimum and maximum of today. |
| Wind speed ID | `wind-speed-0-oid` | Wind speed. Without it there is no wind line. |
| Wind direction ID | `wind-dir-0-oid` | Direction in degrees (0 = north) or as text. |
| Icon URL ID | `icon-0-oid` | A state with the URL of an image. |

**Groups "Tomorrow", "Day after tomorrow", "In 3 days" ... "In 6 days"** - the forecast, attribute names with the
number of the day (`1` = tomorrow ... `6`):

| Setting | Attribute | Description |
|---|---|---|
| Condition ID | `condition-1-oid` | Weather condition of that day. |
| Min. temperature ID / Max. temperature ID | `temperature-min-1-oid` / `temperature-max-1-oid` | Temperatures of that day. |
| Icon URL ID | `icon-1-oid` | URL of the image of that day. |

The forecast ends at the first day that has neither temperatures nor a condition. Lines for values that are not set
are left out. Instead of an object ID, every field also takes a binding like `{weather.0.current.temp}`.

## Svg Clock - `tplSvgClock`

![Svg Clock](../img/svg-clock.png)

An analog clock drawn as SVG. It scales to any size, the lines keep their width in pixels. The editor keeps the
widget square.

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Quarter text size | `quadSize` | 60 | Size of the numbers 12, 3, 6 and 9, relative to a clock of 900 units. |
| Quarter text color | `quadColor` | `#333` | Colour of these numbers. |
| Quarter tick color | `quadTickColor` | `#333` | Colour of the ticks at every fifth minute. |
| Minutes text size | `textSize` | 30 | Size of the minute numbers 0, 5, 10, ... outside the ring. |
| Minutes text color | `textColor` | `#555` | Colour of the minute numbers. |
| Small tick color | `tickColor` | `#555` | Colour of the other ticks. |
| Show second hand | `isSeconds` | off | Shows the second hand. |
| Hands color | `handsColor` | `#111` | Colour of the hour and minute hand. |
| Hands color bulge | `handsColorLine` | `#666` | Colour of the line inside the hands. |
| Second hand color | `handsSecColor` | `#be5639` | Only with *Show second hand*. |
| Text font | `textFont` | Verdana | Font of all numbers. |

Default size: 100 x 100 px.

## Segment Clock - `tplSegmentClock`

![Segment Clock](../img/segment-clock.png)

A display with 7, 14 or 16 segments per character, like on a clock radio. It shows, in this order:

1. the value of *Object ID*, if set,
2. otherwise the *Text*, if set,
3. otherwise the time, if *Enable clock* is on,
4. otherwise `no oid, no text, no clock`.

The display is scaled to fit the widget and keeps its proportions: *Digit height*, *Digit width* and the other sizes
are relations, not pixels. Letters are shown as far as the segments allow it; 7 segments only know digits and a few
letters, 16 segments nearly all. Upper and lower case look the same.

**Group "Common"**

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Object ID | `oid` | | A state whose value is shown. |
| Text | `text` | | A fixed text. Only without *Object ID*. |

**Group "Clock"**

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Enable clock | `clock` | on | Shows the time, if neither *Object ID* nor *Text* is set. |
| Show seconds | `seconds` | on | `hh:mm:ss` instead of `hh:mm`. If it is off and the pattern is the default `##:##:##`, the widget uses `##:##` - also for a value or a text. |

**Group "Style"**

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Pattern | `pattern` | `##:##:##` | One `#` per character. `.` and `:` are narrow places for a dot or a colon, a space is a gap. Every place takes one character of the value, so a value `21.5` needs the pattern `##.#`. Other characters make the display empty. |
| Segment color ON / OFF | `colorOn` / `colorOff` | black / 10 % black | Colours of the lit and of the dark segments. |
| Running text interval (ms) | `runStepInterval` | 0 | For a value or a text: moves the text one character to the left every that many milliseconds and lets it come in again from the right. 0: no running text. |
| Segment count | `segmentCount` | 7 | 7, 14 or 16 segments per character. |
| Display angle | `displayAngle` | 9 | Slant of the characters in degrees. |
| Digit height / Digit width | `digitHeight` / `digitWidth` | 20 / 12 | Proportions of a character. |
| Digit distance | `digitDistance` | 2 | Space between the characters. |
| Segment width | `segmentWidth` | 3 | Thickness of the segments. |
| Segment distance | `segmentDistance` | 0.5 | Gap between the segments. |
| Corner type | `cornerType` | pointed | Shape of the segment ends, see below. |

![Corner types](../img/segment-corners.png)

The names of the corner types come from vis-1 and do not quite fit what they draw: *pointed* gives rounded ends, and
*rounded* looks like *symmetric*. They were kept so that existing projects look the same.

Default size: 100 x 30 px.

## Differences to vis-1

The vis-2 widgets use no jQuery and none of the libraries of vis-1 (CoolClock, FlipClock.js, zWeatherFeed,
segment-display.js). The drawing of the CoolClock and of the segment display is taken over unchanged. Projects carry
over unchanged. Some details work differently:

- **Languages:** week days, months and the weather words exist in all languages of vis-2. vis-1 only knew English,
  German and Russian and showed `undefined` for other languages.
- **Weather conditions:** only exact weather terms are translated. vis-1 also accepted terms that merely contained the
  text, and showed `Rain` as *Mixed rain and snow* and an empty condition as *Tornado*.
- **Weather:** values that are not set leave no empty lines like `High: ° Low: °`. The Yahoo! icons that vis-1 used as
  a fallback for a missing icon are gone, as is the service.
- **Weather:** the groups of the forecast days are named correctly. In vis-1 the day in three days was labelled
  *In 2 days*.
- **SimpleDate:** English ordinal numbers are right for the 21st, 22nd, 23rd and 31st, also with a leading zero.
- **Svg Clock:** several clocks on one view can have different tick colours. In vis-1 all took the colours of the
  first one.
- **CoolClock and Segment Clock:** sharp on high-resolution screens.
- The widgets **HtcWeather** and **YahooWeather** of vis-1 are not available, since the Yahoo! weather service they
  needed was shut down. Use *WeatherCustom* with the states of a weather adapter instead.