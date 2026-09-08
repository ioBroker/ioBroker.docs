---
title:       "Link-Box"
lastChanged: "08.09.2026"
---

# Link-Box

Die Link-Box ist eine VPN-Lösung, mit der sich Anlagen erreichen lassen, ohne
in deren Netz einen Port zu öffnen. Sie ist für den Fall gedacht, dass jemand
mehrere Installationen an verschiedenen Orten betreut.

## Aufbau

Die Lösung besteht aus drei Teilen:

| Teil | Wo er läuft |
| --- | --- |
| **Cloud-Server** | Beim Dienst. Vermittelt zwischen beiden Seiten. |
| **link-box** | Auf dem Rechner desjenigen, der zugreift, unter Windows oder Linux. |
| **Adapter** | In der Anlage, auf die zugegriffen wird. |

Beide Seiten bauen die Verbindung **von innen nach außen** zum Server auf.
Dadurch muss weder im Netz des Kunden noch im eigenen Netz etwas freigegeben
werden. In der Konfiguration des Adapters wird festgelegt, welche Verbindungen
durchgereicht werden; alles andere bleibt zu.

Der Zugang setzt ein Konto bei [ioBroker.pro](https://iobroker.pro) voraus.

## Abgrenzung

| | Link-Box | [iot-Adapter](/docs/cloud/iot.md) |
| --- | --- | --- |
| Gedacht für | Betreuung mehrerer Anlagen | Zugriff auf die eigene Anlage |
| Reicht durch | Beliebige Verbindungen | Oberflächen und Sprachassistenten |
| Zielgruppe | Integratoren | Anwender |

?> Für den Zugriff auf die eigene Installation von unterwegs ist der iot-Adapter
der einfachere Weg. Die Link-Box lohnt sich, wenn regelmäßig auf fremde Netze
zugegriffen wird und dabei mehr gebraucht wird als eine Weboberfläche.

## Bezug und Einrichtung

Die Software und die Anleitung dazu liegen im Repository
[ioBroker.link-box](https://github.com/ioBroker/ioBroker.link-box).

!> Diese Seite beschreibt den Aufbau, nicht die Einrichtung im Einzelnen. Vor
dem Einsatz bei einem Kunden sollte der aktuelle Stand des Projekts und die
Bedingungen des Dienstes geprüft werden.
