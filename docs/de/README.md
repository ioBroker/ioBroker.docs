---
title:       "Was ist ioBroker?"
lastChanged: "08.09.2026"
---
# Was ist ioBroker?

ioBroker ist eine Software, die Geräte und Dienste verschiedener Hersteller zu
einem System verbindet. Werte ablesen, Geräte steuern, Abläufe automatisieren:
alles an einer Stelle, unabhängig davon, von wem das einzelne Gerät stammt.

## Mach dein Leben einfacher: Smart Home

Wäre es nicht praktisch, Temperaturen, Verbrauchswerte oder Schaltzustände von Geräten verschiedenster Hersteller zentral an einem Ort abzulesen?
Müsste man nicht daran denken, Geräte bei Erreichen bestimmter Bedingungen oder Zustände ein- oder auszuschalten?

Diese Bequemlichkeit kann ein Smart Home bieten - ein intelligentes Haus.
Und es bietet auf Wunsch noch mehr: Automatisierung und die Möglichkeit, auf all diese Dinge auch aus der Ferne zuzugreifen.

### Die Lösung: ioBroker - Automate your life

**ioBroker** ist eine Softwarelösung zur Automatisierung deines Zuhauses.
Sie ermöglicht die Integration verschiedenster Smarthome-Systeme, die ohne ioBroker isoliert bleiben würden, und ermöglicht so eine übergreifende Steuerung.

**ioBroker** ist daher **die** Integrationsplattform für das Internet der Dinge (IoT) und ermöglicht die Einbindung von freien und kommerziellen Produkten
aus fast allen Lebensbereichen sowie die Integration von selbst erstellten Lösungen.

Das **ioBroker-System** ist modular aufgebaut und kann durch die Installation von einzelnen Plugins, bei uns Adapter genannt, gemäß den individuellen Wünschen erweitert werden.

Mit weit über 600 Adaptern ermöglicht ioBroker die Integration verschiedener Plattformen, Systeme und Geräte von A wie Alexa bis Z wie Zigbee und bietet viele weitere Möglichkeiten zur Automatisierung.

#### Was sind Adapter? 

**Adapter** sind in JavaScript für Node.js geschriebene **PlugIns** (Softwaremodule, kleine Programme), die speziell für bestimmte Geräte, Gerätetypen, Geräte bestimmter Hersteller oder andere Dienste, wie beispielsweise zur Abfrage von Webseiten, entwickelt wurden.

Diese Adapter ermöglichen die Verbindung zwischen physischen Geräten (zum Beispiel steuerbare Steckdosen, Relais, Fernthermometer und ähnlichem) und dem zentralen ioBroker-System. Sie sind in der Lage, die von den Geräten gemessenen Werte auszulesen und die Geräte zu steuern, was oft über WLAN im eigenen Heimnetz geschieht.

Andere Adapter sind darauf ausgelegt, Messwerte wie Temperatur, Leistung, Verbrauchswerte oder Schaltzustände grafisch in Diagrammen darzustellen.
Visualisierungsadapter bieten zudem weitere Möglichkeiten, wie das Einbinden von Bildern (etwa von Überwachungskameras), Wetterdaten und vieles mehr.

Zusätzlich gibt es Adapter, die Funktionen für mathematische Berechnungen oder logische Operationen (wie Vergleiche) anbieten.
Sie können auch zur Erstellung kleiner Programme und zur Definition der für die Automatisierung notwendigen Regeln eingesetzt werden.

Da JavaScript eine der meistgenutzten Programmiersprachen ist, existieren bereits viele fertige Module, und neue können oft mit relativ geringem Aufwand entwickelt werden.
Sollte ein Adapter fehlen, kann daher meistens schnell ein passender entwickelt werden.
Die aktive **ioBroker-Entwickler-Community** unterstützt neue Entwickler dabei jederzeit gerne.

**Tipp:**
 [Übersicht verfügbarer Adapter](/adapters) 

### ioBroker verbindet unterschiedlichste Smarthome-Systeme

![](media/iobroker-simple-overview.png)  

