---
chapters: {"pages":{"en/adapterref/iobroker.synology/README.md":{"title":{"en":"ioBroker Synology adapter"},"content":"en/adapterref/iobroker.synology/README.md"},"en/adapterref/iobroker.synology/docs/en/template.md":{"title":{"en":"2FA"},"content":"en/adapterref/iobroker.synology/docs/en/template.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.synology/docs/en/template.md
title: 2FA
hash: b5BoTw8cpTiVyzVB3zgdAT4WRxm5WZhS2M9O4hdBvKU=
---
# 2FA

Führen Sie diese Schritte aus, um die Zwei-Faktor-Authentifizierung in DSM6 zu konfigurieren:

![Bild](../../../../../en/adapterref/iobroker.synology/docs/en/img/2FA_step_1.png)

![Bild](../../../../../en/adapterref/iobroker.synology/docs/en/img/2FA_step_2.jpg)

![Bild](../../../../../en/adapterref/iobroker.synology/docs/en/img/2FA_step_3.jpg)

![Bild](../../../../../en/adapterref/iobroker.synology/docs/en/img/2FA_step_4.jpg)

Notieren Sie sich den geheimen Schlüssel; er muss in den Adaptereinstellungen angegeben werden. Schließen Sie die Einrichtung der Zwei-Faktor-Authentifizierung ab.

![Bild](../../../../../en/adapterref/iobroker.synology/docs/en/img/2FA_step_5.jpg)

![Bild](../../../../../en/adapterref/iobroker.synology/docs/en/img/2FA_step_7.jpg)

![Bild](../../../../../en/adapterref/iobroker.synology/docs/en/img/2FA_step_8.jpg)

![Bild](../../../../../en/adapterref/iobroker.synology/docs/en/img/admin.jpg)

Falls dies nicht funktioniert oder es auf diesem Weg (z. B. in DSM7) nicht gefunden werden kann, versuchen Sie Folgendes:

Klicken Sie auf „Benutzeroptionen“ => „Persönlich“ => „2FA“ => Bestätigungscode (OTP) Geräte zurücksetzen „Kann nicht gescannt werden?“ und hier erhalten Sie den geheimen Schlüssel - kopieren Sie diesen und fügen Sie ihn in iobroker ein, gehen Sie zurück, scannen Sie den Code mit Ihrem Mobiltelefon und bestätigen Sie ihn.