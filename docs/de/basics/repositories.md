# Was ist ein Repository?
Ein Repository ist ein zentraler Aufbewahrungsort für Softwareprogramme.

Die Adapter, welche über die ioBroker Admin Oberfläche angezeigt und installiert/aktualisiert werden können, werden über ein zentralen Aufbewahrungsort (einem Repository) verwaltet. Defaultmäßig ist ioBroker nach einer Installation so konfiguriert, dass auf das "stable" Repository zuegriffen wird und die dort hinterlegten Adapter zur Installation angeboten werden. 

Standardmäßig stehen in ioBroker zwei Repositories zur Verfügung:
- stable (Hier stehen die Adapter in der Version bereit welche getestet und auf einem Produktivsystem genutzt werden können) 
- beta (Hier sind Adapterversionen hinterlegt, welche sich in der Testphase befinden und noch mehrere Fehler haben können)

<br><br>
# Auswahl des Repository
In den Basiseinstellungen von ioBroker kann das gewünschte Repository wie folgt eingestellt werden.

Öffnen der Basiseinstellungen:

![](media/Repository_IconBasicSettings.png)


Auswahl des Standard Repository:

![](media/Repository_BasicSettings.png)



Wurde das Beta Repositroy ausgewählt, so erfolgt in der Adapterübersicht eine entsprechende Warnung

![](media/Repository_AdapterRepInfo.png)

<br><br>
# Standardpfad Repository
![](media/Repository_BasicsSettingsDefaultPath.png)

- stable Link: http://download.iobroker.net/sources-dist.json
- beta link: http://download.iobroker.net/sources-dist-latest.json

<br><br>
# Stable vs Beta Repository

Grundsätzlich gilt, dass für eine produktive Installation von ioBroker IMMER das Stable Repository genutzt werden sollte. Im Beta Repository sind Versionen enthalten die ggf. noch Bugs enthalten und eventuell das ganze System beeinträchtigen können. 

<br>

## Was sollte ich tun, wenn ich mal einen Adapter aus dem Beta Repository brauche? 
Früher bedeutete dies im ioBroker das Repository von Stable auf Beta umzustellen, den einen Adapter zu installieren und dann wieder zurückzuwechseln. Letzteres ist dann meistens auf der Strecke geblieben. 

Seit Admin 5 geht dies aber viel komfortabler, OHNE das Repository umzustellen zu müssen! 

- Aktiviere den Expertenmodus 
- Im Menü "Adapter" auf den Button "Custom Install" (GitHub) gehen und auf den ersten Tab "Von NPM" wechseln
- Im Feld "Adapter auswählen" kann jetzt der gewünschte Adapter eingetragen / ausgewählt werden, welcher installiert werden soll 

Auf diese Weise kann man die neueste Beta-Version installieren, ohne sein Repository wechseln zu müssen.

![](media/Repository_AdapterInstallNpm.png)


<br>

## Wie kommt ein Adapter in das Beta oder Stable Repository? 
Lange bevor ein Adapter zur Installtion in ioBroker bereit steht stellt ein Entwickler einen Antrag auf Aufnahme ins Repository. Wenn das passiert ist, schauen sich erfahrene Entwickler den neuen Adapterquellcode an und geben dem anfragenden Entwickler ein Feedback mit den Punkten welche abgearbeitet werden müssen, bevor der neue Adapter ins Repository aufgenommen werden kann. 

Ein neuer Adapter steht zuerst im Beta Repository zur Verfügung und kann dann von den (Beta) Testern ausgiebig getestet werden. 
Wenn die Testphase abgeschlossen ist und die gemeldeten Fehler gefixt worden sind, wird die Version des Adapters im stable Repository zur Verfügung gestellt.

Nach einer Funktionsänderung des Adapters wird dieser im Normalfall auch erst wieder im Beta Repository zum Test zur Verfügung gestellt bis die Version nach Abschluss der Testphase für das stable Repository freigegeben wird.


---
lastChanged: "25.01.2022"
---