Diese Grafik veranschaulicht, wie ioBroker als zentrales System verschiedenste Smart-Home-Systeme und weitere Dienste, wie zum Beispiel Kalender,
koordiniert und miteinander verbindet.
Die in ioBroker verfügbaren Adapter ermöglichen eine Kommunikation mit zentral
verwalteten Kalendern oder herstellerspezifischen Smart-Home-Systemen, die im LAN oder WLAN angeschlossen sind.
Auf diese Weise kann die ioBroker-Software Statusinformationen abrufen oder Steuerungsaktionen ausführen.

### Anwendungsbeispiel Anwesenheitssimulation

In diesem Anwendungsbeispiel wird exemplarisch aufgezeigt, wie die beiden voneinander unabhängigen Smarthome-Systeme Philipps Hue und Homematic IP mittels ioBroker zusammengeführt werden, um eine Anwesenheitssimulation zu realisieren.

Durch die Anbindung der beiden Smarthome-Systeme an die ioBroker Software ist ioBroker in der Lage, die Zustände der Hue Lampen (ein/aus) sowie die Rollläden (hoch/runter) zu verändern. Die Erkennung der Urlaubszeit erfolgt durch die Anbindung des Kalenders in ioBroker.

Durch Nutzung der Logikbausteine (Adapter Logikprogrammierung) in ioBroker kann der Anwender nun mit wenigen Schritten den folgenden Ablauf realisieren:

- Wenn im Kalender der Eintrag "Urlaub" eingetragen ist, werden um 18 Uhr abends alle HUE-Lampen eingeschaltet.
- Um 22:00 Uhr werden alle Rollläden geschlossen und alle Hue Lampen ausgeschaltet.
- Um 08:00 Uhr morgens werden alle Rollläden wieder hochgefahren.

Über die verfügbaren Visualisierungs-Adapter kann sich der Anwender individuelle Status und Steuerungsseiten für seine Hue-Lampen und Rollläden bauen, auf die mit den mobilen Endgeräten von zu Hause oder aus dem Urlaub (z.B. mittels ioBroker Cloud Services oder VPN) zugegriffen werden kann.

## Stärken von ioBroker

### Herstellerunabhängig und offen

ioBroker bindet Geräte, Protokolle und Onlinedienste über Adapter ein, und zwar
unabhängig davon, von wem das einzelne Gerät stammt. Zigbee, Z-Wave, KNX, Modbus,
MQTT, Hersteller-Clouds, Sprachassistenten: Was ein Adapter übersetzen kann, wird
Teil desselben Systems. Du bist damit an keinen Hersteller gebunden und kannst
Geräte austauschen, ohne deine Automatisierungen neu aufzubauen.

### Modular aufgebaut

ioBroker besteht aus einem schlanken Kern und Adaptern, die du einzeln
installierst. Du holst dir also nur das ins System, was du wirklich brauchst.
Jede Instanz eines Adapters läuft für sich; fällt eine aus, arbeitet der Rest
weiter, und du kannst sie einzeln anhalten, neu starten oder anders einstellen.

### Läuft auf fast jeder Hardware

ioBroker kann auf fast allen Hardwareplattformen installiert werden, auf denen als
**Betriebssystem Linux, OSX, Windows oder Docker** läuft. Möglich sind somit
Einplatinencomputer (wie der Raspberry Pi), Server, NAS oder Server mit
Virtualisierungsumgebungen (wie z.B. Proxmox), Desktopcomputer, o.ä.

Eine einfache Installationsroutine aus einer einzigen Zeile (one-line installer)
ermöglicht unter Linux und OSX eine anwenderfreundliche Installation und somit einen
schnellen Einstieg in ioBroker.

### Alles über die Oberfläche

Konfigurationsdateien musst du nicht bearbeiten. Adapter installieren, Instanzen
einrichten, Objekte ansehen, Benutzer anlegen, Protokolle lesen: all das geschieht
in der Admin-Oberfläche im Browser.

### Individuelle Programmierung von Abläufen

Mit den Logikadaptern bietet ioBroker die Möglichkeit, individuelle Abläufe und
Skripte zu erstellen. In einem Skript kann z.B. ein Wert von einem Adapter
überwacht werden (Urlaub ist im Kalender am heutigen Tag eingetragen) und eine
Aktion ausgelöst werden (Schalte um 18 Uhr alle Hue Lichter ein).

