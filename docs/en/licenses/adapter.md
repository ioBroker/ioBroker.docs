---
title: Adapter licenses
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/licenses/adapter.md
hash: tbMo7hu6caYH8EzSQb1bB33xKm6Q0lURzJaZFOlUbNc=
---
# Adapter licenses

Of the over 800 adapters, currently only 100 are needed **three** a license to even operate:

| adapter                 | For what                           |
| ----------------------- | ---------------------------------- |
| **vis-2**               | The visualization                  |
| **KNX**                 | The integration of KNX systems     |
| **JägerDesign Widgets** | A set of widgets for visualization |

All other adapters are free. An adapter license applies to the adapter on your own server; it has nothing to do with the cloud.

## Linked to the serial number

An adapter license is attached to the **UUID** The installation is bound to the identifier that ioBroker generates during setup. It is located in the
[System settings](/docs/admin/settings.md) and can also be queried on the command line:

```bash
iobroker uuid
```

The UUID changes when ioBroker is reinstalled, instead of being a single, fixed value.
[Security](/docs/config/backup.md) to restore it. A restore process retains the data, a manual reinstallation does not. This is one of the reasons why a working backup is worthwhile.

A license can be transferred when switching to different hardware. How often and how this works is described in the \[document/section/etc.]. [License overview](/productoverview).

## vis-2: private and commercial

For **vis-2** ioBroker GmbH provides a free license for private use. A paid license is required if vis-2 is used in the context of commercial or business activities, for example:

- the use in customer projects,
- the use within the context of services or paid systems,
- Operation by companies, authorities or other institutions.

For system integrators, this is the crucial point. Other considerations are detailed below.
[System integrators](/docs/integrators/README.md).

## The offline license

The free vis-2 license is checked in the cloud and therefore requires an internet connection. **Offline license** do without it. It's worthwhile in two cases:

- The internet connection is unstable or limited. The control system will remain locally accessible at all times.
- As a matter of principle, nothing should be shared externally. Visualizations and data remain entirely within the company's own system.

## Enter the license key

License keys are stored centrally, not per adapter: in the admin area under
**system**, rider **Licenses**The adapter will find it automatically from there. The tab is located under
[System settings](/docs/admin/settings.md) described.

In the rider [adapter](/docs/admin/adapter.md) The list view for each adapter also displays its license. This allows you to see what you're getting into before installation.

## Order

Adapter licenses run via **ioBroker.net**, not via ioBroker.pro. An overview of all packages is available at [Licenses](/productoverview), orders are placed on the [Price page](https://iobroker.net/www/pricing).