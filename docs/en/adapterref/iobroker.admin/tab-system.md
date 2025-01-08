---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.admin/tab-system.md
title: The system settings
hash: Dn5CtO5okGfvvxL112X2km8W/OB3HqarZ13QntOJiLU=
---
# The system settings
Basic parameters for ioBroker are set here.

![Admin System Settings](../../../de/adapterref/iobroker.admin/img/tab-system_Systemeinstellungen.jpg)

## Main settings
### System language
so you can choose between system languages: German, English, Russian

### Unit temperature
This value is used by some adapters. Possible values are °C or °F.

### Currency
Currently no adapter uses this

### Date format
choose how the date should be displayed in admin and vis.

### Separator
Comma or point for float values

### Default history instance
This SQL/History/InfluxDB adapter instance is used by default for flot and rickshaw (charts).

## Repositories
![](../../../de/adapterref/iobroker.admin/img/tab-system_Verwahrungsorte2.jpg)

ioBroker can obtain the adapter list from different sources. The following sources are entered during installation:

* **default** - http://download.iobroker.net/sources-dist.json - Generated on the server daily at 01:00.

Access is very fast, but version information can be up to 24 hours old.

* **online** - https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json - Repository

is generated from an online source.   Access may take a long time, this is the most current source

* **sources - conf/sources-dist.json** - Is also generated automatically and takes a long time but the links may be out of date (some adapters may be missing)

## Certificates
![](../../../de/adapterref/iobroker.admin/img/tab-system_2017-01-19-09_33_54-ioBroker.jpg)

This is the central location for the certificates used for SSL/HTTPS communication. The certificates are used by admin, web, simple-api, socketio. Standard certificates are installed by default. You cannot verify anything with them. They are only used for SSL communication. Because the certificates are open, you should use your own (self-signed) certificates, buy real certificates or switch to Let's Encrypt. Communication with default certificates is not secure and if someone wants to read the traffic, they could do so. Be sure to install your own certificates. E.g. under [Linux](http://guides.intertech.de/ssl_certificate_self.html).

## Let's Encrypt
![](../../../de/adapterref/iobroker.admin/img/tab-system_2017-01-19-09_40_07-ioBroker.jpg)

Let’s Encrypt is a free, automated and open source certificate authority of the independent Internet Security Research Group (ISRG).

For more information about Let’s Encrypt, see [here](https://letsencrypt.org/).

Some installations use Dynamic DNS or similar to access their own domain via an address assigned there. ioBroker supports the automatic request and renewal of certificates from the Let’s Encrypt organization.

The option to use the free certificates from Let’s Encrypt exists in almost every adapter that can start a web server and supports HTTPS.

If you enable the option to use certificates but not the automatic update, the corresponding instance will try to work with stored certificates.

If automatic updates are enabled, the instance attempts to request certificates from Let’s Encrypt and updates them automatically.

The certificates are requested for the first time when the corresponding address is called for the first time. This means that if you configure "sub.domain.com" as the address and then call [https://sub.domain.com](https://sub.domain.com/), the certificates are requested for the first time, which may take a while before the response comes.

Issuing the certificates is a complex procedure, but if you follow the explanation below it should be easy to get the free certificates.

**Procedure:**

1. A new account must be created with the entered email address (setup in the system settings)
2. A random key is generated as a password for the account.
3. Once the account has been created, the system will open a small website on port 80 to confirm the address.
4. Let's encrypt **always** uses port **80** to check the address.
5. If port 80 is already being used by another service, point 4 applies - i.e. assign a different port to the other service!
6. Once the small web server is started, the request for the certificates for the addresses specified in the system settings is sent to the Let's encrypt server.
7. The Let's Encrypt server sends back a challenge phrase in response to the request and after a while tries to read this challenge phrase at the address "http://yourdomain:80/.well-known/acme-challenge/".
8. When the server receives this challenge phrase back from our side, the Let's Encrypt server sends the certificates. These are stored in the directory specified in the system settings.

This sounds complex, but all you have to do is activate a few checkboxes and enter the email address and web address in the system settings.

The certificates received are valid for approximately 90 days. After these certificates have been issued for the first time, another task is started that automatically extends the validity.

This topic is quite complex and thousands of things can go wrong. If this doesn't work, it is recommended to use the cloud adapter for access on the go.

**Let's Encrypt only works with a node.js version>=4.5**

## Statistics
![](../../../de/adapterref/iobroker.admin/img/tab-system_2017-01-19-09_48_46-ioBroker.jpg)

ioBroker admin sends the following information to download.iobroker.net:

<pre> { &quot;uuid&quot;: &quot;56cf0d20-XXXX-YYYY-BBBB-66eec47ZZZZZ&quot;, &quot;language&quot;: &quot;de&quot;, &quot;hosts&quot;: [ { &quot;version&quot;: &quot;0.15.1&quot;, &quot;platform&quot;: &quot;Javascript/Node. js&quot;, &quot;type&quot;: &quot;win32&quot; } ], &quot;adapters&quot;: { &quot;admin&quot;: { &quot;version&quot;: &quot;1.0.2&quot;, &quot;platform&quot;: &quot;Javascript/Node.js&quot; }, &quot;hm-rpc&quot;: { &quot;version&quot;: &quot;1.1.2&quot;, &quot;platform&quot;: &quot;Javascript/Node.js&quot; } } }</pre>

This can be disabled by setting statistics to "**nothing**".

However, the developers ask for this information:

<pre>We have worked hard to get this project off the ground.
In return, we ask you to send us the usage statistics.
No private information is sent to ioBroker.org.
Every time the adapter list is updated, the anonymized statistics are also sent.
Thank you!</pre>