---
title: Access licenses
lastChanged: 24.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/licenses/cloud.md
hash: /2/tFainpZrZ7pyuzamL5o14VFbmYUqQQc369qEO8+0=
---
# Access licenses

Access licenses do not apply to ioBroker itself, but to the services that connect it to the outside world. There are two of them, and they can be used individually or together.

| License           | For what                     | Responsible adapter |
| ----------------- | ---------------------------- | ------------------- |
| **assistant**     | Voice control and services   | `iot`               |
| **Remote access** | Accessing surfaces on the go | `cloud`             |

Both methods work **from the inside out** . Therefore, no port needs to be opened in the router, and the installation is not accessible from the internet. This is the real reason why these services exist.

## The Assistant License

It unlocks:

- **Voice control** via Amazon Alexa, Google Home, and Yandex Alisa. For Alexa, there are two skills: the [ioBroker.assistant skill](https://www.amazon.de/ioBroker-ioBroker-assistant/dp/B0FJHBXDZ4) for standard commands and the [custom skill](https://www.amazon.de/ioBroker-Custom/dp/B01MQL6Z1N) for user-defined queries and phrases.
- **Services** : Geolocation for location-based automations, Tasker integration and URL services via HTTP GET and POST.
- **MCP** : the access point through which AI assistants can reach the user's system.
- **Matter** : the connection of Matter-enabled devices via the ioBroker Matter Bridge.

There's a crucial distinction to consider with the Matter adapter that's often overlooked: the adapter itself is free, and any number of Matter devices can be integrated and controlled. The only limitation is the reverse process, i.e., sharing your own ioBroker devices via the bridge with Apple Home, Google Home, or Alexa.

A "command" isn't just a voice command; status queries also fall under this category. If you open the Alexa app with 100 devices connected, Amazon immediately sends over 100 so-called StatusReport commands, and while open, the app queries again every few seconds. This behavior is standard practice at Amazon, starting with the Alexa Smart Home API V3, and cannot be influenced by ioBroker. Therefore, a quota can be used up even without a single voice command being issued.

## The remote access license

It regulates what can be accessed while on the go. The difference between the free and paid versions lies in three points:

- **Which interfaces?** Displaying the visualization is free; the Pro version includes admin, scripts, Lovelace, e-charts, and more.
- **View or edit.** Vis-2 can be viewed for free, but not edited.
- **Browser or app.** The free version runs in the browser, the Pro version also in the [app](/docs/cloud/app.md) .

The Pro version of remote access includes the Assistant license, which also covers voice control, services, MCP, and Matter. Users who already have this license do not need the Assistant license separately.

## Which account

| What you want                              | account on                           |
| ------------------------------------------ | ------------------------------------ |
| Free remote access                         | [ioBroker.net](https://iobroker.net) |
| Voice assistants or enhanced remote access | [ioBroker.pro](https://iobroker.pro) |
| MCP access                                 | [ioBroker.pro](https://iobroker.pro) |

Both are managed in the same profile; see [Licenses Overview](/docs/licenses/README.md) .

Depending on the purpose, a different adapter is set up: the **cloud** adapter for [remote access](/docs/cloud/viz.md) , the **IoT** adapter for [assistants and services](/docs/cloud/iot.md) . Users who use both operate both.

Conditions and quotas are listed in the [license overview](/productoverview) .