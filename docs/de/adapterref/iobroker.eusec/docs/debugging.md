---
chapters: {"pages":{"en/adapterref/iobroker.eusec/README.md":{"title":{"en":"ioBroker.euSec"},"content":"en/adapterref/iobroker.eusec/README.md"},"en/adapterref/iobroker.eusec/docs/devices.md":{"title":{"en":"Supported devices"},"content":"en/adapterref/iobroker.eusec/docs/devices.md"},"en/adapterref/iobroker.eusec/docs/debugging.md":{"title":{"en":"Debugging"},"content":"en/adapterref/iobroker.eusec/docs/debugging.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.eusec/docs/debugging.md
title: Debugging
hash: MYdPVmvdIHqJ65gJhwKkLaAeZjW/2bMHfJcjuOZBQnE=
---
# Debugging

## Debugging aktivieren

Um den Adapter in den Debug-Modus zu versetzen, gehen Sie wie folgt vor.

1. Wählen `Instances` Klicken Sie im linken Menü auf das Kopfsymbol oben, um den Expertenmodus zu aktivieren.

![Protokolle mit Captcha](../../../../en/adapterref/iobroker.eusec/docs/_media/en/debug01.png)

2. Bestätigen Sie das folgende Fenster mit `OK` Die

![Protokolle mit Captcha](../../../../en/adapterref/iobroker.eusec/docs/_media/en/debug02.png)

3. Klicken Sie nun in der Zeile des Adapters „eufy-security.0“ ganz rechts auf den nach unten zeigenden Pfeil.

![Protokolle mit Captcha](../../../../en/adapterref/iobroker.eusec/docs/_media/en/debug03.png)

4. Klicken Sie nun auf die Schaltfläche mit dem Stift (Bearbeiten) ganz rechts in der ersten Zeile, auf der Ebene der Adapterversion.

![Protokolle mit Captcha](../../../../en/adapterref/iobroker.eusec/docs/_media/en/debug04.png)

5. Wählen Sie nun aus `debug` und bestätigen Sie mit `OK` Die

![Protokolle mit Captcha](_media/en/debug05.png)![Protokolle mit Captcha](_media/en/debug06.png)![Protokolle mit Captcha](../../../../en/adapterref/iobroker.eusec/docs/_media/en/debug07.png)

6. Der Debug-Modus ist konfiguriert.

![Protokolle mit Captcha](../../../../en/adapterref/iobroker.eusec/docs/_media/en/debug08.png)

In meinem Beispiel war der Adapter bereits gestoppt, daher müssen Sie ihn starten, damit er die neue Protokollierungsstufe akzeptiert. Wenn der Adapter bereits aktiv war und Sie ihn nicht ausgewählt haben…`Without restart` Der Adapter wird automatisch neu gestartet.

## Debugging deaktivieren

Um den Debug-Modus des Adapters zu deaktivieren, folgen Sie den Anweisungen in den vorherigen Kapiteln und stellen Sie die entsprechenden Einstellungen ein. `Log Level` Zu `info` Die