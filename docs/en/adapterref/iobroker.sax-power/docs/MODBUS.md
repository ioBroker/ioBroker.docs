---
chapters: {"pages":{"en/adapterref/iobroker.sax-power/README.md":{"title":{"en":"ioBroker.sax-power"},"content":"en/adapterref/iobroker.sax-power/README.md"},"en/adapterref/iobroker.sax-power/docs/OBJECTS.md":{"title":{"en":"ioBroker object structure"},"content":"en/adapterref/iobroker.sax-power/docs/OBJECTS.md"},"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md":{"title":{"en":"Field reference"},"content":"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md"},"en/adapterref/iobroker.sax-power/docs/STATISTICS.md":{"title":{"en":"Historical energy statistics"},"content":"en/adapterref/iobroker.sax-power/docs/STATISTICS.md"},"en/adapterref/iobroker.sax-power/docs/BATTERY.md":{"title":{"en":"Battery models, equivalent full cycles and health"},"content":"en/adapterref/iobroker.sax-power/docs/BATTERY.md"},"en/adapterref/iobroker.sax-power/docs/MODBUS.md":{"title":{"en":"Modbus integration roadmap"},"content":"en/adapterref/iobroker.sax-power/docs/MODBUS.md"},"en/adapterref/iobroker.sax-power/docs/API.md":{"title":{"en":"SAX Power Cloud API"},"content":"en/adapterref/iobroker.sax-power/docs/API.md"},"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md":{"title":{"en":"Architecture"},"content":"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.sax-power/docs/BRANDING.md":{"title":{"en":"Branding and trademarks"},"content":"en/adapterref/iobroker.sax-power/docs/BRANDING.md"},"en/adapterref/iobroker.sax-power/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.sax-power/CONTRIBUTING.md"},"en/adapterref/iobroker.sax-power/SECURITY.md":{"title":{"en":"Security policy"},"content":"en/adapterref/iobroker.sax-power/SECURITY.md"},"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md":{"title":{"en":"Code of conduct"},"content":"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md"}}}
---
# Modbus integration roadmap

## Version 1.0 status

Modbus control is intentionally not exposed in version 1.0.

Version 1.0 provides:

- SAX Power cloud connection
- device discovery
- live measurements
- historical statistics
- aggregated live values

It does not provide writable charging or discharging control.

## Planned design

A later release may optionally forward control commands to writable states of an installed ioBroker Modbus adapter.

The design should remain independent of a fixed Modbus instance number. Users will select the required Modbus instance, and the adapter will discover writable numeric states below that instance.

## Known SAX Power register information

Based on the SAX Power documentation reviewed during development:

- Register 44 is used for the charging power limit.
- Register 43 is intended for the discharging power limit.

Register 43 may not be present in every existing ioBroker Modbus configuration.

The adapter must not assume that the Modbus instance is `modbus.1`.

## Safety requirements

Before Modbus control is released, the implementation must include:

- explicit opt-in
- validation of writable target states
- value range validation
- clear units
- safe startup behavior
- no automatic writes after installation
- dependency and availability checks
- error recovery
- audit-friendly logging without sensitive data
- tests for missing or stale states

## Intelligent charging

A later control feature may integrate user-defined charging logic. That feature is separate from basic Modbus forwarding and must account for dependencies such as:

- PV availability
- house consumption
- grid direction
- battery SOC
- configured limits
- stale measurements
- communication failure
- multiple storage devices
- manual override
- fallback behavior

No control algorithm is part of version 1.0.