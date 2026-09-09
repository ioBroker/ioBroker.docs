---
chapters: {"pages":{"en/adapterref/iobroker.sax-power/README.md":{"title":{"en":"ioBroker.sax-power"},"content":"en/adapterref/iobroker.sax-power/README.md"},"en/adapterref/iobroker.sax-power/docs/OBJECTS.md":{"title":{"en":"ioBroker object structure"},"content":"en/adapterref/iobroker.sax-power/docs/OBJECTS.md"},"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md":{"title":{"en":"Field reference"},"content":"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md"},"en/adapterref/iobroker.sax-power/docs/STATISTICS.md":{"title":{"en":"Historical energy statistics"},"content":"en/adapterref/iobroker.sax-power/docs/STATISTICS.md"},"en/adapterref/iobroker.sax-power/docs/BATTERY.md":{"title":{"en":"Battery models, equivalent full cycles and health"},"content":"en/adapterref/iobroker.sax-power/docs/BATTERY.md"},"en/adapterref/iobroker.sax-power/docs/MODBUS.md":{"title":{"en":"Modbus integration roadmap"},"content":"en/adapterref/iobroker.sax-power/docs/MODBUS.md"},"en/adapterref/iobroker.sax-power/docs/API.md":{"title":{"en":"SAX Power Cloud API"},"content":"en/adapterref/iobroker.sax-power/docs/API.md"},"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md":{"title":{"en":"Architecture"},"content":"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.sax-power/docs/BRANDING.md":{"title":{"en":"Branding and trademarks"},"content":"en/adapterref/iobroker.sax-power/docs/BRANDING.md"},"en/adapterref/iobroker.sax-power/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.sax-power/CONTRIBUTING.md"},"en/adapterref/iobroker.sax-power/SECURITY.md":{"title":{"en":"Security policy"},"content":"en/adapterref/iobroker.sax-power/SECURITY.md"},"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md":{"title":{"en":"Code of conduct"},"content":"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sax-power/SECURITY.md
title: Политика безопасности
hash: 7twPuEZosaLVhV8hmLZ+VUiyghBGkTzWAQNiilQrQIg=
---
# Политика безопасности

## Поддерживаемые версии

В последнюю опубликованную версию адаптера внесены исправления безопасности.

## Сообщение об уязвимости

Пожалуйста, не сообщайте об уязвимостях безопасности в публичных сообщениях на GitHub.

Свяжитесь с сопровождающим проекта конфиденциально, используя контактную информацию, связанную с учетной записью GitHub или репозиторием. Укажите:

- затронутая версия адаптера
- влияние
- этапы воспроизведения
- соответствующие журналы с удаленными секретами
- предложенные меры по смягчению последствий, если таковые известны

Пожалуйста, не включайте:

- Пароли SAX Power
- жетоны предъявителя
- личные адреса электронной почты
- полные серийные номера хранилищ
- информация частной сети

## модель безопасности

Версия 1.0:

- выполняет запросы к облаку SAX Power только для чтения.
- хранит учетные данные в конфигурации экземпляра ioBroker.
- хранит токены аутентификации в памяти
- не записывает учетные данные или токены в журналы.
- не предоставляет доступ к записываемым состояниям управления Modbus
- не выполняет изменения конфигурации облака

Гарантировать отсутствие уязвимостей в программном обеспечении невозможно. Ответственные сообщения о нарушениях приветствуются.