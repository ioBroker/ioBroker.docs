---
chapters: {"pages":{"en/adapterref/iobroker.sax-power/README.md":{"title":{"en":"ioBroker.sax-power"},"content":"en/adapterref/iobroker.sax-power/README.md"},"en/adapterref/iobroker.sax-power/docs/OBJECTS.md":{"title":{"en":"ioBroker object structure"},"content":"en/adapterref/iobroker.sax-power/docs/OBJECTS.md"},"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md":{"title":{"en":"Field reference"},"content":"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md"},"en/adapterref/iobroker.sax-power/docs/STATISTICS.md":{"title":{"en":"Historical energy statistics"},"content":"en/adapterref/iobroker.sax-power/docs/STATISTICS.md"},"en/adapterref/iobroker.sax-power/docs/BATTERY.md":{"title":{"en":"Battery models, equivalent full cycles and health"},"content":"en/adapterref/iobroker.sax-power/docs/BATTERY.md"},"en/adapterref/iobroker.sax-power/docs/MODBUS.md":{"title":{"en":"Modbus integration roadmap"},"content":"en/adapterref/iobroker.sax-power/docs/MODBUS.md"},"en/adapterref/iobroker.sax-power/docs/API.md":{"title":{"en":"SAX Power Cloud API"},"content":"en/adapterref/iobroker.sax-power/docs/API.md"},"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md":{"title":{"en":"Architecture"},"content":"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.sax-power/docs/BRANDING.md":{"title":{"en":"Branding and trademarks"},"content":"en/adapterref/iobroker.sax-power/docs/BRANDING.md"},"en/adapterref/iobroker.sax-power/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.sax-power/CONTRIBUTING.md"},"en/adapterref/iobroker.sax-power/SECURITY.md":{"title":{"en":"Security policy"},"content":"en/adapterref/iobroker.sax-power/SECURITY.md"},"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md":{"title":{"en":"Code of conduct"},"content":"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md"}}}
---
# SAX Power Cloud API

## Scope

This document describes the cloud calls used by the adapter. The API is not documented here as a public or stable third-party contract. Endpoint behavior may change without notice.

The adapter uses the API only for read-only data retrieval.

## Default API base URL

```text
https://webserver.sax-power.net
```

The base URL is configurable in the adapter instance.

## Authentication

### Token request

```http
POST /api/auth/token/
```

The request authenticates with the configured SAX Power username or email address and password.

The returned bearer token is held in memory and is not stored in ioBroker states or written to logs.

## Live data

```http
GET /api/auth/data/
```

This endpoint returns the storage devices assigned to the account and their current values.

The adapter uses the response for:

- device discovery
- device information
- battery live values
- grid live values
- optional PV values
- state of charge

Not every installation returns every possible field. Missing values are represented as unavailable rather than being replaced with zero.

## Historical energy chart

```http
GET /api/auth/energy_chart/
```

The adapter requests supported periods for a selected storage serial number.

Validated period formats include:

```text
week_YYYY-MM-DD
month_YYYY-MM-DD
year_YYYY-MM-DD
total_YYYY-MM-DD
```

The SAX Power service may use a different parameter format for daily chart data. For version 1.0, today's values are derived from the current monthly response.

## Historical fields

Observed history responses can include:

- `m2`
- `m2N`
- `m4`
- `m5`
- `m5N`
- `total_m2`
- `total_m2N`
- `total_m4`
- `total_m5`
- `total_m5N`
- `de_time`
- `me_time`
- `year`

The adapter parser maps the relevant battery-energy values into:

- charged energy
- discharged energy

The raw cloud field names are intentionally not exposed as the public ioBroker object contract.

## Request policy

Version 1.0 performs only:

- authentication requests
- live data reads
- historical energy-chart reads

It does not perform:

- `PUT`
- `PATCH`
- `DELETE`
- cloud configuration changes
- control commands
- Modbus writes

## Polling policy

The minimum cloud polling interval is 60 seconds.

The live dashboard refreshes ioBroker states independently and does not increase the SAX Power cloud request rate.

## Error handling

The adapter treats the following as distinct failures:

- DNS or network error
- HTTP error
- authentication failure
- invalid response shape
- missing device data
- unavailable optional field

Passwords and tokens are excluded from diagnostic output.