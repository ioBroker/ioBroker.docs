---
chapters: {"pages":{"en/adapterref/iobroker.life360ng/README.md":{"title":{"en":"ioBroker adapter for Life360 (next generation)"},"content":"en/adapterref/iobroker.life360ng/README.md"},"en/adapterref/iobroker.life360ng/docs/en/README.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.life360ng/docs/en/README.md"},"en/adapterref/iobroker.life360ng/docs/en/general.md":{"title":{"en":"Tab: General"},"content":"en/adapterref/iobroker.life360ng/docs/en/general.md"},"en/adapterref/iobroker.life360ng/docs/en/myplaces.md":{"title":{"en":"Tab: My Places"},"content":"en/adapterref/iobroker.life360ng/docs/en/myplaces.md"},"en/adapterref/iobroker.life360ng/docs/en/integration.md":{"title":{"en":"Tab: Integration"},"content":"en/adapterref/iobroker.life360ng/docs/en/integration.md"},"en/adapterref/iobroker.life360ng/docs/en/tracker.md":{"title":{"en":"Tab: Logbook"},"content":"en/adapterref/iobroker.life360ng/docs/en/tracker.md"},"en/adapterref/iobroker.life360ng/docs/en/mapdisplay.md":{"title":{"en":"Tab: Map Display"},"content":"en/adapterref/iobroker.life360ng/docs/en/mapdisplay.md"},"en/adapterref/iobroker.life360ng/docs/en/notifications.md":{"title":{"en":"Tab: Notifications"},"content":"en/adapterref/iobroker.life360ng/docs/en/notifications.md"},"en/adapterref/iobroker.life360ng/docs/en/advanced.md":{"title":{"en":"Tab: Advanced"},"content":"en/adapterref/iobroker.life360ng/docs/en/advanced.md"},"en/adapterref/iobroker.life360ng/docs/en/help.md":{"title":{"en":"Tab: Help"},"content":"en/adapterref/iobroker.life360ng/docs/en/help.md"}}}
---
![Logo](../../admin/Life360ng.svg)
### The Next Generation
[zurück zur Startseite](/#/docs/adapterref/iobroker.life360ng/docs/en/README.md)

## The Next Generation

[zurück zur Startseite](/#/docs/adapterref/iobroker.life360ng/docs/en/README.md)

# Tab: General

The **General** tab contains the basic settings for connecting to the Life360 service.

**Key fields:**

- **Life360 Token:** Enter your personal Life360 token here. You can obtain it by following the instructions in the adapter or from your browser's developer tools.
- **Email:** Only needed if you want to use password-based login instead of the token (not recommended)
- **Polling Interval:** Defines how often the adapter fetches new location data from Life360 (in seconds, default: 60). Shorter intervals provide more up-to-date data but increase API load.

**Note:**
The token is required for the adapter to connect to Life360. Without a valid token, the adapter will remain offline.

Further help texts are available directly in the admin interface as tooltips.