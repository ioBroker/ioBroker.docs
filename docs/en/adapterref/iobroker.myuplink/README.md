---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.myuplink.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/myuplink-stable.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.myuplink.svg
BADGE-Number of Installations: https://iobroker.live/badges/myuplink-installed.svg
BADGE-NPM: https://nodei.co/npm/iobroker.myuplink.png?downloads=true
---
# ioBroker.myuplink

This ioBroker adapter receives data from myUplink.com. Settings that have been enabled for this by myUplink can be changed.

## Using this adapter

1. You need a myUplink compatible heat pump from NIBE, AIT, Cetetherm, ClimateMaster, Contura, CTA, CTC, Enertech Global or Høiax - buy one if you don't have ;-)
2. You need an account at myUplink: https://myuplink.com
3. Go to myUplink Api: https://dev.myuplink.com and log in
4. Click "Applications" and then "Create New Application"
5. Fill in: Name and Description can be everything e.g. ioBroker
6. The Callback URL is important for Authorization Code Grant Flow. You can use https://sebilm.github.io/ioBroker.myuplink/myuplink.html
7. Accept the myUplink API Services Agreement and click "Create"
8. Then you get an Identifier and a Secret - we need them
9. Install this adapter in ioBroker
10. At adapter setting page fill in the Identifier and the Secret.
11. Choose your language and all other settings.
12. Click Save and Close

Each device has an object in the object tree called `setData`. You can enter a JSON object of the form

```json
{
    "12345": "42",
    "23456": "1"
}
```

in this object. This makes it possible to send and change several data points to the API at the same time.
It can also be used to change data points that are not sent by the API.

## How the adapter works

The adapter retrieves the list of systems and devices from the myUplink API every x minutes (depending on the setting). It then
retrieves the available parameters for each device and saves them in the object tree. If myUplink sends new parameters in the process,
these are automatically added to the object tree.

The adapter generally does not delete any objects so that data is not lost if myUplink does not send a parameter.

The adapter also has no influence on which parameters are sent by myUplink.

## Changelog

### **WORK IN PROGRESS**

- Dependencies have been updated

### 0.8.4 (2024-12-25)

- xl attributes have been added to the jsonConfig #77
- Dependencies have been updated

### 0.8.3 (2024-10-20)

- TabsStyle was added to jsonConfig #71
- Dependencies have been updated

### 0.8.2 (2024-09-14)

- Changes due to API changes #60
- Dependencies have been updated

### 0.8.1 (2024-08-18)

- Existing incorrect minimum and maximum values are now deleted #39
- Minimum and maximum values of the API are not adopted if the current value is outside minimum and maximum #39
- Instructions for German and English have been moved to separate files #47
- Dependencies have been updated

### 0.8.0 (2024-07-14)

- No empty objects are sent (setData)
- Incorrect minimum and maximum values of the API are not adopted #39
- The initial refresh interval was set to 5 minutes
- The code has been restructured internally
- At least Node.js 18 is required!
- Unit tests have been added
- Dependencies have been updated

### 0.7.1 (2024-02-10)

- Crash after 'unhandled promise rejection' fixed #15

### 0.7.0 (2024-02-04)

- Forbidden characters are removed from the category
- An error when setting data has been fixed
- Performance has been improved

### 0.6.1 (2024-02-03)

- Performance has been improved
- Dependencies have been updated

### 0.6.0 (2024-01-28)

- The setData object has been added

### 0.5.0 (2024-01-14)

- Parameter IDs and categories have been added for a few heat pumps

### 0.4.1 (2024-01-13)

- In object IDs, all characters that are not officially supported are now replaced by an underscore
- The roles of the data objects have been improved
- The logging of token data (in log level silly) has been removed
- Dependencies have been updated

### 0.4.0 (2023-12-31)

- New options for renaming IDs have been added #5
- Options are deactivated if checkboxes are not checked

### 0.3.0 (2023-12-29)

- Support for setting parameter values has been added (must be paid for at myuplink.com) #4
- Authorization Code Grant Flow settings have been moved to new Extended tab
- Password control will be used for Secret and Auth Code

### 0.2.1 (2023-12-28)

- All responsive sizes have been added to jsonConfig
- More error logging have been added

### 0.2.0 (2023-12-28)

- Settings page have been changed from materialize to jsonConfig
- Dependencies have been updated

### 0.1.0 (2023-12-25)

- Initial release

## License

MIT License

Copyright (c) 2025 Sebastian Häßelbarth <seb@sebmail.de>

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