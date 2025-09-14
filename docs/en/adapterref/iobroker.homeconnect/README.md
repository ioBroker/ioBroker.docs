---
BADGE-GitHub license: https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.homeconnect
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.homeconnect.svg
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.homeconnect
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.homeconnect
BADGE-GitHub commits since latest release (by date): https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.homeconnect/latest
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.homeconnect
BADGE-GitHub issues: https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.homeconnect
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.homeconnect.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/homeconnect-stable.svg
BADGE-Number of Installations: https://iobroker.live/badges/homeconnect-installed.svg
---
![Logo](admin/homeconnect.png)

# ioBroker.homeconnect

## Requirements before installation

- Node 20, 22 or 24
- JS-Controller >= 6.0.11
- Admin >= 7.4.10

A ClientID is required for the adapter. Use the settings for each step to register.

<https://developer.home-connect.com>

![Screenshot](img/registrierung1.JPG)

For **Default Home Connect User Account for Testing**, specify the e-mail address with which the Home Connect app is to be sent.
was registered, this is also required later in the authorization process.

![Screenshot](img/registrierung2.JPG)

For **Account Type** select Individual. Add the remaining data if available (no idea if this will be checked).

![Screenshot](img/application1.JPG)

Then go to **Applications** and then to **Register Application**.

![Screenshot](img/application2.JPG)

For **Application ID** enter a name for the application, e.g. ioBroker. With **OAuth Flow** Device Flow select.
**Home Connect User Account for Testing** can remain empty. For **Success Redirect** enter a URI, e.g. https://example.com.
Then save and you have the required ClientID.

## Configuration

Please add Homeconnect App username, password and generated cleintId into adapter config.

## Usage

With the states in commands you can stop, pause and resume a program.
With the states in settings you can turn off or turn on the device
Change the value of programs.active.BSH_Common_Root_ActiveProgram leads to starting a program
Update iQ300: You need to set the program name in this variable. If programs.selected.BSH_Common_Root_SelectedProgram is copied, the machine user can predefine the wanted program at the machine and it will be started via ioBroker
Change the value of programs.selected.BSH_Common_Root_SelectedProgram leads to selecting a program or options

## Rate Limiting

