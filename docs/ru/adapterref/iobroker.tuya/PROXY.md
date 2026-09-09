---
chapters: {"pages":{"en/adapterref/iobroker.tuya/README.md":{"title":{"en":"ioBroker.tuya"},"content":"en/adapterref/iobroker.tuya/README.md"},"en/adapterref/iobroker.tuya/PROXY.md":{"title":{"en":"Proxy instructions for mobile Phones"},"content":"en/adapterref/iobroker.tuya/PROXY.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tuya/PROXY.md
title: Инструкции по использованию прокси-сервера для мобильных телефонов
hash: iFp2gokgU8uAPvx1smy3TPwUqG97vLpP4Nl2i0zgYrM=
---
# Инструкции по использованию прокси-сервера для мобильных телефонов

## iOS

**Важно: начиная с версии 3.0.0, прокси-сервер называется "NodeMITMProxyCA", а не "Anyproxy"!**

<https://youtu.be/bHaL9ftU2zc>

### Установить сертификат

![Сертификат 1](../../../en/adapterref/iobroker.tuya/img/ios_Zertifikat_1.jpg)

![Сертификат 2](../../../en/adapterref/iobroker.tuya/img/ios_Zertifikat_2.jpg)

![Сертификат 3](../../../en/adapterref/iobroker.tuya/img/ios_Zertifikat_3.jpg)

![Сертификат 4](../../../en/adapterref/iobroker.tuya/img/ios_Zertifikat_4.jpg)

![Сертификат 5](../../../en/adapterref/iobroker.tuya/img/ios_Zertifikat_5.jpg)

### Включить прокси

![Прокси 1](../../../en/adapterref/iobroker.tuya/img/ios_Proxy_1.jpg)

![Прокси 2](../../../en/adapterref/iobroker.tuya/img/ios_Proxy_2.jpg)

![Прокси 3](../../../en/adapterref/iobroker.tuya/img/ios_Proxy_3.jpg)

![Прокси 4](../../../en/adapterref/iobroker.tuya/img/ios_Proxy_4.jpg)

## Android

<https://youtu.be/bHaL9ftU2zc?t=275>

**Важно: начиная с версии 3.0.0, прокси-сервер называется "NodeMITMProxyCA", а не "Anyproxy"!**

**Важно: В некоторых новых версиях Android самоподписанные сертификаты могут быть вообще недоступны! Поэтому, если вы уверены, что всё сделали правильно, но ничего не работает или в логах отображаются только ошибки SSL, попробуйте использовать эмулятор Android (см. ниже)!**

### Установить сертификат

![Сертификат](../../../en/adapterref/iobroker.tuya/img/Android-Zertifikat.jpg)

В зависимости от версии Android может потребоваться установка сертификата для «VPN и приложений» ИЛИ «Wi-Fi». Простой способ — установить его дважды (по одному разу для каждого режима) :-)

### Включить прокси

![Прокси](../../../en/adapterref/iobroker.tuya/img/Android-Proxy.jpg)

### Подробное пошаговое руководство по использованию прокси-сервера с Android и более старыми версиями приложения.

см. [TuyaSync.pdf](https://raw.githubusercontent.com/Apollon77/ioBroker.tuya/master/TuyaSync.pdf)

Список известных совместимых приложений и версий можно найти в [файле README.md](https://github.com/Apollon77/ioBroker.tuya#compatible-mobile-apps-and-versions) !

Благодарим пользователя HappyTeaFriend с форума ioBroker!

### Резервный вариант, если вышеуказанные не сработают

Решение, работающее для пользователей, у которых также есть компьютер под управлением Windows, было описано на [форуме ioBroker](https://forum.iobroker.net/topic/16103/aufruf-neuer-adapter-iobroker-tuya-wlan-devices-tuya-smart-life-und-andere/83) и функционирует с симулятором Android. Второй подход с использованием эмулятора Android описан по ссылке: <https://forum.iobroker.net/topic/23431/aufruf-tuya-adapter-tests-verschl%C3%BCsselte-ger%C3%A4te/19>

<https://youtu.be/bHaL9ftU2zc?t=157>