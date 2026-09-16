---
chapters: {"pages":{"en/adapterref/iobroker.life360ng/README.md":{"title":{"en":"ioBroker adapter for Life360 (next generation)"},"content":"en/adapterref/iobroker.life360ng/README.md"},"en/adapterref/iobroker.life360ng/docs/en/README.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.life360ng/docs/en/README.md"},"en/adapterref/iobroker.life360ng/docs/en/general.md":{"title":{"en":"Tab: General"},"content":"en/adapterref/iobroker.life360ng/docs/en/general.md"},"en/adapterref/iobroker.life360ng/docs/en/myplaces.md":{"title":{"en":"Tab: My Places"},"content":"en/adapterref/iobroker.life360ng/docs/en/myplaces.md"},"en/adapterref/iobroker.life360ng/docs/en/integration.md":{"title":{"en":"Tab: Integration"},"content":"en/adapterref/iobroker.life360ng/docs/en/integration.md"},"en/adapterref/iobroker.life360ng/docs/en/tracker.md":{"title":{"en":"Tab: Logbook"},"content":"en/adapterref/iobroker.life360ng/docs/en/tracker.md"},"en/adapterref/iobroker.life360ng/docs/en/mapdisplay.md":{"title":{"en":"Tab: Map Display"},"content":"en/adapterref/iobroker.life360ng/docs/en/mapdisplay.md"},"en/adapterref/iobroker.life360ng/docs/en/notifications.md":{"title":{"en":"Tab: Notifications"},"content":"en/adapterref/iobroker.life360ng/docs/en/notifications.md"},"en/adapterref/iobroker.life360ng/docs/en/advanced.md":{"title":{"en":"Tab: Advanced"},"content":"en/adapterref/iobroker.life360ng/docs/en/advanced.md"},"en/adapterref/iobroker.life360ng/docs/en/help.md":{"title":{"en":"Tab: Help"},"content":"en/adapterref/iobroker.life360ng/docs/en/help.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.life360ng/docs/en/myplaces.md
title: Registerkarte: Meine Orte
hash: X6X3kpcksr+lUFc1tKht/2zwC+qcOEyQV0afygLnc2w=
---
![Logo](../../../../../en/adapterref/iobroker.life360ng/admin/Life360ng.svg)

### Die nächste Generation

[zurück zur Startseite](/#/docs/adapterref/iobroker.life360ng/docs/en/README.md)

# Registerkarte: Meine Orte

Im Menüpunkt **„Meine Orte“** können Sie Ihre eigenen privaten Orte definieren, unabhängig von den Life360-Cloud-Orten.

**Merkmale:**

- Fügen Sie beliebig viele Orte mit Namen, Breitengrad, Längengrad und Radius hinzu.
- Diese Bereiche werden in ioBroker für Anwesenheitserkennung und Automatisierungen genutzt.
- Life360-Cloud-Orte und Ihre eigenen Orte können parallel genutzt werden.

**Tisch:**

- **Name:** Frei wählbarer Name für den Ort (z. B. „Zuhause“, „Arbeit“)
- **Breitengrad / Längengrad:** Koordinaten des Ortes (z. B. von Google Maps kopieren)
- **Radius:** Bereich in Metern, in dem eine Person als "anwesend" gilt.
- **Kreis:** (optional) Zuordnung zu einem Life360-Kreis

**Hinweis:** Ihre eigenen Standorte sind nur lokal in ioBroker sichtbar und werden nicht an Life360 gesendet.

> **Life360 Places nicht verfügbar?** Life360 hat den Zugriff auf Cloud-Orte über die API für einige Konten eingeschränkt – insbesondere für EU-Konten im kostenlosen Tarif. Wenn das Adapterprotokoll Folgendes anzeigt:`All place sources returned 0 places` Life360 stellt Ihre Orte nicht mehr über eine API zur Verfügung. **Alternative:** Definieren Sie Ihre wichtigen Orte als **„Meine Orte“** in diesem Tab. Diese funktionieren unabhängig von Life360 und bieten dieselbe Anwesenheitserkennung.