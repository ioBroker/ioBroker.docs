---
title: Access licenses
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/licenses/cloud.md
hash: OWqmGKfURhfiBmDCFNMCwXAXYXpP1c/V5nv4psD85/Y=
---
# Access licenses

Access licenses do not apply to ioBroker itself, but to the services that connect it to the outside world. There are two of them, and they can be used individually or together.

| License           | For what                     | Responsible adapter |
| ----------------- | ---------------------------- | ------------------- |
| **assistant**     | Voice control and services   | `iot`               |
| **Remote access** | Accessing surfaces on the go | `cloud`             |

Both are going down that path **from inside to outside**Therefore, no port needs to be opened in the router, and the installation is not accessible from the internet. That is the real reason why these services exist.

## The Assistant License

It unlocks:

- **Voice control** via Amazon Alexa, Google Home, and Yandex Alisa. There are two skills for Alexa: the
  [ioBroker.assistant Skill](https://www.amazon.de/ioBroker-ioBroker-assistant/dp/B0FJHBXDZ4)
  for the usual commands and the
  [Custom Skill](https://www.amazon.de/ioBroker-Custom/dp/B01MQL6Z1N) for your own queries and formulations.
- **Services**: Geoposition for location-based automations, Tasker integration and URL services via HTTP GET and POST.
- **Matter**: the connection of Matter-capable devices via the ioBroker Matter Bridge.

There's a crucial distinction to consider with the Matter adapter that's often overlooked: the adapter itself is free, and any number of Matter devices can be integrated and controlled. The only limitation is the reverse process, i.e., sharing your own ioBroker devices via the bridge with Apple Home, Google Home, or Alexa.

A "command" isn't just a voice command; status queries also fall under this category. If you open the Alexa app with 100 devices connected, Amazon immediately sends over 100 so-called StatusReport commands, and while open, the app queries again every few seconds. This behavior is standard practice at Amazon, starting with the Alexa Smart Home API V3, and cannot be influenced by ioBroker. Therefore, a quota can be used up even without a single voice command being issued.

## The remote access license

It regulates what can be accessed while on the go. The difference between the free and paid versions lies in three points:

- **Which surfaces?** The visualization is free to view; the Pro version includes Admin, scripts, Lovelace, e-charts and more.
- **View or edit.** Vis-2 can be viewed free of charge, but not edited.
- **Browser or app.** The free version runs in the browser, the Pro version also in the [App](/docs/cloud/app.md).

The Pro version of remote access includes the assistant license.

## Which account

| What you want                              | account on                           |
| ------------------------------------------ | ------------------------------------ |
| Free remote access                         | [ioBroker.net](https://iobroker.net) |
| Voice assistants or enhanced remote access | [ioBroker.pro](https://iobroker.pro) |

The facility is located under [IoT](/docs/cloud/iot.md) Described step by step. Conditions and quotas are listed in the
[License overview](/productoverview), orders are placed on the
[Pricing page of ioBroker.pro](https://iobroker.pro/www/pricing#remote).