![Logo](admin/pushbullet.png)
# ioBroker pushbullet Adapter

![Number of Installations](http://iobroker.live/badges/pushbullet-installed.svg) ![Number of Installations](http://iobroker.live/badges/pushbullet-stable.svg)

Send pushbullet notifications from ioBroker. 

## Usage

To send a notification from ScriptEngine, just write: 

```javascript
// send note
sendTo("pushbullet", "message body");

//OR

sendTo("pushbullet", {
    message: "message body",    //The Message you want to send
    title: "title",             //The Title of your message
    type: "note"                //Type Note
});

// send link
sendTo("pushbullet", {
    link: "http://www.example.com", //The Link you want to send
    title: "Title",             //The Title of your link
    type: "link"                //Type link
});

// send file

sendTo("pushbullet", {
    file: "/path/to/file",  //The file you want to send
    title: "Title",         //The Title of your file
    type: "file"            //Type file
});
```

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 3.0.1 (2026-08-03)
- (@GermanBluefox) The gulp build was replaced by `tasks.ts`
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 8.0.0 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (@GermanBluefox) Migrated to admin 8 and to TypeScript 6

### 2.1.0 (2024-04-25)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 2.0.1 (2023-10-09)
- (mcm1957) Dependencies have been updated

### 2.0.0 (2023-10-09)
- (mcm1957) first official release after migration to iobroker-community-adapters

### 2.0.0-alpha.0 (2023-09-30)
- (mcm1957) Adapter has been migrated to iobroker-community-adapters area
- (mcm1957) Dependencies have been updated


[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2015-2023 Jens1809

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
