---
title: System settings
lastChanged: 27.03.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/admin/settings.md
hash: EWCPIroHVv8aZWVTS96ljn+F7vclaiYghLknECzG9Fw=
---
# The system settings
The system settings can be accessed from every menu point of the administrator via the wrench icon in the title bar of the screen.

![The system settings](../../de/admin/media/ADMIN_Settings_main.png)

The system settings are distributed over several sub-pages:

## Main settings
In the main settings, basic parameters for ioBroker are set, which are also used by the adapters in ioBroker.

Some parameters are already taken from the host's settings.

** System language **

so you can choose between different system languages. It is possible that not all languages are fully supported yet.

** temperature unit **

this value is used by some adapters. °C or °F is possible.

**Currency**

At the moment it doesn't use an adapter

** Date format **

choose how the date should be displayed in admin and vis.

** decimal separator **

Comma or point for float values

** Standard history instance **

In this instance the data is logged by default and used in the charts of flot and rickshaw.

If only one history adapter (SQL / History / InfluxDB) is installed, it is used, if several are available, one can be selected.

** Active depository **

The desired repository from which the adapter version is to be installed is selected via the pull-down menu. The repositories listed on the “Storage locations” subpage are available in the pull-down menu

## Storage locations
![The repositories](../../de/admin/media/ADMIN_Settings_repos.png)

ioBroker can obtain the adapter list from different sources. The following sources are entered during installation:

* default (= stable): http://download.iobroker.net/sources-dist.json
* latest (= beta): http://download.iobroker.net/sources-dist-latest.json

If other repositories from an older installation are entered here, they should be deleted as they are no longer maintained.

## Certificates
![Certificates](../../de/admin/media/ADMIN_Settings_certificates.png)

This is the central point for the certificates that are used for SSL / HTTPS communication. The certificates are used by admin, web, simple-api, socketio. Standard certificates are installed by default. You can't verify anything with it. They are only used for SSL communication. Because the certificates are open, you should use your own (self-signed) certificates, buy real certificates or switch to Let's Encrypt. Communication with default certificates is not secure and if someone wants to read the traffic, this could be done. Be sure to install your own certificates.
E.g. under linux.

Certificates can either be specified as a path or uploaded completely using drag and drop

--- title: System settings lastChanged: 27.03.2019 ---

# The system settings
The system settings can be accessed from every menu point of the administrator via the wrench icon in the title bar of the screen.

![The system settings](../../de/admin/media/ADMIN_Settings_main.png)

The system settings are distributed over several sub-pages:

## Main settings
In the main settings, basic parameters for ioBroker are set, which are also used by the adapters in ioBroker.

Some parameters are already taken from the host's settings.

** System language **

so you can choose between different system languages. It is possible that not all languages are fully supported yet.

** temperature unit **

this value is used by some adapters. °C or °F is possible.

**Currency**

At the moment it doesn't use an adapter

** Date format **

choose how the date should be displayed in admin and vis.

** decimal separator **

Comma or point for float values

** Standard history instance **

In this instance the data is logged by default and used in the charts of flot and rickshaw.

If only one history adapter (SQL / History / InfluxDB) is installed, it is used, if several are available, one can be selected.

** Active depository **

The desired repository from which the adapter version is to be installed is selected via the pull-down menu. The repositories listed on the “Storage locations” subpage are available in the pull-down menu

## Storage locations
![The repositories](../../de/admin/media/ADMIN_Settings_repos.png)

ioBroker can obtain the adapter list from different sources. The following sources are entered during installation:

* default (= stable): http://download.iobroker.net/sources-dist.json
* latest (= beta): http://download.iobroker.net/sources-dist-latest.json

If other repositories from an older installation are entered here, they should be deleted as they are no longer maintained.

## Certificates
![Certificates](../../de/admin/media/ADMIN_Settings_certificates.png)

This is the central point for the certificates that are used for SSL / HTTPS communication. The certificates are used by admin, web, simple-api, socketio. Standard certificates are installed by default. You can't verify anything with it. They are only used for SSL communication. Because the certificates are open, you should use your own (self-signed) certificates, buy real certificates or switch to Let's Encrypt. Communication with default certificates is not secure and if someone wants to read the traffic, this could be done. Be sure to install your own certificates.
E.g. under linux.

Certificates can either be specified as a path or uploaded completely using drag and drop

<span style="color:red">It is generally a good idea to test new certificates with the web adapter and not directly with the admin adapter so that you do not lock yourself out of the system.</span>

When specifying a path, the correct permissions for the iobroker user must be available.

For the file itself 644, for the higher-level directories 755.

If the rights are wrong, an error message appears like:

``web.0 (24704) Cannot create webserver: Error: error:0909006C:PEM routines:get_name:no start line``

You can check the access if you log in to the server as user root, then switch to the iobroker user and list the certificate file:

``su iobroker``

``ls -l /Pfad/zum/Zertifikat``

It should show **- rw-r - r -** at the beginning of the line.

If the actual certificate is linked, the rights of the link target must be checked.

Here comes a message like

``ls: Zugriff auf '/Pfad/zum/Zertifikat' nicht möglich: Keine Berechtigung``

The rights have to be adjusted.

As root user for the file:

``chmod 644 /Pfad/zum/Zertifikat``

For the higher-level directories:

``chmod 755 /Pfad/zum``

