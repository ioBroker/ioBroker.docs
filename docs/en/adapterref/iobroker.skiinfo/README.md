# ioBroker.skiinfo

![Logo](admin/skiinfo.png)

[![NPM version](https://img.shields.io/npm/v/iobroker.skiinfo.svg)](https://www.npmjs.com/package/iobroker.skiinfo)
[![Downloads](https://img.shields.io/npm/dm/iobroker.skiinfo.svg)](https://www.npmjs.com/package/iobroker.skiinfo)
![Number of Installations](https://iobroker.live/badges/skiinfo-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/skiinfo-stable.svg)
[![nycrc config on GitHub](https://img.shields.io/nycrc/oweitman/iobroker.skiinfo?preferredThreshold=functions)](https://html-preview.github.io/?url=https://github.com/oweitman/ioBroker.skiinfo/blob/main/coverage/index.html)

[![NPM](https://nodei.co/npm/iobroker.skiinfo.png?downloads=true)](https://nodei.co/npm/iobroker.skiinfo/)

**Tests:** ![Test and Release](https://github.com/oweitman/ioBroker.skiinfo/workflows/Test%20and%20Release/badge.svg)

## skiinfo adapter for ioBroker

With this adapter you can access the current snow depths for mountain, valley
and fresh snow, as well as open lifts for various European locations.

## Configuration

The adapter dont need any configuration.

## vis and widgets

The following widgets actually exists

- [`Skiinfo browser`](#skiinfo-browser) - to browse through all available
  countries, regions and areas and set favorite areas.
- [`Skiinfo Favorites`](#skiinfo-favorite) - to show only the favorite ski areas.

weitere Informationen

- usabele [`CSS classes`](#css-classes) for individual styling

### Skiinfo browser

The widget allows you to browse all available countries, regions, and
territories and set favorites.

You can toggle the sorting for each column (default, descending, or ascending)
using the table header.
You can search using the search icon in the area column.
You can toggle favorites mode using the star icon.

Select the configuration data point as the data point.

### Skiinfo favorite

The widget is used to show only the favorite ski areas.
With the table head, you can toggle the sort mode for each column (default,
descending, ascending).
With the star icon you can remove the area from the favorite list.

As a datapoint please select the config datapoint.

### CSS Classes

#### `widgetID` and `skiinfo`

All CSS classes are provided with the two base classes `widgetID` and `skiinfo`.
This allows you to apply formatting to individual widgets or, when using multiple
skiinfo widgets, to all skiinfo widgets.

#### `countries`,`regions` and `areas`

each of the different information areas can be addressed separately with
these 3 CSS classes

#### Information areas country, region and area

Each of the 3 information areas consists of a normal HTML table.

#### Selected Elements in Country and Region

Each of the selected elements is located in a span element and has been given
the CSS class `selected`.

#### Formatting the columns in the Area section

The table header was provided with the CSS classes tharea and thsort.
Each column element was provided with `txtr` for right-aligned and `txtl`
for left-aligned formatting.

#### Favorite star

The favorite star can be located in a span element and can be addressed via the
CSS class `favorite`. If an element has been selected as a favorite, the span
element is supplemented with `selected`.

#### Examples for CSS classes

##### Different color for a selected country or region element

```css
.skiinfo .selected {
    color: green;
}
```

##### Different formatting of the `regions` elements

```css
.skiinfo.regions span {
    color: grey;
}
```

## Available sendTo commands

### getServerSkiData

Get the current data for the requested ski data to the client.

#### Parameters for getServerSkiData

none

#### Example for getServerSkiData

```javascript
let instance = 'skiinfo.0';
let response = await sendToAsync(instance, 'getServerSkiData', {});
console.log(response);
```

### getServerCountryData

Loads the country data if it was not already loaded and
sends the data back to the client.

#### Parameters for getServerCountryData

- countrycode

#### Example for getServerCountryData

```javascript
let instance = 'skiinfo.0';
let response = await sendToAsync(instance, 'getServerCountryData', { countrycode: 'deutschland' });
console.log(response);
```

### getServerRegionData

Loads the country and region data if it was not already loaded and sends the data
back to the client.

#### Parameters for getServerRegionData

- countrycode
- regioncode

#### Example for getServerRegionData

```javascript
let instance = 'skiinfo.0';
let response = await sendToAsync(instance, 'getServerRegionData', {
    countrycode: 'deutschland',
    countrycode: 'bayern',
});
console.log(response);
```

### addServerFavorite

Adds a favorite area for the given country and area.
If the favorite area does not exist it will be added.
Sends the updated data back to the client.

#### Parameters for addServerFavorite

- countrycode
- regioncode

#### Example for addServerFavorite

```javascript
let instance = 'skiinfo.0';
let response = await sendToAsync(instance, 'addServerFavorite', { countrycode: 'deutschland', countrycode: 'bayern' });
console.log(response);
```

### delServerFavorite

Removes a favorite area for the given country and area.
Sends the updated data back to the client.

#### Parameters for delServerFavorite

- countrycode
- regioncode

#### Example for delServerFavorite

```javascript
let instance = 'skiinfo.0';
let response = await sendToAsync(instance, 'delServerFavorite', { countrycode: 'deutschland', countrycode: 'bayern' });
console.log(response);
```

## Todo

- to be defined

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- test remove node 18,extend to node 24

### 0.5.0 (2025-04-16)

- add search for regions in browser

### 0.4.1 (2025-04-08)

- fix url
- fix classname of CountryList
- improve icons with round corners
- fix advices from code review
- fix global dependency

### 0.4.0 (2025-03-05)

- fix version info

### 0.3.0 (2025-03-05)

- release

### 0.2.0 (2025-03-05)

- enable npm deploy

### 0.1.0 (2025-03-05)

- initial release
- The color for favorites has now been made selectable
- minor CSS improvements
- Documentation of the sendTo commands has been added.
- The documentation of the CSS classes has been added.

## License

MIT License

Copyright (c) 2025 oweitman <oweitman@gmx.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
