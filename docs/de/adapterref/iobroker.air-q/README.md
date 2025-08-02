---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.air-q/README.md
title: ioBroker.air-q
hash: mzD/gjdYCbOB5POtFxieQaf/0hWj1xkhBVHe0CoSR1c=
---
# IoBroker.air-q

![NPM-Version](https://img.shields.io/npm/v/iobroker.air-q.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.air-q.svg)
![Anzahl der Installationen](https://iobroker.live/badges/air-q-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/air-q-stable.svg)
![NPM](https://nodei.co/npm/iobroker.air-q.png?downloads=true)

<img src="admin/air-q.png" alt="Airq-Logo" width="200"/>

**Tests:** ![Test und Freigabe](https://github.com/CorantGmbH/ioBroker.air-q/workflows/Test%20and%20Release/badge.svg)

## Inhalt
- [Über über)
- [Erste Schritte](#start)
- [Änderungsprotokoll](#change)
- [Lizenz](#license)

## Um<a id="about"/>
Dieser ioBroker-Adapter wird in Verbindung mit unseren [air-Q-Gerät](https://www.air-q.com) verwendet. Es fragt die Werte unserer Sensoren ab und zeigt sie für Sie in der ioBroker-Umgebung an.
</br> </br>

![air-Q_frontal + Seitlich_full](https://github.com/CorantGmbH/ioBroker.air-q/assets/107550719/5c38d737-9641-463f-bd07-ac62ce5f1973)

## Erste Schritte<a id="start" />
Sie sollten den Adapter über die Admin-Oberfläche finden können.

Ansonsten können Sie gerne die ioBroker-Befehlszeilenschnittstelle über die Konsole verwenden. Gehen Sie einfach direkt zu Ihrem ioBroker-Stammordner und fügen Sie den Adapter über hinzu

```
iobroker add air-q
```

Dadurch wird der Adapter installiert (falls er noch nicht installiert ist) und eine Instanz gestartet.
Falls Sie nur den Adapter installieren möchten, ohne noch eine Instanz zu erstellen, verwenden Sie den folgenden Befehl:

```
iobroker install air-q
```

Weitere Informationen finden Sie in der ioBroker CLI-Dokumentation unter https://github.com/ioBroker/ioBroker/wiki/Console-commands.

Um Ihre Instanz zu konfigurieren, wählen Sie einfach aus, ob Sie sie über die IP oder die Kurz-ID Ihres Geräts verbinden möchten.

![Screenshot 13.02.2024 103001](https://github.com/CorantGmbH/ioBroker.air-q/assets/107550719/ec878783-af56-490d-af66-43c53c27df20)

Bitte stellen Sie sicher, dass Sie die richtige IP/ID und das richtige Passwort eingeben.
Anschließend können Sie auch auswählen, wie die Daten abgerufen werden sollen. Sie können negative Werte ausschneiden, wenn Sie sie nicht benötigen, mit Ausnahme der Temperatur natürlich. Sie können festlegen, wie oft die Daten abgefragt werden sollen, indem Sie die Zahl in Sekunden eingeben. Und schließlich können Sie zwischen Echtzeitdaten und Durchschnittsdaten wählen.

![Screenshot 13.02.2024 104813](https://github.com/CorantGmbH/ioBroker.air-q/assets/107550719/429c57ab-933f-4930-a02b-30da7b5df180)

Jetzt sollten Sie alles eingerichtet und loslegen können!

Die Daten werden entsprechend Ihrer Konfiguration abgerufen und im Objekte-Tab angezeigt, wenn das Gerät gefunden wird. Abhängig von Ihrem Gerät werden natürlich möglicherweise mehr Sensoren angezeigt.

![Screenshot 13.02.2024 110655](https://github.com/CorantGmbH/ioBroker.air-q/assets/107550719/5639fdcb-3acf-4223-b1fa-fb69016c9d7b)

***Im Moment haben wir alle Sensoren für den air-Q Pro im Lieferumfang enthalten. Optionale Sensoren werden in einem zukünftigen Patch enthalten sein.***

## Changelog

### 1.0.1

* Added sensor list update when connecting to a different air-Q in the same instance
* Fixed name display and update of device

### 1.0.0

* Include typescript files by @pr0crstntr in #6
* Created air-Q class by @pr0crstntr in #4
* Fix restart bug by @pr0crstntr in #7
* Update data poll by @pr0crstntr in #8
* Updated io-package by @pr0crstntr in #9
* Fixed save option for configuration by @pr0crstntr in #16
* Added clear intervals on unload by @pr0crstntr in #26
* Update README by @pr0crstntr in #37
* Changed role for temperature and added unit by @pr0crstntr in #38

### 0.0.1

* (Katharina K.) initial release

## License

MIT License

Copyright (c) 2024 Corant GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.