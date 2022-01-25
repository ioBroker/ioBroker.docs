---
title:       "Update NodeJS"
lastChanged: "25.01.2022"
---

# Node.js Versions-Update

## Was ist Node.js und warum muss man es updaten?

Node.js ist die Laufzeitumgebung der Programmiersprache JavaScript, in der ioBroker geschrieben ist. Ohne Node.js funktioniert ioBroker nicht. Node.js hast Du initial selbst installiert oder der ioBroker-Installer hat dies für dich getan.

Wie bei vielen Open-Source-Technologien üblich, entwickelt sich Node.js schnell weiter. Kleinere Updates, die die Stabilität und Sicherheit steigern oder gar neue Funktionen hinzufügen, erscheinen regelmäßig.

Node.js-Versionen mit **gerader** Hauptversionsnummer werden als LTS-Versionen (Long Term Support) bezeichnet und einige Jahre gepflegt (z.B. 12.x). Jedes Jahr kommt eine neue Version ins LTS - Im Jahr 2021 war das Node.js 16, welche im April veröffentlicht wurde und ab Oktober 2021 eine LTS Version wird.

Im gleichem Zug erreichen frühere LTS-Versionen ihr Lebensende (EOL, End of Life). So hat Node.js 10 im April 2021 den EOL-Status erhalten und bekommt damit keine Updates mehr, Nodejs 12.x wird Ende April 2022 Ihr Lebensende erreichen. Es wird also keine Sicherheits-Updates mehr geben!

ioBroker nutzt viele Module und Erweiterungen aus der JavaScript Open-Source Scene, dort kommt es regelmäßig vor, dass Versionen die EOL gehen, zeitnah danach auch nicht weiter unterstützt werden. Das hat im ersten Schritt keine echte Auswirkung, aber mittelfristig wird es, Adapter und später auch den js-Controller geben, der EOL Versionen von Node.js nicht mehr unterstützt.

*Node.js 16.x bringt standardmäßig npm v8.x mit sich und kann gegebenfalls Probleme bereiten, daher ist diese Version nur mit einem npm Downgrade auf npm 6 sinnvoll nutzbar!*

Aus diesem Grund wird aktuell (Stand Januar 2022) Node.js 14 inkl. npm v6 empfohlen.

	Alle Node.js-Versionen mit ungeraden Versionsnummern sind Entwicklungsversionen und sollten nicht produktiv genutzt werden.


---

### Update innerhalb einer Version

Updates **innerhalb** einer Version bedeutet z.b *v14.18.2 auf v14.18.3*.
Folgendes ist dabei jedoch zu beachten.
Adapter mit nativen Bestandteilen, z.b. Serialport oder Bluetooth können Probleme bereiten. Dazu gehören zigbee, ble oder auch der radar2 Adapter. Daher sollte vor einem Update iobroker gestoppt und nach dem Update ein **iobroker fix** ausgeführt werden, anschliessend startet man iobroker wieder. Die Befehle dazu nacheinander eingeben.

