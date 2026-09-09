---
chapters: {"pages":{"en/adapterref/iobroker.life360ng/README.md":{"title":{"en":"ioBroker adapter for Life360 (next generation)"},"content":"en/adapterref/iobroker.life360ng/README.md"},"en/adapterref/iobroker.life360ng/docs/en/README.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.life360ng/docs/en/README.md"},"en/adapterref/iobroker.life360ng/docs/en/general.md":{"title":{"en":"Tab: General"},"content":"en/adapterref/iobroker.life360ng/docs/en/general.md"},"en/adapterref/iobroker.life360ng/docs/en/myplaces.md":{"title":{"en":"Tab: My Places"},"content":"en/adapterref/iobroker.life360ng/docs/en/myplaces.md"},"en/adapterref/iobroker.life360ng/docs/en/integration.md":{"title":{"en":"Tab: Integration"},"content":"en/adapterref/iobroker.life360ng/docs/en/integration.md"},"en/adapterref/iobroker.life360ng/docs/en/tracker.md":{"title":{"en":"Tab: Logbook"},"content":"en/adapterref/iobroker.life360ng/docs/en/tracker.md"},"en/adapterref/iobroker.life360ng/docs/en/mapdisplay.md":{"title":{"en":"Tab: Map Display"},"content":"en/adapterref/iobroker.life360ng/docs/en/mapdisplay.md"},"en/adapterref/iobroker.life360ng/docs/en/notifications.md":{"title":{"en":"Tab: Notifications"},"content":"en/adapterref/iobroker.life360ng/docs/en/notifications.md"},"en/adapterref/iobroker.life360ng/docs/en/advanced.md":{"title":{"en":"Tab: Advanced"},"content":"en/adapterref/iobroker.life360ng/docs/en/advanced.md"},"en/adapterref/iobroker.life360ng/docs/en/help.md":{"title":{"en":"Tab: Help"},"content":"en/adapterref/iobroker.life360ng/docs/en/help.md"}}}
---
![Logo](../../admin/Life360ng.svg)
### The Next Generation
[zurück zur Startseite](/#/docs/adapterref/iobroker.life360ng/docs/en/README.md)

# Tab: My Places

In the **My Places** tab, you can define your own private places, independent of the Life360 cloud places.

**Features:**

- Add any number of places with name, latitude, longitude, and radius.
- These places are used for presence detection and automations in ioBroker.
- Life360 cloud places and your own places can be used in parallel.

**Table:**
- **Name:** Freely selectable name for the place (e.g., "Home", "Work")
- **Latitude / Longitude:** Coordinates of the place (e.g., copy from Google Maps)
- **Radius:** Area in meters in which a person is considered "present"
- **Circle:** (optional) Assignment to a Life360 circle

**Note:**
Your own places are only visible locally in ioBroker and are not sent to Life360.

> **Life360 Places not available?**
> Life360 has restricted access to cloud places via the API for some accounts — particularly EU accounts on the free tier. If the adapter log shows `All place sources returned 0 places`, Life360 is no longer exposing your places through any API endpoint.
> **Workaround:** Define your important places as **My Places** in this tab. They work independently of Life360 and provide the same presence detection functionality.