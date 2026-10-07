---
chapters: {"pages":{"en/adapterref/iobroker.web/README.md":{"title":{"en":"ioBroker.web"},"content":"en/adapterref/iobroker.web/README.md"},"en/adapterref/iobroker.web/WEB-EXTENSIONS-HOWTO.md":{"title":{"en":"Web extensions"},"content":"en/adapterref/iobroker.web/WEB-EXTENSIONS-HOWTO.md"}}}
---
<img src="admin/web.svg" width="100" height="100" />

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

A certificate authority validates an HTTP-01 challenge on port 80, so on a host with one public IP that
request lands on whatever adapter holds that port. With **Answer ACME HTTP-01 challenges** enabled
(`acmeChallenge`, the default) this instance serves the tokens the `acme` adapter published under
`/.well-known/acme-challenge/`, and the `acme` adapter does not have to stop it to get at the port.
Only a request for a published token is answered here, everything else is passed on untouched. Switch
the option off to keep that path entirely to the web application.

## HTTP/2
With HTTPS enabled, the web server speaks HTTP/2: the browser loads the page and all its files over a single
connection with many parallel requests. Clients that do not offer HTTP/2 fall back to HTTP/1.1 automatically,
and web sockets keep working - browsers open them on a separate HTTP/1.1 connection.
Without HTTPS the option has no effect, as browsers use HTTP/2 over TLS only.

If a client or a web extension has problems with it, switch the option **Use HTTP/2** (`http2`) off to stay with HTTP/1.1.

## Extensions
Web driver supports extensions. 
The extension is URL handler, that will be called if such URL request appears.
The extensions look like the normal adapter, but they have no running process 
and will be called by web server.

E.g., the user can activate a special proxy adapter and reach other devices (like webcams) in the same web server.
It is required to let all services be available under one web server.

Web extension could and should support `unload` function, that could return `promise` if the unload action will take some time. 

