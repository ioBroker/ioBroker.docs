---
title: Update NodeJS
lastChanged: 04.10.2025
---

# Node.js Update

| js-controller | Node.js | npm |
| ------ | ----------- | ------------- |
| < 4.x | 12.x, 14.x, 16.x | 6.x |
| 4.x | 12.x, 14.x, 16.x | 6.x, 7.x, 8.x |
| 5.x | 16.x, 18.x, 20.x | 8.x, 9.x |
| **6.x** | **18.x, 20.x, 22.x** | **8.x, 9.x, 10.x** |
| **7.x** | **18.x, 20.x, 22.x, (24.x)** | **8.x, 9.x, 10.x, 11.x** |

## Warum muss man das updaten?
Ohne Node.js funktioniert ioBroker nicht, Details dazu unter [Architektur](https://www.iobroker.net/#de/documentation/basics/architecture.md).  
Wer mehr über Node.js erfahren möchte, [Wikipedia Node.js](https://de.wikipedia.org/wiki/Node.js).

Wie bei vielen Open-Source-Technologien üblich, entwickelt sich Node.js schnell weiter.  
Updates, die die **Stabilität** und **Sicherheit** steigern, oder gar **neue Funktionen** hinzufügen, erscheinen regelmäßig.

Node.js 22.x ist die aktuelle Empfehlung für ioBroker-Installationen. Diese Version befindet sich seit Oktober 2024 im Active LTS-Status und wird bis April 2027 unterstützt.
Die ioBroker-Community hat diese Version offiziell empfohlen und der **iob nodejs-update** Befehl installiert automatisch die empfohlene Version.

Node.js 24.x steht vor der LTS-Promotion im Oktober 2025 und wird dann bis April 2028 unterstützt werden.
Während diese Version bereits verfügbar ist, wird sie allerdings erst nach der LTS-Promotion für Produktionsumgebungen empfohlen.

?> **Bei einem Node.js Versionswechsel sind bestimmte Voraussetzungen zu prüfen und müssen gegebenenfalls im Vorfeld korrigiert werden.  
Dabei ist darauf zu achten, in welchen Pfaden die Installation liegt.**

> **Wichtiger Hinweis Oktober 2025:** Node.js 18.x ist seit April 2025 End-of-Life und erhält keine Sicherheitsupdates mehr. **Node.js 22.x ist die aktuell empfohlene LTS-Version** und sollte verwendet werden.

#### Empfohlene Update-Methoden
Die einfachste Methode für bestehende ioBroker-Installationen ist der integrierte Update-Befehl:
```
iob nodejs-update
```


### Vorgehensweise

#### 1 - Gegebenheiten prüfen
- Version und Pfad
- Betriebsystem  
- js-controller
- Adapter

<details>
<summary>Warum muss geprüft werden</summary>

Um sicherzustellen, dass alle Komponenten mit der neuen Node.js Version kompatibel sind und die Installation ordnungsgemäß funktioniert. Verschiedene js-controller Versionen unterstützen unterschiedliche Node.js Versionen, und nicht alle Adapter sind automatisch mit neueren Versionen kompatibel.

- welche Version und vor allem, in welchem Verzeichnis liegt die Installation
- Im Raspi Umfeld sind gerne noch ältere Systeme auf Basis von "Debian jessie" oder "Debian wheezy" im Einsatz. Für die gibt es nichts höheres als Nodejs 10, gegebenenfalls wäre ein Betriebssystemupdate möglich.
- Prüfen, welche js-controller Version installiert ist (ebenfalls auf dem Host-Tab im Admin einsehbar). Bei Versionen **vor** js-controller 3.x, wenn möglich bitte zuerst den js-controller aktualisieren. Am besten auf mindestens die 3.2!  
Hierzu gibt es im Forum z.B. diesen [Beitrag](https://forum.iobroker.net/topic/42385/js-controller-3-2-jetzt-im-stable).
- Damit es nach dem Update zu keinen Inkompatibilitäten bzw. Probleme kommt, sollte man alle auf dem System befindlichen Adapter prüfen und gegebenenfalls aktualisieren.  
Am besten die Adapter-Readme's per Admin, im Changelog, oder im GitHub des jeweiligen Adapters prüfen, ob die installierten Adapter Versionen die geplante Node.js Version explizit unterstützen.

</details>

#### 2 - Backup erstellen
Bevor nun Änderungen am System gemacht werden, muss ein Backup erstellt werden. Je nach System gibt es verschiedene Möglichkeiten. Empfohlen wird der BackitUp Adapter oder per [Kommandozeilenbefehl](https://www.iobroker.net/#de/documentation/config/cli.md). Das Backup sollte aktuell sein, damit möglichst keine Daten verloren gehen.

#### 3 - Adapter aktualisieren
Die im System verwendeten Adapter sollten mit der neuen Node.js Version kompatibel sein, gegebenenfalls müssen diese aktualisiert werden.

#### 4 - ioBroker stoppen
Gestoppt wird ioBroker mittels eigenem Konsolenkommando oder per Systemdienstverwaltung.

#### 5 - Überprüfen ob noch Prozesse laufen
In der Regel werden alle Prozesse dadurch beendet. Sicherheitshalber sollte nocheinmal kontrolliert werden, dass auch wirklich keine Prozesse (Adapter, Backups) mehr laufen. Man kann auch mit einem Tool wie "top" prüfen, ob noch Prozesse existieren, die mit "io." beginnen.

#### 6 - Node.js Update
Im nächsten Schritt aktualisiert man Node.js auf die gewünschte neue Version. Das Update unterscheidet sich jedoch je nach installiertem Betriebssystem, siehe Anleitung.

?> Der Node Package Manager, kurz `npm`, wird dabei ebenfalls automatisch mit aktualisiert.

#### 7 - Version und Pfade kontrollieren
Nach abgeschlossenem Update werden die Pfade und installierten Versionen noch einmal gegengeprüft.

#### 8 - ioBroker fixer ausführen
Da die Installation von Node.js, wie eingangs erwähnt, einige Änderungen am System vornimmt, ist es notwendig im Anschluss den [ioBroker fixer](https://www.iobroker.net/#de/documentation/trouble/install_fixer.md) auszuführen. Dieser stellt unter anderem die für den Betrieb von ioBroker notwendigen Sicherheitseinstellungen wieder her und prüft und korrigiert alle Berechtigungen.

#### 9 - ioBroker starten
Einige verwendete JavaScript Module beinhalten Teile die kompiliert werden müssen. Dieser Prozess findet bei der Installation statt. Durch das kompilieren sind diese Module an die Node.js Version gebunden. Nach einem Update müssen diese Teile daher neu kompiliert werden. Seit js-controller Version 3.0 wird versucht, Adapter die solche Teile beinhalten, zu erkennen und automatisch einen Rebuild durchzuführen. Dieser Prozess kann einige Zeit in Anspruch nehmen und die betroffenen Adapter können mehrfach neu starten. Dies kann im LogFile beobachtet werden. Dies geht am einfachsten in einem Terminal mittels `iob logs --watch | uniq`.

<details>
<summary>Automatische Rebuilds</summary>

Seit js-controller 3.0 werden Adapter mit nativen Modulen automatisch erkannt und ein Rebuild wird automatisch durchgeführt. Dies kann im Log verfolgt werden und dauert je nach System einige Minuten.

ioBroker versucht automatisch die Adapter zu erkennen die nicht starten, weil Sie aktualisiert werden müssen. Dies funktioniert so, das die typischen Fehlermeldungen erkannt werden und ioBroker eine entsprechende  Aktualisierung versucht. Zuerst wird ein "rebuild" des betroffenen Adapters ausgeführt, falls das nicht hilft, werden die Adapter-Abhängigkeiten aktualisiert. Daher kann es sein das der Adapter mehrfach neu startet. Hier bitte UNBEDINGT Geduld haben! Erst wenn der Adapter dauerhaft rot bleibt und auch im Log steht, das der Rebuild nicht geklappt hat, aktiv werden!

</details>

<details>
<summary>Manuelle Rebuilds</summary>

Falls der automatische Rebuild nicht funktioniert, kann manuell ein Rebuild aller Adapter durchgeführt werden:

```bash
iobroker rebuild
```

Oder mit vollständiger Neuinstallation:

```bash
iobroker rebuild --install
```

Sollte ein automatischer Rebuild nicht funktioniert haben, so kann dieser manuell ausgeführt werden, siehe Problemlösung.

</details>

<details>
<summary>Sonderfälle (z.B. Serialport)</summary>

Einige Adapter wie der Serialport-Adapter benötigen spezielle Behandlung. Diese müssen gegebenenfalls manuell neu installiert werden:

```bash
iob install serialport
```

Leider gibt es Sonderfälle, wo auch die obigen Optionen das Rebuild nicht erledigen, einer davon ist Serialport.

Dort kann ein Log z.B. (auch nach allen Rebuild Versuchen) wie folgt aussehen

Es gibt auch andere Fehlermeldungen die jedoch alle auf das gleiche hinauslaufen.
Die einfachste Option ist es dann manuell im **richtigen** Verzeichnis neu zu bauen.
In dem Fall das Verzeichnis mit "bindings" suchen - oben ist das */opt/iobroker/node_modules/serialport/node_modules/bindings ...* bei neueren Versionen kann es auch etwas wie */opt/iobroker/node_modules/serialport/node_modules/@serialport/bindings* sein.

Anschließend in dieses Verzeichnis wechseln und `npm install --omit=dev` ausführen. Danach den Adapter nochmal neu starten.

Ein weiterer Fall sind Adapter mit canvas Modul (ggf echarts oder Mihome-vacuum) wo es Probleme geben kann.

</details>

## Anleitung für Debian/Ubuntu

#### 1 - Version und Pfad prüfen
```
sudo ln -s /usr/bin/node /usr/bin/nodejs &> /dev/null
type -p nodejs node npm npx corepack && nodejs -v && node -v && npm -v && npx -v && corepack -v
```
- Ausgabe

```
/usr/bin/nodejs
/usr/bin/node
/usr/bin/npm
/usr/bin/npx
/usr/bin/corepack
v22.x.x
v22.x.x
10.x.x
10.x.x
0.x.x
```
Wichtig ist:
nodejs liegt in /usr/bin
node liegt in /usr/bin
npm liegt in /usr/bin
npx liegt in /usr/bin
corepack liegt in /usr/bin
und die Versionsnummern von nodejs und node sowie von npm und npx stimmen jeweils überein.

#### 2 - Backup

```
iobroker backup
```
- alternative [Möglichkeiten](https://www.iobroker.net/#de/documentation/config/backup.md)

#### 3 - Adapter aktualisieren
- Anleitung dazu findet man unter [Adapter verwalten](https://www.iobroker.net/#de/documentation/tutorial/adapter.md)

```bash
iob update
```

#### 4 - ioBroker stoppen

```
iobroker stop
```

#### 5 - ioBroker Prozesse prüfen

```
ps aux | grep 'io\|PID'
```
- und

```
ps aux | grep 'backup\|PID'
```
- falls noch Prozesse laufen

```
sudo kill -9 [PROZESS-ID]
```

Oder um alle ioBroker-Prozesse zu beenden:

```bash
sudo pkill -f iobroker
sudo pkill -f "io\."
```

#### 6 - Node.JS Update

**Methode A: ioBroker eigener Update-Befehl (Empfohlen für 2025)**

```bash
# Direktes Update auf empfohlene Version (22.x)
iob nodejs-update

# Oder spezifische Version
iob nodejs-update 22
```

**Methode B: NodeSource Repository**

- Details zu [Node.js](https://github.com/nodesource/distributions#installation-instructions)

```
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
```
- Für andere Node.js Versionen einfach in der URL die `22` durch die andere Versionsnummer ersetzen.

!> **Stand Oktober 2025 ist die Version 22.x von Node.js für ioBroker empfohlen!**

!> **Ungerade Node.js Versionen dürfen nicht verwendet werden.**

!> **Node.js 18.x ist End-of-Life (seit April 2025) und sollte nicht mehr verwendet werden.**

#### 7 - Version/Pfad kontrollieren

```
type -p nodejs node npm npx corepack && nodejs -v && node -v && npm -v && npx -v && corepack -v
```

#### 8 - iobroker fixer ausführen

```
iobroker fix
```

#### 9 - ioBroker starten

```
iobroker start
```

## Anleitung für Windows
Node.js wird durch die Ausführung des Windows Installers aktualisiert.

**Empfohlene Schritte für Windows (2025):**

1. **Aktuellen Node.js Windows Installer** von [nodejs.org](https://nodejs.org) herunterladen (Version 22.x LTS)
2. **ioBroker stoppen** über Dienste-Verwaltung oder Kommandozeile
3. **Installer ausführen** (automatisches Update)
4. **ioBroker Fixer ausführen:** `iobroker fix`
5. **ioBroker starten**

**Alternative für Windows:** Windows Subsystem for Linux (WSL2) mit Ubuntu und dann die Linux-Anleitung befolgen.

## Anleitung für Docker
- Node.js wird in der Regel durch ein Update des Containers auf eine neue Version des Docker Image durchgeführt.
- Eine detaillierte Vorgehensweise, sowie weitere Details zum iobroker container ist bei [buanet](https://docs.buanet.de/) zu finden.

## Problemlösung

### manueller Rebuild
- Hierzu gibt es

```
iobroker rebuild
```
- falls das nicht reicht

```
iobroker rebuild --install
```
- einfach manuell an der Shell ausführen. Damit dürfte idealerweise alles automatisiert erledigt sein.

Dieser Befehl führt eine komplette Neuinstallation aller Node-Module durch und sollte die meisten Probleme nach einem Node.js Update lösen.

### Häufige Probleme (2025)

**"nodejs is NOT correctly installed"**

```bash
# Lösung: Fixer ausführen
iobroker fix

# Falls das nicht hilft, Node.js neu installieren
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
```

**NPM-Fehler nach Update**

```bash
# NPM Cache leeren
npm cache clean --force

# Node modules neu installieren
cd /opt/iobroker
rm -rf node_modules
npm install
```

**Adapter funktionieren nach Update nicht**

```bash
# Einzelne Adapter neu installieren
iob install [ADAPTER-NAME]

# Oder alle Adapter rebuilden
iobroker rebuild --install
```

**Permission-Probleme**

```bash
# Berechtigungen korrigieren (Linux)
sudo chown -R iobroker:iobroker /opt/iobroker
iobroker fix
```

### Diagnose-Befehle

```bash
# Umfassende Systemdiagnose
iob diag

# Node.js Installation prüfen
which node
which npm
ls -la $(which node)
node -v
npm -v

# ioBroker Status
iob status
iob list instances
```

?> Solange js-Controller kleiner Version 4, muss auch bei einem Node.js Update innerhalb einer Major Version, der [ioBroker fixer](https://www.iobroker.net/#de/documentation/install/linux.md) ausgeführt werden.  
Mit dem zukünftigen js-Controller in Version 4 werden Rebuild's vollautomatisch gehändelt.  
