---
title: "Bilderrahmen und Bildschirmschoner"
lastChanged: "21.11.2026"
---
# Bilderrahmen und Bildschirmschoner

Der Adapter [screensaver](https://github.com/ioBroker/ioBroker.screensaver) macht Wandtablets und andere Bildschirme,
die mit ioBroker verbunden sind, zum digitalen Bilderrahmen: Ihre eigenen Fotos als Diashow, auf Wunsch mit Uhr und
Wetter.

## Was er kann

- **Bilderrahmen**: eine Diashow als Kachel, als ganze Seite oder frei auf einer View von [vis-2](/docs/viz/vis-2.md).
- **Bildschirmschoner**: nach einigen Minuten ohne Eingabe legen sich die Fotos über jede View von vis-2; eine
  Berührung holt die View zurück.
- **Web-Komponenten** für den [Devices-Adapter](/docs/viz/devices.md) und andere Oberflächen, mit denselben Einstellungen.
- Fotos nach Datum (etwa „an diesem Tag“ oder die letzten Tage), Bildunterschriften mit Datum und Ort, weiche
  Übergänge.

## Woher die Fotos kommen

- aus einem Ordner der Dateiablage von ioBroker oder einem Ordner auf dem ioBroker-Server;
- aus [Immich](https://immich.app), einem eigenen Server oder einem, den der Adapter in Docker startet;
- aus **Google Fotos** (siehe unten);
- aus einer Liste von Adressen oder einem Datenpunkt, der sie enthält.

Der Adapter führt die Alben auf Ihrem ioBroker-Server, sortiert sie nach Datum und verkleinert die Fotos auf die Größe
des Bildschirms, damit ein Tablet nicht die Originale laden muss.

## Google Fotos

Mit Google Fotos wird Ihr ioBroker ein Gerät in Google Fotos, wie ein digitaler Bilderrahmen. In der Google-Fotos-App
wählen Sie, was er zeigt: Alben, Personen oder Haustiere. Neue Fotos davon erscheinen von selbst.

1. In den Einstellungen der Instanz, Reiter **Google Fotos**, auf **Mit Google Fotos verbinden** klicken. Ein Code und
   ein QR-Code erscheinen; der Text darüber sagt, was ioBroker sehen darf.
2. Auf einem Handy oder Rechner `google.com/device` öffnen (oder den QR-Code scannen), den Code eingeben, anmelden und
   zustimmen.
3. In der Google-Fotos-App wählen, was das Gerät zeigt. Der Reiter zeigt das verbundene Konto mit Name und
   Profilbild.
4. Ein Album mit der Quelle *Google Fotos* anlegen und es im Bilderrahmen oder Bildschirmschoner zeigen.

Was ioBroker sieht: Name und Profilbild des Kontos und nur die Fotos, die Sie für das Gerät wählen. Den Rest Ihrer
Mediathek sieht es nicht, und es ändert nichts in Google Fotos. Alles bleibt auf Ihrem eigenen ioBroker-Server; Kopien
der Fotos bleiben höchstens 60 Minuten. **Trennen** entfernt das Gerät aus Google Fotos, widerruft die Zustimmung und
löscht die Daten.

Mehr dazu: [Datenschutzerklärung: Google Fotos](/policy/google-photos).

## Installation

Den Adapter **screensaver** im Reiter **Adapter** von Admin installieren und eine Instanz anlegen. Solange er noch
nicht im Repository von ioBroker ist, lässt er sich von GitHub installieren (`ioBroker/ioBroker.screensaver`).

Er braucht vis-2 2.20.1 oder neuer; ab vis-2 2.20.2 legt sich der Bildschirmschoner über jede View.

Alle Einstellungen beschreibt die
[Dokumentation des Adapters](https://github.com/ioBroker/ioBroker.screensaver/blob/main/docs/de/README.md).
