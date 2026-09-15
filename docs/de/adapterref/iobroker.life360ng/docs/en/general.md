---
chapters: {"pages":{"en/adapterref/iobroker.life360ng/README.md":{"title":{"en":"ioBroker adapter for Life360 (next generation)"},"content":"en/adapterref/iobroker.life360ng/README.md"},"en/adapterref/iobroker.life360ng/docs/en/README.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.life360ng/docs/en/README.md"},"en/adapterref/iobroker.life360ng/docs/en/general.md":{"title":{"en":"Tab: General"},"content":"en/adapterref/iobroker.life360ng/docs/en/general.md"},"en/adapterref/iobroker.life360ng/docs/en/myplaces.md":{"title":{"en":"Tab: My Places"},"content":"en/adapterref/iobroker.life360ng/docs/en/myplaces.md"},"en/adapterref/iobroker.life360ng/docs/en/integration.md":{"title":{"en":"Tab: Integration"},"content":"en/adapterref/iobroker.life360ng/docs/en/integration.md"},"en/adapterref/iobroker.life360ng/docs/en/tracker.md":{"title":{"en":"Tab: Logbook"},"content":"en/adapterref/iobroker.life360ng/docs/en/tracker.md"},"en/adapterref/iobroker.life360ng/docs/en/mapdisplay.md":{"title":{"en":"Tab: Map Display"},"content":"en/adapterref/iobroker.life360ng/docs/en/mapdisplay.md"},"en/adapterref/iobroker.life360ng/docs/en/notifications.md":{"title":{"en":"Tab: Notifications"},"content":"en/adapterref/iobroker.life360ng/docs/en/notifications.md"},"en/adapterref/iobroker.life360ng/docs/en/advanced.md":{"title":{"en":"Tab: Advanced"},"content":"en/adapterref/iobroker.life360ng/docs/en/advanced.md"},"en/adapterref/iobroker.life360ng/docs/en/help.md":{"title":{"en":"Tab: Help"},"content":"en/adapterref/iobroker.life360ng/docs/en/help.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.life360ng/docs/en/general.md
title: Registerkarte: Allgemein
hash: xCtlecS144eJqLddCM8R89iRoxRCV39Yefl5xVSVvyI=
---
![Logo](../../../../../en/adapterref/iobroker.life360ng/admin/Life360ng.svg)

### Die nächste Generation

[zurück zur Startseite](/#/docs/adapterref/iobroker.life360ng/docs/en/README.md)

## Die nächste Generation

[zurück zur Startseite](/#/docs/adapterref/iobroker.life360ng/docs/en/README.md)

# Registerkarte: Allgemein

Die Registerkarte **„Allgemein“** enthält die grundlegenden Einstellungen für die Verbindung zum Life360-Dienst.

**Schlüsselfelder:**

- **Life360-Token:** Geben Sie hier Ihren persönlichen Life360-Token ein. Sie erhalten ihn gemäß den Anweisungen im Adapter oder über die Entwicklertools Ihres Browsers.
- **E-Mail:** Nur erforderlich, wenn Sie sich passwortbasiert anstelle des Tokens anmelden möchten (nicht empfohlen).
- **Abfrageintervall:** Legt fest, wie oft der Adapter neue Standortdaten von Life360 abruft (in Sekunden, Standard: 60). Kürzere Intervalle liefern aktuellere Daten, erhöhen aber die API-Last.

**Hinweis:** Für die Verbindung des Adapters mit Life360 ist ein Token erforderlich. Ohne ein gültiges Token bleibt der Adapter offline.

Weitere Hilfetexte sind direkt in der Admin-Oberfläche als Tooltips verfügbar.