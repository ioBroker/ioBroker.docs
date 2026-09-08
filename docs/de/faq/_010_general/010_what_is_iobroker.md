## Was ist ioBroker?

ioBroker ist eine Software, die verschiedene Systeme im Haus zu einem Ganzen
verbindet: Heizung, Licht, Rollläden, Wetterdienste, Kalender, Sprachassistenten.
Was der eine Hersteller liefert, kann damit den Geräten eines anderen etwas
sagen.

Technisch ist ioBroker eine reine Softwarelösung. Sie ersetzt **keine** Zentrale:
Für HomeMatic braucht es weiterhin eine CCU, für Zigbee einen Stick. ioBroker
spricht mit diesen Zentralen und legt alles, was sie liefern, in einer
gemeinsamen Datenbank ab.

Der Aufbau ist modular. Jede Anbindung ist ein eigenes Programm, ein
**Adapter**: über 800 gibt es davon. Installiert wird nur, was gebraucht wird.

Ausführlich steht das unter
[ioBroker Grundlagen](https://www.iobroker.net/#de/documentation/basics/README.md).

?> ioBroker ist quelloffen und kostenlos. Es läuft auf der eigenen Hardware im
eigenen Netz, ohne Cloud, wenn man das nicht möchte.
