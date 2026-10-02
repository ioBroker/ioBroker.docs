---
chapters: {"pages":{"en/adapterref/iobroker.fairland/README.md":{"title":{"en":"ioBroker Fairland Adapter"},"content":"en/adapterref/iobroker.fairland/README.md"},"en/adapterref/iobroker.fairland/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices"},"content":"en/adapterref/iobroker.fairland/THIRD_PARTY_NOTICES.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.fairland/THIRD_PARTY_NOTICES.md
title: Hinweise Dritter
hash: aY3ZC7Nfj+9JkywtQ4jdV9ghctdc2u0/e4wwH2FXedg=
---
# Hinweise Dritter

## ha-fairland

Dieser ioBroker-Adapter basiert auf der MIT-lizenzierten Home Assistant Fairland-Integration:

```text
Project: ha-fairland
Repository: https://github.com/siedi/ha-fairland
Copyright (c) 2025 @siedi
License: MIT
```

Das Upstream-Projekt bietet das Cloud-API-Verhalten von Fairland/iGarden, die Erkennung regionaler Server, die Handhabung von Gerätekategorien, Datenpunktzuordnungen, die Skalierungs-/Einheitenhandhabung und das optimistische Schreibverhalten, die für ioBroker portiert und angepasst wurden.

Die Upstream-Lizenz ist nachfolgend vollständig wiedergegeben:

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

## Laufzeitabhängigkeiten

Direkte Laufzeitabhängigkeit:

```text
@iobroker/adapter-core
License: MIT
```

Entwicklungsabhängigkeiten:

```text
typescript
License: Apache-2.0

@types/node
License: MIT
```