---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/faq/_050_advanced/050_ssl_zertifikat.md
title: no title
hash: 36IfUf0jp7ag0ykYWMxSHI9FazkdwYhkKNok+VjvG7Y=
---
## How do I set up my own SSL certificate?

The certificates are located centrally in the [system settings](/docs/admin/settings.md) under the **Certificates** tab and are used by admin, web, simple-api and socketio.

Ex-works`defaultPrivate` and`defaultPublic` These are registered. They are the same in **every** ioBroker installation and therefore not secure. They do encrypt, but nothing can be verified with them.

Three ways to obtain your own certificate:

- **Self-generated** : sufficient within your own network, but the browser will warn you every time.
- **Let's Encrypt** : free and automatically renewed, but requires an externally accessible address and port 80. Configure it in the tab of the same name.
- **Purchased** : save as a file or specify the path.

!> Try a new certificate first with the **web** adapter, not with the admin adapter. Otherwise, you might lock yourself out.

Those who only want to access ioBroker remotely don't need any of this: The [iot adapter](/adapters/iot) works without open ports and without its own certificate.