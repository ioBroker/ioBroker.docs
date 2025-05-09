---
lastChanged: 24.08.2024
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/basics/adapter.md
title: Контроллеры и адаптеры: строительные блоки от ioBroker
hash: S3kOycQ/YIdh5RpXKm+5OGGoGyK/AJGfrSPc7w39HDY=
---
# Контроллеры и адаптеры: строительные блоки от ioBroker
## Контроллер: сердце ioBroker
Контроллер является центральным элементом ioBroker. Именно мозг контролирует и координирует всю систему.
Он отвечает за бесперебойную совместную работу всех компонентов и обмен данными.

**Что делает контроллер?**

* **Управление адаптерами:** Контроллер отслеживает и управляет всеми установленными адаптерами. Это гарантирует, что они работают правильно и могут обмениваться данными.
* **Хранить данные:** Контроллер сохраняет все данные, собранные адаптерами. Это означает, что вы можете получить доступ к данным в любое время и использовать их для автоматизации или визуализации.
* **Мониторинг системы:** Контроллер контролирует состояние всей системы. Он может вызывать уведомления и сигналы тревоги при возникновении проблем.

**Контроллер является основой всех функций ioBroker. Без него система не работала бы.**

## Адаптер: интерфейс с миром
Адаптеры — это интерфейс между ioBroker и внешним миром. Они позволяют интегрировать в систему различные устройства, сервисы и протоколы.

**Что делают адаптеры?**

* **Интегрируйте данные.** Адаптеры собирают данные с внешних устройств или служб и делают эти данные доступными в ioBroker. Например, вы можете получить доступ к данным датчиков, информации о состоянии или другим соответствующим данным.
* **Устройства управления:** Адаптеры позволяют управлять внешними устройствами или службами через ioBroker. Например, вы можете включать и выключать устройства, задавать параметры или выполнять команды.
* **Перевести протоколы.** Адаптеры переводят протоколы связи внешних устройств или служб в формат, понятный ioBroker. Это позволяет легко интегрировать различные системы, использующие разные протоколы.

**Адаптеры — это ключ к подключению ioBroker к миру.**

## Примеры адаптеров
* **Адаптер Zigbee:** позволяет интегрировать устройства на базе Zigbee, такие как лампы, датчики и переключатели.
* **Адаптер MQTT:** обеспечивает связь со службами и устройствами на основе MQTT.
* **HTTP-адаптер:** позволяет интегрировать службы, обменивающиеся данными через HTTP.

## Преимущества использования адаптеров
* **Гибкость.** Адаптеры позволяют интегрировать различные устройства и службы независимо от их протоколов связи.
* **Расширяемость:** можно разработать новые адаптеры для поддержки дополнительных устройств или служб. Это означает, что вы можете постоянно расширять ioBroker и адаптировать его к своим потребностям.
* **Централизация:** с помощью адаптеров можно централизованно управлять всеми устройствами и службами через ioBroker.

## Типы адаптеров
* **Адаптеры устройств:** Эти адаптеры позволяют интегрировать и управлять физическими устройствами, такими как лампы, датчики и переключатели. Примерами являются адаптер Zigbee и адаптер Z-Wave.
* **Адаптеры протоколов.** Эти адаптеры преобразуют различные протоколы связи в формат, понятный ioBroker. Примерами являются адаптер MQTT и адаптер HTTP.
* **Сервисные адаптеры.** Эти адаптеры позволяют интегрировать онлайн-сервисы и API. Примерами являются адаптер Alexa и адаптер Google Home.
* **Адаптеры баз данных:** Эти адаптеры позволяют хранить данные и выполнять запросы к ним в различных системах баз данных. Примеры включают адаптер SQL и адаптер InfluxDB.
* **Адаптеры визуализации.** Эти адаптеры предоставляют возможности визуализации и отображения данных. Примерами являются адаптер Vis и адаптер Flot.
* **Адаптеры сценариев:** Эти адаптеры позволяют создавать и выполнять сценарии в ioBroker. Примеры включают адаптер JavaScript и адаптер Blockly.
* **Специальные адаптеры.** Эти адаптеры предоставляют специальные функции или возможности интеграции, которые не входят в другие категории. Примерами являются адаптер Ping и адаптер Backitup.

**При правильном сочетании контроллера и адаптеров вы можете настроить ioBroker в соответствии со своими индивидуальными потребностями и создать умный дом или офис.**