## Let's Encrypt
![Let's Encrypt](../../de/admin/media/ADMIN_Settings_letsencrypt.png)

Let's Encrypt is a free, automated and open source certificate authority of the independent Internet Security Research Group (ISRG).

For more information on Let's Encrypt, see [here](https://letsencrypt.org/).

Some installations use dynamic DNS or similar to reach their own domain via an address assigned there. ioBroker supports the automatic request and renewal of certificates in the Let's Encrypt organization.

The option to use the free certificates from Let's Encrypt exists in almost every adapter that can start a web server and supports HTTPS.

If you activate the option to use certificates, but not the automatic update, the corresponding instance tries to work with saved certificates.

If the automatic updates are activated, the instance tries to request certificates from Let's Encrypt and updates them automatically.

The certificates are requested for the first time when the relevant address is called up for the first time. I.e. if you configure e.g. “sub.domain.com” as the address and then call up https://sub.domain.com, the certificates are requested for the first time, which can take a while before the answer comes.

The issuing of the certificates is a complex procedure, but if you follow the explanation below it should be easy to obtain the free certificates.

**Method:**

A new account with the entered email address must be created (setup in the system settings)

A random key is generated as a password for the account.

When the account has been created, the system opens a small website on port 80 to confirm the address.

Let's encrypt always uses port 80 to check the address.

If port 80 is already being used by another service, point 4 applies - i.e. assign a different port to the other service!

When the small web server is started, the request for the certificates for the specified addresses in the system settings is sent to the Let's encrypt server.

The Let's Encrypt server sends a challenge phrase back in response to the request and after a while tries to read this challenge phrase at the address “http:// yourdomain: 80 / .well-known / acme-challenge /”.

When the server receives this challenge phrase back from our side, the Let's Encrypt server sends the certificates. These are saved in the directory that is entered in the system settings.

This sounds complex, but all you have to do is activate a few checkboxes and enter the email address and web address in the system settings.

The certificates received are valid for about 90 days. After these certificates have been issued for the first time, another task is started which automatically extends the validity.

This topic is quite complex and thousands of things can go wrong. If this does not work, it is recommended to use the IoT adapter for access while on the go.

Let's Encrypt only works with a node.js version> = 4.5

## Access rights
![Access rights](../../de/admin/media/ADMIN_Settings_zugriffsrechte.png)

In this subpage, the access rights for different areas can be defined for all users / groups

## Statistics
![statistics](../../de/admin/media/ADMIN_Settings_statistics.png)

So that we have a bit of an overview of the installations (adapters used) and the geographical distribution, we would be very happy if we received this information.

You can send different amounts of information. This scope can be selected on the left.

The exact form in which this data is sent is then displayed on the right-hand side.
This data is evaluated absolutely anonymously.

## Let's Encrypt
![Let's Encrypt](../../de/admin/media/ADMIN_Settings_letsencrypt.png)

Let's Encrypt is a free, automated and open source certificate authority of the independent Internet Security Research Group (ISRG).

For more information on Let's Encrypt, see [here](https://letsencrypt.org/).

Some installations use dynamic DNS or similar to reach their own domain via an address assigned there. ioBroker supports the automatic request and renewal of certificates in the Let's Encrypt organization.

The option to use the free certificates from Let's Encrypt exists in almost every adapter that can start a web server and supports HTTPS.

If you activate the option to use certificates, but not the automatic update, the corresponding instance tries to work with saved certificates.

If the automatic updates are activated, the instance tries to request certificates from Let's Encrypt and updates them automatically.

The certificates are requested for the first time when the relevant address is called up for the first time. I.e. if you configure e.g. “sub.domain.com” as the address and then call up https://sub.domain.com, the certificates are requested for the first time, which can take a while before the answer comes.

The issuing of the certificates is a complex procedure, but if you follow the explanation below it should be easy to obtain the free certificates.

**Method:**

A new account with the entered email address must be created (setup in the system settings)

A random key is generated as a password for the account.

When the account has been created, the system opens a small website on port 80 to confirm the address.

Let's encrypt always uses port 80 to check the address.

If port 80 is already being used by another service, point 4 applies - i.e. assign a different port to the other service!

When the small web server is started, the request for the certificates for the specified addresses in the system settings is sent to the Let's encrypt server.

The Let's Encrypt server sends a challenge phrase back in response to the request and after a while tries to read this challenge phrase at the address “http:// yourdomain: 80 / .well-known / acme-challenge /”.

When the server receives this challenge phrase back from our side, the Let's Encrypt server sends the certificates. These are saved in the directory that is entered in the system settings.

This sounds complex, but all you have to do is activate a few checkboxes and enter the email address and web address in the system settings.

The certificates received are valid for about 90 days. After these certificates have been issued for the first time, another task is started which automatically extends the validity.

This topic is quite complex and thousands of things can go wrong. If this does not work, it is recommended to use the IoT adapter for access while on the go.

Let's Encrypt only works with a node.js version> = 4.5

## Access rights
![Access rights](../../de/admin/media/ADMIN_Settings_zugriffsrechte.png)

In this subpage, the access rights for different areas can be defined for all users / groups

## Statistics
![statistics](../../de/admin/media/ADMIN_Settings_statistics.png)

So that we have a bit of an overview of the installations (adapters used) and the geographical distribution, we would be very happy if we received this information.

You can send different amounts of information. This scope can be selected on the left.

The exact form in which this data is sent is then displayed on the right-hand side.
This data is evaluated absolutely anonymously.