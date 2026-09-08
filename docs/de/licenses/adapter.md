---
title:       "Adapterlizenzen"
lastChanged: "08.09.2026"
---

# Adapterlizenzen

Von den über 800 Adaptern brauchen derzeit **drei** eine Lizenz, um überhaupt zu
laufen:

| Adapter | Wofür |
| --- | --- |
| **vis-2** | Die Visualisierung |
| **KNX** | Die Anbindung von KNX-Anlagen |
| **JägerDesign Widgets** | Ein Widgetsatz für die Visualisierung |

Alle anderen Adapter sind kostenfrei. Eine Adapterlizenz gilt für den Adapter
auf dem eigenen Server; mit der Cloud hat sie nichts zu tun.

## Gebunden an die Seriennummer

Eine Adapterlizenz ist an die **UUID** der Installation gebunden, also an die
Kennung, die ioBroker bei der Einrichtung einmal erzeugt. Sie steht in den
[Systemeinstellungen](/docs/admin/settings.md) und lässt sich auch auf der
Kommandozeile abfragen:

```bash
iobroker uuid
```

!> Die UUID ändert sich, wenn ioBroker neu aufgesetzt wird, statt eine
[Sicherung](/docs/config/backup.md) zurückzuspielen. Ein Restore behält sie,
eine Neuinstallation von Hand nicht. Das ist einer der Gründe, warum sich eine
funktionierende Sicherung lohnt.

Beim Wechsel auf andere Hardware lässt sich eine Lizenz übertragen. Wie oft und
wie das abläuft, steht in der [Lizenzübersicht](/productoverview).

## vis-2: privat und gewerblich

Für **vis-2** stellt die ioBroker GmbH eine kostenfreie Lizenz für die private
Nutzung zur Verfügung. Eine kostenpflichtige Lizenz ist erforderlich, wenn
vis-2 im Rahmen einer gewerblichen oder unternehmerischen Tätigkeit genutzt
wird, zum Beispiel:

* der Einsatz in Kundenprojekten,
* die Nutzung im Rahmen von Dienstleistungen oder bezahlten Systemen,
* der Betrieb durch Unternehmen, Behörden oder andere Institutionen.

?> Für Systemintegratoren ist das der entscheidende Punkt. Was sonst noch zu
bedenken ist, steht unter
[System-Integratoren](/docs/integrators/README.md).

## Die Offline-Lizenz

Die kostenfreie vis-2-Lizenz wird in der Cloud geprüft und braucht dafür eine
Internetverbindung. Die **Offline-Lizenz** verzichtet darauf. Sie lohnt sich in
zwei Fällen:

* Die Internetverbindung ist instabil oder eingeschränkt. Die Steuerung bleibt
  dann lokal jederzeit erreichbar.
* Es soll grundsätzlich nichts nach außen gehen. Visualisierungen und Daten
  bleiben vollständig auf dem eigenen System.

## Den Lizenzschlüssel eintragen

Lizenzschlüssel werden zentral hinterlegt, nicht je Adapter: im Admin unter
**System**, Reiter **Lizenzen**. Der betreffende Adapter findet ihn von dort aus
selbst. Der Reiter ist unter
[Systemeinstellungen](/docs/admin/settings.md) beschrieben.

Im Reiter [Adapter](/docs/admin/adapter.md) zeigt die Listenansicht zu jedem
Adapter auch dessen Lizenz an. Dort sehen Sie also vor der Installation, worauf
Sie sich einlassen.

## Bestellen

Adapterlizenzen laufen über **ioBroker.net**, nicht über ioBroker.pro. Der
Überblick mit allen Paketen steht unter [Lizenzen](/productoverview), bestellt
wird auf der [Preisseite](https://iobroker.net/www/pricing).
