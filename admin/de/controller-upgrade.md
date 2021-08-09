# js-controller Upgrade Anleitung

Aufgrund der verschiedenen Hardware und Platformen unter denen ioBroker läuft, muss der js-controller manuell aktualisiert werden. Weitere Details können dem passenden Abschnitt entnommen werden.

## Generelle Informationen für alle Plattformen

### js-controller 2.x
Für ein Update von js-controller 1.x auf 2.x bitte in jedem Fall die Informationen unter https://forum.iobroker.net/topic/26759/js-controller-2-jetzt-f%C3%BCr-alle-im-stable lesen und beachten!
Ansonsten bitte bei einem Update von Master-Slave-Systemen die Slaves zuerst aktualisieren und den Master als letztes! 

### js-controller 3.x
Für ein Update von js-controller von der 2.0/2.1/2.2 auf 3.x bitte in jedem Fall die Informtionen im relevanten Forum-Thread, z.B. https://forum.iobroker.net/topic/42385/js-controller-3-2-jetzt-im-stable for 3.2 lesen und beachten! js-controller 3.x benötigt mindestens Node.js Version 10.x.

Bei einem Multi-Host-System, welches auf js-controller 2.2 oder einer 3.x läuft ist es beim Update auf eine höhere 3.x Version nötig, zuerst das Master-System zu aktualisieren. Der Master muss dann wieder gestartet werden. Die Slaves werden danach aktualisiert! 



## Linux/macOS (neuer Installer - "curl shell installation script")
Dies ist die empfohlene Variante zur Aktualisierung des js-controller, wenn ioBroker mittels "curl shell installation script" installiert wurde.

Bitte in einer SSH-Shell (Konsole) folgende Befehle ausführen:
* `iobroker stop`
* `iobroker update`
* `iobroker upgrade self`
* `iobroker start` oder Server rebooten, danach sollte ioBroker neu starten und man kann sicher sein das alle alten Prozesse beendet waren.

Falls beim Upgrade-Befehl Fehler wegen Zugriffsrechten/Permissions angezeigt werden, dann bitte den Installation-Fixer nutzen (`curl -sL https://iobroker.net/fix.sh | bash -`) um diese Probleme zu beheben und Upgrade-Befehl erneut ausführen.

## Linux/macOS (manuell installiert)

Eine manuelle Installation erfolgt meist unter root als User und daher ist vor den Befehlen ein "sudo" nötig.

Bitte in einer SSH-Shell (Konsole) folgende Befehle ausführen:
* `cd /opt/iobroker`
* `sudo iobroker stop`
* `sudo iobroker update`
* `sudo iobroker upgrade self`
* `sudo iobroker start` oder Server rebooten, danach sollte ioBroker neu starten und man kann sicher sein das alle alten Prozesse beendet waren.

Falls beim Upgrade-Befehl Fehler wegen Zugriffsrechten/Permissions angezeigt werden, müssen diese behoben werden. Teilweise reicht "sudo" nicht aus und man muss die Installation als echter Root (Vorher einfach `sudo su -` eingeben) ausführen.

## Windows

Für das Updaten von ioBroker auf Windows den entsprechenden Installer mit der gewünschten js-controller-Version von der Download-Seite https://www.iobroker.net/#de/download herunterladen und mit diesem das Update vornehmen. Mit dem Windows Installer können auch vorher manuell installierte Server oder Installationen von anderen Betriebssystemen nach Windows migriert und geupdated werden.

## Windows (manuell installiert)
Eine manuelle Installation erfolgt mit Administrator-Rechten. Bitte deshalb ein cmd.exe-Kommandozeilenfenster als Administrator starten (mit Rechtsklick auf cmd.exe und "Ausführen als Administrator") und dort folgende Befehle ausführen:
* `cd C:\iobroker` (oder wo ioBroker installiert wurde)
* `iobroker stop`, um den ioBroker Service zu stoppen
* `iobroker status`, um zu prüfen, ob ioBroker beendet ist
* `iobroker update`
* `iobroker upgrade self`
* ioBroker Service starten oder Rechner rebooten, danach sollte ioBroker neu starten und man kann sicher sein das alle alten Prozesse beendet waren.

## Notfall Linux/macOS/Windows (manuelle Reinstallation, wenn nach dem Update irgendwie nichts mehr tut)
Auf Windows zuerst bitte im Startmenü unter "ioBroker" die Kommandozeile der betreffenden ioBroker-Instanz aufrufen. Das richtige Verzeichnis ist dann automatisch eingestellt. Auf Linux bzw. macOS bitte ins ioBroker Verzeichnis wechseln.

Dort `npm install iobroker.js-controller` ausführen. Eine bestimmte Version kann mittels `npm install iobroker.js-controller@x.y.z` (x.y.z mit der gewollten Version ersetzen) installiert werden.

Falls es bei der Ausführung unter Linux zu Problemen mit Zugriffsrechten kommen muss der Befehl leicht abgeändert werden:
* Für Systeme die mit dem neuen Linux-Installer erstellt wurden: `sudo -u iobroker -H npm install iobroker.js-controller`
* Für Systeme die manuell unter Linux installiert wurden ggf `sudo` voranstellen oder als Root ausführen.

Dieser Weg ist nur in sehr wenigen Fällen nötig und vorher bitte das Forum konsultieren!
