![Logo](admin/web.png)
# ioBroker.web

![Number of Installations](http://iobroker.live/badges/web-installed.svg)
![Number of Installations](http://iobroker.live/badges/web-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.web.svg)](https://www.npmjs.com/package/iobroker.web)

![Test and Release](https://github.com/ioBroker/ioBroker.web/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/web/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.web.svg)](https://www.npmjs.com/package/iobroker.web)

Web server on the base of Node.js and express to read the files from ioBroker DB.

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** 
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Tuning Web-Sockets
On some web-sockets clients, there is a performance problem with communication. 
Sometimes this issue is due to the fallback of socket.io communication on a long polling mechanism.
You can set the option *Force Web-Sockets* to force using only web-sockets transport.

## Let's Encrypt Certificates
Read [here](https://github.com/ioBroker/ioBroker.admin#lets-encrypt-certificates)

## Extensions
Web driver supports extensions. 
The extension is URL handler, that will be called if such URL request appears.
The extensions look like the normal adapter, but they have no running process 
and will be called by web server.

E.g., the user can activate a special proxy adapter and reach other devices (like webcams) in the same web server.
It is required to let all services be available under one web server.

Web extension could and should support `unload` function, that could return `promise` if the unload action will take some time. 

You can read more about web-extensions [here](WEB-EXTENSIONS-HOWTO.md).

## Brute-force protection
If authentication is enabled and the user enters 5 times invalid password during one minute, he must wait at least one minute till next attempt.
After the 15th wrong attempt, the user must wait 1 hour.

## "Stay logged in" option
If this options is selected, the user stays logged in for one month.
If not, the user will stay logged in for the configured "login timeout".

## Access state's values
You can access the normal state values via the HTTP get request.

```
http://IP:8082/state/system.adapter.web.0.alive =>
{"val":true,"ack":true,"ts":1606831924559,"q":0,"from":"system.adapter.web.0","lc":1606777539894}
```

or access files like:

```
http://IP:8082/vis-2.0/javascript.picture.png =>
[IMAGE]
```

From version 8.0.0 you can also write values via HTTP post request:

```
[POST] http://IP:8082/state/javascript.0.myVariable => true
```
Or as JSON object with additional parameters:
```
[POST] http://IP:8082/state/javascript.0.myVariable =>
{"val": true, "ack": false}
```

Note: the option "Disable states and socket info" must be deactivated in the web adapter settings to use this feature.

## Access objects
You can read objects (including patterns with wildcards) via HTTP GET request. The response is **always a JSON array**, because the pattern may match multiple objects.

By default, each returned object contains only `_id`, `type` and `common`. Use the `extended` and/or `native` query flags to ask for more.

When the `depth` query is used and a matching object lives deeper than the requested level, a synthetic placeholder is returned at exactly that depth:
```json
{ "_id": "0_userdata.0", "type": "virtual" }
```
This lets a tree browser see that content exists below an intermediate path even when that path itself has no real ioBroker object. Virtuals deliberately omit `common` to keep payloads small — the display name can be derived from `_id`. A real object at the same ID always wins over its virtual placeholder.

```
http://IP:8082/object/0_userdata.0.branch.* =>
[ { "_id": "0_userdata.0.branch.a", "type": "state", "common": { ... } }, ... ]
```

Supported query parameters:

| Parameter    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`       | Filter by object type (e.g. `state`, `channel`, `device`, `folder`, `enum`, `instance`, ...). **Defaults to `state`** when omitted. Pass `all` to query objects of every type.                                                                                                                                                                                                                                                                                                                        |
| `commonType` | Filter by `common.type` of the object (`number`, `string`, `boolean`, `mixed`, `array`, `object`).                                                                                                                                                                                                                                                                                                                                                                                                    |
| `depth`      | Absolute maximum number of dot-separated parts in the object ID. For example, to fetch only the direct children of `0_userdata.0.branch` (which has 3 parts), request `/object/0_userdata.0.branch.*?depth=4`. `depth=1` is silently clamped to `depth=2` (ioBroker objects exist at 1 level or 3+ levels — the 2-level "instance" entries like `0_userdata.0` are what a root-level tree browser actually wants). Any real single-segment objects are dropped from the response for the same reason. |
| `extended`   | Pass `?extended` or `?extended=true` to additionally include system attributes such as `acl`, `from`, `ts`, `user`, `enums`, `_rev`.                                                                                                                                                                                                                                                                                                                                                                  |
| `native`     | Pass `?native` or `?native=true` to additionally include the `native` part of each object.                                                                                                                                                                                                                                                                                                                                                                                                            |
| `system`     | By default objects under `system.*` and `script.*` are **hidden**. Pass `?system` or `?system=true` to include them.                                                                                                                                                                                                                                                                                                                                                                                  |

Examples:
```
[GET] http://IP:8082/object/0_userdata.0.branch.*?depth=4&type=all
[GET] http://IP:8082/object/0_userdata.0.*?type=state
[GET] http://IP:8082/object/0_userdata.0.*?type=state&commonType=boolean
[GET] http://IP:8082/object/system.adapter.web.0?native=true
[GET] http://IP:8082/object/system.adapter.web.0?extended=true&native=true
[GET] http://IP:8082/object/system.adapter.web.0
```

Note: the option "Disable objects delivery" must be deactivated in the web adapter settings to use this feature.

## "Basic Authentication" option
Allows Login via Basic Authentication by sending `401` Unauthorized with a `WWW-Authenticate` header.
This can be used for applications like *FullyBrowser*. When entering the wrong credentials once, you will be redirected 
to the Login Page. 

## User list
You can define the list of users that can access the web server. You can change the access right for logged-in user.

If the user is not in the list, he cannot access the web server.

It is simpler as to set for every object and every state the access rights for the specific user.

## Advanced options
### Default redirect
If by opening of web port im browser no APP selection should be shown, but some specific application, 
the path could be provided here (e.g. `/vis/`) so this path will be opened automatically.

## OAuth2 authentication
The web adapter supports OAuth2 authentication.

To get the tokens, the user must call the URL:

```
http://ip:8082//oauth/token?grant_type=password&username=<user>&password=<password>&client_id=ioBroker&stayloggedin=<false/true>
```

`stayloggedin=true` means that the token will be stored in the browser and will be used for the next requests and is optional.

The answer is like:
```json
{
    "access_token": "21f89e3eee32d3af08a71c1cc44ec72e0e3014a9",
    "expires_in": "2025-02-23T11:39:32.208Z",
    "refresh_token": "66d35faa5d53ca8242cfe57367210e76b7ffded7",
    "refresh_token_expires_in": "2025-03-25T10:39:32.208Z",
    "token_type": "Bearer"
}
```         
More info can be found here: https://github.com/ioBroker/webserver?tab=readme-ov-file#oauth2-support

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 9.0.0 (2026-06-21)
* (@GermanBluefox) Used libraries for socket communication instead of adapters
* (@GermanBluefox) Migrated to TS 6

### 8.3.0 (2026-06-12)
* (@SimonFischer04) Added rootPath option to support the running behind a reverse proxy

### 8.2.0 (2026-05-21)
* (@GermanBluefox) Added `/object/<ID>` GET endpoint with `type`, `commonType`, `depth`, `extended`, `native` and `system` query parameters to read objects (wildcards supported). By default, only `_id`, `type` and `common` are returned, type defaults to `state`, and objects under `system.*` / `script.*` are hidden. With `depth`, deeper matches yield synthetic `type: "virtual"` placeholders so a tree browser can see content exists below.
* (@GermanBluefox) Added `Disable objects delivery` setting to turn the `/object/<ID>` endpoint on/off

### 8.1.0 (2026-04-13)
* (@GermanBluefox) Updated packages.
* (@GermanBluefox) Corrected potential errors

### 8.0.0 (2026-02-18)
* (@GermanBluefox) Updated packages. The minimal Node.js version is now 20.0.0
* (@GermanBluefox) Removed binary states
* (@GermanBluefox) Added possibility to write values via `/state/` endpoint with `POST`

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
The MIT License (MIT)

Copyright (c) 2014-2026 Bluefox <dogafox@gmail.com>

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
