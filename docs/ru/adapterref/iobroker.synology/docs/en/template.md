---
chapters: {"pages":{"en/adapterref/iobroker.synology/README.md":{"title":{"en":"ioBroker Synology adapter"},"content":"en/adapterref/iobroker.synology/README.md"},"en/adapterref/iobroker.synology/docs/en/template.md":{"title":{"en":"2FA"},"content":"en/adapterref/iobroker.synology/docs/en/template.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.synology/docs/en/template.md
title: 2FA
hash: b5BoTw8cpTiVyzVB3zgdAT4WRxm5WZhS2M9O4hdBvKU=
---
# 2FA

Выполните следующие шаги для настройки двухфакторной аутентификации в DSM6:

![Картина](../../../../../en/adapterref/iobroker.synology/docs/en/img/2FA_step_1.png)

![Картина](../../../../../en/adapterref/iobroker.synology/docs/en/img/2FA_step_2.jpg)

![Картина](../../../../../en/adapterref/iobroker.synology/docs/en/img/2FA_step_3.jpg)

![Картина](../../../../../en/adapterref/iobroker.synology/docs/en/img/2FA_step_4.jpg)

Запишите секретный ключ, он должен быть указан в настройках адаптера. Завершите настройку двухфакторной аутентификации.

![Картина](../../../../../en/adapterref/iobroker.synology/docs/en/img/2FA_step_5.jpg)

![Картина](../../../../../en/adapterref/iobroker.synology/docs/en/img/2FA_step_7.jpg)

![Картина](../../../../../en/adapterref/iobroker.synology/docs/en/img/2FA_step_8.jpg)

![Картина](../../../../../en/adapterref/iobroker.synology/docs/en/img/admin.jpg)

Если это не сработает или таким способом найти информацию не удастся (например, в DSM-7), попробуйте следующее:

Нажмите «Параметры пользователя» => «Личные данные» => «2FA» => Код подтверждения (OTP) => Сбросить устройство => «Не удается отсканировать?», и здесь вы получите секретный ключ — скопируйте и вставьте его в iobroker, вернитесь назад, отсканируйте код своим мобильным телефоном и подтвердите его.