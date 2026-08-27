![Logo](admin/dnscope.png)
# ioBroker.dnscope

![Number of Installations](http://iobroker.live/badges/dnscope-installed.svg)
![Number of Installations](http://iobroker.live/badges/dnscope-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.dnscope.svg)](https://www.npmjs.com/package/iobroker.dnscope)
[![Downloads](https://img.shields.io/npm/dm/iobroker.dnscope.svg)](https://www.npmjs.com/package/iobroker.dnscope)
[![Known Vulnerabilities](https://snyk.io/test/github/simatec/ioBroker.dnscope/badge.svg)](https://snyk.io/test/github/simatec/ioBroker.dnscope)
![Test and Release](https://github.com/simatec/ioBroker.dnscope/workflows/Test%20and%20Release/badge.svg)

[![License](https://img.shields.io/github/license/simatec/ioBroker.dnscope?style=flat)](https://github.com/simatec/ioBroker.dnscope/blob/master/LICENSE)
[![Donate](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)](https://paypal.me/mk1676)
[![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/simatec)

This adapter uses the service `Sentry.io` to automatically report exceptions and code errors and new device schemas to me as the developer. More details see below!

---

## Support adapter development

**If you like DNScope, please consider making a donation:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

---

## Description

DNScope allows you to update your dynamic DNS account directly in ioBroker.
It is possible to update your DNS account with the current IP address of your environment without any detours or additional hardware.

You can determine the interval at which the check and update should take place. 
The default interval is 10 minutes.

The following DynDNS providers are currently supported:

* IPv64
* DuckDNS
* NoIP
* Dynv6
* Custom

When selecting `Custom`, it is possible to specify a direct update URL in order to integrate any provider that supports this.

The following placeholders can be used in the custom URL and will be replaced with the current IP address at runtime:

| Placeholder | Description |
|---|---|
| `{{ipv4}}` | Current public IPv4 address |
| `{{ipv6}}` | Current public IPv6 address |
| `{{ip}}` | Current IP address (IPv4 in the IPv4 update, IPv6 in the IPv6 update) |

**Example:**
```
https://dynupdate.example.com/update?hostname=myhome.example.com&myip={{ipv4}}&token=abc123
```

---

## Adapter configuration

Your access data to the DynDNS service is required for the adapter configuration.
Depending on the provider, this can be a token or a user name/password.

You must also enter the domain that is to be updated. 

If you have several domains that are to be updated, you need one instance per domain

---
<!-- ### **WORK IN PROGRESS** -->
## Changelog
### 0.3.0 (2026-08-20)
* (simatec) Adapter requires node.js >= 22 now
* (simatec) dependencies updated
* (simatec) Source code cleaned up
* (HJS72) Add detailed debug diagnostics for failed update requests (HTTP status, body, and headers)
* (HJS72) Ship compiled build output with the latest logging changes
* (HJS72) Fix HTTP 400 error when IP address could not be determined (skip update instead)
* (HJS72) Add debug log output for the full update request URL
* (HJS72) Add IP placeholder support for custom update URL (`{{ipv4}}`, `{{ipv6}}`, `{{ip}}`)

### 0.2.9 (2026-04-26)
* (simatec) dependencies updated
* (simatec) Source code cleaned up

### 0.2.8 (2026-03-29)
* (simatec) Fix License
* (simatec) dependencies updated

### 0.2.7 (2025-11-23)
* (simatec) dependencies updated

### 0.2.6 (2025-10-25)
* (simatec) dependencies updated
* (simatec) Fix npm publish

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025 - 2026 simatec

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.