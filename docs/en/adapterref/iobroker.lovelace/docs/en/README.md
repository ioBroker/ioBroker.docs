---
chapters: {"pages":{"en/adapterref/iobroker.lovelace/README.md":{"title":{"en":"ioBroker.lovelace"},"content":"en/adapterref/iobroker.lovelace/README.md"},"en/adapterref/iobroker.lovelace/docs/en/README.md":{"title":{"en":"ioBroker.lovelace — Documentation"},"content":"en/adapterref/iobroker.lovelace/docs/en/README.md"},"en/adapterref/iobroker.lovelace/docs/en/entities.md":{"title":{"en":"Entities"},"content":"en/adapterref/iobroker.lovelace/docs/en/entities.md"},"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md":{"title":{"en":"Custom cards, themes & UI tips"},"content":"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md"},"en/adapterref/iobroker.lovelace/docs/en/features.md":{"title":{"en":"Features"},"content":"en/adapterref/iobroker.lovelace/docs/en/features.md"},"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md":{"title":{"en":"Migrating themes (2026 frontend update)"},"content":"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md"}}}
---
![Logo](../../admin/lovelace.png)
# ioBroker.lovelace — Documentation

With this adapter, you can build a visualization for ioBroker with the Home Assistant Lovelace UI.

The adapter emulates a Home Assistant environment exposing the devices present in ioBroker. In Home Assistant features are provided as `entities` (an `entity` usually corresponds to one device). In ioBroker a device often consists of several `states`, so a 1:1 mapping of `state` to `entity` is not always trivial.

An `entity` always needs a unique id of the form `domain.unique_name`. The `domain` (e.g. `light`, `cover`, `input_number`) describes the function of the entity and determines how the Lovelace cards behave.

## Topics
* [Entities](/#/docs/adapterref/iobroker.lovelace/docs/en/entities.md) — automatic detection, manual configuration, supported & special entity types
* [Custom cards, themes & UI tips](/#/docs/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md)
* [Features](/#/docs/adapterref/iobroker.lovelace/docs/en/features.md) — notifications, voice control, video, troubleshooting
* [Migrating themes (2026 frontend update)](/#/docs/adapterref/iobroker.lovelace/docs/en/theme_migration.md)

Developer / build documentation lives in the [root README](/#/adapters/lovelace#development).

## Instance objects
In the folder `instances` there are some objects that can be used to control the UI. For every browser a new subfolder is created with a random ID. This ID is stored in the client browser's web storage. If you delete the web storage, a new instance is created. If you use Fully Kiosk Browser make sure the function `Delete webstorage on reload` is **disabled**.

This functionality uses browser_mod, which is installed and updated by the adapter. Do not add your own version of browser_mod as a custom card.

## Remote access via ioBroker Cloud
Besides using a VPN or exposing the port of the Lovelace instance (with the built-in authorization and SSL), you can also use Lovelace through the ioBroker cloud. The advantage: no connection is opened from the outside into your network — the connection is initiated from your system by the cloud adapter. This helps especially with Dual Stack Lite or other complex network setups you do not have full control over.

To enable it, register at iobroker.pro and install the cloud adapter. In the cloud adapter configuration select the desired lovelace instance. Afterwards Lovelace appears under "Applications" in the iobroker.pro UI and, after logging in, is reachable at `https://iobroker.pro:4443/lovelace/`.

In the Lovelace instance SSL should then be switched off. Authorization is also not needed, since it is handled via the ioBroker account.