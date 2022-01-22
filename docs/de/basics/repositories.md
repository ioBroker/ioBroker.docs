# Was ist ein Repository?
Ein Repository ist ein zentraler Aufbewahrungsort für Softwareprogramme.

Die Adapter, welche über die ioBroker Admin Oberfläche angezeigt und installiert/aktualisiert werden können, werden über ein zentralen Aufbewahrungsort (einem Repository) verwaltet. Defaultmäßig ist ioBroker nach einer Installation so konfiguriert, dass auf das "stable" Repository zuegriffen wird und die dort hinterlegten Adapter zur Installation angeboten werden. 

Standardmäßig stehen in ioBroker zwei Repositories zur Verfügung:
- stable (Hier stehen die Adapter in der Version bereit welche getestet und auf einem Produktivsystem genutzt werden können) 
- beta (Hier sind Adapterversionen hinterlegt, welche sich in der Testphase befinden und noch mehrere Fehler haben können)


# Auswahl des Repository
In den Basiseinstellungen von ioBroker kann das gewünschte Repository wie folgt eingestellt werden:
![grafik](https://user-images.githubusercontent.com/25422320/150613721-2e8d2309-a4b4-4701-a3a2-4d282a729303.png)
![grafik](https://user-images.githubusercontent.com/25422320/150613853-56ffbcef-6ef4-4a37-856a-773f0962ea46.png)

Wurde das Beta Repositroy ausgewählt, so erfolgt in der Adapterübersicht eine entsprechende Warnung
![grafik](https://user-images.githubusercontent.com/25422320/150614064-e2e7891e-7b7d-46a1-9146-835de8315e9a.png)


# Standardpfad Repository
![grafik](https://user-images.githubusercontent.com/25422320/150617968-4160b669-c484-4207-bdd2-d56494fcfe57.png)

stable Link: http://download.iobroker.net/sources-dist.json
beta link: http://download.iobroker.net/sources-dist-latest.json


# Stable vs Beta Repository

Grundsätzlich gilt, dass für eine produktive Installation von ioBroker IMMER das Stable Repository genutzt werden sollte. Im Beta Repository sind Versionen enthalten die ggf. noch Bugs enthalten und eventuell das ganze System beeinträchtigen können. 

Was sollte ich tun, wenn ich mal einen Adapter aus "Beta/Latest" brauche? 
Früher bedeutete dies im ioBroker das Repository von Stable auf Beta umzustellen, den einen Adapter zu installieren und dann wieder zurückzuwechseln. Letzteres ist dann meistens auf der Strecke geblieben. Seit Admin 5 geht dies aber viel komfortabler, OHNE das Repository umzustellen! Einfach den Expertenmodus kurz aktivieren und unter "Adapter" und dem "Custom Install"(GitHub) Button den ersten Tab "Installation von NPM" nutzen um den Adapter zu aktualisieren. Damit bekommt man die neueste Beta-Version ohne sein Repository wechseln zu müssen.



Wie kommt ein Adapter in das Beta oder Stable Repository? 
Lange bevor ein Adapter zur Installtion in ioBroker bereit steht stellt ein Entwickler einen Antrag auf Aufnahme ins Repository. Wenn das passiert ist, schauen sich erfahrene Entwickler den neuen Adapterquellcode an und geben dem anfragenden Entwickler ein Feedback mit den Punkten welche abgearbeitet werden müssen, bevor der neue Adapter ins Repository aufgenommen werden kann. Ein neuer Adapter steht zuerst im Beta Repository zur Verfügung und kann dann von den (Beta) Testern ausgiebig getestet werden. 
Wenn die Testphase abgeschlossen ist und die gemeldeten Fehler gefixt worden sind, wird die Version des Adapters im stable Repository zur Verfügung gestellt.

Nach einer Funktionsänderung des Adapters wird diese im Normalfall auch erst wieder im Beta Repository zum Test zur Verfügung gestellt bis die Version nach Abschluss der Testphase für das stable Repository freigegeben wird.


---
lastChanged: "22.01.2022"
---
