---
title: authentication
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/config/login.md
hash: ZJq2fL5j3OenzEHMPzPh4DjBnKYotl7mriwvNeRXsfk=
---
# Authentication
In a fresh installation, **no login** is enabled. Anyone who knows the server address can open the admin panel and change everything. This is convenient in a secure home network, but as soon as ioBroker is accessible beyond that network, it's the first thing that needs to be enabled.

Login is enabled **per instance**, not even for the entire system. Each interface has its own web server and therefore its own switch: the admin, each `web` instance, `vis` via the associated `web` instance, and so on. The users and groups are the same everywhere, see [Access management](/docs/config/userrights.md).

## The Admin
In the **Instances** tab, the wrench icon at `admin.0` opens the configuration:

<img src="media/config_admin_authentifizierung.png" alt="The general settings of the admin instance" width="864" />

Two fields are important:

| Field | Meaning |
| --- | --- |
| **Authentication** | Enables the login screen. If left unchecked, anyone can log in without a password. |
| **Run as** | Determines whose rights are used while no login is active. The default is `admin`, i.e., full access. |

Proceed:

1. In the [Users] tab (/docs/admin/users.md)

Give the user `admin` a password. **Do not enable authentication beforehand**, otherwise there will be nothing to log in with.

2. Write down the password before proceeding.
3. In the settings of `admin.0`, check the box for **Authentication**.

Set and save. The instance will restart.

4. Reload the page. The registration form will now appear.

If you lock yourself out, the command line can help. `iobroker set admin.0 --auth false` disables login again. The same command also has ``--secure`` for HTTPS and ``--ttl`` for the login validity period in seconds. All commands are listed under `[CLI](/docs/config/cli.md)`.

The other fields on this page do not relate to the login: **IP** and **Port** determine what the admin is listening on, **Encrypted connection (HTTPS)** belongs to [Encryption](/docs/config/encryption.md), and **Answer ACME challenges** is needed by the `acme` adapter to obtain a Let's Encrypt certificate without having to stop the admin.

In the **Access to Instances (Easy Mode)** tab, you can further restrict which instance configuration pages are accessible and which users are allowed to open them.

## The web adapter
In `web.0` the switch is called **Authentication** and is located directly next to the encryption:

<img src="media/config_web_authentifizierung.png" alt="The general settings of the web instance" width="900" />

As long as it is disabled, the two tabs **Access List** and **User Access List** are grayed out. With login enabled, they become usable and allow you to further restrict access to individual pages and per user.

Anyone who only needs access for vis should enable login to the `web` instance under which vis runs. vis itself does not have its own web server.

## What needs to be checked next
Adapters that access one of these interfaces themselves now require login credentials. This primarily affects external connections and scripts that access `web` via HTTP. Therefore, after the changeover, check [protocol](/docs/admin/log.md) and watch for messages about rejected requests.

Simply logging in is not enough if ioBroker is accessible from the internet.

Otherwise, the password is transmitted unencrypted. In that case, you need to use [Encryption](/docs/config/encryption.md), or better yet, the method via [IoT adapter](/docs/cloud/iot.md), which doesn't require any open ports.