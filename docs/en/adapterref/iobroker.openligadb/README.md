![Logo](admin/openligadb_b.png)

# ioBroker Adapter to get soccer sport match results from OpenLigaDB

[![Number of Installations](http://iobroker.live/badges/openligadb-installed.svg)](https://github.com/oweitman/ioBroker.openligadb)
[![NPM version](http://img.shields.io/npm/v/iobroker.openligadb.svg)](https://www.npmjs.com/package/iobroker.openligadb)
[![Downloads](https://img.shields.io/npm/dm/iobroker.openligadb.svg)](https://www.npmjs.com/package/iobroker.openligadb)
[![Travis](https://img.shields.io/travis/oweitman/ioBroker.openligadb.svg)](https://travis-ci.org/oweitman/ioBroker.openligadb/)
[![AppVeyor Build Status](https://img.shields.io/appveyor/ci/oweitman/iobroker-openligadb.svg)](https://ci.appveyor.com/project/oweitman/iobroker-openligadb)
[![GitHub issues](https://img.shields.io/github/issues/oweitman/ioBroker.openligadb.svg)](https://github.com/oweitman/ioBroker.openligadb/issues)


## Overview
Adapter to request game data for soccer or other games form openligadb.de


## Configuration
Add an instance of the adapter and click on the wrench symbol
In the form you can add the shortcut from a league and a season.
Please visit openligadb.de for available leagues,seasons and shortcuts
If a season is spread over two years, please enter only the start year.

Example data for 1. German Bundliga is
shortcut = bl1     season = 2019

If you saved and closed the configuration, a short while after this there must be new datapoints for your league and season.

## vis and Widgets 
Actually there are 3 widgets available. Please enter openligadb in the widget filter

### Table 
This widget display the acual ranking of your league

### Gameday 
All games of the actual or selected gameday. There are many widget-attributes to configure the amount of the displayed data

### FavGame
Display all, actual or future games of your favorite clubs

Documentation for the vis-widgets are available inside vis or [Widget-Documentation/german](https://htmlpreview.github.io/?https://github.com/oweitman/ioBroker.openligadb/blob/master/widgets/openligadb/doc.html)

## Todo

* validation in widget if user didnt select the right datapoint
* translation
* documentation for new widgets pivottable and goalgetters
* ~~extend table modes with 1st round,2nd round~~
* ~~new widget pivot table of played games~~
* ~~new widget goal getter ranking with sort function~~
* ~~extend table with trend sign (arrow up/down, point for no change)~~
* ~~extend table to calculate with x last games~~
* ~~extend table to calculate ranking for a defined gameday~~ 
* ~~documentation adapter / widget~~
* ~~fix issue for dynamic with of club column~~
* ~~new widget: next x games of club~~
* ~~widget gameday setting for start gameday an length (-1,3 = show previous gameday and 3 gamedays after that)~~
* ~~Replacement value for edit mode if showgameday is set with binding~~
* ~~highlight favorite club~~
* ~~controllable gameday in the gameday widget~~

## Changelog

### 1.2.1
* fix object type
### 1.2.0
* fix display of goals if goals are without minutes and playername saved by openligadb
* fixed that sometimed request of states failed
### 1.1.0
* prepare v1.1.0
### 1.0.3
* change setstate/createobject logic
### 1.0.2
* remove deprecated widgets / change widget beta flag
* improve debug messages
### 1.0.1
* improve error message for requests
### 1.0.0
* prepare for stable repository
### 0.11.5
* pivottable: show only results for selected gameday
* table3: icon attributes, add image selection dialog
* table3: add an extra attribute for mode to use with binding
* all widgets: update documentation
### 0.11.4
* fixed build/test problem
### 0.11.3
* pivottable: fix problem with rank number
### 0.11.2
* pivottable: fix problem with sort and highlightontop
* fix problem with goalgetters 
### 0.11.1
* change some template settings, goalgetter table get headers, add object change sensing
* widget goalgetters: add parameter highlight and showonlyhighlight
* widget pivottable: add sort option and choice to place favorite teams on top
* remove year from date for several widgets
### 0.11.0
* extend table to calculate with x last games and extend table to calculate ranking for a defined gameday, to ensure backward compatibility i have to create a new table v3 widget
* extend table with trend sign (arrow up/down, point for no change)
* new widget goal getter ranking with sort function
* new widget pivot table of played games
* extend table modes with 1st round,2nd round
### 0.10.3
* change computing and output logic of gameday widget to mark gameday header with favorite class
* improve documentation with css-klasses for  table widget
* bugfix for calculate gameday.
### 0.10.2
* Add data column goaldiff to table widget, improve more documentation (systax highlighting,copy code function), add example to control gameday with buttons,
### 0.10.1
* Improve documentation with more recipes and syntax highlighting, improve code to get and subscribe states
### 0.10.0
* New widget Table 2 that  includes the calculation of the total, home and away results. the previous widget is now deprecated, due to the different datapoint (allmatches) to be selected.
### 0.9.3
* Remove ES6 features due to compatibility with older browsers 
### 0.9.2
* next try to fix the experimental javascript binding function 
### 0.9.1
* fix bugs in calculation matchresults and highlight clubs in favgames 
### 0.9.0
* new Function for vis Binding to search for games at the actual day for favorite clubs, css-classes für games at actual day, fix bug to show the right match results, 
### 0.8.0
* push version for latest repository. fix some typos. fix a problem with date handling on different OS
### 0.0.11
* widget gameday: fix issue with not working gamedaycount
### 0.0.10
* widget gameday: optional you can show informations about the goalgetters
### 0.0.9
* optional weekday for widgets: gameday and gamesoffavclub,highlight the clubname in gamesoffavclub
### 0.0.8
* new widget games of favorite clubs with multi league support as replacement for the old one
### 0.0.7
* close connections and remove observers (timeouts/intervals)
### 0.0.6
* NPM deployment and preperation for the latest repository
### 0.0.5
* highlight favorite club, 
* Replacement value for edit mode if showgameday is set with binding, 
* widget gameday setting for start gameday an length (-1,3 = show previous gameday and 3 gamedays after that) 
* some documentation 
* remove unused code
* new widget: next x games of club
* fix issue for dynamic with of club column
### 0.0.4
* fixed more oids in vis runtime
### 0.0.3
* fixed getting oids in vis runtime
### 0.0.2
* add controlable gameday logic to gameday widget and adapter
### 0.0.1
* initial release

## License
MIT License

Copyright (c) 2020 oweitman

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
