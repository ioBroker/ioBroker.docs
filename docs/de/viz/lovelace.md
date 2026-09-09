---
title:       "Lovelace"
lastChanged: "09.09.2026"
---

# Lovelace

Der Adapter [lovelace](/adapters/lovelace) bringt die Oberfläche von
**Home Assistant** nach ioBroker. Sie ist von Haus aus für Telefon, Tablet und
Rechner geeignet, hat einen eingebauten Editor, in dem man sieht, was man baut,
und eine große Auswahl fertiger **Karten**.

Der Adapter ist eine der aktivsten Visualisierungen im Repository und wird
laufend gepflegt.

## Wie das zusammengeht

Home Assistant kennt keine Datenpunkte, sondern **Entitäten**. Eine Entität ist
meist ein ganzes Gerät und trägt eine Kennung der Form `domäne.name`, etwa
`light.wohnzimmer`. Die Domäne bestimmt, wie die Karte sich verhält: ein
`light` bekommt einen Helligkeitsregler, ein `cover` Pfeile zum Fahren.

In ioBroker besteht ein Gerät dagegen aus mehreren Datenpunkten. Der Adapter
baut daraus die Entitäten zusammen und stellt der Oberfläche eine
Home-Assistant-Umgebung vor, die es so gar nicht gibt.

?> Genau deshalb ist die Vorarbeit wichtiger als die Gestaltung. Wer seine
Geräte sauber angelegt hat, hat die halbe Oberfläche schon.

## Woher die Entitäten kommen

**Der empfohlene Weg ist die automatische Erkennung.** Der Adapter benutzt
dafür dieselbe Erkennung wie `iot` und der Devices-Adapter. Was dort als Gerät
erscheint, erscheint auch in Lovelace.

!> Erkannt wird nur, was **Raum und Funktion** zugeordnet hat. Fehlt eines von
beidem, ignoriert der Adapter das Gerät. Das ist die häufigste Ursache für eine
leere Oberfläche.

Der [Devices-Adapter](/docs/viz/devices.md) ist die Oberfläche zu dieser
Erkennung. Die Anleitung des Adapters empfiehlt ausdrücklich, ihn zu
installieren: Dort sieht man, welche Geräte erkannt werden, und kann für jeden
Datenpunkt eines Geräts ein vorhandenes Objekt auswählen. Rollen und Typen
werden dabei gleich richtig gesetzt, und damit greift die Erkennung.

**Der zweite Weg ist die Konfiguration am Objekt.** In den Einstellungen eines
Datenpunkts lässt sich Lovelace einschalten und eine Domäne samt Namen
festlegen. Für einfache Fälle wie `input_boolean` oder `input_number` genügt
das. Bei mehrteiligen Geräten wählt man die Datenpunkte je Aufgabe aus
Auswahlfeldern.

?> Bei mehrteiligen Geräten ist das Objekt, an dem die Einstellung hängt, nur
der **Anker**: Es gibt der Entität Kennung und Namen, sein eigener Wert wird
nicht gelesen. Die Werte kommen aus den Auswahlfeldern.

## Was dargestellt werden kann

Neben Schaltern und Messwerten kennt der Adapter unter anderem `light`,
`cover`, `climate`, `lock`, `media_player`, `vacuum`, `humidifier`,
`water_heater` sowie `device_tracker` und `person` für Anwesenheit und Standort
auf der Karte. Dazu kommen Sonderfälle wie Alarmanlage, Timer, Wetter und
Video.

Für Geräte, die es in ioBroker so nicht gibt, etwa eine Alarmanlage, zeigt die
Anleitung des Adapters ein kleines Skript, das den passenden Datenpunkt anlegt.

## Einrichten

1. Den Adapter `lovelace` im Reiter [Adapter](/docs/admin/adapter.md)
   installieren und eine Instanz anlegen.
2. Räume und Funktionen im Reiter [Kategorien](/docs/admin/enums.md) pflegen,
   falls noch nicht geschehen.
3. Die Oberfläche aufrufen. Lovelace bringt einen **eigenen Webserver** mit,
   üblicherweise `http://<adresse>:8091`.

Ein `web`-Adapter wird also nicht gebraucht. Anmeldung und Verschlüsselung
lassen sich in der Instanz einschalten.

## Von unterwegs

Drei Wege, in der Reihenfolge, in der die Anleitung des Adapters sie nennt:

* **VPN** ins eigene Netz.
* **Den Port nach außen öffnen**, mit der eingebauten Anmeldung und
  Verschlüsselung.
* **Über die ioBroker-Cloud.** Dabei baut der `cloud`-Adapter die Verbindung
  von innen nach außen auf, es steht also nichts offen. Das hilft besonders bei
  Anschlüssen ohne eigene öffentliche Adresse (Dual Stack Lite). Dafür wird in
  der Konfiguration des Cloud-Adapters die Lovelace-Instanz ausgewählt; danach
  erscheint sie auf [iobroker.pro](https://iobroker.pro) unter den Anwendungen.

!> Beim Weg über die Cloud gehören in der Lovelace-Instanz **Verschlüsselung
und Anmeldung aus**. Beides übernimmt das ioBroker-Konto.

Der Weg über die Cloud steht ausführlich unter
[Visualisierungen über die Cloud](/docs/cloud/viz.md).

## Gestalten

Der Editor ist in die Oberfläche eingebaut und wird über das Stiftsymbol oben
rechts geöffnet. Karten werden ausgewählt und mit der Maus angeordnet; für
Feinheiten gibt es einen YAML-Editor. Wer mehr will, findet in der
Home-Assistant-Welt viele **eigene Karten** und **Themes**, die sich in
ioBroker verwenden lassen.

Die vollständige Beschreibung mit allen Karten, Themes und Einstellungen steht
in der [Dokumentation des Adapters](/adapters/lovelace).

## Weiterführend

* [Überblick](/docs/viz/README.md): die anderen Wege zu einer Oberfläche
* [Devices-Adapter](/docs/viz/devices.md): die Geräte, aus denen Lovelace baut
* [Kategorien](/docs/admin/enums.md): Räume und Funktionen pflegen
