---
title:       "Was ist ein Repository?"
lastChanged: "23.11.2022"
---

Ein Repository ist ein zentraler Aufbewahrungsort für Softwareprogramme.

Die Adapter, welche über die ioBroker Admin Oberfläche angezeigt und installiert/aktualisiert 
werden können, werden über einen zentralen Aufbewahrungsort (einem Repository) verwaltet. 
Defaultmäßig ist ioBroker nach einer Installation so konfiguriert, dass auf das "stable" 
Repository zugegriffen wird und die dort hinterlegten Adapter zur Installation angeboten werden. 

In ioBroker stehen zwei Repositories zur Verfügung:
- **stable**: In diesem Repository stehen die Adapter in der Version zur Verfügung, welche bereits getestet sind und somit auf einem Produktivsystem verwendet werden können 
- **beta**: In diesem Repository stehen die Adapterversionen zur Verfügung, welche sich aktuell in der Testphase (!) befinden und noch mehrere Fehler beinhalten können. Das beta Repository hieß früher latest, da der Zweck aus dem Namen nicht wirklich hervorging, wurde es von latest nach beta umbenannt. 

?> Grundsätzlich gilt, dass für eine produktive Installation von ioBroker ***IMMER*** das Stable Repository genutzt werden sollte. Im Beta Repository sind Versionen enthalten die noch Fehler enthalten und eventuell das ganze System beeinträchtigen können.

## Auswahl des Repository
In den Systemeinstellungen über den Schraubenschlüssel die Basiseinstellungen öffnen:

![](media/Repository_IconBasicSettings.png)



![](media/Repository_BasicsSettingsDefaultPath.png)

(1) Im Reiter Repositories kann das gewünschte Repository ausgewählt werden indem in der Spalte "Aktiv" die entsprechende Checkbox aktiviert wird.

(2) Über den Button werden die Pfade zu den Standard Repositorys stable und beta wieder auf die Standardpfade zurückgestellt. Achtung: Diese Button löscht auch die manuell hinzugefügten Repositories

(3) In der Spalte "Stable" wird die Checkbox automatisch aktiviert, wenn das Repository als ein "stable" Repository erkannt wurde nachdem es das erste Mal eingelesen wurde

Die Standardpfade der Repositories stable und beta lauten:
- stable - Link zum Repository http://download.iobroker.net/sources-dist.json
- beta - Link zum Repository http://download.iobroker.net/sources-dist-latest.json

Wurde das Beta Repository ausgewählt, so erfolgt in der Adapterübersicht eine entsprechende Warnung:

![](media/Repository_AdapterRepInfo.png)

## Was sollte ich tun, wenn ich mal einen Adapter aus dem Beta Repository brauche? 
Früher bedeutete dies im ioBroker das Repository von Stable auf Beta umzustellen, den einen 
Adapter zu installieren und dann wieder zurückzuwechseln. Letzteres ist dann meistens auf der Strecke geblieben. 

Seit Admin 5 geht dies aber viel komfortabler, OHNE das Repository umzustellen zu müssen! 

- Aktiviere den Expertenmodus 
- Im Menü "Adapter" auf den Button "Installieren aus eigener URL" (GitHub) gehen und auf den ersten Tab "Von NPM" wechseln
- Im Feld "Adapter auswählen" kann jetzt der gewünschte Adapter eingetragen / ausgewählt werden, welcher installiert werden soll 

Auf diese Weise kann man die neueste Beta-Version installieren, ohne sein Repository wechseln zu müssen.

![](media/Repository_AdapterInstallNpm.png)


## Wie kommt ein Adapter in das Beta oder Stable Repository? 
Lange bevor ein Adapter zur Installation in ioBroker über die Adminoberfläche bereit steht stellt 
ein Entwickler einen Antrag auf Aufnahme ins Repository. Wenn das passiert ist, schauen sich 
erfahrene Entwickler den neuen Adapterquellcode an und geben dem anfragenden Entwickler ein Feedback 
mit den Punkten welche abgearbeitet werden müssen, bevor der neue Adapter ins Repository aufgenommen werden kann. 

Ein neuer Adapter steht zuerst im Beta Repository zur Verfügung und kann dann von den (Beta) Testern 
ausgiebig getestet werden. Wenn die Testphase abgeschlossen ist und die gemeldeten Fehler gefixt worden 
sind, wird die Version des Adapters im stable Repository zur Verfügung gestellt.

Nach einer Funktionsänderung des Adapters wird dieser im Normalfall auch erst wieder im Beta Repository 
zum Test zur Verfügung gestellt bis die Version nach Abschluss der Testphase für das stable Repository 
freigegeben wird.
