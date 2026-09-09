---
title: authentication
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/config/login.md
hash: Scr51XhtTlqvhqK+zQLJpn/ouF3KZy/HfRWRVXIs/ic=
---
# authentication

In a fresh installation **, no login** is active. Anyone who knows the server address can open the admin panel and change everything. This is convenient in a secure home network, but as soon as ioBroker is accessible beyond that network, it's the first thing that needs to be enabled.

Login is enabled **per instance** , not even for the entire system. Each interface has its own web server and therefore its own switch: the admin switch, each one.`web` -instance,`vis` about the associated`web` -instance and so on. The users and groups are the same everywhere; see [access management](/docs/config/userrights.md) .

## The admin

In the **Instances** tab, the wrench icon opens.`admin.0` the configuration:

<img src="media/config_admin_authentifizierung.png" alt="Die allgemeinen Einstellungen der Admin-Instanz" width="864" />

Two fields are important:

| Field              | Meaning                                                                                                        |
| ------------------ | -------------------------------------------------------------------------------------------------------------- |
| **authentication** | Enable the login screen. Without this option, anyone can log in without a password.                            |
| **Run as**         | Determines whose rights are used until the user logs in. The default setting is...`admin` , i.e., full access. |

Proceed:

1. In the [Users](/docs/admin/users.md) tab, the user`admin` Enter a password. Do not enable authentication **beforehand** , otherwise there will be nothing to log in with.
2. Write down the password before proceeding.
3. In the settings of`admin.0` Check the box for **authentication** and save. The instance will restart.
4. Reload the page. The login form will now appear.

If you lock yourself out, the command line can help.`iobroker set admin.0 --auth false` The same command also works.`--secure` for HTTPS and`--ttl` The validity period of a login is measured in seconds. All commands are available via [the CLI](/docs/config/cli.md) .

The other fields on this page do not relate to the login: **IP** and **port** determine what the admin is listening on, **encrypted connection (HTTPS)** is part of the [encryption](/docs/config/encryption.md) , and **answering ACME challenges** is required.`acme` -Adapter to obtain a Let's Encrypt certificate without having to stop the admin.

In the **Instance Access tab (Easy Mode)** , you can further restrict which instance configuration pages are accessible and which users are allowed to open them.

## The web adapter

At`web.0` The switch is called **Authentication** and is located directly next to the encryption:

<img src="media/config_web_authentifizierung.png" alt="Die allgemeinen Einstellungen der web-Instanz" width="900" />

As long as it is disabled, the two tabs **"Access List"** and **"User Access List"** are grayed out. With login enabled, they become usable and allow you to further restrict access to individual pages and per user.

Those who only need access for vis should disable login at the`web` -Instance under which vis runs. vis itself does not have its own web server.

## What needs to be checked next

Adapters that access one of these interfaces themselves now require login credentials. This primarily affects external connections and scripts that access these interfaces via HTTP.`web` Access it. After switching over, therefore, check the [log](/docs/admin/log.md) and look for messages about rejected requests.

Simply logging in is not enough if ioBroker is accessible from the internet. Otherwise, the password is transmitted unencrypted. [Encryption](/docs/config/encryption.md) is then required, or better yet, using the [IoT adapter](/docs/cloud/iot.md) , which doesn't require any open ports.