Für einfache Abläufe genügen die grafischen Werkzeuge: der Regel-Assistent für
"Wenn dies, dann das" und Blockly, wo du Bausteine zusammensetzt. Wer mehr möchte,
schreibt JavaScript oder TypeScript, nutzt Node-RED oder bindet eigene
Node.js-Module ein. Alle Wege führen auf dieselben Daten, und sie lassen sich
nebeneinander verwenden.

Weitere Erklärungen zu den Logikbausteinen sowie eine Vorstellung von Node-RED
oder dem Szenen-Adapter stehen im Kapitel
[Logik und Automatisierung](/docs/logic/README.md).

### Der js-controller als Kern

Der js-controller ist das Herz des Systems. Er verwaltet die Objekte und Zustände,
startet und überwacht die Instanzen und hält die Verbindung zwischen allen Teilen.
Adapter sprechen nicht miteinander, sondern über diesen Kern. Daraus folgt die
Offenheit des Systems: Ein neuer Adapter muss nur die gemeinsame Sprache
beherrschen, nicht jedes andere Gerät kennen.

### Skalierbar bis zum Multi-Host-System

Sollen im Laufe der Zeit weitere Smarthome-Systeme angebunden werden, können diese
jederzeit über zusätzliche Adapter im laufenden Betrieb ergänzt werden.

Auch ioBroker selbst ist skalierbar: Mehrere ioBroker-Server können zu einem
Multi-Host-System verbunden werden. Dabei ist sogar die Mischung von
Betriebssystemplattformen und die Kopplung von Einplatinencomputern mit großen
Multicore-Servern möglich. Das entlastet den einzelnen Rechner und erhöht zugleich
die Ausfallsicherheit.

### Redis als optionale Datenbank

In der Voreinstellung legt ioBroker Objekte und Zustände in Dateien ab. Für größere
Anlagen lässt sich stattdessen Redis verwenden. Das beschleunigt die Zugriffe
deutlich und ist der übliche Weg, wenn viele Zustände in kurzer Folge geschrieben
werden.

### Benutzer und Rechte

Du legst Benutzer und Gruppen an und bestimmst, wer was sehen und bedienen darf. In
einem Haushalt mit mehreren Personen oder in einer Anlage, die jemand anderes
betreut, ist das der Unterschied zwischen "alle dürfen alles" und einer Oberfläche,
die jedem genau das zeigt, was ihn angeht.

### Deine Daten bleiben bei dir

ioBroker läuft bei dir zu Hause. Werte, Verläufe und Regeln liegen auf deinem
Rechner, nicht bei einem Anbieter. Ob ein einzelnes Gerät zusätzlich eine Cloud des
Herstellers benötigt, hängt vom Gerät ab; das System selbst braucht keine. Für den
Zugriff von unterwegs gibt es eigene Wege, die du bewusst einschaltest.

### Visualisierung nach deinem Geschmack

Für die Oberfläche, die du täglich bedienst, gibt es mehrere Wege: vis-2, webui,
Lovelace, den Devices-Adapter und weitere. Der nächste Abschnitt stellt sie vor.

### Open Source und eine starke Community

ioBroker ist quelloffen und kostenlos. Die Entwicklung findet öffentlich statt, und
ein großer Teil der Adapter stammt aus der Community. Im Forum, insbesondere im
deutschsprachigen Raum, findest du Hilfe, Beispiele und Anleitungen, meist
innerhalb weniger Stunden. Mehr dazu weiter unten im Abschnitt Community.

## Visualisierung

Am Ende soll jemand etwas bedienen: eine Seite im Browser, auf dem Tablet an der
Wand oder auf dem Telefon, auf der Räume, Geräte und Messwerte zu sehen sind und
geschaltet werden kann. ioBroker bringt diese Oberfläche nicht selbst mit, sie
entsteht durch einen Adapter. Und davon gibt es viele, mit sehr
unterschiedlichem Ansatz.

Die einen zeichnet man sich selbst, Element für Element, bis alles genau so
aussieht, wie man es haben will:

* **vis-2** und sein Vorgänger **vis**, die verbreitetsten
* **webui**, ein eigenständiges System aus Web Components

Die anderen bauen sich selbst auf, aus dem, was das System ohnehin über die
Geräte weiß:

* der **Devices-Adapter**, der aus den angelegten Geräten eine fertige Ansicht
  erzeugt
* **Lovelace**, die Oberfläche von Home Assistant

