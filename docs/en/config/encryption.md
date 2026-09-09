---
title: Encryption for web access
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/config/encryption.md
hash: jqg/iF9djAyDXvHfqq6lMqmrgmLsP/EcpKNrnC6SfKs=
---
# Encryption for web access

Without encryption, passwords and measurement data are transmitted in plain text. Within a home network, this is usually acceptable. However, as soon as an interface is accessible beyond the home network, HTTPS is essential, along with [authentication](/docs/config/login.md) . Either alone is ineffective: logging in without encryption sends the password unencrypted, while encryption without authentication protects a door that is already open.

## Three ways

| Away                                  | When it fits                                                                                                                                              |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Self-signed certificate**           | Only within your own network. The connection is encrypted, but the browser warns you every time you access it because nobody vouches for the certificate. |
| **Let's Encrypt**                     | If you have your own domain and port 80 can be made accessible from the outside. Free and accepted by browsers.                                           |
| **[IoT adapter](/docs/cloud/iot.md)** | If no port should be opened, the connection goes from the inside to the outside; the service handles the encryption.                                      |

For remote access, the third method is the simplest and most secure, as it doesn't require opening a port on the router. The other two methods are intended for access within your own network.

## Deposit certificates

ioBroker manages the certificates centrally. They are entered once in the [system settings](/docs/admin/settings.md) under the **Certificates** tab and are then available to all adapters. By default, the three self-signed certificates are listed there.`defaultPublic` ,`defaultPrivate` and`defaultChained` .

It also explains how to integrate a custom certificate and what file permissions the user has.`iobroker` This requires and how Let's Encrypt is integrated.

## Enable HTTPS

In the configuration of the respective instance, for example`web.0` or`admin.0` **Encrypted connection (HTTPS)** is checked. After that, the interface is only accessible via`https://` accessible, the old call with`http://` It leads nowhere.

!> Try it on the **web** adapter first, not the admin adapter. If something goes wrong, the admin adapter will become unreachable. You can exit via the command line:`iobroker set admin.0 --secure false` .

The procedure that has proven successful:

1. Store the certificate in the system settings.
2. To`web.0` Enable HTTPS and save.
3. The browser interface with`https://` Call up and check that it's coming.
4. Check the [log](/docs/admin/log.md) . Errors reading the certificate files are listed there in plain text.
5. Only then should you repeat the same step on the admin panel.

## What's no longer possible after that

After the switchover, some things still refer to the old address:

- Bookmarks and links on`http://…` .
- Scripts and adapters that access the system via HTTP`web` or on`simple-api` access.
- Embedded pages in a visualization. A browser does not load HTTP content into an HTTPS page.

Therefore, after the switchover, go through the visualization and look at the log.

A self-signed certificate is the same on every ioBroker installation and therefore **not secure** in terms of identity verification. It encrypts the connection, but does not prove that the server is who it claims to be. This is sufficient for the local network, but not for external access.