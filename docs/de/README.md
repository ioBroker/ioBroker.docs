---
title:       "Willkommen"
lastChanged: "31.01.2022"
---
# Wilkommen

## Hinweis zur aktuellen Dokumentation

?> Die Dokumentation befindet sich im Aufbau und wird stetig erweitert.
   Daher kann es vorkommen, dass Links noch nicht funktionieren oder
   Inhalte fehlen. Wir sind für jede Hilfe bei der Erstellung neuer
   Artikel oder für Verbesserungen dankbar. Informationen dazu gibt
   es hier [im Forum][].
   <br><br>
   **Bis alle Inhalte übernommen wurden, ist die alte Dokumentation noch [hier zu finden](https://www.iobroker.net/docu/).
   Sie wird sukzessive durch die neue Dokumentation ersetzt.**

<br><br><br>

# ioBroker - Automate your life

ioBroker ist eine Softwarelösung zur Automatisierung Deines Heims. Es erlaubt verschiedenste Smarthome-Systeme, die ohne
ioBroker Insellösungen bleiben würden, anzubinden und so übergreifend zu steuern.

ioBroker ist daher **die** Integrationsplattform für das Internet der Dinge und ermöglicht die Einbindung von kommerziellen Produkten aus fast allen Lebensbereiche oder die Integration einer selbst erstellten Lösung.

Das ioBroker-System ist modular aufgebaut und kann durch die Installation von einzelnen [Adaptern][] um die individuellen Wünsche erweitert werden. 

Über 450 Adaptern realisieren die Einbindung von verschiedenen Plattformen, Systemen und Geräten von A wie Alexa bis Z wie Zigbee und viele weitere Möglichkeiten zur Automatisierung.

<br>

## ioBroker verbindet unterschiedlichen Smarthomesysteme

![](media/iobroker-simple-overview.png)  

Diese Grafik zeigt wie ioBroker als zentrales System die verschiedensten Smarthomesysteme und weitere Dienste (z.B. Kalender) koordiniert und miteinander verbindet.
Die in ioBroker zur Verfügung stehenden Adapter können unter anderem mit zentral verwalteten Kalendern oder herstellerspezfischen Smart-Home-Systemen (welche im LAN oder WLAN angeschlossen sind) kommunizieren. Auf diese Weise kann die ioBroker Software Statusinformationen lesen oder Steuer-Aktionen auslösen.

<br>

### Anwendungsbeispiel Anwesenheitssimulation
<br>

In diesem Anwendungsbeispiel wird exemplarisch aufgezeigt, wie die beiden voneinander unabhängigen Smarthomesysteme Philipps Hue und Homematic IP mittels ioBroker zusammengeführt werden, um eine Anwesenheitssimulation zu realisieren.

Durch die Anbindung der beiden Smarthomesysteme an die ioBroker Software, ist ioBroker in der Lage die Zustände der Hue Lampen (ein/aus) sowie die Rolläden (hoch/runter) zu verändern. Die Erkennung der Urlaubszeit erfolgt durch die Anbindung des Kalenders in ioBroker.

Durch Nutzung der Logikbausteine (Adapter Logikprogrammierung) in ioBroker kann der Anwender nun mit wenigen Schritten den folgende Ablauf realisieren:

- Wenn im Kalender der Eintrag "Urlaub" eingetragen ist, werden um 18 Uhr Abends alle HUE Lampen eingeschaltet.
- Um 22:00 Uhr werden alle Rolläden geschlossen und alle Hue Lampen ausgeschaltet.
- Um 08:00 Uhr morgens werden alle Rolläden wieder hochgefahren.

Über die verfügbaren Visualisierungs-Adapter kann sich der Anwender individuelle Status und Steuerungsseiten für seine Hue Lampen und Rolläden bauen, auf die mit den mobilen Endgeräten von zu Hause oder aus dem Urlaub (z.B. mittels ioBroker Cloud Services oder VPN) zugegriffen werden kann.

<br>

<br>


# Stärken von ioBroker

## Plattformunabhängig
ioBroker kann auf fast allen Hardwareplattformen wo ein Linux, OSX, Windows, Docker läuft (Einplatinencomputer wie ein Raspberry Pi, Server, NAS, Server mit Virtualisierungsumgebungen wie z.B. Proxmox, Desktopcomputer, ...) installiert werden. 

Eine einfache Installationsroutine aus einer einzigen Zeile (one-line installer) ermögicht unter Linux eine anwenderfreundliche Installation und somit einen schnellen Einstieg in ioBroker.

<br>

## Skalierbar
Sollen im Laufe der Zeit weitere Smarthome-Systeme angebunden werden, können
diese vom Anwender jederzeit über zusätzliche Adapter bei laufendem Betrieb
implementiert werden.
Auch ioBroker selbst ist skalierbar: Mehrere ioBroker-Server können zu einem
Mutihost-System verbunden werden. Dabei ist sogar die Mischung von
Betriebssystemplattformen und die Kopplung von Einplatinencomputern mit
großen Multicore-Servern möglich.

<br>

## Individuelle Programmierung von Abläufen
Mit den Logik Adaptern bietet ioBroker die Möglichkeit individuelle Abläufe und Skripte zu erstellen. 
In einem Skript kann z.B. ein Wert von einem Adapter überwacht werden (Urlaub ist im Kalender am heutigen Tag eingetragen) und eine Aktion ausgelöst werden (Schalte um 18 Uhr alle Hue Lichter ein).

In ioBroker können diese individuellen Abläufe durch Drag and Drop von Bausteinen (grafische Programmierung) in "Rules" oder "Blockly" realisiert werden oder in klassischer Form mit "Javascript" oder "Typescript" in Form von geschriebenem Quellcode. 

Weitere Erklärungen zu den Logikbausteinen und auch weiteren wie Node-Red oder Szenen-Adapter werden in der Doku im Abschnitt "Logik und Automatisierung" erläutert.

<br>

## Visualisierung
Mehrere Visualisierungsadapter bietem dem Anwender die Möglichkeit Steuerungsoptionen sowie Zustandsinformationen grafisch zu realisieren. Diese individuellen Visualisierungen können dann auf dem Tablet, Smartphone, Computer dargestellt und bedient werden.

Nachfolgend werden einige Visualisierungsadapter und deren Haupteigenschaften kurz vorgestellt. 


### VIS
[Adapterseite vis][]

ioBroker stellt mit dem Adapter VIS (Visualisierung) ein mächtiges Tool zur Erstellung einer individuellen 
Visualisierung zur Verfügung. Aktuelle Werte von Sensoren können genau so wie 
historische Verläufe grafisch aufbereitet dargestellt werden. Live-Bilder von 
Überwachungskameras, die Implementierung einer Alarmanlage, Heizungssysteme und 
Klimatechnik - fast alles was vorstellbar ist, kann auch umgesetzt werden. 

Dabei hat der Anwender maximale Gestaltungsfreiheit. Vorgefertigte Bausteine zur 
einfachen Verwendung helfen dem Anwender dabei. Doch nicht nur die Anzeige von 
Informationen ist möglich. Auch die Steuerung von Geräten ist über die 
Visualisierungsoberfläche schnell umgesetzt. Die Bedienung der Oberfläche kann 
dabei auf die unterschiedlichsten Endgeräte abgestimmt werden - vom Smartphone 
über das Wandtablet mit Touchfunktion bis hin zum Personal Computer - alles kann 
durch einfaches Drag and Drop realisiert werden. 

![](media/iobroker-visualisation-vis.png)

<br>

![VIS](media/vis2.png)  
<br>
![](media/iobroker-visualisation-vis-wetter.png)



<br>

### Material UI
React und Material UI interface.

[Adapterseite Material][]

![](media/iobroker-visualisation-material.png)  

<br>

### Jarvis
[Adapterseite Jarvis][]

jarvis ist eine Material Design Visualisierung, die auf Material UI basiert. jarvis gibt eine Struktur und Module vor, die zur Visualisierung genutzt werden, aber sehr flexibel konfiguriert werden können.

jarvis ist responsive und passt sich der Größe des Screens an und bietet ein standardisiertes Design, so dass in kurzer Zeit eine Visualisierung zusammengestellt. werden kann

Das Layout ist flexibel konfigurierbar. Es können optional (beliebig viele) Tabs verwendet werden. Jeder Tab kann entweder fullscreen sein oder beliebig viele columns haben, die die einzelnen modules in flexibler Reihenfolge beinhalten.

![](media/iobroker-visualisation-jarvis.png)
![](media/iobroker-visualisation-jarvisDevices.png)

<br>

### iQontrol

Schnell ans Ziel - aber dennoch flexibel, das zeichnet iQontrol aus:
- Die Vis einmal erstellen und überall nutzen: Vom PC, über Tablet zu Handy, iQontrol läuft auf allen Endgeräten - entweder im Browser oder als WebApp (lässt sich auf dem Homescreen speichern und fühlt sich dann an, wie eine App)
- iQontrol passt sich dabei allen Auflösungen dynamisch an
- Superschnelle Ladezeit
- Mit den Standard-Einstellungen kommt man schnell zum Ziel
- Mit den erweiterten Einstellungen und Widgets hat man hingegen hohe Flexibilität und Anpassungsmöglichkeiten (bei manchen Installationen erkennt man gar nicht mehr, dass es eigentlich iQontrol ist)

Video [iQontrol Demo Video][]


<img src="media/iobroker-visualisation-iqontrol.png" width="200"> 
<img src="media/iobroker-visualisation-iqontrol2.png" width="200">
<img src="media/iobroker-visualisation-iqontrol3.png" width="200">

<br>

<img src="media/iobroker-visualisation-iqontrol4.png" width="200">
<img src="media/iobroker-visualisation-iqontrol5.png" width="200">

<br>

### Lovelace

[Adapterseite lovelace][]

Mit diesem Adapter kann die HomeAssistant UI Lovelace für ioBroker genutzt werden. Lovelace hat ein responsivefähiges Design und passt sich somit  automatisch an das Layout vom PC, Tablet oder Smartphone Bildschirm an. 

In Lovelace stehen direkt die Geräte mit ihren Eigenschaften zur Ansicht / Ansteuerung bereit, welche in ioBroker hinterlegt sind (z.B. bei einer Lampe Ein/Aus, Helligkeit, Farbtemperatur).

Der Lovelace Editor (WYSIWYG Prinzip - What you see is what you get Prinzip) ermöglicht die einfache Erstellung von modernen UIs mit wenigen Handgriffen. Für die Umsetzung von komplexere Anforderungen und Wünschen stehen custom cards und der YAML Editor zur Verfügung. Inspirationen für eine Lovelace UI können in der HomeAssistant Welt gesammelt und dann in ioBroker umgesetzt werden.

![](media/iobroker-visualisation-lovelace.png)  


<br>
<br>


# Wer steckt hinter ioBroker?
ioBroker ist ein Open Source Projekt welches von der ioBroker Community entwickelt wird und von [Bluefox][] als Projektowner administriert wird.

In diesem Zuge arbeiten viele Entwickler und viele weitere Helfer in ihrer Freizeit ehrenamtlich an den zentralen System-Komponenten, den vielen Adaptern, dem Social-Media-Support, der Dokumentation und vielem mehr.  
Mit der großen und hilfsbereiten Community hat sich bisher zu jedem Problem eine Lösung gefunden.   

Es gibt keinen vertraglich festgelegten Support aus der Open-Source Community, aber gemeinsam haben wir bisher jedes Problem gelöst bekommen!

ioBroker hat hierbei einen eher dezentralen Ansatz, wobei jeder Adapter in einem eigenen GitHub-Repository gepflegt wird. Hierbei trifft der jeweilige Adapter-Entwickler weitestgehend selbst die Entscheidungen zu seinem Adapter. Featurewünsche oder auch fremde Feature-Erweiterungen als "pull-Request" werden hierbei natürlich berücksichtigt.

Einige Entwickler haben sich darüber hinaus in der Adapter-Community zusammengeschlossen um sicherzustellen das auch im Falle davon, das einzelne Entwickler keine Zeit mehr für Ihre Adapter haben, diese weitergepflegt werden können.

Richtungsentscheidungen der zentralen Komponenten und des Gesamtprojekts werden innerhalb des Core-Teams diskutiert und dann umgesetzt.

ioBroker Core Entwickler:
* [Bluefox][]
* [Apollon77][]
* [foxriver76][]
* [AlCalzone][]

ioBroker Developer: https://forum.iobroker.net/groups/developer

# Lizenzen und Kosten
Sehr viele ioBroker Projekte stehen mitsamt dem Quellcode auf [GitHub][] zur Verfügung. In den allermeisten Fällen steht der Quellcode unter der MIT Lizenz. Manchmal werden allerdings auch Lizenzen wie GPL, CC BY-NC oder andere genutzt, welche zu berücksichtgen sind, jedoch für End-Nutzer an sich keinen großen Unterschied darstellen!
Der Entwickler eines Adapters legt für den jeweiligen Adapter die Lizenz selbst fest.

In sehr seltenen Fällen (<5 Adapter aktuell) wird eine (teils kostenpflichtige) Lizenz benötigt um einen Adapter zu nutzen. Für den "Vis" Adapter stellt beispielsweise die ioBroker GmbH eine kostenfreie Lizenz für die private Nutzung zur Verfügung - für eine kommerzielle Nutzung ist allerdings eine kostenpflichtige Lizenz nötig.
Ein Überblick und die Bestellung der Lizenz für diese Adapter erfolgt über diese Seite [iobrokerPreise][]. Die Kosten für eine kommerzielle Nutzung dieser Adapter ist dort ebenfalls aufgeführt.

# Wie finanziert sich ioBroker?
Alle zentralen Komponenten und nahezu alle weiteren Adapter sind kostenfrei erhältlich und der Quellcode der allermeisten Adapter steht auf GitHub offen zur Verfügung.

Da ein Open Source Projekt keine Einnahmen erzielen kann um z.B. Server zu kaufen, bedarf es für diese Dinge eine offizielle Gesellschaftsform, die ioBroker GmbH. Die ioBroker GmbH bietet unter anderem auch einen kommerziellen Support für die ioBroker Software oder verkauft z.B. einen ioBroker-Server. 

Die ioBroker GmbH stellt für das Community-Projekt die Infrastruktur (z.B. den Forum Server) kostenfrei zur Verfügung und hat auch in der Vergangenheit bereits Entwicklungsleistung eingekauft, welche in die Entwicklung der Open Source Projekte (zB Admin5) geflossen ist. 

Die ioBroker Free Cloud ist ebenfalls ein kostenfreier Dienst, der der Community durch die ioBroker GmbH zur Verfügung gestellt wird. Die Pro-Cloud und der iot-Service sind kommerzielle Angebote der ioBroker GmbH, wobei die Kosten gerade einmal die Betriebskosten decken.


# Remotezugriff auf deine ioBroker Installation über die ioBroker Cloud 
Über einen optionalen cloudbasierten Zugriff ist für den Anwender oder auch
für Systemintegratoren die Remote-Verwaltung auf ein lokal installiertes ioBroker
-System 24/7 möglich. Die Zugriffsteuerung kann mittels Benutzer und Gruppen vom
Anwender frei konfiguriert werden.

![](media/iobroker-cloud-services-overview.png)  

<br>

# Community
Seit 2014 hat sich ioBroker aufgrund seiner vielen Vorzüge eine breite 
Unterstützung von tausenden Anwendern und Entwicklern gesichert. Im eigens 
eingerichteten [Forum][] treffen sich Anwender und Entwickler und tauschen dort ihre 
Erfahrungen und Anregungen miteinander aus. Auf dem ioBroker [Discord][] Server könnt ihr ebenfalls eure Erfahrungen austauschen und auch einmal eine Live Debug Session aufsetzen, um Problemen auf die Schliche zu kommen. 

Linksammlung der offiziellen ioBroker Communities:
- ioBroker Forum: [Forum][]
- Discord ioBroker Server: [Discord][]
- Facebookgruppe "IoBroker SmartHome und IoT": [FacebookIoBrokerSmartHomeIoT][]
- Facebookgruppe "ioBroker and smart home international": [FacebookIoBrokerSmartHomeIoTInternational][]


<br>

# ioBroker Statistiken
Auf [ioBrokerStatistics][] findet ihr eine Übersichtsseite mit ein paar interessanten ioBroker Statistiken. 






[Grundlagen]: https://www.iobroker.net/#de/documentation/basics/README.md
[Adaptern]: https://www.iobroker.net/#de/adapters/adapters.md
[hier zu finden]: https://www.iobroker.net/docu/
[im Forum]: https://forum.iobroker.net/category/186/dokumentations-support
[GitHub]: https://github.com/ioBroker
[Forum]: https://forum.iobroker.net
[Telegram]: https://t.me/iobrokergermany
[Discord]: https://discord.gg/sGWE65zF
[FacebookIoBrokerSmartHomeIoT]: https://www.facebook.com/groups/440499112958264
[FacebookIoBrokerSmartHomeIoTInternational]: https://www.facebook.com/groups/iobrokerinternational
[iobrokerPreise]: https://iobroker.net/www/pricing
[Bluefox]: https://github.com/GermanBluefox
[Apollon77]: https://github.com/Apollon77
[foxriver76]: https://github.com/foxriver76
[AlCalzone]: https://github.com/AlCalzone
[ioBrokerStatistics]: https://www.iobroker.net/#de/statistics
[Adapterseite Material]: https://www.iobroker.net/#de/adapters/adapterref/iobroker.material/README.md
[Adapterseite Jarvis]: https://www.iobroker.net/#de/adapters/adapterref/iobroker.jarvis/README.md
[Adapterseite vis]: https://www.iobroker.net/#de/adapters/adapterref/iobroker.vis/README.md
[Adapterseite lovelace]:https://www.iobroker.net/#de/adapters/adapterref/iobroker.lovelace/README.md
 [iQontrol Demo Video]: https://www.youtube.com/watch?v=QHgmrzMmcX4&list=PL8epyNz8pGEv6-R8dnfXm-m5aBlZFKOBG&index=1