[API Rate Limiting](https://api-docs.home-connect.com/general/#rate-limiting)

- 10 event monitoring sessions per user and Home Connect account
  - not added
- 10 queries per second (this depends on the data volume)

  - not added

- 10 token refreshes per minute
  - Triggered after 9 requests within a minute. Then locked for 1 minute
- 109 token refreshes per day
  - Triggered after 99 requests within a day. Then locked until midnight. Not sure if it's actually 24 hours.

## homeconnect.0.rateTokenLimit.isBlocked

- true for lock and false for no lock

## homeconnect.0.rateTokenLimit.limitJson

```JSON
{
  "tokenRefreshMinutesMax": 9, // Max requests per 10 minutes
  "tokenRefreshMinutesCount": 0, // Counter for max requests per 10 minutes
  "tokenRefreshMinutesLast": 1754680202619, // Start time as a timestamp from which counting begins
  "tokenRefreshDayMax": 99, // Max requests per day
  "tokenRefreshDayCount": 2, // Counter for max requests per day
  "tokenRefreshDayLast": 1754658108428, // Start time as a timestamp from which counting begins
  "tokenBlock": false, // True if a lock is active
  "tokenBlockTime": 0, // Timestamp when the lock was triggered
  "tokenReason": "No Block" // Name of the lock (internal adapter)
}
```

## homeconnect.0.rateTokenLimit.reason

```JSON
    "states": {
      "0": "Nothing", // No lock
      "1": "Token Limit (10 per minute)", // 10 minute lock active
      "2": "Token Limit (100 per day)" // 24h active
    }
```

- 10 requests per second on average (20 requests max. burst) with leaky bucket algorithm

  - Triggered after 15 requests

- 1000 requests per client and Home Connect user account per day

  - Triggered after 9999 requests within one day. Then locked until midnight. I'm not sure if it's actually 24 hours.

- 50 requests per client and Home Connect user account per minute

  - Triggered after 49 requests within one minute. All queries are blocked for one minute.

- 5 Start requests per user and Home-Connect user account per minute

  - Triggered after 4 requests within one minute. All queries are blocked for 1 minute.

- 5 Stop requests per user and Home-Connect user account per minute

  - Triggered after 4 requests within one minute. All queries are blocked for 1 minute.

- 10 successive requests per client and Home Connect user account per 10 minutes
  - Triggered after 9 error messages within 10 minutes. All queries are blocked for 10 minutes.

## homeconnect.0.rateLimit.isBlocked

- true for lock and false for no lock

## homeconnect.0.rateLimit.limitJson

```JSON
{
  "requestsMinutesMax": 49, // Max requests per minute
  "requestsMinutesCount": 0, // Counter for max requests per minute
  "requestsMinutesLast": 1754680202594, // Start time as a timestamp from which counting begins
  "requestsDayMax": 999, // Max requests per day
  "requestsDayCount": 21, // Counter for max requests per day
  "requestsDayLast": 0, // Start time as a timestamp from which counting begins
  "requestsMinutesStartMax": 4, // Max start requests per minute
  "requestsMinutesStartCount": 0, // Counter for start requests per minute
  "requestsMinutesStartLast": 1754680202594, // Start time as a timestamp from which counting begins
  "requestsMinutesStopMax": 4, // Max stop requests per minute
  "requestsMinutesStopCount": 0, // Counter for stop requests per minute
  "requestsMinutesStopLast": 1754680202594, // Start time as a timestamp from which counting begins
  "responseErrorLast10MinutesMax": 9, // Max requests per 10 minutes
  "responseErrorLast10MinutesCount": 2, // Counter for max requests per 10 minutes
  "responseErrorLast10MinutesLast": 1754680143652, // Start time as a timestamp from which counting begins
  "requestBlock": false, // True if a lock is active
  "requestBlockTime": 0, // Timestamp when the lock was triggered
  "requestReason": "No Block", // Name of the lock (internal adapter)
  "requests": [ // All requests per day
    {
      "methode": "GET", // Methode
      "haId": "0000", // Serial number
      "url": "/status", // URL
      "date": "2025-08-14T18:46:17.535Z", // TIme
      "response": "OK" // OK == Kein Fehler / Error == Fehler
    },
    {
      "methode": "GET",
      "haId": "015030396331009276",
      "url": "/settings",
      "date": "2025-08-14T18:46:17.536Z",
      "response": "OK"
    },
  ],
}
```

## homeconnect.0.rateLimit.reason

```JSON
    "states": {
      "0": "Nothing", // No lock
      "1": "Error Limit (10 per 10 minutes)", // Error lock active for 10 minutes
      "2": "Start (5 per minute)", // Start lock active for 1 minute
      "3": "Stop Limit (5 per minute)", // Stop lock active for 1 minute
      "4": "Request Limit (50 per minute)", // Lock active for 1 minute
      "5": "Request Limit (1000 per day)" // Block for one day active
    }
```

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

**WORK IN PROGRESS**

- (Lucky-ESA) Fixed: Name of the objects are deleted

### 1.5.0 (2025-09-02)

- (Lucky-ESA) Clean up state roles and code
- (Lucky-ESA) Added rate limiting
- (Lucky-ESA) Dependencies updated
- (Lucky-ESA) Added language selection
- (Lucky-ESA) Migrated to ESLint 9
- (Lucky-ESA) Adapter requires js-controller >= 6.0.11 now
- (Lucky-ESA) Adapter requires admin >= 7.6.17 now
- (mcm1957) Adapter requires node.js >= 20 now

### 1.4.3 (2024-11-19)

- (TA2k) fix for -001 devices
- (simatec) Adapter has been adapted to meet Responsive Design rules.

### 1.4.2 (2024-10-25)

- (TA2k) fix for devices with object values

### 1.4.1 (2024-07-02)

- (foxriver76) fixed invalid min/max values

### 1.4.0 (2024-04-18)

- (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
- (mcm1957) Dependencies have been updated

## License

The MIT License (MIT)

Copyright (c) 2024-2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2023 dna909 <dna909@googlemail.com>, TA2k

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