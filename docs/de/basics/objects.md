---
lastChanged: "13.09.2018"
template:    true
---

# Wie wird die Information gespeichert?

In ioBroker gibt es zwei Arten von der Information:
- Objekte: Meta-Daten, die die Struktur und die Eigenschaften der Daten beschreiben, z.B. Name, Typ, Einheit, Min/Max-Werte.
- Zustände: Die eigentlichen Daten, z.B. 23.5°C, true, "Hallo Welt".

## Objekte
Es gibt verschiedene Typen von Objekten:
- `host`: Die Information über den Host (Rechner), auf dem der ioBroker läuft. Es können mehrere Hosts in einem System laufen.
- `user`: Die Information über einen Benutzer: Passwort, Bild, Name, Farbe. Es können mehrere Benutzer existieren.
- `group`: Die Information über eine Gruppe, die mehrere Benutzer beinhaltet.
- `script`: Die Information über ein Skript: Quellcode, Name, Beschreibung.
- `design`: Beinhaltet die Anleitung, wie der Kontroller die Objekte vpm bestimmten Typ suchen soll.
- `adapter`: Ein Adapter ist ein Softwaremodul, das eine spezielle Aufgabe erfüllt, z.B. das Lesen von Daten von einem Gerät oder das Steuern eines Geräts.
- `instance`: Eine Instanz ist eine Kopie eines Adapters, die auf einem Host läuft. Eine Instanz hat einen Index.
- `device`: Ein Gerät ist eine Gruppe von Kanälen, die zu einem physischen Gerät gehören, z.B. einem Lichtschalter.
- `channel`: Ein Kanal ist eine Gruppe von Zuständen, die thematisch zusammengehören, z.B. alle Zustände eines Lichtschalters.
- `state`: Ein Datenpunkt ist ein Zustand, z.B. die Temperatur eines Raumes.
- `enum`: Eine Kategorie ist eine Gruppe von Objekten, die thematisch zusammengehören, z.B. alle Geräte in einem Raum.
- `meta`: Ein Meta-Objekt ist ein Objekt, das Informationen über andere Objekte enthält, z.B. die Beschreibung eines Geräts.
- `chart`: Ein Chart-Objekt ist ein Objekt, das die Konfiguration für ein Diagramm enthält.
- `folder`: Ein Ordner ist ein Objekt, das andere Objekte enthält, z.B. alle Geräte in einem Raum.
- `schedule`: Ein Zeitplan ist ein Objekt, das die Konfiguration für einen Zeitplan enthält.
- `config`: Ein Konfigurationsobjekt ist ein Objekt, das die Konfiguration über ioBroker enthält: Sprache, aktive Repositorien, usw. 
