---
chapters: {"pages":{"en/adapterref/iobroker.anker-solix/README.md":{"title":{"en":"ioBroker.anker-solix"},"content":"en/adapterref/iobroker.anker-solix/README.md"},"en/adapterref/iobroker.anker-solix/docs/docker-buanet.md":{"title":{"en":"Anker Solix im buanet/iobroker-Container"},"content":"en/adapterref/iobroker.anker-solix/docs/docker-buanet.md"},"en/adapterref/iobroker.anker-solix/CREDITS.md":{"title":{"en":"Credits & acknowledgments"},"content":"en/adapterref/iobroker.anker-solix/CREDITS.md"}}}
---
# Credits & acknowledgments

## ioBroker.solix4 — Michael Horn ([@michihorn64](https://github.com/michihorn64))

The **HTML dashboard widgets** in this adapter (live energy flow, settings tiles, daily energy, diagnosis, device inventory, multi-site overview) are **inspired by** the excellent work in:

**[ioBroker.solix4](https://github.com/michihorn64/ioBroker.solix4)**  
Copyright (c) 2026 Michael Horn — [MIT License](https://github.com/michihorn64/ioBroker.solix4/blob/main/LICENSE)

We reimplemented the layout and UX concept for the **anker-solix** object tree (solarbank, combiner_box, smartmeter, statistics channels) rather than copying source code verbatim. The dark gradient theme, energy-flow grid, settings groups, and kWh tile grids follow the same visual language that Michael Horn pioneered for Anker SOLIX Gen4 in ioBroker.

**Thank you, Michael, for sharing solix4 with the community.**

States are published under `anker-solix.0.dashboard.*` and can be shown in VIS/VIS-2 with a standard **HTML** widget (see [README.md](/#/adapters/anker-solix#html-dashboards-solix4-style)).