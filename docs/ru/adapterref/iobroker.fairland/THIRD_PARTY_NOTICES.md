---
chapters: {"pages":{"en/adapterref/iobroker.fairland/README.md":{"title":{"en":"ioBroker Fairland Adapter"},"content":"en/adapterref/iobroker.fairland/README.md"},"en/adapterref/iobroker.fairland/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices"},"content":"en/adapterref/iobroker.fairland/THIRD_PARTY_NOTICES.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fairland/THIRD_PARTY_NOTICES.md
title: Уведомления третьих лиц
hash: aY3ZC7Nfj+9JkywtQ4jdV9ghctdc2u0/e4wwH2FXedg=
---
# Уведомления третьих лиц

## ха-фейрленд

Этот адаптер ioBroker создан на основе интеграции Home Assistant Fairland, распространяемой по лицензии MIT:

```text
Project: ha-fairland
Repository: https://github.com/siedi/ha-fairland
Copyright (c) 2025 @siedi
License: MIT
```

В рамках проекта, являющегося исходным кодом, реализованы функции облачного API Fairland/iGarden, обнаружение региональных серверов, обработка категорий устройств, сопоставление точек данных, обработка масштаба/единиц измерения и оптимистичная запись, которые были портированы и адаптированы для ioBroker.

Полный текст лицензии, предоставленной вышестоящим разработчиком, приводится ниже:

```text
MIT License

Copyright (c) 2025 @siedi

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
```

## Зависимости времени выполнения

Прямая зависимость от среды выполнения:

```text
@iobroker/adapter-core
License: MIT
```

Зависимости разработки:

```text
typescript
License: Apache-2.0

@types/node
License: MIT
```