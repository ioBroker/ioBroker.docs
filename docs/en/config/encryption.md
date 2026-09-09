---
title: Encryption for web access
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/config/encryption.md
hash: jqg/iF9djAyDXvHfqq6lMqmrgmLsP/EcpKNrnC6SfKs=
---
# Encryption for web access

Without encryption, passwords and measurement data are transmitted in plain text. This is usually acceptable within a home network. However, as soon as an interface is accessible beyond the home network, HTTPS is essential, along with...
[authentication](/docs/config/login.md). Neither of these alone is of much use: logging in without encryption sends the password openly, encryption without login protects a door that is already open anyway.

## Three ways

| Away                                  | When it fits                                                                                                                                              |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Self-signed certificate**           | Only within your own network. The connection is encrypted, but the browser warns you every time you access it because nobody vouches for the certificate. |
| **Let's Encrypt**                     | If you have your own domain and port 80 can be made accessible from the outside. Free and accepted by browsers.                                           |
| **[IoT adapter](/docs/cloud/iot.md)** | If no port should be opened, the connection goes from the inside to the outside; the service handles the encryption.                                      |

For remote access, the third method is the simplest and most secure, as it doesn't require opening a port on the router. The other two methods are intended for access within your own network.

## Deposit certificates

ioBroker manages the certificates centrally. They are entered once in the
[System settings](/docs/admin/settings.md)
in the rider **Certificates** They are registered and then available for selection by all adapters. The three self-signed entries are present there by default.
`defaultPublic`, `defaultPrivate` and `defaultChained`.

It also explains how to integrate a custom certificate and what file permissions the user has. `iobroker` This requires and how Let's Encrypt is integrated.

## Enable HTTPS

In the configuration of the respective instance, for example `web.0` or `admin.0`, becomes
**Encrypted connection (HTTPS)** checked. After that, the surface is only accessible via `https://` accessible, the old call with `http://` It leads nowhere.

!> First on **web**Try the adapter first, not on the admin panel. If something goes wrong, the admin panel will become unreachable. You can exit via the command line: `iobroker set admin.0 --secure false`.

The procedure that has proven successful:

1. Store the certificate in the system settings.
2. To `web.0` Enable HTTPS and save.
3. The browser interface with `https://` Call up and check that it's coming.
4. Into the [protocol](/docs/admin/log.md)
   You can see the errors when reading the certificate files, which are displayed there in plain text.
5. Only then should you repeat the same step on the admin panel.

## What's no longer possible after that

After the switchover, some things still refer to the old address:

- Bookmarks and links on `http://…`.
- Scripts and adapters that access the system via HTTP `web` or on `simple-api` access.
- Embedded pages in a visualization. A browser does not load HTTP content into an HTTPS page.

Therefore, after the switchover, go through the visualization and look at the log.

A self-signed certificate is the same on every ioBroker installation and therefore **not sure** In the sense of identity verification, it encrypts the connection but does not prove that the server is who it claims to be. This is sufficient for the local network, but not for external access.