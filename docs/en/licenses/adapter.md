---
title: Adapter licenses
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/licenses/adapter.md
hash: tbMo7hu6caYH8EzSQb1bB33xKm6Q0lURzJaZFOlUbNc=
---
# Adapter licenses

Of the more than 800 adapters, **three** currently require a license to even function:

| adapter                 | For what                           |
| ----------------------- | ---------------------------------- |
| **vis-2**               | The visualization                  |
| **KNX**                 | The integration of KNX systems     |
| **JägerDesign Widgets** | A set of widgets for visualization |

All other adapters are free. An adapter license applies to the adapter on your own server; it has nothing to do with the cloud.

## Linked to the serial number

An adapter license is bound to the installation's **UUID** , i.e., the identifier that ioBroker generates during setup. It is located in the [system settings](/docs/admin/settings.md) and can also be queried via the command line.

```bash
iobroker uuid
```

The UUID changes when ioBroker is reinstalled instead of restoring from a [backup](/docs/config/backup.md) . A restore retains it, but a manual reinstallation does not. This is one of the reasons why a working backup is worthwhile.

When switching to different hardware, a license can be transferred. The [license overview](/productoverview) explains how often and how this works.

## vis-2: private and commercial

ioBroker GmbH provides a free license for **vis-2** for private use. A paid license is required if vis-2 is used for commercial or business purposes, for example:

- the use in customer projects,
- the use within the context of services or paid systems,
- Operation by companies, authorities or other institutions.

For system integrators, this is the crucial point: as soon as an installation is built or operated for a customer, the use is commercial.

## The offline license

The free vis-2 license is checked in the cloud and therefore requires an internet connection. The **offline license** does not require this. It is worthwhile in two cases:

- The internet connection is unstable or limited. The control system will remain locally accessible at all times.
- As a matter of principle, nothing should be shared externally. Visualizations and data remain entirely within the company's own system.

## Enter the license key

License keys are stored centrally, not per adapter: in the admin panel under **System** , **Licenses** tab. The respective adapter then automatically retrieves the key from there. The tab is described under [System Settings](/docs/admin/settings.md) .

In the [Adapters](/docs/admin/adapter.md) tab, the list view for each adapter also displays its license. This allows you to see what you're getting into before installation.

## Order

Adapter licenses are managed via **ioBroker.net** , not ioBroker.pro. An overview of all packages can be found under [Licenses](/productoverview) ; orders are placed on the [pricing page](https://iobroker.net/www/pricing) .