Dazu kommen Adapter für einzelne Aufgaben: **echarts** und **flexcharts** für
Diagramme, **energiefluss** für den Weg des Stroms durch das Haus, und über
sechzig weitere.

Mehrere Oberflächen nebeneinander sind kein Problem, das ist beim Ausprobieren
sogar praktisch. Welcher Weg zu wem passt und wie man anfängt, steht im Kapitel
[Visualisierung](/docs/viz/README.md).

## Wer steckt hinter ioBroker?

ioBroker ist ein Open-Source-Projekt, welches von der ioBroker Community entwickelt wird und von [Bluefox](https://github.com/GermanBluefox) als Projektbesitzer administriert wird.

Viele Entwickler und viele weitere Helfer entwickeln in ihrer Freizeit ehrenamtlich an den zentralen ioBroker System-Komponenten, den vielen Adaptern, dem Social-Media-Support, der Dokumentation und vielem mehr.  
Mit der großen und hilfsbereiten Community hat sich bisher zu jedem Problem eine Lösung gefunden.   

ioBroker verfolgt einen dezentralen Ansatz, bei welchem jeder Adapter in einem eigenen GitHub-Repository gepflegt wird.
Hierbei trifft der jeweilige Adapter-Entwickler weitestgehend eigenständig die Entscheidungen zu seinem Adapter.
Funktionalitäterweiterungs-Wünsche oder auch fremde Feature-Erweiterungen als "pull-Request" werden hierbei natürlich berücksichtigt.

Einige Entwickler haben sich darüber hinaus in der ioBroker Adapter-Community zusammengeschlossen, um sicherzustellen dass auch im Falle davon,
dass einzelne Entwickler keine Zeit mehr für Ihre Adapter haben, diese weitergepflegt werden können.

Es gibt keinen vertraglich festgelegten Support aus der Open-Source Community, aber gemeinsam haben wir bisher jedes Problem gelöst bekommen!

Richtungsentscheidungen der zentralen Komponenten und des Gesamtprojekts werden innerhalb des Core-Teams diskutiert und dann umgesetzt.

Das ioBroker Core Entwicklerteam setzt sich zusammen aus:
* [Bluefox](https://github.com/GermanBluefox)
* [Apollon77](https://github.com/Apollon77)
* [foxriver76](https://github.com/foxriver76)
* [AlCalzone](https://github.com/AlCalzone)

Eine Liste der [ioBroker Developer](https://forum.iobroker.net/groups/developer) findet ihr im ioBroker Forum.

## ioBroker.net und ioBroker.pro - Plattformen im Vergleich

ioBroker stellt zwei eigenständige Plattformen (Server) bereit, die jeweils unterschiedliche Funktionen abdecken:

### 1. ioBroker.net

- **Verwaltung von Adapterlizenzen** *(z.B. vis-2, KNX, JägerDesign-Widgets)*
- **Kostenfreier Fernzugriff** über den **Cloud-Adapter** mit eingeschränkter Funktionalität: *nur Anzeige von Visualisierungen im Browser, ohne Bearbeitungsoption, eingeschränkte Transferdatenmenge.*

### 2. ioBroker.pro
 
- **Nutzung von Smart-Assistenten** *(z.B. Amazon Alexa, Google Assistant)* über den **IoT-Adapter**
- **Erweiterter Fernzugriff** über den **Cloud-Adapter** mit voller Funktionalität: *Anzeige im Browser und in der App und Bearbeitung von Visualisierungen incl. Admin und vis-Editor.*
- Möglichkeit, Daten über **HTTPS mittels GET- oder POST-Request** an die eigene ioBroker-Instanz zu senden.

#### Technische Hinweise

- Für den **Fernzugriff** (z.B. Anzeige und Bearbeitung von vis oder Zugriff auf den Admin) ist der **Cloud-Adapter** erforderlich.  
  Dieser wird sowohl auf ioBroker.net als auch auf ioBroker.pro verwendet, mit unterschiedlichem Funktionsumfang abhängig von Plattform und Lizenz.

- Für die **Sprachsteuerung** (z.B. Amazon Alexa oder Google Assistant) wird der **IoT-Adapter** benötigt. Nur mit aktivem iot-Adapter können **ioBroker.assistant Skill** oder **Custom-Skill** genutzt werden.

## Wie finanziert sich ioBroker?

Alle zentralen Komponenten und nahezu alle weiteren Adapter sind kostenfrei erhältlich und der Quellcode der allermeisten Adapter steht auf GitHub offen zur Verfügung.

Da ein Open-Source-Projekt keine Einnahmen erzielen kann, um z.B. Server zu kaufen, bedarf es für diese Dinge eine offizielle Gesellschaftsform, die ioBroker GmbH.
Die ioBroker GmbH bietet unter anderem auch einen kommerziellen Support für die ioBroker Software oder verkauft z.B. einen ioBroker-Server. 

Die ioBroker GmbH stellt für das Community-Projekt die Infrastruktur (z.B. den Forum-Server) kostenfrei zur Verfügung und hat auch in der Vergangenheit bereits Entwicklungsleistung eingekauft, welche in die Entwicklung der Open Source Projekte (z.B. Admin) geflossen ist. 

Die ioBroker Free Cloud ist ebenfalls ein kostenfreier Dienst, der der Community durch die ioBroker GmbH zur Verfügung gestellt wird. Die Pro-Cloud und der iot-Service sind kommerzielle Angebote der ioBroker GmbH, wobei die Kosten gerade einmal die Betriebskosten decken.

## Lizenzen

Fast alles an ioBroker ist kostenfrei. Der Quellcode steht offen auf
[GitHub](https://github.com/ioBroker), in den allermeisten Fällen unter der
MIT-Lizenz. Geld kostet nur, was laufende Kosten verursacht: drei Adapter, die
eine **Adapterlizenz** brauchen (vis-2, KNX, JägerDesign-Widgets), und die
Dienste in der Cloud, für die es **Zugangslizenzen** gibt.

Wie das im Einzelnen funktioniert, woran eine Lizenz gebunden ist und warum es
dafür zwei Server gibt, steht im Kapitel
[Lizenzen](/docs/licenses/README.md). Preise und Pakete stehen in der
[Lizenzübersicht](/productoverview).

## Unterstütze unser Projekt!

Die Weiterentwicklung und Pflege von ioBroker wird zum Großteil durch
freiwillige Arbeit getragen. Wenn dir ioBroker gefällt und du unsere Arbeit
unterstützen möchtest, freuen wir uns über jede Hilfe:

- Mit dem Kauf einer Lizenz unterstützt du direkt die Entwicklung und
  Infrastruktur.
- Falls du keine Lizenz benötigst, freuen wir uns auch über eine freiwillige
  Spende: [Jetzt spenden via PayPal](https://www.paypal.com/donate?campaign_id=MJBDJ9TGBQ7GN)

Vielen Dank für deinen Beitrag!


## Community
Seit 2014 hat sich ioBroker aufgrund seiner vielen Vorzüge eine breite 
Unterstützung von tausenden Anwendern und Entwicklern gesichert. Im eigens 
eingerichteten [Forum](https://forum.iobroker.net) treffen sich Anwender und Entwickler und tauschen dort ihre 
Erfahrungen und Anregungen miteinander aus. Auf dem ioBroker [Discord](https://discord.gg/sGWE65zF) Server können Erfahrungen im Live-Chat ausgetauscht sowie Live Debug Session kurzfristig durchgeführt werden, um aktuellen Problemen auf die Schliche zu kommen. 

Linksammlung der offiziellen ioBroker Communities:
- ioBroker Forum: [Forum](https://forum.iobroker.net)
- Discord ioBroker Server: [Discord](https://discord.gg/sGWE65zF)
- Facebook-Gruppe "IoBroker SmartHome und IoT": [FacebookIoBrokerSmartHomeIoT](https://www.facebook.com/groups/440499112958264)
- Facebook-Gruppe "ioBroker and smart home international": [FacebookIoBrokerSmartHomeIoTInternational](https://www.facebook.com/groups/iobrokerinternational)

## ioBroker Statistiken
Auf [ioBrokerStatistics](/statistics) findet ihr eine Übersichtsseite mit ein paar interessanten ioBroker Statistiken. 

[Grundlagen]: /docs/basics/README.md
[Adaptern]: /adapters
[hier zu finden]: /docs
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
[ioBrokerStatistics]: /statistics
[ioBroker Developer]: https://forum.iobroker.net/groups/developer
