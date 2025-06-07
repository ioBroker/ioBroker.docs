![Logo](admin/rest-api.png)
# REST-API adapter

![Number of Installations](http://iobroker.live/badges/rest-api-installed.svg) ![Number of Installations](http://iobroker.live/badges/rest-api-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.rest-api.svg)](https://www.npmjs.com/package/iobroker.rest-api)
[![Downloads](https://img.shields.io/npm/dm/iobroker.rest-api.svg)](https://www.npmjs.com/package/iobroker.rest-api)
[![Tests](https://travis-ci.org/ioBroker/ioBroker.rest-api.svg?branch=master)](https://travis-ci.org/ioBroker/ioBroker.rest-api)

[![NPM](https://nodei.co/npm/iobroker.rest-api.png?downloads=true)](https://nodei.co/npm/iobroker.rest-api/)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting, see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

This is a RESTFul interface to read the objects and states from ioBroker and to write/control the states over HTTP Get/Post requests.

The purpose of this adapter is similar to simple-api. But this adapter supports long-polling and URL hooks for subscribing.

It has a beneficial web interface to play with the requests:

![Screenshot](img/screen.png)

## Usage
Call in browser `http://ipaddress:8093/` and use Swagger UI to request and modify the states and objects.

Some request examples:
- `http://ipaddress:8093/v1/state/system.adapter.rest-api.0.memHeapTotal` - read state as JSON
- `http://ipaddress:8093/v1/state/system.adapter.rest-api.0.memHeapTotal/plain` - read state as string (only value)
- `http://ipaddress:8093/v1/state/system.adapter.rest-api.0.memHeapTotal?value=5` - write state with GET (only for back compatibility with simple-api)
- `http://ipaddress:8093/v1/sendto/javascript.0?message=toScript&data={"message":"MESSAGE","data":"FROM REST-API"}` - send a message to `javascript.0` in script `scriptName`

### Authentication
To enable the authentication, you must set the `Authentication` option in the configuration dialog.

There are three types of authentication supported:
- Credentials in query
- Basic authentication
- OAuth2 (Bearer)

For authentication in a query, you must set `user` and `pass` in query like:
```http
http://ipaddress:8093/v1/state/system.adapter.rest-api.0.memHeapTotal?user=admin&pass=admin
```

For basic authentication, you must set the `Authorization` header with the value `Basic base64(user:pass)`.

For Oauth2 authentication, you must set the `Authorization` header with the value `Bearer <AccessToken>`.

The access token can be retrieved with an HTTP request like:
```http
http://ipaddress:8093/oauth/token?grant_type=password&username=<user>&password=<password>&client_id=ioBroker
```

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

## Subscribe to the state's or object's changes
Your application could get notifications by every change of the state or object.

For that, your application must provide an HTTP(S) end-point to accept the updates.

Example in node.js see here [demoNodeClient.js](examples/demoNodeClient.js)

## Long polling
This adapter supports a subscribing on data changes via long polling. 

Example for browser could be found here: [demoNodeClient.js](examples/demoBrowserClient.html)  

## Web extension
This adapter can run as a web extension. In this case, the path is available under `http://ipaddress:8082/rest`

## Notice
- `POST` is always for creating a resource (does not matter if it was duplicated)
- `PUT` is for checking if resource exists then update, else create new resource
- `PATCH` is always for updating a resource

## Commands
Additionally, you can execute many socket commands via special interface:

`http://ipaddress:8093/v1/command/<commandName>?arg1=Value2&arg2=Value2`

E.g.
- `http://ipaddress:8093/v1/command/getState?id=system.adapter.admin.0.alive` - to read the state of `system.adapter.admin.0.alive`
- `http://ipaddress:8093/v1/command/readFile?adapter=admin.admin&fileName=admin.png` - to read the file `admin.admin/admin.png` as JSON result
- `http://ipaddress:8093/v1/command/readFile?adapter=admin.admin&fileName=admin.png?binary` - to read the file `admin.admin/admin.png` as file
- `http://ipaddress:8093/v1/command/extendObject?id=system.adapter.admin.0?obj={"common":{"enabled":true}}` - to restart admin

You can request all commands with POST method too. As body must be an object with parameters. E.g.:
```bash
curl --location --request POST 'http://ipaddress:8093/v1/command/sendTo' \
--header 'Content-Type: application/json' \
--data-raw '{
"adapterInstance": "history.0",
"command": "getHistory",
"message": {"id": "system.adapter.admin.0.memRss","options": {"aggregate": "onchange", "addId": true}}
}'
```

You cannot send POST request to commands via GUI.

<!-- START -->
### States
- `getStates(pattern)` - get the list of states for pattern (e.g. for system.adapter.admin.0.*). GUI can have problems by visualization of answer.
- `getForeignStates(pattern)` - same as getStates
- `getState(id)` - get state value by ID
- `setState(id, state)` - set state value with JSON object (e.g. `{"val": 1, "ack": true}`)
- `getBinaryState(id)` - get binary state by ID
- `setBinaryState(id, base64)` - set binary state by ID

### Objects
- `getObject(id)` - get object by ID
- `getObjects(list)` - get all states and rooms. GUI can have problems by visualization of answer.
- `getObjectView(design, search, params)` - get specific objects, e.g. design=system, search=state, params=`{"startkey": "system.adapter.admin.", "endkey": "system.adapter.admin.\u9999"}`
- `setObject(id, obj)` - set object with JSON object (e.g. `{"common": {"type": "boolean"}, "native": {}, "type": "state"}`)
- `delObject(id, options)` - delete object by ID

### Files
- `readFile(adapter, fileName)` - read file, e.g. adapter=vis.0, fileName=main/vis-views.json. Additionally, you can set option in query binary=true to get answer as file and not as json
- `readFile64(adapter, fileName)` - read file as base64 string, e.g. adapter=vis.0, fileName=main/vis-views.json. Additionally, you can set option in query binary=true to get answer as file and not as json
- `writeFile64(adapter, fileName, data64, options)` - write file, e.g. adapter=vis.0, fileName=main/vis-test.json, data64=eyJhIjogMX0=
- `unlink(adapter, name)` - delete file or folder
- `deleteFile(adapter, name)` - delete file
- `deleteFolder(adapter, name)` - delete folder
- `renameFile(adapter, oldName, newName)` - rename file
- `rename(adapter, oldName, newName)` - rename file or folder
- `mkdir(adapter, dirName)` - create folder
- `readDir(adapter, dirName, options)` - read content of folder
- `chmodFile(adapter, fileName, options)` - change file mode. E.g. adapter=vis.0, fileName=main/*, options = `{"mode": 0x644}`
- `chownFile(adapter, fileName, options)` - change file owner. E.g. adapter=vis.0, fileName=main/*, options = `{"owner": "newOwner", "ownerGroup": "newgroup"}`
- `fileExists(adapter, fileName)` - check if file exists

### Admins
- `getHostByIp(ip)` - read host information by IP. e.g. by localhost
- `readLogs(host)` - read file name and size of log files. You can read them with http://ipaddress:8093/<fileName>
- `delState(id)` - delete state and object. Same as delObject
- `getRatings(update)` - read adapter ratings (as in admin)
- `getCurrentInstance()` - read adapter namespace (always rest-api.0)
- `decrypt(encryptedText)` - decrypt string with system secret
- `encrypt(plainText)` - encrypt string with system secret
- `getAdapters(adapterName)` - get objects of type "adapter". You can define optionally adapterName
- `updateLicenses(login, password)` - read licenses from ioBroker.net portal
- `getCompactInstances()` - read list of instances with short information
- `getCompactAdapters()` - read list of installed adapters with short information
- `getCompactInstalled(host)` - read short information about installed adapters
- `getCompactSystemConfig()` - read short system config
- `getCompactSystemRepositories()`
- `getCompactRepository(host)` - read short repository
- `getCompactHosts()` - get short information about hosts
- `addUser(user, pass)` - add new user
- `delUser(user)` - delete user
- `addGroup(group, desc, acl)` - create new group
- `delGroup(group)` - delete group
- `changePassword(user, pass)` - change user password
- `getAllObjects()` - read all objects as list. GUI can have problems by visualization of answer.
- `extendObject(id, obj)` - modify object by ID with JSON. (.e.g. `{"common":{"enabled": true}}`) 
- `getForeignObjects(pattern, type)` - same as getObjects
- `delObjects(id, options)` - delete objects by pattern

### Others
- `updateTokenExpiration(accessToken)`
- `log(text, level[info])` - no answer - add log entry to ioBroker log
- `checkFeatureSupported(feature)` - check if feature is supported by js-controller.
- `getHistory(id, options)` - read history. See for options: https://github.com/ioBroker/ioBroker.history/blob/master/docs/en/README.md#access-values-from-javascript-adapter
- `httpGet(url)` - read URL from server. You can set binary=true to get answer as file
- `sendTo(adapterInstance, command, message)` - send command to instance. E.g. adapterInstance=history.0, command=getHistory, message=`{"id": "system.adapter.admin.0.memRss","options": {"aggregate": "onchange", "addId": true}}`
- `listPermissions()` - read static information with function permissions
- `getUserPermissions()` - read object with user permissions
- `getVersion()` - read adapter name and version
- `getAdapterName()` - read adapter name (always rest-api)
- `clientSubscribe(targetInstance, messageType, data)`
- `getAdapterInstances(adapterName)` - get objects of type "instance". You can define optionally adapterName

<!-- END -->

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->


## Changelog
### 3.0.1 (2025-05-21)
* (@GermanBluefox) Corrected the web extension

### 3.0.0 (2025-04-27)
* (@GermanBluefox) Rewritten in TypeScript
* (@GermanBluefox) Removed binary states

### 2.1.0 (2025-02-27)
* (@GermanBluefox) Added OAuth2 support
* (@GermanBluefox) Updated packages
* (@GermanBluefox) Replaced icons with SVG

### 2.0.3 (2024-07-13)
* (jkuenemund) Changed response for the endpoint get states to the dictionary in swagger

### 2.0.1 (2024-05-23)
* (foxriver76) ported to `@iobroker/webserver`
* (theshengfui) Fixed history requests
* (bluefox) Minimum required node.js version is 16

### 1.1.0 (2023-05-03)
* (bluefox) Converting of the setState values to the according type
* (bluefox) Implemented file operations

### 1.0.5 (2023-03-27)
* (Apollon77) Prepare for future js-controller versions

### 1.0.4 (2022-08-31)
* (bluefox) Check if the port is occupied only on defined interface

### 1.0.2 (2022-07-27)
* (bluefox) Implemented binary read/write operations

### 1.0.1 (2022-07-27)
* (bluefox) Increased the max size of body to 100Mb

### 1.0.0 (2022-05-19)
* (bluefox) Final release

### 0.6.0 (2022-05-18)
* (bluefox) Added sendTo path

### 0.5.0 (2022-05-17)
* (bluefox) Some access errors were corrected

### 0.4.0 (2022-04-26)
* (bluefox) Added socket commands

### 0.3.6 (2022-04-22)
* (bluefox) Added object creation and enumerations reading

### 0.3.5 (2022-04-22)
* (bluefox) Allowed the reading of current subscriptions

### 0.3.4 (2022-04-20)
* (bluefox) Corrected subscription

### 0.3.1 (2022-04-15)
* (bluefox) First release

### 0.1.0 (2017-09-14)
* (bluefox) initial commit

## License
Apache 2.0

Copyright (c) 2017-2025 bluefox <dogafox@gmail.com>
