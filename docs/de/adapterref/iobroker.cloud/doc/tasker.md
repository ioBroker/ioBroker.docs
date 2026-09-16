---
chapters: {"pages":{"en/adapterref/iobroker.cloud/README.md":{"title":{"en":"ioBroker cloud adapter"},"content":"en/adapterref/iobroker.cloud/README.md"},"en/adapterref/iobroker.cloud/doc/ifttt.md":{"title":{"en":"How to use IFTTT with ioBroker"},"content":"en/adapterref/iobroker.cloud/doc/ifttt.md"},"en/adapterref/iobroker.cloud/doc/tasker.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.cloud/doc/tasker.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.cloud/doc/tasker.md
title: kein Titel
hash: FWxIuY41WZGIMo9yUNMICoq3G1tGcwgiI1UeD6kHp9Y=
---
## Verwendung von Tasker zum Senden von Koordinaten an ioBroker

### Installieren Sie Tasker

Installieren Sie Tasker auf Ihrem Android-Smartphone von hier: <https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm>

### Tasker konfigurieren

#### Aufgabe erstellen

![Schritt 1](../../../../en/adapterref/iobroker.cloud/doc/tasker1.png)

Füge eine Aufgabe hinzu und nenne sie "Geo".

![Schritt 2](../../../../en/adapterref/iobroker.cloud/doc/tasker2.png)

![Schritt 3](../../../../en/adapterref/iobroker.cloud/doc/tasker3.png)

![Schritt 4](../../../../en/adapterref/iobroker.cloud/doc/tasker4.png)

![Schritt 5](../../../../en/adapterref/iobroker.cloud/doc/tasker5.png)

Die Standardeinstellungen sind in Ordnung. Lassen Sie sie unverändert.

![Schritt 6](../../../../en/adapterref/iobroker.cloud/doc/tasker6.png)

![Schritt 7](../../../../en/adapterref/iobroker.cloud/doc/tasker7.png)

![Schritt 8](../../../../en/adapterref/iobroker.cloud/doc/tasker8.png)

![Schritt 9](../../../../en/adapterref/iobroker.cloud/doc/tasker9.png)

Schreiben Sie in **Server:Port**`https://iobroker.pro` oder`https://iobroker.net`

In **Pfad** schreiben`/service/custom_position/<app-key>/%LOC` Den Link finden Sie in den Einstellungen der Cloud-Instanz.

![Schritt 10](../../../../en/adapterref/iobroker.cloud/doc/tasker10.png)

Vergessen Sie nicht, den Namen des gewünschten Dienstes in die Whitelist einzutragen (in unserem Fall „position“), oder einfach „\*“, um alle Dienste zu akzeptieren.

![Schritt 11](../../../../en/adapterref/iobroker.cloud/doc/tasker11.png)

![Schritt 12](../../../../en/adapterref/iobroker.cloud/doc/tasker12.png)

Nachdem die Aufgabe erstellt wurde, testen Sie sie; die Position muss dann im Adminbereich erscheinen.

#### Profil erstellen

Aufgabe alle 10 Minuten ausführen.

![Schritt 13](../../../../en/adapterref/iobroker.cloud/doc/tasker13.png)

![Schritt 14](../../../../en/adapterref/iobroker.cloud/doc/tasker14.png)

![Schritt 15](../../../../en/adapterref/iobroker.cloud/doc/tasker15.png)

![Schritt 16](../../../../en/adapterref/iobroker.cloud/doc/tasker16.png)

![Schritt 17](../../../../en/adapterref/iobroker.cloud/doc/tasker17.png)

![Schritt 18](../../../../en/adapterref/iobroker.cloud/doc/tasker18.png)

Überprüfen Sie die Ausgabe.

![Schritt 19](../../../../en/adapterref/iobroker.cloud/doc/tasker19.png)

Sie können die Koordinaten im Karten-Widget verwenden. Vergessen Sie nur nicht, Längen- und Breitengrad zu vertauschen.