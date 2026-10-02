---
chapters: {"pages":{"en/adapterref/iobroker.fairland/README.md":{"title":{"en":"ioBroker Fairland Adapter"},"content":"en/adapterref/iobroker.fairland/README.md"},"en/adapterref/iobroker.fairland/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices"},"content":"en/adapterref/iobroker.fairland/THIRD_PARTY_NOTICES.md"}}}
---
# Third-Party Notices

## ha-fairland

This ioBroker adapter is derived from the MIT-licensed Home Assistant Fairland
integration:

```text
Project: ha-fairland
Repository: https://github.com/siedi/ha-fairland
Copyright (c) 2025 @siedi
License: MIT
```

The upstream project provides Fairland/iGarden cloud API behavior, regional
server detection, device category handling, data point mappings, scale/unit
handling, and optimistic write behavior that were ported and adapted for
ioBroker.

The upstream license is reproduced in full below:

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

## Runtime dependencies

Direct runtime dependency:

```text
@iobroker/adapter-core
License: MIT
```

Development dependencies:

```text
typescript
License: Apache-2.0

@types/node
License: MIT
```