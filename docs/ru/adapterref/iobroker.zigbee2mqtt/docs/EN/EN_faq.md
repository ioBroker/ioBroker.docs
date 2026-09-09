---
chapters: {"pages":{"en/adapterref/iobroker.zigbee2mqtt/README.md":{"title":{"en":"ioBroker.zigbee2mqtt"},"content":"en/adapterref/iobroker.zigbee2mqtt/README.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/wiki.md":{"title":{"en":"Wiki"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/wiki.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_AdapterConfig.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_AdapterConfig.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started.md":{"title":{"en":"Installation"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started_move.md":{"title":{"en":"Installation incl. moving from ioBroker/Zigbee adapter"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started_move.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_faq.md":{"title":{"en":"FAQ"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_faq.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_Instruction_Proxmox_Container.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_Instruction_Proxmox_Container.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_faq.md
title: Часто задаваемые вопросы
hash: yjuNgbrR36yfFPMuA+jmGRGqMW0YwSSkEc6g2+PSb2c=
---
# Часто задаваемые вопросы

Здесь даны ответы на наиболее часто задаваемые вопросы. В основном, можно обратиться к официальной документации Zigbee2MQTT. Эта WIKI в первую очередь разъясняет вопросы, касающиеся работы с адаптером, а не с самим Zigbee2MQTT.

Официальная документация: <https://www.zigbee2mqtt.io/guide/getting-started>

# Оглавление

- [Часто задаваемые вопросы](#faq)
- [Оглавление](#table-of-contents)
  - [Страница подключения/конфигурации к Zigbee2MQTT не отображается в ioBroker.](#connectionconfiguration-page-to-zigbee2mqtt-is-not-displayed-in-iobroker-)
  - [В чём разница между этим адаптером и адаптером ioBroker/Zigbee?](#what-is-the-difference-between-this-adapter-and-the-iobrokerzigbee-adapter-)
  - [Что именно представляет собой Zigbee2MQTT/Z2M?](#what-exactly-is-zigbee2mqttz2m-)
  - [Как получить доступ к ресурсам устройства?](#how-do-i-get-the-exposes-from-a-device-)
  - [Какие параметры конфигурации Zigbee2MQTT необходимы?](#which-zigbee2mqtt-configuration-parameters-are-needed-)
  - [Почему устройства в ioBroker не удаляются после удаления из z2m?](#why-are-devices-in-iobroker-not-also-deleted-after-being-deleted-from-z2m-)

## Страница подключения/конфигурации к Zigbee2MQTT не отображается в ioBroker.<a name="1"></a>

Исходная ситуация:

Если в административной панели ioBroker используется зашифрованное соединение по протоколу HTTPS, браузер не загружает встроенный пользовательский интерфейс Zigbee2MQTT.

Причина:

К сожалению, в Zigbee2MQTT пока невозможно настроить зашифрованное соединение. Использование HTTPS-соединения в административном адаптере, к сожалению, не позволяет использовать незашифрованное соединение iFrame, что и происходит в данном случае.

Решение:

- Отключите HTTPS-соединение в административном адаптере.
- Для доступа к странице конфигурации Zigbee2MQTT используется прокси-соединение, но пока неясно, будет ли по-прежнему работать соединение WebSocket, используемое этим адаптером.

## В чём разница между этим адаптером и адаптером ioBroker/Zigbee?<a name="2"></a>

Адаптер ioBroker/Zigbee использует базу данных Zigbee2MQTT, но управляет своими устройствами самостоятельно.

Этот адаптер Zigbee2MQTT передает управление устройствами официальному программному обеспечению и получает от него только данные для управления устройствами через ioBroker. Это означает, что сеть Zigbee работает независимо от ioBroker. Значительно большим преимуществом с точки зрения разработчика является то, что новые функции не нужно реализовывать команде из 1-3 человек (как в случае с адаптером ioBroker/Zigbee), а гораздо большей команде, насчитывающей несколько сотен разработчиков и гораздо большее сообщество, поскольку Zigbee2MQTT также используется в качестве основы различными другими системами.

## Что именно представляет собой Zigbee2MQTT/Z2M?<a name="3"></a>

Zigbee2MQTT — это проект с открытым исходным кодом (например, DAS Projekt, когда Zigbee находится в открытом исходном коде), с Zigbee Geräte über MQTT, непосредственно используемый и доступный для использования, когда он находится здесь, в Bridge eines Herstellers. хороший вариант. Somit ist es auch möglich Geräte mehrere Hersteller über ein System zu verwalten, ohne dass man zu Hause immer die Bridge des Jeweiligen Herstellers braucht. Zigbee2MQTT — это базовый вариант Verschiedener SmartHome Zentralen, с FEHM, HomeAssitent и ioBroker, когда это Verwaltung von Zigbee Geräten geht. Bedeutet aber auch das hier eine zusätzliche Software installiert, eingerichtet und gepflegt werden muss!

## Как получить доступ к ресурсам устройства?<a name="4"></a>

- Необходимо ввести IEEE-адрес (`0x......` ) от затронутого устройства в точку данных`zigbee2mqtt.[X].info.debugmessages`
- Затем перезагрузите адаптер.
- А теперь найдите в журнале предупреждающее сообщение, которое начинается так:`-->> fromZ2M -> 0x...... exposes:`

## Какие параметры конфигурации Zigbee2MQTT необходимы?<a name="5"></a>

Этот адаптер основан на текущей JSON-данной Zigbee2MQTT, поэтому устаревший режим не поддерживается в версии 1. Это означает, что для корректной работы адаптера **необходимы** следующие параметры конфигурации!

```yaml
advanced:
    <Your other parameters>
    legacy_api: false
    legacy_availability_payload: false
    cache_state: false
    output: json
device_options:
    legacy: false
availability: true
```

Если вы установите версию 2

```yaml
advanced:
    <Your other parameters>  
    cache_state: false
    output: json
availability:
    enabled: true
```

## Почему устройства в ioBroker не удаляются после удаления из z2m?<a name="6"></a>

Поскольку точки данных создаются очень динамично, и во избежание возможных ошибок, устройства не удаляются. В противном случае пользовательские настройки (если таковые имеются) точки данных будут потеряны. Обычно имя следует заменить на "Устройство удалено!", а параметр available следует установить на "false", чтобы при желании можно было удалить точки данных позже.