You can read more about web-extensions [here](/#/docs/adapterref/iobroker.web/WEB-EXTENSIONS-HOWTO.md).

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

## The former built-in "Simple API"

Up to version 6.x this adapter had a **Built-in 'Simple-API'** switch, which answered addresses such as
`http://ip:8082/get/<id>` and `http://ip:8082/set/<id>?value=…` directly. The switch is gone since 7.0.
The `simple-api` adapter took the feature over and can be run **inside** this web server as a web
extension, which brings the old addresses back unchanged - no script that uses them has to be touched.

### Setting it up

1. Install the adapter **`simple-api`** and create an instance of it.
2. Open the settings of that instance and set **"Web instance"** to the web instance that should serve
   it, e.g. `web.0`. (Left empty, `simple-api` runs a server of its own on port 8087 instead - that
   works too, but then the addresses carry its port, not the one of this server.)
3. Save. The web instance restarts and reports the mounted paths in its log.

### The addresses

Running as an extension, `simple-api` answers under two prefixes:

```
http://ip:8082/get/<id>                     the address as it was up to web 6.x
http://ip:8082/simple-api.0/get/<id>        the same, below the name of the instance
```

So nothing changes for existing scripts:

```
http://ip:8082/set/0_userdata.0.Alarm.disable?value=true
http://ip:8082/getPlainValue/0_userdata.0.Temperature
```

The commands are the familiar ones: `get`, `getPlainValue`, `getBulk`, `set`, `setBulk`,
`setValueFromBody`, `toggle`, `getObjects`, `objects`, `getStates`, `states`, `search` and `query`.

### Authentication

Which user a request runs as is decided by the **authentication** setting of this web instance:

- **Off** - every request runs as the user configured under "access web interface as".
- **On** - the request has to identify itself, in one of three ways: with the session of a browser that
  is logged in to this server, with an `Authorization: Basic` header, or with `?user=…&pass=…` in the
  query string. Credentials in a query string travel in plain text and end up in logs and in the
  browser history, so use that last one over HTTPS only, if at all.

### If you would rather use the newer API

`rest-api` is the successor with a versioned interface, and it runs as a web extension in the same way.
Its addresses differ - `get/<id>` becomes `v1/state/<id>`, and the full state object needs
`?withInfo=true`:

```
http://ip:8082/v1/state/<id>?withInfo=true
```

## "Basic Authentication" option
Allows Login via Basic Authentication by sending `401` Unauthorized with a `WWW-Authenticate` header.
This can be used for applications like *FullyBrowser*. When entering the wrong credentials once, you will be redirected 
to the Login Page. 

## User list
You can define the list of users that can access the web server. You can change the access right for logged-in user.

If the user is not in the list, he cannot access the web server.

It is simpler as to set for every object and every state the access rights for the specific user.

Next to single users you can allow whole groups. A user may log in when he is in the list of users
**or** a member of one of the allowed groups - which of his groups it is does not matter. Members of
an allowed group are shown as already selected in the user list, so you do not have to add them a
second time. Adding a group is the way to keep the list short: whoever joins the group later may log
in without a change to this instance.

With *access web interface as* you decide which rights the access happens with:

- **logged in user** - everybody keeps his own permissions, so every user sees only what his groups
  allow him to.
- **a specific user** - every allowed login acts with the rights of that one user, no matter who
  logged in. This is the simple way to let several people share one set of permissions.

A login that matches neither the users nor the groups is refused, and the instance logs
`User system.user.<name> is not in the user list`.

This list only decides **who may log in** - it hands out no rights. Behind it the usual ioBroker ACLs
still apply, so the user needs read rights on the objects, states and files he is meant to see. A
group with every permission switched on is therefore not the same as the administrator group: members
of `system.group.administrator` pass every file check, everybody else has to pass the ACL of the
single file. Files uploaded with `0x660` (`defaultNewAcl.file` in `system.config`) grant nothing to
"others", so an adapter whose files look like that answers with a 404 to a user who is neither their
owner nor a member of their owner group.

## Advanced options
### Default redirect
If by opening of web port im browser no APP selection should be shown, but some specific application, 
the path could be provided here (e.g. `/vis/`) so this path will be opened automatically.

### Embedding this server in another site

A browser treats a cookie without a `SameSite` attribute as `SameSite=Lax` and keeps it to itself as
soon as the page belongs to another origin. A dashboard that embeds a page of this server in an
`<iframe>` therefore gets a request without the session, and the user is asked to log in again inside
the frame - while the same page opened directly works.

**"Allow embedding in other sites"** sends the session cookie with `SameSite=None; Secure` and makes
that case work. Two things come with it:

- It needs TLS. Browsers accept `SameSite=None` only together with `Secure`, and a cookie marked
  secure never travels over plain `http://`. So either enable encryption here, or terminate TLS at a
  reverse proxy in front of this server and **set the public URL** to its `https://` address - the
  option is ignored, with a warning in the log, while neither is the case. With the proxy variant the
  proxy has to send `X-Forwarded-Proto: https`, which is how this server learns that the browser
  spoke TLS to it. Without that header no session cookie is handed out at all and nobody can log in.
- It gives up what `SameSite` protects against: the session cookie is then sent with requests coming
  from *any* other site, not only from the one you embed this server in. Leave it off unless you
  actually embed this server somewhere.

It also depends on the browser still accepting third-party cookies, which the Chromium family is
phasing out. The way that keeps working is to carry an OAuth2 token in the URL instead of relying on
a cookie, which needs no cross-site cookie at all:

```html
<iframe src="https://iobroker.example.com:8082/some-page?token=<access_token>"></iframe>
```

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

## Authorizing third-party clients (OAuth)

The token endpoint above requires the client to handle the user's ioBroker password. Clients that run
outside your control — MCP clients, or web extensions serving them — must not do that. Enabling
**"Allow third-party clients"** in the settings additionally offers the browser-based OAuth2
authorization code flow with PKCE: the client is pointed at a login and consent page, the user
confirms, and the client receives a token bound to the resource it asked for.

This is off by default. When enabled:

- Clients discover the server through `/.well-known/oauth-authorization-server` and register
  themselves, unless **"Allow client self-registration"** is switched off.
- Unauthenticated requests that do *not* ask for `text/html` are answered with `401` and a
  `WWW-Authenticate` challenge instead of a redirect to the login page — a redirect is useless to an
  API client. Browsers are unaffected.
- Web extensions publish their own resource metadata under
  `/.well-known/oauth-protected-resource/<path>`; those documents stay readable without credentials.
- **Set the public URL** when the server runs behind a reverse proxy, and use HTTPS: remote clients
  refuse plain `http://`.

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 9.1.12 (2026-10-04)
* (@GermanBluefox) Fixed: with the cache enabled, a file that an adapter writes again under the same name is delivered anew instead of forever in the version that was read first. This is what made `sayit` repeat the same announcement. The cache had no way of learning about a change at all - the adapter never subscribed to the files it had cached. It does now, for those namespaces only, and drops the entry when the file changes
* (@GermanBluefox) Fixed: an adapter that runs as a web extension is linked to this server on the overview page instead of to a port of its own that nothing listens on. The entry such an adapter supplies through `welcomePage()` was collected after the list had already been cleaned up and its links resolved, so it never got the `localLink` the page reads and was dropped without a word, leaving only the dead link from `common.localLinks` behind
* (@GermanBluefox) The folder index got the look of the admin: an app bar with the path and the number of entries, icons telling a folder from a file, sizes in a readable unit, and a light and a dark theme the page selects itself from the setting of the system. A folder of 0 bytes says "0 B" instead of nothing, and the way up is no longer offered in the root of an adapter, where it led out of it
* (@GermanBluefox) An unexpected error while reading a session no longer ends the instance. The session store answers from a task of its own, so an exception in one of its callbacks reached neither express nor a `try/catch` and the controller terminated the whole web server over a single request. The four callbacks are guarded now and answer with a 500 instead. The same went for two promises in `onObjectChange`/`onStateChange` without a `catch`, where a rejected read of the socket URL arrived as an unhandled rejection
* (@GermanBluefox) Added the option "Allow embedding in other sites": the session cookie is sent with `SameSite=None; Secure`, so a page of this server keeps its session when another site embeds it in an iframe. It requires SSL here or an https reverse proxy with the public URL set, and it is off by default because it gives up the protection `SameSite` provides against requests of foreign pages
* (@GermanBluefox) Fixed: a call of `/prolongSession` no longer kills the instance. The session was handed to the store without its time to live, the store took the session object itself for it, and the type check of the controller ended the adapter with "Parameter ttl needs to be of type number". The session is also written back under the ID its cookie carries - `req.session.id` is a different one as soon as express-session started a new session for the request, and then the wrong session was prolonged
* (@GermanBluefox) Fixed: an address without the closing slash - `/vis-2` instead of `/vis-2/` - leads to the application instead of a 404. It is answered with a redirect to the address with the slash, as every other web server does
* (@GermanBluefox) A 404 names the address that was requested, not the file name left over after the adapter name was cut off, and logs it on the debug level
* (@hdering) A web instance that restarts to load a changed web extension logs this as info with the reason instead of the warning "Terminated (-100): Without reason"

### 9.1.11 (2026-10-02)
* (@hdering) Updating an adapter with a web extension restarts only the web instances that run it, not every web instance
* (@GermanBluefox) Fixed: a user the "User list" lets in through a group is let in no matter which of their groups it is. Only the first group the user was a member of got compared against the allowed ones, so a user in several groups was rejected whenever that first group was not the listed one. The order of the groups is their creation order, which made this look arbitrary

### 9.1.9 (2026-09-28)
* (@GermanBluefox) Added onScreen state for App

### 9.1.8 (2026-09-24)
* (@GermanBluefox) An empty body for `cloud.X.remote.command` is refused with a 400 instead of writing an empty command that is dropped without a word

### 9.1.7 (2026-09-21)
* (@joltcoke) Fixed: after the login the user lands on the page they asked for again, even when its URL carries a query string. The target was validated after it had been decoded, against a character list without "=", so every real query parameter sent the user to the root instead. A fragment of the requested URL is kept as well
* (@GermanBluefox) Fixed: a mistyped password leads back to the login page with the error message instead of a 404, and the requested page is not lost on the way
* (@GermanBluefox) Fixed: a deep link that was answered with a JavaScript file keeps its whole query string - it was cut off at the first "&"
* (@GermanBluefox) A target with a control character in it is refused again: browsers drop tab and newline before they read a URL, which turned "/<TAB>/host" into a link that leaves this server

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