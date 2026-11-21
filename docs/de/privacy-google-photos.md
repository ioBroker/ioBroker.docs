---
title: "Datenschutzerklärung: Google Fotos im Adapter screensaver"
lastChanged: "21.11.2026"
---
# Datenschutzerklärung: Google Fotos im Adapter screensaver

Diese Seite ergänzt unsere [Datenschutzerklärung](/policy) um eine Funktion: Google Fotos im ioBroker-Adapter
„screensaver“. Sie erklärt, auf welche Google-Nutzerdaten der Adapter über die Google Photos Ambient API zugreift und
was mit ihnen geschieht.

Verantwortlich: ioBroker GmbH, siehe [Impressum](/imprint). Bei Fragen zu Ihren Daten erreichen Sie uns unter der
dort angegebenen Adresse.

## Was der Adapter tut

Der Adapter „screensaver“ macht Bildschirme, die mit ioBroker verbunden sind, zum Bilderrahmen und Bildschirmschoner.
ioBroker ist Software, die Sie auf eigener Hardware betreiben („Ihr ioBroker-Server“). Wenn Sie Google Fotos
verbinden, wird Ihr ioBroker-Server ein Gerät in Google Fotos („Ambient-Gerät“), und Sie wählen in der
Google-Fotos-App, welche Alben, Personen oder Haustiere es zeigt. Auf der Zustimmungsseite von Google heißt die App
„ioBroker“.

## Welche Daten

Nur mit Ihrer Zustimmung auf der Zustimmungsseite von Google:

- Ihr Basisprofil (Scope `profile`): Name und Profilbild Ihres Google-Kontos;
- die Fotos, die Sie in der Google-Fotos-App für das Gerät wählen (Scope `photosambient.mediaitems`), mit Kennung,
  Aufnahmezeitpunkt, Typ und Größe in Pixeln.

Den Rest Ihrer Google-Fotos-Mediathek sieht der Adapter nicht. Er lädt nichts hoch und ändert oder löscht nichts in
Google Fotos. Zum Anmelden des Geräts schickt er Google den Gerätenamen, den Sie in den Einstellungen des Adapters
eingeben.

## Wozu

Die Daten dienen nur dazu,

- in den Einstellungen des Adapters anzuzeigen, welches Google-Konto verbunden ist (Name und Profilbild), und
- die gewählten Fotos als Diashow und Bildschirmschoner auf Ihren eigenen Bildschirmen zu zeigen.

Sie werden nicht für Werbung genutzt, nicht verkauft, nicht für Profile verwendet und nicht zum Entwickeln,
Verbessern oder Trainieren von KI- oder Machine-Learning-Modellen. Niemand bei der ioBroker GmbH liest sie.

## Speicherung und Dauer

Google-Nutzerdaten liegen nur auf Ihrem eigenen ioBroker-Server:

| Daten | Wo auf Ihrem ioBroker-Server | Wie lange |
|-------|------------------------------|-----------|
| Refresh-Token | Objekt der Instanz, verschlüsselt | bis Sie trennen |
| Kontoname, Link des Profilbilds, Geräte-ID | Objekt der Instanz | bis Sie trennen |
| Liste der gewählten Fotos (Kennung, Aufnahmezeit, Breite und Höhe) | Datenordner der Instanz | höchstens alle 3 Stunden erneuert, bis Sie trennen |
| Verkleinerte Kopien der Fotos | Dateiablage der Instanz | höchstens 60 Minuten |
| Zugriffstoken, Download-Links der Fotos | nur im Speicher des Adapters | höchstens 60 Minuten |

Das Log Ihres ioBroker-Servers kann die Namen der gewählten Alben enthalten, etwa wenn sich die Auswahl ändert oder
ein Albumname in den Einstellungen nicht passt. Es bleibt auf Ihrem Server und wird von dessen Log-Rotation gelöscht.

Fotos und Profildaten gehen direkt von Google per HTTPS zu Ihrem ioBroker-Server. Kein Server der ioBroker GmbH
erhält sie.

## Anmeldedienst

Das OAuth-Client-Secret von ioBroker darf nicht in Software stehen, die auf Ihrem Server läuft. Darum läuft die
Anmeldung über den Dienst `oauth2.iobroker.in` der ioBroker GmbH, betrieben bei Amazon Web Services (Region
eu-west-1, Irland). Er holt den Anmeldecode bei Google, tauscht ihn gegen Tokens, erneuert Zugriffstokens und reicht
die Tokens an Ihren ioBroker-Server weiter. Er speichert keine Tokens, Codes, Profildaten oder Fotos. Sein
technisches Log hält Fehler ohne Tokens oder Codes fest und wird nach 3 Tagen gelöscht.

## Weitergabe

Google-Nutzerdaten werden weder an die ioBroker GmbH noch an Dritte übermittelt. Die Fotos erscheinen auf den
Bildschirmen, die Sie einrichten; wer sie dort sehen oder die Oberfläche Ihres ioBroker öffnen kann, bestimmen Sie.

## Sicherheit

Alle Verbindungen zu Google und zum Anmeldedienst laufen über HTTPS. Der Refresh-Token ist mit dem Schlüssel Ihrer
ioBroker-Installation verschlüsselt. Das OAuth-Client-Secret liegt nur im Anmeldedienst.

## Zugriff widerrufen und Daten löschen

- „Trennen“ in den Einstellungen des Adapters entfernt das Gerät aus Google Fotos, widerruft Ihre Zustimmung bei
  Google und löscht Tokens, Kontodaten, die Liste der Fotos und die Kopien.
- Entfernen Sie das Gerät in der Google-Fotos-App oder den Zugriff von ioBroker in Ihrem
  [Google-Konto](https://myaccount.google.com/connections), bemerkt der Adapter das beim nächsten Kontakt mit Google
  und löscht dieselben Daten; nach dem Entfernen in der App widerruft er außerdem die Zustimmung.

## Eingeschränkte Nutzung (Limited Use)

Die Nutzung und Weitergabe von Informationen, die der ioBroker-Adapter „screensaver“ von Google-APIs erhält, an andere
Apps entspricht der [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy),
einschließlich der Anforderungen zur eingeschränkten Nutzung („Limited Use“).
