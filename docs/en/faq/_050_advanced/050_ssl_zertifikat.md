---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/faq/_050_advanced/050_ssl_zertifikat.md
title: no title
hash: 36IfUf0jp7ag0ykYWMxSHI9FazkdwYhkKNok+VjvG7Y=
---
## How do I set up my own SSL certificate?

The certificates are located centrally in the
[System settings](/docs/admin/settings.md)
in the rider **Certificates** and are used by admin, web, simple-api and socketio.

Ex-works `defaultPrivate` and `defaultPublic` They are listed. **everyone**
The ioBroker installation is the same and therefore not secure. While it does encrypt the data, this encryption doesn't allow for any verification.

Three ways to obtain your own certificate:

- **Self-generated**It's sufficient on my own network, but the browser warns me every time.
- **Let's Encrypt**Free and automatically renewed, but requires an externally accessible address and port 80. To set up, go to the tab of the same name.
- **Bought**: store as a file or specify the path.

!> A new certificate first with the **web**Try the adapter, not with the administrator account. Otherwise, you might lock yourself out.

Those who only want to access ioBroker while on the go don't need any of this: The [IoT adapter](/adapters/iot)
It works without open ports and without its own certificate.