```
iobroker stop
sudo apt update
sudo apt upgrade
iobroker fix
iobroker start
```` 

---

## Vorbereitung für Versionswechsel

### 1 - Node.js Version prüfen

Folgender Befehl zeigt die aktuell installierte Version und den zugehörigen Pfad.

`which nodejs node npm && nodejs -v && node -v && npm -v`

es sollte alles in */usr/bin/* liegen, sieht in etwa so aus.

```
/usr/bin/nodejs
/usr/bin/node
/usr/bin/npm
v14.18.3
v14.18.3
6.14.15
```
 

Sollte es dennoch Unstimmigkeiten geben, sodass die Pfadangabe abweicht, oder  *node* und *node.js* **unterschiedliche** Versionen aufweisen, müssen diese Probleme **dringend zuerst behoben** werden. 
Anleitung dazu findet man im [Forum](https://forum.iobroker.net/topic/35090/howto-nodejs-installation-und-upgrades-unter-debian/2).
Um dies allerdings vorzubeugen, sollte man sich strikt an die ioBroker-Installationsanleitung halten.

### 2 - Betriebssystem prüfen

Vor allem im Raspi Umfeld sind gern auch älterer Systeme auf Basis von "Debian jessie" oder "Debian wheezy" im Einsatz. Für die gibt es nichts höheres als Nodejs 10, gegebenenfalls wäre ein Betriebssystemupdate möglich.
Unterstützte Linux Distributionen sind [hier](https://github.com/nodesource/distributions#debian-and-ubuntu-based-distributions) aufgelistet.
In Debian und Ubuntu gibt es mit `lsb_release -a` eine Ausgabe was man aktuell nutzt.

### 3 - js-Controller Version prüfen

Weiterhin bitte prüfen, welche js-controller Version installiert ist (ebenfalls auf dem Host-Tab im Admin einsehbar).
Bei Versionen **vor** js-controller 3.x, wenn möglich bitte zuerst den js-controller aktualisieren. Am besten auf mindestens die 3.2! Hierzu gibt es im Forum z.B. diesen [Beitrag](https://forum.iobroker.net/topic/42385/js-controller-3-2-jetzt-im-stable)

### 4 - Backup erstellen

Bevor nun Änderungen am System gemacht werden, muss ein Backup erstellt werden. Dazu kann der BackitUp-Adapter genutzt werden, oder per Kommandozeilenbefehl

```
cd /opt/iobroker
iobroker backup
```

Das Backup sollte aktuell sein, damit möglichst keine Daten verloren gehen.

### 5 - Adapter aktualisieren

Damit es nach dem Update zu keinen Inkompatibilitäten oder Probleme kommt, sollte man alle Adapter prüfen und aktualisieren. Vor allem Adapter mit nativen Bestandteilen, z.b Serialport oder Bluetooth können Probleme bereiten. Hier am besten die Adapter-Readme's per Admin oder im GitHub prüfen, ob neue Versionen zur Verfügung stehen die die geplante Node.js Version explizit erst unterstützen.
Wenn man diesen Schritt nicht durchführt kann es zu unnötigen Problemen beim Update der Adapter kommen!


### 6 - Node.js Update

Für das Update wird ioBroker gestoppt.
In der Regel werden alle Prozesse dadurch beendet. Sicherheitshalber kann nocheinmal kontrolliert werden, das wirklich keine Prozesse (Adapter, Backups) mehr laufen `ps auxww|grep io` und auch `ps auxww|grep backup`.
Man kann auch mit einem Tool wie "top" prüfen, ob noch Prozesse existieren, die mit "io." beginnen. Diese können mittels `sudo kill -9 <ProzessID>` zwangsbeenden werden.

Als nächtesr Schritt aktualisiert man Node.js auf die gewünschte neue Version. Unter Linux reicht es dazu einfach den Nodesource-Installationsbefehl auszuführen, siehe [NodeSource](https://github.com/nodesource/distributions#debinstall).

Für macOS gibt es Installer, siehe [nodejs](https://nodejs.org/en/download/) die man einfach neu installiert.

---
Für Windows folgendermaßen vorgehen:

<details>

<summary>Windows Nodejs update</summary>

* Konsole: iobroker stop
* Sicherung des Ordners: C:\Program Files\iobroker\deinhostname\nodejs auf dem Desktop
* Download der benötigten Node.js Version unter https://nodejs.org als Archiv nicht als msi
Datei
* Entpacken des Downloads und kopieren den Gesamten Ordners über den vorhandenen
C:\Program Files\iobroker\deinhostname\nodejs Ordner.
* Kopiere aus der Sicherungskopie des Desktops die Datei nodevars.bat in den Ordner
C:\Program Files\iobroker\deinhostname\nodejs
* Konsole: iobroker start

<details> 

---

Zum Beispiel lauten die Befehle für einen Raspberry Pi der ein Debian bzw. Raspbian-Image verwendet wie folgt, wenn man nicht als root-User (z.B. richtig mit dem User "pi") angemeldet ist:


```
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt install -y nodejs
```

Für Node.js 16 einfach in der URL anstelle der 14 eine 16 reinschreiben.

anschliessendes Prüfen der Versionen, das idealerweise keine 7.x/8.x von npm installiert ist.

`which nodejs node npm && nodejs -v && node -v && npm -v`

### 7- ioBroker fixer ausführen

Da die Installation von Node.js, wie oben erwähnt, einige Einstellungen am System verändert haben kann, ist es jetzt ratsam, den ioBroker-Installationsfixer aufzurufen. Das geschieht mit dem Befehl

`iobroker fix`

Er stellt unter anderem die für den Betrieb von ioBroker notwendigen Sicherheitseinstellungen wieder her und prüft und korrigiert alle Berechtigungen. Das kann einen Augenblick dauern.

### 8 - Erster ioBroker Neustart nach Update

Einige genutzte JavaScript Module haben binäre Teile, welche bei einem Node.js Update nicht mehr kompatibel sind und daher neu erstellt werden müssen.

### Automatische Rebuilds

ioBroker versucht seit dem js-controller 3.0 automatisch die Adapter zu erkennen die nicht starten weil Sie aktualisiert werden müssen. Dies funktioniert so das die typischen Fehlermeldungen erkannt werden und ioBroker dann die Aktualisierung versucht. Zuerst wird ein "rebuild" des betroffenen Adapters ausgeführt, falls das nicht hilft werden die Adapter-Abhängigkeiten aktualisiert. Daher kann es sein das der Adapter mehrfach ersucht wird neu zu starten. Hier bitte UNBEDINGT Geduld haben! Erst wenn der Adapter dauerhaft rot bleibt und auch im Log steht das der Rebuild nicht geklappt hat aktiv werden!

Bei einigen Adaptern (zB iot die optionale native Abhängigkeiten haben) funktioniert die automatische Erkennung nicht und das rebuild muss manuell angestoßen werden. Dies kann dadurch erkannt werden das der Adapter "Rot" bleibt und nicht startet oder einzelne Funktionen nicht gehen und das als Fehler im Log steht. Dann sollte das Log geprüft werden (neben Admin stehen Logfiles auch unter /opt/iobroker/log/... zur Verfügung.

### Manuelle Rebuilds

Hier zu gibt es `iobroker rebuild adaptername` und falls das nicht reicht `iobroker rebuild adaptername --install`. Das einfach manuell an der Shell ausführen. Damit sollte alles idealerweise automatisiert erledigt sein.

**Sonderfälle (z.B. Serialport)**

Leider gibt es Sonderfälle, wo auch die obigen Optionen das Rebuild nicht erledigen, einer davon ist Serialport.

Dort kann ein Log zB (auch nach allen Rebuild Versuchen) wie folgt aussehen

<details>

<summary>LOG</summary>

 

```
host.SmartHomeCenter | 2020-05-10 09:28:01.788 | error | Caught by controller[0]: }
host.SmartHomeCenter | 2020-05-10 09:28:01.788 | error | Caught by controller[0]: ]
host.SmartHomeCenter | 2020-05-10 09:28:01.788 | error | Caught by controller[0]: '/opt/iobroker/node_modules/serialport/compiled/12.16.3/linux/arm/serialport.node'
host.SmartHomeCenter | 2020-05-10 09:28:01.787 | error | Caught by controller[0]: '/opt/iobroker/node_modules/serialport/build/default/serialport.node',
host.SmartHomeCenter | 2020-05-10 09:28:01.787 | error | Caught by controller[0]: '/opt/iobroker/node_modules/serialport/Release/serialport.node',
host.SmartHomeCenter | 2020-05-10 09:28:01.787 | error | Caught by controller[0]: '/opt/iobroker/node_modules/serialport/out/Release/serialport.node',
host.SmartHomeCenter | 2020-05-10 09:28:01.787 | error | Caught by controller[0]: '/opt/iobroker/node_modules/serialport/Debug/serialport.node',
host.SmartHomeCenter | 2020-05-10 09:28:01.787 | error | Caught by controller[0]: '/opt/iobroker/node_modules/serialport/out/Debug/serialport.node',
host.SmartHomeCenter | 2020-05-10 09:28:01.786 | error | Caught by controller[0]: '/opt/iobroker/node_modules/serialport/build/Release/serialport.node',
host.SmartHomeCenter | 2020-05-10 09:28:01.786 | error | Caught by controller[0]: '/opt/iobroker/node_modules/serialport/build/Debug/serialport.node',
host.SmartHomeCenter | 2020-05-10 09:28:01.786 | error | Caught by controller[0]: '/opt/iobroker/node_modules/serialport/build/serialport.node',
host.SmartHomeCenter | 2020-05-10 09:28:01.786 | error | Caught by controller[0]: tries: [
host.SmartHomeCenter | 2020-05-10 09:28:01.786 | error | Caught by controller[0]: at Module._compile (internal/modules/cjs/loader.js:1133:30) {
host.SmartHomeCenter | 2020-05-10 09:28:01.785 | error | Caught by controller[0]: at Object. (/opt/iobroker/node_modules/serialport/lib/bindings/auto-detect.js:16:22)
host.SmartHomeCenter | 2020-05-10 09:28:01.785 | error | Caught by controller[0]: at require (internal/modules/cjs/helpers.js:77:18)
host.SmartHomeCenter | 2020-05-10 09:28:01.785 | error | Caught by controller[0]: at Module.require (internal/modules/cjs/loader.js:1019:19)
host.SmartHomeCenter | 2020-05-10 09:28:01.785 | error | Caught by controller[0]: at Function.Module._load (internal/modules/cjs/loader.js:877:14)
host.SmartHomeCenter | 2020-05-10 09:28:01.785 | error | Caught by controller[0]: at Module.load (internal/modules/cjs/loader.js:977:32)
host.SmartHomeCenter | 2020-05-10 09:28:01.784 | error | Caught by controller[0]: at Object.Module._extensions..js (internal/modules/cjs/loader.js:1153:10)
host.SmartHomeCenter | 2020-05-10 09:28:01.784 | error | Caught by controller[0]: at Module._compile (internal/modules/cjs/loader.js:1133:30)
host.SmartHomeCenter | 2020-05-10 09:28:01.784 | error | Caught by controller[0]: at Object. (/opt/iobroker/node_modules/serialport/lib/bindings/linux.js:2:36)
host.SmartHomeCenter | 2020-05-10 09:28:01.784 | error | Caught by controller[0]: at bindings (/opt/iobroker/node_modules/serialport/node_modules/bindings/bindings.js:93:9)
host.SmartHomeCenter | 2020-05-10 09:28:01.783 | error | Caught by controller[0]: → /opt/iobroker/node_modules/serialport/compiled/12.16.3/linux/arm/serialport.node
host.SmartHomeCenter | 2020-05-10 09:28:01.783 | error | Caught by controller[0]: → /opt/iobroker/node_modules/serialport/build/default/serialport.node
host.SmartHomeCenter | 2020-05-10 09:28:01.783 | error | Caught by controller[0]: → /opt/iobroker/node_modules/serialport/Release/serialport.node
host.SmartHomeCenter | 2020-05-10 09:28:01.783 | error | Caught by controller[0]: → /opt/iobroker/node_modules/serialport/out/Release/serialport.node
host.SmartHomeCenter | 2020-05-10 09:28:01.782 | error | Caught by controller[0]: → /opt/iobroker/node_modules/serialport/Debug/serialport.node
host.SmartHomeCenter | 2020-05-10 09:28:01.782 | error | Caught by controller[0]: → /opt/iobroker/node_modules/serialport/out/Debug/serialport.node
host.SmartHomeCenter | 2020-05-10 09:28:01.782 | error | Caught by controller[0]: → /opt/iobroker/node_modules/serialport/build/Release/serialport.node
host.SmartHomeCenter | 2020-05-10 09:28:01.782 | error | Caught by controller[0]: → /opt/iobroker/node_modules/serialport/build/Debug/serialport.node
host.SmartHomeCenter | 2020-05-10 09:28:01.781 | error | Caught by controller[0]: → /opt/iobroker/node_modules/serialport/build/serialport.node
host.SmartHomeCenter | 2020-05-10 09:28:01.781 | error | Caught by controller[0]: Error: Could not locate the bindings file. Tried:
host.SmartHomeCenter | 2020-05-10 09:28:01.781 | error | Caught by controller[0]: ^
host.SmartHomeCenter | 2020-05-10 09:28:01.780 | error | Caught by controller[0]: throw err
host.SmartHomeCenter | 2020-05-10 09:28:01.780 | error | Caught by controller[0]: /opt/iobroker/node_modules/serialport/node_modules/bindings/bindings.js:96


```
 
</details>


Es gibt auch andere Fehlermeldungen die aber alle auf das gleiche hinauslaufen.
Die einfachste Option ist es dann manuell im **richtigen** Verzeichnis neu zu bauen.
In dem Fall das Verzeichnis mit "bindings" suchen - oben ist das */opt/iobroker/node_modules/serialport/node_modules/bindings ...* bei neueren Versionen kann es auch etwas wie */opt/iobroker/node_modules/serialport/node_modules/@serialport/bindings* sein.

Anschließend in dieses Verzeichnis wechseln und `npm install --production` ausführen. Danach den Adapter nochmal neu starten.

Ein weiterer Fall sind Adapter mit canvas Modul (ggf echarts oder Mihome-vacuum) wo es Probleme gebe kann.

